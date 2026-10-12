// app 203 — math
// Lines 111042-111397 of readable/app.pretty.js (statement-aligned).
function Y1t(i, t) {
  let { D: e, L: s } = t,
    n = [0.988, -0.156],
    o = [-0.156, -0.988];
  for (let a of Ja.levis) {
    let r = bu(e, a);
    if (!r) continue;
    let l = va(r),
      [c, h] = ap(s, l),
      f = Math.max(h, r.base) + 0.05,
      u = r.top - r.base,
      d = Math.max(3, Math.round(u / 3.3)),
      p = l.map((z) => z[0] * n[0] + z[1] * n[1]),
      m = l.map((z) => z[0] * o[0] + z[1] * o[1]),
      g = Math.max(...p),
      b = Math.min(...p),
      x = Math.max(...m),
      v = Math.min(...m),
      y = 2,
      M = Math.min(4.5, ((g - b) * 0.55) / Math.max(1, d - y)),
      S = Math.min(3.2, ((x - v) * 0.2) / Math.max(1, d - y));
    ys(i, l, c - 0.5, f, kk);
    let w = null;
    for (let z = 0; z < d; z++) {
      let _ = Math.max(0, z - y + 1),
        R = l;
      if (
        (_ > 0 &&
          ((R = Ek(R, n, g - _ * M)),
          R && (R = Ek(R, o, x - _ * S)),
          R && (R = Ek(R, [-o[0], -o[1]], -(v + _ * S)))),
        !R || U1t(R) < 40)
      )
        break;
      let T = f + z * 3.3,
        E = T + 3.3;
      ys(i, R, T, E, W1t, { vBase: f });
      for (let A of Xo(R)) {
        if (A.L < 2) continue;
        let C = 0.09,
          P = [A.a[0] + A.n[0] * C, A.a[1] + A.n[1] * C],
          I = [A.b[0] + A.n[0] * C, A.b[1] + A.n[1] * C],
          L = z === 0 ? 0.3 : 1,
          F = z === 0 ? 3 : 2.55;
        ne(
          i,
          [
            [P[0], T + L, P[1]],
            [I[0], T + L, I[1]],
            [I[0], T + F, I[1]],
            [P[0], T + F, P[1]],
          ],
          q1t,
          [A.n[0], 0, A.n[1]],
        );
        for (let N = 0.9; N < A.L - 0.5; N += 1.8) {
          let B = A.a[0] + A.u[0] * (N - 0.11) + A.n[0] * 0.15,
            H = A.a[1] + A.u[1] * (N - 0.11) + A.n[1] * 0.15,
            O = B + A.u[0] * 0.22,
            D = H + A.u[1] * 0.22;
          -A.u[1] * A.n[0] + A.u[0] * A.n[1] >= 0
            ? i.quad(
                [B, T + L, H],
                [O, T + L, D],
                [O, T + F, D],
                [B, T + F, H],
                [0, 0],
                [0.22, 0],
                [0.22, F - L],
                [0, F - L],
                kk,
                [A.n[0], 0, A.n[1]],
              )
            : i.quad(
                [O, T + L, D],
                [B, T + L, H],
                [B, T + F, H],
                [O, T + F, D],
                [0, 0],
                [0.22, 0],
                [0.22, F - L],
                [0, F - L],
                kk,
                [A.n[0], 0, A.n[1]],
              );
        }
      }
      if ((Ua(i, R, E, j1t), (w = R), _ > 0 && z % 2 === 0)) {
        let A = Xo(R);
        for (let C of A)
          C.L > 6 &&
            C.n[0] * n[0] + C.n[1] * n[1] > 0.6 &&
            nn(
              i,
              [C.m[0] - C.n[0] * 0.7, C.m[1] - C.n[1] * 0.7],
              C.u,
              C.n,
              C.L / 2 - 1,
              0.45,
              E,
              E + 0.7,
              K1t,
            );
      }
    }
    if (w) {
      let z = Xo(w);
      vo(i, z, 0.25, f + d * 3.3 - 0.05, f + d * 3.3 + 0.5, kk);
    }
    xu(t, l, c - 3, f + u + 2);
  }
  {
    let a = [-791, -793],
      r = [0.988, -0.156],
      l = [0.156, 0.988],
      c = s.terrainAt(...a) + 0.05;
    for (let h = 0; h < 4; h++) {
      let f = 9 - h * 1.6,
        u = 6 - h * 1.3,
        d = c + h * 4.4,
        p = d + 4.4,
        m = [a[0] - l[0] * h * 1.3, a[1] - l[1] * h * 1.3];
      nn(i, m, r, l, f, u, d, p, X1t);
      for (let g = -f; g <= f + 0.01; g += 1.8) {
        let b = [
          m[0] + r[0] * g + l[0] * (u + 0.03),
          m[1] + r[1] * g + l[1] * (u + 0.03),
        ];
        Ae(i, [b[0], d, b[1]], [b[0], p, b[1]], 0.05, jP, 4);
      }
      nn(i, m, r, l, f + 0.1, u + 0.1, p - 0.2, p + 0.06, jP);
    }
    t.colliders.push({
      t: "obb",
      x: a[0],
      z: a[1],
      hx: 9,
      hz: 6,
      c: r[0],
      s: r[1],
      y0: c - 2,
      y1: c + 18,
    });
  }
  G1t(i, s, Ja.plaza, 2, 0.08, () => V1t);
  for (let [a, r, l] of [
    [0.7071, 0.7071, 0.16],
    [0.7071, -0.7071, 0.22],
  ]) {
    let c = -r,
      h = a,
      f = -770 * c - 760 * h,
      u = -770 * a - 760 * r;
    for (let d = Math.round(f / 11) * 11 - 66; d < f + 66; d += 11)
      for (let p = u - 60; p < u + 60; p += 1.5) {
        let m = c * d + a * p,
          g = h * d + r * p,
          b = m + a * 1.5,
          x = g + r * 1.5;
        if (
          m < -805 ||
          m > -735 ||
          g < -800 ||
          g > -720 ||
          !qP(Ja.plaza, m, g) ||
          !qP(Ja.plaza, b, x)
        )
          continue;
        let v = [
          [m - c * 0.6, g - h * 0.6],
          [b - c * 0.6, x - h * 0.6],
          [b + c * 0.6, x + h * 0.6],
          [m + c * 0.6, g + h * 0.6],
        ].map(([y, M]) => [y, s.terrainAt(y, M) + l, M]);
        ne(i, v, $1t, [0, 1, 0], (y) => [y[0], y[2]]);
      }
  }
  {
    let [a, r] = Ja.fountain,
      l = s.terrainAt(a, r) + 0.09,
      c = [0.97, 0.24],
      h = [-0.24, 0.97],
      f = (m, g) => [a + c[0] * m + h[0] * g, r + c[1] * m + h[1] * g],
      u = 8.5,
      d = 6;
    for (let [m, g, b, x] of [
      [0, d, u, 0.35],
      [0, -d, u, 0.35],
      [u, 0, 0.35, d],
      [-u, 0, 0.35, d],
    ])
      nn(i, f(m, g), c, h, b, x, l - 0.1, l + 0.55, UP);
    for (let m = 0; m < 2; m++)
      nn(
        i,
        f(0, d - 0.9 - m * 0.7),
        c,
        h,
        u - 0.4,
        0.35,
        l - 0.2,
        l + 0.4 - m * 0.2,
        _k,
      );
    xa(i, [f(-u, -d), f(u, -d), f(u, d), f(-u, d)], l + 0.25, H$);
    let p = [
      [-1.6, 0, 1.3, 1.9, 5.6],
      [0.6, -0.3, 1.1, 1.7, 6.2],
      [2.5, 0.2, 0.9, 1.6, 5.1],
    ];
    for (let [m, g, b, x, v] of p) {
      nn(i, f(m, g), c, h, b, x, l, l + v, UP);
      for (let y = -1; y <= 1; y += 2)
        for (let M = 0; M < 4; M++) {
          let S = Math.abs(Math.sin(m * 91.3 + M * 17.1 + y * 3.7)),
            w = -b * 0.85 + (M + 0.15 * S) * b * 0.45,
            z = 0.18 + 0.25 * S,
            _ = f(m, g + y * (x + 0.09)),
            R = [_[0] + c[0] * w, _[1] + c[1] * w],
            T = [_[0] + c[0] * (w + z), _[1] + c[1] * (w + z)],
            E = l + v - 0.2 - 1.2 * S;
          ne(
            i,
            [
              [R[0], l + 0.2, R[1]],
              [T[0], l + 0.2, T[1]],
              [T[0], E, T[1]],
              [R[0], E, R[1]],
            ],
            D$,
            [h[0] * y, 0, h[1] * y],
          );
        }
    }
    for (let m = 0; m < 7; m++) {
      let g = -3 + m * 0.9,
        b = (m % 2 ? 1 : -1) * (1.9 + 0.3 * (m % 3));
      nn(i, f(g, b), c, h, 0.35, 0.3, l, l + 0.7 + 0.25 * (m % 3), _k);
    }
    t.colliders.push({
      t: "obb",
      x: a,
      z: r,
      hx: u + 0.4,
      hz: d + 0.4,
      c: c[0],
      s: c[1],
      y0: l - 2,
      y1: l + 7,
    });
  }
  {
    let [a, r] = Ja.cascade,
      l = 7,
      c = (r[0] - a[0]) / l,
      h = (r[1] - a[1]) / l,
      f = Math.hypot(c, h),
      u = [c / f, h / f],
      d = [-u[1], u[0]],
      p = s.terrainAt(...a) + 0.75;
    for (let m = 0; m < l; m++) {
      let g = [a[0] + c * (m + 0.5), a[1] + h * (m + 0.5)],
        b = s.terrainAt(...g),
        x = Math.max(b + 0.2, p - m * 0.18),
        v = 2.6 + (m % 3) * 0.7;
      for (let [y, M, S, w] of [
        [0, v, f / 2, 0.4],
        [0, -v, f / 2, 0.4],
      ])
        nn(
          i,
          [g[0] + u[0] * y + d[0] * M, g[1] + u[1] * y + d[1] * M],
          u,
          d,
          S,
          w,
          b - 0.2,
          x + 0.22,
          UP,
        );
      (nn(
        i,
        [g[0] + u[0] * (f / 2 - 0.3), g[1] + u[1] * (f / 2 - 0.3)],
        u,
        d,
        0.3,
        v - 0.4,
        b - 0.2,
        x + 0.02,
        _k,
      ),
        ne(
          i,
          [
            [
              g[0] + (u[0] * f) / 2 + d[0] * v,
              x - 0.05,
              g[1] + (u[1] * f) / 2 + d[1] * v,
            ],
            [
              g[0] + (u[0] * f) / 2 - d[0] * v,
              x - 0.05,
              g[1] + (u[1] * f) / 2 - d[1] * v,
            ],
            [
              g[0] + u[0] * (f / 2 + 0.05) - d[0] * v,
              x - 0.4,
              g[1] + u[1] * (f / 2 + 0.05) - d[1] * v,
            ],
            [
              g[0] + u[0] * (f / 2 + 0.05) + d[0] * v,
              x - 0.4,
              g[1] + u[1] * (f / 2 + 0.05) + d[1] * v,
            ],
          ],
          D$,
          [u[0], 0, u[1]],
        ));
      {
        let y = f / 2 - 0.6;
        xa(
          i,
          [
            [
              g[0] - (u[0] * f) / 2 - d[0] * v,
              g[1] - (u[1] * f) / 2 - d[1] * v,
            ],
            [g[0] + u[0] * y - d[0] * v, g[1] + u[1] * y - d[1] * v],
            [g[0] + u[0] * y + d[0] * v, g[1] + u[1] * y + d[1] * v],
            [
              g[0] - (u[0] * f) / 2 + d[0] * v,
              g[1] - (u[1] * f) / 2 + d[1] * v,
            ],
          ],
          x,
          H$,
        );
      }
      if (m % 2 === 0) {
        let y = [g[0] + d[0] * (v + 1.6), g[1] + d[1] * (v + 1.6)];
        nn(i, y, u, d, 1.2, 0.8, b - 0.2, b + 0.5 + ((0.2 * m) % 3), _k);
      }
      t.colliders.push({
        t: "obb",
        x: g[0],
        z: g[1],
        hx: f / 2,
        hz: v + 0.4,
        c: u[0],
        s: u[1],
        y0: b - 2,
        y1: b + 3,
      });
    }
  }
}
