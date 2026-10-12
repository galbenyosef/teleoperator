// app 369 — math
// Lines 183603-185213 of readable/app.pretty.js (statement-aligned).
function Ktt(
  i,
  t,
  {
    max: e = 150,
    roads: s = null,
    inst: n = [],
    seed: o = 7,
    plazas: a = [],
    hotspots: r = [],
    map: l = null,
    world: c = null,
  } = {},
) {
  let h = o,
    f = () => (h = (h * 16807) % 2147483647) / 2147483647,
    u = new Ee({ color: 16777215, roughness: 0.8, metalness: 0, map: l });
  ((u.userData.mbAlbedo = Fd),
    (u.userData.mbWind = -1),
    (u.userData.mbSkyVis = 2),
    (u.name = "pedestrians"));
  let d = new ke();
  d.name = "Pedestrians";
  let p = c ? oy(c) : null,
    m = new Od({ statics: (gt, se, Nt, xe, ce) => p && p(gt, se, Nt, xe, ce) }),
    g = (gt, se, Nt, xe = null, ce = !0) => {
      let Ge = !0;
      if (
        (p &&
          p(gt, se, Nt, (Fe) => {
            Ge && Ul(Fe, gt, se, 0.3 + 0.05) && (Ge = !1);
          }),
        !Ge)
      )
        return !1;
      if (ce)
        for (let Fe of _) {
          if (Fe === xe) continue;
          let $e = Fe.bx ?? Fe.x,
            Ds = Fe.bz ?? Fe.z;
          if (
            Math.abs($e - gt) < 0.7 &&
            Math.abs(Ds - se) < 0.7 &&
            Math.hypot($e - gt, Ds - se) < 2 * 0.3 + 0.08
          )
            return !1;
        }
      return !0;
    },
    b = Or() ? new R0("PedestriansVox", e) : null;
  b && d.add(b.group);
  let x = b
      ? []
      : Br.map((gt, se) =>
          [0, 1].map((Nt) => {
            let xe = new zn(Id(gt, Nt), u, e);
            return (
              (xe.count = 0),
              (xe.frustumCulled = !1),
              (xe.castShadow = Nt === 0),
              (xe.receiveShadow = !0),
              (xe.name = `peds${se}_lod${Nt}`),
              (xe.userData.mbMover = !0),
              (xe.matrixAutoUpdate = !1),
              xe.setColorAt(0, new $t(1, 1, 1)),
              (xe.boundingSphere = new _n(new xt(), 1)),
              d.add(xe),
              xe
            );
          }),
        ),
    v = new Map(),
    y = {},
    M = {};
  function S(gt, se, Nt, xe, ce) {
    Ot(gt, yf(se, 0, gt.L), y);
    let Ge = Nt * (y.w + gt.sw * xe);
    return (
      (ce.x = y.x + y.nx * Ge),
      (ce.z = y.z + y.nz * Ge),
      (ce.y = y.y + QF),
      (ce.hx = y.dx),
      (ce.hz = y.dz),
      ce
    );
  }
  let w = {};
  function z(gt, se, Nt) {
    let xe = gt.sid * 4 + (se > 0 ? 1 : 0) + (Nt === "b" ? 2 : 0),
      ce = v.get(xe);
    if (ce !== void 0) return ce;
    let Ge = Nt === "b" ? -1 : 1,
      Fe = Nt === "b" ? gt.L : 0;
    ce = Nt === "b" ? gt.s1 : gt.s0;
    for (let $e = 0; $e < 60; $e++, Fe += Ge * 0.5)
      if ((S(gt, Fe, se, 0.55, w), t.surfaceAt(w.x, w.z) === "walk")) {
        ce = Fe + Ge * 0.3;
        break;
      }
    return (v.set(xe, ce), ce);
  }
  let _ = [],
    R = [],
    T = 0,
    E = [],
    A = 64,
    C = new Map(),
    P = (gt, se) => gt * 65536 + se;
  for (let gt of n)
    if (
      gt.kind === "shelter" ||
      gt.kind === "cafe0" ||
      gt.kind === "cafe1" ||
      gt.kind === "bench"
    ) {
      E.push(gt);
      let se = P(Math.floor(gt.x / A), Math.floor(gt.z / A)),
        Nt = C.get(se);
      (Nt || C.set(se, (Nt = [])), Nt.push(gt));
    }
  let I = new Set(),
    L = 0,
    F = 0;
  function N() {
    let gt = Math.floor(f() * Br.length),
      se = 0.9 + f() * 0.17 - (Br[gt].f ? 0.05 : 0),
      Nt = 1.05 + f() * 0.55;
    return {
      B: gt,
      sc: se,
      sw: 0.94 + f() * 0.14,
      seeds: [f(), f(), f()],
      speed: Nt,
      ph0: f() * 6.283,
      cad: (2 * Math.PI * Nt) / (1.37 * se),
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
  function B(gt, se, Nt, xe, ce) {
    ((gt.E = se),
      (gt.s = Nt),
      (gt.side = xe),
      (gt.dir = ce),
      (gt.f = 0.3 + f() * 0.45),
      (gt.st = "walk"),
      (gt.kb = null),
      (gt.mad = 0),
      (gt.sx = gt.sz = 0),
      (gt.path = null),
      (gt.J = null),
      (gt.plaza = null),
      (gt.spot = null),
      (gt.hot = null),
      (gt.bx = void 0),
      (gt.gen = (gt.gen || 0) + 1),
      (gt.lag = 0),
      (gt.vs = 0),
      (gt.stuck = 0),
      (gt.gapT = 0),
      (gt.g = null),
      (gt.gid = void 0),
      S(se, Nt, xe, gt.f, w),
      (gt.x = w.x),
      (gt.y = w.y),
      (gt.z = w.z),
      (gt.hx = w.hx * ce),
      (gt.hz = w.hz * ce),
      (gt.nx = y.nx * xe),
      (gt.nz = y.nz * xe));
  }
  function H(gt, se, Nt, xe = !1) {
    let ce = t.roadAt(gt, se, 25);
    if (!ce || !lE(ce.E)) return null;
    let Ge = ce.E,
      Fe =
        (rE[Ai(gt, se)] ?? 0.5) *
        (ep.has(Ge.name)
          ? 1.5
          : Ge.cls === "residential" || Ge.cls === "service"
            ? 0.7
            : 1);
    if (f() > Fe / Nt) return null;
    let $e = f() < 0.5 ? 1 : -1,
      Ds = f() < 0.5 ? 1 : -1,
      Es = z(Ge, $e, "a"),
      Ls = z(Ge, $e, "b");
    if (Ls - Es < 4) return null;
    let Os = yf(ce.s, Es + 1, Ls - 1);
    if ((S(Ge, Os, $e, 0.55, w), t.surfaceAt(w.x, w.z) !== "walk")) return null;
    let hs = R.pop() || N();
    return (
      B(hs, Ge, Os, $e, Ds),
      b && !g(hs.x, hs.z, hs.y, null, !xe) ? (R.push(hs), null) : hs
    );
  }
  function O(gt, se = !1) {
    let Nt = R.pop() || N(),
      xe = gt.kind === "shelter",
      ce = gt.rot,
      Ge = Math.sin(ce),
      Fe = Math.cos(ce);
    se && Object.assign(Nt, N());
    let $e = f(),
      Ds = Math.cos(ce),
      Es = -Math.sin(ce),
      Ls,
      Os,
      hs,
      Zs;
    if (xe) {
      let Is = ($e - 0.5) * 2.6;
      ((Ls = gt.x + Ds * Is + Ge * 0.3), (Os = gt.z + Es * Is + Fe * 0.3));
      let ns = f() < 0.5 ? 1 : -1;
      ((hs = Ge * 0.6 + Ds * ns * 0.8), (Zs = Fe * 0.6 + Es * ns * 0.8));
    } else {
      let Is = $e * Math.PI * 2;
      ((Ls = gt.x + Math.cos(Is) * 0.75),
        (Os = gt.z + Math.sin(Is) * 0.75),
        (hs = gt.x - Ls),
        (Zs = gt.z - Os));
    }
    let We = Math.hypot(hs, Zs) || 1;
    return (
      Object.assign(Nt, {
        st: "stand",
        g: null,
        gid: void 0,
        kb: null,
        mad: 0,
        sx: 0,
        sz: 0,
        bx: void 0,
        gen: (Nt.gen || 0) + 1,
        lag: 0,
        vs: 0,
        E: null,
        path: null,
        J: null,
        spot: gt,
        plaza: null,
        x: Ls,
        z: Os,
        y: gt.y,
        hx: hs / We,
        hz: Zs / We,
        t: 0,
      }),
      b && !g(Ls, Os, gt.y, null, !se)
        ? (R.push(Nt), null)
        : ((Nt.pose = b ? Bd(f) : f() < 0.3 ? 2 : 0), Nt)
    );
  }
  for (let gt of a) gt.grid = null;
  function D(gt) {
    let se = gt.mesh;
    se.updateMatrixWorld(!0);
    let Nt = se.geometry,
      xe = Nt.attributes.position,
      ce = Nt.index,
      Ge = se.matrixWorld,
      Fe = new xt(),
      $e = [],
      Ds = Math.ceil(gt.x1 - gt.x0),
      Es = Math.ceil(gt.z1 - gt.z0),
      Ls = new Float32Array(Ds * Es).fill(1e9),
      Os = ce ? ce.count : xe.count,
      hs = (Zs) =>
        Fe.fromBufferAttribute(xe, ce ? ce.getX(Zs) : Zs)
          .applyMatrix4(Ge)
          .toArray();
    for (let Zs = 0; Zs < Os; Zs += 3) {
      let We = hs(Zs),
        Is = hs(Zs + 1),
        ns = hs(Zs + 2),
        rn = Is[0] - We[0],
        dn = Is[1] - We[1],
        Hn = Is[2] - We[2],
        Dn = ns[0] - We[0],
        Un = ns[1] - We[1],
        Xs = ns[2] - We[2],
        _i = Hn * Dn - rn * Xs,
        Mt = Math.hypot(dn * Xs - Hn * Un, _i, rn * Un - dn * Dn);
      if (Mt < 1e-9 || Math.abs(_i) / Mt < 0.85) continue;
      let Kt = Math.max(0, Math.floor(Math.min(We[0], Is[0], ns[0]) - gt.x0)),
        bt = Math.min(
          Ds - 1,
          Math.floor(Math.max(We[0], Is[0], ns[0]) - gt.x0),
        ),
        wt = Math.max(0, Math.floor(Math.min(We[2], Is[2], ns[2]) - gt.z0)),
        _t = Math.min(
          Es - 1,
          Math.floor(Math.max(We[2], Is[2], ns[2]) - gt.z0),
        ),
        ie =
          (Is[2] - ns[2]) * (We[0] - ns[0]) + (ns[0] - Is[0]) * (We[2] - ns[2]);
      for (let te = Kt; te <= bt; te++)
        for (let Qt = wt; Qt <= _t; Qt++) {
          let ge = gt.x0 + te + 0.5,
            pt = gt.z0 + Qt + 0.5,
            le =
              ((Is[2] - ns[2]) * (ge - ns[0]) +
                (ns[0] - Is[0]) * (pt - ns[2])) /
              ie,
            Ut =
              ((ns[2] - We[2]) * (ge - ns[0]) +
                (We[0] - ns[0]) * (pt - ns[2])) /
              ie;
          if (le < -0.02 || Ut < -0.02 || le + Ut > 1.02) continue;
          let zt = le * We[1] + Ut * Is[1] + (1 - le - Ut) * ns[1],
            ft = Qt * Ds + te;
          zt < Ls[ft] && (Ls[ft] = zt);
        }
    }
    gt.grid = { H: Ls, nx: Ds, nz: Es };
  }
  let U = (gt, se, Nt) => {
      let xe = gt.grid,
        ce = yf(Math.floor(se - gt.x0), 0, xe.nx - 1),
        Ge = yf(Math.floor(Nt - gt.z0), 0, xe.nz - 1);
      return xe.H[Ge * xe.nx + ce];
    },
    G = (gt, se, Nt) => [gt.cx + se * 7.5, gt.cz + Nt * 7.5],
    q = (gt, se, Nt) => {
      let [xe, ce] = G(gt, se, Nt);
      return (
        xe > gt.x0 + 11 &&
        xe < gt.x1 - 11 &&
        ce > gt.z0 + 11 &&
        ce < gt.z1 - 11 &&
        Math.hypot(xe - gt.cx, ce - gt.cz) > 10 &&
        U(gt, xe, ce) < 1e8
      );
    };
  function W(gt, se, Nt, xe, ce) {
    let Ge = Math.hypot(xe - se, ce - Nt),
      Fe = U(gt, se, Nt),
      $e = U(gt, xe, ce);
    for (let Ds = 0; Ds <= Ge; Ds += 1) {
      let Es = Ds / Ge,
        Ls = U(gt, se + (xe - se) * Es, Nt + (ce - Nt) * Es);
      if (Math.abs(Ls - (Fe + ($e - Fe) * Es)) > 0.2) return !1;
    }
    return !0;
  }
  function V(gt) {
    let se = gt.plaza,
      Nt = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]
        .map(([xe, ce]) => [gt.li + xe, gt.lj + ce])
        .filter(([xe, ce]) => q(se, xe, ce));
    for (let xe = Nt.length - 1; xe > 0; xe--) {
      let ce = Math.floor(f() * (xe + 1));
      [Nt[xe], Nt[ce]] = [Nt[ce], Nt[xe]];
    }
    for (let [xe, ce] of Nt) {
      let [Ge, Fe] = G(se, xe, ce);
      if (!W(se, gt.x, gt.z, Ge, Fe)) continue;
      let $e = Math.hypot(Ge - gt.x, Fe - gt.z);
      ((gt.path = {
        x0: gt.x,
        z0: gt.z,
        y0: gt.y,
        x1: Ge,
        z1: Fe,
        y1: U(se, Ge, Fe),
        len: $e,
        u: 0,
        cross: !1,
        plaza: !0,
      }),
        (gt.li = xe),
        (gt.lj = ce),
        (gt.hx = (Ge - gt.x) / $e),
        (gt.hz = (Fe - gt.z) / $e),
        (gt.st = "path"));
      return;
    }
    ((gt.st = "stand"), (gt.t = 0));
  }
  function Y(gt, se) {
    let Nt = Math.round(((f() - 0.5) * 2 * (gt.x1 - gt.x0)) / 15),
      xe = Math.round(((f() - 0.5) * 2 * (gt.z1 - gt.z0)) / 15);
    if (!q(gt, Nt, xe)) return null;
    let ce = R.pop() || N(),
      [Ge, Fe] = G(gt, Nt, xe),
      $e = f() * Math.PI * 2;
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
        plaza: gt,
        li: Nt,
        lj: xe,
        x: Ge + (f() - 0.5) * 2,
        z: Fe + (f() - 0.5) * 2,
        hx: Math.cos($e),
        hz: Math.sin($e),
        t: f() * 4,
      }),
      (ce.y = U(gt, ce.x, ce.z)),
      ce.y > 1e8 || (b && !g(ce.x, ce.z, ce.y))
        ? (R.push(ce), null)
        : ((ce.pose = b ? Bd(f) : f() < 0.25 ? 2 : 0), ce)
    );
  }
  function $(gt, se) {
    let Nt = gt.E,
      xe = gt.dir > 0 ? "b" : "a",
      ce = i.juns[gt.dir > 0 ? Nt.jb : Nt.ja],
      Ge = gt.x,
      Fe = gt.z,
      $e = gt.hx,
      Ds = gt.hz,
      Es = [];
    if (ce) {
      for (let [We, Is] of ce.legs)
        if (lE(We))
          for (let ns of [1, -1]) {
            if (We === Nt && ns === gt.side) continue;
            let rn = z(We, ns, Is),
              dn = S(We, rn, ns, gt.f, {}),
              Hn = Math.hypot(dn.x - Ge, dn.z - Fe);
            if (Hn > 38) continue;
            let Dn = (dn.x - Ge) / (Hn || 1),
              Un = (dn.z - Fe) / (Hn || 1),
              Xs = Is === "a" ? 1 : -1,
              _i = Hn > 4.8,
              Mt = Ot(We, yf(rn + Xs * 3, 0, We.L), {}),
              Kt = Mt.dx * Xs,
              bt = Mt.dz * Xs,
              wt = Kt * $e + bt * Ds,
              _t = _i ? (wt > 0.7 ? 1.4 : 0.35) : wt > 0.7 ? 1.2 : 0.9;
            (We === Nt && (_t = 0.25),
              Es.push({
                G: We,
                side: ns,
                gdir: Xs,
                s0: rn,
                X: dn,
                d: Hn,
                cross: _i,
                w: _t,
                dx: Dn,
                dz: Un,
              }));
          }
    }
    if (!Es.length) {
      ((gt.dir = -gt.dir), (gt.hx = -gt.hx), (gt.hz = -gt.hz));
      return;
    }
    let Ls = 0;
    for (let We of Es) Ls += We.w;
    let Os = f() * Ls,
      hs = Es[0];
    for (let We of Es)
      if ((Os -= We.w) <= 0) {
        hs = We;
        break;
      }
    let Zs = !1;
    if (hs.cross && ce && ce.ctl === 2 && s && ce.tl) {
      let We = (Ge + hs.X.x) / 2,
        Is = (Fe + hs.X.z) / 2,
        ns = null,
        rn = 1e9;
      for (let dn of ce.tl)
        (vs(dn.E, We, Is, M), M.d < rn && ((rn = M.d), (ns = dn)));
      (ns && (hs.leg = ns), (Zs = !!ns));
    }
    ((gt.path = {
      x0: Ge,
      z0: Fe,
      y0: gt.y,
      x1: hs.X.x,
      z1: hs.X.z,
      y1: hs.X.y,
      len: hs.d,
      u: 0,
      cross: hs.cross,
      next: hs,
    }),
      (gt.hx = hs.dx),
      (gt.hz = hs.dz),
      (gt.st = Zs || (b && hs.cross) ? "wait" : "path"),
      (gt.J = ce),
      (gt.t = 0),
      (gt.gapT = 0));
  }
  let st = new Float32Array(16),
    Q = new No(),
    j = new ye(),
    X = new _n(new xt(), 1.1),
    K = 0,
    nt = null,
    Z = 0,
    et = 0,
    tt = { n: 0, drawn: 0, leaps: 0 };
  function it(gt, se, Nt, xe, ce, Ge, Fe, $e) {
    let Ds = gt.x + (gt.sx || 0) - se,
      Es = gt.z + (gt.sz || 0) - Nt,
      Ls = Ds * xe + Es * ce,
      Os = Ds * ce - Es * xe;
    return Ls > -2.6 && Ls < $e + Ge * 1.1 && Math.abs(Os) < Fe
      ? Os >= 0
        ? 1
        : -1
      : 0;
  }
  function rt(gt, se, Nt, xe, ce) {
    b && ((gt.x += gt.sx || 0), (gt.z += gt.sz || 0), (gt.sx = gt.sz = 0));
    let Ge = Nt * xe,
      Fe = -se * xe,
      $e = Math.min(ce * 0.2, 3),
      Ds = Ge * (4.6 + ce * 0.06) + se * $e,
      Es = Fe * (4.6 + ce * 0.06) + Nt * $e,
      Ls = Math.hypot(Ds, Es) || 1;
    ((gt.leap = b
      ? { vx: Ds * 0.5, vz: Es * 0.5, t: 0, dur: 0.6, y0: gt.y, hop: 0.05 }
      : { vx: Ds, vz: Es, t: 0, dur: 0.55, y0: gt.y, hop: 0.45 }),
      (gt.st = "leap"),
      (gt.hx = Ds / Ls),
      (gt.hz = Es / Ls),
      tt.leaps++);
  }
  let lt = (...gt) => {
    let se = 2166136261;
    for (let Nt of gt)
      ((se ^= (Nt | 0) + 2654435769),
        (se = Math.imul(se ^ (se >>> 15), 2246822519)),
        (se ^= se >>> 13));
    return ((se >>> 0) % 2147483646) + 1;
  };
  function ct(gt, se, Nt, xe) {
    let ce = gt.slots || (gt.slots = []),
      Ge = xe.now() / 1e3;
    for (let Fe = 0; Fe < Nt; Fe++) {
      let $e = lt(xe.seed, se, Fe),
        Ds = 25 + ($e % 2e3) / 100,
        Es = (($e % 997) / 997) * Ds,
        Ls = Math.floor((Ge + Es) / Ds),
        Os = se * 1e6 + Fe * 1e4 + (Ls % 1e4),
        hs = ce[Fe];
      if (hs && hs.sid === Os && _.includes(hs)) continue;
      if (hs && hs.sid !== void 0 && _.includes(hs)) {
        if (hs.kb) continue;
        ((hs.sid = void 0),
          hs.E && ((hs.st = "walk"), (hs.t = 0), (hs.pose = 0)));
      }
      let Zs = h;
      ((h = lt(xe.seed, se, Fe, Ls)), R.push(N()));
      let We = null;
      for (let Is = 0; Is < 6 && !We; Is++) {
        let ns = f() * Math.PI * 2,
          rn = Math.sqrt(f()) * gt.r;
        ((We = H(gt.x + Math.cos(ns) * rn, gt.z + Math.sin(ns) * rn, 0.2, !0)),
          We &&
            ce.some(
              (dn) =>
                dn &&
                dn !== We &&
                dn.sid !== void 0 &&
                Math.hypot(dn.x - We.x, dn.z - We.z) < 2 * 0.3 + 0.15,
            ) &&
            (R.push(We), (We = null)));
      }
      if (We) {
        let Is = gt.x - We.x,
          ns = gt.z - We.z,
          rn = Math.hypot(Is, ns) || 1;
        ((We.hot = gt),
          (We.sid = Os),
          (We.st = "stand"),
          (We.hx = Is / rn),
          (We.hz = ns / rn),
          (We.t = 0),
          (We.watchT = 1e9),
          (We.pose = b
            ? f() < 0.3
              ? kn.photo
              : f() < 0.25
                ? kn.point
                : Bd(f)
            : f() < 0.3
              ? 2
              : 0),
          _.push(We),
          (ce[Fe] = We));
      } else (R.pop(), (ce[Fe] = null));
      h = Zs;
    }
  }
  function dt(gt) {
    let se = null,
      Nt = 2.5;
    for (let xe of _) {
      if (xe.st === "knock" || xe.kb) continue;
      if (gt.id && (xe.sid === gt.id || xe.gid === gt.id)) {
        se = xe;
        break;
      }
      let ce = Math.hypot(xe.x - gt.x, xe.z - gt.z);
      ce < Nt && ((Nt = ce), (se = xe));
    }
    return se
      ? ((se.x += se.sx || 0),
        (se.z += se.sz || 0),
        (se.sx = se.sz = 0),
        (se.kb = {
          vx: gt.vx,
          vz: gt.vz,
          vy: gt.vy,
          ang: 0,
          w: gt.w,
          ph: "air",
          t: 0,
          n: 0,
          rest: 1.6,
          y: se.y,
          y0: se.y,
          x0: se.x,
          z0: se.z,
        }),
        (se.hx = -gt.vx / (Math.hypot(gt.vx, gt.vz) || 1)),
        (se.hz = -gt.vz / (Math.hypot(gt.vx, gt.vz) || 1)),
        (se.st = "knock"),
        (se.leap = null),
        (tt.knocksIn = (tt.knocksIn || 0) + 1),
        !0)
      : !1;
  }
  let ut = (gt) => (b ? yf(1.6 - (gt.lag || 0) * 0.9, 0.12, 1) : 1);
  function ot(gt, se, Nt) {
    if (
      !gt.E ||
      gt.plaza ||
      gt.spot ||
      gt.nx === void 0 ||
      !(gt.st === "walk" || gt.st === "wait" || gt.st === "stand")
    )
      return null;
    let xe = gt.E.sw,
      ce = (se - gt.x) * gt.nx + (Nt - gt.z) * gt.nz,
      Ge = gt.f + ce / xe,
      Fe = 1 - (0.3 + 0.06) / xe;
    if (Ge <= Fe) return null;
    let $e = (Ge - Fe) * xe;
    return [se - gt.nx * $e, Nt - gt.nz * $e];
  }
  function at(gt, se) {
    let Nt = gt.x1 - gt.x0,
      xe = gt.z1 - gt.z0;
    for (let ce of se || []) {
      if (Math.abs(ce.x - gt.x0) > 70 || Math.abs(ce.z - gt.z0) > 70) continue;
      if (vS(ce, gt.x0, gt.z0, gt.x1, gt.z1, 0.5)) return !1;
      if (ce.sp < 1) continue;
      let Ge = ce.vx / ce.sp,
        Fe = ce.vz / ce.sp,
        $e = Ge * xe - Fe * Nt;
      if (Math.abs($e) < 1e-6) continue;
      let Ds = gt.x0 - ce.x,
        Es = gt.z0 - ce.z,
        Ls = (Ds * xe - Es * Nt) / $e,
        Os = (Ds * Fe - Es * Ge) / $e;
      if (Os > -0.25 && Os < 1.25 && Ls > -ce.hl - 1 && Ls < ce.sp * 4 + ce.hl)
        return !1;
    }
    return !0;
  }
  let yt = 120,
    vt = 0.2,
    Pt = 34,
    jt = Jm + 170,
    Wt = 128,
    Ct = new Map(),
    qt = null,
    Zt = -1,
    he = 0,
    ee = {},
    Xt = (gt) => (gt.rs = (gt.rs * 16807) % 2147483647) / 2147483647;
  function me() {
    qt = new Map();
    for (let gt of i.edges) {
      if (!lE(gt)) continue;
      Ot(gt, gt.L / 2, ee);
      let se = Math.floor(ee.x / Wt) * 65536 + Math.floor(ee.z / Wt),
        Nt = qt.get(se);
      (Nt || qt.set(se, (Nt = [])), Nt.push(gt));
    }
  }
  function re(gt) {
    if (gt.st === "path") {
      let se = gt.path,
        Nt = Math.min(1, se.u);
      ((gt.x = se.x0 + (se.x1 - se.x0) * Nt),
        (gt.z = se.z0 + (se.z1 - se.z0) * Nt),
        (gt.y =
          se.y0 +
          (se.y1 - se.y0) * Nt -
          (se.cross ? QF * Math.min(1, Nt / 0.12, (1 - Nt) / 0.12) : 0)),
        (gt.hx = se.dx),
        (gt.hz = se.dz));
      return;
    }
    (S(gt.E, gt.s, gt.side, gt.f, ee),
      (gt.x = ee.x),
      (gt.y = ee.y),
      (gt.z = ee.z),
      (gt.hx = ee.hx * gt.dir),
      (gt.hz = ee.hz * gt.dir),
      (gt.nx = y.nx * gt.side),
      (gt.nz = y.nz * gt.side));
  }
  function os(gt, se, Nt, xe, ce) {
    let Ge = z(gt, se, "a"),
      Fe = z(gt, se, "b");
    if (Fe - Ge < 4) return null;
    let $e = {
      key: gt.sid * 1e3 + (se > 0 ? 500 : 0) + Nt,
      gid: -((gt.sid * 1e3 + (se > 0 ? 500 : 0) + Nt) * 1e3 + (xe % 1e3) + 1),
      E: gt,
      side: se,
      j: Nt,
      e: xe,
      rs: lt(ce, gt.sid, se, Nt, xe),
      st: "walk",
      path: null,
      J: null,
      wt: 0,
      P: null,
    };
    return (
      ($e.seed = $e.rs),
      ($e.s = Ge + 1 + Xt($e) * (Fe - Ge - 2)),
      ($e.dir = Xt($e) < 0.5 ? 1 : -1),
      ($e.f = 0.3 + Xt($e) * 0.45),
      ($e.speed = 1.05 + Xt($e) * 0.55),
      re($e),
      $e
    );
  }
  function Dt(gt, se) {
    let Nt = gt.E,
      xe = gt.dir > 0 ? "b" : "a",
      ce = i.juns[gt.dir > 0 ? Nt.jb : Nt.ja],
      Ge = gt.x,
      Fe = gt.z,
      $e = gt.hx,
      Ds = gt.hz,
      Es = [];
    if (ce) {
      for (let [We, Is] of ce.legs)
        if (lE(We))
          for (let ns of [1, -1]) {
            if (We === Nt && ns === gt.side) continue;
            let rn = z(We, ns, Is),
              dn = S(We, rn, ns, gt.f, {}),
              Hn = Math.hypot(dn.x - Ge, dn.z - Fe);
            if (Hn > 38) continue;
            let Dn = Is === "a" ? 1 : -1,
              Un = Hn > 4.8,
              Xs = Ot(We, yf(rn + Dn * 3, 0, We.L), {}),
              _i = Xs.dx * Dn * $e + Xs.dz * Dn * Ds,
              Mt = Un ? (_i > 0.7 ? 1.4 : 0.35) : _i > 0.7 ? 1.2 : 0.9;
            (We === Nt && (Mt = 0.25),
              Es.push({
                G: We,
                side: ns,
                gdir: Dn,
                s0: rn,
                X: dn,
                d: Hn,
                cross: Un,
                w: Mt,
                dx: (dn.x - Ge) / (Hn || 1),
                dz: (dn.z - Fe) / (Hn || 1),
              }));
          }
    }
    if (!Es.length) {
      gt.dir = -gt.dir;
      return;
    }
    let Ls = 0;
    for (let We of Es) Ls += We.w;
    let Os = Xt(gt) * Ls,
      hs = Es[0];
    for (let We of Es)
      if ((Os -= We.w) <= 0) {
        hs = We;
        break;
      }
    let Zs = null;
    if (hs.cross && ce && ce.ctl === 2 && s && ce.tl) {
      let We = (Ge + hs.X.x) / 2,
        Is = (Fe + hs.X.z) / 2,
        ns = 1e9;
      for (let rn of ce.tl)
        (vs(rn.E, We, Is, M), M.d < ns && ((ns = M.d), (Zs = rn)));
    }
    ((gt.path = {
      x0: Ge,
      z0: Fe,
      y0: gt.y,
      x1: hs.X.x,
      z1: hs.X.z,
      y1: hs.X.y,
      len: hs.d,
      u: 0,
      cross: hs.cross,
      next: hs,
      dx: hs.dx,
      dz: hs.dz,
    }),
      (hs.leg = Zs),
      (gt.st = Zs ? "wait" : "path"),
      (gt.J = ce),
      (gt.wt = 0));
  }
  function qe(gt, se, Nt) {
    if (gt.st === "walk") {
      gt.s += gt.dir * gt.speed * se;
      let xe = gt.dir > 0 ? z(gt.E, gt.side, "b") : z(gt.E, gt.side, "a");
      (re(gt), (gt.s - xe) * gt.dir >= 0 && Dt(gt, Nt));
    } else if (gt.st === "wait") {
      gt.wt += se;
      let xe = gt.path.next.leg;
      (!xe ||
        !s ||
        s.signal(gt.J, xe.ph, Nt - (s.tOff || 0)) === 2 ||
        gt.wt > 45) &&
        (gt.st = "path");
    } else {
      let xe = gt.path;
      if (
        ((xe.u +=
          (gt.speed * (xe.cross ? 1.1 : 1) * se) / Math.max(0.3, xe.len)),
        xe.u >= 1)
      ) {
        let ce = xe.next;
        ((gt.E = ce.G),
          (gt.side = ce.side),
          (gt.dir = ce.gdir),
          (gt.s = ce.s0),
          (gt.st = "walk"),
          (gt.path = null));
      }
    }
    gt.st !== "walk" && re(gt);
  }
  function pe(gt, se, Nt, xe, ce) {
    if ((qt || me(), (he -= 1) <= 0 || ce)) {
      he = 15;
      let Ge = new Set(),
        Fe = Math.floor((gt - jt) / Wt),
        $e = Math.floor((gt + jt) / Wt),
        Ds = Math.floor((se - jt) / Wt),
        Es = Math.floor((se + jt) / Wt);
      for (let Ls = Fe; Ls <= $e; Ls++)
        for (let Os = Ds; Os <= Es; Os++)
          for (let hs of qt.get(Ls * 65536 + Os) || []) {
            if ((Ot(hs, hs.L / 2, ee), Math.hypot(ee.x - gt, ee.z - se) > jt))
              continue;
            let Zs =
              (rE[Ai(ee.x, ee.z)] ?? 0.5) *
              (ep.has(hs.name)
                ? 1.5
                : hs.cls === "residential" || hs.cls === "service"
                  ? 0.7
                  : 1);
            for (let We of [1, -1]) {
              let Is = Math.floor(
                (Math.max(0, z(hs, We, "b") - z(hs, We, "a")) * Zs) / Pt +
                  (lt(xe.seed, hs.sid, We) % 1e3) / 1e3,
              );
              for (let ns = 0; ns < Is; ns++) {
                let rn = hs.sid * 1e3 + (We > 0 ? 500 : 0) + ns;
                Ge.add(rn);
                let dn = ((lt(xe.seed, hs.sid, We, ns, 7) % 1e5) / 1e5) * yt,
                  Hn = Math.floor((Nt + dn) / yt),
                  Dn = Ct.get(rn);
                if (Dn && Dn.e === Hn) continue;
                let Un = os(hs, We, ns, Hn, xe.seed);
                if (!Un) {
                  Ct.delete(rn);
                  continue;
                }
                let Xs = Hn * yt - dn;
                for (; Nt - Xs >= vt;) (qe(Un, vt, Xs + vt), (Xs += vt));
                ((Un.tg = Xs), Ct.set(rn, Un));
              }
            }
          }
      for (let [Ls, Os] of Ct) Ge.has(Ls) || Ct.delete(Ls);
    }
    for (let Ge of Ct.values()) we(Ge, Nt);
    for (let Ge of _) Ge.g && Ct.get(Ge.g.key) !== Ge.g && we(Ge.g, Nt);
  }
  function we(gt, se) {
    for (; se - gt.tg >= vt;) (qe(gt, vt, gt.tg + vt), (gt.tg += vt));
    let Nt = se - gt.tg;
    if (gt.st === "walk") {
      let xe = gt.s;
      ((gt.s += gt.dir * gt.speed * Nt), re(gt), (gt.s = xe));
    } else if (gt.st === "path") {
      let xe = gt.path,
        ce = xe.u;
      ((xe.u = Math.min(
        1,
        xe.u + (gt.speed * (xe.cross ? 1.1 : 1) * Nt) / Math.max(0.3, xe.len),
      )),
        re(gt),
        (xe.u = ce));
    }
  }
  function rs(gt) {
    let se = h;
    h = gt.seed;
    let Nt = R.pop() || N();
    return (
      Object.assign(Nt, N()),
      (h = se),
      Object.assign(Nt, {
        st: gt.st,
        kb: null,
        mad: 0,
        sx: 0,
        sz: 0,
        bx: void 0,
        gen: (Nt.gen || 0) + 1,
        lag: 0,
        vs: 0,
        stuck: 0,
        gapT: 0,
        spot: null,
        plaza: null,
        hot: null,
        path: gt.path,
        J: gt.J,
        E: gt.E,
        s: gt.s,
        side: gt.side,
        dir: gt.dir,
        f: gt.f,
        speed: gt.speed,
        x: gt.x,
        y: gt.y,
        z: gt.z,
        hx: gt.hx,
        hz: gt.hz,
        nx: gt.nx || 0,
        nz: gt.nz || 0,
        g: gt,
        gid: gt.gid,
        t: 0,
      }),
      (Nt.cad = (2 * Math.PI * Nt.speed) / (1.37 * Nt.sc)),
      (gt.P = Nt),
      Nt
    );
  }
  let Le = new Set(["walk", "path", "wait"]);
  function de(gt, se) {
    let Nt = gt.g;
    ((gt.lag || 0) > 3
      ? ((gt.gl = (gt.gl || 0) + se),
        X.center.set(gt.x + (gt.sx || 0), gt.y + 0.9, gt.z + (gt.sz || 0)),
        gt.gl > (Q.intersectsSphere(X) ? 4 : 1) &&
          ((gt.bx = void 0),
          (gt.sx = gt.sz = 0),
          (gt.lag = 0),
          (gt.gl = 0),
          (tt.ghostSnaps = (tt.ghostSnaps || 0) + 1)))
      : (gt.gl = 0),
      (gt.st = Nt.st),
      (gt.E = Nt.E),
      (gt.s = Nt.s),
      (gt.side = Nt.side),
      (gt.dir = Nt.dir),
      (gt.f = Nt.f),
      (gt.path = Nt.path),
      (gt.J = Nt.J),
      (gt.x = Nt.x),
      (gt.y = Nt.y),
      (gt.z = Nt.z),
      (gt.hx = Nt.hx),
      (gt.hz = Nt.hz),
      Nt.nx !== void 0 && ((gt.nx = Nt.nx), (gt.nz = Nt.nz)));
  }
  function Ie(gt, se, Nt, xe, ce = null) {
    if (!(gt > 0)) return;
    let Ge = performance.now(),
      Fe = se.pos.x,
      $e = se.pos.z;
    T = Math.round(yf(e * (rE[Ai(Fe, $e)] ?? 0.5), Math.min(e, 40), e));
    let Ds = nt === null || Math.hypot(Fe - nt, $e - Z) > 40;
    ((nt = Fe), (Z = $e));
    for (let pt = _.length - 1; pt >= 0; pt--) {
      let le = _[pt];
      (Math.abs(le.x - Fe) > Jm ||
        Math.abs(le.z - $e) > Jm ||
        Math.hypot(le.x - Fe, le.z - $e) > Jm ||
        (le.g &&
          Ct.get(le.g.key) !== le.g &&
          Math.hypot(le.x - Fe, le.z - $e) > 50)) &&
        (le.g &&
          (le.g.P === le && (le.g.P = null), (le.g = null), (le.gid = void 0)),
        (le.spot = null),
        (le.plaza = null),
        R.push(le),
        (_[pt] = _[_.length - 1]),
        _.pop());
    }
    if ((F -= gt) < 0) {
      F = 2;
      for (let pt of I)
        Math.hypot(pt.x - Fe, pt.z - $e) > Jm + 10 && I.delete(pt);
    }
    for (let pt of a)
      if (!(Math.hypot(pt.cx - Fe, pt.cz - $e) > 170)) {
        if (!pt.grid) {
          let Ut = performance.now();
          (D(pt), (pt.gridMs = performance.now() - Ut));
        }
        pt.n = 0;
        for (let Ut of _) Ut.plaza === pt && pt.n++;
        for (let Ut = 0; Ut < (Ds ? 40 : 1) && pt.n < pt.want; Ut++) {
          let zt = Y(pt);
          zt && (_.push(zt), pt.n++);
        }
        T = Math.max(0, T - pt.n);
      }
    for (let pt = 0; pt < r.length; pt++) {
      let le = r[pt];
      if (Math.hypot(le.x - Fe, le.z - $e) > Jm + le.r) continue;
      let Ut = ps.sync ? Math.round(le.want * (le.stand ?? 0.45)) : 0;
      (Ut && ct(le, pt, Ut, ps.sync), (le.n = 0));
      for (let zt of _) zt.hot === le && !zt.sid && le.n++;
      for (
        let zt = 0;
        zt < (Ds ? 40 : 2) && le.n < le.want - Ut && !ps.sync;
        zt++
      ) {
        let ft = f() * Math.PI * 2,
          kt = Math.sqrt(f()) * le.r,
          St = H(le.x + Math.cos(ft) * kt, le.z + Math.sin(ft) * kt, 0.2);
        if (St) {
          if (((St.hot = le), !Ut && f() < (le.stand ?? 0.45))) {
            let Ft = le.x - St.x,
              Gt = le.z - St.z,
              Bt = Math.hypot(Ft, Gt) || 1;
            ((St.st = "stand"),
              (St.hx = Ft / Bt),
              (St.hz = Gt / Bt),
              (St.t = 0),
              (St.watchT = 6 + f() * 18),
              (St.pose = b
                ? f() < 0.3
                  ? kn.photo
                  : f() < 0.25
                    ? kn.point
                    : Bd(f)
                : f() < 0.3
                  ? 2
                  : 0));
          }
          (_.push(St), le.n++);
        }
      }
      T = Math.max(0, T - le.n - Ut);
    }
    let Es = ps.sync;
    if (Es) {
      let pt = Es.now() / 1e3;
      pe(Fe, $e, pt, Es, Ds);
      for (let le of Ct.values())
        le.P ||
          Math.abs(le.x - Fe) > iv ||
          Math.abs(le.z - $e) > iv ||
          Math.hypot(le.x - Fe, le.z - $e) > iv ||
          _.push(rs(le));
    } else if (Ct.size) {
      for (let pt of _) pt.g && ((pt.g = null), (pt.gid = void 0));
      Ct.clear();
    }
    Nt.updateMatrixWorld();
    let Ls = Nt.matrixWorld.elements,
      Os = Math.hypot(Ls[8], Ls[10]) || 1,
      hs = -Ls[8] / Os,
      Zs = -Ls[10] / Os;
    if (((K += gt), Ds && (et = 1.5), (et -= gt), K > 0.05 || et > 0)) {
      K = 0;
      for (let pt = 0; pt < (et > 0 ? 60 : 8) && _.length < T && !Es; pt++) {
        let le = f() * Math.PI * 2,
          Ut = Math.cos(le),
          zt = Math.sin(le),
          ft = et <= 0 && Ut * hs + zt * Zs > 0.45,
          kt = et > 0 ? 8 : ft ? 72 : 28,
          St = kt + f() * (iv - kt),
          Ft = H(Fe + Ut * St, $e + zt * St, 1.9);
        Ft && _.push(Ft);
      }
      if ((L -= 0.05) < 0 || et > 0) {
        L = 0.5;
        let pt = Math.floor(Fe / A),
          le = Math.floor($e / A),
          Ut = Math.ceil(iv / A);
        for (let zt = pt - Ut; zt <= pt + Ut; zt++)
          for (let ft = le - Ut; ft <= le + Ut; ft++)
            for (let kt of C.get(P(zt, ft)) || []) {
              if (I.has(kt) || (!Es && _.length >= T)) continue;
              let St = Math.hypot(kt.x - Fe, kt.z - $e);
              if (St > iv || (St < 30 && et <= 0 && !Es)) continue;
              I.add(kt);
              let Ft = h;
              if (
                (Es &&
                  (h = lt(
                    Es.seed,
                    Math.round(kt.x * 10),
                    Math.round(kt.z * 10),
                    Math.floor(Es.now() / 3e5),
                  )),
                f() >
                  (rE[Ai(kt.x, kt.z)] ?? 0.5) *
                    (kt.kind === "bench" ? 0.4 : 0.8))
              ) {
                h = Ft;
                continue;
              }
              let Gt =
                kt.kind === "shelter"
                  ? 1 + Math.floor(f() * 3)
                  : 1 + Math.floor(f() * 2);
              for (let Bt = 0; Bt < Gt; Bt++) {
                let Se = null;
                for (let Rt = 0; Rt < 4 && !Se; Rt++) Se = O(kt, !!Es);
                Se && ((Se.spotOwner = Bt === 0), _.push(Se));
              }
              h = Ft;
            }
      }
    }
    let We = Math.hypot(se.vel.x, se.vel.z),
      Is = We > 0.5 ? se.vel.x / We : -Math.sin(se.psi),
      ns = We > 0.5 ? se.vel.z / We : -Math.cos(se.psi),
      rn = -Math.sin(se.psi),
      dn = -Math.cos(se.psi),
      Hn = ce?.cars || [],
      Dn = b ? Q1(Fe, $e, Jm + 10, se, ce) : null,
      Un = (pt, le, Ut) => {
        let zt = t.driveHeight(pt, le, null, Ut + 0.5),
          ft = $d(pt, le);
        return ft !== null && Math.abs(ft - zt) < 0.6 ? Math.max(ft, zt) : zt;
      };
    for (let pt of _) {
      if (((pt.t += gt), pt.mad > 0 && (pt.mad -= gt), b)) {
        if (
          (pt.st === "knock" &&
            (xS(pt, gt, Un) && ((pt.st = "recover"), (pt.t = 0)),
            p &&
              pt.kb &&
              p(pt.x, pt.z, pt.y, (Ut) => {
                let zt = Ul(Ut, pt.x, pt.z, 0.3);
                if (!zt) return;
                ((pt.x += zt[0]), (pt.z += zt[1]));
                let ft = Math.hypot(zt[0], zt[1]) || 1,
                  kt = zt[0] / ft,
                  St = zt[1] / ft,
                  Ft = pt.kb.vx * kt + pt.kb.vz * St;
                Ft < 0 &&
                  ((pt.kb.vx -= 1.4 * Ft * kt), (pt.kb.vz -= 1.4 * Ft * St));
              })),
          pt.st !== "knock")
        )
          for (let Ut of Dn) {
            if (
              Ut.sp <= 1.8 ||
              Math.abs(pt.x - Ut.x) > 7 ||
              Math.abs(pt.z - Ut.z) > 7
            )
              continue;
            let zt = Qg(pt.x + (pt.sx || 0), pt.z + (pt.sz || 0), Ut);
            if (zt) {
              ((pt.x += pt.sx || 0), (pt.z += pt.sz || 0), (pt.sx = pt.sz = 0));
              let ft = iy(pt, Ut, zt);
              ((pt.st = "knock"),
                (pt.leap = null),
                (tt.knocks = (tt.knocks || 0) + 1),
                Ut.remote && (tt.knocksRemote = (tt.knocksRemote || 0) + 1),
                ba.onBump?.(ft, Ut, pt),
                Ut.player && ps.onKnock?.(pt));
              break;
            }
          }
        if (pt.st === "knock") continue;
      }
      let le = Math.abs(pt.x - Fe) < 45 && Math.abs(pt.z - $e) < 45;
      if (pt.st !== "leap" && le && We > (b ? 1.2 : 2) && !ba.noDodge) {
        let Ut = b
          ? it(pt, Fe, $e, Is, ns, We * 0.8, 1.35, 2.8)
          : it(pt, Fe, $e, Is, ns, We, 1.45, 3.2);
        Ut && rt(pt, Is, ns, Ut, We);
      }
      if (b && Dn && pt.st !== "leap" && pt.st !== "knock" && !ba.noDodge)
        for (let Ut of Dn) {
          if (
            !Ut.remote ||
            Ut.sp < 1.2 ||
            Math.abs(Ut.x - pt.x) > 30 ||
            Math.abs(Ut.z - pt.z) > 30
          )
            continue;
          let zt = Ut.vx / Ut.sp,
            ft = Ut.vz / Ut.sp,
            kt = it(pt, Ut.x, Ut.z, zt, ft, Ut.sp * 0.8, 1.35, 2.8);
          if (kt) {
            rt(pt, zt, ft, kt, Ut.sp);
            break;
          }
        }
      if (pt.st === "path" && pt.path?.cross && Hn.length)
        for (let Ut of Hn) {
          if (
            Math.abs(Ut.x - pt.x) > 20 ||
            Math.abs(Ut.z - pt.z) > 20 ||
            Ut.v < 1
          )
            continue;
          let zt = it(
            pt,
            Ut.x,
            Ut.z,
            Ut.fx,
            Ut.fz,
            Ut.v,
            1.4,
            (Ut.V?.L || 4.6) / 2 + 1,
          );
          if (zt) {
            rt(pt, Ut.fx, Ut.fz, zt, Ut.v);
            break;
          }
        }
      if (pt.g && Le.has(pt.st)) de(pt, gt);
      else if (pt.st === "walk") {
        let Ut = pt.E;
        pt.s += pt.dir * pt.speed * ut(pt) * gt;
        let zt = pt.dir > 0 ? z(Ut, pt.side, "b") : z(Ut, pt.side, "a");
        if (
          (S(Ut, pt.s, pt.side, pt.f, w),
          (pt.x = w.x),
          (pt.y = w.y),
          (pt.z = w.z),
          (pt.hx = w.hx * pt.dir),
          (pt.hz = w.hz * pt.dir),
          (pt.nx = y.nx * pt.side),
          (pt.nz = y.nz * pt.side),
          b &&
            ((pt.lag || 0) > 1.2
              ? (pt.stuck += gt)
              : (pt.stuck = Math.max(0, pt.stuck - gt)),
            pt.stuck > 1.5 &&
              ((pt.stuck = 0),
              (pt.dir = -pt.dir),
              vs(Ut, pt.bx ?? pt.x, pt.bz ?? pt.z, M),
              (pt.s = yf(M.s, z(Ut, pt.side, "a"), z(Ut, pt.side, "b"))),
              S(Ut, pt.s, pt.side, pt.f, w),
              (pt.x = w.x),
              (pt.z = w.z),
              (pt.y = w.y),
              (pt.hx = w.hx * pt.dir),
              (pt.hz = w.hz * pt.dir))),
          b && p && (pt.chkT = (pt.chkT || 0) - gt) < 0)
        ) {
          ((pt.chkT = 0.3), S(Ut, pt.s + pt.dir * 1.2, pt.side, pt.f, w));
          let ft = !1;
          (p(w.x, w.z, pt.y, (kt) => {
            !ft && Ul(kt, w.x, w.z, 0.05) && (ft = !0);
          }),
            ft && ((pt.dir = -pt.dir), (pt.hx = -pt.hx), (pt.hz = -pt.hz)));
        }
        (pt.s - zt) * pt.dir >= 0 && $(pt, xe);
      } else if (pt.st === "stand")
        pt.plaza
          ? ((pt.y = U(pt.plaza, pt.x, pt.z)),
            pt.t > 4 + pt.seeds[0] * 9 && ((pt.t = 0), f() < 0.7 && V(pt)))
          : pt.hot &&
            pt.E &&
            pt.t > (pt.watchT || 10) &&
            ((pt.st = "walk"), (pt.t = 0), (pt.pose = 0));
      else if (pt.st === "wait") {
        let Ut = pt.path.next.leg,
          zt = !Ut || !s || s.signal(pt.J, Ut.ph, xe) === 2 || pt.t > 45;
        (Ut && !Ut.ph && s?.call && s.call(pt.J, 1, xe),
          zt &&
            (!b ||
              !pt.path.cross ||
              at(pt.path, Dn) ||
              (pt.gapT = (pt.gapT || 0) + gt) > 20) &&
            ((pt.st = "path"), (pt.t = 0), (pt.gapT = 0)));
      } else if (pt.st === "path") {
        let Ut = pt.path;
        Ut.u +=
          (pt.speed * (Ut.cross ? 1.1 : 1) * ut(pt) * gt) /
          Math.max(0.3, Ut.len);
        let zt = Math.min(1, Ut.u);
        if (
          ((pt.x = Ut.x0 + (Ut.x1 - Ut.x0) * zt),
          (pt.z = Ut.z0 + (Ut.z1 - Ut.z0) * zt),
          (pt.y =
            Ut.y0 +
            (Ut.y1 - Ut.y0) * zt -
            (Ut.cross ? QF * Math.min(1, zt / 0.12, (1 - zt) / 0.12) : 0)),
          Ut.plaza)
        )
          ((pt.y = U(pt.plaza, pt.x, pt.z)),
            zt >= 1 &&
              (f() < 0.25
                ? ((pt.st = "stand"), (pt.t = 0), (pt.path = null))
                : V(pt)));
        else if (zt >= 1) {
          let ft = Ut.next;
          ((pt.E = ft.G),
            (pt.side = ft.side),
            (pt.dir = ft.gdir),
            (pt.s = ft.s0),
            (pt.st = "walk"),
            (pt.path = null));
        }
      } else if (pt.st === "leap") {
        let Ut = pt.leap;
        Ut.t += gt;
        let zt = Math.min(1, Ut.t / Ut.dur),
          ft = 1 - zt * 0.5;
        ((pt.x += Ut.vx * ft * gt),
          (pt.z += Ut.vz * ft * gt),
          (pt.y =
            t.driveHeight(pt.x, pt.z, null, Ut.y0 + 0.5) +
            Math.sin(Math.PI * zt) * Ut.hop),
          (Ut.y0 = pt.y - Math.sin(Math.PI * zt) * Ut.hop),
          zt >= 1 && ((pt.st = "recover"), (pt.t = 0), (pt.leap = null)));
      } else if (
        pt.st === "recover" &&
        ((pt.y = t.driveHeight(pt.x, pt.z, null, pt.y + 0.5)),
        pt.t > (b ? 0.5 : 0.9))
      )
        if (pt.g) ((pt.st = pt.g.st), de(pt, 0));
        else if (pt.spot || pt.plaza)
          ((pt.st = "stand"), pt.plaza && (pt.y = U(pt.plaza, pt.x, pt.z)));
        else {
          vs(pt.E, pt.x, pt.z, M);
          let Ut = yf(M.s, z(pt.E, pt.side, "a"), z(pt.E, pt.side, "b"));
          S(pt.E, Ut, pt.side, pt.f, w);
          let zt = Math.hypot(w.x - pt.x, w.z - pt.z);
          if (zt > 25) {
            pt.x = 1e9;
            continue;
          }
          ((pt.path = {
            x0: pt.x,
            z0: pt.z,
            y0: pt.y,
            x1: w.x,
            z1: w.z,
            y1: w.y,
            len: zt,
            u: 0,
            cross: !1,
            next: { G: pt.E, side: pt.side, gdir: pt.dir, s0: Ut },
          }),
            (pt.st = "path"));
          let ft = zt || 1;
          ((pt.hx = (w.x - pt.x) / ft), (pt.hz = (w.z - pt.z) / ft));
        }
      if (le && !b) {
        let Ut = pt.x - Fe,
          zt = pt.z - $e,
          ft = Ut * rn + zt * dn,
          kt = Ut * dn - zt * rn;
        if (Math.abs(ft) < 2.6 && Math.abs(kt) < 1.25) {
          let St = kt >= 0 ? 1 : -1,
            Ft = 1.25 - Math.abs(kt);
          ((pt.x += dn * St * Ft),
            (pt.z -= rn * St * Ft),
            pt.st !== "leap" && rt(pt, rn, dn, St, Math.max(We, 3)));
        }
      }
    }
    b &&
      m.step(ps.extern.length ? _.concat(ps.extern) : _, gt, Dn, {
        skip: (pt) => pt.st === "knock",
        fixed: (pt) => pt.sid !== void 0 && pt.st === "stand",
        vmax: (pt) => (pt.st === "leap" ? 3.4 : Math.max(1.5, pt.speed * 1.35)),
        gain: (pt) => (pt.st === "leap" ? 12 : 3),
        clamp: ot,
        half: (pt) =>
          pt.st !== "leap" &&
          Math.abs(pt.x - Nt.position.x) + Math.abs(pt.z - Nt.position.z) > 70,
      });
    let Xs = b ? Dn.filter((pt) => pt.sp >= 0.3) : null;
    if (b && Xs.length)
      for (let pt of _) {
        if (pt.st === "knock") continue;
        let le = pt.x + (pt.sx || 0),
          Ut = pt.z + (pt.sz || 0);
        for (let zt of Xs) {
          if (zt.sp < 0.3 || Math.abs(zt.x - le) > 6 || Math.abs(zt.z - Ut) > 6)
            continue;
          let ft = Qg(le, Ut, zt, 0.3 - 0.04);
          if (!ft && p && (ft = Qg(le, Ut, zt, 0.3 + 0.15))) {
            let kt = 0;
            (p(le, Ut, pt.y, (St) => {
              let Ft = Ul(St, le, Ut, 0.3);
              Ft && (kt = Math.max(kt, Math.hypot(Ft[0], Ft[1])));
            }),
              kt < 0.04 && (ft = null));
          }
          if (ft) {
            ((pt.x = le),
              (pt.z = Ut),
              (pt.sx = pt.sz = 0),
              iy(pt, zt, ft),
              (pt.st = "knock"),
              (pt.leap = null),
              (tt.knocks = (tt.knocks || 0) + 1),
              (tt.pinned = (tt.pinned || 0) + 1));
            break;
          }
        }
      }
    if (
      (j.multiplyMatrices(Nt.projectionMatrix, Nt.matrixWorldInverse),
      Q.setFromProjectionMatrix(j),
      b)
    ) {
      b.begin(gt);
      let pt = Nt.position.x,
        le = Nt.position.z;
      for (let Ut of _) {
        let zt = Ut.x + (Ut.sx || 0),
          ft = Ut.z + (Ut.sz || 0),
          kt = Math.hypot(zt - pt, ft - le);
        if (
          kt > Xtt ||
          (X.center.set(zt, Ut.y + 0.9, ft), !Q.intersectsSphere(X))
        )
          continue;
        let St = Ut.y;
        if (
          Ut.st !== "leap" &&
          Ut.st !== "knock" &&
          !Ut.plaza &&
          !(Ut.st === "path" && Ut.path?.cross)
        ) {
          let bs = $d(zt, ft);
          bs !== null && Math.abs(bs - Ut.y) < 0.45 && (St = bs);
        }
        let Ft = Ut.st === "walk" || Ut.st === "path",
          Gt = Ut.st === "leap",
          Bt = Ut.kb,
          Se = Bt ? 0 : Ut.vs || 0,
          Rt = Ft || Gt ? Se > 0.08 : Se > 0.35,
          Vt = Rt && Se > 0.25 && Ut.vhx !== void 0 ? Ut.vhx : Ut.hx,
          Pe = Rt && Se > 0.25 && Ut.vhx !== void 0 ? Ut.vhz : Ut.hz;
        b.put(Ut, zt, St, ft, Vt, Pe, kt, {
          speed: Rt ? Math.min(Se, 2.2) * (Ut.mad > 0 ? 1.15 : 1) : 0,
          pose: Bt
            ? kn.knock
            : Gt
              ? kn.leap
              : Ut.st === "recover" || (Ft && Ut.pose !== 2)
                ? 0
                : Ut.pose,
          k: Bt ? -Bt.ang : Gt ? Ut.leap.t / Ut.leap.dur : 0,
          rnd: f,
          look: Bt ? ni.dizzy : Ut.mad > 0 ? ni.angry : null,
          snap: !!Bt,
        });
      }
      (b.end(),
        (tt.n = _.length),
        (tt.drawn = b.drawn),
        (tt.target = T),
        (tt.ms = performance.now() - Ge));
      return;
    }
    let _i = x.map(() => [0, 0]),
      Mt = Nt.position.x,
      Kt = Nt.position.z,
      bt = [1e9, 1e9, 1e9],
      wt = [-1e9, -1e9, -1e9],
      _t = 0;
    for (let pt of _) {
      let le = Math.hypot(pt.x - Mt, pt.z - Kt);
      if (
        le > Xtt ||
        (X.center.set(pt.x, pt.y + 0.9, pt.z), !Q.intersectsSphere(X))
      )
        continue;
      let Ut = le < Qyt ? 0 : 1,
        zt = x[pt.B][Ut],
        ft = _i[pt.B][Ut]++,
        kt = zt.instanceMatrix.array,
        St = zt.instanceColor.array,
        Ft = pt.sc,
        Gt = Ft * pt.sw,
        Bt = pt.hx,
        Se = pt.hz,
        Rt = pt.st === "walk" || pt.st === "path",
        Vt = ft * 16;
      ((kt[Vt] = Se * Gt),
        (kt[Vt + 1] = 0),
        (kt[Vt + 2] = -Bt * Gt),
        (kt[Vt + 3] = pt.st === "leap" ? pt.leap.t / pt.leap.dur : pt.ph0),
        (kt[Vt + 4] = 0),
        (kt[Vt + 5] = Ft),
        (kt[Vt + 6] = 0),
        (kt[Vt + 7] = Rt ? pt.cad * (pt.path?.cross ? 1.1 : 1) : 0),
        (kt[Vt + 8] = Bt * Gt),
        (kt[Vt + 9] = 0),
        (kt[Vt + 10] = Se * Gt),
        (kt[Vt + 11] = pt.st === "leap" ? 1 : pt.pose),
        (kt[Vt + 12] = pt.x),
        (kt[Vt + 13] = pt.y),
        (kt[Vt + 14] = pt.z),
        (kt[Vt + 15] = 1),
        (St[ft * 3] = pt.seeds[0]),
        (St[ft * 3 + 1] = pt.seeds[1]),
        (St[ft * 3 + 2] = pt.seeds[2]),
        (bt[0] = Math.min(bt[0], pt.x)),
        (bt[1] = Math.min(bt[1], pt.y)),
        (bt[2] = Math.min(bt[2], pt.z)),
        (wt[0] = Math.max(wt[0], pt.x)),
        (wt[1] = Math.max(wt[1], pt.y)),
        (wt[2] = Math.max(wt[2], pt.z)),
        _t++);
    }
    let ie = (bt[0] + wt[0]) / 2,
      te = (bt[1] + wt[1]) / 2 + 0.9,
      Qt = (bt[2] + wt[2]) / 2,
      ge = Math.hypot(wt[0] - bt[0], wt[1] - bt[1], wt[2] - bt[2]) / 2 + 2;
    (x.forEach((pt, le) =>
      pt.forEach((Ut, zt) => {
        let ft = _i[le][zt];
        ((Ut.count = ft),
          (Ut.visible = ft > 0),
          ft &&
            ((Ut.instanceMatrix.needsUpdate = !0),
            (Ut.instanceColor.needsUpdate = !0),
            Ut.boundingSphere.center.set(ie, te, Qt),
            (Ut.boundingSphere.radius = ge)));
      }),
    ),
      (tt.n = _.length),
      (tt.drawn = _t),
      (tt.target = T));
  }
  let ps = {
    group: d,
    update: Ie,
    peds: _,
    stats: tt,
    meshes: x,
    plazas: a,
    hotspots: r,
    knockFrom: dt,
    sync: null,
    onKnock: null,
    nav: m,
    extern: [],
    setWorld: (gt) => {
      p = gt ? oy(gt) : null;
    },
  };
  return ps;
}
