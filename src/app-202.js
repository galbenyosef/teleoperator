// app 202 — math
// Lines 111298-111653 of readable/app.pretty.js (statement-aligned).
function ybt(o, t) {
  let { D: e, L: s } = t,
    n = [0.988, -0.156],
    i = [-0.156, -0.988];
  for (let a of dr.levis) {
    let r = Zu(e, a);
    if (!r) continue;
    let l = Ra(r),
      [c, h] = Np(s, l),
      f = Math.max(h, r.base) + 0.05,
      u = r.top - r.base,
      d = Math.max(3, Math.round(u / 3.3)),
      p = l.map((_) => _[0] * n[0] + _[1] * n[1]),
      m = l.map((_) => _[0] * i[0] + _[1] * i[1]),
      g = Math.max(...p),
      b = Math.min(...p),
      v = Math.max(...m),
      x = Math.min(...m),
      y = 2,
      M = Math.min(4.5, ((g - b) * 0.55) / Math.max(1, d - y)),
      S = Math.min(3.2, ((v - x) * 0.2) / Math.max(1, d - y));
    Ss(o, l, c - 0.5, f, kz);
    let w = null;
    for (let _ = 0; _ < d; _++) {
      let z = Math.max(0, _ - y + 1),
        A = l;
      if (
        (z > 0 &&
          ((A = Ez(A, n, g - z * M)),
          A && (A = Ez(A, i, v - z * S)),
          A && (A = Ez(A, [-i[0], -i[1]], -(x + z * S)))),
        !A || fbt(A) < 40)
      )
        break;
      let T = f + _ * 3.3,
        E = T + 3.3;
      Ss(o, A, T, E, dbt, { vBase: f });
      for (let R of ia(A)) {
        if (R.L < 2) continue;
        let P = 0.09,
          C = [R.a[0] + R.n[0] * P, R.a[1] + R.n[1] * P],
          I = [R.b[0] + R.n[0] * P, R.b[1] + R.n[1] * P],
          L = _ === 0 ? 0.3 : 1,
          F = _ === 0 ? 3 : 2.55;
        oe(
          o,
          [
            [C[0], T + L, C[1]],
            [I[0], T + L, I[1]],
            [I[0], T + F, I[1]],
            [C[0], T + F, C[1]],
          ],
          pbt,
          [R.n[0], 0, R.n[1]],
        );
        for (let O = 0.9; O < R.L - 0.5; O += 1.8) {
          let B = R.a[0] + R.u[0] * (O - 0.11) + R.n[0] * 0.15,
            H = R.a[1] + R.u[1] * (O - 0.11) + R.n[1] * 0.15,
            N = B + R.u[0] * 0.22,
            D = H + R.u[1] * 0.22;
          -R.u[1] * R.n[0] + R.u[0] * R.n[1] >= 0
            ? o.quad(
                [B, T + L, H],
                [N, T + L, D],
                [N, T + F, D],
                [B, T + F, H],
                [0, 0],
                [0.22, 0],
                [0.22, F - L],
                [0, F - L],
                kz,
                [R.n[0], 0, R.n[1]],
              )
            : o.quad(
                [N, T + L, D],
                [B, T + L, H],
                [B, T + F, H],
                [N, T + F, D],
                [0, 0],
                [0.22, 0],
                [0.22, F - L],
                [0, F - L],
                kz,
                [R.n[0], 0, R.n[1]],
              );
        }
      }
      if ((sr(o, A, E, mbt), (w = A), z > 0 && _ % 2 === 0)) {
        let R = ia(A);
        for (let P of R)
          P.L > 6 &&
            P.n[0] * n[0] + P.n[1] * n[1] > 0.6 &&
            cn(
              o,
              [P.m[0] - P.n[0] * 0.7, P.m[1] - P.n[1] * 0.7],
              P.u,
              P.n,
              P.L / 2 - 1,
              0.45,
              E,
              E + 0.7,
              vbt,
            );
      }
    }
    if (w) {
      let _ = ia(w);
      Eo(o, _, 0.25, f + d * 3.3 - 0.05, f + d * 3.3 + 0.5, kz);
    }
    Qu(t, l, c - 3, f + u + 2);
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
      cn(o, m, r, l, f, u, d, p, xbt);
      for (let g = -f; g <= f + 0.01; g += 1.8) {
        let b = [
          m[0] + r[0] * g + l[0] * (u + 0.03),
          m[1] + r[1] * g + l[1] * (u + 0.03),
        ];
        Ce(o, [b[0], d, b[1]], [b[0], p, b[1]], 0.05, wL, 4);
      }
      cn(o, m, r, l, f + 0.1, u + 0.1, p - 0.2, p + 0.06, wL);
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
  ubt(o, s, dr.plaza, 2, 0.08, () => gbt);
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
          v = g + r * 1.5;
        if (
          m < -805 ||
          m > -735 ||
          g < -800 ||
          g > -720 ||
          !yL(dr.plaza, m, g) ||
          !yL(dr.plaza, b, v)
        )
          continue;
        let x = [
          [m - c * 0.6, g - h * 0.6],
          [b - c * 0.6, v - h * 0.6],
          [b + c * 0.6, v + h * 0.6],
          [m + c * 0.6, g + h * 0.6],
        ].map(([y, M]) => [y, s.terrainAt(y, M) + l, M]);
        oe(o, x, bbt, [0, 1, 0], (y) => [y[0], y[2]]);
      }
  }
  {
    let [a, r] = dr.fountain,
      l = s.terrainAt(a, r) + 0.09,
      c = [0.97, 0.24],
      h = [-0.24, 0.97],
      f = (m, g) => [a + c[0] * m + h[0] * g, r + c[1] * m + h[1] * g],
      u = 8.5,
      d = 6;
    for (let [m, g, b, v] of [
      [0, d, u, 0.35],
      [0, -d, u, 0.35],
      [u, 0, 0.35, d],
      [-u, 0, 0.35, d],
    ])
      cn(o, f(m, g), c, h, b, v, l - 0.1, l + 0.55, bL);
    for (let m = 0; m < 2; m++)
      cn(
        o,
        f(0, d - 0.9 - m * 0.7),
        c,
        h,
        u - 0.4,
        0.35,
        l - 0.2,
        l + 0.4 - m * 0.2,
        zz,
      );
    Ta(o, [f(-u, -d), f(u, -d), f(u, d), f(-u, d)], l + 0.25, GK);
    let p = [
      [-1.6, 0, 1.3, 1.9, 5.6],
      [0.6, -0.3, 1.1, 1.7, 6.2],
      [2.5, 0.2, 0.9, 1.6, 5.1],
    ];
    for (let [m, g, b, v, x] of p) {
      cn(o, f(m, g), c, h, b, v, l, l + x, bL);
      for (let y = -1; y <= 1; y += 2)
        for (let M = 0; M < 4; M++) {
          let S = Math.abs(Math.sin(m * 91.3 + M * 17.1 + y * 3.7)),
            w = -b * 0.85 + (M + 0.15 * S) * b * 0.45,
            _ = 0.18 + 0.25 * S,
            z = f(m, g + y * (v + 0.09)),
            A = [z[0] + c[0] * w, z[1] + c[1] * w],
            T = [z[0] + c[0] * (w + _), z[1] + c[1] * (w + _)],
            E = l + x - 0.2 - 1.2 * S;
          oe(
            o,
            [
              [A[0], l + 0.2, A[1]],
              [T[0], l + 0.2, T[1]],
              [T[0], E, T[1]],
              [A[0], E, A[1]],
            ],
            VK,
            [h[0] * y, 0, h[1] * y],
          );
        }
    }
    for (let m = 0; m < 7; m++) {
      let g = -3 + m * 0.9,
        b = (m % 2 ? 1 : -1) * (1.9 + 0.3 * (m % 3));
      cn(o, f(g, b), c, h, 0.35, 0.3, l, l + 0.7 + 0.25 * (m % 3), zz);
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
    let [a, r] = dr.cascade,
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
        v = Math.max(b + 0.2, p - m * 0.18),
        x = 2.6 + (m % 3) * 0.7;
      for (let [y, M, S, w] of [
        [0, x, f / 2, 0.4],
        [0, -x, f / 2, 0.4],
      ])
        cn(
          o,
          [g[0] + u[0] * y + d[0] * M, g[1] + u[1] * y + d[1] * M],
          u,
          d,
          S,
          w,
          b - 0.2,
          v + 0.22,
          bL,
        );
      (cn(
        o,
        [g[0] + u[0] * (f / 2 - 0.3), g[1] + u[1] * (f / 2 - 0.3)],
        u,
        d,
        0.3,
        x - 0.4,
        b - 0.2,
        v + 0.02,
        zz,
      ),
        oe(
          o,
          [
            [
              g[0] + (u[0] * f) / 2 + d[0] * x,
              v - 0.05,
              g[1] + (u[1] * f) / 2 + d[1] * x,
            ],
            [
              g[0] + (u[0] * f) / 2 - d[0] * x,
              v - 0.05,
              g[1] + (u[1] * f) / 2 - d[1] * x,
            ],
            [
              g[0] + u[0] * (f / 2 + 0.05) - d[0] * x,
              v - 0.4,
              g[1] + u[1] * (f / 2 + 0.05) - d[1] * x,
            ],
            [
              g[0] + u[0] * (f / 2 + 0.05) + d[0] * x,
              v - 0.4,
              g[1] + u[1] * (f / 2 + 0.05) + d[1] * x,
            ],
          ],
          VK,
          [u[0], 0, u[1]],
        ));
      {
        let y = f / 2 - 0.6;
        Ta(
          o,
          [
            [
              g[0] - (u[0] * f) / 2 - d[0] * x,
              g[1] - (u[1] * f) / 2 - d[1] * x,
            ],
            [g[0] + u[0] * y - d[0] * x, g[1] + u[1] * y - d[1] * x],
            [g[0] + u[0] * y + d[0] * x, g[1] + u[1] * y + d[1] * x],
            [
              g[0] - (u[0] * f) / 2 + d[0] * x,
              g[1] - (u[1] * f) / 2 + d[1] * x,
            ],
          ],
          v,
          GK,
        );
      }
      if (m % 2 === 0) {
        let y = [g[0] + d[0] * (x + 1.6), g[1] + d[1] * (x + 1.6)];
        cn(o, y, u, d, 1.2, 0.8, b - 0.2, b + 0.5 + ((0.2 * m) % 3), zz);
      }
      t.colliders.push({
        t: "obb",
        x: g[0],
        z: g[1],
        hx: f / 2,
        hz: x + 0.4,
        c: u[0],
        s: u[1],
        y0: b - 2,
        y1: b + 3,
      });
    }
  }
}
