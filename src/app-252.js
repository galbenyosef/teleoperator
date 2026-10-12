// app 252 — math
// Lines 126990-127243 of readable/app.pretty.js (statement-aligned).
function pgt(i, t, e) {
  let { x0: s, z0: n, x1: o, z1: a, front: r, style: l } = t,
    c =
      r === "n"
        ? [(s + o) / 2, n]
        : r === "s"
          ? [(s + o) / 2, a]
          : r === "w"
            ? [s, (n + a) / 2]
            : [o, (n + a) / 2],
    h = Yt(c[0], c[1]) + Ke,
    f = Math.min(Yt(s, n), Yt(o, n), Yt(s, a), Yt(o, a)) - 0.3,
    u = h + t.h,
    d = ++OC.n,
    p = (d % 53) * 7.6 * 11,
    m = [...t.color, iw(l)],
    g = [...t.color.map((w) => w * 0.92), iw(Rs.BLANK)],
    b = i.facade,
    x = i.roof,
    v = [
      [o, n, s, n, "n"],
      [o, a, o, n, "e"],
      [s, a, o, a, "s"],
      [s, n, s, a, "w"],
    ],
    y = Ws(Math.floor(s), Math.floor(n), 5) < 0.5;
  for (let [w, z, _, R, T] of v) {
    let E = T === r,
      A = f,
      C = f;
    b.wall(
      w,
      z,
      _,
      R,
      A,
      C,
      u,
      u,
      E || (y && l !== Rs.VIC) ? m : g,
      E ? p : p + 500,
      h,
    );
  }
  let M = [0.16 + 0.08 * t.seed, 0.16 + 0.07 * t.seed, 0.15 + 0.06 * t.seed, 0];
  x.quad(
    [s, u - 0.8, a],
    [o, u - 0.8, a],
    [o, u - 0.8, n],
    [s, u - 0.8, n],
    [s, a],
    [o, a],
    [o, n],
    [s, n],
    M,
    [0, 1, 0],
  );
  let S = [...BC[d % 3], 0];
  if (
    (x.box(s, n, o, a, u, u + 0.15, S, { top: !1 }), t.h > 14 && t.seed > 0.4)
  ) {
    let w = Math.min(o - s, a - n) * 0.3,
      z = (s + o) / 2 + (t.seed - 0.5) * 4,
      _ = (n + a) / 2;
    x.box(
      z - w / 2,
      _ - w / 2,
      z + w / 2,
      _ + w / 2,
      u - 0.8,
      u + 2.4,
      [0.5, 0.49, 0.46, 0],
    );
  }
  if (
    (l === Rs.OFF || l === Rs.RIB || l === Rs.CUR) &&
    t.h > 60 &&
    Math.min(o - s, a - n) > 20
  ) {
    let w = 4 + t.seed * 4,
      z = u + 12 + t.seed * 30,
      _ = s + w,
      R = o - w,
      T = n + w,
      E = a - w;
    for (let [A, C, P, I] of [
      [R, T, _, T],
      [R, E, R, T],
      [_, E, R, E],
      [_, T, _, E],
    ])
      b.wall(A, C, P, I, u - 1, u - 1, z, z, m, p + 900, h);
    x.quad(
      [_, z, E],
      [R, z, E],
      [R, z, T],
      [_, z, T],
      [_, E],
      [R, E],
      [R, T],
      [_, T],
      M,
      [0, 1, 0],
    );
  }
  if (
    l === Rs.VIC ||
    l === Rs.EDW ||
    l === Rs.APT ||
    l === Rs.MIX ||
    l === Rs.CHN
  ) {
    let w = [...(l === Rs.VIC ? [0.82, 0.8, 0.74] : BC[d % 3]), iw(Rs.BLANK)],
      z = l === Rs.VIC ? 0.45 : 0.3,
      _ = l === Rs.VIC ? 0.7 : 0.45;
    if (
      (DK(b, t, r, u - _, u, z, w),
      l === Rs.VIC || (l === Rs.EDW && t.seed < 0.5))
    ) {
      let R = r === "n" || r === "s" ? o - s : a - n;
      for (let T = 0; T + 7.5 <= R + 0.01; T += 7.6)
        xgt(
          b,
          t,
          r,
          T + 0.55,
          2.9,
          h + 2.9,
          u - _ - 0.35,
          m,
          p,
          h,
          l === Rs.VIC,
        );
    }
  }
}
var mgt = {
    [Rs.VIC]: ["vic", "vic"],
    [Rs.EDW]: ["edw", "edw"],
    [Rs.APT]: ["apt", "apt"],
    [Rs.MIX]: ["mix", "mix"],
    [Rs.CHN]: ["mix", "chn"],
    [Rs.BRK]: ["brk", "brk"],
  },
  ggt = {
    [Rs.VIC]: ["w_siding", "w_stucco"],
    [Rs.EDW]: ["w_stucco", "w_siding"],
    [Rs.APT]: ["w_stucco", "w_brick"],
    [Rs.MIX]: ["w_stucco", "w_brick"],
    [Rs.CHN]: ["w_stucco", "w_stucco"],
    [Rs.BRK]: ["w_brick", "w_brick"],
  },
  LK = {
    [Rs.OFF]: [0, 1, 2, 6, 7],
    [Rs.RIB]: [3, 7],
    [Rs.CUR]: [4, 5],
    [Rs.MIX]: [0, 2, 6],
    [Rs.APT]: [1, 7],
  },
  gm = (i, t) => (i[t] ||= new Ce()),
  IK = [
    [0.9, 0.9, 0.9, 1 / 7],
    [1.7, 1.7, 1.66, 1 / 7],
    [1.35, 1.25, 1.1, 1 / 7],
    [2.1, 2.1, 2.08, 1 / 7],
    [1.1, 1.08, 1.05, 1 / 7],
  ];
