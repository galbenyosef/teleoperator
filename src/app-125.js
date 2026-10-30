// app 125 — math
// Lines 86559-87119 of readable/app.pretty.js (statement-aligned).
function sC(o, t) {
  let e = Hi(5, 15),
    s = Wa(5, 15),
    n = new Be(),
    i = 1227.5,
    a = 604,
    r = e.x0 + 6,
    l = 11.5,
    c = o.real
      ? [
          [r, i - l],
          [a, i - l],
          [r, i + l],
          [a, i + l],
          [(r + a) / 2, i],
        ]
      : [
          [e.x0, e.z0],
          [e.x1, e.z0],
          [e.x0, e.z1],
          [e.x1, e.z1],
        ],
    h = Math.max(...c.map(([L, F]) => $t(L, F))),
    f = Math.min(...c.map(([L, F]) => $t(L, F)), $t(a + 4, i)),
    u = o.real ? (h + f) / 2 + Ze + 1.2 : h + Ze + 0.9,
    d = zl(we.grace, 0.95, 0.93, 55),
    p = zl(we.grace, 0.85, 0.83, 30),
    m = We(we.copper, 0.55, 0.62, 0.58),
    g = Tn(ln.GLASS, we.stainedglass, 1),
    b = Lt(Ct.glass, 0.02, 0.022, 0.025);
  _l(
    n,
    e.x0,
    e.z0,
    e.x1,
    e.z1,
    4,
    (L, F) => $t(L, F) + Ze + 0.03,
    We(we.granite, 0.9),
  );
  let v = e.x0 + 6,
    x = 10,
    y = 7.5,
    M = 7.5,
    S = 11.5,
    w = Math.min(u - 4, f - 1.5);
  Ss(
    n,
    [
      [v - 1, i - S - 1],
      [a + 1, i - S - 1],
      [a + 1, i + S + 1],
      [v - 1, i + S + 1],
    ],
    w,
    u,
    p,
    { cap: !0, capCol: We(we.granite, 0.85) },
  );
  let _ = Math.max(0.9, u - ($t(a + 4, i) + Ze)),
    z = o.real ? Math.max(5, Math.ceil(_ / 0.17)) : 5,
    A = o.real ? 0.33 : 0.5;
  for (let L = 0; L < z; L++)
    ss(
      n,
      a + 1 + (z - L - 1) * A,
      w,
      i - S - 1,
      a + 1 + (z - L) * A,
      u - (o.real ? (_ * (z - 1 - L)) / z : 0.18 * L),
      i + S + 1,
      We(we.granite, 0.85),
    );
  o.real &&
    o.colliders.push({
      t: "box",
      x0: a,
      z0: i - S - 1,
      x1: a + 1 + z * A,
      z1: i + S + 1,
    });
  {
    let L = a + 8,
      F = e.z0 + 11,
      O = $t(L, F) + Ze + 0.05;
    for (let B = 0; B < 12; B++) {
      let H = 1 + B * 0.4;
      qe(
        n,
        L,
        F,
        [
          [H + 0.05, O],
          [H - 0.05, O],
        ],
        40,
        Lt(Ct.stone, 0.22, 0.2, 0.18),
      );
    }
  }
  let T = v + 14,
    E = T + 13,
    R = 19,
    P = 12,
    C = 27,
    I = 37;
  for (let L of [-1, 1]) {
    let F = i + L * S,
      O = i + L * M;
    for (let [U, G] of [
      [v + 8, T],
      [E, a - x],
    ]) {
      L < 0
        ? n.wall(G, F, U, F, u, u, u + P, u + P, d, U, u)
        : n.wall(U, F, G, F, u, u, u + P, u + P, d, U, u);
      let W = [U, u + P, F],
        V = [G, u + P, F],
        $ = [G, u + P + 4, O],
        J = [U, u + P + 4, O];
      oe(n, [W, V, $, J], m, [0, 1, L], (Z) => [Z[0], Z[2] * 1 + Z[1]]);
      let X = L < 0 ? uh(G, F, U, F) : uh(U, F, G, F),
        tt = Math.max(1, Math.round((G - U) / 6.2));
      for (let Z = 0; Z <= tt; Z++) {
        let q = U + ((G - U) * Z) / tt;
        ss(
          n,
          q - 0.7,
          u - 0.5,
          L < 0 ? F - 1.8 : F - 0.1,
          q + 0.7,
          u + P + 1.6,
          L < 0 ? F + 0.1 : F + 1.8,
          d,
        );
        let j = [q, u + P + 1.6, F + L * 1.8],
          K = [q, u + C - 3, O];
        if ((Ce(n, j, K, [0.45, 0.35], d, 4), Z < tt)) {
          let nt =
            L < 0 ? G - (q + (G - U) / tt / 2) : q + (G - U) / tt / 2 - U;
          Wu(n, X, nt, u + 2.4, 1.9, u + 8.6, g);
          let Q = L < 0 ? uh(G, O, U, O) : uh(U, O, G, O);
          Wu(n, Q, nt, u + P + 5.5, 2.2, u + C - 4.2, g);
        }
      }
    }
    L < 0
      ? n.wall(a - x, O, v + 8, O, u + P, u + P, u + C, u + C, d, 0, u)
      : n.wall(v + 8, O, a - x, O, u + P, u + P, u + C, u + C, d, 0, u);
    let B = [v + 8, u + C, O],
      H = [a - x, u + C, O],
      N = [a - x, u + I, i],
      D = [v + 8, u + I, i];
    oe(n, [B, H, N, D], m, [0, 1, L], (U) => [
      U[0],
      Math.abs(U[2] - i) * 1.3 + U[1] * 0.3,
    ]);
  }
  for (let L of [-1, 1]) {
    let F = i + L * R;
    Ss(
      n,
      L < 0
        ? [
            [T, F],
            [E, F],
            [E, i - S],
            [T, i - S],
          ]
        : [
            [T, i + S],
            [E, i + S],
            [E, F],
            [T, F],
          ],
      u - 1,
      u + C,
      d,
      { vBase: u },
    );
    let O = (T + E) / 2;
    oe(
      n,
      [
        [T, u + C, F],
        [E, u + C, F],
        [O, u + I, F],
      ],
      d,
      [0, 0, L],
    );
    for (let [H, N] of [
      [T, O],
      [O, E],
    ]) {
      let D = [H, u + C, F],
        U = [N, u + C, F],
        G = [O, u + I, i + L * S * 0.5],
        W = [H === T ? T : E, u + C, i];
    }
    (oe(
      n,
      [
        [T, u + C, F],
        [T, u + C, i],
        [O, u + I, i],
        [O, u + I, F],
      ],
      m,
      [-1, 1, 0],
      (H) => [H[2], H[0] + H[1]],
    ),
      oe(
        n,
        [
          [E, u + C, F],
          [O, u + I, F],
          [O, u + I, i],
          [E, u + C, i],
        ],
        m,
        [1, 1, 0],
        (H) => [H[2], H[0] + H[1]],
      ));
    let B = L < 0 ? uh(E, F, T, F) : uh(T, F, E, F);
    for (let H of [-3.2, 0, 3.2])
      Wu(n, B, 6.5 + H, u + 3, 2, u + (H ? 12 : 14), g);
    {
      let H = [O, u + C - 5.5, F + L * 0.05],
        N = 3.2;
      oe(
        n,
        [
          [H[0] - N, H[1] - N, H[2]],
          [H[0] + N, H[1] - N, H[2]],
          [H[0] + N, H[1] + N, H[2]],
          [H[0] - N, H[1] + N, H[2]],
        ],
        Tn(ln.ROSE, Jb.rose, 0.95),
        [0, 0, L],
        (D) => [
          (L * (D[0] - H[0])) / (2 * N) + 0.5,
          (D[1] - H[1]) / (2 * N) + 0.5,
        ],
      );
    }
    for (let H of [T, E])
      ss(
        n,
        H - 0.9,
        u - 0.5,
        L < 0 ? F - 1.6 : F - 0.2,
        H + 0.9,
        u + C + 2,
        L < 0 ? F + 0.2 : F + 1.6,
        d,
      );
  }
  {
    let L = (T + E) / 2,
      F = u + I - 0.5;
    (qe(
      n,
      L,
      i,
      [
        [2.4, F],
        [2.4, F + 4.5],
        [2, F + 5.2],
        [1.6, F + 5.2],
        [1.6, F + 9],
        [0.05, F + 24],
      ],
      8,
      m,
      { flat: !0 },
    ),
      Ce(n, [L, F + 24, i], [L, F + 26.5, i], 0.08, We(we.bronze, 0.9), 4),
      Ce(
        n,
        [L - 0.7, F + 25.6, i],
        [L + 0.7, F + 25.6, i],
        0.07,
        We(we.bronze, 0.9),
        4,
      ));
  }
  {
    let L = v + 8,
      F = 5,
      O = [];
    for (let H = 0; H <= F; H++) {
      let N = Math.PI / 2 + (H / F) * Math.PI;
      O.push([L + Math.cos(N) * M * 1.05, i - Math.sin(N) * M * 1.05]);
    }
    for (let H = 0; H < F; H++) {
      let [N, D] = O[H],
        [U, G] = O[H + 1];
      n.wall(U, G, N, D, u - 1, u - 1, u + C, u + C, d, H * 4.6, u);
      let W = uh(U, G, N, D);
      (Wu(n, W, W.L / 2, u + 4, 1.9, u + C - 6, g),
        ss(n, N - 0.8, u - 0.5, D - 0.8, N + 0.8, u + C + 1, D + 0.8, d));
    }
    let B = [L, u + I, i];
    for (let H = 0; H < F; H++) {
      let [N, D] = O[H],
        [U, G] = O[H + 1];
      oe(n, [[U, u + C, G], [N, u + C, D], B], m, [
        N + U - 2 * L,
        1,
        D + G - 2 * i,
      ]);
    }
  }
  {
    for (let U of [-1, 1]) {
      let G = i + U * y,
        W = i + U * (y + x),
        V = Math.min(G, W),
        $ = Math.max(G, W),
        J = a - x,
        X = a;
      Ss(
        n,
        [
          [J, V],
          [X, V],
          [X, $],
          [J, $],
        ],
        u - 1,
        u + 50.5,
        d,
        { vBase: u },
      );
      for (let [q, j] of [
        [X, V],
        [X, $],
        [J, U < 0 ? V : $],
      ])
        (ss(n, q - 1.1, u - 0.5, j - 1.1, q + 1.1, u + 20, j + 1.1, d),
          ss(n, q - 0.8, u + 20, j - 0.8, q + 0.8, u + 50.5 - 1, j + 0.8, d),
          qe(
            n,
            q,
            j,
            [
              [0.9, u + 50.5 - 1],
              [0.9, u + 50.5 + 1.2],
              [0.05, u + 50.5 + 5.5],
            ],
            4,
            d,
            { flat: !0 },
          ));
      ss(
        n,
        J - 0.3,
        u + 50.5 - 2.2,
        V - 0.3,
        X + 0.3,
        u + 50.5 - 1.6,
        $ + 0.3,
        d,
      );
      for (let q = 0; q < 4; q++)
        qe(
          n,
          J + (x * (q + 0.5)) / 4,
          U < 0 ? V : $,
          [
            [0.25, u + 50.5],
            [0.25, u + 50.5 + 1.6],
            [0.02, u + 50.5 + 3],
          ],
          4,
          d,
          { flat: !0 },
        );
      oe(
        n,
        [
          [J, u + 50.5, V],
          [X, u + 50.5, V],
          [X, u + 50.5, $],
          [J, u + 50.5, $],
        ],
        m,
        [0, 1, 0],
      );
      let tt = uh(X, V, X, $);
      for (let q of [x * 0.3, x * 0.7]) Wu(n, tt, q, u + 33, 2.1, u + 43.5, b);
      Wu(n, tt, x / 2, u + 16, 2.2, u + 25, g);
      let Z = U < 0 ? uh(X, V, J, V) : uh(J, $, X, $);
      for (let q of [x * 0.3, x * 0.7]) Wu(n, Z, q, u + 33, 2.1, u + 43.5, b);
      Wu(n, Z, x / 2, u + 8, 2, u + 16, g);
      for (let q of [u + 14, u + 30])
        ss(n, J - 0.2, q, V - 0.2, X + 0.2, q + 0.5, $ + 0.2, d);
    }
    let F = a - 1.4,
      O = 34;
    (n.wall(F, i + y, F, i - y, u - 1, u - 1, u + O, u + O, d, 0, u),
      oe(
        n,
        [
          [F, u + O, i + y],
          [F, u + O, i - y],
          [F, u + O + 6, i],
        ],
        d,
        [1, 0, 0],
      ),
      ss(n, F - 0.5, u + O, i - y - 0.2, F + 0.5, u + O + 0.5, i + y + 0.2, d));
    let B = u + 22.5,
      H = 4.75;
    oe(
      n,
      [
        [F + 0.09, B - H, i + H],
        [F + 0.09, B - H, i - H],
        [F + 0.09, B + H, i - H],
        [F + 0.09, B + H, i + H],
      ],
      Tn(ln.ROSE, Jb.rose, 1),
      [1, 0, 0],
      (U) => [(i + H - U[2]) / (2 * H), (U[1] - B + H) / (2 * H)],
    );
    for (let U = 0; U < 32; U++) {
      let G = (U / 32) * Math.PI * 2,
        W = ((U + 1) / 32) * Math.PI * 2,
        V = H + 0.1,
        $ = H + 0.9,
        J = (X, tt, Z) => [F + Z, B + Math.sin(X) * tt, i + Math.cos(X) * tt];
      (oe(
        n,
        [J(G, V, 0.5), J(W, V, 0.5), J(W, $, 0.5), J(G, $, 0.5)],
        d,
        [1, 0, 0],
      ),
        oe(n, [J(G, V, 0.02), J(W, V, 0.02), J(W, V, 0.5), J(G, V, 0.5)], d, [
          0,
          -Math.sin((G + W) / 2),
          -Math.cos((G + W) / 2),
        ]));
    }
    let N = 4.6,
      D = 7.2;
    oe(
      n,
      [
        [F + 0.05, u, i + N / 2],
        [F + 0.05, u, i - N / 2],
        [F + 0.05, u + D, i - N / 2],
        [F + 0.05, u + D, i + N / 2],
      ],
      Tn(ln.ELEV, Jb.doors, 1),
      [1, 0, 0],
      (U) => [(i + N / 2 - U[2]) / N, (U[1] - u) / D],
    );
    for (let U = 0; U < 4; U++) {
      let G = N / 2 + 0.5 + U * 0.55,
        W = 2.4 - U * 0.55,
        V = u + D + 0.2;
      for (let J of [-1, 1])
        ss(
          n,
          F,
          u - 0.2,
          J < 0 ? i - G - 0.45 : i + G,
          F + W,
          V,
          J < 0 ? i - G : i + G + 0.45,
          d,
        );
      let $ = 8;
      for (let J of [-1, 1])
        for (let X = 0; X < $; X++) {
          let tt = (X / $) * Math.acos(0.5),
            Z = ((X + 1) / $) * Math.acos(0.5),
            q = 2 * G,
            j = [
              F + W,
              V + Math.sin(tt) * q,
              i + J * (G - q * (1 - Math.cos(tt))),
            ],
            K = [
              F + W,
              V + Math.sin(Z) * q,
              i + J * (G - q * (1 - Math.cos(Z))),
            ];
          Ce(n, j, K, 0.3, d, 4);
        }
      if (U === 0) {
        let J = [[F + 0.09, V - 0.2, i + N / 2]];
        for (let X = 0; X <= $; X++) {
          let tt = (X / $) * Math.acos(0.5),
            Z = 2 * (N / 2);
          J.push([
            F + 0.09,
            V - 0.2 + Math.sin(tt) * Z * 0.8,
            i + (N / 2 - Z * (1 - Math.cos(tt))),
          ]);
        }
        for (let X = $; X >= 0; X--) {
          let tt = (X / $) * Math.acos(0.5),
            Z = 2 * (N / 2);
          J.push([
            F + 0.09,
            V - 0.2 + Math.sin(tt) * Z * 0.8,
            i - (N / 2 - Z * (1 - Math.cos(tt))),
          ]);
        }
        oe(n, J, p, [1, 0, 0]);
      }
    }
    oe(
      n,
      [
        [F + 2.5, u + D + 5, i + N / 2 + 2.6],
        [F + 2.5, u + D + 5, i - N / 2 - 2.6],
        [F + 2.5, u + D + 9.5, i],
      ],
      d,
      [1, 0, 0],
    );
    for (let U = 0; U < 7; U++) {
      let G = i - y + 1.2 + (U * (2 * y - 2.4)) / 6;
      Wu(
        n,
        uh(F + 0.02, i + y, F + 0.02, i - y),
        i + y - G,
        u + 14.3,
        1.1,
        u + 15.9,
        b,
      );
    }
    (o.colliders.push({
      t: "box",
      x0: v - 1,
      z0: i - S - 1,
      x1: a + 3,
      z1: i + S + 1,
    }),
      o.colliders.push({
        t: "box",
        x0: T,
        z0: i - R - 1.6,
        x1: E,
        z1: i + R + 1.6,
      }),
      o.colliders.push({
        t: "box",
        x0: a - x - 1,
        z0: i - y - x - 1,
        x1: a + 1,
        z1: i + y + x + 1,
      }));
  }
  (xf(o, s), vn(o.group, n, t.lm, "GraceCathedral"));
}
