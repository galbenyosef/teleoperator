// app 387 — math
// Lines 193348-193501 of readable/app.pretty.js (statement-aligned).
var w4 = [];
function lit({
  x: o,
  y: t,
  z: e,
  face: s = 0,
  mode: n = "kit",
  cols: i = 8,
  n: a = 24,
  gap: r = 1.25,
  row: l = 2.2,
  seed: c = 11,
  rot: h = 0,
  ground: f = null,
} = {}) {
  let u = c,
    d = () => (u = (u * 16807) % 2147483647) / 2147483647,
    p = new Q0("CharsLineup", 64),
    m = [],
    g = (_ = {}) => {
      let z = _.look || uf(d, { kid: _.kid ?? null });
      m.push({
        look: z,
        pose: _.pose || 0,
        speed: _.speed || 0,
        face: _.expr ?? null,
        k: 0,
      });
    };
  if (n === "expr") for (let _ of [...Object.values(li), 13]) g({ expr: _ });
  else if (n === "poses")
    for (let _ of Object.values(Rn)) g({ pose: _, speed: _ === 0 ? 1.3 : 0 });
  else if (n === "builds")
    for (let _ = 0; _ < 4; _++)
      for (let z = 0; z < 6; z++) {
        let A = uf(d);
        ((A.b = _),
          (A.top = z % 4),
          (A.bottom = z % 3),
          (A.hat = 0),
          (A.bag = 0),
          (A.hair = 1 + (z % 6)),
          (A.mood = 0),
          (A.sc = _ === 3 ? 0.8 : 1),
          m.push({ look: A, pose: 0, speed: 0, face: null, k: 0 }));
      }
  else for (let _ = 0; _ < a; _++) g();
  let b = Math.sin(s),
    v = Math.cos(s),
    x = v,
    y = -b,
    M = m.length,
    S = Math.min(i, M);
  m.forEach((_, z) => {
    let A = z % S,
      T = Math.floor(z / S);
    ((_.x = o + x * (A - (S - 1) / 2) * r - b * T * l),
      (_.z = e + y * (A - (S - 1) / 2) * r - v * T * l),
      (_.y = f ? f(_.x, _.z) : t));
  });
  let w = {
    group: p.group,
    crowd: p,
    people: m,
    rot: h,
    face: s,
    t: 0,
    update(_, z) {
      (p.begin(_), (w.t += _));
      for (let A of m) {
        let T = w.face + w.rot,
          E = Math.hypot(A.x - z.position.x, A.z - z.position.z);
        ((A.pose === Rn.leap || A.pose === Rn.duck) && (A.k = (w.t * 0.6) % 1),
          p.put(A, A.x, A.y, A.z, Math.sin(T), Math.cos(T), w.lod ?? E, {
            speed: A.speed,
            pose: A.pose,
            k: A.k,
            look: A.face,
            car: null,
            snap: !0,
          }));
      }
      p.end();
    },
    dispose() {
      p.group.removeFromParent();
      let _ = w4.indexOf(w);
      _ >= 0 && w4.splice(_, 1);
    },
  };
  return (w4.push(w), w);
}
es();
Pn();
function sN(o, t) {
  let e = document.createElement("canvas");
  e.width = e.height = o;
  let s = e.getContext("2d"),
    n = s.createRadialGradient(o / 2, o / 2, 0, o / 2, o / 2, o / 2);
  for (let [a, r] of t) n.addColorStop(a, r);
  ((s.fillStyle = n), s.fillRect(0, 0, o, o));
  let i = new Sn(e);
  return ((i.colorSpace = Je), i);
}
function j6t() {
  let t = document.createElement("canvas");
  t.width = t.height = 128;
  let e = t.getContext("2d");
  for (let n = 0; n < 14; n++) {
    let i = 64 + (Math.random() - 0.5) * 128 * 0.35,
      a = 128 / 2 + (Math.random() - 0.5) * 128 * 0.35,
      r = 128 * (0.18 + Math.random() * 0.2),
      l = e.createRadialGradient(i, a, 0, i, a, r);
    (l.addColorStop(0, "rgba(255,255,255,0.35)"),
      l.addColorStop(1, "rgba(255,255,255,0)"),
      (e.fillStyle = l),
      e.fillRect(0, 0, 128, 128));
  }
  let s = new Sn(t);
  return ((s.colorSpace = Je), s);
}
function $6t() {
  let e = document.createElement("canvas");
  ((e.width = 64), (e.height = 64));
  let s = e.getContext("2d"),
    n = s.createImageData(64, 64),
    i = Array.from(
      { length: 64 },
      (r, l) =>
        0.72 +
        0.28 *
          Math.sin((l / 64) * Math.PI * 9) ** 2 *
          (0.6 + 0.4 * Math.random()),
    );
  for (let r = 0; r < 64; r++)
    for (let l = 0; l < 64; l++) {
      let c = (l + 0.5) / 64,
        h = Math.min(1, Math.min(c, 1 - c) / 0.22),
        f = h * h * (3 - 2 * h) * i[l] * (0.85 + 0.15 * Math.random()),
        u = (r * 64 + l) * 4;
      ((n.data[u] = n.data[u + 1] = n.data[u + 2] = 255),
        (n.data[u + 3] = Math.round(255 * f)));
    }
  s.putImageData(n, 0, 0);
  let a = new Sn(e);
  return ((a.wrapS = a.wrapT = oi), (a.colorSpace = Je), a);
}
function nN(o, t) {
  (!t && !o.drawRange.count) ||
    (o.setDrawRange(0, t),
    t &&
      ((o.attributes.position.needsUpdate = !0),
      (o.attributes.color.needsUpdate = !0)));
}
