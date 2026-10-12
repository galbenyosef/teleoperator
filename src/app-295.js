// app 295 — math
// Lines 143377-143812 of readable/app.pretty.js (statement-aligned).
function Dxt(i, t) {
  let e = i.bld,
    s = e.n,
    n = new Float32Array(s * 4),
    o = new Map(),
    a = (E, A) => (E * 73856093) ^ (A * 19349663),
    r = (E) =>
      e.pts.subarray(e.rStart[e.bRing[E]] * 2, e.rStart[e.bRing[E] + 1] * 2);
  for (let E = 0; E < s; E++) {
    let A = r(E),
      C = 1e9,
      P = 1e9,
      I = -1e9,
      L = -1e9;
    for (let F = 0; F < A.length; F += 2)
      ((C = Math.min(C, A[F])),
        (I = Math.max(I, A[F])),
        (P = Math.min(P, A[F + 1])),
        (L = Math.max(L, A[F + 1])));
    ((n[E * 4] = C),
      (n[E * 4 + 1] = P),
      (n[E * 4 + 2] = I),
      (n[E * 4 + 3] = L));
    for (let F = Math.floor(C / 32); F <= Math.floor(I / 32); F++)
      for (let N = Math.floor(P / 32); N <= Math.floor(L / 32); N++) {
        let B = a(F, N),
          H = o.get(B);
        (H || o.set(B, (H = [])), H.push(E));
      }
  }
  let l = (E) => e.bF[E * 3 + 1],
    c = (E, A, C, P = -1) => {
      let I = o.get(a(Math.floor(E / 32), Math.floor(A / 32)));
      if (!I) return -1;
      for (let L of I)
        if (
          !(L === P || l(L) < C) &&
          !(
            E < n[L * 4] ||
            E > n[L * 4 + 2] ||
            A < n[L * 4 + 1] ||
            A > n[L * 4 + 3]
          ) &&
          en(r(L), E, A)
        )
          return L;
      return -1;
    },
    h = [],
    f = [],
    u = {};
  for (let E of i.edges)
    if (!(E.inner || !Hxt.test(E.name || "") || E.cls !== "motorway")) {
      f.push(E);
      for (let A = E.s0; A < E.s1; A += 20)
        (Ot(E, A, u), h.push([u.x, u.z, u.y]));
    }
  let d = new Map();
  for (let E of h) {
    let A = a(Math.floor(E[0] / 160), Math.floor(E[1] / 160)),
      C = d.get(A);
    (C || d.set(A, (C = [])), C.push(E));
  }
  let p = (E, A, C) => {
      let P = null,
        I = C,
        L = Math.floor(E / 160),
        F = Math.floor(A / 160);
      for (let N = -1; N <= 1; N++)
        for (let B = -1; B <= 1; B++)
          for (let H of d.get(a(L + N, F + B)) || []) {
            let O = Math.hypot(H[0] - E, H[1] - A);
            O < I && ((I = O), (P = H));
          }
      return P;
    },
    m = { roof: [], pole: [], mural: [] },
    g = [],
    b = (E, A, C) => !g.some((P) => Math.hypot(P[0] - E, P[1] - A) < C),
    x = 0,
    v = [],
    y = (m.dbg = { free: 0, surf: 0, deck: 0, bld: 0, n: 0 });
  for (let E of f)
    if (!(!E.oneway || E.s1 - E.s0 < 80))
      for (let A = E.s0 + 40; A < E.s1 - 40; A += 45) {
        (Ot(E, A, u), y.n++);
        let C = u.w + 10.5,
          P = u.x + u.nx * C,
          I = u.z + u.nz * C;
        if (!b(P, I, 190) || !t.inWorld(P, I)) {
          y.free++;
          continue;
        }
        let L = t.terrainAt(P, I),
          F = t.surfaceAt(P, I);
        if (F === "road" || F === "walk" || F === "sea" || c(P, I, L) >= 0) {
          y.surf++;
          continue;
        }
        if (f.some((V) => V !== E && Uxt(V, P, I, 3))) {
          y.deck++;
          continue;
        }
        let N = Math.max(u.y, L) + 6.5;
        if (c(P, I, N, -1) >= 0) continue;
        let B = 0.44,
          H = Math.cos(B),
          O = Math.sin(B),
          D = -u.dx,
          U = -u.dz,
          G = -u.nx,
          q = -u.nz;
        if (
          ((D = D * H + G * O),
          (U = U * H + q * O),
          !Jd(t, P - D * 0.2, I - U * 0.2, L, N + xI, 1.2))
        ) {
          y.deck++;
          continue;
        }
        let W = !0;
        for (let V = -0.5; V <= 0.5; V += 0.05) {
          let Y = P + U * Pw * V,
            $ = I - D * Pw * V;
          (c(Y, $, N) >= 0 || !Jd(t, Y, $, N - 0.4, N + xI + 0.5, 1.3)) &&
            (W = !1);
        }
        if (!W) {
          y.bld++;
          continue;
        }
        (g.push([P, I]),
          v.push({
            x: P,
            z: I,
            y: N,
            nx: D,
            nz: U,
            w: Pw,
            h: xI,
            ad: (x++ * 5) % bI,
            back: (x++ * 5 + 3) % bI,
            ground: L,
          }));
      }
  m.pole = v;
  let M = [];
  for (let E = 0; E < s; E++) {
    let A = (n[E * 4] + n[E * 4 + 2]) / 2,
      C = (n[E * 4 + 1] + n[E * 4 + 3]) / 2,
      P = l(E) - e.bF[E * 3];
    if (P < 7 || P > 36 || (e.roofH && e.roofH[E] > 0.5 && e.roof[E])) continue;
    let I = Ai(A, C),
      L = p(A, C, 160);
    if (!L && I !== "soma" && I !== "hayes" && I !== "tenderloin") continue;
    let F = r(E),
      N = F.length / 2,
      B = e.front.subarray(e.rStart[e.bRing[E]], e.rStart[e.bRing[E] + 1]),
      H = null;
    for (let O = 0; O < N; O++) {
      let D = F[O * 2],
        U = F[O * 2 + 1],
        G = F[((O + 1) % N) * 2],
        q = F[((O + 1) % N) * 2 + 1],
        W = Math.hypot(G - D, q - U);
      if (W < 11) continue;
      let V = -(q - U) / W,
        Y = (G - D) / W,
        $ = B[O] === 1 ? 1 : 0;
      if (L) {
        let st = L[0] - (D + G) / 2,
          Q = L[1] - (U + q) / 2,
          j = Math.hypot(st, Q) || 1;
        $ = (V * st + Y * Q) / j > 0.6 ? 2 + (L[2] > l(E) - 4 ? 1 : 0) : $;
      }
      $ &&
        (!H || $ * 100 + W > H.s * 100 + H.len) &&
        (H = { s: $, len: W, ax: D, az: U, bx: G, bz: q, nx: V, nz: Y });
    }
    H && M.push([E, H, (L ? 1 : 0) + HJ(e.seed[E]) * 0.9]);
  }
  M.sort((E, A) => A[2] - E[2]);
  for (let [E, A] of M) {
    if (m.roof.length >= 70) break;
    let C = Math.min(Pw, A.len - 2),
      P = C / 3;
    if (C < 10) continue;
    let I = 0.5,
      L = 1.8,
      F = A.ax + (A.bx - A.ax) * I - A.nx * L,
      N = A.az + (A.bz - A.az) * I - A.nz * L;
    if (!b(F, N, 110)) continue;
    let B = l(E) + 2.4,
      H = (A.bx - A.ax) / A.len,
      O = (A.bz - A.az) / A.len,
      D = !0;
    for (let U of [-0.5, 0, 0.5]) {
      let G = F + H * C * U,
        q = N + O * C * U;
      (!en(r(E), G - A.nx * 0.6, q - A.nz * 0.6) || c(G, q, B, E) >= 0) &&
        (D = !1);
      for (let W of [6, 14, 24, 34])
        c(G + A.nx * W, q + A.nz * W, B + P * 0.5, E) >= 0 && (D = !1);
    }
    D &&
      (g.push([F, N]),
      m.roof.push({
        x: F,
        z: N,
        y: B,
        nx: A.nx,
        nz: A.nz,
        w: C,
        h: P,
        ad: (x++ * 5) % bI,
        base: l(E),
        b: E,
      }));
  }
  let S = [],
    w = [];
  for (let E = 0; E < s; E++) {
    let A = e.bB[E * 5];
    if (A !== 6 && A !== 7 && A !== 8 && A !== 5) continue;
    let C = (n[E * 4] + n[E * 4 + 2]) / 2,
      P = (n[E * 4 + 1] + n[E * 4 + 3]) / 2,
      I = Ai(C, P),
      L =
        I === "soma" || I === "hayes"
          ? "s"
          : I === "chinatown"
            ? "c"
            : I === "northbeach"
              ? "n"
              : I === "mission"
                ? "m"
                : I === "haight"
                  ? "h"
                  : I === "castro"
                    ? "x"
                    : null;
    if (!L) continue;
    let F = r(E),
      N = F.length / 2,
      B = e.front.subarray(e.rStart[e.bRing[E]], e.rStart[e.bRing[E] + 1]),
      H = e.bF[E * 3],
      O = l(E);
    if (!(O - H < 7 || (A === 6 && O - H > 40)))
      for (let D = 0; D < N; D++) {
        if (B[D] !== 2) continue;
        let U = F[D * 2],
          G = F[D * 2 + 1],
          q = F[((D + 1) % N) * 2],
          W = F[((D + 1) % N) * 2 + 1],
          V = Math.hypot(q - U, W - G);
        if (V < 9) continue;
        let Y = -(W - G) / V,
          $ = (q - U) / V,
          st = (U + q) / 2,
          Q = (G + W) / 2,
          j = !0;
        for (let K of [0.15, 0.5, 0.85])
          c(U + (q - U) * K + Y * 1.5, G + (W - G) * K + $ * 1.5, -1e9, E) >=
            0 && (j = !1);
        if (!j) continue;
        let X = 0;
        for (
          let K = 3;
          K < 40 && !(c(st + Y * K, Q + $ * K, -1e9, E) >= 0);
          K += 2.5
        ) {
          let nt = t.surfaceAt(st + Y * K, Q + $ * K);
          if (nt === "road" || nt === "walk") {
            X = K;
            break;
          }
        }
        X &&
          w.push([
            E,
            L,
            U,
            G,
            q,
            W,
            Y,
            $,
            V,
            H,
            O,
            HJ(e.seed[E], D) + (V > 16 ? 0.4 : 0),
          ]);
      }
  }
  w.sort((E, A) => A[11] - E[11]);
  let z = { s: 26, c: 2, n: 2, m: 26, h: 8, x: 5 },
    _ = { s: 0, c: 0, n: 0, m: 0, h: 0, x: 0 };
  for (let [E, A, C, P, I, L, F, N, B, H, O] of w) {
    if (_[A] >= z[A]) continue;
    let D = (C + I) / 2,
      U = (P + L) / 2;
    if (
      S.some(
        (Q) =>
          Math.hypot(Q[0] - D, Q[1] - U) <
          (A === "s" ? 70 : A === "m" ? 45 : 120),
      )
    )
      continue;
    let G = Math.max(
        H,
        t.driveHeight(C + F * 1.5, P + N * 1.5),
        t.driveHeight(I + F * 1.5, L + N * 1.5),
      ),
      q = Math.min(B - 1.2, 26),
      W = q / 2,
      V = Math.min(O - 1.3, G + 16) - (G + 0.6);
    if ((W > V && ((W = V), (q = W * 2)), q < 7.5)) continue;
    let Y = 0.5 - q / B / 2,
      $ = 0.5 + q / B / 2;
    (S.push([D, U]), _[A]++);
    let st =
      A === "c"
        ? Fxt
        : A === "n"
          ? Nxt
          : A === "m"
            ? __[_.m % __.length]
            : A === "h"
              ? BJ[_.h % BJ.length]
              : A === "x"
                ? OJ[_.x % OJ.length]
                : FJ[_.s % FJ.length];
    m.mural.push({
      ax: C + (I - C) * Y + F * 0.06,
      az: P + (L - P) * Y + N * 0.06,
      bx: C + (I - C) * $ + F * 0.06,
      bz: P + (L - P) * $ + N * 0.06,
      nx: F,
      nz: N,
      y0: G + 0.6,
      y1: G + 0.6 + W,
      cell: st,
    });
  }
  let R = new Set(),
    T = 0;
  for (let E of i.edges) {
    let A = Oxt[E.name];
    if (!(!A || E.inner || E.s1 - E.s0 < 6))
      for (let C = E.s0; C <= E.s1; C += 1.5) {
        Ot(E, C, u);
        for (let P of [1, -1])
          for (let I of [1.2, 2.6, 4.2]) {
            let L = u.x + u.nx * P * (u.w + I),
              F = u.z + u.nz * P * (u.w + I),
              N = c(L, F, -1e9);
            if (N < 0) continue;
            let B = r(N),
              H = B.length / 2,
              O = -1,
              D = 2.5;
            for (let tt = 0; tt < H; tt++) {
              let it = B[tt * 2],
                rt = B[tt * 2 + 1],
                lt = B[((tt + 1) % H) * 2],
                ct = B[((tt + 1) % H) * 2 + 1],
                dt = Math.hypot(lt - it, ct - rt);
              if (
                dt < 1.6 ||
                Math.abs(((lt - it) * u.dx + (ct - rt) * u.dz) / dt) < 0.7
              )
                continue;
              let ut = Math.max(
                  0,
                  Math.min(
                    1,
                    ((L - it) * (lt - it) + (F - rt) * (ct - rt)) / (dt * dt),
                  ),
                ),
                ot = Math.hypot(
                  it + (lt - it) * ut - L,
                  rt + (ct - rt) * ut - F,
                );
              ot < D && ((D = ot), (O = tt));
            }
            if (O < 0 || R.has(N * 4096 + O)) continue;
            R.add(N * 4096 + O);
            let U = B[O * 2],
              G = B[O * 2 + 1],
              q = B[((O + 1) % H) * 2],
              W = B[((O + 1) % H) * 2 + 1],
              V = Math.hypot(q - U, W - G),
              Y = -(W - G) / V,
              $ = (q - U) / V;
            if ((u.x - (U + q) / 2) * Y + (u.z - (G + W) / 2) * $ < 0) continue;
            let st = e.front.subarray(
                e.rStart[e.bRing[N]],
                e.rStart[e.bRing[N] + 1],
              ),
              Q = st[O] === 1 && e.bB[N * 5] <= 1,
              j =
                Math.min(
                  t.driveHeight(U + Y * 1.2, G + $ * 1.2),
                  t.driveHeight(q + Y * 1.2, W + $ * 1.2),
                ) + 0.12,
              X = l(N),
              K = Math.min(X - 0.4, j + (Q ? 2.9 : 6.5));
            if (K - j < 2.2) continue;
            let nt = K - j,
              Z = 2 * nt,
              et = Math.max(1, Math.round(V / Z));
            if (!(V < 1.6))
              for (let tt = 0; tt < et; tt++) {
                let it = tt / et,
                  rt = (tt + 1) / et,
                  lt = V / et;
                m.mural.push({
                  ax: U + (q - U) * it + Y * 0.07,
                  az: G + (W - G) * it + $ * 0.07,
                  bx: U + (q - U) * rt + Y * 0.07,
                  bz: G + (W - G) * rt + $ * 0.07,
                  nx: Y,
                  nz: $,
                  y0: j,
                  y1: K,
                  cell: A[(T++ * 5 + N) % A.length],
                  uw: Math.min(1, lt / Z),
                  down: j + 0.02,
                });
              }
          }
      }
  }
  return m;
}
