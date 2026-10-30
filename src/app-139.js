// app 139 — math
// Lines 91444-91971 of readable/app.pretty.js (statement-aligned).
function jj(o, t, e) {
  let { L: s } = e,
    n = new Be(),
    i = 1e9;
  for (let [E, R] of Tl) i = Math.min(i, s.driveHeight(E, R));
  let a = i;
  for (let [E, R] of [
    [300, 1925],
    [360, 1880],
    [420, 1880],
    [380, 1940],
  ])
    a = Math.max(a, s.terrainAt(E, R));
  i = Math.min(i, a);
  let r = (E) => i + E,
    l = (E) => a + E,
    c = kp.home,
    h = [kp.cf[0] - c[0], kp.cf[1] - c[1]],
    f = Math.hypot(...h);
  ((h[0] /= f), (h[1] /= f));
  let u = (E, R) => {
      let P = E - c[0],
        C = R - c[1],
        I = Math.hypot(P, C) || 1;
      return (
        (Math.acos(Math.max(-1, Math.min(1, (P * h[0] + C * h[1]) / I))) *
          180) /
        Math.PI
      );
    },
    d = (E, R, P) => {
      let C = Math.max(0, Math.min(1, (P - E) / (R - E)));
      return C * C * (3 - 2 * C);
    },
    p = (E) => 7.5 + 19 * d(38, 62, E) + 10 * d(110, 150, E),
    m = (E) => 11 + 22 * d(38, 62, E) + 10 * d(110, 150, E),
    g = 0;
  for (let E = 0; E < Tl.length; E++) {
    let R = Tl[E],
      P = Tl[(E + 1) % Tl.length];
    g += R[0] * P[1] - P[0] * R[1];
  }
  let b = g > 0 ? Tl.slice().reverse() : Tl.slice(),
    v = [];
  for (let E = 0; E < b.length; E++) {
    let R = b[E],
      P = b[(E + 1) % b.length],
      C = Math.max(1, Math.round(Math.hypot(P[0] - R[0], P[1] - R[1]) / 6));
    for (let I = 0; I < C; I++)
      v.push([R[0] + ((P[0] - R[0]) * I) / C, R[1] + ((P[1] - R[1]) * I) / C]);
  }
  let x = v.length,
    y = Tl.reduce((E, R) => E + R[0], 0) / Tl.length,
    M = Tl.reduce((E, R) => E + R[1], 0) / Tl.length;
  for (let E = 0; E < x; E++) {
    let R = v[E],
      P = v[(E + 1) % x];
    oe(
      n,
      [
        [y, l(0.3), M],
        [R[0], l(0.3), R[1]],
        [P[0], l(0.3), P[1]],
      ],
      Wj,
      [0, 1, 0],
    );
  }
  let S = (E) => {
      let R = (E * Math.PI) / 180,
        P = Math.cos(R),
        C = Math.sin(R);
      return [h[0] * P - h[1] * C, h[0] * C + h[1] * P];
    },
    w = (E, R, P) => {
      let C = S(E);
      return [c[0] + C[0] * R, l(P + 0.2), c[1] + C[1] * R];
    },
    _ = [];
  for (let E = -50; E <= 50; E += 5) _.push(w(E, 29, 0.16));
  (oe(n, [w(0, -5, 0.16), ..._], qj, [0, 1, 0]),
    oe(
      n,
      [w(0, 2.5, 0.2), w(-45, 25.4, 0.2), w(0, 36.3, 0.2), w(45, 25.4, 0.2)],
      Wj,
      [0, 1, 0],
    ));
  {
    let E = w(0, 18.4, 0.22),
      R = [];
    for (let P = 0; P < 12; P++) {
      let C = (P / 12) * Math.PI * 2;
      R.push([E[0] + Math.cos(C) * 2.7, l(0.46), E[2] + Math.sin(C) * 2.7]);
    }
    oe(n, R, qj, [0, 1, 0]);
  }
  for (let E of [-45, 45]) {
    let R = S(E),
      P = [-R[1] * 0.06, R[0] * 0.06],
      C = w(E, 0, 0.21),
      I = w(E, 105, 0.21);
    oe(
      n,
      [
        [C[0] - P[0], C[1], C[2] - P[1]],
        [I[0] - P[0], I[1], I[2] - P[1]],
        [I[0] + P[0], I[1], I[2] + P[1]],
        [C[0] + P[0], C[1], C[2] + P[1]],
      ],
      pC,
      [0, 1, 0],
    );
  }
  let z = v.map(([E, R]) => {
      let P = u(E, R);
      return { x: E, z: R, a: P, t: p(P), d: m(P) };
    }),
    A = z.map((E) => {
      let R = c[0] - E.x,
        P = c[1] - E.z,
        C = Math.hypot(R, P) || 1,
        I = Math.min(E.d, C - 30);
      return [E.x + (R / C) * I, E.z + (P / C) * I];
    });
  for (let E = 0; E < x; E++) {
    let R = (E + 1) % x,
      P = z[E],
      C = z[R],
      I = A[E],
      L = A[R],
      F = (D, U, G) => [U[0] + (D.x - U[0]) * G, U[1] + (D.z - U[1]) * G],
      O = F(P, I, 0.48),
      B = F(C, L, 0.48),
      H = [
        [I[0], l(3), I[1]],
        [L[0], l(3), L[1]],
        [B[0], r(3 + (C.t - 3) * 0.42), B[1]],
        [O[0], r(3 + (P.t - 3) * 0.42), O[1]],
      ],
      N = [
        [O[0], r(3 + (P.t - 3) * 0.48), O[1]],
        [B[0], r(3 + (C.t - 3) * 0.48), B[1]],
        [C.x, r(C.t), C.z],
        [P.x, r(P.t), P.z],
      ];
    if (
      (oe(n, H, E & 1 ? Gj : Vj, [c[0] - I[0], 3, c[1] - I[1]]),
      oe(n, [H[3], H[2], N[1], N[0]], B1t, [c[0] - I[0], 1, c[1] - I[1]]),
      oe(n, N, E & 1 ? Vj : Gj, [c[0] - I[0], 3, c[1] - I[1]]),
      oe(
        n,
        [
          [I[0], l(0), I[1]],
          [L[0], l(0), L[1]],
          [L[0], l(3), L[1]],
          [I[0], l(3), I[1]],
        ],
        dC,
        [c[0] - I[0], 0, c[1] - I[1]],
      ),
      P.a > 95 && C.a > 95)
    ) {
      let D = F(P, I, 0.62),
        U = F(C, L, 0.62);
      (oe(
        n,
        [
          [P.x, r(P.t + 3.5), P.z],
          [C.x, r(C.t + 3.5), C.z],
          [U[0], r(C.t + 5), U[1]],
          [D[0], r(P.t + 5), D[1]],
        ],
        N1t,
        [0, 1, 0],
      ),
        oe(
          n,
          [
            [P.x, r(P.t + 3.4), P.z],
            [C.x, r(C.t + 3.4), C.z],
            [U[0], r(C.t + 4.9), U[1]],
            [D[0], r(P.t + 4.9), D[1]],
          ],
          uc,
          [0, -1, 0],
        ),
        E % 3 === 0 &&
          Ce(
            n,
            [D[0], r(3 + (P.t - 3) * 0.6), D[1]],
            [D[0], r(P.t + 5), D[1]],
            0.18,
            uc,
            6,
          ));
    }
  }
  let T = 0;
  for (let E = 0; E < x; E++) {
    let R = z[E],
      P = z[(E + 1) % x],
      C = Math.hypot(P.x - R.x, P.z - R.z);
    if (C < 0.5) continue;
    let I = (P.x - R.x) / C,
      L = (P.z - R.z) / C,
      F = -L,
      O = I,
      B = Math.min(R.t, P.t) > 16,
      H = B ? 14 : 7.5;
    (n.wall(R.x, R.z, P.x, P.z, r(-0.5), r(-0.5), r(H), r(H), I1t, T, i),
      Math.max(R.t, P.t) > H + 0.1 &&
        n.wall(R.x, R.z, P.x, P.z, r(H), r(H), r(R.t), r(P.t), uc, T, i));
    let N = (G, W, V) => [R.x + I * G + F * V, r(W), R.z + L * G + O * V],
      D = (G) =>
        oe(
          n,
          [
            N(0, G, 0.12),
            N(C, G, 0.12),
            N(C, G + 0.55, 0.12),
            N(0, G + 0.55, 0.12),
          ],
          uC,
          [F, 0, O],
        );
    (D(H - 0.55), B && D(7));
    let U = (G, W, V, $) => {
      let J = [N(G - W / 2, V, 0.06), N(G + W / 2, V, 0.06)];
      for (let X = 0; X <= 8; X++) {
        let tt = (X / 8) * Math.PI;
        J.push(
          N(G + (Math.cos(tt) * W) / 2, V + $ + (Math.sin(tt) * W) / 2, 0.06),
        );
      }
      oe(n, J, O1t, [F, 0, O]);
    };
    if (
      (C > 3.5 &&
        (U(C / 2, Math.min(3.6, C - 1.6), 0, B ? 4.6 : 4.2),
        B && U(C / 2, Math.min(2.8, C - 2.2), 8.4, 3)),
      Math.max(R.t, P.t) > H + 2)
    )
      for (let G of [H + 4.5, H + 9])
        G < Math.min(R.t, P.t) - 0.5 &&
          oe(
            n,
            [
              N(0, G, 0.1),
              N(C, G, 0.1),
              N(C, G + 0.3, 0.1),
              N(0, G + 0.3, 0.1),
            ],
            dC,
            [F, 0, O],
          );
    T += C;
  }
  {
    let E = [226, 1918],
      R = 6.5;
    ss(n, E[0] - R, r(-0.5), E[1] - R, E[0] + R, r(34), E[1] + R, F1t);
    for (let P of [14, 28])
      ss(
        n,
        E[0] - R - 0.3,
        r(P),
        E[1] - R - 0.3,
        E[0] + R + 0.3,
        r(P + 0.8),
        E[1] + R + 0.3,
        uC,
      );
    (ss(
      n,
      E[0] - R - 0.5,
      r(34),
      E[1] - R - 0.5,
      E[0] + R + 0.5,
      r(35.2),
      E[1] + R + 0.5,
      uC,
    ),
      qe(
        n,
        E[0],
        E[1],
        [
          [R * 0.95, r(35.2)],
          [R * 0.5, r(39)],
          [0.3, r(41.5)],
        ],
        4,
        dC,
      ),
      Ce(n, [E[0], r(41), E[1]], [E[0], r(49), E[1]], 0.08, pC, 6));
    for (let [P, C] of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      let I = [];
      for (let L = 0; L < 16; L++) {
        let F = (L / 16) * Math.PI * 2;
        I.push([
          E[0] + P * (R + 0.08) + (C ? Math.cos(F) * 2.1 : 0),
          r(31 + Math.sin(F) * 2.1),
          E[1] + C * (R + 0.08) + (P ? Math.cos(F) * 2.1 : 0),
        ]);
      }
      oe(n, I, Hk(0.95, 0.93, 0.85), [P, 0, C]);
    }
    e.colliders.push({
      t: "box",
      x0: E[0] - R,
      z0: E[1] - R,
      x1: E[0] + R,
      z1: E[1] + R,
    });
  }
  for (let [E, R, P] of L1t) {
    let C = c[0] - E,
      I = c[1] - R,
      L = Math.hypot(C, I) || 1,
      F = C / L,
      O = I / L,
      B = -O,
      H = F,
      N = p(u(E, R)),
      D = 0.9,
      U = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([W, V]) => [E + B * W * D + F * V * D, R + H * W * D + O * V * D]);
    for (let [W, V] of U)
      Ce(n, [W, r(N - 2), V], [W, r(P - 6), V], 0.12, uc, 5);
    for (let W = N; W < P - 7; W += 5)
      for (let V = 0; V < 4; V++) {
        let $ = U[V],
          J = U[(V + 1) % 4];
        Ce(n, [$[0], r(W), $[1]], [J[0], r(W + 5), J[1]], 0.05, uc, 4);
      }
    let G = (W, V, $) => [E + B * W + F * $, r(V), R + H * W + O * $];
    (oe(
      n,
      [
        G(-5.5, P - 7, 0.6),
        G(5.5, P - 7, 0.6),
        G(5.5, P, 1.6),
        G(-5.5, P, 1.6),
      ],
      uc,
      [-F, 0, -O],
    ),
      oe(
        n,
        [
          G(-5.5, P - 7, 0.7),
          G(5.5, P - 7, 0.7),
          G(5.5, P, 1.7),
          G(-5.5, P, 1.7),
        ],
        uc,
        [F, 0.3, O],
      ));
    for (let W = 0; W < 4; W++)
      for (let V = 0; V < 7; V++) {
        let $ = -4.8 + V * 1.6,
          J = P - 6.3 + W * 1.6,
          X = 0.75 + (J - P + 7) / 7;
        oe(
          n,
          [
            G($ - 0.6, J, X + 0.05),
            G($ + 0.6, J, X + 0.05),
            G($ + 0.6, J + 1.1, X + 0.2),
            G($ - 0.6, J + 1.1, X + 0.2),
          ],
          G1t,
          [F, 0.3, O],
        );
      }
  }
  {
    let E = [469, 1893],
      R = c[0] - E[0],
      P = c[1] - E[1],
      C = Math.hypot(R, P),
      I = R / C,
      L = P / C,
      F = -L,
      O = I,
      B = (H, N, D) => [E[0] + F * H + I * D, r(N), E[1] + O * H + L * D];
    for (let H of [-9, 9])
      Ce(
        n,
        [E[0] + F * H, r(0), E[1] + O * H],
        [E[0] + F * H, r(14), E[1] + O * H],
        0.7,
        uc,
        6,
      );
    (oe(
      n,
      [B(-17, 13, 1.6), B(17, 13, 1.6), B(17, 31, 1.6), B(-17, 31, 1.6)],
      uc,
      [I, 0, L],
    ),
      oe(
        n,
        [B(-17, 13, -1.6), B(17, 13, -1.6), B(17, 31, -1.6), B(-17, 31, -1.6)],
        uc,
        [-I, 0, -L],
      ));
    for (let H of [-17, 17])
      oe(
        n,
        [B(H, 13, -1.6), B(H, 13, 1.6), B(H, 31, 1.6), B(H, 31, -1.6)],
        uc,
        [F * Math.sign(H), 0, O * Math.sign(H)],
      );
    (oe(
      n,
      [B(-17, 31, -1.6), B(17, 31, -1.6), B(17, 31, 1.6), B(-17, 31, 1.6)],
      uc,
      [0, 1, 0],
    ),
      oe(
        n,
        [
          B(-15.5, 15, 1.7),
          B(15.5, 15, 1.7),
          B(15.5, 27.5, 1.7),
          B(-15.5, 27.5, 1.7),
        ],
        H1t,
        [I, 0, L],
      ),
      oe(
        n,
        [
          B(-15.5, 28.2, 1.7),
          B(15.5, 28.2, 1.7),
          B(15.5, 30.2, 1.7),
          B(-15.5, 30.2, 1.7),
        ],
        wn(0.95, 0.75, 0.35),
        [I, 0, L],
      ));
  }
  {
    let [E, R] = [440, 1822];
    qe(
      n,
      E,
      R,
      [
        [3.2, r(6)],
        [3.6, r(8)],
        [3.4, r(13)],
        [3.7, r(17)],
        [3, r(21)],
        [1.6, r(25)],
        [1.1, r(28.5)],
        [1.25, r(29.2)],
        [0.9, r(29.6)],
      ],
      20,
      D1t,
    );
    let P = [
        [3.2, 6],
        [3.6, 8],
        [3.4, 13],
        [3.7, 17],
        [3, 21],
      ],
      C = (F) => {
        for (let O = 1; O < P.length; O++)
          if (F <= P[O][1])
            return (
              P[O - 1][0] +
              ((P[O][0] - P[O - 1][0]) * (F - P[O - 1][1])) /
                (P[O][1] - P[O - 1][1])
            );
        return 3;
      };
    for (let F of [10.5, 15.5])
      qe(
        n,
        E,
        R,
        [
          [C(F) + 0.09, r(F)],
          [C(F + 0.9) + 0.09, r(F + 0.9)],
        ],
        20,
        pC,
      );
    let [I, L] = [418, 1806];
    qe(
      n,
      I,
      L,
      [
        [0.5, r(6)],
        [4.6, r(8.5)],
        [5.4, r(12)],
        [5, r(16)],
        [3.8, r(19)],
        [1.2, r(21)],
      ],
      14,
      U1t,
      { rf: (F, O) => F * (1 + 0.12 * Math.cos(O * 4)) },
    );
  }
  (e.colliders.push({
    t: "poly",
    pts: Float32Array.from(Tl.flat()),
    bb: [204, 1752, 500, 2020],
    y0: i - 2,
    y1: i + 40,
  }),
    vn(o.group, n, t.lm, "OraclePark"));
}
