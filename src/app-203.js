// app 203 — granite
// Lines 111654-111989 of readable/app.pretty.js (statement-aligned).
var WK = Tn(ln.WIN, we.granite, 0.58, 0.53, 0.46),
  xL = We(we.granite, 0.5, 0.46, 0.4),
  Rx = We(we.granite, 0.66, 0.61, 0.53),
  wbt = Lt(Ct.gloss, 0.5, 0.06, 0.05),
  Tz = Lt(Ct.glass, 0.05, 0.06, 0.07),
  Mbt = wn(1, 0.85, 0.6);
function Sbt(o, t) {
  let { D: e, L: s } = t,
    n = Zu(e, dr.westin);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    [r, l] = Np(s, i),
    c = r,
    h = c + (n.top - n.base),
    f = c + 8.4;
  Ss(o, i, r - 0.6, f, xL, { vBase: c });
  for (let v = c + 0.6; v < f - 0.4; v += 0.62) Eo(o, a, 0.06, v, v + 0.44, xL);
  (Eo(o, a, 0.45, f - 0.2, f + 0.5, Rx),
    Ss(o, i, f + 0.5, h - 4.5, WK, { vBase: c + 0.6 }),
    Eo(o, a, 0.3, h - 8.2, h - 7.7, Rx),
    Eo(o, a, 1.1, h - 4.5, h - 3.6, Rx),
    Eo(o, a, 0.6, h - 3.6, h - 3.2, xL),
    Ss(o, i, h - 3.6, h, WK, { vBase: c + 0.6 }),
    Eo(o, a, 0.35, h - 0.3, h + 0.1, Rx),
    sr(o, i, h, Lt(Ct.stone, 0.3, 0.3, 0.29)));
  let u = Qm(s, a, "Powell Street"),
    d = u.u,
    p = u.n,
    m = u.m,
    g = u.L / 2 - 1.5,
    b = (v, x) => [m[0] + d[0] * v + p[0] * x, m[1] + d[1] * v + p[1] * x];
  {
    let v = b(-g, 0.12),
      x = b(g, 0.12);
    oe(
      o,
      [
        [v[0], c + 0.4, v[1]],
        [x[0], c + 0.4, x[1]],
        [x[0], c + 4.4, x[1]],
        [v[0], c + 4.4, v[1]],
      ],
      Tz,
      [p[0], 0, p[1]],
    );
  }
  for (
    let v = -g;
    v <= g + 0.01;
    v += (2 * g) / Math.max(4, Math.round((2 * g) / 5.4))
  ) {
    let x = b(v, 0.75);
    qe(
      o,
      x[0],
      x[1],
      [
        [0.62, c],
        [0.55, c + 0.4],
        [0.48, c + 0.5],
        [0.42, f - 0.8],
        [0.58, f - 0.4],
        [0.62, f - 0.2],
      ],
      12,
      Rx,
    );
  }
  for (let v of [-g * 0.55, 0, g * 0.55]) {
    let x = b(v, 1.4),
      y = c + 4.6;
    (qe(
      o,
      x[0],
      x[1],
      [
        [2, y],
        [1.85, y + 0.7],
        [1.4, y + 1.35],
        [0.7, y + 1.75],
        [0.01, y + 1.85],
      ],
      16,
      wbt,
    ),
      qe(
        o,
        x[0],
        x[1],
        [
          [2.05, y - 0.25],
          [2.05, y],
          [0.01, y + 0.001],
        ],
        16,
        Rx,
      ));
    let M = b(v, 2.6);
    qe(
      o,
      M[0],
      M[1],
      [
        [0.22, y - 0.6],
        [0.26, y - 0.35],
        [0.22, y - 0.1],
        [0.01, y],
      ],
      8,
      Mbt,
    );
  }
  Qu(t, i, r - 3, h + 2);
}
var kbt = Tn(ln.OFFICE, we.precast, 0.95, 0.95, 0.93),
  zbt = We(we.granite, 0.86, 0.85, 0.82),
  _z = Lt(Ct.gloss, 0.9, 0.9, 0.89);
