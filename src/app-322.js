// app 322 — math
// Lines 153504-153612 of readable/app.pretty.js (statement-aligned).
function nMt(o) {
  let t = o / 1e3,
    e =
      t < 1.5
        ? 380
        : t < 3
          ? 380 + 340 * net((t - 1.5) / 1.5)
          : t < 6.8
            ? 720
            : 720 - 55 * (t - 6.8) * (t - 6.8),
    s = Math.max(o, 400) / yv,
    n = Math.min(260, sMt / s);
  return e + n;
}
var oet = {
    ..._c,
    box: { hx: 0.97, hz: 2.26, off: 0.125 },
    mass: 1520,
    izz: 2050,
    a: 1.47,
    b: 1.18,
    track: 1.64,
    hcg: 0.41,
    wheelR: 0.33,
    wheelI: 1.15,
    rearI: 1.7,
    idle: 950,
    redline: 9e3,
    limiter: 9200,
    upshift: 8600,
    upshift1: 7400,
    launchRpm: 5e3,
    launchSlip: 0.085,
    gears: [3.2, 2.2, 1.68, 1.33, 1.08, 0.9, 0.76, 0.64],
    reverse: 2.9,
    final: 3.9,
    driveEff: 0.88,
    torque: nMt,
    engineI: 0.18,
    muDrive: 0.98,
    cdA: 1.25,
    crr: 0.012,
    downforce: 0.55,
    brakeF: 3e3,
    brakeR: 1650,
    handbrake: 2600,
    espBrake: 2500,
    mu: 1.5,
    rearGrip: 1.12,
    latMu: 1.08,
    latMuR: 1.12,
    nitroForce: 0,
    nitroMax: 0,
    nitroFill: 0,
    rideHz: 2.2,
    ipitch: 1950,
    iroll: 560,
    lean: 0.75,
    leanPitch: 1.3,
    comfortBrake: 5,
  },
  yv = 60 / (2 * Math.PI),
  aE = (o, t, e) => (o < t ? t : o > e ? e : o),
  iMt = [
    [-1.5, 1 / 16],
    [-1, 2 / 16],
    [-0.5, 3 / 16],
    [0, 4 / 16],
    [0.5, 3 / 16],
    [1, 2 / 16],
    [1.5, 1 / 16],
  ],
  PO = 0.5,
  Qtt = 0.85,
  IO = Object.freeze({ tcs: !0, esp: !0, steering: !0, abs: !0 });
function LO(o, t = 13, e = 1.45, s = 0.2) {
  let n = t * o;
  return Math.sin(e * Math.atan(n - s * (n - Math.atan(n))));
}
var oMt = (o) => LO(o, 12, 1.6, 0.3),
  is = (o, t, e) => (o < t ? t : o > e ? e : o),
  xr = (o, t, e) => o + (t - o) * e,
  w2 = (o) => ((o = is(o, 0, 1)), o * o * (3 - 2 * o)),
  zc = 1.2,
  Uf = 0.5;
function CO(o, t, e) {
  let s = (zc * Math.PI) / 2,
    n = s + (t - zc - Uf),
    i = n + (Uf * Math.PI) / 2;
  if (o <= 0) ((e[0] = zc - o), (e[1] = 0));
  else if (o < s) {
    let a = o / zc;
    ((e[0] = zc - zc * Math.sin(a)), (e[1] = zc - zc * Math.cos(a)));
  } else if (o < n) ((e[0] = 0), (e[1] = zc + o - s));
  else if (o < i) {
    let a = (o - n) / Uf;
    ((e[0] = -Uf + Uf * Math.cos(a)), (e[1] = t - Uf + Uf * Math.sin(a)));
  } else ((e[0] = -Uf - (o - i)), (e[1] = t));
  return e;
}
var tet = (o) => (zc * Math.PI) / 2 + (o - zc - Uf) + (Uf * Math.PI) / 2;
function xv(o) {
  let t = o / 1e3;
  return t < 1
    ? 300
    : t < 6
      ? 300 + 240 * Math.sin((((t - 1) / 5) * Math.PI) / 2)
      : 540 - ((20 * (t - 6) * (t - 6)) / 3) * 1;
}
