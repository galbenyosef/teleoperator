// app 48 — top
// Lines 60971-61307 of readable/app.pretty.js (statement-aligned).
function j7({ B: o, A: t }, e = {}) {
  let s = o.R("hyde"),
    n = s.solid,
    i = Cm("n", he[3]),
    a = 22,
    r = a / 2,
    l = e.len ?? 290,
    c = 3;
  i.box(n, -(e.a0 || 0), -r, l, r, 1.9, c, V7, { bottom: !0 });
  for (let h = 3; h < l; h += 5)
    for (let f of [-r + 0.4, -r / 3, r / 3, r - 0.4]) {
      let u = i.L(h, f);
      os(n, u[0], u[1], 0.25, -6, 1.9, 6, Lb);
    }
  (s0(n, i.L(0, -r), i.L(l, -r), c, Rt([0.35, 0.28, 0.2], Tt.planks), {
    step: 3,
  }),
    i.box(n, 8, -8, 20, -1, c, c + 4.2, Rt([0.62, 0.58, 0.5], Tt.planks)),
    bW(n, i, 8, -8, 20, -1, c + 4.2, 2, Rt([0.3, 0.12, 0.08], Tt.tar)),
    i.box(n, 60, 2, 110, r - 1, c, c + 6.5, Rt([0.58, 0.55, 0.5], Tt.planks)),
    bW(n, i, 60, 2, 110, r - 1, c + 6.5, 2.4, Rt([0.25, 0.26, 0.25], Tt.tar)));
  for (let h = 10; h < l; h += 15)
    for (let f of [-r + 0.5, r - 0.5]) {
      let u = i.P(h, c, f);
      Ws(
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
        Cb,
      );
    }
  (udt(n, t, s, i, e.balclutha ?? 130, r + 7.5),
    ddt(n, t, s, i, e.eureka ?? 215, -r - 10.5));
}
function bW(o, t, e, s, n, i, a, r, l) {
  let c = t.L(e, s),
    h = t.L(n, i);
  V5(
    o,
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
function fdt(
  o,
  t,
  e,
  s,
  n,
  i,
  a,
  r,
  l,
  { sternRound: c = 0.25, n: h = 18, m: f = 6 } = {},
) {
  let u = (m) =>
      (i / 2) *
      (m < 0.4 ? Math.pow(Math.sin(((Math.PI / 2) * m) / 0.4), 0.55) : 1) *
      (m > 0.8 ? 1 - Math.pow((m - 0.8) / 0.2, 2) * (1 - c) : 1),
    d = (m) => a + 0.9 * Math.pow(1 - m, 2) + 0.5 * Math.pow(m, 3),
    p = [];
  for (let m = 0; m <= h; m++) {
    let g = m / h,
      b = e + n / 2 - g * n,
      v = Math.max(0.08, u(g)),
      x = d(g),
      y = g < 0.1 ? r + (x - 1 - r) * (1 - g / 0.1) : r,
      M = [];
    for (let S = 0; S <= f; S++) {
      let w = ((S / f) * Math.PI) / 2;
      M.push([v * Math.pow(Math.cos(w), 0.35), x - (x - y) * Math.sin(w)]);
    }
    p.push({ a: b, ring: M, top: x, b: v });
  }
  for (let m of [-1, 1])
    for (let g = 0; g < h; g++)
      for (let b = 0; b < f; b++) {
        let v = p[g],
          x = p[g + 1],
          y = (w, _) => t.P(w.a, w.ring[_][1], s + m * w.ring[_][0]),
          M = (v.ring[b][1] + v.ring[b + 1][1]) / 2,
          S = M < 0.3 ? l.bottom : b === 0 ? l.band : l.top;
        Ms(
          o,
          y(v, b),
          y(x, b),
          y(x, b + 1),
          y(v, b + 1),
          S,
          t.P((v.a + x.a) / 2, M - 1, s + m * 60),
        );
      }
  for (let m = 0; m < h; m++) {
    let g = p[m],
      b = p[m + 1];
    Ms(
      o,
      t.P(g.a, g.top - 0.9, s - g.b),
      t.P(b.a, b.top - 0.9, s - b.b),
      t.P(b.a, b.top - 0.9, s + b.b),
      t.P(g.a, g.top - 0.9, s + g.b),
      l.deck,
      t.P(g.a, g.top + 20, s),
    );
    for (let v of [-1, 1])
      Ms(
        o,
        t.P(g.a, g.top - 0.9, s + v * (g.b - 0.05)),
        t.P(b.a, b.top - 0.9, s + v * (b.b - 0.05)),
        t.P(b.a, b.top, s + v * (b.b - 0.05)),
        t.P(g.a, g.top, s + v * (g.b - 0.05)),
        l.top,
        t.P(g.a, g.top, s - v * 50),
      );
  }
  {
    let m = p[h];
    Ms(
      o,
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
function udt(o, t, e, s, n, i) {
  let c = Rt([0.03, 0.03, 0.03], Tt.paint),
    h = Rt([0.35, 0.07, 0.04], Tt.paint),
    f = Rt([0.8, 0.78, 0.72], Tt.paint),
    u = fdt(
      o,
      s,
      n,
      i,
      72,
      11.8,
      4.2,
      -5,
      { top: c, bottom: h, band: c, deck: Rt([0.45, 0.38, 0.3], Tt.planks) },
      { sternRound: 0.45 },
    ),
    d = Rt([0.35, 0.25, 0.16], Tt.planks),
    p = Rt([0.12, 0.1, 0.08], Tt.paint),
    m = Rt([0.8, 0.76, 0.66], Tt.paint),
    g = Rt([0.08, 0.07, 0.06], Tt.paint),
    b = [
      [0.22, 42],
      [0.46, 45],
      [0.7, 38],
    ],
    v = s.P(u.stationA(0) + 0.5, 4.2 + 1.2, i);
  for (let [M, S] of b) {
    let w = u.stationA(M),
      _ = s.P(w, 4.2, i);
    (os(o, _[0], _[2], 0.42, 4.2 - 0.5, 4.2 + S * 0.45, 8, d, 0.36),
      os(o, _[0], _[2], 0.28, 4.2 + S * 0.45, 4.2 + S * 0.78, 6, d, 0.22),
      os(o, _[0], _[2], 0.18, 4.2 + S * 0.78, 4.2 + S, 6, d, 0.08));
    let z = s.P(w, 0, i);
    if (
      (zs(
        o,
        z[0] - 1.6,
        4.2 + S * 0.44,
        z[2] - 1.6,
        z[0] + 1.6,
        4.2 + S * 0.46,
        z[2] + 1.6,
        d,
        { bottom: !0 },
      ),
      M < 0.65)
    ) {
      let A = [0.3, 0.42, 0.56, 0.68, 0.8, 0.9],
        T = [24, 22, 19, 16, 13, 10];
      A.forEach((E, R) => {
        let P = 4.2 + S * E,
          C = T[R] / 2;
        (rs(o, s.P(w + 0.5, P, i - C), s.P(w + 0.5, P, i + C), 0.3, 0.3, p),
          Qi(
            o,
            [
              s.P(w + 0.85, P - 0.05, i - C * 0.85),
              s.P(w + 1, P - 0.35, i),
              s.P(w + 0.85, P - 0.05, i + C * 0.85),
            ],
            [0.18, 0.42, 0.18],
            5,
            m,
          ));
      });
    } else
      (rs(
        o,
        s.P(w - 0.4, 4.2 + 4, i),
        s.P(w - 13, 4.2 + 6.5, i),
        0.25,
        0.25,
        p,
      ),
        rs(
          o,
          s.P(w - 0.4, 4.2 + S * 0.44, i),
          s.P(w - 11, 4.2 + S * 0.52, i),
          0.2,
          0.2,
          p,
        ),
        Qi(
          o,
          [
            s.P(w - 1, 4.2 + 4.5, i),
            s.P(w - 7, 4.2 + 5.8, i),
            s.P(w - 12.5, 4.2 + 6.8, i),
          ],
          0.3,
          5,
          m,
        ));
    for (let A of [-1, 1])
      for (let T = -2; T <= 2; T++) {
        let E = u.halfB(M) + 0.3;
        (q5(
          o,
          s.P(w + T * 0.9, 4.2 + 0.8, i + A * E),
          s.P(w, 4.2 + S * 0.44, i + A * 0.6),
          0.03,
          g,
        ),
          q5(
            o,
            s.P(w + T * 0.5, 4.2 + S * 0.45, i + A * 1.5),
            s.P(w, 4.2 + S * 0.78, i + A * 0.3),
            0.025,
            g,
          ));
      }
    (q5(
      o,
      s.P(w, 4.2 + S * 0.44, i),
      M < 0.3 ? v : s.P(u.stationA(M - 0.24), 4.2 + 1, i),
      0.03,
      g,
    ),
      q5(
        o,
        s.P(w, 4.2 + S, i),
        M < 0.3
          ? s.P(u.stationA(0) + 14, 4.2 + 5, i)
          : s.P(u.stationA(M - 0.24), 4.2 + S * 0.8, i),
        0.025,
        g,
      ));
  }
  let x = u.stationA(0);
  rs(o, s.P(x - 3, 4.2 + 1.2, i), s.P(x + 15, 4.2 + 4.6, i), 0.5, 0.5, d);
  for (let M of [-1, 1])
    q5(
      o,
      s.P(x + 14, 4.2 + 4.4, i),
      s.P(x - 1, 4.2 + 0.9, i + M * 2.5),
      0.03,
      g,
    );
  (s.box(
    o,
    u.stationA(0.55),
    i - 3,
    u.stationA(0.5),
    i + 3,
    4.2 - 0.3,
    4.2 + 2.4,
    f,
  ),
    s.box(
      o,
      u.stationA(0.33),
      i - 2.5,
      u.stationA(0.29),
      i + 2.5,
      4.2 - 0.3,
      4.2 + 2.2,
      f,
    ),
    s.box(
      o,
      u.stationA(1) + 1,
      i - 11.8 / 2 + 0.8,
      u.stationA(0.84),
      i + 11.8 / 2 - 0.8,
      4.2 + 0.1,
      4.2 + 1.4,
      Rt([0.5, 0.4, 0.3], Tt.planks),
    ));
  let y = t.word("BALCLUTHA", {
    font: "bold 100px Georgia, serif",
    h: 120,
    spacing: 6,
  });
  for (let M of [-1, 1]) {
    let S = s.P(u.stationA(0.12), 4.4, i + M * (u.halfB(0.12) + 0.05));
    W5(
      e.text,
      t,
      y,
      S,
      M > 0
        ? s.P(1, 0, 0).map((w, _) => w - s.P(0, 0, 0)[_])
        : s.P(-1, 0, 0).map((w, _) => w - s.P(0, 0, 0)[_]),
      [0, 1, 0],
      s.P(0, 0, M).map((w, _) => w - s.P(0, 0, 0)[_]),
      5,
      null,
      xo([0.85, 0.75, 0.45]),
    );
  }
}
var q5 = (o, t, e, s, n) => rs(o, t, e, s * 2, s * 2, n);
