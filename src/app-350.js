// app 350 — cam
// Lines 168916-169228 of readable/app.pretty.js (statement-aligned).
P0();
var Fn = (o, t, e) => (o < t ? t : o > e ? e : o),
  m4t = (o) => ((o = Fn(o, 0, 1)), o * o * (3 - 2 * o)),
  g4t = 60 / (2 * Math.PI),
  P2 = [
    { id: "stock", name: "Stock", col: "#9aa0a6" },
    { id: "street", name: "Street", col: "#46c46a" },
    { id: "sport", name: "Sport", col: "#2f8cff" },
    { id: "race", name: "Race", col: "#a35cff" },
    { id: "elite", name: "Elite", col: "#ffb020" },
  ],
  Ri = {
    engine: {
      tab: "engine",
      name: "Engine",
      ev: "Motor",
      cam: "engine",
      icon: "engine",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 3500, 1, "+7 % power: intake, cams, a tune"],
        [2, 9e3, 3, "+15 % power: forged internals"],
        [3, 2e4, 6, "+24 % power: a race build"],
        [4, 42e3, 10, "+34 % power: the full elite build"],
      ],
    },
    turbo: {
      tab: "engine",
      name: "Forced induction",
      ev: "Inverter",
      cam: "engine",
      icon: "turbo",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 4e3, 2, "+6 % at the top end"],
        [2, 11e3, 5, "+12 %, a bigger turbo"],
        [3, 26e3, 9, "+19 %, twin race turbos"],
      ],
    },
    exhaust: {
      tab: "engine",
      name: "Exhaust",
      ev: null,
      cam: "exhaust",
      icon: "exhaust",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 1800, 1, "+2 % power, a deeper note"],
        [2, 5e3, 3, "+4 %, louder, it crackles"],
        [3, 12e3, 6, "+6 %, straight pipes: loud"],
      ],
    },
    nitro: {
      tab: "engine",
      name: "Nitrous",
      ev: null,
      cam: "exhaust",
      icon: "nitro",
      lv: [
        [0, 0, 0, "Factory bottle"],
        [1, 2500, 2, "A bigger bottle: 6 s, +8 % push"],
        [2, 7e3, 4, "7.5 s, +16 % push"],
        [3, 16e3, 7, "Race kit: 9 s, +25 % push"],
      ],
    },
    trans: {
      tab: "perf",
      name: "Transmission",
      ev: "Reduction gear",
      cam: "side",
      icon: "gearbox",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 3e3, 2, "Quicker shifts"],
        [2, 8e3, 4, "Race shifts; the final drive tunable"],
        [3, 18e3, 8, "Sequential: shifts in half the time"],
      ],
    },
    weight: {
      tab: "perf",
      name: "Weight reduction",
      ev: null,
      cam: "side",
      icon: "weight",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 3e3, 2, "-3 %: lighter seats"],
        [2, 9e3, 5, "-6 %: carbon panels"],
        [3, 22e3, 9, "-10 %: stripped out"],
      ],
    },
    brakes: {
      tab: "perf",
      name: "Brakes",
      ev: null,
      cam: "wheel",
      icon: "brake",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 2e3, 1, "Sport pads: +12 % bite"],
        [2, 6e3, 3, "Big brake kit"],
        [3, 15e3, 6, "Carbon-ceramic race brakes"],
      ],
    },
    susp: {
      tab: "perf",
      name: "Suspension",
      ev: null,
      cam: "wheelLow",
      icon: "spring",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 2500, 1, "Lowering springs: -1.5 cm"],
        [2, 7e3, 3, "Coilovers: springs, bars, height tunable"],
        [3, 16e3, 6, "Race coilovers: -4.5 cm, stiff"],
      ],
    },
    diff: {
      tab: "perf",
      name: "Differential",
      ev: null,
      cam: "rear",
      icon: "diff",
      lv: [
        [0, 0, 0, "Factory"],
        [2, 5e3, 3, "Sport LSD: tunable lock"],
        [3, 12e3, 6, "Drift diff: locked, the tail loose"],
      ],
    },
    aero: {
      tab: "perf",
      name: "Aero",
      ev: null,
      cam: "rear",
      icon: "wing",
      lv: [
        [0, 0, 0, "Factory"],
        [1, 3e3, 2, "Lip spoiler: +25 % downforce"],
        [2, 8e3, 4, "Sport wing: +70 %, tunable"],
        [3, 19e3, 7, "Race wing: +130 % downforce"],
      ],
    },
    tyre: {
      tab: "tyres",
      name: "Compound",
      ev: null,
      cam: "wheelLow",
      icon: "tyre",
      choice: !0,
      lv: [
        [0, 0, 0, "Factory road tyres"],
        [1, 1200, 1, "Street: quiet, a little less grip"],
        [2, 3e3, 2, "Sport: +4 % grip"],
        [3, 7500, 4, "Semi-slick: +9 % grip"],
        [2, 4e3, 3, "Drift: the rear lets go, holds the angle"],
        [1, 2500, 2, "Off-road: grips on grass and dirt"],
      ],
    },
    width: {
      tab: "tyres",
      name: "Width",
      ev: null,
      cam: "wheelLow",
      icon: "tyre",
      choice: !0,
      lv: [
        [0, 0, 0, "Factory width"],
        [1, 1500, 1, "+20 mm: +2 % grip"],
        [2, 3500, 3, "+40 mm: +4 % grip, a touch of drag"],
      ],
    },
  },
  Rst = ["Factory", "Street", "Sport", "Semi-slick", "Drift", "Off-road"];
