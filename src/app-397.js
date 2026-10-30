// app 397 — math
// Lines 197022-197332 of readable/app.pretty.js (statement-aligned).
var rN = (o) => !!o && o.car !== !1 && !o.inner && o.s1 - o.s0 > 4,
  lSt = (o) => {
    try {
      let t = atob(o),
        e = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
      return e;
    } catch {
      return null;
    }
  },
  cSt = (o) => {
    let t = "";
    for (let e = 0; e < o.length; e++) t += String.fromCharCode(o[e]);
    return btoa(t);
  },
  UT = class {
    constructor(t, e) {
      ((this.D = t), (this.L = e));
      let s = t.edges;
      ((this.n = s.length),
        (this.bits = new Uint8Array(Math.ceil(this.n / 8))),
        (this.total = 0),
        (this.count = 0),
        (this.done = 0),
        (this.doneN = 0));
      for (let n of s) rN(n) && ((this.total += n.s1 - n.s0), this.count++);
      ((this.acc = 0),
        (this.cur = -1),
        (this.t = 0),
        (this._q = {}),
        (this.events = []),
        (this.dirty = !1));
    }
    has(t) {
      return (this.bits[t >> 3] >> (t & 7)) & 1;
    }
    _set(t) {
      if (this.has(t)) return !1;
      this.bits[t >> 3] |= 1 << (t & 7);
      let e = this.D.edges[t];
      return (
        rN(e) && ((this.done += e.s1 - e.s0), this.doneN++),
        (this.dirty = !0),
        !0
      );
    }
    get pct() {
      return this.total ? (100 * this.done) / this.total : 0;
    }
    get km() {
      return this.done / 1e3;
    }
    get totalKm() {
      return this.total / 1e3;
    }
    update(t, e, s = !0) {
      if ((this.t += t) < 0.1) return;
      let n = this.t;
      if (((this.t = 0), !s)) {
        ((this.cur = -1), (this.acc = 0));
        return;
      }
      let i = this.L.roadAt(e.pos.x, e.pos.z, 3, e.pos.y, !0, this._q),
        a = i && i.dd <= 0 ? i.E : null;
      if (!a || !rN(a) || this.has(a.id)) {
        ((this.cur = -1), (this.acc = 0));
        return;
      }
      (a.id !== this.cur && ((this.cur = a.id), (this.acc = 0)),
        (this.acc += (e.speed || 0) * n),
        this.acc >= Math.min(30, 0.5 * (a.s1 - a.s0)) &&
          this._set(a.id) &&
          this.events.push({ type: "road", E: a }));
    }
    pack() {
      return { n: this.n, b: cSt(this.bits) };
    }
    merge(t) {
      if (!t || t.n !== this.n || typeof t.b != "string") return !1;
      let e = lSt(t.b);
      if (!e) return !1;
      for (let s = 0; s < Math.min(e.length, this.bits.length); s++) {
        let n = e[s] & ~this.bits[s];
        if (n) for (let i = 0; i < 8; i++) n & (1 << i) && this._set(s * 8 + i);
      }
      return !0;
    }
  };
await No();
Mit();
var hSt = 15,
  Sit = 3.4,
  fSt = 1500,
  uSt = 750;
var VT = Ia("boards", wit),
  p1 = { xp: "#ffb000", travel: "#2f8cff" },
  GT = class {
    constructor(t, { list: e = VT, got: s = [] } = {}) {
      ((this.v = t),
        (this.list = e.map((n) => ({ ...n, dir: [0, 1], y: null }))),
        (this.got = new Set(s)),
        (this.events = []));
    }
    snap(t, e) {
      let s = {};
      for (let n of this.list) {
        let i = t(n.x, n.z, 40);
        if (!i || !i.E) continue;
        e(i.E, i.s, s);
        let a = Math.max(2, (i.w || 4) - 0.6);
        ((n.dir = [s.dx, s.dz]),
          (n.x = s.x - s.dz * a),
          (n.z = s.z + s.dx * a),
          (n.y = s.y),
          (n.road = i.E.name));
      }
      return this;
    }
    add(t) {
      for (let e of t || []) this.got.add(e);
    }
    get count() {
      return this.got.size;
    }
    get total() {
      return this.list.length;
    }
    update(t, e = !0) {
      if (!e) return;
      let s = this.v;
      if (!((s.kmh || 0) < hSt))
        for (let n of this.list) {
          if (this.got.has(n.id)) continue;
          let i = s.pos.x - n.x,
            a = s.pos.z - n.z;
          i * i + a * a > Sit * Sit ||
            (n.y !== null && Math.abs(s.pos.y - n.y) > 4) ||
            (this.got.add(n.id),
            this.events.push({
              type: "smash",
              b: n,
              xp: n.kind === "travel" ? uSt : fSt,
              n: this.got.size,
              of: this.list.length,
            }));
        }
    }
    markers() {
      return this.list.map((t) => ({
        x: t.x,
        z: t.z,
        kind: t.kind === "travel" ? "travel" : "xpboard",
        col: this.got.has(t.id)
          ? t.kind === "travel"
            ? p1.travel
            : "#6b6b6b"
          : p1[t.kind],
        name: t.name + (this.got.has(t.id) ? " \u2713" : ""),
        stars: 0,
      }));
    }
  };
