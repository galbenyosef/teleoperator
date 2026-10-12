// app 76 — math
// Lines 69726-70045 of readable/app.pretty.js (statement-aligned).
var Eht = {
    skin: 0,
    face: 1,
    top: 2,
    topacc: 3,
    jacket: 4,
    shirt: 5,
    bottom: 6,
    shoes: 7,
    sole: 8,
    hair: 9,
    hat: 10,
    hatacc: 11,
    bag: 12,
    bagacc: 13,
    glasses: 14,
    cloud: 15,
    phone: 16,
    tights: 17,
    belt: 18,
    lens: 19,
    brow: 20,
  },
  Ys = Eht,
  GG = (i) => (i ? Zf[i[0]] * 16 + i[1] : 0),
  Zg = (i, t, e) => {
    let s = Math.min(1, Math.max(0, (e - i) / (t - i)));
    return s * s * (3 - 2 * s);
  },
  HR = class {
    constructor() {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.j = []),
        (this.w = []),
        (this.ix = []),
        (this.cur = {
          part: 0,
          c1: 0,
          c2: 0,
          piv: [0, 0, 0],
          L: 0,
          wf: () => 0,
        }),
        (this.hip = 0));
    }
    get v() {
      return this.p.length / 3;
    }
    piece(t, e, s = null, n = null, o = 0, a = () => 0) {
      return (
        (this.cur = { part: t, c1: GG(s), c2: GG(n), piv: e, L: o, wf: a }),
        this
      );
    }
    vert(t, e, s, n, o, a, r, l, c) {
      let h = this.cur;
      this.p.push(t, e, s);
      let f = Math.hypot(n, o, a) || 1;
      (this.n.push(n / f, o / f, a / f),
        this.uv.push(c + Math.min(0.998, Math.max(0, r)), l));
      let u = Math.round(Math.min(1, Math.max(0, h.wf(e))) * 100);
      return (
        this.j.push(h.part, h.c1, h.c2, u + 101 * Math.round(h.L * 100)),
        this.w.push(h.piv[0], h.piv[1], h.piv[2], this.hip),
        this.v - 1
      );
    }
    loft(t, e, s, { capBottom: n = !1, capTop: o = !1, face: a = null } = {}) {
      let r = t.length,
        l = typeof s == "function" ? s : () => s,
        c = new Map(),
        h = (u, d, p, m) => {
          let g = ((u * (e + 1) + d) * 32 + p) * 2 + m,
            b = c.get(g);
          if (b !== void 0) return b;
          let [x, v, y, M, S] = t[u],
            w = t[Math.max(0, u - 1)],
            z = t[Math.min(r - 1, u + 1)],
            _ = (z[3] - w[3]) / (z[0] - w[0] || 1),
            R = (z[4] - w[4]) / (z[0] - w[0] || 1),
            T = (d / e) * Math.PI * 2,
            E = Math.cos(T),
            A = Math.sin(T),
            C = v + M * A,
            P = y + S * E,
            I = A / Math.max(M, 0.001),
            L = E / Math.max(S, 0.001),
            F = Math.hypot(I, L),
            N = -(_ * Math.abs(A) + R * Math.abs(E)),
            B = m ? 0.998 : (d / e + 0.5) % 1,
            H = x;
          return (
            p === Ys.face &&
              a &&
              ((B = 0.5 + (C - v) / a.w), (H = (x - a.y0) / (a.y1 - a.y0))),
            (b = this.vert(C, x, P, I / F, N, L / F, B, H, p)),
            c.set(g, b),
            b
          );
        };
      for (let u = 0; u + 1 < r; u++)
        for (let d = 0; d < e; d++) {
          let p = (t[u][0] + t[u + 1][0]) / 2,
            m = ((d + 0.5) / e) * Math.PI * 2,
            g = l(p, m),
            b = d + 1 === e / 2 ? 1 : 0,
            x = h(u, d, g, 0),
            v = h(u, d + 1, g, b),
            y = h(u + 1, d, g, 0),
            M = h(u + 1, d + 1, g, b);
          this.ix.push(x, v, y, v, M, y);
        }
      let f = (u, d) => {
        let [p, m, g] = t[u],
          b = l(p, 0),
          x = this.vert(m, p, g, 0, d ? 1 : -1, 0, 0.5, p, b);
        for (let v = 0; v < e; v++) {
          let y = h(u, v, b, 0),
            M = h(u, v + 1, b, 0);
          d ? this.ix.push(y, M, x) : this.ix.push(M, y, x);
        }
      };
      (n && f(0, !1), o && f(r - 1, !0));
    }
    ell(
      t,
      e,
      s,
      n,
      o,
      a,
      r,
      l,
      c,
      {
        lat0: h = 0,
        lat1: f = Math.PI,
        latAt: u = null,
        jit: d = 0,
        rot: p = 0,
      } = {},
    ) {
      let m = typeof c == "function" ? c : () => c,
        g = new Map(),
        b = Math.cos(p),
        x = Math.sin(p),
        v = (M, S) => {
          let w = (S / r) * Math.PI * 2,
            z = u ? u(w) : f,
            _ = h + (z - h) * (M / l),
            R = Math.sin(_) * Math.sin(w),
            T = Math.cos(_),
            E = Math.sin(_) * Math.cos(w),
            A = d
              ? 1 +
                d *
                  (0.5 +
                    0.5 * Math.sin(w * 7 + 1.3) * Math.sin(w * 3.1 + M * 1.7)) *
                  Math.min(1, _ * 2)
              : 1,
            C = n * R * A,
            P = o * T * A,
            I = a * E * A,
            L = R / n,
            F = T / o,
            N = E / a;
          return (
            p &&
              (([P, I] = [P * b - I * x, P * x + I * b]),
              ([F, N] = [F * b - N * x, F * x + N * b])),
            [t + C, e + P, s + I, L, F, N]
          );
        },
        y = (M, S, w) => {
          let z = (M * (r + 1) + S) * 32 + w,
            _ = g.get(z);
          if (_ !== void 0) return _;
          let [R, T, E, A, C, P] = v(M, S);
          return (
            (_ = this.vert(R, T, E, A, C, P, S / r, T, w)),
            g.set(z, _),
            _
          );
        };
      for (let M = 0; M < l; M++)
        for (let S = 0; S < r; S++) {
          let w = v(M, S),
            z = v(M + 1, S + 1),
            _ = m(
              (w[0] + z[0]) / 2 - t,
              (w[1] + z[1]) / 2 - e,
              (w[2] + z[2]) / 2 - s,
            ),
            R = y(M, S, _),
            T = y(M, S + 1, _),
            E = y(M + 1, S, _),
            A = y(M + 1, S + 1, _);
          this.ix.push(R, E, T, T, E, A);
        }
    }
    box(t, e, s, n, o, a, r) {
      let l = [
          [-1, -1, -1],
          [1, -1, -1],
          [1, 1, -1],
          [-1, 1, -1],
          [-1, -1, 1],
          [1, -1, 1],
          [1, 1, 1],
          [-1, 1, 1],
        ],
        c = [
          [0, 3, 2, 1, [0, 0, -1]],
          [4, 5, 6, 7, [0, 0, 1]],
          [0, 4, 7, 3, [-1, 0, 0]],
          [1, 2, 6, 5, [1, 0, 0]],
          [3, 7, 6, 2, [0, 1, 0]],
          [0, 1, 5, 4, [0, -1, 0]],
        ];
      for (let [h, f, u, d, p] of c) {
        let m = [h, f, u, d].map((g) => {
          let [b, x, v] = l[g];
          return this.vert(
            t + b * n,
            e + x * o,
            s + v * a,
            p[0] + b * 0.3,
            p[1] + x * 0.3,
            p[2] + v * 0.3,
            0.5,
            e + x * o,
            r,
          );
        });
        this.ix.push(m[0], m[1], m[2], m[0], m[2], m[3]);
      }
    }
  },
  DR = {
    name: "man",
    hip: 0.9,
    knee: 0.49,
    sh: 1.44,
    shX: 0.185,
    ua: 0.29,
    fa: 0.26,
    neck: 1.5,
    head: [0.104, 0.134, 0.116],
    legX: 0.08,
    hipR: [0.158, 0.105],
    waist: [0.142, 0.1],
    chest: [0.168, 0.112],
    thigh: 0.074,
    calf: 0.054,
    arm: 0.043,
    fore: 0.035,
    hand: 1,
    scale: [0.95, 1.05],
  },
  Tht = {
    ...DR,
    name: "woman",
    hip: 0.86,
    knee: 0.47,
    sh: 1.37,
    shX: 0.165,
    ua: 0.27,
    fa: 0.24,
    neck: 1.425,
    head: [0.1, 0.128, 0.11],
    legX: 0.083,
    hipR: [0.168, 0.11],
    waist: [0.122, 0.092],
    chest: [0.15, 0.112],
    thigh: 0.074,
    calf: 0.05,
    arm: 0.037,
    fore: 0.031,
    hand: 0.9,
    scale: [0.95, 1.04],
  },
  Aht = {
    ...DR,
    name: "heavy",
    hipR: [0.18, 0.13],
    waist: [0.185, 0.16],
    chest: [0.19, 0.145],
    shX: 0.2,
    thigh: 0.088,
    calf: 0.062,
    arm: 0.052,
    fore: 0.042,
    legX: 0.09,
    scale: [0.94, 1.02],
  },
  Rht = {
    name: "kid",
    hip: 0.6,
    knee: 0.33,
    sh: 0.95,
    shX: 0.13,
    ua: 0.2,
    fa: 0.18,
    neck: 1,
    head: [0.096, 0.122, 0.106],
    legX: 0.06,
    hipR: [0.115, 0.08],
    waist: [0.11, 0.08],
    chest: [0.12, 0.085],
    thigh: 0.054,
    calf: 0.042,
    arm: 0.032,
    fore: 0.028,
    hand: 0.75,
    kid: 1,
    scale: [0.8, 1.05],
  },
  ny = [DR, Tht, Aht, Rht];
