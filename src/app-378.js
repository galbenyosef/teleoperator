// app 378 — math
// Lines 186281-186746 of readable/app.pretty.js (statement-aligned).
var Xv = class {
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
      s = new me({ color: 1186342, metalness: 0.45, roughness: 0.38 }),
      n = new me({ color: 15659508, metalness: 0.2, roughness: 0.4 }),
      i = new me({ color: 727594, metalness: 0.6, roughness: 0.08 }),
      a = new me({ color: 1776928, metalness: 0.5, roughness: 0.6 }),
      r = new me({ color: 1382170, metalness: 0.3, roughness: 0.55 }),
      l = (this.root = new le());
    ((l.name = "policeHeli"), (l.visible = !1));
    let c = (v, x, y, M, S, w = 1, _ = 1, z = 1) => {
        let A = new ye(v, x);
        return (
          A.position.set(y, M, S),
          A.scale.set(w, _, z),
          (A.castShadow = !t),
          l.add(A),
          A
        );
      },
      h = new Er(1, e, Math.round(e * 0.6));
    (c(h, s, 0, 1.55, 0.1, 1.2, 1.15, 2.35),
      c(h, i, 0, 1.8, -1.05, 1.06, 0.92, 1.45),
      c(h, n, 0, 1.35, 0.15, 1.235, 0.62, 1.9));
    let f = c(new vs(0.2, 0.42, 5.4, t ? 6 : 10), s, 0, 1.85, 4.3);
    ((f.rotation.x = Math.PI / 2),
      c(new Is(0.12, 1.5, 0.95), s, 0, 2.45, 6.85),
      c(new Is(2, 0.07, 0.42), s, 0, 1.85, 6),
      c(new Is(0.95, 0.55, 1.9), s, 0, 2.62, 0.75),
      c(new vs(0.09, 0.11, 0.55, 6), a, 0, 3.05, 0.4));
    let u = new vs(0.06, 0.06, 3.7, 6),
      d = new vs(0.05, 0.05, 0.75, 6);
    for (let v of [-1, 1]) {
      let x = c(u, a, v * 1, 0.08, 0.2);
      x.rotation.x = Math.PI / 2;
      for (let y of [-0.7, 1]) {
        let M = c(d, a, v * 0.85, 0.42, y);
        M.rotation.z = v * 0.35;
      }
    }
    c(new vs(0.17, 0.2, 0.32, 8), a, 0, 0.55, -1.75);
    let p = m6t();
    if (p) {
      let v = new me({
          map: p,
          roughness: 0.45,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
        }),
        x = new Yn(2.3, 0.58);
      for (let y of [-1, 1]) {
        let M = new ye(x, v);
        (M.position.set(y * 1.215, 1.42, 0.35),
          (M.rotation.y = (y * Math.PI) / 2),
          l.add(M));
      }
    }
    ((this.main = new le()),
      this.main.position.set(0, 3.32, 0.4),
      l.add(this.main));
    let m = new Is(0.3, 0.05, 5.3);
    for (let v = 0; v < 4; v++) {
      let x = new ye(m, r);
      (x.position.set(
        Math.sin((v * Math.PI) / 2) * 2.65,
        0,
        Math.cos((v * Math.PI) / 2) * 2.65,
      ),
        (x.rotation.y = (v * Math.PI) / 2),
        (x.castShadow = !t),
        this.main.add(x));
    }
    ((this.disc = new ye(
      new da(5.3, t ? 16 : 32),
      new Ys({
        color: 1711136,
        transparent: !0,
        opacity: 0.16,
        depthWrite: !1,
        side: ls,
      }),
    )),
      (this.disc.rotation.x = -Math.PI / 2),
      this.disc.position.set(0, 3.3, 0.4),
      l.add(this.disc),
      (this.tail = new le()),
      this.tail.position.set(0.22, 2.5, 6.85),
      l.add(this.tail));
    let g = new Is(0.04, 1.4, 0.13);
    for (let v = 0; v < 2; v++) {
      let x = new ye(g, r);
      ((x.rotation.x = (v * Math.PI) / 2), this.tail.add(x));
    }
    ((this.beaconM = new me({
      color: 4194304,
      emissive: 16718352,
      emissiveIntensity: 0,
    })),
      c(new Er(0.1, 6, 4), this.beaconM, 0, 3, 1.6));
    let b = new fr(1, 1, t ? 12 : 24, 1, !0);
    (b.translate(0, -0.5, 0),
      b.rotateX(Math.PI),
      (this.cone = new ye(
        b,
        new Ys({
          color: 16774364,
          transparent: !0,
          opacity: 0,
          blending: $o,
          depthWrite: !1,
          side: ls,
        }),
      )),
      (this.cone.frustumCulled = !1),
      (this.cone.visible = !1),
      (this.pool = new ye(
        new da(1, t ? 16 : 32),
        new Ys({
          map: g6t(),
          color: 16777215,
          transparent: !0,
          opacity: 0,
          blending: $o,
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
    let { w: i, h: a, H: r, cell: l, x0: c, z0: h } = n,
      f = Math.ceil(s / l),
      u = -1e4,
      d = Math.round((t - c) / l),
      p = Math.round((e - h) / l);
    for (let m = p - f; m <= p + f; m += Math.max(1, f))
      for (let g = d - f; g <= d + f; g += Math.max(1, f))
        if (g >= 0 && m >= 0 && g < i && m < a) {
          let b = r[m * i + g];
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
      let i = e.roadAt(t.x, t.z, 1, t.y + n);
      if (i && i.dd <= 0.5 && i.y - t.y > 4) return !0;
    }
    {
      let n = mj(t.x, t.z) - t.y;
      if (n > 3 && n < 40) return !0;
    }
    if (this.heights?.()) {
      let n = 1e9;
      for (let [i, a] of [
        [0, 0],
        [2.5, 0],
        [-2.5, 0],
        [0, 2.5],
        [0, -2.5],
      ])
        n = Math.min(n, this.roofAt(t.x + i, t.z + a));
      if (n > t.y + 6) return !0;
    }
    return !1;
  }
  update(t, e, s, n, i, a = 0, r = null) {
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
      (this.sees = !this.leaving && l < p6t && !this.covered(e)),
      this.sees
        ? ((this.lostAt = null), (this.found = !0))
        : !this.lostAt &&
          i &&
          this.found &&
          (this.lostAt = { x: i.x, z: i.z, y: i.y ?? e.y }));
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
      let P = Math.atan2(this.z - e.z, this.x - e.x);
      ((u = this.x + Math.cos(P) * 400),
        (d = this.z + Math.sin(P) * 400),
        (p = this.y + 60));
    } else if (this.sees || !this.lostAt)
      if (this.mode === "track") {
        let P = Math.max(e.y, this.ground(e.x + h.x * 90, e.z + h.z * 90, e.y)),
          C = Math.max(36, (this.roof > -1e3 ? this.roof + pT + 8 : 0) - P),
          I = Zf(Math.max(70 + c * 0.6, C / 0.36), 70, 220);
        ((u = e.x + h.x * I + s.x * 0.5),
          (d = e.z + h.z * I + s.z * 0.5),
          (p = P + 36));
      } else if (this.mode === "set") {
        this.phT += t;
        let P = 60 + c * 1.3;
        ((u = e.x + h.x * P + f.x * this.side * 110 + s.x * 0.8),
          (d = e.z + h.z * P + f.z * this.side * 110 + s.z * 0.8),
          (p = Math.max(e.y, this.ground(u, d, e.y)) + 32),
          (Math.hypot(u - this.x, d - this.z) < 35 || this.phT > 7) &&
            ((this.mode = "cross"),
            (this.phT = 0),
            (this.c0 = { x: this.x, y: this.y, z: this.z })));
      } else {
        this.phT += t;
        let P = 4.5,
          C = Zf(this.phT / P, 0, 1),
          I = C * C * (3 - 2 * C),
          L = 55 + c * 1,
          F = this.side * 110 * (1 - 2 * I),
          O = e.x + h.x * L + f.x * F,
          B = e.z + h.z * L + f.z * F,
          H = Math.max(e.y, this.ground(O, B, e.y)) + 28;
        this.roof > -1e3 && (H = Math.max(H, this.roofAt(O, B, 10) + pT + 2));
        let N = Zf(this.phT / 1.2, 0, 1),
          D = N * N * (3 - 2 * N);
        ((m = {
          x: this.c0.x + (O - this.c0.x) * D,
          y: this.c0.y + (H - this.c0.y) * D,
          z: this.c0.z + (B - this.c0.z) * D,
        }),
          C >= 1 &&
            ((this.mode = "track"),
            (this.sweepT = 20 + Math.random() * 20),
            this.sweepN++));
      }
    else {
      this.orbit += t * 0.35;
      let P = this.lostAt;
      ((u = P.x + Math.cos(this.orbit) * 45),
        (d = P.z + Math.sin(this.orbit) * 45),
        (p = P.y + WB + 8));
    }
    (this.roofT -= t) <= 0 &&
      ((this.roofT = 0.2), (this.roof = this.roofAhead()));
    let g, b, v;
    if (m) {
      let P = 1 / Math.max(t, 0.001),
        C = (m.x - this.x) * P,
        I = (m.y - this.y) * P,
        L = (m.z - this.z) * P;
      ((g = Zf((C - this.vx) * P, -30, 30)),
        (b = Zf((L - this.vz) * P, -30, 30)),
        (v = 0),
        (this.vx = C),
        (this.vy = I),
        (this.vz = L),
        (this.x = m.x),
        (this.y = m.y),
        (this.z = m.z));
    } else {
      this.roof > -1e3 && (p = Math.max(p, this.roof + pT + 8));
      let P = 0.9,
        C = 1.9;
      ((g = (u - this.x) * P - this.vx * C),
        (b = (d - this.z) * P - this.vz * C),
        (v = (p - this.y) * 1.2 - this.vy * 2.2),
        !this.leaving &&
          this.sees &&
          ((g += s.x * C * 0.9), (b += s.z * C * 0.9)));
      let I = Math.hypot(g, b),
        L = 18;
      (I > L && ((g *= L / I), (b *= L / I)),
        (v = Zf(v, -6, 10)),
        (this.vx += g * t),
        (this.vz += b * t),
        (this.vy += v * t));
      let F = Math.hypot(this.vx, this.vz);
      (F > qB && ((this.vx *= qB / F), (this.vz *= qB / F)),
        (this.x += this.vx * t),
        (this.z += this.vz * t),
        (this.y += this.vy * t));
    }
    let x = Math.hypot(this.vx, this.vz);
    {
      let P = this.ground(this.x, this.z, this.y - WB),
        C = Math.max(P, this.roofAt(this.x, this.z, 9)) + pT;
      this.y < C + 4 &&
        ((this.vy = Math.max(this.vy, Math.min(20, (C + 4 - this.y) * 3))),
        this.y < C && (this.y = C));
    }
    let y =
      x > 6
        ? Math.atan2(-this.vx, -this.vz)
        : Math.atan2(-(e.x - this.x), -(e.z - this.z));
    this.h = Gnt(this.h + Zf(Gnt(y - this.h), -1.1 * t, 1.1 * t));
    let M = -Math.sin(this.h),
      S = -Math.cos(this.h),
      w = -S,
      _ = M,
      z = g * M + b * S,
      A = g * w + b * _;
    ((this.bank +=
      (Zf((-A / 9.8) * 0.9, m ? -0.7 : -0.5, m ? 0.7 : 0.5) - this.bank) *
      Math.min(1, t * (m ? 4 : 2.5))),
      (this.pitch +=
        (Zf((-z / 9.8) * 0.5 - x * 0.0045, -0.42, 0.2) - this.pitch) *
        Math.min(1, t * 2)));
    let T = this.root;
    ((T.visible = !0),
      T.position.set(this.x, this.y, this.z),
      T.rotation.set(this.pitch, this.h, this.bank, "YXZ"),
      (this.rot += t * 42),
      (this.main.rotation.y = this.rot),
      (this.tail.rotation.x = this.rot * 1.7),
      (this.beaconM.emissiveIntensity = this.t % 1.1 < 0.12 ? 6 : 0));
    let E = Zf((a - 0.25) / 0.35, 0, 1);
    this.light +=
      (E * (this.leaving ? 0 : 1) - this.light) * Math.min(1, t * 1.5);
    let R = this.light > 0.02;
    if (((this.cone.visible = this.pool.visible = R), R)) {
      let P, C;
      (this.sees || !this.lostAt
        ? ((P = e.x + Math.sin(this.t * 0.7) * 2.5),
          (C = e.z + Math.cos(this.t * 0.9) * 2.5))
        : ((P = this.lostAt.x + Math.sin(this.t * 0.6) * 22),
          (C = this.lostAt.z + Math.cos(this.t * 0.45) * 22)),
        (this.lx += (P - this.lx) * Math.min(1, t * 3)),
        (this.lz += (C - this.lz) * Math.min(1, t * 3)));
      let I = this.ground(this.lx, this.lz, e.y),
        L = this.x + M * 1.75,
        F = this.y + 0.5,
        O = this.z + S * 1.75,
        B = this.lx - L,
        H = I - F,
        N = this.lz - O,
        D = Math.hypot(B, H, N) || 1,
        U = 0.11 * D;
      (this.cone.position.set(L, F, O),
        this.cone.scale.set(U, D, U),
        (this._q0 ||= new dt(0, 1, 0)),
        (this._q1 ||= new dt()).set(B / D, H / D, N / D),
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
      i = s > 2 ? e.z / s : 0,
      a = Math.random() < 0.5 ? -1 : 1;
    ((this.x = t.x - n * 380 - i * 120 * a),
      (this.z = t.z - i * 380 + n * 120 * a),
      (this.y = t.y + WB + 40),
      (this.vx = e.x),
      (this.vz = e.z),
      (this.vy = 0),
      (this.h = Math.atan2(-n, -i)),
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
