// app 364 — math
// Lines 182095-182394 of readable/app.pretty.js (statement-aligned).
var tE = class {
  constructor(
    t,
    { store: e = null, list: s = nv, key: n = "sf-drive.stunts" } = {},
  ) {
    ((this.v = t),
      (this.list = s),
      (this.store = e),
      (this.key = n),
      (this.events = []),
      (this.best = {}));
    try {
      this.best = JSON.parse(e?.getItem(n) || "{}") || {};
    } catch {
      this.best = {};
    }
    ((this.live = null),
      (this.near = null),
      (this._nearT = 0),
      (this.px = null),
      (this.pz = null));
  }
  snap(t, e = null, s = null) {
    let n = {};
    for (let o of this.list)
      if (o.edge && s && e) {
        let a = null;
        for (let r of s)
          r.name === o.edge.name &&
            !!r.tunnel == !!o.edge.tunnel &&
            r.car !== !1 &&
            (!a || r.s1 - r.s0 > a.s1 - a.s0) &&
            (a = r);
        if (!a) continue;
        for (let r of [a.s0 + 4, a.s1 - 4]) {
          e(a, r, n);
          let c =
              Math.hypot(n.x - o.gates[0].x, n.z - o.gates[0].z) <
              Math.hypot(n.x - o.gates[1].x, n.z - o.gates[1].z)
                ? o.gates[0]
                : o.gates[1],
            h = n.dx * c.dir[0] + n.dz * c.dir[1] < 0 ? -1 : 1;
          ((c.x = n.x),
            (c.z = n.z),
            (c.y = n.y),
            (c.dir = KF(h * n.dx, h * n.dz)),
            (c.road = a.name),
            (c.fixed = !0));
        }
      }
    for (let o of this.list)
      for (let a of o.gates) {
        if (a.fixed) continue;
        let r = t(a.x, a.z, 30);
        if (
          !r ||
          !Number.isFinite(r.dx) ||
          Math.abs(r.dx * a.dir[0] + r.dz * a.dir[1]) < 0.8
        )
          continue;
        let l = r.dx * a.dir[0] + r.dz * a.dir[1] < 0 ? -1 : 1;
        ((a.dir = KF(l * r.dx, l * r.dz)),
          (a.y = r.y),
          (a.road = r.E?.name || ""),
          e &&
            r.E &&
            Number.isFinite(r.s) &&
            (e(r.E, r.s, n),
            Number.isFinite(n.x) &&
              Math.hypot(n.x - a.x, n.z - a.z) < 30 &&
              ((a.x = n.x), (a.z = n.z))));
      }
    return this;
  }
  save() {
    try {
      this.store?.setItem(this.key, JSON.stringify(this.best));
    } catch {}
  }
  starsTotal() {
    let t = 0;
    for (let e of this.list) t += this.best[e.id] ? rc(e, this.best[e.id]) : 0;
    return t;
  }
  cancel(t = "cancel") {
    this.live &&
      (this.events.push({ type: "fail", s: this.live.s, why: t }),
      (this.live = null));
  }
  _result(t, e) {
    let s = this.best[t.id] || 0,
      n = e > s;
    n && ((this.best[t.id] = Math.round(e * 10) / 10), this.save());
    let o = {
      type: "result",
      s: t,
      val: e,
      stars: rc(t, e),
      best: Math.max(s, e),
      old: s,
      newBest: n,
      starsUp: rc(t, e) > rc(t, s),
    };
    return (this.events.push(o), o);
  }
  update(t, e = !0) {
    let s = this.v,
      n = s.pos.x,
      o = s.pos.z,
      a = this.px,
      r = this.pz;
    if (((this.px = n), (this.pz = o), !e)) {
      this.cancel("paused");
      return;
    }
    if (a === null || Math.hypot(n - a, o - r) > 15) {
      this.cancel("jump");
      return;
    }
    let l = this.live;
    if (l) {
      if (((l.t += t), l.kind === "zone" || l.kind === "drift")) {
        ((l.dist += s.speed * t),
          l.kind === "zone"
            ? (l.val = l.t > 0.3 ? (l.dist / l.t) * 3.6 : s.kmh)
            : (l.val += Hyt(s) * t));
        let c = l.s.gates[l.to],
          h = l.s.gates[1 - l.to];
        if (XF(c, l.s.hw, a, r, n, o)) {
          ((this.live = null), this._result(l.s, l.val));
          return;
        }
        XF(h, l.s.hw, a, r, n, o) && l.t > 1
          ? ((this.live = null),
            this.events.push({ type: "fail", s: l.s, why: "back" }))
          : l.t > (l.s.maxT || 60) &&
            ((this.live = null),
            this.events.push({ type: "fail", s: l.s, why: "time" }));
        return;
      }
      if (l.kind === "jump") {
        (!l.take &&
          s.airTime > 0.08 &&
          ((l.take = {
            x: n - s.vel.x * s.airTime,
            z: o - s.vel.z * s.airTime,
          }),
          (l.air = 0)),
          l.take &&
            ((l.hop = Math.hypot(n - l.take.x, o - l.take.z)),
            (l.val = Math.max(l.best || 0, l.hop)),
            (l.air += t)),
          l.take && s.airTime === 0 && l.air > 0.12
            ? ((l.best = Math.max(l.best || 0, l.hop)),
              (l.take = null),
              (l.landT = l.t))
            : l.take && s.airTime === 0 && (l.take = null),
          ((!l.take &&
            ((l.t > 3 && l.landT === void 0) ||
              (l.landT !== void 0 && l.t - l.landT > 1.2))) ||
            l.t > 10) &&
            ((this.live = null),
            (l.best || 0) >= 3
              ? this._result(l.s, l.best)
              : this.events.push({ type: "fail", s: l.s, why: "noair" })));
        return;
      }
    }
    if ((this._nearT -= t) <= 0) {
      ((this._nearT = 0.25), (this.near = null));
      let c = s.speed || 1;
      for (let f of this.list) {
        let u = f.gates[0],
          d = u.x - n,
          p = u.z - o,
          m = Math.hypot(d, p);
        m < Byt &&
          (d * s.vel.x + p * s.vel.z) / (m * c) > 0.5 &&
          (!this.near || m < this.near.d) &&
          (this.near = { s: f, d: m });
      }
      let h = this.near?.s;
      h &&
        !this.best[h.id] &&
        !this._seen?.has(h.id) &&
        ((this._seen ||= new Set()).add(h.id),
        this.events.push({ type: "discover", s: h }));
    }
    for (let c of this.list)
      if (!(
        Math.abs(n - c.gates[0].x) > 3e3 || Math.abs(o - c.gates[0].z) > 3e3
      ))
        for (let h = 0; h < c.gates.length; h++) {
          let f = XF(c.gates[h], c.hw, a, r, n, o);
          if (f) {
            if (c.kind === "trap") {
              this._result(c, s.kmh);
              return;
            }
            if (c.kind === "jump") {
              f > 0 &&
                ((this.live = { s: c, kind: "jump", val: 0, t: 0, take: null }),
                this.events.push({ type: "start", s: c }));
              return;
            }
            ((this.live = {
              s: c,
              kind: c.kind,
              val: c.kind === "zone" ? s.kmh : 0,
              t: 0,
              dist: 0,
              to: 1 - h,
            }),
              this.events.push({ type: "start", s: c }));
            return;
          }
        }
  }
  markers() {
    return this.list.map((t) => ({
      x: t.gates[0].x,
      z: t.gates[0].z,
      kind: t.kind,
      col: Ml[t.kind].col,
      name: t.name,
      stars: this.best[t.id] ? rc(t, this.best[t.id]) : 0,
    }));
  }
};
as();
as();
var Utt = 650,
  Gtt = 34,
  Uyt = 24,
  mM = null;
