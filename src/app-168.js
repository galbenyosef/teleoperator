// app 168 — math
// Lines 100979-101306 of readable/app.pretty.js (statement-aligned).
function IC(o, t, e) {
  let s = o._dpt;
  if (!s) {
    let h = Math.max(2, Math.ceil(o.L / 1.5) + 1),
      f = new Float32Array(h),
      u = {},
      d = o.L / (h - 1);
    for (let m = 0; m < h; m++) {
      Ot(o, d * m, u);
      let g = Cw(o, u.w);
      for (let b of [-1, -0.5, 0, 0.5, 1])
        g = Math.min(
          g,
          iz(
            e,
            u.x + u.nx * u.w * b,
            u.z + u.nz * u.w * b,
            u.y,
            o,
            nl(o) ? 0.7 : rX,
          ),
        );
      f[m] = g;
    }
    s = new Float32Array(h);
    let p = Math.ceil(12 / Math.max(0.5, d));
    for (let m = 0; m < h; m++) {
      let g = 9;
      for (let b = Math.max(0, m - p); b <= Math.min(h - 1, m + p); b++)
        g = Math.min(g, f[b]);
      s[m] = g;
    }
    o._dpt = s;
  }
  let n = (h) => {
      let f =
          Math.max(0, Math.min(1, h / Math.max(1e-6, o.L))) * (s.length - 1),
        u = Math.min(s.length - 2, Math.floor(f));
      return s[u] + (s[u + 1] - s[u]) * (f - u);
    },
    i = o.S,
    a = 0,
    r = o.n - 1;
  for (; r - a > 1;) {
    let h = (a + r) >> 1;
    i[h] <= t ? (a = h) : (r = h);
  }
  let l = i[r] - i[a],
    c = l > 1e-6 ? Math.max(0, Math.min(1, (t - i[a]) / l)) : 0;
  return n(i[a]) + (n(i[r]) - n(i[a])) * c;
}
var f2t = 4.35,
  rX = 0.8;
function iz(o, t, e, s, n = null, i = rX) {
  if (!o?.probe) return 9;
  let a = -1e9;
  for (let r of o.probe(t, e).all)
    (n && (r.E === n || r.J === n)) || r.y > s - 0.3 || (r.y > a && (a = r.y));
  return a < -1e8 ? 9 : Math.max(i, s - a - f2t);
}
var bx = [0.56, 0.55, 0.52, 0.82],
  xx = [0.6, 0.59, 0.56, 0.82],
  Pl = [0.42, 0.415, 0.4, 0.87],
  u2t = [0.72, 0.72, 0.69, 0.82],
  d2t = [0.4, 0.4, 0.39, 0.82],
  p2t = /^(Route 80|James Lick Freeway)$/,
  m2t = /^(John F Foran Freeway|Southern Embarcadero Freeway)$/,
  g2t = {
    girders: !1,
    hu: 0.85,
    hv: 0.85,
    ch: 0.5,
    cap: 0.6,
    sp: 36,
    col: bx,
    band: null,
    fence: !0,
  },
  V$ = {
    girders: !1,
    hu: 0.75,
    hv: 1.05,
    ch: 0.16,
    cap: 1.5,
    sp: 32,
    col: bx,
    band: d2t,
    fence: !0,
  },
  W$ = {
    girders: !0,
    hu: 0.78,
    hv: 0.78,
    ch: 0.46,
    cap: 1.3,
    sp: 26,
    col: u2t,
    band: null,
  };
