// app 117 — math
// Lines 83663-84005 of readable/app.pretty.js (statement-aligned).
function g7(i) {
  if (My) return My;
  let t = new go(),
    e = (a) => {
      let r =
        typeof document > "u"
          ? new ei()
          : t.load(`assets/tex/lm/skyline/${a}.webp`, void 0, void 0, () =>
              console.warn("skyline texture missing", a),
            );
      return (
        (r.colorSpace = is),
        (r.flipY = !1),
        (r.anisotropy = 8),
        (r.wrapS = r.wrapT = ti),
        r
      );
    },
    s = e("tiles"),
    n = e("elev"),
    o = (a, r = Fa) => {
      let l = new Ee({
        color: 16777215,
        roughness: 0.8,
        metalness: 0,
        vertexColors: !0,
        map: s,
        side: r,
      });
      return (
        (l.userData.mbAlbedo = eut(a)),
        (l.userData.mbExtraMap = n),
        (l.userData.dayGlow = 0),
        (l.userData.mbLandmarkFallback = a),
        a && (l.fog = !1),
        i.night.push(l),
        l
      );
    };
  return (
    (My = {
      lm: o(0),
      far: o(0.3),
      mid: o(0.55),
      midDS: o(0.55, Ss),
      ds: o(0, Ss),
    }),
    My
  );
}
function b7() {
  My = null;
}
function Uh(i, t, e, s, n = !1, o = !1) {
  let a = t.length,
    r = t[0].length,
    l = n ? r + 1 : r,
    c = (u, d) =>
      t[Math.min(a - 1, Math.max(0, u))][
        n ? ((d % r) + r) % r : Math.min(r - 1, Math.max(0, d))
      ],
    h = typeof e == "function" ? e : () => e;
  if (o) {
    for (let u = 0; u + 1 < a; u++)
      for (let d = 0; d + 1 < l; d++) {
        let p = c(u, d),
          m = c(u, d + 1),
          g = c(u + 1, d + 1),
          b = c(u + 1, d);
        i.quad(
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
  let f = i.v;
  for (let u = 0; u < a; u++)
    for (let d = 0; d < l; d++) {
      let p = c(u, d),
        m = c(u, d - 1),
        g = c(u, d + 1),
        b = c(u - 1, d),
        x = c(u + 1, d),
        v = [g[0] - m[0], g[1] - m[1], g[2] - m[2]],
        y = [x[0] - b[0], x[1] - b[1], x[2] - b[2]],
        M = v[1] * y[2] - v[2] * y[1],
        S = v[2] * y[0] - v[0] * y[2],
        w = v[0] * y[1] - v[1] * y[0],
        z = Math.hypot(M, S, w) || 1,
        _ = s(u, d);
      i.vert(p[0], p[1], p[2], M / z, S / z, w / z, _[0], _[1], h(u, d));
    }
  for (let u = 0; u + 1 < a; u++)
    for (let d = 0; d + 1 < l; d++) {
      let p = f + u * l + d,
        m = p + 1,
        g = p + l + 1,
        b = p + l;
      (i.tri(p, m, g), i.tri(p, g, b));
    }
}
function aq(i, t, e, s, n) {
  let o = [];
  for (let a = 0; a < s; a++) {
    let r = -(a / s) * Math.PI * 2,
      l = typeof n == "function" ? n(r, a) : n;
    o.push([i + Math.cos(r) * l, t, e + Math.sin(r) * l]);
  }
  return o;
}
function Oe(
  i,
  t,
  e,
  s,
  n,
  o,
  { rf: a = null, uScale: r = 1, flat: l = !1, v0: c = 0 } = {},
) {
  let h = s.map(([d, p]) => aq(t, p, e, n, a ? (m, g) => a(d, m, g, p) : d)),
    f = [0];
  for (let d = 1; d < s.length; d++)
    f.push(f[d - 1] + Math.hypot(s[d][0] - s[d - 1][0], s[d][1] - s[d - 1][1]));
  let u = (d) => 2 * Math.PI * Math.max(s[d][0], 0.05);
  Uh(i, h, o, (d, p) => [(p / n) * u(d) * r, c + f[d]], !0, l);
}
function ql(i, t, e, s, n, o, a, r = !1) {
  let l = aq(t, e, s, o, n),
    c = i.vert(t, e, s, 0, r ? -1 : 1, 0, t, s, a),
    h = l.map((f) => i.vert(f[0], f[1], f[2], 0, r ? -1 : 1, 0, f[0], f[2], a));
  for (let f = 0; f < o; f++) {
    let u = h[f],
      d = h[(f + 1) % o];
    r ? i.tri(c, d, u) : i.tri(c, u, d);
  }
}
function ys(
  i,
  t,
  e,
  s,
  n,
  { vBase: o = 0, cap: a = !1, capCol: r = null, keep: l = null } = {},
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
    (i.wall(
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
      o,
    ),
      (d += b));
  }
  a && xa(i, h, typeof s == "function" ? null : s, r || n, u);
}
function xa(i, t, e, s, n = null) {
  let o = t.reduce((f, u) => f + u[0], 0) / t.length,
    a = t.reduce((f, u) => f + u[1], 0) / t.length,
    r = (f, u) => e ?? n(f, u),
    l = i.vert(o, r(o, a), a, 0, 1, 0, o, a, s),
    c = t.map((f) => i.vert(f[0], r(f[0], f[1]), f[1], 0, 1, 0, f[0], f[1], s)),
    h = 0;
  for (let f = 0; f < t.length; f++) {
    let u = t[f],
      d = t[(f + 1) % t.length];
    h += u[0] * d[1] - d[0] * u[1];
  }
  for (let f = 0; f < t.length; f++) {
    let u = c[f],
      d = c[(f + 1) % t.length];
    h < 0 ? i.tri(l, u, d) : i.tri(l, d, u);
  }
}
function Ze(i, t, e, s, n, o, a, r) {
  let l = Math.floor((r[3] * 256) / 16),
    c = Math.abs((n - t) * (a - s)) > 60,
    h =
      l === sn.HOTEL ||
      l === sn.OFFICE ||
      l === sn.WIN ||
      l === sn.SFT ||
      l === sn.BAYS ||
      (c && (l === sn.TILE || l === sn.FLOOD || l === sn.TAPY));
  (i.box(t, s, n, a, e, o, r, h ? { uTop: It(Lt.stone, 0.3, 0.3, 0.29) } : {}),
    i.quad(
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
function Ae(i, t, e, s, n, o = 4, a = !1) {
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
    d = i.v,
    p = typeof s == "number" ? [s, s] : s;
  for (let m = 0; m < 2; m++)
    for (let g = 0; g <= o; g++) {
      let b = (g / o) * Math.PI * 2 + Math.PI / o,
        x = Math.cos(b),
        v = Math.sin(b),
        y = p[m],
        M = h[0] * x + u[0] * v,
        S = h[1] * x + u[1] * v,
        w = h[2] * x + u[2] * v,
        z = m ? e : t;
      i.vert(
        z[0] + M * y,
        z[1] + S * y,
        z[2] + w * y,
        M,
        S,
        w,
        m * l,
        (g / o) * 2 * Math.PI * y,
        n,
      );
    }
  for (let m = 0; m < o; m++) {
    let g = d + m,
      b = d + m + 1,
      x = d + o + 1 + m,
      v = x + 1;
    (i.tri(g, v, x), i.tri(g, b, v));
  }
  if (a)
    for (let m of [0, 1]) {
      let g = m ? e : t,
        b = m ? 1 : -1,
        x = i.vert(g[0], g[1], g[2], r[0] * b, r[1] * b, r[2] * b, 0, 0, n);
      for (let v = 0; v < o; v++) {
        let y = d + m * (o + 1) + v,
          M = y + 1;
        m ? i.tri(x, y, M) : i.tri(x, M, y);
      }
    }
}
function rq(i, t, e, s, n, o = 0, a = 1) {
  let r = Math.cos(o),
    l = Math.sin(o),
    c = t.p.a,
    h = t.nm.a,
    f = t.uv.a,
    u = t.c.a,
    d = i.v;
  for (let m = 0; m < t.v; m++) {
    let g = c[m * 3] * a,
      b = c[m * 3 + 1] * a,
      x = c[m * 3 + 2] * a,
      v = h[m * 3],
      y = h[m * 3 + 1],
      M = h[m * 3 + 2];
    i.vert(
      e + g * r + x * l,
      s + b,
      n - g * l + x * r,
      v * r + M * l,
      y,
      -v * l + M * r,
      f[m * 2],
      f[m * 2 + 1],
      [u[m * 4], u[m * 4 + 1], u[m * 4 + 2], u[m * 4 + 3]],
    );
  }
  let p = t.ix.a;
  for (let m = 0; m < t.ix.n; m += 3)
    i.tri(d + p[m], d + p[m + 1], d + p[m + 2]);
}
var lb = !1;
function x7(i) {
  lb = i;
}
var lq = () => (lb ? 0.25 : 0);
function il(i, t, e, s, n, o, a, r) {
  let l = lb ? (u, d) => a(u, d) + 0.25 : a;
  lb && (o = Math.min(o, 2));
  let c = Math.max(1, Math.ceil((s - t) / o)),
    h = Math.max(1, Math.ceil((n - e) / o)),
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
  Uh(i, f, r, (u, d) => [f[u][d][0], f[u][d][2]]);
}
