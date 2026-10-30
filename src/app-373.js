// app 373 — wind
// Lines 180362-180641 of readable/app.pretty.js (statement-aligned).
function qv() {
  try {
    let o = JSON.parse(localStorage.getItem(f1) || "{}") || {};
    return {
      on: o.music !== !1,
      vol: typeof o.musicVol == "number" ? o.musicVol : 0.7,
      station: o.station >= 0 && o.station < zd.length ? o.station | 0 : 0,
    };
  } catch {
    return { on: !0, vol: 0.7, station: 0 };
  }
}
function H2(o, t) {
  try {
    let e = JSON.parse(localStorage.getItem(f1) || "{}") || {};
    ((e.music = o),
      (e.musicVol = t),
      localStorage.setItem(f1, JSON.stringify(e)));
  } catch {}
}
var zd = [
  { id: "mix", name: "Horizon Mix", energy: null },
  { id: "cruise", name: "Bay Cruise FM", energy: ["cruise"] },
  { id: "drive", name: "Redline Radio", energy: ["drive", "high"] },
];
function p4(o) {
  try {
    let t = JSON.parse(localStorage.getItem(f1) || "{}") || {};
    ((t.station = o), localStorage.setItem(f1, JSON.stringify(t)));
  } catch {}
}
var W8t = {
    pole: { g: 0.42, r: 1.45 },
    tree: { g: 0.5, r: 1.15 },
    car: { g: 0.62, r: 0.95 },
    rail: { g: 0.3, r: 1.6 },
  },
  FB = 0.6,
  Gv = { engine: 0.8, sfx: 0.85, world: 0.6, amb: 0.42, ui: 0.45, rev: 0.9 },
  q8t = new Set(["boxtruck", "stepvan", "garbage", "semi", "bus", "cablecar"]),
  h1 = 343,
  j8t = 0.6,
  $8t = { ferrari: 0.36, ev: 0.8 };
function DB() {
  try {
    let o = JSON.parse(localStorage.getItem(f1) || "{}") || {};
    return typeof o.masterVol == "number" ? o.masterVol : 1;
  } catch {
    return 1;
  }
}
function UB(o) {
  try {
    let t = JSON.parse(localStorage.getItem(f1) || "{}") || {};
    ((t.masterVol = o), localStorage.setItem(f1, JSON.stringify(t)));
  } catch {}
}
var sn = (o, t, e) => Math.min(e, Math.max(t, o)),
  Vv = { top: [0, 55, 95, 135, 178, 225, 275], red: 7e3, idle: 950 };
