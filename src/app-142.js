// app 142 — math
// Lines 92626-92880 of readable/app.pretty.js (statement-aligned).
function qu(
  o,
  {
    pts: t,
    w: e,
    lanes: s,
    laneW: n = 3.6,
    name: i,
    flags: a = a$,
    layer: r = 1,
    ja: l = -1,
    jb: c = -1,
    ta: h = 0,
    tb: f = 0,
    rank: u = 8,
    maxspeed: d = 50,
    dist: p = "",
    custom: m = null,
    way: g = 0,
    tunnel: b = null,
  },
) {
  let v = t.length,
    x = new Float32Array(v * 3),
    y = new Float32Array(v);
  t.forEach((S, w) => {
    ((x[w * 3] = S[0]),
      (x[w * 3 + 1] = S[1]),
      (x[w * 3 + 2] = S[2]),
      (y[w] = typeof e == "function" ? e(w, S) : e));
  });
  let M = Tr({ id: o.edges.length, P: x, W: y });
  return (
    Object.assign(M, {
      ta: h,
      tb: f,
      sw: 0,
      laneW: n,
      maxspeed: d,
      ja: l,
      jb: c,
      name: i,
      way: g,
      dist: p,
      rank: u,
      lanes: s,
      flags: a,
      cls: "motorway",
      median: 0,
      trolley: !1,
      stops: 0,
      layer: r,
      elev: !!(a & 64),
      inner: !1,
      oneway: !!(a & 8),
      sunk: !1,
      hwy: !0,
      custom: m,
      tunnel: b,
      synthetic: !0,
    }),
    (M.layered = M.elev),
    (M.s0 = M.ta),
    (M.s1 = M.L - M.tb),
    o.edges.push(M),
    M
  );
}
function $k(o, { x: t, z: e, y: s, type: n = "j", ring: i = null }) {
  let a = {
    id: o.juns.length,
    x: t,
    z: e,
    y: s,
    type: n,
    ctl: 0,
    rings: [],
    polys: [],
    flat: !0,
    bb: [t - 1, e - 1, t + 1, e + 1],
    legs: [],
    synthetic: !0,
  };
  if (i) {
    let r = new Float32Array(i.flat()),
      l = new Float32Array(i.length).fill(s),
      c = { pts: r, y: l, hole: !1 };
    (a.rings.push(c), a.polys.push([c]), (a.type = "x"));
    let h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let [p, m] of i)
      ((h = Math.min(h, p)),
        (u = Math.max(u, p)),
        (f = Math.min(f, m)),
        (d = Math.max(d, m)));
    a.bb = [h, f, u, d];
  }
  return (o.juns.push(a), a);
}
var Tw = (o, t, e, s = 3) => {
    let n = null,
      i = s;
    for (let a of o.juns) {
      let r = Math.hypot(a.x - t, a.z - e);
      r < i && ((i = r), (n = a));
    }
    return n;
  },
  Q1t = (o, t) =>
    t === "a"
      ? [o.P[0], o.P[1], o.P[2]]
      : [o.P[o.n * 3 - 3], o.P[o.n * 3 - 2], o.P[o.n * 3 - 1]],
  r$ = (o, t, e) => o.edges.find((s) => (e === "b" ? s.jb : s.ja) === t.id);
