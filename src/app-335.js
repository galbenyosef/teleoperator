// app 335 — math
// Lines 162934-163260 of readable/app.pretty.js (statement-aligned).
var U3t = [1, 1.07, 1.15, 1.24, 1.34],
  TQ = [0, 0.06, 0.12, 0.19],
  G3t = [1, 1.02, 1.04, 1.06],
  W3t = [1, 0.75, 0.6, 0.5],
  q3t = [1, 1.08, 1.16, 1.25],
  AQ = [1, 0.8, 0.62, 0.5],
  j3t = [1, 0.95, 0.9, 0.85],
  V3t = [1, 0.97, 0.94, 0.9],
  $3t = [1, 1.12, 1.24, 1.36],
  X3t = [1, 1.02, 1.04, 1.06],
  IQ = [
    { hz: 1, arb: 1, dh: 0, lat: 1, lean: 1 },
    { hz: 1.06, arb: 1.1, dh: -0.015, lat: 1.015, lean: 0.92 },
    { hz: 1.12, arb: 1.22, dh: -0.03, lat: 1.03, lean: 0.85 },
    { hz: 1.2, arb: 1.35, dh: -0.045, lat: 1.045, lean: 0.78 },
  ],
  K3t = [
    { f: 1, r: 1 },
    { f: 1.5, r: 2.2 },
    { f: 2, r: 4.5 },
  ],
  Y3t = [
    { d: 1, cd: 1 },
    { d: 1.25, cd: 1.01 },
    { d: 1.7, cd: 1.04 },
    { d: 2.3, cd: 1.08 },
  ],
  J3t = 0.3,
  Z3t = [
    { mu: 1, lat: 1, latR: 1, drift: 1, crr: 1, surf: 1 },
    { mu: 0.96, lat: 1, latR: 1, drift: 1, crr: 0.9, surf: 1 },
    { mu: 1.04, lat: 1, latR: 1, drift: 1, crr: 1.03, surf: 1.05 },
    { mu: 1.09, lat: 1.01, latR: 1.01, drift: 1, crr: 1.08, surf: 1.2 },
    { mu: 1, lat: 0.98, latR: 0.9, drift: 0.85, crr: 1, surf: 1 },
    { mu: 0.94, lat: 1, latR: 1, drift: 1, crr: 1.12, surf: 0.35 },
  ],
  Q3t = [
    { mu: 1, crr: 1, cd: 1 },
    { mu: 1.02, crr: 1.04, cd: 1.005 },
    { mu: 1.04, crr: 1.08, cd: 1.01 },
  ];
