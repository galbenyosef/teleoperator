// app 175 — math
// Lines 103185-103489 of readable/app.pretty.js (statement-aligned).
function P2t(o, t, e) {
  let s = _f(o, t);
  if (!s.length) return;
  let n = Math.max(...s),
    i = o.top,
    a = o.E,
    r = Math.min(i + 0.15 - n, 1.6);
  if (r < 0.3) return;
  let l = i + 0.15 - r + vX(r),
    c = Math.min(0.75, Math.max(0.42, 0.3 + 0.35 * r)),
    h = o.g("f_" + o.group),
    f = o.g("dress");
  if (!kx(o, c)) return;
  let u = Mo(
      (e || [0.5, 0.5, 0.5]).map((z) => Math.max(0.03, z) * o.fcol[0]),
      oo.PAINT,
    ),
    d = Mo(
      (e || [0.5, 0.5, 0.5]).map((z) => Math.max(0.03, z) * o.fcol[0] * 0.8),
      oo.PAINT,
    ),
    p = 0,
    m = a.l,
    g = [n, i, t, 1];
  if (o.solid) {
    let z = Mx(o, 0, a.l, l + 0.75 * r, -99, 2 * c + 0.3);
    if (
      (z && (z = Mx(o, z[0], z[1], l + 0.45 * r, -99, c + 0.05)),
      !z ||
        z[1] - z[0] < 0.5 ||
        (([p, m] = Ym(o, z[0], z[1], l + 0.75 * r, c)),
        ([p, m] = Ym(o, p, m, l + 0.45 * r, c)),
        m - p < 0.5))
    )
      return;
  }
  let b = [
      [l + 0.55 * r, l + 0.68 * r, 0.32 * c],
      [l + 0.68 * r, l + 0.88 * r, c],
      [l + 0.88 * r, l + r, 0.86 * c],
    ],
    v = (p < 1e-6 && o.mA) || 0,
    x = (m > a.l - 1e-6 && o.mB) || 0,
    y = Math.min(1, ((m - p) * 0.98) / Math.max(1e-6, (v + x) * c));
  for (let z = 0; z < b.length; z++) {
    let [A, T, E] = b[z],
      R = p + v * y * E,
      P = m - x * y * E;
    _o(
      h,
      a.P(R, A, E),
      a.P(P, A, E),
      a.P(P, T, E),
      a.P(R, T, E),
      [
        Ip(o, R, Math.min(A, i - 0.01), g),
        Ip(o, P, Math.min(A, i - 0.01), g),
        Ip(o, P, Math.min(T, i - 0.005), g),
        Ip(o, R, Math.min(T, i - 0.005), g),
      ].map((L) => [L[0], Math.min(0.997, L[1])]),
      o.fcol,
      a.N,
    );
    let C = z ? b[z - 1][2] : 0,
      I = z + 1 < b.length ? b[z + 1][2] : 0;
    (C < E &&
      _o(
        f,
        a.P(p + v * y * C, A, C),
        a.P(m - x * y * C, A, C),
        a.P(P, A, E),
        a.P(R, A, E),
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
        _o(
          f,
          a.P(p + v * y * I, T, I),
          a.P(m - x * y * I, T, I),
          a.P(P, T, E),
          a.P(R, T, E),
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ],
          u,
          [0, 1, 0],
        ),
      _o(
        f,
        a.P(p, A, 0),
        a.P(R, A, E),
        a.P(R, T, E),
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
      _o(
        f,
        a.P(m, A, 0),
        a.P(P, A, E),
        a.P(P, T, E),
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
  let M = o.st <= 1 || o.st === 3 || o.st === 4,
    S = M ? 1.1 : 0.8,
    w = Math.floor((m - p - 0.3) / S),
    _ = (m - p - w * S) / 2;
  for (let z = 0; z <= w; z++) {
    let A = p + _ + z * S,
      T = M ? 0.08 : 0.06;
    M
      ? ol(f, a, A - T, A + T, l + 0.3 * r, b[0][1] - 0.07, 0, 0.8 * c, u)
      : ol(
          f,
          a,
          A - T,
          A + T,
          Math.min(l + 0.6 * r, b[0][1] - 0.13),
          b[0][1] - 0.07,
          0.3 * c,
          0.8 * c,
          u,
        );
  }
}
var yX = (o, t, e, s) =>
  (o?.dress?.balc || []).some((n) =>
    _f({ secs: t }, n.v).some((i) => i > e && i < s),
  ) ||
  (o?.dress?.bays || []).some((n) =>
    [n.r[2], n.r[3]].some((i) =>
      _f({ secs: t }, i).some((a) => a > e && a < s),
    ),
  ) ||
  (o?.dress?.fire || []).some((n) =>
    (n.levels || []).some((i) =>
      _f({ secs: t }, i).some((a) => a > e - 1 && a < s),
    ),
  );
function wX(o, t, e) {
  let s = o?.dress?.cornice;
  if (s == null) return null;
  let n = _f({ secs: t }, s);
  if (!n.length) return null;
  let i = Math.min(e + 0.15 - Math.max(...n), 1.6);
  if (i < 0.3) return null;
  let a = e + 0.15 - i + vX(i),
    r = Math.min(0.75, Math.max(0.42, 0.3 + 0.35 * i)),
    l = a + 0.68 * i + 0.06,
    c = a + 0.88 * i - 0.06;
  return c - l > 0.05 ? [l, c, r - 0.08] : !1;
}
function C2t(o, t, e, s, n) {
  let i = o.E,
    a = o.g("fe_grate"),
    r = o.g("fe_rail"),
    l = o.g("dress"),
    c = n ? T2t : cz,
    h = [...c, 1],
    f = Mo(c, oo.STEEL),
    u = 1.05,
    d = [];
  for (let x of s.levels || [])
    for (let y of _f(o, x))
      y > o.gF + 2.2 && !d.some((M) => Math.abs(M - y) < 1.2) && d.push(y);
  if (
    (d.sort((x, y) => x - y),
    ([t, e] = MX(o, t, e, u)),
    e - t < 0.5 || !kx(o, u))
  )
    return;
  if (o.solid) {
    let x = Mx(o, t, e, d.length ? d[0] : o.gF + 3, -99, 2 * u + 0.35);
    if (!x) return;
    [t, e] = Ym(o, x[0], x[1], d.length ? d[0] + 0.5 : o.gF + 3, u + 0.1);
  }
  let p = e - t;
  if (p < 0.5) return;
  let m = (x, y, M, S) => {
    Km(
      r,
      i.P(x[0], M, x[1]),
      i.P(y[0], M, y[1]),
      i.P(y[0], M + S, y[1]),
      i.P(x[0], M + S, x[1]),
      [
        [0, 0.998],
        [Math.hypot(y[0] - x[0], y[1] - x[1]), 0.998],
        [Math.hypot(y[0] - x[0], y[1] - x[1]), 0.502],
        [0, 0.502],
      ],
      h,
      [
        -(y[1] - x[1]) * i.dx * 0 + i.nx * (y[0] - x[0]) - i.dx * (y[1] - x[1]),
        0,
        i.nz * (y[0] - x[0]) - i.dz * (y[1] - x[1]),
      ],
    );
  };
  if (!d.length) {
    let x = Sx(o, s.r[2], s.r[3]);
    if (!x.length) return;
    let y = Math.max(o.gF + 2.4, Math.min(...x.map((w) => w[0]))),
      M = Math.max(...x.map((w) => w[1]));
    if (M - y < 1) return;
    let S = 0.45;
    for (let w of [-0.22, 0.22])
      r0(l, i.P(t + 0.15 + w, y, S), i.P(e - 0.15 + w, M, S), 0.02, f);
    for (let w = y + 0.3; w < M; w += 0.32) {
      let _ = (w - y) / (M - y),
        z = t + 0.15 + (e - t - 0.3) * _;
      r0(l, i.P(z - 0.22, w, S), i.P(z + 0.22, w, S), 0.012, f);
    }
    return;
  }
  d.forEach((x, y) => {
    let M = [i.P(t, x, 0.04), i.P(e, x, 0.04), i.P(e, x, u), i.P(t, x, u)],
      S = [
        [t * 2, 0],
        [e * 2, 0],
        [e * 2, u * 2],
        [t * 2, u * 2],
      ];
    (Km(a, M[0], M[1], M[2], M[3], S, h, [0, 1, 0]),
      m([t, u], [e, u], x, 0.95),
      m([t + 0.07, 0.04], [t + 0.07, u], x, 0.95),
      m([e - 0.07, 0.04], [e - 0.07, u], x, 0.95),
      ol(l, i, t, e, x - 0.1, x, u - 0.04, u, f),
      r0(l, i.P(t, x + 0.97, u), i.P(e, x + 0.97, u), 0.02, f));
    for (let w of [t + 0.25, e - 0.25])
      r0(l, i.P(w, x - 0.75, 0.02), i.P(w, x - 0.05, u * 0.9), 0.022, f);
    if (y > 0) {
      let w = d[y - 1],
        _ = x - w,
        z = Math.min(p - 0.7, _ * 1.05);
      if (z < 0.8) return;
      let A = y % 2 === 1,
        T = A ? e - 0.3 : t + 0.3,
        E = A ? T - z : T + z,
        R = 0.35,
        P = 0.92,
        C = i.P(T, x, R),
        I = i.P(T, x, P),
        L = i.P(E, w, P),
        F = i.P(E, w, R),
        O = Math.hypot(z, _);
      Km(
        a,
        C,
        I,
        L,
        F,
        [
          [0, 0],
          [1.1, 0],
          [1.1, O * 2],
          [0, O * 2],
        ],
        h,
        [0, 1, 0],
      );
      for (let B of [R, P])
        r0(l, i.P(T, x + 0.02, B), i.P(E, w + 0.02, B), 0.03, f);
      r0(l, i.P(T, x + 0.9, P), i.P(E, w + 0.9, P), 0.015, f);
    }
  });
  let g = d[0],
    b = Math.max(o.gF + 2.6, g - 2.6),
    v = t + 0.5;
  if (g - b > 0.8) {
    for (let x of [0, 0.45])
      r0(l, i.P(v + x, b, u - 0.2), i.P(v + x, g + 0.95, u - 0.2), 0.02, f);
    for (let x = b + 0.15; x < g; x += 0.3)
      r0(l, i.P(v, x, u - 0.2), i.P(v + 0.45, x, u - 0.2), 0.012, f);
  }
}
var MX = (o, t, e, s) => [
  Math.max(t, (o.mA || 0) * s),
  Math.min(e, o.E.l - (o.mB || 0) * s),
];
