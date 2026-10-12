// app 299 — push
// Lines 144611-145918 of readable/app.pretty.js (statement-aligned).
async function YJ({
  D: i,
  L: t = mI(i),
  mats: e,
  tex: s = null,
  spawn: n = [0, 0],
  mobile: o = !1,
  safe: a = !1,
  ground: r = null,
  upload: l = null,
  sky: c = null,
  billboards: h = !0,
  pause: f = null,
  skyReady: u = null,
}) {
  let d = performance.now(),
    p = d,
    m = null,
    g = async (bt, wt, _t, ie, te = 0) => {
      f &&
        performance.now() - p >= te &&
        (await f(bt, wt, m, _t, ie), (p = performance.now()));
    };
  (o && ((Pu = a ? 200 : 230), (Cw = a ? 700 : 1e3), (Am = a ? 900 : 1100)),
    (Rb.rails = Rb.lamps = !o));
  let b = o ? (a ? 1800 : 3e3) : 1 / 0,
    x =
      o && !a
        ? [
            [2600, 14],
            [5200, 30],
          ]
        : o
          ? []
          : [[16e3, 24]],
    v = (bt, wt) => bt.top - bt.base >= wt;
  m = Jc("RealCity");
  let y = [],
    M = { chunks: 0, near: 0 },
    S = c?.bOff ? iR(c, i) : null,
    w = (bt, wt = !1) => (
      S && ((bt.sky = S.vert), wt && (bt.skySplit = S.split)),
      bt
    ),
    z = (bt, wt) => {
      (S?.set(bt), zP(bt, wt, t, s));
    },
    _ = (bt, wt, _t) => {
      (S?.set(bt), n$(bt, w(wt), w(_t), s));
    };
  (fj(i), vI(i, t));
  let R = i.claims.bSkip;
  Yj(i);
  let T = new Map(),
    E = (bt) => {
      let wt = T.get(bt);
      if (!wt) {
        let [_t, ie] = bt.split(",").map(Number);
        T.set(
          bt,
          (wt = {
            key: bt,
            cx: _t,
            cz: ie,
            x: (_t + 0.5) * ui,
            z: (ie + 0.5) * ui,
            runs: [],
            elev: [],
            juns: [],
            walks: i.walks.get(bt) || [],
            curbs: i.curbs.get(bt) || [],
            blds: [],
            state: {},
          }),
        );
      }
      return wt;
    };
  for (let bt of i.edges) {
    if (bt.inner || bt.s1 - bt.s0 < 0.05) continue;
    let wt = $g(bt, bt.s0, bt.s1),
      _t = null,
      ie = null;
    for (let te = 0; te + 1 < wt.length; te++) {
      let Qt = hu(
        (wt[te][1] + wt[te + 1][1]) / 2,
        (wt[te][2] + wt[te + 1][2]) / 2,
      );
      Qt !== ie
        ? (_t && (bt.elev ? E(ie).elev : E(ie).runs).push(_t),
          (_t = [bt, wt[te][0], wt[te + 1][0]]),
          (ie = Qt))
        : (_t[2] = wt[te + 1][0]);
    }
    _t && (bt.elev ? E(ie).elev : E(ie).runs).push(_t);
  }
  for (let bt of i.juns) bt.polys.length && E(hu(bt.x, bt.z)).juns.push(bt);
  for (let bt of i.walks.keys()) E(bt);
  for (let bt of i.curbs.keys()) E(bt);
  let A = [];
  for (let bt = 0; bt < i.bld.n; bt++) {
    if (R[bt]) continue;
    let wt = mr(i, bt),
      [_t, ie] = pu(wt.rings[0]);
    ((wt.cx = _t), (wt.cz = ie), A.push(wt), E(hu(_t, ie)).blds.push(wt));
    let te = c7(i, EP(wt));
    te && y.push(te);
  }
  let C = i.terrain;
  for (
    let bt = Math.floor(C.x0 / ui) - 2;
    bt <= Math.floor((C.x0 + (C.nx - 1) * C.step) / ui) + 2;
    bt++
  )
    for (
      let wt = Math.floor(C.z0 / ui) - 2;
      wt <= Math.floor((C.z0 + (C.nz - 1) * C.step) / ui) + 2;
      wt++
    )
      E(`${bt},${wt}`);
  let P = (bt, wt) => {
      for (let [_t, ie] of Object.entries(h0)) {
        let te = ie.bounds;
        if (bt >= te.x0 && bt <= te.x1 && wt >= te.z0 && wt <= te.z1) return _t;
      }
      return null;
    },
    I = (bt) => {
      bt.reg = P(bt.x, bt.z);
      let wt = bt.reg && i.regions?.[bt.reg];
      ((bt.pend = !!wt && !wt.loaded),
        (bt.T = bt.pend ? C : t.gridAt ? t.gridAt(bt.x, bt.z) : C));
    };
  for (let bt of T.values()) I(bt);
  M.chunks = T.size;
  let L = typeof location < "u" && /[?&]parked=([\d.]+)/.exec(location.search),
    F = uI(
      i,
      t,
      o
        ? {
            car: L ? +L[1] : a ? 0.2 : 0.4,
            carExtra: jJ,
            meter: 0.25,
            well: !1,
            tree: a ? 0.5 : 1,
          }
        : null,
    );
  for (let bt of F.colliders) y.push(bt);
  let N = [];
  ($J(i, t, y, N, null, F.inst),
    r && lJ(r, i, t),
    await g(0.15, "Building the bridges", 0.25, 300));
  let B = (bt, wt, _t, { shadow: ie = !1 } = {}) => {
      if (!bt || bt.empty) return null;
      let te = e[wt] || e.facade;
      if (!te) return null;
      let Qt = new _e(bt.geometry(o), te);
      return (
        (Qt.name = `${_t}_${wt}`),
        o && (Qt.geometry.userData.mbDropCpu = !0),
        (Qt.castShadow = ie),
        (Qt.receiveShadow = !0),
        wt === "terrain" && (Qt.userData.mbGround = !0),
        Qt
      );
    },
    H = (bt, wt) => {
      wt && bt.add(wt);
    },
    O = Symbol("more");
  function D(bt, wt) {
    for (; bt.k < bt.steps.length;)
      if (
        (bt.steps[bt.k++]() === O && bt.k--,
        bt.k < bt.steps.length && performance.now() > wt)
      )
        return !1;
    return !0;
  }
  let U = (bt, wt, _t, ie, te) => () => {
    let Qt = B(wt, _t, ie, te);
    Qt &&
      (bt.meshes.push(Qt),
      _t === "walk" && !qxt && (Qt.userData.mbThin = jxt),
      bt.upload && bt.steps.splice(bt.k, 0, () => l(Qt)));
  };
  function G(bt, wt = !1, _t = !0, ie = !0) {
    let te = {
        c: bt,
        fast: wt,
        upload: _t && !!l,
        k: 0,
        steps: [],
        meshes: [],
        t0: performance.now(),
      },
      Qt = new Ce(),
      ge = new Ce(),
      pt = new Ce(),
      le = new Ce(),
      Ut = !!e.roadDeck;
    c &&
      (pt.sky = (St, Ft, Gt, Bt, Se) => {
        let Rt = t.terrainAt(St, Gt);
        return Ft < Rt + 4
          ? Math.max(Og(c, St, Gt), 1 / 255)
          : Se < -0.5
            ? 0.12 + 0.2 * Og(c, St, Gt)
            : Se > 0.5
              ? 0
              : 0.5;
      });
    let zt = new Ce();
    zt.sky = (St, Ft, Gt) =>
      VW(zt.E, St, Gt, c ? (Bt, Se) => Og(c, Bt, Se) : null);
    for (let [St, Ft, Gt] of bt.runs)
      te.steps.push(() => {
        if (St.tunnel && e.roadTun) {
          ((zt.E = St), Hy(zt, St, Ft, Gt));
          return;
        }
        (Hy(Qt, St, Ft, Gt),
          St.cls === "motorway" && !St.sunk && cP(pt, St, Ft, Gt, t, null, i),
          St.trolley ? rV(ge, St, Ft, Gt, t) : wt || aV(ge, St, Ft, Gt, t));
      });
    for (let [St, Ft, Gt] of bt.elev)
      te.steps.push(() => {
        (St.tunnelR && e.roadTun
          ? ((zt.E = St), Hy(zt, St, Ft, Gt))
          : Hy(Ut ? le : Qt, St, Ft, Gt),
          ak(pt, St, Ft, Gt, t, null, i));
      });
    for (let St of bt.juns)
      te.steps.push(() => {
        (Jj(Ut && St.elev ? le : Qt, St),
          St.elev || oV(ge, St, t),
          rk(St, t) && lk(pt, St, t, null, i));
      });
    let ft = null,
      kt = () => (ft ||= wt ? [] : bt.walks.filter((St) => ok(St, i)));
    if (!wt)
      for (let St of bt.walks)
        te.steps.push(() => {
          ok(St, i);
        });
    for (let St of bt.curbs) te.steps.push(() => tV(ge, St, t, !wt, kt(), i));
    for (let St of bt.walks) {
      let Ft = Qj(ge, St, t, wt, i, ie);
      te.steps.push(() => (Ft() ? void 0 : O));
    }
    return (
      h7(i, bt.x, bt.z, ui / 2) &&
        te.steps.push(() => {
          for (let St of [Qt, ge, le, pt]) l7(i, St);
        }),
      te.steps.push(
        U(te, Qt, "road", "road" + bt.key),
        U(te, ge, "walk", "walk" + bt.key),
        U(te, le, "roadDeck", "rdeck" + bt.key),
        U(te, zt, "roadTun", "rtun" + bt.key),
        U(te, pt, e.walkDeck ? "walkDeck" : "walk", "deck" + bt.key, {
          shadow: !0,
        }),
      ),
      te.steps.push(() => {
        let St = Jc("roads_" + bt.key);
        for (let Ft of te.meshes) St.add(Ft);
        (bt.state.roads
          ? ((St.visible = bt.state.roads.visible),
            m.remove(bt.state.roads),
            bt.state.roads.traverse((Ft) => Ft.geometry?.dispose()))
          : (St.visible = !1),
          (bt.state.roads = St),
          (bt.state.walkFast = wt),
          m.add(St));
      }),
      te
    );
  }
  function q(bt, wt) {
    if (bt.pend) return null;
    let _t = g_(
      bt.T,
      bt.cx,
      bt.cz,
      ui,
      wt,
      r ? (te, Qt) => gx(r, te, Qt) : null,
    );
    if (!_t) return null;
    let ie = B(_t, "terrain", (wt === 1 ? "tnear" : "tfar") + bt.key);
    return (ie && ((ie.visible = !1), m.add(ie)), ie);
  }
  let W = 260,
    V = 190,
    Y = 650,
    $ = {
      v: 0,
      p: { a: [] },
      empty: !0,
      vert: () => 0,
      tri() {},
      quad() {},
      wall() {},
      box() {},
    },
    st = () => $;
  function Q(bt, wt = !0) {
    let _t = { c: bt, upload: wt && !!l, k: 0, steps: [], meshes: [] },
      ie = [0, 1, 2, 3].map(() => ({})),
      te = performance.now(),
      Qt = (pt) =>
        ((pt.cx ?? bt.x) > bt.x ? 1 : 0) + ((pt.cz ?? bt.z) > bt.z ? 2 : 0),
      ge = (pt) => (le) => {
        let Ut = pt[le];
        return (
          (!Ut || Ut.v > 24e3) &&
            (Ut && (pt[le + "#" + Ut.v] = Ut),
            (Ut = pt[le] = new Ce()),
            S && (Ut.sky = S.vertOut)),
          Ut
        );
      };
    for (let pt of bt.blds)
      _t.steps.push(() => {
        (S?.set(pt), zP(pt, st, t, s, ge(ie[Qt(pt)]), !0));
      });
    return (
      _t.steps.push(() => {
        let pt = [];
        (ie.forEach((le, Ut) => {
          let zt = bt.cx * ui + (Ut & 1 ? ui / 2 : 0),
            ft = bt.cz * ui + (Ut & 2 ? ui / 2 : 0),
            kt = Jc("dress_" + bt.key + "_" + Ut),
            St = { x0: zt, z0: ft, x1: zt + ui / 2, z1: ft + ui / 2, grp: kt };
          pt.push(St);
          for (let [Ft, Gt] of Object.entries(le)) {
            let Bt = Ft.split("#")[0],
              Se = null;
            (_t.steps.push(() => {
              ((Se = B(Gt, e[Bt] ? Bt : "facade", "d" + bt.key + "_" + Ut, {
                shadow: !0,
              })),
                Se && kt.add(Se));
            }),
              _t.upload &&
                _t.steps.push(() => {
                  Se && l(Se);
                }));
          }
        }),
          _t.steps.push(() => {
            let le = Jc("dress_" + bt.key);
            for (let Ut of pt)
              Ut.grp.children.length && (le.add(Ut.grp), (Ut.grp.visible = !1));
            ((bt.state.dress = { g: le, quads: pt }),
              m.add(le),
              (M.dressMs = (M.dressMs || 0) + performance.now() - te),
              (M.dress = (M.dress || 0) + 1));
          }));
      }),
      _t
    );
  }
  let j = (bt) => {
    let wt = bt.state.dress;
    wt &&
      (m.remove(wt.g),
      wt.g.traverse((_t) => _t.geometry?.dispose()),
      (bt.state.dress = null));
  };
  function X(bt, wt = !0) {
    let _t = {
        c: bt,
        upload: wt && !!l,
        k: 0,
        steps: [],
        meshes: [],
        t0: performance.now(),
      },
      ie = {},
      te = (Qt) => (ie[Qt] ||= w(new Ce(), !0));
    _t.steps.push(() => {
      let Qt = q(bt, 1);
      (Qt && _t.upload && l(Qt), (bt.state.tNear = Qt));
    });
    for (let Qt of bt.blds) _t.steps.push(() => z(Qt, te));
    return (
      _t.steps.push(() => {
        if (h7(i, bt.x, bt.z, ui / 2))
          for (let Qt of Object.values(ie)) l7(i, Qt, !0);
        for (let [Qt, ge] of Object.entries(ie))
          _t.steps.push(
            U(_t, ge, e[Qt] ? Qt : "facade", "b" + bt.key, { shadow: !0 }),
          );
        _t.steps.push(() => {
          let Qt = Jc("bnear_" + bt.key);
          for (let ge of _t.meshes) Qt.add(ge);
          ((bt.state.bNear = Qt),
            m.add(Qt),
            (Qt.visible = !1),
            M.near++,
            (M.nearMax = Math.max(M.nearMax || 0, performance.now() - _t.t0)));
        });
      }),
      _t
    );
  }
  let K = Pu + 250,
    nt = Cw + 300,
    Z = (bt) => {
      bt && (m.remove(bt), bt.traverse((wt) => wt.geometry?.dispose()));
    };
  function et(bt, wt) {
    let _t = bt.state;
    (wt > K &&
      _t.bNear &&
      xe?.c !== bt &&
      (Z(_t.bNear),
      Z(_t.tNear),
      _t.gMat && r.release(_t.gMat),
      (_t.bNear = _t.tNear = _t.gMat = null),
      (_t.gNone = !1),
      j(bt),
      re?.c === bt && (re = null)),
      wt > nt &&
        _t.roads &&
        Fe?.c !== bt &&
        (Z(_t.roads), (_t.roads = null), (_t.walkFast = !1)));
  }
  function tt(bt, wt = !0) {
    let _t = { c: bt, upload: wt && !!l, k: 0, steps: [], meshes: [] },
      ie = new Ce(),
      te = new Ce();
    if (!bt.blds.length) return _t;
    for (let Qt = 0; Qt < bt.blds.length; Qt += 48)
      _t.steps.push(() => {
        for (let ge of bt.blds.slice(Qt, Qt + 48)) _(ge, ie, te);
      });
    return (
      _t.steps.push(
        U(_t, ie, "facade", "bf" + bt.key),
        U(_t, te, "roof", "bfr" + bt.key),
      ),
      _t.steps.push(() => {
        let Qt = Jc("bfar_" + bt.key);
        for (let ge of _t.meshes) Qt.add(ge);
        ((bt.state.bFar = Qt), m.add(Qt), (Qt.visible = !1));
      }),
      _t
    );
  }
  let it = 4,
    rt = Pu + 400,
    lt = new Map(),
    ct = (bt, wt) => {
      if (!wt || wt.empty) return;
      let _t = bt.v;
      for (let Qt of ["p", "nm", "uv", "c", "s"]) {
        let ge = bt[Qt],
          pt = wt[Qt];
        (ge.need(pt.n), ge.a.set(pt.a.subarray(0, pt.n), ge.n), (ge.n += pt.n));
      }
      bt.hasSky ||= wt.hasSky;
      let ie = bt.ix,
        te = wt.ix;
      ie.need(te.n);
      for (let Qt = 0; Qt < te.n; Qt++) ie.a[ie.n + Qt] = te.a[Qt] + _t;
      ((ie.n += te.n), (bt.v += wt.v));
    },
    dt = (bt, wt, _t, ie = null) => {
      let te = Jc("tfarb_" + bt.key);
      for (let Qt of [
        B(wt, "facade", "tbf" + bt.key),
        B(_t, "roof", "tbfr" + bt.key),
      ])
        Qt && (ie?.upload && l(Qt), te.add(Qt));
      return (m.add(te), (te.visible = !1), te);
    };
  function ut(bt, wt) {
    let _t = { t: bt, l: wt, upload: !!l, k: 0, steps: [], meshes: [] },
      ie = new Ce(),
      te = new Ce(),
      Qt = x[wt][1];
    for (let ge of bt.chunks)
      for (let pt = 0; pt < ge.blds.length; pt += 96)
        _t.steps.push(() => {
          for (let le of ge.blds.slice(pt, pt + 96)) v(le, Qt) && _(le, ie, te);
        });
    return (
      _t.steps.push(
        U(_t, ie, "facade", `tsf${wt}_` + bt.key),
        U(_t, te, "roof", `tsfr${wt}_` + bt.key),
      ),
      _t.steps.push(() => {
        let ge = Jc(`tskyb${wt}_` + bt.key);
        for (let pt of _t.meshes) ge.add(pt);
        (m.add(ge),
          (ge.visible = !1),
          (bt.sky[wt].m = ge),
          (bt.sky[wt].todo = !1));
      }),
      _t
    );
  }
  function ot(bt) {
    let wt = { t: bt, upload: !!l, k: 0, steps: [], meshes: [] },
      _t = new Ce(),
      ie = new Ce();
    for (let te of bt.chunks)
      for (let Qt = 0; Qt < te.blds.length; Qt += 48)
        wt.steps.push(() => {
          for (let ge of te.blds.slice(Qt, Qt + 48)) _(ge, _t, ie);
        });
    return (
      wt.steps.push(
        U(wt, _t, "facade", "tbf" + bt.key),
        U(wt, ie, "roof", "tbfr" + bt.key),
      ),
      wt.steps.push(() => {
        let te = Jc("tfarb_" + bt.key);
        for (let Qt of wt.meshes) te.add(Qt);
        (m.add(te), (te.visible = !1), (bt.mB = te), (bt.bTodo = !1));
      }),
      wt
    );
  }
  function at(bt) {
    let wt = { t: bt, upload: !!l, k: 0, steps: [] };
    for (let _t of bt.chunks)
      if (
        (wt.steps.push(() => {
          if (!_t.state.tFar) {
            let ie = q(_t, 4);
            (ie && l?.(ie), (_t.state.tFar = ie));
          }
        }),
        _t.blds.length && !_t.state.bFar)
      ) {
        let ie = tt(_t);
        wt.steps.push(() => (D(ie, performance.now() + 1) ? void 0 : O));
      }
    return (
      wt.steps.push(() => {
        bt.split = !0;
      }),
      wt
    );
  }
  function yt(bt) {
    for (let wt of bt.chunks)
      for (let _t of ["tFar", "bFar"]) {
        let ie = wt.state[_t];
        ie &&
          (m.remove(ie),
          ie.traverse((te) => te.geometry?.dispose()),
          (wt.state[_t] = null));
      }
    bt.split = !1;
  }
  let vt = (bt) => (l && bt && l(bt), bt),
    Pt = vt(
      sI(e, { carve: Mb, far: i.far?.[0] || null, regions: i.terrain.regions }),
    );
  m.add(Pt);
  let jt = PJ(e, { D: i, L: t, tex: s });
  (Mx(i, jt.inst, jt.colliders), m.add(jt.group));
  for (let bt of jt.colliders) y.push(bt);
  let Wt = r7(i, t);
  m.add(Wt.group);
  for (let bt of Wt.colliders) y.push(bt);
  {
    let bt = CJ(i, t);
    m.add(bt.group);
    for (let wt of bt.colliders) y.push(wt);
  }
  {
    let bt = IJ(i);
    bt && (m.add(vt(bt)), (M.gantries = bt.userData.count));
  }
  let Ct = h ? DJ(i, t, y) : null;
  (Ct && (m.add(vt(Ct.group)), (M.billboards = Ct.group.userData.stats)),
    await g(0.25, "Building the landmarks", 0.42, 900));
  let qt = performance.now(),
    Zt = qJ({ D: i, L: t, mats: e, tex: s });
  m.add(Zt.group);
  for (let bt of Zt.colliders) y.push(bt);
  ((M.landmarksMs = Math.round(performance.now() - qt)),
    await g(0.42, "Planting the parks", 0.5, 400));
  let he = null,
    ee = null;
  if (r) {
    let bt = performance.now(),
      wt = (i.claims?.list || []).filter((te) => te.poly),
      _t = (te, Qt) =>
        wt.some((ge) => {
          let pt = ge.poly,
            le = 1e9,
            Ut = 1e9,
            zt = -1e9,
            ft = -1e9;
          if (!ge.bb) {
            for (let kt = 0; kt < pt.length; kt += 2)
              ((le = Math.min(le, pt[kt])),
                (zt = Math.max(zt, pt[kt])),
                (Ut = Math.min(Ut, pt[kt + 1])),
                (ft = Math.max(ft, pt[kt + 1])));
            ge.bb = [le, Ut, zt, ft];
          }
          return (
            te >= ge.bb[0] &&
            te <= ge.bb[2] &&
            Qt >= ge.bb[1] &&
            Qt <= ge.bb[3] &&
            en(pt, te, Qt)
          );
        }),
      ie = rJ(r, (te, Qt) => t.terrainAt(te, Qt), t.clearOfRoads)
        .filter(
          (te) =>
            !_t(te.x, te.z) &&
            !rb(i, te.x, te.z, te.y) &&
            !zw(i, te.x, te.z, te.y, 0.8),
        )
        .map(hJ);
    ((ee = (te, Qt) => _t(te, Qt) || zw(i, te, Qt, void 0, 0.8)),
      (he = () => {
        let te = fJ(
          r,
          t,
          F.inst,
          (Qt, ge) =>
            _t(Qt, ge) ||
            rb(i, Qt, ge, t.terrainAt(Qt, ge)) ||
            zw(i, Qt, ge, void 0, 0.8),
        );
        return ((M.understory = te.stats), te);
      }),
      F.inst.push(...ie),
      x_(r, F.inst.concat(Zt.inst)),
      (M.groundMs = Math.round(performance.now() - bt)),
      (M.plants = ie.length));
  }
  (u && (await u, (S = c?.bOff ? iR(c, i) : null)),
    c?.lmOff && (M.skyMeshes = oR(c, jt.group, "br") + oR(c, Zt.group, "lm")),
    vt(jt.group),
    vt(Zt.group),
    await g(0.5, "Building the city", 0.53, 120));
  let Xt = 420,
    me = 700,
    re = null;
  function os(bt, wt, _t, ie = Xt) {
    if (r) {
      if (!re) {
        if (r.dirty?.size) {
          for (let ge of Dt) {
            let pt = ge.state;
            (pt.gMat || pt.gNone) &&
              r.dirty.has(ge.cx + "," + ge.cz) &&
              ((pt.gNone = !1), (pt.gRedo = !!pt.gMat));
          }
          r.dirty.clear();
        }
        let te = null,
          Qt = 1e9;
        for (let ge of Dt) {
          let pt = ge.state;
          if (!pt.tNear) continue;
          let le = qe(ge, bt, wt);
          pt.gMat && le > me
            ? ((pt.tNear.material = e.terrain),
              r.release(pt.gMat),
              (pt.gMat = null),
              (pt.gNone = !1),
              (pt.gRedo = !1))
            : (!pt.gMat || pt.gRedo) &&
              !pt.gNone &&
              le < ie &&
              le < Qt &&
              ((Qt = le), (te = ge));
        }
        te && (re = { c: te, it: oJ(r, te.cx, te.cz, te.T) });
      }
      for (; re && performance.now() < _t;) {
        let te = re.it.next();
        if (!te.done) continue;
        let Qt = re.c.state,
          ge = te.value;
        if (((re = null), !Qt.tNear)) break;
        let pt = Qt.gMat;
        ((Qt.gRedo = !1),
          ge
            ? ((Qt.gMat = r.materialFor(ge)), (Qt.tNear.material = Qt.gMat))
            : ((Qt.gMat = null),
              (Qt.gNone = !0),
              (Qt.tNear.material = e.terrain)),
          pt && r.release(pt));
      }
    }
  }
  let Dt = [...T.values()],
    qe = (bt, wt, _t) =>
      Math.hypot(
        Math.max(0, Math.abs(bt.x - wt) - ui / 2),
        Math.max(0, Math.abs(bt.z - _t) - ui / 2),
      ),
    pe = o ? Math.min(700, Am) : 1300,
    we = Math.min(2600, b);
  for (let bt of Dt) {
    let wt = `${Math.floor(bt.cx / it)},${Math.floor(bt.cz / it)}`,
      _t = lt.get(wt);
    (_t ||
      lt.set(
        wt,
        (_t = {
          key: wt,
          chunks: [],
          x0: 1e9,
          z0: 1e9,
          x1: -1e9,
          z1: -1e9,
          split: !1,
          sjob: null,
          mT: null,
          mB: null,
          bTodo: !1,
          sky: x.map(() => ({ m: null, todo: !1, n: -1 })),
        }),
      ),
      _t.chunks.push(bt),
      (bt.tile = _t),
      (_t.x0 = Math.min(_t.x0, bt.cx * ui)),
      (_t.z0 = Math.min(_t.z0, bt.cz * ui)),
      (_t.x1 = Math.max(_t.x1, (bt.cx + 1) * ui)),
      (_t.z1 = Math.max(_t.z1, (bt.cz + 1) * ui)));
  }
  let rs = [...lt.values()],
    Le = (bt, wt, _t) =>
      Math.hypot(
        Math.max(0, bt.x0 - wt, wt - bt.x1),
        Math.max(0, bt.z0 - _t, _t - bt.z1),
      ),
    de = r ? (bt, wt) => gx(r, bt, wt) : null;
  for (let bt of rs) {
    let wt = Le(bt, n[0], n[1]),
      _t = wt < rt,
      ie = wt < pe,
      te = new Ce(),
      Qt = new Ce(),
      ge = new Ce();
    bt.tTodo = !_t && wt > we;
    for (let pt of bt.chunks) {
      let le = bt.tTodo || pt.pend ? null : g_(pt.T, pt.cx, pt.cz, ui, 4, de);
      if (le && (ct(te, le), _t)) {
        let Ut = B(le, "terrain", "tfar" + pt.key);
        Ut && ((Ut.visible = !1), m.add(Ut), (pt.state.tFar = Ut));
      }
      if (ie && pt.blds.length) {
        let Ut = new Ce(),
          zt = new Ce();
        for (let ft of pt.blds) _(ft, Ut, zt);
        if ((ct(Qt, Ut), ct(ge, zt), _t)) {
          let ft = Jc("bfar_" + pt.key);
          for (let kt of [
            B(Ut, "facade", "bf" + pt.key),
            B(zt, "roof", "bfr" + pt.key),
          ])
            kt && ft.add(kt);
          ((pt.state.bFar = ft), m.add(ft), (ft.visible = !1));
        }
      }
    }
    ((bt.mT = B(te, "terrain", "ttile" + bt.key)),
      bt.mT && ((bt.mT.visible = !1), m.add(bt.mT)),
      ie
        ? (bt.mB = dt(bt, Qt, ge))
        : (bt.bTodo = bt.chunks.some((pt) => pt.blds.length)),
      (bt.split = _t),
      vt(bt.mT),
      vt(bt.mB));
    for (let pt of bt.chunks) (vt(pt.state.tFar), vt(pt.state.bFar));
    {
      let pt = 0.5 + (0.25 * (rs.indexOf(bt) + 1)) / rs.length;
      await g(pt, "Building the city", Math.min(0.75, pt + 0.035), 120, 100);
    }
  }
  let Ie = performance.now();
  for (let bt = 0; bt < Dt.length; bt++) {
    let wt = Dt[bt],
      _t = qe(wt, n[0], n[1]),
      ie = 0.75 + (0.25 * (bt + 1)) / Dt.length,
      te = Math.min(1, ie + 0.03);
    for (let Qt of [
      _t < Math.min(1e3, Cw) ? G(wt, _t > 250, !1, _t < 600) : null,
      _t < Pu - 100 ? X(wt, !1) : null,
    ])
      if (Qt)
        for (; !D(Qt, f ? performance.now() + 100 : 1 / 0);)
          await g(ie, "Building the streets", te, 120);
    (vt(wt.state.roads),
      vt(wt.state.bNear),
      vt(wt.state.tNear),
      await g(ie, "Building the streets", te, 120, 100));
  }
  let ps = performance.now();
  M.loadMs = { index: Math.round(Ie - d), near: Math.round(ps - Ie) };
  let gt = 600,
    se = 700,
    Nt = 0,
    xe = null,
    ce = null,
    Ge = !1,
    Fe = null,
    $e = null,
    Ds = null,
    Es = null,
    Ls = null,
    Os = null,
    hs = null,
    Zs = 0,
    We = 0,
    Is = (bt, wt) => {
      let _t = performance.now() - wt;
      _t > (M.maxMs[bt] || 0) && (M.maxMs[bt] = Math.round(_t * 10) / 10);
    };
  M.maxMs = {};
  let ns = Math.min(b, rt + 900);
  function rn(bt, wt, _t) {
    let ie = null,
      te = _t;
    for (let pt of rs) {
      if (!pt.tTodo) continue;
      let le = Le(pt, bt, wt);
      le < te && ((te = le), (ie = pt));
    }
    if (!ie) return !1;
    let Qt = performance.now(),
      ge = new Ce();
    for (let pt of ie.chunks) {
      if (pt.pend) continue;
      let le = g_(pt.T, pt.cx, pt.cz, ui, 4, de);
      le && ct(ge, le);
    }
    return (
      (ie.mT = B(ge, "terrain", "ttile" + ie.key)),
      ie.mT && ((ie.mT.visible = !ie.split), m.add(ie.mT), l?.(ie.mT)),
      (ie.tTodo = !1),
      (Ge = !0),
      Is("ground", Qt),
      !0
    );
  }
  function dn(bt, wt, _t = 0.016, ie = 2.5) {
    (Zt.update(bt, wt, _t), jt.update(bt, wt, _t), Ct?.update(bt, wt));
    let te = performance.now(),
      Qt = te + ie;
    if (Os !== null && _t > 0) {
      let zt = (bt - Os) / _t,
        ft = (wt - hs) / _t,
        kt = Math.min(1, _t * 2);
      ((Zs += (zt - Zs) * kt), (We += (ft - We) * kt));
    }
    ((Os = bt), (hs = wt));
    let ge = Math.hypot(Zs, We),
      pt = ge > 3 ? Zs / ge : 0,
      le = ge > 3 ? We / ge : 0,
      Ut = (zt, ft) =>
        ft - 0.5 * Math.max(0, (zt.x - bt) * pt + (zt.z - wt) * le);
    if (!$e) {
      let zt = null,
        ft = se;
      for (let kt of Dt) {
        if (kt.state.roads || kt === Fe?.c) continue;
        let St = qe(kt, bt, wt);
        if (St >= se) continue;
        let Ft = Ut(kt, St);
        Ft < ft && ((ft = Ft), (zt = kt));
      }
      zt && ($e = G(zt, qe(zt, bt, wt) > gt));
    }
    if ($e) {
      let zt = performance.now();
      (D($e, Qt) && (($e = null), (Ge = !0)), Is("road", zt));
    }
    if (
      (rn(bt, wt, ns),
      (re || performance.now() < Qt) &&
        os(bt, wt, Math.min(Qt, performance.now() + 0.7), 120),
      !xe)
    ) {
      let zt = null,
        ft = 1e9;
      for (let kt of Dt) {
        if (kt.state.bNear || !kt.tile.split) continue;
        let St = qe(kt, bt, wt);
        if (St >= Pu + 120) continue;
        let Ft = Ut(kt, St);
        Ft < ft && ((ft = Ft), (zt = kt));
      }
      zt && (xe = X(zt));
    }
    for (; !xe && performance.now() < Qt;) {
      if (!Ls) {
        let ft = null,
          kt = rt;
        for (let St of rs) {
          if (St.split) continue;
          let Ft = Le(St, bt, wt);
          Ft < kt && ((kt = Ft), (ft = St));
        }
        if (!ft) break;
        Ls = at(ft);
      }
      let zt = performance.now();
      (D(Ls, Qt) && ((Ls = null), (Ge = !0)), Is("split", zt));
    }
    if (xe) {
      let zt = performance.now();
      (D(xe, Qt) && ((xe = null), (Ge = !0)), Is("near", zt));
    }
    if (!xe && s && !o && e.dress && performance.now() < Qt) {
      if (!ce) {
        let zt = null,
          ft = 1e9;
        for (let kt of Dt) {
          if (kt.state.dress || !kt.state.bNear) continue;
          let St = qe(kt, bt, wt);
          if (St >= W) continue;
          let Ft = Ut(kt, St);
          Ft < ft && ((ft = Ft), (zt = kt));
        }
        zt && (ce = Q(zt));
      }
      if (ce) {
        let zt = performance.now();
        (D(ce, Qt) && ((ce = null), (Ge = !0)), Is("dress", zt));
      }
    }
    if (!xe && performance.now() < Qt) {
      let zt = performance.now();
      (os(bt, wt, Qt), Is("ground", zt));
    }
    for (; !xe && performance.now() < Qt && rn(bt, wt, b););
    for (; !xe && performance.now() < Qt;) {
      if (!Ds) {
        let ft = null,
          kt = Am;
        for (let St of rs) {
          if (!St.bTodo) continue;
          let Ft = Le(St, bt, wt);
          Ft < kt && ((kt = Ft), (ft = St));
        }
        if (!ft) break;
        Ds = ot(ft);
      }
      let zt = performance.now();
      (D(Ds, Qt) && ((Ds = null), (Ge = !0)), Is("far", zt));
    }
    for (; x.length && !xe && performance.now() < Qt;) {
      if (!Es) {
        let ft = null,
          kt = 0,
          St = 1e9;
        for (let Ft of rs)
          for (let Gt = 0; Gt < x.length; Gt++) {
            if (!Ft.sky[Gt].todo) continue;
            let Bt = Le(Ft, bt, wt);
            Bt < St && ((St = Bt), (ft = Ft), (kt = Gt));
          }
        if (!ft) break;
        Es = ut(ft, kt);
      }
      let zt = performance.now();
      (D(Es, Qt) && ((Es = null), (Ge = !0)), Is("far", zt));
    }
    for (; !xe && performance.now() < Qt;) {
      if (!Fe) {
        let ft = null,
          kt = 1e9;
        for (let St of Dt) {
          if ((St.state.roads && !St.state.walkFast) || St === $e?.c) continue;
          let Ft = qe(St, bt, wt);
          if (Ft > (St.state.roads ? gt + 300 : Cw)) continue;
          let Gt = Ut(St, St.state.roads ? Ft : Ft - 800);
          Gt < kt && ((kt = Gt), (ft = St));
        }
        if (!ft) break;
        Fe = G(ft, !ft.state.roads && qe(ft, bt, wt) > gt);
      }
      let zt = performance.now();
      (D(Fe, Qt) && ((Fe = null), (Ge = !0)), Is("road", zt));
    }
    if ((Is("update", te), !((Nt -= _t) > 0 && !Ge))) {
      ((Nt = 0.2), (Ge = !1));
      for (let zt of rs) {
        let ft = Le(zt, bt, wt);
        (zt.split && ft > rt + 400 && !zt.bTodo && zt !== Ls?.t && yt(zt),
          o &&
            !zt.split &&
            (zt.mB &&
              ft > Am + 500 &&
              zt !== Ds?.t &&
              (m.remove(zt.mB),
              zt.mB.traverse((Ft) => Ft.geometry?.dispose()),
              (zt.mB = null),
              (zt.bTodo = zt.chunks.some((Ft) => Ft.blds.length))),
            zt.mT &&
              ft > b + 500 &&
              (m.remove(zt.mT),
              zt.mT.geometry.dispose(),
              (zt.mT = null),
              (zt.tTodo = !0))),
          zt.mT && (zt.mT.visible = !zt.split),
          zt.mB && (zt.mB.visible = !zt.split && ft < Am));
        let kt = !!(zt.mB && zt.mB.visible) || zt.split,
          St = o || wt < -2e3;
        for (let Ft = 0; Ft < x.length; Ft++) {
          let Gt = zt.sky[Ft],
            [Bt, Se] = x[Ft],
            Rt = Ft ? x[Ft - 1][0] : Am,
            Vt = Es?.t === zt && Es.l === Ft;
          (Gt.m &&
            (ft > Bt + 500 || ft < Rt - 600) &&
            !Vt &&
            (m.remove(Gt.m),
            Gt.m.traverse((Pe) => Pe.geometry?.dispose()),
            (Gt.m = null)),
            !Gt.m &&
              !Vt &&
              (Gt.todo =
                St &&
                ft < Bt &&
                ft > Rt - 400 &&
                (Gt.n < 0
                  ? (Gt.n = zt.chunks.reduce(
                      (Pe, bs) => Pe + bs.blds.filter((Ts) => v(Ts, Se)).length,
                      0,
                    ))
                  : Gt.n) > 0),
            Gt.m &&
              ((Gt.m.visible = St && !kt && ft < Bt), (kt ||= Gt.m.visible)));
        }
      }
      for (let zt of Dt) {
        let ft = qe(zt, bt, wt),
          kt = zt.tile.split,
          St = zt.state;
        o && et(zt, ft);
        let Ft = kt && St.bNear && (ft < Pu || (St.wasNear && ft < Pu + 40));
        ((St.wasNear = !!Ft), St.roads && (St.roads.visible = ft < Cw));
        let Gt = kt && St.tNear && (ft < Pu || (St.wasNearT && ft < Pu + 40));
        if (
          ((St.wasNearT = !!Gt),
          St.tNear && (St.tNear.visible = !!Gt),
          St.tFar && (St.tFar.visible = kt && !Gt),
          St.bNear && (St.bNear.visible = !!Ft),
          St.bFar && (St.bFar.visible = kt && !Ft && ft < Am),
          St.dress)
        )
          if (ft > Y) j(zt);
          else
            for (let Bt of St.dress.quads)
              Bt.grp.visible =
                !!Ft &&
                Math.hypot(
                  Math.max(0, Bt.x0 - bt, bt - Bt.x1),
                  Math.max(0, Bt.z0 - wt, wt - Bt.z1),
                ) <
                  V + (Bt.grp.visible ? 15 : 0);
      }
    }
  }
  function Hn(bt, wt, _t = 180) {
    for (let ie of Dt)
      if (ie.pend && qe(ie, bt, wt) < ns) return (Kt.needRegion?.(ie.reg), !1);
    for (let ie of rs) if (ie.tTodo && Le(ie, bt, wt) < ns) return !1;
    for (let ie of Dt)
      if (
        !(qe(ie, bt, wt) >= _t) &&
        (!ie.state.roads || !ie.tile.split || !ie.state.bNear)
      )
        return !1;
    return !0;
  }
  function* Dn(bt, wt) {
    let _t = performance.now(),
      ie = new Set(),
      te = 0,
      Qt = performance.now(),
      ge = () => ((te += performance.now() - Qt), 1),
      pt = () => {
        Qt = performance.now();
      };
    {
      let ft = h0[bt.key].bounds;
      for (
        let kt = Math.floor(ft.x0 / ui);
        kt <= Math.floor((ft.x1 - 1) / ui);
        kt++
      )
        for (
          let St = Math.floor(ft.z0 / ui);
          St <= Math.floor((ft.z1 - 1) / ui);
          St++
        ) {
          let Ft = `${kt},${St}`;
          if (T.has(Ft)) continue;
          let Gt = E(Ft);
          Dt.push(Gt);
          let Bt = `${Math.floor(Gt.cx / it)},${Math.floor(Gt.cz / it)}`,
            Se = lt.get(Bt);
          (Se ||
            (lt.set(
              Bt,
              (Se = {
                key: Bt,
                chunks: [],
                x0: 1e9,
                z0: 1e9,
                x1: -1e9,
                z1: -1e9,
                split: !1,
                sjob: null,
                mT: null,
                mB: null,
                bTodo: !1,
                sky: x.map(() => ({ m: null, todo: !1, n: -1 })),
              }),
            ),
            rs.push(Se)),
            Se.chunks.push(Gt),
            (Gt.tile = Se),
            (Se.x0 = Math.min(Se.x0, Gt.cx * ui)),
            (Se.z0 = Math.min(Se.z0, Gt.cz * ui)),
            (Se.x1 = Math.max(Se.x1, (Gt.cx + 1) * ui)),
            (Se.z1 = Math.max(Se.z1, (Gt.cz + 1) * ui)),
            (Gt.reg = bt.key),
            (Gt.pend = !0));
        }
    }
    (yield ge(), pt());
    let le = i.claims.bSkip;
    for (let ft = bt.b0; ft < bt.b1; ft++) {
      if (le[ft]) continue;
      let kt = mr(i, ft),
        [St, Ft] = pu(kt.rings[0]);
      ((kt.cx = St), (kt.cz = Ft));
      let Gt = T.get(hu(St, Ft));
      if (Gt) {
        (A.push(kt), Gt.blds.push(kt), ie.add(Gt.tile));
        let Bt = c7(i, EP(kt));
        Bt && wt.colliders.push(Bt);
      }
      (ft - bt.b0) % 250 === 249 && (yield ge(), pt());
    }
    let Ut = o
        ? {
            car: L ? +L[1] : a ? 0.2 : 0.4,
            carExtra: jJ,
            meter: 0.25,
            well: !1,
            tree: a ? 0.5 : 1,
          }
        : null,
      zt = 4e3;
    for (let ft = bt.p0; ft < bt.p1 || ft === bt.p0; ft += zt) {
      let kt = ft + zt >= bt.p1,
        St = uI(i, t, Ut, {
          p0: ft,
          p1: Math.min(bt.p1, ft + zt),
          b0: kt ? bt.b0 : 0,
          b1: kt ? bt.b1 : 0,
        });
      for (let Ft of St.inst) wt.inst.push(Ft);
      for (let Ft of St.colliders) wt.colliders.push(Ft);
      if ((yield ge(), pt(), bt.p1 <= bt.p0)) break;
    }
    for (let ft of $J(i, t, [], null, bt.key, wt.inst)) wt.colliders.push(ft);
    if ((yield ge(), pt(), bt.grid?.tunnels?.length)) {
      let ft = r7(i, t, bt.grid.tunnels);
      m.add(ft.group);
      for (let kt of ft.colliders) wt.colliders.push(kt);
      for (let kt of ft.night) {
        let St =
          _i.find((Ft) => Ft.userData.mbAlbedo === kt.userData.mbAlbedo) ||
          _i[0];
        (St && kt.color.copy(St.color), _i.push(kt));
      }
      (l?.(ft.group), yield ge(), pt());
    }
    for (let ft of Dt) ft.reg === bt.key && (I(ft), ie.add(ft.tile));
    for (let ft of ie) {
      (ft.split && yt(ft),
        ft.mT && (m.remove(ft.mT), ft.mT.geometry.dispose(), (ft.mT = null)),
        (ft.tTodo = !0),
        ft.mB &&
          (m.remove(ft.mB),
          ft.mB.traverse((kt) => kt.geometry?.dispose()),
          (ft.mB = null)),
        (ft.bTodo = ft.chunks.some((kt) => kt.blds.length)));
      for (let kt of ft.chunks) {
        let St = kt.state;
        St.bNear &&
          (Z(St.bNear),
          Z(St.tNear),
          St.gMat && r.release(St.gMat),
          (St.bNear = St.tNear = St.gMat = null),
          (St.gNone = !1),
          j(kt));
      }
    }
    if (((Ge = !0), yield ge(), pt(), bt.key === "west" && Xy?.mid)) {
      let ft = i.terrain.bounds,
        kt = el.z0 + 80,
        St = ft.z1 - 60;
      for (let Ft = 0; Ft < 4; Ft++) {
        let Gt = Jc("notch_houses" + Ft);
        try {
          (DS(
            { group: Gt },
            Xy,
            { L: t },
            [
              [
                ft.x0 + 150,
                el.x1 - 60,
                kt + ((St - kt) * Ft) / 4,
                kt + ((St - kt) * (Ft + 1)) / 4,
              ],
            ],
            !0,
          ),
            m.add(Gt),
            vt(Gt));
        } catch (Bt) {
          console.warn("notch houses", Bt);
        }
        (yield ge(), pt());
      }
    }
    (bt.grid?.clipBox &&
      (m.remove(Pt),
      Pt.traverse((ft) => ft.geometry?.dispose()),
      (Pt = vt(
        sI(e, {
          carve: Mb,
          far: i.far?.[0] || null,
          regions: i.terrain.regions,
        }),
      )),
      m.add(Pt)),
      (te += performance.now() - Qt),
      (M.regions = {
        ...(M.regions || {}),
        [bt.key]: {
          ms: Math.round(te),
          wall: Math.round(performance.now() - _t),
          buildings: bt.b1 - bt.b0,
          props: wt.inst.length,
        },
      }));
  }
  function Un(bt) {
    if (!bt) return null;
    let wt = { colliders: [], inst: [] };
    for (let _t of Dn(bt, wt));
    return wt;
  }
  (dn(n[0], n[1], 1, 0), (M.maxMs = {}));
  let Xs = F.inst.concat(Zt.inst, jt.inst),
    _i = Zt.night.concat(jt.night, Wt.night, Ct ? Ct.night : []);
  (console.log(
    `real city: ${T.size} chunks, ${A.length} buildings, ${Xs.length} props, ${y.length} colliders; index ${M.loadMs.index} ms, near ${M.loadMs.near} ms, landmarks ${M.landmarksMs} ms${c?.lmKeys ? `; sky visibility on ${M.skyMeshes}/${c.lmKeys.length} landmark / bridge meshes` : ""}`,
  ),
    N.push(...VP.splice(0), ...QP.splice(0), ...oC.splice(0)));
  let Kt = {
    skyFieldIn: () => {
      let bt = 0;
      for (let wt of Dt)
        wt.state.roads &&
          (wt.elev?.length || wt.runs?.some((_t) => _t[0]?.tunnel)) &&
          ((wt.state.walkFast = !0), bt++);
      return bt;
    },
    group: m,
    colliders: y,
    lateColliders: N,
    inst: Xs,
    night: _i,
    landmarks: Zt,
    billboards: Ct,
    ground: r,
    plantLater: he,
    claimedAt: ee,
    layout: t,
    data: i,
    update: dn,
    readyAt: Hn,
    stats: M,
    chunks: T,
    addRegion: Un,
    addRegionSteps: Dn,
    needRegion: null,
  };
  return Kt;
}
