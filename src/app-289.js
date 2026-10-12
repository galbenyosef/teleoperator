// app 289 — math
// Lines 140095-140862 of readable/app.pretty.js (statement-aligned).
function mI(i) {
  Xj(i);
  let t = i.terrain,
    e = i.meta.roads.curb ?? 0.15,
    s = i.EH,
    n = i.JH,
    o = i.HC,
    a = i.hk,
    r = i.edges,
    l = t.bounds,
    c = [t],
    h = -1,
    f = ($) => $.x0 + ($.nx - 1) * $.step,
    u = ($) => $.z0 + ($.nz - 1) * $.step;
  function d($, st) {
    let Q = t.regions;
    if (!Q || !Q.length) return t;
    if (Q.length !== h) {
      ((h = Q.length), (c = [t, ...Q]));
      for (let K of c) K.box = [K.x0, K.z0, f(K), u(K)];
    }
    let j = t,
      X = 1e18;
    for (let K of c) {
      let nt = K.box,
        Z = Math.max(0, nt[0] - $, $ - nt[2]),
        et = Math.max(0, nt[1] - st, st - nt[3]),
        tt = Z * Z + et * et;
      if (tt === 0) return K;
      tt < X && ((X = tt), (j = K));
    }
    return j;
  }
  let p = Object.values(h0)
    .filter(($) => !$.split)
    .map(($) => $.bounds);
  function m($, st, Q = null) {
    let j = d($, st),
      X = ($ - j.x0) / j.step,
      K = (st - j.z0) / j.step,
      nt = Math.min(j.nx - 2, Math.max(0, Math.floor(X))),
      Z = Math.min(j.nz - 2, Math.max(0, Math.floor(K))),
      et = Math.min(1, Math.max(0, X - nt)),
      tt = Math.min(1, Math.max(0, K - Z)),
      it = j.h,
      rt = j.nx,
      lt = it[Z * rt + nt],
      ct = it[Z * rt + nt + 1],
      dt = it[(Z + 1) * rt + nt],
      ut = it[(Z + 1) * rt + nt + 1],
      ot,
      at,
      yt;
    return (
      et >= tt
        ? ((at = ct - lt), (yt = ut - ct))
        : ((at = ut - dt), (yt = dt - lt)),
      (ot = lt + at * et + yt * tt),
      Q && ((Q.dx = at / j.step), (Q.dz = yt / j.step)),
      ot
    );
  }
  function g($, st) {
    let Q = d($, st),
      j = Math.min(Q.nx - 1, Math.max(0, Math.round(($ - Q.x0) / Q.step))),
      X = Math.min(Q.nz - 1, Math.max(0, Math.round((st - Q.z0) / Q.step)));
    return Q.cover[X * Q.nx + j];
  }
  let b = ($, st) =>
      ($ > l.x0 && $ < l.x1 && st > l.z0 && st < l.z1 && !cG($, st)) ||
      p.some((Q) => $ > Q.x0 && $ < Q.x1 && st > Q.z0 && st < Q.z1),
    x = { road: null, walk: null, all: [] },
    v = {},
    y = new Map(),
    M = new Map();
  function S($) {
    let st = M.get($);
    if (st !== void 0) return st;
    let Q = s.get($);
    if (((st = null), Q)) {
      y.clear();
      for (let K of Q) {
        let nt = Math.floor(K / 65536),
          Z = K % 65536,
          et = y.get(nt);
        et
          ? (Z < et[0] && (et[0] = Z), Z > et[1] && (et[1] = Z))
          : y.set(nt, [Z, Z]);
      }
      let j = new Set();
      for (let [K, nt] of [...y]) {
        let Z = r[K];
        if (!Z.region || nt[1] - nt[0] < 2) continue;
        let et = Z.D;
        for (let tt = nt[0] + 1; tt <= nt[1]; tt++)
          if (
            et[tt * 2] * et[nt[0] * 2] + et[tt * 2 + 1] * et[nt[0] * 2 + 1] <
            -0.5
          ) {
            (y.set(K, [nt[0], tt - 1]), y.set(K + 0.5, [tt, nt[1]]), j.add(K));
            break;
          }
      }
      st = new Float64Array(y.size * 7);
      let X = 0;
      for (let [K, [nt, Z]] of y) {
        let et = Math.floor(K),
          tt = r[et],
          it = tt.P,
          rt = tt.W,
          lt = 1e18,
          ct = 1e18,
          dt = -1e18,
          ut = -1e18,
          ot = 0;
        for (let at = nt; at <= Z + 1 && at < tt.n; at++) {
          let yt = it[at * 3],
            vt = it[at * 3 + 1];
          (yt < lt && (lt = yt),
            yt > dt && (dt = yt),
            vt < ct && (ct = vt),
            vt > ut && (ut = vt),
            rt[at] > ot && (ot = rt[at]));
        }
        ((ot += Math.max(0, tt.sw || 0) + 0.05),
          (st[X++] = j.has(et) ? et + 0.25 : et),
          (st[X++] = nt),
          (st[X++] = Z),
          (st[X++] = lt - ot),
          (st[X++] = ct - ot),
          (st[X++] = dt + ot),
          (st[X++] = ut + ot));
      }
    }
    return (M.set($, st), st);
  }
  function w($, st, Q) {
    let j = $._tri;
    if ((!j && $.tri && (j = $._tri = [$.tri]), !j)) {
      let X = $.polys.map((K) => {
        let { tris: nt, flat: Z } = Vl(K.map((tt) => tt.pts)),
          et = [];
        for (let tt of K)
          for (let it = 0; it < tt.y.length; it++) et.push(tt.y[it]);
        return { tris: nt, flat: Z, ys: et };
      });
      j = $._tri = X;
    }
    for (let { tris: X, flat: K, ys: nt } of j)
      for (let [Z, et, tt] of X) {
        let it = K[Z * 2],
          rt = K[Z * 2 + 1],
          lt = K[et * 2],
          ct = K[et * 2 + 1],
          dt = K[tt * 2],
          ut = K[tt * 2 + 1],
          ot = (ct - ut) * (it - dt) + (dt - lt) * (rt - ut);
        if (Math.abs(ot) < 1e-9) continue;
        let at = ((ct - ut) * (st - dt) + (dt - lt) * (Q - ut)) / ot,
          yt = ((ut - rt) * (st - dt) + (it - dt) * (Q - ut)) / ot,
          vt = 1 - at - yt;
        if (at < -1e-5 || yt < -1e-5 || vt < -1e-5) continue;
        let Pt = nt[Z],
          jt = nt[et],
          Wt = nt[tt],
          Ct =
            ((jt - Pt) * (ut - rt) - (Wt - Pt) * (ct - rt)) /
            ((lt - it) * (ut - rt) - (dt - it) * (ct - rt)),
          qt =
            ((Wt - Pt) * (lt - it) - (jt - Pt) * (dt - it)) /
            ((lt - it) * (ut - rt) - (dt - it) * (ct - rt));
        return [at * Pt + yt * jt + vt * Wt, Ct, qt];
      }
    return null;
  }
  let z = [-1, 0, 0, -1];
  function _($, st, Q, j) {
    for (let X = 0; X < 2; X++) {
      if (!$.mit[X] || (X ? j.s < $.L - 4 * j.w : j.s > 4 * j.w)) continue;
      let K = X ? $.n - 1 : 0,
        nt = X ? $.n - 2 : 0,
        Z = $.M[K * 2],
        et = $.M[K * 2 + 1],
        tt = Math.hypot(Z, et) || 1,
        it = et / tt,
        rt = -Z / tt,
        lt = $.D[nt * 2] * (X ? 1 : -1),
        ct = $.D[nt * 2 + 1] * (X ? 1 : -1);
      it * lt + rt * ct < 0 && ((it = -it), (rt = -rt));
      let dt = (st - $.P[K * 3]) * it + (Q - $.P[K * 3 + 1]) * rt;
      if (dt > 0) return [X ? $.jb : $.ja, dt, $.P[K * 3 + 2]];
      if (dt > -0.05)
        return (
          (z[0] = -1),
          (z[1] = dt),
          (z[2] = $.P[K * 3 + 2]),
          (z[3] = X ? $.jb : $.ja),
          z
        );
      let ut = X ? K - 1 : 0,
        ot = A($, ut, st, Q);
      if (ot !== null)
        return (
          (z[0] = -1),
          (z[1] = dt),
          (z[2] = ot),
          (z[3] = X ? $.jb : $.ja),
          z
        );
    }
    return null;
  }
  let R = {},
    T = {},
    E = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  function A($, st, Q, j) {
    if (st < 0 || st > $.n - 2) return null;
    let X = Math.max($.S[st], $.s0),
      K = Math.min($.S[st + 1], $.s1);
    if (K - X < 0.05) return null;
    (Ot($, X, R), Ot($, K, T));
    let nt = 0;
    for (let rt of [R, T])
      for (let lt of [-1, 1]) {
        let ct = E[nt++];
        ((ct[0] = rt.x + rt.nx * rt.w * lt),
          (ct[1] = rt.z + rt.nz * rt.w * lt),
          (ct[2] = rt.y));
      }
    let [Z, et, tt, it] = E;
    for (let rt = 0; rt < 2; rt++) {
      let lt = Z,
        ct = rt ? it : et,
        dt = rt ? tt : it,
        ut =
          (ct[1] - dt[1]) * (lt[0] - dt[0]) + (dt[0] - ct[0]) * (lt[1] - dt[1]);
      if (Math.abs(ut) < 1e-12) continue;
      let ot =
          ((ct[1] - dt[1]) * (Q - dt[0]) + (dt[0] - ct[0]) * (j - dt[1])) / ut,
        at =
          ((dt[1] - lt[1]) * (Q - dt[0]) + (lt[0] - dt[0]) * (j - dt[1])) / ut,
        yt = 1 - ot - at;
      if (ot >= -1e-4 && at >= -1e-4 && yt >= -1e-4)
        return ot * lt[2] + at * ct[2] + yt * dt[2];
    }
    return null;
  }
  function C($, st) {
    ((x.road = null), (x.walk = null), (x.all.length = 0));
    let Q = a(Math.floor($ / o), Math.floor(st / o)),
      j = null,
      X = n.get(Q);
    if (X)
      for (let nt of X) {
        if ($ < nt.bb[0] || $ > nt.bb[2] || st < nt.bb[1] || st > nt.bb[3])
          continue;
        let Z = !1;
        for (let ct of nt.polys)
          if (Sb(ct, $, st)) {
            Z = !0;
            break;
          }
        if (!Z) continue;
        let et = nt.y,
          tt = 0,
          it = 0,
          rt = null;
        if (!nt.flat) {
          let ct = 1e9;
          for (let [dt] of nt.legs)
            (vs(dt, $, st, v),
              v.d < ct &&
                ((ct = v.d),
                (et = v.y),
                (tt = v.gy * v.dx),
                (it = v.gy * v.dz),
                (rt = dt)));
          if (nt.region && nt.type === "x" && nt.legs.length > 2) {
            let dt = 0,
              ut = 0;
            for (let [ot] of nt.legs) {
              vs(ot, $, st, v);
              let at = v.d * v.d,
                yt = 1 / (at * at + 0.05);
              ((dt += yt), (ut += yt * v.y));
            }
            et = ut / dt;
          }
        }
        if (nt.plate) {
          let ct = w(nt, $, st);
          ct && ((et = ct[0]), (tt = ct[1]), (it = ct[2]));
        }
        let lt = {
          y: et,
          dx: tt,
          dz: it,
          J: nt,
          E: rt || (nt.legs[0] && nt.legs[0][0]),
          layered: nt.layered,
        };
        (x.all.push(lt), !nt.layered && !j && (j = lt));
      }
    let K = S(Q);
    if (K) {
      let nt = 1e9;
      for (let Z = 0; Z < K.length; Z += 7) {
        if ($ < K[Z + 3] || st < K[Z + 4] || $ > K[Z + 5] || st > K[Z + 6])
          continue;
        let et = Math.floor(K[Z]),
          tt = K[Z + 1],
          it = K[Z + 2],
          rt = r[et];
        if (
          !rt.inner &&
          (vs(rt, $, st, v, tt, it),
          !(
            K[Z] !== et &&
            ((tt > 0 && v.s < rt.S[tt] + 0.02) ||
              (it + 1 < rt.n - 1 && v.s > rt.S[it + 1] - 0.02))
          ))
        ) {
          if (v.d <= v.w) {
            if (
              v.s >= rt.s0 - 0.02 &&
              v.s <= rt.s1 + 0.02 &&
              !(
                (rt.tunnel ||
                  (rt.atPortal &&
                    (v.s < 0.01
                      ? rt.atPortal[0]
                      : v.s > rt.L - 0.01 && rt.atPortal[1]))) &&
                (v.s < 0.01 || v.s > rt.L - 0.01) &&
                v.d > Math.abs(v.v) + 0.3
              )
            ) {
              let lt = v.y,
                ct = null;
              rt.mit && (ct = _(rt, $, st, v));
              let dt = null;
              if (ct)
                ((lt = ct[2]),
                  (dt = [ct[0] < 0 ? ct[3] : ct[0], ct[1]]),
                  ct[0] < 0 && (ct = null));
              else if (
                rt.layered &&
                !rt.tunnelR &&
                v.s > 0.01 &&
                v.s < rt.L - 0.01
              ) {
                let ot =
                  A(rt, v.k, $, st) ??
                  A(rt, v.k - 1, $, st) ??
                  A(rt, v.k + 1, $, st);
                ot !== null && (lt = ot);
              } else if (rt.layered && (v.s < 0.01 || v.s > rt.L - 0.01)) {
                let ot = Math.sqrt(Math.max(0, v.d * v.d - v.v * v.v)),
                  at = v.s < 0.01 ? 0 : 1;
                ((lt += v.gy * (at ? ot : -ot)),
                  (ct = [at ? rt.jb : rt.ja, ot]));
              }
              let ut = {
                y: lt,
                dx: v.gy * v.dx,
                dz: v.gy * v.dz,
                E: rt,
                s: v.s,
                v: v.v,
                layered: rt.layered,
                past: ct,
                ma: dt,
              };
              (x.all.push(ut),
                !rt.layered &&
                  !ct &&
                  (!x.road || Math.abs(v.v) < Math.abs(x.road.v)) &&
                  (x.road = ut));
            }
          } else if (
            !rt.layered &&
            !rt.hwy &&
            rt.sw > 0 &&
            v.d <= v.w + rt.sw
          ) {
            let lt = v.d - v.w;
            lt < nt &&
              ((nt = lt),
              (x.walk = {
                y: rt.walkY ? rt.walkY($, st, v.y) : v.y + e,
                dx: v.gy * v.dx,
                dz: v.gy * v.dz,
                E: rt,
                s: v.s,
                v: v.v,
                past: v.s < 0.01 || v.s > rt.L - 0.01,
              }));
          }
        }
      }
    }
    for (let nt = x.all.length - 1; nt >= 0; nt--) {
      let Z = x.all[nt];
      if (!Z.ma) continue;
      let et = Z.ma[0];
      x.all.some(
        (tt) =>
          tt !== Z &&
          tt.ma &&
          tt.E !== Z.E &&
          tt.ma[0] === et &&
          Math.abs(tt.y - Z.y) < 0.5 &&
          tt.ma[1] < Z.ma[1],
      ) && x.all.splice(nt, 1);
    }
    for (let nt = x.all.length - 1; nt >= 0; nt--) {
      let Z = x.all[nt];
      if (!Z.past) continue;
      let et = Z.past[0];
      et < 0 ||
        i.juns[et].legs.length !== 2 ||
        (x.all.some(
          (tt) =>
            tt !== Z &&
            !tt.J &&
            tt.E &&
            tt.E !== Z.E &&
            (tt.E.ja === et || tt.E.jb === et) &&
            Math.abs(tt.y - Z.y) < 0.5 &&
            (!tt.past || (tt.past[0] === et && tt.past[1] < Z.past[1])),
        ) &&
          x.all.splice(nt, 1));
    }
    return (x.road || (x.road = j), x);
  }
  function P($, st) {
    let Q = i.pads;
    if (!Q) return null;
    for (let j of Q)
      if (
        $ >= j.bb[0] &&
        $ <= j.bb[2] &&
        st >= j.bb[1] &&
        st <= j.bb[3] &&
        en(j.poly, $, st)
      )
        return j;
    return null;
  }
  let I = { dx: 0, dz: 0 };
  function L($, st, Q = null, j = void 0) {
    if (b($, st)) C($, st);
    else if ((C($, st), !x.all.length)) return m($, st, Q);
    if (j !== void 0) {
      let K = d($, st);
      if (
        K.inTube?.($, st) &&
        !x.all.some(
          (nt) => nt.E && !nt.E.tunnelR && !nt.J && Math.abs(nt.y - j) < 0.5,
        )
      ) {
        for (let Z of x.all) {
          let et = Z.E?.tunnelR;
          if (et && !et.tn.open && j > Z.y - 1.5 && j < Z.y + a7(et) - 0.3)
            return (Q && ((Q.dx = Z.dx), (Q.dz = Z.dz)), Z.y);
        }
        let nt = GW(K, $, st, j, Q);
        if (nt !== null) return nt;
      }
    }
    let X = x.road || x.walk;
    if (x.road && !x.road.layered) {
      let K = $d($, st, Q ? I : null);
      if (
        K !== null &&
        K > x.road.y + 0.02 &&
        K < x.road.y + 0.35 &&
        (j === void 0 || (j < K + 1 && j > x.road.y - 1.5))
      )
        return (Q && ((Q.dx = I.dx), (Q.dz = I.dz)), K);
    }
    if (!x.road) {
      let K = Q ? I : null,
        nt = $d($, st, K);
      if (
        nt !== null &&
        Math.abs(nt - (x.walk ? x.walk.y : m($, st))) < 1.2 &&
        (j === void 0 ||
          (nt <= j + 1.2 &&
            j < nt + 1 + (x.all.length ? 0 : 1e9) &&
            !x.all.some(
              (Z) => Z.y > nt + 0.05 && Z.y <= j + 1.2 && Z.y > j - 1.5,
            ) &&
            !x.all.some((Z) => Z.layered && Z.y < nt - 0.4 && Z.y > j - 1.5)))
      )
        return (Q && ((Q.dx = I.dx), (Q.dz = I.dz)), nt);
    }
    if (!X && i.pads) {
      let K = P($, st);
      if (K) {
        let nt = K.y($, st);
        return (
          Q &&
            ((Q.dx = (K.y($ + 0.5, st) - nt) * 2),
            (Q.dz = (K.y($, st + 0.5) - nt) * 2)),
          nt
        );
      }
    }
    if (j !== void 0 && x.all.length > (x.road ? 1 : 0)) {
      let K = null,
        nt = null,
        Z = X ? X.y : m($, st),
        et = X
          ? x.all.concat(
              x.road ||
                x.all.some((it) => it.layered && Math.abs(it.y - X.y) < 0.6) ||
                (X.past && x.all.some((it) => it.layered))
                ? []
                : [X],
            )
          : x.all.length && (d?.($, st)?.inTube ?? i.terrain.inTube)?.($, st)
            ? x.all
            : x.all.concat([{ y: Z, dx: 0, dz: 0, terrain: !0 }]);
      for (let it of et)
        (it.y <= j + 1.2 && (!K || it.y > K.y) && (K = it),
          (!nt || it.y < nt.y) && (nt = it));
      let tt = K || nt;
      return tt.terrain
        ? m($, st, Q)
        : (Q && ((Q.dx = tt.dx), (Q.dz = tt.dz)), tt.y);
    }
    if (X) return (Q && ((Q.dx = X.dx), (Q.dz = X.dz)), X.y);
    if (x.all.length && (!b($, st) || g($, st) & 8)) {
      let K = x.all[0];
      for (let nt of x.all) nt.y > K.y && (K = nt);
      return (Q && ((Q.dx = K.dx), (Q.dz = K.dz)), K.y);
    }
    return m($, st, Q);
  }
  function F($, st) {
    if (!b($, st)) return (C($, st), x.all.length ? "road" : "out");
    if ((C($, st), x.road)) return "road";
    if (x.walk || (i.pads && P($, st))) return "walk";
    let Q = g($, st);
    return Q & 8
      ? x.all.length
        ? "road"
        : "sea"
      : ((Q &= 7), Q === 1 || Q === 2 ? "park" : Q === 3 ? "sand" : "lot");
  }
  let N = {};
  function B($, st, Q = 25, j = void 0, X = !1, K = null) {
    let nt = null,
      Z = K ? N : {};
    for (let et = Math.floor(($ - Q) / o); et <= Math.floor(($ + Q) / o); et++)
      for (
        let tt = Math.floor((st - Q) / o);
        tt <= Math.floor((st + Q) / o);
        tt++
      ) {
        let it = s.get(a(et, tt));
        if (it)
          for (let rt of it) {
            let lt = r[Math.floor(rt / 65536)],
              ct = rt % 65536;
            if (lt.inner) continue;
            {
              let ut = lt.P,
                ot = ut[ct * 3],
                at = ut[ct * 3 + 1],
                yt = lt.D[ct * 2],
                vt = lt.D[ct * 2 + 1],
                Pt = lt.S[ct + 1] - lt.S[ct],
                jt = ($ - ot) * yt + (st - at) * vt;
              jt = jt < 0 ? 0 : jt > Pt ? Pt : jt;
              let Wt =
                Math.sqrt(($ - ot - yt * jt) ** 2 + (st - at - vt * jt) ** 2) -
                Math.max(lt.W[ct], lt.W[ct + 1]) -
                1e-6;
              if (Wt > Q || (nt && Wt > nt.dd)) continue;
            }
            vs(lt, $, st, Z, ct, ct);
            let dt = Z.d - Z.w;
            (j !== void 0 && Math.abs(Z.y - j) > 3) ||
              (lt.tunnel && j === void 0) ||
              (dt <= Q &&
                (!nt || dt < nt.dd) &&
                (K
                  ? ((nt = K),
                    (K.E = lt),
                    (K.s = Z.s),
                    (K.v = Z.v),
                    (K.d = Z.d),
                    (K.y = Z.y),
                    (K.w = Z.w),
                    (K.dd = dt),
                    (K.dx = Z.dx),
                    (K.dz = Z.dz))
                  : (nt = {
                      E: lt,
                      s: Z.s,
                      v: Z.v,
                      d: Z.d,
                      y: Z.y,
                      w: Z.w,
                      dd: dt,
                      dx: Z.dx,
                      dz: Z.dz,
                    })));
          }
      }
    if (nt && X) ((nt.onRoad = nt.dd <= 0), (nt.J = null));
    else if (nt) {
      ((nt.onRoad = nt.dd <= 0), C($, st));
      let et = x.road && x.road.J;
      nt.J = et && (j === void 0 || Math.abs(et.y - j) < 3) ? et : null;
    } else if (j !== void 0) return B($, st, Q, void 0, !1, K);
    return nt;
  }
  function H($, st) {
    if ((C($, st), x.road)) return x.road.y;
    if (x.walk) return x.walk.y - e;
    let Q = B($, st, 12);
    return Q ? Q.y : m($, st);
  }
  function O($, st, Q, j, X = void 0) {
    let K = B($, st, 20, X);
    if (!K) return { name: "", next: "" };
    let nt = K.E;
    if (K.J) {
      let lt = -2;
      for (let [ct, dt] of K.J.legs) {
        let ut = Ot(
            ct,
            dt === "a"
              ? Math.min(ct.L, ct.ta + 2)
              : Math.max(0, ct.L - ct.tb - 2),
            {},
          ),
          ot = ut.x - K.J.x,
          at = ut.z - K.J.z,
          yt = Math.hypot(ot, at) || 1,
          vt = (ot * Q + at * j) / yt;
        vt > lt && ct.name && ((lt = vt), (nt = ct));
      }
    }
    let Z = nt.name || K.E.name,
      et = Ot(nt, nt === K.E ? Math.min(nt.L, Math.max(0, K.s)) : nt.L / 2, {}),
      tt = et.dx * Q + et.dz * j >= 0,
      it = i.juns[tt ? nt.jb : nt.ja],
      rt = "";
    for (let lt = 0; lt < 6 && it; lt++) {
      let ct = it.legs
        .map(([at]) => at)
        .filter((at) => at !== nt && at.name && at.name !== nt.name)
        .sort((at, yt) => yt.rank - at.rank);
      if (ct.length && (ct[0].rank >= 2.5 || lt >= 3)) {
        rt = ct[0].name;
        break;
      }
      let dt = it.legs.find(([at]) => at !== nt && at.name === nt.name);
      if (!dt) break;
      let [ut, ot] = dt;
      ((nt = ut), (it = i.juns[ot === "a" ? ut.jb : ut.ja]));
    }
    return { name: Z, next: rt };
  }
  let D = ($, st, Q = void 0) => {
      let j = B($, st, 20, Q);
      return j ? j.E.name : "";
    },
    U = Array.from({ length: 16 }, ($, st) =>
      (st & 1 ? Math.sin : Math.cos)(((st >> 1) * Math.PI) / 4),
    );
  function G($, st, Q = 0, j = !1) {
    let X = a(Math.floor($ / o), Math.floor(st / o)),
      K = n.get(X);
    if (K) {
      for (let Z of K)
        if (!(
          Z.layered ||
          $ < Z.bb[0] - Q ||
          $ > Z.bb[2] + Q ||
          st < Z.bb[1] - Q ||
          st > Z.bb[3] + Q
        )) {
          for (let et of Z.polys)
            for (let tt = -1; tt < (Q > 0 ? 8 : 0); tt++)
              if (
                Sb(
                  et,
                  $ + (tt < 0 ? 0 : Q * U[tt * 2]),
                  st + (tt < 0 ? 0 : Q * U[tt * 2 + 1]),
                )
              )
                return !1;
        }
    }
    let nt = S(X);
    if (!nt) return !0;
    for (let Z = 0; Z < nt.length; Z += 7) {
      if (
        $ < nt[Z + 3] - Q ||
        st < nt[Z + 4] - Q ||
        $ > nt[Z + 5] + Q ||
        st > nt[Z + 6] + Q
      )
        continue;
      let et = r[Math.floor(nt[Z])];
      if (
        !(et.inner || et.layered || et.tunnel) &&
        (vs(et, $, st, v, nt[Z + 1], nt[Z + 2]),
        !(v.s < et.s0 - Q || v.s > et.s1 + Q) &&
          !(et.median && v.d + Q < 1.6) &&
          (v.d < v.w + Q || (j && !et.hwy && v.d < v.w + et.sw + Q * 0.5)))
      )
        return !1;
    }
    return !0;
  }
  let q = ($, st) => {
      if (!i.pads) return 0;
      let Q = P($, st);
      return (Q && Q.cap) || 0;
    },
    W = {};
  function V($, st) {
    let Q = i.dropped;
    if (!Q) return 0;
    let j = 0;
    for (let X of Q) {
      if (
        (vs(X, $, st, W), W.d > W.w + (X.sw || 0) + 3 || W.s <= 0 || W.s >= X.L)
      )
        continue;
      let K = 0;
      for (; K + 2 < X.n && X.S[K + 1] < W.s;) K++;
      let nt = (W.s - X.S[K]) / Math.max(1e-6, X.S[K + 1] - X.S[K]);
      j = Math.max(j, X.drop[K] + (X.drop[K + 1] - X.drop[K]) * nt);
    }
    return j;
  }
  let Y = {
    terrainAt: m,
    coverAt: g,
    driveHeight: L,
    surfaceAt: F,
    roadAt: B,
    streetName: D,
    streetY: H,
    streetInfo: O,
    probe: C,
    inWorld: b,
    clearOfRoads: G,
    zoneCap: q,
    gridAt: d,
    dropAt: V,
    CURB: e,
    bounds: l,
    regionBounds: p,
  };
  return (gj(i, Y), Y);
}
