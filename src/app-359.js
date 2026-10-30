// app 359 — math
// Lines 172368-172706 of readable/app.pretty.js (statement-aligned).
var s8t = {
    delay: 0,
    maxAge: 350,
    blend: 0.15,
    accel: 0.25,
    hold: 250,
    snap: 15,
    jump: 30,
    w: 0,
    late0: 200,
    maxAgeI: 0,
    holdI: 0,
    late0I: 0,
  },
  $E = (o) =>
    o[2] > 0.5 ? 2 : o[1] > 0.15 ? 1 : o[0] > 0.2 ? (o[3] > 0.5 ? 4 : 0) : 3,
  xB = (o) => (o < 8 ? 0 : o < 16 ? 1 : o < 26 ? 2 : 3),
  n8t = [
    [3.5, 3, 2.2, 1.2],
    [-8, -9, -9.5, -9.5],
    [-4, -5, -5, -5],
    [-0.6, -0.5, -0.6, -0.8],
    [7, 6, 4.4, 2.4],
  ],
  vB = (o, t) =>
    t === 1
      ? Math.max(0.15, o[1])
      : t === 0 || t === 4
        ? Math.max(0.2, o[0])
        : 1,
  XE = class {
    constructor(t = {}) {
      ((this.o = { ...s8t, ...t }),
        (this.S = []),
        (this.pose = {
          x: 0,
          y: 0,
          z: 0,
          psi: 0,
          vx: 0,
          vz: 0,
          r: 0,
          speed: 0,
          drawn: !1,
        }),
        (this.got = -1e9),
        (this.B = null),
        (this.tg = {}),
        (this.lw = []),
        (this.late = 0),
        (this.ex = 0),
        (this.acc = n8t.map((e) => e.slice())));
    }
    push(t, e, s, n = null, i) {
      let a = this.newest(),
        r = t[t.length - 1],
        l =
          i !== void 0 &&
          this.clockRevision !== void 0 &&
          i !== this.clockRevision,
        c =
          i === void 0 &&
          a &&
          r &&
          Number.isFinite(s) &&
          a[0] - s > 250 &&
          r[0] < a[0] - 250 &&
          r[0] <= s + 250 &&
          s - r[0] < 3e3;
      ((l || c) &&
        ((this.S.length = 0),
        (this.lw.length = 0),
        (this.late = this.ex = this.jit = 0),
        (this.B = null),
        (this.clockResets = (this.clockResets || 0) + 1)),
        i !== void 0 && (this.clockRevision = i));
      for (let d of t) {
        let p = this.S[this.S.length - 1];
        if (!p || d[0] > p[0]) {
          if (n) {
            for (let m of n)
              if (m[0] === d[0]) {
                d.inp = m.slice(1);
                break;
              }
          }
          if (p?.inp && d[0] - p[0] > 15 && d[0] - p[0] < 200 && p[11] > -0.5) {
            let m = (d[11] - p[11]) / ((d[0] - p[0]) / 1e3),
              g = $E(p.inp),
              b = xB(Math.abs(p[11]));
            if (Math.abs(m) < 15 && !(g > 0 && p[11] < 1)) {
              let v = 1 / vB(p.inp, g);
              this.acc[g][b] += (m * v - this.acc[g][b]) * 0.25;
            }
          }
          (this.S.push(d), (this.got = e));
        }
      }
      for (; this.S.length > 24;) this.S.shift();
      let h = this.newest();
      if (!h || !Number.isFinite(s)) return;
      let f = this.lw;
      for (f.push([e, s - h[0]]); f.length > 1 && e - f[0][0] > 2e3;) f.shift();
      let u = 1 / 0;
      for (let d of f) d[1] < u && (u = d[1]);
      if (((this.late = u), f.length >= 5)) {
        let d = f.map((p) => p[1]).sort((p, m) => p - m);
        this.jit = Math.max(0, d[Math.floor(d.length * 0.9)] - u);
      }
    }
    newest() {
      return this.S[this.S.length - 1] || null;
    }
    pedalA(t) {
      let e = this.newest();
      if (!(e?.inp && e[11] > -0.5)) return null;
      let s = $E(e.inp);
      return this.acc[s][xB(Math.abs(t))] * vB(e.inp, s);
    }
    target(t) {
      let e = this.S,
        s = e.length,
        n = this.tg,
        i = this.o;
      if (!s) return null;
      let a = s - 1;
      for (; a > 0 && e[a][0] > t;) a--;
      let r = e[a],
        l = e[a + 1];
      if (l && t >= r[0] && Math.hypot(l[1] - r[1], l[3] - r[3]) < i.jump) {
        let c = Math.max(1, l[0] - r[0]) / 1e3,
          h = Math.max(0, Math.min(1, (t - r[0]) / (c * 1e3))),
          f = (v) => r[v] + (l[v] - r[v]) * h,
          u = h * h,
          d = u * h,
          p = 2 * d - 3 * u + 1,
          m = d - 2 * u + h,
          g = -2 * d + 3 * u,
          b = d - u;
        ((n.x = p * r[1] + m * c * r[12] + g * l[1] + b * c * l[12]),
          (n.z = p * r[3] + m * c * r[13] + g * l[3] + b * c * l[13]),
          (n.y = f(2)),
          (n.psi =
            r[4] +
            Math.atan2(Math.sin(l[4] - r[4]), Math.cos(l[4] - r[4])) * h),
          (n.vx = f(12)),
          (n.vz = f(13)),
          (n.r = f(14)),
          (n.q = r),
          (n.jump = !1));
      } else if (e[s - 1].inp && i.maxAgeI && e[s - 1][11] > -0.5) {
        let c = e[s - 1],
          h = s > 1 ? e[s - 2] : null,
          f = Math.max(0, Math.min(i.maxAgeI, t - c[0])) / 1e3,
          u = $E(c.inp),
          d = this.acc[u],
          p = c[1],
          m = c[3],
          g = c[4],
          b = c[11],
          v = Math.sin(g),
          x = Math.cos(g),
          y = c[14],
          M = c[12] * x - c[13] * v,
          S = Math.max(1, Math.ceil(f / 0.03)),
          w = f / S,
          _ =
            h &&
            Math.abs(h.inp?.[0] - c.inp[0]) < 0.1 &&
            Math.abs(h.inp?.[1] - c.inp[1]) < 0.1 &&
            c[0] - h[0] > 15 &&
            c[0] - h[0] < 200 &&
            h.inp &&
            $E(h.inp) === u
              ? Math.max(
                  -12,
                  Math.min(12, (c[11] - h[11]) / ((c[0] - h[0]) / 1e3)),
                )
              : null;
        for (let z = 0; z < S; z++) {
          let A = (z + 0.5) * w,
            T = _ !== null && A < i.accel ? _ : d[xB(b)] * vB(c.inp, u),
            E = Math.max(0, b + T * w);
          ((v = Math.sin(g)), (x = Math.cos(g)));
          let R = (b + E) / 2;
          ((p += (-v * R + x * M) * w),
            (m += (-x * R - v * M) * w),
            (g += y * w),
            (b = E),
            (M *= Math.exp(-w * (Math.abs(M) > 2 ? 0.3 : 2.5))));
          let P = (Math.abs(y) * Math.hypot(b, M)) / 9.5;
          y *= Math.exp(
            -w * (b < 0.3 ? 6 : +(globalThis.__WD ?? 0.7) * Math.max(1, P)),
          );
        }
        ((v = Math.sin(g)),
          (x = Math.cos(g)),
          (n.x = p),
          (n.z = m),
          (n.y = c[2]),
          (n.psi = g),
          (n.vx = -v * b + x * M),
          (n.vz = -x * b - v * M),
          (n.r = y),
          (n.q = c),
          (n.jump = !!(
            h &&
            Math.hypot(c[1] - h[1], c[3] - h[3]) > i.jump &&
            c !== this.jumped
          )),
          n.jump && (this.jumped = c));
      } else {
        let c = e[s - 1],
          h = s > 1 ? e[s - 2] : null,
          f = Math.max(0, Math.min(i.maxAge, t - c[0])) / 1e3,
          u = 0,
          d = 0;
        if (i.accel && h && c[0] - h[0] > 15 && c[0] - h[0] < 200) {
          let b = (c[0] - h[0]) / 1e3;
          ((u = Math.max(-12, Math.min(12, (c[12] - h[12]) / b))),
            (d = Math.max(-12, Math.min(12, (c[13] - h[13]) / b))));
        }
        let p = Math.min(f, i.accel),
          m = c[12] + u * p,
          g = c[13] + d * p;
        (c[12] * m + c[13] * g < 0 && ((m = 0), (g = 0)),
          (n.x = c[1] + ((c[12] + m) / 2) * f),
          (n.z = c[3] + ((c[13] + g) / 2) * f),
          (n.y = c[2]),
          (n.psi = c[4] + c[14] * f),
          (n.vx = m),
          (n.vz = g),
          (n.r = c[14]),
          (n.q = c),
          (n.jump = !!(
            h &&
            Math.hypot(c[1] - h[1], c[3] - h[3]) > i.jump &&
            c !== this.jumped
          )),
          n.jump && (this.jumped = c));
      }
      return n;
    }
    at(t, e, s) {
      {
        let c = Math.max(
            this.o.jitter
              ? Math.min(
                  this.o.jitMax ?? 250,
                  (this.o.jitK ?? 2) * (this.jit || 0) + 17,
                )
              : 0,
            Math.min(
              1500,
              this.late -
                (this.newest()?.inp && this.o.late0I
                  ? this.o.late0I
                  : this.o.late0),
            ),
          ),
          h = 100 * Math.min(0.1, s);
        ((this.ex += Math.max(-h, Math.min(h, c - this.ex))),
          this.pose.drawn || (this.ex = c));
      }
      let n = this.target(t - this.o.delay - this.ex),
        i = this.pose,
        a = this.o;
      if (!n || !Number.isFinite(n.x + n.z + n.psi)) return i.drawn ? i : null;
      i.jump = !!n.jump;
      let r = e - this.got > (this.newest()?.inp && a.holdI ? a.holdI : a.hold),
        l = this.B || (this.B = { t: 1, x: 0, z: 0, vx: 0, vz: 0, q: null });
      if (
        !i.drawn ||
        n.jump ||
        !Number.isFinite(i.x + i.z + i.psi) ||
        Math.hypot(n.x - i.x, n.z - i.z) > a.snap
      )
        ((i.x = n.x),
          (i.y = n.y),
          (i.z = n.z),
          (i.psi = n.psi),
          (i.vx = n.vx),
          (i.vz = n.vz),
          (l.t = 1),
          (l.q = this.newest()),
          (i.drawn = !0));
      else if (a.w) {
        let c = a.w,
          h = r ? 0 : n.vx,
          f = r ? 0 : n.vz,
          u = Math.max(1, Math.ceil(s / 0.008)),
          d = s / u;
        for (let p = 0; p < u; p++) {
          let m = c * c * (n.x - i.x) + 2 * c * (h - i.vx),
            g = c * c * (n.z - i.z) + 2 * c * (f - i.vz);
          ((i.vx += m * d),
            (i.vz += g * d),
            (i.x += i.vx * d),
            (i.z += i.vz * d),
            (n.x += h * d),
            (n.z += f * d));
        }
        ((i.y += (n.y - i.y) * Math.min(1, s * 8)),
          (i.psi +=
            Math.atan2(Math.sin(n.psi - i.psi), Math.cos(n.psi - i.psi)) *
            Math.min(1, s * c * 0.7)));
      } else {
        let c = this.newest();
        (l.q !== c &&
          ((l.q = c),
          (l.t = 0),
          (l.x = i.x),
          (l.z = i.z),
          (l.vx = i.vx),
          (l.vz = i.vz)),
          (l.t = Math.min(1, l.t + s / a.blend)));
        let h = l.t * l.t * (3 - 2 * l.t),
          f = r ? 0 : n.vx,
          u = r ? 0 : n.vz;
        ((i.vx = l.vx + (f - l.vx) * h),
          (i.vz = l.vz + (u - l.vz) * h),
          (l.x += i.vx * s),
          (l.z += i.vz * s),
          (i.x = l.x + (n.x - l.x) * h),
          (i.z = l.z + (n.z - l.z) * h),
          (i.y += (n.y - i.y) * Math.min(1, s * 8)),
          (i.psi +=
            Math.atan2(Math.sin(n.psi - i.psi), Math.cos(n.psi - i.psi)) *
            Math.min(1, s / (a.blend * 0.6))));
      }
      return (
        (i.r = n.r),
        (i.stale = r),
        (i.q = n.q),
        (i.speed = r ? 0 : Math.hypot(i.vx, i.vz) * Math.sign(n.q?.[11] || 1)),
        i
      );
    }
  };
