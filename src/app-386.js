// app 386 — math
// Lines 191723-193347 of readable/app.pretty.js (statement-aligned).
function rit(
  o,
  t,
  {
    max: e = 150,
    roads: s = null,
    inst: n = [],
    seed: i = 7,
    plazas: a = [],
    hotspots: r = [],
    map: l = null,
    world: c = null,
  } = {},
) {
  let h = i,
    f = () => (h = (h * 16807) % 2147483647) / 2147483647,
    u = new me({ color: 16777215, roughness: 0.8, metalness: 0, map: l });
  ((u.userData.mbAlbedo = pp),
    (u.userData.mbWind = -1),
    (u.userData.mbSkyVis = 2),
    (u.name = "pedestrians"));
  let d = new le();
  d.name = "Pedestrians";
  let p = c ? tw(c) : null,
    m = new bp({ statics: (bt, te, ee, Yt, ce) => p && p(bt, te, ee, Yt, ce) }),
    g = (bt, te, ee, Yt = null, ce = !0) => {
      let Xe = !0;
      if (
        (p &&
          p(bt, te, ee, (Oe) => {
            Xe && lc(Oe, bt, te, 0.3 + 0.05) && (Xe = !1);
          }),
        !Xe)
      )
        return !1;
      if (ce)
        for (let Oe of z) {
          if (Oe === Yt) continue;
          let Ke = Oe.bx ?? Oe.x,
            qs = Oe.bz ?? Oe.z;
          if (
            Math.abs(Ke - bt) < 0.7 &&
            Math.abs(qs - te) < 0.7 &&
            Math.hypot(Ke - bt, qs - te) < 2 * 0.3 + 0.08
          )
            return !1;
        }
      return !0;
    },
    b = i0() ? new Q0("PedestriansVox", e) : null;
  b && d.add(b.group);
  let v = b
      ? []
      : n0.map((bt, te) =>
          [0, 1].map((ee) => {
            let Yt = new En(dp(bt, ee), u, e);
            return (
              (Yt.count = 0),
              (Yt.frustumCulled = !1),
              (Yt.castShadow = ee === 0),
              (Yt.receiveShadow = !0),
              (Yt.name = `peds${te}_lod${ee}`),
              (Yt.userData.mbMover = !0),
              (Yt.matrixAutoUpdate = !1),
              Yt.setColorAt(0, new It(1, 1, 1)),
              (Yt.boundingSphere = new _n(new dt(), 1)),
              d.add(Yt),
              Yt
            );
          }),
        ),
    x = new Map(),
    y = {},
    M = {};
  function S(bt, te, ee, Yt, ce) {
    Ot(bt, tu(te, 0, bt.L), y);
    let Xe = ee * (y.w + bt.sw * Yt);
    return (
      (ce.x = y.x + y.nx * Xe),
      (ce.z = y.z + y.nz * Xe),
      (ce.y = y.y + eN),
      (ce.hx = y.dx),
      (ce.hz = y.dz),
      ce
    );
  }
  let w = {};
  function _(bt, te, ee) {
    let Yt = bt.sid * 4 + (te > 0 ? 1 : 0) + (ee === "b" ? 2 : 0),
      ce = x.get(Yt);
    if (ce !== void 0) return ce;
    let Xe = ee === "b" ? -1 : 1,
      Oe = ee === "b" ? bt.L : 0;
    ce = ee === "b" ? bt.s1 : bt.s0;
    for (let Ke = 0; Ke < 60; Ke++, Oe += Xe * 0.5)
      if ((S(bt, Oe, te, 0.55, w), t.surfaceAt(w.x, w.z) === "walk")) {
        ce = Oe + Xe * 0.3;
        break;
      }
    return (x.set(Yt, ce), ce);
  }
  let z = [],
    A = [],
    T = 0,
    E = [],
    R = 64,
    P = new Map(),
    C = (bt, te) => bt * 65536 + te;
  for (let bt of n)
    if (
      bt.kind === "shelter" ||
      bt.kind === "cafe0" ||
      bt.kind === "cafe1" ||
      bt.kind === "bench"
    ) {
      E.push(bt);
      let te = C(Math.floor(bt.x / R), Math.floor(bt.z / R)),
        ee = P.get(te);
      (ee || P.set(te, (ee = [])), ee.push(bt));
    }
  let I = new Set(),
    L = 0,
    F = 0;
  function O() {
    let bt = Math.floor(f() * n0.length),
      te = 0.9 + f() * 0.17 - (n0[bt].f ? 0.05 : 0),
      ee = 1.05 + f() * 0.55;
    return {
      B: bt,
      sc: te,
      sw: 0.94 + f() * 0.14,
      seeds: [f(), f(), f()],
      speed: ee,
      ph0: f() * 6.283,
      cad: (2 * Math.PI * ee) / (1.37 * te),
      pose: f() < 0.08 ? 2 : 0,
      st: "walk",
      E: null,
      side: 1,
      f: 0.5,
      s: 0,
      dir: 1,
      x: 0,
      y: 0,
      z: 0,
      hx: 0,
      hz: 1,
      t: 0,
      path: null,
      J: null,
      spot: null,
      leap: null,
      lod: -1,
    };
  }
  function B(bt, te, ee, Yt, ce) {
    ((bt.E = te),
      (bt.s = ee),
      (bt.side = Yt),
      (bt.dir = ce),
      (bt.f = 0.3 + f() * 0.45),
      (bt.st = "walk"),
      (bt.kb = null),
      (bt.mad = 0),
      (bt.sx = bt.sz = 0),
      (bt.path = null),
      (bt.J = null),
      (bt.plaza = null),
      (bt.spot = null),
      (bt.hot = null),
      (bt.bx = void 0),
      (bt.gen = (bt.gen || 0) + 1),
      (bt.lag = 0),
      (bt.vs = 0),
      (bt.stuck = 0),
      (bt.gapT = 0),
      (bt.g = null),
      (bt.gid = void 0),
      S(te, ee, Yt, bt.f, w),
      (bt.x = w.x),
      (bt.y = w.y),
      (bt.z = w.z),
      (bt.hx = w.hx * ce),
      (bt.hz = w.hz * ce),
      (bt.nx = y.nx * Yt),
      (bt.nz = y.nz * Yt));
  }
  function H(bt, te, ee, Yt = !1) {
    let ce = t.roadAt(bt, te, 25);
    if (!ce || !ET(ce.E)) return null;
    let Xe = ce.E,
      Oe =
        (_T[Di(bt, te)] ?? 0.5) *
        (Lp.has(Xe.name)
          ? 1.5
          : Xe.cls === "residential" || Xe.cls === "service"
            ? 0.7
            : 1);
    if (f() > Oe / ee) return null;
    let Ke = f() < 0.5 ? 1 : -1,
      qs = f() < 0.5 ? 1 : -1,
      Rs = _(Xe, Ke, "a"),
      Ps = _(Xe, Ke, "b");
    if (Ps - Rs < 4) return null;
    let Qs = tu(ce.s, Rs + 1, Ps - 1);
    if ((S(Xe, Qs, Ke, 0.55, w), t.surfaceAt(w.x, w.z) !== "walk")) return null;
    let xs = A.pop() || O();
    return (
      B(xs, Xe, Qs, Ke, qs),
      b && !g(xs.x, xs.z, xs.y, null, !Yt) ? (A.push(xs), null) : xs
    );
  }
  function N(bt, te = !1) {
    let ee = A.pop() || O(),
      Yt = bt.kind === "shelter",
      ce = bt.rot,
      Xe = Math.sin(ce),
      Oe = Math.cos(ce);
    te && Object.assign(ee, O());
    let Ke = f(),
      qs = Math.cos(ce),
      Rs = -Math.sin(ce),
      Ps,
      Qs,
      xs,
      an;
    if (Yt) {
      let Ds = (Ke - 0.5) * 2.6;
      ((Ps = bt.x + qs * Ds + Xe * 0.3), (Qs = bt.z + Rs * Ds + Oe * 0.3));
      let hs = f() < 0.5 ? 1 : -1;
      ((xs = Xe * 0.6 + qs * hs * 0.8), (an = Oe * 0.6 + Rs * hs * 0.8));
    } else {
      let Ds = Ke * Math.PI * 2;
      ((Ps = bt.x + Math.cos(Ds) * 0.75),
        (Qs = bt.z + Math.sin(Ds) * 0.75),
        (xs = bt.x - Ps),
        (an = bt.z - Qs));
    }
    let De = Math.hypot(xs, an) || 1;
    return (
      Object.assign(ee, {
        st: "stand",
        g: null,
        gid: void 0,
        kb: null,
        mad: 0,
        sx: 0,
        sz: 0,
        bx: void 0,
        gen: (ee.gen || 0) + 1,
        lag: 0,
        vs: 0,
        E: null,
        path: null,
        J: null,
        spot: bt,
        plaza: null,
        x: Ps,
        z: Qs,
        y: bt.y,
        hx: xs / De,
        hz: an / De,
        t: 0,
      }),
      b && !g(Ps, Qs, bt.y, null, !te)
        ? (A.push(ee), null)
        : ((ee.pose = b ? gp(f) : f() < 0.3 ? 2 : 0), ee)
    );
  }
  for (let bt of a) bt.grid = null;
  function D(bt) {
    let te = bt.mesh;
    te.updateMatrixWorld(!0);
    let ee = te.geometry,
      Yt = ee.attributes.position,
      ce = ee.index,
      Xe = te.matrixWorld,
      Oe = new dt(),
      Ke = [],
      qs = Math.ceil(bt.x1 - bt.x0),
      Rs = Math.ceil(bt.z1 - bt.z0),
      Ps = new Float32Array(qs * Rs).fill(1e9),
      Qs = ce ? ce.count : Yt.count,
      xs = (an) =>
        Oe.fromBufferAttribute(Yt, ce ? ce.getX(an) : an)
          .applyMatrix4(Xe)
          .toArray();
    for (let an = 0; an < Qs; an += 3) {
      let De = xs(an),
        Ds = xs(an + 1),
        hs = xs(an + 2),
        nn = Ds[0] - De[0],
        dn = Ds[1] - De[1],
        Wn = Ds[2] - De[2],
        Xn = hs[0] - De[0],
        ni = hs[1] - De[1],
        An = hs[2] - De[2],
        ii = Wn * Xn - nn * An,
        Mt = Math.hypot(dn * An - Wn * ni, ii, nn * ni - dn * Xn);
      if (Mt < 1e-9 || Math.abs(ii) / Mt < 0.85) continue;
      let Xt = Math.max(0, Math.floor(Math.min(De[0], Ds[0], hs[0]) - bt.x0)),
        xt = Math.min(
          qs - 1,
          Math.floor(Math.max(De[0], Ds[0], hs[0]) - bt.x0),
        ),
        wt = Math.max(0, Math.floor(Math.min(De[2], Ds[2], hs[2]) - bt.z0)),
        _t = Math.min(
          Rs - 1,
          Math.floor(Math.max(De[2], Ds[2], hs[2]) - bt.z0),
        ),
        ae =
          (Ds[2] - hs[2]) * (De[0] - hs[0]) + (hs[0] - Ds[0]) * (De[2] - hs[2]);
      for (let se = Xt; se <= xt; se++)
        for (let Jt = wt; Jt <= _t; Jt++) {
          let _e = bt.x0 + se + 0.5,
            mt = bt.z0 + Jt + 0.5,
            ie =
              ((Ds[2] - hs[2]) * (_e - hs[0]) +
                (hs[0] - Ds[0]) * (mt - hs[2])) /
              ae,
            Dt =
              ((hs[2] - De[2]) * (_e - hs[0]) +
                (De[0] - hs[0]) * (mt - hs[2])) /
              ae;
          if (ie < -0.02 || Dt < -0.02 || ie + Dt > 1.02) continue;
          let Ht = ie * De[1] + Dt * Ds[1] + (1 - ie - Dt) * hs[1],
            ft = Jt * qs + se;
          Ht < Ps[ft] && (Ps[ft] = Ht);
        }
    }
    bt.grid = { H: Ps, nx: qs, nz: Rs };
  }
  let U = (bt, te, ee) => {
      let Yt = bt.grid,
        ce = tu(Math.floor(te - bt.x0), 0, Yt.nx - 1),
        Xe = tu(Math.floor(ee - bt.z0), 0, Yt.nz - 1);
      return Yt.H[Xe * Yt.nx + ce];
    },
    G = (bt, te, ee) => [bt.cx + te * 7.5, bt.cz + ee * 7.5],
    W = (bt, te, ee) => {
      let [Yt, ce] = G(bt, te, ee);
      return (
        Yt > bt.x0 + 11 &&
        Yt < bt.x1 - 11 &&
        ce > bt.z0 + 11 &&
        ce < bt.z1 - 11 &&
        Math.hypot(Yt - bt.cx, ce - bt.cz) > 10 &&
        U(bt, Yt, ce) < 1e8
      );
    };
  function V(bt, te, ee, Yt, ce) {
    let Xe = Math.hypot(Yt - te, ce - ee),
      Oe = U(bt, te, ee),
      Ke = U(bt, Yt, ce);
    for (let qs = 0; qs <= Xe; qs += 1) {
      let Rs = qs / Xe,
        Ps = U(bt, te + (Yt - te) * Rs, ee + (ce - ee) * Rs);
      if (Math.abs(Ps - (Oe + (Ke - Oe) * Rs)) > 0.2) return !1;
    }
    return !0;
  }
  function $(bt) {
    let te = bt.plaza,
      ee = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]
        .map(([Yt, ce]) => [bt.li + Yt, bt.lj + ce])
        .filter(([Yt, ce]) => W(te, Yt, ce));
    for (let Yt = ee.length - 1; Yt > 0; Yt--) {
      let ce = Math.floor(f() * (Yt + 1));
      [ee[Yt], ee[ce]] = [ee[ce], ee[Yt]];
    }
    for (let [Yt, ce] of ee) {
      let [Xe, Oe] = G(te, Yt, ce);
      if (!V(te, bt.x, bt.z, Xe, Oe)) continue;
      let Ke = Math.hypot(Xe - bt.x, Oe - bt.z);
      ((bt.path = {
        x0: bt.x,
        z0: bt.z,
        y0: bt.y,
        x1: Xe,
        z1: Oe,
        y1: U(te, Xe, Oe),
        len: Ke,
        u: 0,
        cross: !1,
        plaza: !0,
      }),
        (bt.li = Yt),
        (bt.lj = ce),
        (bt.hx = (Xe - bt.x) / Ke),
        (bt.hz = (Oe - bt.z) / Ke),
        (bt.st = "path"));
      return;
    }
    ((bt.st = "stand"), (bt.t = 0));
  }
  function J(bt, te) {
    let ee = Math.round(((f() - 0.5) * 2 * (bt.x1 - bt.x0)) / 15),
      Yt = Math.round(((f() - 0.5) * 2 * (bt.z1 - bt.z0)) / 15);
    if (!W(bt, ee, Yt)) return null;
    let ce = A.pop() || O(),
      [Xe, Oe] = G(bt, ee, Yt),
      Ke = f() * Math.PI * 2;
    return (
      Object.assign(ce, {
        st: "stand",
        g: null,
        gid: void 0,
        kb: null,
        mad: 0,
        sx: 0,
        sz: 0,
        bx: void 0,
        gen: (ce.gen || 0) + 1,
        lag: 0,
        vs: 0,
        E: null,
        path: null,
        J: null,
        spot: null,
        plaza: bt,
        li: ee,
        lj: Yt,
        x: Xe + (f() - 0.5) * 2,
        z: Oe + (f() - 0.5) * 2,
        hx: Math.cos(Ke),
        hz: Math.sin(Ke),
        t: f() * 4,
      }),
      (ce.y = U(bt, ce.x, ce.z)),
      ce.y > 1e8 || (b && !g(ce.x, ce.z, ce.y))
        ? (A.push(ce), null)
        : ((ce.pose = b ? gp(f) : f() < 0.25 ? 2 : 0), ce)
    );
  }
  function X(bt, te) {
    let ee = bt.E,
      Yt = bt.dir > 0 ? "b" : "a",
      ce = o.juns[bt.dir > 0 ? ee.jb : ee.ja],
      Xe = bt.x,
      Oe = bt.z,
      Ke = bt.hx,
      qs = bt.hz,
      Rs = [];
    if (ce) {
      for (let [De, Ds] of ce.legs)
        if (ET(De))
          for (let hs of [1, -1]) {
            if (De === ee && hs === bt.side) continue;
            let nn = _(De, hs, Ds),
              dn = S(De, nn, hs, bt.f, {}),
              Wn = Math.hypot(dn.x - Xe, dn.z - Oe);
            if (Wn > 38) continue;
            let Xn = (dn.x - Xe) / (Wn || 1),
              ni = (dn.z - Oe) / (Wn || 1),
              An = Ds === "a" ? 1 : -1,
              ii = Wn > 4.8,
              Mt = Ot(De, tu(nn + An * 3, 0, De.L), {}),
              Xt = Mt.dx * An,
              xt = Mt.dz * An,
              wt = Xt * Ke + xt * qs,
              _t = ii ? (wt > 0.7 ? 1.4 : 0.35) : wt > 0.7 ? 1.2 : 0.9;
            (De === ee && (_t = 0.25),
              Rs.push({
                G: De,
                side: hs,
                gdir: An,
                s0: nn,
                X: dn,
                d: Wn,
                cross: ii,
                w: _t,
                dx: Xn,
                dz: ni,
              }));
          }
    }
    if (!Rs.length) {
      ((bt.dir = -bt.dir), (bt.hx = -bt.hx), (bt.hz = -bt.hz));
      return;
    }
    let Ps = 0;
    for (let De of Rs) Ps += De.w;
    let Qs = f() * Ps,
      xs = Rs[0];
    for (let De of Rs)
      if ((Qs -= De.w) <= 0) {
        xs = De;
        break;
      }
    let an = !1;
    if (xs.cross && ce && ce.ctl === 2 && s && ce.tl) {
      let De = (Xe + xs.X.x) / 2,
        Ds = (Oe + xs.X.z) / 2,
        hs = null,
        nn = 1e9;
      for (let dn of ce.tl)
        (ys(dn.E, De, Ds, M), M.d < nn && ((nn = M.d), (hs = dn)));
      (hs && (xs.leg = hs), (an = !!hs));
    }
    ((bt.path = {
      x0: Xe,
      z0: Oe,
      y0: bt.y,
      x1: xs.X.x,
      z1: xs.X.z,
      y1: xs.X.y,
      len: xs.d,
      u: 0,
      cross: xs.cross,
      next: xs,
    }),
      (bt.hx = xs.dx),
      (bt.hz = xs.dz),
      (bt.st = an || (b && xs.cross) ? "wait" : "path"),
      (bt.J = ce),
      (bt.t = 0),
      (bt.gapT = 0));
  }
  let tt = new Float32Array(16),
    Z = new qo(),
    q = new fe(),
    j = new _n(new dt(), 1.1),
    K = 0,
    nt = null,
    Q = 0,
    et = 0,
    st = { n: 0, drawn: 0, leaps: 0 };
  function ot(bt, te, ee, Yt, ce, Xe, Oe, Ke) {
    let qs = bt.x + (bt.sx || 0) - te,
      Rs = bt.z + (bt.sz || 0) - ee,
      Ps = qs * Yt + Rs * ce,
      Qs = qs * ce - Rs * Yt;
    return Ps > -2.6 && Ps < Ke + Xe * 1.1 && Math.abs(Qs) < Oe
      ? Qs >= 0
        ? 1
        : -1
      : 0;
  }
  function rt(bt, te, ee, Yt, ce) {
    b && ((bt.x += bt.sx || 0), (bt.z += bt.sz || 0), (bt.sx = bt.sz = 0));
    let Xe = ee * Yt,
      Oe = -te * Yt,
      Ke = Math.min(ce * 0.2, 3),
      qs = Xe * (4.6 + ce * 0.06) + te * Ke,
      Rs = Oe * (4.6 + ce * 0.06) + ee * Ke,
      Ps = Math.hypot(qs, Rs) || 1;
    ((bt.leap = b
      ? { vx: qs * 0.5, vz: Rs * 0.5, t: 0, dur: 0.6, y0: bt.y, hop: 0.05 }
      : { vx: qs, vz: Rs, t: 0, dur: 0.55, y0: bt.y, hop: 0.45 }),
      (bt.st = "leap"),
      (bt.hx = qs / Ps),
      (bt.hz = Rs / Ps),
      st.leaps++);
  }
  let lt = (...bt) => {
    let te = 2166136261;
    for (let ee of bt)
      ((te ^= (ee | 0) + 2654435769),
        (te = Math.imul(te ^ (te >>> 15), 2246822519)),
        (te ^= te >>> 13));
    return ((te >>> 0) % 2147483646) + 1;
  };
  function ht(bt, te, ee, Yt) {
    let ce = bt.slots || (bt.slots = []),
      Xe = Yt.now() / 1e3;
    for (let Oe = 0; Oe < ee; Oe++) {
      let Ke = lt(Yt.seed, te, Oe),
        qs = 25 + (Ke % 2e3) / 100,
        Rs = ((Ke % 997) / 997) * qs,
        Ps = Math.floor((Xe + Rs) / qs),
        Qs = te * 1e6 + Oe * 1e4 + (Ps % 1e4),
        xs = ce[Oe];
      if (xs && xs.sid === Qs && z.includes(xs)) continue;
      if (xs && xs.sid !== void 0 && z.includes(xs)) {
        if (xs.kb) continue;
        ((xs.sid = void 0),
          xs.E && ((xs.st = "walk"), (xs.t = 0), (xs.pose = 0)));
      }
      let an = h;
      ((h = lt(Yt.seed, te, Oe, Ps)), A.push(O()));
      let De = null;
      for (let Ds = 0; Ds < 6 && !De; Ds++) {
        let hs = f() * Math.PI * 2,
          nn = Math.sqrt(f()) * bt.r;
        ((De = H(bt.x + Math.cos(hs) * nn, bt.z + Math.sin(hs) * nn, 0.2, !0)),
          De &&
            ce.some(
              (dn) =>
                dn &&
                dn !== De &&
                dn.sid !== void 0 &&
                Math.hypot(dn.x - De.x, dn.z - De.z) < 2 * 0.3 + 0.15,
            ) &&
            (A.push(De), (De = null)));
      }
      if (De) {
        let Ds = bt.x - De.x,
          hs = bt.z - De.z,
          nn = Math.hypot(Ds, hs) || 1;
        ((De.hot = bt),
          (De.sid = Qs),
          (De.st = "stand"),
          (De.hx = Ds / nn),
          (De.hz = hs / nn),
          (De.t = 0),
          (De.watchT = 1e9),
          (De.pose = b
            ? f() < 0.3
              ? Rn.photo
              : f() < 0.25
                ? Rn.point
                : gp(f)
            : f() < 0.3
              ? 2
              : 0),
          z.push(De),
          (ce[Oe] = De));
      } else (A.pop(), (ce[Oe] = null));
      h = an;
    }
  }
  function pt(bt) {
    let te = null,
      ee = 2.5;
    for (let Yt of z) {
      if (Yt.st === "knock" || Yt.kb) continue;
      if (bt.id && (Yt.sid === bt.id || Yt.gid === bt.id)) {
        te = Yt;
        break;
      }
      let ce = Math.hypot(Yt.x - bt.x, Yt.z - bt.z);
      ce < ee && ((ee = ce), (te = Yt));
    }
    return te
      ? ((te.x += te.sx || 0),
        (te.z += te.sz || 0),
        (te.sx = te.sz = 0),
        (te.kb = {
          vx: bt.vx,
          vz: bt.vz,
          vy: bt.vy,
          ang: 0,
          w: bt.w,
          ph: "air",
          t: 0,
          n: 0,
          rest: 1.6,
          y: te.y,
          y0: te.y,
          x0: te.x,
          z0: te.z,
        }),
        (te.hx = -bt.vx / (Math.hypot(bt.vx, bt.vz) || 1)),
        (te.hz = -bt.vz / (Math.hypot(bt.vx, bt.vz) || 1)),
        (te.st = "knock"),
        (te.leap = null),
        (st.knocksIn = (st.knocksIn || 0) + 1),
        !0)
      : !1;
  }
  let ut = (bt) => (b ? tu(1.6 - (bt.lag || 0) * 0.9, 0.12, 1) : 1);
  function it(bt, te, ee) {
    if (
      !bt.E ||
      bt.plaza ||
      bt.spot ||
      bt.nx === void 0 ||
      !(bt.st === "walk" || bt.st === "wait" || bt.st === "stand")
    )
      return null;
    let Yt = bt.E.sw,
      ce = (te - bt.x) * bt.nx + (ee - bt.z) * bt.nz,
      Xe = bt.f + ce / Yt,
      Oe = 1 - (0.3 + 0.06) / Yt;
    if (Xe <= Oe) return null;
    let Ke = (Xe - Oe) * Yt;
    return [te - bt.nx * Ke, ee - bt.nz * Ke];
  }
  function at(bt, te) {
    let ee = bt.x1 - bt.x0,
      Yt = bt.z1 - bt.z0;
    for (let ce of te || []) {
      if (Math.abs(ce.x - bt.x0) > 70 || Math.abs(ce.z - bt.z0) > 70) continue;
      if (wk(ce, bt.x0, bt.z0, bt.x1, bt.z1, 0.5)) return !1;
      if (ce.sp < 1) continue;
      let Xe = ce.vx / ce.sp,
        Oe = ce.vz / ce.sp,
        Ke = Xe * Yt - Oe * ee;
      if (Math.abs(Ke) < 1e-6) continue;
      let qs = bt.x0 - ce.x,
        Rs = bt.z0 - ce.z,
        Ps = (qs * Yt - Rs * ee) / Ke,
        Qs = (qs * Oe - Rs * Xe) / Ke;
      if (Qs > -0.25 && Qs < 1.25 && Ps > -ce.hl - 1 && Ps < ce.sp * 4 + ce.hl)
        return !1;
    }
    return !0;
  }
  let yt = 120,
    vt = 0.2,
    At = 34,
    Ut = U2 + 170,
    Gt = 128,
    Pt = new Map(),
    Vt = null,
    Kt = -1,
    ue = 0,
    ne = {},
    jt = (bt) => (bt.rs = (bt.rs * 16807) % 2147483647) / 2147483647;
  function be() {
    Vt = new Map();
    for (let bt of o.edges) {
      if (!ET(bt)) continue;
      Ot(bt, bt.L / 2, ne);
      let te = Math.floor(ne.x / Gt) * 65536 + Math.floor(ne.z / Gt),
        ee = Vt.get(te);
      (ee || Vt.set(te, (ee = [])), ee.push(bt));
    }
  }
  function re(bt) {
    if (bt.st === "path") {
      let te = bt.path,
        ee = Math.min(1, te.u);
      ((bt.x = te.x0 + (te.x1 - te.x0) * ee),
        (bt.z = te.z0 + (te.z1 - te.z0) * ee),
        (bt.y =
          te.y0 +
          (te.y1 - te.y0) * ee -
          (te.cross ? eN * Math.min(1, ee / 0.12, (1 - ee) / 0.12) : 0)),
        (bt.hx = te.dx),
        (bt.hz = te.dz));
      return;
    }
    (S(bt.E, bt.s, bt.side, bt.f, ne),
      (bt.x = ne.x),
      (bt.y = ne.y),
      (bt.z = ne.z),
      (bt.hx = ne.hx * bt.dir),
      (bt.hz = ne.hz * bt.dir),
      (bt.nx = y.nx * bt.side),
      (bt.nz = y.nz * bt.side));
  }
  function ds(bt, te, ee, Yt, ce) {
    let Xe = _(bt, te, "a"),
      Oe = _(bt, te, "b");
    if (Oe - Xe < 4) return null;
    let Ke = {
      key: bt.sid * 1e3 + (te > 0 ? 500 : 0) + ee,
      gid: -((bt.sid * 1e3 + (te > 0 ? 500 : 0) + ee) * 1e3 + (Yt % 1e3) + 1),
      E: bt,
      side: te,
      j: ee,
      e: Yt,
      rs: lt(ce, bt.sid, te, ee, Yt),
      st: "walk",
      path: null,
      J: null,
      wt: 0,
      P: null,
    };
    return (
      (Ke.seed = Ke.rs),
      (Ke.s = Xe + 1 + jt(Ke) * (Oe - Xe - 2)),
      (Ke.dir = jt(Ke) < 0.5 ? 1 : -1),
      (Ke.f = 0.3 + jt(Ke) * 0.45),
      (Ke.speed = 1.05 + jt(Ke) * 0.55),
      re(Ke),
      Ke
    );
  }
  function Nt(bt, te) {
    let ee = bt.E,
      Yt = bt.dir > 0 ? "b" : "a",
      ce = o.juns[bt.dir > 0 ? ee.jb : ee.ja],
      Xe = bt.x,
      Oe = bt.z,
      Ke = bt.hx,
      qs = bt.hz,
      Rs = [];
    if (ce) {
      for (let [De, Ds] of ce.legs)
        if (ET(De))
          for (let hs of [1, -1]) {
            if (De === ee && hs === bt.side) continue;
            let nn = _(De, hs, Ds),
              dn = S(De, nn, hs, bt.f, {}),
              Wn = Math.hypot(dn.x - Xe, dn.z - Oe);
            if (Wn > 38) continue;
            let Xn = Ds === "a" ? 1 : -1,
              ni = Wn > 4.8,
              An = Ot(De, tu(nn + Xn * 3, 0, De.L), {}),
              ii = An.dx * Xn * Ke + An.dz * Xn * qs,
              Mt = ni ? (ii > 0.7 ? 1.4 : 0.35) : ii > 0.7 ? 1.2 : 0.9;
            (De === ee && (Mt = 0.25),
              Rs.push({
                G: De,
                side: hs,
                gdir: Xn,
                s0: nn,
                X: dn,
                d: Wn,
                cross: ni,
                w: Mt,
                dx: (dn.x - Xe) / (Wn || 1),
                dz: (dn.z - Oe) / (Wn || 1),
              }));
          }
    }
    if (!Rs.length) {
      bt.dir = -bt.dir;
      return;
    }
    let Ps = 0;
    for (let De of Rs) Ps += De.w;
    let Qs = jt(bt) * Ps,
      xs = Rs[0];
    for (let De of Rs)
      if ((Qs -= De.w) <= 0) {
        xs = De;
        break;
      }
    let an = null;
    if (xs.cross && ce && ce.ctl === 2 && s && ce.tl) {
      let De = (Xe + xs.X.x) / 2,
        Ds = (Oe + xs.X.z) / 2,
        hs = 1e9;
      for (let nn of ce.tl)
        (ys(nn.E, De, Ds, M), M.d < hs && ((hs = M.d), (an = nn)));
    }
    ((bt.path = {
      x0: Xe,
      z0: Oe,
      y0: bt.y,
      x1: xs.X.x,
      z1: xs.X.z,
      y1: xs.X.y,
      len: xs.d,
      u: 0,
      cross: xs.cross,
      next: xs,
      dx: xs.dx,
      dz: xs.dz,
    }),
      (xs.leg = an),
      (bt.st = an ? "wait" : "path"),
      (bt.J = ce),
      (bt.wt = 0));
  }
  function $e(bt, te, ee) {
    if (bt.st === "walk") {
      bt.s += bt.dir * bt.speed * te;
      let Yt = bt.dir > 0 ? _(bt.E, bt.side, "b") : _(bt.E, bt.side, "a");
      (re(bt), (bt.s - Yt) * bt.dir >= 0 && Nt(bt, ee));
    } else if (bt.st === "wait") {
      bt.wt += te;
      let Yt = bt.path.next.leg;
      (!Yt ||
        !s ||
        s.signal(bt.J, Yt.ph, ee - (s.tOff || 0)) === 2 ||
        bt.wt > 45) &&
        (bt.st = "path");
    } else {
      let Yt = bt.path;
      if (
        ((Yt.u +=
          (bt.speed * (Yt.cross ? 1.1 : 1) * te) / Math.max(0.3, Yt.len)),
        Yt.u >= 1)
      ) {
        let ce = Yt.next;
        ((bt.E = ce.G),
          (bt.side = ce.side),
          (bt.dir = ce.gdir),
          (bt.s = ce.s0),
          (bt.st = "walk"),
          (bt.path = null));
      }
    }
    bt.st !== "walk" && re(bt);
  }
  function ve(bt, te, ee, Yt, ce) {
    if ((Vt || be(), (ue -= 1) <= 0 || ce)) {
      ue = 15;
      let Xe = new Set(),
        Oe = Math.floor((bt - Ut) / Gt),
        Ke = Math.floor((bt + Ut) / Gt),
        qs = Math.floor((te - Ut) / Gt),
        Rs = Math.floor((te + Ut) / Gt);
      for (let Ps = Oe; Ps <= Ke; Ps++)
        for (let Qs = qs; Qs <= Rs; Qs++)
          for (let xs of Vt.get(Ps * 65536 + Qs) || []) {
            if ((Ot(xs, xs.L / 2, ne), Math.hypot(ne.x - bt, ne.z - te) > Ut))
              continue;
            let an =
              (_T[Di(ne.x, ne.z)] ?? 0.5) *
              (Lp.has(xs.name)
                ? 1.5
                : xs.cls === "residential" || xs.cls === "service"
                  ? 0.7
                  : 1);
            for (let De of [1, -1]) {
              let Ds = Math.floor(
                (Math.max(0, _(xs, De, "b") - _(xs, De, "a")) * an) / At +
                  (lt(Yt.seed, xs.sid, De) % 1e3) / 1e3,
              );
              for (let hs = 0; hs < Ds; hs++) {
                let nn = xs.sid * 1e3 + (De > 0 ? 500 : 0) + hs;
                Xe.add(nn);
                let dn = ((lt(Yt.seed, xs.sid, De, hs, 7) % 1e5) / 1e5) * yt,
                  Wn = Math.floor((ee + dn) / yt),
                  Xn = Pt.get(nn);
                if (Xn && Xn.e === Wn) continue;
                let ni = ds(xs, De, hs, Wn, Yt.seed);
                if (!ni) {
                  Pt.delete(nn);
                  continue;
                }
                let An = Wn * yt - dn;
                for (; ee - An >= vt;) ($e(ni, vt, An + vt), (An += vt));
                ((ni.tg = An), Pt.set(nn, ni));
              }
            }
          }
      for (let [Ps, Qs] of Pt) Xe.has(Ps) || Pt.delete(Ps);
    }
    for (let Xe of Pt.values()) as(Xe, ee);
    for (let Xe of z) Xe.g && Pt.get(Xe.g.key) !== Xe.g && as(Xe.g, ee);
  }
  function as(bt, te) {
    for (; te - bt.tg >= vt;) ($e(bt, vt, bt.tg + vt), (bt.tg += vt));
    let ee = te - bt.tg;
    if (bt.st === "walk") {
      let Yt = bt.s;
      ((bt.s += bt.dir * bt.speed * ee), re(bt), (bt.s = Yt));
    } else if (bt.st === "path") {
      let Yt = bt.path,
        ce = Yt.u;
      ((Yt.u = Math.min(
        1,
        Yt.u + (bt.speed * (Yt.cross ? 1.1 : 1) * ee) / Math.max(0.3, Yt.len),
      )),
        re(bt),
        (Yt.u = ce));
    }
  }
  function Se(bt) {
    let te = h;
    h = bt.seed;
    let ee = A.pop() || O();
    return (
      Object.assign(ee, O()),
      (h = te),
      Object.assign(ee, {
        st: bt.st,
        kb: null,
        mad: 0,
        sx: 0,
        sz: 0,
        bx: void 0,
        gen: (ee.gen || 0) + 1,
        lag: 0,
        vs: 0,
        stuck: 0,
        gapT: 0,
        spot: null,
        plaza: null,
        hot: null,
        path: bt.path,
        J: bt.J,
        E: bt.E,
        s: bt.s,
        side: bt.side,
        dir: bt.dir,
        f: bt.f,
        speed: bt.speed,
        x: bt.x,
        y: bt.y,
        z: bt.z,
        hx: bt.hx,
        hz: bt.hz,
        nx: bt.nx || 0,
        nz: bt.nz || 0,
        g: bt,
        gid: bt.gid,
        t: 0,
      }),
      (ee.cad = (2 * Math.PI * ee.speed) / (1.37 * ee.sc)),
      (bt.P = ee),
      ee
    );
  }
  let Fe = new Set(["walk", "path", "wait"]);
  function xe(bt, te) {
    let ee = bt.g;
    ((bt.lag || 0) > 3
      ? ((bt.gl = (bt.gl || 0) + te),
        j.center.set(bt.x + (bt.sx || 0), bt.y + 0.9, bt.z + (bt.sz || 0)),
        bt.gl > (Z.intersectsSphere(j) ? 4 : 1) &&
          ((bt.bx = void 0),
          (bt.sx = bt.sz = 0),
          (bt.lag = 0),
          (bt.gl = 0),
          (st.ghostSnaps = (st.ghostSnaps || 0) + 1)))
      : (bt.gl = 0),
      (bt.st = ee.st),
      (bt.E = ee.E),
      (bt.s = ee.s),
      (bt.side = ee.side),
      (bt.dir = ee.dir),
      (bt.f = ee.f),
      (bt.path = ee.path),
      (bt.J = ee.J),
      (bt.x = ee.x),
      (bt.y = ee.y),
      (bt.z = ee.z),
      (bt.hx = ee.hx),
      (bt.hz = ee.hz),
      ee.nx !== void 0 && ((bt.nx = ee.nx), (bt.nz = ee.nz)));
  }
  function He(bt, te, ee, Yt, ce = null) {
    if (!(bt > 0)) return;
    let Xe = performance.now(),
      Oe = te.pos.x,
      Ke = te.pos.z;
    T = Math.round(tu(e * (_T[Di(Oe, Ke)] ?? 0.5), Math.min(e, 40), e));
    let qs = nt === null || Math.hypot(Oe - nt, Ke - Q) > 40;
    ((nt = Oe), (Q = Ke));
    for (let mt = z.length - 1; mt >= 0; mt--) {
      let ie = z[mt];
      (Math.abs(ie.x - Oe) > U2 ||
        Math.abs(ie.z - Ke) > U2 ||
        Math.hypot(ie.x - Oe, ie.z - Ke) > U2 ||
        (ie.g &&
          Pt.get(ie.g.key) !== ie.g &&
          Math.hypot(ie.x - Oe, ie.z - Ke) > 50)) &&
        (ie.g &&
          (ie.g.P === ie && (ie.g.P = null), (ie.g = null), (ie.gid = void 0)),
        (ie.spot = null),
        (ie.plaza = null),
        A.push(ie),
        (z[mt] = z[z.length - 1]),
        z.pop());
    }
    if ((F -= bt) < 0) {
      F = 2;
      for (let mt of I)
        Math.hypot(mt.x - Oe, mt.z - Ke) > U2 + 10 && I.delete(mt);
    }
    for (let mt of a)
      if (!(Math.hypot(mt.cx - Oe, mt.cz - Ke) > 170)) {
        if (!mt.grid) {
          let Dt = performance.now();
          (D(mt), (mt.gridMs = performance.now() - Dt));
        }
        mt.n = 0;
        for (let Dt of z) Dt.plaza === mt && mt.n++;
        for (let Dt = 0; Dt < (qs ? 40 : 1) && mt.n < mt.want; Dt++) {
          let Ht = J(mt);
          Ht && (z.push(Ht), mt.n++);
        }
        T = Math.max(0, T - mt.n);
      }
    for (let mt = 0; mt < r.length; mt++) {
      let ie = r[mt];
      if (Math.hypot(ie.x - Oe, ie.z - Ke) > U2 + ie.r) continue;
      let Dt = ms.sync ? Math.round(ie.want * (ie.stand ?? 0.45)) : 0;
      (Dt && ht(ie, mt, Dt, ms.sync), (ie.n = 0));
      for (let Ht of z) Ht.hot === ie && !Ht.sid && ie.n++;
      for (
        let Ht = 0;
        Ht < (qs ? 40 : 2) && ie.n < ie.want - Dt && !ms.sync;
        Ht++
      ) {
        let ft = f() * Math.PI * 2,
          zt = Math.sqrt(f()) * ie.r,
          kt = H(ie.x + Math.cos(ft) * zt, ie.z + Math.sin(ft) * zt, 0.2);
        if (kt) {
          if (((kt.hot = ie), !Dt && f() < (ie.stand ?? 0.45))) {
            let Ft = ie.x - kt.x,
              qt = ie.z - kt.z,
              Et = Math.hypot(Ft, qt) || 1;
            ((kt.st = "stand"),
              (kt.hx = Ft / Et),
              (kt.hz = qt / Et),
              (kt.t = 0),
              (kt.watchT = 6 + f() * 18),
              (kt.pose = b
                ? f() < 0.3
                  ? Rn.photo
                  : f() < 0.25
                    ? Rn.point
                    : gp(f)
                : f() < 0.3
                  ? 2
                  : 0));
          }
          (z.push(kt), ie.n++);
        }
      }
      T = Math.max(0, T - ie.n - Dt);
    }
    let Rs = ms.sync;
    if (Rs) {
      let mt = Rs.now() / 1e3;
      ve(Oe, Ke, mt, Rs, qs);
      for (let ie of Pt.values())
        ie.P ||
          Math.abs(ie.x - Oe) > Kv ||
          Math.abs(ie.z - Ke) > Kv ||
          Math.hypot(ie.x - Oe, ie.z - Ke) > Kv ||
          z.push(Se(ie));
    } else if (Pt.size) {
      for (let mt of z) mt.g && ((mt.g = null), (mt.gid = void 0));
      Pt.clear();
    }
    ee.updateMatrixWorld();
    let Ps = ee.matrixWorld.elements,
      Qs = Math.hypot(Ps[8], Ps[10]) || 1,
      xs = -Ps[8] / Qs,
      an = -Ps[10] / Qs;
    if (((K += bt), qs && (et = 1.5), (et -= bt), K > 0.05 || et > 0)) {
      K = 0;
      for (let mt = 0; mt < (et > 0 ? 60 : 8) && z.length < T && !Rs; mt++) {
        let ie = f() * Math.PI * 2,
          Dt = Math.cos(ie),
          Ht = Math.sin(ie),
          ft = et <= 0 && Dt * xs + Ht * an > 0.45,
          zt = et > 0 ? 8 : ft ? 72 : 28,
          kt = zt + f() * (Kv - zt),
          Ft = H(Oe + Dt * kt, Ke + Ht * kt, 1.9);
        Ft && z.push(Ft);
      }
      if ((L -= 0.05) < 0 || et > 0) {
        L = 0.5;
        let mt = Math.floor(Oe / R),
          ie = Math.floor(Ke / R),
          Dt = Math.ceil(Kv / R);
        for (let Ht = mt - Dt; Ht <= mt + Dt; Ht++)
          for (let ft = ie - Dt; ft <= ie + Dt; ft++)
            for (let zt of P.get(C(Ht, ft)) || []) {
              if (I.has(zt) || (!Rs && z.length >= T)) continue;
              let kt = Math.hypot(zt.x - Oe, zt.z - Ke);
              if (kt > Kv || (kt < 30 && et <= 0 && !Rs)) continue;
              I.add(zt);
              let Ft = h;
              if (
                (Rs &&
                  (h = lt(
                    Rs.seed,
                    Math.round(zt.x * 10),
                    Math.round(zt.z * 10),
                    Math.floor(Rs.now() / 3e5),
                  )),
                f() >
                  (_T[Di(zt.x, zt.z)] ?? 0.5) *
                    (zt.kind === "bench" ? 0.4 : 0.8))
              ) {
                h = Ft;
                continue;
              }
              let qt =
                zt.kind === "shelter"
                  ? 1 + Math.floor(f() * 3)
                  : 1 + Math.floor(f() * 2);
              for (let Et = 0; Et < qt; Et++) {
                let Me = null;
                for (let de = 0; de < 4 && !Me; de++) Me = N(zt, !!Rs);
                Me && ((Me.spotOwner = Et === 0), z.push(Me));
              }
              h = Ft;
            }
      }
    }
    let De = Math.hypot(te.vel.x, te.vel.z),
      Ds = De > 0.5 ? te.vel.x / De : -Math.sin(te.psi),
      hs = De > 0.5 ? te.vel.z / De : -Math.cos(te.psi),
      nn = -Math.sin(te.psi),
      dn = -Math.cos(te.psi),
      Wn = ce?.cars || [],
      Xn = b ? Bm(Oe, Ke, U2 + 10, te, ce) : null,
      ni = (mt, ie, Dt) => {
        let Ht = t.driveHeight(mt, ie, null, Dt + 0.5),
          ft = zp(mt, ie);
        return ft !== null && Math.abs(ft - Ht) < 0.6 ? Math.max(ft, Ht) : Ht;
      };
    for (let mt of z) {
      if (((mt.t += bt), mt.mad > 0 && (mt.mad -= bt), b)) {
        if (
          (mt.st === "knock" &&
            (yk(mt, bt, ni) && ((mt.st = "recover"), (mt.t = 0)),
            p &&
              mt.kb &&
              p(mt.x, mt.z, mt.y, (Dt) => {
                let Ht = lc(Dt, mt.x, mt.z, 0.3);
                if (!Ht) return;
                ((mt.x += Ht[0]), (mt.z += Ht[1]));
                let ft = Math.hypot(Ht[0], Ht[1]) || 1,
                  zt = Ht[0] / ft,
                  kt = Ht[1] / ft,
                  Ft = mt.kb.vx * zt + mt.kb.vz * kt;
                Ft < 0 &&
                  ((mt.kb.vx -= 1.4 * Ft * zt), (mt.kb.vz -= 1.4 * Ft * kt));
              })),
          mt.st !== "knock")
        )
          for (let Dt of Xn) {
            if (
              Dt.sp <= 1.8 ||
              Math.abs(mt.x - Dt.x) > 7 ||
              Math.abs(mt.z - Dt.z) > 7
            )
              continue;
            let Ht = Nm(mt.x + (mt.sx || 0), mt.z + (mt.sz || 0), Dt);
            if (Ht) {
              ((mt.x += mt.sx || 0), (mt.z += mt.sz || 0), (mt.sx = mt.sz = 0));
              let ft = Q5(mt, Dt, Ht);
              ((mt.st = "knock"),
                (mt.leap = null),
                (st.knocks = (st.knocks || 0) + 1),
                Dt.remote && (st.knocksRemote = (st.knocksRemote || 0) + 1),
                Ea.onBump?.(ft, Dt, mt),
                Dt.player && ms.onKnock?.(mt));
              break;
            }
          }
        if (mt.st === "knock") continue;
      }
      let ie = Math.abs(mt.x - Oe) < 45 && Math.abs(mt.z - Ke) < 45;
      if (mt.st !== "leap" && ie && De > (b ? 1.2 : 2) && !Ea.noDodge) {
        let Dt = b
          ? ot(mt, Oe, Ke, Ds, hs, De * 0.8, 1.35, 2.8)
          : ot(mt, Oe, Ke, Ds, hs, De, 1.45, 3.2);
        Dt && rt(mt, Ds, hs, Dt, De);
      }
      if (b && Xn && mt.st !== "leap" && mt.st !== "knock" && !Ea.noDodge)
        for (let Dt of Xn) {
          if (
            !Dt.remote ||
            Dt.sp < 1.2 ||
            Math.abs(Dt.x - mt.x) > 30 ||
            Math.abs(Dt.z - mt.z) > 30
          )
            continue;
          let Ht = Dt.vx / Dt.sp,
            ft = Dt.vz / Dt.sp,
            zt = ot(mt, Dt.x, Dt.z, Ht, ft, Dt.sp * 0.8, 1.35, 2.8);
          if (zt) {
            rt(mt, Ht, ft, zt, Dt.sp);
            break;
          }
        }
      if (mt.st === "path" && mt.path?.cross && Wn.length)
        for (let Dt of Wn) {
          if (
            Math.abs(Dt.x - mt.x) > 20 ||
            Math.abs(Dt.z - mt.z) > 20 ||
            Dt.v < 1
          )
            continue;
          let Ht = ot(
            mt,
            Dt.x,
            Dt.z,
            Dt.fx,
            Dt.fz,
            Dt.v,
            1.4,
            (Dt.V?.L || 4.6) / 2 + 1,
          );
          if (Ht) {
            rt(mt, Dt.fx, Dt.fz, Ht, Dt.v);
            break;
          }
        }
      if (mt.g && Fe.has(mt.st)) xe(mt, bt);
      else if (mt.st === "walk") {
        let Dt = mt.E;
        mt.s += mt.dir * mt.speed * ut(mt) * bt;
        let Ht = mt.dir > 0 ? _(Dt, mt.side, "b") : _(Dt, mt.side, "a");
        if (
          (S(Dt, mt.s, mt.side, mt.f, w),
          (mt.x = w.x),
          (mt.y = w.y),
          (mt.z = w.z),
          (mt.hx = w.hx * mt.dir),
          (mt.hz = w.hz * mt.dir),
          (mt.nx = y.nx * mt.side),
          (mt.nz = y.nz * mt.side),
          b &&
            ((mt.lag || 0) > 1.2
              ? (mt.stuck += bt)
              : (mt.stuck = Math.max(0, mt.stuck - bt)),
            mt.stuck > 1.5 &&
              ((mt.stuck = 0),
              (mt.dir = -mt.dir),
              ys(Dt, mt.bx ?? mt.x, mt.bz ?? mt.z, M),
              (mt.s = tu(M.s, _(Dt, mt.side, "a"), _(Dt, mt.side, "b"))),
              S(Dt, mt.s, mt.side, mt.f, w),
              (mt.x = w.x),
              (mt.z = w.z),
              (mt.y = w.y),
              (mt.hx = w.hx * mt.dir),
              (mt.hz = w.hz * mt.dir))),
          b && p && (mt.chkT = (mt.chkT || 0) - bt) < 0)
        ) {
          ((mt.chkT = 0.3), S(Dt, mt.s + mt.dir * 1.2, mt.side, mt.f, w));
          let ft = !1;
          if (
            (p(w.x, w.z, mt.y, (zt) => {
              !ft && lc(zt, w.x, w.z, 0.05) && (ft = !0);
            }),
            !ft && Xn)
          ) {
            for (let zt of Xn)
              if (
                zt.sp < 1 &&
                Math.abs(zt.x - w.x) < 6 &&
                Math.abs(zt.z - w.z) < 6 &&
                Nm(w.x, w.z, zt, 0.3 + 0.1)
              ) {
                ft = !0;
                break;
              }
          }
          ft && ((mt.dir = -mt.dir), (mt.hx = -mt.hx), (mt.hz = -mt.hz));
        }
        (mt.s - Ht) * mt.dir >= 0 && X(mt, Yt);
      } else if (mt.st === "stand")
        mt.plaza
          ? ((mt.y = U(mt.plaza, mt.x, mt.z)),
            mt.t > 4 + mt.seeds[0] * 9 && ((mt.t = 0), f() < 0.7 && $(mt)))
          : mt.hot &&
            mt.E &&
            mt.t > (mt.watchT || 10) &&
            ((mt.st = "walk"), (mt.t = 0), (mt.pose = 0));
      else if (mt.st === "wait") {
        let Dt = mt.path.next.leg,
          Ht = !Dt || !s || s.signal(mt.J, Dt.ph, Yt) === 2 || mt.t > 45;
        (Dt && !Dt.ph && s?.call && s.call(mt.J, 1, Yt),
          Ht &&
            (!b ||
              !mt.path.cross ||
              at(mt.path, Xn) ||
              (mt.gapT = (mt.gapT || 0) + bt) > 20) &&
            ((mt.st = "path"), (mt.t = 0), (mt.gapT = 0)));
      } else if (mt.st === "path") {
        let Dt = mt.path;
        Dt.u +=
          (mt.speed * (Dt.cross ? 1.1 : 1) * ut(mt) * bt) /
          Math.max(0.3, Dt.len);
        let Ht = Math.min(1, Dt.u);
        if (
          ((mt.x = Dt.x0 + (Dt.x1 - Dt.x0) * Ht),
          (mt.z = Dt.z0 + (Dt.z1 - Dt.z0) * Ht),
          (mt.y =
            Dt.y0 +
            (Dt.y1 - Dt.y0) * Ht -
            (Dt.cross ? eN * Math.min(1, Ht / 0.12, (1 - Ht) / 0.12) : 0)),
          Dt.plaza)
        )
          ((mt.y = U(mt.plaza, mt.x, mt.z)),
            Ht >= 1 &&
              (f() < 0.25
                ? ((mt.st = "stand"), (mt.t = 0), (mt.path = null))
                : $(mt)));
        else if (Ht >= 1) {
          let ft = Dt.next;
          ((mt.E = ft.G),
            (mt.side = ft.side),
            (mt.dir = ft.gdir),
            (mt.s = ft.s0),
            (mt.st = "walk"),
            (mt.path = null));
        }
      } else if (mt.st === "leap") {
        let Dt = mt.leap;
        Dt.t += bt;
        let Ht = Math.min(1, Dt.t / Dt.dur),
          ft = 1 - Ht * 0.5;
        ((mt.x += Dt.vx * ft * bt),
          (mt.z += Dt.vz * ft * bt),
          (mt.y =
            t.driveHeight(mt.x, mt.z, null, Dt.y0 + 0.5) +
            Math.sin(Math.PI * Ht) * Dt.hop),
          (Dt.y0 = mt.y - Math.sin(Math.PI * Ht) * Dt.hop),
          Ht >= 1 && ((mt.st = "recover"), (mt.t = 0), (mt.leap = null)));
      } else if (
        mt.st === "recover" &&
        ((mt.y = t.driveHeight(mt.x, mt.z, null, mt.y + 0.5)),
        mt.t > (b ? 0.5 : 0.9))
      )
        if (mt.g) ((mt.st = mt.g.st), xe(mt, 0));
        else if (mt.spot || mt.plaza)
          ((mt.st = "stand"), mt.plaza && (mt.y = U(mt.plaza, mt.x, mt.z)));
        else {
          ys(mt.E, mt.x, mt.z, M);
          let Dt = tu(M.s, _(mt.E, mt.side, "a"), _(mt.E, mt.side, "b"));
          S(mt.E, Dt, mt.side, mt.f, w);
          let Ht = Math.hypot(w.x - mt.x, w.z - mt.z);
          if (Ht > 25) {
            mt.x = 1e9;
            continue;
          }
          ((mt.path = {
            x0: mt.x,
            z0: mt.z,
            y0: mt.y,
            x1: w.x,
            z1: w.z,
            y1: w.y,
            len: Ht,
            u: 0,
            cross: !1,
            next: { G: mt.E, side: mt.side, gdir: mt.dir, s0: Dt },
          }),
            (mt.st = "path"));
          let ft = Ht || 1;
          ((mt.hx = (w.x - mt.x) / ft), (mt.hz = (w.z - mt.z) / ft));
        }
      if (ie && !b) {
        let Dt = mt.x - Oe,
          Ht = mt.z - Ke,
          ft = Dt * nn + Ht * dn,
          zt = Dt * dn - Ht * nn;
        if (Math.abs(ft) < 2.6 && Math.abs(zt) < 1.25) {
          let kt = zt >= 0 ? 1 : -1,
            Ft = 1.25 - Math.abs(zt);
          ((mt.x += dn * kt * Ft),
            (mt.z -= nn * kt * Ft),
            mt.st !== "leap" && rt(mt, nn, dn, kt, Math.max(De, 3)));
        }
      }
    }
    b &&
      m.step(ms.extern.length ? z.concat(ms.extern) : z, bt, Xn, {
        skip: (mt) => mt.st === "knock",
        fixed: (mt) => mt.sid !== void 0 && mt.st === "stand",
        vmax: (mt) => (mt.st === "leap" ? 3.4 : Math.max(1.5, mt.speed * 1.35)),
        gain: (mt) => (mt.st === "leap" ? 12 : 3),
        clamp: it,
        half: (mt) =>
          mt.st !== "leap" &&
          Math.abs(mt.x - ee.position.x) + Math.abs(mt.z - ee.position.z) > 70,
      });
    let An = b ? Xn.filter((mt) => mt.sp >= 0.3) : null;
    if (b && An.length)
      for (let mt of z) {
        if (mt.st === "knock") continue;
        let ie = mt.x + (mt.sx || 0),
          Dt = mt.z + (mt.sz || 0);
        for (let Ht of An) {
          if (Ht.sp < 0.3 || Math.abs(Ht.x - ie) > 6 || Math.abs(Ht.z - Dt) > 6)
            continue;
          let ft = Nm(ie, Dt, Ht, 0.3 - 0.04);
          if (!ft && p && (ft = Nm(ie, Dt, Ht, 0.3 + 0.15))) {
            let zt = 0;
            (p(ie, Dt, mt.y, (kt) => {
              let Ft = lc(kt, ie, Dt, 0.3);
              Ft && (zt = Math.max(zt, Math.hypot(Ft[0], Ft[1])));
            }),
              zt < 0.04 && (ft = null));
          }
          if (ft) {
            ((mt.x = ie),
              (mt.z = Dt),
              (mt.sx = mt.sz = 0),
              Q5(mt, Ht, ft),
              (mt.st = "knock"),
              (mt.leap = null),
              (st.knocks = (st.knocks || 0) + 1),
              (st.pinned = (st.pinned || 0) + 1));
            break;
          }
        }
      }
    if (
      (q.multiplyMatrices(ee.projectionMatrix, ee.matrixWorldInverse),
      Z.setFromProjectionMatrix(q),
      b)
    ) {
      b.begin(bt);
      let mt = ee.position.x,
        ie = ee.position.z;
      for (let Dt of z) {
        let Ht = Dt.x + (Dt.sx || 0),
          ft = Dt.z + (Dt.sz || 0),
          zt = Math.hypot(Ht - mt, ft - ie);
        if (
          zt > ait ||
          (j.center.set(Ht, Dt.y + 0.9, ft), !Z.intersectsSphere(j))
        )
          continue;
        let kt = Dt.y;
        if (
          Dt.st !== "leap" &&
          Dt.st !== "knock" &&
          !Dt.plaza &&
          !(Dt.st === "path" && Dt.path?.cross)
        ) {
          let ke = zp(Ht, ft);
          ke !== null && Math.abs(ke - Dt.y) < 0.45 && (kt = ke);
        }
        let Ft = Dt.st === "walk" || Dt.st === "path",
          qt = Dt.st === "leap",
          Et = Dt.kb,
          Me = Et ? 0 : Dt.vs || 0,
          de = Ft || qt ? Me > 0.08 : Me > 0.35,
          ze = de && Me > 0.25 && Dt.vhx !== void 0 ? Dt.vhx : Dt.hx,
          Wt = de && Me > 0.25 && Dt.vhx !== void 0 ? Dt.vhz : Dt.hz;
        b.put(Dt, Ht, kt, ft, ze, Wt, zt, {
          speed: de ? Math.min(Me, 2.2) * (Dt.mad > 0 ? 1.15 : 1) : 0,
          pose: Et
            ? Rn.knock
            : qt
              ? Rn.leap
              : Dt.st === "recover" || (Ft && Dt.pose !== 2)
                ? 0
                : Dt.pose,
          k: Et ? -Et.ang : qt ? Dt.leap.t / Dt.leap.dur : 0,
          rnd: f,
          look: Et ? li.dizzy : Dt.mad > 0 ? li.angry : null,
          snap: !!Et,
        });
      }
      (b.end(),
        (st.n = z.length),
        (st.drawn = b.drawn),
        (st.target = T),
        (st.ms = performance.now() - Xe));
      return;
    }
    let ii = v.map(() => [0, 0]),
      Mt = ee.position.x,
      Xt = ee.position.z,
      xt = [1e9, 1e9, 1e9],
      wt = [-1e9, -1e9, -1e9],
      _t = 0;
    for (let mt of z) {
      let ie = Math.hypot(mt.x - Mt, mt.z - Xt);
      if (
        ie > ait ||
        (j.center.set(mt.x, mt.y + 0.9, mt.z), !Z.intersectsSphere(j))
      )
        continue;
      let Dt = ie < q6t ? 0 : 1,
        Ht = v[mt.B][Dt],
        ft = ii[mt.B][Dt]++,
        zt = Ht.instanceMatrix.array,
        kt = Ht.instanceColor.array,
        Ft = mt.sc,
        qt = Ft * mt.sw,
        Et = mt.hx,
        Me = mt.hz,
        de = mt.st === "walk" || mt.st === "path",
        ze = ft * 16;
      ((zt[ze] = Me * qt),
        (zt[ze + 1] = 0),
        (zt[ze + 2] = -Et * qt),
        (zt[ze + 3] = mt.st === "leap" ? mt.leap.t / mt.leap.dur : mt.ph0),
        (zt[ze + 4] = 0),
        (zt[ze + 5] = Ft),
        (zt[ze + 6] = 0),
        (zt[ze + 7] = de ? mt.cad * (mt.path?.cross ? 1.1 : 1) : 0),
        (zt[ze + 8] = Et * qt),
        (zt[ze + 9] = 0),
        (zt[ze + 10] = Me * qt),
        (zt[ze + 11] = mt.st === "leap" ? 1 : mt.pose),
        (zt[ze + 12] = mt.x),
        (zt[ze + 13] = mt.y),
        (zt[ze + 14] = mt.z),
        (zt[ze + 15] = 1),
        (kt[ft * 3] = mt.seeds[0]),
        (kt[ft * 3 + 1] = mt.seeds[1]),
        (kt[ft * 3 + 2] = mt.seeds[2]),
        (xt[0] = Math.min(xt[0], mt.x)),
        (xt[1] = Math.min(xt[1], mt.y)),
        (xt[2] = Math.min(xt[2], mt.z)),
        (wt[0] = Math.max(wt[0], mt.x)),
        (wt[1] = Math.max(wt[1], mt.y)),
        (wt[2] = Math.max(wt[2], mt.z)),
        _t++);
    }
    let ae = (xt[0] + wt[0]) / 2,
      se = (xt[1] + wt[1]) / 2 + 0.9,
      Jt = (xt[2] + wt[2]) / 2,
      _e = Math.hypot(wt[0] - xt[0], wt[1] - xt[1], wt[2] - xt[2]) / 2 + 2;
    (v.forEach((mt, ie) =>
      mt.forEach((Dt, Ht) => {
        let ft = ii[ie][Ht];
        ((Dt.count = ft),
          (Dt.visible = ft > 0),
          ft &&
            ((Dt.instanceMatrix.needsUpdate = !0),
            (Dt.instanceColor.needsUpdate = !0),
            Dt.boundingSphere.center.set(ae, se, Jt),
            (Dt.boundingSphere.radius = _e)));
      }),
    ),
      (st.n = z.length),
      (st.drawn = _t),
      (st.target = T));
  }
  let ms = {
    group: d,
    update: He,
    peds: z,
    stats: st,
    meshes: v,
    plazas: a,
    hotspots: r,
    knockFrom: pt,
    sync: null,
    onKnock: null,
    nav: m,
    extern: [],
    setWorld: (bt) => {
      p = bt ? tw(bt) : null;
    },
  };
  return ms;
}
