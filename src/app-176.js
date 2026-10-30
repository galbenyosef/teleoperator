// app 176 — math
// Lines 103490-103830 of readable/app.pretty.js (statement-aligned).
function L2t(o, t, e, s, n) {
  if ((([t, e] = MX(o, t, e, 0.85)), e - t < 0.5 || !kx(o, 0.85))) return;
  if (o.solid) {
    let p = Mx(o, t, e, o.gF + 3, -99, 2.05);
    if (!p) return;
    [t, e] = Ym(o, p[0], p[1], o.gF + 3, 0.95);
  }
  if (o.solid)
    for (let p of _f(o, s.v)) {
      let m = (g) =>
        [0.2, 0.5, 0.85].some((b) => {
          let v = o.E.P(g, p + 0.5, b);
          return o.solid(v[0], v[2], p + 0.5);
        });
      (m(t - 0.25) && (t += 0.35), m(e + 0.25) && (e -= 0.35));
    }
  let i = o.E,
    a = e - t;
  if (a < 0.5) return;
  let r = o.g("fe_rail"),
    l = o.g("dress"),
    c = a < 1.8 ? 0.5 : n ? 0.75 : 0.85,
    h = [...(s.lc || [0.3, 0.03, 0.03]), 1],
    f = Mo(
      (s.sc || [0.4, 0.4, 0.4]).map((p) => Math.max(0.03, p) * o.fcol[0]),
      oo.PAINT,
    ),
    u = n,
    d = (o.balc ||= []);
  for (let p of _f(o, s.v).sort((m, g) => m - g)) {
    if (
      p < o.gF + 2.5 ||
      d.some((y) => y[0] < e && t < y[1] && Math.abs(y[2] - p) < 1.4)
    )
      continue;
    let m = Sx(o, s.v, s.v + (s.h || 0.05)),
      g = Math.min(
        1.15,
        Math.max(0.85, m.length ? m[0][6] * (s.h || 0.05) : 1),
      );
    (d.push([t, e, p, g]), ol(l, i, t, e, p - 0.16, p, 0, c, f));
    let b = u ? 0.498 : 0.998,
      v = u ? 0.002 : 0.502,
      x = (y, M) => {
        let S = Math.hypot(M[0] - y[0], M[1] - y[1]);
        Km(
          r,
          i.P(y[0], p, y[1]),
          i.P(M[0], p, M[1]),
          i.P(M[0], p + g, M[1]),
          i.P(y[0], p + g, y[1]),
          [
            [0, b],
            [S, b],
            [S, v],
            [0, v],
          ],
          h,
          [
            i.nx * (M[0] - y[0]) - i.dx * (M[1] - y[1]),
            0,
            i.nz * (M[0] - y[0]) - i.dz * (M[1] - y[1]),
          ],
        );
      };
    (x([t, c], [e, c]),
      x([t + 0.16, 0.02], [t + 0.16, c]),
      x([e - 0.16, 0.02], [e - 0.16, c]),
      r0(
        l,
        i.P(t, p + g + 0.03, c),
        i.P(e, p + g + 0.03, c),
        0.03,
        Mo(h, oo.STEEL),
      ));
  }
}
function I2t(o, t, e, s) {
  if (!Fp(o, t, e - 0.25, 2.1, s + 0.17)) return;
  let n = o.g("dress"),
    i = o.E,
    a = Mo([0.62, 0.035, 0.025], oo.LANTERN),
    r = Mo([0.3, 0.2, 0.04], oo.STEEL);
  (ol(n, i, t - 0.17, t + 0.17, e - 0.2, e + 0.2, s - 0.13, s + 0.13, a, !0),
    ol(
      n,
      i,
      t - 0.11,
      t + 0.11,
      e - 0.25,
      e + 0.25,
      s - 0.07,
      s + 0.07,
      r,
      !0,
    ));
}
function F2t(o, t, e) {
  if (
    (o.balc || []).some(
      ([r, l, c, h]) =>
        e < c + h + 0.06 &&
        e + 0.42 > c - 0.06 &&
        [r + 0.16, l - 0.16].some((f) => f > t - 0.39 && f < t + 0.39),
    ) ||
    !Fp(o, t, e - 0.25, 2.1, 0.42) ||
    !Fp(o, t - 0.33, e, 0, 0.42) ||
    !Fp(o, t + 0.33, e, 0, 0.42)
  )
    return;
  let s = o.g("dress"),
    n = o.E,
    i = Ui(Math.round(t * 10), Math.round(e * 10)),
    a = Mo(i < 0.5 ? [0.62, 0.6, 0.55] : [0.42, 0.4, 0.36], oo.AC);
  (ol(s, n, t - 0.33, t + 0.33, e, e + 0.42, -0.05, 0.42, a),
    r0(
      s,
      n.P(t - 0.28, e - 0.25, 0.02),
      n.P(t - 0.28, e, 0.38),
      0.012,
      Mo(cz, oo.STEEL),
    ),
    r0(
      s,
      n.P(t + 0.28, e - 0.25, 0.02),
      n.P(t + 0.28, e, 0.38),
      0.012,
      Mo(cz, oo.STEEL),
    ));
}
var pX = [
    [1, 0.12, 0.42],
    [0.1, 0.85, 1],
    [1, 0.2, 0.08],
    [1, 0.78, 0.12],
    [0.55, 0.25, 1],
    [0.2, 1, 0.35],
  ],
  O2t = { tenderloin: 0.82, western: 0.74, richmond: 0.74 },
  SX = {
    northbeach: 0.75,
    castro: 0.8,
    tenderloin: 0.6,
    mission: 0.5,
    haight: 0.6,
    chinatown: 0.35,
    union: 0.25,
    soma: 0.2,
  };
