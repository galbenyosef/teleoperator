// app 58 — math
// Lines 64286-64481 of readable/app.pretty.js (statement-aligned).
function Mdt(o, t) {
  let e = o.S,
    s = 0,
    n = o.n - 2;
  if (t <= 0) return 0;
  if (t >= o.L) return n;
  for (; s < n;) {
    let i = (s + n + 1) >> 1;
    e[i] <= t ? (s = i) : (n = i - 1);
  }
  return s;
}
function Ot(o, t, e = {}) {
  let s = o.P,
    n = o.S,
    i = Mdt(o, t),
    a = n[i + 1] - n[i],
    r = a > 0 ? Math.min(1, Math.max(0, (t - n[i]) / a)) : 0;
  return (
    (e.x = s[i * 3] + (s[i * 3 + 3] - s[i * 3]) * r),
    (e.z = s[i * 3 + 1] + (s[i * 3 + 4] - s[i * 3 + 1]) * r),
    (e.y = s[i * 3 + 2] + (s[i * 3 + 5] - s[i * 3 + 2]) * r),
    (e.dx = o.D[i * 2]),
    (e.dz = o.D[i * 2 + 1]),
    (e.k = i),
    (e.gy = a > 0 ? (s[i * 3 + 5] - s[i * 3 + 2]) / a : 0),
    (e.w = o.W[i] + (o.W[i + 1] - o.W[i]) * r),
    r <= 1e-9
      ? ((e.nx = o.M[i * 2]), (e.nz = o.M[i * 2 + 1]))
      : r >= 1 - 1e-9
        ? ((e.nx = o.M[i * 2 + 2]), (e.nz = o.M[i * 2 + 3]))
        : ((e.nx = -e.dz), (e.nz = e.dx)),
    e
  );
}
function Ob(o, t, e) {
  let s = [],
    n = {},
    i = (a) => {
      (Ot(o, a, n), s.push([a, n.x, n.z, n.y, n.nx, n.nz, n.w]));
    };
  i(t);
  for (let a = 1; a < o.n - 1; a++)
    o.S[a] > t + 0.05 && o.S[a] < e - 0.05 && i(o.S[a]);
  return (i(e), s);
}
function ys(o, t, e, s = {}, n, i, a = -1, r = 1e9) {
  if (n === void 0) {
    if (o.n > 49 && a === -1 && r === 1e9) return gk(o, t, e, s);
    ((n = 0), (i = o.n - 2));
  }
  let l = o.P,
    c = o.D,
    h = o.S,
    f = a !== -1 || r !== 1e9 || o.L > r,
    u = 1 / 0,
    d = -1,
    p = 0;
  s.d = 1 / 0;
  for (let m = n; m <= i; m++) {
    let g = l[m * 3],
      b = l[m * 3 + 1],
      v = c[m * 2],
      x = c[m * 2 + 1],
      y = h[m + 1] - h[m],
      M = (t - g) * v + (e - b) * x;
    if (
      ((M = M < 0 ? 0 : M > y ? y : M),
      f &&
        (h[m] + M < a && (M = Math.min(y, a - h[m])),
        h[m] + M > r && (M = Math.max(0, r - h[m])),
        h[m] + M < a - 1e-6 || h[m] + M > r + 1e-6))
    )
      continue;
    let S = g + v * M,
      w = b + x * M,
      _ = (t - S) ** 2 + (e - w) ** 2;
    _ < u && ((u = _), (d = m), (p = M));
  }
  if (d >= 0) {
    let m = d,
      g = p,
      b = c[m * 2],
      v = c[m * 2 + 1],
      x = h[m + 1] - h[m];
    ((s.s = h[m] + g),
      (s.k = m),
      (s.d = Math.sqrt(u)),
      (s.v = (t - l[m * 3]) * -v + (e - l[m * 3 + 1]) * b),
      (s.y =
        l[m * 3 + 2] + (l[m * 3 + 5] - l[m * 3 + 2]) * (x > 0 ? g / x : 0)),
      (s.gy = x > 0 ? (l[m * 3 + 5] - l[m * 3 + 2]) / x : 0),
      (s.dx = b),
      (s.dz = v),
      (s.w = o.W[m] + (o.W[m + 1] - o.W[m]) * (x > 0 ? g / x : 0)));
  }
  return s;
}
var mk = [],
  Z0 = {};
function gk(o, t, e, s = {}) {
  let n = o.n - 1;
  if (n <= 48) return ys(o, t, e, s, 0, n - 1);
  let i = o._gb;
  if (!i) {
    let l = o.P,
      c = Math.ceil(n / 16);
    i = o._gb = new Float64Array(c * 4);
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
      i.set([f, u, d, p], h * 4);
    }
  }
  let a = i.length / 4;
  for (let l = 0; l < a; l++) {
    let c = Math.max(i[l * 4] - t, 0, t - i[l * 4 + 2]),
      h = Math.max(i[l * 4 + 1] - e, 0, e - i[l * 4 + 3]);
    mk[l] = c * c + h * h;
  }
  let r = 1 / 0;
  for (s.d = 1 / 0; ;) {
    let l = -1,
      c = 1 / 0;
    for (let h = 0; h < a; h++) mk[h] < c && ((c = mk[h]), (l = h));
    if (l < 0 || c >= r * r) break;
    ((mk[l] = 1 / 0),
      ys(o, t, e, Z0, l * 16, Math.min(n - 1, l * 16 + 15)),
      (Z0.d < r || (Z0.d === r && Z0.k < s.k)) &&
        ((r = Z0.d),
        (s.s = Z0.s),
        (s.k = Z0.k),
        (s.d = Z0.d),
        (s.v = Z0.v),
        (s.y = Z0.y),
        (s.gy = Z0.gy),
        (s.dx = Z0.dx),
        (s.dz = Z0.dz),
        (s.w = Z0.w)));
  }
  return s;
}
function rn(o, t, e) {
  let s = !1;
  for (let n = 0, i = o.length - 2; n < o.length; i = n, n += 2) {
    let a = o[n],
      r = o[n + 1],
      l = o[i],
      c = o[i + 1];
    r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
  }
  return s;
}
function j5(o) {
  let t = 0;
  for (let e = 0, s = o.length - 2; e < o.length; s = e, e += 2)
    t += o[s] * o[e + 1] - o[e] * o[s + 1];
  return t / 2;
}
var bk = [
    128240107, 128240115, 128240116, 128240118, 128240119, 128240125, 128240126,
    128240130, 128240131, 128240133, 128240134, 128240135, 128240136, 128240139,
    128240142, 128240146, 128240148, 128240149, 466623895, 466623896, 288396171,
    288396169,
  ],
  SW = 128240118,
  sP = 288396169,
  Sdt = {
    128240149: "Fog Harbor Fish House",
    288396169: "Aquarium of the Bay",
    128240118: "San Francisco Carousel",
  },
  nP = [-1360, -1453],
  iP = [-1487, -1770],
  oP = [-1497, -1476],
  kdt = 12 / 3.6,
  zdt = [-1593, -1676];
var aP = (o, t, e) => {
  let s = -1,
    n = 1e9;
  for (let i = 0; i < o.length; i += 2) {
    let a = Math.hypot(o[i] - t, o[i + 1] - e);
    a < n && ((n = a), (s = i / 2));
  }
  return [s, n];
};
