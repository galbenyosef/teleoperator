// app 204 — granite
// Lines 111398-111733 of readable/app.pretty.js (statement-aligned).
var U$ = yn(sn.WIN, be.granite, 0.58, 0.53, 0.46),
  GP = Be(be.granite, 0.5, 0.46, 0.4),
  Wb = Be(be.granite, 0.66, 0.61, 0.53),
  J1t = It(Lt.gloss, 0.5, 0.06, 0.05),
  Tk = It(Lt.glass, 0.05, 0.06, 0.07),
  Z1t = bn(1, 0.85, 0.6);
function Q1t(i, t) {
  let { D: e, L: s } = t,
    n = bu(e, Ja.westin);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    [r, l] = ap(s, o),
    c = r,
    h = c + (n.top - n.base),
    f = c + 8.4;
  ys(i, o, r - 0.6, f, GP, { vBase: c });
  for (let x = c + 0.6; x < f - 0.4; x += 0.62) vo(i, a, 0.06, x, x + 0.44, GP);
  (vo(i, a, 0.45, f - 0.2, f + 0.5, Wb),
    ys(i, o, f + 0.5, h - 4.5, U$, { vBase: c + 0.6 }),
    vo(i, a, 0.3, h - 8.2, h - 7.7, Wb),
    vo(i, a, 1.1, h - 4.5, h - 3.6, Wb),
    vo(i, a, 0.6, h - 3.6, h - 3.2, GP),
    ys(i, o, h - 3.6, h, U$, { vBase: c + 0.6 }),
    vo(i, a, 0.35, h - 0.3, h + 0.1, Wb),
    Ua(i, o, h, It(Lt.stone, 0.3, 0.3, 0.29)));
  let u = hm(s, a, "Powell Street"),
    d = u.u,
    p = u.n,
    m = u.m,
    g = u.L / 2 - 1.5,
    b = (x, v) => [m[0] + d[0] * x + p[0] * v, m[1] + d[1] * x + p[1] * v];
  {
    let x = b(-g, 0.12),
      v = b(g, 0.12);
    ne(
      i,
      [
        [x[0], c + 0.4, x[1]],
        [v[0], c + 0.4, v[1]],
        [v[0], c + 4.4, v[1]],
        [x[0], c + 4.4, x[1]],
      ],
      Tk,
      [p[0], 0, p[1]],
    );
  }
  for (
    let x = -g;
    x <= g + 0.01;
    x += (2 * g) / Math.max(4, Math.round((2 * g) / 5.4))
  ) {
    let v = b(x, 0.75);
    Oe(
      i,
      v[0],
      v[1],
      [
        [0.62, c],
        [0.55, c + 0.4],
        [0.48, c + 0.5],
        [0.42, f - 0.8],
        [0.58, f - 0.4],
        [0.62, f - 0.2],
      ],
      12,
      Wb,
    );
  }
  for (let x of [-g * 0.55, 0, g * 0.55]) {
    let v = b(x, 1.4),
      y = c + 4.6;
    (Oe(
      i,
      v[0],
      v[1],
      [
        [2, y],
        [1.85, y + 0.7],
        [1.4, y + 1.35],
        [0.7, y + 1.75],
        [0.01, y + 1.85],
      ],
      16,
      J1t,
    ),
      Oe(
        i,
        v[0],
        v[1],
        [
          [2.05, y - 0.25],
          [2.05, y],
          [0.01, y + 0.001],
        ],
        16,
        Wb,
      ));
    let M = b(x, 2.6);
    Oe(
      i,
      M[0],
      M[1],
      [
        [0.22, y - 0.6],
        [0.26, y - 0.35],
        [0.22, y - 0.1],
        [0.01, y],
      ],
      8,
      Z1t,
    );
  }
  xu(t, o, r - 3, h + 2);
}
var tmt = yn(sn.OFFICE, be.precast, 0.95, 0.95, 0.93),
  emt = Be(be.granite, 0.86, 0.85, 0.82),
  zk = It(Lt.gloss, 0.9, 0.9, 0.89);
function smt(i, t) {
  let { D: e, L: s } = t,
    n = bu(e, Ja.macys);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    [r, l] = ap(s, o),
    c = r,
    h = c + (n.top - n.base),
    f = l + 5.6;
  ys(i, o, r - 0.6, f, emt, { vBase: c });
  for (let u of a)
    if (u.L > 6) {
      let d = u.a,
        p = u.b;
      ne(
        i,
        [
          [d[0] + u.n[0] * 0.09, l + 0.6, d[1] + u.n[1] * 0.09],
          [p[0] + u.n[0] * 0.09, l + 0.6, p[1] + u.n[1] * 0.09],
          [p[0] + u.n[0] * 0.09, f - 1.2, p[1] + u.n[1] * 0.09],
          [d[0] + u.n[0] * 0.09, f - 1.2, d[1] + u.n[1] * 0.09],
        ],
        Tk,
        [u.n[0], 0, u.n[1]],
      );
    }
  (vo(i, a, 0.5, f - 0.3, f + 0.3, zk),
    ys(i, o, f + 0.3, h - 1.5, tmt, { vBase: c }));
  for (let u of a) {
    if (u.L < 8) continue;
    let d = Math.round(u.L / 6);
    for (let p = 0; p <= d; p++) {
      let m = p / d,
        g = u.a[0] + (u.b[0] - u.a[0]) * m + u.n[0] * 0.3,
        b = u.a[1] + (u.b[1] - u.a[1]) * m + u.n[1] * 0.3;
      nn(i, [g, b], u.u, u.n, 0.35, 0.3, f + 0.3, h - 1.5, zk);
    }
    for (let p = f + 3.3; p < h - 2; p += 3.3 * 2)
      nn(
        i,
        [u.m[0] + u.n[0] * 0.25, u.m[1] + u.n[1] * 0.25],
        u.u,
        u.n,
        u.L / 2,
        0.25,
        p - 0.3,
        p,
        zk,
      );
  }
  (vo(i, a, 0.6, h - 1.5, h, zk),
    Ua(i, o, h, It(Lt.stone, 0.55, 0.55, 0.54)),
    xu(t, o, r - 3, h + 2));
}
var G$ = Be(be.granite, 0.86, 0.74, 0.7),
  W$ = Be(be.granite, 0.62, 0.52, 0.5),
  q$ = yn(sn.GLASS, be.stainedglass, 0.4, 0.46, 0.5);
