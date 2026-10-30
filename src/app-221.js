// app 221 — math
// Lines 117229-117651 of readable/app.pretty.js (statement-aligned).
function Iz(o, t) {
  UY = Qe.hwy ?? 11.5;
  let e = Qe.towerTop,
    s = (l) => ff("gg", l),
    n = t.G("ggTower", "orange"),
    i = t.G("ggTower", "glow");
  for (let l of [Qe.sTowerS, Qe.sTowerN]) {
    let c = s(l),
      h = c.ux,
      f = c.uz,
      u = -f,
      d = h,
      p = [
        [-2, 72, 6, 5.2],
        [72, 125, 5.4, 4.7],
        [125, 172, 4.9, 4.2],
        [172, e, 4.3, 3.7],
      ];
    for (let x of [-1, 1]) {
      let y = c.x + u * Ll * x,
        M = c.z + d * Ll * x;
      (p.forEach(([S, w, _, z], A) => {
        let T = S + 9,
          E = Math.min(e, w + 9);
        (Ge(n, y, M, h, f, _ + 0.05, z + 0.05, T, E, Rf, [
          1,
          1,
          1,
          1,
          A === 3 ? 0 : 1,
          0,
        ]),
          A < 3 &&
            (Ge(n, y, M, h, f, _ + 0.4, z + 0.4, E - 1.6, E - 0.7, sd),
            Ge(n, y, M, h, f, _ + 0.22, z + 0.22, E - 0.7, E, Rf)));
        let R = T + (A ? 1.2 : 4),
          P = E - (A < 3 ? 2.2 : 6);
        for (let C of [-1, 1]) {
          for (let I = -z + 0.8; I <= z - 0.79; I += 1.25)
            Ge(
              n,
              y + h * (_ + 0.2) * C + u * I,
              M + f * (_ + 0.2) * C + d * I,
              h,
              f,
              0.2,
              0.22,
              R,
              P,
              gc,
              [1, 1, 1, 1, 1, 0],
            );
          for (let I = -_ + 0.8; I <= _ - 0.79; I += 1.25)
            Ge(
              n,
              y + u * (z + 0.2) * C + h * I,
              M + d * (z + 0.2) * C + f * I,
              h,
              f,
              0.22,
              0.2,
              R,
              P,
              gc,
              [1, 1, 1, 1, 1, 0],
            );
        }
        for (let C of [-1, 1])
          for (let I of [-1, 1])
            (Ge(
              n,
              y + h * (_ - 0.15) * C + u * (z - 0.15) * I,
              M + f * (_ - 0.15) * C + d * (z - 0.15) * I,
              h,
              f,
              0.42,
              0.42,
              T + (A ? 0.4 : 2),
              E - (A < 3 ? 1.6 : 0.4),
              sd,
              [1, 1, 1, 1, 1, 0],
            ),
              Ge(
                n,
                y + h * (_ + 0.12) * C + u * (z + 0.12) * I,
                M + f * (_ + 0.12) * C + d * (z + 0.12) * I,
                h,
                f,
                0.2,
                0.2,
                T + (A ? 0.4 : 2),
                E - (A < 3 ? 1.6 : 0.4),
                Rf,
                [1, 1, 1, 1, 1, 0],
              ));
      }),
        Ge(n, y, M, h, f, 4.7, 4.1, e - 7.5, e - 5.5, sd),
        Ge(n, y, M, h, f, 4.5, 3.9, e - 1.2, e + 0.4, sd),
        Ge(n, y, M, h, f, 3.6, 2.6, e + 0.4, e + 3.1, gc),
        Ge(n, y, M, h, f, 2.8, 1.9, e + 3.1, e + 4.3, Rf));
      for (let S of [-1.9, 1.9])
        (Ge(n, y + h * S, M + f * S, h, f, 0.18, 0.18, e + 4.3, e + 5.3, gc),
          Ge(
            i,
            y + h * S,
            M + f * S,
            h,
            f,
            0.55,
            0.55,
            e + 5.3,
            e + 6.4,
            [1, 0.04, 0.02, 0.9],
            [1, 1, 1, 1, 1, 1],
          ));
      for (let S of [112, 170])
        Ge(
          i,
          y + u * (4.9 + 0.45) * x,
          M + d * (4.9 + 0.45) * x,
          h,
          f,
          0.5,
          0.45,
          S,
          S + 1,
          [1, 0.04, 0.02, 0.9],
          [1, 1, 1, 1, 1, 1],
        );
    }
    for (let [x, y] of [
      [e - 7, 7],
      [186, 9],
      [142, 8],
      [102, 8],
    ]) {
      let M = x - y / 2,
        S = x + y / 2,
        w = Ll - 3.5;
      Ge(n, c.x, c.z, h, f, 3.25, w, M, S, Rf, [1, 1, 0, 0, 1, 1]);
      for (let z of [-1, 1]) {
        let A = c.x + h * 3.45 * z,
          T = c.z + f * 3.45 * z;
        (Ge(n, A, T, h, f, 0.22, w, M, M + 0.8, sd, [1, 1, 0, 0, 1, 1]),
          Ge(n, A, T, h, f, 0.22, w, S - 0.9, S, sd, [1, 1, 0, 0, 1, 1]));
        for (let E = -w + 0.9; E <= w - 0.9; E += 1.45)
          Ge(
            n,
            A + u * E,
            T + d * E,
            h,
            f,
            0.16,
            0.2,
            M + 0.8,
            S - 0.9,
            gc,
            [1, 1, 1, 1, 0, 0],
          );
        for (let [E, R] of [
          [0, 3.6],
          [1, 2.4],
          [2, 1.2],
        ])
          Ge(
            n,
            A + h * 0.08 * z,
            T + f * 0.08 * z,
            h,
            f,
            0.2,
            R,
            S - 0.9 - (E + 1) * 0.7,
            S - 0.9 - E * 0.7,
            E % 2 ? gc : sd,
            [1, 1, 1, 1, 1, 1],
          );
      }
      let _ = (z) =>
        (z < 81 ? 5.2 : z < 134 ? 4.7 : z < 181 ? 4.2 : 3.7) + 0.05;
      for (let z of [-1, 1]) {
        let A = Ll - _(M - 1);
        for (let [T, E] of [
          [0, 3],
          [1, 2],
          [2, 1],
        ]) {
          let R = (A - E / 2) * z;
          Ge(
            n,
            c.x + u * R,
            c.z + d * R,
            h,
            f,
            3.1,
            E / 2,
            M - (T + 1) * 1.1,
            M - T * 1.1,
            T % 2 ? Rf : sd,
            [1, 1, 1, 1, 0, 1],
          );
        }
      }
    }
    let m = c.y - 12,
      g = [11, (11 + m - 3) / 2, m - 3],
      b = (x) => [c.x - u * (Ll - 4.8), x, c.z - d * (Ll - 4.8)],
      v = (x) => [c.x + u * (Ll - 4.8), x, c.z + d * (Ll - 4.8)];
    for (let x = 0; x + 1 < g.length; x++) {
      (ci(n, b(g[x]), v(g[x + 1]), 1.8, 1.6, gc),
        ci(n, v(g[x]), b(g[x + 1]), 1.8, 1.6, gc),
        Ge(
          n,
          c.x,
          c.z,
          h,
          f,
          2.4,
          Ll - 4.5,
          g[x + 1] - 1.2,
          g[x + 1] + 1.2,
          Rf,
        ));
      let y = (g[x] + g[x + 1]) / 2;
      for (let M of [-1, 1]) {
        let S = (w, _) => [w[0] + h * M * _, w[1], w[2] + f * M * _];
        (ci(n, S(b(g[x]), 1), S(v(g[x + 1]), 1), 0.3, 2, Rf),
          ci(n, S(v(g[x]), 1), S(b(g[x + 1]), 1), 0.3, 2, Rf),
          Ge(
            n,
            c.x + h * M * 1.2,
            c.z + f * M * 1.2,
            h,
            f,
            0.12,
            3.2,
            y - 3.2,
            y + 3.2,
            sd,
            [1, 1, 1, 1, 1, 1],
          ));
        for (let w = -(Ll - 6); w < Ll - 6 - 2.3; w += 2.4)
          ci(
            n,
            [
              c.x + u * w + h * M * 2.45,
              g[x + 1] - 1,
              c.z + d * w + f * M * 2.45,
            ],
            [
              c.x + u * (w + 2.4) + h * M * 2.45,
              g[x + 1] + 1,
              c.z + d * (w + 2.4) + f * M * 2.45,
            ],
            0.18,
            0.18,
            gc,
          );
      }
    }
    for (let x of [-1, 1])
      for (let y of [-1, 1])
        Ge(
          i,
          c.x + h * 31 * x + u * 33 * y,
          c.z + f * 31 * x + d * 33 * y,
          h,
          f,
          0.3,
          0.3,
          9.2,
          10,
          [1, 0.05, 0.02, 0.15],
          [1, 1, 1, 1, 1, 1],
        );
  }
  for (let l of [-1, 1]) {
    let c = [],
      h = null;
    for (let f = Qe.sAnchS; f <= Qe.sAnchN + 0.1; f += 4) {
      let u = s(f),
        d = Ixt(f),
        p = [u.x - u.uz * Ll * l, d, u.z + u.ux * Ll * l];
      (d > 115 || (h && h[1] > 115)
        ? (!c.length && h && c.push(h), c.push(p))
        : c.length && (c.push(p), Ox(n, c, 0.48, 14, DY), (c = [])),
        (h = p));
    }
    c.length && Ox(n, c, 0.48, 14, DY);
  }
  {
    let l = s((Qe.sTowerS + Qe.sTowerN) / 2);
    for (let c of [-1, 1])
      Ge(
        i,
        l.x - l.uz * 15 * c,
        l.z + l.ux * 15 * c,
        l.ux,
        l.uz,
        0.35,
        0.35,
        l.y - 9.8,
        l.y - 9,
        [0.05, 1, 0.25, 0.3],
        [1, 1, 1, 1, 1, 1],
      );
  }
  let a = t.G("ggDeck", "gpaint"),
    r = t.G("ggDeck", "glow");
  for (
    let l = Qe.lampS0 ?? Qe.sAnchS - 40;
    l <= (Qe.lampS1 ?? Qe.sAnchN + 30);
    l += 30.48
  ) {
    let c = s(l);
    for (let h of [-1, 1]) {
      let f = (UY + 0.62) * h,
        u = c.x - c.uz * f,
        d = c.z + c.ux * f,
        p = c.y;
      (To(
        a,
        u,
        d,
        [
          [0.3, p],
          [0.3, p + 0.5],
          [0.2, p + 0.65],
          [0.16, p + 1.2],
          [0.12, p + 6.6],
          [0.16, p + 6.9],
          [0.1, p + 7.1],
        ],
        8,
        [0.6, 0.1, 0.035, 0.55],
      ),
        Ge(
          a,
          u,
          d,
          c.ux,
          c.uz,
          0.36,
          0.36,
          p - 0.05,
          p + 0.18,
          [0.55, 0.09, 0.032, 0.55],
          [1, 1, 1, 1, 1, 0],
        ),
        Ge(
          a,
          u,
          d,
          c.ux,
          c.uz,
          0.33,
          0.33,
          p + 0.18,
          p + 0.42,
          [0.62, 0.1, 0.036, 0.55],
          [1, 1, 1, 1, 1, 0],
        ));
      for (let y = 0; y < 8; y++) {
        let M = (y / 8) * Math.PI * 2 + Math.PI / 8,
          S = Math.cos(M),
          w = Math.sin(M);
        ci(
          a,
          [u + S * 0.165, p + 1.25, d + w * 0.165],
          [u + S * 0.125, p + 6.5, d + w * 0.125],
          0.04,
          0.04,
          [0.5, 0.08, 0.03, 0.55],
        );
      }
      To(
        a,
        u,
        d,
        [
          [0.13, p + 6.1],
          [0.19, p + 6.18],
          [0.19, p + 6.3],
          [0.13, p + 6.38],
        ],
        8,
        [0.66, 0.12, 0.04, 0.5],
      );
      let m = -(-c.uz * h),
        g = -(c.ux * h),
        b = [u, p + 6.8, d],
        v = [u + m * 1.1, p + 7.35, d + g * 1.1],
        x = [u + m * 1.7, p + 7.25, d + g * 1.7];
      (ci(a, b, v, 0.09, 0.09, [0.6, 0.1, 0.035, 0.55]),
        ci(a, v, x, 0.09, 0.09, [0.6, 0.1, 0.035, 0.55]),
        To(
          a,
          x[0],
          x[2],
          [
            [0.05, p + 7.2],
            [0.36, p + 7.05],
            [0.3, p + 6.95],
          ],
          8,
          [0.5, 0.08, 0.03, 0.5],
        ),
        To(
          r,
          x[0],
          x[2],
          [
            [0.28, p + 6.96],
            [0.22, p + 6.72],
            [0.02, p + 6.66],
          ],
          8,
          [1, 0.52, 0.16, 0],
        ));
    }
  }
  (Bxt(o, t), Nxt(o, t), Hxt(o, t));
}
