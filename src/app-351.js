// app 351 — math
// Lines 169229-169555 of readable/app.pretty.js (statement-aligned).
var x4t = [1, 1.07, 1.15, 1.24, 1.34],
  Est = [0, 0.06, 0.12, 0.19],
  v4t = [1, 1.02, 1.04, 1.06],
  y4t = [1, 0.75, 0.6, 0.5],
  w4t = [1, 1.08, 1.16, 1.25],
  Tst = [1, 0.8, 0.62, 0.5],
  M4t = [1, 0.95, 0.9, 0.85],
  S4t = [1, 0.97, 0.94, 0.9],
  k4t = [1, 1.12, 1.24, 1.36],
  z4t = [1, 1.02, 1.04, 1.06],
  Lst = [
    { hz: 1, arb: 1, dh: 0, lat: 1, lean: 1 },
    { hz: 1.06, arb: 1.1, dh: -0.015, lat: 1.015, lean: 0.92 },
    { hz: 1.12, arb: 1.22, dh: -0.03, lat: 1.03, lean: 0.85 },
    { hz: 1.2, arb: 1.35, dh: -0.045, lat: 1.045, lean: 0.78 },
  ],
  _4t = [
    { f: 1, r: 1 },
    { f: 1.5, r: 2.2 },
    { f: 2, r: 4.5 },
  ],
  E4t = [
    { d: 1, cd: 1 },
    { d: 1.25, cd: 1.01 },
    { d: 1.7, cd: 1.04 },
    { d: 2.3, cd: 1.08 },
  ],
  T4t = 0.3,
  R4t = [
    { mu: 1, lat: 1, latR: 1, drift: 1, crr: 1, surf: 1 },
    { mu: 0.96, lat: 1, latR: 1, drift: 1, crr: 0.9, surf: 1 },
    { mu: 1.04, lat: 1, latR: 1, drift: 1, crr: 1.03, surf: 1.05 },
    { mu: 1.09, lat: 1.01, latR: 1.01, drift: 1, crr: 1.08, surf: 1.2 },
    { mu: 1, lat: 0.98, latR: 0.9, drift: 0.85, crr: 1, surf: 1 },
    { mu: 0.94, lat: 1, latR: 1, drift: 1, crr: 1.12, surf: 0.35 },
  ],
  A4t = [
    { mu: 1, crr: 1, cd: 1 },
    { mu: 1.02, crr: 1.04, cd: 1.005 },
    { mu: 1.04, crr: 1.08, cd: 1.01 },
  ];
