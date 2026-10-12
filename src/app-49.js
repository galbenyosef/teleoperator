// app 49 — top
// Lines 60740-61076 of readable/app.pretty.js (statement-aligned).
function gR({ B: i, A: t }, e = {}) {
  let s = i.R("hyde"),
    n = s.solid,
    o = X1("n", ae[3]),
    a = 22,
    r = a / 2,
    l = e.len ?? 290,
    c = 3;
  o.box(n, -(e.a0 || 0), -r, l, r, 1.9, c, dR, { bottom: !0 });
  for (let h = 3; h < l; h += 5)
    for (let f of [-r + 0.4, -r / 3, r / 3, r - 0.4]) {
      let u = o.L(h, f);
      es(n, u[0], u[1], 0.25, -6, 1.9, 6, qg);
    }
  (Nr(n, o.L(0, -r), o.L(l, -r), c, At([0.35, 0.28, 0.2], Tt.planks), {
    step: 3,
  }),
    o.box(n, 8, -8, 20, -1, c, c + 4.2, At([0.62, 0.58, 0.5], Tt.planks)),
    mG(n, o, 8, -8, 20, -1, c + 4.2, 2, At([0.3, 0.12, 0.08], Tt.tar)),
    o.box(n, 60, 2, 110, r - 1, c, c + 6.5, At([0.58, 0.55, 0.5], Tt.planks)),
    mG(n, o, 60, 2, 110, r - 1, c + 6.5, 2.4, At([0.25, 0.26, 0.25], Tt.tar)));
  for (let h = 10; h < l; h += 15)
    for (let f of [-r + 0.5, r - 0.5]) {
      let u = o.P(h, c, f);
      Gs(
        n,
        u[0],
        u[2],
        [
          [0.25, c],
          [0.22, c + 0.5],
          [0.32, c + 0.6],
          [0.3, c + 0.7],
          [0.01, c + 0.72],
        ],
        8,
        Wg,
      );
    }
  (jct(n, t, s, o, e.balclutha ?? 130, r + 7.5),
    Vct(n, t, s, o, e.eureka ?? 215, -r - 10.5));
}
function mG(i, t, e, s, n, o, a, r, l) {
  let c = t.L(e, s),
    h = t.L(n, o);
  X5(
    i,
    Math.min(c[0], h[0]),
    Math.min(c[1], h[1]),
    Math.max(c[0], h[0]),
    Math.max(c[1], h[1]),
    a,
    r,
    l,
    Math.abs(c[0] - h[0]) > Math.abs(c[1] - h[1]),
    l,
    0.4,
  );
}
function qct(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  l,
  { sternRound: c = 0.25, n: h = 18, m: f = 6 } = {},
) {
  let u = (m) =>
      (o / 2) *
      (m < 0.4 ? Math.pow(Math.sin(((Math.PI / 2) * m) / 0.4), 0.55) : 1) *
      (m > 0.8 ? 1 - Math.pow((m - 0.8) / 0.2, 2) * (1 - c) : 1),
    d = (m) => a + 0.9 * Math.pow(1 - m, 2) + 0.5 * Math.pow(m, 3),
    p = [];
  for (let m = 0; m <= h; m++) {
    let g = m / h,
      b = e + n / 2 - g * n,
      x = Math.max(0.08, u(g)),
      v = d(g),
      y = g < 0.1 ? r + (v - 1 - r) * (1 - g / 0.1) : r,
      M = [];
    for (let S = 0; S <= f; S++) {
      let w = ((S / f) * Math.PI) / 2;
      M.push([x * Math.pow(Math.cos(w), 0.35), v - (v - y) * Math.sin(w)]);
    }
    p.push({ a: b, ring: M, top: v, b: x });
  }
  for (let m of [-1, 1])
    for (let g = 0; g < h; g++)
      for (let b = 0; b < f; b++) {
        let x = p[g],
          v = p[g + 1],
          y = (w, z) => t.P(w.a, w.ring[z][1], s + m * w.ring[z][0]),
          M = (x.ring[b][1] + x.ring[b + 1][1]) / 2,
          S = M < 0.3 ? l.bottom : b === 0 ? l.band : l.top;
        xs(
          i,
          y(x, b),
          y(v, b),
          y(v, b + 1),
          y(x, b + 1),
          S,
          t.P((x.a + v.a) / 2, M - 1, s + m * 60),
        );
      }
  for (let m = 0; m < h; m++) {
    let g = p[m],
      b = p[m + 1];
    xs(
      i,
      t.P(g.a, g.top - 0.9, s - g.b),
      t.P(b.a, b.top - 0.9, s - b.b),
      t.P(b.a, b.top - 0.9, s + b.b),
      t.P(g.a, g.top - 0.9, s + g.b),
      l.deck,
      t.P(g.a, g.top + 20, s),
    );
    for (let x of [-1, 1])
      xs(
        i,
        t.P(g.a, g.top - 0.9, s + x * (g.b - 0.05)),
        t.P(b.a, b.top - 0.9, s + x * (b.b - 0.05)),
        t.P(b.a, b.top, s + x * (b.b - 0.05)),
        t.P(g.a, g.top, s + x * (g.b - 0.05)),
        l.top,
        t.P(g.a, g.top, s - x * 50),
      );
  }
  {
    let m = p[h];
    xs(
      i,
      t.P(m.a, m.top, s - m.b),
      t.P(m.a, m.top, s + m.b),
      t.P(m.a, 0.5, s + m.b * 0.6),
      t.P(m.a, 0.5, s - m.b * 0.6),
      l.top,
      t.P(m.a - 20, m.top, s),
    );
  }
  return { sheer: d, halfB: u, stationA: (m) => e + n / 2 - m * n };
}
function jct(i, t, e, s, n, o) {
  let c = At([0.03, 0.03, 0.03], Tt.paint),
    h = At([0.35, 0.07, 0.04], Tt.paint),
    f = At([0.8, 0.78, 0.72], Tt.paint),
    u = qct(
      i,
      s,
      n,
      o,
      72,
      11.8,
      4.2,
      -5,
      { top: c, bottom: h, band: c, deck: At([0.45, 0.38, 0.3], Tt.planks) },
      { sternRound: 0.45 },
    ),
    d = At([0.35, 0.25, 0.16], Tt.planks),
    p = At([0.12, 0.1, 0.08], Tt.paint),
    m = At([0.8, 0.76, 0.66], Tt.paint),
    g = At([0.08, 0.07, 0.06], Tt.paint),
    b = [
      [0.22, 42],
      [0.46, 45],
      [0.7, 38],
    ],
    x = s.P(u.stationA(0) + 0.5, 4.2 + 1.2, o);
  for (let [M, S] of b) {
    let w = u.stationA(M),
      z = s.P(w, 4.2, o);
    (es(i, z[0], z[2], 0.42, 4.2 - 0.5, 4.2 + S * 0.45, 8, d, 0.36),
      es(i, z[0], z[2], 0.28, 4.2 + S * 0.45, 4.2 + S * 0.78, 6, d, 0.22),
      es(i, z[0], z[2], 0.18, 4.2 + S * 0.78, 4.2 + S, 6, d, 0.08));
    let _ = s.P(w, 0, o);
    if (
      (Ms(
        i,
        _[0] - 1.6,
        4.2 + S * 0.44,
        _[2] - 1.6,
        _[0] + 1.6,
        4.2 + S * 0.46,
        _[2] + 1.6,
        d,
        { bottom: !0 },
      ),
      M < 0.65)
    ) {
      let R = [0.3, 0.42, 0.56, 0.68, 0.8, 0.9],
        T = [24, 22, 19, 16, 13, 10];
      R.forEach((E, A) => {
        let C = 4.2 + S * E,
          P = T[A] / 2;
        (ss(i, s.P(w + 0.5, C, o - P), s.P(w + 0.5, C, o + P), 0.3, 0.3, p),
          Wi(
            i,
            [
              s.P(w + 0.85, C - 0.05, o - P * 0.85),
              s.P(w + 1, C - 0.35, o),
              s.P(w + 0.85, C - 0.05, o + P * 0.85),
            ],
            [0.18, 0.42, 0.18],
            5,
            m,
          ));
      });
    } else
      (ss(
        i,
        s.P(w - 0.4, 4.2 + 4, o),
        s.P(w - 13, 4.2 + 6.5, o),
        0.25,
        0.25,
        p,
      ),
        ss(
          i,
          s.P(w - 0.4, 4.2 + S * 0.44, o),
          s.P(w - 11, 4.2 + S * 0.52, o),
          0.2,
          0.2,
          p,
        ),
        Wi(
          i,
          [
            s.P(w - 1, 4.2 + 4.5, o),
            s.P(w - 7, 4.2 + 5.8, o),
            s.P(w - 12.5, 4.2 + 6.8, o),
          ],
          0.3,
          5,
          m,
        ));
    for (let R of [-1, 1])
      for (let T = -2; T <= 2; T++) {
        let E = u.halfB(M) + 0.3;
        (Y5(
          i,
          s.P(w + T * 0.9, 4.2 + 0.8, o + R * E),
          s.P(w, 4.2 + S * 0.44, o + R * 0.6),
          0.03,
          g,
        ),
          Y5(
            i,
            s.P(w + T * 0.5, 4.2 + S * 0.45, o + R * 1.5),
            s.P(w, 4.2 + S * 0.78, o + R * 0.3),
            0.025,
            g,
          ));
      }
    (Y5(
      i,
      s.P(w, 4.2 + S * 0.44, o),
      M < 0.3 ? x : s.P(u.stationA(M - 0.24), 4.2 + 1, o),
      0.03,
      g,
    ),
      Y5(
        i,
        s.P(w, 4.2 + S, o),
        M < 0.3
          ? s.P(u.stationA(0) + 14, 4.2 + 5, o)
          : s.P(u.stationA(M - 0.24), 4.2 + S * 0.8, o),
        0.025,
        g,
      ));
  }
  let v = u.stationA(0);
  ss(i, s.P(v - 3, 4.2 + 1.2, o), s.P(v + 15, 4.2 + 4.6, o), 0.5, 0.5, d);
  for (let M of [-1, 1])
    Y5(
      i,
      s.P(v + 14, 4.2 + 4.4, o),
      s.P(v - 1, 4.2 + 0.9, o + M * 2.5),
      0.03,
      g,
    );
  (s.box(
    i,
    u.stationA(0.55),
    o - 3,
    u.stationA(0.5),
    o + 3,
    4.2 - 0.3,
    4.2 + 2.4,
    f,
  ),
    s.box(
      i,
      u.stationA(0.33),
      o - 2.5,
      u.stationA(0.29),
      o + 2.5,
      4.2 - 0.3,
      4.2 + 2.2,
      f,
    ),
    s.box(
      i,
      u.stationA(1) + 1,
      o - 11.8 / 2 + 0.8,
      u.stationA(0.84),
      o + 11.8 / 2 - 0.8,
      4.2 + 0.1,
      4.2 + 1.4,
      At([0.5, 0.4, 0.3], Tt.planks),
    ));
  let y = t.word("BALCLUTHA", {
    font: "bold 100px Georgia, serif",
    h: 120,
    spacing: 6,
  });
  for (let M of [-1, 1]) {
    let S = s.P(u.stationA(0.12), 4.4, o + M * (u.halfB(0.12) + 0.05));
    K5(
      e.text,
      t,
      y,
      S,
      M > 0
        ? s.P(1, 0, 0).map((w, z) => w - s.P(0, 0, 0)[z])
        : s.P(-1, 0, 0).map((w, z) => w - s.P(0, 0, 0)[z]),
      [0, 1, 0],
      s.P(0, 0, M).map((w, z) => w - s.P(0, 0, 0)[z]),
      5,
      null,
      oo([0.85, 0.75, 0.45]),
    );
  }
}
var Y5 = (i, t, e, s, n) => ss(i, t, e, s * 2, s * 2, n);
