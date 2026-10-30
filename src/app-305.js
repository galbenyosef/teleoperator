// app 305 — math
// Lines 148184-148441 of readable/app.pretty.js (statement-aligned).
var Ci = Ia("meet", ptt),
  U5t = 650,
  G5t = 6.5,
  V5t = 0.5,
  W5t = /hedge|planter|shrub|tree|palm|flowers|bed|bench|cypress|euc|pine/,
  A_ = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.state = "idle"),
        (this.cars = []),
        (this.colliders = []),
        (this.slots = null));
    }
    _slots() {
      let t = this.L,
        e = t.roadAt(Ci.x, Ci.z, 60);
      if (!e?.E) return [];
      let s = (this.E = e.E),
        n = {},
        i = Ci.ids.length,
        a = (c, h, f) => {
          let u = [];
          for (let d = 0; d < i; d++) {
            let p = Math.max(
              s.s0 + 8,
              Math.min(s.s1 - 8, e.s + Ci.along + f + (d - (i - 1) / 2) * G5t),
            );
            this.sampleAt(s, p, n);
            let m = Math.max(s.W[n.k] || 4, s.W[n.k + 1] || 4),
              g = (m + h) * c,
              b = n.x - n.dz * g,
              v = n.z + n.dx * g,
              x = Math.atan2(-n.dx, -n.dz) + (Math.PI / 2 + V5t) * c;
            u.push({ x: b, z: v, psi: x, y: t.driveHeight(b, v, null, n.y) });
          }
          return u;
        },
        r = null,
        l = 1e9;
      for (let c of [0, -7, 7, -14, 14, -21, 21])
        for (let h of [3.6, 4.6, 5.8])
          for (let f of [1, -1]) {
            let u = a(f, h, c),
              d = this._cost(u, s);
            if ((d < l && ((r = u), (l = d)), !d)) return u;
          }
      return r;
    }
    _plants() {
      let t = this.inst?.() || [],
        e = t.reduce((s, n) => s + n.length, 0);
      if (this._pn !== e) {
        ((this._pn = e), (this._pl = []));
        for (let s of t)
          for (let n of s)
            Math.abs(n.x - Ci.x) < 120 &&
              Math.abs(n.z - Ci.z) < 120 &&
              W5t.test(n.kind) &&
              this._pl.push(n);
      }
      return this._pl;
    }
    _cost(t, e) {
      let s = this.L,
        n = 1.25,
        i = 3.1,
        a = this._plants(),
        r = 0;
      for (let l of t) {
        let c = { x: Math.cos(l.psi), z: -Math.sin(l.psi) },
          h = { x: Math.sin(l.psi), z: Math.cos(l.psi) };
        for (let d of this.world.near?.(l.x, l.z, i + 1.5) || [])
          !d.traffic &&
            !d.dead &&
            !d.meet &&
            (d.y1 === void 0 || (l.y < d.y1 + 0.3 && l.y + 1.4 > d.y0)) &&
            this.world.test(d, l.x, l.z, c, h, n, i) &&
            (r += 2);
        for (let d of a) {
          let p = d.x - l.x,
            m = d.z - l.z;
          Math.abs(p) > 5 ||
            Math.abs(m) > 5 ||
            (Math.abs(p * c.x + m * c.z) < n + 0.7 &&
              Math.abs(p * h.x + m * h.z) < i + 0.7 &&
              r++);
        }
        let f = 1e9,
          u = -1e9;
        for (let d of [-1, 1])
          for (let p of [-1, 1]) {
            let m = l.x + c.x * d * n + h.x * p * i,
              g = l.z + c.z * d * n + h.z * p * i,
              b = s.driveHeight(m, g);
            ((f = Math.min(f, b)), (u = Math.max(u, b)));
            let v = s.roadAt(m, g, 2.5, void 0, !0);
            v && v.E !== e && (r += 2);
          }
        u - f > 0.45 && r++;
      }
      return r;
    }
    async _build() {
      if (
        ((this.state = "loading"),
        (this.slots = this._slots()),
        !this.slots.length)
      ) {
        this.state = "none";
        return;
      }
      {
        let t = this.slots.length;
        this.onSlots?.({
          x: this.slots.reduce((e, s) => e + s.x, 0) / t,
          z: this.slots.reduce((e, s) => e + s.z, 0) / t,
        });
      }
      for (let t = 0; t < this.slots.length; t++) {
        let e = this.slots[t],
          s = null;
        try {
          s = await this.loadCar(Ci.ids[t]);
        } catch (l) {
          console.warn("meet: " + Ci.ids[t], l?.message || l);
          continue;
        }
        if (!s) continue;
        try {
          Ci.paints[t] && this.applyPaint(s, Ci.paints[t]);
        } catch {}
        let n = {
          pos: { x: e.x, y: e.y, z: e.z },
          psi: e.psi,
          pitch: 0,
          roll: 0,
          heave: 0,
          bodyPitch: 0,
          bodyRoll: 0,
          bodyY: e.y,
          steer: 0,
          wheelSpin: [0, 0, 0, 0],
          speed: 0,
        };
        (this.poseCar(s, n), s.root.updateMatrixWorld(!0));
        try {
          this.setLamps(s, { tail: 0.7, head: 0.6, signal: 0 });
        } catch {}
        (this.scene.add(s.root), this.cars.push(s), (s.meetSlot = t));
        let i = s.dims?.l ?? 4.7,
          a = s.dims?.w ?? 1.95,
          r = {
            t: "obb",
            x: e.x,
            z: e.z,
            hx: a / 2,
            hz: i / 2,
            c: Math.cos(e.psi),
            s: Math.sin(e.psi),
            y0: e.y - 0.5,
            y1: e.y + 1.6,
            meet: !0,
          };
        (this.world.index(r), this.colliders.push(r), (s.meetC = r));
      }
      ((this.state = "built"),
        (this.recheck = performance.now() + 6e3),
        console.log(
          `meet spot: ${this.cars.length} show cars at the ${Ci.name}`,
        ));
    }
    _recheck() {
      if (!this._cost(this.slots, this.E)) return !1;
      for (let e of this.colliders) e.dead = !0;
      let t = this._slots();
      for (let e of this.colliders) e.dead = !1;
      if (!t?.length || this._cost(t, this.E) >= this._cost(this.slots, this.E))
        return !1;
      this.slots = t;
      for (let e of this.cars) {
        let s = t[e.meetSlot],
          n = e.meetC;
        s &&
          (this.poseCar(e, {
            pos: { x: s.x, y: s.y, z: s.z },
            psi: s.psi,
            pitch: 0,
            roll: 0,
            heave: 0,
            bodyPitch: 0,
            bodyRoll: 0,
            bodyY: s.y,
            steer: 0,
            wheelSpin: [0, 0, 0, 0],
            speed: 0,
          }),
          e.root.updateMatrixWorld(!0),
          n &&
            (this.world.unindex?.(n),
            Object.assign(n, {
              x: s.x,
              z: s.z,
              c: Math.cos(s.psi),
              s: Math.sin(s.psi),
              y0: s.y - 0.5,
              y1: s.y + 1.6,
            }),
            this.world.index(n)));
      }
      {
        let e = t.length;
        this.onSlots?.({
          x: t.reduce((s, n) => s + n.x, 0) / e,
          z: t.reduce((s, n) => s + n.z, 0) / e,
        });
      }
      return (console.log("meet spot: moved clear of what came after it"), !0);
    }
    update(t) {
      (this.state === "built" &&
        this.recheck &&
        performance.now() > this.recheck &&
        ((this.recheck = 0), this._recheck()),
        this.state === "idle" &&
          Math.hypot(t.pos.x - Ci.x, t.pos.z - Ci.z) < U5t &&
          this._build().catch((e) => {
            (console.warn("meet", e), (this.state = "none"));
          }));
    }
    marker() {
      return {
        x: Ci.x,
        z: Ci.z,
        kind: "star",
        col: "#ff2fa0",
        name: "Car meet \xB7 " + Ci.name,
        stars: 0,
      };
    }
  };
lM();
var fO = {};
Kh(fO, {
  ACCENT: () => Zp,
  ICONS: () => Nl,
  LABEL: () => cO,
  Notify: () => C_,
  badge: () => Br,
  el: () => q5t,
  esc: () => Or,
  icon: () => L_,
  mount: () => aa,
  notify: () => dd,
  paintIcon: () => b2,
  stars: () => pv,
  style: () => Th,
  zone: () => hO,
});
