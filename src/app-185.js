// app 185 — math
// Lines 106543-106890 of readable/app.pretty.js (statement-aligned).
var WX = {
  0: [
    [0, 0.35],
    [2, 0.3],
    [1, 0.15],
    [6, 0.05],
    [7, 0.15],
  ],
  1: [
    [0, 0.35],
    [2, 0.3],
    [1, 0.15],
    [6, 0.05],
    [7, 0.15],
  ],
  2: [
    [0, 0.3],
    [1, 0.25],
    [2, 0.25],
    [3, 0.12],
    [4, 0.03],
    [6, 0.05],
  ],
  3: [
    [0, 0.3],
    [1, 0.25],
    [2, 0.25],
    [3, 0.12],
    [4, 0.03],
    [6, 0.05],
  ],
  4: [
    [0, 0.35],
    [2, 0.35],
    [1, 0.2],
    [3, 0.1],
  ],
  5: [
    [0, 0.4],
    [2, 0.35],
    [1, 0.2],
    [6, 0.05],
  ],
  6: [
    [1, 0.45],
    [0, 0.28],
    [6, 0.12],
    [3, 0.05],
    [4, 0.035],
    [2, 0.06],
  ],
  7: [
    [2, 0.5],
    [0, 0.3],
    [1, 0.2],
  ],
  8: [
    [1, 0.35],
    [0, 0.3],
    [2, 0.3],
    [6, 0.05],
  ],
};
function eL(o, t) {
  if (o._rl) return o._rl;
  let e = ((t.tg || 0) >> 3) & 7,
    s = WX[t.st] || WX[8],
    n = 0,
    i = s.map(([u, d]) => [
      u,
      u === 1
        ? d * (e >= 6 ? 1.8 : e >= 1 && e <= 3 ? 0.5 : 1)
        : u === 4
          ? d * (e >= 6 ? 1.3 : e >= 1 && e <= 3 ? 0.3 : 1)
          : u === 0 || u === 2
            ? d * (e >= 1 && e <= 3 ? 1.4 : 1)
            : d,
    ]);
  for (let [, u] of i) n += u;
  let a = Bn(o.seed, 71) * n,
    r = i[0][0];
  for (let [u, d] of i)
    if ((a -= d) <= 0) {
      r = u;
      break;
    }
  let l = 0.85 + 0.3 * Bn(o.seed, 72),
    c = 0.95 + 0.1 * Bn(o.seed, 73),
    h = {
      0: [0.62 * l, 0.61 * l, 0.59 * l],
      1: [0.66 * c, 0.67 * c, 0.66 * c],
      2: [0.1 * l, 0.1 * l, 0.105 * l],
      3: [0.43 * l, 0.41 * l, 0.38 * l],
      4: [0.1, 0.12, 0.05],
      6: [0.21 * l, 0.21 * l, 0.22 * l],
      7: [0.3 * l, 0.25 * l, 0.2 * l],
    }[r],
    f = { 0: 0.38, 1: 0.9, 2: 0.88, 3: 0.85, 4: 1, 6: 0.95, 7: 0.85 }[r];
  return (o._rl = {
    kind: r,
    near: [...h, 0.5 + (r + 0.5) / 16],
    far: [...h.map((u) => u * f), 0],
  });
}
var iK = [0.3, 0.31, 0.33, 1 / 5],
  qX = [
    [0.62, 0.36, 0.3, 1 / 5],
    [0.5, 0.5, 0.52, 1 / 5],
    [0.7, 0.62, 0.52, 1 / 5],
    [0.42, 0.4, 0.4, 1 / 5],
  ];
