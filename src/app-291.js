// app 291 — math
// Lines 141106-142642 of readable/app.pretty.js (statement-aligned).
function PJ(i, { D: t, L: e, tex: s = null } = {}) {
  let n = new ke();
  n.name = "Bridges";
  let o = t?.highways;
  if (!o || !o.gg || !o.bb)
    return (
      console.warn("bridges: no highway data"),
      { group: n, inst: [], colliders: [], night: [], update() {} }
    );
  let a = (G, q, W = 0) =>
      new Ee({ color: G, roughness: q, metalness: W, vertexColors: !0 }),
    r = {
      orange: a(16777215, 0.55, 0.15),
      steel: a(16777215, 0.45, 0.55),
      concrete: a(16777215, 0.9),
      lamp: a(16777215, 0.4),
    };
  ((r.lamp.userData.mbAlbedo = Oh),
    (r.lamp.userData.dayGlow = 0.35),
    (r.orange.userData.mbAlbedo = _X),
    (r.steel.metalness = 0.12),
    (r.steel.roughness = 0.55),
    (r.steel.userData.mbAlbedo = TW),
    (r.concrete.userData.mbAlbedo = AW));
  let l = [r.lamp],
    c = [],
    h = [],
    f = new Map(),
    u = new Map(),
    d = (G, q = "main") => {
      let W = G + "|" + q,
        V = f.get(W);
      return (V || f.set(W, (V = new Ce())), V);
    },
    p = new Map(),
    m = (G, q, W) => {
      let V =
        q === void 0
          ? G + "|main"
          : `${G}|d:${Math.floor(q / 500)},${Math.floor(W / 500)}`;
      q !== void 0 &&
        u.set(V.split("|d:")[1], [
          Math.floor(q / 500) * 500 + 250,
          Math.floor(W / 500) * 500 + 250,
        ]);
      let Y = p.get(V);
      return (Y || (p.set(V, (Y = new Ce())), (Y.sky = g)), Y);
    },
    g = (G, q, W, V, Y) => (Y < -0.5 ? 0.14 : Y > 0.5 ? 0.62 : 0.42),
    b = new Map(),
    x = (G, q, W) => {
      let V =
        q === void 0
          ? G + "|main"
          : `${G}|d:${Math.floor(q / 500)},${Math.floor(W / 500)}`;
      q !== void 0 &&
        u.set(V.split("|d:")[1], [
          Math.floor(q / 500) * 500 + 250,
          Math.floor(W / 500) * 500 + 250,
        ]);
      let Y = b.get(V);
      return (Y || (b.set(V, (Y = new Ce())), (Y.sky = g)), Y);
    },
    v = (G, q, W) => {
      let V = `${Math.floor(q / 500)},${Math.floor(W / 500)}`;
      return (
        u.set(V, [
          Math.floor(q / 500) * 500 + 250,
          Math.floor(W / 500) * 500 + 250,
        ]),
        d(G, "d:" + V)
      );
    },
    y = (G, q) => (e.inWorld(G, q) ? e.terrainAt(G, q) : -9),
    M = (G, q, W, V, Y, $) => {
      let st = Math.max(1, Math.ceil(Y)),
        Q = Math.max(1, Math.ceil($)),
        j = -V,
        X = W;
      for (let K = -st; K <= st; K++)
        for (let nt = -Q; nt <= Q; nt++) {
          let Z = (Y * K) / st,
            et = ($ * nt) / Q,
            tt = G + W * Z + j * et,
            it = q + V * Z + X * et;
          if (e.inWorld(tt, it) && Qd(t, tt, it)) return !0;
        }
      return !1;
    },
    S = (G, q, W, V, Y, $, st, Q, j, X) => {
      (Fn(G, q, W, V, Y, $, st, Q, j, X),
        h.push({
          t: "obb",
          x: q,
          z: W,
          hx: st,
          hz: $,
          c: Y,
          s: V,
          y0: Q,
          y1: j,
          footing: !0,
        }));
    },
    w = (G, q, W, V, Y, $, st, Q, j, X, K) => {
      Fn(G, q, W, V, Y, $, st, Q, j, X);
      for (let et = Q + 3.2; et < j - 0.5; et += 3.2)
        Fn(G, q, W, V, Y, $ + 0.06, st + 0.06, et - 0.12, et + 0.12, K, !1);
      let nt = -Y,
        Z = V;
      for (let [et, tt, it, rt, lt, ct] of [
        [$, st, V, Y, nt, Z],
        [st, $, nt, Z, V, Y],
      ])
        for (let dt = -et + 6; dt < et - 1; dt += 6)
          for (let ut of [-1, 1])
            Fn(
              G,
              q + it * dt + lt * (tt + 0.03) * ut,
              W + rt * dt + ct * (tt + 0.03) * ut,
              it,
              rt,
              0.15,
              0.06,
              Q,
              j,
              K,
              !1,
            );
    },
    z = (G, q) => {
      let W = Ot(G, Math.max(0, Math.min(G.L, q)), {});
      return {
        x: W.x,
        z: W.z,
        y: W.y,
        ux: W.dx,
        uz: W.dz,
        w: W.w,
        nx: W.nx,
        nz: W.nz,
      };
    };
  function _(
    G,
    q,
    W,
    {
      barrierCol: V = _o,
      pierEvery: Y = 36,
      pierCol: $ = _o,
      orange: st = !1,
    } = {},
  ) {
    let j = d(st ? "orange" : "concrete"),
      X = null;
    for (let K = q; K <= W + 0.01; K += 8) {
      let nt = z(G, Math.min(K, W));
      if (X) {
        Au(d("concrete"), X, nt, nt.w + 0.5, 0.25, 1.6, _o, Tm);
        for (let Z of [-1, 1]) {
          if (
            G.shared &&
            Z === G.shared.side &&
            G.shared.at[
              Math.min(
                G.shared.at.length - 1,
                Math.max(0, Math.round(K - 8 / 2)),
              )
            ]
          )
            continue;
          let et = [
              X.x + X.nx * (X.w + 0.25) * Z,
              X.y,
              X.z + X.nz * (X.w + 0.25) * Z,
            ],
            tt = [
              nt.x + nt.nx * (nt.w + 0.25) * Z,
              nt.y,
              nt.z + nt.nz * (nt.w + 0.25) * Z,
            ];
          Ni(
            j,
            [et[0], et[1] + 0.42, et[2]],
            [tt[0], tt[1] + 0.42, tt[2]],
            0.45,
            0.85,
            V,
          );
        }
      }
      X = nt;
    }
    for (let K = q + Y / 2; K < W; K += Y) {
      let nt = K,
        Z = null,
        et = 0;
      for (let tt of [0, 3, -3, 6, -6, 9, -9, 12, -12]) {
        let it = z(G, Math.min(W, Math.max(q, K + tt)));
        if (!M(it.x, it.z, it.ux, it.uz, 1.1, it.w * 0.55)) {
          ((Z = it), (nt = K + tt));
          break;
        }
      }
      Z &&
        ((et = y(Z.x, Z.z)),
        !(Z.y - 1.6 - et < 2.5) &&
          (S(
            d("concrete"),
            Z.x,
            Z.z,
            Z.ux,
            Z.uz,
            0.9,
            Z.w * 0.55,
            Math.max(et, -12) - 1,
            Z.y - 2.4,
            $,
          ),
          Fn(
            d("concrete"),
            Z.x,
            Z.z,
            Z.ux,
            Z.uz,
            1.1,
            Z.w + 0.3,
            Z.y - 2.6,
            Z.y - 1.5,
            $,
          )));
    }
  }
  let R = o.gg.axis,
    T = o.gg.nb,
    E = o.gg.sb,
    A = (G) => {
      let [q, W] = R.at(G);
      return { x: q, z: W, y: R.deck(G), ux: R.dx, uz: R.dz };
    },
    C = R.half + R.lw,
    P = -466,
    I = 1722;
  {
    let G = R.leg,
      q = R.top,
      W = R.towerS,
      V = R.towerN,
      Y = R.anchS,
      $ = R.anchN,
      st = (Z) => {
        if (Z <= W) {
          let it = (Z - Y) / (W - Y),
            rt = R.deck(Y) + 4;
          return rt + (q - rt) * it - 72 * it * (1 - it);
        }
        if (Z >= V) {
          let it = (Z - V) / ($ - V),
            rt = R.deck($) + 4;
          return q + (rt - q) * it - 72 * it * (1 - it);
        }
        let et = R.deck((W + V) / 2) + 3,
          tt = ((Z - W) / (V - W)) * 2 - 1;
        return et + (q - et) * tt * tt;
      },
      Q = d("orange");
    for (let Z of [W, V]) {
      let et = A(Z),
        tt = -et.uz,
        it = et.ux;
      Fn(d("concrete"), et.x, et.z, et.ux, et.uz, 32, 34, -12, 9, _o);
      for (let rt of [-1, 1])
        for (let [lt, ct, dt, ut] of [
          [-2, 72, 6, 5.2],
          [72, 125, 5.4, 4.7],
          [125, 172, 4.9, 4.2],
          [172, q, 4.3, 3.7],
        ]) {
          let ot = et.x + tt * G * rt,
            at = et.z + it * G * rt;
          Fn(Q, ot, at, et.ux, et.uz, dt, ut, lt + 9, Math.min(q, ct + 9), gp);
          for (let yt of [-0.5, 0.5])
            Fn(
              Q,
              ot + et.ux * dt * yt * 1.6,
              at + et.uz * dt * yt * 1.6,
              et.ux,
              et.uz,
              0.35,
              ut + 0.25,
              lt + 12,
              Math.min(q, ct + 6),
              Ru,
            );
        }
      for (let [rt, lt] of [
        [q - 7, 7],
        [186, 9],
        [142, 8],
        [102, 8],
        [et.y - 12, 5],
      ])
        Fn(
          Q,
          et.x,
          et.z,
          et.ux,
          et.uz,
          3.2,
          G - 3.5,
          rt - lt / 2,
          rt + lt / 2,
          gp,
        );
      for (let rt of [-1, 1])
        Fn(
          Q,
          et.x + tt * G * rt,
          et.z + it * G * rt,
          et.ux,
          et.uz,
          3.5,
          2.5,
          q,
          q + 3,
          Ru,
        );
    }
    {
      let Z = A($),
        et = -Z.uz,
        tt = Z.ux,
        it = -10,
        rt = C + 4.2,
        lt = (27 - rt) / 2;
      for (let ct of [-1, 1])
        Fn(
          d("concrete"),
          Z.x + et * (rt + lt) * ct,
          Z.z + tt * (rt + lt) * ct,
          Z.ux,
          Z.uz,
          22,
          lt,
          it,
          Z.y + 7,
          _o,
        );
      Fn(d("concrete"), Z.x, Z.z, Z.ux, Z.uz, 22, rt, it, Z.y - 9, Jl);
    }
    for (let [Z, et] of [
      [Y, !0],
      [-486, !1],
    ]) {
      let tt = A(Z),
        it = -tt.uz,
        rt = tt.ux,
        lt =
          Math.min(
            y(tt.x + it * 16, tt.z + rt * 16),
            y(tt.x - it * 16, tt.z - rt * 16),
          ) - 2,
        ct = tt.y + (et ? 16 : 11);
      for (let dt of [-1, 1]) {
        let ut = tt.x + it * 16.5 * dt,
          ot = tt.z + rt * 16.5 * dt;
        (Fn(d("concrete"), ut, ot, tt.ux, tt.uz, 6.5, 3.2, lt, tt.y - 9, _o),
          Fn(
            d("concrete"),
            ut,
            ot,
            tt.ux,
            tt.uz,
            5.6,
            2.8,
            tt.y - 9,
            ct - 3,
            _o,
          ),
          Fn(d("concrete"), ut, ot, tt.ux, tt.uz, 4.6, 2.3, ct - 3, ct, Jl));
        for (let at of [-0.6, 0, 0.6])
          Fn(
            d("concrete"),
            ut + tt.ux * 5.6 * at,
            ot + tt.uz * 5.6 * at,
            tt.ux,
            tt.uz,
            0.3,
            3.05,
            lt + 4,
            ct - 4,
            Jl,
          );
      }
      et &&
        Fn(
          d("concrete"),
          tt.x,
          tt.z,
          tt.ux,
          tt.uz,
          12,
          14.5,
          lt + 20,
          tt.y - 1.5,
          Jl,
        );
    }
    for (let Z of [-1, 1]) {
      let et = [];
      for (let tt = Y; tt <= $ + 0.1; tt += 4) {
        let it = A(tt);
        et.push([it.x - it.uz * G * Z, st(tt), it.z + it.ux * G * Z]);
      }
      Yb(Q, et, 0.46, 14, vxt);
      for (let tt = Y + 15.2; tt < $ - 5; tt += 15.2) {
        if (Math.abs(tt - W) < 9 || Math.abs(tt - V) < 9) continue;
        let it = A(tt),
          rt = st(tt);
        if (rt - it.y < 1.5) continue;
        let lt = v("orange", it.x, it.z),
          ct = it.x - it.uz * G * Z,
          dt = it.z + it.ux * G * Z,
          ut = (st(tt + 1) - st(tt - 1)) / 2,
          ot = Math.hypot(1, ut),
          at = [it.ux / ot, ut / ot, it.uz / ot];
        LX(lt, [ct, rt, dt], at, 0.56, 1.3, gp);
        for (let yt of [-1, 1]) {
          let vt = -it.uz * 0.56 * yt,
            Pt = it.ux * 0.56 * yt;
          Ni(
            lt,
            [ct + vt - at[0] * 0.62, rt - at[1] * 0.62, dt + Pt - at[2] * 0.62],
            [ct + vt + at[0] * 0.62, rt + at[1] * 0.62, dt + Pt + at[2] * 0.62],
            0.12,
            0.16,
            Ru,
          );
        }
        for (let yt of [-0.35, 0.35]) {
          let vt = [ct + it.ux * yt, rt - 0.5, dt + it.uz * yt],
            Pt = [
              it.x - it.uz * (G - 0.2) * Z + it.ux * yt,
              it.y + 0.9,
              it.z + it.ux * (G - 0.2) * Z + it.uz * yt,
            ];
          (Ni(lt, Pt, vt, 0.068, 0.068, TJ),
            Ni(
              lt,
              [Pt[0], it.y + 0.2, Pt[2]],
              [Pt[0], it.y + 1, Pt[2]],
              0.2,
              0.2,
              Ru,
            ));
        }
      }
    }
    for (let Z of [-1, 1]) {
      let et = null,
        tt = null;
      for (let it = P, rt = 0; it <= I + 0.01; it += 7.6, rt++) {
        let lt = A(it),
          ct = 14.5 * Z,
          dt = [lt.x - lt.uz * ct, lt.y - 1.4, lt.z + lt.ux * ct],
          ut = [lt.x - lt.uz * ct, lt.y - 8.6, lt.z + lt.ux * ct],
          ot = v("orange", lt.x, lt.z);
        (et &&
          (Ni(Q, et, dt, 0.6, 0.9, gp),
          Ni(Q, tt, ut, 0.6, 0.9, gp),
          Ni(ot, rt % 2 ? et : tt, rt % 2 ? ut : dt, 0.35, 0.35, Ru)),
          Ni(ot, dt, ut, 0.4, 0.4, Ru),
          (et = dt),
          (tt = ut));
      }
    }
    let j = C + 0.42,
      X = 13.75;
    for (let Z = P; Z < I - 0.01; Z += 20) {
      let et = A(Z),
        tt = A(Math.min(I, Z + 20)),
        it = A(Z + 10);
      (Fn(Q, it.x, it.z, it.ux, it.uz, 10, 14.5, it.y - 8.9, it.y - 8.4, Ru),
        Au(d("concrete"), et, tt, C + 0.3, 0.25, 1.4, Sxt, Ru, !1));
      for (let rt of [-1, 1]) {
        let lt = (ut, ot, at) => [
            ut.x - ut.uz * ot * rt,
            ut.y + at,
            ut.z + ut.ux * ot * rt,
          ],
          ct = (ut) => {
            let ot = lt(ut, (j + X) / 2, 0);
            return { ...ut, x: ot[0], z: ot[2] };
          };
        (Au(d("concrete"), ct(et), ct(tt), (X - j) / 2, -0.2, 1.4, _o, Ru),
          Ni(
            d("concrete"),
            lt(et, C + 0.22, 0.31),
            lt(tt, C + 0.22, 0.31),
            0.36,
            0.62,
            yxt,
          ));
        let dt = v("orange", it.x, it.z);
        Ni(dt, lt(et, C + 0.22, 1.02), lt(tt, C + 0.22, 1.02), 0.1, 0.1, Rw);
        for (let ut = 0; ut < 20; ut += 2.5) {
          let ot = A(Z + ut);
          Ni(dt, lt(ot, C + 0.22, 0.62), lt(ot, C + 0.22, 1), 0.07, 0.07, TJ);
        }
        Ni(
          d("concrete"),
          lt(et, 13.6, 0.38),
          lt(tt, 13.6, 0.38),
          0.45,
          0.36,
          _o,
        );
        for (let ut of [0.82, 1.18])
          Ni(dt, lt(et, 13.6, ut), lt(tt, 13.6, ut), 0.07, 0.07, Rw);
        Ni(Q, lt(et, 13.6, 1.4), lt(tt, 13.6, 1.4), 0.2, 0.09, Rw);
        for (let ut = 0; ut < 20; ut += 2.4) {
          let ot = A(Z + ut);
          Ni(dt, lt(ot, 13.6, 0.55), lt(ot, 13.6, 1.4), 0.08, 0.08, Rw);
        }
        for (let ut = 0.24; ut < 20; ut += 0.24) {
          if (Math.abs(ut / 2.4 - Math.round(ut / 2.4)) < 0.05) continue;
          let ot = A(Z + ut);
          Ni(dt, lt(ot, 13.6, 0.56), lt(ot, 13.6, 1.36), 0.05, 0.022, Rw);
        }
        Ni(Q, lt(et, 14.2, -0.6), lt(tt, 14.2, -0.6), 0.3, 1.3, gp);
      }
    }
    for (let Z of o.gg.median || [])
      xxt(d("concrete"), (et, tt) => v("concrete", et, tt), Z, h);
    for (let Z = $ + 30; Z < I; Z += 40) {
      let et = A(Z);
      for (let tt of [-1, 1])
        Fn(
          d("orange"),
          et.x - et.uz * 9 * tt,
          et.z + et.ux * 9 * tt,
          et.ux,
          et.uz,
          1.6,
          1.6,
          -12,
          et.y - 8.6,
          gp,
        );
      Fn(Q, et.x, et.z, et.ux, et.uz, 1.4, 12, et.y - 10, et.y - 8.4, gp);
    }
    let K = (Z, et) => {
        let tt = z(Z, et);
        return R.s(tt.x, tt.z);
      },
      nt = (Z, et) => {
        let tt = null,
          it = null;
        for (let rt = 0; rt <= Z.L; rt += 4)
          et(K(Z, rt)) && (tt === null && (tt = rt), (it = rt));
        return tt === null ? null : [tt, it];
      };
    for (let Z of [T, E]) {
      let et = nt(Z, (it) => it < P + 4),
        tt = nt(Z, (it) => it > I - 4);
      (et && _(Z, Math.max(Z.s0, et[0]), et[1] + 4),
        tt && _(Z, tt[0] - 4, Math.min(Z.s1, tt[1])));
    }
    for (let Z of [W, V]) {
      let et = A(Z);
      for (let tt of [-1, 1])
        Fn(
          d("lamp"),
          et.x - et.uz * G * tt,
          et.z + et.ux * G * tt,
          et.ux,
          et.uz,
          0.5,
          0.5,
          q + 3,
          q + 4,
          [1, 0.04, 0.02, 0],
        );
    }
    o.gg.cableY = st;
  }
  {
    let { C: G, R: q, YP: W } = o.gg;
    if (G)
      for (let { q0: V, q1: Y, p0: $, p1: st, open: Q } of W7(o))
        (d("concrete").wall(
          Y[0],
          Y[1],
          V[0],
          V[1],
          W - 9,
          W - 9,
          W - 0.02,
          W - 0.02,
          Jl,
        ),
          Q ||
            Ni(
              d("concrete"),
              [$[0], W + 0.42, $[1]],
              [st[0], W + 0.42, st[1]],
              0.5,
              0.85,
              _o,
            ));
    if (G)
      for (let V of [0.6, 2.2, 3.9, 5.3])
        c.push({
          kind: "lamp",
          x: G[0] + Math.cos(V) * (q + 1.2),
          y: W,
          z: G[1] + Math.sin(V) * (q + 1.2),
          rot: Math.atan2(-Math.cos(V), -Math.sin(V)),
        });
  }
  let L = o.bb.axis,
    F = o.bb.eb,
    N = o.bb.wb,
    B = (G) => {
      let [q, W] = L.at(G);
      return { x: q, z: W, y: L.upper(G), ux: L.dx, uz: L.dz };
    },
    H = (G) => {
      let [q, W] = L.at(G);
      return { x: q, z: W, y: L.lower(G), ux: L.dx, uz: L.dz };
    };
  {
    let G = L.leg,
      q = L.top,
      W = L.upper(L.center) + 38,
      V = d("steel"),
      Y = [
        [L.anch, L.towers[0], L.towers[1], L.center],
        [L.center, L.towers[2], L.towers[3], L.anchE],
      ],
      $ = (j) => {
        for (let [X, K, nt, Z] of Y) {
          if (j < X - 1e-6 || j > Z + 1e-6) continue;
          let et = X === L.center ? W : L.upper(X) + 3,
            tt = Z === L.center ? W : L.upper(Z) + 3,
            it = L.upper((K + nt) / 2) + 3;
          if (j <= K) {
            let lt = (j - X) / (K - X);
            return et + (q - et) * lt - 48 * lt * (1 - lt);
          }
          if (j >= nt) {
            let lt = (j - nt) / (Z - nt);
            return q + (tt - q) * lt - 48 * lt * (1 - lt);
          }
          let rt = ((j - K) / (nt - K)) * 2 - 1;
          return it + (q - it) * rt * rt;
        }
        return L.upper(j);
      };
    o.bb.cableY = $;
    for (let j of L.towers) {
      let X = B(j),
        K = -X.uz,
        nt = X.ux,
        Z = y(X.x, X.z);
      Fn(
        d("concrete"),
        X.x,
        X.z,
        X.ux,
        X.uz,
        18,
        28,
        Math.min(Z, 0) - 14,
        12,
        _o,
      );
      for (let tt of [-1, 1])
        Fn(
          V,
          X.x + K * G * tt,
          X.z + nt * G * tt,
          X.ux,
          X.uz,
          4.2,
          3,
          12,
          q,
          kx,
        );
      let et = [X.y + 6, X.y + 40, X.y + 72, q - 8];
      for (let tt = 0; tt + 1 < et.length; tt++) {
        let it = (lt) => [X.x - K * G, lt, X.z - nt * G],
          rt = (lt) => [X.x + K * G, lt, X.z + nt * G];
        (Ni(V, it(et[tt]), rt(et[tt + 1]), 1.3, 1.3, bp),
          Ni(V, rt(et[tt]), it(et[tt + 1]), 1.3, 1.3, bp),
          Fn(
            V,
            X.x,
            X.z,
            X.ux,
            X.uz,
            2.2,
            G - 2.5,
            et[tt + 1] - 1.6,
            et[tt + 1] + 1.6,
            kx,
          ));
      }
      Fn(V, X.x, X.z, X.ux, X.uz, 2.6, G - 2.5, X.y - 17, X.y - 13, kx);
      for (let tt of [-1, 1])
        (Fn(
          V,
          X.x + K * G * tt,
          X.z + nt * G * tt,
          X.ux,
          X.uz,
          2.8,
          2.2,
          q,
          q + 2.5,
          bp,
        ),
          Fn(
            d("lamp"),
            X.x + K * G * tt,
            X.z + nt * G * tt,
            X.ux,
            X.uz,
            0.5,
            0.5,
            q + 2.5,
            q + 3.4,
            [1, 0.04, 0.02, 0],
          ));
    }
    {
      let j = B(L.center);
      (Fn(d("concrete"), j.x, j.z, j.ux, j.uz, 26, 30, -14, j.y - 16, _o),
        Fn(d("concrete"), j.x, j.z, j.ux, j.uz, 20, G + 3, j.y + 2, W + 4, _o),
        Fn(d("concrete"), j.x, j.z, j.ux, j.uz, 14, G - 1, W + 4, W + 9, Jl));
      for (let X of [-1, 1])
        Fn(
          d("concrete"),
          j.x - j.uz * (G + 1) * X,
          j.z + j.ux * (G + 1) * X,
          j.ux,
          j.uz,
          20,
          2,
          j.y - 16,
          j.y + 2,
          _o,
        );
    }
    let st = [0.5, 0.49, 0.46, 0],
      Q = [0.36, 0.35, 0.33, 0];
    for (let j of [L.anch, L.anchE]) {
      let X = B(j),
        K = Math.min(y(X.x, X.z), 0) - 12,
        nt = [];
      for (let Z = -18; Z < 18; Z += 1) {
        let et = B(j + Z + 0.5),
          tt = !1,
          it = -1e9;
        for (let lt = -24; lt <= 24; lt += 1) {
          let ct = et.x - et.uz * lt,
            dt = et.z + et.ux * lt;
          e.inWorld(ct, dt) &&
            Qd(t, ct, dt) &&
            ((tt = !0), (it = Math.max(it, e.driveHeight(ct, dt))));
        }
        let rt = nt[nt.length - 1];
        rt && rt.lane === tt
          ? ((rt.a1 = Z + 1), (rt.ry = Math.max(rt.ry, it)))
          : nt.push({ a0: Z, a1: Z + 1, lane: tt, ry: it });
      }
      for (let Z of nt) {
        let et = B(j + (Z.a0 + Z.a1) / 2),
          tt = (Z.a1 - Z.a0) / 2,
          it = -et.uz,
          rt = et.ux,
          lt = Z.lane ? Z.ry + 6.5 : K,
          ct = Z.lane
            ? w
            : (dt, ...ut) => {
                (w(dt, ...ut),
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
        if (!(tt < 0.4)) {
          for (let dt of [-1, 1])
            ct(
              d("concrete"),
              et.x + it * 19 * dt,
              et.z + rt * 19 * dt,
              et.ux,
              et.uz,
              tt,
              5,
              lt,
              X.y + 4,
              st,
              Q,
            );
          lt < X.y - 15 &&
            ct(
              d("concrete"),
              et.x,
              et.z,
              et.ux,
              et.uz,
              tt,
              14,
              lt,
              X.y - 14.5,
              Q,
              Tm,
            );
        }
      }
    }
    for (let j of [-1, 1]) {
      for (let [nt, , , Z] of Y) {
        let et = null;
        for (let tt = nt; tt <= Z + 0.1; tt += 8) {
          let it = B(tt),
            rt = [it.x - it.uz * G * j, $(tt), it.z + it.ux * G * j];
          (et && Ni(V, et, rt, 0.8, 0.8, bp), (et = rt));
        }
      }
      for (let nt = L.anch + 12; nt < L.anchE - 5; nt += 12) {
        if (
          L.towers.some((tt) => Math.abs(nt - tt) < 7) ||
          Math.abs(nt - L.center) < 26
        )
          continue;
        let Z = B(nt),
          et = $(nt);
        et - Z.y < 1.5 ||
          Ni(
            v("steel", Z.x, Z.z),
            [Z.x - Z.uz * (G - 0.2) * j, Z.y + 0.5, Z.z + Z.ux * (G - 0.2) * j],
            [Z.x - Z.uz * G * j, et, Z.z + Z.ux * G * j],
            0.12,
            0.12,
            bp,
          );
      }
      let X = null,
        K = null;
      for (let nt = L.anch - 12, Z = 0; nt <= L.portal - 4; nt += 12, Z++) {
        let et = B(nt),
          tt = L.lower(nt),
          it = 13 * j,
          rt = [et.x - et.uz * it, et.y - 1.3, et.z + et.ux * it],
          lt = [et.x - et.uz * it, tt - 3, et.z + et.ux * it];
        (X &&
          (Ni(V, X, rt, 0.7, 1, kx),
          Ni(V, K, lt, 0.7, 1, kx),
          Ni(
            v("steel", et.x, et.z),
            Z % 2 ? X : K,
            Z % 2 ? lt : rt,
            0.45,
            0.45,
            bp,
          )),
          Ni(v("steel", et.x, et.z), rt, lt, 0.45, 0.45, bp),
          (X = rt),
          (K = lt));
      }
    }
    for (let j = 22; j < L.portal - 0.01; j += 12) {
      let X = Math.min(L.portal, j + 12),
        K = B(j),
        nt = B(X),
        Z = H(j),
        et = H(X);
      (Au(d("concrete"), K, nt, 10.2, 0.25, 1.2, Jl, Tm),
        Au(d("concrete"), Z, et, 10.2, 0.25, 1.4, Jl, Tm));
      for (let tt of [-1, 1])
        for (let [it, rt] of [
          [K, nt],
          [Z, et],
        ]) {
          let lt = (ct, dt, ut) => [
            ct.x - ct.uz * dt * tt,
            ct.y + ut,
            ct.z + ct.ux * dt * tt,
          ];
          Ni(
            d("concrete"),
            lt(it, 9.45, 0.42),
            lt(rt, 9.45, 0.42),
            0.5,
            0.85,
            _o,
          );
        }
      if (j > L.anch - 12) {
        let tt = H(j + 6);
        Fn(V, tt.x, tt.z, tt.ux, tt.uz, 0.4, 13, tt.y - 3, tt.y - 1.4, bp);
      }
    }
    for (let j = 60; j < L.anch - 10; j += 50) {
      let X = null;
      for (let it of [0, 4, -4, 8, -8, 12, -12]) {
        let rt = B(j + it);
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
          X = j + it;
          break;
        }
      }
      if (X === null) continue;
      let K = B(X),
        nt = L.lower(X),
        Z = y(K.x, K.z),
        et = -K.uz,
        tt = K.ux;
      for (let it of [-1, 1])
        (S(
          d("concrete"),
          K.x + et * 7.5 * it,
          K.z + tt * 7.5 * it,
          K.ux,
          K.uz,
          1.1,
          1.1,
          Z - 1,
          nt - 1.4,
          _o,
        ),
          Fn(
            d("concrete"),
            K.x + et * 9.2 * it,
            K.z + tt * 9.2 * it,
            K.ux,
            K.uz,
            0.8,
            0.8,
            nt + 0.5,
            K.y - 1.2,
            _o,
          ));
      (Fn(
        d("concrete"),
        K.x,
        K.z,
        K.ux,
        K.uz,
        1.2,
        10.4,
        nt - 2.6,
        nt - 1.3,
        _o,
      ),
        Fn(
          d("concrete"),
          K.x,
          K.z,
          K.ux,
          K.uz,
          1.1,
          10.4,
          K.y - 2.4,
          K.y - 1.1,
          _o,
        ));
    }
    for (let j = 40, X = 0; j < L.portal - 20; j += 48, X++) {
      let K = B(j),
        nt = X % 2 ? 1 : -1,
        Z = 10.2 * nt;
      c.push({
        kind: "lamp",
        x: K.x - K.uz * Z,
        y: K.y,
        z: K.z + K.ux * Z,
        rot: Math.atan2(-K.uz * nt * -1, K.ux * nt * -1),
      });
    }
    for (let j = 30; j < L.portal - 5; j += 16) {
      let X = H(j);
      for (let K of [-4.5, 4.5])
        Fn(
          v("lamp", X.x, X.z),
          X.x - X.uz * K,
          X.z + X.ux * K,
          X.ux,
          X.uz,
          1.2,
          0.18,
          L.upper(j) - 1.32,
          L.upper(j) - 1.24,
          [1, 0.8, 0.55, 0],
        );
    }
    {
      let j = (K) => B(K),
        X = (K) => H(K);
      for (let [K, nt, Z] of [
        [j, 1.2, 0],
        [X, 1.4, 0.5],
      ]) {
        let et = [0.4, 0.42, 0.44, Z],
          tt = [0.33, 0.35, 0.37, Z];
        for (let it = 22; it < L.portal - 0.01; it += 12) {
          let rt = Math.min(L.portal, it + 12),
            lt = K(it),
            ct = K(rt),
            dt = -nt - 0.02;
          Au(
            m("soffit"),
            { ...lt, y: lt.y + dt },
            { ...ct, y: ct.y + dt },
            10.2,
            0,
            0.001,
            et,
            et,
            !1,
          );
          for (let ut of [-8.1, -5.4, -2.7, 0, 2.7, 5.4, 8.1]) {
            let ot = (at, yt) => [
              at.x - at.uz * ut,
              at.y + dt + yt,
              at.z + at.ux * ut,
            ];
            Ni(
              m("soffit", lt.x, lt.z),
              ot(lt, -0.36),
              ot(ct, -0.36),
              0.3,
              0.7,
              tt,
            );
          }
        }
        for (let it = 26; it < L.portal - 1; it += 8) {
          let rt = K(it),
            lt = rt.y - nt - 0.02;
          Fn(
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
        let nt = X(K);
        for (let Z of [-4.5, 4.5])
          Fn(
            m("lamp", nt.x, nt.z),
            nt.x - nt.uz * Z,
            nt.z + nt.ux * Z,
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
      let j = x("steel"),
        X = x("concrete"),
        K = [0.42, 0.44, 0.46, 0],
        nt = [0.3, 0.32, 0.34, 0];
      for (let et of L.towers) {
        let tt = B(et),
          it = -tt.uz,
          rt = tt.ux;
        for (let lt of [-1, 1]) {
          let ct = tt.x + it * G * lt,
            dt = tt.z + rt * G * lt;
          for (let ut = 21; ut < q - 3; ut += 9)
            Fn(j, ct, dt, tt.ux, tt.uz, 4.28, 3.08, ut, ut + 0.35, kx);
          for (let [ut, ot] of [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ])
            Fn(
              j,
              ct + tt.ux * 4.05 * ut + it * 2.85 * ot,
              dt + tt.uz * 4.05 * ut + rt * 2.85 * ot,
              tt.ux,
              tt.uz,
              0.32,
              0.32,
              12,
              q,
              nt,
            );
        }
      }
      for (let et = L.anch - 12; et + 12 <= L.portal - 4; et += 12) {
        let tt = B(et),
          it = B(et + 12),
          rt = L.lower(et) - 3,
          lt = L.lower(et + 12) - 3,
          ct = x("steel", tt.x, tt.z),
          dt = (ut, ot, at) => [ut.x - ut.uz * ot, at, ut.z + ut.ux * ot];
        (Ni(ct, dt(tt, -13, rt + 0.2), dt(it, 13, lt + 0.2), 0.3, 0.3, nt),
          Ni(ct, dt(tt, 13, rt + 0.2), dt(it, -13, lt + 0.2), 0.3, 0.3, nt),
          Ni(ct, dt(tt, -13, rt + 0.3), dt(tt, 13, rt + 0.3), 0.4, 0.6, nt));
        for (let ut of [-1, 1])
          for (let ot of [tt.y - 1.3, rt]) {
            let at = dt(tt, 13.42 * ut, ot);
            Fn(
              ct,
              at[0],
              at[2],
              tt.ux,
              tt.uz,
              0.95,
              0.06,
              at[1] - 0.95,
              at[1] + 0.95,
              K,
            );
          }
      }
      let Z = N
        ? (() => {
            let et = [];
            for (let tt = 0; tt <= N.L; tt += 11) {
              let it = z(N, tt);
              L.s(it.x, it.z) < 22.5 && et.push(it);
            }
            return et;
          })()
        : [];
      for (let et = 0; et + 1 < Z.length; et++) {
        let tt = Z[et],
          it = Z[et + 1];
        if (!(Math.hypot(it.x - tt.x, it.z - tt.z) > 12)) {
          Au(X, tt, it, Math.max(tt.w, 9) + 1.2, 0.25, 1.2, Jl, Tm);
          for (let rt of [-1, 1]) {
            let lt = (ct, dt) => {
              let ut = (Math.max(ct.w, 9) + 0.45) * rt;
              return [ct.x - ct.uz * ut, ct.y + dt, ct.z + ct.ux * ut];
            };
            Ni(X, lt(tt, 0.42), lt(it, 0.42), 0.5, 0.85, _o);
          }
        }
      }
      if (Z.length > 2) {
        let et = Z[Math.floor(Z.length / 2)],
          tt = y(et.x, et.z),
          it = -et.uz,
          rt = et.ux;
        if (
          et.y - 1.2 - tt > 4 &&
          ![-1, 1].some((lt) =>
            M(
              et.x + it * 7.5 * lt,
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
              X,
              et.x + it * 7.5 * lt,
              et.z + rt * 7.5 * lt,
              et.ux,
              et.uz,
              1.1,
              1.1,
              y(et.x + it * 7.5 * lt, et.z + rt * 7.5 * lt) - 1,
              et.y - 2.6,
              _o,
            );
          Fn(
            X,
            et.x,
            et.z,
            et.ux,
            et.uz,
            1.2,
            10.4,
            et.y - 2.6,
            et.y - 1.1,
            _o,
          );
        }
      }
    }
    {
      let j = B(L.portal),
        X = L.lower(L.portal),
        K = j.y,
        nt = 30,
        Z = 92,
        et = d("concrete"),
        tt = (dt, ut) => [j.x - j.uz * dt, ut, j.z + j.ux * dt],
        it = (dt, ut, ot, at) => {
          let yt = tt(dt, ot),
            vt = tt(ut, ot),
            Pt = tt(ut, at),
            jt = tt(dt, at);
          (et.quad(yt, vt, Pt, jt, [0, 0], [1, 0], [1, 1], [0, 1], _o, [
            -j.ux,
            0,
            -j.uz,
          ]),
            et.quad(yt, jt, Pt, vt, [0, 0], [1, 0], [1, 1], [0, 1], _o, [
              -j.ux,
              0,
              -j.uz,
            ]));
        };
      (it(-nt, -10.6, X - 14, Z),
        it(10.6, nt, X - 14, Z),
        it(-10.6, 10.6, X - 14, X - 1.4),
        it(-10.6, 10.6, X + 6.4, K - 1.2),
        it(-10.6, 10.6, K + 6.6, Z),
        Fn(
          et,
          j.x - j.ux * 1.5,
          j.z - j.uz * 1.5,
          j.ux,
          j.uz,
          1.5,
          nt + 1,
          Z,
          Z + 1.5,
          Jl,
        ));
      let rt = [];
      for (let dt of [o.bb.loop, o.bb.loop2])
        for (let ut = 0; ut <= dt.L; ut += 6) {
          let ot = Ot(dt, ut, {});
          rt.push(ot);
        }
      let lt = (dt) => L.s(dt.x, dt.z) - L.portal,
        ct = (dt) =>
          rt.some(
            (ut, ot) =>
              Math.abs(ot - dt) > 6 &&
              Math.hypot(ut.x - rt[dt].x, ut.z - rt[dt].z) < 22,
          );
      for (let dt = 0; dt + 1 < rt.length; dt++) {
        let ut = rt[dt],
          ot = rt[dt + 1];
        if (lt(ut) < -2 || lt(ot) < -2) continue;
        let at = ct(dt) || ct(dt + 1),
          yt = 8.2,
          vt = 6.8;
        for (let Pt of [-1, 1]) {
          let jt = [ut.x + ut.nx * yt * Pt, ut.z + ut.nz * yt * Pt],
            Wt = [ot.x + ot.nx * yt * Pt, ot.z + ot.nz * yt * Pt];
          at ||
            (et.wall(
              jt[0],
              jt[1],
              Wt[0],
              Wt[1],
              ut.y - 1.5,
              ot.y - 1.5,
              ut.y + vt,
              ot.y + vt,
              _o,
            ),
            et.wall(
              Wt[0],
              Wt[1],
              jt[0],
              jt[1],
              ot.y - 1.5,
              ut.y - 1.5,
              ot.y + vt,
              ut.y + vt,
              _o,
            ));
        }
        if (!at) {
          let Pt = {
              x: ut.x,
              z: ut.z,
              y: ut.y + vt + 0.6,
              ux: ut.dx,
              uz: ut.dz,
            },
            jt = { x: ot.x, z: ot.z, y: ot.y + vt + 0.6, ux: ot.dx, uz: ot.dz };
          (Au(et, Pt, jt, yt, 0, 0.6, Jl, Tm),
            dt % 2 === 0 &&
              Fn(
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
        Au(
          et,
          { x: ut.x, z: ut.z, y: ut.y, ux: ut.dx, uz: ut.dz },
          { x: ot.x, z: ot.z, y: ot.y, ux: ot.dx, uz: ot.dz },
          8.2,
          0.25,
          1.5,
          Jl,
          Tm,
        );
      }
    }
  }
  if (typeof document < "u") {
    let G = (nt) => {
        let Z = A(nt);
        return { x: Z.x, z: Z.z, y: Z.y, ux: Z.ux, uz: Z.uz };
      },
      q = (nt) => B(nt),
      W = t.juns[o.gg.nb.ja] && zxt(t, e);
    if (W && i.road) {
      let nt = _xt(t, e, W);
      if (nt) {
        let Z = new _e(nt.geometry(), i.road);
        ((Z.name = "br_tollPavement"),
          (Z.receiveShadow = !0),
          (Z.matrixAutoUpdate = !1),
          Z.updateMatrix(),
          n.add(Z));
      }
    }
    let { C: V, YP: Y } = o.gg,
      $ = V ? R.s(V[0], V[1]) : 0,
      st = V ? R.v(V[0], V[1]) : 0,
      Q = [
        [Ye, "sAnchS", R.anchS],
        [Ye, "sTowerS", R.towerS],
        [Ye, "sTowerN", R.towerN],
        [Ye, "sAnchN", R.anchN],
        [Ye, "towerTop", R.top],
        [Ye, "hwy", C + 0.1],
        [Ye, "lampS0", R.anchS - 60],
        [Ye, "lampS1", I],
        [Ye, "sFort", -400],
        [Ye, "fortV", 30],
        [Ye, "archA", -478],
        [Ye, "archB", -352],
        [
          Ye,
          "vista",
          V
            ? { s0: $ - 17, s1: $ + 17, v0: st + 30, v1: st + 84, Y }
            : { skip: !0 },
        ],
        ...(W
          ? [
              [Ye, "plazaB", q7(t)],
              [Ye, "plazaC", KS],
              [Ye, "tollAt", W.at],
              [Ye, "tollHw", 17.5],
              [Ye, "tollIslands", W.islands],
              [Ye, "tollGround", (nt, Z) => e.driveHeight(nt, Z)],
              [Ye, "tollSpan", W.span || null],
            ]
          : []),
        [Je, "anch", L.anch],
        [Je, "towers", L.towers],
        [Je, "center", L.center],
        [Je, "anchE", L.anchE],
        [Je, "towerTop", L.top],
        [Je, "dir", [L.dx, L.dz]],
      ],
      j = TS(e),
      X = (nt, Z) =>
        e.inWorld(nt, Z)
          ? j(nt, Z)
          : V && Math.hypot(nt - V[0], Z - V[1]) < 200
            ? Y - 5
            : -9,
      K = {
        L: e,
        group: n,
        colliders: h,
        inst: c,
        night: l,
        mats: i,
        tex: s,
        sites: [],
        C: null,
        ground: (nt, Z, et) => {
          let tt = X(nt, Z);
          return (et && ((et.dx = 0), (et.dz = 0)), tt);
        },
      };
    SR((nt, Z) => (nt === "gg" ? G(Z) : q(Z)));
    try {
      dy(Q, () => {
        AS(K, { name: "goldengate", F: ES({ at: [0, 0] }) }, (et) => {
          let tt = Xb(et);
          (Ik(et, tt), tt.finish());
        });
        let nt = { extra: [], tick: [], colliders: h, inst: c };
        uS(nt);
        let Z = {};
        for (let et of nt.extra) et(n, Z, l);
        if (nt.tick.length) {
          let et = () => {
            let tt = performance.now() / 1e3;
            for (let it of nt.tick) it(tt);
            requestAnimationFrame(et);
          };
          requestAnimationFrame(et);
        }
      });
    } catch (nt) {
      console.error("bridges: detail", nt);
    } finally {
      SR(null);
    }
  }
  let O = [];
  for (let [G, q] of f) {
    if (q.empty) continue;
    let [W, V] = G.split("|"),
      Y = new _e(q.geometry(!0), r[W]);
    if (
      ((Y.name = "br_" + W + "_" + V),
      (Y.castShadow = W !== "lamp"),
      (Y.receiveShadow = !0),
      (Y.matrixAutoUpdate = !1),
      Y.updateMatrix(),
      n.add(Y),
      V !== "main")
    ) {
      let $ = u.get(V.slice(2));
      O.push([Y, $[0], $[1]]);
    }
  }
  {
    let G = o.bb.axis,
      [q, W] = G.at(0),
      V = new Ee({
        color: 16777215,
        roughness: 0.55,
        metalness: 0,
        vertexColors: !0,
      });
    ((V.userData.mbAlbedo = kxt(q, W, G.dx, G.dz, G.anch)),
      (V.userData.dayGlow = 0),
      l.push(V),
      (V.userData.mbSkyVis = 1));
    let Y = new Ee({ color: 16777215, roughness: 0.4, vertexColors: !0 });
    ((Y.userData.mbAlbedo = Oh), (Y.userData.dayGlow = 0.35), l.push(Y));
    let $ = { soffit: V, lamp: Y };
    for (let [st, Q] of p) {
      if (Q.empty) continue;
      let [j, X] = st.split("|"),
        K = new _e(Q.geometry(!0), $[j]);
      if (
        ((K.name = "br_s" + j + "_" + X),
        (K.castShadow = !1),
        (K.receiveShadow = !0),
        (K.matrixAutoUpdate = !1),
        K.updateMatrix(),
        n.add(K),
        X !== "main")
      ) {
        let nt = u.get(X.slice(2));
        O.push([K, nt[0], nt[1]]);
      }
    }
  }
  for (let [G, q] of b) {
    if (q.empty) continue;
    let [W, V] = G.split("|"),
      Y = new _e(q.geometry(!0), r[W]);
    if (
      ((Y.name = "br_x" + W + "_" + V),
      (Y.castShadow = !0),
      (Y.receiveShadow = !0),
      (Y.matrixAutoUpdate = !1),
      Y.updateMatrix(),
      n.add(Y),
      V !== "main")
    ) {
      let $ = u.get(V.slice(2));
      O.push([Y, $[0], $[1]]);
    }
  }
  (f.clear(), p.clear(), b.clear(), u.clear());
  let D = 0;
  function U(G, q, W = 0.016) {
    if (!((D -= W) > 0)) {
      D = 0.25;
      for (let [V, Y, $] of O) V.visible = Math.hypot(Y - G, $ - q) < 1700;
    }
  }
  return { group: n, inst: c, colliders: h, night: l, update: U };
}
