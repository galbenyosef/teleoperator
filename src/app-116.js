// app 116 — math
// Lines 83901-84243 of readable/app.pretty.js (statement-aligned).
function $P(o) {
  if (gw) return gw;
  let t = new ko(),
    e = (a) => {
      let r =
        typeof document > "u"
          ? new ai()
          : t.load(`assets/tex/lm/skyline/${a}.webp`, void 0, void 0, () =>
              console.warn("skyline texture missing", a),
            );
      return (
        (r.colorSpace = Je),
        (r.flipY = !1),
        (r.anisotropy = 8),
        (r.wrapS = r.wrapT = oi),
        r
      );
    },
    s = e("tiles"),
    n = e("elev"),
    i = (a, r = $a) => {
      let l = new me({
        color: 16777215,
        roughness: 0.8,
        metalness: 0,
        vertexColors: !0,
        map: s,
        side: r,
      });
      return (
        (l.userData.mbAlbedo = S1t(a)),
        (l.userData.mbExtraMap = n),
        (l.userData.dayGlow = 0),
        (l.userData.mbLandmarkFallback = a),
        a && (l.fog = !1),
        o.night.push(l),
        l
      );
    };
  return (
    (gw = {
      lm: i(0),
      far: i(0.3),
      mid: i(0.55),
      midDS: i(0.55, ls),
      ds: i(0, ls),
    }),
    gw
  );
}
function XP() {
  gw = null;
}
function bf(o, t, e, s, n = !1, i = !1) {
  let a = t.length,
    r = t[0].length,
    l = n ? r + 1 : r,
    c = (u, d) =>
      t[Math.min(a - 1, Math.max(0, u))][
        n ? ((d % r) + r) % r : Math.min(r - 1, Math.max(0, d))
      ],
    h = typeof e == "function" ? e : () => e;
  if (i) {
    for (let u = 0; u + 1 < a; u++)
      for (let d = 0; d + 1 < l; d++) {
        let p = c(u, d),
          m = c(u, d + 1),
          g = c(u + 1, d + 1),
          b = c(u + 1, d);
        o.quad(
          p,
          m,
          g,
          b,
          s(u, d),
          s(u, d + 1),
          s(u + 1, d + 1),
          s(u + 1, d),
          h(u, d),
        );
      }
    return;
  }
  let f = o.v;
  for (let u = 0; u < a; u++)
    for (let d = 0; d < l; d++) {
      let p = c(u, d),
        m = c(u, d - 1),
        g = c(u, d + 1),
        b = c(u - 1, d),
        v = c(u + 1, d),
        x = [g[0] - m[0], g[1] - m[1], g[2] - m[2]],
        y = [v[0] - b[0], v[1] - b[1], v[2] - b[2]],
        M = x[1] * y[2] - x[2] * y[1],
        S = x[2] * y[0] - x[0] * y[2],
        w = x[0] * y[1] - x[1] * y[0],
        _ = Math.hypot(M, S, w) || 1,
        z = s(u, d);
      o.vert(p[0], p[1], p[2], M / _, S / _, w / _, z[0], z[1], h(u, d));
    }
  for (let u = 0; u + 1 < a; u++)
    for (let d = 0; d + 1 < l; d++) {
      let p = f + u * l + d,
        m = p + 1,
        g = p + l + 1,
        b = p + l;
      (o.tri(p, m, g), o.tri(p, g, b));
    }
}
function lj(o, t, e, s, n) {
  let i = [];
  for (let a = 0; a < s; a++) {
    let r = -(a / s) * Math.PI * 2,
      l = typeof n == "function" ? n(r, a) : n;
    i.push([o + Math.cos(r) * l, t, e + Math.sin(r) * l]);
  }
  return i;
}
function qe(
  o,
  t,
  e,
  s,
  n,
  i,
  { rf: a = null, uScale: r = 1, flat: l = !1, v0: c = 0 } = {},
) {
  let h = s.map(([d, p]) => lj(t, p, e, n, a ? (m, g) => a(d, m, g, p) : d)),
    f = [0];
  for (let d = 1; d < s.length; d++)
    f.push(f[d - 1] + Math.hypot(s[d][0] - s[d - 1][0], s[d][1] - s[d - 1][1]));
  let u = (d) => 2 * Math.PI * Math.max(s[d][0], 0.05);
  bf(o, h, i, (d, p) => [(p / n) * u(d) * r, c + f[d]], !0, l);
}
function fc(o, t, e, s, n, i, a, r = !1) {
  let l = lj(t, e, s, i, n),
    c = o.vert(t, e, s, 0, r ? -1 : 1, 0, t, s, a),
    h = l.map((f) => o.vert(f[0], f[1], f[2], 0, r ? -1 : 1, 0, f[0], f[2], a));
  for (let f = 0; f < i; f++) {
    let u = h[f],
      d = h[(f + 1) % i];
    r ? o.tri(c, d, u) : o.tri(c, u, d);
  }
}
function Ss(
  o,
  t,
  e,
  s,
  n,
  { vBase: i = 0, cap: a = !1, capCol: r = null, keep: l = null } = {},
) {
  let c = 0;
  for (let p = 0; p < t.length; p++) {
    let m = t[p],
      g = t[(p + 1) % t.length];
    c += m[0] * g[1] - g[0] * m[1];
  }
  let h = c > 0 ? t.slice().reverse() : t,
    f = typeof e == "function" ? e : () => e,
    u = typeof s == "function" ? s : () => s,
    d = 0;
  for (let p = 0; p < h.length; p++) {
    let m = h[p],
      g = h[(p + 1) % h.length],
      b = Math.hypot(g[0] - m[0], g[1] - m[1]);
    if (l && !l(m, g)) {
      d += b;
      continue;
    }
    (o.wall(
      m[0],
      m[1],
      g[0],
      g[1],
      f(m[0], m[1]),
      f(g[0], g[1]),
      u(m[0], m[1]),
      u(g[0], g[1]),
      n,
      d,
      i,
    ),
      (d += b));
  }
  a && Ta(o, h, typeof s == "function" ? null : s, r || n, u);
}
function Ta(o, t, e, s, n = null) {
  let i = t.reduce((f, u) => f + u[0], 0) / t.length,
    a = t.reduce((f, u) => f + u[1], 0) / t.length,
    r = (f, u) => e ?? n(f, u),
    l = o.vert(i, r(i, a), a, 0, 1, 0, i, a, s),
    c = t.map((f) => o.vert(f[0], r(f[0], f[1]), f[1], 0, 1, 0, f[0], f[1], s)),
    h = 0;
  for (let f = 0; f < t.length; f++) {
    let u = t[f],
      d = t[(f + 1) % t.length];
    h += u[0] * d[1] - d[0] * u[1];
  }
  for (let f = 0; f < t.length; f++) {
    let u = c[f],
      d = c[(f + 1) % t.length];
    h < 0 ? o.tri(l, u, d) : o.tri(l, d, u);
  }
}
function ss(o, t, e, s, n, i, a, r) {
  let l = Math.floor((r[3] * 256) / 16),
    c = Math.abs((n - t) * (a - s)) > 60,
    h =
      l === ln.HOTEL ||
      l === ln.OFFICE ||
      l === ln.WIN ||
      l === ln.SFT ||
      l === ln.BAYS ||
      (c && (l === ln.TILE || l === ln.FLOOD || l === ln.TAPY));
  (o.box(t, s, n, a, e, i, r, h ? { uTop: Lt(Ct.stone, 0.3, 0.3, 0.29) } : {}),
    o.quad(
      [t, e, s],
      [n, e, s],
      [n, e, a],
      [t, e, a],
      [t, s],
      [n, s],
      [n, a],
      [t, a],
      r,
      [0, -1, 0],
    ));
}
function Ce(o, t, e, s, n, i = 4, a = !1) {
  let r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
    l = Math.hypot(...r);
  if (l < 1e-4) return;
  ((r[0] /= l), (r[1] /= l), (r[2] /= l));
  let c = Math.abs(r[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0],
    h = [
      r[1] * c[2] - r[2] * c[1],
      r[2] * c[0] - r[0] * c[2],
      r[0] * c[1] - r[1] * c[0],
    ],
    f = Math.hypot(...h);
  h = h.map((m) => m / f);
  let u = [
      r[1] * h[2] - r[2] * h[1],
      r[2] * h[0] - r[0] * h[2],
      r[0] * h[1] - r[1] * h[0],
    ],
    d = o.v,
    p = typeof s == "number" ? [s, s] : s;
  for (let m = 0; m < 2; m++)
    for (let g = 0; g <= i; g++) {
      let b = (g / i) * Math.PI * 2 + Math.PI / i,
        v = Math.cos(b),
        x = Math.sin(b),
        y = p[m],
        M = h[0] * v + u[0] * x,
        S = h[1] * v + u[1] * x,
        w = h[2] * v + u[2] * x,
        _ = m ? e : t;
      o.vert(
        _[0] + M * y,
        _[1] + S * y,
        _[2] + w * y,
        M,
        S,
        w,
        m * l,
        (g / i) * 2 * Math.PI * y,
        n,
      );
    }
  for (let m = 0; m < i; m++) {
    let g = d + m,
      b = d + m + 1,
      v = d + i + 1 + m,
      x = v + 1;
    (o.tri(g, x, v), o.tri(g, b, x));
  }
  if (a)
    for (let m of [0, 1]) {
      let g = m ? e : t,
        b = m ? 1 : -1,
        v = o.vert(g[0], g[1], g[2], r[0] * b, r[1] * b, r[2] * b, 0, 0, n);
      for (let x = 0; x < i; x++) {
        let y = d + m * (i + 1) + x,
          M = y + 1;
        m ? o.tri(v, y, M) : o.tri(v, M, y);
      }
    }
}
function cj(o, t, e, s, n, i = 0, a = 1) {
  let r = Math.cos(i),
    l = Math.sin(i),
    c = t.p.a,
    h = t.nm.a,
    f = t.uv.a,
    u = t.c.a,
    d = o.v;
  for (let m = 0; m < t.v; m++) {
    let g = c[m * 3] * a,
      b = c[m * 3 + 1] * a,
      v = c[m * 3 + 2] * a,
      x = h[m * 3],
      y = h[m * 3 + 1],
      M = h[m * 3 + 2];
    o.vert(
      e + g * r + v * l,
      s + b,
      n - g * l + v * r,
      x * r + M * l,
      y,
      -x * l + M * r,
      f[m * 2],
      f[m * 2 + 1],
      [u[m * 4], u[m * 4 + 1], u[m * 4 + 2], u[m * 4 + 3]],
    );
  }
  let p = t.ix.a;
  for (let m = 0; m < t.ix.n; m += 3)
    o.tri(d + p[m], d + p[m + 1], d + p[m + 2]);
}
var Yb = !1;
function KP(o) {
  Yb = o;
}
var hj = () => (Yb ? 0.25 : 0);
function _l(o, t, e, s, n, i, a, r) {
  let l = Yb ? (u, d) => a(u, d) + 0.25 : a;
  Yb && (i = Math.min(i, 2));
  let c = Math.max(1, Math.ceil((s - t) / i)),
    h = Math.max(1, Math.ceil((n - e) / i)),
    f = [];
  for (let u = 0; u <= h; u++) {
    let d = [];
    for (let p = 0; p <= c; p++) {
      let m = t + ((s - t) * p) / c,
        g = n - ((n - e) * u) / h;
      d.push([m, l(m, g), g]);
    }
    f.push(d);
  }
  bf(o, f, r, (u, d) => [f[u][d][0], f[u][d][2]]);
}