function _bt(o, t) {
  let { D: e, L: s } = t,
    n = Zu(e, dr.macys);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    [r, l] = Np(s, i),
    c = r,
    h = c + (n.top - n.base),
    f = l + 5.6;
  Ss(o, i, r - 0.6, f, zbt, { vBase: c });
  for (let u of a)
    if (u.L > 6) {
      let d = u.a,
        p = u.b;
      oe(
        o,
        [
          [d[0] + u.n[0] * 0.09, l + 0.6, d[1] + u.n[1] * 0.09],
          [p[0] + u.n[0] * 0.09, l + 0.6, p[1] + u.n[1] * 0.09],
          [p[0] + u.n[0] * 0.09, f - 1.2, p[1] + u.n[1] * 0.09],
          [d[0] + u.n[0] * 0.09, f - 1.2, d[1] + u.n[1] * 0.09],
        ],
        Tz,
        [u.n[0], 0, u.n[1]],
      );
    }
  (Eo(o, a, 0.5, f - 0.3, f + 0.3, _z),
    Ss(o, i, f + 0.3, h - 1.5, kbt, { vBase: c }));
  for (let u of a) {
    if (u.L < 8) continue;
    let d = Math.round(u.L / 6);
    for (let p = 0; p <= d; p++) {
      let m = p / d,
        g = u.a[0] + (u.b[0] - u.a[0]) * m + u.n[0] * 0.3,
        b = u.a[1] + (u.b[1] - u.a[1]) * m + u.n[1] * 0.3;
      cn(o, [g, b], u.u, u.n, 0.35, 0.3, f + 0.3, h - 1.5, _z);
    }
    for (let p = f + 3.3; p < h - 2; p += 3.3 * 2)
      cn(
        o,
        [u.m[0] + u.n[0] * 0.25, u.m[1] + u.n[1] * 0.25],
        u.u,
        u.n,
        u.L / 2,
        0.25,
        p - 0.3,
        p,
        _z,
      );
  }
  (Eo(o, a, 0.6, h - 1.5, h, _z),
    sr(o, i, h, Lt(Ct.stone, 0.55, 0.55, 0.54)),
    Qu(t, i, r - 3, h + 2));
}
var qK = We(we.granite, 0.86, 0.74, 0.7),
  jK = We(we.granite, 0.62, 0.52, 0.5),
  $K = Tn(ln.GLASS, we.stainedglass, 0.4, 0.46, 0.5);
