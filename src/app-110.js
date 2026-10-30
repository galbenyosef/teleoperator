// app 110 — math
// Lines 82313-82580 of readable/app.pretty.js (statement-aligned).
var a1t = [
  [-2931.2, -1401.2],
  [-2904.3, -1401.7],
];
function r1t({ B: o, colliders: t }, e) {
  let s = o.R("aquatic").solid,
    n = Rt([0.62, 0.61, 0.57], Tt.conc),
    i = Rt([0.3, 0.3, 0.3], Tt.metal),
    [[a, r], [l, c]] = a1t,
    h = Math.hypot(l - a, c - r),
    f = (l - a) / h,
    u = (c - r) / h,
    d = Math.round(h / 1.4),
    p = 1e9,
    m = -1e9;
  for (let g = 0; g <= d; g++) {
    let b = a + (f * h * g) / d,
      v = r + (u * h * g) / d,
      x = Math.max(e(b, v), e(b - u * 2.6, v + f * 2.6));
    ((p = Math.min(p, e(b, v), x)),
      (m = Math.max(m, x)),
      os(s, b, v, 0.21, x - 0.3, x + 0.82, 10, n, 0.19),
      os(s, b, v, 0.215, x + 0.62, x + 0.7, 10, i));
  }
  t.push({
    t: "obb",
    x: (a + l) / 2,
    z: (r + c) / 2,
    hx: h / 2 + 0.25,
    hz: 0.3,
    c: f,
    s: -u,
    y0: p - 2,
    y1: m + 2.5,
  });
}
var l1t = new Set(["Ferry Plaza", "Al Scoma Way", "McDowell Road Southwest"]);
function c1t({ B: o, colliders: t }, e) {
  let { D: s, L: n } = e,
    i = Rt([0.07, 0.09, 0.08], Tt.metal),
    a = {},
    r = (l, c, h) =>
      n.coverAt(l, c) & 8 &&
      n.terrainAt(l, c) < 0.3 &&
      n.driveHeight(l, c, void 0, h) < 0.3;
  for (let l of s.edges)
    if (!(
      !l1t.has(l.name) ||
      l.elev ||
      l.layered ||
      l.inner ||
      l.s1 - l.s0 < 2
    ))
      for (let c of [-1, 1]) {
        let h = [],
          f = () => {
            if (h.length > 1) {
              let u = o.get(
                "wrail" +
                  Math.floor((h[0][0] + 3e3) / 400) +
                  "_" +
                  Math.floor((h[0][2] + 3e3) / 400),
                "solid",
              );
              for (let d = 0; d < h.length; d++) {
                let [p, m, g] = h[d];
                if (
                  (zs(
                    u,
                    p - 0.04,
                    m - 0.05,
                    g - 0.04,
                    p + 0.04,
                    m + 1.08,
                    g + 0.04,
                    i,
                    { top: !1 },
                  ),
                  d + 1 < h.length)
                ) {
                  let [b, v, x, y, M] = h[d + 1],
                    S = Math.hypot(b - p, x - g);
                  (rs(u, [p, m + 1.05, g], [b, v + 1.05, x], 0.08, 0.06, i),
                    rs(u, [p, m + 0.55, g], [b, v + 0.55, x], 0.04, 0.04, i));
                  let w = (h[d][3] + y) / 2,
                    _ = (h[d][4] + M) / 2,
                    z = (b - p) / S,
                    A = (x - g) / S;
                  t.push({
                    t: "obb",
                    x: (p + b) / 2 + w * 1,
                    z: (g + x) / 2 + _ * 1,
                    hx: S / 2 + 0.3,
                    hz: 1.2,
                    c: z,
                    s: -A,
                    y0: Math.min(m, v) - 2,
                    y1: Math.max(m, v) + 3,
                  });
                }
              }
            }
            h.length = 0;
          };
        for (let u = l.s0; u <= l.s1 + 0.01; u += 2) {
          Ot(l, Math.min(u, l.s1), a);
          let d = null;
          for (let b = a.w; b <= a.w + 7; b += 0.5) {
            let v = a.x + a.nx * b * c,
              x = a.z + a.nz * b * c;
            if (r(v, x, a.y)) {
              d = b;
              break;
            }
          }
          if (
            (d !== null &&
              d > a.w &&
              r(
                a.x + a.nx * (d - 0.25) * c,
                a.z + a.nz * (d - 0.25) * c,
                a.y,
              ) &&
              (d -= 0.25),
            d === null || d < a.w + 0.5)
          ) {
            f();
            continue;
          }
          let p = d - 0.3,
            m = a.x + a.nx * p * c,
            g = a.z + a.nz * p * c;
          h.push([m, n.driveHeight(m, g, void 0, a.y), g, a.nx * c, a.nz * c]);
        }
        f();
      }
}
function sj(o) {
  for (let t of ej(o).list)
    for (let e of t.claims || []) o.claim({ name: "wf_" + t.name, ...e });
}
function nj(o, t, e) {
  for (let s of ej(o).list)
    o.site(
      { name: "wf_" + s.name, F: s.F, set: s.set || [], cull: s.cull },
      (n) => {
        s.run({
          B: t,
          A: e,
          ctx: n,
          colliders: n.colliders,
          inst: n.inst,
          extra: [],
          tick: [],
        });
        for (let i of n.colliders)
          if (i.y1 === void 0) {
            let [a, r] =
                i.t === "box"
                  ? [(i.x0 + i.x1) / 2, (i.z0 + i.z1) / 2]
                  : [i.x, i.z],
              l = $t(a, r) + s.F.dy;
            ((i.y0 = l - 3), (i.y1 = l + 12));
          }
      },
    );
}
var Qq = new WeakMap(),
  h1t = (o) => {
    let t = Qq.get(o);
    if (!t) {
      t = [1e9, 1e9, -1e9, -1e9];
      for (let e = 0; e < o.P.length; e += 3)
        ((t[0] = Math.min(t[0], o.P[e] - 30)),
          (t[2] = Math.max(t[2], o.P[e] + 30)),
          (t[1] = Math.min(t[1], o.P[e + 1] - 30)),
          (t[3] = Math.max(t[3], o.P[e + 1] + 30)));
      Qq.set(o, t);
    }
    return t;
  };
