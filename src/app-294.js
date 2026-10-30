// app 294 — math
// Lines 143654-144089 of readable/app.pretty.js (statement-aligned).
function f5t(o, t) {
  let e = o.bld,
    s = e.n,
    n = new Float32Array(s * 4),
    i = new Map(),
    a = (E, R) => (E * 73856093) ^ (R * 19349663),
    r = (E) =>
      e.pts.subarray(e.rStart[e.bRing[E]] * 2, e.rStart[e.bRing[E] + 1] * 2);
  for (let E = 0; E < s; E++) {
    let R = r(E),
      P = 1e9,
      C = 1e9,
      I = -1e9,
      L = -1e9;
    for (let F = 0; F < R.length; F += 2)
      ((P = Math.min(P, R[F])),
        (I = Math.max(I, R[F])),
        (C = Math.min(C, R[F + 1])),
        (L = Math.max(L, R[F + 1])));
    ((n[E * 4] = P),
      (n[E * 4 + 1] = C),
      (n[E * 4 + 2] = I),
      (n[E * 4 + 3] = L));
    for (let F = Math.floor(P / 32); F <= Math.floor(I / 32); F++)
      for (let O = Math.floor(C / 32); O <= Math.floor(L / 32); O++) {
        let B = a(F, O),
          H = i.get(B);
        (H || i.set(B, (H = [])), H.push(E));
      }
  }
  let l = (E) => e.bF[E * 3 + 1],
    c = (E, R, P, C = -1) => {
      let I = i.get(a(Math.floor(E / 32), Math.floor(R / 32)));
      if (!I) return -1;
      for (let L of I)
        if (
          !(L === C || l(L) < P) &&
          !(
            E < n[L * 4] ||
            E > n[L * 4 + 2] ||
            R < n[L * 4 + 1] ||
            R > n[L * 4 + 3]
          ) &&
          rn(r(L), E, R)
        )
          return L;
      return -1;
    },
    h = [],
    f = [],
    u = {};
  for (let E of o.edges)
    if (!(E.inner || !h5t.test(E.name || "") || E.cls !== "motorway")) {
      f.push(E);
      for (let R = E.s0; R < E.s1; R += 20)
        (Ot(E, R, u), h.push([u.x, u.z, u.y]));
    }
  let d = new Map();
  for (let E of h) {
    let R = a(Math.floor(E[0] / 160), Math.floor(E[1] / 160)),
      P = d.get(R);
    (P || d.set(R, (P = [])), P.push(E));
  }
  let p = (E, R, P) => {
      let C = null,
        I = P,
        L = Math.floor(E / 160),
        F = Math.floor(R / 160);
      for (let O = -1; O <= 1; O++)
        for (let B = -1; B <= 1; B++)
          for (let H of d.get(a(L + O, F + B)) || []) {
            let N = Math.hypot(H[0] - E, H[1] - R);
            N < I && ((I = N), (C = H));
          }
      return C;
    },
    m = { roof: [], pole: [], mural: [] },
    g = [],
    b = (E, R, P) => !g.some((C) => Math.hypot(C[0] - E, C[1] - R) < P),
    v = 0,
    x = [],
    y = (m.dbg = { free: 0, surf: 0, deck: 0, bld: 0, n: 0 });
  for (let E of f)
    if (!(!E.oneway || E.s1 - E.s0 < 80))
      for (let R = E.s0 + 40; R < E.s1 - 40; R += 45) {
        (Ot(E, R, u), y.n++);
        let P = u.w + 10.5,
          C = u.x + u.nx * P,
          I = u.z + u.nz * P;
        if (!b(C, I, 190) || !t.inWorld(C, I)) {
          y.free++;
          continue;
        }
        let L = t.terrainAt(C, I),
          F = t.surfaceAt(C, I);
        if (F === "road" || F === "walk" || F === "sea" || c(C, I, L) >= 0) {
          y.surf++;
          continue;
        }
        if (f.some(($) => $ !== E && u5t($, C, I, 3))) {
          y.deck++;
          continue;
        }
        let O = Math.max(u.y, L) + 6.5;
        if (c(C, I, O, -1) >= 0) continue;
        let B = 0.44,
          H = Math.cos(B),
          N = Math.sin(B),
          D = -u.dx,
          U = -u.dz,
          G = -u.nx,
          W = -u.nz;
        if (
          ((D = D * H + G * N),
          (U = U * H + W * N),
          !Rp(t, C - D * 0.2, I - U * 0.2, L, O + XF, 1.2))
        ) {
          y.deck++;
          continue;
        }
        let V = !0;
        for (let $ = -0.5; $ <= 0.5; $ += 0.05) {
          let J = C + U * _M * $,
            X = I - D * _M * $;
          (c(J, X, O) >= 0 || !Rp(t, J, X, O - 0.4, O + XF + 0.5, 1.3)) &&
            (V = !1);
        }
        if (!V) {
          y.bld++;
          continue;
        }
        (g.push([C, I]),
          x.push({
            x: C,
            z: I,
            y: O,
            nx: D,
            nz: U,
            w: _M,
            h: XF,
            ad: (v++ * 5) % $F,
            back: (v++ * 5 + 3) % $F,
            ground: L,
          }));
      }
  m.pole = x;
  let M = [];
  for (let E = 0; E < s; E++) {
    let R = (n[E * 4] + n[E * 4 + 2]) / 2,
      P = (n[E * 4 + 1] + n[E * 4 + 3]) / 2,
      C = l(E) - e.bF[E * 3];
    if (C < 7 || C > 36 || (e.roofH && e.roofH[E] > 0.5 && e.roof[E])) continue;
    let I = Di(R, P),
      L = p(R, P, 160);
    if (!L && I !== "soma" && I !== "hayes" && I !== "tenderloin") continue;
    let F = r(E),
      O = F.length / 2,
      B = e.front.subarray(e.rStart[e.bRing[E]], e.rStart[e.bRing[E] + 1]),
      H = null;
    for (let N = 0; N < O; N++) {
      let D = F[N * 2],
        U = F[N * 2 + 1],
        G = F[((N + 1) % O) * 2],
        W = F[((N + 1) % O) * 2 + 1],
        V = Math.hypot(G - D, W - U);
      if (V < 11) continue;
      let $ = -(W - U) / V,
        J = (G - D) / V,
        X = B[N] === 1 ? 1 : 0;
      if (L) {
        let tt = L[0] - (D + G) / 2,
          Z = L[1] - (U + W) / 2,
          q = Math.hypot(tt, Z) || 1;
        X = ($ * tt + J * Z) / q > 0.6 ? 2 + (L[2] > l(E) - 4 ? 1 : 0) : X;
      }
      X &&
        (!H || X * 100 + V > H.s * 100 + H.len) &&
        (H = { s: X, len: V, ax: D, az: U, bx: G, bz: W, nx: $, nz: J });
    }
    H && M.push([E, H, (L ? 1 : 0) + GQ(e.seed[E]) * 0.9]);
  }
  M.sort((E, R) => R[2] - E[2]);
  for (let [E, R] of M) {
    if (m.roof.length >= 70) break;
    let P = Math.min(_M, R.len - 2),
      C = P / 3;
    if (P < 10) continue;
    let I = 0.5,
      L = 1.8,
      F = R.ax + (R.bx - R.ax) * I - R.nx * L,
      O = R.az + (R.bz - R.az) * I - R.nz * L;
    if (!b(F, O, 110)) continue;
    let B = l(E) + 2.4,
      H = (R.bx - R.ax) / R.len,
      N = (R.bz - R.az) / R.len,
      D = !0;
    for (let U of [-0.5, 0, 0.5]) {
      let G = F + H * P * U,
        W = O + N * P * U;
      (!rn(r(E), G - R.nx * 0.6, W - R.nz * 0.6) || c(G, W, B, E) >= 0) &&
        (D = !1);
      for (let V of [6, 14, 24, 34])
        c(G + R.nx * V, W + R.nz * V, B + C * 0.5, E) >= 0 && (D = !1);
    }
    D &&
      (g.push([F, O]),
      m.roof.push({
        x: F,
        z: O,
        y: B,
        nx: R.nx,
        nz: R.nz,
        w: P,
        h: C,
        ad: (v++ * 5) % $F,
        base: l(E),
        b: E,
      }));
  }
  let S = [],
    w = [];
  for (let E = 0; E < s; E++) {
    let R = e.bB[E * 5];
    if (R !== 6 && R !== 7 && R !== 8 && R !== 5) continue;
    let P = (n[E * 4] + n[E * 4 + 2]) / 2,
      C = (n[E * 4 + 1] + n[E * 4 + 3]) / 2,
      I = Di(P, C),
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
      O = F.length / 2,
      B = e.front.subarray(e.rStart[e.bRing[E]], e.rStart[e.bRing[E] + 1]),
      H = e.bF[E * 3],
      N = l(E);
    if (!(N - H < 7 || (R === 6 && N - H > 40)))
      for (let D = 0; D < O; D++) {
        if (B[D] !== 2) continue;
        let U = F[D * 2],
          G = F[D * 2 + 1],
          W = F[((D + 1) % O) * 2],
          V = F[((D + 1) % O) * 2 + 1],
          $ = Math.hypot(W - U, V - G);
        if ($ < 9) continue;
        let J = -(V - G) / $,
          X = (W - U) / $,
          tt = (U + W) / 2,
          Z = (G + V) / 2,
          q = !0;
        for (let K of [0.15, 0.5, 0.85])
          c(U + (W - U) * K + J * 1.5, G + (V - G) * K + X * 1.5, -1e9, E) >=
            0 && (q = !1);
        if (!q) continue;
        let j = 0;
        for (
          let K = 3;
          K < 40 && !(c(tt + J * K, Z + X * K, -1e9, E) >= 0);
          K += 2.5
        ) {
          let nt = t.surfaceAt(tt + J * K, Z + X * K);
          if (nt === "road" || nt === "walk") {
            j = K;
            break;
          }
        }
        j &&
          w.push([
            E,
            L,
            U,
            G,
            W,
            V,
            J,
            X,
            $,
            H,
            N,
            GQ(e.seed[E], D) + ($ > 16 ? 0.4 : 0),
          ]);
      }
  }
  w.sort((E, R) => R[11] - E[11]);
  let _ = { s: 26, c: 2, n: 2, m: 26, h: 8, x: 5 },
    z = { s: 0, c: 0, n: 0, m: 0, h: 0, x: 0 };
  for (let [E, R, P, C, I, L, F, O, B, H, N] of w) {
    if (z[R] >= _[R]) continue;
    let D = (P + I) / 2,
      U = (C + L) / 2;
    if (
      S.some(
        (Z) =>
          Math.hypot(Z[0] - D, Z[1] - U) <
          (R === "s" ? 70 : R === "m" ? 45 : 120),
      )
    )
      continue;
    let G = Math.max(
        H,
        t.driveHeight(P + F * 1.5, C + O * 1.5),
        t.driveHeight(I + F * 1.5, L + O * 1.5),
      ),
      W = Math.min(B - 1.2, 26),
      V = W / 2,
      $ = Math.min(N - 1.3, G + 16) - (G + 0.6);
    if ((V > $ && ((V = $), (W = V * 2)), W < 7.5)) continue;
    let J = 0.5 - W / B / 2,
      X = 0.5 + W / B / 2;
    (S.push([D, U]), z[R]++);
    let tt =
      R === "c"
        ? a5t
        : R === "n"
          ? r5t
          : R === "m"
            ? z_[z.m % z_.length]
            : R === "h"
              ? DQ[z.h % DQ.length]
              : R === "x"
                ? UQ[z.x % UQ.length]
                : NQ[z.s % NQ.length];
    m.mural.push({
      ax: P + (I - P) * J + F * 0.06,
      az: C + (L - C) * J + O * 0.06,
      bx: P + (I - P) * X + F * 0.06,
      bz: C + (L - C) * X + O * 0.06,
      nx: F,
      nz: O,
      y0: G + 0.6,
      y1: G + 0.6 + V,
      cell: tt,
    });
  }
  let A = new Set(),
    T = 0;
  for (let E of o.edges) {
    let R = c5t[E.name];
    if (!(!R || E.inner || E.s1 - E.s0 < 6))
      for (let P = E.s0; P <= E.s1; P += 1.5) {
        Ot(E, P, u);
        for (let C of [1, -1])
          for (let I of [1.2, 2.6, 4.2]) {
            let L = u.x + u.nx * C * (u.w + I),
              F = u.z + u.nz * C * (u.w + I),
              O = c(L, F, -1e9);
            if (O < 0) continue;
            let B = r(O),
              H = B.length / 2,
              N = -1,
              D = 2.5;
            for (let st = 0; st < H; st++) {
              let ot = B[st * 2],
                rt = B[st * 2 + 1],
                lt = B[((st + 1) % H) * 2],
                ht = B[((st + 1) % H) * 2 + 1],
                pt = Math.hypot(lt - ot, ht - rt);
              if (
                pt < 1.6 ||
                Math.abs(((lt - ot) * u.dx + (ht - rt) * u.dz) / pt) < 0.7
              )
                continue;
              let ut = Math.max(
                  0,
                  Math.min(
                    1,
                    ((L - ot) * (lt - ot) + (F - rt) * (ht - rt)) / (pt * pt),
                  ),
                ),
                it = Math.hypot(
                  ot + (lt - ot) * ut - L,
                  rt + (ht - rt) * ut - F,
                );
              it < D && ((D = it), (N = st));
            }
            if (N < 0 || A.has(O * 4096 + N)) continue;
            A.add(O * 4096 + N);
            let U = B[N * 2],
              G = B[N * 2 + 1],
              W = B[((N + 1) % H) * 2],
              V = B[((N + 1) % H) * 2 + 1],
              $ = Math.hypot(W - U, V - G),
              J = -(V - G) / $,
              X = (W - U) / $;
            if ((u.x - (U + W) / 2) * J + (u.z - (G + V) / 2) * X < 0) continue;
            let tt = e.front.subarray(
                e.rStart[e.bRing[O]],
                e.rStart[e.bRing[O] + 1],
              ),
              Z = tt[N] === 1 && e.bB[O * 5] <= 1,
              q =
                Math.min(
                  t.driveHeight(U + J * 1.2, G + X * 1.2),
                  t.driveHeight(W + J * 1.2, V + X * 1.2),
                ) + 0.12,
              j = l(O),
              K = Math.min(j - 0.4, q + (Z ? 2.9 : 6.5));
            if (K - q < 2.2) continue;
            let nt = K - q,
              Q = 2 * nt,
              et = Math.max(1, Math.round($ / Q));
            if (!($ < 1.6))
              for (let st = 0; st < et; st++) {
                let ot = st / et,
                  rt = (st + 1) / et,
                  lt = $ / et;
                m.mural.push({
                  ax: U + (W - U) * ot + J * 0.07,
                  az: G + (V - G) * ot + X * 0.07,
                  bx: U + (W - U) * rt + J * 0.07,
                  bz: G + (V - G) * rt + X * 0.07,
                  nx: J,
                  nz: X,
                  y0: q,
                  y1: K,
                  cell: R[(T++ * 5 + O) % R.length],
                  uw: Math.min(1, lt / Q),
                  down: q + 0.02,
                });
              }
          }
      }
  }
  return m;
}
