// app 90 — solid
// Lines 74164-75290 of readable/app.pretty.js (statement-aligned).
function cW(i, { mobile: t = !1 } = {}) {
  let e = new Tc(),
    s = new Tc(),
    n = new su(2048, 512),
    o = e.R("fmn"),
    a = s.R("fmf"),
    r = i.yAt,
    l = Xht(34),
    c = {
      us: n.add("fm_us", 190, 100, _S("us")),
      ca: n.add("fm_ca", 190, 100, _S("ca")),
      red: n.add("fm_red", 190, 100, _S("#a82222")),
      navy: n.add("fm_navy", 190, 100, _S("#1d2a55")),
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
        ? Gl("deck", [0.95, 0.94, 0.92])
        : Gl("asphalt", [0.92, 0.93, 0.96]),
    d = ly(i.flat);
  (rW(o.atlas, d, r, u, 6), rW(a.atlas, d, r, u, 14));
  let p = i.ring;
  for (let [m, g] of [
    [o, !0],
    [a, !1],
  ]) {
    let b = 0;
    for (let x = 0; x + 1 < p.length; x++) {
      let v = p[x],
        y = p[x + 1],
        M = Math.hypot(y[0] - v[0], y[1] - v[1]);
      if (M < 0.05) continue;
      let S = Bh(i.flat, v, y),
        w = [v[0] + S[0] * 0.2, v[1] + S[1] * 0.2],
        z = [y[0] + S[0] * 0.2, y[1] + S[1] * 0.2],
        _ = Math.min(r(...v), r(...y));
      sl(m.solid, w, z, S, _ - 1, _ + 0.02, Fs.concDk);
      {
        let L = [v[0] - S[0] * 0.9, v[1] - S[1] * 0.9],
          F = [y[0] - S[0] * 0.9, y[1] - S[1] * 0.9];
        sl(m.solid, L, F, S, -1.5, _ - 0.9, Fs.dark);
      }
      if (!g) continue;
      if ((v[1] + y[1]) / 2 < -1420 && Math.abs((y[0] - v[0]) / M) > 0.7)
        for (let L = 0.3; L < M; L += 0.62) {
          let F = v[0] + ((y[0] - v[0]) * L) / M + S[0] * 0.45,
            N = v[1] + ((y[1] - v[1]) * L) / M + S[1] * 0.45;
          es(m.solid, F, N, 0.21, -3, r(F, N) - 0.05, 5, Fs.fender);
        }
      else
        for (let L = (3.2 - (b % 3.2)) % 3.2; L < M; L += 3.2) {
          let F = v[0] + ((y[0] - v[0]) * L) / M - S[0] * 0.15,
            N = v[1] + ((y[1] - v[1]) * L) / M - S[1] * 0.15;
          (es(m.solid, F, N, 0.3, -3, r(F, N) - 1, 6, Fs.pile),
            eu(F + S[0] * 0.3, N + S[1] * 0.3, 0.35));
        }
      b += M;
      let T = [v[0] - S[0] * 0.12, v[1] - S[1] * 0.12],
        E = [y[0] - S[0] * 0.12, y[1] - S[1] * 0.12],
        A = r(...v),
        C = r(...y);
      ss(
        m.solid,
        [T[0], A + 0.12, T[1]],
        [E[0], C + 0.12, E[1]],
        0.3,
        0.26,
        Fs.timber,
      );
      let P = [v[0] - S[0] * 0.4, v[1] - S[1] * 0.4],
        I = [y[0] - S[0] * 0.4, y[1] - S[1] * 0.4];
      M > 0.6 &&
        (ss(
          m.solid,
          [P[0], A + 1.05, P[1]],
          [I[0], C + 1.05, I[1]],
          0.05,
          0.05,
          Fs.rail,
        ),
        ss(
          m.solid,
          [P[0], A + 0.6, P[1]],
          [I[0], C + 0.6, I[1]],
          0.04,
          0.04,
          Fs.rail,
        ));
      for (let L = 0; L < M; L += 2.4) {
        let F = P[0] + ((I[0] - P[0]) * L) / M,
          N = P[1] + ((I[1] - P[1]) * L) / M;
        es(m.solid, F, N, 0.03, r(F, N), r(F, N) + 1.07, 4, Fs.rail);
      }
      for (let L = 5; L < M - 2; L += 14) {
        let F = v[0] + ((y[0] - v[0]) * L) / M - S[0] * 0.75,
          N = v[1] + ((y[1] - v[1]) * L) / M - S[1] * 0.75,
          B = r(F, N);
        Gs(
          m.solid,
          F,
          N,
          [
            [0.24, B],
            [0.2, B + 0.12],
            [0.15, B + 0.42],
            [0.27, B + 0.52],
            [0.25, B + 0.62],
            [0.01, B + 0.64],
          ],
          8,
          Fs.red,
        );
      }
    }
  }
  {
    let m = o.solid,
      g = Fs.paintW,
      b = (v, y, M, S, w) => {
        let z = Math.hypot(M - v, S - y),
          _ = ((-(S - y) / z) * w) / 2,
          R = (((M - v) / z) * w) / 2,
          T = r(v, y) + 0.025,
          E = r(M, S) + 0.025;
        Fi(
          m,
          [
            [v - _, T, y - R],
            [M - _, E, S - R],
            [M + _, E, S + R],
            [v + _, T, y + R],
          ],
          g,
        );
      };
    for (let v of i.stalls)
      for (let y of [-1.3, 1.3]) {
        let M = v.x + v.u[0] * y,
          S = v.z + v.u[1] * y;
        b(
          M - v.v[0] * 2.65,
          S - v.v[1] * 2.65,
          M + v.v[0] * 2.5,
          S + v.v[1] * 2.5,
          0.11,
        );
      }
    let x = [
      [-3195, -1318],
      [-3239, -1310],
      [-3296, -1301],
      [-3337, -1294],
      [-3388, -1287],
    ];
    for (let v = 0; v + 1 < x.length; v++) {
      let [y, M] = x[v],
        [S, w] = x[v + 1],
        z = Math.hypot(S - y, w - M),
        _ = -(w - M) / z,
        R = (S - y) / z;
      for (let T of [-3.3, 3.3])
        b(y + _ * T, M + R * T, S + _ * T, w + R * T, 0.12);
      for (let T = 0; T < z - 2; T += 6)
        b(
          y + ((S - y) * T) / z,
          M + ((w - M) * T) / z,
          y + ((S - y) * (T + 2.5)) / z,
          M + ((w - M) * (T + 2.5)) / z,
          0.1,
        );
    }
  }
  for (let m of i.sheds) {
    let { c: g, d: b, hl: x, hw: v } = m.o,
      y = [-b[1], b[0]],
      M = m.y,
      S = m.He,
      w = KR["gable" + m.n] || KR.gable2,
      z = (w[0] + w[w.length - 1]) / 2 || 0.62,
      _ = S / z,
      R = Math.max(...w) * _,
      T = (C, P) => [g[0] + b[0] * C + y[0] * P, g[1] + b[1] * C + y[1] * P],
      E = -x,
      A = x;
    for (let [C, P] of [
      [o, !0],
      [a, !1],
    ]) {
      for (let D of [-1, 1])
        sl(
          C.atlas,
          T(E, D * v),
          T(A, D * v),
          [y[0] * D, y[1] * D],
          M - 0.3,
          M + S,
          Gl("shed_side"),
          0,
          M,
        );
      for (let [D, U] of [
        [E, -1],
        [A, 1],
      ]) {
        let G = [b[0] * U, b[1] * U],
          q = T(D, -v),
          W = T(D, v),
          V = P ? w.length - 1 : 12;
        for (let Y = 0; Y < V; Y++) {
          let $ = Y / V,
            st = (Y + 1) / V,
            Q = cy(w, $),
            j = cy(w, st);
          aW(
            C.atlas,
            q,
            W,
            G,
            M - 0.3,
            _,
            Gl("gable" + m.n, [1, 1, 1], U < 0),
            $,
            st,
            Q,
            j,
          );
        }
      }
      let I = m.rise,
        L = Math.min(4.2, v * 0.3),
        F = E + 7,
        N = A - 5,
        B = (D) => M + S + I * (1 - Math.abs(D) / v);
      for (let D of [-1, 1]) {
        let U = T(E + 0.3, D * (v + 0.25)),
          G = T(A - 0.3, D * (v + 0.25)),
          q = T(E + 0.3, 0),
          W = T(A - 0.3, 0);
        if (
          (xs(
            C.solid,
            [U[0], M + S - 0.08, U[1]],
            [G[0], M + S - 0.08, G[1]],
            [W[0], M + S + I, W[1]],
            [q[0], M + S + I, q[1]],
            Fs.roof,
            [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
          ),
          P &&
            ss(
              C.solid,
              [U[0], M + S - 0.15, U[1]],
              [G[0], M + S - 0.15, G[1]],
              0.18,
              0.3,
              Fs.red,
            ),
          m.n === "2" && P)
        )
          for (let V = F + 2; V < N - 8; V += 9.2) {
            let Y = D * (L + 0.8),
              $ = D * (v - 1.4),
              st = [T(V, Y), T(V + 8.6, Y), T(V + 8.6, $), T(V, $)];
            xs(
              C.solid,
              [st[0][0], B(Y) + 0.18, st[0][1]],
              [st[1][0], B(Y) + 0.18, st[1][1]],
              [st[2][0], B($) + 0.18, st[2][1]],
              [st[3][0], B($) + 0.18, st[3][1]],
              Fs.solar,
              [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
            );
          }
      }
      let H = B(L),
        O = H + 1.9;
      for (let D of [-1, 1]) {
        let U = T(F, D * L),
          G = T(N, D * L),
          q = [y[0] * D, y[1] * D];
        if (
          (sl(C.solid, U, G, q, H - 0.4, H + 0.35, Fs.cream),
          sl(C.solid, U, G, q, H + 0.35, O - 0.25, Fs.glass),
          sl(C.solid, U, G, q, O - 0.25, O, Fs.red),
          P)
        ) {
          let st = [q[0] * 0.04, q[1] * 0.04];
          for (let Q = F + 0.55; Q < N; Q += 1.1) {
            let j = T(Q, D * L);
            Us(
              C.solid,
              j[0] + st[0],
              j[1] + st[1],
              b[0],
              b[1],
              0.05,
              0.05,
              H + 0.35,
              O - 0.25,
              Fs.red,
            );
          }
        }
        let W = T(F - 0.4, D * (L + 0.5)),
          V = T(N + 0.4, D * (L + 0.5)),
          Y = T(F - 0.4, 0),
          $ = T(N + 0.4, 0);
        xs(
          C.solid,
          [W[0], O - 0.05, W[1]],
          [V[0], O - 0.05, V[1]],
          [$[0], O + 0.75, $[1]],
          [Y[0], O + 0.75, Y[1]],
          Fs.redDk,
          [g[0] + y[0] * D * 40, M + 200, g[1] + y[1] * D * 40],
        );
      }
      for (let [D, U] of [
        [F, -1],
        [N, 1],
      ]) {
        let G = T(D, -L),
          q = T(D, L),
          W = [b[0] * U, b[1] * U],
          V = T(D, 0);
        (sl(C.solid, G, q, W, H - 0.4, O, Fs.cream),
          E0(
            C.solid,
            [G[0], O, G[1]],
            [q[0], O, q[1]],
            [V[0], O + 0.75, V[1]],
            Fs.cream,
            [V[0] + W[0] * 20, O, V[1] + W[1] * 20],
          ));
      }
      if (P) {
        for (let D = F + 4; D < N - 2; D += 11) {
          let U = T(D, 0);
          Gs(
            C.solid,
            U[0],
            U[1],
            [
              [0.32, O + 0.6],
              [0.32, O + 1.2],
              [0.45, O + 1.35],
              [0.42, O + 1.75],
              [0.05, O + 1.95],
            ],
            8,
            Fs.copper,
          );
        }
        for (let D = E + 12; D < A - 6; D += 23)
          for (let U of [-1, 1]) {
            let G = T(D, U * v * 0.62);
            (es(
              C.solid,
              G[0],
              G[1],
              0.22,
              B(v * 0.62) - 0.2,
              B(v * 0.62) + 0.7,
              6,
              Fs.red,
            ),
              es(
                C.solid,
                G[0],
                G[1],
                0.32,
                B(v * 0.62) + 0.7,
                B(v * 0.62) + 0.85,
                6,
                Fs.red,
              ));
          }
        for (let [D, U] of [
          [E, -1],
          [A, 1],
        ]) {
          let G = [b[0] * U, b[1] * U],
            q = w.length - 1;
          for (let W = 0; W < q; W++) {
            let V = T(D + U * 0.12, -v + (2 * v * W) / q),
              Y = T(D + U * 0.12, -v + (2 * v * (W + 1)) / q);
            ss(
              C.solid,
              [
                V[0] + G[0] * 0.06,
                M - 0.3 + cy(w, W / q) * _,
                V[1] + G[1] * 0.06,
              ],
              [
                Y[0] + G[0] * 0.06,
                M - 0.3 + cy(w, (W + 1) / q) * _,
                Y[1] + G[1] * 0.06,
              ],
              0.32,
              0.12,
              Fs.cream,
            );
          }
          for (let W of [0.2, 0.4, 0.6, 0.8]) {
            let V = T(D + U * 0.12, -v + 2 * v * W);
            Us(
              C.solid,
              V[0] + G[0] * 0.1,
              V[1] + G[1] * 0.1,
              y[0],
              y[1],
              0.12,
              0.1,
              M + S * 0.66,
              M + S * 0.66 + 0.35,
              Fs.lamp,
            );
          }
          for (let W of [0.1, 0.9]) {
            let V = T(D + U * 0.12, -v + 2 * v * W);
            Us(
              C.solid,
              V[0] + G[0] * 0.1,
              V[1] + G[1] * 0.1,
              y[0],
              y[1],
              0.12,
              0.1,
              M + 3.4,
              M + 3.75,
              Fs.lamp,
            );
          }
        }
        for (let D of [-1, 1])
          for (let U = E + 3; U < A - 1; U += 6.5) {
            let G = T(U, D * (v + 0.12));
            if (
              (Us(
                C.solid,
                G[0],
                G[1],
                b[0],
                b[1],
                0.14,
                0.09,
                M + 0.05,
                M + 0.32,
                Fs.lamp,
              ),
              Math.round((U - E) / 6.5) % 2 === 0)
            ) {
              let q = T(U + 2.1, D * (v + 0.1));
              Us(
                C.solid,
                q[0],
                q[1],
                b[0],
                b[1],
                0.1,
                0.09,
                M + 5.6,
                M + 5.85,
                Fs.lamp,
              );
            }
          }
        if (m.n !== "1") {
          let D = T(E - 0.4, 0);
          for (let [Y, $, st] of [
            [0, "us", 9],
            [-0.86, m.n === "2" ? "red" : "ca", 7],
            [0.86, "navy", 7],
          ]) {
            let Q = T(E - 0.4, v * Y),
              j = M - 0.3 + cy(w, (Y + 1) / 2) * _;
            (es(C.solid, Q[0], Q[1], 0.06, j, j + st, 5, Fs.white),
              Gs(
                C.solid,
                Q[0],
                Q[1],
                [
                  [0.01, j + st],
                  [0.1, j + st + 0.1],
                  [0.01, j + st + 0.2],
                ],
                6,
                Fs.bronze,
              ));
            let X = Q[0] + y[0] * 0.95,
              K = Q[1] + y[1] * 0.95;
            (si(
              C.text,
              n,
              c[$],
              X,
              j + st - 0.65,
              K,
              b[0] * -1,
              b[1] * -1,
              1.8,
              0.95,
              Da(!1),
            ),
              si(
                C.text,
                n,
                c[$],
                X,
                j + st - 0.65,
                K,
                b[0],
                b[1],
                1.8,
                0.95,
                Da(!1),
              ));
          }
          let U = m.n === "2" ? h.cowell : h.fest,
            G = [-b[0], -b[1]],
            q = m.n === "2" ? 0.78 : 0.5,
            W = T(E - 0.08, -v + 2 * v * q),
            V = m.n === "2" ? 3.8 : 6.5;
          si(
            C.text,
            n,
            U,
            W[0],
            M + S * (m.n === "2" ? 0.57 : 0.55),
            W[1],
            G[0],
            G[1],
            V,
            V / U.aspect,
            oo([0.12, 0.1, 0.08], !1),
          );
        } else {
          let D = y[0] > 0 ? 1 : -1,
            U = T(0, D * (v + 0.06)),
            G = [y[0] * D, y[1] * D],
            q = Math.min(70, x * 1.1);
          si(
            C.text,
            n,
            h.fmc,
            U[0],
            M + S - 1.4,
            U[1],
            G[0],
            G[1],
            q,
            2.2,
            oo([0.16, 0.12, 0.1], !1),
          );
        }
        for (let D of [-1, 1])
          for (let U of [E + x * 0.55, E + x * 1.45])
            lW(
              C.solid,
              T(U, D * (v + 0.7)),
              b,
              [y[0] * D, y[1] * D],
              M,
              S - 1.2,
            );
      }
    }
  }
  for (let m of i.wh) {
    let g = m.P,
      b = m.y,
      x = m.He,
      v = b + x,
      y = 12.6 / x;
    for (let [M, S] of [
      [o, !0],
      [a, !1],
    ]) {
      let w = (m.id % 5) * 4.1;
      for (let z = 0; z < g.length; z++) {
        let _ = g[z],
          R = g[(z + 1) % g.length],
          T = Math.hypot(R[0] - _[0], R[1] - _[1]);
        if (T < 0.05) continue;
        let E = Bh(m.ring, _, R);
        (!(
          Math.abs(((R[0] - _[0]) * m.o.d[0] + (R[1] - _[1]) * m.o.d[1]) / T) >
          0.7
        ) && T > 9
          ? aW(M.atlas, _, R, E, b - 0.3, x + 0.3, Gl("wh_end"))
          : (sl(M.atlas, _, R, E, b - 0.3, v, Gl("wh_side"), w, b, y),
            (w += T)),
          S &&
            T > 0.3 &&
            sl(
              M.solid,
              [_[0] + E[0] * 0.05, _[1] + E[1] * 0.05],
              [R[0] + E[0] * 0.05, R[1] + E[1] * 0.05],
              E,
              b - 0.3,
              b + 0.5,
              Fs.concDk,
            ));
      }
      if (
        (YR(
          M.atlas,
          g,
          m.ring,
          m.o,
          v,
          m.rise,
          Gl("tile", [0.72, 0.3, 0.42]),
          S ? 1 : 0.8,
          S ? M.solid : null,
        ),
        S)
      ) {
        let { c: z, d: _, hl: R, hw: T } = m.o,
          E = Math.max(0, R - T);
        for (let C = -E + 3; C < E - 2; C += 14) {
          let P = z[0] + _[0] * C,
            I = z[1] + _[1] * C;
          Us(
            M.atlas,
            P,
            I,
            _[0],
            _[1],
            1,
            0.7,
            v + m.rise - 0.3,
            v + m.rise + 0.7,
            Gl("tile", [0.68, 0.28, 0.4]),
          );
        }
        let A = [-_[1], _[0]];
        for (let C of [-1, 1]) {
          let P = [
            z[0] + _[0] * C * (R + 0.8) + A[0] * T * 0.45,
            z[1] + _[1] * C * (R + 0.8) + A[1] * T * 0.45,
          ];
          i.inPad(...P) &&
            !i.inBld(P[0], P[1], 0.3) &&
            lW(M.solid, P, A, [_[0] * C, _[1] * C], b, x - 1.5);
        }
      }
    }
  }
  for (let m of i.docks) {
    let { c: g, d: b, w: x, hl: v, hw: y, y: M } = m,
      S = (z, _) => [g[0] + b[0] * z + x[0] * _, g[1] + b[1] * z + x[1] * _],
      w = m.q.y;
    for (let [z, _] of [
      [o, !0],
      [a, !1],
    ]) {
      if ((Us(z.solid, g[0], g[1], b[0], b[1], v, y, w - 0.3, M, Fs.wall), !_))
        continue;
      let R = S(-v, y - 0.1),
        T = S(v, y - 0.1);
      (ss(
        z.solid,
        [R[0], M + 1, R[1]],
        [T[0], M + 1, T[1]],
        0.06,
        0.06,
        Fs.red,
      ),
        ss(
          z.solid,
          [R[0], M + 0.55, R[1]],
          [T[0], M + 0.55, T[1]],
          0.05,
          0.05,
          Fs.red,
        ));
      for (let L = -v; L <= v; L += 2.5) {
        let F = S(L, y - 0.1);
        es(z.solid, F[0], F[1], 0.035, M, M + 1.02, 4, Fs.red);
      }
      let E = w + 4.6,
        A = S(-v, -y),
        C = S(v, -y),
        P = S(v, y + 0.6),
        I = S(-v, y + 0.6);
      (xs(
        z.solid,
        [A[0], E + 0.3, A[1]],
        [C[0], E + 0.3, C[1]],
        [P[0], E - 0.25, P[1]],
        [I[0], E - 0.25, I[1]],
        Fs.red,
        [g[0] + x[0] * 2, E + 50, g[1] + x[1] * 2],
      ),
        xs(
          z.solid,
          [A[0], E + 0.22, A[1]],
          [C[0], E + 0.22, C[1]],
          [P[0], E - 0.33, P[1]],
          [I[0], E - 0.33, I[1]],
          Fs.redDk,
          [g[0] + x[0] * 2, E - 50, g[1] + x[1] * 2],
        ));
      for (let L = -v + 1; L <= v; L += 4.5) {
        let F = S(L, -y),
          N = S(L, y + 0.5);
        ss(
          z.solid,
          [F[0], E - 1.3, F[1]],
          [N[0], E - 0.2, N[1]],
          0.08,
          0.1,
          Fs.red,
        );
      }
      for (let L = -v + 2.5; L < v; L += 9) {
        let F = S(L, -y + 0.1);
        Us(
          z.solid,
          F[0],
          F[1],
          b[0],
          b[1],
          0.1,
          0.06,
          E - 0.55,
          E - 0.42,
          Fs.lamp,
        );
      }
    }
  }
  for (let m of i.bridges)
    for (let [g] of [[o], [a]]) {
      let b = [-m.d[1], m.d[0]];
      Us(
        g.atlas,
        m.c[0],
        m.c[1],
        b[0],
        b[1],
        m.hw,
        m.hl,
        m.y0,
        m.y1,
        Gl("wh_side"),
        { bottom: !0 },
      );
    }
  for (let m of i.small)
    for (let [g, b] of [
      [o, !0],
      [a, !1],
    ]) {
      for (let x = 0; x < m.P.length; x++) {
        let v = m.P[x],
          y = m.P[(x + 1) % m.P.length];
        Math.hypot(y[0] - v[0], y[1] - v[1]) < 0.05 ||
          sl(
            g.atlas,
            v,
            y,
            Bh(m.ring, v, y),
            m.y - 0.3,
            m.y + m.He,
            Gl("mission", [1.04, 1.03, 1]),
            0,
            m.y - 0.3,
            1 / (m.He + 0.3),
          );
      }
      YR(
        g.atlas,
        m.P,
        m.ring,
        m.o,
        m.y + m.He,
        m.rise,
        Gl("tile", [0.72, 0.3, 0.42]),
        b ? 0.6 : 0.4,
        b ? g.solid : null,
      );
    }
  for (let m of i.upper)
    for (let [g, b] of [
      [o, !0],
      [a, !1],
    ]) {
      let x = m.kind,
        v = m.y + m.He,
        y = (m.id % 7) * 2.3;
      for (let M = 0; M < m.P.length; M++) {
        let S = m.P[M],
          w = m.P[(M + 1) % m.P.length],
          z = Math.hypot(w[0] - S[0], w[1] - S[1]);
        z < 0.05 ||
          (sl(
            g.atlas,
            S,
            w,
            Bh(m.ring, S, w),
            m.y - 1.2,
            v,
            Gl(x),
            y,
            m.y - 0.1,
            1 / (m.He + 0.1),
          ),
          (y += z));
      }
      YR(
        g.solid,
        m.P,
        m.ring,
        m.o,
        v,
        m.rise,
        x === "mission"
          ? At([0.62, 0.27, 0.18], Tt.tar)
          : At([0.25, 0.31, 0.26], Tt.tar),
        b ? 0.55 : 0.4,
        b ? g.solid : null,
      );
    }
  for (let [m, g] of [
    [o, !0],
    [a, !1],
  ])
    for (let b of i.wall) {
      let { a: x, b: v, n: y, y: M, top: S } = b;
      (sl(
        m.solid,
        x,
        v,
        y.map((w) => -w),
        M - 0.6,
        S,
        Fs.white,
      ),
        sl(
          m.solid,
          [x[0] + y[0] * 0.35, x[1] + y[1] * 0.35],
          [v[0] + y[0] * 0.35, v[1] + y[1] * 0.35],
          y,
          M - 0.6,
          S,
          Fs.white,
        ),
        g &&
          ss(
            m.solid,
            [x[0] + y[0] * 0.15, S + 0.08, x[1] + y[1] * 0.15],
            [v[0] + y[0] * 0.15, S + 0.08, v[1] + y[1] * 0.15],
            0.45,
            0.16,
            Fs.white,
          ));
    }
  for (let m of i.stairs) {
    let [g, b] = m.a,
      [x, v] = m.b,
      y = Math.hypot(x - g, v - b),
      M = (x - g) / y,
      S = (v - b) / y,
      w = -S,
      z = M,
      _ = m.yb - m.ya,
      R = Math.max(4, Math.round(Math.abs(_) / 0.17)),
      T = y / R,
      E = o.solid;
    for (let A = 0; A < R; A++) {
      let C = g + M * T * A,
        P = b + S * T * A,
        I = m.ya + (_ * (A + 1)) / R;
      Us(
        E,
        C + (M * T) / 2,
        P + (S * T) / 2,
        M,
        S,
        T / 2 + 0.02,
        0.9,
        I - 0.35,
        I,
        Fs.conc,
      );
    }
    for (let A of [-1, 1]) {
      let C = 1.05 * A;
      (xs(
        E,
        [g + w * C, m.ya - 1.5, b + z * C],
        [x + w * C, m.yb - 1.5, v + z * C],
        [x + w * C, m.yb + 0.25, v + z * C],
        [g + w * C, m.ya + 0.25, b + z * C],
        Fs.conc,
        [g + w * C * 10, m.ya, b + z * C * 10],
      ),
        ss(
          E,
          [g + w * (C - 0.1 * A), m.ya + 1, b + z * (C - 0.1 * A)],
          [x + w * (C - 0.1 * A), m.yb + 1, v + z * (C - 0.1 * A)],
          0.05,
          0.05,
          Fs.rail,
        ));
      for (let P = 0; P <= 1.001; P += 0.25)
        es(
          E,
          g + (x - g) * P + w * (C - 0.1 * A),
          b + (v - b) * P + z * (C - 0.1 * A),
          0.03,
          m.ya + _ * P,
          m.ya + _ * P + 1,
          4,
          Fs.rail,
        );
    }
  }
  for (let [m, g] of i.lamps) {
    let b = r(m, g),
      x = o.solid;
    (es(x, m, g, 0.16, b, b + 0.6, 6, Fs.conc),
      es(x, m, g, 0.09, b + 0.6, b + 8.2, 6, Fs.pole));
    let v = u0(m, g) * 6.28,
      y = Math.cos(v),
      M = Math.sin(v);
    (ss(
      x,
      [m, b + 8.1, g],
      [m + y * 1.4, b + 8.3, g + M * 1.4],
      0.08,
      0.08,
      Fs.pole,
    ),
      Us(
        x,
        m + y * 1.6,
        g + M * 1.6,
        y,
        M,
        0.35,
        0.18,
        b + 8.12,
        b + 8.32,
        Fs.pole,
      ),
      Us(
        x,
        m + y * 1.6,
        g + M * 1.6,
        y,
        M,
        0.3,
        0.14,
        b + 8.06,
        b + 8.13,
        Fs.lamp,
      ),
      es(a.solid, m, g, 0.1, b, b + 8.2, 4, Fs.pole));
  }
  {
    let [m, g] = i.statue,
      b = i.statueY ?? 0,
      x = o.solid;
    (Gs(
      x,
      m,
      g,
      [
        [5.2, b - 0.2],
        [5.2, b + 0.08],
        [0.01, b + 0.081],
      ],
      24,
      Fs.pavers,
    ),
      es(x, m, g, 0.5, b, b + 0.45, 10, Fs.concDk),
      Gs(
        x,
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
        Fs.bronze,
      ),
      ss(
        x,
        [m + 0.3, b + 2.05, g],
        [m + 0.65, b + 2.5, g + 0.15],
        0.1,
        0.1,
        Fs.bronze,
      ));
  }
  for (let { x: m, z: g, a: b, y: x } of i.benches) {
    let v = o.solid,
      y = Math.cos(b),
      M = Math.sin(b),
      S = -M,
      w = y;
    (Us(v, m, g, y, M, 0.95, 0.24, x + 0.42, x + 0.48, Fs.timber),
      Us(
        v,
        m - S * 0.24,
        g - w * 0.24,
        y,
        M,
        0.95,
        0.04,
        x + 0.52,
        x + 0.92,
        Fs.timber,
      ));
    for (let z of [-0.8, 0.8])
      Us(v, m + y * z, g + M * z, y, M, 0.04, 0.24, x - 0.2, x + 0.44, Fs.dark);
  }
  {
    let m = o.solid,
      { gang: g, main: b, fingers: x } = i.cove,
      v = 0.55,
      y = r(...g[0]);
    ss(
      m,
      [g[0][0], y + 0.1, g[0][1]],
      [g[1][0], v + 0.3, g[1][1]],
      1.4,
      0.15,
      Fs.plank,
    );
    for (let E of [-0.7, 0.7]) {
      let A = Math.hypot(g[1][0] - g[0][0], g[1][1] - g[0][1]),
        C = -(g[1][1] - g[0][1]) / A,
        P = (g[1][0] - g[0][0]) / A;
      ss(
        m,
        [g[0][0] + C * E, y + 1.1, g[0][1] + P * E],
        [g[1][0] + C * E, v + 1.2, g[1][1] + P * E],
        0.05,
        0.05,
        Fs.rail,
      );
    }
    let [M, S] = b,
      w = Math.hypot(S[0] - M[0], S[1] - M[1]),
      z = (S[0] - M[0]) / w,
      _ = (S[1] - M[1]) / w,
      R = _,
      T = -z;
    for (let E of [o, a])
      Us(
        E.solid,
        (M[0] + S[0]) / 2,
        (M[1] + S[1]) / 2,
        z,
        _,
        w / 2,
        1.3,
        v - 0.35,
        v,
        Fs.plank,
      );
    for (let E = 0; E < x; E++) {
      let A = 6 + (E * (w - 10)) / (x - 1),
        C = M[0] + z * A + R * 6.3,
        P = M[1] + _ * A + T * 6.3;
      Us(m, C, P, R, T, 5, 0.6, v - 0.3, v, Fs.plank);
      for (let I of [
        [C + R * 5 + z * 0.8, P + T * 5 + _ * 0.8],
        [M[0] + z * A - R * 1.6, M[1] + _ * A - T * 1.6],
      ])
        (es(m, I[0], I[1], 0.2, -3, 3.4, 6, Fs.black),
          es(m, I[0], I[1], 0.21, 3.4, 3.65, 6, Fs.white),
          eu(I[0], I[1], 0.25));
      l() < 0.7 &&
        Kht(
          m,
          C + z * 2.6 + R * 0.5,
          P + _ * 2.6 + T * 0.5,
          R,
          T,
          8 + l() * 3,
          l,
        );
    }
    for (let E = 0; E < 40; E++) {
      let A = -3445 - l() * 90,
        C = -1150 - l() * 140;
      Math.hypot(A - M[0], C - M[1]) < 30 ||
        (es(m, A, C, 0.18, -3, 3.2, 5, Fs.black),
        es(m, A, C, 0.19, 3.2, 3.45, 5, Fs.white),
        eu(A, C, 0.2));
    }
  }
  return { BN: e, BF: s, A: n };
}