function gF(i, t) {
  let e = Uo(t);
  if (!D3t(e)) return i;
  let s = { ...i },
    n = (q) => Va(e, q),
    o = (q) => e.t?.[q] || 0,
    a = !!i.ev,
    r =
      U3t[n("engine")] *
      (a ? 1 + TQ[n("turbo")] : 1) *
      (a ? 1 : G3t[n("exhaust")]),
    l = a ? 0 : TQ[n("turbo")];
  if (r !== 1 || l) {
    let q = i.torque || Tx,
      W = Pn(i.redline * 0.32, 1800, 3200);
    s.torque = (V) => q(V) * r * (1 + l * O3t((V - W) / 1800));
  }
  if (a && (n("engine") || n("turbo"))) {
    let q = 1 + 0.04 * n("engine") + 0.03 * n("turbo"),
      W = s.torque || i.torque || Tx;
    ((s.torque = (V) => W(V / q)),
      (s.redline = i.redline * q),
      (s.limiter = i.limiter * q));
  }
  let c = n("trans");
  (a
    ? (s.final = i.final * j3t[c])
    : ((s.shiftUp = i.shiftUp * AQ[c]),
      (s.shiftDown = i.shiftDown * AQ[c]),
      (s.cutFloor = Math.min(0.5, i.cutFloor + 0.08 * c)),
      r * (1 + l) > 1 &&
        (s.final = i.final * Math.max(0.92, 1 - 0.12 * (r * (1 + l) - 1)))),
    o("fd") && (s.final = s.final * (1 + Pn(o("fd"), -12, 12) / 100)),
    !a &&
      i.nitroForce &&
      ((s.nitroUse = i.nitroUse * W3t[n("nitro")]),
      (s.nitroForce = i.nitroForce * q3t[n("nitro")])));
  let h = V3t[n("weight")];
  ((s.mass = i.mass * h),
    (s.izz = i.izz * h),
    (s.ipitch = i.ipitch * h),
    (s.iroll = i.iroll * h));
  let f = $3t[n("brakes")] * (1 + Pn(o("bp"), -20, 20) / 100),
    u = i.brakeF / (i.brakeF + i.brakeR),
    d = Pn(u + Pn(o("bb"), -10, 10) / 100, 0.4, 0.8),
    p = (i.brakeF + i.brakeR) * f;
  ((s.brakeF = p * d),
    (s.brakeR = p * (1 - d)),
    n("brakes") && (s.brakeMu = X3t[n("brakes")]));
  let m = IQ[n("susp")],
    g = 1 + Pn(o("sf"), -25, 35) / 100,
    b = 1 + Pn(o("sr"), -25, 35) / 100;
  ((s.rideHzF = i.rideHz * m.hz * g),
    (s.rideHzR = i.rideHz * m.hz * b),
    (s.rideHz = (s.rideHzF + s.rideHzR) / 2),
    (s.rideZeta = Pn(
      i.rideZeta * (1 + Pn(o("dp"), -25, 35) / 100),
      0.45,
      1.1,
    )));
  let x = i.arb * m.arb * (1 + Pn(o("af"), -50, 100) / 100),
    v = i.arb * m.arb * (1 + Pn(o("ar"), -50, 100) / 100);
  ((s.arbF = x), (s.arbR = v));
  let y = m.dh + Pn(o("rh"), -5, 3) / 100;
  ((s.lean =
    i.lean * m.lean * Pn(2 / (x / i.arb + v / i.arb), 0.6, 1.3) ** 0.5),
    (s.leanPitch = i.leanPitch * m.lean));
  let M = g * (1 + x / i.arb),
    S = b * (1 + v / i.arb),
    w = Pn((M - S) / (M + S), -0.3, 0.3),
    z = Z3t[n("tyre")],
    _ = Q3t[n("width")],
    R = Pn(o("pf"), -0.4, 0.4),
    T = Pn(o("pr"), -0.4, 0.4),
    E = Pn(o("cf"), -2.5, 1),
    A = Pn(o("cr"), -2.5, 1),
    C = Pn(o("tf"), -0.5, 0.5),
    P = Pn(o("tr"), -0.5, 0.5),
    I = (q) =>
      1 +
      0.025 * Math.min(-q, 1.8) * (q < 0 ? 1 : 0) -
      0.03 * Math.max(0, q) -
      0.02 * Math.max(0, -q - 1.8),
    L = (q) => 1 - 0.012 * Math.abs(q),
    F = (q) => 1 - 0.05 * q - 0.06 * q * q,
    N = L(E) * F(R),
    B = L(A) * F(T);
  ((s.mu = i.mu * z.mu * _.mu * N),
    (s.rearGrip = (i.rearGrip * B) / N),
    (s.latMu =
      (((i.latMu ?? 1) * z.lat * m.lat * I(E) * F(R)) / N) *
      (1 - (0.04 * w) / 0.3) *
      (1 + (0.006 * C) / 0.5)),
    (s.latMuR =
      (((i.latMuR ?? i.latMu ?? 1) * z.latR * m.lat * I(A) * F(T)) / B) *
      (1 + (0.04 * w) / 0.3) *
      (1 - (0.008 * P) / 0.5)),
    (s.muRearDrift = i.muRearDrift * z.drift * (n("diff") === 2 ? 0.92 : 1)),
    z.surf !== 1 && (s.surfK = z.surf),
    (s.steerRate =
      i.steerRate *
      Pn(1 + (0.12 * C) / 0.5 + (0.06 * (R + T)) / 0.8, 0.85, 1.15)),
    (s.crr =
      i.crr *
      z.crr *
      _.crr *
      (1 - (0.2 * (R + T)) / 0.8) *
      (1 + 0.04 * (Math.abs(C) + Math.abs(P)))));
  let H = K3t[n("diff")],
    O = 1 + Pn(o("dl"), -50, 150) / 100;
  ((s.lsdF = 10 * H.f * O),
    (s.lsdFT = 300 * H.f),
    (s.lsd = 25 * H.r * O),
    (s.lsdT = 500 * H.r));
  let D = Y3t[n("aero")],
    U = 1 + Pn(o("dn"), -40, 40) / 100;
  (n("aero") &&
    (s.downforce = Math.max(i.downforce, n("aero") > 1 ? J3t : 0) * D.d * U),
    y && (s.downforce = s.downforce * Pn(1 - y * 4, 0.85, 1.35)),
    (s.cdA = i.cdA * D.cd * _.cd * (1 + 0.15 * (U - 1) * (n("aero") ? 1 : 0))));
  let G = Pn(0.45 + Pn(o("db"), -10, 10) / 100, 0.3, 0.6);
  return ((s.downF = G), (s.downR = 1 - G), s);
}
function sM(i) {
  let t = Uo(i),
    e = IQ[Va(t, "susp")];
  return {
    dh: Pn(e.dh + (t?.t?.rh || 0) / 100, -0.08, 0.03),
    camF: -(t?.t?.cf || 0),
    camR: -(t?.t?.cr || 0),
    wing: Va(t, "aero"),
    width: Va(t, "width"),
    rim: t?.w?.s || 0,
    size: t?.w?.z || 0,
    side: t?.w?.d || 0,
  };
}
var FQ = [
    { vol: 1, pitch: 1, pops: 1 },
    { vol: 1.18, pitch: 0.97, pops: 1.3 },
    { vol: 1.38, pitch: 0.95, pops: 1.8 },
    { vol: 1.6, pitch: 0.93, pops: 2.6 },
  ],
  NQ = "0123456789abcdefghijklmnopqrstuvwxyz";
