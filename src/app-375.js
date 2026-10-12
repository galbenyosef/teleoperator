// app 375 — math
// Lines 187490-187593 of readable/app.pretty.js (statement-aligned).
var nN = { tree: 1, palm: 1 },
  cwt = {
    lamp: "medium",
    lamp2: "medium",
    plamp: "medium",
    dlamp: "medium",
    hydrant: "medium",
    bench: "medium",
    stop: "light",
    meter: "light",
    bin: "light",
    newsbox: "light",
    rack: "light",
    cafe0: "light",
    cafe1: "light",
    cone: "light",
    barricade: "light",
    worksign: "light",
    flexpost: "light",
    signal: "heavy",
    signalp: "heavy",
    wpole: "heavy",
    tree: "heavy",
    palm: "heavy",
    tpole: "heavy",
    fpole: "heavy",
    tlpole: "heavy",
    upole: "heavy",
    upolet: "heavy",
    shelter: "medium",
  };
for (let [i, t] of Object.entries(cwt)) Pp[i] && (Pp[i].cls = t);
var Qtt = {
  light: { v0: 6 / 3.6, vb: 0, f: null, hit: !1, impT: 0, impact: 0, life: 20 },
  medium: {
    v0: 22 / 3.6,
    vb: 18 / 3.6,
    f: 0.08,
    hit: !0,
    impT: 0.15,
    impact: 0.35,
    life: 25,
  },
  heavy: {
    v0: 40 / 3.6,
    vb: 30 / 3.6,
    f: 0.2,
    hit: !0,
    impT: 0.35,
    impact: 0.75,
    life: 30,
  },
};
var hwt = {
  lamp: 0.18,
  lamp2: 0.25,
  plamp: 0.15,
  dlamp: 0.2,
  hydrant: 0.2,
  stop: 0.16,
  signal: 0.16,
  signalp: 0.16,
  wpole: 0.16,
  meter: 0.1,
  bin: 0.32,
  newsbox: 0.55,
  bench: 0.45,
  rack: 0.4,
  cafe0: 0.55,
  cafe1: 0.55,
  cone: 0.22,
  barricade: 0.6,
  worksign: 0.35,
  flexpost: 0.06,
  tpole: 0.16,
  fpole: 0.25,
  tlpole: 0.22,
  upole: 0.17,
  upolet: 0.17,
  tree: 0.3,
  palm: 0.45,
};
function fwt(i, t, e) {
  let s = i.vb ?? t.vb,
    n = i.f ?? t.f ?? i.loss * Math.min(1, 16 / Math.max(e, 1)) ** 0.3;
  return Math.sqrt(Math.max(0, e * e - s * s)) * (1 - n);
}
var tet = 30,
  uwt = 6,
  dwt = 60,
  eet = 9.81;
function pwt() {
  let t = document.createElement("canvas");
  t.width = t.height = 64;
  let e = t.getContext("2d"),
    s = e.createRadialGradient(64 / 2, 64 / 2, 0, 64 / 2, 64 / 2, 64 / 2);
  (s.addColorStop(0, "rgba(255,255,255,0.9)"),
    s.addColorStop(0.35, "rgba(255,255,255,0.45)"),
    s.addColorStop(1, "rgba(255,255,255,0)"),
    (e.fillStyle = s),
    e.fillRect(0, 0, 64, 64));
  let n = new Sn(t);
  return ((n.colorSpace = is), n);
}
