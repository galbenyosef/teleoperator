// app 316 — math
// Lines 151581-151737 of readable/app.pretty.js (statement-aligned).
var Y_ = 1.7,
  Vtt = 0.3,
  SO = 0.55,
  Lwt = 15,
  Wtt = new dt(),
  J_ = class {
    constructor({ flash: t = null } = {}) {
      ((this.on = !1),
        (this.t = 0),
        (this.hs = 0),
        (this.cool = 0),
        (this.flash = t),
        (this.shots = 0));
    }
    trigger(t, e, s, n = 1) {
      if (this.on || this.cool > 0 || this.off) return !1;
      ((this.on = !0),
        (this.t = 0),
        (this.target = t),
        (this.k = n),
        this.shots++,
        (this.v = s),
        (this.lift = 0));
      let i = s
          ? { x: -Math.sin(s.psi), z: -Math.cos(s.psi) }
          : { x: 0, z: -1 },
        a = Math.random() < 0.5 ? -1 : 1,
        r = 5.5 + 2 * Math.random(),
        l = e.y + 0.7 + 0.8 * Math.random(),
        c = 1.5 + 1.5 * n,
        h = { x: e.x, y: e.y + 0.8, z: e.z },
        f = 1.5 + 1.5 * Math.random(),
        u = (p, m, g) =>
          new dt(
            e.x - i.x * c - i.z * p * m,
            l + g,
            e.z - i.z * c + i.x * p * m,
          ),
        d = a;
      if (((this.pos = u(a, r, 0)), this.blocked))
        for (let [p, m, g] of [
          [a, r, 0],
          [-a, r, 0],
          [a, 4, 0],
          [-a, 4, 0],
          [a, r, 1.6],
          [-a, r, 1.6],
          [a, 3, 2.4],
          [-a, 3, 2.4],
        ]) {
          let b = u(p, m, g),
            v = b.clone().addScaledVector(new dt(i.x, 0, i.z), f);
          if (!this.blocked(b, h) && !this.blocked(v, h)) {
            ((this.pos = b), (d = p));
            break;
          }
        }
      return (
        (this.y0 = this.pos.y),
        (this.roll = d * (0.1 + 0.08 * Math.random())),
        (this.drift = new dt(i.x, 0, i.z).multiplyScalar(f)),
        (this.look = new dt(e.x, e.y + 0.8, e.z)),
        (this.fov = 38),
        this.stop(0.07 + 0.05 * n),
        this.flash &&
          ((this.flash.style.transition = "none"),
          (this.flash.style.opacity = String(0.55 + 0.3 * n)),
          requestAnimationFrame(() => {
            ((this.flash.style.transition = "opacity 0.35s ease-out"),
              (this.flash.style.opacity = "0"));
          })),
        !0
      );
    }
    stop(t) {
      this.off || (this.hs = Math.max(this.hs, t));
    }
    scale(t) {
      if ((this.cool > 0 && (this.cool -= t), this.hs > 0))
        return ((this.hs -= t), 0.06);
      if (!this.on) return 1;
      if (((this.t += t), this.t >= Y_))
        return ((this.on = !1), (this.cool = Lwt), 1);
      let e = this.t > Y_ - SO ? (this.t - (Y_ - SO)) / SO : 0;
      return Vtt + (1 - Vtt) * e * e;
    }
    clearOf(t, e) {
      if (!t?.pos) return;
      let s = t.S?.box,
        n = (s?.hx ?? 0.97) + 1.5,
        i = (s?.hz ?? 2.27) + 1.5,
        a = s?.off ?? 0.15,
        r = -Math.sin(t.psi),
        l = -Math.cos(t.psi),
        c = t.pos.x + r * a,
        h = t.pos.z + l * a,
        f = this.pos.x - c,
        u = this.pos.z - h,
        d = f * r + u * l,
        p = f * -l + u * r,
        m = n - Math.abs(p),
        g = i - Math.abs(d),
        b = Math.min(1, e * 6);
      if (m > 0 && g > 0)
        if (m < g) {
          let y = Math.sign(p || 1) * m * b;
          ((this.pos.x += -l * y), (this.pos.z += r * y));
        } else {
          let y = Math.sign(d || 1) * g * b;
          ((this.pos.x += r * y), (this.pos.z += l * y));
        }
      let v = this.target?.(),
        x = !1;
      if (v) {
        let y = v.x - c,
          M = v.z - h,
          S = y * -l + M * r,
          w = y * r + M * l,
          _ = (s?.hx ?? 0.97) + 0.2,
          z = (s?.hz ?? 2.27) + 0.2;
        for (let A = 1; A < 10 && !x; A++) {
          let T = A / 10,
            E = p + (S - p) * T,
            R = d + (w - d) * T;
          x = Math.abs(E) < _ && Math.abs(R) < z;
        }
      }
      (x && (this.lift = Math.max(this.lift, t.pos.y + 2.6 - this.y0)),
        (this.pos.y +=
          (this.y0 + Math.max(0, this.lift) - this.pos.y) *
          Math.min(1, e * 5)));
    }
    apply(t, e) {
      if (!this.on) return !1;
      this.pos.addScaledVector(this.drift, e);
      let s = this.target?.();
      s &&
        (Wtt.set(s.x, s.y + 0.6, s.z), this.look.lerp(Wtt, Math.min(1, e * 7)));
      let n = 0.06 * this.k * Math.exp(-this.t * 3);
      (this.clearOf(this.v, e),
        t.position.set(
          this.pos.x + (Math.random() - 0.5) * n,
          this.pos.y + (Math.random() - 0.5) * n + 0.015 * Math.sin(this.t * 7),
          this.pos.z + (Math.random() - 0.5) * n,
        ),
        t.lookAt(this.look),
        t.rotateZ(this.roll));
      let i = this.fov - 4 * Math.min(1, this.t / Y_);
      return (
        t.fov !== i && ((t.fov = i), t.updateProjectionMatrix()),
        t.updateMatrixWorld(),
        !0
      );
    }
  };
es();
es();