var Ast = (o, t) =>
    !!Ri[o] &&
    (!t ||
      Ri[o].ev !== null ||
      ["weight", "brakes", "susp", "diff", "aero", "tyre", "width"].includes(
        o,
      )),
  Pst = (o, t) => (t && Ri[o].ev ? Ri[o].ev : Ri[o].name),
  Hr = [
    ["Factory", 0, "factory", 0, 0],
    ["Split five", 5, "split", 1500, 1],
    ["Mesh", 10, "mesh", 2200, 2],
    ["Turbofan", 14, "fan", 2800, 3],
    ["Deep dish", 6, "dish", 2500, 2],
    ["Six blade", 6, "blade", 2e3, 1],
    ["Monoblock", 5, "mono", 3200, 4],
    ["Aero disc", 0, "disc", 3e3, 5],
  ],
  C2 = ["Black", "White letters", "White wall", "Red stripe"],
  Cst = [-1, 0, 1, 2, 3],
  Iv = [
    ["pf", "Tyres", "Pressure front", -0.4, 0.4, 0.05, "bar", null],
    ["pr", "Tyres", "Pressure rear", -0.4, 0.4, 0.05, "bar", null],
    ["cf", "Alignment", "Camber front", -2.5, 1, 0.1, "\xB0", null],
    ["cr", "Alignment", "Camber rear", -2.5, 1, 0.1, "\xB0", null],
    ["tf", "Alignment", "Toe front", -0.5, 0.5, 0.05, "\xB0", null],
    ["tr", "Alignment", "Toe rear", -0.5, 0.5, 0.05, "\xB0", null],
    ["sf", "Springs", "Springs front", -25, 35, 5, "%", ["susp", 2]],
    ["sr", "Springs", "Springs rear", -25, 35, 5, "%", ["susp", 2]],
    ["rh", "Springs", "Ride height", -5, 3, 0.5, "cm", ["susp", 2]],
    ["dp", "Damping", "Damping", -25, 35, 5, "%", ["susp", 2]],
    ["af", "Anti-roll bars", "Anti-roll front", -50, 100, 10, "%", ["susp", 2]],
    ["ar", "Anti-roll bars", "Anti-roll rear", -50, 100, 10, "%", ["susp", 2]],
    ["fd", "Gearing", "Final drive", -12, 12, 1, "%", ["trans", 2]],
    ["dl", "Differential", "Diff lock", -50, 150, 10, "%", ["diff", 1]],
    ["bb", "Brakes", "Brake balance", -10, 10, 1, "% front", null],
    ["bp", "Brakes", "Brake pressure", -20, 20, 5, "%", null],
    ["dn", "Aero", "Downforce", -40, 40, 5, "%", ["aero", 2]],
    ["db", "Aero", "Aero balance", -10, 10, 1, "% front", ["aero", 2]],
  ],
  OE = Object.fromEntries(Iv.map((o) => [o[0], o])),
  A2 = (o, t, e) => (Number.isFinite(+o) ? Fn(Math.round(+o), t, e) : 0);
