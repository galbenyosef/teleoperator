// app 376 — math
// Lines 183069-186080 of readable/app.pretty.js (statement-aligned).
var fT = class {
  swapModel(t, e) {
    let s = this.sets[t]?.meshes?.[0];
    s && e?.geo && (s.geometry = e.geo);
  }
  constructor(
    t,
    e,
    {
      max: s = 70,
      seed: n = 1,
      models: i = null,
      roads: a = null,
      extra: r = 0,
    } = {},
  ) {
    ((this.max = s),
      (this.cars = []),
      (this.t = 0),
      (this.models = i),
      (this.roads = a),
      (this.frame = 0));
    let l = n;
    this.nextId = () => (l = (l * 48271) % 2147483647) / 2147483647;
    let c = n;
    this.rnd = () => (c = (c * 16807) % 2147483647) / 2147483647;
    let h = (f, u, d, p) => {
      let m = new En(f, u, Math.max(1, d));
      return (
        (m.count = 0),
        (m.frustumCulled = !1),
        (m.castShadow = !0),
        (m.receiveShadow = !0),
        (m.name = p),
        (m.userData.mbMover = !0),
        t?.add(m),
        m
      );
    };
    if (((this.sets = {}), (this.objects = []), i)) {
      for (let [f, u] of Object.entries(i)) {
        let d =
            (f === "cablecar"
              ? 12
              : f === "bus"
                ? 10
                : f === "police"
                  ? 8
                  : m4[f]
                    ? Math.min(s, 16)
                    : s) + (f === "police" ? 0 : r),
          p = h(u.geo, u.mat, d, "Traffic_" + f);
        ((p.userData.mbReflR = u.geo1 ? VB + 15 : 470),
          p.setColorAt(0, Yx),
          (this.sets[f] = { meshes: [p], paint: p, livery: u.livery, n: 0 }),
          this.objects.push(p));
        {
          let m = e_(f, p);
          m &&
            ((m.userData.mbMover = !0),
            (m.userData.mbReflR = p.userData.mbReflR),
            this.sets[f].meshes.push(m),
            t?.add(m),
            this.objects.push(m));
        }
        if (u.geo1) {
          let m = h(u.geo1, u.mat, d, "Traffic_" + f + "_lod1");
          ((m.userData.mbReflR = 470),
            (m.castShadow = !1),
            m.setColorAt(0, Yx),
            (this.sets[f].far = m),
            (this.sets[f].nf = 0),
            this.objects.push(m));
        }
      }
      if (a) {
        let f = new me({
          vertexColors: !0,
          roughness: 0.38,
          metalness: 0.05,
          side: ls,
        });
        for (let u = 0; u < 4; u++) {
          let d = h(tJ(u), f, 3, "Streetcar" + u);
          ((d.userData.mbReflR = 470),
            (this.sets["streetcar" + u] = { meshes: [d], paint: null, n: 0 }),
            this.objects.push(d),
            (Io["streetcar" + u] = KL));
        }
      }
    } else {
      let f = QY().map(({ body: d, wheels: p, lamps: m }) => {
        let g = h(d, e.car, s, "Traffic"),
          b = h(p, e.tire, s, "Traffic"),
          v = h(m, e.tlamp, s, "Traffic");
        return (
          (v.castShadow = !1),
          this.objects.push(g, b, v),
          { meshes: [g, b, v], paint: g, lamps: v, n: 0 }
        );
      });
      for (let [d, p] of Object.entries(o6t)) this.sets[d] = f[p];
      let u = h(Gz(), e.cable, 12, "CableCars");
      (this.objects.push(u),
        (this.sets.cablecar = { meshes: [u], paint: null, n: 0 }));
    }
    ((this.blobs = m_(s + 30 + r, "TrafficShadows")),
      (this.blobs.count = 0),
      (this.blobs.frustumCulled = !1),
      this.objects.push(this.blobs),
      t?.add(this.blobs),
      (this.cableLines = [
        ...ps.map((f, u) => (f.cable ? ["c", u] : null)),
        ...ns.map((f, u) => (f.cable ? ["r", u] : null)),
      ].filter(Boolean)),
      (this.busLines = [
        ...ps.map((f, u) => (a6t.includes(f.name) ? ["c", u] : null)),
        ...ns.map((f, u) => (r6t.includes(f.name) ? ["r", u] : null)),
      ].filter(Boolean)),
      (this.colliders = []),
      (this._m = new fe()),
      (this._q = new tn()),
      (this._e = new vi(0, 0, 0, "YXZ")),
      (this._p = new dt()),
      (this._s = new dt(1, 1, 1)),
      (this._c = new It()),
      (this._pz = {}),
      (this._bz = {}),
      (this._bc = null),
      (this._plane = (f, u) => {
        let d = this._bc;
        return d.y + ((f - d.x) * d.fx + (u - d.z) * d.fz) * Math.tan(d.pitch);
      }));
  }
  spawnNear(t, e) {
    for (let s = 0; s < 20; s++) {
      let n = this.rnd() < 0.5 ? "c" : "r";
      if (n === "c") {
        let i = la(
            Math.round((t - he[0]) / 105 + (this.rnd() - 0.5) * 6),
            0,
            xn - 1,
          ),
          a = e + (this.rnd() - 0.5) * 520;
        if (a < pe[0] + 10 || a > pe[ks - 1] - 10) continue;
        let r = ps[i],
          l = this.rnd() < 0.5 ? 1 : -1,
          c = Math.floor(this.rnd() * r.lanes),
          h = he[i] - l * Lc(r, c);
        if (Math.hypot(h - t, a - e) < 90 || this.occupied(h, a, 9)) continue;
        return this.add({ axis: n, idx: i, dir: l, lane: c, x: h, z: a });
      } else {
        let i = la(
            Math.round((e - pe[1]) / 84 + (this.rnd() - 0.5) * 7),
            0,
            ks - 1,
          ),
          a = t + (this.rnd() - 0.5) * 520;
        if (
          a < he[0] + 10 ||
          a > he[xn - 1] - 10 ||
          (i === 4 && a > he[3] - 10 && a < he[4] + 10)
        )
          continue;
        let r = ns[i],
          l = this.rnd() < 0.5 ? 1 : -1,
          c = Math.floor(this.rnd() * r.lanes),
          h = pe[i] + l * Lc(r, c);
        if (Math.hypot(a - t, h - e) < 90 || this.occupied(a, h, 9)) continue;
        return this.add({ axis: n, idx: i, dir: l, lane: c, x: a, z: h });
      }
    }
    return null;
  }
  occupied(t, e, s) {
    return this.cars.some((n) => Math.hypot(n.x - t, n.z - e) < s + n.V.L / 2);
  }
  look(t, e = null) {
    let s =
      t === "cable"
        ? "cablecar"
        : t === "bus"
          ? "bus"
          : t === "tram"
            ? "streetcar" + ((this._tramN = (this._tramN || 0) + 1) % 4)
            : "sedan";
    if (!t) {
      let i = e6t.filter(([r]) => this.sets[r]),
        a = this.rnd() * i.reduce((r, l) => r + l[1], 0);
      for (let [r, l] of i)
        if ((a -= l) <= 0) {
          s = r;
          break;
        }
    }
    s === "semi" && !s6t(e) && (s = this.sets.boxtruck ? "boxtruck" : "sedan");
    let n =
      s === "taxi"
        ? Wz
        : this.sets[s]?.livery
          ? Yx
          : _h[Math.floor(this.rnd() * _h.length)];
    return [s, n];
  }
  add(t, e = null) {
    let s = e === "cable",
      n = e === "bus",
      [i, a] = this.look(e),
      r = t.axis === "c" ? ps[t.idx] : ns[t.idx],
      l = {
        ...t,
        kind: i,
        V: Io[i],
        dyn: m4[i],
        color: a,
        v: 4,
        vT: s
          ? 4.2
          : n
            ? r.lanes > 1
              ? 11
              : 9
            : (r.lanes > 1 ? 15 : 11.5) * (0.85 + this.rnd() * 0.3),
        cable: s,
        bus: n,
        line: !!e,
        heading: 0,
        turn: null,
        stopT: 0,
        brake: 0,
        wreck: null,
        y: 0,
        pitch: 0,
        id: this.nextId(),
      };
    return (
      (l.heading =
        t.axis === "c"
          ? t.dir > 0
            ? Math.PI
            : 0
          : t.dir > 0
            ? -Math.PI / 2
            : Math.PI / 2),
      this.cars.push(l),
      l
    );
  }
  nextNode(t) {
    if (t.axis === "c") {
      let n = pe,
        i =
          t.dir > 0
            ? n.findIndex((a) => a > t.z + 0.5)
            : [...n.keys()].reverse().find((a) => n[a] < t.z - 0.5);
      return i == null || i < 0
        ? null
        : { i: t.idx, j: i, d: Math.abs(pe[i] - t.z) };
    }
    let e = he,
      s =
        t.dir > 0
          ? e.findIndex((n) => n > t.x + 0.5)
          : [...e.keys()].reverse().find((n) => e[n] < t.x - 0.5);
    return s == null || s < 0
      ? null
      : { i: s, j: t.idx, d: Math.abs(he[s] - t.x) };
  }
  planTurn(t, e) {
    if (t.line) return null;
    let s = [],
      n = (_, z, A, T) => _ === "r" && z === 4 && Math.min(A, A + T) === 3,
      i = (_, z, A) =>
        (_ === "c"
          ? A > 0
            ? e.j < ks - 1
            : e.j > 0
          : A > 0
            ? e.i < xn - 1
            : e.i > 0) && !n(_, z, e.i, A),
      a = t.axis === "c" ? ["c", t.idx, t.dir] : ["r", t.idx, t.dir],
      r = t.axis === "c" ? ["r", e.j, -t.dir] : ["c", e.i, t.dir],
      l = t.axis === "c" ? ["r", e.j, t.dir] : ["c", e.i, -t.dir];
    if (
      (i(...a) && s.push([a, 0.62]),
      i(...r) && s.push([r, 0.22]),
      i(...l) && s.push([l, 0.16]),
      !s.length)
    )
      return null;
    let c = this.rnd() * s.reduce((_, z) => _ + z[1], 0),
      h = s[0][0];
    for (let [_, z] of s)
      if ((c -= z) <= 0) {
        h = _;
        break;
      }
    if (h === a) return null;
    let [f, u, d] = h,
      p = f === "c" ? ps[u] : ns[u],
      m = 0,
      g = t.axis === "c" ? ns[e.j] : ps[e.i],
      b = f === "c" ? he[u] - d * Lc(p, m) : he[e.i] + d * (ps[e.i].hw + 1.5),
      v = f === "c" ? pe[e.j] + d * (ns[e.j].hw + 1.5) : pe[u] + d * Lc(p, m),
      x = t.axis === "c" ? t.x : he[e.i] - t.dir * (g.hw + 1.5),
      y = t.axis === "c" ? pe[e.j] - t.dir * (g.hw + 1.5) : t.z,
      M = t.axis === "c" ? x : b,
      S = t.axis === "c" ? v : y,
      w = Math.hypot(M - x, S - y) + Math.hypot(b - M, v - S);
    return {
      p0: [x, y],
      p1: [M, S],
      p2: [b, v],
      len: w,
      t: 0,
      to: { axis: f, idx: u, dir: d, lane: m },
    };
  }
  setEnabled(t) {
    ((t = !!t),
      (this.enabled !== !1) !== t &&
        ((this.enabled = t),
        t ||
          ((this.cars.length = 0),
          (this.colliders.length = 0),
          this.ghosts?.clear(),
          (this.cableDone = !1),
          (this.started = !1),
          this.draw())));
  }
  update(t, e, s, n = !0) {
    if (this.enabled === !1) {
      if (this.roads && this.cars.length)
        return ((this._offDrawn = !0), this.updateReal(t, e, !1, s));
      ((this.t += t),
        this.frame++,
        this._offDrawn &&
          ((this._offDrawn = !1), (this.colliders.length = 0), this.draw()));
      return;
    }
    if (this.roads) return this.updateReal(t, e, n, s);
    this.t += t;
    let i = e.pos.x,
      a = e.pos.z;
    if (n) {
      for (let h = this.cars.length - 1; h >= 0; h--) {
        let f = this.cars[h];
        Math.hypot(f.x - i, f.z - a) > 380 && this.cars.splice(h, 1);
      }
      let l = 0;
      for (; this.cars.length < this.max && l++ < 4;) this.spawnNear(i, a);
      let c = (h, f, u) => {
        if (
          this.max <= 0 ||
          !this.sets[f === "cable" ? "cablecar" : "bus"] ||
          this.cars.filter((M) => (f === "cable" ? M.cable : M.bus)).length >= u
        )
          return;
        let [d, p] = h[Math.floor(this.rnd() * h.length)],
          m = this.rnd() < 0.5 ? 1 : -1,
          g = d === "c" ? ps[p] : ns[p],
          b = f === "cable" ? 0 : g.lanes - 1,
          v = (d === "c" ? a : i) + (this.rnd() - 0.5) * 500,
          x =
            d === "c"
              ? he[p] - m * Lc(g, b)
              : la(v, he[0] + 20, he[xn - 1] - 20),
          y =
            d === "c"
              ? la(v, pe[0] + 20, pe[ks - 1] - 20)
              : pe[p] + m * Lc(g, b);
        Math.hypot(x - i, y - a) > 70 &&
          !this.occupied(x, y, 8) &&
          this.add({ axis: d, idx: p, dir: m, lane: b, x, z: y }, f);
      };
      (c(this.cableLines, "cable", this.cablePer ?? (this.max <= 12 ? 2 : 4)),
        c(this.busLines, "bus", Math.min(3, Math.round(this.max / 20))));
    }
    let r = e.forward();
    for (let l of this.cars) {
      if (l.wreck) {
        let z = l.wreck;
        if (
          (z.air ||
            ((l.x += z.vx * t), (l.z += z.vz * t), (l.heading += z.r * t)),
          z.air)
        ) {
          (s && this.wreckHits(l, s),
            Bnt(
              l,
              z,
              t,
              (A, T) => $t(A, T),
              this.crushed &&
                ((A, T, E, R) => this.crushed.ground(l, A, T, E, R)),
            ));
          continue;
        }
        if (!z.flat) Hnt(l, t);
        else {
          let A = Math.exp(-t * 2.2);
          ((z.vx *= A), (z.vz *= A), (z.r *= A));
        }
        (s && this.wreckHits(l, s),
          (l.y =
            $t(l.x, l.z) +
            (z.flat ? (z.yOff ?? Int(l, l.roll || 0, l.pitch)) : 0)),
          this.settled(l, t) && this.rejoinGrid(l));
        continue;
      }
      let c = l.vT,
        h = l.turn ? null : this.nextNode(l);
      if (h) {
        let z = h.d - ((l.axis === "c" ? ns[h.j] : ps[h.i]).hw + 3.5);
        (!l.plan || l.plan.node !== `${h.i},${h.j}`) &&
          (l.plan = {
            node: `${h.i},${h.j}`,
            turn: this.planTurn(l, h),
            stopped: 0,
          });
        let A = l6t(h.i, h.j),
          T = !1;
        if (A) {
          let R = Math.floor((this.t + ((h.i * 7 + h.j * 13) % 30)) / 16) % 2;
          T = !((l.axis === "c") == (R === 0)) && z > 0.5;
        } else T = !l.plan.stopped && z > -0.5;
        (T &&
          ((c = Math.min(c, Math.max(0, Math.sqrt(6 * Math.max(0, z - 0.5))))),
          z < 1.5 &&
            l.v < 0.6 &&
            ((l.stopT += t),
            !A && l.stopT > 0.8 && ((l.plan.stopped = 1), (l.stopT = 0)))),
          l.plan.turn &&
            (c = Math.min(
              c,
              Math.max(5.5, Math.sqrt(2 * 2.5 * Math.max(0, z)) + 5.5),
            )));
        let E = (l.axis === "c" ? ns[h.j] : ps[h.i]).hw;
        l.plan.turn && h.d <= E + 1.7
          ? ((l.turn = l.plan.turn), (l.turn.t = 0), (l.plan = null))
          : !l.plan.turn && h.d < 0.6 && (l.plan = null);
      }
      let f = 1e9,
        u = 0,
        d = -Math.sin(l.heading),
        p = -Math.cos(l.heading);
      for (let z of this.cars) {
        if (z === l) continue;
        let A = z.x - l.x,
          T = z.z - l.z,
          E = A * d + T * p;
        if (E < 0 || E > 50) continue;
        let R = Math.abs(A * p - T * d),
          P = E - (l.V.L + z.V.L) / 2;
        R < 0.7 + (l.V.bw + z.V.bw) / 4 &&
          P < f &&
          (z.wreck || Math.cos(z.heading - l.heading) > 0.3) &&
          ((f = P),
          (u = z.wreck ? 0 : z.v),
          z.wreck && P < 14 && !l.line && !l.turn && this.passGrid(l, t));
      }
      {
        let z = i - l.x,
          A = a - l.z,
          T = z * d + A * p,
          E = Math.abs(z * p - A * d),
          R = T - (l.V.L + 4.5) / 2;
        T > 0 &&
          T < 50 &&
          E < 1.3 + l.V.bw / 2 &&
          R < f &&
          ((f = R), (u = Math.max(0, e.vel.x * d + e.vel.z * p)));
      }
      let m = l.dyn,
        g = m ? m.s0 + 0.5 : 3,
        b = m ? m.T + 0.1 : 1.3,
        v = m ? m.a : 2.2,
        x = 3.5,
        y = g + l.v * b + (l.v * (l.v - u)) / (2 * Math.sqrt(v * x)),
        M =
          v *
          (1 -
            Math.pow(l.v / Math.max(c, 0.1), 4) -
            (f < 1e8 ? Math.pow(y / Math.max(f, 0.1), 2) : 0));
      if (
        ((l.brake = M < -1 ? 1 : 0),
        (l.v = la(l.v + la(M, -8, v) * t, 0, 25)),
        l.turn)
      ) {
        let z = l.turn;
        z.t += (l.v * t) / z.len;
        let A = Math.min(1, z.t),
          T = 1 - A,
          [E, R] = z.p0,
          [P, C] = z.p1,
          [I, L] = z.p2,
          F = T * T * E + 2 * T * A * P + A * A * I,
          O = T * T * R + 2 * T * A * C + A * A * L,
          B = 2 * T * (P - E) + 2 * A * (I - P),
          H = 2 * T * (C - R) + 2 * A * (L - C);
        ((l.x = F),
          (l.z = O),
          (l.heading = Math.atan2(-B, -H)),
          z.t >= 1 &&
            (Object.assign(l, z.to),
            (l.turn = null),
            (l.heading =
              l.axis === "c"
                ? l.dir > 0
                  ? Math.PI
                  : 0
                : l.dir > 0
                  ? -Math.PI / 2
                  : Math.PI / 2)));
      } else
        l.axis === "c" ? (l.z += l.dir * l.v * t) : (l.x += l.dir * l.v * t);
      if (!l.turn && (l.latOff || l.hOff)) {
        let z = l.axis === "c" ? ps[l.idx] : ns[l.idx],
          A = Lc(z, l.lane);
        ((l.latOff =
          Math.abs(l.latOff || 0) < 1.6 * t
            ? 0
            : l.latOff - Math.sign(l.latOff) * 1.6 * t),
          (l.hOff = (l.hOff || 0) * Math.exp(-t * 2.2)),
          Math.abs(l.hOff) < 0.002 && (l.hOff = 0),
          l.axis === "c"
            ? (l.x = he[l.idx] - l.dir * A + l.latOff)
            : (l.z = pe[l.idx] + l.dir * A + l.latOff),
          (l.heading =
            (l.axis === "c"
              ? l.dir > 0
                ? Math.PI
                : 0
              : l.dir > 0
                ? -Math.PI / 2
                : Math.PI / 2) + l.hOff));
      }
      if (
        l.z < pe[0] - 5 ||
        l.z > pe[ks - 1] + 5 ||
        l.x < he[0] - 5 ||
        l.x > he[xn - 1] + 5
      )
        if (l.line) {
          l.dir = -l.dir;
          let z = l.axis === "c" ? ps[l.idx] : ns[l.idx];
          (l.axis === "c"
            ? ((l.x = he[l.idx] - l.dir * Lc(z, l.lane)),
              (l.z = la(l.z, pe[0] + 1, pe[ks - 1] - 1)),
              (l.heading = l.dir > 0 ? Math.PI : 0))
            : ((l.z = pe[l.idx] + l.dir * Lc(z, l.lane)),
              (l.x = la(l.x, he[0] + 1, he[xn - 1] - 1)),
              (l.heading = l.dir > 0 ? -Math.PI / 2 : Math.PI / 2)),
            (l.v = 0));
        } else ((l.v = 0), (l.wreck = { vx: 0, vz: 0, r: 0 }));
      let S = l.V.L * 0.3,
        w = $t(l.x - d * S, l.z - p * S),
        _ = $t(l.x + d * S, l.z + p * S);
      ((l.y = (w + _) / 2), (l.pitch = Math.atan2(_ - w, 2 * S)));
    }
    this.colliders.length = 0;
    for (let l of this.cars)
      this.colliders.push({
        t: "obb",
        x: l.x,
        z: l.z,
        hx: l.V.bw / 2 + Fnt(l),
        hz: l.V.L / 2 + Ont(l),
        c: Math.cos(l.heading),
        s: Math.sin(l.heading),
        traffic: l,
      });
    this.drawSoon();
  }
  addReal(t, e = null, s = null) {
    let [n, i] = s || this.look(e, t.E),
      a = Io[n],
      r = {
        ...t,
        kind: n,
        V: a,
        color: i,
        v: 0,
        vf: (0.85 + this.rnd() * 0.3) * (m4[n]?.v ?? 1),
        dyn: m4[n],
        cable: e === "cable" || e === "tram",
        tram: e === "tram",
        bus: e === "bus",
        line: !!e,
        lat: void 0,
        cv: null,
        nx: null,
        passed: !1,
        stopDone: !1,
        waitT: 0,
        stuckT: 0,
        x: 0,
        y: 0,
        z: 0,
        fx: 0,
        fz: 1,
        heading: 0,
        pitch: 0,
        brake: 0,
        wreck: null,
        id: this.nextId(),
        claim: null,
        wantJ: null,
        wantT: 0,
        wantF: -1,
        rev: 0,
        holding: !1,
        _blk: null,
        _mutT: 0,
        _pbT: 0,
        _latErr: 0,
        _trk: -1,
        _rh: void 0,
        _sepT: 0,
        _sepF: -1,
        _sepBy: null,
        hS: 0,
        hOff: 0,
        passOff: 0,
        cvOff: 0,
        _h: void 0,
        _sv: null,
        _pa: null,
        _pk: null,
        _pOd: 0,
      };
    return (
      this.poseEdge(r),
      !s && (this.occupied3(r.x, r.y, r.z, a.L / 2 + 4) || this.onParked(r, r))
        ? null
        : ((r.v = r.cable
            ? r.tram
              ? 7
              : 4.2
            : Math.min(r.E.vmax * r.vf, 9) * (0.5 + 0.5 * this.rnd())),
          this.cars.push(r),
          r)
    );
  }
  laneFree(t, e) {
    let s = this._lq || (this._lq = {}),
      n = this._lp || (this._lp = {});
    ((s.E = t.E),
      (s.s = t.s),
      (s.dir = t.dir),
      (s.k = e),
      (s.lat = void 0),
      this.roads.pose(s, n));
    let i =
      this._lb || (this._lb = { x: 0, z: 0, heading: 0, V: { L: 0, bw: 0 } });
    ((i.x = n.x),
      (i.z = n.z),
      (i.heading = t.heading),
      (i.V.L = t.V.L + 10),
      (i.V.bw = t.V.bw + 0.4));
    for (let a of this.cars)
      if (
        a !== t &&
        Math.abs(a.x - n.x) < 14 &&
        Math.abs(a.z - n.z) < 14 &&
        Math.abs(a.y - t.y) < 3 &&
        cl(i, a, 1)
      )
        return !1;
    return ((i.y = t.y), !this.onParked(i, t));
  }
  parkedBy(t) {
    let e = this._world;
    if (!e?.near || t.line || t._pkOff > this.t) return n6t;
    let s = t._pkd || (t._pkd = { f: -1e9, x: 0, z: 0, a: [] }),
      n = (r) => {
        let l =
          r._pv ||
          (r._pv = {
            parked: !0,
            src: r,
            v: 0,
            x: 0,
            y: 0,
            z: 0,
            heading: 0,
            V: { L: 2 * r.hz, bw: 2 * r.hx },
          });
        return (
          (l.x = r.x),
          (l.z = r.z),
          (l.heading = Math.atan2(r.s, r.c)),
          (l.y = r.pose ? r.pose.y : r.y0 !== void 0 ? r.y0 + 1.5 : t.y),
          l
        );
      };
    if (
      this.frame - s.f > 30 ||
      Math.abs(t.x - s.x) > 8 ||
      Math.abs(t.z - s.z) > 8
    ) {
      ((s.f = this.frame), (s.x = t.x), (s.z = t.z), (s.a.length = 0));
      for (let r of e.near(t.x, t.z, 22)) r.parked && !r.dead && s.a.push(n(r));
    }
    let i = e.parked?.awake;
    if (!i?.length) return s.a;
    let a = this._pkA || (this._pkA = []);
    a.length = 0;
    for (let r of s.a) !r.src.b && !r.src.dead && a.push(r);
    for (let r of i)
      !r.dead &&
        Math.abs(r.x - t.x) < 22 &&
        Math.abs(r.z - t.z) < 22 &&
        a.push(n(r));
    return a;
  }
  nearPl(t) {
    return (
      this._world &&
      Math.abs(t.x - this._plx) < 250 &&
      Math.abs(t.z - this._plz) < 250
    );
  }
  onParked(t, e) {
    for (let s of this.parkedBy(e))
      if (
        Math.abs(s.x - t.x) < 9 &&
        Math.abs(s.z - t.z) < 9 &&
        Math.abs(s.y - (t.y ?? e.y)) < 2.5 &&
        cl(t, s, 1)
      )
        return s;
    return null;
  }
  occupied3(t, e, s, n) {
    for (let i of this.cars)
      if (Math.abs(i.y - e) < 3 && Math.hypot(i.x - t, i.z - s) < n + i.V.L / 2)
        return !0;
    return !1;
  }
  poseEdge(t) {
    let e = this.roads.pose(t, this._pz);
    return (
      (t.x = e.x),
      (t.z = e.z),
      (t.y = e.y),
      (t.fx = e.fx),
      (t.fz = e.fz),
      (t.heading = Math.atan2(-e.fx, -e.fz)),
      (t.pitch = e.pitch),
      e
    );
  }
  spawnReal(t, e, s, n, i, a, r) {
    let l = this.roads;
    for (let c = 0; c < 8; c++) {
      let h = this.rnd() * Math.PI * 2,
        f = this.rnd(),
        u = i + (a - i) * f * f;
      this.started &&
        this.rnd() < c6t &&
        ((h = Math.atan2(n, s) + (this.rnd() - 0.5) * 0.9),
        (u = 262 + this.rnd() * 158));
      let d = t + Math.cos(h) * u,
        p = e + Math.sin(h) * u;
      if (
        (this.spawnOk && !this.spawnOk(d, p)) ||
        (this.started && u < 260 && ((d - t) * s + (p - e) * n) / u > 0.35)
      )
        continue;
      let m = l.spawnAt(d, p, this.rnd, r);
      if (!m) continue;
      let g = this.addReal(m, r ? "bus" : null);
      if (g) return g;
    }
    return null;
  }
  initCable() {
    if (((this.cableDone = !0), !!this.sets.cablecar))
      for (let t of this.roads.cableLines()) {
        if (t.tram && !this.sets.streetcar0) continue;
        let e = t.route.map((n, i) => [n, i]).filter(([n]) => n.E),
          s = e.reduce((n, [i]) => n + i.E.L, 0);
        for (let n = 0; n < t.n; n++) {
          let i = (s * (n + 0.3 * this.rnd())) / t.n;
          for (let [a, r] of e) {
            let l = a.E.s1 - a.E.s0;
            if (i < a.E.L && l > 12) {
              let c =
                  a.dir > 0
                    ? a.E.s0 + Math.min(l - 6, Math.max(6, l * 0.5))
                    : a.E.s1 - Math.min(l - 6, Math.max(6, l * 0.5)),
                h = this.addReal(
                  {
                    E: a.E,
                    dir: a.dir,
                    s: c,
                    k: a.E.oneway
                      ? Math.floor((Math.max(1, a.E.lanes) - 1) / 2)
                      : 0,
                  },
                  t.tram ? "tram" : "cable",
                );
              h && ((h.route = t.route), (h.ri = r), (h.lineName = t.name));
              break;
            }
            i -= a.E.L;
          }
        }
      }
  }
  updateReal(t, e, s, n = null) {
    let i = this.roads,
      a = e.pos.x,
      r = e.pos.z,
      l = e.forward();
    ((this.t += t),
      this.frame++,
      (this._plx = a),
      (this._plz = r),
      (this._dt = t),
      (this._world = n),
      (this._playerPath = e.da?.mode === "l5" ? e.da.path : null));
    {
      let c = e.S?.box,
        h = l,
        f = c?.hz ?? 2.27,
        u = c?.off ?? 0.15,
        d =
          this._pb ||
          (this._pb = {
            mp: !0,
            player: !0,
            V: { L: 0, bw: 0 },
            x: 0,
            y: 0,
            z: 0,
            heading: 0,
            v: 0,
          });
      ((d.x = a + h.x * u),
        (d.z = r + h.z * u),
        (d.y = e.pos.y),
        (d.heading = Math.atan2(-h.x, -h.z)),
        (d.V.L = 2 * f),
        (d.V.bw = 2 * (c?.hx ?? 0.97)),
        (d.v = Math.max(0, e.vel.x * h.x + e.vel.z * h.z)));
      let p = e.wreckBody;
      if (p?.on && !p.reset) {
        let m = p.asCar();
        ((d.x = m.pos.x),
          (d.z = m.pos.z),
          (d.y = m.pos.y - p.B.y0),
          (d.heading = m.psi),
          (d.V.L = 2 * p.B.hz),
          (d.V.bw = 2 * p.B.hx),
          (d.v = 0));
      }
    }
    if (i.call && (this._detT = (this._detT || 0) + t) > 0.25) {
      this._detT = 0;
      let c = i.L.roadAt(a, r, 3, e.pos.y, !1, this._detQ || (this._detQ = {}));
      if (c && !c.J && c.E?.car) {
        let h = l.x * c.dx + l.z * c.dz >= 0 ? 1 : -1,
          f = h > 0 ? c.E.s1 - c.s : c.s - c.E.s0;
        if (f < 60 && (!c.E.oneway || h > 0)) {
          let u = i.arrival(c.E, h);
          u?.J?.ctl === 2 &&
            u.leg &&
            (u.leg.ph || f < 40) &&
            i.call(u.J, u.leg.ph, this.t);
        }
      }
    }
    if (s && this.max > 0) {
      for (let p = this.cars.length - 1; p >= 0; p--) {
        let m = this.cars[p];
        if (m.route || m.net) continue;
        let g = Math.hypot(m.x - a, m.z - r),
          b = ((m.x - a) * l.x + (m.z - r) * l.z) / (g || 1) > 0.2;
        ((m.wAge = m.wreck ? (m.wAge || 0) + t : 0),
          g > g4[1] + 30 || (m.wreck && g > 250) || (m.gone && (g > 110 || !b))
            ? this.cars.splice(p, 1)
            : m.wAge > 15 &&
                !(m.cop?.free && !m.wreck.dead) &&
                !m.line &&
                (g > 90 || (!b && g > 15))
              ? this.cars.splice(p, 1)
              : this.playerAuto && m.cv && m.stuckT > 12 && !m.line
                ? this.cars.splice(p, 1)
                : this.playerAuto &&
                  !m.line &&
                  g < 9 &&
                  (m._wx === void 0 ||
                  Math.hypot(m.x - m._wx, m.z - m._wz) > 0.5
                    ? ((m._wx = m.x), (m._wz = m.z), (m._wT = 0))
                    : (m._wT += t) > 10 && this.cars.splice(p, 1)));
      }
      this.cableDone || this.initCable();
      let c = 0,
        h = 0,
        f = 0;
      for (let p of this.cars) p.bus ? f++ : p.cable || h++;
      let u = this.sets.bus ? Math.max(1, Math.round(this.max / 14)) : 0,
        d = !this.started;
      for (; h < this.max - u && c++ < (d ? 900 : 5);)
        this.spawnReal(a, r, l.x, l.z, d ? 25 : g4[0], g4[1], !1) && h++;
      (f < u &&
        this.spawnReal(a, r, l.x, l.z, d ? 40 : g4[0], g4[1], !0) &&
        f++,
        (this.started = !0));
    }
    for (let c of this.cars)
      if (c.cv) {
        let h = c.cv.J;
        (h.busyF !== this.frame && ((h.busyF = this.frame), (h.busy = 0)),
          h.busy++);
      }
    for (let c of this.cars) {
      if (c.net) continue;
      (!c.cv && c.claim && c.nx?.J !== c.claim && (c.claim = null),
        c.wantJ && (c.cv || c.nx?.J !== c.wantJ) && (c.wantJ = null));
      let h = c.cv ? c.cv.J : c.claim;
      h &&
        (h.clF !== this.frame &&
          ((h.clF = this.frame), ((h.cl || (h.cl = [])).length = 0)),
        h.cl.push(c));
      let f = c.wantJ;
      f &&
        (f.wqF !== this.frame &&
          ((f.wqF = this.frame), ((f.wq || (f.wq = [])).length = 0)),
        f.wq.push(c));
    }
    {
      let c = this.playerJ;
      c &&
        (c.busyF !== this.frame && ((c.busyF = this.frame), (c.busy = 0)),
        c.busy++);
    }
    {
      let c = this._grid || (this._grid = new Map());
      for (let f of c.values()) f.length = 0;
      let h = (f) => {
        if (f.route && this.lineHidden) return;
        let u = Math.floor(f.x / 48) * 4096 + Math.floor(f.z / 48),
          d = c.get(u);
        (d || c.set(u, (d = [])), d.push(f));
      };
      for (let f of this.cars) h(f);
      if (this.netLeaders) for (let f of this.netLeaders) h(f);
    }
    for (let c of this.cars)
      if (!c.net) {
        let h = c._sv || (c._sv = {});
        ((h.f = this.frame),
          (h.x = c.x),
          (h.z = c.z),
          (h.y = c.y),
          (h.p = c.pitch),
          (h.h = c.heading),
          (h.E = c.E),
          (h.cv = c.cv),
          (h.s = c.s),
          (h.t = c.cv?.t),
          (h.lat = c.lat),
          (h.cvOff = c.cvOff));
      }
    for (let c of this.cars)
      c.net
        ? this.netStep(c, t)
        : c.cop?.free && !c.wreck && this.copStep
          ? this.copStep(c, t)
          : this.stepReal(c, t, e, n);
    (this.separate(), this.copSep?.(), this.yawLimit(t));
    for (let c of this.cars) c.cop && this.copGround && this.copGround(c, t);
    for (let c of this.cars)
      if (
        !c.net &&
        !c.wreck &&
        !c.cop &&
        !c.tt &&
        (c.E?.hwy || c.cv?.to?.F?.hwy)
      ) {
        let h = i.L,
          f = null,
          u = 1.5;
        for (let p of h.probe(c.x, c.z).all) {
          let m = Math.abs(p.y - c.y);
          m < u && ((u = m), (f = p));
        }
        if (f) c.y = f.y;
        else if (!c.cv && c.E) {
          let p = ys(c.E, c.x, c.z, this._highwayQ || (this._highwayQ = {})),
            m = Ot(c.E, p.s, this._highwayP || (this._highwayP = {})),
            g = la(p.v, -m.w + 0.3, m.w - 0.3);
          ((c.x = m.x + m.nx * g), (c.z = m.z + m.nz * g), (c.y = m.y));
        }
        let d = h.driveHeight(c.x, c.z, null, c.y + 0.3);
        Math.abs(d - c.y) < 1.5 && (c.y = d);
      }
    {
      let c = i.L,
        h = (f, u, d) => c.driveHeight(f, u, null, d);
      for (let f of this.cars)
        if (
          !f.net &&
          !f.cop &&
          !f.tt &&
          !f.cable &&
          !f.E?.hwy &&
          !f.cv?.to?.F?.hwy &&
          !f.wreck?.air &&
          !f.wreck?.flat &&
          Math.abs(f.x - a) < 60 &&
          Math.abs(f.z - r) < 60
        ) {
          let u = f.y,
            d = f.pitch,
            p = this.wheels4(f, h, u),
            m = f.y - u,
            g = p && Math.abs(m) <= 0.25 ? m : 0;
          (g || ((f.pitch = d), (f.roll = (f.roll || 0) * 0.8)),
            (f._woff =
              (f._woff || 0) + (g - (f._woff || 0)) * Math.min(1, t * 6)),
            (g = f._woff),
            (f.y = u + g));
        }
    }
    this.colliders.length = 0;
    for (let c of this.cars)
      (c.route && this.lineHidden) ||
        this.colliders.push({
          t: "obb",
          x: c.x,
          z: c.z,
          hx: c.V.bw / 2 + Fnt(c),
          hz: c.V.L / 2 + Ont(c),
          c: Math.cos(c.heading),
          s: Math.sin(c.heading),
          traffic: c,
          y0: c.y - 0.8,
          y1: c.y + c.V.H,
        });
    this.drawSoon();
  }
  drawSoon() {
    this.deferDraw ? (this.drawDue = !0) : this.draw();
  }
  stepReal(t, e, s, n = null) {
    let i = this.roads,
      a = i.L;
    if (t.wreck) {
      let I = t.wreck;
      if (
        (I.air ||
          ((t.x += I.vx * e),
          (t.z += I.vz * e),
          (t.heading += I.r * e),
          (t.fx = -Math.sin(t.heading)),
          (t.fz = -Math.cos(t.heading))),
        I.air)
      ) {
        n && this.wreckHits(t, n);
        let L = t.y;
        (Bnt(
          t,
          I,
          e,
          (F, O, B) => {
            let H = a.driveHeight(F, O, null, Math.min(B, L + 0.5) - 0.8);
            return Number.isFinite(H) ? H : L - 0.05;
          },
          this.crushed && ((F, O, B, H) => this.crushed.ground(t, F, O, B, H)),
        ),
          (t.fx = -Math.sin(t.heading)),
          (t.fz = -Math.cos(t.heading)),
          (t.brake = 0));
        return;
      }
      if (I.flat) {
        let L = Math.exp(-e * 2.2);
        ((I.vx *= L), (I.vz *= L), (I.r *= L));
        let F = a.driveHeight(t.x, t.z, null, t.y - 0.8);
        (Number.isFinite(F) &&
          (t.y = F + (I.yOff ?? Int(t, t.roll || 0, t.pitch))),
          (t.brake = 0),
          n && this.wreckHits(t, n));
        return;
      }
      if ((Hnt(t, e), n && this.wreckHits(t, n), t.cop && this.copGround))
        this.copGround(t, e);
      else {
        let L = a.driveHeight(t.x, t.z, null, t.y - 0.8);
        (L > t.y + 0.4
          ? ((I.vx *= 0.5), (I.vz *= 0.5))
          : (t.y = Math.min(
              L,
              t.y + 0.005 + Math.hypot(I.vx, I.vz) * e * 0.32,
            )),
          (t.pitch *= Math.exp(-e * 3)));
      }
      ((t.brake = I.dead ? 0 : 1), this.settled(t, e) && this.rejoinReal(t));
      return;
    }
    if (t.tt) return this.turntable(t, e);
    let r = t.cable
        ? t.tram
          ? 10.5
          : 4.2
        : (t.cv ? t.cv.to.F.vmax : t.E.vmax) * t.vf,
      l = 1e9,
      c = !1,
      h = null,
      f = 0;
    if ((t.bus && (r = Math.min(r, 11)), t.cv)) r = Math.min(r, t.cv.vTurn);
    else {
      let I = i.rem(t);
      !t.nx &&
        I < 90 &&
        (t.nx = i.plan(t, this.rnd) || { end: !0, stopD: 1.5 });
      let L = t.nx;
      if (L) {
        if (!L.end && L.ang > 0.3) {
          let N = Math.min(
            Math.max(3.5, Math.sqrt(28.799999999999997 / L.ang)),
            L.F && I < 40 ? this.preCurve(t).vTurn : 99,
          );
          r = Math.min(r, Math.sqrt(N * N + 2 * 2.2 * Math.max(0, I - 3)));
        }
        let F = t.E.s1 - t.E.s0,
          O = Math.min(L.stopD, Math.max(0, F - t.V.L - 0.5)),
          B = I - O - t.V.L / 2,
          H = !1;
        if (L.end) {
          if (((H = !0), t.v < 0.3 && B < 3)) {
            if (t.route) return this.startTurntable(t);
            t.gone = !0;
          }
        } else if (!t.passed && L.J.ctl === 2 && L.leg) {
          L.leg.ph && I < 60 && i.call(L.J, L.leg.ph, this.t);
          let N = i.signal(L.J, L.leg.ph, this.t);
          H =
            N === 2 ? (t.v * t.v) / 12 < B + 2 : N === 1 && (t.v * t.v) / 7 < B;
        } else
          !t.passed &&
            L.leg &&
            (L.J.ctl === 1 || (L.J.ctl === 3 && L.leg.stop)) &&
            (t.stopDone
              ? (L.J.busyF === this.frame ? L.J.busy : 0) > 0 &&
                (t.waitT < 4 || L.J === this.playerJ) &&
                ((H = !0), (t.waitT += e))
              : ((H = !0),
                B < 2 &&
                  t.v < 0.5 &&
                  ((t.waitT += e),
                  t.waitT > 0.8 && ((t.stopDone = !0), (t.waitT = 0)))));
        (H
          ? ((l = Math.max(0, B + 2)),
            (c = !0),
            t.claim === L.J && (t.claim = null))
          : !L.end &&
            L.F &&
            t.claim !== L.J &&
            B < (t.v * t.v) / (t.line ? 5 : 9) + 3 &&
            ((h = L), (f = B)),
          B < -1 && !L.end && (t.passed = !0));
      }
    }
    let u = l,
      d = 0,
      p = null,
      m = t.fx,
      g = t.fz,
      b = this._grid,
      v = Math.floor(t.x / 48),
      x = Math.floor(t.z / 48);
    for (let I = v - 1; I <= v + 1; I++)
      for (let L = x - 1; L <= x + 1; L++) {
        let F = b?.get(I * 4096 + L);
        if (F)
          for (let O of F) {
            if (O === t) continue;
            let B = O.x - t.x,
              H = O.z - t.z,
              N = B * m + H * g;
            if (N < 0 || N > 45 || Math.abs(O.y - t.y) > 3) continue;
            let D = Math.abs(B * g - H * m),
              U = N - (t.V.L + O.V.L) / 2;
            D < 0.7 + (t.V.bw + O.V.bw) / 4 &&
              U < u &&
              (O.wreck || O.fx * m + O.fz * g > 0.3) &&
              !(t.stuckT > 6 && (O.stuckT > 6 || t.cv) && !O.wreck) &&
              ((u = U), (d = O.wreck ? 0 : O.v), (p = O));
          }
      }
    {
      let I = this.pathGap(t);
      I.gap < u &&
        ((u = I.gap),
        (d = I.v),
        I.o?.parked && (p = I.o),
        I.o?.player &&
          (t.blockT = I.v < 1 && I.gap < 12 ? (t.blockT || 0) + e : 0));
      let L = (t._blk = I.gap < 2.5 ? I.o : null);
      if (L && !L.net && !L.mp && L._blk === t && t.v < 0.3 && !t.line) {
        t._mutT = (t._mutT || 0) + e;
        let F = t.passOff || t.cvPass || t.cvOff ? 1 : 0,
          O = L.passOff || L.cvPass || L.cvOff ? 1 : 0;
        t._mutT > 2 &&
          (t._revN || 0) < 2 &&
          (F > O || (F === O && (t.id > L.id || L.line))) &&
          ((t.rev = 3),
          (t._revN = (t._revN || 0) + 1),
          (t._mutT = 0),
          (this.reversed = (this.reversed || 0) + 1));
      } else t._mutT = 0;
    }
    if (
      (!t.line &&
      (t._latErr || 0) > 0.8 &&
      u < 6 &&
      t.v < 0.3 &&
      !t.rev &&
      (t._revN || 0) < 2
        ? ((t._pbT = (t._pbT || 0) + e),
          t._pbT > 1.5 &&
            ((t.rev = 4), (t._revN = (t._revN || 0) + 1), (t._pbT = 0)))
        : (t._pbT = 0),
      t.v > 3 && (t._revN = 0),
      h && u > f + 1)
    )
      if (
        ((this.full = !1),
        (this.byPlayer = !1),
        f + 1.5 < (t.v * t.v) / 14 || this.mayEnter(t, h))
      ) {
        ((t.claim = h.J), (t.wantJ = null));
        let I = h.J;
        (I.clF !== this.frame &&
          ((I.clF = this.frame), ((I.cl || (I.cl = [])).length = 0)),
          I.cl.push(t));
      } else {
        if (this.byPlayer && (t._pyT = (t._pyT || 0) + e) > 2 && !t.route) {
          t._pyT = 0;
          for (let L = 0; L < 4; L++) {
            let F = i.plan(t, this.rnd);
            if (
              F &&
              ((t.nx = F),
              (this.byPlayer = !1),
              this.mayEnter(t, F) || !this.byPlayer)
            )
              break;
          }
        }
        this.full
          ? (c = !0)
          : (t.wantJ !== h.J && ((t.wantJ = h.J), (t.wantT = this.t)),
            (t.wantF = this.frame));
        let I = Math.max(0, f + 2);
        I < u && ((u = I), (d = 0));
      }
    if (
      (p &&
      u < 14 &&
      !t.line &&
      !t.passOff &&
      !t.cvPass &&
      (p.parked ||
        p.wreck?.dead ||
        (p.wreck && p.wreck.t > 2.5) ||
        (p.stuckT > 20 && !p.wantJ && !p.holding))
        ? ((t.wreckT = (t.wreckT || 0) + e),
          t.wreckT > 0.8 &&
            ((t.wreckT = 0),
            !t.cv &&
            t.E.lanes > 1 &&
            !this.laneFree(t, t.k > 0 ? t.k - 1 : t.k + 1)
              ? (t.wreckT = 0.3)
              : ((t.passBy = p),
                t.cv
                  ? (t.cvPass = !0)
                  : t.E.lanes > 1
                    ? (t.k += t.k > 0 ? -1 : 1)
                    : p.parked
                      ? i.rem(t) > t.V.L && (t.passOff = this.pastParked(t, p))
                      : i.rem(t) > t.V.L + 15 &&
                        (t.passOff =
                          -(t.E.oneway ? 1 : t.dir) * (t.V.bw + 1.5)))))
        : p || (t.wreckT = 0),
      p?.parked && t.v < 0.3
        ? (t._pkW = (t._pkW || 0) + e) > 6 &&
          ((t._pkW = 0),
          (t._pkOff = this.t + 6),
          ((this.sepStats || (this.sepStats = {})).pkLet =
            (this.sepStats.pkLet || 0) + 1))
        : (t._pkW = 0),
      t.passBy && !t.cvPass)
    ) {
      let I = t.passBy,
        L = (I.x - t.x) * m + (I.z - t.z) * g;
      (!(I.parked ? !I.src.dead : this.cars.includes(I)) ||
        L < -(t.V.L + I.V.L) / 2 - 2 ||
        L > 40) &&
        ((t.passBy = null), t.blockT || (t.passOff = 0));
    }
    {
      let I = s.pos.x - t.x,
        L = s.pos.z - t.z,
        F = I * m + L * g,
        O = Math.abs(I * g - L * m),
        B = F - (t.V.L + 4.5) / 2,
        H = Math.max(0, s.vel.x * m + s.vel.z * g);
      if (
        (F > 0 &&
        F < 45 &&
        O < 1.3 + t.V.bw / 2 &&
        B < u &&
        Math.abs(s.pos.y - t.y) < 3 &&
        (B > -1 || O < t.V.bw / 2 + 1)
          ? ((u = B),
            (d = H),
            (t.blockT = H < 1 && B < 12 ? (t.blockT || 0) + e : 0))
          : t.passOff && !t.passBy && (F < -4 || F > 30) && (t.passOff = 0),
        this.playerAuto)
      ) {
        let N = s.S.box,
          D = N?.hx ?? 0.97,
          U = N?.hz ?? 2.27,
          G = N?.off ?? 0.15,
          W = s.forward();
        for (let V = -1; V <= 1; V += 2)
          for (let $ = -1; $ <= 1; $ += 2) {
            let J = s.pos.x + W.x * (G + U * V) - W.z * D * $ - t.x,
              X = s.pos.z + W.z * (G + U * V) + W.x * D * $ - t.z,
              tt = J * m + X * g,
              Z = Math.abs(J * g - X * m),
              q = tt - t.V.L / 2 - 1;
            tt > 0 &&
              tt < 45 &&
              Z < t.V.bw / 2 + 0.5 &&
              q < u &&
              Math.abs(s.pos.y - t.y) < 3 &&
              ((u = q), (d = Math.min(d, H)));
          }
      }
      t.blockT > 3 &&
        !t.line &&
        !t.passOff &&
        !t.cvPass &&
        ((t.blockT = 0),
        t.cv
          ? (t.cvPass = !0)
          : t.E.lanes > 1
            ? this.laneFree(t, t.k > 0 ? t.k - 1 : t.k + 1)
              ? (t.k += t.k > 0 ? -1 : 1)
              : (t.blockT = 2.5)
            : i.rem(t) > t.V.L + 15 &&
              (t.passOff = -(t.E.oneway ? 1 : t.dir) * (t.V.bw + 1.5)));
    }
    if (this.yieldTo && !t.cop) {
      let I = this.yieldTo(t);
      I < u && ((u = I), (d = 0));
    }
    let y = t.dyn,
      M = y ? y.s0 : 2.5,
      S = y ? y.T : 1.2,
      w = t.cable ? (t.tram ? 1.2 : 1) : y ? y.a : 2.2,
      _ = 3.5,
      z = M + t.v * S + (t.v * (t.v - d)) / (2 * Math.sqrt(w * _)),
      A =
        w *
        (1 -
          Math.pow(t.v / Math.max(r, 0.1), 4) -
          (u < 1e8 ? Math.pow(z / Math.max(u, 0.1), 2) : 0));
    t.brake = A < -1 || (t.v < 0.3 && c) ? 1 : 0;
    let T = t.line && !(u < M + 2 && u < l) ? -2.8 : -8;
    if (
      ((t.v = la(t.v + la(A, T, w) * e, 0, 32)),
      (t.holding = c),
      (t.stuckT = t.v < 0.3 && !c ? t.stuckT + e : 0),
      t.stuckT > 25 && !t.route && (t.gone = !0),
      t.rev > 0)
    ) {
      t.v = 0;
      let I = Math.min(t.rev, 1.2 * e);
      this.backUp(t, I)
        ? (t.rev -= I)
        : (t.rev === 3 &&
            t._blk &&
            !t._blk.rev &&
            !t._blk.net &&
            !t._blk.mp &&
            !t._blk.line &&
            (t._blk.rev = 2.99),
          (t.rev = 0));
      return;
    }
    if (t.cv) return this.advanceCurve(t, e);
    t.s += t.dir * t.v * e;
    let E = i.rem(t);
    if (E <= 0) {
      t.s = t.dir > 0 ? t.E.s1 : t.E.s0;
      let I = t.nx;
      if (I && !I.end && I.F) {
        let L = this.roads.pose(t, this._pz),
          F = this._cq || (this._cq = {});
        return (
          (F.x = t.x),
          (F.z = t.z),
          (F.fx = t.fx),
          (F.fz = t.fz),
          (F.y = L.y),
          (t.cv = i.curve(t, I, F)),
          (t.cv.t = 0),
          (t.cv.fE = t.E),
          (t.cv.fdir = t.dir),
          (t.cv.fk = t.k),
          (t.claim = I.J),
          (t.wantJ = null),
          this.advanceCurve(t, 0, -E)
        );
      }
      if (((t.v = 0), t.route && I && I.end))
        return (this.poseEdge(t), this.startTurntable(t));
      t.gone = !0;
    }
    let R = this.roads.pose(t, this._pz),
      P = R.target + (t.passOff || 0) - t.lat,
      C = Math.min(1.8, 0.4 * t.v) * e;
    ((t.lat += la(P, -C, C)),
      (t._latErr = Math.abs(P)),
      (t.y = R.y),
      (t.pitch = R.pitch),
      this.track(t, R.x, R.z, Math.atan2(-R.fx, -R.fz), e));
    {
      let I = (t.x - R.x) * R.fx + (t.z - R.z) * R.fz;
      Math.abs(I) < 6 && (t.y = R.y + I * Math.tan(R.pitch));
    }
  }
  pastParked(t, e) {
    let s = t.E,
      n = ys(s, e.x, e.z, this._ppq || (this._ppq = {})),
      i = this.roads.pose(t, this._pz),
      a = n.v - i.target,
      r = (t.V.bw + e.V.bw) / 2 + 0.35;
    return a > 0 ? Math.min(0, a - r) : Math.max(0, a + r);
  }
  track(t, e, s, n, i, a = !1) {
    let r = e - t.x,
      l = s - t.z,
      c = t._rh ?? n;
    if (
      ((t._rh = n),
      (a ||
        !(Math.abs(r) < 12 && Math.abs(l) < 12) ||
        !Number.isFinite(t.heading)) &&
        (a || !Number.isFinite(t.heading) || this.spotFree(t, e, s, n)))
    ) {
      ((t.x = e),
        (t.z = s),
        (t.heading = n),
        (t.fx = -Math.sin(n)),
        (t.fz = -Math.cos(n)),
        (t._trk = this.frame));
      return;
    }
    if (!(i > 0)) return;
    let h = t.heading,
      f = -Math.sin(h),
      u = -Math.cos(h),
      d = Math.cos(h),
      p = -Math.sin(h),
      m = r * d + l * p,
      g = Math.max(0, t.v + la((r * f + l * u) * 3, -1.5, 1.5));
    if (g < 0.001) return;
    let b = ro[t.kind],
      v = b ? b[0][1] - b[2][1] : t.V.L * 0.6,
      x = Math.max(0.05, Math.min((g * 0.684) / Math.max(v, 1.5), 8 / g, 1.5)),
      y = n - c;
    y -= Math.round(y / (2 * Math.PI)) * 2 * Math.PI;
    let M = n - Math.atan2(1.2 * m, g + 1) - h;
    M -= Math.round(M / (2 * Math.PI)) * 2 * Math.PI;
    let S = la(y / i + 3 * M, -x, x),
      w = h + (S * i) / 2;
    ((h += S * i),
      (t.x += -Math.sin(w) * g * i),
      (t.z += -Math.cos(w) * g * i),
      (t.heading = h),
      (t.fx = -Math.sin(h)),
      (t.fz = -Math.cos(h)),
      (t._trk = this.frame));
  }
  spotFree(t, e, s, n) {
    let i =
      this._sfb || (this._sfb = { x: 0, y: 0, z: 0, heading: 0, V: null });
    ((i.x = e), (i.z = s), (i.y = t.y), (i.heading = n), (i.V = t.V));
    for (let a of this.cars)
      if (
        a !== t &&
        a.heading !== void 0 &&
        Math.abs(a.x - e) < 12 &&
        Math.abs(a.z - s) < 12 &&
        Math.abs(a.y - t.y) < 2.5 &&
        !(a.route && this.lineHidden) &&
        cl(i, a, 1)
      )
        return !1;
    return (
      !(this._pb && Math.abs(this._pb.y - t.y) < 2.5 && cl(i, this._pb, 1)) &&
      !(this.nearPl(t) && this.onParked(i, t))
    );
  }
  yawLimit(t) {
    for (let e of this.cars) {
      if (
        e.wreck ||
        e.tt ||
        e.cop?.free ||
        e._h === void 0 ||
        !(t > 0) ||
        e._trk === this.frame
      ) {
        e._h = e.heading;
        continue;
      }
      let s = ro[e.kind],
        n = s ? s[0][1] - s[2][1] : e.V.L * 0.6,
        i = Math.abs(e.v || 0),
        a =
          Math.max(
            0,
            Math.min((i * 0.684) / Math.max(n, 1.5), 6 / Math.max(i, 0.1), 1.5),
          ) * t,
        r = e.heading - e._h;
      ((r -= Math.round(r / (2 * Math.PI)) * 2 * Math.PI),
        Math.abs(r) > a &&
          ((e.heading = e._h + Math.sign(r) * a),
          (e.fx = -Math.sin(e.heading)),
          (e.fz = -Math.cos(e.heading))),
        (e._h = e.heading));
    }
  }
  pathAhead(t, e) {
    let s = this.roads,
      n = t._pa || (t._pa = new Float32Array(144)),
      i = this._pab || (this._pab = {}),
      a = this._paq || (this._paq = {}),
      r = this._pap || (this._pap = {}),
      l = Math.min(48, Math.ceil(e / Jf) + 1),
      c = 0,
      h = (m, g, b) => {
        ((n[c * 3] = m), (n[c * 3 + 1] = g), (n[c * 3 + 2] = b), c++);
      },
      f = (t.cv && t.cvOff) || 0,
      u = t.cv && t.cvPass ? t.V.bw + 1.5 : 0,
      d = (m, g) => {
        for (; c < l;) {
          if (
            (s.bez(m, g, i),
            (g += Jf / Math.max(Math.hypot(i.dx, i.dz), 0.5)),
            g >= 1)
          )
            return !0;
          s.bez(m, g, i);
          let b = Math.hypot(i.dx, i.dz) || 1;
          ((f += la(u - f, -0.4 * Jf, 0.4 * Jf)),
            h(
              i.x + (i.dz / b) * f,
              i.z - (i.dx / b) * f,
              Math.atan2(-i.dx, -i.dz),
            ));
        }
        return !1;
      },
      p = (m, g, b, v, x, y) => {
        ((a.E = m), (a.dir = g), (a.k = v), (a.cable = t.cable));
        let M = 0.4 * Jf;
        for (let S = 1; c < l; S++) {
          let w = b + g * S * Jf;
          if (g > 0 ? w > m.s1 : w < m.s0) return !0;
          ((a.s = w),
            (a.lat = x),
            s.pose(a, r),
            (x += la(r.target + y - x, -M, M)),
            h(r.x, r.z, Math.atan2(-r.fx, -r.fz)));
        }
        return !1;
      };
    if ((h(t.x, t.z, t.heading), t.cv)) {
      let m = t.cv.to;
      d(t.cv, t.cv.t) &&
        m.F &&
        p(m.F, m.dir, s.sIn(m.F, m.dir), m.k, t.cv.lat, 0);
    } else if (
      t.E &&
      p(t.E, t.dir, t.s, t.k, t.lat ?? 0, t.passOff || 0) &&
      t.nx &&
      !t.nx.end &&
      t.nx.F
    ) {
      let m = this.preCurve(t);
      d(m, 0) && p(t.nx.F, t.nx.dir, s.sIn(t.nx.F, t.nx.dir), t.nx.k, m.lat, 0);
    }
    return c;
  }
  preCurve(t) {
    let e = t.nx;
    if (e._cv && e._k === t.k) return e._cv;
    let s = {
        E: t.E,
        dir: t.dir,
        s: t.dir > 0 ? t.E.s1 : t.E.s0,
        k: t.k,
        lat: t.lat,
      },
      n = this.roads.pose(s, {});
    return ((e._k = t.k), (e._cv = this.roads.curve(t, e, n)));
  }
  pathGap(t) {
    let e = this._pg || (this._pg = { gap: 1e9, v: 0, o: null });
    if (((e.gap = 1e9), (e.v = 0), (e.o = null), t.tt || !this.roads)) return e;
    let s = Math.min(30, 6 + t.v * 1.6),
      n = this._grid,
      i = t.fx,
      a = t.fz,
      r = Math.floor(t.x / 48),
      l = Math.floor(t.z / 48),
      c =
        this._pgb ||
        (this._pgb = { x: 0, z: 0, heading: 0, V: { L: 0, bw: 0 } }),
      h = this._pgo || (this._pgo = { x: 0, z: 0, heading: 0, V: null });
    ((c.V.L = t.V.L + 0.6), (c.V.bw = t.V.bw));
    let f = -1,
      u = 0,
      d = 0,
      p = t._pk || (t._pk = {});
    t._pOd = (t._pOd || 0) + t.v * (this._dt || 0);
    let m = () => {
        f >= 0 ||
          ((p.cv !== t.cv ||
            p.E !== t.E ||
            p.k !== t.k ||
            p.nx !== t.nx ||
            p.off !== (t.passOff || 0) + (t.cvPass ? 100 : 0) ||
            this.frame - p.f > 3 ||
            t._pOd > 3 ||
            !(p.n > 0)) &&
            ((p.n = this.pathAhead(t, s + 4.5)),
            (p.cv = t.cv),
            (p.E = t.E),
            (p.k = t.k),
            (p.nx = t.nx),
            (p.off = (t.passOff || 0) + (t.cvPass ? 100 : 0)),
            (p.f = this.frame),
            (t._pOd = 0)),
          (f = p.n),
          (d = t._pOd),
          (u = Math.floor(d / Jf)));
      },
      g = (b) => {
        if (b === t || Math.abs(b.y - t.y) > 3) return;
        let v = b.x - t.x,
          x = b.z - t.z;
        if (v * v + x * x > (s + 8) * (s + 8) || v * i + x * a <= 0) return;
        m();
        let y = t._pa,
          M = b.heading ?? Math.atan2(-b.fx, -b.fz),
          S =
            b.heading !== void 0
              ? b
              : ((h.x = b.x), (h.z = b.z), (h.heading = M), (h.V = b.V), h),
          w = (Math.hypot(c.V.L, c.V.bw) + Math.hypot(b.V.L, b.V.bw)) / 2,
          _ = Math.max(
            u,
            Math.floor((Math.hypot(y[0] - b.x, y[1] - b.z) - w) / Jf) - 1,
          );
        for (let z = _; z < f && (z - 1) * Jf - d < e.gap; z++) {
          let A = y[z * 3],
            T = y[z * 3 + 1],
            E = y[z * 3 + 2];
          if (
            (A - b.x) ** 2 + (T - b.z) ** 2 > w * w ||
            ((c.x = A - Math.sin(E) * 0.3),
            (c.z = T - Math.cos(E) * 0.3),
            (c.heading = E),
            !cl(c, S, Math.cos(M - E) < -0.7 && !b.parked ? 0.85 : 1))
          )
            continue;
          let R = Math.max(0, (z - 1) * Jf - d);
          R < e.gap &&
            ((e.gap = R),
            (e.v = Math.max(0, (b.wreck ? 0 : b.v || 0) * Math.cos(M - E))),
            (e.o = b));
          break;
        }
      };
    for (let b = r - 1; b <= r + 1; b++)
      for (let v = l - 1; v <= l + 1; v++) {
        let x = n?.get(b * 4096 + v);
        if (x) for (let y of x) g(y);
      }
    if ((this._pb && !t.cvPass && g(this._pb), this.nearPl(t)))
      for (let b of this.parkedBy(t)) g(b);
    return e;
  }
  cvPts(t) {
    if (t._pts) return t._pts;
    let e = (t._pts = new Float32Array(26)),
      s = this._cvb || (this._cvb = {});
    for (let n = 0; n <= 12; n++)
      (this.roads.bez(t, n / 12, s), (e[n * 2] = s.x), (e[n * 2 + 1] = s.z));
    return e;
  }
  conflict(t, e, s, n, i) {
    let a = i * i,
      r = this._cf || (this._cf = [0, 0, 0]),
      l = !1,
      c = (h, f, u, d, p, m) => {
        let g = p - u,
          b = m - d,
          v = g * g + b * b,
          x = v ? Math.max(0, Math.min(1, ((h - u) * g + (f - d) * b) / v)) : 0;
        return (h - u - x * g) ** 2 + (f - d - x * b) ** 2;
      };
    for (let h = e * 2; h < t.length; h += 2)
      for (let f = n * 2; f < s.length; f += 2) {
        let u = Math.min(h + 2, t.length - 2),
          d = Math.min(f + 2, s.length - 2),
          p = t[h],
          m = t[h + 1],
          g = t[u],
          b = t[u + 1],
          v = s[f],
          x = s[f + 1],
          y = s[d],
          M = s[d + 1];
        if (
          Math.max(p, g) + i < Math.min(v, y) ||
          Math.max(v, y) + i < Math.min(p, g) ||
          Math.max(m, b) + i < Math.min(x, M) ||
          Math.max(x, M) + i < Math.min(m, b)
        )
          continue;
        let S = g - p,
          w = b - m,
          _ = y - v,
          z = M - x,
          A = v - p,
          T = x - m,
          E = S * z - w * _,
          R = E ? (A * z - T * _) / E : -1,
          P = E ? (A * w - T * S) / E : -1;
        if (
          (R >= 0 && R <= 1 && P >= 0 && P <= 1) ||
          Math.min(
            c(p, m, v, x, y, M),
            c(g, b, v, x, y, M),
            c(v, x, p, m, g, b),
            c(y, M, p, m, g, b),
          ) < a
        ) {
          (l
            ? (r[2] = Math.min(r[2], f / 2))
            : ((l = !0), (r[0] = h / 2), (r[2] = f / 2)),
            (r[1] = h / 2));
          break;
        }
      }
    return l;
  }
  mayEnter(t, e) {
    let s = this.roads,
      n = e.J,
      i = this.preCurve(t),
      a = this.cvPts(i),
      r = t.wantJ === n ? t.wantT : this.t,
      l = this.frame;
    if (this.playerAuto && this.playerJ === n && this._playerPath && this._pb) {
      let d = this._playerPath,
        p = d.marks.find((m) => m.J === n && m.sOut >= d.s);
      if (p && !(p.E === t.E && p.dir === t.dir)) {
        let m = this._playerCurve || (this._playerCurve = new Float64Array(26)),
          g = this._playerPoint || (this._playerPoint = {}),
          b = p.sOut - d.s + this._pb.V.L;
        for (let v = 0; v <= 12; v++)
          (d.at((b * v) / 12, g), (m[v * 2] = g.x), (m[v * 2 + 1] = g.z));
        if (this.conflict(a, 0, m, 0, (t.V.bw + this._pb.V.bw) / 2 + 0.15))
          return ((this.denied = this._pb), (this.byPlayer = !0), !1);
      }
    }
    let c = (d) =>
        (!d.cv && d.E === t.E && d.dir === t.dir && d.k === t.k) ||
        (d.cv && d.cv.fE === t.E && d.cv.fdir === t.dir && d.cv.fk === t.k),
      h = (d) =>
        d.cv
          ? d.cv.fE === t.E && d.cv.fdir === t.dir
          : d.E === t.E && d.dir === t.dir;
    if (n.clF === l)
      for (let d of n.cl) {
        if (
          d === t ||
          c(d) ||
          (d.cv &&
            d.cv.to.F === e.F &&
            d.cv.to.dir === e.dir &&
            d.cv.to.k === e.k)
        )
          continue;
        let p = d.cv || (d.nx && !d.nx.end && d.nx.F ? this.preCurve(d) : null);
        if (!p) continue;
        let m = h(d) ? 3 : 0;
        if (
          this.conflict(
            a,
            m,
            this.cvPts(p),
            Math.max(m, d.cv ? Math.min(12, Math.floor(d.cv.t * 12)) : 0),
            (t.V.bw + d.V.bw) / 2 + 0.15,
          )
        ) {
          let g = this._cf,
            b = i.len / 12,
            v = s.rem(t) + (g[1] + 1) * b + t.V.L,
            x = (-t.v + Math.sqrt(t.v * t.v + 4 * v)) / 2;
          if (
            ((d.cv
              ? ((g[2] - d.cv.t * 12) * p.len) / 12
              : s.rem(d) + (g[2] * p.len) / 12) -
              d.V.L / 2 -
              t.V.bw) /
              Math.max(d.v, p.vTurn, 3) >
            x + 1.2
          )
            continue;
          if (
            !d.cv &&
            t.wantJ === n &&
            this.t - t.wantT > 6 &&
            !d.line &&
            d.nx &&
            s.rem(d) - d.nx.stopD - 1 > (d.v * d.v) / 6 + 2
          ) {
            d.claim = null;
            continue;
          }
          return ((this.denied = d), !1);
        }
      }
    if (n.wqF === l)
      for (let d of n.wq) {
        if (
          d === t ||
          c(d) ||
          !(d.wantT < r || (d.wantT === r && d.id < t.id)) ||
          !(d.wantF >= l - 1) ||
          !d.nx ||
          d.nx.J !== n ||
          d.nx.end
        )
          continue;
        let p = h(d) ? 3 : 0;
        if (
          this.conflict(
            a,
            p,
            this.cvPts(this.preCurve(d)),
            p,
            (t.V.bw + d.V.bw) / 2 + 0.15,
          )
        )
          return ((this.denied = d), !1);
      }
    {
      let d = this._pb;
      if (
        d &&
        d.v < 1 &&
        Math.abs(d.y - t.y) < 3 &&
        Math.abs(d.x - a[12]) < 40 &&
        Math.abs(d.z - a[13]) < 40
      ) {
        let p = this._pbx || (this._pbx = { x: 0, z: 0, heading: 0, V: t.V });
        p.V = t.V;
        for (let m = 0; m < 12; m++)
          if (
            ((p.x = a[m * 2]),
            (p.z = a[m * 2 + 1]),
            (p.heading = Math.atan2(
              -(a[m * 2 + 2] - a[m * 2]),
              -(a[m * 2 + 3] - a[m * 2 + 1]),
            )),
            cl(p, d, 1))
          )
            return ((this.denied = d), (this.byPlayer = !0), !1);
        for (let m = 1; m <= 3; m++)
          if (
            ((p.x = a[24] - Math.sin(p.heading) * 1.5 * m),
            (p.z = a[25] - Math.cos(p.heading) * 1.5 * m),
            cl(p, d, 1))
          )
            return ((this.denied = d), (this.byPlayer = !0), !1);
      }
    }
    let f = a[24],
      u = a[25];
    for (let d of this.cars) {
      if (
        d === t ||
        d.cv ||
        Math.abs(d.x - f) > 24 ||
        Math.abs(d.z - u) > 24 ||
        Math.abs(d.y - t.y) > 3
      )
        continue;
      let p = Math.hypot(d.x - f, d.z - u);
      if (
        d.E === e.F && d.dir === e.dir && d.k === e.k
          ? d.v < 4 && p < t.V.L + d.V.L / 2 + 1 + d.v * 1.5
          : d.v < 1.5 && p < (t.V.L + d.V.L) / 2 + 1
      )
        return ((this.denied = d), (this.full = !0), !1);
    }
    return !0;
  }
  separate() {
    let t = this._grid,
      e = this.roads,
      s = this._spb || (this._spb = {}),
      n = this._spq || (this._spq = {}),
      i = this._spw || (this._spw = { x: 0, z: 0, heading: 0, V: null }),
      a = this.frame,
      r = (d) => d.net || d.mp || d.wreck || d.tt || d.cop?.free || !d.E,
      l = (d) => {
        let p = d._sv;
        return ((i.x = p.x), (i.z = p.z), (i.heading = p.h), (i.V = d.V), i);
      },
      c = (d) =>
        !r(d) && d._sv?.f === a && d._sv.E === d.E && d._sv.cv === d.cv,
      h = (d, p) =>
        Math.max(
          0,
          (p.v || 0) *
            (d.fx * -Math.sin(p.heading) + d.fz * -Math.cos(p.heading)),
        ),
      f = (d, p) => {
        if (d.cv)
          return (
            e.bez(d.cv, d.cv.t, s),
            d.cv.t <= 0
              ? !1
              : ((d.cv.t = Math.max(
                  0,
                  d.cv.t - p / Math.max(Math.hypot(s.dx, s.dz), 0.5),
                )),
                (d.x -= d.fx * p),
                (d.z -= d.fz * p),
                !0)
          );
        let m = la(d.s - d.dir * p, d.E.s0, d.E.s1);
        return m === d.s
          ? !1
          : ((d.s = m), (d.x -= d.fx * p), (d.z -= d.fz * p), !0);
      },
      u = this.sepStats || (this.sepStats = { side: 0, step: 0, ease: 0 });
    for (let d of this.cars) {
      if (r(d) || (d.route && this.lineHidden)) continue;
      if (this.nearPl(d) && c(d)) {
        let g = this.onParked(d, d);
        if (g && !cl(l(d), g, 1)) {
          let b = d._sv;
          ((d.x = b.x),
            (d.z = b.z),
            (d.y = b.y),
            (d.pitch = b.p),
            (d.heading = b.h),
            (d.fx = -Math.sin(b.h)),
            (d.fz = -Math.cos(b.h)),
            (d.s = b.s),
            (d.lat = b.lat),
            (d.cvOff = b.cvOff),
            d.cv && (d.cv.t = b.t),
            (d.v = 0),
            (u.parked = (u.parked || 0) + 1),
            (d._pkT = d._pkF === a - 1 ? d._pkT + (this._dt || 0) : 0),
            (d._pkF = a),
            d._pkT > 1.5 &&
              !d.rev &&
              (d._revN || 0) < 2 &&
              !d.line &&
              ((d.rev = 3),
              (d._revN = (d._revN || 0) + 1),
              (u.pkBack = (u.pkBack || 0) + 1)),
            d._pkT > 8 &&
              ((d._pkOff = this.t + 5),
              (d._pkT = 0),
              (u.pkOff = (u.pkOff || 0) + 1)));
        }
      }
      let p = Math.floor(d.x / 48),
        m = Math.floor(d.z / 48);
      for (let g = p - 1; g <= p + 1; g++)
        for (let b = m - 1; b <= m + 1; b++) {
          let v = t?.get(g * 4096 + b);
          if (v)
            for (let x of v) {
              if (
                x === d ||
                x.heading === void 0 ||
                Math.abs(x.x - d.x) > 12 ||
                Math.abs(x.z - d.z) > 12 ||
                (x.x - d.x) ** 2 + (x.z - d.z) ** 2 >
                  ((d.V.L + x.V.L) * 0.5 + 1) ** 2 ||
                Math.abs(x.y - d.y) > 2.5 ||
                (x.route && this.lineHidden) ||
                !cl(d, x, 1)
              )
                continue;
              let y = (z, A) => (A.x - z.x) * z.fx + (A.z - z.z) * z.fz > 0,
                M =
                  c(d) && y(d, x) && !cl(l(d), x, 1)
                    ? d
                    : c(x) && y(x, d) && !cl(l(x), d, 1)
                      ? x
                      : null,
                S = M === d ? x : d;
              if (M) {
                let z = M._sv;
                if (!M.cv && Math.abs((M.lat ?? 0) - z.lat) > 1e-4) {
                  let A = M.lat,
                    T = M.x,
                    E = M.z;
                  ((M.lat = z.lat), e.pose(M, n), (M.x = n.x), (M.z = n.z));
                  let R = M.heading;
                  if (((M.heading = z.h), !cl(M, S, 1))) {
                    ((M.fx = -Math.sin(z.h)),
                      (M.fz = -Math.cos(z.h)),
                      u.side++);
                    continue;
                  }
                  ((M.lat = A), (M.x = T), (M.z = E), (M.heading = R));
                }
                ((M.x = z.x),
                  (M.z = z.z),
                  (M.y = z.y),
                  (M.pitch = z.p),
                  (M.heading = z.h),
                  (M.fx = -Math.sin(z.h)),
                  (M.fz = -Math.cos(z.h)),
                  (M.s = z.s),
                  (M.lat = z.lat),
                  (M.cvOff = z.cvOff),
                  M.cv && (M.cv.t = z.t),
                  (M.v = Math.min(M.v, h(M, S))),
                  u.step++,
                  (M._sepT =
                    M._sepF === a - 1 && M._sepBy === S
                      ? M._sepT + (this._dt || 0)
                      : 0),
                  (M._sepF = a),
                  (M._sepBy = S),
                  M._sepT > 1.5 &&
                    !r(S) &&
                    !S.line &&
                    !S.rev &&
                    S.v < 0.3 &&
                    ((S.rev = 2.5),
                    (M._sepT = 0),
                    (u.backed = (u.backed || 0) + 1)));
                continue;
              }
              let w = (x.x - d.x) * d.fx + (x.z - d.z) * d.fz,
                _ =
                  (d.x - x.x) * -Math.sin(x.heading) +
                  (d.z - x.z) * -Math.cos(x.heading);
              w <= 0 ||
                (w < _ && !r(x)) ||
                (f(d, 0.1), (d.v = Math.min(d.v, h(d, x))), u.ease++);
            }
        }
    }
  }
  backUp(t, e) {
    let s = this.roads,
      n = t.x,
      i = t.z,
      a = t.heading,
      r = t.s,
      l = t.cv?.t;
    if (t.cv) {
      let c = s.bez(t.cv, t.cv.t, this._bz);
      if (((t.cv.t -= e / Math.max(Math.hypot(c.dx, c.dz), 0.5)), t.cv.t <= 0))
        return ((t.cv.t = l), !1);
    } else {
      let c = la(t.s - t.dir * e, t.E.s0, t.E.s1);
      if (c === t.s) return !1;
      t.s = c;
    }
    ((t.x -= t.fx * e), (t.z -= t.fz * e));
    for (let c of (this._pb ? [...this.cars, this._pb] : this.cars).concat(
      this.nearPl(t) ? this.parkedBy(t) : [],
    ))
      if (
        c !== t &&
        Math.abs(c.x - t.x) < 12 &&
        Math.abs(c.z - t.z) < 12 &&
        Math.abs(c.y - t.y) < 2.5 &&
        c.heading !== void 0 &&
        cl(t, c, 1)
      )
        return (
          (t.x = n),
          (t.z = i),
          (t.heading = a),
          (t.fx = -Math.sin(a)),
          (t.fz = -Math.cos(a)),
          t.cv ? (t.cv.t = l) : (t.s = r),
          !1
        );
    return !0;
  }
  advanceCurve(t, e, s = 0, n = !1) {
    let i = this.roads,
      a = t.cv,
      r = i.bez(a, a.t, this._bz),
      l = Math.hypot(r.dx, r.dz);
    if (((a.t += (t.v * e + s) / Math.max(l, 0.5)), a.t >= 1)) {
      let v = a.to;
      ((t.E = v.F),
        (t.dir = v.dir),
        (t.k = v.k),
        (t.s = i.sIn(v.F, v.dir)),
        (t.lat = a.lat),
        (t.cv = null),
        (t.nx = null),
        (t.claim = null),
        (t.passed = !1),
        (t.stopDone = !1),
        (t.waitT = 0),
        (t.passOff = 0),
        t.cvPass &&
          ((t.passOff = -(v.F.oneway ? 1 : v.dir) * (t.cvOff || 0)),
          (t.lat += t.passOff),
          (t.cvPass = !1),
          (t.cvOff = 0)),
        t.route && (t.ri = (t.ri + 1) % t.route.length));
      let x = this.roads.pose(t, this._pz);
      t.y = x.y;
      return;
    }
    i.bez(a, a.t, r);
    let c = Math.hypot(r.dx, r.dz) || 1,
      h = t.x,
      f = t.z,
      u = t.y,
      d = r.dx / c,
      p = r.dz / c,
      m = r.x,
      g = r.z;
    ((t.cvPass || t.cvOff) &&
      ((t.cvOff = la(
        (t.cvOff || 0) + (t.cvPass ? 1 : -1) * Math.min(1.8, 0.4 * t.v) * e,
        0,
        t.V.bw + 1.5,
      )),
      (m += p * t.cvOff),
      (g -= d * t.cvOff)),
      (t._latErr = t.cvPass ? t.V.bw + 1.5 - t.cvOff : 0),
      this.track(t, m, g, Math.atan2(-d, -p), e, n));
    {
      if (a.yA === void 0) {
        a.yA = t.y;
        let x = a.to.F;
        a.yB = Ot(
          x,
          Math.max(0, Math.min(x.L, i.sIn(x, a.to.dir))),
          this._cy || (this._cy = {}),
        ).y;
      }
      let v = Math.min(1, Math.max(0, a.t));
      t.y = a.yA + (a.yB - a.yA) * v * v * (3 - 2 * v);
    }
    if (t.E?.hwy || a.to.F?.hwy) {
      let v = null,
        x = 1.5;
      for (let y of i.L.probe(t.x, t.z).all) {
        let M = Math.abs(y.y - t.y);
        M < x && ((x = M), (v = y));
      }
      v && (t.y = v.y);
    }
    let b = Math.hypot(t.x - h, t.z - f);
    b > 0.001 &&
      (t.pitch += (Math.atan2(t.y - u, b) - t.pitch) * Math.min(1, e * 5));
  }
  startTurntable(t) {
    let e = (t.ri + 1) % t.route.length,
      s = t.route[e],
      n = t.route[(e + 1) % t.route.length];
    ((this.turnarounds = (this.turnarounds || 0) + 1),
      (t.tt = {
        t: 0,
        x0: t.x,
        z0: t.z,
        h0: t.heading,
        double: !!s.double,
        next: n,
        ri: (e + 1) % t.route.length,
      }),
      (t.nx = null),
      (t.brake = 1));
  }
  turntable(t, e) {
    let s = t.tt;
    s.t += e;
    let n = this.roads,
      i = s.next;
    if (!s.target) {
      let l = i.E,
        c = l === t.E ? t.s : n.sIn(l, i.dir),
        h = Math.max(1, l.lanes);
      s.target = {
        E: l,
        dir: i.dir,
        s: Math.min(l.s1, Math.max(l.s0, c)),
        k: l.oneway ? Math.floor((h - 1) / 2) : 0,
      };
    }
    let a = la((s.t - 4) / 5, 0, 1),
      r = a * a * (3 - 2 * a);
    if (s.t > 4 && !s.posed) {
      let l = s.target,
        c = { E: t.E, dir: t.dir, s: t.s, k: t.k, lat: t.lat };
      (Object.assign(t, l), (t.lat = void 0));
      let h = this.roads.pose(t, this._pz);
      ((s.x1 = h.x),
        (s.z1 = h.z),
        (s.lat = h.target),
        (s.h1 = Math.atan2(-h.fx, -h.fz)),
        (s.pose = { y: h.y }),
        Object.assign(t, c),
        (s.posed = !0));
    }
    (s.posed &&
      ((t.heading = s.double ? (r < 0.5 ? s.h0 : s.h1) : s.h0 + Math.PI * r),
      (t.x = s.x0 + (s.x1 - s.x0) * r),
      (t.z = s.z0 + (s.z1 - s.z0) * r),
      (t.fx = -Math.sin(t.heading)),
      (t.fz = -Math.cos(t.heading))),
      (t.v = 0),
      (t.brake = 1),
      s.t > 11 &&
        (Object.assign(t, s.target),
        (t.lat = s.lat),
        (t.ri = s.ri),
        (t.tt = null),
        (t.nx = null),
        (t.passed = !1),
        (t.stopDone = !1),
        (t.waitT = 0),
        (t.brake = 0),
        this.poseEdge(t)));
  }
  shove(t, e, s, n, i) {
    if (t.net) {
      this.onNetShove?.(t, e, s, n, i);
      return;
    }
    if (this.crushed && !t.line && !t.mp && t.kind !== "moto") {
      let u = Math.hypot(e, s),
        d = vc(t.kind);
      u / d > 0.8 &&
        this.crushed.crush(
          t,
          this.sets[t.kind],
          n,
          i,
          -e,
          -s,
          (u * (1 / d + 1 / 1600)) / 1.1,
        );
    }
    if (t.cop?.free && !t.wreck && this.onCopShove) {
      this.onCopShove(t, e, s, n, i);
      return;
    }
    if (t.line || t.mp) return;
    let a = vc(t.kind),
      r = (a * (t.V.L * t.V.L + t.V.bw * t.V.bw)) / 12;
    t.wreck ||
      ((t.wreck = {
        vx: -Math.sin(t.heading) * t.v,
        vz: -Math.cos(t.heading) * t.v,
        r: 0,
        t: 0,
        dead: !1,
      }),
      (t.passOff = 0),
      (t.cvPass = !1),
      (t.cvOff = 0),
      (t.passBy = null));
    let l = -e / a,
      c = -s / a;
    ((t.wreck.vx += l),
      (t.wreck.vz += c),
      (t.wreck.r += ((n - t.x) * s - (i - t.z) * e) / r));
    let h = Math.hypot(l, c);
    ((t.dmg = (t.dmg || 0) + Math.max(0, h - 1.5) ** 2 / 45),
      h > 0.3 && (t.wreck.t = 0),
      t.dmg >= 1 && (t.wreck.dead = !0));
    let f = ((n - t.x) * s - (i - t.z) * e) / r;
    if (t.wreck.rb) {
      let u = t.wreck.rb;
      (Ic.set(n - u.p.x, Math.max(-u.y0 + 0.15, t.y + 0.45 - u.p.y), i - u.p.z),
        (u.v.x = t.wreck.vx - l),
        (u.v.z = t.wreck.vz - c),
        (u.w.y = t.wreck.r - f),
        u.hitAt(Ic, Nnt.set(-e, 0, -s)),
        (t.wreck.vx = u.v.x),
        (t.wreck.vz = u.v.z),
        (t.wreck.r = u.w.y));
    } else if (h > Lnt && !t.cop?.free && t.kind !== "moto") {
      let u = t.wreck,
        d = Math.min(1, (h - Lnt) / 10);
      ((u.air = !0),
        (u.airT = 0),
        (u.flat = !1),
        (u.dead = !0),
        (u.yOff = null),
        (t.dmg = Math.max(t.dmg, 1)));
      let p = (u.rb = new y2({
        hx: t.V.bw / 2,
        hz: t.V.L / 2,
        h: t.V.H || 1.45,
        y0: 0.5,
        mass: a,
        roll: 0.7,
      }));
      (jv.set(-(t.pitch || 0), t.heading + Math.PI, t.roll || 0, "YXZ"),
        p.q.setFromEuler(jv),
        p.p
          .set(0, p.y0, 0)
          .applyQuaternion(p.q)
          .add(Ic.set(t.x, t.y, t.z)),
        p.v.set(u.vx - l, 0, u.vz - c),
        p.w.set(0, u.r - f, 0),
        Ic.set(n - p.p.x, t.y + 0.45 - p.p.y, i - p.p.z),
        p.hitAt(Ic, Nnt.set(-e, 0, -s)),
        (u.vx = p.v.x),
        (u.vz = p.v.z),
        (u.r = p.w.y),
        (u.rr = p.w.length()),
        (u.pr = 0),
        this.onLaunch?.(t, d));
    }
    ((t.v = 0),
      (t.hits = (t.hits || 0) + 1),
      (this.shoves ||= []).push({
        id: t.id,
        dv: +h.toFixed(2),
        air: !!t.wreck.air,
        rr: +(t.wreck.rr || 0).toFixed(2),
        pr: +(t.wreck.pr || 0).toFixed(2),
      }),
      this.shoves.length > 20 && this.shoves.shift());
  }
  settled(t, e) {
    let s = t.wreck;
    return (
      (s.t = (s.t || 0) + e),
      !s.dead && s.t > 0.7 && Math.hypot(s.vx, s.vz) < 2 && Math.abs(s.r) < 0.35
    );
  }
  rejoinReal(t) {
    let e = this.roads,
      s = t.cv?.to,
      n = s ? s.F : t.E,
      i = s ? s.dir : t.dir,
      a = s ? s.k : t.k;
    if (!n) return ((t.wreck.dead = !0), !1);
    let r = ys(n, t.x, t.z, this._pj || (this._pj = {})),
      l = la(r.s, n.s0, n.s1),
      c = Ot(n, l, this._pq || (this._pq = {})),
      h = -Math.sin(t.heading),
      f = -Math.cos(t.heading),
      u = (x) =>
        Math.atan2(h * c.dz * x - f * c.dx * x, h * c.dx * x + f * c.dz * x),
      d = u(i);
    !n.oneway && Math.abs(d) > Math.PI - 1.2 && ((i = -i), (d = u(i)));
    let p = (t.x - c.x) * c.nx + (t.z - c.z) * c.nz,
      m = c.dx * i,
      g = c.dz * i;
    if (!s || i !== s.dir) {
      let x = 1e9;
      for (let y = 0; y < e.lanes(n); y++) {
        let M = Math.abs(e.laneV(n, i, y, c.w) - p);
        M < x && ((x = M), (a = y));
      }
    }
    let b = e.laneV(n, i, a, c.w);
    if (Math.abs(d) > 1.2 || Math.abs(p - b) > 3.2 || r.d > c.w + 1.5)
      return (t.wreck.t > 4 && (t.wreck.dead = !0), !1);
    let v = Math.max(0, t.wreck.vx * m + t.wreck.vz * g);
    Object.assign(t, {
      E: n,
      dir: i,
      k: a,
      s: l,
      lat: p,
      cv: null,
      nx: null,
      passed: !1,
      stopDone: !1,
      waitT: 0,
      stuckT: 0,
      passOff: 0,
      cvPass: !1,
      cvOff: 0,
      passBy: null,
      wreck: null,
      v,
    });
    {
      let x = t.y,
        y = this.roads.pose(t, this._pz);
      t._woff = la(x - y.y, -0.25, 0.25);
    }
    return (
      (t.hOff = 0),
      (t.hS = 0),
      (t.recovered = (t.recovered || 0) + 1),
      (this.recovered = (this.recovered || 0) + 1),
      (t.fx = -Math.sin(t.heading)),
      (t.fz = -Math.cos(t.heading)),
      !0
    );
  }
  rejoinGrid(t) {
    if (t.turn) return ((t.wreck.dead = !0), !1);
    let e = t.axis === "c" ? ps[t.idx] : ns[t.idx],
      s = Lc(e, t.lane),
      n =
        t.axis === "c"
          ? t.dir > 0
            ? Math.PI
            : 0
          : t.dir > 0
            ? -Math.PI / 2
            : Math.PI / 2,
      i =
        t.axis === "c"
          ? t.x - (he[t.idx] - t.dir * s)
          : t.z - (pe[t.idx] + t.dir * s),
      a = Math.atan2(Math.sin(t.heading - n), Math.cos(t.heading - n));
    if (Math.abs(a) > 0.7 || Math.abs(i) > 3.2)
      return (t.wreck.t > 4 && (t.wreck.dead = !0), !1);
    let r = -Math.sin(n),
      l = -Math.cos(n);
    return (
      (t.v = Math.max(0, t.wreck.vx * r + t.wreck.vz * l)),
      (t.wreck = null),
      (t.latOff = i),
      (t.hOff = a),
      (t.plan = null),
      (t.recovered = (t.recovered || 0) + 1),
      (this.recovered = (this.recovered || 0) + 1),
      !0
    );
  }
  passGrid(t, e) {
    let s = t.axis === "c" ? ps[t.idx] : ns[t.idx];
    if (
      s.lanes < 2 ||
      t.latOff ||
      ((t.wreckT = (t.wreckT || 0) + e), t.wreckT < 0.8)
    )
      return;
    t.wreckT = 0;
    let n = t.lane > 0 ? t.lane - 1 : t.lane + 1,
      i = Lc(s, t.lane) - Lc(s, n);
    ((t.lane = n), (t.latOff = (t.axis === "c" ? -t.dir : t.dir) * i));
  }
  wreckHits(t, e) {
    let s = { x: Math.cos(t.heading), z: -Math.sin(t.heading) },
      n = { x: Math.sin(t.heading), z: Math.cos(t.heading) },
      i = t.V.bw / 2,
      a = t.V.L / 2,
      r = t.wreck,
      l = vc(t.kind),
      c = this._wa || (this._wa = {});
    for (let h = 0; h < 2; h++) {
      let f = e.near(t.x, t.z, a + 1);
      for (let m of e.parked.awake)
        Math.abs(m.x - t.x) < 8 && Math.abs(m.z - t.z) < 8 && f.add(m);
      for (let m of this.colliders)
        m.traffic !== t &&
          Math.abs(m.x - t.x) < 8 &&
          Math.abs(m.z - t.z) < 8 &&
          f.add(m);
      let u = null;
      for (let m of f) {
        if (
          m.dead ||
          m.traffic === t ||
          (m.y1 !== void 0 && (t.y > m.y1 + 0.3 || t.y + 1.4 < m.y0))
        )
          continue;
        let g = e.test(m, t.x, t.z, s, n, i, a);
        g && (!u || g.d > u.d) && ((u = g), (g.c = m));
      }
      if (!u) return;
      let d = u.c,
        p = u.n;
      if (
        ((c.m = l),
        (c.I = (l * (t.V.L * t.V.L + t.V.bw * t.V.bw)) / 12),
        (c.vx = r.vx),
        (c.vz = r.vz),
        (c.w = r.r),
        (c.x = t.x),
        (c.z = t.z),
        d.parked)
      ) {
        let m = e.parked,
          g = m.view((d.b || m.wake(d), d)),
          b = 1 / c.m / (1 / c.m + 1 / g.m);
        ((t.x += p.x * u.d * b),
          (t.z += p.z * u.d * b),
          (d.x -= p.x * u.d * (1 - b)),
          (d.z -= p.z * u.d * (1 - b)),
          (g.x = d.x),
          (g.z = d.z),
          (c.x = t.x),
          (c.z = t.z));
        let v = Nr(c, g, p, u.px, u.pz, 0.15, 0.3);
        (v && m.kick(d, -v * p.x, -v * p.z), (d.b.moving = !0), m.moved.add(d));
      } else if (d.traffic) {
        let m = d.traffic;
        ((t.x += p.x * u.d * 0.5),
          (t.z += p.z * u.d * 0.5),
          (c.x = t.x),
          (c.z = t.z),
          !m.wreck &&
            !m.line &&
            ((m.x -= p.x * u.d * 0.5), (m.z -= p.z * u.d * 0.5)));
        let g = e.trafficView(m),
          b = Nr(c, g, p, u.px, u.pz, 0.15, 0.3);
        b && !m.line && this.shove(m, b * p.x, b * p.z, u.px, u.pz);
      } else
        ((t.x += p.x * (u.d + 0.002)),
          (t.z += p.z * (u.d + 0.002)),
          (c.x = t.x),
          (c.z = t.z),
          Nr(c, i6t, p, u.px, u.pz, 0.1, 0.3));
      ((r.vx = c.vx), (r.vz = c.vz), (r.r = c.w));
    }
  }
  wheels(t, e) {
    let s = -Math.sin(t.heading),
      n = -Math.cos(t.heading);
    t._rlx == null &&
      ((t._rlx = t.x),
      (t._rlz = t.z),
      (t._rlh = t.heading),
      (t.spin = (t.id || 0) * 6.283),
      (t.steer = 0));
    let i = (t.x - t._rlx) * s + (t.z - t._rlz) * n,
      a = t.heading - t._rlh;
    if (
      ((a -= Math.round(a / (2 * Math.PI)) * 2 * Math.PI),
      (t._rlx = t.x),
      (t._rlz = t.z),
      (t._rlh = t.heading),
      Math.abs(i) > 4)
    )
      return;
    t.spin = (t.spin + i / f_(t.kind)) % (2 * Math.PI);
    let r = ro[t.kind],
      l = r ? r[0][1] - r[2][1] : t.V.L * 0.6,
      c =
        Math.abs(i) > 0.002
          ? Math.max(-0.6, Math.min(0.6, Math.atan((l * a) / i)))
          : t.steer;
    t.steer += (c - t.steer) * Math.min(1, e * 10);
  }
  netKinds() {
    return this._nk || (this._nk = Object.keys(Io));
  }
  netPack(t) {
    t.nid ||
      (t.nid = (this._nid = ((this._nid || 0) + 1) % 1e6) || (this._nid = 1));
    let e = _h.indexOf(t.color),
      s = (i) => Math.round(i * 10) / 10,
      n = (i) => Math.round(i * 100) / 100;
    return [
      t.nid,
      s(t.x),
      s(t.y),
      s(t.z),
      n(t.heading),
      n(t.pitch || 0),
      s(t.wreck ? Math.hypot(t.wreck.vx, t.wreck.vz) : t.v),
      this.netKinds().indexOf(t.kind),
      e,
      t.brake ? 1 : 0,
      t.line ? 1 : 0,
    ];
  }
  netList(t, e, s) {
    let n = this.ghosts || (this.ghosts = new Map()),
      i = new Set();
    for (let a of e) {
      let r = t + ":" + a[0],
        l = this.netKinds()[a[7]];
      if (!l || !this.sets[l]) continue;
      if (this.netGone?.has(r)) {
        if (performance.now() - this.netGone.get(r) < 3e3) continue;
        this.netGone.delete(r);
      }
      i.add(r);
      let c = n.get(r);
      if (!c || c.kind !== l) {
        (c && this.netDrop(r),
          (c = {
            net: r,
            owner: t,
            nid: a[0],
            kind: l,
            V: Io[l],
            dyn: m4[l],
            color: a[8] >= 0 ? _h[a[8]] : l === "taxi" ? Wz : Yx,
            line: !!a[10],
            cable: /^(cablecar|streetcar)/.test(l),
            bus: l === "bus",
            x: a[1],
            y: a[2],
            z: a[3],
            heading: a[4],
            pitch: a[5],
            v: a[6],
            fx: -Math.sin(a[4]),
            fz: -Math.cos(a[4]),
            brake: a[9],
            wreck: null,
            stuckT: 0,
            id: this.nextId(),
            snaps: [],
          }),
          n.set(r, c),
          this.cars.push(c));
        for (let d = this.cars.length - 1; d >= 0; d--) {
          let p = this.cars[d];
          if (
            p.handed &&
            p.handTo === t &&
            Math.hypot(p.x - c.x, p.z - c.z) < 9 &&
            Math.abs(p.y - c.y) < 2 &&
            Math.cos(p.heading - c.heading) > 0.7
          ) {
            this.cars.splice(d, 1);
            break;
          }
        }
      }
      let h = c.snaps,
        f = h[h.length - 1];
      ((!f || s > f.t) &&
        (h.push({
          t: s,
          x: a[1],
          y: a[2],
          z: a[3],
          h: a[4],
          p: a[5],
          v: a[6],
          b: a[9],
        }),
        h.length > 6 && h.shift(),
        (c.got = performance.now())),
        (c.miss = 0));
      let u = null;
      for (let d = this.cars.length - 1; d >= 0; d--) {
        let p = this.cars[d];
        if (!(
          p.net ||
          p.route ||
          Math.abs(p.x - c.x) > 9 ||
          Math.abs(p.z - c.z) > 9 ||
          Math.abs(p.y - c.y) > 2 ||
          !cl(
            p,
            c,
            p.kind === c.kind &&
              p.color === c.color &&
              Math.cos(p.heading - c.heading) > 0.9
              ? 1
              : 0.85,
          )
        ))
          if (p.handed || t < (this.netSeat || 0)) {
            this.cars.splice(d, 1);
            let m = this.netStats || (this.netStats = {});
            m.dupOwn = (m.dupOwn || 0) + 1;
          } else c.dupSent || ((c.dupSent = !0), this.onNetDup?.(c), (u = r));
      }
      u &&
        (this.netDrop(u, "dup"),
        (this.netGone || (this.netGone = new Map())).set(u, performance.now()));
    }
    for (let [a, r] of n)
      r.owner === t &&
        !i.has(a) &&
        (r.miss = (r.miss || 0) + 1) > 3 &&
        this.netDrop(a, "miss");
  }
  netLane(t) {
    if (
      t.net ||
      t.cop ||
      t.route ||
      t.wreck ||
      t.cv ||
      !t.E ||
      t.passBy ||
      t.passOff
    )
      return null;
    let s = (
      this._ei || (this._ei = new Map(this.roads.D.edges.map((i, a) => [i, a])))
    ).get(t.E);
    if (s === void 0) return null;
    let n = (i) => Math.round(i * 10) / 10;
    return [
      s,
      t.dir,
      n(t.s),
      t.k,
      n(t.v),
      this.netKinds().indexOf(t.kind),
      _h.indexOf(t.color),
      t.bus ? 1 : 0,
    ];
  }
  netAdopt(t, e = null) {
    let s = this.roads?.D.edges[t[0]],
      n = this.netKinds()[t[5]];
    if (!s || !n || !this.sets[n]) return null;
    let i = t[6] >= 0 ? _h[t[6]] : n === "taxi" ? Wz : Yx,
      a = this.addReal(
        {
          E: s,
          dir: t[1] > 0 ? 1 : -1,
          s: Math.max(s.s0, Math.min(s.s1, t[2])),
          k: t[3] | 0,
        },
        t[7] ? "bus" : null,
        [n, i],
      );
    if (!a) return a;
    if (
      ((a.v = Math.max(0, t[4])),
      e && e._drawn && Number.isFinite(e.x + e.z + e.heading))
    ) {
      let r = ys(s, e.x, e.z, this._pj || (this._pj = {}));
      Math.abs(r.s - a.s) < 15 &&
        Math.abs(r.v - a.lat) < 4 &&
        ((a.s = la(r.s, s.s0, s.s1)),
        (a.lat = r.v),
        this.poseEdge(a),
        (a.heading = a._h = e.heading),
        (a.fx = -Math.sin(e.heading)),
        (a.fz = -Math.cos(e.heading)),
        (a.v = Math.max(0, e.v || a.v)));
    }
    return a;
  }
  netDrop(t, e = "other") {
    let s = this.ghosts?.get(t);
    if (!s) return null;
    let n = this.netStats || (this.netStats = {});
    ((n[e] = (n[e] || 0) + 1), this.ghosts.delete(t));
    let i = this.cars.indexOf(s);
    return (i >= 0 && this.cars.splice(i, 1), s);
  }
  netDropOwner(t) {
    if (this.ghosts)
      for (let [e, s] of [...this.ghosts]) s.owner === t && this.netDrop(e);
  }
  netStep(t, e = 1 / 60) {
    let s = t.snaps,
      n = this.netClock ? this.netClock(t.owner) : null;
    if (!s.length || n == null) return;
    let i = s[s.length - 1],
      a = s.length > 1 ? s[s.length - 2] : null,
      r = performance.now() - (t.got || 0) > (this.netHold || 250) + 150,
      l =
        a && i.t - a.t > 30 && i.t - a.t < 400
          ? Math.max(
              -1.2,
              Math.min(
                1.2,
                Math.atan2(Math.sin(i.h - a.h), Math.cos(i.h - a.h)) /
                  ((i.t - a.t) / 1e3),
              ),
            )
          : 0,
      c = Math.max(0, Math.min(350, n - i.t)) / 1e3,
      h = i.h + (l * c) / 2,
      f = i.h + l * c,
      u = i.x - Math.sin(h) * i.v * c,
      d = i.z - Math.cos(h) * i.v * c;
    if (!Number.isFinite(u + d + i.h)) return;
    let p = r ? 0 : -Math.sin(f) * i.v,
      m = r ? 0 : -Math.cos(f) * i.v;
    if (
      !t._drawn ||
      !Number.isFinite(t.x + t.z + t.heading) ||
      Math.hypot(u - t.x, d - t.z) > 12
    )
      ((t.x = u),
        (t.z = d),
        (t.y = i.y),
        (t.heading = f),
        (t._vx = p),
        (t._vz = m),
        (t._drawn = !0),
        this.netWheels(t, i.y));
    else {
      let g = this.netW || 10,
        b = u,
        v = d,
        x = Math.max(1, Math.ceil(e / 0.008)),
        y = e / x;
      for (let M = 0; M < x; M++)
        ((t._vx += (g * g * (b - t.x) + 2 * g * (p - t._vx)) * y),
          (t._vz += (g * g * (v - t.z) + 2 * g * (m - t._vz)) * y),
          (t.x += t._vx * y),
          (t.z += t._vz * y),
          (b += p * y),
          (v += m * y));
      {
        let M = Math.hypot(t._vx, t._vz),
          S = t._vx * Math.sin(t.heading) + t._vz * Math.cos(t.heading) > 0,
          w =
            M > 0.5
              ? S
                ? Math.atan2(t._vx, t._vz)
                : Math.atan2(-t._vx, -t._vz)
              : t.heading;
        t.heading +=
          Math.atan2(Math.sin(w - t.heading), Math.cos(w - t.heading)) *
          Math.min(1, e * 10);
      }
      this.netWheels(t, i.y) ||
        ((t.y += (i.y - t.y) * Math.min(1, e * 8)), (t.pitch = i.p));
    }
    ((t.v = r ? 0 : i.v),
      (t.fx = -Math.sin(t.heading)),
      (t.fz = -Math.cos(t.heading)),
      (t.brake = i.b));
  }
  netWheels(t, e) {
    return this.netGround ? this.wheels4(t, this.netGround, e) : !1;
  }
  wheels4(t, e, s) {
    let n = (g, b) => e(g, b, s - 0.7),
      i = -Math.sin(t.heading),
      a = -Math.cos(t.heading),
      r = -Math.cos(t.heading),
      l = Math.sin(t.heading),
      c = t.V.L * 0.29,
      h = t.V.bw * 0.42,
      f = (g, b) => n(t.x + i * c * g + r * h * b, t.z + a * c * g + l * h * b),
      u = f(1, 1),
      d = f(1, -1),
      p = f(-1, 1),
      m = f(-1, -1);
    return !Number.isFinite(u + d + p + m) ||
      Math.max(u, d, p, m) - Math.min(u, d, p, m) > 2.5 ||
      Math.abs(u - d) > 0.45 ||
      Math.abs(p - m) > 0.45 ||
      Math.abs(u - p) > 0.35 + 0.7 * c ||
      Math.abs(d - m) > 0.35 + 0.7 * c ||
      Math.abs(u - d - p + m) > 0.4
      ? !1
      : ((t.y = (u + d + p + m) / 4),
        (t.pitch = Math.atan2((u + d - p - m) / 2, 2 * c)),
        (t.roll = Math.atan2((u + p - d - m) / 2, 2 * h)),
        !0);
  }
  draw() {
    let t = new Set(Object.values(this.sets));
    for (let u of t) ((u.n = 0), (u.nf = 0));
    let e = this._plx,
      s = this._plz,
      n = VB * VB,
      i = (u, d) => {
        let p = d ? "farPrev" : "prev",
          m = (d ? u.far : u.meshes[0]).instanceMatrix.count;
        if (!u[p]) {
          u[p] = new Float32Array(m * 16);
          for (let g of d ? [u.far] : u.meshes)
            ((g.userData.mbPrevInstance = u[p]),
              (g.userData.mbPrevVersion = 0));
        }
        return u[p];
      },
      a = (this._frame = (this._frame || 0) + 1),
      r = Math.min(0.1, this.t - (this._wt ?? this.t));
    this._wt = this.t;
    let l = this.cam?.position;
    this.undrawn = 0;
    for (let u of this.cars) {
      let d = this.sets[u.kind];
      if (!d || (u.route && this.lineHidden)) continue;
      if (l) {
        let g = l.x - u.x,
          b = l.z - u.z,
          v = Math.cos(u.heading),
          x = Math.sin(u.heading);
        if (
          Math.abs(g * v - b * x) < u.V.bw / 2 + 0.35 &&
          Math.abs(g * x + b * v) < u.V.L / 2 + 0.35 &&
          l.y > u.y - 0.5 &&
          l.y < u.y + (u.V.H || 1.6) + 0.35
        )
          continue;
      }
      let p =
        d.far &&
        e != null &&
        (u.x - e) ** 2 + (u.z - s) ** 2 > n &&
        (!l || (u.x - l.x) ** 2 + (u.z - l.z) ** 2 > n);
      if (
        !p &&
        u._crushed &&
        this.crushed &&
        (this._e.set(-u.pitch, u.heading + Math.PI, u.roll || 0, "YXZ"),
        this._q.setFromEuler(this._e),
        this._p.set(u.x, u.y, u.z),
        this._m.compose(this._p, this._q, this._s),
        this.wheels(u, r),
        (this._m.elements[3] = u.spin),
        (this._m.elements[7] = u.steer),
        Zx(this._c, u.color, u.brake, !u.wreck),
        u.cop?.lit && (this._c.b += u.cop.lit * 4),
        this.crushed.draw(u, this._m, this._c, a))
      )
        continue;
      let m = p ? d.nf++ : d.n++;
      if (((u._far = p), m >= d.meshes[0].instanceMatrix.count)) {
        (p ? d.nf-- : d.n--, this.undrawn++);
        continue;
      }
      (this._e.set(-u.pitch, u.heading + Math.PI, u.roll || 0, "YXZ"),
        this._q.setFromEuler(this._e),
        this._p.set(u.x, u.y, u.z),
        this._m.compose(this._p, this._q, this._s),
        this.wheels(u, r),
        (this._m.elements[3] = u.spin),
        (this._m.elements[7] = u.steer));
      {
        let g = i(d, p),
          b = this._m.elements;
        ((!u._pm || u._pmF !== a - 1) && (u._pm = Float32Array.from(b)),
          g.set(u._pm, m * 16),
          u._pm.set(b),
          (u._pmF = a));
      }
      if (p) {
        (d.far.setMatrixAt(m, this._m),
          Zx(this._c, u.color, u.brake, !u.wreck),
          u.cop?.lit && (this._c.b += u.cop.lit * 4),
          d.far.setColorAt(m, this._c));
        continue;
      }
      for (let g of d.meshes) g.setMatrixAt(m, this._m);
      d.lamps
        ? (d.paint.setColorAt(m, u.color),
          d.lamps.setColorAt(m, this._c.setScalar(u.brake ? 1 : 0.18)))
        : d.paint &&
          (Zx(this._c, u.color, u.brake, !u.wreck),
          u.cop?.lit && (this._c.b += u.cop.lit * 4),
          d.paint.setColorAt(m, this._c));
    }
    let c = 0,
      h = this.blobs,
      f = this.roads ? this._plane : $t;
    for (let u of this.cars)
      c < h.instanceMatrix.count &&
        !(u.route && this.lineHidden) &&
        ((this._bc = u),
        h.setMatrixAt(c++, Of(this._m, u.x, u.z, u.heading, u.V.bw, u.V.L, f)));
    ((h.count = c),
      (h.instanceMatrix.needsUpdate = !0),
      this.crushed?.update(this.cars, a, this._dt || 1 / 60));
    for (let u of t) {
      for (let d of u.meshes)
        ((d.count = u.n),
          (d.instanceMatrix.needsUpdate = !0),
          d.instanceColor && (d.instanceColor.needsUpdate = !0),
          d.userData.mbPrevInstance && d.userData.mbPrevVersion++);
      if (u.far) {
        let d = u.far;
        ((d.count = u.nf),
          (d.instanceMatrix.needsUpdate = !0),
          d.instanceColor && (d.instanceColor.needsUpdate = !0),
          d.userData.mbPrevInstance && d.userData.mbPrevVersion++);
      }
    }
  }
};
