// app 238 — pts
// Lines 122811-123121 of readable/app.pretty.js (statement-aligned).
function _C(i) {
  let t = i.find((h) => h.order === 0);
  if (!t || t.pts.length < 10 || Math.abs(t.pts[1]) > 0.6) return i;
  let e = t.pts,
    s = e[3],
    n = e[0],
    o = e[1],
    a = e[2],
    r = Math.min(e[4], 0.6),
    l = {
      order: 0,
      pts: Float32Array.from([
        n,
        o - 0.8,
        a,
        s * 1.08,
        r * 0.75,
        ...e.subarray(0, 4),
        Math.min(e[4], r * 0.85),
        ...e.subarray(5),
      ]),
    },
    c = i.map((h) => (h === t ? l : h));
  for (let h = 0; h < 5; h++) {
    let f = h * 1.2566 + 0.4 + 0.3 * Math.sin(h * 7.1),
      u = Math.cos(f),
      d = Math.sin(f),
      p = 1.75 + 0.35 * Math.sin(h * 3.7);
    c.push({
      order: 1,
      pts: Float32Array.from([
        n + u * s * 0.4,
        o + s * 1.1 + 0.1,
        a + d * s * 0.4,
        s * 0.42,
        r * 0.9,
        n + u * s * 1.05,
        o + s * 0.3,
        a + d * s * 1.05,
        s * 0.3,
        r * 0.75,
        n + u * s * p,
        o - 0.3,
        a + d * s * p,
        s * 0.1,
        r * 0.6,
      ]),
    });
  }
  return c;
}
function P2t(
  i,
  t,
  e,
  { orders: s = 2, sides: n = [9, 6, 4], minR: o = 0 } = {},
) {
  let a = e.barkTint || [1, 1, 1],
    r = _C(
      t.map((c) => ({
        b: c,
        order: c.order,
        pts: Float32Array.from(
          c.pts.flatMap((h, f) => [h.x, h.y, h.z, c.rad[f], 1]),
        ),
      })),
    ).map((c) =>
      c.b && c.pts.length === c.b.pts.length * 5
        ? c.b
        : {
            order: c.order,
            pts: Array.from({ length: c.pts.length / 5 }, (h, f) =>
              Vs(c.pts[f * 5], c.pts[f * 5 + 1], c.pts[f * 5 + 2]),
            ),
            rad: Array.from(
              { length: c.pts.length / 5 },
              (h, f) => c.pts[f * 5 + 3],
            ),
          },
    );
  for (let c of r)
    c.order > s ||
      c.rad[0] < o ||
      ku(i, c.pts, c.rad, n[c.order], {
        texW: c.order ? 0.6 : 1,
        texH: c.order ? 0.8 : 1.3,
        ao: (h) => {
          let f = c.pts[h].y;
          return c.order === 0 || c.pts[c.pts.length - 1].y < 0
            ? 0.55 + 0.45 * ul(0, 1.6, f)
            : 0.62 + 0.2 * (h / (c.pts.length - 1));
        },
      });
  let l = i.c;
  for (let c = 0; c < l.length; c += 4)
    ((l[c] *= a[0]), (l[c + 1] *= a[1]), (l[c + 2] *= a[2]));
}
function iK(i, t = 1) {
  let e = E2t[i],
    { br: s, cards: n, masses: o, E: a } = A2t(e, t),
    r = [],
    l = [
      {
        sides: [10, 6, 4],
        orders: 2,
        keep: 1,
        scale: 1,
        inner: e.inner0 ?? 0.5,
      },
      {
        sides: [7, 4, 3],
        orders: 1,
        keep: 0.3,
        scale: 1.5,
        inner: 1,
        clump: 0.5,
        cs: 0.85,
      },
      { sides: [5, 3, 3], orders: 0, keep: 0, inner: 0.5, clump: 1, cs: 1 },
    ];
  ["plane", "elm", "ficus"].includes(i) ||
    ((l[1] = { ...l[1], keep: 0.3, scale: 1.6, clump: 0 }),
    (l[2] = { ...l[2], keep: 0.05, scale: 3.3, clump: 0 }));
  for (let [c, h] of l.entries()) {
    let f = new la(),
      u = new la(),
      d = new la(),
      p = $c(t * 7 + c);
    (P2t(f, s, e, h),
      h.keep > 0 && R2t(u, n, a, e, p, h),
      QX(d, o.inner, a, e, p, { keep: h.inner, dark: 0.8 }),
      h.clump && QX(d, o.clump, a, e, p, { keep: h.clump, scale: h.cs }));
    let m = [
      { mat: e.bark, geo: f.geo() },
      { mat: "leafmass", geo: d.geo() },
    ];
    (u.count && m.push({ mat: "leaf", geo: u.geo() }), r.push(m));
  }
  return r;
}
var um = {
    canary: [0, 0, 0.25, 1],
    queen: [0.25, 0, 0.25, 1],
    fan: [0.5, 0, 0.25, 0.25],
    windmill: [0.75, 0, 0.25, 0.25],
    cordy: [0.5, 0.25, 0.25, 0.25],
    dead: [0.75, 0.25, 0.25, 0.25],
  },
  zC = (i, t) => t >= 1 || Math.floor((i + 1) * t) > Math.floor(i * t);
