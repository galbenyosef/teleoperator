// app 342 — audio
// Lines 165352-165684 of readable/app.pretty.js (statement-aligned).
us.ferrari = {
  id: "ferrari",
  name: "Ferrari",
  model: "458 Spider",
  maker: "Manual override",
  dir: "assets/car/",
  get glb() {
    return sst() ? "scene_subd.glb" : "scene_plain.glb";
  },
  meta: "scene.json",
  tex: [],
  load: YMt,
  spec: set,
  sound: "ferrari",
  cam: null,
  hl: [0.62, 0.62, -2.05],
  orbit: { R: 6.4, h: 1.5, look: 0.55 },
  stats: [
    ["570 PS", "4.5 L V8 RWD"],
    ["3.3 s", "0-100 km/h"],
    ["7-speed", "dual clutch"],
  ],
  drives:
    "You drive, not the computer: a howling V8, a dual-clutch box, nitrous and brake-to-drift. Two seats - one fare.",
  accent: "#ff5a1f",
};
us.corvette = {
  id: "corvette",
  name: "Corvette",
  model: "ZR1X",
  maker: "Manual override",
  dir: jet,
  glb: "corvette.glb",
  meta: "corvette.json",
  tex: [],
  load: $et,
  spec: iet,
  sound: "corvette",
  cam: null,
  hl: [0.6, 0.62, -1.95],
  orbit: { R: 6.6, h: 1.45, look: 0.55 },
  stats: [
    ["1250 hp", "hybrid AWD"],
    ["2.5 s", "0-100 km/h"],
    ["8-speed", "dual clutch"],
  ],
  drives:
    "Twin-turbo V8 behind you, a motor up front: all-wheel-drive launches, 330 km/h, nitrous and a dual-clutch box. Two seats - one fare.",
  accent: "#ffc61a",
};
us.cybertruck = {
  id: "cybertruck",
  name: "Cybertruck",
  model: "Tesla",
  maker: "Tesla FSD",
  dir: Ket,
  glb: "cybertruck.glb",
  meta: "cybertruck.json",
  tex: [],
  load: Yet,
  spec: vv,
  sound: "cybertruck",
  cam: {
    h: 1.18,
    dist: 1.38,
    look: 1.3,
    inside: { Hood: [0, 1.6, -0.9], Bumper: [0, 0.62, -2.86] },
  },
  hl: [0.8, 1.02, -2.78],
  orbit: { R: 8.2, h: 2, look: 0.95 },
  stats: [
    ["630 kW", "tri-motor AWD"],
    ["2.7 s", "0-100 km/h"],
    ["3.1 t", "five seats"],
  ],
  drives:
    "Heavy, quick and unbothered: three motors, air suspension, a huge stainless body. Launches hard, rides flat, slow to rotate.",
  accent: "#c9ced6",
};
us.roadster = {
  id: "roadster",
  name: "Roadster",
  model: "Tesla",
  maker: "SpaceX package",
  dir: Jet,
  glb: "roadster.glb",
  meta: "roadster.json",
  tex: [],
  load: Zet,
  spec: eet,
  sound: "roadster",
  cam: null,
  hl: [0.62, 0.62, -2.1],
  orbit: { R: 6.6, h: 1.45, look: 0.5 },
  stats: [
    ["1.1 s", "0-60 mph, thrusters"],
    ["2.2 t", "fan downforce"],
    ["40 m", "flight ceiling"],
  ],
  drives:
    "Two fans suck it to the road - it corners flat at any speed. Shift fires the cold-gas thrusters, J holds them down and it flies; Space flips it. Q: fans.",
  accent: "#e9eef5",
};
us.missions = {
  id: "missions",
  name: "Mission S",
  model: "Porsche",
  maker: "Manual override",
  dir: tst,
  glb: "missions.glb",
  meta: "missions.json",
  tex: [],
  load: est,
  spec: oet,
  sound: "flat6",
  cam: null,
  hl: [0.72, 0.6, -2],
  orbit: { R: 6.6, h: 1.45, look: 0.55 },
  stats: [
    ["750 PS", "hybrid flat-six RWD"],
    ["2.8 s", "0-100 km/h"],
    ["8-speed", "dual clutch"],
  ],
  drives:
    "Everything a sports car needs, nothing more: a hybrid flat-six behind you, rear-drive, a dual-clutch box and a chassis that does exactly what you ask. Two seats - one fare.",
  accent: "#d5001c",
};
var E2 = [
    "waymo",
    "cybercab",
    "ferrari",
    "corvette",
    "cybertruck",
    "roadster",
    "missions",
  ],
  Ev = new Set(["ferrari", "corvette", "missions"]);
