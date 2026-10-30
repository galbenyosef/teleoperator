// app 332 — math
// Lines 159460-162990 of readable/app.pretty.js (statement-aligned).
var Zs = (o, t, e) => (o < t ? t : o > e ? e : o),
  DM = 9.81,
  qO = 80,
  jO = ["green", "orange", "red", "brake"],
  pE = class {
    constructor(t = "manual") {
      ((this.mode = Vf.includes(t) ? t : Eet[t] || "manual"),
        (this.env = {
          L: null,
          roads: null,
          peds: [],
          route: null,
          rides: null,
          traffic: null,
          router: null,
        }),
        (this.out = {
          throttle: 0,
          brake: 0,
          steer: 0,
          handbrake: 0,
          nitro: !1,
          lookBack: !1,
          digitalBrake: !1,
          player: !0,
        }),
        (this.active = 0),
        (this.brk = 0),
        (this.braking = !1),
        (this.emergency = !1),
        (this.aCmd = 0),
        (this.thrMax = 1),
        (this.nud = 0),
        (this.lk = 0),
        (this.fI = 0),
        (this.bI = 0),
        (this.only = !1),
        (this.calmT = 0),
        (this.lkT = 0),
        (this.lane = { ok: !1, e: 0, psi: 0 }),
        (this._rq = {}),
        (this.P = new Float64Array(qO * 5)),
        (this.np = 0),
        (this.ds = 1),
        (this._ax = { x: 0, z: 0 }),
        (this._az = { x: 0, z: 0 }),
        (this._ta = [0, 0]),
        (this._tb = [0, 0]),
        (this._po = { x: 0, z: 0, dx: 0, dz: 0 }),
        (this.HS = new Float64Array(24)),
        (this.HY = new Float64Array(24)),
        (this.nh = 0),
        (this.O = {
          ox: 0,
          oz: 0,
          ux: 0,
          uz: 1,
          lx: 1,
          lz: 0,
          k: 0,
          R: 0,
          sg: 1,
        }),
        (this._cells = new Float64Array(96)),
        (this._nc = 0),
        (this.cand = []),
        (this.crit = UM()),
        (this.lead = UM()),
        (this.avoid = UM()),
        (this.critAv = UM()),
        (this._t = UM()),
        (this.recT = 0),
        (this.recX = 0),
        (this.recZ = 0),
        (this.avC = null),
        (this.avSide = 0),
        (this.avK = 0),
        (this.avOK = !1),
        (this.avT = 0),
        (this.avBad = 0),
        (this.avYield = 0),
        (this.stat = {
          gap: 0,
          areq: 0,
          kind: "",
          aCmd: 0,
          nudge: 0,
          lk: 0,
          thrMax: 1,
        }),
        (this.rp = null),
        (this.lp = null),
        (this.path = null),
        (this.g = 0),
        (this.kPath = 0),
        (this.conf = 0),
        (this._T = { x: 0, z: 0, y: 0, i: 0 }),
        (this._lq = {}),
        (this.choice = new Map()),
        (this._pT = 0),
        (this._replan = !1),
        (this.intentT = 0),
        (this.stG = 0),
        (this._kOv = null),
        (this.pS = 0),
        (this.mix = { w: 1, p: 1 }),
        (this.state = ""),
        (this.why = ""),
        (this.suggest = 0),
        (this.events = []),
        (this.takeover = !1),
        (this.cue = { state: "green", gap: 0 }),
        (this.dest = null),
        (this.destRoute = null),
        (this.arrived = !1),
        (this.lostT = 0),
        (this.profile = zMt()),
        (this.prof = k2[this.profile]),
        (this.thrI = 0),
        (this.vPrev = null),
        (this.axS = 0),
        (this.stuckT = 0),
        (this.claim = null),
        (this.l5T = 0));
      let e = 7;
      ((this.rnd = () => (e = (e * 16807) % 2147483647) / 2147483647),
        (this._pick = (s, n, i) => {
          let a = n.id * 2 + (i > 0 ? 1 : 0),
            r = this.choice.get(a);
          if (r) {
            let c = s.find((h) => h.F === r.F && h.dir === r.dir);
            if (c) return c;
          }
          let l = this.mode === "l5" ? this.cruiseWay(s, n) : UO(s, n);
          return (
            this.choice.size > 400 && this.choice.clear(),
            l && this.choice.set(a, { F: l.F, dir: l.dir }),
            l
          );
        }));
    }
    get on() {
      return this.mode !== "manual";
    }
    setMode(t) {
      ((t = Vf.includes(t) ? t : Eet[t] || "manual"),
        t !== this.mode &&
          ((this.thrI = 0),
          (this.stG = 0),
          (this.arrived = !1),
          (this.stuckT = 0),
          (this.l5T = 0)),
        (this.mode = t),
        this.reset(),
        t !== "l5" &&
          this.env.traffic &&
          ((this.env.traffic.playerJ = null),
          (this.env.traffic.playerAuto = !1)),
        t === "l5" && (this.takeover = !1));
    }
    reset() {
      ((this.brk = 0),
        (this.braking = !1),
        (this.emergency = !1),
        (this.nud = 0),
        (this.lk = 0),
        (this.fI = 0),
        (this.bI = 0),
        (this.active = 0),
        (this.only = !1),
        (this.calmT = 0),
        (this.avC = null),
        (this.avOK = !1),
        (this.recT = 0),
        (this.kS = void 0));
    }
    takeOver(t = "input") {
      (this.setMode("l3"),
        (this.takeover = !0),
        this.events.push({ type: "takeover", why: t }));
    }
    reengage() {
      (this.setMode("l5"), this.events.push({ type: "engaged" }));
    }
    setDest(t) {
      ((this.dest = t || null), (this.destRoute = null), (this.arrived = !1));
    }
    cruiseWay(t, e) {
      let s = 0,
        n = t.map((a) => {
          let r = a.ang < 0.6 ? 3 : a.cross > 0 ? 1.1 : 0.8;
          return (
            (r *= Math.pow(0.5, Math.max(0, e.rank - a.F.rank))),
            a.F.name && a.F.name === e.name && (r *= 1.6),
            (s += r),
            r
          );
        }),
        i = this.rnd() * s;
      for (let a = 0; a < t.length; a++) if ((i -= n[a]) <= 0) return t[a];
      return t[0] || null;
    }
    routeNow() {
      if (this.mode === "l5" && this.dest) return this.destRoute;
      let t = this.env.route?.();
      return !t || !t.edges?.length
        ? null
        : this.fix && this.fixFor === t
          ? this.fix
          : t;
    }
    ownRoute(t, e, s, n, i, a) {
      let r = this.env.router || this.env.rides?.(),
        l = t?.spot;
      if (!r?._route || !l) return;
      let c = HO(this.env.roads, e, this._lq);
      if (!c && this.rp.n) {
        let d = this.rp,
          p = d.s;
        for (let m of d.marks)
          if (p > m.sJ - 4 && p < m.sOut + 4) {
            c = {
              E: m.F,
              dir: m.dirF,
              s: m.dirF > 0 ? m.F.s0 + 1 : m.F.s1 - 1,
            };
            break;
          }
      }
      if (
        (!c &&
          this._here &&
          Math.hypot(this._here.x - s, this._here.z - n) < 20 &&
          (c = this._here),
        !c)
      )
        return;
      let h = Ot(c.E, c.s, {}),
        f = r._route(h.x, h.z, h.dx * c.dir, h.dz * c.dir, l, !1, {
          E: c.E,
          s: c.s,
        });
      if (!f?.edges?.length) return;
      let u = this.rp;
      (u.build(f.edges, e, { x: f.spot.x, z: f.spot.z }, null, "route"),
        (u.src = f),
        (u.lost = !0),
        u.locate(s, n, i, a, 6),
        (this.fix = f),
        (this.fixFor = t));
    }
    legalPlan(t, e, s) {
      let n = this.env.roads,
        i = pet(n, t, this._lq);
      if (!i || (i.wrong && this.mode === "l5" && !e)) return !1;
      let a = null,
        r = t.pos.x,
        l = t.pos.z,
        c = i.s;
      if (i.wrong) {
        let x = this.uturn(t, i);
        ((a = x.pts), (r = x.x), (l = x.z), (c = x.s));
      }
      let h = Ot(i.E, c, {}),
        f = h.dx * i.dir,
        u = h.dz * i.dir,
        d = (this._fake ||= {
          pos: { x: 0, y: 0, z: 0 },
          vel: { x: 0, z: 0 },
          psi: 0,
          forward() {
            return this._f;
          },
          _f: { x: 0, z: 0 },
        });
      ((d.pos.x = r),
        (d.pos.z = l),
        (d.pos.y = t.pos.y),
        (d._f.x = f),
        (d._f.z = u),
        (d.vel.x = f),
        (d.vel.z = u));
      let p,
        m = null,
        g = null;
      if (e) {
        let x = this.env.router || this.env.rides?.();
        if (!x?._route) return !1;
        let y =
          x._route(r, l, f, u, e, !1, { E: i.E, s: c, fwd: !0 }) ||
          x._route(r, l, f, u, e, !1, { E: i.E, s: c });
        if (!y?.edges?.length) return !1;
        ((p = y.edges), (m = { x: y.spot.x, z: y.spot.z }), (g = y));
      } else p = met(n, { E: i.E, dir: i.dir, s: c }, this._pick, 520);
      if (!s.build(p, d, m, null, e ? "route" : "lane", a)) return !1;
      ((s.src = g), (s.spotFor = e), (s.lost = !0));
      let b = Math.hypot(t.vel.x, t.vel.z),
        v = t.forward();
      return (
        s.locate(
          t.pos.x,
          t.pos.z,
          b > 2 ? t.vel.x / b : v.x,
          b > 2 ? t.vel.z / b : v.z,
          6,
        ),
        !0
      );
    }
    uturn(t, e) {
      let s = this.env.roads,
        n = e.E,
        i = Ot(n, e.s, {}),
        a = Math.max(1, s.lanes(n)),
        r = -Math.sin(t.psi),
        l = -Math.cos(t.psi),
        c = i.x,
        h = i.z,
        f = -1;
      for (let x = 0; x < a; x++) {
        let y = s.laneV(n, 1, x, i.w),
          M = i.x + i.nx * y,
          S = i.z + i.nz * y,
          w = Math.abs((M - t.pos.x) * -l + (S - t.pos.z) * r);
        w > f && ((f = w), (c = M), (h = S));
      }
      if (f < 2.5) {
        let x = Math.max(2.5, (i.w || 8) / 2 - 1.2);
        ((c = t.pos.x + l * x), (h = t.pos.z - r * x), (f = x));
      }
      let u = Math.max(4, f * 0.9),
        d = t.pos.x + r * u,
        p = t.pos.z + l * u,
        m = c - i.dx * u,
        g = h - i.dz * u,
        b = [],
        v = t.pos.y;
      for (let x = 0; x < 14; x++) {
        let y = x / 14,
          M = 1 - y;
        b.push([
          M * M * M * t.pos.x +
            3 * M * M * y * d +
            3 * M * y * y * m +
            y * y * y * c,
          M * M * M * t.pos.z +
            3 * M * M * y * p +
            3 * M * y * y * g +
            y * y * y * h,
          v,
        ]);
      }
      return { pts: b, x: c, z: h, s: e.s };
    }
    pursue(t, e, s, n, i, a, r = null) {
      let l = Zs(4.5 + 0.7 * a, 6, 26),
        c = t.at(l, this._T),
        h = c.x,
        f = c.z,
        u = 0,
        d = this.mode === "l5" && t === this.path,
        p = (this._dtP || 1 / 120) * 2,
        m = r ? r(t.s + l) : 0,
        g = r ? r(t.s) : 0;
      if (
        (d &&
          ((this._oT =
            this._oT === void 0 ? m : this._oT + Zs(m - this._oT, -p, p)),
          (this._o0 =
            this._o0 === void 0 ? g : this._o0 + Zs(g - this._o0, -p, p)),
          (m = this._oT),
          (g = this._o0)),
        m || g)
      ) {
        let S = t.at(l + 1.5, (this._T2 ||= { x: 0, z: 0, y: 0, i: 0 })),
          w = S.x - h,
          _ = S.z - f,
          z = Math.hypot(w, _) || 1;
        ((w /= z), (_ /= z), (h -= _ * m), (f += w * m), (u = g));
      }
      let b = h - e,
        v = f - s,
        x = b * i - v * n,
        y = b * n + v * i,
        M = (2 * x) / Math.max(4, b * b + v * v);
      if (
        (y < 0.5 && (M = (x >= 0 ? 1 : -1) * 0.22),
        t.d < 2.2 && Math.abs(t.psi) < 0.55 && y > 0.5)
      ) {
        let S =
            this.mode === "l5"
              ? Math.max(4, 2.5 + 0.35 * a)
              : Math.max(4.5, 3 + 0.45 * a),
          w = -t.curvAt(Math.min(6, a * 0.3), 2),
          _ = -((t.e + u) / (S * S) + (1.8 * t.psi) / S),
          z =
            Zs((2.2 - t.d) / 0.8, 0, 1) *
            Zs((0.55 - Math.abs(t.psi)) / 0.2, 0, 1);
        M = M + (w + _ - M) * z;
      }
      return M;
    }
    pathStep(t, e, s) {
      this.cueUpdate(t, e);
      let n = this.env.roads;
      if (!n?.laneV || !n.D) return ((this.path = null), (this.conf = 0), null);
      this.lp || ((this.lp = new Mv(n)), (this.rp = new Mv(n)));
      {
        let M = this.mode === "l5" && this.prof?.pass ? 26 : 16;
        ((this.lp.joinMax = this.rp.joinMax = M),
          this.gp && (this.gp.joinMax = M));
      }
      let i = e.pos.x,
        a = e.pos.z,
        r = Math.hypot(e.vel.x, e.vel.z),
        l = e.forward(),
        c = r > 2 ? e.vel.x / r : l.x,
        h = r > 2 ? e.vel.z / r : l.z;
      if (
        this.mode === "l5" &&
        this.dest &&
        this.env.router &&
        (!this.destRoute || this.lostT > 1.5)
      ) {
        let M = this.env.router.routeTo(i, a, l.x, l.z, this.dest, !1);
        ((this.destRoute = M?.edges?.length ? M : null), (this.lostT = 0));
      }
      let f = HO(n, e, this._lq);
      f && (this._here = { E: f.E, dir: f.dir, s: f.s, x: i, z: a });
      let u = this.routeNow(),
        d = this.rp;
      if (u) {
        let M = d.src,
          S =
            M?.spot &&
            u.spot &&
            d.n &&
            !d.lost &&
            Math.abs(d.psi) < 0.8 &&
            Math.hypot(M.spot.x - u.spot.x, M.spot.z - u.spot.z) < 40;
        if (d.src !== u && this.fixFor !== u && this.keepFor !== u && S)
          ((this.keepFor = u), d.locate(i, a, c, h, 6));
        else if (d.src !== u && this.fixFor !== u && this.keepFor !== u) {
          if (
            (d.build(
              u.edges,
              e,
              u.spot ? { x: u.spot.x, z: u.spot.z } : null,
              null,
              "route",
            ),
            (d.src = u),
            (d.lost = !0),
            d.locate(i, a, c, h, 6),
            this.mode === "l5" &&
              (d.lost ||
                Math.abs(d.psi) > 0.9 ||
                d.marks.some((w) => Math.abs(w.turn) > 2.6)))
          ) {
            let w = si.turnC;
            si.turnC = 4e3;
            try {
              this.ownRoute(u, e, i, a, c, h);
            } finally {
              si.turnC = w;
            }
          }
        } else d.locate(i, a, c, h, 6);
        this.mode === "l5" &&
          (d.lost || Math.abs(d.psi) > 1) &&
          this.lostT > 1.2 &&
          ((this.lostT = 0),
          this.ownRoute(this.env.route?.() || u, e, i, a, c, h));
      } else d.n && d.clear();
      let p = null;
      if (u && this.mode !== "l5")
        if (
          d.n &&
          !d.lost &&
          (this.onGp
            ? Math.abs(d.psi) < 0.45 && d.d < 2
            : Math.abs(d.psi) < 0.8)
        )
          ((p = d), (this.onGp = !1), (this.lostT = 0));
        else {
          let S = (this.gp ||= new Mv(n));
          (S.n && S.locate(i, a, c, h, 6), (this._gT = (this._gT || 0) - t));
          let w = S.pre && S.i < S.pre && (S.d > 1.5 || Math.abs(S.psi) > 0.5);
          ((!S.n ||
            S.lost ||
            Math.abs(S.psi) > 0.9 ||
            S.spotFor !== u.spot ||
            w) &&
            this._gT <= 0 &&
            ((this._gT = w ? 0.3 : 0.5), this.legalPlan(e, u.spot, S)),
            S.n &&
              !S.lost &&
              Math.abs(S.psi) < 1.3 &&
              S.spotFor === u.spot &&
              ((p = S), (this.onGp = !0)));
        }
      (this.mode === "l5" &&
        d.n &&
        (d.lost && (this.wide || this.noPT > 3)
          ? (this.wide = d.locate(i, a, c, h, 14))
          : !d.lost && d.d < 3 && (this.wide = !1)),
        this.mode === "l5" &&
          !p &&
          d.n &&
          !d.lost &&
          (Math.abs(d.psi) < 1.3 || this.noPT > 1.5 || this.turnTo) &&
          ((p = d),
          (this.lostT = 0),
          (this.turnTo = this.mode === "l5" && Math.abs(d.psi) > 1)));
      let m = this.mode === "l3";
      if (!p || m) {
        !p && (d.n || this.dest) && this.mode === "l5" && (this.lostT += t);
        let M = this.lp;
        (M.n && M.locate(i, a, c, h, 5), (this._pT -= t));
        let S = M.pre && M.i < M.pre && (M.d > 1.5 || Math.abs(M.psi) > 0.5);
        (!M.n ||
          M.lost ||
          M.left < 260 ||
          Math.abs(M.psi) > 1 ||
          this._replan ||
          S) &&
          this._pT <= 0 &&
          ((this._pT = 0.3),
          (this._replan = !1),
          !this.legalPlan(e, null, M) && M.lost
            ? M.clear()
            : M.n && M.locate(i, a, c, h, 5));
        let w = M.n && !M.lost && Math.abs(M.psi) < 1.3;
        if ((p || (p = w ? M : null), m && ((this.lane3 = w ? M : null), w))) {
          let _ = this.path;
          ((this.path = M), this.intent(t, n), (this.path = _));
        }
      }
      if (((this.path = p), (this.noPT = p ? 0 : (this.noPT || 0) + t), !p))
        return ((this.conf = 0), (this.g = 0), (this.kPath = 0), null);
      (this.mode === "l5" &&
        p.bid !== p._clr &&
        ((p._clr = p.bid), this.clearIslands(p), (p._clr = p.bid)),
        p === this.lp && this.mode === "l4" && this.intent(t, n),
        (this._dtP = t),
        (this._pPrev !== p || this._pBid !== p.bid) &&
          ((this._oT = void 0),
          (this._o0 = void 0),
          (this._pPrev = p),
          (this._pBid = p.bid)));
      let g = this.mode === "l5" ? this.laneGate(p, e, r, t) : null,
        b = this.mode === "l5" ? this.passStep(p, e, r, t) : null;
      ((this._offAll = g && b ? (M) => g(M) + b(M) : g || b),
        (this._offP = this._offAll ? p : null));
      let v = this.pursue(p, i, a, c, h, r, this._offAll);
      this.kPath = Zs(v, -0.25, 0.25);
      let x = e.vel.x * l.x + e.vel.z * l.z;
      ((this.g = Zs(
        this.stickFor(e, this.kPath * Math.max(r, 3), Math.max(x, 0.1)),
        -1,
        1,
      )),
        (this.conf =
          (this.mode === "l3" ? Zs((r * 3.6 - 3) / 5, 0, 1) : 1) *
          Zs((4.5 - p.d) / 2, 0, 1) *
          Zs((1.1 - Math.abs(p.psi)) / 0.4, 0, 1)),
        p.pre && p.i < p.pre && (this.conf = 0));
      let y = this.mode === "l3" ? this.lane3 : null;
      return (
        y
          ? ((this.kL = Zs(
              y === p ? this.kPath : this.pursue(y, i, a, c, h, r),
              -0.25,
              0.25,
            )),
            (this.confL =
              y.pre && y.i < y.pre
                ? 0
                : Zs((r * 3.6 - 3) / 5, 0, 1) *
                  Zs((4.5 - y.d) / 2, 0, 1) *
                  Zs((1.1 - Math.abs(y.psi)) / 0.4, 0, 1)))
          : ((this.kL = 0), (this.confL = 0)),
        p
      );
    }
    cueUpdate(t, e) {
      if ((this._cueT = (this._cueT || 0) - t) > 0) return;
      this._cueT = 0.1;
      let s = this.cue,
        n = Math.hypot(e.vel.x, e.vel.z),
        i = this.path,
        a = 0;
      if (i && n > 2) {
        let f = 0.75 * (e.S.mu || 1.2) * DM,
          u = Math.max(40, (n * n) / 5 + 25),
          d = i.S,
          p = i.K;
        for (let m = i.i + 1; m < i.n && d[m] - i.s < u; m++) {
          let g = Math.abs(p[m]);
          if (g < 0.012) continue;
          let b = Math.max(0.5, d[m] - i.s - 2),
            v = Math.sqrt(3.2 / g),
            x = Math.sqrt(f / g),
            y = n > v ? (n * n - v * v) / (2 * b) : 0;
          if ((n > x ? (n * n - x * x) / (2 * b) : 0) > 4 || y > 7) {
            a = 2;
            break;
          }
          y > 2.5 && (a = 1);
        }
      }
      let r = this.crit,
        l = n > 2 && r.on && r.areq > 1.5 && r.ttc < 4,
        c = l ? 3 : a,
        h = jO.indexOf(s.state);
      ((c >= h || (s.calmT = (s.calmT || 0) + 0.1) >= 0.4) &&
        ((s.calmT = 0), (s.state = jO[c])),
        (s.gap = l ? r.gap : 0));
    }
    clearIslands(t) {
      let e = this._world,
        s = e?.grid;
      if (!s) return;
      let n = (this._isl ||= []),
        i = (this._islS ||= new Set());
      ((n.length = 0), i.clear());
      for (let u = 0; u < t.n; u += 2) {
        let d = i1(Math.floor(t.X[u] / lo), Math.floor(t.Z[u] / lo));
        if (i.has(d)) continue;
        i.add(d);
        let p = s.get(d);
        if (p)
          for (let m of p)
            ((m.t === "obb" && (m.island || m.parked)) ||
              (m.t === "circ" && m.r < 0.8 && !m.dead)) &&
              !n.includes(m) &&
              n.push(m);
      }
      let a = (u, d) => {
        for (let p = 0; p < t.n; p++) {
          let m = t.S[p];
          if (!(m < u)) {
            if (m > d) break;
            for (let g of n)
              if (
                g.t === "circ" &&
                g.r < 0.3 &&
                (t.X[p] - g.x) ** 2 + (t.Z[p] - g.z) ** 2 < (g.r + 1.25) ** 2
              )
                return !0;
          }
        }
        return !1;
      };
      if (t.endStop && t._args?.[2] && a(t.len - 18, t.len + 1)) {
        let u = t._args[2],
          d = (() => {
            let M = t.n - 1;
            for (; M > 0 && t.S[M] > t.len - 19;) M--;
            return M;
          })(),
          p = Math.min(t.n - 1, d + 2),
          m = t.X[p] - t.X[d],
          g = t.Z[p] - t.Z[d],
          b = Math.hypot(m, g) || 1;
        ((m /= b), (g /= b));
        let v = (u.x - t.X[d]) * m + (u.z - t.Z[d]) * g,
          x = t.X[d] + m * v,
          y = t.Z[d] + g * v;
        for (let M of [0.6, 0.35, 0.1])
          if (
            ((t._args[2] = { x: x + (u.x - x) * M, z: y + (u.z - y) * M }),
            t.build(...t._args),
            !a(t.len - 18, t.len + 1))
          )
            break;
      }
      let r = this.env.L,
        l = t.endStop ? t.len - 18 : 1e9,
        c = t.X,
        h = t.Z,
        f = r?.surfaceAt
          ? (u, d, p, m) => {
              if (u & 1 || t.S[u] < 14 || t.S[u] > l || (t.pre && u < t.pre))
                return !1;
              let g = Math.max(0, u - 2),
                b = Math.min(t.n - 1, u + 2),
                v = c[b] - c[g],
                x = h[b] - h[g],
                y = Math.hypot(v, x) || 1;
              ((v /= y), (x /= y));
              let M = x,
                S = -v,
                w = (E) => r.surfaceAt(d + M * E, p + S * E) === "road",
                _ = w(0),
                z = w(1.35),
                A = w(-1.35);
              if (_ && z && A) return !1;
              let T = 0;
              if (_)
                T =
                  !z && A
                    ? w(0.75)
                      ? -0.4
                      : -0.8
                    : z && !A
                      ? w(-0.75)
                        ? 0.4
                        : 0.8
                      : 0;
              else
                for (let E = 0.5; E <= 1.5 && !T; E += 0.5)
                  for (let R of [1, -1])
                    if (w(E * R) && w((E + 1.05) * R)) {
                      T = (E + 0.9) * R;
                      break;
                    }
              return T ? ((m[0] = M * T), (m[1] = S * T), !0) : !1;
            }
          : null;
      (n.length || f) && t.clearOf(n, 1, f);
    }
    laneGate(t, e, s, n) {
      let i = (this.lcG ||= { lc: null, del: 0, blk: null, P: null, bid: -1 });
      if (
        ((i.P !== t || i.bid !== t.bid) &&
          ((i.P = t),
          (i.bid = t.bid),
          (i.lc = null),
          (i.del = 0),
          (i.blk = null)),
        !this.prof?.pass || !t.lcs?.length)
      )
        return ((i.blk = null), i.lc && i.del ? this._lcOff : null);
      let a = t.s;
      if (i.lc) {
        let g = i.lc,
          b = this.sideBlocked(e, g.d, s);
        ((i.blk = b),
          b
            ? (i.del = Math.max(i.del, a - g.sA + 3))
            : a > g.sA + i.del + (g.sB - g.sA) + 5 &&
              ((i.lc = null), (i.del = 0)));
      } else
        for (let g of t.lcs) {
          if (
            g.join ||
            g.sB < a ||
            g.sA > a + Math.max(18, s * 2.6) ||
            (a - g.sA) / Math.max(1, g.sB - g.sA) > 0.45
          )
            continue;
          let v = this.sideBlocked(e, g.d, s);
          v && ((i.lc = g), (i.del = Math.max(0, a - g.sA + 3)), (i.blk = v));
          break;
        }
      if (!i.lc) return null;
      let r = i.lc,
        l = 1e9;
      for (let g of t.marks)
        if (g.sLine >= r.sB - 2) {
          l = g.sLine - 1;
          break;
        }
      ((i.waitT =
        i.waitAt != null && s < 0.5
          ? (i.waitT || 0) + n
          : (i.waitAt != null && i.waitT) || 0),
        i.waitT > 6 && (i.gave = r));
      let c = i.gave === r,
        h = Math.max(6, r.sB - r.sA),
        f = r.d,
        u = r.sA,
        d = c ? r.sA + i.del : Math.min(r.sA + i.del, l - 14),
        p = (g) => ((g = Zs(g, 0, 1)), g * g * (3 - 2 * g));
      i.waitAt = i.blk && !c && r.sA + i.del > l - 14 ? l - 14 : null;
      let m = Math.max(
        14,
        Math.min(h, Math.min(r.join ? 1e9 : r.sB + 6, l) - d),
      );
      return (
        (this._lcOff = (g) => f * (p((g - u) / h) - p((g - d) / m))),
        this._lcOff
      );
    }
    overtake(t, e, s, n, i, a) {
      this.ovT = Math.max(0, (this.ovT || 0) - t);
      let r = this.lead,
        l = this.crit,
        c = this.env.roads,
        h = this.env.traffic;
      if (this.ovT > 0 || this.lcG?.lc || !c || !h?.cars || n < 2) return;
      let f = Math.min(
          this.prof.cruise,
          s.speedAhead(
            this.prof.lat,
            this.prof.dec,
            60,
            99,
            0,
            !0,
            !0,
            this.prof.limK,
            this.prof.limB,
          ),
        ),
        u =
          r.on &&
          r.gap < 45 + 20 * (this.prof.boost || 0) &&
          r.vo < f - (this.prof.passDv ?? 2.5),
        d = l.on && l.kind === "car" && l.vo < 0.5 && l.gap < 35 && l.gap > 5;
      if (!u && !d) {
        this.ovW = 0;
        return;
      }
      if (
        (this.ovW = (this.ovW || 0) + t) <
        (d ? 1.5 : (this.prof.passWait ?? 0.8))
      )
        return;
      let p = this.here(s, e);
      if (!p || p.inJ) return;
      let m = p.E,
        g = p.dir,
        b = c.lanes(m);
      if (b < 2) {
        u && !m.oneway && this.passOncoming(e, s, p, n, f);
        return;
      }
      let v = null;
      for (let R of s.marks)
        if (R.sOut > s.s) {
          v = R;
          break;
        }
      let x = v ? v.sLine - s.s : 1e9;
      if (
        x < 32 ||
        (d && x < l.gap + 25) ||
        (u &&
          r.gap > x - 5 &&
          !(v && Math.abs(v.turn) < 0.6 && !v.stop && v.ctl !== 2))
      )
        return;
      let y = Ot(m, p.s, (this._ro2 ||= {})),
        M = (e.pos.x - y.x) * y.nx + (e.pos.z - y.z) * y.nz,
        S = 0,
        w = 1e9;
      for (let R = 0; R < b; R++) {
        let P = Math.abs(c.laneV(m, g, R, y.w) - M);
        P < w && ((w = P), (S = R));
      }
      if (w > 1.2) return;
      let _ = g * (y.dz * y.nx - y.dx * y.nz),
        z = r.on ? r.vo : 0,
        A = null;
      for (let R of [S - 1, S + 1]) {
        if (R < 0 || R >= b) continue;
        let P = (c.laneV(m, g, R, y.w) - M) * _;
        if (
          Math.abs(P) < 2 ||
          this.sideBlocked(e, P, n) ||
          !this.laneClear(
            e,
            m,
            g,
            R,
            p.s,
            Math.min(300, Math.abs(s.chain[p.ci].sB - p.s) + 6),
          )
        )
          continue;
        if (v && x < 120 && Math.abs(v.turn) > 0.6) {
          let O = v.turn > 0 ? b - 1 : 0;
          if (Math.abs(R - O) > Math.abs(S - O)) continue;
        }
        let C = 99,
          I = 99,
          L = e.forward();
        for (let O of h.cars) {
          if (O.wreck || O.E !== m || O.dir !== g || O.k !== R) continue;
          let B = (O.x - e.pos.x) * L.x + (O.z - e.pos.z) * L.z;
          B > 0 && B < 70 && B < I && ((I = B), (C = O.v));
        }
        let F = Math.min(C + (I > 40 ? 6 : I > 20 ? 2 : -2), f) - (d ? 0 : z);
        F > 2 && (!A || F > A.gain) && (A = { k2: R, d: P, gain: F });
      }
      if (!A) return;
      let T = !(v && Math.abs(v.turn) > 0.6),
        E = s.chain[p.ci + 1];
      if (T && E) {
        let R = Math.min(A.k2, c.lanes(E.E) - 1);
        this.laneClear(
          e,
          E.E,
          E.dir,
          R,
          E.dir > 0 ? E.E.s0 : E.E.s1,
          Math.min(120, E.E.s1 - E.E.s0),
        ) || (T = !1);
      }
      this.rebuild(s, e, p, A.k2, T ? null : S) &&
        ((this.ovT = this.prof.passCool ?? 5),
        (this.ovW = 0),
        (this.passes = (this.passes || 0) + 1),
        this.events.push({
          type: "lane",
          side: Math.sign(A.d),
          why: d ? "around" : "pass",
        }));
    }
    passOncoming(t, e, s, n, i) {
      if (this.onc || !this.prof?.pass || (this.prof.oncPass ?? 0) <= 0) return;
      let a = this.lead,
        r = a.c?.traffic,
        l = this.env.roads,
        c = this.env.traffic,
        h = s.E,
        f = s.dir;
      if (!r || a.gap > 30 || h.lg?.med > 0.1) return;
      let u = Math.min(i, a.vo + 8),
        d = u - a.vo;
      if (d < 3) return;
      let p = r.V?.L || 4.6,
        m = Math.max(30, ((a.gap + p + 12) * u) / d),
        g = m + 30,
        b = 1e9;
      for (let w of e.marks)
        if (w.sOut > e.s) {
          b = w.sLine - e.s;
          break;
        }
      if (b < g + 12 || g > (this.prof.oncPass || 200)) return;
      let v = Ot(h, s.s, (this._ro5 ||= {})),
        x = (t.pos.x - v.x) * v.nx + (t.pos.z - v.z) * v.nz,
        y = l.laneV(h, -f, 0, v.w),
        M = f * (v.dz * v.nx - v.dx * v.nz),
        S = (y - x) * M;
      Math.abs(S) < 2 ||
        (this.laneClear(t, h, f, 0, s.s, g + 10, (w) => l.laneV(h, -f, 0, w)) &&
          (this.oncomingNear(t, h, f, g, u) ||
            ((this.onc = {
              P: e,
              bid: e.bid,
              s0: e.s + 1,
              d: S,
              end: e.s + 1 + 15 + m,
              L: r,
              t: 0,
              abort: !1,
            }),
            (this.passes = (this.passes || 0) + 1),
            this.events.push({
              type: "lane",
              side: Math.sign(S),
              why: "pass oncoming",
            }))));
    }
    oncomingNear(t, e, s, n, i) {
      let a = this.env.traffic,
        r = t.forward(),
        l = n / Math.max(i, 1) + 2;
      for (let c of a.cars) {
        if (c.wreck) continue;
        let h = c.x - t.pos.x,
          f = c.z - t.pos.z,
          u = h * r.x + f * r.z;
        if (u < -5 || u > n + 25 * l + 40) continue;
        if (
          ((c.E === e && c.dir === -s) ||
            (c.nx?.F === e && c.nx.dir === -s) ||
            (c.cv?.to?.F === e && c.cv.to.dir === -s)) &&
          u - (c.v || 0) * l < n + 25
        )
          return !0;
      }
      return !1;
    }
    passStep(t, e, s, n) {
      let i = this.onc;
      if (!i) return null;
      if (i.P !== t || i.bid !== t.bid) return ((this.onc = null), null);
      i.t += n;
      let a = t.s,
        r = e.forward(),
        l = i.L,
        c = l && !l.wreck ? (l.x - e.pos.x) * r.x + (l.z - e.pos.z) * r.z : -99,
        h = (e.S.box?.hz ?? 2.3) + (l?.V?.L || 4.6) / 2,
        f = this.crit,
        u = f.on && f.kind === "car" && f.vo < -1 && f.ttc < 5;
      if (
        (!i.abort &&
          (u ||
            (a < i.end - 15 &&
              c > -h &&
              this.oncomingNear(
                e,
                this.here(t, e)?.E || t.chain[0].E,
                this.here(t, e)?.dir || 1,
                Math.max(20, i.end - a + 15),
                Math.max(s, 5),
              ))) &&
          c > 0.3 * h &&
          ((i.abort = !0), (i.end = Math.min(i.end, a + 2))),
        !i.abort && a > i.end - 16 && c > -(h + 6) && (i.end = a + 16),
        a > i.end + 16 || i.t > 25)
      )
        return ((this.onc = null), null);
      let d = (b) => ((b = Zs(b, 0, 1)), b * b * (3 - 2 * b)),
        p = i.d,
        m = i.s0,
        g = i.end;
      return (
        (this.oncWhy = i.abort ? "pass aborted" : "passing"),
        (b) => -p * (d((b - m) / 15) - d((b - g) / 15))
      );
    }
    laneClear(t, e, s, n, i, a, r = null) {
      let l = this._world,
        c = l?.grid,
        h = this.env.roads;
      if (!c) return !0;
      let f = t.S.box,
        u = (f?.hx ?? 0.97) + 0.3,
        d = f?.hz ?? 2.27,
        p = (this._ro3 ||= {});
      (this._lcS ||= new Set()).clear();
      for (let g = 4; g <= a; g += 3) {
        let b = i + s * g;
        if (b < e.s0 || b > e.s1) break;
        Ot(e, b, p);
        let v = r ? r(p.w) : h.laneV(e, s, n, p.w),
          x = p.x + p.nx * v,
          y = p.z + p.nz * v,
          M = p.dx * s,
          S = p.dz * s;
        for (
          let _ = Math.floor((x - 4) / lo);
          _ <= Math.floor((x + 4) / lo);
          _++
        )
          for (
            let z = Math.floor((y - 4) / lo);
            z <= Math.floor((y + 4) / lo);
            z++
          ) {
            let A = i1(_, z),
              T = c.get(A);
            if (T) {
              for (let E of T)
                if (
                  !(
                    E.dead ||
                    E.t === "poly" ||
                    E.wall ||
                    (E.y1 !== void 0 && (E.y1 < p.y - 0.5 || E.y0 > p.y + 1.5))
                  ) &&
                  dE(E, x, y, M, S, u, d)
                )
                  return !1;
            }
          }
        let w = l.parked?.awake;
        if (w) {
          for (let _ of w)
            if (
              Math.abs(_.x - x) < 6 &&
              Math.abs(_.z - y) < 6 &&
              dE(_, x, y, M, S, u, d)
            )
              return !1;
        }
      }
      return !0;
    }
    here(t, e) {
      if (!t?.n || !t.chain?.length) return null;
      let s = 0,
        n = !1;
      for (let d of t.marks)
        if (!d.inner)
          if (d.sOut <= t.s) s++;
          else {
            d.sJ <= t.s && (n = !0);
            break;
          }
      s = Math.min(s, t.chain.length - 1);
      let i = t.chain[s],
        a = i.E,
        r = i.dir,
        l = (this._ro4 ||= {}),
        c = i.sA,
        h = 1e18,
        f = Math.min(i.sA, i.sB),
        u = Math.max(i.sA, i.sB);
      for (let d = f; d <= u + 0.01; d += 2) {
        Ot(a, d, l);
        let p = (l.x - e.pos.x) ** 2 + (l.z - e.pos.z) ** 2;
        p < h && ((h = p), (c = d));
      }
      for (let d = Math.max(f, c - 2); d <= Math.min(u, c + 2); d += 0.25) {
        Ot(a, d, l);
        let p = (l.x - e.pos.x) ** 2 + (l.z - e.pos.z) ** 2;
        p < h && ((h = p), (c = d));
      }
      return { ci: s, E: a, dir: r, s: c, inJ: n };
    }
    rebuild(t, e, s, n = null, i = null) {
      let a = t.chain,
        r = s.ci,
        l = Math.hypot(e.vel.x, e.vel.z),
        c = [
          { E: s.E, dir: s.dir, sA: s.s, sB: a[r].sB },
          ...a
            .slice(r + 1)
            .map((p) => ({ E: p.E, dir: p.dir, sA: p.sA, sB: p.sB })),
        ],
        h = t.endStop ? { x: t.X[t.n - 1], z: t.Z[t.n - 1] } : null,
        f = t.src,
        u = t.spotFor;
      if (!t.build(c, e, h, n, t.kind, null, i)) return !1;
      ((t.src = f), (t.spotFor = u));
      let d = e.forward();
      return (
        t.locate(
          e.pos.x,
          e.pos.z,
          l > 2 ? e.vel.x / l : d.x,
          l > 2 ? e.vel.z / l : d.z,
          6,
        ),
        !0
      );
    }
    sideBlocked(t, e, s) {
      let n = this.env.traffic;
      if (!n?.cars) return null;
      let i = t.forward(),
        a = i.x,
        r = i.z,
        l = r,
        c = -a,
        h = t.S.box,
        f = h?.hz ?? 2.27,
        u = null;
      for (let d of n.cars) {
        if (d.wreck) continue;
        let p = d.x - t.pos.x,
          m = d.z - t.pos.z;
        if (
          p * p + m * m > 3600 ||
          -Math.sin(d.heading) * a - Math.cos(d.heading) * r < 0.6
        )
          continue;
        let b = p * a + m * r,
          v = p * l + m * c;
        if (Math.abs(v - e) > 1.9 || v * e <= 0 || Math.abs(v) < 1) continue;
        let x = d.v || 0,
          y = x - s,
          M = (d.V?.L || 4.6) / 2,
          S = b > 0 ? b - f - M < 2 + Math.max(0, -y) * 1.2 + s * 0.25 : !1,
          w = b <= 0 ? -b - f - M < 3 + Math.max(0, y) * 2.5 + s * 0.35 : !1;
        (S || w) &&
          (!u || Math.abs(b) < Math.abs(u.along)) &&
          (u = { c: d, along: b, v: x });
      }
      return u;
    }
    intent(t, e) {
      let s = this.path,
        n = s.s,
        i = null;
      for (let l of s.marks)
        if (l.sOut > n && l.sJ - n < 45) {
          i = l;
          break;
        }
      let a = this.pS > 0.25 ? 1 : this.pS < -0.25 ? -1 : 0;
      if (!i || !a || (a > 0 ? i.turn < -0.5 : i.turn > 0.5) || n > i.sJ - 2) {
        this.intentT = 0;
        return;
      }
      if ((this.intentT += t) < 0.12) return;
      this.intentT = 0;
      let r = get(a)(DO(e, i.E, i.dir), i.E);
      !r ||
        (r.F === i.F && r.dir === i.dirF) ||
        (this.choice.set(i.E.id * 2 + (i.dir > 0 ? 1 : 0), {
          F: r.F,
          dir: r.dir,
        }),
        (this._replan = !0),
        (this._pT = 0));
    }
    filter(t, e, s, n) {
      let i = this.out,
        a = n.S;
      ((i.throttle = e.throttle),
        (i.brake = e.brake),
        (i.steer = e.steer),
        (i.handbrake = e.handbrake || 0),
        (i.nitro = e.nitro),
        (i.lookBack = e.lookBack),
        (i.digitalBrake = e.digitalBrake),
        (i.player = e.player),
        (this.only = !1));
      let r = this.mix;
      if (((r.w = 1), (r.p = 1), this.mode === "l5"))
        return this.auto(t, e, s, n);
      let l = n.forward(),
        c = n.vel.x * l.x + n.vel.z * l.z,
        h = Math.hypot(n.vel.x, n.vel.z),
        f = this.mode === "l4",
        u = Zs(e.steer || 0, -1, 1);
      if (
        ((this.pS =
          (this.pS || 0) + (u - (this.pS || 0)) * Math.min(1, t / 0.3)),
        this.pathStep(t, n, e),
        n.reverse && c < -0.3 && n.onGround)
      )
        return (
          (this.state = ""),
          (this.stG = u),
          f ? this.filterReverse(t, e, s, n, l, -c, h) : (this.reset(), i)
        );
      if (
        n.reverse ||
        c < -0.3 ||
        !n.onGround ||
        (c < 0.3 && !(e.throttle > 0.02))
      )
        return (
          this.reset(),
          (this.stat.areq = 0),
          (this.stG = u),
          (this.state = this.path ? "ready" : ""),
          (this.suggest = 0),
          i
        );
      ((this.rev = !1),
        (this._p = e.steer || 0),
        (this._kOv = f && this.path && this.conf > 0.5 ? this.kPath : null),
        (this._pP = null),
        this.perceive(n, s, h, c, t));
      let d = Math.abs(u) > Math.abs(this.pS) ? u : this.pS,
        p = Math.max(Math.abs(u) * 0.5, Math.abs(this.pS), Math.abs(d)),
        m =
          !(n.drift > 0.15) &&
          Math.abs(n.beta || 0) < (f ? 0.2 : 0.3) &&
          !(i.handbrake > 0.5) &&
          !(n.impactT > 0) &&
          (f && this.path ? c > -0.2 : c > 1.2),
        g =
          p < 0.12 ? Zs((c * 3.6 - 4) / 5, 0, 1) : Zs((c * 3.6 - 9) / 8, 0, 1),
        b =
          !!this.avC &&
          this.avOK &&
          m &&
          g > 0.5 &&
          Tet(this.stickFor(n, this.avK * h, c) - d, d, p) > 0.5,
        v = this.critAv,
        x = this.crit,
        y = 0,
        M = 1;
      (b &&
        v.on &&
        v.ttc >= 0.9 &&
        (M = Math.min(M, Zs((Hs.aOn * 1.5 - v.areq) / Hs.aOn, 0, 1))),
        v.on && (!b || v.ttc < 0.9) && (!x.on || v.areq > x.areq) && (x = v));
      let S = this.lead;
      if (!f) return this.filterL3(t, e, s, n, l, c, h, u, x, S);
      let w = 99;
      if (!f)
        ((this.braking = !1),
          (this.emergency = !1),
          (this.brk = 0),
          h > 2 &&
            (x.on &&
              x.areq > Hs.l3A0 &&
              (w =
                Math.max(0, x.vo) +
                Math.sqrt(2 * Hs.l3A0 * Math.max(0, x.gap - x.d0))),
            this.path &&
              this.conf > 0.3 &&
              (w = Math.min(
                w,
                this.path.speedAhead(Hs.l3Lat, 1.8, 150, 99, 0, !1, !1),
              ))),
          (this.aCmd = 0),
          (this.thrMax = 1),
          (this.suggest = w < 90 ? w : 0));
      else {
        if (x.on) {
          let O = x.areq,
            B = x.kind === "ped" ? Hs.pedOn : Hs.aOn;
          if (
            (!this.braking && O > B && c > 0.6 && (this.braking = !0),
            this.braking && (O < Hs.aOff || c < 0.6) && (this.braking = !1),
            (M = Zs((B - O) / (B - Hs.aThr * (B / Hs.aOn)), 0, 1)),
            x.gap < x.d0 + 6 &&
              x.dMin < (a.box?.hx ?? 0.97) * 0.6 &&
              (M = Math.min(
                M,
                Zs(
                  (Math.sqrt(Math.max(0, x.gap - x.d0 - 0.2)) -
                    (c - Math.max(0, x.vo))) *
                    0.6,
                  0,
                  1,
                ),
              )),
            this.braking)
          ) {
            let H = O * 1.2 + 0.3;
            ((this.emergency =
              H > (a.daComf ?? Hs.comf) * 1.02 &&
              x.ttc < 2.2 &&
              (x.dMin < (a.box?.hx ?? 0.97) * 0.6 || x.ttc < 0.6)),
              (y = this.emergency
                ? Math.min(Hs.emerg, O * 1.3 + 0.5)
                : Math.min(a.daComf ?? Hs.comf, H)));
          }
        } else this.braking = !1;
        if (
          (this.braking || (this.emergency = !1),
          (this.heldT =
            x.on && c < 0.4 && e.throttle > 0.3 && M < 0.05
              ? (this.heldT || 0) + t
              : 0),
          this.heldT > 1.2 &&
            x.vo < 0.3 &&
            x.kind !== "ped" &&
            x.kind !== "car" &&
            x.dMin > (a.box?.hx ?? 0.97) * 0.45 &&
            (M = Math.max(M, Zs((0.9 - c) * 0.5, 0, 0.3))),
          this.vPrev !== null &&
            (this.axS +=
              ((c - this.vPrev) / t - this.axS) * Math.min(1, t / 0.15)),
          (this.vPrev = c),
          e.throttle > 0.05 && !(e.brake > 0.1))
        ) {
          let O = Math.min(Hs.l5Max, this.vSight());
          if (
            ((this.aNeed = 0),
            this.path &&
              this.conf > 0.3 &&
              ((O = Math.min(
                O,
                this.path.speedAhead(Hs.l4Lat, Hs.l4Dec, 260, 99, h, !1) * 1.05,
                kv(this.path.left - 3, Hs.l5Stop),
              )),
              (this.aNeed = this.path.aNeed)),
            S.on &&
              S.vo > 0.5 &&
              (O = Math.min(
                O,
                Math.max(0, S.vo + 0.4 * (S.gap - (Hs.gap0 + Hs.head * h))),
              )),
            x.on)
          ) {
            let B = Math.max(0, x.vo),
              H = x.gap - x.d0 - 0.4;
            ((O = Math.min(O, B + kv(H, Hs.l5Stop))),
              h > B &&
                (this.aNeed = Math.max(
                  this.aNeed,
                  (h * h - B * B) / (2 * Math.max(0.25, H)),
                )));
          }
          ((this.heldP =
            x.on &&
            h < 0.4 &&
            x.vo < 0.3 &&
            x.kind !== "ped" &&
            x.kind !== "car" &&
            this.path &&
            this.path.d > 0.6
              ? (this.heldP || 0) + t
              : 0),
            this.heldP > 1.5 && ((O = Math.max(O, 0.7)), (this.aNeed = 0)),
            (O *= 1 - Hs.l4Player + Hs.l4Player * Zs(e.throttle / 0.8, 0, 1)),
            (i.throttle = 0),
            this.speedLoop(
              t,
              n,
              s,
              l,
              c,
              h,
              O,
              this.emergency
                ? Hs.emerg
                : Math.max(
                    Hs.l4Brk,
                    Math.min(a.daComf ?? Hs.comf, (x.on ? x.areq : 0) * 1.2),
                  ),
              8,
            ),
            i.throttle > e.throttle && (i.throttle = e.throttle),
            this.brk > 0.01 && ((this.only = e.brake < 0.1), (i.nitro = !1)),
            (this.thrMax = 1),
            (this.suggest = O),
            (this.fI = 0),
            (this.state = "driving"));
        } else
          ((this.thrI = 0),
            (this.fI *= Math.exp(-t / 0.5)),
            (this.aCmd = y),
            (this.thrMax = M),
            (this.suggest = 0),
            this.brakePedal(t, n, s, l, c, y, e, M));
      }
      this.calmT = p < 0.1 ? this.calmT + t : 0;
      let _ = f ? Hs.nudge : Hs.l3Av,
        z = 0;
      if (
        (this.path &&
          this.conf > 0.3 &&
          !this.smallNudge() &&
          ((this.avC = null), (this.avOK = !1), (this.recT = 0)),
        m && this.avC && this.avOK && g > 0)
      ) {
        let O = Zs(this.avK * h, -Hs.latMax / h, Hs.latMax / h);
        z = Zs(this.stickFor(n, O, c) - d, -_, _) * g;
      }
      if (this.recT > 0) {
        this.recT -= t;
        let O = n.vel.x / h,
          B = n.vel.z / h,
          H = Math.atan2(
            O * this.recZ - B * this.recX,
            O * this.recX + B * this.recZ,
          );
        Math.abs(H) < 0.006 || this.avC || this.path
          ? (this.recT = 0)
          : m &&
            g > 0 &&
            (z =
              Zs(
                this.stickFor(
                  n,
                  Zs(-2.2 * H, -Hs.latMax / h, Hs.latMax / h),
                  c,
                ) - d,
                -_,
                _,
              ) * g);
      }
      let A = Tet(z, d, p);
      ((z *= A),
        (this.avYield = this.avC && A < 0.05 && p > 0.1 ? this.avYield + t : 0),
        this.avYield > 0.3 && ((this.avC = null), (this.avOK = !1)),
        m || (z = 0),
        (this.nud += Zs(z - this.nud, -Hs.slew * t, Hs.slew * t)));
      let T = u,
        E = 1;
      if (this.path && this.conf > 0 && m && !this.avC) {
        let O = this.conf;
        if (((T = u + (this.g - u) * O), f))
          E =
            Hs.l4Player * Zs(p / 0.15, 0, 1) +
            (1 - Hs.l4Player) * Zs((p - Hs.l4Hard) / 0.3, 0, 1);
        else {
          let B = this.g * u < 0 ? Zs((Math.abs(u) - 0.25) / 0.3, 0, 1) : 0;
          E = Hs.l3Player + (1 - Hs.l3Player) * B;
        }
      }
      let R = E < 1;
      this.stG = R ? u * E + T * (1 - E) : u;
      let P = this.stG + this.nud,
        C = p > Hs.l4Hard;
      ((i.steer = Zs(P, -1, 1)),
        f && !C && (i.player = !1),
        (this.lk = this.stG - u),
        (r.w = E));
      let I = Math.abs(this.stG - u) / 0.08,
        L = Math.max(
          this.brk > 0.03 ? 1 : 0,
          e.throttle > M + 0.05 ? 1 : 0,
          Math.min(1, Math.abs(this.nud) / 0.06),
          Math.min(1, I) * (f ? 0.7 : 1),
        );
      ((this.active +=
        (L - this.active) * Math.min(1, t * (L > this.active ? 12 : 3))),
        f &&
          this.conf > 0.5 &&
          !C &&
          m &&
          R &&
          (this.active = Math.max(this.active, 0.6)),
        (this.state =
          this.active > 0.25
            ? f && this.conf > 0.5
              ? "driving"
              : "guiding"
            : this.path
              ? "ready"
              : ""),
        (r.p = f
          ? e.throttle > 0.05 && !(e.brake > 0.1)
            ? Hs.l4Player
            : this.brk > (e.brake || 0) + 0.01
              ? 0
              : 1
          : 1));
      let F = this.stat;
      return (
        (F.gap = x.on ? x.gap : 0),
        (F.areq = x.on ? x.areq : 0),
        (F.kind = x.on ? x.kind : ""),
        (F.aCmd = y),
        (F.nudge = this.nud),
        (F.lk = this.lk),
        (F.thrMax = M),
        (F.emergency = this.emergency),
        i
      );
    }
    filterL3(t, e, s, n, i, a, r, l, c, h) {
      let f = this.out,
        u = n.S,
        d = this.mix;
      ((this.braking = !1),
        (this.emergency = !1),
        (this.avC = null),
        (this.nud = 0));
      let p = l === 0 || Math.abs(l) === 1,
        m = this.pA || 0;
      if (p) {
        let z = l * m < 0 ? 12 : Math.abs(l) > Math.abs(m) ? Hs.l3Up : Hs.l3Dn;
        m += Zs(l - m, -z * t, z * t);
      } else m = l;
      this.pA = m;
      let g = m,
        b = 0,
        v = (e.handbrake || 0) > 0.5 || n.drift > 0.3 || n.impactT > 0;
      if (
        ((this.calm3 = Math.abs(l) < 0.05 ? (this.calm3 || 0) + t : 0),
        r > 2.5 && n.onGround && !v)
      ) {
        let z = Math.max(a, 0.1),
          A = Math.max(r, 3),
          T = this.pS || 0,
          E = Math.sign(T),
          R = n.pos.x,
          P = n.pos.z,
          C = r > 2 ? n.vel.x / r : -Math.sin(n.psi),
          I = r > 2 ? n.vel.z / r : -Math.cos(n.psi);
        if (!this.tP && Math.abs(T) > 0.3 && m * T > 0) {
          let O = this.path,
            B = this.lane3,
            H = (N) => {
              for (let D of N.marks) if (D.sOut >= N.s) return D;
              return null;
            };
          (O &&
          this.conf > 0.3 &&
          O.d < 2.5 &&
          Math.abs(O.psi) < 0.7 &&
          this.turnNear(O, E)
            ? ((this.tP = O), (this.tM = H(O)))
            : B &&
              this.confL > 0.3 &&
              B.d < 2.5 &&
              Math.abs(B.psi) < 0.7 &&
              this.turnNear(B, E) &&
              ((this.tP = B), (this.tM = H(B))),
            (this.tSide = E),
            (this.tHoldT = 0));
        }
        let L = this.tP,
          F = L && (m * this.tSide > 0.3 || T * this.tSide > 0.2);
        if (L && F && L.locate(R, P, C, I, 6) && L.d < 3.5) {
          let B =
              !this.tM || L.s > this.tM.sOut + 1
                ? Zs(1 - ((this.tHoldT += t) - 1.5) / 0.5, 0, 1)
                : 1,
            H =
              Zs((-L.e * this.tSide - 0.4) / 0.8, 0, 1) *
              (m * this.tSide > 0 ? 1 : 0);
          B > 0
            ? ((b = B * (1 - H)),
              (g =
                m +
                (this.stickFor(
                  n,
                  Zs(this.pursue(L, R, P, C, I, r), -0.25, 0.25) * A,
                  z,
                ) -
                  m) *
                  B *
                  (1 - H)))
            : (this.tP = null);
        } else L && (this.tP = null);
        if (!b) {
          let O = this.lane3,
            B = Zs((this.calm3 - 0.5) / 0.5, 0, 1);
          if (
            O &&
            B > 0 &&
            this.confL > 0.3 &&
            O.d < 2.5 &&
            Math.abs(O.psi) < 0.5
          ) {
            let N = -O.curvAt(Math.min(6, r * 0.3), 2),
              D = Math.abs(N) < 0.03 ? N : 0,
              U = Math.max(4.5, 3 + 0.45 * r),
              G = Math.abs(O.e) > 1.1 ? O.e - Math.sign(O.e) * 1.1 : 0;
            ((g =
              m +
              (this.stickFor(n, (D - (0.8 * O.psi) / U - G / (U * U)) * A, z) -
                m) *
                B *
                this.confL),
              (b = B * this.confL));
          }
          let H = n.beta || 0;
          if (Math.abs(H) > 0.08 && r > 5) {
            let N = this.stickFor(n, 1, z),
              D = N > 0.001 ? g / N : 0;
            g +=
              Zs(this.stickFor(n, (D - n.r) * Hs.l3Yaw, z), -0.4, 0.4) *
              Zs((Math.abs(H) - 0.08) / 0.1, 0, 1);
          }
        }
        Math.abs(l) > 0.5 &&
          g * l < 0 &&
          Math.abs(n.beta || 0) < 0.12 &&
          (g = 0);
      }
      ((f.steer = Zs(g, -1, 1)),
        (f.player = !0),
        (this.stG = f.steer),
        (this.lk = f.steer - l),
        (this.snap = b),
        (f.throttle = e.throttle || 0));
      let x = e.brake || 0,
        y = 0,
        M = 1e9,
        S = !1;
      if (x > 0.05 && a > 1) {
        if (
          (c.on &&
            c.areq > 0.3 &&
            ((y = Math.max(y, c.areq * 1.15 + 0.3)),
            (M = Math.min(M, Math.max(0, c.vo)))),
          h.on && h.vo > 0.5 && r > h.vo)
        ) {
          let T = Math.max(1, h.gap - Hs.gap0 - 0.8 * h.vo);
          ((y = Math.max(y, (r * r - h.vo * h.vo) / (2 * T))),
            (M = Math.min(M, h.vo)));
        }
        let z = this.lane3 || this.path;
        if (z && (this.confL > 0.3 || this.conf > 0.3)) {
          let T = z.speedAhead(Hs.l3BLat, 3, 120, 99, r, !1, !1);
          T < r + 0.5 &&
            ((y = Math.max(y, z.aNeed * 1.05, (r - T) * 0.8)),
            (M = Math.min(M, T)));
        }
        let A =
          e.digitalBrake && u.comfortBrake
            ? u.comfortBrake
            : x * u.mu * DM * 0.9;
        S = y > A + 0.5 && r > M + 0.3;
      }
      (S
        ? ((f.brake = 0),
          (f.digitalBrake = !1),
          (this.emergency = y > 6),
          this.brakePedal(
            t,
            n,
            s,
            i,
            a,
            Math.min(Hs.emerg, y * 1.1 + 0.3),
            { brake: 0 },
            1,
          ),
          (f.brake = Math.max(f.brake, x)),
          f.brake > 0.01 && (f.throttle = 0))
        : ((this.brk = 0),
          (this.bI *= Math.exp(-t / 0.3)),
          (f.brake = x),
          (f.digitalBrake = e.digitalBrake)),
        (this.only = !1));
      let w = Math.max(b, S ? 1 : 0, Math.min(1, Math.abs(f.steer - m) / 0.15));
      ((this.active +=
        (w - this.active) * Math.min(1, t * (w > this.active ? 12 : 3))),
        (this.state =
          this.active > 0.25 ? "guiding" : this.path ? "ready" : ""),
        (this.aCmd = S ? y : 0),
        (this.thrMax = 1),
        (this.suggest = M < 1e8 ? M : 0),
        (d.w = 1 - Math.min(1, Math.abs(f.steer - l))),
        (d.p = S ? 0.5 : 1));
      let _ = this.stat;
      return (
        (_.gap = c.on ? c.gap : 0),
        (_.areq = c.on ? c.areq : 0),
        (_.kind = c.on ? c.kind : ""),
        (_.aCmd = this.aCmd),
        (_.nudge = 0),
        (_.lk = this.lk),
        (_.thrMax = 1),
        (_.emergency = this.emergency),
        f
      );
    }
    turnNear(t, e) {
      if (!t || !e) return !1;
      for (let s of t.marks)
        if (!(s.sOut < t.s))
          return s.sJ - t.s > 15 ? !1 : e > 0 ? s.turn < -0.5 : s.turn > 0.5;
      return !1;
    }
    turnSoon(t) {
      let e = this.lane3;
      if (!e || !t) return !1;
      for (let s of e.marks)
        if (!(s.sOut < e.s))
          return s.sJ - e.s > 12 ? !1 : t > 0 ? s.turn < -0.5 : s.turn > 0.5;
      return !1;
    }
    brakePedal(t, e, s, n, i, a, r, l) {
      let c = e.S,
        h = this.out,
        f = 0;
      if (a > 0 && i > 0.6) {
        let p = e.gSlope(e.pos.x, e.pos.z, s),
          m = Math.sqrt(1 + p.dx * p.dx + p.dz * p.dz),
          g = (-DM * (p.dx * n.x + p.dz * n.z)) / m,
          b = c.ev ? 4 * Math.min(c.regen, Math.abs(i) * 64) : 0;
        (this.mode === "l5"
          ? (this.bI = Zs(this.bI + (a + this.axS) * t * 0.5, -0.15, 0.6))
          : (this.bI = Zs(this.bI + (a + (e.ax || 0)) * t * 0.08, -0.15, 0.25)),
          (f =
            a >= Hs.emerg - 0.01
              ? 1
              : Zs(
                  (c.mass * (a + g) * c.wheelR - b) /
                    (2 * (c.brakeF + c.brakeR)) +
                    this.bI,
                  0.02,
                  1,
                )));
      } else this.bI *= Math.exp(-t / 0.3);
      let u = this.emergency
          ? 10
          : this.mode === "l5" && this.prof?.pass
            ? 5
            : 2.4,
        d = 3.5;
      ((this.brk += Zs(f - this.brk, -d * t, u * t)),
        i < 0.6 && (this.brk = 0),
        (this.brk > 0.005 || l < 1) &&
          ((h.throttle = this.brk > 0.01 ? 0 : Math.min(h.throttle, l)),
          this.brk > h.brake &&
            ((this.only = h.brake < 0.1),
            (h.brake = this.brk),
            (h.digitalBrake = h.digitalBrake && r.brake >= this.brk)),
          this.brk > 0.01 && (h.nitro = !1)));
    }
    auto(t, e, s, n) {
      let i = this.out,
        a = n.S;
      if (
        e.player !== !1 &&
        (Math.abs(e.steer || 0) > 0.25 ||
          (e.brake || 0) > 0.2 ||
          (e.handbrake || 0) > 0.5)
      )
        return (this.takeOver("input"), this.filter(t, e, s, n));
      ((i.throttle = 0),
        (i.brake = 0),
        (i.steer = 0),
        (i.handbrake = 0),
        (i.nitro = !1),
        (i.digitalBrake = !1),
        (i.player = !1));
      let r = n.forward(),
        l = n.vel.x * r.x + n.vel.z * r.z,
        c = Math.hypot(n.vel.x, n.vel.z),
        h = e.player !== !1 ? Zs(((e.throttle || 0) - 0.05) / 0.75, 0, 1) : 0;
      this.gasS =
        (this.gasS || 0) + (h - (this.gasS || 0)) * Math.min(1, t / 0.4);
      let f = k2[this.profile] || k2[$O],
        u = this.gasS,
        d = (this.prof = f.pass ? kMt((this._pb ||= {}), f, SMt, u) : f);
      this.boost = f.pass && u > 0.15;
      let p = f.pass ? d.cruise : d.cruise + (Hs.l5Max - d.cruise) * u,
        m = f.pass ? d.lat : d.lat + (d.latGas - d.lat) * u,
        g = f.pass ? d.acc : d.acc + (d.accGas - d.acc) * u;
      ((this.pS = 0),
        (this.l5T += t),
        this.avoidT !== void 0 &&
          this.l5T - this.avoidT > 60 &&
          ((this.env.router || this.env.rides?.())?.avoid?.clear(),
          (this.avoidT = void 0)),
        this.softOK && this.l5T - (this.recT0 || 0) > 60 && (this.softOK = !1),
        (this.clearOut = Math.max(0, (this.clearOut || 0) - t)),
        (this._world = s));
      let b = this.pathStep(t, n, e),
        v = this.env.traffic;
      if (
        (this.vPrev !== null &&
          (this.axS +=
            ((l - this.vPrev) / t - this.axS) * Math.min(1, t / 0.15)),
        (this.vPrev = l),
        this.recov)
      )
        return this.recover(t, n, s, r, l, c);
      if (n.reverse)
        return (
          (this.thrI = 0),
          c < 1.4 && (i.throttle = 0.15),
          (this.state = "driving"),
          i
        );
      if (!n.onGround) return ((this.state = "driving"), i);
      let x = this.env.rides?.()?.state,
        y =
          x === "boarding" ||
          x === "alighting" ||
          x === "summary" ||
          this.arrived;
      ((this.rev = !1),
        (this._p = 0),
        (this._kOv = b ? this.kPath : null),
        (this._pP =
          b && b.d < 2.5 && Math.abs(b.psi) < 0.7 && b.left > 3 ? b : null),
        this.perceive(n, s, c, Math.max(l, 0), t),
        this.smallNudge() || ((this.avC = null), (this.avOK = !1)));
      let M = a.box,
        S = (M?.off ?? 0.15) + (M?.hz ?? 2.27),
        w = 0,
        _ = "",
        z = null,
        A = Math.max(Hs.l5Brk, (d.stop || 0) + 0.8);
      ((this.aNeed = 0), (this.aNeedObs = 0));
      let T = (P, C, I, L = !1) => {
        let F = C + kv(P, L ? Math.min(d.stop, 3.5) : d.stop);
        if ((F < w && ((w = F), (_ = I)), c > C)) {
          let O = (c * c - C * C) / (2 * Math.max(0.25, P));
          (O > this.aNeed && (this.aNeed = O),
            L && O > this.aNeedObs && (this.aNeedObs = O));
        }
      };
      if (!b) _ = this.env.roads?.laneV ? "no road" : "unavailable";
      else if (y)
        _ =
          x === "boarding"
            ? "pickup"
            : x === "alighting" || x === "summary"
              ? "drop-off"
              : "arrived";
      else {
        ((w = f.pass
          ? b.speedAhead(
              m,
              d.dec,
              300,
              Math.min(p, this.vSight()),
              c,
              d.limits,
              d.grades,
              d.limK,
              d.limB,
            )
          : b.speedAhead(
              m,
              d.dec,
              280,
              Math.min(p, this.vSight()),
              c,
              d.limits && u < 0.95,
              !0,
              d.limK + 0.3 * u,
              d.limB + 6 * u,
            )),
          (this.aNeed = b.aNeed));
        let P = b.left - (b.endStop ? 0.5 : 3);
        if (
          (P < 60 && T(P, 0, b.endStop ? "kerb" : "dead end"),
          b.endStop &&
            P < 1.2 &&
            c < 0.5 &&
            b === this.rp &&
            this.dest &&
            this.mode === "l5" &&
            ((this.arrived = !0),
            (this.dest = null),
            (this.destRoute = null),
            this.events.push({ type: "arrived" })),
          this.yc)
        ) {
          let B = this.yc;
          ((B.t -= t),
            B.t <= 0 || B.c.wreck || Math.hypot(B.c.x - B.x, B.c.z - B.z) > 6
              ? (this.yc = null)
              : T(0, 0, "giving way"));
        }
        let C = this.junctions(b, c, S, t);
        if (
          ((z = C.claim),
          C.vHold < w && (w = C.vHold),
          C.vGlide > 2.5 && C.vGlide <= kv(C.g, d.stop)
            ? C.vGlide < w && ((w = C.vGlide), (_ = "timing the light"))
            : C.g < 1e8 && T(C.g + (C.vEnd ? 1.2 : 0), C.vEnd || 0, C.why),
          C.jCaps)
        ) {
          for (let B of C.jCaps)
            if (!(C.g < B.g)) {
              let H = B.v + kv(B.g, d.dec);
              H < w && ((w = H), (_ = _ || "junction"));
            }
        }
        b.join && b.s < b.join && this.mergeBlocked(n, c) && T(0, 0, "merging");
        let I = this.lead;
        if (I.on && I.vo > 0.5) {
          let B = Math.max(0, I.vo + 0.4 * (I.gap - (d.gap0 + d.head * c)));
          B < w && ((w = B), (_ = _ || "following"));
        }
        let L = this.crit;
        if (this.narrow && this.narrow.v < w) {
          let B = this.narrow,
            H = B.v + kv(B.g, 3);
          H < w && ((w = H), (_ = _ || "narrow"));
        }
        if (
          (L.on &&
            (T(
              L.gap - L.d0 - 0.4,
              Math.max(0, L.vo),
              L.kind === "ped"
                ? "pedestrian"
                : L.kind === "car"
                  ? "traffic"
                  : "obstacle",
              !0,
            ),
            L.areq > A && (A = Math.min(Hs.emerg, L.areq * 1.3 + 0.5))),
          d.pass && !y && this.overtake(t, n, b, c, w, C),
          this.onc?.abort && this.onc.L && !this.onc.L.wreck)
        ) {
          let B = Math.max(0, this.onc.L.v - 2.5);
          B < w && ((w = B), (_ = "pass aborted"));
        } else this.onc && !_ && (_ = "passing");
        {
          let B = this.lcG;
          if (
            B?.lc &&
            B.blk &&
            B.blk.along > -(S + 1.5) &&
            B.P === b &&
            !(f.pass && B.blk.v < c - 1 && B.blk.along > -S)
          ) {
            let H = Math.max(0, B.blk.v - 1.5);
            H < w && ((w = H), (_ = "merging"));
          }
          B?.lc &&
            B.waitAt != null &&
            B.P === b &&
            T(B.waitAt - b.s, 0, "merging");
        }
        this.clearOut > 0 &&
          z &&
          c > 2 &&
          !(L.on && L.kind !== "car" && L.gap < 8) &&
          ((w = Math.max(
            w,
            Math.min(c, b.speedAhead(Hs.l5Lat, Hs.l5Dec, 60, Hs.l5Max)),
          )),
          (this.aNeed = 0),
          (_ = "clearing"));
        let F = L.on && L.kind === "car" ? L.c?.traffic : null,
          O = F && -Math.sin(F.heading) * r.x - Math.cos(F.heading) * r.z < 0.7;
        if (
          ((this.gridT =
            O && c < 0.3 && (F.v || 0) < 0.3 ? (this.gridT || 0) + t : 0),
          (this.stuckT =
            (w < 0.3 &&
              c < 0.3 &&
              L.on &&
              L.vo < 0.3 &&
              L.kind !== "car" &&
              L.kind !== "ped" &&
              !(C.why && C.g < L.gap + 4)) ||
            this.gridT > 2.4
              ? this.stuckT + t
              : 0),
          this.stuckT > 1 &&
            this.dest &&
            b === this.rp &&
            b.endStop &&
            b.left < 14 &&
            ((this.arrived = !0),
            (this.dest = null),
            (this.destRoute = null),
            this.events.push({ type: "arrived" })),
          d.pass && this.stuckT > 1.6 && !this.arrived)
        ) {
          if (
            ((this.recN =
              this.recT0 !== void 0 && this.l5T - this.recT0 < 60
                ? (this.recN || 0) + 1
                : 1),
            this.recN === 1 && (this.recT0 = this.l5T),
            (this.softOK = this.recN >= 2),
            this.softOK && ((this.softX = n.pos.x), (this.softZ = n.pos.z)),
            this.recN >= 2 &&
              this.recN <= 4 &&
              this.gridT > 2.4 &&
              this.l5T - (this.avoidT ?? -99) > 15)
          ) {
            let B = this.env.router || this.env.rides?.();
            if (B) {
              let H = this.here(b, n),
                N = b.chain[Math.min(b.chain.length - 1, (H?.ci ?? 0) + 1)]?.E,
                D = H?.E;
              ((B.avoid ||= new Set()),
                N && B.avoid.add(N),
                D && D !== N && b.chain.length > 1 && B.avoid.add(D),
                (this.avoidT = this.l5T));
              let U = this.env.route?.();
              ((this.destRoute = null),
                (this.lostT = 9),
                U && this.ownRoute(U, n, n.pos.x, n.pos.z, r.x, r.z));
            }
          }
          if (this.recN <= 3)
            return (
              this.startRecovery(n, L),
              (this.stuckT = 0),
              this.recover(t, n, s, r, l, c)
            );
        }
        if (this.stuckT > 8)
          return (this.takeOver("blocked"), this.filter(t, e, s, n));
      }
      if (
        (v && ((v.playerJ = z), (v.playerAuto = !0)),
        (this.claim = z),
        this.softOK &&
          Math.hypot(n.pos.x - this.softX, n.pos.z - this.softZ) < 25 &&
          (w = Math.min(w, 2.5)),
        b && (this.turnTo || Math.abs(b.psi) > 0.6 || b.d > 1.5))
      ) {
        let P = Math.max(2, 7 - 5 * Math.abs(b.psi) - 2 * Math.max(0, b.d - 1));
        P < w && ((w = P), (_ = _ || "rejoining"));
      }
      if (
        (this.speedLoop(t, n, s, r, l, c, w, A, g, d),
        b &&
          (i.steer = Zs(
            this.avC && this.avOK
              ? this.stickFor(n, this.avK * Math.max(c, 3), Math.max(l, 0.1))
              : this.g,
            -1,
            1,
          )),
        d.pass)
      ) {
        let P = 0.04 + 0.004 * c;
        ((this.stS =
          this.stS === void 0
            ? i.steer
            : this.stS + (i.steer - this.stS) * Math.min(1, t / P)),
          (i.steer = this.stS));
      }
      ((this.why = _),
        (this.suggest = w),
        (this.mix.w = 0),
        (this.mix.p = 0),
        (this.state =
          y || this.arrived || (_ && w < 0.5)
            ? "waiting"
            : b
              ? "driving"
              : "waiting"),
        (this.active += ((b ? 1 : 0.3) - this.active) * Math.min(1, t * 4)));
      let E = this.stat,
        R = this.crit;
      return (
        (E.gap = R.on ? R.gap : 0),
        (E.areq = R.on ? R.areq : 0),
        (E.kind = R.on ? R.kind : ""),
        (E.aCmd = this.aCmd),
        (E.nudge = 0),
        (E.lk = 0),
        (E.thrMax = 1),
        (E.emergency = this.emergency),
        i
      );
    }
    startRecovery(t, e) {
      let s = 0,
        n = e.c,
        i = n
          ? n.t === "poly"
            ? (n.bb[0] + n.bb[2]) / 2
            : n.t === "box"
              ? (n.x0 + n.x1) / 2
              : n.x
          : NaN,
        a = n
          ? n.t === "poly"
            ? (n.bb[1] + n.bb[3]) / 2
            : n.t === "box"
              ? (n.z0 + n.z1) / 2
              : n.z
          : NaN;
      if (Number.isFinite(i)) {
        let l = t.forward(),
          c = (i - t.pos.x) * l.z - (a - t.pos.z) * l.x;
        s = Math.abs(c) > 0.25 ? Math.sign(c) : 0;
      }
      (!s && this.path && (s = this.path.e > 0 ? -1 : 1),
        (this.recov = {
          t: 0,
          x: t.pos.x,
          z: t.pos.z,
          side: s,
          dist: 3.2 + this.recN * 0.8,
          done: !1,
        }));
      let r = n?.traffic;
      ((this.yc = r ? { c: r, x: r.x, z: r.z, t: 8 } : null),
        this.events.push({ type: "recover" }));
    }
    recover(t, e, s, n, i, a) {
      let r = this.recov,
        l = this.out;
      ((r.t += t),
        (l.throttle = 0),
        (l.brake = 0),
        (l.handbrake = 0),
        (l.digitalBrake = !1),
        (l.nitro = !1),
        (l.steer = 0),
        (l.player = !1));
      let c = Math.max(0, -i);
      ((this.rev = !0),
        (this._kOv = null),
        (this._pP = null),
        this.perceive(e, s, a, c, t),
        (this.rev = !1));
      let h = Math.hypot(e.pos.x - r.x, e.pos.z - r.z),
        f = this.crit;
      if (
        (!r.done &&
          (r.t > 7 ||
            h > r.dist ||
            (e.reverse && f.on && f.gap < f.d0 + 0.3 + (c * c) / 3)) &&
          (r.done = !0),
        !r.done)
      )
        ((l.steer = r.side * 0.75),
          (l.brake = e.reverse ? Zs(0.2 + (1.3 - c) * 0.3, 0.04, 0.45) : 0.35));
      else if (
        (e.reverse && c > 0.2
          ? (l.throttle = 0.3)
          : e.reverse && (l.throttle = 0.15),
        !e.reverse || r.t > 12)
      ) {
        ((this.recov = null), (this.thrI = 0), (this._pT = 0));
        let u = this.path,
          d = u && this.here(u, e);
        (d &&
          !d.inJ &&
          u.locate(e.pos.x, e.pos.z, -Math.sin(e.psi), -Math.cos(e.psi), 6) &&
          this.rebuild(u, e, d)) ||
          ((this.lostT = 9),
          this.lp && this.lp.clear(),
          this.rp?.n && (this.rp.lost = !0),
          (this.destRoute = null));
      }
      return (
        (this.why = "recovering"),
        (this.state = "driving"),
        (this.suggest = 0),
        (this.mix.w = 0),
        (this.mix.p = 0),
        l
      );
    }
    vSight() {
      return Math.sqrt(2 * Hs.sightA * (Hs.sMax - 10));
    }
    speedLoop(t, e, s, n, i, a, r, l, c = Hs.l5Acc, h = null) {
      let f = this.out,
        u = e.S,
        d = Zs(
          (r - a) * (r < a ? 1.1 : h ? h.gain : 0.8),
          -l,
          c * Zs(0.6 + a / 8, 0, 1),
        ),
        p = h ? h.brkOn : 0.9,
        m = h ? h.brkK : 1.15;
      if (
        (this.aNeed > p && (d = Math.min(d, -Math.min(l, this.aNeed * m))),
        h &&
          this.mode === "l5" &&
          this.aNeedObs > 1.8 &&
          (d = Math.min(d, -Math.min(l, this.aNeedObs * 1.08))),
        h && h.jerk)
      ) {
        let b =
            l > Math.max(Hs.l5Brk, (h.stop || 0) + 0.8) + 0.01 ||
            -d > Math.max(4.5, (h.stop || 0) + 1.2),
          v = b ? h.jerkE : h.jerk;
        ((this.aJ =
          this.aJ === void 0
            ? d
            : this.aJ +
              Zs(d - this.aJ, -v * t, (this.aJ < -0.3 ? v * 1.5 : v) * t)),
          d < this.aJ - 0.6 && b && (this.aJ = d),
          (d = this.aJ));
      }
      let g = this.thrI < 0.01 && this.axS > d + 0.3;
      if (r < 0.25 && i < 0.5) {
        ((this.thrI = 0), (this.aCmd = 0), (this.brk = 0));
        return;
      }
      (!g && d > -2.2
        ? ((this.thrI = Zs(this.thrI + (d - this.axS) * 0.6 * t, 0, 1)),
          (this.hillK =
            d > 0.3 && a < 1.5 && this.axS < 0.25
              ? Math.min(0.7, (this.hillK || 0) + t * 0.35)
              : Math.max(0, (this.hillK || 0) - t * 0.5)),
          (f.throttle = Zs(
            this.thrI + 0.08 * d + 0.04 * (d - this.axS),
            0,
            Math.min(1, (h?.launch ?? 0.3) + 0.12 * a + this.hillK),
          )),
          (this.aCmd = 0),
          (this.emergency = !1),
          this.brakePedal(t, e, s, n, i, 0, { brake: 0 }, 1))
        : ((this.thrI = Math.max(0, this.thrI - t * 2)),
          (this.aCmd = -d),
          (this.emergency = -d > Hs.comf * 1.05),
          this.brakePedal(t, e, s, n, i, -d, { brake: 0 }, 0),
          this.brk > 0.01 && (f.throttle = 0)),
        r < 0.25 && i < 0.8 && (f.throttle = 0));
    }
    junctions(t, e, s, n) {
      let i = this.env.roads,
        a = this.env.traffic,
        r = a?.t ?? 0,
        l = t.s,
        c = { g: 1e9, why: "", claim: null },
        h = !!this.prof?.pass;
      for (let f of t.marks) {
        if (f.sOut + 2 < l) continue;
        if (f.sLine - l > 150) break;
        let u = f.sLine - l - s;
        if (
          (h && f.go && f.ctl === 2 && u > 1.2 && e < 2.5 && (f.go = !1),
          u < (f.ctl === 2 && uE ? -4 : f.stop && !f.done ? -3 : -0.6) || f.go)
        ) {
          ((l + s > f.sJ - 2 || (f.go && u < 4)) &&
            l < f.sOut + 1 &&
            (c.claim = f.J),
            h &&
              l < f.sOut &&
              (f.sOut - f.sJ > 20 || this.busyOther(f.J)) &&
              (c.jCaps ||= []).push({
                g: 0,
                v: Math.min(f.E.vmax || 9, f.F?.vmax || 9) * 1.1 + 2,
              }));
          continue;
        }
        let d = !1,
          p = "";
        if (f.ctl === 2 && f.leg && uE) {
          (f.leg.ph
            ? u < Math.max(35, e * 7)
            : u < 90 && u < Math.max(e, 3) * 7) && i.call?.(f.J, f.leg.ph, r);
          let m = i.signal(f.J, f.leg.ph, r);
          if (m === 2 && h && f.turn > 0.6 && !f.rtorNo) {
            if (
              (u < 1.8 && e < 0.35 && (f.rtW = (f.rtW || 0) + n),
              (f.rtW || 0) > 0.8 &&
                !this.busyOther(f.J) &&
                this.clearCross(f, 4) &&
                !(this.crit.on && this.crit.kind === "ped"))
            ) {
              ((f.go = !0), (this.rtorJ = f.J));
              continue;
            }
            ((d = !0), (p = "red light"));
          } else if (m === 2) {
            if (((d = !0), (p = "red light"), h && u > 6)) {
              let g = this.sigT(f, r).tG;
              g < 40 &&
                (c.vGlide = Math.min(
                  c.vGlide ?? 99,
                  u / (g + 1.2),
                  Math.min(f.E.vmax || 9, f.F?.vmax || 9) * 0.9,
                ));
            }
          } else if (m === 1)
            if (
              ((f.yT0 === void 0 || r - f.yT1 > 1) && (f.yT0 = r),
              (f.yT1 = r),
              f.turn < -0.6 && f.leftWait && u < 4 && e < 1.5 && r - f.yT0 < 1)
            )
              this.clearOncoming(f, !0) && (this.mvX ?? 9) > 2
                ? (f.go = !0)
                : ((d = !0), (p = "yellow light"));
            else if (h) {
              let g = this.toRed(f, r),
                b = u > 0 ? u / Math.max(e, 0.5) : 0,
                v = (e * e) / (2 * Math.max(0.3, u)),
                x = (this.prof?.stop || 4) + 2.5;
              f.yStop && v < 9
                ? ((d = !0), (p = "yellow light"))
                : u <= 0.3 ||
                    (b < g - 0.35 &&
                      (u + (f.sOut - f.sLine) + 5) / Math.max(e, 0.5) <
                        g + 1) ||
                    v > x
                  ? ((u < 2.5 || v > x) && (f.go = !0),
                    (c.vHold = Math.max(e, 3)))
                  : ((d = !0), (p = "yellow light"), (f.yStop = !0));
            } else
              (e * e) / (2 * Math.max(0.3, u)) < 4
                ? ((d = !0), (p = "yellow light"))
                : (f.go = !0);
          else if (h && u > 0.3 && !f.go) {
            let g = this.sigT(f, r),
              b = g.tR,
              v = u / Math.max(e, 0.5),
              x = (e * e) / (2 * Math.max(0.3, u)),
              y = (u + (f.sOut - f.sLine) + 5) / Math.max(e, 0.5);
            (u > 12 &&
              u / Math.max(e, Math.min(f.E.vmax || 9, f.F?.vmax || 9) * 1.3) >
                b + 0.3 &&
              g.tN < 40 &&
              (c.vGlide = Math.min(
                c.vGlide ?? 99,
                u / (g.tN + 1.2),
                Math.min(f.E.vmax || 9, f.F?.vmax || 9) * 0.9,
              )),
              b < 7 && v > b - 0.35 && x < 3.2 && u > 4
                ? ((d = !0), (p = "stale green"))
                : b < 7 && y > b + 0.8 && u > 2
                  ? x < (this.prof?.stop || 4) + 1
                    ? ((d = !0), (p = "stale green"))
                    : (c.vHold = Math.max(e, 3))
                  : f.turn < -0.6 &&
                      u < 25 &&
                      !(f.lwT > 20 && this.clearOncoming(f, !0)) &&
                      !this.clearOncoming(f)
                    ? ((d = !0),
                      (p = "oncoming"),
                      u < 4 &&
                        e < 1 &&
                        ((f.leftWait = !0), (f.lwT = (f.lwT || 0) + n)))
                    : u < 3.5 &&
                      ((f.go =
                        ((this.mvX ?? 9) > 2 || f.lwT > 20) &&
                        (f.turn > -0.6 ||
                          (!this.busyOther(f.J) &&
                            this.clearOncoming(f, f.lwT > 20)))),
                      !f.go &&
                        (this.mvX ?? 9) <= 2 &&
                        ((d = !0), (p = "crossing traffic"))));
          } else
            f.turn < -0.6 &&
            u < 25 &&
            !(f.lwT > 20 && this.clearOncoming(f, !0)) &&
            !this.clearOncoming(f)
              ? ((d = !0),
                (p = "oncoming"),
                u < 4 &&
                  e < 1 &&
                  ((f.leftWait = !0), (f.lwT = (f.lwT || 0) + n)))
              : u < 3.5 &&
                ((f.go =
                  ((this.mvX ?? 9) > 2 || f.lwT > 20) &&
                  (f.turn > -0.6 ||
                    (!this.busyOther(f.J) &&
                      this.clearOncoming(f, f.lwT > 20)))),
                !f.go &&
                  (this.mvX ?? 9) <= 2 &&
                  ((d = !0), (p = "crossing traffic")));
        } else if (f.stop && uE) {
          let m = this.prof?.roll || 0;
          (m &&
            !f.done &&
            !f.noRoll &&
            u < 45 &&
            (!(
              !this.busyOther(f.J) &&
              this.clearCross(f, u / Math.max(m, e, 1) + 2) &&
              !(this.crit.on && this.crit.kind === "ped")
            ) && u < 10 + m
              ? (f.noRoll = !0)
              : u < 1.5 &&
                e < m + 1.5 &&
                ((f.done = !0), (f.go = !0), (f.rolled = !0))),
            m && !f.done && !f.noRoll
              ? ((d = !0), (p = "rolling stop"), (c.vEnd = m))
              : f.done
                ? ((f.yT = (f.yT || 0) + n),
                  this.clearCross(f) ||
                  (f.yT > (this.prof?.xMax ?? 7) && !this.busyOther(f.J)) ||
                  (h && f.yT > 10)
                    ? (f.go = !0)
                    : ((d = !0), (p = "giving way")))
                : ((d = !0),
                  (p = "stop sign"),
                  u < 1.8 &&
                    e < 0.35 &&
                    ((f.waitT = (f.waitT || 0) + n),
                    f.waitT > (this.prof?.stopWait ?? 0.7) && (f.done = !0))));
        } else
          (!uE || f.ctl === 0 || f.ctl === 3) &&
            (u < 10 &&
            this.busyOther(f.J) &&
            !(h && (f.gwT = (f.gwT || 0) + (e < 0.5 ? n : 0)) > 8)
              ? ((d = !0), (p = "giving way"))
              : u < 3 && (f.go = !0));
        if (!d && h && u > -2 && u < 120) {
          let m = f.ctl !== 2 || this.busyOther(f.J) || f.sOut - f.sJ > 20,
            g =
              Math.min(f.E.vmax || 9, f.F?.vmax || 9) *
                (m && f.ctl === 2 ? 1.1 : 1.25) +
              2 +
              3 * (this.prof?.boost || 0);
          (e > g - 3 || u < 80) &&
            (c.jCaps ||= []).push({
              g: Math.max(0, u - (f.ctl === 2 ? 6 : 0)),
              v: g,
            });
        }
        if (d) {
          ((c.g = u - (p === "red light" && h ? 1.8 : 0.9)), (c.why = p));
          break;
        }
      }
      return c;
    }
    toRed(t, e) {
      return this.sigT(t, e).tR;
    }
    sigT(t, e) {
      let s = this.env.roads;
      return s?.sigTimes
        ? s.sigTimes(t.J, t.leg.ph, e, !0)
        : { tR: 1e9, tG: 0, tN: 1e9 };
    }
    smallNudge() {
      let t = this.avC,
        e = this.path;
      return (
        !!t &&
        this.avOK &&
        !t.traffic &&
        Math.abs(this.avSideY ?? 9) < 0.9 &&
        !!e &&
        Math.abs(this.kPath) < 0.03 &&
        Math.abs(e.curvAt(12, 10)) < 0.02
      );
    }
    mergeBlocked(t, e) {
      let s = this.env.traffic;
      if (!s?.cars) return !1;
      let n = t.forward(),
        i = n.x,
        a = n.z,
        r = t.pos.x,
        l = t.pos.z;
      for (let c of s.cars) {
        if (c.wreck) continue;
        let h = this.prof,
          f = h?.mergeR ?? 50,
          u = h?.mergeT ?? 5,
          d = c.x - r,
          p = c.z - l,
          m = d * i + p * a;
        if (m < -f || m > 14) continue;
        let g = Math.abs(d * a - p * i);
        if (
          !(g > 5.5 || c.fx * i + c.fz * a < 0.6) &&
          !(!(c.v > 1) && m <= 4)
        ) {
          if (m > 4) {
            if (g < 3.6 && m < (c.V?.L || 4.6) / 2 + 4.5) {
              let b = this.l5T || 0;
              if (
                ((this.jh0 === void 0 || b - this.jh1 > 2) && (this.jh0 = b),
                (this.jh1 = b),
                b - this.jh0 < 6)
              )
                return !0;
            }
            continue;
          }
          if (m > -7 || -m / Math.max(c.v - e, 0.6) < u) return !0;
        }
      }
      return !1;
    }
    busyOther(t) {
      let e = this.env.traffic;
      return e
        ? (t.busyF === e.frame ? t.busy : 0) -
            (e.playerJ === t && this.claim === t ? 1 : 0) >
            0
        : !1;
    }
    clearCross(t, e = 0) {
      let s = this.env.traffic,
        n = this.env.roads;
      if (!s?.cars) return !0;
      if (this.busyOther(t.J)) return !1;
      for (let i of s.cars) {
        let a = i.nx;
        if (
          i.wreck ||
          i.cv ||
          i.passed ||
          !a ||
          a.J !== t.J ||
          !a.leg ||
          (i.E === t.E && i.dir === t.dir) ||
          ((t.J.ctl === 1 || (t.J.ctl === 3 && a.leg.stop)) &&
            !(i.stopDone && i.waitT > 0.3 && n.rem(i) < 9))
        )
          continue;
        let l = n.rem(i);
        if (
          l < 60 + e * 9 &&
          l / Math.max(i.v, 0.5) <
            Math.max(e, this.mode === "l5" ? (this.prof?.xT ?? 4.5) : 4.5)
        )
          return !1;
      }
      return !0;
    }
    clearOncoming(t, e = !1) {
      let s = this.env.traffic,
        n = this.env.roads;
      if (!s?.cars) return !0;
      for (let i of s.cars) {
        if (i.wreck) continue;
        if (i.cv && i.cv.J === t.J) {
          if (
            i.v > 0.8 &&
            i.fx * -t.leg.hx + i.fz * -t.leg.hz < -0.5 &&
            !(i.cv.to?.turn < -0.6)
          )
            return !1;
          continue;
        }
        let a = i.nx;
        if (
          i.passed ||
          !a ||
          a.J !== t.J ||
          !a.leg ||
          a.leg.hx * t.leg.hx + a.leg.hz * t.leg.hz > -0.6 ||
          a.turn < -0.6
        )
          continue;
        let r = n.rem(i);
        if (e) {
          if ((i.v * i.v) / 7 > r - 6 && i.v > 1) return !1;
          continue;
        }
        let l =
          this.mode === "l5" && this.prof?.pass
            ? 4 - 1 * (this.prof.boost || 0)
            : 5.5;
        if (r < 90 && (r < 20 || r / Math.max(i.v, 0.5) < l)) return !1;
      }
      return !this.busyOther(t.J);
    }
    filterReverse(t, e, s, n, i, a, r) {
      let l = this.out,
        c = n.S;
      ((this.rev = !0),
        (this._p = 0),
        (this.nud = 0),
        (this.lk = 0),
        (this.avC = null),
        (this.recT = 0),
        (this._kOv = null),
        (this._pP = null),
        this.perceive(n, s, r, a, t));
      let h = this.crit,
        f = 0,
        u = 1;
      if (h.on) {
        let g = h.areq;
        (!this.braking && g > Hs.aOn && a > 0.9 && (this.braking = !0),
          this.braking && (g < Hs.aOff || a < 0.9) && (this.braking = !1),
          (u = Zs((Hs.aOn - g) / (Hs.aOn - Hs.aThr), 0, 1)),
          h.gap < h.d0 + 6 &&
            (u = Math.min(
              u,
              Zs((Math.sqrt(Math.max(0, h.gap - h.d0 - 0.2)) - a) * 0.6, 0, 1),
            )),
          this.braking && (f = Math.min(Hs.emerg, g * 1.2 + 0.3)));
      } else this.braking = !1;
      let d = 0;
      if (f > 0) {
        let g = n.gSlope(n.pos.x, n.pos.z, s),
          b = Math.sqrt(1 + g.dx * g.dx + g.dz * g.dz),
          v = (DM * (g.dx * i.x + g.dz * i.z)) / b;
        d =
          f >= Hs.emerg - 0.01
            ? 1
            : Zs(
                (c.mass * (f + v) * c.wheelR) / (2 * (c.brakeF + c.brakeR)),
                0.02,
                1,
              );
      }
      ((this.brk += Zs(d - this.brk, -3.5 * t, (f > Hs.comf ? 10 : 2.4) * t)),
        a < 0.9 && (this.brk = 0),
        (this.brk > 0.005 || u < 1) &&
          ((l.brake = this.brk > 0.01 ? 0 : Math.min(l.brake, u)),
          this.brk > l.throttle &&
            ((l.throttle = this.brk), (this.only = e.throttle < 0.1))),
        (this.aCmd = f),
        (this.thrMax = u));
      let p = Math.max(this.brk > 0.03 ? 1 : 0, e.brake > u + 0.05 ? 1 : 0);
      this.active +=
        (p - this.active) * Math.min(1, t * (p > this.active ? 12 : 3));
      let m = this.stat;
      return (
        (m.gap = h.on ? h.gap : 0),
        (m.areq = h.on ? h.areq : 0),
        (m.kind = h.on ? h.kind : ""),
        (m.aCmd = f),
        (m.nudge = 0),
        (m.lk = 0),
        (m.thrMax = u),
        (m.emergency = !1),
        l
      );
    }
    stickFor(t, e, s) {
      let n = t.S,
        i = n.a + n.b,
        a = Math.max(s, 3),
        r = n.mu * DM;
      if (t.assists?.steering) {
        let c = Math.min(n.steerMax, Math.atan((i * r * 1.5) / (a * a)));
        return Math.atan((e * i) / a) / c;
      }
      let l =
        n.steerMax +
        (n.steerMaxHigh - n.steerMax) *
          Math.pow(Zs((s * 3.6) / 250, 0, 1), 0.7);
      return Math.atan((e * i) / a) / l;
    }
    perceive(t, e, s, n, i = 1 / 120) {
      let a = t.S,
        r = a.box,
        l = r?.hx ?? 0.97,
        c = r?.hz ?? 2.27,
        h = r?.off ?? 0.15,
        f = h + c;
      ((this.crit.on = !1),
        (this.critAv.on = !1),
        (this.lead.on = !1),
        (this.avoid.on = !1),
        (this.cand.length = 0),
        (this.narrow = null));
      let u = !!this.rev,
        d = u ? -h : h,
        p = d + c,
        m,
        g;
      if (s > (u ? 1 : 2) && n > 0) ((m = t.vel.x / s), (g = t.vel.z / s));
      else {
        let et = t.forward();
        ((m = u ? -et.x : et.x), (g = u ? -et.z : et.z));
      }
      let b = g,
        v = -m,
        x = a.a + a.b,
        y = Math.tan(t.steer || 0) / x,
        M = u
          ? -(t.r || 0) / Math.max(s, 1)
          : (0.5 * (t.r || 0) + 0.5 * (t.rDes ?? t.r ?? 0)) / Math.max(s, 3),
        S = Zs(s < 4 ? y + (M - y) * Zs((s - 2) / 2, 0, 1) : M, -0.25, 0.25);
      this.kS = (this.kS ?? S) + (S - (this.kS ?? S)) * Math.min(1, i / 0.2);
      let w = this._kOv ?? this.kS;
      Math.abs(w) < 1e-4 && (w = 0);
      let _ = u ? null : this._pP,
        z = Zs(s * Hs.T + p + 3, Hs.sMin, Hs.sMax);
      _
        ? ((z = Math.max(z, Math.min(Hs.sMax, (s * s) / 4 + p + 8))), (w = 0))
        : w && (z = Math.min(z, 1.6 / Math.abs(w)));
      let A = t.pos.x,
        T = t.pos.z,
        E = t.pos.y,
        R = w ? 1 / Math.abs(w) : 0,
        P = w > 0 ? 1 : -1,
        C = this.O;
      ((C.ox = A),
        (C.oz = T),
        (C.ux = m),
        (C.uz = g),
        (C.lx = b),
        (C.lz = v),
        (C.k = w),
        (C.R = R),
        (C.sg = P),
        (C.path = !!_));
      let I = Zs(s * 0.05, 0.7, 2) * (_ ? 1.3 : 1),
        L = this.P,
        F = 0,
        O = 1e18,
        B = 1e18,
        H = -1e18,
        N = -1e18;
      _ && (z = Math.min(z, I * (qO - 1) - 1));
      let D = (this._T0 ||= { x: 0, z: 0, y: 0, i: 0 }),
        U = (this._T1 ||= { x: 0, z: 0, y: 0, i: 0 }),
        G = _ && this._offP === _ ? this._offAll : null,
        W = _ ? _.e + (G ? G(_.s) : 0) : 0;
      for (let et = 0; et <= z + I * 0.5 && F < qO; et += I, F++) {
        let st, ot, rt, lt;
        if (_) {
          (_.at(et, D), _.at(et + 1.5, U));
          let ht = U.x - D.x,
            pt = U.z - D.z,
            ut = Math.hypot(ht, pt);
          ut > 0.2
            ? ((ht /= ut), (pt /= ut))
            : ((ht = F ? L[(F - 1) * 5 + 3] : m),
              (pt = F ? L[(F - 1) * 5 + 4] : g));
          let it = W * Math.max(0, 1 - et / 12) - (G ? G(_.s + et) : 0),
            at = et > _.left ? et - _.left : 0;
          ((rt = ht),
            (lt = pt),
            (st = D.x + pt * it + ht * (at + d)),
            (ot = D.z - ht * it + pt * (at + d)));
        } else {
          let ht = w * et,
            pt = Math.cos(ht),
            ut = Math.sin(ht),
            it = w ? ut / w : et,
            at = w ? (1 - pt) / w : 0;
          ((rt = m * pt + b * ut),
            (lt = g * pt + v * ut),
            (st = A + m * it + b * at + rt * d),
            (ot = T + g * it + v * at + lt * d));
        }
        ((L[F * 5] = et),
          (L[F * 5 + 1] = st),
          (L[F * 5 + 2] = ot),
          (L[F * 5 + 3] = rt),
          (L[F * 5 + 4] = lt),
          st < O && (O = st),
          st > H && (H = st),
          ot < B && (B = ot),
          ot > N && (N = ot));
      }
      ((this.np = F), (this.ds = I));
      {
        let et = e.heightAt || Wi,
          st = Math.max(1, Math.round(6 / I)),
          ot = 0;
        for (let rt = 0; rt < F && ot < 24; rt += st)
          ((this.HS[ot] = L[rt * 5]),
            (this.HY[ot] = rt
              ? et(L[rt * 5 + 1], L[rt * 5 + 2], null)
              : t.pos.y),
            ot++);
        this.nh = ot;
      }
      let V = c + l + 1.2;
      ((O -= V), (B -= V), (H += V), (N += V));
      let $ = s < 2 ? -0.25 + 0.15 * s : 0.05 + 0.016 * s,
        J = !!Ni(A, T, 1.5),
        X = 0,
        tt = this._cells;
      for (let et = 0; et < F; et += Math.max(1, Math.floor(5 / I))) {
        let st = L[et * 5 + 1],
          ot = L[et * 5 + 2],
          rt = c + l + 1;
        for (
          let lt = Math.floor((st - rt) / lo);
          lt <= Math.floor((st + rt) / lo);
          lt++
        )
          for (
            let ht = Math.floor((ot - rt) / lo);
            ht <= Math.floor((ot + rt) / lo);
            ht++
          ) {
            let pt = i1(lt, ht),
              ut = !1;
            for (let it = 0; it < X; it++)
              if (tt[it] === pt) {
                ut = !0;
                break;
              }
            !ut && X < tt.length && (tt[X++] = pt);
          }
      }
      {
        let et = L[(F - 1) * 5 + 1],
          st = L[(F - 1) * 5 + 2],
          ot = c + l + 1;
        for (
          let rt = Math.floor((et - ot) / lo);
          rt <= Math.floor((et + ot) / lo);
          rt++
        )
          for (
            let lt = Math.floor((st - ot) / lo);
            lt <= Math.floor((st + ot) / lo);
            lt++
          ) {
            let ht = i1(rt, lt),
              pt = !1;
            for (let ut = 0; ut < X; ut++)
              if (tt[ut] === ht) {
                pt = !0;
                break;
              }
            !pt && X < tt.length && (tt[X++] = ht);
          }
      }
      ((this._nc = X),
        (this._mv =
          !u && (this.mode === "l5" || this.mode === "l4") && s > 0.5));
      let Z = this._t,
        q = this;
      ((q._comf = a.daComf ?? Hs.comf),
        (q._OF = d),
        (q._v = s),
        (q._HX = l),
        (q._front = p),
        (q._m = $),
        (q._sMax = z),
        (q._oy = E),
        (q._onHw = J),
        (q._bb0 = O),
        (q._bb1 = H),
        (q._bc0 = B),
        (q._bc1 = N));
      let j = e.grid;
      for (let et = 0; et < X; et++) {
        let st = j.get(tt[et]);
        if (st)
          for (let ot = 0; ot < st.length; ot++) this.consider(st[ot], e, null);
      }
      for (let et = 0; et < e.big.length; et++)
        this.consider(e.big[et], e, null);
      let K = e.dynamic;
      for (let et = 0; et < K.length; et++) {
        let st = K[et];
        st.x > O - 6 &&
          st.x < H + 6 &&
          st.z > B - 6 &&
          st.z < N + 6 &&
          this.consider(st, e, st.traffic || null);
      }
      let nt = e.parked?.awake;
      if (nt)
        for (let et = 0; et < nt.length; et++) {
          let st = nt[et];
          st.x > O - 6 &&
            st.x < H + 6 &&
            st.z > B - 6 &&
            st.z < N + 6 &&
            this.consider(st, e, null);
        }
      let Q = this.env.peds;
      for (let et = 0; et < Q.length; et++) {
        let st = Q[et];
        if (st)
          for (let ot = 0; ot < st.length; ot++) {
            let rt = st[ot];
            if (rt.x < O || rt.x > H || rt.z < B || rt.z > N || rt.hidden)
              continue;
            let lt = 0,
              ht = 0;
            (rt.leap
              ? ((lt = rt.leap.vx || 0), (ht = rt.leap.vz || 0))
              : rt.st === "walk" && rt.hx !== void 0
                ? ((lt = rt.hx * (rt.speed || 1.2)),
                  (ht = rt.hz * (rt.speed || 1.2)))
                : rt.vx !== void 0 && ((lt = rt.vx), (ht = rt.vz)),
              this.capsule(rt.x, rt.z, rt.x, rt.z, 0.3, lt, ht, "ped", Z));
          }
      }
      (this._mv && this.movers(K, s, l, c, p, d),
        u || this.plan(t, s, l, c, f, i, Zs(this._p || 0, -1, 1)));
    }
    movers(t, e, s, n, i, a) {
      let r = this.O,
        l = r.k,
        c = r.ux,
        h = r.uz,
        f = r.lx,
        u = r.lz,
        d = s + 0.12,
        p = Math.max(0, n - s),
        m = this.mode === "l5" && !!this.prof?.pass,
        g = 9,
        b = 9,
        v = 9,
        x = 0,
        y = 0,
        M = null,
        S = 3.5,
        w = Math.max(e < 4 ? 1.5 : 0, Zs(this.axS || 0, 0, 3));
      for (let _ = 0; _ < t.length; _++) {
        let z = t[_],
          A = z.traffic;
        if (!A || A.wreck || z.dead) continue;
        let T = z.x - r.ox,
          E = z.z - r.oz;
        if (T * T + E * E > 2025) continue;
        let R = A.v || 0,
          P = -Math.sin(A.heading),
          C = -Math.cos(A.heading),
          I = P * c + C * h,
          L = (this._hw ||= new WeakMap()),
          F = L.get(A),
          O = this.l5T || 0,
          B = 0;
        if (F && O > F.t) {
          let W = A.heading - F.h;
          ((W = Math.atan2(Math.sin(W), Math.cos(W))),
            (B = Zs(W / (O - F.t), -0.8, 0.8)),
            A.cv || (B = 0));
        }
        if (
          ((!F || O - F.t > 0.15) && L.set(A, { h: A.heading, t: O }), R < 0.5)
        )
          continue;
        let H = T * c + E * h,
          N = T * f + E * u,
          D = I > 0.85 && H < 1;
        if (
          (D && !(m && r.path && H > -(n + z.hz) - 1.5)) ||
          (I > 0.92 && Math.abs(N) < s + z.hx - 0.3)
        )
          continue;
        let U = z.hx + 0.12,
          G = Math.max(0, z.hz - z.hx);
        for (let W = 0; W < 2; W++) {
          let V = 9,
            $ = 0,
            J = 0;
          for (let X = 0; X <= 3.01; X += 0.25) {
            let tt =
                W === 0
                  ? e * X + 0.5 * w * X * X
                  : X < e / S
                    ? e * X - 0.5 * S * X * X
                    : (e * e) / (2 * S),
              Z = this._pose(tt, this._po),
              q = Z.dx,
              j = Z.dz,
              K = Z.x,
              nt = Z.z,
              Q,
              et;
            if (Math.abs(B) > 0.02) {
              let ot = A.heading + B * X;
              ((Q = z.x + (R * (Math.cos(ot) - Math.cos(A.heading))) / B),
                (et = z.z - (R * (Math.sin(ot) - Math.sin(A.heading))) / B));
            } else ((Q = z.x + P * R * X), (et = z.z + C * R * X));
            let st = 1e9;
            for (let ot = -1; ot <= 1; ot += 2)
              for (let rt = -1; rt <= 1; rt += 2) {
                let lt = K + q * p * ot - Q - P * G * rt,
                  ht = nt + j * p * ot - et - C * G * rt,
                  pt = Math.hypot(lt, ht);
                pt < st && (st = pt);
              }
            if (
              ((st -= d + U),
              st < V && ((V = st), ($ = X), (J = tt)),
              W === 1 && X >= e / S && R < 0.3)
            )
              break;
          }
          (D && (V += 0.95),
            W === 0
              ? (V < g && ((g = V), (x = $), (y = J), (M = z)),
                Math.abs(I) < 0.7 && V < v && (v = V))
              : V < b && (b = V));
        }
      }
      if (
        ((this.mvA = g),
        (this.mvB = b),
        (this.mvX = v),
        !(g > (m ? (Math.abs(this.kPath || 0) > 0.04 ? 2 : 1.5) : 2)) &&
          !(
            m &&
            b < g + 0.4 &&
            b < 1 &&
            M?.traffic &&
            -Math.sin(M.traffic.heading) * r.ux -
              Math.cos(M.traffic.heading) * r.uz >
              0.85
          ))
      )
        if (!Hs.l5Clear || b > 1 || b >= g - 0.3) {
          let _ = Math.max(0, y - i + a - 1),
            z = (e * e) / (2 * Math.max(0.12, _ - 0.5));
          z > (this.crit.on ? this.crit.areq : -1) &&
            GM(this.crit, _, Math.max(z, 1.2), x, 0, "car", 0.5, 0, M, 0);
        } else e > 2 && (this.clearOut = 0.6);
    }
    consider(t, e, s) {
      if (
        t.dead ||
        (t.soft && (this.mode !== "l5" || this.softOK)) ||
        (t.wall && this._onHw)
      )
        return;
      if (t.y1 !== void 0) {
        let i =
            t.t === "poly"
              ? (t.bb[0] + t.bb[2]) / 2
              : t.t === "box"
                ? (t.x0 + t.x1) / 2
                : t.x,
          a =
            t.t === "poly"
              ? (t.bb[1] + t.bb[3]) / 2
              : t.t === "box"
                ? (t.z0 + t.z1) / 2
                : t.z,
          r = this._yAt(this._sd(i, a, this._ta)[0]);
        if (r > t.y1 + 0.3 || r + 1.4 < t.y0) return;
      }
      let n = t.t;
      if (n === "circ") {
        if (
          t.x + t.r < this._bb0 ||
          t.x - t.r > this._bb1 ||
          t.z + t.r < this._bc0 ||
          t.z - t.r > this._bc1
        )
          return;
        this.capsule(
          t.x,
          t.z,
          t.x,
          t.z,
          t.r,
          0,
          0,
          t.prop ? "prop" : "pole",
          t,
        );
        return;
      }
      if (n === "obb") {
        if (
          t.x < this._bb0 - 8 ||
          t.x > this._bb1 + 8 ||
          t.z < this._bc0 - 8 ||
          t.z > this._bc1 + 8
        )
          return;
        let i = t.hz >= t.hx,
          a = i ? t.hx : t.hz,
          r = i ? t.hz - t.hx : t.hx - t.hz,
          l = i ? t.s : t.c,
          c = i ? t.c : -t.s,
          h = 0,
          f = 0;
        if (
          (s &&
            (s.wreck
              ? ((h = s.wreck.vx), (f = s.wreck.vz))
              : ((h = -Math.sin(s.heading) * s.v),
                (f = -Math.cos(s.heading) * s.v))),
          r > 9)
        ) {
          this.march(t, e);
          return;
        }
        this.capsule(
          t.x - l * r,
          t.z - c * r,
          t.x + l * r,
          t.z + c * r,
          a,
          h,
          f,
          s ? "car" : t.parked ? "parked" : "static",
          t,
        );
        return;
      }
      this.march(t, e);
    }
    capsule(t, e, s, n, i, a, r, l, c) {
      let h = this._v,
        f = this._HX,
        u = this._front,
        d = l === "ped",
        p = this._m + (d ? 0.45 : 0),
        m = Math.hypot(a, r),
        g = this._sd(t, e, this._ta),
        b = this._sd(s, n, this._tb);
      if (!g || !b) return;
      let v = g[0],
        x = g[1],
        y = b[0],
        M = b[1],
        S = 0;
      if (m > 0.3) {
        let W = Math.max(0, Math.min(v, y)),
          V = this._pose(W, this._po),
          $ = V.dx,
          J = V.dz;
        S = a * $ + r * J;
        let X = a * -J + r * $;
        if (
          this._mv &&
          l === "car" &&
          Math.abs(X) > 1 &&
          !(
            this.mode === "l5" &&
            (x * M < 0 ? 0 : Math.min(Math.abs(x), Math.abs(M))) - i <
              f + 0.4 &&
            Math.min(v, y) > 0
          )
        )
          return;
        if (Math.abs(X) > 0.6) {
          let tt = Zs((W - u) / Math.max(h - Math.min(S, 0), 1.5), 0, 3),
            Z = Math.abs(x) < Math.abs(M) ? x : M,
            q = this._sd(t + a * tt, e + r * tt, this._ta),
            j = this._sd(s + a * tt, n + r * tt, this._tb),
            K = Math.min(Math.abs(q[1]), Math.abs(j[1]));
          ((Z * -X > 0 && !d) || K < Math.min(Math.abs(x), Math.abs(M))) &&
            ((v = q[0]), (x = q[1]), (y = j[0]), (M = j[1]));
        }
      }
      if (Math.max(v, y) < -1 || Math.min(v, y) > this._sMax + i + 1) return;
      let w = f + i + p,
        _ = f + i + 2.4,
        z = M - x,
        A = 0,
        T = 1;
      if (Math.abs(z) < 1e-6) {
        if (Math.abs(x) > _) return;
      } else {
        let W = (-_ - x) / z,
          V = (_ - x) / z;
        if (W > V) {
          let $ = W;
          ((W = V), (V = $));
        }
        if (((A = Math.max(0, W)), (T = Math.min(1, V)), A > T)) return;
      }
      let E = 0,
        R = 1,
        P = !0;
      if (Math.abs(z) < 1e-6) P = Math.abs(x) < w;
      else {
        let W = (-w - x) / z,
          V = (w - x) / z;
        if (W > V) {
          let $ = W;
          ((W = V), (V = $));
        }
        ((E = Math.max(0, W)), (R = Math.min(1, V)), (P = E <= R));
      }
      P || ((E = A), (R = T));
      let C = Math.min(v + (y - v) * E, v + (y - v) * R) - i,
        I = C - u;
      if (I < -0.4) return;
      if (
        (c && this.cand.length < 64 && I < this._sMax && this.cand.push(c),
        !P && S < 0.5 && !d && I < 60 && I > -2 * (i + 2) && this._pP)
      ) {
        let W = (x * M < 0 ? 0 : Math.min(Math.abs(x), Math.abs(M))) - i - f;
        if (W < 1) {
          let V = 2.5 + 7 * Math.max(0, W - 0.1),
            $ = Math.max(0, I - 10);
          (!this.narrow ||
            V + Math.sqrt(6 * $) <
              this.narrow.v + Math.sqrt(6 * this.narrow.g)) &&
            (this.narrow = { g: $, v: V });
        }
      }
      if (!P) return;
      let L = x + z * E,
        F = x + z * R,
        O = (L * F < 0 ? 0 : Math.min(Math.abs(L), Math.abs(F))) - i,
        B = Math.max(0, I),
        H = this._v - S,
        N = d
          ? Hs.pedD0
          : (l === "car" ? 1.3 : l === "parked" ? 0.6 : 0.35) + 0.05 * h,
        D = H > 0.2 ? (H * H) / (2 * Math.max(0.12, B - N)) : 0,
        U = H > 0.2 ? B / H : 99,
        G = c && c === this.avC ? this.critAv : this.crit;
      if (
        (D > (G.on ? G.areq : -1) && GM(G, B, D, U, S, l, N, 0, c, O),
        l === "car" &&
          S > 1 &&
          (!this.lead.on || B < this.lead.gap) &&
          GM(this.lead, B, D, U, S, l, N, 0, c),
        U < 2.4 &&
          D > 1 &&
          B > 1 &&
          !d &&
          !(l === "car" && (Math.abs(S) > 1 || D < (this._comf || Hs.comf))) &&
          _Mt(v, y, x, M) < 7)
      ) {
        let W = Math.min(x, M) - i,
          V = Math.max(x, M) + i,
          $ = 0.35,
          J = W - $ - f,
          X = V + $ + f,
          tt = Math.abs(J) < Math.abs(X) ? J : X,
          Z = D / Math.max(0.5, U);
        Math.abs(tt) < 1.9 &&
          (!this.avoid.on || Z > this.avoid.areq) &&
          (GM(this.avoid, B, Z, U, S, l, N, tt, c),
          (this.avoid.alt = Math.abs(J) < Math.abs(X) ? X : J));
      }
    }
    march(t, e) {
      let s, n, i, a;
      if (t.t === "poly")
        ((s = t.bb[0]), (n = t.bb[1]), (i = t.bb[2]), (a = t.bb[3]));
      else if (t.t === "box") ((s = t.x0), (n = t.z0), (i = t.x1), (a = t.z1));
      else {
        let u = Math.abs(t.hx * t.c) + Math.abs(t.hz * t.s),
          d = Math.abs(t.hx * t.s) + Math.abs(t.hz * t.c);
        ((s = t.x - u), (i = t.x + u), (n = t.z - d), (a = t.z + d));
      }
      if (i < this._bb0 || s > this._bb1 || a < this._bc0 || n > this._bc1)
        return;
      this.cand.length < 64 && this.cand.push(t);
      let r = this.P,
        l = this.np,
        c = Math.max(0.4, this._HX - 0.1),
        h = this._front - this._OF,
        f = h + c + 0.5;
      for (let u = 0; u < l; u++) {
        let d = r[u * 5 + 1],
          p = r[u * 5 + 2];
        if (
          d < s - f ||
          d > i + f ||
          p < n - f ||
          p > a + f ||
          !dE(t, d, p, r[u * 5 + 3], r[u * 5 + 4], c, h)
        )
          continue;
        let m = u ? Math.max(0, r[u * 5] - this.ds * 0.5) : 0,
          g = this._v,
          b = 0.35 + 0.05 * g,
          v = (g * g) / (2 * Math.max(0.12, m - b)),
          x = this.crit;
        v > (x.on ? x.areq : -1) &&
          GM(
            x,
            m,
            v,
            m / Math.max(g, 0.2),
            0,
            t.wall ? "wall" : t.t === "poly" ? "building" : "barrier",
            b,
            0,
            t,
          );
        return;
      }
    }
    _pose(t, e) {
      let s = this.O;
      if (s.path) {
        let h = this.P,
          f = this.np,
          u = this.ds,
          d = Math.floor(t / u);
        (d < 0 && (d = 0), d > f - 2 && (d = Math.max(0, f - 2)));
        let p = Zs((t - h[d * 5]) / u, 0, f > 1 ? 99 : 0),
          m = Math.min(f - 1, d + 1),
          g = h[d * 5 + 3],
          b = h[d * 5 + 4];
        return (
          p <= 1 && m > d
            ? ((e.x = h[d * 5 + 1] + (h[m * 5 + 1] - h[d * 5 + 1]) * p),
              (e.z = h[d * 5 + 2] + (h[m * 5 + 2] - h[d * 5 + 2]) * p))
            : ((e.x = h[d * 5 + 1] + g * (t - h[d * 5])),
              (e.z = h[d * 5 + 2] + b * (t - h[d * 5]))),
          (e.dx = g),
          (e.dz = b),
          e
        );
      }
      let n = s.k,
        i = n * t,
        a = Math.cos(i),
        r = Math.sin(i),
        l = n ? r / n : t,
        c = n ? (1 - a) / n : 0;
      return (
        (e.dx = s.ux * a + s.lx * r),
        (e.dz = s.uz * a + s.lz * r),
        (e.x = s.ox + s.ux * l + s.lx * c + e.dx * this._OF),
        (e.z = s.oz + s.uz * l + s.lz * c + e.dz * this._OF),
        e
      );
    }
    _yAt(t) {
      let e = this.HS,
        s = this.HY,
        n = this.nh;
      if (n < 2 || t <= e[0]) return s[0];
      for (let i = 1; i < n; i++)
        if (t <= e[i])
          return (
            s[i - 1] + ((s[i] - s[i - 1]) * (t - e[i - 1])) / (e[i] - e[i - 1])
          );
      return s[n - 1];
    }
    _sd(t, e, s) {
      let n = this.O;
      if (n.path) {
        let u = this.P,
          d = this.np,
          p = 0,
          m = 1e18;
        for (let x = 0; x < d; x++) {
          let y = t - u[x * 5 + 1],
            M = e - u[x * 5 + 2],
            S = y * y + M * M;
          S < m && ((m = S), (p = x));
        }
        let g = 0,
          b = 0,
          v = 1e18;
        for (let x = Math.max(0, p - 1); x <= Math.min(d - 1, p); x++) {
          let y = u[x * 5 + 1],
            M = u[x * 5 + 2],
            S = x + 1 < d ? u[x * 5 + 6] - y : u[x * 5 + 3],
            w = x + 1 < d ? u[x * 5 + 7] - M : u[x * 5 + 4],
            _ = S * S + w * w || 1e-9,
            z = Math.sqrt(_),
            A = ((t - y) * S + (e - M) * w) / _,
            T = x === 0 ? -1e9 : 0,
            E = x + 1 >= d ? 1e9 : 1;
          A = A < T ? T : A > E ? E : A;
          let R = y + S * A - t,
            P = M + w * A - e,
            C = R * R + P * P;
          C < v &&
            ((v = C),
            (g = u[x * 5] + A * (x + 1 < d ? u[x * 5 + 5] - u[x * 5] : z)),
            (b = ((t - y) * w - (e - M) * S) / z));
        }
        return ((s[0] = g + this._OF), (s[1] = b), s);
      }
      let i = t - n.ox,
        a = e - n.oz,
        r = i * n.ux + a * n.uz,
        l = i * n.lx + a * n.lz;
      if (!n.k) return ((s[0] = r), (s[1] = l), s);
      let c = n.R - n.sg * l,
        h = Math.atan2(r, c),
        f = Math.hypot(r, c);
      return ((s[0] = n.R * h), (s[1] = n.sg * (n.R - f)), s);
    }
    plan(t, e, s, n, i, a, r = 0) {
      let l = this.avoid;
      if (this.avC) {
        this.avT += a;
        let c = this._pursuit(this.avC, this.avSide, s, i, e);
        c === null || this.avT > 5 || !this.avC || this.avC.dead
          ? (c === null && (this.recX || this.recZ) && (this.recT = 2.5),
            (this.avC = null),
            (this.avOK = !1))
          : ((this.avK = c),
            (this.avOK = this._arcFree(
              c,
              this._at + 2 * n + 5,
              s + 0.15,
              n,
              null,
            )),
            (this.avBad = this.avOK ? 0 : this.avBad + a),
            this.avBad > 0.25 && ((this.avC = null), (this.avOK = !1)));
      }
      if (!this.avC && l.on && l.c) {
        let c = Math.abs(r) > 0.03 ? Math.sign(r) : l.y >= 0 ? 1 : -1;
        for (let h = 0; h < 2 && !this.avC; h++) {
          let f = h ? -c : c,
            u = this._pursuit(l.c, f, s, i, e);
          u === null ||
            Math.abs(u) * e * e > Hs.latMax * 1.4 ||
            (this._arcFree(u, this._at + 2 * n + 5, s + 0.15, n, null) &&
              ((this.avC = l.c),
              (this.avSide = f),
              (this.avK = u),
              (this.avOK = !0),
              (this.avT = 0),
              (this.avBad = 0),
              (this.avSideY = f === c ? l.y : l.alt),
              this.laneCheck(t, e),
              (this.recX = this.lane.road ? this.lane.lx : 0),
              (this.recZ = this.lane.road ? this.lane.lz : 0)));
        }
      }
    }
    _pursuit(t, e, s, n, i) {
      let a = this.O,
        r = a.ux,
        l = a.uz,
        c = a.lx,
        h = a.lz,
        f = a.ox,
        u = a.oz,
        d,
        p,
        m,
        g,
        b;
      if (t.t === "circ") ((d = m = t.x), (p = g = t.z), (b = t.r));
      else if (t.t === "obb") {
        let z = t.hz >= t.hx,
          A = z ? t.hz - t.hx : t.hx - t.hz,
          T = z ? t.s : t.c,
          E = z ? t.c : -t.s;
        ((b = z ? t.hx : t.hz),
          (d = t.x - T * A),
          (p = t.z - E * A),
          (m = t.x + T * A),
          (g = t.z + E * A));
        let R = t.traffic;
        if (R && !R.wreck && R.v > 0.3) {
          let P = Math.max(0, ((t.x - f) * r + (t.z - u) * l) / Math.max(i, 1)),
            C = -Math.sin(R.heading) * R.v * P,
            I = -Math.cos(R.heading) * R.v * P;
          ((d += C), (m += C), (p += I), (g += I));
        }
      } else return null;
      let v = (d - f) * r + (p - u) * l,
        x = (d - f) * c + (p - u) * h,
        y = (m - f) * r + (g - u) * l,
        M = (m - f) * c + (g - u) * h,
        S = Math.min(v, y) - b;
      if (S < n * 0.3) return null;
      let w =
        e > 0 ? Math.max(x, M) + b + 0.45 + s : Math.min(x, M) - b - 0.45 - s;
      this._at = Math.max(v, y) + b;
      let _ = Math.max(2, S);
      return (2 * w) / (_ * _ + w * w);
    }
    _arcFree(t, e, s, n, i) {
      let a = this.O,
        r = this._OF,
        l = Math.max(0.8, this.ds),
        c = this.cand,
        h = c.length;
      e = Math.min(e, this._sMax + 10);
      for (let f = 1; f <= e; f += l) {
        let u = t * f,
          d = Math.cos(u),
          p = Math.sin(u),
          m = t ? p / t : f,
          g = t ? (1 - d) / t : 0,
          b = a.ux * d + a.lx * p,
          v = a.uz * d + a.lz * p,
          x = a.ox + a.ux * m + a.lx * g + b * r,
          y = a.oz + a.uz * m + a.lz * g + v * r;
        for (let M = 0; M < h; M++) {
          let S = c[M];
          if (!S || S === i) continue;
          let w = x,
            _ = y,
            z = S.traffic;
          if (z && !z.wreck && z.v > 0.5) {
            let A = f / Math.max(this._v, 1);
            ((w += Math.sin(z.heading) * z.v * A),
              (_ += Math.cos(z.heading) * z.v * A));
          }
          if (dE(S, w, _, b, v, s, n)) return !1;
        }
      }
      return !0;
    }
    laneCheck(t, e) {
      let s = this.lane;
      ((s.ok = !1), (s.road = !1));
      let n = this.env.L,
        i = this.env.roads;
      if (!n?.roadAt || !i?.laneV) return;
      let a = n.roadAt(t.pos.x, t.pos.z, 2, t.pos.y, !1, this._rq);
      if (!a || a.dd > 0.5 || !a.E.lg || !a.E.car) return;
      let r = a.E,
        l = e > 1 ? t.vel.x / e : -Math.sin(t.psi),
        c = e > 1 ? t.vel.z / e : -Math.cos(t.psi),
        h = l * a.dx + c * a.dz,
        f = h >= 0 ? 1 : -1;
      if (Math.abs(h) < 0.9 || (r.oneway && f < 0)) return;
      let u = i.lanes(r),
        d = 0,
        p = 1e9;
      for (let b = 0; b < u; b++) {
        let v = i.laneV(r, f, b, a.w);
        Math.abs(v - a.v) < p && ((p = Math.abs(v - a.v)), (d = v));
      }
      let m = f * a.dx,
        g = f * a.dz;
      ((s.psi = Math.atan2(l * g - c * m, l * m + c * g)),
        (s.road = !0),
        (s.lx = m),
        (s.lz = g),
        !a.J &&
          (p > 1.6 ||
            !a.onRoad ||
            ((s.e = -f * (a.v - d)), (s.ok = Math.abs(s.psi) < 0.25))));
    }
  };
