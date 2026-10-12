// app 192 — colliders
// Lines 108093-108227 of readable/app.pretty.js (statement-aligned).
function Qpt(i, t) {
  for (let e of h$(t.D, t.L)) {
    let s = i.get(e),
      { c: n, u: o, n: a, y: r, hw: l, hl: c } = e,
      h = (S, w, z) => [
        n[0] + o[0] * S + a[0] * w,
        z,
        n[1] + o[1] * S + a[1] * w,
      ],
      f = (e.name.length + (a[0] > 0 ? 1 : 0)) % 2 ? 1 : -1,
      u = [o[0] * f, o[1] * f],
      d = (S, w, z) => h(S * f, w, z),
      p = l - 0.3,
      m = 0.3,
      g = 1.05;
    for (let S of [-1, 1])
      ra(
        s,
        [h(0, S * (l - m / 2), 0)[0], h(0, S * (l - m / 2), 0)[2]],
        o,
        a,
        c,
        m / 2,
        r - 0.05,
        r + g,
        l$,
        { topCol: c$ },
      );
    {
      let S = d(c - m / 2, 0, 0);
      ra(s, [S[0], S[2]], o, a, m / 2, p, r - 0.05, r + g, l$, { topCol: c$ });
    }
    for (let S of [-1, 1])
      xk(
        s,
        [d(-c, S * (l - m / 2), r + g), d(c, S * (l - m / 2), r + g)],
        0.4,
        Db,
        2.2,
      );
    let b = 16,
      x = -c + 0.2,
      v = c - m;
    for (let S = 0; S < b; S++) {
      let w = x + ((v - x) * S) / b,
        z = x + ((v - x) * (S + 1)) / b,
        _ = Math.max(0.05, 1 - S / (b * 0.75));
      (ne(
        s,
        [
          d(w, -p, r + 0.012),
          d(z, -p, r + 0.012),
          d(z, p, r + 0.012),
          d(w, p, r + 0.012),
        ],
        Jpt(_ * (S % 2 ? 0.8 : 1)),
        [0, 1, 0],
        (R) => [R[0], R[2]],
      ),
        ne(
          s,
          [
            d(w, -p, r + 0.014),
            d(w + 0.06, -p, r + 0.014),
            d(w + 0.06, p, r + 0.014),
            d(w, p, r + 0.014),
          ],
          It(Lt.metal, 0.5 * _ + 0.05, 0.5 * _ + 0.05, 0.5 * _ + 0.05),
          [0, 1, 0],
          (R) => [R[0], R[2]],
        ));
    }
    for (let S of [-1, 1])
      ne(
        s,
        [
          d(x, S * (p - 0.08), r + 0.01),
          d(v, S * (p - 0.08), r + 0.01),
          d(v, S * (p - 0.08), r + g),
          d(x, S * (p - 0.08), r + g),
        ],
        It(Lt.stone, 0.2, 0.2, 0.2),
        [-a[0] * S, 0, -a[1] * S],
      );
    xk(s, [d(-c + 0.1, 0, r), d(c - 0.5, 0, r)], 0.9, Db, 3);
    let y = d(-c - 0.6, l + 0.45, 0),
      M = r;
    (ra(s, [y[0], y[2]], o, a, 0.12, 0.12, M, M + 2.3, d$),
      ra(s, [y[0], y[2]], o, a, 0.36, 0.36, M + 2.3, M + 3.05, p$),
      ra(s, [y[0], y[2]], o, a, 0.36, 0.36, M + 3.08, M + 3.6, LP));
    for (let [S, w] of [
      [o, [a[0], a[1]]],
      [
        [-o[0], -o[1]],
        [-a[0], -a[1]],
      ],
      [a, [-o[0], -o[1]]],
      [
        [-a[0], -a[1]],
        [o[0], o[1]],
      ],
    ]) {
      let z = [y[0] + S[0] * 0.37, y[2] + S[1] * 0.37],
        _ = w;
      (CP(
        s,
        "BART",
        [z[0], M + 2.48, z[1]],
        _,
        [S[0], 0, S[1]],
        0.36,
        LP,
        0.06,
      ),
        CP(s, "M", [z[0], M + 3.15, z[1]], _, [S[0], 0, S[1]], 0.4, Zpt, 0.08));
    }
    (t.colliders.push({
      t: "obb",
      x: n[0],
      z: n[1],
      hx: l,
      hz: c,
      c: o[1],
      s: o[0],
      wall: !0,
      y0: r - 2,
      y1: r + 2,
    }),
      t.colliders.push({ t: "circ", x: y[0], z: y[2], r: 0.4 }));
  }
}
var m$ = Be(be.terracotta, 0.62, 0.3, 0.22),
  t1t = Be(be.terracotta, 0.5, 0.25, 0.19),
  RP = Be(be.granite, 0.58, 0.56, 0.53),
  ip = Be(be.polgranite, 0.6, 0.59, 0.57);
