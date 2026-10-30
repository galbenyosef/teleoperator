// app 298 — push
// Lines 144897-146210 of readable/app.pretty.js (statement-aligned).
async function QQ({
  D: o,
  L: t = qF(o),
  mats: e,
  tex: s = null,
  spawn: n = [0, 0],
  mobile: i = !1,
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
    g = async (xt, wt, _t, ae, se = 0) => {
      f &&
        performance.now() - p >= se &&
        (await f(xt, wt, m, _t, ae), (p = performance.now()));
    };
  (i && ((ud = a ? 200 : 230), (EM = a ? 700 : 1e3), (g2 = a ? 900 : 1100)),
    (gx.rails = gx.lamps = !i));
  let b = i ? (a ? 1800 : 3e3) : 1 / 0,
    v =
      i && !a
        ? [
            [2600, 14],
            [5200, 30],
          ]
        : i
          ? []
          : [[16e3, 24]],
    x = (xt, wt) => xt.top - xt.base >= wt;
  m = Sc("RealCity");
  let y = [],
    M = { chunks: 0, near: 0 },
    S = c?.bOff ? C7(c, o) : null,
    w = (xt, wt = !1) => (
      S && ((xt.sky = S.vert), wt && (xt.skySplit = S.split)),
      xt
    ),
    _ = (xt, wt) => {
      (S?.set(xt), nL(xt, wt, t, s));
    },
    z = (xt, wt, _t) => {
      (S?.set(xt), aK(xt, w(wt), w(_t), s));
    };
  (d$(o), KF(o, t));
  let A = o.claims.bSkip;
  Q$(o);
  let T = new Map(),
    E = (xt) => {
      let wt = T.get(xt);
      if (!wt) {
        let [_t, ae] = xt.split(",").map(Number);
        T.set(
          xt,
          (wt = {
            key: xt,
            cx: _t,
            cz: ae,
            x: (_t + 0.5) * _i,
            z: (ae + 0.5) * _i,
            runs: [],
            elev: [],
            juns: [],
            walks: o.walks.get(xt) || [],
            curbs: o.curbs.get(xt) || [],
            blds: [],
            state: {},
          }),
        );
      }
      return wt;
    };
  for (let xt of o.edges) {
    if (xt.inner || xt.s1 - xt.s0 < 0.05) continue;
    let wt = Ob(xt, xt.s0, xt.s1),
      _t = null,
      ae = null;
    for (let se = 0; se + 1 < wt.length; se++) {
      let Jt = ju(
        (wt[se][1] + wt[se + 1][1]) / 2,
        (wt[se][2] + wt[se + 1][2]) / 2,
      );
      Jt !== ae
        ? (_t && (xt.elev ? E(ae).elev : E(ae).runs).push(_t),
          (_t = [xt, wt[se][0], wt[se + 1][0]]),
          (ae = Jt))
        : (_t[2] = wt[se + 1][0]);
    }
    _t && (xt.elev ? E(ae).elev : E(ae).runs).push(_t);
  }
  for (let xt of o.juns) xt.polys.length && E(ju(xt.x, xt.z)).juns.push(xt);
  for (let xt of o.walks.keys()) E(xt);
  for (let xt of o.curbs.keys()) E(xt);
  let R = [];
  for (let xt = 0; xt < o.bld.n; xt++) {
    if (A[xt]) continue;
    let wt = er(o, xt),
      [_t, ae] = Ef(wt.rings[0]);
    ((wt.cx = _t), (wt.cz = ae), R.push(wt), E(ju(_t, ae)).blds.push(wt));
    let se = HP(o, Bw(wt));
    se && y.push(se);
  }
  let P = o.terrain;
  for (
    let xt = Math.floor(P.x0 / _i) - 2;
    xt <= Math.floor((P.x0 + (P.nx - 1) * P.step) / _i) + 2;
    xt++
  )
    for (
      let wt = Math.floor(P.z0 / _i) - 2;
      wt <= Math.floor((P.z0 + (P.nz - 1) * P.step) / _i) + 2;
      wt++
    )
      E(`${xt},${wt}`);
  let C = (xt, wt) => {
      for (let [_t, ae] of Object.entries(z0)) {
        let se = ae.bounds;
        if (xt >= se.x0 && xt <= se.x1 && wt >= se.z0 && wt <= se.z1) return _t;
      }
      return null;
    },
    I = (xt) => {
      xt.reg = C(xt.x, xt.z);
      let wt = xt.reg && o.regions?.[xt.reg];
      ((xt.pend = !!wt && !wt.loaded),
        (xt.T = xt.pend ? P : t.gridAt ? t.gridAt(xt.x, xt.z) : P));
    };
  for (let xt of T.values()) I(xt);
  M.chunks = T.size;
  let L = typeof location < "u" && /[?&]parked=([\d.]+)/.exec(location.search),
    F = GF(
      o,
      t,
      i
        ? {
            car: L ? +L[1] : a ? 0.2 : 0.4,
            carExtra: XQ,
            meter: 0.25,
            well: !1,
            tree: a ? 0.5 : 1,
          }
        : null,
    );
  for (let xt of F.colliders) y.push(xt);
  let O = [];
  (YQ(o, t, y, O, null, F.inst),
    r && fQ(r, o, t),
    await g(0.15, "Building the bridges", 0.25, 300));
  let B = (xt, wt, _t, { shadow: ae = !1 } = {}) => {
      if (!xt || xt.empty) return null;
      let se = e[wt] || e.facade;
      if (!se) return null;
      let Jt = new ye(xt.geometry(i), se);
      return (
        (Jt.name = `${_t}_${wt}`),
        i && (Jt.geometry.userData.mbDropCpu = !0),
        (Jt.castShadow = ae),
        (Jt.receiveShadow = !0),
        wt === "terrain" && (Jt.userData.mbGround = !0),
        Jt
      );
    },
    H = (xt, wt) => {
      wt && xt.add(wt);
    },
    N = Symbol("more");
  function D(xt, wt) {
    for (; xt.k < xt.steps.length;)
      if (
        (xt.steps[xt.k++]() === N && xt.k--,
        xt.k < xt.steps.length && performance.now() > wt)
      )
        return !1;
    return !0;
  }
  let U = (xt, wt, _t, ae, se) => () => {
    let Jt = B(wt, _t, ae, se);
    Jt &&
      (xt.meshes.push(Jt),
      _t === "walk" && !m5t && (Jt.userData.mbThin = g5t),
      xt.upload && xt.steps.splice(xt.k, 0, () => l(Jt)));
  };
  function G(xt, wt = !1, _t = !0, ae = !0) {
    let se = {
        c: xt,
        fast: wt,
        upload: _t && !!l,
        k: 0,
        steps: [],
        meshes: [],
        t0: performance.now(),
      },
      Jt = new Be(),
      _e = new Be(),
      mt = new Be(),
      ie = new Be(),
      Dt = !!e.roadDeck;
    c &&
      (mt.sky = (kt, Ft, qt, Et, Me) => {
        let de = t.terrainAt(kt, qt);
        return Ft < de + 4
          ? Math.max(Eb(c, kt, qt), 1 / 255)
          : Me < -0.5
            ? 0.12 + 0.2 * Eb(c, kt, qt)
            : Me > 0.5
              ? 0
              : 0.5;
      });
    let Ht = new Be();
    Ht.sky = (kt, Ft, qt) =>
      Xq(Ht.E, kt, qt, c ? (Et, Me) => Eb(c, Et, Me) : null);
    for (let [kt, Ft, qt] of xt.runs)
      se.steps.push(() => {
        if (kt.tunnel && e.roadTun) {
          ((Ht.E = kt), Lw(Ht, kt, Ft, qt));
          return;
        }
        (Lw(Jt, kt, Ft, qt),
          kt.cls === "motorway" && !kt.sunk && DC(mt, kt, Ft, qt, t, null, o),
          kt.trolley ? hX(_e, kt, Ft, qt, t) : wt || cX(_e, kt, Ft, qt, t));
      });
    for (let [kt, Ft, qt] of xt.elev)
      se.steps.push(() => {
        (kt.tunnelR && e.roadTun
          ? ((Ht.E = kt), Lw(Ht, kt, Ft, qt))
          : Lw(Dt ? ie : Jt, kt, Ft, qt),
          az(mt, kt, Ft, qt, t, null, o));
      });
    for (let kt of xt.juns)
      se.steps.push(() => {
        (tX(Dt && kt.elev ? ie : Jt, kt),
          kt.elev || lX(_e, kt, t),
          rz(kt, t) && lz(mt, kt, t, null, o));
      });
    let ft = null,
      zt = () => (ft ||= wt ? [] : xt.walks.filter((kt) => oz(kt, o)));
    if (!wt)
      for (let kt of xt.walks)
        se.steps.push(() => {
          oz(kt, o);
        });
    for (let kt of xt.curbs) se.steps.push(() => nX(_e, kt, t, !wt, zt(), o));
    for (let kt of xt.walks) {
      let Ft = sX(_e, kt, t, wt, o, ae);
      se.steps.push(() => (Ft() ? void 0 : N));
    }
    return (
      DP(o, xt.x, xt.z, _i / 2) &&
        se.steps.push(() => {
          for (let kt of [Jt, _e, ie, mt]) NP(o, kt);
        }),
      se.steps.push(
        U(se, Jt, "road", "road" + xt.key),
        U(se, _e, "walk", "walk" + xt.key),
        U(se, ie, "roadDeck", "rdeck" + xt.key),
        U(se, Ht, "roadTun", "rtun" + xt.key),
        U(se, mt, e.walkDeck ? "walkDeck" : "walk", "deck" + xt.key, {
          shadow: !0,
        }),
      ),
      se.steps.push(() => {
        let kt = Sc("roads_" + xt.key);
        for (let Ft of se.meshes) kt.add(Ft);
        (xt.state.roads
          ? ((kt.visible = xt.state.roads.visible),
            m.remove(xt.state.roads),
            xt.state.roads.traverse((Ft) => Ft.geometry?.dispose()))
          : (kt.visible = !1),
          (xt.state.roads = kt),
          (xt.state.walkFast = wt),
          m.add(kt));
      }),
      se
    );
  }
  function W(xt, wt) {
    if (xt.pend) return null;
    let _t = g_(
      xt.T,
      xt.cx,
      xt.cz,
      _i,
      wt,
      r ? (se, Jt) => sv(r, se, Jt) : null,
    );
    if (!_t) return null;
    let ae = B(_t, "terrain", (wt === 1 ? "tnear" : "tfar") + xt.key);
    return (ae && ((ae.visible = !1), m.add(ae)), ae);
  }
  let V = 260,
    $ = 190,
    J = 650,
    X = {
      v: 0,
      p: { a: [] },
      empty: !0,
      vert: () => 0,
      tri() {},
      quad() {},
      wall() {},
      box() {},
    },
    tt = () => X;
  function Z(xt, wt = !0) {
    let _t = { c: xt, upload: wt && !!l, k: 0, steps: [], meshes: [] },
      ae = [0, 1, 2, 3].map(() => ({})),
      se = performance.now(),
      Jt = (mt) =>
        ((mt.cx ?? xt.x) > xt.x ? 1 : 0) + ((mt.cz ?? xt.z) > xt.z ? 2 : 0),
      _e = (mt) => (ie) => {
        let Dt = mt[ie];
        return (
          (!Dt || Dt.v > 24e3) &&
            (Dt && (mt[ie + "#" + Dt.v] = Dt),
            (Dt = mt[ie] = new Be()),
            S && (Dt.sky = S.vertOut)),
          Dt
        );
      };
    for (let mt of xt.blds)
      _t.steps.push(() => {
        (S?.set(mt), nL(mt, tt, t, s, _e(ae[Jt(mt)]), !0));
      });
    return (
      _t.steps.push(() => {
        let mt = [];
        (ae.forEach((ie, Dt) => {
          let Ht = xt.cx * _i + (Dt & 1 ? _i / 2 : 0),
            ft = xt.cz * _i + (Dt & 2 ? _i / 2 : 0),
            zt = Sc("dress_" + xt.key + "_" + Dt),
            kt = { x0: Ht, z0: ft, x1: Ht + _i / 2, z1: ft + _i / 2, grp: zt };
          mt.push(kt);
          for (let [Ft, qt] of Object.entries(ie)) {
            let Et = Ft.split("#")[0],
              Me = null;
            (_t.steps.push(() => {
              ((Me = B(qt, e[Et] ? Et : "facade", "d" + xt.key + "_" + Dt, {
                shadow: !0,
              })),
                Me && zt.add(Me));
            }),
              _t.upload &&
                _t.steps.push(() => {
                  Me && l(Me);
                }));
          }
        }),
          _t.steps.push(() => {
            let ie = Sc("dress_" + xt.key);
            for (let Dt of mt)
              Dt.grp.children.length && (ie.add(Dt.grp), (Dt.grp.visible = !1));
            ((xt.state.dress = { g: ie, quads: mt }),
              m.add(ie),
              (M.dressMs = (M.dressMs || 0) + performance.now() - se),
              (M.dress = (M.dress || 0) + 1));
          }));
      }),
      _t
    );
  }
  let q = (xt) => {
    let wt = xt.state.dress;
    wt &&
      (m.remove(wt.g),
      wt.g.traverse((_t) => _t.geometry?.dispose()),
      (xt.state.dress = null));
  };
  function j(xt, wt = !0) {
    let _t = {
        c: xt,
        upload: wt && !!l,
        k: 0,
        steps: [],
        meshes: [],
        t0: performance.now(),
      },
      ae = {},
      se = (Jt) => (ae[Jt] ||= w(new Be(), !0));
    _t.steps.push(() => {
      let Jt = W(xt, 1);
      (Jt && _t.upload && l(Jt), (xt.state.tNear = Jt));
    });
    for (let Jt of xt.blds) _t.steps.push(() => _(Jt, se));
    return (
      _t.steps.push(() => {
        if (DP(o, xt.x, xt.z, _i / 2))
          for (let Jt of Object.values(ae)) NP(o, Jt, !0);
        for (let [Jt, _e] of Object.entries(ae))
          _t.steps.push(
            U(_t, _e, e[Jt] ? Jt : "facade", "b" + xt.key, { shadow: !0 }),
          );
        _t.steps.push(() => {
          let Jt = Sc("bnear_" + xt.key);
          for (let _e of _t.meshes) Jt.add(_e);
          ((xt.state.bNear = Jt),
            m.add(Jt),
            (Jt.visible = !1),
            M.near++,
            (M.nearMax = Math.max(M.nearMax || 0, performance.now() - _t.t0)));
        });
      }),
      _t
    );
  }
  let K = ud + 250,
    nt = EM + 300,
    Q = (xt) => {
      xt && (m.remove(xt), xt.traverse((wt) => wt.geometry?.dispose()));
    };
  function et(xt, wt) {
    let _t = xt.state;
    (wt > K &&
      _t.bNear &&
      Yt?.c !== xt &&
      (Q(_t.bNear),
      Q(_t.tNear),
      _t.gMat && r.release(_t.gMat),
      (_t.bNear = _t.tNear = _t.gMat = null),
      (_t.gNone = !1),
      q(xt),
      re?.c === xt && (re = null)),
      wt > nt &&
        _t.roads &&
        Oe?.c !== xt &&
        (Q(_t.roads), (_t.roads = null), (_t.walkFast = !1)));
  }
  function st(xt, wt = !0) {
    let _t = { c: xt, upload: wt && !!l, k: 0, steps: [], meshes: [] },
      ae = new Be(),
      se = new Be();
    if (!xt.blds.length) return _t;
    for (let Jt = 0; Jt < xt.blds.length; Jt += 48)
      _t.steps.push(() => {
        for (let _e of xt.blds.slice(Jt, Jt + 48)) z(_e, ae, se);
      });
    return (
      _t.steps.push(
        U(_t, ae, "facade", "bf" + xt.key),
        U(_t, se, "roof", "bfr" + xt.key),
      ),
      _t.steps.push(() => {
        let Jt = Sc("bfar_" + xt.key);
        for (let _e of _t.meshes) Jt.add(_e);
        ((xt.state.bFar = Jt), m.add(Jt), (Jt.visible = !1));
      }),
      _t
    );
  }
  let ot = 4,
    rt = ud + 400,
    lt = new Map(),
    ht = (xt, wt) => {
      if (!wt || wt.empty) return;
      let _t = xt.v;
      for (let Jt of ["p", "nm", "uv", "c", "s"]) {
        let _e = xt[Jt],
          mt = wt[Jt];
        (_e.need(mt.n), _e.a.set(mt.a.subarray(0, mt.n), _e.n), (_e.n += mt.n));
      }
      xt.hasSky ||= wt.hasSky;
      let ae = xt.ix,
        se = wt.ix;
      ae.need(se.n);
      for (let Jt = 0; Jt < se.n; Jt++) ae.a[ae.n + Jt] = se.a[Jt] + _t;
      ((ae.n += se.n), (xt.v += wt.v));
    },
    pt = (xt, wt, _t, ae = null) => {
      let se = Sc("tfarb_" + xt.key);
      for (let Jt of [
        B(wt, "facade", "tbf" + xt.key),
        B(_t, "roof", "tbfr" + xt.key),
      ])
        Jt && (ae?.upload && l(Jt), se.add(Jt));
      return (m.add(se), (se.visible = !1), se);
    };
  function ut(xt, wt) {
    let _t = { t: xt, l: wt, upload: !!l, k: 0, steps: [], meshes: [] },
      ae = new Be(),
      se = new Be(),
      Jt = v[wt][1];
    for (let _e of xt.chunks)
      for (let mt = 0; mt < _e.blds.length; mt += 96)
        _t.steps.push(() => {
          for (let ie of _e.blds.slice(mt, mt + 96)) x(ie, Jt) && z(ie, ae, se);
        });
    return (
      _t.steps.push(
        U(_t, ae, "facade", `tsf${wt}_` + xt.key),
        U(_t, se, "roof", `tsfr${wt}_` + xt.key),
      ),
      _t.steps.push(() => {
        let _e = Sc(`tskyb${wt}_` + xt.key);
        for (let mt of _t.meshes) _e.add(mt);
        (m.add(_e),
          (_e.visible = !1),
          (xt.sky[wt].m = _e),
          (xt.sky[wt].todo = !1));
      }),
      _t
    );
  }
  function it(xt) {
    let wt = { t: xt, upload: !!l, k: 0, steps: [], meshes: [] },
      _t = new Be(),
      ae = new Be();
    for (let se of xt.chunks)
      for (let Jt = 0; Jt < se.blds.length; Jt += 48)
        wt.steps.push(() => {
          for (let _e of se.blds.slice(Jt, Jt + 48)) z(_e, _t, ae);
        });
    return (
      wt.steps.push(
        U(wt, _t, "facade", "tbf" + xt.key),
        U(wt, ae, "roof", "tbfr" + xt.key),
      ),
      wt.steps.push(() => {
        let se = Sc("tfarb_" + xt.key);
        for (let Jt of wt.meshes) se.add(Jt);
        (m.add(se), (se.visible = !1), (xt.mB = se), (xt.bTodo = !1));
      }),
      wt
    );
  }
  function at(xt) {
    let wt = { t: xt, upload: !!l, k: 0, steps: [] };
    for (let _t of xt.chunks)
      if (
        (wt.steps.push(() => {
          if (!_t.state.tFar) {
            let ae = W(_t, 4);
            (ae && l?.(ae), (_t.state.tFar = ae));
          }
        }),
        _t.blds.length && !_t.state.bFar)
      ) {
        let ae = st(_t);
        wt.steps.push(() => (D(ae, performance.now() + 1) ? void 0 : N));
      }
    return (
      wt.steps.push(() => {
        xt.split = !0;
      }),
      wt
    );
  }
  function yt(xt) {
    for (let wt of xt.chunks)
      for (let _t of ["tFar", "bFar"]) {
        let ae = wt.state[_t];
        ae &&
          (m.remove(ae),
          ae.traverse((se) => se.geometry?.dispose()),
          (wt.state[_t] = null));
      }
    xt.split = !1;
  }
  let vt = (xt) => (l && xt && l(xt), xt),
    At = On("distant")
      ? vt(
          CF(e, {
            carve: lx,
            far: o.far?.[0] || null,
            regions: o.terrain.regions,
          }),
        )
      : Sc("Distant");
  m.add(At);
  let Ut = IQ(e, { D: o, L: t, tex: s });
  (lv(o, Ut.inst, Ut.colliders), m.add(Ut.group));
  for (let xt of Ut.colliders) y.push(xt);
  let Gt = BP(o, t);
  m.add(Gt.group);
  for (let xt of Gt.colliders) y.push(xt);
  {
    let xt = FQ(o, t);
    m.add(xt.group);
    for (let wt of xt.colliders) y.push(wt);
  }
  {
    let xt = On("highways") ? BQ(o) : null;
    xt && (m.add(vt(xt)), (M.gantries = xt.userData.count));
  }
  let Pt = h ? VQ(o, t, y) : null;
  (Pt && (m.add(vt(Pt.group)), (M.billboards = Pt.group.userData.stats)),
    await g(0.25, "Building the landmarks", 0.42, 900));
  let Vt = performance.now(),
    Kt = $Q({ D: o, L: t, mats: e, tex: s });
  m.add(Kt.group);
  for (let xt of Kt.colliders) y.push(xt);
  ((M.landmarksMs = Math.round(performance.now() - Vt)),
    await g(0.42, "Planting the parks", 0.5, 400));
  let ue = null,
    ne = null;
  if (r) {
    let xt = performance.now(),
      wt = (o.claims?.list || []).filter((se) => se.poly),
      _t = (se, Jt) =>
        wt.some((_e) => {
          let mt = _e.poly,
            ie = 1e9,
            Dt = 1e9,
            Ht = -1e9,
            ft = -1e9;
          if (!_e.bb) {
            for (let zt = 0; zt < mt.length; zt += 2)
              ((ie = Math.min(ie, mt[zt])),
                (Ht = Math.max(Ht, mt[zt])),
                (Dt = Math.min(Dt, mt[zt + 1])),
                (ft = Math.max(ft, mt[zt + 1])));
            _e.bb = [ie, Dt, Ht, ft];
          }
          return (
            se >= _e.bb[0] &&
            se <= _e.bb[2] &&
            Jt >= _e.bb[1] &&
            Jt <= _e.bb[3] &&
            rn(mt, se, Jt)
          );
        }),
      ae = hQ(r, (se, Jt) => t.terrainAt(se, Jt), t.clearOfRoads)
        .filter(
          (se) =>
            !_t(se.x, se.z) &&
            !Kb(o, se.x, se.z, se.y) &&
            !wM(o, se.x, se.z, se.y, 0.8),
        )
        .map(dQ);
    ((ne = (se, Jt) => _t(se, Jt) || wM(o, se, Jt, void 0, 0.8)),
      (ue = () => {
        let se = pQ(
          r,
          t,
          F.inst,
          (Jt, _e) =>
            _t(Jt, _e) ||
            Kb(o, Jt, _e, t.terrainAt(Jt, _e)) ||
            wM(o, Jt, _e, void 0, 0.8),
        );
        return ((M.understory = se.stats), se);
      }),
      F.inst.push(...ae),
      x_(r, F.inst.concat(Kt.inst)),
      (M.groundMs = Math.round(performance.now() - xt)),
      (M.plants = ae.length));
  }
  (u && (await u, (S = c?.bOff ? C7(c, o) : null)),
    c?.lmOff && (M.skyMeshes = L7(c, Ut.group, "br") + L7(c, Kt.group, "lm")),
    vt(Ut.group),
    vt(Kt.group),
    await g(0.5, "Building the city", 0.53, 120));
  let jt = 420,
    be = 700,
    re = null;
  function ds(xt, wt, _t, ae = jt) {
    if (r) {
      if (!re) {
        if (r.dirty?.size) {
          for (let _e of Nt) {
            let mt = _e.state;
            (mt.gMat || mt.gNone) &&
              r.dirty.has(_e.cx + "," + _e.cz) &&
              ((mt.gNone = !1), (mt.gRedo = !!mt.gMat));
          }
          r.dirty.clear();
        }
        let se = null,
          Jt = 1e9;
        for (let _e of Nt) {
          let mt = _e.state;
          if (!mt.tNear) continue;
          let ie = $e(_e, xt, wt);
          mt.gMat && ie > be
            ? ((mt.tNear.material = e.terrain),
              r.release(mt.gMat),
              (mt.gMat = null),
              (mt.gNone = !1),
              (mt.gRedo = !1))
            : (!mt.gMat || mt.gRedo) &&
              !mt.gNone &&
              ie < ae &&
              ie < Jt &&
              ((Jt = ie), (se = _e));
        }
        se && (re = { c: se, it: lQ(r, se.cx, se.cz, se.T) });
      }
      for (; re && performance.now() < _t;) {
        let se = re.it.next();
        if (!se.done) continue;
        let Jt = re.c.state,
          _e = se.value;
        if (((re = null), !Jt.tNear)) break;
        let mt = Jt.gMat;
        ((Jt.gRedo = !1),
          _e
            ? ((Jt.gMat = r.materialFor(_e)), (Jt.tNear.material = Jt.gMat))
            : ((Jt.gMat = null),
              (Jt.gNone = !0),
              (Jt.tNear.material = e.terrain)),
          mt && r.release(mt));
      }
    }
  }
  let Nt = [...T.values()],
    $e = (xt, wt, _t) =>
      Math.hypot(
        Math.max(0, Math.abs(xt.x - wt) - _i / 2),
        Math.max(0, Math.abs(xt.z - _t) - _i / 2),
      ),
    ve = i ? Math.min(700, g2) : 1300,
    as = Math.min(2600, b);
  for (let xt of Nt) {
    let wt = `${Math.floor(xt.cx / ot)},${Math.floor(xt.cz / ot)}`,
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
          sky: v.map(() => ({ m: null, todo: !1, n: -1 })),
        }),
      ),
      _t.chunks.push(xt),
      (xt.tile = _t),
      (_t.x0 = Math.min(_t.x0, xt.cx * _i)),
      (_t.z0 = Math.min(_t.z0, xt.cz * _i)),
      (_t.x1 = Math.max(_t.x1, (xt.cx + 1) * _i)),
      (_t.z1 = Math.max(_t.z1, (xt.cz + 1) * _i)));
  }
  let Se = [...lt.values()],
    Fe = (xt, wt, _t) =>
      Math.hypot(
        Math.max(0, xt.x0 - wt, wt - xt.x1),
        Math.max(0, xt.z0 - _t, _t - xt.z1),
      ),
    xe = r ? (xt, wt) => sv(r, xt, wt) : null;
  for (let xt of Se) {
    let wt = Fe(xt, n[0], n[1]),
      _t = wt < rt,
      ae = wt < ve,
      se = new Be(),
      Jt = new Be(),
      _e = new Be();
    xt.tTodo = !_t && wt > as;
    for (let mt of xt.chunks) {
      let ie = xt.tTodo || mt.pend ? null : g_(mt.T, mt.cx, mt.cz, _i, 4, xe);
      if (ie && (ht(se, ie), _t)) {
        let Dt = B(ie, "terrain", "tfar" + mt.key);
        Dt && ((Dt.visible = !1), m.add(Dt), (mt.state.tFar = Dt));
      }
      if (ae && mt.blds.length) {
        let Dt = new Be(),
          Ht = new Be();
        for (let ft of mt.blds) z(ft, Dt, Ht);
        if ((ht(Jt, Dt), ht(_e, Ht), _t)) {
          let ft = Sc("bfar_" + mt.key);
          for (let zt of [
            B(Dt, "facade", "bf" + mt.key),
            B(Ht, "roof", "bfr" + mt.key),
          ])
            zt && ft.add(zt);
          ((mt.state.bFar = ft), m.add(ft), (ft.visible = !1));
        }
      }
    }
    ((xt.mT = B(se, "terrain", "ttile" + xt.key)),
      xt.mT && ((xt.mT.visible = !1), m.add(xt.mT)),
      ae
        ? (xt.mB = pt(xt, Jt, _e))
        : (xt.bTodo = xt.chunks.some((mt) => mt.blds.length)),
      (xt.split = _t),
      vt(xt.mT),
      vt(xt.mB));
    for (let mt of xt.chunks) (vt(mt.state.tFar), vt(mt.state.bFar));
    {
      let mt = 0.5 + (0.25 * (Se.indexOf(xt) + 1)) / Se.length;
      await g(mt, "Building the city", Math.min(0.75, mt + 0.035), 120, 100);
    }
  }
  let He = performance.now();
  for (let xt = 0; xt < Nt.length; xt++) {
    let wt = Nt[xt],
      _t = $e(wt, n[0], n[1]),
      ae = 0.75 + (0.25 * (xt + 1)) / Nt.length,
      se = Math.min(1, ae + 0.03);
    for (let Jt of [
      _t < Math.min(1e3, EM) ? G(wt, _t > 250, !1, _t < 600) : null,
      _t < ud - 100 ? j(wt, !1) : null,
    ])
      if (Jt)
        for (; !D(Jt, f ? performance.now() + 100 : 1 / 0);)
          await g(ae, "Building the streets", se, 120);
    (vt(wt.state.roads),
      vt(wt.state.bNear),
      vt(wt.state.tNear),
      await g(ae, "Building the streets", se, 120, 100));
  }
  let ms = performance.now();
  M.loadMs = { index: Math.round(He - d), near: Math.round(ms - He) };
  let bt = 600,
    te = 700,
    ee = 0,
    Yt = null,
    ce = null,
    Xe = !1,
    Oe = null,
    Ke = null,
    qs = null,
    Rs = null,
    Ps = null,
    Qs = null,
    xs = null,
    an = 0,
    De = 0,
    Ds = (xt, wt) => {
      let _t = performance.now() - wt;
      _t > (M.maxMs[xt] || 0) && (M.maxMs[xt] = Math.round(_t * 10) / 10);
    };
  M.maxMs = {};
  let hs = Math.min(b, rt + 900);
  function nn(xt, wt, _t) {
    let ae = null,
      se = _t;
    for (let mt of Se) {
      if (!mt.tTodo) continue;
      let ie = Fe(mt, xt, wt);
      ie < se && ((se = ie), (ae = mt));
    }
    if (!ae) return !1;
    let Jt = performance.now(),
      _e = new Be();
    for (let mt of ae.chunks) {
      if (mt.pend) continue;
      let ie = g_(mt.T, mt.cx, mt.cz, _i, 4, xe);
      ie && ht(_e, ie);
    }
    return (
      (ae.mT = B(_e, "terrain", "ttile" + ae.key)),
      ae.mT && ((ae.mT.visible = !ae.split), m.add(ae.mT), l?.(ae.mT)),
      (ae.tTodo = !1),
      (Xe = !0),
      Ds("ground", Jt),
      !0
    );
  }
  function dn(xt, wt, _t = 0.016, ae = 2.5) {
    (Kt.update(xt, wt, _t), Ut.update(xt, wt, _t), Pt?.update(xt, wt));
    let se = performance.now(),
      Jt = se + ae;
    if (Qs !== null && _t > 0) {
      let Ht = (xt - Qs) / _t,
        ft = (wt - xs) / _t,
        zt = Math.min(1, _t * 2);
      ((an += (Ht - an) * zt), (De += (ft - De) * zt));
    }
    ((Qs = xt), (xs = wt));
    let _e = Math.hypot(an, De),
      mt = _e > 3 ? an / _e : 0,
      ie = _e > 3 ? De / _e : 0,
      Dt = (Ht, ft) =>
        ft - 0.5 * Math.max(0, (Ht.x - xt) * mt + (Ht.z - wt) * ie);
    if (!Ke) {
      let Ht = null,
        ft = te;
      for (let zt of Nt) {
        if (zt.state.roads || zt === Oe?.c) continue;
        let kt = $e(zt, xt, wt);
        if (kt >= te) continue;
        let Ft = Dt(zt, kt);
        Ft < ft && ((ft = Ft), (Ht = zt));
      }
      Ht && (Ke = G(Ht, $e(Ht, xt, wt) > bt));
    }
    if (Ke) {
      let Ht = performance.now();
      (D(Ke, Jt) && ((Ke = null), (Xe = !0)), Ds("road", Ht));
    }
    if (
      (nn(xt, wt, hs),
      (re || performance.now() < Jt) &&
        ds(xt, wt, Math.min(Jt, performance.now() + 0.7), 120),
      !Yt)
    ) {
      let Ht = null,
        ft = 1e9;
      for (let zt of Nt) {
        if (zt.state.bNear || !zt.tile.split) continue;
        let kt = $e(zt, xt, wt);
        if (kt >= ud + 120) continue;
        let Ft = Dt(zt, kt);
        Ft < ft && ((ft = Ft), (Ht = zt));
      }
      Ht && (Yt = j(Ht));
    }
    for (; !Yt && performance.now() < Jt;) {
      if (!Ps) {
        let ft = null,
          zt = rt;
        for (let kt of Se) {
          if (kt.split) continue;
          let Ft = Fe(kt, xt, wt);
          Ft < zt && ((zt = Ft), (ft = kt));
        }
        if (!ft) break;
        Ps = at(ft);
      }
      let Ht = performance.now();
      (D(Ps, Jt) && ((Ps = null), (Xe = !0)), Ds("split", Ht));
    }
    if (Yt) {
      let Ht = performance.now();
      (D(Yt, Jt) && ((Yt = null), (Xe = !0)), Ds("near", Ht));
    }
    if (!Yt && s && !i && e.dress && performance.now() < Jt) {
      if (!ce) {
        let Ht = null,
          ft = 1e9;
        for (let zt of Nt) {
          if (zt.state.dress || !zt.state.bNear) continue;
          let kt = $e(zt, xt, wt);
          if (kt >= V) continue;
          let Ft = Dt(zt, kt);
          Ft < ft && ((ft = Ft), (Ht = zt));
        }
        Ht && (ce = Z(Ht));
      }
      if (ce) {
        let Ht = performance.now();
        (D(ce, Jt) && ((ce = null), (Xe = !0)), Ds("dress", Ht));
      }
    }
    if (!Yt && performance.now() < Jt) {
      let Ht = performance.now();
      (ds(xt, wt, Jt), Ds("ground", Ht));
    }
    for (; !Yt && performance.now() < Jt && nn(xt, wt, b););
    for (; !Yt && performance.now() < Jt;) {
      if (!qs) {
        let ft = null,
          zt = g2;
        for (let kt of Se) {
          if (!kt.bTodo) continue;
          let Ft = Fe(kt, xt, wt);
          Ft < zt && ((zt = Ft), (ft = kt));
        }
        if (!ft) break;
        qs = it(ft);
      }
      let Ht = performance.now();
      (D(qs, Jt) && ((qs = null), (Xe = !0)), Ds("far", Ht));
    }
    for (; v.length && !Yt && performance.now() < Jt;) {
      if (!Rs) {
        let ft = null,
          zt = 0,
          kt = 1e9;
        for (let Ft of Se)
          for (let qt = 0; qt < v.length; qt++) {
            if (!Ft.sky[qt].todo) continue;
            let Et = Fe(Ft, xt, wt);
            Et < kt && ((kt = Et), (ft = Ft), (zt = qt));
          }
        if (!ft) break;
        Rs = ut(ft, zt);
      }
      let Ht = performance.now();
      (D(Rs, Jt) && ((Rs = null), (Xe = !0)), Ds("far", Ht));
    }
    for (; !Yt && performance.now() < Jt;) {
      if (!Oe) {
        let ft = null,
          zt = 1e9;
        for (let kt of Nt) {
          if ((kt.state.roads && !kt.state.walkFast) || kt === Ke?.c) continue;
          let Ft = $e(kt, xt, wt);
          if (Ft > (kt.state.roads ? bt + 300 : EM)) continue;
          let qt = Dt(kt, kt.state.roads ? Ft : Ft - 800);
          qt < zt && ((zt = qt), (ft = kt));
        }
        if (!ft) break;
        Oe = G(ft, !ft.state.roads && $e(ft, xt, wt) > bt);
      }
      let Ht = performance.now();
      (D(Oe, Jt) && ((Oe = null), (Xe = !0)), Ds("road", Ht));
    }
    if ((Ds("update", se), !((ee -= _t) > 0 && !Xe))) {
      ((ee = 0.2), (Xe = !1));
      for (let Ht of Se) {
        let ft = Fe(Ht, xt, wt);
        (Ht.split && ft > rt + 400 && !Ht.bTodo && Ht !== Ps?.t && yt(Ht),
          i &&
            !Ht.split &&
            (Ht.mB &&
              ft > g2 + 500 &&
              Ht !== qs?.t &&
              (m.remove(Ht.mB),
              Ht.mB.traverse((Ft) => Ft.geometry?.dispose()),
              (Ht.mB = null),
              (Ht.bTodo = Ht.chunks.some((Ft) => Ft.blds.length))),
            Ht.mT &&
              ft > b + 500 &&
              (m.remove(Ht.mT),
              Ht.mT.geometry.dispose(),
              (Ht.mT = null),
              (Ht.tTodo = !0))),
          Ht.mT && (Ht.mT.visible = !Ht.split),
          Ht.mB && (Ht.mB.visible = !Ht.split && ft < g2));
        let zt = !!(Ht.mB && Ht.mB.visible) || Ht.split,
          kt = i || wt < -2e3;
        for (let Ft = 0; Ft < v.length; Ft++) {
          let qt = Ht.sky[Ft],
            [Et, Me] = v[Ft],
            de = Ft ? v[Ft - 1][0] : g2,
            ze = Rs?.t === Ht && Rs.l === Ft;
          (qt.m &&
            (ft > Et + 500 || ft < de - 600) &&
            !ze &&
            (m.remove(qt.m),
            qt.m.traverse((Wt) => Wt.geometry?.dispose()),
            (qt.m = null)),
            !qt.m &&
              !ze &&
              (qt.todo =
                kt &&
                ft < Et &&
                ft > de - 400 &&
                (qt.n < 0
                  ? (qt.n = Ht.chunks.reduce(
                      (Wt, ke) => Wt + ke.blds.filter((As) => x(As, Me)).length,
                      0,
                    ))
                  : qt.n) > 0),
            qt.m &&
              ((qt.m.visible = kt && !zt && ft < Et), (zt ||= qt.m.visible)));
        }
      }
      for (let Ht of Nt) {
        let ft = $e(Ht, xt, wt),
          zt = Ht.tile.split,
          kt = Ht.state;
        i && et(Ht, ft);
        let Ft = zt && kt.bNear && (ft < ud || (kt.wasNear && ft < ud + 40));
        ((kt.wasNear = !!Ft), kt.roads && (kt.roads.visible = ft < EM));
        let qt = zt && kt.tNear && (ft < ud || (kt.wasNearT && ft < ud + 40));
        if (
          ((kt.wasNearT = !!qt),
          kt.tNear && (kt.tNear.visible = !!qt),
          kt.tFar && (kt.tFar.visible = zt && !qt),
          kt.bNear && (kt.bNear.visible = !!Ft),
          kt.bFar && (kt.bFar.visible = zt && !Ft && ft < g2),
          kt.dress)
        )
          if (ft > J) q(Ht);
          else
            for (let Et of kt.dress.quads)
              Et.grp.visible =
                !!Ft &&
                Math.hypot(
                  Math.max(0, Et.x0 - xt, xt - Et.x1),
                  Math.max(0, Et.z0 - wt, wt - Et.z1),
                ) <
                  $ + (Et.grp.visible ? 15 : 0);
      }
    }
  }
  function Wn(xt, wt, _t = 180) {
    for (let ae of Nt)
      if (ae.pend && $e(ae, xt, wt) < hs) return (Xt.needRegion?.(ae.reg), !1);
    for (let ae of Se) if (ae.tTodo && Fe(ae, xt, wt) < hs) return !1;
    for (let ae of Nt)
      if (
        !($e(ae, xt, wt) >= _t) &&
        (!ae.state.roads || !ae.tile.split || !ae.state.bNear)
      )
        return !1;
    return !0;
  }
  function* Xn(xt, wt) {
    let _t = performance.now(),
      ae = new Set(),
      se = 0,
      Jt = performance.now(),
      _e = () => ((se += performance.now() - Jt), 1),
      mt = () => {
        Jt = performance.now();
      };
    {
      let ft = z0[xt.key].bounds;
      for (
        let zt = Math.floor(ft.x0 / _i);
        zt <= Math.floor((ft.x1 - 1) / _i);
        zt++
      )
        for (
          let kt = Math.floor(ft.z0 / _i);
          kt <= Math.floor((ft.z1 - 1) / _i);
          kt++
        ) {
          let Ft = `${zt},${kt}`;
          if (T.has(Ft)) continue;
          let qt = E(Ft);
          Nt.push(qt);
          let Et = `${Math.floor(qt.cx / ot)},${Math.floor(qt.cz / ot)}`,
            Me = lt.get(Et);
          (Me ||
            (lt.set(
              Et,
              (Me = {
                key: Et,
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
                sky: v.map(() => ({ m: null, todo: !1, n: -1 })),
              }),
            ),
            Se.push(Me)),
            Me.chunks.push(qt),
            (qt.tile = Me),
            (Me.x0 = Math.min(Me.x0, qt.cx * _i)),
            (Me.z0 = Math.min(Me.z0, qt.cz * _i)),
            (Me.x1 = Math.max(Me.x1, (qt.cx + 1) * _i)),
            (Me.z1 = Math.max(Me.z1, (qt.cz + 1) * _i)),
            (qt.reg = xt.key),
            (qt.pend = !0));
        }
    }
    (yield _e(), mt());
    let ie = o.claims.bSkip;
    for (let ft = xt.b0; ft < xt.b1; ft++) {
      if (ie[ft]) continue;
      let zt = er(o, ft),
        [kt, Ft] = Ef(zt.rings[0]);
      ((zt.cx = kt), (zt.cz = Ft));
      let qt = T.get(ju(kt, Ft));
      if (qt) {
        (R.push(zt), qt.blds.push(zt), ae.add(qt.tile));
        let Et = HP(o, Bw(zt));
        Et && wt.colliders.push(Et);
      }
      (ft - xt.b0) % 250 === 249 && (yield _e(), mt());
    }
    let Dt = i
        ? {
            car: L ? +L[1] : a ? 0.2 : 0.4,
            carExtra: XQ,
            meter: 0.25,
            well: !1,
            tree: a ? 0.5 : 1,
          }
        : null,
      Ht = 4e3;
    for (let ft = xt.p0; ft < xt.p1 || ft === xt.p0; ft += Ht) {
      let zt = ft + Ht >= xt.p1,
        kt = GF(o, t, Dt, {
          p0: ft,
          p1: Math.min(xt.p1, ft + Ht),
          b0: zt ? xt.b0 : 0,
          b1: zt ? xt.b1 : 0,
        });
      for (let Ft of kt.inst) wt.inst.push(Ft);
      for (let Ft of kt.colliders) wt.colliders.push(Ft);
      if ((yield _e(), mt(), xt.p1 <= xt.p0)) break;
    }
    for (let ft of YQ(o, t, [], null, xt.key, wt.inst)) wt.colliders.push(ft);
    if ((yield _e(), mt(), xt.grid?.tunnels?.length)) {
      let ft = BP(o, t, xt.grid.tunnels);
      m.add(ft.group);
      for (let zt of ft.colliders) wt.colliders.push(zt);
      for (let zt of ft.night) {
        let kt =
          ii.find((Ft) => Ft.userData.mbAlbedo === zt.userData.mbAlbedo) ||
          ii[0];
        (kt && zt.color.copy(kt.color), ii.push(zt));
      }
      (l?.(ft.group), yield _e(), mt());
    }
    for (let ft of Nt) ft.reg === xt.key && (I(ft), ae.add(ft.tile));
    for (let ft of ae) {
      (ft.split && yt(ft),
        ft.mT && (m.remove(ft.mT), ft.mT.geometry.dispose(), (ft.mT = null)),
        (ft.tTodo = !0),
        ft.mB &&
          (m.remove(ft.mB),
          ft.mB.traverse((zt) => zt.geometry?.dispose()),
          (ft.mB = null)),
        (ft.bTodo = ft.chunks.some((zt) => zt.blds.length)));
      for (let zt of ft.chunks) {
        let kt = zt.state;
        kt.bNear &&
          (Q(kt.bNear),
          Q(kt.tNear),
          kt.gMat && r.release(kt.gMat),
          (kt.bNear = kt.tNear = kt.gMat = null),
          (kt.gNone = !1),
          q(zt));
      }
    }
    if (((Xe = !0), yield _e(), mt(), xt.key === "west" && Vw?.mid)) {
      let ft = o.terrain.bounds,
        zt = nc.z0 + 80,
        kt = ft.z1 - 60;
      for (let Ft = 0; Ft < 4; Ft++) {
        let qt = Sc("notch_houses" + Ft);
        try {
          (Dk(
            { group: qt },
            Vw,
            { L: t },
            [
              [
                ft.x0 + 150,
                nc.x1 - 60,
                zt + ((kt - zt) * Ft) / 4,
                zt + ((kt - zt) * (Ft + 1)) / 4,
              ],
            ],
            !0,
          ),
            m.add(qt),
            vt(qt));
        } catch (Et) {
          console.warn("notch houses", Et);
        }
        (yield _e(), mt());
      }
    }
    (xt.grid?.clipBox &&
      (m.remove(At),
      At.traverse((ft) => ft.geometry?.dispose()),
      (At = vt(
        CF(e, {
          carve: lx,
          far: o.far?.[0] || null,
          regions: o.terrain.regions,
        }),
      )),
      m.add(At)),
      (se += performance.now() - Jt),
      (M.regions = {
        ...(M.regions || {}),
        [xt.key]: {
          ms: Math.round(se),
          wall: Math.round(performance.now() - _t),
          buildings: xt.b1 - xt.b0,
          props: wt.inst.length,
        },
      }));
  }
  function ni(xt) {
    if (!xt) return null;
    let wt = { colliders: [], inst: [] };
    for (let _t of Xn(xt, wt));
    return wt;
  }
  (dn(n[0], n[1], 1, 0), (M.maxMs = {}));
  let An = F.inst.concat(Kt.inst, Ut.inst),
    ii = Kt.night.concat(Ut.night, Gt.night, Pt ? Pt.night : []);
  (console.log(
    `real city: ${T.size} chunks, ${R.length} buildings, ${An.length} props, ${y.length} colliders; index ${M.loadMs.index} ms, near ${M.loadMs.near} ms, landmarks ${M.landmarksMs} ms${c?.lmKeys ? `; sky visibility on ${M.skyMeshes}/${c.lmKeys.length} landmark / bridge meshes` : ""}`,
  ),
    O.push(...ML.splice(0), ...RL.splice(0), ...FL.splice(0)));
  let Xt = {
    skyFieldIn: () => {
      let xt = 0;
      for (let wt of Nt)
        wt.state.roads &&
          (wt.elev?.length || wt.runs?.some((_t) => _t[0]?.tunnel)) &&
          ((wt.state.walkFast = !0), xt++);
      return xt;
    },
    group: m,
    colliders: y,
    lateColliders: O,
    inst: An,
    night: ii,
    landmarks: Kt,
    billboards: Pt,
    ground: r,
    plantLater: ue,
    claimedAt: ne,
    layout: t,
    data: o,
    update: dn,
    readyAt: Wn,
    stats: M,
    chunks: T,
    addRegion: ni,
    addRegionSteps: Xn,
    needRegion: null,
  };
  return Xt;
}
