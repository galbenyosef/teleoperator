// app 189 — math
// Lines 107804-108049 of readable/app.pretty.js (statement-aligned).
function ba(
  o,
  t,
  e,
  s,
  n,
  i,
  a,
  r,
  l,
  { top: c = !0, bottom: h = !1, topCol: f = null } = {},
) {
  let u = (p, m, g) => [
      t[0] + e[0] * n * p + s[0] * i * m,
      g,
      t[1] + e[1] * n * p + s[1] * i * m,
    ],
    d = (p, m, g, b, v) =>
      oe(o, [p, m, g, b], l, v, (x) => [
        x[0] * Math.abs(v[2]) + x[2] * Math.abs(v[0]) + (v[1] ? x[0] : 0),
        v[1] ? x[2] : x[1],
      ]);
  (d(u(1, -1, a), u(1, 1, a), u(1, 1, r), u(1, -1, r), [e[0], 0, e[1]]),
    d(u(-1, 1, a), u(-1, -1, a), u(-1, -1, r), u(-1, 1, r), [-e[0], 0, -e[1]]),
    d(u(-1, 1, a), u(1, 1, a), u(1, 1, r), u(-1, 1, r), [s[0], 0, s[1]]),
    d(u(1, -1, a), u(-1, -1, a), u(-1, -1, r), u(1, -1, r), [-s[0], 0, -s[1]]),
    c &&
      oe(
        o,
        [u(-1, -1, r), u(1, -1, r), u(1, 1, r), u(-1, 1, r)],
        f || l,
        [0, 1, 0],
        (p) => [p[0], p[2]],
      ),
    h &&
      oe(
        o,
        [u(-1, -1, a), u(1, -1, a), u(1, 1, a), u(-1, 1, a)],
        l,
        [0, -1, 0],
        (p) => [p[0], p[2]],
      ));
}
function xz(o, t, e, s, n = 1.8) {
  for (let i = 0; i + 1 < t.length; i++) {
    let a = t[i],
      r = t[i + 1],
      l = Math.hypot(r[0] - a[0], r[2] - a[2]),
      c = Math.max(1, Math.round(l / n));
    (Ce(o, [a[0], a[1] + e, a[2]], [r[0], r[1] + e, r[2]], 0.035, s, 6),
      Ce(
        o,
        [a[0], a[1] + e * 0.45, a[2]],
        [r[0], r[1] + e * 0.45, r[2]],
        0.018,
        s,
        4,
      ));
    for (let h = 0; h <= c; h++) {
      let f = h / c;
      (h === c && i + 2 < t.length) ||
        Ce(
          o,
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
var pgt = {
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
function lL(o, t, e, s, n, i, a, r = null) {
  let l = (i / 1.4) * 0.72,
    c = l * 0.45,
    h = t.length * l + (t.length - 1) * c;
  ((r = r || i * 0.13),
    [...t].forEach((f, u) => {
      let d = -h / 2 + u * (l + c);
      for (let [p, m, g, b] of pgt[f] || []) {
        let v = [d + p * l, (m / 1.4) * i],
          x = [d + g * l, (b / 1.4) * i],
          y = x[0] - v[0],
          M = x[1] - v[1],
          S = Math.hypot(y, M) || 1,
          w = ((-M / S) * r) / 2,
          _ = ((y / S) * r) / 2,
          z = (A, T) => [
            e[0] + s[0] * A + n[0] * 0.01,
            e[1] + T,
            e[2] + s[1] * A + n[2] * 0.01,
          ];
        oe(
          o,
          [
            z(v[0] - w - ((y / S) * r) / 2, v[1] - _ - ((M / S) * r) / 2),
            z(x[0] - w + ((y / S) * r) / 2, x[1] - _ + ((M / S) * r) / 2),
            z(x[0] + w + ((y / S) * r) / 2, x[1] + _ + ((M / S) * r) / 2),
            z(v[0] + w - ((y / S) * r) / 2, v[1] + _ - ((M / S) * r) / 2),
          ],
          a,
          n,
        );
      }
    }));
}
var mgt = Tn(ln.WIN, we.terracotta, 0.98, 0.9, 0.72),
  iL = We(we.terracotta, 0.9, 0.82, 0.66),
  ph = Lt(Ct.gloss, 0.5, 0.05, 0.03),
  mK = We(we.greentile, 0.95),
  ggt = Lt(Ct.matte, 0.1, 0.22, 0.2),
  bgt = Lt(Ct.gold, 0.75, 0.55, 0.18),
  cK = We(we.redbeam, 1),
  hK = Lt(Ct.glass, 0.04, 0.045, 0.05),
  xgt = Lt(Ct.glass, 0.06, 0.07, 0.075),
  vgt = wn(0.95, 0.75, 0.45);
function oL(o, t, e, s, n, i, a, r, l = 0.25) {
  let c = Math.cos(s),
    h = Math.sin(s),
    f = (d, p, m) => [t + c * d - h * p, m, e + h * d + c * p],
    u = 6;
  for (let d = 0; d < 4; d++) {
    let p = (m, g) => {
      let b = d,
        v = m,
        x = g;
      for (let y = 0; y < b; y++) {
        let M = v;
        ((v = -x), (x = M));
      }
      return [v, x];
    };
    for (let m = 0; m < u; m++)
      for (let g = 0; g < 3; g++) {
        let b = g / 3,
          v = (g + 1) / 3,
          x = m / u,
          y = (m + 1) / u,
          M = (_, z) => {
            let A = n * (1 - z) + l * z,
              T = -A + 2 * A * _,
              E = r * Math.pow(Math.abs(_ - 0.5) * 2, 3) * (1 - z) ** 2,
              R = i + a * (1 - Math.pow(1 - z, 1.7)) + E,
              [P, C] = p(T, -A);
            return f(P, C, R);
          },
          [S, w] = p(0, -1);
        (oe(o, [M(x, b), M(y, b), M(y, v), M(x, v)], mK, [
          c * S - h * w,
          0.7,
          h * S + c * w,
        ]),
          oe(
            o,
            [M(x, b), M(y, b), M(y, v), M(x, v)].map((_) => [
              _[0],
              _[1] - 0.12,
              _[2],
            ]),
            g ? ggt : ph,
            [-(c * S - h * w), -0.7, -(h * S + c * w)],
          ));
      }
    for (let m = 0; m < u; m++) {
      let g = m / u,
        b = (m + 1) / u,
        v = (w) => {
          let _ = -n + 2 * n * w,
            z = r * Math.pow(Math.abs(w - 0.5) * 2, 3),
            [A, T] = p(_, -n);
          return [A, T, i + z];
        },
        x = v(g),
        y = v(b),
        [M, S] = p(0, -1);
      oe(
        o,
        [
          f(x[0], x[1], x[2] - 0.3),
          f(y[0], y[1], y[2] - 0.3),
          f(y[0], y[1], y[2]),
          f(x[0], x[1], x[2]),
        ],
        ph,
        [c * M - h * S, 0, h * M + c * S],
      );
    }
  }
  return i + a;
}
