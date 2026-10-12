// app 169 — math
// Lines 100743-101070 of readable/app.pretty.js (statement-aligned).
function nP(i, t, e) {
  let s = i._dpt;
  if (!s) {
    let h = Math.max(2, Math.ceil(i.L / 1.5) + 1),
      f = new Float32Array(h),
      u = {},
      d = i.L / (h - 1);
    for (let m = 0; m < h; m++) {
      Ot(i, d * m, u);
      let g = Oy(i, u.w);
      for (let b of [-1, -0.5, 0, 0.5, 1])
        g = Math.min(
          g,
          ik(
            e,
            u.x + u.nx * u.w * b,
            u.z + u.nz * u.w * b,
            u.y,
            i,
            I0(i) ? 0.7 : iV,
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
    i._dpt = s;
  }
  let n = (h) => {
      let f =
          Math.max(0, Math.min(1, h / Math.max(1e-6, i.L))) * (s.length - 1),
        u = Math.min(s.length - 2, Math.floor(f));
      return s[u] + (s[u + 1] - s[u]) * (f - u);
    },
    o = i.S,
    a = 0,
    r = i.n - 1;
  for (; r - a > 1;) {
    let h = (a + r) >> 1;
    o[h] <= t ? (a = h) : (r = h);
  }
  let l = o[r] - o[a],
    c = l > 1e-6 ? Math.max(0, Math.min(1, (t - o[a]) / l)) : 0;
  return n(o[a]) + (n(o[r]) - n(o[a])) * c;
}
var Udt = 4.35,
  iV = 0.8;
function ik(i, t, e, s, n = null, o = iV) {
  if (!i?.probe) return 9;
  let a = -1e9;
  for (let r of i.probe(t, e).all)
    (n && (r.E === n || r.J === n)) || r.y > s - 0.3 || (r.y > a && (a = r.y));
  return a < -1e8 ? 9 : Math.max(o, s - a - Udt);
}
var Pb = [0.56, 0.55, 0.52, 0.82],
  Cb = [0.6, 0.59, 0.56, 0.82],
  cl = [0.42, 0.415, 0.4, 0.87],
  Gdt = [0.72, 0.72, 0.69, 0.82],
  Wdt = [0.4, 0.4, 0.39, 0.82],
  qdt = /^(Route 80|James Lick Freeway)$/,
  jdt = /^(John F Foran Freeway|Southern Embarcadero Freeway)$/,
  Vdt = {
    girders: !1,
    hu: 0.85,
    hv: 0.85,
    ch: 0.5,
    cap: 0.6,
    sp: 36,
    col: Pb,
    band: null,
    fence: !0,
  },
  Dj = {
    girders: !1,
    hu: 0.75,
    hv: 1.05,
    ch: 0.16,
    cap: 1.5,
    sp: 32,
    col: Pb,
    band: Wdt,
    fence: !0,
  },
  Uj = {
    girders: !0,
    hu: 0.78,
    hv: 0.78,
    ch: 0.46,
    cap: 1.3,
    sp: 26,
    col: Gdt,
    band: null,
  };
function hP(i) {
  if (i._via) return i._via;
  let t = Vdt;
  if (qdt.test(i.name || "")) t = Dj;
  else if (jdt.test(i.name || "")) t = Uj;
  else if (!i.name && i.cls === "motorway_link") {
    let e = Ot(i, (i.s0 + i.s1) / 2, {});
    e.z > 2300 && e.x > -700
      ? (t = Uj)
      : e.z < 2480 && e.x > -1300 && e.x < 400 && (t = Dj);
  }
  return (i._via = t);
}
function $o(i, t, e, s, n, o, a, r, l, c, h) {
  let f = (e[1] - t[1]) * (n[2] - t[2]) - (e[2] - t[2]) * (n[1] - t[1]),
    u = (e[2] - t[2]) * (n[0] - t[0]) - (e[0] - t[0]) * (n[2] - t[2]),
    d = (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0]);
  f * h[0] + u * h[1] + d * h[2] >= 0
    ? i.quad(t, e, s, n, o, a, r, l, c, h)
    : i.quad(t, n, s, e, o, l, r, a, c, h);
}
function Eb(i, t, e, s, n, o, a, r, l, c, h, f = 0, u = 1) {
  let d = -n,
    p = s,
    m = [
      [o, -a + r],
      [o, a - r],
      [o - r, a],
      [-o + r, a],
      [-o, a - r],
      [-o, -a + r],
      [-o + r, -a],
      [o - r, -a],
    ],
    g = ([x, v], y) => [t + (s * x + d * v) * y, e + (n * x + p * v) * y],
    b = 0;
  for (let x = 0; x < 8; x++) {
    let v = m[x],
      y = m[(x + 1) % 8],
      M = g(v, 1),
      S = g(y, 1),
      w = g(v, u),
      z = g(y, u),
      _ = Math.hypot(S[0] - M[0], S[1] - M[1]);
    if (_ < 0.001) continue;
    let R = (v[0] + y[0]) / 2,
      T = (v[1] + y[1]) / 2,
      E = y[0] - v[0],
      A = y[1] - v[1],
      C = A * R - E * T >= 0 ? 1 : -1,
      P = A * C,
      I = -E * C,
      L = Math.hypot(P, I),
      F = (s * P + d * I) / L,
      N = (n * P + p * I) / L,
      B = ((u - 1) * Math.hypot(R, T)) / Math.max(0.1, c - l),
      H = Math.hypot(1, B);
    ($o(
      i,
      [M[0], l, M[1]],
      [S[0], l, S[1]],
      [z[0], c, z[1]],
      [w[0], c, w[1]],
      [b, f],
      [b + _, f],
      [b + _, f + c - l],
      [b, f + c - l],
      h,
      [F / H, -B / H, N / H],
    ),
      (b += _));
  }
}
function iP(i, t, e, s, n, o, a, r, l, c) {
  let h = -n,
    f = s,
    u = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([d, p]) => [t + s * o * d + h * a * p, e + n * o * d + f * a * p]);
  for (let d = 0; d < 4; d++) {
    let p = u[d],
      m = u[(d + 1) % 4],
      g = (p[0] + m[0]) / 2 - t,
      b = (p[1] + m[1]) / 2 - e,
      x = Math.hypot(g, b),
      v = Math.hypot(m[0] - p[0], m[1] - p[1]);
    $o(
      i,
      [p[0], r, p[1]],
      [m[0], r, m[1]],
      [m[0], l, m[1]],
      [p[0], l, p[1]],
      [0, 0],
      [v, 0],
      [v, l - r],
      [0, l - r],
      c,
      [g / x, 0, b / x],
    );
  }
  $o(
    i,
    [u[0][0], r, u[0][1]],
    [u[1][0], r, u[1][1]],
    [u[2][0], r, u[2][1]],
    [u[3][0], r, u[3][1]],
    [-o, -a],
    [o, -a],
    [o, a],
    [-o, a],
    c,
    [0, -1, 0],
  );
}
function Lb(i, t, e, s, n, o, a) {
  (e[2] - t[2]) * (s[0] - t[0]) - (e[0] - t[0]) * (s[2] - t[2]) >= 0 === a
    ? i.quad(
        t,
        e,
        s,
        n,
        [t[0], t[2]],
        [e[0], e[2]],
        [s[0], s[2]],
        [n[0], n[2]],
        o,
      )
    : i.quad(
        t,
        n,
        s,
        e,
        [t[0], t[2]],
        [n[0], n[2]],
        [s[0], s[2]],
        [e[0], e[2]],
        o,
      );
}
function fP(i, t = null) {
  if (!i.trolley || i.s1 - i.s0 < 12) return [];
  let e = [],
    s = Math.max(1, Math.round((i.s1 - i.s0 - 4) / 34)),
    n = (o, a, r) =>
      (!t || t.surfaceAt(o, a) !== "road") && Jd(t, o, a, r, r + 7.3, 0.2);
  for (let o = 0; o <= s; o++) {
    let a = i.s0 + 2 + ((i.s1 - i.s0 - 4) * o) / s,
      r = Ot(i, a, {}),
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
var jh = [0.05, 0.05, 0.05, 0];
function uP(i, t = null) {
  if (i._tc !== void 0) return i._tc;
  let e = [];
  for (let [a, r] of i.legs || []) {
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
    o = !1;
  for (let a of n)
    for (let r of n)
      Math.abs(a.a[0] * r.a[0] + a.a[1] * r.a[1]) < 0.6 && (o = !0);
  if (n.length >= 3 && o) {
    n.sort((a, r) => a.ang - r.ang);
    for (let a = 0; a < n.length; a++) {
      let r = n[a],
        l = n[(a + 1) % n.length],
        c = (y, M) => {
          let S = y.o.nx,
            w = y.o.nz;
          S * M.a[0] + w * M.a[1] < 0 && ((S = -S), (w = -w));
          let z = y.o.w + 0.45;
          return [y.o.x + S * z, y.o.z + w * z];
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
        x = Math.hypot(g, b) || 1;
      if (t) {
        let y = 0;
        for (
          ;
          y < 6 && t.surfaceAt(p + (g / x) * y, m + (b / x) * y) === "road";
        )
          y += 0.5;
        if (y >= 6) continue;
        ((p += (g / x) * (y + 0.3)), (m += (b / x) * (y + 0.3)));
      }
      let v = (t ? t.driveHeight(p, m) : (r.o.y + l.o.y) / 2) + 0.15;
      Jd(t, p, m, v, v + 7.3, 0.2) && s.push([p, v, m]);
    }
  }
  return (i._tc = s);
}
