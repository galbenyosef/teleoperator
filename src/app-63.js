// app 63 — math
// Lines 65120-66370 of readable/app.pretty.js (statement-aligned).
function PG(i, { mobile: t = !1 } = {}) {
  let e = new Tc(),
    s = new Tc(),
    n = new su(2048, 1024),
    o = e.R("p39n"),
    a = s.R("p39f"),
    r = e.R("p39rot"),
    l = i.Yd,
    c = CR(39),
    h = Z5(i),
    f = n.add("p39sign", 768, 180, dht),
    u = n.add("p39old", 768, 180, pht),
    d = n.add("flag", 285, 150, bht),
    p = n.word("AQUARIUM OF THE BAY", {
      font: "bold 120px Georgia, serif",
      h: 140,
      color: "#fff",
    }),
    m = Xg(i.flat),
    g = i.axis.u,
    b = i.axis.w;
  for (let [w, z] of [
    [o, 0],
    [a, 1],
  ]) {
    let _ = m.map((C) => new Re(C[0], C[1])),
      R = mo.triangulateShape(_, []),
      T = w.solid,
      E = T.v;
    for (let C of m)
      T.vert(
        C[0],
        l,
        C[1],
        0,
        1,
        0,
        C[0] * b[0] + C[1] * b[1],
        C[0] * g[0] + C[1] * g[1],
        ue.plank,
      );
    for (let [C, P, I] of R) {
      let L = T.p.a,
        F = E + C,
        N = E + P,
        B = E + I,
        H = L[F * 3],
        O = L[F * 3 + 2],
        D = L[N * 3],
        U = L[N * 3 + 2],
        G = L[B * 3],
        q = L[B * 3 + 2];
      (U - O) * (G - H) - (D - H) * (q - O) >= 0
        ? T.tri(F, N, B)
        : T.tri(F, B, N);
    }
    let A = i.ring;
    for (let C = 0; C + 1 < A.length; C++) {
      let P = A[C],
        I = A[C + 1];
      if (Math.hypot(I[0] - P[0], I[1] - P[1]) < 0.05) continue;
      let L = Hl(i.flat, P, I);
      ty(T, P, I, L, 0.4, l + 0.05, ue.fascia);
    }
    if (z === 0) {
      let C = 0;
      for (let P = 0; P + 1 < A.length; P++) {
        let I = A[P],
          L = A[P + 1],
          F = Math.hypot(L[0] - I[0], L[1] - I[1]);
        if (F < 0.05) continue;
        let N = Hl(i.flat, I, L);
        for (let B = (3.5 - C) % 3.5; B < F; B += 3.5) {
          let H = B / F,
            O = I[0] + (L[0] - I[0]) * H + N[0] * 0.55,
            D = I[1] + (L[1] - I[1]) * H + N[1] * 0.55;
          (es(T, O, D, 0.24, -4, l - 0.2, 6, ue.pile), eu(O, D, 0.3));
        }
        C = (C + F) % 3.5;
      }
    }
  }
  let x = [i.lions[0], 0.6, i.lions[1]];
  {
    let w = i.ring,
      z = o.solid,
      _ = 0.28;
    for (let R = 0; R + 1 < w.length; R++) {
      let T = w[R],
        E = w[R + 1],
        A = Math.hypot(E[0] - T[0], E[1] - T[1]);
      if (A < 0.3) continue;
      let C = Hl(i.flat, T, E),
        P = [T[0] - C[0] * _, T[1] - C[1] * _],
        I = [E[0] - C[0] * _, E[1] - C[1] * _];
      ss(z, [P[0], l + 1.07, P[1]], [I[0], l + 1.07, I[1]], 0.16, 0.07, ue.cap);
      for (let L of [0.72, 0.38])
        ss(z, [P[0], l + L, P[1]], [I[0], l + L, I[1]], 0.05, 0.05, ue.pipe);
      for (let L = 0; L < A; L += 2.4) {
        let F = L / A,
          N = P[0] + (I[0] - P[0]) * F,
          B = P[1] + (I[1] - P[1]) * F;
        Ms(
          z,
          N - 0.06,
          l,
          B - 0.06,
          N + 0.06,
          l + 1.04,
          B + 0.06,
          ue.railPost,
          { top: !1 },
        );
      }
    }
  }
  let v = (w) =>
      w.id === 288396169
        ? "grey"
        : w.id === 128240149 || w.id === 128240119 || w.id === 128240134
          ? "tan"
          : ["wood", "wood", "grey", "cream", "wood", "grey", "wood", "cream"][
              w.id % 8
            ],
    y = 0;
  for (let w of i.houses) {
    let z = Xg(w.ring),
      _ = v(w),
      R = Math.min(4.2, Math.max(2.2, w.h - Q5)),
      T = l + Q5,
      E = [0.96 + c() * 0.08, 0.96 + c() * 0.06, 0.96 + c() * 0.06],
      A = -1;
    if (w.id === 288396169) {
      let C = 0;
      for (let P = 0; P < z.length; P++) {
        let I = z[P],
          L = z[(P + 1) % z.length],
          F = Hl(w.ring, I, L),
          N = Math.hypot(L[0] - I[0], L[1] - I[1]);
        F[0] < -0.5 && N > C && ((C = N), (A = P));
      }
    }
    for (let [C, P] of [
      [o, 0],
      [a, 1],
    ]) {
      let I = (w.id % 7) * 3.1;
      for (let L = 0; L < z.length; L++) {
        let F = z[L],
          N = z[(L + 1) % z.length],
          B = Math.hypot(N[0] - F[0], N[1] - F[1]);
        if (B < 0.05) continue;
        let H = Hl(w.ring, F, N);
        (ty(
          C.atlas,
          F,
          N,
          H,
          l,
          T,
          LR(L === A ? "mural" : _, E),
          L === A ? 0 : I,
          l,
        ),
          (I += B));
      }
      if (
        (rht(
          C.solid,
          z,
          w.ring,
          T,
          R,
          P === 0,
          w.id === 288396169 ? ue.aquaRoof : ue.shingle,
        ),
        P === 0)
      )
        for (let L = 0; L < z.length; L++) {
          let F = z[L],
            N = z[(L + 1) % z.length];
          if (Math.hypot(N[0] - F[0], N[1] - F[1]) < 0.3) continue;
          let H = Hl(w.ring, F, N);
          ty(
            C.solid,
            [F[0] + H[0] * 0.06, F[1] + H[1] * 0.06],
            [N[0] + H[0] * 0.06, N[1] + H[1] * 0.06],
            H,
            T - 0.35,
            T,
            _ === "wood" || _ === "tan" ? ue.fascia : ue.trim,
          );
        }
    }
  }
  for (let w of i.f.fronts) {
    if (w.arcade) continue;
    let { a: z, n: _, L: R, ux: T, uz: E, wide: A } = w,
      C = (z[0] + w.b[0]) / 2,
      P = (z[1] + w.b[1]) / 2;
    for (let I = 3.5; I < R - 2.5; I += 8) {
      let L = zG[y++ % zG.length],
        F = n.word(L, {
          font: "bold 54px Georgia, serif",
          h: 64,
          color: "#fff",
        }),
        N = A ? 2.32 : 0.12,
        B = A ? l + 3.45 : l + 3.25,
        H = z[0] + T * I + _[0] * N,
        O = z[1] + E * I + _[1] * N,
        D = [
          [0.95, 0.85, 0.55],
          [1, 1, 1],
          [0.95, 0.9, 0.8],
        ][y % 3];
      if (
        (si(
          o.text,
          n,
          F,
          H,
          B,
          O,
          _[0],
          _[1],
          Math.min(4.2, 0.42 * F.aspect),
          0.42,
          oo(D, !0),
        ),
        !A)
      ) {
        let U = _G[y % _G.length],
          G = (V) => [z[0] + T * V, z[1] + E * V],
          q = G(Math.max(0.3, I - 3.2)),
          W = G(Math.min(R - 0.3, I + 3.2));
        xs(
          o.solid,
          [q[0] + _[0] * 0.05, l + 3.05, q[1] + _[1] * 0.05],
          [W[0] + _[0] * 0.05, l + 3.05, W[1] + _[1] * 0.05],
          [W[0] + _[0] * 1.3, l + 2.55, W[1] + _[1] * 1.3],
          [q[0] + _[0] * 1.3, l + 2.55, q[1] + _[1] * 1.3],
          At(U, Tt.paint),
          [C + _[0] * 20, l + 30, P + _[1] * 20],
        );
      }
    }
  }
  for (let w of i.f.balconies) {
    let { a: z, b: _, n: R, L: T, ux: E, uz: A } = w,
      C = o.solid,
      P = l + 3.6,
      I = 2.3,
      L = (O, D) => [z[0] + E * O + R[0] * D, z[1] + A * O + R[1] * D],
      F = L(0.2, 0),
      N = L(T - 0.2, 0),
      B = L(T - 0.2, I),
      H = L(0.2, I);
    (Fi(
      C,
      [
        [F[0], P, F[1]],
        [N[0], P, N[1]],
        [B[0], P, B[1]],
        [H[0], P, H[1]],
      ],
      ue.plankDk,
    ),
      Fi(
        C,
        [
          [F[0], P - 0.25, F[1]],
          [N[0], P - 0.25, N[1]],
          [B[0], P - 0.25, B[1]],
          [H[0], P - 0.25, H[1]],
        ],
        ue.fascia,
        !0,
      ),
      ty(C, H, B, R, P - 0.3, P + 0.02, ue.fascia),
      ss(C, [H[0], P + 1, H[1]], [B[0], P + 1, B[1]], 0.1, 0.07, ue.white),
      ss(
        C,
        [H[0], P + 0.5, H[1]],
        [B[0], P + 0.5, B[1]],
        0.04,
        0.04,
        ue.white,
      ));
    for (
      let O = 0.2;
      O <= T - 0.2 + 1e-6;
      O += Math.max(1.2, (T - 0.4) / Math.round((T - 0.4) / 1.25))
    ) {
      let D = L(O, I - 0.05);
      Ms(
        C,
        D[0] - 0.03,
        P,
        D[1] - 0.03,
        D[0] + 0.03,
        P + 1,
        D[1] + 0.03,
        ue.white,
        { top: !1 },
      );
    }
    for (let O of w.posts) es(C, O[0], O[1], 0.11, l, P - 0.25, 6, ue.post);
    if (w.stair) {
      for (let O = 0; O < 18; O++) {
        let D = T - 0.2 + O * 0.33,
          U = P - O * 0.2,
          G = L(D, 0.25),
          q = L(D, I - 0.25),
          W = L(D + 0.33, 0.25),
          V = L(D + 0.33, I - 0.25);
        (Fi(
          C,
          [
            [G[0], U, G[1]],
            [q[0], U, q[1]],
            [V[0], U, V[1]],
            [W[0], U, W[1]],
          ],
          ue.plankDk,
        ),
          ty(C, W, V, [E, A], U - 0.2, U, ue.fascia));
      }
      for (let O of [0.2, I - 0.2]) {
        let D = L(T - 0.2, O),
          U = L(T + 5.74, O);
        ss(C, [D[0], P + 1, D[1]], [U[0], l + 1, U[1]], 0.08, 0.06, ue.white);
      }
      for (let O of [0.18, I - 0.18]) {
        let D = L(T - 0.2, O),
          U = L(T + 5.74, O);
        ss(
          C,
          [D[0], P - 0.15, D[1]],
          [U[0], l + 0.05, U[1]],
          0.08,
          0.3,
          ue.post,
        );
      }
    }
  }
  for (let w of i.f.boards) {
    let z = w.q.id,
      _ = w.q,
      [R, T] = w.m,
      E = Math.min(w.L * 0.8, z === 466623895 ? 6 : 8.5);
    for (let A of [o, a])
      si(
        A.text,
        n,
        f,
        R + w.n[0] * 0.1,
        l + Q5 - 1.5,
        T + w.n[1] * 0.1,
        w.n[0],
        w.n[1],
        E,
        (E * 240) / 1024,
        Da(!0),
      );
    if (w.vault) {
      let { ux: A, uz: C } = w,
        P = w.vault,
        I = o.solid,
        L = 1.6,
        F = 3.4;
      for (let N = 0; N < 10; N++) {
        let B = (N / 10) * Math.PI,
          H = ((N + 1) / 10) * Math.PI,
          O = [Math.cos(B) * L, Math.sin(B) * L],
          D = [Math.cos(H) * L, Math.sin(H) * L],
          U = (G, q) => [
            P[0] + A * G[0] + w.n[0] * q,
            l + 2.6 + G[1],
            P[1] + C * G[0] + w.n[1] * q,
          ];
        xs(I, U(O, 0), U(D, 0), U(D, F), U(O, F), ue.blue, [
          P[0] + w.n[0] * F * 0.5,
          l + 30,
          P[1] + w.n[1] * F * 0.5,
        ]);
      }
      for (let N of [-1, 1])
        es(
          I,
          P[0] + A * N * L + w.n[0] * (F - 0.1),
          P[1] + C * N * L + w.n[1] * (F - 0.1),
          0.06,
          l,
          l + 2.6,
          6,
          ue.white,
        );
      si(
        o.text,
        n,
        p,
        P[0] + w.n[0] * (F + 0.02),
        l + 3.4,
        P[1] + w.n[1] * (F + 0.02),
        w.n[0],
        w.n[1],
        2.9,
        2.9 / p.aspect,
        oo([1, 1, 1], !0),
      );
    }
    if (z !== 466623895) {
      let A = Xg(_.ring),
        C = RG(A),
        [P, I] = C.c,
        L = Math.min(4.2, Math.max(2.2, _.h - Q5)),
        F = l + Q5 + Math.min(L, C.hw * 0.75),
        N = o.solid;
      Gs(
        N,
        P,
        I,
        [
          [1.7, F - 1.2],
          [1.7, F + 1.2],
          [1.9, F + 1.3],
          [1, F + 2.4],
          [0.1, F + 2.9],
        ],
        8,
        ue.white,
      );
      for (let B = 0; B < 8; B++) {
        let H = ((B + 0.5) / 8) * Math.PI * 2;
        Us(
          N,
          P + Math.cos(H) * 1.72,
          I + Math.sin(H) * 1.72,
          -Math.sin(H),
          Math.cos(H),
          0.35,
          0.03,
          F - 0.2,
          F + 0.9,
          At([0.05, 0.07, 0.1], Tt.glass),
        );
      }
      (es(N, P, I, 0.05, F + 2.8, F + 8.5, 5, ue.white),
        si(o.text, n, d, P + 0.9, F + 7.6, I, 0, 1, 1.8, 0.95, Da(!1)),
        si(o.text, n, d, P + 0.9, F + 7.6, I, 0, -1, 1.8, 0.95, Da(!1)));
    }
  }
  {
    let [w, z] = i.f.oldSign,
      _ = o.solid;
    for (let R of [-2.7, 2.7])
      Ms(
        _,
        w + R - 0.12,
        l,
        z - 0.12,
        w + R + 0.12,
        l + 3.4,
        z + 0.12,
        ue.post,
      );
    (Ms(_, w - 3, l + 2, z - 0.06, w + 3, l + 3.35, z + 0.06, ue.white),
      si(o.text, n, u, w, l + 2.68, z + 0.07, 0, 1, 5.8, 1.3, Da(!1)),
      si(o.text, n, u, w, l + 2.68, z - 0.07, 0, -1, 5.8, 1.3, Da(!1)));
  }
  let M = null;
  if (i.carousel) {
    let { x: w, z, r: _ } = i.carousel;
    ((M = { x: w, z, horses: [] }),
      EG(
        o.solid,
        o.atlas,
        r.solid,
        [e.R("p39hup").solid, e.R("p39hdn").solid],
        w,
        z,
        _,
        l,
        !0,
        M.horses,
      ),
      EG(a.solid, a.atlas, a.solid, null, w, z, _, l, !1));
    let { gate: R, booth: T, umbrella: E } = i.carousel,
      A = o.solid,
      C = _ + 1.1,
      P = 44;
    for (let I = 0; I < P; I++) {
      let L = (I / P) * Math.PI * 2,
        F = ((I + 1) / P) * Math.PI * 2;
      if (
        Math.abs(
          ((L + Math.PI / P - R + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
        ) >
        Math.PI - 0.32
      )
        continue;
      let N = [w + Math.cos(L) * C, z + Math.sin(L) * C],
        B = [w + Math.cos(F) * C, z + Math.sin(F) * C];
      for (let H of [0.95, 0.5])
        ss(
          A,
          [N[0], l + H, N[1]],
          [B[0], l + H, B[1]],
          0.07,
          H > 0.9 ? 0.07 : 0.04,
          ue.red,
        );
      (es(A, N[0], N[1], 0.035, l, l + 1, 6, ue.brass),
        Gs(
          A,
          N[0],
          N[1],
          [
            [0.035, l + 1],
            [0.06, l + 1.05],
            [0.01, l + 1.11],
          ],
          6,
          ue.gold,
        ));
    }
    (Us(A, T.x, T.z, T.ux, T.uz, 1.25, 0.6, l, l + 0.22, ue.red),
      Us(A, T.x, T.z, T.ux, T.uz, 1.2, 0.55, l + 0.22, l + 1.55, ue.cream),
      Us(A, T.x, T.z, T.ux, T.uz, 1.3, 0.65, l + 1.55, l + 1.85, ue.red),
      Us(A, T.x, T.z, T.ux, T.uz, 1.34, 0.69, l + 1.85, l + 1.92, ue.gold));
    for (let I = 0; I < 4; I++) {
      let L = (I - 1.5) * 0.58,
        F = T.x + T.ux * L + T.nx * 0.56,
        N = T.z + T.uz * L + T.nz * 0.56;
      (Us(A, F, N, T.ux, T.uz, 0.22, 0.02, l + 0.75, l + 1.4, ue.white),
        Us(
          A,
          F + T.nx * 0.02,
          N + T.nz * 0.02,
          T.ux,
          T.uz,
          0.12,
          0.02,
          l + 1.1,
          l + 1.32,
          At([0.12, 0.14, 0.18], Tt.glass),
        ));
    }
    (si(
      o.text,
      n,
      n.word("CAROUSEL TOKENS", {
        font: "bold 54px Georgia, serif",
        h: 64,
        color: "#fff",
      }),
      T.x + T.nx * 0.67,
      l + 1.7,
      T.z + T.nz * 0.67,
      T.nx,
      T.nz,
      2.2,
      null,
      oo([0.98, 0.95, 0.85], !0),
    ),
      es(A, E[0], E[1], 0.04, l, l + 2.55, 6, ue.white));
    for (let I = 0; I < 8; I++) {
      let L = (I / 8) * Math.PI * 2,
        F = ((I + 1) / 8) * Math.PI * 2,
        N = 1.1;
      (xs(
        A,
        [E[0] + Math.cos(L) * N, l + 2.15, E[1] + Math.sin(L) * N],
        [E[0] + Math.cos(F) * N, l + 2.15, E[1] + Math.sin(F) * N],
        [E[0], l + 2.6, E[1]],
        [E[0], l + 2.6, E[1]],
        ue.red,
        [
          E[0] + Math.cos((L + F) / 2) * 10,
          l + 12,
          E[1] + Math.sin((L + F) / 2) * 10,
        ],
      ),
        xs(
          A,
          [E[0] + Math.cos(L) * N, l + 2.14, E[1] + Math.sin(L) * N],
          [E[0] + Math.cos(F) * N, l + 2.14, E[1] + Math.sin(F) * N],
          [E[0], l + 2.59, E[1]],
          [E[0], l + 2.59, E[1]],
          ue.redDk,
          [E[0], l, E[1]],
        ));
    }
  }
  if (i.f.stage) {
    let w = i.f.stage,
      z = o.solid,
      _ = ue.syellow,
      R = l + w.h,
      T = (N, B, H = 0) => [
        w.x + w.ux * N + w.nx * B,
        H,
        w.z + w.uz * N + w.nz * B,
      ],
      E = (N, B) => {
        let H = T(N, B);
        return [H[0], H[2]];
      },
      A = (N, B, H, O, D, U, G, q = {}) => {
        let [W, V] = E(N, B);
        Us(z, W, V, w.ux, w.uz, H, O, D, U, G, q);
      },
      C = (N, B, H) => T(N, B, H);
    A(0, 0, w.w, w.d, l, R, _, { top: !1 });
    {
      let N = [
        T(-w.w, -w.d, R),
        T(w.w, -w.d, R),
        T(w.w, w.d, R),
        T(-w.w, w.d, R),
      ];
      Fi(z, N, ue.stageFloor);
    }
    (A(0, w.d + 0.01, w.w + 0.02, 0.03, R - 0.1, R + 0.02, ue.gold),
      A(0, w.d + 0.01, w.w + 0.02, 0.03, l, l + 0.08, ue.red),
      A(0, w.d + 0.03, w.w - 0.25, 0.02, l + 0.16, R - 0.16, ue.red),
      A(0, w.d + 0.05, w.w - 0.33, 0.02, l + 0.22, R - 0.22, ue.cream));
    let P = n.word("CENTER STAGE", {
      font: 'bold 80px Georgia, "Times New Roman", serif',
      h: 94,
      color: "#fff",
      spacing: 8,
    });
    {
      let N = T(0, w.d + 0.08, l + 0.5);
      si(
        o.text,
        n,
        P,
        N[0],
        N[1],
        N[2],
        w.nx,
        w.nz,
        4.4,
        null,
        oo([0.1, 0.2, 0.62], !1),
      );
    }
    for (let N of [-1, 1]) {
      let B = T(N * (w.w + 0.01), 0, 0);
      A(N * (w.w + 0.01), 0, 0.02, w.d - 0.2, l + 0.16, R - 0.16, ue.red);
    }
    {
      let [N, B] = w.steps;
      for (let H = 0; H < 3; H++) {
        let O = 0.55 - H * 0.3,
          D = N + w.ux * (0.35 - H * 0.3),
          U = B + w.uz * (0.35 - H * 0.3);
        (Us(
          z,
          D,
          U,
          w.ux,
          w.uz,
          0.18 + H * 0,
          0.55,
          l,
          l + (H + 1) * 0.225,
          ue.stageFloor,
        ),
          Us(
            z,
            D + w.ux * 0.181,
            U + w.uz * 0.181,
            w.ux,
            w.uz,
            0.003,
            0.56,
            l + H * 0.225,
            l + (H + 1) * 0.225,
            _,
          ));
      }
    }
    for (let N of [-1, 1]) {
      let B = N * (w.w - 0.5),
        H = -w.d + 0.45;
      (A(B, H, 0.48, 0.45, R, l + 4.4, _),
        A(B, H, 0.55, 0.52, l + 4.4, l + 4.55, ue.gold),
        A(B, H, 0.5, 0.47, l + 4.55, l + 4.75, ue.red),
        Gs(
          z,
          ...E(B, H),
          [
            [0.3, l + 4.75],
            [0.32, l + 4.95],
            [0.15, l + 5.15],
            [0.02, l + 5.3],
          ],
          8,
          ue.gold,
        ));
      for (let [O, D] of [
        [R + 0.25, R + 1.55],
        [R + 1.8, R + 3.05],
      ])
        (A(B, H + 0.455, 0.36, 0.01, O, D, ue.red),
          A(B, H + 0.47, 0.28, 0.01, O + 0.08, D - 0.08, ue.gold),
          A(B, H + 0.48, 0.24, 0.01, O + 0.12, D - 0.12, ue.ypanel));
      A(B + N * 0.485, H, 0.01, 0.4, R + 0.3, l + 4.1, ue.red);
    }
    let I = w.w - 1,
      L = -w.d + 0.25;
    (A(0, L - 0.1, I, 0.05, R, l + 3.6, ue.dark),
      A(0, -w.d + 0.06, w.w - 0.95, 0.05, R, l + 3.6, _));
    for (let N of [-1, 1])
      for (let B = 0; B < 9; B++) {
        let H = N * (I - B * 0.11),
          O = N * (I - (B + 1) * 0.11),
          D = L + (B % 2 ? 0.12 : 0),
          U = L + (B % 2 ? 0 : 0.12);
        xs(
          z,
          T(H, D, R),
          T(O, U, R),
          T(O, U, l + 3.55),
          T(H, D, l + 3.55),
          ue.curtain,
          C(0, 10, R + 1),
        );
      }
    xs(
      z,
      T(-I, L + 0.12, l + 3),
      T(I, L + 0.12, l + 3),
      T(I, L + 0.12, l + 3.55),
      T(-I, L + 0.12, l + 3.55),
      ue.curtain,
      C(0, 10, R + 1),
    );
    {
      let N = T(0, L + 0.14, l + 2.75),
        B = n.add("p39clock", 96, 96, mht);
      si(o.text, n, B, N[0], N[1], N[2], w.nx, w.nz, 0.42, 0.42, Da(!0));
    }
    (A(0, -w.d + 0.45, w.w - 0.02, 0.4, l + 3.6, l + 4.15, _),
      A(0, -w.d + 0.86, w.w - 0.05, 0.02, l + 3.68, l + 3.78, ue.red),
      A(0, -w.d + 0.86, w.w - 0.05, 0.02, l + 4, l + 4.07, ue.gold));
    for (let N = 0; N <= 16; N++) {
      let B = T(-w.w + 0.4 + (N * (2 * w.w - 0.8)) / 16, -w.d + 0.9, l + 3.89);
      Kg(z, B[0], B[1], B[2]);
    }
    {
      let N = n.add("p39water", 640, 156, ght),
        B = T(0, -w.d + 0.9, l + 4.6);
      (A(0, -w.d + 0.82, 1.9, 0.05, l + 4.15, l + 5.05, ue.white),
        si(o.text, n, N, B[0], B[1], B[2], w.nx, w.nz, 3.6, 0.88, Da(!0)));
    }
    let F = (N, B, H, O, D) => {
      let [U, G] = E(N, B);
      AG(z, U, G, H, O, D);
    };
    F(0, -w.d + 0.5, 2.2, l + 5.05, 2);
    {
      let [N, B] = w.booth,
        H = -w.w - 1.2,
        O = -w.d + 0.9;
      (A(H, O, 0.9, 0.9, l, l + 0.5, ue.red),
        A(H, O, 0.88, 0.88, l + 0.5, l + 2.35, _),
        A(H, O, 0.95, 0.95, l + 2.35, l + 2.6, ue.red),
        A(
          H,
          O + 0.885,
          0.7,
          0.01,
          l + 0.75,
          l + 2.2,
          At([0.25, 0.3, 0.35], Tt.glass),
        ),
        A(
          H + 0.885,
          O,
          0.01,
          0.7,
          l + 0.75,
          l + 2.2,
          At([0.25, 0.3, 0.35], Tt.glass),
        ));
      for (let D = 0; D < 9; D++) {
        let U = H + ((D % 3) - 1) * 0.4,
          G = O + (Math.floor(D / 3) - 1) * 0.4,
          [q, W] = E(U, G);
        Gs(
          z,
          q,
          W,
          [
            [0.01, l + 0.85],
            [0.18, l + 0.95],
            [0.16, l + 1.15],
            [0.01, l + 1.2],
          ],
          6,
          At(
            [
              [0.9, 0.3, 0.5],
              [0.3, 0.6, 0.9],
              [0.95, 0.8, 0.2],
              [0.5, 0.85, 0.4],
            ][D % 4],
            Tt.paint,
          ),
        );
      }
      {
        let D = n.word("CLAW GAME", {
            font: "bold 54px Georgia, serif",
            h: 64,
            color: "#fff",
          }),
          U = T(H, O + 0.97, l + 2.48);
        si(
          o.text,
          n,
          D,
          U[0],
          U[1],
          U[2],
          w.nx,
          w.nz,
          1.5,
          null,
          oo([0.98, 0.9, 0.3], !0),
        );
      }
      F(H, O, 1.35, l + 2.6, 1.45);
    }
    {
      let [N, B] = E(-1.4, 0.3);
      Gs(
        z,
        N,
        B,
        [
          [0.17, R + 0.68],
          [0.17, R + 0.72],
          [0.02, R + 0.73],
        ],
        8,
        ue.plankDk,
      );
      for (let H = 0; H < 3; H++) {
        let O = H * 2.1;
        ss(
          z,
          [N + Math.cos(O) * 0.05, R + 0.7, B + Math.sin(O) * 0.05],
          [N + Math.cos(O) * 0.2, R, B + Math.sin(O) * 0.2],
          0.03,
          0.03,
          ue.plankDk,
        );
      }
    }
    {
      let [N, B] = E(1.3, -0.2);
      (es(z, N, B, 0.03, R, R + 0.8, 5, ue.dark),
        Gs(
          z,
          N,
          B,
          [
            [0.4, R + 0.78],
            [0.4, R + 0.82],
            [0.01, R + 0.83],
          ],
          10,
          ue.red,
        ),
        Us(z, N, B, w.ux, w.uz, 0.18, 0.14, R + 0.83, R + 1.1, ue.cblue));
    }
    for (let N of w.benches) {
      let { a: B, b: H, L: O } = N;
      for (let D = 0; D < 3; D++)
        A(B, H - 0.15 + D * 0.13, O, 0.05, l + 0.42, l + 0.46, ue.benchWood);
      for (let D of [0.62, 0.78])
        A(B, H + 0.27, O, 0.02, l + D - 0.06, l + D + 0.06, ue.benchWood);
      for (let D of [-O + 0.12, 0, O - 0.12])
        (A(B + D, H, 0.03, 0.24, l, l + 0.42, ue.dark),
          ss(
            z,
            T(B + D, H + 0.22, l + 0.42),
            T(B + D, H + 0.3, l + 0.88),
            0.05,
            0.04,
            ue.dark,
          ));
    }
  }
  if (i.f.arcade) {
    let w = i.f.arcade,
      { a: z, n: _, L: R, ux: T, uz: E, wide: A } = w,
      C = o.solid,
      P = Math.max(0.4, R / 2 - 6),
      I = Math.min(R - 0.4, R / 2 + 6),
      L = l + (A ? 3.25 : 3.1),
      F = A ? 1.3 : 1.6,
      N = (G, q, W) => [z[0] + T * G + _[0] * q, W, z[1] + E * G + _[1] * q],
      B = N((P + I) / 2, 0, 0);
    (xs(
      C,
      N(P, 0.05, L),
      N(I, 0.05, L),
      N(I, F, L - 0.55),
      N(P, F, L - 0.55),
      ue.awnRed,
      [B[0] + _[0] * 20, l + 30, B[2] + _[1] * 20],
    ),
      xs(
        C,
        N(P, F, L - 0.55),
        N(I, F, L - 0.55),
        N(I, F, L - 0.95),
        N(P, F, L - 0.95),
        ue.awnRed,
        [B[0] + _[0] * 20, l + 1, B[2] + _[1] * 20],
      ));
    for (let G of [P, I])
      xs(
        C,
        N(G, 0.05, L),
        N(G, F, L - 0.55),
        N(G, F, L - 0.95),
        N(G, 0.05, L - 0.95),
        ue.awnRed,
        N(G + (G === P ? -5 : 5), 0.8, L - 0.5),
      );
    let H = n.word("SPORTSGRILL  \xB7  ARCADE", {
        font: "bold 54px Georgia, serif",
        h: 64,
        color: "#fff",
      }),
      O = N((P + I) / 2, F + 0.02, L - 0.75);
    si(
      o.text,
      n,
      H,
      O[0],
      O[1],
      O[2],
      _[0],
      _[1],
      Math.min(I - P - 0.6, 5.2),
      null,
      oo([1, 1, 1], !0),
    );
    let D = n.word("ARCADE", {
        font: "bold 54px Georgia, serif",
        h: 64,
        color: "#fff",
      }),
      U = N(Math.max(P - 1.5, 0.8), 0.08, l + 2.4);
    (Us(
      C,
      U[0] - _[0] * 0.02,
      U[2] - _[1] * 0.02,
      T,
      E,
      0.75,
      0.04,
      l + 2.15,
      l + 2.65,
      ue.cblue,
    ),
      si(
        o.text,
        n,
        D,
        U[0] + _[0] * 0.03,
        U[1],
        U[2] + _[1] * 0.03,
        _[0],
        _[1],
        1.3,
        null,
        oo([1, 0.92, 0.3], !0),
      ));
  }
  for (let w of i.f.kiosks || []) {
    let z = o.solid,
      { x: _, z: R, nx: T, nz: E } = w,
      A = -E,
      C = T;
    (Us(z, _, R, A, C, 0.8, 0.8, l, l + 0.25, ue.red),
      Us(
        z,
        _,
        R,
        A,
        C,
        0.78,
        0.78,
        l + 0.25,
        l + 2.2,
        [ue.cream, ue.syellow, ue.white][w.k % 3],
      ),
      Us(
        z,
        _ + T * 0.77,
        R + E * 0.77,
        A,
        C,
        0.6,
        0.03,
        l + 1,
        l + 1.9,
        At([0.2, 0.24, 0.28], Tt.glass),
      ),
      Us(
        z,
        _ + T * 0.9,
        R + E * 0.9,
        A,
        C,
        0.65,
        0.15,
        l + 0.95,
        l + 1,
        ue.red,
      ),
      Us(z, _, R, A, C, 0.88, 0.88, l + 2.2, l + 2.35, ue.red),
      AG(z, _, R, 1.15, l + 2.35, 1.15));
    let P = n.word(["CHURROS", "LEMONADE", "GIFTS"][w.k % 3], {
      font: "bold 54px Georgia, serif",
      h: 64,
      color: "#fff",
    });
    si(
      o.text,
      n,
      P,
      _ + T * 0.81,
      l + 2.05,
      R + E * 0.81,
      T,
      E,
      1.2,
      null,
      oo([0.85, 0.1, 0.1], !1),
    );
  }
  for (let [w, z] of i.f.bins || []) {
    let _ = o.solid;
    (es(_, w, z, 0.33, l, l + 0.8, 10, ue.barrel, 0.31),
      Gs(
        _,
        w,
        z,
        [
          [0.36, l + 0.8],
          [0.37, l + 0.9],
          [0.34, l + 1],
          [0.2, l + 1.12],
          [0.02, l + 1.16],
        ],
        10,
        ue.binGreen,
      ));
    for (let R of [0.15, 0.62])
      Gs(
        _,
        w,
        z,
        [
          [0.335, l + R],
          [0.335, l + R + 0.05],
        ],
        10,
        ue.binGreen,
      );
  }
  {
    let w = o.solid;
    for (let [z, _] of i.f.lamps)
      (es(w, z, _, 0.16, l, l + 0.5, 8, ue.blue),
        es(w, z, _, 0.07, l + 0.5, l + 3.7, 6, ue.blue),
        es(w, z, _, 0.12, l + 3.7, l + 3.85, 8, ue.blue),
        Gs(
          w,
          z,
          _,
          [
            [0.06, l + 3.85],
            [0.2, l + 3.95],
            [0.25, l + 4.15],
            [0.2, l + 4.35],
            [0.06, l + 4.45],
          ],
          10,
          ue.globe,
        ),
        Gs(
          w,
          z,
          _,
          [
            [0.12, l + 4.44],
            [0.09, l + 4.6],
            [0.01, l + 4.7],
          ],
          8,
          ue.blue,
        ));
    for (let { x: z, z: _, nx: R, nz: T, barrel: E } of i.f.seats) {
      if (E) {
        (es(w, z, _, 0.5, l, l + 0.7, 10, ue.barrel, 0.45),
          Gs(
            w,
            z,
            _,
            [
              [0.42, l + 0.66],
              [0.55, l + 0.95],
              [0.3, l + 1.25],
              [0.02, l + 1.3],
            ],
            8,
            ue.leaf,
          ));
        for (let P = 0; P < 6; P++) {
          let I = P * 1.05,
            L = 0.32;
          es(
            w,
            z + Math.cos(I) * L,
            _ + Math.sin(I) * L,
            0.07,
            l + 1,
            l + 1.14,
            5,
            At(
              [
                [0.85, 0.1, 0.15],
                [0.95, 0.75, 0.1],
                [0.8, 0.3, 0.6],
              ][P % 3],
              Tt.paint,
            ),
          );
        }
        continue;
      }
      let A = -T,
        C = R;
      (Us(w, z, _, A, C, 0.9, 0.22, l + 0.42, l + 0.48, ue.plankDk),
        Us(
          w,
          z - R * 0.22,
          _ - T * 0.22,
          A,
          C,
          0.9,
          0.04,
          l + 0.5,
          l + 0.9,
          ue.plankDk,
        ));
      for (let P of [-0.75, 0.75])
        Us(w, z + A * P, _ + C * P, A, C, 0.04, 0.22, l, l + 0.44, ue.blue);
    }
  }
  let S = [];
  {
    let w = o.solid,
      z = CR(7);
    for (let _ = -31; _ <= 31.1; _ += 7.75)
      for (let R = -30.8; R <= 30.9; R += 6.16) {
        let T = x[0] + g[0] * _ + b[0] * R,
          E = x[2] + g[1] * _ + b[1] * R;
        if (i.inDeck(T, E) || Y1(i.flat, T, E) < 4.5 || Math.hypot(_, R) > 31)
          continue;
        let A = 2.4 + (z() < 0.3 ? 0.8 : 0),
          C = 1.9;
        if (
          (Us(w, T, E, g[0], g[1], A, C, 0.25, 0.6, ue.float),
          Us(a.solid, T, E, g[0], g[1], A, C, 0.25, 0.6, ue.float),
          Us(
            w,
            T,
            E,
            g[0],
            g[1],
            A + 0.05,
            C + 0.05,
            -0.15,
            0.28,
            ue.floatSide,
            { top: !1 },
          ),
          z() < 0.5)
        ) {
          let I = T + g[0] * (A + 0.6) + b[0] * C,
            L = E + g[1] * (A + 0.6) + b[1] * C;
          (es(w, I, L, 0.16, -3, 2.8, 6, ue.pile), eu(I, L, 0.2));
        }
        let P = 1 + Math.floor(z() * 5);
        for (let I = 0; I < P; I++) {
          let L = (z() - 0.5) * (A * 2 - 1.6),
            F = (z() - 0.5) * (C * 2 - 0.9),
            N = z() * Math.PI * 2;
          (fht(w, T + g[0] * L + b[0] * F, E + g[1] * L + b[1] * F, 0.6, N, z),
            S.push(1));
        }
      }
  }
  {
    let w = o.solid,
      z = i.axis.o,
      _ = CR(11),
      R = [];
    for (let T = 70; T <= 250; T += 4.4)
      for (let E of [24, 46]) {
        let A = z[0] + g[0] * T + b[0] * E,
          C = z[1] + g[1] * T + b[1] * E;
        i.inDeck(A, C) || Y1(i.flat, A, C) < 9 || R.push([T, E, A, C]);
      }
    for (let T of [24, 46]) {
      let E = R.filter((I) => I[1] === T);
      if (E.length < 3) continue;
      let A = E[0][0] - 3,
        C = E[E.length - 1][0] + 3,
        P = T - 6.5;
      for (let I = A; I < C; I += 12) {
        let L = z[0] + g[0] * (I + 6) + b[0] * P,
          F = z[1] + g[1] * (I + 6) + b[1] * P;
        (Us(w, L, F, g[0], g[1], 6, 1, 0.2, 0.55, ue.dock),
          Us(a.solid, L, F, g[0], g[1], 6, 1, 0.2, 0.55, ue.dock));
      }
      for (let [I] of E) {
        let L = z[0] + g[0] * (I + 2.2) + b[0] * (T - 2.5),
          F = z[1] + g[1] * (I + 2.2) + b[1] * (T - 2.5);
        Us(w, L, F, b[0], b[1], 3.5, 0.35, 0.2, 0.5, ue.dock);
      }
    }
    for (let [, T, E, A] of R)
      _() < 0.15 || uht(w, a.solid, E, A, b[0], b[1], 8 + _() * 5, _, T > 30);
  }
  return { BN: e, BF: s, A: n, rot: M, lions: x, nLions: S.length };
}
