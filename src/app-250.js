// app 250 — math
// Lines 126317-126755 of readable/app.pretty.js (statement-aligned).
function OK({ mats: i, props: t, tex: e = null, osm: s = null }) {
  let n = s && i.office ? TK(s, LC) : null;
  mm = e;
  let o = new Map(),
    a = (E, A) => {
      let C = hgt(E, A),
        P = o.get(C);
      return (
        P ||
          o.set(
            C,
            (P = {
              road: new Ce(),
              walk: new Ce(),
              facade: new Ce(),
              roof: new Ce(),
            }),
          ),
        P
      );
    },
    r = [],
    l = [],
    c = new Set(["6,15", "8,6", "11,5"]),
    h = (E, A, C, P) => [E / 32, Math.min(A, 255) / 256, C, P / 4];
  for (let E = 0; E < mn; E++)
    for (let A = 0; A < ws; A++) {
      let C = ls[E],
        P = Qe[A],
        I = Rl[E][A],
        L = ae[E] - C.hw,
        F = ae[E] + C.hw,
        N = fe[A] - P.hw,
        B = fe[A] + P.hw;
      a(ae[E], fe[A]).road.quad(
        [L, I, B],
        [F, I, B],
        [F, I, N],
        [L, I, N],
        [0, 2 * P.hw],
        [2 * C.hw, 2 * P.hw],
        [2 * C.hw, 0],
        [0, 0],
        h(C.hw, 0, 0.65, 1),
        [0, 1, 0],
      );
    }
  let f = (E, A, C) => {
      for (let P = 0; P + 1 < A.length; P++) {
        let [I, L] = A[P],
          [F, N] = A[P + 1],
          B = Yt(I[0], I[1]),
          H = Yt(L[0], L[1]),
          O = Yt(F[0], F[1]),
          D = Yt(N[0], N[1]),
          U = [
            [I[0], B, I[1]],
            [L[0], H, L[1]],
            [N[0], D, N[1]],
            [F[0], O, F[1]],
          ],
          G = [
            [I[2], I[3]],
            [L[2], L[3]],
            [N[2], N[3]],
            [F[2], F[3]],
          ],
          q = U[1][0] - U[0][0],
          W = U[1][2] - U[0][2],
          V = U[3][0] - U[0][0],
          Y = U[3][2] - U[0][2];
        W * V - q * Y > 0
          ? E.quad(U[0], U[1], U[2], U[3], G[0], G[1], G[2], G[3], C)
          : E.quad(U[0], U[3], U[2], U[1], G[0], G[3], G[2], G[1], C);
      }
    },
    u = [];
  for (let E = 0; E < ws; E++)
    for (let A = 0; A + 1 < mn; A++) {
      let C = Qe[E],
        P = ae[A] + ls[A].hw,
        I = ae[A + 1] - ls[A + 1].hw,
        L = I - P,
        F = E === 4 && A === 3 ? 0.85 : C.median ? 0.3 : C.cable ? 0.45 : 0.1,
        N = Math.max(2, Math.ceil(L / 2.5)),
        B = [];
      for (let O = 0; O <= N; O++) {
        let D = P + (L * O) / N,
          U = D - P;
        B.push([
          [D, fe[E] + C.hw, U, C.hw],
          [D, fe[E] - C.hw, U, -C.hw],
        ]);
      }
      let H = a((P + I) / 2, fe[E]).road;
      (f(H, B, h(C.hw, L, F, C.lanes)),
        C.median &&
          CK(
            a((P + I) / 2, fe[E]).walk,
            B.map((O) => [O[0][0], fe[E]]),
            C.median,
            "x",
            E === 0 ? "palm" : "grass",
            l,
            r,
          ));
    }
  for (let E = 0; E < mn; E++)
    for (let A = 0; A + 1 < ws; A++) {
      let C = ls[E],
        P = fe[A] + Qe[A].hw,
        I = fe[A + 1] - Qe[A + 1].hw,
        L = I - P,
        F = C.median ? 0.3 : C.cable ? 0.45 : 0.1,
        N = Math.max(2, Math.ceil(L / 2.5)),
        B = [];
      for (let O = 0; O <= N; O++) {
        let D = P + (L * O) / N,
          U = D - P;
        B.push([
          [ae[E] - C.hw, D, U, C.hw],
          [ae[E] + C.hw, D, U, -C.hw],
        ]);
      }
      let H = a(ae[E], (P + I) / 2).road;
      (f(H, B, h(C.hw, L, F, C.lanes)),
        C.median &&
          CK(
            a(ae[E], (P + I) / 2).walk,
            B.map((O) => [ae[E], O[0][1]]),
            C.median,
            "z",
            E === mn - 1 ? "palm" : "grass",
            l,
            r,
          ));
    }
  let d = [0.42, 0.41, 0.39, 0],
    p = [0.48, 0.47, 0.45, 0.5],
    m = [0.1, 0.18, 0.05, 1],
    g = (E, A, C, P, I, L, F = 3) => {
      let N = Math.max(1, Math.ceil((P - A) / F)),
        B = Math.max(1, Math.ceil((I - C) / F)),
        H = E.v;
      for (let O = 0; O <= B; O++)
        for (let D = 0; D <= N; D++) {
          let U = A + ((P - A) * D) / N,
            G = C + ((I - C) * O) / B,
            q = 0.4,
            W = Yt(U, G),
            V = Yt(U + q, G) - Yt(U - q, G),
            Y = Yt(U, G + q) - Yt(U, G - q),
            $ = new xt(-V / (2 * q), 1, -Y / (2 * q)).normalize();
          E.vert(U, W + Ke, G, $.x, $.y, $.z, U, G, L);
        }
      for (let O = 0; O < B; O++)
        for (let D = 0; D < N; D++) {
          let U = H + O * (N + 1) + D,
            G = U + 1,
            q = U + N + 1,
            W = q + 1;
          (E.tri(U, q, G), E.tri(G, q, W));
        }
    },
    b = (E, A, C, P, I) => {
      let L = Math.hypot(P - A, I - C),
        F = Math.max(1, Math.ceil(L / 3));
      for (let N = 0; N < F; N++) {
        let B = A + ((P - A) * N) / F,
          H = C + ((I - C) * N) / F,
          O = A + ((P - A) * (N + 1)) / F,
          D = C + ((I - C) * (N + 1)) / F,
          U = Yt(B, H),
          G = Yt(O, D);
        E.wall(
          B,
          H,
          O,
          D,
          U - 0.02,
          G - 0.02,
          U + Ke,
          G + Ke,
          p,
          (L * N) / F,
          0,
        );
      }
    },
    x = [];
  for (let E = -1; E < mn; E++)
    for (let A = 0; A < ws; A++) {
      let C = E === -1,
        P = A === ws - 1;
      if ((C && P) || (!C && E === mn - 1)) continue;
      let I, L;
      if (C && !P) {
        if (A === 0) continue;
        ((I = {
          x0: ae[0] - 130,
          x1: ae[0] - ls[0].hw,
          z0: fe[A] + Qe[A].hw,
          z1: A + 1 < ws ? fe[A + 1] - Qe[A + 1].hw : fe[A] + 84,
        }),
          (L = {
            ...I,
            x1: I.x1 - ls[0].sw,
            z0: I.z0 + Qe[A].sw,
            z1: I.z1 - (A + 1 < ws ? Qe[A + 1].sw : 0),
          }));
      } else if (P) {
        if (E === mn - 1) continue;
        ((I = {
          x0: ae[E] + ls[E].hw,
          x1: ae[E + 1] - ls[E + 1].hw,
          z0: fe[A] + Qe[A].hw,
          z1: fe[A] + 120,
        }),
          (L = {
            ...I,
            z0: I.z0 + Qe[A].sw,
            x0: I.x0 + ls[E].sw,
            x1: I.x1 - ls[E + 1].sw,
          }));
      } else {
        if (A === ws - 1) continue;
        ((I = Ca(E, A)), (L = Ei(E, A)));
      }
      let F = (I.x0 + I.x1) / 2,
        N = (I.z0 + I.z1) / 2,
        B = a(F, N),
        H = !C && !P && c.has(`${E},${A}`);
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
        (g(B.walk, L.x0, L.z0, L.x1, L.z1, m, 4), vgt(E, A, L, l, r));
        continue;
      }
      if (!C && !P && LC.has(`${E},${A}`)) {
        r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 });
        continue;
      }
      if (!C && !P && n?.has(`${E},${A}`)) {
        (g(B.walk, L.x0, L.z0, L.x1, L.z1, [0.2, 0.21, 0.18, 0], 8),
          r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 }),
          NK(I, L, Ev(F, N), E, A, l, r));
        continue;
      }
      let O = C ? zi.VICTORIAN : P ? zi.DOWNTOWN : Ev(F, N);
      g(B.walk, L.x0, L.z0, L.x1, L.z1, [0.2, 0.21, 0.18, 0], 8);
      let D = dgt(L, O, Ws(E + 7, A + 3, 1), { west: C, south: P });
      for (let U of D)
        ((U.zone = O),
          x.push(U),
          (mm ? bgt : pgt)(a((U.x0 + U.x1) / 2, (U.z0 + U.z1) / 2), U, r));
      (r.push({ t: "box", x0: L.x0, z0: L.z0, x1: L.x1, z1: L.z1 }),
        NK(I, L, O, E, A, l, r));
    }
  let v = ls[mn - 1],
    y = Qe[0];
  {
    let E = ae[mn - 1] + v.hw,
      A = Ve.x,
      C = fe[0] - y.hw - y.sw,
      P = fe[ws - 1] + 60;
    for (let F = C; F < P; F += 84) {
      let N = a(E + 5, F + 40);
      (g(N.walk, E, F, A, Math.min(F + 84, P), d, 4),
        b(N.walk, E, Math.min(F + 84, P), E, F));
    }
    let I = ae[0] - 140,
      L = Ve.x;
    for (let F = I; F < L; F += 105) {
      let N = a(F + 50, fe[0] - 20);
      (g(N.walk, F, Ve.z, Math.min(F + 105, L), fe[0] - y.hw, d, 4),
        b(N.walk, F, fe[0] - y.hw, Math.min(F + 105, L), fe[0] - y.hw));
    }
    (r.push(
      { t: "box", x0: Ve.x - 1.5, z0: -1e4, x1: 1e5, z1: 1e4, wall: !0 },
      { t: "box", x0: -1e4, z0: -1e5, x1: 1e5, z1: Ve.z + 1.5, wall: !0 },
    ),
      r.push(
        { t: "box", x0: -1e5, z0: -1e4, x1: ae[0] - 130, z1: 1e4, wall: !0 },
        {
          t: "box",
          x0: -1e4,
          z0: fe[ws - 1] + 120,
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
    w = (E, A, C, P, I, L, F, N = 0.018) => {
      let B = I - A,
        H = L - C,
        O = F - P,
        D = Math.hypot(B, H, O);
      if (D < 0.01) return;
      let U = [B / D, H / D, O / D],
        G = Math.abs(U[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0],
        q = [
          U[1] * G[2] - U[2] * G[1],
          U[2] * G[0] - U[0] * G[2],
          U[0] * G[1] - U[1] * G[0],
        ],
        W = Math.hypot(...q);
      q.forEach(($, st) => (q[st] /= W));
      let V = [
          U[1] * q[2] - U[2] * q[1],
          U[2] * q[0] - U[0] * q[2],
          U[0] * q[1] - U[1] * q[0],
        ],
        Y = [0.05, 0.05, 0.05, 0];
      for (let [$, st] of [
        [q, V],
        [V, q.map((Q) => -Q)],
        [q.map((Q) => -Q), V.map((Q) => -Q)],
        [V.map((Q) => -Q), q],
      ]) {
        let Q = (K, nt) => [
            K[0] + ($[0] + st[0]) * N * nt,
            K[1] + ($[1] + st[1]) * N * nt,
            K[2] + ($[2] + st[2]) * N * nt,
          ],
          j = [A, C, P],
          X = [I, L, F];
        E.quad(
          [j[0] + $[0] * N, j[1] + $[1] * N, j[2] + $[2] * N],
          [X[0] + $[0] * N, X[1] + $[1] * N, X[2] + $[2] * N],
          [X[0] + st[0] * N, X[1] + st[1] * N, X[2] + st[2] * N],
          [j[0] + st[0] * N, j[1] + st[1] * N, j[2] + st[2] * N],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          Y,
        );
      }
    },
    z = (E, A) => {
      let C = E === "c" ? ls[A] : Qe[A],
        P = E === "c" ? ae[A] : fe[A],
        I = E === "c" ? fe : ae,
        L = 5.9,
        F = [-1, 1].map((N) => [
          P + N * (C.median ? 3.2 : 2.2) - 0.3,
          P + N * (C.median ? 3.2 : 2.2) + 0.3,
        ]);
      for (let N = 0; N + 1 < I.length; N++) {
        let B = E === "c" ? Qe : ls,
          H = I[N] + B[N].hw + 1.2,
          O = I[N + 1] - B[N + 1].hw - 1.2,
          D = Math.max(1, Math.round((O - H) / 34));
        for (let G = 0; G <= D; G++) {
          let q = H + ((O - H) * G) / D,
            W = (j, X) => (E === "c" ? [j, X] : [X, j]),
            [V, Y] = W(P - C.hw - 0.4, q),
            [$, st] = W(P + C.hw + 0.4, q),
            Q = a(V, Y).walk;
          if (
            (l.push(
              { kind: "wpole", x: V, y: Yt(V, Y) + Ke, z: Y, rot: 0 },
              { kind: "wpole", x: $, y: Yt($, st) + Ke, z: st, rot: 0 },
            ),
            r.push(
              { t: "circ", x: V, z: Y, r: 0.14 },
              { t: "circ", x: $, z: st, r: 0.14 },
            ),
            w(Q, V, Yt(V, Y) + L + 1.1, Y, $, Yt($, st) + L + 1.1, st, 0.012),
            G < D)
          ) {
            let j = H + ((O - H) * (G + 1)) / D;
            for (let [X, K] of F)
              for (let nt of [X, K]) {
                let [Z, et] = W(nt, q),
                  [tt, it] = W(nt, j);
                w(Q, Z, Yt(Z, et) + L, et, tt, Yt(tt, it) + L, it, 0.016);
              }
          }
        }
        let U = N + 2 < I.length ? I[N + 1] + B[N + 1].hw + 1.2 : null;
        if (U != null && N + 2 < I.length)
          for (let [G, q] of F)
            for (let W of [G, q]) {
              let V = (j, X) => (E === "c" ? [j, X] : [X, j]),
                [Y, $] = V(W, O),
                [st, Q] = V(W, U);
              w(a(Y, $).walk, Y, Yt(Y, $) + L, $, st, Yt(st, Q) + L, Q, 0.016);
            }
      }
    };
  (ls.forEach((E, A) => {
    M.includes(E.name) && z("c", A);
  }),
    Qe.forEach((E, A) => {
      S.includes(E.name) && z("r", A);
    }),
    n &&
      console.log(
        `osm: ${RK({ data: s, blocks: n, C: a, G: gm })} buildings in ${n.size} blocks + south of Market`,
      ));
  let _ = new ke();
  _.name = "Landmarks";
  let R = [];
  _K({ C: a, group: _, colliders: r, inst: l, mats: i, night: R, TEX: mm });
  let T = new ke();
  ((T.name = "City"), T.add(_));
  for (let [E, A] of o)
    for (let [C, P] of Object.entries(A)) {
      if (P.empty || !i[C]) continue;
      let I = new _e(P.geometry(), i[C] || i.facade);
      ((I.name = `${C}_${E}`),
        (I.matrixAutoUpdate = !1),
        I.updateMatrix(),
        (I.castShadow = C !== "road" && C !== "walk"),
        (I.receiveShadow = !0),
        T.add(I));
    }
  return { group: T, colliders: r, inst: l, lots: x, night: R };
}
