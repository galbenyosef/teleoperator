// app 186 — math
// Lines 106891-106985 of readable/app.pretty.js (statement-aligned).
function Gi(o, t, e, s, n, i, a, r, l, c, h = !0) {
  let f = -n,
    u = s,
    d = (g, b) => [t + s * i * g + f * a * b, e + n * i * g + u * a * b],
    p = [d(-1, -1), d(1, -1), d(1, 1), d(-1, 1)],
    m = j5([...p[0], ...p[1], ...p[2], ...p[3]]) < 0 ? p : p.slice().reverse();
  for (let g = 0; g < 4; g++) {
    let b = m[g],
      v = m[(g + 1) % 4];
    o.wall(b[0], b[1], v[0], v[1], r, r, l, l, c);
  }
  h &&
    Fw(
      o,
      [p[0][0], l, p[0][1]],
      [p[1][0], l, p[1][1]],
      [p[2][0], l, p[2][1]],
      [p[3][0], l, p[3][1]],
      c,
      !0,
    );
}
function Fw(o, t, e, s, n, i, a) {
  (e[2] - t[2]) * (s[0] - t[0]) - (e[0] - t[0]) * (s[2] - t[2]) >= 0 === a
    ? o.quad(
        t,
        e,
        s,
        n,
        [t[0], t[2]],
        [e[0], e[2]],
        [s[0], s[2]],
        [n[0], n[2]],
        i,
        [0, a ? 1 : -1, 0],
      )
    : o.quad(
        t,
        n,
        s,
        e,
        [t[0], t[2]],
        [n[0], n[2]],
        [s[0], s[2]],
        [e[0], e[2]],
        i,
        [0, a ? 1 : -1, 0],
      );
}
function pz(o, t, e, s, n, i, a, r, l = !0) {
  let c = [];
  for (let f = 0; f < n; f++) {
    let u = (-f / n) * Math.PI * 2;
    c.push(t + Math.cos(u) * s, e + Math.sin(u) * s);
  }
  let h =
    j5(c) < 0
      ? c
      : (() => {
          let f = [];
          for (let u = n - 1; u >= 0; u--) f.push(c[u * 2], c[u * 2 + 1]);
          return f;
        })();
  for (let f = 0; f < n; f++) {
    let u = (f + 1) % n;
    o.wall(h[f * 2], h[f * 2 + 1], h[u * 2], h[u * 2 + 1], i, i, a, a, r);
  }
  l && zx(o, [h], a, r, !0);
}
function ogt(o, t, e, s, n, i, a, r) {
  let l = a - i,
    c = Math.hypot(s, l);
  for (let h = 0; h < n; h++) {
    let f = (h / n) * Math.PI * 2,
      u = ((h + 1) / n) * Math.PI * 2,
      d = (f + u) / 2,
      p = [(Math.cos(d) * l) / c, s / c, (Math.sin(d) * l) / c],
      m = [t + Math.cos(f) * s, i, e + Math.sin(f) * s],
      g = [t + Math.cos(u) * s, i, e + Math.sin(u) * s],
      b = [t, a, e],
      v = o.vert(...m, ...p, m[0], m[2], r),
      x = o.vert(...g, ...p, g[0], g[2], r),
      y = o.vert(...b, ...p, b[0], b[2], r),
      M = [g[0] - m[0], g[1] - m[1], g[2] - m[2]],
      S = [b[0] - m[0], b[1] - m[1], b[2] - m[2]],
      w = [
        M[1] * S[2] - M[2] * S[1],
        M[2] * S[0] - M[0] * S[2],
        M[0] * S[1] - M[1] * S[0],
      ];
    w[0] * p[0] + w[1] * p[1] + w[2] * p[2] >= 0
      ? o.tri(v, x, y)
      : o.tri(v, y, x);
  }
}
