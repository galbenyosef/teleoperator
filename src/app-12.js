// app 12 — math
// Lines 39912-40217 of readable/app.pretty.js (statement-aligned).
function nk(o, t, e) {
  let s = [0, 1, 2].map((u) =>
      [...new Set(t.flatMap((d) => [d[u], d[u + 3]]))].sort((d, p) => d - p),
    ),
    [n, i, a] = s,
    r = i.length - 1,
    l = a.length - 1,
    c = new Set(),
    h = (u, d, p) => (u * r + d) * l + p;
  for (let u = 0; u + 1 < n.length; u++)
    for (let d = 0; d + 1 < i.length; d++)
      for (let p = 0; p + 1 < a.length; p++) {
        let m = [
          (n[u] + n[u + 1]) / 2,
          (i[d] + i[d + 1]) / 2,
          (a[p] + a[p + 1]) / 2,
        ];
        t.some((g) => m.every((b, v) => b > g[v] && b < g[v + 3])) &&
          c.add(h(u, d, p));
      }
  let f = (u, d, p) =>
    u >= 0 &&
    d >= 0 &&
    p >= 0 &&
    u < n.length - 1 &&
    d < r &&
    p < l &&
    c.has(h(u, d, p));
  for (let u = 0; u + 1 < n.length; u++)
    for (let d = 0; d < r; d++)
      for (let p = 0; p < l; p++)
        f(u, d, p) &&
          zs(o, n[u], i[d], a[p], n[u + 1], i[d + 1], a[p + 1], e, {
            bottom: !f(u, d - 1, p),
            top: !f(u, d + 1, p),
            sides: [
              !f(u, d, p - 1),
              !f(u + 1, d, p),
              !f(u, d, p + 1),
              !f(u - 1, d, p),
            ],
          });
}
function ik(o) {
  let t = new Map(),
    e = 8,
    s = [],
    n = (l) => [
      Math.min(...l.map((c) => c[0])),
      Math.min(...l.map((c) => c[2])),
      Math.max(...l.map((c) => c[0])),
      Math.max(...l.map((c) => c[2])),
    ],
    i = (l) => {
      let c = [];
      for (let h = Math.floor(l[0] / e); h <= Math.floor(l[2] / e); h++)
        for (let f = Math.floor(l[1] / e); f <= Math.floor(l[3] / e); f++)
          c.push(h + "," + f);
      return c;
    },
    a = (l, c, h, f) => {
      let u = (p) =>
          (h[0] - c[0]) * (p[2] - c[2]) - (h[2] - c[2]) * (p[0] - c[0]),
        d = [];
      for (let p = 0; p < l.length; p++) {
        let m = l[p],
          g = l[(p + 1) % l.length],
          b = u(m),
          v = u(g),
          x = f ? b >= 0 : b <= 0,
          y = f ? v >= 0 : v <= 0;
        if ((x && d.push(m), x !== y)) {
          let M = b / (b - v);
          d.push(m.map((S, w) => S + (g[w] - S) * M));
        }
      }
      return d;
    },
    r = (l) =>
      l.reduce((c, h, f) => {
        let u = l[(f + 1) % l.length];
        return c + h[0] * u[2] - u[0] * h[2];
      }, 0) / 2;
  for (let l of o) {
    let c = n(l.points),
      h = i(c),
      f = new Set(h.flatMap((p) => t.get(p) || [])),
      u = [l.points];
    for (let p of f) {
      if (
        p.bb[0] >= c[2] ||
        p.bb[2] <= c[0] ||
        p.bb[1] >= c[3] ||
        p.bb[3] <= c[1] ||
        Math.abs(
          p.y - l.points.reduce((b, v) => b + v[1], 0) / l.points.length,
        ) > 0.5
      )
        continue;
      let m = r(p.points) > 0 ? p.points : [...p.points].reverse(),
        g = [];
      for (let b of u) {
        let v = b;
        for (let y = 0; y < m.length && v.length >= 3; y++)
          v = a(v, m[y], m[(y + 1) % m.length], !0);
        if (v.length < 3 || Math.abs(r(v)) < 1e-8) {
          g.push(b);
          continue;
        }
        let x = b;
        for (let y = 0; y < m.length && x.length >= 3; y++) {
          let M = a(x, m[y], m[(y + 1) % m.length], !1);
          (M.length >= 3 && Math.abs(r(M)) > 1e-8 && g.push(M),
            (x = a(x, m[y], m[(y + 1) % m.length], !0)));
        }
      }
      if (((u = g), !u.length)) break;
    }
    for (let p of u) s.push({ ...l, points: p });
    let d = {
      points: l.points,
      bb: c,
      y: l.points.reduce((p, m) => p + m[1], 0) / l.points.length,
    };
    for (let p of h) (t.has(p) || t.set(p, []), t.get(p).push(d));
  }
  return s;
}
function Vs(
  o,
  t,
  e,
  s,
  n,
  i,
  a,
  r,
  l,
  c,
  { bottom: h = !1, top: f = !0, sides: u = [1, 1, 1, 1] } = {},
) {
  let d = -n,
    p = s,
    m = (S, w) => [t + s * i * S + d * a * w, e + n * i * S + p * a * w],
    g = m(-1, -1),
    b = m(1, -1),
    v = m(1, 1),
    x = m(-1, 1),
    y = (S, w) => {
      let _ = (S[0] + w[0]) / 2 - t,
        z = (S[1] + w[1]) / 2 - e,
        A = w[0] - S[0];
      -(w[1] - S[1]) * _ + A * z >= 0
        ? o.wall(S[0], S[1], w[0], w[1], r, r, l, l, c)
        : o.wall(w[0], w[1], S[0], S[1], r, r, l, l, c);
    };
  (u[0] && y(g, b), u[1] && y(b, v), u[2] && y(v, x), u[3] && y(x, g));
  let M = (S, w, _, z, A, T) => {
    let E = [S, w, _, z].map((R) => [R[0], A, R[1]]);
    T > 0 ? $i(o, E, c) : $i(o, E.reverse(), c, !0);
  };
  (f && M(g, b, v, x, l, 1), h && M(g, b, v, x, r, -1));
}
function $i(o, t, e, s = !1) {
  let n = t[1][0] - t[0][0],
    i = t[1][2] - t[0][2],
    a = t[3][0] - t[0][0],
    r = t[3][2] - t[0][2],
    c = i * a - n * r > 0 !== s ? t : [t[0], t[3], t[2], t[1]];
  o.quad(
    c[0],
    c[1],
    c[2],
    c[3],
    [c[0][0], c[0][2]],
    [c[1][0], c[1][2]],
    [c[2][0], c[2][2]],
    [c[3][0], c[3][2]],
    e,
    null,
  );
}
function ok(o, t, e) {
  for (let s = 1; s + 1 < t.length; s++) {
    let [n, i, a] = [t[0], t[s], t[s + 1]],
      r = i.map((u, d) => u - n[d]),
      l = a.map((u, d) => u - n[d]),
      c = [
        r[1] * l[2] - r[2] * l[1],
        r[2] * l[0] - r[0] * l[2],
        r[0] * l[1] - r[1] * l[0],
      ],
      h = Math.hypot(...c);
    if (h < 1e-10) continue;
    if (c[1] < 0) {
      [i, a] = [a, i];
      for (let u = 0; u < 3; u++) c[u] = -c[u];
    }
    let f = [n, i, a].map((u) =>
      o.vert(...u, c[0] / h, c[1] / h, c[2] / h, u[0], u[2], e),
    );
    o.tri(...f);
  }
}
function Ms(o, t, e, s, n, i, a = null, r = 1) {
  let l = new Na(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    c = new Na(n[0] - t[0], n[1] - t[1], n[2] - t[2]),
    h = new Na().crossVectors(l, c),
    f = [t, e, s, n];
  if (a) {
    let b = [(t[0] + s[0]) / 2, (t[1] + s[1]) / 2, (t[2] + s[2]) / 2];
    h.dot(new Na(a[0] - b[0], a[1] - b[1], a[2] - b[2])) < 0 &&
      (f = [t, n, s, e]);
  }
  let u = new Na(f[1][0] - f[0][0], f[1][1] - f[0][1], f[1][2] - f[0][2]),
    d = u.length() || 1;
  u.divideScalar(d);
  let p = new Na()
      .crossVectors(
        u,
        new Na(f[3][0] - f[0][0], f[3][1] - f[0][1], f[3][2] - f[0][2]),
      )
      .normalize(),
    m = new Na().crossVectors(p, u),
    g = (b) => {
      let v = new Na(b[0] - f[0][0], b[1] - f[0][1], b[2] - f[0][2]);
      return [v.dot(u) * r, v.dot(m) * r];
    };
  o.quad(f[0], f[1], f[2], f[3], g(f[0]), g(f[1]), g(f[2]), g(f[3]), i, [
    p.x,
    p.y,
    p.z,
  ]);
}
function Y0(o, t, e, s, n, i = null) {
  Ms(o, t, e, s, s, n, i);
}
function rs(o, t, e, s, n, i, a = !1) {
  let r = new Na(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    l = r.length();
  if (l < 1e-4) return;
  r.divideScalar(l);
  let c = Math.abs(r.y) > 0.95 ? new Na(1, 0, 0) : new Na(0, 1, 0),
    h = new Na().crossVectors(r, c).normalize(),
    f = new Na().crossVectors(h, r).normalize(),
    u = (g, b, v) => [
      g[0] + (h.x * b * s) / 2 + (f.x * v * n) / 2,
      g[1] + (h.y * b * s) / 2 + (f.y * v * n) / 2,
      g[2] + (h.z * b * s) / 2 + (f.z * v * n) / 2,
    ],
    d = [u(t, -1, -1), u(t, 1, -1), u(t, 1, 1), u(t, -1, 1)],
    p = [u(e, -1, -1), u(e, 1, -1), u(e, 1, 1), u(e, -1, 1)],
    m = [
      [-f.x, -f.y, -f.z],
      [h.x, h.y, h.z],
      [f.x, f.y, f.z],
      [-h.x, -h.y, -h.z],
    ];
  for (let g = 0; g < 4; g++) {
    let b = (g + 1) % 4;
    o.quad(d[g], p[g], p[b], d[b], [0, 0], [0, l], [s, l], [s, 0], i, m[g]);
  }
  a &&
    (o.quad(d[0], d[1], d[2], d[3], [0, 0], [1, 0], [1, 1], [0, 1], i, [
      -r.x,
      -r.y,
      -r.z,
    ]),
    o.quad(p[3], p[2], p[1], p[0], [0, 0], [1, 0], [1, 1], [0, 1], i, [
      r.x,
      r.y,
      r.z,
    ]));
}
function Ws(o, t, e, s, n, i, { rot: a = 0, sq: r = !1 } = {}) {
  let l = (c) => a + (c / n) * Math.PI * 2;
  for (let c = 0; c + 1 < s.length; c++) {
    let [h, f] = s[c],
      [u, d] = s[c + 1],
      p = u - h,
      m = d - f,
      g = Math.hypot(p, m) || 1,
      b = -p / g,
      v = m / g;
    for (let x = 0; x < n; x++) {
      let y = l(x),
        M = l(x + 1),
        S = r ? 1 / Math.max(Math.abs(Math.cos(y)), Math.abs(Math.sin(y))) : 1,
        w = r ? 1 / Math.max(Math.abs(Math.cos(M)), Math.abs(Math.sin(M))) : 1,
        _ = (L, F, O, B) => [
          t + Math.cos(O) * L * B,
          F,
          e + Math.sin(O) * L * B,
        ],
        z = [Math.cos(y) * v, b, Math.sin(y) * v],
        A = [Math.cos(M) * v, b, Math.sin(M) * v],
        T = (x / n) * Math.PI * 2 * Math.max(h, u),
        E = ((x + 1) / n) * Math.PI * 2 * Math.max(h, u),
        R = o.vert(..._(h, f, y, S), ...z, T, f, i),
        P = o.vert(..._(h, f, M, w), ...A, E, f, i),
        C = o.vert(..._(u, d, M, w), ...A, E, d, i),
        I = o.vert(..._(u, d, y, S), ...z, T, d, i);
      (o.tri(R, C, P), o.tri(R, I, C));
    }
  }
}
