// app 138 — math
// Lines 90652-90980 of readable/app.pretty.js (statement-aligned).
function jd(i, t, e, s, n, o, a, r, l, c, h) {
  let f = (d, p, m) => [
      t[0] + e[0] * d + s[0] * m,
      t[1] + p,
      t[2] + e[1] * d + s[1] * m,
    ],
    u = [
      [
        [n, a, c],
        [o, a, c],
        [o, r, c],
        [n, r, c],
        [s[0], 0, s[1]],
      ],
      [
        [o, a, l],
        [n, a, l],
        [n, r, l],
        [o, r, l],
        [-s[0], 0, -s[1]],
      ],
      [
        [o, a, c],
        [o, a, l],
        [o, r, l],
        [o, r, c],
        [e[0], 0, e[1]],
      ],
      [
        [n, a, l],
        [n, a, c],
        [n, r, c],
        [n, r, l],
        [-e[0], 0, -e[1]],
      ],
      [
        [n, r, c],
        [o, r, c],
        [o, r, l],
        [n, r, l],
        [0, 1, 0],
      ],
      [
        [n, a, l],
        [o, a, l],
        [o, a, c],
        [n, a, c],
        [0, -1, 0],
      ],
    ];
  for (let [d, p, m, g, b] of u)
    ne(i, [f(...d), f(...p), f(...m), f(...g)], h, b);
}
function Bq(i, t, e) {
  let { L: s } = e,
    n = new Ce(),
    [o, a] = Ey.c,
    r = s.driveHeight(-2205, 1805.5),
    l = (d) => r + d,
    c = (d, p, m, g, b = 64) => {
      for (let x = 0; x < b; x++) {
        let v = (x / b) * 2 * Math.PI,
          y = ((x + 1) / b) * 2 * Math.PI;
        Ae(
          n,
          [o + Math.cos(v) * d, p, a + Math.sin(v) * d],
          [o + Math.cos(y) * d, p, a + Math.sin(y) * d],
          m,
          g,
          4,
        );
      }
    };
  (Oe(
    n,
    o,
    a,
    [
      [17.2, l(39.5)],
      [17.2, l(45.4)],
      [17.6, l(45.6)],
      [17.6, l(46.2)],
    ],
    48,
    ol,
  ),
    ql(n, o, l(46.2), a, 17.6, 48, WS),
    Oe(
      n,
      o,
      a,
      [
        [14.5, l(46.2)],
        [14.5, l(55)],
      ],
      48,
      WS,
    ));
  for (let d = 0; d < 16; d++) {
    let p = ((d + 0.5) / 16) * 2 * Math.PI,
      m = Math.cos(p),
      g = Math.sin(p),
      b = [-g, m];
    (jd(
      n,
      [o + m * 14.5, r, a + g * 14.5],
      b,
      [m, g],
      -1.1,
      1.1,
      48,
      53.4,
      -0.1,
      0.06,
      I7,
    ),
      jd(
        n,
        [o + m * 14.5, r, a + g * 14.5],
        b,
        [m, g],
        -1.5,
        1.5,
        53.4,
        54,
        -0.1,
        0.25,
        ol,
      ));
  }
  for (let d = 0; d < 16; d++)
    for (let p of [-0.045, 0.045]) {
      let m = (d / 16) * 2 * Math.PI + p * 1;
      Ae(
        n,
        [o + Math.cos(m) * 16.1, l(46.2), a + Math.sin(m) * 16.1],
        [o + Math.cos(m) * 16.1, l(54.6), a + Math.sin(m) * 16.1],
        [0.62, 0.52],
        ol,
        10,
      );
    }
  Oe(
    n,
    o,
    a,
    [
      [14.4, l(54.6)],
      [16.9, l(54.6)],
      [16.9, l(56.4)],
      [17.2, l(56.7)],
      [15.4, l(56.9)],
      [15.4, l(59.6)],
      [15, l(60)],
    ],
    48,
    ol,
  );
  for (let d = 0; d < 16; d++) {
    let p = (d / 16) * 2 * Math.PI;
    Ze(
      n,
      o + Math.cos(p) * 16.4 - 0.35,
      l(56.7),
      a + Math.sin(p) * 16.4 - 0.35,
      o + Math.cos(p) * 16.4 + 0.35,
      l(58.3),
      a + Math.sin(p) * 16.4 + 0.35,
      ol,
    );
  }
  let h = [];
  for (let d = 0; d <= 14; d++) {
    let p = (d / 14) * 1.39,
      m = 14.7 * Math.cos(p),
      g = 60 + 17.8 * Math.sin(p);
    h.push([m, l(g)]);
  }
  Oe(n, o, a, h, 64, hut);
  for (let d = 0; d < 16; d++) {
    let p = (d / 16) * 2 * Math.PI,
      m = Math.cos(p),
      g = Math.sin(p);
    for (let y = 0; y + 1 < h.length; y++) {
      let [M, S] = h[y],
        [w, z] = h[y + 1];
      Ae(
        n,
        [o + m * (M + 0.2), S, a + g * (M + 0.2)],
        [o + m * (w + 0.2), z, a + g * (w + 0.2)],
        0.34,
        zy,
        4,
      );
    }
    let b = p + Math.PI / 16,
      x = 14.7 * Math.cos(0.42) + 0.15,
      v = l(60 + 17.8 * Math.sin(0.42));
    Ae(
      n,
      [o + Math.cos(b) * x, v - 0.9, a + Math.sin(b) * x],
      [o + Math.cos(b) * (x - 0.25), v + 0.9, a + Math.sin(b) * (x - 0.25)],
      0.55,
      zy,
      6,
    );
  }
  (c(14.85, l(60.4), 0.22, zy),
    Oe(
      n,
      o,
      a,
      [
        [2.6, l(77.2)],
        [3.4, l(77.6)],
        [3.4, l(79)],
        [2.2, l(79)],
        [2.2, l(84.2)],
        [3, l(84.2)],
        [3, l(85.4)],
        [2.4, l(85.6)],
      ],
      24,
      ol,
    ));
  for (let d = 0; d < 8; d++) {
    let p = (d / 8) * 2 * Math.PI;
    Ae(
      n,
      [o + Math.cos(p) * 2.75, l(79), a + Math.sin(p) * 2.75],
      [o + Math.cos(p) * 2.75, l(84.2), a + Math.sin(p) * 2.75],
      0.24,
      ol,
      6,
    );
  }
  let f = [];
  for (let d = 0; d <= 8; d++) {
    let p = (d / 8) * 1.45;
    f.push([2.4 * Math.cos(p), l(85.6 + 3 * Math.sin(p))]);
  }
  (Oe(n, o, a, f, 24, zy),
    Oe(
      n,
      o,
      a,
      [
        [0.55, l(88.4)],
        [0.75, l(89.2)],
        [0.3, l(90.2)],
        [0.42, l(90.8)],
        [0.12, l(93)],
        [0.02, l(93.8)],
      ],
      12,
      zy,
    ));
  let u = [0.165, 0.986];
  for (let [d, p] of [
    [-2216.7, 1],
    [-2315.8, -1],
  ]) {
    let m = [0.986 * p, -0.165 * p],
      g = [d, r, 1805.5];
    for (let y of [-5.2, 0, 5.2])
      jd(n, g, u, m, y - 1.6, y + 1.6, 0.3, 6.2, -0.1, 0.12, I7);
    jd(n, g, u, m, -14, 14, -0.5, 0.35, 0, 4.5, WS);
    for (let y = 0; y < 6; y++) {
      let M = -11.25 + 4.5 * y,
        S = [g[0] + u[0] * M + m[0] * 2, 0, g[2] + u[1] * M + m[1] * 2];
      (Ze(
        n,
        S[0] - 1.05,
        l(7.6),
        S[2] - 1.05,
        S[0] + 1.05,
        l(9),
        S[2] + 1.05,
        ol,
      ),
        Ae(n, [S[0], l(9), S[2]], [S[0], l(22.6), S[2]], [0.82, 0.7], ol, 12),
        Ze(n, S[0] - 1, l(22.6), S[2] - 1, S[0] + 1, l(23.4), S[2] + 1, ol));
    }
    (jd(n, g, u, m, -14.2, 14.2, 7, 7.6, -0.2, 3.2, ol),
      jd(n, g, u, m, -14.2, 14.2, 23.4, 26.4, -0.2, 3.2, ol));
    for (let y = 0; y < 5; y++) {
      let M = -9 + 4.5 * y;
      jd(n, g, u, m, M - 1.3, M + 1.3, 10.5, 20.5, -0.1, 0.12, I7);
    }
    let b = (y, M, S) => [
      g[0] + u[0] * y + m[0] * S,
      l(M),
      g[2] + u[1] * y + m[1] * S,
    ];
    ne(n, [b(-14.6, 26.4, 3.25), b(14.6, 26.4, 3.25), b(0, 31.6, 3.25)], ol, [
      m[0],
      0,
      m[1],
    ]);
    let x = Math.hypot(14.6, 5.2),
      v = [m[0] * 0, 14.6 / x, 0];
    for (let y of [-1, 1])
      ne(
        n,
        [
          b(14.6 * y, 26.4, 3.25),
          b(0, 31.6, 3.25),
          b(0, 31.6, -0.5),
          b(14.6 * y, 26.4, -0.5),
        ],
        WS,
        [(u[0] * y * 5.2) / x, v[1], (u[1] * y * 5.2) / x],
      );
    jd(
      n,
      g,
      u,
      m,
      -3.2,
      3.2,
      27,
      29.6,
      3.3,
      3.5,
      It(Lt.stone, 0.66, 0.63, 0.57),
    );
  }
  gn(i.group, n, t.lm, "CityHall");
}
