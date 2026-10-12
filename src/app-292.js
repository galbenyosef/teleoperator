// app 292 — math
// Lines 142643-142883 of readable/app.pretty.js (statement-aligned).
function _xt(i, t, e) {
  let s = e.at(-98),
    n = s.ux,
    o = s.uz,
    a = new Map(),
    r = {};
  for (let g of i.edges)
    if (!(!g.hwy || g.inner || g.synthetic || g.elev))
      for (let b = 0; b <= g.L; b += 2) {
        Ot(g, b, r);
        for (let x of [-1, 1]) {
          let v = r.x + r.nx * r.w * x,
            y = r.z + r.nz * r.w * x,
            M = (v - s.x) * n + (y - s.z) * o,
            S = (v - s.x) * -o + (y - s.z) * n;
          if (M < -250 || M > 40 || Math.abs(S) > 70) continue;
          let w = Math.round(M / 4),
            z = a.get(w);
          (z || a.set(w, (z = [1e9, -1e9])),
            (z[0] = Math.min(z[0], S)),
            (z[1] = Math.max(z[1], S)));
        }
      }
  let l = [...a.keys()].sort((g, b) => g - b);
  if (l.length < 3) return null;
  a.has(0) && (e.span = a.get(0));
  let c = new Ce(),
    h = [0.3, 0, 0.65, 0.25],
    f = (g, b) => [s.x + n * g - o * b, s.z + o * g + n * b],
    u = (g, b) => {
      let x = t.roadAt(g, b, 3);
      if (x && x.onRoad) return x.y - 0.03;
      let v = t.roadAt(g, b, 40);
      return v ? v.y - 0.03 : t.terrainAt(g, b) + 0.07;
    },
    d = null;
  for (let g of l) {
    let [b, x] = a.get(g),
      v = 40,
      y = [];
    if (x - b < 6) {
      d = null;
      continue;
    }
    for (let M = 0; M <= v; M++) {
      let [S, w] = f(g * 4, b + ((x - b) * M) / v);
      y.push(c.vert(S, u(S, w), w, 0, 1, 0, S, w, h));
    }
    if (d && d.length === y.length)
      for (let M = 0; M < v; M++)
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
    for (let v of l) {
      let [y, M] = a.get(v);
      M - y < 6 || (g.push(f(v * 4, y)), b.push(f(v * 4, M)));
    }
    let x = [...g, ...b.reverse()].flat();
    if (x.length >= 6) {
      let v = 1e9,
        y = 1e9,
        M = -1e9,
        S = -1e9;
      for (let w = 0; w < x.length; w += 2)
        ((v = Math.min(v, x[w])),
          (M = Math.max(M, x[w])),
          (y = Math.min(y, x[w + 1])),
          (S = Math.max(S, x[w + 1])));
      (i.pads ||= []).push({
        bb: [v, y, M, S],
        poly: new Float32Array(x),
        y: (w, z) => u(w, z) + 0.03,
        cap: 0,
        name: "Golden Gate toll plaza",
      });
    }
  }
  let p = i.terrain,
    m = [];
  if (p && p.h) {
    let g = 1e9,
      b = 1e9,
      x = -1e9,
      v = -1e9;
    for (let y of l) {
      let [M, S] = a.get(y);
      for (let w of [M, S]) {
        let [z, _] = f(y * 4, w);
        ((g = Math.min(g, z)),
          (x = Math.max(x, z)),
          (b = Math.min(b, _)),
          (v = Math.max(v, _)));
      }
    }
    for (
      let y = Math.max(0, Math.floor((b - 6 - p.z0) / p.step));
      y <= Math.min(p.nz - 1, Math.ceil((v + 6 - p.z0) / p.step));
      y++
    )
      for (
        let M = Math.max(0, Math.floor((g - 6 - p.x0) / p.step));
        M <= Math.min(p.nx - 1, Math.ceil((x + 6 - p.x0) / p.step));
        M++
      ) {
        let S = p.x0 + M * p.step,
          w = p.z0 + y * p.step,
          z = (S - s.x) * n + (w - s.z) * o,
          _ = (S - s.x) * -o + (w - s.z) * n,
          R = a.get(Math.round(z / 4));
        if (!R || R[1] - R[0] < 6 || _ < R[0] - 4 || _ > R[1] + 4) continue;
        let T = Math.max(0, R[0] - _, _ - R[1]);
        m.push([
          y * p.nx + M,
          T > 0 ? p.h[y * p.nx + M] - 0.45 * (1 - T / 4) : u(S, w) - 0.45,
        ]);
      }
    for (let [y, M] of m) p.h[y] > M && (p.h[y] = M);
  }
  return c.empty ? null : c;
}
function zxt(i, t) {
  let e = i.juns.find(
      (u) => u.polys.length && Math.hypot(u.x + 7307.5, u.z + 1387) < 6,
    ),
    s = i.juns.find((u) => Math.hypot(u.x + 7172.4, u.z + 1215.9) < 4);
  if (!e || !s) return null;
  let n = [(e.x + s.x) / 2, (e.z + s.z) / 2],
    o = (e.y + s.y) / 2,
    a = e.x - s.x,
    r = e.z - s.z,
    l = Math.hypot(a, r);
  ((a /= l), (r /= l));
  let c = (u) => ({
      x: n[0] + a * (u + 98),
      z: n[1] + r * (u + 98),
      y: o,
      ux: a,
      uz: r,
    }),
    h = [];
  for (let u of i.edges) {
    if (!u.hwy || u.inner || u.lanes !== 1 || u.synthetic) continue;
    let d = vs(u, n[0], n[1], {});
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
as();
Oa();
function Zl(i, t, e, s, n, o = s) {
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
      u[0] * g * s + p[0] * b * o,
      u[1] * g * s + p[1] * b * o,
      u[2] * g * s + p[2] * b * o,
    ]);
  for (let g = 0; g < 4; g++) {
    let b = m[g],
      x = m[(g + 1) % 4],
      v = [(b[0] + x[0]) / 2, (b[1] + x[1]) / 2, (b[2] + x[2]) / 2],
      y = Math.hypot(...v) || 1;
    i.quad(
      [t[0] + b[0], t[1] + b[1], t[2] + b[2]],
      [e[0] + b[0], e[1] + b[1], e[2] + b[2]],
      [e[0] + x[0], e[1] + x[1], e[2] + x[2]],
      [t[0] + x[0], t[1] + x[1], t[2] + x[2]],
      [0, 0],
      [c, 0],
      [c, 1],
      [0, 1],
      n,
      [v[0] / y, v[1] / y, v[2] / y],
    );
  }
}
function _x(i, t, e, s, n, o, a, r, l) {
  let c = (f, u, d) => [
      t[0] + e[0] * n * f + s[0] * o * u,
      d,
      t[1] + e[1] * n * f + s[1] * o * u,
    ],
    h = (f, u, d, p, m) =>
      i.quad(f, u, d, p, [0, 0], [1, 0], [1, 1], [0, 1], l, m);
  (h(c(-1, -1, r), c(1, -1, r), c(1, 1, r), c(-1, 1, r), [0, 1, 0]),
    h(c(-1, 1, a), c(1, 1, a), c(1, -1, a), c(-1, -1, a), [0, -1, 0]),
    h(c(1, -1, a), c(1, 1, a), c(1, 1, r), c(1, -1, r), [e[0], 0, e[1]]),
    h(c(-1, 1, a), c(-1, -1, a), c(-1, -1, r), c(-1, 1, r), [-e[0], 0, -e[1]]),
    h(c(1, 1, a), c(-1, 1, a), c(-1, 1, r), c(1, 1, r), [s[0], 0, s[1]]),
    h(c(-1, -1, a), c(1, -1, a), c(1, -1, r), c(-1, -1, r), [-s[0], 0, -s[1]]));
}
var Ql = [0.035, 0.038, 0.042, 0.4],
  Ext = [0.3, 0.29, 0.27, 0.5],
  gI = [0.8, 0.8, 0.78, 0.4],
  Txt = [0.07, 0.09, 0.11, 0.1],
  Axt = [0.55, 0.12, 0.85, 0.2];
