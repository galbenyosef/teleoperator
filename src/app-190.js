// app 190 — math
// Lines 107591-107793 of readable/app.pretty.js (statement-aligned).
function xk(i, t, e, s, n = 1.8) {
  for (let o = 0; o + 1 < t.length; o++) {
    let a = t[o],
      r = t[o + 1],
      l = Math.hypot(r[0] - a[0], r[2] - a[2]),
      c = Math.max(1, Math.round(l / n));
    (Ae(i, [a[0], a[1] + e, a[2]], [r[0], r[1] + e, r[2]], 0.035, s, 6),
      Ae(
        i,
        [a[0], a[1] + e * 0.45, a[2]],
        [r[0], r[1] + e * 0.45, r[2]],
        0.018,
        s,
        4,
      ));
    for (let h = 0; h <= c; h++) {
      let f = h / c;
      (h === c && o + 2 < t.length) ||
        Ae(
          i,
          [
            a[0] + (r[0] - a[0]) * f,
            a[1] + (r[1] - a[1]) * f,
            a[2] + (r[2] - a[2]) * f,
          ],
          [
            a[0] + (r[0] - a[0]) * f,
            a[1] + (r[1] - a[1]) * f + e,
            a[2] + (r[2] - a[2]) * f,
          ],
          0.025,
          s,
          4,
        );
    }
  }
}
var qpt = {
  B: [
    [0, 0, 0, 1.4],
    [0, 1.4, 0.75, 1.4],
    [0.75, 1.4, 0.9, 1.15],
    [0.9, 1.15, 0.75, 0.72],
    [0, 0.72, 0.8, 0.72],
    [0.8, 0.72, 1, 0.45],
    [1, 0.45, 0.85, 0],
    [0.85, 0, 0, 0],
  ],
  A: [
    [0, 0, 0.5, 1.4],
    [0.5, 1.4, 1, 0],
    [0.22, 0.6, 0.78, 0.6],
  ],
  R: [
    [0, 0, 0, 1.4],
    [0, 1.4, 0.85, 1.4],
    [0.85, 1.4, 1, 1.05],
    [1, 1.05, 0.85, 0.72],
    [0.85, 0.72, 0, 0.72],
    [0.4, 0.72, 1, 0],
  ],
  T: [
    [0, 1.4, 1, 1.4],
    [0.5, 1.4, 0.5, 0],
  ],
  M: [
    [0, 0, 0, 1.4],
    [0, 1.4, 0.5, 0.7],
    [0.5, 0.7, 1, 1.4],
    [1, 1.4, 1, 0],
  ],
  U: [
    [0, 1.4, 0, 0.2],
    [0, 0.2, 0.2, 0],
    [0.2, 0, 0.8, 0],
    [0.8, 0, 1, 0.2],
    [1, 0.2, 1, 1.4],
  ],
  N: [
    [0, 0, 0, 1.4],
    [0, 1.4, 1, 0],
    [1, 0, 1, 1.4],
  ],
  I: [[0.5, 0, 0.5, 1.4]],
};
function CP(i, t, e, s, n, o, a, r = null) {
  let l = (o / 1.4) * 0.72,
    c = l * 0.45,
    h = t.length * l + (t.length - 1) * c;
  ((r = r || o * 0.13),
    [...t].forEach((f, u) => {
      let d = -h / 2 + u * (l + c);
      for (let [p, m, g, b] of qpt[f] || []) {
        let x = [d + p * l, (m / 1.4) * o],
          v = [d + g * l, (b / 1.4) * o],
          y = v[0] - x[0],
          M = v[1] - x[1],
          S = Math.hypot(y, M) || 1,
          w = ((-M / S) * r) / 2,
          z = ((y / S) * r) / 2,
          _ = (R, T) => [
            e[0] + s[0] * R + n[0] * 0.01,
            e[1] + T,
            e[2] + s[1] * R + n[2] * 0.01,
          ];
        ne(
          i,
          [
            _(x[0] - w - ((y / S) * r) / 2, x[1] - z - ((M / S) * r) / 2),
            _(v[0] - w + ((y / S) * r) / 2, v[1] - z + ((M / S) * r) / 2),
            _(v[0] + w + ((y / S) * r) / 2, v[1] + z + ((M / S) * r) / 2),
            _(x[0] + w - ((y / S) * r) / 2, x[1] + z - ((M / S) * r) / 2),
          ],
          a,
          n,
        );
      }
    }));
}
var jpt = yn(sn.WIN, be.terracotta, 0.98, 0.9, 0.72),
  TP = Be(be.terracotta, 0.9, 0.82, 0.66),
  Oc = It(Lt.gloss, 0.5, 0.05, 0.03),
  u$ = Be(be.greentile, 0.95),
  Vpt = It(Lt.matte, 0.1, 0.22, 0.2),
  $pt = It(Lt.gold, 0.75, 0.55, 0.18),
  a$ = Be(be.redbeam, 1),
  r$ = It(Lt.glass, 0.04, 0.045, 0.05),
  Xpt = It(Lt.glass, 0.06, 0.07, 0.075),
  Kpt = bn(0.95, 0.75, 0.45);
function AP(i, t, e, s, n, o, a, r, l = 0.25) {
  let c = Math.cos(s),
    h = Math.sin(s),
    f = (d, p, m) => [t + c * d - h * p, m, e + h * d + c * p],
    u = 6;
  for (let d = 0; d < 4; d++) {
    let p = (m, g) => {
      let b = d,
        x = m,
        v = g;
      for (let y = 0; y < b; y++) {
        let M = x;
        ((x = -v), (v = M));
      }
      return [x, v];
    };
    for (let m = 0; m < u; m++)
      for (let g = 0; g < 3; g++) {
        let b = g / 3,
          x = (g + 1) / 3,
          v = m / u,
          y = (m + 1) / u,
          M = (z, _) => {
            let R = n * (1 - _) + l * _,
              T = -R + 2 * R * z,
              E = r * Math.pow(Math.abs(z - 0.5) * 2, 3) * (1 - _) ** 2,
              A = o + a * (1 - Math.pow(1 - _, 1.7)) + E,
              [C, P] = p(T, -R);
            return f(C, P, A);
          },
          [S, w] = p(0, -1);
        (ne(i, [M(v, b), M(y, b), M(y, x), M(v, x)], u$, [
          c * S - h * w,
          0.7,
          h * S + c * w,
        ]),
          ne(
            i,
            [M(v, b), M(y, b), M(y, x), M(v, x)].map((z) => [
              z[0],
              z[1] - 0.12,
              z[2],
            ]),
            g ? Vpt : Oc,
            [-(c * S - h * w), -0.7, -(h * S + c * w)],
          ));
      }
    for (let m = 0; m < u; m++) {
      let g = m / u,
        b = (m + 1) / u,
        x = (w) => {
          let z = -n + 2 * n * w,
            _ = r * Math.pow(Math.abs(w - 0.5) * 2, 3),
            [R, T] = p(z, -n);
          return [R, T, o + _];
        },
        v = x(g),
        y = x(b),
        [M, S] = p(0, -1);
      ne(
        i,
        [
          f(v[0], v[1], v[2] - 0.3),
          f(y[0], y[1], y[2] - 0.3),
          f(y[0], y[1], y[2]),
          f(v[0], v[1], v[2]),
        ],
        Oc,
        [c * M - h * S, 0, h * M + c * S],
      );
    }
  }
  return o + a;
}
