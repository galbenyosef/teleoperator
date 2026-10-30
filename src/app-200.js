// app 200 — math
// Lines 110824-111158 of readable/app.pretty.js (statement-aligned).
function HK(o, t, e, s) {
  let { D: n, L: i } = t,
    a = null;
  {
    let O = n.bld;
    for (let B = 0; B < O.n; B++)
      if (O.seed[B] === e) {
        a = er(n, B);
        break;
      }
  }
  if (!a) return;
  let r = Ra(a),
    l = ia(r),
    c = 1e9,
    h = -1e9;
  for (let [O, B] of r) {
    let H = i.terrainAt(O, B);
    ((c = Math.min(c, H)), (h = Math.max(h, H)));
  }
  let f = h + 8.5,
    u = f + 14.5,
    d = u + 2.4,
    p = d + 1.1,
    m = p + 5.5;
  (Ss(o, r, c - 0.6, f, tbt, { vBase: c }),
    Eo(o, l, 0.3, f - 0.4, f + 0.1, Tx),
    Ss(o, r, f, u, ebt, { vBase: f - 4 }),
    Eo(o, l, 0.9, u, d, Tx),
    Ss(o, r, d, p, Tx));
  let [g, b] = r.reduce(
      (O, B) => [O[0] + B[0] / r.length, O[1] + B[1] / r.length],
      [0, 0],
    ),
    v = 0;
  for (let [O, B] of r) v = Math.max(v, Math.hypot(O - g, B - b));
  let x = Math.max(0.7, 1 - 3.5 / v),
    y = r.map(([O, B]) => [g + (O - g) * x, b + (B - b) * x]);
  for (let O = 0; O < r.length; O++) {
    let B = r[O],
      H = r[(O + 1) % r.length],
      N = y[(O + 1) % r.length],
      D = y[O];
    (oe(
      o,
      [
        [B[0], p, B[1]],
        [H[0], p, H[1]],
        [N[0], m, N[1]],
        [D[0], m, D[1]],
      ],
      BK,
      [0, 1, 0],
    ),
      oe(
        o,
        [
          [D[0], m, D[1]],
          [N[0], m, N[1]],
          [H[0], p, H[1]],
          [B[0], p, B[1]],
        ],
        BK,
        [0, -1, 0],
      ));
  }
  sr(o, y, m, Lt(Ct.stone, 0.4, 0.4, 0.41));
  let M = Qm(i, l, "Van Ness Avenue"),
    S = M.u,
    w = M.n,
    _ = M.L / 2 - 6,
    z = 0;
  for (let O of r) {
    let B = (O[0] - M.m[0]) * S[0] + (O[1] - M.m[1]) * S[1],
      H = (O[0] - M.m[0]) * w[0] + (O[1] - M.m[1]) * w[1];
    Math.abs(B) < M.L / 2 + 3 && H < 6 && (z = Math.max(z, H));
  }
  let A = [M.m[0] + w[0] * z, M.m[1] + w[1] * z],
    T = (O, B, H) => [
      A[0] + S[0] * O + w[0] * B,
      H,
      A[1] + S[1] * O + w[1] * B,
    ],
    E = (O, B, H, N, D, U, G) => {
      let W = T(O, B, 0);
      cn(o, [W[0], W[2]], S, w, H, N, D, U, G);
    };
  E(0, 0.08, _, 0.08, f + 0.6, u - 1, obt);
  let R = Math.max(4, Math.round((2 * _) / 6.2));
  for (let O = 0; O < R; O++) {
    let B = -_ + (O + 0.5) * ((2 * _) / R),
      H = 1.5,
      N = f + 1.6,
      D = u - 2.4,
      U = [w[0], 0, w[1]];
    (E(B, 0.2, H + 0.2, 0.04, N - 0.2, D + 0.2, sbt),
      E(B, 0.3, H, 0.03, N, D, gL),
      O % 2 === 0 &&
        E(B, 1.75, 1.1, 0.02, f + 3.2, u - 1.6, NK[(O / 2) % NK.length]));
  }
  for (let O = c + 1.2; O < f - 0.6; O += 0.75)
    Eo(o, l, 0.02, O, O + 0.07, nbt);
  for (let O = 0; O <= R; O++)
    for (let B of [-0.75, 0.75]) {
      let H = -_ + O * ((2 * _) / R) + B,
        N = T(H, 1.9, 0);
      qe(
        o,
        N[0],
        N[2],
        [
          [0.86, f],
          [0.8, f + 0.4],
          [0.72, f + 0.6],
          [0.64, u - 1],
          [0.8, u - 0.6],
          [0.86, u],
        ],
        12,
        ibt,
      );
    }
  cn(
    o,
    [A[0] + w[0] * 1.15, A[1] + w[1] * 1.15],
    S,
    w,
    _ + 1.2,
    1.2,
    u - 0.3,
    d + 0.06,
    Tx,
  );
  for (let O = -_; O < _; O += 0.45) {
    let B = T(O, 2.2, 0);
    qe(
      o,
      B[0],
      B[2],
      [
        [0.11, d],
        [0.17, d + 0.35],
        [0.08, d + 0.6],
        [0.11, d + 0.85],
      ],
      6,
      Tx,
    );
  }
  cn(
    o,
    [A[0] + w[0] * 2.2, A[1] + w[1] * 2.2],
    S,
    w,
    _ + 1.2,
    0.25,
    d + 0.85,
    d + 1.1,
    Tx,
  );
  for (let O = 0; O < R; O++) {
    let B = -_ + (O + 0.5) * ((2 * _) / R),
      H = 1.6,
      N = Math.max(c, i.terrainAt(T(B, 1, 0)[0], T(B, 1, 0)[2])) + 0.2,
      D = N + 4.2,
      U = [T(B - H, 0.07, N), T(B + H, 0.07, N), T(B + H, 0.07, D)];
    for (let G = 1; G < 8; G++) {
      let W = (G / 8) * Math.PI;
      U.push(T(B + Math.cos(W) * H, 0.07, D + Math.sin(W) * H));
    }
    E(B, 0.1, H, 0.05, N, D, gL);
    for (let G = 0; G < 6; G++)
      E(
        B,
        0.1,
        H * Math.sqrt(1 - ((G + 0.5) / 6) ** 2),
        0.05,
        D + (H * G) / 6,
        D + (H * (G + 1)) / 6,
        gL,
      );
  }
  if (s) {
    let O = [g - w[0] * 18, b - w[1] * 18];
    cn(o, O, S, w, 22, 16, m - 2, c + 46, abt);
  }
  let P = [];
  for (let [O, B] of r) P.push(O, B);
  let C = 1e9,
    I = -1e9,
    L = 1e9,
    F = -1e9;
  for (let [O, B] of r)
    ((C = Math.min(C, O)),
      (I = Math.max(I, O)),
      (L = Math.min(L, B)),
      (F = Math.max(F, B)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(P),
    bb: [C, L, I, F],
    y0: c - 3,
    y1: c + 50,
  });
}
var rbt = We(we.perforated, 0.93, 0.93, 0.92),
  Sz = Lt(Ct.gloss, 0.78, 0.79, 0.8),
  lbt = Tn(ln.GLASS, we.stainedglass, 0.35, 0.42, 0.48),
  cbt = Lt(Ct.stone, 0.62, 0.62, 0.6);
