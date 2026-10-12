// app 200 — math
// Lines 110257-110567 of readable/app.pretty.js (statement-aligned).
function A1t(i, t) {
  let { L: e } = t,
    s = Hc.civic,
    n = Hc.dome,
    o = s[s.length - 1],
    a = s[s.length - 2],
    r = [o[0] - a[0], o[1] - a[1]];
  {
    let S = Math.hypot(r[0], r[1]);
    r = [r[0] / S, r[1] / S];
  }
  r[1] < 0 && (r = [-r[0], -r[1]]);
  let l = [-r[1], r[0]][0] > 0 ? [-r[1], r[0]] : [r[1], -r[0]],
    c = (n[0] - a[0]) * r[0] + (n[1] - a[1]) * r[1],
    h = [a[0] + r[0] * c, a[1] + r[1] * c],
    f = (S, w) => [
      (S - h[0]) * l[0] + (w - h[1]) * l[1],
      (S - h[0]) * r[0] + (w - h[1]) * r[1],
    ],
    u = 0,
    d = 0,
    p = 0;
  for (let [S, w] of s) {
    let [z, _] = f(S, w);
    ((u = Math.max(u, z)), (d = Math.min(d, _)), (p = Math.max(p, _)));
  }
  let m = 16,
    g = (S, w) => [h[0] + l[0] * S + r[0] * w, h[1] + l[1] * S + r[1] * w],
    b = (S, w) => e.terrainAt(S, w),
    x = (S, w) => S > 8 && S < 66 && Math.abs(w) > m && Math.abs(w) < m + 30,
    v = (S, w) =>
      S > 74 &&
      S < u - 10 &&
      Math.abs(w) > m + 6 &&
      Math.abs(w) < Math.max(-d, p) - 8,
    y = (S, w) => T1t(s, S, w);
  (L$(
    i,
    e,
    h,
    l,
    r,
    -2,
    u + 2,
    d - 2,
    p + 2,
    3,
    (S, w, z, _) => y(z, _) && !v(S, w),
    S1t,
  ),
    L$(
      i,
      e,
      h,
      l,
      r,
      -2,
      u + 2,
      d - 2,
      p + 2,
      3,
      (S, w, z, _) => y(z, _) && v(S, w),
      _1t,
      0.08,
    ));
  for (let S of [-1, 1])
    for (let w = 2; w < u - 4; w += 8) {
      let z = g(w, S * m),
        _ = g(w + 6, S * m),
        R = g(w + 6, S * (m - 0.5)),
        T = g(w, S * (m - 0.5)),
        E = [z, _, R, T].map(([A, C]) => [A, b(A, C) + 0.14, C]);
      ne(i, S > 0 ? E : E.slice().reverse(), k1t, [0, 1, 0], (A) => [
        A[0],
        A[2],
      ]);
    }
  for (let S of [-1, 1]) {
    let w = S * (m + 3),
      z = S * (m + 27);
    for (let C = 11; C < 64; C += 6)
      for (let P = 0; P < 5; P++) {
        let I = w + ((z - w) * P) / 4,
          [L, F] = g(C, I),
          N = b(L, F);
        (Ae(i, [L, N, F], [L, N + 3.3, F], 0.2, P$, 6),
          Oe(
            i,
            L,
            F,
            [
              [0.32, N + 3.2],
              [0.42, N + 3.6],
              [0.2, N + 3.9],
            ],
            6,
            P$,
          ),
          t.colliders.push({
            t: "circ",
            x: L,
            z: F,
            r: 0.25,
            y0: N - 1,
            y1: N + 4,
          }));
      }
    let _ = 8,
      R = 67,
      T = Math.min(w, z) - 3 * Math.sign(S) * 0 - 2.5,
      E = Math.max(w, z) + 2.5,
      A = b(...g(38, S * (m + 15)));
    for (let C = _; C < R; C += 3.7)
      for (let P = T; P < E; P += 3.6) {
        let I = Math.abs(Math.sin(C * 12.99 + P * 78.23) * 43758.5) % 1,
          L = g(C + 1.85, P + 1.8);
        Ze(
          i,
          L[0] - 1.85,
          A + 3.7 + I * 0.3,
          L[1] - 1.8,
          L[0] + 1.85,
          A + 6.4 + I * 0.5,
          L[1] + 1.8,
          z1t,
        );
      }
  }
  let M = [
    [0.7, 0.1, 0.12],
    [0.1, 0.2, 0.55],
    [0.95, 0.8, 0.2],
    [0.85, 0.85, 0.85],
    [0.15, 0.45, 0.25],
    [0.8, 0.35, 0.1],
  ];
  for (let S of [-1, 1])
    for (let w = 0; w < 6; w++) {
      let z = S * (m + 2 + w * 9),
        [_, R] = g(5, z),
        T = b(_, R);
      Oe(
        i,
        _,
        R,
        [
          [0.16, T],
          [0.13, T + 1],
          [0.07, T + 18],
          [0.12, T + 18.2],
          [0.01, T + 18.4],
        ],
        8,
        E1t,
      );
      let E = M[(w + (S > 0 ? 3 : 0)) % 6],
        A = It(Lt.matte, ...E),
        C = [r[0] * 0.2 + l[0] * 0.98, r[1] * 0.2 + l[1] * 0.98];
      (ne(
        i,
        [
          [_, T + 15.6, R],
          [_ + C[0] * 3.6, T + 15.6, R + C[1] * 3.6],
          [_ + C[0] * 3.6, T + 17.8, R + C[1] * 3.6],
          [_, T + 17.8, R],
        ],
        A,
        [-C[1], 0, C[0]],
      ),
        ne(
          i,
          [
            [_, T + 17.8, R],
            [_ + C[0] * 3.6, T + 17.8, R + C[1] * 3.6],
            [_ + C[0] * 3.6, T + 15.6, R + C[1] * 3.6],
            [_, T + 15.6, R],
          ],
          A,
          [C[1], 0, -C[0]],
        ),
        t.colliders.push({
          t: "circ",
          x: _,
          z: R,
          r: 0.2,
          y0: T - 1,
          y1: T + 18,
        }));
    }
  for (let S of [-1, 1])
    for (let w = u + 22; w < u + 190; w += 9)
      for (let [z, _] of [
        [S * 9, !1],
        [S * 13.5, !0],
      ]) {
        if (_ && Math.round((w - u) / 9) % 2) continue;
        let [R, T] = g(w, z),
          E = b(R, T);
        if (!(e.surfaceAt(R, T) === "road" || e.surfaceAt(R, T) === "walk")) {
          if (_) {
            (t.inst.push({
              kind: "tree",
              sp: "tree0",
              x: R,
              y: E,
              z: T,
              rot: w,
              scale: 0.85,
            }),
              t.colliders.push({
                t: "circ",
                x: R,
                z: T,
                r: 0.3,
                y0: E - 1,
                y1: E + 6,
              }));
            continue;
          }
          (Oe(
            i,
            R,
            T,
            [
              [0.2, E],
              [0.16, E + 0.4],
              [0.12, E + 3.6],
            ],
            8,
            C$,
          ),
            Oe(
              i,
              R,
              T,
              [
                [0.01, E + 3.5],
                [0.38, E + 3.85],
                [0.42, E + 4.2],
                [0.3, E + 4.55],
                [0.01, E + 4.65],
              ],
              10,
              bn(1, 0.95, 0.85),
            ),
            t.colliders.push({
              t: "circ",
              x: R,
              z: T,
              r: 0.2,
              y0: E - 1,
              y1: E + 4.6,
            }));
        }
      }
  for (let S of [-1, 1])
    for (let w = 76; w < u - 6; w += 14) {
      let [z, _] = g(w, S * (m - 1.5)),
        R = b(z, _);
      (Oe(
        i,
        z,
        _,
        [
          [0.12, R],
          [0.08, R + 0.5],
          [0.06, R + 4.2],
        ],
        6,
        C$,
      ),
        Oe(
          i,
          z,
          _,
          [
            [0.01, R + 4.1],
            [0.3, R + 4.25],
            [0.32, R + 4.6],
            [0.01, R + 4.8],
          ],
          8,
          bn(1, 0.9, 0.75),
        ),
        t.colliders.push({
          t: "circ",
          x: z,
          z: _,
          r: 0.15,
          y0: R - 1,
          y1: R + 4.5,
        }));
    }
}
var Gb = Be(be.granite, 0.97, 0.95, 0.9),
  R1t = Be(be.granite, 0.8, 0.78, 0.74),
  P1t = yn(sn.WIN, be.granite, 1, 0.98, 0.93),
  I$ = Be(be.slate, 0.24, 0.26, 0.27),
  DP = It(Lt.matte, 0.045, 0.045, 0.05),
  C1t = It(Lt.matte, 0.62, 0.6, 0.55),
  L1t = It(Lt.matte, 0.3, 0.29, 0.27),
  F$ = [
    [0.62, 0.08, 0.06],
    [0.85, 0.42, 0.08],
    [0.06, 0.4, 0.42],
    [0.5, 0.1, 0.3],
  ].map((i) => It(Lt.matte, ...i)),
  I1t = Be(be.granite, 1.06, 1.04, 0.99),
  F1t = It(Lt.matte, 0.075, 0.072, 0.068),
  aEt = It(Lt.gloss, 0.06, 0.05, 0.04),
  N1t = Be(be.stucco, 0.8, 0.79, 0.75);
