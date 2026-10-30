// app 318 — math
// Lines 152087-152744 of readable/app.pretty.js (statement-aligned).
var zO = 1500,
  _O = 0.45,
  Hwt = { x: 1, z: 0 },
  Dwt = { x: 0, z: 1 },
  Uwt = [1.08, 0.94, 0.76],
  EO = 0.3,
  TO = 1.1,
  Gwt = 0.7,
  Vwt = 5,
  Wwt = 0.5,
  BM = 0.28,
  jtt = 0.45,
  kc = new dt(),
  C0 = new dt(),
  uOt = new dt(),
  Z_ = new dt(),
  $tt = new dt(),
  Q_ = new dt(),
  ll = new dt(),
  tE = class {
    constructor({
      world: t,
      ground: e,
      fx: s = null,
      debris: n = () => null,
      audio: i = () => null,
      clear: a = null,
      onReset: r = null,
      onHand: l = null,
      blockers: c = null,
    } = {}) {
      if (
        (Object.assign(this, {
          world: t,
          ground: e,
          fx: s,
          debris: n,
          audio: i,
          clear: a,
          onReset: r,
          onHand: l,
          blockers: c,
        }),
        (this.on = !1),
        (this.off = !1),
        (this.n = 0),
        (this.lastT = -1e9),
        (this.B = new y2()),
        (this.cam = {
          pos: new dt(),
          look: new dt(),
          fov: 50,
          roll: 0,
          shot: -1,
          orbit: null,
          bt: 0,
        }),
        !(typeof document > "u"))
      ) {
        ((this.glassCv = document.createElement("canvas")),
          (this.glassCv.style.cssText =
            "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:6"),
          (this.black = document.createElement("div")),
          (this.black.style.cssText =
            "position:fixed;inset:0;background:#000;pointer-events:none;z-index:7;opacity:0"),
          (this.flash = document.createElement("div")),
          (this.flash.style.cssText =
            "position:fixed;inset:0;background:#fff;pointer-events:none;z-index:6;opacity:0;mix-blend-mode:screen"));
        for (let h of [this.glassCv, this.black, this.flash])
          h.className = "wreckfx";
        document.body.append(this.glassCv, this.black, this.flash);
      }
    }
    start(t, e, s) {
      if (this.on || this.off) return !1;
      ((this.on = !0),
        (this.reset = !1),
        (this.shake = 0),
        (this.slowT = 0),
        (this.blend = null),
        (this.lastT = performance.now()),
        this.n++,
        (this.t = 0),
        (this.rt = 0),
        (this.fadeT = -1),
        (this.events = 0),
        (this.cool = 0),
        (this.bursts = 0),
        (this.k = Math.min(1, (s.v - 15) / 20)),
        (this.v = t),
        (this.car = e),
        (t.wreckBody = this),
        document.body.classList.add("wrecking"));
      let n = e.dims || {};
      if (!e._wbox) {
        let u = new xi().setFromObject(e.body);
        e._wbox = Math.max(1.1, Math.min(2.1, u.max.y - u.min.y));
      }
      let i = (this.B = new y2({
        hx: (n.w || 1.95) / 2,
        hz: Math.max(1.9, (n.l || 4.6) / 2),
        h: e._wbox,
        y0: 0.55,
        cz: n.cz || 0,
        mass: zO,
        wb: n.wheels?.length
          ? Math.max(...n.wheels.map((u) => Math.abs(u[1] - (n.cz || 0))))
          : null,
        tw: n.wheels?.length
          ? Math.max(...n.wheels.map((u) => Math.abs(u[0])))
          : null,
      }));
      (e.root.updateMatrixWorld(!0),
        i.q.copy(e.root.quaternion),
        i.p.set(0, i.y0, 0).applyQuaternion(i.q).add(e.root.position));
      let a = Math.hypot(t.vel.x, t.vel.z),
        r = this.k;
      ((this.v0 = { x: t.vel.x, z: t.vel.z, s: Math.max(a, s.v), psi: t.psi }),
        i.v.set(t.vel.x, 0, t.vel.z),
        i.w.set(0, t.r || 0, 0),
        s.pre &&
          s.J &&
          (i.v.set(s.pre.vx, t.bodyVy || 0, s.pre.vz),
          i.w.set(0, s.pre.r, 0),
          C0.set(0, _O - i.y0, 0).applyQuaternion(i.q),
          (C0.x = s.x - i.p.x),
          (C0.z = s.z - i.p.z),
          i.hitAt(C0, $tt.set(s.J.x, 0, s.J.z))));
      let l = Math.hypot(i.v.x, i.v.z) || 1,
        c = i.v.x / l,
        h = i.v.z / l,
        f = this.ground(s.x, s.z, i.p.y) + 0.5;
      (this.flashOn(0.6),
        this.debris()?.burst(s.x, f, s.z, 1, t.vel.x, t.vel.z),
        this.debris()?.burst(
          s.x,
          f + 0.3,
          s.z,
          0.8,
          t.vel.x * 0.5,
          t.vel.z * 0.5,
        ),
        this.sparks(s.x, f - 0.2, s.z, 70, t.vel.x * 0.4, t.vel.z * 0.4),
        this.dust(s.x, f - 0.4, s.z, 26, 1.4),
        this.audio()?.collision("heavy", Math.max(14, s.v), 0, 1.3),
        this.audio()?.collision("body", s.v * 0.8, 0, 0.9),
        this.audio()?.duckMusic?.(0.7),
        (this.hit = {
          x: s.x,
          z: s.z,
          f: { x: c, z: h },
          side: Math.random() < 0.5 ? 1 : -1,
        }),
        (this.cam.shot = -1),
        this.shot(0));
      {
        let u = this.cam.pos,
          d = i.p.y + 0.4;
        ((this.glassN =
          this.debris()?.spray(
            i.p.x,
            d,
            i.p.z,
            u.x - i.p.x,
            u.y - d + 0.3,
            u.z - i.p.z,
            60,
            Math.max(9, i.p.distanceTo(u) * 2.6),
          ) || 0),
          this.debris()?.spray(i.p.x, d, i.p.z, i.v.x, 1, i.v.z, 30, 6));
      }
      return !0;
    }
    asCar() {
      let t = this.B,
        e =
          this._asCar ||
          (this._asCar = { pos: new dt(), vel: t.v, psi: 0, r: 0 });
      return (
        ll.set(0, 0, -1).applyQuaternion(t.q),
        e.pos.copy(t.p),
        (e.vel = t.v),
        (e.psi = Math.atan2(-ll.x, -ll.z)),
        (e.r = t.w.y),
        e
      );
    }
    get x() {
      return this.B.p;
    }
    get vel() {
      return this.B.v;
    }
    get q() {
      return this.B.q;
    }
    scale(t) {
      if (!this.on) return 1;
      if (((this.rt += t), this.rt < 0.06)) return 0.03;
      if (this.rt < TO) return EO;
      let e = Math.min(1, (this.rt - TO) / Gwt);
      return EO + (1 - EO) * e * e;
    }
    update(t, e) {
      if (!this.on) return;
      if (this.fadeT >= 0) {
        this.fadeT += e;
        let n =
          this.fadeT < BM
            ? this.fadeT / BM
            : Math.max(0, 1 - (this.fadeT - BM - 0.12) / jtt);
        ((this.black.style.opacity = n.toFixed(3)),
          this.fadeT >= BM &&
            !this.reset &&
            ((this.reset = !0),
            (this.shards = []),
            this.drawGlass(),
            this.onReset?.(this)),
          this.fadeT >= BM + 0.12 + jtt &&
            ((this.on = !1),
            document.body.classList.remove("wrecking"),
            (this.black.style.opacity = "0")));
        return;
      }
      ((this.t += t), (this.cool -= t));
      let s = this.B;
      if (
        (s.step(
          t,
          this.ground,
          (n, i, a, r, l, c) => this.contact(n, i, a, r, l, c),
          (n) => this.walls(n),
        ),
        s.onGround &&
          s.v.length() > 3 &&
          Math.random() < t * 30 &&
          this.dust(s.p.x, this.ground(s.p.x, s.p.z, s.p.y), s.p.z, 2, 0.8),
        (this.slowT =
          s.onGround && s.v.length() < 2 && s.w.length() < 1.2
            ? (this.slowT || 0) + t
            : 0),
        this.t > 0.35 &&
          s.onGround &&
          s.upY() > 0.94 &&
          Math.hypot(s.w.x, s.w.z) < 1.2 &&
          s.p.y - this.ground(s.p.x, s.p.z, s.p.y) < s.y0 + 0.12)
      ) {
        this.handover();
        return;
      }
      ((s.still > Wwt || this.slowT > 0.5 || this.t > Vwt) &&
        ((this.fadeT = 0), (this.reset = !1)),
        this.cam.shot === 0 && this.rt > TO + 0.6 && this.shot(1));
    }
    handover() {
      let t = this.B,
        e = this.v;
      (ll.set(0, 0, -1).applyQuaternion(t.q),
        C0.set(0, -t.y0, 0).applyQuaternion(t.q).add(t.p),
        e.place(C0.x, C0.z, Math.atan2(-ll.x, -ll.z), C0.y),
        (e.vel.x = t.v.x),
        (e.vel.z = t.v.z),
        (e.r = t.w.y),
        (this.on = !1),
        (this.handed = (this.handed || 0) + 1),
        document.body.classList.remove("wrecking"),
        this.lastCam &&
          (this.blend = {
            t: 0,
            pos: this.lastCam.pos.clone(),
            q: this.lastCam.q.clone(),
            fov: this.lastCam.fov,
          }),
        this.onHand?.(this));
    }
    walls(t) {
      let e = this.world;
      if (!e?.near) return null;
      (ll.set(0, 0, -1).applyQuaternion(t.q),
        (ll.y = 0),
        ll.lengthSq() < 0.04 &&
          (ll.set(1, 0, 0).applyQuaternion(t.q), (ll.y = 0)),
        ll.normalize());
      let s = { x: -ll.x, z: -ll.z },
        n = { x: -s.z, z: s.x },
        i = this._wc || (this._wc = []);
      i.length = 0;
      let a = e.near(t.p.x, t.p.z, 4);
      for (let r of e.dynamic || [])
        Math.abs(r.x - t.p.x) < 8 && Math.abs(r.z - t.p.z) < 8 && a.add(r);
      for (let r of a) {
        if (
          r.dead ||
          r.prop ||
          r.mp ||
          r.traffic?.net ||
          (r.y1 !== void 0 && (t.p.y - 0.5 > r.y1 || t.p.y + 0.8 < r.y0))
        )
          continue;
        let l = e.test(r, t.p.x, t.p.z, n, s, t.hx * 0.95, t.hz * 0.95);
        if (!l || !(l.d > 0)) continue;
        if (r.traffic && !r.traffic.line) {
          this.carHit(r, l, t);
          continue;
        }
        ((t.p.x += l.n.x * l.d), (t.p.z += l.n.z * l.d));
        let c = this._wq || (this._wq = []),
          h = c[i.length] || (c[i.length] = { r: new dt(), n: new dt() });
        (i.push(h),
          h.r.set(0, _O - t.y0, 0).applyQuaternion(t.q),
          (h.r.x = l.px - t.p.x),
          (h.r.z = l.pz - t.p.z),
          h.n.set(l.n.x, 0, l.n.z),
          (h.e = 0.15),
          (h.mu = 0.45),
          t.velAt(kc, h.r));
        let f = kc.dot(h.n);
        -f > 2 &&
          this.contact(l.px, t.p.y - 0.1, l.pz, -f, -1, Math.hypot(kc.x, kc.z));
      }
      return i;
    }
    carHit(t, e, s) {
      let n = t.traffic,
        i = vc(n.kind),
        a = i / (zO + i),
        r = e.n;
      ((s.p.x += r.x * e.d * a),
        (s.p.z += r.z * e.d * a),
        (n.x -= r.x * e.d * (1 - a)),
        (n.z -= r.z * e.d * (1 - a)),
        (t.x = n.x),
        (t.z = n.z),
        C0.set(0, _O - s.y0, 0).applyQuaternion(s.q),
        (C0.x = e.px - s.p.x),
        (C0.z = e.pz - s.p.z),
        s.velAt(kc, C0));
      let l = n.wreck,
        c = l ? l.vx : -Math.sin(n.heading) * n.v,
        h = l ? l.vz : -Math.cos(n.heading) * n.v,
        f = (kc.x - c) * r.x + (kc.z - h) * r.z;
      if (f >= 0) return;
      let u = (-1.15 * f) / (1 / zO + 1 / i);
      (s.hitAt(C0, $tt.set(r.x * u, 0, r.z * u)),
        this.world.onShove?.(n, u * r.x, u * r.z, e.px, e.pz),
        -f > 2 &&
          this.contact(
            e.px,
            s.p.y - 0.1,
            e.pz,
            -f,
            -1,
            Math.hypot(kc.x, kc.z),
          ));
    }
    contact(t, e, s, n, i, a) {
      let r = this.B;
      (this.sparks(
        t,
        e + 0.05,
        s,
        Math.min(40, 6 + n * 5),
        r.v.x * 0.5,
        r.v.z * 0.5,
      ),
        this.dust(t, e, s, Math.min(12, 2 + n * 1.5), 1),
        this.cool <= 0 &&
          ((this.cool = 0.09),
          this.audio()?.collision(
            n > 4.5 ? "heavy" : "ground",
            4 + n * 2.5,
            0,
            Math.min(1.2, 0.4 + n * 0.12),
          ),
          this.events++),
        n > 3 &&
          this.bursts < 5 &&
          (this.bursts++,
          this.debris()?.burst(
            t,
            e + 0.2,
            s,
            Math.min(1, n / 8),
            r.v.x,
            r.v.z,
          )),
        (this.shake = Math.max(this.shake || 0, Math.min(0.3, n * 0.035))),
        this.onGround?.(t, e, s, n));
    }
    sparks(t, e, s, n, i, a) {
      let r = this.fx?.sp;
      if (r)
        for (let l = 0; l < n; l++)
          r.push({
            x: t,
            y: e,
            z: s,
            vx: i + (Math.random() - 0.5) * 8,
            vy: 0.8 + Math.random() * 4,
            vz: a + (Math.random() - 0.5) * 8,
            age: 0,
            life: 0.3 + Math.random() * 0.5,
          });
    }
    dust(t, e, s, n, i = 1) {
      let a = this.fx?.p;
      if (!a) return;
      let r = this.B;
      for (let l = 0; l < n; l++)
        a.push({
          x: t + (Math.random() - 0.5) * 1.6 * i,
          y: e + 0.15 + Math.random() * 0.5,
          z: s + (Math.random() - 0.5) * 1.6 * i,
          vx: r.v.x * 0.35 + (Math.random() - 0.5) * 3 * i,
          vy: 0.3 + Math.random() * 1.4,
          vz: r.v.z * 0.35 + (Math.random() - 0.5) * 3 * i,
          age: 0,
          life: 2.5 + Math.random() * 3,
          a: 0.3 + Math.random() * 0.2,
          c: Uwt,
        });
    }
    flashOn(t) {
      let e = this.flash;
      e &&
        ((e.style.transition = "none"),
        (e.style.opacity = String(t)),
        requestAnimationFrame(() => {
          ((e.style.transition = "opacity 0.4s ease-out"),
            (e.style.opacity = "0"));
        }));
    }
    glass(t) {
      let e = this.glassCv;
      if (!e) return;
      ((e.width = innerWidth * Math.min(1.5, devicePixelRatio || 1)),
        (e.height = innerHeight * Math.min(1.5, devicePixelRatio || 1)));
      let s = e.width,
        n = e.height,
        i = Math.min(s, n),
        a = s * (0.5 + (Math.random() - 0.5) * 0.3),
        r = n * (0.48 + (Math.random() - 0.5) * 0.2);
      this.shards = [];
      for (let l = 0, c = Math.round(46 * t); l < c; l++) {
        let h = Math.random() * Math.PI * 2,
          f = i * (0.25 + Math.random() * 1.1),
          u = 3 + ((Math.random() * 3) | 0),
          d = [];
        for (let p = 0; p < u; p++) {
          let m = (p / u) * Math.PI * 2 + (Math.random() - 0.5) * 0.9,
            g = 0.5 + Math.random() * 0.6;
          d.push([
            Math.cos(m) * g,
            Math.sin(m) * g * (0.4 + Math.random() * 0.6),
          ]);
        }
        this.shards.push({
          x: a + (Math.random() - 0.5) * i * 0.05,
          y: r + (Math.random() - 0.5) * i * 0.05,
          vx: Math.cos(h) * f,
          vy: Math.sin(h) * f - i * 0.1,
          r: Math.random() * 6,
          vr: (Math.random() - 0.5) * 9,
          z: i * (0.004 + Math.random() * 0.02),
          gz: 1.6 + Math.random() * 2.6,
          t: -Math.random() * 0.08,
          life: 0.45 + Math.random() * 0.45,
          pts: d,
          tint: Math.random(),
        });
      }
      this.gW = i;
    }
    drawGlass(t = 0) {
      let e = this.glassCv;
      if (!e) return;
      let s = e.getContext("2d");
      if ((s.clearRect(0, 0, e.width, e.height), !!this.shards?.length))
        for (let n = this.shards.length - 1; n >= 0; n--) {
          let i = this.shards[n];
          if (((i.t += t), i.t < 0)) continue;
          if (i.t > i.life) {
            this.shards.splice(n, 1);
            continue;
          }
          let a = Math.exp(i.gz * i.t),
            r = i.t / i.life;
          ((i.x += i.vx * t * a * 0.6),
            (i.y += i.vy * t * a * 0.6 + this.gW * 0.25 * i.t * t),
            (i.r += i.vr * t));
          let l = i.z * a,
            c = Math.min(1, (1 - r) * 1.6);
          (s.save(),
            s.translate(i.x, i.y),
            s.rotate(i.r),
            s.scale(l, l),
            s.beginPath(),
            i.pts.forEach(([f, u], d) => (d ? s.lineTo(f, u) : s.moveTo(f, u))),
            s.closePath());
          let h = 0.5 + 0.5 * Math.sin(i.r * 2 + i.tint * 6);
          ((s.fillStyle = `rgba(${(200 + 40 * h) | 0},${(222 + 30 * h) | 0},${(235 + 20 * h) | 0},${(0.1 + 0.32 * h) * c})`),
            s.fill(),
            (s.lineWidth = 1.6 / l),
            (s.strokeStyle = `rgba(255,255,255,${(0.45 + 0.5 * h) * c})`),
            s.stroke(),
            s.restore());
        }
    }
    blocked(t, e = this.x) {
      let s = this.world;
      if (!s?.near) return !1;
      for (let i = 0.04; i < 0.85; i += 0.09) {
        let a = t.x + (e.x - t.x) * i,
          r = t.y + (e.y - t.y) * i,
          l = t.z + (e.z - t.z) * i;
        for (let c of s.near(a, l, 1.5))
          if (
            !(c.dead || c.traffic || c.mp) &&
            !(c.y1 !== void 0 && (r > c.y1 + 0.2 || r < c.y0 - 0.2)) &&
            s.test(c, a, l, Hwt, Dwt, 0.45, 0.45)
          )
            return !0;
      }
      let n = this.blockers?.(e);
      if (n)
        for (let i = 0.04; i < 0.85; i += 0.06) {
          kc.set(
            t.x + (e.x - t.x) * i,
            t.y + (e.y - t.y) * i,
            t.z + (e.z - t.z) * i,
          );
          for (let a of n) {
            Z_.subVectors(a.b, a.a);
            let r = Z_.lengthSq() || 1,
              l = Math.max(0, Math.min(1, Q_.subVectors(kc, a.a).dot(Z_) / r));
            if (Q_.copy(a.a).addScaledVector(Z_, l).distanceTo(kc) < a.r)
              return !0;
          }
        }
      return !1;
    }
    shot(t) {
      let e = this.cam,
        s = this.hit.f,
        n = this.hit.side,
        i = this.x;
      ((e.shot = t), (e.t = 0), (e.bt = 0));
      let a = (h, f, u) => {
          let d = Math.sin(h),
            p = Math.cos(h),
            m = this.clear
              ? Math.min(f, this.clear(i.x, i.y + u, i.z, d, 0, p, f, i.y))
              : f,
            g = new dt(i.x + d * m, i.y + u, i.z + p * m);
          return { a: h, d: m, p: g, ok: m > f * 0.6 && !this.blocked(g) };
        },
        r = Math.atan2(s.x, s.z),
        l =
          t === 0
            ? { a: r + n * 1.05, d: 4.6, up: 0.55 }
            : { a: r - n * 1.9, d: 7.5, up: 1.5 },
        c = null;
      for (let h of [0, 0.4, -0.4, 0.8, -0.8, Math.PI]) {
        let f = a(l.a + h, l.d, l.up);
        if (f.ok) {
          c = f;
          break;
        }
        (!c || f.d > c.d) && (c = f);
      }
      ((e.orbit = {
        a: c.a,
        d: Math.max(2.8, c.d),
        up: l.up,
        w: (t === 0 ? 0.32 : 0.2) * -n,
      }),
        (e.fov = t === 0 ? 58 : 48),
        (e.roll = t === 0 ? n * 0.07 : 0),
        t === 0 || e.pos.lengthSq(),
        e.pos.copy(c.p),
        e.look.copy(i));
    }
    apply(t, e) {
      if (!this.on) {
        let f = this.blend;
        if (!f) return !1;
        f.t += e;
        let u = Math.min(1, f.t / 0.8),
          d = u * u * (3 - 2 * u);
        (t.position.lerpVectors(f.pos, t.position, d),
          t.quaternion.slerpQuaternions(f.q, t.quaternion, d));
        let p = f.fov + (t.fov - f.fov) * d;
        return (
          t.fov !== p && ((t.fov = p), t.updateProjectionMatrix()),
          t.updateMatrixWorld(),
          u >= 1 && (this.blend = null),
          !1
        );
      }
      if ((this.drawGlass(e), this.reset)) return !1;
      let s = this.cam,
        n = this.x,
        i = s.orbit;
      ((s.t += e),
        (s.bt += e) > 0.2 &&
          ((s.bt = 0),
          this.blocked(s.pos) && (i.a += 0.5 * Math.sign(i.w || 1))),
        (i.a += i.w * e));
      let a = Math.sin(i.a),
        r = Math.cos(i.a),
        l = this.clear
          ? Math.min(i.d, this.clear(n.x, n.y + i.up, n.z, a, 0, r, i.d, n.y))
          : i.d;
      (Q_.set(n.x + a * l, n.y + i.up, n.z + r * l),
        s.pos.lerp(Q_, Math.min(1, e * 4.5)));
      let c = this.ground(s.pos.x, s.pos.z, s.pos.y);
      (Number.isFinite(c) && s.pos.y < c + 0.35 && (s.pos.y = c + 0.35),
        s.look.lerp(n, Math.min(1, e * 9)));
      let h = this.shake || 0;
      return (
        (this.shake = h * Math.exp(-e * 5)),
        t.position.set(
          s.pos.x + (Math.random() - 0.5) * h,
          s.pos.y + (Math.random() - 0.5) * h + 0.02 * Math.sin(s.t * 6.3),
          s.pos.z + (Math.random() - 0.5) * h,
        ),
        t.lookAt(s.look),
        t.rotateZ(s.roll),
        t.fov !== s.fov && ((t.fov = s.fov), t.updateProjectionMatrix()),
        t.updateMatrixWorld(),
        (this.lastCam ||= { pos: new dt(), q: new tn(), fov: 50 }),
        this.lastCam.pos.copy(t.position),
        this.lastCam.q.copy(t.quaternion),
        (this.lastCam.fov = t.fov),
        !0
      );
    }
    pose(t, e) {
      if (!this.on || this.reset) return;
      let s = this.B,
        n = t.root;
      (n.quaternion.copy(s.q),
        C0.set(0, -s.y0, 0).applyQuaternion(s.q),
        n.position.copy(s.p).add(C0),
        t.body.position.set(0, 0, 0),
        t.body.rotation.set(0, 0, 0));
      for (let a of t.wheels || [])
        a.spin.rotation.x -= 0.4 * s.v.length() * 0.016;
      let i = this.ground(s.p.x, s.p.z, s.p.y);
      ((e.pos.x = s.p.x),
        (e.pos.z = s.p.z),
        Number.isFinite(i) && (e.pos.y = i),
        (e.vel.x = s.v.x),
        (e.vel.z = s.v.z),
        (e.vel.y = 0),
        (e._prev = null));
    }
  };
