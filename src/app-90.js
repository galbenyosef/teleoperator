// app 90 — math
// Lines 75525-75863 of readable/app.pretty.js (statement-aligned).
function iw(o, t) {
  let e = Math.max(0, Math.min(o.length - 1.0001, t * (o.length - 1))),
    s = Math.floor(e),
    n = e - s;
  return o[s] * (1 - n) + o[s + 1] * n;
}
function hq(o, t, e, s, n, i) {
  let a = Math.max(2, Math.round(i / 3.6)),
    r = i / a,
    l = 5;
  for (let c = 0; c < a; c++) {
    let h = c % 2 ? 1 : -1,
      f = (-h * l) / 2,
      u = (h * l) / 2,
      d = n + c * r,
      p = d + r;
    for (let g of [0.15, 1.05])
      rs(
        o,
        [t[0] + e[0] * f + s[0] * g, d + 0.2, t[1] + e[1] * f + s[1] * g],
        [t[0] + e[0] * u + s[0] * g, p + 0.2, t[1] + e[1] * u + s[1] * g],
        0.06,
        0.25,
        Bs.red,
      );
    rs(
      o,
      [t[0] + e[0] * f + s[0] * 1.15, d + 1.1, t[1] + e[1] * f + s[1] * 1.15],
      [t[0] + e[0] * u + s[0] * 1.15, p + 1.1, t[1] + e[1] * u + s[1] * 1.15],
      0.04,
      0.04,
      Bs.red,
    );
    let m = [t[0] + e[0] * u + s[0] * 0.6, t[1] + e[1] * u + s[1] * 0.6];
    Vs(
      o,
      m[0] + e[0] * h * 0.6,
      m[1] + e[1] * h * 0.6,
      e[0],
      e[1],
      0.6,
      0.6,
      p + 0.1,
      p + 0.2,
      Bs.red,
    );
  }
}
function gpt(o, t, e, s, n, i, a) {
  let r = i * 0.17,
    l = 0.9,
    c = -n,
    h = s,
    f = (u, d, p) => [t + s * u + c * d, p, e + n * u + h * d];
  for (let u of [-1, 1])
    (Ms(
      o,
      f(-i / 2, u * r * 0.8, 0.2),
      f(i * 0.2, u * r, 0.2),
      f(i * 0.2, u * r, l),
      f(-i / 2, u * r * 0.8, l),
      Bs.hull,
      f(0, u * 10, l),
    ),
      Ms(
        o,
        f(i * 0.2, u * r, 0.2),
        f(i / 2, 0, 0.4),
        f(i / 2, 0, l + 0.2),
        f(i * 0.2, u * r, l),
        Bs.hull,
        f(i, u * 10, l),
      ));
  ($i(
    o,
    [
      f(-i / 2, -r * 0.8, l),
      f(i * 0.2, -r, l),
      f(i * 0.2, r, l),
      f(-i / 2, r * 0.8, l),
    ],
    Bs.plank,
  ),
    Y0(
      o,
      f(i * 0.2, -r, l),
      f(i / 2, 0, l + 0.2),
      f(i * 0.2, r, l),
      Bs.plank,
      f(0, 0, 50),
    ),
    Vs(
      o,
      t - s * i * 0.08,
      e - n * i * 0.08,
      s,
      n,
      i * 0.16,
      r * 0.55,
      l,
      l + 0.6,
      Bs.hull,
    ),
    a() < 0.75 &&
      os(
        o,
        t + s * i * 0.05,
        e + n * i * 0.05,
        0.06,
        l,
        l + i * 1.25,
        4,
        Bs.mast,
      ));
}
Ab();
var uq = 520,
  bpt = 5200,
  Tk = [-3260, -1220];
function dq(o, t) {
  let e = kP(o, t);
  if (!e || o._fmpad) return e;
  ((o._fmpad = !0),
    (o.pads ||= []).push({
      bb: e.bb,
      poly: e.flat,
      y: e.yAt,
      cap: e.cap,
      name: "Fort Mason",
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
      if (!e.inPad(h, f)) continue;
      let u = l * s.nx + c,
        d = e.yAt(h, f) - 0.45;
      s.h[u] > d && (s.h[u] = d);
    }
  return (
    o.seawallCode &&
      o.quayStep &&
      o.seawall.forEach((l, c) => {
        let h = o.seawallCode[c];
        if (!h) return;
        let f = 0;
        for (let u = 0; u + 2 < l.length; u += 2) {
          let d = l[u],
            p = l[u + 1],
            m = Math.hypot(l[u + 2] - d, l[u + 3] - p);
          for (
            let g = Math.ceil(f / o.quayStep);
            g * o.quayStep <= f + m && g < h.length;
            g++
          ) {
            let b = (g * o.quayStep - f) / (m || 1),
              v = d + (l[u + 2] - d) * b;
            p + (l[u + 3] - p) * b < -1318 &&
              v > -3450 &&
              v < -3195 &&
              h[g] <= 250 &&
              (h[g] = 251);
          }
          f += m;
        }
      }),
    e
  );
}
function pq(o, t) {
  for (let e of o.colliders) t.colliders.push(e);
  for (let e of o.cars)
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
  for (let e of o.trees)
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
var vp = {
  plan: null,
  near: null,
  far: null,
  mats: [],
  started: !1,
  built: !1,
  nightV: [0, 0],
  stats: {},
  dist(o, t) {
    let e = this.plan;
    return e
      ? e.inPad(o, t)
        ? 0
        : Math.min(Hm(e.flat, o, t), Math.hypot(o - Tk[0], t - Tk[1]) - 120)
      : Math.hypot(o - Tk[0], t - Tk[1]);
  },
  setNight(o, t) {
    this.nightV = [o, t];
    for (let e of this.mats) e.color.setRGB(0, t, o);
  },
  start({ D: o, L: t, scene: e, mobile: s = !1, mb: n = null }) {
    if (this.started || ((this.plan = kP(o, t)), !this.plan)) return;
    this.started = !0;
    let i = performance.now(),
      a = fq(this.plan, { mobile: s });
    this.stats.buildMs = Math.round(performance.now() - i);
    let r = this.materials(a.A),
      l = new le();
    l.name = "FortMasonNear";
    let c = new le();
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
      (this.stats.ms = Math.round(performance.now() - i)),
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
  materials(o) {
    let t = (i, a = {}) => {
        let r = new me({
          color: 16777215,
          roughness: 0.8,
          metalness: 0,
          vertexColors: !0,
          ...a,
        });
        return ((r.userData.mbAlbedo = i), r);
      },
      e = { atlas: t(rq), solid: t(Tb), text: t(Rb, { alphaTest: 0.5 }) },
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
          () => console.warn("fort mason: missing", i),
        );
    return (
      n("assets/tex/lm/fortmason/facades.webp", !0, (i) => {
        ((e.atlas.map = i), (e.atlas.needsUpdate = !0));
      }),
      n("assets/tex/lm/fortmason/facades_mask.webp", !1, (i) => {
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
  update(o, t) {
    if (!this.built) return;
    let e = t.position.x,
      s = t.position.z,
      n = this.dist(e, s),
      i = this.near.visible ? n < uq + 40 : n < uq;
    ((this.near.visible = i), (this.far.visible = !i && n < bpt));
  },
};
es();
Ya();
Pn();
await _0();
