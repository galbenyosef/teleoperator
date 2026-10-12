// app 13 — math
// Lines 40210-40470 of readable/app.pretty.js (statement-aligned).
function cR(i, t, e, s, n, o, a, r, l = 0.4) {
  ((t -= l), (e -= l), (s += l), (n += l));
  let c = (t + s) / 2,
    h = (e + n) / 2,
    f = s - t >= n - e,
    u = f ? (n - e) / 2 : (s - t) / 2,
    d = f ? [t + u, o + a, h] : [c, o + a, e + u],
    p = f ? [s - u, o + a, h] : [c, o + a, n - u],
    m = [t, o, e],
    g = [s, o, e],
    b = [s, o, n],
    x = [t, o, n],
    v = [c, o - 50, h],
    y = (M) => [M[0] + (M[0] - c) * 10, M[1] + 5, M[2] + (M[2] - h) * 10];
  f
    ? (xs(i, m, g, p, d, r, y([c, o, e])),
      xs(i, b, x, d, p, r, y([c, o, n])),
      E0(i, x, m, d, r, y([t, o, h])),
      E0(i, g, b, p, r, y([s, o, h])))
    : (xs(i, g, b, p, d, r, y([s, o, h])),
      xs(i, x, m, d, p, r, y([t, o, h])),
      E0(i, m, g, d, r, y([c, o, e])),
      E0(i, b, x, p, r, y([c, o, n])));
}
function X5(i, t, e, s, n, o, a, r, l, c = null, h = 0.5) {
  let f = (t + s) / 2,
    u = (e + n) / 2;
  if (l) {
    let d = t - h,
      p = s + h,
      m = e - h,
      g = n + h;
    (xs(i, [d, o, m], [p, o, m], [p, o + a, u], [d, o + a, u], r, [
      f,
      o + 100,
      e - 100,
    ]),
      xs(i, [d, o, g], [p, o, g], [p, o + a, u], [d, o + a, u], r, [
        f,
        o + 100,
        n + 100,
      ]),
      c &&
        (E0(i, [t, o, e], [t, o, n], [t, o + a, u], c, [t - 10, o, u]),
        E0(i, [s, o, e], [s, o, n], [s, o + a, u], c, [s + 10, o, u])));
  } else {
    let d = t - h,
      p = s + h,
      m = e - h,
      g = n + h;
    (xs(i, [d, o, m], [d, o, g], [f, o + a, g], [f, o + a, m], r, [
      t - 100,
      o + 100,
      u,
    ]),
      xs(i, [p, o, m], [p, o, g], [f, o + a, g], [f, o + a, m], r, [
        s + 100,
        o + 100,
        u,
      ]),
      c &&
        (E0(i, [t, o, e], [s, o, e], [f, o + a, e], c, [f, o, e - 10]),
        E0(i, [t, o, n], [s, o, n], [f, o + a, n], c, [f, o, n + 10])));
  }
}
function uG(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  { r: l = 0.3, y0: c = -6, edgeOnly: h = !1, n: f = 6 } = {},
) {
  let u = Math.max(1, Math.round((s - t) / o)),
    d = Math.max(1, Math.round((n - e) / o));
  for (let p = 0; p <= u; p++)
    for (let m = 0; m <= d; m++)
      (h && p > 0 && p < u && m > 0 && m < d) ||
        es(i, t + ((s - t) * p) / u, e + ((n - e) * m) / d, l, c, a, f, r);
}
function si(i, t, e, s, n, o, a, r, l, c, h) {
  let [f, u, d, p] = t.uv(e);
  c ??= (l * e.h) / e.w;
  let m = r,
    g = -a,
    b = (x, v) => [
      s + (m * x * l) / 2 + a * 0.02,
      n + (v * c) / 2,
      o + (g * x * l) / 2 + r * 0.02,
    ];
  i.quad(
    b(-1, -1),
    b(1, -1),
    b(1, 1),
    b(-1, 1),
    [f, p],
    [d, p],
    [d, u],
    [f, u],
    h,
    [a, 0, r],
  );
}
function K5(i, t, e, s, n, o, a, r, l, c) {
  let [h, f, u, d] = t.uv(e);
  l ??= (r * e.h) / e.w;
  let p = (m, g) => [
    s[0] + (n[0] * m * r) / 2 + (o[0] * g * l) / 2 + a[0] * 0.02,
    s[1] + (n[1] * m * r) / 2 + (o[1] * g * l) / 2 + a[1] * 0.02,
    s[2] + (n[2] * m * r) / 2 + (o[2] * g * l) / 2 + a[2] * 0.02,
  ];
  i.quad(
    p(-1, -1),
    p(1, -1),
    p(1, 1),
    p(-1, 1),
    [h, d],
    [u, d],
    [u, f],
    [h, f],
    c,
    a,
  );
}
function hR(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  { seg: r = 10, reveal: l = null, back: c = null } = {},
) {
  let [h, f] = e,
    u = -f,
    d = h,
    p = (g, b, x = 0) => [t[0] + h * g - u * x, b, t[1] + f * g - d * x],
    m = (g, b, x, v, y, M, S = a) => {
      i.quad(
        p(g, x),
        p(b, v),
        p(b, M),
        p(g, y),
        [g, x],
        [b, v],
        [b, M],
        [g, y],
        S,
        [u, 0, d],
      );
    };
  for (let g of o) {
    if (g.ys === void 0) {
      m(g.a, g.b, s, s, n, n);
      continue;
    }
    let b = (g.a + g.b) / 2,
      x = (g.b - g.a) / 2,
      v = g.depth ?? l ?? 0,
      y = (M) => g.ys + Math.sqrt(Math.max(0, x * x - (M - b) * (M - b)));
    g.sill && m(g.a, g.b, s, s, g.sill, g.sill);
    for (let M = 0; M < r; M++) {
      let S = g.a + ((g.b - g.a) * M) / r,
        w = g.a + ((g.b - g.a) * (M + 1)) / r;
      if ((m(S, w, y(S), y(w), n, n), v > 0)) {
        let z = p(S, y(S)),
          _ = p(w, y(w)),
          R = p(w, y(w), v),
          T = p(S, y(S), v);
        xs(i, z, _, R, T, g.revCol || a, [
          (z[0] + _[0]) / 2 - u * v * 0.5,
          Math.min(z[1], _[1]) - 5,
          (z[2] + _[2]) / 2 - d * v * 0.5,
        ]);
      }
    }
    if (v > 0) {
      let M = g.sill || s;
      for (let [S, w] of [
        [g.a, 1],
        [g.b, -1],
      ]) {
        let z = p(S, M),
          _ = p(S, g.ys),
          R = p(S, g.ys, v),
          T = p(S, M, v);
        xs(i, z, _, R, T, g.revCol || a, [
          z[0] + h * w * 5 - u * v * 0.5,
          (M + g.ys) / 2,
          z[2] + f * w * 5 - d * v * 0.5,
        ]);
      }
      if (c) {
        let S = g.sill || s;
        i.quad(
          p(g.a, S, v),
          p(g.b, S, v),
          p(g.b, g.ys + x, v),
          p(g.a, g.ys + x, v),
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          c,
          [u, 0, d],
        );
      }
    }
  }
}
function fR(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  {
    pier: l = 1.4,
    spring: c = null,
    depth: h = 0.9,
    back: f = [0.03, 0.03, 0.03, r[3]],
  } = {},
) {
  let u = 2 * s,
    d = (u - 2 * l - (a - 1) * l * 0.6) / a,
    p = c ?? o - d / 2 - 0.6,
    m = [],
    g = 0;
  (m.push({ a: 0, b: l }), (g = l));
  for (let x = 0; x < a; x++)
    (m.push({ a: g, b: g + d, ys: p, depth: h, back: !0 }),
      (g += d),
      x < a - 1 && (m.push({ a: g, b: g + l * 0.6 }), (g += l * 0.6)));
  m.push({ a: g, b: u });
  let b = [
    [
      [t - s, e - s],
      [0, 1],
    ],
    [
      [t - s, e + s],
      [1, 0],
    ],
    [
      [t + s, e + s],
      [0, -1],
    ],
    [
      [t + s, e - s],
      [-1, 0],
    ],
  ];
  for (let [x, v] of b) hR(i, x, v, n, o, m, r, { back: f });
}
