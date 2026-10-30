// app 173 — math
// Lines 102631-102958 of readable/app.pretty.js (statement-aligned).
function r0(o, t, e, s, n) {
  let i = $C(e, t),
    a = Math.hypot(...i) || 1e-6,
    r = i.map((p) => p / a),
    l = Math.abs(r[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    c = XC(r, l),
    h = Math.hypot(...c);
  c = c.map((p) => (p / h) * s);
  let f = XC(r, c).map((p) => p),
    u = (p, m, g) => [
      g[0] + c[0] * p + f[0] * m,
      g[1] + c[1] * p + f[1] * m,
      g[2] + c[2] * p + f[2] * m,
    ],
    d = [
      [1, 1, 1, -1],
      [1, -1, -1, -1],
      [-1, -1, -1, 1],
      [-1, 1, 1, 1],
    ];
  for (let [p, m, g, b] of d) {
    let v = [
      c[0] * (p + g) + f[0] * (m + b),
      c[1] * (p + g) + f[1] * (m + b),
      c[2] * (p + g) + f[2] * (m + b),
    ];
    _o(
      o,
      u(p, m, t),
      u(g, b, t),
      u(g, b, e),
      u(p, m, e),
      [
        [0, 0],
        [s * 2, 0],
        [s * 2, a],
        [0, a],
      ],
      n,
      v,
    );
  }
}
function bX(o, t, e, s) {
  let n = Math.hypot(e - o, s - t) || 1e-6,
    i = (e - o) / n,
    a = (s - t) / n,
    r = -a,
    l = i;
  return {
    l: n,
    dx: i,
    dz: a,
    nx: r,
    nz: l,
    P: (h, f, u) => [o + i * h + r * u, f, t + a * h + l * u],
    N: [r, 0, l],
    D: [i, 0, a],
  };
}
function hz(o, t, e, s, n) {
  if (o.gy && o.gy(t) > Math.max(o.gF + 0.25, e - s)) return !1;
  if (o.solid && n > 0) {
    let i = o.E;
    for (let r of [0.35, 0.6, 1]) {
      let l = i.P(t, e, n * r);
      if (o.solid(l[0], l[2], e)) return !1;
    }
    let a = i.P(t, e, -0.3);
    if (o.solid(a[0], a[2], e)) return !1;
  }
  return !0;
}
function Mx(o, t, e, s, n = 2.1, i = 0) {
  if (!o.gy && !o.solid) return [t, e];
  let a = Math.max(1, Math.ceil((e - t) / 0.5)),
    r = null,
    l = -1;
  for (let c = 0; c <= a + 1; c++) {
    let h = t + ((e - t) * Math.min(c, a)) / a,
      f = c <= a && hz(o, h, s, n, i);
    if (f && l < 0) l = h;
    else if (!f && l >= 0) {
      let u = t + ((e - t) * (c - 1)) / a;
      ((!r || u - l > r[1] - r[0]) && (r = [l, u]), (l = -1));
    }
  }
  if (r) {
    let c = (e - t) / a,
      h = (f, u) => {
        let d = f,
          p = u;
        for (let m = 0; m < 6; m++) {
          let g = (d + p) / 2;
          hz(o, g, s, n, i) ? (d = g) : (p = g);
        }
        return p;
      };
    if (
      (r[0] > t + 1e-6 && (r[0] = Math.min(r[1], h(r[0], r[0] - c) + 0.32)),
      r[1] < e - 1e-6 && (r[1] = Math.max(r[0], h(r[1], r[1] + c) - 0.32)),
      r[1] - r[0] < 0.05)
    )
      return null;
  }
  return r;
}
var Fp = (o, t, e, s = 2.1, n = 0) => hz(o, t, e, s, n);
function Ym(o, t, e, s, n) {
  if (!o.solid) return [t, e];
  let i = o.E,
    a = (r) =>
      [0.06, 0.5 * n].some((l) => {
        let c = i.P(r, s, l);
        return o.solid(c[0], c[2], s);
      });
  return (
    t < n + 0.05 && a(-0.25) && (t = n + 0.05),
    e > i.l - n - 0.05 && a(i.l + 0.25) && (e = i.l - n - 0.05),
    [t, e]
  );
}
function ol(o, t, e, s, n, i, a, r, l, c = !1, h = !0) {
  let f = t.P,
    u = [0, 1, 0],
    d = [0, -1, 0],
    p = t.D,
    m = [-p[0], 0, -p[2]],
    g = t.N,
    b = [-g[0], 0, -g[2]],
    v = (x, y) => [
      [0, 0],
      [x, 0],
      [x, y],
      [0, y],
    ];
  (_o(o, f(e, n, r), f(s, n, r), f(s, i, r), f(e, i, r), v(s - e, i - n), l, g),
    _o(
      o,
      f(e, i, a),
      f(s, i, a),
      f(s, i, r),
      f(e, i, r),
      v(s - e, r - a),
      l,
      u,
    ),
    h &&
      _o(
        o,
        f(e, n, a),
        f(s, n, a),
        f(s, n, r),
        f(e, n, r),
        v(s - e, r - a),
        l,
        d,
      ),
    _o(
      o,
      f(e, n, a),
      f(e, n, r),
      f(e, i, r),
      f(e, i, a),
      v(r - a, i - n),
      l,
      m,
    ),
    _o(
      o,
      f(s, n, a),
      f(s, n, r),
      f(s, i, r),
      f(s, i, a),
      v(r - a, i - n),
      l,
      p,
    ),
    c &&
      _o(
        o,
        f(e, n, a),
        f(s, n, a),
        f(s, i, a),
        f(e, i, a),
        v(s - e, i - n),
        l,
        b,
      ));
}
function Xm(o, t, e) {
  let s = [],
    { uA: n, uB: i, u0: a, nm: r, mirror: l, E: c } = o,
    h = c.l / (i - n);
  l && ([t, e] = [1 - e, 1 - t]);
  for (let f = Math.floor(n - a); f < r; f++) {
    let u = a + f + t,
      d = a + f + e;
    if (!(d < n - 0.001)) {
      if (u > i + 0.001) break;
      u < n - 0.02 ||
        d > i + 0.02 ||
        s.push([Math.max(0, (u - n) * h), Math.min(c.l, (d - n) * h), f]);
    }
  }
  return s;
}
function _f(o, t) {
  let e = [];
  for (let [s, n, i, a] of o.secs)
    if (t >= i - 1e-4 && t <= a + 1e-4 && a > i) {
      let r = s + ((t - i) / (a - i)) * (n - s);
      e.some((l) => Math.abs(l - r) < 0.3) || e.push(r);
    }
  return e;
}
function Sx(o, t, e) {
  let s = [];
  for (let [n, i, a, r] of o.secs) {
    if (r <= a) continue;
    let l = Math.max(t, a),
      c = Math.min(e, r);
    if (c - l < 0.001) continue;
    let h = (f) => n + ((f - a) / (r - a)) * (i - n);
    s.push([h(l), h(c), l, c, t >= a - 1e-4, e <= r + 1e-4, (i - n) / (r - a)]);
  }
  return s;
}
var Ip = (o, t, e, s) => {
    let n = o.uA + (t / o.E.l) * (o.uB - o.uA);
    return [
      o.mirror ? 2 * o.u0 + o.nm - 1e-4 - n : n,
      s[2] + ((e - s[0]) / Math.max(1e-4, s[1] - s[0])) * (s[3] - s[2]),
    ];
  },
  kx = (o, t) => !(o.slot < 2 * t + 0.05);
function KC(o, t, e, s, n, i) {
  let a = o.g("dress"),
    r = o.E,
    l = n - s;
  if (!kx(o, Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)))) return;
  {
    let M = Mx(
      o,
      t,
      e,
      n - Math.min(l * 0.72, 0.85) - 0.28,
      2.1,
      2 * Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)) + 0.3,
    );
    if (
      !M ||
      M[1] - M[0] < 0.6 ||
      (([t, e] = Ym(
        o,
        M[0],
        M[1],
        n - 0.1,
        Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)),
      )),
      e - t < 0.6)
    )
      return;
  }
  let c = Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)),
    h = Math.min(l * 0.72, 0.85, c * 0.62),
    f = Math.min(0.28, Math.max(0.16, l * 0.25)),
    u = Mo(i.lc || [0.3, 0.05, 0.05], oo.CANVAS, E2t(i.lc2)),
    d = e - t;
  if (d < 0.6) return;
  let p = Math.max(2, Math.round(d / 1.8) + 1),
    m = Math.max(2, Math.round(d / 0.9)),
    g = (M, S) => {
      let w = ((M - t) / d) * (p - 1);
      return (
        -0.045 * Math.sin(Math.PI * (w - Math.floor(w))) * S -
        0.035 * Math.sin(Math.PI * S)
      );
    },
    b = (M, S) => n - h * S + g(M, S),
    v = Math.hypot(c, h);
  for (let M = 0; M < m; M++)
    for (let S = 0; S < 1; S++) {
      let w = t + (d * M) / m,
        _ = t + (d * (M + 1)) / m,
        z = 0,
        A = 1,
        T = r.P(w, b(w, z), 0.02 + c * z),
        E = r.P(_, b(_, z), 0.02 + c * z),
        R = r.P(_, b(_, A), 0.02 + c * A),
        P = r.P(w, b(w, A), 0.02 + c * A),
        C = [
          [w, v * z],
          [_, v * z],
          [_, v * A],
          [w, v * A],
        ],
        I = [r.nx * h, c, r.nz * h];
      (_o(a, T, E, R, P, C, u, I),
        _o(a, T, E, R, P, C, u, [-I[0], -I[1], -I[2]]));
    }
  let x = n - h;
  for (let M = 0; M < m; M++) {
    let S = t + (d * M) / m,
      w = t + (d * (M + 1)) / m;
    Km(
      a,
      r.P(S, x - f + g(S, 1) * 0.3, 0.02 + c),
      r.P(w, x - f + g(w, 1) * 0.3, 0.02 + c),
      r.P(w, b(w, 1), 0.02 + c),
      r.P(S, b(S, 1), 0.02 + c),
      [
        [S, v + f],
        [w, v + f],
        [w, v],
        [S, v],
      ],
      u,
      r.N,
    );
  }
  let y = Mo(cz, oo.STEEL);
  for (let M = 0; M < p; M++) {
    let S = t + 0.05 + ((d - 0.1) * M) / (p - 1);
    r0(a, r.P(S, n - h - 0.25, 0), r.P(S, x - 0.02, c), 0.018, y);
  }
  r0(a, r.P(t, x - 0.02, c - 0.02), r.P(e, x - 0.02, c - 0.02), 0.02, y);
}
