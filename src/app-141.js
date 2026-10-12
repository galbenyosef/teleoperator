// app 141 — math
// Lines 91704-92051 of readable/app.pretty.js (statement-aligned).
var xb = [
    [-2779.8, 1218.3],
    [-2841.8, 1228.2],
    [-2831.8, 1290.3],
    [-2769.8, 1280.4],
  ],
  Ay = {
    c: [-2805.8, 1254.3],
    claim: [
      [-2773.3, 1210.6],
      [-2849, 1222.6],
      [-2835.2, 1309.2],
      [-2849.9, 1311.6],
      [-2844.1, 1348],
      [-2739.1, 1331.3],
      [-2744.9, 1294.7],
      [-2759.5, 1297],
    ],
  },
  jq = It(Lt.stone, 0.78, 0.77, 0.74),
  Vq = It(Lt.stone, 0.62, 0.61, 0.58),
  wut = It(Lt.glass, 0.03, 0.035, 0.045),
  Mut = It(Lt.glass, 0.02, 0.022, 0.03),
  O7 = It(Lt.metal, 0.22, 0.17, 0.12);
function $q(i, t, e) {
  let { L: s } = e,
    n = new Ce(),
    [o, a] = Ay.c,
    r = 1e9,
    l = -1e9;
  for (let [x, v] of xb) {
    let y = s.driveHeight(x, v);
    ((r = Math.min(r, y)), (l = Math.max(l, y)));
  }
  let c = l + 7,
    h = 51,
    f = xb[1][0] - xb[0][0],
    u = xb[1][1] - xb[0][1],
    d = Math.hypot(f, u),
    p = d / 2,
    m = [f / d, u / d],
    g = [-m[1], m[0]],
    b = (x, v, y) => [o + m[0] * x + g[0] * v, y, a + m[1] * x + g[1] * v];
  for (let x = 0; x < 4; x++) {
    let v = (x * Math.PI) / 2,
      y = Math.round(Math.cos(v)),
      M = Math.round(Math.sin(v)),
      S = (E, A) => [E * y - A * M, E * M + A * y],
      w = (E, A, C) => {
        let [P, I] = S(E, A);
        return b(P, I, C);
      },
      z = (() => {
        let [E, A] = S(0, 1);
        return [m[0] * E + g[0] * A, 0, m[1] * E + g[1] * A];
      })();
    (ne(
      n,
      [
        w(-p + 7, p - 1.5, r - 0.5),
        w(p - 7, p - 1.5, r - 0.5),
        w(p - 7, p - 1.5, c - 1.2),
        w(-p + 7, p - 1.5, c - 1.2),
      ],
      wut,
      z,
    ),
      ne(
        n,
        [w(-p, p, c - 1.2), w(p, p, c - 1.2), w(p, p, c), w(-p, p, c)],
        Vq,
        z,
      ));
    for (let E of [-1, 1]) {
      let A = E * (p - 3.5);
      ne(
        n,
        [
          w(A - 3.5, p, r - 0.5),
          w(A + 3.5, p, r - 0.5),
          w(A + 3.5, p, c - 1.2),
          w(A - 3.5, p, c - 1.2),
        ],
        jq,
        z,
      );
    }
    let _ = 14,
      R = (E) => 3 + (p - 3) * Math.pow(1 - E, 1.7),
      T = (E) => 1.5 - 0.7 * E;
    for (let E = 0; E < _; E++) {
      let A = E / _,
        C = (E + 1) / _,
        P = c + h * A,
        I = c + h * C,
        L = R(A),
        F = R(C),
        N = (L - F) / (I - P),
        B = Math.hypot(1, N),
        H = [z[0] / B, N / B, z[2] / B];
      for (let O of [-1, 1])
        ne(
          n,
          [
            w(O * T(A), L, P),
            w(O * L, L, P),
            w(O * F, F, I),
            w(O * T(C), F, I),
          ],
          jq,
          H,
        );
      ne(
        n,
        [
          w(-T(A), L - 0.15, P),
          w(T(A), L - 0.15, P),
          w(T(C), F - 0.15, I),
          w(-T(C), F - 0.15, I),
        ],
        Mut,
        H,
      );
    }
  }
  (ne(
    n,
    [b(-3, -3, c + h), b(3, -3, c + h), b(3, 3, c + h), b(-3, 3, c + h)],
    Vq,
    [0, 1, 0],
  ),
    Ae(n, b(0, 0, c + h), b(0, 0, c + h + 16), 0.45, O7, 6),
    Ae(n, b(-4.5, 0, c + h + 11), b(4.5, 0, c + h + 11), 0.38, O7, 6),
    Ae(n, b(0, -4.5, c + h + 11), b(0, 4.5, c + h + 11), 0.38, O7, 6),
    e.colliders.push({
      t: "poly",
      pts: Float32Array.from(xb.flat()),
      bb: [-2842, 1218, -2769, 1291],
      y0: r - 2,
      y1: c + h,
    }),
    gn(i.group, n, t.lm, "StMaryCathedral"));
}
var Ry = [
    [-3424.3, -1022.6],
    [-3505.4, -1009.7],
    [-3499.2, -971.1],
    [-3473.1, -975.2],
    [-3472, -968.3],
    [-3497.1, -964.4],
    [-3496.2, -958.5],
    [-3416.1, -971.2],
  ],
  qS = {
    c: [-3460, -990],
    claim: Ry.map(([i, t]) => [i + (i + 3460) * 0.04, t + (t + 990) * 0.04]),
  },
  Xq = It(Lt.stone, 0.72, 0.7, 0.64),
  Sut = It(Lt.stone, 0.6, 0.58, 0.54),
  kut = It(Lt.stone, 0.42, 0.42, 0.4),
  _ut = It(Lt.gloss, 0.04, 0.22, 0.14),
  Kq = It(Lt.glass, 0.03, 0.035, 0.04),
  Yq = It(Lt.metal, 0.35, 0.36, 0.36),
  zut = bn(0.85, 0.05, 0.03),
  Eut = {
    S: [
      [1, 1.4, 0, 1.4],
      [0, 1.4, 0, 0.7],
      [0, 0.7, 1, 0.7],
      [1, 0.7, 1, 0],
      [1, 0, 0, 0],
    ],
    A: [
      [0, 0, 0.5, 1.4],
      [0.5, 1.4, 1, 0],
      [0.22, 0.6, 0.78, 0.6],
    ],
    F: [
      [0, 0, 0, 1.4],
      [0, 1.4, 1, 1.4],
      [0, 0.75, 0.75, 0.75],
    ],
    E: [
      [0, 0, 0, 1.4],
      [0, 1.4, 1, 1.4],
      [0, 0.72, 0.8, 0.72],
      [0, 0, 1, 0],
    ],
    W: [
      [0, 1.4, 0.25, 0],
      [0.25, 0, 0.5, 0.9],
      [0.5, 0.9, 0.75, 0],
      [0.75, 0, 1, 1.4],
    ],
    Y: [
      [0, 1.4, 0.5, 0.7],
      [1, 1.4, 0.5, 0.7],
      [0.5, 0.7, 0.5, 0],
    ],
  };
