// app 313 — math
// Lines 150645-150987 of readable/app.pretty.js (statement-aligned).
var $_ = class {
  constructor({
    prep: t = !1,
    scene: e = null,
    ground: s = null,
    panels: n = !1,
    scale: i = 0.4,
  } = {}) {
    ((this.loose = new j_(e, s)),
      (this.wsev = [0, 0, 0, 0]),
      (this.woff = new Set()),
      (this.wheelOff = 0),
      (this.scale = i),
      (this.car = null),
      (this.parts = []),
      (this.list = []),
      (this.applied = 0),
      (this.seen = performance.now()),
      (this.prep = t),
      (this.todo = []),
      (this.queue = []),
      (this.panels = new U_(this, { scene: e, ground: s })),
      (this.panels.off = !n));
  }
  attach(t) {
    if (
      (this.detach(),
      (this.car = t),
      (this.list = []),
      (this.applied = 0),
      (this.queue = []),
      !t?.root)
    )
      return;
    let e = new Set();
    for (let a of t.wheels || [])
      (a.steer && e.add(a.steer), a.spin && e.add(a.spin));
    let s = (a) => {
        for (let r = a; r && r !== t.root; r = r.parent)
          if (e.has(r)) return !0;
        return !1;
      },
      n = (a) =>
        (Array.isArray(a.material) ? a.material : [a.material]).filter(Boolean),
      i = new Set();
    (t.root.traverse((a) => {
      if (!a.isMesh) return;
      let r = a.geometry,
        l = r?.attributes?.position,
        c = r?.attributes?.normal,
        h = !r?.attributes?.color && n(a).every((f) => !f.vertexColors);
      if (!h) for (let f of n(a)) i.add(f);
      a.isInstancedMesh ||
        a.isSkinnedMesh ||
        s(a) ||
        /shadow/i.test(a.name) ||
        !l ||
        !c ||
        !(l.data || l).array?.length ||
        r.morphAttributes?.position ||
        this.parts.push(Awt(a, h));
    }),
      (this.scuffed = new Set()));
    for (let a of this.parts)
      if (a.scuff)
        for (let r of n(a.o))
          i.has(r) || ((r.userData.mbScuff = !0), this.scuffed.add(r));
    for (let a of this.parts)
      a.scuff && n(a.o).some((r) => !this.scuffed.has(r)) && (a.scuff = !1);
    ((this.todo = this.prep ? this.parts.slice() : []), this.panels.attach());
  }
  detach() {
    this.car && (this.panels.reset(0, !0), this.wheelsBack());
    for (let t of this.parts) t.g && ((t.o.geometry = t.g0), t.g.dispose());
    for (let t of this.scuffed || []) delete t.userData.mbScuff;
    ((this.parts = []), (this.car = null), (this.scuffed = null));
  }
  repair() {
    for (let t of this.parts)
      if (t.g) {
        if (t.g.attributes.position.array.length !== t.p0.length) {
          ((t.o.geometry = t.g0),
            t.g.dispose(),
            (t.g = null),
            (t.ownIdx = t.cut = !1));
          continue;
        }
        (t.g.attributes.position.array.set(t.p0),
          t.g.attributes.normal.array.set(t.n0),
          t.acc.fill(0),
          (t.accR = 0),
          (t.dirty = !0));
        let e = t.g.attributes.color?.array;
        if (e && t.scuff) for (let s = 3; s < e.length; s += 4) e[s] = 0;
      }
    this.applied = 0;
  }
  update(t, e, s, n = 1 / 60) {
    if ((s !== this.car && this.attach(s), !this.parts.length || !e)) return 0;
    let i = e.dents || 0;
    if (i < this.applied) {
      ((this.list.length = Math.min(this.list.length, i)),
        this.panels.reset(i),
        this.repair(),
        (this.queue.length = 0),
        this.wheelsBack());
      for (let r of this.list)
        (this.apply(r, r.depth, r.scr), this.panels.hit(r, r.depth));
      (this.run(),
        this.panels.settle(e, i, !0),
        (this.applied = this.list.length));
    }
    let a = 0;
    if (this.todo.length && !this.queue.length) {
      let r = this.todo.pop();
      this.own(r) && Utt(r);
    }
    if (t)
      for (let r of t) {
        if (r.t <= this.seen || ((this.seen = r.t), r.lx === void 0)) continue;
        let l;
        if (r.v >= bwt)
          ((l = Htt(r.v, r.C, this.scale)),
            (l.scr = Math.min(0.6, l.depth / 0.4)));
        else if (r.vt >= Ett)
          l = {
            depth: 0,
            W: 0.25,
            F: 0.3,
            Z: 0.3,
            kind: "car",
            scr: Math.min(0.7, (r.vt - Ett) / 12 + 0.2),
          };
        else continue;
        ((a += this.add({ x: r.lx, z: r.lz, nx: r.lnx, nz: r.lnz }, l, r.t)),
          r.v >= Swt &&
            (r.J && e?.S?.mass ? Math.hypot(r.J.x, r.J.z) / e.S.mass : r.v) >=
              kwt &&
            !(r.t - (this.wheelLastT ?? -1e12) < zwt) &&
            this.wheelHit(r.lx, r.lz, wO, r.t, e, r));
      }
    (this.loose.update(n),
      this.run(ywt) || this.panels.settle(e, this.list.length),
      this.panels.update(n, e),
      (this.applied = this.list.length),
      (e.dents = this.applied));
    for (let r of this.parts)
      r.dirty &&
        ((r.dirty = !1),
        (r.g.attributes.position.needsUpdate = !0),
        (r.g.attributes.normal.needsUpdate = !0),
        r.g.attributes.color && (r.g.attributes.color.needsUpdate = !0));
    return a;
  }
  add(t, e, s) {
    let n = this.list[this.list.length - 1];
    if (
      n &&
      s - n.t < _tt &&
      (n.kind === "roof") == (e.kind === "roof") &&
      Math.hypot(t.x - n.x, (t.y ?? V_) - (n.y ?? V_), t.z - n.z) < vwt
    ) {
      let i = Math.max(0, Math.min(e.depth, n.Z / 1.6) - n.depth),
        a = Math.max(0, (e.scr || 0) - n.scr);
      return (
        (i > 0 || a > 0) &&
          (this.apply(n, i, a),
          (n.depth += i),
          (n.scr += a),
          this.panels.hit(n, i)),
        (n.t = s),
        0
      );
    }
    return (
      Object.assign(t, {
        depth: e.depth,
        W: e.W,
        F: e.F,
        Z: e.Z,
        kind: e.kind,
        lam: 0.15 + 0.12 * Math.min(1, e.depth),
        scr: e.scr || 0,
        t: s,
        seed: this.list.length * 7.31 + 1,
      }),
      this.list.push(t),
      this.apply(t, t.depth, t.scr),
      this.panels.hit(t, t.depth),
      1
    );
  }
  wheelHit(t, e, s, n, i, a) {
    let r = this.car,
      l = this.panels.box;
    if (!r?.wheels?.length || !l) return;
    let c = e < l.lo[2] + 1.5,
      h = e > l.hi[2] - 1.5;
    if ((!c && !h) || s < Ftt) return;
    let f = (c ? 0 : 2) + (t < 0 ? 0 : 1),
      u = n - (this.wsT?.[f] ?? -1e9) < _tt * 2;
    (n - (this.wsT?.[f] ?? -1e9) > Ott &&
      ((this.wsev[f] = 0), this.wsL && (this.wsL[f] = 0)),
      ((this.wsT ||= [])[f] = n));
    let d = (this.wsL ||= [0, 0, 0, 0]);
    if (
      ((this.wsev[f] += u ? Math.max(0, s - d[f]) : s),
      (d[f] = u ? Math.max(s, d[f]) : s),
      this.wsev[f] < wO || this.woff.size)
    )
      return;
    let p = r.root;
    (p.updateMatrixWorld(!0), x2.copy(p.matrixWorld).invert());
    let m = null,
      g = 1 / 0;
    for (let z of r.wheels) {
      let A = z.steer || z.spin;
      if (!A || !A.visible) continue;
      h0.setFromMatrixPosition(A.matrixWorld).applyMatrix4(x2);
      let T =
        Math.abs(h0.x - (t < 0 ? -1 : 1)) +
        Math.abs(h0.z - (c ? l.lo[2] : l.hi[2]));
      T < g && ((g = T), (m = z));
    }
    if (!m) return;
    let b = m.steer || m.spin,
      v = b.clone(!0);
    (b.updateMatrixWorld(!0),
      b.matrixWorld.decompose(v.position, v.quaternion, v.scale),
      (b.visible = !1),
      this.woff.add(m));
    let x = Math.atan2(-(i?.forward?.().x ?? 0), -(i?.forward?.().z ?? 1)),
      y = t < 0 ? -1 : 1,
      M = Math.cos(x) * y,
      S = -Math.sin(x) * y,
      w = a ? { x: a.nx, z: a.nz } : { x: 0, z: 0 },
      _ = Btt.set(
        (i?.vel?.x || 0) * 0.85 + M * 4.5 + w.x * 2,
        2.2 + Math.random() * 1.5,
        (i?.vel?.z || 0) * 0.85 + S * 4.5 + w.z * 2,
      );
    (IM.setFromAxisAngle(Ntt, x),
      v.quaternion.copy(IM),
      this.loose.add(v, {
        r: i?.S?.wheelR || 0.34,
        hw: 0.13,
        vel: _,
        yaw: x,
        spin: 0,
      }),
      (this.wheelOff = performance.now()),
      (this.wheelLastT = n));
  }
  wheelsBack() {
    for (let t of this.woff) {
      let e = t.steer || t.spin;
      e && (e.visible = !0);
    }
    (this.woff.clear(),
      this.wsev.fill(0),
      this.wsL?.fill(0),
      (this.wheelOff = 0));
  }
  ground(t, e, s, n) {
    if (!this.car?.root || !this.parts.length) return;
    let i = Dtt(n * 0.8);
    if (!i) return;
    let a = this.car.root;
    (a.updateMatrixWorld(!0), x2.copy(a.matrixWorld).invert());
    let r = new dt(t, e, s).applyMatrix4(x2),
      l = new dt(0, 1, 0).transformDirection(x2);
    this.add(
      { x: r.x, y: r.y, z: r.z, nx: l.x, ny: l.y, nz: l.z },
      i,
      performance.now(),
    );
  }
  apply(t, e, s = 0) {
    let n = this.car.root;
    (n.updateMatrixWorld(!0), x2.copy(n.matrixWorld).invert());
    for (let i of this.parts) {
      Ttt.multiplyMatrices(x2, i.o.matrixWorld);
      let a = Ttt.clone().invert();
      MO(this.queue, i, t, e, s, a, t.y ?? V_);
    }
  }
  own(t) {
    return X_(t);
  }
  run(t = 1 / 0) {
    let e = performance.now(),
      s = 0;
    for (; s < this.queue.length && (s === 0 || performance.now() - e < t);) {
      let n = Gtt(this.queue[s++]);
      n && this.queue.splice(s, 0, n);
    }
    return (this.queue.splice(0, s), this.queue.length > 0);
  }
};
function Htt(o, t = null, e = 1) {
  let s = Math.min(0.7, 0.01 * o + 0.001 * o * o) * e,
    n = 0.85,
    i = 0.8,
    a = "wall",
    r = 0;
  return (
    t?.t === "circ"
      ? ((a = "pole"),
        (r = Math.min(0.6, Math.max(0.08, t.r || 0.15))),
        (s = Math.min(0.85, s * 1.2)),
        (n = r),
        (i = 0.9))
      : (t?.parked || t?.traffic || t?.car) &&
        ((a = "car"), (s *= 0.75), (n = 0.6), (i = 0.7)),
    (s = Math.min(0.85, s)),
    { depth: s, W: n, F: i, kind: a, r, Z: Math.max(0.45, 2.4 * s) }
  );
}
function Dtt(o) {
  let t = Math.min(0.32, 0.006 * o * o);
  return t < 0.05
    ? null
    : {
        depth: t,
        W: 0.45,
        F: 0.6,
        kind: "roof",
        r: 0,
        Z: Math.max(0.3, 2 * t),
        scr: Math.min(0.6, t * 2),
      };
}
var Rwt = (o) => {
  for (let t in o.attributes) {
    let e = o.attributes[t];
    if (
      !e.isInterleavedBufferAttribute &&
      e.array.length < e.count * e.itemSize
    )
      return !1;
  }
  return !o.index || o.index.array.length >= o.index.count;
};
