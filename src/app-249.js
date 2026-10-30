// app 249 — math
// Lines 126576-127014 of readable/app.pretty.js (statement-aligned).
function UJ({ mats: o, props: t, tex: e = null, osm: s = null }) {
  let n = s && o.office ? PJ(s, cI) : null;
  i2 = e;
  let i = new Map(),
    a = (E, R) => {
      let P = Ivt(E, R),
        C = i.get(P);
      return (
        C ||
          i.set(
            P,
            (C = {
              road: new Be(),
              walk: new Be(),
              facade: new Be(),
              roof: new Be(),
            }),
          ),
        C
      );
    },
    r = [],
    l = [],
    c = new Set(["6,15", "8,6", "11,5"]),
    h = (E, R, P, C) => [E / 32, Math.min(R, 255) / 256, P, C / 4];
  for (let E = 0; E < xn; E++)
    for (let R = 0; R < ks; R++) {
      let P = ps[E],
        C = ns[R],
        I = Yl[E][R],
        L = he[E] - P.hw,
        F = he[E] + P.hw,
        O = pe[R] - C.hw,
        B = pe[R] + C.hw;
      a(he[E], pe[R]).road.quad(
        [L, I, B],
        [F, I, B],
        [F, I, O],
        [L, I, O],
        [0, 2 * C.hw],
        [2 * P.hw, 2 * C.hw],
        [2 * P.hw, 0],
        [0, 0],
        h(P.hw, 0, 0.65, 1),
        [0, 1, 0],
      );
    }
  let f = (E, R, P) => {
      for (let C = 0; C + 1 < R.length; C++) {
        let [I, L] = R[C],
          [F, O] = R[C + 1],
          B = $t(I[0], I[1]),
          H = $t(L[0], L[1]),
          N = $t(F[0], F[1]),
          D = $t(O[0], O[1]),
          U = [
            [I[0], B, I[1]],
            [L[0], H, L[1]],
            [O[0], D, O[1]],
            [F[0], N, F[1]],
          ],
          G = [
            [I[2], I[3]],
            [L[2], L[3]],
            [O[2], O[3]],
            [F[2], F[3]],
          ],
          W = U[1][0] - U[0][0],
          V = U[1][2] - U[0][2],
          $ = U[3][0] - U[0][0],
          J = U[3][2] - U[0][2];
        V * $ - W * J > 0
          ? E.quad(U[0], U[1], U[2], U[3], G[0], G[1], G[2], G[3], P)
          : E.quad(U[0], U[3], U[2], U[1], G[0], G[3], G[2], G[1], P);
      }
    },
    u = [];
  for (let E = 0; E < ks; E++)
    for (let R = 0; R + 1 < xn; R++) {
      let P = ns[E],
        C = he[R] + ps[R].hw,
        I = he[R + 1] - ps[R + 1].hw,
        L = I - C,
        F = E === 4 && R === 3 ? 0.85 : P.median ? 0.3 : P.cable ? 0.45 : 0.1,
        O = Math.max(2, Math.ceil(L / 2.5)),
        B = [];
      for (let N = 0; N <= O; N++) {
        let D = C + (L * N) / O,
          U = D - C;
        B.push([
          [D, pe[E] + P.hw, U, P.hw],
          [D, pe[E] - P.hw, U, -P.hw],
        ]);
      }
      let H = a((C + I) / 2, pe[E]).road;
      (f(H, B, h(P.hw, L, F, P.lanes)),
        P.median &&
          FJ(
            a((C + I) / 2, pe[E]).walk,
            B.map((N) => [N[0][0], pe[E]]),
            P.median,
            "x",
            E === 0 ? "palm" : "grass",
            l,
            r,
          ));
    }
  for (let E = 0; E < xn; E++)
    for (let R = 0; R + 1 < ks; R++) {
      let P = ps[E],
        C = pe[R] + ns[R].hw,
        I = pe[R + 1] - ns[R + 1].hw,
        L = I - C,
        F = P.median ? 0.3 : P.cable ? 0.45 : 0.1,
        O = Math.max(2, Math.ceil(L / 2.5)),
        B = [];
      for (let N = 0; N <= O; N++) {
        let D = C + (L * N) / O,
          U = D - C;
        B.push([
          [he[E] - P.hw, D, U, P.hw],
          [he[E] + P.hw, D, U, -P.hw],
        ]);
      }
      let H = a(he[E], (C + I) / 2).road;
      (f(H, B, h(P.hw, L, F, P.lanes)),
        P.median &&
          FJ(
            a(he[E], (C + I) / 2).walk,
            B.map((N) => [he[E], N[0][1]]),
            P.median,
            "z",
            E === xn - 1 ? "palm" : "grass",
            l,
            r,
          ));
    }
  let d = [0.42, 0.41, 0.39, 0],
    p = [0.48, 0.47, 0.45, 0.5],
    m = [0.1, 0.18, 0.05, 1],
    g = (E, R, P, C, I, L, F = 3) => {
      let O = Math.max(1, Math.ceil((C - R) / F)),
        B = Math.max(1, Math.ceil((I - P) / F)),
        H = E.v;
      for (let N = 0; N <= B; N++)
        for (let D = 0; D <= O; D++) {
          let U = R + ((C - R) * D) / O,
            G = P + ((I - P) * N) / B,
            W = 0.4,
            V = $t(U, G),
            $ = $t(U + W, G) - $t(U - W, G),
            J = $t(U, G + W) - $t(U, G - W),
            X = new dt(-$ / (2 * W), 1, -J / (2 * W)).normalize();
          E.vert(U, V + Ze, G, X.x, X.y, X.z, U, G, L);
        }
      for (let N = 0; N < B; N++)
        for (let D = 0; D < O; D++) {
          let U = H + N * (O + 1) + D,
            G = U + 1,
            W = U + O + 1,
            V = W + 1;
          (E.tri(U, W, G), E.tri(G, W, V));
        }
    },
    b = (E, R, P, C, I) => {
      let L = Math.hypot(C - R, I - P),
        F = Math.max(1, Math.ceil(L / 3));
      for (let O = 0; O < F; O++) {
        let B = R + ((C - R) * O) / F,
          H = P + ((I - P) * O) / F,
          N = R + ((C - R) * (O + 1)) / F,
          D = P + ((I - P) * (O + 1)) / F,
          U = $t(B, H),
          G = $t(N, D);
        E.wall(
          B,
          H,
          N,
          D,
          U - 0.02,
          G - 0.02,
          U + Ze,
          G + Ze,
          p,
          (L * O) / F,
          0,
        );
      }
    },
    v = [];
  for (let E = -1; E < xn; E++)
    for (let R = 0; R < ks; R++) {
      let P = E === -1,
        C = R === ks - 1;
      if ((P && C) || (!P && E === xn - 1)) continue;
      let I, L;
      if (P && !C) {
        if (R === 0) continue;
        ((I = {
          x0: he[0] - 130,
          x1: he[0] - ps[0].hw,
          z0: pe[R] + ns[R].hw,
          z1: R + 1 < ks ? pe[R + 1] - ns[R + 1].hw : pe[R] + 84,
        }),
          (L = {
            ...I,
            x1: I.x1 - ps[0].sw,
            z0: I.z0 + ns[R].sw,
            z1: I.z1 - (R + 1 < ks ? ns[R + 1].sw : 0),
          }));
      } else if (C) {
        if (E === xn - 1) continue;
        ((I = {
          x0: he[E] + ps[E].hw,
          x1: he[E + 1] - ps[E + 1].hw,
          z0: pe[R] + ns[R].hw,
          z1: pe[R] + 120,
        }),
          (L = {
            ...I,
            z0: I.z0 + ns[R].sw,
            x0: I.x0 + ps[E].sw,
            x1: I.x1 - ps[E + 1].sw,
          }));
      } else {
        if (R === ks - 1) continue;
        ((I = Wa(E, R)), (L = Hi(E, R)));
      }
      let F = (I.x0 + I.x1) / 2,
        O = (I.z0 + I.z1) / 2,
        B = a(F, O),
        H = !P && !C && c.has(`${E},${R}`);
      if (
        (g(B.walk, I.x0, I.z0, I.x1, L.z0, d),
        g(B.walk, I.x0, L.z1, I.x1, I.z1, d),
        g(B.walk, I.x0, L.z0, L.x0, L.z1, d),
        g(B.walk, L.x1, L.z0, I.x1, L.z1, d),
        b(B.walk, I.x1, I.z0, I.x0, I.z0),
        b(B.walk, I.x0, I.z1, I.x1, I.z1),
        b(B.walk, I.x0, I.z0, I.x0, I.z1),
        b(B.walk, I.x1, I.z1, I.x1, I.z0),
        H)
      ) {
        (g(B.walk, L.x0, L.z0, L.x1, L.z1, m, 4), Vvt(E, R, L, l, r));
        continue;
      }
      if (!P && !C && cI.has(`${E},${R}`)) {
        r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 });
        continue;
      }
      if (!P && !C && n?.has(`${E},${R}`)) {
        (g(B.walk, L.x0, L.z0, L.x1, L.z1, [0.2, 0.21, 0.18, 0], 8),
          r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 }),
          HJ(I, L, S3(F, O), E, R, l, r));
        continue;
      }
      let N = P ? Bi.VICTORIAN : C ? Bi.DOWNTOWN : S3(F, O);
      g(B.walk, L.x0, L.z0, L.x1, L.z1, [0.2, 0.21, 0.18, 0], 8);
      let D = Bvt(L, N, js(E + 7, R + 3, 1), { west: P, south: C });
      for (let U of D)
        ((U.zone = N),
          v.push(U),
          (i2 ? Uvt : Nvt)(a((U.x0 + U.x1) / 2, (U.z0 + U.z1) / 2), U, r));
      (r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 }),
        HJ(I, L, N, E, R, l, r));
    }
  let x = ps[xn - 1],
    y = ns[0];
  {
    let E = he[xn - 1] + x.hw,
      R = Ye.x,
      P = pe[0] - y.hw - y.sw,
      C = pe[ks - 1] + 60;
    for (let F = P; F < C; F += 84) {
      let O = a(E + 5, F + 40);
      (g(O.walk, E, F, R, Math.min(F + 84, C), d, 4),
        b(O.walk, E, Math.min(F + 84, C), E, F));
    }
    let I = he[0] - 140,
      L = Ye.x;
    for (let F = I; F < L; F += 105) {
      let O = a(F + 50, pe[0] - 20);
      (g(O.walk, F, Ye.z, Math.min(F + 105, L), pe[0] - y.hw, d, 4),
        b(O.walk, F, pe[0] - y.hw, Math.min(F + 105, L), pe[0] - y.hw));
    }
    (r.push(
      { t: "box", x0: Ye.x - 1.5, z0: -1e4, x1: 1e5, z1: 1e4, wall: !0 },
      { t: "box", x0: -1e4, z0: -1e5, x1: 1e5, z1: Ye.z + 1.5, wall: !0 },
    ),
      r.push(
        { t: "box", x0: -1e5, z0: -1e4, x1: he[0] - 130, z1: 1e4, wall: !0 },
        {
          t: "box",
          x0: -1e4,
          z0: pe[ks - 1] + 120,
          x1: 1e5,
          z1: 1e5,
          wall: !0,
        },
      ));
  }
  let M = ["VAN NESS AVE", "POLK ST", "STOCKTON ST", "KEARNY ST"],
    S = [
      "UNION ST",
      "JACKSON ST",
      "WASHINGTON ST",
      "CLAY ST",
      "SACRAMENTO ST",
      "MARKET ST",
      "BUSH ST",
    ],
    w = (E, R, P, C, I, L, F, O = 0.018) => {
      let B = I - R,
        H = L - P,
        N = F - C,
        D = Math.hypot(B, H, N);
      if (D < 0.01) return;
      let U = [B / D, H / D, N / D],
        G = Math.abs(U[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0],
        W = [
          U[1] * G[2] - U[2] * G[1],
          U[2] * G[0] - U[0] * G[2],
          U[0] * G[1] - U[1] * G[0],
        ],
        V = Math.hypot(...W);
      W.forEach((X, tt) => (W[tt] /= V));
      let $ = [
          U[1] * W[2] - U[2] * W[1],
          U[2] * W[0] - U[0] * W[2],
          U[0] * W[1] - U[1] * W[0],
        ],
        J = [0.05, 0.05, 0.05, 0];
      for (let [X, tt] of [
        [W, $],
        [$, W.map((Z) => -Z)],
        [W.map((Z) => -Z), $.map((Z) => -Z)],
        [$.map((Z) => -Z), W],
      ]) {
        let Z = (K, nt) => [
            K[0] + (X[0] + tt[0]) * O * nt,
            K[1] + (X[1] + tt[1]) * O * nt,
            K[2] + (X[2] + tt[2]) * O * nt,
          ],
          q = [R, P, C],
          j = [I, L, F];
        E.quad(
          [q[0] + X[0] * O, q[1] + X[1] * O, q[2] + X[2] * O],
          [j[0] + X[0] * O, j[1] + X[1] * O, j[2] + X[2] * O],
          [j[0] + tt[0] * O, j[1] + tt[1] * O, j[2] + tt[2] * O],
          [q[0] + tt[0] * O, q[1] + tt[1] * O, q[2] + tt[2] * O],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          J,
        );
      }
    },
    _ = (E, R) => {
      let P = E === "c" ? ps[R] : ns[R],
        C = E === "c" ? he[R] : pe[R],
        I = E === "c" ? pe : he,
        L = 5.9,
        F = [-1, 1].map((O) => [
          C + O * (P.median ? 3.2 : 2.2) - 0.3,
          C + O * (P.median ? 3.2 : 2.2) + 0.3,
        ]);
      for (let O = 0; O + 1 < I.length; O++) {
        let B = E === "c" ? ns : ps,
          H = I[O] + B[O].hw + 1.2,
          N = I[O + 1] - B[O + 1].hw - 1.2,
          D = Math.max(1, Math.round((N - H) / 34));
        for (let G = 0; G <= D; G++) {
          let W = H + ((N - H) * G) / D,
            V = (q, j) => (E === "c" ? [q, j] : [j, q]),
            [$, J] = V(C - P.hw - 0.4, W),
            [X, tt] = V(C + P.hw + 0.4, W),
            Z = a($, J).walk;
          if (
            (l.push(
              { kind: "wpole", x: $, y: $t($, J) + Ze, z: J, rot: 0 },
              { kind: "wpole", x: X, y: $t(X, tt) + Ze, z: tt, rot: 0 },
            ),
            r.push(
              { t: "circ", x: $, z: J, r: 0.14 },
              { t: "circ", x: X, z: tt, r: 0.14 },
            ),
            w(Z, $, $t($, J) + L + 1.1, J, X, $t(X, tt) + L + 1.1, tt, 0.012),
            G < D)
          ) {
            let q = H + ((N - H) * (G + 1)) / D;
            for (let [j, K] of F)
              for (let nt of [j, K]) {
                let [Q, et] = V(nt, W),
                  [st, ot] = V(nt, q);
                w(Z, Q, $t(Q, et) + L, et, st, $t(st, ot) + L, ot, 0.016);
              }
          }
        }
        let U = O + 2 < I.length ? I[O + 1] + B[O + 1].hw + 1.2 : null;
        if (U != null && O + 2 < I.length)
          for (let [G, W] of F)
            for (let V of [G, W]) {
              let $ = (q, j) => (E === "c" ? [q, j] : [j, q]),
                [J, X] = $(V, N),
                [tt, Z] = $(V, U);
              w(a(J, X).walk, J, $t(J, X) + L, X, tt, $t(tt, Z) + L, Z, 0.016);
            }
      }
    };
  (ps.forEach((E, R) => {
    M.includes(E.name) && _("c", R);
  }),
    ns.forEach((E, R) => {
      S.includes(E.name) && _("r", R);
    }),
    n &&
      console.log(
        `osm: ${LJ({ data: s, blocks: n, C: a, G: o2 })} buildings in ${n.size} blocks + south of Market`,
      ));
  let z = new le();
  z.name = "Landmarks";
  let A = [];
  TJ({ C: a, group: z, colliders: r, inst: l, mats: o, night: A, TEX: i2 });
  let T = new le();
  ((T.name = "City"), T.add(z));
  for (let [E, R] of i)
    for (let [P, C] of Object.entries(R)) {
      if (C.empty || !o[P]) continue;
      let I = new ye(C.geometry(), o[P] || o.facade);
      ((I.name = `${P}_${E}`),
        (I.matrixAutoUpdate = !1),
        I.updateMatrix(),
        (I.castShadow = P !== "road" && P !== "walk"),
        (I.receiveShadow = !0),
        T.add(I));
    }
  return { group: T, colliders: r, inst: l, lots: v, night: A };
}
