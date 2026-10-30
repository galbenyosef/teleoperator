// app 190 — math
// Lines 108050-108348 of readable/app.pretty.js (statement-aligned).
function ygt(o, t) {
  let { L: e } = t;
  for (let s of bz) {
    let n = s.rec;
    if (!n) continue;
    let i = n.rings[0],
      a = n.base,
      r = n.top,
      l = [];
    for (let F = 0; F < i.length; F += 2) l.push([i[F], i[F + 1]]);
    let c = a - 0.4,
      h = Math.max(a + 15, r - 1);
    (Ss(o, l, c, h, mgt, { vBase: a - 0.2 }),
      Ta(o, l, h + 0.05, Lt(Ct.stone, 0.32, 0.31, 0.3)));
    let f = 0,
      u = 1e9;
    l.forEach((F, O) => {
      let B = Math.hypot(F[0] - lK[0], F[1] - lK[1]);
      B < u && ((u = B), (f = O));
    });
    let d = l[f],
      p = l[(f + 1) % l.length],
      m = l[(f + l.length - 1) % l.length],
      g = [p[0] - d[0], p[1] - d[1]],
      b = Math.hypot(...g),
      v = [m[0] - d[0], m[1] - d[1]],
      x = Math.hypot(...v),
      y = [g[0] / b, g[1] / b],
      M = [v[0] / x, v[1] / x];
    for (let [F, O] of [
      [y, b],
      [M, x],
    ]) {
      let B = [-F[1], F[0]],
        H = [
          d[0] + (F[0] * O) / 2 + B[0] * 2,
          d[1] + (F[1] * O) / 2 + B[1] * 2,
        ],
        N = l.some((V) => {
          let $ = [V[0] - d[0], V[1] - d[1]];
          return $[0] * B[0] + $[1] * B[1] > 1;
        })
          ? -1
          : 1,
        D = [B[0] * N, B[1] * N],
        U = (V, $, J) => [
          d[0] + F[0] * V + D[0] * $,
          J,
          d[1] + F[1] * V + D[1] * $,
        ],
        G = (V) => {
          let $ = U(V, 2.5, 0);
          return e.driveHeight($[0], $[2]);
        };
      for (let V = 1.2; V + 3.8 < O; V += 5.2) {
        let $ = G(V + 2),
          J = Math.max(c + 0.4, $);
        (oe(
          o,
          [
            U(V, 0.09, J + 0.3),
            U(V + 3.6, 0.09, J + 0.3),
            U(V + 3.6, 0.09, J + 3.1),
            U(V, 0.09, J + 3.1),
          ],
          xgt,
          [D[0], 0, D[1]],
        ),
          oe(
            o,
            [
              U(V + 0.3, 0.15, J + 2.4),
              U(V + 3.3, 0.15, J + 2.4),
              U(V + 3.3, 0.15, J + 2.9),
              U(V + 0.3, 0.15, J + 2.9),
            ],
            vgt,
            [D[0], 0, D[1]],
          ),
          oe(
            o,
            [
              U(V - 0.1, 0.06, J + 3.2),
              U(V + 3.7, 0.06, J + 3.2),
              U(V + 3.7, 1.5, J + 2.8),
              U(V - 0.1, 1.5, J + 2.8),
            ],
            ph,
            [D[0], 1, D[1]],
          ));
      }
      oe(
        o,
        [
          U(0, 0.22, a + 3.6),
          U(O, 0.22, a + 3.6),
          U(O, 0.22, a + 4),
          U(0, 0.22, a + 4),
        ],
        ph,
        [D[0], 0, D[1]],
      );
      for (let V = 1; V < s.floors; V++) {
        let $ = a + 4 + (V - 1) * 3.4 + 0.65;
        for (let J = 6; J + 3 < O - 1; J += 7.8)
          (ba(
            o,
            [U(J + 1.5, 0.45, 0)[0], U(J + 1.5, 0.45, 0)[2]],
            F,
            D,
            1.6,
            0.45,
            $ - 0.12,
            $,
            ph,
          ),
            xz(o, [U(J - 0.1, 0.88, $), U(J + 3.1, 0.88, $)], 0.95, ph, 0.5));
      }
      let W = h - 1.2;
      (oe(
        o,
        [U(0, 0, W + 0.7), U(O, 0, W + 0.7), U(O, 1.3, W), U(0, 1.3, W)],
        mK,
        [D[0], 1.6, D[1]],
        (V) => [V[0] + V[2], V[1] * 3],
      ),
        oe(
          o,
          [
            U(0, 0, W + 0.6),
            U(O, 0, W + 0.6),
            U(O, 1.3, W - 0.1),
            U(0, 1.3, W - 0.1),
          ],
          ph,
          [-D[0], -1.6, -D[1]],
        ),
        oe(
          o,
          [
            U(0, 1.3, W),
            U(O, 1.3, W),
            U(O, 1.3, W - 0.25),
            U(0, 1.3, W - 0.25),
          ],
          ph,
          [D[0], 0, D[1]],
        ));
      for (let V = 0.6; V < O; V += 1.6)
        ba(
          o,
          [U(V, 0.6, 0)[0], U(V, 0.6, 0)[2]],
          F,
          D,
          0.08,
          0.6,
          W - 0.6,
          W + 0.15,
          cK,
        );
      oe(
        o,
        [
          U(0, 0.06, h - 0.15),
          U(O, 0.06, h - 0.15),
          U(O, 0.06, h + 0.9),
          U(0, 0.06, h + 0.9),
        ],
        cK,
        [D[0], 0, D[1]],
        (V) => [V[0] + V[2], (V[1] - h) * 1.6],
      );
    }
    for (let F = 0; F < l.length; F++) {
      let O = l[F],
        B = l[(F + 1) % l.length];
      (o.wall(O[0], O[1], B[0], B[1], h, h, h + 0.9, h + 0.9, iL),
        o.wall(B[0], B[1], O[0], O[1], h, h, h + 0.9, h + 0.9, iL));
    }
    let S = 3.4,
      w = [d[0] + (y[0] + M[0]) * (S - 0.2), d[1] + (y[1] + M[1]) * (S - 0.2)],
      _ = Math.atan2(y[1], y[0]),
      z = [
        [-S, -S],
        [S, -S],
        [S, S],
        [-S, S],
      ].map(([F, O]) => [
        w[0] + Math.cos(_) * F - Math.sin(_) * O,
        w[1] + Math.sin(_) * F + Math.cos(_) * O,
      ]),
      A = h + 3.6;
    Ss(o, z, h - 2, A, iL);
    let T = oL(o, w[0], w[1], _, S + 1.6, A, 1.7, 0.9),
      E = z.map(([F, O]) => [
        w[0] + (F - w[0]) * 0.72,
        w[1] + (O - w[1]) * 0.72,
      ]);
    (Ss(o, E, T - 0.4, T + 2.6, ph),
      oe(
        o,
        E.map(([F, O]) => [F, T + 1.2, O]),
        hK,
        [0, 1, 0],
      ),
      (T = oL(o, w[0], w[1], _, S * 0.72 + 1.3, T + 2.6, 1.5, 0.8)));
    let R = z.map(([F, O]) => [
      w[0] + (F - w[0]) * 0.45,
      w[1] + (O - w[1]) * 0.45,
    ]);
    (Ss(o, R, T - 0.3, T + 1.8, ph),
      (T = oL(o, w[0], w[1], _, S * 0.45 + 1, T + 1.8, 2.2, 0.7, 0.05)),
      qe(
        o,
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
        bgt,
      ));
    for (let [F, O] of [
      [y, 1],
      [M, 1],
    ]) {
      let B = [-F[1], F[0]],
        H = B[0] * (w[0] - d[0]) + B[1] * (w[1] - d[1]) > 0 ? -1 : 1,
        N = [B[0] * H, B[1] * H],
        D = [w[0] + N[0] * (S + 0.09), w[1] + N[1] * (S + 0.09)];
      (oe(
        o,
        [
          [D[0] - F[0] * 1.3, h + 0.6, D[1] - F[1] * 1.3],
          [D[0] + F[0] * 1.3, h + 0.6, D[1] + F[1] * 1.3],
          [D[0] + F[0] * 1.3, h + 2.9, D[1] + F[1] * 1.3],
          [D[0] - F[0] * 1.3, h + 2.9, D[1] - F[1] * 1.3],
        ],
        ph,
        [N[0], 0, N[1]],
      ),
        oe(
          o,
          [
            [
              D[0] - F[0] * 1 + N[0] * 0.07,
              h + 0.8,
              D[1] - F[1] * 1 + N[1] * 0.07,
            ],
            [
              D[0] + F[0] * 1 + N[0] * 0.07,
              h + 0.8,
              D[1] + F[1] * 1 + N[1] * 0.07,
            ],
            [
              D[0] + F[0] * 1 + N[0] * 0.07,
              h + 2.6,
              D[1] + F[1] * 1 + N[1] * 0.07,
            ],
            [
              D[0] - F[0] * 1 + N[0] * 0.07,
              h + 2.6,
              D[1] - F[1] * 1 + N[1] * 0.07,
            ],
          ],
          hK,
          [N[0], 0, N[1]],
        ));
    }
    let P = 1e9,
      C = -1e9,
      I = 1e9,
      L = -1e9;
    for (let [F, O] of l)
      ((P = Math.min(P, F)),
        (C = Math.max(C, F)),
        (I = Math.min(I, O)),
        (L = Math.max(L, O)));
    t.colliders.push({
      t: "poly",
      pts: Float32Array.from(l.flat()),
      bb: [P, I, C, L],
      y0: a - 3,
      y1: h + 8,
    });
  }
}
var fK = We(we.granite, 0.62, 0.6, 0.58),
  uK = We(we.polgranite, 0.55, 0.54, 0.53),
  _x = Lt(Ct.metal, 0.62, 0.63, 0.64),
  gK = Lt(Ct.gloss, 0.12, 0.12, 0.13),
  wgt = (o) => Lt(Ct.stone, 0.42 * o, 0.41 * o, 0.4 * o),
  bK = wn(0.02, 0.3, 0.75),
  cL = wn(0.95, 0.95, 0.92),
  Mgt = wn(0.8, 0.08, 0.05);
