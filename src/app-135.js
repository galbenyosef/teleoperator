// app 135 — math
// Lines 89567-90570 of readable/app.pretty.js (statement-aligned).
function Oj(o, t, e) {
  let { D: s, L: n } = e,
    i = new Be(),
    a = new Be(),
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
        v = h.pts[(d + g) * 2 + 1],
        x = h.pts[(d + ((g + 1) % m)) * 2],
        y = h.pts[(d + ((g + 1) % m)) * 2 + 1],
        M = Math.hypot(x - b, y - v);
      if (M < 8) continue;
      let S = (b + x) / 2,
        w = (v + y) / 2,
        _ = n.roadAt(S, w, 30);
      if (!_ || _.E.name !== "Castro Street") continue;
      let z = _.d - _.w;
      (!c || z < c.d) &&
        (c = { ax: b, az: v, bx: x, bz: y, l: M, d: z, top: h.bF[u * 3 + 1] });
    }
  }
  if (c) {
    let { ax: f, az: u, bx: d, bz: p, l: m } = c,
      g = (d - f) / m,
      b = (p - u) / m,
      v = -b,
      x = g,
      y = n.roadAt((f + d) / 2, (u + p) / 2, 30);
    (Ot(y.E, y.s, r),
      (r.x - (f + d) / 2) * v + (r.z - (u + p) / 2) * x < 0 &&
        ((v = -v), (x = -x)));
    let M = m / 2,
      S = l(f + g * M + v * 2, u + b * M + x * 2),
      w = (j, K, nt) => [f + g * j + v * nt, S + K, u + b * j + x * nt],
      _ = (j, K, nt, Q, et, st, ot, rt = i) => {
        let lt = (it, at, yt) => w(it, at, yt),
          ht = [g, 0, b],
          pt = [v, 0, x],
          ut = [
            [[j, nt, st], [K, nt, st], [K, Q, st], [j, Q, st], pt],
            [
              [K, nt, et],
              [j, nt, et],
              [j, Q, et],
              [K, Q, et],
              pt.map((it) => -it),
            ],
            [[K, nt, st], [K, nt, et], [K, Q, et], [K, Q, st], ht],
            [
              [j, nt, et],
              [j, nt, st],
              [j, Q, st],
              [j, Q, et],
              ht.map((it) => -it),
            ],
            [
              [j, Q, st],
              [K, Q, st],
              [K, Q, et],
              [j, Q, et],
              [0, 1, 0],
            ],
            [
              [j, nt, et],
              [K, nt, et],
              [K, nt, st],
              [j, nt, st],
              [0, -1, 0],
            ],
          ];
        for (let [it, at, yt, vt, At] of ut) {
          let Ut = lt(...it),
            Gt = lt(...at),
            Pt = lt(...yt),
            Vt = lt(...vt),
            Kt =
              (Gt[1] - Ut[1]) * (Pt[2] - Ut[2]) -
              (Gt[2] - Ut[2]) * (Pt[1] - Ut[1]),
            ue =
              (Gt[2] - Ut[2]) * (Pt[0] - Ut[0]) -
              (Gt[0] - Ut[0]) * (Pt[2] - Ut[2]),
            ne =
              (Gt[0] - Ut[0]) * (Pt[1] - Ut[1]) -
              (Gt[1] - Ut[1]) * (Pt[0] - Ut[0]);
          Kt * At[0] + ue * At[1] + ne * At[2] >= 0
            ? rt.quad(Ut, Gt, Pt, Vt, [0, 0], [1, 0], [1, 1], [0, 1], ot, At)
            : rt.quad(Ut, Vt, Pt, Gt, [0, 0], [0, 1], [1, 1], [1, 0], ot, At);
        }
      },
      z = Lt(Ct.gloss, 0.8, 0.72, 0.52),
      A = wn(1, 0.1, 0.16),
      T = wn(1, 0.62, 0.16),
      E = Lt(Ct.gloss, 0.12, 0.03, 0.03),
      R = Lt(Ct.gloss, 0.5, 0.07, 0.04),
      P = M,
      C = 0.36,
      I = 0.35,
      L = 2.55,
      F = 7.4,
      O = 21.2;
    (_(P - C, P + C, F, O, I, L, R),
      _(P - C - 0.04, P + C + 0.04, O, O + 0.6, I, L + 0.2, E));
    for (let j = F + 0.6; j < O; j += 3.2)
      _(P - 0.06, P + 0.06, j, j + 0.12, 0, I, E);
    for (let j of [-1, 1]) {
      let K = Math.sign(b * v - g * x) || 1,
        nt = (et, st) =>
          w(P + j * (C + 0.06), (F + O) / 2 + st, (I + L) / 2 + et * j * K),
        Q = (et, st) =>
          w(P + j * (C + 0.16), (F + O) / 2 + st, (I + L) / 2 + et * j * K);
      (vw(i, "CASTRO", nt, 0.3, 0.42, 0.13, z),
        vw(i, "CASTRO", Q, 0.3, 0.42, 0.05, A));
      for (let [et, st] of [
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
        Ce(i, nt(...et), nt(...st), 0.045, T, 4);
    }
    let B = M - 6.2,
      H = M + 6.2,
      N = 0.2,
      D = 3.4,
      U = 3.9,
      G = 6.3;
    (_(B, H, U, G, N, D, Lt(Ct.gloss, 0.86, 0.66, 0.18)),
      _(B + 0.1, H - 0.1, U - 0.06, U, N, D - 0.1, E),
      _(
        B - 0.1,
        H + 0.1,
        G - 0.3,
        G + 0.06,
        N + 0.06,
        D + 0.1,
        Lt(Ct.gloss, 0.62, 0.05, 0.05),
      ));
    let W = M - 3,
      V = M + 3;
    (_(W, V, G, G + 1.4, D - 0.35, D - 0.05, Lt(Ct.gloss, 0.86, 0.66, 0.18)),
      vw(
        i,
        "CASTRO",
        (j, K) =>
          w(M + j * (v * b - x * g > 0 ? -1 : 1), G + 0.7 + K, D + 0.02),
        0.17,
        0.3,
        0.045,
        A,
        !1,
      ));
    let $ = Lt(Ct.gloss, 0.86, 0.84, 0.76),
      J = Lt(Ct.matte, 0.05, 0.05, 0.06);
    ((j, K, nt, Q, et) => _(j, K, U + 0.35, G - 0.35, nt, Q, $))(
      B + 0.4,
      H - 0.4,
      D,
      D + 0.08,
    );
    for (let j of [B, H])
      _(
        j < M ? j - 0.08 : j,
        j < M ? j : j + 0.08,
        U + 0.35,
        G - 0.35,
        N + 0.4,
        D - 0.4,
        $,
      );
    let tt = 7,
      Z = () => ((tt = (tt * 9301 + 49297) % 233280), tt / 233280);
    for (let j = 0; j < 3; j++) {
      let K = B + 1 + Z() * 0.8,
        nt = U + 0.55 + j * 0.5;
      for (; K < H - 1.6;) {
        let Q = 0.5 + Z() * 1.6;
        if (K + Q > H - 1) break;
        (_(K, K + Q, nt, nt + 0.3, D + 0.14, D + 0.18, J), (K += Q + 0.35));
      }
    }
    for (let [j, K] of [
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
        [B, G, N],
      ],
      [
        [H, G, D],
        [H, G, N],
      ],
    ])
      Ce(i, w(...j), w(...K), 0.05, A, 4);
    for (let [j, K] of [
      [
        [B, G - 0.18, D + 0.05],
        [H, G - 0.18, D + 0.05],
      ],
      [
        [B, U + 0.18, D + 0.05],
        [H, U + 0.18, D + 0.05],
      ],
    ])
      Ce(i, w(...j), w(...K), 0.035, T, 4);
    let q = wn(1, 0.82, 0.5);
    for (let j = B + 0.3; j < H - 0.2; j += 0.45)
      for (let K of [N + 0.6, (N + D) / 2, D - 0.4]) {
        let nt = w(j, U - 0.04, K);
        ss(
          i,
          nt[0] - 0.07,
          nt[1] - 0.1,
          nt[2] - 0.07,
          nt[0] + 0.07,
          nt[1],
          nt[2] + 0.07,
          q,
        );
      }
    {
      let j = Lt(Ct.stone, 0.76, 0.66, 0.48),
        K = Lt(Ct.stone, 0.6, 0.5, 0.35),
        nt = Lt(Ct.glass, 0.04, 0.045, 0.05),
        Q = Math.max(16, (c.top ?? S + 18) - S),
        et = (m > 0, 1);
      (_(M - 6.4, M + 6.4, G + 0.2, Q - 0.3, 0, 0.16, j),
        _(0.15, m - 0.15, 4.3, Q - 0.1, -0.02, 0.1, j),
        _(0, m, Q - 1, Q - 0.4, -0.1, 0.35, K));
      for (let it of [2.4, m - 2.4])
        for (let at of [8.2, 11.6])
          _(it - 0.6, it + 0.6, at, at + 1.9, 0.16, 0.2, nt);
      (_(0.15, m - 0.15, -0.3, 4.3, -0.02, 0.08, K),
        _(M - 5, M + 5, 0, 3.3, 0.14, 0.18, nt));
      for (let [it, at] of [
        [0.8, M - 7],
        [M + 7, m - 0.8],
      ])
        at - it > 1.5 && _(it, at, 0.6, 3.4, 0.14, 0.18, nt);
      let st = G + 1.6,
        ot = Math.min(Q - 4.4, st + 6.2),
        rt = 2.3;
      _(M - rt, M + rt, st, ot, 0.22, 0.26, nt);
      let lt = w(M, ot, 0.26),
        ht = [v, 0, x],
        pt = (it) => {
          let at = (Math.PI * it) / 12;
          return w(M + Math.cos(at) * rt, ot + Math.sin(at) * rt, 0.26);
        };
      for (let it = 0; it < 12; it++) oe(i, [lt, pt(it), pt(it + 1)], nt, ht);
      for (let it = 0; it <= 16; it++) {
        let at = (Math.PI * it) / 16,
          yt = w(
            M + Math.cos(at) * (rt + 0.45),
            ot + Math.sin(at) * (rt + 0.45),
            0.25,
          );
        ss(
          i,
          yt[0] - 0.22,
          yt[1] - 0.22,
          yt[2] - 0.22,
          yt[0] + 0.22,
          yt[1] + 0.22,
          yt[2] + 0.22,
          K,
        );
      }
      for (let it = -rt + 0.77; it < rt - 0.1; it += 0.77)
        _(
          M + it - 0.04,
          M + it + 0.04,
          st,
          ot + Math.sqrt(Math.max(0, rt * rt - it * it)) - 0.05,
          0.2,
          0.26,
          j,
        );
      for (let it = st + 1; it < ot; it += 1.05)
        _(M - rt, M + rt, it - 0.04, it + 0.04, 0.2, 0.26, j);
      for (let it of [-1, 1]) {
        let at = M + it * (rt + 1);
        (_(at - 0.4, at + 0.4, st - 0.6, st - 0.1, 0.16, 0.7, K),
          _(at - 0.45, at + 0.45, ot + 0.2, ot + 0.8, 0.16, 0.75, K));
        for (let vt = st - 0.1; vt < ot + 0.2; vt += 0.45) {
          let At = vt * 2.2,
            Ut = w(
              at + Math.cos(At) * 0.12,
              vt + 0.22,
              0.42 + Math.sin(At) * 0.12,
            );
          ss(
            i,
            Ut[0] - 0.2,
            Ut[1] - 0.23,
            Ut[2] - 0.2,
            Ut[0] + 0.2,
            Ut[1] + 0.23,
            Ut[2] + 0.2,
            j,
          );
        }
        for (let vt = G + 0.9; vt < Q - 1.2; vt += 0.95)
          for (let At = 3.9; At < 6.1; At += 0.9) {
            let Ut = w(M + it * At, vt, 0.24);
            ss(
              i,
              Ut[0] - 0.16,
              Ut[1] - 0.16,
              Ut[2] - 0.16,
              Ut[0] + 0.16,
              Ut[1] + 0.16,
              Ut[2] + 0.16,
              Math.round(vt + At * 3) % 2 ? K : j,
            );
          }
        _(
          M + it * 6.4 - 0.45,
          M + it * 6.4 + 0.45,
          Q - 0.4,
          Q + 1.4,
          -0.1,
          0.7,
          j,
        );
        let yt = w(M + it * 6.4, Q + 1.4, 0.35);
        qe(
          i,
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
      (_(M - 4.6, M + 4.6, Q - 0.3, Q + 0.9, -0.1, 0.45, j),
        _(M - 3, M + 3, Q + 0.9, Q + 2.1, -0.1, 0.4, j),
        _(M - 1.4, M + 1.4, Q + 2.1, Q + 3.3, -0.1, 0.35, j));
      for (let [it, at] of [
        [-4.2, Q + 0.9],
        [4.2, Q + 0.9],
        [-2.6, Q + 2.1],
        [2.6, Q + 2.1],
      ]) {
        let yt = w(M + it, at, 0.22);
        qe(
          i,
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
      let ut = w(M, Q + 3.3, 0.18);
      qe(
        i,
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
        g = Lt(Ct.metal, 0.62, 0.62, 0.6);
      (Ce(i, [u, p, d], [u, p + m, d], [0.2, 0.1], g, 8),
        ss(
          i,
          u - 0.5,
          p - 0.2,
          d - 0.5,
          u + 0.5,
          p + 0.6,
          d + 0.5,
          Lt(Ct.stone, 0.45, 0.44, 0.42),
        ),
        o.colliders.push({ t: "circ", x: u, z: d, r: 0.55 }));
      let b = 9.1,
        v = 6.1,
        x = 0.86,
        y = -0.5,
        M = 14,
        S = 6;
      for (let w = 0; w < M; w++)
        for (let _ = 0; _ < S; _++) {
          let z = [
              [w, _],
              [w + 1, _],
              [w + 1, _ + 1],
              [w, _ + 1],
            ].map(([T, E]) => {
              let R = T / M,
                P = E / S,
                C =
                  Math.sin(R * 7.5 + 0.6) * 0.45 * R +
                  Math.sin(P * 3 + R * 4) * 0.1 * R;
              return [
                u + x * R * b - y * C,
                p + m - 0.25 - P * v - R * R * 0.6,
                d + y * R * b + x * C,
              ];
            }),
            A = Gk[Math.min(5, Math.floor(_ / (S / 6)))];
          for (let T of [1, -1]) {
            let E = T > 0 ? z : [z[1], z[0], z[3], z[2]],
              R = E[1][0] - E[0][0],
              P = E[1][1] - E[0][1],
              C = E[1][2] - E[0][2],
              I = E[3][0] - E[0][0],
              L = E[3][1] - E[0][1],
              F = E[3][2] - E[0][2],
              O = P * F - C * L,
              B = C * I - R * F,
              H = R * L - P * I,
              N = Math.hypot(O, B, H) || 1;
            a.quad(
              E[0],
              E[1],
              E[2],
              E[3],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              Lt(Ct.matte, ...A),
              [O / N, B / N, H / N],
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
      d = Lt(Ct.metal, 0.75, 0.75, 0.72);
    for (let p = 0; p < f.n; p++) {
      if (f.kinds[f.pk[p]] !== "lamp") continue;
      let m = f.pf[p * 5],
        g = f.pf[p * 5 + 1];
      if (m < -3800 || m > -2950 || g < 3250 || g > 4e3) continue;
      let b = u(m, g);
      if (!b) continue;
      Ot(b.E, b.s, r);
      let v = Math.sign((m - r.x) * r.nx + (g - r.z) * r.nz) || 1,
        x = -r.nx * v,
        y = -r.nz * v,
        M = f.pf[p * 5 + 2] + 4.6,
        S = [m + x * 0.15, M, g + y * 0.15],
        w = [m + x * 1.5, M + 0.9, g + y * 1.5];
      Ce(i, S, w, 0.025, d, 4);
      for (let _ = 0; _ < 6; _++) {
        let T = (_ / 6) * 0.9,
          E = ((_ + 1) / 6) * 0.9,
          R = [
            S[0] + (w[0] - S[0]) * 0.12,
            S[1] + (w[1] - S[1]) * 0.12 - T,
            S[2] + (w[2] - S[2]) * 0.12,
          ],
          P = [
            S[0] + (w[0] - S[0]) * 1,
            S[1] + (w[1] - S[1]) * 1 - T,
            S[2] + (w[2] - S[2]) * 1,
          ],
          C = [P[0], P[1] - (E - T), P[2]],
          I = [R[0], R[1] - (E - T), R[2]],
          L = -y,
          F = x;
        (a.quad(
          R,
          P,
          C,
          I,
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          Lt(Ct.matte, ...Gk[_]),
          [L, 0, F],
        ),
          a.quad(
            P,
            R,
            I,
            C,
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Lt(Ct.matte, ...Gk[_]),
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
            v = b + 0.259,
            x = Lt(
              Ct.matte,
              ...Gk[(d === "a" ? g : m - 1 - g) % 6].map((A) => A * 0.9),
            ),
            y = Ot(u, b, {}),
            M = Ot(u, v, {}),
            S = y.w - 0.35,
            w = M.w - 0.35,
            _ = [];
          for (let [A, T, E] of [
            [y, S, -1],
            [M, w, -1],
            [M, w, 1],
            [y, S, 1],
          ]) {
            let R = A.x + A.nx * T * E,
              P = A.z + A.nz * T * E;
            _.push([
              R,
              Math.max(A.y, n.driveHeight(R, P, null, A.y)) + 0.03,
              P,
            ]);
          }
          (_[1][2] - _[0][2]) * (_[3][0] - _[0][0]) -
            (_[1][0] - _[0][0]) * (_[3][2] - _[0][2]) >
          0
            ? i.quad(
                _[0],
                _[1],
                _[2],
                _[3],
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                x,
                [0, 1, 0],
              )
            : i.quad(
                _[0],
                _[3],
                _[2],
                _[1],
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                x,
                [0, 1, 0],
              );
        }
      }
  }
  {
    let f = Lt(Ct.stone, 0.5, 0.48, 0.44),
      u = Lt(Ct.leaf, 0.06, 0.09, 0.035),
      d = [];
    {
      let p = s.props,
        m = p.kinds.indexOf("palm"),
        g = p.kinds.indexOf("tree");
      for (let b = 0; b < p.n; b++) {
        if (p.pk[b] !== m && p.pk[b] !== g) continue;
        let v = p.pf[b * 5],
          x = p.pf[b * 5 + 1];
        if (v < -3100 || v > -2600 || x < 2800 || x > 5200) continue;
        let y = n.roadAt(v, x, 1);
        y &&
          y.E.name === "Dolores Street" &&
          y.E.median &&
          y.d < 1.6 &&
          d.push([v, x]);
      }
    }
    for (let p of s.edges) {
      if (p.name !== "Dolores Street" || !p.median || p.inner || p.elev)
        continue;
      let m = p.s0 + 7,
        g = p.s1 - 7;
      if (g - m < 8) continue;
      let b = null;
      for (let v = m; v <= g + 0.01; v += Math.min(4, g - m)) {
        Ot(p, Math.min(v, g), r);
        let x = [r.x, r.y, r.z, r.nx, r.nz];
        if (b) {
          for (let M of [-1, 1]) {
            let S = b[0] + b[3] * 0.7 * M,
              w = b[2] + b[4] * 0.7 * M,
              _ = x[0] + x[3] * 0.7 * M,
              z = x[2] + x[4] * 0.7 * M;
            M > 0
              ? i.wall(
                  S,
                  w,
                  _,
                  z,
                  b[1] - 0.05,
                  x[1] - 0.05,
                  b[1] + 0.16,
                  x[1] + 0.16,
                  f,
                  0,
                  b[1],
                )
              : i.wall(
                  _,
                  z,
                  S,
                  w,
                  x[1] - 0.05,
                  b[1] - 0.05,
                  x[1] + 0.16,
                  b[1] + 0.16,
                  f,
                  0,
                  x[1],
                );
          }
          let y = [
            [b[0] - b[3] * 0.7, b[1] + 0.16, b[2] - b[4] * 0.7],
            [b[0] + b[3] * 0.7, b[1] + 0.16, b[2] + b[4] * 0.7],
            [x[0] + x[3] * 0.7, x[1] + 0.16, x[2] + x[4] * 0.7],
            [x[0] - x[3] * 0.7, x[1] + 0.16, x[2] - x[4] * 0.7],
          ];
          i.quad(
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
        if (((b = x), v >= g)) break;
      }
      for (let v = m + 4; v < g - 2; v += 13)
        (Ot(p, v, r),
          !d.some(([x, y]) => Math.hypot(x - r.x, y - r.z) < 7) &&
            (e.inst.push({
              kind: "palm",
              x: r.x,
              y: r.y + 0.16,
              z: r.z,
              rot: (v * 1.7) % 6.28,
              scale: 0.95 + 0.25 * ((v * 0.37) % 1),
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
      let v = 0;
      for (let x = b.s0 + 9; x < b.s1 - 9; x += 29, v++) {
        if ((Ot(b, x, r), r.x < -2160 || r.x > -700)) continue;
        let y = v % 2 ? 1 : -1,
          M = r.w + 0.55,
          S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M;
        if (n.surfaceAt(S, w) !== "walk") continue;
        let _ = n.driveHeight(S, w);
        (e.inst.push(
          {
            kind: "tree",
            sp: "fpalm",
            x: S,
            y: _,
            z: w,
            rot: (x * 1.3) % 6.28,
            scale: 1.05 + 0.3 * ((x * 0.37) % 1),
          },
          {
            kind: "well",
            x: S,
            y: _,
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
            y0: _ - 1.5,
            y1: _ + 8,
          }));
      }
    }
    let f = [];
    for (let b of s.edges) {
      if (b.name !== "Mission Street" || b.inner || b.elev) continue;
      let v = 0;
      for (let x = b.s0 + 7; x < b.s1 - 7; x += 26, v++) {
        if ((Ot(b, x, r), r.z < 3050 || r.z > 4850)) continue;
        let y = v % 2 ? 1 : -1,
          M = r.w + 0.6,
          S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M;
        if (n.surfaceAt(S, w) !== "walk") continue;
        let _ = n.driveHeight(S, w);
        (Math.abs(r.z - 3392) < 90 && f.push(r.x),
          e.inst.push(
            {
              kind: "tree",
              sp: "fpalm",
              x: S,
              y: _,
              z: w,
              rot: (x * 1.7) % 6.28,
              scale: 1.45 + 0.35 * ((x * 0.53) % 1),
            },
            {
              kind: "well",
              x: S,
              y: _,
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
            y0: _ - 1.5,
            y1: _ + 8,
          }));
      }
    }
    if (f.length) {
      let b = f.reduce((v, x) => v + x) / f.length;
      for (let v of s.edges)
        if (!(v.name !== "16th Street" || v.inner || v.elev))
          for (let x = v.s0 + 4; x < v.s1 - 4; x += 9) {
            Ot(v, x, r);
            let y = Math.abs(r.x - b);
            if (!(y < 14 || y > 55 || Math.abs(r.z - 3392) > 40))
              for (let M of [-1, 1]) {
                let S = r.w + 2.5 + 2 * ((x * 0.31) % 1),
                  w = r.x + r.nx * M * S,
                  _ = r.z + r.nz * M * S;
                if (n.surfaceAt(w, _) !== "walk") continue;
                let z = n.driveHeight(w, _);
                (e.inst.push({
                  kind: "tree",
                  sp: "fpalm",
                  x: w,
                  y: z,
                  z: _,
                  rot: (x * 2.1 + M) % 6.28,
                  scale: 1.6 + 0.3 * ((x * 0.71) % 1),
                }),
                  e.colliders.push({
                    t: "circ",
                    x: w,
                    z: _,
                    r: 0.35,
                    y0: z - 1.5,
                    y1: z + 8,
                  }));
              }
          }
    }
    for (let b of s.edges) {
      if (b.name !== "Clarion Alley" || b.inner || b.elev) continue;
      let v = Lt(Ct.stone, 0.27, 0.265, 0.25),
        x = null;
      for (let y = b.s0; y <= b.s1 + 0.01; y += Math.min(3, b.s1 - b.s0)) {
        Ot(b, Math.min(y, b.s1), r);
        let M = 4.6,
          S = [r.x - r.nx * M, r.z - r.nz * M, r.x + r.nx * M, r.z + r.nz * M],
          w = n.terrainAt(S[0], S[1]),
          _ = n.terrainAt(S[2], S[3]),
          z = r.y;
        if (
          (S.push(Math.max(w, z - 0.3) + 0.06, Math.max(_, z - 0.3) + 0.06),
          x &&
            oe(
              i,
              [
                [x[0], x[4], x[1]],
                [x[2], x[5], x[3]],
                [S[2], S[5], S[3]],
                [S[0], S[4], S[1]],
              ],
              v,
              [0, 1, 0],
              (A) => [A[0] * 0.5, A[2] * 0.5],
            ),
          (x = S),
          y >= b.s1)
        )
          break;
      }
    }
    let u = Lt(Ct.matte, 0.32, 0.2, 0.12),
      d = Lt(Ct.leaf, 0.07, 0.06, 0.04),
      p = [
        Lt(Ct.matte, 0.72, 0.2, 0.14),
        Lt(Ct.matte, 0.15, 0.35, 0.6),
        Lt(Ct.matte, 0.85, 0.65, 0.12),
        u,
      ],
      m = [];
    {
      let b = s.bld;
      for (let v of s.edges)
        if (v.name === "Clarion Alley" && !v.inner) {
          let x = 1e9,
            y = 1e9,
            M = -1e9,
            S = -1e9;
          for (let w = 0; w < v.n; w++)
            ((x = Math.min(x, v.P[w * 3])),
              (M = Math.max(M, v.P[w * 3])),
              (y = Math.min(y, v.P[w * 3 + 1])),
              (S = Math.max(S, v.P[w * 3 + 1])));
          for (let w = 0; w < b.n; w++) {
            let _ = b.rStart[b.bRing[w]],
              z = b.rStart[b.bRing[w] + 1],
              A = b.pts[_ * 2],
              T = b.pts[_ * 2 + 1];
            A > x - 60 &&
              A < M + 60 &&
              T > y - 60 &&
              T < S + 60 &&
              m.push(b.pts.subarray(_ * 2, z * 2));
          }
        }
    }
    let g = (b, v) =>
      m.some((x) => {
        let y = !1;
        for (let M = 0, S = x.length - 2; M < x.length; S = M, M += 2)
          x[M + 1] > v != x[S + 1] > v &&
            b <
              ((x[S] - x[M]) * (v - x[M + 1])) / (x[S + 1] - x[M + 1]) + x[M] &&
            (y = !y);
        return y;
      });
    for (let b of s.edges) {
      if (b.name !== "Clarion Alley" || b.inner || b.elev) continue;
      let v = 0;
      for (let x = b.s0 + 6; x < b.s1 - 5; x += 8.5, v++) {
        Ot(b, x, r);
        let y = v % 2 ? 1 : -1,
          M = r.w + (b.sw || 0) - 0.5;
        for (let C = r.w; C < M + 0.5; C += 0.05)
          if (
            [-0.95, 0, 0.95].some((I) =>
              g(r.x + r.nx * y * C + r.dx * I, r.z + r.nz * y * C + r.dz * I),
            )
          ) {
            M = Math.min(M, C - 0.45);
            break;
          }
        if (M < r.w + 0.3) continue;
        let S = r.x + r.nx * y * M,
          w = r.z + r.nz * y * M,
          _ = n.driveHeight(S, w),
          z = r.dx * 0.9,
          A = r.dz * 0.9,
          T = r.nx * 0.32,
          E = r.nz * 0.32,
          R = p[(v * 3) % p.length],
          P = [
            [S - z - T, w - A - E],
            [S + z - T, w + A - E],
            [S + z + T, w + A + E],
            [S - z + T, w - A + E],
          ];
        for (let C = 0; C < 4; C++) {
          let [I, L] = P[C],
            [F, O] = P[(C + 1) % 4],
            B = (I + F) / 2 - S,
            H = (L + O) / 2 - w;
          oe(
            i,
            [
              [I, _, L],
              [F, _, O],
              [F, _ + 0.62, O],
              [I, _ + 0.62, L],
            ],
            R,
            [B, 0, H],
          );
        }
        (oe(
          i,
          P.map(([C, I]) => [C, _ + 0.56, I]),
          d,
          [0, 1, 0],
        ),
          e.inst.push({
            kind: v % 3 ? "shrub" : "flowers",
            x: S,
            y: _ + 0.5,
            z: w,
            rot: x,
            scale: 0.55,
          }),
          e.colliders.push({
            t: "circ",
            x: S,
            z: w,
            r: 0.75,
            y0: _ - 1,
            y1: _ + 1.5,
          }));
      }
    }
  }
  (vn(o.group, i, t.lm, "Castro"),
    vn(o.group, a, t.ds, "CastroFlags", { shadow: !0 }));
}
