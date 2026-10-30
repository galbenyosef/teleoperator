// app 118 — math
// Lines 84571-84876 of readable/app.pretty.js (statement-aligned).
function JP(o, t) {
  let e = new Be(),
    s = new Be(),
    n = Zb(Qa, tr) - 0.3,
    i = 16,
    a = [0, 11];
  for (let m = 30; m < Wm; m += 20) a.push(m);
  a.push(Wm);
  let r = a.map((m) => Qb(Qa, tr, hh(m), qm(m), i, n + m)),
    l = k1t(r[0]),
    c = [];
  {
    let m = 0,
      g = r[0];
    for (let b = 0; b < g.length; b++) {
      c.push(m);
      let v = g[b],
        x = g[(b + 1) % g.length];
      m += Math.hypot(x[0] - v[0], x[2] - v[2]);
    }
    c.push(m);
  }
  let h = Tn(ln.SFT, we.sfskin, 1),
    f = Tn(ln.OFFICE, we.sfskin, 0.9);
  (bf(e, r.slice(0, 2), f, (m, g) => [c[g], a[m]], !0),
    bf(e, r.slice(1), h, (m, g) => [c[g] * 1, a[m + 1]], !0));
  {
    let m = hh(0) + 3.5;
    ss(
      e,
      Qa - m,
      n + 7.5,
      tr - m,
      Qa + m,
      n + 8.2,
      tr + m,
      Lt(Ct.metal, 0.75, 0.76, 0.76),
    );
  }
  let u = [Wm];
  for (let m = Wm + 4.5; m < fh; m += 4.5) u.push(m);
  u.push(fh);
  let d = u
    .filter((m) => m <= fh - 6)
    .map((m) => Qb(Qa, tr, hh(m) - 2.6, Math.max(2, qm(m) - 2.6), i, n + m));
  bf(e, d, Tn(ln.LED, 0, 1), (m, g) => [g * 4, u[m]], !0);
  {
    let m = Qb(
      Qa,
      tr,
      hh(fh - 6) - 2.6,
      Math.max(2, qm(fh - 6) - 2.6),
      i,
      n + u.filter((g) => g <= fh - 6).pop(),
    );
    oe(e, m.slice().reverse(), Lt(Ct.stone, 0.1, 0.1, 0.1), [0, 1, 0], (g) => [
      g[0],
      g[2],
    ]);
  }
  let p = We(we.sfskin, 1.02);
  for (let m = 0; m < u.length; m++) {
    let g = u[m],
      b = Qb(Qa, tr, hh(g), qm(g), i * 2, n + g),
      v = Qb(Qa, tr, hh(g) - 1.4, Math.max(1, qm(g) - 1.4), i * 2, n + g);
    for (let x = 0; x < b.length; x++) {
      let y = (x + 1) % b.length;
      oe(s, [b[x], b[y], v[y], v[x]], p, [0, 1, 0], (M) => [M[0], M[2]]);
    }
  }
  {
    let g = (b, v, x) => {
      let y = Qb(Qa, tr, hh(b) - x, Math.max(1, qm(b) - x), 32, n + b),
        M = y.length,
        S = v * M,
        w = Math.floor(S) % M,
        _ = S - Math.floor(S),
        z = y[w],
        A = y[(w + 1) % M];
      return [z[0] + (A[0] - z[0]) * _, z[1], z[2] + (A[2] - z[2]) * _];
    };
    for (let b = 0; b < 56; b++) {
      let v = b / 56;
      for (let x = 0; x + 1 < u.length; x++) {
        let y = u[x],
          M = u[x + 1],
          S = g(y, v, 0),
          w = g(M, v, 0),
          _ = g(M, v, 1.4),
          z = g(y, v, 1.4),
          A = S[0] - Qa,
          T = S[2] - tr,
          E = Math.hypot(A, T);
        oe(s, [S, w, _, z], p, [-T / E, 0, A / E], (R) => [R[0] + R[2], R[1]]);
      }
    }
  }
  for (let m = 0; m < 4; m++) {
    let g = ((m + 0.5) * Math.PI) / 2,
      b = hh(fh) - 0.7;
    ss(
      e,
      Qa + Math.cos(g) * b - 0.5,
      n + fh,
      tr + Math.sin(g) * b - 0.5,
      Qa + Math.cos(g) * b + 0.5,
      n + fh + 1,
      tr + Math.sin(g) * b + 0.5,
      wn(1, 0.05, 0.02),
    );
  }
  if (o.real) {
    let m = hh(0),
      g = qm(0),
      b = m - g,
      v = [];
    for (let x = 0; x < 4; x++) {
      let y = [0, -Math.PI / 2, Math.PI, Math.PI / 2][x],
        M = Math.cos(y),
        S = Math.sin(y),
        w = Math.sin(y),
        _ = -Math.cos(y),
        [z, A] = [
          [1, -1],
          [-1, -1],
          [-1, 1],
          [1, 1],
        ][x];
      v.push(
        Qa + M * m - w * b,
        tr + S * m - _ * b,
        Qa + M * m + w * b,
        tr + S * m + _ * b,
      );
      for (let T = 1; T < 4; T++) {
        let E = y - ((T / 4) * Math.PI) / 2;
        v.push(Qa + z * b + Math.cos(E) * g, tr + A * b + Math.sin(E) * g);
      }
    }
    o.colliders.push({
      t: "poly",
      pts: Float32Array.from(v),
      bb: [Qa - m, tr - m, Qa + m, tr + m],
      y0: n - 2,
      y1: n + Wm,
      roof: !0,
      lean: (hh(0) - hh(Wm)) / Wm,
    });
  }
  (vn(o.group, e, t.mid, "SalesforceTower"),
    vn(o.group, s, t.midDS, "SalesforceCrown"));
}
function ZP(o, t, e = bw) {
  let s = e;
  {
    let n = new Be(),
      i = 24,
      a = Math.min(Zb(s.x0, s.z0), Zb(s.x1, s.z1)) - 1,
      r = (g) =>
        !!o.real &&
        [s.z0 + 2, (s.z0 + s.z1) / 2, s.z1 - 2].some(
          (b) => m0(g, b) === "road",
        ),
      l = (g, b) => (r(g) ? Zb(g, b) + 7.5 : a),
      c = We(we.perforated, 0.97),
      h = Math.ceil((s.x1 - s.x0) / 4),
      f = [0, 3, 7, 11, 15, 19, i],
      u = (g, b) =>
        1.6 * Math.sin(g / 23 + 0.8) * Math.sin((Math.PI * b) / i) +
        0.7 * Math.sin(g / 7.5) * Math.pow(Math.sin((Math.PI * b) / i), 2);
    for (let g of [-1, 1]) {
      let b = g < 0 ? s.z0 : s.z1,
        v = f.map((x) => {
          let y = [];
          for (let M = 0; M <= h; M++) {
            let S =
              g < 0
                ? s.x1 - ((s.x1 - s.x0) * M) / h
                : s.x0 + ((s.x1 - s.x0) * M) / h;
            y.push([
              S,
              x === 0 ? l(S, b) : Math.max(a + 1 + x, l(S, b) + 1),
              b + g * u(S, x),
            ]);
          }
          return y;
        });
      bf(n, v, c, (x, y) => [g < 0 ? s.x1 - v[x][y][0] : v[x][y][0], f[x]]);
    }
    for (let [g, b] of [
      [s.x0, -1],
      [s.x1, 1],
    ]) {
      let v = [g, a, b < 0 ? s.z1 : s.z0],
        x = [g, a, b < 0 ? s.z0 : s.z1];
      oe(
        n,
        [v, x, [x[0], a + 1 + i, x[2]], [v[0], a + 1 + i, v[2]]],
        c,
        [b, 0, 0],
        (y) => [y[2], y[1] - a],
      );
    }
    let d = a + 1 + i;
    _l(n, s.x0, s.z0, s.x1, s.z1, 20, () => d, We(we.lawn, 0.8, 0.95, 0.75));
    for (let g of [(s.z0 + s.z1) / 2 - 1.5])
      _l(
        n,
        s.x0 + 3,
        g,
        s.x1 - 3,
        g + 3,
        20,
        () => d + 0.09,
        We(we.granite, 1.1),
      );
    for (let [g, b] of [
      [s.z0, s.z0 + 0.4],
      [s.z1 - 0.4, s.z1],
    ])
      ss(n, s.x0, d, g, s.x1, d + 1.1, b, We(we.perforated, 1));
    let p = Lt(Ct.leaf, 0.05, 0.09, 0.03),
      m = Lt(Ct.matte, 0.2, 0.15, 0.1);
    for (let g = 0, b = Math.round((60 * (s.x1 - s.x0)) / 120); g < b; g++) {
      let v = s.x0 + 6 + ((g * 37.3) % (s.x1 - s.x0 - 12)),
        x = s.z0 + 5 + ((g * 13.7) % (s.z1 - s.z0 - 10));
      if (Math.abs(x - (s.z0 + s.z1) / 2) < 3) continue;
      let y = 5 + (g % 5);
      (Ce(n, [v, d, x], [v, d + y * 0.5, x], 0.18, m, 4),
        qe(
          n,
          v,
          x,
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
    if (o.real) {
      let g = Math.ceil((s.x1 - s.x0) / 3),
        b = null,
        v = Lt(Ct.stone, 0.5, 0.5, 0.49),
        x = o.F,
        y = [];
      for (let M = 0; M <= g; M++) {
        let S = s.x0 + ((s.x1 - s.x0) * M) / g,
          w = M < g && r(S);
        if (w) {
          let _ = Math.min(s.x1, S + (s.x1 - s.x0) / g),
            z = Zb(S, (s.z0 + s.z1) / 2) + 7.5;
          n.quad(
            [S, z, s.z0],
            [_, z, s.z0],
            [_, z, s.z1],
            [S, z, s.z1],
            [S, s.z0],
            [_, s.z0],
            [_, s.z1],
            [S, s.z1],
            v,
            [0, -1, 0],
          );
          let A = y[y.length - 1];
          x &&
          A &&
          Math.abs(A.x1 - S) < 0.01 &&
          Math.abs(A.y - (z + x.dy)) < 1.5
            ? ((A.x1 = _), (A.y = Math.min(A.y, z + x.dy)))
            : x &&
              y.push({
                inv: x.inv,
                x0: S,
                x1: _,
                z0: s.z0,
                z1: s.z1,
                y: z + x.dy,
              });
        }
        !w && M < g
          ? (b || (b = [S, S]), (b[1] = S + (s.x1 - s.x0) / g))
          : b &&
            (b[1] - b[0] > 2 &&
              o.colliders.push({
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
        o.colliders.push({ t: "box", x0: b[0], z0: s.z0, x1: b[1], z1: s.z1 }),
        pj("transit", y));
    }
    vn(o.group, n, t.mid, "TransitCenter", { shadow: !1 });
  }
}
Pn();