function Ebt(o, t) {
  let { D: e, L: s } = t,
    n = Zu(e, dr.neiman);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    [r, l] = Np(s, i),
    c = r,
    h = c + (n.top - n.base);
  Ss(o, i, r - 0.6, h, qK, { vBase: c });
  for (let v of a)
    if (!(v.L < 8)) {
      oe(
        o,
        [
          [v.a[0] + v.n[0] * 0.09, l + 0.5, v.a[1] + v.n[1] * 0.09],
          [v.b[0] + v.n[0] * 0.09, l + 0.5, v.b[1] + v.n[1] * 0.09],
          [v.b[0] + v.n[0] * 0.09, l + 4.2, v.b[1] + v.n[1] * 0.09],
          [v.a[0] + v.n[0] * 0.09, l + 4.2, v.a[1] + v.n[1] * 0.09],
        ],
        Tz,
        [v.n[0], 0, v.n[1]],
      );
      for (let x = l + 6.5; x < h - 3; x += 3.2)
        for (let y = 1.6 + ((x / 3.2) % 2 ? 1.6 : 0); y < v.L - 1.6; y += 3.2) {
          let M = [
            v.a[0] + v.u[0] * y + v.n[0] * 0.09,
            v.a[1] + v.u[1] * y + v.n[1] * 0.09,
          ];
          oe(
            o,
            [
              [M[0] - v.u[0] * 1.5, x, M[1] - v.u[1] * 1.5],
              [M[0], x - 1.5, M[1]],
              [M[0] + v.u[0] * 1.5, x, M[1] + v.u[1] * 1.5],
              [M[0], x + 1.5, M[1]],
            ],
            jK,
            [v.n[0], 0, v.n[1]],
          );
        }
    }
  (Eo(o, a, 0.4, h - 0.6, h, jK), sr(o, i, h, Lt(Ct.stone, 0.45, 0.42, 0.4)));
  let f = i[0];
  for (let v of i) v[0] - v[1] < f[0] - f[1] && (f = v);
  let [u, d] = i.reduce(
      (v, x) => [v[0] + x[0] / i.length, v[1] + x[1] / i.length],
      [0, 0],
    ),
    p = Math.hypot(u - f[0], d - f[1]),
    m = [f[0] + ((u - f[0]) / p) * 9, f[1] + ((d - f[1]) / p) * 9],
    g = 8.5,
    b = h + 2;
  qe(
    o,
    m[0],
    m[1],
    [
      [g, r],
      [g, b],
    ],
    32,
    $K,
  );
  for (let v = 0; v < 16; v++) {
    let x = (v / 16) * Math.PI * 2;
    Ce(
      o,
      [m[0] + Math.cos(x) * (g + 0.05), r, m[1] + Math.sin(x) * (g + 0.05)],
      [m[0] + Math.cos(x) * (g + 0.05), b, m[1] + Math.sin(x) * (g + 0.05)],
      0.07,
      wL,
      4,
    );
  }
  for (let v = l + 4.5; v < b; v += 5)
    qe(
      o,
      m[0],
      m[1],
      [
        [g + 0.12, v],
        [g + 0.12, v + 0.35],
      ],
      32,
      qK,
    );
  (qe(
    o,
    m[0],
    m[1],
    [
      [g + 0.2, b],
      [g * 0.85, b + 1.6],
      [g * 0.5, b + 2.6],
      [0.01, b + 3],
    ],
    24,
    $K,
  ),
    t.colliders.push({
      t: "circ",
      x: m[0],
      z: m[1],
      r: g,
      y0: r - 2,
      y1: b + 3,
    }),
    Qu(t, i, r - 3, h + 2));
}
var Tbt = We(we.granite, 0.93, 0.92, 0.88),
  XK = We(we.granite, 0.78, 0.77, 0.74);
function Rbt(o, t) {
  let { D: e, L: s } = t,
    n = Zu(e, dr.saks);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    [r, l] = Np(s, i),
    c = r,
    h = c + (n.top - n.base);
  Ss(o, i, r - 0.6, h, Tbt, { vBase: c });
  for (let f of a) {
    if (f.L < 8) continue;
    let u = Math.max(1, Math.round(f.L / 7.5));
    for (let d = 0; d < u; d++) {
      let p = ((d + 0.15) / u) * f.L,
        m = ((d + 0.85) / u) * f.L,
        g = [
          f.a[0] + f.u[0] * p + f.n[0] * 0.09,
          f.a[1] + f.u[1] * p + f.n[1] * 0.09,
        ],
        b = [
          f.a[0] + f.u[0] * m + f.n[0] * 0.09,
          f.a[1] + f.u[1] * m + f.n[1] * 0.09,
        ];
      oe(
        o,
        [
          [g[0], l + 0.5, g[1]],
          [b[0], l + 0.5, b[1]],
          [b[0], l + 4.5, b[1]],
          [g[0], l + 4.5, g[1]],
        ],
        Tz,
        [f.n[0], 0, f.n[1]],
      );
    }
  }
  (Eo(o, a, 0.35, l + 5.2, l + 5.8, XK),
    Eo(o, a, 0.5, h - 1.2, h - 0.4, XK),
    sr(o, i, h, Lt(Ct.stone, 0.5, 0.5, 0.49)),
    Qu(t, i, r - 3, h + 2));
}
var KK = We(we.granite, 0.42, 0.17, 0.1),
  Abt = We(we.granite, 0.2, 0.08, 0.05),
  Pbt = We(we.granite, 0.92, 0.91, 0.88),
  vL = We(we.granite, 0.13, 0.13, 0.13),
  Cbt = We(we.stucco, 0.95, 0.95, 0.93),
  Lbt = We(we.stucco, 0.8, 0.8, 0.78);
