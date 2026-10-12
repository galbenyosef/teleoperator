// app 144 — math
// Lines 92612-92865 of readable/app.pretty.js (statement-aligned).
function Cut(i, t) {
  let e = Ly,
    s = Iy(i, -7300.8, -1399.2),
    n = i.juns.find(
      (N) => N.polys.length && Math.hypot(N.x + 7307.5, N.z + 1387) < 6,
    );
  if (!s || !n) {
    console.warn("highways: Golden Gate ends not found");
    return;
  }
  let o = oj(i, s, "b"),
    a = o ? Put(o, "b")[2] : s.y,
    r = n.y,
    l = (N, B) => e.at(N, B),
    c = (N, B, H) => {
      let O = [];
      for (let D = N; D <= B + 0.01; D += 20) O.push(l(Math.min(D, B), H));
      return O;
    },
    h = (N) => e.s(N[0], N[1]),
    f = i.juns.find(
      (N) =>
        N.region === "marin" &&
        Math.hypot(N.x - Wh[Wh.length - 1][0], N.z - Wh[Wh.length - 1][1]) < 3,
    ),
    u = i.juns.find(
      (N) =>
        N.region === "marin" && Math.hypot(N.x - D7[0][0], N.z - D7[0][1]) < 3,
    );
  if (f && u)
    return Lut(i, t, {
      A: e,
      J0: s,
      JT: n,
      E0: o,
      y0: a,
      yT: r,
      JN: f,
      JS: u,
      straight: c,
      sOf: h,
    });
  let d = Wh[Wh.length - 1],
    p = Wh[Wh.length - 2],
    m = U7(d[0] - p[0], d[1] - p[1]),
    g = [m[1], -m[0]],
    b = 27,
    x = [d[0] + m[0] * 22 + g[0] * 5, d[1] + m[1] * 22 + g[1] * 5],
    v = e.deck(h(x)),
    y = [];
  for (let N = 0; N < 40; N++) {
    let B = -(N / 40) * Math.PI * 2;
    y.push([x[0] + Math.cos(B) * b, x[1] + Math.sin(B) * b]);
  }
  let M = $S(i, { x: x[0], z: x[1], y: v, ring: y }),
    S = Math.sqrt(b * b - 25),
    w = [x[0] - g[0] * 5, x[1] - g[1] * 5],
    z = [x[0] + g[0] * 5, x[1] + g[1] * 5],
    _ = yb([...vb, ...c(h(vb[vb.length - 1]) + 20, 1722, e.half), ...Wh, w], 8),
    R = yb(
      [
        z,
        [z[0] - m[0] * 12, z[1] - m[1] * 12],
        ...sj,
        ...c(h(XS[0]) + 20, 1722, -e.half).reverse(),
        ...XS,
      ],
      8,
    );
  aj(_, R, 2 * e.lw + e.median, [40, 0], [0, 40]);
  let T = (N) => e.deck(h(N)),
    E = (N, B, H, O) => {
      let D = [0];
      for (let G = 1; G < N.length; G++)
        D.push(
          D[G - 1] + Math.hypot(N[G][0] - N[G - 1][0], N[G][1] - N[G - 1][1]),
        );
      let U = D[D.length - 1];
      return N.map((G, q) => {
        let W = H ? U - D[q] : D[q];
        if (W > O + 40) return G;
        let V = Math.max(0, Math.min(1, (W - O) / 40));
        return [G[0], G[1], B + (G[2] - B) * V * V * (3 - 2 * V)];
      });
    },
    A = wb(_, T, a, null);
  A = E(A, v, !0, S + 2);
  let C = wb(R, T, null, r);
  C = E(C, v, !1, S + 2);
  let P = o ? o.W[o.n - 1] : 7.2,
    I = {
      lanes: 3,
      laneW: (e.lw * 2) / 3,
      name: "Golden Gate Bridge",
      rank: o?.rank ?? 8,
      maxspeed: 45,
      dist: "presidio",
      custom: "gg",
      way: 595194543,
    },
    L = cu(i, {
      ...I,
      pts: A,
      w: (N, B) => {
        let H = N * 8;
        return H < 60 ? P + (e.lw - P) * Math.min(1, H / 60) : e.lw;
      },
      ja: s.id,
      jb: M.id,
      tb: S,
    }),
    F = cu(i, {
      ...I,
      pts: C,
      w: e.lw,
      ja: M.id,
      jb: n.id,
      ta: S,
      way: 537838948,
    });
  ((L.W[0] = P),
    s.type === "end" && (s.type = "j"),
    (t.gg = {
      axis: e,
      nb: L,
      sb: F,
      plaza: M,
      R: b,
      C: x,
      YP: v,
      median: rj(L, F),
    }),
    (Mb.gg = t.gg));
}
var D7 = [
  [-7686.1, -4084.2],
  [-7674.6, -4070.7],
  [-7668.5, -4063],
  [-7664.9, -4058.5],
];
function Lut(
  i,
  t,
  {
    A: e,
    J0: s,
    JT: n,
    E0: o,
    y0: a,
    yT: r,
    JN: l,
    JS: c,
    straight: h,
    sOf: f,
  },
) {
  let u = i.edges.find((L) => L.ja === l.id),
    d = i.edges.find((L) => L.jb === c.id),
    p = u ? u.P[2] : l.y,
    m = d ? d.P[d.n * 3 - 1] : c.y,
    g = u ? u.W[0] : e.lw,
    b = d ? d.W[d.n - 1] : e.lw,
    x = yb([...vb, ...h(f(vb[vb.length - 1]) + 20, 1722, e.half), ...Wh], 8),
    v = yb(
      [...D7, ...sj, ...h(f(XS[0]) + 20, 1722, -e.half).reverse(), ...XS],
      8,
    ),
    y = (L, F, N) => {
      let B = [0];
      for (let G = 1; G < L.length; G++)
        B.push(
          B[G - 1] + Math.hypot(L[G][0] - L[G - 1][0], L[G][1] - L[G - 1][1]),
        );
      let H = B[B.length - 1],
        O = N ? L[L.length - 1] : L[0],
        D = F.x - O[0],
        U = F.z - O[1];
      L.forEach((G, q) => {
        let W = N ? H - B[q] : B[q];
        if (W < 120) {
          let V = 1 - W / 120,
            Y = V * V * (3 - 2 * V);
          ((G[0] += D * Y), (G[1] += U * Y));
        }
      });
    };
  (aj(x, v, 2 * e.lw + e.median, [40, 0], [0, 40]), y(x, l, !0), y(v, c, !1));
  let M = (L) => e.deck(f(L)),
    S = wb(x, M, a, p, 150),
    w = wb(v, M, m, r, 150),
    z = o ? o.W[o.n - 1] : 7.2,
    _ = (L) => {
      let F = [0];
      for (let N = 1; N < L.length; N++)
        F.push(
          F[N - 1] + Math.hypot(L[N][0] - L[N - 1][0], L[N][1] - L[N - 1][1]),
        );
      return F;
    },
    R = _(S),
    T = _(w),
    E = R[R.length - 1],
    A = {
      lanes: 3,
      laneW: (e.lw * 2) / 3,
      name: "Golden Gate Bridge",
      rank: o?.rank ?? 8,
      maxspeed: 45,
      dist: "presidio",
      custom: "gg",
      way: 595194543,
    },
    C = (L, F, N) => F + (N - F) * Math.min(1, Math.max(0, L / 60)),
    P = cu(i, {
      ...A,
      pts: S,
      w: (L) => {
        let F = L * 8,
          N = E - R[L];
        return F < 60 ? C(F, z, e.lw) : N < 60 ? C(N, g, e.lw) : e.lw;
      },
      ja: s.id,
      jb: l.id,
    }),
    I = cu(i, {
      ...A,
      pts: w,
      w: (L) => {
        let F = T[L];
        return F < 60 ? C(F, b, e.lw) : e.lw;
      },
      ja: c.id,
      jb: n.id,
      way: 537838948,
    });
  ((P.W[0] = z),
    (P.W[P.n - 1] = g),
    (I.W[0] = b),
    s.type === "end" && (s.type = "j"),
    l.type === "end" && (l.type = "j"),
    c.type === "end" && (c.type = "j"),
    (t.gg = {
      axis: e,
      nb: P,
      sb: I,
      plaza: null,
      R: 0,
      C: null,
      YP: null,
      marin: !0,
      median: rj(P, I),
    }),
    (Mb.gg = t.gg));
}
