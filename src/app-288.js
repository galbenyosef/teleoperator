// app 288 — math
// Lines 140372-141139 of readable/app.pretty.js (statement-aligned).
function qF(o) {
  J$(o);
  let t = o.terrain,
    e = o.meta.roads.curb ?? 0.15,
    s = o.EH,
    n = o.JH,
    i = o.HC,
    a = o.hk,
    r = o.edges,
    l = t.bounds,
    c = [t],
    h = -1,
    f = (X) => X.x0 + (X.nx - 1) * X.step,
    u = (X) => X.z0 + (X.nz - 1) * X.step;
  function d(X, tt) {
    let Z = t.regions;
    if (!Z || !Z.length) return t;
    if (Z.length !== h) {
      ((h = Z.length), (c = [t, ...Z]));
      for (let K of c) K.box = [K.x0, K.z0, f(K), u(K)];
    }
    let q = t,
      j = 1e18;
    for (let K of c) {
      let nt = K.box,
        Q = Math.max(0, nt[0] - X, X - nt[2]),
        et = Math.max(0, nt[1] - tt, tt - nt[3]),
        st = Q * Q + et * et;
      if (st === 0) return K;
      st < j && ((j = st), (q = K));
    }
    return q;
  }
  let p = Object.values(z0)
    .filter((X) => !X.split)
    .map((X) => X.bounds);
  function m(X, tt, Z = null) {
    let q = d(X, tt),
      j = (X - q.x0) / q.step,
      K = (tt - q.z0) / q.step,
      nt = Math.min(q.nx - 2, Math.max(0, Math.floor(j))),
      Q = Math.min(q.nz - 2, Math.max(0, Math.floor(K))),
      et = Math.min(1, Math.max(0, j - nt)),
      st = Math.min(1, Math.max(0, K - Q)),
      ot = q.h,
      rt = q.nx,
      lt = ot[Q * rt + nt],
      ht = ot[Q * rt + nt + 1],
      pt = ot[(Q + 1) * rt + nt],
      ut = ot[(Q + 1) * rt + nt + 1],
      it,
      at,
      yt;
    return (
      et >= st
        ? ((at = ht - lt), (yt = ut - ht))
        : ((at = ut - pt), (yt = pt - lt)),
      (it = lt + at * et + yt * st),
      Z && ((Z.dx = at / q.step), (Z.dz = yt / q.step)),
      it
    );
  }
  function g(X, tt) {
    let Z = d(X, tt),
      q = Math.min(Z.nx - 1, Math.max(0, Math.round((X - Z.x0) / Z.step))),
      j = Math.min(Z.nz - 1, Math.max(0, Math.round((tt - Z.z0) / Z.step)));
    return Z.cover[j * Z.nx + q];
  }
  let b = (X, tt) =>
      (X > l.x0 && X < l.x1 && tt > l.z0 && tt < l.z1 && !fW(X, tt)) ||
      p.some((Z) => X > Z.x0 && X < Z.x1 && tt > Z.z0 && tt < Z.z1),
    v = { road: null, walk: null, all: [] },
    x = {},
    y = new Map(),
    M = new Map();
  function S(X) {
    let tt = M.get(X);
    if (tt !== void 0) return tt;
    let Z = s.get(X);
    if (((tt = null), Z)) {
      y.clear();
      for (let K of Z) {
        let nt = Math.floor(K / 65536),
          Q = K % 65536,
          et = y.get(nt);
        et
          ? (Q < et[0] && (et[0] = Q), Q > et[1] && (et[1] = Q))
          : y.set(nt, [Q, Q]);
      }
      let q = new Set();
      for (let [K, nt] of [...y]) {
        let Q = r[K];
        if (!Q.region || nt[1] - nt[0] < 2) continue;
        let et = Q.D;
        for (let st = nt[0] + 1; st <= nt[1]; st++)
          if (
            et[st * 2] * et[nt[0] * 2] + et[st * 2 + 1] * et[nt[0] * 2 + 1] <
            -0.5
          ) {
            (y.set(K, [nt[0], st - 1]), y.set(K + 0.5, [st, nt[1]]), q.add(K));
            break;
          }
      }
      tt = new Float64Array(y.size * 7);
      let j = 0;
      for (let [K, [nt, Q]] of y) {
        let et = Math.floor(K),
          st = r[et],
          ot = st.P,
          rt = st.W,
          lt = 1e18,
          ht = 1e18,
          pt = -1e18,
          ut = -1e18,
          it = 0;
        for (let at = nt; at <= Q + 1 && at < st.n; at++) {
          let yt = ot[at * 3],
            vt = ot[at * 3 + 1];
          (yt < lt && (lt = yt),
            yt > pt && (pt = yt),
            vt < ht && (ht = vt),
            vt > ut && (ut = vt),
            rt[at] > it && (it = rt[at]));
        }
        ((it += Math.max(0, st.sw || 0) + 0.05),
          (tt[j++] = q.has(et) ? et + 0.25 : et),
          (tt[j++] = nt),
          (tt[j++] = Q),
          (tt[j++] = lt - it),
          (tt[j++] = ht - it),
          (tt[j++] = pt + it),
          (tt[j++] = ut + it));
      }
    }
    return (M.set(X, tt), tt);
  }
  function w(X, tt, Z) {
    let q = X._tri;
    if ((!q && X.tri && (q = X._tri = [X.tri]), !q)) {
      let j = X.polys.map((K) => {
        let { tris: nt, flat: Q } = dc(K.map((st) => st.pts)),
          et = [];
        for (let st of K)
          for (let ot = 0; ot < st.y.length; ot++) et.push(st.y[ot]);
        return { tris: nt, flat: Q, ys: et };
      });
      q = X._tri = j;
    }
    for (let { tris: j, flat: K, ys: nt } of q)
      for (let [Q, et, st] of j) {
        let ot = K[Q * 2],
          rt = K[Q * 2 + 1],
          lt = K[et * 2],
          ht = K[et * 2 + 1],
          pt = K[st * 2],
          ut = K[st * 2 + 1],
          it = (ht - ut) * (ot - pt) + (pt - lt) * (rt - ut);
        if (Math.abs(it) < 1e-9) continue;
        let at = ((ht - ut) * (tt - pt) + (pt - lt) * (Z - ut)) / it,
          yt = ((ut - rt) * (tt - pt) + (ot - pt) * (Z - ut)) / it,
          vt = 1 - at - yt;
        if (at < -1e-5 || yt < -1e-5 || vt < -1e-5) continue;
        let At = nt[Q],
          Ut = nt[et],
          Gt = nt[st],
          Pt =
            ((Ut - At) * (ut - rt) - (Gt - At) * (ht - rt)) /
            ((lt - ot) * (ut - rt) - (pt - ot) * (ht - rt)),
          Vt =
            ((Gt - At) * (lt - ot) - (Ut - At) * (pt - ot)) /
            ((lt - ot) * (ut - rt) - (pt - ot) * (ht - rt));
        return [at * At + yt * Ut + vt * Gt, Pt, Vt];
      }
    return null;
  }
  let _ = [-1, 0, 0, -1];
  function z(X, tt, Z, q) {
    for (let j = 0; j < 2; j++) {
      if (!X.mit[j] || (j ? q.s < X.L - 4 * q.w : q.s > 4 * q.w)) continue;
      let K = j ? X.n - 1 : 0,
        nt = j ? X.n - 2 : 0,
        Q = X.M[K * 2],
        et = X.M[K * 2 + 1],
        st = Math.hypot(Q, et) || 1,
        ot = et / st,
        rt = -Q / st,
        lt = X.D[nt * 2] * (j ? 1 : -1),
        ht = X.D[nt * 2 + 1] * (j ? 1 : -1);
      ot * lt + rt * ht < 0 && ((ot = -ot), (rt = -rt));
      let pt = (tt - X.P[K * 3]) * ot + (Z - X.P[K * 3 + 1]) * rt;
      if (pt > 0) return [j ? X.jb : X.ja, pt, X.P[K * 3 + 2]];
      if (pt > -0.05)
        return (
          (_[0] = -1),
          (_[1] = pt),
          (_[2] = X.P[K * 3 + 2]),
          (_[3] = j ? X.jb : X.ja),
          _
        );
      let ut = j ? K - 1 : 0,
        it = R(X, ut, tt, Z);
      if (it !== null)
        return (
          (_[0] = -1),
          (_[1] = pt),
          (_[2] = it),
          (_[3] = j ? X.jb : X.ja),
          _
        );
    }
    return null;
  }
  let A = {},
    T = {},
    E = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  function R(X, tt, Z, q) {
    if (tt < 0 || tt > X.n - 2) return null;
    let j = Math.max(X.S[tt], X.s0),
      K = Math.min(X.S[tt + 1], X.s1);
    if (K - j < 0.05) return null;
    (Ot(X, j, A), Ot(X, K, T));
    let nt = 0;
    for (let rt of [A, T])
      for (let lt of [-1, 1]) {
        let ht = E[nt++];
        ((ht[0] = rt.x + rt.nx * rt.w * lt),
          (ht[1] = rt.z + rt.nz * rt.w * lt),
          (ht[2] = rt.y));
      }
    let [Q, et, st, ot] = E;
    for (let rt = 0; rt < 2; rt++) {
      let lt = Q,
        ht = rt ? ot : et,
        pt = rt ? st : ot,
        ut =
          (ht[1] - pt[1]) * (lt[0] - pt[0]) + (pt[0] - ht[0]) * (lt[1] - pt[1]);
      if (Math.abs(ut) < 1e-12) continue;
      let it =
          ((ht[1] - pt[1]) * (Z - pt[0]) + (pt[0] - ht[0]) * (q - pt[1])) / ut,
        at =
          ((pt[1] - lt[1]) * (Z - pt[0]) + (lt[0] - pt[0]) * (q - pt[1])) / ut,
        yt = 1 - it - at;
      if (it >= -1e-4 && at >= -1e-4 && yt >= -1e-4)
        return it * lt[2] + at * ht[2] + yt * pt[2];
    }
    return null;
  }
  function P(X, tt) {
    ((v.road = null), (v.walk = null), (v.all.length = 0));
    let Z = a(Math.floor(X / i), Math.floor(tt / i)),
      q = null,
      j = n.get(Z);
    if (j)
      for (let nt of j) {
        if (X < nt.bb[0] || X > nt.bb[2] || tt < nt.bb[1] || tt > nt.bb[3])
          continue;
        let Q = !1;
        for (let ht of nt.polys)
          if (cx(ht, X, tt)) {
            Q = !0;
            break;
          }
        if (!Q) continue;
        let et = nt.y,
          st = 0,
          ot = 0,
          rt = null;
        if (!nt.flat) {
          let ht = 1e9;
          for (let [pt] of nt.legs)
            (ys(pt, X, tt, x),
              x.d < ht &&
                ((ht = x.d),
                (et = x.y),
                (st = x.gy * x.dx),
                (ot = x.gy * x.dz),
                (rt = pt)));
          if (nt.region && nt.type === "x" && nt.legs.length > 2) {
            let pt = 0,
              ut = 0;
            for (let [it] of nt.legs) {
              ys(it, X, tt, x);
              let at = x.d * x.d,
                yt = 1 / (at * at + 0.05);
              ((pt += yt), (ut += yt * x.y));
            }
            et = ut / pt;
          }
        }
        if (nt.plate) {
          let ht = w(nt, X, tt);
          ht && ((et = ht[0]), (st = ht[1]), (ot = ht[2]));
        }
        let lt = {
          y: et,
          dx: st,
          dz: ot,
          J: nt,
          E: rt || (nt.legs[0] && nt.legs[0][0]),
          layered: nt.layered,
        };
        (v.all.push(lt), !nt.layered && !q && (q = lt));
      }
    let K = S(Z);
    if (K) {
      let nt = 1e9;
      for (let Q = 0; Q < K.length; Q += 7) {
        if (X < K[Q + 3] || tt < K[Q + 4] || X > K[Q + 5] || tt > K[Q + 6])
          continue;
        let et = Math.floor(K[Q]),
          st = K[Q + 1],
          ot = K[Q + 2],
          rt = r[et];
        if (
          !rt.inner &&
          (ys(rt, X, tt, x, st, ot),
          !(
            K[Q] !== et &&
            ((st > 0 && x.s < rt.S[st] + 0.02) ||
              (ot + 1 < rt.n - 1 && x.s > rt.S[ot + 1] - 0.02))
          ))
        ) {
          if (x.d <= x.w) {
            if (
              x.s >= rt.s0 - 0.02 &&
              x.s <= rt.s1 + 0.02 &&
              !(
                (rt.tunnel ||
                  (rt.atPortal &&
                    (x.s < 0.01
                      ? rt.atPortal[0]
                      : x.s > rt.L - 0.01 && rt.atPortal[1]))) &&
                (x.s < 0.01 || x.s > rt.L - 0.01) &&
                x.d > Math.abs(x.v) + 0.3
              )
            ) {
              let lt = x.y,
                ht = null;
              rt.mit && (ht = z(rt, X, tt, x));
              let pt = null;
              if (ht)
                ((lt = ht[2]),
                  (pt = [ht[0] < 0 ? ht[3] : ht[0], ht[1]]),
                  ht[0] < 0 && (ht = null));
              else if (
                rt.layered &&
                !rt.tunnelR &&
                x.s > 0.01 &&
                x.s < rt.L - 0.01
              ) {
                let it =
                  R(rt, x.k, X, tt) ??
                  R(rt, x.k - 1, X, tt) ??
                  R(rt, x.k + 1, X, tt);
                it !== null && (lt = it);
              } else if (rt.layered && (x.s < 0.01 || x.s > rt.L - 0.01)) {
                let it = Math.sqrt(Math.max(0, x.d * x.d - x.v * x.v)),
                  at = x.s < 0.01 ? 0 : 1;
                ((lt += x.gy * (at ? it : -it)),
                  (ht = [at ? rt.jb : rt.ja, it]));
              }
              let ut = {
                y: lt,
                dx: x.gy * x.dx,
                dz: x.gy * x.dz,
                E: rt,
                s: x.s,
                v: x.v,
                layered: rt.layered,
                past: ht,
                ma: pt,
              };
              (v.all.push(ut),
                !rt.layered &&
                  !ht &&
                  (!v.road || Math.abs(x.v) < Math.abs(v.road.v)) &&
                  (v.road = ut));
            }
          } else if (
            !rt.layered &&
            !rt.hwy &&
            rt.sw > 0 &&
            x.d <= x.w + rt.sw
          ) {
            let lt = x.d - x.w;
            lt < nt &&
              ((nt = lt),
              (v.walk = {
                y: rt.walkY ? rt.walkY(X, tt, x.y) : x.y + e,
                dx: x.gy * x.dx,
                dz: x.gy * x.dz,
                E: rt,
                s: x.s,
                v: x.v,
                past: x.s < 0.01 || x.s > rt.L - 0.01,
              }));
          }
        }
      }
    }
    for (let nt = v.all.length - 1; nt >= 0; nt--) {
      let Q = v.all[nt];
      if (!Q.ma) continue;
      let et = Q.ma[0];
      v.all.some(
        (st) =>
          st !== Q &&
          st.ma &&
          st.E !== Q.E &&
          st.ma[0] === et &&
          Math.abs(st.y - Q.y) < 0.5 &&
          st.ma[1] < Q.ma[1],
      ) && v.all.splice(nt, 1);
    }
    for (let nt = v.all.length - 1; nt >= 0; nt--) {
      let Q = v.all[nt];
      if (!Q.past) continue;
      let et = Q.past[0];
      et < 0 ||
        o.juns[et].legs.length !== 2 ||
        (v.all.some(
          (st) =>
            st !== Q &&
            !st.J &&
            st.E &&
            st.E !== Q.E &&
            (st.E.ja === et || st.E.jb === et) &&
            Math.abs(st.y - Q.y) < 0.5 &&
            (!st.past || (st.past[0] === et && st.past[1] < Q.past[1])),
        ) &&
          v.all.splice(nt, 1));
    }
    return (v.road || (v.road = q), v);
  }
  function C(X, tt) {
    let Z = o.pads;
    if (!Z) return null;
    for (let q of Z)
      if (
        X >= q.bb[0] &&
        X <= q.bb[2] &&
        tt >= q.bb[1] &&
        tt <= q.bb[3] &&
        rn(q.poly, X, tt)
      )
        return q;
    return null;
  }
  let I = { dx: 0, dz: 0 };
  function L(X, tt, Z = null, q = void 0) {
    if (b(X, tt)) P(X, tt);
    else if ((P(X, tt), !v.all.length)) return m(X, tt, Z);
    if (q !== void 0) {
      let K = d(X, tt);
      if (
        K.inTube?.(X, tt) &&
        !v.all.some(
          (nt) => nt.E && !nt.E.tunnelR && !nt.J && Math.abs(nt.y - q) < 0.5,
        )
      ) {
        for (let Q of v.all) {
          let et = Q.E?.tunnelR;
          if (et && !et.tn.open && q > Q.y - 1.5 && q < Q.y + OP(et) - 0.3)
            return (Z && ((Z.dx = Q.dx), (Z.dz = Q.dz)), Q.y);
        }
        let nt = Wq(K, X, tt, q, Z);
        if (nt !== null) return nt;
      }
    }
    let j = v.road || v.walk;
    if (v.road && !v.road.layered) {
      let K = zp(X, tt, Z ? I : null);
      if (
        K !== null &&
        K > v.road.y + 0.02 &&
        K < v.road.y + 0.35 &&
        (q === void 0 || (q < K + 1 && q > v.road.y - 1.5))
      )
        return (Z && ((Z.dx = I.dx), (Z.dz = I.dz)), K);
    }
    if (!v.road) {
      let K = Z ? I : null,
        nt = zp(X, tt, K);
      if (
        nt !== null &&
        Math.abs(nt - (v.walk ? v.walk.y : m(X, tt))) < 1.2 &&
        (q === void 0 ||
          (nt <= q + 1.2 &&
            q < nt + 1 + (v.all.length ? 0 : 1e9) &&
            !v.all.some(
              (Q) => Q.y > nt + 0.05 && Q.y <= q + 1.2 && Q.y > q - 1.5,
            ) &&
            !v.all.some((Q) => Q.layered && Q.y < nt - 0.4 && Q.y > q - 1.5)))
      )
        return (Z && ((Z.dx = I.dx), (Z.dz = I.dz)), nt);
    }
    if (!j && o.pads) {
      let K = C(X, tt);
      if (K) {
        let nt = K.y(X, tt);
        return (
          Z &&
            ((Z.dx = (K.y(X + 0.5, tt) - nt) * 2),
            (Z.dz = (K.y(X, tt + 0.5) - nt) * 2)),
          nt
        );
      }
    }
    if (q !== void 0 && v.all.length > (v.road ? 1 : 0)) {
      let K = null,
        nt = null,
        Q = j ? j.y : m(X, tt),
        et = j
          ? v.all.concat(
              v.road ||
                v.all.some((ot) => ot.layered && Math.abs(ot.y - j.y) < 0.6) ||
                (j.past && v.all.some((ot) => ot.layered))
                ? []
                : [j],
            )
          : v.all.length && (d?.(X, tt)?.inTube ?? o.terrain.inTube)?.(X, tt)
            ? v.all
            : v.all.concat([{ y: Q, dx: 0, dz: 0, terrain: !0 }]);
      for (let ot of et)
        (ot.y <= q + 1.2 && (!K || ot.y > K.y) && (K = ot),
          (!nt || ot.y < nt.y) && (nt = ot));
      let st = K || nt;
      return st.terrain
        ? m(X, tt, Z)
        : (Z && ((Z.dx = st.dx), (Z.dz = st.dz)), st.y);
    }
    if (j) return (Z && ((Z.dx = j.dx), (Z.dz = j.dz)), j.y);
    if (v.all.length && (!b(X, tt) || g(X, tt) & 8)) {
      let K = v.all[0];
      for (let nt of v.all) nt.y > K.y && (K = nt);
      return (Z && ((Z.dx = K.dx), (Z.dz = K.dz)), K.y);
    }
    return m(X, tt, Z);
  }
  function F(X, tt) {
    if (!b(X, tt)) return (P(X, tt), v.all.length ? "road" : "out");
    if ((P(X, tt), v.road)) return "road";
    if (v.walk || (o.pads && C(X, tt))) return "walk";
    let Z = g(X, tt);
    return Z & 8
      ? v.all.length
        ? "road"
        : "sea"
      : ((Z &= 7), Z === 1 || Z === 2 ? "park" : Z === 3 ? "sand" : "lot");
  }
  let O = {};
  function B(X, tt, Z = 25, q = void 0, j = !1, K = null) {
    let nt = null,
      Q = K ? O : {};
    for (let et = Math.floor((X - Z) / i); et <= Math.floor((X + Z) / i); et++)
      for (
        let st = Math.floor((tt - Z) / i);
        st <= Math.floor((tt + Z) / i);
        st++
      ) {
        let ot = s.get(a(et, st));
        if (ot)
          for (let rt of ot) {
            let lt = r[Math.floor(rt / 65536)],
              ht = rt % 65536;
            if (lt.inner) continue;
            {
              let ut = lt.P,
                it = ut[ht * 3],
                at = ut[ht * 3 + 1],
                yt = lt.D[ht * 2],
                vt = lt.D[ht * 2 + 1],
                At = lt.S[ht + 1] - lt.S[ht],
                Ut = (X - it) * yt + (tt - at) * vt;
              Ut = Ut < 0 ? 0 : Ut > At ? At : Ut;
              let Gt =
                Math.sqrt((X - it - yt * Ut) ** 2 + (tt - at - vt * Ut) ** 2) -
                Math.max(lt.W[ht], lt.W[ht + 1]) -
                1e-6;
              if (Gt > Z || (nt && Gt > nt.dd)) continue;
            }
            ys(lt, X, tt, Q, ht, ht);
            let pt = Q.d - Q.w;
            (q !== void 0 && Math.abs(Q.y - q) > 3) ||
              (lt.tunnel && q === void 0) ||
              (pt <= Z &&
                (!nt || pt < nt.dd) &&
                (K
                  ? ((nt = K),
                    (K.E = lt),
                    (K.s = Q.s),
                    (K.v = Q.v),
                    (K.d = Q.d),
                    (K.y = Q.y),
                    (K.w = Q.w),
                    (K.dd = pt),
                    (K.dx = Q.dx),
                    (K.dz = Q.dz))
                  : (nt = {
                      E: lt,
                      s: Q.s,
                      v: Q.v,
                      d: Q.d,
                      y: Q.y,
                      w: Q.w,
                      dd: pt,
                      dx: Q.dx,
                      dz: Q.dz,
                    })));
          }
      }
    if (nt && j) ((nt.onRoad = nt.dd <= 0), (nt.J = null));
    else if (nt) {
      ((nt.onRoad = nt.dd <= 0), P(X, tt));
      let et = v.road && v.road.J;
      nt.J = et && (q === void 0 || Math.abs(et.y - q) < 3) ? et : null;
    } else if (q !== void 0) return B(X, tt, Z, void 0, !1, K);
    return nt;
  }
  function H(X, tt) {
    if ((P(X, tt), v.road)) return v.road.y;
    if (v.walk) return v.walk.y - e;
    let Z = B(X, tt, 12);
    return Z ? Z.y : m(X, tt);
  }
  function N(X, tt, Z, q, j = void 0) {
    let K = B(X, tt, 20, j);
    if (!K) return { name: "", next: "" };
    let nt = K.E;
    if (K.J) {
      let lt = -2;
      for (let [ht, pt] of K.J.legs) {
        let ut = Ot(
            ht,
            pt === "a"
              ? Math.min(ht.L, ht.ta + 2)
              : Math.max(0, ht.L - ht.tb - 2),
            {},
          ),
          it = ut.x - K.J.x,
          at = ut.z - K.J.z,
          yt = Math.hypot(it, at) || 1,
          vt = (it * Z + at * q) / yt;
        vt > lt && ht.name && ((lt = vt), (nt = ht));
      }
    }
    let Q = nt.name || K.E.name,
      et = Ot(nt, nt === K.E ? Math.min(nt.L, Math.max(0, K.s)) : nt.L / 2, {}),
      st = et.dx * Z + et.dz * q >= 0,
      ot = o.juns[st ? nt.jb : nt.ja],
      rt = "";
    for (let lt = 0; lt < 6 && ot; lt++) {
      let ht = ot.legs
        .map(([at]) => at)
        .filter((at) => at !== nt && at.name && at.name !== nt.name)
        .sort((at, yt) => yt.rank - at.rank);
      if (ht.length && (ht[0].rank >= 2.5 || lt >= 3)) {
        rt = ht[0].name;
        break;
      }
      let pt = ot.legs.find(([at]) => at !== nt && at.name === nt.name);
      if (!pt) break;
      let [ut, it] = pt;
      ((nt = ut), (ot = o.juns[it === "a" ? ut.jb : ut.ja]));
    }
    return { name: Q, next: rt };
  }
  let D = (X, tt, Z = void 0) => {
      let q = B(X, tt, 20, Z);
      return q ? q.E.name : "";
    },
    U = Array.from({ length: 16 }, (X, tt) =>
      (tt & 1 ? Math.sin : Math.cos)(((tt >> 1) * Math.PI) / 4),
    );
  function G(X, tt, Z = 0, q = !1) {
    let j = a(Math.floor(X / i), Math.floor(tt / i)),
      K = n.get(j);
    if (K) {
      for (let Q of K)
        if (!(
          Q.layered ||
          X < Q.bb[0] - Z ||
          X > Q.bb[2] + Z ||
          tt < Q.bb[1] - Z ||
          tt > Q.bb[3] + Z
        )) {
          for (let et of Q.polys)
            for (let st = -1; st < (Z > 0 ? 8 : 0); st++)
              if (
                cx(
                  et,
                  X + (st < 0 ? 0 : Z * U[st * 2]),
                  tt + (st < 0 ? 0 : Z * U[st * 2 + 1]),
                )
              )
                return !1;
        }
    }
    let nt = S(j);
    if (!nt) return !0;
    for (let Q = 0; Q < nt.length; Q += 7) {
      if (
        X < nt[Q + 3] - Z ||
        tt < nt[Q + 4] - Z ||
        X > nt[Q + 5] + Z ||
        tt > nt[Q + 6] + Z
      )
        continue;
      let et = r[Math.floor(nt[Q])];
      if (
        !(et.inner || et.layered || et.tunnel) &&
        (ys(et, X, tt, x, nt[Q + 1], nt[Q + 2]),
        !(x.s < et.s0 - Z || x.s > et.s1 + Z) &&
          !(et.median && x.d + Z < 1.6) &&
          (x.d < x.w + Z || (q && !et.hwy && x.d < x.w + et.sw + Z * 0.5)))
      )
        return !1;
    }
    return !0;
  }
  let W = (X, tt) => {
      if (!o.pads) return 0;
      let Z = C(X, tt);
      return (Z && Z.cap) || 0;
    },
    V = {};
  function $(X, tt) {
    let Z = o.dropped;
    if (!Z) return 0;
    let q = 0;
    for (let j of Z) {
      if (
        (ys(j, X, tt, V), V.d > V.w + (j.sw || 0) + 3 || V.s <= 0 || V.s >= j.L)
      )
        continue;
      let K = 0;
      for (; K + 2 < j.n && j.S[K + 1] < V.s;) K++;
      let nt = (V.s - j.S[K]) / Math.max(1e-6, j.S[K + 1] - j.S[K]);
      q = Math.max(q, j.drop[K] + (j.drop[K + 1] - j.drop[K]) * nt);
    }
    return q;
  }
  let J = {
    terrainAt: m,
    coverAt: g,
    driveHeight: L,
    surfaceAt: F,
    roadAt: B,
    streetName: D,
    streetY: H,
    streetInfo: N,
    probe: P,
    inWorld: b,
    clearOfRoads: G,
    zoneCap: W,
    gridAt: d,
    dropAt: $,
    CURB: e,
    bounds: l,
    regionBounds: p,
  };
  return (x$(o, J), J);
}
