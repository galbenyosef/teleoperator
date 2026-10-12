// app 344 — math
// Lines 166578-166837 of readable/app.pretty.js (statement-aligned).
var Cz = (i) => Math.atan2(Math.sin(i), Math.cos(i)),
  E5t = {
    ku: 3.2,
    ka: 2.5,
    ki: 0.5,
    kh: 7,
    kc: 2.2,
    kv: 8,
    ks: 1,
    tr: 0.07,
    aUp: 9,
    aDn: 14,
    rMax: 2.6,
    gap: 7,
    head: 1.3,
    fade: 0.4,
    snap: 20,
  },
  Lz = class {
    constructor(t = {}) {
      ((this.o = { ...E5t, ...t }),
        (this.init = !1),
        (this.x = 0),
        (this.z = 0),
        (this.psi = 0),
        (this.u = 0),
        (this.v = 0),
        (this.r = 0),
        (this.ax = 0),
        (this.ay = 0),
        (this.fadeT = 0),
        (this.Tu0 = null),
        (this.aT = 0),
        (this.fades = 0));
    }
    reset(t) {
      let e = { x: -Math.sin(t.psi), z: -Math.cos(t.psi) };
      ((this.x = t.x),
        (this.z = t.z),
        (this.psi = t.psi),
        (this.u = t.vx * e.x + t.vz * e.z),
        (this.v = t.vx * Math.cos(t.psi) - t.vz * Math.sin(t.psi)),
        (this.r = t.r || 0),
        (this.init = !0),
        (this.Tu0 = null),
        (this.aT = 0),
        (this.ia = 0),
        Object.assign((this.lastTarget ||= {}), {
          x: t.x,
          z: t.z,
          psi: t.psi,
          vx: t.vx,
          vz: t.vz,
          r: t.r || 0,
        }));
    }
    coast(t, e = null) {
      if (!this.init || !(t > 0)) return this;
      let s = Math.exp(-t * 2);
      return (
        e !== null && this.u > -0.5
          ? ((this.u = Math.max(0, this.u + e * t)),
            (this.r *= this.u < 0.3 ? s : Math.exp(-t * 0.3)),
            (this.v *= s))
          : ((this.u =
              Math.sign(this.u) * Math.max(0, Math.abs(this.u) - 2 * t)),
            (this.r *= s),
            (this.v *= s)),
        (this.psi += this.r * t),
        (this.x +=
          (-Math.sin(this.psi) * this.u + Math.cos(this.psi) * this.v) * t),
        (this.z +=
          (-Math.cos(this.psi) * this.u - Math.sin(this.psi) * this.v) * t),
        (this.ax = 0),
        (this.ay = this.u * this.r),
        (this.Tu0 = null),
        this
      );
    }
    kick(t, e, s = 0) {
      let n = Math.cos(this.psi),
        o = Math.sin(this.psi);
      ((this.u += -t * o - e * n), (this.v += t * n - e * o), (this.r += s));
    }
    get vx() {
      return -Math.sin(this.psi) * this.u + Math.cos(this.psi) * this.v;
    }
    get vz() {
      return -Math.cos(this.psi) * this.u - Math.sin(this.psi) * this.v;
    }
    step(t, e) {
      let s = this.o;
      if (!this.init || !Number.isFinite(this.x + this.z + this.psi))
        return (this.reset(t), this);
      if (!(e > 0)) return this;
      let n = { x: -Math.sin(t.psi), z: -Math.cos(t.psi) },
        o = t.vx * n.x + t.vz * n.z,
        a = t.vx * Math.cos(t.psi) - t.vz * Math.sin(t.psi);
      if (this.Tu0 !== null) {
        let m = Math.max(-15, Math.min(15, (o - this.Tu0) / e));
        this.aT += (m - this.aT) * Math.min(1, e * 10);
      }
      this.Tu0 = o;
      let r = t.x - this.x,
        l = t.z - this.z,
        c = Cz(t.psi - this.psi);
      if (t.jump || Math.hypot(r, l) > s.snap * 3)
        return (
          this.reset(t),
          (this.fadeT = 0),
          (this.snaps = (this.snaps || 0) + 1),
          this
        );
      (Math.hypot(r, l) > s.gap || Math.abs(c) > s.head) &&
        (this.fadeT > 0 || this.fades++, (this.fadeT = s.fade));
      let h = this.lastTarget;
      if (
        (this.fadeT > 0 &&
          h &&
          (this.fadeT = Math.min(
            s.fade,
            this.fadeT +
              s.fade *
                Math.max(
                  Math.hypot(t.x - h.x - h.vx * e, t.z - h.z - h.vz * e) /
                    s.gap,
                  Math.abs(Cz(t.psi - h.psi - h.r * e)) / s.head,
                ),
          )),
        Object.assign((this.lastTarget ||= {}), {
          x: t.x,
          z: t.z,
          psi: t.psi,
          vx: t.vx,
          vz: t.vz,
          r: t.r || 0,
        }),
        this.fadeT > 0)
      ) {
        let m = Math.min(1, e / this.fadeT);
        return (
          (this.fadeT = this.fadeT - e > 1e-9 ? this.fadeT - e : 0),
          (this.u += (o - this.u) * m),
          (this.v += (a - this.v) * m),
          (this.r += ((t.r || 0) - this.r) * m),
          (this.x +=
            (-Math.sin(this.psi) * this.u + Math.cos(this.psi) * this.v) * e),
          (this.z +=
            (-Math.cos(this.psi) * this.u - Math.sin(this.psi) * this.v) * e),
          (this.psi += this.r * e),
          (this.x += (t.x - this.x) * m),
          (this.z += (t.z - this.z) * m),
          (this.psi += Cz(t.psi - this.psi) * m),
          this
        );
      }
      let f = Math.max(1, Math.ceil(e / (1 / 120))),
        u = e / f,
        d = this.u,
        p = this.r;
      for (let m = 0; m < f; m++) {
        let g = Math.sin(this.psi),
          b = Math.cos(this.psi),
          x = -g,
          v = -b,
          y = b,
          M = -g,
          S = u * (m + 1) - e,
          w = t.x + t.vx * S,
          z = t.z + t.vz * S,
          _ = t.psi + (t.r || 0) * S,
          R = w - this.x,
          T = z - this.z,
          E = R * x + T * v,
          A = R * y + T * M,
          C = Cz(_ - this.psi);
        this.ia = Math.max(-10, Math.min(10, (this.ia || 0) + E * u));
        let P = Math.max(
          -s.aDn,
          Math.min(
            s.aUp,
            this.aT + s.ku * (o - this.u) + s.ka * E + s.ki * this.ia,
          ),
        );
        this.u += P * u;
        let I = Math.max(3, Math.abs(this.u)),
          L =
            (t.r || 0) +
            s.kh * C -
            (((s.kc * A) / I) * Math.sign(this.u || 1) * s.kh) / 3,
          F = Math.max(
            Math.min(s.rMax, 9.5 / I + Math.abs(t.r || 0) * 0.5 + 0.3),
            Math.abs(t.r || 0) * 1.25,
          );
        this.r +=
          (Math.max(-F, Math.min(F, L)) - this.r) * Math.min(1, u / s.tr);
        let N = Math.max(0, Math.min(1, (Math.abs(a) - 2) / 3)),
          B = Math.max(
            -0.5 * Math.abs(a),
            Math.min(0.5 * Math.abs(a), N * s.ks * A),
          );
        ((this.v += (a + B - this.v) * Math.min(1, u * s.kv)),
          (this.psi += this.r * u),
          (this.x += (x * this.u + y * this.v) * u),
          (this.z += (v * this.u + M * this.v) * u));
      }
      return (
        (this.ax = (this.u - d) / e),
        (this.ay = this.u * this.r),
        (this.dr = (this.r - p) / e),
        this
      );
    }
  };
