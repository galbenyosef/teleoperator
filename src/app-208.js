// app 208 — math
// Lines 113226-113443 of readable/app.pretty.js (statement-aligned).
function Uw(o, t, e, s, n = 0.9) {
  (Ss(o, t, e, e + 0.7, Pz), Ss(o, t, e + 0.7, s, Gw));
  for (let i of ia(t)) {
    for (
      let a = 0;
      a <= i.L + 0.01;
      a += i.L / Math.max(1, Math.round(i.L / n))
    )
      cn(
        o,
        [
          i.a[0] + i.u[0] * a + i.n[0] * 0.04,
          i.a[1] + i.u[1] * a + i.n[1] * 0.04,
        ],
        i.u,
        i.n,
        0.05,
        0.05,
        e + 0.7,
        s,
        xh,
        !1,
      );
    for (
      let a = e + 0.7;
      a < s + 0.01;
      a += Math.max(
        0.6,
        (s - e - 0.7) / Math.max(1, Math.round((s - e - 0.7) / 1.3)),
      )
    )
      cn(
        o,
        [i.m[0] + i.n[0] * 0.05, i.m[1] + i.n[1] * 0.05],
        i.u,
        i.n,
        i.L / 2,
        0.05,
        a - 0.05,
        a + 0.05,
        xh,
      );
  }
}
function hY(o, t, e, s, n, i, a, r = 10) {
  let l = (s + n) / 2,
    c = (n - s) / 2,
    h = (u, d) => {
      let p = (Math.PI * d) / r;
      return [u, i + Math.sin(p) * a, l - Math.cos(p) * c];
    };
  for (let u = 0; u < r; u++) {
    let d = h(t, u),
      p = h(e, u),
      m = h(e, u + 1),
      g = h(t, u + 1),
      b = (Math.PI * (u + 0.5)) / r;
    oe(o, [d, p, m, g], u % 2 ? Gw : IL, [
      0,
      Math.sin(b) * c,
      -Math.cos(b) * a,
    ]);
  }
  for (let [u, d] of [
    [t, -1],
    [e, 1],
  ]) {
    let p = [];
    for (let m = 0; m <= r; m++) p.push(h(u, m));
    oe(o, [[u, i, l], ...p], Gw, [d, 0, 0]);
  }
  let f = Math.max(2, Math.round((e - t) / 1.5));
  for (let u = 0; u <= f; u++) {
    let d = t + ((e - t) * u) / f;
    for (let p = 0; p < r; p++) {
      let m = h(d, p),
        g = h(d, p + 1),
        b = (Math.PI * (p + 0.5)) / r;
      Ce(
        o,
        [m[0], m[1] + Math.sin(b) * 0.05, m[2] - Math.cos(b) * 0.05],
        [g[0], g[1] + Math.sin(b) * 0.05, g[2] - Math.cos(b) * 0.05],
        0.07,
        xh,
        3,
      );
    }
  }
  Ce(o, h(t, r / 2), h(e, r / 2), 0.12, xh, 4);
}
function fY(o, t, e, s, n, i, a, r = 0) {
  let l = Array.from({ length: 8 }, (f, u) => [
    t + Math.cos(((u + 0.5) / 8) * Math.PI * 2) * s,
    e + Math.sin(((u + 0.5) / 8) * Math.PI * 2) * s,
  ]);
  (Uw(o, l, n, i, 1),
    qe(
      o,
      t,
      e,
      [
        [s * 1.05, i - 0.2],
        [s * 1.05, i + 0.5],
      ],
      16,
      xh,
    ));
  let c = [];
  for (let f = 0; f <= 8; f++) {
    let u = ((f / 8) * Math.PI) / 2;
    c.push([
      s * Math.cos(u) * (1 - 0.1 * Math.sin(u)) + 0.02,
      i + 0.5 + Math.sin(u) * a * (1 + 0.15 * (1 - Math.cos(u))),
    ]);
  }
  ((c[c.length - 1][0] = Math.max(0.05, r ? r * 0.8 : 0.05)),
    qe(o, t, e, c, 16, IL));
  for (let f = 0; f < 16; f++) {
    let u = (f / 16) * Math.PI * 2;
    for (let d = 0; d + 1 < c.length; d++) {
      let p = c[d],
        m = c[d + 1],
        g = 0.06;
      Ce(
        o,
        [t + Math.cos(u) * (p[0] + g), p[1], e - Math.sin(u) * (p[0] + g)],
        [t + Math.cos(u) * (m[0] + g), m[1], e - Math.sin(u) * (m[0] + g)],
        0.08,
        xh,
        3,
      );
    }
  }
  let h = c[c.length - 1][1];
  if (r) {
    let f = h;
    (qe(
      o,
      t,
      e,
      [
        [r, f - 0.2],
        [r, f + r * 1.2],
      ],
      8,
      Gw,
    ),
      qe(
        o,
        t,
        e,
        [
          [r * 1.15, f + r * 1.2],
          [r * 0.6, f + r * 1.9],
          [0.15, f + r * 2.3],
        ],
        8,
        xh,
      ),
      (h = f + r * 2.3));
  }
  qe(
    o,
    t,
    e,
    [
      [0.18, h],
      [0.3, h + 0.5],
      [0.05, h + 2],
    ],
    6,
    xh,
  );
}
function oxt(o, t, e, s, n, i, a, r = 0) {
  let l = Math.cos(r),
    c = Math.sin(r),
    h = Math.max(n, i),
    f = 0.8;
  for (let u = e - h; u < e + h; u += f)
    for (let d = s - h; d < s + h; d += f) {
      let p = u + f / 2 - e,
        m = d + f / 2 - s,
        g = (p * l + m * c) / n,
        b = (-p * c + m * l) / i,
        v = Math.hypot(g, b);
      if (v > 1) continue;
      let x = [
          [u, d],
          [u + f, d],
          [u + f, d + f],
          [u, d + f],
        ].map(([M, S]) => [M, t.terrainAt(M, S) + 0.14, S]),
        y = Math.min(a.length - 1, Math.floor(v * a.length));
      o.quad(
        x[0],
        x[3],
        x[2],
        x[1],
        [x[0][0], x[0][2]],
        [x[3][0], x[3][2]],
        [x[2][0], x[2][2]],
        [x[1][0], x[1][2]],
        a[y],
        [0, 1, 0],
      );
    }
}
var Yo = {
  red: Lt(Ct.matte, 0.75, 0.08, 0.05),
  orange: Lt(Ct.matte, 0.9, 0.38, 0.05),
  yellow: Lt(Ct.matte, 0.92, 0.75, 0.08),
  white: Lt(Ct.matte, 0.92, 0.92, 0.88),
  purple: Lt(Ct.matte, 0.35, 0.12, 0.55),
  pink: Lt(Ct.matte, 0.9, 0.35, 0.55),
  blue: Lt(Ct.matte, 0.25, 0.3, 0.75),
  green: Lt(Ct.leaf, 0.09, 0.2, 0.05),
};
