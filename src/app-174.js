// app 174 — math
// Lines 102959-103184 of readable/app.pretty.js (statement-aligned).
function xX(o, t, e, s, n, i) {
  if (!kx(o, 0.85)) return;
  {
    let g = Mx(o, t, e, Math.max(s + 0.12, n - 0.55) - 0.2, 2.1, 1.15);
    if (
      !g ||
      g[1] - g[0] < 0.8 ||
      (([t, e] = Ym(o, g[0], g[1], n - 0.1, 0.85)), e - t < 0.8)
    )
      return;
  }
  let a = o.g("dress"),
    r = o.E,
    l = 0.85,
    c = e - t;
  if (c < 0.8) return;
  let h = Math.max(s + 0.12, n - 0.55),
    f = Mo(i.lc || [0.05, 0.2, 0.1], oo.TILE),
    u = Mo([0.32, 0.025, 0.02], oo.PAINT),
    d = Mo([0.2, 0.03, 0.02], oo.PAINT),
    p = Math.max(2, Math.round(c / 0.8)),
    m = (g) => {
      let b = Math.min(g - t, e - g);
      return 0.22 * Math.max(0, 1 - b / 0.9) ** 2;
    };
  for (let g = 0; g < p; g++) {
    let b = t + (c * g) / p,
      v = t + (c * (g + 1)) / p,
      x = r.P(b, n, 0),
      y = r.P(v, n, 0),
      M = r.P(v, h + m(v), l),
      S = r.P(b, h + m(b), l),
      w = Math.hypot(l, n - h);
    (_o(
      a,
      x,
      y,
      M,
      S,
      [
        [b, 0],
        [v, 0],
        [v, w],
        [b, w],
      ],
      f,
      [r.nx, 1, r.nz],
    ),
      _o(
        a,
        x,
        y,
        M,
        S,
        [
          [b, 0],
          [v, 0],
          [v, w],
          [b, w],
        ],
        d,
        [-r.nx, -1, -r.nz],
      ),
      Km(
        a,
        r.P(b, h + m(b) - 0.2, l),
        r.P(v, h + m(v) - 0.2, l),
        r.P(v, h + m(v), l),
        r.P(b, h + m(b), l),
        [
          [b, 0],
          [v, 0],
          [v, 0.2],
          [b, 0.2],
        ],
        u,
        r.N,
      ));
  }
}
function A2t(o, t, e, s) {
  let n = e - t;
  if (n < 1 || !kx(o, Math.min(0.85, Math.max(0.55, n * 0.28)) + 0.08)) return;
  let i = Math.min(0.85, Math.max(0.55, n * 0.28)),
    a = s.cant === !1 ? 0.12 : Math.min(i, n * 0.3);
  {
    let d = Sx(o, s.r[2], s.r[3]);
    if (d.length) {
      let [p, m] = Ym(o, t, e, (d[0][0] + d[d.length - 1][1]) / 2, i + 0.12);
      if (p > t + 1e-6 || m < e - 1e-6) return;
    }
  }
  let r = [
      [t, 0],
      [t + a, i],
      [e - a, i],
      [e, 0],
    ],
    l = o.g("f_" + o.group),
    c = o.g("dress"),
    h = o.E,
    f = Mo(
      (s.cc || [0.5, 0.5, 0.5]).map((d) => d * o.fcol[0]),
      oo.PAINT,
    ),
    u = Sx(o, s.r[2], s.r[3]);
  for (let d of u) {
    let [p, m] = d;
    if (
      m - p < 0.05 ||
      (o.solid &&
        r.some(
          ([v, x]) =>
            x > 0 &&
            (o.solid(
              ...h.P(v, p - 0.16, x + 0.08).filter((y, M) => M !== 1),
              p - 0.16,
            ) ||
              o.solid(
                ...h.P(v, m - 0.1, x + 0.08).filter((y, M) => M !== 1),
                m - 0.1,
              )),
        )) ||
      (o.solid &&
        [t + 0.2, (t + e) / 2, e - 0.2].some((v) =>
          [p + 0.1, m - 0.1].some((x) =>
            o.solid(...h.P(v, x, 2 * i + 0.4).filter((y, M) => M !== 1), x),
          ),
        ))
    )
      continue;
    for (let v = 0; v < 3; v++) {
      let [x, y] = r[v],
        [M, S] = r[v + 1],
        w = h.P(x, p, y),
        _ = h.P(M, p, S),
        z = h.P(M, m, S),
        A = h.P(x, m, y),
        T = [
          h.nx * (M - x) - h.dx * (S - y),
          0,
          h.nz * (M - x) - h.dz * (S - y),
        ];
      _o(
        l,
        w,
        _,
        z,
        A,
        [Ip(o, x, p, d), Ip(o, M, p, d), Ip(o, M, m, d), Ip(o, x, m, d)],
        o.fcol,
        T,
      );
    }
    let g = (v, x, y) => {
        let M = r.map(([S, w], _) =>
          h.P(
            S + (_ === 0 ? -y : _ === 3 ? y : _ === 1 ? -y * 0.4 : y * 0.4),
            v,
            w + (_ === 1 || _ === 2 ? y : 0),
          ),
        );
        return (
          _o(
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
            x ? [0, 1, 0] : [0, -1, 0],
          ),
          M
        );
      },
      b = (v, x, y) => {
        let M = r.map(([S, w], _) =>
          h.P(
            S + (_ === 0 ? -y : _ === 3 ? y : _ === 1 ? -y * 0.4 : y * 0.4),
            v,
            w + (_ === 1 || _ === 2 ? y : 0),
          ),
        );
        for (let S = 0; S < 3; S++) {
          let w = M[S],
            _ = M[S + 1],
            [z, A] = r[S],
            [T, E] = r[S + 1];
          _o(
            c,
            w,
            _,
            [_[0], x, _[2]],
            [w[0], x, w[2]],
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
            ],
            f,
            [
              h.nx * (T - z) - h.dx * (E - A),
              0,
              h.nz * (T - z) - h.dz * (E - A),
            ],
          );
        }
        (g(v, !1, y), g(x, !0, y));
      };
    (d[4] &&
      !u.some((v) => v !== d && Math.abs(v[1] - p) < 0.05) &&
      b(p - 0.1, p + 0.04, 0.05),
      d[5] && b(m - 0.06, m + 0.12, 0.08));
  }
}
var vX = (o) =>
  [0, 0.1, -0.1, 0.2, -0.2, 0.3, -0.3].find((t) =>
    [0.55, 0.68, 0.88, 1].every((e) => Math.abs(0.15 - o + e * o + t) >= 0.07),
  ) || 0;
