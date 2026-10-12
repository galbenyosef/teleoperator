// app 222 — math
// Lines 116973-117395 of readable/app.pretty.js (statement-aligned).
function Ik(i, t) {
  OX = Ye.hwy ?? 11.5;
  let e = Ye.towerTop,
    s = (l) => Fh("gg", l),
    n = t.G("ggTower", "orange"),
    o = t.G("ggTower", "glow");
  for (let l of [Ye.sTowerS, Ye.sTowerN]) {
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
    for (let v of [-1, 1]) {
      let y = c.x + u * fl * v,
        M = c.z + d * fl * v;
      (p.forEach(([S, w, z, _], R) => {
        let T = S + 9,
          E = Math.min(e, w + 9);
        (Ne(n, y, M, h, f, z + 0.05, _ + 0.05, T, E, Yh, [
          1,
          1,
          1,
          1,
          R === 3 ? 0 : 1,
          0,
        ]),
          R < 3 &&
            (Ne(n, y, M, h, f, z + 0.4, _ + 0.4, E - 1.6, E - 0.7, wu),
            Ne(n, y, M, h, f, z + 0.22, _ + 0.22, E - 0.7, E, Yh)));
        let A = T + (R ? 1.2 : 4),
          C = E - (R < 3 ? 2.2 : 6);
        for (let P of [-1, 1]) {
          for (let I = -_ + 0.8; I <= _ - 0.79; I += 1.25)
            Ne(
              n,
              y + h * (z + 0.2) * P + u * I,
              M + f * (z + 0.2) * P + d * I,
              h,
              f,
              0.2,
              0.22,
              A,
              C,
              Kl,
              [1, 1, 1, 1, 1, 0],
            );
          for (let I = -z + 0.8; I <= z - 0.79; I += 1.25)
            Ne(
              n,
              y + u * (_ + 0.2) * P + h * I,
              M + d * (_ + 0.2) * P + f * I,
              h,
              f,
              0.22,
              0.2,
              A,
              C,
              Kl,
              [1, 1, 1, 1, 1, 0],
            );
        }
        for (let P of [-1, 1])
          for (let I of [-1, 1])
            (Ne(
              n,
              y + h * (z - 0.15) * P + u * (_ - 0.15) * I,
              M + f * (z - 0.15) * P + d * (_ - 0.15) * I,
              h,
              f,
              0.42,
              0.42,
              T + (R ? 0.4 : 2),
              E - (R < 3 ? 1.6 : 0.4),
              wu,
              [1, 1, 1, 1, 1, 0],
            ),
              Ne(
                n,
                y + h * (z + 0.12) * P + u * (_ + 0.12) * I,
                M + f * (z + 0.12) * P + d * (_ + 0.12) * I,
                h,
                f,
                0.2,
                0.2,
                T + (R ? 0.4 : 2),
                E - (R < 3 ? 1.6 : 0.4),
                Yh,
                [1, 1, 1, 1, 1, 0],
              ));
      }),
        Ne(n, y, M, h, f, 4.7, 4.1, e - 7.5, e - 5.5, wu),
        Ne(n, y, M, h, f, 4.5, 3.9, e - 1.2, e + 0.4, wu),
        Ne(n, y, M, h, f, 3.6, 2.6, e + 0.4, e + 3.1, Kl),
        Ne(n, y, M, h, f, 2.8, 1.9, e + 3.1, e + 4.3, Yh));
      for (let S of [-1.9, 1.9])
        (Ne(n, y + h * S, M + f * S, h, f, 0.18, 0.18, e + 4.3, e + 5.3, Kl),
          Ne(
            o,
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
        Ne(
          o,
          y + u * (4.9 + 0.45) * v,
          M + d * (4.9 + 0.45) * v,
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
    for (let [v, y] of [
      [e - 7, 7],
      [186, 9],
      [142, 8],
      [102, 8],
    ]) {
      let M = v - y / 2,
        S = v + y / 2,
        w = fl - 3.5;
      Ne(n, c.x, c.z, h, f, 3.25, w, M, S, Yh, [1, 1, 0, 0, 1, 1]);
      for (let _ of [-1, 1]) {
        let R = c.x + h * 3.45 * _,
          T = c.z + f * 3.45 * _;
        (Ne(n, R, T, h, f, 0.22, w, M, M + 0.8, wu, [1, 1, 0, 0, 1, 1]),
          Ne(n, R, T, h, f, 0.22, w, S - 0.9, S, wu, [1, 1, 0, 0, 1, 1]));
        for (let E = -w + 0.9; E <= w - 0.9; E += 1.45)
          Ne(
            n,
            R + u * E,
            T + d * E,
            h,
            f,
            0.16,
            0.2,
            M + 0.8,
            S - 0.9,
            Kl,
            [1, 1, 1, 1, 0, 0],
          );
        for (let [E, A] of [
          [0, 3.6],
          [1, 2.4],
          [2, 1.2],
        ])
          Ne(
            n,
            R + h * 0.08 * _,
            T + f * 0.08 * _,
            h,
            f,
            0.2,
            A,
            S - 0.9 - (E + 1) * 0.7,
            S - 0.9 - E * 0.7,
            E % 2 ? Kl : wu,
            [1, 1, 1, 1, 1, 1],
          );
      }
      let z = (_) =>
        (_ < 81 ? 5.2 : _ < 134 ? 4.7 : _ < 181 ? 4.2 : 3.7) + 0.05;
      for (let _ of [-1, 1]) {
        let R = fl - z(M - 1);
        for (let [T, E] of [
          [0, 3],
          [1, 2],
          [2, 1],
        ]) {
          let A = (R - E / 2) * _;
          Ne(
            n,
            c.x + u * A,
            c.z + d * A,
            h,
            f,
            3.1,
            E / 2,
            M - (T + 1) * 1.1,
            M - T * 1.1,
            T % 2 ? Yh : wu,
            [1, 1, 1, 1, 0, 1],
          );
        }
      }
    }
    let m = c.y - 12,
      g = [11, (11 + m - 3) / 2, m - 3],
      b = (v) => [c.x - u * (fl - 4.8), v, c.z - d * (fl - 4.8)],
      x = (v) => [c.x + u * (fl - 4.8), v, c.z + d * (fl - 4.8)];
    for (let v = 0; v + 1 < g.length; v++) {
      (ii(n, b(g[v]), x(g[v + 1]), 1.8, 1.6, Kl),
        ii(n, x(g[v]), b(g[v + 1]), 1.8, 1.6, Kl),
        Ne(
          n,
          c.x,
          c.z,
          h,
          f,
          2.4,
          fl - 4.5,
          g[v + 1] - 1.2,
          g[v + 1] + 1.2,
          Yh,
        ));
      let y = (g[v] + g[v + 1]) / 2;
      for (let M of [-1, 1]) {
        let S = (w, z) => [w[0] + h * M * z, w[1], w[2] + f * M * z];
        (ii(n, S(b(g[v]), 1), S(x(g[v + 1]), 1), 0.3, 2, Yh),
          ii(n, S(x(g[v]), 1), S(b(g[v + 1]), 1), 0.3, 2, Yh),
          Ne(
            n,
            c.x + h * M * 1.2,
            c.z + f * M * 1.2,
            h,
            f,
            0.12,
            3.2,
            y - 3.2,
            y + 3.2,
            wu,
            [1, 1, 1, 1, 1, 1],
          ));
        for (let w = -(fl - 6); w < fl - 6 - 2.3; w += 2.4)
          ii(
            n,
            [
              c.x + u * w + h * M * 2.45,
              g[v + 1] - 1,
              c.z + d * w + f * M * 2.45,
            ],
            [
              c.x + u * (w + 2.4) + h * M * 2.45,
              g[v + 1] + 1,
              c.z + d * (w + 2.4) + f * M * 2.45,
            ],
            0.18,
            0.18,
            Kl,
          );
      }
    }
    for (let v of [-1, 1])
      for (let y of [-1, 1])
        Ne(
          o,
          c.x + h * 31 * v + u * 33 * y,
          c.z + f * 31 * v + d * 33 * y,
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
    for (let f = Ye.sAnchS; f <= Ye.sAnchN + 0.1; f += 4) {
      let u = s(f),
        d = h2t(f),
        p = [u.x - u.uz * fl * l, d, u.z + u.ux * fl * l];
      (d > 115 || (h && h[1] > 115)
        ? (!c.length && h && c.push(h), c.push(p))
        : c.length && (c.push(p), Yb(n, c, 0.48, 14, BX), (c = [])),
        (h = p));
    }
    c.length && Yb(n, c, 0.48, 14, BX);
  }
  {
    let l = s((Ye.sTowerS + Ye.sTowerN) / 2);
    for (let c of [-1, 1])
      Ne(
        o,
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
    let l = Ye.lampS0 ?? Ye.sAnchS - 40;
    l <= (Ye.lampS1 ?? Ye.sAnchN + 30);
    l += 30.48
  ) {
    let c = s(l);
    for (let h of [-1, 1]) {
      let f = (OX + 0.62) * h,
        u = c.x - c.uz * f,
        d = c.z + c.ux * f,
        p = c.y;
      (yo(
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
        Ne(
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
        Ne(
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
        ii(
          a,
          [u + S * 0.165, p + 1.25, d + w * 0.165],
          [u + S * 0.125, p + 6.5, d + w * 0.125],
          0.04,
          0.04,
          [0.5, 0.08, 0.03, 0.55],
        );
      }
      yo(
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
        x = [u + m * 1.1, p + 7.35, d + g * 1.1],
        v = [u + m * 1.7, p + 7.25, d + g * 1.7];
      (ii(a, b, x, 0.09, 0.09, [0.6, 0.1, 0.035, 0.55]),
        ii(a, x, v, 0.09, 0.09, [0.6, 0.1, 0.035, 0.55]),
        yo(
          a,
          v[0],
          v[2],
          [
            [0.05, p + 7.2],
            [0.36, p + 7.05],
            [0.3, p + 6.95],
          ],
          8,
          [0.5, 0.08, 0.03, 0.5],
        ),
        yo(
          r,
          v[0],
          v[2],
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
  (d2t(i, t), p2t(i, t), m2t(i, t));
}
