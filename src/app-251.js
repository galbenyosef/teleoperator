// app 251 — math
// Lines 127249-127502 of readable/app.pretty.js (statement-aligned).
function Nvt(o, t, e) {
  let { x0: s, z0: n, x1: i, z1: a, front: r, style: l } = t,
    c =
      r === "n"
        ? [(s + i) / 2, n]
        : r === "s"
          ? [(s + i) / 2, a]
          : r === "w"
            ? [s, (n + a) / 2]
            : [i, (n + a) / 2],
    h = $t(c[0], c[1]) + Ze,
    f = Math.min($t(s, n), $t(i, n), $t(s, a), $t(i, a)) - 0.3,
    u = h + t.h,
    d = ++pI.n,
    p = (d % 53) * 7.6 * 11,
    m = [...t.color, Qw(l)],
    g = [...t.color.map((w) => w * 0.92), Qw(Ls.BLANK)],
    b = o.facade,
    v = o.roof,
    x = [
      [i, n, s, n, "n"],
      [i, a, i, n, "e"],
      [s, a, i, a, "s"],
      [s, n, s, a, "w"],
    ],
    y = js(Math.floor(s), Math.floor(n), 5) < 0.5;
  for (let [w, _, z, A, T] of x) {
    let E = T === r,
      R = f,
      P = f;
    b.wall(
      w,
      _,
      z,
      A,
      R,
      P,
      u,
      u,
      E || (y && l !== Ls.VIC) ? m : g,
      E ? p : p + 500,
      h,
    );
  }
  let M = [0.16 + 0.08 * t.seed, 0.16 + 0.07 * t.seed, 0.15 + 0.06 * t.seed, 0];
  v.quad(
    [s, u - 0.8, a],
    [i, u - 0.8, a],
    [i, u - 0.8, n],
    [s, u - 0.8, n],
    [s, a],
    [i, a],
    [i, n],
    [s, n],
    M,
    [0, 1, 0],
  );
  let S = [...dI[d % 3], 0];
  if (
    (v.box(s, n, i, a, u, u + 0.15, S, { top: !1 }), t.h > 14 && t.seed > 0.4)
  ) {
    let w = Math.min(i - s, a - n) * 0.3,
      _ = (s + i) / 2 + (t.seed - 0.5) * 4,
      z = (n + a) / 2;
    v.box(
      _ - w / 2,
      z - w / 2,
      _ + w / 2,
      z + w / 2,
      u - 0.8,
      u + 2.4,
      [0.5, 0.49, 0.46, 0],
    );
  }
  if (
    (l === Ls.OFF || l === Ls.RIB || l === Ls.CUR) &&
    t.h > 60 &&
    Math.min(i - s, a - n) > 20
  ) {
    let w = 4 + t.seed * 4,
      _ = u + 12 + t.seed * 30,
      z = s + w,
      A = i - w,
      T = n + w,
      E = a - w;
    for (let [R, P, C, I] of [
      [A, T, z, T],
      [A, E, A, T],
      [z, E, A, E],
      [z, T, z, E],
    ])
      b.wall(R, P, C, I, u - 1, u - 1, _, _, m, p + 900, h);
    v.quad(
      [z, _, E],
      [A, _, E],
      [A, _, T],
      [z, _, T],
      [z, E],
      [A, E],
      [A, T],
      [z, T],
      M,
      [0, 1, 0],
    );
  }
  if (
    l === Ls.VIC ||
    l === Ls.EDW ||
    l === Ls.APT ||
    l === Ls.MIX ||
    l === Ls.CHN
  ) {
    let w = [...(l === Ls.VIC ? [0.82, 0.8, 0.74] : dI[d % 3]), Qw(Ls.BLANK)],
      _ = l === Ls.VIC ? 0.45 : 0.3,
      z = l === Ls.VIC ? 0.7 : 0.45;
    if (
      (VJ(b, t, r, u - z, u, _, w),
      l === Ls.VIC || (l === Ls.EDW && t.seed < 0.5))
    ) {
      let A = r === "n" || r === "s" ? i - s : a - n;
      for (let T = 0; T + 7.5 <= A + 0.01; T += 7.6)
        Gvt(
          b,
          t,
          r,
          T + 0.55,
          2.9,
          h + 2.9,
          u - z - 0.35,
          m,
          p,
          h,
          l === Ls.VIC,
        );
    }
  }
}
var Hvt = {
    [Ls.VIC]: ["vic", "vic"],
    [Ls.EDW]: ["edw", "edw"],
    [Ls.APT]: ["apt", "apt"],
    [Ls.MIX]: ["mix", "mix"],
    [Ls.CHN]: ["mix", "chn"],
    [Ls.BRK]: ["brk", "brk"],
  },
  Dvt = {
    [Ls.VIC]: ["w_siding", "w_stucco"],
    [Ls.EDW]: ["w_stucco", "w_siding"],
    [Ls.APT]: ["w_stucco", "w_brick"],
    [Ls.MIX]: ["w_stucco", "w_brick"],
    [Ls.CHN]: ["w_stucco", "w_stucco"],
    [Ls.BRK]: ["w_brick", "w_brick"],
  },
  OJ = {
    [Ls.OFF]: [0, 1, 2, 6, 7],
    [Ls.RIB]: [3, 7],
    [Ls.CUR]: [4, 5],
    [Ls.MIX]: [0, 2, 6],
    [Ls.APT]: [1, 7],
  },
  o2 = (o, t) => (o[t] ||= new Be()),
  BJ = [
    [0.9, 0.9, 0.9, 1 / 7],
    [1.7, 1.7, 1.66, 1 / 7],
    [1.35, 1.25, 1.1, 1 / 7],
    [2.1, 2.1, 2.08, 1 / 7],
    [1.1, 1.08, 1.05, 1 / 7],
  ];
