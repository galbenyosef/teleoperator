// app 354 — math
// Lines 173185-173513 of readable/app.pretty.js (statement-aligned).
as();
En();
var FF = [
    { name: "Chase", dist: 5.6, h: 2.25, look: 1.15, ahead: 4.5, fov: 58 },
    { name: "Far chase", dist: 8.8, h: 3.4, look: 1.5, ahead: 5.5, fov: 60 },
    { name: "Hood", inside: [0, 1.08, -0.35], fov: 68 },
    { name: "Bumper", inside: [0, 0.52, -2.3], fov: 72 },
  ],
  oc = class {
    constructor(t = 0) {
      ((this.x = t), (this.v = 0));
    }
    reset(t) {
      return ((this.x = t), (this.v = 0), t);
    }
    step(t, e, s, n = 0) {
      let o = 2 / Math.max(e, 0.001),
        a = o * s,
        r = 1 / (1 + a + 0.48 * a * a + 0.235 * a * a * a),
        l = this.x - t,
        c = (this.v - n + o * l) * s;
      return (
        (this.v = n + (this.v - n - o * c) * r),
        (this.x = t + (l + c) * r),
        this.x
      );
    }
  },
  Att = (i) => Math.atan2(Math.sin(i), Math.cos(i)),
  lh = {
    yT: 0.15,
    vyT: 0.15,
    gradeT: 0.4,
    yawT: 0.11,
    yawTlow: 0.045,
    swing: 0.45,
    pullT: 0.05,
    hitYaw: 3,
    kick: 0.13,
    kickHz: 3,
  },
  hM = (i, t, e) => (i < t ? t : i > e ? e : i),
  qz = class {
    constructor(t, e) {
      ((this.cam = t),
        (this.world = e),
        (this.mode = 0),
        (this.yaw = new oc()),
        (this.y = new oc()),
        (this.grade = new oc()),
        (this.dist = new oc()),
        (this.lift = new oc()),
        (this.fovS = new oc(60)),
        (this.lean = new oc()),
        (this.nitroK = new oc()),
        (this.surge = new oc()),
        (this.punch = new oc()),
        (this.fovAdd = 0),
        (this.fov = 60),
        (this.shake = 0),
        (this.t = 0),
        (this.init = !1),
        (this.back = 0),
        (this._p = new xt()),
        (this._l = new xt()));
    }
    get modeName() {
      return FF[this.mode].name;
    }
    M() {
      let t = FF[this.mode],
        e = this.scale;
      return e
        ? this._ms?.[this.mode] ||
            ((this._ms ||= [])[this.mode] = t.inside
              ? { ...t, inside: e.inside?.[t.name] || t.inside }
              : {
                  ...t,
                  dist: t.dist * e.dist,
                  h: t.h * e.h,
                  look: t.look * e.look,
                })
        : t;
    }
    setScale(t) {
      ((this.scale = t), (this._ms = null), (this.init = !1));
    }
    next() {
      ((this.mode = (this.mode + 1) % FF.length), (this.init = !1));
    }
    update(t, e, s, n) {
      let o = this.M();
      this.t += t;
      let a = hM((1.1 - (this.cam.aspect || 1.7)) / 0.6, 0, 1),
        r =
          a > 0
            ? o.inside
              ? { ...o, fov: o.fov + 22 * a }
              : {
                  ...o,
                  dist: o.dist * (1 + 0.45 * a),
                  h: o.h * (1 + 0.35 * a),
                  look: o.look + 1.4 * a,
                  ahead: o.ahead + 4 * a,
                  fov: o.fov + 18 * a,
                }
            : o;
      if (!(t > 0)) return;
      let l = e.rp || e,
        c = l.bodyY ?? l.pos.y + (l.heave || 0),
        h = e.speed,
        f = h * 3.6;
      ((this.back += ((n?.lookBack ? 1 : 0) - this.back) * Math.min(1, t * 12)),
        this.nitroK.step(e.nitroOn ? 1 : 0, 0.35, t));
      let u = e.impact || 0,
        d = u > (this._imp ?? 0) + 0.04 ? u : 0;
      if (
        ((this._imp = u),
        !(d > 0.06 && this.kick && this.kick.t < 0.8 && d < this.kick.s + 0.25))
      ) {
        if (d > 0.06) {
          let M = e.impactN;
          this.kick = {
            t: 0,
            s: Math.min(
              1,
              Math.max(d, this.kick && this.kick.t < 0.15 ? this.kick.s : 0),
            ),
            nx: M ? M.x : 0,
            nz: M ? M.z : 0,
          };
        }
      }
      let p = 0,
        m = 0,
        g = 0;
      if (this.kick) {
        let M = this.kick;
        M.t += t;
        let S = Math.exp(-M.t / 0.14),
          w = Math.sin(2 * Math.PI * lh.kickHz * M.t) * S * M.s;
        ((p = M.nx * lh.kick * w),
          (g = M.nz * lh.kick * w),
          (m =
            -0.045 *
            M.s *
            Math.sin(2 * Math.PI * 3 * Math.min(M.t, 1 / 6)) *
            Math.exp(-M.t / 0.2)),
          M.t > 1 && (this.kick = null));
      }
      ((this.hitW =
        (this.hitW ?? 0) +
        ((e.impactT > 0 ? 1 : 0) - (this.hitW ?? 0)) *
          Math.min(1, t / (e.impactT > 0 ? 0.03 : 0.35))),
        (this.shake = Math.max(
          this.shake * Math.exp(-t * 9),
          (e.landing || 0) * 0.8,
        )),
        (this.absJ =
          (this.absJ ?? 0) +
          ((e.aid && e.brake > 0.3 && h > 2
            ? Math.min(1, e.aid.abs * 1.5)
            : 0) -
            (this.absJ ?? 0)) *
            Math.min(1, t / 0.08)));
      let b =
          this.shake * 0.02 +
          Math.max(0, Math.min(1, (f - 150) / 170)) *
            0.006 *
            (r.inside ? 0.5 : 1),
        x = (Math.sin(this.t * 23) + 0.6 * Math.sin(this.t * 31 + 1.3)) * b + 0,
        v =
          (Math.sin(this.t * 19 + 0.7) + 0.6 * Math.sin(this.t * 29)) * b +
          m +
          Math.sin(this.t * 2 * Math.PI * 9) * 0.004 * this.absJ;
      if (r.inside) {
        if (!s) return;
        s.root.updateMatrixWorld(!0);
        let M = this._p.set(r.inside[0], r.inside[1], r.inside[2]);
        s.body.localToWorld(M);
        let S = new xt(0, 0, -1).applyQuaternion(
          s.body.getWorldQuaternion(new wn()),
        );
        (this.back > 0.5 && S.negate(),
          this.cam.position.copy(M),
          this.cam.up.set(0, 1, 0),
          this.cam.lookAt(M.clone().add(S)),
          (this.cam.position.x += x * 0.3 + p * 0.3),
          (this.cam.position.y += v * 0.3),
          (this.cam.position.z += g * 0.3),
          (this.fov = this.fovS.step(
            r.fov + this.fovAdd + Math.min(14, f / 22) + this.nitroK.x * 6,
            0.35,
            t,
          )));
      } else {
        let M = h > 3 ? Math.atan2(-e.vel.x, -e.vel.z) : l.psi,
          S =
            l.psi +
            (e.reverse
              ? 0
              : Att(M - l.psi) *
                (lh.swing + 0.2 * (e.drift || 0)) *
                Math.min(1, h / 8));
        (this.init ||
          (this.yaw.reset(S),
          this.y.reset(c),
          this.grade.reset(e.pitch || 0),
          this.dist.reset(r.dist),
          this.lift.reset(0),
          this.fovS.reset(r.fov),
          this.lean.reset(0),
          this.surge.reset(0),
          this.punch.reset(0)),
          (this.yaw.x = S + Att(this.yaw.x - S)));
        let w =
          this.yaw.step(
            S,
            (lh.yawT + lh.yawTlow * (1 - Math.min(1, f / 120))) *
              (1 + lh.hitYaw * this.hitW),
            t,
          ) +
          this.back * Math.PI;
        this._vy =
          (this._vy ?? 0) +
          (hM(e.bodyVy ?? e.vel.y ?? 0, -12, 12) - (this._vy ?? 0)) *
            Math.min(1, t / lh.vyT);
        let z = this.y.step(c, e.onGround === !1 ? 0.2 : lh.yT, t, this._vy),
          _ =
            this.grade.step(
              hM(l.pitch || 0, -0.35, 0.35) * 0.85,
              lh.gradeT,
              t,
            ) *
            (1 - 2 * this.back),
          R = -Math.sin(w),
          T = -Math.cos(w),
          E = Math.cos(_),
          A = Math.sin(_),
          C = this.surge.step(hM(e.axB ?? e.ax ?? 0, -14, 12), 0.12, t),
          P =
            r.dist +
            Math.min(0.6, f / 450) +
            this.nitroK.x * 0.6 -
            (e.drift || 0) * 0.3,
          I = this.clear(l.pos.x, z + 1.4, l.pos.z, -R * E, -A, -T * E, P, z),
          L = this.dist.step(
            Math.min(P, I),
            I < this.dist.x ? lh.pullT : 0.45,
            t,
          ),
          F = Math.max(0, P - L) / P;
        L = Math.max(1.6, Math.min(L + C * 0.028, I));
        let N = r.h + F * 0.8,
          B = l.pos.x - R * E * L,
          H = l.pos.z - T * E * L,
          O = z - A * L + N * E,
          D = eo(B, H, null, c + 1.5) + 1.1,
          U = this.lift.step(
            Math.max(0, D - O),
            D - O > this.lift.x ? 0.06 : 0.4,
            t,
          );
        ((O += U), this.cam.position.set(B + x * T + p, O + v, H - x * R + g));
        let G = r.ahead * (1 - 2 * this.back);
        (this._l.set(
          l.pos.x + R * E * G,
          z + r.look + A * G + U * 0.35,
          l.pos.z + T * E * G,
        ),
          this.cam.up.set(0, 1, 0),
          this.cam.lookAt(this._l));
        let q = this.lean.step(
          hM((e.ayC || 0) * 0.0032, -0.042, 0.042) * (1 - this.back),
          0.42,
          t,
        );
        this.cam.rotateZ(-q);
        let W = this.punch.step((e.kick || 0) * 7, 0.05, t);
        this.fov =
          this.fovS.step(
            r.fov +
              this.fovAdd +
              Math.min(14, Math.max(0, f - 30) / 16) +
              this.nitroK.x * 7,
            0.25,
            t,
          ) + W;
      }
      this.init = !0;
      let y = r.inside ? 0.1 : 0.3;
      (Math.abs(this.cam.fov - this.fov) > 0.01 || this.cam.near !== y) &&
        ((this.cam.fov = this.fov),
        (this.cam.near = y),
        this.cam.updateProjectionMatrix());
    }
    clear(t, e, s, n, o, a, r, l) {
      let c = this.world?.near
          ? this.world.near(t + n * r * 0.5, s + a * r * 0.5, r * 0.5 + 1)
          : [],
        h = r + 0.5;
      for (let f of c)
        if (!(
          f.dead ||
          f.traffic ||
          !(
            f.t === "poly" ||
            f.t === "box" ||
            (f.t === "obb" && (Math.max(f.hx, f.hz) > 3 || f.pier || f.footing))
          )
        ))
          for (let d = 0.8; d < h; d += 0.25) {
            let p = t + n * d,
              m = e + o * d,
              g = s + a * d;
            if (
              !(
                f.y1 !== void 0 &&
                (m > f.y1 + 0.3 || m + 0.5 < f.y0 || l > f.y1 + 0.3)
              ) &&
              ryt(f, p, g, 0.35)
            ) {
              h = d;
              break;
            }
          }
      return Math.max(1.6, h - 0.6);
    }
  };
