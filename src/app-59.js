// app 59 — math
// Lines 64055-64250 of readable/app.pretty.js (statement-aligned).
function eht(i, t) {
  let e = i.S,
    s = 0,
    n = i.n - 2;
  if (t <= 0) return 0;
  if (t >= i.L) return n;
  for (; s < n;) {
    let o = (s + n + 1) >> 1;
    e[o] <= t ? (s = o) : (n = o - 1);
  }
  return s;
}
function Ot(i, t, e = {}) {
  let s = i.P,
    n = i.S,
    o = eht(i, t),
    a = n[o + 1] - n[o],
    r = a > 0 ? Math.min(1, Math.max(0, (t - n[o]) / a)) : 0;
  return (
    (e.x = s[o * 3] + (s[o * 3 + 3] - s[o * 3]) * r),
    (e.z = s[o * 3 + 1] + (s[o * 3 + 4] - s[o * 3 + 1]) * r),
    (e.y = s[o * 3 + 2] + (s[o * 3 + 5] - s[o * 3 + 2]) * r),
    (e.dx = i.D[o * 2]),
    (e.dz = i.D[o * 2 + 1]),
    (e.k = o),
    (e.gy = a > 0 ? (s[o * 3 + 5] - s[o * 3 + 2]) / a : 0),
    (e.w = i.W[o] + (i.W[o + 1] - i.W[o]) * r),
    r <= 1e-9
      ? ((e.nx = i.M[o * 2]), (e.nz = i.M[o * 2 + 1]))
      : r >= 1 - 1e-9
        ? ((e.nx = i.M[o * 2 + 2]), (e.nz = i.M[o * 2 + 3]))
        : ((e.nx = -e.dz), (e.nz = e.dx)),
    e
  );
}
function $g(i, t, e) {
  let s = [],
    n = {},
    o = (a) => {
      (Ot(i, a, n), s.push([a, n.x, n.z, n.y, n.nx, n.nz, n.w]));
    };
  o(t);
  for (let a = 1; a < i.n - 1; a++)
    i.S[a] > t + 0.05 && i.S[a] < e - 0.05 && o(i.S[a]);
  return (o(e), s);
}
function vs(i, t, e, s = {}, n, o, a = -1, r = 1e9) {
  if (n === void 0) {
    if (i.n > 49 && a === -1 && r === 1e9) return pS(i, t, e, s);
    ((n = 0), (o = i.n - 2));
  }
  let l = i.P,
    c = i.D,
    h = i.S,
    f = a !== -1 || r !== 1e9 || i.L > r,
    u = 1 / 0,
    d = -1,
    p = 0;
  s.d = 1 / 0;
  for (let m = n; m <= o; m++) {
    let g = l[m * 3],
      b = l[m * 3 + 1],
      x = c[m * 2],
      v = c[m * 2 + 1],
      y = h[m + 1] - h[m],
      M = (t - g) * x + (e - b) * v;
    if (
      ((M = M < 0 ? 0 : M > y ? y : M),
      f &&
        (h[m] + M < a && (M = Math.min(y, a - h[m])),
        h[m] + M > r && (M = Math.max(0, r - h[m])),
        h[m] + M < a - 1e-6 || h[m] + M > r + 1e-6))
    )
      continue;
    let S = g + x * M,
      w = b + v * M,
      z = (t - S) ** 2 + (e - w) ** 2;
    z < u && ((u = z), (d = m), (p = M));
  }
  if (d >= 0) {
    let m = d,
      g = p,
      b = c[m * 2],
      x = c[m * 2 + 1],
      v = h[m + 1] - h[m];
    ((s.s = h[m] + g),
      (s.k = m),
      (s.d = Math.sqrt(u)),
      (s.v = (t - l[m * 3]) * -x + (e - l[m * 3 + 1]) * b),
      (s.y =
        l[m * 3 + 2] + (l[m * 3 + 5] - l[m * 3 + 2]) * (v > 0 ? g / v : 0)),
      (s.gy = v > 0 ? (l[m * 3 + 5] - l[m * 3 + 2]) / v : 0),
      (s.dx = b),
      (s.dz = x),
      (s.w = i.W[m] + (i.W[m + 1] - i.W[m]) * (v > 0 ? g / v : 0)));
  }
  return s;
}
var dS = [],
  A0 = {};
function pS(i, t, e, s = {}) {
  let n = i.n - 1;
  if (n <= 48) return vs(i, t, e, s, 0, n - 1);
  let o = i._gb;
  if (!o) {
    let l = i.P,
      c = Math.ceil(n / 16);
    o = i._gb = new Float64Array(c * 4);
    for (let h = 0; h < c; h++) {
      let f = 1e18,
        u = 1e18,
        d = -1e18,
        p = -1e18;
      for (let m = h * 16; m <= Math.min(n, h * 16 + 16); m++) {
        let g = l[m * 3],
          b = l[m * 3 + 1];
        (g < f && (f = g),
          g > d && (d = g),
          b < u && (u = b),
          b > p && (p = b));
      }
      o.set([f, u, d, p], h * 4);
    }
  }
  let a = o.length / 4;
  for (let l = 0; l < a; l++) {
    let c = Math.max(o[l * 4] - t, 0, t - o[l * 4 + 2]),
      h = Math.max(o[l * 4 + 1] - e, 0, e - o[l * 4 + 3]);
    dS[l] = c * c + h * h;
  }
  let r = 1 / 0;
  for (s.d = 1 / 0; ;) {
    let l = -1,
      c = 1 / 0;
    for (let h = 0; h < a; h++) dS[h] < c && ((c = dS[h]), (l = h));
    if (l < 0 || c >= r * r) break;
    ((dS[l] = 1 / 0),
      vs(i, t, e, A0, l * 16, Math.min(n - 1, l * 16 + 15)),
      (A0.d < r || (A0.d === r && A0.k < s.k)) &&
        ((r = A0.d),
        (s.s = A0.s),
        (s.k = A0.k),
        (s.d = A0.d),
        (s.v = A0.v),
        (s.y = A0.y),
        (s.gy = A0.gy),
        (s.dx = A0.dx),
        (s.dz = A0.dz),
        (s.w = A0.w)));
  }
  return s;
}
function en(i, t, e) {
  let s = !1;
  for (let n = 0, o = i.length - 2; n < i.length; o = n, n += 2) {
    let a = i[n],
      r = i[n + 1],
      l = i[o],
      c = i[o + 1];
    r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
  }
  return s;
}
function J5(i) {
  let t = 0;
  for (let e = 0, s = i.length - 2; e < i.length; s = e, e += 2)
    t += i[s] * i[e + 1] - i[e] * i[s + 1];
  return t / 2;
}
var mS = [
    128240107, 128240115, 128240116, 128240118, 128240119, 128240125, 128240126,
    128240130, 128240131, 128240133, 128240134, 128240135, 128240136, 128240139,
    128240142, 128240146, 128240148, 128240149, 466623895, 466623896, 288396171,
    288396169,
  ],
  wG = 128240118,
  zR = 288396169,
  sht = {
    128240149: "Fog Harbor Fish House",
    288396169: "Aquarium of the Bay",
    128240118: "San Francisco Carousel",
  },
  ER = [-1360, -1453],
  TR = [-1487, -1770],
  AR = [-1497, -1476],
  nht = 12 / 3.6,
  iht = [-1593, -1676];
var RR = (i, t, e) => {
  let s = -1,
    n = 1e9;
  for (let o = 0; o < i.length; o += 2) {
    let a = Math.hypot(i[o] - t, i[o + 1] - e);
    a < n && ((n = a), (s = o / 2));
  }
  return [s, n];
};
