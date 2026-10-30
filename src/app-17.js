// app 17 — wall
// Lines 41672-42019 of readable/app.pretty.js (statement-aligned).
var io,
  fp = Ki(async () => {
    Pn();
    await oc();
    io = {
      x0: Ye.x,
      x1: Ye.x + 40,
      z0: pe[ks - 1] - 98,
      z1: pe[ks - 1] + 98,
      zc: pe[ks - 1],
    };
  });
var gW = {};
Kh(gW, {
  PIERS: () => lk,
  bench: () => ih,
  buildPiers: () => G7,
  frame: () => Cm,
  pier: () => ck,
});
function Cm(o, t) {
  let e = o === "e" ? (n, i) => [Ye.x + n, t + i] : (n, i) => [t + i, Ye.z - n];
  return {
    L: e,
    out: o === "e" ? [1, 0] : [0, -1],
    box: (n, i, a, r, l, c, h, f, u) => {
      let d = e(i, a),
        p = e(r, l);
      zs(
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
    wall: (n, i, a, r, l, c, h, f, u = 0, d = c) => {
      let p = e(i, a),
        m = e(r, l);
      n.wall(m[0], m[1], p[0], p[1], c, c, h, h, f, u, d);
    },
    P: (n, i, a) => {
      let r = e(n, a);
      return [r[0], i, r[1]];
    },
  };
}
function G7(o) {
  for (let t of lk) {
    let e =
        t.side === "e"
          ? "piersE" + Math.floor((t.c + 200) / 500)
          : "piersN" + Math.floor(t.c / 500),
      s = o.B.R(e),
      n = Cm(t.side, t.c);
    try {
      ck(s, o.A, n, t);
    } catch (i) {
      console.error("pier", t.n, i);
    }
  }
}
function ck(o, t, e, s) {
  let { w: n, len: i } = s,
    a = n / 2,
    r = o.solid,
    l = 3,
    c = Rt([0.44, 0.43, 0.4], Tt.conc),
    h = Rt([0.22, 0.2, 0.17], Tt.pile),
    f = Rt([0.34, 0.35, 0.34], Tt.tar),
    u = mW[(+s.n || 0) % mW.length];
  s.kind === "open"
    ? e.box(r, 0, -a, i, a, 2.3, l, Rt([0.46, 0.44, 0.4], Tt.planks), {
        bottom: !0,
      })
    : e.box(r, 0, -a, i, a, 1.6, l, c, { bottom: !0 });
  let d = 6;
  for (let M = 3; M < i; M += d)
    for (let S of [-a + 0.6, a - 0.6, ...(n > 20 && M % 12 < 6 ? [0] : [])]) {
      let w = e.L(M, S);
      os(
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
    let S = e.L(i - 0.6, M);
    os(r, S[0], S[1], 0.32, -6, 1.6, 6, h);
  }
  for (let M of [-a - 0.15, a + 0.15]) {
    let S = e.P(2, 2.2, M),
      w = e.P(i, 2.2, M);
    rs(r, S, w, 0.3, 1.4, Rt([0.2, 0.17, 0.13], Tt.pile));
  }
  if (s.kind === "open") return adt(o, t, e, s);
  if (s.kind === "arch") return rdt(o, t, e, s);
  let p = 9,
    m = i - 4,
    g = a - 3,
    b = l + 11,
    v = Ja("shed_side", u);
  (e.wall(o.atlas, p, -g, m, -g, l, b, v),
    e.wall(o.atlas, m, g, p, g, l, b, v),
    e.wall(o.atlas, m, -g, m, g, l, b, v));
  let x = Math.max(4, g * 0.36),
    y = b + 1.6;
  for (let M of [-1, 1]) {
    Ms(
      r,
      e.P(p, b, M * (g + 0.5)),
      e.P(m + 0.5, b, M * (g + 0.5)),
      e.P(m + 0.5, y, M * x),
      e.P(p, y, M * x),
      f,
      e.P((p + m) / 2, y + 50, M * (g + 60)),
    );
    let S = e.P(p, y, M * x),
      w = e.P(m, y, M * x),
      _ = e.P(m, y + 1.8, M * x),
      z = e.P(p, y + 1.8, M * x);
    Ms(
      r,
      S,
      w,
      _,
      z,
      Rt([0.1, 0.12, 0.13], Tt.glass),
      e.P((p + m) / 2, y, M * (x + 40)),
    );
  }
  if (
    (e.box(r, p, -x - 0.6, m + 0.6, x + 0.6, y + 1.8, y + 2.3, f),
    Ms(
      r,
      e.P(m, b, -g),
      e.P(m, b, g),
      e.P(m, y, x),
      e.P(m, y, -x),
      Ja("shed_side", u),
      e.P(m + 40, b, 0),
    ),
    Ms(
      r,
      e.P(m, y, -x),
      e.P(m, y, x),
      e.P(m, y + 2.3, x),
      e.P(m, y + 2.3, -x),
      Rt([0.6, 0.6, 0.58], Tt.paint),
      e.P(m + 40, y, 0),
    ),
    s.kind === "cruise")
  )
    return ldt(o, t, e, s);
  if (
    (s.kind === "explo" &&
      (e.box(
        r,
        i - 42,
        -a + 2,
        i - 2,
        a - 2,
        l,
        l + 13,
        Rt([0.12, 0.15, 0.17], Tt.glass),
      ),
      e.box(
        r,
        i - 43,
        -a + 1.2,
        i - 1.2,
        a - 1.2,
        l + 13,
        l + 14,
        Rt([0.8, 0.8, 0.78], Tt.metal),
      )),
    s.kind === "fish" || s.kind === "ferry")
  ) {
    (e.wall(o.atlas, p - 9, g, p - 9, -g, l, b, v),
      e.box(r, p - 9, -g, p, g, b, b + 0.3, f),
      e.wall(o.atlas, p - 9, -g, p, -g, l, b, v),
      e.wall(o.atlas, p, g, p - 9, g, l, b, v));
    let M = t.word("PIER " + s.n, {
        font: "bold 120px Arial, Helvetica, sans-serif",
        h: 140,
      }),
      S = e.P(p - 9.05, b - 2.2, 0);
    ri(
      o.text,
      t,
      M,
      S[0],
      S[1],
      S[2],
      -e.out[0],
      -e.out[1],
      Math.min(14, g * 1.4),
      null,
      xo([0.08, 0.1, 0.12], !0),
    );
    return;
  }
  odt(o, t, e, s, u);
}
function odt(o, t, e, s, n) {
  let i = s.w / 2,
    a = o.solid,
    r = 3,
    l = 9,
    c = Math.min(10, i - 4),
    h = 21,
    f = 16,
    u = J0(Ja(+s.n % 2 === 1 && +s.n % 4 === 1 ? "bulk_b" : "bulk_a", n)),
    d = J0(Ja("bulk_wing", n)),
    p = [0.66 * n[0], 0.63 * n[1], 0.55 * n[2]],
    m = J0(Rt(p, Tt.paint)),
    g = Rt(
      p.map((y) => y * 0.8),
      Tt.paint,
    );
  (e.wall(o.atlas, 0, i, 0, c, r, f, d, 0),
    e.wall(o.atlas, 0, -c, 0, -i, r, f, d, 0),
    e.wall(o.atlas, -0.8, c, -0.8, -c, r, h, u, 0),
    e.wall(o.atlas, 0, c, -0.8, c, r, h, d, 0),
    e.wall(o.atlas, -0.8, -c, 0, -c, r, h, d, 0),
    e.wall(o.atlas, 0, -i, l, -i, r, f, d, 0),
    e.wall(o.atlas, l, i, 0, i, r, f, d, 0),
    e.wall(o.atlas, l, -c, l, c, f - 2, h, d, 0),
    e.wall(o.atlas, 0, -c, l, -c, f, h, d, 0),
    e.wall(o.atlas, l, c, 0, c, f, h, d, 0),
    e.box(a, -0.6, -i - 0.4, l + 0.4, i + 0.4, f - 0.1, f + 0.7, m, {
      bottom: !0,
    }),
    e.box(a, -1.5, -c - 0.6, l + 0.3, c + 0.6, h - 0.2, h + 0.8, m, {
      bottom: !0,
    }),
    e.box(a, -1.1, -c - 0.2, l, c + 0.2, h + 0.8, h + 3.6, m),
    e.box(a, -1.3, -c - 0.4, l + 0.2, c + 0.4, h + 3.6, h + 4.1, m),
    e.box(a, 0.5, -i + 0.3, l - 0.2, i - 0.3, f + 0.7, f + 1.3, g));
  for (let y of [-i, i])
    e.box(a, -0.4, y - 0.7, 0.4, y + 0.7, r, f, m, { top: !1 });
  let b = t.word("PIER " + s.n, {
      font: '600 118px Georgia, "Times New Roman", serif',
      h: 140,
      spacing: 10,
    }),
    v = e.P(-1.12, h + 2.2, 0);
  if (
    (ri(
      o.text,
      t,
      b,
      v[0],
      v[1],
      v[2],
      -e.out[0],
      -e.out[1],
      Math.min(12, c * 1.3),
      null,
      xo([0.12, 0.2, 0.17], !1),
    ),
    +s.n % 3 !== 0)
  ) {
    let M = h + 4.1,
      S = M + 2.6;
    (Ms(
      a,
      e.P(-1.3, M, -c - 0.4),
      e.P(-1.3, M, c + 0.4),
      e.P(-1.3, S, 0),
      e.P(-1.3, S, 0),
      m,
      e.P(-1.3 - 20, M, 0),
    ),
      Ms(
        a,
        e.P(-1.3, M, -c - 0.4),
        e.P(l, M, -c - 0.4),
        e.P(l, S + 0.1, 0),
        e.P(-1.3, S + 0.1, 0),
        g,
        e.P(l / 2, S + 30, -c - 30),
      ),
      Ms(
        a,
        e.P(-1.3, M, c + 0.4),
        e.P(l, M, c + 0.4),
        e.P(l, S + 0.1, 0),
        e.P(-1.3, S + 0.1, 0),
        g,
        e.P(l / 2, S + 30, c + 30),
      ),
      Ms(
        a,
        e.P(l, M, -c - 0.4),
        e.P(l, M, c + 0.4),
        e.P(l, S, 0),
        e.P(l, S, 0),
        g,
        e.P(l + 20, M, 0),
      ));
  }
  let x = e.P(l * 0.5, h + 4.1, 0);
  os(a, x[0], x[2], 0.08, x[1], x[1] + 9, 5, Rt([0.8, 0.8, 0.8], Tt.metal));
}
function adt(o, t, e, s) {
  let n = s.w / 2,
    i = o.solid,
    a = 3,
    r = Rt([0.05, 0.06, 0.06], Tt.metal);
  (s0(i, e.L(1, -n + 0.2), e.L(s.len - 0.3, -n + 0.2), a, r, { step: 2 }),
    s0(i, e.L(1, n - 0.2), e.L(s.len - 0.3, n - 0.2), a, r, { step: 2 }),
    s0(i, e.L(s.len - 0.3, -n + 0.2), e.L(s.len - 0.3, n - 0.2), a, r, {
      step: 2,
    }));
  let l = s.lamps || 12;
  for (let c = 0; c < l; c++) {
    let h = 12 + (c * (s.len - 20)) / (l - 1);
    for (let f of [-1, 1]) {
      let u = e.P(h, a, f * (n - 0.8));
      (os(i, u[0], u[2], 0.1, a, a + 4.2, 6, r, 0.07),
        os(i, u[0], u[2], 0.2, a, a + 0.5, 6, r, 0.14),
        os(
          i,
          u[0],
          u[2],
          0.22,
          a + 4.2,
          a + 4.9,
          6,
          Rt([1, 0.85, 0.6], Tt.lamp),
          0.26,
        ),
        os(i, u[0], u[2], 0.3, a + 4.9, a + 5.1, 6, r, 0.05));
    }
    if (c % 2 === 1)
      for (let f of [-1, 1]) ih(i, e, h, f * (n - 1.8), f > 0 ? 1 : -1);
  }
}
