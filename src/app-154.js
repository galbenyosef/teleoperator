// app 154 — math
// Lines 96073-96414 of readable/app.pretty.js (statement-aligned).
function R$(o) {
  let t = {},
    e = new Set();
  for (let s of o.juns) {
    if (!s.legs.some(([r]) => v$(r))) continue;
    let n = s.legs
      .filter(
        ([r]) =>
          !r.elev &&
          !r.sunk &&
          r.hwy &&
          Rw(r) &&
          !r.inner &&
          !r.region &&
          r.n >= 2 &&
          r.L > 6,
      )
      .map(([r]) => r);
    if (n.length !== 2 || s.legs.length !== 3) continue;
    {
      let [r, l] = n,
        c = 0;
      for (let h = 0; h < r.n; h++) {
        if ((ys(l, r.P[h * 3], r.P[h * 3 + 1], t), t.d > r.W[h] + t.w - 0.25))
          continue;
        let f = Math.abs(t.y - r.P[h * 3 + 2]);
        f <= kC && (c = Math.max(c, f));
      }
      if (c < 0.15) continue;
    }
    for (let r of n) Tp(r, SC);
    let i = new Map(
        n.map((r) => [
          r,
          Float64Array.from({ length: r.n }, (l, c) => r.P[c * 3 + 2]),
        ]),
      ),
      a = new Map(n.map((r) => [r, new Uint8Array(r.n)]));
    for (let r = 0; r < 8; r++) {
      let l = new Map(),
        c = 0;
      for (let h of n) {
        let f = new Float64Array(h.n),
          u = h.ja === s.id ? h.n - 1 : 0;
        for (let d = 0; d < h.n; d++) {
          let p = h.P[d * 3],
            m = h.P[d * 3 + 1],
            g = h.P[d * 3 + 2],
            b = Math.min(d, h.n - 2),
            v = g,
            x = 1;
          if (d === u) {
            f[d] = g;
            continue;
          }
          for (let y of n) {
            if (
              y === h ||
              (ys(y, p, m, t),
              t.d > h.W[d] + t.w - 0.25 || Math.abs(t.y - g) > kC)
            )
              continue;
            let M = Math.min(t.k, y.n - 2);
            Math.abs(
              h.D[b * 2] * y.D[M * 2] + h.D[b * 2 + 1] * y.D[M * 2 + 1],
            ) < 0.6 || ((v += t.y), x++);
          }
          ((f[d] = v / x),
            x > 1 && (a.get(h)[d] = 1),
            (c = Math.max(c, Math.abs(f[d] - g))));
        }
        l.set(h, f);
      }
      for (let h of n) {
        let f = l.get(h);
        for (let u = 0; u < h.n; u++) h.P[u * 3 + 2] = f[u];
      }
      if (c < 0.002) break;
    }
    for (let r of n) {
      let l = a.get(r);
      if (!l.some((m) => m)) continue;
      let c = i.get(r),
        h = r.n,
        f = r.ja === s.id ? 0 : h - 1,
        u = -1;
      if (f === 0) for (let m = 0; m < h; m++) l[m] && (u = m);
      else for (let m = h - 1; m >= 0; m--) l[m] && (u = m);
      let d = r.P[u * 3 + 2] - c[u],
        p = Math.min(
          Math.max(15, Math.abs(d) / 0.035),
          Math.abs(r.S[h - 1 - f] - r.S[u]),
        );
      for (let m = 0; m < h; m++) {
        if (l[m]) continue;
        let g = Math.abs(r.S[m] - r.S[u]);
        (f === 0) != m < u &&
          (r.P[m * 3 + 2] = c[m] + (g < p ? d * (1 - $u(g / p)) : 0));
      }
      for (let m = 0; m < h; m++)
        (f === 0) == m < u && !l[m] && (r.P[m * 3 + 2] = r.P[u * 3 + 2]);
      (e.add(r), (r._merged = !0));
    }
    if (e.size) {
      let r = n.map((c) => c.P[(c.ja === s.id ? 0 : c.n - 1) * 3 + 2]),
        l = r.reduce((c, h) => c + h, 0) / r.length;
      Math.max(...r) - Math.min(...r) < 0.05 && (s.y = l);
    }
  }
  for (let s of e) (o.embank ||= []).push(s);
  return e.size;
}
var _i = 256,
  ju = (o, t) => `${Math.floor(o / _i)},${Math.floor(t / _i)}`,
  T0 = 32,
  Aw = (o, t) => (o * 73856093) ^ (t * 19349663),
  Al = {
    noCrossA: 1,
    noCrossB: 2,
    noPark: 4,
    oneway: 8,
    cable: 16,
    tram: 32,
    elevated: 64,
    inner: 128,
  },
  vmt = 0.08,
  ymt = 12,
  wmt = 0.015;
