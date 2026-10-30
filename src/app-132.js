// app 132 — math
// Lines 89029-89193 of readable/app.pretty.js (statement-aligned).
function hC(o, t) {
  let e = new Be(),
    s = he[8],
    n = ps[8].hw,
    i = ps[8].sw,
    a = pe[ks - 1] - ns[ks - 1].hw - 7.5,
    r = 3.7;
  {
    let l = o.real ? Math.max($t(s, a), Wi(s, a)) + 0.41 : $t(s, a) + 0.012,
      c = Lt(Ct.matte, 0.2, 0.13, 0.075),
      h = Lt(Ct.metal, 0.3, 0.3, 0.3),
      f = Lt(Ct.metal, 0.5, 0.5, 0.52);
    qe(
      e,
      s,
      a,
      [
        [r + 0.25, l - 0.02],
        [r + 0.25, l],
        [r, l],
      ],
      48,
      h,
    );
    let u = 24;
    for (let d = 0; d < u; d++) {
      let p = -r + (2 * r * d) / u,
        m = -r + (2 * r * (d + 1)) / u,
        g = (p + m) / 2,
        b = Math.sqrt(Math.max(0, r * r - p * p)),
        v = Math.sqrt(Math.max(0, r * r - m * m)),
        x = Math.min(b, v),
        y = d % 2 ? c : Lt(Ct.matte, 0.23, 0.155, 0.09);
      oe(
        e,
        [
          [s + p, l, a - Math.min(b, r)],
          [s + m, l, a - Math.min(v, r)],
          [s + m, l, a + Math.min(v, r)],
          [s + p, l, a + Math.min(b, r)],
        ],
        y,
        [0, 1, 0],
        (M) => [M[0], M[2]],
      );
    }
    for (let d of [-0.54, 0.54])
      ss(e, s + d - 0.04, l, a - r, s + d + 0.04, l + 0.012, a + r, f);
    fc(e, s, l + 0.013, a, 0.5, 16, h);
  }
  {
    let l = s - n - 0.45,
      c = s - n - 2.4,
      h = a - 48,
      f = a + 3;
    (Vu(
      o,
      (b, v) =>
        b < s - n + 2.6 && b > s - n - i - 0.5 && v > h - 3 && v < f + 8,
    ),
      Vu(o, (b, v) => Math.abs(b - s) < n + 0.5 && Math.abs(v - a) < r + 2, [
        "car",
      ]));
    let u = Lt(Ct.gold, 0.7, 0.55, 0.3),
      d = Lt(Ct.metal, 0.12, 0.12, 0.12);
    for (let b of [l, c]) {
      let v = Math.round((f - h) / 2.4);
      for (let x = 0; x <= v; x++) {
        let y = h + ((f - h) * x) / v,
          M = $t(b, y) + Ze;
        Ce(e, [b, M, y], [b, M + 1, y], 0.04, d, 6);
      }
      for (let x = 0; x < v; x++) {
        let y = h + ((f - h) * x) / v,
          M = h + ((f - h) * (x + 1)) / v;
        (Ce(
          e,
          [b, $t(b, y) + Ze + 1, y],
          [b, $t(b, M) + Ze + 1, M],
          0.035,
          u,
          6,
        ),
          Ce(
            e,
            [b, $t(b, y) + Ze + 0.5, y],
            [b, $t(b, M) + Ze + 0.5, M],
            0.02,
            d,
            4,
          ));
      }
    }
    o.colliders.push({ t: "box", x0: l - 0.12, z0: h, x1: l + 0.12, z1: f });
    let p = s - n - i + 1.2,
      m = h - 2.5,
      g = $t(p, m) + Ze;
    (ss(
      e,
      p - 1,
      g,
      m - 1.4,
      p + 1,
      g + 2.5,
      m + 1.4,
      Lt(Ct.gloss, 0.08, 0.2, 0.12),
    ),
      ss(
        e,
        p - 1.2,
        g + 2.5,
        m - 1.6,
        p + 1.2,
        g + 2.75,
        m + 1.6,
        Lt(Ct.gloss, 0.5, 0.35, 0.1),
      ),
      ss(
        e,
        p + 1,
        g + 1.1,
        m - 0.9,
        p + 1.08,
        g + 2.1,
        m + 0.9,
        wn(0.9, 0.85, 0.7),
      ),
      o.colliders.push({
        t: "box",
        x0: p - 1,
        z0: m - 1.4,
        x1: p + 1,
        z1: m + 1.4,
      }));
  }
  if (o.real && o.site?.ellis) {
    let l = o.site.ellis[1] + 9,
      c = a - r - 0.3,
      h = Lt(Ct.stone, 0.16, 0.15, 0.14),
      f = Lt(Ct.metal, 0.5, 0.5, 0.52),
      u = Lt(Ct.stone, 0.03, 0.03, 0.03);
    if (c > l + 4) {
      let d = (p, m) => Math.max($t(p, m), Wi(p, m));
      _l(e, s - n, l, s + n, c, 3, (p, m) => d(p, m) + 0.04, h);
      for (let p of [-0.54, 0.54])
        for (let m = l; m < c - 0.1; m += 3) {
          let g = Math.min(c, m + 3);
          Ce(
            e,
            [s + p, d(s + p, m) + 0.3, m],
            [s + p, d(s + p, g) + 0.3, g],
            0.045,
            f,
            4,
          );
        }
      for (let p = l; p < c - 0.1; p += 3) {
        let m = Math.min(c, p + 3);
        Ce(e, [s, d(s, p) + 0.29, p], [s, d(s, m) + 0.29, m], 0.02, u, 4);
      }
    }
  }
  vn(o.group, e, t.lm, "PowellTurntable", { shadow: !1 });
}
Pn();
