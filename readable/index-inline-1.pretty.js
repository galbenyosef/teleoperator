(function () {
  "use strict";
  if (window.mindblown && window.mindblown.sound) return;
  var on = true;
  function stored() {
    try {
      var m = /(?:^|;\s*)mb_sound=([^;]*)/.exec(document.cookie || "");
      return !(m && m[1] === "off");
    } catch (e) {
      return true;
    }
  }
  try {
    on = stored();
  } catch (e) {}

  // <audio> and <video>. Every element is remembered: half of them are in no
  // document. See the notes above this template.
  var media = null;
  var seen = [];
  try {
    var proto = window.HTMLMediaElement && HTMLMediaElement.prototype;
    media = proto && Object.getOwnPropertyDescriptor(proto, "muted");
    if (media && media.get && media.set) {
      Object.defineProperty(proto, "muted", {
        configurable: true,
        enumerable: media.enumerable,
        get: function () {
          return media.get.call(this);
        },
        set: function (v) {
          if (on) {
            media.set.call(this, v);
            return;
          }
          note(this);
          this.__mbWant = !!v;
          this.__mbHeld = true;
          media.set.call(this, true);
        },
      });
      var play = proto.play;
      if (play) {
        proto.play = function () {
          note(this);
          hold(this);
          return play.apply(this, arguments);
        };
      }
    } else {
      media = null;
    }
  } catch (e) {
    media = null;
  }
  function note(el) {
    try {
      if (el.__mbSeen) return;
      el.__mbSeen = true;
      seen.push(
        typeof WeakRef === "function"
          ? new WeakRef(el)
          : {
              deref: function () {
                return el;
              },
            },
      );
    } catch (e) {}
  }
  function hold(el) {
    if (!media || !el) return;
    try {
      if (on) {
        if (el.__mbHeld) {
          el.__mbHeld = false;
          media.set.call(el, !!el.__mbWant);
        }
      } else {
        if (!el.__mbHeld) {
          el.__mbWant = media.get.call(el);
          el.__mbHeld = true;
        }
        media.set.call(el, true);
      }
    } catch (e) {}
  }
  function sweep() {
    try {
      var all = document.querySelectorAll("audio,video");
      for (var i = 0; i < all.length; i++) {
        note(all[i]);
        hold(all[i]);
      }
    } catch (e) {}
    for (var j = seen.length - 1; j >= 0; j--) {
      var el = null;
      try {
        el = seen[j].deref();
      } catch (e) {}
      if (el) hold(el);
      else seen.splice(j, 1);
    }
  }
  // <audio autoplay> never calls play().
  try {
    document.addEventListener(
      "play",
      function (e) {
        note(e.target);
        hold(e.target);
      },
      true,
    );
  } catch (e) {}

  // Web Audio: a gain node where the destination was, connected to the real one.
  var gains = [];
  try {
    var base =
      window.BaseAudioContext ||
      window.AudioContext ||
      window.webkitAudioContext;
    var proto2 = base && base.prototype;
    var dest = proto2 && Object.getOwnPropertyDescriptor(proto2, "destination");
    if (dest && dest.get) {
      Object.defineProperty(proto2, "destination", {
        configurable: true,
        enumerable: dest.enumerable,
        get: function () {
          var real = dest.get.call(this);
          try {
            if (
              window.OfflineAudioContext &&
              this instanceof OfflineAudioContext
            )
              return real;
            if (!this.createGain) return real;
            var g = this.__mbGain;
            if (!g) {
              g = this.createGain();
              g.gain.value = on ? 1 : 0;
              g.connect(real);
              try {
                Object.defineProperty(g, "maxChannelCount", {
                  value: real.maxChannelCount,
                });
              } catch (e) {}
              try {
                Object.defineProperty(this, "__mbGain", { value: g });
              } catch (e) {
                this.__mbGain = g;
              }
              gains.push(g);
            }
            return g;
          } catch (e) {
            return real;
          }
        },
      });
    }
  } catch (e) {}
  function ramp(g, v) {
    try {
      var t = g.context.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(v, t + 0.02);
    } catch (e) {
      try {
        g.gain.value = v;
      } catch (e2) {}
    }
  }

  // Spoken words are a sound too.
  try {
    var synth = window.speechSynthesis;
    if (synth && synth.speak) {
      var speak = synth.speak;
      synth.speak = function () {
        if (!on) return;
        return speak.apply(synth, arguments);
      };
    }
  } catch (e) {}

  // The zone: everything after the first label. An address is not a name.
  function zone() {
    try {
      var host = location.hostname,
        at = host.indexOf(".");
      if (at < 0) return "";
      var rest = host.slice(at + 1);
      if (rest.indexOf(".") < 0) return "";
      var last = rest.slice(rest.lastIndexOf(".") + 1);
      if (!/^[a-z]{2,}$/.test(last)) return "";
      return rest;
    } catch (e) {
      return "";
    }
  }
  // Written twice: at once here, and by a response, which Safari does not cap.
  function keep() {
    var value = on ? "on" : "off";
    try {
      var domain = zone();
      document.cookie =
        "mb_sound=" +
        value +
        ";path=/;max-age=31536000;samesite=lax" +
        (location.protocol === "https:" ? ";secure" : "") +
        (domain ? ";domain=" + domain : "");
    } catch (e) {}
    try {
      fetch("/__mb/sound?on=" + (on ? "1" : "0"), {
        method: "POST",
        credentials: "same-origin",
        keepalive: true,
      }).catch(function () {});
    } catch (e) {}
  }
  // The other document: the shell holds the panel, the frame holds the page.
  // Nobody re-broadcasts and an unchanged value returns early, so no loop.
  function tell() {
    var note = { type: "mb-sound", on: on };
    try {
      if (window.parent && window.parent !== window)
        window.parent.postMessage(note, location.origin);
    } catch (e) {}
    try {
      for (var i = 0; i < window.frames.length; i++) {
        try {
          window.frames[i].postMessage(note, location.origin);
        } catch (e2) {}
      }
    } catch (e) {}
  }
  function set(next, spread) {
    next = !!next;
    if (next === on) return on;
    on = next;
    for (var i = 0; i < gains.length; i++) ramp(gains[i], on ? 1 : 0);
    sweep();
    if (!on) {
      try {
        window.speechSynthesis && window.speechSynthesis.cancel();
      } catch (e) {}
    }
    if (spread) {
      keep();
      tell();
    }
    try {
      window.dispatchEvent(
        new CustomEvent("mindblown:sound", { detail: { on: on } }),
      );
    } catch (e) {}
    return on;
  }
  // OURS IS THE ZONE, NOT THE ORIGIN.
  //
  // This used to answer only its own origin, which was right while the only other
  // document was the shell around it -- the shell and the game are the same host.
  // The APP frames a game too, from mindblown.ai, and it now carries the sound
  // switch in the game's own rail: a control that belongs to whoever is holding
  // the phone, on the one surface where they are actually holding it.
  //
  // The zone is already computed above for the cookie, and it is the same trust
  // boundary: everything under mindblown.ai is ours, and a sibling that could
  // send this can already read the cookie it writes. What it may set is one
  // boolean about audio.
  //
  // SPREAD:TRUE for a message, unlike the shell's own broadcast below. The app is
  // telling us what a PERSON chose, so it is written down and passed on -- the
  // next game they open starts muted too, which is the whole point of a switch
  // that belongs to them.
  function ours(origin) {
    try {
      if (origin === location.origin) return true;
      var z = zone();
      if (!z) return false;
      var host = new URL(origin).hostname;
      return host === z || host.slice(-(z.length + 1)) === "." + z;
    } catch (e) {
      return false;
    }
  }
  try {
    window.addEventListener("message", function (e) {
      try {
        if (!ours(e.origin)) return;
        var d = e.data;
        if (d && d.type === "mb-sound" && typeof d.on === "boolean")
          set(d.on, e.origin !== location.origin);
      } catch (e2) {}
    });
    // A page restored from the back-forward cache reads the setting again.
    window.addEventListener("pageshow", function () {
      try {
        set(stored(), false);
      } catch (e) {}
    });
  } catch (e) {}

  // The page's half of the switch: window.mindblown.sound, defined before the
  // page's first line. See the notes above this template for what it is for.
  var api = {
    get on() {
      return on;
    },
    set: function (next) {
      return set(next, true);
    },
    toggle: function () {
      return set(!on, true);
    },
    onchange: function (fn) {
      var hear = function (e) {
        try {
          fn(e.detail.on);
        } catch (err) {}
      };
      try {
        window.addEventListener("mindblown:sound", hear);
      } catch (e) {}
      return function () {
        try {
          window.removeEventListener("mindblown:sound", hear);
        } catch (e) {}
      };
    },
  };
  // MERGED, NEVER ASSIGNED: pod.js puts the game id on this same object.
  try {
    window.mindblown = window.mindblown || {};
    window.mindblown.sound = api;
  } catch (e) {}
  if (!on) sweep();
})();
