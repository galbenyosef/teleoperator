// app 99 — math
// Lines 78196-78520 of readable/app.pretty.js (statement-aligned).
var bft = [
    {
      key: "broadway",
      name: "Broadway",
      a: [-1565, -188],
      b: [-2142, -94],
      twin: !0,
      shape: "arch",
      col: [0.8, 0.7, 0.44],
      glow: [1, 0.86, 0.6],
      portals: !0,
    },
    {
      key: "stockton",
      name: "Stockton Street",
      a: [-1200.9, 582.7],
      b: [-1244.8, 308.9],
      mid: [[-1230.1, 400.9]],
      twin: !1,
      shape: "arch",
      spring: 3,
      rise: 1.5,
      col: [0.8, 0.77, 0.7],
      glow: [1, 0.62, 0.3],
      portals: !0,
    },
    {
      key: "gearyMasonic",
      name: "Geary Boulevard",
      a: [-4757, 1455],
      b: [-4594, 1444],
      twin: !0,
      shape: "box",
      col: [0.56, 0.55, 0.52],
      glow: [0.95, 0.95, 0.9],
      portals: !0,
    },
    {
      key: "macarthurN",
      name: "Veterans Boulevard",
      a: [-6694, 327],
      b: [-6688, -70],
      oneway: !0,
      left: 3.3,
      shape: "box",
      box: 6,
      col: [0.74, 0.64, 0.44],
      glow: [1, 0.78, 0.45],
      portals: !0,
    },
    {
      key: "macarthurS",
      name: "Veterans Boulevard",
      a: [-6695, -70],
      b: [-6701, 327],
      oneway: !0,
      left: 3.3,
      shape: "box",
      box: 6,
      col: [0.74, 0.64, 0.44],
      glow: [1, 0.78, 0.45],
      portals: !0,
    },
    {
      key: "waldoN",
      name: "Redwood Highway",
      a: [-8100, -5299],
      b: [-8162, -5600],
      oneway: !0,
      shape: "arch",
      col: [0.78, 0.76, 0.7],
      glow: [1, 0.86, 0.62],
      portals: !0,
      rainbow: !0,
    },
    {
      key: "waldoS",
      name: "Redwood Highway",
      a: [-8194, -5593],
      b: [-8132, -5293],
      oneway: !0,
      shape: "arch",
      col: [0.78, 0.76, 0.7],
      glow: [1, 0.86, 0.62],
      portals: !0,
      rainbow: !0,
    },
    {
      key: "gearyFillmoreW",
      name: "Geary Boulevard",
      a: [-3458.4, 1231.4],
      b: [-3483.9, 1235.5],
      oneway: !0,
      open: !0,
    },
    {
      key: "gearyFillmoreE",
      name: "Geary Boulevard",
      a: [-3481.8, 1248.3],
      b: [-3456.3, 1244.3],
      oneway: !0,
      open: !0,
    },
  ],
  xft = 3.9,
  vft = 2,
  yft = 5,
  lo = 1,
  Ic = (i) => i.spring ?? xft,
  Wl = (i) => i.rise ?? vft,
  IS = [0.5, 0.47, 0.42, 0],
  ib = [0.6, 0.57, 0.51, 0],
  au = (i) => i.box || yft,
  FS = (i) => (i.shape === "box" ? au(i) : Ic(i) + Wl(i)) + 0.5,
  Lc = 14,
  FW = (i, t, e, s) => {
    let n = null,
      o = s;
    for (let a of i.juns) {
      let r = Math.hypot(a.x - t, a.z - e);
      r < o && ((o = r), (n = a));
    }
    return n;
  };
