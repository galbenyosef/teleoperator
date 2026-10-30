// app 62 — math
// Lines 65351-66601 of readable/app.pretty.js (statement-aligned).
function LW(o, { mobile: t = !1 } = {}) {
  let e = new nh(),
    s = new nh(),
    n = new Bu(2048, 1024),
    i = e.R("p39n"),
    a = s.R("p39f"),
    r = e.R("p39rot"),
    l = o.Yd,
    c = lP(39),
    h = $5(o),
    f = n.add("p39sign", 768, 180, Idt),
    u = n.add("p39old", 768, 180, Fdt),
    d = n.add("flag", 285, 150, Ndt),
    p = n.word("AQUARIUM OF THE BAY", {
      font: "bold 120px Georgia, serif",
      h: 140,
      color: "#fff",
    }),
    m = Bb(o.flat),
    g = o.axis.u,
    b = o.axis.w;
  for (let [w, _] of [
    [i, 0],
    [a, 1],
  ]) {
    let z = m.map((P) => new Pe(P[0], P[1])),
      A = So.triangulateShape(z, []),
      T = w.solid,
      E = T.v;
    for (let P of m)
      T.vert(
        P[0],
        l,
        P[1],
        0,
        1,
        0,
        P[0] * b[0] + P[1] * b[1],
        P[0] * g[0] + P[1] * g[1],
        ge.plank,
      );
    for (let [P, C, I] of A) {
      let L = T.p.a,
        F = E + P,
        O = E + C,
        B = E + I,
        H = L[F * 3],
        N = L[F * 3 + 2],
        D = L[O * 3],
        U = L[O * 3 + 2],
        G = L[B * 3],
        W = L[B * 3 + 2];
      (U - N) * (G - H) - (D - H) * (W - N) >= 0
        ? T.tri(F, O, B)
        : T.tri(F, B, O);
    }
    let R = o.ring;
    for (let P = 0; P + 1 < R.length; P++) {
      let C = R[P],
        I = R[P + 1];
      if (Math.hypot(I[0] - C[0], I[1] - C[1]) < 0.05) continue;
      let L = ac(o.flat, C, I);
      K5(T, C, I, L, 0.4, l + 0.05, ge.fascia);
    }
    if (_ === 0) {
      let P = 0;
      for (let C = 0; C + 1 < R.length; C++) {
        let I = R[C],
          L = R[C + 1],
          F = Math.hypot(L[0] - I[0], L[1] - I[1]);
        if (F < 0.05) continue;
        let O = ac(o.flat, I, L);
        for (let B = (3.5 - P) % 3.5; B < F; B += 3.5) {
          let H = B / F,
            N = I[0] + (L[0] - I[0]) * H + O[0] * 0.55,
            D = I[1] + (L[1] - I[1]) * H + O[1] * 0.55;
          (os(T, N, D, 0.24, -4, l - 0.2, 6, ge.pile), Ou(N, D, 0.3));
        }
        P = (P + F) % 3.5;
      }
    }
  }
  let v = [o.lions[0], 0.6, o.lions[1]];
  {
    let w = o.ring,
      _ = i.solid,
      z = 0.28;
    for (let A = 0; A + 1 < w.length; A++) {
      let T = w[A],
        E = w[A + 1],
        R = Math.hypot(E[0] - T[0], E[1] - T[1]);
      if (R < 0.3) continue;
      let P = ac(o.flat, T, E),
        C = [T[0] - P[0] * z, T[1] - P[1] * z],
        I = [E[0] - P[0] * z, E[1] - P[1] * z];
      rs(_, [C[0], l + 1.07, C[1]], [I[0], l + 1.07, I[1]], 0.16, 0.07, ge.cap);
      for (let L of [0.72, 0.38])
        rs(_, [C[0], l + L, C[1]], [I[0], l + L, I[1]], 0.05, 0.05, ge.pipe);
      for (let L = 0; L < R; L += 2.4) {
        let F = L / R,
          O = C[0] + (I[0] - C[0]) * F,
          B = C[1] + (I[1] - C[1]) * F;
        zs(
          _,
          O - 0.06,
          l,
          B - 0.06,
          O + 0.06,
          l + 1.04,
          B + 0.06,
          ge.railPost,
          { top: !1 },
        );
      }
    }
  }
  let x = (w) =>
      w.id === 288396169
        ? "grey"
        : w.id === 128240149 || w.id === 128240119 || w.id === 128240134
          ? "tan"
          : ["wood", "wood", "grey", "cream", "wood", "grey", "wood", "cream"][
              w.id % 8
            ],
    y = 0;
  for (let w of o.houses) {
    let _ = Bb(w.ring),
      z = x(w),
      A = Math.min(4.2, Math.max(2.2, w.h - X5)),
      T = l + X5,
      E = [0.96 + c() * 0.08, 0.96 + c() * 0.06, 0.96 + c() * 0.06],
      R = -1;
    if (w.id === 288396169) {
      let P = 0;
      for (let C = 0; C < _.length; C++) {
        let I = _[C],
          L = _[(C + 1) % _.length],
          F = ac(w.ring, I, L),
          O = Math.hypot(L[0] - I[0], L[1] - I[1]);
        F[0] < -0.5 && O > P && ((P = O), (R = C));
      }
    }
    for (let [P, C] of [
      [i, 0],
      [a, 1],
    ]) {
      let I = (w.id % 7) * 3.1;
      for (let L = 0; L < _.length; L++) {
        let F = _[L],
          O = _[(L + 1) % _.length],
          B = Math.hypot(O[0] - F[0], O[1] - F[1]);
        if (B < 0.05) continue;
        let H = ac(w.ring, F, O);
        (K5(
          P.atlas,
          F,
          O,
          H,
          l,
          T,
          cP(L === R ? "mural" : z, E),
          L === R ? 0 : I,
          l,
        ),
          (I += B));
      }
      if (
        (Tdt(
          P.solid,
          _,
          w.ring,
          T,
          A,
          C === 0,
          w.id === 288396169 ? ge.aquaRoof : ge.shingle,
        ),
        C === 0)
      )
        for (let L = 0; L < _.length; L++) {
          let F = _[L],
            O = _[(L + 1) % _.length];
          if (Math.hypot(O[0] - F[0], O[1] - F[1]) < 0.3) continue;
          let H = ac(w.ring, F, O);
          K5(
            P.solid,
            [F[0] + H[0] * 0.06, F[1] + H[1] * 0.06],
            [O[0] + H[0] * 0.06, O[1] + H[1] * 0.06],
            H,
            T - 0.35,
            T,
            z === "wood" || z === "tan" ? ge.fascia : ge.trim,
          );
        }
    }
  }
  for (let w of o.f.fronts) {
    if (w.arcade) continue;
    let { a: _, n: z, L: A, ux: T, uz: E, wide: R } = w,
      P = (_[0] + w.b[0]) / 2,
      C = (_[1] + w.b[1]) / 2;
    for (let I = 3.5; I < A - 2.5; I += 8) {
      let L = TW[y++ % TW.length],
        F = n.word(L, {
          font: "bold 54px Georgia, serif",
          h: 64,
          color: "#fff",
        }),
        O = R ? 2.32 : 0.12,
        B = R ? l + 3.45 : l + 3.25,
        H = _[0] + T * I + z[0] * O,
        N = _[1] + E * I + z[1] * O,
        D = [
          [0.95, 0.85, 0.55],
          [1, 1, 1],
          [0.95, 0.9, 0.8],
        ][y % 3];
      if (
        (ri(
          i.text,
          n,
          F,
          H,
          B,
          N,
          z[0],
          z[1],
          Math.min(4.2, 0.42 * F.aspect),
          0.42,
          xo(D, !0),
        ),
        !R)
      ) {
        let U = EW[y % EW.length],
          G = ($) => [_[0] + T * $, _[1] + E * $],
          W = G(Math.max(0.3, I - 3.2)),
          V = G(Math.min(A - 0.3, I + 3.2));
        Ms(
          i.solid,
          [W[0] + z[0] * 0.05, l + 3.05, W[1] + z[1] * 0.05],
          [V[0] + z[0] * 0.05, l + 3.05, V[1] + z[1] * 0.05],
          [V[0] + z[0] * 1.3, l + 2.55, V[1] + z[1] * 1.3],
          [W[0] + z[0] * 1.3, l + 2.55, W[1] + z[1] * 1.3],
          Rt(U, Tt.paint),
          [P + z[0] * 20, l + 30, C + z[1] * 20],
        );
      }
    }
  }
  for (let w of o.f.balconies) {
    let { a: _, b: z, n: A, L: T, ux: E, uz: R } = w,
      P = i.solid,
      C = l + 3.6,
      I = 2.3,
      L = (N, D) => [_[0] + E * N + A[0] * D, _[1] + R * N + A[1] * D],
      F = L(0.2, 0),
      O = L(T - 0.2, 0),
      B = L(T - 0.2, I),
      H = L(0.2, I);
    ($i(
      P,
      [
        [F[0], C, F[1]],
        [O[0], C, O[1]],
        [B[0], C, B[1]],
        [H[0], C, H[1]],
      ],
      ge.plankDk,
    ),
      $i(
        P,
        [
          [F[0], C - 0.25, F[1]],
          [O[0], C - 0.25, O[1]],
          [B[0], C - 0.25, B[1]],
          [H[0], C - 0.25, H[1]],
        ],
        ge.fascia,
        !0,
      ),
      K5(P, H, B, A, C - 0.3, C + 0.02, ge.fascia),
      rs(P, [H[0], C + 1, H[1]], [B[0], C + 1, B[1]], 0.1, 0.07, ge.white),
      rs(
        P,
        [H[0], C + 0.5, H[1]],
        [B[0], C + 0.5, B[1]],
        0.04,
        0.04,
        ge.white,
      ));
    for (
      let N = 0.2;
      N <= T - 0.2 + 1e-6;
      N += Math.max(1.2, (T - 0.4) / Math.round((T - 0.4) / 1.25))
    ) {
      let D = L(N, I - 0.05);
      zs(
        P,
        D[0] - 0.03,
        C,
        D[1] - 0.03,
        D[0] + 0.03,
        C + 1,
        D[1] + 0.03,
        ge.white,
        { top: !1 },
      );
    }
    for (let N of w.posts) os(P, N[0], N[1], 0.11, l, C - 0.25, 6, ge.post);
    if (w.stair) {
      for (let N = 0; N < 18; N++) {
        let D = T - 0.2 + N * 0.33,
          U = C - N * 0.2,
          G = L(D, 0.25),
          W = L(D, I - 0.25),
          V = L(D + 0.33, 0.25),
          $ = L(D + 0.33, I - 0.25);
        ($i(
          P,
          [
            [G[0], U, G[1]],
            [W[0], U, W[1]],
            [$[0], U, $[1]],
            [V[0], U, V[1]],
          ],
          ge.plankDk,
        ),
          K5(P, V, $, [E, R], U - 0.2, U, ge.fascia));
      }
      for (let N of [0.2, I - 0.2]) {
        let D = L(T - 0.2, N),
          U = L(T + 5.74, N);
        rs(P, [D[0], C + 1, D[1]], [U[0], l + 1, U[1]], 0.08, 0.06, ge.white);
      }
      for (let N of [0.18, I - 0.18]) {
        let D = L(T - 0.2, N),
          U = L(T + 5.74, N);
        rs(
          P,
          [D[0], C - 0.15, D[1]],
          [U[0], l + 0.05, U[1]],
          0.08,
          0.3,
          ge.post,
        );
      }
    }
  }
  for (let w of o.f.boards) {
    let _ = w.q.id,
      z = w.q,
      [A, T] = w.m,
      E = Math.min(w.L * 0.8, _ === 466623895 ? 6 : 8.5);
    for (let R of [i, a])
      ri(
        R.text,
        n,
        f,
        A + w.n[0] * 0.1,
        l + X5 - 1.5,
        T + w.n[1] * 0.1,
        w.n[0],
        w.n[1],
        E,
        (E * 240) / 1024,
        Za(!0),
      );
    if (w.vault) {
      let { ux: R, uz: P } = w,
        C = w.vault,
        I = i.solid,
        L = 1.6,
        F = 3.4;
      for (let O = 0; O < 10; O++) {
        let B = (O / 10) * Math.PI,
          H = ((O + 1) / 10) * Math.PI,
          N = [Math.cos(B) * L, Math.sin(B) * L],
          D = [Math.cos(H) * L, Math.sin(H) * L],
          U = (G, W) => [
            C[0] + R * G[0] + w.n[0] * W,
            l + 2.6 + G[1],
            C[1] + P * G[0] + w.n[1] * W,
          ];
        Ms(I, U(N, 0), U(D, 0), U(D, F), U(N, F), ge.blue, [
          C[0] + w.n[0] * F * 0.5,
          l + 30,
          C[1] + w.n[1] * F * 0.5,
        ]);
      }
      for (let O of [-1, 1])
        os(
          I,
          C[0] + R * O * L + w.n[0] * (F - 0.1),
          C[1] + P * O * L + w.n[1] * (F - 0.1),
          0.06,
          l,
          l + 2.6,
          6,
          ge.white,
        );
      ri(
        i.text,
        n,
        p,
        C[0] + w.n[0] * (F + 0.02),
        l + 3.4,
        C[1] + w.n[1] * (F + 0.02),
        w.n[0],
        w.n[1],
        2.9,
        2.9 / p.aspect,
        xo([1, 1, 1], !0),
      );
    }
    if (_ !== 466623895) {
      let R = Bb(z.ring),
        P = CW(R),
        [C, I] = P.c,
        L = Math.min(4.2, Math.max(2.2, z.h - X5)),
        F = l + X5 + Math.min(L, P.hw * 0.75),
        O = i.solid;
      Ws(
        O,
        C,
        I,
        [
          [1.7, F - 1.2],
          [1.7, F + 1.2],
          [1.9, F + 1.3],
          [1, F + 2.4],
          [0.1, F + 2.9],
        ],
        8,
        ge.white,
      );
      for (let B = 0; B < 8; B++) {
        let H = ((B + 0.5) / 8) * Math.PI * 2;
        Vs(
          O,
          C + Math.cos(H) * 1.72,
          I + Math.sin(H) * 1.72,
          -Math.sin(H),
          Math.cos(H),
          0.35,
          0.03,
          F - 0.2,
          F + 0.9,
          Rt([0.05, 0.07, 0.1], Tt.glass),
        );
      }
      (os(O, C, I, 0.05, F + 2.8, F + 8.5, 5, ge.white),
        ri(i.text, n, d, C + 0.9, F + 7.6, I, 0, 1, 1.8, 0.95, Za(!1)),
        ri(i.text, n, d, C + 0.9, F + 7.6, I, 0, -1, 1.8, 0.95, Za(!1)));
    }
  }
  {
    let [w, _] = o.f.oldSign,
      z = i.solid;
    for (let A of [-2.7, 2.7])
      zs(
        z,
        w + A - 0.12,
        l,
        _ - 0.12,
        w + A + 0.12,
        l + 3.4,
        _ + 0.12,
        ge.post,
      );
    (zs(z, w - 3, l + 2, _ - 0.06, w + 3, l + 3.35, _ + 0.06, ge.white),
      ri(i.text, n, u, w, l + 2.68, _ + 0.07, 0, 1, 5.8, 1.3, Za(!1)),
      ri(i.text, n, u, w, l + 2.68, _ - 0.07, 0, -1, 5.8, 1.3, Za(!1)));
  }
  let M = null;
  if (o.carousel) {
    let { x: w, z: _, r: z } = o.carousel;
    ((M = { x: w, z: _, horses: [] }),
      RW(
        i.solid,
        i.atlas,
        r.solid,
        [e.R("p39hup").solid, e.R("p39hdn").solid],
        w,
        _,
        z,
        l,
        !0,
        M.horses,
      ),
      RW(a.solid, a.atlas, a.solid, null, w, _, z, l, !1));
    let { gate: A, booth: T, umbrella: E } = o.carousel,
      R = i.solid,
      P = z + 1.1,
      C = 44;
    for (let I = 0; I < C; I++) {
      let L = (I / C) * Math.PI * 2,
        F = ((I + 1) / C) * Math.PI * 2;
      if (
        Math.abs(
          ((L + Math.PI / C - A + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
        ) >
        Math.PI - 0.32
      )
        continue;
      let O = [w + Math.cos(L) * P, _ + Math.sin(L) * P],
        B = [w + Math.cos(F) * P, _ + Math.sin(F) * P];
      for (let H of [0.95, 0.5])
        rs(
          R,
          [O[0], l + H, O[1]],
          [B[0], l + H, B[1]],
          0.07,
          H > 0.9 ? 0.07 : 0.04,
          ge.red,
        );
      (os(R, O[0], O[1], 0.035, l, l + 1, 6, ge.brass),
        Ws(
          R,
          O[0],
          O[1],
          [
            [0.035, l + 1],
            [0.06, l + 1.05],
            [0.01, l + 1.11],
          ],
          6,
          ge.gold,
        ));
    }
    (Vs(R, T.x, T.z, T.ux, T.uz, 1.25, 0.6, l, l + 0.22, ge.red),
      Vs(R, T.x, T.z, T.ux, T.uz, 1.2, 0.55, l + 0.22, l + 1.55, ge.cream),
      Vs(R, T.x, T.z, T.ux, T.uz, 1.3, 0.65, l + 1.55, l + 1.85, ge.red),
      Vs(R, T.x, T.z, T.ux, T.uz, 1.34, 0.69, l + 1.85, l + 1.92, ge.gold));
    for (let I = 0; I < 4; I++) {
      let L = (I - 1.5) * 0.58,
        F = T.x + T.ux * L + T.nx * 0.56,
        O = T.z + T.uz * L + T.nz * 0.56;
      (Vs(R, F, O, T.ux, T.uz, 0.22, 0.02, l + 0.75, l + 1.4, ge.white),
        Vs(
          R,
          F + T.nx * 0.02,
          O + T.nz * 0.02,
          T.ux,
          T.uz,
          0.12,
          0.02,
          l + 1.1,
          l + 1.32,
          Rt([0.12, 0.14, 0.18], Tt.glass),
        ));
    }
    (ri(
      i.text,
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
      xo([0.98, 0.95, 0.85], !0),
    ),
      os(R, E[0], E[1], 0.04, l, l + 2.55, 6, ge.white));
    for (let I = 0; I < 8; I++) {
      let L = (I / 8) * Math.PI * 2,
        F = ((I + 1) / 8) * Math.PI * 2,
        O = 1.1;
      (Ms(
        R,
        [E[0] + Math.cos(L) * O, l + 2.15, E[1] + Math.sin(L) * O],
        [E[0] + Math.cos(F) * O, l + 2.15, E[1] + Math.sin(F) * O],
        [E[0], l + 2.6, E[1]],
        [E[0], l + 2.6, E[1]],
        ge.red,
        [
          E[0] + Math.cos((L + F) / 2) * 10,
          l + 12,
          E[1] + Math.sin((L + F) / 2) * 10,
        ],
      ),
        Ms(
          R,
          [E[0] + Math.cos(L) * O, l + 2.14, E[1] + Math.sin(L) * O],
          [E[0] + Math.cos(F) * O, l + 2.14, E[1] + Math.sin(F) * O],
          [E[0], l + 2.59, E[1]],
          [E[0], l + 2.59, E[1]],
          ge.redDk,
          [E[0], l, E[1]],
        ));
    }
  }
  if (o.f.stage) {
    let w = o.f.stage,
      _ = i.solid,
      z = ge.syellow,
      A = l + w.h,
      T = (O, B, H = 0) => [
        w.x + w.ux * O + w.nx * B,
        H,
        w.z + w.uz * O + w.nz * B,
      ],
      E = (O, B) => {
        let H = T(O, B);
        return [H[0], H[2]];
      },
      R = (O, B, H, N, D, U, G, W = {}) => {
        let [V, $] = E(O, B);
        Vs(_, V, $, w.ux, w.uz, H, N, D, U, G, W);
      },
      P = (O, B, H) => T(O, B, H);
    R(0, 0, w.w, w.d, l, A, z, { top: !1 });
    {
      let O = [
        T(-w.w, -w.d, A),
        T(w.w, -w.d, A),
        T(w.w, w.d, A),
        T(-w.w, w.d, A),
      ];
      $i(_, O, ge.stageFloor);
    }
    (R(0, w.d + 0.01, w.w + 0.02, 0.03, A - 0.1, A + 0.02, ge.gold),
      R(0, w.d + 0.01, w.w + 0.02, 0.03, l, l + 0.08, ge.red),
      R(0, w.d + 0.03, w.w - 0.25, 0.02, l + 0.16, A - 0.16, ge.red),
      R(0, w.d + 0.05, w.w - 0.33, 0.02, l + 0.22, A - 0.22, ge.cream));
    let C = n.word("CENTER STAGE", {
      font: 'bold 80px Georgia, "Times New Roman", serif',
      h: 94,
      color: "#fff",
      spacing: 8,
    });
    {
      let O = T(0, w.d + 0.08, l + 0.5);
      ri(
        i.text,
        n,
        C,
        O[0],
        O[1],
        O[2],
        w.nx,
        w.nz,
        4.4,
        null,
        xo([0.1, 0.2, 0.62], !1),
      );
    }
    for (let O of [-1, 1]) {
      let B = T(O * (w.w + 0.01), 0, 0);
      R(O * (w.w + 0.01), 0, 0.02, w.d - 0.2, l + 0.16, A - 0.16, ge.red);
    }
    {
      let [O, B] = w.steps;
      for (let H = 0; H < 3; H++) {
        let N = 0.55 - H * 0.3,
          D = O + w.ux * (0.35 - H * 0.3),
          U = B + w.uz * (0.35 - H * 0.3);
        (Vs(
          _,
          D,
          U,
          w.ux,
          w.uz,
          0.18 + H * 0,
          0.55,
          l,
          l + (H + 1) * 0.225,
          ge.stageFloor,
        ),
          Vs(
            _,
            D + w.ux * 0.181,
            U + w.uz * 0.181,
            w.ux,
            w.uz,
            0.003,
            0.56,
            l + H * 0.225,
            l + (H + 1) * 0.225,
            z,
          ));
      }
    }
    for (let O of [-1, 1]) {
      let B = O * (w.w - 0.5),
        H = -w.d + 0.45;
      (R(B, H, 0.48, 0.45, A, l + 4.4, z),
        R(B, H, 0.55, 0.52, l + 4.4, l + 4.55, ge.gold),
        R(B, H, 0.5, 0.47, l + 4.55, l + 4.75, ge.red),
        Ws(
          _,
          ...E(B, H),
          [
            [0.3, l + 4.75],
            [0.32, l + 4.95],
            [0.15, l + 5.15],
            [0.02, l + 5.3],
          ],
          8,
          ge.gold,
        ));
      for (let [N, D] of [
        [A + 0.25, A + 1.55],
        [A + 1.8, A + 3.05],
      ])
        (R(B, H + 0.455, 0.36, 0.01, N, D, ge.red),
          R(B, H + 0.47, 0.28, 0.01, N + 0.08, D - 0.08, ge.gold),
          R(B, H + 0.48, 0.24, 0.01, N + 0.12, D - 0.12, ge.ypanel));
      R(B + O * 0.485, H, 0.01, 0.4, A + 0.3, l + 4.1, ge.red);
    }
    let I = w.w - 1,
      L = -w.d + 0.25;
    (R(0, L - 0.1, I, 0.05, A, l + 3.6, ge.dark),
      R(0, -w.d + 0.06, w.w - 0.95, 0.05, A, l + 3.6, z));
    for (let O of [-1, 1])
      for (let B = 0; B < 9; B++) {
        let H = O * (I - B * 0.11),
          N = O * (I - (B + 1) * 0.11),
          D = L + (B % 2 ? 0.12 : 0),
          U = L + (B % 2 ? 0 : 0.12);
        Ms(
          _,
          T(H, D, A),
          T(N, U, A),
          T(N, U, l + 3.55),
          T(H, D, l + 3.55),
          ge.curtain,
          P(0, 10, A + 1),
        );
      }
    Ms(
      _,
      T(-I, L + 0.12, l + 3),
      T(I, L + 0.12, l + 3),
      T(I, L + 0.12, l + 3.55),
      T(-I, L + 0.12, l + 3.55),
      ge.curtain,
      P(0, 10, A + 1),
    );
    {
      let O = T(0, L + 0.14, l + 2.75),
        B = n.add("p39clock", 96, 96, Odt);
      ri(i.text, n, B, O[0], O[1], O[2], w.nx, w.nz, 0.42, 0.42, Za(!0));
    }
    (R(0, -w.d + 0.45, w.w - 0.02, 0.4, l + 3.6, l + 4.15, z),
      R(0, -w.d + 0.86, w.w - 0.05, 0.02, l + 3.68, l + 3.78, ge.red),
      R(0, -w.d + 0.86, w.w - 0.05, 0.02, l + 4, l + 4.07, ge.gold));
    for (let O = 0; O <= 16; O++) {
      let B = T(-w.w + 0.4 + (O * (2 * w.w - 0.8)) / 16, -w.d + 0.9, l + 3.89);
      Nb(_, B[0], B[1], B[2]);
    }
    {
      let O = n.add("p39water", 640, 156, Bdt),
        B = T(0, -w.d + 0.9, l + 4.6);
      (R(0, -w.d + 0.82, 1.9, 0.05, l + 4.15, l + 5.05, ge.white),
        ri(i.text, n, O, B[0], B[1], B[2], w.nx, w.nz, 3.6, 0.88, Za(!0)));
    }
    let F = (O, B, H, N, D) => {
      let [U, G] = E(O, B);
      PW(_, U, G, H, N, D);
    };
    F(0, -w.d + 0.5, 2.2, l + 5.05, 2);
    {
      let [O, B] = w.booth,
        H = -w.w - 1.2,
        N = -w.d + 0.9;
      (R(H, N, 0.9, 0.9, l, l + 0.5, ge.red),
        R(H, N, 0.88, 0.88, l + 0.5, l + 2.35, z),
        R(H, N, 0.95, 0.95, l + 2.35, l + 2.6, ge.red),
        R(
          H,
          N + 0.885,
          0.7,
          0.01,
          l + 0.75,
          l + 2.2,
          Rt([0.25, 0.3, 0.35], Tt.glass),
        ),
        R(
          H + 0.885,
          N,
          0.01,
          0.7,
          l + 0.75,
          l + 2.2,
          Rt([0.25, 0.3, 0.35], Tt.glass),
        ));
      for (let D = 0; D < 9; D++) {
        let U = H + ((D % 3) - 1) * 0.4,
          G = N + (Math.floor(D / 3) - 1) * 0.4,
          [W, V] = E(U, G);
        Ws(
          _,
          W,
          V,
          [
            [0.01, l + 0.85],
            [0.18, l + 0.95],
            [0.16, l + 1.15],
            [0.01, l + 1.2],
          ],
          6,
          Rt(
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
          U = T(H, N + 0.97, l + 2.48);
        ri(
          i.text,
          n,
          D,
          U[0],
          U[1],
          U[2],
          w.nx,
          w.nz,
          1.5,
          null,
          xo([0.98, 0.9, 0.3], !0),
        );
      }
      F(H, N, 1.35, l + 2.6, 1.45);
    }
    {
      let [O, B] = E(-1.4, 0.3);
      Ws(
        _,
        O,
        B,
        [
          [0.17, A + 0.68],
          [0.17, A + 0.72],
          [0.02, A + 0.73],
        ],
        8,
        ge.plankDk,
      );
      for (let H = 0; H < 3; H++) {
        let N = H * 2.1;
        rs(
          _,
          [O + Math.cos(N) * 0.05, A + 0.7, B + Math.sin(N) * 0.05],
          [O + Math.cos(N) * 0.2, A, B + Math.sin(N) * 0.2],
          0.03,
          0.03,
          ge.plankDk,
        );
      }
    }
    {
      let [O, B] = E(1.3, -0.2);
      (os(_, O, B, 0.03, A, A + 0.8, 5, ge.dark),
        Ws(
          _,
          O,
          B,
          [
            [0.4, A + 0.78],
            [0.4, A + 0.82],
            [0.01, A + 0.83],
          ],
          10,
          ge.red,
        ),
        Vs(_, O, B, w.ux, w.uz, 0.18, 0.14, A + 0.83, A + 1.1, ge.cblue));
    }
    for (let O of w.benches) {
      let { a: B, b: H, L: N } = O;
      for (let D = 0; D < 3; D++)
        R(B, H - 0.15 + D * 0.13, N, 0.05, l + 0.42, l + 0.46, ge.benchWood);
      for (let D of [0.62, 0.78])
        R(B, H + 0.27, N, 0.02, l + D - 0.06, l + D + 0.06, ge.benchWood);
      for (let D of [-N + 0.12, 0, N - 0.12])
        (R(B + D, H, 0.03, 0.24, l, l + 0.42, ge.dark),
          rs(
            _,
            T(B + D, H + 0.22, l + 0.42),
            T(B + D, H + 0.3, l + 0.88),
            0.05,
            0.04,
            ge.dark,
          ));
    }
  }
  if (o.f.arcade) {
    let w = o.f.arcade,
      { a: _, n: z, L: A, ux: T, uz: E, wide: R } = w,
      P = i.solid,
      C = Math.max(0.4, A / 2 - 6),
      I = Math.min(A - 0.4, A / 2 + 6),
      L = l + (R ? 3.25 : 3.1),
      F = R ? 1.3 : 1.6,
      O = (G, W, V) => [_[0] + T * G + z[0] * W, V, _[1] + E * G + z[1] * W],
      B = O((C + I) / 2, 0, 0);
    (Ms(
      P,
      O(C, 0.05, L),
      O(I, 0.05, L),
      O(I, F, L - 0.55),
      O(C, F, L - 0.55),
      ge.awnRed,
      [B[0] + z[0] * 20, l + 30, B[2] + z[1] * 20],
    ),
      Ms(
        P,
        O(C, F, L - 0.55),
        O(I, F, L - 0.55),
        O(I, F, L - 0.95),
        O(C, F, L - 0.95),
        ge.awnRed,
        [B[0] + z[0] * 20, l + 1, B[2] + z[1] * 20],
      ));
    for (let G of [C, I])
      Ms(
        P,
        O(G, 0.05, L),
        O(G, F, L - 0.55),
        O(G, F, L - 0.95),
        O(G, 0.05, L - 0.95),
        ge.awnRed,
        O(G + (G === C ? -5 : 5), 0.8, L - 0.5),
      );
    let H = n.word("SPORTSGRILL  \xB7  ARCADE", {
        font: "bold 54px Georgia, serif",
        h: 64,
        color: "#fff",
      }),
      N = O((C + I) / 2, F + 0.02, L - 0.75);
    ri(
      i.text,
      n,
      H,
      N[0],
      N[1],
      N[2],
      z[0],
      z[1],
      Math.min(I - C - 0.6, 5.2),
      null,
      xo([1, 1, 1], !0),
    );
    let D = n.word("ARCADE", {
        font: "bold 54px Georgia, serif",
        h: 64,
        color: "#fff",
      }),
      U = O(Math.max(C - 1.5, 0.8), 0.08, l + 2.4);
    (Vs(
      P,
      U[0] - z[0] * 0.02,
      U[2] - z[1] * 0.02,
      T,
      E,
      0.75,
      0.04,
      l + 2.15,
      l + 2.65,
      ge.cblue,
    ),
      ri(
        i.text,
        n,
        D,
        U[0] + z[0] * 0.03,
        U[1],
        U[2] + z[1] * 0.03,
        z[0],
        z[1],
        1.3,
        null,
        xo([1, 0.92, 0.3], !0),
      ));
  }
  for (let w of o.f.kiosks || []) {
    let _ = i.solid,
      { x: z, z: A, nx: T, nz: E } = w,
      R = -E,
      P = T;
    (Vs(_, z, A, R, P, 0.8, 0.8, l, l + 0.25, ge.red),
      Vs(
        _,
        z,
        A,
        R,
        P,
        0.78,
        0.78,
        l + 0.25,
        l + 2.2,
        [ge.cream, ge.syellow, ge.white][w.k % 3],
      ),
      Vs(
        _,
        z + T * 0.77,
        A + E * 0.77,
        R,
        P,
        0.6,
        0.03,
        l + 1,
        l + 1.9,
        Rt([0.2, 0.24, 0.28], Tt.glass),
      ),
      Vs(
        _,
        z + T * 0.9,
        A + E * 0.9,
        R,
        P,
        0.65,
        0.15,
        l + 0.95,
        l + 1,
        ge.red,
      ),
      Vs(_, z, A, R, P, 0.88, 0.88, l + 2.2, l + 2.35, ge.red),
      PW(_, z, A, 1.15, l + 2.35, 1.15));
    let C = n.word(["CHURROS", "LEMONADE", "GIFTS"][w.k % 3], {
      font: "bold 54px Georgia, serif",
      h: 64,
      color: "#fff",
    });
    ri(
      i.text,
      n,
      C,
      z + T * 0.81,
      l + 2.05,
      A + E * 0.81,
      T,
      E,
      1.2,
      null,
      xo([0.85, 0.1, 0.1], !1),
    );
  }
  for (let [w, _] of o.f.bins || []) {
    let z = i.solid;
    (os(z, w, _, 0.33, l, l + 0.8, 10, ge.barrel, 0.31),
      Ws(
        z,
        w,
        _,
        [
          [0.36, l + 0.8],
          [0.37, l + 0.9],
          [0.34, l + 1],
          [0.2, l + 1.12],
          [0.02, l + 1.16],
        ],
        10,
        ge.binGreen,
      ));
    for (let A of [0.15, 0.62])
      Ws(
        z,
        w,
        _,
        [
          [0.335, l + A],
          [0.335, l + A + 0.05],
        ],
        10,
        ge.binGreen,
      );
  }
  {
    let w = i.solid;
    for (let [_, z] of o.f.lamps)
      (os(w, _, z, 0.16, l, l + 0.5, 8, ge.blue),
        os(w, _, z, 0.07, l + 0.5, l + 3.7, 6, ge.blue),
        os(w, _, z, 0.12, l + 3.7, l + 3.85, 8, ge.blue),
        Ws(
          w,
          _,
          z,
          [
            [0.06, l + 3.85],
            [0.2, l + 3.95],
            [0.25, l + 4.15],
            [0.2, l + 4.35],
            [0.06, l + 4.45],
          ],
          10,
          ge.globe,
        ),
        Ws(
          w,
          _,
          z,
          [
            [0.12, l + 4.44],
            [0.09, l + 4.6],
            [0.01, l + 4.7],
          ],
          8,
          ge.blue,
        ));
    for (let { x: _, z, nx: A, nz: T, barrel: E } of o.f.seats) {
      if (E) {
        (os(w, _, z, 0.5, l, l + 0.7, 10, ge.barrel, 0.45),
          Ws(
            w,
            _,
            z,
            [
              [0.42, l + 0.66],
              [0.55, l + 0.95],
              [0.3, l + 1.25],
              [0.02, l + 1.3],
            ],
            8,
            ge.leaf,
          ));
        for (let C = 0; C < 6; C++) {
          let I = C * 1.05,
            L = 0.32;
          os(
            w,
            _ + Math.cos(I) * L,
            z + Math.sin(I) * L,
            0.07,
            l + 1,
            l + 1.14,
            5,
            Rt(
              [
                [0.85, 0.1, 0.15],
                [0.95, 0.75, 0.1],
                [0.8, 0.3, 0.6],
              ][C % 3],
              Tt.paint,
            ),
          );
        }
        continue;
      }
      let R = -T,
        P = A;
      (Vs(w, _, z, R, P, 0.9, 0.22, l + 0.42, l + 0.48, ge.plankDk),
        Vs(
          w,
          _ - A * 0.22,
          z - T * 0.22,
          R,
          P,
          0.9,
          0.04,
          l + 0.5,
          l + 0.9,
          ge.plankDk,
        ));
      for (let C of [-0.75, 0.75])
        Vs(w, _ + R * C, z + P * C, R, P, 0.04, 0.22, l, l + 0.44, ge.blue);
    }
  }
  let S = [];
  {
    let w = i.solid,
      _ = lP(7);
    for (let z = -31; z <= 31.1; z += 7.75)
      for (let A = -30.8; A <= 30.9; A += 6.16) {
        let T = v[0] + g[0] * z + b[0] * A,
          E = v[2] + g[1] * z + b[1] * A;
        if (o.inDeck(T, E) || Im(o.flat, T, E) < 4.5 || Math.hypot(z, A) > 31)
          continue;
        let R = 2.4 + (_() < 0.3 ? 0.8 : 0),
          P = 1.9;
        if (
          (Vs(w, T, E, g[0], g[1], R, P, 0.25, 0.6, ge.float),
          Vs(a.solid, T, E, g[0], g[1], R, P, 0.25, 0.6, ge.float),
          Vs(
            w,
            T,
            E,
            g[0],
            g[1],
            R + 0.05,
            P + 0.05,
            -0.15,
            0.28,
            ge.floatSide,
            { top: !1 },
          ),
          _() < 0.5)
        ) {
          let I = T + g[0] * (R + 0.6) + b[0] * P,
            L = E + g[1] * (R + 0.6) + b[1] * P;
          (os(w, I, L, 0.16, -3, 2.8, 6, ge.pile), Ou(I, L, 0.2));
        }
        let C = 1 + Math.floor(_() * 5);
        for (let I = 0; I < C; I++) {
          let L = (_() - 0.5) * (R * 2 - 1.6),
            F = (_() - 0.5) * (P * 2 - 0.9),
            O = _() * Math.PI * 2;
          (Cdt(w, T + g[0] * L + b[0] * F, E + g[1] * L + b[1] * F, 0.6, O, _),
            S.push(1));
        }
      }
  }
  {
    let w = i.solid,
      _ = o.axis.o,
      z = lP(11),
      A = [];
    for (let T = 70; T <= 250; T += 4.4)
      for (let E of [24, 46]) {
        let R = _[0] + g[0] * T + b[0] * E,
          P = _[1] + g[1] * T + b[1] * E;
        o.inDeck(R, P) || Im(o.flat, R, P) < 9 || A.push([T, E, R, P]);
      }
    for (let T of [24, 46]) {
      let E = A.filter((I) => I[1] === T);
      if (E.length < 3) continue;
      let R = E[0][0] - 3,
        P = E[E.length - 1][0] + 3,
        C = T - 6.5;
      for (let I = R; I < P; I += 12) {
        let L = _[0] + g[0] * (I + 6) + b[0] * C,
          F = _[1] + g[1] * (I + 6) + b[1] * C;
        (Vs(w, L, F, g[0], g[1], 6, 1, 0.2, 0.55, ge.dock),
          Vs(a.solid, L, F, g[0], g[1], 6, 1, 0.2, 0.55, ge.dock));
      }
      for (let [I] of E) {
        let L = _[0] + g[0] * (I + 2.2) + b[0] * (T - 2.5),
          F = _[1] + g[1] * (I + 2.2) + b[1] * (T - 2.5);
        Vs(w, L, F, b[0], b[1], 3.5, 0.35, 0.2, 0.5, ge.dock);
      }
    }
    for (let [, T, E, R] of A)
      z() < 0.15 || Ldt(w, a.solid, E, R, b[0], b[1], 8 + z() * 5, z, T > 30);
  }
  return { BN: e, BF: s, A: n, rot: M, lions: v, nLions: S.length };
}
