// app 324 — math
// Lines 155662-155919 of readable/app.pretty.js (statement-aligned).
Pn();
Pn();
var OO = 9.81,
  aMt = 12,
  rMt = 0.28,
  het = 0.8,
  aet = 6,
  lMt = 1.5,
  ret = 0.28,
  cet = 0.1,
  rE = 0.14,
  wv = (o, t, e) => (o < t ? t : o > e ? e : o),
  FO = (o, t) => (o > t ? o - t : o < -t ? o + t : 0);
function Nr(o, t, e, s, n, i, a, r = 1, l = 1) {
  let c = s - o.x,
    h = n - o.z,
    f = s - t.x,
    u = n - t.z,
    d = o.vx + o.w * h - (t.vx + t.w * u),
    p = o.vz - o.w * c - (t.vz - t.w * f),
    m = d * e.x + p * e.z;
  if (m >= 0) return 0;
  let g = 1 / o.m,
    b = 1 / t.m,
    v = 1 / o.I,
    x = 1 / t.I,
    y = h * e.x - c * e.z,
    M = u * e.x - f * e.z,
    S = (-(1 + i) * m) / (g + b + y * y * v + M * M * x),
    w = -e.z,
    _ = e.x,
    z = d * w + p * _,
    A = h * w - c * _,
    T = u * w - f * _,
    E = wv(-z / (g + b + A * A * v + T * T * x), -a * S, a * S),
    R = S * e.x + E * w,
    P = S * e.z + E * _;
  return (
    (o.vx += R * g),
    (o.vz += P * g),
    (o.w += (S * y * r + E * A * r * 0.5) * v),
    (t.vx -= R * b),
    (t.vz -= P * b),
    (t.w -= (S * M * l + E * T * l) * x),
    S
  );
}
function BO(o, t, e, s, n, i, a, r = "w") {
  let l = e,
    c = -t,
    h = o.vx * t + o.vz * e,
    f = o.vx * l + o.vz * c,
    u = FO(h, n * OO * s * Math.min(1, 0.35 + Math.abs(h) / 3)),
    d = FO(f, i * OO * s * Math.min(1, 0.35 + Math.abs(f) / 3));
  ((o.vx = u * t + d * l), (o.vz = u * e + d * c), (o[r] = FO(o[r], a * s)));
}
var NO = (o, t, e = het) => (e * OO * 3 * o) / (o * o + t * t),
  lE = class {
    constructor(t) {
      ((this.world = t),
        (this.awake = []),
        (this.moved = new Set()),
        (this.woken = 0));
    }
    wake(t, e = null) {
      if (t.b) return t.b;
      if (this.awake.length >= aMt) {
        let l = null,
          c = 1 / 0;
        for (let h of this.awake) {
          if (h === e) continue;
          let f = Math.hypot(h.b.vx, h.b.vz) + Math.abs(h.b.w) - h.b.rest;
          f < c && ((c = f), (l = h));
        }
        this.sleep(l);
      }
      let s = t.kind || IZ[t.type] || "sedan",
        n = vc(s),
        i = 2 * t.hz,
        a = 2 * t.hx,
        r = (n * (i * i + a * a)) / 12;
      if (!t.pose) {
        let l = t.p?.y ?? (t.y0 !== void 0 ? t.y0 + 1.5 : Wi(t.x, t.z));
        t.pose = { y: l, pitch: t.p?.pitch || 0, roll: 0, dy: 0, flash: !1 };
        let c = this.ground(t, l);
        t.pose.dy = wv(l - c.y, -0.3, 0.3);
      }
      return (
        (t.b = {
          m: n,
          I: r,
          vx: 0,
          vz: 0,
          w: 0,
          x: 0,
          z: 0,
          aw: NO(i, a),
          wp: 0,
          wpd: 0,
          wr: 0,
          wrd: 0,
          rest: 0,
          alarm: aet,
          moving: !0,
        }),
        this.world.unindex(t),
        this.awake.push(t),
        this.woken++,
        t.b
      );
    }
    sleep(t) {
      let e = this.awake.indexOf(t);
      (e >= 0 && this.awake.splice(e, 1),
        (t.b = null),
        (t.pose.flash = !1),
        this.world.index(t),
        this.moved.add(t));
    }
    view(t) {
      let e = t.b;
      return ((e.x = t.x), (e.z = t.z), e);
    }
    kick(t, e, s) {
      let n = t.b;
      if (!n) return;
      let i = (e * t.s + s * t.c) / n.m,
        a = (e * t.c - s * t.s) / n.m;
      ((n.wpd = wv(n.wpd - i * cet, -1.5, 1.5)),
        (n.wrd = wv(n.wrd + a * cet, -1.5, 1.5)),
        (n.alarm = aet),
        (n.rest = 0),
        (n.moving = !0));
    }
    ground(t, e) {
      let s = t.hz * 0.6,
        n = t.hx * 0.9,
        i = t.s,
        a = t.c,
        r = t.c,
        l = -t.s,
        c = (m, g) => Wi(m, g, null, e),
        h = c(t.x + i * s, t.z + a * s),
        f = c(t.x - i * s, t.z - a * s),
        u = c(t.x + r * n, t.z + l * n),
        d = c(t.x - r * n, t.z - l * n),
        p = this._g || (this._g = {});
      return (
        (p.y = Math.max(c(t.x, t.z), (h + f + u + d) / 4)),
        (p.pitch = -Math.atan((h - f) / (2 * s))),
        (p.roll = Math.atan((u - d) / (2 * n))),
        p
      );
    }
    step(t) {
      for (let e = this.awake.length - 1; e >= 0; e--) {
        let s = this.awake[e],
          n = s.b;
        if (n.moving) {
          if (
            (BO(n, s.s, s.c, t, rMt, het, n.aw),
            (s.x += n.vx * t),
            (s.z += n.vz * t),
            n.w)
          ) {
            let c = Math.atan2(s.s, s.c) + n.w * t;
            ((s.c = Math.cos(c)), (s.s = Math.sin(c)));
          }
          this.contacts(s);
          let i = 2 * Math.PI * lMt;
          ((n.wpd += (-i * i * n.wp - 2 * ret * i * n.wpd) * t),
            (n.wp = wv(n.wp + n.wpd * t, -rE, rE)),
            (n.wrd += (-i * i * n.wr - 2 * ret * i * n.wrd) * t),
            (n.wr = wv(n.wr + n.wrd * t, -rE, rE)));
          let a = this.ground(s, s.pose.y),
            r = s.pose;
          ((r.y = a.y + r.dy),
            (r.pitch = a.pitch + n.wp),
            (r.roll = a.roll + n.wr),
            s.y0 !== void 0 && ((s.y0 = r.y - 1.5), (s.y1 = r.y + 2.5)));
          let l =
            n.vx * n.vx + n.vz * n.vz < 0.003 &&
            Math.abs(n.w) < 0.03 &&
            Math.abs(n.wp) + Math.abs(n.wr) < 0.004 &&
            Math.abs(n.wpd) + Math.abs(n.wrd) < 0.04;
          ((n.rest = l ? n.rest + t : 0),
            n.rest > 0.25 &&
              ((n.moving = !1),
              (n.vx = n.vz = n.w = 0),
              (r.pitch = a.pitch),
              (r.roll = a.roll)));
        }
        ((n.alarm -= t),
          (s.pose.flash = n.alarm > 0 && (n.alarm * 2.2) % 1 < 0.5),
          this.moved.add(s),
          !n.moving && n.alarm <= 0 && this.sleep(s));
      }
    }
    contacts(t) {
      let e = this.world,
        s = t.b,
        n = { x: t.c, z: -t.s },
        i = { x: t.s, z: t.c },
        a = t.pose.y;
      for (let r = 0; r < 2; r++) {
        let l = e.near(t.x, t.z, t.hz + 1);
        for (let u of this.awake)
          u !== t &&
            Math.abs(u.x - t.x) < 8 &&
            Math.abs(u.z - t.z) < 8 &&
            l.add(u);
        for (let u of e.dynamic)
          Math.abs(u.x - t.x) < 10 && Math.abs(u.z - t.z) < 10 && l.add(u);
        let c = null;
        for (let u of l) {
          if (
            u === t ||
            u.dead ||
            (u.y1 !== void 0 && (a > u.y1 + 0.3 || a + 1.4 < u.y0))
          )
            continue;
          let d = e.test(u, t.x, t.z, n, i, t.hx, t.hz);
          d && (!c || d.d > c.d) && ((c = d), (d.c = u));
        }
        if (!c) break;
        let h = c.c,
          f = c.n;
        if (h.parked) {
          let u = this.wake(h, t),
            d = this.view(t),
            p = this.view(h),
            m = 1 / d.m / (1 / d.m + 1 / p.m);
          ((t.x += f.x * c.d * m),
            (t.z += f.z * c.d * m),
            (h.x -= f.x * c.d * (1 - m)),
            (h.z -= f.z * c.d * (1 - m)));
          let g = Nr(d, p, f, c.px, c.pz, 0.15, 0.3);
          (g &&
            (this.kick(t, g * f.x, g * f.z), this.kick(h, -g * f.x, -g * f.z)),
            (u.moving = !0),
            this.moved.add(h));
        } else if (h.traffic) {
          ((t.x += f.x * c.d), (t.z += f.z * c.d));
          let u = e.trafficView(h.traffic),
            d = Nr(this.view(t), u, f, c.px, c.pz, 0.15, 0.3);
          d &&
            (this.kick(t, d * f.x, d * f.z),
            u.m < 1 / 0 &&
              e.onShove?.(h.traffic, d * f.x, d * f.z, c.px, c.pz));
        } else {
          ((t.x += f.x * (c.d + 0.002)), (t.z += f.z * (c.d + 0.002)));
          let u = Nr(this.view(t), cMt, f, c.px, c.pz, 0.1, 0.3);
          u && this.kick(t, u * f.x, u * f.z);
        }
      }
    }
  },
  cMt = { m: 1 / 0, I: 1 / 0, vx: 0, vz: 0, w: 0, x: 0, z: 0 };
