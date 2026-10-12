// app 176 — math
// Lines 102949-103253 of readable/app.pretty.js (statement-aligned).
function rpt(i, t, e) {
  let s = Xh(i, t);
  if (!s.length) return;
  let n = Math.max(...s),
    o = i.top,
    a = i.E,
    r = Math.min(o + 0.15 - n, 1.6);
  if (r < 0.3) return;
  let l = o + 0.15 - r + gV(r),
    c = Math.min(0.75, Math.max(0.42, 0.3 + 0.35 * r)),
    h = i.g("f_" + i.group),
    f = i.g("dress");
  if (!Ob(i, c)) return;
  let u = co(
      (e || [0.5, 0.5, 0.5]).map((_) => Math.max(0.03, _) * i.fcol[0]),
      Yi.PAINT,
    ),
    d = co(
      (e || [0.5, 0.5, 0.5]).map((_) => Math.max(0.03, _) * i.fcol[0] * 0.8),
      Yi.PAINT,
    ),
    p = 0,
    m = a.l,
    g = [n, o, t, 1];
  if (i.solid) {
    let _ = Nb(i, 0, a.l, l + 0.75 * r, -99, 2 * c + 0.3);
    if (
      (_ && (_ = Nb(i, _[0], _[1], l + 0.45 * r, -99, c + 0.05)),
      !_ ||
        _[1] - _[0] < 0.5 ||
        (([p, m] = rm(i, _[0], _[1], l + 0.75 * r, c)),
        ([p, m] = rm(i, p, m, l + 0.45 * r, c)),
        m - p < 0.5))
    )
      return;
  }
  let b = [
      [l + 0.55 * r, l + 0.68 * r, 0.32 * c],
      [l + 0.68 * r, l + 0.88 * r, c],
      [l + 0.88 * r, l + r, 0.86 * c],
    ],
    x = (p < 1e-6 && i.mA) || 0,
    v = (m > a.l - 1e-6 && i.mB) || 0,
    y = Math.min(1, ((m - p) * 0.98) / Math.max(1e-6, (x + v) * c));
  for (let _ = 0; _ < b.length; _++) {
    let [R, T, E] = b[_],
      A = p + x * y * E,
      C = m - v * y * E;
    xo(
      h,
      a.P(A, R, E),
      a.P(C, R, E),
      a.P(C, T, E),
      a.P(A, T, E),
      [
        sp(i, A, Math.min(R, o - 0.01), g),
        sp(i, C, Math.min(R, o - 0.01), g),
        sp(i, C, Math.min(T, o - 0.005), g),
        sp(i, A, Math.min(T, o - 0.005), g),
      ].map((L) => [L[0], Math.min(0.997, L[1])]),
      i.fcol,
      a.N,
    );
    let P = _ ? b[_ - 1][2] : 0,
      I = _ + 1 < b.length ? b[_ + 1][2] : 0;
    (P < E &&
      xo(
        f,
        a.P(p + x * y * P, R, P),
        a.P(m - v * y * P, R, P),
        a.P(C, R, E),
        a.P(A, R, E),
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        d,
        [0, -1, 0],
      ),
      I < E &&
        xo(
          f,
          a.P(p + x * y * I, T, I),
          a.P(m - v * y * I, T, I),
          a.P(C, T, E),
          a.P(A, T, E),
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ],
          u,
          [0, 1, 0],
        ),
      xo(
        f,
        a.P(p, R, 0),
        a.P(A, R, E),
        a.P(A, T, E),
        a.P(p, T, 0),
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        u,
        [-a.dx, 0, -a.dz],
      ),
      xo(
        f,
        a.P(m, R, 0),
        a.P(C, R, E),
        a.P(C, T, E),
        a.P(m, T, 0),
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        u,
        [a.dx, 0, a.dz],
      ));
  }
  let M = i.st <= 1 || i.st === 3 || i.st === 4,
    S = M ? 1.1 : 0.8,
    w = Math.floor((m - p - 0.3) / S),
    z = (m - p - w * S) / 2;
  for (let _ = 0; _ <= w; _++) {
    let R = p + z + _ * S,
      T = M ? 0.08 : 0.06;
    M
      ? N0(f, a, R - T, R + T, l + 0.3 * r, b[0][1] - 0.07, 0, 0.8 * c, u)
      : N0(
          f,
          a,
          R - T,
          R + T,
          Math.min(l + 0.6 * r, b[0][1] - 0.13),
          b[0][1] - 0.07,
          0.3 * c,
          0.8 * c,
          u,
        );
  }
}
var bV = (i, t, e, s) =>
  (i?.dress?.balc || []).some((n) =>
    Xh({ secs: t }, n.v).some((o) => o > e && o < s),
  ) ||
  (i?.dress?.bays || []).some((n) =>
    [n.r[2], n.r[3]].some((o) =>
      Xh({ secs: t }, o).some((a) => a > e && a < s),
    ),
  ) ||
  (i?.dress?.fire || []).some((n) =>
    (n.levels || []).some((o) =>
      Xh({ secs: t }, o).some((a) => a > e - 1 && a < s),
    ),
  );
