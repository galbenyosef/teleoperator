// app 370 — pose
// Lines 185214-185305 of readable/app.pretty.js (statement-aligned).
var bM = [];
function Ytt({
  x: i,
  y: t,
  z: e,
  face: s = 0,
  mode: n = "kit",
  cols: o = 8,
  n: a = 24,
  gap: r = 1.25,
  row: l = 2.2,
  seed: c = 11,
  rot: h = 0,
  ground: f = null,
} = {}) {
  let u = c,
    d = () => (u = (u * 16807) % 2147483647) / 2147483647,
    p = new R0("CharsLineup", 64),
    m = [],
    g = (z = {}) => {
      let _ = z.look || Nh(d, { kid: z.kid ?? null });
      m.push({
        look: _,
        pose: z.pose || 0,
        speed: z.speed || 0,
        face: z.expr ?? null,
        k: 0,
      });
    };
  if (n === "expr") for (let z of [...Object.values(ni), 13]) g({ expr: z });
  else if (n === "poses")
    for (let z of Object.values(kn)) g({ pose: z, speed: z === 0 ? 1.3 : 0 });
  else if (n === "builds")
    for (let z = 0; z < 4; z++)
      for (let _ = 0; _ < 6; _++) {
        let R = Nh(d);
        ((R.b = z),
          (R.top = _ % 4),
          (R.bottom = _ % 3),
          (R.hat = 0),
          (R.bag = 0),
          (R.hair = 1 + (_ % 6)),
          (R.mood = 0),
          (R.sc = z === 3 ? 0.8 : 1),
          m.push({ look: R, pose: 0, speed: 0, face: null, k: 0 }));
      }
  else for (let z = 0; z < a; z++) g();
  let b = Math.sin(s),
    x = Math.cos(s),
    v = x,
    y = -b,
    M = m.length,
    S = Math.min(o, M);
  m.forEach((z, _) => {
    let R = _ % S,
      T = Math.floor(_ / S);
    ((z.x = i + v * (R - (S - 1) / 2) * r - b * T * l),
      (z.z = e + y * (R - (S - 1) / 2) * r - x * T * l),
      (z.y = f ? f(z.x, z.z) : t));
  });
  let w = {
    group: p.group,
    crowd: p,
    people: m,
    rot: h,
    face: s,
    t: 0,
    update(z, _) {
      (p.begin(z), (w.t += z));
      for (let R of m) {
        let T = w.face + w.rot,
          E = Math.hypot(R.x - _.position.x, R.z - _.position.z);
        ((R.pose === kn.leap || R.pose === kn.duck) && (R.k = (w.t * 0.6) % 1),
          p.put(R, R.x, R.y, R.z, Math.sin(T), Math.cos(T), w.lod ?? E, {
            speed: R.speed,
            pose: R.pose,
            k: R.k,
            look: R.face,
            car: null,
            snap: !0,
          }));
      }
      p.end();
    },
    dispose() {
      p.group.removeFromParent();
      let z = bM.indexOf(w);
      z >= 0 && bM.splice(z, 1);
    },
  };
  return (bM.push(w), w);
}
