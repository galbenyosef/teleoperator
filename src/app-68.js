// app 68 — math
// Lines 67547-67790 of readable/app.pretty.js (statement-aligned).
var IG = 1.43,
  xht = { short: 0, long: 1, coat: 2 },
  IR = class {
    constructor(t = 0, e = 0, s = 0) {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.ix = []),
        (this.kTop = t),
        (this.kBot = e),
        (this.fem = s));
    }
    get v() {
      return this.p.length / 3;
    }
    vert(t, e, s, n, o, a, r, l) {
      this.p.push(t, e, s);
      let c = Math.hypot(n, o, a) || 1;
      this.n.push(n / c, o / c, a / c);
      let h = Math.round(t / 8),
        f =
          l === Xn.top || l === Xn.trim || l === Xn.shirt
            ? this.kTop
            : l === Xn.bottom || l === Xn.legs
              ? this.kBot
              : l === Xn.face || l === Xn.skin
                ? this.fem
                : 0;
      return (
        this.uv.push(
          l + 16 * h + 128 * f + Math.min(0.998, Math.max(0, r)),
          e / 2,
        ),
        this.v - 1
      );
    }
    loft(t, e, s, n, { capBottom: o = !0, capTop: a = !0, faceW: r = 0 } = {}) {
      let l = s * 8,
        c = t.length,
        h = typeof n == "function" ? n : () => n,
        f = new Map(),
        u = (p, m, g, b = 0) => {
          let x = ((p * (e + 1) + m) * 32 + g) * 2 + b,
            v = f.get(x);
          if (v !== void 0) return v;
          let [y, M, S, w, z] = t[p],
            _ = t[Math.max(0, p - 1)],
            R = t[Math.min(c - 1, p + 1)],
            T = (R[3] - _[3]) / (R[0] - _[0] || 1),
            E = (R[4] - _[4]) / (R[0] - _[0] || 1),
            A = (m / e) * Math.PI * 2,
            C = Math.cos(A),
            P = Math.sin(A),
            I = M + w * P,
            L = S + z * C,
            F = P / Math.max(w, 0.001),
            N = C / Math.max(z, 0.001),
            B = Math.hypot(F, N),
            H = -(T * Math.abs(P) + E * Math.abs(C)),
            O = (m / e + 0.5) % 1;
          return (
            b && (O = 0.998),
            g === Xn.face && r && (O = 0.5 + (I - M) / r),
            (v = this.vert(I + l, y, L, F / B, H, N / B, O, g)),
            f.set(x, v),
            v
          );
        };
      for (let p = 0; p + 1 < c; p++)
        for (let m = 0; m < e; m++) {
          let g = (t[p][0] + t[p + 1][0]) / 2,
            b = ((m + 0.5) / e) * Math.PI * 2,
            x = t[p],
            v = h(g, b, x[3] * Math.sin(b), x[4] * Math.cos(b)),
            y = m + 1 === e / 2 ? 1 : 0,
            M = u(p, m, v),
            S = u(p, m + 1, v, y),
            w = u(p + 1, m, v),
            z = u(p + 1, m + 1, v, y);
          this.ix.push(M, S, w, S, z, w);
        }
      let d = (p, m) => {
        let [g, b, x] = t[p],
          v = h(g, 0, 0, 0),
          y = this.vert(b + l, g, x, 0, m ? 1 : -1, 0, 0.5, v);
        for (let M = 0; M < e; M++) {
          let S = u(p, M, v),
            w = u(p, M + 1, v);
          m ? this.ix.push(S, w, y) : this.ix.push(w, S, y);
        }
      };
      (o && d(0, !1), a && d(c - 1, !0));
    }
    ellipsoid(
      t,
      e,
      s,
      n,
      o,
      a,
      r,
      l,
      c,
      h,
      { lat0: f = 0, lat1: u = Math.PI, latAt: d = null, jit: p = 0 } = {},
    ) {
      let m = c * 8,
        g = typeof h == "function" ? h : () => h,
        b = new Map(),
        x = (y, M) => {
          let S = (M / r) * Math.PI * 2,
            w = d ? d(S) : u,
            z = f + (w - f) * (y / l),
            _ = Math.sin(z) * Math.sin(S),
            R = Math.cos(z),
            T = Math.sin(z) * Math.cos(S),
            E = p
              ? 1 +
                p *
                  (0.5 +
                    0.5 * Math.sin(S * 7 + 1.3) * Math.sin(S * 3.1 + y * 0.9)) *
                  Math.min(1, z * 2)
              : 1;
          return [
            t + n * _ * E,
            e + o * R * E,
            s + a * T * E,
            _ / n,
            R / o,
            T / a,
          ];
        },
        v = (y, M, S, w = 0) => {
          let z = ((y * (r + 1) + M) * 32 + S) * 2 + w,
            _ = b.get(z);
          if (_ !== void 0) return _;
          let [R, T, E, A, C, P] = x(y, M);
          return (
            (_ = this.vert(
              R + m,
              T,
              E,
              A,
              C,
              P,
              w ? 0.998 : (M / r + 0.5) % 1,
              S,
            )),
            b.set(z, _),
            _
          );
        };
      for (let y = 0; y < l; y++)
        for (let M = 0; M < r; M++) {
          let S = x(y, M),
            w = x(y + 1, M + 1),
            z = g(
              (S[0] + w[0]) / 2 - t,
              (S[1] + w[1]) / 2 - e,
              (S[2] + w[2]) / 2 - s,
            ),
            _ = M + 1 === r / 2 ? 1 : 0,
            R = v(y, M, z),
            T = v(y, M + 1, z, _),
            E = v(y + 1, M, z),
            A = v(y + 1, M + 1, z, _);
          this.ix.push(R, E, T, T, E, A);
        }
    }
    box(t, e, s, n, o, a, r, l) {
      let c = r * 8,
        h = [
          [-1, -1, -1],
          [1, -1, -1],
          [1, 1, -1],
          [-1, 1, -1],
          [-1, -1, 1],
          [1, -1, 1],
          [1, 1, 1],
          [-1, 1, 1],
        ],
        f = [
          [0, 3, 2, 1, [0, 0, -1]],
          [4, 5, 6, 7, [0, 0, 1]],
          [0, 4, 7, 3, [-1, 0, 0]],
          [1, 2, 6, 5, [1, 0, 0]],
          [3, 7, 6, 2, [0, 1, 0]],
          [0, 1, 5, 4, [0, -1, 0]],
        ];
      for (let [u, d, p, m, g] of f) {
        let b = [u, d, p, m].map((x) => {
          let [v, y, M] = h[x];
          return this.vert(
            t + c + v * n,
            e + y * o,
            s + M * a,
            g[0] + v * 0.35,
            g[1] + y * 0.35,
            g[2] + M * 0.35,
            0.5 + 0.25 * v,
            l,
          );
        });
        this.ix.push(b[0], b[1], b[2], b[0], b[2], b[3]);
      }
    }
    geometry() {
      let t = new De();
      return (
        t.setAttribute("position", new ze(this.p, 3)),
        t.setAttribute("normal", new ze(this.n, 3)),
        t.setAttribute("uv", new ze(this.uv, 2)),
        t.setIndex(
          this.p.length / 3 > 65535 ? new w0(this.ix, 1) : new Cr(this.ix, 1),
        ),
        (t.boundingSphere = new _n(new xt(0, 0.9, 0), 1.2)),
        t
      );
    }
  },
  Br = [
    {
      f: 0,
      w: 1,
      top: "long",
      bottom: "pants",
      jeans: 1,
      hair: "short",
      bag: null,
    },
    { f: 1, w: 0.95, top: "coat", bottom: "skirt", hair: "long", bag: "hand" },
    { f: 0, w: 1.08, top: "short", bottom: "shorts", hair: "cap", bag: "back" },
    { f: 1, w: 0.92, top: "short", bottom: "pants", hair: "bun", bag: null },
    { f: 0, w: 0.98, top: "coat", bottom: "pants", hair: "short", bag: "hand" },
    {
      f: 1,
      w: 1,
      top: "long",
      bottom: "pants",
      jeans: 1,
      hair: "long",
      bag: "back",
    },
  ];
