// app 13 — math
// Lines 40218-40554 of readable/app.pretty.js (statement-aligned).
function Qi(o, t, e, s, n, { caps: i = !1 } = {}) {
  let a = t.map((h) => new Na(...h)),
    r = null,
    l = 0,
    c = [];
  for (let h = 0; h < a.length; h++) {
    let f = new Na()
        .subVectors(a[Math.min(h + 1, a.length - 1)], a[Math.max(h - 1, 0)])
        .normalize(),
      u = r
        ? r
            .clone()
            .sub(f.clone().multiplyScalar(r.dot(f)))
            .normalize()
        : (Math.abs(f.y) < 0.9 ? new Na(0, 1, 0) : new Na(1, 0, 0))
            .sub(f.clone().multiplyScalar(Math.abs(f.y) < 0.9 ? f.y : f.x))
            .normalize(),
      d = new Na().crossVectors(f, u);
    ((r = u), h && (l += a[h].distanceTo(a[h - 1])));
    let p =
        typeof e == "function"
          ? e(h / (a.length - 1))
          : Array.isArray(e)
            ? e[h]
            : e,
      m = [];
    for (let g = 0; g <= s; g++) {
      let b = (g / s) * Math.PI * 2,
        v = u
          .clone()
          .multiplyScalar(Math.cos(b))
          .add(d.clone().multiplyScalar(Math.sin(b)));
      m.push(
        o.vert(
          a[h].x + v.x * p,
          a[h].y + v.y * p,
          a[h].z + v.z * p,
          v.x,
          v.y,
          v.z,
          (g / s) * Math.PI * 2 * p,
          l,
          n,
        ),
      );
    }
    c.push(m);
  }
  for (let h = 0; h + 1 < c.length; h++)
    for (let f = 0; f < s; f++) {
      let u = c[h][f],
        d = c[h][f + 1],
        p = c[h + 1][f + 1],
        m = c[h + 1][f];
      (o.tri(u, d, p), o.tri(u, p, m));
    }
  if (i)
    for (let [h, f] of [
      [0, -1],
      [a.length - 1, 1],
    ]) {
      let u = new Na()
          .subVectors(a[Math.min(h + 1, a.length - 1)], a[Math.max(h - 1, 0)])
          .normalize()
          .multiplyScalar(f),
        d = typeof e == "function" ? e(h ? 1 : 0) : Array.isArray(e) ? e[h] : e,
        p = o.vert(a[h].x, a[h].y, a[h].z, u.x, u.y, u.z, 0, 0, n),
        m = c[h].map((g) => {
          let b = o.p.a,
            v = g * 3;
          return o.vert(b[v], b[v + 1], b[v + 2], u.x, u.y, u.z, 0, 0, n);
        });
      for (let g = 0; g < s; g++)
        f > 0 ? o.tri(p, m[g], m[g + 1]) : o.tri(p, m[g + 1], m[g]);
    }
}
function H7(o, t, e, s, n, i, a, r, l = 0.4) {
  ((t -= l), (e -= l), (s += l), (n += l));
  let c = (t + s) / 2,
    h = (e + n) / 2,
    f = s - t >= n - e,
    u = f ? (n - e) / 2 : (s - t) / 2,
    d = f ? [t + u, i + a, h] : [c, i + a, e + u],
    p = f ? [s - u, i + a, h] : [c, i + a, n - u],
    m = [t, i, e],
    g = [s, i, e],
    b = [s, i, n],
    v = [t, i, n],
    x = [c, i - 50, h],
    y = (M) => [M[0] + (M[0] - c) * 10, M[1] + 5, M[2] + (M[2] - h) * 10];
  f
    ? (Ms(o, m, g, p, d, r, y([c, i, e])),
      Ms(o, b, v, d, p, r, y([c, i, n])),
      Y0(o, v, m, d, r, y([t, i, h])),
      Y0(o, g, b, p, r, y([s, i, h])))
    : (Ms(o, g, b, p, d, r, y([s, i, h])),
      Ms(o, v, m, d, p, r, y([t, i, h])),
      Y0(o, m, g, d, r, y([c, i, e])),
      Y0(o, b, v, p, r, y([c, i, n])));
}
function V5(o, t, e, s, n, i, a, r, l, c = null, h = 0.5) {
  let f = (t + s) / 2,
    u = (e + n) / 2;
  if (l) {
    let d = t - h,
      p = s + h,
      m = e - h,
      g = n + h;
    (Ms(o, [d, i, m], [p, i, m], [p, i + a, u], [d, i + a, u], r, [
      f,
      i + 100,
      e - 100,
    ]),
      Ms(o, [d, i, g], [p, i, g], [p, i + a, u], [d, i + a, u], r, [
        f,
        i + 100,
        n + 100,
      ]),
      c &&
        (Y0(o, [t, i, e], [t, i, n], [t, i + a, u], c, [t - 10, i, u]),
        Y0(o, [s, i, e], [s, i, n], [s, i + a, u], c, [s + 10, i, u])));
  } else {
    let d = t - h,
      p = s + h,
      m = e - h,
      g = n + h;
    (Ms(o, [d, i, m], [d, i, g], [f, i + a, g], [f, i + a, m], r, [
      t - 100,
      i + 100,
      u,
    ]),
      Ms(o, [p, i, m], [p, i, g], [f, i + a, g], [f, i + a, m], r, [
        s + 100,
        i + 100,
        u,
      ]),
      c &&
        (Y0(o, [t, i, e], [s, i, e], [f, i + a, e], c, [f, i, e - 10]),
        Y0(o, [t, i, n], [s, i, n], [f, i + a, n], c, [f, i, n + 10])));
  }
}
function pW(
  o,
  t,
  e,
  s,
  n,
  i,
  a,
  r,
  { r: l = 0.3, y0: c = -6, edgeOnly: h = !1, n: f = 6 } = {},
) {
  let u = Math.max(1, Math.round((s - t) / i)),
    d = Math.max(1, Math.round((n - e) / i));
  for (let p = 0; p <= u; p++)
    for (let m = 0; m <= d; m++)
      (h && p > 0 && p < u && m > 0 && m < d) ||
        os(o, t + ((s - t) * p) / u, e + ((n - e) * m) / d, l, c, a, f, r);
}
function ri(o, t, e, s, n, i, a, r, l, c, h) {
  let [f, u, d, p] = t.uv(e);
  c ??= (l * e.h) / e.w;
  let m = r,
    g = -a,
    b = (v, x) => [
      s + (m * v * l) / 2 + a * 0.02,
      n + (x * c) / 2,
      i + (g * v * l) / 2 + r * 0.02,
    ];
  o.quad(
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
function W5(o, t, e, s, n, i, a, r, l, c) {
  let [h, f, u, d] = t.uv(e);
  l ??= (r * e.h) / e.w;
  let p = (m, g) => [
    s[0] + (n[0] * m * r) / 2 + (i[0] * g * l) / 2 + a[0] * 0.02,
    s[1] + (n[1] * m * r) / 2 + (i[1] * g * l) / 2 + a[1] * 0.02,
    s[2] + (n[2] * m * r) / 2 + (i[2] * g * l) / 2 + a[2] * 0.02,
  ];
  o.quad(
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
function D7(
  o,
  t,
  e,
  s,
  n,
  i,
  a,
  { seg: r = 10, reveal: l = null, back: c = null } = {},
) {
  let [h, f] = e,
    u = -f,
    d = h,
    p = (g, b, v = 0) => [t[0] + h * g - u * v, b, t[1] + f * g - d * v],
    m = (g, b, v, x, y, M, S = a) => {
      o.quad(
        p(g, v),
        p(b, x),
        p(b, M),
        p(g, y),
        [g, v],
        [b, x],
        [b, M],
        [g, y],
        S,
        [u, 0, d],
      );
    };
  for (let g of i) {
    if (g.ys === void 0) {
      m(g.a, g.b, s, s, n, n);
      continue;
    }
    let b = (g.a + g.b) / 2,
      v = (g.b - g.a) / 2,
      x = g.depth ?? l ?? 0,
      y = (M) => g.ys + Math.sqrt(Math.max(0, v * v - (M - b) * (M - b)));
    g.sill && m(g.a, g.b, s, s, g.sill, g.sill);
    for (let M = 0; M < r; M++) {
      let S = g.a + ((g.b - g.a) * M) / r,
        w = g.a + ((g.b - g.a) * (M + 1)) / r;
      if ((m(S, w, y(S), y(w), n, n), x > 0)) {
        let _ = p(S, y(S)),
          z = p(w, y(w)),
          A = p(w, y(w), x),
          T = p(S, y(S), x);
        Ms(o, _, z, A, T, g.revCol || a, [
          (_[0] + z[0]) / 2 - u * x * 0.5,
          Math.min(_[1], z[1]) - 5,
          (_[2] + z[2]) / 2 - d * x * 0.5,
        ]);
      }
    }
    if (x > 0) {
      let M = g.sill || s;
      for (let [S, w] of [
        [g.a, 1],
        [g.b, -1],
      ]) {
        let _ = p(S, M),
          z = p(S, g.ys),
          A = p(S, g.ys, x),
          T = p(S, M, x);
        Ms(o, _, z, A, T, g.revCol || a, [
          _[0] + h * w * 5 - u * x * 0.5,
          (M + g.ys) / 2,
          _[2] + f * w * 5 - d * x * 0.5,
        ]);
      }
      if (c) {
        let S = g.sill || s;
        o.quad(
          p(g.a, S, x),
          p(g.b, S, x),
          p(g.b, g.ys + v, x),
          p(g.a, g.ys + v, x),
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
function U7(
  o,
  t,
  e,
  s,
  n,
  i,
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
    p = c ?? i - d / 2 - 0.6,
    m = [],
    g = 0;
  (m.push({ a: 0, b: l }), (g = l));
  for (let v = 0; v < a; v++)
    (m.push({ a: g, b: g + d, ys: p, depth: h, back: !0 }),
      (g += d),
      v < a - 1 && (m.push({ a: g, b: g + l * 0.6 }), (g += l * 0.6)));
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
  for (let [v, x] of b) D7(o, v, x, n, i, m, r, { back: f });
}
