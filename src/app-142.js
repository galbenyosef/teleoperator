// app 142 — math
// Lines 92052-92356 of readable/app.pretty.js (statement-aligned).
function tj(i, t, e, s) {
  if (!s?.length) return;
  let n = Py.get(i);
  n && Zq(i, n);
  let o = 1e9,
    a = 1e9,
    r = -1e9,
    l = -1e9;
  for (let h = 0; h < t.length; h += 2) {
    let f = t[h],
      u = t[h + 1];
    (f < o && (o = f), f > r && (r = f), u < a && (a = u), u > l && (l = u));
  }
  let c = {
    flat: Float32Array.from(t),
    ys: Float32Array.from(e),
    tris: Int32Array.from(s.flat()),
    bb: [o, a, r, l],
    tg: null,
    cells: [],
  };
  for (let h = Math.floor(o / 32); h <= Math.floor(r / 32); h++)
    for (let f = Math.floor(a / 32); f <= Math.floor(l / 32); f++) {
      let u = jS(h, f),
        d = Cy.get(u);
      (d || Cy.set(u, (d = [])), d.push(c), c.cells.push(u));
    }
  if ((Py.set(i, c), Qq++, Py.size > 4e3)) {
    let [h, f] = Py.entries().next().value;
    Zq(h, f);
  }
}
function Zq(i, t) {
  for (let e of t.cells) {
    let s = Cy.get(e);
    if (!s) continue;
    let n = s.indexOf(t);
    (n >= 0 && s.splice(n, 1), s.length || Cy.delete(e));
  }
  (Py.delete(i), Qq++);
}
function Tut(i) {
  let t = new Map(),
    e = i.flat,
    s = i.tris;
  for (let n = 0; n < s.length; n += 3) {
    let o = s[n],
      a = s[n + 1],
      r = s[n + 2],
      l = Math.min(e[o * 2], e[a * 2], e[r * 2]),
      c = Math.max(e[o * 2], e[a * 2], e[r * 2]),
      h = Math.min(e[o * 2 + 1], e[a * 2 + 1], e[r * 2 + 1]),
      f = Math.max(e[o * 2 + 1], e[a * 2 + 1], e[r * 2 + 1]);
    for (let u = Math.floor(l / 2); u <= Math.floor(c / 2); u++)
      for (let d = Math.floor(h / 2); d <= Math.floor(f / 2); d++) {
        let p = jS(u, d),
          m = t.get(p);
        (m || t.set(p, (m = [])), m.push(n));
      }
  }
  return (i.tg = t);
}
function $d(i, t, e = null) {
  let s = Cy.get(jS(Math.floor(i / 32), Math.floor(t / 32)));
  if (!s) return null;
  let n = null;
  for (let o of s) {
    let a = o.bb;
    if (i < a[0] || i > a[2] || t < a[1] || t > a[3]) continue;
    let r = (o.tg || Tut(o)).get(jS(Math.floor(i / 2), Math.floor(t / 2)));
    if (!r) continue;
    let l = o.flat,
      c = o.ys,
      h = o.tris;
    for (let f of r) {
      let u = h[f],
        d = h[f + 1],
        p = h[f + 2],
        m = l[u * 2],
        g = l[u * 2 + 1],
        b = l[d * 2],
        x = l[d * 2 + 1],
        v = l[p * 2],
        y = l[p * 2 + 1],
        M = (x - y) * (m - v) + (v - b) * (g - y);
      if (Math.abs(M) < 1e-9) continue;
      let S = ((x - y) * (i - v) + (v - b) * (t - y)) / M,
        w = ((y - g) * (i - v) + (m - v) * (t - y)) / M,
        z = 1 - S - w;
      if (S < -1e-4 || w < -1e-4 || z < -1e-4) continue;
      let _ = S * c[u] + w * c[d] + z * c[p];
      if ((n === null || _ > n) && ((n = _), e)) {
        let R = b - m,
          T = x - g,
          E = c[d] - c[u],
          A = v - m,
          C = y - g,
          P = c[p] - c[u],
          I = E * C - T * P,
          L = T * A - R * C,
          F = R * P - E * A;
        Math.abs(L) > 1e-9
          ? ((e.dx = -I / L), (e.dz = -F / L))
          : (e.dx = e.dz = 0);
      }
      break;
    }
  }
  return n;
}
f0();
var VS = 256,
  vb = [
    [-7300.5, -1398.6],
    [-7310.6, -1411.8],
    [-7319.4, -1423.8],
    [-7328.3, -1436.8],
    [-7335.7, -1448.7],
    [-7342.5, -1460.6],
    [-7349, -1473.3],
    [-7354.6, -1486],
    [-7360.2, -1499.9],
    [-7364.6, -1512.6],
    [-7367.9, -1524.1],
    [-7370.8, -1535.4],
    [-7373.2, -1547.5],
    [-7375.1, -1559.6],
    [-7376.6, -1571.3],
    [-7378.5, -1595.8],
  ],
  Wh = [
    [-7589.1, -3863.6],
    [-7590.7, -3880.1],
    [-7592.5, -3897.7],
    [-7594.2, -3912.7],
    [-7596.6, -3926.9],
    [-7599.7, -3942.1],
    [-7603.5, -3956.2],
    [-7607.9, -3970.6],
    [-7612.7, -3984.5],
    [-7618.5, -3998.8],
    [-7624.7, -4012],
    [-7629.3, -4020.7],
    [-7632.6, -4026.9],
    [-7640.4, -4040],
    [-7648, -4051.9],
    [-7656.6, -4063.9],
    [-7666.2, -4076.1],
    [-7674.7, -4086.6],
  ],
  XS = [
    [-7387.6, -1594.8],
    [-7384.9, -1565.9],
    [-7383.5, -1554.2],
    [-7381.5, -1542.2],
    [-7379.1, -1530],
    [-7376.3, -1518.8],
    [-7373, -1507.2],
    [-7368.5, -1494.5],
    [-7362.9, -1480.6],
    [-7357.3, -1467.9],
    [-7350.8, -1455.2],
    [-7344, -1443.3],
    [-7336.5, -1431],
    [-7327.9, -1416.8],
    [-7309.6, -1390.7],
  ],
  sj = [
    [-7656.4, -4046.5],
    [-7648.8, -4034.7],
    [-7640.9, -4021.5],
    [-7633, -4006.7],
    [-7626.8, -3993.4],
    [-7621, -3979.1],
    [-7616.2, -3965.2],
    [-7611.8, -3950.8],
    [-7608, -3936.7],
    [-7604.9, -3921.6],
    [-7602.6, -3907.3],
    [-7600.8, -3892.4],
    [-7599, -3874.7],
    [-7597.4, -3858.2],
  ],
  Aut = {
    n1: [
      [-5341.5, -866.8],
      [-5614.6, -808.2],
    ],
    n2: [
      [-5988, -688.9],
      [-6215, -718.9],
    ],
    s1: [
      [-6267.9, -713.3],
      [-5984.8, -663.5],
    ],
    s2: [
      [-5646.5, -779.2],
      [-5450.5, -826.4],
      [-5346.5, -838.4],
    ],
  },
  U7 = (i, t) => {
    let e = Math.hypot(i, t);
    return [i / e, t / e];
  };
