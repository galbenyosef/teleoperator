// app 300 — math
// Lines 146542-146722 of readable/app.pretty.js (statement-aligned).
function stt(o, t, { rng: e = S5t, storage: s = null } = {}) {
  if (!s)
    try {
      s = globalThis.localStorage;
    } catch {}
  let n = k5t(o, t),
    i = null;
  try {
    i = JSON.parse(s?.getItem(ett) || "null");
  } catch {}
  let a =
      Array.isArray(i) && i.length >= 2
        ? n.filter((h) => Math.hypot(h.p[0] - i[0], h.p[1] - i[1]) > 600)
        : n,
    r = a.length ? a : n,
    c =
      r[Math.min(r.length - 1, Math.max(0, Math.floor(e() * r.length)))]?.p ||
      Yp(o, t, "California Street", -1371, 385, 1, -0.08, { plateau: !0 });
  try {
    s?.setItem(ett, JSON.stringify(c));
  } catch {}
  return c;
}
function ntt(o, t, e, s) {
  let n = TM(o, t, s[0], s[1], { world: e });
  return n ? [n.x, n.z, n.psi] : null;
}
await No();
var E_ = {
    motorway: 27,
    motorway_link: 17,
    trunk: 14.5,
    trunk_link: 12,
    primary: 13.5,
    primary_link: 11,
    secondary: 12.5,
    secondary_link: 10,
    tertiary: 11.5,
    tertiary_link: 10,
    residential: 9.5,
    unclassified: 9,
    busway: 11,
  },
  z5t = new Set(Object.keys(E_).filter((o) => o !== "busway")),
  _5t = {
    motorway: 1,
    trunk: 1,
    primary: 1,
    secondary: 0.9,
    tertiary: 0.7,
    residential: 0.25,
    unclassified: 0.2,
  },
  E5t = {
    fidi: 1.6,
    towers: 1.6,
    union: 1.7,
    tenderloin: 1.6,
    chinatown: 1.3,
    jackson: 1.3,
    soma: 1.5,
    mission: 1.3,
    northbeach: 1.2,
    wharf: 1.2,
    marina: 1.15,
  },
  T5t = (o) => Math.min(1, (_5t[o.cls] ?? 0.55) * (E5t[o.dist] || 1)),
  Jp = { cycle: 36, green: 14, yellow: 3.5, allRed: 1, C: 40, Cs: 26 },
  R5t = [-900, 700],
  itt = { minG: 6, hold: 8, minS: 6, maxS: 12, gapS: 2 },
  tO = {
    get dice() {
      return globalThis.__SIGX?.dice;
    },
    get vk() {
      return globalThis.__SIGX?.vk;
    },
    get vb() {
      return globalThis.__SIGX?.vb;
    },
  },
  A5t = {
    secondary: 1,
    primary: 1,
    trunk: 1,
    tertiary: 0.6,
    residential: 0.4,
    unclassified: 0.35,
    living_street: 0.25,
    service: 0.25,
  },
  ott = (o, t) => {
    let e =
      Math.imul(o ^ 2654435769, 2246822507) ^
      Math.imul(t + 1663821227, 3266489909);
    return (
      (e ^= e >>> 15),
      (e = Math.imul(e, 739982445)),
      (e ^= e >>> 12),
      (e = Math.imul(e, 695872825)),
      (e ^= e >>> 15),
      (e >>> 0) / 4294967296
    );
  },
  P5t = [
    {
      name: "Powell-Hyde",
      out: [
        ["Powell Street", "Ellis Street", -1264, 1114],
        ["Powell Street", "Jackson Street", -1445, -10],
        ["Hyde Street", "Jackson Street", -2167, 107],
        ["Hyde Street", "Beach Street", -2381, -1237],
      ],
      back: [
        ["Hyde Street", "Washington Street", -2152, 204],
        ["Powell Street", "Washington Street", -1429, 88],
      ],
      n: 4,
    },
    {
      name: "Powell-Mason",
      out: [
        ["Powell Street", "Ellis Street", -1264, 1114],
        ["Powell Street", "Jackson Street", -1445, -10],
        ["Mason Street", "Jackson Street", -1589, 14],
        ["Taylor Street", "Taylor Street", -1913, -1077],
      ],
      back: [
        ["Mason Street", "Washington Street", -1573, 112],
        ["Powell Street", "Washington Street", -1429, 88],
      ],
      n: 4,
    },
    {
      name: "California",
      out: [
        ["California Street", "Drumm Street", -257, 205],
        ["California Street", "Van Ness Avenue", -2541, 574],
      ],
      back: [],
      n: 4,
      doubleEnded: !0,
    },
    {
      name: "F Market",
      out: [
        ["Market Street", "Steuart Street", -132, 136],
        ["Market Street", "Van Ness Avenue", -2270, 2254],
      ],
      back: [],
      n: 6,
      doubleEnded: !0,
      tram: !0,
      pref: "Market Street",
    },
  ];
function eO(o) {
  if (
    ((o.tr =
      !o.inner &&
      o.ja >= 0 &&
      o.jb >= 0 &&
      o.ja !== o.jb &&
      o.s1 - o.s0 > 0.05 &&
      E_[o.cls] !== void 0),
    (o.car = o.tr && z5t.has(o.cls)),
    (o.cab = !!(o.flags & 16)),
    !o.tr && !o.cab)
  )
    return !1;
  let t = kf(o),
    e = t > 0.5 && t < 0.55;
  return (
    (o.lg = {
      med: o.oneway ? 0 : e ? 0.8 : t > 0.2 && t < 0.4 ? 1.6 : 0,
      park: e ? 0.9 : o.flags & 4 ? 0 : 2.3,
      bw: e ? 0 : Cp(o),
    }),
    !0
  );
}
