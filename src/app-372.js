// app 372 — math
// Lines 180017-180361 of readable/app.pretty.js (statement-aligned).
function Rnt(o, t, e, s) {
  if (o.t === "box")
    return t > o.x0 - s && t < o.x1 + s && e > o.z0 - s && e < o.z1 + s;
  if (o.t === "obb") {
    let a = t - o.x,
      r = e - o.z,
      l = a * o.c - r * o.s,
      c = a * o.s + r * o.c;
    return Math.abs(l) < o.hx + s && Math.abs(c) < o.hz + s;
  }
  if (t < o.bb[0] - s || t > o.bb[2] + s || e < o.bb[1] - s || e > o.bb[3] + s)
    return !1;
  let n = o.pts,
    i = !1;
  for (let a = 0, r = n.length - 2; a < n.length; r = a, a += 2) {
    let l = n[a],
      c = n[a + 1],
      h = n[r],
      f = n[r + 1];
    c > e != f > e && t < ((h - l) * (e - c)) / (f - c) + l && (i = !i);
  }
  return i;
}
var lT = class {
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
var cT = class {
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
          KeyQ: "fans",
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
    let e = (i, a) => {
      let r = t.querySelector(i);
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
      s.addEventListener("pointerdown", (i) => {
        (i.preventDefault(), this.actions.add("camera"));
      });
    let n = t.querySelector("#tSteer");
    if (n) {
      let i = null,
        a = 0,
        r = (c) => {
          (n.style.setProperty("--s", (-c).toFixed(3)),
            n.classList.toggle("on", i !== null));
        };
      (n.addEventListener("pointerdown", (c) => {
        (c.preventDefault(),
          (i = c.pointerId),
          (a = c.clientX),
          n.setPointerCapture(i),
          (this.lastDevice = "touch"),
          r(0));
      }),
        n.addEventListener("pointermove", (c) => {
          c.pointerId === i &&
            ((this.touch.steer = Math.max(
              -1,
              Math.min(1, -(c.clientX - a) / 70),
            )),
            r(this.touch.steer));
        }));
      let l = (c) => {
        c.pointerId === i && ((i = null), (this.touch.steer = 0), r(0));
      };
      (n.addEventListener("pointerup", l),
        n.addEventListener("pointercancel", l));
    }
  }
  bindGestures(t) {
    let e = new Map(),
      s = null,
      n = !1,
      i = !1,
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
            (i = !1));
          return;
        }
        let m = p.x - p.x0,
          g = p.y - p.y0,
          b = Math.max(0, Math.abs(m) - l) / r();
        ((d.steer = -Math.sign(m) * Math.min(1, Math.pow(b, 1.15))),
          (n = n ? g > 36 : g > 60),
          (i = i ? g > 18 : g > 30));
        let v = n || e.size >= 2;
        ((d.brake = v ? 1 : 0),
          (d.gas = v || i ? 0 : 1),
          (a.steer = d.steer),
          (a.brake = v),
          (a.coast = i && !v),
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
            ((s = null), (n = !1), (i = !1));
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
    let i = 0.1 + (0.3 - 0.1) * Math.min(1, Math.max(0, (this.kmh || 0) / 50)),
      a = s / i;
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
    let t = (b) => this.keys.has(b),
      e = +(t("KeyW") || t("ArrowUp")),
      s = +(t("KeyS") || t("ArrowDown")),
      n = this.kbSteer(
        +(t("KeyA") || t("ArrowLeft")) - +(t("KeyD") || t("ArrowRight")),
      ),
      i = t("Space"),
      a = i ? 1 : 0,
      r = t("ShiftLeft") || t("ShiftRight") || t("KeyN"),
      l = t("Backspace"),
      c = t("KeyJ"),
      h = !1,
      f = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let b of f) {
      if (!b || !b.connected) continue;
      let v = (w) => (b.buttons[w] ? b.buttons[w].value : 0),
        x = (w) => !!(b.buttons[w] && b.buttons[w].pressed),
        y = Math.abs(b.axes[0]) > this.padDZ ? b.axes[0] : 0;
      ((v(7) > 0.05 || v(6) > 0.05 || y !== 0 || x(0) || x(2)) &&
        (this.lastDevice = "pad"),
        (e = Math.max(e, v(7))),
        (s = Math.max(s, v(6))),
        y && (n = -Math.sign(y) * Math.pow(Math.abs(y), this.padCurve)),
        (a = Math.max(a, v(0))),
        (r = r || x(2) || x(1)),
        (l = l || x(14)),
        (c = c || x(5)),
        (h = x(0)));
      let S = (w, _) => {
        (x(w) && !this.padPrev[w] && this.actions.add(_),
          (this.padPrev[w] = x(w)));
      };
      (S(3, "camera"),
        S(9, "pause"),
        S(8, "reset"),
        S(12, "time"),
        S(4, "shiftDown"),
        S(5, "shiftUp"),
        S(13, "assist"),
        S(15, "radio"));
      break;
    }
    let u = this.touch;
    ((e = Math.max(e, u.gas)),
      (s = Math.max(s, u.brake)),
      u.steer && (n = u.steer),
      (a = Math.max(a, u.hb)),
      (r = r || !!u.nitro));
    let d = t("KeyB"),
      p = s > 0 && Math.max(+(t("KeyS") || t("ArrowDown")), u.brake) >= s,
      m = e > 0 && Math.max(+(t("KeyW") || t("ArrowUp")), u.gas) >= e;
    ((l = l || !!u.rw), (c = c || !!u.lift));
    let g = i || h || !!u.flip;
    return {
      throttle: e,
      brake: s,
      steer: n,
      handbrake: a,
      nitro: r,
      lookBack: d,
      digitalBrake: p,
      digitalThrottle: m,
      rewind: l,
      lift: c,
      flip: g,
      player: !0,
    };
  }
};
if (typeof AudioParam < "u" && !AudioParam.prototype.sfSafe) {
  let o = AudioParam.prototype,
    t = !1;
  o.sfSafe = !0;
  for (let e of [
    "setValueAtTime",
    "setTargetAtTime",
    "linearRampToValueAtTime",
    "exponentialRampToValueAtTime",
  ]) {
    let s = o[e];
    o[e] = function (n, i, a) {
      return Number.isFinite(n) &&
        Number.isFinite(i) &&
        (a === void 0 || Number.isFinite(a))
        ? s.apply(this, arguments)
        : (t || ((t = !0), console.warn("audio: a non-finite " + e, n, i, a)),
          this);
    };
  }
}
var f1 = "sf-drive.settings";
