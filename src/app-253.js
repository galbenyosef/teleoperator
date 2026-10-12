// app 253 — box
// Lines 127244-127566 of readable/app.pretty.js (statement-aligned).
function HK(i, t, e, s, n, o, a, r, l) {
  let c = ka(a * 7919 + 13),
    h = [],
    f = (b, x) => {
      for (let v = 0; v < 8; v++) {
        let y = t + 0.8 + b / 2 + c() * Math.max(0, s - t - 1.6 - b),
          M = e + 0.8 + x / 2 + c() * Math.max(0, n - e - 1.6 - x),
          S = [
            y - b / 2 - 0.5,
            M - x / 2 - 0.5,
            y + b / 2 + 0.5,
            M + x / 2 + 0.5,
          ];
        if (s - t < b + 1.6 || n - e < x + 1.6) return null;
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
      let x = f(0.7, 0.55);
      x &&
        i.box(
          x[0] - 0.35,
          x[1] - 0.28,
          x[0] + 0.35,
          x[1] + 0.28,
          o,
          o + 1.3 + c() * 0.8,
          [0.42, 0.2, 0.14, 0],
        );
    }
    {
      let b = f(0.12, 0.12);
      b &&
        i.box(
          b[0] - 0.06,
          b[1] - 0.06,
          b[0] + 0.06,
          b[1] + 0.06,
          o,
          o + 0.9,
          p,
        );
    }
    if (c() < 0.5) {
      let b = f(1.2, 1.6);
      b &&
        (i.box(
          b[0] - 0.6,
          b[1] - 0.8,
          b[0] + 0.6,
          b[1] + 0.8,
          o,
          o + 0.35,
          u(0.7),
        ),
        i.box(
          b[0] - 0.5,
          b[1] - 0.7,
          b[0] + 0.5,
          b[1] + 0.7,
          o + 0.35,
          o + 0.4,
          [0.05, 0.07, 0.09, 0],
        ));
    }
    return;
  }
  if (c() < 0.7) {
    let b = f(2.6, 3.2);
    b && i.box(b[0] - 1.3, b[1] - 1.6, b[0] + 1.3, b[1] + 1.6, o, o + 2.7, m);
  }
  let g = 1 + Math.floor(c() * 4);
  for (let b = 0; b < g; b++) {
    let x = c() < 0.35,
      v = x ? 2.2 : 1.1,
      y = x ? 1.4 : 0.9,
      M = x ? 1.5 : 0.9,
      S = f(v, y);
    S &&
      (i.box(
        S[0] - v / 2,
        S[1] - y / 2,
        S[0] + v / 2,
        S[1] + y / 2,
        o,
        o + M,
        u(0.55 + c() * 0.2),
      ),
      i.box(
        S[0] - v / 2 + 0.1,
        S[1] - y / 2 + 0.1,
        S[0] + v / 2 - 0.1,
        S[1] + y / 2 - 0.1,
        o + M,
        o + M + 0.06,
        p,
      ),
      x &&
        i.box(
          S[0] - 0.25,
          S[1] + y / 2,
          S[0] + 0.25,
          S[1] + y / 2 + 1.8,
          o + 0.4,
          o + 0.9,
          d,
        ));
  }
  for (let b = Math.floor(c() * 3); b-- > 0;) {
    let x = f(0.15, 0.15);
    x &&
      i.box(
        x[0] - 0.07,
        x[1] - 0.07,
        x[0] + 0.07,
        x[1] + 0.07,
        o,
        o + 0.7 + c(),
        p,
      );
  }
  if (c() < 0.3) {
    let b = f(0.7, 0.7);
    b &&
      (i.box(b[0] - 0.05, b[1] - 0.05, b[0] + 0.05, b[1] + 0.05, o, o + 1, p),
      i.box(
        b[0] - 0.35,
        b[1] - 0.04,
        b[0] + 0.35,
        b[1] + 0.04,
        o + 0.9,
        o + 1.5,
        u(0.85),
      ));
  }
  if (c() < 0.25) {
    let b = f(3.2, 2);
    if (b)
      for (let x = 0; x < 2; x++)
        i.box(
          b[0] - 1.6,
          b[1] - 1 + x * 1.05,
          b[0] + 1.6,
          b[1] - 0.05 + x * 1.05,
          o + 0.3,
          o + 0.42,
          [0.04, 0.06, 0.1, 0],
        );
  }
}
function FK(i, t) {
  let { x0: e, z0: s, x1: n, z1: o, style: a } = t,
    r = Math.min(Yt(e, s), Yt(n, s), Yt(e, o), Yt(n, o)) - 0.3,
    l = Math.max(Yt(e, s), Yt(n, s), Yt(e, o), Yt(n, o)) + Ke,
    c = l + t.h,
    h = LK[a] || LK[Rs.OFF],
    u = [1, 1, 1, (h[Math.floor(t.seed * 991) % h.length] + 0.5) / 32],
    d = ++OC.n,
    p = (b, x, v, y, M, S) => {
      for (let [w, z, _, R] of [
        [v, x, b, x],
        [v, y, v, x],
        [b, y, v, y],
        [b, x, b, y],
      ])
        gm(i, "office").wall(w, z, _, R, M, M, S, S, u, (d % 7) * 18, l);
    };
  p(e, s, n, o, r, c);
  let m = [0.9, 0.9, 0.9, 1 / 7];
  if (
    (gm(i, "roofT").quad(
      [e, c, o],
      [n, c, o],
      [n, c, s],
      [e, c, s],
      [e, o],
      [n, o],
      [n, s],
      [e, s],
      m,
      [0, 1, 0],
    ),
    t.h > 50 && Math.min(n - e, o - s) > 20)
  ) {
    let b = 4 + t.seed * 4,
      x = c + 10 + t.seed * 26,
      v = e + b,
      y = n - b,
      M = s + b,
      S = o - b;
    (p(v, M, y, S, c - 0.5, x),
      gm(i, "roofT").quad(
        [v, x, S],
        [y, x, S],
        [y, x, M],
        [v, x, M],
        [v, S],
        [y, S],
        [y, M],
        [v, M],
        m,
        [0, 1, 0],
      ),
      i.roof.box(
        (e + n) / 2 - 3,
        (s + o) / 2 - 3,
        (e + n) / 2 + 3,
        (s + o) / 2 + 3,
        x,
        x + 3.5,
        [0.45, 0.45, 0.44, 0],
      ),
      t.seed > 0.6 &&
        i.roof.box(
          (e + n) / 2 - 0.2,
          (s + o) / 2 - 0.2,
          (e + n) / 2 + 0.2,
          (s + o) / 2 + 0.2,
          x + 3.5,
          x + 12 + t.seed * 10,
          [0.3, 0.3, 0.3, 0],
        ));
  } else HK(i.roof, e, s, n, o, c, d, "flat", [0.7, 0.7, 0.68]);
  let g = 3.8 * (5 + (d % 4));
  for (let b = l + g; b < c - 3; b += g)
    i.roof.box(
      e - 0.18,
      s - 0.18,
      n + 0.18,
      o + 0.18,
      b,
      b + 0.35,
      [0.55, 0.54, 0.52, 0],
      { top: !0 },
    );
  i.roof.box(
    e - 0.12,
    s - 0.12,
    n + 0.12,
    o + 0.12,
    c,
    c + 0.9,
    [0.5, 0.5, 0.49, 0],
    { top: !1 },
  );
}
function DK(i, t, e, s, n, o, a) {
  let { x0: r, z0: l, x1: c, z1: h } = t;
  e === "n"
    ? i.box(r, l - o, c, l, s, n, a, { sides: [1, 0, 0, 1] })
    : e === "s"
      ? i.box(r, h, c, h + o, s, n, a, { sides: [0, 1, 1, 0] })
      : e === "w"
        ? i.box(r - o, l, r, h, s, n, a, { sides: [1, 0, 1, 1] })
        : i.box(c, l, c + o, h, s, n, a, { sides: [1, 1, 1, 0] });
}
function xgt(i, t, e, s, n, o, a, r, l, c, h) {
  let u = h ? 0.72 : 0,
    d,
    p,
    m,
    g,
    b,
    x;
  e === "n"
    ? ((d = t.x1), (p = t.z0), (m = -1), (g = 0), (b = 0), (x = -1))
    : e === "s"
      ? ((d = t.x0), (p = t.z1), (m = 1), (g = 0), (b = 0), (x = 1))
      : e === "w"
        ? ((d = t.x0), (p = t.z0), (m = 0), (g = 1), (b = -1), (x = 0))
        : ((d = t.x1), (p = t.z1), (m = 0), (g = -1), (b = 1), (x = 0));
  let v = (T, E) => [d + m * T + b * E, p + g * T + x * E],
    y = v(s, 0),
    M = v(s + u, 0.72),
    S = v(s + n - u, 0.72),
    w = v(s + n, 0),
    z = [
      [y, M],
      [M, S],
      [S, w],
    ],
    _ = l + s;
  for (let [T, E] of z) {
    let A = Math.hypot(E[0] - T[0], E[1] - T[1]);
    (i.wall(T[0], T[1], E[0], E[1], o, o, a, a, r, _, c), (_ += A));
  }
  let R = [0.8, 0.79, 0.74, (8 + 0.5) / 16];
  (i.quad(
    [y[0], a, y[1]],
    [w[0], a, w[1]],
    [S[0], a, S[1]],
    [M[0], a, M[1]],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    R,
    [0, 1, 0],
  ),
    i.quad(
      [y[0], o, y[1]],
      [M[0], o, M[1]],
      [S[0], o, S[1]],
      [w[0], o, w[1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      R,
      [0, -1, 0],
    ));
}
