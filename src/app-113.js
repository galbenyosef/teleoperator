// app 113 — math
// Lines 82513-82744 of readable/app.pretty.js (statement-aligned).
function $ft({ B: i, colliders: t, inst: e }, s, n) {
  let { L: o } = s,
    a = At([0.42, 0.44, 0.42], Tt.metal),
    r = At([0.08, 0.08, 0.08], Tt.metal),
    l = At([0.55, 0.54, 0.5], Tt.conc),
    c = At([0.85, 0.7, 0.1], Tt.paint),
    h = At([0.5, 0.62, 0.62], Tt.glass),
    f = (u, d) => {
      let p = o.probe(u, d);
      return p.road && !p.road.J && p.road.E && !p.road.E.median;
    };
  for (let u of n) {
    let d = 30,
      p = null;
    for (let m = 0; m + 1 < u.length; m++) {
      let [g, b] = u[m],
        [x, v] = u[m + 1],
        y = Math.hypot(x - g, v - b);
      if (y < 0.001) continue;
      let M = (x - g) / y,
        S = (v - b) / y,
        w = -S,
        z = M;
      for (let _ = (46 - (d % 46)) % 46; _ < y; _ += 46) {
        let R = g + M * _,
          T = b + S * _,
          E = R + w * 2.1,
          A = T + z * 2.1;
        if (f(E, A) || by(s.D, R, T, 3)) {
          p = null;
          continue;
        }
        let C = o.driveHeight(R, T),
          P = i.get(
            "railsR" +
              Math.floor((E + 3e3) / 400) +
              "_" +
              Math.floor((A + 3e3) / 400),
            "solid",
          );
        (e.push({ kind: "tlpole", x: E, y: C, z: A, rot: Math.atan2(-w, -z) }),
          t.push({ t: "circ", x: E, z: A, r: 0.22, y0: C - 1.5, y1: C + 7 }));
        let I = [R, C + 5.9, T];
        (p &&
          Math.hypot(I[0] - p[0], I[2] - p[2]) < 60 &&
          ss(P, p, I, 0.02, 0.02, r),
          (p = I));
      }
      d += y;
    }
  }
  for (let [u, d] of Vft) {
    let p = s.D.juns.find(
      (g) =>
        g.legs.some(([b]) => b.name === u) &&
        g.legs.some(([b]) => b.name === d),
    );
    if (!p) continue;
    let m = null;
    for (let g of n)
      for (let b = 0; b + 1 < g.length; b++) {
        let [x, v] = g[b],
          [y, M] = g[b + 1],
          S = (y - x) ** 2 + (M - v) ** 2 || 1,
          w = Math.max(
            0,
            Math.min(1, ((p.x - x) * (y - x) + (p.z - v) * (M - v)) / S),
          ),
          z = Math.hypot(x + (y - x) * w - p.x, v + (M - v) * w - p.z);
        z < 28 &&
          (!m || z < m.d) &&
          (m = {
            d: z,
            x: x + (y - x) * w,
            z: v + (M - v) * w,
            dx: (y - x) / Math.sqrt(S),
            dz: (M - v) / Math.sqrt(S),
          });
      }
    if (m)
      t: for (let g of [1, -1])
        for (let b of [38, 46, 30, 54, 62]) {
          let x = m.x + m.dx * b * g,
            v = m.z + m.dz * b * g,
            y = [];
          for (let D of n) {
            let U = null;
            for (let G = 0; G + 1 < D.length; G++) {
              let [q, W] = D[G],
                [V, Y] = D[G + 1],
                $ = (V - q) ** 2 + (Y - W) ** 2 || 1,
                st = Math.max(
                  0,
                  Math.min(1, ((x - q) * (V - q) + (v - W) * (Y - W)) / $),
                ),
                Q = q + (V - q) * st,
                j = W + (Y - W) * st,
                X = Math.hypot(Q - x, j - v);
              (!U || X < U.d) &&
                (U = {
                  d: X,
                  x: Q,
                  z: j,
                  dx: (V - q) / Math.sqrt($),
                  dz: (Y - W) / Math.sqrt($),
                });
            }
            U && U.d < 14 && y.push(U);
          }
          y.sort((D, U) => D.d - U.d);
          let M = y[0],
            S = (D) => D !== M && Math.abs(D.dx * M.dx + D.dz * M.dz) > 0.9,
            w = y.find((D) => S(D) && Math.hypot(D.x - M.x, D.z - M.z) > 5.5),
            z = w
              ? null
              : y.find((D) => S(D) && Math.hypot(D.x - M.x, D.z - M.z) > 2.6);
          if (!M || (!w && !z)) continue;
          let _ = w || z,
            R = Math.hypot(_.x - M.x, _.z - M.z),
            T = (M.x + _.x) / 2,
            E = (M.z + _.z) / 2,
            A = M.dx,
            C = M.dz,
            P = -C,
            I = A,
            L = 30,
            F = w
              ? [[0, (R - 3) / 2]]
              : [
                  [-(R / 2 + 3.1), 1.6],
                  [R / 2 + 3.1, 1.6],
                ],
            N = !0;
          for (let [D, U] of F)
            for (let G = -L; G <= L && N; G += 4)
              for (let q of [D - U, D, D + U])
                if (f(T + A * G + P * q, E + C * G + I * q)) {
                  N = !1;
                  break;
                }
          if (!N) continue;
          let B = o.driveHeight(T, E),
            H = B + 0.9,
            O = i.get(
              "railsR" +
                Math.floor((T + 3e3) / 400) +
                "_" +
                Math.floor((E + 3e3) / 400),
              "solid",
            );
          for (let [D, U] of F) {
            let G = (j, X) => [
                T + A * j + P * (X + D),
                E + C * j + I * (X + D),
              ],
              q = [G(-L, -U), G(L, -U), G(L, U), G(-L, U)],
              W = (w ? [-1, 1] : [D > 0 ? -1 : 1]).map((j) => [
                j * (U - 0.35) - 0.15,
                j * (U - 0.35) + 0.15,
              ]),
              V = [-U, ...W.flat(), U].sort((j, X) => j - X);
            for (let j = 0; j + 1 < V.length; j++) {
              let X = V[j],
                K = V[j + 1],
                nt = (X + K) / 2;
              Fi(
                O,
                [G(-L, X), G(L, X), G(L, K), G(-L, K)].map(([Z, et]) => [
                  Z,
                  H,
                  et,
                ]),
                W.some(([Z, et]) => nt > Z && nt < et) ? c : l,
              );
            }
            let [Y, $] = G(0, 0);
            for (let j = 0; j < 4; j++) {
              let [X, K] = q[j],
                [nt, Z] = q[(j + 1) % 4];
              xs(O, [X, B, K], [nt, B, Z], [nt, H, Z], [X, H, K], l, [
                X + nt - Y,
                H,
                K + Z - $,
              ]);
            }
            for (let j = -L + 8; j <= L - 8; j += 6) {
              let [X, K] = G(j, 0);
              es(O, X, K, 0.07, H, H + 3, 6, a, 0.07);
            }
            for (let j of w ? [-1, 1] : [0]) {
              let [X, K] = G(-L + 7, j * 0.9),
                [nt, Z] = G(L - 7, j * 0.9);
              ss(O, [X, H + 3.05, K], [nt, H + 3.05, Z], w ? 1.8 : 3, 0.04, h);
            }
            let [st, Q] = G(0, 0);
            t.push({
              t: "obb",
              x: st,
              z: Q,
              hx: U + 0.1,
              hz: L,
              c: C,
              s: A,
              y0: B - 1,
              y1: H + 3,
              island: !0,
            });
          }
          break t;
        }
  }
}
function Xft(i) {
  let t = i.P,
    e = t.length / 3,
    s = new Float64Array(e),
    n = new Float64Array((e - 1) * 2),
    o = new Float64Array(e * 2);
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
    ((o[a * 2] = -n[r * 2 + 1]), (o[a * 2 + 1] = n[r * 2]));
  }
  Object.assign(i, { S: s, D: n, M: o, n: e, L: s[e - 1] });
}
