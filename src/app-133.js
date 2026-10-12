// app 133 — math
// Lines 88761-88925 of readable/app.pretty.js (statement-aligned).
function L7(i, t) {
  let e = new Ce(),
    s = ae[8],
    n = ls[8].hw,
    o = ls[8].sw,
    a = fe[ws - 1] - Qe[ws - 1].hw - 7.5,
    r = 3.7;
  {
    let l = i.real ? Math.max(Yt(s, a), eo(s, a)) + 0.41 : Yt(s, a) + 0.012,
      c = It(Lt.matte, 0.2, 0.13, 0.075),
      h = It(Lt.metal, 0.3, 0.3, 0.3),
      f = It(Lt.metal, 0.5, 0.5, 0.52);
    Oe(
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
        x = Math.sqrt(Math.max(0, r * r - m * m)),
        v = Math.min(b, x),
        y = d % 2 ? c : It(Lt.matte, 0.23, 0.155, 0.09);
      ne(
        e,
        [
          [s + p, l, a - Math.min(b, r)],
          [s + m, l, a - Math.min(x, r)],
          [s + m, l, a + Math.min(x, r)],
          [s + p, l, a + Math.min(b, r)],
        ],
        y,
        [0, 1, 0],
        (M) => [M[0], M[2]],
      );
    }
    for (let d of [-0.54, 0.54])
      Ze(e, s + d - 0.04, l, a - r, s + d + 0.04, l + 0.012, a + r, f);
    ql(e, s, l + 0.013, a, 0.5, 16, h);
  }
  {
    let l = s - n - 0.45,
      c = s - n - 2.4,
      h = a - 48,
      f = a + 3;
    (ru(
      i,
      (b, x) =>
        b < s - n + 2.6 && b > s - n - o - 0.5 && x > h - 3 && x < f + 8,
    ),
      ru(i, (b, x) => Math.abs(b - s) < n + 0.5 && Math.abs(x - a) < r + 2, [
        "car",
      ]));
    let u = It(Lt.gold, 0.7, 0.55, 0.3),
      d = It(Lt.metal, 0.12, 0.12, 0.12);
    for (let b of [l, c]) {
      let x = Math.round((f - h) / 2.4);
      for (let v = 0; v <= x; v++) {
        let y = h + ((f - h) * v) / x,
          M = Yt(b, y) + Ke;
        Ae(e, [b, M, y], [b, M + 1, y], 0.04, d, 6);
      }
      for (let v = 0; v < x; v++) {
        let y = h + ((f - h) * v) / x,
          M = h + ((f - h) * (v + 1)) / x;
        (Ae(
          e,
          [b, Yt(b, y) + Ke + 1, y],
          [b, Yt(b, M) + Ke + 1, M],
          0.035,
          u,
          6,
        ),
          Ae(
            e,
            [b, Yt(b, y) + Ke + 0.5, y],
            [b, Yt(b, M) + Ke + 0.5, M],
            0.02,
            d,
            4,
          ));
      }
    }
    i.colliders.push({ t: "box", x0: l - 0.12, z0: h, x1: l + 0.12, z1: f });
    let p = s - n - o + 1.2,
      m = h - 2.5,
      g = Yt(p, m) + Ke;
    (Ze(
      e,
      p - 1,
      g,
      m - 1.4,
      p + 1,
      g + 2.5,
      m + 1.4,
      It(Lt.gloss, 0.08, 0.2, 0.12),
    ),
      Ze(
        e,
        p - 1.2,
        g + 2.5,
        m - 1.6,
        p + 1.2,
        g + 2.75,
        m + 1.6,
        It(Lt.gloss, 0.5, 0.35, 0.1),
      ),
      Ze(
        e,
        p + 1,
        g + 1.1,
        m - 0.9,
        p + 1.08,
        g + 2.1,
        m + 0.9,
        bn(0.9, 0.85, 0.7),
      ),
      i.colliders.push({
        t: "box",
        x0: p - 1,
        z0: m - 1.4,
        x1: p + 1,
        z1: m + 1.4,
      }));
  }
  if (i.real && i.site?.ellis) {
    let l = i.site.ellis[1] + 9,
      c = a - r - 0.3,
      h = It(Lt.stone, 0.16, 0.15, 0.14),
      f = It(Lt.metal, 0.5, 0.5, 0.52),
      u = It(Lt.stone, 0.03, 0.03, 0.03);
    if (c > l + 4) {
      let d = (p, m) => Math.max(Yt(p, m), eo(p, m));
      il(e, s - n, l, s + n, c, 3, (p, m) => d(p, m) + 0.04, h);
      for (let p of [-0.54, 0.54])
        for (let m = l; m < c - 0.1; m += 3) {
          let g = Math.min(c, m + 3);
          Ae(
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
        Ae(e, [s, d(s, p) + 0.29, p], [s, d(s, m) + 0.29, m], 0.02, u, 4);
      }
    }
  }
  gn(i.group, e, t.lm, "PowellTurntable", { shadow: !1 });
}
En();
