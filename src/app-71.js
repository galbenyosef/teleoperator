// app 71 — head
// Lines 68446-68588 of readable/app.pretty.js (statement-aligned).
var Jg = [
  {
    name: "man",
    shin: 12,
    thigh: 12,
    legX: 3.6,
    shinR: 2.5,
    thighR: 3.1,
    pelvis: 4,
    hipW: [7.2, 4.4],
    torso: 14,
    waist: [6.6, 4],
    chest: [7.6, 4.5],
    shoulder: [8.2, 4.2],
    neck: 2,
    head: [12, 13, 12],
    armR: 2.1,
    foreR: 1.8,
    upper: 10,
    fore: 9,
    hand: 4,
    foot: [5, 10],
    scale: [0.95, 1.05],
  },
  {
    name: "woman",
    shin: 12,
    thigh: 11,
    legX: 3.5,
    shinR: 2.3,
    thighR: 3.1,
    pelvis: 4,
    hipW: [7.6, 4.6],
    torso: 13,
    waist: [5.6, 3.6],
    chest: [6.8, 4.5],
    shoulder: [7.2, 3.9],
    neck: 2,
    head: [12, 12, 12],
    armR: 1.8,
    foreR: 1.6,
    upper: 9,
    fore: 8,
    hand: 4,
    foot: [4, 9],
    scale: [0.94, 1.03],
  },
  {
    name: "heavy",
    shin: 12,
    thigh: 11,
    legX: 4.1,
    shinR: 2.8,
    thighR: 3.7,
    pelvis: 4,
    hipW: [8.6, 5.2],
    torso: 14,
    waist: [8.8, 6],
    chest: [8.9, 5.6],
    shoulder: [9, 4.8],
    neck: 2,
    head: [12, 13, 12],
    armR: 2.5,
    foreR: 2.1,
    upper: 10,
    fore: 9,
    hand: 4,
    foot: [5, 10],
    scale: [0.94, 1.02],
  },
  {
    name: "kid",
    shin: 7,
    thigh: 6,
    legX: 2.7,
    shinR: 1.9,
    thighR: 2.3,
    pelvis: 3,
    hipW: [5.4, 3.4],
    torso: 9,
    waist: [4.8, 3.2],
    chest: [5.2, 3.4],
    shoulder: [5.6, 3.2],
    neck: 1,
    head: [12, 12, 11],
    armR: 1.6,
    foreR: 1.5,
    upper: 6,
    fore: 5,
    hand: 3,
    foot: [4, 7],
    kid: 1,
    scale: [0.85, 1.12],
  },
];
var Nd = (i, t, e) => i + (t - i) * Math.min(1, Math.max(0, e)),
  BG = new Map();
function HG(i, t = 0) {
  let e = i * 4 + t,
    s = BG.get(e);
  return (s || BG.set(e, (s = Sht(i, t))), s);
}
var OG = new Map();
function Sht(i, t = 0) {
  let e = OG.get(i);
  e || OG.set(i, (e = kht(i)));
  let { pieces: s, head: n, hip: o, B: a, HT: r } = e,
    l = new NR(),
    c = [1, 2, 4][t],
    h = c === 1 ? n : n.coarse(c);
  for (let u of s) {
    if (
      t === 2 &&
      (u.c1 >> 4 === Zf.hat ||
        u.c1 >> 4 === Zf.prop ||
        u.c1 >> 4 === Zf.glasses ||
        u.c1 >> 4 === Zf.stars ||
        (u.c1 >> 4 === Zf.bag && u.part !== 0))
    )
      continue;
    let d = c === 1 ? u : u === n ? h : u.coarse(c);
    (u.occ && (d.occ = h), wht(d, l, o, J1 * c));
  }
  let f = new De();
  return (
    f.setAttribute("position", new ze(l.p, 3)),
    f.setAttribute("normal", new ze(l.n, 3)),
    f.setAttribute("uv", new ze(l.uv, 2)),
    f.setAttribute("skinIndex", new Cr(l.j, 4)),
    f.setAttribute("skinWeight", new ze(l.w, 4)),
    f.setIndex(l.v > 65535 ? new w0(l.ix, 1) : new Cr(l.ix, 1)),
    (f.boundingSphere = new _n(new xt(0, 0.9, 0), 1.4)),
    (f.userData.vox = {
      build: a.name,
      lod: t,
      verts: l.v,
      tris: l.ix.length / 3,
      height: r * J1,
      hip: o,
    }),
    f
  );
}
