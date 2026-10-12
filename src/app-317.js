// app 317 — short
// Lines 153570-153810 of readable/app.pretty.js (statement-aligned).
var rf = ["manual", "l3", "l4", "l5"],
  Fm = {
    manual: {
      name: "Manual",
      short: "MAN",
      sub: "No assistance: your hands only",
    },
    l3: {
      name: "Level 3",
      short: "L3",
      sub: "Guidance: you drive, it eases the wheel along the arrows",
    },
    l4: {
      name: "Level 4",
      short: "L4",
      sub: "Lane keeping, adaptive cruise, the route's turns: hold the throttle, steer to nudge",
    },
    l5: {
      name: "Level 5",
      short: "L5",
      sub: "Drives itself: the route, the lights, the kerb - Mad Max by default (assertive: passes, keeps up). Gas: faster; steer or brake: take over",
    },
  },
  K_ = !0,
  Qvt = "manual",
  IZ = { off: "manual", light: "l3", full: "l4" },
  Nx = "sf-drive.settings",
  NZ = 39;
function Uw() {
  let i = {};
  try {
    i = JSON.parse(localStorage.getItem(Nx) || "{}") || {};
  } catch {
    i = {};
  }
  let t = (i.levelVer === NZ && i.drivingLevel) || {};
  return {
    cars: { ...(t.cars || {}) },
    all: rf.includes(t.all) ? t.all : null,
  };
}
function QI(i) {
  try {
    let t = JSON.parse(localStorage.getItem(Nx) || "{}") || {};
    ((t.drivingLevel = { cars: i.cars, all: i.all }),
      (t.levelVer = NZ),
      localStorage.setItem(Nx, JSON.stringify(t)));
  } catch {}
}
function tF() {
  try {
    let i = new URLSearchParams(location.search),
      t = i.get("level");
    return rf.includes(t) ? t : null;
  } catch {
    return null;
  }
}
function Gw(i) {
  let t = tF();
  if (t) return t;
  let e = Uw();
  return e.all ? e.all : rf.includes(e.cars[i]) ? e.cars[i] : Qvt;
}
var BZ = (i) => rf[(rf.indexOf(i) + 1) % rf.length],
  Bs = {
    T: 2.8,
    sMin: 9,
    sMax: 150,
    aThr: 0.9,
    aOn: 2,
    aOff: 0.6,
    comf: 5,
    emerg: 11,
    pedOn: 1.2,
    pedD0: 2.6,
    latMax: 3.5,
    nudge: 0.3,
    slew: 2.2,
    head: 1.6,
    gap0: 2.5,
    l3Nudge: 0.2,
    l3Av: 0.2,
    l3A0: 0.55,
    l3Lat: 2.8,
    l4Lat: 2.4,
    l4Dec: 1.6,
    l4Brk: 2.5,
    l5Lat: 2.3,
    l5Dec: 2.4,
    l5Stop: 2.4,
    l5Brk: 3.6,
    l5Acc: 3.4,
    l5Max: 35.8,
    sightA: 4.5,
    l5Clear: !1,
    l3Up: 20,
    l3Dn: 20,
    l3Yaw: 0.5,
    l3BLat: 2,
    l3Player: 0.8,
    l4Player: 0.3,
    l4Hard: 0.55,
    l5Cruise: 26.8,
    l5AccBase: 2.6,
    l5AccGas: 4,
    l5LatGas: 2.8,
  },
  Im = {
    madmax: {
      name: "Mad Max",
      short: "MAX",
      limits: !0,
      limK: 1.6,
      limB: 4,
      cruise: 33,
      lat: 6,
      latGas: 7.5,
      dec: 4.6,
      stop: 4.2,
      brkOn: 3,
      brkK: 1.06,
      acc: 6,
      accGas: 8,
      gain: 1.3,
      head: 0.85,
      gap0: 1.9,
      jerk: 9,
      jerkE: 30,
      pass: !0,
      mergeT: 2.5,
      mergeR: 30,
      grades: !1,
      stopWait: 0.3,
      launch: 0.55,
      roll: 4.2,
      passDv: 2,
      passWait: 0.6,
      passCool: 3.5,
      oncPass: 160,
      xT: 3,
      xMax: 4,
    },
    chill: {
      name: "Chill",
      short: "CHILL",
      limits: !1,
      limK: 1.05,
      limB: 0,
      cruise: 26.8,
      lat: 2.3,
      latGas: 2.8,
      dec: 2.4,
      stop: 2.4,
      brkOn: 0.9,
      brkK: 1.15,
      acc: 2.6,
      accGas: 4,
      gain: 0.8,
      head: 1.6,
      gap0: 2.5,
      jerk: 0,
      jerkE: 0,
      pass: !1,
      mergeT: 5,
      mergeR: 50,
      grades: !0,
      stopWait: 0.7,
      launch: 0.3,
      roll: 0,
      passDv: 2.5,
      passWait: 0.8,
      passCool: 5,
      xT: 4.5,
      xMax: 7,
    },
  },
  t3t = {
    name: "Boost",
    short: "BOOST",
    limits: !0,
    limK: 2.4,
    limB: 8,
    cruise: 45,
    lat: 7.5,
    dec: 5.5,
    stop: 5,
    brkOn: 3.8,
    brkK: 1.05,
    acc: 9,
    gain: 1.8,
    head: 0.6,
    gap0: 1.5,
    jerk: 18,
    jerkE: 40,
    pass: !0,
    mergeT: 2,
    mergeR: 25,
    grades: !1,
    stopWait: 0.25,
    launch: 1,
    roll: 7,
    passDv: 0.8,
    passWait: 0.2,
    passCool: 2,
    oncPass: 220,
    xT: 2.5,
    xMax: 3,
  },
  e3t = (i, t, e, s) => {
    for (let n in t) {
      let o = t[n],
        a = e[n];
      i[n] =
        typeof o == "number" && typeof a == "number"
          ? o + (a - o) * s
          : s > 0.5
            ? (a ?? o)
            : o;
    }
    return ((i.name = t.name), (i.short = t.short), (i.boost = s), i);
  },
  ZI = "madmax";
function s3t() {
  if (typeof window > "u") return ZI;
  try {
    let i = new URLSearchParams(location.search).get("l5");
    if (Im[i]) return i;
  } catch {}
  try {
    let i = JSON.parse(localStorage.getItem(Nx) || "{}") || {};
    if (Im[i.l5Profile]) return i.l5Profile;
  } catch {}
  return ZI;
}
function OZ(i) {
  try {
    let t = JSON.parse(localStorage.getItem(Nx) || "{}") || {};
    ((t.l5Profile = i), localStorage.setItem(Nx, JSON.stringify(t)));
  } catch {}
}
