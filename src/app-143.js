// app 143 — math
// Lines 92357-92611 of readable/app.pretty.js (statement-aligned).
function cu(
  i,
  {
    pts: t,
    w: e,
    lanes: s,
    laneW: n = 3.6,
    name: o,
    flags: a = ij,
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
  let x = t.length,
    v = new Float32Array(x * 3),
    y = new Float32Array(x);
  t.forEach((S, w) => {
    ((v[w * 3] = S[0]),
      (v[w * 3 + 1] = S[1]),
      (v[w * 3 + 2] = S[2]),
      (y[w] = typeof e == "function" ? e(w, S) : e));
  });
  let M = dr({ id: i.edges.length, P: v, W: y });
  return (
    Object.assign(M, {
      ta: h,
      tb: f,
      sw: 0,
      laneW: n,
      maxspeed: d,
      ja: l,
      jb: c,
      name: o,
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
    i.edges.push(M),
    M
  );
}
function $S(i, { x: t, z: e, y: s, type: n = "j", ring: o = null }) {
  let a = {
    id: i.juns.length,
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
  if (o) {
    let r = new Float32Array(o.flat()),
      l = new Float32Array(o.length).fill(s),
      c = { pts: r, y: l, hole: !1 };
    (a.rings.push(c), a.polys.push([c]), (a.type = "x"));
    let h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let [p, m] of o)
      ((h = Math.min(h, p)),
        (u = Math.max(u, p)),
        (f = Math.min(f, m)),
        (d = Math.max(d, m)));
    a.bb = [h, f, u, d];
  }
  return (i.juns.push(a), a);
}
var Iy = (i, t, e, s = 3) => {
    let n = null,
      o = s;
    for (let a of i.juns) {
      let r = Math.hypot(a.x - t, a.z - e);
      r < o && ((o = r), (n = a));
    }
    return n;
  },
  Put = (i, t) =>
    t === "a"
      ? [i.P[0], i.P[1], i.P[2]]
      : [i.P[i.n * 3 - 3], i.P[i.n * 3 - 2], i.P[i.n * 3 - 1]],
  oj = (i, t, e) => i.edges.find((s) => (e === "b" ? s.jb : s.ja) === t.id);
function wb(i, t, e = null, s = null, n = 150) {
  let o = [0];
  for (let h = 1; h < i.length; h++)
    o.push(o[h - 1] + Math.hypot(i[h][0] - i[h - 1][0], i[h][1] - i[h - 1][1]));
  let a = o[o.length - 1],
    r = (h) => h * h * (3 - 2 * h),
    l = e === null ? 0 : e - t(i[0], 0),
    c = s === null ? 0 : s - t(i[i.length - 1], a);
  return i.map((h, f) => [
    h[0],
    h[1],
    t(h, o[f]) +
      l * (1 - r(Math.min(1, o[f] / n))) +
      c * (1 - r(Math.min(1, (a - o[f]) / n))),
  ]);
}
function aj(i, t, e, s, n) {
  let o = (r, l) => {
      let c = 1e9,
        h = 0,
        f = 0;
      for (let u = 1; u < l.length; u++) {
        let [d, p] = l[u - 1],
          [m, g] = l[u],
          b = m - d,
          x = g - p,
          v = b * b + x * x || 1,
          y = Math.max(0, Math.min(1, ((r[0] - d) * b + (r[1] - p) * x) / v)),
          M = d + b * y,
          S = p + x * y,
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
      [i, t, s],
      [t, i, n],
    ].map(([c, h, f]) => {
      let u = a(c),
        d = u[u.length - 1],
        p = c.length,
        m = c.map((b) => {
          let [x, v, y] = o(b, h);
          return [
            Math.max(0, Math.min(1.2, (e + 0.02 - x) / 2)),
            x > 1e-6 ? (b[0] - v) / x : 0,
            x > 1e-6 ? (b[1] - y) / x : 0,
          ];
        }),
        g = m.map((b, x) => {
          let v = 0;
          for (let y = Math.max(0, x - 3); y <= Math.min(p - 1, x + 3); y++)
            v = Math.max(v, m[y][0]);
          return v;
        });
      return m.map(([, b, x], v) => {
        let y = 0,
          M = 0;
        for (let z = Math.max(0, v - 3); z <= Math.min(p - 1, v + 3); z++)
          ((y += g[z]), M++);
        let S = Math.min(
            f[0] ? Math.min(1, u[v] / f[0]) : 1,
            f[1] ? Math.min(1, (d - u[v]) / f[1]) : 1,
          ),
          w = S * S * (3 - 2 * S);
        return [((b * y) / M) * w, ((x * y) / M) * w];
      });
    });
    [i, t].forEach((c, h) =>
      c.forEach((f, u) => {
        ((f[0] += l[h][u][0]), (f[1] += l[h][u][1]));
      }),
    );
  }
}
function rj(i, t) {
  let e = {},
    s = {},
    n = {},
    o = [],
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
  for (let l = i.s0; l <= i.s1 + 1e-6; l += 4) {
    (Ot(i, Math.min(l, i.s1), e), vs(t, e.x, e.z, s), Ot(t, s.s, n));
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
      x = Math.sign(-d * n.nx - p * n.nz) || 1;
    if ((r(i, l, b), r(t, s.s, x), u < 0.4)) {
      a = null;
      continue;
    }
    (a || o.push((a = [])),
      a.push({
        x: (m[0] + g[0]) / 2,
        z: (m[1] + g[1]) / 2,
        y: (e.y + n.y) / 2,
        gap: u,
      }));
  }
  return o.filter((l) => l.length > 1);
}
