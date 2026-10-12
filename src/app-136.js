// app 136 — math
// Lines 89299-90302 of readable/app.pretty.js (statement-aligned).
function Iq(i, t, e) {
  let { D: s, L: n } = e,
    o = new Ce(),
    a = new Ce(),
    r = {},
    l = (f, u) => n.driveHeight(f, u),
    c = null,
    h = s.bld;
  for (let f of [1206216224, 1237048318, 1237048319]) {
    let u = h.seed.indexOf(f);
    if (u < 0) continue;
    let d = h.rStart[h.bRing[u]],
      p = h.rStart[h.bRing[u] + 1],
      m = p - d;
    for (let g = 0; g < m; g++) {
      let b = h.pts[(d + g) * 2],
        x = h.pts[(d + g) * 2 + 1],
        v = h.pts[(d + ((g + 1) % m)) * 2],
        y = h.pts[(d + ((g + 1) % m)) * 2 + 1],
        M = Math.hypot(v - b, y - x);
      if (M < 8) continue;
      let S = (b + v) / 2,
        w = (x + y) / 2,
        z = n.roadAt(S, w, 30);
      if (!z || z.E.name !== "Castro Street") continue;
      let _ = z.d - z.w;
      (!c || _ < c.d) &&
        (c = { ax: b, az: x, bx: v, bz: y, l: M, d: _, top: h.bF[u * 3 + 1] });
    }
  }
  if (c) {
    let { ax: f, az: u, bx: d, bz: p, l: m } = c,
      g = (d - f) / m,
      b = (p - u) / m,
      x = -b,
      v = g,
      y = n.roadAt((f + d) / 2, (u + p) / 2, 30);
    (Ot(y.E, y.s, r),
      (r.x - (f + d) / 2) * x + (r.z - (u + p) / 2) * v < 0 &&
        ((x = -x), (v = -v)));
    let M = m / 2,
      S = l(f + g * M + x * 2, u + b * M + v * 2),
      w = (X, K, nt) => [f + g * X + x * nt, S + K, u + b * X + v * nt],
      z = (X, K, nt, Z, et, tt, it, rt = o) => {
        let lt = (ot, at, yt) => w(ot, at, yt),
          ct = [g, 0, b],
          dt = [x, 0, v],
          ut = [
            [[X, nt, tt], [K, nt, tt], [K, Z, tt], [X, Z, tt], dt],
            [
              [K, nt, et],
              [X, nt, et],
              [X, Z, et],
              [K, Z, et],
              dt.map((ot) => -ot),
            ],
            [[K, nt, tt], [K, nt, et], [K, Z, et], [K, Z, tt], ct],
            [
              [X, nt, et],
              [X, nt, tt],
              [X, Z, tt],
              [X, Z, et],
              ct.map((ot) => -ot),
            ],
            [
              [X, Z, tt],
              [K, Z, tt],
              [K, Z, et],
              [X, Z, et],
              [0, 1, 0],
            ],
            [
              [X, nt, et],
              [K, nt, et],
              [K, nt, tt],
              [X, nt, tt],
              [0, -1, 0],
            ],
          ];
        for (let [ot, at, yt, vt, Pt] of ut) {
          let jt = lt(...ot),
            Wt = lt(...at),
            Ct = lt(...yt),
            qt = lt(...vt),
            Zt =
              (Wt[1] - jt[1]) * (Ct[2] - jt[2]) -
              (Wt[2] - jt[2]) * (Ct[1] - jt[1]),
            he =
              (Wt[2] - jt[2]) * (Ct[0] - jt[0]) -
              (Wt[0] - jt[0]) * (Ct[2] - jt[2]),
            ee =
              (Wt[0] - jt[0]) * (Ct[1] - jt[1]) -
              (Wt[1] - jt[1]) * (Ct[0] - jt[0]);
          Zt * Pt[0] + he * Pt[1] + ee * Pt[2] >= 0
            ? rt.quad(jt, Wt, Ct, qt, [0, 0], [1, 0], [1, 1], [0, 1], it, Pt)
            : rt.quad(jt, qt, Ct, Wt, [0, 0], [0, 1], [1, 1], [1, 0], it, Pt);
        }
      },
      _ = It(Lt.gloss, 0.8, 0.72, 0.52),
      R = bn(1, 0.1, 0.16),
      T = bn(1, 0.62, 0.16),
      E = It(Lt.gloss, 0.12, 0.03, 0.03),
      A = It(Lt.gloss, 0.5, 0.07, 0.04),
      C = M,
      P = 0.36,
      I = 0.35,
      L = 2.55,
      F = 7.4,
      N = 21.2;
    (z(C - P, C + P, F, N, I, L, A),
      z(C - P - 0.04, C + P + 0.04, N, N + 0.6, I, L + 0.2, E));
    for (let X = F + 0.6; X < N; X += 3.2)
      z(C - 0.06, C + 0.06, X, X + 0.12, 0, I, E);
    for (let X of [-1, 1]) {
      let K = Math.sign(b * x - g * v) || 1,
        nt = (et, tt) =>
          w(C + X * (P + 0.06), (F + N) / 2 + tt, (I + L) / 2 + et * X * K),
        Z = (et, tt) =>
          w(C + X * (P + 0.16), (F + N) / 2 + tt, (I + L) / 2 + et * X * K);
      (_y(o, "CASTRO", nt, 0.3, 0.42, 0.13, _),
        _y(o, "CASTRO", Z, 0.3, 0.42, 0.05, R));
      for (let [et, tt] of [
        [
          [-1, -6.6],
          [1, -6.6],
        ],
        [
          [1, -6.6],
          [1, 6.6],
        ],
        [
          [1, 6.6],
          [-1, 6.6],
        ],
        [
          [-1, 6.6],
          [-1, -6.6],
        ],
      ])
        Ae(o, nt(...et), nt(...tt), 0.045, T, 4);
    }
    let B = M - 6.2,
      H = M + 6.2,
      O = 0.2,
      D = 3.4,
      U = 3.9,
      G = 6.3;
    (z(B, H, U, G, O, D, It(Lt.gloss, 0.86, 0.66, 0.18)),
      z(B + 0.1, H - 0.1, U - 0.06, U, O, D - 0.1, E),
      z(
        B - 0.1,
        H + 0.1,
        G - 0.3,
        G + 0.06,
        O + 0.06,
        D + 0.1,
        It(Lt.gloss, 0.62, 0.05, 0.05),
      ));
    let q = M - 3,
      W = M + 3;
    (z(q, W, G, G + 1.4, D - 0.35, D - 0.05, It(Lt.gloss, 0.86, 0.66, 0.18)),
      _y(
        o,
        "CASTRO",
        (X, K) =>
          w(M + X * (x * b - v * g > 0 ? -1 : 1), G + 0.7 + K, D + 0.02),
        0.17,
        0.3,
        0.045,
        R,
        !1,
      ));
    let V = It(Lt.gloss, 0.86, 0.84, 0.76),
      Y = It(Lt.matte, 0.05, 0.05, 0.06);
    ((X, K, nt, Z, et) => z(X, K, U + 0.35, G - 0.35, nt, Z, V))(
      B + 0.4,
      H - 0.4,
      D,
      D + 0.08,
    );
    for (let X of [B, H])
      z(
        X < M ? X - 0.08 : X,
        X < M ? X : X + 0.08,
        U + 0.35,
        G - 0.35,
        O + 0.4,
        D - 0.4,
        V,
      );
    let st = 7,
      Q = () => ((st = (st * 9301 + 49297) % 233280), st / 233280);
    for (let X = 0; X < 3; X++) {
      let K = B + 1 + Q() * 0.8,
        nt = U + 0.55 + X * 0.5;
      for (; K < H - 1.6;) {
        let Z = 0.5 + Q() * 1.6;
        if (K + Z > H - 1) break;
        (z(K, K + Z, nt, nt + 0.3, D + 0.14, D + 0.18, Y), (K += Z + 0.35));
      }
    }
    for (let [X, K] of [
      [
        [B, G, D],
        [H, G, D],
      ],
      [
        [B, U, D],
        [H, U, D],
      ],
      [
        [B, G, D],
        [B, G, O],
      ],
      [
        [H, G, D],
        [H, G, O],
      ],
    ])
      Ae(o, w(...X), w(...K), 0.05, R, 4);
    for (let [X, K] of [
      [
        [B, G - 0.18, D + 0.05],
        [H, G - 0.18, D + 0.05],
      ],
      [
        [B, U + 0.18, D + 0.05],
        [H, U + 0.18, D + 0.05],
      ],
    ])
      Ae(o, w(...X), w(...K), 0.035, T, 4);
    let j = bn(1, 0.82, 0.5);
    for (let X = B + 0.3; X < H - 0.2; X += 0.45)
      for (let K of [O + 0.6, (O + D) / 2, D - 0.4]) {
        let nt = w(X, U - 0.04, K);
        Ze(
          o,
          nt[0] - 0.07,
          nt[1] - 0.1,
          nt[2] - 0.07,
          nt[0] + 0.07,
          nt[1],
          nt[2] + 0.07,
          j,
        );
      }
    {
      let X = It(Lt.stone, 0.76, 0.66, 0.48),
        K = It(Lt.stone, 0.6, 0.5, 0.35),
        nt = It(Lt.glass, 0.04, 0.045, 0.05),
        Z = Math.max(16, (c.top ?? S + 18) - S),
        et = (m > 0, 1);
      (z(M - 6.4, M + 6.4, G + 0.2, Z - 0.3, 0, 0.16, X),
        z(0.15, m - 0.15, 4.3, Z - 0.1, -0.02, 0.1, X),
        z(0, m, Z - 1, Z - 0.4, -0.1, 0.35, K));
      for (let ot of [2.4, m - 2.4])
        for (let at of [8.2, 11.6])
          z(ot - 0.6, ot + 0.6, at, at + 1.9, 0.16, 0.2, nt);
      (z(0.15, m - 0.15, -0.3, 4.3, -0.02, 0.08, K),
        z(M - 5, M + 5, 0, 3.3, 0.14, 0.18, nt));
      for (let [ot, at] of [
        [0.8, M - 7],
        [M + 7, m - 0.8],
      ])
        at - ot > 1.5 && z(ot, at, 0.6, 3.4, 0.14, 0.18, nt);
      let tt = G + 1.6,
        it = Math.min(Z - 4.4, tt + 6.2),
        rt = 2.3;
      z(M - rt, M + rt, tt, it, 0.22, 0.26, nt);
      let lt = w(M, it, 0.26),
        ct = [x, 0, v],
        dt = (ot) => {
          let at = (Math.PI * ot) / 12;
          return w(M + Math.cos(at) * rt, it + Math.sin(at) * rt, 0.26);
        };
      for (let ot = 0; ot < 12; ot++) ne(o, [lt, dt(ot), dt(ot + 1)], nt, ct);
      for (let ot = 0; ot <= 16; ot++) {
        let at = (Math.PI * ot) / 16,
          yt = w(
            M + Math.cos(at) * (rt + 0.45),
            it + Math.sin(at) * (rt + 0.45),
            0.25,
          );
        Ze(
          o,
          yt[0] - 0.22,
          yt[1] - 0.22,
          yt[2] - 0.22,
          yt[0] + 0.22,
          yt[1] + 0.22,
          yt[2] + 0.22,
          K,
        );
      }
      for (let ot = -rt + 0.77; ot < rt - 0.1; ot += 0.77)
        z(
          M + ot - 0.04,
          M + ot + 0.04,
          tt,
          it + Math.sqrt(Math.max(0, rt * rt - ot * ot)) - 0.05,
          0.2,
          0.26,
          X,
        );
      for (let ot = tt + 1; ot < it; ot += 1.05)
        z(M - rt, M + rt, ot - 0.04, ot + 0.04, 0.2, 0.26, X);
      for (let ot of [-1, 1]) {
        let at = M + ot * (rt + 1);
        (z(at - 0.4, at + 0.4, tt - 0.6, tt - 0.1, 0.16, 0.7, K),
          z(at - 0.45, at + 0.45, it + 0.2, it + 0.8, 0.16, 0.75, K));
        for (let vt = tt - 0.1; vt < it + 0.2; vt += 0.45) {
          let Pt = vt * 2.2,
            jt = w(
              at + Math.cos(Pt) * 0.12,
              vt + 0.22,
              0.42 + Math.sin(Pt) * 0.12,
            );
          Ze(
            o,
            jt[0] - 0.2,
            jt[1] - 0.23,
            jt[2] - 0.2,
            jt[0] + 0.2,
            jt[1] + 0.23,
            jt[2] + 0.2,
            X,
          );
        }
        for (let vt = G + 0.9; vt < Z - 1.2; vt += 0.95)
          for (let Pt = 3.9; Pt < 6.1; Pt += 0.9) {
            let jt = w(M + ot * Pt, vt, 0.24);
            Ze(
              o,
              jt[0] - 0.16,
              jt[1] - 0.16,
              jt[2] - 0.16,
              jt[0] + 0.16,
              jt[1] + 0.16,
              jt[2] + 0.16,
              Math.round(vt + Pt * 3) % 2 ? K : X,
            );
          }
        z(
          M + ot * 6.4 - 0.45,
          M + ot * 6.4 + 0.45,
          Z - 0.4,
          Z + 1.4,
          -0.1,
          0.7,
          X,
        );
        let yt = w(M + ot * 6.4, Z + 1.4, 0.35);
        Oe(
          o,
          yt[0],
          yt[2],
          [
            [0.38, yt[1]],
            [0.3, yt[1] + 0.5],
            [0.04, yt[1] + 1.2],
          ],
          8,
          K,
        );
      }
      (z(M - 4.6, M + 4.6, Z - 0.3, Z + 0.9, -0.1, 0.45, X),
        z(M - 3, M + 3, Z + 0.9, Z + 2.1, -0.1, 0.4, X),
        z(M - 1.4, M + 1.4, Z + 2.1, Z + 3.3, -0.1, 0.35, X));
      for (let [ot, at] of [
        [-4.2, Z + 0.9],
        [4.2, Z + 0.9],
        [-2.6, Z + 2.1],
        [2.6, Z + 2.1],
      ]) {
        let yt = w(M + ot, at, 0.22);
        Oe(
          o,
          yt[0],
          yt[2],
          [
            [0.2, yt[1]],
            [0.32, yt[1] + 0.35],
            [0.14, yt[1] + 0.7],
            [0.02, yt[1] + 0.9],
          ],
          8,
          K,
        );
      }
      let ut = w(M, Z + 3.3, 0.18);
      Oe(
        o,
        ut[0],
        ut[2],
        [
          [0.35, ut[1]],
          [0.45, ut[1] + 0.4],
          [0.2, ut[1] + 0.9],
          [0.03, ut[1] + 1.7],
        ],
        8,
        K,
      );
    }
  }
  {
    let f = s.juns
      .filter(
        (u) =>
          u.legs.some(([d]) => d.name === "Castro Street") &&
          u.legs.some(([d]) => d.name === "Market Street"),
      )
      .sort((u, d) => u.z - d.z)[0];
    if (f) {
      let u = f.x - 14,
        d = f.z + 9;
      for (let w = 0; w < 30 && n.surfaceAt(u, d) === "road"; w++)
        ((u -= 0.6), (d += 0.4));
      let p = l(u, d),
        m = 22,
        g = It(Lt.metal, 0.62, 0.62, 0.6);
      (Ae(o, [u, p, d], [u, p + m, d], [0.2, 0.1], g, 8),
        Ze(
          o,
          u - 0.5,
          p - 0.2,
          d - 0.5,
          u + 0.5,
          p + 0.6,
          d + 0.5,
          It(Lt.stone, 0.45, 0.44, 0.42),
        ),
        i.colliders.push({ t: "circ", x: u, z: d, r: 0.55 }));
      let b = 9.1,
        x = 6.1,
        v = 0.86,
        y = -0.5,
        M = 14,
        S = 6;
      for (let w = 0; w < M; w++)
        for (let z = 0; z < S; z++) {
          let _ = [
              [w, z],
              [w + 1, z],
              [w + 1, z + 1],
              [w, z + 1],
            ].map(([T, E]) => {
              let A = T / M,
                C = E / S,
                P =
                  Math.sin(A * 7.5 + 0.6) * 0.45 * A +
                  Math.sin(C * 3 + A * 4) * 0.1 * A;
              return [
                u + v * A * b - y * P,
                p + m - 0.25 - C * x - A * A * 0.6,
                d + y * A * b + v * P,
              ];
            }),
            R = GS[Math.min(5, Math.floor(z / (S / 6)))];
          for (let T of [1, -1]) {
            let E = T > 0 ? _ : [_[1], _[0], _[3], _[2]],
              A = E[1][0] - E[0][0],
              C = E[1][1] - E[0][1],
              P = E[1][2] - E[0][2],
              I = E[3][0] - E[0][0],
              L = E[3][1] - E[0][1],
              F = E[3][2] - E[0][2],
              N = C * F - P * L,
              B = P * I - A * F,
              H = A * L - C * I,
              O = Math.hypot(N, B, H) || 1;
            a.quad(
              E[0],
              E[1],
              E[2],
              E[3],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              It(Lt.matte, ...R),
              [N / O, B / O, H / O],
            );
          }
        }
    }
  }
  {
    let f = s.props,
      u = (p, m) => {
        let g = n.roadAt(p, m, 14);
        return g &&
          ((g.E.name === "Castro Street" && m > 3650 && m < 3990) ||
            (g.E.name === "Market Street" &&
              p > -3700 &&
              p < -3020 &&
              m > 3300 &&
              m < 3720))
          ? g
          : null;
      },
      d = It(Lt.metal, 0.75, 0.75, 0.72);
    for (let p = 0; p < f.n; p++) {
      if (f.kinds[f.pk[p]] !== "lamp") continue;
      let m = f.pf[p * 5],
        g = f.pf[p * 5 + 1];
      if (m < -3800 || m > -2950 || g < 3250 || g > 4e3) continue;
      let b = u(m, g);
      if (!b) continue;
      Ot(b.E, b.s, r);
      let x = Math.sign((m - r.x) * r.nx + (g - r.z) * r.nz) || 1,
        v = -r.nx * x,
        y = -r.nz * x,
        M = f.pf[p * 5 + 2] + 4.6,
        S = [m + v * 0.15, M, g + y * 0.15],
        w = [m + v * 1.5, M + 0.9, g + y * 1.5];
      Ae(o, S, w, 0.025, d, 4);
      for (let z = 0; z < 6; z++) {
        let T = (z / 6) * 0.9,
          E = ((z + 1) / 6) * 0.9,
          A = [
            S[0] + (w[0] - S[0]) * 0.12,
            S[1] + (w[1] - S[1]) * 0.12 - T,
            S[2] + (w[2] - S[2]) * 0.12,
          ],
          C = [
            S[0] + (w[0] - S[0]) * 1,
            S[1] + (w[1] - S[1]) * 1 - T,
            S[2] + (w[2] - S[2]) * 1,
          ],
          P = [C[0], C[1] - (E - T), C[2]],
          I = [A[0], A[1] - (E - T), A[2]],
          L = -y,
          F = v;
        (a.quad(
          A,
          C,
          P,
          I,
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          It(Lt.matte, ...GS[z]),
          [L, 0, F],
        ),
          a.quad(
            C,
            A,
            I,
            P,
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            It(Lt.matte, ...GS[z]),
            [-L, 0, -F],
          ));
      }
    }
  }
  {
    let f = s.juns.find(
      (u) =>
        u.legs.some(([d]) => d.name === "Castro Street") &&
        u.legs.some(([d]) => d.name === "18th Street"),
    );
    if (f)
      for (let [u, d] of f.legs) {
        let p = d === "a" ? u.s0 + 0.9 : u.s1 - 4.3,
          m = 12;
        for (let g = 0; g < m; g++) {
          let b = p + g * 0.283 + 0.012,
            x = b + 0.259,
            v = It(
              Lt.matte,
              ...GS[(d === "a" ? g : m - 1 - g) % 6].map((R) => R * 0.9),
            ),
            y = Ot(u, b, {}),
            M = Ot(u, x, {}),
            S = y.w - 0.35,
            w = M.w - 0.35,
            z = [];
          for (let [R, T, E] of [
            [y, S, -1],
            [M, w, -1],
            [M, w, 1],
            [y, S, 1],
          ]) {
            let A = R.x + R.nx * T * E,
              C = R.z + R.nz * T * E;
            z.push([
              A,
              Math.max(R.y, n.driveHeight(A, C, null, R.y)) + 0.03,
              C,
            ]);
          }
          (z[1][2] - z[0][2]) * (z[3][0] - z[0][0]) -
            (z[1][0] - z[0][0]) * (z[3][2] - z[0][2]) >
          0
            ? o.quad(
                z[0],
                z[1],
                z[2],
                z[3],
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                v,
                [0, 1, 0],
              )
            : o.quad(
                z[0],
                z[3],
                z[2],
                z[1],
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                v,
                [0, 1, 0],
              );
        }
      }
  }
  {
    let f = It(Lt.stone, 0.5, 0.48, 0.44),
      u = It(Lt.leaf, 0.06, 0.09, 0.035),
      d = [];
    {
      let p = s.props,
        m = p.kinds.indexOf("palm"),
        g = p.kinds.indexOf("tree");
      for (let b = 0; b < p.n; b++) {
        if (p.pk[b] !== m && p.pk[b] !== g) continue;
        let x = p.pf[b * 5],
          v = p.pf[b * 5 + 1];
        if (x < -3100 || x > -2600 || v < 2800 || v > 5200) continue;
        let y = n.roadAt(x, v, 1);
        y &&
          y.E.name === "Dolores Street" &&
          y.E.median &&
          y.d < 1.6 &&
          d.push([x, v]);
      }
    }
    for (let p of s.edges) {
      if (p.name !== "Dolores Street" || !p.median || p.inner || p.elev)
        continue;
      let m = p.s0 + 7,
        g = p.s1 - 7;
      if (g - m < 8) continue;
      let b = null;
      for (let x = m; x <= g + 0.01; x += Math.min(4, g - m)) {
        Ot(p, Math.min(x, g), r);
        let v = [r.x, r.y, r.z, r.nx, r.nz];
        if (b) {
          for (let M of [-1, 1]) {
            let S = b[0] + b[3] * 0.7 * M,
              w = b[2] + b[4] * 0.7 * M,
              z = v[0] + v[3] * 0.7 * M,
              _ = v[2] + v[4] * 0.7 * M;
            M > 0
              ? o.wall(
                  S,
                  w,
                  z,
                  _,
                  b[1] - 0.05,
                  v[1] - 0.05,
                  b[1] + 0.16,
                  v[1] + 0.16,
                  f,
                  0,
                  b[1],
                )
              : o.wall(
                  z,
                  _,
                  S,
                  w,
                  v[1] - 0.05,
                  b[1] - 0.05,
                  v[1] + 0.16,
                  b[1] + 0.16,
                  f,
                  0,
                  v[1],
                );
          }
          let y = [
            [b[0] - b[3] * 0.7, b[1] + 0.16, b[2] - b[4] * 0.7],
            [b[0] + b[3] * 0.7, b[1] + 0.16, b[2] + b[4] * 0.7],
            [v[0] + v[3] * 0.7, v[1] + 0.16, v[2] + v[4] * 0.7],
            [v[0] - v[3] * 0.7, v[1] + 0.16, v[2] - v[4] * 0.7],
          ];
          o.quad(
            y[0],
            y[3],
            y[2],
            y[1],
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            u,
            [0, 1, 0],
          );
        }
        if (((b = v), x >= g)) break;
      }
      for (let x = m + 4; x < g - 2; x += 13)
        (Ot(p, x, r),
          !d.some(([v, y]) => Math.hypot(v - r.x, y - r.z) < 7) &&
            (e.inst.push({
              kind: "palm",
              x: r.x,
              y: r.y + 0.16,
              z: r.z,
              rot: (x * 1.7) % 6.28,
              scale: 0.95 + 0.25 * ((x * 0.37) % 1),
            }),
            e.colliders.push({
              t: "circ",
              x: r.x,
              z: r.z,
              r: 0.45,
              y0: r.y - 1.5,
              y1: r.y + 8,
            })));
    }
  }
  {
    for (let b of s.edges) {
      if (b.name !== "24th Street" || b.inner || b.elev) continue;
      let x = 0;
      for (let v = b.s0 + 9; v < b.s1 - 9; v += 29, x++) {
        if ((Ot(b, v, r), r.x < -2160 || r.x > -700)) continue;
        let y = x % 2 ? 1 : -1,
          M = r.w + 0.55,
          S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M;
        if (n.surfaceAt(S, w) !== "walk") continue;
        let z = n.driveHeight(S, w);
        (e.inst.push(
          {
            kind: "tree",
            sp: "fpalm",
            x: S,
            y: z,
            z: w,
            rot: (v * 1.3) % 6.28,
            scale: 1.05 + 0.3 * ((v * 0.37) % 1),
          },
          {
            kind: "well",
            x: S,
            y: z,
            z: w,
            rot: Math.atan2(r.dx, r.dz),
            scale: 1,
          },
        ),
          e.colliders.push({
            t: "circ",
            x: S,
            z: w,
            r: 0.35,
            y0: z - 1.5,
            y1: z + 8,
          }));
      }
    }
    let f = [];
    for (let b of s.edges) {
      if (b.name !== "Mission Street" || b.inner || b.elev) continue;
      let x = 0;
      for (let v = b.s0 + 7; v < b.s1 - 7; v += 26, x++) {
        if ((Ot(b, v, r), r.z < 3050 || r.z > 4850)) continue;
        let y = x % 2 ? 1 : -1,
          M = r.w + 0.6,
          S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M;
        if (n.surfaceAt(S, w) !== "walk") continue;
        let z = n.driveHeight(S, w);
        (Math.abs(r.z - 3392) < 90 && f.push(r.x),
          e.inst.push(
            {
              kind: "tree",
              sp: "fpalm",
              x: S,
              y: z,
              z: w,
              rot: (v * 1.7) % 6.28,
              scale: 1.45 + 0.35 * ((v * 0.53) % 1),
            },
            {
              kind: "well",
              x: S,
              y: z,
              z: w,
              rot: Math.atan2(r.dx, r.dz),
              scale: 1,
            },
          ),
          e.colliders.push({
            t: "circ",
            x: S,
            z: w,
            r: 0.35,
            y0: z - 1.5,
            y1: z + 8,
          }));
      }
    }
    if (f.length) {
      let b = f.reduce((x, v) => x + v) / f.length;
      for (let x of s.edges)
        if (!(x.name !== "16th Street" || x.inner || x.elev))
          for (let v = x.s0 + 4; v < x.s1 - 4; v += 9) {
            Ot(x, v, r);
            let y = Math.abs(r.x - b);
            if (!(y < 14 || y > 55 || Math.abs(r.z - 3392) > 40))
              for (let M of [-1, 1]) {
                let S = r.w + 2.5 + 2 * ((v * 0.31) % 1),
                  w = r.x + r.nx * M * S,
                  z = r.z + r.nz * M * S;
                if (n.surfaceAt(w, z) !== "walk") continue;
                let _ = n.driveHeight(w, z);
                (e.inst.push({
                  kind: "tree",
                  sp: "fpalm",
                  x: w,
                  y: _,
                  z,
                  rot: (v * 2.1 + M) % 6.28,
                  scale: 1.6 + 0.3 * ((v * 0.71) % 1),
                }),
                  e.colliders.push({
                    t: "circ",
                    x: w,
                    z,
                    r: 0.35,
                    y0: _ - 1.5,
                    y1: _ + 8,
                  }));
              }
          }
    }
    for (let b of s.edges) {
      if (b.name !== "Clarion Alley" || b.inner || b.elev) continue;
      let x = It(Lt.stone, 0.27, 0.265, 0.25),
        v = null;
      for (let y = b.s0; y <= b.s1 + 0.01; y += Math.min(3, b.s1 - b.s0)) {
        Ot(b, Math.min(y, b.s1), r);
        let M = 4.6,
          S = [r.x - r.nx * M, r.z - r.nz * M, r.x + r.nx * M, r.z + r.nz * M],
          w = n.terrainAt(S[0], S[1]),
          z = n.terrainAt(S[2], S[3]),
          _ = r.y;
        if (
          (S.push(Math.max(w, _ - 0.3) + 0.06, Math.max(z, _ - 0.3) + 0.06),
          v &&
            ne(
              o,
              [
                [v[0], v[4], v[1]],
                [v[2], v[5], v[3]],
                [S[2], S[5], S[3]],
                [S[0], S[4], S[1]],
              ],
              x,
              [0, 1, 0],
              (R) => [R[0] * 0.5, R[2] * 0.5],
            ),
          (v = S),
          y >= b.s1)
        )
          break;
      }
    }
    let u = It(Lt.matte, 0.32, 0.2, 0.12),
      d = It(Lt.leaf, 0.07, 0.06, 0.04),
      p = [
        It(Lt.matte, 0.72, 0.2, 0.14),
        It(Lt.matte, 0.15, 0.35, 0.6),
        It(Lt.matte, 0.85, 0.65, 0.12),
        u,
      ],
      m = [];
    {
      let b = s.bld;
      for (let x of s.edges)
        if (x.name === "Clarion Alley" && !x.inner) {
          let v = 1e9,
            y = 1e9,
            M = -1e9,
            S = -1e9;
          for (let w = 0; w < x.n; w++)
            ((v = Math.min(v, x.P[w * 3])),
              (M = Math.max(M, x.P[w * 3])),
              (y = Math.min(y, x.P[w * 3 + 1])),
              (S = Math.max(S, x.P[w * 3 + 1])));
          for (let w = 0; w < b.n; w++) {
            let z = b.rStart[b.bRing[w]],
              _ = b.rStart[b.bRing[w] + 1],
              R = b.pts[z * 2],
              T = b.pts[z * 2 + 1];
            R > v - 60 &&
              R < M + 60 &&
              T > y - 60 &&
              T < S + 60 &&
              m.push(b.pts.subarray(z * 2, _ * 2));
          }
        }
    }
    let g = (b, x) =>
      m.some((v) => {
        let y = !1;
        for (let M = 0, S = v.length - 2; M < v.length; S = M, M += 2)
          v[M + 1] > x != v[S + 1] > x &&
            b <
              ((v[S] - v[M]) * (x - v[M + 1])) / (v[S + 1] - v[M + 1]) + v[M] &&
            (y = !y);
        return y;
      });
    for (let b of s.edges) {
      if (b.name !== "Clarion Alley" || b.inner || b.elev) continue;
      let x = 0;
      for (let v = b.s0 + 6; v < b.s1 - 5; v += 8.5, x++) {
        Ot(b, v, r);
        let y = x % 2 ? 1 : -1,
          M = r.w + (b.sw || 0) - 0.5;
        for (let P = r.w; P < M + 0.5; P += 0.05)
          if (
            [-0.95, 0, 0.95].some((I) =>
              g(r.x + r.nx * y * P + r.dx * I, r.z + r.nz * y * P + r.dz * I),
            )
          ) {
            M = Math.min(M, P - 0.45);
            break;
          }
        if (M < r.w + 0.3) continue;
        let S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M,
          z = n.driveHeight(S, w),
          _ = r.dx * 0.9,
          R = r.dz * 0.9,
          T = r.nx * 0.32,
          E = r.nz * 0.32,
          A = p[(x * 3) % p.length],
          C = [
            [S - _ - T, w - R - E],
            [S + _ - T, w + R - E],
            [S + _ + T, w + R + E],
            [S - _ + T, w - R + E],
          ];
        for (let P = 0; P < 4; P++) {
          let [I, L] = C[P],
            [F, N] = C[(P + 1) % 4],
            B = (I + F) / 2 - S,
            H = (L + N) / 2 - w;
          ne(
            o,
            [
              [I, z, L],
              [F, z, N],
              [F, z + 0.62, N],
              [I, z + 0.62, L],
            ],
            A,
            [B, 0, H],
          );
        }
        (ne(
          o,
          C.map(([P, I]) => [P, z + 0.56, I]),
          d,
          [0, 1, 0],
        ),
          e.inst.push({
            kind: x % 3 ? "shrub" : "flowers",
            x: S,
            y: z + 0.5,
            z: w,
            rot: v,
            scale: 0.55,
          }),
          e.colliders.push({
            t: "circ",
            x: S,
            z: w,
            r: 0.75,
            y0: z - 1,
            y1: z + 1.5,
          }));
      }
    }
  }
  (gn(i.group, o, t.lm, "Castro"),
    gn(i.group, a, t.ds, "CastroFlags", { shadow: !0 }));
}