function tj(o, t, e, s, n, i) {
  let a = 0,
    r = {},
    l = n + 60,
    c = (h, f) => {
      let u = h - t[0],
        d = f - t[1],
        p = u * e[0] + d * e[1],
        m = -u * e[1] + d * e[0];
      Math.abs(m) < s && p > -i && p < n && (a = Math.max(a, p + i));
    };
  for (let h of o.edges) {
    if (h.inner || h.layered || h.s1 - h.s0 < 0.1) continue;
    let f = h1t(h);
    if (!(
      f[0] > t[0] + l ||
      f[2] < t[0] - l ||
      f[1] > t[1] + l ||
      f[3] < t[1] - l
    )) {
      for (let u = h.s0; u <= h.s1 + 0.01; u += 1)
        if (
          (Ot(h, Math.min(u, h.s1), r),
          !(Math.abs(r.x - t[0]) > l || Math.abs(r.z - t[1]) > l))
        )
          for (let d = -r.w; d <= r.w + 0.01; d += Math.max(0.5, r.w / 4))
            c(r.x + r.nx * d, r.z + r.nz * d);
    }
  }
  for (let h of o.juns)
    if (!(
      h.elev ||
      h.bb[0] > t[0] + l ||
      h.bb[2] < t[0] - l ||
      h.bb[1] > t[1] + l ||
      h.bb[3] < t[1] - l
    ))
      for (let f of h.rings)
        for (let u = 0; u < f.pts.length; u += 2) c(f.pts[u], f.pts[u + 1]);
  return a;
}
function f1t(o, t, e) {
  let s = Rt([0.4, 0.39, 0.37], Tt.conc),
    n = 1;
  for (let i = -t; i < 0; i += n)
    for (let a = -e; a < e; a += n)
      [
        [0.5, 0.5],
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ].some(([r, l]) => m0(Ye.x + i + r * n, a + l * n) === "road") ||
        $i(
          o,
          [
            [i, a],
            [i + n, a],
            [i + n, a + n],
            [i, a + n],
          ].map(([r, l]) => [Ye.x + r, $t(Ye.x + r, l) + 0.12, l]),
          s,
        );
}
function u1t(o, t, e, s, n) {
  let i = Rt([0.47, 0.44, 0.4], Tt.planks),
    a = 2,
    r = (l, c) => {
      let h = t[0] + c,
        f = t[1] - l,
        u = Math.min(1, (l + e) / e),
        d = $t(h, f);
      return Math.max(d + 0.3, d + 0.3 + (n - d - 0.3) * u * u * (3 - 2 * u));
    };
  for (let l = -e; l < 0; l += a)
    for (let c = -s; c < s; c += a) {
      let h = m0(t[0] + c + a / 2, t[1] - l - a / 2);
      if (h === "road" || h === "walk") continue;
      let f = [
        [l, c],
        [l + a, c],
        [l + a, c + a],
        [l, c + a],
      ].map(([u, d]) => [t[0] + d, r(u, d), t[1] - u]);
      $i(o, f, i);
    }
}
