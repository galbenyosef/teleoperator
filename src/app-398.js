// app 398 — math
// Lines 197333-197615 of readable/app.pretty.js (statement-aligned).
var qT = class {
  constructor() {
    ((this.on = !0),
      (this.strong = 0),
      (this.weak = 0),
      (this.kick = 0),
      (this.buzz = 0),
      (this.t = 0),
      (this._seen = new WeakSet()),
      (this.last = -1e9),
      (this.played = 0));
  }
  pad() {
    let t = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let e of t) if (e && e.connected && e.vibrationActuator) return e;
    return null;
  }
  update(t, e, s = [], n = !0) {
    this.t += t;
    let i = 0,
      a = 0;
    for (let u of s) {
      if (this._seen.has(u)) continue;
      this._seen.add(u);
      let d = u.v || 0;
      u.C?.kerb
        ? (a = Math.max(a, Math.min(0.7, d / 6)))
        : (i = Math.max(i, Math.min(1, (d - 1.5) / 9)));
    }
    ((e.landing || 0) > 0.1 && (i = Math.max(i, Math.min(0.8, e.landing))),
      (this.kick = Math.max(this.kick * Math.exp(-t / 0.12), i)),
      (this.buzz = Math.max(this.buzz * Math.exp(-t / 0.08), a)));
    let r =
        (e.drift || 0) > 0.25 && (e.kmh || 0) > 20
          ? Math.min(0.5, Math.abs(e.beta || 0) * 1.2)
          : 0,
      l =
        (e.aid?.abs || 0) > 0.2
          ? Math.floor(this.t * 24) % 2
            ? 0.35
            : 0.05
          : 0,
      c = e.rpm && e.S?.limiter && e.rpm > e.S.limiter * 0.985 ? 0.12 : 0;
    if (
      ((this.strong = Math.min(1, this.kick + r * 0.6)),
      (this.weak = Math.min(1, this.buzz + r * 0.5 + l + c + this.kick * 0.5)),
      !this.on || !n)
    )
      return;
    let h = performance.now();
    if (h - this.last < 90 * 0.8 || (this.strong < 0.03 && this.weak < 0.03))
      return;
    let f = this.pad();
    if (f) {
      this.last = h;
      try {
        (f.vibrationActuator
          .playEffect("dual-rumble", {
            startDelay: 0,
            duration: 90,
            strongMagnitude: +this.strong.toFixed(3),
            weakMagnitude: +this.weak.toFixed(3),
          })
          ?.catch?.(() => {}),
          this.played++);
      } catch {}
    }
  }
  stop() {
    let t = this.pad();
    try {
      t?.vibrationActuator?.reset?.();
    } catch {}
  }
};
Pn();
var Td = class {
    constructor(t = 0) {
      ((this.x = t), (this.v = 0));
    }
    reset(t) {
      return ((this.x = t), (this.v = 0), t);
    }
    step(t, e, s) {
      let n = 2 / Math.max(e, 0.001),
        i = n * s,
        a = 1 / (1 + i + 0.48 * i * i + 0.235 * i * i * i),
        r = this.x - t,
        l = (this.v + n * r) * s;
      return (
        (this.v = (this.v - n * l) * a),
        (this.x = t + (r + l) * a),
        this.x
      );
    }
  },
  pSt = ["orbit", "side", "lead", "heli", "roadside", "wheel"],
  mSt = ["orbit", "heli"],
  zit = { orbit: 46, side: 40, lead: 48, heli: 55, roadside: 30, wheel: 72 },
  jT = class {
    constructor(t, e) {
      ((this.cam = t),
        (this.cc = e),
        (this.shot = null),
        (this.t = 0),
        (this.len = 0),
        (this.cuts = 0),
        (this.rnd = Math.random),
        (this.px = new Td()),
        (this.py = new Td()),
        (this.pz = new Td()),
        (this.lx = new Td()),
        (this.ly = new Td()),
        (this.lz = new Td()),
        (this.fov = new Td(50)),
        (this.fixed = null),
        (this.a0 = 0),
        (this.side = 1));
    }
    reset() {
      this.shot = null;
    }
    _want(t, e) {
      let s = -Math.sin(t.psi),
        n = -Math.cos(t.psi),
        i = -n,
        a = s,
        r = t.bodyY ?? t.pos.y,
        l = this.side,
        c = this.t,
        h = (d, p, m) => ({
          x: t.pos.x + s * d + i * p * l,
          y: r + m,
          z: t.pos.z + n * d + a * p * l,
        }),
        f,
        u;
      if (e === "orbit") {
        let d = this.a0 + 0.22 * c * l,
          p = this.slow ? 8.8 : 7.2;
        ((f = {
          x: t.pos.x + Math.sin(d) * p,
          y: r + 1.35,
          z: t.pos.z + Math.cos(d) * p,
        }),
          (u = h(0, 0, 0.55)));
      } else
        e === "side"
          ? ((f = h(-1.2, 5.2, 0.85)), (u = h(0.8, 0, 0.6)))
          : e === "lead"
            ? ((f = h(8.5, 1.2, 0.5)), (u = h(0, 0, 0.65)))
            : e === "heli"
              ? ((f = h(-15, 2, 7.5)), (u = h(7, 0, 0.5)))
              : e === "roadside"
                ? ((f = this.fixed), (u = h(0, 0, 0.6)))
                : ((f = h(-2.6, 2.3, 0.38)), (u = h(8, 0.4, 0.5)));
      return { c: f, l: u };
    }
    _clearD(t, e) {
      let s = (t.bodyY ?? t.pos.y) + 0.8,
        n = e.x - t.pos.x,
        i = e.y - s,
        a = e.z - t.pos.z,
        r = Math.hypot(n, i, a) || 1;
      return {
        d: r,
        ok: this.cc?.clear
          ? this.cc.clear(t.pos.x, s, t.pos.z, n / r, i / r, a / r, r, t.pos.y)
          : r,
      };
    }
    _pick(t) {
      let e = Math.hypot(t.vx ?? 0, t.vz ?? 0);
      this.slow = e < 3;
      let s = this.slow ? mSt : pSt;
      for (let n = 0; n < 8; n++) {
        let i = s[(this.rnd() * s.length) | 0];
        if (i === this.shot && s.length > 2) continue;
        if (
          ((this.side = this.rnd() < 0.5 ? -1 : 1),
          (this.a0 = Math.atan2(
            Math.sin(t.psi + Math.PI * 0.75 * this.side),
            Math.cos(t.psi + Math.PI * 0.75 * this.side),
          )),
          i === "roadside")
        ) {
          let l = -Math.sin(t.psi),
            c = -Math.cos(t.psi),
            h = Math.hypot(t.vx ?? 0, t.vz ?? 0),
            f = 28 + Math.min(40, h * 2.2),
            u = t.pos.x + l * f - c * 7 * this.side,
            d = t.pos.z + c * f + l * 7 * this.side;
          this.fixed = { x: u, y: Wi(u, d, null, t.pos.y) + 1.3, z: d };
        }
        this.t = 0;
        let { c: a } = this._want(t, i),
          r = this._clearD(t, a);
        if (!(r.ok < r.d * 0.92))
          return (
            (this.shot = i),
            (this.len = 4.5 + this.rnd() * 2.5),
            this.cuts++,
            !0
          );
      }
      return (
        (this.shot = "heli"),
        (this.t = 0),
        (this.len = 4),
        this.cuts++,
        !0
      );
    }
    update(t, e) {
      let s = e.rp || e;
      ((s.vx = e.vel.x), (s.vz = e.vel.z), (this.t += t));
      let n = !1;
      (!this.shot || this.t > this.len) && (this._pick(s), (n = !0));
      let { c: i, l: a } = this._want(s, this.shot),
        r = this._clearD(s, i);
      if (this.shot === "roadside") {
        let f = -Math.sin(s.psi),
          u = -Math.cos(s.psi);
        ((s.pos.x - i.x) * f + (s.pos.z - i.z) * u > 25 ||
          r.ok < r.d * 0.9 ||
          r.d > 90) &&
          (this._pick(s),
          (n = !0),
          ({ c: i, l: a } = this._want(s, this.shot)));
      } else if (r.ok < r.d * 0.6 && this.t > 0.6 && !n) {
        (this._pick(s), (n = !0), ({ c: i, l: a } = this._want(s, this.shot)));
        let f = this._clearD(s, i);
        if (f.ok < f.d) {
          let u = (s.bodyY ?? s.pos.y) + 0.8,
            d = Math.max(0.2, f.ok / f.d);
          i = {
            x: s.pos.x + (i.x - s.pos.x) * d,
            y: u + (i.y - u) * d,
            z: s.pos.z + (i.z - s.pos.z) * d,
          };
        }
      } else if (r.ok < r.d) {
        let f = (s.bodyY ?? s.pos.y) + 0.8,
          u = Math.max(0.2, r.ok / r.d);
        i = {
          x: s.pos.x + (i.x - s.pos.x) * u,
          y: f + (i.y - f) * u,
          z: s.pos.z + (i.z - s.pos.z) * u,
        };
      }
      i.y = Math.max(i.y, Wi(i.x, i.z, null, i.y) + 0.3);
      let l = this.shot === "roadside" ? 0.05 : 0.22,
        c = 0.12;
      (n &&
        (this.px.reset(i.x),
        this.py.reset(i.y),
        this.pz.reset(i.z),
        this.lx.reset(a.x),
        this.ly.reset(a.y),
        this.lz.reset(a.z),
        this.fov.reset(zit[this.shot])),
        this.cam.position.set(
          this.px.step(i.x, l, t),
          this.py.step(i.y, l, t),
          this.pz.step(i.z, l, t),
        ),
        this.cam.up.set(0, 1, 0),
        this.cam.lookAt(
          this.lx.step(a.x, c, t),
          this.ly.step(a.y, c, t),
          this.lz.step(a.z, c, t),
        ));
      let h = this.fov.step(zit[this.shot], 0.4, t);
      return (
        (Math.abs(this.cam.fov - h) > 0.01 || this.cam.near !== 0.3) &&
          ((this.cam.fov = h),
          (this.cam.near = 0.3),
          this.cam.updateProjectionMatrix()),
        this.shot
      );
    }
  };
lM();
