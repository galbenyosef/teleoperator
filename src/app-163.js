// app 163 — math
// Lines 98234-98572 of readable/app.pretty.js (statement-aligned).
function Pdt(i, t, e, s) {
  let n = null;
  if (
    (s.E &&
      (vs(s.E, t, e, s.q),
      Math.abs(s.q.d - s.q.w) < 1.5 &&
        s.q.s > 0 &&
        s.q.s < s.E.L &&
        (n = { E: s.E, s: s.q.s, v: s.q.v })),
    n || ((n = i.roadAt(t, e, 4, void 0, !0)), (s.E = n?.E || null)),
    !n || !n.E || n.E.hwy || n.E.elev || n.E.custom)
  )
    return Q7;
  let o = n.E;
  if (n.s < o.s0 + 6 || n.s > o.s1 - 6) return kb.r;
  let a = Math.floor(n.s / 11),
    r = n.v > 0 ? 1 : 0,
    l = Rdt(o.P[0] * 0.37 + a * 1.7 + r * 9.1, o.P[1] * 0.29 - a * 0.3),
    c = Adt.has(o.dist) || (o.rank ?? 0) >= 6;
  return l < (c ? 0.05 : 0.03)
    ? kb.r
    : l < (c ? 0.2 : 0.06)
      ? kb.y
      : l < (c ? 0.25 : 0.075)
        ? kb.w
        : l < (c ? 0.3 : 0.1)
          ? kb.g
          : l < (c ? 0.32 : 0.115)
            ? kb.b
            : Q7;
}
function tV(i, t, e, s = !0, n = null, o = null) {
  let a = t.ys ? t : udt(t, 2.5, !1),
    r = a.length / 2;
  if (r < 2) return;
  let l = t.ys || [];
  if (!t.ys)
    for (let f = 0; f < r; f++) {
      let u = Math.max(0, f - 1),
        d = Math.min(r - 1, f + 1),
        p = a[d * 2] - a[u * 2],
        m = a[d * 2 + 1] - a[u * 2 + 1],
        g = Math.hypot(p, m) || 1;
      l.push(e.streetY(a[f * 2] + (m / g) * 0.3, a[f * 2 + 1] - (p / g) * 0.3));
    }
  let c = 0,
    h = { E: null, q: {} };
  for (let f = r - 1; f > 0; f--) {
    let u = a[f * 2],
      d = a[f * 2 + 1],
      p = a[f * 2 - 2],
      m = a[f * 2 - 1],
      g = Math.hypot(p - u, m - d);
    if (
      g > 0.05 &&
      o &&
      n?.length &&
      n.some(
        (x) => u > x._bb[0] && u < x._bb[2] && d > x._bb[1] && d < x._bb[3],
      ) &&
      Qd(
        o,
        (u + p) / 2 + ((m - d) / g) * 0.6,
        (d + m) / 2 - ((p - u) / g) * 0.6,
      ) &&
      Qd(
        o,
        (u + p) / 2 - ((m - d) / g) * 0.6,
        (d + m) / 2 + ((p - u) / g) * 0.6,
      )
    ) {
      c += g;
      continue;
    }
    let b =
      s && e.roadAt && g > 0.05
        ? Pdt(
            e,
            (u + p) / 2 - ((m - d) / g) * 0.6,
            (d + m) / 2 + ((p - u) / g) * 0.6,
            h,
          )
        : Q7;
    (i.wall(
      u,
      d,
      p,
      m,
      l[f] - 0.06,
      l[f - 1] - 0.06,
      l[f] + e.CURB,
      l[f - 1] + e.CURB,
      b,
      c,
      l[f] - 0.06,
    ),
      (c += g));
  }
}
var By = [0.42, 0.075, 0.04, 0.35],
  Cdt = [0.12, 0.12, 0.12, 0.5];
