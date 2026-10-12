// app 186 — math
// Lines 106303-106650 of readable/app.pretty.js (statement-aligned).
var UV = {
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
function kP(i, t) {
  if (i._rl) return i._rl;
  let e = ((t.tg || 0) >> 3) & 7,
    s = UV[t.st] || UV[8],
    n = 0,
    o = s.map(([u, d]) => [
      u,
      u === 1
        ? d * (e >= 6 ? 1.8 : e >= 1 && e <= 3 ? 0.5 : 1)
        : u === 4
          ? d * (e >= 6 ? 1.3 : e >= 1 && e <= 3 ? 0.3 : 1)
          : u === 0 || u === 2
            ? d * (e >= 1 && e <= 3 ? 1.4 : 1)
            : d,
    ]);
  for (let [, u] of o) n += u;
  let a = Cn(i.seed, 71) * n,
    r = o[0][0];
  for (let [u, d] of o)
    if ((a -= d) <= 0) {
      r = u;
      break;
    }
  let l = 0.85 + 0.3 * Cn(i.seed, 72),
    c = 0.95 + 0.1 * Cn(i.seed, 73),
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
  return (i._rl = {
    kind: r,
    near: [...h, 0.5 + (r + 0.5) / 16],
    far: [...h.map((u) => u * f), 0],
  });
}
var e$ = [0.3, 0.31, 0.33, 1 / 5],
  GV = [
    [0.62, 0.36, 0.3, 1 / 5],
    [0.5, 0.5, 0.52, 1 / 5],
    [0.7, 0.62, 0.52, 1 / 5],
    [0.42, 0.4, 0.4, 1 / 5],
  ];
function s$(i, t, e, s, n) {
  let o = t.rings[0],
    a = o.length / 2,
    [r, l] = pu(o),
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
      x = e + (c - e) * m,
      v = e + (c - e) * b;
    f = 0;
    for (let y = 0; y < a; y++) {
      let M = o[y * 2],
        S = o[y * 2 + 1],
        w = o[((y + 1) % a) * 2],
        z = o[((y + 1) % a) * 2 + 1],
        _ = Math.hypot(w - M, z - S);
      if (_ < 0.05) continue;
      let R = (B, H, O) => [r + (B - r) * O, l + (H - l) * O],
        [T, E] = R(M, S, p),
        [A, C] = R(w, z, p),
        [P, I] = R(M, S, g),
        [L, F] = R(w, z, g),
        N = n
          ? [
              [f, x - t.base],
              [f + _, x - t.base],
              [f + (_ * g) / p, v - t.base],
              [f, v - t.base],
            ]
          : [
              [T, E],
              [A, C],
              [L, F],
              [P, I],
            ];
      (i.quad(
        [T, x, E],
        [A, x, C],
        [L, v, F],
        [P, v, I],
        N[0],
        N[1],
        N[2],
        N[3],
        s,
      ),
        (f += _));
    }
  }
  let u = h[h.length - 1][0];
  if (u > 0.05) {
    let d = [];
    for (let p = 0; p < a; p++)
      d.push(r + (o[p * 2] - r) * u, l + (o[p * 2 + 1] - l) * u);
    Hb(i, [d], c, s, !0);
  }
}
function Hb(i, t, e, s, n) {
  let o;
  try {
    o = Vl(t);
  } catch {
    return;
  }
  let { tris: a, flat: r } = o,
    l = i.v;
  for (let h = 0; h < r.length / 2; h++)
    i.vert(
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
  let c = i.p.a;
  for (let [h, f, u] of a) {
    let d = l + h,
      p = l + f,
      m = l + u;
    (c[p * 3 + 2] - c[d * 3 + 2]) * (c[m * 3] - c[d * 3]) -
      (c[p * 3] - c[d * 3]) * (c[m * 3 + 2] - c[d * 3 + 2]) >=
      0 ===
    n
      ? i.tri(d, p, m)
      : i.tri(d, m, p);
  }
}
function dk(i, t, e, s, n, o, a) {
  let r = e + n,
    l = s + o,
    c = Math.hypot(r, l);
  if (c < 0.001) return 0;
  ((r /= c), (l /= c));
  let h = i * r + t * l,
    f = i - h * r,
    u = t - h * l,
    d = i * f + t * u;
  if (d < 0.001) return 0;
  let p = (e * f + s * u) / d;
  return Math.min(4, Math.max(0, a ? p : -p));
}
function WV(i) {
  let t = i.length / 2,
    e = [],
    s = [],
    n = [];
  for (let r = 0; r < t; r++) {
    let l = i[((r + 1) % t) * 2] - i[r * 2],
      c = i[((r + 1) % t) * 2 + 1] - i[r * 2 + 1],
      h = Math.hypot(l, c);
    e.push(h > 0.05 ? [l / h, c / h] : null);
  }
  let o = (r) => {
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
      c = o(r),
      h = a(r);
    if (!l || !c || !h) {
      (s.push([0, 0]), n.push([0, 0]));
      continue;
    }
    let f = [-l[1], l[0]],
      u = [-c[1], c[0]],
      d = [-h[1], h[0]];
    (s.push([
      dk(l[0], l[1], f[0], f[1], u[0], u[1], !1),
      dk(l[0], l[1], f[0], f[1], d[0], d[1], !0),
    ]),
      n.push([
        dk(l[0], l[1], -f[0], -f[1], -u[0], -u[1], !1),
        dk(l[0], l[1], -f[0], -f[1], -d[0], -d[1], !0),
      ]));
  }
  return { out: s, inn: n };
}
function wP(i, t, e = !1) {
  let s = i[t],
    n = s.length / 2,
    o = new Float32Array(n).fill(1 / 0),
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
        (!en(i[0], g + d * 0.05, b + p * 0.05) ||
          i.slice(1).some((x) => en(x, g + d * 0.05, b + p * 0.05)))
      ) {
        o[r] = 0;
        continue;
      }
      for (let x = 0; x < i.length; x++) {
        let v = i[x],
          y = v.length / 2;
        for (let M = 0; M < y; M++) {
          if (x === t && M === r) continue;
          let S = v[M * 2],
            w = v[M * 2 + 1],
            z = v[((M + 1) % y) * 2] - S,
            _ = v[((M + 1) % y) * 2 + 1] - w,
            R = d * _ - p * z;
          if (Math.abs(R) < 1e-9) continue;
          let T = ((S - g) * _ - (w - b) * z) / R,
            E = ((S - g) * p - (w - b) * d) / R;
          T > (e ? 0.001 : 0.02) && E >= 0 && E <= 1 && T < o[r] && (o[r] = T);
        }
      }
    }
  }
  return o;
}
function qV(i, t, e, s, n, o, a, r, l, c = 0, h = 0) {
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
    x = s + u - p * h * r,
    v = n + d - m * h * r;
  (i.wall(g, b, x, v, o, o, a, a, l),
    Uy(i, [t, a, e], [g, a, b], [x, a, v], [s, a, n], l, !0),
    Uy(i, [t, o, e], [s, o, n], [x, o, v], [g, o, b], l, !1),
    i.wall(t, e, g, b, o, o, a, a, l),
    i.wall(x, v, s, n, o, o, a, a, l));
}