var Tc = {
    flat6: { label: "Flat-six", audio: "flat6", ice: !0 },
    v12: { label: "V12", audio: "v12", ice: !0 },
    diesel: { label: "Diesel", audio: "dsl", ice: !0 },
    small: { label: "Small engine", audio: "sml", ice: !0 },
    v8: { label: "V8, high-revving", audio: "ferrari", ice: !0 },
    v8tt: { label: "V8, twin-turbo", audio: "corvette", ice: !0 },
    ev: { label: "Electric", audio: "waymo", ice: !1 },
    ev_sport: { label: "Electric, sporty", audio: "cybercab", ice: !1 },
    ev_truck: { label: "Electric, heavy", audio: "cybertruck", ice: !1 },
    ev_hyper: { label: "Electric, hypercar", audio: "roadster_ev", ice: !1 },
  },
  yE = [
    "flat6",
    "v8",
    "v8tt",
    "v12",
    "diesel",
    "small",
    "ev",
    "ev_sport",
    "ev_hyper",
    "ev_truck",
  ],
  eB = (o) => (typeof o == "string" && Object.hasOwn(Tc, o) ? o : null),
  JMt = [
    [
      /\b(electric|ev|e-?tron|battery|plug-?in|zero[- ]emission|taycan|tesla|model [sxy3]|cyber ?(truck|cab)|robotaxi|leaf|ioniq|rivian|lucid)\b/,
      "ev",
    ],
    [
      /\b(flat[- ]?(six|6)|boxer|air[- ]?cooled|911|porsche|carrera|cayman|boxster|gt3|targa|singer)\b/,
      "flat6",
    ],
    [
      /\b(v12|v-12|twelve[- ]cylinder|lamborghini|aventador|murcielago|countach|pagani|zonda|aston|vanquish|db9|f12|812)\b/,
      "v12",
    ],
    [
      /\b(diesel|tdi|turbo-?diesel|pickup|pick-up|4x4|off-?road|truck|lorry|land ?cruiser|hilux|defender|bus|van)\b/,
      "diesel",
    ],
    [
      /\b(ferrari|f40|f50|enzo|supercar|hypercar|v10|formula|race ?car|racing|le mans)\b/,
      "v8",
    ],
    [
      /\b(v8|v-8|corvette|mustang|camaro|charger|challenger|hemi|muscle|amg|hot ?rod|nascar|twin[- ]?turbo|biturbo|jeep|hummer)\b/,
      "v8tt",
    ],
    [
      /\b(mini|kei|small|beetle|bug|fiat|smart|city car|2cv|kart|go-?kart|buggy|microcar|bubble ?car)\b/,
      "small",
    ],
    [
      /\b(hatch|hatchback|roadster|classic|vintage|retro|sports? car|coupe)\b/,
      "flat6",
    ],
  ];
function ZMt({ name: o = "", prompt: t = "", L: e = 4.5, H: s = 1.4 } = {}) {
  let n = (String(o) + " " + String(t)).toLowerCase();
  for (let [i, a] of JMt)
    if (i.test(n))
      return a !== "ev"
        ? a
        : /\b(truck|pickup|pick-up|suv|van|bus|4x4|off-?road)\b/.test(n) ||
            e > 5.1 ||
            s > 1.75
          ? "ev_truck"
          : /\b(sport|super|hyper|race|racing|coupe|roadster|fast)\b/.test(n) ||
              s < 1.3
            ? "ev_sport"
            : "ev";
  return e > 5.1 || s > 1.75 ? "v8tt" : "flat6";
}
function wE(o, t = "") {
  if (!o) return "ev";
  let e = eB(o.snd);
  if (e) return e;
  let s = o.vehicle,
    n = s ? Math.abs(s.max[2] - s.min[2]) : 4.5,
    i = s ? Math.abs(s.max[1] - s.min[1]) : 1.4;
  return ZMt({ name: o.name, prompt: t || o.prompt || "", L: n, H: i });
}
var ist = /^[0-9a-f]{64}$/,
  nst = (o, t, e) =>
    Number.isFinite(+o) ? Math.max(t, Math.min(e, +o)) : null;
