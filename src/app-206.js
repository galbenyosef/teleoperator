// app 206 — math
// Lines 112585-112878 of readable/app.pretty.js (statement-aligned).
function $bt(o, t) {
  let { L: e } = t,
    [s, n] = mc.lotta,
    i = e.driveHeight(s, n);
  qe(
    o,
    s,
    n,
    [
      [1.75, i - 0.2],
      [1.75, i + 0.18],
      [1.5, i + 0.18],
      [1.5, i + 0.32],
      [0.01, i + 0.32],
    ],
    4,
    jbt,
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
  qe(
    o,
    s,
    n,
    [
      [1.15, i + 0.32],
      [1.15, i + 0.55],
      [1, i + 0.62],
      [0.95, i + 1.9],
      [1.08, i + 2],
      [1.08, i + 2.2],
      [0.85, i + 2.35],
      [0.8, i + 3.3],
      [0.95, i + 3.42],
      [0.95, i + 3.6],
      [0.6, i + 3.8],
      [0.01, i + 3.85],
    ],
    16,
    kL,
    { rf: (c, h) => a(c, h) * 0.72, flat: !0 },
  );
  for (let c = 0; c < 4; c++) {
    let h = (c * Math.PI) / 2,
      f = Math.cos(h),
      u = Math.sin(h);
    (qe(
      o,
      s + f * 1,
      n + u * 1,
      [
        [0.01, i + 0.75],
        [0.42, i + 0.85],
        [0.5, i + 1.1],
        [0.46, i + 1.15],
      ],
      10,
      zL,
    ),
      qe(
        o,
        s + f * 0.95,
        n + u * 0.95,
        [
          [0.01, i + 1.3],
          [0.2, i + 1.38],
          [0.22, i + 1.6],
          [0.12, i + 1.75],
          [0.01, i + 1.78],
        ],
        8,
        kL,
      ),
      qe(
        o,
        s + f * 0.88,
        n + u * 0.88,
        [
          [0.01, i + 2.45],
          [0.3, i + 2.5],
          [0.3, i + 3],
          [0.01, i + 3.05],
        ],
        12,
        zL,
      ));
  }
  let r = [],
    l = i + 3.85;
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
    qe(o, s, n, r, 14, kL),
    qe(
      o,
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
      qbt,
    ),
    qe(
      o,
      s,
      n,
      [
        [0.32, l + 1.85],
        [0.2, l + 2.1],
        [0.06, l + 2.35],
        [0.01, l + 2.6],
      ],
      8,
      zL,
    ),
    t.colliders.push({ t: "circ", x: s, z: n, r: 1.3, y0: i - 1, y1: i + 9 }));
}
var tY = Tn(ln.WIN, we.precast, 0.66, 0.63, 0.57),
  eY = We(we.precast, 0.74, 0.71, 0.66),
  _L = Lt(Ct.glass, 0.09, 0.11, 0.14),
  sY = Lt(Ct.gloss, 0.1, 0.14, 0.2),
  EL = Lt(Ct.gloss, 0.72, 0.71, 0.68),
  Xbt = We(we.granite, 0.36, 0.2, 0.17);
