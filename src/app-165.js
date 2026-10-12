// app 165 — math
// Lines 98809-99896 of readable/app.pretty.js (statement-aligned).
function ak(i, t, e, s, n, o, a = null, r = "all") {
  let l = r === "under" ? null : o,
    c = r === "top" ? null : o,
    h = aP(t, a),
    f = sV(t, a, n, oP),
    u = lP(t, e, s, h, n, a, !1, f.cuts);
  if (u.length < 2) return;
  let d = (B, H, O) =>
      n?.terrainAt ? O - n.terrainAt(B, H) < (I0(t) ? 1 : 1.5) : !1,
    p = (B) => {
      let H = u[B],
        O = u[B + 1],
        D = d(H[1], H[2], H[3]) && d(O[1], O[2], O[3]);
      return I0(t) && D
        ? !0
        : D &&
            ((h[0] && O[0] <= t.s0 + Ab + 0.01) ||
              (h[1] && H[0] >= t.s1 - Ab - 0.01));
    },
    m = u.slice(0, -1).map((B, H) => p(H));
  t.custom && (i = null);
  let g =
      !!i &&
      !I0(t) &&
      !t.tunnelR &&
      t.name !== "Presidio Parkway" &&
      n?.terrainAt &&
      (t.P[2] - n.terrainAt(t.P[0], t.P[1]) > 2 ||
        t.P[t.n * 3 - 1] - n.terrainAt(t.P[t.n * 3 - 3], t.P[t.n * 3 - 2]) >
          2 ||
        t.L > 60),
    b = {},
    x = (B, H, O, D, U) => {
      if (!n?.probe) return !1;
      for (let G of n.probe(B, H).all) {
        let q = G.E;
        if (
          !(
            !q ||
            q === t ||
            G.J ||
            G.s === void 0 ||
            Math.abs(G.y - O) > 0.45
          ) &&
          !(q.ja !== t.ja && q.ja !== t.jb && q.jb !== t.ja && q.jb !== t.jb) &&
          (Ot(q, G.s, b), b.dx * D + b.dz * U > 0.5)
        )
          return !0;
      }
      return !1;
    },
    v = (B, H, O, D, U) => {
      if (!n?.probe) return null;
      for (let G of n.probe(B, H).all) {
        let q = G.E;
        if (
          !(
            !q ||
            q === t ||
            G.J ||
            G.s === void 0 ||
            Math.abs(G.y - O) > 1 ||
            q.cls !== t.cls
          ) &&
          (Ot(q, G.s, b), b.dx * D + b.dz * U < -0.5)
        )
          return { F: q, gap: 0.6 - (b.w - Math.abs(G.v)), dy: G.y - O };
      }
      return null;
    };
  for (let B of i || l ? [-1, 1] : [])
    for (let H = 0; H + 1 < u.length; H++) {
      let [O, D, U, G, q, W, V] = u[H],
        [, Y, $, st, Q, j, X] = u[H + 1],
        K = D + q * V * B,
        nt = U + W * V * B,
        Z = Y + Q * X * B,
        et = $ + j * X * B;
      if (m[H]) continue;
      {
        let yt = Math.hypot(Y - D, $ - U) || 1;
        if (
          x(
            (K + Z) / 2 + q * 0.3 * B,
            (nt + et) / 2 + W * 0.3 * B,
            (G + st) / 2,
            (Y - D) / yt,
            ($ - U) / yt,
          )
        )
          continue;
      }
      if (zb(f.iv[B > 0 ? 1 : 0], O, u[H + 1][0])) continue;
      {
        let yt = Math.hypot(Y - D, $ - U) || 1,
          vt = t.shared
            ? null
            : v(
                (K + Z) / 2 + q * 0.6 * B,
                (nt + et) / 2 + W * 0.6 * B,
                (G + st) / 2,
                (Y - D) / yt,
                ($ - U) / yt,
              );
        if (vt) {
          if (t.id > vt.F.id) continue;
          let Pt = vt.gap / 2,
            jt = Pt - 0.2,
            Wt = Pt + 0.2,
            Ct = (we, rs, Le, de, Ie) => [we + Le * Ie * B, rs + de * Ie * B],
            [qt, Zt] = Ct(K, nt, q, W, jt),
            [he, ee] = Ct(Z, et, Q, j, jt),
            [Xt, me] = Ct(K, nt, q, W, Wt),
            [re, os] = Ct(Z, et, Q, j, Wt);
          if (i) {
            let we = Math.min(0, vt.dy) - 0.05;
            (B > 0
              ? (i.wall(
                  he,
                  ee,
                  qt,
                  Zt,
                  st + we,
                  G + we,
                  st + 0.85,
                  G + 0.85,
                  pr,
                  O,
                  G,
                ),
                i.wall(
                  Xt,
                  me,
                  re,
                  os,
                  G + we,
                  st + we,
                  G + 0.85,
                  st + 0.85,
                  pr,
                  O,
                  G,
                ))
              : (i.wall(
                  qt,
                  Zt,
                  he,
                  ee,
                  G + we,
                  st + we,
                  G + 0.85,
                  st + 0.85,
                  pr,
                  O,
                  G,
                ),
                i.wall(
                  re,
                  os,
                  Xt,
                  me,
                  st + we,
                  G + we,
                  st + 0.85,
                  G + 0.85,
                  pr,
                  O,
                  G,
                )),
              Lb(
                i,
                [qt, G + 0.85, Zt],
                [he, st + 0.85, ee],
                [re, st + 0.85, os],
                [Xt, G + 0.85, me],
                pr,
                !0,
              ));
          }
          let Dt = Z - K,
            qe = et - nt,
            pe = Math.hypot(Dt, qe);
          pe > 0.2 &&
            l &&
            l.push({
              t: "obb",
              x: (qt + he + Xt + re) / 4,
              z: (Zt + ee + me + os) / 4,
              hx: 0.2,
              hz: pe / 2 + 0.05,
              c: qe / pe,
              s: Dt / pe,
              y0: Math.min(G, st) + Math.min(0, vt.dy) - 0.5,
              y1: Math.max(G, st) + Math.max(0, vt.dy) + 1.2,
              rail: !0,
            });
          continue;
        }
      }
      let tt = q * 0.4 * B,
        it = W * 0.4 * B,
        rt = Q * 0.4 * B,
        lt = j * 0.4 * B;
      if (i) {
        B > 0
          ? i.wall(Z, et, K, nt, st, G, st + 0.85, G + 0.85, pr, O, G)
          : i.wall(K, nt, Z, et, G, st, G + 0.85, st + 0.85, pr, O, G);
        let yt = [K, G + 0.85, nt],
          vt = [Z, st + 0.85, et],
          Pt = [Z + rt, st + 0.85, et + lt],
          jt = [K + tt, G + 0.85, nt + it];
        (Lb(i, yt, vt, Pt, jt, pr, !0),
          B > 0
            ? i.wall(
                K + tt,
                nt + it,
                Z + rt,
                et + lt,
                G - 0.35,
                st - 0.35,
                G + 0.85,
                st + 0.85,
                Cb,
                O,
                G - 1.35,
              )
            : i.wall(
                Z + rt,
                et + lt,
                K + tt,
                nt + it,
                st - 0.35,
                G - 0.35,
                st + 0.85,
                G + 0.85,
                Cb,
                O,
                G - 1.35,
              ),
          g &&
            nV(
              i,
              t,
              O,
              u[H + 1][0],
              [K + tt * 0.5, G, nt + it * 0.5],
              [Z + rt * 0.5, st, et + lt * 0.5],
              B,
              q,
              W,
            ));
      }
      if (
        t.shared &&
        B === t.shared.side &&
        t.shared.at[
          Math.min(
            t.shared.at.length - 1,
            Math.max(0, Math.round((O + u[H + 1][0]) / 2)),
          )
        ]
      )
        continue;
      let ct = (K + Z) / 2 + (tt + rt) / 4,
        dt = (nt + et) / 2 + (it + lt) / 4,
        ut = Z - K,
        ot = et - nt,
        at = Math.hypot(ut, ot);
      at > 0.2 &&
        l &&
        l.push({
          t: "obb",
          x: ct,
          z: dt,
          hx: 0.25,
          hz: at / 2 + 0.05,
          c: ot / at,
          s: ut / at,
          y0: Math.min(G, st) - (I0(t) ? 0.1 : 0.5),
          y1: Math.max(G, st) + 1.2,
          rail: !0,
        });
    }
  if (
    (i && t.name === "Presidio Parkway" && !t.tunnelR && Ldt(i, t, u),
    i && g && Rb.joints && Hdt(i, t, e, s, n),
    !i && !c)
  )
    return;
  let y = hP(t),
    M = (B, H, O) => {
      let D = n?.probe ? nP(t, O, n) : Oy(t, B);
      if (y.girders) {
        let W = B + 0.4;
        return [W, W - 0.7, W - 0.7, H - 0.35, H - D];
      }
      let U = Math.min(1.3, Math.max(0.5, B * 0.3)),
        G = B - U,
        q = Math.max(0.5, G - 0.55);
      return [B + 0.4, G, q, H - 0.35, H - D];
    },
    S = 3.4,
    w = [],
    z = (B, H, O, D) => {
      if (!n?.probe) return !1;
      for (let U of n.probe(B, H).all)
        if (U.E !== t && U.y > O && U.y < D) return !0;
      return !1;
    },
    _ = new Map(),
    R = (B, H) => {
      if (H >= 0 && _.has(H)) return _.get(H);
      let [, O, D, U, G, q, W] = B,
        V = [-1, 0, 1].map(($) =>
          n.terrainAt(O + G * (W + 0.4) * $, D + q * (W + 0.4) * $),
        ),
        Y = V.every(($, st) => U - $ <= S && (st === 1 || U - $ >= 0.25));
      for (let $ = 0; $ < 3 && Y; $++) {
        let st = $ - 1,
          Q = (W + 0.4) * st,
          j = O + G * Q,
          X = D + q * Q,
          K = V[$];
        (z(j, X, K - 1.5, U - 1) ||
          (st && z(j + G * st * 1.2, X + q * st * 1.2, K - 1.5, U + 1.5))) &&
          (Y = !1);
      }
      return (H >= 0 && _.set(H, Y), Y);
    };
  if (!t.custom && !t.tunnelR && n?.terrainAt)
    for (let B = 0; B + 1 < u.length; B++) {
      let H = u[B],
        O = u[B + 1],
        D =
          !(m[B] && I0(t)) &&
          !zb(f.iv[0], H[0], O[0]) &&
          !zb(f.iv[1], H[0], O[0]);
      ((D =
        D &&
        R(H, B) &&
        R(O, B + 1) &&
        R(
          [
            0,
            (H[1] + O[1]) / 2,
            (H[2] + O[2]) / 2,
            (H[3] + O[3]) / 2,
            H[4],
            H[5],
            (H[6] + O[6]) / 2,
          ],
          -1,
        )),
        w.push(D));
    }
  let T = (B, H, O, D, U, G) => [B + O * U, G, H + D * U];
  if (i)
    for (let B = 0; B + 1 < u.length; B++) {
      if (
        (m[B] && I0(t)) ||
        (zb(f.iv[0], u[B][0], u[B + 1][0]) && zb(f.iv[1], u[B][0], u[B + 1][0]))
      )
        continue;
      let [H, O, D, U, G, q, W] = u[B],
        [V, Y, $, st, Q, j, X] = u[B + 1],
        K = M(W, U, H),
        nt = M(X, st, V);
      if (w[B]) {
        for (let rt of [-1, 1]) {
          let lt = T(O, D, G, q, K[0] * rt, K[3]),
            ct = T(Y, $, Q, j, nt[0] * rt, nt[3]),
            dt = n.terrainAt(lt[0], lt[2]) - 0.4,
            ut = n.terrainAt(ct[0], ct[2]) - 0.4;
          $o(
            i,
            [lt[0], dt, lt[2]],
            [ct[0], ut, ct[2]],
            ct,
            lt,
            [H, 0],
            [V, 0],
            [V, ct[1] - ut],
            [H, lt[1] - dt],
            Pb,
            [G * rt, 0, q * rt],
          );
        }
        for (let [rt, lt, ct] of [
          [B, B - 1, -1],
          [B + 1, B + 1, 1],
        ]) {
          if (lt < 0 || lt >= w.length || w[lt]) continue;
          let [dt, ut, ot, at, yt, vt, Pt] = u[rt],
            jt = M(Pt, at, dt),
            Wt = T(ut, ot, yt, vt, -jt[0], jt[3]),
            Ct = T(ut, ot, yt, vt, jt[0], jt[3]),
            qt = n.terrainAt(Wt[0], Wt[2]) - 0.4,
            Zt = n.terrainAt(Ct[0], Ct[2]) - 0.4,
            he = vt,
            ee = -yt;
          $o(
            i,
            [Wt[0], qt, Wt[2]],
            [Ct[0], Zt, Ct[2]],
            Ct,
            Wt,
            [-jt[0], 0],
            [jt[0], 0],
            [jt[0], jt[3] - Zt],
            [-jt[0], jt[3] - qt],
            Pb,
            [he * ct, 0, ee * ct],
          );
        }
        continue;
      }
      if (y.girders) {
        let rt = T(O, D, G, q, -K[0], K[3]),
          lt = T(O, D, G, q, K[0], K[3]),
          ct = T(Y, $, Q, j, -nt[0], nt[3]),
          dt = T(Y, $, Q, j, nt[0], nt[3]);
        $o(
          i,
          rt,
          lt,
          dt,
          ct,
          [H, -K[0]],
          [H, K[0]],
          [V, nt[0]],
          [V, -nt[0]],
          cl,
          [0, -1, 0],
        );
        let ut = Math.max(2, Math.round((K[1] * 2) / 1.8) + 1);
        for (let ot = 0; ot < ut; ot++) {
          let at = -1 + (2 * ot) / (ut - 1),
            yt = K[1] * at,
            vt = nt[1] * at;
          for (let [Pt, jt] of [
            [-0.2, -1],
            [0.2, 1],
          ]) {
            let Wt = T(O, D, G, q, yt + Pt, K[3]),
              Ct = T(Y, $, Q, j, vt + Pt, nt[3]),
              qt = T(Y, $, Q, j, vt + Pt, nt[4]),
              Zt = T(O, D, G, q, yt + Pt, K[4]);
            $o(i, Zt, qt, Ct, Wt, [H, 0], [V, 0], [V, 1.2], [H, 1.2], cl, [
              G * jt,
              0,
              q * jt,
            ]);
          }
          $o(
            i,
            T(O, D, G, q, yt - 0.2, K[4]),
            T(O, D, G, q, yt + 0.2, K[4]),
            T(Y, $, Q, j, vt + 0.2, nt[4]),
            T(Y, $, Q, j, vt - 0.2, nt[4]),
            [H, 0],
            [H, 0.4],
            [V, 0.4],
            [V, 0],
            cl,
            [0, -1, 0],
          );
        }
        continue;
      }
      for (let rt of [-1, 1]) {
        let lt = T(O, D, G, q, K[0] * rt, K[3]),
          ct = T(Y, $, Q, j, nt[0] * rt, nt[3]),
          dt = T(O, D, G, q, K[1] * rt, K[3]),
          ut = T(Y, $, Q, j, nt[1] * rt, nt[3]),
          ot = T(O, D, G, q, K[2] * rt, K[4]),
          at = T(Y, $, Q, j, nt[2] * rt, nt[4]);
        $o(
          i,
          lt,
          ct,
          ut,
          dt,
          [H, K[0] * rt],
          [V, nt[0] * rt],
          [V, nt[1] * rt],
          [H, K[1] * rt],
          cl,
          [0, -1, 0],
        );
        let yt = Math.hypot(K[1] - K[2], K[3] - K[4]),
          vt = [
            (G * rt * (K[3] - K[4])) / yt,
            -(K[1] - K[2]) / yt,
            (q * rt * (K[3] - K[4])) / yt,
          ];
        $o(i, dt, ut, at, ot, [H, 0], [V, 0], [V, yt], [H, yt], cl, vt);
      }
      let Z = T(O, D, G, q, -K[2], K[4]),
        et = T(O, D, G, q, K[2], K[4]),
        tt = T(Y, $, Q, j, -nt[2], nt[4]),
        it = T(Y, $, Q, j, nt[2], nt[4]);
      $o(
        i,
        Z,
        et,
        it,
        tt,
        [H, -K[2]],
        [H, K[2]],
        [V, nt[2]],
        [V, -nt[2]],
        cl,
        [0, -1, 0],
      );
    }
  if (c)
    for (let B = 0; B + 1 < u.length; B++) {
      if (!w[B]) continue;
      let [, H, O, D, U, G, q] = u[B],
        [, W, V, Y, , , $] = u[B + 1];
      for (let st of [-1, 1]) {
        let Q = H + U * (q + 0.4) * st,
          j = O + G * (q + 0.4) * st,
          X = W + U * ($ + 0.4) * st,
          K = V + G * ($ + 0.4) * st,
          nt = X - Q,
          Z = K - j,
          et = Math.hypot(nt, Z);
        if (et < 0.2) continue;
        let tt = Math.min(n.terrainAt(Q, j), n.terrainAt(X, K));
        c.push({
          t: "obb",
          x: (Q + X) / 2 - U * 0.15 * st,
          z: (j + K) / 2 - G * 0.15 * st,
          hx: 0.3,
          hz: et / 2 + 0.05,
          c: Z / et,
          s: nt / et,
          y0: tt - 1,
          y1: Math.min(D, Y) - 0.4,
          wall: !0,
          fill: !0,
        });
      }
    }
  let E = {},
    A = y.sp,
    C = 8,
    P = n?.terrainAt && a?.bld ? fb(a) : null,
    I = (B, H) => {
      if (!P) return !1;
      let O = Math.round((B - P.x0) / P.cell),
        D = Math.round((H - P.z0) / P.cell);
      return O < 0 || D < 0 || O >= P.w || D >= P.h
        ? !1
        : P.H[D * P.w + O] > n.terrainAt(B, H) + 2.5;
    },
    L = (B) => {
      for (let H of [0, 6, -6, 12, -12]) {
        let O = B + H;
        if (O < t.s0 + 2 || O > t.s1 - 2) continue;
        Ot(t, O, E);
        let D = M(E.w, E.y, O),
          U = D[4];
        if (U - n.terrainAt(E.x, E.z) < 3) return null;
        for (let G of [0, -1.5, 1.5, -3, 3]) {
          let q = E.x + E.nx * G,
            W = E.z + E.nz * G,
            V = n.terrainAt(q, W),
            Y = y.hu * 1.25 + 0.6;
          if (U - V < 3 || I(q, W)) continue;
          let $ = !1;
          for (let X = 0; X <= 8 && !$; X++) {
            let K = (X * Math.PI) / 4,
              nt = X === 8 ? 0 : Y;
            z(q + Math.cos(K) * nt, W + Math.sin(K) * nt, V - 1.5, U - 1) &&
              ($ = !0);
          }
          if ($) continue;
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
              cols: [[q, W]],
              r: y.hu * 1.25,
              n: 1,
              cap: !1,
              gy: n.terrainAt(E.x, E.z),
            };
          let st = y.cap + 0.3,
            Q = U - st,
            j = Q - V > 3;
          for (let X = 0; X <= 1 && j; X += 0.25) {
            let K = E.x + E.nx * G * X,
              nt = E.z + E.nz * G * X;
            z(K, nt, Q - 4.4, Q + 0.2) && (j = !1);
          }
          if (j)
            return {
              x: E.x,
              z: E.z,
              y: E.y,
              dx: E.dx,
              dz: E.dz,
              nx: E.nx,
              nz: E.nz,
              P: D,
              cols: [[q, W]],
              r: y.hu * 1.25,
              n: 1,
              cap: !0,
              wide: !0,
              drop: st,
              mid: G / 2,
              half: Math.abs(G) / 2 + D[2] * 0.5 + y.hu * 1.25 + 0.3,
              gy: n.terrainAt(E.x, E.z),
            };
        }
        {
          let G = y.hu * 1.25,
            q = {};
          for (let W of n.probe(E.x, E.z).all) {
            let V = W.E;
            if (
              !V ||
              W.J ||
              V === t ||
              V.oneway ||
              V.hwy ||
              V.layered ||
              V.inner ||
              W.y > U - 3 ||
              V.W[0] < 5.5
            )
              continue;
            vs(V, E.x, E.z, q);
            let Y = Math.min(q.k, V.n - 2),
              $ = V.D[Y * 2],
              st = V.D[Y * 2 + 1];
            if (
              Math.abs($ * E.dx + st * E.dz) < 0.85 ||
              q.s < V.s0 + 6 ||
              q.s > V.s1 - 6
            )
              continue;
            let Q = E.x + q.v * st,
              j = E.z - q.v * $,
              X = (Q - E.x) * E.nx + (j - E.z) * E.nz,
              K = E.x + E.nx * X,
              nt = E.z + E.nz * X,
              Z = n.terrainAt(K, nt);
            {
              let rt = {};
              if ((vs(V, K, nt, rt), Math.abs(rt.v) > 0.3)) continue;
            }
            if (Math.abs(X) > D[0] + 3 || U - Z < 3 || I(K, nt)) continue;
            let et = !1;
            for (let rt = 0; rt < 8 && !et; rt++) {
              let lt = (rt * Math.PI) / 4;
              for (let ct of n.probe(
                K + Math.cos(lt) * (G + 0.6),
                nt + Math.sin(lt) * (G + 0.6),
              ).all)
                if (ct.E !== V && ct.y > Z - 1.5 && ct.y < U - 1) {
                  et = !0;
                  break;
                }
            }
            if (et) continue;
            V.colMed = Math.max(V.colMed || 0, G + 0.35);
            let tt = Math.abs(X) > D[2] * 0.85,
              it = y.cap + 0.3;
            return tt
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
                  drop: it,
                  mid: X / 2,
                  half: Math.abs(X) / 2 + G + 0.3,
                  gy: n.terrainAt(E.x, E.z),
                  med: V,
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
                  med: V,
                };
          }
        }
        if (!(U - n.terrainAt(E.x, E.z) < 4.4))
          for (let G of [y.cap + 0.6, 0.35]) {
            let q = U - G,
              W = Math.max(y.hu, y.hv) * 1.25,
              V = (X) => {
                for (let K = D[0] + W + 0.4; K <= D[0] + 22; K += 0.75) {
                  let nt = E.x + E.nx * K * X,
                    Z = E.z + E.nz * K * X,
                    et = n.terrainAt(nt, Z),
                    tt = q - et < 3 || I(nt, Z);
                  for (let it = 0; it <= 8 && !tt; it++) {
                    let rt = (it * Math.PI) / 4,
                      lt = it === 8 ? 0 : W + 0.6;
                    z(
                      nt + Math.cos(rt) * lt,
                      Z + Math.sin(rt) * lt,
                      et - 1.5,
                      U - 1,
                    ) && (tt = !0);
                  }
                  if (!tt) return K;
                }
                return null;
              },
              Y = V(-1),
              $ = V(1),
              st = 0;
            if (Y === null && $ === null) continue;
            if (Y === null) {
              if ($ > D[0] + W + 10) continue;
              ((Y = Math.max(0, D[2] - W)), (st = 1));
            } else if ($ === null) {
              if (Y > D[0] + W + 10) continue;
              (($ = Math.max(0, D[2] - W)), (st = -1));
            }
            let Q = !0;
            for (let X = -Y; X <= $ && Q; X += 1.5) {
              let K = E.x + E.nx * X,
                nt = E.z + E.nz * X;
              z(K, nt, q - (G > 1 ? 4.4 : 3.5), q + 0.2) && (Q = !1);
            }
            if (!Q) continue;
            let j = [
              [E.x - E.nx * Y, E.z - E.nz * Y],
              [E.x + E.nx * $, E.z + E.nz * $],
            ].filter((X, K) => !st || (K === 0) == st < 0);
            return {
              x: E.x,
              z: E.z,
              y: E.y,
              dx: E.dx,
              dz: E.dz,
              nx: E.nx,
              nz: E.nz,
              P: D,
              cols: j,
              r: W,
              n: j.length,
              cap: !0,
              wide: !0,
              drop: G,
              mid: ($ - Y) / 2,
              half: (Y + $) / 2 + W + 0.3,
              gy: n.terrainAt(E.x, E.z),
            };
          }
      }
      return null;
    },
    F = [],
    N = (B, H) => {
      let O = null;
      for (let j of H) {
        let X = B + j;
        if (X < t.s0 + 2 || X > t.s1 - 2) continue;
        Ot(t, X, E);
        let K = n.terrainAt(E.x, E.z),
          nt = M(E.w, E.y, X),
          Z = nt[4];
        if (Z - K < 1.6) break;
        let et = nt[2] < 2.2 ? 1 : nt[2] < 6 ? 2 : 3,
          tt = Math.max(y.hu, y.hv) * (et === 1 ? 1.1 : 1),
          rt = (
            et === 1
              ? [0]
              : et === 2
                ? [-0.62 * nt[2], 0.62 * nt[2]]
                : [-0.72 * nt[2], 0, 0.72 * nt[2]]
          ).map((dt) => [E.x + E.nx * dt, E.z + E.nz * dt]),
          lt = !1;
        for (let [dt, ut] of rt) {
          let ot = n.terrainAt(dt, ut);
          for (let at = 0; at <= 8 && !lt; at++) {
            let yt = (at * Math.PI) / 4,
              vt = at === 8 ? 0 : tt + 0.6;
            z(
              dt + Math.cos(yt) * vt,
              ut + Math.sin(yt) * vt,
              ot - 1.5,
              Z - 0.3,
            ) && (lt = !0);
          }
        }
        if (lt) continue;
        let ct = et > 1 && Z - K > 7;
        for (let dt = -2; dt <= 2 && ct; dt++) {
          let ut = ((nt[2] + 0.3) * dt) / 2,
            ot = E.x + E.nx * ut,
            at = E.z + E.nz * ut;
          z(ot, at, Z - y.cap - 4.4, Z - 0.5) && (ct = !1);
        }
        O = {
          x: E.x,
          z: E.z,
          y: E.y,
          dx: E.dx,
          dz: E.dz,
          nx: E.nx,
          nz: E.nz,
          P: nt,
          cols: rt,
          r: tt,
          n: et,
          cap: ct,
          gy: K,
        };
        break;
      }
      if ((!O && n?.terrainAt && (O = L(B)), !O)) return !1;
      let { P: D, cols: U, n: G } = O,
        q = D[4],
        W = y.girders && !O.cap && !O.wide,
        V = O.cap || W,
        Y = V ? q - (O.wide ? O.drop : W ? 0.6 : y.cap) : q,
        $ = O.wide ? 1.25 : G === 1 ? 1.1 : 1,
        st = (j, X) => {
          if (V || y.girders) return Y;
          let K = Math.abs((j - O.x) * O.nx + (X - O.z) * O.nz);
          return K <= D[2]
            ? D[4]
            : K <= D[1]
              ? D[4] +
                ((D[3] - D[4]) * (K - D[2])) / Math.max(0.01, D[1] - D[2])
              : D[3];
        };
      if (i) {
        O.wide
          ? iP(
              i,
              O.x + O.nx * O.mid,
              O.z + O.nz * O.mid,
              O.dx,
              O.dz,
              y.hu * $ + 0.2,
              O.half,
              Y,
              q + 0.05,
              y.col,
            )
          : V &&
            iP(
              i,
              O.x,
              O.z,
              O.dx,
              O.dz,
              y.hu + 0.25,
              (y.girders ? D[0] - 0.3 : D[2]) + 0.35,
              Y,
              q + 0.05,
              y.col,
            );
        for (let [j, X] of U) {
          let K = n.terrainAt(j, X) - 0.5,
            nt = y.hu * $,
            Z = y.hv * $,
            et = y.ch * $,
            tt = st(j, X),
            it = K;
          (y.band &&
            tt - K > 5 &&
            (Eb(i, j, X, O.dx, O.dz, nt, Z, et, it, K + 2.9, y.band, 0),
            (it = K + 2.9)),
            G === 1 && tt - it > 4
              ? (Eb(
                  i,
                  j,
                  X,
                  O.dx,
                  O.dz,
                  nt,
                  Z,
                  et,
                  it,
                  tt - 1.8,
                  y.col,
                  it - K,
                ),
                Eb(
                  i,
                  j,
                  X,
                  O.dx,
                  O.dz,
                  nt,
                  Z,
                  et,
                  tt - 1.8,
                  tt + 0.05,
                  y.col,
                  tt - 1.8 - K,
                  1.6,
                ))
              : Eb(
                  i,
                  j,
                  X,
                  O.dx,
                  O.dz,
                  nt,
                  Z,
                  et,
                  it,
                  tt + 0.05,
                  y.col,
                  it - K,
                ));
        }
      }
      let Q = O.wide
        ? [
            O.x + O.nx * (O.mid - O.half),
            O.z + O.nz * (O.mid - O.half),
            O.x + O.nx * (O.mid + O.half),
            O.z + O.nz * (O.mid + O.half),
            Y,
          ]
        : V
          ? [
              O.x - O.nx * (D[2] + 0.35),
              O.z - O.nz * (D[2] + 0.35),
              O.x + O.nx * (D[2] + 0.35),
              O.z + O.nz * (D[2] + 0.35),
              Y,
            ]
          : [
              U[0][0] - O.nx * (G === 1 ? 1.6 * y.hv : 0),
              U[0][1] - O.nz * (G === 1 ? 1.6 * y.hv : 0),
              U[U.length - 1][0] + O.nx * (G === 1 ? 1.6 * y.hv : 0),
              U[U.length - 1][1] + O.nz * (G === 1 ? 1.6 * y.hv : 0),
              Y,
            ];
      if (c)
        for (let [j, X] of U)
          c.push({
            t: "obb",
            x: j,
            z: X,
            hx: y.hv * $ + 0.05,
            hz: y.hu * $ + 0.05,
            c: O.dz,
            s: O.dx,
            y0: Math.min(O.gy, n.terrainAt(j, X)) - 1,
            y1: st(j, X),
            pier: !0,
            sup: Q,
            src: t.id,
          });
      return (F.push(vs(t, O.x, O.z, {}).s), !0);
    };
  if (!t.custom) {
    for (let B = Math.ceil((e - C) / A); C + B * A < s; B++) {
      let H = C + B * A,
        O = !1;
      (t.L - t.s1 > 12 &&
        H > t.s1 - 4 &&
        H < t.s1 - 4 + A * 0.5 &&
        H - A < t.s1 - 4 - A * 0.5 &&
        ((H = t.s1 - 4), (O = !0)),
        !(H < t.s0 + 4 || H > t.s1 - 4) && N(H, [0, 4, -4, 8, -8, 12, -12]));
    }
    F.sort((B, H) => B - H);
    for (let B = 0; B + 1 < F.length; B++) {
      let H = F[B],
        O = F[B + 1];
      if (O - H <= 45) continue;
      let D = (H + O) / 2;
      for (
        let U = 0;
        U <= (O - H) / 2 - 10 && !(N(D + U, [0]) || (U && N(D - U, [0])));
        U += 2
      );
    }
  }
  if (y.fence && !I0(t) && n?.probe && t.P[0] > -3e3) {
    let H = [[], []];
    for (let U = Math.ceil(e / 3); U * 3 < s; U++) {
      let G = U * 3;
      if (G < t.s0 + 6 || G + 3 > t.s1 - 6) continue;
      Ot(t, G, E);
      let q = M(E.w, E.y, G);
      for (let [W, V] of [
        [0, -1],
        [1, 1],
      ]) {
        let Y = (q[0] - 0.3) * V,
          $ = E.x + E.nx * Y,
          st = E.z + E.nz * Y,
          Q = n.terrainAt($, st),
          j = q[4] - Q > 3.2 && E.y - Q < 30;
        for (let X = 0; X <= 2 && j; X++) {
          let K = (X * 3) / 2,
            nt = $ + E.dx * K,
            Z = st + E.dz * K;
          for (let et of X === 1 ? [0] : [0, 1.5, -1.5]) {
            let tt = n.probe(nt + et * E.nx, Z + et * E.nz);
            if (tt.walk && Math.abs(tt.walk.y - Q) < 3) {
              j = !1;
              break;
            }
            if (tt.all.some((it) => it.E !== t && it.y < E.y - 2)) {
              j = !1;
              break;
            }
          }
        }
        j && H[W].push([G, $, st, Q, E.dx, E.dz]);
      }
    }
    let O = [0.09, 0.1, 0.09, 0.82],
      D = [0.5, 0.51, 0.5, 0.82];
    for (let U of H)
      for (let [G, q, W, V, Y, $] of U) {
        let st = q + Y * 3,
          Q = W + $ * 3,
          j = n.terrainAt(st, Q);
        if (i) {
          (F0(i, [q, V - 0.2, W], [q, V + 2.45, W], 0.04, D),
            F0(i, [q, V + 2.4, W], [st, j + 2.4, Q], 0.025, D));
          for (let X of [-1, 1])
            $o(
              i,
              [q, V - 0.1, W],
              [st, j - 0.1, Q],
              [st, j + 1.8, Q],
              [q, V + 1.8, W],
              [G, 0],
              [G + 3, 0],
              [G + 3, 1.9],
              [G, 1.9],
              O,
              [-$ * X, 0, Y * X],
            );
        }
        c &&
          c.push({
            t: "obb",
            x: (q + st) / 2,
            z: (W + Q) / 2,
            hx: 0.08,
            hz: 3 / 2 + 0.05,
            c: $,
            s: Y,
            y0: Math.min(V, j) - 0.5,
            y1: Math.max(V, j) + 2.4,
            wall: !0,
            fence: !0,
          });
      }
  }
}
