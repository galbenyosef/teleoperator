// app 162 — math
// Lines 97903-98233 of readable/app.pretty.js (statement-aligned).
function* Tdt(i, t, e = !1) {
  let s =
      !!i.ys &&
      !!t.dropAt &&
      i.some((E) => {
        for (let A = 0; A < E.length; A += 6)
          if (t.dropAt(E[A], E[A + 1]) > 0.05) return !0;
        return !1;
      }),
    n = !!i.ys && !s,
    o = [],
    a = [];
  if (n) {
    let E = 1e9,
      A = -1e9;
    for (let I of i.ys)
      for (let L = 0; L < I.length; L++)
        (I[L] < E && (E = I[L]), I[L] > A && (A = I[L]));
    let C = 0,
      P = 0;
    if (A - E > 2.5)
      for (let I = 0; I < i.length; I++)
        for (let L = 0; L < i.ys[I].length; L++)
          (P++,
            i.ys[I][L] - t.terrainAt(i[I][L * 2], i[I][L * 2 + 1]) > 2.5 &&
              C++);
    if (e && C && C < P * 0.5) {
      let I;
      try {
        I = Vl(i);
      } catch {
        return null;
      }
      let L = [];
      for (let F = 0; F < i.length; F++)
        for (let N = 0; N < i.ys[F].length; N++) {
          let B = i[F][N * 2],
            H = i[F][N * 2 + 1],
            O = i.ys[F][N],
            D = t.terrainAt(B, H),
            U = O;
          if (O - D > 2.5) {
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
    if (e || A - E < 0.35 || i.keep) {
      let I;
      try {
        I = Vl(i);
      } catch {
        return null;
      }
      let L = [];
      for (let F of i.ys)
        for (let N = 0; N < F.length; N++) L.push(F[N] + t.CURB);
      return { flat: I.flat, ys: L, tris: I.tris };
    }
  }
  let r = null,
    l = 0,
    c = {},
    h = !1,
    f = (E, A, C, P) => {
      if (!h) return E;
      let I = t.terrainAt(C, P);
      if (E - I < 2.5) return E;
      for (let L of t.probe(C, P).all) if (Math.abs(L.y - I) < 2.5) return L.y;
      return I;
    },
    u = (E, A) => {
      if (
        r &&
        (vs(r, E, A, c, Math.max(0, l - 3), Math.min(r.n - 2, l + 3)),
        c.d > c.w &&
          c.d - c.w <= r.sw * 0.5 &&
          c.s > r.s0 + 1 &&
          c.s < r.s1 - 1)
      )
        return ((l = c.k), f(c.y, r, E, A));
      let C = t.probe(E, A);
      if (C.walk && !C.road) {
        r = C.walk.E;
        let I = 0,
          L = r.n - 2,
          F = r.S,
          N = C.walk.s;
        for (; I < L;) {
          let B = (I + L + 1) >> 1;
          F[B] <= N ? (I = B) : (L = B - 1);
        }
        return ((l = I), f(C.walk.y - t.CURB, C.walk.E, E, A));
      }
      if (((r = null), C.road)) return f(C.road.y, C.road.E, E, A);
      if (C.walk) return f(C.walk.y - t.CURB, C.walk.E, E, A);
      let P = t.roadAt(E, A, 12);
      return P ? f(P.y, P.E, E, A) : t.terrainAt(E, A);
    };
  {
    let E = i[0],
      A = E.length / 2,
      C = Math.max(1, Math.floor(A / 24)),
      P = 0,
      I = 0;
    for (let L = 0; L < A; L += C)
      (I++,
        (n ? i.ys[0][L] : u(E[L * 2], E[L * 2 + 1])) -
          t.terrainAt(E[L * 2], E[L * 2 + 1]) >
          2.5 && P++);
    ((h = P < I * 0.5), (r = null));
  }
  for (let E = 0; E < i.length; E++) {
    let A = i[E],
      C = A.length / 2,
      P = [],
      I = [],
      L = (B, H, O, D, U, G, q) => {
        let W = Math.hypot(D - B, U - H);
        if (W > 1.5 && q < 6 && (W > 8 || Math.abs(G - O) > 0.08 || q > 0)) {
          let Y = (B + D) / 2,
            $ = (H + U) / 2,
            st = u(Y, $);
          if (Math.abs(st - (O + G) / 2) > 0.04) {
            (L(B, H, O, Y, $, st, q + 1), L(Y, $, st, D, U, G, q + 1));
            return;
          }
        }
        let V = Math.max(1, Math.ceil(W / 3));
        for (let Y = 0; Y < V; Y++) {
          let $ = Y / V;
          (P.push(B + (D - B) * $, H + (U - H) * $), I.push(O + (G - O) * $));
        }
      },
      F = (B) =>
        n
          ? f(i.ys[E][B], null, A[B * 2], A[B * 2 + 1])
          : u(A[B * 2], A[B * 2 + 1]),
      N = [];
    for (let B = 0; B < C; B++)
      (N.push(F(B)), (B & 127) === 127 && !n && (yield));
    for (let B = 0; B < C; B++) {
      let H = (B + 1) % C;
      (L(A[B * 2], A[B * 2 + 1], N[B], A[H * 2], A[H * 2 + 1], N[H], 0),
        (B & 31) === 31 && (yield));
    }
    (o.push(P), a.push(I), yield);
  }
  let d;
  try {
    d = Vl(o);
  } catch {
    return null;
  }
  yield;
  let p = [],
    m = [],
    g = [];
  {
    let E = 0;
    for (let A of a)
      for (let C = 0; C < A.length; C++, E++)
        (p.push(d.flat[E * 2]),
          m.push(d.flat[E * 2 + 1]),
          g.push(A[C] + t.CURB));
  }
  let b = yield* kdt(d.tris, p, m, a),
    x = globalThis.SF_WALK_ROUNDS ?? 5,
    v = new Map(),
    y = (E, A) => E * 100003 + A,
    M = 4,
    S = [];
  {
    let E = 0;
    for (let A of a) {
      let C = A.length;
      for (let P = 0; P < C; P++) {
        let I = E + P,
          L = E + ((P + 1) % C),
          F = S.length;
        S.push(I, L);
        let N = Math.floor(Math.min(p[I], p[L]) / M),
          B = Math.floor(Math.max(p[I], p[L]) / M),
          H = Math.floor(Math.min(m[I], m[L]) / M),
          O = Math.floor(Math.max(m[I], m[L]) / M);
        for (let D = N; D <= B; D++)
          for (let U = H; U <= O; U++) {
            let G = y(D, U),
              q = v.get(G);
            (q || v.set(G, (q = [])), q.push(F));
          }
      }
      E += C;
    }
  }
  let w = (E, A) => {
      let C = 1e18,
        P = 0,
        I = Math.floor(E / M),
        L = Math.floor(A / M);
      for (let F = 1; F <= 4 && C > 1e17; F++)
        for (let N = I - F; N <= I + F; N++)
          for (let B = L - F; B <= L + F; B++)
            for (let H of v.get(y(N, B)) || []) {
              let O = S[H],
                D = S[H + 1],
                U = p[D] - p[O],
                G = m[D] - m[O],
                q = U * U + G * G || 1e-9,
                W = Math.max(
                  0,
                  Math.min(1, ((E - p[O]) * U + (A - m[O]) * G) / q),
                ),
                V = p[O] + U * W - E,
                Y = m[O] + G * W - A,
                $ = V * V + Y * Y;
              $ < C && ((C = $), (P = g[O] + (g[D] - g[O]) * W));
            }
      return P;
    },
    z = (E, A) => (E < A ? E * 1048576 + A : A * 1048576 + E),
    _ = (E, A) => Math.hypot(p[A] - p[E], m[A] - m[E]),
    R = new Set();
  for (let E = 0; E < x; E++) {
    let A = new Map(),
      C = !1,
      P = (F, N, B) => {
        let H = z(F, N);
        if (
          A.has(H) ||
          R.has(H) ||
          _(F, N) <= 1.5 ||
          (!B && _(F, N) < 8 && Math.abs(g[N] - g[F]) < 0.12)
        )
          return;
        let O = (p[F] + p[N]) / 2,
          D = (m[F] + m[N]) / 2,
          U = w(O, D);
        B || Math.abs(U - (g[F] + g[N]) / 2) > 0.05
          ? (p.push(O), m.push(D), g.push(U), A.set(H, p.length - 1), (C = !0))
          : R.add(H);
      },
      I = 0;
    for (let F of b) {
      (++I & 1023) === 0 && (yield);
      let [N, B, H] = F;
      if (
        (P(N, B),
        P(B, H),
        P(H, N),
        F.ok ||
          Math.max(_(N, B), _(B, H), _(H, N)) <= 3 ||
          Math.max(g[N], g[B], g[H]) - Math.min(g[N], g[B], g[H]) < 0.12)
      ) {
        F.ok = !0;
        continue;
      }
      F.ok = !0;
      let O = (p[N] + p[B] + p[H]) / 3,
        D = (m[N] + m[B] + m[H]) / 3;
      if (Math.abs(w(O, D) - (g[N] + g[B] + g[H]) / 3) > 0.05) {
        let U = [
          [N, B],
          [B, H],
          [H, N],
        ].sort((G, q) => _(q[0], q[1]) - _(G[0], G[1]));
        (R.delete(z(U[0][0], U[0][1])), P(U[0][0], U[0][1], !0), (F.ok = !1));
      }
    }
    if (!C) break;
    yield;
    let L = [];
    for (let F of b) {
      let [N, B, H] = F,
        O = A.get(z(N, B)) ?? -1,
        D = A.get(z(B, H)) ?? -1,
        U = A.get(z(H, N)) ?? -1,
        G = (O >= 0) + (D >= 0) + (U >= 0);
      G === 0
        ? L.push(F)
        : G === 3
          ? L.push([N, O, U], [O, B, D], [U, D, H], [O, D, U])
          : G === 1
            ? O >= 0
              ? L.push([N, O, H], [O, B, H])
              : D >= 0
                ? L.push([N, B, D], [N, D, H])
                : L.push([N, B, U], [U, B, H])
            : O < 0
              ? L.push([U, D, H], [N, B, D], [N, D, U])
              : D < 0
                ? L.push([N, O, U], [O, B, H], [O, H, U])
                : L.push([O, B, D], [N, O, D], [N, D, H]);
    }
    b = L;
  }
  let T = [];
  for (let E = 0; E < p.length; E++) T.push(p[E], m[E]);
  return { flat: T, ys: g, tris: b };
}
var kb = {
    r: [0.42, 0.075, 0.06, 0.5],
    y: [0.6, 0.43, 0.08, 0.5],
    w: [0.66, 0.65, 0.61, 0.5],
    g: [0.09, 0.28, 0.12, 0.5],
    b: [0.07, 0.15, 0.42, 0.5],
  },
  Adt = new Set([
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
  Rdt = (i, t) => {
    let e = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  };
