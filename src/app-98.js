// app 98 — math
// Lines 77966-78195 of readable/app.pretty.js (statement-aligned).
function IW(i, t, e, s = 0.15) {
  let n = i.trench;
  if (!n || !n.F) return;
  let { N: o, F: a, br: r, yDeck: l } = n,
    c = [0, 1, 0],
    h = (g, b, x, v, y, M) =>
      t.quad(g, b, x, v, [0, 0], [1, 0], [1, 1], [0, 1], y, M),
    f = r.W[0] + 0.4 + 2.8,
    u = {};
  vs(r, Dh[0], Dh[1], u);
  let d = u.dx,
    p = u.dz,
    m =
      Math.abs(d * Hh[0] + p * Hh[1]) > 0.3
        ? f / Math.abs(d * Hh[0] + p * Hh[1])
        : f;
  for (let g = 0; g < 2; g++) {
    let b = g ? 1 : -1,
      x = o[g],
      v = a[g],
      y = [Hh[0] * b, 0, Hh[1] * b],
      M = [-y[0], 0, -y[2]],
      S = (E) => Kn(x.v, E) + b * (Kn(x.w, E) + fft),
      w = (E) => Kn(x.y, E),
      z = (E) => Math.max(Kn(v.y, E) + s, w(E)),
      _ = (E, A, C) => {
        let [P, I] = em(E, S(E) + b * A);
        return [P, C, I];
      },
      R = null,
      T = () => {
        if (!R || R[1] - R[0] < 4) {
          R = null;
          return;
        }
        let [E, A] = R,
          C = (E + A) / 2,
          P = em(E, S(E) + b * 0.15),
          I = em(A, S(A) + b * 0.15),
          L = (P[0] + I[0]) / 2,
          F = (P[1] + I[1]) / 2,
          N = I[0] - P[0],
          B = I[1] - P[1],
          H = Math.hypot(N, B),
          O = Math.abs(C) < m + 0.5;
        (e.push({
          t: "obb",
          x: L,
          z: F,
          hx: 0.22,
          hz: H / 2 + 0.05,
          c: B / H,
          s: N / H,
          wall: !0,
          y0: Math.min(w(E), w(A)) - 1,
          y1: O ? l - 1.9 : Math.max(z(E), z(A)) + 1.1,
        }),
          (R = null));
      };
    for (let E = Ur + 2; E < C0 - 2; E += 2) {
      let A = E + 2,
        C = z(E) - w(E),
        P = z(A) - w(A);
      if (Math.min(C, P) < 0.25) {
        T();
        continue;
      }
      let I = z(E),
        L = z(A);
      h(
        _(E, 0, w(E) - 0.1),
        _(A, 0, w(A) - 0.1),
        _(A, 0, w(A) + 0.9),
        _(E, 0, w(E) + 0.9),
        pft,
        M,
      );
      let F = Math.floor((E + 1e3) / 6),
        N = 0.86 + (0.22 * (((F * 2654435761) >>> 0) % 1e3)) / 1e3,
        B = [e7[0] * N, e7[1] * N, e7[2] * N, 0];
      if (
        (h(
          _(E, 0, w(E) + 0.9),
          _(A, 0, w(A) + 0.9),
          _(A, 0, L + 0.08),
          _(E, 0, I + 0.08),
          B,
          M,
        ),
        Math.floor((A + 1e3) / 6) !== F)
      ) {
        let H = Math.floor((A + 1e3) / 6) * 6 - 1e3;
        h(
          _(H - 0.04, -0.01, w(H) - 0.1),
          _(H + 0.04, -0.01, w(H) - 0.1),
          _(H + 0.04, -0.01, z(H) + 0.08),
          _(H - 0.04, -0.01, z(H) + 0.08),
          mft,
          M,
        );
      }
      if (
        (h(
          _(E, -0.12, I + 0.08),
          _(A, -0.12, L + 0.08),
          _(A, -0.12, L + 0.3),
          _(E, -0.12, I + 0.3),
          py,
          M,
        ),
        h(
          _(E, -0.12, I + 0.3),
          _(A, -0.12, L + 0.3),
          _(A, 0.4, L + 0.3),
          _(E, 0.4, I + 0.3),
          py,
          c,
        ),
        h(
          _(A, 0.4, L + 0.3),
          _(E, 0.4, I + 0.3),
          _(E, 0.4, I - 0.1),
          _(A, 0.4, L - 0.1),
          py,
          y,
        ),
        Math.abs(E + 1) > m + 0.5)
      ) {
        for (let D of [1.05, 0.55])
          h(
            _(E, 0.2, I + 0.3 + D),
            _(A, 0.2, L + 0.3 + D),
            _(A, 0.2, L + 0.3 + D + 0.05),
            _(E, 0.2, I + 0.3 + D + 0.05),
            s7,
            M,
          );
        let H = _(E, 0.17, I + 0.3),
          O = _(E, 0.23, I + 0.3);
        h(H, O, [O[0], I + 1.4, O[2]], [H[0], I + 1.4, H[2]], s7, M);
      }
      ((R = R ? [R[0], A] : [E, A]),
        (R[1] - R[0] >= 8 || Math.abs(A) < m + 1 != Math.abs(E) < m + 1) &&
          T());
    }
    T();
  }
  {
    let g = [];
    for (let b = 0; b <= r.L + 0.01; b += 2)
      (Ot(r, Math.min(b, r.L), u), g.push([u.x, u.z, u.y, u.nx, u.nz, u.w]));
    for (let b of [-1, 1])
      for (let x = 0; x + 1 < g.length; x++) {
        let [v, y, M, S, w, z] = g[x],
          [_, R, T, E, A, C] = g[x + 1],
          P = (j, X, K) => [j[0] + j[3] * X * b, K, j[1] + j[4] * X * b],
          I = g[x],
          L = g[x + 1],
          F = z + 0.4,
          N = z + 3.2,
          B = C + 0.4,
          H = C + 3.2,
          O = [S * b, 0, w * b],
          D = [-S * b, 0, -w * b];
        (b > 0
          ? (j, X, K, nt) => h(j, X, K, nt, PW, c)
          : (j, X, K, nt) => h(X, j, nt, K, PW, c))(
          P(I, F, M + 0.2),
          P(L, B, T + 0.2),
          P(L, H, T + 0.2),
          P(I, N, M + 0.2),
        );
        let G =
          b > 0
            ? [
                P(L, H, T - 1.6),
                P(I, N, M - 1.6),
                P(I, N, M + 0.2),
                P(L, H, T + 0.2),
              ]
            : [
                P(I, N, M - 1.6),
                P(L, H, T - 1.6),
                P(L, H, T + 0.2),
                P(I, N, M + 0.2),
              ];
        h(...G, py, O);
        let q = [
          P(I, F, M - 1.6),
          P(I, N, M - 1.6),
          P(L, H, T - 1.6),
          P(L, B, T - 1.6),
        ];
        h(
          ...(b > 0 ? q : q.slice().reverse()),
          [0.3, 0.3, 0.29, 0],
          [0, -1, 0],
        );
        let W = P(I, N - 0.15, M + 0.35),
          V = P(L, H - 0.15, T + 0.35);
        (h(W, V, [V[0], T + 1.35, V[2]], [W[0], M + 1.35, W[2]], gft, O),
          h(
            P(I, N - 0.25, M + 0.2),
            P(L, H - 0.25, T + 0.2),
            P(L, H - 0.25, T + 0.35),
            P(I, N - 0.25, M + 0.35),
            py,
            D,
          ));
        let Y = P(I, N - 0.15, M + 1.35),
          $ = P(L, H - 0.15, T + 1.35);
        h(Y, $, [$[0], T + 1.45, $[2]], [Y[0], M + 1.45, Y[2]], s7, O);
        let st = Math.hypot(_ - v, R - y),
          Q = P([(v + _) / 2, (y + R) / 2, 0, S, w], N - 0.15, 0);
        st > 0.2 &&
          e.push({
            t: "obb",
            x: Q[0],
            z: Q[2],
            hx: 0.2,
            hz: st / 2 + 0.05,
            c: (R - y) / st,
            s: (_ - v) / st,
            y0: Math.min(M, T) - 0.5,
            y1: Math.max(M, T) + 1.5,
            rail: !0,
          });
      }
  }
}
