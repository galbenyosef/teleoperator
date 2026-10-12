// app 86 — math
// Lines 72751-72979 of readable/app.pretty.js (statement-aligned).
var QG = 420,
  Uht = 4500;
function tW(i, t) {
  let e = PR(i, t);
  if (!e || i._p39pad) return e;
  ((i._p39pad = !0),
    (i.pads ||= []).push({
      bb: e.bb,
      poly: e.flat,
      y: e.yAt,
      cap: e.cap,
      name: "Pier 39",
    }));
  let s = i.terrain,
    [n, o, a, r] = e.bb;
  for (
    let l = Math.max(0, Math.floor((o - 4 - s.z0) / s.step));
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
      if (!e.inDeck(h, f) && Y1(e.flat, h, f) > 2) continue;
      let u = l * s.nx + c,
        d = e.yAt(h, f) - 0.45;
      s.h[u] > d && (s.h[u] = d);
    }
  if (e.wall && i.seawallCode?.[e.wall.li] && i.quayStep) {
    let { li: l, a: c, b: h } = e.wall,
      f = i.seawall[l],
      u = i.seawallCode[l],
      d = Math.min(c, h),
      p = Math.max(c, h),
      m = 0,
      g = 0,
      b = 0;
    for (let x = 0; x < p; x++)
      (x === d && (g = m),
        (m += Math.hypot(
          f[x * 2 + 2] - f[x * 2],
          f[x * 2 + 3] - f[x * 2 + 1],
        )));
    b = m;
    for (
      let x = Math.ceil((g - 1) / i.quayStep);
      x * i.quayStep <= b + 1 && x < u.length;
      x++
    )
      x >= 0 && u[x] !== 252 && (u[x] = 253);
  }
  return e;
}
var P0 = {
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
  capAt(i, t) {
    let e = this.plan;
    return e &&
      i >= e.bb[0] &&
      i <= e.bb[2] &&
      t >= e.bb[1] &&
      t <= e.bb[3] &&
      e.inDeck(i, t)
      ? e.cap
      : 0;
  },
  dist(i, t) {
    let e = this.plan;
    return e ? (e.inDeck(i, t) ? 0 : Y1(e.flat, i, t)) : 1e9;
  },
  setNight(i, t) {
    this.nightV = [i, t];
    for (let e of this.mats) e.color.setRGB(e.userData.dayGlow ?? 0, t, i);
    this.crowd?.setNight(i);
  },
  start({
    D: i,
    L: t,
    scene: e,
    mobile: s = !1,
    pedTex: n = null,
    mb: o = null,
  }) {
    if (this.started || ((this.plan = PR(i, t)), !this.plan)) return;
    ((this.started = !0),
      (this.scene = e),
      (this.mobile = s),
      (this.pedTex = n),
      (this.mb = o));
    let a = performance.now(),
      r = PG(this.plan, { mobile: s });
    this.stats.buildMs = Math.round(performance.now() - a);
    let l = this.materials(r.A),
      c = new ke();
    c.name = "Pier39Near";
    let h = new ke();
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
      (this.crowd = ZG(this.plan, { max: s ? 32 : 70, map: n })),
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
        o?.dropCpu &&
        setTimeout(() => {
          (o.dropCpu(c), o.dropCpu(h));
        }, 2500),
      console.log(
        `pier 39: ${this.stats.tris} triangles in ${this.stats.meshes} meshes, ${r.nLions} sea lions, ${this.crowd.people.length} visitors, ${this.stats.ms} ms`,
      ));
  },
  materials(i) {
    let t = (o, a = {}) => {
        let r = new Ee({
          color: 16777215,
          roughness: 0.8,
          metalness: 0,
          vertexColors: !0,
          ...a,
        });
        return ((r.userData.mbAlbedo = o), (r.userData.dayGlow = 0), r);
      },
      e = { atlas: t(kG), solid: t(Hg), text: t(Dg, { alphaTest: 0.5 }) },
      s = new go(),
      n = (o, a, r) =>
        s.load(
          o,
          (l) => {
            ((l.flipY = !1),
              (l.colorSpace = a ? is : On),
              (l.anisotropy = 8),
              (l.wrapS = l.wrapT = ti),
              (l.needsUpdate = !0),
              r(l));
          },
          void 0,
          () => console.warn("pier 39: missing", o),
        );
    return (
      n("assets/tex/lm/pier39/facades.webp", !0, (o) => {
        ((e.atlas.map = o), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/pier39/facades_mask.webp", !1, (o) => {
        ((e.atlas.userData.mbExtraMap = o), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/waterfront/tiles.webp", !0, (o) => {
        ((e.solid.map = o), (e.solid.needsUpdate = !0));
      }),
      (e.text.map = i.texture()),
      (this.mats = Object.values(e)),
      this.setNight(...this.nightV),
      e
    );
  },
  update(i, t, e) {
    if (!this.built) return;
    let s = e.position.x,
      n = e.position.z,
      o = this.dist(s, n),
      a = this.near.visible ? o < QG + 30 : o < QG;
    if (
      ((this.near.visible = a),
      (this.far.visible = !a && o < Uht),
      a && this.rotC)
    ) {
      let r = (performance.now() / 1e3) * CG,
        { x: l, z: c } = this.rotC;
      this.rot.forEach((h, f) => {
        h &&
          (LG(
            r,
            l,
            c,
            f === 0 ? 0 : (f === 1 ? 1 : -1) * 0.16 * Math.sin(r * 3),
            h.matrix.elements,
          ),
          (h.matrixWorldNeedsUpdate = !0));
      });
    }
    this.crowd?.update(i, t, e);
  },
};
as();
