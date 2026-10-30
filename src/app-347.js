// app 347 — math
// Lines 167238-167568 of readable/app.pretty.js (statement-aligned).
var Pv = [0.62, 0.86, 1],
  wd = {
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
  CE = class {
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
      let t = (this.group = new le());
      t.name = "GarageStudio";
      let e = this.R,
        s = this.H,
        n = this.mobile,
        i = (z, A, T = 0, E = 0, R = 0) => {
          let P = new ye(z, A);
          return (P.position.set(T, E, R), (P.receiveShadow = !0), t.add(P), P);
        },
        a = new me({
          color: new It(0.016, 0.017, 0.019),
          roughness: 0.3,
          metalness: 0,
          roughnessMap: c4t(),
          envMapIntensity: 0.3,
        });
      a.roughnessMap.repeat.set(9, 9);
      let r = (this.floor = i(new da(24, 160), a));
      ((r.rotation.x = -Math.PI / 2),
        (r.name = "StudioFloor"),
        n || (r.userData.mbPlanar = { r: e + 1 }),
        i(
          new vs(e + 0.3, e + 0.3, s, 96, 1, !0),
          new mn({
            color: new It(0.0014, 0.0016, 0.0019),
            roughness: 1,
            specularIntensity: 0,
            envMapIntensity: 0.2,
            side: pa,
          }),
          0,
          s / 2,
          0,
        ));
      let l = i(
        new da(e + 0.4, 64),
        new me({ color: new It(0.006, 0.006, 0.007), roughness: 1 }),
        0,
        s,
        0,
      );
      l.rotation.x = Math.PI / 2;
      let c = (this.table = new le());
      t.add(c);
      let h = new ye(
        new v0(3.28, 3.31, 160),
        new Ys({ color: new It(0.002, 0.002, 0.002) }),
      );
      ((h.rotation.x = -Math.PI / 2), (h.position.y = 0.002));
      let f = (this.ring = new ye(
        new v0(3.31, 3.325, 160),
        bst([0.12 * Pv[0] * 3, 0.12 * Pv[1] * 3, 0.12 * Pv[2] * 3]),
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
      m.colorSpace = Je;
      let g = (this.pool = new ye(
        new Yn(1, 1),
        new Ys({
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
        (this.poolAt = new le()),
        this.poolAt.add(g),
        t.add(this.poolAt));
      let b = (this.tubes = []),
        v = n ? 10 : 14,
        x = 0.024,
        y = (z, A, T, E = !1) => {
          let R = new dt(...z),
            P = new dt(...A),
            C = R.distanceTo(P),
            I = new ye(
              new vs(x, x, C, 10, 1),
              bst([0.85, 0.95, 1].map((L) => L * T * 1.4)),
            );
          (I.position.copy(R).add(P).multiplyScalar(0.5),
            I.quaternion.setFromUnitVectors(
              new dt(0, 1, 0),
              P.clone().sub(R).normalize(),
            ),
            (I.userData.mbNoReflect = !0),
            t.add(I),
            b.push({
              a: R,
              b: P,
              radius: x,
              radiance: T,
              mesh: I,
              noFloor: E,
            }));
        },
        M = n ? 7 : 9,
        S = this.heroYaw + Math.PI,
        w = e - 0.3,
        _ = [
          ...Array.from(
            { length: M },
            (z, A) => S + (A / (M - 1) - 0.5) * 2 * 1.45,
          ),
          ...Array.from(
            { length: v - M },
            (z, A) => this.heroYaw + (A / (v - M - 1) - 0.5) * 2 * 1,
          ),
        ];
      for (let z of _)
        y(
          [Math.sin(z) * w, 0.25, Math.cos(z) * w],
          [Math.sin(z) * w, s - 0.7, Math.cos(z) * w],
          46,
        );
      for (let z of [-0.85, 0.85]) y([z, 5.2, -2.6], [z, 5.2, 2.6], 90, !0);
      ((this.tubeData = b.map((z) => ({
        a: [0, 0, 0],
        b: [0, 0, 0],
        radius: z.radius,
        color: Pv.map((A) => A * z.radiance),
        noFloor: z.noFloor,
      }))),
        t.traverse((z) => {
          z.isMesh && (z.userData.mbMover = !0);
        }),
        (this.env = h4t(n ? 512 : 1024, b, e, s)));
      {
        let z = new q0();
        (z.add(t), this.mb.compileAsync?.(z).catch(() => {}), z.remove(t));
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
        (t.environmentIntensity = wd.env),
        (e.toneMappingExposure = wd.exposure),
        (e.bloom = wd.bloom),
        (e.vignette = wd.vignette),
        (e.glareSpread = wd.glareSpread),
        (e.grade = D5(wd.grade)),
        (e.envOverride = this.env),
        (e.tubes = this.tubeData),
        (e.tubeDiffuse = wd.tubeDiffuse),
        (e.tubeSpec = wd.tubeSpec),
        (e.tubeRim = wd.tubeRim),
        (e.motionBlur = 0),
        t.add(this.group));
    }
    leave(t) {
      if (!this.on) return;
      this.on = !1;
      let e = this.mb,
        s = this.keep;
      t.remove(this.group);
      for (let [n, i] of Object.entries(s.mb)) e[n] = i;
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
            ...Pv.map((n) => n * (0.4 + 2.6 * (0.5 + 0.5 * Math.sin(s * 4)))),
          )
        : t === "failed"
          ? e.setRGB(2.2, 0.12, 0.08)
          : e.setRGB(...Pv.map((n) => n * 0.06));
    }
    hideNear(t, e, s) {
      let n = Cv(s),
        i = Math.hypot(n.max.x - n.min.x, n.max.z - n.min.z) / 2 + 0.6,
        a = t.position.x - e.x,
        r = t.position.z - e.z,
        l = Math.hypot(a, r);
      for (let c of this.tubes) {
        if (Math.abs(c.a.y - c.b.y) < 1) continue;
        let h = c.a.x - a,
          f = c.a.z - r,
          u = Math.hypot(h, f),
          d = (h * -a + f * -r) / Math.max(0.001, u * l);
        c.mesh.visible = !(u < l && d > Math.cos(Math.atan2(i, l) + 0.04));
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
      let i = Cv(s),
        a = s?.root?.matrixWorld.elements,
        r = this.poolAt;
      if (a) {
        let l = Math.atan2(a[8], a[10]),
          c = (i.min.x + i.max.x) / 2,
          h = (i.min.z + i.max.z) / 2,
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
        (i.max.x - i.min.x) * 1.3,
        (i.max.z - i.min.z) * 1.12,
        1,
      );
    }
  },
  gst = new WeakMap();
function Cv(o) {
  if (!o?.root) return new xi(new dt(-1, 0, -2.3), new dt(1, 1.4, 2.3));
  let t = gst.get(o.root);
  if (t) return t;
  let e = o.root;
  e.updateMatrixWorld(!0);
  let s = new fe().copy(e.matrixWorld).invert(),
    n = new fe(),
    i = new xi(),
    a = new dt();
  if (
    ((t = new xi()),
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
          i.copy(l.boundingBox).applyMatrix4(n),
          [i.min.x, i.min.y, i.min.z, i.max.x, i.max.y, i.max.z].every(
            Number.isFinite,
          ) &&
            (i.getSize(a).length() > 40 || t.union(i))));
    }),
    t.isEmpty())
  ) {
    let r = o.dims || { w: 1.95, l: 4.6 };
    t.set(new dt(-r.w / 2, 0, -r.l / 2), new dt(r.w / 2, 1.45, r.l / 2));
  }
  return ((t.min.y = Math.max(t.min.y, -0.2)), gst.set(o.root, t), t);
}
