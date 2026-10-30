// app 317 — math
// Lines 151738-152086 of readable/app.pretty.js (statement-aligned).
var Iwt = 9.81,
  Fwt = new fe(),
  qtt = new yn(),
  Df = new Float64Array(9),
  pd = new dt(),
  Hl = new dt(),
  kO = new dt(),
  v2 = new dt(),
  s1 = new dt(),
  FM = new dt(),
  gv = new tn(),
  Rh = new dt(),
  OM = new dt(),
  Owt = new dt(),
  Bwt = 0.95,
  Nwt = 0.05,
  y2 = class {
    constructor({
      hx: t = 0.95,
      hz: e = 2.3,
      h: s = 1.4,
      y0: n = 0.55,
      cz: i = 0,
      mass: a = 1500,
      mu: r = 0.55,
      roll: l = 0.06,
      wb: c = null,
      tw: h = null,
    } = {}) {
      (Object.assign(this, {
        hx: t,
        hz: e,
        h: s,
        y0: n,
        cz: i,
        mass: a,
        mu: r,
        roll: l,
      }),
        (this.p = new dt()),
        (this.v = new dt()),
        (this.q = new tn()),
        (this.w = new dt()));
      let f = t * 2,
        u = e * 2;
      ((this.Ib = [
        (a / 12) * (s * s + u * u),
        (a / 12) * (f * f + u * u),
        (a / 12) * (f * f + s * s),
      ].map((g) => g * 1.15)),
        (this.C = []),
        (this.kind = []));
      let d = -n + 0.1,
        p = -n + s,
        m = (g, b, v, x) => {
          (this.C.push(new dt(g, b, v)), this.kind.push(x));
        };
      ((c ??= e * 0.6), (h ??= t * 0.85));
      for (let g of [-1, 1])
        for (let b of [-1, 1])
          (m(g * h, -n, i + b * c, 1),
            m(g * t, d + 0.12, i + b * e, 2),
            m(g * t * 0.8, p, i + b * e * 0.62, 0),
            m(g * t * 0.97, -n + s * 0.5, i + b * e * 0.98, 0));
      for (let g of [-1, 1])
        (m(g * t, -n + s * 0.55, i, 0), m(g * t, d + 0.06, i, 2));
      (m(0, p, i, 0),
        (this.pend = []),
        (this.cd = new Float32Array(this.C.length)),
        (this.lx = new Float64Array(this.C.length).fill(NaN)),
        (this.lz = new Float64Array(this.C.length)),
        (this.still = 0),
        (this.onGround = !1));
    }
    inertia() {
      qtt.setFromMatrix4(Fwt.makeRotationFromQuaternion(this.q));
      let t = qtt.elements,
        e = [1 / this.Ib[0], 1 / this.Ib[1], 1 / this.Ib[2]];
      for (let s = 0; s < 3; s++)
        for (let n = 0; n < 3; n++) {
          let i = 0;
          for (let a = 0; a < 3; a++) i += t[s + 3 * a] * e[a] * t[n + 3 * a];
          Df[s + 3 * n] = i;
        }
    }
    mulI(t, e) {
      return t.set(
        Df[0] * e.x + Df[3] * e.y + Df[6] * e.z,
        Df[1] * e.x + Df[4] * e.y + Df[7] * e.z,
        Df[2] * e.x + Df[5] * e.y + Df[8] * e.z,
      );
    }
    push(t, e) {
      (this.v.addScaledVector(e, 1 / this.mass),
        s1.crossVectors(t, e),
        this.mulI(v2, s1),
        this.w.add(v2));
    }
    kOf(t, e) {
      return (
        s1.crossVectors(t, e),
        this.mulI(v2, s1),
        s1.crossVectors(v2, t),
        1 / this.mass + e.dot(s1)
      );
    }
    velAt(t, e) {
      return t.crossVectors(this.w, e).add(this.v);
    }
    step(t, e, s = null, n = null, i = 1 / 240) {
      for (let r = Math.max(1, Math.ceil(t / i - 1e-6)), l = t / r; r > 0; r--)
        this.sub(l, e, s, n);
      let a = this.v.length() > 0.5 || this.w.length() > 0.6;
      this.still = a || !this.onGround ? 0 : this.still + t;
    }
    sub(t, e, s, n) {
      ((this.v.y -= Iwt * t), this.inertia());
      for (let d = this.pend.length - 1; d >= 0; d--) {
        let p = this.pend[d],
          m = Math.min(t, p.t) / p.T;
        ((p.t -= t),
          pd.copy(p.r).applyQuaternion(this.q),
          s1.crossVectors(pd, FM.copy(p.j).multiplyScalar(m)),
          this.mulI(v2, s1),
          this.w.add(v2),
          p.t <= 1e-9 && this.pend.splice(d, 1));
      }
      let i = this._k || (this._k = []),
        a = 0;
      this.onGround = !1;
      let r = this.upY(),
        l = r > 0.5;
      (Rh.set(0, 0, 1).applyQuaternion(this.q),
        (Rh.y = 0),
        Rh.lengthSq() < 1e-6 && Rh.set(1, 0, 0),
        Rh.normalize(),
        OM.set(Rh.z, 0, -Rh.x));
      for (let d = 0; d < this.C.length; d++) {
        pd.copy(this.C[d]).applyQuaternion(this.q);
        let p = this.p.x + pd.x,
          m = this.p.y + pd.y,
          g = this.p.z + pd.z,
          b = this.kind[d],
          v = this.lx[d],
          x = this.lz[d];
        ((this.lx[d] = p), (this.lz[d] = g));
        let y = e(p, g, m + 0.6);
        if (!Number.isFinite(y) || m > y + 0.01) continue;
        let M = i[a] || (i[a] = { r: new dt(), n: new dt() });
        if (
          ((M.i = d),
          M.r.copy(pd),
          (M.jn = 0),
          (M.jx = 0),
          (M.jz = 0),
          (M.x = p),
          (M.z = g),
          b && v === v)
        ) {
          let S = p - v,
            w = g - x,
            _ = Math.hypot(S, w);
          if (_ > 1e-4) {
            let z = e(v, x, m + 0.6);
            if (
              y - z > Nwt &&
              m < y - 0.02 &&
              (b === 2 ||
                !l ||
                Math.abs(S * OM.x + w * OM.z) > Math.abs(S * Rh.x + w * Rh.z))
            ) {
              if (
                ((M.k = !0),
                (M.wall = !1),
                M.n.set(-S / _, 0, -w / _),
                (M.kn = this.kOf(pd, M.n)),
                (M.y = m),
                (M.pen = _),
                a++,
                m > z + 0.01)
              )
                continue;
              y = z;
              let A = i[a] || (i[a] = { r: new dt(), n: new dt() });
              ((A.i = d),
                A.r.copy(pd),
                (A.jn = 0),
                (A.jx = 0),
                (A.jz = 0),
                (A.x = p),
                (A.z = g),
                this.ground1(A, b, l, y, m),
                a++);
              continue;
            }
          }
        }
        (this.ground1(M, b, l, y, m), a++);
      }
      this._nk = a;
      for (let d = 0; d < a; d++)
        if (!i[d].k) {
          this.onGround = !0;
          break;
        }
      let c = n?.(this);
      if (c)
        for (let d of c) {
          let p = i[a] || (i[a] = { r: new dt(), n: new dt() });
          (a++,
            (p.i = -1),
            (p.k = !0),
            (p.wall = !0),
            (p.tyre = !1),
            p.r.copy(d.r),
            p.n.copy(d.n),
            (p.jn = 0),
            (p.jt = 0),
            (p.pen = 0),
            (p.e = d.e || 0),
            (p.mu = d.mu || 0),
            this.velAt(Hl, p.r),
            (p.vn0 = Hl.dot(p.n)),
            (p.kn = this.kOf(p.r, p.n)),
            (p.t = p.t || new dt()),
            p.t.copy(Hl).addScaledVector(p.n, -p.vn0),
            (p.t.y = 0));
          let m = p.t.length();
          m > 0.001
            ? (p.t.multiplyScalar(1 / m), (p.kt = this.kOf(p.r, p.t)))
            : (p.kt = 0);
        }
      for (let d = 0; d < 6; d++)
        for (let p = 0; p < a; p++) {
          let m = i[p];
          if ((this.velAt(Hl, m.r), m.k)) {
            let P =
                ((m.wall && m.vn0 < -3 ? -m.e * m.vn0 : 0) - Hl.dot(m.n)) /
                m.kn,
              C = Math.max(0, m.jn + P);
            if (
              ((P = C - m.jn),
              (m.jn = C),
              P && this.push(m.r, FM.copy(m.n).multiplyScalar(P)),
              m.wall && m.kt)
            ) {
              this.velAt(Hl, m.r);
              let I = m.jt - Hl.dot(m.t) / m.kt,
                L = m.mu * m.jn;
              I = Math.max(-L, Math.min(L, I));
              let F = I - m.jt;
              ((m.jt = I), F && this.push(m.r, FM.copy(m.t).multiplyScalar(F)));
            }
            continue;
          }
          let b = ((m.vn0 < -3 ? -0.2 * m.vn0 : 0) - Hl.y) / m.kn,
            v = Math.max(0, m.jn + b);
          ((b = v - m.jn),
            (m.jn = v),
            b && this.push(m.r, FM.set(0, b, 0)),
            this.velAt(Hl, m.r));
          let x = m.tyre ? Rh : Owt.set(1, 0, 0),
            y = m.tyre ? OM : v2.set(0, 0, 1),
            M = m.tyre ? this.roll : this.mu,
            S = m.tyre ? Bwt : this.mu,
            w = m.jx - Hl.dot(x) / (m.tyre ? m.kf : m.kx),
            _ = m.jz - Hl.dot(y) / (m.tyre ? m.ks : m.kz),
            z = M * m.jn,
            A = S * m.jn;
          if ((Math.abs(w) > z && (w = Math.sign(w) * z), m.tyre))
            Math.abs(_) > A && (_ = Math.sign(_) * A);
          else {
            let R = Math.hypot(w, _);
            R > A && ((w *= A / R), (_ *= A / R));
          }
          let T = w - m.jx,
            E = _ - m.jz;
          ((m.jx = w),
            (m.jz = _),
            (T || E) &&
              this.push(
                m.r,
                FM.copy(x).multiplyScalar(T).addScaledVector(y, E),
              ));
        }
      if (s)
        for (let d = 0; d < a; d++) {
          let p = i[d];
          if (p.wall || ((p.k || p.tyre) && !(p.k && p.jn / this.mass > 1.2)))
            continue;
          let m = p.jn / this.mass;
          m > 1.2 &&
            this.cd[p.i] <= 0 &&
            ((this.cd[p.i] = 0.12),
            s(p.x, p.y, p.z, m, p.i, Math.hypot(p.jx, p.jz) / this.mass));
        }
      let h = 0,
        f = 0,
        u = 0;
      for (let d = 0; d < a; d++) {
        let p = i[d];
        if (p.k) {
          if (p.wall) continue;
          let m = p.pen * 0.5;
          (Math.abs(p.n.x * m) > Math.abs(f) && (f = p.n.x * m),
            Math.abs(p.n.z * m) > Math.abs(u) && (u = p.n.z * m));
        } else h = Math.max(h, p.pen);
      }
      (h > 0.01 && (this.p.y += (h - 0.01) * 0.3),
        (this.p.x += f),
        (this.p.z += u),
        this.w.multiplyScalar(Math.exp(-t * (this.onGround ? 0.6 : 0.1))),
        this.p.addScaledVector(this.v, t),
        gv
          .set(this.w.x * t * 0.5, this.w.y * t * 0.5, this.w.z * t * 0.5, 0)
          .multiply(this.q),
        (this.q.x += gv.x),
        (this.q.y += gv.y),
        (this.q.z += gv.z),
        (this.q.w += gv.w),
        this.q.normalize());
      for (let d = 0; d < this.cd.length; d++) this.cd[d] -= t;
    }
    ground1(t, e, s, n, i) {
      ((t.k = !1),
        (t.tyre = e === 1 && s),
        (t.pen = n - i),
        (t.y = n),
        this.velAt(Hl, t.r),
        (t.vn0 = Hl.y),
        (t.kn = this.kOf(t.r, kO.set(0, 1, 0))),
        t.tyre
          ? ((t.kf = this.kOf(t.r, Rh)), (t.ks = this.kOf(t.r, OM)))
          : ((t.kx = this.kOf(t.r, kO.set(1, 0, 0))),
            (t.kz = this.kOf(t.r, kO.set(0, 0, 1)))));
    }
    hitAt(t, e, s = 0.05) {
      (this.v.addScaledVector(e, 1 / this.mass),
        this.pend.push({
          r: t.clone().applyQuaternion(gv.copy(this.q).invert()),
          j: e.clone(),
          t: s,
          T: s,
        }));
    }
    upY() {
      return 1 - 2 * (this.q.x * this.q.x + this.q.z * this.q.z);
    }
  };
