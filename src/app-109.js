// app 109 — math
// Lines 81695-82312 of readable/app.pretty.js (statement-aligned).
function ej(o) {
  if (Nk && Nk.D === o.D) return Nk;
  let { D: t, L: e } = o,
    s = { D: t, list: [] },
    n = (r, l) => e.driveHeight(r, l),
    i = (r, l, c) => Math.min(c, Math.max(l, r)),
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
    let r = [io.x0 + 7.8, io.zc],
      l = o.frame({ at: [-9, 10], grid: r, bearing: -36.3 }),
      [c, h] = l.fwd(io.x0 - 6, io.zc),
      f = i(n(c, h) - (3 + GP), -1, 1.5),
      u = o.frame({ at: [-9, 10], grid: r, bearing: -36.3, dy: f }),
      d = -1 / 0;
    for (let m of o.streetNear("The Embarcadero", c, h, 70)) {
      let [g] = u.inv(m.x, m.z);
      g + m.w < io.x0 - 4 && (d = Math.max(d, g + m.w));
    }
    isFinite(d) || (d = io.x0 - 20);
    let p = (m, g, b, v) =>
      [
        [m, g],
        [b, g],
        [b, v],
        [m, v],
      ].map(([x, y]) => u.fwd(x, y));
    s.list.push({
      name: "ferry",
      F: u,
      cull: 0,
      claims: [
        {
          poly: p(io.x0 - 2, io.z0 - 9, io.x1 + 70, io.z1 + 9),
          ids: [
            558731934, 24460886, 404449724, 406710833, 406710834, 406710835,
            406710836, 406710837,
          ],
        },
        { poly: p(d + 0.2, io.z0 - 2, io.x0, io.z1 + 2), buildings: !1 },
      ],
      run: (m) => {
        (ak(m),
          eP(m, { x0: d + 0.4, real: !0 }),
          m.colliders.push({
            t: "box",
            x0: io.x0 - 1.5,
            z0: io.z0,
            x1: io.x1 + 26,
            z1: io.z1,
          }));
      },
    });
  }
  for (let r of VP) {
    let l = [
        Math.sin((r.out * Math.PI) / 180),
        -Math.cos((r.out * Math.PI) / 180),
      ],
      c = tj(t, r.head, l, r.w / 2 + 1, 60, 1.5 + 2.5),
      h =
        c > 0
          ? {
              ...r,
              head: [r.head[0] + l[0] * c, r.head[1] + l[1] * c],
              len: r.len - c,
            }
          : r,
      f = o.frame({ at: h.head, grid: [Ye.x, 0], bearing: h.out - 90 }),
      u = i(n(h.head[0] - l[0] * 4, h.head[1] - l[1] * 4) - (3 + GP), -1, 1.2),
      d = o.frame({ at: h.head, grid: [Ye.x, 0], bearing: h.out - 90, dy: u }),
      p = h.w / 2,
      m = [
        [Ye.x - 1, -p - 2],
        [Ye.x + h.len + 2, -p - 2],
        [Ye.x + h.len + 2, p + 2],
        [Ye.x - 1, p + 2],
      ].map(([g, b]) => d.fwd(g, b));
    s.list.push({
      name: "pier" + h.n,
      F: d,
      cull: 2600,
      claims: [{ poly: m, ids: h.ids, frac: 0.4 }],
      run: (g) => {
        if (
          (ck(g.B.R("rpier" + h.n), g.A, Cm("e", 0), {
            n: h.n,
            w: h.w,
            len: h.len,
            kind: h.kind,
            side: "e",
            c: 0,
          }),
          c > 0 && f1t(g.B.R("rpier" + h.n).solid, c + 1, p),
          h.kind === "open")
        ) {
          let b = Rt([0.5, 0.49, 0.46], Tt.conc);
          for (let v = -p + 0.8; v <= p - 0.7; v += 1.6)
            zs(
              g.B.R("rpier" + h.n).solid,
              Ye.x + 0.3,
              2.6,
              v - 0.18,
              Ye.x + 0.66,
              3.9,
              v + 0.18,
              b,
            );
          g.colliders.push({ t: "box", x0: Ye.x, z0: -p, x1: Ye.x + 1, z1: p });
        } else
          g.colliders.push({
            t: "box",
            x0: Ye.x - 1.5,
            z0: -p,
            x1: Ye.x + h.len,
            z1: p,
          });
      },
    });
  }
  {
    let r = (A) => {
        let T = [
            Math.sin((A.out * Math.PI) / 180),
            -Math.cos((A.out * Math.PI) / 180),
          ],
          E = tj(t, A.head, T, A.w / 2 + 1, 60, 1.5 + 2.5);
        return {
          p:
            E > 0
              ? {
                  ...A,
                  head: [A.head[0] + T[0] * E, A.head[1] + T[1] * E],
                  len: A.len - E,
                }
              : A,
          o: T,
          n: [-T[1], T[0]],
        };
      },
      l = r(VP.find((A) => A.n === "15")),
      c = r(VP.find((A) => A.n === "17")),
      h = i(
        n(l.p.head[0] - l.o[0] * 4, l.p.head[1] - l.o[1] * 4) - (3 + GP),
        -1,
        1.2,
      ),
      f = o.frame({
        at: l.p.head,
        grid: [Ye.x, 0],
        bearing: l.p.out - 90,
        dy: h,
      }),
      u = (A, T) => {
        let [E, R] = f.inv(A, T);
        return [E - Ye.x, R];
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
      v = (A) => g[1] + ((b[1] - g[1]) * (A - g[0])) / (b[0] - g[0]),
      x = -1,
      y = 15,
      M = 56,
      S = p * d,
      w = v(x),
      _ = v(M),
      z = (A, T) => e.terrainAt(A, T) - h + 0.06;
    if (Math.abs(w - S) > 4 && Math.abs(w - S) < 80) {
      let A = [
        [x - 2, S],
        [M + 1, S],
        [M + 1, _],
        [x - 2, w],
      ].map(([T, E]) => f.fwd(Ye.x + T, E));
      s.list.push({
        name: "exploplaza",
        F: f,
        cull: 1800,
        claims: [{ poly: A, ids: [], frac: 0.9 }],
        run: (T) => {
          let E = T.B.R("explo").solid,
            R = (V, $) => [Ye.x + V, $],
            P = 3.35,
            C = (V, $, J) => {
              let X = R(V, $);
              return [X[0], J, X[1]];
            },
            I = Rt([0.3, 0.295, 0.28], Tt.conc),
            L = Rt([0.24, 0.235, 0.22], Tt.conc),
            F = Rt([0.22, 0.2, 0.17], Tt.pile),
            O = Rt([0.05, 0.06, 0.06], Tt.metal),
            B = Rt([0.05, 0.05, 0.06], Tt.paint),
            H = Rt([0.9, 0.9, 0.88], Tt.paint);
          $i(
            E,
            [C(y - 4, S, P), C(M, S, P), C(M, _, P), C(y - 4, v(y - 4), P)],
            I,
          );
          for (let V = x; V < y - 1e-6; V += 2)
            for (let $ = 0; $ < 1 - 1e-6; $ += 1 / 12) {
              let J = [
                [V, $],
                [Math.min(y, V + 2), $],
                [Math.min(y, V + 2), $ + 0.08333333333333333],
                [V, $ + 0.08333333333333333],
              ].map(([X, tt]) => {
                let Z = S + (v(X) - S) * tt,
                  q = R(X, Z),
                  j = f.fwd(q[0], q[1]);
                return [q[0], z(j[0], j[1]) + 0.08, q[1]];
              });
              $i(E, J, I);
            }
          let N = 150,
            D = 14 * p;
          ($i(
            E,
            [C(M, S, P), C(N, S, P), C(N, S + p * 0.5, P), C(M, S + D, P)],
            I,
          ),
            Ms(
              E,
              C(M, S + D, 1.6),
              C(M, _, 1.6),
              C(M, _, P),
              C(M, S + D, P),
              L,
              C(M + 20, (_ + S) / 2, 2),
            ),
            Ms(
              E,
              C(M, S + D, 1.6),
              C(N, S + p * 0.5, 1.6),
              C(N, S + p * 0.5, P),
              C(M, S + D, P),
              L,
              C((M + N) / 2, S + p * 40, 2),
            ),
            s0(E, R(M - 0.2, S + D), R(M - 0.2, _ - p * 0.3), P, O, {
              step: 2,
            }),
            s0(E, R(M, S + D - p * 0.3), R(N, S + p * 0.2), P, O, { step: 2 }),
            s0(E, R(y, v(y) - p * 0.3), R(M - 0.2, _ - p * 0.3), P, O, {
              step: 2,
            }));
          for (let V = y + 3; V < M; V += 6)
            for (let $ = 0.1; $ < 1; $ += 0.2) {
              let J = S + (v(V) - S) * $,
                X = R(V, J);
              os(E, X[0], X[1], 0.32, -6, 1.6, 6, F);
            }
          for (let V = M + 4; V < N - 4; V += 6) {
            let $ = (D * (N - V)) / (N - M),
              J = R(V, S + $ - p * 0.6);
            os(E, J[0], J[1], 0.32, -6, 1.6, 6, F);
          }
          for (let [V, $] of [
            [M - 1.2, S + (_ - S) * 0.25],
            [M - 1.2, S + (_ - S) * 0.75],
            [M + 30, S + D * 0.75 - p * 1],
            [M + 75, S + D * 0.45 - p * 1],
            [y + 8, v(y + 8) - p * 1.2],
          ]) {
            let J = R(V, $);
            (os(E, J[0], J[1], 0.1, P, P + 4.6, 6, O, 0.07),
              os(E, J[0], J[1], 0.18, P, P + 0.5, 6, O, 0.12),
              os(
                E,
                J[0],
                J[1],
                0.24,
                P + 4.6,
                P + 5.2,
                6,
                Rt([1, 0.88, 0.66], Tt.lamp),
                0.2,
              ));
          }
          for (let V of [0.2, 0.5, 0.8])
            ih(
              E,
              {
                box: ($, J, X, tt, Z, q, j, K) =>
                  zs(
                    $,
                    Ye.x + Math.min(J, tt),
                    q,
                    Math.min(X, Z),
                    Ye.x + Math.max(J, tt),
                    j,
                    Math.max(X, Z),
                    K,
                  ),
              },
              M - 5,
              S + (_ - S) * V,
              1,
            );
          {
            let $ = S + p * 5;
            zs(
              E,
              Ye.x + 4.5,
              P - 0.4,
              Math.min($, $ + p * 1.6),
              Ye.x + 4.5 + 0.6,
              P + 6.8,
              Math.max($, $ + p * 1.6),
              B,
            );
            let J = 0.55,
              X = $ + p * 0.8,
              tt = R(4.5 - 0.02, X);
            for (let Z = 0; Z < 16; Z++) {
              let q = (Z / 16) * Math.PI * 2,
                j = ((Z + 1) / 16) * Math.PI * 2;
              Ms(
                E,
                [tt[0], P + 5.2 + Math.sin(q) * J, tt[1] + Math.cos(q) * J],
                [tt[0], P + 5.2 + Math.sin(j) * J, tt[1] + Math.cos(j) * J],
                [
                  tt[0],
                  P + 5.2 + Math.sin(j) * (J - 0.14),
                  tt[1] + Math.cos(j) * (J - 0.14),
                ],
                [
                  tt[0],
                  P + 5.2 + Math.sin(q) * (J - 0.14),
                  tt[1] + Math.cos(q) * (J - 0.14),
                ],
                H,
                [tt[0] - 10, P + 5.2, tt[1]],
              );
            }
            T.colliders.push({
              t: "box",
              x0: Ye.x + 4.5,
              z0: Math.min($, $ + p * 1.6),
              x1: Ye.x + 4.5 + 0.6,
              z1: Math.max($, $ + p * 1.6),
            });
          }
          let U = Rt([0.5, 0.49, 0.46], Tt.conc),
            G = Math.min(S, w),
            W = Math.max(S, w);
          for (let V = G + 0.8; V <= W - 0.7; V += 1.6) {
            let $ = R(1.5, V),
              J = f.fwd($[0], $[1]),
              X = z(J[0], J[1]);
            zs(
              E,
              Ye.x + 1.32,
              X - 0.3,
              V - 0.18,
              Ye.x + 1.68,
              X + 0.95,
              V + 0.18,
              U,
            );
          }
          T.colliders.push({
            t: "box",
            x0: Ye.x + 1,
            z0: G,
            x1: Ye.x + 2.2,
            z1: W,
          });
        },
      });
    }
  }
  {
    let r = sq(o.D, o.L);
    r &&
      s.list.push({
        name: "pier39",
        F: o.frame({ at: [0, 0] }),
        cull: 0,
        claims: [{ poly: r.poly, ids: bk, frac: 0.4 }],
        run: (l) => {
          for (let c of r.colliders) l.colliders.push(c);
        },
      });
  }
  {
    let r = dq(o.D, o.L);
    r &&
      s.list.push({
        name: "fortmason",
        F: o.frame({ at: [0, 0] }),
        cull: 0,
        claims: [
          { poly: r.poly, ids: r.ids, frac: 0.4 },
          { poly: Hu, buildings: !1, props: ["ptree", "tree"] },
        ],
        run: (l) => pq(r, l),
      });
  }
  {
    let r = [-1962, -1409.5],
      l = o.frame({ at: r, grid: [he[6], pe[0]], bearing: -7.1 }),
      c = n(...l.fwd(he[6] + 20, pe[0] - 7)),
      h = [
        [ns[0], "hw", 5.4],
        [ns[0], "sw", 3.1],
        [Ye, "z", pe[0] - 10.1],
      ],
      f = [
        [-66, -14],
        [60, -14],
        [60, -5.4],
        [-66, -5.4],
      ].map(([u, d]) => l.fwd(he[6] + u, pe[0] + d));
    (s.list.push({
      name: "wharf",
      F: l,
      set: h,
      cull: 1800,
      claims: [{ poly: f, buildings: !1 }],
      run: (u) => W7(u, { real: !0, y: c, wheel: [he[6] + 9, pe[0] - 7.4] }),
    }),
      s.list.push({
        name: "boats",
        F: o.frame({ at: [0, 0] }),
        cull: 1500,
        run: (u) => {
          let d = hk(77),
            p = u.B.R("wharf").solid,
            m = 0;
          for (let g = 0; g < 400 && m < 12; g++) {
            let b = -2125 + d() * 125,
              v = -1498 + d() * 80,
              x = Math.PI + (d() - 0.5) * 0.3,
              y = Math.cos(x),
              M = Math.sin(x),
              S = !0;
            for (let w of [-9, -4, 0, 4, 9])
              for (let _ of [-2.6, 2.6])
                e.coverAt(b + y * w - M * _, v + M * w + y * _) & 8 || (S = !1);
            !S ||
              (s.boats || []).some(([w, _]) => Math.hypot(w - b, _ - v) < 9) ||
              ((s.boats ||= []).push([b, v]), q7(p, b, v, x, d), m++);
          }
        },
      }));
  }
  {
    let r = [-2420, -1485],
      l = -48.7,
      c = [he[3], Ye.z],
      h = o.frame({ at: r, grid: c, bearing: l }),
      f = i(a(h, c, 0, 11) - 3, -1, 2),
      u = o.frame({ at: r, grid: c, bearing: l, dy: f }),
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
        (j7(p, { len: 217, balclutha: 100, eureka: 168 }),
          u1t(p.B.R("hyde").solid, c, 16, 11, 3),
          p.colliders.push({
            t: "box",
            x0: c[0] - 11,
            z0: Ye.z - 217,
            x1: c[0] + 11,
            z1: Ye.z + 0.5,
          }));
      },
    });
  }
  {
    let r = Math.max(3.2, n(-2918, -1398) + 0.1);
    s.list.push({
      name: "aquatic",
      F: o.frame({ at: [0, 0] }),
      cull: 3e3,
      run: (l) => {
        ($7(l, {
          cx: -2621.3,
          cz: -1404,
          r: 293.7,
          th0: Math.PI,
          th1: Math.PI * 1.355,
          y: r,
          real: !0,
        }),
          r1t(l, n));
      },
    });
  }
  {
    let r = o.frame({
        at: [-2594, -1153],
        grid: [(he[1] + he[2]) / 2, (pe[0] + pe[1]) / 2],
        bearing: 170.5,
      }),
      l = Ck(t, r, Ib[0], Ib[1], {
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
      claims: [{ poly: Lk(r, l, Ib[0], Ib[1], { pad: 0.5 }), frac: 0.5 }],
      run: (c) => uk(c, { mirror: !0, lift: 0.5 }),
    });
  }
  s.list.push({
    name: "alcatraz",
    F: o.frame({ at: ji(-122.4229, 37.8267), grid: [Lm.x, Lm.z] }),
    cull: 0,
    run: (r) => dk(r),
  });
  {
    let r = o.frame({ at: [0, 0], grid: [0, 0], bearing: -36.3 }),
      [l, c] = X7,
      h = [
        [he, l, -188],
        [he, l + 1, -103],
        [pe, c, -110],
        [pe, c + 1, 90],
      ];
    for (let u of [l, l + 1]) h.push([ps[u], "hw", 0], [ps[u], "sw", 0]);
    for (let u of [c, c + 1]) h.push([ns[u], "hw", 0], [ns[u], "sw", 0]);
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
        K7(u, {
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
      l = o.frame({ at: r, grid: [0, 15], bearing: -35.2 }),
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
      run: (f) => Y7(f, { at: [0, 0], y: c }),
    });
  }
  return (
    s.list.push({
      name: "rails",
      F: o.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => d1t(r, o),
    }),
    s.list.push({
      name: "promenade",
      F: o.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => b1t(r, o, s),
    }),
    s.list.push({
      name: "waterrail",
      F: o.frame({ at: [0, 0] }),
      cull: 0,
      run: (r) => c1t(r, o),
    }),
    (Nk = s),
    s
  );
}
