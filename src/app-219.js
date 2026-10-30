// app 219 — math
// Lines 116801-116967 of readable/app.pretty.js (statement-aligned).
var Bx = [
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
  ].map(FY),
  BY = [
    [0.9, 0.9, 0.9, 1 / 7],
    [1.7, 1.7, 1.66, 1 / 7],
    [1.35, 1.25, 1.1, 1 / 7],
    [1.1, 1.08, 1.05, 1 / 7],
  ],
  Cxt = 0;
function Lxt(o, t, e) {
  let { x0: s, z0: n, x1: i, z1: a, front: r } = e,
    l = o.TEX,
    c = o.C((s + i) / 2, (n + a) / 2),
    h = (A) => (c[A] ||= new Be()),
    f =
      r === "n"
        ? [
            [s, n],
            [i, n],
          ]
        : r === "s"
          ? [
              [s, a],
              [i, a],
            ]
          : r === "w"
            ? [
                [s, n],
                [s, a],
              ]
            : [
                [i, n],
                [i, a],
              ],
    u = Math.max($t(...f[0]), $t(...f[1])) + Ze,
    d = Math.min($t(s, n), $t(i, n), $t(s, a), $t(i, a)) - 0.3,
    p = u + e.h,
    m = ++Cxt,
    g = [
      [i, n, s, n, "n"],
      [i, a, i, n, "e"],
      [s, a, i, a, "s"],
      [s, n, s, a, "w"],
    ],
    b = [
      ...e.color.map((A) => 0.72 * (0.6 + (0.4 * A) / Math.max(...e.color))),
      0,
    ],
    v = l?.fronts?.[e.grp]?.cells.filter((A) => A.style === e.grp);
  if (v?.length && o.mats["f_" + e.grp]) {
    let A = v[Math.floor(e.seed * 997) % v.length],
      T = 0.94 + 0.12 * js(m, 3),
      E = [T, T, T, (A.cell + 0.5) / 64];
    for (let [R, P, C, I, L] of g) {
      let F = Math.hypot(C - R, I - P);
      if (L === r || e.street?.[L]) {
        let O = L === r ? A : v[(v.indexOf(A) + 1) % v.length],
          B = Math.max(1, Math.round(F / O.w)),
          H = (m % 61) * 3 + (L === r ? 0 : 1),
          N = L === r ? E : [T, T, T, (O.cell + 0.5) / 64],
          D = L === r ? u : Math.max($t(R, P), $t(C, I)) + Ze,
          U = (d - D) / (p - D);
        h("f_" + e.grp).quad(
          [R, d, P],
          [C, d, I],
          [C, p, I],
          [R, p, P],
          [H, U],
          [H + B - 1e-4, U],
          [H + B - 1e-4, 1],
          [H, 1],
          N,
          [-(I - P) / F, 0, (C - R) / F],
        );
      } else
        h(e.seed < 0.5 ? "w_siding" : "w_stucco").wall(
          R,
          P,
          C,
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
      [i, p - 0.6, a],
      [i, p - 0.6, n],
      [s, p - 0.6, n],
      [s, a],
      [i, a],
      [i, n],
      [s, n],
      BY[m % BY.length],
      [0, 1, 0],
    );
  } else {
    for (let [A, T, E, R, P] of g)
      c.facade.wall(
        A,
        T,
        E,
        R,
        d,
        d,
        p,
        p,
        [...e.color, (P === r || e.street?.[P] ? 0 : 8) / 16 + 0.5 / 16],
        0,
        u,
      );
    c.roof.quad(
      [s, p - 0.6, a],
      [i, p - 0.6, a],
      [i, p - 0.6, n],
      [s, p - 0.6, n],
      [s, a],
      [i, a],
      [i, n],
      [s, n],
      [0.3, 0.3, 0.3, 0],
      [0, 1, 0],
    );
  }
  c.roof.box(s, n, i, a, p - 0.6, p + 0.12, [0.78, 0.77, 0.73, 0], { top: !1 });
  let x = 0.32,
    y = [0.8, 0.79, 0.75, 8.5 / 16],
    M = p - 0.25,
    S = p + 0.12;
  r === "n"
    ? c.facade.box(s, n - x, i, n, M, S, y, { sides: [1, 0, 0, 1] })
    : r === "s"
      ? c.facade.box(s, a, i, a + x, M, S, y, { sides: [0, 1, 1, 0] })
      : r === "w"
        ? c.facade.box(s - x, n, s, a, M, S, y, { sides: [1, 0, 1, 1] })
        : c.facade.box(i, n, i + x, a, M, S, y, { sides: [1, 1, 1, 0] });
  let w = Fa(m * 31),
    _ = s + 1 + w() * (i - s - 2),
    z = n + 1 + w() * (a - n - 2);
  c.roof.box(
    _ - 0.35,
    z - 0.28,
    _ + 0.35,
    z + 0.28,
    p - 0.6,
    p + 1.2 + w() * 0.8,
    [0.42, 0.2, 0.14, 0],
  );
}
