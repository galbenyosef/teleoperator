// app 207 — math
// Lines 112879-113225 of readable/app.pretty.js (statement-aligned).
function Zbt(o, t) {
  let { D: e, L: s } = t;
  for (let n of mc.rincon) {
    let i = oY(e, n);
    if (!i) continue;
    let a = Ra(i),
      r = ia(a),
      [l] = rY(s, a),
      c = Math.max(l, i.base),
      h =
        n === mc.rincon[0]
          ? c + (i.top - i.base)
          : c + Math.min(i.top - i.base, 150),
      f = i.cut || -1e9,
      u = Math.max(c + 6.6, f);
    (i.cut ||
      (Ss(o, a, l - 0.6, c + 6, nY, { vBase: c }),
      Eo(o, r, 0.25, c + 6, c + 6.6, Jbt)),
      Ss(o, a, u, h - 4, Ybt, { vBase: c }));
    for (let m = c + 9.7; m < h - 5; m += 3.1)
      if (m > f)
        for (let g of r) {
          let v = [g.a[0] + g.n[0] * 0.09, g.a[1] + g.n[1] * 0.09],
            x = [g.b[0] + g.n[0] * 0.09, g.b[1] + g.n[1] * 0.09];
          oe(
            o,
            [
              [v[0], m, v[1]],
              [x[0], m, x[1]],
              [x[0], m + 0.32, x[1]],
              [v[0], m + 0.32, v[1]],
            ],
            Hw,
            [g.n[0], 0, g.n[1]],
          );
        }
    (Ss(o, a, h - 4, h, nY),
      Eo(o, r, 0.2, h - 0.4, h + 0.2, Hw),
      sr(o, a, h, Lt(Ct.stone, 0.5, 0.5, 0.49)));
    let d = lY(a),
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
      (cn(o, g, m.u, m.n, 0.45, 0.9, u, h + 14, Hw),
        cn(
          o,
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
          Hw,
        ),
        cn(
          o,
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
          Hw,
        ));
    }
    aY(t, a, l - 3, h + 2);
  }
}
var Rz = We(we.granite, 0.56, 0.55, 0.52),
  TL = We(we.granite, 0.45, 0.44, 0.42),
  Qbt = Lt(Ct.water, 0.5, 0.54, 0.56),
  txt = Lt(Ct.water, 0.16, 0.21, 0.2),
  ext = Lt(Ct.glass, 0.04, 0.045, 0.05);
