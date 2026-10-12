// app 280 — math
// Lines 137647-137948 of readable/app.pretty.js (statement-aligned).
function* oJ(i, t, e, s = null) {
  let n = i.idx.get(t + "," + e),
    o = i.trees.get(t + "," + e),
    a = dp,
    r = t * Mi,
    l = e * Mi,
    c = new Float32Array(a * a),
    h = new Float32Array(a * a),
    f = new Uint8Array(a * a),
    u = new Uint8Array(a * a).fill(255),
    d = (E, A, C, P, I) => {
      A <= 0 ||
        (A >= 1
          ? ((c[E] = C), (h[E] = P))
          : ((c[E] += (C - c[E]) * A), (h[E] += (P - h[E]) * A)),
        A > 0.5 && (f[E] = I));
    },
    p = !!(n || o || i.beds?.get(t + "," + e));
  if (s) {
    let E = Mi / s.step + 1,
      A = Math.round((r - s.x0) / s.step),
      C = Math.round((l - s.z0) / s.step),
      P = new Float32Array(E * E);
    for (let L = 0; L < E; L++)
      for (let F = 0; F < E; F++) {
        let N = Math.min(s.nx - 1, Math.max(0, A + F)),
          B = Math.min(s.nz - 1, Math.max(0, C + L)),
          H = s.x0 + N * s.step,
          O = s.z0 + B * s.step;
        P[L * E + F] = iI(s, N, B, H, O)[3] > 0.9 ? 1 : 0;
      }
    let I = s.step * bl;
    for (let L = 0; L < a; L++) {
      (L & 63) === 63 && (yield);
      let F = (L + 0.5) / I,
        N = Math.min(E - 2, Math.floor(F)),
        B = F - N;
      for (let H = 0; H < a; H++) {
        let O = (H + 0.5) / I,
          D = Math.min(E - 2, Math.floor(O)),
          U = O - D,
          G =
            (P[N * E + D] * (1 - U) + P[N * E + D + 1] * U) * (1 - B) +
            (P[(N + 1) * E + D] * (1 - U) + P[(N + 1) * E + D + 1] * U) * B;
        G > 0.3 &&
          (d(L * a + H, Math.min(1, (G - 0.3) / 0.4), 0, 1, 0), (p = !0));
      }
    }
  }
  if (!p) return null;
  let m = (E) => (E - r) * bl,
    g = (E) => (E - l) * bl,
    b = new Float32Array(a),
    x = 4,
    v = (E, A, C, P) => {
      let I = 1e9,
        L = -1e9;
      for (let H of E)
        for (let O = 1; O < H.length; O += 2) {
          let D = g(H[O]);
          ((I = Math.min(I, D)), (L = Math.max(L, D)));
        }
      let F = Math.max(0, Math.floor(I)),
        N = Math.min(a - 1, Math.ceil(L)),
        B = [];
      for (let H = F; H <= N; H++) {
        b.fill(0);
        let O = a,
          D = -1;
        for (let U = 0; U < x; U++) {
          let G = l + (H + (U + 0.5) / x) / bl;
          B.length = 0;
          for (let q of E)
            for (let W = 0, V = q.length - 2; W < q.length; V = W, W += 2) {
              let Y = q[W + 1],
                $ = q[V + 1];
              Y > G != $ > G &&
                B.push(m(q[V] + ((G - $) * (q[W] - q[V])) / (Y - $)));
            }
          B.sort((q, W) => q - W);
          for (let q = 0; q + 1 < B.length; q += 2) {
            let W = Math.max(0, B[q]),
              V = Math.min(a, B[q + 1]);
            if (V <= W) continue;
            let Y = Math.floor(W),
              $ = Math.min(a - 1, Math.floor(V - 1e-6));
            ((O = Math.min(O, Y)), (D = Math.max(D, $)));
            for (let st = Y; st <= $; st++)
              b[st] += (Math.min(st + 1, V) - Math.max(st, W)) / x;
          }
        }
        for (let U = O; U <= D; U++) d(H * a + U, Math.min(1, b[U]), A, C, P);
      }
    },
    y = new Float32Array(a * a),
    M = [],
    S = (E, A, C, P, I = !1) => {
      let L = E.length / 2,
        F = I ? L : L - 1,
        N = (A + C) * bl + 1;
      for (let B = 0; B < F; B++) {
        let H = m(E[B * 2]),
          O = g(E[B * 2 + 1]),
          D = m(E[((B + 1) % L) * 2]),
          U = g(E[((B + 1) % L) * 2 + 1]),
          G = D - H,
          q = U - O,
          W = G * G + q * q || 1e-9,
          V = Math.max(0, Math.floor(Math.min(H, D) - N)),
          Y = Math.min(a - 1, Math.ceil(Math.max(H, D) + N)),
          $ = Math.max(0, Math.floor(Math.min(O, U) - N)),
          st = Math.min(a - 1, Math.ceil(Math.max(O, U) + N));
        for (let Q = $; Q <= st; Q++)
          for (let j = V; j <= Y; j++) {
            let X = Math.max(
                0,
                Math.min(1, ((j + 0.5 - H) * G + (Q + 0.5 - O) * q) / W),
              ),
              K = j + 0.5 - H - X * G,
              nt = Q + 0.5 - O - X * q,
              Z = Math.sqrt(K * K + nt * nt) / bl,
              et = Math.min(1, Math.max(0, (A - Z) / C + 0.5));
            if (et <= 0) continue;
            let tt = Q * a + j;
            (y[tt] || M.push(tt), et > y[tt] && (y[tt] = et));
          }
      }
      for (let B of M) (P(B, y[B]), (y[B] = 0));
      M.length = 0;
    },
    w = Ai((t + 0.5) * Mi, (e + 0.5) * Mi) === "presidio" ? 90 : 0;
  if ((yield, n)) {
    for (let A of n.green) (v(A.rings, 1, 0, A.park ? w >> 1 : w), yield);
    for (let A of n.areas) {
      if (A.c === 2) v(A.rings, 1, 0, 210);
      else {
        v(A.rings, 0, 1, A.m * 50);
        for (let C of A.rings) S(C, 0.25, 0.3, (P, I) => d(P, I, 0, 1, 0), !0);
      }
      yield;
    }
    let E = 0;
    for (let A of n.lines)
      (S(A.pts, A.w / 2 + 0.7, 1, (C, P) => {
        c[C] *= 1 - 0.5 * P;
      }),
        (++E & 7) === 0 && (yield));
    for (let A of n.lines)
      (S(A.pts, A.w / 2, A.m === 3 ? 0.7 : 0.35, (C, P) =>
        d(C, P, 0, 1, A.m * 50),
      ),
        (++E & 7) === 0 && (yield));
  }
  if (s?.key && n?.areas.some((E) => E.c === 2)) {
    let E = Mi / s.step + 1,
      A = Math.round((r - s.x0) / s.step),
      C = Math.round((l - s.z0) / s.step),
      P = new Float32Array(E * E),
      I = (F, N) =>
        s.h[
          Math.min(s.nz - 1, Math.max(0, N)) * s.nx +
            Math.min(s.nx - 1, Math.max(0, F))
        ];
    for (let F = 0; F < E; F++)
      for (let N = 0; N < E; N++) {
        let B = A + N,
          H = C + F,
          O = I(B + 2, H) - I(B - 2, H),
          D = I(B, H + 2) - I(B, H - 2),
          U = Math.hypot(O, 4 * s.step, D),
          G = -O / U,
          q = (4 * s.step) / U,
          W = -D / U,
          V = s.x0 + B * s.step,
          Y = s.z0 + H * s.step,
          $ = _w(V, I(B, H), Y, G, q, W, Qbt(V, Y));
        P[F * E + N] = Math.max(0, Math.min(1, ($[1] - $[0]) * 40 + 0.5));
      }
    let L = s.step * bl;
    yield;
    for (let F = 0; F < a; F++) {
      let N = (F + 0.5) / L,
        B = Math.min(E - 2, Math.floor(N)),
        H = N - B;
      for (let O = 0; O < a; O++) {
        let D = F * a + O;
        if (f[D] !== 210 || c[D] < 0.5) continue;
        let U = (O + 0.5) / L,
          G = Math.min(E - 2, Math.floor(U)),
          q = U - G,
          W =
            (P[B * E + G] * (1 - q) + P[B * E + G + 1] * q) * (1 - H) +
            (P[(B + 1) * E + G] * (1 - q) + P[(B + 1) * E + G + 1] * q) * H;
        ((f[D] = Math.round(210 - 90 * W)),
          (u[D] = Math.min(u[D], Math.round(255 * (1 - 0.5 * W)))));
      }
    }
  }
  if (s) {
    let E = Mi / s.step + 1,
      A = Math.round((r - s.x0) / s.step),
      C = Math.round((l - s.z0) / s.step),
      P = new Float32Array(E * E),
      I = !1;
    for (let L = 0; L < E; L++)
      for (let F = 0; F < E; F++) {
        let N = Math.min(s.nx - 1, Math.max(0, A + F)),
          B = Math.min(s.nz - 1, Math.max(0, C + L));
        (s.cover[B * s.nx + N] & 15) === 3 && ((P[L * E + F] = 1), (I = !0));
      }
    if (I) {
      let L = s.step * bl;
      yield;
      for (let F = 0; F < a; F++) {
        let N = (F + 0.5) / L,
          B = Math.min(E - 2, Math.floor(N)),
          H = N - B;
        for (let O = 0; O < a; O++) {
          let D = (O + 0.5) / L,
            U = Math.min(E - 2, Math.floor(D)),
            G = D - U,
            q =
              (P[B * E + U] * (1 - G) + P[B * E + U + 1] * G) * (1 - H) +
              (P[(B + 1) * E + U] * (1 - G) + P[(B + 1) * E + U + 1] * G) * H;
          if (q > 0.25) {
            let W = Math.min(1, (q - 0.25) / 0.5),
              V = F * a + O;
            ((c[V] *= 1 - W), (h[V] *= 1 - W));
          }
        }
      }
    }
  }
  let z = i.beds?.get(t + "," + e);
  if (z)
    for (let [E, A, C] of z)
      S([E, A, E + 0.01, A], C * 0.8, 0.5, (P, I) => d(P, I, 0, 1, 250));
  if (z)
    for (let [E, A, C] of z)
      S([E, A, E + 0.01, A], C * 0.55, C * 0.6, (P, I) => {
        u[P] = Math.min(u[P], Math.round(255 * (1 - 0.42 * I)));
      });
  yield;
  let _ = 0;
  if (o)
    for (let [E, A, C, P] of o) {
      (++_ & 31) === 0 && (yield);
      let I = m(E),
        L = g(A),
        F = C * bl;
      for (
        let N = Math.max(0, Math.floor(L - F));
        N <= Math.min(a - 1, Math.ceil(L + F));
        N++
      )
        for (
          let B = Math.max(0, Math.floor(I - F));
          B <= Math.min(a - 1, Math.ceil(I + F));
          B++
        ) {
          let H = Math.hypot(B + 0.5 - I, N + 0.5 - L) / F;
          if (H > 1) continue;
          let O = N * a + B,
            D = H * C;
          ((u[O] = Math.min(
            u[O],
            255 *
              (0.62 + 0.38 * H * H) *
              (D < 1.1 ? 0.55 + (0.45 * D) / 1.1 : 1),
          )),
            P &&
              c[O] > 0.5 &&
              d(
                O,
                Math.min(1, Math.max(0, (1 - H * C) / 0.35 + 0.5)),
                0,
                1,
                250,
              ));
        }
    }
  yield;
  let R = new Uint8Array(a * a * 4);
  for (let E = 0; E < a * a; E++)
    ((E & 65535) === 65535 && (yield),
      (R[E * 4] = Math.round(c[E] * 255)),
      (R[E * 4 + 1] = Math.round(h[E] * 255)),
      (R[E * 4 + 2] = f[E]),
      (R[E * 4 + 3] = u[E]));
  let T = new Xi(R, a, a, no);
  return (
    (T.colorSpace = On),
    (T.generateMipmaps = !0),
    (T.minFilter = oa),
    (T.magFilter = yi),
    (T.wrapS = T.wrapT = $i),
    (T.needsUpdate = !0),
    (T.name = `groundMask_${t},${e}`),
    globalThis.SF_LITE && (T.userData.mbDropData = !0),
    T
  );
}
