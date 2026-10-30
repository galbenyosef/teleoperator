// app 67 — math
// Lines 67778-68021 of readable/app.pretty.js (statement-aligned).
var OW = 1.43,
  Hdt = { short: 0, long: 1, coat: 2 },
  hP = class {
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
    vert(t, e, s, n, i, a, r, l) {
      this.p.push(t, e, s);
      let c = Math.hypot(n, i, a) || 1;
      this.n.push(n / c, i / c, a / c);
      let h = Math.round(t / 8),
        f =
          l === ti.top || l === ti.trim || l === ti.shirt
            ? this.kTop
            : l === ti.bottom || l === ti.legs
              ? this.kBot
              : l === ti.face || l === ti.skin
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
    loft(t, e, s, n, { capBottom: i = !0, capTop: a = !0, faceW: r = 0 } = {}) {
      let l = s * 8,
        c = t.length,
        h = typeof n == "function" ? n : () => n,
        f = new Map(),
        u = (p, m, g, b = 0) => {
          let v = ((p * (e + 1) + m) * 32 + g) * 2 + b,
            x = f.get(v);
          if (x !== void 0) return x;
          let [y, M, S, w, _] = t[p],
            z = t[Math.max(0, p - 1)],
            A = t[Math.min(c - 1, p + 1)],
            T = (A[3] - z[3]) / (A[0] - z[0] || 1),
            E = (A[4] - z[4]) / (A[0] - z[0] || 1),
            R = (m / e) * Math.PI * 2,
            P = Math.cos(R),
            C = Math.sin(R),
            I = M + w * C,
            L = S + _ * P,
            F = C / Math.max(w, 0.001),
            O = P / Math.max(_, 0.001),
            B = Math.hypot(F, O),
            H = -(T * Math.abs(C) + E * Math.abs(P)),
            N = (m / e + 0.5) % 1;
          return (
            b && (N = 0.998),
            g === ti.face && r && (N = 0.5 + (I - M) / r),
            (x = this.vert(I + l, y, L, F / B, H, O / B, N, g)),
            f.set(v, x),
            x
          );
        };
      for (let p = 0; p + 1 < c; p++)
        for (let m = 0; m < e; m++) {
          let g = (t[p][0] + t[p + 1][0]) / 2,
            b = ((m + 0.5) / e) * Math.PI * 2,
            v = t[p],
            x = h(g, b, v[3] * Math.sin(b), v[4] * Math.cos(b)),
            y = m + 1 === e / 2 ? 1 : 0,
            M = u(p, m, x),
            S = u(p, m + 1, x, y),
            w = u(p + 1, m, x),
            _ = u(p + 1, m + 1, x, y);
          this.ix.push(M, S, w, S, _, w);
        }
      let d = (p, m) => {
        let [g, b, v] = t[p],
          x = h(g, 0, 0, 0),
          y = this.vert(b + l, g, v, 0, m ? 1 : -1, 0, 0.5, x);
        for (let M = 0; M < e; M++) {
          let S = u(p, M, x),
            w = u(p, M + 1, x);
          m ? this.ix.push(S, w, y) : this.ix.push(w, S, y);
        }
      };
      (i && d(0, !1), a && d(c - 1, !0));
    }
    ellipsoid(
      t,
      e,
      s,
      n,
      i,
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
        v = (y, M) => {
          let S = (M / r) * Math.PI * 2,
            w = d ? d(S) : u,
            _ = f + (w - f) * (y / l),
            z = Math.sin(_) * Math.sin(S),
            A = Math.cos(_),
            T = Math.sin(_) * Math.cos(S),
            E = p
              ? 1 +
                p *
                  (0.5 +
                    0.5 * Math.sin(S * 7 + 1.3) * Math.sin(S * 3.1 + y * 0.9)) *
                  Math.min(1, _ * 2)
              : 1;
          return [
            t + n * z * E,
            e + i * A * E,
            s + a * T * E,
            z / n,
            A / i,
            T / a,
          ];
        },
        x = (y, M, S, w = 0) => {
          let _ = ((y * (r + 1) + M) * 32 + S) * 2 + w,
            z = b.get(_);
          if (z !== void 0) return z;
          let [A, T, E, R, P, C] = v(y, M);
          return (
            (z = this.vert(
              A + m,
              T,
              E,
              R,
              P,
              C,
              w ? 0.998 : (M / r + 0.5) % 1,
              S,
            )),
            b.set(_, z),
            z
          );
        };
      for (let y = 0; y < l; y++)
        for (let M = 0; M < r; M++) {
          let S = v(y, M),
            w = v(y + 1, M + 1),
            _ = g(
              (S[0] + w[0]) / 2 - t,
              (S[1] + w[1]) / 2 - e,
              (S[2] + w[2]) / 2 - s,
            ),
            z = M + 1 === r / 2 ? 1 : 0,
            A = x(y, M, _),
            T = x(y, M + 1, _, z),
            E = x(y + 1, M, _),
            R = x(y + 1, M + 1, _, z);
          this.ix.push(A, E, T, T, E, R);
        }
    }
    box(t, e, s, n, i, a, r, l) {
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
        let b = [u, d, p, m].map((v) => {
          let [x, y, M] = h[v];
          return this.vert(
            t + c + x * n,
            e + y * i,
            s + M * a,
            g[0] + x * 0.35,
            g[1] + y * 0.35,
            g[2] + M * 0.35,
            0.5 + 0.25 * x,
            l,
          );
        });
        this.ix.push(b[0], b[1], b[2], b[0], b[2], b[3]);
      }
    }
    geometry() {
      let t = new Le();
      return (
        t.setAttribute("position", new Re(this.p, 3)),
        t.setAttribute("normal", new Re(this.n, 3)),
        t.setAttribute("uv", new Re(this.uv, 2)),
        t.setIndex(
          this.p.length / 3 > 65535 ? new j0(this.ix, 1) : new Yr(this.ix, 1),
        ),
        (t.boundingSphere = new _n(new dt(0, 0.9, 0), 1.2)),
        t
      );
    }
  },
  n0 = [
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
