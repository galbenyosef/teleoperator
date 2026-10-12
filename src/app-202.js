// app 202 — math
// Lines 110903-111041 of readable/app.pretty.js (statement-aligned).
function $$(i) {
  (i.claim({ name: "levis", ids: Ja.levis, poly: null }),
    i.claim({
      name: "levisplaza",
      poly: Ja.plaza,
      buildings: !1,
      props: ["car", "tree", "ptree", "lamp", "palm", "hydrant"],
    }),
    i.claim({
      name: "unionsqframe",
      ids: [Ja.westin, Ja.macys, Ja.neiman, Ja.saks],
      poly: null,
    }));
  let t = Ja.sfmoma;
  i.claim({
    name: "sfmoma",
    ids: [...t.botta, t.drum, t.ext, t.foyer],
    poly: null,
  });
}
var bu = (i, t) => {
    let e = i.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return mr(i, s);
    }
    return null;
  },
  qP = (i, t, e) => {
    let s = !1;
    for (let n = 0, o = i.length - 1; n < i.length; o = n++) {
      let [a, r] = i[n],
        [l, c] = i[o];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  },
  xu = (i, t, e, s) => {
    let n = 1e9,
      o = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (o = Math.max(o, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    i.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, o, r],
      y0: e,
      y1: s,
    });
  },
  ap = (i, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, o] of t) {
      let a = i.terrainAt(n, o);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  };
function Ek(i, t, e) {
  let s = [],
    n = (a) => a[0] * t[0] + a[1] * t[1] - e;
  for (let a = 0; a < i.length; a++) {
    let r = i[a],
      l = i[(a + 1) % i.length],
      c = n(r),
      h = n(l);
    if ((c <= 0 && s.push(r), c <= 0 != h <= 0)) {
      let f = c / (c - h);
      s.push([r[0] + (l[0] - r[0]) * f, r[1] + (l[1] - r[1]) * f]);
    }
  }
  let o = [];
  for (let a of s) {
    let r = o[o.length - 1];
    (!r || Math.hypot(a[0] - r[0], a[1] - r[1]) > 0.05) && o.push(a);
  }
  return o.length >= 3 ? o : null;
}
var U1t = (i) => {
  let t = 0;
  for (let e = 0; e < i.length; e++) {
    let s = i[e],
      n = i[(e + 1) % i.length];
    t += s[0] * n[1] - n[0] * s[1];
  }
  return Math.abs(t) / 2;
};
function G1t(i, t, e, s, n, o) {
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
      if (!qP(e, h + s / 2, f + s / 2)) continue;
      let u = [
          [h, f],
          [h + s, f],
          [h + s, f + s],
          [h, f + s],
        ].map(([p, m]) => [p, t.terrainAt(p, m) + n, m]),
        d = o(h + s / 2, f + s / 2);
      i.quad(
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
var W1t = Be(be.terracotta, 0.4, 0.19, 0.14),
  kk = Be(be.terracotta, 0.36, 0.17, 0.12),
  q1t = It(Lt.glass, 0.035, 0.04, 0.045),
  j1t = It(Lt.stone, 0.42, 0.36, 0.3),
  V1t = Be(be.granite, 0.8, 0.77, 0.72),
  $1t = Be(be.terracotta, 0.55, 0.3, 0.22),
  UP = Be(be.granite, 0.5, 0.4, 0.33),
  _k = Be(be.granite, 0.38, 0.31, 0.26),
  H$ = It(Lt.water, 0.3, 0.38, 0.4),
  D$ = It(Lt.water, 0.42, 0.46, 0.48),
  X1t = It(Lt.glass, 0.035, 0.045, 0.055),
  jP = It(Lt.metal, 0.3, 0.31, 0.32),
  K1t = It(Lt.leaf, 0.12, 0.2, 0.08);
