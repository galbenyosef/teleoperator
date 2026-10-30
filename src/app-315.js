// app 315 — math
// Lines 151286-151580 of readable/app.pretty.js (statement-aligned).
var CM = new fe(),
  vO = new vi(),
  Att = new tn(),
  h0 = new dt(),
  Hf = new dt(),
  Cwt = new dt(1, 1, 1),
  Ptt = new fe(),
  yO = new fe(),
  LM = new fe(),
  Ctt = new WeakMap(),
  K_ = class {
    constructor(
      t,
      { max: e = 4, budget: s = 3, wheels: n = null, ground: i = null } = {},
    ) {
      ((this.scene = t),
        (this.max = e),
        (this.budget = s),
        (this.L = []),
        (this.queue = []),
        (this.wheels = n),
        (this.loose = new j_(t, i)));
    }
    crush(t, e, s, n, i, a, r, l = { car: !0 }) {
      let c = Htt(r, l, t.cop ? 2 : 1.7);
      if (c.depth < 0.04 || !e?.meshes) return;
      let h = this.L.find((d) => d.c === t);
      if (!h) {
        let d = e.meshes[0],
          p = d?.geometry,
          m = p?.attributes?.position;
        if (!m || !p.attributes.normal || !(m.data || m).array?.length) return;
        this.L.length >= this.max && this.free(this.L.shift());
        let g = new En(p, d.material, 1);
        ((g.count = 0),
          (g.frustumCulled = !1),
          (g.castShadow = !0),
          (g.receiveShadow = !0),
          (g.name = "TrafficWreck"),
          (g.userData.mbMover = !0),
          (g.userData.mbReflR = d.userData.mbReflR),
          (g.userData.mbPrevInstance = new Float32Array(16)),
          (g.userData.mbPrevVersion = 0),
          g.setColorAt(0, new It(1, 1, 1)));
        let b = Ctt.get(p);
        b ||
          Ctt.set(
            p,
            (b = {
              p0: q_(p.attributes.position),
              n0: q_(p.attributes.normal),
            }),
          );
        let v = {
          o: g,
          g0: p,
          g: null,
          p0: b.p0,
          n0: b.n0,
          acc: null,
          scuff: !1,
          grid: b.grid,
          adj: b.adj,
          wheels: !!d.material?.userData?.mbWheels,
        };
        ((h = { c: t, m: g, q: v, F: b, list: [], f: -1, pm: null }),
          this.scene?.add(g),
          this.L.push(h),
          (t._crushed = !0));
      }
      (this.frame(t),
        h0.set(s, t.y + 0.45, n).applyMatrix4(LM),
        Hf.set(i, 0, a).transformDirection(LM),
        (Hf.y = 0),
        Hf.normalize(),
        Math.abs(Hf.x) > 0.7 &&
          ((c.depth = Math.min(0.85, c.depth * 1.3)),
          (c.Z = Math.max(c.Z, 1.6 * c.depth))));
      let f = h0.x,
        u = h0.z;
      (this.add(
        h,
        {
          x: h0.x,
          y: Math.max(0.3, Math.min(0.8, h0.y)),
          z: h0.z,
          nx: Hf.x,
          nz: Hf.z,
        },
        c,
        t,
      ),
        this.wheelHit(h, t, f, u, Mwt(r) * (l?.car ? 0.75 : 1), i, a));
    }
    wheelHit(t, e, s, n, i, a, r) {
      let l = this.wheels?.[e.kind];
      if (!l || e.line || e.bus) return;
      let c =
          t.q.g0.boundingBox ||
          (t.q.g0.computeBoundingBox(), t.q.g0.boundingBox),
        h = n > c.max.z - 1.5,
        f = n < c.min.z + 1.5;
      if (!h && !f) return;
      let u = (h ? 0 : 2) + (s >= 0 ? 0 : 1),
        d = performance.now(),
        p = (t.ws ||= {
          sev: [0, 0, 0, 0],
          last: [0, 0, 0, 0],
          t: [-1e9, -1e9, -1e9, -1e9],
          off: [],
        });
      if (i < Ftt) return;
      d - p.t[u] > Ott && ((p.sev[u] = 0), (p.last[u] = 0));
      let m = d - p.t[u] < 600;
      if (
        ((p.t[u] = d),
        (p.sev[u] += m ? Math.max(0, i - p.last[u]) : i),
        (p.last[u] = m ? Math.max(i, p.last[u]) : i),
        p.sev[u] < wO || p.off.includes(u))
      )
        return;
      (p.off.push(u), (e.wheelsOff = (e.wheelsOff || 0) + 1));
      let g = l[u],
        b = u % 2 ? -1 : 1,
        v = [(b * (g[3] + g[4])) / 2, g[0], g[1]],
        x = t.q;
      if (!X_(x)) return;
      let y = x.g.attributes.position.array,
        M = new Uint32Array(y.buffer, y.byteOffset, y.length),
        S = W_(x);
      for (let L = 0; L < y.length; L += 3) {
        let F = S[L] & 7;
        (F === u + 1 || (u < 2 && F === u + 5)) &&
          ((y[L] = v[0]),
          (M[L] = (M[L] & -8) | F),
          (y[L + 1] = v[1]),
          (y[L + 2] = v[2]));
      }
      ((x.dirty = !0),
        this.frame(e),
        h0.set(v[0], v[1], v[2]).applyMatrix4(yO));
      let w = Twt(g[2], 0.12);
      w.position.copy(h0);
      let _ = e.wreck,
        z = _ ? _.vx : -Math.sin(e.heading) * (e.v || 0),
        A = _ ? _.vz : -Math.cos(e.heading) * (e.v || 0),
        T = Math.cos(e.heading + Math.PI) * b,
        E = -Math.sin(e.heading + Math.PI) * b,
        R = Math.hypot(a, r) || 1;
      this.loose.add(w, {
        r: g[2],
        hw: 0.12,
        vel: Btt.set(
          z * 0.8 + T * 4 - (a / R) * 2.5,
          2 + Math.random() * 1.8,
          A * 0.8 + E * 4 - (r / R) * 2.5,
        ),
        yaw: e.heading,
        own: !0,
      });
      let P = g[0] * 0.75,
        C = Math.max(1.5, l[0][1] - l[2][1]),
        I = Math.max(1.2, l[0][3] + l[0][4]);
      ((t.sag = {
        a: (t.sag?.a || 0) + ((h ? 1 : -1) * P) / 2 / C,
        b: (t.sag?.b || 0) - (b * P) / I,
        z: h ? l[2][1] : l[0][1],
      }),
        (t.sagM = new fe()
          .makeTranslation(0, 0, t.sag.z)
          .multiply(
            new fe().makeRotationFromEuler(vO.set(t.sag.a, 0, t.sag.b, "ZXY")),
          )
          .multiply(new fe().makeTranslation(0, 0, -t.sag.z))));
    }
    ground(t, e, s, n, i) {
      let a = this.L.find((l) => l.c === t),
        r = Dtt(i * (t.cop ? 1.3 : 1.15));
      !a ||
        !r ||
        (this.frame(t),
        h0.set(e, s, n).applyMatrix4(LM),
        Hf.set(0, 1, 0).transformDirection(LM),
        this.add(
          a,
          { x: h0.x, y: h0.y, z: h0.z, nx: Hf.x, ny: Hf.y, nz: Hf.z },
          r,
          t,
        ));
    }
    frame(t) {
      (vO.set(-(t.pitch || 0), t.heading + Math.PI, t.roll || 0, "YXZ"),
        Att.setFromEuler(vO),
        yO.compose(h0.set(t.x, t.y, t.z), Att, Cwt),
        LM.copy(yO).invert());
    }
    add(t, e, s, n) {
      let i = performance.now(),
        a = t.list[t.list.length - 1];
      if (
        a &&
        i - a.t < 300 &&
        (a.kind === "roof") == (s.kind === "roof") &&
        Math.hypot(e.x - a.x, e.y - a.y, e.z - a.z) < 0.9
      ) {
        let r = Math.min(s.Z / 1.6, s.depth) - a.depth;
        (r > 0 && (MO(this.queue, t.q, a, r, 0, Ptt), (a.depth += r)),
          (a.t = i));
        return;
      }
      (Object.assign(e, s, {
        lam: 0.15 + 0.12 * Math.min(1, s.depth),
        seed: t.list.length * 7.31 + ((n.id * 997) % 13) + 1,
        t: i,
      }),
        t.list.push(e),
        MO(this.queue, t.q, e, e.depth, 0, Ptt));
    }
    draw(t, e, s, n) {
      let i = this.L.find((l) => l.c === t);
      if (!i) return ((t._crushed = !1), !1);
      let a = i.m,
        r = e.elements;
      if (
        (a.userData.mbPrevInstance.set(i.pm && i.f === n - 1 ? i.pm : r),
        (i.pm ||= new Float32Array(16)).set(r),
        a.userData.mbPrevVersion++,
        i.sagM)
      ) {
        let l = e.elements,
          c = l[3],
          h = l[7],
          f = l[11];
        ((l[3] = l[7] = l[11] = 0),
          CM.multiplyMatrices(e, i.sagM),
          (l[3] = c),
          (l[7] = h),
          (l[11] = f),
          (CM.elements[3] = c),
          (CM.elements[7] = h),
          (CM.elements[11] = f),
          (e = CM));
      }
      return (
        a.setMatrixAt(0, e),
        (a.instanceMatrix.needsUpdate = !0),
        a.setColorAt(0, s),
        (a.instanceColor.needsUpdate = !0),
        (a.count = 1),
        (i.f = n),
        !0
      );
    }
    update(t, e, s = 1 / 60) {
      if ((this.loose.update(s), !this.L.length)) {
        this.queue.length = 0;
        return;
      }
      let n = performance.now(),
        i = 0;
      for (
        ;
        i < this.queue.length &&
        (i === 0 || performance.now() - n < this.budget);
      ) {
        let a = Gtt(this.queue[i++]);
        a && this.queue.splice(i, 0, a);
      }
      this.queue.splice(0, i);
      for (let a = this.L.length - 1; a >= 0; a--) {
        let r = this.L[a],
          l = r.q;
        ((r.F.grid ||= l.grid),
          (r.F.adj ||= l.adj),
          l.dirty &&
            l.g &&
            ((l.dirty = !1),
            (l.g.attributes.position.needsUpdate = !0),
            (l.g.attributes.normal.needsUpdate = !0)),
          r.f !== e && (r.m.count = 0),
          t.includes(r.c) || (this.free(r), this.L.splice(a, 1)));
      }
    }
    free(t) {
      ((t.c._crushed = !1),
        t.m.removeFromParent(),
        t.q.g?.dispose(),
        (this.queue = this.queue.filter((e) => e.J.q !== t.q)));
    }
    clear() {
      for (let t of this.L) this.free(t);
      ((this.L = []), (this.queue = []), this.loose.clear());
    }
  };
es();
