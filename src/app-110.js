// app 110 — math
// Lines 81461-82078 of readable/app.pretty.js (statement-aligned).
function QW(i) {
  if (BS && BS.D === i.D) return BS;
  let { D: t, L: e } = i,
    s = { D: t, list: [] },
    n = (r, l) => e.driveHeight(r, l),
    o = (r, l, c) => Math.min(c, Math.max(l, r)),
    a = (r, l, c, h) => {
      let f = 2.5;
      for (let u = -c; u <= 12; u += 2)
        for (let d = -h; d <= h; d += 3) {
          let [p, m] = r.fwd(l[0] + d, l[1] - u);
          e.coverAt(p, m) & 8 || (f = Math.max(f, e.terrainAt(p, m)));
        }
      return f + 0.35;
    };
  {
    let r = [Ki.x0 + 7.8, Ki.zc],
      l = i.frame({ at: [-9, 10], grid: r, bearing: -36.3 }),
      [c, h] = l.fwd(Ki.x0 - 6, Ki.zc),
      f = o(n(c, h) - (3 + u7), -1, 1.5),
      u = i.frame({ at: [-9, 10], grid: r, bearing: -36.3, dy: f }),
      d = -1 / 0;
    for (let m of i.streetNear("The Embarcadero", c, h, 70)) {
      let [g] = u.inv(m.x, m.z);
      g + m.w < Ki.x0 - 4 && (d = Math.max(d, g + m.w));
    }
    isFinite(d) || (d = Ki.x0 - 20);
    let p = (m, g, b, x) =>
      [
        [m, g],
        [b, g],
        [b, x],
        [m, x],
      ].map(([v, y]) => u.fwd(v, y));
    s.list.push({
      name: "ferry",
      F: u,
      cull: 0,
      claims: [
        {
          poly: p(Ki.x0 - 2, Ki.z0 - 9, Ki.x1 + 70, Ki.z1 + 9),
          ids: [
            558731934, 24460886, 404449724, 406710833, 406710834, 406710835,
            406710836, 406710837,
          ],
        },
        { poly: p(d + 0.2, Ki.z0 - 2, Ki.x0, Ki.z1 + 2), buildings: !1 },
      ],
      run: (m) => {
        (iS(m),
          _R(m, { x0: d + 0.4, real: !0 }),
          m.colliders.push({
            t: "box",
            x0: Ki.x0 - 1.5,
            z0: Ki.z0,
            x1: Ki.x1 + 26,
            z1: Ki.z1,
          }));
      },
    });
  }
  for (let r of d7) {
    let l = [
        Math.sin((r.out * Math.PI) / 180),
        -Math.cos((r.out * Math.PI) / 180),
      ],
      c = ZW(t, r.head, l, r.w / 2 + 1, 60, 1.5 + 2.5),
      h =
        c > 0
          ? {
              ...r,
              head: [r.head[0] + l[0] * c, r.head[1] + l[1] * c],
              len: r.len - c,
            }
          : r,
      f = i.frame({ at: h.head, grid: [Ve.x, 0], bearing: h.out - 90 }),
      u = o(n(h.head[0] - l[0] * 4, h.head[1] - l[1] * 4) - (3 + u7), -1, 1.2),
      d = i.frame({ at: h.head, grid: [Ve.x, 0], bearing: h.out - 90, dy: u }),
      p = h.w / 2,
      m = [
        [Ve.x - 1, -p - 2],
        [Ve.x + h.len + 2, -p - 2],
        [Ve.x + h.len + 2, p + 2],
        [Ve.x - 1, p + 2],
      ].map(([g, b]) => d.fwd(g, b));
    s.list.push({
      name: "pier" + h.n,
      F: d,
      cull: 2600,
      claims: [{ poly: m, ids: h.ids, frac: 0.4 }],
      run: (g) => {
        if (
          (rS(g.B.R("rpier" + h.n), g.A, X1("e", 0), {
            n: h.n,
            w: h.w,
            len: h.len,
            kind: h.kind,
            side: "e",
            c: 0,
          }),
          c > 0 && Wft(g.B.R("rpier" + h.n).solid, c + 1, p),
          h.kind === "open")
        ) {
          let b = At([0.5, 0.49, 0.46], Tt.conc);
          for (let x = -p + 0.8; x <= p - 0.7; x += 1.6)
            Ms(
              g.B.R("rpier" + h.n).solid,
              Ve.x + 0.3,
              2.6,
              x - 0.18,
              Ve.x + 0.66,
              3.9,
              x + 0.18,
              b,
            );
          g.colliders.push({ t: "box", x0: Ve.x, z0: -p, x1: Ve.x + 1, z1: p });
        } else
          g.colliders.push({
            t: "box",
            x0: Ve.x - 1.5,
            z0: -p,
            x1: Ve.x + h.len,
            z1: p,
          });
      },
    });
  }
  {
    let r = (R) => {
        let T = [
            Math.sin((R.out * Math.PI) / 180),
            -Math.cos((R.out * Math.PI) / 180),
          ],
          E = ZW(t, R.head, T, R.w / 2 + 1, 60, 1.5 + 2.5);
        return {
          p:
            E > 0
              ? {
                  ...R,
                  head: [R.head[0] + T[0] * E, R.head[1] + T[1] * E],
                  len: R.len - E,
                }
              : R,
          o: T,
          n: [-T[1], T[0]],
        };
      },
      l = r(d7.find((R) => R.n === "15")),
      c = r(d7.find((R) => R.n === "17")),
      h = o(
        n(l.p.head[0] - l.o[0] * 4, l.p.head[1] - l.o[1] * 4) - (3 + u7),
        -1,
        1.2,
      ),
      f = i.frame({
        at: l.p.head,
        grid: [Ve.x, 0],
        bearing: l.p.out - 90,
        dy: h,
      }),
      u = (R, T) => {
        let [E, A] = f.inv(R, T);
        return [E - Ve.x, A];
      },
      d = l.p.w / 2,
      p = Math.sign(u(...c.p.head)[1]) || 1,
      m =
        Math.sign(
          c.n[0] * (l.p.head[0] - c.p.head[0]) +
            c.n[1] * (l.p.head[1] - c.p.head[1]),
        ) || 1,
      g = u(
        c.p.head[0] + (c.n[0] * m * c.p.w) / 2 - c.o[0] * 20,
        c.p.head[1] + (c.n[1] * m * c.p.w) / 2 - c.o[1] * 20,
      ),
      b = u(
        c.p.head[0] + (c.n[0] * m * c.p.w) / 2 + c.o[0] * 80,
        c.p.head[1] + (c.n[1] * m * c.p.w) / 2 + c.o[1] * 80,
      ),
      x = (R) => g[1] + ((b[1] - g[1]) * (R - g[0])) / (b[0] - g[0]),
      v = -1,
      y = 15,
      M = 56,
      S = p * d,
      w = x(v),
      z = x(M),
      _ = (R, T) => e.terrainAt(R, T) - h + 0.06;
    if (Math.abs(w - S) > 4 && Math.abs(w - S) < 80) {
      let R = [
        [v - 2, S],
        [M + 1, S],
        [M + 1, z],
        [v - 2, w],
      ].map(([T, E]) => f.fwd(Ve.x + T, E));
      s.list.push({
        name: "exploplaza",
        F: f,
        cull: 1800,
        claims: [{ poly: R, ids: [], frac: 0.9 }],
        run: (T) => {
          let E = T.B.R("explo").solid,
            A = (W, V) => [Ve.x + W, V],
            C = 3.35,
            P = (W, V, Y) => {
              let $ = A(W, V);
              return [$[0], Y, $[1]];
            },
            I = At([0.3, 0.295, 0.28], Tt.conc),
            L = At([0.24, 0.235, 0.22], Tt.conc),
            F = At([0.22, 0.2, 0.17], Tt.pile),
            N = At([0.05, 0.06, 0.06], Tt.metal),
            B = At([0.05, 0.05, 0.06], Tt.paint),
            H = At([0.9, 0.9, 0.88], Tt.paint);
          Fi(
            E,
            [P(y - 4, S, C), P(M, S, C), P(M, z, C), P(y - 4, x(y - 4), C)],
            I,
          );
          for (let W = v; W < y - 1e-6; W += 2)
            for (let V = 0; V < 1 - 1e-6; V += 1 / 12) {
              let Y = [
                [W, V],
                [Math.min(y, W + 2), V],
                [Math.min(y, W + 2), V + 0.08333333333333333],
                [W, V + 0.08333333333333333],
              ].map(([$, st]) => {
                let Q = S + (x($) - S) * st,
                  j = A($, Q),
                  X = f.fwd(j[0], j[1]);
                return [j[0], _(X[0], X[1]) + 0.08, j[1]];
              });
              Fi(E, Y, I);
            }
          let O = 150,
            D = 14 * p;
          (Fi(
            E,
            [P(M, S, C), P(O, S, C), P(O, S + p * 0.5, C), P(M, S + D, C)],
            I,
          ),
            xs(
              E,
              P(M, S + D, 1.6),
              P(M, z, 1.6),
              P(M, z, C),
              P(M, S + D, C),
              L,
              P(M + 20, (z + S) / 2, 2),
            ),
            xs(
              E,
              P(M, S + D, 1.6),
              P(O, S + p * 0.5, 1.6),
              P(O, S + p * 0.5, C),
              P(M, S + D, C),
              L,
              P((M + O) / 2, S + p * 40, 2),
            ),
            Nr(E, A(M - 0.2, S + D), A(M - 0.2, z - p * 0.3), C, N, {
              step: 2,
            }),
            Nr(E, A(M, S + D - p * 0.3), A(O, S + p * 0.2), C, N, { step: 2 }),
            Nr(E, A(y, x(y) - p * 0.3), A(M - 0.2, z - p * 0.3), C, N, {
              step: 2,
            }));
          for (let W = y + 3; W < M; W += 6)
            for (let V = 0.1; V < 1; V += 0.2) {
              let Y = S + (x(W) - S) * V,
                $ = A(W, Y);
              es(E, $[0], $[1], 0.32, -6, 1.6, 6, F);
            }
          for (let W = M + 4; W < O - 4; W += 6) {
            let V = (D * (O - W)) / (O - M),
              Y = A(W, S + V - p * 0.6);
            es(E, Y[0], Y[1], 0.32, -6, 1.6, 6, F);
          }
          for (let [W, V] of [
            [M - 1.2, S + (z - S) * 0.25],
            [M - 1.2, S + (z - S) * 0.75],
            [M + 30, S + D * 0.75 - p * 1],
            [M + 75, S + D * 0.45 - p * 1],
            [y + 8, x(y + 8) - p * 1.2],
          ]) {
            let Y = A(W, V);
            (es(E, Y[0], Y[1], 0.1, C, C + 4.6, 6, N, 0.07),
              es(E, Y[0], Y[1], 0.18, C, C + 0.5, 6, N, 0.12),
              es(
                E,
                Y[0],
                Y[1],
                0.24,
                C + 4.6,
                C + 5.2,
                6,
                At([1, 0.88, 0.66], Tt.lamp),
                0.2,
              ));
          }
          for (let W of [0.2, 0.5, 0.8])
            Ac(
              E,
              {
                box: (V, Y, $, st, Q, j, X, K) =>
                  Ms(
                    V,
                    Ve.x + Math.min(Y, st),
                    j,
                    Math.min($, Q),
                    Ve.x + Math.max(Y, st),
                    X,
                    Math.max($, Q),
                    K,
                  ),
              },
              M - 5,
              S + (z - S) * W,
              1,
            );
          {
            let V = S + p * 5;
            Ms(
              E,
              Ve.x + 4.5,
              C - 0.4,
              Math.min(V, V + p * 1.6),
              Ve.x + 4.5 + 0.6,
              C + 6.8,
              Math.max(V, V + p * 1.6),
              B,
            );
            let Y = 0.55,
              $ = V + p * 0.8,
              st = A(4.5 - 0.02, $);
            for (let Q = 0; Q < 16; Q++) {
              let j = (Q / 16) * Math.PI * 2,
                X = ((Q + 1) / 16) * Math.PI * 2;
              xs(
                E,
                [st[0], C + 5.2 + Math.sin(j) * Y, st[1] + Math.cos(j) * Y],
                [st[0], C + 5.2 + Math.sin(X) * Y, st[1] + Math.cos(X) * Y],
                [
                  st[0],
                  C + 5.2 + Math.sin(X) * (Y - 0.14),
                  st[1] + Math.cos(X) * (Y - 0.14),
                ],
                [
                  st[0],
                  C + 5.2 + Math.sin(j) * (Y - 0.14),
                  st[1] + Math.cos(j) * (Y - 0.14),
                ],
                H,
                [st[0] - 10, C + 5.2, st[1]],
              );
            }
            T.colliders.push({
              t: "box",
              x0: Ve.x + 4.5,
              z0: Math.min(V, V + p * 1.6),
              x1: Ve.x + 4.5 + 0.6,
              z1: Math.max(V, V + p * 1.6),
            });
          }
          let U = At([0.5, 0.49, 0.46], Tt.conc),
            G = Math.min(S, w),
            q = Math.max(S, w);
          for (let W = G + 0.8; W <= q - 0.7; W += 1.6) {
            let V = A(1.5, W),
              Y = f.fwd(V[0], V[1]),
              $ = _(Y[0], Y[1]);
            Ms(
              E,
              Ve.x + 1.32,
              $ - 0.3,
              W - 0.18,
              Ve.x + 1.68,
              $ + 0.95,
              W + 0.18,
              U,
            );
          }
          T.colliders.push({
            t: "box",
            x0: Ve.x + 1,
            z0: G,
            x1: Ve.x + 2.2,
            z1: q,
          });
        },
      });
    }
  }
  {
    let r = tW(i.D, i.L);
    r &&
      s.list.push({
        name: "pier39",
        F: i.frame({ at: [0, 0] }),
        cull: 0,
        claims: [{ poly: r.poly, ids: mS, frac: 0.4 }],
        run: (l) => {
          for (let c of r.colliders) l.colliders.push(c);
        },
      });
  }
  {
    let r = fW(i.D, i.L);
    r &&
      s.list.push({
        name: "fortmason",
        F: i.frame({ at: [0, 0] }),
        cull: 0,
        claims: [
          { poly: r.poly, ids: r.ids, frac: 0.4 },
          { poly: iu, buildings: !1, props: ["ptree", "tree"] },
        ],
        run: (l) => uW(r, l),
      });
  }
  {
    let r = [-1962, -1409.5],
      l = i.frame({ at: r, grid: [ae[6], fe[0]], bearing: -7.1 }),
      c = n(...l.fwd(ae[6] + 20, fe[0] - 7)),
      h = [
        [Qe[0], "hw", 5.4],
        [Qe[0], "sw", 3.1],
        [Ve, "z", fe[0] - 10.1],
      ],
      f = [
        [-66, -14],
        [60, -14],
        [60, -5.4],
        [-66, -5.4],
      ].map(([u, d]) => l.fwd(ae[6] + u, fe[0] + d));
    (s.list.push({
      name: "wharf",
      F: l,
      set: h,
      cull: 1800,
      claims: [{ poly: f, buildings: !1 }],
      run: (u) => pR(u, { real: !0, y: c, wheel: [ae[6] + 9, fe[0] - 7.4] }),
    }),
      s.list.push({
        name: "boats",
        F: i.frame({ at: [0, 0] }),
        cull: 1500,
        run: (u) => {
          let d = lS(77),
            p = u.B.R("wharf").solid,
            m = 0;
          for (let g = 0; g < 400 && m < 12; g++) {
            let b = -2125 + d() * 125,
              x = -1498 + d() * 80,
              v = Math.PI + (d() - 0.5) * 0.3,
              y = Math.cos(v),
              M = Math.sin(v),
              S = !0;
            for (let w of [-9, -4, 0, 4, 9])
              for (let z of [-2.6, 2.6])
                e.coverAt(b + y * w - M * z, x + M * w + y * z) & 8 || (S = !1);
            !S ||
              (s.boats || []).some(([w, z]) => Math.hypot(w - b, z - x) < 9) ||
              ((s.boats ||= []).push([b, x]), mR(p, b, x, v, d), m++);
          }
        },
      }));
  }
  {
    let r = [-2420, -1485],
      l = -48.7,
      c = [ae[3], Ve.z],
      h = i.frame({ at: r, grid: c, bearing: l }),
      f = o(a(h, c, 0, 11) - 3, -1, 2),
      u = i.frame({ at: r, grid: c, bearing: l, dy: f }),
      d = [
        [-13, 1],
        [13, 1],
        [13, -220],
        [-13, -220],
      ].map(([p, m]) => u.fwd(c[0] + p, c[1] + m));
    s.list.push({
      name: "hyde",
      F: u,
      cull: 3e3,
      claims: [{ poly: d, frac: 0.5 }],
      run: (p) => {
        (gR(p, { len: 217, balclutha: 100, eureka: 168 }),
          qft(p.B.R("hyde").solid, c, 16, 11, 3),
          p.colliders.push({
            t: "box",
            x0: c[0] - 11,
            z0: Ve.z - 217,
            x1: c[0] + 11,
            z1: Ve.z + 0.5,
          }));
      },
    });
  }
  {
    let r = Math.max(3.2, n(-2918, -1398) + 0.1);
    s.list.push({
      name: "aquatic",
      F: i.frame({ at: [0, 0] }),
      cull: 3e3,
      run: (l) => {
        (bR(l, {
          cx: -2621.3,
          cz: -1404,
          r: 293.7,
          th0: Math.PI,
          th1: Math.PI * 1.355,
          y: r,
          real: !0,
        }),
          Hft(l, n));
      },
    });
  }
  {
    let r = i.frame({
        at: [-2594, -1153],
        grid: [(ae[1] + ae[2]) / 2, (fe[0] + fe[1]) / 2],
        bearing: 170.5,
      }),
      l = PS(t, r, jg[0], jg[1], {
        W: "Larkin Street",
        E: "Polk Street",
        N: "North Point Street",
        S: "Beach Street",
      });
    s.list.push({
      name: "ghirardelli",
      F: r,
      set: l,
      cull: 2500,
      claims: [{ poly: CS(r, l, jg[0], jg[1], { pad: 0.5 }), frac: 0.5 }],
      run: (c) => hS(c, { mirror: !0, lift: 0.5 }),
    });
  }
  s.list.push({
    name: "alcatraz",
    F: i.frame({ at: Gi(-122.4229, 37.8267), grid: [K1.x, K1.z] }),
    cull: 0,
    run: (r) => fS(r),
  });
  {
    let r = i.frame({ at: [0, 0], grid: [0, 0], bearing: -36.3 }),
      [l, c] = xR,
      h = [
        [ae, l, -188],
        [ae, l + 1, -103],
        [fe, c, -110],
        [fe, c + 1, 90],
      ];
    for (let u of [l, l + 1]) h.push([ls[u], "hw", 0], [ls[u], "sw", 0]);
    for (let u of [c, c + 1]) h.push([Qe[u], "hw", 0], [Qe[u], "sw", 0]);
    let f = [
      [-190, -112],
      [-101, -112],
      [-101, 92],
      [-190, 92],
    ].map(([u, d]) => r.fwd(u, d));
    s.list.push({
      name: "justin",
      F: r,
      set: h,
      cull: 1800,
      claims: [{ poly: f, buildings: !1 }],
      run: (u) =>
        vR(u, {
          real: !0,
          onRoad: (d, p) => {
            let [m, g] = u.ctx.F.fwd(d, p);
            return u.ctx.rc?.L?.surfaceAt(m, g) === "road";
          },
        }),
    });
  }
  {
    let r = [340, 485],
      l = i.frame({ at: r, grid: [0, 15], bearing: -35.2 }),
      c = n(...r) + 0.03,
      h = [
        [-12, -6],
        [12, -6],
        [12, 36],
        [-12, 36],
      ].map(([f, u]) => l.fwd(f, u));
    s.list.push({
      name: "cupid",
      F: l,
      cull: 2500,
      claims: [{ poly: h, buildings: !1 }],
      run: (f) => yR(f, { at: [0, 0], y: c }),
    });
  }
  return (
    s.list.push({
      name: "rails",
      F: i.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => jft(r, i),
    }),
    s.list.push({
      name: "promenade",
      F: i.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => Kft(r, i, s),
    }),
    s.list.push({
      name: "waterrail",
      F: i.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => Uft(r, i),
    }),
    (BS = s),
    s
  );
}
