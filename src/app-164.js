// app 164 — math
// Lines 99045-100132 of readable/app.pretty.js (statement-aligned).
function az(o, t, e, s, n, i, a = null, r = "all") {
  let l = r === "under" ? null : i,
    c = r === "top" ? null : i,
    h = BC(t, a),
    f = oX(t, a, n, OC),
    u = HC(t, e, s, h, n, a, !1, f.cuts);
  if (u.length < 2) return;
  let d = (B, H, N) =>
      n?.terrainAt ? N - n.terrainAt(B, H) < (nl(t) ? 1 : 1.5) : !1,
    p = (B) => {
      let H = u[B],
        N = u[B + 1],
        D = d(H[1], H[2], H[3]) && d(N[1], N[2], N[3]);
      return nl(t) && D
        ? !0
        : D &&
            ((h[0] && N[0] <= t.s0 + mx + 0.01) ||
              (h[1] && H[0] >= t.s1 - mx - 0.01));
    },
    m = u.slice(0, -1).map((B, H) => p(H));
  t.custom && (o = null);
  let g =
      !!o &&
      !nl(t) &&
      !t.tunnelR &&
      t.name !== "Presidio Parkway" &&
      n?.terrainAt &&
      (t.P[2] - n.terrainAt(t.P[0], t.P[1]) > 2 ||
        t.P[t.n * 3 - 1] - n.terrainAt(t.P[t.n * 3 - 3], t.P[t.n * 3 - 2]) >
          2 ||
        t.L > 60),
    b = {},
    v = (B, H, N, D, U) => {
      if (!n?.probe) return !1;
      for (let G of n.probe(B, H).all) {
        let W = G.E;
        if (
          !(
            !W ||
            W === t ||
            G.J ||
            G.s === void 0 ||
            Math.abs(G.y - N) > 0.45
          ) &&
          !(W.ja !== t.ja && W.ja !== t.jb && W.jb !== t.ja && W.jb !== t.jb) &&
          (Ot(W, G.s, b), b.dx * D + b.dz * U > 0.5)
        )
          return !0;
      }
      return !1;
    },
    x = (B, H, N, D, U) => {
      if (!n?.probe) return null;
      for (let G of n.probe(B, H).all) {
        let W = G.E;
        if (
          !(
            !W ||
            W === t ||
            G.J ||
            G.s === void 0 ||
            Math.abs(G.y - N) > 1 ||
            W.cls !== t.cls
          ) &&
          (Ot(W, G.s, b), b.dx * D + b.dz * U < -0.5)
        )
          return { F: W, gap: 0.6 - (b.w - Math.abs(G.v)), dy: G.y - N };
      }
      return null;
    };
  for (let B of o || l ? [-1, 1] : [])
    for (let H = 0; H + 1 < u.length; H++) {
      let [N, D, U, G, W, V, $] = u[H],
        [, J, X, tt, Z, q, j] = u[H + 1],
        K = D + W * $ * B,
        nt = U + V * $ * B,
        Q = J + Z * j * B,
        et = X + q * j * B;
      if (m[H]) continue;
      {
        let yt = Math.hypot(J - D, X - U) || 1;
        if (
          v(
            (K + Q) / 2 + W * 0.3 * B,
            (nt + et) / 2 + V * 0.3 * B,
            (G + tt) / 2,
            (J - D) / yt,
            (X - U) / yt,
          )
        )
          continue;
      }
      if (ux(f.iv[B > 0 ? 1 : 0], N, u[H + 1][0])) continue;
      {
        let yt = Math.hypot(J - D, X - U) || 1,
          vt = t.shared
            ? null
            : x(
                (K + Q) / 2 + W * 0.6 * B,
                (nt + et) / 2 + V * 0.6 * B,
                (G + tt) / 2,
                (J - D) / yt,
                (X - U) / yt,
              );
        if (vt) {
          if (t.id > vt.F.id) continue;
          let At = vt.gap / 2,
            Ut = At - 0.2,
            Gt = At + 0.2,
            Pt = (as, Se, Fe, xe, He) => [as + Fe * He * B, Se + xe * He * B],
            [Vt, Kt] = Pt(K, nt, W, V, Ut),
            [ue, ne] = Pt(Q, et, Z, q, Ut),
            [jt, be] = Pt(K, nt, W, V, Gt),
            [re, ds] = Pt(Q, et, Z, q, Gt);
          if (o) {
            let as = Math.min(0, vt.dy) - 0.05;
            (B > 0
              ? (o.wall(
                  ue,
                  ne,
                  Vt,
                  Kt,
                  tt + as,
                  G + as,
                  tt + 0.85,
                  G + 0.85,
                  Ar,
                  N,
                  G,
                ),
                o.wall(
                  jt,
                  be,
                  re,
                  ds,
                  G + as,
                  tt + as,
                  G + 0.85,
                  tt + 0.85,
                  Ar,
                  N,
                  G,
                ))
              : (o.wall(
                  Vt,
                  Kt,
                  ue,
                  ne,
                  G + as,
                  tt + as,
                  G + 0.85,
                  tt + 0.85,
                  Ar,
                  N,
                  G,
                ),
                o.wall(
                  re,
                  ds,
                  jt,
                  be,
                  tt + as,
                  G + as,
                  tt + 0.85,
                  G + 0.85,
                  Ar,
                  N,
                  G,
                )),
              vx(
                o,
                [Vt, G + 0.85, Kt],
                [ue, tt + 0.85, ne],
                [re, tt + 0.85, ds],
                [jt, G + 0.85, be],
                Ar,
                !0,
              ));
          }
          let Nt = Q - K,
            $e = et - nt,
            ve = Math.hypot(Nt, $e);
          ve > 0.2 &&
            l &&
            l.push({
              t: "obb",
              x: (Vt + ue + jt + re) / 4,
              z: (Kt + ne + be + ds) / 4,
              hx: 0.2,
              hz: ve / 2 + 0.05,
              c: $e / ve,
              s: Nt / ve,
              y0: Math.min(G, tt) + Math.min(0, vt.dy) - 0.5,
              y1: Math.max(G, tt) + Math.max(0, vt.dy) + 1.2,
              rail: !0,
            });
          continue;
        }
      }
      let st = W * 0.4 * B,
        ot = V * 0.4 * B,
        rt = Z * 0.4 * B,
        lt = q * 0.4 * B;
      if (o) {
        B > 0
          ? o.wall(Q, et, K, nt, tt, G, tt + 0.85, G + 0.85, Ar, N, G)
          : o.wall(K, nt, Q, et, G, tt, G + 0.85, tt + 0.85, Ar, N, G);
        let yt = [K, G + 0.85, nt],
          vt = [Q, tt + 0.85, et],
          At = [Q + rt, tt + 0.85, et + lt],
          Ut = [K + st, G + 0.85, nt + ot];
        (vx(o, yt, vt, At, Ut, Ar, !0),
          B > 0
            ? o.wall(
                K + st,
                nt + ot,
                Q + rt,
                et + lt,
                G - 0.35,
                tt - 0.35,
                G + 0.85,
                tt + 0.85,
                xx,
                N,
                G - 1.35,
              )
            : o.wall(
                Q + rt,
                et + lt,
                K + st,
                nt + ot,
                tt - 0.35,
                G - 0.35,
                tt + 0.85,
                G + 0.85,
                xx,
                N,
                G - 1.35,
              ),
          g &&
            aX(
              o,
              t,
              N,
              u[H + 1][0],
              [K + st * 0.5, G, nt + ot * 0.5],
              [Q + rt * 0.5, tt, et + lt * 0.5],
              B,
              W,
              V,
            ));
      }
      if (
        t.shared &&
        B === t.shared.side &&
        t.shared.at[
          Math.min(
            t.shared.at.length - 1,
            Math.max(0, Math.round((N + u[H + 1][0]) / 2)),
          )
        ]
      )
        continue;
      let ht = (K + Q) / 2 + (st + rt) / 4,
        pt = (nt + et) / 2 + (ot + lt) / 4,
        ut = Q - K,
        it = et - nt,
        at = Math.hypot(ut, it);
      at > 0.2 &&
        l &&
        l.push({
          t: "obb",
          x: ht,
          z: pt,
          hx: 0.25,
          hz: at / 2 + 0.05,
          c: it / at,
          s: ut / at,
          y0: Math.min(G, tt) - (nl(t) ? 0.1 : 0.5),
          y1: Math.max(G, tt) + 1.2,
          rail: !0,
        });
    }
  if (
    (o && t.name === "Presidio Parkway" && !t.tunnelR && n2t(o, t, u),
    o && g && gx.joints && c2t(o, t, e, s, n),
    !o && !c)
  )
    return;
  let y = UC(t),
    M = (B, H, N) => {
      let D = n?.probe ? IC(t, N, n) : Cw(t, B);
      if (y.girders) {
        let V = B + 0.4;
        return [V, V - 0.7, V - 0.7, H - 0.35, H - D];
      }
      let U = Math.min(1.3, Math.max(0.5, B * 0.3)),
        G = B - U,
        W = Math.max(0.5, G - 0.55);
      return [B + 0.4, G, W, H - 0.35, H - D];
    },
    S = 3.4,
    w = [],
    _ = (B, H, N, D) => {
      if (!n?.probe) return !1;
      for (let U of n.probe(B, H).all)
        if (U.E !== t && U.y > N && U.y < D) return !0;
      return !1;
    },
    z = new Map(),
    A = (B, H) => {
      if (H >= 0 && z.has(H)) return z.get(H);
      let [, N, D, U, G, W, V] = B,
        $ = [-1, 0, 1].map((X) =>
          n.terrainAt(N + G * (V + 0.4) * X, D + W * (V + 0.4) * X),
        ),
        J = $.every((X, tt) => U - X <= S && (tt === 1 || U - X >= 0.25));
      for (let X = 0; X < 3 && J; X++) {
        let tt = X - 1,
          Z = (V + 0.4) * tt,
          q = N + G * Z,
          j = D + W * Z,
          K = $[X];
        (_(q, j, K - 1.5, U - 1) ||
          (tt && _(q + G * tt * 1.2, j + W * tt * 1.2, K - 1.5, U + 1.5))) &&
          (J = !1);
      }
      return (H >= 0 && z.set(H, J), J);
    };
  if (!t.custom && !t.tunnelR && n?.terrainAt)
    for (let B = 0; B + 1 < u.length; B++) {
      let H = u[B],
        N = u[B + 1],
        D =
          !(m[B] && nl(t)) &&
          !ux(f.iv[0], H[0], N[0]) &&
          !ux(f.iv[1], H[0], N[0]);
      ((D =
        D &&
        A(H, B) &&
        A(N, B + 1) &&
        A(
          [
            0,
            (H[1] + N[1]) / 2,
            (H[2] + N[2]) / 2,
            (H[3] + N[3]) / 2,
            H[4],
            H[5],
            (H[6] + N[6]) / 2,
          ],
          -1,
        )),
        w.push(D));
    }
  let T = (B, H, N, D, U, G) => [B + N * U, G, H + D * U];
  if (o)
    for (let B = 0; B + 1 < u.length; B++) {
      if (
        (m[B] && nl(t)) ||
        (ux(f.iv[0], u[B][0], u[B + 1][0]) && ux(f.iv[1], u[B][0], u[B + 1][0]))
      )
        continue;
      let [H, N, D, U, G, W, V] = u[B],
        [$, J, X, tt, Z, q, j] = u[B + 1],
        K = M(V, U, H),
        nt = M(j, tt, $);
      if (w[B]) {
        for (let rt of [-1, 1]) {
          let lt = T(N, D, G, W, K[0] * rt, K[3]),
            ht = T(J, X, Z, q, nt[0] * rt, nt[3]),
            pt = n.terrainAt(lt[0], lt[2]) - 0.4,
            ut = n.terrainAt(ht[0], ht[2]) - 0.4;
          na(
            o,
            [lt[0], pt, lt[2]],
            [ht[0], ut, ht[2]],
            ht,
            lt,
            [H, 0],
            [$, 0],
            [$, ht[1] - ut],
            [H, lt[1] - pt],
            bx,
            [G * rt, 0, W * rt],
          );
        }
        for (let [rt, lt, ht] of [
          [B, B - 1, -1],
          [B + 1, B + 1, 1],
        ]) {
          if (lt < 0 || lt >= w.length || w[lt]) continue;
          let [pt, ut, it, at, yt, vt, At] = u[rt],
            Ut = M(At, at, pt),
            Gt = T(ut, it, yt, vt, -Ut[0], Ut[3]),
            Pt = T(ut, it, yt, vt, Ut[0], Ut[3]),
            Vt = n.terrainAt(Gt[0], Gt[2]) - 0.4,
            Kt = n.terrainAt(Pt[0], Pt[2]) - 0.4,
            ue = vt,
            ne = -yt;
          na(
            o,
            [Gt[0], Vt, Gt[2]],
            [Pt[0], Kt, Pt[2]],
            Pt,
            Gt,
            [-Ut[0], 0],
            [Ut[0], 0],
            [Ut[0], Ut[3] - Kt],
            [-Ut[0], Ut[3] - Vt],
            bx,
            [ue * ht, 0, ne * ht],
          );
        }
        continue;
      }
      if (y.girders) {
        let rt = T(N, D, G, W, -K[0], K[3]),
          lt = T(N, D, G, W, K[0], K[3]),
          ht = T(J, X, Z, q, -nt[0], nt[3]),
          pt = T(J, X, Z, q, nt[0], nt[3]);
        na(
          o,
          rt,
          lt,
          pt,
          ht,
          [H, -K[0]],
          [H, K[0]],
          [$, nt[0]],
          [$, -nt[0]],
          Pl,
          [0, -1, 0],
        );
        let ut = Math.max(2, Math.round((K[1] * 2) / 1.8) + 1);
        for (let it = 0; it < ut; it++) {
          let at = -1 + (2 * it) / (ut - 1),
            yt = K[1] * at,
            vt = nt[1] * at;
          for (let [At, Ut] of [
            [-0.2, -1],
            [0.2, 1],
          ]) {
            let Gt = T(N, D, G, W, yt + At, K[3]),
              Pt = T(J, X, Z, q, vt + At, nt[3]),
              Vt = T(J, X, Z, q, vt + At, nt[4]),
              Kt = T(N, D, G, W, yt + At, K[4]);
            na(o, Kt, Vt, Pt, Gt, [H, 0], [$, 0], [$, 1.2], [H, 1.2], Pl, [
              G * Ut,
              0,
              W * Ut,
            ]);
          }
          na(
            o,
            T(N, D, G, W, yt - 0.2, K[4]),
            T(N, D, G, W, yt + 0.2, K[4]),
            T(J, X, Z, q, vt + 0.2, nt[4]),
            T(J, X, Z, q, vt - 0.2, nt[4]),
            [H, 0],
            [H, 0.4],
            [$, 0.4],
            [$, 0],
            Pl,
            [0, -1, 0],
          );
        }
        continue;
      }
      for (let rt of [-1, 1]) {
        let lt = T(N, D, G, W, K[0] * rt, K[3]),
          ht = T(J, X, Z, q, nt[0] * rt, nt[3]),
          pt = T(N, D, G, W, K[1] * rt, K[3]),
          ut = T(J, X, Z, q, nt[1] * rt, nt[3]),
          it = T(N, D, G, W, K[2] * rt, K[4]),
          at = T(J, X, Z, q, nt[2] * rt, nt[4]);
        na(
          o,
          lt,
          ht,
          ut,
          pt,
          [H, K[0] * rt],
          [$, nt[0] * rt],
          [$, nt[1] * rt],
          [H, K[1] * rt],
          Pl,
          [0, -1, 0],
        );
        let yt = Math.hypot(K[1] - K[2], K[3] - K[4]),
          vt = [
            (G * rt * (K[3] - K[4])) / yt,
            -(K[1] - K[2]) / yt,
            (W * rt * (K[3] - K[4])) / yt,
          ];
        na(o, pt, ut, at, it, [H, 0], [$, 0], [$, yt], [H, yt], Pl, vt);
      }
      let Q = T(N, D, G, W, -K[2], K[4]),
        et = T(N, D, G, W, K[2], K[4]),
        st = T(J, X, Z, q, -nt[2], nt[4]),
        ot = T(J, X, Z, q, nt[2], nt[4]);
      na(
        o,
        Q,
        et,
        ot,
        st,
        [H, -K[2]],
        [H, K[2]],
        [$, nt[2]],
        [$, -nt[2]],
        Pl,
        [0, -1, 0],
      );
    }
  if (c)
    for (let B = 0; B + 1 < u.length; B++) {
      if (!w[B]) continue;
      let [, H, N, D, U, G, W] = u[B],
        [, V, $, J, , , X] = u[B + 1];
      for (let tt of [-1, 1]) {
        let Z = H + U * (W + 0.4) * tt,
          q = N + G * (W + 0.4) * tt,
          j = V + U * (X + 0.4) * tt,
          K = $ + G * (X + 0.4) * tt,
          nt = j - Z,
          Q = K - q,
          et = Math.hypot(nt, Q);
        if (et < 0.2) continue;
        let st = Math.min(n.terrainAt(Z, q), n.terrainAt(j, K));
        c.push({
          t: "obb",
          x: (Z + j) / 2 - U * 0.15 * tt,
          z: (q + K) / 2 - G * 0.15 * tt,
          hx: 0.3,
          hz: et / 2 + 0.05,
          c: Q / et,
          s: nt / et,
          y0: st - 1,
          y1: Math.min(D, J) - 0.4,
          wall: !0,
          fill: !0,
        });
      }
    }
  let E = {},
    R = y.sp,
    P = 8,
    C = n?.terrainAt && a?.bld ? Vm(a) : null,
    I = (B, H) => {
      if (!C) return !1;
      let N = Math.round((B - C.x0) / C.cell),
        D = Math.round((H - C.z0) / C.cell);
      return N < 0 || D < 0 || N >= C.w || D >= C.h
        ? !1
        : C.H[D * C.w + N] > n.terrainAt(B, H) + 2.5;
    },
    L = (B) => {
      for (let H of [0, 6, -6, 12, -12]) {
        let N = B + H;
        if (N < t.s0 + 2 || N > t.s1 - 2) continue;
        Ot(t, N, E);
        let D = M(E.w, E.y, N),
          U = D[4];
        if (U - n.terrainAt(E.x, E.z) < 3) return null;
        for (let G of [0, -1.5, 1.5, -3, 3]) {
          let W = E.x + E.nx * G,
            V = E.z + E.nz * G,
            $ = n.terrainAt(W, V),
            J = y.hu * 1.25 + 0.6;
          if (U - $ < 3 || I(W, V)) continue;
          let X = !1;
          for (let j = 0; j <= 8 && !X; j++) {
            let K = (j * Math.PI) / 4,
              nt = j === 8 ? 0 : J;
            _(W + Math.cos(K) * nt, V + Math.sin(K) * nt, $ - 1.5, U - 1) &&
              (X = !0);
          }
          if (X) continue;
          if (Math.abs(G) <= D[2])
            return {
              x: E.x,
              z: E.z,
              y: E.y,
              dx: E.dx,
              dz: E.dz,
              nx: E.nx,
              nz: E.nz,
              P: D,
              cols: [[W, V]],
              r: y.hu * 1.25,
              n: 1,
              cap: !1,
              gy: n.terrainAt(E.x, E.z),
            };
          let tt = y.cap + 0.3,
            Z = U - tt,
            q = Z - $ > 3;
          for (let j = 0; j <= 1 && q; j += 0.25) {
            let K = E.x + E.nx * G * j,
              nt = E.z + E.nz * G * j;
            _(K, nt, Z - 4.4, Z + 0.2) && (q = !1);
          }
          if (q)
            return {
              x: E.x,
              z: E.z,
              y: E.y,
              dx: E.dx,
              dz: E.dz,
              nx: E.nx,
              nz: E.nz,
              P: D,
              cols: [[W, V]],
              r: y.hu * 1.25,
              n: 1,
              cap: !0,
              wide: !0,
              drop: tt,
              mid: G / 2,
              half: Math.abs(G) / 2 + D[2] * 0.5 + y.hu * 1.25 + 0.3,
              gy: n.terrainAt(E.x, E.z),
            };
        }
        {
          let G = y.hu * 1.25,
            W = {};
          for (let V of n.probe(E.x, E.z).all) {
            let $ = V.E;
            if (
              !$ ||
              V.J ||
              $ === t ||
              $.oneway ||
              $.hwy ||
              $.layered ||
              $.inner ||
              V.y > U - 3 ||
              $.W[0] < 5.5
            )
              continue;
            ys($, E.x, E.z, W);
            let J = Math.min(W.k, $.n - 2),
              X = $.D[J * 2],
              tt = $.D[J * 2 + 1];
            if (
              Math.abs(X * E.dx + tt * E.dz) < 0.85 ||
              W.s < $.s0 + 6 ||
              W.s > $.s1 - 6
            )
              continue;
            let Z = E.x + W.v * tt,
              q = E.z - W.v * X,
              j = (Z - E.x) * E.nx + (q - E.z) * E.nz,
              K = E.x + E.nx * j,
              nt = E.z + E.nz * j,
              Q = n.terrainAt(K, nt);
            {
              let rt = {};
              if ((ys($, K, nt, rt), Math.abs(rt.v) > 0.3)) continue;
            }
            if (Math.abs(j) > D[0] + 3 || U - Q < 3 || I(K, nt)) continue;
            let et = !1;
            for (let rt = 0; rt < 8 && !et; rt++) {
              let lt = (rt * Math.PI) / 4;
              for (let ht of n.probe(
                K + Math.cos(lt) * (G + 0.6),
                nt + Math.sin(lt) * (G + 0.6),
              ).all)
                if (ht.E !== $ && ht.y > Q - 1.5 && ht.y < U - 1) {
                  et = !0;
                  break;
                }
            }
            if (et) continue;
            $.colMed = Math.max($.colMed || 0, G + 0.35);
            let st = Math.abs(j) > D[2] * 0.85,
              ot = y.cap + 0.3;
            return st
              ? {
                  x: E.x,
                  z: E.z,
                  y: E.y,
                  dx: E.dx,
                  dz: E.dz,
                  nx: E.nx,
                  nz: E.nz,
                  P: D,
                  cols: [[K, nt]],
                  r: G,
                  n: 1,
                  cap: !0,
                  wide: !0,
                  drop: ot,
                  mid: j / 2,
                  half: Math.abs(j) / 2 + G + 0.3,
                  gy: n.terrainAt(E.x, E.z),
                  med: $,
                }
              : {
                  x: E.x,
                  z: E.z,
                  y: E.y,
                  dx: E.dx,
                  dz: E.dz,
                  nx: E.nx,
                  nz: E.nz,
                  P: D,
                  cols: [[K, nt]],
                  r: G,
                  n: 1,
                  cap: !1,
                  gy: n.terrainAt(E.x, E.z),
                  med: $,
                };
          }
        }
        if (!(U - n.terrainAt(E.x, E.z) < 4.4))
          for (let G of [y.cap + 0.6, 0.35]) {
            let W = U - G,
              V = Math.max(y.hu, y.hv) * 1.25,
              $ = (j) => {
                for (let K = D[0] + V + 0.4; K <= D[0] + 22; K += 0.75) {
                  let nt = E.x + E.nx * K * j,
                    Q = E.z + E.nz * K * j,
                    et = n.terrainAt(nt, Q),
                    st = W - et < 3 || I(nt, Q);
                  for (let ot = 0; ot <= 8 && !st; ot++) {
                    let rt = (ot * Math.PI) / 4,
                      lt = ot === 8 ? 0 : V + 0.6;
                    _(
                      nt + Math.cos(rt) * lt,
                      Q + Math.sin(rt) * lt,
                      et - 1.5,
                      U - 1,
                    ) && (st = !0);
                  }
                  if (!st) return K;
                }
                return null;
              },
              J = $(-1),
              X = $(1),
              tt = 0;
            if (J === null && X === null) continue;
            if (J === null) {
              if (X > D[0] + V + 10) continue;
              ((J = Math.max(0, D[2] - V)), (tt = 1));
            } else if (X === null) {
              if (J > D[0] + V + 10) continue;
              ((X = Math.max(0, D[2] - V)), (tt = -1));
            }
            let Z = !0;
            for (let j = -J; j <= X && Z; j += 1.5) {
              let K = E.x + E.nx * j,
                nt = E.z + E.nz * j;
              _(K, nt, W - (G > 1 ? 4.4 : 3.5), W + 0.2) && (Z = !1);
            }
            if (!Z) continue;
            let q = [
              [E.x - E.nx * J, E.z - E.nz * J],
              [E.x + E.nx * X, E.z + E.nz * X],
            ].filter((j, K) => !tt || (K === 0) == tt < 0);
            return {
              x: E.x,
              z: E.z,
              y: E.y,
              dx: E.dx,
              dz: E.dz,
              nx: E.nx,
              nz: E.nz,
              P: D,
              cols: q,
              r: V,
              n: q.length,
              cap: !0,
              wide: !0,
              drop: G,
              mid: (X - J) / 2,
              half: (J + X) / 2 + V + 0.3,
              gy: n.terrainAt(E.x, E.z),
            };
          }
      }
      return null;
    },
    F = [],
    O = (B, H) => {
      let N = null;
      for (let q of H) {
        let j = B + q;
        if (j < t.s0 + 2 || j > t.s1 - 2) continue;
        Ot(t, j, E);
        let K = n.terrainAt(E.x, E.z),
          nt = M(E.w, E.y, j),
          Q = nt[4];
        if (Q - K < 1.6) break;
        let et = nt[2] < 2.2 ? 1 : nt[2] < 6 ? 2 : 3,
          st = Math.max(y.hu, y.hv) * (et === 1 ? 1.1 : 1),
          rt = (
            et === 1
              ? [0]
              : et === 2
                ? [-0.62 * nt[2], 0.62 * nt[2]]
                : [-0.72 * nt[2], 0, 0.72 * nt[2]]
          ).map((pt) => [E.x + E.nx * pt, E.z + E.nz * pt]),
          lt = !1;
        for (let [pt, ut] of rt) {
          let it = n.terrainAt(pt, ut);
          for (let at = 0; at <= 8 && !lt; at++) {
            let yt = (at * Math.PI) / 4,
              vt = at === 8 ? 0 : st + 0.6;
            _(
              pt + Math.cos(yt) * vt,
              ut + Math.sin(yt) * vt,
              it - 1.5,
              Q - 0.3,
            ) && (lt = !0);
          }
        }
        if (lt) continue;
        let ht = et > 1 && Q - K > 7;
        for (let pt = -2; pt <= 2 && ht; pt++) {
          let ut = ((nt[2] + 0.3) * pt) / 2,
            it = E.x + E.nx * ut,
            at = E.z + E.nz * ut;
          _(it, at, Q - y.cap - 4.4, Q - 0.5) && (ht = !1);
        }
        N = {
          x: E.x,
          z: E.z,
          y: E.y,
          dx: E.dx,
          dz: E.dz,
          nx: E.nx,
          nz: E.nz,
          P: nt,
          cols: rt,
          r: st,
          n: et,
          cap: ht,
          gy: K,
        };
        break;
      }
      if ((!N && n?.terrainAt && (N = L(B)), !N)) return !1;
      let { P: D, cols: U, n: G } = N,
        W = D[4],
        V = y.girders && !N.cap && !N.wide,
        $ = N.cap || V,
        J = $ ? W - (N.wide ? N.drop : V ? 0.6 : y.cap) : W,
        X = N.wide ? 1.25 : G === 1 ? 1.1 : 1,
        tt = (q, j) => {
          if ($ || y.girders) return J;
          let K = Math.abs((q - N.x) * N.nx + (j - N.z) * N.nz);
          return K <= D[2]
            ? D[4]
            : K <= D[1]
              ? D[4] +
                ((D[3] - D[4]) * (K - D[2])) / Math.max(0.01, D[1] - D[2])
              : D[3];
        };
      if (o) {
        N.wide
          ? FC(
              o,
              N.x + N.nx * N.mid,
              N.z + N.nz * N.mid,
              N.dx,
              N.dz,
              y.hu * X + 0.2,
              N.half,
              J,
              W + 0.05,
              y.col,
            )
          : $ &&
            FC(
              o,
              N.x,
              N.z,
              N.dx,
              N.dz,
              y.hu + 0.25,
              (y.girders ? D[0] - 0.3 : D[2]) + 0.35,
              J,
              W + 0.05,
              y.col,
            );
        for (let [q, j] of U) {
          let K = n.terrainAt(q, j) - 0.5,
            nt = y.hu * X,
            Q = y.hv * X,
            et = y.ch * X,
            st = tt(q, j),
            ot = K;
          (y.band &&
            st - K > 5 &&
            (dx(o, q, j, N.dx, N.dz, nt, Q, et, ot, K + 2.9, y.band, 0),
            (ot = K + 2.9)),
            G === 1 && st - ot > 4
              ? (dx(
                  o,
                  q,
                  j,
                  N.dx,
                  N.dz,
                  nt,
                  Q,
                  et,
                  ot,
                  st - 1.8,
                  y.col,
                  ot - K,
                ),
                dx(
                  o,
                  q,
                  j,
                  N.dx,
                  N.dz,
                  nt,
                  Q,
                  et,
                  st - 1.8,
                  st + 0.05,
                  y.col,
                  st - 1.8 - K,
                  1.6,
                ))
              : dx(
                  o,
                  q,
                  j,
                  N.dx,
                  N.dz,
                  nt,
                  Q,
                  et,
                  ot,
                  st + 0.05,
                  y.col,
                  ot - K,
                ));
        }
      }
      let Z = N.wide
        ? [
            N.x + N.nx * (N.mid - N.half),
            N.z + N.nz * (N.mid - N.half),
            N.x + N.nx * (N.mid + N.half),
            N.z + N.nz * (N.mid + N.half),
            J,
          ]
        : $
          ? [
              N.x - N.nx * (D[2] + 0.35),
              N.z - N.nz * (D[2] + 0.35),
              N.x + N.nx * (D[2] + 0.35),
              N.z + N.nz * (D[2] + 0.35),
              J,
            ]
          : [
              U[0][0] - N.nx * (G === 1 ? 1.6 * y.hv : 0),
              U[0][1] - N.nz * (G === 1 ? 1.6 * y.hv : 0),
              U[U.length - 1][0] + N.nx * (G === 1 ? 1.6 * y.hv : 0),
              U[U.length - 1][1] + N.nz * (G === 1 ? 1.6 * y.hv : 0),
              J,
            ];
      if (c)
        for (let [q, j] of U)
          c.push({
            t: "obb",
            x: q,
            z: j,
            hx: y.hv * X + 0.05,
            hz: y.hu * X + 0.05,
            c: N.dz,
            s: N.dx,
            y0: Math.min(N.gy, n.terrainAt(q, j)) - 1,
            y1: tt(q, j),
            pier: !0,
            sup: Z,
            src: t.id,
          });
      return (F.push(ys(t, N.x, N.z, {}).s), !0);
    };
  if (!t.custom) {
    for (let B = Math.ceil((e - P) / R); P + B * R < s; B++) {
      let H = P + B * R,
        N = !1;
      (t.L - t.s1 > 12 &&
        H > t.s1 - 4 &&
        H < t.s1 - 4 + R * 0.5 &&
        H - R < t.s1 - 4 - R * 0.5 &&
        ((H = t.s1 - 4), (N = !0)),
        !(H < t.s0 + 4 || H > t.s1 - 4) && O(H, [0, 4, -4, 8, -8, 12, -12]));
    }
    F.sort((B, H) => B - H);
    for (let B = 0; B + 1 < F.length; B++) {
      let H = F[B],
        N = F[B + 1];
      if (N - H <= 45) continue;
      let D = (H + N) / 2;
      for (
        let U = 0;
        U <= (N - H) / 2 - 10 && !(O(D + U, [0]) || (U && O(D - U, [0])));
        U += 2
      );
    }
  }
  if (y.fence && !nl(t) && n?.probe && t.P[0] > -3e3) {
    let H = [[], []];
    for (let U = Math.ceil(e / 3); U * 3 < s; U++) {
      let G = U * 3;
      if (G < t.s0 + 6 || G + 3 > t.s1 - 6) continue;
      Ot(t, G, E);
      let W = M(E.w, E.y, G);
      for (let [V, $] of [
        [0, -1],
        [1, 1],
      ]) {
        let J = (W[0] - 0.3) * $,
          X = E.x + E.nx * J,
          tt = E.z + E.nz * J,
          Z = n.terrainAt(X, tt),
          q = W[4] - Z > 3.2 && E.y - Z < 30;
        for (let j = 0; j <= 2 && q; j++) {
          let K = (j * 3) / 2,
            nt = X + E.dx * K,
            Q = tt + E.dz * K;
          for (let et of j === 1 ? [0] : [0, 1.5, -1.5]) {
            let st = n.probe(nt + et * E.nx, Q + et * E.nz);
            if (st.walk && Math.abs(st.walk.y - Z) < 3) {
              q = !1;
              break;
            }
            if (st.all.some((ot) => ot.E !== t && ot.y < E.y - 2)) {
              q = !1;
              break;
            }
          }
        }
        q && H[V].push([G, X, tt, Z, E.dx, E.dz]);
      }
    }
    let N = [0.09, 0.1, 0.09, 0.82],
      D = [0.5, 0.51, 0.5, 0.82];
    for (let U of H)
      for (let [G, W, V, $, J, X] of U) {
        let tt = W + J * 3,
          Z = V + X * 3,
          q = n.terrainAt(tt, Z);
        if (o) {
          (il(o, [W, $ - 0.2, V], [W, $ + 2.45, V], 0.04, D),
            il(o, [W, $ + 2.4, V], [tt, q + 2.4, Z], 0.025, D));
          for (let j of [-1, 1])
            na(
              o,
              [W, $ - 0.1, V],
              [tt, q - 0.1, Z],
              [tt, q + 1.8, Z],
              [W, $ + 1.8, V],
              [G, 0],
              [G + 3, 0],
              [G + 3, 1.9],
              [G, 1.9],
              N,
              [-X * j, 0, J * j],
            );
        }
        c &&
          c.push({
            t: "obb",
            x: (W + tt) / 2,
            z: (V + Z) / 2,
            hx: 0.08,
            hz: 3 / 2 + 0.05,
            c: X,
            s: J,
            y0: Math.min($, q) - 0.5,
            y1: Math.max($, q) + 2.4,
            wall: !0,
            fence: !0,
          });
      }
  }
}
