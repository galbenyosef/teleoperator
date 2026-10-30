// app 197 — math
// Lines 109901-110245 of readable/app.pretty.js (statement-aligned).
function Vgt(o, t) {
  let { L: e } = t,
    s = Nw.pg,
    n = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2],
    i = [(s[2][0] + s[3][0]) / 2, (s[2][1] + s[3][1]) / 2],
    a = Math.hypot(i[0] - n[0], i[1] - n[1]),
    r = [(i[0] - n[0]) / a, (i[1] - n[1]) / a],
    l = [-r[1], r[0]],
    c = Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) / 2,
    h = (u, d) => [n[0] + r[0] * u + l[0] * d, n[1] + r[1] * u + l[1] * d],
    f = (u, d) => e.driveHeight(u, d);
  for (let u = 2; u < a - 2; u += 3) {
    let d = h(u, 0),
      p = h(u + 3, 0),
      m = f(...d) + 0.04,
      g = f(...p) + 0.04;
    oe(
      o,
      [
        [d[0] - l[0] * 1.6, m, d[1] - l[1] * 1.6],
        [d[0] + l[0] * 1.6, m, d[1] + l[1] * 1.6],
        [p[0] + l[0] * 1.6, g, p[1] + l[1] * 1.6],
        [p[0] - l[0] * 1.6, g, p[1] - l[1] * 1.6],
      ],
      Ugt,
      [0, 1, 0],
      (b) => [b[0], b[2]],
    );
  }
  {
    let u = h(a * 0.66, -c * 0.35),
      d = f(...u),
      p = 4.6;
    for (let g = 0; g < 16; g++) {
      let b = (g / 16) * Math.PI * 2,
        v = ((g + 1) / 16) * Math.PI * 2;
      oe(
        o,
        [
          [u[0], d + 0.05, u[1]],
          [
            u[0] + Math.cos(b) * (p + 1.5),
            d + 0.05,
            u[1] + Math.sin(b) * (p + 1.5),
          ],
          [
            u[0] + Math.cos(v) * (p + 1.5),
            d + 0.05,
            u[1] + Math.sin(v) * (p + 1.5),
          ],
        ],
        Ggt,
        [0, 1, 0],
        (x) => [x[0], x[2]],
      );
    }
    let m = (g, b) => [
      u[0] + Math.cos(g) * p * Math.cos(b),
      d + 0.2 + p * 0.8 * Math.sin(b),
      u[1] + Math.sin(g) * p * Math.cos(b),
    ];
    for (let g = 0; g < 12; g++) {
      let b = (g / 12) * Math.PI * 2;
      for (let v = 0; v < 6; v++)
        Ce(
          o,
          m(b, ((v / 6) * Math.PI) / 2),
          m(b, (((v + 1) / 6) * Math.PI) / 2),
          0.04,
          zK,
          4,
        );
    }
    for (let g of [0.25, 0.55, 0.85, 1.15])
      for (let b = 0; b < 24; b++)
        Ce(
          o,
          m((b / 24) * Math.PI * 2, g),
          m(((b + 1) / 24) * Math.PI * 2, g),
          0.035,
          zK,
          4,
        );
    (Ce(o, [u[0], d, u[1]], [u[0], d + p * 0.8 + 0.6, u[1]], 0.09, _K, 6),
      t.colliders.push({
        t: "circ",
        x: u[0],
        z: u[1],
        r: p * 0.95,
        y0: d - 1,
        y1: d + 4,
      }));
  }
  {
    let u = h(a * 0.16, 0),
      d = f(...u);
    for (let p = 0; p < 9; p++) {
      let m = (p / 9) * Math.PI,
        g = 6.5,
        b = 2.6,
        v = [u[0] + l[0] * Math.cos(m) * b, d, u[1] + l[1] * Math.cos(m) * b],
        x = [
          u[0] + r[0] * 1.2 + l[0] * Math.cos(m) * b * 0.8,
          d + g * Math.sin(m) * 0.4 + 3,
          u[1] + r[1] * 1.2 + l[1] * Math.cos(m) * b * 0.8,
        ],
        y = [u[0] + r[0] * 2.5, d + g, u[1] + r[1] * 2.5];
      (Ce(o, v, x, 0.12, fL, 5), Ce(o, x, y, 0.1, fL, 5));
    }
    (qe(
      o,
      u[0] + r[0] * 2.5,
      u[1] + r[1] * 2.5,
      [
        [0.01, d + 5.6],
        [1, d + 6],
        [1.2, d + 6.8],
        [0.9, d + 7.6],
        [0.01, d + 7.9],
      ],
      10,
      fL,
    ),
      t.colliders.push({
        t: "circ",
        x: u[0],
        z: u[1],
        r: 2.6,
        y0: d - 1,
        y1: d + 8,
      }));
  }
  for (let u = 10; u < a - 8; u += 14)
    for (let d of [-2.6, 2.6]) {
      let p = h(u, d),
        m = f(...p);
      (cn(o, p, r, l, 0.9, 0.22, m + 0.42, m + 0.48, EK),
        cn(
          o,
          [
            p[0] + l[0] * Math.sign(d) * 0.22,
            p[1] + l[1] * Math.sign(d) * 0.22,
          ],
          r,
          l,
          0.9,
          0.04,
          m + 0.48,
          m + 0.9,
          EK,
        ));
      for (let g of [-0.75, 0.75])
        cn(
          o,
          [p[0] + r[0] * g, p[1] + r[1] * g],
          r,
          l,
          0.04,
          0.2,
          m,
          m + 0.42,
          _K,
        );
    }
  for (let u = 5; u < a - 3; u += 9)
    for (let d of [-c + 1.6, c - 1.6]) {
      let [p, m] = h(u, d),
        g = f(p, m),
        b = Math.abs(Math.sin(p * 12.99 + m * 78.23) * 43758.5) % 1;
      (u > a * 0.55 && u < a * 0.78 && d < 0) ||
        (t.inst.push({
          kind: "tree",
          sp: b < 0.7 ? "tree0" : "tree2",
          x: p,
          y: g,
          z: m,
          rot: b * 6.28,
          scale: 0.75 + 0.3 * b,
        }),
        t.colliders.push({
          t: "circ",
          x: p,
          z: m,
          r: 0.3,
          y0: g - 1.5,
          y1: g + 6,
        }));
    }
}
function PK(o, t, e) {
  let s = new Map(),
    n = (i) => {
      let a = s.get(i);
      return (a || s.set(i, (a = new Be())), a);
    };
  for (let [i, a] of [
    [() => Bgt(n("mint"), e), "mint"],
    [() => Hgt(n("stpat"), e), "stpat"],
    [() => Vgt(n("green"), e), "green"],
  ])
    try {
      i();
    } catch (r) {
      console.error("r17:", a, r);
    }
  for (let [i, a] of s) vn(o.group, a, t.lm, "R17_" + i);
}
var mh = {
  maritime: 32839686,
  opera: 32865161,
  veterans: 32865757,
  arena: 579646390,
  civic: [
    [-2161.7, 1877.9],
    [-2048.2, 1859.7],
    [-2065, 1756.8],
    [-2075.1, 1743.2],
    [-2077.4, 1736.5],
    [-2082.4, 1703],
    [-2073.2, 1701.4],
    [-2074.8, 1691.3],
    [-2080.4, 1687.4],
    [-2084.2, 1684.7],
    [-2110.2, 1688.7],
    [-2108.7, 1698],
    [-2152.1, 1704.7],
    [-2155.9, 1704.7],
    [-2159.5, 1704.1],
    [-2166.8, 1701.7],
    [-2171.1, 1700.4],
    [-2175.5, 1700.3],
    [-2189.6, 1702.6],
    [-2194.7, 1710.8],
    [-2169.1, 1872.4],
  ],
  dome: [-2264.5, 1805.5],
};
function DK(o) {
  (o.claim({ name: "maritime", ids: [mh.maritime], poly: null }),
    o.claim({ name: "warmemorial", ids: [mh.opera, mh.veterans], poly: null }),
    o.claim({ name: "arena", ids: [mh.arena], poly: null }),
    o.claim({
      name: "civicplaza",
      poly: mh.civic,
      buildings: !1,
      props: ["car", "tree", "ptree", "lamp", "palm"],
    }));
}
var Wgt = (o, t) => {
    let e = o.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return er(o, s);
    }
    return null;
  },
  qgt = (o, t, e, s) => {
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
  };
