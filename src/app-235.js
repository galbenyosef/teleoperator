// app 235 — math
// Lines 122538-122755 of readable/app.pretty.js (statement-aligned).
var id = (o) => [
    o[0].isVector3 ? Js(o[0].x, o[0].y - 0.8, o[0].z) : o[0],
    ...o,
  ],
  ZL = (o, t, e, s) =>
    Array.from({ length: s + 1 }, (n, i) => {
      let a = i / s;
      return o
        .clone()
        .multiplyScalar((1 - a) * (1 - a))
        .addScaledVector(t, 2 * a * (1 - a))
        .addScaledVector(e, a * a);
    }),
  qz = (o, t) => {
    let e = t * (o.length - 1),
      s = Math.min(o.length - 2, Math.floor(e));
    return o[s].clone().lerp(o[s + 1], e - s);
  },
  eJ = (o, t) => {
    let e = t * (o.length - 1),
      s = Math.min(o.length - 2, Math.floor(e));
    return o[s + 1].clone().sub(o[s]).normalize();
  },
  Mh = (o, t) => {
    let s = (Math.abs(o.y) < 0.9 ? hi : Js(1, 0, 0))
        .clone()
        .cross(o)
        .normalize(),
      n = o.clone().cross(s),
      i = t() * Math.PI * 2;
    return s.multiplyScalar(Math.cos(i)).addScaledVector(n, Math.sin(i));
  },
  Jxt = {
    plane: {
      per: 9,
      clump: 1.25,
      mass: 0,
      inner0: 0,
      drop: 0.2,
      cells: [0, 1],
      card: [0.8, 1.2],
      cy: 7.4,
      rx: 5.6,
      ryTop: 4.4,
      ryBot: 3.5,
      fork: 3,
      r0: 0.17,
      limbs: 6,
      el: [22, 50],
      rise: 0.8,
      n2: 8,
      n3: 4,
      lobes: 0.8,
      gap: 0.3,
      bark: "bark",
      barkTint: [0.78, 0.78, 0.72],
      leafTint: [1, 1, 1],
    },
    elm: {
      per: 8,
      clump: 1.2,
      mass: 2,
      inner0: 0,
      drop: 0.15,
      cells: [2, 3],
      card: [0.95, 1.35],
      cy: 7.8,
      rx: 4.6,
      ryTop: 3.6,
      ryBot: 3.8,
      fork: 3,
      r0: 0.25,
      limbs: 6,
      el: [58, 78],
      rise: 0.3,
      n2: 8,
      n3: 4,
      lobes: 0.35,
      gap: 0.14,
      vase: 1.3,
      bark: "bark",
      leafTint: [1, 1, 0.95],
    },
    ficus: {
      per: 10,
      clump: 1.15,
      mass: 1,
      inner0: 0.2,
      cells: [4, 5],
      card: [0.85, 1.15],
      cy: 5.4,
      rx: 3.9,
      ryTop: 2.9,
      ryBot: 2.6,
      fork: 2.1,
      r0: 0.22,
      limbs: 7,
      el: [25, 58],
      rise: 0.7,
      n2: 7,
      n3: 5,
      lobes: 0.2,
      gap: 0.05,
      bark: "bark",
      barkTint: [1.25, 1.25, 1.3],
      leafTint: [0.95, 1, 1],
    },
    cypress: {
      per: 17,
      clump: 2.1,
      clumpFlat: 0.3,
      mass: 3,
      inner0: 0.25,
      drop: 0.04,
      tiers: 3,
      massTint: [0.8, 0.85, 0.8],
      cells: [8, 9],
      card: [1.1, 1.6],
      cy: 8.2,
      rx: 8.5,
      ryTop: 3.4,
      ryBot: 4.6,
      fork: 1.5,
      r0: 0.55,
      limbs: 10,
      el: [4, 30],
      rise: 0.2,
      n2: 7,
      n3: 4,
      lobes: 0.7,
      gap: 0.1,
      flat: 0.75,
      excurrent: 0.72,
      bark: "bark_cyp",
      leafTint: [0.9, 0.95, 0.9],
    },
    euc: {
      per: 8,
      clump: 1.8,
      mass: 2,
      inner0: 0,
      drop: 0.15,
      massTint: [0.85, 0.9, 0.85],
      cells: [6, 7],
      card: [1.4, 1.9],
      cy: 18,
      rx: 6.5,
      ryTop: 7,
      ryBot: 8,
      fork: 6.5,
      r0: 0.45,
      limbs: 9,
      el: [40, 70],
      rise: 0.6,
      n2: 7,
      n3: 4,
      lobes: 0.5,
      gap: 0.22,
      hang: 0.75,
      excurrent: 0.85,
      bark: "bark_euc",
      leafTint: [1, 1, 1],
    },
    pine: {
      per: 7,
      clump: 1.2,
      mass: 3,
      inner0: 0.2,
      drop: 0.1,
      cells: [10, 11],
      card: [1.2, 1.6],
      cy: 12.5,
      rx: 5.2,
      ryTop: 5,
      ryBot: 4.5,
      fork: 4.5,
      r0: 0.34,
      limbs: 8,
      el: [15, 45],
      rise: 1,
      n2: 6,
      n3: 4,
      lobes: 0.45,
      gap: 0.22,
      excurrent: 0.8,
      bark: "bark_cyp",
      barkTint: [0.85, 0.8, 0.78],
      leafTint: [1, 1, 1],
    },
  };
function Zxt(o, t) {
  let e = Js(0, o.cy, 0),
    s = Array.from({ length: 7 }, () => [
      Mh(hi, t)
        .add(Js(0, t() * 1.2 - 0.3, 0))
        .normalize(),
      0.4 + t() * 0.6,
    ]),
    n = (i) => {
      let a = i.y > 0 ? o.ryTop : o.ryBot,
        r = o.rx * (1 + (o.vase || 0) * 0.35 * i.y),
        l = 1 / Math.sqrt((i.x / r) ** 2 + (i.y / a) ** 2 + (i.z / r) ** 2);
      o.flat &&
        i.y > 0 &&
        (l = Math.min(l, (o.ryTop * (1 - o.flat * 0.5)) / Math.max(i.y, 0.05)));
      let c = 0;
      for (let [h, f] of s) c += f * Math.pow(Math.max(0, i.dot(h)), 6);
      return l * (1 - o.lobes * 0.35 + o.lobes * 0.9 * c);
    };
  return {
    C: e,
    R: n,
    rel: (i) => {
      let a = i.clone().sub(e);
      return a.length() / n(a.normalize());
    },
  };
}
