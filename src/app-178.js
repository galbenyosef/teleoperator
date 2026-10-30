// app 178 — math
// Lines 104172-104414 of readable/app.pretty.js (statement-aligned).
var Ow = (o) => {
    let t = parseInt(o.slice(1), 16),
      e = (s) => (
        (s /= 255),
        s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
      );
    return [e(t >> 16), e((t >> 8) & 255), e(t & 255)];
  },
  _X = [
    "#8fb3c9",
    "#a7c4a0",
    "#e8d9a8",
    "#d9a7a0",
    "#c6c8cc",
    "#f1ede4",
    "#7d9bb5",
    "#b6a3c7",
    "#e0c07a",
    "#9cb8a9",
    "#d7b8a2",
    "#5f7d8e",
    "#c9d6df",
    "#e6cfd4",
    "#bfb08f",
    "#86a3a0",
    "#d4c5a8",
    "#f2e6c9",
  ].map(Ow),
  EX = [
    "#e9e1d0",
    "#ddd3bf",
    "#efe8da",
    "#d5cab4",
    "#e7d6c0",
    "#cfc7b8",
    "#e3dccf",
    "#d9c3a5",
    "#c9beaa",
    "#f0eadf",
  ].map(Ow),
  W2t = ["#8a4a36", "#7b3f2e", "#94583f", "#6f3a2b", "#a0624a"].map(Ow),
  q2t = [
    "#c7c2b6",
    "#b8b2a4",
    "#d6d0c2",
    "#9d9a92",
    "#a9a295",
    "#8e8a82",
    "#cfc8b8",
  ].map(Ow),
  XX = [
    [0.8, 0.79, 0.75],
    [0.75, 0.74, 0.7],
    [0.62, 0.6, 0.55],
  ],
  Jm = (o, t) => o[Math.floor(t * o.length) % o.length],
  Bn = (o, t = 0) => {
    let e = Math.imul(o | 0, 374761393) ^ Math.imul(t | 0, 668265263);
    return (
      (e = Math.imul(e ^ (e >>> 13), 1274126177)),
      ((e ^ (e >>> 16)) >>> 0) / 4294967296
    );
  },
  j2t = {
    vic: [0.35, 0.67],
    edw: [0.35, 0.67],
    mar: [0.35, 0.67],
    apt: [0.3, 0.61],
    pal: [0.3, 0.62],
    bank: [0.3, 0.7],
    mix: [0.36, 0.64],
    nb: [0.36, 0.64],
    chn: [0.36, 0.64],
    brk: [0.34, 0.67],
    jsq: [0.34, 0.67],
    wrf: [0.3, 0.7],
  },
  uz = {
    0: ["w_siding", "w_stucco"],
    1: ["w_stucco", "w_siding"],
    2: ["w_stucco", "w_brick"],
    3: ["w_stucco", "w_brick"],
    4: ["w_stucco", "w_stucco"],
    5: ["w_brick", "w_brick"],
    7: ["w_concrete", "w_stucco"],
    8: ["w_stucco", "w_concrete"],
  },
  KX = { 0: 0, 1: 9, 2: 1, 3: 2, 4: 10, 5: 6, 6: 3, 7: 7, 8: 8 },
  TX = new Set([0, 1, 2, 3, 4, 5]);
