// app 325 — math
// Lines 155920-156376 of readable/app.pretty.js (statement-aligned).
var lo = 24,
  i1 = (o, t) => (o * 73856093) ^ (t * 19349663),
  Dl = { spinP: 0.6, spinT: 1.2, spinK: 1.5, dwMax: 2, dwSum: 3 },
  cE = class {
    constructor(t) {
      ((this.big = []), (this.grid = new Map()));
      for (let e of t) this.index(e);
      ((this.hits = []),
        (this.dynamic = []),
        (this.onShove = null),
        (this.onProp = null),
        (this.parked = new lE(this)));
    }
    cells(t, e) {
      let s =
        t.t === "box"
          ? [t.x0, t.z0, t.x1, t.z1]
          : t.t === "circ"
            ? [t.x - t.r, t.z - t.r, t.x + t.r, t.z + t.r]
            : t.t === "poly"
              ? t.bb
              : [
                  t.x - Math.max(2.6, t.hx, t.hz),
                  t.z - Math.max(2.6, t.hx, t.hz),
                  t.x + Math.max(2.6, t.hx, t.hz),
                  t.z + Math.max(2.6, t.hx, t.hz),
                ];
      if (s[2] - s[0] > 2e3 || s[3] - s[1] > 2e3) return e(null);
      for (let n = Math.floor(s[0] / lo); n <= Math.floor(s[2] / lo); n++)
        for (let i = Math.floor(s[1] / lo); i <= Math.floor(s[3] / lo); i++)
          e((n * 73856093) ^ (i * 19349663));
    }
    index(t) {
      this.cells(t, (e) => {
        if (e === null) {
          this.big.push(t);
          return;
        }
        let s = this.grid.get(e);
        (s || this.grid.set(e, (s = [])), s.push(t));
      });
    }
    unindex(t) {
      this.cells(t, (e) => {
        let s = e === null ? this.big : this.grid.get(e),
          n = s ? s.indexOf(t) : -1;
        n >= 0 && s.splice(n, 1);
      });
    }
    setParked(t) {
      if (((t = !!t), !t == !!this.parkedOff)) return 0;
      if (!t) {
        for (let n of [...this.parked.awake]) this.parked.sleep(n);
        let s = new Set();
        for (let n of this.grid.values()) for (let i of n) i.parked && s.add(i);
        for (let n of this.big) n.parked && s.add(n);
        this.parkedOff = [...s];
        for (let n of this.parkedOff) this.unindex(n);
        return this.parkedOff.length;
      }
      let e = this.parkedOff;
      this.parkedOff = null;
      for (let s of e) this.index(s);
      return e.length;
    }
    test(t, e, s, n, i, a, r) {
      return t.t === "poly"
        ? uMt(e, s, n, i, a, r, t)
        : t.t === "circ"
          ? dMt(e, s, n, i, a, r, t)
          : t.t === "box"
            ? fet(
                e,
                s,
                n,
                i,
                a,
                r,
                (t.x0 + t.x1) / 2,
                (t.z0 + t.z1) / 2,
                { x: 1, z: 0 },
                { x: 0, z: 1 },
                (t.x1 - t.x0) / 2,
                (t.z1 - t.z0) / 2,
              )
            : fet(
                e,
                s,
                n,
                i,
                a,
                r,
                t.x,
                t.z,
                { x: t.c, z: -t.s },
                { x: t.s, z: t.c },
                t.hx,
                t.hz,
                !!(t.parked || t.traffic),
              );
    }
    trafficView(t) {
      let e = t.line
          ? 1 / 0
          : t.remote
            ? t.m
            : t.phys
              ? t.phys.S.mass
              : vc(t.kind),
        s = t.V?.L ?? 4.7,
        n = t.V?.bw ?? 1.9,
        i = this._tv || (this._tv = {});
      return (
        (i.m = e),
        (i.I = t.phys ? t.phys.S.izz : (e * (s * s + n * n)) / 12),
        (i.x = t.x),
        (i.z = t.z),
        t.phys
          ? ((i.vx = t.phys.vel.x), (i.vz = t.phys.vel.z), (i.w = t.phys.r))
          : t.remote
            ? ((i.vx = t.vx || 0), (i.vz = t.vz || 0), (i.w = t.w || 0))
            : t.wreck
              ? ((i.vx = t.wreck.vx), (i.vz = t.wreck.vz), (i.w = t.wreck.r))
              : ((i.vx = -Math.sin(t.heading) * t.v),
                (i.vz = -Math.cos(t.heading) * t.v),
                (i.w = 0)),
        i
      );
    }
    near(t, e, s) {
      let n = new Set(this.big);
      for (let i = Math.floor((t - s) / lo); i <= Math.floor((t + s) / lo); i++)
        for (
          let a = Math.floor((e - s) / lo);
          a <= Math.floor((e + s) / lo);
          a++
        ) {
          let r = this.grid.get((i * 73856093) ^ (a * 19349663));
          if (r) for (let l of r) n.add(l);
        }
      return n;
    }
    roofAt(t, e, s = 0) {
      let n = -1e4,
        i = this.grid.get(
          (Math.floor(t / lo) * 73856093) ^ (Math.floor(e / lo) * 19349663),
        ),
        a = !1;
      if (i)
        for (let v of i)
          v.roof &&
            ((a = !0),
            v.y1 > n &&
              t >= v.bb[0] &&
              t <= v.bb[2] &&
              e >= v.bb[1] &&
              e <= v.bb[3] &&
              fMt(v.pts, t, e) &&
              (n = Math.max(n, det(v, t, e))));
      if (n > -1e4 || a) return n;
      let r = this.heights?.();
      if (!r) return -1e4;
      let { w: l, h: c, H: h, cell: f, x0: u, z0: d } = r,
        p = Math.ceil(s / f),
        m = -1e4,
        g = Math.round((t - u) / f),
        b = Math.round((e - d) / f);
      for (let v = b - p; v <= b + p; v++)
        for (let x = g - p; x <= g + p; x++)
          if (x >= 0 && v >= 0 && x < l && v < c) {
            let y = h[v * l + x];
            y > m && (m = y);
          }
      return m;
    }
    muAt(t, e) {
      let s = m0(t, e);
      return s === "road"
        ? 1
        : s === "walk"
          ? 0.95
          : s === "median"
            ? 0.7
            : s === "lot"
              ? 0.75
              : 0.6;
    }
    brakeNeed(t, e, s) {
      let n = t.S?.box,
        i = n?.hx ?? 0.97,
        a = n?.hz ?? 2.27,
        r = n?.off ?? 0.15,
        l = { x: -Math.sin(t.psi), z: -Math.cos(t.psi) },
        c = { x: -l.z, z: l.x },
        h = s / 2,
        f = t.pos.x + l.x * (r + h),
        u = t.pos.z + l.z * (r + h),
        d = h + a + 3,
        p = this.near(f, u, d);
      for (let b of this.dynamic)
        Math.abs(b.x - f) < d + 4 && Math.abs(b.z - u) < d + 4 && p.add(b);
      for (let b of this.parked.awake)
        Math.abs(b.x - f) < d + 4 && Math.abs(b.z - u) < d + 4 && p.add(b);
      let m = !!Ni(t.pos.x, t.pos.z, 1.5),
        g = [];
      for (let b of p)
        b.dead ||
          b.prop ||
          (b.wall && m) ||
          (b.y1 !== void 0 && (t.pos.y > b.y1 + 0.3 || t.pos.y + 1.4 < b.y0)) ||
          (this.test(b, f, u, c, l, i, h + a) && g.push(b));
      if (!g.length) return 0;
      for (let b = 0.5; b <= s; b += 0.75) {
        let v = t.pos.x + l.x * (r + b),
          x = t.pos.z + l.z * (r + b);
        for (let y of g) {
          if (!this.test(y, v, x, c, l, i, a)) continue;
          let M = y.traffic,
            S =
              M && !M.wreck
                ? Math.max(
                    0,
                    M.v *
                      (-Math.sin(M.heading) * l.x - Math.cos(M.heading) * l.z),
                  )
                : 0,
            w = e - S;
          if (w > 0.5) return (w * w) / (2 * Math.max(0.3, b - 0.5));
        }
      }
      return 0;
    }
    collide(t, e = 1 / 120) {
      ((this._car = t), this.parked.awake.length && this.parked.step(e));
      let s = t.S?.box,
        n = s?.hx ?? 0.97,
        i = s?.hz ?? 2.27,
        a = s?.off ?? 0.15,
        r = { x: -Math.sin(t.psi), z: -Math.cos(t.psi) },
        l = { x: -r.z, z: r.x },
        c = t.pos.x + r.x * a,
        h = t.pos.z + r.z * a,
        f = 0,
        u = (t.fly && t.alt) || 0,
        d = (m) =>
          u > 1.4 && m.y1 === void 0 && (m.traffic || m.parked || m.mv),
        p = t.S?.roofs ? -0.6 : 0.3;
      for (let m = 0; m < 3; m++) {
        let g = null,
          b = this.near(c, h, Math.max(3.5, i + 1.2));
        for (let x of this.dynamic) {
          let y = 6 + Math.max(x.hx || 0, x.hz || 0, x.r || 0);
          Math.abs(x.x - c) < y && Math.abs(x.z - h) < y && b.add(x);
        }
        for (let x of this.parked.awake)
          Math.abs(x.x - c) < 8 && Math.abs(x.z - h) < 8 && b.add(x);
        for (let x of b)
          if (x.mv) {
            let y = Math.max(0, Math.min(0.12, (t.simT || 0) - x.st0));
            ((x.x = x.x0 + x.vx * y),
              (x.z = x.z0 + x.vz * y),
              (x.traffic.x = x.x),
              (x.traffic.z = x.z));
          }
        let v = !!Ni(t.pos.x, t.pos.z, 1.5);
        for (let x of b) {
          if (
            x.dead ||
            (x.wall && v) ||
            d(x) ||
            (x.y1 !== void 0 &&
              (t.pos.y >
                (x.rh && t.S?.roofs ? det(x, t.pos.x, t.pos.z) : x.y1) + p ||
                t.pos.y + 1.4 < x.y0))
          )
            continue;
          let y = this.test(
            x,
            t.pos.x + r.x * a,
            t.pos.z + r.z * a,
            l,
            r,
            n,
            i,
          );
          if (
            (y &&
              x.raceWall &&
              x.nx !== void 0 &&
              (y = hMt(y, x, t.pos.x + r.x * a, t.pos.z + r.z * a, l, r, n, i)),
            y && x.prop && this.onProp?.(x, t, y))
          ) {
            f = Math.max(f, 0.08);
            continue;
          }
          y && (!g || y.d > g.d) && ((g = y), (y.c = x));
        }
        if (!g || (g.c.roof && t.wallHit?.(g, this))) break;
        f = Math.max(
          f,
          g.c.parked || g.c.traffic
            ? this.respondCar(t, g)
            : this.respond(t, g),
        );
      }
      return f;
    }
    pushLog(t, e, s, n) {
      let i = t._push || (t._push = { x: 0, z: 0, n: 0, c: null });
      ((i.x += e.x * s), (i.z += e.z * s), i.n++, (i.c = n));
    }
    respond(t, e) {
      let s = e.n,
        n = t.S.mass,
        i = t.S.izz;
      ((t.pos.x += s.x * (e.d + 0.002)),
        (t.pos.z += s.z * (e.d + 0.002)),
        this.pushLog(t, s, e.d, e.c));
      let a = e.px - t.pos.x,
        r = e.pz - t.pos.z,
        l = t.r,
        c = { vx: t.vel.x, vz: t.vel.z, r: t.r },
        h = t.vel.x + l * r,
        f = t.vel.z - l * a,
        u = h * s.x + f * s.z;
      if (u >= 0) return 0;
      let d = r * s.x - a * s.z,
        p = !!e.c?.raceWall,
        g =
          (-(1 + (p || u > -1.5 ? 0 : Math.min(0.35, 0.1 + -u * 0.012))) * u) /
          (1 / n + (d * d) / i);
      if (
        ((t.vel.x += (g * s.x) / n),
        (t.vel.z += (g * s.z) / n),
        (t.r += ((g * d) / i) * (p ? 0.15 : 0.3)),
        p)
      ) {
        let w = t.vel.x * s.x + t.vel.z * s.z;
        w > 0.3 && ((t.vel.x -= s.x * (w - 0.3)), (t.vel.z -= s.z * (w - 0.3)));
      }
      let b = -s.z,
        v = s.x,
        x = (t.vel.x + l * r) * b + (t.vel.z - l * a) * v,
        y = p ? 0.08 : 0.18,
        M = Math.max(-y * g, Math.min(y * g, -x * n * 0.5));
      ((t.vel.x += (M * b) / n), (t.vel.z += (M * v) / n));
      let S = Math.min(1, -u / 14);
      return (
        S > 0.05 && ((t.impact = Math.max(t.impact, S)), (t.drift *= 0.5)),
        -u > 6 && (t.impactT = Math.max(t.impactT || 0, 0.25)),
        S > 0.05 && (t.impactN = { x: s.x, z: s.z, s: S }),
        this.hit(e, S, !1, !1, -u, Math.abs(x), c, t),
        S
      );
    }
    tangent(t, e, s, n) {
      let i = n.px - t.x,
        a = n.pz - t.z,
        r = t.vx + t.w * a - (e ? e.vx + e.w * (n.pz - e.z) : 0),
        l = t.vz - t.w * i - (e ? e.vz - e.w * (n.px - e.x) : 0);
      return Math.abs(r * -s.z + l * s.x);
    }
    hit(t, e, s, n = !1, i = e * 14, a = 0, r = null, l = null) {
      let c = this._car,
        h = c ? Math.cos(c.psi) : 1,
        f = c ? Math.sin(c.psi) : 0,
        u = c ? t.px - c.pos.x : 0,
        d = c ? t.pz - c.pos.z : 0;
      (this.hits.push({
        x: t.px,
        z: t.pz,
        s: e,
        t: performance.now(),
        car: s,
        parked: n,
        v: i,
        vt: a,
        nx: t.n.x,
        nz: t.n.z,
        C: t.c,
        lx: u * h - d * f,
        lz: u * f + d * h,
        lnx: t.n.x * h - t.n.z * f,
        lnz: t.n.x * f + t.n.z * h,
        pre: r,
        J:
          r && l
            ? { x: (l.vel.x - r.vx) * l.S.mass, z: (l.vel.z - r.vz) * l.S.mass }
            : null,
      }),
        this.hits.length > 16 && this.hits.shift());
    }
    respondCar(t, e) {
      let s = e.c,
        n = e.n,
        i = this.parked,
        a = s.traffic,
        r = a ? this.trafficView(a) : i.view((s.b || i.wake(s), s)),
        l = a ? (!!a.wreck || !!a.phys) && !a.bot && r.m < 1 / 0 : !0,
        c = l ? 1 / t.S.mass / (1 / t.S.mass + 1 / r.m) : 1;
      if (
        ((t.pos.x += n.x * (e.d * c + 0.002)),
        (t.pos.z += n.z * (e.d * c + 0.002)),
        this.pushLog(t, n, e.d * c, s),
        c < 1)
      ) {
        let S = e.d * (1 - c);
        ((s.x -= n.x * S),
          (s.z -= n.z * S),
          a &&
            ((a.x -= n.x * S),
            (a.z -= n.z * S),
            a.phys && ((a.phys.pos.x -= n.x * S), (a.phys.pos.z -= n.z * S))),
          (r.x = s.x),
          (r.z = s.z));
      }
      let h = this._pv || (this._pv = {});
      ((h.m = t.S.mass),
        (h.I = t.S.izz),
        (h.vx = t.vel.x),
        (h.vz = t.vel.z),
        (h.w = h.w0 = t.r),
        (h.x = t.pos.x),
        (h.z = t.pos.z));
      let f = e.px - h.x,
        u = e.pz - h.z,
        d =
          (h.vx + h.w * u - r.vx - r.w * (e.pz - r.z)) * n.x +
          (h.vz - h.w * f - r.vz + r.w * (e.px - r.x)) * n.z;
      if ((a || i.moved.add(s), d >= 0)) return 0;
      let p =
          d > -1.5 ? 0 : 0.2 - 0.1 * Math.min(1, Math.max(0, (-d - 8) / 20)),
        m = h.vx,
        g = h.vz,
        b = { vx: m, vz: g, r: h.w0 },
        v = Nr(h, r, n, e.px, e.pz, p, 0.15, Dl.spinP, a ? Dl.spinT : Dl.spinK);
      t.impactT > 0 || (t._dw = 0);
      let x = Math.max(-Dl.dwMax, Math.min(Dl.dwMax, h.w - h.w0)),
        y = Math.max(-Dl.dwSum, Math.min(Dl.dwSum, (t._dw || 0) + x));
      ((t.vel.x = h.vx),
        (t.vel.z = h.vz),
        (t.r = h.w0 + y - (t._dw || 0)),
        (t._dw = y),
        a
          ? this.onShove && this.onShove(a, v * n.x, v * n.z, e.px, e.pz)
          : i.kick(s, -v * n.x, -v * n.z));
      let M = Math.min(1, -d / 14);
      return (
        M > 0.05 && ((t.impact = Math.max(t.impact, M)), (t.drift *= 0.5)),
        -d > 2 &&
          (t.impactT = Math.max(t.impactT || 0, 0.4 * Math.min(1, -d / 8))),
        M > 0.05 && (t.impactN = { x: n.x, z: n.z, s: M }),
        this.hit(e, M, !0, !a, -d, this.tangent(h, r, n, e), b, t),
        M
      );
    }
  };