function Kbt(o, t) {
  let { D: e, L: s } = t,
    n = oY(e, mc.marquis);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    [r] = rY(s, i),
    l = r,
    c = l + (n.top - n.base),
    h = lY(i),
    { u: f, n: u } = h;
  Ss(o, i, r - 0.6, l + 9, Xbt, { vBase: l });
  for (let y of a)
    y.L > 5 &&
      oe(
        o,
        [
          [y.a[0] + y.n[0] * 0.09, l + 1, y.a[1] + y.n[1] * 0.09],
          [y.b[0] + y.n[0] * 0.09, l + 1, y.b[1] + y.n[1] * 0.09],
          [y.b[0] + y.n[0] * 0.09, l + 7.5, y.b[1] + y.n[1] * 0.09],
          [y.a[0] + y.n[0] * 0.09, l + 7.5, y.a[1] + y.n[1] * 0.09],
        ],
        _L,
        [y.n[0], 0, y.n[1]],
      );
  let d = l + (c - l) * 0.62,
    p = c - 17;
  (Ss(o, i, l + 9, d, tY, { vBase: l }),
    Eo(o, a, 0.3, l + 9, l + 9.6, eY),
    sr(o, i, d, Lt(Ct.stone, 0.42, 0.41, 0.39)));
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
    v = m(g, b);
  Ss(o, v, d, p, tY, { vBase: l });
  for (let y of [-0.55, 0, 0.55])
    for (let M of [-1, 1]) {
      let S = [
        h.c[0] + f[0] * g * y + u[0] * (b + 0.06) * M,
        h.c[1] + f[1] * g * y + u[1] * (b + 0.06) * M,
      ];
      cn(o, S, f, u, 1.4, 0.05, d, p, _L);
    }
  (Ss(o, v, p, p + 3, _L), Eo(o, ia(v), 0.35, p + 3, p + 3.5, eY));
  let x = (y, M, S, w, _ = 14) => {
    let z = (A) => [Math.cos(A) * S, Math.sin(A) * S];
    for (let A = 0; A < _; A++) {
      let T = (Math.PI * A) / _,
        E = (Math.PI * (A + 1)) / _,
        [R, P] = z(T),
        [C, I] = z(E),
        L = (F, O, B) => [
          y[0] + f[0] * F + u[0] * O,
          w + B,
          y[1] + f[1] * F + u[1] * O,
        ];
      oe(o, [L(-M, R, P), L(M, R, P), L(M, C, I), L(-M, C, I)], sY, [
        u[0] * Math.cos((T + E) / 2),
        Math.sin((T + E) / 2),
        u[1] * Math.cos((T + E) / 2),
      ]);
      for (let F of [-1, 1])
        oe(
          o,
          [
            [y[0] + f[0] * M * F, w, y[1] + f[1] * M * F],
            L(M * F, R, P),
            L(M * F, C, I),
          ],
          sY,
          [f[0] * F, 0, f[1] * F],
        );
    }
    for (let A = -M + Math.min(2.2, M) / 2; A < M - 0.5; A += 2.2)
      for (let T = 0; T < _; T++) {
        let [E, R] = z((Math.PI * T) / _),
          [P, C] = z((Math.PI * (T + 1)) / _),
          I = 1.02;
        Ce(
          o,
          [
            y[0] + f[0] * A + u[0] * E * I,
            w + R * I,
            y[1] + f[1] * A + u[1] * E * I,
          ],
          [
            y[0] + f[0] * A + u[0] * P * I,
            w + C * I,
            y[1] + f[1] * A + u[1] * P * I,
          ],
          0.22,
          EL,
          4,
        );
      }
    for (let A of [-1, 1])
      for (let T = 1; T < 8; T++) {
        let E = (Math.PI * T) / 8,
          [R, P] = z(E),
          C = [y[0] + f[0] * (M + 0.05) * A, y[1] + f[1] * (M + 0.05) * A];
        Ce(
          o,
          [C[0], w, C[1]],
          [C[0] + u[0] * R, w + P, C[1] + u[1] * R],
          0.18,
          EL,
          4,
        );
      }
    for (let A of [-1, 1])
      for (let T = 0; T < _; T++) {
        let [E, R] = z((Math.PI * T) / _),
          [P, C] = z((Math.PI * (T + 1)) / _),
          I = [y[0] + f[0] * (M + 0.05) * A, y[1] + f[1] * (M + 0.05) * A];
        Ce(
          o,
          [I[0] + u[0] * E, w + R, I[1] + u[1] * E],
          [I[0] + u[0] * P, w + C, I[1] + u[1] * P],
          0.3,
          EL,
          4,
        );
      }
  };
  x(h.c, g - 0.5, b - 0.3, p + 3.5);
  for (let y of [-1, 1]) {
    let M = [
        h.c[0] + f[0] * (g + (h.hl - g) / 2) * y,
        h.c[1] + f[1] * (g + (h.hl - g) / 2) * y,
      ],
      S = Math.max(1.5, (h.hl - g) / 2 - 0.6);
    h.hl - g > 4 && x(M, S, Math.min(b * 0.75, 9), d, 10);
  }
  aY(t, i, r - 3, c + 2);
}
var Ybt = Lt(Ct.glass, 0.1, 0.25, 0.26),
  Hw = Lt(Ct.gloss, 0.86, 0.87, 0.86),
  nY = Lt(Ct.glass, 0.05, 0.08, 0.09),
  Jbt = We(we.precast, 0.62, 0.6, 0.56);
