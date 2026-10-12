// app 191 — math
// Lines 107794-108092 of readable/app.pretty.js (statement-aligned).
function Ypt(i, t) {
  let { L: e } = t;
  for (let s of bk) {
    let n = s.rec;
    if (!n) continue;
    let o = n.rings[0],
      a = n.base,
      r = n.top,
      l = [];
    for (let F = 0; F < o.length; F += 2) l.push([o[F], o[F + 1]]);
    let c = a - 0.4,
      h = Math.max(a + 15, r - 1);
    (ys(i, l, c, h, jpt, { vBase: a - 0.2 }),
      xa(i, l, h + 0.05, It(Lt.stone, 0.32, 0.31, 0.3)));
    let f = 0,
      u = 1e9;
    l.forEach((F, N) => {
      let B = Math.hypot(F[0] - o$[0], F[1] - o$[1]);
      B < u && ((u = B), (f = N));
    });
    let d = l[f],
      p = l[(f + 1) % l.length],
      m = l[(f + l.length - 1) % l.length],
      g = [p[0] - d[0], p[1] - d[1]],
      b = Math.hypot(...g),
      x = [m[0] - d[0], m[1] - d[1]],
      v = Math.hypot(...x),
      y = [g[0] / b, g[1] / b],
      M = [x[0] / v, x[1] / v];
    for (let [F, N] of [
      [y, b],
      [M, v],
    ]) {
      let B = [-F[1], F[0]],
        H = [
          d[0] + (F[0] * N) / 2 + B[0] * 2,
          d[1] + (F[1] * N) / 2 + B[1] * 2,
        ],
        O = l.some((W) => {
          let V = [W[0] - d[0], W[1] - d[1]];
          return V[0] * B[0] + V[1] * B[1] > 1;
        })
          ? -1
          : 1,
        D = [B[0] * O, B[1] * O],
        U = (W, V, Y) => [
          d[0] + F[0] * W + D[0] * V,
          Y,
          d[1] + F[1] * W + D[1] * V,
        ],
        G = (W) => {
          let V = U(W, 2.5, 0);
          return e.driveHeight(V[0], V[2]);
        };
      for (let W = 1.2; W + 3.8 < N; W += 5.2) {
        let V = G(W + 2),
          Y = Math.max(c + 0.4, V);
        (ne(
          i,
          [
            U(W, 0.09, Y + 0.3),
            U(W + 3.6, 0.09, Y + 0.3),
            U(W + 3.6, 0.09, Y + 3.1),
            U(W, 0.09, Y + 3.1),
          ],
          Xpt,
          [D[0], 0, D[1]],
        ),
          ne(
            i,
            [
              U(W + 0.3, 0.15, Y + 2.4),
              U(W + 3.3, 0.15, Y + 2.4),
              U(W + 3.3, 0.15, Y + 2.9),
              U(W + 0.3, 0.15, Y + 2.9),
            ],
            Kpt,
            [D[0], 0, D[1]],
          ),
          ne(
            i,
            [
              U(W - 0.1, 0.06, Y + 3.2),
              U(W + 3.7, 0.06, Y + 3.2),
              U(W + 3.7, 1.5, Y + 2.8),
              U(W - 0.1, 1.5, Y + 2.8),
            ],
            Oc,
            [D[0], 1, D[1]],
          ));
      }
      ne(
        i,
        [
          U(0, 0.22, a + 3.6),
          U(N, 0.22, a + 3.6),
          U(N, 0.22, a + 4),
          U(0, 0.22, a + 4),
        ],
        Oc,
        [D[0], 0, D[1]],
      );
      for (let W = 1; W < s.floors; W++) {
        let V = a + 4 + (W - 1) * 3.4 + 0.65;
        for (let Y = 6; Y + 3 < N - 1; Y += 7.8)
          (ra(
            i,
            [U(Y + 1.5, 0.45, 0)[0], U(Y + 1.5, 0.45, 0)[2]],
            F,
            D,
            1.6,
            0.45,
            V - 0.12,
            V,
            Oc,
          ),
            xk(i, [U(Y - 0.1, 0.88, V), U(Y + 3.1, 0.88, V)], 0.95, Oc, 0.5));
      }
      let q = h - 1.2;
      (ne(
        i,
        [U(0, 0, q + 0.7), U(N, 0, q + 0.7), U(N, 1.3, q), U(0, 1.3, q)],
        u$,
        [D[0], 1.6, D[1]],
        (W) => [W[0] + W[2], W[1] * 3],
      ),
        ne(
          i,
          [
            U(0, 0, q + 0.6),
            U(N, 0, q + 0.6),
            U(N, 1.3, q - 0.1),
            U(0, 1.3, q - 0.1),
          ],
          Oc,
          [-D[0], -1.6, -D[1]],
        ),
        ne(
          i,
          [
            U(0, 1.3, q),
            U(N, 1.3, q),
            U(N, 1.3, q - 0.25),
            U(0, 1.3, q - 0.25),
          ],
          Oc,
          [D[0], 0, D[1]],
        ));
      for (let W = 0.6; W < N; W += 1.6)
        ra(
          i,
          [U(W, 0.6, 0)[0], U(W, 0.6, 0)[2]],
          F,
          D,
          0.08,
          0.6,
          q - 0.6,
          q + 0.15,
          a$,
        );
      ne(
        i,
        [
          U(0, 0.06, h - 0.15),
          U(N, 0.06, h - 0.15),
          U(N, 0.06, h + 0.9),
          U(0, 0.06, h + 0.9),
        ],
        a$,
        [D[0], 0, D[1]],
        (W) => [W[0] + W[2], (W[1] - h) * 1.6],
      );
    }
    for (let F = 0; F < l.length; F++) {
      let N = l[F],
        B = l[(F + 1) % l.length];
      (i.wall(N[0], N[1], B[0], B[1], h, h, h + 0.9, h + 0.9, TP),
        i.wall(B[0], B[1], N[0], N[1], h, h, h + 0.9, h + 0.9, TP));
    }
    let S = 3.4,
      w = [d[0] + (y[0] + M[0]) * (S - 0.2), d[1] + (y[1] + M[1]) * (S - 0.2)],
      z = Math.atan2(y[1], y[0]),
      _ = [
        [-S, -S],
        [S, -S],
        [S, S],
        [-S, S],
      ].map(([F, N]) => [
        w[0] + Math.cos(z) * F - Math.sin(z) * N,
        w[1] + Math.sin(z) * F + Math.cos(z) * N,
      ]),
      R = h + 3.6;
    ys(i, _, h - 2, R, TP);
    let T = AP(i, w[0], w[1], z, S + 1.6, R, 1.7, 0.9),
      E = _.map(([F, N]) => [
        w[0] + (F - w[0]) * 0.72,
        w[1] + (N - w[1]) * 0.72,
      ]);
    (ys(i, E, T - 0.4, T + 2.6, Oc),
      ne(
        i,
        E.map(([F, N]) => [F, T + 1.2, N]),
        r$,
        [0, 1, 0],
      ),
      (T = AP(i, w[0], w[1], z, S * 0.72 + 1.3, T + 2.6, 1.5, 0.8)));
    let A = _.map(([F, N]) => [
      w[0] + (F - w[0]) * 0.45,
      w[1] + (N - w[1]) * 0.45,
    ]);
    (ys(i, A, T - 0.3, T + 1.8, Oc),
      (T = AP(i, w[0], w[1], z, S * 0.45 + 1, T + 1.8, 2.2, 0.7, 0.05)),
      Oe(
        i,
        w[0],
        w[1],
        [
          [0.35, T - 0.1],
          [0.3, T + 0.5],
          [0.12, T + 0.9],
          [0.18, T + 1.2],
          [0.02, T + 1.9],
        ],
        8,
        $pt,
      ));
    for (let [F, N] of [
      [y, 1],
      [M, 1],
    ]) {
      let B = [-F[1], F[0]],
        H = B[0] * (w[0] - d[0]) + B[1] * (w[1] - d[1]) > 0 ? -1 : 1,
        O = [B[0] * H, B[1] * H],
        D = [w[0] + O[0] * (S + 0.09), w[1] + O[1] * (S + 0.09)];
      (ne(
        i,
        [
          [D[0] - F[0] * 1.3, h + 0.6, D[1] - F[1] * 1.3],
          [D[0] + F[0] * 1.3, h + 0.6, D[1] + F[1] * 1.3],
          [D[0] + F[0] * 1.3, h + 2.9, D[1] + F[1] * 1.3],
          [D[0] - F[0] * 1.3, h + 2.9, D[1] - F[1] * 1.3],
        ],
        Oc,
        [O[0], 0, O[1]],
      ),
        ne(
          i,
          [
            [
              D[0] - F[0] * 1 + O[0] * 0.07,
              h + 0.8,
              D[1] - F[1] * 1 + O[1] * 0.07,
            ],
            [
              D[0] + F[0] * 1 + O[0] * 0.07,
              h + 0.8,
              D[1] + F[1] * 1 + O[1] * 0.07,
            ],
            [
              D[0] + F[0] * 1 + O[0] * 0.07,
              h + 2.6,
              D[1] + F[1] * 1 + O[1] * 0.07,
            ],
            [
              D[0] - F[0] * 1 + O[0] * 0.07,
              h + 2.6,
              D[1] - F[1] * 1 + O[1] * 0.07,
            ],
          ],
          r$,
          [O[0], 0, O[1]],
        ));
    }
    let C = 1e9,
      P = -1e9,
      I = 1e9,
      L = -1e9;
    for (let [F, N] of l)
      ((C = Math.min(C, F)),
        (P = Math.max(P, F)),
        (I = Math.min(I, N)),
        (L = Math.max(L, N)));
    t.colliders.push({
      t: "poly",
      pts: Float32Array.from(l.flat()),
      bb: [C, I, P, L],
      y0: a - 3,
      y1: h + 8,
    });
  }
}
var l$ = Be(be.granite, 0.62, 0.6, 0.58),
  c$ = Be(be.polgranite, 0.55, 0.54, 0.53),
  Db = It(Lt.metal, 0.62, 0.63, 0.64),
  d$ = It(Lt.gloss, 0.12, 0.12, 0.13),
  Jpt = (i) => It(Lt.stone, 0.42 * i, 0.41 * i, 0.4 * i),
  p$ = bn(0.02, 0.3, 0.75),
  LP = bn(0.95, 0.95, 0.92),
  Zpt = bn(0.8, 0.08, 0.05);
