// app 174 — math
// Lines 102395-102722 of readable/app.pretty.js (statement-aligned).
function qr(i, t, e, s, n) {
  let o = gP(e, t),
    a = Math.hypot(...o) || 1e-6,
    r = o.map((p) => p / a),
    l = Math.abs(r[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    c = bP(r, l),
    h = Math.hypot(...c);
  c = c.map((p) => (p / h) * s);
  let f = bP(r, c).map((p) => p),
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
    let x = [
      c[0] * (p + g) + f[0] * (m + b),
      c[1] * (p + g) + f[1] * (m + b),
      c[2] * (p + g) + f[2] * (m + b),
    ];
    xo(
      i,
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
      x,
    );
  }
}
function pV(i, t, e, s) {
  let n = Math.hypot(e - i, s - t) || 1e-6,
    o = (e - i) / n,
    a = (s - t) / n,
    r = -a,
    l = o;
  return {
    l: n,
    dx: o,
    dz: a,
    nx: r,
    nz: l,
    P: (h, f, u) => [i + o * h + r * u, f, t + a * h + l * u],
    N: [r, 0, l],
    D: [o, 0, a],
  };
}
function hk(i, t, e, s, n) {
  if (i.gy && i.gy(t) > Math.max(i.gF + 0.25, e - s)) return !1;
  if (i.solid && n > 0) {
    let o = i.E;
    for (let r of [0.35, 0.6, 1]) {
      let l = o.P(t, e, n * r);
      if (i.solid(l[0], l[2], e)) return !1;
    }
    let a = o.P(t, e, -0.3);
    if (i.solid(a[0], a[2], e)) return !1;
  }
  return !0;
}
function Nb(i, t, e, s, n = 2.1, o = 0) {
  if (!i.gy && !i.solid) return [t, e];
  let a = Math.max(1, Math.ceil((e - t) / 0.5)),
    r = null,
    l = -1;
  for (let c = 0; c <= a + 1; c++) {
    let h = t + ((e - t) * Math.min(c, a)) / a,
      f = c <= a && hk(i, h, s, n, o);
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
          hk(i, g, s, n, o) ? (d = g) : (p = g);
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
var np = (i, t, e, s = 2.1, n = 0) => hk(i, t, e, s, n);
function rm(i, t, e, s, n) {
  if (!i.solid) return [t, e];
  let o = i.E,
    a = (r) =>
      [0.06, 0.5 * n].some((l) => {
        let c = o.P(r, s, l);
        return i.solid(c[0], c[2], s);
      });
  return (
    t < n + 0.05 && a(-0.25) && (t = n + 0.05),
    e > o.l - n - 0.05 && a(o.l + 0.25) && (e = o.l - n - 0.05),
    [t, e]
  );
}
function N0(i, t, e, s, n, o, a, r, l, c = !1, h = !0) {
  let f = t.P,
    u = [0, 1, 0],
    d = [0, -1, 0],
    p = t.D,
    m = [-p[0], 0, -p[2]],
    g = t.N,
    b = [-g[0], 0, -g[2]],
    x = (v, y) => [
      [0, 0],
      [v, 0],
      [v, y],
      [0, y],
    ];
  (xo(i, f(e, n, r), f(s, n, r), f(s, o, r), f(e, o, r), x(s - e, o - n), l, g),
    xo(
      i,
      f(e, o, a),
      f(s, o, a),
      f(s, o, r),
      f(e, o, r),
      x(s - e, r - a),
      l,
      u,
    ),
    h &&
      xo(
        i,
        f(e, n, a),
        f(s, n, a),
        f(s, n, r),
        f(e, n, r),
        x(s - e, r - a),
        l,
        d,
      ),
    xo(
      i,
      f(e, n, a),
      f(e, n, r),
      f(e, o, r),
      f(e, o, a),
      x(r - a, o - n),
      l,
      m,
    ),
    xo(
      i,
      f(s, n, a),
      f(s, n, r),
      f(s, o, r),
      f(s, o, a),
      x(r - a, o - n),
      l,
      p,
    ),
    c &&
      xo(
        i,
        f(e, n, a),
        f(s, n, a),
        f(s, o, a),
        f(e, o, a),
        x(s - e, o - n),
        l,
        b,
      ));
}
function om(i, t, e) {
  let s = [],
    { uA: n, uB: o, u0: a, nm: r, mirror: l, E: c } = i,
    h = c.l / (o - n);
  l && ([t, e] = [1 - e, 1 - t]);
  for (let f = Math.floor(n - a); f < r; f++) {
    let u = a + f + t,
      d = a + f + e;
    if (!(d < n - 0.001)) {
      if (u > o + 0.001) break;
      u < n - 0.02 ||
        d > o + 0.02 ||
        s.push([Math.max(0, (u - n) * h), Math.min(c.l, (d - n) * h), f]);
    }
  }
  return s;
}
function Xh(i, t) {
  let e = [];
  for (let [s, n, o, a] of i.secs)
    if (t >= o - 1e-4 && t <= a + 1e-4 && a > o) {
      let r = s + ((t - o) / (a - o)) * (n - s);
      e.some((l) => Math.abs(l - r) < 0.3) || e.push(r);
    }
  return e;
}
function Bb(i, t, e) {
  let s = [];
  for (let [n, o, a, r] of i.secs) {
    if (r <= a) continue;
    let l = Math.max(t, a),
      c = Math.min(e, r);
    if (c - l < 0.001) continue;
    let h = (f) => n + ((f - a) / (r - a)) * (o - n);
    s.push([h(l), h(c), l, c, t >= a - 1e-4, e <= r + 1e-4, (o - n) / (r - a)]);
  }
  return s;
}
var sp = (i, t, e, s) => {
    let n = i.uA + (t / i.E.l) * (i.uB - i.uA);
    return [
      i.mirror ? 2 * i.u0 + i.nm - 1e-4 - n : n,
      s[2] + ((e - s[0]) / Math.max(1e-4, s[1] - s[0])) * (s[3] - s[2]),
    ];
  },
  Ob = (i, t) => !(i.slot < 2 * t + 0.05);
function xP(i, t, e, s, n, o) {
  let a = i.g("dress"),
    r = i.E,
    l = n - s;
  if (!Ob(i, Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)))) return;
  {
    let M = Nb(
      i,
      t,
      e,
      n - Math.min(l * 0.72, 0.85) - 0.28,
      2.1,
      2 * Math.min(1.5, Math.max(0.9, 0.7 + l * 0.8)) + 0.3,
    );
    if (
      !M ||
      M[1] - M[0] < 0.6 ||
      (([t, e] = rm(
        i,
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
    u = co(o.lc || [0.3, 0.05, 0.05], Yi.CANVAS, npt(o.lc2)),
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
    x = Math.hypot(c, h);
  for (let M = 0; M < m; M++)
    for (let S = 0; S < 1; S++) {
      let w = t + (d * M) / m,
        z = t + (d * (M + 1)) / m,
        _ = 0,
        R = 1,
        T = r.P(w, b(w, _), 0.02 + c * _),
        E = r.P(z, b(z, _), 0.02 + c * _),
        A = r.P(z, b(z, R), 0.02 + c * R),
        C = r.P(w, b(w, R), 0.02 + c * R),
        P = [
          [w, x * _],
          [z, x * _],
          [z, x * R],
          [w, x * R],
        ],
        I = [r.nx * h, c, r.nz * h];
      (xo(a, T, E, A, C, P, u, I),
        xo(a, T, E, A, C, P, u, [-I[0], -I[1], -I[2]]));
    }
  let v = n - h;
  for (let M = 0; M < m; M++) {
    let S = t + (d * M) / m,
      w = t + (d * (M + 1)) / m;
    am(
      a,
      r.P(S, v - f + g(S, 1) * 0.3, 0.02 + c),
      r.P(w, v - f + g(w, 1) * 0.3, 0.02 + c),
      r.P(w, b(w, 1), 0.02 + c),
      r.P(S, b(S, 1), 0.02 + c),
      [
        [S, x + f],
        [w, x + f],
        [w, x],
        [S, x],
      ],
      u,
      r.N,
    );
  }
  let y = co(ck, Yi.STEEL);
  for (let M = 0; M < p; M++) {
    let S = t + 0.05 + ((d - 0.1) * M) / (p - 1);
    qr(a, r.P(S, n - h - 0.25, 0), r.P(S, v - 0.02, c), 0.018, y);
  }
  qr(a, r.P(t, v - 0.02, c - 0.02), r.P(e, v - 0.02, c - 0.02), 0.02, y);
}