function BQ(i, t = -1) {
  let e = sM(i),
    s = (o, a) => NQ[Pn(Math.round(o), 0, 35)] ?? "0",
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
function bF(i) {
  if (typeof i != "string" || !/^[0-9a-z]{9}$/.test(i)) return null;
  let t = (e) => NQ.indexOf(i[e]);
  return {
    rim: Pn(t(0), 0, Mr.length - 1),
    size: Pn(t(1) - 1, -1, 3),
    side: Pn(t(2), 0, Gm.length - 1),
    dh: Pn((t(3) - 8) / 100, -0.08, 0.03),
    camF: Pn((t(4) - 10) / 4, -1, 2.5),
    camR: Pn((t(5) - 10) / 4, -1, 2.5),
    wing: Pn(t(6), 0, 3),
    width: Pn(t(7), 0, 2),
    cls: t(8) - 1,
  };
}
var bz = {
  heightAt: (i, t, e) => (e && ((e.dx = 0), (e.dz = 0)), 0),
  muAt: () => 1,
};
function t5t(i) {
  let t = i.torque || Tx,
    e = 0,
    s = 0;
  for (let n = Math.max(i.idle, 500); n <= i.limiter; n += 50) {
    let o = t(n);
    ((s = Math.max(s, o)), (e = Math.max(e, (o * n) / H3t)));
  }
  return { kw: e / 1e3, hp: e / 745.7, nm: s };
}
function e5t(i) {
  let t = (d = 0) => {
      let p = new Ax(i);
      return (p.place(0, 0, 0), (p.pos.y = 0), (p.vel.z = -d / 3.6), p);
    },
    e = { throttle: 1, brake: 0, steer: 0, player: !0 },
    s = t(),
    n = 0,
    o = 0,
    a = 1 / 120;
  for (; n < 20 && !o;) (s.step(a, e, bz), (n += a), s.kmh >= 100 && (o = n));
  a = 1 / 60;
  let r = s.kmh,
    l = n;
  for (; n < 140;)
    if ((s.step(a, e, bz), (n += a), n - l >= 2)) {
      if (s.kmh - r < 0.25) break;
      ((r = s.kmh), (l = n));
    }
  let c = s.kmh;
  s = t(100);
  let h = 0;
  for (let d = 0; d < 1200 && s.speed > 0.3; d++)
    (s.step(1 / 120, { throttle: 0, brake: 1, steer: 0, player: !0 }, bz),
      (h += s.speed / 120));
  s = t(90);
  let f = 0,
    u = 0;
  for (let d = 0; d < 480; d++) {
    let p = s.kmh;
    (s.step(
      1 / 120,
      {
        throttle: Pn((90 - p) * 0.25 + 0.3, 0, 1),
        brake: p > 96 ? 0.2 : 0,
        steer: 0.75,
        player: !0,
      },
      bz,
    ),
      d >= 300 && ((f += Math.abs(s.ay)), u++));
  }
  return {
    t100: o,
    top: c,
    brake: h,
    g: f / u / 9.81,
    ...t5t(i),
    kg: i.mass,
    nos: i.nitroForce && i.nitroUse ? (i.nitroMax ?? 1) / i.nitroUse : 0,
  };
}
var Wx = [
  ["D", 500, "#3fb4ff"],
  ["C", 600, "#f4d03f"],
  ["B", 700, "#ff9933"],
  ["A", 800, "#ff4d4d"],
  ["S1", 900, "#b36bff"],
  ["S2", 998, "#4d7dff"],
  ["X", 999, "#4cff9a"],
];
function s5t(i) {
  let t = Pn(1e3 - (i.t100 - 2) * 170, 100, 1100),
    e = Pn(300 + (i.top - 180) * 3.6, 100, 1100),
    s = Pn(250 + (i.g - 0.75) * 900, 100, 1100),
    n = Pn(250 + (42 - i.brake) * 45, 100, 1100),
    o = Math.round(Pn(0.38 * t + 0.2 * e + 0.27 * s + 0.15 * n, 100, 999)),
    a = Wx.findIndex((r) => o <= r[1]);
  return {
    pi: o,
    cls: Wx[a][0],
    col: Wx[a][2],
    k: a,
    parts: { acc: t, top: e, hand: s, brk: n },
  };
}
function n5t(i) {
  return {
    speed: Pn((i.top - 100) / 30, 0, 10),
    accel: Pn((7 - i.t100) / 0.5, 0, 10),
    handling: Pn((i.g - 0.8) / 0.1, 0, 10),
    braking: Pn((40 - i.brake) / 1.8, 0, 10),
  };
}
var xz = new Map();
function ic(i, t, e = "") {
  let s = e + "|" + JSON.stringify(Uo(t) ? { p: Uo(t).p, t: Uo(t).t } : null),
    n = xz.get(s);
  if (n) return n;
  let o = e5t(gF(i, t));
  return (
    (n = { ...o, ...s5t(o), bars: n5t(o) }),
    xz.size > 200 && xz.clear(),
    xz.set(s, n),
    n
  );
}
wm();
