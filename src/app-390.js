// app 390 — math
// Lines 194497-194991 of readable/app.pretty.js (statement-aligned).
var PT = class {
  constructor(t, { mobile: e = !1 } = {}) {
    ((this.scene = t), (this.mobile = e), (this.built = !1));
  }
  build() {
    this.built = !0;
    let t = (this.N = this.mobile ? 420 : 1e3),
      e = X6t();
    ((this.p = []),
      (this.sets = K6t.map((n) => {
        let i = new Le();
        (i.setAttribute("position", new Te(new Float32Array(t * 3), 3)),
          i.setAttribute("color", new Te(new Float32Array(t * 4), 4)),
          i.setDrawRange(0, 0));
        let a = new Zr(
          i,
          new _r({
            size: n,
            map: e,
            transparent: !0,
            depthWrite: !1,
            vertexColors: !0,
            sizeAttenuation: !0,
          }),
        );
        return (
          (a.frustumCulled = !1),
          (a.name = "ThrusterGas"),
          (a.renderOrder = 2),
          this.scene.add(a),
          a
        );
      })));
    let s = new kr({
      map: cit(),
      color: 12572927,
      transparent: !0,
      depthWrite: !1,
      blending: $o,
      opacity: 0,
    });
    this.glow = RT.map(() => {
      let n = new Jr(s);
      return (
        n.scale.setScalar(0.3),
        (n.visible = !1),
        (n.renderOrder = 3),
        this.scene.add(n),
        n
      );
    });
    {
      let n = cit(),
        i = (l) =>
          new kr({
            map: n,
            color: l,
            transparent: !0,
            depthWrite: !1,
            blending: $o,
            opacity: 0,
          }),
        a = (l) => {
          let c = new Jr(l);
          return (
            (c.visible = !1),
            (c.renderOrder = 3),
            (c.name = "ThrusterJet"),
            this.scene.add(c),
            c
          );
        },
        r = (l) => {
          let c = {
            sheath: Array.from({ length: M4 }, () => i(7317759)),
            dia: i(15398143),
            core: i(16777215),
          };
          return {
            M: c,
            list: Array.from({ length: l }, () => ({
              sheath: c.sheath.map(a),
              dia: [0, 1, 2].map(() => a(c.dia)),
              core: a(c.core),
            })),
          };
        };
      ((this.tailJ = r(RT.length)),
        (this.bellyJ = r(AT.length)),
        (this.bk = 0),
        (this.bacc = 0));
    }
    ((this.gm = s),
      (this.hud = J6t()),
      (this.thr = 0),
      (this.liftSeen = 0),
      (this.landSeen = 0),
      (this.boostWas = !1),
      (this.acc = 0),
      (this.wash = 0));
  }
  _nozzles(t) {
    let e = this._nz || (this._nz = RT.map(() => new dt())),
      s = t.thrusters;
    for (let n = 0; n < 4; n++)
      s?.[n]
        ? s[n].getWorldPosition(e[n])
        : e[n].set(...RT[n]).applyMatrix4(t.body.matrixWorld);
    return e;
  }
  _emit(t, e, s, n, i, a, r, l, c = 0, h = 3, f = 0) {
    this.p.length < this.N * 3 &&
      this.p.push({
        x: t,
        y: e,
        z: s,
        vx: n,
        vy: i,
        vz: a,
        age: c,
        life: r,
        a: l,
        mx: h,
        tw: f,
        ph: Math.random() * 6.283,
      });
  }
  update(
    t,
    e,
    s,
    { lit: n = 1, audio: i = null, metric: a = !0, on: r = !0 } = {},
  ) {
    let l = !!(e.S?.liftA && s?.body);
    if (!l && !this.built) return;
    if ((this.built || this.build(), !l)) {
      for (let E of this.glow) E.visible = !1;
      (this._jetsOff(),
        this.p.length && (this.p.length = 0),
        this._draw(t, n, 0),
        i?.setFan?.(0),
        i?.setThrust?.(0));
      return;
    }
    let c = !!e.nitroOn,
      h = e.lift > 0 || e.burn > 0,
      f = !!e.fly && !e.onGround,
      u = r
        ? Math.max(
            c ? 1 : 0,
            h ? (e.burn ? 0.8 : 1) : 0,
            f ? 0.5 + 0.5 * Math.min(1, e.throttle || 0) : 0,
          )
        : 0;
    ((this.thr +=
      (u - this.thr) * Math.min(1, t / (u > this.thr ? 0.05 : 0.18))),
      i?.setFan?.(r ? e.fan : 0),
      i?.setThrust?.(this.thr),
      (e.liftOff || 0) !== this.liftSeen
        ? ((this.liftSeen = e.liftOff || 0),
          i?.thrustStart?.(),
          this._burst(e, s, (this.mobile ? 30 : 60) * Yv, 1))
        : c && !this.boostWas && i?.thrustStart?.(),
      (this.boostWas = c),
      (e.landed || 0) !== this.landSeen &&
        ((this.landSeen = e.landed || 0),
        i?.land?.(Math.max(0.3, e.landing || 0)),
        this._burst(
          e,
          s,
          (this.mobile ? 0.5 : 1) * Yv * (40 + 60 * (e.landing || 0)),
          0.8,
        )));
    let d = this._nozzles(s),
      p = s.body.matrixWorld.elements,
      m = p[8],
      g = p[9],
      b = p[10],
      v = p[4],
      x = p[5],
      y = p[6],
      M = (e.bodyY ?? e.pos.y) - (e.alt || 0),
      S = h && !c ? 1 : h ? 0.55 : f && !c ? 0.45 : 0,
      w = 1 - S * 0.75,
      _ = this._jd || (this._jd = new dt());
    _.set(m * w - v * S, g * w - x * S, b * w - y * S).normalize();
    let z = (1.4 + 3.6 * this.thr) * (c ? 1.25 : 1);
    if (this.thr > 0.05) {
      let E = this.thr * (this.mobile ? 100 : 200) * (f ? 2 : 1) * Yv * t;
      for (this.acc += E; this.acc >= 1;) {
        this.acc -= 1;
        let R = d[(Math.random() * 4) | 0],
          P =
            f && Math.random() < 0.6
              ? 3 + Math.random() * 5
              : 9 + Math.random() * 8,
          C = () => (Math.random() - 0.5) * 2.2,
          I = z * (0.55 + Math.random() * 0.4);
        this._emit(
          R.x + _.x * I,
          R.y + _.y * I,
          R.z + _.z * I,
          e.vel.x * 0.6 + _.x * P + C(),
          (e.vel.y || 0) * 0.6 + _.y * P + C(),
          e.vel.z * 0.6 + _.z * P + C(),
          f ? 3 + Math.random() * 2.5 : 1.8 + Math.random() * 1.8,
          f ? 0.62 : 0.5,
          0,
          3,
          1,
        );
      }
    }
    if (f && r) {
      let E = Math.abs(e.steerIn || 0) > 0.15 ? Math.sign(e.steerIn) : 0,
        R = (e.flipT ?? -1) >= 0;
      if (E || R) {
        this.rcs = (this.rcs || 0) + (this.mobile ? 40 : 80) * Yv * t;
        let P = p[0],
          C = p[1],
          I = p[2],
          L = this._noseP || (this._noseP = [new dt(), new dt()]);
        for (
          L[0].set(-0.75, 0.55, -1.95).applyMatrix4(s.body.matrixWorld),
            L[1].set(0.75, 0.55, -1.95).applyMatrix4(s.body.matrixWorld);
          this.rcs >= 1;
        ) {
          this.rcs -= 1;
          let F = 9 + Math.random() * 5,
            O = () => (Math.random() - 0.5) * 1.2,
            B = R ? L[(Math.random() * 2) | 0] : L[E > 0 ? 1 : 0],
            H = R ? 0 : E > 0 ? 1 : -1,
            N = R ? -1 : 0;
          this._emit(
            B.x,
            B.y,
            B.z,
            e.vel.x * 0.8 + (P * H + v * N) * F + O(),
            (e.vel.y || 0) * 0.8 + (C * H + x * N) * F + O(),
            e.vel.z * 0.8 + (I * H + y * N) * F + O(),
            0.7 + Math.random() * 0.5,
            0.55,
            0,
            1,
          );
        }
      }
    }
    let A = h && e.alt < 14 ? 1 - e.alt / 14 : 0;
    for (this.wash += A * (this.mobile ? 45 : 90) * Yv * t; this.wash >= 1;) {
      this.wash -= 1;
      let E = Math.random() * 6.283,
        R = 1 + Math.random() * 2,
        P = 6 + Math.random() * 6;
      this._emit(
        e.pos.x + Math.cos(E) * R,
        M + 0.4,
        e.pos.z + Math.sin(E) * R,
        Math.cos(E) * P + e.vel.x * 0.3,
        0.6 + Math.random(),
        Math.sin(E) * P + e.vel.z * 0.3,
        3 + Math.random() * 2.5,
        0.45,
        0.3,
      );
    }
    let T = this.thr;
    this.gm.opacity = Math.min(0.85, T);
    for (let E = 0; E < 4; E++) {
      let R = this.glow[E];
      ((R.visible = T > 0.03),
        R.visible &&
          (R.position.copy(d[E]),
          R.scale.setScalar(0.14 + 0.22 * T + Math.random() * 0.05 * T)));
    }
    this._jetsOn(this.tailJ, T, z, _, d);
    {
      let E = r ? Math.max(h ? (e.burn ? 0.9 : 1) : 0, f ? 0.55 : 0) : 0;
      this.bk += (E - this.bk) * Math.min(1, t / (E > this.bk ? 0.06 : 0.25));
      let R = this._bd || (this._bd = new dt()),
        P = this._bp || (this._bp = AT.map(() => new dt())),
        C = 1.2 + 3 * this.bk;
      R.set(-v, -x, -y).normalize();
      for (let I = 0; I < AT.length; I++)
        P[I].set(...AT[I]).applyMatrix4(s.body.matrixWorld);
      if ((this._jetsOn(this.bellyJ, this.bk, C, R, P), this.bk > 0.05))
        for (
          this.bacc += this.bk * (this.mobile ? 60 : 140) * Yv * t;
          this.bacc >= 1;
        ) {
          this.bacc -= 1;
          let I = P[(Math.random() * 4) | 0],
            L = C * (0.55 + Math.random() * 0.4),
            F = 5 + Math.random() * 8,
            O = () => (Math.random() - 0.5) * 1.6;
          this._emit(
            I.x + R.x * L,
            I.y + R.y * L,
            I.z + R.z * L,
            e.vel.x * 0.6 + R.x * F + O(),
            (e.vel.y || 0) * 0.6 + R.y * F + O(),
            e.vel.z * 0.6 + R.z * F + O(),
            2.5 + Math.random() * 2.5,
            0.55,
            0,
            3,
            1,
          );
        }
    }
    (s.materials?.RoadsterThrustGlow?.emissiveIntensity !== void 0 &&
      (s.materials.RoadsterThrustGlow.emissiveIntensity = 0.2 + 6 * T),
      this._draw(t, n, M),
      this._gauges(e, a));
  }
  _jetsOff(t = null) {
    for (let e of t ? [t] : [this.tailJ, this.bellyJ])
      if (e.shown !== !1) {
        e.shown = !1;
        for (let s of e.list) {
          for (let n of s.sheath) n.visible = !1;
          for (let n of s.dia) n.visible = !1;
          s.core.visible = !1;
        }
      }
  }
  _jetsOn(t, e, s, n, i) {
    if (e <= 0.04) return this._jetsOff(t);
    let a = performance.now() / 1e3,
      r = () => 0.85 + Math.random() * 0.3;
    t.shown = !0;
    for (let l = 0; l < M4; l++) {
      let c = (l + 0.5) / M4;
      t.M.sheath[l].opacity = Math.min(1, e) * 0.32 * (1 - c) ** 1.1;
    }
    ((t.M.dia.opacity = Math.min(1, e) * 0.75),
      (t.M.core.opacity = Math.min(1, e * 1.2) * 0.8));
    for (let l = 0; l < t.list.length; l++) {
      let c = t.list[l],
        h = i[l];
      for (let f = 0; f < M4; f++) {
        let u = (f + 0.5) / M4,
          d = s * u ** 1.15,
          p = c.sheath[f];
        ((p.visible = !0),
          p.position.set(h.x + n.x * d, h.y + n.y * d, h.z + n.z * d),
          p.scale.setScalar((0.28 + 0.95 * u) * (0.6 + 0.5 * e) * r()));
      }
      for (let f = 0; f < 3; f++) {
        let u = s * Y6t[f],
          d = c.dia[f];
        ((d.visible = !0),
          d.position.set(h.x + n.x * u, h.y + n.y * u, h.z + n.z * u),
          d.scale.setScalar(
            (0.2 - 0.03 * f) *
              (0.7 + 0.5 * e) *
              (1 + 0.35 * Math.sin(a * 47 + l * 1.7 + f * 2.1)),
          ));
      }
      ((c.core.visible = !0),
        c.core.position.set(
          h.x + n.x * 0.08,
          h.y + n.y * 0.08,
          h.z + n.z * 0.08,
        ),
        c.core.scale.setScalar((0.15 + 0.08 * e) * r()));
    }
  }
  _burst(t, e, s, n) {
    let i = (t.bodyY ?? t.pos.y) - (t.alt || 0);
    for (let a = 0; a < s; a++) {
      let r = Math.random() * 6.283,
        l = (5 + Math.random() * 9) * n;
      this._emit(
        t.pos.x + Math.cos(r) * 1.2,
        i + 0.3 + Math.random() * 0.6,
        t.pos.z + Math.sin(r) * 1.2,
        Math.cos(r) * l + t.vel.x * 0.2,
        0.8 + Math.random() * 1.8,
        Math.sin(r) * l + t.vel.z * 0.2,
        3.5 + Math.random() * 3,
        0.6,
        0.25,
      );
    }
  }
  _draw(t, e, s) {
    let n = 0.62 + 0.34 * e,
      i = [0, 0, 0, 0],
      a = this.sets.map((r) => [
        r.geometry.attributes.position.array,
        r.geometry.attributes.color.array,
      ]);
    for (let r = this.p.length - 1; r >= 0; r--) {
      let l = this.p[r];
      if (((l.age += t), l.age > l.life)) {
        this.p.splice(r, 1);
        continue;
      }
      let c = Math.exp(-t * 2.2);
      if (
        ((l.vx *= c),
        (l.vz *= c),
        (l.vy = l.vy * Math.exp(-t * 1.5) + 0.35 * t),
        l.tw)
      ) {
        let p = l.tw * 2.4 * t * Math.min(1, l.age * 2);
        ((l.vx += Math.sin(l.age * 2.3 + l.ph) * p),
          (l.vz += Math.cos(l.age * 1.9 + l.ph * 1.3) * p),
          (l.vy += Math.sin(l.age * 1.7 + l.ph * 0.7) * p * 0.6));
      }
      if (
        ((l.x += l.vx * t),
        (l.y += l.vy * t),
        (l.z += l.vz * t),
        l.y < s + 0.5 && ((l.y = s + 0.5), l.vy < 0))
      ) {
        let p = Math.hypot(l.vx, l.vz) + 0.001,
          m = -l.vy * 0.8;
        ((l.vx += (l.vx / p) * m), (l.vz += (l.vz / p) * m), (l.vy = 0.3));
      }
      let h = l.age / l.life,
        f = Math.min(
          1,
          l.a * 1.5 * Math.min(1, h * (l.tw ? 3 : 6)) * (1 - h) ** 1.2,
        ),
        u = Math.min(
          l.mx,
          Math.max(
            l.tw ? 1 : 0,
            h < 0.08 ? 0 : h < 0.25 ? 1 : h < 0.55 ? 2 : 3,
          ),
        );
      if (i[u] >= this.N) continue;
      a[u][0].set([l.x, l.y, l.z], i[u] * 3);
      let d = l.tw && h < 0.2 ? 1 - h / 0.2 : 0;
      (a[u][1].set(
        [n * (1 - 0.12 * d), n * (1 - 0.05 * d), n * 1.02, f],
        i[u] * 4,
      ),
        i[u]++);
    }
    this.sets.forEach((r, l) => {
      let c = r.geometry;
      (!i[l] && !c.drawRange.count) ||
        (c.setDrawRange(0, i[l]),
        i[l] &&
          ((c.attributes.position.needsUpdate = !0),
          (c.attributes.color.needsUpdate = !0)));
    });
  }
  _gauges(t, e) {
    let s = this.hud,
      n = (h, f, u, d, p = !1, m = !1) => {
        let g = s.G[h];
        g.txt !== u && ((g.txt = u), (g.b.textContent = u));
        let b = Math.round(Math.max(0, Math.min(1, d)) * 200) / 200;
        (g.arc !== b &&
          ((g.arc = b),
          g.v.setAttribute(
            "stroke-dasharray",
            `${(b * s.A).toFixed(1)} ${s.C.toFixed(1)}`,
          )),
          g.g.classList.toggle("hot", p),
          g.g.classList.toggle("off", m));
      },
      i = Math.round(t.downKg || 0);
    n("df", i, String(i), i / 2500, !1, !t.fanOn);
    let a = Math.abs(t.bPitch || 0) * 57.3;
    n("pt", a, a.toFixed(1), a / 90);
    let r = (t.alt || 0) * (e ? 1 : 3.281);
    (s.G.al.u.textContent !== (e ? "M" : "FT") &&
      (s.G.al.u.textContent = e ? "M" : "FT"),
      n(
        "al",
        r,
        r.toFixed(1),
        (t.alt || 0) / (t.S.flyAlt || 40),
        t.fly && t.nitro < 0.15,
      ));
    let l = s.K,
      c = (h, f) => {
        h._on !== f && ((h._on = f), h.classList.toggle("on", f));
      };
    c(l.J, t.lift > 0);
    {
      let h = t.ride && Math.cos(t.pitch) < -0.5 ? "LET GO" : "FLY";
      l.J.lastChild.textContent !== h && (l.J.lastChild.textContent = h);
    }
    (c(l.F, (t.flipT ?? -1) >= 0),
      c(l.Q, !!t.fanOn),
      (l.Q.style.color = t.climb ? "#9fd0ff" : ""),
      (l.F.style.opacity = t.fly && !t.onGround ? "1" : ".5"));
  }
};
