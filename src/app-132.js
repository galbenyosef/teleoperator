// app 132 — math
// Lines 88539-88760 of readable/app.pretty.js (statement-aligned).
function DS(i, t, e, s = null, n = !1) {
  let o = e.L,
    a = { ...o.bounds, x0: Math.max(o.bounds.x0, el.x1) },
    r = Rq();
  (n ? (l, c) => c(l.group) : Tq)(i, (l) => {
    for (let [f, u, d, p] of s || [
      [a.x0 + 150, -5180, 3180, a.z1 - 60],
      [-720, a.x1 - 60, 3120, a.z1 - 60],
    ])
      for (let m = Math.floor(d / 80); m * 80 < p; m++)
        for (let g = Math.floor(f / 120); g * 120 < u; g++) {
          let b = g * 120 + 60,
            x = m * 80 + 80 / 2;
          if (b < f || b > u || x < d || x > p) continue;
          let v = o.coverAt(b, x);
          if (!(v & 8 || (v & 7) === 1 || (v & 7) === 2 || Ws(g, m, 91) < 0.05))
            for (let y of [0, 1]) {
              let M = m * 80 + (y ? 52 : 6),
                S = M + 22;
              for (let w = g * 120 + 6; w < g * 120 + 120 - 10;) {
                let z = Math.min(10 + 12 * Ws(w, M, 3), g * 120 + 120 - 6 - w),
                  _ = w + z / 2,
                  R = (M + S) / 2,
                  T = o.coverAt(_, R);
                if (T & 8 || (T & 7) === 1 || (T & 7) === 2) {
                  w += z;
                  continue;
                }
                let E = Math.min(
                    o.terrainAt(w, M),
                    o.terrainAt(w + z, M),
                    o.terrainAt(w, S),
                    o.terrainAt(w + z, S),
                  ),
                  A = Ws(w, M, 9) < 0.1 ? 4 + 6 * Ws(w, M, 10) : 0,
                  C = 7 + 4 * Ws(w, M, 5) + A;
                (Aq(
                  r.at(w, M),
                  w,
                  w + z,
                  M,
                  S,
                  y ? 1 : -1,
                  (P, I) =>
                    Math.min(
                      o.terrainAt(P, M),
                      o.terrainAt(I, M),
                      o.terrainAt(P, S),
                      o.terrainAt(I, S),
                    ),
                  C,
                  g * 31 + m,
                ),
                  (w += z));
              }
            }
        }
    r.meshes(l, t.mid, "StripHouses");
  });
}
En();
function US(i, t, e, s, n, o, a, r, l = 0) {
  let c = Math.hypot(s - t, n - e),
    h = (s - t) / c,
    f = (n - e) / c,
    u = -f,
    d = h,
    p = Math.max(1, Math.round(c / 3.4)),
    m = c / p,
    g = l;
  for (let b = 0; b < p; b++) {
    let x = b * m,
      v = x + m / 2,
      y = x + m,
      M = [t + h * x, e + f * x],
      S = [t + h * v + u * 0.75, e + f * v + d * 0.75],
      w = [t + h * y, e + f * y];
    for (let [z, _] of [
      [M, S],
      [S, w],
    ]) {
      let R = Math.hypot(_[0] - z[0], _[1] - z[1]);
      (i.wall(z[0], z[1], _[0], _[1], o, o, a, a, r, g, o), (g += R));
    }
  }
}
function C7(i, t) {
  let e = Ei(11, 16),
    s = Ca(11, 16),
    n = new Ce();
  il(
    n,
    e.x0,
    e.z0,
    e.x1,
    e.z1,
    4,
    (p, m) => Yt(p, m) + Ke + 0.03,
    Be(be.granite, 0.62, 0.55, 0.52),
  );
  let {
      x0: o,
      x1: a,
      z0: r,
      z1: l,
    } = i.site?.fp || { x0: 1164, x1: 1214, z0: 1298, z1: 1331 },
    c = Math.min(Yt(o, r), Yt(a, r), Yt(o, l), Yt(a, l)) - 1,
    h = Math.max(Yt(o, r), Yt(a, r), Yt(o, l), Yt(a, l)) + Ke,
    f = yn(sn.BAYS, be.polgranite, 0.17, 0.09, 0.08),
    u = [o, o + (a - o) * 0.36, o + (a - o) * 0.72, a],
    d = [226, 237, 218];
  for (let p = 0; p < 3; p++) {
    let m = u[p],
      g = u[p + 1],
      b = h + d[p];
    (US(n, g, r, m, r, c, b, f), US(n, m, l, g, l, c, b, f));
    let x = p === 0 ? c : h + d[p - 1],
      v = p === 2 ? c : h + d[p + 1];
    (x < b && US(n, m, r, m, l, Math.max(x, c), b, f),
      v < b && US(n, g, l, g, r, Math.max(v, c), b, f),
      n.quad(
        [m, b, l],
        [g, b, l],
        [g, b, r],
        [m, b, r],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        It(Lt.stone, 0.12, 0.08, 0.07),
        [0, 1, 0],
      ),
      Ze(
        n,
        m + 4,
        b,
        r + 6,
        g - 4,
        b + 4.5,
        l - 6,
        It(Lt.stone, 0.15, 0.1, 0.09),
      ),
      p === 1 &&
        Ze(
          n,
          (m + g) / 2 - 0.4,
          b + 4.5,
          (r + l) / 2 - 0.4,
          (m + g) / 2 + 0.4,
          b + 5.2,
          (r + l) / 2 + 0.4,
          bn(1, 0.05, 0.02),
        ));
  }
  (ys(
    n,
    [
      [o + 1.5, r + 1.5],
      [a - 1.5, r + 1.5],
      [a - 1.5, l - 1.5],
      [o + 1.5, l - 1.5],
    ],
    c,
    h + 0.2,
    It(Lt.stone, 0.2, 0.12, 0.1),
  ),
    i.colliders.push({
      t: "box",
      x0: o - 0.8,
      z0: r - 0.8,
      x1: a + 0.8,
      z1: l + 0.8,
    }));
  {
    let p = a + 10,
      m = e.x1 - 3,
      g = e.z1 - 32,
      b = e.z1 - 3,
      x = Math.max(Yt(p, b), Yt(m, b)) + Ke;
    (ys(
      n,
      [
        [p, g],
        [m, g],
        [m, b],
        [p, b],
      ],
      c,
      x + 11,
      yn(sn.BAYS, be.polgranite, 0.26, 0.15, 0.12),
      { vBase: x, cap: !0, capCol: It(Lt.stone, 0.12, 0.09, 0.08) },
    ),
      i.colliders.push({ t: "box", x0: p, z0: g, x1: m, z1: b }));
  }
  {
    let p = (o + a) / 2 + 12,
      m = e.z0 + 12,
      g = Yt(p, m) + Ke;
    (Oe(
      n,
      p,
      m,
      [
        [0.01, g],
        [2.2, g + 0.2],
        [2.6, g + 1.4],
        [2, g + 2.9],
        [0.9, g + 3.5],
        [0.01, g + 3.6],
      ],
      14,
      It(Lt.gloss, 0.02, 0.02, 0.022),
      {
        rf: (b, x) =>
          b * (1 + 0.25 * Math.sin(x * 2 + 0.7) + 0.1 * Math.cos(x * 5)),
      },
    ),
      i.colliders.push({ t: "circ", x: p, z: m, r: 2.7 }));
  }
  (Gh(i, s), gn(i.group, n, t.lm, "California555"));
}
En();
