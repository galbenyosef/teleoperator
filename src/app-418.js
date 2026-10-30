// app 418 — math
// Lines 203467-203745 of readable/app.pretty.js (statement-aligned).
var kkt = [
    ["Presidio of San Francisco", -122.4662, 37.7985, 0],
    ["Golden Gate Park", -122.464, 37.77, 0],
    ["Crissy Field", -122.463, 37.8045, 1],
    ["Marina Green", -122.4405, 37.8058, 1],
    ["Fort Mason", -122.4305, 37.805, 2],
    ["Aquatic Park", -122.423, 37.8072, 2],
    ["Washington Square", -122.4101, 37.8008, 1],
    ["Alta Plaza Park", -122.4378, 37.7912, 1],
    ["Lafayette Park", -122.4276, 37.7915, 1],
    ["Alamo Square", -122.4346, 37.7765, 1],
    ["Huntington Park", -122.4125, 37.7923, 2],
    ["Portsmouth Square", -122.4053, 37.7948, 2],
    ["Yerba Buena Gardens", -122.4023, 37.7849, 2],
    ["Mountain Lake Park", -122.4695, 37.7872, 2],
    ["Presidio Golf Course", -122.4598, 37.79, 2],
    ["The Panhandle", -122.446, 37.7726, 2],
    ["Pioneer Park", -122.4062, 37.803, 2],
    ["Rincon Park", -122.39, 37.7905, 2],
    ["Sue Bierman Park", -122.3963, 37.796, 2],
    ["Lyon Street Steps", -122.4467, 37.7922, 2],
    ["Baker Beach", -122.4836, 37.7936, 1],
    ["Lands End", -122.505, 37.7865, 1],
    ["Angel Island", -122.4318, 37.8621, 0],
    ["Marin Headlands", -122.505, 37.833, 0],
    ["Lincoln Park", -122.499, 37.7835, 1],
    ["China Beach", -122.4912, 37.7882, 2],
    ["Sutro Heights Park", -122.5114, 37.7775, 2],
    ["Fort Miley", -122.504, 37.782, 2],
  ],
  zkt = Ia("parks", kkt).map(([o, t, e, s]) => ({
    n: o,
    p: ji(t, e),
    tier: s,
  })),
  _kt = (
    On("distant")
      ? [
          ["Yerba Buena Island", -122.366, 37.8105],
          ["Treasure Island", -122.37, 37.8245],
        ]
      : []
  ).map(([o, t, e]) => ({ n: o, p: ji(t, e) })),
  Ekt = Ia("waters", [
    ["San Francisco Bay", -122.399, 37.8185],
    ["Golden Gate", -122.495, 37.814],
    ["Pacific Ocean", -122.523, 37.795],
    ["Richardson Bay", -122.478, 37.861],
  ]).map(([o, t, e]) => ({ n: o, p: ji(t, e) })),
  w1 = 256,
  dot = (o, t) => o * 65536 + t;
