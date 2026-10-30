// app 424 — math
// Lines 206138-206484 of readable/app.pretty.js (statement-aligned).
var ca = {
  golden: {
    shafts: 0.35,
    shaftC: [1, 0.72, 0.42],
    skyFloor: 0.3,
    name: "Golden hour",
    cumulus: 0.35,
    cloudK: 0.65,
    streaks: 0.5,
    glow: 0.6,
    flare: 0.6,
    sunEl: 11,
    sunAz: 252,
    sun: [1, 0.56, 0.28],
    sunI: 4.4,
    zen: [0.045, 0.125, 0.35],
    hor: [0.8, 0.58, 0.42],
    fog: [0.75, 0.6, 0.5],
    fogD: 6e-4,
    ground: [0.1, 0.085, 0.078],
    exposure: 1.24,
    haze: 0.2,
    night: 0,
    env: 0.95,
    fall: 1 / 260,
    aerial: 1400,
    bloom: 0.2,
    bloomK: 2.3,
    grade: {
      saturation: 0.14,
      vibrance: 0.34,
      contrast: 0.07,
      curve: 0.3,
      mids: 0.24,
      warmth: 0.03,
      lift: 0,
      shadows: [-0.014, 0.004, 0.02],
      highlights: [0.035, 0.012, -0.015],
    },
  },
  noon: {
    skyFloor: 0.42,
    name: "Sunny afternoon",
    sunEl: 23,
    sunAz: 240,
    cumulus: 0.6,
    streaks: 0.35,
    cloudScale: 0.8,
    sun: [1, 0.88, 0.72],
    sunI: 4.6,
    zen: [0.035, 0.13, 0.55],
    hor: [0.42, 0.56, 0.76],
    fog: [0.62, 0.66, 0.72],
    fogD: 4e-4,
    fogLin: 7e-4,
    ground: [0.12, 0.12, 0.12],
    exposure: 0.99,
    haze: 0.1,
    night: 0,
    patches: 0.25,
    glow: 0.6,
    env: 1,
    fall: 1 / 320,
    aerial: 1700,
    bloom: 0.2,
    bloomK: 2.3,
    flare: 1,
    grade: {
      saturation: 0.1,
      vibrance: 0.36,
      contrast: 0.09,
      curve: 0.26,
      mids: 0.3,
      warmth: 0.025,
      lift: -0.01,
      shadows: [-0.006, 0, 0.012],
      highlights: [0.014, 0.008, -0.006],
    },
  },
  fog: {
    skyFloor: 0.2,
    name: "Karl the Fog",
    sunEl: 30,
    sunAz: 225,
    sun: [0.9, 0.92, 0.95],
    sunI: 0.6,
    zen: [0.72, 0.74, 0.77],
    hor: [0.92, 0.935, 0.95],
    fog: [0.85, 0.86, 0.875],
    fogD: 0.0095,
    fogLin: 0.003,
    streaks: 2,
    shafts: 0.5,
    shaftC: [1, 0.97, 0.9],
    ground: [0.17, 0.17, 0.17],
    exposure: 1.1,
    haze: 1,
    night: 0,
    damp: 0.4,
    env: 0.6,
    fall: 1 / 170,
    bank: 1,
    aerial: 900,
    bloom: 0.12,
    bloomK: 1.7,
    grade: {
      saturation: -0.12,
      vibrance: 0.06,
      contrast: 0,
      curve: 0.22,
      warmth: -0.004,
      lift: -0.012,
      shadows: [-0.01, 0, 0.016],
      highlights: [0.006, 0.004, 0],
    },
  },
  dusk: {
    skyFloor: 0.36,
    name: "Blue hour",
    sunEl: -4,
    sunAz: 262,
    sun: [1, 0.5, 0.3],
    sunI: 0.1,
    zen: [0.008, 0.02, 0.075],
    hor: [0.05, 0.075, 0.14],
    twi: [0.5, 0.22, 0.1],
    twiPink: 0.4,
    twiHi: 3.5,
    twiEnv: 0.3,
    lp: [0.07, 0.04, 0.02],
    fog: [0.06, 0.058, 0.075],
    fogD: 8e-4,
    ground: [0.02, 0.02, 0.026],
    exposure: 2.9,
    haze: 0.4,
    night: 1,
    damp: 0.2,
    env: 0.9,
    fall: 1 / 220,
    aerial: 1500,
    bloom: 0.36,
    bloomK: 1.45,
    cityGlow: 0.75,
    oceanGain: 1.4,
    glowFill: {
      sky: [0.16, 0.22, 0.4],
      ground: [0.36, 0.26, 0.16],
      h: 9,
      floor: 0.2,
    },
    lamps: { i: 95, ang: 1.05, pen: 0.6, bw: 0 },
    spill: 0.11,
    grade: {
      saturation: 0.06,
      vibrance: 0.26,
      contrast: 0,
      curve: 0.16,
      warmth: 0.03,
      lift: 0.016,
      shadows: [-0.006, 0, 0.018],
      highlights: [0.034, 0.016, -0.018],
    },
  },
};
ca.rain = {
  skyFloor: 0.2,
  name: "Rain",
  cumulus: 0.55,
  cloudK: 0.55,
  cloudScale: 0.6,
  streaks: 2,
  disc: 0,
  sunEl: 40,
  sunAz: 200,
  sun: [0.8, 0.84, 0.9],
  sunI: 0.35,
  zen: [0.15, 0.165, 0.2],
  hor: [0.31, 0.33, 0.367],
  fog: [0.266, 0.288, 0.324],
  fogD: 0.0035,
  ground: [0.06, 0.06, 0.065],
  exposure: 1.5,
  haze: 1,
  night: 0.3,
  wet: 1,
  env: 0.95,
  fall: 1 / 500,
  aerial: 900,
  bloom: 0.24,
  bloomK: 1.4,
  grade: {
    saturation: -0.06,
    vibrance: 0.2,
    contrast: 0.05,
    curve: 0.3,
    mids: 0.25,
    warmth: -0.025,
    lift: 0.012,
    shadows: [-0.012, 0, 0.02],
    highlights: [0.01, 0.006, 0],
  },
};
ca.night = {
  ...ca.dusk,
  name: "Night",
  sunEl: -20,
  sun: [0.6, 0.62, 0.7],
  sunI: 0,
  zen: [0.0015, 0.0045, 0.016],
  hor: [0.012, 0.014, 0.024],
  twi: null,
  twiEnv: null,
  lp: [0.08, 0.05, 0.028],
  stars: 0.3,
  moon: [125, 28, 6],
  cumulus: 0.25,
  cloudLp: 0.7,
  streaks: 0.5,
  oceanGain: 0.7,
  fog: [0.03, 0.03, 0.036],
  ground: [0.01, 0.01, 0.012],
  exposure: 3.8,
  haze: 0.35,
  skyFloor: 0.3,
  env: 0.7,
  bloom: 0.38,
  bloomK: 1.4,
  cityGlow: 0.7,
  glowFill: {
    sky: [0.08, 0.1, 0.18],
    ground: [0.3, 0.21, 0.12],
    h: 14,
    floor: 0.25,
  },
  lamps: { i: 150, ang: 1.15, pen: 0.7, bw: 0 },
  spill: 0.13,
  grade: {
    saturation: 0.04,
    vibrance: 0.22,
    contrast: 0.02,
    curve: 0.18,
    warmth: 0,
    lift: 0.01,
    shadows: [-0.012, 0.004, 0.03],
    highlights: [0.03, 0.014, -0.016],
  },
};
var k1 = ["noon", "golden", "fog", "rain", "dusk", "night"],
  i3 = new WeakMap();
