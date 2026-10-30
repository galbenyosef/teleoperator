// app 49 — math
// Lines 61308-61602 of readable/app.pretty.js (statement-aligned).
function ddt(o, t, e, s, n, i) {
  let c = Rt([0.86, 0.85, 0.8], Tt.paint),
    h = Rt([0.08, 0.2, 0.12], Tt.paint),
    f = Rt([0.04, 0.04, 0.04], Tt.paint),
    u = Rt([0.05, 0.06, 0.07], Tt.glass);
  s.box(o, n - 84 / 2, i - 13 / 2, n + 84 / 2, i + 13 / 2, -2.5, 2.2, c, {
    bottom: !1,
  });
  for (let p of [-1, 1])
    Ms(
      o,
      s.P(n + (p * 84) / 2, 2.2, i - 13 / 2),
      s.P(n + (p * 84) / 2, 2.2, i + 13 / 2),
      s.P(n + p * (84 / 2 + 5), 2.2 + 0.2, i),
      s.P(n + p * (84 / 2 + 5), 2.2 + 0.2, i),
      c,
      s.P(n + p * 100, 2.2 + 50, i),
    );
  s.box(
    o,
    n - 84 / 2 + 2,
    i - 11,
    n + 84 / 2 - 2,
    i + 11,
    2.2,
    2.2 + 0.5,
    Rt([0.5, 0.45, 0.4], Tt.planks),
  );
  for (let [p, m, g, b] of [
    [0.5, 1.6, c, !1],
    [1.6, 3, u, !1],
    [3, 3.6, c, !0],
  ])
    s.box(o, n - 34, i - 10, n + 34, i + 10, 2.2 + p, 2.2 + m, g, { top: b });
  s.box(o, n - 35, i - 10.6, n + 35, i + 10.6, 2.2 + 3.6, 2.2 + 3.9, h, {
    bottom: !0,
  });
  for (let [p, m, g, b] of [
    [3.9, 4.8, c, !1],
    [4.8, 6.1, u, !1],
    [6.1, 6.8, c, !0],
  ])
    s.box(o, n - 24, i - 6.5, n + 24, i + 6.5, 2.2 + p, 2.2 + m, g, { top: b });
  s.box(o, n - 25, i - 7, n + 25, i + 7, 2.2 + 6.8, 2.2 + 7.1, h, {
    bottom: !0,
  });
  for (let p of [-1, 1]) {
    for (let [m, g, b, v] of [
      [7.1, 8.2, c, !1],
      [8.2, 9.3, u, !1],
      [9.3, 9.6, c, !0],
    ])
      s.box(
        o,
        n + p * 20 - 2,
        i - 2.5,
        n + p * 20 + 2,
        i + 2.5,
        2.2 + m,
        2.2 + g,
        b,
        { top: v },
      );
    s.box(
      o,
      n + p * 20 - 2.4,
      i - 2.9,
      n + p * 20 + 2.4,
      i + 2.9,
      2.2 + 9.6,
      2.2 + 9.9,
      h,
    );
  }
  for (let p of [-1, 1]) {
    let m = s.P(n, 0, i + p * 11.2),
      g = [];
    for (let M = 0; M <= 12; M++) {
      let S = (M / 12) * Math.PI;
      g.push([Math.cos(S) * 5.5, 2.2 + Math.sin(S) * 5.5]);
    }
    for (let M = 0; M < 12; M++) {
      let [S, w] = g[M],
        [_, z] = g[M + 1];
      (Ms(
        o,
        s.P(n + S, w, i + p * 10.6),
        s.P(n + _, z, i + p * 10.6),
        s.P(n + _, z, i + p * 12.2),
        s.P(n + S, w, i + p * 12.2),
        c,
        s.P(n + (S + _) * 2, (w + z) * 2, i + p * 11.4),
      ),
        Ms(
          o,
          s.P(n, 2.2, i + p * 12.2),
          s.P(n + S, w, i + p * 12.2),
          s.P(n + _, z, i + p * 12.2),
          s.P(n + _, z, i + p * 12.2),
          c,
          s.P(n, 2.2, i + p * 40),
        ));
    }
    let b = t.word("EUREKA", {
        font: "bold 110px Georgia, serif",
        h: 130,
        spacing: 8,
      }),
      v = s.P(n, 2.2 + 2.6, i + p * 12.25),
      x = s.P(p, 0, 0).map((M, S) => M - s.P(0, 0, 0)[S]),
      y = s.P(0, 0, p).map((M, S) => M - s.P(0, 0, 0)[S]);
    W5(e.text, t, b, v, x, [0, 1, 0], y, 5.5, null, xo([0.1, 0.25, 0.15]));
  }
  for (let p of [-1, 1])
    rs(o, s.P(n + p * 5, 2.2 + 6.8, i), s.P(n, 2.2 + 16, i), 0.6, 0.6, f);
  Vs(o, ...s.L(n, i), s.out[0], s.out[1], 7, 0.4, 2.2 + 15.4, 2.2 + 16.6, f);
  let d = s.P(n - 9, 0, i);
  (os(o, d[0], d[2], 1.1, 2.2 + 6.8, 2.2 + 19, 12, f),
    os(
      o,
      d[0],
      d[2],
      1.25,
      2.2 + 18.2,
      2.2 + 19.2,
      12,
      Rt([0.5, 0.35, 0.1], Tt.metal),
    ));
}
function $7({ B: o }, t = {}) {
  let e = o.R("aquatic"),
    s = e.solid,
    n = [],
    i = t.y ?? 3.2,
    a = 7,
    r = Rt([0.55, 0.54, 0.5], Tt.conc),
    l = t.cx ?? he[0] + 190,
    c = t.cz ?? Ye.z - 4,
    h = t.r ?? 250,
    f = t.th0 ?? Math.PI,
    u = t.th1 ?? Math.PI * 1.47,
    d = 48,
    p = (v) => [l + Math.cos(v) * h, c + Math.sin(v) * h],
    m = [];
  for (let v = 0; v <= d; v++) m.push(p(f + (u - f) * (v / d)));
  for (let v = 0; v < d; v++) {
    let [x, y] = m[v],
      [M, S] = m[v + 1],
      w = Math.hypot(M - x, S - y),
      _ = (M - x) / w,
      z = (S - y) / w,
      A = f + ((u - f) * v) / d,
      T = f + ((u - f) * (v + 1)) / d,
      E = (P, C, I) => [l + Math.cos(P) * C, I, c + Math.sin(P) * C],
      R = (P, C, I, L) => {
        (n.push({ points: [E(A, P, L), E(T, P, L), E(T, C, L), E(A, C, L)] }),
          $i(s, [E(A, P, I), E(T, P, I), E(T, C, I), E(A, C, I)], r, !0));
        for (let [F, O] of [
          [P, 0],
          [C, h * 2],
        ])
          Ms(
            s,
            E(A, F, I),
            E(T, F, I),
            E(T, F, L),
            E(A, F, L),
            r,
            E((A + T) / 2, O, L),
          );
        (v ||
          Ms(
            s,
            E(A, P, I),
            E(A, C, I),
            E(A, C, L),
            E(A, P, L),
            r,
            E(A - (T - A), h, L),
          ),
          v === d - 1 &&
            Ms(
              s,
              E(T, P, I),
              E(T, C, I),
              E(T, C, L),
              E(T, P, L),
              r,
              E(T + (T - A), h, L),
            ));
      };
    R(h - a / 2, h + a / 2, i - 0.9, i);
    for (let P of [-1, 1]) {
      let C = h + P * (a / 2 - 0.15);
      if ((R(C - 0.15, C + 0.15, i, i + 1.05), v % 2 === 0)) {
        let I = x - z * P * (a / 2 - 0.15),
          L = y + _ * P * (a / 2 - 0.15);
        os(s, I, L, 0.45, -6, i - 0.9, 8, Lb);
      }
    }
    if (v % 4 === 2) {
      let P = x - z * (a / 2 - 0.6),
        C = y + _ * (a / 2 - 0.6);
      (os(s, P, C, 0.09, i, i + 4.8, 6, Rt([0.6, 0.6, 0.58], Tt.conc), 0.07),
        os(
          s,
          P,
          C,
          0.22,
          i + 4.7,
          i + 5.2,
          6,
          Rt([1, 0.88, 0.65], Tt.lamp),
          0.26,
        ));
    }
  }
  let [g, b] = m[d];
  Ws(
    s,
    g,
    b,
    [
      [9, i - 0.9],
      [9, i],
    ],
    20,
    r,
  );
  for (let v = 0; v < 20; v++) {
    let x = (v * Math.PI) / 10,
      y = ((v + 1) * Math.PI) / 10;
    n.push({
      points: [
        [g, i, b],
        [g + 9 * Math.cos(x), i, b + 9 * Math.sin(x)],
        [g + 9 * Math.cos(y), i, b + 9 * Math.sin(y)],
      ],
    });
  }
  for (let { points: v } of ik(n)) ok(s, v, r);
  Ws(
    s,
    g,
    b,
    [
      [9, i],
      [9, i + 1.05],
      [8.7, i + 1.05],
      [8.7, i],
    ],
    20,
    r,
  );
  for (let v = 0; v < 10; v++) {
    let x = (v / 10) * Math.PI * 2;
    os(
      s,
      g + Math.cos(x) * 8.5,
      b + Math.sin(x) * 8.5,
      0.45,
      -6,
      i - 0.9,
      8,
      Lb,
    );
  }
  if (!t.real) {
    zs(
      s,
      he[0] - 60,
      -1,
      Ye.z - 22,
      he[3] - 30,
      0.6,
      Ye.z,
      Rt([0.62, 0.55, 0.42], Tt.conc),
    );
    for (let v = 0; v < 4; v++)
      zs(
        s,
        he[0] + 20,
        0.6 + v * 0.6,
        Ye.z - 8 + v * 1.6,
        he[2] + 40,
        1.2 + v * 0.6,
        Ye.z - 6.4 + v * 1.6,
        Rt([0.6, 0.59, 0.55], Tt.conc),
      );
  }
}
Pn();
await oc();
Ya();
var Ib = [1, 0];
