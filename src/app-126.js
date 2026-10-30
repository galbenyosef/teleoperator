// app 126 — math
// Lines 87120-87426 of readable/app.pretty.js (statement-aligned).
function nC(o, t) {
  let e = Hi(7, 15),
    s = Wa(7, 15),
    n = new Be(),
    i = new Be(),
    a = (e.z0 + e.z1) / 2,
    r = e.x0 + 4.2,
    l = o.real ? Math.max(r + 54, e.x1 - 49.5) : r + 54,
    c = Math.max($t(e.x0, e.z0), $t(e.x0, e.z1)) + Ze,
    h = (v) => Math.min($t(v, e.z0), $t(v, e.z1)),
    f = Tn(ln.HOTEL, we.terracotta, 0.98, 0.96, 0.92),
    u = zl(we.terracotta, 0.97, 0.95, 34),
    d = 7.2 + 6 * 3.7 + 0.6,
    p = e.z0 + 0.5,
    m = e.z1 - 0.5,
    g = (v, x, y, M) =>
      n.wall(
        v,
        x,
        y,
        M,
        Math.min($t(v, x), $t(y, M)) - 1,
        Math.min($t(v, x), $t(y, M)) - 1,
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
      Lt(Ct.stone, 0.32, 0.31, 0.3),
      [0, 1, 0],
    ));
  let b = (v, x, y, M) => {
    ss(n, r - y, v, p - y, l + y, v + x, m + y, M);
  };
  (b(c + 7.2 - 0.5, 0.55, 0.35, u),
    b(c + d - 0.2, 0.9, 1.1, u),
    b(c + d + 0.7, 1.1, 0.4, Tn(ln.TILE, we.terracotta, 0.9)),
    b(c + d + 1.8, 0.2, 0.75, u));
  for (let [v, x] of [
    [p, p + 11],
    [m - 11, m],
    [a - 9, a + 9],
  ]) {
    let y = r - 0.6;
    n.wall(y, v, y, x, c - 1, c - 1, c + d + 4.2, c + d + 4.2, f, 0, c);
    for (let M of [v, x])
      M === v
        ? n.wall(r, v, y, v, c - 1, c - 1, c + d + 4.2, c + d + 4.2, u, 0, c)
        : n.wall(y, x, r, x, c - 1, c - 1, c + d + 4.2, c + d + 4.2, u, 0, c);
    (ss(n, y - 0.5, c + d + 4.2, v - 0.5, r + 12, c + d + 5.1, x + 0.5, u),
      ss(n, y + 0.1, c + d + 1.9, v + 0.1, r + 11.5, c + d + 4.2, x - 0.1, f));
  }
  {
    let v = e.x0 - 0.2,
      x = a - 8,
      y = a + 8,
      M = 7.8,
      S = (_, z) => $t(_, z) + Ze;
    for (let _ = 0; _ < 6; _++) {
      let z = x + 0.8 + (_ * (y - x - 1.6)) / 5,
        A = v + 0.8,
        T = S(A, z);
      (qe(
        n,
        A,
        z,
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
        zl(we.stucco, 0.97, 0.93, 10),
        {
          rf: (E, R, P, C) =>
            C > T + 0.6 && C < T + M - 1.2
              ? E * (1 - 0.06 * Math.abs(Math.cos(R * 8)))
              : E,
        },
      ),
        o.colliders.push({ t: "circ", x: A, z, r: 0.8 }));
    }
    (ss(n, v, c + M, x, r, c + M + 1.3, y, u),
      ss(
        n,
        v + 0.1,
        c + M + 1.3,
        x + 0.1,
        r,
        c + M + 2.3,
        y - 0.1,
        Tn(ln.TILE, we.terracotta, 0.85),
      ),
      n.quad(
        [v, c + M - 0.06, x],
        [r, c + M - 0.06, x],
        [r, c + M - 0.06, y],
        [v, c + M - 0.06, y],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        wn(0.9, 0.8, 0.6),
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
    for (let _ = 0; _ < 9; _++) {
      let z = x + 0.8 + (_ * (y - x - 1.6)) / 8,
        A = v + 0.4,
        T = c + M + 2.3,
        E = [A - 3, T + 3.6, z + (_ - 4) * 0.35];
      (Ce(n, [A, T, z], E, 0.045, Lt(Ct.metal, 0.75, 0.72, 0.6), 5),
        qe(
          n,
          E[0],
          E[2],
          [
            [0.01, E[1]],
            [0.1, E[1] + 0.08],
            [0.01, E[1] + 0.18],
          ],
          6,
          Lt(Ct.gold, 0.8, 0.6, 0.2),
        ));
      let R = _ % 2 === 0,
        P = w[_ % w.length],
        C = 2.1,
        I = 1.35,
        L = R ? 13 : 3,
        F = (O, B) => {
          let H = E[0] + (A - E[0]) * (0.05 + O * 0.55),
            N = E[1] + (T - E[1]) * (0.05 + O * 0.55),
            D = E[2] + (z - E[2]) * (0.05 + O * 0.55);
          return [
            H - 0.5 * B,
            N - B * I,
            D + 0.15 * Math.sin(O * 5 + B * 2 + _),
          ];
        };
      for (let O = 0; O < L; O++) {
        let B = O / L,
          H = (O + 1) / L,
          N = R ? (O % 2 === 0 ? w[0][0] : w[0][1]) : P[O];
        for (let D = 0; D < 4; D++) {
          let U = D / 4,
            G = (D + 1) / 4,
            W = N;
          (R && O < 7 && D < 2 && (W = [0.03, 0.05, 0.22]),
            oe(
              i,
              [F(U, B), F(G, B), F(G, H), F(U, H)],
              Lt(Ct.matte, ...W),
              [0, 0, 1],
            ));
        }
      }
    }
  }
  ss(n, r - 0.1, h(l) - 1, p - 0.1, l + 0.1, h(l) + 0.02, m + 0.1, u);
  {
    let v = e.x1 - 1.5,
      x = Math.max(l + 6, v - 42),
      y = o.real ? e.z0 + 2 : a - 20,
      M = o.real ? e.z0 + 28 : a + 12,
      S = Math.min($t(x, y), $t(v, M), $t(v, y), $t(x, M)),
      w = Math.max($t(x, y), $t(v, M), $t(v, y), $t(x, M)) + Ze,
      _ = 23 * 3.3 + 3;
    (Ss(
      n,
      [
        [x, y],
        [v, y],
        [v, M],
        [x, M],
      ],
      S - 1,
      w + _,
      Tn(ln.OFFICE, we.precast, 0.92, 0.9, 0.86),
      { vBase: w },
    ),
      ss(
        n,
        x - 0.3,
        w + _,
        y - 0.3,
        v + 0.3,
        w + _ + 1.2,
        M + 0.3,
        We(we.precast, 0.9),
      ),
      ss(
        n,
        x + 5,
        w + _ + 1.2,
        y + 8,
        v - 5,
        w + _ + 5,
        M - 8,
        We(we.precast, 0.8),
      ));
    let z = o.real ? y + 2 : a - 14,
      A = o.real ? M - 2 : a + 8;
    Ss(
      n,
      [
        [l, z],
        [x, z],
        [x, A],
        [l, A],
      ],
      S - 1,
      Math.min(c + d - 6, w + 20),
      Tn(ln.WIN, we.terracotta, 0.9),
      { vBase: h(l) + Ze, cap: !0, capCol: Lt(Ct.stone, 0.3, 0.3, 0.3) },
    );
  }
  if (o.real) {
    let v = l,
      x = e.x1 - 1.5,
      y = e.z0 + 30,
      M = e.z1 - 1,
      S = Math.max($t(x, y), $t(x, M)) + Ze;
    (Ss(
      n,
      [
        [v, y],
        [x, y],
        [x, M],
        [v, M],
      ],
      h(x) - 1,
      S + 16,
      Tn(ln.WIN, we.terracotta, 0.95),
      { vBase: S, cap: !0, capCol: Lt(Ct.stone, 0.3, 0.3, 0.3) },
    ),
      ss(n, v, S + 16, y - 0.3, x + 0.3, S + 16.8, M + 0.3, u));
  }
  (o.colliders.push({ t: "box", x0: e.x0, z0: e.z0, x1: e.x1, z1: e.z1 }),
    Vu(o, (v, x) => v > s.x0 - 1 && v < e.x0 + 0.5 && Math.abs(x - a) < 9, [
      "lamp",
      "tree",
      "hydrant",
    ]),
    xf(o, s, (v, x) => v < e.x0 && Math.abs(x - a) < 10),
    vn(o.group, n, t.lm, "Fairmont"),
    vn(o.group, i, t.ds, "FairmontFlags", { shadow: !1 }));
}
Pn();
function tx(o, t, e, s, n, i, a, r, l, c, h) {
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
  oe(o, f, h, [i, 0, a], (u) => [(u[0] - t) * s + (u[2] - e) * n, u[1] - r]);
}