function k9(o, t, e) {
  let s = i3.get(o);
  if (!s) return [...o.hor];
  let n = s.length / 3,
    i = Math.atan2(e, t),
    a = Math.min(n - 1, Math.max(0, Math.floor((i / (2 * Math.PI) + 0.5) * n)));
  return [s[a * 3], s[a * 3 + 1], s[a * 3 + 2]];
}
function CN(o, t) {
  let e = o.map((i) => (i * t) / 0.6),
    n = [
      0.59719 * e[0] + 0.35458 * e[1] + 0.04823 * e[2],
      0.076 * e[0] + 0.90834 * e[1] + 0.01566 * e[2],
      0.0284 * e[0] + 0.13383 * e[1] + 0.83777 * e[2],
    ].map(
      (i) =>
        (i * (i + 0.0245786) - 90537e-9) /
        (i * (0.983729 * i + 0.432951) + 0.238081),
    );
  return [
    1.60475 * n[0] - 0.53108 * n[1] - 0.07367 * n[2],
    -0.10208 * n[0] + 1.10813 * n[1] - 0.00605 * n[2],
    -0.00327 * n[0] - 0.07276 * n[1] + 1.07602 * n[2],
  ].map((i) => Math.min(1, Math.max(0, i)));
}
var H4 = (o) =>
  o.twiEnv == null ? o : (o._envSky ||= { ...o, twiK: o.twiEnv });
function zot(o) {
  i3.has(o) || i3.set(o, PN(o, 256).hz);
}
function D4(o) {
  let t = Qc.degToRad(o.sunEl),
    e = Qc.degToRad(o.sunAz);
  return new dt(
    Math.sin(e) * Math.cos(t),
    Math.sin(t),
    -Math.cos(e) * Math.cos(t),
  ).normalize();
}
function Hkt(o, t = 1024) {
  let { data: e, hz: s } = PN(o, t);
  return (i3.set(o, s), _ot(kot(e), t));
}
function _ot(o, t) {
  let e = new no(o, t, t / 2, go, ga);
  return ((e.mapping = af), (e.colorSpace = Ba), (e.needsUpdate = !0), e);
}
var Ad = null,
  Dkt = 0,
  Eot = Promise.resolve(!1),
  Tot = () => Eot,
  N4 = new Map();
function Rot(o) {
  !Ad && o && (Ad = o);
}
function LN(o, t, e, s = !1) {
  try {
    (!Ad || !Ad.onmessage) &&
      ((Ad ||= new Worker(e, { type: "module" })),
      (Eot = xb(Ad)),
      (Ad.onmessage = (a) => {
        let r = N4.get(a.data.id);
        r &&
          (N4.delete(a.data.id),
          r(a.data.half ? _ot(a.data.half, a.data.W) : null, a.data.hz));
      }),
      (Ad.onerror = (a) => {
        console.warn("sky worker", a.message);
        for (let r of N4.values()) r(null);
        N4.clear();
      }));
    let n = ++Dkt,
      i = { ...o };
    return (
      delete i.grade,
      new Promise((a) => {
        (N4.set(n, (r, l) => {
          (r && l && i3.set(o, l), a(r));
        }),
          Ad.postMessage({ id: n, P: i, W: t, hz: s }));
      })
    );
  } catch (n) {
    return (console.warn("sky worker", n), Promise.resolve(null));
  }
}
var S9 = new Map();
function Aot(o, t, e) {
  S9.has(o) || S9.set(o, { W: t, p: LN(o, t, e, !0) });
}
async function Pot(o, t = 1024) {
  let e = S9.get(o);
  if (e && (S9.delete(o), e.W === t)) {
    let s = await e.p;
    if (s && i3.has(o)) return s;
  }
  return Hkt(o, t);
}
