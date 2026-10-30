// app 85 — math
// Lines 72985-73213 of readable/app.pretty.js (statement-aligned).
var eq = 420,
  lpt = 4500;
function sq(o, t) {
  let e = rP(o, t);
  if (!e || o._p39pad) return e;
  ((o._p39pad = !0),
    (o.pads ||= []).push({
      bb: e.bb,
      poly: e.flat,
      y: e.yAt,
      cap: e.cap,
      name: "Pier 39",
    }));
  let s = o.terrain,
    [n, i, a, r] = e.bb;
  for (
    let l = Math.max(0, Math.floor((i - 4 - s.z0) / s.step));
    l <= Math.min(s.nz - 1, Math.ceil((r + 4 - s.z0) / s.step));
    l++
  )
    for (
      let c = Math.max(0, Math.floor((n - 4 - s.x0) / s.step));
      c <= Math.min(s.nx - 1, Math.ceil((a + 4 - s.x0) / s.step));
      c++
    ) {
      let h = s.x0 + c * s.step,
        f = s.z0 + l * s.step;
      if (!e.inDeck(h, f) && Im(e.flat, h, f) > 2) continue;
      let u = l * s.nx + c,
        d = e.yAt(h, f) - 0.45;
      s.h[u] > d && (s.h[u] = d);
    }
  if (e.wall && o.seawallCode?.[e.wall.li] && o.quayStep) {
    let { li: l, a: c, b: h } = e.wall,
      f = o.seawall[l],
      u = o.seawallCode[l],
      d = Math.min(c, h),
      p = Math.max(c, h),
      m = 0,
      g = 0,
      b = 0;
    for (let v = 0; v < p; v++)
      (v === d && (g = m),
        (m += Math.hypot(
          f[v * 2 + 2] - f[v * 2],
          f[v * 2 + 3] - f[v * 2 + 1],
        )));
    b = m;
    for (
      let v = Math.ceil((g - 1) / o.quayStep);
      v * o.quayStep <= b + 1 && v < u.length;
      v++
    )
      v >= 0 && u[v] !== 252 && (u[v] = 253);
  }
  return e;
}
var tl = {
  plan: null,
  near: null,
  far: null,
  rot: [],
  crowd: null,
  mats: [],
  started: !1,
  built: !1,
  nightV: [0, 0],
  lions: null,
  stats: {},
  capAt(o, t) {
    let e = this.plan;
    return e &&
      o >= e.bb[0] &&
      o <= e.bb[2] &&
      t >= e.bb[1] &&
      t <= e.bb[3] &&
      e.inDeck(o, t)
      ? e.cap
      : 0;
  },
  dist(o, t) {
    let e = this.plan;
    return e ? (e.inDeck(o, t) ? 0 : Im(e.flat, o, t)) : 1e9;
  },
  setNight(o, t) {
    this.nightV = [o, t];
    for (let e of this.mats) e.color.setRGB(e.userData.dayGlow ?? 0, t, o);
    this.crowd?.setNight(o);
  },
  start({
    D: o,
    L: t,
    scene: e,
    mobile: s = !1,
    pedTex: n = null,
    mb: i = null,
  }) {
    if (this.started || ((this.plan = rP(o, t)), !this.plan)) return;
    ((this.started = !0),
      (this.scene = e),
      (this.mobile = s),
      (this.pedTex = n),
      (this.mb = i));
    let a = performance.now(),
      r = LW(this.plan, { mobile: s });
    this.stats.buildMs = Math.round(performance.now() - a);
    let l = this.materials(r.A),
      c = new le();
    c.name = "Pier39Near";
    let h = new le();
    h.name = "Pier39Far";
    let f = r.BN.meshes(l, c),
      u = r.BF.meshes(l, h, { p39f: { shadow: !1 } });
    this.rot = ["wf_p39rot", "wf_p39hup", "wf_p39hdn"].map(
      (p) => f.find((m) => m.name.startsWith(p)) || null,
    );
    for (let p of this.rot) p && (p.castShadow = !1);
    ((this.rotC = r.rot),
      (c.visible = !1),
      (h.visible = !1),
      e.add(c, h),
      (this.near = c),
      (this.far = h),
      (this.lions = r.lions),
      (this.crowd = tq(this.plan, { max: s ? 32 : 70, map: n })),
      e.add(this.crowd.group),
      this.crowd.setNight(this.nightV[0]));
    let d = 0;
    for (let p of [...f, ...u])
      d +=
        (p.geometry.index
          ? p.geometry.index.count
          : p.geometry.attributes.position.count) / 3;
    ((this.stats.tris = Math.round(d)),
      (this.stats.meshes = f.length + u.length),
      (this.stats.lions = r.nLions),
      (this.stats.ms = Math.round(performance.now() - a)),
      (this.stats.atlasRows = r.A.y + r.A.row),
      (this.stats.show = this.crowd.show.length),
      this.stats.atlasRows > r.A.H &&
        console.warn(
          "pier 39: the lettering atlas overflows",
          this.stats.atlasRows,
          ">",
          r.A.H,
        ),
      typeof window < "u" && window.__sf && (window.__sf.pier39 = this),
      (this.built = !0),
      s &&
        i?.dropCpu &&
        setTimeout(() => {
          (i.dropCpu(c), i.dropCpu(h));
        }, 2500),
      console.log(
        `pier 39: ${this.stats.tris} triangles in ${this.stats.meshes} meshes, ${r.nLions} sea lions, ${this.crowd.people.length} visitors, ${this.stats.ms} ms`,
      ));
  },
  materials(o) {
    let t = (i, a = {}) => {
        let r = new me({
          color: 16777215,
          roughness: 0.8,
          metalness: 0,
          vertexColors: !0,
          ...a,
        });
        return ((r.userData.mbAlbedo = i), (r.userData.dayGlow = 0), r);
      },
      e = { atlas: t(_W), solid: t(Tb), text: t(Rb, { alphaTest: 0.5 }) },
      s = new ko(),
      n = (i, a, r) =>
        s.load(
          i,
          (l) => {
            ((l.flipY = !1),
              (l.colorSpace = a ? Je : Nn),
              (l.anisotropy = 8),
              (l.wrapS = l.wrapT = oi),
              (l.needsUpdate = !0),
              r(l));
          },
          void 0,
          () => console.warn("pier 39: missing", i),
        );
    return (
      n("assets/tex/lm/pier39/facades.webp", !0, (i) => {
        ((e.atlas.map = i), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/pier39/facades_mask.webp", !1, (i) => {
        ((e.atlas.userData.mbExtraMap = i), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/waterfront/tiles.webp", !0, (i) => {
        ((e.solid.map = i), (e.solid.needsUpdate = !0));
      }),
      (e.text.map = o.texture()),
      (this.mats = Object.values(e)),
      this.setNight(...this.nightV),
      e
    );
  },
  update(o, t, e) {
    if (!this.built) return;
    let s = e.position.x,
      n = e.position.z,
      i = this.dist(s, n),
      a = this.near.visible ? i < eq + 30 : i < eq;
    if (
      ((this.near.visible = a),
      (this.far.visible = !a && i < lpt),
      a && this.rotC)
    ) {
      let r = (performance.now() / 1e3) * IW,
        { x: l, z: c } = this.rotC;
      this.rot.forEach((h, f) => {
        h &&
          (FW(
            r,
            l,
            c,
            f === 0 ? 0 : (f === 1 ? 1 : -1) * 0.16 * Math.sin(r * 3),
            h.matrix.elements,
          ),
          (h.matrixWorldNeedsUpdate = !0));
      });
    }
    this.crowd?.update(o, t, e);
  },
};
es();
