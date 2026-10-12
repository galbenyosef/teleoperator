// app 220 — math
// Lines 116545-116711 of readable/app.pretty.js (statement-aligned).
var Jb = [
    "#8fb3c9",
    "#a7c4a0",
    "#e8d9a8",
    "#d9a7a0",
    "#c6c8cc",
    "#f1ede4",
    "#7d9bb5",
    "#b6a3c7",
    "#e0c07a",
    "#9cb8a9",
    "#d7b8a2",
    "#e6cfd4",
    "#f2e6c9",
  ].map(CX),
  IX = [
    [0.9, 0.9, 0.9, 1 / 7],
    [1.7, 1.7, 1.66, 1 / 7],
    [1.35, 1.25, 1.1, 1 / 7],
    [1.1, 1.08, 1.05, 1 / 7],
  ],
  l2t = 0;
function c2t(i, t, e) {
  let { x0: s, z0: n, x1: o, z1: a, front: r } = e,
    l = i.TEX,
    c = i.C((s + o) / 2, (n + a) / 2),
    h = (R) => (c[R] ||= new Ce()),
    f =
      r === "n"
        ? [
            [s, n],
            [o, n],
          ]
        : r === "s"
          ? [
              [s, a],
              [o, a],
            ]
          : r === "w"
            ? [
                [s, n],
                [s, a],
              ]
            : [
                [o, n],
                [o, a],
              ],
    u = Math.max(Yt(...f[0]), Yt(...f[1])) + Ke,
    d = Math.min(Yt(s, n), Yt(o, n), Yt(s, a), Yt(o, a)) - 0.3,
    p = u + e.h,
    m = ++l2t,
    g = [
      [o, n, s, n, "n"],
      [o, a, o, n, "e"],
      [s, a, o, a, "s"],
      [s, n, s, a, "w"],
    ],
    b = [
      ...e.color.map((R) => 0.72 * (0.6 + (0.4 * R) / Math.max(...e.color))),
      0,
    ],
    x = l?.fronts?.[e.grp]?.cells.filter((R) => R.style === e.grp);
  if (x?.length && i.mats["f_" + e.grp]) {
    let R = x[Math.floor(e.seed * 997) % x.length],
      T = 0.94 + 0.12 * Ws(m, 3),
      E = [T, T, T, (R.cell + 0.5) / 64];
    for (let [A, C, P, I, L] of g) {
      let F = Math.hypot(P - A, I - C);
      if (L === r || e.street?.[L]) {
        let N = L === r ? R : x[(x.indexOf(R) + 1) % x.length],
          B = Math.max(1, Math.round(F / N.w)),
          H = (m % 61) * 3 + (L === r ? 0 : 1),
          O = L === r ? E : [T, T, T, (N.cell + 0.5) / 64],
          D = L === r ? u : Math.max(Yt(A, C), Yt(P, I)) + Ke,
          U = (d - D) / (p - D);
        h("f_" + e.grp).quad(
          [A, d, C],
          [P, d, I],
          [P, p, I],
          [A, p, C],
          [H, U],
          [H + B - 1e-4, U],
          [H + B - 1e-4, 1],
          [H, 1],
          O,
          [-(I - C) / F, 0, (P - A) / F],
        );
      } else
        h(e.seed < 0.5 ? "w_siding" : "w_stucco").wall(
          A,
          C,
          P,
          I,
          d,
          d,
          p,
          p,
          b,
          0,
          d,
        );
    }
    h("roofT").quad(
      [s, p - 0.6, a],
      [o, p - 0.6, a],
      [o, p - 0.6, n],
      [s, p - 0.6, n],
      [s, a],
      [o, a],
      [o, n],
      [s, n],
      IX[m % IX.length],
      [0, 1, 0],
    );
  } else {
    for (let [R, T, E, A, C] of g)
      c.facade.wall(
        R,
        T,
        E,
        A,
        d,
        d,
        p,
        p,
        [...e.color, (C === r || e.street?.[C] ? 0 : 8) / 16 + 0.5 / 16],
        0,
        u,
      );
    c.roof.quad(
      [s, p - 0.6, a],
      [o, p - 0.6, a],
      [o, p - 0.6, n],
      [s, p - 0.6, n],
      [s, a],
      [o, a],
      [o, n],
      [s, n],
      [0.3, 0.3, 0.3, 0],
      [0, 1, 0],
    );
  }
  c.roof.box(s, n, o, a, p - 0.6, p + 0.12, [0.78, 0.77, 0.73, 0], { top: !1 });
  let v = 0.32,
    y = [0.8, 0.79, 0.75, 8.5 / 16],
    M = p - 0.25,
    S = p + 0.12;
  r === "n"
    ? c.facade.box(s, n - v, o, n, M, S, y, { sides: [1, 0, 0, 1] })
    : r === "s"
      ? c.facade.box(s, a, o, a + v, M, S, y, { sides: [0, 1, 1, 0] })
      : r === "w"
        ? c.facade.box(s - v, n, s, a, M, S, y, { sides: [1, 0, 1, 1] })
        : c.facade.box(o, n, o + v, a, M, S, y, { sides: [1, 1, 1, 0] });
  let w = ka(m * 31),
    z = s + 1 + w() * (o - s - 2),
    _ = n + 1 + w() * (a - n - 2);
  c.roof.box(
    z - 0.35,
    _ - 0.28,
    z + 0.35,
    _ + 0.28,
    p - 0.6,
    p + 1.2 + w() * 0.8,
    [0.42, 0.2, 0.14, 0],
  );
}
