// app 52 — math
// Lines 61966-62362 of readable/app.pretty.js (statement-aligned).
function dk({ B: o, A: t }) {
  let e = o.R("alcatraz"),
    s = e.solid,
    { x: n, z: i } = Lm,
    a = (Lm.bearing * Math.PI) / 180,
    r = Math.sin(a),
    l = -Math.cos(a),
    c = -l,
    h = r,
    f = (U, G) => [n + r * U + c * G, i + l * U + h * G],
    u = 255,
    d = 92,
    p = (U, G) =>
      Math.sin(U * 0.043 + Math.sin(G * 0.031) * 2) * 0.5 +
      Math.sin(G * 0.057 + U * 0.013) * 0.5,
    m = (U) =>
      U < -150
        ? 22 + ((U + 255) / 105) * 12
        : U < 80
          ? 40 - Math.max(0, U - 20) * 0.1
          : 34 - (U - 80) * 0.15,
    g = [],
    b = (U, G) => {
      let W = Math.pow(
          Math.pow(Math.abs(U) / u, 2.6) +
            Math.pow(Math.abs(G) / (d * (1 - 0.25 * Math.max(0, U / u))), 2.6),
          0.3846153846153846,
        ),
        V = p(...f(U, G)),
        $ = m(U) + V * 2.5,
        J = (1 - W) / 0.1;
      (($ =
        $ * Math.min(1, Math.max(0, Math.pow(Math.max(0, J), 0.35))) +
        1.5 -
        10 * Math.max(0, Math.min(1, (W - 0.96) / 0.08))),
        G < -50 &&
          G > -86 &&
          U > 20 &&
          U < 160 &&
          ($ = Math.min($, Math.max(4.5, 4.5 + (86 + G) * 0.9))));
      for (let [X, tt, Z, q, j] of g) {
        let K = Math.max(X - U, 0, U - tt),
          nt = Math.max(Z - G, 0, G - q),
          Q = Math.hypot(K, nt);
        Q < 12 && ($ = $ + (j - $) * (1 - Q / 12));
      }
      return $;
    },
    v = (U, G, W, V) => {
      let $ = b((U + G) / 2, (W + V) / 2);
      return (g.push([U, G, W, V, $]), $);
    },
    x = v(-75, 40, -20, 20),
    y = v(48, 70, 8, 30),
    M = v(40, 62, -32, -8),
    S = v(95, 175, -45, 25),
    w = v(-185, -160, 5, 30),
    _ = 3.2;
  g.push([60, 150, -100, -78, _]);
  let z = v(-125, -95, -62, -40),
    A = v(-235, -175, -60, -38),
    T = 6,
    E = Math.ceil((2 * (u + 30)) / T),
    R = Math.ceil((2 * (d + 30)) / T),
    P = s.v,
    C = [];
  for (let U = 0; U <= R; U++)
    for (let G = 0; G <= E; G++) C.push(b(-u - 30 + G * T, -d - 30 + U * T));
  let I = (U, G) =>
    C[Math.min(R, Math.max(0, G)) * (E + 1) + Math.min(E, Math.max(0, U))];
  for (let U = 0; U <= R; U++)
    for (let G = 0; G <= E; G++) {
      let W = -u - 30 + G * T,
        V = -d - 30 + U * T,
        [$, J] = f(W, V),
        X = I(G, U),
        tt = (I(G + 1, U) - I(G - 1, U)) / (2 * T),
        Z = (I(G, U + 1) - I(G, U - 1)) / (2 * T),
        q = tt * r + Z * c,
        j = tt * l + Z * h,
        K = Math.hypot(q, 1, j),
        nt = Math.hypot(tt, Z),
        Q = nt < 0.45 && X > 6,
        et = X < 1.5,
        st = p($ * 2.3, J * 1.7),
        ot = et
          ? Rt([0.16, 0.15, 0.13], Tt.rock)
          : Q
            ? st > 0.1
              ? Rt([0.05, 0.085, 0.035], Tt.lawn)
              : Rt([0.22, 0.2, 0.12], Tt.lawn)
            : nt < 1.4 && st > -0.2
              ? Rt([0.06, 0.09, 0.04], Tt.lawn)
              : Rt([0.44, 0.4, 0.34], Tt.rock);
      s.vert(
        $,
        X,
        J,
        -q / K,
        1 / K,
        -j / K,
        Q ? $ : $ * 0.7 + J * 0.7,
        Q ? J : X * 1.3,
        ot,
      );
    }
  for (let U = 0; U < R; U++)
    for (let G = 0; G < E; G++) {
      if (Math.max(I(G, U), I(G + 1, U), I(G, U + 1), I(G + 1, U + 1)) < -6)
        continue;
      let W = P + U * (E + 1) + G,
        V = W + 1,
        $ = W + E + 2,
        J = W + E + 1;
      (s.tri(W, J, $), s.tri(W, $, V));
    }
  let L = (U, G, W, V, $, J, X, tt) => {
      let [Z, q] = f(U, G);
      Vs(s, Z, q, r, l, W, V, $, J, X, tt);
    },
    F = pdt(Ja("cellhouse")),
    O = Rt([0.72, 0.7, 0.64], Tt.conc),
    B = Rt([0.3, 0.3, 0.29], Tt.tar),
    H = Rt([0.05, 0.05, 0.05], Tt.paint),
    N = (U, G, W, V, $, J, X, tt = 0) => {
      let Z = f(U, G),
        q = f(W, V);
      e.atlas.wall(Z[0], Z[1], q[0], q[1], $, $, J, J, X, tt, $);
    },
    D = (U, G, W, V, $, J, X, tt = {}) => {
      let Z = r * h - l * c > 0,
        q = [
          [U, W],
          [G, W],
          [G, V],
          [U, V],
        ];
      for (let j = 0; j < 4; j++) {
        let K = q[j],
          nt = tt[j] || q[(j + 1) % 4];
        Z
          ? N(nt[0], nt[1], K[0], K[1], $, J, X)
          : N(K[0], K[1], nt[0], nt[1], $, J, X);
      }
      L(
        (U + G) / 2,
        (W + V) / 2,
        (G - U) / 2 + 0.3,
        (V - W) / 2 + 0.3,
        J,
        J + 0.6,
        O,
        { bottom: !0 },
      );
    };
  (D(-70, 36, -16, 16, x - 1, x + 13, F),
    L(-17, 0, 50, 13, x + 13.6, x + 16, O),
    L(-17, 0, 50.2, 13.2, x + 16, x + 16.4, B));
  for (let U = -62; U < 30; U += 9)
    L(U, 0, 3.2, 10, x + 16.4, x + 17.6, Rt([0.12, 0.14, 0.15], Tt.glass));
  D(20, 44, -24, 16, x - 1, x + 10, F, { 2: [36, 16] });
  for (let [U, G, W, V] of [
    [-120, -20, -72, -20],
    [-120, 20, -72, 20],
    [-120, -20, -120, 20],
  ]) {
    let $ = f(U, G),
      J = f(W, V);
    rs(s, [$[0], x + 3, $[1]], [J[0], x + 3, J[1]], 0.8, 7, O);
  }
  {
    let [U, G] = f(58, 20),
      W = y;
    (Ws(
      s,
      U,
      G,
      [
        [2.6, W - 1],
        [2.6, W],
        [2.3, W + 18],
        [2.6, W + 18.4],
        [2.6, W + 19],
      ],
      8,
      O,
      { rot: Math.PI / 8 },
    ),
      os(s, U, G, 1.7, W + 19, W + 21.6, 8, Rt([1, 0.95, 0.75], Tt.lamp)),
      Ws(
        s,
        U,
        G,
        [
          [2, W + 21.6],
          [1.8, W + 22.2],
          [0.6, W + 23.2],
          [0.1, W + 23.8],
        ],
        8,
        Rt([0.12, 0.12, 0.12], Tt.metal),
      ),
      Ws(
        s,
        U,
        G,
        [
          [2.9, W + 18.8],
          [2.9, W + 19.4],
        ],
        8,
        Rt([0.15, 0.15, 0.15], Tt.metal),
      ),
      L(62, 12, 7, 5, W - 1, W + 7, O),
      L(62, 12, 7.3, 5.3, W + 7, W + 7.5, B));
  }
  {
    let U = M,
      G = 42,
      W = 60,
      V = -30,
      $ = -12;
    for (let [J, X, tt, Z] of [
      [G, V, W, V],
      [W, V, W, $],
      [W, $, G, $],
      [G, $, G, V],
    ]) {
      let q = f(J, X),
        j = f(tt, Z),
        K = Math.hypot(j[0] - q[0], j[1] - q[1]);
      for (let nt = 0; nt < K / 3.2 - 0.5; nt++) {
        let Q = (nt * 3.2) / K,
          et = Math.min(1, (nt * 3.2 + 1.4) / K),
          st = [q[0] + (j[0] - q[0]) * Q, q[1] + (j[1] - q[1]) * Q],
          ot = [q[0] + (j[0] - q[0]) * et, q[1] + (j[1] - q[1]) * et];
        rs(
          s,
          [st[0], U - 1, st[1]],
          [st[0], U + 11, st[1]],
          0.5,
          1.4,
          Rt([0.62, 0.58, 0.52], Tt.conc),
        );
      }
      (rs(
        s,
        [q[0], U + 11.5, q[1]],
        [j[0], U + 11.5, j[1]],
        0.5,
        1.2,
        Rt([0.62, 0.58, 0.52], Tt.conc),
      ),
        rs(
          s,
          [q[0], U + 3.2, q[1]],
          [j[0], U + 3.2, j[1]],
          0.5,
          1,
          Rt([0.55, 0.5, 0.45], Tt.conc),
        ),
        rs(
          s,
          [q[0], U + 7.2, q[1]],
          [j[0], U + 7.2, j[1]],
          0.5,
          1,
          Rt([0.55, 0.5, 0.45], Tt.conc),
        ));
    }
  }
  {
    let [U, G] = f(-172, 18),
      W = w,
      V = Rt([0.72, 0.7, 0.66], Tt.metal);
    for (let [$, J] of [
      [-4, -4],
      [4, -4],
      [4, 4],
      [-4, 4],
    ])
      rs(
        s,
        [U + $, W - 1, G + J],
        [U + $ * 0.8, W + 20, G + J * 0.8],
        0.5,
        0.5,
        V,
      );
    for (let $ of [W + 7, W + 14])
      for (let [J, X, tt, Z] of [
        [-4, -4, 4, -4],
        [4, -4, 4, 4],
        [4, 4, -4, 4],
        [-4, 4, -4, -4],
      ])
        rs(
          s,
          [U + J * 0.9, $, G + X * 0.9],
          [U + tt * 0.9, $, G + Z * 0.9],
          0.2,
          0.2,
          V,
        );
    (os(s, U, G, 5.2, W + 20, W + 29, 16, V),
      Ws(
        s,
        U,
        G,
        [
          [5.4, W + 29],
          [2.5, W + 31],
          [0.2, W + 31.6],
        ],
        16,
        Rt([0.5, 0.48, 0.45], Tt.metal),
      ));
  }
  {
    let U = z;
    (L(-110, -51, 15, 10, U - 1, U + 10, O),
      L(-110, -51, 15.3, 10.3, U + 10, U + 10.5, B));
    let [G, W] = f(-102, -44);
    os(s, G, W, 1.6, U, U + 36, 12, Rt([0.55, 0.5, 0.45], Tt.conc), 1.3);
  }
  {
    let U = A;
    D(-235, -175, -60, -40, U - 1, U + 9, Ja("bldg64", [0.95, 0.95, 0.95]));
  }
  {
    (D(70, 140, -98, -80, _ - 1, _ + 15, Ja("bldg64")),
      L(105, -104, 45, 6, 0.4, _, Rt([0.45, 0.44, 0.4], Tt.conc), {
        bottom: !0,
      }));
    for (let J = 62; J < 150; J += 6) {
      let [X, tt] = f(J, -110);
      os(s, X, tt, 0.35, -6, 0.5, 6, Rt([0.2, 0.18, 0.15], Tt.pile));
    }
    (L(156.5, -95, 6.5, 14, 0.4, _, Rt([0.45, 0.44, 0.4], Tt.conc), {
      bottom: !0,
    }),
      L(148.5, -89.5, 1.5, 8.5, 0.4, _, Rt([0.45, 0.44, 0.4], Tt.conc), {
        bottom: !0,
      }),
      L(60, -90, 5, 5, _, _ + 9, O),
      L(60, -90, 5.5, 5.5, _ + 9, _ + 9.4, B));
    let U = t.word("UNITED STATES PENITENTIARY", {
        font: "bold 110px Arial, Helvetica, sans-serif",
        h: 130,
      }),
      [G, W] = f(105, -98.1),
      V = [-c, 0, -h],
      $ = [V[2], 0, -V[0]];
    W5(
      e.text,
      t,
      U,
      [G, _ + 13.2, W],
      $,
      [0, 1, 0],
      V,
      26,
      null,
      xo([0.85, 0.85, 0.82]),
    );
  }
  {
    (L(95, -70, 12, 6, 3, 13, O),
      L(95, -70, 12.3, 6.3, 13, 6 + 7.4, B),
      L(40, -68, 16, 7, 3, 15, Ja("bldg64", [0.9, 0.88, 0.85])),
      L(40, -68, 16.3, 7.3, 15, 6 + 9.4, B));
    for (let G = 0; G < 4; G++) {
      let [W, V] = f(-10 - G * 16, -40 - G * 4);
      rs(
        s,
        [W, x - 12 + G, V],
        [W + r * 12, x - 12 + G, V + l * 12],
        7,
        7,
        Rt([0.6, 0.56, 0.5], Tt.conc),
      );
    }
    for (let G = 0; G < 150; G += 10) {
      let W = f(G, -60 - G * 0.12),
        V = f(G + 10, -60 - (G + 10) * 0.12);
      rs(
        s,
        [W[0], 6.2 + G * 0.02, W[1]],
        [V[0], 6.2 + (G + 10) * 0.02, V[1]],
        5,
        0.3,
        Rt([0.38, 0.37, 0.35], Tt.conc),
      );
    }
  }
  L(135, -10, 40, 34, S - 0.8, S + 0.25, Rt([0.52, 0.5, 0.46], Tt.conc));
}
