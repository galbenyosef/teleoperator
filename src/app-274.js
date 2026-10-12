// app 274 — math
// Lines 135838-135918 of readable/app.pretty.js (statement-aligned).
function QY(i = {}) {
  let t = (r, l, c = 0, h = {}) =>
      new Ee({ color: r, roughness: l, metalness: c, vertexColors: !0, ...h }),
    e = t(0, 0.4);
  e.userData.mbAlbedo = Oh;
  let s = t(0, 0.3);
  s.userData.mbAlbedo = Oh;
  let n = t(16777215, 0.2);
  n.userData.mbAlbedo = yW;
  let o = t(16777215, 0.55, 0, i.furn ? { map: i.furn } : {});
  return (
    (o.userData.mbAlbedo = EW),
    {
      ...$Y({ ...i, twigs: i.twigs || Fbt(), palms: i.palms || Nbt() }),
      metal: t(16777215, 0.45, 0.6),
      sign: t(16777215, 0.4, 0, { map: Obt() }),
      paint: t(16777215, 0.5),
      car: new An({
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
      furn: o,
    }
  );
}
var of = (i, t, e = 0) => {
    let s = Math.sin(i * 12.9898 + t * 78.233 + e * 37.719) * 43758.5453;
    return s - Math.floor(s);
  },
  Dbt = (i, t) => {
    let e = EC[i]?.length;
    if (!e) return i;
    let s = Math.floor(of(t.x, t.z, 9) * e) % e;
    return s ? i + "~" + s : i;
  },
  Ubt = {
    palm: [0.035, 0.22],
    fpalm: [0.09, 0.3],
    qpalm: [0.06, 0.25],
    wpalm: [0.07, 0.3],
    cordyline: [0.08, 0.3],
  },
  Gbt = new Set(["shrub", "clump", "mat", "ivywall", "flowers"]),
  JL = dx.map(([i, t]) => (i + t) / 2),
  px = [640, 2400],
  Wbt = [
    [1.3, 0.8],
    [1.3, -0.8],
    [-1.3, 0.8],
    [-1.3, -0.8],
  ];
function QL(i, t) {
  let e = Math.sin(i.rot || 0),
    s = Math.cos(i.rot || 0),
    n = Math.tan(-(i.pitch || 0)),
    o = Math.sin(i.roll || 0),
    a = [0, 0, 0, 0],
    r = 0;
  for (let l = 0; l < 4; l++) {
    let [c, h] = Wbt[l],
      f = i.y + c * n + h * o,
      u = t(i.x + e * c + s * h, i.z + s * c - e * h, f);
    if (!Number.isFinite(u) || Math.abs(u - f) > 1.2) return !1;
    ((a[l] = u), (r = Math.max(r, Math.abs(u - f))));
  }
  return r < 0.04 || Math.abs(a[0] - a[1] - a[2] + a[3]) / 2 > 0.15
    ? !1
    : ((i.y = (a[0] + a[1] + a[2] + a[3]) / 4),
      (i.pitch = -Math.atan((a[0] + a[1] - (a[2] + a[3])) / 2 / 2.6)),
      (i.roll = Math.atan((a[0] + a[2] - (a[1] + a[3])) / 2 / 1.6)),
      !0);
}
