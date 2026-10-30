// app 100 — math
// Lines 79093-79275 of readable/app.pretty.js (statement-aligned).
var Ko = {
  o: [-1246.3, 1222],
  n: [-Math.sin((9.3 * Math.PI) / 180), -Math.cos((9.3 * Math.PI) / 180)],
  court: { e0: -54, e1: -30, n0: -12, n1: 5 },
  stair: { e0: -30, e1: -18, n0: -6, n1: 3 },
  poly: [
    [-63, 13],
    [-10.5, 13],
    [-10.5, -3.5],
    [-15.5, -6.2],
    [-26, -13.5],
    [-36.5, -21],
    [-50, -21.5],
    [-63, -14],
  ],
};
Ko.e = [-Ko.n[1], Ko.n[0]];
Ko.at = (o, t) => [
  Ko.o[0] + Ko.n[0] * t + Ko.e[0] * o,
  Ko.o[1] + Ko.n[1] * t + Ko.e[1] * o,
];
Ko.frame = (o, t) => {
  let e = o - Ko.o[0],
    s = t - Ko.o[1];
  return [e * Ko.e[0] + s * Ko.e[1], e * Ko.n[0] + s * Ko.n[1]];
};
Ko.inside = (o, t) => {
  let e = Ko.poly,
    s = !1;
  for (let n = 0, i = e.length - 1; n < e.length; i = n++) {
    let [a, r] = e[n],
      [l, c] = e[i];
    r > t != c > t && o < ((l - a) * (t - r)) / (c - r) + a && (s = !s);
  }
  return s;
};
function qpt(o) {
  let t = o.terrain;
  if (!t) return;
  t.holes ||= new Set();
  let e = Ko;
  for (let s = 0; s < t.nz - 1; s++) {
    let n = t.z0 + s * t.step;
    if (!(n < 1150 || n > 1300))
      for (let i = 0; i < t.nx - 1; i++) {
        let a = t.x0 + i * t.step;
        if (a < -1340 || a > -1220) continue;
        let r = !0;
        for (let [l, c] of [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]) {
          let [h, f] = e.frame(a + l * t.step, n + c * t.step);
          if (!e.inside(h, f)) {
            r = !1;
            break;
          }
        }
        r && t.holes.add(s * t.nx + i);
      }
  }
}
var jpt = {
    a: [-3045, 2888.9],
    m: [-2963.1, 2883],
    hw: 4.6,
    s0: 14,
    depth: 7.2,
    apron: 6.5,
  },
  IP = (o, t, e) => {
    let s = t - o.a[0],
      n = e - o.a[1];
    return [s * o.ux + n * o.uz, -s * o.uz + n * o.ux];
  };
function fw(o, t, e, s = 0) {
  let n = o.duboce;
  if (!n) return !1;
  let [i, a] = IP(n, t, e);
  return i > n.s0 - 8 - s && i < n.L + 1 + s && Math.abs(a) < n.hw + s;
}
function $pt(o) {
  let t = o.terrain;
  if (!t) return;
  t.holes ||= new Set();
  let e = { ...jpt };
  if (
    ((e.L = Math.hypot(e.m[0] - e.a[0], e.m[1] - e.a[1])),
    (e.ux = (e.m[0] - e.a[0]) / e.L),
    (e.uz = (e.m[1] - e.a[1]) / e.L),
    e.a[0] < t.x0 || e.m[0] > t.x0 + (t.nx - 1) * t.step)
  )
    return;
  let s = (y, M) => {
      let S = (y - t.x0) / t.step,
        w = (M - t.z0) / t.step,
        _ = Math.max(0, Math.min(t.nx - 2, Math.floor(S))),
        z = Math.max(0, Math.min(t.nz - 2, Math.floor(w))),
        A = S - _,
        T = w - z,
        E = (R, P) => t.h[P * t.nx + R];
      return (
        (E(_, z) * (1 - A) + E(_ + 1, z) * A) * (1 - T) +
        (E(_, z + 1) * (1 - A) + E(_ + 1, z + 1) * A) * T
      );
    },
    n = (y, M) => [e.a[0] + e.ux * y - e.uz * M, e.a[1] + e.uz * y + e.ux * M],
    i = -60,
    a = e.L + 6,
    r = [];
  for (let y = i - 10; y <= a + 10; y += 2)
    r.push(0.5 * (s(...n(y, -10)) + s(...n(y, 10))));
  let l = (y) => {
      let M = (Math.max(i - 10, Math.min(a + 10, y)) - (i - 10)) / 2,
        S = Math.min(r.length - 2, Math.floor(M));
      return r[S] + (r[S + 1] - r[S]) * (M - S);
    },
    c = [];
  for (let y = i; y <= a; y += 2) {
    let M = 0,
      S = 0;
    for (let w = -10; w <= 10; w += 2) ((M += l(y + w)), S++);
    c.push(M / S);
  }
  ((e.lip = (y) => {
    let M = (Math.max(i, Math.min(a, y)) - i) / 2,
      S = Math.min(c.length - 2, Math.floor(M));
    return c[S] + (c[S + 1] - c[S]) * (M - S);
  }),
    (e.yM = e.lip(e.L) - e.depth),
    (e.floor = (y) => {
      let M = e.lip(e.s0),
        S = Math.max(0, Math.min(1, (y - e.s0) / (e.L - e.s0)));
      return y < e.s0
        ? e.lip(y) + 0.02
        : M + (e.yM - M) * 0.5 * (S + S * S * (3 - 2 * S));
    }));
  let h = Math.min(e.a[0], e.m[0]) - 90,
    f = Math.max(e.a[0], e.m[0]) + 30,
    u = Math.min(e.a[1], e.m[1]) - 40,
    d = Math.max(e.a[1], e.m[1]) + 40,
    p = Math.max(0, Math.floor((h - t.x0) / t.step)),
    m = Math.min(t.nx - 2, Math.ceil((f - t.x0) / t.step)),
    g = Math.max(0, Math.floor((u - t.z0) / t.step)),
    b = Math.min(t.nz - 2, Math.ceil((d - t.z0) / t.step)),
    v = e.hw + 8,
    x = e.hw + 18;
  for (let y = g; y <= b + 1; y++)
    for (let M = p; M <= m + 1; M++) {
      let [S, w] = IP(e, t.x0 + M * t.step, t.z0 + y * t.step),
        _ = y * t.nx + M,
        z = Math.abs(w);
      if (z > x || S < i - 8 || S > a + 8) continue;
      let A = Math.min(
          1,
          Math.max(0, (S - (i - 8)) / 8),
          Math.max(0, (a + 8 - S) / 8),
        ),
        T = z < v ? 1 : 1 - (z - v) / (x - v),
        E = A * T;
      t.h[_] = t.h[_] + (e.lip(S) - t.h[_]) * E;
    }
  for (let y = g; y <= b; y++)
    for (let M = p; M <= m; M++) {
      let S = !1;
      for (let [w, _] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]) {
        let [z, A] = IP(e, t.x0 + (M + w) * t.step, t.z0 + (y + _) * t.step);
        if (z > e.s0 - 6 && z < e.L - 0.3 && Math.abs(A) < e.hw) {
          S = !0;
          break;
        }
      }
      S && t.holes.add(y * t.nx + M);
    }
  o.duboce = e;
}
