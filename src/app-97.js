// app 97 — math
// Lines 78202-78431 of readable/app.pretty.js (statement-aligned).
function Oq(o, t, e, s = 0.15) {
  let n = o.trench;
  if (!n || !n.F) return;
  let { N: i, F: a, br: r, yDeck: l } = n,
    c = [0, 1, 0],
    h = (g, b, v, x, y, M) =>
      t.quad(g, b, v, x, [0, 0], [1, 0], [1, 1], [0, 1], y, M),
    f = r.W[0] + 0.4 + 2.8,
    u = {};
  ys(r, gf[0], gf[1], u);
  let d = u.dx,
    p = u.dz,
    m =
      Math.abs(d * mf[0] + p * mf[1]) > 0.3
        ? f / Math.abs(d * mf[0] + p * mf[1])
        : f;
  for (let g = 0; g < 2; g++) {
    let b = g ? 1 : -1,
      v = i[g],
      x = a[g],
      y = [mf[0] * b, 0, mf[1] * b],
      M = [-y[0], 0, -y[2]],
      S = (E) => ei(v.v, E) + b * (ei(v.w, E) + Lpt),
      w = (E) => ei(v.y, E),
      _ = (E) => Math.max(ei(x.y, E) + s, w(E)),
      z = (E, R, P) => {
        let [C, I] = Um(E, S(E) + b * R);
        return [C, P, I];
      },
      A = null,
      T = () => {
        if (!A || A[1] - A[0] < 4) {
          A = null;
          return;
        }
        let [E, R] = A,
          P = (E + R) / 2,
          C = Um(E, S(E) + b * 0.15),
          I = Um(R, S(R) + b * 0.15),
          L = (C[0] + I[0]) / 2,
          F = (C[1] + I[1]) / 2,
          O = I[0] - C[0],
          B = I[1] - C[1],
          H = Math.hypot(O, B),
          N = Math.abs(P) < m + 0.5;
        (e.push({
          t: "obb",
          x: L,
          z: F,
          hx: 0.22,
          hz: H / 2 + 0.05,
          c: B / H,
          s: O / H,
          wall: !0,
          y0: Math.min(w(E), w(R)) - 1,
          y1: N ? l - 1.9 : Math.max(_(E), _(R)) + 1.1,
        }),
          (A = null));
      };
    for (let E = a0 + 2; E < el - 2; E += 2) {
      let R = E + 2,
        P = _(E) - w(E),
        C = _(R) - w(R);
      if (Math.min(P, C) < 0.25) {
        T();
        continue;
      }
      let I = _(E),
        L = _(R);
      h(
        z(E, 0, w(E) - 0.1),
        z(R, 0, w(R) - 0.1),
        z(R, 0, w(R) + 0.9),
        z(E, 0, w(E) + 0.9),
        Opt,
        M,
      );
      let F = Math.floor((E + 1e3) / 6),
        O = 0.86 + (0.22 * (((F * 2654435761) >>> 0) % 1e3)) / 1e3,
        B = [PP[0] * O, PP[1] * O, PP[2] * O, 0];
      if (
        (h(
          z(E, 0, w(E) + 0.9),
          z(R, 0, w(R) + 0.9),
          z(R, 0, L + 0.08),
          z(E, 0, I + 0.08),
          B,
          M,
        ),
        Math.floor((R + 1e3) / 6) !== F)
      ) {
        let H = Math.floor((R + 1e3) / 6) * 6 - 1e3;
        h(
          z(H - 0.04, -0.01, w(H) - 0.1),
          z(H + 0.04, -0.01, w(H) - 0.1),
          z(H + 0.04, -0.01, _(H) + 0.08),
          z(H - 0.04, -0.01, _(H) + 0.08),
          Bpt,
          M,
        );
      }
      if (
        (h(
          z(E, -0.12, I + 0.08),
          z(R, -0.12, L + 0.08),
          z(R, -0.12, L + 0.3),
          z(E, -0.12, I + 0.3),
          lw,
          M,
        ),
        h(
          z(E, -0.12, I + 0.3),
          z(R, -0.12, L + 0.3),
          z(R, 0.4, L + 0.3),
          z(E, 0.4, I + 0.3),
          lw,
          c,
        ),
        h(
          z(R, 0.4, L + 0.3),
          z(E, 0.4, I + 0.3),
          z(E, 0.4, I - 0.1),
          z(R, 0.4, L - 0.1),
          lw,
          y,
        ),
        Math.abs(E + 1) > m + 0.5)
      ) {
        for (let D of [1.05, 0.55])
          h(
            z(E, 0.2, I + 0.3 + D),
            z(R, 0.2, L + 0.3 + D),
            z(R, 0.2, L + 0.3 + D + 0.05),
            z(E, 0.2, I + 0.3 + D + 0.05),
            CP,
            M,
          );
        let H = z(E, 0.17, I + 0.3),
          N = z(E, 0.23, I + 0.3);
        h(H, N, [N[0], I + 1.4, N[2]], [H[0], I + 1.4, H[2]], CP, M);
      }
      ((A = A ? [A[0], R] : [E, R]),
        (A[1] - A[0] >= 8 || Math.abs(R) < m + 1 != Math.abs(E) < m + 1) &&
          T());
    }
    T();
  }
  {
    let g = [];
    for (let b = 0; b <= r.L + 0.01; b += 2)
      (Ot(r, Math.min(b, r.L), u), g.push([u.x, u.z, u.y, u.nx, u.nz, u.w]));
    for (let b of [-1, 1])
      for (let v = 0; v + 1 < g.length; v++) {
        let [x, y, M, S, w, _] = g[v],
          [z, A, T, E, R, P] = g[v + 1],
          C = (q, j, K) => [q[0] + q[3] * j * b, K, q[1] + q[4] * j * b],
          I = g[v],
          L = g[v + 1],
          F = _ + 0.4,
          O = _ + 3.2,
          B = P + 0.4,
          H = P + 3.2,
          N = [S * b, 0, w * b],
          D = [-S * b, 0, -w * b];
        (b > 0
          ? (q, j, K, nt) => h(q, j, K, nt, Lq, c)
          : (q, j, K, nt) => h(j, q, nt, K, Lq, c))(
          C(I, F, M + 0.2),
          C(L, B, T + 0.2),
          C(L, H, T + 0.2),
          C(I, O, M + 0.2),
        );
        let G =
          b > 0
            ? [
                C(L, H, T - 1.6),
                C(I, O, M - 1.6),
                C(I, O, M + 0.2),
                C(L, H, T + 0.2),
              ]
            : [
                C(I, O, M - 1.6),
                C(L, H, T - 1.6),
                C(L, H, T + 0.2),
                C(I, O, M + 0.2),
              ];
        h(...G, lw, N);
        let W = [
          C(I, F, M - 1.6),
          C(I, O, M - 1.6),
          C(L, H, T - 1.6),
          C(L, B, T - 1.6),
        ];
        h(
          ...(b > 0 ? W : W.slice().reverse()),
          [0.3, 0.3, 0.29, 0],
          [0, -1, 0],
        );
        let V = C(I, O - 0.15, M + 0.35),
          $ = C(L, H - 0.15, T + 0.35);
        (h(V, $, [$[0], T + 1.35, $[2]], [V[0], M + 1.35, V[2]], Npt, N),
          h(
            C(I, O - 0.25, M + 0.2),
            C(L, H - 0.25, T + 0.2),
            C(L, H - 0.25, T + 0.35),
            C(I, O - 0.25, M + 0.35),
            lw,
            D,
          ));
        let J = C(I, O - 0.15, M + 1.35),
          X = C(L, H - 0.15, T + 1.35);
        h(J, X, [X[0], T + 1.45, X[2]], [J[0], M + 1.45, J[2]], CP, N);
        let tt = Math.hypot(z - x, A - y),
          Z = C([(x + z) / 2, (y + A) / 2, 0, S, w], O - 0.15, 0);
        tt > 0.2 &&
          e.push({
            t: "obb",
            x: Z[0],
            z: Z[2],
            hx: 0.2,
            hz: tt / 2 + 0.05,
            c: (A - y) / tt,
            s: (z - x) / tt,
            y0: Math.min(M, T) - 0.5,
            y1: Math.max(M, T) + 1.5,
            rail: !0,
          });
      }
  }
}