function xV(i, t, e) {
  let s = i?.dress?.cornice;
  if (s == null) return null;
  let n = Xh({ secs: t }, s);
  if (!n.length) return null;
  let o = Math.min(e + 0.15 - Math.max(...n), 1.6);
  if (o < 0.3) return null;
  let a = e + 0.15 - o + gV(o),
    r = Math.min(0.75, Math.max(0.42, 0.3 + 0.35 * o)),
    l = a + 0.68 * o + 0.06,
    c = a + 0.88 * o - 0.06;
  return c - l > 0.05 ? [l, c, r - 0.08] : !1;
}
function lpt(i, t, e, s, n) {
  let o = i.E,
    a = i.g("fe_grate"),
    r = i.g("fe_rail"),
    l = i.g("dress"),
    c = n ? ipt : ck,
    h = [...c, 1],
    f = co(c, Yi.STEEL),
    u = 1.05,
    d = [];
  for (let v of s.levels || [])
    for (let y of Xh(i, v))
      y > i.gF + 2.2 && !d.some((M) => Math.abs(M - y) < 1.2) && d.push(y);
  if (
    (d.sort((v, y) => v - y),
    ([t, e] = vV(i, t, e, u)),
    e - t < 0.5 || !Ob(i, u))
  )
    return;
  if (i.solid) {
    let v = Nb(i, t, e, d.length ? d[0] : i.gF + 3, -99, 2 * u + 0.35);
    if (!v) return;
    [t, e] = rm(i, v[0], v[1], d.length ? d[0] + 0.5 : i.gF + 3, u + 0.1);
  }
  let p = e - t;
  if (p < 0.5) return;
  let m = (v, y, M, S) => {
    am(
      r,
      o.P(v[0], M, v[1]),
      o.P(y[0], M, y[1]),
      o.P(y[0], M + S, y[1]),
      o.P(v[0], M + S, v[1]),
      [
        [0, 0.998],
        [Math.hypot(y[0] - v[0], y[1] - v[1]), 0.998],
        [Math.hypot(y[0] - v[0], y[1] - v[1]), 0.502],
        [0, 0.502],
      ],
      h,
      [
        -(y[1] - v[1]) * o.dx * 0 + o.nx * (y[0] - v[0]) - o.dx * (y[1] - v[1]),
        0,
        o.nz * (y[0] - v[0]) - o.dz * (y[1] - v[1]),
      ],
    );
  };
  if (!d.length) {
    let v = Bb(i, s.r[2], s.r[3]);
    if (!v.length) return;
    let y = Math.max(i.gF + 2.4, Math.min(...v.map((w) => w[0]))),
      M = Math.max(...v.map((w) => w[1]));
    if (M - y < 1) return;
    let S = 0.45;
    for (let w of [-0.22, 0.22])
      qr(l, o.P(t + 0.15 + w, y, S), o.P(e - 0.15 + w, M, S), 0.02, f);
    for (let w = y + 0.3; w < M; w += 0.32) {
      let z = (w - y) / (M - y),
        _ = t + 0.15 + (e - t - 0.3) * z;
      qr(l, o.P(_ - 0.22, w, S), o.P(_ + 0.22, w, S), 0.012, f);
    }
    return;
  }
  d.forEach((v, y) => {
    let M = [o.P(t, v, 0.04), o.P(e, v, 0.04), o.P(e, v, u), o.P(t, v, u)],
      S = [
        [t * 2, 0],
        [e * 2, 0],
        [e * 2, u * 2],
        [t * 2, u * 2],
      ];
    (am(a, M[0], M[1], M[2], M[3], S, h, [0, 1, 0]),
      m([t, u], [e, u], v, 0.95),
      m([t + 0.07, 0.04], [t + 0.07, u], v, 0.95),
      m([e - 0.07, 0.04], [e - 0.07, u], v, 0.95),
      N0(l, o, t, e, v - 0.1, v, u - 0.04, u, f),
      qr(l, o.P(t, v + 0.97, u), o.P(e, v + 0.97, u), 0.02, f));
    for (let w of [t + 0.25, e - 0.25])
      qr(l, o.P(w, v - 0.75, 0.02), o.P(w, v - 0.05, u * 0.9), 0.022, f);
    if (y > 0) {
      let w = d[y - 1],
        z = v - w,
        _ = Math.min(p - 0.7, z * 1.05);
      if (_ < 0.8) return;
      let R = y % 2 === 1,
        T = R ? e - 0.3 : t + 0.3,
        E = R ? T - _ : T + _,
        A = 0.35,
        C = 0.92,
        P = o.P(T, v, A),
        I = o.P(T, v, C),
        L = o.P(E, w, C),
        F = o.P(E, w, A),
        N = Math.hypot(_, z);
      am(
        a,
        P,
        I,
        L,
        F,
        [
          [0, 0],
          [1.1, 0],
          [1.1, N * 2],
          [0, N * 2],
        ],
        h,
        [0, 1, 0],
      );
      for (let B of [A, C])
        qr(l, o.P(T, v + 0.02, B), o.P(E, w + 0.02, B), 0.03, f);
      qr(l, o.P(T, v + 0.9, C), o.P(E, w + 0.9, C), 0.015, f);
    }
  });
  let g = d[0],
    b = Math.max(i.gF + 2.6, g - 2.6),
    x = t + 0.5;
  if (g - b > 0.8) {
    for (let v of [0, 0.45])
      qr(l, o.P(x + v, b, u - 0.2), o.P(x + v, g + 0.95, u - 0.2), 0.02, f);
    for (let v = b + 0.15; v < g; v += 0.3)
      qr(l, o.P(x, v, u - 0.2), o.P(x + 0.45, v, u - 0.2), 0.012, f);
  }
}
var vV = (i, t, e, s) => [
  Math.max(t, (i.mA || 0) * s),
  Math.min(e, i.E.l - (i.mB || 0) * s),
];
