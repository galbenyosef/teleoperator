// app 291 — math
// Lines 142920-143160 of readable/app.pretty.js (statement-aligned).
function Yyt(o, t, e) {
  let s = e.at(-98),
    n = s.ux,
    i = s.uz,
    a = new Map(),
    r = {};
  for (let g of o.edges)
    if (!(!g.hwy || g.inner || g.synthetic || g.elev))
      for (let b = 0; b <= g.L; b += 2) {
        Ot(g, b, r);
        for (let v of [-1, 1]) {
          let x = r.x + r.nx * r.w * v,
            y = r.z + r.nz * r.w * v,
            M = (x - s.x) * n + (y - s.z) * i,
            S = (x - s.x) * -i + (y - s.z) * n;
          if (M < -250 || M > 40 || Math.abs(S) > 70) continue;
          let w = Math.round(M / 4),
            _ = a.get(w);
          (_ || a.set(w, (_ = [1e9, -1e9])),
            (_[0] = Math.min(_[0], S)),
            (_[1] = Math.max(_[1], S)));
        }
      }
  let l = [...a.keys()].sort((g, b) => g - b);
  if (l.length < 3) return null;
  a.has(0) && (e.span = a.get(0));
  let c = new Be(),
    h = [0.3, 0, 0.65, 0.25],
    f = (g, b) => [s.x + n * g - i * b, s.z + i * g + n * b],
    u = (g, b) => {
      let v = t.roadAt(g, b, 3);
      if (v && v.onRoad) return v.y - 0.03;
      let x = t.roadAt(g, b, 40);
      return x ? x.y - 0.03 : t.terrainAt(g, b) + 0.07;
    },
    d = null;
  for (let g of l) {
    let [b, v] = a.get(g),
      x = 40,
      y = [];
    if (v - b < 6) {
      d = null;
      continue;
    }
    for (let M = 0; M <= x; M++) {
      let [S, w] = f(g * 4, b + ((v - b) * M) / x);
      y.push(c.vert(S, u(S, w), w, 0, 1, 0, S, w, h));
    }
    if (d && d.length === y.length)
      for (let M = 0; M < x; M++)
        (c.tri(d[M], y[M + 1], y[M]), c.tri(d[M], d[M + 1], y[M + 1]));
    else if (d) {
      let M = Math.min(d.length, y.length) - 1;
      for (let S = 0; S < M; S++)
        (c.tri(d[S], y[S], y[S + 1]), c.tri(d[S], y[S + 1], d[S + 1]));
    }
    d = y;
  }
  {
    let g = [],
      b = [];
    for (let x of l) {
      let [y, M] = a.get(x);
      M - y < 6 || (g.push(f(x * 4, y)), b.push(f(x * 4, M)));
    }
    let v = [...g, ...b.reverse()].flat();
    if (v.length >= 6) {
      let x = 1e9,
        y = 1e9,
        M = -1e9,
        S = -1e9;
      for (let w = 0; w < v.length; w += 2)
        ((x = Math.min(x, v[w])),
          (M = Math.max(M, v[w])),
          (y = Math.min(y, v[w + 1])),
          (S = Math.max(S, v[w + 1])));
      (o.pads ||= []).push({
        bb: [x, y, M, S],
        poly: new Float32Array(v),
        y: (w, _) => u(w, _) + 0.03,
        cap: 0,
        name: "Golden Gate toll plaza",
      });
    }
  }
  let p = o.terrain,
    m = [];
  if (p && p.h) {
    let g = 1e9,
      b = 1e9,
      v = -1e9,
      x = -1e9;
    for (let y of l) {
      let [M, S] = a.get(y);
      for (let w of [M, S]) {
        let [_, z] = f(y * 4, w);
        ((g = Math.min(g, _)),
          (v = Math.max(v, _)),
          (b = Math.min(b, z)),
          (x = Math.max(x, z)));
      }
    }
    for (
      let y = Math.max(0, Math.floor((b - 6 - p.z0) / p.step));
      y <= Math.min(p.nz - 1, Math.ceil((x + 6 - p.z0) / p.step));
      y++
    )
      for (
        let M = Math.max(0, Math.floor((g - 6 - p.x0) / p.step));
        M <= Math.min(p.nx - 1, Math.ceil((v + 6 - p.x0) / p.step));
        M++
      ) {
        let S = p.x0 + M * p.step,
          w = p.z0 + y * p.step,
          _ = (S - s.x) * n + (w - s.z) * i,
          z = (S - s.x) * -i + (w - s.z) * n,
          A = a.get(Math.round(_ / 4));
        if (!A || A[1] - A[0] < 6 || z < A[0] - 4 || z > A[1] + 4) continue;
        let T = Math.max(0, A[0] - z, z - A[1]);
        m.push([
          y * p.nx + M,
          T > 0 ? p.h[y * p.nx + M] - 0.45 * (1 - T / 4) : u(S, w) - 0.45,
        ]);
      }
    for (let [y, M] of m) p.h[y] > M && (p.h[y] = M);
  }
  return c.empty ? null : c;
}
function Jyt(o, t) {
  let e = o.juns.find(
      (u) => u.polys.length && Math.hypot(u.x + 7307.5, u.z + 1387) < 6,
    ),
    s = o.juns.find((u) => Math.hypot(u.x + 7172.4, u.z + 1215.9) < 4);
  if (!e || !s) return null;
  let n = [(e.x + s.x) / 2, (e.z + s.z) / 2],
    i = (e.y + s.y) / 2,
    a = e.x - s.x,
    r = e.z - s.z,
    l = Math.hypot(a, r);
  ((a /= l), (r /= l));
  let c = (u) => ({
      x: n[0] + a * (u + 98),
      z: n[1] + r * (u + 98),
      y: i,
      ux: a,
      uz: r,
    }),
    h = [];
  for (let u of o.edges) {
    if (!u.hwy || u.inner || u.lanes !== 1 || u.synthetic) continue;
    let d = ys(u, n[0], n[1], {});
    if (d.d > 30) continue;
    let p = Ot(u, d.s, {}),
      m = (p.x - n[0]) * -r + (p.z - n[1]) * a;
    h.push([m, p.w]);
  }
  h.sort((u, d) => u[0] - d[0]);
  let f = [];
  for (let u = 0; u + 1 < h.length; u++)
    h[u + 1][0] - h[u + 1][1] - (h[u][0] + h[u][1]) > 1.1 &&
      f.push((h[u][0] + h[u][1] + h[u + 1][0] - h[u + 1][1]) / 2);
  return (
    h.length &&
      f.push(
        h[0][0] - h[0][1] - 1.4,
        h[h.length - 1][0] + h[h.length - 1][1] + 1.4,
      ),
    { at: c, islands: f }
  );
}
es();
Ya();
function wc(o, t, e, s, n, i = s) {
  let a = e[0] - t[0],
    r = e[1] - t[1],
    l = e[2] - t[2],
    c = Math.hypot(a, r, l);
  if (!(c > 0.001)) return;
  let h = [a / c, r / c, l / c],
    f = Math.abs(h[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    u = [
      h[1] * f[2] - h[2] * f[1],
      h[2] * f[0] - h[0] * f[2],
      h[0] * f[1] - h[1] * f[0],
    ],
    d = Math.hypot(...u);
  ((u[0] /= d), (u[1] /= d), (u[2] /= d));
  let p = [
      h[1] * u[2] - h[2] * u[1],
      h[2] * u[0] - h[0] * u[2],
      h[0] * u[1] - h[1] * u[0],
    ],
    m = [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ].map(([g, b]) => [
      u[0] * g * s + p[0] * b * i,
      u[1] * g * s + p[1] * b * i,
      u[2] * g * s + p[2] * b * i,
    ]);
  for (let g = 0; g < 4; g++) {
    let b = m[g],
      v = m[(g + 1) % 4],
      x = [(b[0] + v[0]) / 2, (b[1] + v[1]) / 2, (b[2] + v[2]) / 2],
      y = Math.hypot(...x) || 1;
    o.quad(
      [t[0] + b[0], t[1] + b[1], t[2] + b[2]],
      [e[0] + b[0], e[1] + b[1], e[2] + b[2]],
      [e[0] + v[0], e[1] + v[1], e[2] + v[2]],
      [t[0] + v[0], t[1] + v[1], t[2] + v[2]],
      [0, 0],
      [c, 0],
      [c, 1],
      [0, 1],
      n,
      [x[0] / y, x[1] / y, x[2] / y],
    );
  }
}
function fv(o, t, e, s, n, i, a, r, l) {
  let c = (f, u, d) => [
      t[0] + e[0] * n * f + s[0] * i * u,
      d,
      t[1] + e[1] * n * f + s[1] * i * u,
    ],
    h = (f, u, d, p, m) =>
      o.quad(f, u, d, p, [0, 0], [1, 0], [1, 1], [0, 1], l, m);
  (h(c(-1, -1, r), c(1, -1, r), c(1, 1, r), c(-1, 1, r), [0, 1, 0]),
    h(c(-1, 1, a), c(1, 1, a), c(1, -1, a), c(-1, -1, a), [0, -1, 0]),
    h(c(1, -1, a), c(1, 1, a), c(1, 1, r), c(1, -1, r), [e[0], 0, e[1]]),
    h(c(-1, 1, a), c(-1, -1, a), c(-1, -1, r), c(-1, 1, r), [-e[0], 0, -e[1]]),
    h(c(1, 1, a), c(-1, 1, a), c(-1, 1, r), c(1, 1, r), [s[0], 0, s[1]]),
    h(c(-1, -1, a), c(1, -1, a), c(1, -1, r), c(-1, -1, r), [-s[0], 0, -s[1]]));
}
var Mc = [0.035, 0.038, 0.042, 0.4],
  Zyt = [0.3, 0.29, 0.27, 0.5],
  jF = [0.8, 0.8, 0.78, 0.4],
  Qyt = [0.07, 0.09, 0.11, 0.1],
  t5t = [0.55, 0.12, 0.85, 0.2];
