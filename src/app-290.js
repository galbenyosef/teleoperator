// app 290 — math
// Lines 141383-142919 of readable/app.pretty.js (statement-aligned).
function IQ(o, { D: t, L: e, tex: s = null } = {}) {
  let n = new le();
  n.name = "Bridges";
  let i = t?.highways;
  if (!i || !i.gg || !i.bb)
    return (
      console.warn("bridges: no highway data"),
      { group: n, inst: [], colliders: [], night: [], update() {} }
    );
  let a = (G, W, V = 0) =>
      new me({ color: G, roughness: W, metalness: V, vertexColors: !0 }),
    r = {
      orange: a(16777215, 0.55, 0.15),
      steel: a(16777215, 0.45, 0.55),
      concrete: a(16777215, 0.9),
      lamp: a(16777215, 0.4),
    };
  ((r.lamp.userData.mbAlbedo = pf),
    (r.lamp.userData.dayGlow = 0.35),
    (r.orange.userData.mbAlbedo = TY),
    (r.steel.metalness = 0.12),
    (r.steel.roughness = 0.55),
    (r.steel.userData.mbAlbedo = Aq),
    (r.concrete.userData.mbAlbedo = Pq));
  let l = [r.lamp],
    c = [],
    h = [],
    f = new Map(),
    u = new Map(),
    d = (G, W = "main") => {
      let V = G + "|" + W,
        $ = f.get(V);
      return ($ || f.set(V, ($ = new Be())), $);
    },
    p = new Map(),
    m = (G, W, V) => {
      let $ =
        W === void 0
          ? G + "|main"
          : `${G}|d:${Math.floor(W / 500)},${Math.floor(V / 500)}`;
      W !== void 0 &&
        u.set($.split("|d:")[1], [
          Math.floor(W / 500) * 500 + 250,
          Math.floor(V / 500) * 500 + 250,
        ]);
      let J = p.get($);
      return (J || (p.set($, (J = new Be())), (J.sky = g)), J);
    },
    g = (G, W, V, $, J) => (J < -0.5 ? 0.14 : J > 0.5 ? 0.62 : 0.42),
    b = new Map(),
    v = (G, W, V) => {
      let $ =
        W === void 0
          ? G + "|main"
          : `${G}|d:${Math.floor(W / 500)},${Math.floor(V / 500)}`;
      W !== void 0 &&
        u.set($.split("|d:")[1], [
          Math.floor(W / 500) * 500 + 250,
          Math.floor(V / 500) * 500 + 250,
        ]);
      let J = b.get($);
      return (J || (b.set($, (J = new Be())), (J.sky = g)), J);
    },
    x = (G, W, V) => {
      let $ = `${Math.floor(W / 500)},${Math.floor(V / 500)}`;
      return (
        u.set($, [
          Math.floor(W / 500) * 500 + 250,
          Math.floor(V / 500) * 500 + 250,
        ]),
        d(G, "d:" + $)
      );
    },
    y = (G, W) => (e.inWorld(G, W) ? e.terrainAt(G, W) : -9),
    M = (G, W, V, $, J, X) => {
      let tt = Math.max(1, Math.ceil(J)),
        Z = Math.max(1, Math.ceil(X)),
        q = -$,
        j = V;
      for (let K = -tt; K <= tt; K++)
        for (let nt = -Z; nt <= Z; nt++) {
          let Q = (J * K) / tt,
            et = (X * nt) / Z,
            st = G + V * Q + q * et,
            ot = W + $ * Q + j * et;
          if (e.inWorld(st, ot) && Pp(t, st, ot)) return !0;
        }
      return !1;
    },
    S = (G, W, V, $, J, X, tt, Z, q, j) => {
      (Gn(G, W, V, $, J, X, tt, Z, q, j),
        h.push({
          t: "obb",
          x: W,
          z: V,
          hx: tt,
          hz: X,
          c: J,
          s: $,
          y0: Z,
          y1: q,
          footing: !0,
        }));
    },
    w = (G, W, V, $, J, X, tt, Z, q, j, K) => {
      Gn(G, W, V, $, J, X, tt, Z, q, j);
      for (let et = Z + 3.2; et < q - 0.5; et += 3.2)
        Gn(G, W, V, $, J, X + 0.06, tt + 0.06, et - 0.12, et + 0.12, K, !1);
      let nt = -J,
        Q = $;
      for (let [et, st, ot, rt, lt, ht] of [
        [X, tt, $, J, nt, Q],
        [tt, X, nt, Q, $, J],
      ])
        for (let pt = -et + 6; pt < et - 1; pt += 6)
          for (let ut of [-1, 1])
            Gn(
              G,
              W + ot * pt + lt * (st + 0.03) * ut,
              V + rt * pt + ht * (st + 0.03) * ut,
              ot,
              rt,
              0.15,
              0.06,
              Z,
              q,
              K,
              !1,
            );
    },
    _ = (G, W) => {
      let V = Ot(G, Math.max(0, Math.min(G.L, W)), {});
      return {
        x: V.x,
        z: V.z,
        y: V.y,
        ux: V.dx,
        uz: V.dz,
        w: V.w,
        nx: V.nx,
        nz: V.nz,
      };
    };
  function z(
    G,
    W,
    V,
    {
      barrierCol: $ = Oo,
      pierEvery: J = 36,
      pierCol: X = Oo,
      orange: tt = !1,
    } = {},
  ) {
    let q = d(tt ? "orange" : "concrete"),
      j = null;
    for (let K = W; K <= V + 0.01; K += 8) {
      let nt = _(G, Math.min(K, V));
      if (j) {
        hd(d("concrete"), j, nt, nt.w + 0.5, 0.25, 1.6, Oo, m2);
        for (let Q of [-1, 1]) {
          if (
            G.shared &&
            Q === G.shared.side &&
            G.shared.at[
              Math.min(
                G.shared.at.length - 1,
                Math.max(0, Math.round(K - 8 / 2)),
              )
            ]
          )
            continue;
          let et = [
              j.x + j.nx * (j.w + 0.25) * Q,
              j.y,
              j.z + j.nz * (j.w + 0.25) * Q,
            ],
            st = [
              nt.x + nt.nx * (nt.w + 0.25) * Q,
              nt.y,
              nt.z + nt.nz * (nt.w + 0.25) * Q,
            ];
          Xi(
            q,
            [et[0], et[1] + 0.42, et[2]],
            [st[0], st[1] + 0.42, st[2]],
            0.45,
            0.85,
            $,
          );
        }
      }
      j = nt;
    }
    for (let K = W + J / 2; K < V; K += J) {
      let nt = K,
        Q = null,
        et = 0;
      for (let st of [0, 3, -3, 6, -6, 9, -9, 12, -12]) {
        let ot = _(G, Math.min(V, Math.max(W, K + st)));
        if (!M(ot.x, ot.z, ot.ux, ot.uz, 1.1, ot.w * 0.55)) {
          ((Q = ot), (nt = K + st));
          break;
        }
      }
      Q &&
        ((et = y(Q.x, Q.z)),
        !(Q.y - 1.6 - et < 2.5) &&
          (S(
            d("concrete"),
            Q.x,
            Q.z,
            Q.ux,
            Q.uz,
            0.9,
            Q.w * 0.55,
            Math.max(et, -12) - 1,
            Q.y - 2.4,
            X,
          ),
          Gn(
            d("concrete"),
            Q.x,
            Q.z,
            Q.ux,
            Q.uz,
            1.1,
            Q.w + 0.3,
            Q.y - 2.6,
            Q.y - 1.5,
            X,
          )));
    }
  }
  let A = i.gg.axis,
    T = i.gg.nb,
    E = i.gg.sb,
    R = (G) => {
      let [W, V] = A.at(G);
      return { x: W, z: V, y: A.deck(G), ux: A.dx, uz: A.dz };
    },
    P = A.half + A.lw,
    C = -466,
    I = 1722;
  {
    let G = A.leg,
      W = A.top,
      V = A.towerS,
      $ = A.towerN,
      J = A.anchS,
      X = A.anchN,
      tt = (Q) => {
        if (Q <= V) {
          let ot = (Q - J) / (V - J),
            rt = A.deck(J) + 4;
          return rt + (W - rt) * ot - 72 * ot * (1 - ot);
        }
        if (Q >= $) {
          let ot = (Q - $) / (X - $),
            rt = A.deck(X) + 4;
          return W + (rt - W) * ot - 72 * ot * (1 - ot);
        }
        let et = A.deck((V + $) / 2) + 3,
          st = ((Q - V) / ($ - V)) * 2 - 1;
        return et + (W - et) * st * st;
      },
      Z = d("orange");
    for (let Q of [V, $]) {
      let et = R(Q),
        st = -et.uz,
        ot = et.ux;
      Gn(d("concrete"), et.x, et.z, et.ux, et.uz, 32, 34, -12, 9, Oo);
      for (let rt of [-1, 1])
        for (let [lt, ht, pt, ut] of [
          [-2, 72, 6, 5.2],
          [72, 125, 5.4, 4.7],
          [125, 172, 4.9, 4.2],
          [172, W, 4.3, 3.7],
        ]) {
          let it = et.x + st * G * rt,
            at = et.z + ot * G * rt;
          Gn(Z, it, at, et.ux, et.uz, pt, ut, lt + 9, Math.min(W, ht + 9), Xp);
          for (let yt of [-0.5, 0.5])
            Gn(
              Z,
              it + et.ux * pt * yt * 1.6,
              at + et.uz * pt * yt * 1.6,
              et.ux,
              et.uz,
              0.35,
              ut + 0.25,
              lt + 12,
              Math.min(W, ht + 6),
              fd,
            );
        }
      for (let [rt, lt] of [
        [W - 7, 7],
        [186, 9],
        [142, 8],
        [102, 8],
        [et.y - 12, 5],
      ])
        Gn(
          Z,
          et.x,
          et.z,
          et.ux,
          et.uz,
          3.2,
          G - 3.5,
          rt - lt / 2,
          rt + lt / 2,
          Xp,
        );
      for (let rt of [-1, 1])
        Gn(
          Z,
          et.x + st * G * rt,
          et.z + ot * G * rt,
          et.ux,
          et.uz,
          3.5,
          2.5,
          W,
          W + 3,
          fd,
        );
    }
    {
      let Q = R(X),
        et = -Q.uz,
        st = Q.ux,
        ot = -10,
        rt = P + 4.2,
        lt = (27 - rt) / 2;
      for (let ht of [-1, 1])
        Gn(
          d("concrete"),
          Q.x + et * (rt + lt) * ht,
          Q.z + st * (rt + lt) * ht,
          Q.ux,
          Q.uz,
          22,
          lt,
          ot,
          Q.y + 7,
          Oo,
        );
      Gn(d("concrete"), Q.x, Q.z, Q.ux, Q.uz, 22, rt, ot, Q.y - 9, yc);
    }
    for (let [Q, et] of [
      [J, !0],
      [-486, !1],
    ]) {
      let st = R(Q),
        ot = -st.uz,
        rt = st.ux,
        lt =
          Math.min(
            y(st.x + ot * 16, st.z + rt * 16),
            y(st.x - ot * 16, st.z - rt * 16),
          ) - 2,
        ht = st.y + (et ? 16 : 11);
      for (let pt of [-1, 1]) {
        let ut = st.x + ot * 16.5 * pt,
          it = st.z + rt * 16.5 * pt;
        (Gn(d("concrete"), ut, it, st.ux, st.uz, 6.5, 3.2, lt, st.y - 9, Oo),
          Gn(
            d("concrete"),
            ut,
            it,
            st.ux,
            st.uz,
            5.6,
            2.8,
            st.y - 9,
            ht - 3,
            Oo,
          ),
          Gn(d("concrete"), ut, it, st.ux, st.uz, 4.6, 2.3, ht - 3, ht, yc));
        for (let at of [-0.6, 0, 0.6])
          Gn(
            d("concrete"),
            ut + st.ux * 5.6 * at,
            it + st.uz * 5.6 * at,
            st.ux,
            st.uz,
            0.3,
            3.05,
            lt + 4,
            ht - 4,
            yc,
          );
      }
      et &&
        Gn(
          d("concrete"),
          st.x,
          st.z,
          st.ux,
          st.uz,
          12,
          14.5,
          lt + 20,
          st.y - 1.5,
          yc,
        );
    }
    for (let Q of [-1, 1]) {
      let et = [];
      for (let st = J; st <= X + 0.1; st += 4) {
        let ot = R(st);
        et.push([ot.x - ot.uz * G * Q, tt(st), ot.z + ot.ux * G * Q]);
      }
      Ox(Z, et, 0.46, 14, Wyt);
      for (let st = J + 15.2; st < X - 5; st += 15.2) {
        if (Math.abs(st - V) < 9 || Math.abs(st - $) < 9) continue;
        let ot = R(st),
          rt = tt(st);
        if (rt - ot.y < 1.5) continue;
        let lt = x("orange", ot.x, ot.z),
          ht = ot.x - ot.uz * G * Q,
          pt = ot.z + ot.ux * G * Q,
          ut = (tt(st + 1) - tt(st - 1)) / 2,
          it = Math.hypot(1, ut),
          at = [ot.ux / it, ut / it, ot.uz / it];
        OY(lt, [ht, rt, pt], at, 0.56, 1.3, Xp);
        for (let yt of [-1, 1]) {
          let vt = -ot.uz * 0.56 * yt,
            At = ot.ux * 0.56 * yt;
          Xi(
            lt,
            [ht + vt - at[0] * 0.62, rt - at[1] * 0.62, pt + At - at[2] * 0.62],
            [ht + vt + at[0] * 0.62, rt + at[1] * 0.62, pt + At + at[2] * 0.62],
            0.12,
            0.16,
            fd,
          );
        }
        for (let yt of [-0.35, 0.35]) {
          let vt = [ht + ot.ux * yt, rt - 0.5, pt + ot.uz * yt],
            At = [
              ot.x - ot.uz * (G - 0.2) * Q + ot.ux * yt,
              ot.y + 0.9,
              ot.z + ot.ux * (G - 0.2) * Q + ot.uz * yt,
            ];
          (Xi(lt, At, vt, 0.068, 0.068, PQ),
            Xi(
              lt,
              [At[0], ot.y + 0.2, At[2]],
              [At[0], ot.y + 1, At[2]],
              0.2,
              0.2,
              fd,
            ));
        }
      }
    }
    for (let Q of [-1, 1]) {
      let et = null,
        st = null;
      for (let ot = C, rt = 0; ot <= I + 0.01; ot += 7.6, rt++) {
        let lt = R(ot),
          ht = 14.5 * Q,
          pt = [lt.x - lt.uz * ht, lt.y - 1.4, lt.z + lt.ux * ht],
          ut = [lt.x - lt.uz * ht, lt.y - 8.6, lt.z + lt.ux * ht],
          it = x("orange", lt.x, lt.z);
        (et &&
          (Xi(Z, et, pt, 0.6, 0.9, Xp),
          Xi(Z, st, ut, 0.6, 0.9, Xp),
          Xi(it, rt % 2 ? et : st, rt % 2 ? ut : pt, 0.35, 0.35, fd)),
          Xi(it, pt, ut, 0.4, 0.4, fd),
          (et = pt),
          (st = ut));
      }
    }
    let q = P + 0.42,
      j = 13.75;
    for (let Q = C; Q < I - 0.01; Q += 20) {
      let et = R(Q),
        st = R(Math.min(I, Q + 20)),
        ot = R(Q + 10);
      (Gn(Z, ot.x, ot.z, ot.ux, ot.uz, 10, 14.5, ot.y - 8.9, ot.y - 8.4, fd),
        hd(d("concrete"), et, st, P + 0.3, 0.25, 1.4, Xyt, fd, !1));
      for (let rt of [-1, 1]) {
        let lt = (ut, it, at) => [
            ut.x - ut.uz * it * rt,
            ut.y + at,
            ut.z + ut.ux * it * rt,
          ],
          ht = (ut) => {
            let it = lt(ut, (q + j) / 2, 0);
            return { ...ut, x: it[0], z: it[2] };
          };
        (hd(d("concrete"), ht(et), ht(st), (j - q) / 2, -0.2, 1.4, Oo, fd),
          Xi(
            d("concrete"),
            lt(et, P + 0.22, 0.31),
            lt(st, P + 0.22, 0.31),
            0.36,
            0.62,
            qyt,
          ));
        let pt = x("orange", ot.x, ot.z);
        Xi(pt, lt(et, P + 0.22, 1.02), lt(st, P + 0.22, 1.02), 0.1, 0.1, zM);
        for (let ut = 0; ut < 20; ut += 2.5) {
          let it = R(Q + ut);
          Xi(pt, lt(it, P + 0.22, 0.62), lt(it, P + 0.22, 1), 0.07, 0.07, PQ);
        }
        Xi(
          d("concrete"),
          lt(et, 13.6, 0.38),
          lt(st, 13.6, 0.38),
          0.45,
          0.36,
          Oo,
        );
        for (let ut of [0.82, 1.18])
          Xi(pt, lt(et, 13.6, ut), lt(st, 13.6, ut), 0.07, 0.07, zM);
        Xi(Z, lt(et, 13.6, 1.4), lt(st, 13.6, 1.4), 0.2, 0.09, zM);
        for (let ut = 0; ut < 20; ut += 2.4) {
          let it = R(Q + ut);
          Xi(pt, lt(it, 13.6, 0.55), lt(it, 13.6, 1.4), 0.08, 0.08, zM);
        }
        for (let ut = 0.24; ut < 20; ut += 0.24) {
          if (Math.abs(ut / 2.4 - Math.round(ut / 2.4)) < 0.05) continue;
          let it = R(Q + ut);
          Xi(pt, lt(it, 13.6, 0.56), lt(it, 13.6, 1.36), 0.05, 0.022, zM);
        }
        Xi(Z, lt(et, 14.2, -0.6), lt(st, 14.2, -0.6), 0.3, 1.3, Xp);
      }
    }
    for (let Q of i.gg.median || [])
      Vyt(d("concrete"), (et, st) => x("concrete", et, st), Q, h);
    for (let Q = X + 30; Q < I; Q += 40) {
      let et = R(Q);
      for (let st of [-1, 1])
        Gn(
          d("orange"),
          et.x - et.uz * 9 * st,
          et.z + et.ux * 9 * st,
          et.ux,
          et.uz,
          1.6,
          1.6,
          -12,
          et.y - 8.6,
          Xp,
        );
      Gn(Z, et.x, et.z, et.ux, et.uz, 1.4, 12, et.y - 10, et.y - 8.4, Xp);
    }
    let K = (Q, et) => {
        let st = _(Q, et);
        return A.s(st.x, st.z);
      },
      nt = (Q, et) => {
        let st = null,
          ot = null;
        for (let rt = 0; rt <= Q.L; rt += 4)
          et(K(Q, rt)) && (st === null && (st = rt), (ot = rt));
        return st === null ? null : [st, ot];
      };
    for (let Q of [T, E]) {
      let et = nt(Q, (ot) => ot < C + 4),
        st = nt(Q, (ot) => ot > I - 4);
      (et && z(Q, Math.max(Q.s0, et[0]), et[1] + 4),
        st && z(Q, st[0] - 4, Math.min(Q.s1, st[1])));
    }
    for (let Q of [V, $]) {
      let et = R(Q);
      for (let st of [-1, 1])
        Gn(
          d("lamp"),
          et.x - et.uz * G * st,
          et.z + et.ux * G * st,
          et.ux,
          et.uz,
          0.5,
          0.5,
          W + 3,
          W + 4,
          [1, 0.04, 0.02, 0],
        );
    }
    i.gg.cableY = tt;
  }
  {
    let { C: G, R: W, YP: V } = i.gg;
    if (G)
      for (let { q0: $, q1: J, p0: X, p1: tt, open: Z } of yC(i))
        (d("concrete").wall(
          J[0],
          J[1],
          $[0],
          $[1],
          V - 9,
          V - 9,
          V - 0.02,
          V - 0.02,
          yc,
        ),
          Z ||
            Xi(
              d("concrete"),
              [X[0], V + 0.42, X[1]],
              [tt[0], V + 0.42, tt[1]],
              0.5,
              0.85,
              Oo,
            ));
    if (G)
      for (let $ of [0.6, 2.2, 3.9, 5.3])
        c.push({
          kind: "lamp",
          x: G[0] + Math.cos($) * (W + 1.2),
          y: V,
          z: G[1] + Math.sin($) * (W + 1.2),
          rot: Math.atan2(-Math.cos($), -Math.sin($)),
        });
  }
  let L = i.bb.axis,
    F = i.bb.eb,
    O = i.bb.wb,
    B = (G) => {
      let [W, V] = L.at(G);
      return { x: W, z: V, y: L.upper(G), ux: L.dx, uz: L.dz };
    },
    H = (G) => {
      let [W, V] = L.at(G);
      return { x: W, z: V, y: L.lower(G), ux: L.dx, uz: L.dz };
    };
  {
    let G = L.leg,
      W = L.top,
      V = L.upper(L.center) + 38,
      $ = d("steel"),
      J = [
        [L.anch, L.towers[0], L.towers[1], L.center],
        [L.center, L.towers[2], L.towers[3], L.anchE],
      ],
      X = (q) => {
        for (let [j, K, nt, Q] of J) {
          if (q < j - 1e-6 || q > Q + 1e-6) continue;
          let et = j === L.center ? V : L.upper(j) + 3,
            st = Q === L.center ? V : L.upper(Q) + 3,
            ot = L.upper((K + nt) / 2) + 3;
          if (q <= K) {
            let lt = (q - j) / (K - j);
            return et + (W - et) * lt - 48 * lt * (1 - lt);
          }
          if (q >= nt) {
            let lt = (q - nt) / (Q - nt);
            return W + (st - W) * lt - 48 * lt * (1 - lt);
          }
          let rt = ((q - K) / (nt - K)) * 2 - 1;
          return ot + (W - ot) * rt * rt;
        }
        return L.upper(q);
      };
    i.bb.cableY = X;
    for (let q of L.towers) {
      let j = B(q),
        K = -j.uz,
        nt = j.ux,
        Q = y(j.x, j.z);
      Gn(
        d("concrete"),
        j.x,
        j.z,
        j.ux,
        j.uz,
        18,
        28,
        Math.min(Q, 0) - 14,
        12,
        Oo,
      );
      for (let st of [-1, 1])
        Gn(
          $,
          j.x + K * G * st,
          j.z + nt * G * st,
          j.ux,
          j.uz,
          4.2,
          3,
          12,
          W,
          hv,
        );
      let et = [j.y + 6, j.y + 40, j.y + 72, W - 8];
      for (let st = 0; st + 1 < et.length; st++) {
        let ot = (lt) => [j.x - K * G, lt, j.z - nt * G],
          rt = (lt) => [j.x + K * G, lt, j.z + nt * G];
        (Xi($, ot(et[st]), rt(et[st + 1]), 1.3, 1.3, Kp),
          Xi($, rt(et[st]), ot(et[st + 1]), 1.3, 1.3, Kp),
          Gn(
            $,
            j.x,
            j.z,
            j.ux,
            j.uz,
            2.2,
            G - 2.5,
            et[st + 1] - 1.6,
            et[st + 1] + 1.6,
            hv,
          ));
      }
      Gn($, j.x, j.z, j.ux, j.uz, 2.6, G - 2.5, j.y - 17, j.y - 13, hv);
      for (let st of [-1, 1])
        (Gn(
          $,
          j.x + K * G * st,
          j.z + nt * G * st,
          j.ux,
          j.uz,
          2.8,
          2.2,
          W,
          W + 2.5,
          Kp,
        ),
          Gn(
            d("lamp"),
            j.x + K * G * st,
            j.z + nt * G * st,
            j.ux,
            j.uz,
            0.5,
            0.5,
            W + 2.5,
            W + 3.4,
            [1, 0.04, 0.02, 0],
          ));
    }
    {
      let q = B(L.center);
      (Gn(d("concrete"), q.x, q.z, q.ux, q.uz, 26, 30, -14, q.y - 16, Oo),
        Gn(d("concrete"), q.x, q.z, q.ux, q.uz, 20, G + 3, q.y + 2, V + 4, Oo),
        Gn(d("concrete"), q.x, q.z, q.ux, q.uz, 14, G - 1, V + 4, V + 9, yc));
      for (let j of [-1, 1])
        Gn(
          d("concrete"),
          q.x - q.uz * (G + 1) * j,
          q.z + q.ux * (G + 1) * j,
          q.ux,
          q.uz,
          20,
          2,
          q.y - 16,
          q.y + 2,
          Oo,
        );
    }
    let tt = [0.5, 0.49, 0.46, 0],
      Z = [0.36, 0.35, 0.33, 0];
    for (let q of [L.anch, L.anchE]) {
      let j = B(q),
        K = Math.min(y(j.x, j.z), 0) - 12,
        nt = [];
      for (let Q = -18; Q < 18; Q += 1) {
        let et = B(q + Q + 0.5),
          st = !1,
          ot = -1e9;
        for (let lt = -24; lt <= 24; lt += 1) {
          let ht = et.x - et.uz * lt,
            pt = et.z + et.ux * lt;
          e.inWorld(ht, pt) &&
            Pp(t, ht, pt) &&
            ((st = !0), (ot = Math.max(ot, e.driveHeight(ht, pt))));
        }
        let rt = nt[nt.length - 1];
        rt && rt.lane === st
          ? ((rt.a1 = Q + 1), (rt.ry = Math.max(rt.ry, ot)))
          : nt.push({ a0: Q, a1: Q + 1, lane: st, ry: ot });
      }
      for (let Q of nt) {
        let et = B(q + (Q.a0 + Q.a1) / 2),
          st = (Q.a1 - Q.a0) / 2,
          ot = -et.uz,
          rt = et.ux,
          lt = Q.lane ? Q.ry + 6.5 : K,
          ht = Q.lane
            ? w
            : (pt, ...ut) => {
                (w(pt, ...ut),
                  h.push({
                    t: "obb",
                    x: ut[0],
                    z: ut[1],
                    hx: ut[5],
                    hz: ut[4],
                    c: ut[3],
                    s: ut[2],
                    y0: ut[6],
                    y1: ut[7],
                    footing: !0,
                  }));
              };
        if (!(st < 0.4)) {
          for (let pt of [-1, 1])
            ht(
              d("concrete"),
              et.x + ot * 19 * pt,
              et.z + rt * 19 * pt,
              et.ux,
              et.uz,
              st,
              5,
              lt,
              j.y + 4,
              tt,
              Z,
            );
          lt < j.y - 15 &&
            ht(
              d("concrete"),
              et.x,
              et.z,
              et.ux,
              et.uz,
              st,
              14,
              lt,
              j.y - 14.5,
              Z,
              m2,
            );
        }
      }
    }
    for (let q of [-1, 1]) {
      for (let [nt, , , Q] of J) {
        let et = null;
        for (let st = nt; st <= Q + 0.1; st += 8) {
          let ot = B(st),
            rt = [ot.x - ot.uz * G * q, X(st), ot.z + ot.ux * G * q];
          (et && Xi($, et, rt, 0.8, 0.8, Kp), (et = rt));
        }
      }
      for (let nt = L.anch + 12; nt < L.anchE - 5; nt += 12) {
        if (
          L.towers.some((st) => Math.abs(nt - st) < 7) ||
          Math.abs(nt - L.center) < 26
        )
          continue;
        let Q = B(nt),
          et = X(nt);
        et - Q.y < 1.5 ||
          Xi(
            x("steel", Q.x, Q.z),
            [Q.x - Q.uz * (G - 0.2) * q, Q.y + 0.5, Q.z + Q.ux * (G - 0.2) * q],
            [Q.x - Q.uz * G * q, et, Q.z + Q.ux * G * q],
            0.12,
            0.12,
            Kp,
          );
      }
      let j = null,
        K = null;
      for (let nt = L.anch - 12, Q = 0; nt <= L.portal - 4; nt += 12, Q++) {
        let et = B(nt),
          st = L.lower(nt),
          ot = 13 * q,
          rt = [et.x - et.uz * ot, et.y - 1.3, et.z + et.ux * ot],
          lt = [et.x - et.uz * ot, st - 3, et.z + et.ux * ot];
        (j &&
          (Xi($, j, rt, 0.7, 1, hv),
          Xi($, K, lt, 0.7, 1, hv),
          Xi(
            x("steel", et.x, et.z),
            Q % 2 ? j : K,
            Q % 2 ? lt : rt,
            0.45,
            0.45,
            Kp,
          )),
          Xi(x("steel", et.x, et.z), rt, lt, 0.45, 0.45, Kp),
          (j = rt),
          (K = lt));
      }
    }
    for (let q = 22; q < L.portal - 0.01; q += 12) {
      let j = Math.min(L.portal, q + 12),
        K = B(q),
        nt = B(j),
        Q = H(q),
        et = H(j);
      (hd(d("concrete"), K, nt, 10.2, 0.25, 1.2, yc, m2),
        hd(d("concrete"), Q, et, 10.2, 0.25, 1.4, yc, m2));
      for (let st of [-1, 1])
        for (let [ot, rt] of [
          [K, nt],
          [Q, et],
        ]) {
          let lt = (ht, pt, ut) => [
            ht.x - ht.uz * pt * st,
            ht.y + ut,
            ht.z + ht.ux * pt * st,
          ];
          Xi(
            d("concrete"),
            lt(ot, 9.45, 0.42),
            lt(rt, 9.45, 0.42),
            0.5,
            0.85,
            Oo,
          );
        }
      if (q > L.anch - 12) {
        let st = H(q + 6);
        Gn($, st.x, st.z, st.ux, st.uz, 0.4, 13, st.y - 3, st.y - 1.4, Kp);
      }
    }
    for (let q = 60; q < L.anch - 10; q += 50) {
      let j = null;
      for (let ot of [0, 4, -4, 8, -8, 12, -12]) {
        let rt = B(q + ot);
        if (
          ![-1, 1].some((lt) =>
            M(
              rt.x - rt.uz * 7.5 * lt,
              rt.z + rt.ux * 7.5 * lt,
              rt.ux,
              rt.uz,
              1.2,
              1.2,
            ),
          )
        ) {
          j = q + ot;
          break;
        }
      }
      if (j === null) continue;
      let K = B(j),
        nt = L.lower(j),
        Q = y(K.x, K.z),
        et = -K.uz,
        st = K.ux;
      for (let ot of [-1, 1])
        (S(
          d("concrete"),
          K.x + et * 7.5 * ot,
          K.z + st * 7.5 * ot,
          K.ux,
          K.uz,
          1.1,
          1.1,
          Q - 1,
          nt - 1.4,
          Oo,
        ),
          Gn(
            d("concrete"),
            K.x + et * 9.2 * ot,
            K.z + st * 9.2 * ot,
            K.ux,
            K.uz,
            0.8,
            0.8,
            nt + 0.5,
            K.y - 1.2,
            Oo,
          ));
      (Gn(
        d("concrete"),
        K.x,
        K.z,
        K.ux,
        K.uz,
        1.2,
        10.4,
        nt - 2.6,
        nt - 1.3,
        Oo,
      ),
        Gn(
          d("concrete"),
          K.x,
          K.z,
          K.ux,
          K.uz,
          1.1,
          10.4,
          K.y - 2.4,
          K.y - 1.1,
          Oo,
        ));
    }
    for (let q = 40, j = 0; q < L.portal - 20; q += 48, j++) {
      let K = B(q),
        nt = j % 2 ? 1 : -1,
        Q = 10.2 * nt;
      c.push({
        kind: "lamp",
        x: K.x - K.uz * Q,
        y: K.y,
        z: K.z + K.ux * Q,
        rot: Math.atan2(-K.uz * nt * -1, K.ux * nt * -1),
      });
    }
    for (let q = 30; q < L.portal - 5; q += 16) {
      let j = H(q);
      for (let K of [-4.5, 4.5])
        Gn(
          x("lamp", j.x, j.z),
          j.x - j.uz * K,
          j.z + j.ux * K,
          j.ux,
          j.uz,
          1.2,
          0.18,
          L.upper(q) - 1.32,
          L.upper(q) - 1.24,
          [1, 0.8, 0.55, 0],
        );
    }
    {
      let q = (K) => B(K),
        j = (K) => H(K);
      for (let [K, nt, Q] of [
        [q, 1.2, 0],
        [j, 1.4, 0.5],
      ]) {
        let et = [0.4, 0.42, 0.44, Q],
          st = [0.33, 0.35, 0.37, Q];
        for (let ot = 22; ot < L.portal - 0.01; ot += 12) {
          let rt = Math.min(L.portal, ot + 12),
            lt = K(ot),
            ht = K(rt),
            pt = -nt - 0.02;
          hd(
            m("soffit"),
            { ...lt, y: lt.y + pt },
            { ...ht, y: ht.y + pt },
            10.2,
            0,
            0.001,
            et,
            et,
            !1,
          );
          for (let ut of [-8.1, -5.4, -2.7, 0, 2.7, 5.4, 8.1]) {
            let it = (at, yt) => [
              at.x - at.uz * ut,
              at.y + pt + yt,
              at.z + at.ux * ut,
            ];
            Xi(
              m("soffit", lt.x, lt.z),
              it(lt, -0.36),
              it(ht, -0.36),
              0.3,
              0.7,
              st,
            );
          }
        }
        for (let ot = 26; ot < L.portal - 1; ot += 8) {
          let rt = K(ot),
            lt = rt.y - nt - 0.02;
          Gn(
            m("soffit", rt.x, rt.z),
            rt.x,
            rt.z,
            rt.ux,
            rt.uz,
            0.28,
            10.1,
            lt - 0.9,
            lt,
            et,
          );
        }
      }
      for (let K = 30; K < L.anch; K += 16) {
        let nt = j(K);
        for (let Q of [-4.5, 4.5])
          Gn(
            m("lamp", nt.x, nt.z),
            nt.x - nt.uz * Q,
            nt.z + nt.ux * Q,
            nt.ux,
            nt.uz,
            1.2,
            0.18,
            nt.y - 1.52,
            nt.y - 1.44,
            [1, 0.8, 0.55, 0],
          );
      }
    }
    {
      let q = v("steel"),
        j = v("concrete"),
        K = [0.42, 0.44, 0.46, 0],
        nt = [0.3, 0.32, 0.34, 0];
      for (let et of L.towers) {
        let st = B(et),
          ot = -st.uz,
          rt = st.ux;
        for (let lt of [-1, 1]) {
          let ht = st.x + ot * G * lt,
            pt = st.z + rt * G * lt;
          for (let ut = 21; ut < W - 3; ut += 9)
            Gn(q, ht, pt, st.ux, st.uz, 4.28, 3.08, ut, ut + 0.35, hv);
          for (let [ut, it] of [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ])
            Gn(
              q,
              ht + st.ux * 4.05 * ut + ot * 2.85 * it,
              pt + st.uz * 4.05 * ut + rt * 2.85 * it,
              st.ux,
              st.uz,
              0.32,
              0.32,
              12,
              W,
              nt,
            );
        }
      }
      for (let et = L.anch - 12; et + 12 <= L.portal - 4; et += 12) {
        let st = B(et),
          ot = B(et + 12),
          rt = L.lower(et) - 3,
          lt = L.lower(et + 12) - 3,
          ht = v("steel", st.x, st.z),
          pt = (ut, it, at) => [ut.x - ut.uz * it, at, ut.z + ut.ux * it];
        (Xi(ht, pt(st, -13, rt + 0.2), pt(ot, 13, lt + 0.2), 0.3, 0.3, nt),
          Xi(ht, pt(st, 13, rt + 0.2), pt(ot, -13, lt + 0.2), 0.3, 0.3, nt),
          Xi(ht, pt(st, -13, rt + 0.3), pt(st, 13, rt + 0.3), 0.4, 0.6, nt));
        for (let ut of [-1, 1])
          for (let it of [st.y - 1.3, rt]) {
            let at = pt(st, 13.42 * ut, it);
            Gn(
              ht,
              at[0],
              at[2],
              st.ux,
              st.uz,
              0.95,
              0.06,
              at[1] - 0.95,
              at[1] + 0.95,
              K,
            );
          }
      }
      let Q = O
        ? (() => {
            let et = [];
            for (let st = 0; st <= O.L; st += 11) {
              let ot = _(O, st);
              L.s(ot.x, ot.z) < 22.5 && et.push(ot);
            }
            return et;
          })()
        : [];
      for (let et = 0; et + 1 < Q.length; et++) {
        let st = Q[et],
          ot = Q[et + 1];
        if (!(Math.hypot(ot.x - st.x, ot.z - st.z) > 12)) {
          hd(j, st, ot, Math.max(st.w, 9) + 1.2, 0.25, 1.2, yc, m2);
          for (let rt of [-1, 1]) {
            let lt = (ht, pt) => {
              let ut = (Math.max(ht.w, 9) + 0.45) * rt;
              return [ht.x - ht.uz * ut, ht.y + pt, ht.z + ht.ux * ut];
            };
            Xi(j, lt(st, 0.42), lt(ot, 0.42), 0.5, 0.85, Oo);
          }
        }
      }
      if (Q.length > 2) {
        let et = Q[Math.floor(Q.length / 2)],
          st = y(et.x, et.z),
          ot = -et.uz,
          rt = et.ux;
        if (
          et.y - 1.2 - st > 4 &&
          ![-1, 1].some((lt) =>
            M(
              et.x + ot * 7.5 * lt,
              et.z + rt * 7.5 * lt,
              et.ux,
              et.uz,
              1.2,
              1.2,
            ),
          )
        ) {
          for (let lt of [-1, 1])
            S(
              j,
              et.x + ot * 7.5 * lt,
              et.z + rt * 7.5 * lt,
              et.ux,
              et.uz,
              1.1,
              1.1,
              y(et.x + ot * 7.5 * lt, et.z + rt * 7.5 * lt) - 1,
              et.y - 2.6,
              Oo,
            );
          Gn(
            j,
            et.x,
            et.z,
            et.ux,
            et.uz,
            1.2,
            10.4,
            et.y - 2.6,
            et.y - 1.1,
            Oo,
          );
        }
      }
    }
    {
      let q = B(L.portal),
        j = L.lower(L.portal),
        K = q.y,
        nt = 30,
        Q = 92,
        et = d("concrete"),
        st = (pt, ut) => [q.x - q.uz * pt, ut, q.z + q.ux * pt],
        ot = (pt, ut, it, at) => {
          let yt = st(pt, it),
            vt = st(ut, it),
            At = st(ut, at),
            Ut = st(pt, at);
          (et.quad(yt, vt, At, Ut, [0, 0], [1, 0], [1, 1], [0, 1], Oo, [
            -q.ux,
            0,
            -q.uz,
          ]),
            et.quad(yt, Ut, At, vt, [0, 0], [1, 0], [1, 1], [0, 1], Oo, [
              -q.ux,
              0,
              -q.uz,
            ]));
        };
      (ot(-nt, -10.6, j - 14, Q),
        ot(10.6, nt, j - 14, Q),
        ot(-10.6, 10.6, j - 14, j - 1.4),
        ot(-10.6, 10.6, j + 6.4, K - 1.2),
        ot(-10.6, 10.6, K + 6.6, Q),
        Gn(
          et,
          q.x - q.ux * 1.5,
          q.z - q.uz * 1.5,
          q.ux,
          q.uz,
          1.5,
          nt + 1,
          Q,
          Q + 1.5,
          yc,
        ));
      let rt = [];
      for (let pt of [i.bb.loop, i.bb.loop2])
        for (let ut = 0; ut <= pt.L; ut += 6) {
          let it = Ot(pt, ut, {});
          rt.push(it);
        }
      let lt = (pt) => L.s(pt.x, pt.z) - L.portal,
        ht = (pt) =>
          rt.some(
            (ut, it) =>
              Math.abs(it - pt) > 6 &&
              Math.hypot(ut.x - rt[pt].x, ut.z - rt[pt].z) < 22,
          );
      for (let pt = 0; pt + 1 < rt.length; pt++) {
        let ut = rt[pt],
          it = rt[pt + 1];
        if (lt(ut) < -2 || lt(it) < -2) continue;
        let at = ht(pt) || ht(pt + 1),
          yt = 8.2,
          vt = 6.8;
        for (let At of [-1, 1]) {
          let Ut = [ut.x + ut.nx * yt * At, ut.z + ut.nz * yt * At],
            Gt = [it.x + it.nx * yt * At, it.z + it.nz * yt * At];
          at ||
            (et.wall(
              Ut[0],
              Ut[1],
              Gt[0],
              Gt[1],
              ut.y - 1.5,
              it.y - 1.5,
              ut.y + vt,
              it.y + vt,
              Oo,
            ),
            et.wall(
              Gt[0],
              Gt[1],
              Ut[0],
              Ut[1],
              it.y - 1.5,
              ut.y - 1.5,
              it.y + vt,
              ut.y + vt,
              Oo,
            ));
        }
        if (!at) {
          let At = {
              x: ut.x,
              z: ut.z,
              y: ut.y + vt + 0.6,
              ux: ut.dx,
              uz: ut.dz,
            },
            Ut = { x: it.x, z: it.z, y: it.y + vt + 0.6, ux: it.dx, uz: it.dz };
          (hd(et, At, Ut, yt, 0, 0.6, yc, m2),
            pt % 2 === 0 &&
              Gn(
                d("lamp"),
                ut.x,
                ut.z,
                ut.dx,
                ut.dz,
                1.6,
                0.2,
                ut.y + vt - 0.1,
                ut.y + vt,
                [1, 0.85, 0.6, 0],
              ));
        }
        hd(
          et,
          { x: ut.x, z: ut.z, y: ut.y, ux: ut.dx, uz: ut.dz },
          { x: it.x, z: it.z, y: it.y, ux: it.dx, uz: it.dz },
          8.2,
          0.25,
          1.5,
          yc,
          m2,
        );
      }
    }
  }
  if (typeof document < "u") {
    let G = (nt) => {
        let Q = R(nt);
        return { x: Q.x, z: Q.z, y: Q.y, ux: Q.ux, uz: Q.uz };
      },
      W = (nt) => B(nt),
      V = t.juns[i.gg.nb.ja] && Jyt(t, e);
    if (V && o.road) {
      let nt = Yyt(t, e, V);
      if (nt) {
        let Q = new ye(nt.geometry(), o.road);
        ((Q.name = "br_tollPavement"),
          (Q.receiveShadow = !0),
          (Q.matrixAutoUpdate = !1),
          Q.updateMatrix(),
          n.add(Q));
      }
    }
    let { C: $, YP: J } = i.gg,
      X = $ ? A.s($[0], $[1]) : 0,
      tt = $ ? A.v($[0], $[1]) : 0,
      Z = [
        [Qe, "sAnchS", A.anchS],
        [Qe, "sTowerS", A.towerS],
        [Qe, "sTowerN", A.towerN],
        [Qe, "sAnchN", A.anchN],
        [Qe, "towerTop", A.top],
        [Qe, "hwy", P + 0.1],
        [Qe, "lampS0", A.anchS - 60],
        [Qe, "lampS1", I],
        [Qe, "sFort", -400],
        [Qe, "fortV", 30],
        [Qe, "archA", -478],
        [Qe, "archB", -352],
        [
          Qe,
          "vista",
          $
            ? { s0: X - 17, s1: X + 17, v0: tt + 30, v1: tt + 84, Y: J }
            : { skip: !0 },
        ],
        ...(V
          ? [
              [Qe, "plazaB", wC(t)],
              [Qe, "plazaC", Kk],
              [Qe, "tollAt", V.at],
              [Qe, "tollHw", 17.5],
              [Qe, "tollIslands", V.islands],
              [Qe, "tollGround", (nt, Q) => e.driveHeight(nt, Q)],
              [Qe, "tollSpan", V.span || null],
            ]
          : []),
        [ts, "anch", L.anch],
        [ts, "towers", L.towers],
        [ts, "center", L.center],
        [ts, "anchE", L.anchE],
        [ts, "towerTop", L.top],
        [ts, "dir", [L.dx, L.dz]],
      ],
      q = Wb(e),
      j = (nt, Q) =>
        e.inWorld(nt, Q)
          ? q(nt, Q)
          : $ && Math.hypot(nt - $[0], Q - $[1]) < 200
            ? J - 5
            : -9,
      K = {
        L: e,
        group: n,
        colliders: h,
        inst: c,
        night: l,
        mats: o,
        tex: s,
        sites: [],
        C: null,
        ground: (nt, Q, et) => {
          let st = j(nt, Q);
          return (et && ((et.dx = 0), (et.dz = 0)), st);
        },
      };
    Q7((nt, Q) => (nt === "gg" ? G(Q) : W(Q)));
    try {
      rw(Z, () => {
        Ak(K, { name: "goldengate", F: Rk({ at: [0, 0] }) }, (et) => {
          let st = Ix(et);
          (Iz(et, st), st.finish());
        });
        let nt = { extra: [], tick: [], colliders: h, inst: c };
        pk(nt);
        let Q = {};
        for (let et of nt.extra) et(n, Q, l);
        if (nt.tick.length) {
          let et = () => {
            let st = performance.now() / 1e3;
            for (let ot of nt.tick) ot(st);
            requestAnimationFrame(et);
          };
          requestAnimationFrame(et);
        }
      });
    } catch (nt) {
      console.error("bridges: detail", nt);
    } finally {
      Q7(null);
    }
  }
  let N = [];
  for (let [G, W] of f) {
    if (W.empty) continue;
    let [V, $] = G.split("|"),
      J = new ye(W.geometry(!0), r[V]);
    if (
      ((J.name = "br_" + V + "_" + $),
      (J.castShadow = V !== "lamp"),
      (J.receiveShadow = !0),
      (J.matrixAutoUpdate = !1),
      J.updateMatrix(),
      n.add(J),
      $ !== "main")
    ) {
      let X = u.get($.slice(2));
      N.push([J, X[0], X[1]]);
    }
  }
  {
    let G = i.bb.axis,
      [W, V] = G.at(0),
      $ = new me({
        color: 16777215,
        roughness: 0.55,
        metalness: 0,
        vertexColors: !0,
      });
    (($.userData.mbAlbedo = Kyt(W, V, G.dx, G.dz, G.anch)),
      ($.userData.dayGlow = 0),
      l.push($),
      ($.userData.mbSkyVis = 1));
    let J = new me({ color: 16777215, roughness: 0.4, vertexColors: !0 });
    ((J.userData.mbAlbedo = pf), (J.userData.dayGlow = 0.35), l.push(J));
    let X = { soffit: $, lamp: J };
    for (let [tt, Z] of p) {
      if (Z.empty) continue;
      let [q, j] = tt.split("|"),
        K = new ye(Z.geometry(!0), X[q]);
      if (
        ((K.name = "br_s" + q + "_" + j),
        (K.castShadow = !1),
        (K.receiveShadow = !0),
        (K.matrixAutoUpdate = !1),
        K.updateMatrix(),
        n.add(K),
        j !== "main")
      ) {
        let nt = u.get(j.slice(2));
        N.push([K, nt[0], nt[1]]);
      }
    }
  }
  for (let [G, W] of b) {
    if (W.empty) continue;
    let [V, $] = G.split("|"),
      J = new ye(W.geometry(!0), r[V]);
    if (
      ((J.name = "br_x" + V + "_" + $),
      (J.castShadow = !0),
      (J.receiveShadow = !0),
      (J.matrixAutoUpdate = !1),
      J.updateMatrix(),
      n.add(J),
      $ !== "main")
    ) {
      let X = u.get($.slice(2));
      N.push([J, X[0], X[1]]);
    }
  }
  (f.clear(), p.clear(), b.clear(), u.clear());
  let D = 0;
  function U(G, W, V = 0.016) {
    if (!((D -= V) > 0)) {
      D = 0.25;
      for (let [$, J, X] of N) $.visible = Math.hypot(J - G, X - W) < 1700;
    }
  }
  return { group: n, inst: c, colliders: h, night: l, update: U };
}