function Jo(o) {
  if (!o || typeof o != "object") return null;
  let t = { p: {}, own: {}, w: {}, t: {} };
  for (let a in Ri) {
    let r = Ri[a].lv.length - 1,
      l = A2(o.p?.[a], 0, r),
      c = A2(o.own?.[a], 0, r);
    if ((l && (t.p[a] = l), Ri[a].choice)) {
      let h = A2(o.own?.[a], 0, 2 ** (r + 1) - 1) | (l ? 1 << l : 0);
      h && (t.own[a] = h);
    } else Math.max(l, c) && (t.own[a] = Math.max(l, c));
  }
  let e = A2(o.w?.s, 0, Hr.length - 1),
    s = A2(o.w?.z, -1, 3),
    n = A2(o.w?.d, 0, C2.length - 1),
    i = A2(o.w?.own, 0, 2 ** Hr.length - 1) | (e ? 1 << e : 0);
  (e && (t.w.s = e), s && (t.w.z = s), n && (t.w.d = n), i && (t.w.own = i));
  for (let [a, , , r, l, c] of Iv) {
    let h = +o.t?.[a];
    if (Number.isFinite(h) && h) {
      let f = Fn(Math.round(h / c) * c, r, l);
      Math.abs(f) > 1e-9 && (t.t[a] = +f.toFixed(3));
    }
  }
  for (let a of ["p", "own", "w", "t"]) Object.keys(t[a]).length || delete t[a];
  return Object.keys(t).length ? t : null;
}
var b4t = (o) =>
    !!(
      o &&
      ((o.p && Object.keys(o.p).length) || (o.t && Object.keys(o.t).length))
    ),
  lr = (o, t) => o?.p?.[t] || 0,
  L2 = (o, t, e) =>
    !e ||
    (Ri[t].choice
      ? !!((o?.own?.[t] || 0) & (1 << e))
      : (o?.own?.[t] || 0) >= e),
  Fv = (o, t) => !t || !!((o?.w?.own || 0) & (1 << t)),
  BE = (o, t) => JSON.stringify(Jo(o)) === JSON.stringify(Jo(t)),
  NE = (o, t) => {
    let e = OE[t][7];
    return !e || lr(o, e[0]) >= e[1];
  };
function Ov(o, t) {
  let e = [];
  for (let n in Ri) {
    let i = lr(t, n);
    i &&
      !L2(o, n, i) &&
      e.push({
        id: n,
        k: i,
        what:
          Ri[n].name +
          " \xB7 " +
          (Ri[n].choice
            ? Ri[n].lv[i][3].split(":")[0]
            : P2[Ri[n].lv[i][0]].name),
        price: Ri[n].lv[i][1],
      });
  }
  let s = t?.w?.s || 0;
  return (
    s &&
      !Fv(o, s) &&
      e.push({
        id: "rim",
        k: s,
        what: "Wheels \xB7 " + Hr[s][0],
        price: Hr[s][3],
      }),
    { items: e, total: e.reduce((n, i) => n + i.price, 0) }
  );
}
function HE(o) {
  let t = Jo(o) || {};
  t.own ||= {};
  for (let e in Ri) {
    let s = lr(t, e);
    s &&
      (Ri[e].choice
        ? (t.own[e] = (t.own[e] || 0) | (1 << s))
        : (t.own[e] = Math.max(t.own[e] || 0, s)));
  }
  return (t.w?.s && (t.w.own = (t.w.own || 0) | (1 << t.w.s)), Jo(t));
}
function DE(o, t) {
  let e = [];
  for (let n in Ri) {
    let i = lr(o, n);
    i &&
      Ri[n].lv[i][2] > t &&
      e.push({ what: Ri[n].name, lvl: Ri[n].lv[i][2] });
  }
  let s = o?.w?.s || 0;
  return (s && Hr[s][4] > t && e.push({ what: Hr[s][0], lvl: Hr[s][4] }), e);
}
