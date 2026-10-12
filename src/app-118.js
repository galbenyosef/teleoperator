// app 118 — math
// Lines 84006-84332 of readable/app.pretty.js (statement-aligned).
function cq(i, t, e, s, n, o, a, r, l = 7.5, c = 0.7, h = 1.4) {
  let f = lb ? (v, y) => o(v, y) + 0.25 : o,
    u = lb ? 2 : 3,
    d = (v, y) => {
      let M = (v + y) / 2,
        S = [
          [v, v + h],
          [y - h, y],
        ];
      for (let _ = -40; _ <= 40; _++) {
        let R = M + _ * l;
        R - c / 2 > v + h + 0.5 &&
          R + c / 2 < y - h - 0.5 &&
          S.push([R - c / 2, R + c / 2]);
      }
      let w = [v, y];
      for (let [_, R] of S) w.push(_, R);
      w = [...new Set(w.map((_) => +_.toFixed(3)))].sort((_, R) => _ - R);
      let z = [w[0]];
      for (let _ = 1; _ < w.length; _++) {
        let R = w[_] - w[_ - 1],
          T = Math.max(1, Math.ceil(R / u));
        for (let E = 1; E <= T; E++) z.push(w[_ - 1] + (R * E) / T);
      }
      return { out: z, inBand: (_) => S.some(([R, T]) => _ > R && _ < T) };
    },
    p = d(t, s),
    m = d(e, n),
    g = m.out.slice().reverse(),
    b = g.map((v) => p.out.map((y) => [y, f(y, v), v]));
  Uh(
    i,
    b,
    (v, y) => {
      let M = (p.out[y] + p.out[y + 1]) / 2,
        S = (g[v] + g[v + 1]) / 2;
      return p.inBand(M) || m.inBand(S) ? r : a;
    },
    (v, y) => [b[v][y][0], b[v][y][2]],
    !1,
    !0,
  );
}
function ne(i, t, e, s, n = (o) => [o[0] + o[2], o[1]]) {
  for (let o = 1; o + 1 < t.length; o++) {
    let a = t[0],
      r = t[o],
      l = t[o + 1],
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
      p = f.map((x) => (x / u) * d),
      m = i.vert(a[0], a[1], a[2], p[0], p[1], p[2], ...n(a), e),
      g = i.vert(r[0], r[1], r[2], p[0], p[1], p[2], ...n(r), e),
      b = i.vert(l[0], l[1], l[2], p[0], p[1], p[2], ...n(l), e);
    d > 0 ? i.tri(m, g, b) : i.tri(m, b, g);
  }
}
function gn(i, t, e, s, { shadow: n = !0 } = {}) {
  if (t.empty) return null;
  let o = new _e(t.geometry(), e);
  return (
    (o.name = s),
    (o.matrixAutoUpdate = !1),
    o.updateMatrix(),
    (o.castShadow = n),
    (o.receiveShadow = !0),
    i.add(o),
    o
  );
}
function hb(i, t) {
  return i >= ae[0] && i <= ae[mn - 1] && t >= fe[0] && t <= fe[ws - 1]
    ? Yt(i, t)
    : Io(i, t, !1);
}
function ru(
  i,
  t,
  e = ["tree", "lamp", "hydrant", "car", "stop", "signal", "wpole", "palm"],
) {
  let s = i.inst.filter((o) => !(e.includes(o.kind) && t(o.x, o.z)));
  ((i.inst.length = 0), i.inst.push(...s));
  let n = i.colliders.filter(
    (o) =>
      !(
        (o.t === "circ" && o.r < 0.6 && t(o.x, o.z)) ||
        (o.t === "obb" && o.parked && t(o.x, o.z))
      ),
  );
  ((i.colliders.length = 0), i.colliders.push(...n));
}
En();
var sm = null,
  hq = 4,
  fq = (i) => {
    hq = i;
  },
  v7 = new Map(),
  uq = (i, t) => {
    t?.length ? v7.set(i, t) : v7.delete(i);
  };
