// app 17 — wall
// Lines 41588-41935 of readable/app.pretty.js (statement-aligned).
var Ki,
  Cd = Vi(() => {
    En();
    Ol();
    Ki = {
      x0: Ve.x,
      x1: Ve.x + 40,
      z0: fe[ws - 1] - 98,
      z1: fe[ws - 1] + 98,
      zc: fe[ws - 1],
    };
  });
var pG = {};
wh(pG, {
  PIERS: () => aS,
  bench: () => Ac,
  buildPiers: () => uR,
  frame: () => X1,
  pier: () => rS,
});
function X1(i, t) {
  let e = i === "e" ? (n, o) => [Ve.x + n, t + o] : (n, o) => [t + o, Ve.z - n];
  return {
    L: e,
    out: i === "e" ? [1, 0] : [0, -1],
    box: (n, o, a, r, l, c, h, f, u) => {
      let d = e(o, a),
        p = e(r, l);
      Ms(
        n,
        Math.min(d[0], p[0]),
        c,
        Math.min(d[1], p[1]),
        Math.max(d[0], p[0]),
        h,
        Math.max(d[1], p[1]),
        f,
        u,
      );
    },
    wall: (n, o, a, r, l, c, h, f, u = 0, d = c) => {
      let p = e(o, a),
        m = e(r, l);
      n.wall(m[0], m[1], p[0], p[1], c, c, h, h, f, u, d);
    },
    P: (n, o, a) => {
      let r = e(n, a);
      return [r[0], o, r[1]];
    },
  };
}
function uR(i) {
  for (let t of aS) {
    let e =
        t.side === "e"
          ? "piersE" + Math.floor((t.c + 200) / 500)
          : "piersN" + Math.floor(t.c / 500),
      s = i.B.R(e),
      n = X1(t.side, t.c);
    try {
      rS(s, i.A, n, t);
    } catch (o) {
      console.error("pier", t.n, o);
    }
  }
}
function rS(i, t, e, s) {
  let { w: n, len: o } = s,
    a = n / 2,
    r = i.solid,
    l = 3,
    c = At([0.44, 0.43, 0.4], Tt.conc),
    h = At([0.22, 0.2, 0.17], Tt.pile),
    f = At([0.34, 0.35, 0.34], Tt.tar),
    u = dG[(+s.n || 0) % dG.length];
  s.kind === "open"
    ? e.box(r, 0, -a, o, a, 2.3, l, At([0.46, 0.44, 0.4], Tt.planks), {
        bottom: !0,
      })
    : e.box(r, 0, -a, o, a, 1.6, l, c, { bottom: !0 });
  let d = 6;
  for (let M = 3; M < o; M += d)
    for (let S of [-a + 0.6, a - 0.6, ...(n > 20 && M % 12 < 6 ? [0] : [])]) {
      let w = e.L(M, S);
      es(
        r,
        w[0],
        w[1],
        s.kind === "open" ? 0.25 : 0.32,
        -6,
        s.kind === "open" ? 2.3 : 1.6,
        6,
        h,
      );
    }
  for (let M = -a + 0.6; M <= a - 0.5; M += d) {
    let S = e.L(o - 0.6, M);
    es(r, S[0], S[1], 0.32, -6, 1.6, 6, h);
  }
  for (let M of [-a - 0.15, a + 0.15]) {
    let S = e.P(2, 2.2, M),
      w = e.P(o, 2.2, M);
    ss(r, S, w, 0.3, 1.4, At([0.2, 0.17, 0.13], Tt.pile));
  }
  if (s.kind === "open") return Hct(i, t, e, s);
  if (s.kind === "arch") return Dct(i, t, e, s);
  let p = 9,
    m = o - 4,
    g = a - 3,
    b = l + 11,
    x = Ha("shed_side", u);
  (e.wall(i.atlas, p, -g, m, -g, l, b, x),
    e.wall(i.atlas, m, g, p, g, l, b, x),
    e.wall(i.atlas, m, -g, m, g, l, b, x));
  let v = Math.max(4, g * 0.36),
    y = b + 1.6;
  for (let M of [-1, 1]) {
    xs(
      r,
      e.P(p, b, M * (g + 0.5)),
      e.P(m + 0.5, b, M * (g + 0.5)),
      e.P(m + 0.5, y, M * v),
      e.P(p, y, M * v),
      f,
      e.P((p + m) / 2, y + 50, M * (g + 60)),
    );
    let S = e.P(p, y, M * v),
      w = e.P(m, y, M * v),
      z = e.P(m, y + 1.8, M * v),
      _ = e.P(p, y + 1.8, M * v);
    xs(
      r,
      S,
      w,
      z,
      _,
      At([0.1, 0.12, 0.13], Tt.glass),
      e.P((p + m) / 2, y, M * (v + 40)),
    );
  }
  if (
    (e.box(r, p, -v - 0.6, m + 0.6, v + 0.6, y + 1.8, y + 2.3, f),
    xs(
      r,
      e.P(m, b, -g),
      e.P(m, b, g),
      e.P(m, y, v),
      e.P(m, y, -v),
      Ha("shed_side", u),
      e.P(m + 40, b, 0),
    ),
    xs(
      r,
      e.P(m, y, -v),
      e.P(m, y, v),
      e.P(m, y + 2.3, v),
      e.P(m, y + 2.3, -v),
      At([0.6, 0.6, 0.58], Tt.paint),
      e.P(m + 40, y, 0),
    ),
    s.kind === "cruise")
  )
    return Uct(i, t, e, s);
  if (
    (s.kind === "explo" &&
      (e.box(
        r,
        o - 42,
        -a + 2,
        o - 2,
        a - 2,
        l,
        l + 13,
        At([0.12, 0.15, 0.17], Tt.glass),
      ),
      e.box(
        r,
        o - 43,
        -a + 1.2,
        o - 1.2,
        a - 1.2,
        l + 13,
        l + 14,
        At([0.8, 0.8, 0.78], Tt.metal),
      )),
    s.kind === "fish" || s.kind === "ferry")
  ) {
    (e.wall(i.atlas, p - 9, g, p - 9, -g, l, b, x),
      e.box(r, p - 9, -g, p, g, b, b + 0.3, f),
      e.wall(i.atlas, p - 9, -g, p, -g, l, b, x),
      e.wall(i.atlas, p, g, p - 9, g, l, b, x));
    let M = t.word("PIER " + s.n, {
        font: "bold 120px Arial, Helvetica, sans-serif",
        h: 140,
      }),
      S = e.P(p - 9.05, b - 2.2, 0);
    si(
      i.text,
      t,
      M,
      S[0],
      S[1],
      S[2],
      -e.out[0],
      -e.out[1],
      Math.min(14, g * 1.4),
      null,
      oo([0.08, 0.1, 0.12], !0),
    );
    return;
  }
  Oct(i, t, e, s, u);
}
function Oct(i, t, e, s, n) {
  let o = s.w / 2,
    a = i.solid,
    r = 3,
    l = 9,
    c = Math.min(10, o - 4),
    h = 21,
    f = 16,
    u = T0(Ha(+s.n % 2 === 1 && +s.n % 4 === 1 ? "bulk_b" : "bulk_a", n)),
    d = T0(Ha("bulk_wing", n)),
    p = [0.66 * n[0], 0.63 * n[1], 0.55 * n[2]],
    m = T0(At(p, Tt.paint)),
    g = At(
      p.map((y) => y * 0.8),
      Tt.paint,
    );
  (e.wall(i.atlas, 0, o, 0, c, r, f, d, 0),
    e.wall(i.atlas, 0, -c, 0, -o, r, f, d, 0),
    e.wall(i.atlas, -0.8, c, -0.8, -c, r, h, u, 0),
    e.wall(i.atlas, 0, c, -0.8, c, r, h, d, 0),
    e.wall(i.atlas, -0.8, -c, 0, -c, r, h, d, 0),
    e.wall(i.atlas, 0, -o, l, -o, r, f, d, 0),
    e.wall(i.atlas, l, o, 0, o, r, f, d, 0),
    e.wall(i.atlas, l, -c, l, c, f - 2, h, d, 0),
    e.wall(i.atlas, 0, -c, l, -c, f, h, d, 0),
    e.wall(i.atlas, l, c, 0, c, f, h, d, 0),
    e.box(a, -0.6, -o - 0.4, l + 0.4, o + 0.4, f - 0.1, f + 0.7, m, {
      bottom: !0,
    }),
    e.box(a, -1.5, -c - 0.6, l + 0.3, c + 0.6, h - 0.2, h + 0.8, m, {
      bottom: !0,
    }),
    e.box(a, -1.1, -c - 0.2, l, c + 0.2, h + 0.8, h + 3.6, m),
    e.box(a, -1.3, -c - 0.4, l + 0.2, c + 0.4, h + 3.6, h + 4.1, m),
    e.box(a, 0.5, -o + 0.3, l - 0.2, o - 0.3, f + 0.7, f + 1.3, g));
  for (let y of [-o, o])
    e.box(a, -0.4, y - 0.7, 0.4, y + 0.7, r, f, m, { top: !1 });
  let b = t.word("PIER " + s.n, {
      font: '600 118px Georgia, "Times New Roman", serif',
      h: 140,
      spacing: 10,
    }),
    x = e.P(-1.12, h + 2.2, 0);
  if (
    (si(
      i.text,
      t,
      b,
      x[0],
      x[1],
      x[2],
      -e.out[0],
      -e.out[1],
      Math.min(12, c * 1.3),
      null,
      oo([0.12, 0.2, 0.17], !1),
    ),
    +s.n % 3 !== 0)
  ) {
    let M = h + 4.1,
      S = M + 2.6;
    (xs(
      a,
      e.P(-1.3, M, -c - 0.4),
      e.P(-1.3, M, c + 0.4),
      e.P(-1.3, S, 0),
      e.P(-1.3, S, 0),
      m,
      e.P(-1.3 - 20, M, 0),
    ),
      xs(
        a,
        e.P(-1.3, M, -c - 0.4),
        e.P(l, M, -c - 0.4),
        e.P(l, S + 0.1, 0),
        e.P(-1.3, S + 0.1, 0),
        g,
        e.P(l / 2, S + 30, -c - 30),
      ),
      xs(
        a,
        e.P(-1.3, M, c + 0.4),
        e.P(l, M, c + 0.4),
        e.P(l, S + 0.1, 0),
        e.P(-1.3, S + 0.1, 0),
        g,
        e.P(l / 2, S + 30, c + 30),
      ),
      xs(
        a,
        e.P(l, M, -c - 0.4),
        e.P(l, M, c + 0.4),
        e.P(l, S, 0),
        e.P(l, S, 0),
        g,
        e.P(l + 20, M, 0),
      ));
  }
  let v = e.P(l * 0.5, h + 4.1, 0);
  es(a, v[0], v[2], 0.08, v[1], v[1] + 9, 5, At([0.8, 0.8, 0.8], Tt.metal));
}
function Hct(i, t, e, s) {
  let n = s.w / 2,
    o = i.solid,
    a = 3,
    r = At([0.05, 0.06, 0.06], Tt.metal);
  (Nr(o, e.L(1, -n + 0.2), e.L(s.len - 0.3, -n + 0.2), a, r, { step: 2 }),
    Nr(o, e.L(1, n - 0.2), e.L(s.len - 0.3, n - 0.2), a, r, { step: 2 }),
    Nr(o, e.L(s.len - 0.3, -n + 0.2), e.L(s.len - 0.3, n - 0.2), a, r, {
      step: 2,
    }));
  let l = s.lamps || 12;
  for (let c = 0; c < l; c++) {
    let h = 12 + (c * (s.len - 20)) / (l - 1);
    for (let f of [-1, 1]) {
      let u = e.P(h, a, f * (n - 0.8));
      (es(o, u[0], u[2], 0.1, a, a + 4.2, 6, r, 0.07),
        es(o, u[0], u[2], 0.2, a, a + 0.5, 6, r, 0.14),
        es(
          o,
          u[0],
          u[2],
          0.22,
          a + 4.2,
          a + 4.9,
          6,
          At([1, 0.85, 0.6], Tt.lamp),
          0.26,
        ),
        es(o, u[0], u[2], 0.3, a + 4.9, a + 5.1, 6, r, 0.05));
    }
    if (c % 2 === 1)
      for (let f of [-1, 1]) Ac(o, e, h, f * (n - 1.8), f > 0 ? 1 : -1);
  }
}
