// app 151 — math
// Lines 94407-94922 of readable/app.pretty.js (statement-aligned).
function xj(i) {
  let t = i.edges.filter(bj);
  if (!t.length) return { edges: 0 };
  for (let T of t) Yd(T, V7);
  let e = 0;
  for (let T of t) {
    let E = T.P,
      A = T.S,
      C = T.n,
      P = 0;
    for (let I = 1; I < C; I++)
      P = Math.max(
        P,
        Math.abs(E[I * 3 + 2] - E[I * 3 - 1]) / Math.max(0.05, A[I] - A[I - 1]),
      );
    if (!(P <= YS + 0.005 || Math.abs(E[C * 3 - 1] - E[2]) > YS * 0.95 * T.L)) {
      e++;
      for (let I = 0; I < 4; I++) {
        for (let L = 1; L < C; L++) {
          let F = YS * (A[L] - A[L - 1]),
            N = E[L * 3 + 2] - E[L * 3 - 1];
          L < C - 1 &&
            Math.abs(N) > F &&
            (E[L * 3 + 2] = E[L * 3 - 1] + Math.sign(N) * F);
        }
        for (let L = C - 2; L >= 0; L--) {
          let F = YS * (A[L + 1] - A[L]),
            N = E[L * 3 + 2] - E[L * 3 + 5];
          L > 0 &&
            Math.abs(N) > F &&
            (E[L * 3 + 2] = E[L * 3 + 5] + Math.sign(N) * F);
        }
      }
      for (let I = 0; I < 2; I++) {
        let L = Float64Array.from({ length: C }, (F, N) => E[N * 3 + 2]);
        for (let F = 1; F < C - 1; F++)
          E[F * 3 + 2] = (L[F - 1] + 2 * L[F] + L[F + 1]) / 4;
      }
    }
  }
  let s = (T) => {
      let E = 1e9,
        A = 1e9,
        C = -1e9,
        P = -1e9;
      for (let I = 0; I < T.n; I++) {
        let L = T.W[I] + 1;
        ((E = Math.min(E, T.P[I * 3] - L)),
          (C = Math.max(C, T.P[I * 3] + L)),
          (A = Math.min(A, T.P[I * 3 + 1] - L)),
          (P = Math.max(P, T.P[I * 3 + 1] + L)));
      }
      return [E, A, C, P];
    },
    n = new Map(t.map((T) => [T, s(T)])),
    o = new Map(
      t.map((T) => {
        let E = n.get(T);
        return [
          T,
          t.filter(
            (A) =>
              A !== T &&
              (() => {
                let C = n.get(A);
                return E[0] < C[2] && E[2] > C[0] && E[1] < C[3] && E[3] > C[1];
              })(),
          ),
        ];
      }),
    ),
    a = new Map(
      t.map((T) => [
        T,
        Float64Array.from({ length: T.n }, (E, A) => T.P[A * 3 + 2]),
      ]),
    ),
    r = new Map(t.map((T) => [T, new Uint8Array(T.n)])),
    l = {},
    c = (T, E, A, C = $7) => {
      A.length = 0;
      let P = T.P[E * 3],
        I = T.P[E * 3 + 1],
        L = T.P[E * 3 + 2],
        F = T.W[E],
        N = Math.min(E, T.n - 2),
        B = T.D[N * 2],
        H = T.D[N * 2 + 1];
      for (let O of o.get(T)) {
        if (
          P < n.get(O)[0] ||
          P > n.get(O)[2] ||
          I < n.get(O)[1] ||
          I > n.get(O)[3] ||
          (vs(O, P, I, l), l.s <= 0.05 || l.s >= O.L - 0.05) ||
          l.d > F + l.w - 0.25 ||
          Math.abs(l.y - L) > C
        )
          continue;
        let D = Math.min(l.k, O.n - 2);
        Math.abs(B * O.D[D * 2] + H * O.D[D * 2 + 1]) < 0.6 ||
          (A.push(l.y), (A.F = A.F || []), (A.F[A.length - 1] = O));
      }
      return A;
    },
    h = new Map(),
    f = 32,
    u = (T, E) => T * 100003 + E;
  for (let T of i.edges)
    if (!(T.inner || T.tunnel || T.tunnelR || T.custom))
      for (let E = 0; E + 1 < T.n; E++) {
        let A = Math.max(T.W[E], T.W[E + 1]) + 1,
          C = Math.min(T.P[E * 3], T.P[E * 3 + 3]) - A,
          P = Math.max(T.P[E * 3], T.P[E * 3 + 3]) + A,
          I = Math.min(T.P[E * 3 + 1], T.P[E * 3 + 4]) - A,
          L = Math.max(T.P[E * 3 + 1], T.P[E * 3 + 4]) + A;
        for (let F = Math.floor(C / f); F <= Math.floor(P / f); F++)
          for (let N = Math.floor(I / f); N <= Math.floor(L / f); N++) {
            let B = u(F, N),
              H = h.get(B);
            (H || h.set(B, (H = new Set())), H.add(T));
          }
      }
  let d = new Map();
  for (let T of i.juns)
    if (!(
      !T.polys.length ||
      T.layered ||
      T.legs.some(([E]) => E.layered) ||
      T.region
    ))
      for (let E = Math.floor(T.bb[0] / f); E <= Math.floor(T.bb[2] / f); E++)
        for (
          let A = Math.floor(T.bb[1] / f);
          A <= Math.floor(T.bb[3] / f);
          A++
        ) {
          let C = u(E, A),
            P = d.get(C);
          (P || d.set(C, (P = [])), P.push(T));
        }
  let p = new Map(),
    m = {},
    g = new Set(t),
    b = (T) => {
      if (T < 0) return null;
      let E = i.juns[T];
      if (E.legs.length !== 2) return null;
      let A = E.legs.find(([C]) => !g.has(C))?.[0];
      return A &&
        !A.elev &&
        !A.inner &&
        !A.tunnel &&
        !A.tunnelR &&
        !A.custom &&
        !A.sunk &&
        A.hwy &&
        A.L >= 40 &&
        !A.region &&
        !A._merged
        ? A
        : null;
    },
    x = (T) => {
      if (T < 0) return !0;
      let E = i.juns[T];
      return b(T)
        ? !1
        : !(E.legs.length === 2 && E.legs.every(([A]) => g.has(A)));
    };
  for (let T of t) {
    let E = new Float64Array(T.n).fill(-1e9),
      A = !1,
      C = x(T.ja),
      P = x(T.jb),
      I = (F) =>
        Math.min(
          C ? 0.06 * T.S[F] : 1e9,
          P ? 0.06 * (T.L - T.S[F]) : 1e9,
          C && P ? jut : Vut,
        ),
      L = new Set();
    for (let F of [T.ja, T.jb])
      if (F >= 0) for (let [N] of i.juns[F].legs) L.add(N);
    for (let F = 0; F < T.n; F++) {
      let N = T.P[F * 3],
        B = T.P[F * 3 + 1],
        H = T.P[F * 3 + 2],
        O = T.W[F],
        D = Math.min(F, T.n - 2),
        U = -T.D[D * 2 + 1],
        G = T.D[D * 2];
      for (let q of [-O, 0, O]) {
        let W = N + U * q,
          V = B + G * q,
          Y = h.get(u(Math.floor(W / f), Math.floor(V / f)));
        if (Y) {
          for (let $ of Y) {
            if (
              $ === T ||
              L.has($) ||
              (vs($, W, V, m), m.d > m.w + 0.3 || m.s < 0.5 || m.s > $.L - 0.5)
            )
              continue;
            let st = H - m.y;
            if (st < 0.3 || st >= Kd) continue;
            if (q !== 0) {
              let j = Math.min(m.k, $.n - 2);
              if (
                Math.abs(
                  T.D[D * 2] * $.D[j * 2] + T.D[D * 2 + 1] * $.D[j * 2 + 1],
                ) > 0.6
              )
                continue;
            }
            let Q = Math.min(Kd + 0.1 - st, I(F));
            Q < 0.02 || ((E[F] = Math.max(E[F], H + Q)), (A = !0));
          }
          for (let $ of d.get(u(Math.floor(W / f), Math.floor(V / f))) || []) {
            if (
              $.id === T.ja ||
              $.id === T.jb ||
              W < $.bb[0] ||
              W > $.bb[2] ||
              V < $.bb[1] ||
              V > $.bb[3] ||
              !$.polys.some((j) => en(j[0].pts, W, V))
            )
              continue;
            let st = H - $.y;
            if (st < 0.3 || st >= Kd) continue;
            let Q = Math.min(Kd + 0.1 - st, I(F));
            Q < 0.02 || ((E[F] = Math.max(E[F], H + Q)), (A = !0));
          }
        }
      }
    }
    {
      let F = new Set();
      for (let N = 0; N < T.n; N += 4) {
        let B = d.get(
          u(Math.floor(T.P[N * 3] / f), Math.floor(T.P[N * 3 + 1] / f)),
        );
        if (B) for (let H of B) F.add(H);
      }
      for (let N of F)
        if (!(N.id === T.ja || N.id === T.jb))
          for (let B of N.rings)
            for (let H = 0; H < B.y.length; H++) {
              if (
                (vs(T, B.pts[H * 2], B.pts[H * 2 + 1], m),
                m.d > m.w + 0.3 || m.s < 0.5 || m.s > T.L - 0.5)
              )
                continue;
              let O = m.y - B.y[H];
              if (!(O < 0.3 || O >= Kd))
                for (let D of [m.k, m.k + 1]) {
                  if (D >= T.n) continue;
                  let U = Math.min(Kd + 0.1 - O, I(D));
                  U < 0.02 ||
                    ((E[D] = Math.max(E[D], T.P[D * 3 + 2] + U)), (A = !0));
                }
            }
    }
    A && p.set(T, E);
  }
  let v = [];
  for (let T = 0; T < 10; T++) {
    let E = new Map(),
      A = 0;
    for (let C of t) {
      let P = new Float64Array(C.n),
        I = r.get(C);
      for (let L = 0; L < C.n; L++) {
        let F = C.P[L * 3 + 2];
        if ((c(C, L, v), !v.length)) {
          P[L] = F;
          continue;
        }
        I[L] = 1;
        let N = F;
        for (let B of v) N += B;
        ((P[L] = N / (v.length + 1)), (A = Math.max(A, Math.abs(P[L] - F))));
      }
      E.set(C, P);
    }
    for (let C of t) {
      let P = E.get(C),
        I = p.get(C),
        L = r.get(C);
      for (let F = 0; F < C.n; F++) {
        let N = P[F];
        (I && N < I[F] && ((A = Math.max(A, I[F] - N)), (N = I[F]), (L[F] = 1)),
          (C.P[F * 3 + 2] = N));
      }
    }
    if (A < 0.002) break;
  }
  let y = (T) =>
    (T.cls === "motorway" ? 2e6 : 0) + (T.W[0] + T.W[T.n - 1]) * 1e4 - T.id;
  for (let T of t) {
    let E = r.get(T);
    for (let A = 0; A < T.n; A++)
      E[A] &&
        (c(T, A, v),
        v.F && v.some((C, P) => y(v.F[P]) > y(T)) && (T.P[A * 3 + 2] -= 0.018));
  }
  let M = new Map(t.map((T) => [T, new Map()])),
    S = (T) => {
      let E = a.get(T),
        A = r.get(T),
        C = M.get(T),
        P = T.S,
        I = T.n,
        L = new Float64Array(I),
        F = new Uint8Array(I);
      for (let D = 0; D < I; D++)
        A[D] && ((L[D] = T.P[D * 3 + 2] - E[D]), (F[D] = 1));
      for (let [D, U] of C) F[D] || ((L[D] = U), (F[D] = 1));
      if (!F.some((D) => D)) return;
      let N = (D) => Math.min(120, Math.max(15, Math.abs(D) / 0.035)),
        B = -1,
        H = new Int32Array(I).fill(-1),
        O = new Int32Array(I).fill(-1);
      for (let D = 0; D < I; D++) (F[D] && (B = D), (H[D] = B));
      B = -1;
      for (let D = I - 1; D >= 0; D--) (F[D] && (B = D), (O[D] = B));
      for (let D = 0; D < I; D++) {
        if (F[D]) continue;
        let U = H[D],
          G = O[D],
          q = 0;
        (U >= 0 && G >= 0 && P[G] - P[U] < N(L[U]) + N(L[G])
          ? (q = L[U] + (L[G] - L[U]) * fu((P[D] - P[U]) / (P[G] - P[U])))
          : (U >= 0 && (q += L[U] * (1 - fu((P[D] - P[U]) / N(L[U])))),
            G >= 0 && (q += L[G] * (1 - fu((P[G] - P[D]) / N(L[G]))))),
          (T.P[D * 3 + 2] = E[D] + q));
      }
      for (let D = 0; D < I; D++) F[D] && (T.P[D * 3 + 2] = E[D] + L[D]);
    },
    w = (T) =>
      T >= 0 && !b(T) && i.juns[T].legs.some(([E]) => !g.has(E) && !E.inner);
  for (let T of t) {
    let E = p.has(T);
    ((w(T.ja) || (E && x(T.ja))) && M.get(T).set(0, 0),
      (w(T.jb) || (E && x(T.jb))) && M.get(T).set(T.n - 1, 0));
  }
  for (let T of t) S(T);
  let z = new Set(t);
  for (let T = 0; T < 3; T++) {
    let E = !1;
    for (let A of i.juns) {
      if (A.legs.length < 2 || !A.legs.every(([L]) => z.has(L))) continue;
      let C = A.legs.map(([L, F]) => [L, F === "a" ? 0 : L.n - 1]),
        P = C.map(([L, F]) => L.P[F * 3 + 2]);
      if (
        Math.max(...P) - Math.min(...P) < 0.005 ||
        (A.legs.length > 2 && Math.max(...P) - Math.min(...P) > 0.5)
      )
        continue;
      E = !0;
      let I = P.reduce((L, F) => L + F, 0) / P.length;
      for (let [L, F] of C) M.get(L).set(F, I - a.get(L)[F]);
    }
    if (!E) break;
    for (let A of t) M.get(A).size && S(A);
  }
  let _ = (T, E) => {
    let A = {},
      C = E === "a" ? 0 : T.L,
      P = E === "a" ? Math.min(T.L, 3) : Math.max(0, T.L - 3);
    Ot(T, C, A);
    let I = A.y;
    return (Ot(T, P, A), (A.y - I) / Math.max(0.1, Math.abs(P - C)));
  };
  for (let T of i.juns) {
    if (T.legs.length !== 2 || T.polys.length) continue;
    let [[E, A], [C, P]] = T.legs;
    if (!z.has(E) && !z.has(C)) continue;
    let I = _(E, A),
      L = _(C, P),
      F = z.has(E) && z.has(C) ? (I - L) / 2 : z.has(E) ? -L : I;
    if (!(Math.abs(I - F) < 0.004 && Math.abs(-L - F) < 0.004))
      for (let [N, B, H] of [
        [E, A, F],
        [C, P, -F],
      ]) {
        if (!z.has(N)) continue;
        let O = Math.min(25, N.L / 3),
          D = N.n,
          U = N.S,
          G = {},
          q = B === "a" ? O : N.L - O;
        Ot(N, q, G);
        let W = G.y,
          V = _(N, B),
          Y = B === "a" ? 0 : D - 1,
          $ = N.P[Y * 3 + 2],
          st = {};
        Ot(N, B === "a" ? Math.min(N.L, q + 2) : Math.max(0, q - 2), st);
        let Q = (st.y - W) / 2;
        for (let j = 0; j < D; j++) {
          let X = B === "a" ? U[j] : N.L - U[j];
          if (X >= O) continue;
          let K = X / O,
            nt = 2 * K ** 3 - 3 * K ** 2 + 1,
            Z = K ** 3 - 2 * K ** 2 + K,
            et = -2 * K ** 3 + 3 * K ** 2,
            tt = K ** 3 - K ** 2;
          N.P[j * 3 + 2] = nt * $ + Z * O * H + et * W + tt * O * Q;
        }
      }
  }
  {
    let T = new Map(
        t.map((A) => [
          A,
          Float64Array.from({ length: A.n }, (C, P) => A.P[P * 3 + 2]),
        ]),
      ),
      E = new Map(t.map((A) => [A, new Uint8Array(A.n)]));
    for (let A = 0; A < 10; A++) {
      let C = new Map(),
        P = 0;
      for (let I of t) {
        let L = new Float64Array(I.n),
          F = E.get(I);
        for (let N = 0; N < I.n; N++) {
          let B = I.P[N * 3 + 2];
          if (
            ((L[N] = B),
            N === 0 || N === I.n - 1 || (c(I, N, v, 0.6), !v.length))
          )
            continue;
          F[N] = 1;
          let H = B;
          for (let O of v) H += O;
          ((L[N] = H / (v.length + 1)), (P = Math.max(P, Math.abs(L[N] - B))));
        }
        C.set(I, L);
      }
      for (let I of t) {
        let L = C.get(I);
        for (let F = 0; F < I.n; F++) I.P[F * 3 + 2] = L[F];
      }
      if (P < 0.001) break;
    }
    for (let A of t) {
      let C = E.get(A);
      for (let P = 0; P < A.n; P++)
        C[P] &&
          (c(A, P, v, 0.6),
          v.F &&
            v.some((I, L) => y(v.F[L]) > y(A)) &&
            (A.P[P * 3 + 2] -= 0.018));
    }
    for (let A of t) {
      let C = E.get(A);
      if (!C.some((U) => U)) continue;
      let P = T.get(A),
        I = A.S,
        L = A.n,
        F = new Float64Array(L),
        N = new Uint8Array(L);
      for (let U = 0; U < L; U++)
        C[U] && ((F[U] = A.P[U * 3 + 2] - P[U]), (N[U] = 1));
      ((N[0] = N[L - 1] = 1), (F[0] = F[L - 1] = 0));
      let B = (U) => Math.min(120, Math.max(15, Math.abs(U) / 0.035)),
        H = -1,
        O = new Int32Array(L),
        D = new Int32Array(L);
      for (let U = 0; U < L; U++) (N[U] && (H = U), (O[U] = H));
      H = -1;
      for (let U = L - 1; U >= 0; U--) (N[U] && (H = U), (D[U] = H));
      for (let U = 0; U < L; U++) {
        if (N[U]) continue;
        let G = O[U],
          q = D[U],
          W;
        (I[q] - I[G] < B(F[G]) + B(F[q])
          ? (W = F[G] + (F[q] - F[G]) * fu((I[U] - I[G]) / (I[q] - I[G])))
          : (W =
              F[G] * (1 - fu((I[U] - I[G]) / B(F[G]))) +
              F[q] * (1 - fu((I[q] - I[U]) / B(F[q])))),
          (A.P[U * 3 + 2] = P[U] + W));
      }
    }
  }
  let R = 0;
  for (let T of t) {
    let E = a.get(T);
    for (let A = 0; A < T.n; A++)
      R = Math.max(R, Math.abs(T.P[A * 3 + 2] - E[A]));
  }
  for (let T of t)
    for (let [E, A] of [
      [T.ja, 0],
      [T.jb, T.n - 1],
    ]) {
      let C = b(E);
      if (!C) continue;
      let P = C.ja === E,
        I = T.P[A * 3 + 2] - C.P[(P ? 0 : C.n - 1) * 3 + 2];
      if (Math.abs(I) < 0.005) continue;
      Yd(C, V7);
      let L = C.ja === E,
        F = Math.min(C.L * 0.8, Math.max(20, Math.abs(I) / 0.04));
      for (let N = 0; N < C.n; N++) {
        let B = L ? C.S[N] : C.L - C.S[N];
        B >= F || (C.P[N * 3 + 2] += I * (1 - fu(B / F)));
      }
      (i.embank ||= []).push(C);
    }
  for (let T of t) $ut(T);
  return { edges: t.length, maxD: R, steep: e };
}
