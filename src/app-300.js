// app 300 — math
// Lines 145919-146249 of readable/app.pretty.js (statement-aligned).
En();
var Xxt = new Set([
    "motorway",
    "motorway_link",
    "trunk",
    "trunk_link",
    "primary",
    "primary_link",
    "secondary",
    "secondary_link",
    "tertiary",
    "tertiary_link",
    "residential",
    "unclassified",
  ]),
  JJ = 1.15,
  MI = 3;
function Kxt(i, t, e) {
  let s = i.lg || {
      med: i.oneway ? 0 : i.median ? 1.6 : 0,
      park: i.flags & 4 ? 0 : 2.3,
      bw: tp(i),
    },
    n = Math.max(1, i.lanes),
    o = Math.max(0, e - 1.15),
    a = n - 1;
  if (i.oneway) {
    let l = Math.max((2 * (e - s.park) - (s.bw || 0)) / n, 2.6),
      c = -(e - s.park) + l * (a + 0.5);
    return Math.max(-o, Math.min(o, c));
  }
  let r = Math.max((e - s.park - s.med - (s.bw || 0)) / n, 2.6);
  return t * Math.min(o, s.med + r * (a + 0.5));
}
function SI(i, t, e, s, n = void 0) {
  if (!i) return null;
  let o = { x: -Math.sin(s), z: -Math.cos(s) },
    a = { x: -o.z, z: o.x },
    r = i.near(t, e, MI + 1.5);
  for (let c of i.dynamic || [])
    Math.abs(c.x - t) < 9 && Math.abs(c.z - e) < 9 && r.add(c);
  for (let c of i.parked?.awake || [])
    Math.abs(c.x - t) < 9 && Math.abs(c.z - e) < 9 && r.add(c);
  let l = !!Hi(t, e, 1.5);
  for (let c of r)
    if (
      !(c.dead || (c.wall && l)) &&
      !(
        n !== void 0 &&
        c.y1 !== void 0 &&
        (n > c.y1 + 0.3 || n + 1.4 < c.y0)
      ) &&
      i.test(c, t, e, a, o, JJ, MI)
    )
      return c;
  return null;
}
function Lw(i, t, e, s, { r: n = 70, world: o = null } = {}) {
  let a = {},
    r = [];
  for (let h of i.edges) {
    if (h.inner || h.tunnel || h.tunnelR || !Xxt.has(h.cls) || h.s1 - h.s0 < 10)
      continue;
    let f = h._tpb;
    if (!f) {
      f = h._tpb = [1e18, 1e18, -1e18, -1e18];
      let d = h.P;
      for (let p = 0; p < h.n; p++)
        ((f[0] = Math.min(f[0], d[p * 3])),
          (f[1] = Math.min(f[1], d[p * 3 + 1])),
          (f[2] = Math.max(f[2], d[p * 3])),
          (f[3] = Math.max(f[3], d[p * 3 + 1])));
    }
    if (
      e < f[0] - n - 30 ||
      e > f[2] + n + 30 ||
      s < f[1] - n - 30 ||
      s > f[3] + n + 30
    )
      continue;
    vs(h, e, s, a);
    let u = a.d - a.w;
    u > n || r.push({ E: h, s: a.s, v: a.v, dd: u });
  }
  r.sort((h, f) => h.dd - f.dd);
  let l = {},
    c = {};
  for (let h of r.slice(0, 16)) {
    let f = h.E,
      u = f.oneway || h.v >= 0 ? 1 : -1;
    for (let d of [0, 4, -4, 8, -8, 13, -13, 19, -19, 26, -26]) {
      let p = Math.min(f.s1 - 5, Math.max(f.s0 + 5, h.s + d));
      (Ot(f, p, l), Ot(f, Math.min(f.L ?? f.s1, p + 0.5), c));
      let m = c.x - l.x,
        g = c.z - l.z,
        b = Math.hypot(m, g) || 1;
      ((m /= b), (g /= b));
      let x = Kxt(f, u, l.w),
        v = l.x + l.nx * x,
        y = l.z + l.nz * x;
      if (
        (t.inWorld && !t.inWorld(v, y) && !f.elev) ||
        t.surfaceAt(v, y) !== "road"
      )
        continue;
      let M = t.driveHeight(v, y);
      if (Math.abs(M - l.y) > 0.7) continue;
      let S = Math.atan2(-m * u, -g * u);
      if (!SI(o, v, y, S, M))
        return {
          x: v,
          z: y,
          y: M,
          psi: S,
          E: f,
          s: p,
          dir: u,
          d: Math.hypot(v - e, y - s),
          name: f.name || "",
        };
    }
  }
  return null;
}
var Yxt = `
#teleFade { position: fixed; inset: 0; z-index: 13; background: #050607; opacity: 0; pointer-events: none; transition: opacity .22s ease; }
#teleFade.on { opacity: 1; pointer-events: auto; }
#teleFade b { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font: 600 11px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .2em; color: rgba(243,244,241,.55); text-transform: uppercase; }
`,
  z_ = class {
    constructor({
      map: t,
      v: e,
      R: s,
      world: n,
      traffic: o = null,
      cc: a = null,
      rides: r = () => null,
      taxi: l = () => null,
      fares: c = () => !1,
      toast: h = () => {},
    }) {
      if (
        ((this.map = t),
        (this.v = e),
        (this.R = s),
        (this.world = n),
        (this.traffic = o),
        (this.cc = a),
        (this.rides = r),
        (this.taxi = l),
        (this.fares = c),
        (this.toast = h),
        (this.on = !1),
        (this.t = 0),
        (this.target = null),
        (this.readyN = 0),
        (this.log = []),
        (this.input = {
          throttle: 0,
          brake: 0,
          steer: 0,
          handbrake: 0,
          nitro: 0,
        }),
        !s || !t || !t.P)
      )
        return;
      let f = document.createElement("style");
      ((f.textContent = Yxt),
        document.head.appendChild(f),
        (this.fade = document.createElement("div")),
        (this.fade.id = "teleFade"),
        (this.fade.innerHTML = "<b>Teleporting\u2026</b>"),
        document.body.appendChild(this.fade),
        (t.onPick = (u, d, p) => this.pick(u, d, p)),
        (t.onPickGo = (u) => this.go(u)));
    }
    blocked(t, e, s, n) {
      return SI(this.world, t, e, s, n);
    }
    cost() {
      let t = this.rides();
      return !t || !this.fares()
        ? ""
        : t.state === "ride" ||
            t.state === "boarding" ||
            t.state === "alighting"
          ? "Cancels the current ride \xB7 no charge"
          : t.state === "offer"
            ? "Your fare will be re-offered nearby"
            : "";
    }
    pick(t, e, s = 70) {
      let n = Lw(this.R.data, this.R.layout, t, e, { r: s, world: this.world });
      return n
        ? ((n.sub = this.cost()), this.map.setPick?.(n), n)
        : (this.map.setPick?.(null, "No road here - tap a street"), null);
    }
    go(t) {
      if (!t || this.on) return !1;
      let e = this.rides();
      if (e && this.fares() && e.state !== "idle" && e.state !== "summary") {
        let s =
          e.state === "ride" ||
          e.state === "boarding" ||
          e.state === "alighting";
        (e.cancel?.(), this.taxi()?.cancelled?.(s));
      }
      return (
        this.fade?.classList.add("on"),
        this.map.setPick?.(null),
        this.map.open && this.map.toggle(!1),
        (this.target = t),
        (this.on = !0),
        (this.t = 0),
        (this.readyN = 0),
        this.v.place(t.x, t.z, t.psi, t.y),
        this.cc && (this.cc.init = !1),
        this.traffic && (this.traffic.started = !1),
        !0
      );
    }
    pin() {
      let t = this.v,
        e = this.target;
      ((t.pos.x = e.x),
        (t.pos.z = e.z),
        (t.psi = e.psi),
        (t.vel.x = t.vel.z = 0),
        (t.r = 0),
        t.w?.fill?.(0),
        (t.reverse = !1));
    }
    step(t) {
      if (!this.on) return !1;
      this.t += t;
      let e = this.target,
        s = this.R.readyAt ? this.R.readyAt(e.x, e.z) : !0;
      if (
        ((this.readyN = s ? this.readyN + 1 : 0),
        (this.readyN >= 3 && this.t > 0.45) || this.t > 8)
      ) {
        (this.cc && (this.cc.init = !1),
          (this.on = !1),
          this.fade?.classList.remove("on"));
        let n = this.traffic,
          o = { x: -Math.sin(e.psi), z: -Math.cos(e.psi) },
          a = { x: -o.z, z: o.x };
        if (n?.cars && this.world)
          for (let l of (n.colliders || []).filter(
            (c) =>
              c.traffic &&
              !c.traffic.route &&
              this.world.test(c, e.x, e.z, a, o, JJ, MI),
          )) {
            let c = n.cars.indexOf(l.traffic);
            (c >= 0 && n.cars.splice(c, 1), (l.dead = !0));
          }
        let r = SI(this.world, e.x, e.z, e.psi, e.y);
        (this.log.push({
          x: e.x,
          z: e.z,
          t: +this.t.toFixed(2),
          ready: s,
          blocked: r
            ? r.traffic
              ? "traffic"
              : r.parked
                ? "parked"
                : r.prop
                  ? "prop " + (r.prop.kind || "")
                  : r.t
            : "",
        }),
          e.quiet || this.toast(e.name || "Teleported", "Teleported"));
      }
      return !0;
    }
  };
