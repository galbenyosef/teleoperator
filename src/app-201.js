// app 201 — math
// Lines 111159-111297 of readable/app.pretty.js (statement-aligned).
function YK(o) {
  (o.claim({ name: "levis", ids: dr.levis, poly: null }),
    o.claim({
      name: "levisplaza",
      poly: dr.plaza,
      buildings: !1,
      props: ["car", "tree", "ptree", "lamp", "palm", "hydrant"],
    }),
    o.claim({
      name: "unionsqframe",
      ids: [dr.westin, dr.macys, dr.neiman, dr.saks],
      poly: null,
    }));
  let t = dr.sfmoma;
  o.claim({
    name: "sfmoma",
    ids: [...t.botta, t.drum, t.ext, t.foyer],
    poly: null,
  });
}
var Zu = (o, t) => {
    let e = o.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return er(o, s);
    }
    return null;
  },
  yL = (o, t, e) => {
    let s = !1;
    for (let n = 0, i = o.length - 1; n < o.length; i = n++) {
      let [a, r] = o[n],
        [l, c] = o[i];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  },
  Qu = (o, t, e, s) => {
    let n = 1e9,
      i = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (i = Math.max(i, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    o.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, i, r],
      y0: e,
      y1: s,
    });
  },
  Np = (o, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, i] of t) {
      let a = o.terrainAt(n, i);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  };
function Ez(o, t, e) {
  let s = [],
    n = (a) => a[0] * t[0] + a[1] * t[1] - e;
  for (let a = 0; a < o.length; a++) {
    let r = o[a],
      l = o[(a + 1) % o.length],
      c = n(r),
      h = n(l);
    if ((c <= 0 && s.push(r), c <= 0 != h <= 0)) {
      let f = c / (c - h);
      s.push([r[0] + (l[0] - r[0]) * f, r[1] + (l[1] - r[1]) * f]);
    }
  }
  let i = [];
  for (let a of s) {
    let r = i[i.length - 1];
    (!r || Math.hypot(a[0] - r[0], a[1] - r[1]) > 0.05) && i.push(a);
  }
  return i.length >= 3 ? i : null;
}
var fbt = (o) => {
  let t = 0;
  for (let e = 0; e < o.length; e++) {
    let s = o[e],
      n = o[(e + 1) % o.length];
    t += s[0] * n[1] - n[0] * s[1];
  }
  return Math.abs(t) / 2;
};
function ubt(o, t, e, s, n, i) {
  let a = 1e9,
    r = -1e9,
    l = 1e9,
    c = -1e9;
  for (let [h, f] of e)
    ((a = Math.min(a, h)),
      (r = Math.max(r, h)),
      (l = Math.min(l, f)),
      (c = Math.max(c, f)));
  for (let h = a; h < r; h += s)
    for (let f = l; f < c; f += s) {
      if (!yL(e, h + s / 2, f + s / 2)) continue;
      let u = [
          [h, f],
          [h + s, f],
          [h + s, f + s],
          [h, f + s],
        ].map(([p, m]) => [p, t.terrainAt(p, m) + n, m]),
        d = i(h + s / 2, f + s / 2);
      o.quad(
        u[0],
        u[3],
        u[2],
        u[1],
        [u[0][0], u[0][2]],
        [u[3][0], u[3][2]],
        [u[2][0], u[2][2]],
        [u[1][0], u[1][2]],
        d,
        [0, 1, 0],
      );
    }
}
var dbt = We(we.terracotta, 0.4, 0.19, 0.14),
  kz = We(we.terracotta, 0.36, 0.17, 0.12),
  pbt = Lt(Ct.glass, 0.035, 0.04, 0.045),
  mbt = Lt(Ct.stone, 0.42, 0.36, 0.3),
  gbt = We(we.granite, 0.8, 0.77, 0.72),
  bbt = We(we.terracotta, 0.55, 0.3, 0.22),
  bL = We(we.granite, 0.5, 0.4, 0.33),
  zz = We(we.granite, 0.38, 0.31, 0.26),
  GK = Lt(Ct.water, 0.3, 0.38, 0.4),
  VK = Lt(Ct.water, 0.42, 0.46, 0.48),
  xbt = Lt(Ct.glass, 0.035, 0.045, 0.055),
  wL = Lt(Ct.metal, 0.3, 0.31, 0.32),
  vbt = Lt(Ct.leaf, 0.12, 0.2, 0.08);
