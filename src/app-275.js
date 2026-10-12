// app 275 — userdata
// Lines 135919-136589 of readable/app.pretty.js (statement-aligned).
function mx(i, t, e = null, s = Yt, n = null) {
  let o = n || Hbt(),
    a = new Map();
  if (e)
    for (let [j, X] of Object.entries(e))
      X.geo2 && (o["g_" + j] = [{ mat: "car", geo: X.geo2 }]);
  let r = [];
  {
    let j = new Map();
    for (let X of i) {
      let K =
          X.kind === "car"
            ? e
              ? "g_" + ux(X)
              : "car" + X.type
            : X.kind === "tree"
              ? o[X.sp]
                ? X.sp
                : "tree" + (Math.floor(of(X.x, X.z) * 3) % 3)
              : X.kind,
        nt = Math.floor(X.x / ja),
        Z = Math.floor(X.z / ja),
        et = (nt + 1e3) * 4096 + Z + 1e3,
        tt = j.get(et);
      tt || j.set(et, (tt = new Map()));
      let it = tt.get(K);
      (it || (tt.set(K, (it = [])), a.set(`${nt},${Z}|${K}`, it)), it.push(X));
    }
  }
  let l = new ke();
  l.name = "Props";
  let c = new Map(),
    h = [],
    f = new xt(1, 1, 1),
    u = new ye(),
    d = new ye(),
    p = new ye(),
    m = new wn(),
    g = new Ii(),
    b = new xt(),
    x = new xt(),
    v = new $t(),
    y = new Map();
  for (let [j, X] of a) {
    let K = j.split("|")[1],
      nt = o[K],
      Z = nt.lods ? nt.lods[nt.lods.length - 1] : nt,
      et = (ut) =>
        (ut.cell ??
          nt.cells[
            Math.floor(of(ut.x, ut.z, 6) * nt.cells.length) % nt.cells.length
          ]) - dm[nt.plant],
      tt = nt.lods
        ? X.map((ut) => {
            let ot = of(ut.x, ut.z, 3);
            return {
              p: ut,
              kind: Dbt(K, ut),
              m: null,
              mc: null,
              cs: 3,
              tint: nt.plant
                ? new $t(
                    0.88 + 0.22 * ot,
                    0.9 + 0.14 * of(ut.x, ut.z, 4),
                    (et(ut) + 0.5) / 16,
                  )
                : new $t(
                    0.9 + 0.2 * ot,
                    0.92 + 0.16 * of(ut.x, ut.z, 4),
                    0.85 + 0.25 * of(ut.x, ut.z, 5),
                  ),
            };
          })
        : null;
    if (tt) {
      let ut = j.split("|")[0],
        ot = y.get(ut);
      (ot || y.set(ut, (ot = [])), ot.push(...tt));
    }
    let it = new Float32Array(X.length * 16),
      rt = Ubt[K],
      lt =
        /^(tree|ptree|cypress|pine|euc|palm|fpalm|qpalm|wpalm|cordyline)/.test(
          K,
        );
    X.forEach((ut, ot) => {
      (g.set(
        (lt ? 0 : ut.pitch) ||
          (rt ? (of(ut.x, ut.z, 11) - 0.5) * 2 * rt[0] : 0),
        ut.rot || 0,
        lt ? 0 : ut.roll || 0,
        "YXZ",
      ),
        m.setFromEuler(g));
      let at = ut.scale || 1,
        yt = rt ? at * (1 + (of(ut.z, ut.x, 12) - 0.5) * rt[1]) : at;
      if (
        (b.set(ut.sx || at, yt, ut.sz || at),
        x.set(ut.x, ut.y, ut.z),
        p.compose(x, m, b),
        ut.shy &&
          p
            .compose(x, m, f)
            .multiply(
              u.set(1, 0, 0, 0, 0, 1, ut.shy, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            )
            .multiply(d.makeScale(b.x, b.y, b.z)),
        p.toArray(it, ot * 16),
        tt)
      ) {
        let vt = tt[ot];
        ((vt.m = new ye().fromArray(it, ot * 16)),
          (ut.dm = vt.m),
          (ut.dk = vt.kind),
          vt.kind !== K &&
            ((b.y = (yt * o[vt.kind].lods.top) / nt.lods.top),
            p.compose(x, m, b).toArray(it, ot * 16),
            (vt.mc = ut.dmc = new ye().fromArray(it, ot * 16))));
      }
    });
    let ct = K.startsWith("g_"),
      dt = ct ? K.slice(2) : "";
    for (let [ut, { mat: ot, geo: at }] of Z.entries()) {
      let yt = !!tt && XL.has(ot),
        vt = new zn(at, yt ? KL(t[ot], 2) : t[ot], X.length);
      ((vt.userData.fade = yt), vt.instanceMatrix.array.set(it));
      let Pt = /leaf|frond/.test(ot),
        jt = ot !== "car" && ot !== "tire" && ot !== "carlamp",
        Wt = v.setRGB(1, 1, 1).clone();
      (X.forEach((Xt, me) => {
        if (
          (tt && (tt[me].refs ||= []).push(vt, me),
          Xt.kind === "car" && !ct && (Xt.crefs ||= []).push(vt, me),
          ct)
        ) {
          let re = u_(Xt.color);
          (vt.setColorAt(me, re),
            r.push(
              (Xt.P = {
                x: Xt.x,
                z: Xt.z,
                im: vt,
                k: me,
                n: dt,
                m: new ye().fromArray(it, me * 16),
                paint: re,
              }),
            ));
        } else
          ot === "car"
            ? vt.setColorAt(
                me,
                Wk[Math.floor(Xt.color * Wk.length) % Wk.length],
              )
            : tt
              ? vt.setColorAt(me, Pt ? tt[me].tint : Wt)
              : vt.setColorAt(me, Wt);
        jt && (Xt.refs ||= []).push(vt, me);
      }),
        (vt.instanceMatrix.needsUpdate = !0),
        vt.instanceColor && (vt.instanceColor.needsUpdate = !0),
        vt.computeBoundingSphere(),
        (vt.castShadow = !/lamp|signal/.test(ot)),
        (vt.receiveShadow = !0),
        (vt.name = `${K}${ut}_${j}`),
        (vt.matrixAutoUpdate = !1),
        vt.updateMatrix());
      let Ct = j.split("|")[0],
        qt = Cbt.has(K),
        Zt = Lbt.has(K),
        he = qt ? Ct + "|c" : Zt ? Ct + "|p" : Ct,
        ee = c.get(he);
      if (!ee) {
        ((ee = new ke()),
          (ee.name = (qt ? "clutter_" : Zt ? "poles_" : "props_") + Ct));
        let [Xt, me] = Ct.split(",").map(Number);
        ((ee.userData.c = [(Xt + 0.5) * ja, (me + 0.5) * ja]),
          qt && (ee.userData.R = 180),
          Zt && (ee.userData.R = 300),
          c.set(he, ee),
          l.add(ee));
      }
      if (
        (ee.add(vt), X[0].kind === "car" && h.push(vt), yt && vt.castShadow)
      ) {
        vt.castShadow = !1;
        let Xt = new zn(at, Ibt(t[ot]), X.length);
        (Xt.instanceMatrix.array.set(it),
          (Xt.instanceMatrix.needsUpdate = !0),
          Xt.computeBoundingSphere(),
          vt.instanceColor &&
            (Xt.instanceColor = new s0(vt.instanceColor.array.slice(), 3)),
          (Xt.castShadow = !0),
          (Xt.receiveShadow = !1),
          (Xt.userData.mbShadowOnly = !0),
          (Xt.userData.mbFarShadow = !0),
          (Xt.name = `${K}${ut}sh_${j}`),
          (Xt.matrixAutoUpdate = !1),
          Xt.updateMatrix(),
          ee.add(Xt),
          X.forEach((me, re) => (me.srefs ||= []).push(Xt, re)));
      }
    }
  }
  let M = new Map();
  for (let j of i)
    if (j.kind === "car") {
      let X = `${Math.floor(j.x / ja)},${Math.floor(j.z / ja)}`,
        K = M.get(X);
      (K || M.set(X, (K = [])), K.push(j));
    }
  let S = [];
  for (let [j, X] of M) {
    let K = c.get(j);
    if (!K) continue;
    let nt = m_(X.length, "parkedShadows_" + j),
      Z = (et) => {
        let tt = X[et],
          it = e ? Ko[ux(tt)] : Qy[tt.type] || Qy[0];
        return [it.bw || it.W, it.L];
      };
    (X.forEach((et, tt) => {
      let [it, rt] = Z(tt),
        lt = et.y ?? 0;
      (nt.setMatrixAt(
        tt,
        nf(p, et.x, et.z, et.rot || 0, it, rt, () => lt),
      ),
        (et.blob = [nt, tt, it, rt]));
    }),
      (nt.instanceMatrix.needsUpdate = !0),
      nt.computeBoundingSphere(),
      nt.updateMatrix(),
      K.add(nt),
      h.push(nt),
      s &&
        S.push({
          cx: K.userData.c[0],
          cz: K.userData.c[1],
          im: nt,
          arr: X,
          size: Z,
        }));
  }
  let w = (j, X, K, nt) => {
    let Z = performance.now();
    for (; S.length;) {
      let et = -1,
        tt = K;
      if (
        (S.forEach((rt, lt) => {
          let ct = Math.hypot(rt.cx - j, rt.cz - X);
          ct < tt && ((tt = ct), (et = lt));
        }),
        et < 0 || performance.now() - Z > nt)
      )
        return;
      let it = S[et];
      (S.splice(et, 1),
        it.arr.forEach((rt) => {
          if (!rt.P || !QL(rt, s)) return;
          let lt = rt.P;
          (g.set(rt.pitch, rt.rot || 0, rt.roll, "YXZ"),
            m.setFromEuler(g),
            lt.m.compose(x.set(rt.x, rt.y, rt.z), m, f),
            lt.tier === 2 &&
              (lt.im.setMatrixAt(lt.k, lt.m),
              (lt.im.instanceMatrix.needsUpdate = !0)));
        }),
        it.arr.forEach((rt, lt) => {
          let [ct, dt] = it.size(lt);
          it.im.setMatrixAt(
            lt,
            nf(p, rt.x, rt.z, rt.rot || 0, ct, dt, (ut, ot) => s(ut, ot, rt.y)),
          );
        }),
        (it.im.instanceMatrix.needsUpdate = !0));
    }
  };
  ((l.userData.K = o), (l.userData.mats = t));
  let z = [60, 170],
    _ = [192, 640],
    R = new ye().makeScale(0, 0, 0),
    T = e
      ? z.map((j, X) =>
          Object.fromEntries(
            Object.entries(e)
              .filter(([, K]) => K.geo2)
              .map(([K, nt]) => {
                let Z = new zn(X ? nt.geo1 : nt.geoP || nt.geo, nt.mat, _[X]);
                if (
                  ((Z.count = 0),
                  (Z.frustumCulled = !1),
                  (Z.castShadow = X === 0),
                  (Z.receiveShadow = !0),
                  (Z.name = `parked${X}_${K}`),
                  (Z.userData.mbNearShadow = !0),
                  (Z.userData.mbReflR = z[X] + 20),
                  (Z.matrixAutoUpdate = !1),
                  Z.setColorAt(0, v.setRGB(1, 1, 1)),
                  l.add(Z),
                  h.push(Z),
                  X === 0)
                ) {
                  let et = e_(K, Z);
                  et &&
                    ((et.userData.mbReflR = Z.userData.mbReflR),
                    l.add(et),
                    (Z.userData.plates = et),
                    h.push(et));
                }
                return [K, Z];
              }),
          ),
        )
      : [];
  for (let j of r) ((j.tier = 2), (j.im.castShadow = !1));
  let E = new Map();
  for (let j of r) {
    let X = `${Math.floor(j.x / ja)},${Math.floor(j.z / ja)}`,
      K = E.get(X);
    (K || E.set(X, (K = [])), K.push(j));
  }
  let A = [],
    C = !0,
    P = (j, X, K) => {
      if (!r.length || !C) return;
      let nt = new Set();
      for (let lt of T) for (let ct of Object.values(lt)) ct.count = 0;
      let Z = [],
        et = z[1] + ja;
      for (
        let lt = Math.floor((j - et) / ja);
        lt <= Math.floor((j + et) / ja);
        lt++
      )
        for (
          let ct = Math.floor((X - et) / ja);
          ct <= Math.floor((X + et) / ja);
          ct++
        ) {
          let dt = E.get(lt + "," + ct);
          dt && Z.push(dt);
        }
      let tt = new Set(),
        it = [];
      for (let lt of Z) for (let ct of lt) (tt.add(ct), it.push(ct));
      for (let lt of A) tt.has(lt) || it.push(lt);
      let rt = [];
      for (let lt of it) {
        let ct = lt.x - j,
          dt = lt.z - X;
        lt._d =
          Math.abs(ct) > z[1] || Math.abs(dt) > z[1] ? 1e9 : Math.hypot(ct, dt);
      }
      it.sort((lt, ct) => lt._d - ct._d);
      for (let lt of it) {
        let ct = lt._d,
          dt = ct < z[0] ? 0 : ct < z[1] ? 1 : 2;
        if (
          (dt < 2 && T[dt][lt.n].count >= _[dt] && (dt = 2),
          dt < 2 != lt.tier < 2 &&
            (lt.im.setMatrixAt(lt.k, dt < 2 ? R : lt.m), nt.add(lt.im)),
          (lt.tier = dt),
          dt < 2)
        ) {
          let ut = T[dt][lt.n],
            ot = ut.count++;
          (ut.setMatrixAt(ot, lt.m),
            lt.im.getColorAt(lt.k, v),
            ut.setColorAt(ot, v),
            rt.push(lt),
            (lt.ti = ut),
            (lt.tk = ot));
        } else lt.ti = null;
      }
      A = rt;
      for (let [lt, ct] of T.entries())
        for (let dt of Object.values(ct))
          ((dt.boundingSphere ||= new _n()).center.set(j, K ?? 0, X),
            (dt.boundingSphere.radius = z[lt] + 60));
      for (let lt of Object.values(T[0] || {}))
        lt.userData.plates && (lt.userData.plates.count = lt.count);
      for (let lt of nt) lt.instanceMatrix.needsUpdate = !0;
      for (let lt of T)
        for (let ct of Object.values(lt))
          ((ct.instanceMatrix.needsUpdate = !0),
            (ct.instanceColor.needsUpdate = !0));
    };
  ((l.userData.carTiers = z),
    (l.userData.parked = r),
    (l.userData.swapCar = (j, X) => {
      let K = T[0]?.[j];
      K && X && (K.geometry = X.geoP || X.geo);
    }),
    (l.userData.setParked = (j) => {
      C = !!j;
      for (let X of h) X.visible = C;
      return (C && (Q = null), h.length);
    }),
    (l.userData.parkedOn = () => C));
  let I = new ye(),
    L = new wn(),
    F = new Ii(),
    N = new xt(),
    B = new xt(1, 1, 1),
    H = new $t();
  l.userData.moveParked = (j) => {
    let X = j.p,
      K = j.pose;
    if (!X || !K) return;
    l.userData.gen = (l.userData.gen | 0) + 1;
    let nt = Math.atan2(j.s, j.c);
    (X.x != null &&
      (X.spin =
        ((X.spin || 0) +
          ((j.x - X.x) * Math.sin(nt) + (j.z - X.z) * Math.cos(nt)) /
            f_(j.kind)) %
        (2 * Math.PI)),
      (X.x = j.x),
      (X.z = j.z),
      (X.y = K.y),
      (X.rot = nt),
      (X.pitch = K.pitch),
      F.set(K.pitch, nt, K.roll, "YXZ"),
      L.setFromEuler(F),
      I.compose(N.set(j.x, K.y, j.z), L, B));
    let Z = X.P;
    if (Z)
      ((Z.x = j.x),
        (Z.z = j.z),
        Z.m.copy(I),
        Z.ti
          ? ((I.elements[3] = X.spin || 0),
            Z.ti.setMatrixAt(Z.tk, I),
            (I.elements[3] = 0),
            Z.ti.setColorAt(Z.tk, ww(H, Z.paint, K.flash, K.flash)),
            (Z.ti.instanceMatrix.needsUpdate = !0),
            (Z.ti.instanceColor.needsUpdate = !0))
          : (Z.im.setMatrixAt(Z.k, I), (Z.im.instanceMatrix.needsUpdate = !0)));
    else if (X.crefs)
      for (let et = 0; et < X.crefs.length; et += 2)
        (X.crefs[et].setMatrixAt(X.crefs[et + 1], I),
          (X.crefs[et].instanceMatrix.needsUpdate = !0));
    if (X.blob) {
      let [et, tt, it, rt] = X.blob;
      (et.setMatrixAt(
        tt,
        nf(I, j.x, j.z, nt, it, rt, (lt, ct) => s(lt, ct, K.y)),
      ),
        (et.instanceMatrix.needsUpdate = !0));
    }
  };
  let O = {},
    D = new Set();
  for (let j of y.values()) for (let X of j) D.add(X.kind);
  for (let [j, X] of Object.entries(o))
    X.lods &&
      D.has(j) &&
      (O[j] = [0, 1].map((K) => {
        let nt = X.lods[K].map(({ mat: et, geo: tt }, it) => {
            let rt = XL.has(et),
              lt = new zn(tt, rt ? KL(t[et], K) : t[et], px[K]);
            ((lt.count = 0),
              (lt.frustumCulled = !1),
              (lt.castShadow = K === 0 && !Gbt.has(j)),
              (lt.receiveShadow = !0),
              (lt.name = `veg${K}_${j}${it}`),
              (lt.userData.mbNearShadow = !0),
              (lt.userData.mbReflR = dx[K][1] + 40),
              (lt.matrixAutoUpdate = !1),
              (lt.userData.tint = /leaf|frond/.test(et)),
              (lt.userData.fade = rt));
            for (let ct = 0; ct < px[K]; ct++)
              lt.setColorAt(ct, v.setRGB(1, 1, 1));
            return (l.add(lt), lt);
          }),
          Z = nt.filter((et) => et.userData.fade);
        if (K === 0 && X.lods[1])
          for (let et of [...Z]) {
            let tt = Number(et.name.slice(et.name.lastIndexOf(j) + j.length)),
              it = X.lods[1].find((lt) => lt.mat === X.lods[0][tt].mat);
            if (!it) continue;
            et.castShadow = !1;
            let rt = new zn(it.geo, t[it.mat], px[0]);
            if (
              ((rt.count = 0),
              (rt.frustumCulled = !1),
              (rt.castShadow = !0),
              (rt.receiveShadow = !1),
              (rt.name = `veg0sh_${j}${tt}`),
              (rt.userData.mbShadowOnly = !0),
              (rt.userData.mbNearShadow = !0),
              (rt.userData.fade = !0),
              (rt.matrixAutoUpdate = !1),
              l.add(rt),
              nt.push(rt),
              Z.push(rt),
              et.userData.tint)
            ) {
              rt.userData.tint = !0;
              for (let lt = 0; lt < px[0]; lt++)
                rt.setColorAt(lt, v.setRGB(1, 1, 1));
            }
          }
        return {
          ims: nt,
          leaf: Z,
          solid: nt.filter((et) => !et.userData.fade),
          nL: 0,
          nS: 0,
        };
      }));
  let U = [],
    G = 0,
    q = null,
    W = 0,
    V = (j, X, K) => {
      if (j.cs !== X) {
        j.cs = j.p.cs = X;
        for (let nt = 0; nt < j.refs.length; nt += 2) {
          let Z = j.refs[nt];
          (Z.setMatrixAt(
            j.refs[nt + 1],
            (Z.userData.fade ? X & 1 : X & 2) ? j.mc || j.m : R,
          ),
            K.add(Z));
        }
      }
    },
    Y = (j, X, K, nt) => {
      let Z = j[nt]++;
      for (let et of K)
        (et.setMatrixAt(Z, X.m), et.userData.tint && et.setColorAt(Z, X.tint));
      return Z;
    },
    $ = (j, X, K) => {
      G++;
      let nt = performance.now(),
        Z = q
          ? Math.hypot(j - q.x, X - q.z) / Math.max((nt - q.t) / 1e3, 0.1)
          : 0;
      q = { x: j, z: X, t: nt };
      let et = 11 + Math.min(Z, 90) * 0.55,
        [tt, it] = dx;
      for (let ut of Object.values(O)) for (let ot of ut) ot.nL = ot.nS = 0;
      let rt = [],
        lt = new Set(),
        ct = it[1] + et + ja * 0.71;
      for (let [ut, ot] of y) {
        let [at, yt] = ut.split(",");
        if (!(Math.hypot((+at + 0.5) * ja - j, (+yt + 0.5) * ja - X) > ct))
          for (let vt of ot) {
            let Pt = K === void 0 ? 0 : vt.p.y + 5 - K,
              jt = Math.hypot(vt.p.x - j, vt.p.z - X, Pt),
              Wt = jt - et,
              Ct = jt + et,
              qt = jt < JL[0] ? 0 : jt < JL[1] ? 1 : 2,
              Zt = Wt < tt[1],
              he = Ct > tt[0] && Wt < it[1],
              ee = Ct > it[0],
              Xt = O[vt.kind];
            if (
              (Zt &&
                Xt[0].nL >= px[0] &&
                ((Zt = !1),
                (he = !0),
                W++ || console.warn("vegetation: the near tier is full")),
              he &&
                Xt[1].nL >= px[1] &&
                ((he = !1),
                (ee = !0),
                W++ || console.warn("vegetation: the mid tier is full")),
              vt.p.broken)
            ) {
              (V(vt, 0, lt), (vt.p.lod = null));
              continue;
            }
            (qt === 0 && !Zt && (qt = he ? 1 : 2),
              qt === 1 && !he && (qt = 2),
              V(vt, (ee ? 1 : 0) | (qt === 2 ? 2 : 0), lt));
            let me = [];
            for (let [re, os] of [
              [0, Zt],
              [1, he],
            ]) {
              if (!os) continue;
              let Dt = Xt[re],
                qe = Y(Dt, vt, Dt.leaf, "nL");
              if (qt === re) {
                let pe = Y(Dt, vt, Dt.solid, "nS");
                me.unshift({ ims: Dt.solid, k: pe, m: vt.m });
              }
              me.push({ ims: Dt.leaf, k: qe, m: vt.m });
            }
            ((vt.p.lod = me.length
              ? { ims: me[0].ims, k: me[0].k, m: vt.m, more: me.slice(1) }
              : null),
              me.length && ((vt.tick = G), rt.push(vt)));
          }
      }
      for (let ut of U)
        ut.tick !== G && !ut.p.broken && (V(ut, 3, lt), (ut.p.lod = null));
      U = rt;
      for (let ut of lt) ut.instanceMatrix.needsUpdate = !0;
      let dt = K ?? 0;
      for (let ut of Object.values(O))
        ut.forEach((ot, at) => {
          if (ot.nL || ot.nS)
            for (let yt of ot.ims)
              ((yt.boundingSphere ||= new _n()).center.set(j, dt, X),
                (yt.boundingSphere.radius = dx[at][1] + et + 40));
        });
      for (let ut of Object.values(O))
        for (let ot of ut) {
          for (let at of ot.leaf)
            ((at.count = ot.nL), (at.visible = ot.nL > 0));
          for (let at of ot.solid)
            ((at.count = ot.nS), (at.visible = ot.nS > 0));
          if (!(!ot.nL && !ot.nS && !ot.was)) {
            ot.was = ot.nL + ot.nS;
            for (let at of ot.ims)
              ((at.instanceMatrix.needsUpdate = !0),
                at.instanceColor && (at.instanceColor.needsUpdate = !0));
          }
        }
    };
  ((l.userData.vegTiers = JL),
    (l.userData.treeKind = (j) =>
      j.kind === "tree"
        ? o[j.sp]
          ? j.sp
          : "tree" + (Math.floor(of(j.x, j.z) * 3) % 3)
        : j.kind));
  let st = [],
    Q = null;
  return (
    (l.userData.cull = (j, X, K = 420, nt) => {
      for (let tt of l.children) {
        if (!tt.userData.c) continue;
        let [it, rt] = tt.userData.c;
        tt.visible =
          Math.hypot(it - j, rt - X) <
          Math.min(tt.userData.R ?? K, K) + ja * 0.71;
      }
      let Z = Q,
        et = l.userData.gen | 0;
      if (
        Z &&
        Z.R === K &&
        Z.gen === et &&
        Math.abs(Z.x - j) < 0.01 &&
        Math.abs(Z.z - X) < 0.01 &&
        Math.abs((Z.y ?? 0) - (nt ?? 0)) < 0.01
      ) {
        st = [() => w(j, X, K + ja * 1.5, 1.5)];
        return;
      }
      ((Q = { x: j, z: X, y: nt, R: K, gen: et }),
        P(j, X, nt),
        (st = [() => $(j, X, nt), () => w(j, X, K + ja * 1.5, 1.5)]));
    }),
    (l.userData.step = () => {
      let j = st.shift();
      return j ? (j(), !0) : !1;
    }),
    (l.userData.refineBlobs = w),
    l
  );
}
