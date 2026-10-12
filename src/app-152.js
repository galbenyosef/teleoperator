// app 152 — math
// Lines 94923-95176 of readable/app.pretty.js (statement-aligned).
function Xut(i) {
  i = i.slice().sort((n, o) => n[0] - o[0] || n[1] - o[1]);
  let t = (n, o, a) =>
      (o[0] - n[0]) * (a[1] - n[1]) - (o[1] - n[1]) * (a[0] - n[0]),
    e = [],
    s = [];
  for (let n of i) {
    for (; e.length >= 2 && t(e[e.length - 2], e[e.length - 1], n) <= 1e-9;)
      e.pop();
    e.push(n);
  }
  for (let n = i.length - 1; n >= 0; n--) {
    let o = i[n];
    for (; s.length >= 2 && t(s[s.length - 2], s[s.length - 1], o) <= 1e-9;)
      s.pop();
    s.push(o);
  }
  return (s.pop(), e.pop(), e.concat(s));
}
function Kut(i) {
  let t = i.length,
    e = 1e9,
    s = 1e9,
    n = -1e9,
    o = -1e9;
  for (let u of i)
    ((e = Math.min(e, u[0])),
      (n = Math.max(n, u[0])),
      (s = Math.min(s, u[1])),
      (o = Math.max(o, u[1])));
  let a = Math.max(n - e, o - s) * 20 + 10,
    r = (e + n) / 2,
    l = (s + o) / 2,
    c = i
      .map((u) => [u[0], u[1]])
      .concat([
        [r - a, l - a],
        [r + a, l - a],
        [r, l + a],
      ]),
    h = (u, d, p) => {
      let [m, g] = c[u],
        [b, x] = c[d],
        [v, y] = c[p],
        M = 2 * (m * (x - y) + b * (y - g) + v * (g - x));
      if (Math.abs(M) < 1e-12) return [0, 0, -1];
      let S = m * m + g * g,
        w = b * b + x * x,
        z = v * v + y * y,
        _ = (S * (x - y) + w * (y - g) + z * (g - x)) / M,
        R = (S * (v - b) + w * (m - v) + z * (b - m)) / M;
      return [_, R, (m - _) ** 2 + (g - R) ** 2];
    },
    f = [[t, t + 1, t + 2, ...h(t, t + 1, t + 2)]];
  for (let u = 0; u < t; u++) {
    let [d, p] = c[u],
      m = [],
      g = [];
    for (let x of f)
      ((d - x[3]) ** 2 + (p - x[4]) ** 2 < x[5] - 1e-9 || x[5] < 0
        ? m
        : g
      ).push(x);
    let b = new Map();
    for (let x of m)
      for (let [v, y] of [
        [x[0], x[1]],
        [x[1], x[2]],
        [x[2], x[0]],
      ]) {
        let M = v < y ? v + "," + y : y + "," + v;
        b.set(M, b.has(M) ? null : [v, y]);
      }
    f = g;
    for (let x of b.values()) x && f.push([x[0], x[1], u, ...h(x[0], x[1], u)]);
  }
  return f
    .filter((u) => u[0] < t && u[1] < t && u[2] < t)
    .map((u) => [u[0], u[1], u[2]]);
}
function Yut(i) {
  let t = {},
    e = [],
    s = -1,
    n = (b, x, v) => {
      for (let y = 0; y < e.length; y++) {
        let M = e[y],
          S = y < s ? 0.35 : 0.05;
        if (Math.abs(M[0] - b) < S && Math.abs(M[1] - x) < S) return;
      }
      e.push([b, x, v]);
    },
    o = i.legs.filter(([b]) => !b.inner && b.L >= 0.5);
  for (let [b, x] of o) {
    let v = x === "a" ? b.s0 : b.s1;
    Ot(b, v, t);
    let y = Math.max(2, Math.ceil(t.w * 2));
    for (let M = 0; M <= y; M++) {
      let S = -t.w + (2 * t.w * M) / y;
      n(t.x + t.nx * S, t.z + t.nz * S, t.y);
    }
  }
  let a = o.map(
      ([b, x]) => (
        Ot(b, x === "a" ? b.s0 : b.s1, t),
        [
          t.x - t.nx * t.w,
          t.z - t.nz * t.w,
          t.x + t.nx * t.w,
          t.z + t.nz * t.w,
          b,
        ]
      ),
    ),
    r = (b, x, v, y = 0.75) =>
      a.some(([M, S, w, z, _]) => {
        if (_ === v) return !1;
        let R = w - M,
          T = z - S,
          E = R * R + T * T || 1e-9,
          A = Math.max(0, Math.min(1, ((b - M) * R + (x - S) * T) / E));
        return Math.hypot(b - M - R * A, x - S - T * A) < y;
      });
  for (let [b, x] of o) {
    let v = x === "a" ? b.s0 : b.s1,
      y = x === "a" ? v - 0.25 : v + 0.25;
    if (y < 0.3 || y > b.L - 0.3) continue;
    Ot(b, y, t);
    let M = Math.max(2, Math.ceil(t.w * 2));
    for (let S = 0; S <= M; S++) {
      let w = -t.w + (2 * t.w * S) / M,
        z = t.x + t.nx * w,
        _ = t.z + t.nz * w;
      r(z, _, b, 0.2) || n(z, _, t.y);
    }
  }
  s = e.length;
  for (let [b, x] of o) {
    let v = x === "a" ? b.s0 : b.s1,
      y = x === "a" ? 0 : b.L,
      M = Math.max(1, Math.ceil(Math.abs(v - y) / 2));
    for (let S = M - 1; S >= 0; S--) {
      let w = y + ((v - y) * S) / M;
      Ot(b, w, t);
      for (let z of [-1, 1]) {
        let _ = t.x + t.nx * t.w * z,
          R = t.z + t.nz * t.w * z;
        (S > 0 && r(_, R, b)) || n(_, R, t.y);
      }
    }
  }
  if (e.length < 3) return !1;
  let l = Xut(e);
  if (l.length < 3) return !1;
  let c = Kut(e),
    h = new Float32Array(e.length * 2),
    f = new Float32Array(e.length);
  (e.forEach((b, x) => {
    ((h[x * 2] = b[0]), (h[x * 2 + 1] = b[1]), (f[x] = b[2]));
  }),
    (i.tri = {
      tris: c.filter(
        ([b, x, v]) =>
          Math.abs(
            (e[x][0] - e[b][0]) * (e[v][1] - e[b][1]) -
              (e[x][1] - e[b][1]) * (e[v][0] - e[b][0]),
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
  (l.forEach((b, x) => {
    ((u.pts[x * 2] = b[0]), (u.pts[x * 2 + 1] = b[1]), (u.y[x] = b[2]));
  }),
    (i.rings = [u]),
    (i.polys = [[u]]));
  let d = 1e9,
    p = 1e9,
    m = -1e9,
    g = -1e9;
  for (let b of l)
    ((d = Math.min(d, b[0])),
      (m = Math.max(m, b[0])),
      (p = Math.min(p, b[1])),
      (g = Math.max(g, b[1])));
  return ((i.bb = [d, p, m, g]), (i.hull = !0), !0);
}
function vj(i, t, e = null) {
  let s = {},
    n = {},
    o = {},
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
        let x = g.P[b * 3],
          v = g.P[b * 3 + 1];
        if (x > f - m && x < d + m && v > u - m && v < p + m) return !0;
      }
      return !1;
    });
  }
  let h = (f, u, d) => {
    for (let p of c)
      if ((vs(p, f, u, o), o.d < o.w + 1 && o.y > d + 1)) return !0;
    return !1;
  };
  for (let f = 0; f <= t.L; f += 1) {
    Ot(t, f, s);
    let u = s.w + a;
    for (let d = -u; d <= u + 0.01; d += 1) {
      let p = s.x + s.nx * d,
        m = s.z + s.nz * d,
        g = Math.floor((p - i.x0) / i.step),
        b = Math.floor((m - i.z0) / i.step);
      for (let x = b; x <= b + 1; x++)
        for (let v = g; v <= g + 1; v++) {
          if (v < 0 || x < 0 || v >= i.nx || x >= i.nz) continue;
          let y = x * i.nx + v;
          if (
            l.has(y) ||
            (l.add(y),
            vs(t, i.x0 + v * i.step, i.z0 + x * i.step, n),
            n.d > n.w + a + 1.5)
          )
            continue;
          let M = n.y - 0.3;
          i.h[y] > M &&
            !(c.length && h(i.x0 + v * i.step, i.z0 + x * i.step, M)) &&
            ((i.h[y] = M), r++);
        }
    }
  }
  return r;
}
