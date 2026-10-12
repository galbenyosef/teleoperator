// app 201 — math
// Lines 110568-110902 of readable/app.pretty.js (statement-aligned).
function N$(i, t, e, s) {
  let { D: n, L: o } = t,
    a = null;
  {
    let N = n.bld;
    for (let B = 0; B < N.n; B++)
      if (N.seed[B] === e) {
        a = mr(n, B);
        break;
      }
  }
  if (!a) return;
  let r = va(a),
    l = Xo(r),
    c = 1e9,
    h = -1e9;
  for (let [N, B] of r) {
    let H = o.terrainAt(N, B);
    ((c = Math.min(c, H)), (h = Math.max(h, H)));
  }
  let f = h + 8.5,
    u = f + 14.5,
    d = u + 2.4,
    p = d + 1.1,
    m = p + 5.5;
  (ys(i, r, c - 0.6, f, R1t, { vBase: c }),
    vo(i, l, 0.3, f - 0.4, f + 0.1, Gb),
    ys(i, r, f, u, P1t, { vBase: f - 4 }),
    vo(i, l, 0.9, u, d, Gb),
    ys(i, r, d, p, Gb));
  let [g, b] = r.reduce(
      (N, B) => [N[0] + B[0] / r.length, N[1] + B[1] / r.length],
      [0, 0],
    ),
    x = 0;
  for (let [N, B] of r) x = Math.max(x, Math.hypot(N - g, B - b));
  let v = Math.max(0.7, 1 - 3.5 / x),
    y = r.map(([N, B]) => [g + (N - g) * v, b + (B - b) * v]);
  for (let N = 0; N < r.length; N++) {
    let B = r[N],
      H = r[(N + 1) % r.length],
      O = y[(N + 1) % r.length],
      D = y[N];
    (ne(
      i,
      [
        [B[0], p, B[1]],
        [H[0], p, H[1]],
        [O[0], m, O[1]],
        [D[0], m, D[1]],
      ],
      I$,
      [0, 1, 0],
    ),
      ne(
        i,
        [
          [D[0], m, D[1]],
          [O[0], m, O[1]],
          [H[0], p, H[1]],
          [B[0], p, B[1]],
        ],
        I$,
        [0, -1, 0],
      ));
  }
  Ua(i, y, m, It(Lt.stone, 0.4, 0.4, 0.41));
  let M = hm(o, l, "Van Ness Avenue"),
    S = M.u,
    w = M.n,
    z = M.L / 2 - 6,
    _ = 0;
  for (let N of r) {
    let B = (N[0] - M.m[0]) * S[0] + (N[1] - M.m[1]) * S[1],
      H = (N[0] - M.m[0]) * w[0] + (N[1] - M.m[1]) * w[1];
    Math.abs(B) < M.L / 2 + 3 && H < 6 && (_ = Math.max(_, H));
  }
  let R = [M.m[0] + w[0] * _, M.m[1] + w[1] * _],
    T = (N, B, H) => [
      R[0] + S[0] * N + w[0] * B,
      H,
      R[1] + S[1] * N + w[1] * B,
    ],
    E = (N, B, H, O, D, U, G) => {
      let q = T(N, B, 0);
      nn(i, [q[0], q[2]], S, w, H, O, D, U, G);
    };
  E(0, 0.08, z, 0.08, f + 0.6, u - 1, F1t);
  let A = Math.max(4, Math.round((2 * z) / 6.2));
  for (let N = 0; N < A; N++) {
    let B = -z + (N + 0.5) * ((2 * z) / A),
      H = 1.5,
      O = f + 1.6,
      D = u - 2.4,
      U = [w[0], 0, w[1]];
    (E(B, 0.2, H + 0.2, 0.04, O - 0.2, D + 0.2, C1t),
      E(B, 0.3, H, 0.03, O, D, DP),
      N % 2 === 0 &&
        E(B, 1.75, 1.1, 0.02, f + 3.2, u - 1.6, F$[(N / 2) % F$.length]));
  }
  for (let N = c + 1.2; N < f - 0.6; N += 0.75)
    vo(i, l, 0.02, N, N + 0.07, L1t);
  for (let N = 0; N <= A; N++)
    for (let B of [-0.75, 0.75]) {
      let H = -z + N * ((2 * z) / A) + B,
        O = T(H, 1.9, 0);
      Oe(
        i,
        O[0],
        O[2],
        [
          [0.86, f],
          [0.8, f + 0.4],
          [0.72, f + 0.6],
          [0.64, u - 1],
          [0.8, u - 0.6],
          [0.86, u],
        ],
        12,
        I1t,
      );
    }
  nn(
    i,
    [R[0] + w[0] * 1.15, R[1] + w[1] * 1.15],
    S,
    w,
    z + 1.2,
    1.2,
    u - 0.3,
    d + 0.06,
    Gb,
  );
  for (let N = -z; N < z; N += 0.45) {
    let B = T(N, 2.2, 0);
    Oe(
      i,
      B[0],
      B[2],
      [
        [0.11, d],
        [0.17, d + 0.35],
        [0.08, d + 0.6],
        [0.11, d + 0.85],
      ],
      6,
      Gb,
    );
  }
  nn(
    i,
    [R[0] + w[0] * 2.2, R[1] + w[1] * 2.2],
    S,
    w,
    z + 1.2,
    0.25,
    d + 0.85,
    d + 1.1,
    Gb,
  );
  for (let N = 0; N < A; N++) {
    let B = -z + (N + 0.5) * ((2 * z) / A),
      H = 1.6,
      O = Math.max(c, o.terrainAt(T(B, 1, 0)[0], T(B, 1, 0)[2])) + 0.2,
      D = O + 4.2,
      U = [T(B - H, 0.07, O), T(B + H, 0.07, O), T(B + H, 0.07, D)];
    for (let G = 1; G < 8; G++) {
      let q = (G / 8) * Math.PI;
      U.push(T(B + Math.cos(q) * H, 0.07, D + Math.sin(q) * H));
    }
    E(B, 0.1, H, 0.05, O, D, DP);
    for (let G = 0; G < 6; G++)
      E(
        B,
        0.1,
        H * Math.sqrt(1 - ((G + 0.5) / 6) ** 2),
        0.05,
        D + (H * G) / 6,
        D + (H * (G + 1)) / 6,
        DP,
      );
  }
  if (s) {
    let N = [g - w[0] * 18, b - w[1] * 18];
    nn(i, N, S, w, 22, 16, m - 2, c + 46, N1t);
  }
  let C = [];
  for (let [N, B] of r) C.push(N, B);
  let P = 1e9,
    I = -1e9,
    L = 1e9,
    F = -1e9;
  for (let [N, B] of r)
    ((P = Math.min(P, N)),
      (I = Math.max(I, N)),
      (L = Math.min(L, B)),
      (F = Math.max(F, B)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(C),
    bb: [P, L, I, F],
    y0: c - 3,
    y1: c + 50,
  });
}
var B1t = Be(be.perforated, 0.93, 0.93, 0.92),
  Sk = It(Lt.gloss, 0.78, 0.79, 0.8),
  O1t = yn(sn.GLASS, be.stainedglass, 0.35, 0.42, 0.48),
  H1t = It(Lt.stone, 0.62, 0.62, 0.6);