function dB(o, t) {
  let e = Jo(t);
  if (!b4t(e)) return o;
  let s = { ...o },
    n = (W) => lr(e, W),
    i = (W) => e.t?.[W] || 0,
    a = !!o.ev,
    r =
      x4t[n("engine")] *
      (a ? 1 + Est[n("turbo")] : 1) *
      (a ? 1 : v4t[n("exhaust")]),
    l = a ? 0 : Est[n("turbo")];
  if (r !== 1 || l) {
    let W = o.torque || xv,
      V = Fn(o.redline * 0.32, 1800, 3200);
    s.torque = ($) => W($) * r * (1 + l * m4t(($ - V) / 1800));
  }
  if (a && (n("engine") || n("turbo"))) {
    let W = 1 + 0.04 * n("engine") + 0.03 * n("turbo"),
      V = s.torque || o.torque || xv;
    ((s.torque = ($) => V($ / W)),
      (s.redline = o.redline * W),
      (s.limiter = o.limiter * W));
  }
  let c = n("trans");
  (a
    ? (s.final = o.final * M4t[c])
    : ((s.shiftUp = o.shiftUp * Tst[c]),
      (s.shiftDown = o.shiftDown * Tst[c]),
      (s.cutFloor = Math.min(0.5, o.cutFloor + 0.08 * c)),
      r * (1 + l) > 1 &&
        (s.final = o.final * Math.max(0.92, 1 - 0.12 * (r * (1 + l) - 1)))),
    i("fd") && (s.final = s.final * (1 + Fn(i("fd"), -12, 12) / 100)),
    !a &&
      o.nitroForce &&
      ((s.nitroUse = o.nitroUse * y4t[n("nitro")]),
      (s.nitroForce = o.nitroForce * w4t[n("nitro")])));
  let h = S4t[n("weight")];
  ((s.mass = o.mass * h),
    (s.izz = o.izz * h),
    (s.ipitch = o.ipitch * h),
    (s.iroll = o.iroll * h));
  let f = k4t[n("brakes")] * (1 + Fn(i("bp"), -20, 20) / 100),
    u = o.brakeF / (o.brakeF + o.brakeR),
    d = Fn(u + Fn(i("bb"), -10, 10) / 100, 0.4, 0.8),
    p = (o.brakeF + o.brakeR) * f;
  ((s.brakeF = p * d),
    (s.brakeR = p * (1 - d)),
    n("brakes") && (s.brakeMu = z4t[n("brakes")]));
  let m = Lst[n("susp")],
    g = 1 + Fn(i("sf"), -25, 35) / 100,
    b = 1 + Fn(i("sr"), -25, 35) / 100;
  ((s.rideHzF = o.rideHz * m.hz * g),
    (s.rideHzR = o.rideHz * m.hz * b),
    (s.rideHz = (s.rideHzF + s.rideHzR) / 2),
    (s.rideZeta = Fn(
      o.rideZeta * (1 + Fn(i("dp"), -25, 35) / 100),
      0.45,
      1.1,
    )));
  let v = o.arb * m.arb * (1 + Fn(i("af"), -50, 100) / 100),
    x = o.arb * m.arb * (1 + Fn(i("ar"), -50, 100) / 100);
  ((s.arbF = v), (s.arbR = x));
  let y = m.dh + Fn(i("rh"), -5, 3) / 100;
  ((s.lean =
    o.lean * m.lean * Fn(2 / (v / o.arb + x / o.arb), 0.6, 1.3) ** 0.5),
    (s.leanPitch = o.leanPitch * m.lean));
  let M = g * (1 + v / o.arb),
    S = b * (1 + x / o.arb),
    w = Fn((M - S) / (M + S), -0.3, 0.3),
    _ = R4t[n("tyre")],
    z = A4t[n("width")],
    A = Fn(i("pf"), -0.4, 0.4),
    T = Fn(i("pr"), -0.4, 0.4),
    E = Fn(i("cf"), -2.5, 1),
    R = Fn(i("cr"), -2.5, 1),
    P = Fn(i("tf"), -0.5, 0.5),
    C = Fn(i("tr"), -0.5, 0.5),
    I = (W) =>
      1 +
      0.025 * Math.min(-W, 1.8) * (W < 0 ? 1 : 0) -
      0.03 * Math.max(0, W) -
      0.02 * Math.max(0, -W - 1.8),
    L = (W) => 1 - 0.012 * Math.abs(W),
    F = (W) => 1 - 0.05 * W - 0.06 * W * W,
    O = L(E) * F(A),
    B = L(R) * F(T);
  ((s.mu = o.mu * _.mu * z.mu * O),
    (s.rearGrip = (o.rearGrip * B) / O),
    (s.latMu =
      (((o.latMu ?? 1) * _.lat * m.lat * I(E) * F(A)) / O) *
      (1 - (0.04 * w) / 0.3) *
      (1 + (0.006 * P) / 0.5)),
    (s.latMuR =
      (((o.latMuR ?? o.latMu ?? 1) * _.latR * m.lat * I(R) * F(T)) / B) *
      (1 + (0.04 * w) / 0.3) *
      (1 - (0.008 * C) / 0.5)),
    (s.muRearDrift = o.muRearDrift * _.drift * (n("diff") === 2 ? 0.92 : 1)),
    _.surf !== 1 && (s.surfK = _.surf),
    (s.steerRate =
      o.steerRate *
      Fn(1 + (0.12 * P) / 0.5 + (0.06 * (A + T)) / 0.8, 0.85, 1.15)),
    (s.crr =
      o.crr *
      _.crr *
      z.crr *
      (1 - (0.2 * (A + T)) / 0.8) *
      (1 + 0.04 * (Math.abs(P) + Math.abs(C)))));
  let H = _4t[n("diff")],
    N = 1 + Fn(i("dl"), -50, 150) / 100;
  ((s.lsdF = 10 * H.f * N),
    (s.lsdFT = 300 * H.f),
    (s.lsd = 25 * H.r * N),
    (s.lsdT = 500 * H.r));
  let D = E4t[n("aero")],
    U = 1 + Fn(i("dn"), -40, 40) / 100;
  (n("aero") &&
    (s.downforce = Math.max(o.downforce, n("aero") > 1 ? T4t : 0) * D.d * U),
    y && (s.downforce = s.downforce * Fn(1 - y * 4, 0.85, 1.35)),
    (s.cdA = o.cdA * D.cd * z.cd * (1 + 0.15 * (U - 1) * (n("aero") ? 1 : 0))));
  let G = Fn(0.45 + Fn(i("db"), -10, 10) / 100, 0.3, 0.6);
  return ((s.downF = G), (s.downR = 1 - G), s);
}
function n4(o) {
  let t = Jo(o),
    e = Lst[lr(t, "susp")];
  return {
    dh: Fn(e.dh + (t?.t?.rh || 0) / 100, -0.08, 0.03),
    camF: -(t?.t?.cf || 0),
    camR: -(t?.t?.cr || 0),
    wing: lr(t, "aero"),
    width: lr(t, "width"),
    rim: t?.w?.s || 0,
    size: t?.w?.z || 0,
    side: t?.w?.d || 0,
  };
}
var Ist = [
    { vol: 1, pitch: 1, pops: 1 },
    { vol: 1.18, pitch: 0.97, pops: 1.3 },
    { vol: 1.38, pitch: 0.95, pops: 1.8 },
    { vol: 1.6, pitch: 0.93, pops: 2.6 },
  ],
  Fst = "0123456789abcdefghijklmnopqrstuvwxyz";
