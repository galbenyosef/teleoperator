// app 380 — buf
// Lines 190021-190204 of readable/app.pretty.js (statement-aligned).
function $nt(o, t, e) {
  let s = !1,
    n = o.length / 2;
  for (let i = 0, a = n - 1; i < n; a = i++) {
    let r = o[i * 2],
      l = o[i * 2 + 1],
      c = o[a * 2],
      h = o[a * 2 + 1];
    l > e != h > e && t < ((c - r) * (e - l)) / (h - l) + r && (s = !s);
  }
  return s;
}
function _6t(o, t, e) {
  let s = (l, c, h, f, u, d) => (h - l) * (d - c) - (f - c) * (u - l),
    n = s(e.ax, e.az, e.bx, e.bz, o[0], o[1]),
    i = s(e.ax, e.az, e.bx, e.bz, t[0], t[1]),
    a = s(o[0], o[1], t[0], t[1], e.ax, e.az),
    r = s(o[0], o[1], t[0], t[1], e.bx, e.bz);
  return n * i < 0 && a * r < 0;
}
function E6t(o, t) {
  let e = t.bx - t.ax,
    s = t.bz - t.az,
    n = e * e + s * s || 1,
    i = Mi(((o[0] - t.ax) * e + (o[1] - t.az) * s) / n, 0, 1);
  return Math.hypot(o[0] - t.ax - e * i, o[1] - t.az - s * i);
}
var T6t = new Set([
    "S",
    "da",
    "assists",
    "manual",
    "holdStop",
    "rp",
    "_prev",
    "_hk",
    "zoneCap",
    "fanOn",
    "liftOff",
    "landed",
    "_rHF",
  ]),
  bT = (o) => o === null || (typeof o != "object" && typeof o != "function"),
  KB = (o) =>
    o &&
    typeof o == "object" &&
    (Object.getPrototypeOf(o) === Object.prototype ||
      Object.getPrototypeOf(o) === null);
function Xnt(o) {
  let t = {};
  for (let e of Object.keys(o)) {
    if (T6t.has(e)) continue;
    let s = o[e];
    if (bT(s)) t[e] = s;
    else if (Array.isArray(s)) s.every(bT) && (t[e] = s.slice());
    else if (KB(s)) {
      let n = {};
      for (let i of Object.keys(s)) {
        let a = s[i];
        bT(a)
          ? (n[i] = a)
          : Array.isArray(a) && a.every(bT) && (n[i] = a.slice());
      }
      t[e] = n;
    }
  }
  return t;
}
function Knt(o, t) {
  for (let e of Object.keys(t)) {
    let s = t[e],
      n = o[e];
    if (Array.isArray(s))
      if (Array.isArray(n) && n.length === s.length)
        for (let i = 0; i < s.length; i++) n[i] = s[i];
      else o[e] = s.slice();
    else if (KB(s))
      if (KB(n))
        for (let i of Object.keys(s))
          n[i] = Array.isArray(s[i]) ? s[i].slice() : s[i];
      else o[e] = { ...s };
    else o[e] = s;
  }
  o._prev = null;
}
var xT = class {
  constructor(t, { seconds: e = 10, rate: s = 30, speed: n = 2 } = {}) {
    ((this.v = t),
      (this.max = Math.round(e * s)),
      (this.rate = s),
      (this.speed = n),
      (this.buf = []),
      (this.t = 0),
      (this.on = !1),
      (this.back = 0),
      (this.uses = 0),
      (this._q = 0));
  }
  get seconds() {
    return this.buf.length / this.rate;
  }
  clear() {
    ((this.buf.length = 0), (this.t = 0), (this._q = 0));
  }
  update(t, e, s = !0, n = !0) {
    let i = this.v;
    if (e && s && (this.on || this.buf.length > 1)) {
      (this.on || ((this.on = !0), (this.back = 0), this.uses++, (this._q = 0)),
        (this._q += t * this.rate * this.speed));
      let a = Math.floor(this._q);
      for (this._q -= a; a-- > 0 && this.buf.length > 1;) this.buf.pop();
      return (
        Knt(i, this.buf[this.buf.length - 1]),
        (this.back += t * this.speed),
        !0
      );
    }
    if (
      (this.on &&
        ((this.on = !1),
        (this.t = 0),
        Knt(i, this.buf[this.buf.length - 1] || Xnt(i))),
      !n)
    )
      return !1;
    if (((this.t -= t), this.t <= 0)) {
      ((this.t += 1 / this.rate), this.t < 0 && (this.t = 0));
      let a = this.buf[this.buf.length - 1];
      (a &&
        Math.hypot(i.pos.x - a.pos.x, i.pos.z - a.pos.z) > 40 &&
        (this.buf.length = 0),
        this.buf.push(Xnt(i)),
        this.buf.length > this.max && this.buf.shift());
    }
    return !1;
  }
};
await No();
Jnt();
var ql = {
    trap: { label: "Speed Trap", unit: "km/h", col: "#ff8a1f" },
    zone: { label: "Speed Zone", unit: "km/h", col: "#ffb81f" },
    drift: { label: "Drift Zone", unit: "pts", col: "#c45bff" },
    jump: { label: "Danger Sign", unit: "m", col: "#ffd21f" },
  },
  JB = (o, t) => {
    let e = Math.hypot(o, t) || 1;
    return [o / e, t / e];
  };
var x4 = Ia("stunts", Ynt);
for (let o of x4)
  if (o.a) {
    let t = JB(o.b[0] - o.a[0], o.b[1] - o.a[1]);
    o.gates = [
      { x: o.a[0], z: o.a[1], dir: o.dirA || t },
      { x: o.b[0], z: o.b[1], dir: o.dirB || t },
    ];
  } else o.gates = [{ x: o.x, z: o.z, dir: o.dir }];
var Fc = (o, t) => o.stars.reduce((e, s) => e + (t >= s ? 1 : 0), 0),
  yT = (o, t) =>
    o.kind === "drift"
      ? Math.round(t).toLocaleString("en-US")
      : o.kind === "jump"
        ? t.toFixed(1)
        : Math.round(t).toString(),
  R6t = 220,
  A6t = 1.5,
  P6t = (o) => {
    let t = o.kmh,
      e = Math.abs(o.beta || 0) * 57.2958;
    return o.onGround !== !1 && t > 25 && e > 8 && !o.reverse
      ? t * Math.min(50, e) * A6t
      : 0;
  },
  Znt = (o, t, e) => (t - o.x) * o.dir[0] + (e - o.z) * o.dir[1],
  C6t = (o, t, e) => (t - o.x) * -o.dir[1] + (e - o.z) * o.dir[0];
function YB(o, t, e, s, n, i) {
  let a = Znt(o, e, s),
    r = Znt(o, n, i);
  if (a < 0 == r < 0 || a === r) return 0;
  let l = a / (a - r),
    c = C6t(o, e + (n - e) * l, s + (i - s) * l);
  return Math.abs(c) <= t ? (r > a ? 1 : -1) : 0;
}
