// app 198 — math
// Lines 109645-109989 of readable/app.pretty.js (statement-aligned).
function v1t(i, t) {
  let { L: e } = t,
    s = Wy.pg,
    n = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2],
    o = [(s[2][0] + s[3][0]) / 2, (s[2][1] + s[3][1]) / 2],
    a = Math.hypot(o[0] - n[0], o[1] - n[1]),
    r = [(o[0] - n[0]) / a, (o[1] - n[1]) / a],
    l = [-r[1], r[0]],
    c = Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) / 2,
    h = (u, d) => [n[0] + r[0] * u + l[0] * d, n[1] + r[1] * u + l[1] * d],
    f = (u, d) => e.driveHeight(u, d);
  for (let u = 2; u < a - 2; u += 3) {
    let d = h(u, 0),
      p = h(u + 3, 0),
      m = f(...d) + 0.04,
      g = f(...p) + 0.04;
    ne(
      i,
      [
        [d[0] - l[0] * 1.6, m, d[1] - l[1] * 1.6],
        [d[0] + l[0] * 1.6, m, d[1] + l[1] * 1.6],
        [p[0] + l[0] * 1.6, g, p[1] + l[1] * 1.6],
        [p[0] - l[0] * 1.6, g, p[1] - l[1] * 1.6],
      ],
      b1t,
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
        x = ((g + 1) / 16) * Math.PI * 2;
      ne(
        i,
        [
          [u[0], d + 0.05, u[1]],
          [
            u[0] + Math.cos(b) * (p + 1.5),
            d + 0.05,
            u[1] + Math.sin(b) * (p + 1.5),
          ],
          [
            u[0] + Math.cos(x) * (p + 1.5),
            d + 0.05,
            u[1] + Math.sin(x) * (p + 1.5),
          ],
        ],
        x1t,
        [0, 1, 0],
        (v) => [v[0], v[2]],
      );
    }
    let m = (g, b) => [
      u[0] + Math.cos(g) * p * Math.cos(b),
      d + 0.2 + p * 0.8 * Math.sin(b),
      u[1] + Math.sin(g) * p * Math.cos(b),
    ];
    for (let g = 0; g < 12; g++) {
      let b = (g / 12) * Math.PI * 2;
      for (let x = 0; x < 6; x++)
        Ae(
          i,
          m(b, ((x / 6) * Math.PI) / 2),
          m(b, (((x + 1) / 6) * Math.PI) / 2),
          0.04,
          M$,
          4,
        );
    }
    for (let g of [0.25, 0.55, 0.85, 1.15])
      for (let b = 0; b < 24; b++)
        Ae(
          i,
          m((b / 24) * Math.PI * 2, g),
          m(((b + 1) / 24) * Math.PI * 2, g),
          0.035,
          M$,
          4,
        );
    (Ae(i, [u[0], d, u[1]], [u[0], d + p * 0.8 + 0.6, u[1]], 0.09, S$, 6),
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
        x = [u[0] + l[0] * Math.cos(m) * b, d, u[1] + l[1] * Math.cos(m) * b],
        v = [
          u[0] + r[0] * 1.2 + l[0] * Math.cos(m) * b * 0.8,
          d + g * Math.sin(m) * 0.4 + 3,
          u[1] + r[1] * 1.2 + l[1] * Math.cos(m) * b * 0.8,
        ],
        y = [u[0] + r[0] * 2.5, d + g, u[1] + r[1] * 2.5];
      (Ae(i, x, v, 0.12, FP, 5), Ae(i, v, y, 0.1, FP, 5));
    }
    (Oe(
      i,
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
      FP,
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
      (nn(i, p, r, l, 0.9, 0.22, m + 0.42, m + 0.48, k$),
        nn(
          i,
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
          k$,
        ));
      for (let g of [-0.75, 0.75])
        nn(
          i,
          [p[0] + r[0] * g, p[1] + r[1] * g],
          r,
          l,
          0.04,
          0.2,
          m,
          m + 0.42,
          S$,
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
function T$(i, t, e) {
  let s = new Map(),
    n = (o) => {
      let a = s.get(o);
      return (a || s.set(o, (a = new Ce())), a);
    };
  for (let [o, a] of [
    [() => d1t(n("mint"), e), "mint"],
    [() => m1t(n("stpat"), e), "stpat"],
    [() => v1t(n("green"), e), "green"],
  ])
    try {
      o();
    } catch (r) {
      console.error("r17:", a, r);
    }
  for (let [o, a] of s) gn(i.group, a, t.lm, "R17_" + o);
}
var Hc = {
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
function B$(i) {
  (i.claim({ name: "maritime", ids: [Hc.maritime], poly: null }),
    i.claim({ name: "warmemorial", ids: [Hc.opera, Hc.veterans], poly: null }),
    i.claim({ name: "arena", ids: [Hc.arena], poly: null }),
    i.claim({
      name: "civicplaza",
      poly: Hc.civic,
      buildings: !1,
      props: ["car", "tree", "ptree", "lamp", "palm"],
    }));
}
var y1t = (i, t) => {
    let e = i.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return mr(i, s);
    }
    return null;
  },
  w1t = (i, t, e, s) => {
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
  };
function op(i, t, e, s, n, o, a = 8) {
  o = Math.min(o, n - 0.01, s - 0.01);
  let r = [],
    l = (h, f, u) => {
      let d = h * (s - o),
        p = f * (n - o);
      for (let m = 0; m <= a; m++) {
        let g = u + ((m / a) * Math.PI) / 2,
          b = d + Math.cos(g) * o,
          x = p + Math.sin(g) * o;
        r.push([i[0] + t[0] * b + e[0] * x, i[1] + t[1] * b + e[1] * x]);
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
function wk(i, t, e, s, n, o = 0.09, a = null, r = null, l = null, c = null) {
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
    let x = (-g / b) * o,
      v = (m / b) * o;
    if (a) {
      let y = (d[0] + p[0]) / 2 - r[0],
        M = (d[1] + p[1]) / 2 - r[1];
      if (!a(y * l[0] + M * l[1], y * c[0] + M * c[1])) continue;
    }
    i.wall(d[0] + x, d[1] + v, p[0] + x, p[1] + v, e, e, s, s, n);
  }
}
function BP(i, t, e, s, n = 1.05) {
  let o = 0;
  for (let a = 0; a < t.length; a++) {
    let r = t[a],
      l = t[(a + 1) % t.length],
      c = Math.hypot(l[0] - r[0], l[1] - r[1]);
    for (let h of [n, n * 0.5])
      Ae(
        i,
        [r[0], e + h, r[1]],
        [l[0], e + h, l[1]],
        h === n ? 0.035 : 0.022,
        s,
        4,
      );
    ((o += c),
      o >= 2 &&
        ((o = 0), Ae(i, [r[0], e, r[1]], [r[0], e + n, r[1]], 0.028, s, 4)));
  }
}
