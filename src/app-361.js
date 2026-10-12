// app 361 — math
// Lines 179089-179554 of readable/app.pretty.js (statement-aligned).
var sv = class {
  constructor(t) {
    (Object.assign(this, t),
      (this.on = !1),
      (this.leaving = 0),
      (this.sees = !1),
      (this.x = 0),
      (this.y = 0),
      (this.z = 0),
      (this.vx = 0),
      (this.vy = 0),
      (this.vz = 0),
      (this.h = 0),
      (this.bank = 0),
      (this.pitch = 0),
      (this.rot = 0),
      (this.seeT = 0),
      (this.light = 0),
      (this.t = 0),
      (this.lostAt = null),
      (this.orbit = 0),
      (this.roof = -1e4),
      (this.roofT = 0),
      (this.mode = "track"),
      (this.sweepT = 12),
      (this.sweepN = 0),
      (this.phT = 0),
      (this.side = 1),
      this.build());
  }
  build() {
    let t = !!this.mobile,
      e = t ? 10 : 18,
      s = new Ee({ color: 1186342, metalness: 0.45, roughness: 0.38 }),
      n = new Ee({ color: 15659508, metalness: 0.2, roughness: 0.4 }),
      o = new Ee({ color: 727594, metalness: 0.6, roughness: 0.08 }),
      a = new Ee({ color: 1776928, metalness: 0.5, roughness: 0.6 }),
      r = new Ee({ color: 1382170, metalness: 0.3, roughness: 0.55 }),
      l = (this.root = new ke());
    ((l.name = "policeHeli"), (l.visible = !1));
    let c = (x, v, y, M, S, w = 1, z = 1, _ = 1) => {
        let R = new _e(x, v);
        return (
          R.position.set(y, M, S),
          R.scale.set(w, z, _),
          (R.castShadow = !t),
          l.add(R),
          R
        );
      },
      h = new i0(1, e, Math.round(e * 0.6));
    (c(h, s, 0, 1.55, 0.1, 1.2, 1.15, 2.35),
      c(h, o, 0, 1.8, -1.05, 1.06, 0.92, 1.45),
      c(h, n, 0, 1.35, 0.15, 1.235, 0.62, 1.9));
    let f = c(new ks(0.2, 0.42, 5.4, t ? 6 : 10), s, 0, 1.85, 4.3);
    ((f.rotation.x = Math.PI / 2),
      c(new qs(0.12, 1.5, 0.95), s, 0, 2.45, 6.85),
      c(new qs(2, 0.07, 0.42), s, 0, 1.85, 6),
      c(new qs(0.95, 0.55, 1.9), s, 0, 2.62, 0.75),
      c(new ks(0.09, 0.11, 0.55, 6), a, 0, 3.05, 0.4));
    let u = new ks(0.06, 0.06, 3.7, 6),
      d = new ks(0.05, 0.05, 0.75, 6);
    for (let x of [-1, 1]) {
      let v = c(u, a, x * 1, 0.08, 0.2);
      v.rotation.x = Math.PI / 2;
      for (let y of [-0.7, 1]) {
        let M = c(d, a, x * 0.85, 0.42, y);
        M.rotation.z = x * 0.35;
      }
    }
    c(new ks(0.17, 0.2, 0.32, 8), a, 0, 0.55, -1.75);
    let p = zyt();
    if (p) {
      let x = new Ee({
          map: p,
          roughness: 0.45,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
        }),
        v = new $n(2.3, 0.58);
      for (let y of [-1, 1]) {
        let M = new _e(v, x);
        (M.position.set(y * 1.215, 1.42, 0.35),
          (M.rotation.y = (y * Math.PI) / 2),
          l.add(M));
      }
    }
    ((this.main = new ke()),
      this.main.position.set(0, 3.32, 0.4),
      l.add(this.main));
    let m = new qs(0.3, 0.05, 5.3);
    for (let x = 0; x < 4; x++) {
      let v = new _e(m, r);
      (v.position.set(
        Math.sin((x * Math.PI) / 2) * 2.65,
        0,
        Math.cos((x * Math.PI) / 2) * 2.65,
      ),
        (v.rotation.y = (x * Math.PI) / 2),
        (v.castShadow = !t),
        this.main.add(v));
    }
    ((this.disc = new _e(
      new fr(5.3, t ? 16 : 32),
      new ln({
        color: 1711136,
        transparent: !0,
        opacity: 0.16,
        depthWrite: !1,
        side: Ss,
      }),
    )),
      (this.disc.rotation.x = -Math.PI / 2),
      this.disc.position.set(0, 3.3, 0.4),
      l.add(this.disc),
      (this.tail = new ke()),
      this.tail.position.set(0.22, 2.5, 6.85),
      l.add(this.tail));
    let g = new qs(0.04, 1.4, 0.13);
    for (let x = 0; x < 2; x++) {
      let v = new _e(g, r);
      ((v.rotation.x = (x * Math.PI) / 2), this.tail.add(v));
    }
    ((this.beaconM = new Ee({
      color: 4194304,
      emissive: 16718352,
      emissiveIntensity: 0,
    })),
      c(new i0(0.1, 6, 4), this.beaconM, 0, 3, 1.6));
    let b = new ur(1, 1, t ? 12 : 24, 1, !0);
    (b.translate(0, -0.5, 0),
      b.rotateX(Math.PI),
      (this.cone = new _e(
        b,
        new ln({
          color: 16774364,
          transparent: !0,
          opacity: 0,
          blending: da,
          depthWrite: !1,
          side: Ss,
        }),
      )),
      (this.cone.frustumCulled = !1),
      (this.cone.visible = !1),
      (this.pool = new _e(
        new fr(1, t ? 16 : 32),
        new ln({
          map: Eyt(),
          color: 16777215,
          transparent: !0,
          opacity: 0,
          blending: da,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -4,
        }),
      )),
      (this.pool.rotation.x = -Math.PI / 2),
      (this.pool.frustumCulled = !1),
      (this.pool.visible = !1),
      this.scene?.add(l, this.cone, this.pool),
      (this.lx = 0),
      (this.lz = 0));
  }
  roofAt(t, e, s = 0) {
    let n = this.heights?.();
    if (!n) return -1e4;
    let { w: o, h: a, H: r, cell: l, x0: c, z0: h } = n,
      f = Math.ceil(s / l),
      u = -1e4,
      d = Math.round((t - c) / l),
      p = Math.round((e - h) / l);
    for (let m = p - f; m <= p + f; m += Math.max(1, f))
      for (let g = d - f; g <= d + f; g += Math.max(1, f))
        if (g >= 0 && m >= 0 && g < o && m < a) {
          let b = r[m * o + g];
          b > u && (u = b);
        }
    return u;
  }
  roofAhead() {
    let t = this.roofAt(this.x, this.z, 10);
    for (let e of [0.6, 1.2, 2, 3, 4])
      t = Math.max(
        t,
        this.roofAt(this.x + this.vx * e, this.z + this.vz * e, 14),
      );
    return t;
  }
  ground(t, e, s) {
    let n = this.L?.driveHeight?.(t, e, null, s);
    return Number.isFinite(n) ? n : s;
  }
  covered(t) {
    let e = this.L;
    if (!e?.roadAt) return !1;
    let s = e.roadAt(t.x, t.z, 2, t.y);
    if (
      s?.E?.tunnel ||
      (s?.E?.covered && s.s > s.E.covered[0] && s.s < s.E.covered[1])
    )
      return !0;
    for (let n of [7, 13, 21, 32]) {
      let o = e.roadAt(t.x, t.z, 1, t.y + n);
      if (o && o.dd <= 0.5 && o.y - t.y > 4) return !0;
    }
    {
      let n = dq(t.x, t.z) - t.y;
      if (n > 3 && n < 40) return !0;
    }
    if (this.heights?.()) {
      let n = 1e9;
      for (let [o, a] of [
        [0, 0],
        [2.5, 0],
        [-2.5, 0],
        [0, 2.5],
        [0, -2.5],
      ])
        n = Math.min(n, this.roofAt(t.x + o, t.z + a));
      if (n > t.y + 6) return !0;
    }
    return !1;
  }
  update(t, e, s, n, o, a = 0, r = null) {
    if (
      ((this.t += t),
      n && (!this.on || this.leaving)
        ? this.enter(e, s)
        : !n && this.on && !this.leaving && (this.leaving = 0.01),
      !this.on)
    ) {
      this.sees = !1;
      return;
    }
    this.leaving && (this.leaving += t);
    let l = Math.hypot(this.x - e.x, this.z - e.z);
    (this.seeT -= t) <= 0 &&
      ((this.seeT = 0.25),
      (this.sees = !this.leaving && l < _yt && !this.covered(e)),
      this.sees
        ? ((this.lostAt = null), (this.found = !0))
        : !this.lostAt &&
          o &&
          this.found &&
          (this.lostAt = { x: o.x, z: o.z, y: o.y ?? e.y }));
    let c = Math.hypot(s.x, s.z),
      h =
        c > 3
          ? { x: s.x / c, z: s.z / c }
          : r || { x: -Math.sin(this.h), z: -Math.cos(this.h) },
      f = { x: -h.z, z: h.x };
    this.sees && !this.leaving
      ? this.mode === "track" &&
        (this.sweepT -= t) <= 0 &&
        ((this.mode = "set"),
        (this.side = Math.random() < 0.5 ? -1 : 1),
        (this.phT = 0))
      : this.mode !== "track" && (this.mode = "track");
    let u,
      d,
      p,
      m = null;
    if (this.leaving) {
      let C = Math.atan2(this.z - e.z, this.x - e.x);
      ((u = this.x + Math.cos(C) * 400),
        (d = this.z + Math.sin(C) * 400),
        (p = this.y + 60));
    } else if (this.sees || !this.lostAt)
      if (this.mode === "track") {
        let C = Math.max(e.y, this.ground(e.x + h.x * 90, e.z + h.z * 90, e.y)),
          P = Math.max(36, (this.roof > -1e3 ? this.roof + Kz + 8 : 0) - C),
          I = xf(Math.max(70 + c * 0.6, P / 0.36), 70, 220);
        ((u = e.x + h.x * I + s.x * 0.5),
          (d = e.z + h.z * I + s.z * 0.5),
          (p = C + 36));
      } else if (this.mode === "set") {
        this.phT += t;
        let C = 60 + c * 1.3;
        ((u = e.x + h.x * C + f.x * this.side * 110 + s.x * 0.8),
          (d = e.z + h.z * C + f.z * this.side * 110 + s.z * 0.8),
          (p = Math.max(e.y, this.ground(u, d, e.y)) + 32),
          (Math.hypot(u - this.x, d - this.z) < 35 || this.phT > 7) &&
            ((this.mode = "cross"),
            (this.phT = 0),
            (this.c0 = { x: this.x, y: this.y, z: this.z })));
      } else {
        this.phT += t;
        let C = 4.5,
          P = xf(this.phT / C, 0, 1),
          I = P * P * (3 - 2 * P),
          L = 55 + c * 1,
          F = this.side * 110 * (1 - 2 * I),
          N = e.x + h.x * L + f.x * F,
          B = e.z + h.z * L + f.z * F,
          H = Math.max(e.y, this.ground(N, B, e.y)) + 28;
        this.roof > -1e3 && (H = Math.max(H, this.roofAt(N, B, 10) + Kz + 2));
        let O = xf(this.phT / 1.2, 0, 1),
          D = O * O * (3 - 2 * O);
        ((m = {
          x: this.c0.x + (N - this.c0.x) * D,
          y: this.c0.y + (H - this.c0.y) * D,
          z: this.c0.z + (B - this.c0.z) * D,
        }),
          P >= 1 &&
            ((this.mode = "track"),
            (this.sweepT = 20 + Math.random() * 20),
            this.sweepN++));
      }
    else {
      this.orbit += t * 0.35;
      let C = this.lostAt;
      ((u = C.x + Math.cos(this.orbit) * 45),
        (d = C.z + Math.sin(this.orbit) * 45),
        (p = C.y + qF + 8));
    }
    (this.roofT -= t) <= 0 &&
      ((this.roofT = 0.2), (this.roof = this.roofAhead()));
    let g, b, x;
    if (m) {
      let C = 1 / Math.max(t, 0.001),
        P = (m.x - this.x) * C,
        I = (m.y - this.y) * C,
        L = (m.z - this.z) * C;
      ((g = xf((P - this.vx) * C, -30, 30)),
        (b = xf((L - this.vz) * C, -30, 30)),
        (x = 0),
        (this.vx = P),
        (this.vy = I),
        (this.vz = L),
        (this.x = m.x),
        (this.y = m.y),
        (this.z = m.z));
    } else {
      this.roof > -1e3 && (p = Math.max(p, this.roof + Kz + 8));
      let C = 0.9,
        P = 1.9;
      ((g = (u - this.x) * C - this.vx * P),
        (b = (d - this.z) * C - this.vz * P),
        (x = (p - this.y) * 1.2 - this.vy * 2.2),
        !this.leaving &&
          this.sees &&
          ((g += s.x * P * 0.9), (b += s.z * P * 0.9)));
      let I = Math.hypot(g, b),
        L = 18;
      (I > L && ((g *= L / I), (b *= L / I)),
        (x = xf(x, -6, 10)),
        (this.vx += g * t),
        (this.vz += b * t),
        (this.vy += x * t));
      let F = Math.hypot(this.vx, this.vz);
      (F > jF && ((this.vx *= jF / F), (this.vz *= jF / F)),
        (this.x += this.vx * t),
        (this.z += this.vz * t),
        (this.y += this.vy * t));
    }
    let v = Math.hypot(this.vx, this.vz);
    {
      let C = this.ground(this.x, this.z, this.y - qF),
        P = Math.max(C, this.roofAt(this.x, this.z, 9)) + Kz;
      this.y < P + 4 &&
        ((this.vy = Math.max(this.vy, Math.min(20, (P + 4 - this.y) * 3))),
        this.y < P && (this.y = P));
    }
    let y =
      v > 6
        ? Math.atan2(-this.vx, -this.vz)
        : Math.atan2(-(e.x - this.x), -(e.z - this.z));
    this.h = Ltt(this.h + xf(Ltt(y - this.h), -1.1 * t, 1.1 * t));
    let M = -Math.sin(this.h),
      S = -Math.cos(this.h),
      w = -S,
      z = M,
      _ = g * M + b * S,
      R = g * w + b * z;
    ((this.bank +=
      (xf((-R / 9.8) * 0.9, m ? -0.7 : -0.5, m ? 0.7 : 0.5) - this.bank) *
      Math.min(1, t * (m ? 4 : 2.5))),
      (this.pitch +=
        (xf((-_ / 9.8) * 0.5 - v * 0.0045, -0.42, 0.2) - this.pitch) *
        Math.min(1, t * 2)));
    let T = this.root;
    ((T.visible = !0),
      T.position.set(this.x, this.y, this.z),
      T.rotation.set(this.pitch, this.h, this.bank, "YXZ"),
      (this.rot += t * 42),
      (this.main.rotation.y = this.rot),
      (this.tail.rotation.x = this.rot * 1.7),
      (this.beaconM.emissiveIntensity = this.t % 1.1 < 0.12 ? 6 : 0));
    let E = xf((a - 0.25) / 0.35, 0, 1);
    this.light +=
      (E * (this.leaving ? 0 : 1) - this.light) * Math.min(1, t * 1.5);
    let A = this.light > 0.02;
    if (((this.cone.visible = this.pool.visible = A), A)) {
      let C, P;
      (this.sees || !this.lostAt
        ? ((C = e.x + Math.sin(this.t * 0.7) * 2.5),
          (P = e.z + Math.cos(this.t * 0.9) * 2.5))
        : ((C = this.lostAt.x + Math.sin(this.t * 0.6) * 22),
          (P = this.lostAt.z + Math.cos(this.t * 0.45) * 22)),
        (this.lx += (C - this.lx) * Math.min(1, t * 3)),
        (this.lz += (P - this.lz) * Math.min(1, t * 3)));
      let I = this.ground(this.lx, this.lz, e.y),
        L = this.x + M * 1.75,
        F = this.y + 0.5,
        N = this.z + S * 1.75,
        B = this.lx - L,
        H = I - F,
        O = this.lz - N,
        D = Math.hypot(B, H, O) || 1,
        U = 0.11 * D;
      (this.cone.position.set(L, F, N),
        this.cone.scale.set(U, D, U),
        (this._q0 ||= new xt(0, 1, 0)),
        (this._q1 ||= new xt()).set(B / D, H / D, O / D),
        this.cone.quaternion.setFromUnitVectors(this._q0, this._q1),
        (this.cone.material.opacity = 0.075 * this.light),
        this.pool.position.set(this.lx, I + 0.12, this.lz),
        this.pool.scale.setScalar(U * 1.15),
        (this.pool.material.opacity = 0.75 * this.light));
    }
    (this.leaving > 14 || (this.leaving && l > 650)) && this.hide();
  }
  enter(t, e) {
    if (this.on && this.leaving) {
      this.leaving = 0;
      return;
    }
    let s = Math.hypot(e.x, e.z),
      n = s > 2 ? e.x / s : 1,
      o = s > 2 ? e.z / s : 0,
      a = Math.random() < 0.5 ? -1 : 1;
    ((this.x = t.x - n * 380 - o * 120 * a),
      (this.z = t.z - o * 380 + n * 120 * a),
      (this.y = t.y + qF + 40),
      (this.vx = e.x),
      (this.vz = e.z),
      (this.vy = 0),
      (this.h = Math.atan2(-n, -o)),
      (this.lx = t.x),
      (this.lz = t.z),
      (this.on = !0),
      (this.leaving = 0),
      (this.sees = !1),
      (this.lostAt = null),
      (this.seeT = 0),
      (this.found = !1),
      (this.mode = "track"),
      (this.sweepT = 9 + Math.random() * 6),
      (this.sweepN = this.sweepN || 0));
  }
  hide() {
    ((this.on = !1),
      (this.leaving = 0),
      (this.sees = !1),
      (this.root.visible = !1),
      (this.cone.visible = this.pool.visible = !1));
  }
  dispose() {
    (this.hide(),
      this.root.removeFromParent(),
      this.cone.removeFromParent(),
      this.pool.removeFromParent());
  }
};