function G7(i) {
  let t = i.map((e, s) => {
    let n = i[Math.max(0, s - 1)],
      o = i[Math.min(i.length - 1, s + 1)];
    return s === 0 || s === i.length - 1 ? 0 : (o[1] - n[1]) / (o[0] - n[0]);
  });
  return (e) => {
    if (e <= i[0][0]) return i[0][1];
    if (e >= i[i.length - 1][0]) return i[i.length - 1][1];
    let s = 0;
    for (; e > i[s + 1][0];) s++;
    let n = i[s + 1][0] - i[s][0],
      o = (e - i[s][0]) / n,
      a = o * o,
      r = a * o;
    return (
      (2 * r - 3 * a + 1) * i[s][1] +
      (r - 2 * a + o) * n * t[s] +
      (-2 * r + 3 * a) * i[s + 1][1] +
      (r - a) * n * t[s + 1]
    );
  };
}
function nj(i, t) {
  let [e, s] = t,
    n = -s,
    o = e;
  return {
    a: i,
    dx: e,
    dz: s,
    nx: n,
    nz: o,
    at: (a, r = 0) => [i[0] + e * a + n * r, i[1] + s * a + o * r],
    s: (a, r) => (a - i[0]) * e + (r - i[1]) * s,
    v: (a, r) => (a - i[0]) * n + (r - i[1]) * o,
  };
}
var H7 = U7(-7543.8 + 7394.45, -3327.6 + 1717.95),
  Ly = nj([-7394.45 + H7[0] * 343, -1717.95 + H7[1] * 343], H7);
Object.assign(Ly, {
  anchS: -343,
  towerS: 0,
  towerN: 1280,
  anchN: 1623,
  top: 227,
  leg: 17.5,
  half: 4.95,
  lw: 4.65,
  median: 0.6,
  deck: G7([
    [-690, 54.2],
    [-343, 59.5],
    [0, 64],
    [640, 67],
    [1280, 64],
    [1623, 61],
    [1950, 58.5],
    [2450, 57],
  ]),
});
var Rut = U7(2307.4 - 259.5, -1392.4 - 1020.5),
  qi = nj([259.5, 1020.5], Rut);
Object.assign(qi, { anch: 345, portal: 2985, top: 160, leg: 16, gap: 10 });
qi.anchE = qi.portal - 20;
qi.center = (qi.anch + qi.anchE) / 2;
qi.towers = [qi.anch + 353, qi.center - 353, qi.center + 353, qi.anchE - 353];
qi.upper = G7([
  [-60, 39.7],
  [22, 40.6],
  [qi.anch, 52],
  [qi.towers[0], 61],
  [qi.center, 65],
  [qi.towers[3], 61],
  [qi.anchE, 57.5],
  [qi.portal + 200, 56.5],
]);
qi.lower = G7([
  [22, 27.5],
  [200, 36.5],
  [qi.anch, 42],
  [qi.towers[0], 51],
  [qi.center, 55],
  [qi.towers[3], 51],
  [qi.anchE, 47.5],
  [qi.portal + 200, 46.5],
]);
var ij = 79;
function yb(i, t) {
  let e = [i[0].slice()];
  for (let s = 1; s < i.length; s++) {
    let [n, o] = i[s - 1],
      [a, r] = i[s],
      l = Math.max(1, Math.ceil(Math.hypot(a - n, r - o) / t));
    for (let c = 1; c <= l; c++)
      e.push([n + ((a - n) * c) / l, o + ((r - o) * c) / l]);
  }
  return e;
}
