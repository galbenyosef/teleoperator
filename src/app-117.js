// app 117 — math
// Lines 84244-84570 of readable/app.pretty.js (statement-aligned).
function fj(o, t, e, s, n, i, a, r, l = 7.5, c = 0.7, h = 1.4) {
  let f = Yb ? (x, y) => i(x, y) + 0.25 : i,
    u = Yb ? 2 : 3,
    d = (x, y) => {
      let M = (x + y) / 2,
        S = [
          [x, x + h],
          [y - h, y],
        ];
      for (let z = -40; z <= 40; z++) {
        let A = M + z * l;
        A - c / 2 > x + h + 0.5 &&
          A + c / 2 < y - h - 0.5 &&
          S.push([A - c / 2, A + c / 2]);
      }
      let w = [x, y];
      for (let [z, A] of S) w.push(z, A);
      w = [...new Set(w.map((z) => +z.toFixed(3)))].sort((z, A) => z - A);
      let _ = [w[0]];
      for (let z = 1; z < w.length; z++) {
        let A = w[z] - w[z - 1],
          T = Math.max(1, Math.ceil(A / u));
        for (let E = 1; E <= T; E++) _.push(w[z - 1] + (A * E) / T);
      }
      return { out: _, inBand: (z) => S.some(([A, T]) => z > A && z < T) };
    },
    p = d(t, s),
    m = d(e, n),
    g = m.out.slice().reverse(),
    b = g.map((x) => p.out.map((y) => [y, f(y, x), x]));
  bf(
    o,
    b,
    (x, y) => {
      let M = (p.out[y] + p.out[y + 1]) / 2,
        S = (g[x] + g[x + 1]) / 2;
      return p.inBand(M) || m.inBand(S) ? r : a;
    },
    (x, y) => [b[x][y][0], b[x][y][2]],
    !1,
    !0,
  );
}
function oe(o, t, e, s, n = (i) => [i[0] + i[2], i[1]]) {
  for (let i = 1; i + 1 < t.length; i++) {
    let a = t[0],
      r = t[i],
      l = t[i + 1],
      c = [r[0] - a[0], r[1] - a[1], r[2] - a[2]],
      h = [l[0] - a[0], l[1] - a[1], l[2] - a[2]],
      f = [
        c[1] * h[2] - c[2] * h[1],
        c[2] * h[0] - c[0] * h[2],
        c[0] * h[1] - c[1] * h[0],
      ],
      u = Math.hypot(...f);
    if (u < 1e-6) continue;
    let d = f[0] * s[0] + f[1] * s[1] + f[2] * s[2] >= 0 ? 1 : -1,
      p = f.map((v) => (v / u) * d),
      m = o.vert(a[0], a[1], a[2], p[0], p[1], p[2], ...n(a), e),
      g = o.vert(r[0], r[1], r[2], p[0], p[1], p[2], ...n(r), e),
      b = o.vert(l[0], l[1], l[2], p[0], p[1], p[2], ...n(l), e);
    d > 0 ? o.tri(m, g, b) : o.tri(m, b, g);
  }
}
function vn(o, t, e, s, { shadow: n = !0 } = {}) {
  if (t.empty) return null;
  let i = new ye(t.geometry(), e);
  return (
    (i.name = s),
    (i.matrixAutoUpdate = !1),
    i.updateMatrix(),
    (i.castShadow = n),
    (i.receiveShadow = !0),
    o.add(i),
    i
  );
}
function Zb(o, t) {
  return o >= he[0] && o <= he[xn - 1] && t >= pe[0] && t <= pe[ks - 1]
    ? $t(o, t)
    : Vo(o, t, !1);
}
function Vu(
  o,
  t,
  e = ["tree", "lamp", "hydrant", "car", "stop", "signal", "wpole", "palm"],
) {
  let s = o.inst.filter((i) => !(e.includes(i.kind) && t(i.x, i.z)));
  ((o.inst.length = 0), o.inst.push(...s));
  let n = o.colliders.filter(
    (i) =>
      !(
        (i.t === "circ" && i.r < 0.6 && t(i.x, i.z)) ||
        (i.t === "obb" && i.parked && t(i.x, i.z))
      ),
  );
  ((o.colliders.length = 0), o.colliders.push(...n));
}
Pn();
var Gm = null,
  uj = 4,
  dj = (o) => {
    uj = o;
  },
  YP = new Map(),
  pj = (o, t) => {
    t?.length ? YP.set(o, t) : YP.delete(o);
  };
