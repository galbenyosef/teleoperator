// app 177 — math
// Lines 103254-103594 of readable/app.pretty.js (statement-aligned).
function cpt(i, t, e, s, n) {
  if ((([t, e] = vV(i, t, e, 0.85)), e - t < 0.5 || !Ob(i, 0.85))) return;
  if (i.solid) {
    let p = Nb(i, t, e, i.gF + 3, -99, 2.05);
    if (!p) return;
    [t, e] = rm(i, p[0], p[1], i.gF + 3, 0.95);
  }
  if (i.solid)
    for (let p of Xh(i, s.v)) {
      let m = (g) =>
        [0.2, 0.5, 0.85].some((b) => {
          let x = i.E.P(g, p + 0.5, b);
          return i.solid(x[0], x[2], p + 0.5);
        });
      (m(t - 0.25) && (t += 0.35), m(e + 0.25) && (e -= 0.35));
    }
  let o = i.E,
    a = e - t;
  if (a < 0.5) return;
  let r = i.g("fe_rail"),
    l = i.g("dress"),
    c = a < 1.8 ? 0.5 : n ? 0.75 : 0.85,
    h = [...(s.lc || [0.3, 0.03, 0.03]), 1],
    f = co(
      (s.sc || [0.4, 0.4, 0.4]).map((p) => Math.max(0.03, p) * i.fcol[0]),
      Yi.PAINT,
    ),
    u = n,
    d = (i.balc ||= []);
  for (let p of Xh(i, s.v).sort((m, g) => m - g)) {
    if (
      p < i.gF + 2.5 ||
      d.some((y) => y[0] < e && t < y[1] && Math.abs(y[2] - p) < 1.4)
    )
      continue;
    let m = Bb(i, s.v, s.v + (s.h || 0.05)),
      g = Math.min(
        1.15,
        Math.max(0.85, m.length ? m[0][6] * (s.h || 0.05) : 1),
      );
    (d.push([t, e, p, g]), N0(l, o, t, e, p - 0.16, p, 0, c, f));
    let b = u ? 0.498 : 0.998,
      x = u ? 0.002 : 0.502,
      v = (y, M) => {
        let S = Math.hypot(M[0] - y[0], M[1] - y[1]);
        am(
          r,
          o.P(y[0], p, y[1]),
          o.P(M[0], p, M[1]),
          o.P(M[0], p + g, M[1]),
          o.P(y[0], p + g, y[1]),
          [
            [0, b],
            [S, b],
            [S, x],
            [0, x],
          ],
          h,
          [
            o.nx * (M[0] - y[0]) - o.dx * (M[1] - y[1]),
            0,
            o.nz * (M[0] - y[0]) - o.dz * (M[1] - y[1]),
          ],
        );
      };
    (v([t, c], [e, c]),
      v([t + 0.16, 0.02], [t + 0.16, c]),
      v([e - 0.16, 0.02], [e - 0.16, c]),
      qr(
        l,
        o.P(t, p + g + 0.03, c),
        o.P(e, p + g + 0.03, c),
        0.03,
        co(h, Yi.STEEL),
      ));
  }
}
function hpt(i, t, e, s) {
  if (!np(i, t, e - 0.25, 2.1, s + 0.17)) return;
  let n = i.g("dress"),
    o = i.E,
    a = co([0.62, 0.035, 0.025], Yi.LANTERN),
    r = co([0.3, 0.2, 0.04], Yi.STEEL);
  (N0(n, o, t - 0.17, t + 0.17, e - 0.2, e + 0.2, s - 0.13, s + 0.13, a, !0),
    N0(
      n,
      o,
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
function fpt(i, t, e) {
  if (
    (i.balc || []).some(
      ([r, l, c, h]) =>
        e < c + h + 0.06 &&
        e + 0.42 > c - 0.06 &&
        [r + 0.16, l - 0.16].some((f) => f > t - 0.39 && f < t + 0.39),
    ) ||
    !np(i, t, e - 0.25, 2.1, 0.42) ||
    !np(i, t - 0.33, e, 0, 0.42) ||
    !np(i, t + 0.33, e, 0, 0.42)
  )
    return;
  let s = i.g("dress"),
    n = i.E,
    o = Ri(Math.round(t * 10), Math.round(e * 10)),
    a = co(o < 0.5 ? [0.62, 0.6, 0.55] : [0.42, 0.4, 0.36], Yi.AC);
  (N0(s, n, t - 0.33, t + 0.33, e, e + 0.42, -0.05, 0.42, a),
    qr(
      s,
      n.P(t - 0.28, e - 0.25, 0.02),
      n.P(t - 0.28, e, 0.38),
      0.012,
      co(ck, Yi.STEEL),
    ),
    qr(
      s,
      n.P(t + 0.28, e - 0.25, 0.02),
      n.P(t + 0.28, e, 0.38),
      0.012,
      co(ck, Yi.STEEL),
    ));
}
var fV = [
    [1, 0.12, 0.42],
    [0.1, 0.85, 1],
    [1, 0.2, 0.08],
    [1, 0.78, 0.12],
    [0.55, 0.25, 1],
    [0.2, 1, 0.35],
  ],
  upt = { tenderloin: 0.82, western: 0.74, richmond: 0.74 },
  yV = {
    northbeach: 0.75,
    castro: 0.8,
    tenderloin: 0.6,
    mission: 0.5,
    haight: 0.6,
    chinatown: 0.35,
    union: 0.25,
    soma: 0.2,
  };
function fk(i, t, e, s, n, o, a, r = Yi.SIGN) {
  let l = (b) =>
    (i.balc || []).some(
      ([x, v, y]) =>
        e < y + 1.2 &&
        e + s > y &&
        (Math.abs(b - x - 0.16) < 0.18 || Math.abs(b - v + 0.16) < 0.18),
    );
  if (l(t)) {
    let b = [t + 0.4, t - 0.4].find(
      (x) => x > 0.25 && x < i.E.l - 0.25 && !l(x),
    );
    if (b === void 0) return;
    t = b;
  }
  if (![t - 0.25, t, t + 0.25].every((b) => np(i, b, e, 2.2, o + n))) return;
  let c =
      Ri(i.seed + Math.round(t * 10), 331) < (yV[i.dn] || 0)
        ? fV[Math.floor(Ri(i.seed + Math.round(t * 10), 332) * fV.length)]
        : null,
    h = i.g("dress"),
    f = i.E,
    u = co(c || [1, 1, 1], r, a),
    d = 0.05,
    p = o,
    m = o + n;
  (xo(
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
    xo(
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
  let g = co([0.08, 0.08, 0.085], Yi.STEEL);
  (xo(
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
    xo(
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
    xo(
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
    qr(h, f.P(t, b, 0), f.P(t, b, p + 0.02), 0.02, g);
}
function dpt(i, t, e, s) {
  if (!np(i, t, e, 2.4, 1.7)) return;
  let n = i.g("dress"),
    o = i.E,
    a = co([0.75, 0.72, 0.6], Yi.STEEL),
    r = o.P(t, e, 0.05),
    l = o.P(t, e + 1.9, 1.7);
  qr(n, r, l, 0.022, a);
  let c = co([1, 1, 1], Yi.FLAG, s),
    h = o.P(t, e + 1.9 * 0.42, 1.7 * 0.42),
    f = l,
    u = 0.95;
  am(
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
    [o.dx, 0, o.dz],
  );
}
function ppt(i, t, e, s, n, o) {
  if (!np(i, t, s, 1.6) || !np(i, e, s, 1.6)) return;
  let a = i.g("dress"),
    r = i.E,
    l = 0.16,
    c = co([1, 1, 1], Yi.CSIGN, o);
  (N0(
    a,
    r,
    t - 0.04,
    e + 0.04,
    s - 0.04,
    n + 0.04,
    0,
    l - 0.06,
    co([0.05, 0.04, 0.03], Yi.STEEL),
  ),
    xo(
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
var uV = [
    [0.42, 0.035, 0.03],
    [0.04, 0.2, 0.09],
    [0.55, 0.38, 0.05],
    [0.25, 0.03, 0.04],
    [0.5, 0.06, 0.03],
  ],
  dV = [
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
  mpt = {
    "Stockton Street": 0.7,
    "Grant Avenue": 0.22,
    "Jackson Street": 0.3,
    "Washington Street": 0.25,
    "Pacific Avenue": 0.25,
    "Clay Street": 0.12,
  };