function fz(o, t, e, s, n, i, a, r = oo.SIGN) {
  let l = (b) =>
    (o.balc || []).some(
      ([v, x, y]) =>
        e < y + 1.2 &&
        e + s > y &&
        (Math.abs(b - v - 0.16) < 0.18 || Math.abs(b - x + 0.16) < 0.18),
    );
  if (l(t)) {
    let b = [t + 0.4, t - 0.4].find(
      (v) => v > 0.25 && v < o.E.l - 0.25 && !l(v),
    );
    if (b === void 0) return;
    t = b;
  }
  if (![t - 0.25, t, t + 0.25].every((b) => Fp(o, b, e, 2.2, i + n))) return;
  let c =
      Ui(o.seed + Math.round(t * 10), 331) < (SX[o.dn] || 0)
        ? pX[Math.floor(Ui(o.seed + Math.round(t * 10), 332) * pX.length)]
        : null,
    h = o.g("dress"),
    f = o.E,
    u = Mo(c || [1, 1, 1], r, a),
    d = 0.05,
    p = i,
    m = i + n;
  (_o(
    h,
    f.P(t - d, e, p),
    f.P(t - d, e, m),
    f.P(t - d, e + s, m),
    f.P(t - d, e + s, p),
    [
      [0, 0.999],
      [1, 0.999],
      [1, 0.001],
      [0, 0.001],
    ],
    u,
    [-f.dx, 0, -f.dz],
  ),
    _o(
      h,
      f.P(t + d, e, p),
      f.P(t + d, e, m),
      f.P(t + d, e + s, m),
      f.P(t + d, e + s, p),
      [
        [1, 0.999],
        [0, 0.999],
        [0, 0.001],
        [1, 0.001],
      ],
      u,
      [f.dx, 0, f.dz],
    ));
  let g = Mo([0.08, 0.08, 0.085], oo.STEEL);
  (_o(
    h,
    f.P(t - d, e, m),
    f.P(t + d, e, m),
    f.P(t + d, e + s, m),
    f.P(t - d, e + s, m),
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    g,
    f.N,
  ),
    _o(
      h,
      f.P(t - d, e + s, p),
      f.P(t + d, e + s, p),
      f.P(t + d, e + s, m),
      f.P(t - d, e + s, m),
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ],
      g,
      [0, 1, 0],
    ),
    _o(
      h,
      f.P(t - d, e, p),
      f.P(t + d, e, p),
      f.P(t + d, e, m),
      f.P(t - d, e, m),
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ],
      g,
      [0, -1, 0],
    ));
  for (let b of [e + 0.12, e + s - 0.12])
    r0(h, f.P(t, b, 0), f.P(t, b, p + 0.02), 0.02, g);
}
function B2t(o, t, e, s) {
  if (!Fp(o, t, e, 2.4, 1.7)) return;
  let n = o.g("dress"),
    i = o.E,
    a = Mo([0.75, 0.72, 0.6], oo.STEEL),
    r = i.P(t, e, 0.05),
    l = i.P(t, e + 1.9, 1.7);
  r0(n, r, l, 0.022, a);
  let c = Mo([1, 1, 1], oo.FLAG, s),
    h = i.P(t, e + 1.9 * 0.42, 1.7 * 0.42),
    f = l,
    u = 0.95;
  Km(
    n,
    h,
    f,
    [f[0], f[1] - u, f[2]],
    [h[0], h[1] - u, h[2]],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    c,
    [i.dx, 0, i.dz],
  );
}
function N2t(o, t, e, s, n, i) {
  if (!Fp(o, t, s, 1.6) || !Fp(o, e, s, 1.6)) return;
  let a = o.g("dress"),
    r = o.E,
    l = 0.16,
    c = Mo([1, 1, 1], oo.CSIGN, i);
  (ol(
    a,
    r,
    t - 0.04,
    e + 0.04,
    s - 0.04,
    n + 0.04,
    0,
    l - 0.06,
    Mo([0.05, 0.04, 0.03], oo.STEEL),
  ),
    _o(
      a,
      r.P(t, s, l),
      r.P(e, s, l),
      r.P(e, n, l),
      r.P(t, n, l),
      [
        [0.995, 0.995],
        [0.995, 0.005],
        [0.005, 0.005],
        [0.005, 0.995],
      ],
      c,
      r.N,
    ));
}
var mX = [
    [0.42, 0.035, 0.03],
    [0.04, 0.2, 0.09],
    [0.55, 0.38, 0.05],
    [0.25, 0.03, 0.04],
    [0.5, 0.06, 0.03],
  ],
  gX = [
    [0.18, 0.42, 0.1],
    [0.42, 0.6, 0.22],
    [0.85, 0.42, 0.06],
    [0.8, 0.3, 0.06],
    [0.55, 0.62, 0.2],
    [0.62, 0.08, 0.05],
    [0.9, 0.75, 0.25],
    [0.3, 0.5, 0.18],
    [0.5, 0.18, 0.28],
  ],
  H2t = {
    "Stockton Street": 0.7,
    "Grant Avenue": 0.22,
    "Jackson Street": 0.3,
    "Washington Street": 0.25,
    "Pacific Avenue": 0.25,
    "Clay Street": 0.12,
  };
