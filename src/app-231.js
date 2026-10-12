// app 231 — math
// Lines 120771-121075 of readable/app.pretty.js (statement-aligned).
function S2t(i, t, e) {
  let s = t.G("harbor", "wall"),
    n = t.G("harbor", "ground"),
    o = t.G("harbor", "paint"),
    a = [0.62, 0.6, 0.57, hi.granite],
    r = 2.9,
    l = (S, w = 6) => {
      let z = [];
      for (let T = 0; T < S.length; T++) {
        let E = S[Math.max(0, T - 1)],
          A = S[Math.min(S.length - 1, T + 1)],
          C = Math.hypot(A[0] - E[0], A[1] - E[1]);
        z.push([S[T][0], S[T][1], (A[1] - E[1]) / C, -(A[0] - E[0]) / C]);
      }
      let _ = [
          [-w / 2 - 8, -5],
          [-w / 2, r],
          [w / 2, r],
          [w / 2 + 8, -5],
        ],
        R = 0;
      for (let T = 0; T + 1 < z.length; T++) {
        let E = z[T],
          A = z[T + 1],
          C = Math.hypot(A[0] - E[0], A[1] - E[1]);
        for (let P = 0; P + 1 < _.length; P++) {
          let I = (F, [N, B]) => [F[0] + F[2] * N, B, F[1] + F[3] * N],
            L = (_[P][0] + _[P + 1][0]) / 2;
          js(
            P === 1 ? n : s,
            I(E, _[P]),
            I(A, _[P]),
            I(A, _[P + 1]),
            I(E, _[P + 1]),
            [R, _[P][1] * 1.4],
            [R + C, _[P][1] * 1.4],
            [R + C, _[P + 1][1] * 1.4],
            [R, _[P + 1][1] * 1.4],
            P === 1 ? [0.5, 0.48, 0.45, To.sand] : a,
            P === 1
              ? [0, 1, 0]
              : [E[2] * Math.sign(L), 0.6, E[3] * Math.sign(L)],
          );
        }
        R += C;
      }
      for (let T of [z[0], z[z.length - 1]])
        yo(
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
  er.mounds &&
    (l([
      [c, jc(c) + 12],
      [c, -385],
      [c - 8, -412],
      [c - 24, -428],
    ]),
    l([
      [-1952, jc(-1952) + 10],
      [-1948, -400],
      [-1925, -423],
      [-1480, -436],
    ]));
  {
    let [S, w] = er.wave,
      z = er.real ? di(S, w) + 0.1 : r;
    yo(
      s,
      S,
      w,
      [
        [12, -5],
        [9.5, z + 0.2],
        [0.01, z + 0.2],
      ],
      20,
      a,
    );
    for (let _ = 0; _ < 14; _++) {
      let R = e() * Math.PI * 2,
        T = 2 + e() * 6.5;
      Ne(
        s,
        S + Math.cos(R) * T,
        w + Math.sin(R) * T,
        Math.cos(R),
        Math.sin(R),
        0.4 + e() * 0.8,
        0.3 + e() * 0.5,
        z + 0.2,
        z + 0.5 + e() * 1.1,
        [0.85, 0.83, 0.8, hi.granite],
      );
    }
    for (let _ = 0; _ < 20; _++) {
      let R = -0.3 + _ * 0.17,
        T = 8.5 + (_ % 3) * 0.7,
        E = S + Math.cos(R) * T,
        A = w + Math.sin(R) * T;
      (Qa(
        o,
        E,
        A,
        z - 1.2,
        z + 0.4 + (_ % 4) * 0.35,
        0.16,
        0.16,
        8,
        [0.35, 0.35, 0.33, 0.6],
      ),
        Qa(
          o,
          E,
          A,
          z + 0.4 + (_ % 4) * 0.35,
          z + 0.42 + (_ % 4) * 0.35,
          0.16,
          0.01,
          8,
          [0.05, 0.05, 0.05, 0.6],
        ));
    }
  }
  let h = bC(),
    f = [],
    u = [0.42, 0.39, 0.35, 0.8],
    d = new ye(),
    p = new wn(),
    m = new Ii(),
    g = new xt(),
    b = new xt(),
    [x, v, y, M] = er.docks;
  for (let S = x; S <= v; S += y) {
    let w = jc(S) + 2,
      z = M;
    if (!(w - z < 20)) {
      Ne(
        o,
        S,
        (w + z) / 2,
        0,
        1,
        (w - z) / 2,
        1.2,
        0.2,
        0.65,
        u,
        [1, 1, 1, 1, 1, 0],
      );
      for (let _ = w - 6; _ > z + 2; _ -= 5.2)
        for (let R of [-1, 1])
          if (
            (Ne(
              o,
              S + R * 5.7,
              _,
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
            (m.set(0, R > 0 ? -Math.PI / 2 : Math.PI / 2, (e() - 0.5) * 0.02),
              p.setFromEuler(m),
              g.set(T, T, T),
              b.set(S + R * (5.8 + 4.6 * T), 0, _ - 2.6));
            let E = e(),
              A =
                E < 0.7
                  ? [1, 1, 1]
                  : E < 0.85
                    ? [0.25, 0.3, 0.45]
                    : [0.85, 0.8, 0.65];
            f.push([d.compose(b, p, g).clone(), A]);
          }
    }
  }
  t.inst("boats", h, "paint", f);
  {
    let [S, w] = er.club,
      z = er.club[3] ?? jc(-1960, 2.5) + 6,
      _ = er.club[2] ?? z - 17,
      R = er.real ? di((S + w) / 2, (_ + z) / 2) + 0.1 : 3.3,
      T = 8.2,
      E = [1.25, 1.3, 1.4, hi.stone];
    Ne(
      s,
      (S + w) / 2,
      (_ + z) / 2,
      1,
      0,
      (w - S) / 2 + 3,
      (z - _) / 2 + 3,
      -4,
      R,
      a,
      [1, 1, 1, 1, 1, 0],
    );
    let A = [
      [S, _, w, z, T],
      [S + 6, _ - 7, S + 26, _, T - 3],
      [w - 9, _ - 2, w - 1, _ + 6, T + 6.5],
    ];
    for (let [C, P, I, L, F] of A) {
      (Ne(
        s,
        (C + I) / 2,
        (P + L) / 2,
        1,
        0,
        (I - C) / 2,
        (L - P) / 2,
        R,
        R + F,
        E,
        [1, 1, 1, 1, 0, 0],
      ),
        k2t(
          o,
          C - 0.6,
          P - 0.6,
          I + 0.6,
          L + 0.6,
          R + F,
          Math.min(I - C, L - P) * 0.28,
          [0.45, 0.15, 0.07, 0.75],
        ));
      for (let [N, B, H, O, D] of [
        [C, P, 0, -1, I - C],
        [C, L, 0, 1, I - C],
        [C, P, -1, 0, L - P],
        [I, P, 1, 0, L - P],
      ])
        for (let U = 2; U < D - 1.5; U += 3.2) {
          let G = H ? N + H * 0.09 : N + U,
            q = O ? B + O * 0.09 : B + U;
          for (let [W, V] of [
            [1, 3],
            [4.8, 6.6],
          ])
            V < F - 0.8 &&
              Ne(
                o,
                G,
                q,
                H ? 0 : 1,
                H ? 1 : 0,
                0.6,
                0.04,
                R + W,
                R + V,
                [0.03, 0.04, 0.05, 0.08],
                [0, 0, 1, 1, 0, 0],
              );
        }
    }
    (i.colliders.push({
      t: "box",
      x0: S - 3,
      z0: _ - 10,
      x1: w + 3,
      z1: z + 3,
    }),
      Qa(o, w + 2, z + 1.5, R, R + 16, 0.09, 0.05, 6, [0.85, 0.85, 0.85, 0.4]));
  }
}
function k2t(i, t, e, s, n, o, a, r) {
  let l = s - t,
    c = n - e,
    h = Math.min(l, c) / 2,
    f = [t + h, o + a, e + h],
    u = [s - h, o + a, e + h],
    d = [s - h, o + a, n - h],
    p = [t + h, o + a, n - h];
  l >= c
    ? (f[2] = u[2] = d[2] = p[2] = (e + n) / 2)
    : (f[0] = u[0] = d[0] = p[0] = (t + s) / 2);
  let m = [
    [t, o, e],
    [s, o, e],
    [s, o, n],
    [t, o, n],
  ];
  (js(i, m[0], m[1], u, f, [0, 0], [l, 0], [l, 1], [0, 1], r, [0, 0.7, -0.7]),
    js(i, m[1], m[2], d, u, [0, 0], [c, 0], [c, 1], [0, 1], r, [0.7, 0.7, 0]),
    js(i, m[2], m[3], p, d, [0, 0], [l, 0], [l, 1], [0, 1], r, [0, 0.7, 0.7]),
    js(i, m[3], m[0], f, p, [0, 0], [c, 0], [c, 1], [0, 1], r, [-0.7, 0.7, 0]));
}