function Gyt() {
  if (mM) return mM;
  let i = 32,
    t = 256,
    e = document.createElement("canvas");
  ((e.width = i), (e.height = t));
  let s = e.getContext("2d"),
    n = s.createImageData(i, t);
  for (let o = 0; o < t; o++) {
    let a = 1 - o / (t - 1),
      r = Math.pow(1 - a, 1.3) * (a < 0.02 ? a / 0.02 : 1);
    for (let l = 0; l < i; l++) {
      let c = Math.abs(l + 0.5 - i / 2) / (i / 2),
        h = Math.exp(-c * c * 10),
        f = Math.exp(-c * c * 2.5) * 0.3,
        u = Math.min(1, (h + f) * (0.45 + 0.55 * (1 - a))) * r,
        d = (o * i + l) * 4,
        p = Math.round(255 * Math.min(1, 0.55 + h * 0.45));
      ((n.data[d] = n.data[d + 1] = n.data[d + 2] = p),
        (n.data[d + 3] = Math.round(255 * u)));
    }
  }
  return (s.putImageData(n, 0, 0), (mM = new Sn(e)), (mM.colorSpace = is), mM);
}
function Wtt(i, t, e = 0, s = -1) {
  let o = s > 0 ? 160 : 128,
    a = document.createElement("canvas");
  ((a.width = 128), (a.height = o));
  let r = a.getContext("2d");
  if (
    (r.beginPath(),
    r.arc(128 / 2, 128 / 2, 50, 0, 7),
    (r.fillStyle = "rgba(9,11,15,.82)"),
    r.fill(),
    (r.lineWidth = 7),
    (r.strokeStyle = t),
    r.stroke(),
    r.beginPath(),
    r.arc(128 / 2, 128 / 2, 55, 0, 7),
    (r.lineWidth = 2),
    (r.strokeStyle = "rgba(255,255,255,.55)"),
    r.stroke(),
    Rm(r, i, 128 / 2, 128 / 2, 58, "#fff", 2.1),
    s > 0)
  )
    for (let l = 0; l < s; l++) {
      let c = 64 + (l - (s - 1) / 2) * 24,
        h = 144;
      ((r.fillStyle = l < e ? "#ffd23f" : "rgba(255,255,255,.35)"),
        Wyt(r, c, h, 9),
        (r.lineWidth = 1.5),
        (r.strokeStyle = "rgba(0,0,0,.45)"),
        r.stroke());
    }
  return a;
}
function Wyt(i, t, e, s) {
  i.beginPath();
  for (let n = 0; n < 10; n++) {
    let o = -Math.PI / 2 + (n * Math.PI) / 5,
      a = n % 2 ? s * 0.45 : s;
    i.lineTo(t + Math.cos(o) * a, e + Math.sin(o) * a);
  }
  (i.closePath(), i.fill());
}
