// app 329 — math
// Lines 157745-157995 of readable/app.pretty.js (statement-aligned).
function WO(o, t, e, s = 22) {
  let n = o.flatMap((h) => (h.alt ? [h, h.alt] : [h])),
    i = s + 8,
    a = new Map(),
    r = (h, f) => Math.floor(h / 64) * 100003 + Math.floor(f / 64);
  for (let h of n)
    for (
      let f = Math.floor((h.x - i) / 64);
      f <= Math.floor((h.x + i) / 64);
      f++
    )
      for (
        let u = Math.floor((h.z - i) / 64);
        u <= Math.floor((h.z + i) / 64);
        u++
      ) {
        let d = f * 100003 + u,
          p = a.get(d);
        (p || a.set(d, (p = [])), p.push(h));
      }
  let l = (h, f) => {
      let u = a.get(r(h, f));
      return (
        !!u &&
        u.some((d) => {
          let p = h - d.x,
            m = f - d.z,
            g = p * d.hx + m * d.hz;
          return (
            Math.abs(g) < s && (p - g * d.hx) ** 2 + (m - g * d.hz) ** 2 < 49
          );
        })
      );
    },
    c = 0;
  for (let h = t.length - 1; h >= 0; h--) {
    let f = t[h];
    (f.kind === "car" || f.kind === "flexpost") &&
      l(f.x, f.z) &&
      (t.splice(h, 1), f.kind === "car" && c++);
  }
  for (let h = e.length - 1; h >= 0; h--) {
    let f = e[h];
    (f.parked || f.soft) && l(f.x, f.z) && e.splice(h, 1);
  }
  return c;
}
var wet = [
    "Ana",
    "Marcus",
    "Priya",
    "Jordan",
    "Mei",
    "Diego",
    "Sam",
    "Aisha",
    "Tom",
    "Lena",
    "Kenji",
    "Rosa",
    "Eli",
    "Nora",
    "Dev",
    "Chloe",
    "Omar",
    "Hana",
    "Luca",
    "Grace",
  ],
  mMt = [
    "Running late - no pressure though!",
    "First time in a {car}!",
    "Smooth ride, please.",
    "Is the {car} really a taxi?!",
    "Giants game tonight!",
    "Meeting a friend for dinner.",
    "Got a flight later - take it easy.",
    "Just landed in SF!",
    "Can you take the scenic route? Kidding.",
    "I spill coffee easily...",
    "Date night!",
    "My grandma says these are safer than people.",
    "Heading to work.",
  ],
  gMt = [
    "Just drive.",
    "I\u2019m late. Make it quick.",
    "Don\u2019t stop for anything.",
    "Heard you\u2019re the fastest in the city.",
    "No questions. Just go.",
    "If anyone follows us, lose them.",
    "Take whatever way is fastest.",
    "Ten minutes. Can you do it?",
    "Quietly. Then fast.",
    "I\u2019ve got a flight. Go.",
  ],
  si = {
    stopR: 11,
    stopV: 2.2,
    stopT: 0.45,
    board: 2.2,
    alight: 1.8,
    leave: 8,
    base: 4.5,
    perKm: 3,
    parV: 8.5,
    parAdd: 25,
    parSlow: 2.5,
    parHwy: 18,
    perKmHwy: 2,
    toll: 10,
    crossK: 0.15,
    crossMax: 11e3,
    turnC: 300,
    brakeA: 7,
    brakeD: 0.6,
    brakeLeak: 2,
    cornerA: 13,
    cornerD: 1,
    cornerLeak: 1.5,
    bumpV: 3,
    crashV: 6,
    joltA: 16,
    tipK: 0.25,
    tipMin: 40,
    smoothM: 400,
    smoothMax: 3,
    lateK: 0.25,
    floorK: 0.5,
    robotTip: 0.5,
  },
  Gf = {
    stopR: 14,
    stopV: 4.2,
    stopT: 0.12,
    board: 0.9,
    alight: 0.8,
    leave: 16,
    parV: 10,
    parAdd: 18,
    earlyK: 0.6,
    lateK: 0.4,
    bankRate: 250,
    ...bd,
    hotP: 2500,
    evadeP: 2e3,
    heatK: { miss: 0.3, onc: 0.2, fast: 0.15, drift: 0.1, air: 0.2 },
    heatPursuit: 0.5,
  },
  bMt = {
    miss: "near miss",
    onc: "oncoming lane",
    fast: "reckless speed",
    drift: "drifting in traffic",
    air: "airborne",
  },
  Met = ["street", "comfort"],
  ket = {
    evade: ["Lost them.", "Clean.", "Nice."],
    hot: ["Go. Now.", "Drive."],
    made: ["Made it.", "Nice.", "Not bad."],
    mult: ["Nice.", "Okay. Okay."],
  },
  hE = (o) => ket[o][(Math.random() * ket[o].length) | 0],
  VO = class {
    constructor() {
      ((this.k = []), (this.v = []));
    }
    get size() {
      return this.k.length;
    }
    push(t, e) {
      let s = this.k,
        n = this.v,
        i = s.length;
      for (s.push(t), n.push(e); i > 0;) {
        let a = (i - 1) >> 1;
        if (s[a] <= t) break;
        ((s[i] = s[a]), (n[i] = n[a]), (i = a));
      }
      ((s[i] = t), (n[i] = e));
    }
    pop() {
      let t = this.k,
        e = this.v,
        s = e[0],
        n = t.pop(),
        i = e.pop(),
        a = t.length;
      if (a) {
        let r = 0;
        for (;;) {
          let l = 2 * r + 1;
          if (l >= a || (l + 1 < a && t[l + 1] < t[l] && l++, t[l] >= n)) break;
          ((t[r] = t[l]), (e[r] = e[l]), (r = l));
        }
        ((t[r] = n), (e[r] = i));
      }
      return s;
    }
  },
  zet = (o) => (o._crooked ??= xMt(o)),
  xMt = (o) =>
    o.name === "Lombard Street" &&
    o.oneway &&
    (() => {
      let t = Ot(o, (o.s0 + o.s1) / 2, {});
      return t.x > -2310 && t.x < -2140 && t.z > -760 && t.z < -700;
    })(),
  fE = (o) =>
    !!o &&
    (o.car ?? !0) &&
    !o.inner &&
    o.ja >= 0 &&
    o.jb >= 0 &&
    o.ja !== o.jb &&
    !o.hwy &&
    !o.layered &&
    o.cls !== "service",
  vMt = -4700,
  _et = (o) =>
    (o._gg ??= On("highways") && !!o.hwy && Ot(o, o.L / 2, {}).x < vMt),
  yMt = (o) =>
    (o._mu ??=
      On("local") &&
      !!o.layered &&
      !o.hwy &&
      o.cls !== "service" &&
      Ot(o, o.L / 2, {}).z < -2600),
  GO = (o) =>
    fE(o) ||
    (!!o &&
      (o.car ?? !0) &&
      !o.inner &&
      o.ja >= 0 &&
      o.jb >= 0 &&
      o.ja !== o.jb &&
      (_et(o) || yMt(o)));
function wMt(o) {
  if (o._gr !== void 0) return o._gr;
  let t = {},
    e = 0,
    s = null,
    n = 0;
  for (let i = o.s0; i <= o.s1; i += 10)
    (Ot(o, Math.min(i, o.s1), t),
      s !== null && i - n >= 20
        ? ((e = Math.max(e, Math.abs(t.y - s) / (i - n))), (s = t.y), (n = i))
        : s === null && ((s = t.y), (n = i)));
  return (o._gr = e);
}
