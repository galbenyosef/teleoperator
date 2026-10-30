// app 393 — math
// Lines 195417-196021 of readable/app.pretty.js (statement-aligned).
var CT = class {
  link(t, e) {
    let s = (a, r) =>
        (Math.round(a * 100) + 4e6) * 8e6 + Math.round(r * 100) + 4e6,
      n = new Map();
    for (let a of e) (a.t === "circ" || a.t === "obb") && n.set(s(a.x, a.z), a);
    let i = new Map();
    for (let a of t) a.kind === "farm" && a.refs && i.set(s(a.x, a.z), a);
    for (let a of t) {
      if (
        (a.kind === "fpole" && (a.arm = i.get(s(a.x, a.z)) || null),
        !(d1[a.kind] || iN[a.kind]) || !a.refs)
      )
        continue;
      let r = n.get(s(a.x, a.z));
      if (!r) {
        let l =
          (Q6t[a.kind] ?? 0.2) * (iN[a.kind] ? Math.min(1.3, a.scale || 1) : 1);
        ((r = {
          t: "circ",
          x: a.x,
          z: a.z,
          r: l,
          y0: a.y - 1.5,
          y1: a.y + 6,
          added: !0,
        }),
          this.world?.index(r),
          this.added++);
      }
      ((r.prop = a), this.linked++);
    }
  }
  constructor(t, e, s, n, i) {
    ((this.fx = i),
      (this.live = 0),
      (this.debris = []),
      (this.broken = []),
      (this.shakes = []),
      (this.jets = []),
      (this.t = 0),
      (this.props = t),
      (this.world = n),
      (this.tk = {}),
      (this.linked = 0),
      (this.added = 0),
      this.link(e, s),
      (n.onProp = (r, l, c) => this.hit(r, l, c)),
      (this.group = new le()),
      (this.group.name = "Debris"),
      t.add(this.group),
      (this.sets = {}));
    for (let r of Object.keys(d1)) this.setFor(r);
    ((this.NW = 1600), (this.drops = []));
    let a = new Le();
    (a.setAttribute("position", new Te(new Float32Array(this.NW * 3), 3)),
      a.setAttribute("color", new Te(new Float32Array(this.NW * 4), 4)),
      a.setDrawRange(0, 0),
      (this.water = new Zr(
        a,
        new _r({
          size: 0.55,
          map: typeof document > "u" ? null : nSt(),
          transparent: !0,
          depthWrite: !1,
          vertexColors: !0,
          sizeAttenuation: !0,
        }),
      )),
      (this.water.frustumCulled = !1),
      (this.water.name = "HydrantWater"),
      (this.water.renderOrder = 2),
      this.group.add(this.water),
      (this._m = new fe()),
      (this._m2 = new fe()),
      (this._q = new tn()),
      (this._v = new dt()),
      (this._s = new dt()),
      (this._R = new yn()),
      (this._c = new It()));
  }
  setFor(t) {
    if (this.sets[t] !== void 0) return this.sets[t];
    let e = this.props?.userData.K,
      s = this.props?.userData.mats,
      n = e?.[t],
      i = n ? (n.lods ? n.lods[0] : n) : null;
    if (!i?.length || !s) return (this.sets[t] = null);
    let a = n.lods ? eSt : uit,
      r = new It(1, 1, 1),
      l = new It(0, 0, 0),
      c = (this.sets[t] = i.map(({ mat: h, geo: f }) => {
        let u = new En(f, s[h], a);
        ((u.count = 0),
          (u.visible = !1),
          (u.frustumCulled = !1),
          (u.castShadow = !/lamp|signal/.test(h)),
          (u.receiveShadow = !0),
          (u.name = "debris_" + t + "_" + h),
          (u.matrixAutoUpdate = !1),
          (u.userData.lamp = h === "lamp"));
        for (let d = 0; d < a; d++) u.setColorAt(d, h === "signal" ? l : r);
        return (this.group.add(u), u);
      }));
    return ((c.cap = a), c);
  }
  treeK(t) {
    let e = t.dk || t.kind;
    if (this.tk[e]) return this.tk[e];
    let s = this.props?.userData.K?.[e]?.lods?.top || 9,
      n = /palm|cordyline/.test(e),
      i = n ? 700 : 1200,
      a = s * (n ? 0.22 : 0.3),
      r = s * 0.72;
    return (this.tk[e] = {
      cls: "heavy",
      m: i,
      com: s * (n ? 0.6 : 0.5),
      I: [(i * s * s) / 9, i * (a * 0.45) ** 2],
      pts: [
        [0, 0, 0],
        [0, s, 0],
        [a, r, 0],
        [-a, r, 0],
        [0, r, a],
        [0, r, -a],
      ],
      loss: 0,
      take: 0.25,
      impact: 0.85,
      lift: 0.25,
      wood: !0,
      ...(n ? { v0: 95 / 3.6, vb: 85 / 3.6, f: 0.5 } : {}),
    });
  }
  hit(t, e, s) {
    let n = t.prop,
      i = Math.hypot(e.vel.x, e.vel.z),
      a = !!iN[n.kind],
      r = a ? this.treeK(n) : d1[n.kind];
    if (!r) return !1;
    let l = fit[r.cls],
      c = r.v0 ?? l.v0,
      h = s?.n ? -(e.vel.x * s.n.x + e.vel.z * s.n.z) : i,
      f = Math.max(h, i * 0.7);
    if (i < 0.3 || f < c) return (a && i > 2.5 && this.shake(n, e, i), !1);
    ((t.dead = !0),
      (n.broken = !0),
      this.props &&
        (this.props.userData.gen = (this.props.userData.gen | 0) + 1));
    let u = tSt(r, l, i),
      d = u / Math.max(i, 1e-6);
    ((e.vel.x *= d), (e.vel.z *= d));
    let p = l.impact
      ? Math.min(
          1,
          Math.max(r.impact, l.impact) * (0.85 + (0.15 * f) / Math.max(c, 1)),
        )
      : r.impact;
    ((e.impact = Math.max(e.impact || 0, p)),
      l.impT &&
        ((e.impactT = Math.max(e.impactT || 0, l.impT)),
        (e.drift = (e.drift || 0) * (r.cls === "heavy" ? 0.5 : 0.8))),
      l.hit &&
        s &&
        this.world?.hit &&
        ((s.c = t),
        s.n && (e.impactN = { x: s.n.x, z: s.n.z, s: p }),
        this.world.hit(
          s,
          p,
          !1,
          !1,
          r.cls === "heavy" ? Math.max(10, i - u) : Math.max(3.5, i - u),
          0,
        )));
    let m = [],
      g = [],
      b = this._z || (this._z = new fe().makeScale(0, 0, 0));
    for (let v = 0; v < n.refs.length; v += 2) {
      let x = n.refs[v],
        y = n.refs[v + 1],
        M = new fe();
      (x.getMatrixAt(y, M),
        m.push(M),
        x.setMatrixAt(y, b),
        (x.instanceMatrix.needsUpdate = !0));
    }
    if (n.srefs)
      for (let v = 0; v < n.srefs.length; v += 2) {
        let x = n.srefs[v],
          y = n.srefs[v + 1],
          M = new fe();
        (x.getMatrixAt(y, M),
          g.push(M),
          x.setMatrixAt(y, b),
          (x.instanceMatrix.needsUpdate = !0));
      }
    if (n.lod)
      for (let v of [n.lod, ...(n.lod.more || [])])
        for (let x of v.ims)
          (x.setMatrixAt(v.k, b), (x.instanceMatrix.needsUpdate = !0));
    if (n.arm?.refs)
      for (let v = 0; v < n.arm.refs.length; v += 2) {
        let x = n.arm.refs[v],
          y = n.arm.refs[v + 1],
          M = new fe();
        (x.getMatrixAt(y, M),
          g.push(M),
          x.setMatrixAt(y, b),
          (x.instanceMatrix.needsUpdate = !0));
      }
    if (a) {
      let v = this.shakes.findIndex((x) => x.p === n);
      v >= 0 && this.shakes.splice(v, 1);
    }
    return (
      this.broken.push({ p: n, c: t, saved: m, ssaved: g, veg: !!n.dm, t: 0 }),
      this.spawn(
        n,
        r,
        n.dm || m[0],
        e,
        Math.hypot(e.vel.x, e.vel.z),
        s,
        l,
        (a && n.dk) || n.kind,
      ),
      !0
    );
  }
  spawn(t, e, s, n, i, a, r = fit[e.cls], l = t.kind) {
    (this.setFor(l), this.debris.length >= uit && this.debris.shift());
    let c = new dt(),
      h = new tn(),
      f = new dt();
    s.decompose(c, h, f);
    let u = new dt(0, 1, 0),
      d = new dt(0, e.com * f.y, 0).applyQuaternion(h),
      p = n.vel.x / Math.max(i, 0.001),
      m = n.vel.z / Math.max(i, 0.001),
      g = () => Math.random() - 0.5,
      b = {
        src: t,
        kind: l,
        K: e,
        life: r?.life ?? 20,
        s: f,
        q: h,
        x: c.clone().add(d),
        comL: new dt(0, e.com * f.y, 0),
        age: 0,
        rest: 0,
        flick: /lamp/.test(t.kind) ? 1.6 : 0,
        v: new dt(
          n.vel.x * e.take + g() * 1.5,
          (1.5 + Math.min(4.5, i * 0.12) * (e.m < 50 ? 1.6 : 1)) *
            (e.lift ?? 1),
          n.vel.z * e.take + g() * 1.5,
        ),
        w: new dt(),
      };
    {
      let M = Math.hypot(b.v.x, b.v.z);
      (M > 9 && ((b.v.x *= 9 / M), (b.v.z *= 9 / M)),
        (b.v.y = Math.min(b.v.y, 6)));
    }
    let v = new dt(p, 0, m).cross(u);
    (e.cls === "heavy"
      ? b.w
          .copy(v)
          .multiplyScalar(-(0.9 + i * 0.07))
          .add(new dt(g(), g(), g()).multiplyScalar(0.3))
      : e.com > 1
        ? b.w
            .copy(v)
            .multiplyScalar(((i * (1 - e.take * 0.8)) / e.com) * 1.1)
            .add(new dt(g(), g() * 2, g()).multiplyScalar(0.8))
        : b.w
            .copy(v)
            .multiplyScalar(-(5 + i * 0.15))
            .add(new dt(g(), g(), g()).multiplyScalar(3)),
      this.debris.push(b));
    let x = this.fx,
      y = c.y + 0.5;
    if (x) {
      let M = a?.px ?? c.x,
        S = a?.pz ?? c.z;
      for (let w = 0; w < (e.metal ? 34 : 14); w++)
        x.sp.push({
          x: M,
          y: y + Math.random() * 0.4,
          z: S,
          vx: n.vel.x * 0.5 + g() * 7,
          vy: 1 + Math.random() * 4,
          vz: n.vel.z * 0.5 + g() * 7,
          age: 0,
          life: 0.25 + Math.random() * 0.45,
        });
      for (let w = 0; w < (e.cls === "heavy" ? 14 : 5); w++)
        x.p.push({
          x: c.x + g(),
          y: c.y + 0.2,
          z: c.z + g(),
          vx: n.vel.x * 0.12 + g() * 2,
          vy: 0.4 + Math.random() * 0.6,
          vz: n.vel.z * 0.12 + g() * 2,
          age: 0,
          life: 1 + Math.random() * 0.6,
          a: 0.1,
        });
    }
    e.water && this.jets.push({ x: c.x, y: c.y + 0.25, z: c.z, t: 0, dur: 14 });
  }
  shake(t, e, s) {
    let n = this.shakes.find((c) => c.p === t),
      i = Math.min(0.09, s * 0.004) / (t.scale || 1);
    if (n && n.amp * Math.exp(-n.t * 2.5) >= i * 0.7) return;
    let a = [];
    if (!n)
      for (let c = 0; c < t.refs.length; c += 2) {
        let h = new fe();
        (t.refs[c].getMatrixAt(t.refs[c + 1], h), a.push(h));
      }
    this._z ||= new fe().makeScale(0, 0, 0);
    let r = Math.max(s, 0.001),
      l = new dt(e.vel.x / r, 0, e.vel.z / r).cross(new dt(0, -1, 0));
    if (
      (n
        ? ((n.t = 0), (n.amp = i), (n.ax = l))
        : this.shakes.push({ p: t, saved: a, t: 0, amp: i, ax: l }),
      this.fx)
    )
      for (let c = 0; c < 6; c++)
        this.fx.p.push({
          x: t.x + (Math.random() - 0.5) * 3,
          y: t.y + 5 + Math.random() * 3,
          z: t.z + (Math.random() - 0.5) * 3,
          vx: 0,
          vy: -0.3,
          vz: 0,
          age: 0,
          life: 1.5,
          a: 0.08,
        });
  }
  update(t, e, s = 1) {
    ((this.t += t), this.stepDebris(t), this.drawDebris(t));
    for (let n = this.shakes.length - 1; n >= 0; n--) {
      let i = this.shakes[n];
      i.t += t;
      let a = i.amp * Math.exp(-i.t * 2.5) * Math.sin(i.t * 11),
        r = i.t > 2.2,
        l = i.p;
      this._m2
        .makeTranslation(l.x, l.y, l.z)
        .multiply(this._m.makeRotationAxis(i.ax, r ? 0 : a))
        .multiply(this._m.makeTranslation(-l.x, -l.y, -l.z));
      let c = l.cs ?? 3,
        h = l.dmc || l.dm;
      for (let f = 0; f < l.refs.length; f += 2) {
        let u = l.refs[f],
          d = h ? (u.userData.fade ? c & 1 : c & 2) : 1;
        (u.setMatrixAt(
          l.refs[f + 1],
          d ? this._m.multiplyMatrices(this._m2, h || i.saved[f / 2]) : this._z,
        ),
          (u.instanceMatrix.needsUpdate = !0));
      }
      if (l.lod)
        for (let f of [l.lod, ...(l.lod.more || [])])
          for (let u of f.ims)
            (u.setMatrixAt(f.k, this._m.multiplyMatrices(this._m2, f.m)),
              (u.instanceMatrix.needsUpdate = !0));
      r && this.shakes.splice(n, 1);
    }
    for (let n = this.broken.length - 1; n >= 0; n--) {
      let i = this.broken[n];
      if (
        ((i.t += t),
        !(i.t < sSt || Math.hypot(i.p.x - e.pos.x, i.p.z - e.pos.z) < 160))
      ) {
        for (let a = 0; a < i.p.refs.length; a += 2) {
          let r = i.p.refs[a];
          (r.setMatrixAt(i.p.refs[a + 1], i.veg ? this._z : i.saved[a / 2]),
            (r.instanceMatrix.needsUpdate = !0));
        }
        if (i.p.srefs)
          for (let a = 0; a < i.p.srefs.length; a += 2) {
            let r = i.p.srefs[a];
            (r.setMatrixAt(i.p.srefs[a + 1], i.ssaved[a / 2]),
              (r.instanceMatrix.needsUpdate = !0));
          }
        if (i.p.arm?.refs)
          for (let a = 0; a < i.p.arm.refs.length; a += 2) {
            let r = i.p.arm.refs[a];
            (r.setMatrixAt(i.p.arm.refs[a + 1], i.ssaved[a / 2]),
              (r.instanceMatrix.needsUpdate = !0));
          }
        ((i.c.dead = !1),
          (i.p.broken = !1),
          this.broken.splice(n, 1),
          this.props &&
            (this.props.userData.gen = (this.props.userData.gen | 0) + 1));
      }
    }
    (this.updateWater(t, s),
      (this.live = this.debris.length + this.shakes.length));
  }
  stepDebris(t) {
    let e = Math.max(1, Math.ceil(t / 0.008333333333333333)),
      s = t / e,
      n = this._v,
      i = this._R,
      a = new dt(),
      r = new dt(),
      l = new dt(),
      c = new dt(),
      h = new dt();
    for (let f of this.debris) {
      if (((f.age += t), f.rest > 1)) continue;
      let u = f.K,
        d = [1 / u.I[0], 1 / u.I[1], 1 / u.I[0]],
        p = 1 / u.m;
      for (let m = 0; m < e; m++) {
        ((f.v.y -= dit * s), f.x.addScaledVector(f.v, s));
        let g = f.w,
          b = f.q,
          v = new tn(g.x * s * 0.5, g.y * s * 0.5, g.z * s * 0.5, 0).multiply(
            b,
          );
        (b.set(b.x + v.x, b.y + v.y, b.z + v.z, b.w + v.w).normalize(),
          i.setFromMatrix4(this._m.makeRotationFromQuaternion(b)));
        let x = (M, S) => (
            a.copy(M).applyMatrix3(this._m3t(i)),
            a.set(a.x * d[0], a.y * d[1], a.z * d[2]),
            S.copy(a).applyMatrix3(i)
          ),
          y = 0;
        for (let M of u.pts) {
          n.set(M[0] * f.s.x, M[1] * f.s.y, M[2] * f.s.z)
            .sub(f.comL)
            .applyQuaternion(b);
          let S = f.x.x + n.x,
            w = f.x.y + n.y,
            _ = f.x.z + n.z,
            z = Wi(S, _);
          if (
            w >= z ||
            ((y = Math.max(y, z - w)), c.copy(f.w).cross(n).add(f.v), c.y >= 0)
          )
            continue;
          (r.set(-n.z, 0, n.x), x(r, l));
          let A = p + l.clone().cross(n).y,
            T = (-1.25 * c.y) / A;
          h.set(0, T, 0);
          let E = c.clone();
          E.y = 0;
          let R = E.length();
          if (R > 1e-4) {
            let P = E.multiplyScalar(1 / R),
              C = n.clone().cross(P);
            x(C, l);
            let I = p + l.cross(n).dot(P),
              L = Math.min(R / I, 0.55 * T);
            h.addScaledVector(P, -L);
          }
          (f.v.addScaledVector(h, p), x(n.clone().cross(h), l), f.w.add(l));
        }
        {
          let M = f.w.length(),
            S = u.cls === "heavy" ? 4 : 30;
          M > S && f.w.multiplyScalar(S / M);
        }
        if (y > 0) {
          let M = u.cls === "heavy" ? 2.4 : 1;
          ((f.x.y += y * 0.8),
            f.v.multiplyScalar(Math.exp(-s * 1.5 * M)),
            f.w.multiplyScalar(Math.exp(-s * 2.5 * M)));
        }
      }
      f.rest =
        f.v.lengthSq() + f.w.lengthSq() * 4 <
          (f.K.cls === "heavy" ? 0.1 : 0.02) && f.age > 1
          ? f.rest + t
          : 0;
    }
  }
  _m3t(t) {
    return (this._Rt ||= new yn()).copy(t).transpose();
  }
  drawDebris(t) {
    for (let s = this.debris.length - 1; s >= 0; s--)
      this.debris[s].age > this.debris[s].life + 1.5 &&
        this.debris.splice(s, 1);
    let e = {};
    for (let s of this.debris) {
      let n = this.sets[s.kind];
      if (!n) continue;
      let i = (e[s.kind] = e[s.kind] || 0);
      if (i >= n.cap) continue;
      e[s.kind]++;
      let a = s.age > s.life ? Math.max(0.001, 1 - (s.age - s.life) / 1.5) : 1;
      this._v.copy(s.comL).multiplyScalar(a).applyQuaternion(s.q);
      let r = this._v.set(
        s.x.x - this._v.x,
        s.x.y - this._v.y,
        s.x.z - this._v.z,
      );
      (this._m.compose(r, s.q, this._s.copy(s.s).multiplyScalar(a)),
        s.flick > 0 && (s.flick -= t));
      for (let l of n)
        (l.setMatrixAt(i, this._m),
          l.userData.lamp &&
            l.setColorAt(
              i,
              this._c.setScalar(
                s.flick > 0 && Math.random() < 0.3 + (0.4 * s.flick) / 1.6
                  ? 1
                  : 0,
              ),
            ));
    }
    for (let [s, n] of Object.entries(this.sets))
      if (n)
        for (let i of n) {
          let a = e[s] || 0;
          (a === 0 && i.count === 0) ||
            ((i.count = a),
            (i.visible = a > 0),
            (i.instanceMatrix.needsUpdate = !0),
            i.instanceColor && (i.instanceColor.needsUpdate = !0));
        }
  }
  updateWater(t, e) {
    let s = this.drops;
    for (let l = this.jets.length - 1; l >= 0; l--) {
      let c = this.jets[l];
      if (((c.t += t), c.t > c.dur)) {
        this.jets.splice(l, 1);
        continue;
      }
      let h = Math.min(1, (c.dur - c.t) / 3),
        f = 280 * h * t;
      for (let u = 0; u < f; u++)
        if (Math.random() < f - u && s.length < this.NW) {
          let d = Math.random() * 6.283,
            p = (0.2 + Math.random() * 1.2) * (0.5 + h * 0.5);
          s.push({
            x: c.x,
            y: c.y,
            z: c.z,
            vx: Math.cos(d) * p,
            vy: (8.5 + Math.random() * 4) * (0.55 + 0.45 * h),
            vz: Math.sin(d) * p,
            age: 0,
            life: 2.4,
            splash: 0,
          });
        }
    }
    let n = this.water.geometry.attributes.position.array,
      i = this.water.geometry.attributes.color.array,
      a = 0.5 + 0.45 * e,
      r = 0;
    for (let l = s.length - 1; l >= 0; l--) {
      let c = s[l];
      if (
        ((c.age += t),
        (c.vy -= dit * t),
        (c.x += c.vx * t),
        (c.y += c.vy * t),
        (c.z += c.vz * t),
        !c.splash && c.vy < 0)
      ) {
        let f = Wi(c.x, c.z);
        c.y < f + 0.05 &&
          ((c.splash = 1),
          (c.y = f + 0.05),
          (c.vy = 0.8 + Math.random()),
          (c.vx = (Math.random() - 0.5) * 3),
          (c.vz = (Math.random() - 0.5) * 3),
          (c.life = c.age + 0.4));
      }
      if (c.age > c.life) {
        ((s[l] = s[s.length - 1]), s.pop());
        continue;
      }
      let h = (c.splash ? 0.35 : 0.55) * Math.min(1, (c.life - c.age) * 3);
      ((n[r * 3] = c.x),
        (n[r * 3 + 1] = c.y),
        (n[r * 3 + 2] = c.z),
        (i[r * 4] = 0.78 * a),
        (i[r * 4 + 1] = 0.86 * a),
        (i[r * 4 + 2] = 0.95 * a),
        (i[r * 4 + 3] = h),
        r++);
    }
    (this.water.geometry.setDrawRange(0, r),
      (this.water.visible = r > 0),
      r &&
        ((this.water.geometry.attributes.position.needsUpdate = !0),
        (this.water.geometry.attributes.color.needsUpdate = !0)));
  }
};
