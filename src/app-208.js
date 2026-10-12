// app 208 — math
// Lines 112623-112969 of readable/app.pretty.js (statement-aligned).
function Tmt(i, t) {
  let { D: e, L: s } = t;
  for (let n of Xl.rincon) {
    let o = sX(e, n);
    if (!o) continue;
    let a = va(o),
      r = Xo(a),
      [l] = iX(s, a),
      c = Math.max(l, o.base),
      h =
        n === Xl.rincon[0]
          ? c + (o.top - o.base)
          : c + Math.min(o.top - o.base, 150),
      f = o.cut || -1e9,
      u = Math.max(c + 6.6, f);
    (o.cut ||
      (ys(i, a, l - 0.6, c + 6, tX, { vBase: c }),
      vo(i, r, 0.25, c + 6, c + 6.6, Emt)),
      ys(i, a, u, h - 4, zmt, { vBase: c }));
    for (let m = c + 9.7; m < h - 5; m += 3.1)
      if (m > f)
        for (let g of r) {
          let x = [g.a[0] + g.n[0] * 0.09, g.a[1] + g.n[1] * 0.09],
            v = [g.b[0] + g.n[0] * 0.09, g.b[1] + g.n[1] * 0.09];
          ne(
            i,
            [
              [x[0], m, x[1]],
              [v[0], m, v[1]],
              [v[0], m + 0.32, v[1]],
              [x[0], m + 0.32, x[1]],
            ],
            qy,
            [g.n[0], 0, g.n[1]],
          );
        }
    (ys(i, a, h - 4, h, tX),
      vo(i, r, 0.2, h - 0.4, h + 0.2, qy),
      Ua(i, a, h, It(Lt.stone, 0.5, 0.5, 0.49)));
    let d = oX(a),
      p = null;
    for (let m of r) {
      if (m.L < 6) continue;
      let g = (m.m[0] - d.c[0]) * m.n[0] + (m.m[1] - d.c[1]) * m.n[1];
      (!p || m.L > p.e.L * 1.3 || (m.L > p.e.L * 0.7 && g > p.d)) &&
        (p = { e: m, d: g });
    }
    if (p) {
      let m = p.e,
        g = [m.m[0] + m.n[0] * 0.9, m.m[1] + m.n[1] * 0.9];
      (nn(i, g, m.u, m.n, 0.45, 0.9, u, h + 14, qy),
        nn(
          i,
          [
            m.m[0] + m.n[0] * 0.6 + m.u[0] * m.L * 0.3,
            m.m[1] + m.n[1] * 0.6 + m.u[1] * m.L * 0.3,
          ],
          m.u,
          m.n,
          0.3,
          0.6,
          u,
          h + 6,
          qy,
        ),
        nn(
          i,
          [
            m.m[0] + m.n[0] * 0.6 - m.u[0] * m.L * 0.3,
            m.m[1] + m.n[1] * 0.6 - m.u[1] * m.L * 0.3,
          ],
          m.u,
          m.n,
          0.3,
          0.6,
          u,
          h + 6,
          qy,
        ));
    }
    nX(t, a, l - 3, h + 2);
  }
}
var Ak = Be(be.granite, 0.56, 0.55, 0.52),
  ZP = Be(be.granite, 0.45, 0.44, 0.42),
  Amt = It(Lt.water, 0.5, 0.54, 0.56),
  Rmt = It(Lt.water, 0.16, 0.21, 0.2),
  Pmt = It(Lt.glass, 0.04, 0.045, 0.05);
