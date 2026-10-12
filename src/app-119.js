// app 119 — math
// Lines 84333-84608 of readable/app.pretty.js (statement-aligned).
function y7(i, t) {
  let e = new Ce(),
    s = new Ce(),
    n = hb(Gr, Wr) - 0.3,
    o = 16,
    a = [0, 11];
  for (let m = 30; m < HS; m += 20) a.push(m);
  a.push(HS);
  let r = a.map((m) => db(Gr, Wr, Wd(m), ub(m), o, n + m)),
    l = sut(r[0]),
    c = [];
  {
    let m = 0,
      g = r[0];
    for (let b = 0; b < g.length; b++) {
      c.push(m);
      let x = g[b],
        v = g[(b + 1) % g.length];
      m += Math.hypot(v[0] - x[0], v[2] - x[2]);
    }
    c.push(m);
  }
  let h = yn(sn.SFT, be.sfskin, 1),
    f = yn(sn.OFFICE, be.sfskin, 0.9);
  (Uh(e, r.slice(0, 2), f, (m, g) => [c[g], a[m]], !0),
    Uh(e, r.slice(1), h, (m, g) => [c[g] * 1, a[m + 1]], !0));
  {
    let m = Wd(0) + 3.5;
    Ze(
      e,
      Gr - m,
      n + 7.5,
      Wr - m,
      Gr + m,
      n + 8.2,
      Wr + m,
      It(Lt.metal, 0.75, 0.76, 0.76),
    );
  }
  let u = [HS];
  for (let m = HS + 4.5; m < Fc; m += 4.5) u.push(m);
  u.push(Fc);
  let d = u
    .filter((m) => m <= Fc - 6)
    .map((m) => db(Gr, Wr, Wd(m) - 2.6, Math.max(2, ub(m) - 2.6), o, n + m));
  Uh(e, d, yn(sn.LED, 0, 1), (m, g) => [g * 4, u[m]], !0);
  {
    let m = db(
      Gr,
      Wr,
      Wd(Fc - 6) - 2.6,
      Math.max(2, ub(Fc - 6) - 2.6),
      o,
      n + u.filter((g) => g <= Fc - 6).pop(),
    );
    ne(e, m.slice().reverse(), It(Lt.stone, 0.1, 0.1, 0.1), [0, 1, 0], (g) => [
      g[0],
      g[2],
    ]);
  }
  let p = Be(be.sfskin, 1.02);
  for (let m = 0; m < u.length; m++) {
    let g = u[m],
      b = db(Gr, Wr, Wd(g), ub(g), o * 2, n + g),
      x = db(Gr, Wr, Wd(g) - 1.4, Math.max(1, ub(g) - 1.4), o * 2, n + g);
    for (let v = 0; v < b.length; v++) {
      let y = (v + 1) % b.length;
      ne(s, [b[v], b[y], x[y], x[v]], p, [0, 1, 0], (M) => [M[0], M[2]]);
    }
  }
  {
    let g = (b, x, v) => {
      let y = db(Gr, Wr, Wd(b) - v, Math.max(1, ub(b) - v), 32, n + b),
        M = y.length,
        S = x * M,
        w = Math.floor(S) % M,
        z = S - Math.floor(S),
        _ = y[w],
        R = y[(w + 1) % M];
      return [_[0] + (R[0] - _[0]) * z, _[1], _[2] + (R[2] - _[2]) * z];
    };
    for (let b = 0; b < 56; b++) {
      let x = b / 56;
      for (let v = 0; v + 1 < u.length; v++) {
        let y = u[v],
          M = u[v + 1],
          S = g(y, x, 0),
          w = g(M, x, 0),
          z = g(M, x, 1.4),
          _ = g(y, x, 1.4),
          R = S[0] - Gr,
          T = S[2] - Wr,
          E = Math.hypot(R, T);
        ne(s, [S, w, z, _], p, [-T / E, 0, R / E], (A) => [A[0] + A[2], A[1]]);
      }
    }
  }
  for (let m = 0; m < 4; m++) {
    let g = ((m + 0.5) * Math.PI) / 2,
      b = Wd(Fc) - 0.7;
    Ze(
      e,
      Gr + Math.cos(g) * b - 0.5,
      n + Fc,
      Wr + Math.sin(g) * b - 0.5,
      Gr + Math.cos(g) * b + 0.5,
      n + Fc + 1,
      Wr + Math.sin(g) * b + 0.5,
      bn(1, 0.05, 0.02),
    );
  }
  (i.real &&
    i.colliders.push({
      t: "box",
      x0: Gr - 27,
      z0: Wr - 27,
      x1: Gr + 27,
      z1: Wr + 27,
    }),
    gn(i.group, e, t.mid, "SalesforceTower"),
    gn(i.group, s, t.midDS, "SalesforceCrown"));
}
function w7(i, t, e = Sy) {
  let s = e;
  {
    let n = new Ce(),
      o = 24,
      a = Math.min(hb(s.x0, s.z0), hb(s.x1, s.z1)) - 1,
      r = (g) =>
        !!i.real &&
        [s.z0 + 2, (s.z0 + s.z1) / 2, s.z1 - 2].some(
          (b) => Qr(g, b) === "road",
        ),
      l = (g, b) => (r(g) ? hb(g, b) + 7.5 : a),
      c = Be(be.perforated, 0.97),
      h = Math.ceil((s.x1 - s.x0) / 4),
      f = [0, 3, 7, 11, 15, 19, o],
      u = (g, b) =>
        1.6 * Math.sin(g / 23 + 0.8) * Math.sin((Math.PI * b) / o) +
        0.7 * Math.sin(g / 7.5) * Math.pow(Math.sin((Math.PI * b) / o), 2);
    for (let g of [-1, 1]) {
      let b = g < 0 ? s.z0 : s.z1,
        x = f.map((v) => {
          let y = [];
          for (let M = 0; M <= h; M++) {
            let S =
              g < 0
                ? s.x1 - ((s.x1 - s.x0) * M) / h
                : s.x0 + ((s.x1 - s.x0) * M) / h;
            y.push([
              S,
              v === 0 ? l(S, b) : Math.max(a + 1 + v, l(S, b) + 1),
              b + g * u(S, v),
            ]);
          }
          return y;
        });
      Uh(n, x, c, (v, y) => [g < 0 ? s.x1 - x[v][y][0] : x[v][y][0], f[v]]);
    }
    for (let [g, b] of [
      [s.x0, -1],
      [s.x1, 1],
    ]) {
      let x = [g, a, b < 0 ? s.z1 : s.z0],
        v = [g, a, b < 0 ? s.z0 : s.z1];
      ne(
        n,
        [x, v, [v[0], a + 1 + o, v[2]], [x[0], a + 1 + o, x[2]]],
        c,
        [b, 0, 0],
        (y) => [y[2], y[1] - a],
      );
    }
    let d = a + 1 + o;
    il(n, s.x0, s.z0, s.x1, s.z1, 20, () => d, Be(be.lawn, 0.8, 0.95, 0.75));
    for (let g of [(s.z0 + s.z1) / 2 - 1.5])
      il(
        n,
        s.x0 + 3,
        g,
        s.x1 - 3,
        g + 3,
        20,
        () => d + 0.09,
        Be(be.granite, 1.1),
      );
    for (let [g, b] of [
      [s.z0, s.z0 + 0.4],
      [s.z1 - 0.4, s.z1],
    ])
      Ze(n, s.x0, d, g, s.x1, d + 1.1, b, Be(be.perforated, 1));
    let p = It(Lt.leaf, 0.05, 0.09, 0.03),
      m = It(Lt.matte, 0.2, 0.15, 0.1);
    for (let g = 0, b = Math.round((60 * (s.x1 - s.x0)) / 120); g < b; g++) {
      let x = s.x0 + 6 + ((g * 37.3) % (s.x1 - s.x0 - 12)),
        v = s.z0 + 5 + ((g * 13.7) % (s.z1 - s.z0 - 10));
      if (Math.abs(v - (s.z0 + s.z1) / 2) < 3) continue;
      let y = 5 + (g % 5);
      (Ae(n, [x, d, v], [x, d + y * 0.5, v], 0.18, m, 4),
        Oe(
          n,
          x,
          v,
          [
            [0.01, d + y * 0.35],
            [2.2, d + y * 0.55],
            [2.4, d + y * 0.8],
            [1.2, d + y],
            [0.01, d + y * 1.05],
          ],
          7,
          p,
        ));
    }
    if (i.real) {
      let g = Math.ceil((s.x1 - s.x0) / 3),
        b = null,
        x = It(Lt.stone, 0.5, 0.5, 0.49),
        v = i.F,
        y = [];
      for (let M = 0; M <= g; M++) {
        let S = s.x0 + ((s.x1 - s.x0) * M) / g,
          w = M < g && r(S);
        if (w) {
          let z = Math.min(s.x1, S + (s.x1 - s.x0) / g),
            _ = hb(S, (s.z0 + s.z1) / 2) + 7.5;
          n.quad(
            [S, _, s.z0],
            [z, _, s.z0],
            [z, _, s.z1],
            [S, _, s.z1],
            [S, s.z0],
            [z, s.z0],
            [z, s.z1],
            [S, s.z1],
            x,
            [0, -1, 0],
          );
          let R = y[y.length - 1];
          v &&
          R &&
          Math.abs(R.x1 - S) < 0.01 &&
          Math.abs(R.y - (_ + v.dy)) < 1.5
            ? ((R.x1 = z), (R.y = Math.min(R.y, _ + v.dy)))
            : v &&
              y.push({
                inv: v.inv,
                x0: S,
                x1: z,
                z0: s.z0,
                z1: s.z1,
                y: _ + v.dy,
              });
        }
        !w && M < g
          ? (b || (b = [S, S]), (b[1] = S + (s.x1 - s.x0) / g))
          : b &&
            (b[1] - b[0] > 2 &&
              i.colliders.push({
                t: "box",
                x0: b[0],
                z0: s.z0,
                x1: b[1],
                z1: s.z1,
              }),
            (b = null));
      }
      (b &&
        b[1] - b[0] > 2 &&
        i.colliders.push({ t: "box", x0: b[0], z0: s.z0, x1: b[1], z1: s.z1 }),
        uq("transit", y));
    }
    gn(i.group, n, t.mid, "TransitCenter", { shadow: !1 });
  }
}
En();
