// app 89 — solid
// Lines 74398-75524 of readable/app.pretty.js (statement-aligned).
function fq(o, { mobile: t = !1 } = {}) {
  let e = new nh(),
    s = new nh(),
    n = new Bu(2048, 512),
    i = e.R("fmn"),
    a = s.R("fmf"),
    r = o.yAt,
    l = mpt(34),
    c = {
      us: n.add("fm_us", 190, 100, Ek("us")),
      ca: n.add("fm_ca", 190, 100, Ek("ca")),
      red: n.add("fm_red", 190, 100, Ek("#a82222")),
      navy: n.add("fm_navy", 190, 100, Ek("#1d2a55")),
    },
    h = {
      fmc: n.word("FORT MASON CENTER", {
        font: "bold 120px Georgia, serif",
        h: 140,
        color: "#fff",
        spacing: 18,
      }),
      cowell: n.word("COWELL THEATER", {
        font: "110px Georgia, serif",
        h: 130,
        color: "#fff",
        spacing: 6,
      }),
      fest: n.word("FESTIVAL PAVILION", {
        font: "110px Georgia, serif",
        h: 130,
        color: "#fff",
        spacing: 6,
      }),
    },
    f = (m, g) =>
      g < -1322 && m < -3200 && m > -3450 && !(m > -3240 && g > -1340),
    u = (m, g) =>
      f(m, g)
        ? cc("deck", [0.95, 0.94, 0.92])
        : cc("asphalt", [0.92, 0.93, 0.96]),
    d = nw(o.flat);
  (cq(i.atlas, d, r, u, 6), cq(a.atlas, d, r, u, 14));
  let p = o.ring;
  for (let [m, g] of [
    [i, !0],
    [a, !1],
  ]) {
    let b = 0;
    for (let v = 0; v + 1 < p.length; v++) {
      let x = p[v],
        y = p[v + 1],
        M = Math.hypot(y[0] - x[0], y[1] - x[1]);
      if (M < 0.05) continue;
      let S = df(o.flat, x, y),
        w = [x[0] + S[0] * 0.2, x[1] + S[1] * 0.2],
        _ = [y[0] + S[0] * 0.2, y[1] + S[1] * 0.2],
        z = Math.min(r(...x), r(...y));
      kl(m.solid, w, _, S, z - 1, z + 0.02, Bs.concDk);
      {
        let L = [x[0] - S[0] * 0.9, x[1] - S[1] * 0.9],
          F = [y[0] - S[0] * 0.9, y[1] - S[1] * 0.9];
        kl(m.solid, L, F, S, -1.5, z - 0.9, Bs.dark);
      }
      if (!g) continue;
      if ((x[1] + y[1]) / 2 < -1420 && Math.abs((y[0] - x[0]) / M) > 0.7)
        for (let L = 0.3; L < M; L += 0.62) {
          let F = x[0] + ((y[0] - x[0]) * L) / M + S[0] * 0.45,
            O = x[1] + ((y[1] - x[1]) * L) / M + S[1] * 0.45;
          os(m.solid, F, O, 0.21, -3, r(F, O) - 0.05, 5, Bs.fender);
        }
      else
        for (let L = (3.2 - (b % 3.2)) % 3.2; L < M; L += 3.2) {
          let F = x[0] + ((y[0] - x[0]) * L) / M - S[0] * 0.15,
            O = x[1] + ((y[1] - x[1]) * L) / M - S[1] * 0.15;
          (os(m.solid, F, O, 0.3, -3, r(F, O) - 1, 6, Bs.pile),
            Ou(F + S[0] * 0.3, O + S[1] * 0.3, 0.35));
        }
      b += M;
      let T = [x[0] - S[0] * 0.12, x[1] - S[1] * 0.12],
        E = [y[0] - S[0] * 0.12, y[1] - S[1] * 0.12],
        R = r(...x),
        P = r(...y);
      rs(
        m.solid,
        [T[0], R + 0.12, T[1]],
        [E[0], P + 0.12, E[1]],
        0.3,
        0.26,
        Bs.timber,
      );
      let C = [x[0] - S[0] * 0.4, x[1] - S[1] * 0.4],
        I = [y[0] - S[0] * 0.4, y[1] - S[1] * 0.4];
      M > 0.6 &&
        (rs(
          m.solid,
          [C[0], R + 1.05, C[1]],
          [I[0], P + 1.05, I[1]],
          0.05,
          0.05,
          Bs.rail,
        ),
        rs(
          m.solid,
          [C[0], R + 0.6, C[1]],
          [I[0], P + 0.6, I[1]],
          0.04,
          0.04,
          Bs.rail,
        ));
      for (let L = 0; L < M; L += 2.4) {
        let F = C[0] + ((I[0] - C[0]) * L) / M,
          O = C[1] + ((I[1] - C[1]) * L) / M;
        os(m.solid, F, O, 0.03, r(F, O), r(F, O) + 1.07, 4, Bs.rail);
      }
      for (let L = 5; L < M - 2; L += 14) {
        let F = x[0] + ((y[0] - x[0]) * L) / M - S[0] * 0.75,
          O = x[1] + ((y[1] - x[1]) * L) / M - S[1] * 0.75,
          B = r(F, O);
        Ws(
          m.solid,
          F,
          O,
          [
            [0.24, B],
            [0.2, B + 0.12],
            [0.15, B + 0.42],
            [0.27, B + 0.52],
            [0.25, B + 0.62],
            [0.01, B + 0.64],
          ],
          8,
          Bs.red,
        );
      }
    }
  }
  {
    let m = i.solid,
      g = Bs.paintW,
      b = (x, y, M, S, w) => {
        let _ = Math.hypot(M - x, S - y),
          z = ((-(S - y) / _) * w) / 2,
          A = (((M - x) / _) * w) / 2,
          T = r(x, y) + 0.025,
          E = r(M, S) + 0.025;
        $i(
          m,
          [
            [x - z, T, y - A],
            [M - z, E, S - A],
            [M + z, E, S + A],
            [x + z, T, y + A],
          ],
          g,
        );
      };
    for (let x of o.stalls)
      for (let y of [-1.3, 1.3]) {
        let M = x.x + x.u[0] * y,
          S = x.z + x.u[1] * y;
        b(
          M - x.v[0] * 2.65,
          S - x.v[1] * 2.65,
          M + x.v[0] * 2.5,
          S + x.v[1] * 2.5,
          0.11,
        );
      }
    let v = [
      [-3195, -1318],
      [-3239, -1310],
      [-3296, -1301],
      [-3337, -1294],
      [-3388, -1287],
    ];
    for (let x = 0; x + 1 < v.length; x++) {
      let [y, M] = v[x],
        [S, w] = v[x + 1],
        _ = Math.hypot(S - y, w - M),
        z = -(w - M) / _,
        A = (S - y) / _;
      for (let T of [-3.3, 3.3])
        b(y + z * T, M + A * T, S + z * T, w + A * T, 0.12);
      for (let T = 0; T < _ - 2; T += 6)
        b(
          y + ((S - y) * T) / _,
          M + ((w - M) * T) / _,
          y + ((S - y) * (T + 2.5)) / _,
          M + ((w - M) * (T + 2.5)) / _,
          0.1,
        );
    }
  }
  for (let m of o.sheds) {
    let { c: g, d: b, hl: v, hw: x } = m.o,
      y = [-b[1], b[0]],
      M = m.y,
      S = m.He,
      w = zP["gable" + m.n] || zP.gable2,
      _ = (w[0] + w[w.length - 1]) / 2 || 0.62,
      z = S / _,
      A = Math.max(...w) * z,
      T = (P, C) => [g[0] + b[0] * P + y[0] * C, g[1] + b[1] * P + y[1] * C],
      E = -v,
      R = v;
    for (let [P, C] of [
      [i, !0],
      [a, !1],
    ]) {
      for (let D of [-1, 1])
        kl(
          P.atlas,
          T(E, D * x),
          T(R, D * x),
          [y[0] * D, y[1] * D],
          M - 0.3,
          M + S,
          cc("shed_side"),
          0,
          M,
        );
      for (let [D, U] of [
        [E, -1],
        [R, 1],
      ]) {
        let G = [b[0] * U, b[1] * U],
          W = T(D, -x),
          V = T(D, x),
          $ = C ? w.length - 1 : 12;
        for (let J = 0; J < $; J++) {
          let X = J / $,
            tt = (J + 1) / $,
            Z = iw(w, X),
            q = iw(w, tt);
          lq(
            P.atlas,
            W,
            V,
            G,
            M - 0.3,
            z,
            cc("gable" + m.n, [1, 1, 1], U < 0),
            X,
            tt,
            Z,
            q,
          );
        }
      }
      let I = m.rise,
        L = Math.min(4.2, x * 0.3),
        F = E + 7,
        O = R - 5,
        B = (D) => M + S + I * (1 - Math.abs(D) / x);
      for (let D of [-1, 1]) {
        let U = T(E + 0.3, D * (x + 0.25)),
          G = T(R - 0.3, D * (x + 0.25)),
          W = T(E + 0.3, 0),
          V = T(R - 0.3, 0);
        if (
          (Ms(
            P.solid,
            [U[0], M + S - 0.08, U[1]],
            [G[0], M + S - 0.08, G[1]],
            [V[0], M + S + I, V[1]],
            [W[0], M + S + I, W[1]],
            Bs.roof,
            [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
          ),
          C &&
            rs(
              P.solid,
              [U[0], M + S - 0.15, U[1]],
              [G[0], M + S - 0.15, G[1]],
              0.18,
              0.3,
              Bs.red,
            ),
          m.n === "2" && C)
        )
          for (let $ = F + 2; $ < O - 8; $ += 9.2) {
            let J = D * (L + 0.8),
              X = D * (x - 1.4),
              tt = [T($, J), T($ + 8.6, J), T($ + 8.6, X), T($, X)];
            Ms(
              P.solid,
              [tt[0][0], B(J) + 0.18, tt[0][1]],
              [tt[1][0], B(J) + 0.18, tt[1][1]],
              [tt[2][0], B(X) + 0.18, tt[2][1]],
              [tt[3][0], B(X) + 0.18, tt[3][1]],
              Bs.solar,
              [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
            );
          }
      }
      let H = B(L),
        N = H + 1.9;
      for (let D of [-1, 1]) {
        let U = T(F, D * L),
          G = T(O, D * L),
          W = [y[0] * D, y[1] * D];
        if (
          (kl(P.solid, U, G, W, H - 0.4, H + 0.35, Bs.cream),
          kl(P.solid, U, G, W, H + 0.35, N - 0.25, Bs.glass),
          kl(P.solid, U, G, W, N - 0.25, N, Bs.red),
          C)
        ) {
          let tt = [W[0] * 0.04, W[1] * 0.04];
          for (let Z = F + 0.55; Z < O; Z += 1.1) {
            let q = T(Z, D * L);
            Vs(
              P.solid,
              q[0] + tt[0],
              q[1] + tt[1],
              b[0],
              b[1],
              0.05,
              0.05,
              H + 0.35,
              N - 0.25,
              Bs.red,
            );
          }
        }
        let V = T(F - 0.4, D * (L + 0.5)),
          $ = T(O + 0.4, D * (L + 0.5)),
          J = T(F - 0.4, 0),
          X = T(O + 0.4, 0);
        Ms(
          P.solid,
          [V[0], N - 0.05, V[1]],
          [$[0], N - 0.05, $[1]],
          [X[0], N + 0.75, X[1]],
          [J[0], N + 0.75, J[1]],
          Bs.redDk,
          [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
        );
      }
      for (let [D, U] of [
        [F, -1],
        [O, 1],
      ]) {
        let G = T(D, -L),
          W = T(D, L),
          V = [b[0] * U, b[1] * U],
          $ = T(D, 0);
        (kl(P.solid, G, W, V, H - 0.4, N, Bs.cream),
          Y0(
            P.solid,
            [G[0], N, G[1]],
            [W[0], N, W[1]],
            [$[0], N + 0.75, $[1]],
            Bs.cream,
            [$[0] + V[0] * 20, N, $[1] + V[1] * 20],
          ));
      }
      if (C) {
        for (let D = F + 4; D < O - 2; D += 11) {
          let U = T(D, 0);
          Ws(
            P.solid,
            U[0],
            U[1],
            [
              [0.32, N + 0.6],
              [0.32, N + 1.2],
              [0.45, N + 1.35],
              [0.42, N + 1.75],
              [0.05, N + 1.95],
            ],
            8,
            Bs.copper,
          );
        }
        for (let D = E + 12; D < R - 6; D += 23)
          for (let U of [-1, 1]) {
            let G = T(D, U * x * 0.62);
            (os(
              P.solid,
              G[0],
              G[1],
              0.22,
              B(x * 0.62) - 0.2,
              B(x * 0.62) + 0.7,
              6,
              Bs.red,
            ),
              os(
                P.solid,
                G[0],
                G[1],
                0.32,
                B(x * 0.62) + 0.7,
                B(x * 0.62) + 0.85,
                6,
                Bs.red,
              ));
          }
        for (let [D, U] of [
          [E, -1],
          [R, 1],
        ]) {
          let G = [b[0] * U, b[1] * U],
            W = w.length - 1;
          for (let V = 0; V < W; V++) {
            let $ = T(D + U * 0.12, -x + (2 * x * V) / W),
              J = T(D + U * 0.12, -x + (2 * x * (V + 1)) / W);
            rs(
              P.solid,
              [
                $[0] + G[0] * 0.06,
                M - 0.3 + iw(w, V / W) * z,
                $[1] + G[1] * 0.06,
              ],
              [
                J[0] + G[0] * 0.06,
                M - 0.3 + iw(w, (V + 1) / W) * z,
                J[1] + G[1] * 0.06,
              ],
              0.32,
              0.12,
              Bs.cream,
            );
          }
          for (let V of [0.2, 0.4, 0.6, 0.8]) {
            let $ = T(D + U * 0.12, -x + 2 * x * V);
            Vs(
              P.solid,
              $[0] + G[0] * 0.1,
              $[1] + G[1] * 0.1,
              y[0],
              y[1],
              0.12,
              0.1,
              M + S * 0.66,
              M + S * 0.66 + 0.35,
              Bs.lamp,
            );
          }
          for (let V of [0.1, 0.9]) {
            let $ = T(D + U * 0.12, -x + 2 * x * V);
            Vs(
              P.solid,
              $[0] + G[0] * 0.1,
              $[1] + G[1] * 0.1,
              y[0],
              y[1],
              0.12,
              0.1,
              M + 3.4,
              M + 3.75,
              Bs.lamp,
            );
          }
        }
        for (let D of [-1, 1])
          for (let U = E + 3; U < R - 1; U += 6.5) {
            let G = T(U, D * (x + 0.12));
            if (
              (Vs(
                P.solid,
                G[0],
                G[1],
                b[0],
                b[1],
                0.14,
                0.09,
                M + 0.05,
                M + 0.32,
                Bs.lamp,
              ),
              Math.round((U - E) / 6.5) % 2 === 0)
            ) {
              let W = T(U + 2.1, D * (x + 0.1));
              Vs(
                P.solid,
                W[0],
                W[1],
                b[0],
                b[1],
                0.1,
                0.09,
                M + 5.6,
                M + 5.85,
                Bs.lamp,
              );
            }
          }
        if (m.n !== "1") {
          let D = T(E - 0.4, 0);
          for (let [J, X, tt] of [
            [0, "us", 9],
            [-0.86, m.n === "2" ? "red" : "ca", 7],
            [0.86, "navy", 7],
          ]) {
            let Z = T(E - 0.4, x * J),
              q = M - 0.3 + iw(w, (J + 1) / 2) * z;
            (os(P.solid, Z[0], Z[1], 0.06, q, q + tt, 5, Bs.white),
              Ws(
                P.solid,
                Z[0],
                Z[1],
                [
                  [0.01, q + tt],
                  [0.1, q + tt + 0.1],
                  [0.01, q + tt + 0.2],
                ],
                6,
                Bs.bronze,
              ));
            let j = Z[0] + y[0] * 0.95,
              K = Z[1] + y[1] * 0.95;
            (ri(
              P.text,
              n,
              c[X],
              j,
              q + tt - 0.65,
              K,
              b[0] * -1,
              b[1] * -1,
              1.8,
              0.95,
              Za(!1),
            ),
              ri(
                P.text,
                n,
                c[X],
                j,
                q + tt - 0.65,
                K,
                b[0],
                b[1],
                1.8,
                0.95,
                Za(!1),
              ));
          }
          let U = m.n === "2" ? h.cowell : h.fest,
            G = [-b[0], -b[1]],
            W = m.n === "2" ? 0.78 : 0.5,
            V = T(E - 0.08, -x + 2 * x * W),
            $ = m.n === "2" ? 3.8 : 6.5;
          ri(
            P.text,
            n,
            U,
            V[0],
            M + S * (m.n === "2" ? 0.57 : 0.55),
            V[1],
            G[0],
            G[1],
            $,
            $ / U.aspect,
            xo([0.12, 0.1, 0.08], !1),
          );
        } else {
          let D = y[0] > 0 ? 1 : -1,
            U = T(0, D * (x + 0.06)),
            G = [y[0] * D, y[1] * D],
            W = Math.min(70, v * 1.1);
          ri(
            P.text,
            n,
            h.fmc,
            U[0],
            M + S - 1.4,
            U[1],
            G[0],
            G[1],
            W,
            2.2,
            xo([0.16, 0.12, 0.1], !1),
          );
        }
        for (let D of [-1, 1])
          for (let U of [E + v * 0.55, E + v * 1.45])
            hq(
              P.solid,
              T(U, D * (x + 0.7)),
              b,
              [y[0] * D, y[1] * D],
              M,
              S - 1.2,
            );
      }
    }
  }
  for (let m of o.wh) {
    let g = m.P,
      b = m.y,
      v = m.He,
      x = b + v,
      y = 12.6 / v;
    for (let [M, S] of [
      [i, !0],
      [a, !1],
    ]) {
      let w = (m.id % 5) * 4.1;
      for (let _ = 0; _ < g.length; _++) {
        let z = g[_],
          A = g[(_ + 1) % g.length],
          T = Math.hypot(A[0] - z[0], A[1] - z[1]);
        if (T < 0.05) continue;
        let E = df(m.ring, z, A);
        (!(
          Math.abs(((A[0] - z[0]) * m.o.d[0] + (A[1] - z[1]) * m.o.d[1]) / T) >
          0.7
        ) && T > 9
          ? lq(M.atlas, z, A, E, b - 0.3, v + 0.3, cc("wh_end"))
          : (kl(M.atlas, z, A, E, b - 0.3, x, cc("wh_side"), w, b, y),
            (w += T)),
          S &&
            T > 0.3 &&
            kl(
              M.solid,
              [z[0] + E[0] * 0.05, z[1] + E[1] * 0.05],
              [A[0] + E[0] * 0.05, A[1] + E[1] * 0.05],
              E,
              b - 0.3,
              b + 0.5,
              Bs.concDk,
            ));
      }
      if (
        (_P(
          M.atlas,
          g,
          m.ring,
          m.o,
          x,
          m.rise,
          cc("tile", [0.72, 0.3, 0.42]),
          S ? 1 : 0.8,
          S ? M.solid : null,
        ),
        S)
      ) {
        let { c: _, d: z, hl: A, hw: T } = m.o,
          E = Math.max(0, A - T);
        for (let P = -E + 3; P < E - 2; P += 14) {
          let C = _[0] + z[0] * P,
            I = _[1] + z[1] * P;
          Vs(
            M.atlas,
            C,
            I,
            z[0],
            z[1],
            1,
            0.7,
            x + m.rise - 0.3,
            x + m.rise + 0.7,
            cc("tile", [0.68, 0.28, 0.4]),
          );
        }
        let R = [-z[1], z[0]];
        for (let P of [-1, 1]) {
          let C = [
            _[0] + z[0] * P * (A + 0.8) + R[0] * T * 0.45,
            _[1] + z[1] * P * (A + 0.8) + R[1] * T * 0.45,
          ];
          o.inPad(...C) &&
            !o.inBld(C[0], C[1], 0.3) &&
            hq(M.solid, C, R, [z[0] * P, z[1] * P], b, v - 1.5);
        }
      }
    }
  }
  for (let m of o.docks) {
    let { c: g, d: b, w: v, hl: x, hw: y, y: M } = m,
      S = (_, z) => [g[0] + b[0] * _ + v[0] * z, g[1] + b[1] * _ + v[1] * z],
      w = m.q.y;
    for (let [_, z] of [
      [i, !0],
      [a, !1],
    ]) {
      if ((Vs(_.solid, g[0], g[1], b[0], b[1], x, y, w - 0.3, M, Bs.wall), !z))
        continue;
      let A = S(-x, y - 0.1),
        T = S(x, y - 0.1);
      (rs(
        _.solid,
        [A[0], M + 1, A[1]],
        [T[0], M + 1, T[1]],
        0.06,
        0.06,
        Bs.red,
      ),
        rs(
          _.solid,
          [A[0], M + 0.55, A[1]],
          [T[0], M + 0.55, T[1]],
          0.05,
          0.05,
          Bs.red,
        ));
      for (let L = -x; L <= x; L += 2.5) {
        let F = S(L, y - 0.1);
        os(_.solid, F[0], F[1], 0.035, M, M + 1.02, 4, Bs.red);
      }
      let E = w + 4.6,
        R = S(-x, -y),
        P = S(x, -y),
        C = S(x, y + 0.6),
        I = S(-x, y + 0.6);
      (Ms(
        _.solid,
        [R[0], E + 0.3, R[1]],
        [P[0], E + 0.3, P[1]],
        [C[0], E - 0.25, C[1]],
        [I[0], E - 0.25, I[1]],
        Bs.red,
        [g[0] + v[0] * 2, E + 50, g[1] + v[1] * 2],
      ),
        Ms(
          _.solid,
          [R[0], E + 0.22, R[1]],
          [P[0], E + 0.22, P[1]],
          [C[0], E - 0.33, C[1]],
          [I[0], E - 0.33, I[1]],
          Bs.redDk,
          [g[0] + v[0] * 2, E - 50, g[1] + v[1] * 2],
        ));
      for (let L = -x + 1; L <= x; L += 4.5) {
        let F = S(L, -y),
          O = S(L, y + 0.5);
        rs(
          _.solid,
          [F[0], E - 1.3, F[1]],
          [O[0], E - 0.2, O[1]],
          0.08,
          0.1,
          Bs.red,
        );
      }
      for (let L = -x + 2.5; L < x; L += 9) {
        let F = S(L, -y + 0.1);
        Vs(
          _.solid,
          F[0],
          F[1],
          b[0],
          b[1],
          0.1,
          0.06,
          E - 0.55,
          E - 0.42,
          Bs.lamp,
        );
      }
    }
  }
  for (let m of o.bridges)
    for (let [g] of [[i], [a]]) {
      let b = [-m.d[1], m.d[0]];
      Vs(
        g.atlas,
        m.c[0],
        m.c[1],
        b[0],
        b[1],
        m.hw,
        m.hl,
        m.y0,
        m.y1,
        cc("wh_side"),
        { bottom: !0 },
      );
    }
  for (let m of o.small)
    for (let [g, b] of [
      [i, !0],
      [a, !1],
    ]) {
      for (let v = 0; v < m.P.length; v++) {
        let x = m.P[v],
          y = m.P[(v + 1) % m.P.length];
        Math.hypot(y[0] - x[0], y[1] - x[1]) < 0.05 ||
          kl(
            g.atlas,
            x,
            y,
            df(m.ring, x, y),
            m.y - 0.3,
            m.y + m.He,
            cc("mission", [1.04, 1.03, 1]),
            0,
            m.y - 0.3,
            1 / (m.He + 0.3),
          );
      }
      _P(
        g.atlas,
        m.P,
        m.ring,
        m.o,
        m.y + m.He,
        m.rise,
        cc("tile", [0.72, 0.3, 0.42]),
        b ? 0.6 : 0.4,
        b ? g.solid : null,
      );
    }
  for (let m of o.upper)
    for (let [g, b] of [
      [i, !0],
      [a, !1],
    ]) {
      let v = m.kind,
        x = m.y + m.He,
        y = (m.id % 7) * 2.3;
      for (let M = 0; M < m.P.length; M++) {
        let S = m.P[M],
          w = m.P[(M + 1) % m.P.length],
          _ = Math.hypot(w[0] - S[0], w[1] - S[1]);
        _ < 0.05 ||
          (kl(
            g.atlas,
            S,
            w,
            df(m.ring, S, w),
            m.y - 1.2,
            x,
            cc(v),
            y,
            m.y - 0.1,
            1 / (m.He + 0.1),
          ),
          (y += _));
      }
      _P(
        g.solid,
        m.P,
        m.ring,
        m.o,
        x,
        m.rise,
        v === "mission"
          ? Rt([0.62, 0.27, 0.18], Tt.tar)
          : Rt([0.25, 0.31, 0.26], Tt.tar),
        b ? 0.55 : 0.4,
        b ? g.solid : null,
      );
    }
  for (let [m, g] of [
    [i, !0],
    [a, !1],
  ])
    for (let b of o.wall) {
      let { a: v, b: x, n: y, y: M, top: S } = b;
      (kl(
        m.solid,
        v,
        x,
        y.map((w) => -w),
        M - 0.6,
        S,
        Bs.white,
      ),
        kl(
          m.solid,
          [v[0] + y[0] * 0.35, v[1] + y[1] * 0.35],
          [x[0] + y[0] * 0.35, x[1] + y[1] * 0.35],
          y,
          M - 0.6,
          S,
          Bs.white,
        ),
        g &&
          rs(
            m.solid,
            [v[0] + y[0] * 0.15, S + 0.08, v[1] + y[1] * 0.15],
            [x[0] + y[0] * 0.15, S + 0.08, x[1] + y[1] * 0.15],
            0.45,
            0.16,
            Bs.white,
          ));
    }
  for (let m of o.stairs) {
    let [g, b] = m.a,
      [v, x] = m.b,
      y = Math.hypot(v - g, x - b),
      M = (v - g) / y,
      S = (x - b) / y,
      w = -S,
      _ = M,
      z = m.yb - m.ya,
      A = Math.max(4, Math.round(Math.abs(z) / 0.17)),
      T = y / A,
      E = i.solid;
    for (let R = 0; R < A; R++) {
      let P = g + M * T * R,
        C = b + S * T * R,
        I = m.ya + (z * (R + 1)) / A;
      Vs(
        E,
        P + (M * T) / 2,
        C + (S * T) / 2,
        M,
        S,
        T / 2 + 0.02,
        0.9,
        I - 0.35,
        I,
        Bs.conc,
      );
    }
    for (let R of [-1, 1]) {
      let P = 1.05 * R;
      (Ms(
        E,
        [g + w * P, m.ya - 1.5, b + _ * P],
        [v + w * P, m.yb - 1.5, x + _ * P],
        [v + w * P, m.yb + 0.25, x + _ * P],
        [g + w * P, m.ya + 0.25, b + _ * P],
        Bs.conc,
        [g + w * P * 10, m.ya, b + _ * P * 10],
      ),
        rs(
          E,
          [g + w * (P - 0.1 * R), m.ya + 1, b + _ * (P - 0.1 * R)],
          [v + w * (P - 0.1 * R), m.yb + 1, x + _ * (P - 0.1 * R)],
          0.05,
          0.05,
          Bs.rail,
        ));
      for (let C = 0; C <= 1.001; C += 0.25)
        os(
          E,
          g + (v - g) * C + w * (P - 0.1 * R),
          b + (x - b) * C + _ * (P - 0.1 * R),
          0.03,
          m.ya + z * C,
          m.ya + z * C + 1,
          4,
          Bs.rail,
        );
    }
  }
  for (let [m, g] of o.lamps) {
    let b = r(m, g),
      v = i.solid;
    (os(v, m, g, 0.16, b, b + 0.6, 6, Bs.conc),
      os(v, m, g, 0.09, b + 0.6, b + 8.2, 6, Bs.pole));
    let x = E0(m, g) * 6.28,
      y = Math.cos(x),
      M = Math.sin(x);
    (rs(
      v,
      [m, b + 8.1, g],
      [m + y * 1.4, b + 8.3, g + M * 1.4],
      0.08,
      0.08,
      Bs.pole,
    ),
      Vs(
        v,
        m + y * 1.6,
        g + M * 1.6,
        y,
        M,
        0.35,
        0.18,
        b + 8.12,
        b + 8.32,
        Bs.pole,
      ),
      Vs(
        v,
        m + y * 1.6,
        g + M * 1.6,
        y,
        M,
        0.3,
        0.14,
        b + 8.06,
        b + 8.13,
        Bs.lamp,
      ),
      os(a.solid, m, g, 0.1, b, b + 8.2, 4, Bs.pole));
  }
  {
    let [m, g] = o.statue,
      b = o.statueY ?? 0,
      v = i.solid;
    (Ws(
      v,
      m,
      g,
      [
        [5.2, b - 0.2],
        [5.2, b + 0.08],
        [0.01, b + 0.081],
      ],
      24,
      Bs.pavers,
    ),
      os(v, m, g, 0.5, b, b + 0.45, 10, Bs.concDk),
      Ws(
        v,
        m,
        g,
        [
          [0.28, b + 0.45],
          [0.3, b + 1.4],
          [0.34, b + 2],
          [0.3, b + 2.2],
          [0.14, b + 2.3],
          [0.14, b + 2.45],
          [0.13, b + 2.65],
          [0.01, b + 2.72],
        ],
        8,
        Bs.bronze,
      ),
      rs(
        v,
        [m + 0.3, b + 2.05, g],
        [m + 0.65, b + 2.5, g + 0.15],
        0.1,
        0.1,
        Bs.bronze,
      ));
  }
  for (let { x: m, z: g, a: b, y: v } of o.benches) {
    let x = i.solid,
      y = Math.cos(b),
      M = Math.sin(b),
      S = -M,
      w = y;
    (Vs(x, m, g, y, M, 0.95, 0.24, v + 0.42, v + 0.48, Bs.timber),
      Vs(
        x,
        m - S * 0.24,
        g - w * 0.24,
        y,
        M,
        0.95,
        0.04,
        v + 0.52,
        v + 0.92,
        Bs.timber,
      ));
    for (let _ of [-0.8, 0.8])
      Vs(x, m + y * _, g + M * _, y, M, 0.04, 0.24, v - 0.2, v + 0.44, Bs.dark);
  }
  {
    let m = i.solid,
      { gang: g, main: b, fingers: v } = o.cove,
      x = 0.55,
      y = r(...g[0]);
    rs(
      m,
      [g[0][0], y + 0.1, g[0][1]],
      [g[1][0], x + 0.3, g[1][1]],
      1.4,
      0.15,
      Bs.plank,
    );
    for (let E of [-0.7, 0.7]) {
      let R = Math.hypot(g[1][0] - g[0][0], g[1][1] - g[0][1]),
        P = -(g[1][1] - g[0][1]) / R,
        C = (g[1][0] - g[0][0]) / R;
      rs(
        m,
        [g[0][0] + P * E, y + 1.1, g[0][1] + C * E],
        [g[1][0] + P * E, x + 1.2, g[1][1] + C * E],
        0.05,
        0.05,
        Bs.rail,
      );
    }
    let [M, S] = b,
      w = Math.hypot(S[0] - M[0], S[1] - M[1]),
      _ = (S[0] - M[0]) / w,
      z = (S[1] - M[1]) / w,
      A = z,
      T = -_;
    for (let E of [i, a])
      Vs(
        E.solid,
        (M[0] + S[0]) / 2,
        (M[1] + S[1]) / 2,
        _,
        z,
        w / 2,
        1.3,
        x - 0.35,
        x,
        Bs.plank,
      );
    for (let E = 0; E < v; E++) {
      let R = 6 + (E * (w - 10)) / (v - 1),
        P = M[0] + _ * R + A * 6.3,
        C = M[1] + z * R + T * 6.3;
      Vs(m, P, C, A, T, 5, 0.6, x - 0.3, x, Bs.plank);
      for (let I of [
        [P + A * 5 + _ * 0.8, C + T * 5 + z * 0.8],
        [M[0] + _ * R - A * 1.6, M[1] + z * R - T * 1.6],
      ])
        (os(m, I[0], I[1], 0.2, -3, 3.4, 6, Bs.black),
          os(m, I[0], I[1], 0.21, 3.4, 3.65, 6, Bs.white),
          Ou(I[0], I[1], 0.25));
      l() < 0.7 &&
        gpt(
          m,
          P + _ * 2.6 + A * 0.5,
          C + z * 2.6 + T * 0.5,
          A,
          T,
          8 + l() * 3,
          l,
        );
    }
    for (let E = 0; E < 40; E++) {
      let R = -3445 - l() * 90,
        P = -1150 - l() * 140;
      Math.hypot(R - M[0], P - M[1]) < 30 ||
        (os(m, R, P, 0.18, -3, 3.2, 5, Bs.black),
        os(m, R, P, 0.19, 3.2, 3.45, 5, Bs.white),
        Ou(R, P, 0.2));
    }
  }
  return { BN: e, BF: s, A: n };
}
