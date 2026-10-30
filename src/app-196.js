// app 196 — math
// Lines 109671-109900 of readable/app.pretty.js (statement-aligned).
function Hgt(o, t) {
  let { D: e, L: s } = t,
    n = RK(e, Nw.stpat);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    r = Qm(s, a, "Mission Street", 5),
    l = 1e9,
    c = -1e9;
  for (let [I, L] of i) {
    let F = s.driveHeight(I, L);
    ((l = Math.min(l, F)), (c = Math.max(c, F)));
  }
  let h = s.driveHeight(r.m[0] + r.n[0] * 2.5, r.m[1] + r.n[1] * 2.5),
    f = r.u,
    u = [-r.n[0], -r.n[1]],
    d = 1e9,
    p = -1e9,
    m = 0;
  for (let [I, L] of i) {
    let F = (I - r.m[0]) * f[0] + (L - r.m[1]) * f[1],
      O = (I - r.m[0]) * u[0] + (L - r.m[1]) * u[1];
    ((d = Math.min(d, F)), (p = Math.max(p, F)), (m = Math.max(m, O)));
  }
  let g = (d + p) / 2,
    b = (p - d) / 2,
    v = (I, L, F) => [
      r.m[0] + f[0] * (g + I) + u[0] * L,
      F,
      r.m[1] + f[1] * (g + I) + u[1] * L,
    ],
    x = h + 14,
    y = x + b * 0.85,
    M = [-r.n[0], 0, -r.n[1]],
    S = [r.n[0], 0, r.n[1]],
    w = (I) => [f[0] * I, 0, f[1] * I],
    _ = [v(-b, 0, 0), v(b, 0, 0), v(b, m, 0), v(-b, m, 0)].map((I) => [
      I[0],
      I[2],
    ]);
  Ss(o, _, l - 0.6, x, hL, { vBase: l });
  for (let I of [-1, 1])
    oe(
      o,
      [
        v(I * (b + 0.6), -0.6, x - 0.3),
        v(I * (b + 0.6), m + 0.6, x - 0.3),
        v(0, m + 0.6, y),
        v(0, -0.6, y),
      ],
      Ngt,
      [f[0] * I, 0.9, f[1] * I],
      (L) => [L[0] + L[2], L[1] * 1.4],
    );
  for (let [I, L] of [
    [0, S],
    [m, M],
  ])
    oe(o, [v(-b, I, x), v(b, I, x), v(0, I, y)], hL, L);
  for (let I of [-1, 1]) {
    let L = (F, O, B) => v(I * b + I * F, O, B);
    for (let F = 6; F < m - 2; F += 5) {
      let O = v(I * (b + 0.35), F, 0);
      (cn(o, [O[0], O[2]], u, f, 0.45, 0.4, l - 0.4, x - 1.2, MK),
        oe(
          o,
          [
            v(I * (b + 0.76), F - 0.45, x - 1.2),
            v(I * (b + 0.76), F + 0.45, x - 1.2),
            v(I * (b + 0.01), F + 0.45, x + 0.2),
            v(I * (b + 0.01), F - 0.45, x + 0.2),
          ],
          Ex,
          [f[0] * I, 0.7, f[1] * I],
        ),
        F + 5 < m - 1 &&
          yz(
            o,
            (B, H, N) => L(0.09, H + B, N),
            w(I),
            0,
            F + 2.5,
            1.9,
            h + 3.6,
            x - 3.4,
            SK,
          ));
    }
    cn(
      o,
      [v(I * (b + 0.08), m / 2, 0)[0], v(I * (b + 0.08), m / 2, 0)[2]],
      u,
      f,
      m / 2,
      0.1,
      h + 3.3,
      h + 3.6,
      Ex,
      !0,
    );
  }
  let z = 4.4,
    A = h + 36,
    T = v(0, z - 0.4, 0),
    E = (I, L) => [
      T[0] + f[0] * z * I + u[0] * z * L,
      T[2] + f[1] * z * I + u[1] * z * L,
    ],
    R = [E(-1, -1), E(1, -1), E(1, 1), E(-1, 1)];
  Ss(o, R, l - 0.6, A, hL, { vBase: l });
  let P = (I, L, F) => v(I, -0.4 - 0.09 - L, F);
  for (let [I, L] of [[0, S]])
    (oe(
      o,
      [P(-1.6, 0, h), P(1.6, 0, h), P(1.6, 0, h + 3.8), P(-1.6, 0, h + 3.8)],
      kK,
      L,
    ),
      yz(o, (F, O, B) => P(F, 0, B), L, 0, 0, 1.6 * 2, h + 3.8, h + 5, AK),
      yz(o, (F, O, B) => P(F, 0, B), L, 0, 0, 3, h + 9, h + 16, SK));
  let C = [
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
  for (let [[I, L], [F, O]] of C) {
    let B = E(I, L),
      H = E(F, O),
      N = (B[0] + H[0]) / 2,
      D = (B[1] + H[1]) / 2,
      U = (H[0] - B[0]) / (2 * z),
      G = (H[1] - B[1]) / (2 * z),
      W = -G,
      V = U;
    (N - T[0]) * W + (D - T[2]) * V < 0 && ((W = -W), (V = -V));
    let $ = (J, X, tt) => [N + U * J + W * 0.09, tt, D + G * J + V * 0.09];
    yz(o, $, [W, 0, V], 0, 0, 2.8, A - 10, A - 4.6, kK);
    for (let J = 0; J < 7; J++)
      oe(
        o,
        [
          $(-1.3, 0, A - 9.6 + J * 0.75),
          $(1.3, 0, A - 9.6 + J * 0.75),
          [
            N + U * 1.3 + W * 0.25,
            A - 9.6 + J * 0.75 + 0.35,
            D + G * 1.3 + V * 0.25,
          ],
          [
            N - U * 1.3 + W * 0.25,
            A - 9.6 + J * 0.75 + 0.35,
            D - G * 1.3 + V * 0.25,
          ],
        ],
        Ex,
        [W, 0.8, V],
      );
    for (let J = 0; J < 5; J++) {
      let X = -z + 0.9 + (J * (2 * z - 1.8)) / 4;
      cn(
        o,
        [N + U * X + W * 0.15, D + G * X + V * 0.15],
        [U, G],
        [W, V],
        0.42,
        0.35,
        A,
        A + 1.4,
        Ex,
      );
    }
    cn(
      o,
      [N + W * 0.2, D + V * 0.2],
      [U, G],
      [W, V],
      I === F ? z - 0.15 : z + 0.55,
      0.35,
      A - 0.6,
      A,
      Ex,
    );
  }
  for (let [I, L] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let [F, O] = E(I, L);
    (cn(o, [F, O], f, u, 0.75, 0.75, l - 0.4, A + 0.4, MK),
      qe(
        o,
        F,
        O,
        [
          [0.7, A + 0.4],
          [0.6, A + 1.6],
          [0.45, A + 2],
          [0.32, A + 5.5],
          [0, A + 7.5],
        ],
        4,
        Ex,
      ));
  }
  (Dgt(o, R, A - 0.5), uL(t, i, l - 3, y + 2));
}
function Dgt(o, t, e) {
  sr(o, t, e, Lt(Ct.stone, 0.25, 0.25, 0.25));
}
var Ugt = We(we.granite, 0.62, 0.6, 0.57),
  zK = Lt(Ct.matte, 0.55, 0.08, 0.06),
  _K = Lt(Ct.metal, 0.5, 0.5, 0.52),
  fL = Lt(Ct.matte, 0.3, 0.15, 0.08),
  EK = Lt(Ct.matte, 0.32, 0.22, 0.14),
  Ggt = Lt(Ct.matte, 0.22, 0.16, 0.11);
