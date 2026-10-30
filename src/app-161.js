// app 161 — math
// Lines 98139-98469 of readable/app.pretty.js (statement-aligned).
function* Zmt(o, t, e = !1) {
  let s =
      !!o.ys &&
      !!t.dropAt &&
      o.some((E) => {
        for (let R = 0; R < E.length; R += 6)
          if (t.dropAt(E[R], E[R + 1]) > 0.05) return !0;
        return !1;
      }),
    n = !!o.ys && !s,
    i = [],
    a = [];
  if (n) {
    let E = 1e9,
      R = -1e9;
    for (let I of o.ys)
      for (let L = 0; L < I.length; L++)
        (I[L] < E && (E = I[L]), I[L] > R && (R = I[L]));
    let P = 0,
      C = 0;
    if (R - E > 2.5)
      for (let I = 0; I < o.length; I++)
        for (let L = 0; L < o.ys[I].length; L++)
          (C++,
            o.ys[I][L] - t.terrainAt(o[I][L * 2], o[I][L * 2 + 1]) > 2.5 &&
              P++);
    if (e && P && P < C * 0.5) {
      let I;
      try {
        I = dc(o);
      } catch {
        return null;
      }
      let L = [];
      for (let F = 0; F < o.length; F++)
        for (let O = 0; O < o.ys[F].length; O++) {
          let B = o[F][O * 2],
            H = o[F][O * 2 + 1],
            N = o.ys[F][O],
            D = t.terrainAt(B, H),
            U = N;
          if (N - D > 2.5) {
            U = D;
            for (let G of t.probe(B, H).all)
              if (Math.abs(G.y - D) < 2.5) {
                U = G.y;
                break;
              }
          }
          L.push(U + t.CURB);
        }
      return { flat: I.flat, ys: L, tris: I.tris };
    }
    if (e || R - E < 0.35 || o.keep) {
      let I;
      try {
        I = dc(o);
      } catch {
        return null;
      }
      let L = [];
      for (let F of o.ys)
        for (let O = 0; O < F.length; O++) L.push(F[O] + t.CURB);
      return { flat: I.flat, ys: L, tris: I.tris };
    }
  }
  let r = null,
    l = 0,
    c = {},
    h = !1,
    f = (E, R, P, C) => {
      if (!h) return E;
      let I = t.terrainAt(P, C);
      if (E - I < 2.5) return E;
      for (let L of t.probe(P, C).all) if (Math.abs(L.y - I) < 2.5) return L.y;
      return I;
    },
    u = (E, R) => {
      if (
        r &&
        (ys(r, E, R, c, Math.max(0, l - 3), Math.min(r.n - 2, l + 3)),
        c.d > c.w &&
          c.d - c.w <= r.sw * 0.5 &&
          c.s > r.s0 + 1 &&
          c.s < r.s1 - 1)
      )
        return ((l = c.k), f(c.y, r, E, R));
      let P = t.probe(E, R);
      if (P.walk && !P.road) {
        r = P.walk.E;
        let I = 0,
          L = r.n - 2,
          F = r.S,
          O = P.walk.s;
        for (; I < L;) {
          let B = (I + L + 1) >> 1;
          F[B] <= O ? (I = B) : (L = B - 1);
        }
        return ((l = I), f(P.walk.y - t.CURB, P.walk.E, E, R));
      }
      if (((r = null), P.road)) return f(P.road.y, P.road.E, E, R);
      if (P.walk) return f(P.walk.y - t.CURB, P.walk.E, E, R);
      let C = t.roadAt(E, R, 12);
      return C ? f(C.y, C.E, E, R) : t.terrainAt(E, R);
    };
  {
    let E = o[0],
      R = E.length / 2,
      P = Math.max(1, Math.floor(R / 24)),
      C = 0,
      I = 0;
    for (let L = 0; L < R; L += P)
      (I++,
        (n ? o.ys[0][L] : u(E[L * 2], E[L * 2 + 1])) -
          t.terrainAt(E[L * 2], E[L * 2 + 1]) >
          2.5 && C++);
    ((h = C < I * 0.5), (r = null));
  }
  for (let E = 0; E < o.length; E++) {
    let R = o[E],
      P = R.length / 2,
      C = [],
      I = [],
      L = (B, H, N, D, U, G, W) => {
        let V = Math.hypot(D - B, U - H);
        if (V > 1.5 && W < 6 && (V > 8 || Math.abs(G - N) > 0.08 || W > 0)) {
          let J = (B + D) / 2,
            X = (H + U) / 2,
            tt = u(J, X);
          if (Math.abs(tt - (N + G) / 2) > 0.04) {
            (L(B, H, N, J, X, tt, W + 1), L(J, X, tt, D, U, G, W + 1));
            return;
          }
        }
        let $ = Math.max(1, Math.ceil(V / 3));
        for (let J = 0; J < $; J++) {
          let X = J / $;
          (C.push(B + (D - B) * X, H + (U - H) * X), I.push(N + (G - N) * X));
        }
      },
      F = (B) =>
        n
          ? f(o.ys[E][B], null, R[B * 2], R[B * 2 + 1])
          : u(R[B * 2], R[B * 2 + 1]),
      O = [];
    for (let B = 0; B < P; B++)
      (O.push(F(B)), (B & 127) === 127 && !n && (yield));
    for (let B = 0; B < P; B++) {
      let H = (B + 1) % P;
      (L(R[B * 2], R[B * 2 + 1], O[B], R[H * 2], R[H * 2 + 1], O[H], 0),
        (B & 31) === 31 && (yield));
    }
    (i.push(C), a.push(I), yield);
  }
  let d;
  try {
    d = dc(i);
  } catch {
    return null;
  }
  yield;
  let p = [],
    m = [],
    g = [];
  {
    let E = 0;
    for (let R of a)
      for (let P = 0; P < R.length; P++, E++)
        (p.push(d.flat[E * 2]),
          m.push(d.flat[E * 2 + 1]),
          g.push(R[P] + t.CURB));
  }
  let b = yield* Xmt(d.tris, p, m, a),
    v = globalThis.SF_WALK_ROUNDS ?? 5,
    x = new Map(),
    y = (E, R) => E * 100003 + R,
    M = 4,
    S = [];
  {
    let E = 0;
    for (let R of a) {
      let P = R.length;
      for (let C = 0; C < P; C++) {
        let I = E + C,
          L = E + ((C + 1) % P),
          F = S.length;
        S.push(I, L);
        let O = Math.floor(Math.min(p[I], p[L]) / M),
          B = Math.floor(Math.max(p[I], p[L]) / M),
          H = Math.floor(Math.min(m[I], m[L]) / M),
          N = Math.floor(Math.max(m[I], m[L]) / M);
        for (let D = O; D <= B; D++)
          for (let U = H; U <= N; U++) {
            let G = y(D, U),
              W = x.get(G);
            (W || x.set(G, (W = [])), W.push(F));
          }
      }
      E += P;
    }
  }
  let w = (E, R) => {
      let P = 1e18,
        C = 0,
        I = Math.floor(E / M),
        L = Math.floor(R / M);
      for (let F = 1; F <= 4 && P > 1e17; F++)
        for (let O = I - F; O <= I + F; O++)
          for (let B = L - F; B <= L + F; B++)
            for (let H of x.get(y(O, B)) || []) {
              let N = S[H],
                D = S[H + 1],
                U = p[D] - p[N],
                G = m[D] - m[N],
                W = U * U + G * G || 1e-9,
                V = Math.max(
                  0,
                  Math.min(1, ((E - p[N]) * U + (R - m[N]) * G) / W),
                ),
                $ = p[N] + U * V - E,
                J = m[N] + G * V - R,
                X = $ * $ + J * J;
              X < P && ((P = X), (C = g[N] + (g[D] - g[N]) * V));
            }
      return C;
    },
    _ = (E, R) => (E < R ? E * 1048576 + R : R * 1048576 + E),
    z = (E, R) => Math.hypot(p[R] - p[E], m[R] - m[E]),
    A = new Set();
  for (let E = 0; E < v; E++) {
    let R = new Map(),
      P = !1,
      C = (F, O, B) => {
        let H = _(F, O);
        if (
          R.has(H) ||
          A.has(H) ||
          z(F, O) <= 1.5 ||
          (!B && z(F, O) < 8 && Math.abs(g[O] - g[F]) < 0.12)
        )
          return;
        let N = (p[F] + p[O]) / 2,
          D = (m[F] + m[O]) / 2,
          U = w(N, D);
        B || Math.abs(U - (g[F] + g[O]) / 2) > 0.05
          ? (p.push(N), m.push(D), g.push(U), R.set(H, p.length - 1), (P = !0))
          : A.add(H);
      },
      I = 0;
    for (let F of b) {
      (++I & 1023) === 0 && (yield);
      let [O, B, H] = F;
      if (
        (C(O, B),
        C(B, H),
        C(H, O),
        F.ok ||
          Math.max(z(O, B), z(B, H), z(H, O)) <= 3 ||
          Math.max(g[O], g[B], g[H]) - Math.min(g[O], g[B], g[H]) < 0.12)
      ) {
        F.ok = !0;
        continue;
      }
      F.ok = !0;
      let N = (p[O] + p[B] + p[H]) / 3,
        D = (m[O] + m[B] + m[H]) / 3;
      if (Math.abs(w(N, D) - (g[O] + g[B] + g[H]) / 3) > 0.05) {
        let U = [
          [O, B],
          [B, H],
          [H, O],
        ].sort((G, W) => z(W[0], W[1]) - z(G[0], G[1]));
        (A.delete(_(U[0][0], U[0][1])), C(U[0][0], U[0][1], !0), (F.ok = !1));
      }
    }
    if (!P) break;
    yield;
    let L = [];
    for (let F of b) {
      let [O, B, H] = F,
        N = R.get(_(O, B)) ?? -1,
        D = R.get(_(B, H)) ?? -1,
        U = R.get(_(H, O)) ?? -1,
        G = (N >= 0) + (D >= 0) + (U >= 0);
      G === 0
        ? L.push(F)
        : G === 3
          ? L.push([O, N, U], [N, B, D], [U, D, H], [N, D, U])
          : G === 1
            ? N >= 0
              ? L.push([O, N, H], [N, B, H])
              : D >= 0
                ? L.push([O, B, D], [O, D, H])
                : L.push([O, B, U], [U, B, H])
            : N < 0
              ? L.push([U, D, H], [O, B, D], [O, D, U])
              : D < 0
                ? L.push([O, N, U], [N, B, H], [N, H, U])
                : L.push([N, B, D], [O, N, D], [O, D, H]);
    }
    b = L;
  }
  let T = [];
  for (let E = 0; E < p.length; E++) T.push(p[E], m[E]);
  return { flat: T, ys: g, tris: b };
}
var hx = {
    r: [0.42, 0.075, 0.06, 0.5],
    y: [0.6, 0.43, 0.08, 0.5],
    w: [0.66, 0.65, 0.61, 0.5],
    g: [0.09, 0.28, 0.12, 0.5],
    b: [0.07, 0.15, 0.42, 0.5],
  },
  Qmt = new Set([
    "fidi",
    "towers",
    "union",
    "jackson",
    "chinatown",
    "tenderloin",
    "soma",
    "northbeach",
    "wharf",
    "mission",
    "castro",
    "haight",
  ]),
  t2t = (o, t) => {
    let e = Math.sin(o * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  };