function er(o, t) {
  pc = o;
  let e = o.bld,
    s = [],
    n = [];
  for (let c = e.bRing[t]; c < e.bRing[t + 1]; c++)
    (s.push(e.pts.subarray(e.rStart[c] * 2, e.rStart[c + 1] * 2)),
      n.push(e.front.subarray(e.rStart[c], e.rStart[c + 1])));
  let i = [e.bB[t * 5 + 1], e.bB[t * 5 + 2], e.bB[t * 5 + 3]],
    a = e.roof ? e.roof[t] : 0,
    r = a ? e.roofH[t] : 0,
    l = {
      i: t,
      rings: s,
      fronts: n,
      base: e.bF[t * 3],
      top: e.bF[t * 3 + 1],
      minh: e.bF[t * 3 + 2],
      st: e.bB[t * 5],
      col: i[0] + i[1] + i[2] ? i.map((c) => Math.pow(c / 255, 2.2)) : null,
      mat: e.bB[t * 5 + 4],
      seed: e.seed[t],
      rs: r > 0.5 ? a : 0,
      rh: r > 0.5 ? r : 0,
    };
  {
    let c = gz(o);
    (c.hide[t] && (l.hide = !0),
      c.cut[t] > 0 && (l.cut = c.cut[t]),
      c.tcut[t] > 0 && (l.tcut = c.tcut[t]));
  }
  if (s.length === 1 && l.minh <= 0) {
    let c = s[0],
      [h, f] = Ef(c),
      u = Di(h, f),
      d = u === "seacliff" && l.st !== 8,
      p = u === "sausalito" && (l.st === 0 || l.st === 1);
    if ((f < 700 && u === "presidio") || d || p) {
      (p || (l.tile = !0),
        d && Bn(l.seed, 77) < 0.15 && ((l.tile = !1), (l.roofCol = iK)),
        p && (l.roofCol = RX[Math.floor(Bn(l.seed, 78) * RX.length)]));
      let m = l.top - l.base,
        g = 1e9,
        b = -1e9,
        v = 1e9,
        x = -1e9;
      for (let y = 0; y < c.length; y += 2)
        ((g = Math.min(g, c[y])),
          (b = Math.max(b, c[y])),
          (v = Math.min(v, c[y + 1])),
          (x = Math.max(x, c[y + 1])));
      if (
        !l.rs &&
        m > 3 &&
        m < 22 &&
        c.length <= 40 &&
        (!p || (b - g) * (x - v) < 600)
      ) {
        let y = Math.min(b - g, x - v);
        ((l.rh = Math.max(1.5, Math.min(p ? 3.6 : 4.5, y * (p ? 0.3 : 0.25)))),
          (l.rs = 2),
          (l.top += l.rh));
      }
    }
  }
  return l;
}
var YX = [1, 0.43, 0.27, 1 / 5],
  RX = [
    [0.36, 0.3, 0.25, 1 / 5],
    [0.3, 0.3, 0.31, 1 / 5],
    [0.42, 0.36, 0.3, 1 / 5],
    [0.24, 0.24, 0.25, 1 / 5],
  ];
function Ef(o) {
  let t = 0,
    e = 0,
    s = o.length / 2;
  for (let n = 0; n < s; n++) ((t += o[n * 2]), (e += o[n * 2 + 1]));
  return [t / s, e / s];
}
var AX = new WeakMap();
function JX(o, t) {
  let e = o?.btags;
  if (!e) return 0;
  let s = AX.get(o);
  if (!s) {
    let a =
      e instanceof Uint8Array
        ? e
        : new Uint8Array(e.buffer || e, e.byteOffset || 0, e.byteLength);
    a.byteOffset % 4 && (a = a.slice());
    let r = new DataView(a.buffer, a.byteOffset).getUint32(0, !0),
      l = a.byteOffset + 4;
    ((s = {
      ids: new Uint32Array(a.buffer, l, r),
      info: new Uint8Array(a.buffer, l + r * 4, r),
      shops: new Uint8Array(a.buffer, l + r * 5, r),
    }),
      AX.set(o, s));
  }
  let n = 0,
    i = s.ids.length - 1;
  for (; n <= i;) {
    let a = (n + i) >> 1,
      r = s.ids[a];
    if (r === t) return s.info[a] | (s.shops[a] << 8);
    r < t ? (n = a + 1) : (i = a - 1);
  }
  return 0;
}
var $2t = new Set([
    "nob",
    "russian",
    "pacific",
    "marina",
    "cowhollow",
    "western",
    "richmond",
    "telegraph",
    "tenderloin",
    "northbeach",
    "hayes",
    "mission",
    "castro",
    "dolores",
    "noe",
    "twinpeaks",
    "haight",
  ]),
  PX = new Set(["union", "fidi", "chinatown", "northbeach", "tenderloin"]);
function ZX(o, t, e, s, n, i) {
  let a = s & 7,
    r = s >> 8;
  return (
    o === 6 &&
      t < 46 &&
      !n &&
      $2t.has(e) &&
      a !== 4 &&
      i < 0.75 &&
      (o = i < 0.5 ? 2 : 5),
    o === 0 &&
      (e === "marina" || e === "seacliff" || (e === "cowhollow" && i < 0.4)) &&
      (o = 1),
    (o === 0 || o === 1) && t < 15 && (r > 0 || a === 3) && (o = 3),
    (o === 0 || o === 1) && t > 16 && (o = 2),
    o === 2 && t > 48 && (o = 6),
    (o === 3 || o === 4) && t > 26 && (o = 2),
    (o === 5 || o === 7) && t > 36 && (o = 6),
    o !== 6 && o !== 8 && t < 4.5 && (o = 8),
    o
  );
}
