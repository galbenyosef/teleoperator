// app 207 — math
// Lines 112329-112622 of readable/app.pretty.js (statement-aligned).
function Smt(i, t) {
  let { L: e } = t,
    [s, n] = Xl.lotta,
    o = e.driveHeight(s, n);
  Oe(
    i,
    s,
    n,
    [
      [1.75, o - 0.2],
      [1.75, o + 0.18],
      [1.5, o + 0.18],
      [1.5, o + 0.32],
      [0.01, o + 0.32],
    ],
    4,
    Mmt,
    {
      rf: (c, h) =>
        (c / Math.max(Math.abs(Math.cos(h)), Math.abs(Math.sin(h)))) * 0.82,
    },
  );
  let a = (c, h) =>
    c /
    Math.max(
      Math.abs(Math.cos(h - Math.PI / 4)),
      Math.abs(Math.sin(h - Math.PI / 4)),
    );
  Oe(
    i,
    s,
    n,
    [
      [1.15, o + 0.32],
      [1.15, o + 0.55],
      [1, o + 0.62],
      [0.95, o + 1.9],
      [1.08, o + 2],
      [1.08, o + 2.2],
      [0.85, o + 2.35],
      [0.8, o + 3.3],
      [0.95, o + 3.42],
      [0.95, o + 3.6],
      [0.6, o + 3.8],
      [0.01, o + 3.85],
    ],
    16,
    XP,
    { rf: (c, h) => a(c, h) * 0.72, flat: !0 },
  );
  for (let c = 0; c < 4; c++) {
    let h = (c * Math.PI) / 2,
      f = Math.cos(h),
      u = Math.sin(h);
    (Oe(
      i,
      s + f * 1,
      n + u * 1,
      [
        [0.01, o + 0.75],
        [0.42, o + 0.85],
        [0.5, o + 1.1],
        [0.46, o + 1.15],
      ],
      10,
      KP,
    ),
      Oe(
        i,
        s + f * 0.95,
        n + u * 0.95,
        [
          [0.01, o + 1.3],
          [0.2, o + 1.38],
          [0.22, o + 1.6],
          [0.12, o + 1.75],
          [0.01, o + 1.78],
        ],
        8,
        XP,
      ),
      Oe(
        i,
        s + f * 0.88,
        n + u * 0.88,
        [
          [0.01, o + 2.45],
          [0.3, o + 2.5],
          [0.3, o + 3],
          [0.01, o + 3.05],
        ],
        12,
        KP,
      ));
  }
  let r = [],
    l = o + 3.85;
  for (let c = 0; c < 6; c++) {
    let h = 0.42 - c * 0.035;
    (r.push([h + 0.08, l], [h + 0.08, l + 0.12], [h, l + 0.16], [h, l + 0.62]),
      (l += 0.62));
  }
  (r.push(
    [0.35, l],
    [0.45, l + 0.18],
    [0.3, l + 0.35],
    [0.14, l + 0.4],
    [0.14, l + 0.9],
    [0.01, l + 0.92],
  ),
    Oe(i, s, n, r, 14, XP),
    Oe(
      i,
      s,
      n,
      [
        [0.18, l + 0.92],
        [0.3, l + 1.2],
        [0.3, l + 1.75],
        [0.18, l + 1.85],
        [0.01, l + 1.9],
      ],
      8,
      wmt,
    ),
    Oe(
      i,
      s,
      n,
      [
        [0.32, l + 1.85],
        [0.2, l + 2.1],
        [0.06, l + 2.35],
        [0.01, l + 2.6],
      ],
      8,
      KP,
    ),
    t.colliders.push({ t: "circ", x: s, z: n, r: 1.3, y0: o - 1, y1: o + 9 }));
}
var J$ = yn(sn.WIN, be.precast, 0.66, 0.63, 0.57),
  Z$ = Be(be.precast, 0.74, 0.71, 0.66),
  YP = It(Lt.glass, 0.09, 0.11, 0.14),
  Q$ = It(Lt.gloss, 0.1, 0.14, 0.2),
  JP = It(Lt.gloss, 0.72, 0.71, 0.68),
  kmt = Be(be.granite, 0.36, 0.2, 0.17);
