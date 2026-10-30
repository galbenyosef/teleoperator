// app 274 — userdata
// Lines 136188-136858 of readable/app.pretty.js (statement-aligned).
function ev(o, t, e = null, s = $t, n = null) {
  let i = n || cyt(),
    a = new Map();
  if (e)
    for (let [q, j] of Object.entries(e))
      j.geo2 && (i["g_" + q] = [{ mat: "car", geo: j.geo2 }]);
  let r = [];
  {
    let q = new Map();
    for (let j of o) {
      let K =
          j.kind === "car"
            ? e
              ? "g_" + Jx(j)
              : "car" + j.type
            : j.kind === "tree"
              ? i[j.sp]
                ? j.sp
                : "tree" + (Math.floor(Bf(j.x, j.z) * 3) % 3)
              : j.kind,
        nt = Math.floor(j.x / ar),
        Q = Math.floor(j.z / ar),
        et = (nt + 1e3) * 4096 + Q + 1e3,
        st = q.get(et);
      st || q.set(et, (st = new Map()));
      let ot = st.get(K);
      (ot || (st.set(K, (ot = [])), a.set(`${nt},${Q}|${K}`, ot)), ot.push(j));
    }
  }
  let l = new le();
  l.name = "Props";
  let c = new Map(),
    h = [],
    f = new dt(1, 1, 1),
    u = new fe(),
    d = new fe(),
    p = new fe(),
    m = new tn(),
    g = new vi(),
    b = new dt(),
    v = new dt(),
    x = new It(),
    y = new Map();
  for (let [q, j] of a) {
    let K = q.split("|")[1],
      nt = i[K],
      Q = nt.lods ? nt.lods[nt.lods.length - 1] : nt,
      et = (ut) =>
        (ut.cell ??
          nt.cells[
            Math.floor(Bf(ut.x, ut.z, 6) * nt.cells.length) % nt.cells.length
          ]) - s2[nt.plant],
      st = nt.lods
        ? j.map((ut) => {
            let it = Bf(ut.x, ut.z, 3);
            return {
              p: ut,
              kind: hyt(K, ut),
              m: null,
              mc: null,
              cs: 3,
              tint: nt.plant
                ? new It(
                    0.88 + 0.22 * it,
                    0.9 + 0.14 * Bf(ut.x, ut.z, 4),
                    (et(ut) + 0.5) / 16,
                  )
                : new It(
                    0.9 + 0.2 * it,
                    0.92 + 0.16 * Bf(ut.x, ut.z, 4),
                    0.85 + 0.25 * Bf(ut.x, ut.z, 5),
                  ),
            };
          })
        : null;
    if (st) {
      let ut = q.split("|")[0],
        it = y.get(ut);
      (it || y.set(ut, (it = [])), it.push(...st));
    }
    let ot = new Float32Array(j.length * 16),
      rt = fyt[K],
      lt =
        /^(tree|ptree|cypress|pine|euc|palm|fpalm|qpalm|wpalm|cordyline)/.test(
          K,
        );
    j.forEach((ut, it) => {
      (g.set(
        (lt ? 0 : ut.pitch) ||
          (rt ? (Bf(ut.x, ut.z, 11) - 0.5) * 2 * rt[0] : 0),
        ut.rot || 0,
        lt ? 0 : ut.roll || 0,
        "YXZ",
      ),
        m.setFromEuler(g));
      let at = ut.scale || 1,
        yt = rt ? at * (1 + (Bf(ut.z, ut.x, 12) - 0.5) * rt[1]) : at;
      if (
        (b.set(ut.sx || at, yt, ut.sz || at),
        v.set(ut.x, ut.y, ut.z),
        p.compose(v, m, b),
        ut.shy &&
          p
            .compose(v, m, f)
            .multiply(
              u.set(1, 0, 0, 0, 0, 1, ut.shy, 0, 0, 0, 1, 0, 0, 0, 0, 1),
            )
            .multiply(d.makeScale(b.x, b.y, b.z)),
        p.toArray(ot, it * 16),
        st)
      ) {
        let vt = st[it];
        ((vt.m = new fe().fromArray(ot, it * 16)),
          (ut.dm = vt.m),
          (ut.dk = vt.kind),
          vt.kind !== K &&
            ((b.y = (yt * i[vt.kind].lods.top) / nt.lods.top),
            p.compose(v, m, b).toArray(ot, it * 16),
            (vt.mc = ut.dmc = new fe().fromArray(ot, it * 16))));
      }
    });
    let ht = K.startsWith("g_"),
      pt = ht ? K.slice(2) : "";
    for (let [ut, { mat: it, geo: at }] of Q.entries()) {
      let yt = !!st && kF.has(it),
        vt = new En(at, yt ? zF(t[it], 2) : t[it], j.length);
      ((vt.userData.fade = yt), vt.instanceMatrix.array.set(ot));
      let At = /leaf|frond/.test(it),
        Ut = it !== "car" && it !== "tire" && it !== "carlamp",
        Gt = x.setRGB(1, 1, 1).clone();
      (j.forEach((jt, be) => {
        if (
          (st && (st[be].refs ||= []).push(vt, be),
          jt.kind === "car" && !ht && (jt.crefs ||= []).push(vt, be),
          ht)
        ) {
          let re = u_(jt.color);
          (vt.setColorAt(be, re),
            r.push(
              (jt.P = {
                x: jt.x,
                z: jt.z,
                im: vt,
                k: be,
                n: pt,
                m: new fe().fromArray(ot, be * 16),
                paint: re,
              }),
            ));
        } else
          it === "car"
            ? vt.setColorAt(
                be,
                Vz[Math.floor(jt.color * Vz.length) % Vz.length],
              )
            : st
              ? vt.setColorAt(be, At ? st[be].tint : Gt)
              : vt.setColorAt(be, Gt);
        Ut && (jt.refs ||= []).push(vt, be);
      }),
        (vt.instanceMatrix.needsUpdate = !0),
        vt.instanceColor && (vt.instanceColor.needsUpdate = !0),
        vt.computeBoundingSphere(),
        (vt.castShadow = !/lamp|signal/.test(it)),
        (vt.receiveShadow = !0),
        (vt.name = `${K}${ut}_${q}`),
        (vt.matrixAutoUpdate = !1),
        vt.updateMatrix());
      let Pt = q.split("|")[0],
        Vt = syt.has(K),
        Kt = nyt.has(K),
        ue = Vt ? Pt + "|c" : Kt ? Pt + "|p" : Pt,
        ne = c.get(ue);
      if (!ne) {
        ((ne = new le()),
          (ne.name = (Vt ? "clutter_" : Kt ? "poles_" : "props_") + Pt));
        let [jt, be] = Pt.split(",").map(Number);
        ((ne.userData.c = [(jt + 0.5) * ar, (be + 0.5) * ar]),
          Vt && (ne.userData.R = 180),
          Kt && (ne.userData.R = 300),
          c.set(ue, ne),
          l.add(ne));
      }
      if (
        (ne.add(vt), j[0].kind === "car" && h.push(vt), yt && vt.castShadow)
      ) {
        vt.castShadow = !1;
        let jt = new En(at, iyt(t[it]), j.length);
        (jt.instanceMatrix.array.set(ot),
          (jt.instanceMatrix.needsUpdate = !0),
          jt.computeBoundingSphere(),
          vt.instanceColor &&
            (jt.instanceColor = new x0(vt.instanceColor.array.slice(), 3)),
          (jt.castShadow = !0),
          (jt.receiveShadow = !1),
          (jt.userData.mbShadowOnly = !0),
          (jt.userData.mbFarShadow = !0),
          (jt.name = `${K}${ut}sh_${q}`),
          (jt.matrixAutoUpdate = !1),
          jt.updateMatrix(),
          ne.add(jt),
          j.forEach((be, re) => (be.srefs ||= []).push(jt, re)));
      }
    }
  }
  let M = new Map();
  for (let q of o)
    if (q.kind === "car") {
      let j = `${Math.floor(q.x / ar)},${Math.floor(q.z / ar)}`,
        K = M.get(j);
      (K || M.set(j, (K = [])), K.push(q));
    }
  let S = [];
  for (let [q, j] of M) {
    let K = c.get(q);
    if (!K) continue;
    let nt = m_(j.length, "parkedShadows_" + q),
      Q = (et) => {
        let st = j[et],
          ot = e ? Io[Jx(st)] : Xw[st.type] || Xw[0];
        return [ot.bw || ot.W, ot.L];
      };
    (j.forEach((et, st) => {
      let [ot, rt] = Q(st),
        lt = et.y ?? 0;
      (nt.setMatrixAt(
        st,
        Of(p, et.x, et.z, et.rot || 0, ot, rt, () => lt),
      ),
        (et.blob = [nt, st, ot, rt]));
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
          arr: j,
          size: Q,
        }));
  }
  let w = (q, j, K, nt) => {
    let Q = performance.now();
    for (; S.length;) {
      let et = -1,
        st = K;
      if (
        (S.forEach((rt, lt) => {
          let ht = Math.hypot(rt.cx - q, rt.cz - j);
          ht < st && ((st = ht), (et = lt));
        }),
        et < 0 || performance.now() - Q > nt)
      )
        return;
      let ot = S[et];
      (S.splice(et, 1),
        ot.arr.forEach((rt) => {
          if (!rt.P || !RF(rt, s)) return;
          let lt = rt.P;
          (g.set(rt.pitch, rt.rot || 0, rt.roll, "YXZ"),
            m.setFromEuler(g),
            lt.m.compose(v.set(rt.x, rt.y, rt.z), m, f),
            lt.tier === 2 &&
              (lt.im.setMatrixAt(lt.k, lt.m),
              (lt.im.instanceMatrix.needsUpdate = !0)));
        }),
        ot.arr.forEach((rt, lt) => {
          let [ht, pt] = ot.size(lt);
          ot.im.setMatrixAt(
            lt,
            Of(p, rt.x, rt.z, rt.rot || 0, ht, pt, (ut, it) => s(ut, it, rt.y)),
          );
        }),
        (ot.im.instanceMatrix.needsUpdate = !0));
    }
  };
  ((l.userData.K = i), (l.userData.mats = t));
  let _ = [60, 170],
    z = [192, 640],
    A = new fe().makeScale(0, 0, 0),
    T = e
      ? _.map((q, j) =>
          Object.fromEntries(
            Object.entries(e)
              .filter(([, K]) => K.geo2)
              .map(([K, nt]) => {
                let Q = new En(j ? nt.geo1 : nt.geoP || nt.geo, nt.mat, z[j]);
                if (
                  ((Q.count = 0),
                  (Q.frustumCulled = !1),
                  (Q.castShadow = j === 0),
                  (Q.receiveShadow = !0),
                  (Q.name = `parked${j}_${K}`),
                  (Q.userData.mbNearShadow = !0),
                  (Q.userData.mbReflR = _[j] + 20),
                  (Q.matrixAutoUpdate = !1),
                  Q.setColorAt(0, x.setRGB(1, 1, 1)),
                  l.add(Q),
                  h.push(Q),
                  j === 0)
                ) {
                  let et = e_(K, Q);
                  et &&
                    ((et.userData.mbReflR = Q.userData.mbReflR),
                    l.add(et),
                    (Q.userData.plates = et),
                    h.push(et));
                }
                return [K, Q];
              }),
          ),
        )
      : [];
  for (let q of r) ((q.tier = 2), (q.im.castShadow = !1));
  let E = new Map();
  for (let q of r) {
    let j = `${Math.floor(q.x / ar)},${Math.floor(q.z / ar)}`,
      K = E.get(j);
    (K || E.set(j, (K = [])), K.push(q));
  }
  let R = [],
    P = !0,
    C = (q, j, K) => {
      if (!r.length || !P) return;
      let nt = new Set();
      for (let lt of T) for (let ht of Object.values(lt)) ht.count = 0;
      let Q = [],
        et = _[1] + ar;
      for (
        let lt = Math.floor((q - et) / ar);
        lt <= Math.floor((q + et) / ar);
        lt++
      )
        for (
          let ht = Math.floor((j - et) / ar);
          ht <= Math.floor((j + et) / ar);
          ht++
        ) {
          let pt = E.get(lt + "," + ht);
          pt && Q.push(pt);
        }
      let st = new Set(),
        ot = [];
      for (let lt of Q) for (let ht of lt) (st.add(ht), ot.push(ht));
      for (let lt of R) st.has(lt) || ot.push(lt);
      let rt = [];
      for (let lt of ot) {
        let ht = lt.x - q,
          pt = lt.z - j;
        lt._d =
          Math.abs(ht) > _[1] || Math.abs(pt) > _[1] ? 1e9 : Math.hypot(ht, pt);
      }
      ot.sort((lt, ht) => lt._d - ht._d);
      for (let lt of ot) {
        let ht = lt._d,
          pt = ht < _[0] ? 0 : ht < _[1] ? 1 : 2;
        if (
          (pt < 2 && T[pt][lt.n].count >= z[pt] && (pt = 2),
          pt < 2 != lt.tier < 2 &&
            (lt.im.setMatrixAt(lt.k, pt < 2 ? A : lt.m), nt.add(lt.im)),
          (lt.tier = pt),
          pt < 2)
        ) {
          let ut = T[pt][lt.n],
            it = ut.count++;
          (ut.setMatrixAt(it, lt.m),
            lt.im.getColorAt(lt.k, x),
            ut.setColorAt(it, x),
            rt.push(lt),
            (lt.ti = ut),
            (lt.tk = it));
        } else lt.ti = null;
      }
      R = rt;
      for (let [lt, ht] of T.entries())
        for (let pt of Object.values(ht))
          ((pt.boundingSphere ||= new _n()).center.set(q, K ?? 0, j),
            (pt.boundingSphere.radius = _[lt] + 60));
      for (let lt of Object.values(T[0] || {}))
        lt.userData.plates && (lt.userData.plates.count = lt.count);
      for (let lt of nt) lt.instanceMatrix.needsUpdate = !0;
      for (let lt of T)
        for (let ht of Object.values(lt))
          ((ht.instanceMatrix.needsUpdate = !0),
            (ht.instanceColor.needsUpdate = !0));
    };
  ((l.userData.carTiers = _),
    (l.userData.parked = r),
    (l.userData.swapCar = (q, j) => {
      let K = T[0]?.[q];
      K && j && (K.geometry = j.geoP || j.geo);
    }),
    (l.userData.setParked = (q) => {
      P = !!q;
      for (let j of h) j.visible = P;
      return (P && (Z = null), h.length);
    }),
    (l.userData.parkedOn = () => P));
  let I = new fe(),
    L = new tn(),
    F = new vi(),
    O = new dt(),
    B = new dt(1, 1, 1),
    H = new It();
  l.userData.moveParked = (q) => {
    let j = q.p,
      K = q.pose;
    if (!j || !K) return;
    l.userData.gen = (l.userData.gen | 0) + 1;
    let nt = Math.atan2(q.s, q.c);
    (j.x != null &&
      (j.spin =
        ((j.spin || 0) +
          ((q.x - j.x) * Math.sin(nt) + (q.z - j.z) * Math.cos(nt)) /
            f_(q.kind)) %
        (2 * Math.PI)),
      (j.x = q.x),
      (j.z = q.z),
      (j.y = K.y),
      (j.rot = nt),
      (j.pitch = K.pitch),
      F.set(K.pitch, nt, K.roll, "YXZ"),
      L.setFromEuler(F),
      I.compose(O.set(q.x, K.y, q.z), L, B));
    let Q = j.P;
    if (Q)
      ((Q.x = q.x),
        (Q.z = q.z),
        Q.m.copy(I),
        Q.ti
          ? ((I.elements[3] = j.spin || 0),
            Q.ti.setMatrixAt(Q.tk, I),
            (I.elements[3] = 0),
            Q.ti.setColorAt(Q.tk, Zx(H, Q.paint, K.flash, K.flash)),
            (Q.ti.instanceMatrix.needsUpdate = !0),
            (Q.ti.instanceColor.needsUpdate = !0))
          : (Q.im.setMatrixAt(Q.k, I), (Q.im.instanceMatrix.needsUpdate = !0)));
    else if (j.crefs)
      for (let et = 0; et < j.crefs.length; et += 2)
        (j.crefs[et].setMatrixAt(j.crefs[et + 1], I),
          (j.crefs[et].instanceMatrix.needsUpdate = !0));
    if (j.blob) {
      let [et, st, ot, rt] = j.blob;
      (et.setMatrixAt(
        st,
        Of(I, q.x, q.z, nt, ot, rt, (lt, ht) => s(lt, ht, K.y)),
      ),
        (et.instanceMatrix.needsUpdate = !0));
    }
  };
  let N = {},
    D = new Set();
  for (let q of y.values()) for (let j of q) D.add(j.kind);
  for (let [q, j] of Object.entries(i))
    j.lods &&
      D.has(q) &&
      (N[q] = [0, 1].map((K) => {
        let nt = j.lods[K].map(({ mat: et, geo: st }, ot) => {
            let rt = kF.has(et),
              lt = new En(st, rt ? zF(t[et], K) : t[et], tv[K]);
            ((lt.count = 0),
              (lt.frustumCulled = !1),
              (lt.castShadow = K === 0 && !uyt.has(q)),
              (lt.receiveShadow = !0),
              (lt.name = `veg${K}_${q}${ot}`),
              (lt.userData.mbNearShadow = !0),
              (lt.userData.mbReflR = Qx[K][1] + 40),
              (lt.matrixAutoUpdate = !1),
              (lt.userData.tint = /leaf|frond/.test(et)),
              (lt.userData.fade = rt));
            for (let ht = 0; ht < tv[K]; ht++)
              lt.setColorAt(ht, x.setRGB(1, 1, 1));
            return (l.add(lt), lt);
          }),
          Q = nt.filter((et) => et.userData.fade);
        if (K === 0 && j.lods[1])
          for (let et of [...Q]) {
            let st = Number(et.name.slice(et.name.lastIndexOf(q) + q.length)),
              ot = j.lods[1].find((lt) => lt.mat === j.lods[0][st].mat);
            if (!ot) continue;
            et.castShadow = !1;
            let rt = new En(ot.geo, t[ot.mat], tv[0]);
            if (
              ((rt.count = 0),
              (rt.frustumCulled = !1),
              (rt.castShadow = !0),
              (rt.receiveShadow = !1),
              (rt.name = `veg0sh_${q}${st}`),
              (rt.userData.mbShadowOnly = !0),
              (rt.userData.mbNearShadow = !0),
              (rt.userData.fade = !0),
              (rt.matrixAutoUpdate = !1),
              l.add(rt),
              nt.push(rt),
              Q.push(rt),
              et.userData.tint)
            ) {
              rt.userData.tint = !0;
              for (let lt = 0; lt < tv[0]; lt++)
                rt.setColorAt(lt, x.setRGB(1, 1, 1));
            }
          }
        return {
          ims: nt,
          leaf: Q,
          solid: nt.filter((et) => !et.userData.fade),
          nL: 0,
          nS: 0,
        };
      }));
  let U = [],
    G = 0,
    W = null,
    V = 0,
    $ = (q, j, K) => {
      if (q.cs !== j) {
        q.cs = q.p.cs = j;
        for (let nt = 0; nt < q.refs.length; nt += 2) {
          let Q = q.refs[nt];
          (Q.setMatrixAt(
            q.refs[nt + 1],
            (Q.userData.fade ? j & 1 : j & 2) ? q.mc || q.m : A,
          ),
            K.add(Q));
        }
      }
    },
    J = (q, j, K, nt) => {
      let Q = q[nt]++;
      for (let et of K)
        (et.setMatrixAt(Q, j.m), et.userData.tint && et.setColorAt(Q, j.tint));
      return Q;
    },
    X = (q, j, K) => {
      G++;
      let nt = performance.now(),
        Q = W
          ? Math.hypot(q - W.x, j - W.z) / Math.max((nt - W.t) / 1e3, 0.1)
          : 0;
      W = { x: q, z: j, t: nt };
      let et = 11 + Math.min(Q, 90) * 0.55,
        [st, ot] = Qx;
      for (let ut of Object.values(N)) for (let it of ut) it.nL = it.nS = 0;
      let rt = [],
        lt = new Set(),
        ht = ot[1] + et + ar * 0.71;
      for (let [ut, it] of y) {
        let [at, yt] = ut.split(",");
        if (!(Math.hypot((+at + 0.5) * ar - q, (+yt + 0.5) * ar - j) > ht))
          for (let vt of it) {
            let At = K === void 0 ? 0 : vt.p.y + 5 - K,
              Ut = Math.hypot(vt.p.x - q, vt.p.z - j, At),
              Gt = Ut - et,
              Pt = Ut + et,
              Vt = Ut < EF[0] ? 0 : Ut < EF[1] ? 1 : 2,
              Kt = Gt < st[1],
              ue = Pt > st[0] && Gt < ot[1],
              ne = Pt > ot[0],
              jt = N[vt.kind];
            if (
              (Kt &&
                jt[0].nL >= tv[0] &&
                ((Kt = !1),
                (ue = !0),
                V++ || console.warn("vegetation: the near tier is full")),
              ue &&
                jt[1].nL >= tv[1] &&
                ((ue = !1),
                (ne = !0),
                V++ || console.warn("vegetation: the mid tier is full")),
              vt.p.broken)
            ) {
              ($(vt, 0, lt), (vt.p.lod = null));
              continue;
            }
            (Vt === 0 && !Kt && (Vt = ue ? 1 : 2),
              Vt === 1 && !ue && (Vt = 2),
              $(vt, (ne ? 1 : 0) | (Vt === 2 ? 2 : 0), lt));
            let be = [];
            for (let [re, ds] of [
              [0, Kt],
              [1, ue],
            ]) {
              if (!ds) continue;
              let Nt = jt[re],
                $e = J(Nt, vt, Nt.leaf, "nL");
              if (Vt === re) {
                let ve = J(Nt, vt, Nt.solid, "nS");
                be.unshift({ ims: Nt.solid, k: ve, m: vt.m });
              }
              be.push({ ims: Nt.leaf, k: $e, m: vt.m });
            }
            ((vt.p.lod = be.length
              ? { ims: be[0].ims, k: be[0].k, m: vt.m, more: be.slice(1) }
              : null),
              be.length && ((vt.tick = G), rt.push(vt)));
          }
      }
      for (let ut of U)
        ut.tick !== G && !ut.p.broken && ($(ut, 3, lt), (ut.p.lod = null));
      U = rt;
      for (let ut of lt) ut.instanceMatrix.needsUpdate = !0;
      let pt = K ?? 0;
      for (let ut of Object.values(N))
        ut.forEach((it, at) => {
          if (it.nL || it.nS)
            for (let yt of it.ims)
              ((yt.boundingSphere ||= new _n()).center.set(q, pt, j),
                (yt.boundingSphere.radius = Qx[at][1] + et + 40));
        });
      for (let ut of Object.values(N))
        for (let it of ut) {
          for (let at of it.leaf)
            ((at.count = it.nL), (at.visible = it.nL > 0));
          for (let at of it.solid)
            ((at.count = it.nS), (at.visible = it.nS > 0));
          if (!(!it.nL && !it.nS && !it.was)) {
            it.was = it.nL + it.nS;
            for (let at of it.ims)
              ((at.instanceMatrix.needsUpdate = !0),
                at.instanceColor && (at.instanceColor.needsUpdate = !0));
          }
        }
    };
  ((l.userData.vegTiers = EF),
    (l.userData.treeKind = (q) =>
      q.kind === "tree"
        ? i[q.sp]
          ? q.sp
          : "tree" + (Math.floor(Bf(q.x, q.z) * 3) % 3)
        : q.kind));
  let tt = [],
    Z = null;
  return (
    (l.userData.cull = (q, j, K = 420, nt) => {
      for (let st of l.children) {
        if (!st.userData.c) continue;
        let [ot, rt] = st.userData.c;
        st.visible =
          Math.hypot(ot - q, rt - j) <
          Math.min(st.userData.R ?? K, K) + ar * 0.71;
      }
      let Q = Z,
        et = l.userData.gen | 0;
      if (
        Q &&
        Q.R === K &&
        Q.gen === et &&
        Math.abs(Q.x - q) < 0.01 &&
        Math.abs(Q.z - j) < 0.01 &&
        Math.abs((Q.y ?? 0) - (nt ?? 0)) < 0.01
      ) {
        tt = [() => w(q, j, K + ar * 1.5, 1.5)];
        return;
      }
      ((Z = { x: q, z: j, y: nt, R: K, gen: et }),
        C(q, j, nt),
        (tt = [() => X(q, j, nt), () => w(q, j, K + ar * 1.5, 1.5)]));
    }),
    (l.userData.step = () => {
      let q = tt.shift();
      return q ? (q(), !0) : !1;
    }),
    (l.userData.refineBlobs = w),
    l
  );
}
