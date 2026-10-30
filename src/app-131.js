// app 131 — math
// Lines 88807-89028 of readable/app.pretty.js (statement-aligned).
function Dk(o, t, e, s = null, n = !1) {
  let i = e.L,
    a = { ...i.bounds, x0: Math.max(i.bounds.x0, nc.x1) },
    r = Cj();
  (n ? (l, c) => c(l.group) : Aj)(o, (l) => {
    for (let [f, u, d, p] of s || [
      [a.x0 + 150, -5180, 3180, a.z1 - 60],
      [-720, a.x1 - 60, 3120, a.z1 - 60],
    ])
      for (let m = Math.floor(d / 80); m * 80 < p; m++)
        for (let g = Math.floor(f / 120); g * 120 < u; g++) {
          let b = g * 120 + 60,
            v = m * 80 + 80 / 2;
          if (b < f || b > u || v < d || v > p) continue;
          let x = i.coverAt(b, v);
          if (!(x & 8 || (x & 7) === 1 || (x & 7) === 2 || js(g, m, 91) < 0.05))
            for (let y of [0, 1]) {
              let M = m * 80 + (y ? 52 : 6),
                S = M + 22;
              for (let w = g * 120 + 6; w < g * 120 + 120 - 10;) {
                let _ = Math.min(10 + 12 * js(w, M, 3), g * 120 + 120 - 6 - w),
                  z = w + _ / 2,
                  A = (M + S) / 2,
                  T = i.coverAt(z, A);
                if (T & 8 || (T & 7) === 1 || (T & 7) === 2) {
                  w += _;
                  continue;
                }
                let E = Math.min(
                    i.terrainAt(w, M),
                    i.terrainAt(w + _, M),
                    i.terrainAt(w, S),
                    i.terrainAt(w + _, S),
                  ),
                  R = js(w, M, 9) < 0.1 ? 4 + 6 * js(w, M, 10) : 0,
                  P = 7 + 4 * js(w, M, 5) + R;
                (Pj(
                  r.at(w, M),
                  w,
                  w + _,
                  M,
                  S,
                  y ? 1 : -1,
                  (C, I) =>
                    Math.min(
                      i.terrainAt(C, M),
                      i.terrainAt(I, M),
                      i.terrainAt(C, S),
                      i.terrainAt(I, S),
                    ),
                  P,
                  g * 31 + m,
                ),
                  (w += _));
              }
            }
        }
    r.meshes(l, t.mid, "StripHouses");
  });
}
Pn();
function Uk(o, t, e, s, n, i, a, r, l = 0) {
  let c = Math.hypot(s - t, n - e),
    h = (s - t) / c,
    f = (n - e) / c,
    u = -f,
    d = h,
    p = Math.max(1, Math.round(c / 3.4)),
    m = c / p,
    g = l;
  for (let b = 0; b < p; b++) {
    let v = b * m,
      x = v + m / 2,
      y = v + m,
      M = [t + h * v, e + f * v],
      S = [t + h * x + u * 0.75, e + f * x + d * 0.75],
      w = [t + h * y, e + f * y];
    for (let [_, z] of [
      [M, S],
      [S, w],
    ]) {
      let A = Math.hypot(z[0] - _[0], z[1] - _[1]);
      (o.wall(_[0], _[1], z[0], z[1], i, i, a, a, r, g, i), (g += A));
    }
  }
}
function cC(o, t) {
  let e = Hi(11, 16),
    s = Wa(11, 16),
    n = new Be();
  _l(
    n,
    e.x0,
    e.z0,
    e.x1,
    e.z1,
    4,
    (p, m) => $t(p, m) + Ze + 0.03,
    We(we.granite, 0.62, 0.55, 0.52),
  );
  let {
      x0: i,
      x1: a,
      z0: r,
      z1: l,
    } = o.site?.fp || { x0: 1164, x1: 1214, z0: 1298, z1: 1331 },
    c = Math.min($t(i, r), $t(a, r), $t(i, l), $t(a, l)) - 1,
    h = Math.max($t(i, r), $t(a, r), $t(i, l), $t(a, l)) + Ze,
    f = Tn(ln.BAYS, we.polgranite, 0.17, 0.09, 0.08),
    u = [i, i + (a - i) * 0.36, i + (a - i) * 0.72, a],
    d = [226, 237, 218];
  for (let p = 0; p < 3; p++) {
    let m = u[p],
      g = u[p + 1],
      b = h + d[p];
    (Uk(n, g, r, m, r, c, b, f), Uk(n, m, l, g, l, c, b, f));
    let v = p === 0 ? c : h + d[p - 1],
      x = p === 2 ? c : h + d[p + 1];
    (v < b && Uk(n, m, r, m, l, Math.max(v, c), b, f),
      x < b && Uk(n, g, l, g, r, Math.max(x, c), b, f),
      n.quad(
        [m, b, l],
        [g, b, l],
        [g, b, r],
        [m, b, r],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        Lt(Ct.stone, 0.12, 0.08, 0.07),
        [0, 1, 0],
      ),
      ss(
        n,
        m + 4,
        b,
        r + 6,
        g - 4,
        b + 4.5,
        l - 6,
        Lt(Ct.stone, 0.15, 0.1, 0.09),
      ),
      p === 1 &&
        ss(
          n,
          (m + g) / 2 - 0.4,
          b + 4.5,
          (r + l) / 2 - 0.4,
          (m + g) / 2 + 0.4,
          b + 5.2,
          (r + l) / 2 + 0.4,
          wn(1, 0.05, 0.02),
        ));
  }
  (Ss(
    n,
    [
      [i + 1.5, r + 1.5],
      [a - 1.5, r + 1.5],
      [a - 1.5, l - 1.5],
      [i + 1.5, l - 1.5],
    ],
    c,
    h + 0.2,
    Lt(Ct.stone, 0.2, 0.12, 0.1),
  ),
    o.colliders.push({
      t: "box",
      x0: i - 0.8,
      z0: r - 0.8,
      x1: a + 0.8,
      z1: l + 0.8,
    }));
  {
    let p = a + 10,
      m = e.x1 - 3,
      g = e.z1 - 32,
      b = e.z1 - 3,
      v = Math.max($t(p, b), $t(m, b)) + Ze;
    (Ss(
      n,
      [
        [p, g],
        [m, g],
        [m, b],
        [p, b],
      ],
      c,
      v + 11,
      Tn(ln.BAYS, we.polgranite, 0.26, 0.15, 0.12),
      { vBase: v, cap: !0, capCol: Lt(Ct.stone, 0.12, 0.09, 0.08) },
    ),
      o.colliders.push({ t: "box", x0: p, z0: g, x1: m, z1: b }));
  }
  {
    let p = (i + a) / 2 + 12,
      m = e.z0 + 12,
      g = $t(p, m) + Ze;
    (qe(
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
      Lt(Ct.gloss, 0.02, 0.02, 0.022),
      {
        rf: (b, v) =>
          b * (1 + 0.25 * Math.sin(v * 2 + 0.7) + 0.1 * Math.cos(v * 5)),
      },
    ),
      o.colliders.push({ t: "circ", x: p, z: m, r: 2.7 }));
  }
  (xf(o, s), vn(o.group, n, t.lm, "California555"));
}
Pn();
