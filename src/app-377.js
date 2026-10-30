// app 377 — math
// Lines 186081-186280 of readable/app.pretty.js (statement-aligned).
es();
var h6t = 9.81,
  f6t = 60 / (2 * Math.PI),
  $v = (o, t, e) => (o < t ? t : o > e ? e : o),
  u6t = 5e5,
  d6t = 900,
  Unt = (o) => (t) => {
    let e = Math.max(t, 1) / f6t;
    return Math.min(d6t * o, (u6t * o) / e) * $v((13640 - t) / 120, 0, 1);
  },
  Dnt = {
    ...md,
    mass: 2200,
    izz: 4300,
    a: 1.52,
    b: 1.48,
    track: 1.7,
    hcg: 0.58,
    wheelR: 0.4,
    wheelI: 1.6,
    rearI: 1.9,
    ev: !0,
    awd: !0,
    frontShare: 0.4,
    redline: 13650,
    limiter: 13700,
    gears: [1],
    reverse: 1,
    final: 6.8,
    driveEff: 0.92,
    torque: Unt(1),
    regen: 520,
    comfortBrake: 0,
    box: { hx: 0.95, hz: 2.52, off: 0 },
    cdA: 0.72,
    crr: 0.012,
    downforce: 0.1,
    brakeF: 4200,
    brakeR: 3e3,
    handbrake: 3e3,
    espBrake: 3200,
    mu: 1.5,
    rearGrip: 1.06,
    latMu: 1.1,
    latMuR: 1.12,
    steerMax: 0.62,
    steerMaxHigh: 0.1,
    steerRate: 10,
    steerReturn: 12,
    nitroForce: 0,
    nitroMax: 1,
    nitroUse: 0,
    nitroFill: 0,
    rideHz: 1.7,
    rideZeta: 0.75,
    arb: 1.5,
    bump: 0.08,
    ipitch: 4e3,
    iroll: 1200,
    lean: 0.8,
    leanPitch: 1.2,
  },
  dT = [0.85, 0.85, 0.95, 1.05, 1.18, 1.32].map((o, t) => ({
    ...Dnt,
    torque: Unt(o),
    mu: Dnt.mu * (0.96 + 0.025 * t),
    nitroForce: 5e3 + 2200 * t,
    lvl: t,
  })),
  uT = class {
    constructor() {
      ((this.I = 0),
        (this.hbT = 0),
        (this.inp = {
          throttle: 0,
          brake: 0,
          steer: 0,
          handbrake: 0,
          nitro: !1,
          player: !1,
        }),
        (this.k = 0),
        (this.vT = 0));
    }
    control(t, e, s, n, i, a = {}) {
      let r = t.S,
        l = this.inp,
        c = t.forward(),
        h = -Math.cos(t.psi),
        f = Math.sin(t.psi),
        u = t.vel.x * c.x + t.vel.z * c.z,
        d = t.speed,
        p = s - t.pos.x,
        m = n - t.pos.z,
        g = p * c.x + m * c.z,
        b = p * h + m * f;
      if (((l.handbrake = 0), (l.nitro = !1), i < -0.5))
        return (
          (t.holdStop = !1),
          (this.I = 0),
          (l.throttle = 0),
          (l.brake = t.reverse ? $v(0.5 + (-i + u) * 0.25, 0.3, 1) : 1),
          (l.steer = Math.abs(b) < 1 && g > 0 ? 0 : b > 0 ? -1 : 1),
          l
        );
      t.holdStop = !0;
      let v = Math.max(g * g + b * b, 16),
        x = (2 * b) / v;
      (g < 0.5 && (x = (b >= 0 ? 1 : -1) * Math.max(Math.abs(x), 0.22)),
        (this.k = x));
      let y = r.a + r.b,
        M = r.mu * (r.latMu ?? 1) * h6t,
        S = Math.max(Math.abs(u), 3),
        w = Math.min(r.steerMax, Math.atan((y * M * 1.5) / (S * S)));
      l.steer = $v(Math.atan(x * y) / w, -1, 1);
      let _ = g < 0.5 ? x : (2 * b) / Math.max(v, (0.9 * d) ** 2),
        z = a.aLat ?? 11,
        A = Math.sqrt(z / Math.max(Math.abs(_), 1e-4)),
        T = Math.max(0, Math.min(i, Math.max(7, A)));
      this.vT = T;
      let E = T - u;
      T < 0.4 && d < 1.2
        ? ((l.throttle = 0), (l.brake = 1), (this.I = 0))
        : E > -0.8
          ? ((this.I =
              E < 0.3
                ? this.I * Math.exp(-e * 4)
                : Math.abs(E) < 2.5
                  ? $v(this.I + E * e, -3, 4)
                  : this.I),
            (l.throttle = $v(
              0.3 * E + 0.12 * this.I + (T > 2 ? 0.08 : 0),
              0,
              1,
            )),
            (l.brake = 0))
          : ((this.I = Math.min(this.I, 0) * 0.9),
            (l.throttle = 0),
            (l.brake = $v(-0.16 * E - 0.05, 0.05, 1)));
      let R = Math.abs(Math.atan2(b, Math.max(g, -50)));
      return (
        this.hbT > 0
          ? ((this.hbT -= e),
            (l.handbrake = 1),
            (l.brake = 0),
            (l.throttle = Math.max(l.throttle, 0.4)))
          : a.slide !== !1 &&
            R > 1.2 &&
            g > -2 &&
            d > 8 &&
            d < 24 &&
            t.onGround &&
            !(t.impactT > 0) &&
            ((this.hbT = 0.35), (this.slides = (this.slides || 0) + 1)),
        (l.nitro = !!a.push && E > 2 && l.throttle > 0.5),
        l
      );
    }
  };
Pn();
es();
var WB = 50,
  qB = 80,
  p6t = 260,
  pT = 25,
  Zf = (o, t, e) => (o < t ? t : o > e ? e : o),
  Gnt = (o) => Math.atan2(Math.sin(o), Math.cos(o));
function m6t() {
  if (typeof document > "u") return null;
  let o = document.createElement("canvas");
  ((o.width = 512), (o.height = 128));
  let t = o.getContext("2d");
  ((t.fillStyle = "#f4f6f8"),
    t.fillRect(0, 0, 512, 128),
    (t.fillStyle = "#0d1420"),
    (t.font = "900 82px Arial, Helvetica, sans-serif"),
    (t.textAlign = "center"),
    (t.textBaseline = "middle"),
    t.fillText("POLICE", 256, 70),
    (t.fillStyle = "#c9a227"),
    t.fillRect(0, 8, 512, 8),
    t.fillRect(0, 112, 512, 8));
  let e = new Sn(o);
  return ((e.colorSpace = Je), (e.anisotropy = 4), e);
}
function g6t() {
  if (typeof document > "u") return null;
  let o = document.createElement("canvas");
  o.width = o.height = 128;
  let t = o.getContext("2d"),
    e = t.createRadialGradient(64, 64, 0, 64, 64, 64);
  return (
    e.addColorStop(0, "rgba(255,250,235,1)"),
    e.addColorStop(0.45, "rgba(255,246,225,.55)"),
    e.addColorStop(1, "rgba(255,240,220,0)"),
    (t.fillStyle = e),
    t.fillRect(0, 0, 128, 128),
    new Sn(o)
  );
}