function nmt(i, t) {
  let { D: e, L: s } = t,
    n = bu(e, Ja.neiman);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    [r, l] = ap(s, o),
    c = r,
    h = c + (n.top - n.base);
  ys(i, o, r - 0.6, h, G$, { vBase: c });
  for (let x of a)
    if (!(x.L < 8)) {
      ne(
        i,
        [
          [x.a[0] + x.n[0] * 0.09, l + 0.5, x.a[1] + x.n[1] * 0.09],
          [x.b[0] + x.n[0] * 0.09, l + 0.5, x.b[1] + x.n[1] * 0.09],
          [x.b[0] + x.n[0] * 0.09, l + 4.2, x.b[1] + x.n[1] * 0.09],
          [x.a[0] + x.n[0] * 0.09, l + 4.2, x.a[1] + x.n[1] * 0.09],
        ],
        Tk,
        [x.n[0], 0, x.n[1]],
      );
      for (let v = l + 6.5; v < h - 3; v += 3.2)
        for (let y = 1.6 + ((v / 3.2) % 2 ? 1.6 : 0); y < x.L - 1.6; y += 3.2) {
          let M = [
            x.a[0] + x.u[0] * y + x.n[0] * 0.09,
            x.a[1] + x.u[1] * y + x.n[1] * 0.09,
          ];
          ne(
            i,
            [
              [M[0] - x.u[0] * 1.5, v, M[1] - x.u[1] * 1.5],
              [M[0], v - 1.5, M[1]],
              [M[0] + x.u[0] * 1.5, v, M[1] + x.u[1] * 1.5],
              [M[0], v + 1.5, M[1]],
            ],
            W$,
            [x.n[0], 0, x.n[1]],
          );
        }
    }
  (vo(i, a, 0.4, h - 0.6, h, W$), Ua(i, o, h, It(Lt.stone, 0.45, 0.42, 0.4)));
  let f = o[0];
  for (let x of o) x[0] - x[1] < f[0] - f[1] && (f = x);
  let [u, d] = o.reduce(
      (x, v) => [x[0] + v[0] / o.length, x[1] + v[1] / o.length],
      [0, 0],
    ),
    p = Math.hypot(u - f[0], d - f[1]),
    m = [f[0] + ((u - f[0]) / p) * 9, f[1] + ((d - f[1]) / p) * 9],
    g = 8.5,
    b = h + 2;
  Oe(
    i,
    m[0],
    m[1],
    [
      [g, r],
      [g, b],
    ],
    32,
    q$,
  );
  for (let x = 0; x < 16; x++) {
    let v = (x / 16) * Math.PI * 2;
    Ae(
      i,
      [m[0] + Math.cos(v) * (g + 0.05), r, m[1] + Math.sin(v) * (g + 0.05)],
      [m[0] + Math.cos(v) * (g + 0.05), b, m[1] + Math.sin(v) * (g + 0.05)],
      0.07,
      jP,
      4,
    );
  }
  for (let x = l + 4.5; x < b; x += 5)
    Oe(
      i,
      m[0],
      m[1],
      [
        [g + 0.12, x],
        [g + 0.12, x + 0.35],
      ],
      32,
      G$,
    );
  (Oe(
    i,
    m[0],
    m[1],
    [
      [g + 0.2, b],
      [g * 0.85, b + 1.6],
      [g * 0.5, b + 2.6],
      [0.01, b + 3],
    ],
    24,
    q$,
  ),
    t.colliders.push({
      t: "circ",
      x: m[0],
      z: m[1],
      r: g,
      y0: r - 2,
      y1: b + 3,
    }),
    xu(t, o, r - 3, h + 2));
}
var imt = Be(be.granite, 0.93, 0.92, 0.88),
  j$ = Be(be.granite, 0.78, 0.77, 0.74);
function omt(i, t) {
  let { D: e, L: s } = t,
    n = bu(e, Ja.saks);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    [r, l] = ap(s, o),
    c = r,
    h = c + (n.top - n.base);
  ys(i, o, r - 0.6, h, imt, { vBase: c });
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
      ne(
        i,
        [
          [g[0], l + 0.5, g[1]],
          [b[0], l + 0.5, b[1]],
          [b[0], l + 4.5, b[1]],
          [g[0], l + 4.5, g[1]],
        ],
        Tk,
        [f.n[0], 0, f.n[1]],
      );
    }
  }
  (vo(i, a, 0.35, l + 5.2, l + 5.8, j$),
    vo(i, a, 0.5, h - 1.2, h - 0.4, j$),
    Ua(i, o, h, It(Lt.stone, 0.5, 0.5, 0.49)),
    xu(t, o, r - 3, h + 2));
}
var V$ = Be(be.granite, 0.42, 0.17, 0.1),
  amt = Be(be.granite, 0.2, 0.08, 0.05),
  rmt = Be(be.granite, 0.92, 0.91, 0.88),
  WP = Be(be.granite, 0.13, 0.13, 0.13),
  lmt = Be(be.stucco, 0.95, 0.95, 0.93),
  cmt = Be(be.stucco, 0.8, 0.8, 0.78);
