// app 168 — math
// Lines 100425-100742 of readable/app.pretty.js (statement-aligned).
var ek = 1.3,
  qh = ek + 0.55;
function Ddt(i, t, e, s, n, o, a, r, l, c) {
  let h = e.y.length,
    f = (P) => e.pts[(P % h) * 2],
    u = (P) => e.pts[(P % h) * 2 + 1],
    d = (P) => e.y[P % h],
    p = 0,
    m = 0;
  for (let P = 0; P < h; P++) ((p += f(P)), (m += u(P)));
  ((p /= h), (m /= h));
  let g = Oy(n, 3.5),
    b = s.flat,
    x = s.ys;
  for (let P = 0; P < x.length; P++)
    g = Math.min(g, ik(c, b[P * 2], b[P * 2 + 1], x[P], t));
  for (let P of o)
    P.E.elev &&
      c?.probe &&
      (g = Math.min(g, nP(P.E, P.end === "a" ? P.E.s0 : P.E.s1, c)));
  t._dP = g;
  let v = Math.max(
      g,
      ...o
        .filter((P) => P.E.elev)
        .map((P) =>
          c?.probe ? nP(P.E, P.end === "a" ? P.E.s0 : P.E.s1, c) : g,
        ),
    ),
    y = [];
  for (let P = 0; P < h; P++) {
    let I = f(P),
      L = u(P),
      F = f(P + 1),
      N = u(P + 1),
      B = F - I,
      H = N - L,
      O = Math.hypot(B, H);
    if (O < 0.02) continue;
    let D = H / O,
      U = -B / O;
    D * ((I + F) / 2 - p) + U * ((L + N) / 2 - m) < 0 && ((D = -D), (U = -U));
    let G = a(I, L),
      q = a(F, N),
      W = G && G === q ? G : null,
      V = W ? 0 : r(I, L, F, N, d(P), d(P + 1), D, U) ? 1 : 2;
    y.push({
      ax: I,
      az: L,
      bx: F,
      bz: N,
      ya: d(P),
      yb: d(P + 1),
      nx: D,
      nz: U,
      len: O,
      kind: V,
      mouth: W,
      c: D * I + U * L,
    });
  }
  let M = y.length;
  if (M < 3) return;
  let S = (P, I, L) => {
      let F = Math.max(
        0,
        Math.min(
          1,
          ((I - P.ax) * (P.bx - P.ax) + (L - P.az) * (P.bz - P.az)) /
            (P.len * P.len),
        ),
      );
      return P.ya + (P.yb - P.ya) * F;
    },
    w = (P, I, L) => {
      let F = sP(s.tris, b, x, P, I);
      return F === null ? S(L, P, I) : F;
    },
    z = (P, I) => P.c - I,
    _ = (P, I, L, F, N) => {
      let B = P.nx * L.nz - P.nz * L.nx;
      if (Math.abs(B) < 0.05) return N;
      let H = z(P, I),
        O = z(L, F);
      return [(H * L.nz - P.nz * O) / B, (P.nx * O - H * L.nx) / B];
    },
    R = (P, I) => (P.kind === 2 ? I : 0),
    T = (P, I) => {
      let L = y[P],
        F = y[(P + M - 1) % M],
        N = y[(P + 1) % M],
        B = _(L, I, F, R(F, I), [L.ax - L.nx * I, L.az - L.nz * I]),
        H = _(L, I, N, R(N, I), [L.bx - L.nx * I, L.bz - L.nz * I]),
        O = (D, U, G) =>
          Math.hypot(D[0] - U, D[1] - G) > I + 3
            ? [U - L.nx * I, G - L.nz * I]
            : D;
      return [O(B, L.ax, L.az), O(H, L.bx, L.bz)];
    },
    E = [];
  for (let P = 0; P < h; P++) E.push([f(P), u(P)]);
  let A = (P) => {
    let I = y[P];
    return (
      I.len < qh ||
      (I.len < 2.5 &&
        y[(P + M - 1) % M].kind === 0 &&
        y[(P + 1) % M].kind === 0)
    );
  };
  for (let [P, I] of y.entries()) {
    if (I.kind !== 2 || A(P)) continue;
    let L = z(I, qh),
      F = [];
    for (let N = 0; N < E.length; N++) {
      let B = E[N],
        H = E[(N + 1) % E.length],
        O = L - (I.nx * B[0] + I.nz * B[1]),
        D = L - (I.nx * H[0] + I.nz * H[1]);
      if ((O >= 0 && F.push(B), O >= 0 != D >= 0)) {
        let U = O / (O - D);
        F.push([B[0] + (H[0] - B[0]) * U, B[1] + (H[1] - B[1]) * U]);
      }
    }
    if (((E = F), E.length < 3)) break;
  }
  if (i && E.length >= 3) {
    let P = E.map((I) => {
      let L = sP(s.tris, b, x, I[0], I[1]);
      return (L === null ? t.y : L) - g;
    });
    for (let I = 1; I + 1 < E.length; I++)
      sk(
        i,
        [E[0][0], P[0], E[0][1]],
        [E[I][0], P[I], E[I][1]],
        [E[I + 1][0], P[I + 1], E[I + 1][1]],
        cl,
        -1,
      );
  }
  let C = 0;
  for (let P = 0; P < M; P++) {
    let I = y[P],
      { ax: L, az: F, bx: N, bz: B, ya: H, yb: O, nx: D, nz: U, len: G } = I;
    if (I.kind === 0) {
      if (i && I.mouth.E.elev)
        for (let Q of [1, -1])
          $o(
            i,
            [L, H - 0.3, F],
            [N, O - 0.3, B],
            [N, O - v - 0.05, B],
            [L, H - v - 0.05, F],
            [0, 0],
            [G, 0],
            [G, v],
            [0, v],
            Pb,
            [D * Q, 0, U * Q],
          );
      continue;
    }
    if (I.kind === 1) {
      if (i) {
        $o(
          i,
          [L, H - 0.3, F],
          [N, O - 0.3, B],
          [N, O - g, B],
          [L, H - g, F],
          [0, 0],
          [G, 0],
          [G, g],
          [0, g],
          Cb,
          [D, 0, U],
        );
        let Q = [L - D * qh, F - U * qh],
          j = [N - D * qh, B - U * qh],
          X = w(Q[0], Q[1], I) - g,
          K = w(j[0], j[1], I) - g;
        (sk(i, [L, H - g, F], [N, O - g, B], [j[0], K, j[1]], cl, -1),
          sk(i, [L, H - g, F], [j[0], K, j[1]], [Q[0], X, Q[1]], cl, -1));
      }
      continue;
    }
    let [q, W] = T(P, -0.4),
      [V, Y] = T(P, ek),
      [$, st] = T(P, qh);
    if (i) {
      let Q = S(I, q[0], q[1]),
        j = S(I, W[0], W[1]);
      ($o(
        i,
        [N, O, B],
        [L, H, F],
        [L, H + 0.85, F],
        [N, O + 0.85, B],
        [0, 0],
        [G, 0],
        [G, 0.85],
        [0, 0.85],
        pr,
        [-D, 0, -U],
      ),
        Lb(
          i,
          [L, H + 0.85, F],
          [N, O + 0.85, B],
          [W[0], j + 0.85, W[1]],
          [q[0], Q + 0.85, q[1]],
          pr,
          !0,
        ),
        $o(
          i,
          [q[0], Q - 0.35, q[1]],
          [W[0], j - 0.35, W[1]],
          [W[0], j + 0.85, W[1]],
          [q[0], Q + 0.85, q[1]],
          [0, Q - 0.35],
          [G, j - 0.35],
          [G, j + 0.85],
          [0, Q + 0.85],
          Cb,
          [D, 0, U],
        ));
      let X = w(V[0], V[1], I),
        K = w(Y[0], Y[1], I),
        nt = w($[0], $[1], I),
        Z = w(st[0], st[1], I);
      $o(
        i,
        [q[0], Q - 0.35, q[1]],
        [W[0], j - 0.35, W[1]],
        [Y[0], K - 0.35, Y[1]],
        [V[0], X - 0.35, V[1]],
        [0, 0],
        [G, 0],
        [G, 1.7],
        [0, 1.7],
        cl,
        [0, -1, 0],
      );
      let et = Math.hypot(qh - ek, g - 0.35),
        tt = [(D * (g - 0.35)) / et, -(qh - ek) / et, (U * (g - 0.35)) / et];
      ($o(
        i,
        [V[0], X - 0.35, V[1]],
        [Y[0], K - 0.35, Y[1]],
        [st[0], Z - g, st[1]],
        [$[0], nt - g, $[1]],
        [0, 0],
        [G, 0],
        [G, et],
        [0, et],
        cl,
        tt,
      ),
        I0(n) ||
          nV(
            i,
            t,
            C,
            C + G,
            [L + D * 0.2, H, F + U * 0.2],
            [N + D * 0.2, O, B + U * 0.2],
            1,
            D,
            U,
            !1,
          ));
    }
    ((C += G),
      l &&
        G > 0.2 &&
        l.push({
          t: "obb",
          x: (L + N) / 2 + D * 0.2,
          z: (F + B) / 2 + U * 0.2,
          hx: 0.25,
          hz: G / 2 + 0.05,
          c: (B - F) / G,
          s: (N - L) / G,
          y0: Math.min(H, O) - 0.5,
          y1: Math.max(H, O) + 1.2,
          rail: !0,
        }));
  }
}
function sk(i, t, e, s, n, o) {
  let a = (e[2] - t[2]) * (s[0] - t[0]) - (e[0] - t[0]) * (s[2] - t[2]),
    r = a >= 0,
    l = i.v,
    c = [0, o, 0];
  for (let h of r === o > 0 ? [t, e, s] : [t, s, e])
    i.vert(h[0], h[1], h[2], c[0], c[1], c[2], h[0], h[2], n);
  i.tri(l, l + 1, l + 2);
}
function sP(i, t, e, s, n) {
  for (let [o, a, r] of i) {
    let l = t[o * 2],
      c = t[o * 2 + 1],
      h = t[a * 2],
      f = t[a * 2 + 1],
      u = t[r * 2],
      d = t[r * 2 + 1],
      p = (f - d) * (l - u) + (u - h) * (c - d);
    if (Math.abs(p) < 1e-9) continue;
    let m = ((f - d) * (s - u) + (u - h) * (n - d)) / p,
      g = ((d - c) * (s - u) + (l - u) * (n - d)) / p,
      b = 1 - m - g;
    if (m >= -1e-5 && g >= -1e-5 && b >= -1e-5)
      return m * e[o] + g * e[a] + b * e[r];
  }
  return null;
}
