// app 119 — math
// Lines 84877-85281 of readable/app.pretty.js (statement-aligned).
function QP(o, t) {
  let e = Hi(12, 13),
    s = Wa(12, 13),
    n = new Be(),
    i = 26.5,
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
        ].map(([z, A]) => $t(c + z * i, h + A * i)),
      ) + Ze,
    u = (z) => i + ((a - i) * (z - f)) / r,
    d = f + 13.5,
    p = We(we.granite, 0.95),
    m = We(we.lawn, 0.8, 0.9, 0.75),
    g = (z, A, T, E, R, P = 0.03, C = 4) =>
      _l(n, z, A, T, E, C, (I, L) => $t(I, L) + Ze + P, R),
    b = c + i + 5;
  {
    let z = c - i - 1.2,
      A = c + i + 1.2,
      T = h - i - 1.2,
      E = h + i + 1.2;
    (g(e.x0, e.z0, b, T, p),
      g(e.x0, E, b, e.z1, p),
      g(e.x0, T, z, E, p),
      g(A, T, b, E, p));
  }
  (g(b, e.z0, e.x1, e.z1, m, 0.04, 5),
    Ss(
      n,
      [
        [c - i - 1.2, h - i - 1.2],
        [c + i + 1.2, h - i - 1.2],
        [c + i + 1.2, h + i + 1.2],
        [c - i - 1.2, h + i + 1.2],
      ],
      f - 3,
      f + 0.02,
      We(we.polgranite, 0.7),
      { cap: !0, capCol: p },
    ));
  let v = [i / 64, a / 64, r / 256, (ln.TAPY * 16 + we.precast + 0.5) / 256],
    x = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ],
    y = (z, A, T) => {
      let [E, R] = x[z],
        P = u(T);
      return [c + E * P + R * A, T, h + R * P - E * A];
    };
  for (let z = 0; z < 4; z++) {
    let A = u(d),
      T = u(f + r);
    n.quad(
      y(z, -A, d),
      y(z, A, d),
      y(z, T, f + r),
      y(z, -T, f + r),
      [-A, d - f],
      [A, d - f],
      [T, r],
      [-T, r],
      v,
    );
  }
  let M = f + 118,
    S = f + r + 9,
    w = 5.6,
    _ = We(we.precast, 0.93, 0.92, 0.9);
  for (let z of [1, -1]) {
    let A = c + z * u(M),
      T = (C) => c + z * u(C);
    z > 0
      ? n.wall(
          A,
          h + w,
          A,
          h - w,
          M,
          M,
          S,
          S,
          Tn(ln.WIN, we.precast, 0.93),
          0,
          M,
        )
      : n.wall(
          A,
          h - w,
          A,
          h + w,
          M,
          M,
          S,
          S,
          Tn(ln.WIN, we.precast, 0.93),
          0,
          M,
        );
    for (let C of [-1, 1]) {
      let I = h + C * w,
        L = Math.min(S, f + r),
        F = [T(M), M, I],
        O = [A, M, I],
        B = [A, S, I],
        H = [T(L), L, I],
        N = [T(L), S, I];
      oe(n, [F, O, B, N, H], _, [0, 0, C], (D) => [D[0] * z, D[1] - f]);
    }
    let E = c + z * (a - 0.2);
    z > 0
      ? n.wall(E, h - w, E, h + w, f + r, f + r, S, S, _)
      : n.wall(E, h + w, E, h - w, f + r, f + r, S, S, _);
    let R = Math.min(E, A),
      P = Math.max(E, A);
    (n.quad(
      [R, S, h + w],
      [P, S, h + w],
      [P, S, h - w],
      [R, S, h - w],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      Lt(Ct.stone, 0.4, 0.4, 0.4),
      [0, 1, 0],
    ),
      ss(n, R - 0.2, S, h - w - 0.2, P + 0.2, S + 0.8, h + w + 0.2, _));
  }
  {
    let z = a,
      A = 0.3,
      T = f + r,
      E = f + l,
      R = rj(we.precast, 0.86, z, E - T),
      P = 12;
    for (let C = 0; C < 4; C++) {
      let [I, L] = x[C],
        F = (O, B) => {
          let H = (B - T) / (E - T),
            N = z + (A - z) * H;
          return [c + I * N + L * O * N, B, h + L * N - I * O * N];
        };
      n.quad(
        F(-1, T),
        F(1, T),
        F(1, E),
        F(-1, E),
        [-z, 0],
        [z, 0],
        [A, E - T],
        [-A, E - T],
        R,
      );
    }
    (ss(
      n,
      c - 0.9,
      E - 16,
      h - 0.9,
      c + 0.9,
      E - 12,
      h + 0.9,
      wn(1, 0.92, 0.75),
    ),
      Ce(n, [c, E, h], [c, E + 2.5, h], 0.12, Lt(Ct.metal, 0.5, 0.5, 0.5), 6),
      ss(
        n,
        c - 0.35,
        E + 2.5,
        h - 0.35,
        c + 0.35,
        E + 3.1,
        h + 0.35,
        wn(1, 0.05, 0.02),
      ));
  }
  {
    let z = We(we.precast, 0.9);
    for (let R = 0; R < 4; R++) {
      let [P, C] = x[R],
        I = u(d - 3) + 0.4,
        L = u(d) + 0.4,
        F = (U, G, W) => [c + P * W + C * U, G, h + C * W - P * U];
      n.quad(
        F(-I, d - 3, I),
        F(I, d - 3, I),
        F(L, d, L),
        F(-L, d, L),
        [-I, 0],
        [I, 0],
        [L, 3],
        [-L, 3],
        z,
      );
      let O = u(d - 3) - 1.5;
      n.quad(
        F(-O, d - 3, O),
        F(O, d - 3, O),
        F(I, d - 3, I),
        F(-I, d - 3, I),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        Lt(Ct.stone, 0.55, 0.55, 0.53),
        null,
      );
      let B = 6.1,
        H = Math.floor((2 * u(f)) / B);
      for (let U = 0; U <= H; U++) {
        let G = (-H * B) / 2 + U * B,
          W = y(R, G * (u(f) / u(f)), f),
          V = y(R, (G * u(d - 3)) / u(f), d - 3);
        Ce(n, [W[0], W[1] - 0.5, W[2]], V, [0.62, 0.55], z, 4, !1);
      }
      let N = y(R, -u(f), f),
        D = y(R, -u(d - 3), d - 3);
      Ce(n, [N[0], N[1] - 0.5, N[2]], D, [1.2, 1], z, 4, !1);
    }
    let A = u(f) - 4.5,
      T = [
        [c - A, h - A],
        [c + A, h - A],
        [c + A, h + A],
        [c - A, h + A],
      ];
    Ss(n, T, f, d - 3, Tn(ln.LIGHT, 0, 0.1, 0.085, 0.065));
    for (let [R, P, C, I] of [
      [c + A, h - A, c - A, h - A],
      [c + A, h + A, c + A, h - A],
      [c - A, h + A, c + A, h + A],
      [c - A, h - A, c - A, h + A],
    ]) {
      let L = Math.hypot(C - R, I - P),
        F = (-(I - P) / L) * 0.05,
        O = ((C - R) / L) * 0.05;
      n.wall(
        R + F,
        P + O,
        C + F,
        I + O,
        d - 4.2,
        d - 4.2,
        d - 3.8,
        d - 3.8,
        wn(0.9, 0.8, 0.6),
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
      Lt(Ct.stone, 0.5, 0.5, 0.48),
      [0, -1, 0],
    );
  }
  o.colliders.push({
    t: "box",
    x0: c - u(f) - 0.6,
    z0: h - u(f) - 0.6,
    x1: c + u(f) + 0.6,
    z1: h + u(f) + 0.6,
  });
  {
    let z = (N, D) => js(N, D, 41),
      A = Lt(Ct.matte, 0.2, 0.08, 0.05),
      T = Lt(Ct.leaf, 0.035, 0.07, 0.03),
      E = Lt(Ct.leaf, 0.045, 0.085, 0.035),
      R = b + 3,
      P = e.x1 - 3,
      C = e.z0 + 3,
      I = e.z1 - 3,
      L = 0,
      F = [];
    for (let N = 0; N < 90 && L < 34; N++) {
      let D = R + z(N, 1) * (P - R),
        U = C + z(N, 2) * (I - C);
      if (
        Math.hypot(D - (R + P) / 2, U - h) < 7 ||
        o.colliders.some((J) => J.redwood && Math.hypot(J.x - D, J.z - U) < 4.2)
      )
        continue;
      let G = $t(D, U) + Ze,
        W = 22 + z(N, 3) * 14,
        V = 0.45 + 0.25 * z(N, 4);
      Ce(n, [D, G - 0.3, U], [D, G + W, U], [V, 0.08], A, 6);
      let $ = 5;
      for (let J = 0; J < $; J++) {
        let X = G + 5 + ((W - 5) * J) / $,
          tt = G + 5 + ((W - 5) * (J + 1.6)) / $,
          Z = (2.8 + 1.2 * z(N, 5)) * (1 - J / ($ + 0.6));
        for (
          ;
          F.some(
            (q) =>
              Math.abs(q[3] - X) < 0.08 &&
              Math.hypot(q[0] - D, q[1] - U) < q[2] + Z,
          );
        )
          X += 0.09;
        (F.push([D, U, Z, X]),
          qe(
            n,
            D,
            U,
            [
              [Z, X],
              [Z * 0.55, X + (tt - X) * 0.45],
              [0.05, Math.min(tt, G + W + 1)],
            ],
            7,
            J % 2 ? T : E,
            { rf: (q, j, K) => q * (0.8 + 0.4 * js(N * 7 + J, K, 3)) },
          ),
          fc(n, D, X, U, Z * 0.9, 7, T, !0));
      }
      (o.colliders.push({ t: "circ", x: D, z: U, r: V + 0.15, redwood: !0 }),
        L++);
    }
    for (let N of o.colliders) N.redwood && delete N.redwood;
    let O = (R + P) / 2,
      B = h,
      H = $t(O, B) + Ze;
    (qe(
      n,
      O,
      B,
      [
        [4.2, H - 0.2],
        [4.2, H + 0.55],
        [3.8, H + 0.55],
        [3.8, H + 0.35],
      ],
      32,
      We(we.polgranite, 0.8),
    ),
      qe(
        n,
        O,
        B,
        [
          [3.8, H + 0.35],
          [0.01, H + 0.35],
        ],
        32,
        Lt(Ct.water, 0.02, 0.04, 0.045),
      ),
      o.colliders.push({ t: "circ", x: O, z: B, r: 4.3 }));
    for (let N = 0; N < 6; N++) {
      let D = R + 2 + (N * (P - R - 4)) / 5,
        U = N % 2 ? I - 1.2 : C + 1.2,
        G = $t(D, U) + Ze;
      (ss(
        n,
        D - 0.9,
        G + 0.42,
        U - 0.25,
        D + 0.9,
        G + 0.48,
        U + 0.25,
        Lt(Ct.matte, 0.25, 0.16, 0.09),
      ),
        ss(
          n,
          D - 0.8,
          G,
          U - 0.2,
          D - 0.7,
          G + 0.42,
          U + 0.2,
          Lt(Ct.metal, 0.2, 0.2, 0.2),
        ),
        ss(
          n,
          D + 0.7,
          G,
          U - 0.2,
          D + 0.8,
          G + 0.42,
          U + 0.2,
          Lt(Ct.metal, 0.2, 0.2, 0.2),
        ));
    }
  }
  (xf(o, s), vn(o.group, n, t.lm, "Transamerica"));
}