function Uvt(o, t, e) {
  let { x0: s, z0: n, x1: i, z1: a, front: r, style: l } = t,
    c = Hvt[l];
  if (!c || !i2.fronts?.[c[0]]) return NJ(o, t);
  let h = i2.fronts[c[0]].cells.filter((w) => w.style === c[1]);
  if (!h.length) return NJ(o, t);
  let f = h[Math.floor(t.seed * 997) % h.length],
    u =
      r === "n"
        ? [(s + i) / 2, n]
        : r === "s"
          ? [(s + i) / 2, a]
          : r === "w"
            ? [s, (n + a) / 2]
            : [i, (n + a) / 2],
    d = $t(u[0], u[1]) + Ze,
    p = Math.min($t(s, n), $t(i, n), $t(s, a), $t(i, a)) - 0.3,
    m = d + t.h,
    g = ++pI.n,
    b = 0.94 + 0.12 * js(g, 3),
    v = [b, b, b, (f.cell + 0.5) / 64],
    x = (p - d) / t.h,
    y = Dvt[l][t.seed < 0.5 ? 0 : 1],
    M = [
      ...t.color.map((w) => 0.72 * (0.6 + (0.4 * w) / Math.max(...t.color))),
      0,
    ],
    S = [
      [i, n, s, n, "n"],
      [i, a, i, n, "e"],
      [s, a, i, a, "s"],
      [s, n, s, a, "w"],
    ];
  for (let [w, _, z, A, T] of S)
    if (T === r || t.street?.[T]) {
      let E = Math.hypot(z - w, A - _),
        R = T === r ? f : h[(h.indexOf(f) + 1) % h.length],
        P = Math.max(1, Math.round(E / R.w)),
        C = (g % 61) * 3 + (T === r ? 0 : 1),
        I = T === r ? v : [b, b, b, (R.cell + 0.5) / 64],
        L = T === r ? d : Math.max($t(w, _), $t(z, A)) + Ze,
        F = (p - L) / (m - L);
      o2(o, "f_" + c[0]).quad(
        [w, p, _],
        [z, p, A],
        [z, m, A],
        [w, m, _],
        [C, T === r ? x : F],
        [C + P - 1e-4, T === r ? x : F],
        [C + P - 1e-4, 1],
        [C, 1],
        I,
        [-(A - _) / E, 0, (z - w) / E],
      );
    } else o2(o, y).wall(w, _, z, A, p, p, m, m, M, 0, p);
  (o2(o, "roofT").quad(
    [s, m - 0.6, a],
    [i, m - 0.6, a],
    [i, m - 0.6, n],
    [s, m - 0.6, n],
    [s, a],
    [i, a],
    [i, n],
    [s, n],
    BJ[g % BJ.length],
    [0, 1, 0],
  ),
    o.roof.box(s, n, i, a, m, m + 0.12, [...dI[g % 3], 0], { top: !1 }),
    VJ(o.facade, t, r, m - 0.25, m + 0.1, 0.28, [
      0.78,
      0.77,
      0.73,
      Qw(Ls.BLANK),
    ]),
    GJ(
      o.roof,
      s,
      n,
      i,
      a,
      m - 0.6,
      g,
      c[0] === "vic" || c[0] === "edw" ? "house" : "flat",
      t.color,
    ));
}
