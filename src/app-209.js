// app 209 — math
// Lines 112970-113187 of readable/app.pretty.js (statement-aligned).
function Vy(i, t, e, s, n = 0.9) {
  (ys(i, t, e, e + 0.7, Pk), ys(i, t, e + 0.7, s, $y));
  for (let o of Xo(t)) {
    for (
      let a = 0;
      a <= o.L + 0.01;
      a += o.L / Math.max(1, Math.round(o.L / n))
    )
      nn(
        i,
        [
          o.a[0] + o.u[0] * a + o.n[0] * 0.04,
          o.a[1] + o.u[1] * a + o.n[1] * 0.04,
        ],
        o.u,
        o.n,
        0.05,
        0.05,
        e + 0.7,
        s,
        Gc,
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
      nn(
        i,
        [o.m[0] + o.n[0] * 0.05, o.m[1] + o.n[1] * 0.05],
        o.u,
        o.n,
        o.L / 2,
        0.05,
        a - 0.05,
        a + 0.05,
        Gc,
      );
  }
}
function rX(i, t, e, s, n, o, a, r = 10) {
  let l = (s + n) / 2,
    c = (n - s) / 2,
    h = (u, d) => {
      let p = (Math.PI * d) / r;
      return [u, o + Math.sin(p) * a, l - Math.cos(p) * c];
    };
  for (let u = 0; u < r; u++) {
    let d = h(t, u),
      p = h(e, u),
      m = h(e, u + 1),
      g = h(t, u + 1),
      b = (Math.PI * (u + 0.5)) / r;
    ne(i, [d, p, m, g], u % 2 ? $y : iC, [
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
    ne(i, [[u, o, l], ...p], $y, [d, 0, 0]);
  }
  let f = Math.max(2, Math.round((e - t) / 1.5));
  for (let u = 0; u <= f; u++) {
    let d = t + ((e - t) * u) / f;
    for (let p = 0; p < r; p++) {
      let m = h(d, p),
        g = h(d, p + 1),
        b = (Math.PI * (p + 0.5)) / r;
      Ae(
        i,
        [m[0], m[1] + Math.sin(b) * 0.05, m[2] - Math.cos(b) * 0.05],
        [g[0], g[1] + Math.sin(b) * 0.05, g[2] - Math.cos(b) * 0.05],
        0.07,
        Gc,
        3,
      );
    }
  }
  Ae(i, h(t, r / 2), h(e, r / 2), 0.12, Gc, 4);
}
function lX(i, t, e, s, n, o, a, r = 0) {
  let l = Array.from({ length: 8 }, (f, u) => [
    t + Math.cos(((u + 0.5) / 8) * Math.PI * 2) * s,
    e + Math.sin(((u + 0.5) / 8) * Math.PI * 2) * s,
  ]);
  (Vy(i, l, n, o, 1),
    Oe(
      i,
      t,
      e,
      [
        [s * 1.05, o - 0.2],
        [s * 1.05, o + 0.5],
      ],
      16,
      Gc,
    ));
  let c = [];
  for (let f = 0; f <= 8; f++) {
    let u = ((f / 8) * Math.PI) / 2;
    c.push([
      s * Math.cos(u) * (1 - 0.1 * Math.sin(u)) + 0.02,
      o + 0.5 + Math.sin(u) * a * (1 + 0.15 * (1 - Math.cos(u))),
    ]);
  }
  ((c[c.length - 1][0] = Math.max(0.05, r ? r * 0.8 : 0.05)),
    Oe(i, t, e, c, 16, iC));
  for (let f = 0; f < 16; f++) {
    let u = (f / 16) * Math.PI * 2;
    for (let d = 0; d + 1 < c.length; d++) {
      let p = c[d],
        m = c[d + 1],
        g = 0.06;
      Ae(
        i,
        [t + Math.cos(u) * (p[0] + g), p[1], e - Math.sin(u) * (p[0] + g)],
        [t + Math.cos(u) * (m[0] + g), m[1], e - Math.sin(u) * (m[0] + g)],
        0.08,
        Gc,
        3,
      );
    }
  }
  let h = c[c.length - 1][1];
  if (r) {
    let f = h;
    (Oe(
      i,
      t,
      e,
      [
        [r, f - 0.2],
        [r, f + r * 1.2],
      ],
      8,
      $y,
    ),
      Oe(
        i,
        t,
        e,
        [
          [r * 1.15, f + r * 1.2],
          [r * 0.6, f + r * 1.9],
          [0.15, f + r * 2.3],
        ],
        8,
        Gc,
      ),
      (h = f + r * 2.3));
  }
  Oe(
    i,
    t,
    e,
    [
      [0.18, h],
      [0.3, h + 0.5],
      [0.05, h + 2],
    ],
    6,
    Gc,
  );
}
function Fmt(i, t, e, s, n, o, a, r = 0) {
  let l = Math.cos(r),
    c = Math.sin(r),
    h = Math.max(n, o),
    f = 0.8;
  for (let u = e - h; u < e + h; u += f)
    for (let d = s - h; d < s + h; d += f) {
      let p = u + f / 2 - e,
        m = d + f / 2 - s,
        g = (p * l + m * c) / n,
        b = (-p * c + m * l) / o,
        x = Math.hypot(g, b);
      if (x > 1) continue;
      let v = [
          [u, d],
          [u + f, d],
          [u + f, d + f],
          [u, d + f],
        ].map(([M, S]) => [M, t.terrainAt(M, S) + 0.14, S]),
        y = Math.min(a.length - 1, Math.floor(x * a.length));
      i.quad(
        v[0],
        v[3],
        v[2],
        v[1],
        [v[0][0], v[0][2]],
        [v[3][0], v[3][2]],
        [v[2][0], v[2][2]],
        [v[1][0], v[1][2]],
        a[y],
        [0, 1, 0],
      );
    }
}
var Do = {
  red: It(Lt.matte, 0.75, 0.08, 0.05),
  orange: It(Lt.matte, 0.9, 0.38, 0.05),
  yellow: It(Lt.matte, 0.92, 0.75, 0.08),
  white: It(Lt.matte, 0.92, 0.92, 0.88),
  purple: It(Lt.matte, 0.35, 0.12, 0.55),
  pink: It(Lt.matte, 0.9, 0.35, 0.55),
  blue: It(Lt.matte, 0.25, 0.3, 0.75),
  green: It(Lt.leaf, 0.09, 0.2, 0.05),
};
