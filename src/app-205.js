// app 205 — math
// Lines 111734-112059 of readable/app.pretty.js (statement-aligned).
function hmt(i, t) {
  let { D: e, L: s } = t,
    n = Ja.sfmoma,
    o = (p, m, g) => {
      for (let b = m; b < g - 0.01; b += 0.6) {
        let x = Math.min(g, b + 0.48);
        (ys(i, p, b, x, V$, { vBase: m }),
          x < g && ys(i, p, x, Math.min(g, b + 0.6), amt, { vBase: m }));
      }
    },
    a = 1e9,
    r = [];
  for (let p of n.botta) {
    let m = bu(e, p);
    if (m) {
      let g = va(m);
      (r.push([p, g]), (a = Math.min(a, ap(s, g)[0])));
    }
  }
  let l = a,
    c = [-0.707, 0.707],
    h = 0;
  {
    let p = r.find(([m]) => m === n.botta[0]);
    p &&
      ((c = hm(s, Xo(p[1]), "3rd Street").n),
      (h = Math.max(...p[1].map((g) => g[0] * c[0] + g[1] * c[1]))));
  }
  for (let [p, m] of r) {
    let g = p === n.botta[0];
    if ((ys(i, m, l - 0.6, l + 4.2, WP, { vBase: l }), g)) {
      let b = l + 4.2;
      for (let [x, v] of [
        [0, l + 13],
        [7, l + 20.5],
        [14, l + 27],
      ]) {
        let y = x ? Ek(m, c, h - x) : m;
        y && (o(y, b, v), Ua(i, y, v, It(Lt.stone, 0.32, 0.27, 0.23)), (b = v));
      }
    } else
      (o(m, l + 4.2, l + 31), Ua(i, m, l + 31, It(Lt.stone, 0.32, 0.27, 0.23)));
    xu(t, m, l - 3, l + 35);
  }
  let f = bu(e, n.drum);
  if (f) {
    let p = va(f),
      [m, g] = p.reduce(
        (_, R) => [_[0] + R[0] / p.length, _[1] + R[1] / p.length],
        [0, 0],
      ),
      b = 0;
    for (let [_, R] of p) b = Math.max(b, Math.hypot(_ - m, R - g));
    let x = c[0],
      v = c[1],
      y = l + 33,
      M = l + 43,
      S = (_, R) =>
        y + (M - y) * (0.5 - (0.5 * ((_ - m) * x + (R - g) * v)) / b),
      w = 32,
      z = Array.from({ length: w }, (_, R) => [
        m + Math.cos((R / w) * Math.PI * 2) * b,
        g + Math.sin((R / w) * Math.PI * 2) * b,
      ]);
    ys(i, z, l + 4.2, l + 17, V$);
    for (let _ = l + 17, R = 0; _ < M; _ += 0.8, R++)
      ys(
        i,
        z,
        () => _,
        (T, E) => Math.max(_, Math.min(_ + 0.8, S(T, E))),
        R % 2 ? WP : rmt,
      );
    (xa(i, z, null, It(Lt.glass, 0.25, 0.3, 0.34), S), xu(t, z, l - 3, M + 2));
  }
  let u = bu(e, n.ext);
  if (u) {
    let p = va(u),
      m = Xo(p),
      [g] = ap(s, p),
      b = g + Math.max(40, u.top - u.base);
    ys(i, p, g - 0.6, b, lmt, { vBase: g });
    for (let x of m)
      if (!(x.L < 6))
        for (let v = 0.8; v < x.L - 0.5; v += 1.6) {
          let y = [
            x.a[0] + x.u[0] * v + x.n[0] * 0.18,
            x.a[1] + x.u[1] * v + x.n[1] * 0.18,
          ];
          nn(
            i,
            y,
            x.u,
            x.n,
            0.12,
            0.18,
            g + 4 + 3 * Math.sin(v * 0.21),
            b - 1,
            cmt,
          );
        }
    (Ua(i, p, b, It(Lt.stone, 0.6, 0.6, 0.6)), xu(t, p, g - 3, b + 2));
  }
  let d = bu(e, n.foyer);
  if (d) {
    let p = va(d),
      [m] = ap(s, p);
    (ys(i, p, m - 0.6, m + 4.2, WP),
      o(p, m + 4.2, m + 9),
      Ua(i, p, m + 9, It(Lt.stone, 0.4, 0.33, 0.28)),
      xu(t, p, m - 3, m + 11));
  }
}
var VP = [];
function X$(i, t, e) {
  let s = [
      ["levis", Y1t],
      ["westin", Q1t],
      ["macys", smt],
      ["neiman", nmt],
      ["saks", omt],
      ["sfmoma", hmt],
    ],
    n = (o, a) => {
      let r = new Ce(),
        l = performance.now();
      try {
        a(r, e);
      } catch (c) {
        console.error("r19:", o, c);
      }
      return (
        globalThis.SF_R19T &&
          console.log("r19", o, (performance.now() - l).toFixed(1)),
        r
      );
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [o, a] of s) gn(i.group, n(o, a), t.lm, "R19_" + o);
    return;
  }
  for (let [o, a] of s)
    VP.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(o, a);
      } finally {
        e.colliders = r;
      }
      return (gn(i.rc?.group || i.group, c, t.lm, "R19_" + o), l);
    });
}
var Xl = {
  marquis: 436648569,
  rincon: [944990390, 944990391],
  mlkPillars: [1025679460, 1025679461, 1025679463],
  moscone: [
    [-713.9, 1211.6],
    [-766.8, 1264.3],
  ],
  lotta: [-846.3, 823.9],
  upper: [
    "Church Street",
    "Sanchez Street",
    "Noe Street",
    "Castro Street",
    "17th Street",
  ],
  stops: [
    "Main Street",
    "Beale Street",
    "1st Street",
    "Fremont Street",
    "2nd Street",
    "New Montgomery Street",
    "Montgomery Street",
    "3rd Street",
    "Kearny Street",
    "4th Street",
    "Stockton Street",
    "5th Street",
    "Powell Street",
    "6th Street",
    "7th Street",
    "8th Street",
    "Drumm Street",
  ],
};
function eX(i) {
  (i.claim({ name: "marquis", ids: [Xl.marquis], poly: null }),
    i.claim({ name: "onerincon", ids: Xl.rincon, poly: null }),
    i.claim({ name: "mlkfalls", ids: Xl.mlkPillars, poly: null }));
  {
    let [t, e] = Xl.moscone,
      s = Math.hypot(e[0] - t[0], e[1] - t[1]),
      n = [(e[0] - t[0]) / s, (e[1] - t[1]) / s],
      o = [-n[1], n[0]],
      a = (r, l) => [t[0] + n[0] * r + o[0] * l, t[1] + n[1] * r + o[1] * l];
    for (let r of [-1, 1])
      i.claim({
        name: "mlkpool",
        buildings: !1,
        props: ["ptree", "tree"],
        poly: [a(21, r), a(63, r), a(63, 12 * r), a(21, 12 * r)],
      });
  }
  {
    let [t, e] = Xl.lotta;
    i.claim({
      name: "lotta",
      buildings: !1,
      props: ["lamp", "tree", "hydrant"],
      poly: [
        [t - 2.2, e - 2.2],
        [t + 2.2, e - 2.2],
        [t + 2.2, e + 2.2],
        [t - 2.2, e + 2.2],
      ],
    });
  }
}
var sX = (i, t) => {
    let e = i.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return mr(i, s);
    }
    return null;
  },
  nX = (i, t, e, s) => {
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
  iX = (i, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, o] of t) {
      let a = i.terrainAt(n, o);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  },
  fmt = (i, t, e, s, n, o, a, r = {}) => {
    let l = {
      t: "obb",
      x: t[0],
      z: t[1],
      hx: n,
      hz: s,
      c: e[1],
      s: e[0],
      y0: o,
      y1: a,
      ...r,
    };
    (i.colliders.push(l), r.island && i.D && (i.D.islands ||= []).push(l));
  };
