// app 91 — math
// Lines 75291-75629 of readable/app.pretty.js (statement-aligned).
function cy(i, t) {
  let e = Math.max(0, Math.min(i.length - 1.0001, t * (i.length - 1))),
    s = Math.floor(e),
    n = e - s;
  return i[s] * (1 - n) + i[s + 1] * n;
}
function lW(i, t, e, s, n, o) {
  let a = Math.max(2, Math.round(o / 3.6)),
    r = o / a,
    l = 5;
  for (let c = 0; c < a; c++) {
    let h = c % 2 ? 1 : -1,
      f = (-h * l) / 2,
      u = (h * l) / 2,
      d = n + c * r,
      p = d + r;
    for (let g of [0.15, 1.05])
      ss(
        i,
        [t[0] + e[0] * f + s[0] * g, d + 0.2, t[1] + e[1] * f + s[1] * g],
        [t[0] + e[0] * u + s[0] * g, p + 0.2, t[1] + e[1] * u + s[1] * g],
        0.06,
        0.25,
        Fs.red,
      );
    ss(
      i,
      [t[0] + e[0] * f + s[0] * 1.15, d + 1.1, t[1] + e[1] * f + s[1] * 1.15],
      [t[0] + e[0] * u + s[0] * 1.15, p + 1.1, t[1] + e[1] * u + s[1] * 1.15],
      0.04,
      0.04,
      Fs.red,
    );
    let m = [t[0] + e[0] * u + s[0] * 0.6, t[1] + e[1] * u + s[1] * 0.6];
    Us(
      i,
      m[0] + e[0] * h * 0.6,
      m[1] + e[1] * h * 0.6,
      e[0],
      e[1],
      0.6,
      0.6,
      p + 0.1,
      p + 0.2,
      Fs.red,
    );
  }
}
function Kht(i, t, e, s, n, o, a) {
  let r = o * 0.17,
    l = 0.9,
    c = -n,
    h = s,
    f = (u, d, p) => [t + s * u + c * d, p, e + n * u + h * d];
  for (let u of [-1, 1])
    (xs(
      i,
      f(-o / 2, u * r * 0.8, 0.2),
      f(o * 0.2, u * r, 0.2),
      f(o * 0.2, u * r, l),
      f(-o / 2, u * r * 0.8, l),
      Fs.hull,
      f(0, u * 10, l),
    ),
      xs(
        i,
        f(o * 0.2, u * r, 0.2),
        f(o / 2, 0, 0.4),
        f(o / 2, 0, l + 0.2),
        f(o * 0.2, u * r, l),
        Fs.hull,
        f(o, u * 10, l),
      ));
  (Fi(
    i,
    [
      f(-o / 2, -r * 0.8, l),
      f(o * 0.2, -r, l),
      f(o * 0.2, r, l),
      f(-o / 2, r * 0.8, l),
    ],
    Fs.plank,
  ),
    E0(
      i,
      f(o * 0.2, -r, l),
      f(o / 2, 0, l + 0.2),
      f(o * 0.2, r, l),
      Fs.plank,
      f(0, 0, 50),
    ),
    Us(
      i,
      t - s * o * 0.08,
      e - n * o * 0.08,
      s,
      n,
      o * 0.16,
      r * 0.55,
      l,
      l + 0.6,
      Fs.hull,
    ),
    a() < 0.75 &&
      es(
        i,
        t + s * o * 0.05,
        e + n * o * 0.05,
        0.06,
        l,
        l + o * 1.25,
        4,
        Fs.mast,
      ));
}
Ug();
var hW = 520,
  Yht = 5200,
  zS = [-3260, -1220];