es();
var kit = '"Archivo", "Helvetica Neue", Arial, sans-serif';
function dSt(o) {
  let s = document.createElement("canvas");
  ((s.width = 512), (s.height = 256));
  let n = s.getContext("2d"),
    i = p1[o.kind];
  ((n.fillStyle = i),
    n.fillRect(0, 0, 512, 256),
    (n.fillStyle = "rgba(0,0,0,.18)"));
  for (let r = -256; r < 512; r += 48)
    (n.beginPath(),
      n.moveTo(r, 256),
      n.lineTo(r + 24, 256),
      n.lineTo(r + 24 + 256, 0),
      n.lineTo(r + 256, 0),
      n.closePath(),
      n.fill());
  ((n.strokeStyle = "#fff"),
    (n.lineWidth = 10),
    n.strokeRect(8, 8, 496, 240),
    n.save(),
    n.translate(110, 112),
    (n.fillStyle = "#fff"),
    n.beginPath(),
    n.arc(0, 0, 70, 0, 7),
    n.fill(),
    n.restore(),
    n.save(),
    n.translate(110, 112),
    b2(n, o.kind === "travel" ? "travel" : "xp", 0, 0, 92, i, 2.4),
    n.restore(),
    (n.fillStyle = "#fff"),
    (n.textBaseline = "middle"),
    (n.font = `900 64px ${kit}`),
    n.fillText(o.kind === "travel" ? "FAST" : "XP", 205, 82),
    n.fillText(o.kind === "travel" ? "TRAVEL" : "BOARD", 205, 148),
    (n.font = `700 26px ${kit}`),
    n.fillText(o.name.toUpperCase(), 205, 208));
  let a = new Sn(s);
  return ((a.colorSpace = Je), (a.anisotropy = 8), a);
}
var _4 = 4.2,
  m1 = 2.1,
  E4 = 0.55,
  WT = class {
    constructor(t, e, s) {
      ((this.B = e),
        (this.group = new le()),
        (this.group.name = "Boards"),
        (this.items = new Map()),
        (this.bits = []));
      let n = new me({ color: 2764081, roughness: 0.6, metalness: 0.5 }),
        i = new Is(0.16, E4 + m1, 0.16);
      this.beacons = new Qf(this.group, "BoardBeacons");
      for (let a of e.list) {
        let r = a.y ?? s(a.x, a.z),
          l = new le();
        (l.position.set(a.x, r, a.z),
          (l.rotation.y = Math.atan2(a.dir[0], a.dir[1])));
        let c = dSt(a),
          h = new Ys({ map: c, side: ls, fog: !0 });
        h.color.setScalar(1.05);
        let f = new ye(new Yn(_4, m1), h);
        ((f.position.y = E4 + m1 / 2), l.add(f));
        for (let d of [-_4 / 2 + 0.3, _4 / 2 - 0.3]) {
          let p = new ye(i, n);
          (p.position.set(d, (E4 + m1) / 2, -0.06),
            (p.castShadow = !0),
            l.add(p));
        }
        let u = this.beacons.add({
          x: a.x,
          y: r,
          z: a.z,
          kind: a.kind === "travel" ? "travel" : "xp",
          col: p1[a.kind],
          lift: E4 + m1 + 2.5,
          h: 55,
        });
        (l.traverse((d) => {
          ((d.userData.mbNoReflect = !0), (d.frustumCulled = !1));
        }),
          (l.visible = !e.got.has(a.id)),
          this.group.add(l),
          this.items.set(a.id, { b: a, G: l, mat: h, bc: u, y: r }));
      }
      t.add(this.group);
    }
    smash(t, e, s) {
      let n = this.items.get(t.id);
      if (n) {
        ((n.G.visible = !1), this.beacons.show(n.bc, !1));
        for (let i = 0; i < 6; i++) {
          let a = i % 3,
            r = (i / 3) | 0,
            l = new Yn(_4 / 3, m1 / 2),
            c = l.attributes.uv;
          for (let m = 0; m < c.count; m++)
            c.setXY(m, (a + c.getX(m)) / 3, (r + c.getY(m)) / 2);
          let h = new ye(l, n.mat),
            f = n.G.rotation.y,
            u = ((a - 1) * _4) / 3,
            d = E4 + m1 / 4 + (r * m1) / 2;
          (h.position.set(
            t.x + Math.cos(f) * u,
            n.y + d,
            t.z - Math.sin(f) * u,
          ),
            (h.rotation.y = f),
            (h.userData.mbNoReflect = !0),
            (h.frustumCulled = !1));
          let p = 0.55 + Math.random() * 0.35;
          (this.bits.push({
            m: h,
            vx: e * p + (Math.random() - 0.5) * 4,
            vy: 3 + Math.random() * 4,
            vz: s * p + (Math.random() - 0.5) * 4,
            wx: (Math.random() - 0.5) * 12,
            wz: (Math.random() - 0.5) * 12,
            t: 0,
          }),
            this.group.add(h));
        }
      }
    }
    update(t, e) {
      for (let s of this.items.values())
        (this.beacons.show(s.bc, s.G.visible),
          s.G.visible && s.G.updateMatrixWorld());
      this.beacons.update(e);
      for (let s = this.bits.length - 1; s >= 0; s--) {
        let n = this.bits[s];
        ((n.t += t),
          (n.vy -= 9.8 * t),
          (n.m.position.x += n.vx * t),
          (n.m.position.y += n.vy * t),
          (n.m.position.z += n.vz * t),
          (n.m.rotation.x += n.wx * t),
          (n.m.rotation.z += n.wz * t),
          n.m.updateMatrixWorld(),
          n.t > 2.2 &&
            (this.group.remove(n.m),
            n.m.geometry.dispose(),
            this.bits.splice(s, 1)));
      }
    }
  };
