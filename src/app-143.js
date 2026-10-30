// app 143 — math
// Lines 92881-93134 of readable/app.pretty.js (statement-aligned).
function tmt(o, t) {
  let e = Ew,
    s = Tw(o, -7300.8, -1399.2),
    n = o.juns.find(
      (O) => O.polys.length && Math.hypot(O.x + 7307.5, O.z + 1387) < 6,
    );
  if (!s || !n) {
    console.warn("highways: Golden Gate ends not found");
    return;
  }
  let i = r$(o, s, "b"),
    a = i ? Q1t(i, "b")[2] : s.y,
    r = n.y,
    l = (O, B) => e.at(O, B),
    c = (O, B, H) => {
      let N = [];
      for (let D = O; D <= B + 0.01; D += 20) N.push(l(Math.min(D, B), H));
      return N;
    },
    h = (O) => e.s(O[0], O[1]),
    f = o.juns.find(
      (O) =>
        O.region === "marin" &&
        Math.hypot(O.x - vf[vf.length - 1][0], O.z - vf[vf.length - 1][1]) < 3,
    ),
    u = o.juns.find(
      (O) =>
        O.region === "marin" && Math.hypot(O.x - bC[0][0], O.z - bC[0][1]) < 3,
    );
  if (f && u)
    return emt(o, t, {
      A: e,
      J0: s,
      JT: n,
      E0: i,
      y0: a,
      yT: r,
      JN: f,
      JS: u,
      straight: c,
      sOf: h,
    });
  let d = vf[vf.length - 1],
    p = vf[vf.length - 2],
    m = xC(d[0] - p[0], d[1] - p[1]),
    g = [m[1], -m[0]],
    b = 27,
    v = [d[0] + m[0] * 22 + g[0] * 5, d[1] + m[1] * 22 + g[1] * 5],
    x = e.deck(h(v)),
    y = [];
  for (let O = 0; O < 40; O++) {
    let B = -(O / 40) * Math.PI * 2;
    y.push([v[0] + Math.cos(B) * b, v[1] + Math.sin(B) * b]);
  }
  let M = $k(o, { x: v[0], z: v[1], y: x, ring: y }),
    S = Math.sqrt(b * b - 25),
    w = [v[0] - g[0] * 5, v[1] - g[1] * 5],
    _ = [v[0] + g[0] * 5, v[1] + g[1] * 5],
    z = ax([...ox, ...c(h(ox[ox.length - 1]) + 20, 1722, e.half), ...vf, w], 8),
    A = ax(
      [
        _,
        [_[0] - m[0] * 12, _[1] - m[1] * 12],
        ...i$,
        ...c(h(Xk[0]) + 20, 1722, -e.half).reverse(),
        ...Xk,
      ],
      8,
    );
  l$(z, A, 2 * e.lw + e.median, [40, 0], [0, 40]);
  let T = (O) => e.deck(h(O)),
    E = (O, B, H, N) => {
      let D = [0];
      for (let G = 1; G < O.length; G++)
        D.push(
          D[G - 1] + Math.hypot(O[G][0] - O[G - 1][0], O[G][1] - O[G - 1][1]),
        );
      let U = D[D.length - 1];
      return O.map((G, W) => {
        let V = H ? U - D[W] : D[W];
        if (V > N + 40) return G;
        let $ = Math.max(0, Math.min(1, (V - N) / 40));
        return [G[0], G[1], B + (G[2] - B) * $ * $ * (3 - 2 * $)];
      });
    },
    R = rx(z, T, a, null);
  R = E(R, x, !0, S + 2);
  let P = rx(A, T, null, r);
  P = E(P, x, !1, S + 2);
  let C = i ? i.W[i.n - 1] : 7.2,
    I = {
      lanes: 3,
      laneW: (e.lw * 2) / 3,
      name: "Golden Gate Bridge",
      rank: i?.rank ?? 8,
      maxspeed: 45,
      dist: "presidio",
      custom: "gg",
      way: 595194543,
    },
    L = qu(o, {
      ...I,
      pts: R,
      w: (O, B) => {
        let H = O * 8;
        return H < 60 ? C + (e.lw - C) * Math.min(1, H / 60) : e.lw;
      },
      ja: s.id,
      jb: M.id,
      tb: S,
    }),
    F = qu(o, {
      ...I,
      pts: P,
      w: e.lw,
      ja: M.id,
      jb: n.id,
      ta: S,
      way: 537838948,
    });
  ((L.W[0] = C),
    s.type === "end" && (s.type = "j"),
    (t.gg = {
      axis: e,
      nb: L,
      sb: F,
      plaza: M,
      R: b,
      C: v,
      YP: x,
      median: c$(L, F),
    }),
    (lx.gg = t.gg));
}
var bC = [
  [-7686.1, -4084.2],
  [-7674.6, -4070.7],
  [-7668.5, -4063],
  [-7664.9, -4058.5],
];
function emt(
  o,
  t,
  {
    A: e,
    J0: s,
    JT: n,
    E0: i,
    y0: a,
    yT: r,
    JN: l,
    JS: c,
    straight: h,
    sOf: f,
  },
) {
  let u = o.edges.find((L) => L.ja === l.id),
    d = o.edges.find((L) => L.jb === c.id),
    p = u ? u.P[2] : l.y,
    m = d ? d.P[d.n * 3 - 1] : c.y,
    g = u ? u.W[0] : e.lw,
    b = d ? d.W[d.n - 1] : e.lw,
    v = ax([...ox, ...h(f(ox[ox.length - 1]) + 20, 1722, e.half), ...vf], 8),
    x = ax(
      [...bC, ...i$, ...h(f(Xk[0]) + 20, 1722, -e.half).reverse(), ...Xk],
      8,
    ),
    y = (L, F, O) => {
      let B = [0];
      for (let G = 1; G < L.length; G++)
        B.push(
          B[G - 1] + Math.hypot(L[G][0] - L[G - 1][0], L[G][1] - L[G - 1][1]),
        );
      let H = B[B.length - 1],
        N = O ? L[L.length - 1] : L[0],
        D = F.x - N[0],
        U = F.z - N[1];
      L.forEach((G, W) => {
        let V = O ? H - B[W] : B[W];
        if (V < 120) {
          let $ = 1 - V / 120,
            J = $ * $ * (3 - 2 * $);
          ((G[0] += D * J), (G[1] += U * J));
        }
      });
    };
  (l$(v, x, 2 * e.lw + e.median, [40, 0], [0, 40]), y(v, l, !0), y(x, c, !1));
  let M = (L) => e.deck(f(L)),
    S = rx(v, M, a, p, 150),
    w = rx(x, M, m, r, 150),
    _ = i ? i.W[i.n - 1] : 7.2,
    z = (L) => {
      let F = [0];
      for (let O = 1; O < L.length; O++)
        F.push(
          F[O - 1] + Math.hypot(L[O][0] - L[O - 1][0], L[O][1] - L[O - 1][1]),
        );
      return F;
    },
    A = z(S),
    T = z(w),
    E = A[A.length - 1],
    R = {
      lanes: 3,
      laneW: (e.lw * 2) / 3,
      name: "Golden Gate Bridge",
      rank: i?.rank ?? 8,
      maxspeed: 45,
      dist: "presidio",
      custom: "gg",
      way: 595194543,
    },
    P = (L, F, O) => F + (O - F) * Math.min(1, Math.max(0, L / 60)),
    C = qu(o, {
      ...R,
      pts: S,
      w: (L) => {
        let F = L * 8,
          O = E - A[L];
        return F < 60 ? P(F, _, e.lw) : O < 60 ? P(O, g, e.lw) : e.lw;
      },
      ja: s.id,
      jb: l.id,
    }),
    I = qu(o, {
      ...R,
      pts: w,
      w: (L) => {
        let F = T[L];
        return F < 60 ? P(F, b, e.lw) : e.lw;
      },
      ja: c.id,
      jb: n.id,
      way: 537838948,
    });
  ((C.W[0] = _),
    (C.W[C.n - 1] = g),
    (I.W[0] = b),
    s.type === "end" && (s.type = "j"),
    l.type === "end" && (l.type = "j"),
    c.type === "end" && (c.type = "j"),
    (t.gg = {
      axis: e,
      nb: C,
      sb: I,
      plaza: null,
      R: 0,
      C: null,
      YP: null,
      marin: !0,
      median: c$(C, I),
    }),
    (lx.gg = t.gg));
}
