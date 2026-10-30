// app 279 — math
// Lines 137918-138219 of readable/app.pretty.js (statement-aligned).
function* lQ(o, t, e, s = null) {
  let n = o.idx.get(t + "," + e),
    i = o.trees.get(t + "," + e),
    a = qp,
    r = t * Fi,
    l = e * Fi,
    c = new Float32Array(a * a),
    h = new Float32Array(a * a),
    f = new Uint8Array(a * a),
    u = new Uint8Array(a * a).fill(255),
    d = (E, R, P, C, I) => {
      R <= 0 ||
        (R >= 1
          ? ((c[E] = P), (h[E] = C))
          : ((c[E] += (P - c[E]) * R), (h[E] += (C - h[E]) * R)),
        R > 0.5 && (f[E] = I));
    },
    p = !!(n || i || o.beds?.get(t + "," + e));
  if (s) {
    let E = Fi / s.step + 1,
      R = Math.round((r - s.x0) / s.step),
      P = Math.round((l - s.z0) / s.step),
      C = new Float32Array(E * E);
    for (let L = 0; L < E; L++)
      for (let F = 0; F < E; F++) {
        let O = Math.min(s.nx - 1, Math.max(0, R + F)),
          B = Math.min(s.nz - 1, Math.max(0, P + L)),
          H = s.x0 + O * s.step,
          N = s.z0 + B * s.step;
        C[L * E + F] = IF(s, O, B, H, N)[3] > 0.9 ? 1 : 0;
      }
    let I = s.step * Bl;
    for (let L = 0; L < a; L++) {
      (L & 63) === 63 && (yield);
      let F = (L + 0.5) / I,
        O = Math.min(E - 2, Math.floor(F)),
        B = F - O;
      for (let H = 0; H < a; H++) {
        let N = (H + 0.5) / I,
          D = Math.min(E - 2, Math.floor(N)),
          U = N - D,
          G =
            (C[O * E + D] * (1 - U) + C[O * E + D + 1] * U) * (1 - B) +
            (C[(O + 1) * E + D] * (1 - U) + C[(O + 1) * E + D + 1] * U) * B;
        G > 0.3 &&
          (d(L * a + H, Math.min(1, (G - 0.3) / 0.4), 0, 1, 0), (p = !0));
      }
    }
  }
  if (!p) return null;
  let m = (E) => (E - r) * Bl,
    g = (E) => (E - l) * Bl,
    b = new Float32Array(a),
    v = 4,
    x = (E, R, P, C) => {
      let I = 1e9,
        L = -1e9;
      for (let H of E)
        for (let N = 1; N < H.length; N += 2) {
          let D = g(H[N]);
          ((I = Math.min(I, D)), (L = Math.max(L, D)));
        }
      let F = Math.max(0, Math.floor(I)),
        O = Math.min(a - 1, Math.ceil(L)),
        B = [];
      for (let H = F; H <= O; H++) {
        b.fill(0);
        let N = a,
          D = -1;
        for (let U = 0; U < v; U++) {
          let G = l + (H + (U + 0.5) / v) / Bl;
          B.length = 0;
          for (let W of E)
            for (let V = 0, $ = W.length - 2; V < W.length; $ = V, V += 2) {
              let J = W[V + 1],
                X = W[$ + 1];
              J > G != X > G &&
                B.push(m(W[$] + ((G - X) * (W[V] - W[$])) / (J - X)));
            }
          B.sort((W, V) => W - V);
          for (let W = 0; W + 1 < B.length; W += 2) {
            let V = Math.max(0, B[W]),
              $ = Math.min(a, B[W + 1]);
            if ($ <= V) continue;
            let J = Math.floor(V),
              X = Math.min(a - 1, Math.floor($ - 1e-6));
            ((N = Math.min(N, J)), (D = Math.max(D, X)));
            for (let tt = J; tt <= X; tt++)
              b[tt] += (Math.min(tt + 1, $) - Math.max(tt, V)) / v;
          }
        }
        for (let U = N; U <= D; U++) d(H * a + U, Math.min(1, b[U]), R, P, C);
      }
    },
    y = new Float32Array(a * a),
    M = [],
    S = (E, R, P, C, I = !1) => {
      let L = E.length / 2,
        F = I ? L : L - 1,
        O = (R + P) * Bl + 1;
      for (let B = 0; B < F; B++) {
        let H = m(E[B * 2]),
          N = g(E[B * 2 + 1]),
          D = m(E[((B + 1) % L) * 2]),
          U = g(E[((B + 1) % L) * 2 + 1]),
          G = D - H,
          W = U - N,
          V = G * G + W * W || 1e-9,
          $ = Math.max(0, Math.floor(Math.min(H, D) - O)),
          J = Math.min(a - 1, Math.ceil(Math.max(H, D) + O)),
          X = Math.max(0, Math.floor(Math.min(N, U) - O)),
          tt = Math.min(a - 1, Math.ceil(Math.max(N, U) + O));
        for (let Z = X; Z <= tt; Z++)
          for (let q = $; q <= J; q++) {
            let j = Math.max(
                0,
                Math.min(1, ((q + 0.5 - H) * G + (Z + 0.5 - N) * W) / V),
              ),
              K = q + 0.5 - H - j * G,
              nt = Z + 0.5 - N - j * W,
              Q = Math.sqrt(K * K + nt * nt) / Bl,
              et = Math.min(1, Math.max(0, (R - Q) / P + 0.5));
            if (et <= 0) continue;
            let st = Z * a + q;
            (y[st] || M.push(st), et > y[st] && (y[st] = et));
          }
      }
      for (let B of M) (C(B, y[B]), (y[B] = 0));
      M.length = 0;
    },
    w = Di((t + 0.5) * Fi, (e + 0.5) * Fi) === "presidio" ? 90 : 0;
  if ((yield, n)) {
    for (let R of n.green) (x(R.rings, 1, 0, R.park ? w >> 1 : w), yield);
    for (let R of n.areas) {
      if (R.c === 2) x(R.rings, 1, 0, 210);
      else {
        x(R.rings, 0, 1, R.m * 50);
        for (let P of R.rings) S(P, 0.25, 0.3, (C, I) => d(C, I, 0, 1, 0), !0);
      }
      yield;
    }
    let E = 0;
    for (let R of n.lines)
      (S(R.pts, R.w / 2 + 0.7, 1, (P, C) => {
        c[P] *= 1 - 0.5 * C;
      }),
        (++E & 7) === 0 && (yield));
    for (let R of n.lines)
      (S(R.pts, R.w / 2, R.m === 3 ? 0.7 : 0.35, (P, C) =>
        d(P, C, 0, 1, R.m * 50),
      ),
        (++E & 7) === 0 && (yield));
  }
  if (s?.key && n?.areas.some((E) => E.c === 2)) {
    let E = Fi / s.step + 1,
      R = Math.round((r - s.x0) / s.step),
      P = Math.round((l - s.z0) / s.step),
      C = new Float32Array(E * E),
      I = (F, O) =>
        s.h[
          Math.min(s.nz - 1, Math.max(0, O)) * s.nx +
            Math.min(s.nx - 1, Math.max(0, F))
        ];
    for (let F = 0; F < E; F++)
      for (let O = 0; O < E; O++) {
        let B = R + O,
          H = P + F,
          N = I(B + 2, H) - I(B - 2, H),
          D = I(B, H + 2) - I(B, H - 2),
          U = Math.hypot(N, 4 * s.step, D),
          G = -N / U,
          W = (4 * s.step) / U,
          V = -D / U,
          $ = s.x0 + B * s.step,
          J = s.z0 + H * s.step,
          X = yM($, I(B, H), J, G, W, V, kyt($, J));
        C[F * E + O] = Math.max(0, Math.min(1, (X[1] - X[0]) * 40 + 0.5));
      }
    let L = s.step * Bl;
    yield;
    for (let F = 0; F < a; F++) {
      let O = (F + 0.5) / L,
        B = Math.min(E - 2, Math.floor(O)),
        H = O - B;
      for (let N = 0; N < a; N++) {
        let D = F * a + N;
        if (f[D] !== 210 || c[D] < 0.5) continue;
        let U = (N + 0.5) / L,
          G = Math.min(E - 2, Math.floor(U)),
          W = U - G,
          V =
            (C[B * E + G] * (1 - W) + C[B * E + G + 1] * W) * (1 - H) +
            (C[(B + 1) * E + G] * (1 - W) + C[(B + 1) * E + G + 1] * W) * H;
        ((f[D] = Math.round(210 - 90 * V)),
          (u[D] = Math.min(u[D], Math.round(255 * (1 - 0.5 * V)))));
      }
    }
  }
  if (s) {
    let E = Fi / s.step + 1,
      R = Math.round((r - s.x0) / s.step),
      P = Math.round((l - s.z0) / s.step),
      C = new Float32Array(E * E),
      I = !1;
    for (let L = 0; L < E; L++)
      for (let F = 0; F < E; F++) {
        let O = Math.min(s.nx - 1, Math.max(0, R + F)),
          B = Math.min(s.nz - 1, Math.max(0, P + L));
        (s.cover[B * s.nx + O] & 15) === 3 && ((C[L * E + F] = 1), (I = !0));
      }
    if (I) {
      let L = s.step * Bl;
      yield;
      for (let F = 0; F < a; F++) {
        let O = (F + 0.5) / L,
          B = Math.min(E - 2, Math.floor(O)),
          H = O - B;
        for (let N = 0; N < a; N++) {
          let D = (N + 0.5) / L,
            U = Math.min(E - 2, Math.floor(D)),
            G = D - U,
            W =
              (C[B * E + U] * (1 - G) + C[B * E + U + 1] * G) * (1 - H) +
              (C[(B + 1) * E + U] * (1 - G) + C[(B + 1) * E + U + 1] * G) * H;
          if (W > 0.25) {
            let V = Math.min(1, (W - 0.25) / 0.5),
              $ = F * a + N;
            ((c[$] *= 1 - V), (h[$] *= 1 - V));
          }
        }
      }
    }
  }
  let _ = o.beds?.get(t + "," + e);
  if (_)
    for (let [E, R, P] of _)
      S([E, R, E + 0.01, R], P * 0.8, 0.5, (C, I) => d(C, I, 0, 1, 250));
  if (_)
    for (let [E, R, P] of _)
      S([E, R, E + 0.01, R], P * 0.55, P * 0.6, (C, I) => {
        u[C] = Math.min(u[C], Math.round(255 * (1 - 0.42 * I)));
      });
  yield;
  let z = 0;
  if (i)
    for (let [E, R, P, C] of i) {
      (++z & 31) === 0 && (yield);
      let I = m(E),
        L = g(R),
        F = P * Bl;
      for (
        let O = Math.max(0, Math.floor(L - F));
        O <= Math.min(a - 1, Math.ceil(L + F));
        O++
      )
        for (
          let B = Math.max(0, Math.floor(I - F));
          B <= Math.min(a - 1, Math.ceil(I + F));
          B++
        ) {
          let H = Math.hypot(B + 0.5 - I, O + 0.5 - L) / F;
          if (H > 1) continue;
          let N = O * a + B,
            D = H * P;
          ((u[N] = Math.min(
            u[N],
            255 *
              (0.62 + 0.38 * H * H) *
              (D < 1.1 ? 0.55 + (0.45 * D) / 1.1 : 1),
          )),
            C &&
              c[N] > 0.5 &&
              d(
                N,
                Math.min(1, Math.max(0, (1 - H * P) / 0.35 + 0.5)),
                0,
                1,
                250,
              ));
        }
    }
  yield;
  let A = new Uint8Array(a * a * 4);
  for (let E = 0; E < a * a; E++)
    ((E & 65535) === 65535 && (yield),
      (A[E * 4] = Math.round(c[E] * 255)),
      (A[E * 4 + 1] = Math.round(h[E] * 255)),
      (A[E * 4 + 2] = f[E]),
      (A[E * 4 + 3] = u[E]));
  let T = new no(A, a, a, go);
  return (
    (T.colorSpace = Nn),
    (T.generateMipmaps = !0),
    (T.minFilter = ma),
    (T.magFilter = Ii),
    (T.wrapS = T.wrapT = so),
    (T.needsUpdate = !0),
    (T.name = `groundMask_${t},${e}`),
    globalThis.SF_LITE && (T.userData.mbDropData = !0),
    T
  );
}
