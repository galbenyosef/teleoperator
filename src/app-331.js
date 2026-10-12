// app 331 — math
// Lines 160933-161263 of readable/app.pretty.js (statement-aligned).
var Ux = [0.62, 0.86, 1],
  Du = {
    exposure: 1.3,
    bloom: 0.035,
    vignette: 0.42,
    glareSpread: 2.5,
    tubeDiffuse: 2,
    env: 1.15,
    tubeSpec: 2.2,
    tubeRim: 0.45,
    grade: { saturation: 0.12, contrast: 0.2, warmth: -0.03, lift: -0.004 },
  },
  mz = class {
    constructor(t, { mobile: e = !1, heroYaw: s = 0 } = {}) {
      ((this.heroYaw = s),
        (this.mb = t),
        (this.mobile = e),
        (this.on = !1),
        (this.R = 6.9),
        (this.H = 6),
        this.build());
    }
    build() {
      let t = (this.group = new ke());
      t.name = "GarageStudio";
      let e = this.R,
        s = this.H,
        n = this.mobile,
        o = (_, R, T = 0, E = 0, A = 0) => {
          let C = new _e(_, R);
          return (C.position.set(T, E, A), (C.receiveShadow = !0), t.add(C), C);
        },
        a = new Ee({
          color: new $t(0.016, 0.017, 0.019),
          roughness: 0.3,
          metalness: 0,
          roughnessMap: C3t(),
          envMapIntensity: 0.3,
        });
      a.roughnessMap.repeat.set(9, 9);
      let r = (this.floor = o(new fr(24, 160), a));
      ((r.rotation.x = -Math.PI / 2),
        (r.name = "StudioFloor"),
        n || (r.userData.mbPlanar = { r: e + 1 }),
        o(
          new ks(e + 0.3, e + 0.3, s, 96, 1, !0),
          new An({
            color: new $t(0.0014, 0.0016, 0.0019),
            roughness: 1,
            specularIntensity: 0,
            envMapIntensity: 0.2,
            side: ia,
          }),
          0,
          s / 2,
          0,
        ));
      let l = o(
        new fr(e + 0.4, 64),
        new Ee({ color: new $t(0.006, 0.006, 0.007), roughness: 1 }),
        0,
        s,
        0,
      );
      l.rotation.x = Math.PI / 2;
      let c = (this.table = new ke());
      t.add(c);
      let h = new _e(
        new J0(3.28, 3.31, 160),
        new ln({ color: new $t(0.002, 0.002, 0.002) }),
      );
      ((h.rotation.x = -Math.PI / 2), (h.position.y = 0.002));
      let f = (this.ring = new _e(
        new J0(3.31, 3.325, 160),
        xQ([0.12 * Ux[0] * 3, 0.12 * Ux[1] * 3, 0.12 * Ux[2] * 3]),
      ));
      ((f.rotation.x = -Math.PI / 2), (f.position.y = 0.003), t.add(f));
      let u = document.createElement("canvas");
      u.width = u.height = 128;
      let d = u.getContext("2d"),
        p = d.createRadialGradient(64, 64, 4, 64, 64, 64);
      (p.addColorStop(0, "rgba(0,0,0,0.95)"),
        p.addColorStop(0.5, "rgba(0,0,0,0.7)"),
        p.addColorStop(1, "rgba(0,0,0,0)"),
        (d.fillStyle = p),
        d.fillRect(0, 0, 128, 128));
      let m = new Sn(u);
      m.colorSpace = is;
      let g = (this.pool = new _e(
        new $n(1, 1),
        new ln({
          map: m,
          transparent: !0,
          depthWrite: !1,
          color: 0,
          opacity: 0.85,
        }),
      ));
      ((g.rotation.x = -Math.PI / 2),
        (g.position.y = 0.006),
        (g.renderOrder = 1),
        (g.userData.mbNoReflect = !0),
        (this.poolAt = new ke()),
        this.poolAt.add(g),
        t.add(this.poolAt));
      let b = (this.tubes = []),
        x = n ? 10 : 14,
        v = 0.024,
        y = (_, R, T, E = !1) => {
          let A = new xt(..._),
            C = new xt(...R),
            P = A.distanceTo(C),
            I = new _e(
              new ks(v, v, P, 10, 1),
              xQ([0.85, 0.95, 1].map((L) => L * T * 1.4)),
            );
          (I.position.copy(A).add(C).multiplyScalar(0.5),
            I.quaternion.setFromUnitVectors(
              new xt(0, 1, 0),
              C.clone().sub(A).normalize(),
            ),
            (I.userData.mbNoReflect = !0),
            t.add(I),
            b.push({
              a: A,
              b: C,
              radius: v,
              radiance: T,
              mesh: I,
              noFloor: E,
            }));
        },
        M = n ? 7 : 9,
        S = this.heroYaw + Math.PI,
        w = e - 0.3,
        z = [
          ...Array.from(
            { length: M },
            (_, R) => S + (R / (M - 1) - 0.5) * 2 * 1.45,
          ),
          ...Array.from(
            { length: x - M },
            (_, R) => this.heroYaw + (R / (x - M - 1) - 0.5) * 2 * 1,
          ),
        ];
      for (let _ of z)
        y(
          [Math.sin(_) * w, 0.25, Math.cos(_) * w],
          [Math.sin(_) * w, s - 0.7, Math.cos(_) * w],
          46,
        );
      for (let _ of [-0.85, 0.85]) y([_, 5.2, -2.6], [_, 5.2, 2.6], 90, !0);
      ((this.tubeData = b.map((_) => ({
        a: [0, 0, 0],
        b: [0, 0, 0],
        radius: _.radius,
        color: Ux.map((R) => R * _.radiance),
        noFloor: _.noFloor,
      }))),
        t.traverse((_) => {
          _.isMesh && (_.userData.mbMover = !0);
        }),
        (this.env = L3t(n ? 512 : 1024, b, e, s)));
      {
        let _ = new y0();
        (_.add(t), this.mb.compileAsync?.(_).catch(() => {}), _.remove(t));
      }
    }
    enter(t) {
      if (this.on) return;
      this.on = !0;
      let e = this.mb,
        s = (this.keep = {
          mb: {},
          scene: { fog: t.fog, environmentIntensity: t.environmentIntensity },
          vis: [],
        });
      for (let n of [
        "toneMappingExposure",
        "bloom",
        "vignette",
        "glareSpread",
        "grade",
        "envOverride",
        "tubes",
        "tubeDiffuse",
        "tubeSpec",
        "tubeRim",
        "motionBlur",
      ])
        s.mb[n] = e[n];
      (t.traverse((n) => {
        (n.isSunLight ||
          n.isDirectionalLight ||
          n.isHemisphereLight ||
          n.isAmbientLight ||
          n.isSky ||
          n.isWater) &&
          n.visible &&
          (s.vis.push(n), (n.visible = !1));
      }),
        (t.fog = null),
        (t.environmentIntensity = Du.env),
        (e.toneMappingExposure = Du.exposure),
        (e.bloom = Du.bloom),
        (e.vignette = Du.vignette),
        (e.glareSpread = Du.glareSpread),
        (e.grade = j5(Du.grade)),
        (e.envOverride = this.env),
        (e.tubes = this.tubeData),
        (e.tubeDiffuse = Du.tubeDiffuse),
        (e.tubeSpec = Du.tubeSpec),
        (e.tubeRim = Du.tubeRim),
        (e.motionBlur = 0),
        t.add(this.group));
    }
    leave(t) {
      if (!this.on) return;
      this.on = !1;
      let e = this.mb,
        s = this.keep;
      t.remove(this.group);
      for (let [n, o] of Object.entries(s.mb)) e[n] = o;
      ((t.fog = s.scene.fog),
        (t.environmentIntensity = s.scene.environmentIntensity));
      for (let n of s.vis) n.visible = !0;
      this.keep = null;
    }
    show(t) {
      this.state = t;
      let e = this.ring.material.color,
        s = performance.now() / 1e3;
      t === "loading"
        ? e.setRGB(
            ...Ux.map((n) => n * (0.4 + 2.6 * (0.5 + 0.5 * Math.sin(s * 4)))),
          )
        : t === "failed"
          ? e.setRGB(2.2, 0.12, 0.08)
          : e.setRGB(...Ux.map((n) => n * 0.06));
    }
    hideNear(t, e, s) {
      let n = Gx(s),
        o = Math.hypot(n.max.x - n.min.x, n.max.z - n.min.z) / 2 + 0.6,
        a = t.position.x - e.x,
        r = t.position.z - e.z,
        l = Math.hypot(a, r);
      for (let c of this.tubes) {
        if (Math.abs(c.a.y - c.b.y) < 1) continue;
        let h = c.a.x - a,
          f = c.a.z - r,
          u = Math.hypot(h, f),
          d = (h * -a + f * -r) / Math.max(0.001, u * l);
        c.mesh.visible = !(u < l && d > Math.cos(Math.atan2(o, l) + 0.04));
      }
    }
    place(t, e, s) {
      let n = this.group;
      (n.position.set(t.x, t.y, t.z),
        (this.table.rotation.y = e),
        n.updateMatrixWorld(!0));
      for (let l = 0; l < this.tubes.length; l++) {
        let c = this.tubes[l],
          h = this.tubeData[l];
        ((h.a[0] = c.a.x + t.x),
          (h.a[1] = c.a.y + t.y),
          (h.a[2] = c.a.z + t.z),
          (h.b[0] = c.b.x + t.x),
          (h.b[1] = c.b.y + t.y),
          (h.b[2] = c.b.z + t.z));
      }
      let o = Gx(s),
        a = s?.root?.matrixWorld.elements,
        r = this.poolAt;
      if (a) {
        let l = Math.atan2(a[8], a[10]),
          c = (o.min.x + o.max.x) / 2,
          h = (o.min.z + o.max.z) / 2,
          f = Math.cos(l),
          u = Math.sin(l);
        (r.position.set(
          a[12] - t.x + f * c + u * h,
          0,
          a[14] - t.z - u * c + f * h,
        ),
          (r.rotation.y = l));
      }
      this.pool.scale.set(
        (o.max.x - o.min.x) * 1.3,
        (o.max.z - o.min.z) * 1.12,
        1,
      );
    }
  },
  bQ = new WeakMap();
