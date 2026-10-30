// app 402 — label
// Lines 198219-198532 of readable/app.pretty.js (statement-aligned).
var Li = {
    race: {
      label: "Street Race",
      short: "Race",
      col: "#ff3048",
      family: "risky",
      ask: "Beat the rivals to the finish",
    },
    police: {
      label: "Police Escape",
      short: "Police",
      col: "#2f7bff",
      family: "risky",
      ask: "Lose the police before the clock runs out",
    },
    taxi: {
      label: "Taxi Rush",
      short: "Taxi",
      col: "#ffd21f",
      ink: "#1a1a1a",
      family: "steady",
      ask: "Chain the fares - every drop-off adds time",
    },
    food: {
      label: "Food Delivery",
      short: "Food",
      col: "#ff5fb0",
      family: "steady",
      ask: "Deliver it hot - and do not spill it",
    },
    courier: {
      label: "Courier",
      short: "Courier",
      col: "#c08a55",
      family: "steady",
      ask: "Every parcel, every address, in time",
    },
    vip: {
      label: "VIP Escort",
      short: "VIP",
      col: "#14d3c4",
      ink: "#062a28",
      family: "steady",
      ask: "A smooth ride - no hits, no hard moves",
    },
    trial: {
      label: "Time Trial",
      short: "Trial",
      col: "#2bd46a",
      ink: "#06210f",
      family: "skill",
      ask: "Every checkpoint, against the clock",
    },
    drift: {
      label: "Drift Zone",
      short: "Drift",
      col: "#c45bff",
      family: "skill",
      ask: "Drift points from gate to gate",
    },
    speed: {
      label: "Speed Trap",
      short: "Speed",
      col: "#ff8a1f",
      family: "skill",
      ask: "Through the gate as fast as you dare",
    },
    jump: {
      label: "Danger Sign",
      short: "Jump",
      col: "#7fd0ff",
      ink: "#08202e",
      family: "skill",
      ask: "Over the crest - the longest flight",
    },
    nearmiss: {
      label: "Near-miss Run",
      short: "Near miss",
      col: "#b6f03a",
      ink: "#1b2606",
      family: "skill",
      ask: "Thread the traffic: near misses on the clock",
    },
    photo: {
      label: "Photo Spot",
      short: "Photo",
      col: "#f2ede2",
      ink: "#20242a",
      family: "skill",
      ask: "Frame the landmark in photo mode (F)",
    },
    collect: {
      label: "Collectible",
      short: "Boards",
      col: "#ffb000",
      ink: "#2a1c00",
      family: "skill",
      ask: "Smash the board",
    },
  },
  ZT = [
    "race",
    "police",
    "taxi",
    "food",
    "courier",
    "vip",
    "trial",
    "drift",
    "speed",
    "jump",
    "nearmiss",
    "photo",
    "collect",
  ],
  lN = ["", "Easy", "Medium", "Hard"],
  cN = (o) => Li[o]?.ink || "#fff",
  Rit = {
    police: [
      { d: "M6 17v-4a6 6 0 0 1 12 0v4" },
      { d: "M4 17h16v3H4z" },
      { d: "M12 2.6v2.2M4.4 6.4l1.6 1.5M19.6 6.4L18 7.9" },
    ],
    food: [
      { d: "M5 8.5h14l-1.3 11.5H6.3z" },
      { d: "M9 8.5V7a3 3 0 0 1 6 0v1.5" },
      { d: "M9.5 13.5h5", o: 0.6 },
    ],
    courier: [
      { d: "M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" },
      { d: "M3.5 7.5L12 12l8.5-4.5M12 12v9" },
      { d: "M7.8 5.3l8.4 4.5", o: 0.6 },
    ],
    vip: [
      { d: "M4 19h16" },
      { d: "M4.6 15.8L3.6 7.2l5 3.8L12 4.6l3.4 6.4 5-3.8-1 8.6z" },
    ],
    trial: [
      { d: "M12 21.2a7.6 7.6 0 1 0 0-15.2a7.6 7.6 0 1 0 0 15.2z" },
      { d: "M9.8 2.6h4.4M12 6V2.6M12 13.6l3.2-3.2M18.4 6.6l1.4-1.4" },
    ],
    nearmiss: [
      { d: "M8 20.5V5M8 4.5l-3.2 3.2M8 4.5l3.2 3.2" },
      { d: "M16 3.5V19M16 19.5l-3.2-3.2M16 19.5l3.2-3.2" },
    ],
    photo: [
      { d: "M3.8 8.2h3.4l1.9-2.6h5.8l1.9 2.6h3.4v11H3.8z" },
      { d: "M12 16.6a3.3 3.3 0 1 0 0-6.6a3.3 3.3 0 1 0 0 6.6z" },
    ],
  },
  G2 = (o, t = null) =>
    o === "speed"
      ? t === "zone"
        ? "zone"
        : "trap"
      : o === "drift" || o === "jump"
        ? o
        : o === "collect"
          ? t === "travel"
            ? "travel"
            : "xp"
          : "ch_" + o,
  ySt = {
    race: "race",
    taxi: "taxi",
    speed: "trap",
    drift: "drift",
    jump: "jump",
    collect: "xp",
  };