function bgt(i, t, e) {
  let { x0: s, z0: n, x1: o, z1: a, front: r, style: l } = t,
    c = mgt[l];
  if (!c || !mm.fronts?.[c[0]]) return FK(i, t);
  let h = mm.fronts[c[0]].cells.filter((w) => w.style === c[1]);
  if (!h.length) return FK(i, t);
  let f = h[Math.floor(t.seed * 997) % h.length],
    u =
      r === "n"
        ? [(s + o) / 2, n]
        : r === "s"
          ? [(s + o) / 2, a]
          : r === "w"
            ? [s, (n + a) / 2]
            : [o, (n + a) / 2],
    d = Yt(u[0], u[1]) + Ke,
    p = Math.min(Yt(s, n), Yt(o, n), Yt(s, a), Yt(o, a)) - 0.3,
    m = d + t.h,
    g = ++OC.n,
    b = 0.94 + 0.12 * Ws(g, 3),
    x = [b, b, b, (f.cell + 0.5) / 64],
    v = (p - d) / t.h,
    y = ggt[l][t.seed < 0.5 ? 0 : 1],
    M = [
      ...t.color.map((w) => 0.72 * (0.6 + (0.4 * w) / Math.max(...t.color))),
      0,
    ],
    S = [
      [o, n, s, n, "n"],
      [o, a, o, n, "e"],
      [s, a, o, a, "s"],
      [s, n, s, a, "w"],
    ];
  for (let [w, z, _, R, T] of S)
    if (T === r || t.street?.[T]) {
      let E = Math.hypot(_ - w, R - z),
        A = T === r ? f : h[(h.indexOf(f) + 1) % h.length],
        C = Math.max(1, Math.round(E / A.w)),
        P = (g % 61) * 3 + (T === r ? 0 : 1),
        I = T === r ? x : [b, b, b, (A.cell + 0.5) / 64],
        L = T === r ? d : Math.max(Yt(w, z), Yt(_, R)) + Ke,
        F = (p - L) / (m - L);
      gm(i, "f_" + c[0]).quad(
        [w, p, z],
        [_, p, R],
        [_, m, R],
        [w, m, z],
        [P, T === r ? v : F],
        [P + C - 1e-4, T === r ? v : F],
        [P + C - 1e-4, 1],
        [P, 1],
        I,
        [-(R - z) / E, 0, (_ - w) / E],
      );
    } else gm(i, y).wall(w, z, _, R, p, p, m, m, M, 0, p);
  (gm(i, "roofT").quad(
    [s, m - 0.6, a],
    [o, m - 0.6, a],
    [o, m - 0.6, n],
    [s, m - 0.6, n],
    [s, a],
    [o, a],
    [o, n],
    [s, n],
    IK[g % IK.length],
    [0, 1, 0],
  ),
    i.roof.box(s, n, o, a, m, m + 0.12, [...BC[g % 3], 0], { top: !1 }),
    DK(i.facade, t, r, m - 0.25, m + 0.1, 0.28, [
      0.78,
      0.77,
      0.73,
      iw(Rs.BLANK),
    ]),
    HK(
      i.roof,
      s,
      n,
      o,
      a,
      m - 0.6,
      g,
      c[0] === "vic" || c[0] === "edw" ? "house" : "flat",
      t.color,
    ));
}
