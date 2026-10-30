// app 53 — math
// Lines 62363-62675 of readable/app.pretty.js (statement-aligned).
var pdt = (o) => o;
Pn();
await oc();
await up();
var X7 = [15, 21];
function vW(o) {
  for (let [t, e] of [
    ["justin", K7],
    ["cupid", Y7],
  ])
    try {
      e(o);
    } catch (s) {
      console.error("waterfront plazas:", t, s);
    }
}
function K7({ B: o, colliders: t, inst: e }, s = {}) {
  let n = o.R("justin"),
    i = n.solid,
    a = Hi(...X7),
    r = $t((a.x0 + a.x1) / 2, (a.z0 + a.z1) / 2) + Ze,
    l = a.z1 - 22;
  s.real ||
    ($i(
      i,
      [
        [a.x0, r, a.z0],
        [a.x1, r, a.z0],
        [a.x1, r, a.z1],
        [a.x0, r, a.z1],
      ],
      Rt([0.4, 0.25, 0.19], Tt.pavers),
    ),
    $i(
      i,
      [
        [a.x0 + 3, r + 0.05, l],
        [a.x0 + 48, r + 0.05, l],
        [a.x0 + 48, r + 0.05, a.z1 - 3],
        [a.x0 + 3, r + 0.05, a.z1 - 3],
      ],
      Rt([0.09, 0.17, 0.05], Tt.lawn),
    ),
    zs(
      i,
      a.x0 + 2.8,
      r - 0.1,
      l - 0.2,
      a.x0 + 48.2,
      r + 0.3,
      a.z1 - 2.8,
      Rt([0.55, 0.53, 0.49], Tt.conc),
      { top: !1 },
    ));
  let c = s.real ? (m, g) => $t(m, g) + Ze : () => r;
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
    box: (m, g, b, v, x, y, M, S, w) => {
      let _ = c((g + v) / 2, (b + x) / 2);
      zs(
        m,
        Math.min(g, v),
        y + _ - 3,
        Math.min(b, x),
        Math.max(g, v),
        M + _ - 3,
        Math.max(b, x),
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
      (ih(i, h, a.x0 + 10 + m * 8, l - 1.5, -1),
      t.push({
        t: "box",
        x0: a.x0 + 9 + m * 8,
        z0: l - 1.8,
        x1: a.x0 + 11 + m * 8,
        z1: l - 1.2,
      }));
  s.real ||
    (gdt(i, a.x1 - 9, a.z1 - 9, c(a.x1 - 9, a.z1 - 9)),
    t.push({ t: "circ", x: a.x1 - 9, z: a.z1 - 9, r: 1.8 }));
  let f = a.x1 - 52,
    u = a.x1 - 4,
    d = a.z0 + 4,
    p = a.z0 + 34;
  {
    let m = c((f + u) / 2, (d + p) / 2);
    mdt(i, t, f, u, d, p, m, s.real);
  }
}
function mdt(o, t, e, s, n, i, a, r = !1) {
  let l = r ? a + 0.12 : a - 0.35,
    c = Rt([0.52, 0.5, 0.46], Tt.conc),
    h = Rt([0.44, 0.42, 0.39], Tt.conc),
    f = Rt([0.1, 0.16, 0.17], Tt.water),
    u = Rt([0.42, 0.5, 0.53], Tt.water);
  (nk(
    o,
    [
      [e, n, s, n + 0.6],
      [e, i - 0.6, s, i],
      [e, n, e + 0.6, i],
      [s - 0.6, n, s, i],
    ].map(([v, x, y, M]) => [v, a - 0.8, x, y, a + 0.5, M]),
    c,
  ),
    $i(
      o,
      [
        [e, l, n],
        [s, l, n],
        [s, l, i],
        [e, l, i],
      ],
      f,
    ),
    t.push({ t: "box", x0: e, z0: n, x1: s, z1: i }),
    nk(
      o,
      [
        [e + 3, n + 18, e + 16, n + 22],
        [e + 14, n + 10, e + 18, n + 22],
        [e + 16, n + 10, e + 26, n + 14],
      ].map(([v, x, y, M]) => [v, l - 0.5, x, y, a + 0.2, M]),
      h,
    ));
  let d = (v, x, y = c) => {
      let M = [];
      for (let _ = 0; _ + 1 < v.length; _++) {
        let z = v[_],
          A = v[_ + 1],
          T = z.map((E, R) => Math.abs(E - A[R]) > 1e-6);
        if (T.filter(Boolean).length !== 1) {
          rs(o, z, A, x, x, y, !0);
          continue;
        }
        M.push([
          ...z.map((E, R) => Math.min(E, A[R]) - (T[R] ? 0 : x / 2)),
          ...z.map((E, R) => Math.max(E, A[R]) + (T[R] ? 0 : x / 2)),
        ]);
      }
      nk(o, M, y);
      let S = v[v.length - 1],
        w = v[v.length - 2];
      if (S[1] > a + 2) {
        let _ = S[0] - w[0],
          z = S[2] - w[2],
          A = Math.hypot(_, z) || 1,
          T = S[0] + (_ / A) * 0.4,
          E = S[2] + (z / A) * 0.4,
          R = x * 0.42,
          P = -z / A,
          C = _ / A;
        (Ms(
          o,
          [T - P * R, S[1] - x * 0.3, E - C * R],
          [T + P * R, S[1] - x * 0.3, E + C * R],
          [T + P * R * 1.2 + (_ / A) * 1.2, l, E + C * R * 1.2 + (z / A) * 1.2],
          [T - P * R * 1.2 + (_ / A) * 1.2, l, E - C * R * 1.2 + (z / A) * 1.2],
          u,
          [T + (_ / A) * 10, S[1], E + (z / A) * 10],
        ),
          Ms(
            o,
            [T - P * R, S[1] - x * 0.3, E - C * R],
            [T + P * R, S[1] - x * 0.3, E + C * R],
            [
              T + P * R * 1.2 + (_ / A) * 1.2,
              l,
              E + C * R * 1.2 + (z / A) * 1.2,
            ],
            [
              T - P * R * 1.2 + (_ / A) * 1.2,
              l,
              E - C * R * 1.2 + (z / A) * 1.2,
            ],
            u,
            [T - (_ / A) * 10, S[1], E - (z / A) * 10],
          ));
      }
    },
    p = (e + s) / 2 + 4,
    m = (n + i) / 2,
    g = a,
    b = (v, x, y) => [p + v, g + x, m + y];
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
function gdt(o, t, e, s) {
  let n = Rt([0.5, 0.52, 0.54], Tt.metal),
    i = 17 / 9.2,
    a = (r, l, c = 0) => [t + r * i, s + l * i, e + c * i];
  zs(
    o,
    t - 2.2,
    s,
    e - 2.2,
    t + 2.2,
    s + 0.5,
    e + 2.2,
    Rt([0.45, 0.44, 0.42], Tt.conc),
  );
  for (let r of [-1, 1])
    Qi(
      o,
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
    Qi(
      o,
      [
        a(r * 0.28, 0.27, 0.05),
        a(r * 0.28, 0.12, 0.22),
        a(r * 0.28, 0.05, 0.32),
      ],
      [0.11, 0.09, 0.06],
      6,
      n,
    );
  (Ws(
    o,
    t,
    e,
    [
      [0.62 * i, s + 4.5 * i],
      [0.66 * i, s + 4.9 * i],
      [0.5 * i, s + 5.6 * i],
      [0.46 * i, s + 6 * i],
      [0.58 * i, s + 6.6 * i],
      [0.62 * i, s + 7 * i],
      [0.3 * i, s + 7.35 * i],
      [0.14 * i, s + 7.45 * i],
      [0.14 * i, s + 7.65 * i],
    ],
    12,
    n,
  ),
    Ws(
      o,
      t,
      e + 0.04 * i,
      [
        [0.14 * i, s + 7.62 * i],
        [0.24 * i, s + 7.85 * i],
        [0.25 * i, s + 8.1 * i],
        [0.17 * i, s + 8.35 * i],
        [0.02 * i, s + 8.45 * i],
      ],
      10,
      n,
    ));
  for (let r of [-1, 1])
    Qi(
      o,
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
