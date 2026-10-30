// app 230 — math
// Lines 121027-121331 of readable/app.pretty.js (statement-aligned).
function $xt(o, t, e) {
  let s = t.G("harbor", "wall"),
    n = t.G("harbor", "ground"),
    i = t.G("harbor", "paint"),
    a = [0.62, 0.6, 0.57, yi.granite],
    r = 2.9,
    l = (S, w = 6) => {
      let _ = [];
      for (let T = 0; T < S.length; T++) {
        let E = S[Math.max(0, T - 1)],
          R = S[Math.min(S.length - 1, T + 1)],
          P = Math.hypot(R[0] - E[0], R[1] - E[1]);
        _.push([S[T][0], S[T][1], (R[1] - E[1]) / P, -(R[0] - E[0]) / P]);
      }
      let z = [
          [-w / 2 - 8, -5],
          [-w / 2, r],
          [w / 2, r],
          [w / 2 + 8, -5],
        ],
        A = 0;
      for (let T = 0; T + 1 < _.length; T++) {
        let E = _[T],
          R = _[T + 1],
          P = Math.hypot(R[0] - E[0], R[1] - E[1]);
        for (let C = 0; C + 1 < z.length; C++) {
          let I = (F, [O, B]) => [F[0] + F[2] * O, B, F[1] + F[3] * O],
            L = (z[C][0] + z[C + 1][0]) / 2;
          $s(
            C === 1 ? n : s,
            I(E, z[C]),
            I(R, z[C]),
            I(R, z[C + 1]),
            I(E, z[C + 1]),
            [A, z[C][1] * 1.4],
            [A + P, z[C][1] * 1.4],
            [A + P, z[C + 1][1] * 1.4],
            [A, z[C + 1][1] * 1.4],
            C === 1 ? [0.5, 0.48, 0.45, Ho.sand] : a,
            C === 1
              ? [0, 1, 0]
              : [E[2] * Math.sign(L), 0.6, E[3] * Math.sign(L)],
          );
        }
        A += P;
      }
      for (let T of [_[0], _[_.length - 1]])
        To(
          s,
          T[0],
          T[1],
          [
            [w / 2 + 8, -5],
            [w / 2, r],
            [0.01, r],
          ],
          12,
          a,
        );
    },
    c = -1352;
  br.mounds &&
    (l([
      [c, wh(c) + 12],
      [c, -385],
      [c - 8, -412],
      [c - 24, -428],
    ]),
    l([
      [-1952, wh(-1952) + 10],
      [-1948, -400],
      [-1925, -423],
      [-1480, -436],
    ]));
  {
    let [S, w] = br.wave,
      _ = br.real ? Ei(S, w) + 0.1 : r;
    To(
      s,
      S,
      w,
      [
        [12, -5],
        [9.5, _ + 0.2],
        [0.01, _ + 0.2],
      ],
      20,
      a,
    );
    for (let z = 0; z < 14; z++) {
      let A = e() * Math.PI * 2,
        T = 2 + e() * 6.5;
      Ge(
        s,
        S + Math.cos(A) * T,
        w + Math.sin(A) * T,
        Math.cos(A),
        Math.sin(A),
        0.4 + e() * 0.8,
        0.3 + e() * 0.5,
        _ + 0.2,
        _ + 0.5 + e() * 1.1,
        [0.85, 0.83, 0.8, yi.granite],
      );
    }
    for (let z = 0; z < 20; z++) {
      let A = -0.3 + z * 0.17,
        T = 8.5 + (z % 3) * 0.7,
        E = S + Math.cos(A) * T,
        R = w + Math.sin(A) * T;
      (mr(
        i,
        E,
        R,
        _ - 1.2,
        _ + 0.4 + (z % 4) * 0.35,
        0.16,
        0.16,
        8,
        [0.35, 0.35, 0.33, 0.6],
      ),
        mr(
          i,
          E,
          R,
          _ + 0.4 + (z % 4) * 0.35,
          _ + 0.42 + (z % 4) * 0.35,
          0.16,
          0.01,
          8,
          [0.05, 0.05, 0.05, 0.6],
        ));
    }
  }
  let h = $L(),
    f = [],
    u = [0.42, 0.39, 0.35, 0.8],
    d = new fe(),
    p = new tn(),
    m = new vi(),
    g = new dt(),
    b = new dt(),
    [v, x, y, M] = br.docks;
  for (let S = v; S <= x; S += y) {
    let w = wh(S) + 2,
      _ = M;
    if (!(w - _ < 20)) {
      Ge(
        i,
        S,
        (w + _) / 2,
        0,
        1,
        (w - _) / 2,
        1.2,
        0.2,
        0.65,
        u,
        [1, 1, 1, 1, 1, 0],
      );
      for (let z = w - 6; z > _ + 2; z -= 5.2)
        for (let A of [-1, 1])
          if (
            (Ge(
              i,
              S + A * 5.7,
              z,
              1,
              0,
              4.5,
              0.45,
              0.2,
              0.6,
              u,
              [1, 1, 1, 1, 1, 0],
            ),
            e() < 0.68)
          ) {
            let T = 0.8 + e() * 0.45;
            (m.set(0, A > 0 ? -Math.PI / 2 : Math.PI / 2, (e() - 0.5) * 0.02),
              p.setFromEuler(m),
              g.set(T, T, T),
              b.set(S + A * (5.8 + 4.6 * T), 0, z - 2.6));
            let E = e(),
              R =
                E < 0.7
                  ? [1, 1, 1]
                  : E < 0.85
                    ? [0.25, 0.3, 0.45]
                    : [0.85, 0.8, 0.65];
            f.push([d.compose(b, p, g).clone(), R]);
          }
    }
  }
  t.inst("boats", h, "paint", f);
  {
    let [S, w] = br.club,
      _ = br.club[3] ?? wh(-1960, 2.5) + 6,
      z = br.club[2] ?? _ - 17,
      A = br.real ? Ei((S + w) / 2, (z + _) / 2) + 0.1 : 3.3,
      T = 8.2,
      E = [1.25, 1.3, 1.4, yi.stone];
    Ge(
      s,
      (S + w) / 2,
      (z + _) / 2,
      1,
      0,
      (w - S) / 2 + 3,
      (_ - z) / 2 + 3,
      -4,
      A,
      a,
      [1, 1, 1, 1, 1, 0],
    );
    let R = [
      [S, z, w, _, T],
      [S + 6, z - 7, S + 26, z, T - 3],
      [w - 9, z - 2, w - 1, z + 6, T + 6.5],
    ];
    for (let [P, C, I, L, F] of R) {
      (Ge(
        s,
        (P + I) / 2,
        (C + L) / 2,
        1,
        0,
        (I - P) / 2,
        (L - C) / 2,
        A,
        A + F,
        E,
        [1, 1, 1, 1, 0, 0],
      ),
        Xxt(
          i,
          P - 0.6,
          C - 0.6,
          I + 0.6,
          L + 0.6,
          A + F,
          Math.min(I - P, L - C) * 0.28,
          [0.45, 0.15, 0.07, 0.75],
        ));
      for (let [O, B, H, N, D] of [
        [P, C, 0, -1, I - P],
        [P, L, 0, 1, I - P],
        [P, C, -1, 0, L - C],
        [I, C, 1, 0, L - C],
      ])
        for (let U = 2; U < D - 1.5; U += 3.2) {
          let G = H ? O + H * 0.09 : O + U,
            W = N ? B + N * 0.09 : B + U;
          for (let [V, $] of [
            [1, 3],
            [4.8, 6.6],
          ])
            $ < F - 0.8 &&
              Ge(
                i,
                G,
                W,
                H ? 0 : 1,
                H ? 1 : 0,
                0.6,
                0.04,
                A + V,
                A + $,
                [0.03, 0.04, 0.05, 0.08],
                [0, 0, 1, 1, 0, 0],
              );
        }
    }
    (o.colliders.push({
      t: "box",
      x0: S - 3,
      z0: z - 10,
      x1: w + 3,
      z1: _ + 3,
    }),
      mr(i, w + 2, _ + 1.5, A, A + 16, 0.09, 0.05, 6, [0.85, 0.85, 0.85, 0.4]));
  }
}
function Xxt(o, t, e, s, n, i, a, r) {
  let l = s - t,
    c = n - e,
    h = Math.min(l, c) / 2,
    f = [t + h, i + a, e + h],
    u = [s - h, i + a, e + h],
    d = [s - h, i + a, n - h],
    p = [t + h, i + a, n - h];
  l >= c
    ? (f[2] = u[2] = d[2] = p[2] = (e + n) / 2)
    : (f[0] = u[0] = d[0] = p[0] = (t + s) / 2);
  let m = [
    [t, i, e],
    [s, i, e],
    [s, i, n],
    [t, i, n],
  ];
  ($s(o, m[0], m[1], u, f, [0, 0], [l, 0], [l, 1], [0, 1], r, [0, 0.7, -0.7]),
    $s(o, m[1], m[2], d, u, [0, 0], [c, 0], [c, 1], [0, 1], r, [0.7, 0.7, 0]),
    $s(o, m[2], m[3], p, d, [0, 0], [l, 0], [l, 1], [0, 1], r, [0, 0.7, 0.7]),
    $s(o, m[3], m[0], f, p, [0, 0], [c, 0], [c, 1], [0, 1], r, [-0.7, 0.7, 0]));
}
