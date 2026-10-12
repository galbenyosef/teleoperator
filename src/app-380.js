// app 380 — math
// Lines 189199-189507 of readable/app.pretty.js (statement-aligned).
var aN = (i) => !!i && i.car !== !1 && !i.inner && i.s1 - i.s0 > 4,
  vwt = (i) => {
    try {
      let t = atob(i),
        e = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
      return e;
    } catch {
      return null;
    }
  },
  ywt = (i) => {
    let t = "";
    for (let e = 0; e < i.length; e++) t += String.fromCharCode(i[e]);
    return btoa(t);
  },
  wE = class {
    constructor(t, e) {
      ((this.D = t), (this.L = e));
      let s = t.edges;
      ((this.n = s.length),
        (this.bits = new Uint8Array(Math.ceil(this.n / 8))),
        (this.total = 0),
        (this.count = 0),
        (this.done = 0),
        (this.doneN = 0));
      for (let n of s) aN(n) && ((this.total += n.s1 - n.s0), this.count++);
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
        aN(e) && ((this.done += e.s1 - e.s0), this.doneN++),
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
      let o = this.L.roadAt(e.pos.x, e.pos.z, 3, e.pos.y, !0, this._q),
        a = o && o.dd <= 0 ? o.E : null;
      if (!a || !aN(a) || this.has(a.id)) {
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
      return { n: this.n, b: ywt(this.bits) };
    }
    merge(t) {
      if (!t || t.n !== this.n || typeof t.b != "string") return !1;
      let e = vwt(t.b);
      if (!e) return !1;
      for (let s = 0; s < Math.min(e.length, this.bits.length); s++) {
        let n = e[s] & ~this.bits[s];
        if (n) for (let o = 0; o < 8; o++) n & (1 << o) && this._set(s * 8 + o);
      }
      return !0;
    }
  };
het();
var wwt = 15,
  fet = 3.4,
  Mwt = 1500,
  Swt = 750;
var Cp = { xp: "#ffb000", travel: "#2f8cff" },
  ME = class {
    constructor(t, { list: e = wM, got: s = [] } = {}) {
      ((this.v = t),
        (this.list = e.map((n) => ({ ...n, dir: [0, 1], y: null }))),
        (this.got = new Set(s)),
        (this.events = []));
    }
    snap(t, e) {
      let s = {};
      for (let n of this.list) {
        let o = t(n.x, n.z, 40);
        if (!o || !o.E) continue;
        e(o.E, o.s, s);
        let a = Math.max(2, (o.w || 4) - 0.6);
        ((n.dir = [s.dx, s.dz]),
          (n.x = s.x - s.dz * a),
          (n.z = s.z + s.dx * a),
          (n.y = s.y),
          (n.road = o.E.name));
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
      if (!((s.kmh || 0) < wwt))
        for (let n of this.list) {
          if (this.got.has(n.id)) continue;
          let o = s.pos.x - n.x,
            a = s.pos.z - n.z;
          o * o + a * a > fet * fet ||
            (n.y !== null && Math.abs(s.pos.y - n.y) > 4) ||
            (this.got.add(n.id),
            this.events.push({
              type: "smash",
              b: n,
              xp: n.kind === "travel" ? Swt : Mwt,
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
            ? Cp.travel
            : "#6b6b6b"
          : Cp[t.kind],
        name: t.name + (this.got.has(t.id) ? " \u2713" : ""),
        stars: 0,
      }));
    }
  };
as();
var uet = '"Archivo", "Helvetica Neue", Arial, sans-serif';
function kwt(i) {
  let s = document.createElement("canvas");
  ((s.width = 512), (s.height = 256));
  let n = s.getContext("2d"),
    o = Cp[i.kind];
  ((n.fillStyle = o),
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
    Rm(n, i.kind === "travel" ? "travel" : "xp", 0, 0, 92, o, 2.4),
    n.restore(),
    (n.fillStyle = "#fff"),
    (n.textBaseline = "middle"),
    (n.font = `900 64px ${uet}`),
    n.fillText(i.kind === "travel" ? "FAST" : "XP", 205, 82),
    n.fillText(i.kind === "travel" ? "TRAVEL" : "BOARD", 205, 148),
    (n.font = `700 26px ${uet}`),
    n.fillText(i.name.toUpperCase(), 205, 208));
  let a = new Sn(s);
  return ((a.colorSpace = is), (a.anisotropy = 8), a);
}
var MM = 4.2,
  Lp = 2.1,
  SM = 0.55,
  SE = class {
    constructor(t, e, s) {
      ((this.B = e),
        (this.group = new ke()),
        (this.group.name = "Boards"),
        (this.items = new Map()),
        (this.bits = []));
      let n = new Ee({ color: 2764081, roughness: 0.6, metalness: 0.5 }),
        o = new qs(0.16, SM + Lp, 0.16);
      this.beacons = new vf(this.group, "BoardBeacons");
      for (let a of e.list) {
        let r = a.y ?? s(a.x, a.z),
          l = new ke();
        (l.position.set(a.x, r, a.z),
          (l.rotation.y = Math.atan2(a.dir[0], a.dir[1])));
        let c = kwt(a),
          h = new ln({ map: c, side: Ss, fog: !0 });
        h.color.setScalar(1.05);
        let f = new _e(new $n(MM, Lp), h);
        ((f.position.y = SM + Lp / 2), l.add(f));
        for (let d of [-MM / 2 + 0.3, MM / 2 - 0.3]) {
          let p = new _e(o, n);
          (p.position.set(d, (SM + Lp) / 2, -0.06),
            (p.castShadow = !0),
            l.add(p));
        }
        let u = this.beacons.add({
          x: a.x,
          y: r,
          z: a.z,
          kind: a.kind === "travel" ? "travel" : "xp",
          col: Cp[a.kind],
          lift: SM + Lp + 2.5,
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
        for (let o = 0; o < 6; o++) {
          let a = o % 3,
            r = (o / 3) | 0,
            l = new $n(MM / 3, Lp / 2),
            c = l.attributes.uv;
          for (let m = 0; m < c.count; m++)
            c.setXY(m, (a + c.getX(m)) / 3, (r + c.getY(m)) / 2);
          let h = new _e(l, n.mat),
            f = n.G.rotation.y,
            u = ((a - 1) * MM) / 3,
            d = SM + Lp / 4 + (r * Lp) / 2;
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
