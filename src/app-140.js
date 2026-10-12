// app 140 — math
// Lines 91176-91703 of readable/app.pretty.js (statement-aligned).
function qq(i, t, e) {
  let { L: s } = e,
    n = new Ce(),
    o = 1e9;
  for (let [E, A] of al) o = Math.min(o, s.driveHeight(E, A));
  let a = o;
  for (let [E, A] of [
    [300, 1925],
    [360, 1880],
    [420, 1880],
    [380, 1940],
  ])
    a = Math.max(a, s.terrainAt(E, A));
  o = Math.min(o, a);
  let r = (E) => o + E,
    l = (E) => a + E,
    c = Vd.home,
    h = [Vd.cf[0] - c[0], Vd.cf[1] - c[1]],
    f = Math.hypot(...h);
  ((h[0] /= f), (h[1] /= f));
  let u = (E, A) => {
      let C = E - c[0],
        P = A - c[1],
        I = Math.hypot(C, P) || 1;
      return (
        (Math.acos(Math.max(-1, Math.min(1, (C * h[0] + P * h[1]) / I))) *
          180) /
        Math.PI
      );
    },
    d = (E, A, C) => {
      let P = Math.max(0, Math.min(1, (C - E) / (A - E)));
      return P * P * (3 - 2 * P);
    },
    p = (E) => 7.5 + 19 * d(38, 62, E) + 10 * d(110, 150, E),
    m = (E) => 11 + 22 * d(38, 62, E) + 10 * d(110, 150, E),
    g = 0;
  for (let E = 0; E < al.length; E++) {
    let A = al[E],
      C = al[(E + 1) % al.length];
    g += A[0] * C[1] - C[0] * A[1];
  }
  let b = g > 0 ? al.slice().reverse() : al.slice(),
    x = [];
  for (let E = 0; E < b.length; E++) {
    let A = b[E],
      C = b[(E + 1) % b.length],
      P = Math.max(1, Math.round(Math.hypot(C[0] - A[0], C[1] - A[1]) / 6));
    for (let I = 0; I < P; I++)
      x.push([A[0] + ((C[0] - A[0]) * I) / P, A[1] + ((C[1] - A[1]) * I) / P]);
  }
  let v = x.length,
    y = al.reduce((E, A) => E + A[0], 0) / al.length,
    M = al.reduce((E, A) => E + A[1], 0) / al.length;
  for (let E = 0; E < v; E++) {
    let A = x[E],
      C = x[(E + 1) % v];
    ne(
      n,
      [
        [y, l(0.3), M],
        [A[0], l(0.3), A[1]],
        [C[0], l(0.3), C[1]],
      ],
      Gq,
      [0, 1, 0],
    );
  }
  let S = (E) => {
      let A = (E * Math.PI) / 180,
        C = Math.cos(A),
        P = Math.sin(A);
      return [h[0] * C - h[1] * P, h[0] * P + h[1] * C];
    },
    w = (E, A, C) => {
      let P = S(E);
      return [c[0] + P[0] * A, l(C + 0.2), c[1] + P[1] * A];
    },
    z = [];
  for (let E = -50; E <= 50; E += 5) z.push(w(E, 29, 0.16));
  (ne(n, [w(0, -5, 0.16), ...z], Wq, [0, 1, 0]),
    ne(
      n,
      [w(0, 2.5, 0.2), w(-45, 25.4, 0.2), w(0, 36.3, 0.2), w(45, 25.4, 0.2)],
      Gq,
      [0, 1, 0],
    ));
  {
    let E = w(0, 18.4, 0.22),
      A = [];
    for (let C = 0; C < 12; C++) {
      let P = (C / 12) * Math.PI * 2;
      A.push([E[0] + Math.cos(P) * 2.7, l(0.46), E[2] + Math.sin(P) * 2.7]);
    }
    ne(n, A, Wq, [0, 1, 0]);
  }
  for (let E of [-45, 45]) {
    let A = S(E),
      C = [-A[1] * 0.06, A[0] * 0.06],
      P = w(E, 0, 0.21),
      I = w(E, 105, 0.21);
    ne(
      n,
      [
        [P[0] - C[0], P[1], P[2] - C[1]],
        [I[0] - C[0], I[1], I[2] - C[1]],
        [I[0] + C[0], I[1], I[2] + C[1]],
        [P[0] + C[0], P[1], P[2] + C[1]],
      ],
      B7,
      [0, 1, 0],
    );
  }
  let _ = x.map(([E, A]) => {
      let C = u(E, A);
      return { x: E, z: A, a: C, t: p(C), d: m(C) };
    }),
    R = _.map((E) => {
      let A = c[0] - E.x,
        C = c[1] - E.z,
        P = Math.hypot(A, C) || 1,
        I = Math.min(E.d, P - 30);
      return [E.x + (A / P) * I, E.z + (C / P) * I];
    });
  for (let E = 0; E < v; E++) {
    let A = (E + 1) % v,
      C = _[E],
      P = _[A],
      I = R[E],
      L = R[A],
      F = (D, U, G) => [U[0] + (D.x - U[0]) * G, U[1] + (D.z - U[1]) * G],
      N = F(C, I, 0.48),
      B = F(P, L, 0.48),
      H = [
        [I[0], l(3), I[1]],
        [L[0], l(3), L[1]],
        [B[0], r(3 + (P.t - 3) * 0.42), B[1]],
        [N[0], r(3 + (C.t - 3) * 0.42), N[1]],
      ],
      O = [
        [N[0], r(3 + (C.t - 3) * 0.48), N[1]],
        [B[0], r(3 + (P.t - 3) * 0.48), B[1]],
        [P.x, r(P.t), P.z],
        [C.x, r(C.t), C.z],
      ];
    if (
      (ne(n, H, E & 1 ? Dq : Uq, [c[0] - I[0], 3, c[1] - I[1]]),
      ne(n, [H[3], H[2], O[1], O[0]], mut, [c[0] - I[0], 1, c[1] - I[1]]),
      ne(n, O, E & 1 ? Uq : Dq, [c[0] - I[0], 3, c[1] - I[1]]),
      ne(
        n,
        [
          [I[0], l(0), I[1]],
          [L[0], l(0), L[1]],
          [L[0], l(3), L[1]],
          [I[0], l(3), I[1]],
        ],
        N7,
        [c[0] - I[0], 0, c[1] - I[1]],
      ),
      C.a > 95 && P.a > 95)
    ) {
      let D = F(C, I, 0.62),
        U = F(P, L, 0.62);
      (ne(
        n,
        [
          [C.x, r(C.t + 3.5), C.z],
          [P.x, r(P.t + 3.5), P.z],
          [U[0], r(P.t + 5), U[1]],
          [D[0], r(C.t + 5), D[1]],
        ],
        gut,
        [0, 1, 0],
      ),
        ne(
          n,
          [
            [C.x, r(C.t + 3.4), C.z],
            [P.x, r(P.t + 3.4), P.z],
            [U[0], r(P.t + 4.9), U[1]],
            [D[0], r(C.t + 4.9), D[1]],
          ],
          jl,
          [0, -1, 0],
        ),
        E % 3 === 0 &&
          Ae(
            n,
            [D[0], r(3 + (C.t - 3) * 0.6), D[1]],
            [D[0], r(C.t + 5), D[1]],
            0.18,
            jl,
            6,
          ));
    }
  }
  let T = 0;
  for (let E = 0; E < v; E++) {
    let A = _[E],
      C = _[(E + 1) % v],
      P = Math.hypot(C.x - A.x, C.z - A.z);
    if (P < 0.5) continue;
    let I = (C.x - A.x) / P,
      L = (C.z - A.z) / P,
      F = -L,
      N = I,
      B = Math.min(A.t, C.t) > 16,
      H = B ? 14 : 7.5;
    (n.wall(A.x, A.z, C.x, C.z, r(-0.5), r(-0.5), r(H), r(H), uut, T, o),
      Math.max(A.t, C.t) > H + 0.1 &&
        n.wall(A.x, A.z, C.x, C.z, r(H), r(H), r(A.t), r(C.t), jl, T, o));
    let O = (G, q, W) => [A.x + I * G + F * W, r(q), A.z + L * G + N * W],
      D = (G) =>
        ne(
          n,
          [
            O(0, G, 0.12),
            O(P, G, 0.12),
            O(P, G + 0.55, 0.12),
            O(0, G + 0.55, 0.12),
          ],
          F7,
          [F, 0, N],
        );
    (D(H - 0.55), B && D(7));
    let U = (G, q, W, V) => {
      let Y = [O(G - q / 2, W, 0.06), O(G + q / 2, W, 0.06)];
      for (let $ = 0; $ <= 8; $++) {
        let st = ($ / 8) * Math.PI;
        Y.push(
          O(G + (Math.cos(st) * q) / 2, W + V + (Math.sin(st) * q) / 2, 0.06),
        );
      }
      ne(n, Y, put, [F, 0, N]);
    };
    if (
      (P > 3.5 &&
        (U(P / 2, Math.min(3.6, P - 1.6), 0, B ? 4.6 : 4.2),
        B && U(P / 2, Math.min(2.8, P - 2.2), 8.4, 3)),
      Math.max(A.t, C.t) > H + 2)
    )
      for (let G of [H + 4.5, H + 9])
        G < Math.min(A.t, C.t) - 0.5 &&
          ne(
            n,
            [
              O(0, G, 0.1),
              O(P, G, 0.1),
              O(P, G + 0.3, 0.1),
              O(0, G + 0.3, 0.1),
            ],
            N7,
            [F, 0, N],
          );
    T += P;
  }
  {
    let E = [226, 1918],
      A = 6.5;
    Ze(n, E[0] - A, r(-0.5), E[1] - A, E[0] + A, r(34), E[1] + A, dut);
    for (let C of [14, 28])
      Ze(
        n,
        E[0] - A - 0.3,
        r(C),
        E[1] - A - 0.3,
        E[0] + A + 0.3,
        r(C + 0.8),
        E[1] + A + 0.3,
        F7,
      );
    (Ze(
      n,
      E[0] - A - 0.5,
      r(34),
      E[1] - A - 0.5,
      E[0] + A + 0.5,
      r(35.2),
      E[1] + A + 0.5,
      F7,
    ),
      Oe(
        n,
        E[0],
        E[1],
        [
          [A * 0.95, r(35.2)],
          [A * 0.5, r(39)],
          [0.3, r(41.5)],
        ],
        4,
        N7,
      ),
      Ae(n, [E[0], r(41), E[1]], [E[0], r(49), E[1]], 0.08, B7, 6));
    for (let [C, P] of [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]) {
      let I = [];
      for (let L = 0; L < 16; L++) {
        let F = (L / 16) * Math.PI * 2;
        I.push([
          E[0] + C * (A + 0.08) + (P ? Math.cos(F) * 2.1 : 0),
          r(31 + Math.sin(F) * 2.1),
          E[1] + P * (A + 0.08) + (C ? Math.cos(F) * 2.1 : 0),
        ]);
      }
      ne(n, I, OS(0.95, 0.93, 0.85), [C, 0, P]);
    }
    e.colliders.push({
      t: "box",
      x0: E[0] - A,
      z0: E[1] - A,
      x1: E[0] + A,
      z1: E[1] + A,
    });
  }
  for (let [E, A, C] of fut) {
    let P = c[0] - E,
      I = c[1] - A,
      L = Math.hypot(P, I) || 1,
      F = P / L,
      N = I / L,
      B = -N,
      H = F,
      O = p(u(E, A)),
      D = 0.9,
      U = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([q, W]) => [E + B * q * D + F * W * D, A + H * q * D + N * W * D]);
    for (let [q, W] of U)
      Ae(n, [q, r(O - 2), W], [q, r(C - 6), W], 0.12, jl, 5);
    for (let q = O; q < C - 7; q += 5)
      for (let W = 0; W < 4; W++) {
        let V = U[W],
          Y = U[(W + 1) % 4];
        Ae(n, [V[0], r(q), V[1]], [Y[0], r(q + 5), Y[1]], 0.05, jl, 4);
      }
    let G = (q, W, V) => [E + B * q + F * V, r(W), A + H * q + N * V];
    (ne(
      n,
      [
        G(-5.5, C - 7, 0.6),
        G(5.5, C - 7, 0.6),
        G(5.5, C, 1.6),
        G(-5.5, C, 1.6),
      ],
      jl,
      [-F, 0, -N],
    ),
      ne(
        n,
        [
          G(-5.5, C - 7, 0.7),
          G(5.5, C - 7, 0.7),
          G(5.5, C, 1.7),
          G(-5.5, C, 1.7),
        ],
        jl,
        [F, 0.3, N],
      ));
    for (let q = 0; q < 4; q++)
      for (let W = 0; W < 7; W++) {
        let V = -4.8 + W * 1.6,
          Y = C - 6.3 + q * 1.6,
          $ = 0.75 + (Y - C + 7) / 7;
        ne(
          n,
          [
            G(V - 0.6, Y, $ + 0.05),
            G(V + 0.6, Y, $ + 0.05),
            G(V + 0.6, Y + 1.1, $ + 0.2),
            G(V - 0.6, Y + 1.1, $ + 0.2),
          ],
          yut,
          [F, 0.3, N],
        );
      }
  }
  {
    let E = [469, 1893],
      A = c[0] - E[0],
      C = c[1] - E[1],
      P = Math.hypot(A, C),
      I = A / P,
      L = C / P,
      F = -L,
      N = I,
      B = (H, O, D) => [E[0] + F * H + I * D, r(O), E[1] + N * H + L * D];
    for (let H of [-9, 9])
      Ae(
        n,
        [E[0] + F * H, r(0), E[1] + N * H],
        [E[0] + F * H, r(14), E[1] + N * H],
        0.7,
        jl,
        6,
      );
    (ne(
      n,
      [B(-17, 13, 1.6), B(17, 13, 1.6), B(17, 31, 1.6), B(-17, 31, 1.6)],
      jl,
      [I, 0, L],
    ),
      ne(
        n,
        [B(-17, 13, -1.6), B(17, 13, -1.6), B(17, 31, -1.6), B(-17, 31, -1.6)],
        jl,
        [-I, 0, -L],
      ));
    for (let H of [-17, 17])
      ne(
        n,
        [B(H, 13, -1.6), B(H, 13, 1.6), B(H, 31, 1.6), B(H, 31, -1.6)],
        jl,
        [F * Math.sign(H), 0, N * Math.sign(H)],
      );
    (ne(
      n,
      [B(-17, 31, -1.6), B(17, 31, -1.6), B(17, 31, 1.6), B(-17, 31, 1.6)],
      jl,
      [0, 1, 0],
    ),
      ne(
        n,
        [
          B(-15.5, 15, 1.7),
          B(15.5, 15, 1.7),
          B(15.5, 27.5, 1.7),
          B(-15.5, 27.5, 1.7),
        ],
        but,
        [I, 0, L],
      ),
      ne(
        n,
        [
          B(-15.5, 28.2, 1.7),
          B(15.5, 28.2, 1.7),
          B(15.5, 30.2, 1.7),
          B(-15.5, 30.2, 1.7),
        ],
        bn(0.95, 0.75, 0.35),
        [I, 0, L],
      ));
  }
  {
    let [E, A] = [440, 1822];
    Oe(
      n,
      E,
      A,
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
      xut,
    );
    let C = [
        [3.2, 6],
        [3.6, 8],
        [3.4, 13],
        [3.7, 17],
        [3, 21],
      ],
      P = (F) => {
        for (let N = 1; N < C.length; N++)
          if (F <= C[N][1])
            return (
              C[N - 1][0] +
              ((C[N][0] - C[N - 1][0]) * (F - C[N - 1][1])) /
                (C[N][1] - C[N - 1][1])
            );
        return 3;
      };
    for (let F of [10.5, 15.5])
      Oe(
        n,
        E,
        A,
        [
          [P(F) + 0.09, r(F)],
          [P(F + 0.9) + 0.09, r(F + 0.9)],
        ],
        20,
        B7,
      );
    let [I, L] = [418, 1806];
    Oe(
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
      vut,
      { rf: (F, N) => F * (1 + 0.12 * Math.cos(N * 4)) },
    );
  }
  (e.colliders.push({
    t: "poly",
    pts: Float32Array.from(al.flat()),
    bb: [204, 1752, 500, 2020],
    y0: o - 2,
    y1: o + 40,
  }),
    gn(i.group, n, t.lm, "OraclePark"));
}
