// app 355 — math
// Lines 173514-173863 of readable/app.pretty.js (statement-aligned).
function ryt(i, t, e, s) {
  if (i.t === "box")
    return t > i.x0 - s && t < i.x1 + s && e > i.z0 - s && e < i.z1 + s;
  if (i.t === "obb") {
    let a = t - i.x,
      r = e - i.z,
      l = a * i.c - r * i.s,
      c = a * i.s + r * i.c;
    return Math.abs(l) < i.hx + s && Math.abs(c) < i.hz + s;
  }
  if (t < i.bb[0] - s || t > i.bb[2] + s || e < i.bb[1] - s || e > i.bb[3] + s)
    return !1;
  let n = i.pts,
    o = !1;
  for (let a = 0, r = n.length - 2; a < n.length; r = a, a += 2) {
    let l = n[a],
      c = n[a + 1],
      h = n[r],
      f = n[r + 1];
    c > e != f > e && t < ((h - l) * (e - c)) / (f - c) + l && (o = !o);
  }
  return o;
}
var jz = class {
  constructor() {
    ((this.T = 0), (this.err = 0), (this.n = 0));
  }
  step(t) {
    if (!(t > 0)) return 0;
    if (this.n < 8)
      return ((this.T = this.T ? this.T + (t - this.T) * 0.3 : t), this.n++, t);
    let e = Math.round(t / this.T);
    if (
      (e === 1 &&
        Math.abs(t - this.T) < 0.25 * this.T &&
        (this.T += (t - this.T) * 0.02),
      e < 1 || e > 4 || Math.abs(t - e * this.T) > 0.3 * this.T)
    )
      return ((this.err = 0), t);
    this.err += t - e * this.T;
    let s = Math.max(-0.1 * this.T, Math.min(0.1 * this.T, this.err * 0.1));
    return ((this.err -= s), e * this.T + s);
  }
};
var Vz = class {
  constructor(t) {
    ((this.keys = new Set()),
      (this.actions = new Set()),
      (this.touch = { steer: 0, gas: 0, brake: 0, hb: 0, nitro: 0 }),
      (this.lastDevice = "kb"),
      addEventListener("keydown", (e) => {
        if (e.repeat) return;
        (this.keys.add(e.code), (this.lastDevice = "kb"));
        let s = {
          KeyR: "reset",
          KeyC: "camera",
          KeyV: "camera",
          KeyH: "help",
          KeyM: "mute",
          KeyK: "music",
          KeyL: "radio",
          KeyE: "inspect",
          KeyT: "time",
          KeyU: "units",
          KeyP: "pause",
          Escape: "pause",
          KeyF: "photo",
          KeyZ: "shiftDown",
          KeyX: "shiftUp",
          KeyI: "assist",
        }[e.code];
        (s && this.actions.add(s),
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(
            e.code,
          ) && e.preventDefault());
      }),
      addEventListener("keyup", (e) => this.keys.delete(e.code)),
      addEventListener("blur", () => this.keys.clear()),
      (this.padPrev = []),
      (this.padDZ = 0.12),
      (this.padCurve = 1.4));
  }
  bindTouch(t) {
    let e = (o, a) => {
      let r = t.querySelector(o);
      if (!r) return;
      let l = (h) => {
          (h.preventDefault(),
            (this.touch[a] = 1),
            (this.lastDevice = "touch"),
            r.classList.add("on"));
        },
        c = (h) => {
          (h.preventDefault(), (this.touch[a] = 0), r.classList.remove("on"));
        };
      (r.addEventListener("pointerdown", l),
        r.addEventListener("pointerup", c),
        r.addEventListener("pointercancel", c),
        r.addEventListener("pointerleave", c));
    };
    (e("#tGas", "gas"),
      e("#tBrake", "brake"),
      e("#tHb", "hb"),
      e("#tNitro", "nitro"));
    let s = t.querySelector("#tCam");
    s &&
      s.addEventListener("pointerdown", (o) => {
        (o.preventDefault(), this.actions.add("camera"));
      });
    let n = t.querySelector("#tSteer");
    if (n) {
      let o = null,
        a = 0,
        r = (c) => {
          (n.style.setProperty("--s", (-c).toFixed(3)),
            n.classList.toggle("on", o !== null));
        };
      (n.addEventListener("pointerdown", (c) => {
        (c.preventDefault(),
          (o = c.pointerId),
          (a = c.clientX),
          n.setPointerCapture(o),
          (this.lastDevice = "touch"),
          r(0));
      }),
        n.addEventListener("pointermove", (c) => {
          c.pointerId === o &&
            ((this.touch.steer = Math.max(
              -1,
              Math.min(1, -(c.clientX - a) / 70),
            )),
            r(this.touch.steer));
        }));
      let l = (c) => {
        c.pointerId === o && ((o = null), (this.touch.steer = 0), r(0));
      };
      (n.addEventListener("pointerup", l),
        n.addEventListener("pointercancel", l));
    }
  }
  bindGestures(t) {
    let e = new Map(),
      s = null,
      n = !1,
      o = !1,
      a = (this.gesture = {
        active: !1,
        steer: 0,
        brake: !1,
        fingers: 0,
        x0: 0,
        y0: 0,
      }),
      r = () => Math.max(70, Math.min(170, innerWidth * 0.22)),
      l = 10,
      c = () => {
        let d = this.touch,
          p = s !== null ? e.get(s) : null;
        if (((a.fingers = e.size), (a.active = !!p), !p)) {
          ((d.gas = 0),
            (d.brake = 0),
            (d.steer = 0),
            (a.steer = 0),
            (a.brake = !1),
            (a.coast = !1),
            (n = !1),
            (o = !1));
          return;
        }
        let m = p.x - p.x0,
          g = p.y - p.y0,
          b = Math.max(0, Math.abs(m) - l) / r();
        ((d.steer = -Math.sign(m) * Math.min(1, Math.pow(b, 1.15))),
          (n = n ? g > 36 : g > 60),
          (o = o ? g > 18 : g > 30));
        let x = n || e.size >= 2;
        ((d.brake = x ? 1 : 0),
          (d.gas = x || o ? 0 : 1),
          (a.steer = d.steer),
          (a.brake = x),
          (a.coast = o && !x),
          (a.x0 = p.x0),
          (a.y0 = p.y0));
      },
      h = (d) => {
        if (!(
          d.pointerType === "mouse" &&
          !document.body.classList.contains("touch")
        )) {
          (d.preventDefault(),
            e.set(d.pointerId, {
              x0: d.clientX,
              y0: d.clientY,
              x: d.clientX,
              y: d.clientY,
            }),
            s === null && (s = d.pointerId));
          try {
            t.setPointerCapture(d.pointerId);
          } catch {}
          ((this.lastDevice = "touch"), c());
        }
      },
      f = (d) => {
        let p = e.get(d.pointerId);
        p &&
          (d.preventDefault(),
          (p.x = d.clientX),
          (p.y = d.clientY),
          d.pointerId === s && c());
      },
      u = (d) => {
        if (e.has(d.pointerId)) {
          if ((e.delete(d.pointerId), d.pointerId === s)) {
            ((s = null), (n = !1), (o = !1));
            let [p, m] = [...e.entries()][0] || [];
            p !== void 0 && ((s = p), (m.x0 = m.x), (m.y0 = m.y));
          }
          c();
        }
      };
    (t.addEventListener("pointerdown", h),
      t.addEventListener("pointermove", f),
      t.addEventListener("pointerup", u),
      t.addEventListener("pointercancel", u),
      t.addEventListener("lostpointercapture", u),
      (this.releaseGestures = () => {
        (e.clear(), (s = null), c());
      }));
  }
  kbSteer(t) {
    let e = performance.now(),
      s = Math.min(0.1, Math.max(0, (e - (this._kbT ?? e)) / 1e3));
    this._kbT = e;
    let n = this._kb || 0;
    if (t === 0 || (n && Math.sign(t) !== Math.sign(n))) {
      let r = s / 0.06;
      if (((n = Math.abs(n) <= r ? 0 : n - Math.sign(n) * r), t === 0))
        return ((this._kb = n), n);
    }
    let o = 0.1 + (0.3 - 0.1) * Math.min(1, Math.max(0, (this.kmh || 0) / 50)),
      a = s / o;
    return (
      (n = Math.abs(t - n) <= a ? t : n + Math.sign(t - n) * a),
      (this._kb = n),
      n
    );
  }
  take(t) {
    let e = this.actions.has(t);
    return (this.actions.delete(t), e);
  }
  read() {
    let t = (d) => this.keys.has(d),
      e = +(t("KeyW") || t("ArrowUp")),
      s = +(t("KeyS") || t("ArrowDown")),
      n = this.kbSteer(
        +(t("KeyA") || t("ArrowLeft")) - +(t("KeyD") || t("ArrowRight")),
      ),
      o = t("Space");
    o && (s = 1);
    let a = o && n !== 0 ? 1 : 0,
      r = t("ShiftLeft") || t("ShiftRight") || t("KeyN"),
      l = t("Backspace"),
      c = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let d of c) {
      if (!d || !d.connected) continue;
      let p = (v) => (d.buttons[v] ? d.buttons[v].value : 0),
        m = (v) => !!(d.buttons[v] && d.buttons[v].pressed),
        g = Math.abs(d.axes[0]) > this.padDZ ? d.axes[0] : 0;
      ((p(7) > 0.05 || p(6) > 0.05 || g !== 0 || m(0) || m(2)) &&
        (this.lastDevice = "pad"),
        (e = Math.max(e, p(7))),
        (s = Math.max(s, p(6))),
        g && (n = -Math.sign(g) * Math.pow(Math.abs(g), this.padCurve)),
        (a = Math.max(a, p(0))),
        (r = r || m(2) || m(1)),
        (l = l || m(14)));
      let x = (v, y) => {
        (m(v) && !this.padPrev[v] && this.actions.add(y),
          (this.padPrev[v] = m(v)));
      };
      (x(3, "camera"),
        x(9, "pause"),
        x(8, "reset"),
        x(12, "time"),
        x(4, "shiftDown"),
        x(5, "shiftUp"),
        x(13, "assist"),
        x(15, "radio"));
      break;
    }
    let h = this.touch;
    ((e = Math.max(e, h.gas)),
      (s = Math.max(s, h.brake)),
      h.steer && (n = h.steer),
      (a = Math.max(a, h.hb)),
      (r = r || !!h.nitro));
    let f = t("KeyB"),
      u =
        s > 0 &&
        Math.max(+(t("KeyS") || t("ArrowDown") || t("Space")), h.brake) >= s;
    return (
      (l = l || !!h.rw),
      {
        throttle: e,
        brake: s,
        steer: n,
        handbrake: a,
        nitro: r,
        lookBack: f,
        digitalBrake: u,
        rewind: l,
        player: !0,
      }
    );
  }
};
var Ep = "sf-drive.settings";
function ev() {
  try {
    let i = JSON.parse(localStorage.getItem(Ep) || "{}") || {};
    return {
      on: i.music !== !1,
      vol: typeof i.musicVol == "number" ? i.musicVol : 0.7,
      station: i.station >= 0 && i.station < qu.length ? i.station | 0 : 0,
    };
  } catch {
    return { on: !0, vol: 0.7, station: 0 };
  }
}
function Km(i, t) {
  try {
    let e = JSON.parse(localStorage.getItem(Ep) || "{}") || {};
    ((e.music = i),
      (e.musicVol = t),
      localStorage.setItem(Ep, JSON.stringify(e)));
  } catch {}
}
var qu = [
  { id: "mix", name: "Horizon Mix", energy: null },
  { id: "cruise", name: "Bay Cruise FM", energy: ["cruise"] },
  { id: "drive", name: "Redline Radio", energy: ["drive", "high"] },
];
function uM(i) {
  try {
    let t = JSON.parse(localStorage.getItem(Ep) || "{}") || {};
    ((t.station = i), localStorage.setItem(Ep, JSON.stringify(t)));
  } catch {}
}
