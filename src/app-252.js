// app 252 — box
// Lines 127503-127825 of readable/app.pretty.js (statement-aligned).
function GJ(o, t, e, s, n, i, a, r, l) {
  let c = Fa(a * 7919 + 13),
    h = [],
    f = (b, v) => {
      for (let x = 0; x < 8; x++) {
        let y = t + 0.8 + b / 2 + c() * Math.max(0, s - t - 1.6 - b),
          M = e + 0.8 + v / 2 + c() * Math.max(0, n - e - 1.6 - v),
          S = [
            y - b / 2 - 0.5,
            M - v / 2 - 0.5,
            y + b / 2 + 0.5,
            M + v / 2 + 0.5,
          ];
        if (s - t < b + 1.6 || n - e < v + 1.6) return null;
        if (
          h.every(
            (w) => S[2] < w[0] || S[0] > w[2] || S[3] < w[1] || S[1] > w[3],
          )
        )
          return (h.push(S), [y, M]);
      }
      return null;
    },
    u = (b) => [b, b, b * 0.98, 0],
    d = [0.62, 0.62, 0.6, 0],
    p = [0.16, 0.16, 0.17, 0],
    m = [...l.map((b) => b * 0.8), 0];
  if (r === "house") {
    for (let b = 1 + (c() < 0.5 ? 1 : 0); b-- > 0;) {
      let v = f(0.7, 0.55);
      v &&
        o.box(
          v[0] - 0.35,
          v[1] - 0.28,
          v[0] + 0.35,
          v[1] + 0.28,
          i,
          i + 1.3 + c() * 0.8,
          [0.42, 0.2, 0.14, 0],
        );
    }
    {
      let b = f(0.12, 0.12);
      b &&
        o.box(
          b[0] - 0.06,
          b[1] - 0.06,
          b[0] + 0.06,
          b[1] + 0.06,
          i,
          i + 0.9,
          p,
        );
    }
    if (c() < 0.5) {
      let b = f(1.2, 1.6);
      b &&
        (o.box(
          b[0] - 0.6,
          b[1] - 0.8,
          b[0] + 0.6,
          b[1] + 0.8,
          i,
          i + 0.35,
          u(0.7),
        ),
        o.box(
          b[0] - 0.5,
          b[1] - 0.7,
          b[0] + 0.5,
          b[1] + 0.7,
          i + 0.35,
          i + 0.4,
          [0.05, 0.07, 0.09, 0],
        ));
    }
    return;
  }
  if (c() < 0.7) {
    let b = f(2.6, 3.2);
    b && o.box(b[0] - 1.3, b[1] - 1.6, b[0] + 1.3, b[1] + 1.6, i, i + 2.7, m);
  }
  let g = 1 + Math.floor(c() * 4);
  for (let b = 0; b < g; b++) {
    let v = c() < 0.35,
      x = v ? 2.2 : 1.1,
      y = v ? 1.4 : 0.9,
      M = v ? 1.5 : 0.9,
      S = f(x, y);
    S &&
      (o.box(
        S[0] - x / 2,
        S[1] - y / 2,
        S[0] + x / 2,
        S[1] + y / 2,
        i,
        i + M,
        u(0.55 + c() * 0.2),
      ),
      o.box(
        S[0] - x / 2 + 0.1,
        S[1] - y / 2 + 0.1,
        S[0] + x / 2 - 0.1,
        S[1] + y / 2 - 0.1,
        i + M,
        i + M + 0.06,
        p,
      ),
      v &&
        o.box(
          S[0] - 0.25,
          S[1] + y / 2,
          S[0] + 0.25,
          S[1] + y / 2 + 1.8,
          i + 0.4,
          i + 0.9,
          d,
        ));
  }
  for (let b = Math.floor(c() * 3); b-- > 0;) {
    let v = f(0.15, 0.15);
    v &&
      o.box(
        v[0] - 0.07,
        v[1] - 0.07,
        v[0] + 0.07,
        v[1] + 0.07,
        i,
        i + 0.7 + c(),
        p,
      );
  }
  if (c() < 0.3) {
    let b = f(0.7, 0.7);
    b &&
      (o.box(b[0] - 0.05, b[1] - 0.05, b[0] + 0.05, b[1] + 0.05, i, i + 1, p),
      o.box(
        b[0] - 0.35,
        b[1] - 0.04,
        b[0] + 0.35,
        b[1] + 0.04,
        i + 0.9,
        i + 1.5,
        u(0.85),
      ));
  }
  if (c() < 0.25) {
    let b = f(3.2, 2);
    if (b)
      for (let v = 0; v < 2; v++)
        o.box(
          b[0] - 1.6,
          b[1] - 1 + v * 1.05,
          b[0] + 1.6,
          b[1] - 0.05 + v * 1.05,
          i + 0.3,
          i + 0.42,
          [0.04, 0.06, 0.1, 0],
        );
  }
}
function NJ(o, t) {
  let { x0: e, z0: s, x1: n, z1: i, style: a } = t,
    r = Math.min($t(e, s), $t(n, s), $t(e, i), $t(n, i)) - 0.3,
    l = Math.max($t(e, s), $t(n, s), $t(e, i), $t(n, i)) + Ze,
    c = l + t.h,
    h = OJ[a] || OJ[Ls.OFF],
    u = [1, 1, 1, (h[Math.floor(t.seed * 991) % h.length] + 0.5) / 32],
    d = ++pI.n,
    p = (b, v, x, y, M, S) => {
      for (let [w, _, z, A] of [
        [x, v, b, v],
        [x, y, x, v],
        [b, y, x, y],
        [b, v, b, y],
      ])
        o2(o, "office").wall(w, _, z, A, M, M, S, S, u, (d % 7) * 18, l);
    };
  p(e, s, n, i, r, c);
  let m = [0.9, 0.9, 0.9, 1 / 7];
  if (
    (o2(o, "roofT").quad(
      [e, c, i],
      [n, c, i],
      [n, c, s],
      [e, c, s],
      [e, i],
      [n, i],
      [n, s],
      [e, s],
      m,
      [0, 1, 0],
    ),
    t.h > 50 && Math.min(n - e, i - s) > 20)
  ) {
    let b = 4 + t.seed * 4,
      v = c + 10 + t.seed * 26,
      x = e + b,
      y = n - b,
      M = s + b,
      S = i - b;
    (p(x, M, y, S, c - 0.5, v),
      o2(o, "roofT").quad(
        [x, v, S],
        [y, v, S],
        [y, v, M],
        [x, v, M],
        [x, S],
        [y, S],
        [y, M],
        [x, M],
        m,
        [0, 1, 0],
      ),
      o.roof.box(
        (e + n) / 2 - 3,
        (s + i) / 2 - 3,
        (e + n) / 2 + 3,
        (s + i) / 2 + 3,
        v,
        v + 3.5,
        [0.45, 0.45, 0.44, 0],
      ),
      t.seed > 0.6 &&
        o.roof.box(
          (e + n) / 2 - 0.2,
          (s + i) / 2 - 0.2,
          (e + n) / 2 + 0.2,
          (s + i) / 2 + 0.2,
          v + 3.5,
          v + 12 + t.seed * 10,
          [0.3, 0.3, 0.3, 0],
        ));
  } else GJ(o.roof, e, s, n, i, c, d, "flat", [0.7, 0.7, 0.68]);
  let g = 3.8 * (5 + (d % 4));
  for (let b = l + g; b < c - 3; b += g)
    o.roof.box(
      e - 0.18,
      s - 0.18,
      n + 0.18,
      i + 0.18,
      b,
      b + 0.35,
      [0.55, 0.54, 0.52, 0],
      { top: !0 },
    );
  o.roof.box(
    e - 0.12,
    s - 0.12,
    n + 0.12,
    i + 0.12,
    c,
    c + 0.9,
    [0.5, 0.5, 0.49, 0],
    { top: !1 },
  );
}
function VJ(o, t, e, s, n, i, a) {
  let { x0: r, z0: l, x1: c, z1: h } = t;
  e === "n"
    ? o.box(r, l - i, c, l, s, n, a, { sides: [1, 0, 0, 1] })
    : e === "s"
      ? o.box(r, h, c, h + i, s, n, a, { sides: [0, 1, 1, 0] })
      : e === "w"
        ? o.box(r - i, l, r, h, s, n, a, { sides: [1, 0, 1, 1] })
        : o.box(c, l, c + i, h, s, n, a, { sides: [1, 1, 1, 0] });
}
function Gvt(o, t, e, s, n, i, a, r, l, c, h) {
  let u = h ? 0.72 : 0,
    d,
    p,
    m,
    g,
    b,
    v;
  e === "n"
    ? ((d = t.x1), (p = t.z0), (m = -1), (g = 0), (b = 0), (v = -1))
    : e === "s"
      ? ((d = t.x0), (p = t.z1), (m = 1), (g = 0), (b = 0), (v = 1))
      : e === "w"
        ? ((d = t.x0), (p = t.z0), (m = 0), (g = 1), (b = -1), (v = 0))
        : ((d = t.x1), (p = t.z1), (m = 0), (g = -1), (b = 1), (v = 0));
  let x = (T, E) => [d + m * T + b * E, p + g * T + v * E],
    y = x(s, 0),
    M = x(s + u, 0.72),
    S = x(s + n - u, 0.72),
    w = x(s + n, 0),
    _ = [
      [y, M],
      [M, S],
      [S, w],
    ],
    z = l + s;
  for (let [T, E] of _) {
    let R = Math.hypot(E[0] - T[0], E[1] - T[1]);
    (o.wall(T[0], T[1], E[0], E[1], i, i, a, a, r, z, c), (z += R));
  }
  let A = [0.8, 0.79, 0.74, (8 + 0.5) / 16];
  (o.quad(
    [y[0], a, y[1]],
    [w[0], a, w[1]],
    [S[0], a, S[1]],
    [M[0], a, M[1]],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    A,
    [0, 1, 0],
  ),
    o.quad(
      [y[0], i, y[1]],
      [M[0], i, M[1]],
      [S[0], i, S[1]],
      [w[0], i, w[1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      A,
      [0, -1, 0],
    ));
}
