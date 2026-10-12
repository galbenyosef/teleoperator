// app 111 — math
// Lines 82079-82346 of readable/app.pretty.js (statement-aligned).
var Oft = [
  [-2931.2, -1401.2],
  [-2904.3, -1401.7],
];
function Hft({ B: i, colliders: t }, e) {
  let s = i.R("aquatic").solid,
    n = At([0.62, 0.61, 0.57], Tt.conc),
    o = At([0.3, 0.3, 0.3], Tt.metal),
    [[a, r], [l, c]] = Oft,
    h = Math.hypot(l - a, c - r),
    f = (l - a) / h,
    u = (c - r) / h,
    d = Math.round(h / 1.4),
    p = 1e9,
    m = -1e9;
  for (let g = 0; g <= d; g++) {
    let b = a + (f * h * g) / d,
      x = r + (u * h * g) / d,
      v = Math.max(e(b, x), e(b - u * 2.6, x + f * 2.6));
    ((p = Math.min(p, e(b, x), v)),
      (m = Math.max(m, v)),
      es(s, b, x, 0.21, v - 0.3, v + 0.82, 10, n, 0.19),
      es(s, b, x, 0.215, v + 0.62, v + 0.7, 10, o));
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
var Dft = new Set(["Ferry Plaza", "Al Scoma Way", "McDowell Road Southwest"]);
function Uft({ B: i, colliders: t }, e) {
  let { D: s, L: n } = e,
    o = At([0.07, 0.09, 0.08], Tt.metal),
    a = {},
    r = (l, c, h) =>
      n.coverAt(l, c) & 8 &&
      n.terrainAt(l, c) < 0.3 &&
      n.driveHeight(l, c, void 0, h) < 0.3;
  for (let l of s.edges)
    if (!(
      !Dft.has(l.name) ||
      l.elev ||
      l.layered ||
      l.inner ||
      l.s1 - l.s0 < 2
    ))
      for (let c of [-1, 1]) {
        let h = [],
          f = () => {
            if (h.length > 1) {
              let u = i.get(
                "wrail" +
                  Math.floor((h[0][0] + 3e3) / 400) +
                  "_" +
                  Math.floor((h[0][2] + 3e3) / 400),
                "solid",
              );
              for (let d = 0; d < h.length; d++) {
                let [p, m, g] = h[d];
                if (
                  (Ms(
                    u,
                    p - 0.04,
                    m - 0.05,
                    g - 0.04,
                    p + 0.04,
                    m + 1.08,
                    g + 0.04,
                    o,
                    { top: !1 },
                  ),
                  d + 1 < h.length)
                ) {
                  let [b, x, v, y, M] = h[d + 1],
                    S = Math.hypot(b - p, v - g);
                  (ss(u, [p, m + 1.05, g], [b, x + 1.05, v], 0.08, 0.06, o),
                    ss(u, [p, m + 0.55, g], [b, x + 0.55, v], 0.04, 0.04, o));
                  let w = (h[d][3] + y) / 2,
                    z = (h[d][4] + M) / 2,
                    _ = (b - p) / S,
                    R = (v - g) / S;
                  t.push({
                    t: "obb",
                    x: (p + b) / 2 + w * 1,
                    z: (g + v) / 2 + z * 1,
                    hx: S / 2 + 0.3,
                    hz: 1.2,
                    c: _,
                    s: -R,
                    y0: Math.min(m, x) - 2,
                    y1: Math.max(m, x) + 3,
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
            let x = a.x + a.nx * b * c,
              v = a.z + a.nz * b * c;
            if (r(x, v, a.y)) {
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
function tq(i) {
  for (let t of QW(i).list)
    for (let e of t.claims || []) i.claim({ name: "wf_" + t.name, ...e });
}
function eq(i, t, e) {
  for (let s of QW(i).list)
    i.site(
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
        for (let o of n.colliders)
          if (o.y1 === void 0) {
            let [a, r] =
                o.t === "box"
                  ? [(o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2]
                  : [o.x, o.z],
              l = Yt(a, r) + s.F.dy;
            ((o.y0 = l - 3), (o.y1 = l + 12));
          }
      },
    );
}
var JW = new WeakMap(),
  Gft = (i) => {
    let t = JW.get(i);
    if (!t) {
      t = [1e9, 1e9, -1e9, -1e9];
      for (let e = 0; e < i.P.length; e += 3)
        ((t[0] = Math.min(t[0], i.P[e] - 30)),
          (t[2] = Math.max(t[2], i.P[e] + 30)),
          (t[1] = Math.min(t[1], i.P[e + 1] - 30)),
          (t[3] = Math.max(t[3], i.P[e + 1] + 30)));
      JW.set(i, t);
    }
    return t;
  };
function ZW(i, t, e, s, n, o) {
  let a = 0,
    r = {},
    l = n + 60,
    c = (h, f) => {
      let u = h - t[0],
        d = f - t[1],
        p = u * e[0] + d * e[1],
        m = -u * e[1] + d * e[0];
      Math.abs(m) < s && p > -o && p < n && (a = Math.max(a, p + o));
    };
  for (let h of i.edges) {
    if (h.inner || h.layered || h.s1 - h.s0 < 0.1) continue;
    let f = Gft(h);
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
  for (let h of i.juns)
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
function Wft(i, t, e) {
  let s = At([0.4, 0.39, 0.37], Tt.conc),
    n = 1;
  for (let o = -t; o < 0; o += n)
    for (let a = -e; a < e; a += n)
      [
        [0.5, 0.5],
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ].some(([r, l]) => Qr(Ve.x + o + r * n, a + l * n) === "road") ||
        Fi(
          i,
          [
            [o, a],
            [o + n, a],
            [o + n, a + n],
            [o, a + n],
          ].map(([r, l]) => [Ve.x + r, Yt(Ve.x + r, l) + 0.12, l]),
          s,
        );
}
function qft(i, t, e, s, n) {
  let o = At([0.47, 0.44, 0.4], Tt.planks),
    a = 2,
    r = (l, c) => {
      let h = t[0] + c,
        f = t[1] - l,
        u = Math.min(1, (l + e) / e),
        d = Yt(h, f);
      return Math.max(d + 0.3, d + 0.3 + (n - d - 0.3) * u * u * (3 - 2 * u));
    };
  for (let l = -e; l < 0; l += a)
    for (let c = -s; c < s; c += a) {
      let h = Qr(t[0] + c + a / 2, t[1] - l - a / 2);
      if (h === "road" || h === "walk") continue;
      let f = [
        [l, c],
        [l + a, c],
        [l + a, c + a],
        [l, c + a],
      ].map(([u, d]) => [t[0] + d, r(u, d), t[1] - u]);
      Fi(i, f, o);
    }
}
