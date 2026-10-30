// app 204 — math
// Lines 111990-112315 of readable/app.pretty.js (statement-aligned).
function Ibt(o, t) {
  let { D: e, L: s } = t,
    n = dr.sfmoma,
    i = (p, m, g) => {
      for (let b = m; b < g - 0.01; b += 0.6) {
        let v = Math.min(g, b + 0.48);
        (Ss(o, p, b, v, KK, { vBase: m }),
          v < g && Ss(o, p, v, Math.min(g, b + 0.6), Abt, { vBase: m }));
      }
    },
    a = 1e9,
    r = [];
  for (let p of n.botta) {
    let m = Zu(e, p);
    if (m) {
      let g = Ra(m);
      (r.push([p, g]), (a = Math.min(a, Np(s, g)[0])));
    }
  }
  let l = a,
    c = [-0.707, 0.707],
    h = 0;
  {
    let p = r.find(([m]) => m === n.botta[0]);
    p &&
      ((c = Qm(s, ia(p[1]), "3rd Street").n),
      (h = Math.max(...p[1].map((g) => g[0] * c[0] + g[1] * c[1]))));
  }
  for (let [p, m] of r) {
    let g = p === n.botta[0];
    if ((Ss(o, m, l - 0.6, l + 4.2, vL, { vBase: l }), g)) {
      let b = l + 4.2;
      for (let [v, x] of [
        [0, l + 13],
        [7, l + 20.5],
        [14, l + 27],
      ]) {
        let y = v ? Ez(m, c, h - v) : m;
        y && (i(y, b, x), sr(o, y, x, Lt(Ct.stone, 0.32, 0.27, 0.23)), (b = x));
      }
    } else
      (i(m, l + 4.2, l + 31), sr(o, m, l + 31, Lt(Ct.stone, 0.32, 0.27, 0.23)));
    Qu(t, m, l - 3, l + 35);
  }
  let f = Zu(e, n.drum);
  if (f) {
    let p = Ra(f),
      [m, g] = p.reduce(
        (z, A) => [z[0] + A[0] / p.length, z[1] + A[1] / p.length],
        [0, 0],
      ),
      b = 0;
    for (let [z, A] of p) b = Math.max(b, Math.hypot(z - m, A - g));
    let v = c[0],
      x = c[1],
      y = l + 33,
      M = l + 43,
      S = (z, A) =>
        y + (M - y) * (0.5 - (0.5 * ((z - m) * v + (A - g) * x)) / b),
      w = 32,
      _ = Array.from({ length: w }, (z, A) => [
        m + Math.cos((A / w) * Math.PI * 2) * b,
        g + Math.sin((A / w) * Math.PI * 2) * b,
      ]);
    Ss(o, _, l + 4.2, l + 17, KK);
    for (let z = l + 17, A = 0; z < M; z += 0.8, A++)
      Ss(
        o,
        _,
        () => z,
        (T, E) => Math.max(z, Math.min(z + 0.8, S(T, E))),
        A % 2 ? vL : Pbt,
      );
    (Ta(o, _, null, Lt(Ct.glass, 0.25, 0.3, 0.34), S), Qu(t, _, l - 3, M + 2));
  }
  let u = Zu(e, n.ext);
  if (u) {
    let p = Ra(u),
      m = ia(p),
      [g] = Np(s, p),
      b = g + Math.max(40, u.top - u.base);
    Ss(o, p, g - 0.6, b, Cbt, { vBase: g });
    for (let v of m)
      if (!(v.L < 6))
        for (let x = 0.8; x < v.L - 0.5; x += 1.6) {
          let y = [
            v.a[0] + v.u[0] * x + v.n[0] * 0.18,
            v.a[1] + v.u[1] * x + v.n[1] * 0.18,
          ];
          cn(
            o,
            y,
            v.u,
            v.n,
            0.12,
            0.18,
            g + 4 + 3 * Math.sin(x * 0.21),
            b - 1,
            Lbt,
          );
        }
    (sr(o, p, b, Lt(Ct.stone, 0.6, 0.6, 0.6)), Qu(t, p, g - 3, b + 2));
  }
  let d = Zu(e, n.foyer);
  if (d) {
    let p = Ra(d),
      [m] = Np(s, p);
    (Ss(o, p, m - 0.6, m + 4.2, vL),
      i(p, m + 4.2, m + 9),
      sr(o, p, m + 9, Lt(Ct.stone, 0.4, 0.33, 0.28)),
      Qu(t, p, m - 3, m + 11));
  }
}
var ML = [];
function JK(o, t, e) {
  let s = [
      ["levis", ybt],
      ["westin", Sbt],
      ["macys", _bt],
      ["neiman", Ebt],
      ["saks", Rbt],
      ["sfmoma", Ibt],
    ],
    n = (i, a) => {
      let r = new Be(),
        l = performance.now();
      try {
        a(r, e);
      } catch (c) {
        console.error("r19:", i, c);
      }
      return (
        globalThis.SF_R19T &&
          console.log("r19", i, (performance.now() - l).toFixed(1)),
        r
      );
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [i, a] of s) vn(o.group, n(i, a), t.lm, "R19_" + i);
    return;
  }
  for (let [i, a] of s)
    ML.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(i, a);
      } finally {
        e.colliders = r;
      }
      return (vn(o.rc?.group || o.group, c, t.lm, "R19_" + i), l);
    });
}
var mc = {
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
function iY(o) {
  (o.claim({ name: "marquis", ids: [mc.marquis], poly: null }),
    o.claim({ name: "onerincon", ids: mc.rincon, poly: null }),
    o.claim({ name: "mlkfalls", ids: mc.mlkPillars, poly: null }));
  {
    let [t, e] = mc.moscone,
      s = Math.hypot(e[0] - t[0], e[1] - t[1]),
      n = [(e[0] - t[0]) / s, (e[1] - t[1]) / s],
      i = [-n[1], n[0]],
      a = (r, l) => [t[0] + n[0] * r + i[0] * l, t[1] + n[1] * r + i[1] * l];
    for (let r of [-1, 1])
      o.claim({
        name: "mlkpool",
        buildings: !1,
        props: ["ptree", "tree"],
        poly: [a(21, r), a(63, r), a(63, 12 * r), a(21, 12 * r)],
      });
  }
  {
    let [t, e] = mc.lotta;
    o.claim({
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
var oY = (o, t) => {
    let e = o.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return er(o, s);
    }
    return null;
  },
  aY = (o, t, e, s) => {
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
  rY = (o, t) => {
    let e = 1e9,
      s = -1e9;
    for (let [n, i] of t) {
      let a = o.terrainAt(n, i);
      ((e = Math.min(e, a)), (s = Math.max(s, a)));
    }
    return [e, s];
  },
  Fbt = (o, t, e, s, n, i, a, r = {}) => {
    let l = {
      t: "obb",
      x: t[0],
      z: t[1],
      hx: n,
      hz: s,
      c: e[1],
      s: e[0],
      y0: i,
      y1: a,
      ...r,
    };
    (o.colliders.push(l), r.island && o.D && (o.D.islands ||= []).push(l));
  };
function lY(o) {
  let t = 0,
    e = 0;
  for (let [m, g] of o) ((t += m / o.length), (e += g / o.length));
  let s = 0,
    n = 0,
    i = 0;
  for (let m of ia(o)) {
    let g = m.L;
    ((s += m.u[0] * m.u[0] * g),
      (n += m.u[0] * m.u[1] * g),
      (i += m.u[1] * m.u[1] * g));
  }
  let a = 0.5 * Math.atan2(2 * n, s - i),
    r = [Math.cos(a), Math.sin(a)],
    l = [-r[1], r[0]],
    c = (m) => {
      let g = 1e9,
        b = -1e9;
      for (let [v, x] of o) {
        let y = (v - t) * m[0] + (x - e) * m[1];
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
var Obt = We(we.granite, 0.66, 0.65, 0.62),
  ZK = We(we.granite, 0.5, 0.49, 0.47),
  Az = Lt(Ct.metal, 0.07, 0.08, 0.075),
  Bbt = Lt(Ct.glass, 0.42, 0.47, 0.48),
  Nbt = Lt(Ct.gloss, 0.72, 0.73, 0.72),
  QK = Lt(Ct.metal, 0.5, 0.52, 0.53),
  Hbt = Lt(Ct.matte, 0.75, 0.6, 0.12),
  Dbt = Lt(Ct.gloss, 0.45, 0.12, 0.07),
  Ubt = Lt(Ct.gloss, 0.85, 0.66, 0.1),
  Gbt = We(we.terracotta, 0.42, 0.17, 0.11),
  Vbt = Lt(Ct.metal, 0.55, 0.56, 0.57);
