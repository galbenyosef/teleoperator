// app 122 — math
// Lines 85036-85571 of readable/app.pretty.js (statement-aligned).
function S7(i, t) {
  let e = Ei(11, 5),
    s = new Ce(),
    n = 1188,
    o = 371.5,
    a = 12.5,
    r = Math.max(
      ...[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([P, I]) => Yt(n + P * a, o + I * a)),
    ),
    l = r + Ke + 0.4,
    c = !!i.real,
    [h, f] = c && i.site?.loopL ? i.site.loopL : [n + a + 19, o + 4],
    u = 13,
    d = c ? 4.8 : 5.5;
  ru(
    i,
    (P, I) =>
      (Math.abs(P - n) < a + 6 && Math.abs(I - o) < a + 6) ||
      Math.hypot(P - h, I - f) < u + 2,
    ["tree", "lamp", "hydrant", "car"],
  );
  let p = nl(be.coit, 0.97, 0.95, 70),
    m = nl(be.coit, 0.9, 0.88, 12),
    g = 7.2;
  (ys(
    s,
    [
      [n - a, o - a],
      [n + a, o - a],
      [n + a, o + a],
      [n - a, o + a],
    ],
    r - 3,
    l + g,
    m,
    { vBase: l },
  ),
    s.quad(
      [n - a, l + g, o + a],
      [n + a, l + g, o + a],
      [n + a, l + g, o - a],
      [n - a, l + g, o - a],
      [0, 0],
      [2 * a, 0],
      [2 * a, 2 * a],
      [0, 2 * a],
      Be(be.granite, 0.85),
      [0, 1, 0],
    ));
  let b = (P, I, L, F) => Ze(s, P, l + g, I, L, l + g + 1.05, F, m);
  (b(n - a, o - a, n + a, o - a + 0.35),
    b(n - a, o + a - 0.35, n + a, o + a),
    b(n - a, o - a + 0.35, n - a + 0.35, o + a - 0.35),
    b(n + a - 0.35, o - a + 0.35, n + a, o + a - 0.35),
    Ze(
      s,
      n - a - 0.15,
      l + g + 1.05,
      o - a - 0.15,
      n + a + 0.15,
      l + g + 1.25,
      o - a + 0.5,
      m,
    ),
    Ze(
      s,
      n - a - 0.15,
      l + g + 1.05,
      o + a - 0.5,
      n + a + 0.15,
      l + g + 1.25,
      o + a + 0.15,
      m,
    ),
    Ze(
      s,
      n - a - 0.15,
      l + g + 1.05,
      o - a + 0.5,
      n - a + 0.5,
      l + g + 1.25,
      o + a - 0.5,
      m,
    ),
    Ze(
      s,
      n + a - 0.5,
      l + g + 1.05,
      o - a + 0.5,
      n + a + 0.15,
      l + g + 1.25,
      o + a - 0.5,
      m,
    ),
    Ze(
      s,
      n - a - 0.3,
      l + g - 0.6,
      o - a - 0.3,
      n + a + 0.3,
      l + g - 0.1,
      o + a + 0.3,
      m,
    ));
  {
    let P = n + a + 0.6;
    Ze(s, n + a, r - 1, o - 4.2, P, l + g - 0.6, o + 4.2, m);
    let I = (L, F, N, B, H, O, D) => {
      let U = [];
      U.push([L, B, F - N / 2]);
      for (let q = 0; q <= 10; q++) {
        let W = Math.PI - (q / 10) * Math.PI;
        U.push([
          L,
          H - N / 2 + (Math.sin(W) * N) / 2,
          F + (Math.cos(W) * N) / 2,
        ]);
      }
      (U.push([L, B, F + N / 2]),
        ne(s, U, O, [D, 0, 0], (q) => [q[2], q[1] - B]));
    };
    I(P + 0.09, o, 3.2, l - 0.2, l + 4.6, It(Lt.metal, 0.12, 0.08, 0.05), 1);
    for (let L of [-8.5, 8.5])
      I(
        n + a + 0.09,
        o + L,
        1.4,
        l + 1.2,
        l + 4.2,
        It(Lt.glass, 0.03, 0.035, 0.04),
        1,
      );
    for (let L = 0; L < 4; L++)
      Ze(
        s,
        P,
        L < 3 ? l - 0.2 - (L + 1) * 0.18 : r - 1,
        o - 3.5 - L * 0.3,
        P + 1.4 + L * 0.45,
        l - 0.2 - L * 0.18,
        o + 3.5 + L * 0.3,
        Be(be.granite, 0.8),
      );
  }
  for (let [P, I] of [
    [-1, 0],
    [0, -1],
    [0, 1],
  ])
    for (let L of [-7, 0, 7]) {
      let F = n + P * (a + 0.09),
        N = o + I * (a + 0.09),
        B = -I,
        H = P,
        O = [F + B * (L - 0.7), l + 1.4, N + H * (L - 0.7)],
        D = [F + B * (L + 0.7), l + 1.4, N + H * (L + 0.7)],
        U = [O, D];
      for (let G = 0; G <= 8; G++) {
        let q = (G / 8) * Math.PI;
        U.push([
          F + B * (L + 0.7 * Math.cos(q)),
          l + 4.2 + 0.7 * Math.sin(q),
          N + H * (L + 0.7 * Math.cos(q)),
        ]);
      }
      (U.push(O),
        ne(s, U.slice(0, -1), It(Lt.glass, 0.03, 0.035, 0.04), [P, 0, I]));
    }
  i.colliders.push({
    t: "box",
    x0: n - a,
    z0: o - a,
    x1: n + a + 2,
    z1: o + a,
  });
  let x = l + g,
    v = l + 57.5,
    y = 5.6,
    M = 5.15,
    S = 20,
    w = S * 8,
    z = (P, I) =>
      P * (1 - 0.045 * Math.pow(Math.abs(Math.cos((I * S) / 2)), 0.6)),
    _ = [];
  for (let P = 0; P <= 8; P++) {
    let I = P / 8,
      L = x + (v - x) * I;
    _.push([y + (M - y) * (I * I * 0.6 + I * 0.4), L]);
  }
  (Oe(
    s,
    n,
    o,
    [
      [y + 0.45, x],
      [y + 0.45, x + 1.1],
      [y + 0.1, x + 1.3],
    ],
    48,
    p,
  ),
    Oe(s, n, o, _, w, p, { rf: (P, I) => z(P, I) }));
  let R = v,
    T = v + 5.6,
    E = M + 0.15,
    A = 12;
  Oe(
    s,
    n,
    o,
    [
      [M + 0.35, R - 0.4],
      [M + 0.35, R + 0.3],
      [E, R + 0.35],
    ],
    48,
    p,
  );
  let C = ((2 * Math.PI * E) / A) * 0.58;
  for (let P = 0; P < A; P++) {
    let I = -(P / A) * Math.PI * 2,
      L = C / E / 2,
      F = Math.PI / A,
      N = I + L,
      B = I + 2 * F - L,
      H = [];
    for (let W of [N, B]) H.push(W);
    let O = (W, V, Y) => [n + Math.cos(W) * V, Y, o + Math.sin(W) * V],
      D = I - L,
      U = I - 2 * F + L;
    (s.quad(
      O(D, E, R),
      O(U, E, R),
      O(U, E, T),
      O(D, E, T),
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      p,
    ),
      s.quad(
        O(U, E, R),
        O(U, E - 0.9, R),
        O(U, E - 0.9, T),
        O(U, E, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ),
      s.quad(
        O(D, E - 0.9, R),
        O(D, E, R),
        O(D, E, T),
        O(D, E - 0.9, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ));
    let G = T - C / 2 - 0.2,
      q = 8;
    for (let W = 0; W < q; W++) {
      let V = W / q,
        Y = (W + 1) / q,
        $ = I + L - 2 * L * V,
        st = I + L - 2 * L * Y,
        Q = G + (Math.sin(V * Math.PI) * C) / 2,
        j = G + (Math.sin(Y * Math.PI) * C) / 2;
      (s.quad(
        O($, E, Q),
        O(st, E, j),
        O(st, E, T),
        O($, E, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ),
        s.quad(
          O(st, E, j),
          O($, E, Q),
          O($, E - 0.9, Q),
          O(st, E - 0.9, j),
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          p,
        ));
    }
  }
  (Oe(
    s,
    n,
    o,
    [
      [E - 0.9, R],
      [E - 0.9, T],
    ],
    48,
    yn(sn.LIGHT, 0, 0.16, 0.13, 0.1),
  ),
    Oe(
      s,
      n,
      o,
      [
        [E, T],
        [E + 0.55, T + 0.35],
        [E + 0.55, T + 0.9],
        [E + 0.2, T + 1],
        [E + 0.2, T + 2.5],
        [E + 0.5, T + 2.7],
        [E + 0.5, T + 3],
        [E - 0.3, T + 3.05],
      ],
      64,
      p,
    ),
    Oe(
      s,
      n,
      o,
      [
        [E - 0.3, T + 3.05],
        [E - 0.3, T + 2.6],
        [0.01, T + 2.6],
      ],
      32,
      Be(be.granite, 0.6),
    ),
    Ze(
      s,
      n - 0.25,
      T + 3.05,
      o - 0.25,
      n + 0.25,
      T + 3.5,
      o + 0.25,
      bn(1, 0.05, 0.02),
    ));
  {
    let P = It(Lt.stone, 0.085, 0.085, 0.09),
      I = It(Lt.stone, 0.42, 0.41, 0.39),
      L = (D, U) => Yt(D, U) + Ke + 0.03,
      F = 40,
      N = [u, d];
    if (!c) {
      let D = N.map((G) => {
          let q = [];
          for (let W = 0; W < F; W++) {
            let V = -(W / F) * Math.PI * 2,
              Y = h + Math.cos(V) * G,
              $ = f + Math.sin(V) * G;
            q.push([Y, L(Y, $), $]);
          }
          return q;
        }),
        U = new Ce();
      for (let G = 0; G < F; G++) {
        let q = D[0][G],
          W = D[0][(G + 1) % F],
          V = D[1][(G + 1) % F],
          Y = D[1][G];
        ne(s, [q, W, V, Y], P, [0, 1, 0], ($) => [$[0], $[2]]);
      }
    }
    let B = Yt(h, f) + Ke + 0.2;
    (Oe(
      s,
      h,
      f,
      [
        [d, B - 0.6],
        [d, B],
        [d - 0.5, B],
      ],
      40,
      I,
    ),
      ql(s, h, B, f, d - 0.5, 40, Be(be.lawn, 0.8, 0.9, 0.75)),
      Ze(
        s,
        h - 1.6,
        B - 0.3,
        f - 1.6,
        h + 1.6,
        B + 0.5,
        f + 1.6,
        Be(be.polgranite, 0.75),
      ),
      Ze(
        s,
        h - 1.2,
        B + 0.5,
        f - 1.2,
        h + 1.2,
        B + 3.2,
        f + 1.2,
        Be(be.polgranite, 0.75),
      ),
      Ze(
        s,
        h - 1.4,
        B + 3.2,
        f - 1.4,
        h + 1.4,
        B + 3.5,
        f + 1.4,
        Be(be.polgranite, 0.75),
      ));
    let H = Be(be.bronze, 0.75),
      O = B + 3.5;
    if (
      (Oe(
        s,
        h,
        f,
        [
          [0.62, O],
          [0.66, O + 0.5],
          [0.55, O + 1.2],
          [0.42, O + 1.9],
          [0.5, O + 2.5],
          [0.55, O + 2.9],
          [0.28, O + 3.15],
          [0.16, O + 3.25],
        ],
        12,
        H,
      ),
      Oe(
        s,
        h,
        f,
        [
          [0.16, O + 3.2],
          [0.2, O + 3.35],
          [0.21, O + 3.55],
          [0.14, O + 3.75],
          [0.02, O + 3.8],
        ],
        10,
        H,
      ),
      Ae(
        s,
        [h - 0.5, O + 2.7, f + 0.15],
        [h - 0.95, O + 1.9, f + 0.35],
        0.12,
        H,
        5,
        !0,
      ),
      Ae(
        s,
        [h - 0.95, O + 1.85, f + 0.35],
        [h - 1.05, O + 0.2, f + 0.45],
        0.05,
        H,
        4,
        !0,
      ),
      Ae(
        s,
        [h + 0.5, O + 2.7, f - 0.1],
        [h + 0.7, O + 2, f - 0.3],
        0.12,
        H,
        5,
        !0,
      ),
      i.colliders.push({ t: "circ", x: h, z: f, r: d }),
      !c)
    )
      for (let D = 0; D < F; D++) {
        let U = -(D / F) * Math.PI * 2,
          G = -((D + 1) / F) * Math.PI * 2,
          q = u + 0.25,
          W = h + Math.cos(U) * q,
          V = f + Math.sin(U) * q,
          Y = h + Math.cos(G) * q,
          $ = f + Math.sin(G) * q;
        s.wall(
          W,
          V,
          Y,
          $,
          Yt(W, V),
          Yt(Y, $),
          Yt(W, V) + Ke + 0.15,
          Yt(Y, $) + Ke + 0.15,
          I,
        );
      }
    c ||
      il(
        s,
        n + a + 2.5,
        o - 3,
        h - u + 0.5,
        o + 3,
        3,
        (D, U) => Yt(D, U) + Ke + 0.04,
        P,
      );
  }
  for (let P = 0, I = 0; P < 200 && I < 22 && !c; P++) {
    let L = e.x0 + 3 + Ws(P, 5, 17) * (e.x1 - e.x0 - 6),
      F = e.z0 + 3 + Ws(P, 6, 17) * (e.z1 - e.z0 - 6);
    (Math.abs(L - n) < a + 7 && Math.abs(F - o) < a + 7) ||
      Math.hypot(L - h, F - f) < u + 4 ||
      (Math.abs(F - o) < 5 && L < h && L > n) ||
      (i.inst.push({
        kind: "tree",
        x: L,
        y: Yt(L, F) + Ke,
        z: F,
        rot: Ws(P, 7) * 6.28,
        scale: 1.3 + 0.6 * Ws(P, 8),
      }),
      i.colliders.push({ t: "circ", x: L, z: F, r: 0.4 }),
      I++);
  }
  gn(i.group, s, t.lm, "CoitTower");
}
