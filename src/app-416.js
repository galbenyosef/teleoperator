// app 416 — replace
// Lines 203027-203161 of readable/app.pretty.js (statement-aligned).
await _0();
await No();
var Es = {
    water: "#0f1f2c",
    shore: "#2a4b63",
    land: "#1f2125",
    pier: "#2b2e33",
    bld: "#2a2d32",
    bldEdge: "#363a41",
    park: "#1b3325",
    lawn: "#1d3828",
    wood: "#182f21",
    sand: "#3a352a",
    lagoon: "#12283a",
    road: [
      "#e39b3b",
      "#c68b45",
      "#8f887b",
      "#707174",
      "#5a5c61",
      "#46494f",
      "#393c42",
      "#33363b",
    ],
    hwyCase: "#3d2607",
    elevCase: "#111214",
    cable: "#cf8a4f",
    tram: "#6d8199",
    gg: "#dc5431",
    ggCase: "#3a140a",
    tower: "#e6ebef",
    label: "#cdd2d8",
    labelMajor: "#f1e8d6",
    labelHwy: "#ffd9a0",
    halo: "rgba(13,15,18,.94)",
    hood: "rgba(200,206,214,.6)",
    parkLabel: "#7fbf93",
    waterLabel: "#6d98b4",
    lm: "#1592a8",
    lmPark: "#2f8a52",
    lmBridge: "#c8452c",
    lmFood: "#c77a2f",
    lmCulture: "#8a5bc2",
    arrow: "#ff5a1f",
  },
  bkt = {
    motorway: 0,
    motorway_link: 0,
    trunk: 1,
    trunk_link: 1,
    primary: 2,
    primary_link: 2,
    secondary: 3,
    secondary_link: 3,
    tertiary: 4,
    tertiary_link: 4,
    residential: 5,
    residential_link: 5,
    unclassified: 5,
    living_street: 6,
    service: 6,
    busway: 7,
  },
  I4 = [3.4, 3, 2.5, 2.1, 1.7, 1.15, 0.8, 0.8],
  lot = {
    "Van Ness Avenue": "101",
    "South Van Ness Avenue": "101",
    "Lombard Street": "101",
    "Richardson Avenue": "101",
    "Presidio Parkway": "101",
    "Golden Gate Bridge": "101",
    "Central Freeway": "101",
    "John F Foran Freeway": "101",
    "Veterans Boulevard": "101",
    "Doyle Drive": "101",
    "Route 80": "80",
    "Dwight D. Eisenhower Highway": "80",
    "Southern Embarcadero Freeway": "280",
    "Park Presidio Bypass Drive": "1",
    "Park Presidio Boulevard": "1",
    "Crossover Drive": "1",
  },
  xkt = (o) =>
    o
      .replace(/\bStreet\b/g, "St")
      .replace(/\bAvenue\b/g, "Ave")
      .replace(/\bBoulevard\b/g, "Blvd")
      .replace(/\bDrive\b/g, "Dr")
      .replace(/\bPlace\b/g, "Pl")
      .replace(/\bTerrace\b/g, "Ter")
      .replace(/\bCourt\b/g, "Ct")
      .replace(/\bLane\b/g, "Ln")
      .replace(/\bRoad\b/g, "Rd")
      .replace(/\bAlley\b/g, "Aly")
      .replace(/\bParkway\b/g, "Pkwy")
      .replace(/\bHighway\b/g, "Hwy")
      .replace(/\bFreeway\b/g, "Fwy")
      .replace(/\bExpressway\b/g, "Expy"),
  cot = "sf-drive.map",
  Hh = (o, t, e) => (o < t ? t : o > e ? e : o),
  vkt = (o, t, e) =>
    "#" +
    [1, 3, 5]
      .map((s) =>
        Math.round(
          parseInt(o.substr(s, 2), 16) * (1 - e) +
            parseInt(t.substr(s, 2), 16) * e,
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join(""),
  x9 = (o) => o.map(([t, e]) => ji(t, e)),
  X2 = {
    a: [-7392.2, -1700],
    b: [-7543.8, -3327.6],
    s0: -343,
    s1: 1633,
    towers: [0, 1280],
    hw: 14,
  },
  K2 = {
    a: [259.5, 1020.5],
    b: [2307.4, -1392.4],
    s0: 0,
    s1: 3165,
    towers: [698, 1402, 2108, 2812],
    anch: 1755,
    hw: 16,
  };
for (let o of [X2, K2]) {
  let t = Math.hypot(o.b[0] - o.a[0], o.b[1] - o.a[1]);
  ((o.u = [(o.b[0] - o.a[0]) / t, (o.b[1] - o.a[1]) / t]),
    (o.at = (e) => [o.a[0] + o.u[0] * e, o.a[1] + o.u[1] * e]));
}
