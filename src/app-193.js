// app 193 — math
// Lines 108228-108563 of readable/app.pretty.js (statement-aligned).
function e1t(i, t, e) {
  let { L: s } = t,
    n = Ho,
    o = n.court,
    a = n.stair,
    r = (A, C, P) => {
      let I = n.at(A, C);
      return [I[0], P, I[1]];
    },
    l = [n.e[0], 0, n.e[1]],
    c = [n.n[0], 0, n.n[1]],
    h = (A) => [-A[0], 0, -A[2]],
    f = 0,
    u = 0;
  for (let [A, C] of [
    [-20, -12],
    [-30, -19],
    [-14, -8],
  ]) {
    let P = n.at(A - 3, C - 3),
      I = s.probe(P[0], P[1]);
    I.walk && ((f += I.walk.y), u++);
  }
  f = u ? f / u : 11.2;
  let d = f - 4.6,
    p = (A, C) => {
      let P = n.at(A, C);
      return Math.max(f + 0.03, s.terrainAt(P[0], P[1]) + 0.12);
    },
    m = (A, C, P) => A > P.e0 && A < P.e1 && C > P.n0 && C < P.n1;
  for (let A = o.e0; A < o.e1; A += 1.5)
    for (let C = o.n0; C < o.n1; C += 1.5) {
      let P = Math.min(o.e1, A + 1.5),
        I = Math.min(o.n1, C + 1.5),
        L =
          Math.abs((A - o.e0) % 4.5) < 0.01 ||
          Math.abs((C - o.n0) % 4.5) < 0.01;
      ne(
        i,
        [r(A, C, d), r(P, C, d), r(P, I, d), r(A, I, d)],
        L ? ip : m$,
        [0, 1, 0],
        (F) => [F[0] * 3, F[2] * 3],
      );
    }
  for (let A = -63; A < -10.5; A += 1)
    for (let C = -22; C < 13; C += 1) {
      let P = A + 0.5,
        I = C + 0.5;
      if (m(P, I, o) || m(P, I, a)) continue;
      let L = [
          [A, C],
          [A + 1, C],
          [A + 1, C + 1],
          [A, C + 1],
        ],
        F = L.filter(([N, B]) => n.inside(N, B)).length;
      !F ||
        (F < 4 && !n.inside(P, I)) ||
        (ne(
          i,
          L.map(([N, B]) => r(N, B, p(N, B))),
          t1t,
          [0, 1, 0],
          (N) => [N[0] * 3, N[2] * 3],
        ),
        F === 4 &&
          (Math.round(A) % 6 === 0 &&
            ne(
              i,
              [
                r(A, C, p(A, C) + 0.006),
                r(A + 0.35, C, p(A, C) + 0.006),
                r(A + 0.35, C + 1, p(A, C + 1) + 0.006),
                r(A, C + 1, p(A, C + 1) + 0.006),
              ],
              ip,
              [0, 1, 0],
              (N) => [N[0], N[2]],
            ),
          Math.round(C) % 6 === 0 &&
            ne(
              i,
              [
                r(A, C, p(A, C) + 0.007),
                r(A + 1, C, p(A + 1, C) + 0.007),
                r(A + 1, C + 0.35, p(A + 1, C) + 0.007),
                r(A, C + 0.35, p(A, C) + 0.007),
              ],
              ip,
              [0, 1, 0],
              (N) => [N[0], N[2]],
            )));
    }
  let g = (A, C, P) =>
      Array.from({ length: P + 1 }, (I, L) => [
        A[0] + ((C[0] - A[0]) * L) / P,
        A[1] + ((C[1] - A[1]) * L) / P,
      ]),
    b = (A, C) => {
      for (let P = 0; P + 1 < A.length; P++) {
        let [I, L] = A[P],
          [F, N] = A[P + 1];
        ne(
          i,
          [
            r(I, L, d - 0.1),
            r(F, N, d - 0.1),
            r(F, N, p(F, N)),
            r(I, L, p(I, L)),
          ],
          RP,
          C,
          (B) => [B[0] + B[2], B[1]],
        );
      }
    };
  (b(g([o.e0, o.n0], [o.e1, o.n0], 12), c),
    b(g([o.e0, o.n1], [o.e1, o.n1], 12), h(c)),
    b(g([o.e0, o.n0], [o.e0, o.n1], 8), l),
    b(
      [
        [o.e1, o.n0],
        [o.e1, a.n0],
      ],
      h(l),
    ),
    b(
      [
        [o.e1, a.n1],
        [o.e1, o.n1],
      ],
      h(l),
    ));
  let x = p(a.e1, (a.n0 + a.n1) / 2),
    v = Math.max(8, Math.round((x - d) / 0.17));
  for (let A = 0; A < v; A++) {
    let C = a.e1 - ((a.e1 - a.e0) * A) / v,
      P = a.e1 - ((a.e1 - a.e0) * (A + 1)) / v,
      I = x + ((d - x) * (A + 1)) / v,
      L = x + ((d - x) * A) / v;
    (ne(
      i,
      [r(C, a.n0, I), r(P, a.n0, I), r(P, a.n1, I), r(C, a.n1, I)],
      ip,
      [0, 1, 0],
      (F) => [F[0], F[2]],
    ),
      ne(
        i,
        [r(C, a.n0, I), r(C, a.n1, I), r(C, a.n1, L), r(C, a.n0, L)],
        RP,
        h(l),
      ));
  }
  for (let [A, C] of [
    [a.n0, c],
    [a.n1, h(c)],
  ]) {
    let P = g([a.e1, A], [a.e0, A], 6);
    for (let I = 0; I + 1 < P.length; I++) {
      let [L] = P[I],
        [F] = P[I + 1],
        N = x + ((d - x) * (a.e1 - L)) / (a.e1 - a.e0),
        B = x + ((d - x) * (a.e1 - F)) / (a.e1 - a.e0);
      ne(
        i,
        [
          r(L, A, N - 0.05),
          r(F, A, B - 0.05),
          r(F, A, p(F, A)),
          r(L, A, p(L, A)),
        ],
        RP,
        C,
        (H) => [H[0] + H[2], H[1]],
      );
    }
  }
  let y = [
    [a.e1, a.n1],
    [o.e1, a.n1],
    [o.e1, o.n1],
    [o.e0, o.n1],
    [o.e0, o.n0],
    [o.e1, o.n0],
    [o.e1, a.n0],
    [a.e1, a.n0],
  ];
  for (let A = 0; A + 1 < y.length; A++) {
    let [C, P] = y[A],
      [I, L] = y[A + 1],
      F = Math.max(1, Math.round(Math.hypot(I - C, L - P) / 3));
    for (let N = 0; N < F; N++) {
      let B = [C + ((I - C) * N) / F, P + ((L - P) * N) / F],
        H = [C + ((I - C) * (N + 1)) / F, P + ((L - P) * (N + 1)) / F],
        O = r(B[0], B[1], p(B[0], B[1])),
        D = r(H[0], H[1], p(H[0], H[1]));
      (Ae(i, [O[0], O[1] + 0.25, O[2]], [D[0], D[1] + 0.25, D[2]], 0.22, ip, 4),
        xk(
          i,
          [
            [O[0], O[1] + 0.45, O[2]],
            [D[0], D[1] + 0.45, D[2]],
          ],
          0.75,
          Db,
          1.6,
        ));
    }
  }
  {
    let A = (o.e0 + o.e1) / 2,
      C = 6.5,
      P = o.n0 + 0.03,
      I = d + 3.2;
    ne(
      i,
      [r(A - C, P, d), r(A + C, P, d), r(A + C, P, I), r(A - C, P, I)],
      It(Lt.glass, 0.05, 0.06, 0.07),
      c,
    );
    for (let F = A - C; F <= A + C + 0.01; F += 1.625) {
      let N = n.at(F, P + 0.04);
      ra(i, N, n.e, n.n, 0.05, 0.05, d, I, Db);
    }
    (ne(
      i,
      [
        r(A - C + 1, P + 0.06, d + 0.3),
        r(A + C - 1, P + 0.06, d + 0.3),
        r(A + C - 1, P + 0.06, d + 2.4),
        r(A - C + 1, P + 0.06, d + 2.4),
      ],
      bn(0.55, 0.5, 0.42),
      c,
    ),
      ra(i, n.at(A, P + 1.3), n.e, n.n, C + 0.4, 1.3, I + 0.1, I + 0.35, Db, {
        bottom: !0,
      }));
    let L = n.at(A, P + 2.62);
    (ra(i, L, n.e, n.n, 1.6, 0.04, I + 0.4, I + 1.1, p$),
      CP(
        i,
        "BART",
        [L[0] + n.n[0] * 0.09, I + 0.52, L[1] + n.n[1] * 0.09],
        [n.e[0], n.e[1]],
        c,
        0.46,
        LP,
        0.07,
      ));
  }
  for (let [A, C] of [
    [-50, -8],
    [-50, 1.5],
    [-41, 1.5],
    [-34, -8],
    [-34, 1.5],
  ]) {
    let P = n.at(A, C);
    (ra(i, P, n.e, n.n, 0.9, 0.9, d, d + 0.5, ip),
      e.inst.push({
        kind: "tree",
        x: P[0],
        y: d + 0.5,
        z: P[1],
        rot: A * 1.7,
        scale: 1.05,
      }));
  }
  let M = It(Lt.matte, 0.75, 0.06, 0.05),
    S = It(Lt.matte, 0.85, 0.84, 0.8),
    w = It(Lt.metal, 0.12, 0.3, 0.18);
  for (let [A, C] of [
    [-45, -3],
    [-38, -3],
    [-42, -9],
    [-45, 3],
    [-37, 3.2],
  ]) {
    let [P, I] = n.at(A, C);
    Ae(i, [P, d, I], [P, d + 2.3, I], 0.03, Db, 4);
    for (let L = 0; L < 8; L++) {
      let F = (L / 8) * Math.PI * 2,
        N = ((L + 1) / 8) * Math.PI * 2,
        B = 1.25;
      ne(
        i,
        [
          [P, d + 2.55, I],
          [P + Math.cos(F) * B, d + 2.1, I + Math.sin(F) * B],
          [P + Math.cos(N) * B, d + 2.1, I + Math.sin(N) * B],
        ],
        L % 2 ? M : S,
        [0, 1, 0],
      );
    }
    (ql(i, P, d + 0.74, I, 0.45, 10, w),
      Ae(i, [P, d, I], [P, d + 0.74, I], 0.04, w, 4));
    for (let L = 0; L < 3; L++) {
      let F = L * 2.1 + A,
        N = P + Math.cos(F) * 0.85,
        B = I + Math.sin(F) * 0.85;
      (ra(
        i,
        [N, B],
        [Math.cos(F), Math.sin(F)],
        [-Math.sin(F), Math.cos(F)],
        0.22,
        0.22,
        d + 0.44,
        d + 0.48,
        w,
      ),
        Ae(i, [N, d, B], [N, d + 0.44, B], 0.02, w, 4));
    }
  }
  let z = n.poly.map(([A, C]) => n.at(A, C)),
    _ = 1e9,
    R = -1e9,
    T = 1e9,
    E = -1e9;
  for (let [A, C] of z)
    ((_ = Math.min(_, A)),
      (R = Math.max(R, A)),
      (T = Math.min(T, C)),
      (E = Math.max(E, C)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(z.flat()),
    bb: [_, T, R, E],
    y0: d - 2,
    y1: f + 3,
  });
}
