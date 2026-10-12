// app 318 — math
// Lines 153811-157341 of readable/app.pretty.js (statement-aligned).
var $s = (i, t, e) => (i < t ? t : i > e ? e : i),
  Ow = 9.81,
  YI = 80,
  JI = ["green", "orange", "red", "brake"],
  J_ = class {
    constructor(t = "manual") {
      ((this.mode = rf.includes(t) ? t : IZ[t] || "manual"),
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
        (this.P = new Float64Array(YI * 5)),
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
        (this.crit = Hw()),
        (this.lead = Hw()),
        (this.avoid = Hw()),
        (this.critAv = Hw()),
        (this._t = Hw()),
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
        (this.profile = s3t()),
        (this.prof = Im[this.profile]),
        (this.thrI = 0),
        (this.vPrev = null),
        (this.axS = 0),
        (this.stuckT = 0),
        (this.claim = null),
        (this.l5T = 0));
      let e = 7;
      ((this.rnd = () => (e = (e * 16807) % 2147483647) / 2147483647),
        (this._pick = (s, n, o) => {
          let a = n.id * 2 + (o > 0 ? 1 : 0),
            r = this.choice.get(a);
          if (r) {
            let c = s.find((h) => h.F === r.F && h.dir === r.dir);
            if (c) return c;
          }
          let l = this.mode === "l5" ? this.cruiseWay(s, n) : VI(s, n);
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
      ((t = rf.includes(t) ? t : IZ[t] || "manual"),
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
        o = this.rnd() * s;
      for (let a = 0; a < t.length; a++) if ((o -= n[a]) <= 0) return t[a];
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
    ownRoute(t, e, s, n, o, a) {
      let r = this.env.router || this.env.rides?.(),
        l = t?.spot;
      if (!r?._route || !l) return;
      let c = qI(this.env.roads, e, this._lq);
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
        u.locate(s, n, o, a, 6),
        (this.fix = f),
        (this.fixFor = t));
    }
    legalPlan(t, e, s) {
      let n = this.env.roads,
        o = MZ(n, t, this._lq);
      if (!o || (o.wrong && this.mode === "l5" && !e)) return !1;
      let a = null,
        r = t.pos.x,
        l = t.pos.z,
        c = o.s;
      if (o.wrong) {
        let v = this.uturn(t, o);
        ((a = v.pts), (r = v.x), (l = v.z), (c = v.s));
      }
      let h = Ot(o.E, c, {}),
        f = h.dx * o.dir,
        u = h.dz * o.dir,
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
        let v = this.env.router || this.env.rides?.();
        if (!v?._route) return !1;
        let y =
          v._route(r, l, f, u, e, !1, { E: o.E, s: c, fwd: !0 }) ||
          v._route(r, l, f, u, e, !1, { E: o.E, s: c });
        if (!y?.edges?.length) return !1;
        ((p = y.edges), (m = { x: y.spot.x, z: y.spot.z }), (g = y));
      } else p = SZ(n, { E: o.E, dir: o.dir, s: c }, this._pick, 520);
      if (!s.build(p, d, m, null, e ? "route" : "lane", a)) return !1;
      ((s.src = g), (s.spotFor = e), (s.lost = !0));
      let b = Math.hypot(t.vel.x, t.vel.z),
        x = t.forward();
      return (
        s.locate(
          t.pos.x,
          t.pos.z,
          b > 2 ? t.vel.x / b : x.x,
          b > 2 ? t.vel.z / b : x.z,
          6,
        ),
        !0
      );
    }
    uturn(t, e) {
      let s = this.env.roads,
        n = e.E,
        o = Ot(n, e.s, {}),
        a = Math.max(1, s.lanes(n)),
        r = -Math.sin(t.psi),
        l = -Math.cos(t.psi),
        c = o.x,
        h = o.z,
        f = -1;
      for (let v = 0; v < a; v++) {
        let y = s.laneV(n, 1, v, o.w),
          M = o.x + o.nx * y,
          S = o.z + o.nz * y,
          w = Math.abs((M - t.pos.x) * -l + (S - t.pos.z) * r);
        w > f && ((f = w), (c = M), (h = S));
      }
      if (f < 2.5) {
        let v = Math.max(2.5, (o.w || 8) / 2 - 1.2);
        ((c = t.pos.x + l * v), (h = t.pos.z - r * v), (f = v));
      }
      let u = Math.max(4, f * 0.9),
        d = t.pos.x + r * u,
        p = t.pos.z + l * u,
        m = c - o.dx * u,
        g = h - o.dz * u,
        b = [],
        x = t.pos.y;
      for (let v = 0; v < 14; v++) {
        let y = v / 14,
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
          x,
        ]);
      }
      return { pts: b, x: c, z: h, s: e.s };
    }
    pursue(t, e, s, n, o, a, r = null) {
      let l = $s(4.5 + 0.7 * a, 6, 26),
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
            this._oT === void 0 ? m : this._oT + $s(m - this._oT, -p, p)),
          (this._o0 =
            this._o0 === void 0 ? g : this._o0 + $s(g - this._o0, -p, p)),
          (m = this._oT),
          (g = this._o0)),
        m || g)
      ) {
        let S = t.at(l + 1.5, (this._T2 ||= { x: 0, z: 0, y: 0, i: 0 })),
          w = S.x - h,
          z = S.z - f,
          _ = Math.hypot(w, z) || 1;
        ((w /= _), (z /= _), (h -= z * m), (f += w * m), (u = g));
      }
      let b = h - e,
        x = f - s,
        v = b * o - x * n,
        y = b * n + x * o,
        M = (2 * v) / Math.max(4, b * b + x * x);
      if (
        (y < 0.5 && (M = (v >= 0 ? 1 : -1) * 0.22),
        t.d < 2.2 && Math.abs(t.psi) < 0.55 && y > 0.5)
      ) {
        let S =
            this.mode === "l5"
              ? Math.max(4, 2.5 + 0.35 * a)
              : Math.max(4.5, 3 + 0.45 * a),
          w = -t.curvAt(Math.min(6, a * 0.3), 2),
          z = -((t.e + u) / (S * S) + (1.8 * t.psi) / S),
          _ =
            $s((2.2 - t.d) / 0.8, 0, 1) *
            $s((0.55 - Math.abs(t.psi)) / 0.2, 0, 1);
        M = M + (w + z - M) * _;
      }
      return M;
    }
    pathStep(t, e, s) {
      this.cueUpdate(t, e);
      let n = this.env.roads;
      if (!n?.laneV || !n.D) return ((this.path = null), (this.conf = 0), null);
      this.lp || ((this.lp = new Lx(n)), (this.rp = new Lx(n)));
      {
        let M = this.mode === "l5" && this.prof?.pass ? 26 : 16;
        ((this.lp.joinMax = this.rp.joinMax = M),
          this.gp && (this.gp.joinMax = M));
      }
      let o = e.pos.x,
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
        let M = this.env.router.routeTo(o, a, l.x, l.z, this.dest, !1);
        ((this.destRoute = M?.edges?.length ? M : null), (this.lostT = 0));
      }
      let f = qI(n, e, this._lq);
      f && (this._here = { E: f.E, dir: f.dir, s: f.s, x: o, z: a });
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
          ((this.keepFor = u), d.locate(o, a, c, h, 6));
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
            d.locate(o, a, c, h, 6),
            this.mode === "l5" &&
              (d.lost ||
                Math.abs(d.psi) > 0.9 ||
                d.marks.some((w) => Math.abs(w.turn) > 2.6)))
          ) {
            let w = Yn.turnC;
            Yn.turnC = 4e3;
            try {
              this.ownRoute(u, e, o, a, c, h);
            } finally {
              Yn.turnC = w;
            }
          }
        } else d.locate(o, a, c, h, 6);
        this.mode === "l5" &&
          (d.lost || Math.abs(d.psi) > 1) &&
          this.lostT > 1.2 &&
          ((this.lostT = 0),
          this.ownRoute(this.env.route?.() || u, e, o, a, c, h));
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
          let S = (this.gp ||= new Lx(n));
          (S.n && S.locate(o, a, c, h, 6), (this._gT = (this._gT || 0) - t));
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
          ? (this.wide = d.locate(o, a, c, h, 14))
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
        (M.n && M.locate(o, a, c, h, 5), (this._pT -= t));
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
            : M.n && M.locate(o, a, c, h, 5));
        let w = M.n && !M.lost && Math.abs(M.psi) < 1.3;
        if ((p || (p = w ? M : null), m && ((this.lane3 = w ? M : null), w))) {
          let z = this.path;
          ((this.path = M), this.intent(t, n), (this.path = z));
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
      let x = this.pursue(p, o, a, c, h, r, this._offAll);
      this.kPath = $s(x, -0.25, 0.25);
      let v = e.vel.x * l.x + e.vel.z * l.z;
      ((this.g = $s(
        this.stickFor(e, this.kPath * Math.max(r, 3), Math.max(v, 0.1)),
        -1,
        1,
      )),
        (this.conf =
          (this.mode === "l3" ? $s((r * 3.6 - 3) / 5, 0, 1) : 1) *
          $s((4.5 - p.d) / 2, 0, 1) *
          $s((1.1 - Math.abs(p.psi)) / 0.4, 0, 1)),
        p.pre && p.i < p.pre && (this.conf = 0));
      let y = this.mode === "l3" ? this.lane3 : null;
      return (
        y
          ? ((this.kL = $s(
              y === p ? this.kPath : this.pursue(y, o, a, c, h, r),
              -0.25,
              0.25,
            )),
            (this.confL =
              y.pre && y.i < y.pre
                ? 0
                : $s((r * 3.6 - 3) / 5, 0, 1) *
                  $s((4.5 - y.d) / 2, 0, 1) *
                  $s((1.1 - Math.abs(y.psi)) / 0.4, 0, 1)))
          : ((this.kL = 0), (this.confL = 0)),
        p
      );
    }
    cueUpdate(t, e) {
      if ((this._cueT = (this._cueT || 0) - t) > 0) return;
      this._cueT = 0.1;
      let s = this.cue,
        n = Math.hypot(e.vel.x, e.vel.z),
        o = this.path,
        a = 0;
      if (o && n > 2) {
        let f = 0.75 * (e.S.mu || 1.2) * Ow,
          u = Math.max(40, (n * n) / 5 + 25),
          d = o.S,
          p = o.K;
        for (let m = o.i + 1; m < o.n && d[m] - o.s < u; m++) {
          let g = Math.abs(p[m]);
          if (g < 0.012) continue;
          let b = Math.max(0.5, d[m] - o.s - 2),
            x = Math.sqrt(3.2 / g),
            v = Math.sqrt(f / g),
            y = n > x ? (n * n - x * x) / (2 * b) : 0;
          if ((n > v ? (n * n - v * v) / (2 * b) : 0) > 4 || y > 7) {
            a = 2;
            break;
          }
          y > 2.5 && (a = 1);
        }
      }
      let r = this.crit,
        l = n > 2 && r.on && r.areq > 1.5 && r.ttc < 4,
        c = l ? 3 : a,
        h = JI.indexOf(s.state);
      ((c >= h || (s.calmT = (s.calmT || 0) + 0.1) >= 0.4) &&
        ((s.calmT = 0), (s.state = JI[c])),
        (s.gap = l ? r.gap : 0));
    }
    clearIslands(t) {
      let e = this._world,
        s = e?.grid;
      if (!s) return;
      let n = (this._isl ||= []),
        o = (this._islS ||= new Set());
      ((n.length = 0), o.clear());
      for (let u = 0; u < t.n; u += 2) {
        let d = yp(Math.floor(t.X[u] / fo), Math.floor(t.Z[u] / fo));
        if (o.has(d)) continue;
        o.add(d);
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
        let x = (u.x - t.X[d]) * m + (u.z - t.Z[d]) * g,
          v = t.X[d] + m * x,
          y = t.Z[d] + g * x;
        for (let M of [0.6, 0.35, 0.1])
          if (
            ((t._args[2] = { x: v + (u.x - v) * M, z: y + (u.z - y) * M }),
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
                x = c[b] - c[g],
                v = h[b] - h[g],
                y = Math.hypot(x, v) || 1;
              ((x /= y), (v /= y));
              let M = v,
                S = -x,
                w = (E) => r.surfaceAt(d + M * E, p + S * E) === "road",
                z = w(0),
                _ = w(1.35),
                R = w(-1.35);
              if (z && _ && R) return !1;
              let T = 0;
              if (z)
                T =
                  !_ && R
                    ? w(0.75)
                      ? -0.4
                      : -0.8
                    : _ && !R
                      ? w(-0.75)
                        ? 0.4
                        : 0.8
                      : 0;
              else
                for (let E = 0.5; E <= 1.5 && !T; E += 0.5)
                  for (let A of [1, -1])
                    if (w(E * A) && w((E + 1.05) * A)) {
                      T = (E + 0.9) * A;
                      break;
                    }
              return T ? ((m[0] = M * T), (m[1] = S * T), !0) : !1;
            }
          : null;
      (n.length || f) && t.clearOf(n, 1, f);
    }
    laneGate(t, e, s, n) {
      let o = (this.lcG ||= { lc: null, del: 0, blk: null, P: null, bid: -1 });
      if (
        ((o.P !== t || o.bid !== t.bid) &&
          ((o.P = t),
          (o.bid = t.bid),
          (o.lc = null),
          (o.del = 0),
          (o.blk = null)),
        !this.prof?.pass || !t.lcs?.length)
      )
        return ((o.blk = null), o.lc && o.del ? this._lcOff : null);
      let a = t.s;
      if (o.lc) {
        let g = o.lc,
          b = this.sideBlocked(e, g.d, s);
        ((o.blk = b),
          b
            ? (o.del = Math.max(o.del, a - g.sA + 3))
            : a > g.sA + o.del + (g.sB - g.sA) + 5 &&
              ((o.lc = null), (o.del = 0)));
      } else
        for (let g of t.lcs) {
          if (
            g.join ||
            g.sB < a ||
            g.sA > a + Math.max(18, s * 2.6) ||
            (a - g.sA) / Math.max(1, g.sB - g.sA) > 0.45
          )
            continue;
          let x = this.sideBlocked(e, g.d, s);
          x && ((o.lc = g), (o.del = Math.max(0, a - g.sA + 3)), (o.blk = x));
          break;
        }
      if (!o.lc) return null;
      let r = o.lc,
        l = 1e9;
      for (let g of t.marks)
        if (g.sLine >= r.sB - 2) {
          l = g.sLine - 1;
          break;
        }
      ((o.waitT =
        o.waitAt != null && s < 0.5
          ? (o.waitT || 0) + n
          : (o.waitAt != null && o.waitT) || 0),
        o.waitT > 6 && (o.gave = r));
      let c = o.gave === r,
        h = Math.max(6, r.sB - r.sA),
        f = r.d,
        u = r.sA,
        d = c ? r.sA + o.del : Math.min(r.sA + o.del, l - 14),
        p = (g) => ((g = $s(g, 0, 1)), g * g * (3 - 2 * g));
      o.waitAt = o.blk && !c && r.sA + o.del > l - 14 ? l - 14 : null;
      let m = Math.max(
        14,
        Math.min(h, Math.min(r.join ? 1e9 : r.sB + 6, l) - d),
      );
      return (
        (this._lcOff = (g) => f * (p((g - u) / h) - p((g - d) / m))),
        this._lcOff
      );
    }
    overtake(t, e, s, n, o, a) {
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
      let x = null;
      for (let A of s.marks)
        if (A.sOut > s.s) {
          x = A;
          break;
        }
      let v = x ? x.sLine - s.s : 1e9;
      if (
        v < 32 ||
        (d && v < l.gap + 25) ||
        (u &&
          r.gap > v - 5 &&
          !(x && Math.abs(x.turn) < 0.6 && !x.stop && x.ctl !== 2))
      )
        return;
      let y = Ot(m, p.s, (this._ro2 ||= {})),
        M = (e.pos.x - y.x) * y.nx + (e.pos.z - y.z) * y.nz,
        S = 0,
        w = 1e9;
      for (let A = 0; A < b; A++) {
        let C = Math.abs(c.laneV(m, g, A, y.w) - M);
        C < w && ((w = C), (S = A));
      }
      if (w > 1.2) return;
      let z = g * (y.dz * y.nx - y.dx * y.nz),
        _ = r.on ? r.vo : 0,
        R = null;
      for (let A of [S - 1, S + 1]) {
        if (A < 0 || A >= b) continue;
        let C = (c.laneV(m, g, A, y.w) - M) * z;
        if (
          Math.abs(C) < 2 ||
          this.sideBlocked(e, C, n) ||
          !this.laneClear(
            e,
            m,
            g,
            A,
            p.s,
            Math.min(300, Math.abs(s.chain[p.ci].sB - p.s) + 6),
          )
        )
          continue;
        if (x && v < 120 && Math.abs(x.turn) > 0.6) {
          let N = x.turn > 0 ? b - 1 : 0;
          if (Math.abs(A - N) > Math.abs(S - N)) continue;
        }
        let P = 99,
          I = 99,
          L = e.forward();
        for (let N of h.cars) {
          if (N.wreck || N.E !== m || N.dir !== g || N.k !== A) continue;
          let B = (N.x - e.pos.x) * L.x + (N.z - e.pos.z) * L.z;
          B > 0 && B < 70 && B < I && ((I = B), (P = N.v));
        }
        let F = Math.min(P + (I > 40 ? 6 : I > 20 ? 2 : -2), f) - (d ? 0 : _);
        F > 2 && (!R || F > R.gain) && (R = { k2: A, d: C, gain: F });
      }
      if (!R) return;
      let T = !(x && Math.abs(x.turn) > 0.6),
        E = s.chain[p.ci + 1];
      if (T && E) {
        let A = Math.min(R.k2, c.lanes(E.E) - 1);
        this.laneClear(
          e,
          E.E,
          E.dir,
          A,
          E.dir > 0 ? E.E.s0 : E.E.s1,
          Math.min(120, E.E.s1 - E.E.s0),
        ) || (T = !1);
      }
      this.rebuild(s, e, p, R.k2, T ? null : S) &&
        ((this.ovT = this.prof.passCool ?? 5),
        (this.ovW = 0),
        (this.passes = (this.passes || 0) + 1),
        this.events.push({
          type: "lane",
          side: Math.sign(R.d),
          why: d ? "around" : "pass",
        }));
    }
    passOncoming(t, e, s, n, o) {
      if (this.onc || !this.prof?.pass || (this.prof.oncPass ?? 0) <= 0) return;
      let a = this.lead,
        r = a.c?.traffic,
        l = this.env.roads,
        c = this.env.traffic,
        h = s.E,
        f = s.dir;
      if (!r || a.gap > 30 || h.lg?.med > 0.1) return;
      let u = Math.min(o, a.vo + 8),
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
      let x = Ot(h, s.s, (this._ro5 ||= {})),
        v = (t.pos.x - x.x) * x.nx + (t.pos.z - x.z) * x.nz,
        y = l.laneV(h, -f, 0, x.w),
        M = f * (x.dz * x.nx - x.dx * x.nz),
        S = (y - v) * M;
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
    oncomingNear(t, e, s, n, o) {
      let a = this.env.traffic,
        r = t.forward(),
        l = n / Math.max(o, 1) + 2;
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
      let o = this.onc;
      if (!o) return null;
      if (o.P !== t || o.bid !== t.bid) return ((this.onc = null), null);
      o.t += n;
      let a = t.s,
        r = e.forward(),
        l = o.L,
        c = l && !l.wreck ? (l.x - e.pos.x) * r.x + (l.z - e.pos.z) * r.z : -99,
        h = (e.S.box?.hz ?? 2.3) + (l?.V?.L || 4.6) / 2,
        f = this.crit,
        u = f.on && f.kind === "car" && f.vo < -1 && f.ttc < 5;
      if (
        (!o.abort &&
          (u ||
            (a < o.end - 15 &&
              c > -h &&
              this.oncomingNear(
                e,
                this.here(t, e)?.E || t.chain[0].E,
                this.here(t, e)?.dir || 1,
                Math.max(20, o.end - a + 15),
                Math.max(s, 5),
              ))) &&
          c > 0.3 * h &&
          ((o.abort = !0), (o.end = Math.min(o.end, a + 2))),
        !o.abort && a > o.end - 16 && c > -(h + 6) && (o.end = a + 16),
        a > o.end + 16 || o.t > 25)
      )
        return ((this.onc = null), null);
      let d = (b) => ((b = $s(b, 0, 1)), b * b * (3 - 2 * b)),
        p = o.d,
        m = o.s0,
        g = o.end;
      return (
        (this.oncWhy = o.abort ? "pass aborted" : "passing"),
        (b) => -p * (d((b - m) / 15) - d((b - g) / 15))
      );
    }
    laneClear(t, e, s, n, o, a, r = null) {
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
        let b = o + s * g;
        if (b < e.s0 || b > e.s1) break;
        Ot(e, b, p);
        let x = r ? r(p.w) : h.laneV(e, s, n, p.w),
          v = p.x + p.nx * x,
          y = p.z + p.nz * x,
          M = p.dx * s,
          S = p.dz * s;
        for (
          let z = Math.floor((v - 4) / fo);
          z <= Math.floor((v + 4) / fo);
          z++
        )
          for (
            let _ = Math.floor((y - 4) / fo);
            _ <= Math.floor((y + 4) / fo);
            _++
          ) {
            let R = yp(z, _),
              T = c.get(R);
            if (T) {
              for (let E of T)
                if (
                  !(
                    E.dead ||
                    E.t === "poly" ||
                    E.wall ||
                    (E.y1 !== void 0 && (E.y1 < p.y - 0.5 || E.y0 > p.y + 1.5))
                  ) &&
                  Y_(E, v, y, M, S, u, d)
                )
                  return !1;
            }
          }
        let w = l.parked?.awake;
        if (w) {
          for (let z of w)
            if (
              Math.abs(z.x - v) < 6 &&
              Math.abs(z.z - y) < 6 &&
              Y_(z, v, y, M, S, u, d)
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
      let o = t.chain[s],
        a = o.E,
        r = o.dir,
        l = (this._ro4 ||= {}),
        c = o.sA,
        h = 1e18,
        f = Math.min(o.sA, o.sB),
        u = Math.max(o.sA, o.sB);
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
    rebuild(t, e, s, n = null, o = null) {
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
      if (!t.build(c, e, h, n, t.kind, null, o)) return !1;
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
      let o = t.forward(),
        a = o.x,
        r = o.z,
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
          x = p * l + m * c;
        if (Math.abs(x - e) > 1.9 || x * e <= 0 || Math.abs(x) < 1) continue;
        let v = d.v || 0,
          y = v - s,
          M = (d.V?.L || 4.6) / 2,
          S = b > 0 ? b - f - M < 2 + Math.max(0, -y) * 1.2 + s * 0.25 : !1,
          w = b <= 0 ? -b - f - M < 3 + Math.max(0, y) * 2.5 + s * 0.35 : !1;
        (S || w) &&
          (!u || Math.abs(b) < Math.abs(u.along)) &&
          (u = { c: d, along: b, v });
      }
      return u;
    }
    intent(t, e) {
      let s = this.path,
        n = s.s,
        o = null;
      for (let l of s.marks)
        if (l.sOut > n && l.sJ - n < 45) {
          o = l;
          break;
        }
      let a = this.pS > 0.25 ? 1 : this.pS < -0.25 ? -1 : 0;
      if (!o || !a || (a > 0 ? o.turn < -0.5 : o.turn > 0.5) || n > o.sJ - 2) {
        this.intentT = 0;
        return;
      }
      if ((this.intentT += t) < 0.12) return;
      this.intentT = 0;
      let r = kZ(a)(jI(e, o.E, o.dir), o.E);
      !r ||
        (r.F === o.F && r.dir === o.dirF) ||
        (this.choice.set(o.E.id * 2 + (o.dir > 0 ? 1 : 0), {
          F: r.F,
          dir: r.dir,
        }),
        (this._replan = !0),
        (this._pT = 0));
    }
    filter(t, e, s, n) {
      let o = this.out,
        a = n.S;
      ((o.throttle = e.throttle),
        (o.brake = e.brake),
        (o.steer = e.steer),
        (o.handbrake = e.handbrake || 0),
        (o.nitro = e.nitro),
        (o.lookBack = e.lookBack),
        (o.digitalBrake = e.digitalBrake),
        (o.player = e.player),
        (this.only = !1));
      let r = this.mix;
      if (((r.w = 1), (r.p = 1), this.mode === "l5"))
        return this.auto(t, e, s, n);
      let l = n.forward(),
        c = n.vel.x * l.x + n.vel.z * l.z,
        h = Math.hypot(n.vel.x, n.vel.z),
        f = this.mode === "l4",
        u = $s(e.steer || 0, -1, 1);
      if (
        ((this.pS =
          (this.pS || 0) + (u - (this.pS || 0)) * Math.min(1, t / 0.3)),
        this.pathStep(t, n, e),
        n.reverse && c < -0.3 && n.onGround)
      )
        return (
          (this.state = ""),
          (this.stG = u),
          f ? this.filterReverse(t, e, s, n, l, -c, h) : (this.reset(), o)
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
          o
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
          !(o.handbrake > 0.5) &&
          !(n.impactT > 0) &&
          (f && this.path ? c > -0.2 : c > 1.2),
        g =
          p < 0.12 ? $s((c * 3.6 - 4) / 5, 0, 1) : $s((c * 3.6 - 9) / 8, 0, 1),
        b =
          !!this.avC &&
          this.avOK &&
          m &&
          g > 0.5 &&
          FZ(this.stickFor(n, this.avK * h, c) - d, d, p) > 0.5,
        x = this.critAv,
        v = this.crit,
        y = 0,
        M = 1;
      (b &&
        x.on &&
        x.ttc >= 0.9 &&
        (M = Math.min(M, $s((Bs.aOn * 1.5 - x.areq) / Bs.aOn, 0, 1))),
        x.on && (!b || x.ttc < 0.9) && (!v.on || x.areq > v.areq) && (v = x));
      let S = this.lead;
      if (!f) return this.filterL3(t, e, s, n, l, c, h, u, v, S);
      let w = 99;
      if (!f)
        ((this.braking = !1),
          (this.emergency = !1),
          (this.brk = 0),
          h > 2 &&
            (v.on &&
              v.areq > Bs.l3A0 &&
              (w =
                Math.max(0, v.vo) +
                Math.sqrt(2 * Bs.l3A0 * Math.max(0, v.gap - v.d0))),
            this.path &&
              this.conf > 0.3 &&
              (w = Math.min(
                w,
                this.path.speedAhead(Bs.l3Lat, 1.8, 150, 99, 0, !1, !1),
              ))),
          (this.aCmd = 0),
          (this.thrMax = 1),
          (this.suggest = w < 90 ? w : 0));
      else {
        if (v.on) {
          let N = v.areq,
            B = v.kind === "ped" ? Bs.pedOn : Bs.aOn;
          if (
            (!this.braking && N > B && c > 0.6 && (this.braking = !0),
            this.braking && (N < Bs.aOff || c < 0.6) && (this.braking = !1),
            (M = $s((B - N) / (B - Bs.aThr * (B / Bs.aOn)), 0, 1)),
            v.gap < v.d0 + 6 &&
              v.dMin < (a.box?.hx ?? 0.97) * 0.6 &&
              (M = Math.min(
                M,
                $s(
                  (Math.sqrt(Math.max(0, v.gap - v.d0 - 0.2)) -
                    (c - Math.max(0, v.vo))) *
                    0.6,
                  0,
                  1,
                ),
              )),
            this.braking)
          ) {
            let H = N * 1.2 + 0.3;
            ((this.emergency =
              H > (a.daComf ?? Bs.comf) * 1.02 &&
              v.ttc < 2.2 &&
              (v.dMin < (a.box?.hx ?? 0.97) * 0.6 || v.ttc < 0.6)),
              (y = this.emergency
                ? Math.min(Bs.emerg, N * 1.3 + 0.5)
                : Math.min(a.daComf ?? Bs.comf, H)));
          }
        } else this.braking = !1;
        if (
          (this.braking || (this.emergency = !1),
          (this.heldT =
            v.on && c < 0.4 && e.throttle > 0.3 && M < 0.05
              ? (this.heldT || 0) + t
              : 0),
          this.heldT > 1.2 &&
            v.vo < 0.3 &&
            v.kind !== "ped" &&
            v.kind !== "car" &&
            v.dMin > (a.box?.hx ?? 0.97) * 0.45 &&
            (M = Math.max(M, $s((0.9 - c) * 0.5, 0, 0.3))),
          this.vPrev !== null &&
            (this.axS +=
              ((c - this.vPrev) / t - this.axS) * Math.min(1, t / 0.15)),
          (this.vPrev = c),
          e.throttle > 0.05 && !(e.brake > 0.1))
        ) {
          let N = Math.min(Bs.l5Max, this.vSight());
          if (
            ((this.aNeed = 0),
            this.path &&
              this.conf > 0.3 &&
              ((N = Math.min(
                N,
                this.path.speedAhead(Bs.l4Lat, Bs.l4Dec, 260, 99, h, !1) * 1.05,
                Fx(this.path.left - 3, Bs.l5Stop),
              )),
              (this.aNeed = this.path.aNeed)),
            S.on &&
              S.vo > 0.5 &&
              (N = Math.min(
                N,
                Math.max(0, S.vo + 0.4 * (S.gap - (Bs.gap0 + Bs.head * h))),
              )),
            v.on)
          ) {
            let B = Math.max(0, v.vo),
              H = v.gap - v.d0 - 0.4;
            ((N = Math.min(N, B + Fx(H, Bs.l5Stop))),
              h > B &&
                (this.aNeed = Math.max(
                  this.aNeed,
                  (h * h - B * B) / (2 * Math.max(0.25, H)),
                )));
          }
          ((this.heldP =
            v.on &&
            h < 0.4 &&
            v.vo < 0.3 &&
            v.kind !== "ped" &&
            v.kind !== "car" &&
            this.path &&
            this.path.d > 0.6
              ? (this.heldP || 0) + t
              : 0),
            this.heldP > 1.5 && ((N = Math.max(N, 0.7)), (this.aNeed = 0)),
            (N *= 1 - Bs.l4Player + Bs.l4Player * $s(e.throttle / 0.8, 0, 1)),
            (o.throttle = 0),
            this.speedLoop(
              t,
              n,
              s,
              l,
              c,
              h,
              N,
              this.emergency
                ? Bs.emerg
                : Math.max(
                    Bs.l4Brk,
                    Math.min(a.daComf ?? Bs.comf, (v.on ? v.areq : 0) * 1.2),
                  ),
              8,
            ),
            o.throttle > e.throttle && (o.throttle = e.throttle),
            this.brk > 0.01 && ((this.only = e.brake < 0.1), (o.nitro = !1)),
            (this.thrMax = 1),
            (this.suggest = N),
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
      let z = f ? Bs.nudge : Bs.l3Av,
        _ = 0;
      if (
        (this.path &&
          this.conf > 0.3 &&
          !this.smallNudge() &&
          ((this.avC = null), (this.avOK = !1), (this.recT = 0)),
        m && this.avC && this.avOK && g > 0)
      ) {
        let N = $s(this.avK * h, -Bs.latMax / h, Bs.latMax / h);
        _ = $s(this.stickFor(n, N, c) - d, -z, z) * g;
      }
      if (this.recT > 0) {
        this.recT -= t;
        let N = n.vel.x / h,
          B = n.vel.z / h,
          H = Math.atan2(
            N * this.recZ - B * this.recX,
            N * this.recX + B * this.recZ,
          );
        Math.abs(H) < 0.006 || this.avC || this.path
          ? (this.recT = 0)
          : m &&
            g > 0 &&
            (_ =
              $s(
                this.stickFor(
                  n,
                  $s(-2.2 * H, -Bs.latMax / h, Bs.latMax / h),
                  c,
                ) - d,
                -z,
                z,
              ) * g);
      }
      let R = FZ(_, d, p);
      ((_ *= R),
        (this.avYield = this.avC && R < 0.05 && p > 0.1 ? this.avYield + t : 0),
        this.avYield > 0.3 && ((this.avC = null), (this.avOK = !1)),
        m || (_ = 0),
        (this.nud += $s(_ - this.nud, -Bs.slew * t, Bs.slew * t)));
      let T = u,
        E = 1;
      if (this.path && this.conf > 0 && m && !this.avC) {
        let N = this.conf;
        if (((T = u + (this.g - u) * N), f))
          E =
            Bs.l4Player * $s(p / 0.15, 0, 1) +
            (1 - Bs.l4Player) * $s((p - Bs.l4Hard) / 0.3, 0, 1);
        else {
          let B = this.g * u < 0 ? $s((Math.abs(u) - 0.25) / 0.3, 0, 1) : 0;
          E = Bs.l3Player + (1 - Bs.l3Player) * B;
        }
      }
      let A = E < 1;
      this.stG = A ? u * E + T * (1 - E) : u;
      let C = this.stG + this.nud,
        P = p > Bs.l4Hard;
      ((o.steer = $s(C, -1, 1)),
        f && !P && (o.player = !1),
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
          !P &&
          m &&
          A &&
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
            ? Bs.l4Player
            : this.brk > (e.brake || 0) + 0.01
              ? 0
              : 1
          : 1));
      let F = this.stat;
      return (
        (F.gap = v.on ? v.gap : 0),
        (F.areq = v.on ? v.areq : 0),
        (F.kind = v.on ? v.kind : ""),
        (F.aCmd = y),
        (F.nudge = this.nud),
        (F.lk = this.lk),
        (F.thrMax = M),
        (F.emergency = this.emergency),
        o
      );
    }
    filterL3(t, e, s, n, o, a, r, l, c, h) {
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
        let _ = l * m < 0 ? 12 : Math.abs(l) > Math.abs(m) ? Bs.l3Up : Bs.l3Dn;
        m += $s(l - m, -_ * t, _ * t);
      } else m = l;
      this.pA = m;
      let g = m,
        b = 0,
        x = (e.handbrake || 0) > 0.5 || n.drift > 0.3 || n.impactT > 0;
      if (
        ((this.calm3 = Math.abs(l) < 0.05 ? (this.calm3 || 0) + t : 0),
        r > 2.5 && n.onGround && !x)
      ) {
        let _ = Math.max(a, 0.1),
          R = Math.max(r, 3),
          T = this.pS || 0,
          E = Math.sign(T),
          A = n.pos.x,
          C = n.pos.z,
          P = r > 2 ? n.vel.x / r : -Math.sin(n.psi),
          I = r > 2 ? n.vel.z / r : -Math.cos(n.psi);
        if (!this.tP && Math.abs(T) > 0.3 && m * T > 0) {
          let N = this.path,
            B = this.lane3,
            H = (O) => {
              for (let D of O.marks) if (D.sOut >= O.s) return D;
              return null;
            };
          (N &&
          this.conf > 0.3 &&
          N.d < 2.5 &&
          Math.abs(N.psi) < 0.7 &&
          this.turnNear(N, E)
            ? ((this.tP = N), (this.tM = H(N)))
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
        if (L && F && L.locate(A, C, P, I, 6) && L.d < 3.5) {
          let B =
              !this.tM || L.s > this.tM.sOut + 1
                ? $s(1 - ((this.tHoldT += t) - 1.5) / 0.5, 0, 1)
                : 1,
            H =
              $s((-L.e * this.tSide - 0.4) / 0.8, 0, 1) *
              (m * this.tSide > 0 ? 1 : 0);
          B > 0
            ? ((b = B * (1 - H)),
              (g =
                m +
                (this.stickFor(
                  n,
                  $s(this.pursue(L, A, C, P, I, r), -0.25, 0.25) * R,
                  _,
                ) -
                  m) *
                  B *
                  (1 - H)))
            : (this.tP = null);
        } else L && (this.tP = null);
        if (!b) {
          let N = this.lane3,
            B = $s((this.calm3 - 0.5) / 0.5, 0, 1);
          if (
            N &&
            B > 0 &&
            this.confL > 0.3 &&
            N.d < 2.5 &&
            Math.abs(N.psi) < 0.5
          ) {
            let O = -N.curvAt(Math.min(6, r * 0.3), 2),
              D = Math.abs(O) < 0.03 ? O : 0,
              U = Math.max(4.5, 3 + 0.45 * r),
              G = Math.abs(N.e) > 1.1 ? N.e - Math.sign(N.e) * 1.1 : 0;
            ((g =
              m +
              (this.stickFor(n, (D - (0.8 * N.psi) / U - G / (U * U)) * R, _) -
                m) *
                B *
                this.confL),
              (b = B * this.confL));
          }
          let H = n.beta || 0;
          if (Math.abs(H) > 0.08 && r > 5) {
            let O = this.stickFor(n, 1, _),
              D = O > 0.001 ? g / O : 0;
            g +=
              $s(this.stickFor(n, (D - n.r) * Bs.l3Yaw, _), -0.4, 0.4) *
              $s((Math.abs(H) - 0.08) / 0.1, 0, 1);
          }
        }
        Math.abs(l) > 0.5 &&
          g * l < 0 &&
          Math.abs(n.beta || 0) < 0.12 &&
          (g = 0);
      }
      ((f.steer = $s(g, -1, 1)),
        (f.player = !0),
        (this.stG = f.steer),
        (this.lk = f.steer - l),
        (this.snap = b),
        (f.throttle = e.throttle || 0));
      let v = e.brake || 0,
        y = 0,
        M = 1e9,
        S = !1;
      if (v > 0.05 && a > 1) {
        if (
          (c.on &&
            c.areq > 0.3 &&
            ((y = Math.max(y, c.areq * 1.15 + 0.3)),
            (M = Math.min(M, Math.max(0, c.vo)))),
          h.on && h.vo > 0.5 && r > h.vo)
        ) {
          let T = Math.max(1, h.gap - Bs.gap0 - 0.8 * h.vo);
          ((y = Math.max(y, (r * r - h.vo * h.vo) / (2 * T))),
            (M = Math.min(M, h.vo)));
        }
        let _ = this.lane3 || this.path;
        if (_ && (this.confL > 0.3 || this.conf > 0.3)) {
          let T = _.speedAhead(Bs.l3BLat, 3, 120, 99, r, !1, !1);
          T < r + 0.5 &&
            ((y = Math.max(y, _.aNeed * 1.05, (r - T) * 0.8)),
            (M = Math.min(M, T)));
        }
        let R =
          e.digitalBrake && u.comfortBrake
            ? u.comfortBrake
            : v * u.mu * Ow * 0.9;
        S = y > R + 0.5 && r > M + 0.3;
      }
      (S
        ? ((f.brake = 0),
          (f.digitalBrake = !1),
          (this.emergency = y > 6),
          this.brakePedal(
            t,
            n,
            s,
            o,
            a,
            Math.min(Bs.emerg, y * 1.1 + 0.3),
            { brake: 0 },
            1,
          ),
          (f.brake = Math.max(f.brake, v)),
          f.brake > 0.01 && (f.throttle = 0))
        : ((this.brk = 0),
          (this.bI *= Math.exp(-t / 0.3)),
          (f.brake = v),
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
      let z = this.stat;
      return (
        (z.gap = c.on ? c.gap : 0),
        (z.areq = c.on ? c.areq : 0),
        (z.kind = c.on ? c.kind : ""),
        (z.aCmd = this.aCmd),
        (z.nudge = 0),
        (z.lk = this.lk),
        (z.thrMax = 1),
        (z.emergency = this.emergency),
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
    brakePedal(t, e, s, n, o, a, r, l) {
      let c = e.S,
        h = this.out,
        f = 0;
      if (a > 0 && o > 0.6) {
        let p = e.gSlope(e.pos.x, e.pos.z, s),
          m = Math.sqrt(1 + p.dx * p.dx + p.dz * p.dz),
          g = (-Ow * (p.dx * n.x + p.dz * n.z)) / m,
          b = c.ev ? 4 * Math.min(c.regen, Math.abs(o) * 64) : 0;
        (this.mode === "l5"
          ? (this.bI = $s(this.bI + (a + this.axS) * t * 0.5, -0.15, 0.6))
          : (this.bI = $s(this.bI + (a + (e.ax || 0)) * t * 0.08, -0.15, 0.25)),
          (f =
            a >= Bs.emerg - 0.01
              ? 1
              : $s(
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
      ((this.brk += $s(f - this.brk, -d * t, u * t)),
        o < 0.6 && (this.brk = 0),
        (this.brk > 0.005 || l < 1) &&
          ((h.throttle = this.brk > 0.01 ? 0 : Math.min(h.throttle, l)),
          this.brk > h.brake &&
            ((this.only = h.brake < 0.1),
            (h.brake = this.brk),
            (h.digitalBrake = h.digitalBrake && r.brake >= this.brk)),
          this.brk > 0.01 && (h.nitro = !1)));
    }
    auto(t, e, s, n) {
      let o = this.out,
        a = n.S;
      if (
        e.player !== !1 &&
        (Math.abs(e.steer || 0) > 0.25 ||
          (e.brake || 0) > 0.2 ||
          (e.handbrake || 0) > 0.5)
      )
        return (this.takeOver("input"), this.filter(t, e, s, n));
      ((o.throttle = 0),
        (o.brake = 0),
        (o.steer = 0),
        (o.handbrake = 0),
        (o.nitro = !1),
        (o.digitalBrake = !1),
        (o.player = !1));
      let r = n.forward(),
        l = n.vel.x * r.x + n.vel.z * r.z,
        c = Math.hypot(n.vel.x, n.vel.z),
        h = e.player !== !1 ? $s(((e.throttle || 0) - 0.05) / 0.75, 0, 1) : 0;
      this.gasS =
        (this.gasS || 0) + (h - (this.gasS || 0)) * Math.min(1, t / 0.4);
      let f = Im[this.profile] || Im[ZI],
        u = this.gasS,
        d = (this.prof = f.pass ? e3t((this._pb ||= {}), f, t3t, u) : f);
      this.boost = f.pass && u > 0.15;
      let p = f.pass ? d.cruise : d.cruise + (Bs.l5Max - d.cruise) * u,
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
        x = this.env.traffic;
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
          c < 1.4 && (o.throttle = 0.15),
          (this.state = "driving"),
          o
        );
      if (!n.onGround) return ((this.state = "driving"), o);
      let v = this.env.rides?.()?.state,
        y =
          v === "boarding" ||
          v === "alighting" ||
          v === "summary" ||
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
        z = "",
        _ = null,
        R = Math.max(Bs.l5Brk, (d.stop || 0) + 0.8);
      ((this.aNeed = 0), (this.aNeedObs = 0));
      let T = (C, P, I, L = !1) => {
        let F = P + Fx(C, L ? Math.min(d.stop, 3.5) : d.stop);
        if ((F < w && ((w = F), (z = I)), c > P)) {
          let N = (c * c - P * P) / (2 * Math.max(0.25, C));
          (N > this.aNeed && (this.aNeed = N),
            L && N > this.aNeedObs && (this.aNeedObs = N));
        }
      };
      if (!b) z = this.env.roads?.laneV ? "no road" : "unavailable";
      else if (y)
        z =
          v === "boarding"
            ? "pickup"
            : v === "alighting" || v === "summary"
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
        let C = b.left - (b.endStop ? 0.5 : 3);
        if (
          (C < 60 && T(C, 0, b.endStop ? "kerb" : "dead end"),
          b.endStop &&
            C < 1.2 &&
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
        let P = this.junctions(b, c, S, t);
        if (
          ((_ = P.claim),
          P.vHold < w && (w = P.vHold),
          P.vGlide > 2.5 && P.vGlide <= Fx(P.g, d.stop)
            ? P.vGlide < w && ((w = P.vGlide), (z = "timing the light"))
            : P.g < 1e8 && T(P.g + (P.vEnd ? 1.2 : 0), P.vEnd || 0, P.why),
          P.jCaps)
        ) {
          for (let B of P.jCaps)
            if (!(P.g < B.g)) {
              let H = B.v + Fx(B.g, d.dec);
              H < w && ((w = H), (z = z || "junction"));
            }
        }
        b.join && b.s < b.join && this.mergeBlocked(n, c) && T(0, 0, "merging");
        let I = this.lead;
        if (I.on && I.vo > 0.5) {
          let B = Math.max(0, I.vo + 0.4 * (I.gap - (d.gap0 + d.head * c)));
          B < w && ((w = B), (z = z || "following"));
        }
        let L = this.crit;
        if (this.narrow && this.narrow.v < w) {
          let B = this.narrow,
            H = B.v + Fx(B.g, 3);
          H < w && ((w = H), (z = z || "narrow"));
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
            L.areq > R && (R = Math.min(Bs.emerg, L.areq * 1.3 + 0.5))),
          d.pass && !y && this.overtake(t, n, b, c, w, P),
          this.onc?.abort && this.onc.L && !this.onc.L.wreck)
        ) {
          let B = Math.max(0, this.onc.L.v - 2.5);
          B < w && ((w = B), (z = "pass aborted"));
        } else this.onc && !z && (z = "passing");
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
            H < w && ((w = H), (z = "merging"));
          }
          B?.lc &&
            B.waitAt != null &&
            B.P === b &&
            T(B.waitAt - b.s, 0, "merging");
        }
        this.clearOut > 0 &&
          _ &&
          c > 2 &&
          !(L.on && L.kind !== "car" && L.gap < 8) &&
          ((w = Math.max(
            w,
            Math.min(c, b.speedAhead(Bs.l5Lat, Bs.l5Dec, 60, Bs.l5Max)),
          )),
          (this.aNeed = 0),
          (z = "clearing"));
        let F = L.on && L.kind === "car" ? L.c?.traffic : null,
          N = F && -Math.sin(F.heading) * r.x - Math.cos(F.heading) * r.z < 0.7;
        if (
          ((this.gridT =
            N && c < 0.3 && (F.v || 0) < 0.3 ? (this.gridT || 0) + t : 0),
          (this.stuckT =
            (w < 0.3 &&
              c < 0.3 &&
              L.on &&
              L.vo < 0.3 &&
              L.kind !== "car" &&
              L.kind !== "ped" &&
              !(P.why && P.g < L.gap + 4)) ||
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
                O = b.chain[Math.min(b.chain.length - 1, (H?.ci ?? 0) + 1)]?.E,
                D = H?.E;
              ((B.avoid ||= new Set()),
                O && B.avoid.add(O),
                D && D !== O && b.chain.length > 1 && B.avoid.add(D),
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
        (x && ((x.playerJ = _), (x.playerAuto = !0)),
        (this.claim = _),
        this.softOK &&
          Math.hypot(n.pos.x - this.softX, n.pos.z - this.softZ) < 25 &&
          (w = Math.min(w, 2.5)),
        b && (this.turnTo || Math.abs(b.psi) > 0.6 || b.d > 1.5))
      ) {
        let C = Math.max(2, 7 - 5 * Math.abs(b.psi) - 2 * Math.max(0, b.d - 1));
        C < w && ((w = C), (z = z || "rejoining"));
      }
      if (
        (this.speedLoop(t, n, s, r, l, c, w, R, g, d),
        b &&
          (o.steer = $s(
            this.avC && this.avOK
              ? this.stickFor(n, this.avK * Math.max(c, 3), Math.max(l, 0.1))
              : this.g,
            -1,
            1,
          )),
        d.pass)
      ) {
        let C = 0.04 + 0.004 * c;
        ((this.stS =
          this.stS === void 0
            ? o.steer
            : this.stS + (o.steer - this.stS) * Math.min(1, t / C)),
          (o.steer = this.stS));
      }
      ((this.why = z),
        (this.suggest = w),
        (this.mix.w = 0),
        (this.mix.p = 0),
        (this.state =
          y || this.arrived || (z && w < 0.5)
            ? "waiting"
            : b
              ? "driving"
              : "waiting"),
        (this.active += ((b ? 1 : 0.3) - this.active) * Math.min(1, t * 4)));
      let E = this.stat,
        A = this.crit;
      return (
        (E.gap = A.on ? A.gap : 0),
        (E.areq = A.on ? A.areq : 0),
        (E.kind = A.on ? A.kind : ""),
        (E.aCmd = this.aCmd),
        (E.nudge = 0),
        (E.lk = 0),
        (E.thrMax = 1),
        (E.emergency = this.emergency),
        o
      );
    }
    startRecovery(t, e) {
      let s = 0,
        n = e.c,
        o = n
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
      if (Number.isFinite(o)) {
        let l = t.forward(),
          c = (o - t.pos.x) * l.z - (a - t.pos.z) * l.x;
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
    recover(t, e, s, n, o, a) {
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
      let c = Math.max(0, -o);
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
          (l.brake = e.reverse ? $s(0.2 + (1.3 - c) * 0.3, 0.04, 0.45) : 0.35));
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
      return Math.sqrt(2 * Bs.sightA * (Bs.sMax - 10));
    }
    speedLoop(t, e, s, n, o, a, r, l, c = Bs.l5Acc, h = null) {
      let f = this.out,
        u = e.S,
        d = $s(
          (r - a) * (r < a ? 1.1 : h ? h.gain : 0.8),
          -l,
          c * $s(0.6 + a / 8, 0, 1),
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
            l > Math.max(Bs.l5Brk, (h.stop || 0) + 0.8) + 0.01 ||
            -d > Math.max(4.5, (h.stop || 0) + 1.2),
          x = b ? h.jerkE : h.jerk;
        ((this.aJ =
          this.aJ === void 0
            ? d
            : this.aJ +
              $s(d - this.aJ, -x * t, (this.aJ < -0.3 ? x * 1.5 : x) * t)),
          d < this.aJ - 0.6 && b && (this.aJ = d),
          (d = this.aJ));
      }
      let g = this.thrI < 0.01 && this.axS > d + 0.3;
      if (r < 0.25 && o < 0.5) {
        ((this.thrI = 0), (this.aCmd = 0), (this.brk = 0));
        return;
      }
      (!g && d > -2.2
        ? ((this.thrI = $s(this.thrI + (d - this.axS) * 0.6 * t, 0, 1)),
          (this.hillK =
            d > 0.3 && a < 1.5 && this.axS < 0.25
              ? Math.min(0.7, (this.hillK || 0) + t * 0.35)
              : Math.max(0, (this.hillK || 0) - t * 0.5)),
          (f.throttle = $s(
            this.thrI + 0.08 * d + 0.04 * (d - this.axS),
            0,
            Math.min(1, (h?.launch ?? 0.3) + 0.12 * a + this.hillK),
          )),
          (this.aCmd = 0),
          (this.emergency = !1),
          this.brakePedal(t, e, s, n, o, 0, { brake: 0 }, 1))
        : ((this.thrI = Math.max(0, this.thrI - t * 2)),
          (this.aCmd = -d),
          (this.emergency = -d > Bs.comf * 1.05),
          this.brakePedal(t, e, s, n, o, -d, { brake: 0 }, 0),
          this.brk > 0.01 && (f.throttle = 0)),
        r < 0.25 && o < 0.8 && (f.throttle = 0));
    }
    junctions(t, e, s, n) {
      let o = this.env.roads,
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
          u < (f.ctl === 2 && K_ ? -4 : f.stop && !f.done ? -3 : -0.6) || f.go)
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
        if (f.ctl === 2 && f.leg && K_) {
          (f.leg.ph
            ? u < Math.max(35, e * 7)
            : u < 90 && u < Math.max(e, 3) * 7) && o.call?.(f.J, f.leg.ph, r);
          let m = o.signal(f.J, f.leg.ph, r);
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
                x = (e * e) / (2 * Math.max(0.3, u)),
                v = (this.prof?.stop || 4) + 2.5;
              f.yStop && x < 9
                ? ((d = !0), (p = "yellow light"))
                : u <= 0.3 ||
                    (b < g - 0.35 &&
                      (u + (f.sOut - f.sLine) + 5) / Math.max(e, 0.5) <
                        g + 1) ||
                    x > v
                  ? ((u < 2.5 || x > v) && (f.go = !0),
                    (c.vHold = Math.max(e, 3)))
                  : ((d = !0), (p = "yellow light"), (f.yStop = !0));
            } else
              (e * e) / (2 * Math.max(0.3, u)) < 4
                ? ((d = !0), (p = "yellow light"))
                : (f.go = !0);
          else if (h && u > 0.3 && !f.go) {
            let g = this.sigT(f, r),
              b = g.tR,
              x = u / Math.max(e, 0.5),
              v = (e * e) / (2 * Math.max(0.3, u)),
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
              b < 7 && x > b - 0.35 && v < 3.2 && u > 4
                ? ((d = !0), (p = "stale green"))
                : b < 7 && y > b + 0.8 && u > 2
                  ? v < (this.prof?.stop || 4) + 1
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
        } else if (f.stop && K_) {
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
          (!K_ || f.ctl === 0 || f.ctl === 3) &&
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
        o = n.x,
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
          m = d * o + p * a;
        if (m < -f || m > 14) continue;
        let g = Math.abs(d * a - p * o);
        if (
          !(g > 5.5 || c.fx * o + c.fz * a < 0.6) &&
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
      for (let o of s.cars) {
        let a = o.nx;
        if (
          o.wreck ||
          o.cv ||
          o.passed ||
          !a ||
          a.J !== t.J ||
          !a.leg ||
          (o.E === t.E && o.dir === t.dir) ||
          ((t.J.ctl === 1 || (t.J.ctl === 3 && a.leg.stop)) &&
            !(o.stopDone && o.waitT > 0.3 && n.rem(o) < 9))
        )
          continue;
        let l = n.rem(o);
        if (
          l < 60 + e * 9 &&
          l / Math.max(o.v, 0.5) <
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
      for (let o of s.cars) {
        if (o.wreck) continue;
        if (o.cv && o.cv.J === t.J) {
          if (
            o.v > 0.8 &&
            o.fx * -t.leg.hx + o.fz * -t.leg.hz < -0.5 &&
            !(o.cv.to?.turn < -0.6)
          )
            return !1;
          continue;
        }
        let a = o.nx;
        if (
          o.passed ||
          !a ||
          a.J !== t.J ||
          !a.leg ||
          a.leg.hx * t.leg.hx + a.leg.hz * t.leg.hz > -0.6 ||
          a.turn < -0.6
        )
          continue;
        let r = n.rem(o);
        if (e) {
          if ((o.v * o.v) / 7 > r - 6 && o.v > 1) return !1;
          continue;
        }
        let l =
          this.mode === "l5" && this.prof?.pass
            ? 4 - 1 * (this.prof.boost || 0)
            : 5.5;
        if (r < 90 && (r < 20 || r / Math.max(o.v, 0.5) < l)) return !1;
      }
      return !this.busyOther(t.J);
    }
    filterReverse(t, e, s, n, o, a, r) {
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
        (!this.braking && g > Bs.aOn && a > 0.9 && (this.braking = !0),
          this.braking && (g < Bs.aOff || a < 0.9) && (this.braking = !1),
          (u = $s((Bs.aOn - g) / (Bs.aOn - Bs.aThr), 0, 1)),
          h.gap < h.d0 + 6 &&
            (u = Math.min(
              u,
              $s((Math.sqrt(Math.max(0, h.gap - h.d0 - 0.2)) - a) * 0.6, 0, 1),
            )),
          this.braking && (f = Math.min(Bs.emerg, g * 1.2 + 0.3)));
      } else this.braking = !1;
      let d = 0;
      if (f > 0) {
        let g = n.gSlope(n.pos.x, n.pos.z, s),
          b = Math.sqrt(1 + g.dx * g.dx + g.dz * g.dz),
          x = (Ow * (g.dx * o.x + g.dz * o.z)) / b;
        d =
          f >= Bs.emerg - 0.01
            ? 1
            : $s(
                (c.mass * (f + x) * c.wheelR) / (2 * (c.brakeF + c.brakeR)),
                0.02,
                1,
              );
      }
      ((this.brk += $s(d - this.brk, -3.5 * t, (f > Bs.comf ? 10 : 2.4) * t)),
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
        o = n.a + n.b,
        a = Math.max(s, 3),
        r = n.mu * Ow;
      if (t.assists?.steering) {
        let c = Math.min(n.steerMax, Math.atan((o * r * 1.5) / (a * a)));
        return Math.atan((e * o) / a) / c;
      }
      let l =
        n.steerMax +
        (n.steerMaxHigh - n.steerMax) *
          Math.pow($s((s * 3.6) / 250, 0, 1), 0.7);
      return Math.atan((e * o) / a) / l;
    }
    perceive(t, e, s, n, o = 1 / 120) {
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
        x = -m,
        v = a.a + a.b,
        y = Math.tan(t.steer || 0) / v,
        M = u
          ? -(t.r || 0) / Math.max(s, 1)
          : (0.5 * (t.r || 0) + 0.5 * (t.rDes ?? t.r ?? 0)) / Math.max(s, 3),
        S = $s(s < 4 ? y + (M - y) * $s((s - 2) / 2, 0, 1) : M, -0.25, 0.25);
      this.kS = (this.kS ?? S) + (S - (this.kS ?? S)) * Math.min(1, o / 0.2);
      let w = this._kOv ?? this.kS;
      Math.abs(w) < 1e-4 && (w = 0);
      let z = u ? null : this._pP,
        _ = $s(s * Bs.T + p + 3, Bs.sMin, Bs.sMax);
      z
        ? ((_ = Math.max(_, Math.min(Bs.sMax, (s * s) / 4 + p + 8))), (w = 0))
        : w && (_ = Math.min(_, 1.6 / Math.abs(w)));
      let R = t.pos.x,
        T = t.pos.z,
        E = t.pos.y,
        A = w ? 1 / Math.abs(w) : 0,
        C = w > 0 ? 1 : -1,
        P = this.O;
      ((P.ox = R),
        (P.oz = T),
        (P.ux = m),
        (P.uz = g),
        (P.lx = b),
        (P.lz = x),
        (P.k = w),
        (P.R = A),
        (P.sg = C),
        (P.path = !!z));
      let I = $s(s * 0.05, 0.7, 2) * (z ? 1.3 : 1),
        L = this.P,
        F = 0,
        N = 1e18,
        B = 1e18,
        H = -1e18,
        O = -1e18;
      z && (_ = Math.min(_, I * (YI - 1) - 1));
      let D = (this._T0 ||= { x: 0, z: 0, y: 0, i: 0 }),
        U = (this._T1 ||= { x: 0, z: 0, y: 0, i: 0 }),
        G = z && this._offP === z ? this._offAll : null,
        q = z ? z.e + (G ? G(z.s) : 0) : 0;
      for (let et = 0; et <= _ + I * 0.5 && F < YI; et += I, F++) {
        let tt, it, rt, lt;
        if (z) {
          (z.at(et, D), z.at(et + 1.5, U));
          let ct = U.x - D.x,
            dt = U.z - D.z,
            ut = Math.hypot(ct, dt);
          ut > 0.2
            ? ((ct /= ut), (dt /= ut))
            : ((ct = F ? L[(F - 1) * 5 + 3] : m),
              (dt = F ? L[(F - 1) * 5 + 4] : g));
          let ot = q * Math.max(0, 1 - et / 12) - (G ? G(z.s + et) : 0),
            at = et > z.left ? et - z.left : 0;
          ((rt = ct),
            (lt = dt),
            (tt = D.x + dt * ot + ct * (at + d)),
            (it = D.z - ct * ot + dt * (at + d)));
        } else {
          let ct = w * et,
            dt = Math.cos(ct),
            ut = Math.sin(ct),
            ot = w ? ut / w : et,
            at = w ? (1 - dt) / w : 0;
          ((rt = m * dt + b * ut),
            (lt = g * dt + x * ut),
            (tt = R + m * ot + b * at + rt * d),
            (it = T + g * ot + x * at + lt * d));
        }
        ((L[F * 5] = et),
          (L[F * 5 + 1] = tt),
          (L[F * 5 + 2] = it),
          (L[F * 5 + 3] = rt),
          (L[F * 5 + 4] = lt),
          tt < N && (N = tt),
          tt > H && (H = tt),
          it < B && (B = it),
          it > O && (O = it));
      }
      ((this.np = F), (this.ds = I));
      {
        let et = e.heightAt || eo,
          tt = Math.max(1, Math.round(6 / I)),
          it = 0;
        for (let rt = 0; rt < F && it < 24; rt += tt)
          ((this.HS[it] = L[rt * 5]),
            (this.HY[it] = rt
              ? et(L[rt * 5 + 1], L[rt * 5 + 2], null)
              : t.pos.y),
            it++);
        this.nh = it;
      }
      let W = c + l + 1.2;
      ((N -= W), (B -= W), (H += W), (O += W));
      let V = s < 2 ? -0.25 + 0.15 * s : 0.05 + 0.016 * s,
        Y = !!Hi(R, T, 1.5),
        $ = 0,
        st = this._cells;
      for (let et = 0; et < F; et += Math.max(1, Math.floor(5 / I))) {
        let tt = L[et * 5 + 1],
          it = L[et * 5 + 2],
          rt = c + l + 1;
        for (
          let lt = Math.floor((tt - rt) / fo);
          lt <= Math.floor((tt + rt) / fo);
          lt++
        )
          for (
            let ct = Math.floor((it - rt) / fo);
            ct <= Math.floor((it + rt) / fo);
            ct++
          ) {
            let dt = yp(lt, ct),
              ut = !1;
            for (let ot = 0; ot < $; ot++)
              if (st[ot] === dt) {
                ut = !0;
                break;
              }
            !ut && $ < st.length && (st[$++] = dt);
          }
      }
      {
        let et = L[(F - 1) * 5 + 1],
          tt = L[(F - 1) * 5 + 2],
          it = c + l + 1;
        for (
          let rt = Math.floor((et - it) / fo);
          rt <= Math.floor((et + it) / fo);
          rt++
        )
          for (
            let lt = Math.floor((tt - it) / fo);
            lt <= Math.floor((tt + it) / fo);
            lt++
          ) {
            let ct = yp(rt, lt),
              dt = !1;
            for (let ut = 0; ut < $; ut++)
              if (st[ut] === ct) {
                dt = !0;
                break;
              }
            !dt && $ < st.length && (st[$++] = ct);
          }
      }
      ((this._nc = $),
        (this._mv =
          !u && (this.mode === "l5" || this.mode === "l4") && s > 0.5));
      let Q = this._t,
        j = this;
      ((j._comf = a.daComf ?? Bs.comf),
        (j._OF = d),
        (j._v = s),
        (j._HX = l),
        (j._front = p),
        (j._m = V),
        (j._sMax = _),
        (j._oy = E),
        (j._onHw = Y),
        (j._bb0 = N),
        (j._bb1 = H),
        (j._bc0 = B),
        (j._bc1 = O));
      let X = e.grid;
      for (let et = 0; et < $; et++) {
        let tt = X.get(st[et]);
        if (tt)
          for (let it = 0; it < tt.length; it++) this.consider(tt[it], e, null);
      }
      for (let et = 0; et < e.big.length; et++)
        this.consider(e.big[et], e, null);
      let K = e.dynamic;
      for (let et = 0; et < K.length; et++) {
        let tt = K[et];
        tt.x > N - 6 &&
          tt.x < H + 6 &&
          tt.z > B - 6 &&
          tt.z < O + 6 &&
          this.consider(tt, e, tt.traffic || null);
      }
      let nt = e.parked?.awake;
      if (nt)
        for (let et = 0; et < nt.length; et++) {
          let tt = nt[et];
          tt.x > N - 6 &&
            tt.x < H + 6 &&
            tt.z > B - 6 &&
            tt.z < O + 6 &&
            this.consider(tt, e, null);
        }
      let Z = this.env.peds;
      for (let et = 0; et < Z.length; et++) {
        let tt = Z[et];
        if (tt)
          for (let it = 0; it < tt.length; it++) {
            let rt = tt[it];
            if (rt.x < N || rt.x > H || rt.z < B || rt.z > O || rt.hidden)
              continue;
            let lt = 0,
              ct = 0;
            (rt.leap
              ? ((lt = rt.leap.vx || 0), (ct = rt.leap.vz || 0))
              : rt.st === "walk" && rt.hx !== void 0
                ? ((lt = rt.hx * (rt.speed || 1.2)),
                  (ct = rt.hz * (rt.speed || 1.2)))
                : rt.vx !== void 0 && ((lt = rt.vx), (ct = rt.vz)),
              this.capsule(rt.x, rt.z, rt.x, rt.z, 0.3, lt, ct, "ped", Q));
          }
      }
      (this._mv && this.movers(K, s, l, c, p, d),
        u || this.plan(t, s, l, c, f, o, $s(this._p || 0, -1, 1)));
    }
    movers(t, e, s, n, o, a) {
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
        x = 9,
        v = 0,
        y = 0,
        M = null,
        S = 3.5,
        w = Math.max(e < 4 ? 1.5 : 0, $s(this.axS || 0, 0, 3));
      for (let z = 0; z < t.length; z++) {
        let _ = t[z],
          R = _.traffic;
        if (!R || R.wreck || _.dead) continue;
        let T = _.x - r.ox,
          E = _.z - r.oz;
        if (T * T + E * E > 2025) continue;
        let A = R.v || 0,
          C = -Math.sin(R.heading),
          P = -Math.cos(R.heading),
          I = C * c + P * h,
          L = (this._hw ||= new WeakMap()),
          F = L.get(R),
          N = this.l5T || 0,
          B = 0;
        if (F && N > F.t) {
          let q = R.heading - F.h;
          ((q = Math.atan2(Math.sin(q), Math.cos(q))),
            (B = $s(q / (N - F.t), -0.8, 0.8)),
            R.cv || (B = 0));
        }
        if (
          ((!F || N - F.t > 0.15) && L.set(R, { h: R.heading, t: N }), A < 0.5)
        )
          continue;
        let H = T * c + E * h,
          O = T * f + E * u,
          D = I > 0.85 && H < 1;
        if (
          (D && !(m && r.path && H > -(n + _.hz) - 1.5)) ||
          (I > 0.92 && Math.abs(O) < s + _.hx - 0.3)
        )
          continue;
        let U = _.hx + 0.12,
          G = Math.max(0, _.hz - _.hx);
        for (let q = 0; q < 2; q++) {
          let W = 9,
            V = 0,
            Y = 0;
          for (let $ = 0; $ <= 3.01; $ += 0.25) {
            let st =
                q === 0
                  ? e * $ + 0.5 * w * $ * $
                  : $ < e / S
                    ? e * $ - 0.5 * S * $ * $
                    : (e * e) / (2 * S),
              Q = this._pose(st, this._po),
              j = Q.dx,
              X = Q.dz,
              K = Q.x,
              nt = Q.z,
              Z,
              et;
            if (Math.abs(B) > 0.02) {
              let it = R.heading + B * $;
              ((Z = _.x + (A * (Math.cos(it) - Math.cos(R.heading))) / B),
                (et = _.z - (A * (Math.sin(it) - Math.sin(R.heading))) / B));
            } else ((Z = _.x + C * A * $), (et = _.z + P * A * $));
            let tt = 1e9;
            for (let it = -1; it <= 1; it += 2)
              for (let rt = -1; rt <= 1; rt += 2) {
                let lt = K + j * p * it - Z - C * G * rt,
                  ct = nt + X * p * it - et - P * G * rt,
                  dt = Math.hypot(lt, ct);
                dt < tt && (tt = dt);
              }
            if (
              ((tt -= d + U),
              tt < W && ((W = tt), (V = $), (Y = st)),
              q === 1 && $ >= e / S && A < 0.3)
            )
              break;
          }
          (D && (W += 0.95),
            q === 0
              ? (W < g && ((g = W), (v = V), (y = Y), (M = _)),
                Math.abs(I) < 0.7 && W < x && (x = W))
              : W < b && (b = W));
        }
      }
      if (
        ((this.mvA = g),
        (this.mvB = b),
        (this.mvX = x),
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
        if (!Bs.l5Clear || b > 1 || b >= g - 0.3) {
          let z = Math.max(0, y - o + a - 1),
            _ = (e * e) / (2 * Math.max(0.12, z - 0.5));
          _ > (this.crit.on ? this.crit.areq : -1) &&
            Dw(this.crit, z, Math.max(_, 1.2), v, 0, "car", 0.5, 0, M, 0);
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
        let o =
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
          r = this._yAt(this._sd(o, a, this._ta)[0]);
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
        let o = t.hz >= t.hx,
          a = o ? t.hx : t.hz,
          r = o ? t.hz - t.hx : t.hx - t.hz,
          l = o ? t.s : t.c,
          c = o ? t.c : -t.s,
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
    capsule(t, e, s, n, o, a, r, l, c) {
      let h = this._v,
        f = this._HX,
        u = this._front,
        d = l === "ped",
        p = this._m + (d ? 0.45 : 0),
        m = Math.hypot(a, r),
        g = this._sd(t, e, this._ta),
        b = this._sd(s, n, this._tb);
      if (!g || !b) return;
      let x = g[0],
        v = g[1],
        y = b[0],
        M = b[1],
        S = 0;
      if (m > 0.3) {
        let q = Math.max(0, Math.min(x, y)),
          W = this._pose(q, this._po),
          V = W.dx,
          Y = W.dz;
        S = a * V + r * Y;
        let $ = a * -Y + r * V;
        if (
          this._mv &&
          l === "car" &&
          Math.abs($) > 1 &&
          !(
            this.mode === "l5" &&
            (v * M < 0 ? 0 : Math.min(Math.abs(v), Math.abs(M))) - o <
              f + 0.4 &&
            Math.min(x, y) > 0
          )
        )
          return;
        if (Math.abs($) > 0.6) {
          let st = $s((q - u) / Math.max(h - Math.min(S, 0), 1.5), 0, 3),
            Q = Math.abs(v) < Math.abs(M) ? v : M,
            j = this._sd(t + a * st, e + r * st, this._ta),
            X = this._sd(s + a * st, n + r * st, this._tb),
            K = Math.min(Math.abs(j[1]), Math.abs(X[1]));
          ((Q * -$ > 0 && !d) || K < Math.min(Math.abs(v), Math.abs(M))) &&
            ((x = j[0]), (v = j[1]), (y = X[0]), (M = X[1]));
        }
      }
      if (Math.max(x, y) < -1 || Math.min(x, y) > this._sMax + o + 1) return;
      let w = f + o + p,
        z = f + o + 2.4,
        _ = M - v,
        R = 0,
        T = 1;
      if (Math.abs(_) < 1e-6) {
        if (Math.abs(v) > z) return;
      } else {
        let q = (-z - v) / _,
          W = (z - v) / _;
        if (q > W) {
          let V = q;
          ((q = W), (W = V));
        }
        if (((R = Math.max(0, q)), (T = Math.min(1, W)), R > T)) return;
      }
      let E = 0,
        A = 1,
        C = !0;
      if (Math.abs(_) < 1e-6) C = Math.abs(v) < w;
      else {
        let q = (-w - v) / _,
          W = (w - v) / _;
        if (q > W) {
          let V = q;
          ((q = W), (W = V));
        }
        ((E = Math.max(0, q)), (A = Math.min(1, W)), (C = E <= A));
      }
      C || ((E = R), (A = T));
      let P = Math.min(x + (y - x) * E, x + (y - x) * A) - o,
        I = P - u;
      if (I < -0.4) return;
      if (
        (c && this.cand.length < 64 && I < this._sMax && this.cand.push(c),
        !C && S < 0.5 && !d && I < 60 && I > -2 * (o + 2) && this._pP)
      ) {
        let q = (v * M < 0 ? 0 : Math.min(Math.abs(v), Math.abs(M))) - o - f;
        if (q < 1) {
          let W = 2.5 + 7 * Math.max(0, q - 0.1),
            V = Math.max(0, I - 10);
          (!this.narrow ||
            W + Math.sqrt(6 * V) <
              this.narrow.v + Math.sqrt(6 * this.narrow.g)) &&
            (this.narrow = { g: V, v: W });
        }
      }
      if (!C) return;
      let L = v + _ * E,
        F = v + _ * A,
        N = (L * F < 0 ? 0 : Math.min(Math.abs(L), Math.abs(F))) - o,
        B = Math.max(0, I),
        H = this._v - S,
        O = d
          ? Bs.pedD0
          : (l === "car" ? 1.3 : l === "parked" ? 0.6 : 0.35) + 0.05 * h,
        D = H > 0.2 ? (H * H) / (2 * Math.max(0.12, B - O)) : 0,
        U = H > 0.2 ? B / H : 99,
        G = c && c === this.avC ? this.critAv : this.crit;
      if (
        (D > (G.on ? G.areq : -1) && Dw(G, B, D, U, S, l, O, 0, c, N),
        l === "car" &&
          S > 1 &&
          (!this.lead.on || B < this.lead.gap) &&
          Dw(this.lead, B, D, U, S, l, O, 0, c),
        U < 2.4 &&
          D > 1 &&
          B > 1 &&
          !d &&
          !(l === "car" && (Math.abs(S) > 1 || D < (this._comf || Bs.comf))) &&
          n3t(x, y, v, M) < 7)
      ) {
        let q = Math.min(v, M) - o,
          W = Math.max(v, M) + o,
          V = 0.35,
          Y = q - V - f,
          $ = W + V + f,
          st = Math.abs(Y) < Math.abs($) ? Y : $,
          Q = D / Math.max(0.5, U);
        Math.abs(st) < 1.9 &&
          (!this.avoid.on || Q > this.avoid.areq) &&
          (Dw(this.avoid, B, Q, U, S, l, O, st, c),
          (this.avoid.alt = Math.abs(Y) < Math.abs($) ? $ : Y));
      }
    }
    march(t, e) {
      let s, n, o, a;
      if (t.t === "poly")
        ((s = t.bb[0]), (n = t.bb[1]), (o = t.bb[2]), (a = t.bb[3]));
      else if (t.t === "box") ((s = t.x0), (n = t.z0), (o = t.x1), (a = t.z1));
      else {
        let u = Math.abs(t.hx * t.c) + Math.abs(t.hz * t.s),
          d = Math.abs(t.hx * t.s) + Math.abs(t.hz * t.c);
        ((s = t.x - u), (o = t.x + u), (n = t.z - d), (a = t.z + d));
      }
      if (o < this._bb0 || s > this._bb1 || a < this._bc0 || n > this._bc1)
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
          d > o + f ||
          p < n - f ||
          p > a + f ||
          !Y_(t, d, p, r[u * 5 + 3], r[u * 5 + 4], c, h)
        )
          continue;
        let m = u ? Math.max(0, r[u * 5] - this.ds * 0.5) : 0,
          g = this._v,
          b = 0.35 + 0.05 * g,
          x = (g * g) / (2 * Math.max(0.12, m - b)),
          v = this.crit;
        x > (v.on ? v.areq : -1) &&
          Dw(
            v,
            m,
            x,
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
        let p = $s((t - h[d * 5]) / u, 0, f > 1 ? 99 : 0),
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
        o = n * t,
        a = Math.cos(o),
        r = Math.sin(o),
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
      for (let o = 1; o < n; o++)
        if (t <= e[o])
          return (
            s[o - 1] + ((s[o] - s[o - 1]) * (t - e[o - 1])) / (e[o] - e[o - 1])
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
        for (let v = 0; v < d; v++) {
          let y = t - u[v * 5 + 1],
            M = e - u[v * 5 + 2],
            S = y * y + M * M;
          S < m && ((m = S), (p = v));
        }
        let g = 0,
          b = 0,
          x = 1e18;
        for (let v = Math.max(0, p - 1); v <= Math.min(d - 1, p); v++) {
          let y = u[v * 5 + 1],
            M = u[v * 5 + 2],
            S = v + 1 < d ? u[v * 5 + 6] - y : u[v * 5 + 3],
            w = v + 1 < d ? u[v * 5 + 7] - M : u[v * 5 + 4],
            z = S * S + w * w || 1e-9,
            _ = Math.sqrt(z),
            R = ((t - y) * S + (e - M) * w) / z,
            T = v === 0 ? -1e9 : 0,
            E = v + 1 >= d ? 1e9 : 1;
          R = R < T ? T : R > E ? E : R;
          let A = y + S * R - t,
            C = M + w * R - e,
            P = A * A + C * C;
          P < x &&
            ((x = P),
            (g = u[v * 5] + R * (v + 1 < d ? u[v * 5 + 5] - u[v * 5] : _)),
            (b = ((t - y) * w - (e - M) * S) / _));
        }
        return ((s[0] = g + this._OF), (s[1] = b), s);
      }
      let o = t - n.ox,
        a = e - n.oz,
        r = o * n.ux + a * n.uz,
        l = o * n.lx + a * n.lz;
      if (!n.k) return ((s[0] = r), (s[1] = l), s);
      let c = n.R - n.sg * l,
        h = Math.atan2(r, c),
        f = Math.hypot(r, c);
      return ((s[0] = n.R * h), (s[1] = n.sg * (n.R - f)), s);
    }
    plan(t, e, s, n, o, a, r = 0) {
      let l = this.avoid;
      if (this.avC) {
        this.avT += a;
        let c = this._pursuit(this.avC, this.avSide, s, o, e);
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
            u = this._pursuit(l.c, f, s, o, e);
          u === null ||
            Math.abs(u) * e * e > Bs.latMax * 1.4 ||
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
    _pursuit(t, e, s, n, o) {
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
        let _ = t.hz >= t.hx,
          R = _ ? t.hz - t.hx : t.hx - t.hz,
          T = _ ? t.s : t.c,
          E = _ ? t.c : -t.s;
        ((b = _ ? t.hx : t.hz),
          (d = t.x - T * R),
          (p = t.z - E * R),
          (m = t.x + T * R),
          (g = t.z + E * R));
        let A = t.traffic;
        if (A && !A.wreck && A.v > 0.3) {
          let C = Math.max(0, ((t.x - f) * r + (t.z - u) * l) / Math.max(o, 1)),
            P = -Math.sin(A.heading) * A.v * C,
            I = -Math.cos(A.heading) * A.v * C;
          ((d += P), (m += P), (p += I), (g += I));
        }
      } else return null;
      let x = (d - f) * r + (p - u) * l,
        v = (d - f) * c + (p - u) * h,
        y = (m - f) * r + (g - u) * l,
        M = (m - f) * c + (g - u) * h,
        S = Math.min(x, y) - b;
      if (S < n * 0.3) return null;
      let w =
        e > 0 ? Math.max(v, M) + b + 0.45 + s : Math.min(v, M) - b - 0.45 - s;
      this._at = Math.max(x, y) + b;
      let z = Math.max(2, S);
      return (2 * w) / (z * z + w * w);
    }
    _arcFree(t, e, s, n, o) {
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
          x = a.uz * d + a.lz * p,
          v = a.ox + a.ux * m + a.lx * g + b * r,
          y = a.oz + a.uz * m + a.lz * g + x * r;
        for (let M = 0; M < h; M++) {
          let S = c[M];
          if (!S || S === o) continue;
          let w = v,
            z = y,
            _ = S.traffic;
          if (_ && !_.wreck && _.v > 0.5) {
            let R = f / Math.max(this._v, 1);
            ((w += Math.sin(_.heading) * _.v * R),
              (z += Math.cos(_.heading) * _.v * R));
          }
          if (Y_(S, w, z, b, x, s, n)) return !1;
        }
      }
      return !0;
    }
    laneCheck(t, e) {
      let s = this.lane;
      ((s.ok = !1), (s.road = !1));
      let n = this.env.L,
        o = this.env.roads;
      if (!n?.roadAt || !o?.laneV) return;
      let a = n.roadAt(t.pos.x, t.pos.z, 2, t.pos.y, !1, this._rq);
      if (!a || a.dd > 0.5 || !a.E.lg || !a.E.car) return;
      let r = a.E,
        l = e > 1 ? t.vel.x / e : -Math.sin(t.psi),
        c = e > 1 ? t.vel.z / e : -Math.cos(t.psi),
        h = l * a.dx + c * a.dz,
        f = h >= 0 ? 1 : -1;
      if (Math.abs(h) < 0.9 || (r.oneway && f < 0)) return;
      let u = o.lanes(r),
        d = 0,
        p = 1e9;
      for (let b = 0; b < u; b++) {
        let x = o.laneV(r, f, b, a.w);
        Math.abs(x - a.v) < p && ((p = Math.abs(x - a.v)), (d = x));
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
