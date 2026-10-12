// app 401 — math
// Lines 195648-195980 of readable/app.pretty.js (statement-aligned).
function TN(i, t, e, s, n, o, a) {
  let r = i + 2,
    l = t + 2,
    c = new Uint8Array(r * l);
  for (let v = 0; v < t; v++)
    for (let y = 0; y < i; y++) c[(v + 1) * r + y + 1] = e(y, v);
  let h = new Map(),
    f = (v, y) => (y * r + v) * 2,
    u = (v, y) => (y * r + v) * 2 + 1,
    d = [0, 0, 0, 0],
    p = [0, 0, 0, 0];
  for (let v = 0; v + 1 < l; v++)
    for (let y = 0; y + 1 < r; y++) {
      let M = c[v * r + y],
        S = c[v * r + y + 1],
        w = c[(v + 1) * r + y + 1],
        z = c[(v + 1) * r + y],
        _ = M + S + w + z;
      if (!(_ === 0 || _ === 4)) {
        ((p[0] = M),
          (p[1] = S),
          (p[2] = w),
          (p[3] = z),
          (d[0] = f(y, v)),
          (d[1] = u(y + 1, v)),
          (d[2] = f(y, v + 1)),
          (d[3] = u(y, v)));
        for (let R = 0; R < 4; R++)
          if (!p[R] && p[(R + 1) & 3])
            for (let T = 1; T < 4; T++) {
              let E = (R + T) & 3;
              if (p[E] && !p[(E + 1) & 3]) {
                h.set(d[R], d[E]);
                break;
              }
            }
      }
    }
  let m = (v) => {
      let y = v >> 1,
        M = y % r,
        S = (y - M) / r;
      return v & 1
        ? [s + (M - 1) * o, n + (S - 0.5) * o]
        : [s + (M - 0.5) * o, n + (S - 1) * o];
    },
    g = new Path2D(),
    b = [],
    x = new Set();
  for (let v of h.keys()) {
    if (x.has(v)) continue;
    let y = [],
      M = v,
      S = 0;
    for (; M !== void 0 && !x.has(M) && S++ < 1e7;)
      (x.add(M), y.push(m(M)), (M = h.get(M)));
    if (y.length < 4) continue;
    let w = FMt(y, a);
    if (!(w.length < 3)) {
      (b.push(w), g.moveTo(w[0][0], w[0][1]));
      for (let z = 1; z < w.length; z++) g.lineTo(w[z][0], w[z][1]);
      g.closePath();
    }
  }
  return { path: g, rings: b };
}
function FMt(i, t) {
  let e = 0,
    s = -1;
  for (let r = 1; r < i.length; r++) {
    let l = (i[r][0] - i[0][0]) ** 2 + (i[r][1] - i[0][1]) ** 2;
    l > s && ((s = l), (e = r));
  }
  let n = new Uint8Array(i.length);
  n[0] = n[e] = 1;
  let o = (r, l) => {
    let c = [[r, l]];
    for (; c.length;) {
      let [h, f] = c.pop();
      if (f - h < 2) continue;
      let u = i[h],
        d = i[f % i.length],
        p = d[0] - u[0],
        m = d[1] - u[1],
        g = Math.hypot(p, m) || 1e-9,
        b = -1,
        x = t;
      for (let v = h + 1; v < f; v++) {
        let y = Math.abs((i[v][0] - u[0]) * m - (i[v][1] - u[1]) * p) / g;
        y > x && ((x = y), (b = v));
      }
      b >= 0 && ((n[b] = 1), c.push([h, b], [b, f]));
    }
  };
  (o(0, e), o(e, i.length));
  let a = [];
  for (let r = 0; r < i.length; r++) n[r] && a.push(i[r]);
  return a;
}
function Jet(i, t, e) {
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
    n = i.edges.map((l) => t(l)),
    o = new Map();
  for (let l of i.juns) {
    let c = l.legs.filter(([u]) => n[u.id]);
    if (c.length < 2) continue;
    let h = [];
    for (let u = 0; u < c.length; u++)
      for (let d = u + 1; d < c.length; d++) {
        let [p, m] = c[u],
          [g, b] = c[d];
        if (p === g || n[p.id] !== n[g.id]) continue;
        let x = s(p, m),
          v = s(g, b),
          y = x[0] * v[0] + x[1] * v[1];
        y < -0.82 && h.push([y, u, d]);
      }
    h.sort((u, d) => u[0] - d[0]);
    let f = new Set();
    for (let [, u, d] of h) {
      if (f.has(u) || f.has(d)) continue;
      (f.add(u), f.add(d));
      let [p, m] = c[u],
        [g, b] = c[d];
      (o.set(p.id * 2 + (m === "b"), [g, b]),
        o.set(g.id * 2 + (b === "b"), [p, m]));
    }
  }
  let a = new Uint8Array(i.edges.length),
    r = [];
  for (let l of i.edges) {
    if (a[l.id] || !n[l.id]) continue;
    let c = [l, !0],
      h = 0;
    for (;;) {
      let [g, b] = c,
        x = o.get(g.id * 2 + (b ? 0 : 1));
      if (!x || x[0] === l || h++ > 5e3) break;
      c = [x[0], x[1] === "b"];
    }
    let f = [],
      u = [],
      d = new Map();
    for (h = 0; ;) {
      let [g, b] = c;
      if (a[g.id]) break;
      ((a[g.id] = 1), u.push(g), d.set(e(g), (d.get(e(g)) || 0) + g.L));
      let x = g.P,
        v = g.n;
      for (let M = 0; M < v; M++) {
        let S = b ? M : v - 1 - M,
          w = x[S * 3],
          z = x[S * 3 + 1],
          _ = f[f.length - 1];
        (!_ || Math.abs(_[0] - w) + Math.abs(_[1] - z) > 0.05) &&
          f.push([w, z]);
      }
      let y = o.get(g.id * 2 + (b ? 1 : 0));
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
function wN(i, t) {
  let e = [],
    s = [],
    n = 0;
  (e.push(i[0][0]), s.push(i[0][1]));
  for (let l = 0; l + 1 < i.length; l++) {
    let [c, h] = i[l],
      [f, u] = i[l + 1],
      d = Math.hypot(f - c, u - h),
      p = t - n;
    for (; p <= d;)
      (e.push(c + ((f - c) * p) / d), s.push(h + ((u - h) * p) / d), (p += t));
    n = d - (p - t);
  }
  let o = e.length,
    a = new Float32Array(o),
    r = new Float32Array(o);
  for (let l = 0; l < o; l++) {
    let c = Math.max(0, l - 1),
      h = Math.min(o - 1, l + 1),
      f = e[h] - e[c],
      u = s[h] - s[c],
      d = Math.hypot(f, u) || 1;
    ((a[l] = f / d), (r[l] = u / d));
  }
  return { x: e, z: s, tx: a, tz: r, n: o };
}
function NMt(i) {
  let t = performance.now(),
    e = { D: i, names: [], nameId: new Map() },
    s = i.terrain;
  e.fine = [s.x0, s.z0, s.x0 + (s.nx - 1) * s.step, s.z0 + (s.nz - 1) * s.step];
  let n = s.cover;
  ((e.sea = TN(
    s.nx,
    s.nz,
    (r, l) => (n[l * s.nx + r] & 8 ? 1 : 0),
    s.x0,
    s.z0,
    s.step,
    1.4,
  ).path),
    est(e),
    (e.hasFar = (i.far || []).length > 0),
    (e.farLand = []),
    (e.outsideGreen = RMt.map((r) => {
      let l = new Path2D();
      return (
        r.forEach(([c, h], f) => (f ? l.lineTo(c, h) : l.moveTo(c, h))),
        l.closePath(),
        l
      );
    })),
    (e.outside = AMt.filter((r, l) => !(e.hasFar && l >= 1 && l <= 3)).map(
      (r) => {
        let l = new Path2D();
        return (
          r.forEach(([c, h], f) => (f ? l.lineTo(c, h) : l.moveTo(c, h))),
          l.closePath(),
          l
        );
      },
    )),
    (e.beyond = _N.filter((r) => !(e.regions.length && r.id === "101"))));
  let o = i.edges,
    a = o.length;
  ((e.rank = new Uint8Array(a)),
    (e.hw = new Float32Array(a)),
    (e.bb = new Float32Array(a * 4)),
    (e.EB = new Map()));
  for (let r of o) {
    let l = r.P,
      c = 0,
      h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let m = 0; m < r.n; m++)
      ((c += r.W[m]),
        (h = Math.min(h, l[m * 3])),
        (u = Math.max(u, l[m * 3])),
        (f = Math.min(f, l[m * 3 + 1])),
        (d = Math.max(d, l[m * 3 + 1])));
    let p = Array.from(
      r.W.subarray ? r.W.subarray(0, r.n) : r.W.slice(0, r.n),
    ).sort((m, g) => m - g);
    ((e.rank[r.id] = zMt[r.cls] ?? 6),
      (e.hw[r.id] = p.length ? p[p.length >> 1] : c / r.n),
      e.bb.set([h, f, u, d], r.id * 4),
      EN(e.EB, h, f, u, d, r.id));
  }
  {
    let r = new Map();
    for (let l of o) {
      if (!l.name) continue;
      let c = l.name + "|" + e.rank[l.id],
        h = r.get(c);
      (h || r.set(c, (h = [])), h.push(l));
    }
    for (let l of r.values()) {
      if (l.length < 2) continue;
      let c = l.map((d) => [e.hw[d.id], d.L || 1]).sort((d, p) => d[0] - p[0]),
        h = c.reduce((d, p) => d + p[1], 0),
        f = 0,
        u = c[0][0];
      for (let [d, p] of c)
        if (((f += p), f >= h / 2)) {
          u = d;
          break;
        }
      for (let d of l) e.hw[d.id] = hh(e.hw[d.id], u * 0.8, u * 1.2);
    }
  }
  return (
    (e.eSeen = new Uint32Array(a)),
    sst(e),
    (e.A = null),
    (e.shields = []),
    (e.ms = performance.now() - t),
    e
  );
}
function est(i) {
  ((i.regions = (i.D.terrain.regions || []).map((t) => {
    let e = t.cover;
    return {
      fine: t.clipBox || [
        t.x0,
        t.z0,
        t.x0 + (t.nx - 1) * t.step,
        t.z0 + (t.nz - 1) * t.step,
      ],
      sea: TN(
        Math.ceil(t.nx / 2),
        Math.ceil(t.nz / 2),
        (n, o) =>
          e[Math.min(t.nz - 1, o * 2) * t.nx + Math.min(t.nx - 1, n * 2)] & 8
            ? 1
            : 0,
        t.x0,
        t.z0,
        t.step * 2,
        2.5,
      ).path,
    };
  })),
    (i.fineAll = null));
}
