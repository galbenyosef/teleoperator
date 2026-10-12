// app 54 — math
// Lines 62132-62444 of readable/app.pretty.js (statement-aligned).
var $ct = (i) => i;
En();
Ol();
Ld();
var xR = [15, 21];
function bG(i) {
  for (let [t, e] of [
    ["justin", vR],
    ["cupid", yR],
  ])
    try {
      e(i);
    } catch (s) {
      console.error("waterfront plazas:", t, s);
    }
}
function vR({ B: i, colliders: t, inst: e }, s = {}) {
  let n = i.R("justin"),
    o = n.solid,
    a = Ei(...xR),
    r = Yt((a.x0 + a.x1) / 2, (a.z0 + a.z1) / 2) + Ke,
    l = a.z1 - 22;
  s.real ||
    (Fi(
      o,
      [
        [a.x0, r, a.z0],
        [a.x1, r, a.z0],
        [a.x1, r, a.z1],
        [a.x0, r, a.z1],
      ],
      At([0.4, 0.25, 0.19], Tt.pavers),
    ),
    Fi(
      o,
      [
        [a.x0 + 3, r + 0.05, l],
        [a.x0 + 48, r + 0.05, l],
        [a.x0 + 48, r + 0.05, a.z1 - 3],
        [a.x0 + 3, r + 0.05, a.z1 - 3],
      ],
      At([0.09, 0.17, 0.05], Tt.lawn),
    ),
    Ms(
      o,
      a.x0 + 2.8,
      r - 0.1,
      l - 0.2,
      a.x0 + 48.2,
      r + 0.3,
      a.z1 - 2.8,
      At([0.55, 0.53, 0.49], Tt.conc),
      { top: !1 },
    ));
  let c = s.real ? (m, g) => Yt(m, g) + Ke : () => r;
  for (let m = 0; m < 6; m++) {
    let g = a.x0 + 6 + m * 8,
      b = a.z1 - 1.5;
    (e.push({ kind: "tree", x: g, y: c(g, b), z: b, rot: m * 2.1, scale: 1.1 }),
      t.push({ t: "circ", x: g, z: b, r: 0.4 }));
  }
  for (let m = 0; m < 5; m++) {
    let g = a.x0 + 2,
      b = a.z0 + 6 + m * 9;
    (e.push({ kind: "tree", x: g, y: c(g, b), z: b, rot: m * 1.3, scale: 1 }),
      t.push({ t: "circ", x: g, z: b, r: 0.4 }));
  }
  let h = {
    box: (m, g, b, x, v, y, M, S, w) => {
      let z = c((g + x) / 2, (b + v) / 2);
      Ms(
        m,
        Math.min(g, x),
        y + z - 3,
        Math.min(b, v),
        Math.max(g, x),
        M + z - 3,
        Math.max(b, v),
        S,
        w,
      );
    },
  };
  for (let m = 0; m < 5; m++)
    (s.onRoad &&
      [
        [9, -1.8],
        [11, -1.8],
        [11, -1.2],
        [9, -1.2],
      ].some(([g, b]) => s.onRoad(a.x0 + g + m * 8, l + b))) ||
      (Ac(o, h, a.x0 + 10 + m * 8, l - 1.5, -1),
      t.push({
        t: "box",
        x0: a.x0 + 9 + m * 8,
        z0: l - 1.8,
        x1: a.x0 + 11 + m * 8,
        z1: l - 1.2,
      }));
  s.real ||
    (Kct(o, a.x1 - 9, a.z1 - 9, c(a.x1 - 9, a.z1 - 9)),
    t.push({ t: "circ", x: a.x1 - 9, z: a.z1 - 9, r: 1.8 }));
  let f = a.x1 - 52,
    u = a.x1 - 4,
    d = a.z0 + 4,
    p = a.z0 + 34;
  {
    let m = c((f + u) / 2, (d + p) / 2);
    Xct(o, t, f, u, d, p, m, s.real);
  }
}
function Xct(i, t, e, s, n, o, a, r = !1) {
  let l = r ? a + 0.12 : a - 0.35,
    c = At([0.52, 0.5, 0.46], Tt.conc),
    h = At([0.44, 0.42, 0.39], Tt.conc),
    f = At([0.1, 0.16, 0.17], Tt.water),
    u = At([0.42, 0.5, 0.53], Tt.water);
  (eS(
    i,
    [
      [e, n, s, n + 0.6],
      [e, o - 0.6, s, o],
      [e, n, e + 0.6, o],
      [s - 0.6, n, s, o],
    ].map(([x, v, y, M]) => [x, a - 0.8, v, y, a + 0.5, M]),
    c,
  ),
    Fi(
      i,
      [
        [e, l, n],
        [s, l, n],
        [s, l, o],
        [e, l, o],
      ],
      f,
    ),
    t.push({ t: "box", x0: e, z0: n, x1: s, z1: o }),
    eS(
      i,
      [
        [e + 3, n + 18, e + 16, n + 22],
        [e + 14, n + 10, e + 18, n + 22],
        [e + 16, n + 10, e + 26, n + 14],
      ].map(([x, v, y, M]) => [x, l - 0.5, v, y, a + 0.2, M]),
      h,
    ));
  let d = (x, v, y = c) => {
      let M = [];
      for (let z = 0; z + 1 < x.length; z++) {
        let _ = x[z],
          R = x[z + 1],
          T = _.map((E, A) => Math.abs(E - R[A]) > 1e-6);
        if (T.filter(Boolean).length !== 1) {
          ss(i, _, R, v, v, y, !0);
          continue;
        }
        M.push([
          ..._.map((E, A) => Math.min(E, R[A]) - (T[A] ? 0 : v / 2)),
          ..._.map((E, A) => Math.max(E, R[A]) + (T[A] ? 0 : v / 2)),
        ]);
      }
      eS(i, M, y);
      let S = x[x.length - 1],
        w = x[x.length - 2];
      if (S[1] > a + 2) {
        let z = S[0] - w[0],
          _ = S[2] - w[2],
          R = Math.hypot(z, _) || 1,
          T = S[0] + (z / R) * 0.4,
          E = S[2] + (_ / R) * 0.4,
          A = v * 0.42,
          C = -_ / R,
          P = z / R;
        (xs(
          i,
          [T - C * A, S[1] - v * 0.3, E - P * A],
          [T + C * A, S[1] - v * 0.3, E + P * A],
          [T + C * A * 1.2 + (z / R) * 1.2, l, E + P * A * 1.2 + (_ / R) * 1.2],
          [T - C * A * 1.2 + (z / R) * 1.2, l, E - P * A * 1.2 + (_ / R) * 1.2],
          u,
          [T + (z / R) * 10, S[1], E + (_ / R) * 10],
        ),
          xs(
            i,
            [T - C * A, S[1] - v * 0.3, E - P * A],
            [T + C * A, S[1] - v * 0.3, E + P * A],
            [
              T + C * A * 1.2 + (z / R) * 1.2,
              l,
              E + P * A * 1.2 + (_ / R) * 1.2,
            ],
            [
              T - C * A * 1.2 + (z / R) * 1.2,
              l,
              E - P * A * 1.2 + (_ / R) * 1.2,
            ],
            u,
            [T - (z / R) * 10, S[1], E - (_ / R) * 10],
          ));
      }
    },
    p = (e + s) / 2 + 4,
    m = (n + o) / 2,
    g = a,
    b = (x, v, y) => [p + x, g + v, m + y];
  (d([b(-12, -1, -4), b(-12, 9, -4), b(-4, 9, -4), b(-4, 9, 3)], 2.2),
    d([b(-8, -1, 5), b(-8, 6.5, 5), b(2, 6.5, 5), b(2, 11, 5), b(8, 11, 5)], 2),
    d([b(-1, -1, -6), b(-1, 12.5, -6), b(-1, 12.5, 1), b(6, 12.5, 1)], 2.4, h),
    d(
      [
        b(4, -1, -2),
        b(4, 4.5, -2),
        b(11, 4.5, -2),
        b(11, 8.5, -2),
        b(11, 8.5, -8),
      ],
      1.8,
    ),
    d([b(-5, -1, 0), b(-5, 3.5, 0), b(-5, 3.5, -9), b(3, 3.5, -9)], 1.7, h),
    d([b(7, -1, 6), b(7, 7.5, 6), b(7, 7.5, 11)], 1.9),
    d([b(-14, -1, 8), b(-14, 4, 8), b(-9, 4, 8)], 1.6),
    d([b(1, -1, 9), b(1, 3, 9), b(1, 9, 9), b(-4, 9, 9), b(-4, 9, 12)], 1.8, h),
    d([b(-3, 12.5, -6), b(-8, 14.5, -6), b(-8, 14.5, 0)], 1.6),
    d([b(9, -1, -6), b(9, 2.5, -6), b(13, 2.5, -6)], 1.5, h));
}
function Kct(i, t, e, s) {
  let n = At([0.5, 0.52, 0.54], Tt.metal),
    o = 17 / 9.2,
    a = (r, l, c = 0) => [t + r * o, s + l * o, e + c * o];
  Ms(
    i,
    t - 2.2,
    s,
    e - 2.2,
    t + 2.2,
    s + 0.5,
    e + 2.2,
    At([0.45, 0.44, 0.42], Tt.conc),
  );
  for (let r of [-1, 1])
    Wi(
      i,
      [
        a(r * 0.28, 0.27),
        a(r * 0.3, 1.2, 0.05),
        a(r * 0.28, 2.3, -0.04),
        a(r * 0.3, 3.5, 0.02),
        a(r * 0.36, 4.6, 0),
      ],
      [0.1, 0.15, 0.2, 0.28, 0.36],
      8,
      n,
    );
  for (let r of [-1, 1])
    Wi(
      i,
      [
        a(r * 0.28, 0.27, 0.05),
        a(r * 0.28, 0.12, 0.22),
        a(r * 0.28, 0.05, 0.32),
      ],
      [0.11, 0.09, 0.06],
      6,
      n,
    );
  (Gs(
    i,
    t,
    e,
    [
      [0.62 * o, s + 4.5 * o],
      [0.66 * o, s + 4.9 * o],
      [0.5 * o, s + 5.6 * o],
      [0.46 * o, s + 6 * o],
      [0.58 * o, s + 6.6 * o],
      [0.62 * o, s + 7 * o],
      [0.3 * o, s + 7.35 * o],
      [0.14 * o, s + 7.45 * o],
      [0.14 * o, s + 7.65 * o],
    ],
    12,
    n,
  ),
    Gs(
      i,
      t,
      e + 0.04 * o,
      [
        [0.14 * o, s + 7.62 * o],
        [0.24 * o, s + 7.85 * o],
        [0.25 * o, s + 8.1 * o],
        [0.17 * o, s + 8.35 * o],
        [0.02 * o, s + 8.45 * o],
      ],
      10,
      n,
    ));
  for (let r of [-1, 1])
    Wi(
      i,
      [
        a(r * 0.55, 6.95),
        a(r * 0.72, 7.6, 0.05),
        a(r * 0.7, 8.3, 0.08),
        a(r * 0.5, 9, 0.05),
        a(r * 0.32, 9.2),
      ],
      [0.16, 0.14, 0.12, 0.1, 0.08],
      8,
      n,
    );
}
