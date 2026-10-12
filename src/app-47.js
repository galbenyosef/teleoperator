// app 47 — math
// Lines 60119-60407 of readable/app.pretty.js (statement-aligned).
function Gct({ B: i, A: t }, e = {}) {
  let s = i.R("p39"),
    n = s.solid,
    o = X1("n", (ae[8] + ae[9]) / 2 + 4),
    a = 86,
    r = a / 2,
    l = 320,
    c = 3;
  o.box(n, -(e.a0 || 0), -r, l, r, 1.8, c, dR, { bottom: !0 });
  for (let m = 4; m < l; m += 7)
    for (let g of [-r + 0.5, r - 0.5, -14, 14]) {
      let b = o.L(m, g);
      es(n, b[0], b[1], 0.3, -6, 1.8, 6, qg);
    }
  for (let m = -r; m <= r; m += 7) {
    let g = o.L(l - 0.5, m);
    es(n, g[0], g[1], 0.3, -6, 1.8, 6, qg);
  }
  let h = Ha("pier39"),
    f = At([0.25, 0.22, 0.2], Tt.tar),
    u = At([0.3, 0.25, 0.2], Tt.planks),
    d = [
      [-r + 2, -r + 16, 14, 290],
      [r - 16, r - 2, 14, 290],
      [-9, 9, 30, 205],
    ];
  for (let [m, g, b, x] of d) {
    let v = b,
      y = 0;
    for (; v < x - 10;) {
      let M = Math.min(x - v, 30 + ((y * 7) % 3) * 8),
        S = v + M,
        w = 8.5 + (y % 3 === 1, 0);
      (o.wall(s.atlas, v, m, S, m, c, c + w, h, y * 5),
        o.wall(s.atlas, S, g, v, g, c, c + w, h, y * 5 + 3),
        o.wall(s.atlas, v, g, v, m, c, c + w, h, 2),
        o.wall(s.atlas, S, m, S, g, c, c + w, h, 9));
      let z = o.L(v, m),
        _ = o.L(S, g),
        R = Math.min(z[0], _[0]),
        T = Math.max(z[0], _[0]),
        E = Math.min(z[1], _[1]),
        A = Math.max(z[1], _[1]);
      X5(
        n,
        R,
        E,
        T,
        A,
        c + w,
        3.4,
        f,
        !1,
        At([0.34, 0.3, 0.26], Tt.planks),
        0.7,
      );
      for (let [C, P] of [
        [m, -1],
        [g, 1],
      ]) {
        if (Math.abs(C) > r - 3) continue;
        let I = C + P * 2.4;
        xs(
          n,
          o.P(v, c + 3.6, C),
          o.P(S, c + 3.6, C),
          o.P(S, c + 3.2, I),
          o.P(v, c + 3.2, I),
          f,
          o.P((v + S) / 2, c + 40, C + P * 20),
        );
        for (let L = v + 2; L < S; L += 5) {
          let F = o.P(L, c, I - P * 0.2);
          es(n, F[0], F[2], 0.12, c, c + 3.25, 6, u);
        }
      }
      ((v = S + (y % 2 ? 7 : 10)), y++);
    }
  }
  {
    let m = At([0.28, 0.2, 0.13], Tt.planks);
    for (let x of [-1, 1]) {
      let v = o.P(1.5, c, x * 9);
      Ms(n, v[0] - 0.5, c, v[2] - 0.5, v[0] + 0.5, c + 9, v[2] + 0.5, m);
    }
    o.box(n, 1, -10, 2, 10, c + 7.2, c + 9.4, m);
    let g = t.word("PIER 39", {
        font: "bold 120px Georgia, serif",
        h: 140,
        spacing: 8,
      }),
      b = o.P(0.95, c + 8.3, 0);
    si(s.text, t, g, b[0], b[1], b[2], 0, 1, 7, null, oo([0.97, 0.9, 0.7], !0));
  }
  {
    let m = o.P(245, c, 0),
      g = m[0],
      b = m[2],
      x = At([0.55, 0.06, 0.05], Tt.paint),
      v = At([0.75, 0.55, 0.2], Tt.metal),
      y = At([0.85, 0.82, 0.75], Tt.paint),
      M = At([1, 0.85, 0.55], Tt.lamp);
    Gs(
      n,
      g,
      b,
      [
        [9.5, c],
        [9.5, c + 0.6],
        [9.2, c + 0.6],
      ],
      24,
      y,
    );
    for (let [S, w] of [
      [c + 0.6, 9.2],
      [c + 4.2, 9],
    ]) {
      Gs(
        n,
        g,
        b,
        [
          [w, S],
          [w, S + 0.35],
        ],
        24,
        v,
      );
      for (let z = 0; z < 24; z++) {
        let _ = (z / 24) * Math.PI * 2,
          R = g + Math.cos(_) * (w - 0.4),
          T = b + Math.sin(_) * (w - 0.4);
        es(n, R, T, 0.08, S, S + 3.5, 5, v);
      }
      for (let z = 0; z < 18; z++) {
        let _ = (z / 18) * Math.PI * 2 + (S > c + 1 ? 0.17 : 0),
          R = g + Math.cos(_) * (w - 1.8),
          T = b + Math.sin(_) * (w - 1.8);
        (Us(
          n,
          R,
          T,
          -Math.sin(_),
          Math.cos(_),
          0.8,
          0.22,
          S + 1,
          S + 1.8,
          z % 3 ? y : At([0.35, 0.2, 0.1], Tt.paint),
        ),
          Us(
            n,
            R - Math.sin(_) * 0.75,
            T + Math.cos(_) * 0.75,
            -Math.sin(_),
            Math.cos(_),
            0.2,
            0.18,
            S + 1.6,
            S + 2.3,
            z % 3 ? y : At([0.35, 0.2, 0.1], Tt.paint),
          ),
          es(n, R, T, 0.05, S + 0.35, S + 3.5, 4, v));
      }
      Gs(
        n,
        g,
        b,
        [
          [w + 0.15, S + 3.5],
          [w + 0.15, S + 3.65],
        ],
        24,
        M,
      );
    }
    (es(n, g, b, 2.6, c + 0.6, c + 8.6, 12, At([0.7, 0.62, 0.45], Tt.paint)),
      Gs(
        n,
        g,
        b,
        [
          [9.3, c + 7.8],
          [9.6, c + 8.4],
          [9.6, c + 9.2],
          [7.5, c + 10.6],
          [3, c + 12.2],
          [0.6, c + 12.8],
          [0.5, c + 13.8],
          [0.05, c + 14.3],
        ],
        24,
        x,
      ));
    for (let S = 0; S < 12; S++) {
      let w = (S / 12) * Math.PI * 2 + 0.13;
      ss(
        n,
        [g + Math.cos(w) * 9.62, c + 9.25, b + Math.sin(w) * 9.62],
        [g + Math.cos(w) * 1, c + 12.9, b + Math.sin(w) * 1],
        0.9,
        0.05,
        y,
      );
    }
    Gs(
      n,
      g,
      b,
      [
        [9.7, c + 8.9],
        [9.7, c + 9.1],
      ],
      24,
      M,
    );
  }
  for (let m = 20; m < 300; m += 24)
    for (let g of [-1, 1])
      if ((Ac(n, o, m, g * (r - 1.2), -g), (m / 24) % 2 < 1)) {
        let b = o.P(m + 12, c, g * (r - 0.7));
        (es(n, b[0], b[2], 0.09, c, c + 4.5, 6, Wg, 0.07),
          es(
            n,
            b[0],
            b[2],
            0.25,
            c + 4.4,
            c + 5,
            6,
            At([1, 0.85, 0.6], Tt.lamp),
            0.3,
          ));
      }
  (Nr(n, o.L(0, -r), o.L(l, -r), c, Wg),
    Nr(n, o.L(0, r), o.L(l, r), c, Wg),
    Nr(n, o.L(l, -r), o.L(l, r), c, Wg));
  let p = At([0.38, 0.38, 0.35], Tt.conc);
  for (let m = 0; m < 7; m++) {
    let g = 150 + m * 17,
      b = -r - 6 - (m % 2) * 16,
      x = 14,
      v = 6;
    o.box(n, g, b - v / 2, g + x, b + v / 2, -0.4, 0.35, p);
    let y = lS(m + 3);
    for (let M = 0; M < 6 + (m % 3); M++)
      Wct(
        n,
        o,
        g + 1.5 + y() * (x - 3),
        b + (y() - 0.5) * (v - 1.5),
        0.35,
        y() * 6.28,
        y,
      );
  }
}
var lS = (i) => () => (i = (i * 16807) % 2147483647) / 2147483647;
function Wct(i, t, e, s, n, o, a) {
  let r = 1.8 + a() * 0.6,
    l = a() < 0.4,
    c = At([0.23 + a() * 0.08, 0.16 + a() * 0.05, 0.1], Tt.paint),
    h = Math.cos(o),
    f = Math.sin(o),
    u = [],
    d = [],
    p = [
      [0, 0.1, 0.12],
      [0.2, 0.28, 0.24],
      [0.45, 0.33, 0.3],
      [0.7, 0.3, 0.26],
      [0.85, l ? 0.55 : 0.28, 0.17],
      [0.95, l ? 0.8 : 0.26, 0.13],
      [1, l ? 0.85 : 0.25, 0.09],
    ];
  for (let [m, g, b] of p) {
    let x = (m - 0.5) * r,
      v = t.P(e + h * x, n + g, s + f * x);
    (u.push(v), d.push(b * (r / 2.1)));
  }
  Wi(i, u, d, 6, c);
  for (let m of [-1, 1]) {
    let g = 0.12 * r,
      b = t.P(e + h * g - f * m * 0.2, n + 0.12, s + f * g + h * m * 0.2),
      x = t.P(e + h * g - f * m * 0.6, n + 0.02, s + f * g + h * m * 0.6);
    ss(i, b, x, 0.25, 0.05, c);
  }
}
