// app 11 — math
// Lines 39555-39870 of readable/app.pretty.js (statement-aligned).
function aG(i) {
  let t = oG(i, "origin"),
    e = t.lon,
    s = t.lat,
    n = i.projection || {};
  if ((n.kind || "equirect") !== "equirect")
    throw new Error(`city ${i.id}: projection ${n.kind} not supported`);
  let o = n.kx ?? Math.round(Math.cos((s * Math.PI) / 180) * 111320),
    a = n.kz ?? 111050,
    r = (d, p) => [(d - e) * o, (s - p) * a],
    l = (d, p) => [e + d / o, s - p / a],
    c = (d) => ({
      x0: d.lon[0] == null ? -1e9 : (d.lon[0] - e) * o,
      x1: d.lon[1] == null ? 1e9 : (d.lon[1] - e) * o,
      z0: d.lat[1] == null ? -1e9 : (s - d.lat[1]) * a,
      z1: d.lat[0] == null ? 1e9 : (s - d.lat[0]) * a,
    }),
    h = c(oG(i, "bounds")),
    f = i.notch ? c(i.notch) : null,
    u = Object.fromEntries(
      Object.entries(i.regions || {}).map(([d, p]) => {
        let m = { dir: p.dir || d + "/" };
        return (
          p.split && (m.split = !0),
          p.skipName && (m.skipName = new RegExp(p.skipName)),
          (m.bounds = c(p.bounds)),
          [d, m]
        );
      }),
    );
  return {
    LON0: e,
    LAT0: s,
    KX: o,
    KZ: a,
    project: r,
    unproject: l,
    BOUNDS: h,
    NOTCH: f,
    REGIONS: u,
  };
}
var oG,
  rG = Vi(() => {
    oG = (i, t) => {
      if (i[t] == null)
        throw new Error(`city ${i.id || "?"}: manifest has no ${t}`);
      return i[t];
    };
  });
var tu,
  $8t,
  X8t,
  K8t,
  Y8t,
  Gi,
  $5,
  lG,
  el,
  cG,
  h0,
  f0 = Vi(() => {
    lR();
    rG();
    ((tu = aG(iG().manifest)),
      ($8t = tu.LON0),
      (X8t = tu.LAT0),
      (K8t = tu.KX),
      (Y8t = tu.KZ),
      (Gi = tu.project),
      ($5 = tu.unproject),
      (lG = tu.BOUNDS),
      (el = tu.NOTCH),
      (cG = (i, t, e = 0) => !!el && i < el.x1 + e && t > el.z0 - e),
      (h0 = tu.REGIONS));
  });