function Vk(
  i,
  {
    S: t,
    hd: e,
    el: s,
    bend: n,
    L: o,
    W: a,
    seg: r,
    fold: l = 0.42,
    twist: c = 0,
    C: h,
    uv: f,
    ao: u = () => 1,
    dead: d = !1,
    plume: p = !1,
    base: m = 0.12,
  },
) {
  let g = e.clone().cross(oi).normalize(),
    b = [],
    x = [],
    v = t.clone();
  for (let y = 0; y <= r; y++) {
    let M = y / r,
      S = s - n * Math.pow(M, 1.5),
      w = e
        .clone()
        .multiplyScalar(Math.cos(S))
        .addScaledVector(oi, Math.sin(S));
    if (y) {
      let N = (y - 0.5) / r,
        B = s - n * Math.pow(N, 1.5);
      v = v
        .clone()
        .addScaledVector(
          e
            .clone()
            .multiplyScalar(Math.cos(B))
            .addScaledVector(oi, Math.sin(B)),
          o / r,
        );
    }
    let z = g.clone().applyAxisAngle(w, c * M),
      _ = z.clone().cross(w).normalize();
    _.y < 0 && Math.abs(S) < 1.2 && _.negate();
    let R = a * (M < m ? 0.3 + (0.7 * M) / m : 1),
      T = R * l * 0.5 * (1 - 0.6 * M),
      E = v.clone().sub(h).normalize(),
      A = _.clone()
        .multiplyScalar(_.y < 0 ? -0.2 : 0.2)
        .addScaledVector(E, 0.9)
        .addScaledVector(oi, 0.45)
        .normalize(),
      C = u(M),
      P = d ? 0.02 : 0.3 + 0.7 * M,
      I = [C, C, C, P],
      L = f[1] + f[3] * (1 - M * 0.995),
      F = (N) => f[0] + f[2] * (0.02 + 0.96 * N);
    (b.push([
      i.v(
        v
          .clone()
          .addScaledVector(z, -R / 2)
          .addScaledVector(_, T),
        A.clone().addScaledVector(z, -0.25).normalize(),
        F(0),
        L,
        I,
      ),
      i.v(v, A, F(0.5), L, I),
      i.v(
        v
          .clone()
          .addScaledVector(z, R / 2)
          .addScaledVector(_, T),
        A.clone().addScaledVector(z, 0.25).normalize(),
        F(1),
        L,
        I,
      ),
    ]),
      p &&
        x.push([
          i.v(v.clone().addScaledVector(_, -R * 0.38), A, F(0.1), L, I),
          i.v(v.clone().addScaledVector(_, R * 0.3), A, F(0.9), L, I),
        ]));
  }
  for (let y = 0; y < r; y++) {
    let M = b[y],
      S = b[y + 1];
    if ((i.q(M[0], M[1], S[1], S[0]), i.q(M[1], M[2], S[2], S[1]), p)) {
      let w = x[y],
        z = x[y + 1];
      i.q(w[0], w[1], z[1], z[0]);
    }
  }
}
function SC(
  i,
  {
    S: t,
    Fu: e,
    Fx: s,
    len: n,
    wid: o,
    uv: a,
    C: r,
    nu: l = 4,
    nx: c = 4,
    sag: h = 0.2,
    cup: f = 0.15,
    droop: u = 0,
    pleat: d = 0,
    ao: p = () => 1,
    tr: m = 0.6,
  },
) {
  let g = s.clone().cross(e).normalize(),
    b = [];
  for (let x = 0; x <= l; x++) {
    let v = x / l,
      y = [];
    for (let M = 0; M <= c; M++) {
      let S = M / c - 0.5,
        w = Math.max(0, Math.hypot(S * 2, (v - 0.55) * 2.2) - 0.35),
        z = d ? (M % 2 ? 1 : -1) * d * n * v : 0,
        _ = t
          .clone()
          .addScaledVector(e, v * n)
          .addScaledVector(s, S * o)
          .addScaledVector(g, z - f * n * 4 * S * S * v)
          .addScaledVector(oi, -h * n * v * v - u * n * w * w),
        R = g
          .clone()
          .multiplyScalar(g.y < 0 ? -0.45 : 0.45)
          .addScaledVector(s, d ? (M % 2 ? 0.3 : -0.3) : 0)
          .addScaledVector(_.clone().sub(r).normalize(), 0.9)
          .addScaledVector(oi, 0.35)
          .normalize(),
        T = p(v);
      y.push(
        i.v(
          _,
          R,
          a[0] + a[2] * (0.5 + S * 0.99),
          a[1] + a[3] * (0.996 - v * 0.99),
          [T, T, T, m * (0.4 + 0.6 * v)],
        ),
      );
    }
    b.push(y);
  }
  for (let x = 0; x < l; x++)
    for (let v = 0; v < c; v++)
      i.q(b[x][v], b[x + 1][v], b[x + 1][v + 1], b[x][v + 1]);
}
var sw = (i, t, e = 0) => {
  for (let s = e * 4; s < i.c.length; s += 4)
    ((i.c[s] *= t[0]), (i.c[s + 1] *= t[1]), (i.c[s + 2] *= t[2]));
};