function Gx(i) {
  if (!i?.root) return new Ti(new xt(-1, 0, -2.3), new xt(1, 1.4, 2.3));
  let t = bQ.get(i.root);
  if (t) return t;
  let e = i.root;
  e.updateMatrixWorld(!0);
  let s = new ye().copy(e.matrixWorld).invert(),
    n = new ye(),
    o = new Ti(),
    a = new xt();
  if (
    ((t = new Ti()),
    e.traverse((r) => {
      if (
        !r.isMesh ||
        !r.geometry ||
        r.visible === !1 ||
        r.userData.mbShadowOnly
      )
        return;
      let l = r.geometry;
      (l.boundingBox || l.computeBoundingBox(),
        !(!l.boundingBox || l.boundingBox.isEmpty()) &&
          (n.multiplyMatrices(s, r.matrixWorld),
          o.copy(l.boundingBox).applyMatrix4(n),
          [o.min.x, o.min.y, o.min.z, o.max.x, o.max.y, o.max.z].every(
            Number.isFinite,
          ) &&
            (o.getSize(a).length() > 40 || t.union(o))));
    }),
    t.isEmpty())
  ) {
    let r = i.dims || { w: 1.95, l: 4.6 };
    t.set(new xt(-r.w / 2, 0, -r.l / 2), new xt(r.w / 2, 1.45, r.l / 2));
  }
  return ((t.min.y = Math.max(t.min.y, -0.2)), bQ.set(i.root, t), t);
}
