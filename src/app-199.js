// app 199 — math
// Lines 110513-110823 of readable/app.pretty.js (statement-aligned).
function Qgt(o, t) {
  let { L: e } = t,
    s = mh.civic,
    n = mh.dome,
    i = s[s.length - 1],
    a = s[s.length - 2],
    r = [i[0] - a[0], i[1] - a[1]];
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
    let [_, z] = f(S, w);
    ((u = Math.max(u, _)), (d = Math.min(d, z)), (p = Math.max(p, z)));
  }
  let m = 16,
    g = (S, w) => [h[0] + l[0] * S + r[0] * w, h[1] + l[1] * S + r[1] * w],
    b = (S, w) => e.terrainAt(S, w),
    v = (S, w) => S > 8 && S < 66 && Math.abs(w) > m && Math.abs(w) < m + 30,
    x = (S, w) =>
      S > 74 &&
      S < u - 10 &&
      Math.abs(w) > m + 6 &&
      Math.abs(w) < Math.max(-d, p) - 8,
    y = (S, w) => Zgt(s, S, w);
  (OK(
    o,
    e,
    h,
    l,
    r,
    -2,
    u + 2,
    d - 2,
    p + 2,
    3,
    (S, w, _, z) => y(_, z) && !x(S, w),
    $gt,
  ),
    OK(
      o,
      e,
      h,
      l,
      r,
      -2,
      u + 2,
      d - 2,
      p + 2,
      3,
      (S, w, _, z) => y(_, z) && x(S, w),
      Kgt,
      0.08,
    ));
  for (let S of [-1, 1])
    for (let w = 2; w < u - 4; w += 8) {
      let _ = g(w, S * m),
        z = g(w + 6, S * m),
        A = g(w + 6, S * (m - 0.5)),
        T = g(w, S * (m - 0.5)),
        E = [_, z, A, T].map(([R, P]) => [R, b(R, P) + 0.14, P]);
      oe(o, S > 0 ? E : E.slice().reverse(), Xgt, [0, 1, 0], (R) => [
        R[0],
        R[2],
      ]);
    }
  for (let S of [-1, 1]) {
    let w = S * (m + 3),
      _ = S * (m + 27);
    for (let P = 11; P < 64; P += 6)
      for (let C = 0; C < 5; C++) {
        let I = w + ((_ - w) * C) / 4,
          [L, F] = g(P, I),
          O = b(L, F);
        (Ce(o, [L, O, F], [L, O + 3.3, F], 0.2, IK, 6),
          qe(
            o,
            L,
            F,
            [
              [0.32, O + 3.2],
              [0.42, O + 3.6],
              [0.2, O + 3.9],
            ],
            6,
            IK,
          ),
          t.colliders.push({
            t: "circ",
            x: L,
            z: F,
            r: 0.25,
            y0: O - 1,
            y1: O + 4,
          }));
      }
    let z = 8,
      A = 67,
      T = Math.min(w, _) - 3 * Math.sign(S) * 0 - 2.5,
      E = Math.max(w, _) + 2.5,
      R = b(...g(38, S * (m + 15)));
    for (let P = z; P < A; P += 3.7)
      for (let C = T; C < E; C += 3.6) {
        let I = Math.abs(Math.sin(P * 12.99 + C * 78.23) * 43758.5) % 1,
          L = g(P + 1.85, C + 1.8);
        ss(
          o,
          L[0] - 1.85,
          R + 3.7 + I * 0.3,
          L[1] - 1.8,
          L[0] + 1.85,
          R + 6.4 + I * 0.5,
          L[1] + 1.8,
          Ygt,
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
      let _ = S * (m + 2 + w * 9),
        [z, A] = g(5, _),
        T = b(z, A);
      qe(
        o,
        z,
        A,
        [
          [0.16, T],
          [0.13, T + 1],
          [0.07, T + 18],
          [0.12, T + 18.2],
          [0.01, T + 18.4],
        ],
        8,
        Jgt,
      );
      let E = M[(w + (S > 0 ? 3 : 0)) % 6],
        R = Lt(Ct.matte, ...E),
        P = [r[0] * 0.2 + l[0] * 0.98, r[1] * 0.2 + l[1] * 0.98];
      (oe(
        o,
        [
          [z, T + 15.6, A],
          [z + P[0] * 3.6, T + 15.6, A + P[1] * 3.6],
          [z + P[0] * 3.6, T + 17.8, A + P[1] * 3.6],
          [z, T + 17.8, A],
        ],
        R,
        [-P[1], 0, P[0]],
      ),
        oe(
          o,
          [
            [z, T + 17.8, A],
            [z + P[0] * 3.6, T + 17.8, A + P[1] * 3.6],
            [z + P[0] * 3.6, T + 15.6, A + P[1] * 3.6],
            [z, T + 15.6, A],
          ],
          R,
          [P[1], 0, -P[0]],
        ),
        t.colliders.push({
          t: "circ",
          x: z,
          z: A,
          r: 0.2,
          y0: T - 1,
          y1: T + 18,
        }));
    }
  for (let S of [-1, 1])
    for (let w = u + 22; w < u + 190; w += 9)
      for (let [_, z] of [
        [S * 9, !1],
        [S * 13.5, !0],
      ]) {
        if (z && Math.round((w - u) / 9) % 2) continue;
        let [A, T] = g(w, _),
          E = b(A, T);
        if (!(e.surfaceAt(A, T) === "road" || e.surfaceAt(A, T) === "walk")) {
          if (z) {
            (t.inst.push({
              kind: "tree",
              sp: "tree0",
              x: A,
              y: E,
              z: T,
              rot: w,
              scale: 0.85,
            }),
              t.colliders.push({
                t: "circ",
                x: A,
                z: T,
                r: 0.3,
                y0: E - 1,
                y1: E + 6,
              }));
            continue;
          }
          (qe(
            o,
            A,
            T,
            [
              [0.2, E],
              [0.16, E + 0.4],
              [0.12, E + 3.6],
            ],
            8,
            FK,
          ),
            qe(
              o,
              A,
              T,
              [
                [0.01, E + 3.5],
                [0.38, E + 3.85],
                [0.42, E + 4.2],
                [0.3, E + 4.55],
                [0.01, E + 4.65],
              ],
              10,
              wn(1, 0.95, 0.85),
            ),
            t.colliders.push({
              t: "circ",
              x: A,
              z: T,
              r: 0.2,
              y0: E - 1,
              y1: E + 4.6,
            }));
        }
      }
  for (let S of [-1, 1])
    for (let w = 76; w < u - 6; w += 14) {
      let [_, z] = g(w, S * (m - 1.5)),
        A = b(_, z);
      (qe(
        o,
        _,
        z,
        [
          [0.12, A],
          [0.08, A + 0.5],
          [0.06, A + 4.2],
        ],
        6,
        FK,
      ),
        qe(
          o,
          _,
          z,
          [
            [0.01, A + 4.1],
            [0.3, A + 4.25],
            [0.32, A + 4.6],
            [0.01, A + 4.8],
          ],
          8,
          wn(1, 0.9, 0.75),
        ),
        t.colliders.push({
          t: "circ",
          x: _,
          z,
          r: 0.15,
          y0: A - 1,
          y1: A + 4.5,
        }));
    }
}
var Tx = We(we.granite, 0.97, 0.95, 0.9),
  tbt = We(we.granite, 0.8, 0.78, 0.74),
  ebt = Tn(ln.WIN, we.granite, 1, 0.98, 0.93),
  BK = We(we.slate, 0.24, 0.26, 0.27),
  gL = Lt(Ct.matte, 0.045, 0.045, 0.05),
  sbt = Lt(Ct.matte, 0.62, 0.6, 0.55),
  nbt = Lt(Ct.matte, 0.3, 0.29, 0.27),
  NK = [
    [0.62, 0.08, 0.06],
    [0.85, 0.42, 0.08],
    [0.06, 0.4, 0.42],
    [0.5, 0.1, 0.3],
  ].map((o) => Lt(Ct.matte, ...o)),
  ibt = We(we.granite, 1.06, 1.04, 0.99),
  obt = Lt(Ct.matte, 0.075, 0.072, 0.068),
  c7t = Lt(Ct.gloss, 0.06, 0.05, 0.04),
  abt = We(we.stucco, 0.8, 0.79, 0.75);