function fW(i, t) {
  let e = XR(i, t);
  if (!e || i._fmpad) return e;
  ((i._fmpad = !0),
    (i.pads ||= []).push({
      bb: e.bb,
      poly: e.flat,
      y: e.yAt,
      cap: e.cap,
      name: "Fort Mason",
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
      if (!e.inPad(h, f)) continue;
      let u = l * s.nx + c,
        d = e.yAt(h, f) - 0.45;
      s.h[u] > d && (s.h[u] = d);
    }
  return (
    i.seawallCode &&
      i.quayStep &&
      i.seawall.forEach((l, c) => {
        let h = i.seawallCode[c];
        if (!h) return;
        let f = 0;
        for (let u = 0; u + 2 < l.length; u += 2) {
          let d = l[u],
            p = l[u + 1],
            m = Math.hypot(l[u + 2] - d, l[u + 3] - p);
          for (
            let g = Math.ceil(f / i.quayStep);
            g * i.quayStep <= f + m && g < h.length;
            g++
          ) {
            let b = (g * i.quayStep - f) / (m || 1),
              x = d + (l[u + 2] - d) * b;
            p + (l[u + 3] - p) * b < -1318 &&
              x > -3450 &&
              x < -3195 &&
              h[g] <= 250 &&
              (h[g] = 251);
          }
          f += m;
        }
      }),
    e
  );
}
function uW(i, t) {
  for (let e of i.colliders) t.colliders.push(e);
  for (let e of i.cars)
    (t.inst.push({
      kind: "car",
      x: e.x,
      y: e.y + 0.02,
      z: e.z,
      rot: e.rot,
      pitch: 0,
      color: e.color,
      type: e.type,
    }),
      t.colliders.push({
        t: "obb",
        x: e.x,
        z: e.z,
        hx: 0.93,
        hz: 2.35,
        c: Math.cos(e.rot),
        s: Math.sin(e.rot),
        parked: !0,
        type: e.type,
        y0: e.y - 1.5,
        y1: e.y + 2.5,
      }));
  for (let e of i.trees)
    (t.inst.push({
      kind: "tree",
      sp: e.sp,
      x: e.x,
      y: e.y,
      z: e.z,
      rot: (e.x * 7.1) % 6.28,
      scale: e.scale,
      park: !0,
    }),
      t.colliders.push({
        t: "circ",
        x: e.x,
        z: e.z,
        r: 0.4,
        y0: e.y - 1.5,
        y1: e.y + 6,
      }));
}
var Dd = {
  plan: null,
  near: null,
  far: null,
  mats: [],
  started: !1,
  built: !1,
  nightV: [0, 0],
  stats: {},
  dist(i, t) {
    let e = this.plan;
    return e
      ? e.inPad(i, t)
        ? 0
        : Math.min(tm(e.flat, i, t), Math.hypot(i - zS[0], t - zS[1]) - 120)
      : Math.hypot(i - zS[0], t - zS[1]);
  },
  setNight(i, t) {
    this.nightV = [i, t];
    for (let e of this.mats) e.color.setRGB(0, t, i);
  },
  start({ D: i, L: t, scene: e, mobile: s = !1, mb: n = null }) {
    if (this.started || ((this.plan = XR(i, t)), !this.plan)) return;
    this.started = !0;
    let o = performance.now(),
      a = cW(this.plan, { mobile: s });
    this.stats.buildMs = Math.round(performance.now() - o);
    let r = this.materials(a.A),
      l = new ke();
    l.name = "FortMasonNear";
    let c = new ke();
    c.name = "FortMasonFar";
    let h = a.BN.meshes(r, l),
      f = a.BF.meshes(r, c, { fmf: { shadow: !0 } });
    ((l.visible = !1),
      (c.visible = !1),
      e.add(l, c),
      (this.near = l),
      (this.far = c));
    let u = 0;
    for (let d of [...h, ...f])
      u +=
        (d.geometry.index
          ? d.geometry.index.count
          : d.geometry.attributes.position.count) / 3;
    ((this.stats.tris = Math.round(u)),
      (this.stats.meshes = h.length + f.length),
      (this.stats.ms = Math.round(performance.now() - o)),
      (this.built = !0),
      s &&
        n?.dropCpu &&
        setTimeout(() => {
          (n.dropCpu(l), n.dropCpu(c));
        }, 2500),
      console.log(
        `fort mason: ${this.stats.tris} triangles in ${this.stats.meshes} meshes, ${this.plan.cars.length} parked cars, ${this.stats.ms} ms`,
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
        return ((r.userData.mbAlbedo = o), r);
      },
      e = { atlas: t(oW), solid: t(Hg), text: t(Dg, { alphaTest: 0.5 }) },
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
          () => console.warn("fort mason: missing", o),
        );
    return (
      n("assets/tex/lm/fortmason/facades.webp", !0, (o) => {
        ((e.atlas.map = o), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/fortmason/facades_mask.webp", !1, (o) => {
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
  update(i, t) {
    if (!this.built) return;
    let e = t.position.x,
      s = t.position.z,
      n = this.dist(e, s),
      o = this.near.visible ? n < hW + 40 : n < hW;
    ((this.near.visible = o), (this.far.visible = !o && n < Yht));
  },
};
as();
Oa();
En();
f0();
