// app 175 — math
// Lines 102723-102948 of readable/app.pretty.js (statement-aligned).
function mV(i, t, e, s, n, o) {
  if (!Ob(i, 0.85)) return;
  {
    let g = Nb(i, t, e, Math.max(s + 0.12, n - 0.55) - 0.2, 2.1, 1.15);
    if (
      !g ||
      g[1] - g[0] < 0.8 ||
      (([t, e] = rm(i, g[0], g[1], n - 0.1, 0.85)), e - t < 0.8)
    )
      return;
  }
  let a = i.g("dress"),
    r = i.E,
    l = 0.85,
    c = e - t;
  if (c < 0.8) return;
  let h = Math.max(s + 0.12, n - 0.55),
    f = co(o.lc || [0.05, 0.2, 0.1], Yi.TILE),
    u = co([0.32, 0.025, 0.02], Yi.PAINT),
    d = co([0.2, 0.03, 0.02], Yi.PAINT),
    p = Math.max(2, Math.round(c / 0.8)),
    m = (g) => {
      let b = Math.min(g - t, e - g);
      return 0.22 * Math.max(0, 1 - b / 0.9) ** 2;
    };
  for (let g = 0; g < p; g++) {
    let b = t + (c * g) / p,
      x = t + (c * (g + 1)) / p,
      v = r.P(b, n, 0),
      y = r.P(x, n, 0),
      M = r.P(x, h + m(x), l),
      S = r.P(b, h + m(b), l),
      w = Math.hypot(l, n - h);
    (xo(
      a,
      v,
      y,
      M,
      S,
      [
        [b, 0],
        [x, 0],
        [x, w],
        [b, w],
      ],
      f,
      [r.nx, 1, r.nz],
    ),
      xo(
        a,
        v,
        y,
        M,
        S,
        [
          [b, 0],
          [x, 0],
          [x, w],
          [b, w],
        ],
        d,
        [-r.nx, -1, -r.nz],
      ),
      am(
        a,
        r.P(b, h + m(b) - 0.2, l),
        r.P(x, h + m(x) - 0.2, l),
        r.P(x, h + m(x), l),
        r.P(b, h + m(b), l),
        [
          [b, 0],
          [x, 0],
          [x, 0.2],
          [b, 0.2],
        ],
        u,
        r.N,
      ));
  }
}
function apt(i, t, e, s) {
  let n = e - t;
  if (n < 1 || !Ob(i, Math.min(0.85, Math.max(0.55, n * 0.28)) + 0.08)) return;
  let o = Math.min(0.85, Math.max(0.55, n * 0.28)),
    a = s.cant === !1 ? 0.12 : Math.min(o, n * 0.3);
  {
    let d = Bb(i, s.r[2], s.r[3]);
    if (d.length) {
      let [p, m] = rm(i, t, e, (d[0][0] + d[d.length - 1][1]) / 2, o + 0.12);
      if (p > t + 1e-6 || m < e - 1e-6) return;
    }
  }
  let r = [
      [t, 0],
      [t + a, o],
      [e - a, o],
      [e, 0],
    ],
    l = i.g("f_" + i.group),
    c = i.g("dress"),
    h = i.E,
    f = co(
      (s.cc || [0.5, 0.5, 0.5]).map((d) => d * i.fcol[0]),
      Yi.PAINT,
    ),
    u = Bb(i, s.r[2], s.r[3]);
  for (let d of u) {
    let [p, m] = d;
    if (
      m - p < 0.05 ||
      (i.solid &&
        r.some(
          ([x, v]) =>
            v > 0 &&
            (i.solid(
              ...h.P(x, p - 0.16, v + 0.08).filter((y, M) => M !== 1),
              p - 0.16,
            ) ||
              i.solid(
                ...h.P(x, m - 0.1, v + 0.08).filter((y, M) => M !== 1),
                m - 0.1,
              )),
        )) ||
      (i.solid &&
        [t + 0.2, (t + e) / 2, e - 0.2].some((x) =>
          [p + 0.1, m - 0.1].some((v) =>
            i.solid(...h.P(x, v, 2 * o + 0.4).filter((y, M) => M !== 1), v),
          ),
        ))
    )
      continue;
    for (let x = 0; x < 3; x++) {
      let [v, y] = r[x],
        [M, S] = r[x + 1],
        w = h.P(v, p, y),
        z = h.P(M, p, S),
        _ = h.P(M, m, S),
        R = h.P(v, m, y),
        T = [
          h.nx * (M - v) - h.dx * (S - y),
          0,
          h.nz * (M - v) - h.dz * (S - y),
        ];
      xo(
        l,
        w,
        z,
        _,
        R,
        [sp(i, v, p, d), sp(i, M, p, d), sp(i, M, m, d), sp(i, v, m, d)],
        i.fcol,
        T,
      );
    }
    let g = (x, v, y) => {
        let M = r.map(([S, w], z) =>
          h.P(
            S + (z === 0 ? -y : z === 3 ? y : z === 1 ? -y * 0.4 : y * 0.4),
            x,
            w + (z === 1 || z === 2 ? y : 0),
          ),
        );
        return (
          xo(
            c,
            M[0],
            M[1],
            M[2],
            M[3],
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
            ],
            f,
            v ? [0, 1, 0] : [0, -1, 0],
          ),
          M
        );
      },
      b = (x, v, y) => {
        let M = r.map(([S, w], z) =>
          h.P(
            S + (z === 0 ? -y : z === 3 ? y : z === 1 ? -y * 0.4 : y * 0.4),
            x,
            w + (z === 1 || z === 2 ? y : 0),
          ),
        );
        for (let S = 0; S < 3; S++) {
          let w = M[S],
            z = M[S + 1],
            [_, R] = r[S],
            [T, E] = r[S + 1];
          xo(
            c,
            w,
            z,
            [z[0], v, z[2]],
            [w[0], v, w[2]],
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
            ],
            f,
            [
              h.nx * (T - _) - h.dx * (E - R),
              0,
              h.nz * (T - _) - h.dz * (E - R),
            ],
          );
        }
        (g(x, !1, y), g(v, !0, y));
      };
    (d[4] &&
      !u.some((x) => x !== d && Math.abs(x[1] - p) < 0.05) &&
      b(p - 0.1, p + 0.04, 0.05),
      d[5] && b(m - 0.06, m + 0.12, 0.08));
  }
}
var gV = (i) =>
  [0, 0.1, -0.1, 0.2, -0.2, 0.3, -0.3].find((t) =>
    [0.55, 0.68, 0.88, 1].every((e) => Math.abs(0.15 - i + e * i + t) >= 0.07),
  ) || 0;
