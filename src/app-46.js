// app 46 — math
// Lines 60350-60638 of readable/app.pretty.js (statement-aligned).
function cdt({ B: o, A: t }, e = {}) {
  let s = o.R("p39"),
    n = s.solid,
    i = Cm("n", (he[8] + he[9]) / 2 + 4),
    a = 86,
    r = a / 2,
    l = 320,
    c = 3;
  i.box(n, -(e.a0 || 0), -r, l, r, 1.8, c, V7, { bottom: !0 });
  for (let m = 4; m < l; m += 7)
    for (let g of [-r + 0.5, r - 0.5, -14, 14]) {
      let b = i.L(m, g);
      os(n, b[0], b[1], 0.3, -6, 1.8, 6, Lb);
    }
  for (let m = -r; m <= r; m += 7) {
    let g = i.L(l - 0.5, m);
    os(n, g[0], g[1], 0.3, -6, 1.8, 6, Lb);
  }
  let h = Ja("pier39"),
    f = Rt([0.25, 0.22, 0.2], Tt.tar),
    u = Rt([0.3, 0.25, 0.2], Tt.planks),
    d = [
      [-r + 2, -r + 16, 14, 290],
      [r - 16, r - 2, 14, 290],
      [-9, 9, 30, 205],
    ];
  for (let [m, g, b, v] of d) {
    let x = b,
      y = 0;
    for (; x < v - 10;) {
      let M = Math.min(v - x, 30 + ((y * 7) % 3) * 8),
        S = x + M,
        w = 8.5 + (y % 3 === 1, 0);
      (i.wall(s.atlas, x, m, S, m, c, c + w, h, y * 5),
        i.wall(s.atlas, S, g, x, g, c, c + w, h, y * 5 + 3),
        i.wall(s.atlas, x, g, x, m, c, c + w, h, 2),
        i.wall(s.atlas, S, m, S, g, c, c + w, h, 9));
      let _ = i.L(x, m),
        z = i.L(S, g),
        A = Math.min(_[0], z[0]),
        T = Math.max(_[0], z[0]),
        E = Math.min(_[1], z[1]),
        R = Math.max(_[1], z[1]);
      V5(
        n,
        A,
        E,
        T,
        R,
        c + w,
        3.4,
        f,
        !1,
        Rt([0.34, 0.3, 0.26], Tt.planks),
        0.7,
      );
      for (let [P, C] of [
        [m, -1],
        [g, 1],
      ]) {
        if (Math.abs(P) > r - 3) continue;
        let I = P + C * 2.4;
        Ms(
          n,
          i.P(x, c + 3.6, P),
          i.P(S, c + 3.6, P),
          i.P(S, c + 3.2, I),
          i.P(x, c + 3.2, I),
          f,
          i.P((x + S) / 2, c + 40, P + C * 20),
        );
        for (let L = x + 2; L < S; L += 5) {
          let F = i.P(L, c, I - C * 0.2);
          os(n, F[0], F[2], 0.12, c, c + 3.25, 6, u);
        }
      }
      ((x = S + (y % 2 ? 7 : 10)), y++);
    }
  }
  {
    let m = Rt([0.28, 0.2, 0.13], Tt.planks);
    for (let v of [-1, 1]) {
      let x = i.P(1.5, c, v * 9);
      zs(n, x[0] - 0.5, c, x[2] - 0.5, x[0] + 0.5, c + 9, x[2] + 0.5, m);
    }
    i.box(n, 1, -10, 2, 10, c + 7.2, c + 9.4, m);
    let g = t.word("PIER 39", {
        font: "bold 120px Georgia, serif",
        h: 140,
        spacing: 8,
      }),
      b = i.P(0.95, c + 8.3, 0);
    ri(s.text, t, g, b[0], b[1], b[2], 0, 1, 7, null, xo([0.97, 0.9, 0.7], !0));
  }
  {
    let m = i.P(245, c, 0),
      g = m[0],
      b = m[2],
      v = Rt([0.55, 0.06, 0.05], Tt.paint),
      x = Rt([0.75, 0.55, 0.2], Tt.metal),
      y = Rt([0.85, 0.82, 0.75], Tt.paint),
      M = Rt([1, 0.85, 0.55], Tt.lamp);
    Ws(
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
      Ws(
        n,
        g,
        b,
        [
          [w, S],
          [w, S + 0.35],
        ],
        24,
        x,
      );
      for (let _ = 0; _ < 24; _++) {
        let z = (_ / 24) * Math.PI * 2,
          A = g + Math.cos(z) * (w - 0.4),
          T = b + Math.sin(z) * (w - 0.4);
        os(n, A, T, 0.08, S, S + 3.5, 5, x);
      }
      for (let _ = 0; _ < 18; _++) {
        let z = (_ / 18) * Math.PI * 2 + (S > c + 1 ? 0.17 : 0),
          A = g + Math.cos(z) * (w - 1.8),
          T = b + Math.sin(z) * (w - 1.8);
        (Vs(
          n,
          A,
          T,
          -Math.sin(z),
          Math.cos(z),
          0.8,
          0.22,
          S + 1,
          S + 1.8,
          _ % 3 ? y : Rt([0.35, 0.2, 0.1], Tt.paint),
        ),
          Vs(
            n,
            A - Math.sin(z) * 0.75,
            T + Math.cos(z) * 0.75,
            -Math.sin(z),
            Math.cos(z),
            0.2,
            0.18,
            S + 1.6,
            S + 2.3,
            _ % 3 ? y : Rt([0.35, 0.2, 0.1], Tt.paint),
          ),
          os(n, A, T, 0.05, S + 0.35, S + 3.5, 4, x));
      }
      Ws(
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
    (os(n, g, b, 2.6, c + 0.6, c + 8.6, 12, Rt([0.7, 0.62, 0.45], Tt.paint)),
      Ws(
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
        v,
      ));
    for (let S = 0; S < 12; S++) {
      let w = (S / 12) * Math.PI * 2 + 0.13;
      rs(
        n,
        [g + Math.cos(w) * 9.62, c + 9.25, b + Math.sin(w) * 9.62],
        [g + Math.cos(w) * 1, c + 12.9, b + Math.sin(w) * 1],
        0.9,
        0.05,
        y,
      );
    }
    Ws(
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
      if ((ih(n, i, m, g * (r - 1.2), -g), (m / 24) % 2 < 1)) {
        let b = i.P(m + 12, c, g * (r - 0.7));
        (os(n, b[0], b[2], 0.09, c, c + 4.5, 6, Cb, 0.07),
          os(
            n,
            b[0],
            b[2],
            0.25,
            c + 4.4,
            c + 5,
            6,
            Rt([1, 0.85, 0.6], Tt.lamp),
            0.3,
          ));
      }
  (s0(n, i.L(0, -r), i.L(l, -r), c, Cb),
    s0(n, i.L(0, r), i.L(l, r), c, Cb),
    s0(n, i.L(l, -r), i.L(l, r), c, Cb));
  let p = Rt([0.38, 0.38, 0.35], Tt.conc);
  for (let m = 0; m < 7; m++) {
    let g = 150 + m * 17,
      b = -r - 6 - (m % 2) * 16,
      v = 14,
      x = 6;
    i.box(n, g, b - x / 2, g + v, b + x / 2, -0.4, 0.35, p);
    let y = hk(m + 3);
    for (let M = 0; M < 6 + (m % 3); M++)
      hdt(
        n,
        i,
        g + 1.5 + y() * (v - 3),
        b + (y() - 0.5) * (x - 1.5),
        0.35,
        y() * 6.28,
        y,
      );
  }
}
var hk = (o) => () => (o = (o * 16807) % 2147483647) / 2147483647;
function hdt(o, t, e, s, n, i, a) {
  let r = 1.8 + a() * 0.6,
    l = a() < 0.4,
    c = Rt([0.23 + a() * 0.08, 0.16 + a() * 0.05, 0.1], Tt.paint),
    h = Math.cos(i),
    f = Math.sin(i),
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
    let v = (m - 0.5) * r,
      x = t.P(e + h * v, n + g, s + f * v);
    (u.push(x), d.push(b * (r / 2.1)));
  }
  Qi(o, u, d, 6, c);
  for (let m of [-1, 1]) {
    let g = 0.12 * r,
      b = t.P(e + h * g - f * m * 0.2, n + 0.12, s + f * g + h * m * 0.2),
      v = t.P(e + h * g - f * m * 0.6, n + 0.02, s + f * g + h * m * 0.6);
    rs(o, b, v, 0.25, 0.05, c);
  }
}