function UC(o) {
  if (o._via) return o._via;
  let t = g2t;
  if (p2t.test(o.name || "")) t = V$;
  else if (m2t.test(o.name || "")) t = W$;
  else if (!o.name && o.cls === "motorway_link") {
    let e = Ot(o, (o.s0 + o.s1) / 2, {});
    e.z > 2300 && e.x > -700
      ? (t = W$)
      : e.z < 2480 && e.x > -1300 && e.x < 400 && (t = V$);
  }
  return (o._via = t);
}
function na(o, t, e, s, n, i, a, r, l, c, h) {
  let f = (e[1] - t[1]) * (n[2] - t[2]) - (e[2] - t[2]) * (n[1] - t[1]),
    u = (e[2] - t[2]) * (n[0] - t[0]) - (e[0] - t[0]) * (n[2] - t[2]),
    d = (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0]);
  f * h[0] + u * h[1] + d * h[2] >= 0
    ? o.quad(t, e, s, n, i, a, r, l, c, h)
    : o.quad(t, n, s, e, i, l, r, a, c, h);
}
function dx(o, t, e, s, n, i, a, r, l, c, h, f = 0, u = 1) {
  let d = -n,
    p = s,
    m = [
      [i, -a + r],
      [i, a - r],
      [i - r, a],
      [-i + r, a],
      [-i, a - r],
      [-i, -a + r],
      [-i + r, -a],
      [i - r, -a],
    ],
    g = ([v, x], y) => [t + (s * v + d * x) * y, e + (n * v + p * x) * y],
    b = 0;
  for (let v = 0; v < 8; v++) {
    let x = m[v],
      y = m[(v + 1) % 8],
      M = g(x, 1),
      S = g(y, 1),
      w = g(x, u),
      _ = g(y, u),
      z = Math.hypot(S[0] - M[0], S[1] - M[1]);
    if (z < 0.001) continue;
    let A = (x[0] + y[0]) / 2,
      T = (x[1] + y[1]) / 2,
      E = y[0] - x[0],
      R = y[1] - x[1],
      P = R * A - E * T >= 0 ? 1 : -1,
      C = R * P,
      I = -E * P,
      L = Math.hypot(C, I),
      F = (s * C + d * I) / L,
      O = (n * C + p * I) / L,
      B = ((u - 1) * Math.hypot(A, T)) / Math.max(0.1, c - l),
      H = Math.hypot(1, B);
    (na(
      o,
      [M[0], l, M[1]],
      [S[0], l, S[1]],
      [_[0], c, _[1]],
      [w[0], c, w[1]],
      [b, f],
      [b + z, f],
      [b + z, f + c - l],
      [b, f + c - l],
      h,
      [F / H, -B / H, O / H],
    ),
      (b += z));
  }
}
function FC(o, t, e, s, n, i, a, r, l, c) {
  let h = -n,
    f = s,
    u = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([d, p]) => [t + s * i * d + h * a * p, e + n * i * d + f * a * p]);
  for (let d = 0; d < 4; d++) {
    let p = u[d],
      m = u[(d + 1) % 4],
      g = (p[0] + m[0]) / 2 - t,
      b = (p[1] + m[1]) / 2 - e,
      v = Math.hypot(g, b),
      x = Math.hypot(m[0] - p[0], m[1] - p[1]);
    na(
      o,
      [p[0], r, p[1]],
      [m[0], r, m[1]],
      [m[0], l, m[1]],
      [p[0], l, p[1]],
      [0, 0],
      [x, 0],
      [x, l - r],
      [0, l - r],
      c,
      [g / v, 0, b / v],
    );
  }
  na(
    o,
    [u[0][0], r, u[0][1]],
    [u[1][0], r, u[1][1]],
    [u[2][0], r, u[2][1]],
    [u[3][0], r, u[3][1]],
    [-i, -a],
    [i, -a],
    [i, a],
    [-i, a],
    c,
    [0, -1, 0],
  );
}
function vx(o, t, e, s, n, i, a) {
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
      );
}
function GC(o, t = null) {
  if (!o.trolley || o.s1 - o.s0 < 12) return [];
  let e = [],
    s = Math.max(1, Math.round((o.s1 - o.s0 - 4) / 34)),
    n = (i, a, r) =>
      (!t || t.surfaceAt(i, a) !== "road") && Rp(t, i, a, r, r + 7.3, 0.2);
  for (let i = 0; i <= s; i++) {
    let a = o.s0 + 2 + ((o.s1 - o.s0 - 4) * i) / s,
      r = Ot(o, a, {}),
      l = r.w + 0.45,
      c = r.y + 0.15,
      h = r.x - r.nx * l,
      f = r.z - r.nz * l,
      u = r.x + r.nx * l,
      d = r.z + r.nz * l;
    e.push({
      s: a,
      L: n(h, f, c) ? [h, c, f] : null,
      R: n(u, d, c) ? [u, c, d] : null,
      o: r,
    });
  }
  return e;
}
var Sf = [0.05, 0.05, 0.05, 0];
function VC(o, t = null) {
  if (o._tc !== void 0) return o._tc;
  let e = [];
  for (let [a, r] of o.legs || []) {
    if (!a.trolley || a.elev || a.s1 - a.s0 < 12) continue;
    let l = r === "a" ? a.s0 + 2 : a.s1 - 2,
      c = Ot(a, l, {}),
      h = r === "a" ? 1 : -1;
    e.push({
      a: [c.dx * h, c.dz * h],
      o: c,
      ang: Math.atan2(c.dz * h, c.dx * h),
    });
  }
  let s = [],
    n = e.filter(
      (a, r) =>
        !e.some((l, c) => c < r && a.a[0] * l.a[0] + a.a[1] * l.a[1] > 0.9),
    ),
    i = !1;
  for (let a of n)
    for (let r of n)
      Math.abs(a.a[0] * r.a[0] + a.a[1] * r.a[1]) < 0.6 && (i = !0);
  if (n.length >= 3 && i) {
    n.sort((a, r) => a.ang - r.ang);
    for (let a = 0; a < n.length; a++) {
      let r = n[a],
        l = n[(a + 1) % n.length],
        c = (y, M) => {
          let S = y.o.nx,
            w = y.o.nz;
          S * M.a[0] + w * M.a[1] < 0 && ((S = -S), (w = -w));
          let _ = y.o.w + 0.45;
          return [y.o.x + S * _, y.o.z + w * _];
        },
        h = c(r, l),
        f = c(l, r),
        u = r.a[0] * l.a[1] - r.a[1] * l.a[0];
      if (Math.abs(u) < 0.3) continue;
      let d = ((f[0] - h[0]) * l.a[1] - (f[1] - h[1]) * l.a[0]) / u;
      if (d < -25 || d > 6) continue;
      let p = h[0] + r.a[0] * d,
        m = h[1] + r.a[1] * d,
        g = r.a[0] + l.a[0],
        b = r.a[1] + l.a[1],
        v = Math.hypot(g, b) || 1;
      if (t) {
        let y = 0;
        for (
          ;
          y < 6 && t.surfaceAt(p + (g / v) * y, m + (b / v) * y) === "road";
        )
          y += 0.5;
        if (y >= 6) continue;
        ((p += (g / v) * (y + 0.3)), (m += (b / v) * (y + 0.3)));
      }
      let x = (t ? t.driveHeight(p, m) : (r.o.y + l.o.y) / 2) + 0.15;
      Rp(t, p, m, x, x + 7.3, 0.2) && s.push([p, x, m]);
    }
  }
  return (o._tc = s);
}