function wSt(o) {
  if (o?.ICONS)
    for (let [t, e] of Object.entries(Li)) {
      let s = "ch_" + t;
      (Rit[t] && (o.ICONS[s] = Rit[t]),
        o.ICONS[s] || (o.ICONS[s] = o.ICONS[ySt[t]] || o.ICONS.info),
        (o.ACCENT[s] = e.col),
        o.LABEL && (o.LABEL[s] = e.label));
    }
}
var JT = null,
  MSt = (o) => {
    ((JT = o), wSt(o));
  };
function hN(o, t, e, s = "#fff", n = null) {
  if (JT) {
    JT.paintIcon(
      o,
      t.startsWith("ch_") || (JT.ICONS[t] && !Li[t]) ? t : G2(t, n),
      0,
      0,
      e * 1.55,
      s,
      2.2,
    );
    return;
  }
  (o.save(),
    (o.fillStyle = s),
    o.beginPath(),
    o.arc(0, 0, e * 0.35, 0, 7),
    o.fill(),
    o.restore());
}
var QT = (o, t, e = 0, s = !1) =>
  `ch:${o}:${t || o}:${s ? "f" : ""}${e ? "d" + e : ""}`;
function Ait(o, t, e) {
  let [, s, n, i = ""] = t.split(":"),
    a = +(i.match(/d(\d)/)?.[1] || 0),
    r = i.includes("f");
  if ((hN(o, s, e * (a ? 0.82 : 0.95), cN(s), n), a)) {
    (o.save(), (o.strokeStyle = "rgba(0,0,0,.55)"), (o.lineWidth = e * 0.06));
    for (let l = 0; l < 3; l++) {
      let c = (l - 1) * e * 0.52,
        h = e * 1.02;
      (o.beginPath(),
        o.arc(c, h, e * 0.2, 0, 7),
        (o.fillStyle = l < a ? "#ffd23f" : "rgba(30,30,30,.85)"),
        o.fill(),
        o.stroke());
    }
    o.restore();
  }
  r &&
    (o.save(),
    (o.strokeStyle = "#ffd23f"),
    (o.lineWidth = e * 0.16),
    o.beginPath(),
    o.arc(0, 0, e * 1.18, 0, 7),
    o.stroke(),
    o.restore());
}
MSt(fO);
await _0();
Fit();
await No();
var Qv = bi.content?.spawn ? [bi.content.spawn.x, bi.content.spawn.z] : Pit,
  fN = 230,
  Oit = 650,
  SSt = {
    race: 8,
    police: 8,
    taxi: 10,
    food: 12,
    courier: 8,
    vip: 7,
    trial: 9,
    drift: 6,
    speed: 9,
    jump: 6,
    nearmiss: 8,
    photo: 10,
  },
  kSt = Ia("restaurants", Cit),
  zSt = Ia("photo", Lit),
  V2 = (o) => Iit[o] || "the city",
  jl = (o) =>
    String(o || "")
      .replace(/ Street$/, " St")
      .replace(/ Avenue$/, " Ave")
      .replace(/ Boulevard$/, " Blvd")
      .replace(/ Drive$/, " Dr")
      .replace(/ Road$/, " Rd") || "a side street",
  _St = (o) => {
    let t = (Math.abs(o | 0) % 2147483646) + 1;
    return () => (t = (t * 16807) % 2147483647) / 2147483647;
  },
  T4 = (o, t) => {
    let e = Math.hypot(o, t) || 1;
    return [o / e, t / e];
  },
  t9 = new Set(["primary", "secondary", "tertiary", "trunk"]),
  ESt = (o) =>
    o &&
    o.car &&
    !o.inner &&
    !o.hwy &&
    !o.layered &&
    !o.tunnel &&
    o.cls !== "service" &&
    o.ja >= 0 &&
    o.jb >= 0 &&
    o.ja !== o.jb &&
    o.s1 - o.s0 > 50;
function Zv(o, t, e = 0, s = null) {
  let n = Math.hypot(o - Qv[0], t - Qv[1]),
    i = n < 2100 ? 1 : n < 4200 ? 2 : 3;
  return (
    (s?.region === "marin" || s?.dist === "sausalito") && (i = 3),
    e > 95 && i < 3 && i++,
    i
  );
}
function TSt(o, t, e) {
  let s = e.adj,
    n = o.juns.map(() => []);
  s.forEach((h, f) => {
    for (let u of h) n[u.to].push(f);
  });
  let i = t.roadAt(Qv[0], Qv[1], 60),
    a = i ? [i.E.ja, i.E.jb].filter((h) => h >= 0) : [],
    r = (h) => {
      let f = new Set(a),
        u = [...a];
      for (; u.length;) {
        let d = u.pop();
        for (let p of h(d)) f.has(p) || (f.add(p), u.push(p));
      }
      return f;
    },
    l = r((h) => s[h].map((f) => f.to)),
    c = r((h) => n[h]);
  return new Set([...l].filter((h) => c.has(h)));
}