function Bp(o, t, e, s, n, i, a = 8) {
  i = Math.min(i, n - 0.01, s - 0.01);
  let r = [],
    l = (h, f, u) => {
      let d = h * (s - i),
        p = f * (n - i);
      for (let m = 0; m <= a; m++) {
        let g = u + ((m / a) * Math.PI) / 2,
          b = d + Math.cos(g) * i,
          v = p + Math.sin(g) * i;
        r.push([o[0] + t[0] * b + e[0] * v, o[1] + t[1] * b + e[1] * v]);
      }
    };
  (l(1, 1, 0),
    l(-1, 1, Math.PI / 2),
    l(-1, -1, Math.PI),
    l(1, -1, Math.PI * 1.5));
  let c = [];
  for (let h = 0; h < r.length; h++) {
    let f = r[h],
      u = r[(h + 1) % r.length],
      d = Math.max(1, Math.ceil(Math.hypot(u[0] - f[0], u[1] - f[1]) / 3));
    for (let p = 0; p < d; p++)
      c.push([f[0] + ((u[0] - f[0]) * p) / d, f[1] + ((u[1] - f[1]) * p) / d]);
  }
  return c;
}
function wz(o, t, e, s, n, i = 0.09, a = null, r = null, l = null, c = null) {
  let h = 0;
  for (let u = 0; u < t.length; u++) {
    let d = t[u],
      p = t[(u + 1) % t.length];
    h += d[0] * p[1] - p[0] * d[1];
  }
  let f = h > 0 ? t.slice().reverse() : t;
  for (let u = 0; u < f.length; u++) {
    let d = f[u],
      p = f[(u + 1) % f.length],
      m = p[0] - d[0],
      g = p[1] - d[1],
      b = Math.hypot(m, g);
    if (b < 0.05) continue;
    let v = (-g / b) * i,
      x = (m / b) * i;
    if (a) {
      let y = (d[0] + p[0]) / 2 - r[0],
        M = (d[1] + p[1]) / 2 - r[1];
      if (!a(y * l[0] + M * l[1], y * c[0] + M * c[1])) continue;
    }
    o.wall(d[0] + v, d[1] + x, p[0] + v, p[1] + x, e, e, s, s, n);
  }
}
function dL(o, t, e, s, n = 1.05) {
  let i = 0;
  for (let a = 0; a < t.length; a++) {
    let r = t[a],
      l = t[(a + 1) % t.length],
      c = Math.hypot(l[0] - r[0], l[1] - r[1]);
    for (let h of [n, n * 0.5])
      Ce(
        o,
        [r[0], e + h, r[1]],
        [l[0], e + h, l[1]],
        h === n ? 0.035 : 0.022,
        s,
        4,
      );
    ((i += c),
      i >= 2 &&
        ((i = 0), Ce(o, [r[0], e, r[1]], [r[0], e + n, r[1]], 0.028, s, 4)));
  }
}