function oX(i) {
  let t = 0,
    e = 0;
  for (let [m, g] of i) ((t += m / i.length), (e += g / i.length));
  let s = 0,
    n = 0,
    o = 0;
  for (let m of Xo(i)) {
    let g = m.L;
    ((s += m.u[0] * m.u[0] * g),
      (n += m.u[0] * m.u[1] * g),
      (o += m.u[1] * m.u[1] * g));
  }
  let a = 0.5 * Math.atan2(2 * n, s - o),
    r = [Math.cos(a), Math.sin(a)],
    l = [-r[1], r[0]],
    c = (m) => {
      let g = 1e9,
        b = -1e9;
      for (let [x, v] of i) {
        let y = (x - t) * m[0] + (v - e) * m[1];
        ((g = Math.min(g, y)), (b = Math.max(b, y)));
      }
      return [g, b];
    },
    [h, f] = c(r),
    [u, d] = c(l);
  return (
    d - u > f - h &&
      (([r, l] = [l, [-l[1], l[0]]]), ([h, f] = c(r)), ([u, d] = c(l))),
    {
      c: [
        t + (r[0] * (h + f)) / 2 + (l[0] * (u + d)) / 2,
        e + (r[1] * (h + f)) / 2 + (l[1] * (u + d)) / 2,
      ],
      u: r,
      n: l,
      hl: (f - h) / 2,
      hw: (d - u) / 2,
    }
  );
}
var umt = Be(be.granite, 0.66, 0.65, 0.62),
  K$ = Be(be.granite, 0.5, 0.49, 0.47),
  Rk = It(Lt.metal, 0.07, 0.08, 0.075),
  dmt = It(Lt.glass, 0.42, 0.47, 0.48),
  pmt = It(Lt.gloss, 0.72, 0.73, 0.72),
  Y$ = It(Lt.metal, 0.5, 0.52, 0.53),
  mmt = It(Lt.matte, 0.75, 0.6, 0.12),
  gmt = It(Lt.gloss, 0.45, 0.12, 0.07),
  bmt = It(Lt.gloss, 0.85, 0.66, 0.1),
  xmt = Be(be.terracotta, 0.42, 0.17, 0.11),
  vmt = It(Lt.metal, 0.55, 0.56, 0.57);
