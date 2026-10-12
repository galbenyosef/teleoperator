// app 363 — buf
// Lines 181917-182094 of readable/app.pretty.js (statement-aligned).
function Ntt(i, t, e) {
  let s = !1,
    n = i.length / 2;
  for (let o = 0, a = n - 1; o < n; a = o++) {
    let r = i[o * 2],
      l = i[o * 2 + 1],
      c = i[a * 2],
      h = i[a * 2 + 1];
    l > e != h > e && t < ((c - r) * (e - l)) / (h - l) + r && (s = !s);
  }
  return s;
}
function Iyt(i, t, e) {
  let s = (l, c, h, f, u, d) => (h - l) * (d - c) - (f - c) * (u - l),
    n = s(e.ax, e.az, e.bx, e.bz, i[0], i[1]),
    o = s(e.ax, e.az, e.bx, e.bz, t[0], t[1]),
    a = s(i[0], i[1], t[0], t[1], e.ax, e.az),
    r = s(i[0], i[1], t[0], t[1], e.bx, e.bz);
  return n * o < 0 && a * r < 0;
}
function Fyt(i, t) {
  let e = t.bx - t.ax,
    s = t.bz - t.az,
    n = e * e + s * s || 1,
    o = uo(((i[0] - t.ax) * e + (i[1] - t.az) * s) / n, 0, 1);
  return Math.hypot(i[0] - t.ax - e * o, i[1] - t.az - s * o);
}
var Nyt = new Set([
    "S",
    "da",
    "assists",
    "manual",
    "holdStop",
    "rp",
    "_prev",
    "_hk",
    "zoneCap",
  ]),
  Zz = (i) => i === null || (typeof i != "object" && typeof i != "function"),
  $F = (i) =>
    i &&
    typeof i == "object" &&
    (Object.getPrototypeOf(i) === Object.prototype ||
      Object.getPrototypeOf(i) === null);
function Btt(i) {
  let t = {};
  for (let e of Object.keys(i)) {
    if (Nyt.has(e)) continue;
    let s = i[e];
    if (Zz(s)) t[e] = s;
    else if (Array.isArray(s)) s.every(Zz) && (t[e] = s.slice());
    else if ($F(s)) {
      let n = {};
      for (let o of Object.keys(s)) {
        let a = s[o];
        Zz(a)
          ? (n[o] = a)
          : Array.isArray(a) && a.every(Zz) && (n[o] = a.slice());
      }
      t[e] = n;
    }
  }
  return t;
}
function Ott(i, t) {
  for (let e of Object.keys(t)) {
    let s = t[e],
      n = i[e];
    if (Array.isArray(s))
      if (Array.isArray(n) && n.length === s.length)
        for (let o = 0; o < s.length; o++) n[o] = s[o];
      else i[e] = s.slice();
    else if ($F(s))
      if ($F(n))
        for (let o of Object.keys(s))
          n[o] = Array.isArray(s[o]) ? s[o].slice() : s[o];
      else i[e] = { ...s };
    else i[e] = s;
  }
  i._prev = null;
}
var Qz = class {
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
    let o = this.v;
    if (e && s && (this.on || this.buf.length > 1)) {
      (this.on || ((this.on = !0), (this.back = 0), this.uses++, (this._q = 0)),
        (this._q += t * this.rate * this.speed));
      let a = Math.floor(this._q);
      for (this._q -= a; a-- > 0 && this.buf.length > 1;) this.buf.pop();
      return (
        Ott(o, this.buf[this.buf.length - 1]),
        (this.back += t * this.speed),
        !0
      );
    }
    if (
      (this.on &&
        ((this.on = !1),
        (this.t = 0),
        Ott(o, this.buf[this.buf.length - 1] || Btt(o))),
      !n)
    )
      return !1;
    if (((this.t -= t), this.t <= 0)) {
      ((this.t += 1 / this.rate), this.t < 0 && (this.t = 0));
      let a = this.buf[this.buf.length - 1];
      (a &&
        Math.hypot(o.pos.x - a.pos.x, o.pos.z - a.pos.z) > 40 &&
        (this.buf.length = 0),
        this.buf.push(Btt(o)),
        this.buf.length > this.max && this.buf.shift());
    }
    return !1;
  }
};
Htt();
var Ml = {
    trap: { label: "Speed Trap", unit: "km/h", col: "#ff8a1f" },
    zone: { label: "Speed Zone", unit: "km/h", col: "#ffb81f" },
    drift: { label: "Drift Zone", unit: "pts", col: "#c45bff" },
    jump: { label: "Danger Sign", unit: "m", col: "#ffd21f" },
  },
  KF = (i, t) => {
    let e = Math.hypot(i, t) || 1;
    return [i / e, t / e];
  };
for (let i of nv)
  if (i.a) {
    let t = KF(i.b[0] - i.a[0], i.b[1] - i.a[1]);
    i.gates = [
      { x: i.a[0], z: i.a[1], dir: i.dirA || t },
      { x: i.b[0], z: i.b[1], dir: i.dirB || t },
    ];
  } else i.gates = [{ x: i.x, z: i.z, dir: i.dir }];
var rc = (i, t) => i.stars.reduce((e, s) => e + (t >= s ? 1 : 0), 0),
  eE = (i, t) =>
    i.kind === "drift"
      ? Math.round(t).toLocaleString("en-US")
      : i.kind === "jump"
        ? t.toFixed(1)
        : Math.round(t).toString(),
  Byt = 220,
  Oyt = 1.5,
  Hyt = (i) => {
    let t = i.kmh,
      e = Math.abs(i.beta || 0) * 57.2958;
    return i.onGround !== !1 && t > 25 && e > 8 && !i.reverse
      ? t * Math.min(50, e) * Oyt
      : 0;
  },
  Dtt = (i, t, e) => (t - i.x) * i.dir[0] + (e - i.z) * i.dir[1],
  Dyt = (i, t, e) => (t - i.x) * -i.dir[1] + (e - i.z) * i.dir[0];
function XF(i, t, e, s, n, o) {
  let a = Dtt(i, e, s),
    r = Dtt(i, n, o);
  if (a < 0 == r < 0 || a === r) return 0;
  let l = a / (a - r),
    c = Dyt(i, e + (n - e) * l, s + (o - s) * l);
  return Math.abs(c) <= t ? (r > a ? 1 : -1) : 0;
}
