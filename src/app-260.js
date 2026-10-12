// app 260 — math
// Lines 131390-131722 of readable/app.pretty.js (statement-aligned).
var zu = xt,
  xL = class {
    constructor(t) {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.c = []),
        (this.ix = []),
        (this.lod = t),
        (this.M = null),
        (this.wh = []));
    }
    _v(t) {
      return this.M ? new zu(...t).applyMatrix4(this.M).toArray() : t;
    }
    quad(t, e, s, n, o, a = !1, r = null) {
      let l = r || rw(o),
        c = this.p.length / 3,
        h = [t, e, s, n].map((S) => this._v(S)),
        f = h[2][0] - h[0][0],
        u = h[2][1] - h[0][1],
        d = h[2][2] - h[0][2],
        p = h[3][0] - h[1][0],
        m = h[3][1] - h[1][1],
        g = h[3][2] - h[1][2],
        b = u * g - d * m,
        x = d * p - f * g,
        v = f * m - u * p,
        y = Math.hypot(b, x, v) || 1;
      ((b /= y), (x /= y), (v /= y));
      let M = [
        [l[0], l[1]],
        [l[2], l[1]],
        [l[2], l[3]],
        [l[0], l[3]],
      ];
      for (let S = 0; S < 4; S++)
        (this.p.push(...h[S]),
          this.n.push(b, x, v),
          this.uv.push(...M[S]),
          this.c.push(1, 1, 1, a ? 0.25 : 1));
      this.ix.push(c, c + 1, c + 2, c, c + 2, c + 3);
    }
    poly(t, e, s, n, o, a = !1) {
      let r = rw(e),
        l = "xyz".indexOf(s),
        c = "xyz".indexOf(n),
        h = t.map((x) => this._v(x)),
        f = 1e9,
        u = -1e9,
        d = 1e9,
        p = -1e9;
      for (let x of t)
        ((f = Math.min(f, x[l])),
          (u = Math.max(u, x[l])),
          (d = Math.min(d, x[c])),
          (p = Math.max(p, x[c])));
      let m = mo.triangulateShape(
          t.map((x) => new Re(x[l], x[c])),
          [],
        ),
        g = this.M ? new zu(...o).transformDirection(this.M).toArray() : o,
        b = this.p.length / 3;
      for (let x = 0; x < t.length; x++) {
        let v = t[x],
          y = (v[l] - f) / Math.max(1e-6, u - f);
        a && (y = 1 - y);
        let M = (v[c] - d) / Math.max(1e-6, p - d);
        (this.p.push(...h[x]),
          this.n.push(...g),
          this.uv.push(r[0] + (r[2] - r[0]) * y, r[1] + (r[3] - r[1]) * M),
          this.c.push(1, 1, 1, 1));
      }
      for (let [x, v, y] of m) this.ix.push(b + x, b + v, b + y);
    }
    box(t, e, s, n, o, a, r, l = 0) {
      let c =
          typeof r == "string"
            ? { px: r, nx: r, py: r, ny: r, pz: r, nz: r }
            : r,
        h = Math.min(l, (e - t) / 3, (a - o) / 3, (n - s) / 3),
        f = t + h,
        u = e - h,
        d = o + h,
        p = a - h,
        m = n - h;
      if (
        (c.pz &&
          this.quad([f, s, a], [u, s, a], [u, m, a], [f, m, a], c.pz, c.pzLamp),
        c.nz && this.quad([u, s, o], [f, s, o], [f, m, o], [u, m, o], c.nz),
        c.px && this.quad([e, s, p], [e, s, d], [e, m, d], [e, m, p], c.px),
        c.nx && this.quad([t, s, d], [t, s, p], [t, m, p], [t, m, d], c.nx),
        c.py && this.quad([f, n, p], [u, n, p], [u, n, d], [f, n, d], c.py),
        c.ny && this.quad([f, s, d], [u, s, d], [u, s, p], [f, s, p], c.ny),
        h > 0)
      ) {
        let g = c.px || c.pz || "black",
          b = c.py || g;
        (this.quad([u, s, a], [e, s, p], [e, m, p], [u, m, a], g),
          this.quad([e, s, d], [u, s, o], [u, m, o], [e, m, d], g),
          this.quad([f, s, o], [t, s, d], [t, m, d], [f, m, o], g),
          this.quad([t, s, p], [f, s, a], [f, m, a], [t, m, p], g),
          this.quad([f, m, a], [u, m, a], [u, n, p], [f, n, p], b),
          this.quad([u, m, o], [f, m, o], [f, n, d], [u, n, d], b),
          this.quad([e, m, p], [e, m, d], [u, n, d], [u, n, p], b),
          this.quad([t, m, d], [t, m, p], [f, n, p], [f, n, d], b),
          this.quad([u, m, a], [e, m, p], [u, n, p], [u, n, p], b),
          this.quad([e, m, d], [u, m, o], [u, n, d], [u, n, d], b),
          this.quad([f, m, o], [t, m, d], [f, n, d], [f, n, d], b),
          this.quad([t, m, p], [f, m, a], [f, n, p], [f, n, p], b));
      }
    }
    tube(t, e, s, n, o = 6, a = s, r = n) {
      let l = new zu(...t),
        c = new zu(...e),
        h = c.clone().sub(l).normalize(),
        f = Math.abs(h.y) < 0.9 ? new zu(0, 1, 0) : new zu(1, 0, 0),
        u = new zu().crossVectors(h, f).normalize(),
        d = new zu().crossVectors(h, u),
        p = (b, x) =>
          Array.from({ length: o }, (v, y) => {
            let M = (y / o) * Math.PI * 2;
            return b
              .clone()
              .addScaledVector(u, Math.cos(M) * x)
              .addScaledVector(d, Math.sin(M) * x)
              .toArray();
          }),
        m = p(l, s),
        g = p(c, a);
      for (let b = 0; b < o; b++) {
        let x = (b + 1) % o;
        this.quad(m[x], m[b], g[b], g[x], n);
      }
      r &&
        (this.poly(g, r, ...KK(h), h.toArray()),
        this.poly(
          m.slice().reverse(),
          r,
          ...KK(h),
          h.clone().negate().toArray(),
        ));
    }
    blob(t, e, s, n = 8, o = 5) {
      let a = (r, l) => {
        let c = (l / o) * Math.PI,
          h = (r / n) * Math.PI * 2;
        return [
          t[0] + e[0] * Math.sin(c) * Math.sin(h),
          t[1] + e[1] * Math.cos(c),
          t[2] + e[2] * Math.sin(c) * Math.cos(h),
        ];
      };
      for (let r = 0; r < o; r++)
        for (let l = 0; l < n; l++) {
          let c = a(l, r + 1),
            h = a(l + 1, r + 1),
            f = a(l + 1, r),
            u = a(l, r),
            d = [
              (c[0] + f[0]) / 2 - t[0],
              (c[1] + f[1]) / 2 - t[1],
              (c[2] + f[2]) / 2 - t[2],
            ];
          this.quad(c, h, f, u, s(d));
        }
    }
    loftX(t, e, s, n, o) {
      let a = e[0].length;
      for (let r = 0; r + 1 < t.length; r++)
        for (let l = 0; l < a; l++) {
          let c = (l + 1) % a,
            h = n(s[l], r, t.length - 1);
          if (!h) continue;
          let f = e[r][l],
            u = e[r + 1][l],
            d = e[r + 1][c],
            p = e[r][c];
          this.quad(
            [t[r], f[1], f[0]],
            [t[r + 1], u[1], u[0]],
            [t[r + 1], d[1], d[0]],
            [t[r], p[1], p[0]],
            h,
          );
        }
      if (o)
        for (let [r, l] of [
          [0, -1],
          [t.length - 1, 1],
        ])
          this.poly(
            e[r].map(([c, h]) => [t[r], h, c]),
            o,
            "z",
            "y",
            [l, 0, 0],
            !0,
          );
    }
    arch(t, e, s, n, o, a, r, l, c = 7) {
      let h = (f, u) => [f, s + Math.sin(u) * o, n + Math.cos(u) * o];
      for (let f = 0; f < c; f++) {
        let u = a + ((r - a) * f) / c,
          d = a + ((r - a) * (f + 1)) / c;
        (this.quad(h(t, u), h(e, u), h(e, d), h(t, d), l),
          this.quad(h(e, u), h(t, u), h(t, d), h(e, d), "black"));
      }
    }
    wheel(t, e, s, n, o, a = "wheel", r = !1) {
      this.wh.push([this.p.length / 3, s, n]);
      let l = this.lod ? 8 : 16,
        c = rw("tread"),
        h = rw(a),
        f = Math.abs(e) > Math.abs(t) ? e : t,
        u = f === e ? t : e,
        d = Math.sign(f - u) || 1,
        p = f - d * 0.025,
        m = (h[0] + h[2]) / 2,
        g = (h[1] + h[3]) / 2,
        b = (h[2] - h[0]) / 2,
        x = (h[3] - h[1]) / 2;
      for (let v = 0; v < l; v++) {
        let y = (v / l) * Math.PI * 2,
          M = ((v + 1) / l) * Math.PI * 2,
          S = s + Math.cos(y) * o,
          w = n + Math.sin(y) * o,
          z = s + Math.cos(M) * o,
          _ = n + Math.sin(M) * o,
          R = c[0] + ((c[2] - c[0]) * v) / l,
          T = c[0] + ((c[2] - c[0]) * (v + 1)) / l;
        d > 0
          ? this.quad([u, S, w], [u, z, _], [f, z, _], [f, S, w], "tread", !1, [
              R,
              c[1],
              T,
              c[3],
            ])
          : this.quad([f, S, w], [f, z, _], [u, z, _], [u, S, w], "tread", !1, [
              R,
              c[1],
              T,
              c[3],
            ]);
        let E = [m + Math.sin(y) * b * d, g + Math.cos(y) * x],
          A = [m + Math.sin(M) * b * d, g + Math.cos(M) * x];
        if (r) continue;
        let C = !this.lod,
          P = C ? p : f;
        (this.tri3([P, s, n], [P, S, w], [P, z, _], [m, g], E, A, [d, 0, 0]),
          C &&
            (this.tri3([f, S, w], [p, S, w], [p, z, _], E, E, A, [d, 0, 0]),
            this.tri3([f, S, w], [p, z, _], [f, z, _], E, A, A, [d, 0, 0])));
      }
      this.wh[this.wh.length - 1].push(this.p.length / 3);
    }
    tri3(t, e, s, n, o, a, r) {
      let l = this.p.length / 3,
        c = [t, e, s].map((u) => this._v(u)),
        h = [n, o, a],
        f = this.M ? new zu(...r).transformDirection(this.M).toArray() : r;
      for (let u = 0; u < 3; u++)
        (this.p.push(...c[u]),
          this.n.push(...f),
          this.uv.push(...h[u]),
          this.c.push(1, 1, 1, 1));
      this.ix.push(l, l + 1, l + 2);
    }
    axle(t, e, s, n, o = !1, a = "wheel") {
      for (let r of [1, -1]) {
        let l = s + (o ? n * 0.55 : 0);
        (this.wheel(r * (l - n / 2), r * (l + n / 2), e, t, e, a),
          o &&
            this.wheel(
              r * (l - n * 1.6),
              r * (l - n * 0.6),
              e,
              t,
              e,
              "wheel",
              !0,
            ));
      }
      this.lod ||
        this.tube([-(s - 0.1), e, t], [s - 0.1, e, t], 0.09, "chassis", 6);
    }
    flap(t, e, s, n = 0.18, o = 0.8) {
      for (let a of [1, -1])
        this.quad(
          a > 0 ? [s, n, t] : [-e, n, t],
          a > 0 ? [e, n, t] : [-s, n, t],
          a > 0 ? [e, o, t] : [-s, o, t],
          a > 0 ? [s, o, t] : [-e, o, t],
          "black",
        );
    }
    frame(t, e, s, n, o = 0.5) {
      this.box(-o, o, s, n, t, e, "chassis");
    }
    axles() {
      return [
        ...new Map(this.wh.map(([, t, e]) => [e.toFixed(3), [t, e]])).values(),
      ]
        .sort((t, e) => e[1] - t[1])
        .slice(0, 7);
    }
    geometry() {
      let t = new De(),
        e = new Float32Array(this.p),
        s = new Uint32Array(e.buffer),
        n = this.axles();
      for (let o = 0; o < s.length; o += 3) s[o] &= -8;
      for (let [o, , a, r] of this.wh) {
        let l = n.findIndex((c) => Math.abs(c[1] - a) < 0.001) + 1;
        for (let c = o; c < r; c++) s[c * 3] = (s[c * 3] & -8) | l;
      }
      return (
        t.setAttribute("position", new Te(e, 3)),
        t.setAttribute("normal", new ze(this.n, 3)),
        t.setAttribute("uv", new ze(this.uv, 2)),
        t.setAttribute("color", new ze(this.c, 4)),
        t.setIndex(this.ix),
        t.computeBoundingSphere(),
        t
      );
    }
  };
function KK(i) {
  let t = Math.abs(i.x),
    e = Math.abs(i.y),
    s = Math.abs(i.z);
  return t >= e && t >= s ? ["z", "y"] : e >= s ? ["x", "z"] : ["x", "y"];
}
