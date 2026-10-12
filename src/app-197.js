// app 197 — math
// Lines 109415-109644 of readable/app.pretty.js (statement-aligned).
function m1t(i, t) {
  let { D: e, L: s } = t,
    n = z$(e, Wy.stpat);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    r = hm(s, a, "Mission Street", 5),
    l = 1e9,
    c = -1e9;
  for (let [I, L] of o) {
    let F = s.driveHeight(I, L);
    ((l = Math.min(l, F)), (c = Math.max(c, F)));
  }
  let h = s.driveHeight(r.m[0] + r.n[0] * 2.5, r.m[1] + r.n[1] * 2.5),
    f = r.u,
    u = [-r.n[0], -r.n[1]],
    d = 1e9,
    p = -1e9,
    m = 0;
  for (let [I, L] of o) {
    let F = (I - r.m[0]) * f[0] + (L - r.m[1]) * f[1],
      N = (I - r.m[0]) * u[0] + (L - r.m[1]) * u[1];
    ((d = Math.min(d, F)), (p = Math.max(p, F)), (m = Math.max(m, N)));
  }
  let g = (d + p) / 2,
    b = (p - d) / 2,
    x = (I, L, F) => [
      r.m[0] + f[0] * (g + I) + u[0] * L,
      F,
      r.m[1] + f[1] * (g + I) + u[1] * L,
    ],
    v = h + 14,
    y = v + b * 0.85,
    M = [-r.n[0], 0, -r.n[1]],
    S = [r.n[0], 0, r.n[1]],
    w = (I) => [f[0] * I, 0, f[1] * I],
    z = [x(-b, 0, 0), x(b, 0, 0), x(b, m, 0), x(-b, m, 0)].map((I) => [
      I[0],
      I[2],
    ]);
  ys(i, z, l - 0.6, v, IP, { vBase: l });
  for (let I of [-1, 1])
    ne(
      i,
      [
        x(I * (b + 0.6), -0.6, v - 0.3),
        x(I * (b + 0.6), m + 0.6, v - 0.3),
        x(0, m + 0.6, y),
        x(0, -0.6, y),
      ],
      p1t,
      [f[0] * I, 0.9, f[1] * I],
      (L) => [L[0] + L[2], L[1] * 1.4],
    );
  for (let [I, L] of [
    [0, S],
    [m, M],
  ])
    ne(i, [x(-b, I, v), x(b, I, v), x(0, I, y)], IP, L);
  for (let I of [-1, 1]) {
    let L = (F, N, B) => x(I * b + I * F, N, B);
    for (let F = 6; F < m - 2; F += 5) {
      let N = x(I * (b + 0.35), F, 0);
      (nn(i, [N[0], N[2]], u, f, 0.45, 0.4, l - 0.4, v - 1.2, v$),
        ne(
          i,
          [
            x(I * (b + 0.76), F - 0.45, v - 1.2),
            x(I * (b + 0.76), F + 0.45, v - 1.2),
            x(I * (b + 0.01), F + 0.45, v + 0.2),
            x(I * (b + 0.01), F - 0.45, v + 0.2),
          ],
          Ub,
          [f[0] * I, 0.7, f[1] * I],
        ),
        F + 5 < m - 1 &&
          yk(
            i,
            (B, H, O) => L(0.09, H + B, O),
            w(I),
            0,
            F + 2.5,
            1.9,
            h + 3.6,
            v - 3.4,
            y$,
          ));
    }
    nn(
      i,
      [x(I * (b + 0.08), m / 2, 0)[0], x(I * (b + 0.08), m / 2, 0)[2]],
      u,
      f,
      m / 2,
      0.1,
      h + 3.3,
      h + 3.6,
      Ub,
      !0,
    );
  }
  let _ = 4.4,
    R = h + 36,
    T = x(0, _ - 0.4, 0),
    E = (I, L) => [
      T[0] + f[0] * _ * I + u[0] * _ * L,
      T[2] + f[1] * _ * I + u[1] * _ * L,
    ],
    A = [E(-1, -1), E(1, -1), E(1, 1), E(-1, 1)];
  ys(i, A, l - 0.6, R, IP, { vBase: l });
  let C = (I, L, F) => x(I, -0.4 - 0.09 - L, F);
  for (let [I, L] of [[0, S]])
    (ne(
      i,
      [C(-1.6, 0, h), C(1.6, 0, h), C(1.6, 0, h + 3.8), C(-1.6, 0, h + 3.8)],
      w$,
      L,
    ),
      yk(i, (F, N, B) => C(F, 0, B), L, 0, 0, 1.6 * 2, h + 3.8, h + 5, E$),
      yk(i, (F, N, B) => C(F, 0, B), L, 0, 0, 3, h + 9, h + 16, y$));
  let P = [
    [
      [-1, -1],
      [1, -1],
    ],
    [
      [1, -1],
      [1, 1],
    ],
    [
      [1, 1],
      [-1, 1],
    ],
    [
      [-1, 1],
      [-1, -1],
    ],
  ];
  for (let [[I, L], [F, N]] of P) {
    let B = E(I, L),
      H = E(F, N),
      O = (B[0] + H[0]) / 2,
      D = (B[1] + H[1]) / 2,
      U = (H[0] - B[0]) / (2 * _),
      G = (H[1] - B[1]) / (2 * _),
      q = -G,
      W = U;
    (O - T[0]) * q + (D - T[2]) * W < 0 && ((q = -q), (W = -W));
    let V = (Y, $, st) => [O + U * Y + q * 0.09, st, D + G * Y + W * 0.09];
    yk(i, V, [q, 0, W], 0, 0, 2.8, R - 10, R - 4.6, w$);
    for (let Y = 0; Y < 7; Y++)
      ne(
        i,
        [
          V(-1.3, 0, R - 9.6 + Y * 0.75),
          V(1.3, 0, R - 9.6 + Y * 0.75),
          [
            O + U * 1.3 + q * 0.25,
            R - 9.6 + Y * 0.75 + 0.35,
            D + G * 1.3 + W * 0.25,
          ],
          [
            O - U * 1.3 + q * 0.25,
            R - 9.6 + Y * 0.75 + 0.35,
            D - G * 1.3 + W * 0.25,
          ],
        ],
        Ub,
        [q, 0.8, W],
      );
    for (let Y = 0; Y < 5; Y++) {
      let $ = -_ + 0.9 + (Y * (2 * _ - 1.8)) / 4;
      nn(
        i,
        [O + U * $ + q * 0.15, D + G * $ + W * 0.15],
        [U, G],
        [q, W],
        0.42,
        0.35,
        R,
        R + 1.4,
        Ub,
      );
    }
    nn(
      i,
      [O + q * 0.2, D + W * 0.2],
      [U, G],
      [q, W],
      I === F ? _ - 0.15 : _ + 0.55,
      0.35,
      R - 0.6,
      R,
      Ub,
    );
  }
  for (let [I, L] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let [F, N] = E(I, L);
    (nn(i, [F, N], f, u, 0.75, 0.75, l - 0.4, R + 0.4, v$),
      Oe(
        i,
        F,
        N,
        [
          [0.7, R + 0.4],
          [0.6, R + 1.6],
          [0.45, R + 2],
          [0.32, R + 5.5],
          [0, R + 7.5],
        ],
        4,
        Ub,
      ));
  }
  (g1t(i, A, R - 0.5), NP(t, o, l - 3, y + 2));
}
function g1t(i, t, e) {
  Ua(i, t, e, It(Lt.stone, 0.25, 0.25, 0.25));
}
var b1t = Be(be.granite, 0.62, 0.6, 0.57),
  M$ = It(Lt.matte, 0.55, 0.08, 0.06),
  S$ = It(Lt.metal, 0.5, 0.5, 0.52),
  FP = It(Lt.matte, 0.3, 0.15, 0.08),
  k$ = It(Lt.matte, 0.32, 0.22, 0.14),
  x1t = It(Lt.matte, 0.22, 0.16, 0.11);