function dq(i, t) {
  let e = -1e4;
  for (let s of v7.values())
    for (let n of s) {
      let [o, a] = n.inv(i, t);
      o >= n.x0 && o <= n.x1 && a >= n.z0 && a <= n.z1 && n.y > e && (e = n.y);
    }
  return e;
}
function fb(i, t = hq) {
  let e = i.terrain,
    s = i.bld?.nMain ?? i.bld?.n ?? 0,
    n = i.claims?.bSkip || null;
  if (sm && sm.D === i && sm.nb === s && sm.cell === t && sm.skip === n)
    return sm;
  let o = Math.max(1, Math.round(t / e.step)),
    a = e.step * o,
    r = Math.floor((e.nx - 1) / o) + 1,
    l = Math.floor((e.nz - 1) / o) + 1,
    c = new Float32Array(r * l);
  for (let p = 0; p < l; p++)
    for (let m = 0; m < r; m++) {
      let g = -1e4;
      for (let b = 0; b < o; b++)
        for (let x = 0; x < o; x++) {
          let v = Math.min(e.nx - 1, m * o + x),
            y = Math.min(e.nz - 1, p * o + b),
            M = e.h[y * e.nx + v];
          M > g && (g = M);
        }
      c[p * r + m] = g;
    }
  let h = i.bld,
    f = e.x0,
    u = e.z0,
    d = [];
  for (let p = 0; p < s; p++) {
    let m = h.bF[p * 3 + 1],
      g = h.bF[p * 3],
      b = h.bF[p * 3 + 2];
    if (!(m > g + 1) || b > g + 3 || n?.[p]) continue;
    let x = h.bRing[p],
      v = h.rStart[x],
      y = h.rStart[x + 1],
      M = y - v;
    if (M < 3) continue;
    let S = 1e9,
      w = -1e9;
    for (let R = v; R < y; R++) {
      let T = h.pts[R * 2 + 1];
      (T < S && (S = T), T > w && (w = T));
    }
    let z = Math.max(0, Math.ceil((S - u) / a)),
      _ = Math.min(l - 1, Math.floor((w - u) / a));
    if (_ < z) {
      let R = h.pts[v * 2],
        T = h.pts[v * 2 + 1],
        E = Math.round((R - f) / a),
        A = Math.round((T - u) / a);
      E >= 0 &&
        A >= 0 &&
        E < r &&
        A < l &&
        c[A * r + E] < m &&
        (c[A * r + E] = m);
      continue;
    }
    for (let R = z; R <= _; R++) {
      let T = u + R * a;
      d.length = 0;
      for (let E = 0; E < M; E++) {
        let A = v + E,
          C = v + ((E + 1) % M),
          P = h.pts[A * 2 + 1],
          I = h.pts[C * 2 + 1];
        if (P <= T != I <= T) {
          let L = h.pts[A * 2],
            F = h.pts[C * 2];
          d.push(L + ((T - P) / (I - P)) * (F - L));
        }
      }
      d.sort((E, A) => E - A);
      for (let E = 0; E + 1 < d.length; E += 2) {
        let A = Math.max(0, Math.ceil((d[E] - f) / a)),
          C = Math.min(r - 1, Math.floor((d[E + 1] - f) / a));
        for (let P = A; P <= C; P++) c[R * r + P] < m && (c[R * r + P] = m);
      }
    }
  }
  return (sm = {
    D: i,
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
function pq(i, t, e = null) {
  let { w: s, h: n, H: o, cell: a } = i,
    r = Math.hypot(t.x, t.z);
  if (!(t.y > 0.01) || r < 1e-4) return null;
  let l = Math.max(0.02, t.y / r),
    c = t.x / r,
    h = t.z / r,
    f = new Float32Array(s * n).fill(-1e4),
    u = (b) => (o[b] > f[b] ? o[b] : f[b]);
  if (Math.abs(c) >= Math.abs(h)) {
    let b = c > 0 ? 1 : -1,
      x = h / Math.abs(c),
      v = (a / Math.abs(c)) * l,
      y = x - Math.floor(x),
      M = Math.floor(x);
    for (let S = b > 0 ? s - 2 : 1; b > 0 ? S >= 0 : S < s; S -= b) {
      let w = S + b;
      for (let z = 0; z < n; z++) {
        let _ = z + M,
          R = _ + 1;
        if (_ < 0 || R >= n) continue;
        let T = u(_ * s + w),
          E = u(R * s + w);
        f[z * s + S] = T + (E - T) * y - v;
      }
    }
  } else {
    let b = h > 0 ? 1 : -1,
      x = c / Math.abs(h),
      v = (a / Math.abs(h)) * l,
      y = x - Math.floor(x),
      M = Math.floor(x);
    for (let S = b > 0 ? n - 2 : 1; b > 0 ? S >= 0 : S < n; S -= b) {
      let w = (S + b) * s;
      for (let z = 0; z < s; z++) {
        let _ = z + M,
          R = _ + 1;
        if (_ < 0 || R >= s) continue;
        let T = u(w + _),
          E = u(w + R);
        f[S * s + z] = T + (E - T) * y - v;
      }
    }
  }
  let d = s * n,
    p = 8 + Math.ceil(d / 2),
    m = e && e.length === p ? e : new Uint32Array(p),
    g = new Float32Array(m.buffer, 0, 8);
  ((m[0] = s),
    (m[1] = n),
    (g[2] = i.x0),
    (g[3] = i.z0),
    (g[4] = 1 / a),
    (m[5] = m[6] = m[7] = 0));
  for (let b = 0; b < d; b += 2) {
    let x = Math.max(0, Math.min(65535, Math.round((f[b] + 64) * 8))),
      v =
        b + 1 < d
          ? Math.max(0, Math.min(65535, Math.round((f[b + 1] + 64) * 8)))
          : 0;
    m[8 + (b >> 1)] = x | (v << 16);
  }
  return { data: m, S: f };
}
var Gr = 1592,
  Wr = 2030,
  Sy = { x0: 1520, x1: 1640, z0: 2072, z1: 2122 },
  mq = [
    { x0: Gr - 34, z0: Wr - 34, x1: Gr + 34, z1: Wr + 34 },
    { x0: Sy.x0 - 6, z0: Sy.z0 - 6, x1: Sy.x1 + 6, z1: Sy.z1 + 6 },
  ],
  Fc = 326,
  HS = 272,
  Wd = (i) => {
    let t = 26.2 - (2.4 * Math.min(i, 240)) / 240;
    return i <= 240 ? t : t - 5.6 * Math.pow((i - 240) / (Fc - 240), 2);
  },
  ub = (i) => 8.5 + 6.5 * Math.pow(i / Fc, 1.6);
function db(i, t, e, s, n, o) {
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
      let x = -r + 2 * r * (b / c);
      a.push([i + m[0] * e + g[0] * x, o, t + m[1] * e + g[1] * x]);
    }
    for (let b = 0; b < l; b++) {
      let x = p - ((b / l) * Math.PI) / 2;
      a.push([i + u * r + Math.cos(x) * s, o, t + d * r + Math.sin(x) * s]);
    }
  }
  return a;
}
var sut = (i) => {
  let t = 0;
  for (let e = 0; e < i.length; e++) {
    let s = i[e],
      n = i[(e + 1) % i.length];
    t += Math.hypot(n[0] - s[0], n[2] - s[2]);
  }
  return t;
};
function gq(i, t) {
  (y7(i, t), w7(i, t));
}