function Mmt(o) {
  if (o.layered || o.inner || o.n < 3 || o.s1 - o.s0 < 1) return 0;
  let t = o.P,
    e = o.S,
    s = o.W,
    n = o.n,
    i = new Float64Array(n - 1);
  for (let p = 0; p + 1 < n; p++)
    i[p] = (t[p * 3 + 5] - t[p * 3 + 2]) / Math.max(1e-6, e[p + 1] - e[p]);
  let a = new Float64Array(n),
    r = 0;
  for (let p = 1; p + 1 < n; p++) {
    let m = i[p] - i[p - 1];
    if (Math.abs(m) < wmt || e[p] <= o.s0 + 0.05 || e[p] >= o.s1 - 0.05)
      continue;
    let g = Math.min(ymt / 2, (vmt * 4) / Math.abs(m));
    ((g = Math.min(
      g,
      e[p] - o.s0,
      o.s1 - e[p],
      (e[p] - e[p - 1]) * (p - 1 >= 1 ? 0.5 : 1),
      (e[p + 1] - e[p]) * (p + 1 <= n - 2 ? 0.5 : 1),
    )),
      g > 0.2 && ((a[p] = g), r++));
  }
  if (!r) return 0;
  let l = [],
    c = [],
    h = (p, m) => {
      let g = (m - e[p]) / Math.max(1e-9, e[p + 1] - e[p]);
      return [
        t[p * 3] + (t[p * 3 + 3] - t[p * 3]) * g,
        t[p * 3 + 1] + (t[p * 3 + 4] - t[p * 3 + 1]) * g,
        s[p] + (s[p + 1] - s[p]) * g,
      ];
    };
  for (let p = 0; p < n; p++) {
    if (!a[p]) {
      let M = l.length;
      (M &&
        Math.abs(l[M - 3] - t[p * 3]) + Math.abs(l[M - 2] - t[p * 3 + 1]) <
          1e-4) ||
        (l.push(t[p * 3], t[p * 3 + 1], t[p * 3 + 2]), c.push(s[p]));
      continue;
    }
    let m = a[p],
      g = 2 * m,
      b = i[p - 1],
      v = i[p],
      x = t[p * 3 + 2] - b * m,
      y = Math.max(4, Math.ceil(g / 0.75));
    for (let M = 0; M <= y; M++) {
      let S = (g * M) / y,
        w = e[p] - m + S,
        [_, z, A] = w <= e[p] ? h(p - 1, w) : h(p, w),
        T = l.length;
      (T && Math.abs(l[T - 3] - _) + Math.abs(l[T - 2] - z) < 1e-4) ||
        (l.push(_, z, x + b * S + ((v - b) / (2 * g)) * S * S), c.push(A));
    }
  }
  ((o.P = new Float32Array(l)), (o.W = new Float32Array(c)));
  let f = o.s0,
    u = o.s1,
    d = o.L;
  return (
    Tr(o),
    (o.ta = o.ta * (o.L / d)),
    (o.tb = o.tb * (o.L / d)),
    (o.s0 = f * (o.L / d)),
    (o.s1 = o.L - (d - u) * (o.L / d)),
    r
  );
}
function Smt(o) {
  let s = (o.cover = new Uint8Array(o.cover));
  for (let n = -7140; n <= -5020; n += o.step) {
    let i = Math.round((n - o.x0) / o.step);
    if (i < 0 || i >= o.nx) continue;
    let a = -1;
    for (let r = -1e3; r >= -1300; r -= o.step) {
      let l = Math.round((r - o.z0) / o.step);
      if (!(l < 0 || l >= o.nz) && s[l * o.nx + i] & 8) {
        a = l;
        break;
      }
    }
    if (!(a < 0)) {
      for (let r = 1; r <= 10; r++) {
        let l = a + r,
          c = l * o.nx + i;
        if (l >= o.nz) break;
        let h = s[c];
        if (h & 16 || h & 8) break;
        let f = 0.35 + (r * o.step) / 12;
        (o.h[c] > f && (o.h[c] = r === 10 ? (o.h[c] + f) / 2 : f),
          (h & 15) <= 3 && (s[c] = (h & -16) | 3));
      }
      for (let r = 0; r < 5; r++) {
        let l = a - r,
          c = l * o.nx + i;
        if (l < 0) break;
        o.h[c] = Math.max(o.h[c], -0.25 - r * 0.55);
      }
    }
  }
}
function P$(o) {
  let t = o.meta,
    e = new Float32Array(o.h.length);
  for (let s = 0; s < e.length; s++) e[s] = o.h[s] * t.hScale + t.hOff;
  return {
    x0: t.x0,
    z0: t.z0,
    step: t.step,
    nx: t.nx,
    nz: t.nz,
    h: e,
    cover: o.cover,
    bounds: t.bounds,
    sea: t.sea,
  };
}
function kmt(o, t) {
  let e = t.meta.names,
    s = t.meta.classes,
    n = t.meta.districts,
    i = o.edges.length,
    a = o.juns.length;
  for (let r = 0; r + 1 < t.eStart.length; r++) {
    let l = t.eStart[r],
      c = t.eStart[r + 1],
      h = {
        id: i + r,
        sid: t.eSeed ? t.eSeed[r] : i + r,
        P: t.pts.subarray(l * 3, c * 3),
        W: t.pw.subarray(l, c),
      };
    Tr(h);
    let f = t.eF,
      u = t.eI,
      d = t.eB,
      p = (m) => (m >= 0 ? m + a : m);
    (Object.assign(h, {
      ta: f[r * 6],
      tb: f[r * 6 + 1],
      sw: f[r * 6 + 2],
      laneW: f[r * 6 + 3],
      maxspeed: f[r * 6 + 4],
      ja: p(u[r * 5]),
      jb: p(u[r * 5 + 1]),
      name: u[r * 5 + 2] ? e[u[r * 5 + 2] - 1] : "",
      way: u[r * 5 + 3],
      dist: n[u[r * 5 + 4]] || "",
      rank: d[r * 7] / 2,
      lanes: d[r * 7 + 1],
      flags: d[r * 7 + 2],
      cls: s[d[r * 7 + 3]],
      median: d[r * 7 + 4] & 1,
      trolley: !!(d[r * 7 + 4] & 2),
      stops: d[r * 7 + 5],
      layer: d[r * 7 + 6] - 128,
    }),
      (h.elev = !!(h.flags & Al.elevated)),
      (h.inner = !!(h.flags & Al.inner)),
      (h.oneway = !!(h.flags & Al.oneway)),
      (h.sunk = h.layer < 0),
      (h.layered = h.elev || h.sunk),
      (h.hwy = h.cls === "motorway" || h.cls === "motorway_link"),
      (h.s0 = h.ta),
      (h.s1 = h.L - h.tb),
      o.region && (h.region = o.region),
      o.edges.push(h));
  }
  for (let r = 0; r + 1 < t.jRing.length; r++) {
    let l = {
      id: a + r,
      x: t.jF[r * 3],
      z: t.jF[r * 3 + 1],
      y: t.jF[r * 3 + 2],
      type: ["end", "x", "j"][t.jB[r * 2]],
      ctl: t.jB[r * 2 + 1],
      rings: [],
      polys: [],
    };
    o.region && (l.region = o.region);
    let c = null;
    for (let p = t.jRing[r]; p < t.jRing[r + 1]; p++) {
      let m = t.rStart[p],
        g = t.rStart[p + 1],
        b = {
          pts: t.rPts.subarray(m * 2, g * 2),
          y: t.rY.subarray(m, g),
          hole: !!t.rHole[p],
        };
      (l.rings.push(b), b.hole ? c && c.push(b) : ((c = [b]), l.polys.push(c)));
    }
    l.flat =
      l.type === "x" &&
      l.rings.every((p) => p.y.every((m) => Math.abs(m - l.y) < 0.001));
    let h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let p of l.rings)
      for (let m = 0; m < p.pts.length; m += 2)
        ((h = Math.min(h, p.pts[m])),
          (u = Math.max(u, p.pts[m])),
          (f = Math.min(f, p.pts[m + 1])),
          (d = Math.max(d, p.pts[m + 1])));
    ((l.bb = [h, f, u, d]), (l.legs = []), o.juns.push(l));
  }
}
var Jk = ["terrain.bin", "buildings.bin", "props.bin"];