function sB(o) {
  if (!o || typeof o != "object") return null;
  let t = (c) =>
      Array.isArray(c) &&
      c.length === 3 &&
      c.every((h) => nst(h, -20, 20) !== null)
        ? c.map((h) => Math.round(+h * 1e3) / 1e3)
        : null,
    e = t(o.min),
    s = t(o.max);
  if (!e || !s) return null;
  let n = s[2] - e[2],
    i = s[0] - e[0],
    a = s[1] - e[1];
  if (!(n >= 1.2 && n <= 9 && i >= 0.6 && i <= 3.5 && a > 0.3 && a < 5))
    return null;
  let r =
    Array.isArray(o.wheels) && o.wheels.length === 4 ? o.wheels.map(t) : null;
  if (!r || r.some((c) => !c)) return null;
  let l =
    Array.isArray(o.wheelR) &&
    o.wheelR.length === 4 &&
    o.wheelR.every((c) => nst(c, 0.05, 1.5) !== null)
      ? o.wheelR.map((c) => Math.round(+c * 1e3) / 1e3)
      : r.map((c) => Math.max(0.1, c[1]));
  return { min: e, max: s, wheels: r, wheelR: l };
}
function Wf(o) {
  let t =
      o?.files?.glb?.sha256 ||
      (/\/__mb\/items\/([0-9a-f]{64})\.glb$/.exec(o?.files?.glb?.url || "") ||
        [])[1],
    e = sB(o?.vehicle);
  if (!ist.test(t || "") || !e) return null;
  let s =
    o.files?.icon?.url &&
    /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(o.files.icon.url)
      ? o.files.icon.url
      : null;
  return {
    id: typeof o.id == "string" ? o.id.slice(0, 64) : "",
    name: nB(o.name) || "Custom car",
    sha: t,
    icon: s,
    vehicle: e,
    own: !o.shared,
  };
}
var nB = (o) =>
  typeof o == "string"
    ? o
        .replace(/[^A-Za-z0-9 _.'-]/g, "")
        .trim()
        .slice(0, 24)
    : "";
function Ul(o) {
  if (!o || typeof o != "object" || !ist.test(o.sha || "")) return null;
  let t = sB(o.vehicle);
  return t
    ? {
        id:
          typeof o.id == "string"
            ? o.id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 64)
            : "",
        name: nB(o.name) || "Custom car",
        sha: o.sha,
        icon:
          typeof o.icon == "string" &&
          /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(o.icon)
            ? o.icon
            : null,
        vehicle: t,
        own: !!o.own,
        ...(eB(o.snd) ? { snd: o.snd } : {}),
      }
    : null;
}
var iB = (o) => "/__mb/items/" + o.sha + ".glb";
function oB(o) {
  if (((o = Ul(o)), !o)) return "";
  let t = o.vehicle,
    e = [...t.min, ...t.max, ...t.wheels.flat(), ...t.wheelR].map(
      (s) => +s.toFixed(3),
    );
  return o.sha + "|" + o.name + "|" + e.join(",") + (o.snd ? "|" + o.snd : "");
}
function ME(o) {
  if (typeof o != "string" || o.length > 400) return null;
  let [t, e, s, n] = o.split("|"),
    i = (s || "").split(",").map(Number);
  return i.length !== 22 || !i.every(Number.isFinite)
    ? null
    : Ul({
        sha: t,
        name: e,
        snd: n,
        vehicle: {
          min: i.slice(0, 3),
          max: i.slice(3, 6),
          wheels: [
            i.slice(6, 9),
            i.slice(9, 12),
            i.slice(12, 15),
            i.slice(15, 18),
          ],
          wheelR: i.slice(18, 22),
        },
      });
}