function Ost(o, t = -1) {
  let e = n4(o),
    s = (i, a) => Fst[Fn(Math.round(i), 0, 35)] ?? "0",
    n =
      s(e.rim) +
      s(e.size + 1) +
      s(e.side) +
      s(e.dh * 100 + 8) +
      s(e.camF * 4 + 10) +
      s(e.camR * 4 + 10) +
      s(e.wing) +
      s(e.width) +
      s(t + 1);
  return t < 0 && n.slice(0, 8) === "0108aa00" ? "" : n;
}
function pB(o) {
  if (typeof o != "string" || !/^[0-9a-z]{9}$/.test(o)) return null;
  let t = (e) => Fst.indexOf(o[e]);
  return {
    rim: Fn(t(0), 0, Hr.length - 1),
    size: Fn(t(1) - 1, -1, 3),
    side: Fn(t(2), 0, C2.length - 1),
    dh: Fn((t(3) - 8) / 100, -0.08, 0.03),
    camF: Fn((t(4) - 10) / 4, -1, 2.5),
    camR: Fn((t(5) - 10) / 4, -1, 2.5),
    wing: Fn(t(6), 0, 3),
    width: Fn(t(7), 0, 2),
    cls: t(8) - 1,
  };
}
var IE = {
  heightAt: (o, t, e) => (e && ((e.dx = 0), (e.dz = 0)), 0),
  muAt: () => 1,
};
function P4t(o) {
  let t = o.torque || xv,
    e = 0,
    s = 0;
  for (let n = Math.max(o.idle, 500); n <= o.limiter; n += 50) {
    let i = t(n);
    ((s = Math.max(s, i)), (e = Math.max(e, (i * n) / g4t)));
  }
  return { kw: e / 1e3, hp: e / 745.7, nm: s };
}
function C4t(o) {
  let t = (d = 0) => {
      let p = new n1(o);
      return (p.place(0, 0, 0), (p.pos.y = 0), (p.vel.z = -d / 3.6), p);
    },
    e = { throttle: 1, brake: 0, steer: 0, player: !0 },
    s = t(),
    n = 0,
    i = 0,
    a = 1 / 120;
  for (; n < 20 && !i;) (s.step(a, e, IE), (n += a), s.kmh >= 100 && (i = n));
  a = 1 / 60;
  let r = s.kmh,
    l = n;
  for (; n < 140;)
    if ((s.step(a, e, IE), (n += a), n - l >= 2)) {
      if (s.kmh - r < 0.25) break;
      ((r = s.kmh), (l = n));
    }
  let c = s.kmh;
  s = t(100);
  let h = 0;
  for (let d = 0; d < 1200 && s.speed > 0.3; d++)
    (s.step(1 / 120, { throttle: 0, brake: 1, steer: 0, player: !0 }, IE),
      (h += s.speed / 120));
  s = t(90);
  let f = 0,
    u = 0;
  for (let d = 0; d < 480; d++) {
    let p = s.kmh;
    (s.step(
      1 / 120,
      {
        throttle: Fn((90 - p) * 0.25 + 0.3, 0, 1),
        brake: p > 96 ? 0.2 : 0,
        steer: 0.75,
        player: !0,
      },
      IE,
    ),
      d >= 300 && ((f += Math.abs(s.ay)), u++));
  }
  return {
    t100: i,
    top: c,
    brake: h,
    g: f / u / 9.81,
    ...P4t(o),
    kg: o.mass,
    nos: o.nitroForce && o.nitroUse ? (o.nitroMax ?? 1) / o.nitroUse : 0,
  };
}
var Lv = [
  ["D", 500, "#3fb4ff"],
  ["C", 600, "#f4d03f"],
  ["B", 700, "#ff9933"],
  ["A", 800, "#ff4d4d"],
  ["S1", 900, "#b36bff"],
  ["S2", 998, "#4d7dff"],
  ["X", 999, "#4cff9a"],
];
function L4t(o) {
  let t = Fn(1e3 - (o.t100 - 2) * 170, 100, 1100),
    e = Fn(300 + (o.top - 180) * 3.6, 100, 1100),
    s = Fn(250 + (o.g - 0.75) * 900, 100, 1100),
    n = Fn(250 + (42 - o.brake) * 45, 100, 1100),
    i = Math.round(Fn(0.38 * t + 0.2 * e + 0.27 * s + 0.15 * n, 100, 999)),
    a = Lv.findIndex((r) => i <= r[1]);
  return {
    pi: i,
    cls: Lv[a][0],
    col: Lv[a][2],
    k: a,
    parts: { acc: t, top: e, hand: s, brk: n },
  };
}
function I4t(o) {
  return {
    speed: Fn((o.top - 100) / 30, 0, 10),
    accel: Fn((7 - o.t100) / 0.5, 0, 10),
    handling: Fn((o.g - 0.8) / 0.1, 0, 10),
    braking: Fn((40 - o.brake) / 1.8, 0, 10),
  };
}
var FE = new Map();
function Pc(o, t, e = "") {
  let s = e + "|" + JSON.stringify(Jo(t) ? { p: Jo(t).p, t: Jo(t).t } : null),
    n = FE.get(s);
  if (n) return n;
  let i = C4t(dB(o, t));
  return (
    (n = { ...i, ...L4t(i), bars: I4t(i) }),
    FE.size > 200 && FE.clear(),
    FE.set(s, n),
    n
  );
}
h2();