function Jq(i, t, e) {
  let { L: s } = e,
    n = new Ce(),
    o = Ry[0],
    a = Ry[1],
    r = Math.hypot(a[0] - o[0], a[1] - o[1]),
    l = [(a[0] - o[0]) / r, (a[1] - o[1]) / r],
    c = [-l[1], l[0]],
    h = 51,
    f =
      Math.min(
        s.driveHeight(o[0] + c[0] * 3, o[1] + c[1] * 3),
        s.driveHeight(a[0] + c[0] * 3, a[1] + c[1] * 3),
      ) - 0.2,
    u = 6.2,
    d = 6,
    p = (_, R, T) => [
      o[0] + l[0] * _ - c[0] * R,
      f + T,
      o[1] + l[1] * _ - c[1] * R,
    ],
    m = (_) => u + d * (1 - Math.pow((2 * _) / r - 1, 2));
  ys(n, Ry, f - 0.5, f + u, Xq);
  let g = 24;
  for (let _ = 0; _ < g; _++) {
    let R = (r * _) / g,
      T = (r * (_ + 1)) / g;
    (ne(
      n,
      [p(R, -0.6, m(R)), p(T, -0.6, m(T)), p(T, h, m(T)), p(R, h, m(R))],
      kut,
      [0, 1, 0],
    ),
      Math.min(m(R), m(T)) - 0.5 > u + 0.01 &&
        ne(
          n,
          [p(R, 0, u), p(T, 0, u), p(T, 0, m(T) - 0.5), p(R, 0, m(R) - 0.5)],
          Kq,
          [c[0], 0, c[1]],
        ),
      ne(
        n,
        [
          p(R, -0.05, m(R) - 0.6),
          p(T, -0.05, m(T) - 0.6),
          p(T, -0.6, m(T) + 0.15),
          p(R, -0.6, m(R) + 0.15),
        ],
        _ut,
        [c[0], 0.4, c[1]],
      ),
      ne(n, [p(R, h, u), p(T, h, u), p(T, h, m(T)), p(R, h, m(R))], Xq, [
        -c[0],
        0,
        -c[1],
      ]));
  }
  for (let _ = 1.7; _ < r; _ += 3.4)
    ne(
      n,
      [
        p(_ - 0.09, -0.1, u),
        p(_ + 0.09, -0.1, u),
        p(_ + 0.09, -0.1, m(_) - 0.5),
        p(_ - 0.09, -0.1, m(_) - 0.5),
      ],
      Yq,
      [c[0], 0, c[1]],
    );
  (ne(
    n,
    [
      p(4, -0.05, 0.2),
      p(r - 4, -0.05, 0.2),
      p(r - 4, -0.05, 3.6),
      p(4, -0.05, 3.6),
    ],
    Kq,
    [c[0], 0, c[1]],
  ),
    ne(
      n,
      [
        p(0, -0.08, 4.3),
        p(r, -0.08, 4.3),
        p(r, -0.08, u + 0.05),
        p(0, -0.08, u + 0.05),
      ],
      Sut,
      [c[0], 0, c[1]],
    ));
  for (let _ = 6; _ < r - 4; _ += 4)
    ne(
      n,
      [
        p(_ - 0.08, -0.14, 0.2),
        p(_ + 0.08, -0.14, 0.2),
        p(_ + 0.08, -0.14, 3.6),
        p(_ - 0.08, -0.14, 3.6),
      ],
      Yq,
      [c[0], 0, c[1]],
    );
  let b = "SAFEWAY",
    x = 2.4,
    v = 1.9,
    y = 3.1,
    M = b.length * x + (b.length - 1) * v,
    S = (r - M) / 2,
    w = u + 0.7,
    z = 0.46;
  ([...b].forEach((_, R) => {
    let T = S + R * (x + v);
    for (let [E, A, C, P] of Eut[_]) {
      let I = [T + E * x, w + (A / 1.4) * y],
        L = [T + C * x, w + (P / 1.4) * y],
        F = L[0] - I[0],
        N = L[1] - I[1],
        B = Math.hypot(F, N) || 1,
        H = ((-N / B) * z) / 2,
        O = ((F / B) * z) / 2;
      ne(
        n,
        [
          p(I[0] - H, -0.3, I[1] - O),
          p(L[0] - H, -0.3, L[1] - O),
          p(L[0] + H, -0.3, L[1] + O),
          p(I[0] + H, -0.3, I[1] + O),
        ],
        zut,
        [c[0], 0, c[1]],
      );
    }
  }),
    e.colliders.push({
      t: "poly",
      pts: Float32Array.from(Ry.flat()),
      bb: [-3506, -1023, -3416, -958],
      y0: f - 2,
      y1: f + u + d,
    }),
    gn(i.group, n, t.lm, "MarinaSafeway"));
}
as();
var Py = new Map(),
  Cy = new Map(),
  jS = (i, t) => i * 100003 + t,
  Qq = 0;
