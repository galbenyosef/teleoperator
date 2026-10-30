// app 150 — math
// Lines 94677-95192 of readable/app.pretty.js (statement-aligned).
function y$(o) {
  let t = o.edges.filter(v$);
  if (!t.length) return { edges: 0 };
  for (let T of t) Tp(T, SC);
  let e = 0;
  for (let T of t) {
    let E = T.P,
      R = T.S,
      P = T.n,
      C = 0;
    for (let I = 1; I < P; I++)
      C = Math.max(
        C,
        Math.abs(E[I * 3 + 2] - E[I * 3 - 1]) / Math.max(0.05, R[I] - R[I - 1]),
      );
    if (!(C <= Yk + 0.005 || Math.abs(E[P * 3 - 1] - E[2]) > Yk * 0.95 * T.L)) {
      e++;
      for (let I = 0; I < 4; I++) {
        for (let L = 1; L < P; L++) {
          let F = Yk * (R[L] - R[L - 1]),
            O = E[L * 3 + 2] - E[L * 3 - 1];
          L < P - 1 &&
            Math.abs(O) > F &&
            (E[L * 3 + 2] = E[L * 3 - 1] + Math.sign(O) * F);
        }
        for (let L = P - 2; L >= 0; L--) {
          let F = Yk * (R[L + 1] - R[L]),
            O = E[L * 3 + 2] - E[L * 3 + 5];
          L > 0 &&
            Math.abs(O) > F &&
            (E[L * 3 + 2] = E[L * 3 + 5] + Math.sign(O) * F);
        }
      }
      for (let I = 0; I < 2; I++) {
        let L = Float64Array.from({ length: P }, (F, O) => E[O * 3 + 2]);
        for (let F = 1; F < P - 1; F++)
          E[F * 3 + 2] = (L[F - 1] + 2 * L[F] + L[F + 1]) / 4;
      }
    }
  }
  let s = (T) => {
      let E = 1e9,
        R = 1e9,
        P = -1e9,
        C = -1e9;
      for (let I = 0; I < T.n; I++) {
        let L = T.W[I] + 1;
        ((E = Math.min(E, T.P[I * 3] - L)),
          (P = Math.max(P, T.P[I * 3] + L)),
          (R = Math.min(R, T.P[I * 3 + 1] - L)),
          (C = Math.max(C, T.P[I * 3 + 1] + L)));
      }
      return [E, R, P, C];
    },
    n = new Map(t.map((T) => [T, s(T)])),
    i = new Map(
      t.map((T) => {
        let E = n.get(T);
        return [
          T,
          t.filter(
            (R) =>
              R !== T &&
              (() => {
                let P = n.get(R);
                return E[0] < P[2] && E[2] > P[0] && E[1] < P[3] && E[3] > P[1];
              })(),
          ),
        ];
      }),
    ),
    a = new Map(
      t.map((T) => [
        T,
        Float64Array.from({ length: T.n }, (E, R) => T.P[R * 3 + 2]),
      ]),
    ),
    r = new Map(t.map((T) => [T, new Uint8Array(T.n)])),
    l = {},
    c = (T, E, R, P = kC) => {
      R.length = 0;
      let C = T.P[E * 3],
        I = T.P[E * 3 + 1],
        L = T.P[E * 3 + 2],
        F = T.W[E],
        O = Math.min(E, T.n - 2),
        B = T.D[O * 2],
        H = T.D[O * 2 + 1];
      for (let N of i.get(T)) {
        if (
          C < n.get(N)[0] ||
          C > n.get(N)[2] ||
          I < n.get(N)[1] ||
          I > n.get(N)[3] ||
          (ys(N, C, I, l), l.s <= 0.05 || l.s >= N.L - 0.05) ||
          l.d > F + l.w - 0.25 ||
          Math.abs(l.y - L) > P
        )
          continue;
        let D = Math.min(l.k, N.n - 2);
        Math.abs(B * N.D[D * 2] + H * N.D[D * 2 + 1]) < 0.6 ||
          (R.push(l.y), (R.F = R.F || []), (R.F[R.length - 1] = N));
      }
      return R;
    },
    h = new Map(),
    f = 32,
    u = (T, E) => T * 100003 + E;
  for (let T of o.edges)
    if (!(T.inner || T.tunnel || T.tunnelR || T.custom))
      for (let E = 0; E + 1 < T.n; E++) {
        let R = Math.max(T.W[E], T.W[E + 1]) + 1,
          P = Math.min(T.P[E * 3], T.P[E * 3 + 3]) - R,
          C = Math.max(T.P[E * 3], T.P[E * 3 + 3]) + R,
          I = Math.min(T.P[E * 3 + 1], T.P[E * 3 + 4]) - R,
          L = Math.max(T.P[E * 3 + 1], T.P[E * 3 + 4]) + R;
        for (let F = Math.floor(P / f); F <= Math.floor(C / f); F++)
          for (let O = Math.floor(I / f); O <= Math.floor(L / f); O++) {
            let B = u(F, O),
              H = h.get(B);
            (H || h.set(B, (H = new Set())), H.add(T));
          }
      }
  let d = new Map();
  for (let T of o.juns)
    if (!(
      !T.polys.length ||
      T.layered ||
      T.legs.some(([E]) => E.layered) ||
      T.region
    ))
      for (let E = Math.floor(T.bb[0] / f); E <= Math.floor(T.bb[2] / f); E++)
        for (
          let R = Math.floor(T.bb[1] / f);
          R <= Math.floor(T.bb[3] / f);
          R++
        ) {
          let P = u(E, R),
            C = d.get(P);
          (C || d.set(P, (C = [])), C.push(T));
        }
  let p = new Map(),
    m = {},
    g = new Set(t),
    b = (T) => {
      if (T < 0) return null;
      let E = o.juns[T];
      if (E.legs.length !== 2) return null;
      let R = E.legs.find(([P]) => !g.has(P))?.[0];
      return R &&
        !R.elev &&
        !R.inner &&
        !R.tunnel &&
        !R.tunnelR &&
        !R.custom &&
        !R.sunk &&
        R.hwy &&
        R.L >= 40 &&
        !R.region &&
        !R._merged
        ? R
        : null;
    },
    v = (T) => {
      if (T < 0) return !0;
      let E = o.juns[T];
      return b(T)
        ? !1
        : !(E.legs.length === 2 && E.legs.every(([R]) => g.has(R)));
    };
  for (let T of t) {
    let E = new Float64Array(T.n).fill(-1e9),
      R = !1,
      P = v(T.ja),
      C = v(T.jb),
      I = (F) =>
        Math.min(
          P ? 0.06 * T.S[F] : 1e9,
          C ? 0.06 * (T.L - T.S[F]) : 1e9,
          P && C ? dmt : pmt,
        ),
      L = new Set();
    for (let F of [T.ja, T.jb])
      if (F >= 0) for (let [O] of o.juns[F].legs) L.add(O);
    for (let F = 0; F < T.n; F++) {
      let O = T.P[F * 3],
        B = T.P[F * 3 + 1],
        H = T.P[F * 3 + 2],
        N = T.W[F],
        D = Math.min(F, T.n - 2),
        U = -T.D[D * 2 + 1],
        G = T.D[D * 2];
      for (let W of [-N, 0, N]) {
        let V = O + U * W,
          $ = B + G * W,
          J = h.get(u(Math.floor(V / f), Math.floor($ / f)));
        if (J) {
          for (let X of J) {
            if (
              X === T ||
              L.has(X) ||
              (ys(X, V, $, m), m.d > m.w + 0.3 || m.s < 0.5 || m.s > X.L - 0.5)
            )
              continue;
            let tt = H - m.y;
            if (tt < 0.3 || tt >= Ep) continue;
            if (W !== 0) {
              let q = Math.min(m.k, X.n - 2);
              if (
                Math.abs(
                  T.D[D * 2] * X.D[q * 2] + T.D[D * 2 + 1] * X.D[q * 2 + 1],
                ) > 0.6
              )
                continue;
            }
            let Z = Math.min(Ep + 0.1 - tt, I(F));
            Z < 0.02 || ((E[F] = Math.max(E[F], H + Z)), (R = !0));
          }
          for (let X of d.get(u(Math.floor(V / f), Math.floor($ / f))) || []) {
            if (
              X.id === T.ja ||
              X.id === T.jb ||
              V < X.bb[0] ||
              V > X.bb[2] ||
              $ < X.bb[1] ||
              $ > X.bb[3] ||
              !X.polys.some((q) => rn(q[0].pts, V, $))
            )
              continue;
            let tt = H - X.y;
            if (tt < 0.3 || tt >= Ep) continue;
            let Z = Math.min(Ep + 0.1 - tt, I(F));
            Z < 0.02 || ((E[F] = Math.max(E[F], H + Z)), (R = !0));
          }
        }
      }
    }
    {
      let F = new Set();
      for (let O = 0; O < T.n; O += 4) {
        let B = d.get(
          u(Math.floor(T.P[O * 3] / f), Math.floor(T.P[O * 3 + 1] / f)),
        );
        if (B) for (let H of B) F.add(H);
      }
      for (let O of F)
        if (!(O.id === T.ja || O.id === T.jb))
          for (let B of O.rings)
            for (let H = 0; H < B.y.length; H++) {
              if (
                (ys(T, B.pts[H * 2], B.pts[H * 2 + 1], m),
                m.d > m.w + 0.3 || m.s < 0.5 || m.s > T.L - 0.5)
              )
                continue;
              let N = m.y - B.y[H];
              if (!(N < 0.3 || N >= Ep))
                for (let D of [m.k, m.k + 1]) {
                  if (D >= T.n) continue;
                  let U = Math.min(Ep + 0.1 - N, I(D));
                  U < 0.02 ||
                    ((E[D] = Math.max(E[D], T.P[D * 3 + 2] + U)), (R = !0));
                }
            }
    }
    R && p.set(T, E);
  }
  let x = [];
  for (let T = 0; T < 10; T++) {
    let E = new Map(),
      R = 0;
    for (let P of t) {
      let C = new Float64Array(P.n),
        I = r.get(P);
      for (let L = 0; L < P.n; L++) {
        let F = P.P[L * 3 + 2];
        if ((c(P, L, x), !x.length)) {
          C[L] = F;
          continue;
        }
        I[L] = 1;
        let O = F;
        for (let B of x) O += B;
        ((C[L] = O / (x.length + 1)), (R = Math.max(R, Math.abs(C[L] - F))));
      }
      E.set(P, C);
    }
    for (let P of t) {
      let C = E.get(P),
        I = p.get(P),
        L = r.get(P);
      for (let F = 0; F < P.n; F++) {
        let O = C[F];
        (I && O < I[F] && ((R = Math.max(R, I[F] - O)), (O = I[F]), (L[F] = 1)),
          (P.P[F * 3 + 2] = O));
      }
    }
    if (R < 0.002) break;
  }
  let y = (T) =>
    (T.cls === "motorway" ? 2e6 : 0) + (T.W[0] + T.W[T.n - 1]) * 1e4 - T.id;
  for (let T of t) {
    let E = r.get(T);
    for (let R = 0; R < T.n; R++)
      E[R] &&
        (c(T, R, x),
        x.F && x.some((P, C) => y(x.F[C]) > y(T)) && (T.P[R * 3 + 2] -= 0.018));
  }
  let M = new Map(t.map((T) => [T, new Map()])),
    S = (T) => {
      let E = a.get(T),
        R = r.get(T),
        P = M.get(T),
        C = T.S,
        I = T.n,
        L = new Float64Array(I),
        F = new Uint8Array(I);
      for (let D = 0; D < I; D++)
        R[D] && ((L[D] = T.P[D * 3 + 2] - E[D]), (F[D] = 1));
      for (let [D, U] of P) F[D] || ((L[D] = U), (F[D] = 1));
      if (!F.some((D) => D)) return;
      let O = (D) => Math.min(120, Math.max(15, Math.abs(D) / 0.035)),
        B = -1,
        H = new Int32Array(I).fill(-1),
        N = new Int32Array(I).fill(-1);
      for (let D = 0; D < I; D++) (F[D] && (B = D), (H[D] = B));
      B = -1;
      for (let D = I - 1; D >= 0; D--) (F[D] && (B = D), (N[D] = B));
      for (let D = 0; D < I; D++) {
        if (F[D]) continue;
        let U = H[D],
          G = N[D],
          W = 0;
        (U >= 0 && G >= 0 && C[G] - C[U] < O(L[U]) + O(L[G])
          ? (W = L[U] + (L[G] - L[U]) * $u((C[D] - C[U]) / (C[G] - C[U])))
          : (U >= 0 && (W += L[U] * (1 - $u((C[D] - C[U]) / O(L[U])))),
            G >= 0 && (W += L[G] * (1 - $u((C[G] - C[D]) / O(L[G]))))),
          (T.P[D * 3 + 2] = E[D] + W));
      }
      for (let D = 0; D < I; D++) F[D] && (T.P[D * 3 + 2] = E[D] + L[D]);
    },
    w = (T) =>
      T >= 0 && !b(T) && o.juns[T].legs.some(([E]) => !g.has(E) && !E.inner);
  for (let T of t) {
    let E = p.has(T);
    ((w(T.ja) || (E && v(T.ja))) && M.get(T).set(0, 0),
      (w(T.jb) || (E && v(T.jb))) && M.get(T).set(T.n - 1, 0));
  }
  for (let T of t) S(T);
  let _ = new Set(t);
  for (let T = 0; T < 3; T++) {
    let E = !1;
    for (let R of o.juns) {
      if (R.legs.length < 2 || !R.legs.every(([L]) => _.has(L))) continue;
      let P = R.legs.map(([L, F]) => [L, F === "a" ? 0 : L.n - 1]),
        C = P.map(([L, F]) => L.P[F * 3 + 2]);
      if (
        Math.max(...C) - Math.min(...C) < 0.005 ||
        (R.legs.length > 2 && Math.max(...C) - Math.min(...C) > 0.5)
      )
        continue;
      E = !0;
      let I = C.reduce((L, F) => L + F, 0) / C.length;
      for (let [L, F] of P) M.get(L).set(F, I - a.get(L)[F]);
    }
    if (!E) break;
    for (let R of t) M.get(R).size && S(R);
  }
  let z = (T, E) => {
    let R = {},
      P = E === "a" ? 0 : T.L,
      C = E === "a" ? Math.min(T.L, 3) : Math.max(0, T.L - 3);
    Ot(T, P, R);
    let I = R.y;
    return (Ot(T, C, R), (R.y - I) / Math.max(0.1, Math.abs(C - P)));
  };
  for (let T of o.juns) {
    if (T.legs.length !== 2 || T.polys.length) continue;
    let [[E, R], [P, C]] = T.legs;
    if (!_.has(E) && !_.has(P)) continue;
    let I = z(E, R),
      L = z(P, C),
      F = _.has(E) && _.has(P) ? (I - L) / 2 : _.has(E) ? -L : I;
    if (!(Math.abs(I - F) < 0.004 && Math.abs(-L - F) < 0.004))
      for (let [O, B, H] of [
        [E, R, F],
        [P, C, -F],
      ]) {
        if (!_.has(O)) continue;
        let N = Math.min(25, O.L / 3),
          D = O.n,
          U = O.S,
          G = {},
          W = B === "a" ? N : O.L - N;
        Ot(O, W, G);
        let V = G.y,
          $ = z(O, B),
          J = B === "a" ? 0 : D - 1,
          X = O.P[J * 3 + 2],
          tt = {};
        Ot(O, B === "a" ? Math.min(O.L, W + 2) : Math.max(0, W - 2), tt);
        let Z = (tt.y - V) / 2;
        for (let q = 0; q < D; q++) {
          let j = B === "a" ? U[q] : O.L - U[q];
          if (j >= N) continue;
          let K = j / N,
            nt = 2 * K ** 3 - 3 * K ** 2 + 1,
            Q = K ** 3 - 2 * K ** 2 + K,
            et = -2 * K ** 3 + 3 * K ** 2,
            st = K ** 3 - K ** 2;
          O.P[q * 3 + 2] = nt * X + Q * N * H + et * V + st * N * Z;
        }
      }
  }
  {
    let T = new Map(
        t.map((R) => [
          R,
          Float64Array.from({ length: R.n }, (P, C) => R.P[C * 3 + 2]),
        ]),
      ),
      E = new Map(t.map((R) => [R, new Uint8Array(R.n)]));
    for (let R = 0; R < 10; R++) {
      let P = new Map(),
        C = 0;
      for (let I of t) {
        let L = new Float64Array(I.n),
          F = E.get(I);
        for (let O = 0; O < I.n; O++) {
          let B = I.P[O * 3 + 2];
          if (
            ((L[O] = B),
            O === 0 || O === I.n - 1 || (c(I, O, x, 0.6), !x.length))
          )
            continue;
          F[O] = 1;
          let H = B;
          for (let N of x) H += N;
          ((L[O] = H / (x.length + 1)), (C = Math.max(C, Math.abs(L[O] - B))));
        }
        P.set(I, L);
      }
      for (let I of t) {
        let L = P.get(I);
        for (let F = 0; F < I.n; F++) I.P[F * 3 + 2] = L[F];
      }
      if (C < 0.001) break;
    }
    for (let R of t) {
      let P = E.get(R);
      for (let C = 0; C < R.n; C++)
        P[C] &&
          (c(R, C, x, 0.6),
          x.F &&
            x.some((I, L) => y(x.F[L]) > y(R)) &&
            (R.P[C * 3 + 2] -= 0.018));
    }
    for (let R of t) {
      let P = E.get(R);
      if (!P.some((U) => U)) continue;
      let C = T.get(R),
        I = R.S,
        L = R.n,
        F = new Float64Array(L),
        O = new Uint8Array(L);
      for (let U = 0; U < L; U++)
        P[U] && ((F[U] = R.P[U * 3 + 2] - C[U]), (O[U] = 1));
      ((O[0] = O[L - 1] = 1), (F[0] = F[L - 1] = 0));
      let B = (U) => Math.min(120, Math.max(15, Math.abs(U) / 0.035)),
        H = -1,
        N = new Int32Array(L),
        D = new Int32Array(L);
      for (let U = 0; U < L; U++) (O[U] && (H = U), (N[U] = H));
      H = -1;
      for (let U = L - 1; U >= 0; U--) (O[U] && (H = U), (D[U] = H));
      for (let U = 0; U < L; U++) {
        if (O[U]) continue;
        let G = N[U],
          W = D[U],
          V;
        (I[W] - I[G] < B(F[G]) + B(F[W])
          ? (V = F[G] + (F[W] - F[G]) * $u((I[U] - I[G]) / (I[W] - I[G])))
          : (V =
              F[G] * (1 - $u((I[U] - I[G]) / B(F[G]))) +
              F[W] * (1 - $u((I[W] - I[U]) / B(F[W])))),
          (R.P[U * 3 + 2] = C[U] + V));
      }
    }
  }
  let A = 0;
  for (let T of t) {
    let E = a.get(T);
    for (let R = 0; R < T.n; R++)
      A = Math.max(A, Math.abs(T.P[R * 3 + 2] - E[R]));
  }
  for (let T of t)
    for (let [E, R] of [
      [T.ja, 0],
      [T.jb, T.n - 1],
    ]) {
      let P = b(E);
      if (!P) continue;
      let C = P.ja === E,
        I = T.P[R * 3 + 2] - P.P[(C ? 0 : P.n - 1) * 3 + 2];
      if (Math.abs(I) < 0.005) continue;
      Tp(P, SC);
      let L = P.ja === E,
        F = Math.min(P.L * 0.8, Math.max(20, Math.abs(I) / 0.04));
      for (let O = 0; O < P.n; O++) {
        let B = L ? P.S[O] : P.L - P.S[O];
        B >= F || (P.P[O * 3 + 2] += I * (1 - $u(B / F)));
      }
      (o.embank ||= []).push(P);
    }
  for (let T of t) mmt(T);
  return { edges: t.length, maxD: A, steep: e };
}