function rx(o, t, e = null, s = null, n = 150) {
  let i = [0];
  for (let h = 1; h < o.length; h++)
    i.push(i[h - 1] + Math.hypot(o[h][0] - o[h - 1][0], o[h][1] - o[h - 1][1]));
  let a = i[i.length - 1],
    r = (h) => h * h * (3 - 2 * h),
    l = e === null ? 0 : e - t(o[0], 0),
    c = s === null ? 0 : s - t(o[o.length - 1], a);
  return o.map((h, f) => [
    h[0],
    h[1],
    t(h, i[f]) +
      l * (1 - r(Math.min(1, i[f] / n))) +
      c * (1 - r(Math.min(1, (a - i[f]) / n))),
  ]);
}
function l$(o, t, e, s, n) {
  let i = (r, l) => {
      let c = 1e9,
        h = 0,
        f = 0;
      for (let u = 1; u < l.length; u++) {
        let [d, p] = l[u - 1],
          [m, g] = l[u],
          b = m - d,
          v = g - p,
          x = b * b + v * v || 1,
          y = Math.max(0, Math.min(1, ((r[0] - d) * b + (r[1] - p) * v) / x)),
          M = d + b * y,
          S = p + v * y,
          w = Math.hypot(r[0] - M, r[1] - S);
        w < c && ((c = w), (h = M), (f = S));
      }
      return [c, h, f];
    },
    a = (r) => {
      let l = [0];
      for (let c = 1; c < r.length; c++)
        l.push(
          l[c - 1] + Math.hypot(r[c][0] - r[c - 1][0], r[c][1] - r[c - 1][1]),
        );
      return l;
    };
  for (let r = 0; r < 2; r++) {
    let l = [
      [o, t, s],
      [t, o, n],
    ].map(([c, h, f]) => {
      let u = a(c),
        d = u[u.length - 1],
        p = c.length,
        m = c.map((b) => {
          let [v, x, y] = i(b, h);
          return [
            Math.max(0, Math.min(1.2, (e + 0.02 - v) / 2)),
            v > 1e-6 ? (b[0] - x) / v : 0,
            v > 1e-6 ? (b[1] - y) / v : 0,
          ];
        }),
        g = m.map((b, v) => {
          let x = 0;
          for (let y = Math.max(0, v - 3); y <= Math.min(p - 1, v + 3); y++)
            x = Math.max(x, m[y][0]);
          return x;
        });
      return m.map(([, b, v], x) => {
        let y = 0,
          M = 0;
        for (let _ = Math.max(0, x - 3); _ <= Math.min(p - 1, x + 3); _++)
          ((y += g[_]), M++);
        let S = Math.min(
            f[0] ? Math.min(1, u[x] / f[0]) : 1,
            f[1] ? Math.min(1, (d - u[x]) / f[1]) : 1,
          ),
          w = S * S * (3 - 2 * S);
        return [((b * y) / M) * w, ((v * y) / M) * w];
      });
    });
    [o, t].forEach((c, h) =>
      c.forEach((f, u) => {
        ((f[0] += l[h][u][0]), (f[1] += l[h][u][1]));
      }),
    );
  }
}
function c$(o, t) {
  let e = {},
    s = {},
    n = {},
    i = [],
    a = null,
    r = (l, c, h) => {
      if (
        (l.shared ||
          (l.shared = { side: h, at: new Uint8Array(Math.ceil(l.L) + 2) }),
        l.shared.side === h)
      )
        for (
          let f = Math.max(0, Math.floor(c - 2.5));
          f <= Math.min(l.shared.at.length - 1, Math.ceil(c + 2.5));
          f++
        )
          l.shared.at[f] = 1;
    };
  for (let l = o.s0; l <= o.s1 + 1e-6; l += 4) {
    (Ot(o, Math.min(l, o.s1), e), ys(t, e.x, e.z, s), Ot(t, s.s, n));
    let c = n.x - e.x,
      h = n.z - e.z,
      f = Math.hypot(c, h),
      u = f - e.w - n.w;
    if (
      !(f > 0.001) ||
      u > 1.6 ||
      Math.abs(e.y - n.y) > 0.3 ||
      s.s < t.s0 + 0.5 ||
      s.s > t.s1 - 0.5
    ) {
      a = null;
      continue;
    }
    let d = c / f,
      p = h / f,
      m = [e.x + d * e.w, e.z + p * e.w],
      g = [n.x - d * n.w, n.z - p * n.w],
      b = Math.sign(d * e.nx + p * e.nz) || 1,
      v = Math.sign(-d * n.nx - p * n.nz) || 1;
    if ((r(o, l, b), r(t, s.s, v), u < 0.4)) {
      a = null;
      continue;
    }
    (a || i.push((a = [])),
      a.push({
        x: (m[0] + g[0]) / 2,
        z: (m[1] + g[1]) / 2,
        y: (e.y + n.y) / 2,
        gap: u,
      }));
  }
  return i.filter((l) => l.length > 1);
}
