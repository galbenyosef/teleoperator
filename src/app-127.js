// app 127 — math
// Lines 86852-87158 of readable/app.pretty.js (statement-aligned).
function z7(i, t) {
  let e = Ei(7, 15),
    s = Ca(7, 15),
    n = new Ce(),
    o = new Ce(),
    a = (e.z0 + e.z1) / 2,
    r = e.x0 + 4.2,
    l = i.real ? Math.max(r + 54, e.x1 - 49.5) : r + 54,
    c = Math.max(Yt(e.x0, e.z0), Yt(e.x0, e.z1)) + Ke,
    h = (x) => Math.min(Yt(x, e.z0), Yt(x, e.z1)),
    f = yn(sn.HOTEL, be.terracotta, 0.98, 0.96, 0.92),
    u = nl(be.terracotta, 0.97, 0.95, 34),
    d = 7.2 + 6 * 3.7 + 0.6,
    p = e.z0 + 0.5,
    m = e.z1 - 0.5,
    g = (x, v, y, M) =>
      n.wall(
        x,
        v,
        y,
        M,
        Math.min(Yt(x, v), Yt(y, M)) - 1,
        Math.min(Yt(x, v), Yt(y, M)) - 1,
        c + d,
        c + d,
        f,
        0,
        c,
      );
  (g(r, p, r, m),
    g(l, p, r, p),
    g(r, m, l, m),
    g(l, m, l, p),
    n.quad(
      [r, c + d, m],
      [l, c + d, m],
      [l, c + d, p],
      [r, c + d, p],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      It(Lt.stone, 0.32, 0.31, 0.3),
      [0, 1, 0],
    ));
  let b = (x, v, y, M) => {
    Ze(n, r - y, x, p - y, l + y, x + v, m + y, M);
  };
  (b(c + 7.2 - 0.5, 0.55, 0.35, u),
    b(c + d - 0.2, 0.9, 1.1, u),
    b(c + d + 0.7, 1.1, 0.4, yn(sn.TILE, be.terracotta, 0.9)),
    b(c + d + 1.8, 0.2, 0.75, u));
  for (let [x, v] of [
    [p, p + 11],
    [m - 11, m],
    [a - 9, a + 9],
  ]) {
    let y = r - 0.6;
    n.wall(y, x, y, v, c - 1, c - 1, c + d + 4.2, c + d + 4.2, f, 0, c);
    for (let M of [x, v])
      M === x
        ? n.wall(r, x, y, x, c - 1, c - 1, c + d + 4.2, c + d + 4.2, u, 0, c)
        : n.wall(y, v, r, v, c - 1, c - 1, c + d + 4.2, c + d + 4.2, u, 0, c);
    (Ze(n, y - 0.5, c + d + 4.2, x - 0.5, r + 12, c + d + 5.1, v + 0.5, u),
      Ze(n, y + 0.1, c + d + 1.9, x + 0.1, r + 11.5, c + d + 4.2, v - 0.1, f));
  }
  {
    let x = e.x0 - 0.2,
      v = a - 8,
      y = a + 8,
      M = 7.8,
      S = (z, _) => Yt(z, _) + Ke;
    for (let z = 0; z < 6; z++) {
      let _ = v + 0.8 + (z * (y - v - 1.6)) / 5,
        R = x + 0.8,
        T = S(R, _);
      (Oe(
        n,
        R,
        _,
        [
          [0.75, T],
          [0.75, T + 0.4],
          [0.5, T + 0.55],
          [0.46, T + M - 1.1],
          [0.62, T + M - 0.6],
          [0.8, T + M - 0.3],
          [0.8, c + M],
        ],
        16,
        nl(be.stucco, 0.97, 0.93, 10),
        {
          rf: (E, A, C, P) =>
            P > T + 0.6 && P < T + M - 1.2
              ? E * (1 - 0.06 * Math.abs(Math.cos(A * 8)))
              : E,
        },
      ),
        i.colliders.push({ t: "circ", x: R, z: _, r: 0.8 }));
    }
    (Ze(n, x, c + M, v, r, c + M + 1.3, y, u),
      Ze(
        n,
        x + 0.1,
        c + M + 1.3,
        v + 0.1,
        r,
        c + M + 2.3,
        y - 0.1,
        yn(sn.TILE, be.terracotta, 0.85),
      ),
      n.quad(
        [x, c + M - 0.06, v],
        [r, c + M - 0.06, v],
        [r, c + M - 0.06, y],
        [x, c + M - 0.06, y],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        bn(0.9, 0.8, 0.6),
        [0, -1, 0],
      ));
    let w = [
      [
        [0.55, 0.03, 0.04],
        [0.8, 0.8, 0.78],
        [0.04, 0.06, 0.25],
      ],
      [
        [0.02, 0.06, 0.4],
        [0.8, 0.8, 0.78],
        [0.55, 0.02, 0.03],
      ],
      [
        [0.05, 0.25, 0.08],
        [0.8, 0.8, 0.78],
        [0.6, 0.03, 0.03],
      ],
      [
        [0.02, 0.02, 0.02],
        [0.6, 0.02, 0.03],
        [0.75, 0.55, 0.02],
      ],
      [
        [0.55, 0.03, 0.04],
        [0.8, 0.8, 0.78],
        [0.55, 0.03, 0.04],
      ],
    ];
    for (let z = 0; z < 9; z++) {
      let _ = v + 0.8 + (z * (y - v - 1.6)) / 8,
        R = x + 0.4,
        T = c + M + 2.3,
        E = [R - 3, T + 3.6, _ + (z - 4) * 0.35];
      (Ae(n, [R, T, _], E, 0.045, It(Lt.metal, 0.75, 0.72, 0.6), 5),
        Oe(
          n,
          E[0],
          E[2],
          [
            [0.01, E[1]],
            [0.1, E[1] + 0.08],
            [0.01, E[1] + 0.18],
          ],
          6,
          It(Lt.gold, 0.8, 0.6, 0.2),
        ));
      let A = z % 2 === 0,
        C = w[z % w.length],
        P = 2.1,
        I = 1.35,
        L = A ? 13 : 3,
        F = (N, B) => {
          let H = E[0] + (R - E[0]) * (0.05 + N * 0.55),
            O = E[1] + (T - E[1]) * (0.05 + N * 0.55),
            D = E[2] + (_ - E[2]) * (0.05 + N * 0.55);
          return [
            H - 0.5 * B,
            O - B * I,
            D + 0.15 * Math.sin(N * 5 + B * 2 + z),
          ];
        };
      for (let N = 0; N < L; N++) {
        let B = N / L,
          H = (N + 1) / L,
          O = A ? (N % 2 === 0 ? w[0][0] : w[0][1]) : C[N];
        for (let D = 0; D < 4; D++) {
          let U = D / 4,
            G = (D + 1) / 4,
            q = O;
          (A && N < 7 && D < 2 && (q = [0.03, 0.05, 0.22]),
            ne(
              o,
              [F(U, B), F(G, B), F(G, H), F(U, H)],
              It(Lt.matte, ...q),
              [0, 0, 1],
            ));
        }
      }
    }
  }
  Ze(n, r - 0.1, h(l) - 1, p - 0.1, l + 0.1, h(l) + 0.02, m + 0.1, u);
  {
    let x = e.x1 - 1.5,
      v = Math.max(l + 6, x - 42),
      y = i.real ? e.z0 + 2 : a - 20,
      M = i.real ? e.z0 + 28 : a + 12,
      S = Math.min(Yt(v, y), Yt(x, M), Yt(x, y), Yt(v, M)),
      w = Math.max(Yt(v, y), Yt(x, M), Yt(x, y), Yt(v, M)) + Ke,
      z = 23 * 3.3 + 3;
    (ys(
      n,
      [
        [v, y],
        [x, y],
        [x, M],
        [v, M],
      ],
      S - 1,
      w + z,
      yn(sn.OFFICE, be.precast, 0.92, 0.9, 0.86),
      { vBase: w },
    ),
      Ze(
        n,
        v - 0.3,
        w + z,
        y - 0.3,
        x + 0.3,
        w + z + 1.2,
        M + 0.3,
        Be(be.precast, 0.9),
      ),
      Ze(
        n,
        v + 5,
        w + z + 1.2,
        y + 8,
        x - 5,
        w + z + 5,
        M - 8,
        Be(be.precast, 0.8),
      ));
    let _ = i.real ? y + 2 : a - 14,
      R = i.real ? M - 2 : a + 8;
    ys(
      n,
      [
        [l, _],
        [v, _],
        [v, R],
        [l, R],
      ],
      S - 1,
      Math.min(c + d - 6, w + 20),
      yn(sn.WIN, be.terracotta, 0.9),
      { vBase: h(l) + Ke, cap: !0, capCol: It(Lt.stone, 0.3, 0.3, 0.3) },
    );
  }
  if (i.real) {
    let x = l,
      v = e.x1 - 1.5,
      y = e.z0 + 30,
      M = e.z1 - 1,
      S = Math.max(Yt(v, y), Yt(v, M)) + Ke;
    (ys(
      n,
      [
        [x, y],
        [v, y],
        [v, M],
        [x, M],
      ],
      h(v) - 1,
      S + 16,
      yn(sn.WIN, be.terracotta, 0.95),
      { vBase: S, cap: !0, capCol: It(Lt.stone, 0.3, 0.3, 0.3) },
    ),
      Ze(n, x, S + 16, y - 0.3, v + 0.3, S + 16.8, M + 0.3, u));
  }
  (i.colliders.push({ t: "box", x0: e.x0, z0: e.z0, x1: e.x1, z1: e.z1 }),
    ru(i, (x, v) => x > s.x0 - 1 && x < e.x0 + 0.5 && Math.abs(v - a) < 9, [
      "lamp",
      "tree",
      "hydrant",
    ]),
    Gh(i, s, (x, v) => x < e.x0 && Math.abs(v - a) < 10),
    gn(i.group, n, t.lm, "Fairmont"),
    gn(i.group, o, t.ds, "FairmontFlags", { shadow: !1 }));
}
En();
function pb(i, t, e, s, n, o, a, r, l, c, h) {
  let f = [
    [t - (s * l) / 2, r, e - (n * l) / 2],
    [t + (s * l) / 2, r, e + (n * l) / 2],
  ];
  for (let u = 0; u <= 8; u++) {
    let d = (u / 8) * Math.PI;
    f.push([
      t + (s * Math.cos(d) * l) / 2,
      c + (Math.sin(d) * l) / 2,
      e + (n * Math.cos(d) * l) / 2,
    ]);
  }
  ne(i, f, h, [o, 0, a], (u) => [(u[0] - t) * s + (u[2] - e) * n, u[1] - r]);
}
