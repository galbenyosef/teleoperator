// app 50 — math
// Lines 61077-61371 of readable/app.pretty.js (statement-aligned).
function Vct(i, t, e, s, n, o) {
  let c = At([0.86, 0.85, 0.8], Tt.paint),
    h = At([0.08, 0.2, 0.12], Tt.paint),
    f = At([0.04, 0.04, 0.04], Tt.paint),
    u = At([0.05, 0.06, 0.07], Tt.glass);
  s.box(i, n - 84 / 2, o - 13 / 2, n + 84 / 2, o + 13 / 2, -2.5, 2.2, c, {
    bottom: !1,
  });
  for (let p of [-1, 1])
    xs(
      i,
      s.P(n + (p * 84) / 2, 2.2, o - 13 / 2),
      s.P(n + (p * 84) / 2, 2.2, o + 13 / 2),
      s.P(n + p * (84 / 2 + 5), 2.2 + 0.2, o),
      s.P(n + p * (84 / 2 + 5), 2.2 + 0.2, o),
      c,
      s.P(n + p * 100, 2.2 + 50, o),
    );
  s.box(
    i,
    n - 84 / 2 + 2,
    o - 11,
    n + 84 / 2 - 2,
    o + 11,
    2.2,
    2.2 + 0.5,
    At([0.5, 0.45, 0.4], Tt.planks),
  );
  for (let [p, m, g, b] of [
    [0.5, 1.6, c, !1],
    [1.6, 3, u, !1],
    [3, 3.6, c, !0],
  ])
    s.box(i, n - 34, o - 10, n + 34, o + 10, 2.2 + p, 2.2 + m, g, { top: b });
  s.box(i, n - 35, o - 10.6, n + 35, o + 10.6, 2.2 + 3.6, 2.2 + 3.9, h, {
    bottom: !0,
  });
  for (let [p, m, g, b] of [
    [3.9, 4.8, c, !1],
    [4.8, 6.1, u, !1],
    [6.1, 6.8, c, !0],
  ])
    s.box(i, n - 24, o - 6.5, n + 24, o + 6.5, 2.2 + p, 2.2 + m, g, { top: b });
  s.box(i, n - 25, o - 7, n + 25, o + 7, 2.2 + 6.8, 2.2 + 7.1, h, {
    bottom: !0,
  });
  for (let p of [-1, 1]) {
    for (let [m, g, b, x] of [
      [7.1, 8.2, c, !1],
      [8.2, 9.3, u, !1],
      [9.3, 9.6, c, !0],
    ])
      s.box(
        i,
        n + p * 20 - 2,
        o - 2.5,
        n + p * 20 + 2,
        o + 2.5,
        2.2 + m,
        2.2 + g,
        b,
        { top: x },
      );
    s.box(
      i,
      n + p * 20 - 2.4,
      o - 2.9,
      n + p * 20 + 2.4,
      o + 2.9,
      2.2 + 9.6,
      2.2 + 9.9,
      h,
    );
  }
  for (let p of [-1, 1]) {
    let m = s.P(n, 0, o + p * 11.2),
      g = [];
    for (let M = 0; M <= 12; M++) {
      let S = (M / 12) * Math.PI;
      g.push([Math.cos(S) * 5.5, 2.2 + Math.sin(S) * 5.5]);
    }
    for (let M = 0; M < 12; M++) {
      let [S, w] = g[M],
        [z, _] = g[M + 1];
      (xs(
        i,
        s.P(n + S, w, o + p * 10.6),
        s.P(n + z, _, o + p * 10.6),
        s.P(n + z, _, o + p * 12.2),
        s.P(n + S, w, o + p * 12.2),
        c,
        s.P(n + (S + z) * 2, (w + _) * 2, o + p * 11.4),
      ),
        xs(
          i,
          s.P(n, 2.2, o + p * 12.2),
          s.P(n + S, w, o + p * 12.2),
          s.P(n + z, _, o + p * 12.2),
          s.P(n + z, _, o + p * 12.2),
          c,
          s.P(n, 2.2, o + p * 40),
        ));
    }
    let b = t.word("EUREKA", {
        font: "bold 110px Georgia, serif",
        h: 130,
        spacing: 8,
      }),
      x = s.P(n, 2.2 + 2.6, o + p * 12.25),
      v = s.P(p, 0, 0).map((M, S) => M - s.P(0, 0, 0)[S]),
      y = s.P(0, 0, p).map((M, S) => M - s.P(0, 0, 0)[S]);
    K5(e.text, t, b, x, v, [0, 1, 0], y, 5.5, null, oo([0.1, 0.25, 0.15]));
  }
  for (let p of [-1, 1])
    ss(i, s.P(n + p * 5, 2.2 + 6.8, o), s.P(n, 2.2 + 16, o), 0.6, 0.6, f);
  Us(i, ...s.L(n, o), s.out[0], s.out[1], 7, 0.4, 2.2 + 15.4, 2.2 + 16.6, f);
  let d = s.P(n - 9, 0, o);
  (es(i, d[0], d[2], 1.1, 2.2 + 6.8, 2.2 + 19, 12, f),
    es(
      i,
      d[0],
      d[2],
      1.25,
      2.2 + 18.2,
      2.2 + 19.2,
      12,
      At([0.5, 0.35, 0.1], Tt.metal),
    ));
}
function bR({ B: i }, t = {}) {
  let e = i.R("aquatic"),
    s = e.solid,
    n = [],
    o = t.y ?? 3.2,
    a = 7,
    r = At([0.55, 0.54, 0.5], Tt.conc),
    l = t.cx ?? ae[0] + 190,
    c = t.cz ?? Ve.z - 4,
    h = t.r ?? 250,
    f = t.th0 ?? Math.PI,
    u = t.th1 ?? Math.PI * 1.47,
    d = 48,
    p = (x) => [l + Math.cos(x) * h, c + Math.sin(x) * h],
    m = [];
  for (let x = 0; x <= d; x++) m.push(p(f + (u - f) * (x / d)));
  for (let x = 0; x < d; x++) {
    let [v, y] = m[x],
      [M, S] = m[x + 1],
      w = Math.hypot(M - v, S - y),
      z = (M - v) / w,
      _ = (S - y) / w,
      R = f + ((u - f) * x) / d,
      T = f + ((u - f) * (x + 1)) / d,
      E = (C, P, I) => [l + Math.cos(C) * P, I, c + Math.sin(C) * P],
      A = (C, P, I, L) => {
        (n.push({ points: [E(R, C, L), E(T, C, L), E(T, P, L), E(R, P, L)] }),
          Fi(s, [E(R, C, I), E(T, C, I), E(T, P, I), E(R, P, I)], r, !0));
        for (let [F, N] of [
          [C, 0],
          [P, h * 2],
        ])
          xs(
            s,
            E(R, F, I),
            E(T, F, I),
            E(T, F, L),
            E(R, F, L),
            r,
            E((R + T) / 2, N, L),
          );
        (x ||
          xs(
            s,
            E(R, C, I),
            E(R, P, I),
            E(R, P, L),
            E(R, C, L),
            r,
            E(R - (T - R), h, L),
          ),
          x === d - 1 &&
            xs(
              s,
              E(T, C, I),
              E(T, P, I),
              E(T, P, L),
              E(T, C, L),
              r,
              E(T + (T - R), h, L),
            ));
      };
    A(h - a / 2, h + a / 2, o - 0.9, o);
    for (let C of [-1, 1]) {
      let P = h + C * (a / 2 - 0.15);
      if ((A(P - 0.15, P + 0.15, o, o + 1.05), x % 2 === 0)) {
        let I = v - _ * C * (a / 2 - 0.15),
          L = y + z * C * (a / 2 - 0.15);
        es(s, I, L, 0.45, -6, o - 0.9, 8, qg);
      }
    }
    if (x % 4 === 2) {
      let C = v - _ * (a / 2 - 0.6),
        P = y + z * (a / 2 - 0.6);
      (es(s, C, P, 0.09, o, o + 4.8, 6, At([0.6, 0.6, 0.58], Tt.conc), 0.07),
        es(
          s,
          C,
          P,
          0.22,
          o + 4.7,
          o + 5.2,
          6,
          At([1, 0.88, 0.65], Tt.lamp),
          0.26,
        ));
    }
  }
  let [g, b] = m[d];
  Gs(
    s,
    g,
    b,
    [
      [9, o - 0.9],
      [9, o],
    ],
    20,
    r,
  );
  for (let x = 0; x < 20; x++) {
    let v = (x * Math.PI) / 10,
      y = ((x + 1) * Math.PI) / 10;
    n.push({
      points: [
        [g, o, b],
        [g + 9 * Math.cos(v), o, b + 9 * Math.sin(v)],
        [g + 9 * Math.cos(y), o, b + 9 * Math.sin(y)],
      ],
    });
  }
  for (let { points: x } of sS(n)) nS(s, x, r);
  Gs(
    s,
    g,
    b,
    [
      [9, o],
      [9, o + 1.05],
      [8.7, o + 1.05],
      [8.7, o],
    ],
    20,
    r,
  );
  for (let x = 0; x < 10; x++) {
    let v = (x / 10) * Math.PI * 2;
    es(
      s,
      g + Math.cos(v) * 8.5,
      b + Math.sin(v) * 8.5,
      0.45,
      -6,
      o - 0.9,
      8,
      qg,
    );
  }
  if (!t.real) {
    Ms(
      s,
      ae[0] - 60,
      -1,
      Ve.z - 22,
      ae[3] - 30,
      0.6,
      Ve.z,
      At([0.62, 0.55, 0.42], Tt.conc),
    );
    for (let x = 0; x < 4; x++)
      Ms(
        s,
        ae[0] + 20,
        0.6 + x * 0.6,
        Ve.z - 8 + x * 1.6,
        ae[2] + 40,
        1.2 + x * 0.6,
        Ve.z - 6.4 + x * 1.6,
        At([0.6, 0.59, 0.55], Tt.conc),
      );
  }
}
En();
Ol();
Oa();
var jg = [1, 0];