function Cmt(i, t) {
  let { L: e } = t,
    [s, n] = Xl.moscone,
    o = n[0] - s[0],
    a = n[1] - s[1],
    r = Math.hypot(o, a),
    l = [o / r, a / r],
    c = [-l[1], l[0]];
  {
    let M = [(s[0] + n[0]) / 2 + c[0] * 6, (s[1] + n[1]) / 2 + c[1] * 6];
    e.surfaceAt(M[0], M[1]) !== "park" &&
      e.surfaceAt(M[0] - c[0] * 12, M[1] - c[1] * 12) === "park" &&
      (c = [-c[0], -c[1]]);
  }
  let h = 42.3,
    f = 36,
    u = (M, S) => [s[0] + l[0] * M + c[0] * S, s[1] + l[1] * M + c[1] * S],
    d = u(h, 3.2),
    p = e.terrainAt(d[0], d[1]) + 0.05,
    m = 8.6;
  (nn(i, u(h, 1), l, c, f / 2 + 1, 0.4, p - 0.5, p + m - 0.9, Pmt),
    nn(i, u(h, -1), l, c, f / 2 + 2, 2.1, p + m - 0.9, p + m, ZP));
  for (let M = -9; M <= 9; M++) {
    let S = u(h + M * 2, 0.95);
    Ae(i, [S[0], p + m, S[1]], [S[0], p + m + 1.05, S[1]], 0.03, Rk, 4);
  }
  {
    let M = u(h - f / 2 - 2, 0.95),
      S = u(h + f / 2 + 2, 0.95);
    Ae(i, [M[0], p + m + 1.05, M[1]], [S[0], p + m + 1.05, S[1]], 0.04, Rk, 4);
  }
  let g = h - f / 2,
    b = 0;
  for (; g < h + f / 2 - 0.5;) {
    let M = (Math.sin(b * 12.9898) * 43758.5453) % 1,
      S = Math.abs(M),
      w = 1.4 + 1.3 * S,
      z = b % 3 === 1 ? 1.4 : b % 3 === 2 ? 0.7 : 0.3,
      _ = 1.2 + 1.6 * Math.abs(Math.sin(b * 3.7)),
      R = m + 0.8 - 2.4 * Math.abs(Math.sin(b * 7.1)),
      T = g + w / 2;
    nn(
      i,
      u(T, 1.6 + _ / 2),
      l,
      c,
      w / 2,
      _ / 2,
      p - 0.4,
      p + R,
      b % 2 ? Ak : ZP,
    );
    let E = (A, C, P, I) => {
      let L = u(A - C / 2, P),
        F = u(A + C / 2, P),
        N = u(A - C * 0.6, P + 0.3),
        B = u(A + C * 0.6, P + 0.3);
      ne(
        i,
        [
          [L[0], I, L[1]],
          [F[0], I, F[1]],
          [B[0], p + 0.2, B[1]],
          [N[0], p + 0.2, N[1]],
        ],
        Amt,
        [c[0], 0, c[1]],
      );
    };
    if (S > 0.2)
      for (let A = 0, C = 2 + Math.floor(S * 4); A < C; A++) {
        let P = (A + 0.5) / C,
          I = 0.05 + 0.14 * Math.abs(Math.sin(b * 9.1 + A * 4.3));
        E(g + w * (0.12 + 0.76 * P), I, 1.6 + _ + 0.08, p + R + 0.05);
      }
    if (z > 0.6)
      for (let A = 0, C = Math.max(2, Math.round(z / 0.3)); A < C; A++)
        E(
          g + w + (z * (A + 0.5)) / C,
          0.08 + 0.1 * ((A + b) % 2),
          1.3,
          p + m - 0.9,
        );
    ((g += w + z), b++);
  }
  let x = 9.5,
    v = [
      u(h - f / 2 - 1, 1.6),
      u(h + f / 2 + 1, 1.6),
      u(h + f / 2 + 1, x),
      u(h - f / 2 - 1, x),
    ];
  (xa(i, v, p + 0.2, Rmt),
    nn(i, u(h, x + 0.45), l, c, f / 2 + 1.5, 0.45, p - 0.3, p + 0.38, Ak));
  for (let M of [-1, 1])
    nn(
      i,
      u(h + M * (f / 2 + 1.25), (x + 1.6) / 2),
      l,
      c,
      0.3,
      (x - 1.6) / 2 + 0.3,
      p - 0.3,
      p + 0.38,
      Ak,
    );
  for (let M = 0; M < 16; M++) {
    let S = Math.abs(Math.sin(M * 5.17)),
      w = Math.abs(Math.sin(M * 2.31)),
      z = u(h - f / 2 + 2 + (f - 4) * S, 3.5 + (x - 4.5) * w);
    nn(
      i,
      z,
      [Math.cos(M), Math.sin(M)],
      [-Math.sin(M), Math.cos(M)],
      0.7 + 0.5 * w,
      0.45 + 0.3 * S,
      p - 0.2,
      p + 0.3 + 0.25 * S,
      M % 2 ? Ak : ZP,
    );
  }
  let y = u(h, (x + 1.6) / 2);
  t.colliders.push({
    t: "obb",
    x: y[0],
    z: y[1],
    hx: (x - 1.6) / 2 + 1,
    hz: f / 2 + 1.8,
    c: l[1],
    s: l[0],
    y0: p - 2,
    y1: p + m + 2,
  });
}
var QP = [];
function aX(i, t, e) {
  let s = [
      ["islands", ymt],
      ["lotta", Smt],
      ["marquis", _mt],
      ["rincon", Tmt],
      ["mlkfalls", Cmt],
    ],
    n = (o, a) => {
      let r = new Ce();
      try {
        a(r, e);
      } catch (l) {
        console.error("r20:", o, l);
      }
      return r;
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [o, a] of s) gn(i.group, n(o, a), t.lm, "R20_" + o);
    return;
  }
  for (let [o, a] of s)
    QP.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(o, a);
      } finally {
        e.colliders = r;
      }
      return (gn(i.rc?.group || i.group, c, t.lm, "R20_" + o), l);
    });
}
var Uc = {
    cons: 30675038,
    consKiosks: [906618461, 906618462, 906618463],
    consRear: [
      1169102808, 1169102809, 1169102810, 1169102811, 1169102812, 1169102813,
      1169102814, 1169102815,
    ],
    consLawn: [
      [-5935, 2510],
      [-5795, 2510],
      [-5795, 2690],
      [-5935, 2690],
    ],
    ign: 225193440,
    ignParts: [1028575824, 1028575825, 1028575826, 1028575827],
    lone: [274298058, 274298055, 274298054],
  },
  Lmt = [
    [-5906, 2584, 1.15],
    [-5834, 2586, 1.1],
    [-5899, 2614, 1],
    [-5842, 2612, 1.2],
    [-5889, 2569, 0.95],
    [-5851, 2570, 1.05],
    [-5921, 2560, 1.1],
    [-5820, 2561, 1],
    [-5914, 2628, 1.2],
    [-5827, 2631, 1.05],
    [-5893, 2596, 0.9],
    [-5847, 2598, 1.15],
  ];
