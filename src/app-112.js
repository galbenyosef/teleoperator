// app 112 — math
// Lines 82747-82978 of readable/app.pretty.js (statement-aligned).
function m1t({ B: o, colliders: t, inst: e }, s, n) {
  let { L: i } = s,
    a = Rt([0.42, 0.44, 0.42], Tt.metal),
    r = Rt([0.08, 0.08, 0.08], Tt.metal),
    l = Rt([0.55, 0.54, 0.5], Tt.conc),
    c = Rt([0.85, 0.7, 0.1], Tt.paint),
    h = Rt([0.5, 0.62, 0.62], Tt.glass),
    f = (u, d) => {
      let p = i.probe(u, d);
      return p.road && !p.road.J && p.road.E && !p.road.E.median;
    };
  for (let u of n) {
    let d = 30,
      p = null;
    for (let m = 0; m + 1 < u.length; m++) {
      let [g, b] = u[m],
        [v, x] = u[m + 1],
        y = Math.hypot(v - g, x - b);
      if (y < 0.001) continue;
      let M = (v - g) / y,
        S = (x - b) / y,
        w = -S,
        _ = M;
      for (let z = (46 - (d % 46)) % 46; z < y; z += 46) {
        let A = g + M * z,
          T = b + S * z,
          E = A + w * 2.1,
          R = T + _ * 2.1;
        if (f(E, R) || fw(s.D, A, T, 3)) {
          p = null;
          continue;
        }
        let P = i.driveHeight(A, T),
          C = o.get(
            "railsR" +
              Math.floor((E + 3e3) / 400) +
              "_" +
              Math.floor((R + 3e3) / 400),
            "solid",
          );
        (e.push({ kind: "tlpole", x: E, y: P, z: R, rot: Math.atan2(-w, -_) }),
          t.push({ t: "circ", x: E, z: R, r: 0.22, y0: P - 1.5, y1: P + 7 }));
        let I = [A, P + 5.9, T];
        (p &&
          Math.hypot(I[0] - p[0], I[2] - p[2]) < 60 &&
          rs(C, p, I, 0.02, 0.02, r),
          (p = I));
      }
      d += y;
    }
  }
  for (let [u, d] of p1t) {
    let p = s.D.juns.find(
      (g) =>
        g.legs.some(([b]) => b.name === u) &&
        g.legs.some(([b]) => b.name === d),
    );
    if (!p) continue;
    let m = null;
    for (let g of n)
      for (let b = 0; b + 1 < g.length; b++) {
        let [v, x] = g[b],
          [y, M] = g[b + 1],
          S = (y - v) ** 2 + (M - x) ** 2 || 1,
          w = Math.max(
            0,
            Math.min(1, ((p.x - v) * (y - v) + (p.z - x) * (M - x)) / S),
          ),
          _ = Math.hypot(v + (y - v) * w - p.x, x + (M - x) * w - p.z);
        _ < 28 &&
          (!m || _ < m.d) &&
          (m = {
            d: _,
            x: v + (y - v) * w,
            z: x + (M - x) * w,
            dx: (y - v) / Math.sqrt(S),
            dz: (M - x) / Math.sqrt(S),
          });
      }
    if (m)
      t: for (let g of [1, -1])
        for (let b of [38, 46, 30, 54, 62]) {
          let v = m.x + m.dx * b * g,
            x = m.z + m.dz * b * g,
            y = [];
          for (let D of n) {
            let U = null;
            for (let G = 0; G + 1 < D.length; G++) {
              let [W, V] = D[G],
                [$, J] = D[G + 1],
                X = ($ - W) ** 2 + (J - V) ** 2 || 1,
                tt = Math.max(
                  0,
                  Math.min(1, ((v - W) * ($ - W) + (x - V) * (J - V)) / X),
                ),
                Z = W + ($ - W) * tt,
                q = V + (J - V) * tt,
                j = Math.hypot(Z - v, q - x);
              (!U || j < U.d) &&
                (U = {
                  d: j,
                  x: Z,
                  z: q,
                  dx: ($ - W) / Math.sqrt(X),
                  dz: (J - V) / Math.sqrt(X),
                });
            }
            U && U.d < 14 && y.push(U);
          }
          y.sort((D, U) => D.d - U.d);
          let M = y[0],
            S = (D) => D !== M && Math.abs(D.dx * M.dx + D.dz * M.dz) > 0.9,
            w = y.find((D) => S(D) && Math.hypot(D.x - M.x, D.z - M.z) > 5.5),
            _ = w
              ? null
              : y.find((D) => S(D) && Math.hypot(D.x - M.x, D.z - M.z) > 2.6);
          if (!M || (!w && !_)) continue;
          let z = w || _,
            A = Math.hypot(z.x - M.x, z.z - M.z),
            T = (M.x + z.x) / 2,
            E = (M.z + z.z) / 2,
            R = M.dx,
            P = M.dz,
            C = -P,
            I = R,
            L = 30,
            F = w
              ? [[0, (A - 3) / 2]]
              : [
                  [-(A / 2 + 3.1), 1.6],
                  [A / 2 + 3.1, 1.6],
                ],
            O = !0;
          for (let [D, U] of F)
            for (let G = -L; G <= L && O; G += 4)
              for (let W of [D - U, D, D + U])
                if (f(T + R * G + C * W, E + P * G + I * W)) {
                  O = !1;
                  break;
                }
          if (!O) continue;
          let B = i.driveHeight(T, E),
            H = B + 0.9,
            N = o.get(
              "railsR" +
                Math.floor((T + 3e3) / 400) +
                "_" +
                Math.floor((E + 3e3) / 400),
              "solid",
            );
          for (let [D, U] of F) {
            let G = (q, j) => [
                T + R * q + C * (j + D),
                E + P * q + I * (j + D),
              ],
              W = [G(-L, -U), G(L, -U), G(L, U), G(-L, U)],
              V = (w ? [-1, 1] : [D > 0 ? -1 : 1]).map((q) => [
                q * (U - 0.35) - 0.15,
                q * (U - 0.35) + 0.15,
              ]),
              $ = [-U, ...V.flat(), U].sort((q, j) => q - j);
            for (let q = 0; q + 1 < $.length; q++) {
              let j = $[q],
                K = $[q + 1],
                nt = (j + K) / 2;
              $i(
                N,
                [G(-L, j), G(L, j), G(L, K), G(-L, K)].map(([Q, et]) => [
                  Q,
                  H,
                  et,
                ]),
                V.some(([Q, et]) => nt > Q && nt < et) ? c : l,
              );
            }
            let [J, X] = G(0, 0);
            for (let q = 0; q < 4; q++) {
              let [j, K] = W[q],
                [nt, Q] = W[(q + 1) % 4];
              Ms(N, [j, B, K], [nt, B, Q], [nt, H, Q], [j, H, K], l, [
                j + nt - J,
                H,
                K + Q - X,
              ]);
            }
            for (let q = -L + 8; q <= L - 8; q += 6) {
              let [j, K] = G(q, 0);
              os(N, j, K, 0.07, H, H + 3, 6, a, 0.07);
            }
            for (let q of w ? [-1, 1] : [0]) {
              let [j, K] = G(-L + 7, q * 0.9),
                [nt, Q] = G(L - 7, q * 0.9);
              rs(N, [j, H + 3.05, K], [nt, H + 3.05, Q], w ? 1.8 : 3, 0.04, h);
            }
            let [tt, Z] = G(0, 0);
            t.push({
              t: "obb",
              x: tt,
              z: Z,
              hx: U + 0.1,
              hz: L,
              c: P,
              s: R,
              y0: B - 1,
              y1: H + 3,
              island: !0,
            });
          }
          break t;
        }
  }
}
function g1t(o) {
  let t = o.P,
    e = t.length / 3,
    s = new Float64Array(e),
    n = new Float64Array((e - 1) * 2),
    i = new Float64Array(e * 2);
  for (let a = 1; a < e; a++) {
    let r = t[a * 3] - t[a * 3 - 3],
      l = t[a * 3 + 1] - t[a * 3 - 2],
      c = Math.hypot(r, l) || 1e-9;
    ((s[a] = s[a - 1] + c),
      (n[(a - 1) * 2] = r / c),
      (n[(a - 1) * 2 + 1] = l / c));
  }
  for (let a = 0; a < e; a++) {
    let r = Math.min(e - 2, a);
    ((i[a * 2] = -n[r * 2 + 1]), (i[a * 2 + 1] = n[r * 2]));
  }
  Object.assign(o, { S: s, D: n, M: i, n: e, L: s[e - 1] });
}
