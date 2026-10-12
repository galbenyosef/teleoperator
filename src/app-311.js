// app 311 — math
// Lines 150406-150790 of readable/app.pretty.js (statement-aligned).
var fo = 24,
  yp = (i, t) => (i * 73856093) ^ (t * 19349663),
  Cm = { spinP: 0.6, spinT: 1.2, spinK: 1.5, dwMax: 2, dwSum: 3 },
  V_ = class {
    constructor(t) {
      ((this.big = []), (this.grid = new Map()));
      for (let e of t) this.index(e);
      ((this.hits = []),
        (this.dynamic = []),
        (this.onShove = null),
        (this.onProp = null),
        (this.parked = new j_(this)));
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
      for (let n = Math.floor(s[0] / fo); n <= Math.floor(s[2] / fo); n++)
        for (let o = Math.floor(s[1] / fo); o <= Math.floor(s[3] / fo); o++)
          e((n * 73856093) ^ (o * 19349663));
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
        for (let n of this.grid.values()) for (let o of n) o.parked && s.add(o);
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
    test(t, e, s, n, o, a, r) {
      return t.t === "poly"
        ? Wvt(e, s, n, o, a, r, t)
        : t.t === "circ"
          ? qvt(e, s, n, o, a, r, t)
          : t.t === "box"
            ? wZ(
                e,
                s,
                n,
                o,
                a,
                r,
                (t.x0 + t.x1) / 2,
                (t.z0 + t.z1) / 2,
                { x: 1, z: 0 },
                { x: 0, z: 1 },
                (t.x1 - t.x0) / 2,
                (t.z1 - t.z0) / 2,
              )
            : wZ(
                e,
                s,
                n,
                o,
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
      let e = t.line ? 1 / 0 : t.remote ? t.m : zm(t.kind),
        s = t.V?.L ?? 4.7,
        n = t.V?.bw ?? 1.9,
        o = this._tv || (this._tv = {});
      return (
        (o.m = e),
        (o.I = (e * (s * s + n * n)) / 12),
        (o.x = t.x),
        (o.z = t.z),
        t.remote
          ? ((o.vx = t.vx || 0), (o.vz = t.vz || 0), (o.w = t.w || 0))
          : t.wreck
            ? ((o.vx = t.wreck.vx), (o.vz = t.wreck.vz), (o.w = t.wreck.r))
            : ((o.vx = -Math.sin(t.heading) * t.v),
              (o.vz = -Math.cos(t.heading) * t.v),
              (o.w = 0)),
        o
      );
    }
    near(t, e, s) {
      let n = new Set(this.big);
      for (let o = Math.floor((t - s) / fo); o <= Math.floor((t + s) / fo); o++)
        for (
          let a = Math.floor((e - s) / fo);
          a <= Math.floor((e + s) / fo);
          a++
        ) {
          let r = this.grid.get((o * 73856093) ^ (a * 19349663));
          if (r) for (let l of r) n.add(l);
        }
      return n;
    }
    muAt(t, e) {
      let s = Qr(t, e);
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
        o = n?.hx ?? 0.97,
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
      let m = !!Hi(t.pos.x, t.pos.z, 1.5),
        g = [];
      for (let b of p)
        b.dead ||
          b.prop ||
          (b.wall && m) ||
          (b.y1 !== void 0 && (t.pos.y > b.y1 + 0.3 || t.pos.y + 1.4 < b.y0)) ||
          (this.test(b, f, u, c, l, o, h + a) && g.push(b));
      if (!g.length) return 0;
      for (let b = 0.5; b <= s; b += 0.75) {
        let x = t.pos.x + l.x * (r + b),
          v = t.pos.z + l.z * (r + b);
        for (let y of g) {
          if (!this.test(y, x, v, c, l, o, a)) continue;
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
      this.parked.awake.length && this.parked.step(e);
      let s = t.S?.box,
        n = s?.hx ?? 0.97,
        o = s?.hz ?? 2.27,
        a = s?.off ?? 0.15,
        r = { x: -Math.sin(t.psi), z: -Math.cos(t.psi) },
        l = { x: -r.z, z: r.x },
        c = t.pos.x + r.x * a,
        h = t.pos.z + r.z * a,
        f = 0;
      for (let u = 0; u < 3; u++) {
        let d = null,
          p = this.near(c, h, Math.max(3.5, o + 1.2));
        for (let g of this.dynamic)
          Math.abs(g.x - c) < 8 && Math.abs(g.z - h) < 8 && p.add(g);
        for (let g of this.parked.awake)
          Math.abs(g.x - c) < 8 && Math.abs(g.z - h) < 8 && p.add(g);
        for (let g of p)
          if (g.mv) {
            let b = Math.max(0, Math.min(0.12, (t.simT || 0) - g.st0));
            ((g.x = g.x0 + g.vx * b),
              (g.z = g.z0 + g.vz * b),
              (g.traffic.x = g.x),
              (g.traffic.z = g.z));
          }
        let m = !!Hi(t.pos.x, t.pos.z, 1.5);
        for (let g of p) {
          if (
            g.dead ||
            (g.wall && m) ||
            (g.y1 !== void 0 && (t.pos.y > g.y1 + 0.3 || t.pos.y + 1.4 < g.y0))
          )
            continue;
          let b = this.test(
            g,
            t.pos.x + r.x * a,
            t.pos.z + r.z * a,
            l,
            r,
            n,
            o,
          );
          if (
            (b &&
              g.raceWall &&
              g.nx !== void 0 &&
              (b = Gvt(b, g, t.pos.x + r.x * a, t.pos.z + r.z * a, l, r, n, o)),
            b && g.prop && this.onProp?.(g, t, b))
          ) {
            f = Math.max(f, 0.08);
            continue;
          }
          b && (!d || b.d > d.d) && ((d = b), (b.c = g));
        }
        if (!d) break;
        f = Math.max(
          f,
          d.c.parked || d.c.traffic
            ? this.respondCar(t, d)
            : this.respond(t, d),
        );
      }
      return f;
    }
    pushLog(t, e, s, n) {
      let o = t._push || (t._push = { x: 0, z: 0, n: 0, c: null });
      ((o.x += e.x * s), (o.z += e.z * s), o.n++, (o.c = n));
    }
    respond(t, e) {
      let s = e.n,
        n = t.S.mass,
        o = t.S.izz;
      ((t.pos.x += s.x * (e.d + 0.002)),
        (t.pos.z += s.z * (e.d + 0.002)),
        this.pushLog(t, s, e.d, e.c));
      let a = e.px - t.pos.x,
        r = e.pz - t.pos.z,
        l = t.r,
        c = t.vel.x + l * r,
        h = t.vel.z - l * a,
        f = c * s.x + h * s.z;
      if (f >= 0) return 0;
      let u = r * s.x - a * s.z,
        d = !!e.c?.raceWall,
        m =
          (-(1 + (d || f > -1.5 ? 0 : Math.min(0.35, 0.1 + -f * 0.012))) * f) /
          (1 / n + (u * u) / o);
      if (
        ((t.vel.x += (m * s.x) / n),
        (t.vel.z += (m * s.z) / n),
        (t.r += ((m * u) / o) * (d ? 0.15 : 0.3)),
        d)
      ) {
        let S = t.vel.x * s.x + t.vel.z * s.z;
        S > 0.3 && ((t.vel.x -= s.x * (S - 0.3)), (t.vel.z -= s.z * (S - 0.3)));
      }
      let g = -s.z,
        b = s.x,
        x = (t.vel.x + l * r) * g + (t.vel.z - l * a) * b,
        v = d ? 0.08 : 0.18,
        y = Math.max(-v * m, Math.min(v * m, -x * n * 0.5));
      ((t.vel.x += (y * g) / n), (t.vel.z += (y * b) / n));
      let M = Math.min(1, -f / 14);
      return (
        M > 0.05 && ((t.impact = Math.max(t.impact, M)), (t.drift *= 0.5)),
        -f > 6 && (t.impactT = Math.max(t.impactT || 0, 0.25)),
        M > 0.05 && (t.impactN = { x: s.x, z: s.z, s: M }),
        this.hit(e, M, !1, !1, -f, Math.abs(x)),
        M
      );
    }
    tangent(t, e, s, n) {
      let o = n.px - t.x,
        a = n.pz - t.z,
        r = t.vx + t.w * a - (e ? e.vx + e.w * (n.pz - e.z) : 0),
        l = t.vz - t.w * o - (e ? e.vz - e.w * (n.px - e.x) : 0);
      return Math.abs(r * -s.z + l * s.x);
    }
    hit(t, e, s, n = !1, o = e * 14, a = 0) {
      (this.hits.push({
        x: t.px,
        z: t.pz,
        s: e,
        t: performance.now(),
        car: s,
        parked: n,
        v: o,
        vt: a,
        nx: t.n.x,
        nz: t.n.z,
        C: t.c,
      }),
        this.hits.length > 16 && this.hits.shift());
    }
    respondCar(t, e) {
      let s = e.c,
        n = e.n,
        o = this.parked,
        a = s.traffic,
        r = a ? this.trafficView(a) : o.view((s.b || o.wake(s), s)),
        l = a ? !!a.wreck && !a.bot && r.m < 1 / 0 : !0,
        c = l ? 1 / t.S.mass / (1 / t.S.mass + 1 / r.m) : 1;
      if (
        ((t.pos.x += n.x * (e.d * c + 0.002)),
        (t.pos.z += n.z * (e.d * c + 0.002)),
        this.pushLog(t, n, e.d * c, s),
        c < 1)
      ) {
        let v = e.d * (1 - c);
        ((s.x -= n.x * v),
          (s.z -= n.z * v),
          a && ((a.x -= n.x * v), (a.z -= n.z * v)),
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
      if ((a || o.moved.add(s), d >= 0)) return 0;
      let p =
          d > -1.5 ? 0 : 0.2 - 0.1 * Math.min(1, Math.max(0, (-d - 8) / 20)),
        m = Iu(h, r, n, e.px, e.pz, p, 0.15, Cm.spinP, a ? Cm.spinT : Cm.spinK);
      t.impactT > 0 || (t._dw = 0);
      let g = Math.max(-Cm.dwMax, Math.min(Cm.dwMax, h.w - h.w0)),
        b = Math.max(-Cm.dwSum, Math.min(Cm.dwSum, (t._dw || 0) + g));
      ((t.vel.x = h.vx),
        (t.vel.z = h.vz),
        (t.r = h.w0 + b - (t._dw || 0)),
        (t._dw = b),
        a
          ? this.onShove && this.onShove(a, m * n.x, m * n.z, e.px, e.pz)
          : o.kick(s, -m * n.x, -m * n.z));
      let x = Math.min(1, -d / 14);
      return (
        x > 0.05 && ((t.impact = Math.max(t.impact, x)), (t.drift *= 0.5)),
        -d > 2 &&
          (t.impactT = Math.max(t.impactT || 0, 0.4 * Math.min(1, -d / 8))),
        x > 0.05 && (t.impactN = { x: n.x, z: n.z, s: x }),
        this.hit(e, x, !0, !a, -d, this.tangent(h, r, n, e)),
        x
      );
    }
  };
