// app 12 — math
// Lines 39871-40209 of readable/app.pretty.js (statement-aligned).
function sS(i) {
  let t = new Map(),
    e = 8,
    s = [],
    n = (l) => [
      Math.min(...l.map((c) => c[0])),
      Math.min(...l.map((c) => c[2])),
      Math.max(...l.map((c) => c[0])),
      Math.max(...l.map((c) => c[2])),
    ],
    o = (l) => {
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
          x = u(g),
          v = f ? b >= 0 : b <= 0,
          y = f ? x >= 0 : x <= 0;
        if ((v && d.push(m), v !== y)) {
          let M = b / (b - x);
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
  for (let l of i) {
    let c = n(l.points),
      h = o(c),
      f = new Set(h.flatMap((p) => t.get(p) || [])),
      u = [l.points];
    for (let p of f) {
      if (
        p.bb[0] >= c[2] ||
        p.bb[2] <= c[0] ||
        p.bb[1] >= c[3] ||
        p.bb[3] <= c[1] ||
        Math.abs(
          p.y - l.points.reduce((b, x) => b + x[1], 0) / l.points.length,
        ) > 0.5
      )
        continue;
      let m = r(p.points) > 0 ? p.points : [...p.points].reverse(),
        g = [];
      for (let b of u) {
        let x = b;
        for (let y = 0; y < m.length && x.length >= 3; y++)
          x = a(x, m[y], m[(y + 1) % m.length], !0);
        if (x.length < 3 || Math.abs(r(x)) < 1e-8) {
          g.push(b);
          continue;
        }
        let v = b;
        for (let y = 0; y < m.length && v.length >= 3; y++) {
          let M = a(v, m[y], m[(y + 1) % m.length], !1);
          (M.length >= 3 && Math.abs(r(M)) > 1e-8 && g.push(M),
            (v = a(v, m[y], m[(y + 1) % m.length], !0)));
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
function Us(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  l,
  c,
  { bottom: h = !1, top: f = !0, sides: u = [1, 1, 1, 1] } = {},
) {
  let d = -n,
    p = s,
    m = (S, w) => [t + s * o * S + d * a * w, e + n * o * S + p * a * w],
    g = m(-1, -1),
    b = m(1, -1),
    x = m(1, 1),
    v = m(-1, 1),
    y = (S, w) => {
      let z = (S[0] + w[0]) / 2 - t,
        _ = (S[1] + w[1]) / 2 - e,
        R = w[0] - S[0];
      -(w[1] - S[1]) * z + R * _ >= 0
        ? i.wall(S[0], S[1], w[0], w[1], r, r, l, l, c)
        : i.wall(w[0], w[1], S[0], S[1], r, r, l, l, c);
    };
  (u[0] && y(g, b), u[1] && y(b, x), u[2] && y(x, v), u[3] && y(v, g));
  let M = (S, w, z, _, R, T) => {
    let E = [S, w, z, _].map((A) => [A[0], R, A[1]]);
    T > 0 ? Fi(i, E, c) : Fi(i, E.reverse(), c, !0);
  };
  (f && M(g, b, x, v, l, 1), h && M(g, b, x, v, r, -1));
}
function Fi(i, t, e, s = !1) {
  let n = t[1][0] - t[0][0],
    o = t[1][2] - t[0][2],
    a = t[3][0] - t[0][0],
    r = t[3][2] - t[0][2],
    c = o * a - n * r > 0 !== s ? t : [t[0], t[3], t[2], t[1]];
  i.quad(
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
function nS(i, t, e) {
  for (let s = 1; s + 1 < t.length; s++) {
    let [n, o, a] = [t[0], t[s], t[s + 1]],
      r = o.map((u, d) => u - n[d]),
      l = a.map((u, d) => u - n[d]),
      c = [
        r[1] * l[2] - r[2] * l[1],
        r[2] * l[0] - r[0] * l[2],
        r[0] * l[1] - r[1] * l[0],
      ],
      h = Math.hypot(...c);
    if (h < 1e-10) continue;
    if (c[1] < 0) {
      [o, a] = [a, o];
      for (let u = 0; u < 3; u++) c[u] = -c[u];
    }
    let f = [n, o, a].map((u) =>
      i.vert(...u, c[0] / h, c[1] / h, c[2] / h, u[0], u[2], e),
    );
    i.tri(...f);
  }
}
function xs(i, t, e, s, n, o, a = null, r = 1) {
  let l = new Ea(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    c = new Ea(n[0] - t[0], n[1] - t[1], n[2] - t[2]),
    h = new Ea().crossVectors(l, c),
    f = [t, e, s, n];
  if (a) {
    let b = [(t[0] + s[0]) / 2, (t[1] + s[1]) / 2, (t[2] + s[2]) / 2];
    h.dot(new Ea(a[0] - b[0], a[1] - b[1], a[2] - b[2])) < 0 &&
      (f = [t, n, s, e]);
  }
  let u = new Ea(f[1][0] - f[0][0], f[1][1] - f[0][1], f[1][2] - f[0][2]),
    d = u.length() || 1;
  u.divideScalar(d);
  let p = new Ea()
      .crossVectors(
        u,
        new Ea(f[3][0] - f[0][0], f[3][1] - f[0][1], f[3][2] - f[0][2]),
      )
      .normalize(),
    m = new Ea().crossVectors(p, u),
    g = (b) => {
      let x = new Ea(b[0] - f[0][0], b[1] - f[0][1], b[2] - f[0][2]);
      return [x.dot(u) * r, x.dot(m) * r];
    };
  i.quad(f[0], f[1], f[2], f[3], g(f[0]), g(f[1]), g(f[2]), g(f[3]), o, [
    p.x,
    p.y,
    p.z,
  ]);
}
function E0(i, t, e, s, n, o = null) {
  xs(i, t, e, s, s, n, o);
}
function ss(i, t, e, s, n, o, a = !1) {
  let r = new Ea(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    l = r.length();
  if (l < 1e-4) return;
  r.divideScalar(l);
  let c = Math.abs(r.y) > 0.95 ? new Ea(1, 0, 0) : new Ea(0, 1, 0),
    h = new Ea().crossVectors(r, c).normalize(),
    f = new Ea().crossVectors(h, r).normalize(),
    u = (g, b, x) => [
      g[0] + (h.x * b * s) / 2 + (f.x * x * n) / 2,
      g[1] + (h.y * b * s) / 2 + (f.y * x * n) / 2,
      g[2] + (h.z * b * s) / 2 + (f.z * x * n) / 2,
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
    i.quad(d[g], p[g], p[b], d[b], [0, 0], [0, l], [s, l], [s, 0], o, m[g]);
  }
  a &&
    (i.quad(d[0], d[1], d[2], d[3], [0, 0], [1, 0], [1, 1], [0, 1], o, [
      -r.x,
      -r.y,
      -r.z,
    ]),
    i.quad(p[3], p[2], p[1], p[0], [0, 0], [1, 0], [1, 1], [0, 1], o, [
      r.x,
      r.y,
      r.z,
    ]));
}
function Gs(i, t, e, s, n, o, { rot: a = 0, sq: r = !1 } = {}) {
  let l = (c) => a + (c / n) * Math.PI * 2;
  for (let c = 0; c + 1 < s.length; c++) {
    let [h, f] = s[c],
      [u, d] = s[c + 1],
      p = u - h,
      m = d - f,
      g = Math.hypot(p, m) || 1,
      b = -p / g,
      x = m / g;
    for (let v = 0; v < n; v++) {
      let y = l(v),
        M = l(v + 1),
        S = r ? 1 / Math.max(Math.abs(Math.cos(y)), Math.abs(Math.sin(y))) : 1,
        w = r ? 1 / Math.max(Math.abs(Math.cos(M)), Math.abs(Math.sin(M))) : 1,
        z = (L, F, N, B) => [
          t + Math.cos(N) * L * B,
          F,
          e + Math.sin(N) * L * B,
        ],
        _ = [Math.cos(y) * x, b, Math.sin(y) * x],
        R = [Math.cos(M) * x, b, Math.sin(M) * x],
        T = (v / n) * Math.PI * 2 * Math.max(h, u),
        E = ((v + 1) / n) * Math.PI * 2 * Math.max(h, u),
        A = i.vert(...z(h, f, y, S), ..._, T, f, o),
        C = i.vert(...z(h, f, M, w), ...R, E, f, o),
        P = i.vert(...z(u, d, M, w), ...R, E, d, o),
        I = i.vert(...z(u, d, y, S), ..._, T, d, o);
      (i.tri(A, P, C), i.tri(A, I, P));
    }
  }
}
function Wi(i, t, e, s, n, { caps: o = !1 } = {}) {
  let a = t.map((h) => new Ea(...h)),
    r = null,
    l = 0,
    c = [];
  for (let h = 0; h < a.length; h++) {
    let f = new Ea()
        .subVectors(a[Math.min(h + 1, a.length - 1)], a[Math.max(h - 1, 0)])
        .normalize(),
      u = r
        ? r
            .clone()
            .sub(f.clone().multiplyScalar(r.dot(f)))
            .normalize()
        : (Math.abs(f.y) < 0.9 ? new Ea(0, 1, 0) : new Ea(1, 0, 0))
            .sub(f.clone().multiplyScalar(Math.abs(f.y) < 0.9 ? f.y : f.x))
            .normalize(),
      d = new Ea().crossVectors(f, u);
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
        x = u
          .clone()
          .multiplyScalar(Math.cos(b))
          .add(d.clone().multiplyScalar(Math.sin(b)));
      m.push(
        i.vert(
          a[h].x + x.x * p,
          a[h].y + x.y * p,
          a[h].z + x.z * p,
          x.x,
          x.y,
          x.z,
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
      (i.tri(u, d, p), i.tri(u, p, m));
    }
  if (o)
    for (let [h, f] of [
      [0, -1],
      [a.length - 1, 1],
    ]) {
      let u = new Ea()
          .subVectors(a[Math.min(h + 1, a.length - 1)], a[Math.max(h - 1, 0)])
          .normalize()
          .multiplyScalar(f),
        d = typeof e == "function" ? e(h ? 1 : 0) : Array.isArray(e) ? e[h] : e,
        p = i.vert(a[h].x, a[h].y, a[h].z, u.x, u.y, u.z, 0, 0, n),
        m = c[h].map((g) => {
          let b = i.p.a,
            x = g * 3;
          return i.vert(b[x], b[x + 1], b[x + 2], u.x, u.y, u.z, 0, 0, n);
        });
      for (let g = 0; g < s; g++)
        f > 0 ? i.tri(p, m[g], m[g + 1]) : i.tri(p, m[g + 1], m[g]);
    }
}
