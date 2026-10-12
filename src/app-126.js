// app 126 — math
// Lines 86291-86851 of readable/app.pretty.js (statement-aligned).
function _7(i, t) {
  let e = Ei(5, 15),
    s = Ca(5, 15),
    n = new Ce(),
    o = 1227.5,
    a = 604,
    r = e.x0 + 6,
    l = 11.5,
    c = i.real
      ? [
          [r, o - l],
          [a, o - l],
          [r, o + l],
          [a, o + l],
          [(r + a) / 2, o],
        ]
      : [
          [e.x0, e.z0],
          [e.x1, e.z0],
          [e.x0, e.z1],
          [e.x1, e.z1],
        ],
    h = Math.max(...c.map(([L, F]) => Yt(L, F))),
    f = Math.min(...c.map(([L, F]) => Yt(L, F)), Yt(a + 4, o)),
    u = i.real ? (h + f) / 2 + Ke + 1.2 : h + Ke + 0.9,
    d = nl(be.grace, 0.95, 0.93, 55),
    p = nl(be.grace, 0.85, 0.83, 30),
    m = Be(be.copper, 0.55, 0.62, 0.58),
    g = yn(sn.GLASS, be.stainedglass, 1),
    b = It(Lt.glass, 0.02, 0.022, 0.025);
  il(
    n,
    e.x0,
    e.z0,
    e.x1,
    e.z1,
    4,
    (L, F) => Yt(L, F) + Ke + 0.03,
    Be(be.granite, 0.9),
  );
  let x = e.x0 + 6,
    v = 10,
    y = 7.5,
    M = 7.5,
    S = 11.5,
    w = Math.min(u - 4, f - 1.5);
  ys(
    n,
    [
      [x - 1, o - S - 1],
      [a + 1, o - S - 1],
      [a + 1, o + S + 1],
      [x - 1, o + S + 1],
    ],
    w,
    u,
    p,
    { cap: !0, capCol: Be(be.granite, 0.85) },
  );
  let z = Math.max(0.9, u - (Yt(a + 4, o) + Ke)),
    _ = i.real ? Math.max(5, Math.ceil(z / 0.17)) : 5,
    R = i.real ? 0.33 : 0.5;
  for (let L = 0; L < _; L++)
    Ze(
      n,
      a + 1 + (_ - L - 1) * R,
      w,
      o - S - 1,
      a + 1 + (_ - L) * R,
      u - (i.real ? (z * (_ - 1 - L)) / _ : 0.18 * L),
      o + S + 1,
      Be(be.granite, 0.85),
    );
  i.real &&
    i.colliders.push({
      t: "box",
      x0: a,
      z0: o - S - 1,
      x1: a + 1 + _ * R,
      z1: o + S + 1,
    });
  {
    let L = a + 8,
      F = e.z0 + 11,
      N = Yt(L, F) + Ke + 0.05;
    for (let B = 0; B < 12; B++) {
      let H = 1 + B * 0.4;
      Oe(
        n,
        L,
        F,
        [
          [H + 0.05, N],
          [H - 0.05, N],
        ],
        40,
        It(Lt.stone, 0.22, 0.2, 0.18),
      );
    }
  }
  let T = x + 14,
    E = T + 13,
    A = 19,
    C = 12,
    P = 27,
    I = 37;
  for (let L of [-1, 1]) {
    let F = o + L * S,
      N = o + L * M;
    for (let [U, G] of [
      [x + 8, T],
      [E, a - v],
    ]) {
      L < 0
        ? n.wall(G, F, U, F, u, u, u + C, u + C, d, U, u)
        : n.wall(U, F, G, F, u, u, u + C, u + C, d, U, u);
      let q = [U, u + C, F],
        W = [G, u + C, F],
        V = [G, u + C + 4, N],
        Y = [U, u + C + 4, N];
      ne(n, [q, W, V, Y], m, [0, 1, L], (Q) => [Q[0], Q[2] * 1 + Q[1]]);
      let $ = L < 0 ? Nc(G, F, U, F) : Nc(U, F, G, F),
        st = Math.max(1, Math.round((G - U) / 6.2));
      for (let Q = 0; Q <= st; Q++) {
        let j = U + ((G - U) * Q) / st;
        Ze(
          n,
          j - 0.7,
          u - 0.5,
          L < 0 ? F - 1.8 : F - 0.1,
          j + 0.7,
          u + C + 1.6,
          L < 0 ? F + 0.1 : F + 1.8,
          d,
        );
        let X = [j, u + C + 1.6, F + L * 1.8],
          K = [j, u + P - 3, N];
        if ((Ae(n, X, K, [0.45, 0.35], d, 4), Q < st)) {
          let nt =
            L < 0 ? G - (j + (G - U) / st / 2) : j + (G - U) / st / 2 - U;
          lu(n, $, nt, u + 2.4, 1.9, u + 8.6, g);
          let Z = L < 0 ? Nc(G, N, U, N) : Nc(U, N, G, N);
          lu(n, Z, nt, u + C + 5.5, 2.2, u + P - 4.2, g);
        }
      }
    }
    L < 0
      ? n.wall(a - v, N, x + 8, N, u + C, u + C, u + P, u + P, d, 0, u)
      : n.wall(x + 8, N, a - v, N, u + C, u + C, u + P, u + P, d, 0, u);
    let B = [x + 8, u + P, N],
      H = [a - v, u + P, N],
      O = [a - v, u + I, o],
      D = [x + 8, u + I, o];
    ne(n, [B, H, O, D], m, [0, 1, L], (U) => [
      U[0],
      Math.abs(U[2] - o) * 1.3 + U[1] * 0.3,
    ]);
  }
  for (let L of [-1, 1]) {
    let F = o + L * A;
    ys(
      n,
      L < 0
        ? [
            [T, F],
            [E, F],
            [E, o - S],
            [T, o - S],
          ]
        : [
            [T, o + S],
            [E, o + S],
            [E, F],
            [T, F],
          ],
      u - 1,
      u + P,
      d,
      { vBase: u },
    );
    let N = (T + E) / 2;
    ne(
      n,
      [
        [T, u + P, F],
        [E, u + P, F],
        [N, u + I, F],
      ],
      d,
      [0, 0, L],
    );
    for (let [H, O] of [
      [T, N],
      [N, E],
    ]) {
      let D = [H, u + P, F],
        U = [O, u + P, F],
        G = [N, u + I, o + L * S * 0.5],
        q = [H === T ? T : E, u + P, o];
    }
    (ne(
      n,
      [
        [T, u + P, F],
        [T, u + P, o],
        [N, u + I, o],
        [N, u + I, F],
      ],
      m,
      [-1, 1, 0],
      (H) => [H[2], H[0] + H[1]],
    ),
      ne(
        n,
        [
          [E, u + P, F],
          [N, u + I, F],
          [N, u + I, o],
          [E, u + P, o],
        ],
        m,
        [1, 1, 0],
        (H) => [H[2], H[0] + H[1]],
      ));
    let B = L < 0 ? Nc(E, F, T, F) : Nc(T, F, E, F);
    for (let H of [-3.2, 0, 3.2])
      lu(n, B, 6.5 + H, u + 3, 2, u + (H ? 12 : 14), g);
    {
      let H = [N, u + P - 5.5, F + L * 0.05],
        O = 3.2;
      ne(
        n,
        [
          [H[0] - O, H[1] - O, H[2]],
          [H[0] + O, H[1] - O, H[2]],
          [H[0] + O, H[1] + O, H[2]],
          [H[0] - O, H[1] + O, H[2]],
        ],
        yn(sn.ROSE, cb.rose, 0.95),
        [0, 0, L],
        (D) => [
          (L * (D[0] - H[0])) / (2 * O) + 0.5,
          (D[1] - H[1]) / (2 * O) + 0.5,
        ],
      );
    }
    for (let H of [T, E])
      Ze(
        n,
        H - 0.9,
        u - 0.5,
        L < 0 ? F - 1.6 : F - 0.2,
        H + 0.9,
        u + P + 2,
        L < 0 ? F + 0.2 : F + 1.6,
        d,
      );
  }
  {
    let L = (T + E) / 2,
      F = u + I - 0.5;
    (Oe(
      n,
      L,
      o,
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
      Ae(n, [L, F + 24, o], [L, F + 26.5, o], 0.08, Be(be.bronze, 0.9), 4),
      Ae(
        n,
        [L - 0.7, F + 25.6, o],
        [L + 0.7, F + 25.6, o],
        0.07,
        Be(be.bronze, 0.9),
        4,
      ));
  }
  {
    let L = x + 8,
      F = 5,
      N = [];
    for (let H = 0; H <= F; H++) {
      let O = Math.PI / 2 + (H / F) * Math.PI;
      N.push([L + Math.cos(O) * M * 1.05, o - Math.sin(O) * M * 1.05]);
    }
    for (let H = 0; H < F; H++) {
      let [O, D] = N[H],
        [U, G] = N[H + 1];
      n.wall(U, G, O, D, u - 1, u - 1, u + P, u + P, d, H * 4.6, u);
      let q = Nc(U, G, O, D);
      (lu(n, q, q.L / 2, u + 4, 1.9, u + P - 6, g),
        Ze(n, O - 0.8, u - 0.5, D - 0.8, O + 0.8, u + P + 1, D + 0.8, d));
    }
    let B = [L, u + I, o];
    for (let H = 0; H < F; H++) {
      let [O, D] = N[H],
        [U, G] = N[H + 1];
      ne(n, [[U, u + P, G], [O, u + P, D], B], m, [
        O + U - 2 * L,
        1,
        D + G - 2 * o,
      ]);
    }
  }
  {
    for (let U of [-1, 1]) {
      let G = o + U * y,
        q = o + U * (y + v),
        W = Math.min(G, q),
        V = Math.max(G, q),
        Y = a - v,
        $ = a;
      ys(
        n,
        [
          [Y, W],
          [$, W],
          [$, V],
          [Y, V],
        ],
        u - 1,
        u + 50.5,
        d,
        { vBase: u },
      );
      for (let [j, X] of [
        [$, W],
        [$, V],
        [Y, U < 0 ? W : V],
      ])
        (Ze(n, j - 1.1, u - 0.5, X - 1.1, j + 1.1, u + 20, X + 1.1, d),
          Ze(n, j - 0.8, u + 20, X - 0.8, j + 0.8, u + 50.5 - 1, X + 0.8, d),
          Oe(
            n,
            j,
            X,
            [
              [0.9, u + 50.5 - 1],
              [0.9, u + 50.5 + 1.2],
              [0.05, u + 50.5 + 5.5],
            ],
            4,
            d,
            { flat: !0 },
          ));
      Ze(
        n,
        Y - 0.3,
        u + 50.5 - 2.2,
        W - 0.3,
        $ + 0.3,
        u + 50.5 - 1.6,
        V + 0.3,
        d,
      );
      for (let j = 0; j < 4; j++)
        Oe(
          n,
          Y + (v * (j + 0.5)) / 4,
          U < 0 ? W : V,
          [
            [0.25, u + 50.5],
            [0.25, u + 50.5 + 1.6],
            [0.02, u + 50.5 + 3],
          ],
          4,
          d,
          { flat: !0 },
        );
      ne(
        n,
        [
          [Y, u + 50.5, W],
          [$, u + 50.5, W],
          [$, u + 50.5, V],
          [Y, u + 50.5, V],
        ],
        m,
        [0, 1, 0],
      );
      let st = Nc($, W, $, V);
      for (let j of [v * 0.3, v * 0.7]) lu(n, st, j, u + 33, 2.1, u + 43.5, b);
      lu(n, st, v / 2, u + 16, 2.2, u + 25, g);
      let Q = U < 0 ? Nc($, W, Y, W) : Nc(Y, V, $, V);
      for (let j of [v * 0.3, v * 0.7]) lu(n, Q, j, u + 33, 2.1, u + 43.5, b);
      lu(n, Q, v / 2, u + 8, 2, u + 16, g);
      for (let j of [u + 14, u + 30])
        Ze(n, Y - 0.2, j, W - 0.2, $ + 0.2, j + 0.5, V + 0.2, d);
    }
    let F = a - 1.4,
      N = 34;
    (n.wall(F, o + y, F, o - y, u - 1, u - 1, u + N, u + N, d, 0, u),
      ne(
        n,
        [
          [F, u + N, o + y],
          [F, u + N, o - y],
          [F, u + N + 6, o],
        ],
        d,
        [1, 0, 0],
      ),
      Ze(n, F - 0.5, u + N, o - y - 0.2, F + 0.5, u + N + 0.5, o + y + 0.2, d));
    let B = u + 22.5,
      H = 4.75;
    ne(
      n,
      [
        [F + 0.09, B - H, o + H],
        [F + 0.09, B - H, o - H],
        [F + 0.09, B + H, o - H],
        [F + 0.09, B + H, o + H],
      ],
      yn(sn.ROSE, cb.rose, 1),
      [1, 0, 0],
      (U) => [(o + H - U[2]) / (2 * H), (U[1] - B + H) / (2 * H)],
    );
    for (let U = 0; U < 32; U++) {
      let G = (U / 32) * Math.PI * 2,
        q = ((U + 1) / 32) * Math.PI * 2,
        W = H + 0.1,
        V = H + 0.9,
        Y = ($, st, Q) => [F + Q, B + Math.sin($) * st, o + Math.cos($) * st];
      (ne(
        n,
        [Y(G, W, 0.5), Y(q, W, 0.5), Y(q, V, 0.5), Y(G, V, 0.5)],
        d,
        [1, 0, 0],
      ),
        ne(n, [Y(G, W, 0.02), Y(q, W, 0.02), Y(q, W, 0.5), Y(G, W, 0.5)], d, [
          0,
          -Math.sin((G + q) / 2),
          -Math.cos((G + q) / 2),
        ]));
    }
    let O = 4.6,
      D = 7.2;
    ne(
      n,
      [
        [F + 0.05, u, o + O / 2],
        [F + 0.05, u, o - O / 2],
        [F + 0.05, u + D, o - O / 2],
        [F + 0.05, u + D, o + O / 2],
      ],
      yn(sn.ELEV, cb.doors, 1),
      [1, 0, 0],
      (U) => [(o + O / 2 - U[2]) / O, (U[1] - u) / D],
    );
    for (let U = 0; U < 4; U++) {
      let G = O / 2 + 0.5 + U * 0.55,
        q = 2.4 - U * 0.55,
        W = u + D + 0.2;
      for (let Y of [-1, 1])
        Ze(
          n,
          F,
          u - 0.2,
          Y < 0 ? o - G - 0.45 : o + G,
          F + q,
          W,
          Y < 0 ? o - G : o + G + 0.45,
          d,
        );
      let V = 8;
      for (let Y of [-1, 1])
        for (let $ = 0; $ < V; $++) {
          let st = ($ / V) * Math.acos(0.5),
            Q = (($ + 1) / V) * Math.acos(0.5),
            j = 2 * G,
            X = [
              F + q,
              W + Math.sin(st) * j,
              o + Y * (G - j * (1 - Math.cos(st))),
            ],
            K = [
              F + q,
              W + Math.sin(Q) * j,
              o + Y * (G - j * (1 - Math.cos(Q))),
            ];
          Ae(n, X, K, 0.3, d, 4);
        }
      if (U === 0) {
        let Y = [[F + 0.09, W - 0.2, o + O / 2]];
        for (let $ = 0; $ <= V; $++) {
          let st = ($ / V) * Math.acos(0.5),
            Q = 2 * (O / 2);
          Y.push([
            F + 0.09,
            W - 0.2 + Math.sin(st) * Q * 0.8,
            o + (O / 2 - Q * (1 - Math.cos(st))),
          ]);
        }
        for (let $ = V; $ >= 0; $--) {
          let st = ($ / V) * Math.acos(0.5),
            Q = 2 * (O / 2);
          Y.push([
            F + 0.09,
            W - 0.2 + Math.sin(st) * Q * 0.8,
            o - (O / 2 - Q * (1 - Math.cos(st))),
          ]);
        }
        ne(n, Y, p, [1, 0, 0]);
      }
    }
    ne(
      n,
      [
        [F + 2.5, u + D + 5, o + O / 2 + 2.6],
        [F + 2.5, u + D + 5, o - O / 2 - 2.6],
        [F + 2.5, u + D + 9.5, o],
      ],
      d,
      [1, 0, 0],
    );
    for (let U = 0; U < 7; U++) {
      let G = o - y + 1.2 + (U * (2 * y - 2.4)) / 6;
      lu(
        n,
        Nc(F + 0.02, o + y, F + 0.02, o - y),
        o + y - G,
        u + 14.3,
        1.1,
        u + 15.9,
        b,
      );
    }
    (i.colliders.push({
      t: "box",
      x0: x - 1,
      z0: o - S - 1,
      x1: a + 3,
      z1: o + S + 1,
    }),
      i.colliders.push({
        t: "box",
        x0: T,
        z0: o - A - 1.6,
        x1: E,
        z1: o + A + 1.6,
      }),
      i.colliders.push({
        t: "box",
        x0: a - v - 1,
        z0: o - y - v - 1,
        x1: a + 1,
        z1: o + y + v + 1,
      }));
  }
  (Gh(i, s), gn(i.group, n, t.lm, "GraceCathedral"));
}
