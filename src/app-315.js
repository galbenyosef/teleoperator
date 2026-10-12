// app 315 — math
// Lines 152099-152347 of readable/app.pretty.js (statement-aligned).
function KI(i, t, e, s = 22) {
  let n = i.flatMap((h) => (h.alt ? [h, h.alt] : [h])),
    o = s + 8,
    a = new Map(),
    r = (h, f) => Math.floor(h / 64) * 100003 + Math.floor(f / 64);
  for (let h of n)
    for (
      let f = Math.floor((h.x - o) / 64);
      f <= Math.floor((h.x + o) / 64);
      f++
    )
      for (
        let u = Math.floor((h.z - o) / 64);
        u <= Math.floor((h.z + o) / 64);
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
var AZ = [
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
  Vvt = [
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
  $vt = [
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
  Yn = {
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
  af = {
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
    ...Nu,
    hotP: 2500,
    evadeP: 2e3,
    heatK: { miss: 0.3, onc: 0.2, fast: 0.15, drift: 0.1, air: 0.2 },
    heatPursuit: 0.5,
  },
  Xvt = {
    miss: "near miss",
    onc: "oncoming lane",
    fast: "reckless speed",
    drift: "drifting in traffic",
    air: "airborne",
  },
  RZ = ["street", "comfort"],
  PZ = {
    evade: ["Lost them.", "Clean.", "Nice."],
    hot: ["Go. Now.", "Drive."],
    made: ["Made it.", "Nice.", "Not bad."],
    mult: ["Nice.", "Okay. Okay."],
  },
  $_ = (i) => PZ[i][(Math.random() * PZ[i].length) | 0],
  XI = class {
    constructor() {
      ((this.k = []), (this.v = []));
    }
    get size() {
      return this.k.length;
    }
    push(t, e) {
      let s = this.k,
        n = this.v,
        o = s.length;
      for (s.push(t), n.push(e); o > 0;) {
        let a = (o - 1) >> 1;
        if (s[a] <= t) break;
        ((s[o] = s[a]), (n[o] = n[a]), (o = a));
      }
      ((s[o] = t), (n[o] = e));
    }
    pop() {
      let t = this.k,
        e = this.v,
        s = e[0],
        n = t.pop(),
        o = e.pop(),
        a = t.length;
      if (a) {
        let r = 0;
        for (;;) {
          let l = 2 * r + 1;
          if (l >= a || (l + 1 < a && t[l + 1] < t[l] && l++, t[l] >= n)) break;
          ((t[r] = t[l]), (e[r] = e[l]), (r = l));
        }
        ((t[r] = n), (e[r] = o));
      }
      return s;
    }
  },
  CZ = (i) => (i._crooked ??= Kvt(i)),
  Kvt = (i) =>
    i.name === "Lombard Street" &&
    i.oneway &&
    (() => {
      let t = Ot(i, (i.s0 + i.s1) / 2, {});
      return t.x > -2310 && t.x < -2140 && t.z > -760 && t.z < -700;
    })(),
  X_ = (i) =>
    !!i &&
    (i.car ?? !0) &&
    !i.inner &&
    i.ja >= 0 &&
    i.jb >= 0 &&
    i.ja !== i.jb &&
    !i.hwy &&
    !i.layered &&
    i.cls !== "service",
  Yvt = -4700,
  LZ = (i) => (i._gg ??= !!i.hwy && Ot(i, i.L / 2, {}).x < Yvt),
  Jvt = (i) =>
    (i._mu ??=
      !!i.layered &&
      !i.hwy &&
      i.cls !== "service" &&
      Ot(i, i.L / 2, {}).z < -2600),
  $I = (i) =>
    X_(i) ||
    (!!i &&
      (i.car ?? !0) &&
      !i.inner &&
      i.ja >= 0 &&
      i.jb >= 0 &&
      i.ja !== i.jb &&
      (LZ(i) || Jvt(i)));
function Zvt(i) {
  if (i._gr !== void 0) return i._gr;
  let t = {},
    e = 0,
    s = null,
    n = 0;
  for (let o = i.s0; o <= i.s1; o += 10)
    (Ot(i, Math.min(o, i.s1), t),
      s !== null && o - n >= 20
        ? ((e = Math.max(e, Math.abs(t.y - s) / (o - n))), (s = t.y), (n = o))
        : s === null && ((s = t.y), (n = o)));
  return (i._gr = e);
}