function F0(i, t, e, s, n) {
  let o = e[0] - t[0],
    a = e[1] - t[1],
    r = e[2] - t[2],
    l = Math.hypot(o, a, r);
  if (!(l > 0.001)) return;
  let c = [o / l, a / l, r / l],
    h = Math.abs(c[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    f = [
      c[1] * h[2] - c[2] * h[1],
      c[2] * h[0] - c[0] * h[2],
      c[0] * h[1] - c[1] * h[0],
    ],
    u = Math.hypot(...f);
  ((f[0] /= u), (f[1] /= u), (f[2] /= u));
  let d = [
      c[1] * f[2] - c[2] * f[1],
      c[2] * f[0] - c[0] * f[2],
      c[0] * f[1] - c[1] * f[0],
    ],
    p = [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ].map(([m, g]) => [
      f[0] * m * s + d[0] * g * s,
      f[1] * m * s + d[1] * g * s,
      f[2] * m * s + d[2] * g * s,
    ]);
  for (let m = 0; m < 4; m++) {
    let g = p[m],
      b = p[(m + 1) % 4],
      x = [(g[0] + b[0]) / 2, (g[1] + b[1]) / 2, (g[2] + b[2]) / 2],
      v = Math.hypot(...x);
    i.quad(
      [t[0] + g[0], t[1] + g[1], t[2] + g[2]],
      [e[0] + g[0], e[1] + g[1], e[2] + g[2]],
      [e[0] + b[0], e[1] + b[1], e[2] + b[2]],
      [t[0] + b[0], t[1] + b[1], t[2] + b[2]],
      [0, 0],
      [l, 0],
      [l, 1],
      [0, 1],
      n,
      [x[0] / v, x[1] / v, x[2] / v],
    );
  }
}
function Ldt(i, t, e) {
  for (let s of [-1, 1])
    for (let n = 0; n + 1 < e.length; n++) {
      let [o, a, r, l, c, h, f] = e[n],
        [u, d, p, m, g, b, x] = e[n + 1],
        v = [a + c * (f + 0.2) * s, l + 1.32, r + h * (f + 0.2) * s],
        y = [d + g * (x + 0.2) * s, m + 1.32, p + b * (x + 0.2) * s];
      (F0(i, v, y, 0.05, By),
        F0(i, [v[0], v[1] - 0.25, v[2]], [y[0], y[1] - 0.25, y[2]], 0.025, By));
      for (let M = Math.ceil(o / 2.5) * 2.5; M < u; M += 2.5) {
        let S = (M - o) / Math.max(0.001, u - o),
          w = a + (d - a) * S + c * f * s,
          z = r + (p - r) * S + h * f * s,
          _ = l + (m - l) * S;
        F0(
          i,
          [w + c * 0.2 * s, _ + 0.85, z + h * 0.2 * s],
          [w + c * 0.2 * s, _ + 1.34, z + h * 0.2 * s],
          0.035,
          By,
        );
      }
      for (
        let M = Math.ceil((o + (s > 0 ? 21 : 0)) / 42) * 42 - (s > 0 ? 21 : 0);
        M < u;
        M += 42
      ) {
        let S = (M - o) / Math.max(0.001, u - o),
          w = c,
          z = h,
          _ = f + (x - f) * S + 0.45,
          R = a + (d - a) * S + w * _ * s,
          T = r + (p - r) * S + z * _ * s,
          E = l + (m - l) * S,
          A = [R, E + 0.85, T],
          C = [R, E + 8, T];
        (F0(i, A, C, 0.11, By), (A = C));
        for (let I = 1; I <= 6; I++) {
          let L = ((Math.PI / 2) * I) / 6,
            F = 2.2,
            N = [
              R - w * s * F * (1 - Math.cos(L)),
              E + 8 + F * Math.sin(L),
              T - z * s * F * (1 - Math.cos(L)),
            ];
          (F0(i, A, N, 0.09, By), (A = N));
        }
        let P = [A[0] - w * s * 1.1, A[1] - 0.05, A[2] - z * s * 1.1];
        F0(i, A, P, 0.16, Cdt);
      }
    }
}
var Nj = [0.62, 0.48, 0.12, 0.35],
  I0 = (i) => i && i.cls !== "motorway" && i.cls !== "motorway_link",
  Ab = 8,
  oP = 3.6;
function aP(i, t) {
  let e = (n) => (t && n >= 0 ? t.juns[n] : null),
    s = (n) => !!n && n.legs.some(([o]) => o !== i && I0(o));
  return [s(e(i.ja)), s(e(i.jb))];
}
function eV(i, t, e, s, n = 1.5) {
  if (!i?.probe) return !1;
  for (let o of i.probe(t, e).all)
    if (
      !(o.y > s + 1.5 || o.y < s - n) &&
      (o.J ? o.J.legs.some(([a]) => I0(a) && !a.elev) : I0(o.E) && !o.E.elev)
    )
      return !0;
  return !1;
}
var Bj = new WeakMap();
function rP(i, t) {
  if (!t) return !0;
  if (i._nearSt !== void 0) return i._nearSt;
  let e = Bj.get(t);
  if (!e) {
    e = [];
    for (let o of t.edges) {
      if (o.inner || !I0(o)) continue;
      let a = 1e9,
        r = 1e9,
        l = -1e9,
        c = -1e9,
        h = 1e9,
        f = -1e9,
        u = 0;
      for (let d = 0; d < o.n; d++) {
        let p = o.P[d * 3],
          m = o.P[d * 3 + 1],
          g = o.P[d * 3 + 2];
        ((a = Math.min(a, p)),
          (l = Math.max(l, p)),
          (r = Math.min(r, m)),
          (c = Math.max(c, m)),
          (h = Math.min(h, g)),
          (f = Math.max(f, g)),
          (u = Math.max(u, o.W[d])));
      }
      e.push([a - u, r - u, l + u, c + u, h, f]);
    }
    for (let o of t.juns)
      !o.polys.length ||
        !o.legs.some(([a]) => I0(a)) ||
        e.push([o.bb[0], o.bb[1], o.bb[2], o.bb[3], o.y - 0.5, o.y + 0.5]);
    Bj.set(t, e);
  }
  let s = {},
    n = [];
  for (let [o, a] of [
    [i.s0, Math.min(i.s1, i.s0 + 32)],
    [Math.max(i.s0, i.s1 - 32), i.s1],
  ]) {
    let r = 1e9,
      l = 1e9,
      c = -1e9,
      h = -1e9,
      f = 1e9,
      u = -1e9;
    for (let d = o; d <= a + 0.01; d += Math.max(1, (a - o) / 8))
      (Ot(i, Math.min(d, a), s),
        (r = Math.min(r, s.x - s.w - 3)),
        (c = Math.max(c, s.x + s.w + 3)),
        (l = Math.min(l, s.z - s.w - 3)),
        (h = Math.max(h, s.z + s.w + 3)),
        (f = Math.min(f, s.y)),
        (u = Math.max(u, s.y)));
    n.push([r, l, c, h, f - oP - 0.5, u + 2]);
  }
  return (
    (i._nearSt = e.some((o) =>
      n.some(
        (a) =>
          o[0] < a[2] &&
          o[2] > a[0] &&
          o[1] < a[3] &&
          o[3] > a[1] &&
          o[4] < a[5] &&
          o[5] > a[4],
      ),
    )),
    i._nearSt
  );
}
function lP(i, t, e, s, n = null, o = null, a = !1, r = []) {
  let l = $g(i, t, e),
    c = {};
  for (let f of [s[0] ? i.s0 + Ab : null, s[1] ? i.s1 - Ab : null, ...r]) {
    if (f === null || f <= t + 0.05 || f >= e - 0.05) continue;
    let u = l.findIndex((d) => d[0] > f);
    u <= 0 ||
      (Ot(i, f, c), l.splice(u, 0, [f, c.x, c.z, c.y, c.nx, c.nz, c.w]));
  }
  if (!a || !n?.probe) return l;
  let h = [l[0]];
  for (let f = 0; f + 1 < l.length; f++) {
    let u = l[f],
      d = l[f + 1],
      p = d[0] - u[0];
    if (p > 2.5 && (u[0] - i.s0 < 30 || i.s1 - d[0] < 30) && rP(i, o)) {
      let m = Math.ceil(p / 2),
        g = !1;
      for (let b = 0; b <= m && !g; b++) {
        Ot(i, u[0] + (p * b) / m, c);
        for (let x of [-1, 1])
          if (
            eV(
              n,
              c.x + c.nx * (c.w + 0.25) * x,
              c.z + c.nz * (c.w + 0.25) * x,
              c.y,
              i.elev ? oP : 1.5,
            )
          ) {
            g = !0;
            break;
          }
      }
      if (g)
        for (let b = 1; b < m; b++) {
          let x = u[0] + (p * b) / m;
          (Ot(i, x, c), h.push([x, c.x, c.z, c.y, c.nx, c.nz, c.w]));
        }
    }
    h.push(d);
  }
  return h;
}
var Oj = 4;