function sxt(o, t) {
  let { L: e } = t,
    [s, n] = mc.moscone,
    i = n[0] - s[0],
    a = n[1] - s[1],
    r = Math.hypot(i, a),
    l = [i / r, a / r],
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
  (cn(o, u(h, 1), l, c, f / 2 + 1, 0.4, p - 0.5, p + m - 0.9, ext),
    cn(o, u(h, -1), l, c, f / 2 + 2, 2.1, p + m - 0.9, p + m, TL));
  for (let M = -9; M <= 9; M++) {
    let S = u(h + M * 2, 0.95);
    Ce(o, [S[0], p + m, S[1]], [S[0], p + m + 1.05, S[1]], 0.03, Az, 4);
  }
  {
    let M = u(h - f / 2 - 2, 0.95),
      S = u(h + f / 2 + 2, 0.95);
    Ce(o, [M[0], p + m + 1.05, M[1]], [S[0], p + m + 1.05, S[1]], 0.04, Az, 4);
  }
  let g = h - f / 2,
    b = 0;
  for (; g < h + f / 2 - 0.5;) {
    let M = (Math.sin(b * 12.9898) * 43758.5453) % 1,
      S = Math.abs(M),
      w = 1.4 + 1.3 * S,
      _ = b % 3 === 1 ? 1.4 : b % 3 === 2 ? 0.7 : 0.3,
      z = 1.2 + 1.6 * Math.abs(Math.sin(b * 3.7)),
      A = m + 0.8 - 2.4 * Math.abs(Math.sin(b * 7.1)),
      T = g + w / 2;
    cn(
      o,
      u(T, 1.6 + z / 2),
      l,
      c,
      w / 2,
      z / 2,
      p - 0.4,
      p + A,
      b % 2 ? Rz : TL,
    );
    let E = (R, P, C, I) => {
      let L = u(R - P / 2, C),
        F = u(R + P / 2, C),
        O = u(R - P * 0.6, C + 0.3),
        B = u(R + P * 0.6, C + 0.3);
      oe(
        o,
        [
          [L[0], I, L[1]],
          [F[0], I, F[1]],
          [B[0], p + 0.2, B[1]],
          [O[0], p + 0.2, O[1]],
        ],
        Qbt,
        [c[0], 0, c[1]],
      );
    };
    if (S > 0.2)
      for (let R = 0, P = 2 + Math.floor(S * 4); R < P; R++) {
        let C = (R + 0.5) / P,
          I = 0.05 + 0.14 * Math.abs(Math.sin(b * 9.1 + R * 4.3));
        E(g + w * (0.12 + 0.76 * C), I, 1.6 + z + 0.08, p + A + 0.05);
      }
    if (_ > 0.6)
      for (let R = 0, P = Math.max(2, Math.round(_ / 0.3)); R < P; R++)
        E(
          g + w + (_ * (R + 0.5)) / P,
          0.08 + 0.1 * ((R + b) % 2),
          1.3,
          p + m - 0.9,
        );
    ((g += w + _), b++);
  }
  let v = 9.5,
    x = [
      u(h - f / 2 - 1, 1.6),
      u(h + f / 2 + 1, 1.6),
      u(h + f / 2 + 1, v),
      u(h - f / 2 - 1, v),
    ];
  (Ta(o, x, p + 0.2, txt),
    cn(o, u(h, v + 0.45), l, c, f / 2 + 1.5, 0.45, p - 0.3, p + 0.38, Rz));
  for (let M of [-1, 1])
    cn(
      o,
      u(h + M * (f / 2 + 1.25), (v + 1.6) / 2),
      l,
      c,
      0.3,
      (v - 1.6) / 2 + 0.3,
      p - 0.3,
      p + 0.38,
      Rz,
    );
  for (let M = 0; M < 16; M++) {
    let S = Math.abs(Math.sin(M * 5.17)),
      w = Math.abs(Math.sin(M * 2.31)),
      _ = u(h - f / 2 + 2 + (f - 4) * S, 3.5 + (v - 4.5) * w);
    cn(
      o,
      _,
      [Math.cos(M), Math.sin(M)],
      [-Math.sin(M), Math.cos(M)],
      0.7 + 0.5 * w,
      0.45 + 0.3 * S,
      p - 0.2,
      p + 0.3 + 0.25 * S,
      M % 2 ? Rz : TL,
    );
  }
  let y = u(h, (v + 1.6) / 2);
  t.colliders.push({
    t: "obb",
    x: y[0],
    z: y[1],
    hx: (v - 1.6) / 2 + 1,
    hz: f / 2 + 1.8,
    c: l[1],
    s: l[0],
    y0: p - 2,
    y1: p + m + 2,
  });
}
var RL = [];
function cY(o, t, e) {
  let s = [
      ["islands", Wbt],
      ["lotta", $bt],
      ["marquis", Kbt],
      ["rincon", Zbt],
      ["mlkfalls", sxt],
    ],
    n = (i, a) => {
      let r = new Be();
      try {
        a(r, e);
      } catch (l) {
        console.error("r20:", i, l);
      }
      return r;
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [i, a] of s) vn(o.group, n(i, a), t.lm, "R20_" + i);
    return;
  }
  for (let [i, a] of s)
    RL.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(i, a);
      } finally {
        e.colliders = r;
      }
      return (vn(o.rc?.group || o.group, c, t.lm, "R20_" + i), l);
    });
}
var bh = {
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
  nxt = [
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
function dY(o) {
  (o.claim({
    name: "conservatory",
    ids: [bh.cons, ...bh.consKiosks, ...bh.consRear],
    poly: bh.consLawn,
    frac: 0.6,
    props: ["ptree", "tree", "lamp", "car", "hydrant", "palm"],
  }),
    o.claim({ name: "stignatius", ids: [bh.ign, ...bh.ignParts], poly: null }),
    o.claim({ name: "lonemountain", ids: bh.lone, poly: null }));
}
var pY = (o, t) => {
    let e = o.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return er(o, s);
    }
    return null;
  },
  LL = (o, t, e, s) => {
    let n = 1e9,
      i = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (i = Math.max(i, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    o.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, i, r],
      y0: e,
      y1: s,
    });
  },
  mY = (o, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, i] of t) {
      let a = o.terrainAt(n, i);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  },
  Ax = (o, t, e, s) => [
    [o, t],
    [e, t],
    [e, s],
    [o, s],
  ],
  xh = Lt(Ct.gloss, 0.95, 0.95, 0.92),
  Gw = Lt(Ct.gloss, 0.5, 0.56, 0.58),
  IL = Lt(Ct.gloss, 0.62, 0.67, 0.68),
  Pz = We(we.stucco, 0.9, 0.9, 0.86),
  AL = We(we.granite, 0.66, 0.64, 0.6),
  ixt = We(we.granite, 0.74, 0.72, 0.68);
