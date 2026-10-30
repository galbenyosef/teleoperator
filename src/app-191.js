// app 191 — colliders
// Lines 108349-108483 of readable/app.pretty.js (statement-aligned).
function Sgt(o, t) {
  for (let e of dK(t.D, t.L)) {
    let s = o.get(e),
      { c: n, u: i, n: a, y: r, hw: l, hl: c } = e,
      h = (S, w, _) => [
        n[0] + i[0] * S + a[0] * w,
        _,
        n[1] + i[1] * S + a[1] * w,
      ],
      f = (e.name.length + (a[0] > 0 ? 1 : 0)) % 2 ? 1 : -1,
      u = [i[0] * f, i[1] * f],
      d = (S, w, _) => h(S * f, w, _),
      p = l - 0.3,
      m = 0.3,
      g = 1.05;
    for (let S of [-1, 1])
      ba(
        s,
        [h(0, S * (l - m / 2), 0)[0], h(0, S * (l - m / 2), 0)[2]],
        i,
        a,
        c,
        m / 2,
        r - 0.05,
        r + g,
        fK,
        { topCol: uK },
      );
    {
      let S = d(c - m / 2, 0, 0);
      ba(s, [S[0], S[2]], i, a, m / 2, p, r - 0.05, r + g, fK, { topCol: uK });
    }
    for (let S of [-1, 1])
      xz(
        s,
        [d(-c, S * (l - m / 2), r + g), d(c, S * (l - m / 2), r + g)],
        0.4,
        _x,
        2.2,
      );
    let b = 16,
      v = -c + 0.2,
      x = c - m;
    for (let S = 0; S < b; S++) {
      let w = v + ((x - v) * S) / b,
        _ = v + ((x - v) * (S + 1)) / b,
        z = Math.max(0.05, 1 - S / (b * 0.75));
      (oe(
        s,
        [
          d(w, -p, r + 0.012),
          d(_, -p, r + 0.012),
          d(_, p, r + 0.012),
          d(w, p, r + 0.012),
        ],
        wgt(z * (S % 2 ? 0.8 : 1)),
        [0, 1, 0],
        (A) => [A[0], A[2]],
      ),
        oe(
          s,
          [
            d(w, -p, r + 0.014),
            d(w + 0.06, -p, r + 0.014),
            d(w + 0.06, p, r + 0.014),
            d(w, p, r + 0.014),
          ],
          Lt(Ct.metal, 0.5 * z + 0.05, 0.5 * z + 0.05, 0.5 * z + 0.05),
          [0, 1, 0],
          (A) => [A[0], A[2]],
        ));
    }
    for (let S of [-1, 1])
      oe(
        s,
        [
          d(v, S * (p - 0.08), r + 0.01),
          d(x, S * (p - 0.08), r + 0.01),
          d(x, S * (p - 0.08), r + g),
          d(v, S * (p - 0.08), r + g),
        ],
        Lt(Ct.stone, 0.2, 0.2, 0.2),
        [-a[0] * S, 0, -a[1] * S],
      );
    xz(s, [d(-c + 0.1, 0, r), d(c - 0.5, 0, r)], 0.9, _x, 3);
    let y = d(-c - 0.6, l + 0.45, 0),
      M = r;
    (ba(s, [y[0], y[2]], i, a, 0.12, 0.12, M, M + 2.3, gK),
      ba(s, [y[0], y[2]], i, a, 0.36, 0.36, M + 2.3, M + 3.05, bK),
      ba(s, [y[0], y[2]], i, a, 0.36, 0.36, M + 3.08, M + 3.6, cL));
    for (let [S, w] of [
      [i, [a[0], a[1]]],
      [
        [-i[0], -i[1]],
        [-a[0], -a[1]],
      ],
      [a, [-i[0], -i[1]]],
      [
        [-a[0], -a[1]],
        [i[0], i[1]],
      ],
    ]) {
      let _ = [y[0] + S[0] * 0.37, y[2] + S[1] * 0.37],
        z = w;
      (lL(
        s,
        "BART",
        [_[0], M + 2.48, _[1]],
        z,
        [S[0], 0, S[1]],
        0.36,
        cL,
        0.06,
      ),
        lL(s, "M", [_[0], M + 3.15, _[1]], z, [S[0], 0, S[1]], 0.4, Mgt, 0.08));
    }
    (t.colliders.push({
      t: "obb",
      x: n[0],
      z: n[1],
      hx: l,
      hz: c,
      c: i[1],
      s: i[0],
      wall: !0,
      y0: r - 2,
      y1: r + 2,
    }),
      t.colliders.push({ t: "circ", x: y[0], z: y[2], r: 0.4 }));
  }
}
var xK = We(we.terracotta, 0.62, 0.3, 0.22),
  kgt = We(we.terracotta, 0.5, 0.25, 0.19),
  aL = We(we.granite, 0.58, 0.56, 0.53),
  Op = We(we.polgranite, 0.6, 0.59, 0.57);