function oK(o, t, e, s, n) {
  let i = t.rings[0],
    a = i.length / 2,
    [r, l] = Ef(i),
    c = t.top,
    h =
      t.rs === 4
        ? [
            [1, 0],
            [0.92, 0.38],
            [0.71, 0.71],
            [0.38, 0.92],
            [0.02, 1],
          ]
        : t.rs === 1
          ? [
              [1, 0],
              [0.004, 1],
            ]
          : [
              [1, 0],
              [0.3, 1],
            ],
    f = 0;
  for (let d = 0; d + 1 < h.length; d++) {
    let [p, m] = h[d],
      [g, b] = h[d + 1],
      v = e + (c - e) * m,
      x = e + (c - e) * b;
    f = 0;
    for (let y = 0; y < a; y++) {
      let M = i[y * 2],
        S = i[y * 2 + 1],
        w = i[((y + 1) % a) * 2],
        _ = i[((y + 1) % a) * 2 + 1],
        z = Math.hypot(w - M, _ - S);
      if (z < 0.05) continue;
      let A = (B, H, N) => [r + (B - r) * N, l + (H - l) * N],
        [T, E] = A(M, S, p),
        [R, P] = A(w, _, p),
        [C, I] = A(M, S, g),
        [L, F] = A(w, _, g),
        O = n
          ? [
              [f, v - t.base],
              [f + z, v - t.base],
              [f + (z * g) / p, x - t.base],
              [f, x - t.base],
            ]
          : [
              [T, E],
              [R, P],
              [L, F],
              [C, I],
            ];
      (o.quad(
        [T, v, E],
        [R, v, P],
        [L, x, F],
        [C, x, I],
        O[0],
        O[1],
        O[2],
        O[3],
        s,
      ),
        (f += z));
    }
  }
  let u = h[h.length - 1][0];
  if (u > 0.05) {
    let d = [];
    for (let p = 0; p < a; p++)
      d.push(r + (i[p * 2] - r) * u, l + (i[p * 2 + 1] - l) * u);
    zx(o, [d], c, s, !0);
  }
}
function zx(o, t, e, s, n) {
  let i;
  try {
    i = dc(t);
  } catch {
    return;
  }
  let { tris: a, flat: r } = i,
    l = o.v;
  for (let h = 0; h < r.length / 2; h++)
    o.vert(
      r[h * 2],
      e,
      r[h * 2 + 1],
      0,
      n ? 1 : -1,
      0,
      r[h * 2],
      r[h * 2 + 1],
      s,
    );
  let c = o.p.a;
  for (let [h, f, u] of a) {
    let d = l + h,
      p = l + f,
      m = l + u;
    (c[p * 3 + 2] - c[d * 3 + 2]) * (c[m * 3] - c[d * 3]) -
      (c[p * 3] - c[d * 3]) * (c[m * 3 + 2] - c[d * 3 + 2]) >=
      0 ===
    n
      ? o.tri(d, p, m)
      : o.tri(d, m, p);
  }
}
function dz(o, t, e, s, n, i, a) {
  let r = e + n,
    l = s + i,
    c = Math.hypot(r, l);
  if (c < 0.001) return 0;
  ((r /= c), (l /= c));
  let h = o * r + t * l,
    f = o - h * r,
    u = t - h * l,
    d = o * f + t * u;
  if (d < 0.001) return 0;
  let p = (e * f + s * u) / d;
  return Math.min(4, Math.max(0, a ? p : -p));
}
function jX(o) {
  let t = o.length / 2,
    e = [],
    s = [],
    n = [];
  for (let r = 0; r < t; r++) {
    let l = o[((r + 1) % t) * 2] - o[r * 2],
      c = o[((r + 1) % t) * 2 + 1] - o[r * 2 + 1],
      h = Math.hypot(l, c);
    e.push(h > 0.05 ? [l / h, c / h] : null);
  }
  let i = (r) => {
      for (let l = 1; l < t; l++) {
        let c = e[(r - l + t) % t];
        if (c) return c;
      }
      return null;
    },
    a = (r) => {
      for (let l = 1; l < t; l++) {
        let c = e[(r + l) % t];
        if (c) return c;
      }
      return null;
    };
  for (let r = 0; r < t; r++) {
    let l = e[r],
      c = i(r),
      h = a(r);
    if (!l || !c || !h) {
      (s.push([0, 0]), n.push([0, 0]));
      continue;
    }
    let f = [-l[1], l[0]],
      u = [-c[1], c[0]],
      d = [-h[1], h[0]];
    (s.push([
      dz(l[0], l[1], f[0], f[1], u[0], u[1], !1),
      dz(l[0], l[1], f[0], f[1], d[0], d[1], !0),
    ]),
      n.push([
        dz(l[0], l[1], -f[0], -f[1], -u[0], -u[1], !1),
        dz(l[0], l[1], -f[0], -f[1], -d[0], -d[1], !0),
      ]));
  }
  return { out: s, inn: n };
}
function ZC(o, t, e = !1) {
  let s = o[t],
    n = s.length / 2,
    i = new Float32Array(n).fill(1 / 0),
    a = e ? -1 : 1;
  for (let r = 0; r < n; r++) {
    let l = s[r * 2],
      c = s[r * 2 + 1],
      h = s[((r + 1) % n) * 2],
      f = s[((r + 1) % n) * 2 + 1],
      u = Math.hypot(h - l, f - c);
    if (u < 0.3) continue;
    let d = (-(f - c) / u) * a,
      p = ((h - l) / u) * a;
    for (let m of [0.2, 0.5, 0.8]) {
      let g = l + (h - l) * m,
        b = c + (f - c) * m;
      if (
        e &&
        (!rn(o[0], g + d * 0.05, b + p * 0.05) ||
          o.slice(1).some((v) => rn(v, g + d * 0.05, b + p * 0.05)))
      ) {
        i[r] = 0;
        continue;
      }
      for (let v = 0; v < o.length; v++) {
        let x = o[v],
          y = x.length / 2;
        for (let M = 0; M < y; M++) {
          if (v === t && M === r) continue;
          let S = x[M * 2],
            w = x[M * 2 + 1],
            _ = x[((M + 1) % y) * 2] - S,
            z = x[((M + 1) % y) * 2 + 1] - w,
            A = d * z - p * _;
          if (Math.abs(A) < 1e-9) continue;
          let T = ((S - g) * z - (w - b) * _) / A,
            E = ((S - g) * p - (w - b) * d) / A;
          T > (e ? 0.001 : 0.02) && E >= 0 && E <= 1 && T < i[r] && (i[r] = T);
        }
      }
    }
  }
  return i;
}
function $X(o, t, e, s, n, i, a, r, l, c = 0, h = 0) {
  let f = Math.hypot(s - t, n - e),
    u = (-(n - e) / f) * r,
    d = ((s - t) / f) * r,
    p = (s - t) / f,
    m = (n - e) / f;
  {
    let y = Math.min(1, (f * 0.98) / Math.max(1e-6, (c + h) * r));
    ((c *= y), (h *= y));
  }
  let g = t + u + p * c * r,
    b = e + d + m * c * r,
    v = s + u - p * h * r,
    x = n + d - m * h * r;
  (o.wall(g, b, v, x, i, i, a, a, l),
    Fw(o, [t, a, e], [g, a, b], [v, a, x], [s, a, n], l, !0),
    Fw(o, [t, i, e], [s, i, n], [v, i, x], [g, i, b], l, !1),
    o.wall(t, e, g, b, i, i, a, a, l),
    o.wall(v, x, s, n, i, i, a, a, l));
}
