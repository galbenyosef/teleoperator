// app 225 — math
// Lines 118780-119139 of readable/app.pretty.js (statement-aligned).
function Nxt(o, t) {
  let e = (N) => ff("gg", N),
    s = Qe.sFort ?? 306,
    n = e(s),
    i = Qe.fortV ?? 0,
    a = n.ux,
    r = n.uz,
    l = -r,
    c = a,
    h = { ...n, x: n.x + l * i, z: n.z + c * i },
    f = t.G("fort", "wall"),
    u = t.G("fort", "elev"),
    d = t.G("fort", "paint"),
    p = t.G("fort", "glow"),
    m = t.G("fort", "ground"),
    g = 1.2,
    b = 17.2,
    v = 18.6,
    x = (N, D) => [h.x + a * N + l * D, h.z + r * N + c * D],
    y = [
      [-18, -29],
      [12, -29],
      [18, -22],
      [18, 22],
      [12, 29],
      [-18, 29],
    ].map(([N, D]) => x(N, D)),
    M = [1, 1, 1, 0],
    S = [0.9, 0.62, 0.5, yi.brick],
    w = [0.72, 0.7, 0.67, yi.granite],
    _ = 0;
  for (let N = 0; N < y.length; N++) {
    let D = y[N],
      U = y[(N + 1) % y.length],
      G = Math.hypot(U[0] - D[0], U[1] - D[1]),
      W = Math.max(1, Math.round(G / 13.5));
    ($s(
      u,
      [D[0], g, D[1]],
      [U[0], g, U[1]],
      [U[0], b, U[1]],
      [D[0], b, D[1]],
      [_, 0],
      [_ + W, 0],
      [_ + W, 1],
      [_, 1],
      M,
      jw(D, U, h),
    ),
      $s(
        f,
        [D[0], -3, D[1]],
        [U[0], -3, U[1]],
        [U[0], g, U[1]],
        [D[0], g, D[1]],
        [0, -3],
        [G, -3],
        [G, g],
        [0, g],
        w,
        jw(D, U, h),
      ));
    let V = jw(D, U, h),
      $ = [D[0] - V[0] * 1.4, D[1] - V[2] * 1.4],
      J = [U[0] - V[0] * 1.4, U[1] - V[2] * 1.4];
    ($s(
      f,
      [D[0], b, D[1]],
      [U[0], b, U[1]],
      [U[0], v, U[1]],
      [D[0], v, D[1]],
      [0, b],
      [G, b],
      [G, v],
      [0, v],
      S,
      V,
    ),
      $s(
        f,
        [$[0], b, $[1]],
        [J[0], b, J[1]],
        [J[0], v, J[1]],
        [$[0], v, $[1]],
        [0, b],
        [G, b],
        [G, v],
        [0, v],
        S,
        V.map((X) => -X),
      ),
      $s(
        f,
        [D[0], v, D[1]],
        [U[0], v, U[1]],
        [J[0], v, J[1]],
        [$[0], v, $[1]],
        [D[0], D[1]],
        [U[0], U[1]],
        [J[0], J[1]],
        [$[0], $[1]],
        w,
        [0, 1, 0],
      ),
      (_ += W));
  }
  let z = [
      [-8, -16],
      [6, -16],
      [6, 16],
      [-8, 16],
    ].map(([N, D]) => x(N, D)),
    A = (N, D, U) => {
      let G = !1;
      for (let W = 0, V = U.length - 1; W < U.length; V = W++)
        U[W][1] > D != U[V][1] > D &&
          N <
            ((U[V][0] - U[W][0]) * (D - U[W][1])) / (U[V][1] - U[W][1]) +
              U[W][0] &&
          (G = !G);
      return G;
    },
    T = (N, D, U) => {
      let G = 1e9;
      for (let W = 0; W < U.length; W++) {
        let V = U[W],
          $ = U[(W + 1) % U.length],
          J = $[0] - V[0],
          X = $[1] - V[1],
          tt = Math.max(
            0,
            Math.min(1, ((N - V[0]) * J + (D - V[1]) * X) / (J * J + X * X)),
          );
        G = Math.min(G, Math.hypot(N - V[0] - J * tt, D - V[1] - X * tt));
      }
      return A(N, D, U) ? G : -G;
    },
    E = y
      .concat(z)
      .reduce(
        (N, D) => [
          Math.min(N[0], D[0]),
          Math.min(N[1], D[1]),
          Math.max(N[2], D[0]),
          Math.max(N[3], D[1]),
        ],
        [1e9, 1e9, -1e9, -1e9],
      );
  (Da(
    m,
    E[0] - 1,
    E[1] - 1,
    E[2] + 1,
    E[3] + 1,
    1,
    (N, D) => Math.min(T(N, D, y) - 0.02, -T(N, D, z)),
    () => b,
    [0.55, 0.5, 0.46, Ho.sand],
  ),
    Da(
      m,
      E[0] - 1,
      E[1] - 1,
      E[2] + 1,
      E[3] + 1,
      1,
      (N, D) => T(N, D, z),
      () => b - 4.6,
      [0.55, 0.46, 0.4, Ho.pavers],
    ));
  let R = 0;
  for (let N = 0; N < z.length; N++) {
    let D = z[N],
      U = z[(N + 1) % z.length],
      G = Math.hypot(U[0] - D[0], U[1] - D[1]),
      W = Math.max(1, Math.round(G / 13.5));
    ($s(
      u,
      [D[0], b - 4.6 - 11.4, D[1]],
      [U[0], b - 4.6 - 11.4, U[1]],
      [U[0], b, U[1]],
      [D[0], b, D[1]],
      [R, 0.03],
      [R + W, 0.03],
      [R + W, 1],
      [R, 1],
      [0.95, 0.9, 0.85, 0],
      jw(D, U, h).map((V) => -V),
    ),
      (R += W));
  }
  for (let N of [-26, 26]) {
    let D = x(-15.5, N);
    (Ge(f, D[0], D[1], a, r, 2.5, 2.5, b, v + 3.2, S, [1, 1, 1, 1, 1, 0]),
      Ge(
        f,
        D[0],
        D[1],
        a,
        r,
        2.8,
        2.8,
        v + 3.2,
        v + 3.6,
        w,
        [1, 1, 1, 1, 1, 1],
      ));
  }
  {
    let N = x(14, 0),
      D = v;
    (To(
      d,
      N[0],
      N[1],
      [
        [1.5, D],
        [1.3, D + 6.5],
        [1.7, D + 6.6],
        [1.7, D + 6.8],
      ],
      6,
      [0.2, 0.22, 0.2, 0.5],
    ),
      To(
        p,
        N[0],
        N[1],
        [
          [1, D + 6.8],
          [1, D + 8.2],
        ],
        6,
        [1, 0.9, 0.6, 0.05],
      ),
      To(
        d,
        N[0],
        N[1],
        [
          [1.25, D + 8.2],
          [0.05, D + 9.3],
        ],
        6,
        [0.1, 0.1, 0.1, 0.4],
      ));
  }
  let P = [
    [-22, -36],
    [17, -36],
    [25, -25],
    [25, 25],
    [17, 36],
    [-22, 36],
  ].map(([N, D]) => x(N, D));
  for (let N = 0; N < P.length - 1; N++) {
    let D = P[N],
      U = P[N + 1],
      G = jw(D, U, h),
      W = Math.hypot(U[0] - D[0], U[1] - D[1]);
    $s(
      f,
      [D[0], -4, D[1]],
      [U[0], -4, U[1]],
      [U[0], 2.6, U[1]],
      [D[0], 2.6, D[1]],
      [0, -4],
      [W, -4],
      [W, 2.6],
      [0, 2.6],
      w,
      G,
    );
  }
  Da(
    m,
    E[0] - 10,
    E[1] - 10,
    E[2] + 10,
    E[3] + 10,
    1.5,
    (N, D) => Math.min(T(N, D, P), -T(N, D, y) + 0.05),
    (N, D) =>
      Math.max(2.6, Math.min(Ei(N, D) + 0.1, 2.6 + Math.max(0, -T(N, D, P)))),
    [0.62, 0.58, 0.52, Ho.sand],
  );
  let C = Qe.archA ?? 236,
    I = Qe.archB ?? 327,
    L = Vo(e(C).x, e(C).z) - 1,
    F = 1.5,
    O = t.G("fort", "orange"),
    B = e((C + I) / 2).y - 9.4,
    H = (N) => {
      let D = (N - C) / (I - C);
      return L + (F - L) * D + (B - (L + F) / 2 + 1.5) * 4 * D * (1 - D);
    };
  for (let N of [-11.5, 11.5]) {
    let D = null;
    for (let U = C; U <= I + 0.01; U += 3.5) {
      let G = e(U),
        W = [G.x + l * N, H(U), G.z + c * N];
      (D && ci(O, D, W, 1.4, 2.6, Rf), (D = W));
    }
    for (let U = C + 7.6; U < I - 3; U += 7.6) {
      let G = e(U),
        W = H(U),
        V = G.y - 8.6;
      V - W > 1.2 &&
        ci(
          O,
          [G.x + l * N, W + 1.2, G.z + c * N],
          [G.x + l * N, V, G.z + c * N],
          0.7,
          0.9,
          gc,
        );
    }
  }
  for (let N = C + 8; N < I - 6; N += 15.2) {
    let D = e(N),
      U = H(N);
    ci(
      O,
      [D.x - l * 11.5, U, D.z - c * 11.5],
      [D.x + l * 11.5, U, D.z + c * 11.5],
      0.8,
      1,
      gc,
    );
    let G = e(N + 7.6),
      W = H(N + 7.6);
    ci(
      O,
      [D.x - l * 11.5, U, D.z - c * 11.5],
      [G.x + l * 11.5, W, G.z + c * 11.5],
      0.5,
      0.5,
      gc,
    );
  }
  for (let [N, D] of [
    [C, L],
    [I, F],
  ]) {
    let U = e(N);
    Ge(
      f,
      U.x,
      U.z,
      a,
      r,
      4,
      15,
      Math.min(D, Vo(U.x, U.z)) - 6,
      D + 1.5,
      [0.7, 0.68, 0.64, yi.granite],
      [1, 1, 1, 1, 1, 0],
    );
  }
}
