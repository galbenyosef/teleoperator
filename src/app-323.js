// app 323 — math
// Lines 153613-155661 of readable/app.pretty.js (statement-aligned).
var M2 = 60 / (2 * Math.PI),
  n1 = class {
    constructor(t = _c) {
      ((this.S = t),
        (this.pos = { x: 0, y: 0, z: 0 }),
        (this.vel = { x: 0, y: 0, z: 0 }),
        (this.psi = 0),
        (this.r = 0),
        (this.steer = 0),
        (this.steerIn = 0),
        (this.gear = 1),
        (this.rpm = t.idle),
        (this.clutch = 1),
        (this.shiftT = 0),
        (this.shiftDur = 0.15),
        (this.shiftDir = 0),
        (this.shiftCut = 0),
        (this.kick = 0),
        (this.kickA = 0),
        (this.blip = 0),
        (this.manual = !1),
        (this._shiftReq = 0),
        (this._shiftCool = 0),
        (this.shiftBlocked = 0),
        (this.assists = { ...IO }),
        (this.throttle = 0),
        (this.brake = 0),
        (this.drift = 0),
        (this.brakeHeldT = 0),
        (this.brakeTapT = 0),
        (this.air = 0),
        (this.airTime = 0),
        (this.landing = 0),
        (this.pitch = 0),
        (this.roll = 0),
        (this.bodyPitch = 0),
        (this.bodyRoll = 0),
        (this.heave = 0),
        (this.heaveV = 0),
        (this.bodyPitchV = 0),
        (this.bodyRollV = 0),
        (this.wheelSpin = [0, 0, 0, 0]),
        (this.w = [0, 0, 0, 0]),
        (this.kappa = [0, 0, 0, 0]),
        (this.absP = [1, 1, 1, 1]),
        (this.tcsCut = [0, 0, 0, 0]),
        (this.espB = [0, 0, 0, 0]),
        (this.espEngine = 1),
        (this.espC = 0),
        (this.rDes = 0),
        (this.aid = { abs: 0, tcs: 0, esp: 0 }),
        (this.slip = [0, 0, 0, 0]),
        (this.nitro = t.nitroMax ?? 1),
        (this.nitroOn = !1),
        (this.ax = 0),
        (this.ay = 0),
        (this.impact = 0),
        (this.impactN = null),
        (this.impactT = 0),
        (this.reverse = !1),
        (this.beta = 0),
        (this.onGround = !0),
        (this.gripUse = [0, 0]),
        (this._g = { dx: 0, dz: 0 }),
        (this._driftKmh = 0),
        (this._hd = 0),
        (this._hI = 0),
        (this._hD = 0),
        (this._hR = 0),
        (this._vxPrev = null),
        (this.bodyY = 0),
        (this.bodyVy = 0),
        (this.bPitch = 0),
        (this.bPitchV = 0),
        (this.bRoll = 0),
        (this.bRollV = 0),
        (this.load = 1),
        (this.wc = [1, 1, 1, 1]),
        (this.susp = [0, 0, 0, 0]),
        (this._c = [0, 0, 0, 0]),
        (this._cPrev = null),
        (this.rp = null),
        (this._prev = null),
        (this.da = null),
        (this.fan = 0),
        (this.fanOn = !0),
        (this.downKg = 0),
        (this.fly = !1),
        (this.lift = 0),
        (this.alt = 0),
        (this._liftA = 0),
        (this._flyT = 0),
        (this.burn = 0),
        (this.flip = 0),
        (this.flipT = -1),
        (this.flips = 0),
        (this.climb = null),
        (this.wyaw = 0),
        (this.tilt = 0),
        (this.climbs = 0),
        (this.dents = 0),
        (this.ride = null),
        (this.loops = 0));
    }
    get speed() {
      return this.climb
        ? Math.abs(this.climb.s)
        : this.ride
          ? Math.abs(this.ride.s)
          : Math.hypot(this.vel.x, this.vel.z);
    }
    get kmh() {
      return this.speed * 3.6;
    }
    forward() {
      return { x: -Math.sin(this.psi), z: -Math.cos(this.psi) };
    }
    place(t, e, s, n = void 0) {
      ((this.pos.x = t),
        (this.pos.z = e),
        (this.psi = s),
        (this.vel.x = this.vel.y = this.vel.z = 0),
        (this.r = 0),
        (this.pos.y =
          n !== void 0 && Number.isFinite(n)
            ? Wi(t, e, null, n + 0.3)
            : Wi(t, e)),
        (this.bodyY = this.pos.y),
        (this.bodyVy = 0),
        (this.bPitch = this.bRoll = this.bPitchV = this.bRollV = 0),
        (this.pitch =
          this.roll =
          this.heave =
          this.bodyPitch =
          this.bodyRoll =
            0),
        (this._cPrev = null),
        (this._prev = null),
        (this.load = 1),
        (this.air = 0),
        (this.airTime = 0),
        (this.gear = 1),
        (this.rpm = this.S.idle),
        (this.drift = 0),
        (this.air = 0),
        (this.steer = this.steerIn = 0),
        this.w.fill(0),
        this.absP.fill(1),
        this.tcsCut.fill(0),
        this.espB.fill(0),
        (this._hd = this._hI = this._hD = 0),
        (this._vxPrev = null),
        (this.impactT = 0),
        (this.impact = 0),
        (this.climb = null),
        (this.ride = null),
        (this.wyaw = 0),
        (this.tilt = 0),
        (this.fly = !1),
        (this._burnOn = !1),
        (this.flip = 0),
        (this.flipT = -1),
        (this.lift = 0),
        (this.alt = 0),
        (this._liftA = 0),
        (this._flyT = 0),
        (this.burn = 0),
        (this.reverse = !1),
        (this.shiftT = 0),
        (this._shiftReq = 0),
        (this.shiftCut = 0),
        (this.kick = this.kickA = 0),
        (this.blip = 0),
        (this._bite = 0),
        (this.jt = null),
        (this.jturn = !1),
        (this.brakeP = 0),
        (this._brkLatch = !1),
        (this._revIn = 1),
        (this._jtDone = 0),
        (this.liftT = 0),
        (this.dents = 0));
    }
    shift(t) {
      return !this.manual || this.reverse
        ? !1
        : ((this._shiftReq = Math.sign(t)), !0);
    }
    step(t, e, s) {
      if (this.da && this.da.mode !== "manual") {
        let Wt = e.lift && this.S.liftA;
        (Wt &&
          this.da.mode === "l5" &&
          this.onGround &&
          this.da.takeOver("lift"),
          (e = this.da.filter(t, e, s, this)),
          Wt && !e.lift && (e = { ...e, lift: Wt }));
      }
      if (((this.simT = (this.simT || 0) + t), this.climb))
        return this._climbStep(t, e, s);
      if (this.ride) return this._loopStep(t, e, s);
      if (s?.loops && this.onGround && !this.fly && !this.reverse)
        for (let Wt = 0; Wt < s.loops.length; Wt++) {
          let ke = s.loops[Wt],
            [As, je] = ke.local(this.pos.x, this.pos.z);
          if (As < -6 || As > 2 || Math.abs(je) > ke.W / 2) continue;
          let gs = this.forward(),
            _s = gs.x * ke.d.x + gs.z * ke.d.z,
            on = As + this.S.a * _s,
            fi = this.vel.x * ke.d.x + this.vel.z * ke.d.z;
          if (_s > 0.82 && on > -0.6 && on < 0.4 && fi > 1.5)
            return (
              (this.ride = {
                li: Wt,
                pf: Math.max(0, on),
                s: fi,
                pitch: 0,
                u0: je,
              }),
              this.loops++,
              this._loopStep(t, e, s)
            );
        }
      (this.tilt &&
        ((this.tilt *= Math.exp(-t * 4)),
        Math.abs(this.tilt) < 0.01 && (this.tilt = 0)),
        this.spin &&
          (this.spin = Math.max(0, this.spin - (t * Math.PI) / 0.75)));
      let n = this.S,
        i = n.mass,
        a = n.a + n.b,
        r = this.assists,
        l = n.wheelR,
        c = this.forward(),
        h = { x: -Math.cos(this.psi), z: Math.sin(this.psi) },
        f = this.vel.x * c.x + this.vel.z * c.z,
        u = this.vel.x * h.x + this.vel.z * h.z,
        d = Math.hypot(f, u);
      if (this._vxPrev === null || Math.abs(f - this._vxPrev) > 3)
        for (let Wt = 0; Wt < 4; Wt++) this.w[Wt] = f / l;
      this._snap();
      let p = this.pos.x,
        m = this.pos.z,
        g = s?.heightAt || Wi,
        b = g;
      if (n.roofs && s?.roofAt) {
        let Wt = this._rHF;
        b =
          Wt && Wt.b === g && Wt.w === s
            ? Wt.f
            : (this._rHF = {
                b: g,
                w: s,
                f: (ke, As) => {
                  let je = g(ke, As),
                    gs = s.roofAt(ke, As);
                  return gs > je + 2.5 && this.bodyY > gs - 1.2 ? gs : je;
                },
              }).f;
      }
      let v = n.track / 2,
        x = this._c,
        y = this._c0 || (this._c0 = [0, 0, 0, 0]),
        M = [n.a, n.a, -n.b, -n.b],
        S = [v, -v, v, -v],
        w = this._hk || (this._hk = []),
        _ =
          w[0] === p &&
          w[1] === m &&
          w[2] === c.x &&
          w[3] === c.z &&
          w[4] === h.x &&
          w[5] === h.z &&
          w[6] === b &&
          w[7] === n.a &&
          w[8] === n.b &&
          w[9] === v;
      if (
        (_ ||
          ((w[0] = p),
          (w[1] = m),
          (w[2] = c.x),
          (w[3] = c.z),
          (w[4] = h.x),
          (w[5] = h.z),
          (w[6] = b),
          (w[7] = n.a),
          (w[8] = n.b),
          (w[9] = v)),
        !_)
      )
        for (let Wt = 0; Wt < 4; Wt++) {
          let ke = 0;
          for (let [As, je] of iMt) {
            let gs = M[Wt] + As,
              _s = b(p + c.x * gs + h.x * S[Wt], m + c.z * gs + h.z * S[Wt]);
            ((ke += je * _s), As === 0 && (y[Wt] = _s));
          }
          x[Wt] = ke;
        }
      if (!_) {
        let Wt = b(p, m) - (n.floor ?? 0.12);
        this._floorY = Wt;
      }
      let z = 0;
      if (this._cPrev && this.onGround) {
        let Wt = Math.tan(this.bPitch),
          ke = Math.tan(this.bRoll),
          As = [0, 1, 2, 3].map((gs) => this.bodyY + M[gs] * Wt + S[gs] * ke),
          je = As.map((gs, _s) => x[_s] > gs + PO);
        if (je.filter(Boolean).length <= 2)
          for (let gs = 0; gs < 4; gs++)
            je[gs] &&
              ((x[gs] = Math.min(x[gs], Math.max(As[gs], this._cPrev[gs]))),
              (y[gs] = Math.min(y[gs], x[gs])),
              z++);
      }
      this.walled = z;
      {
        let Wt = this._floorY;
        if (
          Number.isFinite(Wt) &&
          Wt > (x[0] + x[1] + x[2] + x[3]) / 4 &&
          !(z && Wt > (x[0] + x[1] + x[2] + x[3]) / 4 + PO)
        )
          for (let ke = 0; ke < 4; ke++) x[ke] < Wt && (x[ke] = Wt);
      }
      (n.liftA && this._thrusters(t, e),
        this._suspend(t, x, M, S, y),
        (this.alt = Math.max(0, this.bodyY - (x[0] + x[1] + x[2] + x[3]) / 4)));
      let A = this.onGround ? 1 : 0,
        T = d * 3.6,
        E = is(e.steer, -1, 1),
        R =
          !!e.player &&
          Math.abs(E) > 0.6 &&
          (!this._holdDir || Math.sign(E) === this._holdDir);
      ((this._holdDir = R ? Math.sign(E) : 0),
        (this._steerHold = R ? (this._steerHold || 0) + t : 0));
      let P = R
          ? E *
            xr(
              1,
              0.4 + 0.6 * (1 - Math.exp(-this._steerHold / 0.22)),
              is((T - 30) / 50, 0, 1),
            )
          : E,
        C =
          (Math.abs(P) > Math.abs(this.steerIn) &&
          Math.sign(P) === Math.sign(this.steerIn || P)
            ? n.steerRate
            : n.steerReturn) * xr(1, 0.6, is(T / 200, 0, 1));
      this.steerIn += is(P - this.steerIn, -C * t, C * t);
      let I = is(T / 250, 0, 1),
        L = is(e.throttle, 0, 1),
        F = is(e.brake, 0, 1);
      n.keyRamp && e.digitalThrottle && L > 0
        ? ((this._kthr = Math.min(
            L,
            Math.max(this._kthr || 0, n.keyRamp0 ?? 0.3) +
              (t * (1 - (n.keyRamp0 ?? 0.3))) / n.keyRamp,
          )),
          (L = this._kthr))
        : (this._kthr = 0);
      let O = !this.da || this.da.mode === "manual";
      this._brkLatch && (F < 0.1 ? (this._brkLatch = !1) : (F = 0));
      let B = s?.speedCap ? s.speedCap(p, m) : 0;
      if (((this.zoneCap = B), B > 0)) {
        let Wt = is((B - d) / (0.3 * B), 0, 1);
        this.reverse
          ? (F *= Math.max(Wt, 0.25))
          : ((L *= Wt),
            d > B * 1.05 &&
              F < 0.3 &&
              (F = Math.max(
                F,
                is((d - B) / 20, 0.04, n.zoneBrake ?? (n.ev ? 0.08 : 0.28)),
              )));
      }
      let H = F > 0.1 && L < 0.1;
      (H && !this._brkWas && (this._brkRest = d < 0.15),
        (this._brkWas = H),
        (this._brkStopT = H && d < 0.4 ? (this._brkStopT || 0) + t : 0));
      let N = O ? 0.2 : n.comfortBrake ? 1.5 : 0.6;
      (!this.reverse &&
        H &&
        !this.holdStop &&
        f < 0.8 &&
        d < 1.5 &&
        (this._brkRest || this._brkStopT > N) &&
        ((this.reverse = !0), (this._shiftReq = 0), (this._revIn = 0)),
        this.reverse &&
          L > 0.1 &&
          f > -0.8 &&
          (d < 1.5 || f > 0.5) &&
          ((this.reverse = !1), (this.gear = 1)),
        (this._revIn = this.reverse
          ? Math.min(1, (this._revIn ?? 1) + t / 0.3)
          : 1));
      let D = 0,
        U = 0;
      (this.reverse
        ? ((D = -F * w2(this._revIn)), (U = L))
        : ((D = L), (U = F)),
        this.reverse && this.holdStop && ((D = 0), (U = Math.max(L, F))));
      let G = this.reverse && n.comfortBrake && e.digitalBrake && !O;
      G && (D *= 0.38);
      let W = !!e.digitalBrake && !this.reverse;
      {
        let Wt = U,
          ke = this.brakeP || 0,
          As =
            Wt <= ke
              ? ke + (Wt - ke) * is(t / 0.015, 0, 1)
              : W && O
                ? Math.min(Wt, ke < 0.4 ? ke + t * 16 : ke + t * 5)
                : ke + (Wt - ke) * is(t / 0.05, 0, 1);
        (O || (As = Wt), (this.brakeP = As), (U = As));
      }
      if (
        n.comfortBrake &&
        e.digitalBrake &&
        !O &&
        !this.reverse &&
        F > 0.5 &&
        f > 0.5
      ) {
        if (((this._cbT = (this._cbT || 0) - t), this._cbT <= 0)) {
          this._cbT = 0.08;
          let ke = n.comfortBrake;
          this._cbNeed = s?.brakeNeed
            ? s.brakeNeed(this, f, (f * f) / (2 * ke) + 4)
            : 0;
        }
        let Wt =
          this._cbNeed > n.comfortBrake * 0.85
            ? this._cbNeed * 1.3 + 0.6
            : n.comfortBrake;
        if (Wt < 11) {
          let ke = this.gSlope(p, m, s),
            As = Math.sqrt(1 + ke.dx * ke.dx + ke.dz * ke.dz),
            je = (-Ao * (ke.dx * c.x + ke.dz * c.z)) / As,
            gs = n.ev ? 4 * Math.min(n.regen, Math.abs(f) * 64) : 0;
          U = is(
            (i * (Wt + je) * l - gs) / (2 * (n.brakeF + n.brakeR)),
            0.02,
            1,
          );
        }
      } else this._cbT = 0;
      ((this.throttle = Math.abs(D)), (this.brake = U));
      let V = Math.abs(this.steerIn) > 0.35;
      (U <= 0.2 &&
        this.brakeHeldT > 0 &&
        this.brakeHeldT < 0.35 &&
        Math.abs(this.steerIn) > 0.6 &&
        T > 55 &&
        !this.reverse &&
        ((this.brakeTapT = 0.45),
        (this.r += Math.sign(this.steerIn) * 0.65 * Math.abs(this.steerIn))),
        (this.brakeHeldT = U > 0.2 ? (this.brakeHeldT || 0) + t : 0),
        this.da?.only && (this.brakeHeldT = 0),
        (this.brakeTapT = Math.max(0, this.brakeTapT - t)),
        this.brakeHeldT > 0.4 && (this.brakeTapT = 0));
      let $ = is(e.handbrake || 0, 0, 1);
      this.hb = $;
      let J =
        $ > 0.5 && e.player !== !1 && !this.reverse
          ? 1 - 0.9 * is((Math.abs(this.steerIn) - 0.2) / 0.5, 0, 1)
          : 0;
      (L > 0.7
        ? ((this._thrHeld = (this._thrHeld || 0) + t), (this._liftWin = 0.15))
        : ((this._liftWin = Math.max(0, (this._liftWin || 0) - t)),
          L < 0.1 &&
            this._liftWin > 0 &&
            this._thrHeld > 0.5 &&
            !n.awd &&
            Math.abs(this.steerIn) > 0.7 &&
            T > 60 &&
            Math.abs(this.ay) > 0.65 * Ao &&
            f > 0 &&
            !this.da?.only &&
            ((this.liftT = 0.5),
            (this._liftWin = 0),
            (this.r += Math.sign(this.steerIn) * 0.08)),
          this._liftWin <= 0 && (this._thrHeld = 0)),
        (this.liftT = Math.max(0, (this.liftT || 0) - t)));
      let X = (this.brakeTapT > 0 || $ > 0.5) && T > 35,
        tt = d > 2 ? Math.atan2(u, Math.abs(f)) : 0;
      this.beta = tt;
      let Z =
        this.jt ||
        (this.jt = {
          on: !1,
          k: 0,
          dir: 0,
          psi0: 0,
          ang: 0,
          t: 0,
          arm: 0,
          v0: 0,
        });
      if (!Z.on) {
        Z.arm =
          this.reverse &&
          f < -4 &&
          Math.abs(this.steerIn) > 0.7 &&
          (L < 0.1 || Z.arm > 0)
            ? Z.arm + t
            : 0;
        let Wt = $ > 0.5 && f < -4 && Math.abs(this.steerIn) > 0.3;
        this.onGround &&
          !(this.impactT > 0) &&
          ((Z.arm > 0.06 && f < -6) || Wt) &&
          ((Z.on = !0),
          (Z.dir = -Math.sign(this.steerIn)),
          (Z.psi0 = this.psi),
          (Z.ang = 0),
          (Z.t = 0),
          (Z.v0 = d),
          (Z.held = F > 0.1));
      }
      let q = 0;
      if (Z.on) {
        ((Z.t += t), (Z.ang += this.r * Z.dir * t));
        let Wt = Math.PI - Z.ang,
          ke = is(Z.v0 / 2.4, 2.8, 4.6);
        ((q =
          Z.dir *
          Math.max(
            0,
            Math.min(ke * w2(Z.t / 0.2), Math.sqrt(26 * Math.max(0, Wt))),
          )),
          (Z.held = Z.held && F > 0.1));
        let As = Wt < 0.06 || (Z.ang > 2.85 && f > 0 && Math.abs(tt) < 0.1);
        (As || d < 0.6 || this.impactT > 0 || !this.onGround || Z.t > 2.5) &&
          ((Z.on = !1),
          (q = 0),
          As &&
            f > 0 &&
            ((this.reverse = !1),
            (this.gear = 1),
            Z.held && (this._brkLatch = !0),
            (this.brakeP = 0),
            (this._jtDone = 0.6)));
      }
      ((Z.k += ((Z.on ? 1 : 0) - Z.k) * is(t / (Z.on ? 0.06 : 0.25), 0, 1)),
        (this.jturn = Z.on),
        Z.on && this.reverse && ((U = 0), (this.brakeP = 0), (this.brake = 0)),
        (this._jtDone = Math.max(0, (this._jtDone || 0) - t)),
        this.drift < 0.05 && !X && (this._intent = !1),
        (X || (V && this.drift > 0.05)) && (this._intent = !0));
      let j = Math.abs(this.steerIn) < 0.25,
        K =
          this.drift > 0.2 &&
          L > 0.35 &&
          (Math.abs(tt) > (j ? 0.2 : 0.08) || V) &&
          this._intent;
      this.drift < 0.05 && (this._driftKmh = T);
      let nt =
        r.esp &&
        Math.abs(tt) > 0.32 &&
        T > 35 &&
        !this.reverse &&
        !(this.impactT > 0) &&
        Z.k < 0.05 &&
        !this._jtDone;
      this.capture = !X && !K && nt;
      let Q =
        Z.k > 0.05
          ? 0
          : X
            ? 1
            : K
              ? Math.max(0.55, this.drift - t * 0.15)
              : nt
                ? 0.6
                : 0;
      ((this.drift +=
        (Q - this.drift) *
        is(
          t *
            (Q > this.drift
              ? 22
              : Math.abs(tt) < 0.06 && !V
                ? j
                  ? 16
                  : 8
                : 2.4),
          0,
          1,
        )),
        T < 20 && (this.drift *= 1 - t * 3));
      let et = s?.muAt ? s.muAt(p, m) : 1;
      if ((n.surfK !== void 0 && (et = 1 - (1 - et) * n.surfK), n.fanKg)) {
        let Wt =
          this.fanOn && this.onGround && !this.fly
            ? is(
                0.3 +
                  Math.max(
                    Math.abs(this.ay) / (1.3 * Ao),
                    is(e.brake || 0, 0, 1),
                    L * 0.85,
                    Math.abs(this.steerIn) * is(d / 12, 0, 1),
                  ),
                0,
                1,
              ) *
              Math.max(
                is((d - 12) / 16, 0, 1),
                L > 0.5 ? is((7 - d) / 3, 0, 1) : 0,
                0,
              )
            : 0;
        this.fan +=
          (Wt - this.fan) * is(t / (Wt > this.fan ? 0.25 : 0.6), 0, 1);
      }
      let st = n.downforce * d * d + (n.fanKg ? this.fan * n.fanKg * Ao : 0);
      this.downKg = st / Ao;
      let ot = n.mu * (n.latMu ?? 1) * et * (Ao + st / i),
        rt = Math.max(Math.abs(f), 3),
        lt = xr(n.steerMax, n.steerMaxHigh, Math.pow(I, 0.7)),
        ht = Math.min(n.steerMax, Math.atan((a * ot * 1.5) / (rt * rt))),
        pt =
          this.reverse || f < 6 || this.drift > 0.3 || !O
            ? 0
            : Math.max(
                is(this.brakeP || 0, 0, 1),
                0.6 * is(this.liftT / 0.2, 0, 1),
              ) * is(Math.abs(this.steerIn) * 3, 0, 1);
      this.trailK = pt;
      let ut = ((f * Math.tan(this.steerIn * ht)) / a) * (1 + 0.8 * pt),
        it = (ot * (0.94 + 0.2 * pt)) / rt,
        at = is(ut, -it, it);
      ((this.rDes = at),
        (this._rRef =
          (this._rRef ?? 0) + (at - (this._rRef ?? 0)) * is(t / 0.12, 0, 1)));
      let yt = Math.atan2(u - n.b * this.r, rt),
        vt = Math.sign(yt) * Math.max(0, Math.abs(yt) - 0.07),
        At =
          this.onGround &&
          f > 3 &&
          $ < 0.5 &&
          !this.reverse &&
          !(this.impactT > 0) &&
          Z.k < 0.05,
        Ut;
      if (r.steering && At && this.drift < 0.3) {
        let Wt = at - this.r;
        ((this._hD +=
          ((this.r - this._hR) / t - this._hD) * (1 - Math.exp(-t / 0.06))),
          Math.abs(this.steerIn) < 0.02 && (this._hI = 0),
          Math.abs(vt) > 0.02 && (this._hI *= Math.exp(-t / 0.12)));
        let ke = is((Math.abs(at) * rt) / ot, 0, 1),
          je =
            Math.atan((at * a) / rt) +
            Math.sign(at) * 0.05 * Math.pow(ke, 1.5) +
            0.2 * Wt +
            0.12 * this._hI -
            0.012 * this._hD +
            0.9 * vt,
          gs = Math.min(
            0.72,
            0.12 + 8 / Math.max(10, d) + Math.min(Math.abs(vt) * 0.8, 0.32),
          );
        Math.abs(vt) < 0.02 &&
          (Math.abs(je) < gs || Math.sign(Wt) !== Math.sign(je)) &&
          (this._hI = is(this._hI + Wt * t, -0.45, 0.45));
        let _s = is(je, -gs, gs);
        if (d > 4 && d < 17) {
          let on = Math.atan2(u + n.a * this.r, rt),
            fi = xr(0.19, 0.6, is((d - 10) / 7, 0, 1));
          _s = is(_s, on - fi, on + fi);
        }
        Ut = this._hd + is(_s - this._hd, -t * 10, t * 10);
      } else
        ((Ut =
          this.steerIn * lt * (f < 0 ? xr(1, 0.45, is(-f / 11, 0, 1)) : 1)),
          (this._hI = 0),
          (this._hD = 0));
      if (
        (Z.k > 0.01 &&
          (Ut = xr(
            Ut,
            this.steerIn * n.steerMax * 0.6 * is((2.2 - Z.ang) / 0.8, 0, 1),
            Z.k,
          )),
        (this._hR = this.r),
        this.drift > 0.05 && d > 5)
      ) {
        let Wt = is(tt * 0.9, -0.5, 0.5);
        Ut = xr(
          Ut,
          is(Wt + this.steerIn * 0.28, -n.steerMax, n.steerMax),
          this.drift * 0.85,
        );
      }
      ((this._hd = Ut), (this.steer = Ut));
      let Gt = r.esp && At && this.drift < 0.3 && !X,
        Pt =
          Math.abs(vt) > 0.08 ||
          this.r * at < -0.05 ||
          Math.abs(this.r) > Math.abs(at) + 0.25,
        Vt = Pt
          ? at - this.r + vt * 1.5
          : xr(this._rRef, at, is((d - 8) / 5, 0, 1)) - this.r,
        Kt = Gt
          ? is((Math.abs(Vt) - 0.25) * 1.3, 0, 0.9) *
            (Pt ? 1 : 1 - is(this.aid.abs * 1.5, 0, 1))
          : 0,
        ue = (Pt ? 0 : 2) + (Vt < 0 ? 1 : 0);
      for (let Wt = 0; Wt < 4; Wt++) {
        let ke = Wt === ue ? Kt * n.espBrake : 0;
        this.espB[Wt] = Gt
          ? this.espB[Wt] +
            (ke - this.espB[Wt]) *
              (1 - Math.exp(-t / (ke > this.espB[Wt] ? 0.045 : 0.12)))
          : 0;
      }
      ((this.espEngine = Gt
        ? Math.min(1 - Kt * 0.3, 1 - is((Math.abs(vt) - 0.08) * 4, 0, 0.7))
        : 1),
        (this.espC = Gt ? Vt : 0));
      let ne = this.reverse ? n.reverse : n.gears[this.gear - 1],
        jt = ne * n.final,
        be = (Math.abs(f) / l) * jt * M2,
        re = Math.abs((this.w[2] + this.w[3]) / 2) * jt * M2;
      ((this.shiftT = Math.max(0, this.shiftT - t)),
        (this._shiftCool = Math.max(0, this._shiftCool - t)),
        (this.shiftBlocked = Math.max(0, this.shiftBlocked - t)));
      let ds = (Wt) => {
        let ke = Wt > this.gear,
          As = (Math.max(be, re) * n.gears[Wt - 1]) / ne;
        ((this.shifted = ke ? 1 : -1),
          (this.shiftDir = ke ? 1 : -1),
          (this.shiftDur = this.shiftT =
            ke
              ? n.shiftUp * xr(1.7, 1, is(Math.abs(D) * 1.4 - 0.2, 0, 1))
              : n.shiftDown),
          (this.kickA =
            ke && Math.abs(D) > 0.3
              ? is(
                  (n.engineI * Math.max(0, this.rpm - As)) / M2 / 0.12 / xv(As),
                  0,
                  n.kickMax,
                )
              : 0),
          !ke && d > 3 && (this.blip = 1),
          (this.gear = Wt),
          (this._shiftCool = 0.45));
      };
      if (!this.reverse && this.shiftT <= 0) {
        let Wt = (ke) => (Math.max(be, re) * n.gears[ke - 1]) / ne;
        if (this.manual) {
          let ke = this._shiftReq;
          ((this._shiftReq = 0),
            ke > 0 && this.gear < n.gears.length
              ? ds(this.gear + 1)
              : ke < 0 && this.gear > 1
                ? Wt(this.gear - 1) < n.redline * 0.98
                  ? ds(this.gear - 1)
                  : (this.shiftBlocked = 1.2)
                : d < 1 && this.gear > 1 && D < 0.1 && (this.gear = 1));
        } else if (this._shiftCool <= 0 && this.onGround && $ < 0.5) {
          let ke = re > be * 1.2 + 400,
            As = n.idle + 2700 + Math.abs(D) * (n.upshift - n.idle - 2700),
            je =
              n.idle + 1e3 + Math.max(Math.abs(D) * 1500, U * n.redline * 0.45),
            gs = this.gear === 1 ? Math.min(As, n.upshift1) : As,
            _s = Math.max(be, re, this.rpm);
          if (d < 0.9 && this.gear > 1) this.gear = 1;
          else if (
            U < 0.1 &&
            this.gear < n.gears.length &&
            d > 3 &&
            ((!ke && be > gs) ||
              (_s > n.redline * 0.97 &&
                (this.gear === 1 || Wt(this.gear + 1) > 3e3)))
          )
            ds(this.gear + 1);
          else if (
            !ke &&
            this.gear > 1 &&
            (be < je || (D > 0.8 && be < n.redline * 0.55))
          ) {
            let on = n.redline * (U > 0.2 && D < 0.5 ? 0.55 : 0.72),
              fi = this.gear;
            for (; fi > 1;) {
              let co = Wt(fi - 1);
              if (co >= n.redline * 0.82 || (fi--, co >= on)) break;
            }
            fi !== this.gear && ds(fi);
          }
        }
      }
      let Nt = this.reverse ? n.reverse : n.gears[this.gear - 1],
        $e = Nt * n.final,
        ve = Math.abs((this.w[2] + this.w[3]) / 2) * $e * M2,
        as = xr(n.idle, n.launchRpm, Math.abs(D)) * (Math.abs(f) < 12 ? 1 : 0),
        Se = Math.min(
          n.limiter,
          Math.max(n.idle, ve, as) + (this.onGround ? 0 : 2400 * L),
        ),
        Fe = this.shiftT > 0 ? 1 - this.shiftT / this.shiftDur : 1,
        xe = 1;
      if (this.shiftT > 0 && this.shiftDir > 0) {
        if (
          ((xe =
            Fe < 0.25
              ? xr(1, n.cutFloor, w2(Fe / 0.25))
              : Fe < 0.8
                ? n.cutFloor
                : xr(n.cutFloor, 1, w2((Fe - 0.8) / 0.2))),
          Fe > 0.2)
        ) {
          let Wt = Math.max(this.shiftT - this.shiftDur * 0.2, t);
          this.rpm = Math.max(
            Se,
            this.rpm - Math.max(n.rpmFall, (this.rpm - Se) / Wt) * t,
          );
        }
      } else
        this.shiftT > 0
          ? ((xe = xr(0.35, 1, w2(Math.abs(Fe * 2 - 1)))),
            (this.rpm = Math.min(
              Math.max(this.rpm, Se),
              this.rpm + n.rpmRise * t,
            )))
          : (this.rpm += (Se - this.rpm) * is(t * 45, 0, 1));
      ((this.rpm = is(this.rpm, n.idle, n.limiter)),
        this.shiftT <= 0 && this.kickA > 0
          ? (this.kickT = (this.kickT || 0) + t)
          : this.shiftT > 0 && (this.kickT = 0),
        (this.kick =
          this.kickA > 0 && this.shiftT <= 0
            ? this.kickA *
              Math.exp(-(this.kickT || 0) / n.kickTau) *
              Math.min(1, (this.kickT || 0) / 0.02)
            : 0),
        this.kick < 0.005 && this.shiftT <= 0 && (this.kickA = 0),
        (xe *= 1 + this.kick * is(Math.abs(D), 0, 1)),
        (this.shiftCut = 1 - Math.min(1, xe)),
        (this.blip = Math.max(0, (this.blip || 0) - t / 0.22)));
      let He = this.rpm >= n.limiter - 30 ? 0.2 : 1,
        ms =
          D *
          (n.torque ? n.torque(this.rpm) : xv(this.rpm)) *
          $e *
          n.driveEff *
          He *
          this.espEngine *
          xe;
      (this.reverse && (ms *= 1 - Z.k),
        this.reverse &&
          (ms =
            Math.sign(ms) *
            Math.min(Math.abs(ms), i * 4.5 * l) *
            (G ? (f < -4.5 ? 0 : 1) : is((f + 12.2) / 2.8, 0, 1))),
        (this._bite =
          Math.abs(f) < 1 && Math.abs(D) < 0.1
            ? 0
            : Math.min(1, (this._bite ?? 1) + t / n.biteTime)),
        this._lock || (ms *= xr(0.3, 1, w2(this._bite))),
        ve >= as ? (this._lock = !0) : ve < as - 900 && (this._lock = !1),
        (this._lockK = is(
          (this._lockK || 0) + (this._lock && this.shiftT <= 0 ? t : -t) / 0.12,
          0,
          1,
        )));
      let bt = n.engineI * $e * $e * this._lockK;
      this.reverse || (ms -= (bt * is(this.axB ?? this.ax, -12, 12)) / l);
      let te = n.ev
        ? (1 - is(Math.abs(D) / 0.12, 0, 1)) * n.regen
        : (1 - Math.abs(D)) *
          (n.engBrake[0] + (n.engBrake[1] * this.rpm) / n.redline) *
          $e *
          0.5;
      this.nitroOn =
        !!e.nitro &&
        this.nitro > (n.liftA ? 0.3 : 0.02) &&
        D > 0.2 &&
        !this.reverse &&
        !B;
      let ee = this.nitroOn ? n.nitroForce : 0;
      this.nitroOn
        ? (this.nitro = Math.max(0, this.nitro - n.nitroUse * t))
        : this.fly ||
          (this.nitro = Math.min(
            n.nitroMax,
            this.nitro +
              t *
                (n.nitroFill +
                  this.drift * 0.12 +
                  (this.airTime > 0.3 && !n.liftA ? 0.08 : 0)),
          ));
      let Yt =
          i *
          Ao *
          Math.cos(this.bPitch) *
          Math.cos(this.bRoll) *
          (this.onGround ? is(this.load / 0.45, 0, 1) : 0),
        ce = (Yt * n.b - i * this.ax * n.hcg) / a + st * (n.downF ?? 0.45),
        Xe = (Yt * n.a + i * this.ax * n.hcg) / a + st * (n.downR ?? 0.55);
      ((ce = Math.max(ce, 0.15 * Yt)), (Xe = Math.max(Xe, 0.15 * Yt)));
      let Oe = (i * is(this.ay, -16, 16) * n.hcg) / n.track,
        Ke = [
          ce / 2 - Oe * 0.55,
          ce / 2 + Oe * 0.55,
          Xe / 2 - Oe * 0.45,
          Xe / 2 + Oe * 0.45,
        ];
      ((Ke[0] = Math.max(Ke[0], 0.06 * ce)),
        (Ke[1] = Math.max(Ke[1], 0.06 * ce)),
        (Ke[2] = Math.max(Ke[2], 0.06 * Xe)),
        (Ke[3] = Math.max(Ke[3], 0.06 * Xe)));
      let qs = Yt / 4,
        Rs = is((d - 1) / 4, 0, 1),
        Ps = is((d - 1) / 3, 0, 1),
        Qs = Math.tan(Ut),
        xs = 0.7,
        an = [
          Math.atan((a * Qs) / (a - v * Qs * xs)),
          Math.atan((a * Qs) / (a + v * Qs * xs)),
        ],
        De = [Math.cos(an[0]), Math.cos(an[1])],
        Ds = [Math.sin(an[0]), Math.sin(an[1])],
        hs = n.launchSlip * is(1 - d / 14, 0, 1) * (this.gear === 1 ? 1 : 0),
        nn = xr(1, n.muRearDrift, this.capture ? 0 : this.drift),
        dn = [n.a, n.a, -n.b, -n.b],
        Wn = [v, -v, v, -v],
        Xn = 6,
        ni = t / Xn,
        An = 0,
        ii = 0,
        Mt = 0,
        Xt = 0,
        xt = 0,
        wt = 0,
        _t = 0,
        ae = [0, 0, 0, 0];
      for (let Wt = 0; Wt < 4; Wt++) {
        let ke = Wt < 2,
          As = f - this.r * Wn[Wt],
          je = u + this.r * dn[Wt],
          gs = ke ? De[Wt] : 1,
          _s = ke ? Ds[Wt] : 0,
          on = As * gs + je * _s,
          fi = -As * _s + je * gs,
          co = Math.atan2(fi, Math.max(Math.abs(on), 3.5));
        ae[Wt] = co;
        let I0 =
            n.mu *
            et *
            (ke ? 1 : n.rearGrip) *
            is(1 - 0.08 * (Ke[Wt] / qs - 1), 0.8, 1.1) *
            Ke[Wt] *
            A,
          Ld = ke ? (n.latMu ?? 1) : (n.latMuR ?? n.latMu ?? 1),
          wa = I0 * Ld,
          Zt =
            -wa *
            (ke ? LO(co, 11.5, 1.45, 0.2) : nn * LO(co, 15, 1.5, 0.1)) *
            Ps *
            (1 - 0.75 * Z.k),
          Mn = ke ? n.wheelI : n.rearI,
          fl = n.awd ? n.frontShare : 0,
          ho = ke
            ? fl
              ? ms * fl * 0.5 +
                is(
                  (this.w[1 - Wt] - this.w[Wt]) * (n.lsdF ?? 10),
                  -(n.lsdFT ?? 300),
                  n.lsdFT ?? 300,
                )
              : 0
            : ms * (1 - fl) * 0.5 +
              is(
                (this.w[5 - Wt] - this.w[Wt]) * (n.lsd ?? 25),
                -(n.lsdT ?? 500),
                n.lsdT ?? 500,
              ),
          F0 = (ke ? Math.max(U, J) : U) * (ke ? n.brakeF : n.brakeR),
          Oc = !ke && $ > 0.5 ? n.handbrake : 0,
          U4 =
            (!ke || n.ev) && !this.reverse
              ? Math.min(te, Math.abs(f) * (n.ev ? 64 : 60)) * A
              : 0,
          Ne = this.w[Wt],
          ui = this.absP[Wt],
          di = this.tcsCut[Wt],
          Gh = 0,
          E1 = 0,
          O0 = 0,
          Os = ke && !n.awd ? 1e9 : (n.limiter / M2 / $e) * 1.02;
        if (!A) {
          let Po = (f / l) * (ke ? 1 : 1 + 0.12 * Math.abs(D));
          ((this.w[Wt] = Ne + (Po - Ne) * is(t * 8, 0, 1)),
            (this.absP[Wt] = 1),
            (this.tcsCut[Wt] = di * Math.exp(-t / 0.14)),
            (this.kappa[Wt] = 0));
          continue;
        }
        for (let Po = 0; Po < Xn; Po++) {
          let B0 = Math.max(Math.abs(on), 3);
          O0 = (Ne * l - on) / B0;
          let T1 =
            r.tcs && Oc === 0 && ho * Ne >= 0 && Math.abs(ho) > 1
              ? is(
                  (O0 * Math.sign(ho) - 0.12 - 0.25 * this.drift - hs) / 0.2,
                  0,
                  0.85,
                )
              : 0;
          ((di += (T1 - di) * (1 - Math.exp(-ni / (T1 > di ? 0.025 : 0.14)))),
            r.tcs || (di = 0));
          let Vh = ((on - Ne * l) * Math.sign(on)) / B0,
            $l =
              r.abs && F0 + this.espB[Wt] > 0 && Math.abs(on) > 2
                ? is(1 - (Vh - 0.07) / 0.12, 0.04, 1)
                : 1;
          ((ui += ($l - ui) * (1 - Math.exp(-ni / ($l < ui ? 0.012 : 0.05)))),
            r.abs || (ui = 1));
          let N0 =
              I0 *
              oMt(O0) *
              (O0 > 0 && (!ke || n.awd)
                ? n.muDrive
                : O0 < 0 && n.brakeMu
                  ? n.brakeMu
                  : 1),
            a3 = Zt / Math.sqrt(1 + (2.2 * O0) ** 2),
            r3 = Math.min(
              1,
              1 /
                Math.max(
                  1e-6,
                  Math.hypot(N0 / Math.max(I0, 1), a3 / Math.max(wa, 1)),
                ),
            );
          ((N0 *= r3), (a3 *= r3));
          let E9 = ((I0 * 16) / B0) * l * l,
            G4 = Mn + ni * E9;
          Ne += (ni * (ho * (1 - di) - N0 * l)) / G4;
          let l3 = (ni * ((F0 + this.espB[Wt]) * ui + Oc + U4)) / G4;
          ((Ne = Math.abs(Ne) <= l3 ? 0 : Ne - Math.sign(Ne) * l3),
            (Ne = is(Ne, -Os, Os)),
            (on += (N0 / (i / 4)) * ni),
            (Gh += N0),
            (E1 += a3));
        }
        ((this.w[Wt] = Ne),
          (this.absP[Wt] = ui),
          (this.tcsCut[Wt] = di),
          (this.kappa[Wt] = O0),
          F0 > 0 && ui < 0.95 && (wt = Math.max(wt, 1 - ui)),
          Math.abs(ho) > 50 && (_t = Math.max(_t, di)));
        let fs = Gh / Xn,
          Ts = E1 / Xn,
          Vi = fs * gs - Ts * _s,
          Si = fs * _s + Ts * gs;
        ((An += Vi), (ii += Si), (Mt += dn[Wt] * Si - Wn[Wt] * Vi));
        let Gs = Math.hypot(fs / Math.max(I0, 1), Ts / Math.max(wa, 1));
        ke ? (Xt = Math.max(Xt, Gs)) : (xt = Math.max(xt, Gs));
      }
      ((this.aid.abs = wt),
        (this.aid.tcs = _t),
        (this.aid.esp = Gt ? Math.max(Kt, 1 - this.espEngine) : 0),
        (An *= A),
        (ii *= A),
        (Mt *= A),
        U > 0 &&
          Math.abs(f) <= 0.3 &&
          d < 0.5 &&
          ((this.vel.x *= 1 - is(t * 8, 0, 1)),
          (this.vel.z *= 1 - is(t * 8, 0, 1)),
          (f *= 1 - is(t * 8, 0, 1)),
          (u *= 1 - is(t * 8, 0, 1))));
      let se = Math.max(0, Math.max(this.kappa[2], this.kappa[3]) - 0.2);
      !r.tcs &&
        se > 0.1 &&
        L > 0.8 &&
        V &&
        T > 25 &&
        this.gear <= 3 &&
        ((this.drift = Math.min(1, this.drift + se * t * 3)),
        (this._intent = !0));
      let Jt = Math.sign(f) || 1,
        _e = 0.5 * 1.2 * n.cdA * d * d,
        mt = n.crr * Yt;
      if (
        ((An +=
          ee * (n.thrusters ? 1 : A) -
          Jt *
            ((_e * Math.abs(f)) / Math.max(d, 0.01) +
              (Math.abs(f) > 0.1 ? mt : 0))),
        (ii -= (_e * u) / Math.max(d, 0.01)),
        Z.k > 0.01 && this.onGround)
      ) {
        Mt += n.izz * 14 * (q - this.r) * Z.k;
        let Wt =
          (n.mu * et * i * Ao * 0.3 * is(d / 10, 0.25, 1) * Z.k) /
          Math.max(d, 1);
        ((An -= Wt * f), (ii -= Wt * u));
      }
      if (this.onGround && d > 2) {
        let Wt = at - this.r,
          ke = Math.abs(yt),
          As = Wt * this.r > 0 ? is((0.095 + 0.04 * pt - ke) / 0.05, 0, 1) : 1;
        if (
          (r.steering &&
            !this.reverse &&
            !(this.impactT > 0) &&
            Z.k < 0.05 &&
            (Mt +=
              n.izz *
              (1 - this.drift) *
              xr(5, 2, I) *
              Wt *
              As *
              Rs *
              (1 -
                is(
                  (Math.max(-this.kappa[0], -this.kappa[1]) - 0.2) / 0.4,
                  0,
                  1,
                ))),
          this.drift > 0.05)
        ) {
          let je = Math.sign(f) || 1,
            gs = -this.steerIn * 0.62 * je,
            _s = this._intent ? (j ? 1.6 : 1) : 1.7,
            on =
              ii / i / Math.max(d, 3) +
              this._driftRot(d, tt, f, L) +
              2.6 * _s * (tt - gs);
          ((Mt += n.izz * 5 * _s * this.drift * (on - this.r) * Rs),
            (this._driftThrust =
              this.drift *
              L *
              i *
              Ao *
              0.3 *
              Math.min(1, Math.abs(Math.sin(tt)) * 2.2) *
              is(1 - (T - this._driftKmh) / 15, 0, 1)));
        } else this._driftThrust = 0;
        (r.esp &&
          Math.abs(tt) > 1.3 &&
          $ < 0.5 &&
          Z.k < 0.05 &&
          (Mt += -n.izz * 2.5 * this.r),
          r.steering &&
            this.reverse &&
            f < -1 &&
            Z.k < 0.05 &&
            !(this.impactT > 0) &&
            (Mt += n.izz * 3 * ((f * Math.tan(Ut)) / a - this.r) * Rs),
          this.impact > 0.1 &&
            !(this.impactT > 0) &&
            (Mt -= n.izz * 1.5 * this.impact * this.r));
      }
      if (
        (this.onGround || (Mt = -n.izz * 0.8 * this.r),
        this.fly && !this.onGround)
      ) {
        let Wt = this.nitro > 0.01 ? 1 : 0.3;
        ((Mt = n.izz * 4 * (this.steerIn * 1.4 * Wt - this.r)),
          (An += (L - (e.flip ? 0 : F)) * n.flyThrust * Wt - i * 0.25 * f),
          (ii -= i * 3 * u));
      }
      let ie = this.gSlope(p, m, s),
        Dt = Math.sqrt(1 + ie.dx * ie.dx + ie.dz * ie.dz),
        Ht = (-Ao * ie.dx) / Dt,
        ft = (-Ao * ie.dz) / Dt,
        zt = An / i,
        kt = ii / i;
      ((f += zt * t),
        (u += kt * t),
        (this.r += (Mt / n.izz) * t),
        d < 3 &&
          this.onGround &&
          Z.k < 0.05 &&
          (this.r = xr(this.r, (f * Math.tan(Ut)) / a, is(1 - d / 3, 0, 1))),
        (this.psi += this.r * t));
      let Ft = (((this._driftThrust || 0) / i) * t) / Math.max(d, 1),
        qt =
          this.onGround &&
          d < 1.2 &&
          L < 0.05 &&
          !(this.reverse && F > 0.1) &&
          !(this.impactT > 0) &&
          this.drift < 0.1
            ? 1
            : 0;
      if (
        ((this.vel.x =
          c.x * f + h.x * u + (Ht * (1 - qt) * t + Ft * this.vel.x) * A),
        (this.vel.z =
          c.z * f + h.z * u + (ft * (1 - qt) * t + Ft * this.vel.z) * A),
        qt)
      ) {
        let Wt = Math.exp(-t * 6);
        ((this.vel.x *= Wt), (this.vel.z *= Wt));
      }
      if (this.onGround && this.drift > 0.05 && d > 6 && Math.abs(tt) > 0.02) {
        let Wt = this._driftRot(d, tt, f, L) * t,
          ke = Math.cos(Wt),
          As = Math.sin(Wt),
          je = this.vel.x,
          gs = this.vel.z;
        ((this.vel.x = je * ke + gs * As), (this.vel.z = -je * As + gs * ke));
      }
      let Et =
        Math.pow(is(((this._steerHold || 0) - 0.25) / 0.7, 0, 1), 2) *
        is((T - 25) / 35, 0, 1);
      if (
        this.onGround &&
        Et > 0 &&
        this.drift < 0.3 &&
        d > 7 &&
        !this.reverse &&
        f > 0 &&
        Z.k < 0.05
      ) {
        let Wt =
            ((Math.sign(this.steerIn) *
              n.holdTurn *
              Et *
              Math.abs(this.steerIn)) /
              d) *
            t,
          ke = Math.cos(Wt),
          As = Math.sin(Wt),
          je = this.vel.x,
          gs = this.vel.z,
          _s = 1 - 0.15 * Et * t;
        ((this.vel.x = (je * ke + gs * As) * _s),
          (this.vel.z = (-je * As + gs * ke) * _s),
          (this.psi += Wt),
          (this._holdA = (Wt / t) * d));
      } else this._holdA = 0;
      if (this.onGround && s?.heightAt) {
        let Wt = ie.dx * ie.dx + ie.dz * ie.dz;
        if (Wt > Qtt * Qtt) {
          let ke = m0(p, m);
          if (ke !== "road" && ke !== "walk") {
            let As = Math.sqrt(Wt),
              je = ie.dx / As,
              gs = ie.dz / As,
              _s = this.vel.x * je + this.vel.z * gs;
            _s > 0 &&
              ((this.vel.x -= je * _s * 1.1),
              (this.vel.z -= gs * _s * 1.1),
              (this.steep = (this.steep || 0) + 1));
          }
        }
      }
      ((this.pos.x += this.vel.x * t), (this.pos.z += this.vel.z * t));
      let Me = is(t * 10, 0, 1);
      if (
        ((this.ax += (zt - this.ax) * Me),
        (this.ay += (kt - this.ay) * Me),
        (this.aLat =
          (this.aLat || 0) + (kt + (this._holdA || 0) - (this.aLat || 0)) * Me),
        (this.axB =
          (this.axB || 0) + (zt - (this.axB || 0)) * is(t / 0.03, 0, 1)),
        (this.ayC = (this.ayC || 0) + (f * this.r - (this.ayC || 0)) * Me),
        s?.collide)
      ) {
        let Wt = s.collide(this);
        Wt && (this.impact = Math.max(this.impact, Wt));
      }
      ((this.impact = Math.max(0, this.impact - t * 3)),
        (this.impactT = Math.max(0, this.impactT - t)),
        (this._vxPrev = this.vel.x * c.x + this.vel.z * c.z));
      {
        let Wt = this.forward(),
          ke = { x: -Math.cos(this.psi), z: Math.sin(this.psi) },
          As = this._c1 || (this._c1 = [0, 0, 0, 0]);
        for (let je = 0; je < 4; je++) {
          let gs = je < 2 ? n.a : -n.b,
            _s = je % 2 ? -n.track / 2 : n.track / 2;
          ((As[je] = b(
            this.pos.x + Wt.x * gs + ke.x * _s,
            this.pos.z + Wt.z * gs + ke.z * _s,
          )),
            this.walled &&
              this._cPrev &&
              As[je] > this._cPrev[je] + PO &&
              (As[je] = this._cPrev[je]));
        }
        this._wheelPlane(As);
      }
      this.landing = Math.max(0, this.landing - t * 2);
      for (let Wt = 0; Wt < 4; Wt++) this.wheelSpin[Wt] += this.w[Wt] * t;
      let de = (Wt) => is(Wt, 0, 1),
        ze = this.onGround ? 1 : 0;
      for (let Wt = 0; Wt < 4; Wt++) {
        let ke = Math.abs(this.kappa[Wt]),
          As =
            de((Math.abs(ae[Wt]) - (Wt < 2 ? 0.12 : 0.1)) * 4) * Rs +
            (Wt > 1 && this.kappa[Wt] > 0
              ? de((ke - 0.1) * 3)
              : de((ke - 0.15) * 2.5)) *
              de(d / 3) +
            (Wt > 1 ? this.drift * de(d / 10) * 0.8 : 0);
        this.slip[Wt] = is(As, 0, 1) * ze;
      }
      ((this.gripUse = [Xt, xt]),
        (this.shifted = this.shifted
          ? this.shifted > 0
            ? Math.max(0, this.shifted - t * 4)
            : Math.min(0, this.shifted + t * 4)
          : 0));
    }
    _thrusters(t, e) {
      let s = this.S,
        n = this.nitro > 0.01,
        i = !!e.lift && n,
        a = (this._jT = e.lift ? (this._jT || 0) + t : 0) < 1.5;
      ((this.lift = i ? 1 : 0),
        i &&
          !this.fly &&
          this.onGround &&
          this.nitro > (a ? 0.08 : 0.4) &&
          ((this.fly = !0),
          (this._flyT = 0),
          (this.bodyVy = Math.max(this.bodyVy, 4.5)),
          (this.liftOff = (this.liftOff || 0) + 1),
          this.reverse && ((this.reverse = !1), (this.gear = 1))));
      let r = 0;
      if (((this.burn = 0), this.fly)) {
        if (((this._flyT += t), i)) {
          let f = 10 * is((s.flyAlt - this.alt) / 10, -1, 1);
          r = is(Ao * s.flyG + 3 * (f - this.bodyVy), 0, 3 * Ao);
        } else
          n &&
            (this._burnOn ||
              (this.bodyVy < -4 &&
                this.alt < (this.bodyVy * this.bodyVy - 2) / 32 + 3)) &&
            ((this._burnOn = !0),
            (r = is(
              Ao * s.flyG +
                4 * (-is(1.5 + this.alt * 0.8, 1.5, 8) - this.bodyVy),
              0,
              3 * Ao,
            )),
            (this.burn = 1));
        ((i || !n) && (this._burnOn = !1),
          r > 0 &&
            (this.nitro = Math.max(
              0,
              this.nitro - (s.liftUse * t * r) / (Ao * s.flyG),
            )),
          this.onGround &&
            this._flyT > 0.3 &&
            !i &&
            ((this.fly = !1),
            (this._burnOn = !1),
            (this.landed = (this.landed || 0) + 1)));
        let c = Math.hypot(this.vel.x, this.vel.z),
          h = this._flyAtt || (this._flyAtt = [0, 0]);
        ((h[0] = -0.1 * (is(e.throttle || 0, 0, 1) - is(e.brake || 0, 0, 1))),
          (h[1] = -0.3 * this.steerIn * is(c / 15, 0, 1)));
      }
      let l = !!e.flip;
      if (
        (l &&
          !this._flipWas &&
          this.fly &&
          !this.onGround &&
          this.alt > 5 &&
          this.flipT < 0 &&
          this.nitro > 0.1 &&
          ((this.flipT = 0), (this.nitro -= 0.06), this.flips++),
        (this._flipWas = l),
        this.flipT >= 0)
      ) {
        this.flipT += t;
        let c = Math.min(1, this.flipT / 0.9);
        ((this.flip = 2 * Math.PI * c * c * (3 - 2 * c)),
          (c >= 1 || this.onGround) && ((this.flip = 0), (this.flipT = -1)));
      }
      this._liftA = r;
    }
    wallHit(t, e) {
      let s = this.S,
        n = t.c;
      if (
        !s.climbs ||
        !this.fanOn ||
        this.fly ||
        !this.onGround ||
        this.reverse ||
        (this.throttle || 0) < 0.25 ||
        !n?.pts ||
        n.y1 === void 0
      )
        return !1;
      let i = t.n,
        a = this.forward(),
        r = -(a.x * i.x + a.z * i.z);
      if (r < 0.5) return !1;
      let l = (n.eave ?? n.y1) - this.pos.y;
      if (l < 2.5 || l > 400) return !1;
      let c = n.pts,
        h = c.length / 2,
        f = null,
        u = 1e9;
      for (let R = 0; R < h; R++) {
        let P = c[R * 2],
          C = c[R * 2 + 1],
          I = c[((R + 1) % h) * 2],
          L = c[((R + 1) % h) * 2 + 1],
          F = I - P,
          O = L - C,
          B = Math.hypot(F, O);
        if (B < 2.5 || Math.abs((O * i.x - F * i.z) / B) < 0.9) continue;
        let H = ((t.px - P) * F + (t.pz - C) * O) / (B * B);
        H = is(H, 0, 1);
        let N = Math.hypot(t.px - P - F * H, t.pz - C - O * H);
        N < u && ((u = N), (f = [P, C, I, L]));
      }
      if (!f || u > 1.5) return !1;
      let [d, p, m, g] = f,
        b = m - d,
        v = g - p,
        x = Math.hypot(b, v),
        y = i.x,
        M = i.z,
        S = -M,
        w = y,
        _ = b * S + v * w,
        z = Math.atan2(a.x * S + a.z * w, r),
        A = s.a + s.b,
        T = (this.pos.x + a.x * s.a - d) * y + (this.pos.z + a.z * s.a - p) * M,
        E = (this.pos.x - d) * S + (this.pos.z - p) * w;
      return (
        (this.climb = {
          ox: d,
          oz: p,
          nx: y,
          nz: M,
          tx: S,
          tz: w,
          g: this.pos.y,
          H: l,
          lean: n.lean || 0,
          u: E,
          umin: Math.min(0, _),
          umax: Math.max(0, _),
          pf: zc - Math.max(0, T),
          th: z,
          s: Math.max(3, this.speed * Math.max(0.6, r)),
          phi: 0,
          L: A,
        }),
        this.climbs++,
        (this.fan = 1),
        (this.fly = !1),
        (this.tilt = 0),
        !0
      );
    }
    _climbStep(t, e, s) {
      let n = this.S,
        i = this.climb,
        a = n.mass;
      this._snap();
      let r = is(e.throttle || 0, 0, 1),
        l = is(e.brake || 0, 0, 1);
      ((this.steerIn += ((e.steer || 0) - this.steerIn) * is(t * 8, 0, 1)),
        (this.steer = this.steerIn * 0.45),
        (this.throttle = r),
        (this.brake = l),
        (this.fan = this.fanOn ? 1 : Math.max(0, this.fan - t * 2)),
        (this.downKg = this.fan * (n.fanKg || 0)));
      let c = i.phi,
        h = Math.sin(c),
        f = Math.cos(c),
        u = (n.mu || 1.2) * (this.fan * (n.fanKg || 0) * Ao + a * Ao * f);
      ((this.nitroOn = !!e.nitro && this.nitro > 0.02 && r > 0.2),
        this.nitroOn &&
          (this.nitro = Math.max(0, this.nitro - t * (n.nitroUse ?? 0.25))));
      let d = Ao * h * Math.cos(i.th),
        p = 0;
      (r > 0.05
        ? ((p =
            r * Math.min(u, (n.climbP || 1e6) / Math.max(Math.abs(i.s), 2)) +
            ((this.nitroOn && n.nitroForce) || 0)),
          (i.s += (p / a - d) * t))
        : l > 0.1 && i.s > 0.5
          ? ((p = -l * u), (i.s = Math.max(0, i.s + (p / a - d) * t)))
          : l > 0.1
            ? (i.s += (-6 * l - i.s) * is(t * 2, 0, 1))
            : (i.s =
                i.s > 0
                  ? Math.max(0, i.s - (d + 1) * t)
                  : Math.min(0, i.s + 4 * t)),
        (i.s = is(i.s, -10, 120)),
        (i.th = is(i.th + ((i.s * Math.tan(this.steer)) / i.L) * t, -1.2, 1.2)),
        (i.pf += i.s * Math.cos(i.th) * t),
        (i.u += i.s * Math.sin(i.th) * t));
      let m = i.L * Math.cos(i.th),
        g = CO(i.pf, i.H, [0, 0]),
        b = [0, 0],
        v = i.pf - m * 1.5,
        x = i.pf - m;
      for (let I = 0; I < 22; I++) {
        let L = (v + x) / 2;
        (CO(L, i.H, b),
          Math.hypot(g[0] - b[0], g[1] - b[1]) > m ? (v = L) : (x = L));
      }
      let y = (v + x) / 2;
      CO(y, i.H, b);
      let M = g[0] - b[0],
        S = g[1] - b[1];
      i.phi = Math.atan2(S, -M);
      let w = n.b / (n.a + n.b),
        _ = b[0] + M * w,
        z = b[1] + S * w,
        A = this.pos.x,
        T = this.pos.y,
        E = this.pos.z,
        R = _ - (i.lean || 0) * Math.max(0, z);
      ((this.pos.x = i.ox + i.tx * i.u + i.nx * R),
        (this.pos.z = i.oz + i.tz * i.u + i.nz * R),
        (this.pos.y = i.g + z),
        (this.vel.x = (this.pos.x - A) / t),
        (this.vel.y = (this.pos.y - T) / t),
        (this.vel.z = (this.pos.z - E) / t),
        (this.psi = Math.atan2(i.nx, i.nz)),
        (this.pitch = i.phi),
        (this.roll = 0),
        (this.wyaw = i.th),
        (this.bodyY = this.pos.y),
        (this.bodyVy = this.vel.y),
        (this.heave = 0),
        (this.bodyPitch = this.bodyRoll = 0),
        (this.bRoll = this.bPitchV = this.bRollV = 0),
        (this.bPitch = i.phi),
        (this.onGround = !0),
        (this.air = 0),
        (this.airTime = 0),
        (this.load = 1),
        (this.alt = Math.max(0, z - (i.pf > tet(i.H) ? i.H : 0))),
        (this.r = 0),
        (this.beta = 0),
        (this.drift = 0),
        (this.ax = p / a),
        (this.ay = 0),
        (this.lift = 0),
        (this.burn = 0),
        (this._liftA = 0),
        (this.impact = Math.max(0, this.impact - t * 3)),
        (this.impactT = Math.max(0, this.impactT - t)));
      let P = n.wheelR;
      for (let I = 0; I < 4; I++)
        ((this.w[I] = i.s / P),
          (this.wheelSpin[I] += (i.s / P) * t),
          (this.slip[I] = 0),
          (this.kappa[I] = 0),
          (this.wc[I] = 1));
      this.rpm = is(
        (Math.abs(i.s) / P) * (n.final || 4) * M2,
        n.idle,
        n.limiter,
      );
      let C = tet(i.H);
      if (y > C + 0.05 || i.pf < -0.05) return this._climbOff(!1);
      if (
        c > 0.4 &&
        (e.lift || this.fan < 0.5 || i.u < i.umin - 0.3 || i.u > i.umax + 0.3)
      )
        return this._climbOff(!0, !!e.lift);
    }
    _climbOff(t, e = !1) {
      let s = this.climb;
      this.climb = null;
      let n = -s.nx * Math.cos(s.th) + s.tx * Math.sin(s.th),
        i = -s.nz * Math.cos(s.th) + s.tz * Math.sin(s.th),
        a = s.s;
      if (
        ((this.psi = Math.atan2(-n, -i)),
        (this.wyaw = 0),
        (this.pitch = 0),
        (this.bPitch = 0),
        (this._cPrev = null),
        (this._prev = null),
        (this._vxPrev = null),
        (this.r = 0),
        !t)
      ) {
        ((this.vel.x = n * a),
          (this.vel.z = i * a),
          (this.vel.y = 0),
          (this.reverse = a < -0.5));
        for (let l = 0; l < 4; l++) this.w[l] = a / this.S.wheelR;
        return;
      }
      let r = this.S.b + 1.2;
      ((this.pos.x += s.nx * r),
        (this.pos.z += s.nz * r),
        (this.vel.x = s.nx * 3 + s.tx * a * Math.sin(s.th)),
        (this.vel.z = s.nz * 3 + s.tz * a * Math.sin(s.th)),
        (this.tilt = s.phi),
        (this.fly = this.nitro > 0.05),
        (this._flyT = 0.31),
        (this._burnOn = !1),
        (this.onGround = !1),
        (this.bodyY = this.pos.y),
        (this.bodyVy = e
          ? Math.max(4, a * Math.cos(s.th) * 0.5)
          : a * Math.cos(s.th) * Math.sin(s.phi)),
        (this._cPrev = [s.g, s.g, s.g, s.g]));
    }
    _loopStep(t, e, s) {
      let n = this.S,
        i = this.ride,
        a = s?.loops?.[i.li],
        r = n.mass;
      if ((this._snap(), !a)) {
        this.ride = null;
        return;
      }
      let l = is(e.throttle || 0, 0, 1),
        c = is(e.brake || 0, 0, 1);
      ((this.steerIn += ((e.steer || 0) - this.steerIn) * is(t * 8, 0, 1)),
        (this.steer = this.steerIn * 0.1),
        (this.throttle = l),
        (this.brake = c));
      let h = !!n.fanKg && this.fanOn;
      this.fan = h ? 1 : 0;
      let f = h ? Math.max(n.fanKg, 2 * r) : 0;
      this.downKg = f;
      let u = a.at(i.pf - 0.5, this._la || (this._la = [0, 0, 0])),
        d = a.at(i.pf + 0.5, this._lb || (this._lb = [0, 0, 0])),
        p = a.at(i.pf - 1.5, [0, 0, 0]),
        m = a.at(i.pf + 1.5, [0, 0, 0]),
        g = Math.atan2(d[1] - u[1], d[0] - u[0]),
        b = Math.atan2(u[1] - p[1], u[0] - p[0]),
        v = Math.atan2(m[1] - d[1], m[0] - d[0]),
        x = Math.max(0, Math.atan2(Math.sin(v - b), Math.cos(v - b)) / 2),
        y = i.s * i.s * x + Ao * Math.cos(g) + (f * Ao) / r;
      if (y < 0 && i.pf > 1 && i.pf < a.L - 1) return this._loopOff(a, "fall");
      let M = !!(e.lift || e.flip);
      if (M && !i.held && n.liftA && Math.cos(i.pitch) < -0.5)
        return this._loopOff(a, "drop");
      i.held = M;
      let S = (n.mu || 1.2) * Math.max(0, y) * r;
      ((this.nitroOn = !!e.nitro && this.nitro > 0.02 && l > 0.2),
        this.nitroOn &&
          (this.nitro = Math.max(0, this.nitro - t * (n.nitroUse ?? 0.25))));
      let w = 0;
      (l > 0.05
        ? (w =
            l * Math.min(S, (n.climbP || 3e5) / Math.max(Math.abs(i.s), 2)) +
            ((this.nitroOn && n.nitroForce) || 0))
        : c > 0.1 && (w = -Math.sign(i.s || 1) * Math.min(S, c * r * 9)),
        (i.s += (w / r - Ao * Math.sin(g) - 4e-4 * i.s * Math.abs(i.s)) * t),
        (i.pf += i.s * t));
      let _ = n.a + n.b,
        z = a.at(i.pf, [0, 0, 0]),
        A = [0, 0, 0],
        T = i.pf - _ * 1.6,
        E = i.pf - _;
      for (let G = 0; G < 24; G++) {
        let W = (T + E) / 2;
        (a.at(W, A),
          Math.hypot(z[0] - A[0], z[1] - A[1], z[2] - A[2]) > _
            ? (T = W)
            : (E = W));
      }
      let R = (T + E) / 2;
      a.at(R, A);
      let P = z[0] - A[0],
        C = z[1] - A[1],
        I = z[2] - A[2],
        L = n.b / _,
        F = Math.atan2(C, P);
      ((F += 2 * Math.PI * Math.round((i.pitch - F) / (2 * Math.PI))),
        (i.pitch = F));
      let O = a.world(A[0] + P * L, A[1] + C * L, A[2] + I * L),
        B = this.pos.x,
        H = this.pos.y,
        N = this.pos.z;
      ((this.pos.x = O.x),
        (this.pos.y = O.y),
        (this.pos.z = O.z),
        (this.vel.x = (O.x - B) / t),
        (this.vel.y = (O.y - H) / t),
        (this.vel.z = (O.z - N) / t),
        (this.psi = a.psi),
        (this.pitch = F),
        (this.roll = 0),
        (this.wyaw = -Math.asin(is(I / _, -1, 1))));
      let D = Math.atan2(Math.sin(F), Math.cos(F));
      ((this.bodyY = this.pos.y),
        (this.bodyVy = this.vel.y),
        (this.heave = 0),
        (this.bodyPitch = this.bodyRoll = 0),
        (this.bRoll = this.bPitchV = this.bRollV = 0),
        (this.bPitch = D),
        (this.onGround = !0),
        (this.air = 0),
        (this.airTime = 0),
        (this.load = 1),
        (this.alt = Math.max(0, A[1] + C * L)),
        (this.r = 0),
        (this.beta = 0),
        (this.drift = 0),
        (this.ax = w / r),
        (this.ay = 0),
        (this.lift = 0),
        (this.burn = 0),
        (this._liftA = 0),
        (this.impact = Math.max(0, this.impact - t * 3)),
        (this.impactT = Math.max(0, this.impactT - t)));
      let U = n.wheelR;
      for (let G = 0; G < 4; G++)
        ((this.w[G] = i.s / U),
          (this.wheelSpin[G] += (i.s / U) * t),
          (this.slip[G] = 0),
          (this.kappa[G] = 0),
          (this.wc[G] = 1));
      if (
        ((this.rpm = is(
          (Math.abs(i.s) / U) * (n.final || 4) * M2,
          n.idle,
          n.limiter,
        )),
        i.pf >= a.L - 0.05)
      )
        return this._loopOff(a, "launch");
      if (i.pf < -0.3 && i.s < 0) return this._loopOff(a, "back");
    }
    _loopOff(t, e) {
      let s = this.ride;
      this.ride = null;
      let n = s.s;
      if (
        ((this.wyaw = 0),
        (this.pitch = 0),
        (this.bPitch = 0),
        (this._prev = null),
        (this._vxPrev = null),
        (this.r = 0),
        (this.psi = t.psi),
        e === "back")
      ) {
        ((this.pos.y = t.y),
          (this.bodyY = t.y),
          (this._cPrev = null),
          (this.vel.x = t.d.x * n),
          (this.vel.z = t.d.z * n),
          (this.vel.y = 0),
          (this.reverse = n < -0.5));
        for (let f = 0; f < 4; f++) this.w[f] = n / this.S.wheelR;
        return;
      }
      let i = t.at(s.pf - 0.5, [0, 0, 0]),
        a = t.at(s.pf + 0.5, [0, 0, 0]),
        r = a[0] - i[0],
        l = a[1] - i[1],
        c = a[2] - i[2],
        h = Math.hypot(r, l, c) || 1;
      ((this.vel.x = ((t.d.x * r + t.r.x * c) / h) * n),
        (this.vel.z = ((t.d.z * r + t.r.z * c) / h) * n),
        (this.tilt = Math.atan2(Math.sin(s.pitch), Math.cos(s.pitch))),
        (e === "launch" || Math.cos(s.pitch) < 0) &&
          ((this.psi = t.psi + Math.PI),
          (this.tilt = Math.atan2(
            Math.sin(Math.PI - s.pitch),
            Math.cos(Math.PI - s.pitch),
          )),
          (this.spin = Math.PI)),
        (this.fly = !!this.S.liftA && this.nitro > 0.05),
        (this._flyT = 0.31),
        (this._burnOn = !1),
        (this.onGround = !1),
        (this.bodyY = this.pos.y),
        (this.bodyVy = e === "drop" ? -1.5 : (l / h) * n),
        (this._cPrev = [t.y, t.y, t.y, t.y]));
    }
    _suspend(t, e, s, n, i = e) {
      let a = this.S,
        r = a.mass,
        l = a.a + a.b,
        c = (2 * Math.PI * a.rideHz) ** 2,
        h = [
          a.rideHzF === void 0 ? c : (2 * Math.PI * a.rideHzF) ** 2,
          a.rideHzR === void 0 ? c : (2 * Math.PI * a.rideHzR) ** 2,
        ],
        f = Math.hypot(this.vel.x, this.vel.z) * 3.6,
        u = xr(
          a.gStick,
          a.gVert,
          w2((f - a.stickKmh[0]) / (a.stickKmh[1] - a.stickKmh[0])),
        ),
        d = Ao * u,
        p = Ao * Math.max(a.gAir, u);
      if (
        (this.fly
          ? (d = p = Ao * a.flyG)
          : this.fan > 0 && a.fanKg && (d += (this.fan * a.fanKg * Ao) / r),
        !this._cPrev)
      ) {
        let A = (e[0] + e[1]) / 2,
          T = (e[2] + e[3]) / 2;
        ((this.bodyY = (A * a.b + T * a.a) / l),
          (this.bPitch = Math.atan2(A - T, l)),
          (this.bRoll = Math.atan2((e[0] + e[2] - e[1] - e[3]) / 2, a.track)),
          (this.bodyVy = this.bPitchV = this.bRollV = 0),
          (this.onGround = !0),
          (this.load = 1));
      }
      let m = this._cPrev || e,
        g = Math.max(1, Math.ceil(t * 240 - 1e-6)),
        b = t / g,
        v = !this.onGround,
        x = 0,
        y = 0,
        M = 0,
        S = [0, 0, 0, 0],
        w = [0, 0, 0, 0],
        _ = [0, 0, 0, 0];
      for (let A = 0; A < g; A++) {
        let T = (A + 1) / g,
          E = 0,
          R = 0,
          P = 0;
        x = 0;
        let C = Math.tan(this.bPitch),
          I = Math.tan(this.bRoll);
        for (let B = 0; B < 4; B++) {
          let H = (r * (B < 2 ? a.b : a.a)) / l / 2,
            N = H * h[B < 2 ? 0 : 1],
            D = 2 * a.rideZeta * Math.sqrt(N * H),
            U = m[B] + (e[B] - m[B]) * T,
            G = (e[B] - m[B]) / t,
            W = this.bodyY + s[B] * C + n[B] * I,
            V = this.bodyVy + s[B] * this.bPitchV + n[B] * this.bRollV,
            $ = U - W;
          if (((w[B] = $), $ < -a.droop)) {
            ((S[B] = 0), (_[B] = 0));
            continue;
          }
          let J = Math.min($, a.bumpMax + 0.04),
            X =
              is(G - V, -a.damperV, a.damperV) +
              0.25 * is(G - V - is(G - V, -a.damperV, a.damperV), -4, 4),
            tt = H * d + N * J + D * X;
          (J > a.bump && (tt += N * 6 * (J - a.bump)),
            (S[B] = Math.max(0, tt)),
            (_[B] = S[B] > 0 ? 1 : 0),
            (x += _[B]),
            _[B] && v && A === 0 && (M = Math.max(M, G - V)));
        }
        for (let [B, H] of [
          [0, 1],
          [2, 3],
        ])
          if (_[B] && _[H]) {
            let N = (r * (B < 2 ? a.b : a.a)) / l / 2,
              D =
                (B < 2 ? (a.arbF ?? a.arb) : (a.arbR ?? a.arb)) *
                N *
                h[B < 2 ? 0 : 1] *
                (w[B] - w[H]);
            ((S[B] = Math.max(0, S[B] + D)), (S[H] = Math.max(0, S[H] - D)));
          }
        for (let B = 0; B < 4; B++)
          ((E += S[B]), (R += S[B] * s[B]), (P += S[B] * n[B]));
        if (x)
          ((R += r * (this.axB ?? this.ax) * a.hcg * a.leanPitch),
            (P += r * is(this.ayC || 0, -20, 20) * a.hcg * a.lean));
        else if (this.fly && this._flyAtt) {
          let B = this._flyAtt;
          ((this.bPitchV += ((B[0] - this.bPitch) * 20 - this.bPitchV * 7) * b),
            (this.bRollV += ((B[1] - this.bRoll) * 20 - this.bRollV * 7) * b));
        } else
          ((this.bPitchV *= Math.exp(-b * 1.5)),
            (this.bRollV *= Math.exp(-b * 3)));
        ((this.bodyVy += (E / r - (x ? d : p) + this._liftA) * b),
          (this.bodyY += this.bodyVy * b),
          (this.bPitchV += (R / a.ipitch) * b),
          (this.bPitch += this.bPitchV * b),
          (this.bRollV += (P / a.iroll) * b),
          (this.bRoll += this.bRollV * b),
          (y = E));
        let L = 0,
          F = Math.tan(this.bPitch),
          O = Math.tan(this.bRoll);
        for (let B = 0; B < 4; B++) {
          let H = m[B] + (e[B] - m[B]) * T;
          L = Math.max(L, H - a.bumpMax - (this.bodyY + s[B] * F + n[B] * O));
        }
        if (L > 0) {
          this.bodyY += L;
          let B = is(
            (e[0] + e[1] + e[2] + e[3] - m[0] - m[1] - m[2] - m[3]) / 4 / t,
            -3,
            3,
          );
          this.bodyVy < B &&
            ((M = Math.max(M, B - this.bodyVy)), (this.bodyVy = B));
        }
      }
      if (this._cPrev) {
        let A = [0, 1, 2, 3]
          .map((E) => (e[E] - m[E]) / t)
          .sort((E, R) => E - R);
        this._rise = Math.max(A[1], (this._rise ?? 0) - 12 * t);
        let T =
          this.impactT > 0 || this.impact > 0.01
            ? Math.min(Math.max(0, this._rise), 1) + 1.5
            : Math.max(0, this._rise) + 2;
        x && this.bodyVy > T && !this.fly && (this.bodyVy = T);
      }
      ((this._cPrev = e.slice()),
        (this.bPitch = is(this.bPitch, -0.6, 0.6)),
        (this.bRoll = is(this.bRoll, -0.5, 0.5)),
        (this.onGround = x > 0));
      for (let A = 0; A < 4; A++) ((this.wc[A] = _[A]), (this.susp[A] = w[A]));
      let z = y / (r * d);
      ((this.load += (z - this.load) * is(t / 0.05, 0, 1)),
        this.onGround
          ? (v &&
              (this.airTime > 0.05 || this.fly) &&
              (this.landing = Math.max(this.landing, is((M - 1) / 5, 0, 1))),
            (this.air = 0),
            (this.airTime = 0))
          : ((this.air += t), this.fly || (this.airTime += t), (this.load = 0)),
        (this.vel.y = this.bodyVy),
        this._wheelPlane(i));
    }
    _wheelPlane(t) {
      let e = this.S,
        s = e.a + e.b,
        n = [e.a, e.a, -e.b, -e.b],
        i = e.track / 2,
        a = [i, -i, i, -i],
        r = Math.tan(this.bPitch),
        l = Math.tan(this.bRoll),
        c = this._wh || (this._wh = [0, 0, 0, 0]);
      for (let g = 0; g < 4; g++) {
        let b = this.bodyY + n[g] * r + a[g] * l;
        c[g] = this.wc[g] ? t[g] : Math.max(t[g], b - e.droop);
      }
      let h = (c[0] + c[1]) / 2,
        f = (c[2] + c[3]) / 2,
        u = (c[0] + c[2]) / 2,
        d = (c[1] + c[3]) / 2;
      ((this.pos.y = (h * e.b + f * e.a) / s),
        (this.pitch = Math.atan2(h - f, s)),
        (this.roll = Math.atan2(u - d, e.track)),
        (this.heave = this.bodyY - this.pos.y),
        (this.bodyPitch = this.bPitch - this.pitch),
        (this.bodyRoll = this.bRoll - this.roll));
      let p = Math.max(-0.12, Math.min(0.12, (c[0] - c[1] - c[2] + c[3]) / 4)),
        m = this.wheelDy || (this.wheelDy = [0, 0, 0, 0]);
      ((m[0] = p), (m[1] = -p), (m[2] = -p), (m[3] = p));
    }
    _snap() {
      let t =
        this._prev ||
        (this._prev = {
          pos: { x: 0, y: 0, z: 0 },
          wheelSpin: [0, 0, 0, 0],
          ok: !1,
        });
      ((t.pos.x = this.pos.x),
        (t.pos.y = this.pos.y),
        (t.pos.z = this.pos.z),
        (t.psi = this.psi),
        (t.pitch = this.pitch),
        (t.roll = this.roll),
        (t.heave = this.heave),
        (t.flip = this.flip || 0),
        (t.wyaw = this.wyaw || 0),
        (t.tilt = this.tilt || 0),
        (t.spin = this.spin || 0),
        (t.bodyPitch = this.bodyPitch),
        (t.bodyRoll = this.bodyRoll),
        (t.bodyY = this.bodyY),
        (t.steer = this.steer));
      for (let e = 0; e < 4; e++) t.wheelSpin[e] = this.wheelSpin[e];
      t.ok = !0;
    }
    renderPose(t) {
      let e = this._prev,
        s =
          this.rp ||
          (this.rp = { pos: { x: 0, y: 0, z: 0 }, wheelSpin: [0, 0, 0, 0] }),
        n =
          e &&
          e.ok &&
          Math.hypot(this.pos.x - e.pos.x, this.pos.z - e.pos.z) < 8
            ? is(t, 0, 1)
            : 1,
        i = n === 1 || !e ? this : e,
        a = (r) => i[r] + (this[r] - i[r]) * n;
      ((s.pos.x = i.pos.x + (this.pos.x - i.pos.x) * n),
        (s.pos.y = i.pos.y + (this.pos.y - i.pos.y) * n),
        (s.pos.z = i.pos.z + (this.pos.z - i.pos.z) * n),
        (s.psi =
          i.psi +
          Math.atan2(Math.sin(this.psi - i.psi), Math.cos(this.psi - i.psi)) *
            n),
        (s.flip =
          (i.flip || 0) +
          Math.atan2(
            Math.sin((this.flip || 0) - (i.flip || 0)),
            Math.cos((this.flip || 0) - (i.flip || 0)),
          ) *
            n),
        this.flip || (s.flip = 0),
        (s.wyaw = (i.wyaw || 0) + ((this.wyaw || 0) - (i.wyaw || 0)) * n),
        (s.tilt = (i.tilt || 0) + ((this.tilt || 0) - (i.tilt || 0)) * n),
        (s.spin = (i.spin || 0) + ((this.spin || 0) - (i.spin || 0)) * n),
        (s.pitch = a("pitch")),
        (s.roll = a("roll")),
        (s.heave = a("heave")),
        (s.bodyPitch = a("bodyPitch")),
        (s.bodyRoll = a("bodyRoll")),
        (s.bodyY = a("bodyY")),
        (s.steer = a("steer")));
      for (let r = 0; r < 4; r++)
        s.wheelSpin[r] =
          i.wheelSpin[r] + (this.wheelSpin[r] - i.wheelSpin[r]) * n;
      return ((s.wheelDy = this.wheelDy), s);
    }
    _driftRot(t, e, s, n) {
      if (!this.onGround || this.drift <= 0.05 || t <= 6 || Math.abs(e) <= 0.02)
        return 0;
      let i =
        Ao *
        this.drift *
        (0.6 +
          2.6 * Math.abs(this.steerIn) +
          1.2 * is(1 - Math.abs(this.steerIn) / 0.25, 0, 1)) *
        (0.7 + 0.3 * n);
      return (
        -Math.sign(e) * Math.sign(s) * Math.min(i / t, Math.abs(e) * 10 + 0.35)
      );
    }
    gSlope(t, e, s) {
      return ((s?.heightAt || Wi)(t, e, this._g), this._g);
    }
  };