function eu(i, t, e) {
  tS.piles.push(i, t, e);
}
function hG(i, t, e, s, n, o) {
  tS.boxes.push([i, t, e, s, n, o]);
}
function fG(i, { cell: t = 3 } = {}) {
  let e = performance.now(),
    s = [],
    n = [],
    o = (z, _) => z > el.x1 - 40 && _ > lG.z0 - 40;
  for (let z of i.seawall)
    for (let _ = 0; _ + 3 < z.length; _ += 2)
      (z[_] !== z[_ + 2] || z[_ + 1] !== z[_ + 3]) &&
        o(z[_], z[_ + 1]) &&
        o(z[_ + 2], z[_ + 3]) &&
        s.push(z[_], z[_ + 1], z[_ + 2], z[_ + 3]);
  let a = i.bld,
    r = i.claims?.bSkip;
  for (let z = 0; z < (a.nMain ?? a.n); z++) {
    if (a.bB[z * 5] !== 7 || r?.[z]) continue;
    let _ = a.bRing[z],
      R = a.rStart[_],
      T = a.rStart[_ + 1],
      E = T - R;
    for (let A = 0; A < E; A++) {
      let C = (R + A) * 2,
        P = (R + ((A + 1) % E)) * 2;
      n.push(a.pts[C], a.pts[C + 1], a.pts[P], a.pts[P + 1]);
    }
  }
  for (let [z, _, R, T, E, A] of tS.boxes) {
    let C = -T,
      P = R,
      I = (F, N) => [z + R * E * F + C * A * N, _ + T * E * F + P * A * N],
      L = [I(-1, -1), I(1, -1), I(1, 1), I(-1, 1)];
    for (let F = 0; F < 4; F++) n.push(...L[F], ...L[(F + 1) % 4]);
  }
  let l = tS.piles,
    c = 1e9,
    h = 1e9,
    f = -1e9,
    u = -1e9,
    d = (z, _) => {
      (z < c && (c = z), z > f && (f = z), _ < h && (h = _), _ > u && (u = _));
    };
  for (let z = 0; z < s.length; z += 2) d(s[z], s[z + 1]);
  for (let z = 0; z < n.length; z += 2) d(n[z], n[z + 1]);
  for (let z = 0; z < l.length; z += 3) d(l[z], l[z + 1]);
  if (c > f) return null;
  ((c = Math.floor((c - Bl - 4) / t) * t),
    (h = Math.floor((h - Bl - 4) / t) * t));
  let p = Math.ceil((f + Bl + 4 - c) / t) + 1,
    m = Math.ceil((u + Bl + 4 - h) / t) + 1,
    g = new Float32Array(p * m).fill(Bl),
    b = new Float32Array(p * m).fill(Bl),
    x = i.terrain.sea,
    v = (z, _) => {
      let R = Math.floor((z - x.x0) / x.cell),
        T = Math.floor((_ - x.z0) / x.cell);
      if (R < 0 || T < 0 || R >= x.nx || T >= x.nz) return 1;
      let E = T * x.nx + R;
      return (x.bits[E >> 5] >>> (E & 31)) & 1;
    },
    y = 0;
  for (let z = 0; z < s.length; z += 4) {
    let _ = s[z],
      R = s[z + 1],
      T = s[z + 2] - _,
      E = s[z + 3] - R,
      A = Math.hypot(T, E),
      C = -E / A,
      P = T / A,
      I = _ + T / 2,
      L = R + E / 2;
    y += v(I + C * 48, L + P * 48) - v(I - C * 48, L - P * 48);
  }
  let M = y >= 0 ? 1 : -1,
    S = (z, _, R, T, E) => {
      let A = R - z,
        C = T - _,
        P = A * A + C * C || 1e-9,
        I = Math.sqrt(P),
        L = Math.max(0, Math.floor((Math.min(z, R) - Bl - c) / t)),
        F = Math.min(p - 1, Math.ceil((Math.max(z, R) + Bl - c) / t)),
        N = Math.max(0, Math.floor((Math.min(_, T) - Bl - h) / t)),
        B = Math.min(m - 1, Math.ceil((Math.max(_, T) + Bl - h) / t));
      for (let H = N; H <= B; H++) {
        let O = h + H * t;
        for (let D = L; D <= F; D++) {
          let U = c + D * t,
            G = Math.max(0, Math.min(1, ((U - z) * A + (O - _) * C) / P)),
            q = U - z - A * G,
            W = O - _ - C * G,
            V = Math.sqrt(q * q + W * W),
            Y = H * p + D;
          (V < g[Y] && (g[Y] = V),
            E &&
              V < Math.abs(b[Y]) &&
              (b[Y] = ((-C * q + A * W) / I) * M >= 0 ? V : -V));
        }
      }
    };
  for (let z = 0; z < s.length; z += 4)
    S(s[z], s[z + 1], s[z + 2], s[z + 3], !0);
  for (let z = 0; z < n.length; z += 4)
    S(n[z], n[z + 1], n[z + 2], n[z + 3], !1);
  for (let z = 0; z < l.length; z += 3) {
    let _ = l[z],
      R = l[z + 1],
      T = l[z + 2],
      E = 14,
      A = Math.max(0, Math.floor((_ - E - c) / t)),
      C = Math.min(p - 1, Math.ceil((_ + E - c) / t)),
      P = Math.max(0, Math.floor((R - E - h) / t)),
      I = Math.min(m - 1, Math.ceil((R + E - h) / t));
    for (let L = P; L <= I; L++)
      for (let F = A; F <= C; F++) {
        let N = Math.max(0, Math.hypot(c + F * t - _, h + L * t - R) - T),
          B = L * p + F;
        N < g[B] && (g[B] = N);
      }
  }
  let w = new Uint8Array(p * m);
  for (let z = 0; z < w.length; z++) {
    let _ = b[z] < 0 && -b[z] <= g[z] + 0.001 ? -g[z] : g[z];
    w[z] = Math.max(0, Math.min(255, Math.round((0.5 + _ / (2 * Bl)) * 255)));
  }
  return {
    data: w,
    w: p,
    h: m,
    x0: c,
    z0: h,
    cell: t,
    range: Bl,
    ms: Math.round(performance.now() - e),
  };
}
var tS,
  Bl,
  Gg = Vi(() => {
    f0();
    tS = { piles: [], boxes: [] };
    Bl = 32;
  });
function Ms(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  {
    bottom: l = !1,
    top: c = !0,
    sides: h = [1, 1, 1, 1],
    topCol: f = null,
  } = {},
) {
  if (
    (h[0] && i.wall(n, s, t, s, e, e, o, o, r),
    h[1] && i.wall(n, a, n, s, e, e, o, o, r),
    h[2] && i.wall(t, a, n, a, e, e, o, o, r),
    h[3] && i.wall(t, s, t, a, e, e, o, o, r),
    c)
  ) {
    let u = f || r;
    i.quad(
      [t, o, a],
      [n, o, a],
      [n, o, s],
      [t, o, s],
      [t, a],
      [n, a],
      [n, s],
      [t, s],
      u,
      [0, 1, 0],
    );
  }
  l &&
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
    );
}
function eS(i, t, e) {
  let s = [0, 1, 2].map((u) =>
      [...new Set(t.flatMap((d) => [d[u], d[u + 3]]))].sort((d, p) => d - p),
    ),
    [n, o, a] = s,
    r = o.length - 1,
    l = a.length - 1,
    c = new Set(),
    h = (u, d, p) => (u * r + d) * l + p;
  for (let u = 0; u + 1 < n.length; u++)
    for (let d = 0; d + 1 < o.length; d++)
      for (let p = 0; p + 1 < a.length; p++) {
        let m = [
          (n[u] + n[u + 1]) / 2,
          (o[d] + o[d + 1]) / 2,
          (a[p] + a[p + 1]) / 2,
        ];
        t.some((g) => m.every((b, x) => b > g[x] && b < g[x + 3])) &&
          c.add(h(u, d, p));
      }
  let f = (u, d, p) =>
    u >= 0 &&
    d >= 0 &&
    p >= 0 &&
    u < n.length - 1 &&
    d < r &&
    p < l &&
    c.has(h(u, d, p));
  for (let u = 0; u + 1 < n.length; u++)
    for (let d = 0; d < r; d++)
      for (let p = 0; p < l; p++)
        f(u, d, p) &&
          Ms(i, n[u], o[d], a[p], n[u + 1], o[d + 1], a[p + 1], e, {
            bottom: !f(u, d - 1, p),
            top: !f(u, d + 1, p),
            sides: [
              !f(u, d, p - 1),
              !f(u + 1, d, p),
              !f(u, d, p + 1),
              !f(u - 1, d, p),
            ],
          });
}
