// app 140 — math
// Lines 91972-92319 of readable/app.pretty.js (statement-aligned).
var ix = [
    [-2779.8, 1218.3],
    [-2841.8, 1228.2],
    [-2831.8, 1290.3],
    [-2769.8, 1280.4],
  ],
  Sw = {
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
  $j = Lt(Ct.stone, 0.78, 0.77, 0.74),
  Xj = Lt(Ct.stone, 0.62, 0.61, 0.58),
  V1t = Lt(Ct.glass, 0.03, 0.035, 0.045),
  W1t = Lt(Ct.glass, 0.02, 0.022, 0.03),
  mC = Lt(Ct.metal, 0.22, 0.17, 0.12);
function Kj(o, t, e) {
  let { L: s } = e,
    n = new Be(),
    [i, a] = Sw.c,
    r = 1e9,
    l = -1e9;
  for (let [v, x] of ix) {
    let y = s.driveHeight(v, x);
    ((r = Math.min(r, y)), (l = Math.max(l, y)));
  }
  let c = l + 7,
    h = 51,
    f = ix[1][0] - ix[0][0],
    u = ix[1][1] - ix[0][1],
    d = Math.hypot(f, u),
    p = d / 2,
    m = [f / d, u / d],
    g = [-m[1], m[0]],
    b = (v, x, y) => [i + m[0] * v + g[0] * x, y, a + m[1] * v + g[1] * x];
  for (let v = 0; v < 4; v++) {
    let x = (v * Math.PI) / 2,
      y = Math.round(Math.cos(x)),
      M = Math.round(Math.sin(x)),
      S = (E, R) => [E * y - R * M, E * M + R * y],
      w = (E, R, P) => {
        let [C, I] = S(E, R);
        return b(C, I, P);
      },
      _ = (() => {
        let [E, R] = S(0, 1);
        return [m[0] * E + g[0] * R, 0, m[1] * E + g[1] * R];
      })();
    (oe(
      n,
      [
        w(-p + 7, p - 1.5, r - 0.5),
        w(p - 7, p - 1.5, r - 0.5),
        w(p - 7, p - 1.5, c - 1.2),
        w(-p + 7, p - 1.5, c - 1.2),
      ],
      V1t,
      _,
    ),
      oe(
        n,
        [w(-p, p, c - 1.2), w(p, p, c - 1.2), w(p, p, c), w(-p, p, c)],
        Xj,
        _,
      ));
    for (let E of [-1, 1]) {
      let R = E * (p - 3.5);
      oe(
        n,
        [
          w(R - 3.5, p, r - 0.5),
          w(R + 3.5, p, r - 0.5),
          w(R + 3.5, p, c - 1.2),
          w(R - 3.5, p, c - 1.2),
        ],
        $j,
        _,
      );
    }
    let z = 14,
      A = (E) => 3 + (p - 3) * Math.pow(1 - E, 1.7),
      T = (E) => 1.5 - 0.7 * E;
    for (let E = 0; E < z; E++) {
      let R = E / z,
        P = (E + 1) / z,
        C = c + h * R,
        I = c + h * P,
        L = A(R),
        F = A(P),
        O = (L - F) / (I - C),
        B = Math.hypot(1, O),
        H = [_[0] / B, O / B, _[2] / B];
      for (let N of [-1, 1])
        oe(
          n,
          [
            w(N * T(R), L, C),
            w(N * L, L, C),
            w(N * F, F, I),
            w(N * T(P), F, I),
          ],
          $j,
          H,
        );
      oe(
        n,
        [
          w(-T(R), L - 0.15, C),
          w(T(R), L - 0.15, C),
          w(T(P), F - 0.15, I),
          w(-T(P), F - 0.15, I),
        ],
        W1t,
        H,
      );
    }
  }
  (oe(
    n,
    [b(-3, -3, c + h), b(3, -3, c + h), b(3, 3, c + h), b(-3, 3, c + h)],
    Xj,
    [0, 1, 0],
  ),
    Ce(n, b(0, 0, c + h), b(0, 0, c + h + 16), 0.45, mC, 6),
    Ce(n, b(-4.5, 0, c + h + 11), b(4.5, 0, c + h + 11), 0.38, mC, 6),
    Ce(n, b(0, -4.5, c + h + 11), b(0, 4.5, c + h + 11), 0.38, mC, 6),
    e.colliders.push({
      t: "poly",
      pts: Float32Array.from(ix.flat()),
      bb: [-2842, 1218, -2769, 1291],
      y0: r - 2,
      y1: c + h,
    }),
    vn(o.group, n, t.lm, "StMaryCathedral"));
}
var kw = [
    [-3424.3, -1022.6],
    [-3505.4, -1009.7],
    [-3499.2, -971.1],
    [-3473.1, -975.2],
    [-3472, -968.3],
    [-3497.1, -964.4],
    [-3496.2, -958.5],
    [-3416.1, -971.2],
  ],
  Wk = {
    c: [-3460, -990],
    claim: kw.map(([o, t]) => [o + (o + 3460) * 0.04, t + (t + 990) * 0.04]),
  },
  Yj = Lt(Ct.stone, 0.72, 0.7, 0.64),
  q1t = Lt(Ct.stone, 0.6, 0.58, 0.54),
  j1t = Lt(Ct.stone, 0.42, 0.42, 0.4),
  $1t = Lt(Ct.gloss, 0.04, 0.22, 0.14),
  Jj = Lt(Ct.glass, 0.03, 0.035, 0.04),
  Zj = Lt(Ct.metal, 0.35, 0.36, 0.36),
  X1t = wn(0.85, 0.05, 0.03),
  K1t = {
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
function Qj(o, t, e) {
  let { L: s } = e,
    n = new Be(),
    i = kw[0],
    a = kw[1],
    r = Math.hypot(a[0] - i[0], a[1] - i[1]),
    l = [(a[0] - i[0]) / r, (a[1] - i[1]) / r],
    c = [-l[1], l[0]],
    h = 51,
    f =
      Math.min(
        s.driveHeight(i[0] + c[0] * 3, i[1] + c[1] * 3),
        s.driveHeight(a[0] + c[0] * 3, a[1] + c[1] * 3),
      ) - 0.2,
    u = 6.2,
    d = 6,
    p = (z, A, T) => [
      i[0] + l[0] * z - c[0] * A,
      f + T,
      i[1] + l[1] * z - c[1] * A,
    ],
    m = (z) => u + d * (1 - Math.pow((2 * z) / r - 1, 2));
  Ss(n, kw, f - 0.5, f + u, Yj);
  let g = 24;
  for (let z = 0; z < g; z++) {
    let A = (r * z) / g,
      T = (r * (z + 1)) / g;
    (oe(
      n,
      [p(A, -0.6, m(A)), p(T, -0.6, m(T)), p(T, h, m(T)), p(A, h, m(A))],
      j1t,
      [0, 1, 0],
    ),
      Math.min(m(A), m(T)) - 0.5 > u + 0.01 &&
        oe(
          n,
          [p(A, 0, u), p(T, 0, u), p(T, 0, m(T) - 0.5), p(A, 0, m(A) - 0.5)],
          Jj,
          [c[0], 0, c[1]],
        ),
      oe(
        n,
        [
          p(A, -0.05, m(A) - 0.6),
          p(T, -0.05, m(T) - 0.6),
          p(T, -0.6, m(T) + 0.15),
          p(A, -0.6, m(A) + 0.15),
        ],
        $1t,
        [c[0], 0.4, c[1]],
      ),
      oe(n, [p(A, h, u), p(T, h, u), p(T, h, m(T)), p(A, h, m(A))], Yj, [
        -c[0],
        0,
        -c[1],
      ]));
  }
  for (let z = 1.7; z < r; z += 3.4)
    oe(
      n,
      [
        p(z - 0.09, -0.1, u),
        p(z + 0.09, -0.1, u),
        p(z + 0.09, -0.1, m(z) - 0.5),
        p(z - 0.09, -0.1, m(z) - 0.5),
      ],
      Zj,
      [c[0], 0, c[1]],
    );
  (oe(
    n,
    [
      p(4, -0.05, 0.2),
      p(r - 4, -0.05, 0.2),
      p(r - 4, -0.05, 3.6),
      p(4, -0.05, 3.6),
    ],
    Jj,
    [c[0], 0, c[1]],
  ),
    oe(
      n,
      [
        p(0, -0.08, 4.3),
        p(r, -0.08, 4.3),
        p(r, -0.08, u + 0.05),
        p(0, -0.08, u + 0.05),
      ],
      q1t,
      [c[0], 0, c[1]],
    ));
  for (let z = 6; z < r - 4; z += 4)
    oe(
      n,
      [
        p(z - 0.08, -0.14, 0.2),
        p(z + 0.08, -0.14, 0.2),
        p(z + 0.08, -0.14, 3.6),
        p(z - 0.08, -0.14, 3.6),
      ],
      Zj,
      [c[0], 0, c[1]],
    );
  let b = "SAFEWAY",
    v = 2.4,
    x = 1.9,
    y = 3.1,
    M = b.length * v + (b.length - 1) * x,
    S = (r - M) / 2,
    w = u + 0.7,
    _ = 0.46;
  ([...b].forEach((z, A) => {
    let T = S + A * (v + x);
    for (let [E, R, P, C] of K1t[z]) {
      let I = [T + E * v, w + (R / 1.4) * y],
        L = [T + P * v, w + (C / 1.4) * y],
        F = L[0] - I[0],
        O = L[1] - I[1],
        B = Math.hypot(F, O) || 1,
        H = ((-O / B) * _) / 2,
        N = ((F / B) * _) / 2;
      oe(
        n,
        [
          p(I[0] - H, -0.3, I[1] - N),
          p(L[0] - H, -0.3, L[1] - N),
          p(L[0] + H, -0.3, L[1] + N),
          p(I[0] + H, -0.3, I[1] + N),
        ],
        X1t,
        [c[0], 0, c[1]],
      );
    }
  }),
    e.colliders.push({
      t: "poly",
      pts: Float32Array.from(kw.flat()),
      bb: [-3506, -1023, -3416, -958],
      y0: f - 2,
      y1: f + u + d,
    }),
    vn(o.group, n, t.lm, "MarinaSafeway"));
}
es();
var zw = new Map(),
  _w = new Map(),
  qk = (o, t) => o * 100003 + t,
  e$ = 0;