ml();
var Iz = [
    "#ffb347",
    "#38c8ff",
    "#ff5ad1",
    "#7dff6a",
    "#ffe14d",
    "#b48cff",
    "#ff6b5a",
    "#4dffd2",
  ],
  T5t = 33,
  ZQ = 3,
  A5t = 40,
  R5t = 140,
  P5t = 40,
  C5t = 280,
  L5t = 46,
  I5t = 250,
  F5t = 8,
  N5t = 4e3,
  B5t = 0.06,
  O5t = 60,
  yl = {
    delay: 25,
    w: 6,
    accel: 0.25,
    maxAge: 700,
    hold: 700,
    maxAgeI: 1500,
    holdI: 1500,
    late0I: 800,
    jitter: !1,
  },
  $a =
    typeof location < "u"
      ? new URLSearchParams(location.search)
      : new URLSearchParams();
$a.has("mpw") && (yl.w = +$a.get("mpw"));
$a.has("mpd") && (yl.delay = +$a.get("mpd"));
$a.has("mpage") && (yl.maxAge = +$a.get("mpage"));
$a.has("mphold") && (yl.hold = +$a.get("mphold"));
$a.has("mpi") && (yl.maxAgeI = yl.holdI = +$a.get("mpi"));
$a.has("mpl") && (yl.late0I = +$a.get("mpl"));
$a.has("mpj") && ((yl.jitter = !0), (yl.jitK = +$a.get("mpj")));
$a.has("mpjm") && (yl.jitMax = +$a.get("mpjm"));