function wft(i, t) {
  let e = 1e9,
    s = -1e9,
    n = 1e9,
    o = -1e9;
  for (let f = 0; f < t.n; f++)
    ((e = Math.min(e, t.P[f * 3])),
      (s = Math.max(s, t.P[f * 3])),
      (n = Math.min(n, t.P[f * 3 + 1])),
      (o = Math.max(o, t.P[f * 3 + 1])));
  let a = i.edges.filter(
    (f) =>
      f !== t &&
      f.elev &&
      f.layered &&
      !f.tunnel &&
      !f.inner &&
      (() => {
        for (let u = 0; u < f.n; u++) {
          let d = f.P[u * 3],
            p = f.P[u * 3 + 1];
          if (d > e - 20 && d < s + 20 && p > n - 20 && p < o + 20) return !0;
        }
        return !1;
      })(),
  );
  if (!a.length) return 0;
  for (let f of a)
    for (let u of [0, 1]) {
      let d = i.juns[u ? f.jb : f.ja];
      if (!d) continue;
      let p = u ? f.n - 1 : 0,
        m = d.y - f.P[p * 3 + 2];
      if (!(Math.abs(m) < 0.05 || Math.abs(m) > 1))
        for (let g = 0; g < f.n; g++) {
          let b = u ? f.L - f.S[g] : f.S[g];
          b < 8 &&
            (f.P[g * 3 + 2] +=
              m * (1 - b / 8) * (1 - b / 8) * (3 - 2 * (1 - b / 8)));
        }
    }
  let r = {},
    l = [];
  for (let f = 1; f + 1 < t.n; f++) {
    let u = t.P[f * 3],
      d = t.P[f * 3 + 1],
      p = t.P[f * 3 + 2];
    for (let m of a)
      (vs(m, u, d, r),
        r.d <= r.w + t.W[f] &&
          r.s > 0.01 &&
          r.s < m.L - 0.01 &&
          r.y > p - 0.5 &&
          r.y - p < 4.6 &&
          l.push([t.S[f], r.y - 4.8]));
  }
  if (!l.length) return 0;
  let c = 0,
    h = new Float32Array(t.n);
  for (let f = 1; f + 1 < t.n; f++) {
    let u = t.P[f * 3 + 2];
    for (let [d, p] of l) u = Math.min(u, p + 0.08 * Math.abs(t.S[f] - d));
    u < t.P[f * 3 + 2] - 0.01 &&
      ((h[f] = t.P[f * 3 + 2] - u), (t.P[f * 3 + 2] = u), c++);
  }
  return (c && ((t.drop = h), (i.dropped ||= []).push(t)), c);
}
function Mft(i, t) {
  let e = 1e9,
    s = -1e9,
    n = 1e9,
    o = -1e9;
  for (let h = 0; h < t.n; h++)
    ((e = Math.min(e, t.P[h * 3])),
      (s = Math.max(s, t.P[h * 3])),
      (n = Math.min(n, t.P[h * 3 + 1])),
      (o = Math.max(o, t.P[h * 3 + 1])));
  let a = i.edges.filter(
      (h) =>
        h !== t &&
        !h.tunnel &&
        !h.inner &&
        !h.elev &&
        h.n > 1 &&
        (() => {
          for (let f = 0; f < h.n; f++) {
            let u = h.P[f * 3],
              d = h.P[f * 3 + 1];
            if (u > e - 25 && u < s + 25 && d > n - 25 && d < o + 25) return !0;
          }
          return !1;
        })(),
    ),
    r = {},
    l = Array.from(t.W),
    c = 0;
  for (let h = 0; h < t.n; h++) {
    let f = t.P[h * 3],
      u = t.P[h * 3 + 1],
      d = t.P[h * 3 + 2],
      p = t.D[Math.min(h, t.n - 2) * 2],
      m = t.D[Math.min(h, t.n - 2) * 2 + 1];
    for (let g of a) {
      if (
        (vs(g, f, u, r),
        r.s < 0.5 ||
          r.s > g.L - 0.5 ||
          r.y - d < 1.5 ||
          r.d > t.W[h] + r.w + 3 ||
          Math.abs(r.dx * p + r.dz * m) < 0.85)
      )
        continue;
      let b = Math.max(4, r.d - r.w - 0.4);
      b < l[h] && ((l[h] = b), c++);
    }
  }
  if (!c) return 0;
  for (let h = 0; h < 2; h++)
    for (let f = 1; f < t.n; f++) {
      let u = t.S[f] - t.S[f - 1];
      l[f] = Math.min(l[f], l[f - 1] + u / 6);
    }
  for (let h = t.n - 2; h >= 0; h--) {
    let f = t.S[h + 1] - t.S[h];
    l[h] = Math.min(l[h], l[h + 1] + f / 6);
  }
  t.W0 = Float32Array.from(t.W);
  for (let h = 0; h < t.n; h++) t.W[h] = l[h];
  return ((t.split = !0), c);
}
function NW(i, t, e, s, n) {
  let o = [];
  for (let x = 0; x < t.n; x++) {
    let v = e ? t.L - t.S[x] : t.S[x];
    v <= 70 && o.push([-v, t, x]);
  }
  let a = s.ja === n.id;
  for (let x = 0; x < s.n; x++) {
    let v = a ? s.S[x] : s.L - s.S[x];
    v <= 110 && v > 0.01 && o.push([v, s, x]);
  }
  if ((o.sort((x, v) => x[0] - v[0]), o.length < 6)) return 0;
  let r = ([, x, v]) => x.P[v * 3 + 2],
    l = o[0][0],
    c = o[o.length - 1][0],
    h = Math.floor(c - l) + 1,
    f = new Float64Array(h);
  {
    let x = 0;
    for (let v = 0; v < h; v++) {
      let y = l + v;
      for (; x + 2 < o.length && o[x + 1][0] < y;) x++;
      let M = o[x],
        S = o[x + 1],
        w =
          S[0] > M[0]
            ? Math.min(1, Math.max(0, (y - M[0]) / (S[0] - M[0])))
            : 0;
      f[v] = r(M) + (r(S) - r(M)) * w;
    }
  }
  let u = 9,
    d = Math.ceil(u * 2.5),
    p = [];
  for (let x = -d; x <= d; x++) p.push(Math.exp((-x * x) / (2 * u * u)));
  let m = Float64Array.from(f);
  for (let x = 0; x < 12; x++) {
    let v = new Float64Array(h);
    for (let y = 0; y < h; y++) {
      let M = 0,
        S = 0;
      for (let w = -d; w <= d; w++) {
        let z = Math.min(h - 1, Math.max(0, y + w));
        ((M += m[z] * p[w + d]), (S += p[w + d]));
      }
      v[y] = M / S;
    }
    for (let y = 0; y < h; y++) m[y] = Math.min(m[y], v[y]);
  }
  let g = (x) => {
      let v = Math.max(0, Math.min(h - 1, x - l)),
        y = Math.min(h - 2, Math.floor(v)),
        M = v - y;
      return [f[y] + (f[y + 1] - f[y]) * M, m[y] + (m[y + 1] - m[y]) * M];
    },
    b = 0;
  for (let x of o) {
    let [v, y] = g(x[0]),
      M = Math.min(1, (x[0] - l) / 15, (c - x[0]) / 15),
      S = v + (Math.min(v, y) - v) * Math.max(0, M),
      w = x[2] * 3 + 2;
    ((b = Math.max(b, v - S)), (x[1].P[w] += S - v));
  }
  {
    let x = e ? t.n - 1 : 0,
      [v, y] = g(0),
      M = Math.min(v, y);
    ((t.P[x * 3 + 2] = M), (s.P[(a ? 0 : s.n - 1) * 3 + 2] = M), (n.y = M));
  }
  return ((t.crest = (t.crest || 0) + b), b);
}
