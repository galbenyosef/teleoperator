// app 141 — math
// Lines 92320-92625 of readable/app.pretty.js (statement-aligned).
function s$(o, t, e, s) {
  if (!s?.length) return;
  let n = zw.get(o);
  n && t$(o, n);
  let i = 1e9,
    a = 1e9,
    r = -1e9,
    l = -1e9;
  for (let h = 0; h < t.length; h += 2) {
    let f = t[h],
      u = t[h + 1];
    (f < i && (i = f), f > r && (r = f), u < a && (a = u), u > l && (l = u));
  }
  let c = {
    flat: Float32Array.from(t),
    ys: Float32Array.from(e),
    tris: Int32Array.from(s.flat()),
    bb: [i, a, r, l],
    tg: null,
    cells: [],
  };
  for (let h = Math.floor(i / 32); h <= Math.floor(r / 32); h++)
    for (let f = Math.floor(a / 32); f <= Math.floor(l / 32); f++) {
      let u = qk(h, f),
        d = _w.get(u);
      (d || _w.set(u, (d = [])), d.push(c), c.cells.push(u));
    }
  if ((zw.set(o, c), e$++, zw.size > 4e3)) {
    let [h, f] = zw.entries().next().value;
    t$(h, f);
  }
}
function t$(o, t) {
  for (let e of t.cells) {
    let s = _w.get(e);
    if (!s) continue;
    let n = s.indexOf(t);
    (n >= 0 && s.splice(n, 1), s.length || _w.delete(e));
  }
  (zw.delete(o), e$++);
}
function Y1t(o) {
  let t = new Map(),
    e = o.flat,
    s = o.tris;
  for (let n = 0; n < s.length; n += 3) {
    let i = s[n],
      a = s[n + 1],
      r = s[n + 2],
      l = Math.min(e[i * 2], e[a * 2], e[r * 2]),
      c = Math.max(e[i * 2], e[a * 2], e[r * 2]),
      h = Math.min(e[i * 2 + 1], e[a * 2 + 1], e[r * 2 + 1]),
      f = Math.max(e[i * 2 + 1], e[a * 2 + 1], e[r * 2 + 1]);
    for (let u = Math.floor(l / 2); u <= Math.floor(c / 2); u++)
      for (let d = Math.floor(h / 2); d <= Math.floor(f / 2); d++) {
        let p = qk(u, d),
          m = t.get(p);
        (m || t.set(p, (m = [])), m.push(n));
      }
  }
  return (o.tg = t);
}
function zp(o, t, e = null) {
  let s = _w.get(qk(Math.floor(o / 32), Math.floor(t / 32)));
  if (!s) return null;
  let n = null;
  for (let i of s) {
    let a = i.bb;
    if (o < a[0] || o > a[2] || t < a[1] || t > a[3]) continue;
    let r = (i.tg || Y1t(i)).get(qk(Math.floor(o / 2), Math.floor(t / 2)));
    if (!r) continue;
    let l = i.flat,
      c = i.ys,
      h = i.tris;
    for (let f of r) {
      let u = h[f],
        d = h[f + 1],
        p = h[f + 2],
        m = l[u * 2],
        g = l[u * 2 + 1],
        b = l[d * 2],
        v = l[d * 2 + 1],
        x = l[p * 2],
        y = l[p * 2 + 1],
        M = (v - y) * (m - x) + (x - b) * (g - y);
      if (Math.abs(M) < 1e-9) continue;
      let S = ((v - y) * (o - x) + (x - b) * (t - y)) / M,
        w = ((y - g) * (o - x) + (m - x) * (t - y)) / M,
        _ = 1 - S - w;
      if (S < -1e-4 || w < -1e-4 || _ < -1e-4) continue;
      let z = S * c[u] + w * c[d] + _ * c[p];
      if ((n === null || z > n) && ((n = z), e)) {
        let A = b - m,
          T = v - g,
          E = c[d] - c[u],
          R = x - m,
          P = y - g,
          C = c[p] - c[u],
          I = E * P - T * C,
          L = T * R - A * P,
          F = A * C - E * R;
        Math.abs(L) > 1e-9
          ? ((e.dx = -I / L), (e.dz = -F / L))
          : (e.dx = e.dz = 0);
      }
      break;
    }
  }
  return n;
}
await _0();
await No();
var jk = 256,
  ox = [
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
  vf = [
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
  Xk = [
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
  i$ = [
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
  J1t = {
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
  xC = (o, t) => {
    let e = Math.hypot(o, t);
    return [o / e, t / e];
  };
function vC(o) {
  let t = o.map((e, s) => {
    let n = o[Math.max(0, s - 1)],
      i = o[Math.min(o.length - 1, s + 1)];
    return s === 0 || s === o.length - 1 ? 0 : (i[1] - n[1]) / (i[0] - n[0]);
  });
  return (e) => {
    if (e <= o[0][0]) return o[0][1];
    if (e >= o[o.length - 1][0]) return o[o.length - 1][1];
    let s = 0;
    for (; e > o[s + 1][0];) s++;
    let n = o[s + 1][0] - o[s][0],
      i = (e - o[s][0]) / n,
      a = i * i,
      r = a * i;
    return (
      (2 * r - 3 * a + 1) * o[s][1] +
      (r - 2 * a + i) * n * t[s] +
      (-2 * r + 3 * a) * o[s + 1][1] +
      (r - a) * n * t[s + 1]
    );
  };
}
function o$(o, t) {
  let [e, s] = t,
    n = -s,
    i = e;
  return {
    a: o,
    dx: e,
    dz: s,
    nx: n,
    nz: i,
    at: (a, r = 0) => [o[0] + e * a + n * r, o[1] + s * a + i * r],
    s: (a, r) => (a - o[0]) * e + (r - o[1]) * s,
    v: (a, r) => (a - o[0]) * n + (r - o[1]) * i,
  };
}
var gC = xC(-7543.8 + 7394.45, -3327.6 + 1717.95),
  Ew = o$([-7394.45 + gC[0] * 343, -1717.95 + gC[1] * 343], gC);
Object.assign(Ew, {
  anchS: -343,
  towerS: 0,
  towerN: 1280,
  anchN: 1623,
  top: 227,
  leg: 17.5,
  half: 4.95,
  lw: 4.65,
  median: 0.6,
  deck: vC([
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
var Z1t = xC(2307.4 - 259.5, -1392.4 - 1020.5),
  to = o$([259.5, 1020.5], Z1t);
Object.assign(to, { anch: 345, portal: 2985, top: 160, leg: 16, gap: 10 });
to.anchE = to.portal - 20;
to.center = (to.anch + to.anchE) / 2;
to.towers = [to.anch + 353, to.center - 353, to.center + 353, to.anchE - 353];
to.upper = vC([
  [-60, 39.7],
  [22, 40.6],
  [to.anch, 52],
  [to.towers[0], 61],
  [to.center, 65],
  [to.towers[3], 61],
  [to.anchE, 57.5],
  [to.portal + 200, 56.5],
]);
to.lower = vC([
  [22, 27.5],
  [200, 36.5],
  [to.anch, 42],
  [to.towers[0], 51],
  [to.center, 55],
  [to.towers[3], 51],
  [to.anchE, 47.5],
  [to.portal + 200, 46.5],
]);
var a$ = 79;
function ax(o, t) {
  let e = [o[0].slice()];
  for (let s = 1; s < o.length; s++) {
    let [n, i] = o[s - 1],
      [a, r] = o[s],
      l = Math.max(1, Math.ceil(Math.hypot(a - n, r - i) / t));
    for (let c = 1; c <= l; c++)
      e.push([n + ((a - n) * c) / l, i + ((r - i) * c) / l]);
  }
  return e;
}