function hbt(o, t) {
  let { D: e, L: s } = t,
    n = null;
  {
    let w = e.bld;
    for (let _ = 0; _ < w.n; _++)
      if (w.seed[_] === mh.arena) {
        n = er(e, _);
        break;
      }
  }
  if (!n) return;
  let i = Ra(n),
    a = 1e9,
    r = -1e9;
  for (let [w, _] of i) {
    let z = s.terrainAt(w, _);
    ((a = Math.min(a, z)), (r = Math.max(r, z)));
  }
  let [l, c] = i.reduce(
      (w, _) => [w[0] + _[0] / i.length, w[1] + _[1] / i.length],
      [0, 0],
    ),
    h = (w) => i.map(([_, z]) => [l + (_ - l) * w, c + (z - c) * w]),
    f = (w) => {
      let _ = [];
      for (let z = 0; z < w.length; z++) {
        let A = w[(z + w.length - 1) % w.length],
          T = w[z],
          E = w[(z + 1) % w.length],
          R = [(A[0] + T[0]) / 2, (A[1] + T[1]) / 2],
          P = [(T[0] + E[0]) / 2, (T[1] + E[1]) / 2];
        for (let C = 0; C < 1; C += 0.25)
          _.push([
            (1 - C) * (1 - C) * R[0] + 2 * C * (1 - C) * T[0] + C * C * P[0],
            (1 - C) * (1 - C) * R[1] + 2 * C * (1 - C) * T[1] + C * C * P[1],
          ]);
      }
      return _;
    },
    u = f(i),
    d = r + 0.1,
    p = d + 9,
    m = a + 34,
    g = 0;
  for (let [w, _] of i) g = Math.max(g, Math.hypot(w - l, _ - c));
  let b = f(h(1 - 2.2 / g));
  Ss(o, b, a - 0.5, p, lbt, { vBase: d });
  for (let w = 0; w < b.length; w += 3) {
    let [_, z] = b[w];
    Ce(o, [_, a, z], [_, p, z], 0.07, Sz, 4);
  }
  (Ta(o, u, p, Sz), Ss(o, u, p - 0.6, p, Sz));
  for (let w = 0, _ = p; _ < m - 1.6; w++, _ += 2.4)
    Ss(o, f(h(1 - (0.3 / g) * (w % 2))), _, _ + 2.25, rbt, { vBase: _ });
  (Ss(o, f(h(1 - 0.8 / g)), m - 1.6, m - 0.9, wn(0.9, 0.95, 1)),
    Ss(o, u, m - 0.9, m, Sz),
    Ta(o, f(h(0.97)), m, cbt));
  let v = [];
  for (let [w, _] of i) v.push(w, _);
  let x = 1e9,
    y = -1e9,
    M = 1e9,
    S = -1e9;
  for (let [w, _] of i)
    ((x = Math.min(x, w)),
      (y = Math.max(y, w)),
      (M = Math.min(M, _)),
      (S = Math.max(S, _)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(v),
    bb: [x, M, y, S],
    y0: a - 3,
    y1: m + 2,
  });
}
function UK(o, t, e) {
  let s = new Map(),
    n = (a) => {
      let r = s.get(a);
      return (r || s.set(a, (r = new Be())), r);
    };
  for (let [a, r] of [
    [() => jgt(n("maritime"), e), "maritime"],
    [() => Qgt(n("civic"), e), "civic"],
    [() => HK(n("opera"), e, mh.opera, !0), "opera"],
    [() => HK(n("veterans"), e, mh.veterans, !1), "veterans"],
    [() => hbt(n("arena"), e), "arena"],
  ])
    try {
      a();
    } catch (l) {
      console.error("r18:", r, l);
    }
  let i = (a) => {
    for (let [r, l] of s) vn(a, l, t.lm, "R18_" + r);
  };
  Mp() ? ex(() => i(o.rc?.group || o.group)) : i(o.group);
}
var dr = {
  levis: [288483487, 288483479, 288483480],
  westin: 1091967971,
  macys: 32863633,
  neiman: 332521036,
  saks: 32863589,
  sfmoma: {
    botta: [1365384415, 1365384412, 1365384413, 1365384414],
    drum: 1365384410,
    ext: 1365384411,
    foyer: 1365384416,
  },
  plaza: [
    [-797, -736],
    [-742, -727],
    [-752, -794],
    [-792, -797],
    [-790, -764],
    [-799, -753],
  ],
  fountain: [-766, -775],
  cascade: [
    [-714, -808],
    [-672, -784],
  ],
};