function D1t(i, t) {
  let { D: e, L: s } = t,
    n = null;
  {
    let w = e.bld;
    for (let z = 0; z < w.n; z++)
      if (w.seed[z] === Hc.arena) {
        n = mr(e, z);
        break;
      }
  }
  if (!n) return;
  let o = va(n),
    a = 1e9,
    r = -1e9;
  for (let [w, z] of o) {
    let _ = s.terrainAt(w, z);
    ((a = Math.min(a, _)), (r = Math.max(r, _)));
  }
  let [l, c] = o.reduce(
      (w, z) => [w[0] + z[0] / o.length, w[1] + z[1] / o.length],
      [0, 0],
    ),
    h = (w) => o.map(([z, _]) => [l + (z - l) * w, c + (_ - c) * w]),
    f = (w) => {
      let z = [];
      for (let _ = 0; _ < w.length; _++) {
        let R = w[(_ + w.length - 1) % w.length],
          T = w[_],
          E = w[(_ + 1) % w.length],
          A = [(R[0] + T[0]) / 2, (R[1] + T[1]) / 2],
          C = [(T[0] + E[0]) / 2, (T[1] + E[1]) / 2];
        for (let P = 0; P < 1; P += 0.25)
          z.push([
            (1 - P) * (1 - P) * A[0] + 2 * P * (1 - P) * T[0] + P * P * C[0],
            (1 - P) * (1 - P) * A[1] + 2 * P * (1 - P) * T[1] + P * P * C[1],
          ]);
      }
      return z;
    },
    u = f(o),
    d = r + 0.1,
    p = d + 9,
    m = a + 34,
    g = 0;
  for (let [w, z] of o) g = Math.max(g, Math.hypot(w - l, z - c));
  let b = f(h(1 - 2.2 / g));
  ys(i, b, a - 0.5, p, O1t, { vBase: d });
  for (let w = 0; w < b.length; w += 3) {
    let [z, _] = b[w];
    Ae(i, [z, a, _], [z, p, _], 0.07, Sk, 4);
  }
  (xa(i, u, p, Sk), ys(i, u, p - 0.6, p, Sk));
  for (let w = 0, z = p; z < m - 1.6; w++, z += 2.4)
    ys(i, f(h(1 - (0.3 / g) * (w % 2))), z, z + 2.25, B1t, { vBase: z });
  (ys(i, f(h(1 - 0.8 / g)), m - 1.6, m - 0.9, bn(0.9, 0.95, 1)),
    ys(i, u, m - 0.9, m, Sk),
    xa(i, f(h(0.97)), m, H1t));
  let x = [];
  for (let [w, z] of o) x.push(w, z);
  let v = 1e9,
    y = -1e9,
    M = 1e9,
    S = -1e9;
  for (let [w, z] of o)
    ((v = Math.min(v, w)),
      (y = Math.max(y, w)),
      (M = Math.min(M, z)),
      (S = Math.max(S, z)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(x),
    bb: [v, M, y, S],
    y0: a - 3,
    y1: m + 2,
  });
}
function O$(i, t, e) {
  let s = new Map(),
    n = (a) => {
      let r = s.get(a);
      return (r || s.set(a, (r = new Ce())), r);
    };
  for (let [a, r] of [
    [() => M1t(n("maritime"), e), "maritime"],
    [() => A1t(n("civic"), e), "civic"],
    [() => N$(n("opera"), e, Hc.opera, !0), "opera"],
    [() => N$(n("veterans"), e, Hc.veterans, !1), "veterans"],
    [() => D1t(n("arena"), e), "arena"],
  ])
    try {
      a();
    } catch (l) {
      console.error("r18:", r, l);
    }
  let o = (a) => {
    for (let [r, l] of s) gn(a, l, t.lm, "R18_" + r);
  };
  qd() ? mb(() => o(i.rc?.group || i.group)) : o(i.group);
}
var Ja = {
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
