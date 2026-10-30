// app 273 — math
// Lines 136107-136187 of readable/app.pretty.js (statement-aligned).
function sQ(o = {}) {
  let t = (r, l, c = 0, h = {}) =>
      new me({ color: r, roughness: l, metalness: c, vertexColors: !0, ...h }),
    e = t(0, 0.4);
  e.userData.mbAlbedo = pf;
  let s = t(0, 0.3);
  s.userData.mbAlbedo = pf;
  let n = t(16777215, 0.2);
  n.userData.mbAlbedo = Mq;
  let i = t(16777215, 0.55, 0, o.furn ? { map: o.furn } : {});
  return (
    (i.userData.mbAlbedo = Rq),
    {
      ...YZ({ ...o, twigs: o.twigs || oyt(), palms: o.palms || ayt() }),
      metal: t(16777215, 0.45, 0.6),
      sign: t(16777215, 0.4, 0, { map: lyt() }),
      paint: t(16777215, 0.5),
      car: new mn({
        color: 16777215,
        roughness: 0.32,
        metalness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        vertexColors: !0,
      }),
      glass: t(16777215, 0.05, 0.1),
      tire: t(16777215, 0.85),
      lamp: e,
      carlamp: s,
      signal: n,
      furn: i,
    }
  );
}
var Bf = (o, t, e = 0) => {
    let s = Math.sin(o * 12.9898 + t * 78.233 + e * 37.719) * 43758.5453;
    return s - Math.floor(s);
  },
  hyt = (o, t) => {
    let e = nI[o]?.length;
    if (!e) return o;
    let s = Math.floor(Bf(t.x, t.z, 9) * e) % e;
    return s ? o + "~" + s : o;
  },
  fyt = {
    palm: [0.035, 0.22],
    fpalm: [0.09, 0.3],
    qpalm: [0.06, 0.25],
    wpalm: [0.07, 0.3],
    cordyline: [0.08, 0.3],
  },
  uyt = new Set(["shrub", "clump", "mat", "ivywall", "flowers"]),
  EF = Qx.map(([o, t]) => (o + t) / 2),
  tv = [640, 2400],
  dyt = [
    [1.3, 0.8],
    [1.3, -0.8],
    [-1.3, 0.8],
    [-1.3, -0.8],
  ];
function RF(o, t) {
  let e = Math.sin(o.rot || 0),
    s = Math.cos(o.rot || 0),
    n = Math.tan(-(o.pitch || 0)),
    i = Math.sin(o.roll || 0),
    a = [0, 0, 0, 0],
    r = 0;
  for (let l = 0; l < 4; l++) {
    let [c, h] = dyt[l],
      f = o.y + c * n + h * i,
      u = t(o.x + e * c + s * h, o.z + s * c - e * h, f);
    if (!Number.isFinite(u) || Math.abs(u - f) > 1.2) return !1;
    ((a[l] = u), (r = Math.max(r, Math.abs(u - f))));
  }
  return r < 0.04 || Math.abs(a[0] - a[1] - a[2] + a[3]) / 2 > 0.15
    ? !1
    : ((o.y = (a[0] + a[1] + a[2] + a[3]) / 4),
      (o.pitch = -Math.atan((a[0] + a[1] - (a[2] + a[3])) / 2 / 2.6)),
      (o.roll = Math.atan((a[0] + a[2] - (a[1] + a[3])) / 2 / 1.6)),
      !0);
}
