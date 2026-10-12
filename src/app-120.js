// app 120 — math
// Lines 84609-85013 of readable/app.pretty.js (statement-aligned).
function M7(i, t) {
  let e = Ei(12, 13),
    s = Ca(12, 13),
    n = new Ce(),
    o = 26.5,
    a = 6.85,
    r = 196,
    l = 260,
    c = 1289.5,
    h = 1050,
    f =
      Math.max(
        ...[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([_, R]) => Yt(c + _ * o, h + R * o)),
      ) + Ke,
    u = (_) => o + ((a - o) * (_ - f)) / r,
    d = f + 13.5,
    p = Be(be.granite, 0.95),
    m = Be(be.lawn, 0.8, 0.9, 0.75),
    g = (_, R, T, E, A, C = 0.03, P = 4) =>
      il(n, _, R, T, E, P, (I, L) => Yt(I, L) + Ke + C, A),
    b = c + o + 5;
  {
    let _ = c - o - 1.2,
      R = c + o + 1.2,
      T = h - o - 1.2,
      E = h + o + 1.2;
    (g(e.x0, e.z0, b, T, p),
      g(e.x0, E, b, e.z1, p),
      g(e.x0, T, _, E, p),
      g(R, T, b, E, p));
  }
  (g(b, e.z0, e.x1, e.z1, m, 0.04, 5),
    ys(
      n,
      [
        [c - o - 1.2, h - o - 1.2],
        [c + o + 1.2, h - o - 1.2],
        [c + o + 1.2, h + o + 1.2],
        [c - o - 1.2, h + o + 1.2],
      ],
      f - 3,
      f + 0.02,
      Be(be.polgranite, 0.7),
      { cap: !0, capCol: p },
    ));
  let x = [o / 64, a / 64, r / 256, (sn.TAPY * 16 + be.precast + 0.5) / 256],
    v = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ],
    y = (_, R, T) => {
      let [E, A] = v[_],
        C = u(T);
      return [c + E * C + A * R, T, h + A * C - E * R];
    };
  for (let _ = 0; _ < 4; _++) {
    let R = u(d),
      T = u(f + r);
    n.quad(
      y(_, -R, d),
      y(_, R, d),
      y(_, T, f + r),
      y(_, -T, f + r),
      [-R, d - f],
      [R, d - f],
      [T, r],
      [-T, r],
      x,
    );
  }
  let M = f + 118,
    S = f + r + 9,
    w = 5.6,
    z = Be(be.precast, 0.93, 0.92, 0.9);
  for (let _ of [1, -1]) {
    let R = c + _ * u(M),
      T = (P) => c + _ * u(P);
    _ > 0
      ? n.wall(
          R,
          h + w,
          R,
          h - w,
          M,
          M,
          S,
          S,
          yn(sn.WIN, be.precast, 0.93),
          0,
          M,
        )
      : n.wall(
          R,
          h - w,
          R,
          h + w,
          M,
          M,
          S,
          S,
          yn(sn.WIN, be.precast, 0.93),
          0,
          M,
        );
    for (let P of [-1, 1]) {
      let I = h + P * w,
        L = Math.min(S, f + r),
        F = [T(M), M, I],
        N = [R, M, I],
        B = [R, S, I],
        H = [T(L), L, I],
        O = [T(L), S, I];
      ne(n, [F, N, B, O, H], z, [0, 0, P], (D) => [D[0] * _, D[1] - f]);
    }
    let E = c + _ * (a - 0.2);
    _ > 0
      ? n.wall(E, h - w, E, h + w, f + r, f + r, S, S, z)
      : n.wall(E, h + w, E, h - w, f + r, f + r, S, S, z);
    let A = Math.min(E, R),
      C = Math.max(E, R);
    (n.quad(
      [A, S, h + w],
      [C, S, h + w],
      [C, S, h - w],
      [A, S, h - w],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      It(Lt.stone, 0.4, 0.4, 0.4),
      [0, 1, 0],
    ),
      Ze(n, A - 0.2, S, h - w - 0.2, C + 0.2, S + 0.8, h + w + 0.2, z));
  }
  {
    let _ = a,
      R = 0.3,
      T = f + r,
      E = f + l,
      A = oq(be.precast, 0.86, _, E - T),
      C = 12;
    for (let P = 0; P < 4; P++) {
      let [I, L] = v[P],
        F = (N, B) => {
          let H = (B - T) / (E - T),
            O = _ + (R - _) * H;
          return [c + I * O + L * N * O, B, h + L * O - I * N * O];
        };
      n.quad(
        F(-1, T),
        F(1, T),
        F(1, E),
        F(-1, E),
        [-_, 0],
        [_, 0],
        [R, E - T],
        [-R, E - T],
        A,
      );
    }
    (Ze(
      n,
      c - 0.9,
      E - 16,
      h - 0.9,
      c + 0.9,
      E - 12,
      h + 0.9,
      bn(1, 0.92, 0.75),
    ),
      Ae(n, [c, E, h], [c, E + 2.5, h], 0.12, It(Lt.metal, 0.5, 0.5, 0.5), 6),
      Ze(
        n,
        c - 0.35,
        E + 2.5,
        h - 0.35,
        c + 0.35,
        E + 3.1,
        h + 0.35,
        bn(1, 0.05, 0.02),
      ));
  }
  {
    let _ = Be(be.precast, 0.9);
    for (let A = 0; A < 4; A++) {
      let [C, P] = v[A],
        I = u(d - 3) + 0.4,
        L = u(d) + 0.4,
        F = (U, G, q) => [c + C * q + P * U, G, h + P * q - C * U];
      n.quad(
        F(-I, d - 3, I),
        F(I, d - 3, I),
        F(L, d, L),
        F(-L, d, L),
        [-I, 0],
        [I, 0],
        [L, 3],
        [-L, 3],
        _,
      );
      let N = u(d - 3) - 1.5;
      n.quad(
        F(-N, d - 3, N),
        F(N, d - 3, N),
        F(I, d - 3, I),
        F(-I, d - 3, I),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        It(Lt.stone, 0.55, 0.55, 0.53),
        null,
      );
      let B = 6.1,
        H = Math.floor((2 * u(f)) / B);
      for (let U = 0; U <= H; U++) {
        let G = (-H * B) / 2 + U * B,
          q = y(A, G * (u(f) / u(f)), f),
          W = y(A, (G * u(d - 3)) / u(f), d - 3);
        Ae(n, [q[0], q[1] - 0.5, q[2]], W, [0.62, 0.55], _, 4, !1);
      }
      let O = y(A, -u(f), f),
        D = y(A, -u(d - 3), d - 3);
      Ae(n, [O[0], O[1] - 0.5, O[2]], D, [1.2, 1], _, 4, !1);
    }
    let R = u(f) - 4.5,
      T = [
        [c - R, h - R],
        [c + R, h - R],
        [c + R, h + R],
        [c - R, h + R],
      ];
    ys(n, T, f, d - 3, yn(sn.LIGHT, 0, 0.1, 0.085, 0.065));
    for (let [A, C, P, I] of [
      [c + R, h - R, c - R, h - R],
      [c + R, h + R, c + R, h - R],
      [c - R, h + R, c + R, h + R],
      [c - R, h - R, c - R, h + R],
    ]) {
      let L = Math.hypot(P - A, I - C),
        F = (-(I - C) / L) * 0.05,
        N = ((P - A) / L) * 0.05;
      n.wall(
        A + F,
        C + N,
        P + F,
        I + N,
        d - 4.2,
        d - 4.2,
        d - 3.8,
        d - 3.8,
        bn(0.9, 0.8, 0.6),
      );
    }
    let E = u(d - 3) - 1.5;
    n.quad(
      [c - E, d - 3.01, h - E],
      [c + E, d - 3.01, h - E],
      [c + E, d - 3.01, h + E],
      [c - E, d - 3.01, h + E],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      It(Lt.stone, 0.5, 0.5, 0.48),
      [0, -1, 0],
    );
  }
  i.colliders.push({
    t: "box",
    x0: c - u(f) - 0.6,
    z0: h - u(f) - 0.6,
    x1: c + u(f) + 0.6,
    z1: h + u(f) + 0.6,
  });
  {
    let _ = (O, D) => Ws(O, D, 41),
      R = It(Lt.matte, 0.2, 0.08, 0.05),
      T = It(Lt.leaf, 0.035, 0.07, 0.03),
      E = It(Lt.leaf, 0.045, 0.085, 0.035),
      A = b + 3,
      C = e.x1 - 3,
      P = e.z0 + 3,
      I = e.z1 - 3,
      L = 0,
      F = [];
    for (let O = 0; O < 90 && L < 34; O++) {
      let D = A + _(O, 1) * (C - A),
        U = P + _(O, 2) * (I - P);
      if (
        Math.hypot(D - (A + C) / 2, U - h) < 7 ||
        i.colliders.some((Y) => Y.redwood && Math.hypot(Y.x - D, Y.z - U) < 4.2)
      )
        continue;
      let G = Yt(D, U) + Ke,
        q = 22 + _(O, 3) * 14,
        W = 0.45 + 0.25 * _(O, 4);
      Ae(n, [D, G - 0.3, U], [D, G + q, U], [W, 0.08], R, 6);
      let V = 5;
      for (let Y = 0; Y < V; Y++) {
        let $ = G + 5 + ((q - 5) * Y) / V,
          st = G + 5 + ((q - 5) * (Y + 1.6)) / V,
          Q = (2.8 + 1.2 * _(O, 5)) * (1 - Y / (V + 0.6));
        for (
          ;
          F.some(
            (j) =>
              Math.abs(j[3] - $) < 0.08 &&
              Math.hypot(j[0] - D, j[1] - U) < j[2] + Q,
          );
        )
          $ += 0.09;
        (F.push([D, U, Q, $]),
          Oe(
            n,
            D,
            U,
            [
              [Q, $],
              [Q * 0.55, $ + (st - $) * 0.45],
              [0.05, Math.min(st, G + q + 1)],
            ],
            7,
            Y % 2 ? T : E,
            { rf: (j, X, K) => j * (0.8 + 0.4 * Ws(O * 7 + Y, K, 3)) },
          ),
          ql(n, D, $, U, Q * 0.9, 7, T, !0));
      }
      (i.colliders.push({ t: "circ", x: D, z: U, r: W + 0.15, redwood: !0 }),
        L++);
    }
    for (let O of i.colliders) O.redwood && delete O.redwood;
    let N = (A + C) / 2,
      B = h,
      H = Yt(N, B) + Ke;
    (Oe(
      n,
      N,
      B,
      [
        [4.2, H - 0.2],
        [4.2, H + 0.55],
        [3.8, H + 0.55],
        [3.8, H + 0.35],
      ],
      32,
      Be(be.polgranite, 0.8),
    ),
      Oe(
        n,
        N,
        B,
        [
          [3.8, H + 0.35],
          [0.01, H + 0.35],
        ],
        32,
        It(Lt.water, 0.02, 0.04, 0.045),
      ),
      i.colliders.push({ t: "circ", x: N, z: B, r: 4.3 }));
    for (let O = 0; O < 6; O++) {
      let D = A + 2 + (O * (C - A - 4)) / 5,
        U = O % 2 ? I - 1.2 : P + 1.2,
        G = Yt(D, U) + Ke;
      (Ze(
        n,
        D - 0.9,
        G + 0.42,
        U - 0.25,
        D + 0.9,
        G + 0.48,
        U + 0.25,
        It(Lt.matte, 0.25, 0.16, 0.09),
      ),
        Ze(
          n,
          D - 0.8,
          G,
          U - 0.2,
          D - 0.7,
          G + 0.42,
          U + 0.2,
          It(Lt.metal, 0.2, 0.2, 0.2),
        ),
        Ze(
          n,
          D + 0.7,
          G,
          U - 0.2,
          D + 0.8,
          G + 0.42,
          U + 0.2,
          It(Lt.metal, 0.2, 0.2, 0.2),
        ));
    }
  }
  (Gh(i, s), gn(i.group, n, t.lm, "Transamerica"));
}
