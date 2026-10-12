// app 155 — math
// Lines 95803-96144 of readable/app.pretty.js (statement-aligned).
function Ej(i) {
  let t = {},
    e = new Set();
  for (let s of i.juns) {
    if (!s.legs.some(([r]) => bj(r))) continue;
    let n = s.legs
      .filter(
        ([r]) =>
          !r.elev &&
          !r.sunk &&
          r.hwy &&
          Fy(r) &&
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
        if ((vs(l, r.P[h * 3], r.P[h * 3 + 1], t), t.d > r.W[h] + t.w - 0.25))
          continue;
        let f = Math.abs(t.y - r.P[h * 3 + 2]);
        f <= $7 && (c = Math.max(c, f));
      }
      if (c < 0.15) continue;
    }
    for (let r of n) Yd(r, V7);
    let o = new Map(
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
            x = g,
            v = 1;
          if (d === u) {
            f[d] = g;
            continue;
          }
          for (let y of n) {
            if (
              y === h ||
              (vs(y, p, m, t),
              t.d > h.W[d] + t.w - 0.25 || Math.abs(t.y - g) > $7)
            )
              continue;
            let M = Math.min(t.k, y.n - 2);
            Math.abs(
              h.D[b * 2] * y.D[M * 2] + h.D[b * 2 + 1] * y.D[M * 2 + 1],
            ) < 0.6 || ((x += t.y), v++);
          }
          ((f[d] = x / v),
            v > 1 && (a.get(h)[d] = 1),
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
      let c = o.get(r),
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
          (r.P[m * 3 + 2] = c[m] + (g < p ? d * (1 - fu(g / p)) : 0));
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
  for (let s of e) (i.embank ||= []).push(s);
  return e.size;
}
var ui = 256,
  hu = (i, t) => `${Math.floor(i / ui)},${Math.floor(t / ui)}`,
  d0 = 32,
  Ny = (i, t) => (i * 73856093) ^ (t * 19349663),
  ll = {
    noCrossA: 1,
    noCrossB: 2,
    noPark: 4,
    oneway: 8,
    cable: 16,
    tram: 32,
    elevated: 64,
    inner: 128,
  },
  Jut = 0.08,
  Zut = 12,
  Qut = 0.015;
function tdt(i) {
  if (i.layered || i.inner || i.n < 3 || i.s1 - i.s0 < 1) return 0;
  let t = i.P,
    e = i.S,
    s = i.W,
    n = i.n,
    o = new Float64Array(n - 1);
  for (let p = 0; p + 1 < n; p++)
    o[p] = (t[p * 3 + 5] - t[p * 3 + 2]) / Math.max(1e-6, e[p + 1] - e[p]);
  let a = new Float64Array(n),
    r = 0;
  for (let p = 1; p + 1 < n; p++) {
    let m = o[p] - o[p - 1];
    if (Math.abs(m) < Qut || e[p] <= i.s0 + 0.05 || e[p] >= i.s1 - 0.05)
      continue;
    let g = Math.min(Zut / 2, (Jut * 4) / Math.abs(m));
    ((g = Math.min(
      g,
      e[p] - i.s0,
      i.s1 - e[p],
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
      b = o[p - 1],
      x = o[p],
      v = t[p * 3 + 2] - b * m,
      y = Math.max(4, Math.ceil(g / 0.75));
    for (let M = 0; M <= y; M++) {
      let S = (g * M) / y,
        w = e[p] - m + S,
        [z, _, R] = w <= e[p] ? h(p - 1, w) : h(p, w),
        T = l.length;
      (T && Math.abs(l[T - 3] - z) + Math.abs(l[T - 2] - _) < 1e-4) ||
        (l.push(z, _, v + b * S + ((x - b) / (2 * g)) * S * S), c.push(R));
    }
  }
  ((i.P = new Float32Array(l)), (i.W = new Float32Array(c)));
  let f = i.s0,
    u = i.s1,
    d = i.L;
  return (
    dr(i),
    (i.ta = i.ta * (i.L / d)),
    (i.tb = i.tb * (i.L / d)),
    (i.s0 = f * (i.L / d)),
    (i.s1 = i.L - (d - u) * (i.L / d)),
    r
  );
}
function edt(i) {
  let s = (i.cover = new Uint8Array(i.cover));
  for (let n = -7140; n <= -5020; n += i.step) {
    let o = Math.round((n - i.x0) / i.step);
    if (o < 0 || o >= i.nx) continue;
    let a = -1;
    for (let r = -1e3; r >= -1300; r -= i.step) {
      let l = Math.round((r - i.z0) / i.step);
      if (!(l < 0 || l >= i.nz) && s[l * i.nx + o] & 8) {
        a = l;
        break;
      }
    }
    if (!(a < 0)) {
      for (let r = 1; r <= 10; r++) {
        let l = a + r,
          c = l * i.nx + o;
        if (l >= i.nz) break;
        let h = s[c];
        if (h & 16 || h & 8) break;
        let f = 0.35 + (r * i.step) / 12;
        (i.h[c] > f && (i.h[c] = r === 10 ? (i.h[c] + f) / 2 : f),
          (h & 15) <= 3 && (s[c] = (h & -16) | 3));
      }
      for (let r = 0; r < 5; r++) {
        let l = a - r,
          c = l * i.nx + o;
        if (l < 0) break;
        i.h[c] = Math.max(i.h[c], -0.25 - r * 0.55);
      }
    }
  }
}
function Aj(i) {
  let t = i.meta,
    e = new Float32Array(i.h.length);
  for (let s = 0; s < e.length; s++) e[s] = i.h[s] * t.hScale + t.hOff;
  return {
    x0: t.x0,
    z0: t.z0,
    step: t.step,
    nx: t.nx,
    nz: t.nz,
    h: e,
    cover: i.cover,
    bounds: t.bounds,
    sea: t.sea,
  };
}
function sdt(i, t) {
  let e = t.meta.names,
    s = t.meta.classes,
    n = t.meta.districts,
    o = i.edges.length,
    a = i.juns.length;
  for (let r = 0; r + 1 < t.eStart.length; r++) {
    let l = t.eStart[r],
      c = t.eStart[r + 1],
      h = {
        id: o + r,
        sid: t.eSeed ? t.eSeed[r] : o + r,
        P: t.pts.subarray(l * 3, c * 3),
        W: t.pw.subarray(l, c),
      };
    dr(h);
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
      (h.elev = !!(h.flags & ll.elevated)),
      (h.inner = !!(h.flags & ll.inner)),
      (h.oneway = !!(h.flags & ll.oneway)),
      (h.sunk = h.layer < 0),
      (h.layered = h.elev || h.sunk),
      (h.hwy = h.cls === "motorway" || h.cls === "motorway_link"),
      (h.s0 = h.ta),
      (h.s1 = h.L - h.tb),
      i.region && (h.region = i.region),
      i.edges.push(h));
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
    i.region && (l.region = i.region);
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
    ((l.bb = [h, f, u, d]), (l.legs = []), i.juns.push(l));
  }
}
var JS = ["terrain.bin", "buildings.bin", "props.bin"];