function hX(i) {
  (i.claim({
    name: "conservatory",
    ids: [Uc.cons, ...Uc.consKiosks, ...Uc.consRear],
    poly: Uc.consLawn,
    frac: 0.6,
    props: ["ptree", "tree", "lamp", "car", "hydrant", "palm"],
  }),
    i.claim({ name: "stignatius", ids: [Uc.ign, ...Uc.ignParts], poly: null }),
    i.claim({ name: "lonemountain", ids: Uc.lone, poly: null }));
}
var fX = (i, t) => {
    let e = i.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return mr(i, s);
    }
    return null;
  },
  nC = (i, t, e, s) => {
    let n = 1e9,
      o = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (o = Math.max(o, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    i.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, o, r],
      y0: e,
      y1: s,
    });
  },
  uX = (i, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, o] of t) {
      let a = i.terrainAt(n, o);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  },
  qb = (i, t, e, s) => [
    [i, t],
    [e, t],
    [e, s],
    [i, s],
  ],
  Gc = It(Lt.gloss, 0.95, 0.95, 0.92),
  $y = It(Lt.gloss, 0.5, 0.56, 0.58),
  iC = It(Lt.gloss, 0.62, 0.67, 0.68),
  Pk = Be(be.stucco, 0.9, 0.9, 0.86),
  tC = Be(be.granite, 0.66, 0.64, 0.6),
  Imt = Be(be.granite, 0.74, 0.72, 0.68);