function TN(o, t, e, s, n, i) {
  for (let a = Math.floor(t / w1); a <= Math.floor(s / w1); a++)
    for (let r = Math.floor(e / w1); r <= Math.floor(n / w1); r++) {
      let l = dot(a, r),
        c = o.get(l);
      (c || o.set(l, (c = [])), c.push(i));
    }
}
function v9(o, t, e, s, n, i, a, r) {
  for (let l = Math.floor(t / w1); l <= Math.floor(s / w1); l++)
    for (let c = Math.floor(e / w1); c <= Math.floor(n / w1); c++) {
      let h = o.get(dot(l, c));
      if (h) for (let f of h) r[f] !== a && ((r[f] = a), i.push(f));
    }
  return i;
}
function RN(o, t, e, s, n, i, a) {
  let r = o + 2,
    l = t + 2,
    c = new Uint8Array(r * l);
  for (let x = 0; x < t; x++)
    for (let y = 0; y < o; y++) c[(x + 1) * r + y + 1] = e(y, x);
  let h = new Map(),
    f = (x, y) => (y * r + x) * 2,
    u = (x, y) => (y * r + x) * 2 + 1,
    d = [0, 0, 0, 0],
    p = [0, 0, 0, 0];
  for (let x = 0; x + 1 < l; x++)
    for (let y = 0; y + 1 < r; y++) {
      let M = c[x * r + y],
        S = c[x * r + y + 1],
        w = c[(x + 1) * r + y + 1],
        _ = c[(x + 1) * r + y],
        z = M + S + w + _;
      if (!(z === 0 || z === 4)) {
        ((p[0] = M),
          (p[1] = S),
          (p[2] = w),
          (p[3] = _),
          (d[0] = f(y, x)),
          (d[1] = u(y + 1, x)),
          (d[2] = f(y, x + 1)),
          (d[3] = u(y, x)));
        for (let A = 0; A < 4; A++)
          if (!p[A] && p[(A + 1) & 3])
            for (let T = 1; T < 4; T++) {
              let E = (A + T) & 3;
              if (p[E] && !p[(E + 1) & 3]) {
                h.set(d[A], d[E]);
                break;
              }
            }
      }
    }
  let m = (x) => {
      let y = x >> 1,
        M = y % r,
        S = (y - M) / r;
      return x & 1
        ? [s + (M - 1) * i, n + (S - 0.5) * i]
        : [s + (M - 0.5) * i, n + (S - 1) * i];
    },
    g = new Path2D(),
    b = [],
    v = new Set();
  for (let x of h.keys()) {
    if (v.has(x)) continue;
    let y = [],
      M = x,
      S = 0;
    for (; M !== void 0 && !v.has(M) && S++ < 1e7;)
      (v.add(M), y.push(m(M)), (M = h.get(M)));
    if (y.length < 4) continue;
    let w = Tkt(y, a);
    if (!(w.length < 3)) {
      (b.push(w), g.moveTo(w[0][0], w[0][1]));
      for (let _ = 1; _ < w.length; _++) g.lineTo(w[_][0], w[_][1]);
      g.closePath();
    }
  }
  return { path: g, rings: b };
}
function Tkt(o, t) {
  let e = 0,
    s = -1;
  for (let r = 1; r < o.length; r++) {
    let l = (o[r][0] - o[0][0]) ** 2 + (o[r][1] - o[0][1]) ** 2;
    l > s && ((s = l), (e = r));
  }
  let n = new Uint8Array(o.length);
  n[0] = n[e] = 1;
  let i = (r, l) => {
    let c = [[r, l]];
    for (; c.length;) {
      let [h, f] = c.pop();
      if (f - h < 2) continue;
      let u = o[h],
        d = o[f % o.length],
        p = d[0] - u[0],
        m = d[1] - u[1],
        g = Math.hypot(p, m) || 1e-9,
        b = -1,
        v = t;
      for (let x = h + 1; x < f; x++) {
        let y = Math.abs((o[x][0] - u[0]) * m - (o[x][1] - u[1]) * p) / g;
        y > v && ((v = y), (b = x));
      }
      b >= 0 && ((n[b] = 1), c.push([h, b], [b, f]));
    }
  };
  (i(0, e), i(e, o.length));
  let a = [];
  for (let r = 0; r < o.length; r++) n[r] && a.push(o[r]);
  return a;
}
function hot(o, t, e) {
  let s = (l, c) => {
      let h = l.P,
        f = l.n,
        u = c === "a" ? 0 : f - 1,
        d = c === "a" ? 1 : -1,
        p = u + d;
      for (
        ;
        p > 0 &&
        p < f - 1 &&
        Math.hypot(h[p * 3] - h[u * 3], h[p * 3 + 1] - h[u * 3 + 1]) < 15;
      )
        p += d;
      let m = h[p * 3] - h[u * 3],
        g = h[p * 3 + 1] - h[u * 3 + 1],
        b = Math.hypot(m, g) || 1;
      return [m / b, g / b];
    },
    n = o.edges.map((l) => t(l)),
    i = new Map();
  for (let l of o.juns) {
    let c = l.legs.filter(([u]) => n[u.id]);
    if (c.length < 2) continue;
    let h = [];
    for (let u = 0; u < c.length; u++)
      for (let d = u + 1; d < c.length; d++) {
        let [p, m] = c[u],
          [g, b] = c[d];
        if (p === g || n[p.id] !== n[g.id]) continue;
        let v = s(p, m),
          x = s(g, b),
          y = v[0] * x[0] + v[1] * x[1];
        y < -0.82 && h.push([y, u, d]);
      }
    h.sort((u, d) => u[0] - d[0]);
    let f = new Set();
    for (let [, u, d] of h) {
      if (f.has(u) || f.has(d)) continue;
      (f.add(u), f.add(d));
      let [p, m] = c[u],
        [g, b] = c[d];
      (i.set(p.id * 2 + (m === "b"), [g, b]),
        i.set(g.id * 2 + (b === "b"), [p, m]));
    }
  }
  let a = new Uint8Array(o.edges.length),
    r = [];
  for (let l of o.edges) {
    if (a[l.id] || !n[l.id]) continue;
    let c = [l, !0],
      h = 0;
    for (;;) {
      let [g, b] = c,
        v = i.get(g.id * 2 + (b ? 0 : 1));
      if (!v || v[0] === l || h++ > 5e3) break;
      c = [v[0], v[1] === "b"];
    }
    let f = [],
      u = [],
      d = new Map();
    for (h = 0; ;) {
      let [g, b] = c;
      if (a[g.id]) break;
      ((a[g.id] = 1), u.push(g), d.set(e(g), (d.get(e(g)) || 0) + g.L));
      let v = g.P,
        x = g.n;
      for (let M = 0; M < x; M++) {
        let S = b ? M : x - 1 - M,
          w = v[S * 3],
          _ = v[S * 3 + 1],
          z = f[f.length - 1];
        (!z || Math.abs(z[0] - w) + Math.abs(z[1] - _) > 0.05) &&
          f.push([w, _]);
      }
      let y = i.get(g.id * 2 + (b ? 1 : 0));
      if (!y || h++ > 5e3) break;
      c = [y[0], y[1] === "a"];
    }
    let p = 9,
      m = -1;
    for (let [g, b] of d) b > m && ((m = b), (p = g));
    f.length > 1 && r.push({ key: n[l.id], rank: p, pts: f, edges: u });
  }
  return r;
}
function MN(o, t) {
  let e = [],
    s = [],
    n = 0;
  (e.push(o[0][0]), s.push(o[0][1]));
  for (let l = 0; l + 1 < o.length; l++) {
    let [c, h] = o[l],
      [f, u] = o[l + 1],
      d = Math.hypot(f - c, u - h),
      p = t - n;
    for (; p <= d;)
      (e.push(c + ((f - c) * p) / d), s.push(h + ((u - h) * p) / d), (p += t));
    n = d - (p - t);
  }
  let i = e.length,
    a = new Float32Array(i),
    r = new Float32Array(i);
  for (let l = 0; l < i; l++) {
    let c = Math.max(0, l - 1),
      h = Math.min(i - 1, l + 1),
      f = e[h] - e[c],
      u = s[h] - s[c],
      d = Math.hypot(f, u) || 1;
    ((a[l] = f / d), (r[l] = u / d));
  }
  return { x: e, z: s, tx: a, tz: r, n: i };
}
