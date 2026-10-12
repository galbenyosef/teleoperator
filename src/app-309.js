// app 309 — math
// Lines 148731-150147 of readable/app.pretty.js (statement-aligned).
var Fw = 60 / (2 * Math.PI),
  Ax = class {
    constructor(t = th) {
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
        (this.assists = { ...HI }),
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
        (this.da = null));
    }
    get speed() {
      return Math.hypot(this.vel.x, this.vel.z);
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
            ? eo(t, e, null, n + 0.3)
            : eo(t, e)),
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
        (this.liftT = 0));
    }
    shift(t) {
      return !this.manual || this.reverse
        ? !1
        : ((this._shiftReq = Math.sign(t)), !0);
    }
    step(t, e, s) {
      (this.da &&
        this.da.mode !== "manual" &&
        (e = this.da.filter(t, e, s, this)),
        (this.simT = (this.simT || 0) + t));
      let n = this.S,
        o = n.mass,
        a = n.a + n.b,
        r = this.assists,
        l = n.wheelR,
        c = this.forward(),
        h = { x: -Math.cos(this.psi), z: Math.sin(this.psi) },
        f = this.vel.x * c.x + this.vel.z * c.z,
        u = this.vel.x * h.x + this.vel.z * h.z,
        d = Math.hypot(f, u);
      if (this._vxPrev === null || Math.abs(f - this._vxPrev) > 3)
        for (let Rt = 0; Rt < 4; Rt++) this.w[Rt] = f / l;
      this._snap();
      let p = this.pos.x,
        m = this.pos.z,
        g = s?.heightAt || eo,
        b = n.track / 2,
        x = this._c,
        v = this._c0 || (this._c0 = [0, 0, 0, 0]),
        y = [n.a, n.a, -n.b, -n.b],
        M = [b, -b, b, -b],
        S = this._hk || (this._hk = []),
        w =
          S[0] === p &&
          S[1] === m &&
          S[2] === c.x &&
          S[3] === c.z &&
          S[4] === h.x &&
          S[5] === h.z &&
          S[6] === g &&
          S[7] === n.a &&
          S[8] === n.b &&
          S[9] === b;
      if (
        (w ||
          ((S[0] = p),
          (S[1] = m),
          (S[2] = c.x),
          (S[3] = c.z),
          (S[4] = h.x),
          (S[5] = h.z),
          (S[6] = g),
          (S[7] = n.a),
          (S[8] = n.b),
          (S[9] = b)),
        !w)
      )
        for (let Rt = 0; Rt < 4; Rt++) {
          let Vt = 0;
          for (let [Pe, bs] of Nvt) {
            let Ts = y[Rt] + Pe,
              Xe = g(p + c.x * Ts + h.x * M[Rt], m + c.z * Ts + h.z * M[Rt]);
            ((Vt += bs * Xe), Pe === 0 && (v[Rt] = Xe));
          }
          x[Rt] = Vt;
        }
      if (!w) {
        let Rt = g(p, m) - (n.floor ?? 0.12);
        this._floorY = Rt;
      }
      let z = 0;
      if (this._cPrev && this.onGround) {
        let Rt = Math.tan(this.bPitch),
          Vt = Math.tan(this.bRoll),
          Pe = [0, 1, 2, 3].map((Ts) => this.bodyY + y[Ts] * Rt + M[Ts] * Vt),
          bs = Pe.map((Ts, Xe) => x[Xe] > Ts + NI);
        if (bs.filter(Boolean).length <= 2)
          for (let Ts = 0; Ts < 4; Ts++)
            bs[Ts] &&
              ((x[Ts] = Math.min(x[Ts], Math.max(Pe[Ts], this._cPrev[Ts]))),
              (v[Ts] = Math.min(v[Ts], x[Ts])),
              z++);
      }
      this.walled = z;
      {
        let Rt = this._floorY;
        if (
          Number.isFinite(Rt) &&
          Rt > (x[0] + x[1] + x[2] + x[3]) / 4 &&
          !(z && Rt > (x[0] + x[1] + x[2] + x[3]) / 4 + NI)
        )
          for (let Vt = 0; Vt < 4; Vt++) x[Vt] < Rt && (x[Vt] = Rt);
      }
      this._suspend(t, x, y, M, v);
      let _ = this.onGround ? 1 : 0,
        R = d * 3.6,
        T = _s(e.steer, -1, 1),
        E =
          !!e.player &&
          Math.abs(T) > 0.6 &&
          (!this._holdDir || Math.sign(T) === this._holdDir);
      ((this._holdDir = E ? Math.sign(T) : 0),
        (this._steerHold = E ? (this._steerHold || 0) + t : 0));
      let A = E
          ? T *
            sr(
              1,
              0.4 + 0.6 * (1 - Math.exp(-this._steerHold / 0.22)),
              _s((R - 30) / 50, 0, 1),
            )
          : T,
        C =
          (Math.abs(A) > Math.abs(this.steerIn) &&
          Math.sign(A) === Math.sign(this.steerIn || A)
            ? n.steerRate
            : n.steerReturn) * sr(1, 0.6, _s(R / 200, 0, 1));
      this.steerIn += _s(A - this.steerIn, -C * t, C * t);
      let P = _s(R / 250, 0, 1),
        I = _s(e.throttle, 0, 1),
        L = _s(e.brake, 0, 1),
        F = !this.da || this.da.mode === "manual";
      this._brkLatch && (L < 0.1 ? (this._brkLatch = !1) : (L = 0));
      let N = s?.speedCap ? s.speedCap(p, m) : 0;
      if (((this.zoneCap = N), N > 0)) {
        let Rt = _s((N - d) / (0.3 * N), 0, 1);
        this.reverse
          ? (L *= Math.max(Rt, 0.25))
          : ((I *= Rt),
            d > N * 1.05 &&
              L < 0.3 &&
              (L = Math.max(
                L,
                _s((d - N) / 20, 0.04, n.zoneBrake ?? (n.ev ? 0.08 : 0.28)),
              )));
      }
      let B = L > 0.1 && I < 0.1;
      (B && !this._brkWas && (this._brkRest = d < 0.15),
        (this._brkWas = B),
        (this._brkStopT = B && d < 0.4 ? (this._brkStopT || 0) + t : 0));
      let H = F ? 0.2 : n.comfortBrake ? 1.5 : 0.6;
      (!this.reverse &&
        B &&
        !this.holdStop &&
        f < 0.8 &&
        d < 1.5 &&
        (this._brkRest || this._brkStopT > H) &&
        ((this.reverse = !0), (this._shiftReq = 0), (this._revIn = 0)),
        this.reverse &&
          I > 0.1 &&
          f > -0.8 &&
          (d < 1.5 || f > 0.5) &&
          ((this.reverse = !1), (this.gear = 1)),
        (this._revIn = this.reverse
          ? Math.min(1, (this._revIn ?? 1) + t / 0.3)
          : 1));
      let O = 0,
        D = 0;
      (this.reverse
        ? ((O = -L * Pm(this._revIn)), (D = I))
        : ((O = I), (D = L)),
        this.reverse && this.holdStop && ((O = 0), (D = Math.max(I, L))));
      let U = this.reverse && n.comfortBrake && e.digitalBrake && !F;
      U && (O *= 0.38);
      let G = !!e.digitalBrake && !this.reverse;
      {
        let Rt = D,
          Vt = this.brakeP || 0,
          Pe =
            Rt <= Vt
              ? Vt + (Rt - Vt) * _s(t / 0.015, 0, 1)
              : G && F
                ? Math.min(Rt, Vt < 0.4 ? Vt + t * 16 : Vt + t * 5)
                : Vt + (Rt - Vt) * _s(t / 0.05, 0, 1);
        (F || (Pe = Rt), (this.brakeP = Pe), (D = Pe));
      }
      if (
        n.comfortBrake &&
        e.digitalBrake &&
        !F &&
        !this.reverse &&
        L > 0.5 &&
        f > 0.5
      ) {
        if (((this._cbT = (this._cbT || 0) - t), this._cbT <= 0)) {
          this._cbT = 0.08;
          let Vt = n.comfortBrake;
          this._cbNeed = s?.brakeNeed
            ? s.brakeNeed(this, f, (f * f) / (2 * Vt) + 4)
            : 0;
        }
        let Rt =
          this._cbNeed > n.comfortBrake * 0.85
            ? this._cbNeed * 1.3 + 0.6
            : n.comfortBrake;
        if (Rt < 11) {
          let Vt = this.gSlope(p, m, s),
            Pe = Math.sqrt(1 + Vt.dx * Vt.dx + Vt.dz * Vt.dz),
            bs = (-Qc * (Vt.dx * c.x + Vt.dz * c.z)) / Pe,
            Ts = n.ev ? 4 * Math.min(n.regen, Math.abs(f) * 64) : 0;
          D = _s(
            (o * (Rt + bs) * l - Ts) / (2 * (n.brakeF + n.brakeR)),
            0.02,
            1,
          );
        }
      } else this._cbT = 0;
      ((this.throttle = Math.abs(O)), (this.brake = D));
      let q = Math.abs(this.steerIn) > 0.35;
      (D <= 0.2 &&
        this.brakeHeldT > 0 &&
        this.brakeHeldT < 0.35 &&
        Math.abs(this.steerIn) > 0.6 &&
        R > 55 &&
        !this.reverse &&
        ((this.brakeTapT = 0.45),
        (this.r += Math.sign(this.steerIn) * 0.65 * Math.abs(this.steerIn))),
        (this.brakeHeldT = D > 0.2 ? (this.brakeHeldT || 0) + t : 0),
        this.da?.only && (this.brakeHeldT = 0),
        (this.brakeTapT = Math.max(0, this.brakeTapT - t)),
        this.brakeHeldT > 0.4 && (this.brakeTapT = 0));
      let W = _s(e.handbrake || 0, 0, 1);
      ((this.hb = W),
        I > 0.7
          ? ((this._thrHeld = (this._thrHeld || 0) + t), (this._liftWin = 0.15))
          : ((this._liftWin = Math.max(0, (this._liftWin || 0) - t)),
            I < 0.1 &&
              this._liftWin > 0 &&
              this._thrHeld > 0.5 &&
              !n.awd &&
              Math.abs(this.steerIn) > 0.7 &&
              R > 60 &&
              Math.abs(this.ay) > 0.65 * Qc &&
              f > 0 &&
              !this.da?.only &&
              ((this.liftT = 0.5),
              (this._liftWin = 0),
              (this.r += Math.sign(this.steerIn) * 0.08)),
            this._liftWin <= 0 && (this._thrHeld = 0)),
        (this.liftT = Math.max(0, (this.liftT || 0) - t)));
      let V = (this.brakeTapT > 0 || W > 0.5) && R > 35,
        Y = d > 2 ? Math.atan2(u, Math.abs(f)) : 0;
      this.beta = Y;
      let $ =
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
      if (!$.on) {
        $.arm =
          this.reverse &&
          f < -4 &&
          Math.abs(this.steerIn) > 0.7 &&
          (I < 0.1 || $.arm > 0)
            ? $.arm + t
            : 0;
        let Rt = W > 0.5 && f < -4 && Math.abs(this.steerIn) > 0.3;
        this.onGround &&
          !(this.impactT > 0) &&
          (($.arm > 0.06 && f < -6) || Rt) &&
          (($.on = !0),
          ($.dir = -Math.sign(this.steerIn)),
          ($.psi0 = this.psi),
          ($.ang = 0),
          ($.t = 0),
          ($.v0 = d),
          ($.held = L > 0.1));
      }
      let st = 0;
      if ($.on) {
        (($.t += t), ($.ang += this.r * $.dir * t));
        let Rt = Math.PI - $.ang,
          Vt = _s($.v0 / 2.4, 2.8, 4.6);
        ((st =
          $.dir *
          Math.max(
            0,
            Math.min(Vt * Pm($.t / 0.2), Math.sqrt(26 * Math.max(0, Rt))),
          )),
          ($.held = $.held && L > 0.1));
        let Pe = Rt < 0.06 || ($.ang > 2.85 && f > 0 && Math.abs(Y) < 0.1);
        (Pe || d < 0.6 || this.impactT > 0 || !this.onGround || $.t > 2.5) &&
          (($.on = !1),
          (st = 0),
          Pe &&
            f > 0 &&
            ((this.reverse = !1),
            (this.gear = 1),
            $.held && (this._brkLatch = !0),
            (this.brakeP = 0),
            (this._jtDone = 0.6)));
      }
      (($.k += (($.on ? 1 : 0) - $.k) * _s(t / ($.on ? 0.06 : 0.25), 0, 1)),
        (this.jturn = $.on),
        $.on && this.reverse && ((D = 0), (this.brakeP = 0), (this.brake = 0)),
        (this._jtDone = Math.max(0, (this._jtDone || 0) - t)),
        this.drift < 0.05 && !V && (this._intent = !1),
        (V || (q && this.drift > 0.05)) && (this._intent = !0));
      let Q = Math.abs(this.steerIn) < 0.25,
        j =
          this.drift > 0.2 &&
          I > 0.35 &&
          (Math.abs(Y) > (Q ? 0.2 : 0.08) || q) &&
          this._intent;
      this.drift < 0.05 && (this._driftKmh = R);
      let X =
        r.esp &&
        Math.abs(Y) > 0.32 &&
        R > 35 &&
        !this.reverse &&
        !(this.impactT > 0) &&
        $.k < 0.05 &&
        !this._jtDone;
      this.capture = !V && !j && X;
      let K =
        $.k > 0.05
          ? 0
          : V
            ? 1
            : j
              ? Math.max(0.55, this.drift - t * 0.15)
              : X
                ? 0.6
                : 0;
      ((this.drift +=
        (K - this.drift) *
        _s(
          t *
            (K > this.drift
              ? 22
              : Math.abs(Y) < 0.06 && !q
                ? Q
                  ? 16
                  : 8
                : 2.4),
          0,
          1,
        )),
        R < 20 && (this.drift *= 1 - t * 3));
      let nt = s?.muAt ? s.muAt(p, m) : 1;
      n.surfK !== void 0 && (nt = 1 - (1 - nt) * n.surfK);
      let Z = n.downforce * d * d,
        et = n.mu * (n.latMu ?? 1) * nt * (Qc + Z / o),
        tt = Math.max(Math.abs(f), 3),
        it = sr(n.steerMax, n.steerMaxHigh, Math.pow(P, 0.7)),
        rt = Math.min(n.steerMax, Math.atan((a * et * 1.5) / (tt * tt))),
        lt =
          this.reverse || f < 6 || this.drift > 0.3 || !F
            ? 0
            : Math.max(
                _s(this.brakeP || 0, 0, 1),
                0.6 * _s(this.liftT / 0.2, 0, 1),
              ) * _s(Math.abs(this.steerIn) * 3, 0, 1);
      this.trailK = lt;
      let ct = ((f * Math.tan(this.steerIn * rt)) / a) * (1 + 0.8 * lt),
        dt = (et * (0.94 + 0.2 * lt)) / tt,
        ut = _s(ct, -dt, dt);
      ((this.rDes = ut),
        (this._rRef =
          (this._rRef ?? 0) + (ut - (this._rRef ?? 0)) * _s(t / 0.12, 0, 1)));
      let ot = Math.atan2(u - n.b * this.r, tt),
        at = Math.sign(ot) * Math.max(0, Math.abs(ot) - 0.07),
        yt =
          this.onGround &&
          f > 3 &&
          W < 0.5 &&
          !this.reverse &&
          !(this.impactT > 0) &&
          $.k < 0.05,
        vt;
      if (r.steering && yt && this.drift < 0.3) {
        let Rt = ut - this.r;
        ((this._hD +=
          ((this.r - this._hR) / t - this._hD) * (1 - Math.exp(-t / 0.06))),
          Math.abs(this.steerIn) < 0.02 && (this._hI = 0),
          Math.abs(at) > 0.02 && (this._hI *= Math.exp(-t / 0.12)));
        let Vt = _s((Math.abs(ut) * tt) / et, 0, 1),
          bs =
            Math.atan((ut * a) / tt) +
            Math.sign(ut) * 0.05 * Math.pow(Vt, 1.5) +
            0.2 * Rt +
            0.12 * this._hI -
            0.012 * this._hD +
            0.9 * at,
          Ts = Math.min(
            0.72,
            0.12 + 8 / Math.max(10, d) + Math.min(Math.abs(at) * 0.8, 0.32),
          );
        Math.abs(at) < 0.02 &&
          (Math.abs(bs) < Ts || Math.sign(Rt) !== Math.sign(bs)) &&
          (this._hI = _s(this._hI + Rt * t, -0.45, 0.45));
        let Xe = _s(bs, -Ts, Ts);
        if (d > 4 && d < 17) {
          let pn = Math.atan2(u + n.a * this.r, tt),
            Qs = sr(0.19, 0.6, _s((d - 10) / 7, 0, 1));
          Xe = _s(Xe, pn - Qs, pn + Qs);
        }
        vt = this._hd + _s(Xe - this._hd, -t * 10, t * 10);
      } else
        ((vt =
          this.steerIn * it * (f < 0 ? sr(1, 0.45, _s(-f / 11, 0, 1)) : 1)),
          (this._hI = 0),
          (this._hD = 0));
      if (
        ($.k > 0.01 &&
          (vt = sr(
            vt,
            this.steerIn * n.steerMax * 0.6 * _s((2.2 - $.ang) / 0.8, 0, 1),
            $.k,
          )),
        (this._hR = this.r),
        this.drift > 0.05 && d > 5)
      ) {
        let Rt = _s(Y * 0.9, -0.5, 0.5);
        vt = sr(
          vt,
          _s(Rt + this.steerIn * 0.28, -n.steerMax, n.steerMax),
          this.drift * 0.85,
        );
      }
      ((this._hd = vt), (this.steer = vt));
      let Pt = r.esp && yt && this.drift < 0.3 && !V,
        jt =
          Math.abs(at) > 0.08 ||
          this.r * ut < -0.05 ||
          Math.abs(this.r) > Math.abs(ut) + 0.25,
        Wt = jt
          ? ut - this.r + at * 1.5
          : sr(this._rRef, ut, _s((d - 8) / 5, 0, 1)) - this.r,
        Ct = Pt
          ? _s((Math.abs(Wt) - 0.25) * 1.3, 0, 0.9) *
            (jt ? 1 : 1 - _s(this.aid.abs * 1.5, 0, 1))
          : 0,
        qt = (jt ? 0 : 2) + (Wt < 0 ? 1 : 0);
      for (let Rt = 0; Rt < 4; Rt++) {
        let Vt = Rt === qt ? Ct * n.espBrake : 0;
        this.espB[Rt] = Pt
          ? this.espB[Rt] +
            (Vt - this.espB[Rt]) *
              (1 - Math.exp(-t / (Vt > this.espB[Rt] ? 0.045 : 0.12)))
          : 0;
      }
      ((this.espEngine = Pt
        ? Math.min(1 - Ct * 0.3, 1 - _s((Math.abs(at) - 0.08) * 4, 0, 0.7))
        : 1),
        (this.espC = Pt ? Wt : 0));
      let Zt = this.reverse ? n.reverse : n.gears[this.gear - 1],
        he = Zt * n.final,
        ee = (Math.abs(f) / l) * he * Fw,
        Xt = Math.abs((this.w[2] + this.w[3]) / 2) * he * Fw;
      ((this.shiftT = Math.max(0, this.shiftT - t)),
        (this._shiftCool = Math.max(0, this._shiftCool - t)),
        (this.shiftBlocked = Math.max(0, this.shiftBlocked - t)));
      let me = (Rt) => {
        let Vt = Rt > this.gear,
          Pe = (Math.max(ee, Xt) * n.gears[Rt - 1]) / Zt;
        ((this.shifted = Vt ? 1 : -1),
          (this.shiftDir = Vt ? 1 : -1),
          (this.shiftDur = this.shiftT =
            Vt
              ? n.shiftUp * sr(1.7, 1, _s(Math.abs(O) * 1.4 - 0.2, 0, 1))
              : n.shiftDown),
          (this.kickA =
            Vt && Math.abs(O) > 0.3
              ? _s(
                  (n.engineI * Math.max(0, this.rpm - Pe)) / Fw / 0.12 / Tx(Pe),
                  0,
                  n.kickMax,
                )
              : 0),
          !Vt && d > 3 && (this.blip = 1),
          (this.gear = Rt),
          (this._shiftCool = 0.45));
      };
      if (!this.reverse && this.shiftT <= 0) {
        let Rt = (Vt) => (Math.max(ee, Xt) * n.gears[Vt - 1]) / Zt;
        if (this.manual) {
          let Vt = this._shiftReq;
          ((this._shiftReq = 0),
            Vt > 0 && this.gear < n.gears.length
              ? me(this.gear + 1)
              : Vt < 0 && this.gear > 1
                ? Rt(this.gear - 1) < n.redline * 0.98
                  ? me(this.gear - 1)
                  : (this.shiftBlocked = 1.2)
                : d < 1 && this.gear > 1 && O < 0.1 && (this.gear = 1));
        } else if (this._shiftCool <= 0 && this.onGround && W < 0.5) {
          let Vt = Xt > ee * 1.2 + 400,
            Pe = n.idle + 2700 + Math.abs(O) * (n.upshift - n.idle - 2700),
            bs =
              n.idle + 1e3 + Math.max(Math.abs(O) * 1500, D * n.redline * 0.45),
            Ts = this.gear === 1 ? Math.min(Pe, n.upshift1) : Pe,
            Xe = Math.max(ee, Xt, this.rpm);
          if (d < 0.9 && this.gear > 1) this.gear = 1;
          else if (
            D < 0.1 &&
            this.gear < n.gears.length &&
            d > 3 &&
            ((!Vt && ee > Ts) ||
              (Xe > n.redline * 0.97 &&
                (this.gear === 1 || Rt(this.gear + 1) > 3e3)))
          )
            me(this.gear + 1);
          else if (
            !Vt &&
            this.gear > 1 &&
            (ee < bs || (O > 0.8 && ee < n.redline * 0.55))
          ) {
            let pn = n.redline * (D > 0.2 && O < 0.5 ? 0.55 : 0.72),
              Qs = this.gear;
            for (; Qs > 1;) {
              let Jt = Rt(Qs - 1);
              if (Jt >= n.redline * 0.82 || (Qs--, Jt >= pn)) break;
            }
            Qs !== this.gear && me(Qs);
          }
        }
      }
      let re = this.reverse ? n.reverse : n.gears[this.gear - 1],
        os = re * n.final,
        Dt = Math.abs((this.w[2] + this.w[3]) / 2) * os * Fw,
        qe = sr(n.idle, n.launchRpm, Math.abs(O)) * (Math.abs(f) < 12 ? 1 : 0),
        pe = Math.min(
          n.limiter,
          Math.max(n.idle, Dt, qe) + (this.onGround ? 0 : 2400 * I),
        ),
        we = this.shiftT > 0 ? 1 - this.shiftT / this.shiftDur : 1,
        rs = 1;
      if (this.shiftT > 0 && this.shiftDir > 0) {
        if (
          ((rs =
            we < 0.25
              ? sr(1, n.cutFloor, Pm(we / 0.25))
              : we < 0.8
                ? n.cutFloor
                : sr(n.cutFloor, 1, Pm((we - 0.8) / 0.2))),
          we > 0.2)
        ) {
          let Rt = Math.max(this.shiftT - this.shiftDur * 0.2, t);
          this.rpm = Math.max(
            pe,
            this.rpm - Math.max(n.rpmFall, (this.rpm - pe) / Rt) * t,
          );
        }
      } else
        this.shiftT > 0
          ? ((rs = sr(0.35, 1, Pm(Math.abs(we * 2 - 1)))),
            (this.rpm = Math.min(
              Math.max(this.rpm, pe),
              this.rpm + n.rpmRise * t,
            )))
          : (this.rpm += (pe - this.rpm) * _s(t * 45, 0, 1));
      ((this.rpm = _s(this.rpm, n.idle, n.limiter)),
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
        (rs *= 1 + this.kick * _s(Math.abs(O), 0, 1)),
        (this.shiftCut = 1 - Math.min(1, rs)),
        (this.blip = Math.max(0, (this.blip || 0) - t / 0.22)));
      let Le = this.rpm >= n.limiter - 30 ? 0.2 : 1,
        de =
          O *
          (n.torque ? n.torque(this.rpm) : Tx(this.rpm)) *
          os *
          n.driveEff *
          Le *
          this.espEngine *
          rs;
      (this.reverse && (de *= 1 - $.k),
        this.reverse &&
          (de =
            Math.sign(de) *
            Math.min(Math.abs(de), o * 4.5 * l) *
            (U ? (f < -4.5 ? 0 : 1) : _s((f + 12.2) / 2.8, 0, 1))),
        (this._bite =
          Math.abs(f) < 1 && Math.abs(O) < 0.1
            ? 0
            : Math.min(1, (this._bite ?? 1) + t / n.biteTime)),
        this._lock || (de *= sr(0.3, 1, Pm(this._bite))),
        Dt >= qe ? (this._lock = !0) : Dt < qe - 900 && (this._lock = !1),
        (this._lockK = _s(
          (this._lockK || 0) + (this._lock && this.shiftT <= 0 ? t : -t) / 0.12,
          0,
          1,
        )));
      let Ie = n.engineI * os * os * this._lockK;
      this.reverse || (de -= (Ie * _s(this.axB ?? this.ax, -12, 12)) / l);
      let ps = n.ev
        ? (1 - _s(Math.abs(O) / 0.12, 0, 1)) * n.regen
        : (1 - Math.abs(O)) *
          (n.engBrake[0] + (n.engBrake[1] * this.rpm) / n.redline) *
          os *
          0.5;
      this.nitroOn =
        !!e.nitro && this.nitro > 0.02 && O > 0.2 && !this.reverse && !N;
      let gt = this.nitroOn ? n.nitroForce : 0;
      this.nitroOn
        ? (this.nitro = Math.max(0, this.nitro - n.nitroUse * t))
        : (this.nitro = Math.min(
            n.nitroMax,
            this.nitro +
              t *
                (n.nitroFill +
                  this.drift * 0.12 +
                  (this.airTime > 0.3 ? 0.08 : 0)),
          ));
      let se =
          o *
          Qc *
          Math.cos(this.bPitch) *
          Math.cos(this.bRoll) *
          (this.onGround ? _s(this.load / 0.45, 0, 1) : 0),
        Nt = (se * n.b - o * this.ax * n.hcg) / a + Z * (n.downF ?? 0.45),
        xe = (se * n.a + o * this.ax * n.hcg) / a + Z * (n.downR ?? 0.55);
      ((Nt = Math.max(Nt, 0.15 * se)), (xe = Math.max(xe, 0.15 * se)));
      let ce = (o * _s(this.ay, -16, 16) * n.hcg) / n.track,
        Ge = [
          Nt / 2 - ce * 0.55,
          Nt / 2 + ce * 0.55,
          xe / 2 - ce * 0.45,
          xe / 2 + ce * 0.45,
        ];
      ((Ge[0] = Math.max(Ge[0], 0.06 * Nt)),
        (Ge[1] = Math.max(Ge[1], 0.06 * Nt)),
        (Ge[2] = Math.max(Ge[2], 0.06 * xe)),
        (Ge[3] = Math.max(Ge[3], 0.06 * xe)));
      let Fe = se / 4,
        $e = _s((d - 1) / 4, 0, 1),
        Ds = _s((d - 1) / 3, 0, 1),
        Es = Math.tan(vt),
        Ls = 0.7,
        Os = [
          Math.atan((a * Es) / (a - b * Es * Ls)),
          Math.atan((a * Es) / (a + b * Es * Ls)),
        ],
        hs = [Math.cos(Os[0]), Math.cos(Os[1])],
        Zs = [Math.sin(Os[0]), Math.sin(Os[1])],
        We = n.launchSlip * _s(1 - d / 14, 0, 1) * (this.gear === 1 ? 1 : 0),
        Is = sr(1, n.muRearDrift, this.capture ? 0 : this.drift),
        ns = [n.a, n.a, -n.b, -n.b],
        rn = [b, -b, b, -b],
        dn = 6,
        Hn = t / dn,
        Dn = 0,
        Un = 0,
        Xs = 0,
        _i = 0,
        Mt = 0,
        Kt = 0,
        bt = 0,
        wt = [0, 0, 0, 0];
      for (let Rt = 0; Rt < 4; Rt++) {
        let Vt = Rt < 2,
          Pe = f - this.r * rn[Rt],
          bs = u + this.r * ns[Rt],
          Ts = Vt ? hs[Rt] : 1,
          Xe = Vt ? Zs[Rt] : 0,
          pn = Pe * Ts + bs * Xe,
          Qs = -Pe * Xe + bs * Ts,
          Jt = Math.atan2(Qs, Math.max(Math.abs(pn), 3.5));
        wt[Rt] = Jt;
        let Ns =
            n.mu *
            nt *
            (Vt ? 1 : n.rearGrip) *
            _s(1 - 0.08 * (Ge[Rt] / Fe - 1), 0.8, 1.1) *
            Ge[Rt] *
            _,
          Sa = Vt ? (n.latMu ?? 1) : (n.latMuR ?? n.latMu ?? 1),
          kl = Ns * Sa,
          _l =
            -kl *
            (Vt ? BI(Jt, 11.5, 1.45, 0.2) : Is * BI(Jt, 15, 1.5, 0.1)) *
            Ds *
            (1 - 0.75 * $.k),
          rr = Vt ? n.wheelI : n.rearI,
          ph = n.awd ? n.frontShare : 0,
          Ue = Vt
            ? ph
              ? de * ph * 0.5 +
                _s(
                  (this.w[1 - Rt] - this.w[Rt]) * (n.lsdF ?? 10),
                  -(n.lsdFT ?? 300),
                  n.lsdFT ?? 300,
                )
              : 0
            : de * (1 - ph) * 0.5 +
              _s(
                (this.w[5 - Rt] - this.w[Rt]) * (n.lsd ?? 25),
                -(n.lsdT ?? 500),
                n.lsdT ?? 500,
              ),
          Ci = D * (Vt ? n.brakeF : n.brakeR),
          ro = !Vt && W > 0.5 ? n.handbrake : 0,
          Sf =
            (!Vt || n.ev) && !this.reverse
              ? Math.min(ps, Math.abs(f) * (n.ev ? 64 : 60)) * _
              : 0,
          Lo = this.w[Rt],
          Yr = this.absP[Rt],
          Ln = this.tcsCut[Rt],
          hn = 0,
          zl = 0,
          lr = 0,
          qp = Vt && !n.awd ? 1e9 : (n.limiter / Fw / os) * 1.02;
        if (!_) {
          let qn = (f / l) * (Vt ? 1 : 1 + 0.12 * Math.abs(O));
          ((this.w[Rt] = Lo + (qn - Lo) * _s(t * 8, 0, 1)),
            (this.absP[Rt] = 1),
            (this.tcsCut[Rt] = Ln * Math.exp(-t / 0.14)),
            (this.kappa[Rt] = 0));
          continue;
        }
        for (let qn = 0; qn < dn; qn++) {
          let Hs = Math.max(Math.abs(pn), 3);
          lr = (Lo * l - pn) / Hs;
          let Qo =
            r.tcs && ro === 0 && Ue * Lo >= 0 && Math.abs(Ue) > 1
              ? _s(
                  (lr * Math.sign(Ue) - 0.12 - 0.25 * this.drift - We) / 0.2,
                  0,
                  0.85,
                )
              : 0;
          ((Ln += (Qo - Ln) * (1 - Math.exp(-Hn / (Qo > Ln ? 0.025 : 0.14)))),
            r.tcs || (Ln = 0));
          let Ju = ((pn - Lo * l) * Math.sign(pn)) / Hs,
            l2 =
              r.abs && Ci + this.espB[Rt] > 0 && Math.abs(pn) > 2
                ? _s(1 - (Ju - 0.07) / 0.12, 0.04, 1)
                : 1;
          ((Yr += (l2 - Yr) * (1 - Math.exp(-Hn / (l2 < Yr ? 0.012 : 0.05)))),
            r.abs || (Yr = 1));
          let El =
              Ns *
              Bvt(lr) *
              (lr > 0 && (!Vt || n.awd)
                ? n.muDrive
                : lr < 0 && n.brakeMu
                  ? n.brakeMu
                  : 1),
            Zu = _l / Math.sqrt(1 + (2.2 * lr) ** 2),
            dv = Math.min(
              1,
              1 /
                Math.max(
                  1e-6,
                  Math.hypot(El / Math.max(Ns, 1), Zu / Math.max(kl, 1)),
                ),
            );
          ((El *= dv), (Zu *= dv));
          let OM = ((Ns * 16) / Hs) * l * l,
            HM = rr + Hn * OM;
          Lo += (Hn * (Ue * (1 - Ln) - El * l)) / HM;
          let ta = (Hn * ((Ci + this.espB[Rt]) * Yr + ro + Sf)) / HM;
          ((Lo = Math.abs(Lo) <= ta ? 0 : Lo - Math.sign(Lo) * ta),
            (Lo = _s(Lo, -qp, qp)),
            (pn += (El / (o / 4)) * Hn),
            (hn += El),
            (zl += Zu));
        }
        ((this.w[Rt] = Lo),
          (this.absP[Rt] = Yr),
          (this.tcsCut[Rt] = Ln),
          (this.kappa[Rt] = lr),
          Ci > 0 && Yr < 0.95 && (Kt = Math.max(Kt, 1 - Yr)),
          Math.abs(Ue) > 50 && (bt = Math.max(bt, Ln)));
        let mh = hn / dn,
          Ps = zl / dn,
          tn = mh * Ts - Ps * Xe,
          Bi = mh * Xe + Ps * Ts;
        ((Dn += tn), (Un += Bi), (Xs += ns[Rt] * Bi - rn[Rt] * tn));
        let ci = Math.hypot(mh / Math.max(Ns, 1), Ps / Math.max(kl, 1));
        Vt ? (_i = Math.max(_i, ci)) : (Mt = Math.max(Mt, ci));
      }
      ((this.aid.abs = Kt),
        (this.aid.tcs = bt),
        (this.aid.esp = Pt ? Math.max(Ct, 1 - this.espEngine) : 0),
        (Dn *= _),
        (Un *= _),
        (Xs *= _),
        D > 0 &&
          Math.abs(f) <= 0.3 &&
          d < 0.5 &&
          ((this.vel.x *= 1 - _s(t * 8, 0, 1)),
          (this.vel.z *= 1 - _s(t * 8, 0, 1)),
          (f *= 1 - _s(t * 8, 0, 1)),
          (u *= 1 - _s(t * 8, 0, 1))));
      let _t = Math.max(0, Math.max(this.kappa[2], this.kappa[3]) - 0.2);
      !r.tcs &&
        _t > 0.1 &&
        I > 0.8 &&
        q &&
        R > 25 &&
        this.gear <= 3 &&
        ((this.drift = Math.min(1, this.drift + _t * t * 3)),
        (this._intent = !0));
      let ie = Math.sign(f) || 1,
        te = 0.5 * 1.2 * n.cdA * d * d,
        Qt = n.crr * se;
      if (
        ((Dn +=
          gt * _ -
          ie *
            ((te * Math.abs(f)) / Math.max(d, 0.01) +
              (Math.abs(f) > 0.1 ? Qt : 0))),
        (Un -= (te * u) / Math.max(d, 0.01)),
        $.k > 0.01 && this.onGround)
      ) {
        Xs += n.izz * 14 * (st - this.r) * $.k;
        let Rt =
          (n.mu * nt * o * Qc * 0.3 * _s(d / 10, 0.25, 1) * $.k) /
          Math.max(d, 1);
        ((Dn -= Rt * f), (Un -= Rt * u));
      }
      if (this.onGround && d > 2) {
        let Rt = ut - this.r,
          Vt = Math.abs(ot),
          Pe = Rt * this.r > 0 ? _s((0.095 + 0.04 * lt - Vt) / 0.05, 0, 1) : 1;
        if (
          (r.steering &&
            !this.reverse &&
            !(this.impactT > 0) &&
            $.k < 0.05 &&
            (Xs +=
              n.izz *
              (1 - this.drift) *
              sr(5, 2, P) *
              Rt *
              Pe *
              $e *
              (1 -
                _s(
                  (Math.max(-this.kappa[0], -this.kappa[1]) - 0.2) / 0.4,
                  0,
                  1,
                ))),
          this.drift > 0.05)
        ) {
          let bs = Math.sign(f) || 1,
            Ts = -this.steerIn * 0.62 * bs,
            Xe = this._intent ? (Q ? 1.6 : 1) : 1.7,
            pn =
              Un / o / Math.max(d, 3) +
              this._driftRot(d, Y, f, I) +
              2.6 * Xe * (Y - Ts);
          ((Xs += n.izz * 5 * Xe * this.drift * (pn - this.r) * $e),
            (this._driftThrust =
              this.drift *
              I *
              o *
              Qc *
              0.3 *
              Math.min(1, Math.abs(Math.sin(Y)) * 2.2) *
              _s(1 - (R - this._driftKmh) / 15, 0, 1)));
        } else this._driftThrust = 0;
        (r.esp &&
          Math.abs(Y) > 1.3 &&
          W < 0.5 &&
          $.k < 0.05 &&
          (Xs += -n.izz * 2.5 * this.r),
          r.steering &&
            this.reverse &&
            f < -1 &&
            $.k < 0.05 &&
            !(this.impactT > 0) &&
            (Xs += n.izz * 3 * ((f * Math.tan(vt)) / a - this.r) * $e),
          this.impact > 0.1 &&
            !(this.impactT > 0) &&
            (Xs -= n.izz * 1.5 * this.impact * this.r));
      }
      this.onGround || (Xs = -n.izz * 0.8 * this.r);
      let ge = this.gSlope(p, m, s),
        pt = Math.sqrt(1 + ge.dx * ge.dx + ge.dz * ge.dz),
        le = (-Qc * ge.dx) / pt,
        Ut = (-Qc * ge.dz) / pt,
        zt = Dn / o,
        ft = Un / o;
      ((f += zt * t),
        (u += ft * t),
        (this.r += (Xs / n.izz) * t),
        d < 3 &&
          this.onGround &&
          $.k < 0.05 &&
          (this.r = sr(this.r, (f * Math.tan(vt)) / a, _s(1 - d / 3, 0, 1))),
        (this.psi += this.r * t));
      let kt = (((this._driftThrust || 0) / o) * t) / Math.max(d, 1),
        St =
          this.onGround &&
          d < 1.2 &&
          I < 0.05 &&
          !(this.reverse && L > 0.1) &&
          !(this.impactT > 0) &&
          this.drift < 0.1
            ? 1
            : 0;
      if (
        ((this.vel.x =
          c.x * f + h.x * u + (le * (1 - St) * t + kt * this.vel.x) * _),
        (this.vel.z =
          c.z * f + h.z * u + (Ut * (1 - St) * t + kt * this.vel.z) * _),
        St)
      ) {
        let Rt = Math.exp(-t * 6);
        ((this.vel.x *= Rt), (this.vel.z *= Rt));
      }
      if (this.onGround && this.drift > 0.05 && d > 6 && Math.abs(Y) > 0.02) {
        let Rt = this._driftRot(d, Y, f, I) * t,
          Vt = Math.cos(Rt),
          Pe = Math.sin(Rt),
          bs = this.vel.x,
          Ts = this.vel.z;
        ((this.vel.x = bs * Vt + Ts * Pe), (this.vel.z = -bs * Pe + Ts * Vt));
      }
      let Ft =
        Math.pow(_s(((this._steerHold || 0) - 0.25) / 0.7, 0, 1), 2) *
        _s((R - 25) / 35, 0, 1);
      if (
        this.onGround &&
        Ft > 0 &&
        this.drift < 0.3 &&
        d > 7 &&
        !this.reverse &&
        f > 0 &&
        $.k < 0.05
      ) {
        let Rt =
            ((Math.sign(this.steerIn) *
              n.holdTurn *
              Ft *
              Math.abs(this.steerIn)) /
              d) *
            t,
          Vt = Math.cos(Rt),
          Pe = Math.sin(Rt),
          bs = this.vel.x,
          Ts = this.vel.z,
          Xe = 1 - 0.15 * Ft * t;
        ((this.vel.x = (bs * Vt + Ts * Pe) * Xe),
          (this.vel.z = (-bs * Pe + Ts * Vt) * Xe),
          (this.psi += Rt),
          (this._holdA = (Rt / t) * d));
      } else this._holdA = 0;
      if (this.onGround && s?.heightAt) {
        let Rt = ge.dx * ge.dx + ge.dz * ge.dz;
        if (Rt > pZ * pZ) {
          let Vt = Qr(p, m);
          if (Vt !== "road" && Vt !== "walk") {
            let Pe = Math.sqrt(Rt),
              bs = ge.dx / Pe,
              Ts = ge.dz / Pe,
              Xe = this.vel.x * bs + this.vel.z * Ts;
            Xe > 0 &&
              ((this.vel.x -= bs * Xe * 1.1),
              (this.vel.z -= Ts * Xe * 1.1),
              (this.steep = (this.steep || 0) + 1));
          }
        }
      }
      ((this.pos.x += this.vel.x * t), (this.pos.z += this.vel.z * t));
      let Gt = _s(t * 10, 0, 1);
      if (
        ((this.ax += (zt - this.ax) * Gt),
        (this.ay += (ft - this.ay) * Gt),
        (this.aLat =
          (this.aLat || 0) + (ft + (this._holdA || 0) - (this.aLat || 0)) * Gt),
        (this.axB =
          (this.axB || 0) + (zt - (this.axB || 0)) * _s(t / 0.03, 0, 1)),
        (this.ayC = (this.ayC || 0) + (f * this.r - (this.ayC || 0)) * Gt),
        s?.collide)
      ) {
        let Rt = s.collide(this);
        Rt && (this.impact = Math.max(this.impact, Rt));
      }
      ((this.impact = Math.max(0, this.impact - t * 3)),
        (this.impactT = Math.max(0, this.impactT - t)),
        (this._vxPrev = this.vel.x * c.x + this.vel.z * c.z));
      {
        let Rt = this.forward(),
          Vt = { x: -Math.cos(this.psi), z: Math.sin(this.psi) },
          Pe = this._c1 || (this._c1 = [0, 0, 0, 0]);
        for (let bs = 0; bs < 4; bs++) {
          let Ts = bs < 2 ? n.a : -n.b,
            Xe = bs % 2 ? -n.track / 2 : n.track / 2;
          ((Pe[bs] = g(
            this.pos.x + Rt.x * Ts + Vt.x * Xe,
            this.pos.z + Rt.z * Ts + Vt.z * Xe,
          )),
            this.walled &&
              this._cPrev &&
              Pe[bs] > this._cPrev[bs] + NI &&
              (Pe[bs] = this._cPrev[bs]));
        }
        this._wheelPlane(Pe);
      }
      this.landing = Math.max(0, this.landing - t * 2);
      for (let Rt = 0; Rt < 4; Rt++) this.wheelSpin[Rt] += this.w[Rt] * t;
      let Bt = (Rt) => _s(Rt, 0, 1),
        Se = this.onGround ? 1 : 0;
      for (let Rt = 0; Rt < 4; Rt++) {
        let Vt = Math.abs(this.kappa[Rt]),
          Pe =
            Bt((Math.abs(wt[Rt]) - (Rt < 2 ? 0.12 : 0.1)) * 4) * $e +
            (Rt > 1 && this.kappa[Rt] > 0
              ? Bt((Vt - 0.1) * 3)
              : Bt((Vt - 0.15) * 2.5)) *
              Bt(d / 3) +
            (Rt > 1 ? this.drift * Bt(d / 10) * 0.8 : 0);
        this.slip[Rt] = _s(Pe, 0, 1) * Se;
      }
      ((this.gripUse = [_i, Mt]),
        (this.shifted = this.shifted
          ? this.shifted > 0
            ? Math.max(0, this.shifted - t * 4)
            : Math.min(0, this.shifted + t * 4)
          : 0));
    }
    _suspend(t, e, s, n, o = e) {
      let a = this.S,
        r = a.mass,
        l = a.a + a.b,
        c = (2 * Math.PI * a.rideHz) ** 2,
        h = [
          a.rideHzF === void 0 ? c : (2 * Math.PI * a.rideHzF) ** 2,
          a.rideHzR === void 0 ? c : (2 * Math.PI * a.rideHzR) ** 2,
        ],
        f = Math.hypot(this.vel.x, this.vel.z) * 3.6,
        u = sr(
          a.gStick,
          a.gVert,
          Pm((f - a.stickKmh[0]) / (a.stickKmh[1] - a.stickKmh[0])),
        ),
        d = Qc * u,
        p = Qc * Math.max(a.gAir, u);
      if (!this._cPrev) {
        let R = (e[0] + e[1]) / 2,
          T = (e[2] + e[3]) / 2;
        ((this.bodyY = (R * a.b + T * a.a) / l),
          (this.bPitch = Math.atan2(R - T, l)),
          (this.bRoll = Math.atan2((e[0] + e[2] - e[1] - e[3]) / 2, a.track)),
          (this.bodyVy = this.bPitchV = this.bRollV = 0),
          (this.onGround = !0),
          (this.load = 1));
      }
      let m = this._cPrev || e,
        g = Math.max(1, Math.ceil(t * 240 - 1e-6)),
        b = t / g,
        x = !this.onGround,
        v = 0,
        y = 0,
        M = 0,
        S = [0, 0, 0, 0],
        w = [0, 0, 0, 0],
        z = [0, 0, 0, 0];
      for (let R = 0; R < g; R++) {
        let T = (R + 1) / g,
          E = 0,
          A = 0,
          C = 0;
        v = 0;
        let P = Math.tan(this.bPitch),
          I = Math.tan(this.bRoll);
        for (let B = 0; B < 4; B++) {
          let H = (r * (B < 2 ? a.b : a.a)) / l / 2,
            O = H * h[B < 2 ? 0 : 1],
            D = 2 * a.rideZeta * Math.sqrt(O * H),
            U = m[B] + (e[B] - m[B]) * T,
            G = (e[B] - m[B]) / t,
            q = this.bodyY + s[B] * P + n[B] * I,
            W = this.bodyVy + s[B] * this.bPitchV + n[B] * this.bRollV,
            V = U - q;
          if (((w[B] = V), V < -a.droop)) {
            ((S[B] = 0), (z[B] = 0));
            continue;
          }
          let Y = Math.min(V, a.bumpMax + 0.04),
            $ =
              _s(G - W, -a.damperV, a.damperV) +
              0.25 * _s(G - W - _s(G - W, -a.damperV, a.damperV), -4, 4),
            st = H * d + O * Y + D * $;
          (Y > a.bump && (st += O * 6 * (Y - a.bump)),
            (S[B] = Math.max(0, st)),
            (z[B] = S[B] > 0 ? 1 : 0),
            (v += z[B]),
            z[B] && x && R === 0 && (M = Math.max(M, G - W)));
        }
        for (let [B, H] of [
          [0, 1],
          [2, 3],
        ])
          if (z[B] && z[H]) {
            let O = (r * (B < 2 ? a.b : a.a)) / l / 2,
              D =
                (B < 2 ? (a.arbF ?? a.arb) : (a.arbR ?? a.arb)) *
                O *
                h[B < 2 ? 0 : 1] *
                (w[B] - w[H]);
            ((S[B] = Math.max(0, S[B] + D)), (S[H] = Math.max(0, S[H] - D)));
          }
        for (let B = 0; B < 4; B++)
          ((E += S[B]), (A += S[B] * s[B]), (C += S[B] * n[B]));
        (v
          ? ((A += r * (this.axB ?? this.ax) * a.hcg * a.leanPitch),
            (C += r * _s(this.ayC || 0, -20, 20) * a.hcg * a.lean))
          : ((this.bPitchV *= Math.exp(-b * 1.5)),
            (this.bRollV *= Math.exp(-b * 3))),
          (this.bodyVy += (E / r - (v ? d : p)) * b),
          (this.bodyY += this.bodyVy * b),
          (this.bPitchV += (A / a.ipitch) * b),
          (this.bPitch += this.bPitchV * b),
          (this.bRollV += (C / a.iroll) * b),
          (this.bRoll += this.bRollV * b),
          (y = E));
        let L = 0,
          F = Math.tan(this.bPitch),
          N = Math.tan(this.bRoll);
        for (let B = 0; B < 4; B++) {
          let H = m[B] + (e[B] - m[B]) * T;
          L = Math.max(L, H - a.bumpMax - (this.bodyY + s[B] * F + n[B] * N));
        }
        if (L > 0) {
          this.bodyY += L;
          let B = _s(
            (e[0] + e[1] + e[2] + e[3] - m[0] - m[1] - m[2] - m[3]) / 4 / t,
            -3,
            3,
          );
          this.bodyVy < B &&
            ((M = Math.max(M, B - this.bodyVy)), (this.bodyVy = B));
        }
      }
      if (this._cPrev) {
        let R = [0, 1, 2, 3]
          .map((E) => (e[E] - m[E]) / t)
          .sort((E, A) => E - A);
        this._rise = Math.max(R[1], (this._rise ?? 0) - 12 * t);
        let T =
          this.impactT > 0 || this.impact > 0.01
            ? Math.min(Math.max(0, this._rise), 1) + 1.5
            : Math.max(0, this._rise) + 2;
        v && this.bodyVy > T && (this.bodyVy = T);
      }
      ((this._cPrev = e.slice()),
        (this.bPitch = _s(this.bPitch, -0.6, 0.6)),
        (this.bRoll = _s(this.bRoll, -0.5, 0.5)),
        (this.onGround = v > 0));
      for (let R = 0; R < 4; R++) ((this.wc[R] = z[R]), (this.susp[R] = w[R]));
      let _ = y / (r * d);
      ((this.load += (_ - this.load) * _s(t / 0.05, 0, 1)),
        this.onGround
          ? (x &&
              this.airTime > 0.05 &&
              (this.landing = Math.max(this.landing, _s((M - 1) / 5, 0, 1))),
            (this.air = 0),
            (this.airTime = 0))
          : ((this.air += t), (this.airTime += t), (this.load = 0)),
        (this.vel.y = this.bodyVy),
        this._wheelPlane(o));
    }
    _wheelPlane(t) {
      let e = this.S,
        s = e.a + e.b,
        n = [e.a, e.a, -e.b, -e.b],
        o = e.track / 2,
        a = [o, -o, o, -o],
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
            ? _s(t, 0, 1)
            : 1,
        o = n === 1 || !e ? this : e,
        a = (r) => o[r] + (this[r] - o[r]) * n;
      ((s.pos.x = o.pos.x + (this.pos.x - o.pos.x) * n),
        (s.pos.y = o.pos.y + (this.pos.y - o.pos.y) * n),
        (s.pos.z = o.pos.z + (this.pos.z - o.pos.z) * n),
        (s.psi =
          o.psi +
          Math.atan2(Math.sin(this.psi - o.psi), Math.cos(this.psi - o.psi)) *
            n),
        (s.pitch = a("pitch")),
        (s.roll = a("roll")),
        (s.heave = a("heave")),
        (s.bodyPitch = a("bodyPitch")),
        (s.bodyRoll = a("bodyRoll")),
        (s.bodyY = a("bodyY")),
        (s.steer = a("steer")));
      for (let r = 0; r < 4; r++)
        s.wheelSpin[r] =
          o.wheelSpin[r] + (this.wheelSpin[r] - o.wheelSpin[r]) * n;
      return ((s.wheelDy = this.wheelDy), s);
    }
    _driftRot(t, e, s, n) {
      if (!this.onGround || this.drift <= 0.05 || t <= 6 || Math.abs(e) <= 0.02)
        return 0;
      let o =
        Qc *
        this.drift *
        (0.6 +
          2.6 * Math.abs(this.steerIn) +
          1.2 * _s(1 - Math.abs(this.steerIn) / 0.25, 0, 1)) *
        (0.7 + 0.3 * n);
      return (
        -Math.sign(e) * Math.sign(s) * Math.min(o / t, Math.abs(e) * 10 + 0.35)
      );
    }
    gSlope(t, e, s) {
      return ((s?.heightAt || eo)(t, e, this._g), this._g);
    }
  };
