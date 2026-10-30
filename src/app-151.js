// app 151 — math
// Lines 95193-95446 of readable/app.pretty.js (statement-aligned).
function gmt(o) {
  o = o.slice().sort((n, i) => n[0] - i[0] || n[1] - i[1]);
  let t = (n, i, a) =>
      (i[0] - n[0]) * (a[1] - n[1]) - (i[1] - n[1]) * (a[0] - n[0]),
    e = [],
    s = [];
  for (let n of o) {
    for (; e.length >= 2 && t(e[e.length - 2], e[e.length - 1], n) <= 1e-9;)
      e.pop();
    e.push(n);
  }
  for (let n = o.length - 1; n >= 0; n--) {
    let i = o[n];
    for (; s.length >= 2 && t(s[s.length - 2], s[s.length - 1], i) <= 1e-9;)
      s.pop();
    s.push(i);
  }
  return (s.pop(), e.pop(), e.concat(s));
}
function bmt(o) {
  let t = o.length,
    e = 1e9,
    s = 1e9,
    n = -1e9,
    i = -1e9;
  for (let u of o)
    ((e = Math.min(e, u[0])),
      (n = Math.max(n, u[0])),
      (s = Math.min(s, u[1])),
      (i = Math.max(i, u[1])));
  let a = Math.max(n - e, i - s) * 20 + 10,
    r = (e + n) / 2,
    l = (s + i) / 2,
    c = o
      .map((u) => [u[0], u[1]])
      .concat([
        [r - a, l - a],
        [r + a, l - a],
        [r, l + a],
      ]),
    h = (u, d, p) => {
      let [m, g] = c[u],
        [b, v] = c[d],
        [x, y] = c[p],
        M = 2 * (m * (v - y) + b * (y - g) + x * (g - v));
      if (Math.abs(M) < 1e-12) return [0, 0, -1];
      let S = m * m + g * g,
        w = b * b + v * v,
        _ = x * x + y * y,
        z = (S * (v - y) + w * (y - g) + _ * (g - v)) / M,
        A = (S * (x - b) + w * (m - x) + _ * (b - m)) / M;
      return [z, A, (m - z) ** 2 + (g - A) ** 2];
    },
    f = [[t, t + 1, t + 2, ...h(t, t + 1, t + 2)]];
  for (let u = 0; u < t; u++) {
    let [d, p] = c[u],
      m = [],
      g = [];
    for (let v of f)
      ((d - v[3]) ** 2 + (p - v[4]) ** 2 < v[5] - 1e-9 || v[5] < 0
        ? m
        : g
      ).push(v);
    let b = new Map();
    for (let v of m)
      for (let [x, y] of [
        [v[0], v[1]],
        [v[1], v[2]],
        [v[2], v[0]],
      ]) {
        let M = x < y ? x + "," + y : y + "," + x;
        b.set(M, b.has(M) ? null : [x, y]);
      }
    f = g;
    for (let v of b.values()) v && f.push([v[0], v[1], u, ...h(v[0], v[1], u)]);
  }
  return f
    .filter((u) => u[0] < t && u[1] < t && u[2] < t)
    .map((u) => [u[0], u[1], u[2]]);
}
function xmt(o) {
  let t = {},
    e = [],
    s = -1,
    n = (b, v, x) => {
      for (let y = 0; y < e.length; y++) {
        let M = e[y],
          S = y < s ? 0.35 : 0.05;
        if (Math.abs(M[0] - b) < S && Math.abs(M[1] - v) < S) return;
      }
      e.push([b, v, x]);
    },
    i = o.legs.filter(([b]) => !b.inner && b.L >= 0.5);
  for (let [b, v] of i) {
    let x = v === "a" ? b.s0 : b.s1;
    Ot(b, x, t);
    let y = Math.max(2, Math.ceil(t.w * 2));
    for (let M = 0; M <= y; M++) {
      let S = -t.w + (2 * t.w * M) / y;
      n(t.x + t.nx * S, t.z + t.nz * S, t.y);
    }
  }
  let a = i.map(
      ([b, v]) => (
        Ot(b, v === "a" ? b.s0 : b.s1, t),
        [
          t.x - t.nx * t.w,
          t.z - t.nz * t.w,
          t.x + t.nx * t.w,
          t.z + t.nz * t.w,
          b,
        ]
      ),
    ),
    r = (b, v, x, y = 0.75) =>
      a.some(([M, S, w, _, z]) => {
        if (z === x) return !1;
        let A = w - M,
          T = _ - S,
          E = A * A + T * T || 1e-9,
          R = Math.max(0, Math.min(1, ((b - M) * A + (v - S) * T) / E));
        return Math.hypot(b - M - A * R, v - S - T * R) < y;
      });
  for (let [b, v] of i) {
    let x = v === "a" ? b.s0 : b.s1,
      y = v === "a" ? x - 0.25 : x + 0.25;
    if (y < 0.3 || y > b.L - 0.3) continue;
    Ot(b, y, t);
    let M = Math.max(2, Math.ceil(t.w * 2));
    for (let S = 0; S <= M; S++) {
      let w = -t.w + (2 * t.w * S) / M,
        _ = t.x + t.nx * w,
        z = t.z + t.nz * w;
      r(_, z, b, 0.2) || n(_, z, t.y);
    }
  }
  s = e.length;
  for (let [b, v] of i) {
    let x = v === "a" ? b.s0 : b.s1,
      y = v === "a" ? 0 : b.L,
      M = Math.max(1, Math.ceil(Math.abs(x - y) / 2));
    for (let S = M - 1; S >= 0; S--) {
      let w = y + ((x - y) * S) / M;
      Ot(b, w, t);
      for (let _ of [-1, 1]) {
        let z = t.x + t.nx * t.w * _,
          A = t.z + t.nz * t.w * _;
        (S > 0 && r(z, A, b)) || n(z, A, t.y);
      }
    }
  }
  if (e.length < 3) return !1;
  let l = gmt(e);
  if (l.length < 3) return !1;
  let c = bmt(e),
    h = new Float32Array(e.length * 2),
    f = new Float32Array(e.length);
  (e.forEach((b, v) => {
    ((h[v * 2] = b[0]), (h[v * 2 + 1] = b[1]), (f[v] = b[2]));
  }),
    (o.tri = {
      tris: c.filter(
        ([b, v, x]) =>
          Math.abs(
            (e[v][0] - e[b][0]) * (e[x][1] - e[b][1]) -
              (e[v][1] - e[b][1]) * (e[x][0] - e[b][0]),
          ) > 1e-4,
      ),
      flat: h,
      ys: f,
    }));
  let u = {
    pts: new Float32Array(l.length * 2),
    y: new Float32Array(l.length),
    hole: !1,
  };
  (l.forEach((b, v) => {
    ((u.pts[v * 2] = b[0]), (u.pts[v * 2 + 1] = b[1]), (u.y[v] = b[2]));
  }),
    (o.rings = [u]),
    (o.polys = [[u]]));
  let d = 1e9,
    p = 1e9,
    m = -1e9,
    g = -1e9;
  for (let b of l)
    ((d = Math.min(d, b[0])),
      (m = Math.max(m, b[0])),
      (p = Math.min(p, b[1])),
      (g = Math.max(g, b[1])));
  return ((o.bb = [d, p, m, g]), (o.hull = !0), !0);
}
function w$(o, t, e = null) {
  let s = {},
    n = {},
    i = {},
    a = (t.sw || 0) + 0.5,
    r = 0,
    l = new Set(),
    c = [];
  if (e) {
    let f = 1e9,
      u = 1e9,
      d = -1e9,
      p = -1e9;
    for (let g = 0; g < t.n; g++)
      ((f = Math.min(f, t.P[g * 3])),
        (d = Math.max(d, t.P[g * 3])),
        (u = Math.min(u, t.P[g * 3 + 1])),
        (p = Math.max(p, t.P[g * 3 + 1])));
    let m = 12;
    c = e.edges.filter((g) => {
      if (g === t || g.inner || g.layered || g.tunnel || g.n < 2) return !1;
      for (let b = 0; b < g.n; b++) {
        let v = g.P[b * 3],
          x = g.P[b * 3 + 1];
        if (v > f - m && v < d + m && x > u - m && x < p + m) return !0;
      }
      return !1;
    });
  }
  let h = (f, u, d) => {
    for (let p of c)
      if ((ys(p, f, u, i), i.d < i.w + 1 && i.y > d + 1)) return !0;
    return !1;
  };
  for (let f = 0; f <= t.L; f += 1) {
    Ot(t, f, s);
    let u = s.w + a;
    for (let d = -u; d <= u + 0.01; d += 1) {
      let p = s.x + s.nx * d,
        m = s.z + s.nz * d,
        g = Math.floor((p - o.x0) / o.step),
        b = Math.floor((m - o.z0) / o.step);
      for (let v = b; v <= b + 1; v++)
        for (let x = g; x <= g + 1; x++) {
          if (x < 0 || v < 0 || x >= o.nx || v >= o.nz) continue;
          let y = v * o.nx + x;
          if (
            l.has(y) ||
            (l.add(y),
            ys(t, o.x0 + x * o.step, o.z0 + v * o.step, n),
            n.d > n.w + a + 1.5)
          )
            continue;
          let M = n.y - 0.3;
          o.h[y] > M &&
            !(c.length && h(o.x0 + x * o.step, o.z0 + v * o.step, M)) &&
            ((o.h[y] = M), r++);
        }
    }
  }
  return r;
}
