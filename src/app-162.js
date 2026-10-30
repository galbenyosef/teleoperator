// app 162 — math
// Lines 98470-98808 of readable/app.pretty.js (statement-aligned).
function e2t(o, t, e, s) {
  let n = null;
  if (
    (s.E &&
      (ys(s.E, t, e, s.q),
      Math.abs(s.q.d - s.q.w) < 1.5 &&
        s.q.s > 0 &&
        s.q.s < s.E.L &&
        (n = { E: s.E, s: s.q.s, v: s.q.v })),
    n || ((n = o.roadAt(t, e, 4, void 0, !0)), (s.E = n?.E || null)),
    !n || !n.E || n.E.hwy || n.E.elev || n.E.custom)
  )
    return AC;
  let i = n.E;
  if (n.s < i.s0 + 6 || n.s > i.s1 - 6) return hx.r;
  let a = Math.floor(n.s / 11),
    r = n.v > 0 ? 1 : 0,
    l = t2t(i.P[0] * 0.37 + a * 1.7 + r * 9.1, i.P[1] * 0.29 - a * 0.3),
    c = Qmt.has(i.dist) || (i.rank ?? 0) >= 6;
  return l < (c ? 0.05 : 0.03)
    ? hx.r
    : l < (c ? 0.2 : 0.06)
      ? hx.y
      : l < (c ? 0.25 : 0.075)
        ? hx.w
        : l < (c ? 0.3 : 0.1)
          ? hx.g
          : l < (c ? 0.32 : 0.115)
            ? hx.b
            : AC;
}
function nX(o, t, e, s = !0, n = null, i = null) {
  let a = t.ys ? t : Omt(t, 2.5, !1),
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
      i &&
      n?.length &&
      n.some(
        (v) => u > v._bb[0] && u < v._bb[2] && d > v._bb[1] && d < v._bb[3],
      ) &&
      Pp(
        i,
        (u + p) / 2 + ((m - d) / g) * 0.6,
        (d + m) / 2 - ((p - u) / g) * 0.6,
      ) &&
      Pp(
        i,
        (u + p) / 2 - ((m - d) / g) * 0.6,
        (d + m) / 2 + ((p - u) / g) * 0.6,
      )
    ) {
      c += g;
      continue;
    }
    let b =
      s && e.roadAt && g > 0.05
        ? e2t(
            e,
            (u + p) / 2 - ((m - d) / g) * 0.6,
            (d + m) / 2 + ((p - u) / g) * 0.6,
            h,
          )
        : AC;
    (o.wall(
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
var Pw = [0.42, 0.075, 0.04, 0.35],
  s2t = [0.12, 0.12, 0.12, 0.5];
function il(o, t, e, s, n) {
  let i = e[0] - t[0],
    a = e[1] - t[1],
    r = e[2] - t[2],
    l = Math.hypot(i, a, r);
  if (!(l > 0.001)) return;
  let c = [i / l, a / l, r / l],
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
      v = [(g[0] + b[0]) / 2, (g[1] + b[1]) / 2, (g[2] + b[2]) / 2],
      x = Math.hypot(...v);
    o.quad(
      [t[0] + g[0], t[1] + g[1], t[2] + g[2]],
      [e[0] + g[0], e[1] + g[1], e[2] + g[2]],
      [e[0] + b[0], e[1] + b[1], e[2] + b[2]],
      [t[0] + b[0], t[1] + b[1], t[2] + b[2]],
      [0, 0],
      [l, 0],
      [l, 1],
      [0, 1],
      n,
      [v[0] / x, v[1] / x, v[2] / x],
    );
  }
}
function n2t(o, t, e) {
  for (let s of [-1, 1])
    for (let n = 0; n + 1 < e.length; n++) {
      let [i, a, r, l, c, h, f] = e[n],
        [u, d, p, m, g, b, v] = e[n + 1],
        x = [a + c * (f + 0.2) * s, l + 1.32, r + h * (f + 0.2) * s],
        y = [d + g * (v + 0.2) * s, m + 1.32, p + b * (v + 0.2) * s];
      (il(o, x, y, 0.05, Pw),
        il(o, [x[0], x[1] - 0.25, x[2]], [y[0], y[1] - 0.25, y[2]], 0.025, Pw));
      for (let M = Math.ceil(i / 2.5) * 2.5; M < u; M += 2.5) {
        let S = (M - i) / Math.max(0.001, u - i),
          w = a + (d - a) * S + c * f * s,
          _ = r + (p - r) * S + h * f * s,
          z = l + (m - l) * S;
        il(
          o,
          [w + c * 0.2 * s, z + 0.85, _ + h * 0.2 * s],
          [w + c * 0.2 * s, z + 1.34, _ + h * 0.2 * s],
          0.035,
          Pw,
        );
      }
      for (
        let M = Math.ceil((i + (s > 0 ? 21 : 0)) / 42) * 42 - (s > 0 ? 21 : 0);
        M < u;
        M += 42
      ) {
        let S = (M - i) / Math.max(0.001, u - i),
          w = c,
          _ = h,
          z = f + (v - f) * S + 0.45,
          A = a + (d - a) * S + w * z * s,
          T = r + (p - r) * S + _ * z * s,
          E = l + (m - l) * S,
          R = [A, E + 0.85, T],
          P = [A, E + 8, T];
        (il(o, R, P, 0.11, Pw), (R = P));
        for (let I = 1; I <= 6; I++) {
          let L = ((Math.PI / 2) * I) / 6,
            F = 2.2,
            O = [
              A - w * s * F * (1 - Math.cos(L)),
              E + 8 + F * Math.sin(L),
              T - _ * s * F * (1 - Math.cos(L)),
            ];
          (il(o, R, O, 0.09, Pw), (R = O));
        }
        let C = [R[0] - w * s * 1.1, R[1] - 0.05, R[2] - _ * s * 1.1];
        il(o, R, C, 0.16, s2t);
      }
    }
}
var H$ = [0.62, 0.48, 0.12, 0.35],
  nl = (o) => o && o.cls !== "motorway" && o.cls !== "motorway_link",
  mx = 8,
  OC = 3.6;
function BC(o, t) {
  let e = (n) => (t && n >= 0 ? t.juns[n] : null),
    s = (n) => !!n && n.legs.some(([i]) => i !== o && nl(i));
  return [s(e(o.ja)), s(e(o.jb))];
}
function iX(o, t, e, s, n = 1.5) {
  if (!o?.probe) return !1;
  for (let i of o.probe(t, e).all)
    if (
      !(i.y > s + 1.5 || i.y < s - n) &&
      (i.J ? i.J.legs.some(([a]) => nl(a) && !a.elev) : nl(i.E) && !i.E.elev)
    )
      return !0;
  return !1;
}
var D$ = new WeakMap();
function NC(o, t) {
  if (!t) return !0;
  if (o._nearSt !== void 0) return o._nearSt;
  let e = D$.get(t);
  if (!e) {
    e = [];
    for (let i of t.edges) {
      if (i.inner || !nl(i)) continue;
      let a = 1e9,
        r = 1e9,
        l = -1e9,
        c = -1e9,
        h = 1e9,
        f = -1e9,
        u = 0;
      for (let d = 0; d < i.n; d++) {
        let p = i.P[d * 3],
          m = i.P[d * 3 + 1],
          g = i.P[d * 3 + 2];
        ((a = Math.min(a, p)),
          (l = Math.max(l, p)),
          (r = Math.min(r, m)),
          (c = Math.max(c, m)),
          (h = Math.min(h, g)),
          (f = Math.max(f, g)),
          (u = Math.max(u, i.W[d])));
      }
      e.push([a - u, r - u, l + u, c + u, h, f]);
    }
    for (let i of t.juns)
      !i.polys.length ||
        !i.legs.some(([a]) => nl(a)) ||
        e.push([i.bb[0], i.bb[1], i.bb[2], i.bb[3], i.y - 0.5, i.y + 0.5]);
    D$.set(t, e);
  }
  let s = {},
    n = [];
  for (let [i, a] of [
    [o.s0, Math.min(o.s1, o.s0 + 32)],
    [Math.max(o.s0, o.s1 - 32), o.s1],
  ]) {
    let r = 1e9,
      l = 1e9,
      c = -1e9,
      h = -1e9,
      f = 1e9,
      u = -1e9;
    for (let d = i; d <= a + 0.01; d += Math.max(1, (a - i) / 8))
      (Ot(o, Math.min(d, a), s),
        (r = Math.min(r, s.x - s.w - 3)),
        (c = Math.max(c, s.x + s.w + 3)),
        (l = Math.min(l, s.z - s.w - 3)),
        (h = Math.max(h, s.z + s.w + 3)),
        (f = Math.min(f, s.y)),
        (u = Math.max(u, s.y)));
    n.push([r, l, c, h, f - OC - 0.5, u + 2]);
  }
  return (
    (o._nearSt = e.some((i) =>
      n.some(
        (a) =>
          i[0] < a[2] &&
          i[2] > a[0] &&
          i[1] < a[3] &&
          i[3] > a[1] &&
          i[4] < a[5] &&
          i[5] > a[4],
      ),
    )),
    o._nearSt
  );
}
function HC(o, t, e, s, n = null, i = null, a = !1, r = []) {
  let l = Ob(o, t, e),
    c = {};
  for (let f of [s[0] ? o.s0 + mx : null, s[1] ? o.s1 - mx : null, ...r]) {
    if (f === null || f <= t + 0.05 || f >= e - 0.05) continue;
    let u = l.findIndex((d) => d[0] > f);
    u <= 0 ||
      (Ot(o, f, c), l.splice(u, 0, [f, c.x, c.z, c.y, c.nx, c.nz, c.w]));
  }
  if (!a || !n?.probe) return l;
  let h = [l[0]];
  for (let f = 0; f + 1 < l.length; f++) {
    let u = l[f],
      d = l[f + 1],
      p = d[0] - u[0];
    if (p > 2.5 && (u[0] - o.s0 < 30 || o.s1 - d[0] < 30) && NC(o, i)) {
      let m = Math.ceil(p / 2),
        g = !1;
      for (let b = 0; b <= m && !g; b++) {
        Ot(o, u[0] + (p * b) / m, c);
        for (let v of [-1, 1])
          if (
            iX(
              n,
              c.x + c.nx * (c.w + 0.25) * v,
              c.z + c.nz * (c.w + 0.25) * v,
              c.y,
              o.elev ? OC : 1.5,
            )
          ) {
            g = !0;
            break;
          }
      }
      if (g)
        for (let b = 1; b < m; b++) {
          let v = u[0] + (p * b) / m;
          (Ot(o, v, c), h.push([v, c.x, c.z, c.y, c.nx, c.nz, c.w]));
        }
    }
    h.push(d);
  }
  return h;
}
var U$ = 4;