function _mt(i, t) {
  let { D: e, L: s } = t,
    n = sX(e, Xl.marquis);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    [r] = iX(s, o),
    l = r,
    c = l + (n.top - n.base),
    h = oX(o),
    { u: f, n: u } = h;
  ys(i, o, r - 0.6, l + 9, kmt, { vBase: l });
  for (let y of a)
    y.L > 5 &&
      ne(
        i,
        [
          [y.a[0] + y.n[0] * 0.09, l + 1, y.a[1] + y.n[1] * 0.09],
          [y.b[0] + y.n[0] * 0.09, l + 1, y.b[1] + y.n[1] * 0.09],
          [y.b[0] + y.n[0] * 0.09, l + 7.5, y.b[1] + y.n[1] * 0.09],
          [y.a[0] + y.n[0] * 0.09, l + 7.5, y.a[1] + y.n[1] * 0.09],
        ],
        YP,
        [y.n[0], 0, y.n[1]],
      );
  let d = l + (c - l) * 0.62,
    p = c - 17;
  (ys(i, o, l + 9, d, J$, { vBase: l }),
    vo(i, a, 0.3, l + 9, l + 9.6, Z$),
    Ua(i, o, d, It(Lt.stone, 0.42, 0.41, 0.39)));
  let m = (y, M) =>
      [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([S, w]) => [
        h.c[0] + f[0] * y * S + u[0] * M * w,
        h.c[1] + f[1] * y * S + u[1] * M * w,
      ]),
    g = h.hl * 0.78,
    b = Math.min(h.hw * 0.62, 15),
    x = m(g, b);
  ys(i, x, d, p, J$, { vBase: l });
  for (let y of [-0.55, 0, 0.55])
    for (let M of [-1, 1]) {
      let S = [
        h.c[0] + f[0] * g * y + u[0] * (b + 0.06) * M,
        h.c[1] + f[1] * g * y + u[1] * (b + 0.06) * M,
      ];
      nn(i, S, f, u, 1.4, 0.05, d, p, YP);
    }
  (ys(i, x, p, p + 3, YP), vo(i, Xo(x), 0.35, p + 3, p + 3.5, Z$));
  let v = (y, M, S, w, z = 14) => {
    let _ = (R) => [Math.cos(R) * S, Math.sin(R) * S];
    for (let R = 0; R < z; R++) {
      let T = (Math.PI * R) / z,
        E = (Math.PI * (R + 1)) / z,
        [A, C] = _(T),
        [P, I] = _(E),
        L = (F, N, B) => [
          y[0] + f[0] * F + u[0] * N,
          w + B,
          y[1] + f[1] * F + u[1] * N,
        ];
      ne(i, [L(-M, A, C), L(M, A, C), L(M, P, I), L(-M, P, I)], Q$, [
        u[0] * Math.cos((T + E) / 2),
        Math.sin((T + E) / 2),
        u[1] * Math.cos((T + E) / 2),
      ]);
      for (let F of [-1, 1])
        ne(
          i,
          [
            [y[0] + f[0] * M * F, w, y[1] + f[1] * M * F],
            L(M * F, A, C),
            L(M * F, P, I),
          ],
          Q$,
          [f[0] * F, 0, f[1] * F],
        );
    }
    for (let R = -M + Math.min(2.2, M) / 2; R < M - 0.5; R += 2.2)
      for (let T = 0; T < z; T++) {
        let [E, A] = _((Math.PI * T) / z),
          [C, P] = _((Math.PI * (T + 1)) / z),
          I = 1.02;
        Ae(
          i,
          [
            y[0] + f[0] * R + u[0] * E * I,
            w + A * I,
            y[1] + f[1] * R + u[1] * E * I,
          ],
          [
            y[0] + f[0] * R + u[0] * C * I,
            w + P * I,
            y[1] + f[1] * R + u[1] * C * I,
          ],
          0.22,
          JP,
          4,
        );
      }
    for (let R of [-1, 1])
      for (let T = 1; T < 8; T++) {
        let E = (Math.PI * T) / 8,
          [A, C] = _(E),
          P = [y[0] + f[0] * (M + 0.05) * R, y[1] + f[1] * (M + 0.05) * R];
        Ae(
          i,
          [P[0], w, P[1]],
          [P[0] + u[0] * A, w + C, P[1] + u[1] * A],
          0.18,
          JP,
          4,
        );
      }
    for (let R of [-1, 1])
      for (let T = 0; T < z; T++) {
        let [E, A] = _((Math.PI * T) / z),
          [C, P] = _((Math.PI * (T + 1)) / z),
          I = [y[0] + f[0] * (M + 0.05) * R, y[1] + f[1] * (M + 0.05) * R];
        Ae(
          i,
          [I[0] + u[0] * E, w + A, I[1] + u[1] * E],
          [I[0] + u[0] * C, w + P, I[1] + u[1] * C],
          0.3,
          JP,
          4,
        );
      }
  };
  v(h.c, g - 0.5, b - 0.3, p + 3.5);
  for (let y of [-1, 1]) {
    let M = [
        h.c[0] + f[0] * (g + (h.hl - g) / 2) * y,
        h.c[1] + f[1] * (g + (h.hl - g) / 2) * y,
      ],
      S = Math.max(1.5, (h.hl - g) / 2 - 0.6);
    h.hl - g > 4 && v(M, S, Math.min(b * 0.75, 9), d, 10);
  }
  nX(t, o, r - 3, c + 2);
}
var zmt = It(Lt.glass, 0.1, 0.25, 0.26),
  qy = It(Lt.gloss, 0.86, 0.87, 0.86),
  tX = It(Lt.glass, 0.05, 0.08, 0.09),
  Emt = Be(be.precast, 0.62, 0.6, 0.56);
