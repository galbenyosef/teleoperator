// app 53 — math
// Lines 61735-62131 of readable/app.pretty.js (statement-aligned).
function fS({ B: i, A: t }) {
  let e = i.R("alcatraz"),
    s = e.solid,
    { x: n, z: o } = K1,
    a = (K1.bearing * Math.PI) / 180,
    r = Math.sin(a),
    l = -Math.cos(a),
    c = -l,
    h = r,
    f = (U, G) => [n + r * U + c * G, o + l * U + h * G],
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
      let q = Math.pow(
          Math.pow(Math.abs(U) / u, 2.6) +
            Math.pow(Math.abs(G) / (d * (1 - 0.25 * Math.max(0, U / u))), 2.6),
          0.3846153846153846,
        ),
        W = p(...f(U, G)),
        V = m(U) + W * 2.5,
        Y = (1 - q) / 0.1;
      ((V =
        V * Math.min(1, Math.max(0, Math.pow(Math.max(0, Y), 0.35))) +
        1.5 -
        10 * Math.max(0, Math.min(1, (q - 0.96) / 0.08))),
        G < -50 &&
          G > -86 &&
          U > 20 &&
          U < 160 &&
          (V = Math.min(V, Math.max(4.5, 4.5 + (86 + G) * 0.9))));
      for (let [$, st, Q, j, X] of g) {
        let K = Math.max($ - U, 0, U - st),
          nt = Math.max(Q - G, 0, G - j),
          Z = Math.hypot(K, nt);
        Z < 12 && (V = V + (X - V) * (1 - Z / 12));
      }
      return V;
    },
    x = (U, G, q, W) => {
      let V = b((U + G) / 2, (q + W) / 2);
      return (g.push([U, G, q, W, V]), V);
    },
    v = x(-75, 40, -20, 20),
    y = x(48, 70, 8, 30),
    M = x(40, 62, -32, -8),
    S = x(95, 175, -45, 25),
    w = x(-185, -160, 5, 30),
    z = 3.2;
  g.push([60, 150, -100, -78, z]);
  let _ = x(-125, -95, -62, -40),
    R = x(-235, -175, -60, -38),
    T = 6,
    E = Math.ceil((2 * (u + 30)) / T),
    A = Math.ceil((2 * (d + 30)) / T),
    C = s.v,
    P = [];
  for (let U = 0; U <= A; U++)
    for (let G = 0; G <= E; G++) P.push(b(-u - 30 + G * T, -d - 30 + U * T));
  let I = (U, G) =>
    P[Math.min(A, Math.max(0, G)) * (E + 1) + Math.min(E, Math.max(0, U))];
  for (let U = 0; U <= A; U++)
    for (let G = 0; G <= E; G++) {
      let q = -u - 30 + G * T,
        W = -d - 30 + U * T,
        [V, Y] = f(q, W),
        $ = I(G, U),
        st = (I(G + 1, U) - I(G - 1, U)) / (2 * T),
        Q = (I(G, U + 1) - I(G, U - 1)) / (2 * T),
        j = st * r + Q * c,
        X = st * l + Q * h,
        K = Math.hypot(j, 1, X),
        nt = Math.hypot(st, Q),
        Z = nt < 0.45 && $ > 6,
        et = $ < 1.5,
        tt = p(V * 2.3, Y * 1.7),
        it = et
          ? At([0.16, 0.15, 0.13], Tt.rock)
          : Z
            ? tt > 0.1
              ? At([0.05, 0.085, 0.035], Tt.lawn)
              : At([0.22, 0.2, 0.12], Tt.lawn)
            : nt < 1.4 && tt > -0.2
              ? At([0.06, 0.09, 0.04], Tt.lawn)
              : At([0.44, 0.4, 0.34], Tt.rock);
      s.vert(
        V,
        $,
        Y,
        -j / K,
        1 / K,
        -X / K,
        Z ? V : V * 0.7 + Y * 0.7,
        Z ? Y : $ * 1.3,
        it,
      );
    }
  for (let U = 0; U < A; U++)
    for (let G = 0; G < E; G++) {
      if (Math.max(I(G, U), I(G + 1, U), I(G, U + 1), I(G + 1, U + 1)) < -6)
        continue;
      let q = C + U * (E + 1) + G,
        W = q + 1,
        V = q + E + 2,
        Y = q + E + 1;
      (s.tri(q, Y, V), s.tri(q, V, W));
    }
  let L = (U, G, q, W, V, Y, $, st) => {
      let [Q, j] = f(U, G);
      Us(s, Q, j, r, l, q, W, V, Y, $, st);
    },
    F = $ct(Ha("cellhouse")),
    N = At([0.72, 0.7, 0.64], Tt.conc),
    B = At([0.3, 0.3, 0.29], Tt.tar),
    H = At([0.05, 0.05, 0.05], Tt.paint),
    O = (U, G, q, W, V, Y, $, st = 0) => {
      let Q = f(U, G),
        j = f(q, W);
      e.atlas.wall(Q[0], Q[1], j[0], j[1], V, V, Y, Y, $, st, V);
    },
    D = (U, G, q, W, V, Y, $, st = {}) => {
      let Q = r * h - l * c > 0,
        j = [
          [U, q],
          [G, q],
          [G, W],
          [U, W],
        ];
      for (let X = 0; X < 4; X++) {
        let K = j[X],
          nt = st[X] || j[(X + 1) % 4];
        Q
          ? O(nt[0], nt[1], K[0], K[1], V, Y, $)
          : O(K[0], K[1], nt[0], nt[1], V, Y, $);
      }
      L(
        (U + G) / 2,
        (q + W) / 2,
        (G - U) / 2 + 0.3,
        (W - q) / 2 + 0.3,
        Y,
        Y + 0.6,
        N,
        { bottom: !0 },
      );
    };
  (D(-70, 36, -16, 16, v - 1, v + 13, F),
    L(-17, 0, 50, 13, v + 13.6, v + 16, N),
    L(-17, 0, 50.2, 13.2, v + 16, v + 16.4, B));
  for (let U = -62; U < 30; U += 9)
    L(U, 0, 3.2, 10, v + 16.4, v + 17.6, At([0.12, 0.14, 0.15], Tt.glass));
  D(20, 44, -24, 16, v - 1, v + 10, F, { 2: [36, 16] });
  for (let [U, G, q, W] of [
    [-120, -20, -72, -20],
    [-120, 20, -72, 20],
    [-120, -20, -120, 20],
  ]) {
    let V = f(U, G),
      Y = f(q, W);
    ss(s, [V[0], v + 3, V[1]], [Y[0], v + 3, Y[1]], 0.8, 7, N);
  }
  {
    let [U, G] = f(58, 20),
      q = y;
    (Gs(
      s,
      U,
      G,
      [
        [2.6, q - 1],
        [2.6, q],
        [2.3, q + 18],
        [2.6, q + 18.4],
        [2.6, q + 19],
      ],
      8,
      N,
      { rot: Math.PI / 8 },
    ),
      es(s, U, G, 1.7, q + 19, q + 21.6, 8, At([1, 0.95, 0.75], Tt.lamp)),
      Gs(
        s,
        U,
        G,
        [
          [2, q + 21.6],
          [1.8, q + 22.2],
          [0.6, q + 23.2],
          [0.1, q + 23.8],
        ],
        8,
        At([0.12, 0.12, 0.12], Tt.metal),
      ),
      Gs(
        s,
        U,
        G,
        [
          [2.9, q + 18.8],
          [2.9, q + 19.4],
        ],
        8,
        At([0.15, 0.15, 0.15], Tt.metal),
      ),
      L(62, 12, 7, 5, q - 1, q + 7, N),
      L(62, 12, 7.3, 5.3, q + 7, q + 7.5, B));
  }
  {
    let U = M,
      G = 42,
      q = 60,
      W = -30,
      V = -12;
    for (let [Y, $, st, Q] of [
      [G, W, q, W],
      [q, W, q, V],
      [q, V, G, V],
      [G, V, G, W],
    ]) {
      let j = f(Y, $),
        X = f(st, Q),
        K = Math.hypot(X[0] - j[0], X[1] - j[1]);
      for (let nt = 0; nt < K / 3.2 - 0.5; nt++) {
        let Z = (nt * 3.2) / K,
          et = Math.min(1, (nt * 3.2 + 1.4) / K),
          tt = [j[0] + (X[0] - j[0]) * Z, j[1] + (X[1] - j[1]) * Z],
          it = [j[0] + (X[0] - j[0]) * et, j[1] + (X[1] - j[1]) * et];
        ss(
          s,
          [tt[0], U - 1, tt[1]],
          [tt[0], U + 11, tt[1]],
          0.5,
          1.4,
          At([0.62, 0.58, 0.52], Tt.conc),
        );
      }
      (ss(
        s,
        [j[0], U + 11.5, j[1]],
        [X[0], U + 11.5, X[1]],
        0.5,
        1.2,
        At([0.62, 0.58, 0.52], Tt.conc),
      ),
        ss(
          s,
          [j[0], U + 3.2, j[1]],
          [X[0], U + 3.2, X[1]],
          0.5,
          1,
          At([0.55, 0.5, 0.45], Tt.conc),
        ),
        ss(
          s,
          [j[0], U + 7.2, j[1]],
          [X[0], U + 7.2, X[1]],
          0.5,
          1,
          At([0.55, 0.5, 0.45], Tt.conc),
        ));
    }
  }
  {
    let [U, G] = f(-172, 18),
      q = w,
      W = At([0.72, 0.7, 0.66], Tt.metal);
    for (let [V, Y] of [
      [-4, -4],
      [4, -4],
      [4, 4],
      [-4, 4],
    ])
      ss(
        s,
        [U + V, q - 1, G + Y],
        [U + V * 0.8, q + 20, G + Y * 0.8],
        0.5,
        0.5,
        W,
      );
    for (let V of [q + 7, q + 14])
      for (let [Y, $, st, Q] of [
        [-4, -4, 4, -4],
        [4, -4, 4, 4],
        [4, 4, -4, 4],
        [-4, 4, -4, -4],
      ])
        ss(
          s,
          [U + Y * 0.9, V, G + $ * 0.9],
          [U + st * 0.9, V, G + Q * 0.9],
          0.2,
          0.2,
          W,
        );
    (es(s, U, G, 5.2, q + 20, q + 29, 16, W),
      Gs(
        s,
        U,
        G,
        [
          [5.4, q + 29],
          [2.5, q + 31],
          [0.2, q + 31.6],
        ],
        16,
        At([0.5, 0.48, 0.45], Tt.metal),
      ));
  }
  {
    let U = _;
    (L(-110, -51, 15, 10, U - 1, U + 10, N),
      L(-110, -51, 15.3, 10.3, U + 10, U + 10.5, B));
    let [G, q] = f(-102, -44);
    es(s, G, q, 1.6, U, U + 36, 12, At([0.55, 0.5, 0.45], Tt.conc), 1.3);
  }
  {
    let U = R;
    D(-235, -175, -60, -40, U - 1, U + 9, Ha("bldg64", [0.95, 0.95, 0.95]));
  }
  {
    (D(70, 140, -98, -80, z - 1, z + 15, Ha("bldg64")),
      L(105, -104, 45, 6, 0.4, z, At([0.45, 0.44, 0.4], Tt.conc), {
        bottom: !0,
      }));
    for (let Y = 62; Y < 150; Y += 6) {
      let [$, st] = f(Y, -110);
      es(s, $, st, 0.35, -6, 0.5, 6, At([0.2, 0.18, 0.15], Tt.pile));
    }
    (L(156.5, -95, 6.5, 14, 0.4, z, At([0.45, 0.44, 0.4], Tt.conc), {
      bottom: !0,
    }),
      L(148.5, -89.5, 1.5, 8.5, 0.4, z, At([0.45, 0.44, 0.4], Tt.conc), {
        bottom: !0,
      }),
      L(60, -90, 5, 5, z, z + 9, N),
      L(60, -90, 5.5, 5.5, z + 9, z + 9.4, B));
    let U = t.word("UNITED STATES PENITENTIARY", {
        font: "bold 110px Arial, Helvetica, sans-serif",
        h: 130,
      }),
      [G, q] = f(105, -98.1),
      W = [-c, 0, -h],
      V = [W[2], 0, -W[0]];
    K5(
      e.text,
      t,
      U,
      [G, z + 13.2, q],
      V,
      [0, 1, 0],
      W,
      26,
      null,
      oo([0.85, 0.85, 0.82]),
    );
  }
  {
    (L(95, -70, 12, 6, 3, 13, N),
      L(95, -70, 12.3, 6.3, 13, 6 + 7.4, B),
      L(40, -68, 16, 7, 3, 15, Ha("bldg64", [0.9, 0.88, 0.85])),
      L(40, -68, 16.3, 7.3, 15, 6 + 9.4, B));
    for (let G = 0; G < 4; G++) {
      let [q, W] = f(-10 - G * 16, -40 - G * 4);
      ss(
        s,
        [q, v - 12 + G, W],
        [q + r * 12, v - 12 + G, W + l * 12],
        7,
        7,
        At([0.6, 0.56, 0.5], Tt.conc),
      );
    }
    for (let G = 0; G < 150; G += 10) {
      let q = f(G, -60 - G * 0.12),
        W = f(G + 10, -60 - (G + 10) * 0.12);
      ss(
        s,
        [q[0], 6.2 + G * 0.02, q[1]],
        [W[0], 6.2 + (G + 10) * 0.02, W[1]],
        5,
        0.3,
        At([0.38, 0.37, 0.35], Tt.conc),
      );
    }
  }
  L(135, -10, 40, 34, S - 0.8, S + 0.25, At([0.52, 0.5, 0.46], Tt.conc));
}
