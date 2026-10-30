// app 388 — math
// Lines 193502-194397 of readable/app.pretty.js (statement-aligned).
var TT = class {
  constructor(t, { rain: e = 4200, skids: s = 3200 } = {}) {
    ((this.N = 220), (this.p = []));
    let n = (c) => {
      let h = new Le();
      (h.setAttribute("position", new Te(new Float32Array(this.N * 3), 3)),
        h.setAttribute("color", new Te(new Float32Array(this.N * 4), 4)),
        h.setDrawRange(0, 0));
      let f = new _r({
          size: c,
          map: j6t(),
          transparent: !0,
          depthWrite: !1,
          vertexColors: !0,
          sizeAttenuation: !0,
          color: 16777215,
        }),
        u = new Zr(h, f);
      return (
        (u.frustumCulled = !1),
        (u.name = "Smoke"),
        (u.renderOrder = 2),
        t.add(u),
        u
      );
    };
    ((this.small = n(1.8)),
      (this.mid = n(3.4)),
      (this.big = n(5.6)),
      (this.sp = []),
      (this.NS = 160));
    {
      let c = new Le();
      (c.setAttribute("position", new Te(new Float32Array(this.NS * 3), 3)),
        c.setAttribute("color", new Te(new Float32Array(this.NS * 4), 4)),
        c.setDrawRange(0, 0));
      let h = new _r({
        size: 0.16,
        map: sN(32, [
          [0, "rgba(255,255,255,1)"],
          [0.4, "rgba(255,190,90,0.9)"],
          [1, "rgba(255,90,0,0)"],
        ]),
        transparent: !0,
        depthWrite: !1,
        vertexColors: !0,
        blending: $o,
        sizeAttenuation: !0,
      });
      ((this.sparks = new Zr(c, h)),
        (this.sparks.frustumCulled = !1),
        (this.sparks.name = "Sparks"),
        (this.sparks.renderOrder = 3),
        t.add(this.sparks));
    }
    ((this._hitSeen = 0), (this.NR = e));
    {
      let c = new Le(),
        h = this.NR * 4;
      (c.setAttribute("position", new Te(new Float32Array(h * 3), 3)),
        c.setAttribute("color", new Te(new Float32Array(h * 4), 4)));
      let f = new Uint32Array(this.NR * 6);
      for (let u = 0; u < this.NR; u++)
        f.set(
          [u * 4, u * 4 + 1, u * 4 + 2, u * 4 + 1, u * 4 + 3, u * 4 + 2],
          u * 6,
        );
      (c.setIndex(new Te(f, 1)),
        c.setDrawRange(0, 0),
        (this.rain = new ye(
          c,
          new Ys({
            vertexColors: !0,
            transparent: !0,
            depthWrite: !1,
            side: ls,
          }),
        )),
        (this.rain.frustumCulled = !1),
        (this.rain.name = "Rain"),
        (this.rain.renderOrder = 5),
        t.add(this.rain),
        (this.drops = Array.from({ length: this.NR }, () =>
          this._drop([0, 0, 0], Math.random() * 20),
        )));
    }
    ((this.NSP = 260), (this.spl = []), (this._splT = 0));
    {
      let c = new Le(),
        h = this.NSP * 8;
      (c.setAttribute("position", new Te(new Float32Array(h * 3), 3)),
        c.setAttribute("uv", new Te(new Float32Array(h * 2), 2)),
        c.setAttribute("color", new Te(new Float32Array(h * 4), 4)));
      let f = new Uint32Array(this.NSP * 12);
      for (let g = 0; g < this.NSP * 2; g++)
        f.set(
          [g * 4, g * 4 + 1, g * 4 + 2, g * 4 + 1, g * 4 + 3, g * 4 + 2],
          g * 6,
        );
      (c.setIndex(new Te(f, 1)), c.setDrawRange(0, 0));
      let u = document.createElement("canvas");
      u.width = u.height = 64;
      let d = u.getContext("2d"),
        p = d.createRadialGradient(32, 32, 0, 32, 32, 32);
      (p.addColorStop(0, "rgba(255,255,255,0.0)"),
        p.addColorStop(0.5, "rgba(255,255,255,0.04)"),
        p.addColorStop(0.78, "rgba(255,255,255,0.55)"),
        p.addColorStop(0.9, "rgba(255,255,255,0.2)"),
        p.addColorStop(1, "rgba(255,255,255,0)"),
        (d.fillStyle = p),
        d.fillRect(0, 0, 64, 64),
        (d.fillStyle = "rgba(255,255,255,0.9)"));
      for (let g = 0; g < 7; g++) {
        let b = (g / 7) * 6.283;
        (d.beginPath(),
          d.arc(
            32 + Math.cos(b) * 9,
            14 + Math.abs(Math.sin(b)) * 4,
            2.2,
            0,
            6.283,
          ),
          d.fill());
      }
      let m = new Sn(u);
      ((m.colorSpace = Je),
        (this.splash = new ye(
          c,
          new Ys({
            map: m,
            vertexColors: !0,
            transparent: !0,
            depthWrite: !1,
            side: ls,
            polygonOffset: !0,
            polygonOffsetFactor: -2,
          }),
        )),
        (this.splash.frustumCulled = !1),
        (this.splash.name = "RainSplash"),
        (this.splash.renderOrder = 4),
        t.add(this.splash));
    }
    ((this.NW = 90), (this.ws = []));
    {
      let c = new Le();
      (c.setAttribute("position", new Te(new Float32Array(this.NW * 2 * 3), 3)),
        c.setAttribute("color", new Te(new Float32Array(this.NW * 2 * 4), 4)),
        (this.streaks = new zr(
          c,
          new ua({
            vertexColors: !0,
            transparent: !0,
            depthWrite: !1,
            blending: $o,
          }),
        )),
        (this.streaks.frustumCulled = !1),
        (this.streaks.name = "Streaks"),
        (this.streaks.renderOrder = 4),
        t.add(this.streaks));
    }
    ((this.SK = s),
      (this.skIdx = 0),
      (this.last = [null, null, null, null]),
      (this.skA = new Float32Array(this.SK * 2)),
      (this.skV = [0, 0, 0, 0]));
    let i = new Le();
    (i.setAttribute("position", new Te(new Float32Array(this.SK * 4 * 3), 3)),
      i.setAttribute(
        "normal",
        new Te(
          new Float32Array(this.SK * 4 * 3).map((c, h) =>
            h % 3 === 1 ? 1 : 0,
          ),
          3,
        ),
      ),
      i.setAttribute("uv", new Te(new Float32Array(this.SK * 4 * 2), 2)),
      i.setAttribute("color", new Te(new Float32Array(this.SK * 4 * 4), 4)));
    let a = new Uint32Array(this.SK * 12);
    for (let c = 0; c < this.SK; c++)
      a.set(
        [
          c * 4,
          c * 4 + 2,
          c * 4 + 1,
          c * 4 + 1,
          c * 4 + 2,
          c * 4 + 3,
          c * 4,
          c * 4 + 1,
          c * 4 + 2,
          c * 4 + 1,
          c * 4 + 3,
          c * 4 + 2,
        ],
        c * 12,
      );
    (i.setIndex(new Te(a, 1)),
      (this.skid = new ye(
        i,
        new Ys({
          color: 394758,
          map: $6t(),
          transparent: !0,
          opacity: 0.82,
          depthWrite: !1,
          vertexColors: !0,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
        }),
      )),
      (this.skid.frustumCulled = !1),
      (this.skid.name = "Skids"),
      (this.skid.renderOrder = 1),
      t.add(this.skid));
    let r = sN(64, [
      [0, "rgba(255,255,255,1)"],
      [0.25, "rgba(120,190,255,0.9)"],
      [0.6, "rgba(60,90,255,0.35)"],
      [1, "rgba(0,0,80,0)"],
    ]);
    this.flames = [];
    for (let c of [-0.13, 0, 0.13]) {
      let h = new Jr(
        new kr({
          map: r,
          color: 16777215,
          blending: $o,
          transparent: !0,
          depthWrite: !1,
        }),
      );
      (h.position.set(c, 0.42, 2.3),
        (h.visible = !1),
        (h.name = "Flame"),
        this.flames.push(h));
    }
    let l = sN(64, [
      [0, "rgba(255,255,230,1)"],
      [0.22, "rgba(255,200,90,0.95)"],
      [0.5, "rgba(255,110,20,0.55)"],
      [0.78, "rgba(120,60,255,0.18)"],
      [1, "rgba(0,0,0,0)"],
    ]);
    ((this.fire = []), (this.fireT = 0), (this.fireK = 0), (this._gear = 1));
    for (let c of [-0.13, 0, 0.13]) {
      let h = new Jr(
        new kr({
          map: l,
          color: 16777215,
          blending: $o,
          transparent: !0,
          depthWrite: !1,
        }),
      );
      (h.position.set(c, 0.42, 2.34),
        (h.visible = !1),
        (h.name = "Backfire"),
        this.fire.push(h));
    }
    ((this.NT = 40), (this.trail = [[], []]));
    {
      let c = new Le(),
        h = 2 * this.NT * 2;
      (c.setAttribute("position", new Te(new Float32Array(h * 3), 3)),
        c.setAttribute("color", new Te(new Float32Array(h * 4), 4)));
      let f = [];
      for (let u = 0; u < 2; u++)
        for (let d = 0; d < this.NT - 1; d++) {
          let p = (u * this.NT + d) * 2;
          f.push(p, p + 1, p + 2, p + 1, p + 3, p + 2);
        }
      (c.setIndex(f),
        c.setDrawRange(0, 0),
        (this.trails = new ye(
          c,
          new Ys({
            vertexColors: !0,
            transparent: !0,
            depthWrite: !1,
            blending: $o,
            side: ls,
          }),
        )),
        (this.trails.frustumCulled = !1),
        (this.trails.name = "TailTrails"),
        (this.trails.renderOrder = 3),
        t.add(this.trails));
    }
    ((this.tailP = [new dt(-0.62, 0.8, 2.2), new dt(0.62, 0.8, 2.2)]),
      (this.contact = new ye(MF(), wF().clone())),
      (this.contact.name = "ContactShadow"),
      (this.contact.renderOrder = 1),
      (this.contact.matrixAutoUpdate = !1),
      (this.contact.frustumCulled = !1),
      (this.contact.castShadow = !1),
      (this.contact.receiveShadow = !1),
      t.add(this.contact),
      (this._cp = new dt()),
      (this.contact2 = this.contact.clone()),
      (this.contact2.material = this.contact.material),
      (this.contact2.name = "ContactShadow2"),
      (this.contact2.matrix = new fe()),
      t.add(this.contact2),
      (this.contact3 = this.contact.clone()),
      (this.contact3.material = this.contact.material),
      (this.contact3.name = "ContactShadow3"),
      (this.contact3.matrix = new fe()),
      t.add(this.contact3));
  }
  attach(t) {
    if (!t.dims?.tail || t.dims.pipes)
      for (let n of [...this.flames, ...this.fire]) t.body.add(n);
    if (
      (t.dims?.pipes
        ? (this.flames.forEach((n, i) => n.position.set(...t.dims.pipes[i])),
          this.fire.forEach((n, i) =>
            n.position.set(
              t.dims.pipes[i][0],
              t.dims.pipes[i][1],
              t.dims.pipes[i][2] + 0.04,
            ),
          ))
        : [-0.13, 0, 0.13].forEach((n, i) => {
            (this.flames[i].position.set(n, 0.42, 2.3),
              this.fire[i].position.set(n, 0.42, 2.34));
          }),
      t.dims?.tail)
    ) {
      t.dims.tail.forEach((n, i) => this.tailP[i].set(...n));
      return;
    }
    let e = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      s = new dt();
    for (let n of t.lamps?.tail || []) {
      let i = n.geometry?.attributes?.position;
      if (i) {
        n.updateMatrix();
        for (let a = 0; a < i.count; a += 3) {
          s.fromBufferAttribute(i, a).applyMatrix4(n.matrix);
          let r = e[s.x < 0 ? 0 : 1];
          ((r[0] += s.x), (r[1] += s.y), (r[2] += s.z), r[3]++);
        }
      }
    }
    e.forEach((n, i) => {
      n[3] > 10 &&
        this.tailP[i].set(n[0] / n[3], n[1] / n[3], n[2] / n[3] + 0.04);
    });
  }
  pop(t = 1) {
    ((this.fireT = Math.max(this.fireT, 0.06 + 0.07 * t)),
      (this.fireK = Math.max(this.fireK, 0.6 + 0.6 * t)));
  }
  _drop(t, e) {
    let s = Math.random() * 6.2832,
      n = 0.6 + 21 * Math.random() ** 2.2;
    return [Math.cos(s) * n, e, Math.sin(s) * n];
  }
  _rain(t, e, s, n, i) {
    let a = n > 0,
      r = this.rain.geometry.attributes.position.array,
      l = this.rain.geometry.attributes.color.array;
    if (!a) {
      this.rain.geometry.drawRange.count &&
        (this.rain.geometry.setDrawRange(0, 0),
        this.splash.geometry.setDrawRange(0, 0),
        (this.spl.length = 0));
      return;
    }
    let c = s.position,
      h = c.x,
      f = c.y,
      u = c.z,
      d = 14,
      p = -7,
      m = this._rcx === void 0 ? 0 : h - this._rcx,
      g = this._rcx === void 0 ? 0 : u - this._rcz;
    ((this._rcx = h), (this._rcz = u));
    let b = [1.4, -9.5, 0.7],
      v = 1 / 28,
      x = e.vel.x,
      y = e.vel.z,
      M = 0.8 + 0.6 * i,
      S = 0.7 * M,
      w = 0.74 * M,
      _ = 0.8 * M,
      z = 0;
    for (let B = 0; B < this.NR; B++) {
      let H = this.drops[B];
      if (
        ((H[0] += b[0] * t - m),
        (H[1] += b[1] * t),
        (H[2] += b[2] * t - g),
        H[1] < p || H[0] * H[0] + H[2] * H[2] > 529)
      ) {
        let ot = this._drop(null, d);
        ((H[0] = ot[0]),
          (H[1] =
            H[1] < p ? d - Math.random() * 2 : p + Math.random() * (d - p)),
          (H[2] = ot[2]));
      }
      let N = h + H[0],
        D = f + H[1],
        U = u + H[2],
        G = Math.hypot(H[0], H[1], H[2]),
        W = (b[0] - x) * v,
        V = b[1] * v,
        $ = (b[2] - y) * v,
        J = N + W,
        X = D + V,
        tt = U + $,
        Z = Math.max(0.005, G * 0.0026),
        q = V * (U - u) - $ * (D - f),
        j = $ * (N - h) - W * (U - u),
        K = W * (D - f) - V * (N - h),
        nt = Math.hypot(q, j, K) || 1;
      ((q *= Z / nt), (j *= Z / nt), (K *= Z / nt));
      let Q =
          n *
          0.5 *
          Math.min(1, Math.max(0, (G - 1) / 3)) *
          Math.max(0, 1 - G / 24),
        et = z * 12;
      ((r[et] = N - q),
        (r[et + 1] = D - j),
        (r[et + 2] = U - K),
        (r[et + 3] = N + q),
        (r[et + 4] = D + j),
        (r[et + 5] = U + K),
        (r[et + 6] = J - q),
        (r[et + 7] = X - j),
        (r[et + 8] = tt - K),
        (r[et + 9] = J + q),
        (r[et + 10] = X + j),
        (r[et + 11] = tt + K));
      let st = z * 16;
      ((l[st] = S),
        (l[st + 1] = w),
        (l[st + 2] = _),
        (l[st + 3] = Q * 0.35),
        (l[st + 4] = S),
        (l[st + 5] = w),
        (l[st + 6] = _),
        (l[st + 7] = Q * 0.35),
        (l[st + 8] = S),
        (l[st + 9] = w),
        (l[st + 10] = _),
        (l[st + 11] = Q),
        (l[st + 12] = S),
        (l[st + 13] = w),
        (l[st + 14] = _),
        (l[st + 15] = Q),
        z++);
    }
    (this.rain.geometry.setDrawRange(0, z * 6),
      (this.rain.geometry.attributes.position.needsUpdate = !0),
      (this.rain.geometry.attributes.color.needsUpdate = !0));
    let A = new dt();
    s.getWorldDirection(A);
    let T = Math.hypot(A.x, A.z) || 1,
      E = A.x / T,
      R = A.z / T;
    for (this._splT += t * 240 * n; this._splT >= 1;) {
      this._splT -= 1;
      let B = (Math.random() - 0.5) * 1.9,
        H = 1.5 + 15 * Math.random() ** 1.3,
        N = Math.cos(B),
        D = Math.sin(B),
        U = h + (E * N - R * D) * H,
        G = u + (R * N + E * D) * H,
        W = Wi(U, G);
      !Number.isFinite(W) ||
        Math.abs(W - f) > 12 ||
        this.spl.push({
          x: U,
          y: W + 0.02,
          z: G,
          age: 0,
          life: 0.22 + Math.random() * 0.12,
          s: 0.7 + Math.random() * 0.6,
        });
    }
    this.spl.length > this.NSP &&
      this.spl.splice(0, this.spl.length - this.NSP);
    let P = this.splash.geometry.attributes.position.array,
      C = this.splash.geometry.attributes.uv.array,
      I = this.splash.geometry.attributes.color.array,
      L = 0,
      F = -R,
      O = E;
    for (let B = this.spl.length - 1; B >= 0; B--) {
      let H = this.spl[B];
      if (((H.age += t), H.age > H.life)) {
        this.spl.splice(B, 1);
        continue;
      }
      let N = H.age / H.life,
        D = (0.03 + 0.16 * Math.sqrt(N)) * H.s,
        U = (1 - N) * n * 0.3,
        G = L * 24,
        W = L * 16,
        V = L * 32;
      (P.set(
        [
          H.x - D,
          H.y,
          H.z - D,
          H.x + D,
          H.y,
          H.z - D,
          H.x - D,
          H.y,
          H.z + D,
          H.x + D,
          H.y,
          H.z + D,
        ],
        G,
      ),
        C.set([0, 0, 1, 0, 0, 1, 1, 1], W));
      let $ = (0.03 + 0.09 * Math.sin(Math.PI * Math.min(1, N * 1.4))) * H.s,
        J = D * 0.9;
      (P.set(
        [
          H.x - F * J,
          H.y,
          H.z - O * J,
          H.x + F * J,
          H.y,
          H.z + O * J,
          H.x - F * J,
          H.y + $,
          H.z - O * J,
          H.x + F * J,
          H.y + $,
          H.z + O * J,
        ],
        G + 12,
      ),
        C.set([0, 0.42, 1, 0.42, 0, 0.98, 1, 0.98], W + 8));
      for (let X = 0; X < 8; X++)
        I.set([S * 1.3, w * 1.3, _ * 1.3, X < 4 ? U : U * (1 - N)], V + X * 4);
      L++;
    }
    this.splash.geometry.setDrawRange(0, L * 12);
    for (let B of ["position", "uv", "color"])
      this.splash.geometry.attributes[B].needsUpdate = !0;
  }
  update(t, e, s, n = 1, i = null, a = null, r = 0) {
    s.root.updateMatrixWorld(!0);
    let l = s.dims,
      c = (
        l?.wheels || [
          [-0.86, -1.16],
          [0.85, -1.16],
          [-0.85, 1.49],
          [0.85, 1.49],
        ]
      ).map(([E, R]) => new dt(E, 0, R).applyMatrix4(s.model.matrixWorld)),
      h = e.speed,
      f = this._dh || (this._dh = (E, R) => Wi(E, R, null, this._hy));
    this._hy = e.pos.y;
    {
      let E = this._cp
          .set(0, 0, l ? l.cz : 0.165)
          .applyMatrix4(s.model.matrixWorld),
        R = f(E.x, E.z),
        P = Math.max(0, s.model.matrixWorld.elements[13] - R),
        C = l ? l.w : 1.94,
        I = l ? l.l : 4.53;
      (Of(this.contact.matrix, E.x, E.z, e.psi, C, I, f),
        this.contact.matrixWorld.copy(this.contact.matrix),
        (this.contact.material.opacity = Math.max(0, 1 - P / 2.2) ** 1.5),
        (this.contact.visible = P < 2.2),
        Of(this.contact2.matrix, E.x, E.z, e.psi, C * 0.835, I * 0.894, f),
        (this.contact2.matrix.elements[13] += 0.004),
        this.contact2.matrixWorld.copy(this.contact2.matrix),
        (this.contact2.visible = this.contact.visible),
        Of(this.contact3.matrix, E.x, E.z, e.psi, C * 0.7, I * 0.82, f),
        (this.contact3.matrix.elements[13] += 0.008),
        this.contact3.matrixWorld.copy(this.contact3.matrix),
        (this.contact3.visible = this.contact.visible));
    }
    for (let E = 0; E < 4; E++) {
      let R = e.slip[E];
      if (R < 0.25 || !e.onGround) continue;
      let P =
          E >= 2
            ? Math.max(0, Math.min(1, ((e.kappa?.[E] ?? 0) - 0.3) * 2)) *
              Math.max(0, 1 - h / 8.5)
            : 0,
        C =
          (E >= 2 ? 1 : 0.45) *
          R *
          38 *
          t *
          Math.max(Math.min(1, 0.35 + h / 12), P * 1.6);
      for (let I = 0; I < C; I++)
        Math.random() < C - I &&
          this.p.push({
            x: c[E].x + (Math.random() - 0.5) * (0.3 + 0.9 * P),
            y: c[E].y + 0.25,
            z: c[E].z + (Math.random() - 0.5) * (0.3 + 0.9 * P),
            vx: e.vel.x * 0.25 * (1 - P) + (Math.random() - 0.5) * (1 + P),
            vy: 0.5 + Math.random() * 0.6,
            vz: e.vel.z * 0.25 * (1 - P) + (Math.random() - 0.5) * (1 + P),
            age: 0,
            life: 1.4 + Math.random() * 1.3 + P * 1.4,
            a: 0.1 + 0.16 * R,
          });
    }
    this.p.length > this.N * 3 && this.p.splice(0, this.p.length - this.N * 3);
    let u = 0,
      d = 0,
      p = 0,
      m = this.small.geometry.attributes.position.array,
      g = this.small.geometry.attributes.color.array,
      b = this.big.geometry.attributes.position.array,
      v = this.big.geometry.attributes.color.array,
      x = this.mid.geometry.attributes.position.array,
      y = this.mid.geometry.attributes.color.array,
      M = 0.56 + 0.34 * n;
    for (let E = this.p.length - 1; E >= 0; E--) {
      let R = this.p[E];
      if (((R.age += t), R.age > R.life)) {
        this.p.splice(E, 1);
        continue;
      }
      let P = Math.exp(-t * 1.2);
      ((R.vx *= P),
        (R.vz *= P),
        (R.vy *= Math.exp(-t * 0.5)),
        (R.x += R.vx * t),
        (R.y += R.vy * t),
        (R.z += R.vz * t));
      let C = R.age / R.life,
        I = R.a * Math.sin(Math.PI * Math.min(1, C * 1.3)) * (1 - C),
        L = R.c ? M * R.c[0] : M,
        F = R.c ? M * R.c[1] : M,
        O = R.c ? M * R.c[2] : M * 1.02;
      C < 0.22 && u < this.N
        ? (m.set([R.x, R.y, R.z], u * 3),
          g.set([L, F, O, I * 0.55], u * 4),
          u++)
        : C < 0.55 && d < this.N
          ? (x.set([R.x, R.y, R.z], d * 3),
            y.set([L, F, O, I * 0.8], d * 4),
            d++)
          : p < this.N &&
            (b.set([R.x, R.y, R.z], p * 3),
            v.set([L, F, O, I * 0.62], p * 4),
            p++);
    }
    for (let [E, R] of [
      [this.small, u],
      [this.mid, d],
      [this.big, p],
    ])
      nN(E.geometry, R);
    let S = this.skid.geometry.attributes.position.array,
      w = this.skid.geometry.attributes.color.array,
      _ = this.skid.geometry.attributes.uv.array,
      z = !1,
      A = new dt(Math.cos(e.psi), 0, -Math.sin(e.psi)).multiplyScalar(0.14);
    for (let E = 0; E < 4; E++) {
      let R = e.slip[E],
        P = c[E];
      if (R < 0.35 || !e.onGround || h < 0.6) {
        this.last[E] = null;
        continue;
      }
      let C = f(P.x, P.z) + 0.025,
        I = {
          l: [P.x - A.x, C, P.z - A.z],
          r: [P.x + A.x, C, P.z + A.z],
          a: Math.min(1, (R - 0.3) * 1.6),
        },
        L = this.last[E],
        F = L
          ? Math.hypot(P.x - (L.l[0] + L.r[0]) / 2, P.z - (L.l[2] + L.r[2]) / 2)
          : 0;
      if (
        (L &&
          (F > Math.max(2.5, h * t * 2.5) || Math.abs(C - L.l[1]) > 1.5) &&
          (this.last[E] = L = null),
        L && F > 0.35)
      ) {
        let O = this.skIdx++ % this.SK,
          B = this.skV[E],
          H = B + F / 1.2;
        if (
          ((this.skV[E] = H % 64),
          S.set([...L.l, ...L.r, ...I.l, ...I.r], O * 12),
          _.set([0, B, 1, B, 0, H, 1, H], O * 8),
          (this.skA[O * 2] = L.a),
          (this.skA[O * 2 + 1] = I.a),
          w.set(
            [1, 1, 1, L.a, 1, 1, 1, L.a, 1, 1, 1, I.a, 1, 1, 1, I.a],
            O * 16,
          ),
          this.skIdx > this.SK - 96)
        )
          for (let N = 1; N <= 96; N++) {
            let D = (O + N) % this.SK,
              U = (N - 1) / 96;
            ((w[D * 16 + 3] = w[D * 16 + 7] = this.skA[D * 2] * U),
              (w[D * 16 + 11] = w[D * 16 + 15] = this.skA[D * 2 + 1] * U));
          }
        ((this.last[E] = I), (z = !0));
      } else L || ((this.last[E] = I), (this.skV[E] = 0));
    }
    if (z) {
      let E = this.skid.geometry.attributes;
      ((E.position.needsUpdate = !0),
        (E.color.needsUpdate = !0),
        (E.uv.needsUpdate = !0));
    }
    if (i)
      for (let E of i) {
        if (
          E.t <= this._hitSeen ||
          ((this._hitSeen = E.t), E.s < 0.03 || h < 5)
        )
          continue;
        let R = Math.min(40, 8 + E.s * 60),
          P = f(E.x, E.z) + 0.4;
        for (let C = 0; C < R; C++)
          this.sp.push({
            x: E.x,
            y: P,
            z: E.z,
            vx: e.vel.x * 0.6 + (Math.random() - 0.5) * 6,
            vy: 1 + Math.random() * 3.5,
            vz: e.vel.z * 0.6 + (Math.random() - 0.5) * 6,
            age: 0,
            life: 0.25 + Math.random() * 0.35,
          });
      }
    this.sp.length > this.NS && this.sp.splice(0, this.sp.length - this.NS);
    {
      let E = this.sparks.geometry.attributes.position.array,
        R = this.sparks.geometry.attributes.color.array,
        P = 0;
      for (let C = this.sp.length - 1; C >= 0; C--) {
        let I = this.sp[C];
        if (((I.age += t), I.age > I.life)) {
          this.sp.splice(C, 1);
          continue;
        }
        ((I.vy -= 9.8 * t),
          (I.x += I.vx * t),
          (I.y += I.vy * t),
          (I.z += I.vz * t));
        let L = 1 - I.age / I.life;
        (E.set([I.x, I.y, I.z], P * 3),
          R.set([4 * L, 2.4 * L, 1 * L, L], P * 4),
          P++);
      }
      nN(this.sparks.geometry, P);
    }
    if (a) {
      let E =
          Math.max(0, Math.min(1, (e.kmh - 160) / 120)) + (e.nitroOn ? 0.7 : 0),
        R = this.streaks.geometry.attributes.position.array,
        P = this.streaks.geometry.attributes.color.array,
        C = e.vel.x,
        I = e.vel.z,
        L = Math.hypot(C, I) || 1,
        F = C / L,
        O = I / L;
      for (; this.ws.length < this.NW * Math.min(1, E);) {
        let H = Math.random() * Math.PI * 2,
          N = 2.5 + Math.random() * 6;
        this.ws.push({
          x: a.position.x + F * (25 + Math.random() * 30) + Math.cos(H) * N * O,
          y: a.position.y + Math.sin(H) * N * 0.6,
          z: a.position.z + O * (25 + Math.random() * 30) - Math.cos(H) * N * F,
          age: 0,
          life: 0.6,
        });
      }
      let B = 0;
      for (let H = this.ws.length - 1; H >= 0; H--) {
        let N = this.ws[H];
        N.age += t;
        let D = (N.x - a.position.x) * F + (N.z - a.position.z) * O;
        if (N.age > N.life || D < -2 || E <= 0) {
          this.ws.splice(H, 1);
          continue;
        }
        let U = 0.06 * L,
          G = Math.sin((Math.PI * N.age) / N.life) * 0.35 * Math.min(1, E);
        (R.set([N.x, N.y, N.z, N.x - F * U, N.y, N.z - O * U], B * 6),
          P.set([G, G, G * 1.05, 1, 0, 0, 0, 0], B * 8),
          B++);
      }
      nN(this.streaks.geometry, B * 2);
    }
    a && this._rain(t, e, a, r, n);
    let T = e.nitroOn;
    for (let E of this.flames)
      if (((E.visible = T), T)) {
        let R = 0.35 + Math.random() * 0.3;
        E.scale.set(R, R, R);
      }
    (e.gear > this._gear &&
      !e.reverse &&
      e.speed > 8 &&
      e.rpm > 5200 &&
      this.pop(0.7 + 0.3 * Math.min(1, (e.rpm - 5200) / 3500)),
      (this._gear = e.gear),
      (this.fireT -= t));
    for (let E of this.fire) {
      let R = this.fireT > 0 && !T;
      if (((E.visible = R), R)) {
        let P = (0.22 + Math.random() * 0.3) * this.fireK;
        (E.scale.set(P, P * (0.8 + Math.random() * 0.4), P),
          (E.material.opacity = 0.7 + 0.3 * Math.random()));
      }
    }
    if (a) {
      let E = Math.max(0, Math.min(1, (e.kmh - 130) / 140)),
        R = e.brake > 0.1 ? 1 : 0,
        P = E * (0.2 + 0.8 * R),
        C = 0.16,
        I = this.trails.geometry.attributes.position.array,
        L = this.trails.geometry.attributes.color.array,
        F = s.body.matrixWorld,
        O = a.position,
        B = new dt(),
        H = new dt(),
        N = new dt(),
        D = 0;
      for (let U = 0; U < 2; U++) {
        let G = this.trail[U];
        for (let $ of G) $.age += t;
        for (; G.length && G[0].age > C;) G.shift();
        if (P > 0.01 && e.onGround !== !1) {
          let $ = this.tailP[U].clone().applyMatrix4(F);
          G.push({ x: $.x, y: $.y, z: $.z, age: 0 });
        } else G.length = 0;
        G.length > this.NT && G.splice(0, G.length - this.NT);
        let W = G.length,
          V = U * this.NT * 2;
        for (let $ = 0; $ < W; $++) {
          let J = G[$],
            X = G[Math.min(W - 1, $ + 1)],
            tt = G[Math.max(0, $ - 1)];
          (H.set(X.x - tt.x, X.y - tt.y, X.z - tt.z),
            B.set(O.x - J.x, O.y - J.y, O.z - J.z),
            N.crossVectors(H, B));
          let Z = N.length() || 1,
            q = 1 - J.age / C,
            j = 0.03 * (0.3 + 0.7 * q);
          (N.multiplyScalar(j / Z),
            I.set(
              [
                J.x + N.x,
                J.y + N.y,
                J.z + N.z,
                J.x - N.x,
                J.y - N.y,
                J.z - N.z,
              ],
              (V + $ * 2) * 3,
            ));
          let K = P * q * q * q * ($ === W - 1 ? 0.4 : 1);
          L.set(
            [2.6 * K, 0.12 * K, 0.06 * K, 1, 2.6 * K, 0.12 * K, 0.06 * K, 1],
            (V + $ * 2) * 4,
          );
        }
        for (let $ = W; $ < this.NT; $++)
          (W
            ? I.copyWithin(
                (V + $ * 2) * 3,
                (V + (W - 1) * 2) * 3,
                (V + W * 2) * 3,
              )
            : I.fill(0, (V + $ * 2) * 3, (V + $ * 2 + 2) * 3),
            L.fill(0, (V + $ * 2) * 4, (V + $ * 2 + 2) * 4));
        D = Math.max(D, W);
      }
      ((this.trails.visible = D > 1),
        this.trails.geometry.setDrawRange(0, 2 * (this.NT - 1) * 6),
        (this.trails.geometry.attributes.position.needsUpdate = !0),
        (this.trails.geometry.attributes.color.needsUpdate = !0));
    }
  }
};
