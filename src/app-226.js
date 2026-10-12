// app 226 — math
// Lines 118524-118883 of readable/app.pretty.js (statement-aligned).
function p2t(i, t) {
  let e = (O) => Fh("gg", O),
    s = Ye.sFort ?? 306,
    n = e(s),
    o = Ye.fortV ?? 0,
    a = n.ux,
    r = n.uz,
    l = -r,
    c = a,
    h = { ...n, x: n.x + l * o, z: n.z + c * o },
    f = t.G("fort", "wall"),
    u = t.G("fort", "elev"),
    d = t.G("fort", "paint"),
    p = t.G("fort", "glow"),
    m = t.G("fort", "ground"),
    g = 1.2,
    b = 17.2,
    x = 18.6,
    v = (O, D) => [h.x + a * O + l * D, h.z + r * O + c * D],
    y = [
      [-18, -29],
      [12, -29],
      [18, -22],
      [18, 22],
      [12, 29],
      [-18, 29],
    ].map(([O, D]) => v(O, D)),
    M = [1, 1, 1, 0],
    S = [0.9, 0.62, 0.5, hi.brick],
    w = [0.72, 0.7, 0.67, hi.granite],
    z = 0;
  for (let O = 0; O < y.length; O++) {
    let D = y[O],
      U = y[(O + 1) % y.length],
      G = Math.hypot(U[0] - D[0], U[1] - D[1]),
      q = Math.max(1, Math.round(G / 13.5));
    (js(
      u,
      [D[0], g, D[1]],
      [U[0], g, U[1]],
      [U[0], b, U[1]],
      [D[0], b, D[1]],
      [z, 0],
      [z + q, 0],
      [z + q, 1],
      [z, 1],
      M,
      Jy(D, U, h),
    ),
      js(
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
        Jy(D, U, h),
      ));
    let W = Jy(D, U, h),
      V = [D[0] - W[0] * 1.4, D[1] - W[2] * 1.4],
      Y = [U[0] - W[0] * 1.4, U[1] - W[2] * 1.4];
    (js(
      f,
      [D[0], b, D[1]],
      [U[0], b, U[1]],
      [U[0], x, U[1]],
      [D[0], x, D[1]],
      [0, b],
      [G, b],
      [G, x],
      [0, x],
      S,
      W,
    ),
      js(
        f,
        [V[0], b, V[1]],
        [Y[0], b, Y[1]],
        [Y[0], x, Y[1]],
        [V[0], x, V[1]],
        [0, b],
        [G, b],
        [G, x],
        [0, x],
        S,
        W.map(($) => -$),
      ),
      js(
        f,
        [D[0], x, D[1]],
        [U[0], x, U[1]],
        [Y[0], x, Y[1]],
        [V[0], x, V[1]],
        [D[0], D[1]],
        [U[0], U[1]],
        [Y[0], Y[1]],
        [V[0], V[1]],
        w,
        [0, 1, 0],
      ),
      (z += q));
  }
  let _ = [
      [-8, -16],
      [6, -16],
      [6, 16],
      [-8, 16],
    ].map(([O, D]) => v(O, D)),
    R = (O, D, U) => {
      let G = !1;
      for (let q = 0, W = U.length - 1; q < U.length; W = q++)
        U[q][1] > D != U[W][1] > D &&
          O <
            ((U[W][0] - U[q][0]) * (D - U[q][1])) / (U[W][1] - U[q][1]) +
              U[q][0] &&
          (G = !G);
      return G;
    },
    T = (O, D, U) => {
      let G = 1e9;
      for (let q = 0; q < U.length; q++) {
        let W = U[q],
          V = U[(q + 1) % U.length],
          Y = V[0] - W[0],
          $ = V[1] - W[1],
          st = Math.max(
            0,
            Math.min(1, ((O - W[0]) * Y + (D - W[1]) * $) / (Y * Y + $ * $)),
          );
        G = Math.min(G, Math.hypot(O - W[0] - Y * st, D - W[1] - $ * st));
      }
      return R(O, D, U) ? G : -G;
    },
    E = y
      .concat(_)
      .reduce(
        (O, D) => [
          Math.min(O[0], D[0]),
          Math.min(O[1], D[1]),
          Math.max(O[2], D[0]),
          Math.max(O[3], D[1]),
        ],
        [1e9, 1e9, -1e9, -1e9],
      );
  (Aa(
    m,
    E[0] - 1,
    E[1] - 1,
    E[2] + 1,
    E[3] + 1,
    1,
    (O, D) => Math.min(T(O, D, y) - 0.02, -T(O, D, _)),
    () => b,
    [0.55, 0.5, 0.46, To.sand],
  ),
    Aa(
      m,
      E[0] - 1,
      E[1] - 1,
      E[2] + 1,
      E[3] + 1,
      1,
      (O, D) => T(O, D, _),
      () => b - 4.6,
      [0.55, 0.46, 0.4, To.pavers],
    ));
  let A = 0;
  for (let O = 0; O < _.length; O++) {
    let D = _[O],
      U = _[(O + 1) % _.length],
      G = Math.hypot(U[0] - D[0], U[1] - D[1]),
      q = Math.max(1, Math.round(G / 13.5));
    (js(
      u,
      [D[0], b - 4.6 - 11.4, D[1]],
      [U[0], b - 4.6 - 11.4, U[1]],
      [U[0], b, U[1]],
      [D[0], b, D[1]],
      [A, 0.03],
      [A + q, 0.03],
      [A + q, 1],
      [A, 1],
      [0.95, 0.9, 0.85, 0],
      Jy(D, U, h).map((W) => -W),
    ),
      (A += q));
  }
  for (let O of [-26, 26]) {
    let D = v(-15.5, O);
    (Ne(f, D[0], D[1], a, r, 2.5, 2.5, b, x + 3.2, S, [1, 1, 1, 1, 1, 0]),
      Ne(
        f,
        D[0],
        D[1],
        a,
        r,
        2.8,
        2.8,
        x + 3.2,
        x + 3.6,
        w,
        [1, 1, 1, 1, 1, 1],
      ));
  }
  {
    let O = v(14, 0),
      D = x;
    (yo(
      d,
      O[0],
      O[1],
      [
        [1.5, D],
        [1.3, D + 6.5],
        [1.7, D + 6.6],
        [1.7, D + 6.8],
      ],
      6,
      [0.2, 0.22, 0.2, 0.5],
    ),
      yo(
        p,
        O[0],
        O[1],
        [
          [1, D + 6.8],
          [1, D + 8.2],
        ],
        6,
        [1, 0.9, 0.6, 0.05],
      ),
      yo(
        d,
        O[0],
        O[1],
        [
          [1.25, D + 8.2],
          [0.05, D + 9.3],
        ],
        6,
        [0.1, 0.1, 0.1, 0.4],
      ));
  }
  let C = [
    [-22, -36],
    [17, -36],
    [25, -25],
    [25, 25],
    [17, 36],
    [-22, 36],
  ].map(([O, D]) => v(O, D));
  for (let O = 0; O < C.length - 1; O++) {
    let D = C[O],
      U = C[O + 1],
      G = Jy(D, U, h),
      q = Math.hypot(U[0] - D[0], U[1] - D[1]);
    js(
      f,
      [D[0], -4, D[1]],
      [U[0], -4, U[1]],
      [U[0], 2.6, U[1]],
      [D[0], 2.6, D[1]],
      [0, -4],
      [q, -4],
      [q, 2.6],
      [0, 2.6],
      w,
      G,
    );
  }
  Aa(
    m,
    E[0] - 10,
    E[1] - 10,
    E[2] + 10,
    E[3] + 10,
    1.5,
    (O, D) => Math.min(T(O, D, C), -T(O, D, y) + 0.05),
    (O, D) =>
      Math.max(2.6, Math.min(di(O, D) + 0.1, 2.6 + Math.max(0, -T(O, D, C)))),
    [0.62, 0.58, 0.52, To.sand],
  );
  let P = Ye.archA ?? 236,
    I = Ye.archB ?? 327,
    L = Io(e(P).x, e(P).z) - 1,
    F = 1.5,
    N = t.G("fort", "orange"),
    B = e((P + I) / 2).y - 9.4,
    H = (O) => {
      let D = (O - P) / (I - P);
      return L + (F - L) * D + (B - (L + F) / 2 + 1.5) * 4 * D * (1 - D);
    };
  for (let O of [-11.5, 11.5]) {
    let D = null;
    for (let U = P; U <= I + 0.01; U += 3.5) {
      let G = e(U),
        q = [G.x + l * O, H(U), G.z + c * O];
      (D && ii(N, D, q, 1.4, 2.6, Yh), (D = q));
    }
    for (let U = P + 7.6; U < I - 3; U += 7.6) {
      let G = e(U),
        q = H(U),
        W = G.y - 8.6;
      W - q > 1.2 &&
        ii(
          N,
          [G.x + l * O, q + 1.2, G.z + c * O],
          [G.x + l * O, W, G.z + c * O],
          0.7,
          0.9,
          Kl,
        );
    }
  }
  for (let O = P + 8; O < I - 6; O += 15.2) {
    let D = e(O),
      U = H(O);
    ii(
      N,
      [D.x - l * 11.5, U, D.z - c * 11.5],
      [D.x + l * 11.5, U, D.z + c * 11.5],
      0.8,
      1,
      Kl,
    );
    let G = e(O + 7.6),
      q = H(O + 7.6);
    ii(
      N,
      [D.x - l * 11.5, U, D.z - c * 11.5],
      [G.x + l * 11.5, q, G.z + c * 11.5],
      0.5,
      0.5,
      Kl,
    );
  }
  for (let [O, D] of [
    [P, L],
    [I, F],
  ]) {
    let U = e(O);
    Ne(
      f,
      U.x,
      U.z,
      a,
      r,
      4,
      15,
      Math.min(D, Io(U.x, U.z)) - 6,
      D + 1.5,
      [0.7, 0.68, 0.64, hi.granite],
      [1, 1, 1, 1, 1, 0],
    );
  }
}