function mj(o, t) {
  let e = -1e4;
  for (let s of YP.values())
    for (let n of s) {
      let [i, a] = n.inv(o, t);
      i >= n.x0 && i <= n.x1 && a >= n.z0 && a <= n.z1 && n.y > e && (e = n.y);
    }
  return e;
}
function Vm(o, t = uj) {
  let e = o.terrain,
    s = o.bld?.nMain ?? o.bld?.n ?? 0,
    n = o.claims?.bSkip || null;
  if (Gm && Gm.D === o && Gm.nb === s && Gm.cell === t && Gm.skip === n)
    return Gm;
  let i = Math.max(1, Math.round(t / e.step)),
    a = e.step * i,
    r = Math.floor((e.nx - 1) / i) + 1,
    l = Math.floor((e.nz - 1) / i) + 1,
    c = new Float32Array(r * l);
  for (let p = 0; p < l; p++)
    for (let m = 0; m < r; m++) {
      let g = -1e4;
      for (let b = 0; b < i; b++)
        for (let v = 0; v < i; v++) {
          let x = Math.min(e.nx - 1, m * i + v),
            y = Math.min(e.nz - 1, p * i + b),
            M = e.h[y * e.nx + x];
          M > g && (g = M);
        }
      c[p * r + m] = g;
    }
  let h = o.bld,
    f = e.x0,
    u = e.z0,
    d = [];
  for (let p = 0; p < s; p++) {
    let m = h.bF[p * 3 + 1],
      g = h.bF[p * 3],
      b = h.bF[p * 3 + 2];
    if (!(m > g + 1) || b > g + 3 || n?.[p]) continue;
    let v = h.bRing[p],
      x = h.rStart[v],
      y = h.rStart[v + 1],
      M = y - x;
    if (M < 3) continue;
    let S = 1e9,
      w = -1e9;
    for (let A = x; A < y; A++) {
      let T = h.pts[A * 2 + 1];
      (T < S && (S = T), T > w && (w = T));
    }
    let _ = Math.max(0, Math.ceil((S - u) / a)),
      z = Math.min(l - 1, Math.floor((w - u) / a));
    if (z < _) {
      let A = h.pts[x * 2],
        T = h.pts[x * 2 + 1],
        E = Math.round((A - f) / a),
        R = Math.round((T - u) / a);
      E >= 0 &&
        R >= 0 &&
        E < r &&
        R < l &&
        c[R * r + E] < m &&
        (c[R * r + E] = m);
      continue;
    }
    for (let A = _; A <= z; A++) {
      let T = u + A * a;
      d.length = 0;
      for (let E = 0; E < M; E++) {
        let R = x + E,
          P = x + ((E + 1) % M),
          C = h.pts[R * 2 + 1],
          I = h.pts[P * 2 + 1];
        if (C <= T != I <= T) {
          let L = h.pts[R * 2],
            F = h.pts[P * 2];
          d.push(L + ((T - C) / (I - C)) * (F - L));
        }
      }
      d.sort((E, R) => E - R);
      for (let E = 0; E + 1 < d.length; E += 2) {
        let R = Math.max(0, Math.ceil((d[E] - f) / a)),
          P = Math.min(r - 1, Math.floor((d[E + 1] - f) / a));
        for (let C = R; C <= P; C++) c[A * r + C] < m && (c[A * r + C] = m);
      }
    }
  }
  return (Gm = {
    D: o,
    nb: s,
    skip: n,
    x0: f,
    z0: u,
    cell: a,
    w: r,
    h: l,
    H: c,
  });
}
function gj(o, t, e = null) {
  let { w: s, h: n, H: i, cell: a } = o,
    r = Math.hypot(t.x, t.z);
  if (!(t.y > 0.01) || r < 1e-4) return null;
  let l = Math.max(0.02, t.y / r),
    c = t.x / r,
    h = t.z / r,
    f = new Float32Array(s * n).fill(-1e4),
    u = (b) => (i[b] > f[b] ? i[b] : f[b]);
  if (Math.abs(c) >= Math.abs(h)) {
    let b = c > 0 ? 1 : -1,
      v = h / Math.abs(c),
      x = (a / Math.abs(c)) * l,
      y = v - Math.floor(v),
      M = Math.floor(v);
    for (let S = b > 0 ? s - 2 : 1; b > 0 ? S >= 0 : S < s; S -= b) {
      let w = S + b;
      for (let _ = 0; _ < n; _++) {
        let z = _ + M,
          A = z + 1;
        if (z < 0 || A >= n) continue;
        let T = u(z * s + w),
          E = u(A * s + w);
        f[_ * s + S] = T + (E - T) * y - x;
      }
    }
  } else {
    let b = h > 0 ? 1 : -1,
      v = c / Math.abs(h),
      x = (a / Math.abs(h)) * l,
      y = v - Math.floor(v),
      M = Math.floor(v);
    for (let S = b > 0 ? n - 2 : 1; b > 0 ? S >= 0 : S < n; S -= b) {
      let w = (S + b) * s;
      for (let _ = 0; _ < s; _++) {
        let z = _ + M,
          A = z + 1;
        if (z < 0 || A >= s) continue;
        let T = u(w + z),
          E = u(w + A);
        f[S * s + _] = T + (E - T) * y - x;
      }
    }
  }
  let d = s * n,
    p = 8 + Math.ceil(d / 2),
    m = e && e.length === p ? e : new Uint32Array(p),
    g = new Float32Array(m.buffer, 0, 8);
  ((m[0] = s),
    (m[1] = n),
    (g[2] = o.x0),
    (g[3] = o.z0),
    (g[4] = 1 / a),
    (m[5] = m[6] = m[7] = 0));
  for (let b = 0; b < d; b += 2) {
    let v = Math.max(0, Math.min(65535, Math.round((f[b] + 64) * 8))),
      x =
        b + 1 < d
          ? Math.max(0, Math.min(65535, Math.round((f[b + 1] + 64) * 8)))
          : 0;
    m[8 + (b >> 1)] = v | (x << 16);
  }
  return { data: m, S: f };
}
var Qa = 1592,
  tr = 2030,
  bw = { x0: 1520, x1: 1640, z0: 2072, z1: 2122 },
  bj = [
    { x0: Qa - 34, z0: tr - 34, x1: Qa + 34, z1: tr + 34 },
    { x0: bw.x0 - 6, z0: bw.z0 - 6, x1: bw.x1 + 6, z1: bw.z1 + 6 },
  ],
  fh = 326,
  Wm = 272,
  hh = (o) => {
    let t = 26.2 - (2.4 * Math.min(o, 240)) / 240;
    return o <= 240 ? t : t - 5.6 * Math.pow((o - 240) / (fh - 240), 2);
  },
  qm = (o) => 8.5 + 6.5 * Math.pow(o / fh, 1.6);
function Qb(o, t, e, s, n, i) {
  let a = [],
    r = e - s,
    l = Math.max(2, Math.round(n / 2)),
    c = n - l,
    h = [
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 1],
    ];
  for (let f = 0; f < 4; f++) {
    let [u, d] = h[f],
      p = [0, -Math.PI / 2, Math.PI, Math.PI / 2][f],
      m = [Math.cos(p), Math.sin(p)],
      g = [Math.sin(p), -Math.cos(p)];
    for (let b = 0; b < c; b++) {
      let v = -r + 2 * r * (b / c);
      a.push([o + m[0] * e + g[0] * v, i, t + m[1] * e + g[1] * v]);
    }
    for (let b = 0; b < l; b++) {
      let v = p - ((b / l) * Math.PI) / 2;
      a.push([o + u * r + Math.cos(v) * s, i, t + d * r + Math.sin(v) * s]);
    }
  }
  return a;
}
var k1t = (o) => {
  let t = 0;
  for (let e = 0; e < o.length; e++) {
    let s = o[e],
      n = o[(e + 1) % o.length];
    t += Math.hypot(n[0] - s[0], n[2] - s[2]);
  }
  return t;
};
function xj(o, t) {
  (JP(o, t), ZP(o, t));
}