function Ant(o, t, e, s) {
  let n = (l) => Math.max(Vv.idle, (Vv.red * t) / Vv.top[l]),
    i = 3e3 + 3400 * e,
    a = 1600 + 1400 * e;
  ((o.shiftT = Math.max(0, (o.shiftT || 0) - s)),
    o.g < 6 && n(o.g) > i
      ? (o.g++, (o.shiftT = 0.12), (o.dir = 1))
      : o.g > 1 && n(o.g) < a && (o.g--, (o.shiftT = 0.06), (o.dir = -1)));
  let r = n(o.g);
  return (
    o.g === 1 && t < 18 && (r = Math.max(r, Vv.idle + 2400 * e * (1 - t / 36))),
    Math.min(r, Vv.red)
  );
}
var eo = (o, t, e) => {
    let s = sn((e - o) / (t - o), 0, 1);
    return s * s * (3 - 2 * s);
  },
  X8t = [
    [1e3, "eng_idle"],
    [2e3, "eng_2000"],
    [3500, "eng_3500"],
    [5500, "eng_5500"],
    [8e3, "eng_8000"],
  ],
  Vl = {
    ferrari: { loops: X8t, coast: "eng_coast" },
    corvette: {
      loops: [
        [1e3, "zr_idle"],
        [2e3, "zr_2000"],
        [3500, "zr_3500"],
        [5500, "zr_5500"],
        [7500, "zr_7500"],
      ],
      coast: "zr_coast",
    },
    flat6: {
      loops: [
        [1100, "f6_idle"],
        [4e3, "f6_3500"],
        [5600, "f6_5000"],
      ],
      coast: "f6_coast",
    },
    v12: {
      loops: [
        [1e3, "v12_idle"],
        [1700, "v12_mid"],
        [2e3, "v12_high"],
      ],
      coast: "v12_coast",
    },
    dsl: {
      loops: [
        [750, "dsl_idle"],
        [1500, "dsl_mid"],
        [3800, "dsl_high"],
      ],
      coast: "dsl_coast",
    },
    sml: {
      loops: [
        [1e3, "sml_idle"],
        [2e3, "sml_mid"],
        [2900, "sml_high"],
      ],
      coast: "sml_coast",
    },
  },
  d4 = (o) => [...o.loops.map((t) => t[1]), o.coast],
  K8t = new Set(Object.values(Vl).flatMap(d4)),
  N2 = {
    ferrari: { pops: !0, sub: 1.1, wind: 1 },
    corvette: { pops: !0, sub: 1.2, wind: 0.45 },
    flat6: { pops: !0, sub: 0.9, wind: 0.5 },
    v12: { pops: !0, sub: 1.1, wind: 0.5 },
    dsl: { pops: !1, sub: 1.3, wind: 0.4 },
    sml: { pops: !1, sub: 0.5, wind: 0.6 },
    ev: { pops: !1, sub: 0, wind: 0 },
  },
  Y8t = 22,
  OB = 1.25,
  J8t = 1,
  Wl = {
    waymo: {
      mot: [
        [15, "ev_mot_lo"],
        [50, "ev_mot_mid"],
        [100, "ev_mot_hi"],
      ],
      tyre: [
        [20, "ev_tyre_lo"],
        [50, "ev_tyre_mid"],
        [110, "ev_tyre_hi"],
      ],
      avas: "ev_avas",
      wind: "ev_wind2",
      regen: "ev_regen2",
      bump: "ev_bump",
      mix: { mot: 1, tyre: 1, wind: 1, avas: 1, regen: 1 },
    },
    cybercab: {
      mot: [
        [15, "cc_mot_lo"],
        [50, "cc_mot_mid"],
        [100, "cc_mot_hi"],
      ],
      tyre: [
        [20, "cc_tyre_lo"],
        [50, "cc_tyre_mid"],
        [110, "cc_tyre_hi"],
      ],
      avas: "cc_avas",
      wind: "cc_wind",
      regen: "cc_regen",
      bump: "cc_bump",
      mix: { mot: 1.2, tyre: 0.9, wind: 0.85, avas: 0.9, regen: 1.1 },
    },
    cybertruck: {
      mot: [
        [15, "ct_mot_lo"],
        [50, "ct_mot_mid"],
        [100, "ct_mot_hi"],
      ],
      tyre: [
        [20, "ct_tyre_lo"],
        [50, "ct_tyre_mid"],
        [110, "ct_tyre_hi"],
      ],
      avas: "ct_avas",
      wind: "ct_wind",
      regen: "ct_regen",
      bump: "ct_bump",
      mix: { mot: 0.75, tyre: 1, wind: 0.9, avas: 0.9, regen: 1 },
    },
    roadster: {
      mot: [
        [15, "rd_mot_lo"],
        [50, "rd_mot_mid"],
        [100, "rd_mot_hi"],
      ],
      tyre: [
        [20, "rd_tyre_lo"],
        [50, "rd_tyre_mid"],
        [110, "rd_tyre_hi"],
      ],
      avas: "rd_avas",
      wind: "rd_wind",
      regen: "rd_regen",
      bump: "rd_bump",
      mix: { mot: 0.6, tyre: 0.95, wind: 0.95, avas: 0.9, regen: 1 },
      spacex: {
        fan: "rd_fan",
        thrust: "rd_thrust",
        start: "rd_thrust_start",
        land: "rd_land",
        mix: { fan: 1, thrust: 1, start: 1, land: 1 },
      },
    },
  };
Wl.roadster_ev = { ...Wl.roadster, spacex: null };
var Z8t = !1,
  Wv = (o) => [
    ...o.mot.map((t) => t[1]),
    ...o.tyre.map((t) => t[1]),
    o.avas,
    o.wind,
    o.regen,
    o.bump,
  ],
  BB = {
    ferrari: { impact: "impact", scrape: "scrape", skid: "skid", ir: "ir_" },
    ev: {
      impact: "ev_crash",
      scrape: "ev_scrape",
      skid: "ev_squeal",
      ir: "irr_",
    },
  },
  NB = new Set(Object.values(Wl).flatMap(Wv)),
  HB = (o) => (o ? [o.fan, o.thrust, o.start, o.land] : []),
  Q8t = new Set(Object.values(Wl).flatMap((o) => HB(o.spacex))),
  Pnt = {
    body: { rate: 1.13, lp: 2600, dur: 0.42 },
    heavy: { rate: 0.82, lp: 6500, dur: 1.4 },
    prop: { rate: 1.3, lp: 3600, dur: 0.2 },
    wood: { rate: 0.72, lp: 1300, dur: 0.32 },
    ground: { rate: 0.9, lp: 900, dur: 0.5 },
    scrape: { rate: 1, lp: 4800, dur: 0.3 },
  },
  Cnt = !1;
function t6t() {
  let o = globalThis.AudioParam?.prototype;
  if (Cnt || !o) return;
  Cnt = !0;
  for (let e of [
    "setValueAtTime",
    "linearRampToValueAtTime",
    "exponentialRampToValueAtTime",
    "setTargetAtTime",
  ]) {
    let s = o[e];
    typeof s == "function" &&
      (o[e] = function (n, i, a) {
        return Number.isFinite(n) &&
          Number.isFinite(i) &&
          (a === void 0 || Number.isFinite(a))
          ? s.call(this, n, i, a)
          : this;
      });
  }
  let t = Object.getOwnPropertyDescriptor(o, "value");
  t?.set &&
    Object.defineProperty(o, "value", {
      ...t,
      set(e) {
        Number.isFinite(e) && t.set.call(this, e);
      },
    });
}
