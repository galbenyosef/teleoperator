// app 334 — cam
// Lines 162621-162933 of readable/app.pretty.js (statement-aligned).
ml();
var Pn = (i, t, e) => (i < t ? t : i > e ? e : i),
  O3t = (i) => ((i = Pn(i, 0, 1)), i * i * (3 - 2 * i)),
  H3t = 60 / (2 * Math.PI),
  Um = [
    { id: "stock", name: "Stock", col: "#9aa0a6" },
    { id: "street", name: "Street", col: "#46c46a" },
    { id: "sport", name: "Sport", col: "#2f8cff" },
    { id: "race", name: "Race", col: "#a35cff" },
    { id: "elite", name: "Elite", col: "#ffb020" },
  ],
  mi = {
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
  RQ = ["Factory", "Street", "Sport", "Semi-slick", "Drift", "Off-road"];
var PQ = (i, t) =>
    !!mi[i] &&
    (!t ||
      mi[i].ev !== null ||
      ["weight", "brakes", "susp", "diff", "aero", "tyre", "width"].includes(
        i,
      )),
  CQ = (i, t) => (t && mi[i].ev ? mi[i].ev : mi[i].name),
  Mr = [
    ["Factory", 0, "factory", 0, 0],
    ["Split five", 5, "split", 1500, 1],
    ["Mesh", 10, "mesh", 2200, 2],
    ["Turbofan", 14, "fan", 2800, 3],
    ["Deep dish", 6, "dish", 2500, 2],
    ["Six blade", 6, "blade", 2e3, 1],
    ["Monoblock", 5, "mono", 3200, 4],
    ["Aero disc", 0, "disc", 3e3, 5],
  ],
  Gm = ["Black", "White letters", "White wall", "Red stripe"],
  LQ = [-1, 0, 1, 2, 3],
  qx = [
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
  vz = Object.fromEntries(qx.map((i) => [i[0], i])),
  Dm = (i, t, e) => (Number.isFinite(+i) ? Pn(Math.round(+i), t, e) : 0);
function Uo(i) {
  if (!i || typeof i != "object") return null;
  let t = { p: {}, own: {}, w: {}, t: {} };
  for (let a in mi) {
    let r = mi[a].lv.length - 1,
      l = Dm(i.p?.[a], 0, r),
      c = Dm(i.own?.[a], 0, r);
    if ((l && (t.p[a] = l), mi[a].choice)) {
      let h = Dm(i.own?.[a], 0, 2 ** (r + 1) - 1) | (l ? 1 << l : 0);
      h && (t.own[a] = h);
    } else Math.max(l, c) && (t.own[a] = Math.max(l, c));
  }
  let e = Dm(i.w?.s, 0, Mr.length - 1),
    s = Dm(i.w?.z, -1, 3),
    n = Dm(i.w?.d, 0, Gm.length - 1),
    o = Dm(i.w?.own, 0, 2 ** Mr.length - 1) | (e ? 1 << e : 0);
  (e && (t.w.s = e), s && (t.w.z = s), n && (t.w.d = n), o && (t.w.own = o));
  for (let [a, , , r, l, c] of qx) {
    let h = +i.t?.[a];
    if (Number.isFinite(h) && h) {
      let f = Pn(Math.round(h / c) * c, r, l);
      Math.abs(f) > 1e-9 && (t.t[a] = +f.toFixed(3));
    }
  }
  for (let a of ["p", "own", "w", "t"]) Object.keys(t[a]).length || delete t[a];
  return Object.keys(t).length ? t : null;
}
var D3t = (i) =>
    !!(
      i &&
      ((i.p && Object.keys(i.p).length) || (i.t && Object.keys(i.t).length))
    ),
  Va = (i, t) => i?.p?.[t] || 0,
  Wm = (i, t, e) =>
    !e ||
    (mi[t].choice
      ? !!((i?.own?.[t] || 0) & (1 << e))
      : (i?.own?.[t] || 0) >= e),
  jx = (i, t) => !t || !!((i?.w?.own || 0) & (1 << t)),
  yz = (i, t) => JSON.stringify(Uo(i)) === JSON.stringify(Uo(t)),
  wz = (i, t) => {
    let e = vz[t][7];
    return !e || Va(i, e[0]) >= e[1];
  };
function Vx(i, t) {
  let e = [];
  for (let n in mi) {
    let o = Va(t, n);
    o &&
      !Wm(i, n, o) &&
      e.push({
        id: n,
        k: o,
        what:
          mi[n].name +
          " \xB7 " +
          (mi[n].choice
            ? mi[n].lv[o][3].split(":")[0]
            : Um[mi[n].lv[o][0]].name),
        price: mi[n].lv[o][1],
      });
  }
  let s = t?.w?.s || 0;
  return (
    s &&
      !jx(i, s) &&
      e.push({
        id: "rim",
        k: s,
        what: "Wheels \xB7 " + Mr[s][0],
        price: Mr[s][3],
      }),
    { items: e, total: e.reduce((n, o) => n + o.price, 0) }
  );
}
function Mz(i) {
  let t = Uo(i) || {};
  t.own ||= {};
  for (let e in mi) {
    let s = Va(t, e);
    s &&
      (mi[e].choice
        ? (t.own[e] = (t.own[e] || 0) | (1 << s))
        : (t.own[e] = Math.max(t.own[e] || 0, s)));
  }
  return (t.w?.s && (t.w.own = (t.w.own || 0) | (1 << t.w.s)), Uo(t));
}
function Sz(i, t) {
  let e = [];
  for (let n in mi) {
    let o = Va(i, n);
    o &&
      mi[n].lv[o][2] > t &&
      e.push({ what: mi[n].name, lvl: mi[n].lv[o][2] });
  }
  let s = i?.w?.s || 0;
  return (s && Mr[s][4] > t && e.push({ what: Mr[s][0], lvl: Mr[s][4] }), e);
}
