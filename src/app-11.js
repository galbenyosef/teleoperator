// app 11 — math
// Lines 39590-39911 of readable/app.pretty.js (statement-aligned).
function lW(o) {
  let t = rW(o, "origin"),
    e = t.lon,
    s = t.lat,
    n = o.projection || {};
  if ((n.kind || "equirect") !== "equirect")
    throw new Error(`city ${o.id}: projection ${n.kind} not supported`);
  let i = n.kx ?? Math.round(Math.cos((s * Math.PI) / 180) * 111320),
    a = n.kz ?? 111050,
    r = (d, p) => [(d - e) * i, (s - p) * a],
    l = (d, p) => [e + d / i, s - p / a],
    c = (d) => ({
      x0: d.lon[0] == null ? -1e9 : (d.lon[0] - e) * i,
      x1: d.lon[1] == null ? 1e9 : (d.lon[1] - e) * i,
      z0: d.lat[1] == null ? -1e9 : (s - d.lat[1]) * a,
      z1: d.lat[0] == null ? 1e9 : (s - d.lat[0]) * a,
    }),
    h = c(rW(o, "bounds")),
    f = o.notch ? c(o.notch) : null,
    u = Object.fromEntries(
      Object.entries(o.regions || {}).map(([d, p]) => {
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
    KX: i,
    KZ: a,
    project: r,
    unproject: l,
    BOUNDS: h,
    NOTCH: f,
    REGIONS: u,
  };
}
var rW,
  cW = Ki(() => {
    rW = (o, t) => {
      if (o[t] == null)
        throw new Error(`city ${o.id || "?"}: manifest has no ${t}`);
      return o[t];
    };
  });
function tdt(o) {
  let t = o.proj,
    e = t.lon0,
    s = t.lat0,
    n = t.kx,
    i = t.kz,
    a = (f) => ({
      x0: (f.w - e) * n,
      x1: (f.e - e) * n,
      z0: (s - f.n) * i,
      z1: (s - f.s) * i,
    }),
    r = a(o.bounds),
    l = o.notch,
    c = l ? { x0: -1e9, x1: (l.e - e) * n, z0: (s - l.n) * i, z1: 1e9 } : null,
    h = Object.fromEntries(
      Object.entries(o.regions || {}).map(([f, u]) => [
        f,
        {
          ...u,
          ...(u.skipName ? { skipName: new RegExp(u.skipName) } : {}),
          bounds: u.split
            ? { x0: r.x0, x1: c ? c.x1 : r.x1, z0: r.z0, z1: r.z1 }
            : a(u.bounds),
        },
      ]),
    );
  return {
    LON0: e,
    LAT0: s,
    KX: n,
    KZ: i,
    project: (f, u) => [(f - e) * n, (s - u) * i],
    unproject: (f, u) => [e + f / n, s - u / i],
    BOUNDS: r,
    NOTCH: c,
    REGIONS: h,
  };
}
var B7,
  N7,
  hf,
  V_t,
  W_t,
  q_t,
  j_t,
  ji,
  G5,
  hW,
  nc,
  fW,
  z0,
  _0 = Ki(async () => {
    O7();
    cW();
    await No();
    ((B7 = lW(aW().manifest)),
      (N7 = bi.proj),
      (hf =
        N7 &&
        (Math.abs(N7.lon0 - B7.LON0) > 1e-9 ||
          Math.abs(N7.lat0 - B7.LAT0) > 1e-9)
          ? tdt(bi)
          : B7));
    ((V_t = hf.LON0),
      (W_t = hf.LAT0),
      (q_t = hf.KX),
      (j_t = hf.KZ),
      (ji = hf.project),
      (G5 = hf.unproject),
      (hW = hf.BOUNDS),
      (nc = hf.NOTCH || { x0: 1e9, x1: -1e9, z0: 1e9, z1: -1e9 }),
      (fW = (o, t, e = 0) => !!hf.NOTCH && o < nc.x1 + e && t > nc.z0 - e),
      (z0 = hf.REGIONS));
  });
function Ou(o, t, e) {
  sk.piles.push(o, t, e);
}
function uW(o, t, e, s, n, i) {
  sk.boxes.push([o, t, e, s, n, i]);
}
function dW(o, { cell: t = 3 } = {}) {
  let e = performance.now(),
    s = [],
    n = [],
    i = (_, z) => _ > nc.x1 - 40 && z > hW.z0 - 40;
  for (let _ of o.seawall)
    for (let z = 0; z + 3 < _.length; z += 2)
      (_[z] !== _[z + 2] || _[z + 1] !== _[z + 3]) &&
        i(_[z], _[z + 1]) &&
        i(_[z + 2], _[z + 3]) &&
        s.push(_[z], _[z + 1], _[z + 2], _[z + 3]);
  let a = o.bld,
    r = o.claims?.bSkip;
  for (let _ = 0; _ < (a.nMain ?? a.n); _++) {
    if (a.bB[_ * 5] !== 7 || r?.[_]) continue;
    let z = a.bRing[_],
      A = a.rStart[z],
      T = a.rStart[z + 1],
      E = T - A;
    for (let R = 0; R < E; R++) {
      let P = (A + R) * 2,
        C = (A + ((R + 1) % E)) * 2;
      n.push(a.pts[P], a.pts[P + 1], a.pts[C], a.pts[C + 1]);
    }
  }
  for (let [_, z, A, T, E, R] of sk.boxes) {
    let P = -T,
      C = A,
      I = (F, O) => [_ + A * E * F + P * R * O, z + T * E * F + C * R * O],
      L = [I(-1, -1), I(1, -1), I(1, 1), I(-1, 1)];
    for (let F = 0; F < 4; F++) n.push(...L[F], ...L[(F + 1) % 4]);
  }
  let l = sk.piles,
    c = 1e9,
    h = 1e9,
    f = -1e9,
    u = -1e9,
    d = (_, z) => {
      (_ < c && (c = _), _ > f && (f = _), z < h && (h = z), z > u && (u = z));
    };
  for (let _ = 0; _ < s.length; _ += 2) d(s[_], s[_ + 1]);
  for (let _ = 0; _ < n.length; _ += 2) d(n[_], n[_ + 1]);
  for (let _ = 0; _ < l.length; _ += 3) d(l[_], l[_ + 1]);
  if (c > f) return null;
  ((c = Math.floor((c - ic - 4) / t) * t),
    (h = Math.floor((h - ic - 4) / t) * t));
  let p = Math.ceil((f + ic + 4 - c) / t) + 1,
    m = Math.ceil((u + ic + 4 - h) / t) + 1,
    g = new Float32Array(p * m).fill(ic),
    b = new Float32Array(p * m).fill(ic),
    v = o.terrain.sea,
    x = (_, z) => {
      let A = Math.floor((_ - v.x0) / v.cell),
        T = Math.floor((z - v.z0) / v.cell);
      if (A < 0 || T < 0 || A >= v.nx || T >= v.nz) return 1;
      let E = T * v.nx + A;
      return (v.bits[E >> 5] >>> (E & 31)) & 1;
    },
    y = 0;
  for (let _ = 0; _ < s.length; _ += 4) {
    let z = s[_],
      A = s[_ + 1],
      T = s[_ + 2] - z,
      E = s[_ + 3] - A,
      R = Math.hypot(T, E),
      P = -E / R,
      C = T / R,
      I = z + T / 2,
      L = A + E / 2;
    y += x(I + P * 48, L + C * 48) - x(I - P * 48, L - C * 48);
  }
  let M = y >= 0 ? 1 : -1,
    S = (_, z, A, T, E) => {
      let R = A - _,
        P = T - z,
        C = R * R + P * P || 1e-9,
        I = Math.sqrt(C),
        L = Math.max(0, Math.floor((Math.min(_, A) - ic - c) / t)),
        F = Math.min(p - 1, Math.ceil((Math.max(_, A) + ic - c) / t)),
        O = Math.max(0, Math.floor((Math.min(z, T) - ic - h) / t)),
        B = Math.min(m - 1, Math.ceil((Math.max(z, T) + ic - h) / t));
      for (let H = O; H <= B; H++) {
        let N = h + H * t;
        for (let D = L; D <= F; D++) {
          let U = c + D * t,
            G = Math.max(0, Math.min(1, ((U - _) * R + (N - z) * P) / C)),
            W = U - _ - R * G,
            V = N - z - P * G,
            $ = Math.sqrt(W * W + V * V),
            J = H * p + D;
          ($ < g[J] && (g[J] = $),
            E &&
              $ < Math.abs(b[J]) &&
              (b[J] = ((-P * W + R * V) / I) * M >= 0 ? $ : -$));
        }
      }
    };
  for (let _ = 0; _ < s.length; _ += 4)
    S(s[_], s[_ + 1], s[_ + 2], s[_ + 3], !0);
  for (let _ = 0; _ < n.length; _ += 4)
    S(n[_], n[_ + 1], n[_ + 2], n[_ + 3], !1);
  for (let _ = 0; _ < l.length; _ += 3) {
    let z = l[_],
      A = l[_ + 1],
      T = l[_ + 2],
      E = 14,
      R = Math.max(0, Math.floor((z - E - c) / t)),
      P = Math.min(p - 1, Math.ceil((z + E - c) / t)),
      C = Math.max(0, Math.floor((A - E - h) / t)),
      I = Math.min(m - 1, Math.ceil((A + E - h) / t));
    for (let L = C; L <= I; L++)
      for (let F = R; F <= P; F++) {
        let O = Math.max(0, Math.hypot(c + F * t - z, h + L * t - A) - T),
          B = L * p + F;
        O < g[B] && (g[B] = O);
      }
  }
  let w = new Uint8Array(p * m);
  for (let _ = 0; _ < w.length; _++) {
    let z = b[_] < 0 && -b[_] <= g[_] + 0.001 ? -g[_] : g[_];
    w[_] = Math.max(0, Math.min(255, Math.round((0.5 + z / (2 * ic)) * 255)));
  }
  return {
    data: w,
    w: p,
    h: m,
    x0: c,
    z0: h,
    cell: t,
    range: ic,
    ms: Math.round(performance.now() - e),
  };
}
var sk,
  ic,
  Pb = Ki(async () => {
    await _0();
    sk = { piles: [], boxes: [] };
    ic = 32;
  });
function zs(
  o,
  t,
  e,
  s,
  n,
  i,
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
    (h[0] && o.wall(n, s, t, s, e, e, i, i, r),
    h[1] && o.wall(n, a, n, s, e, e, i, i, r),
    h[2] && o.wall(t, a, n, a, e, e, i, i, r),
    h[3] && o.wall(t, s, t, a, e, e, i, i, r),
    c)
  ) {
    let u = f || r;
    o.quad(
      [t, i, a],
      [n, i, a],
      [n, i, s],
      [t, i, s],
      [t, a],
      [n, a],
      [n, s],
      [t, s],
      u,
      [0, 1, 0],
    );
  }
  l &&
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
    );
}