var ZJ = "sf-drive.last-start",
  Jxt = new Set([
    "primary",
    "secondary",
    "tertiary",
    "residential",
    "unclassified",
  ]);
function Zxt() {
  return globalThis.crypto?.getRandomValues
    ? crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
    : Math.random();
}
function Qxt(i, t) {
  let e = [],
    s = {},
    n = {},
    o = {};
  for (let a of i.edges) {
    if (
      !a.name ||
      !Jxt.has(a.cls) ||
      a.region ||
      a.inner ||
      a.layered ||
      a.elev ||
      a.tunnel ||
      a.tunnelR ||
      a.hwy ||
      a.sunk ||
      a.underpass ||
      a.custom ||
      a.s1 - a.s0 < 55 ||
      (i.juns[a.ja]?.legs.length || 0) < 2 ||
      (i.juns[a.jb]?.legs.length || 0) < 2 ||
      (Ot(a, (a.s0 + a.s1) / 2, s),
      Math.abs(s.gy) > 0.12 || s.w < 4.5 || !t.inWorld(s.x, s.z)) ||
      (Ot(a, (a.s0 + a.s1) / 2 - 6, o),
      Ot(a, (a.s0 + a.s1) / 2 + 6, n),
      s.dx * o.dx + s.dz * o.dz < 0.9994 || s.dx * n.dx + s.dz * n.dz < 0.9994)
    )
      continue;
    let r = wI(a, (a.s0 + a.s1) / 2, s.dx, s.dz),
      l = t.probe(r[0], r[1]);
    !l.road ||
      l.road.J ||
      l.road.E !== a ||
      e.push({ id: a.id, name: a.name, p: r });
  }
  return e;
}
