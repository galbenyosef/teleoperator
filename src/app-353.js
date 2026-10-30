// app 353 — math
// Lines 170463-170773 of readable/app.pretty.js (statement-aligned).
P0();
es();
P0();
var Dst = () => globalThis.SF_TIER === "mobile" || !!globalThis.SF_LITE,
  GE = {
    tris: () => (Dst() ? 7e4 : 2e5),
    tex: () => (Dst() ? 1024 : 2048),
    bytes: 8.5 * 1048576,
  },
  O4t = ["wheel_fl", "wheel_fr", "wheel_rl", "wheel_rr"],
  B4t = ["caliper_fl", "caliper_fr", "caliper_rl", "caliper_rr"];
function Bv(o) {
  let t = $M(o),
    { L: e, W: s, H: n } = t,
    i = e > 5.1 || n > 1.75 ? vv : e < 4.3 || n < 1.3 ? oE : md,
    a = Math.abs(
      (t.wheels[0][2] + t.wheels[1][2] - (t.wheels[2][2] + t.wheels[3][2])) / 2,
    ),
    r = Math.max(0.65, a / 2),
    l = Math.max(
      0.9,
      (Math.abs(t.wheels[0][0] - t.wheels[1][0]) +
        Math.abs(t.wheels[2][0] - t.wheels[3][0])) /
        2,
    ),
    c = Math.max(0.2, t.wheelR.reduce((p, m) => p + m, 0) / 4),
    h = Math.round(Math.max(800, Math.min(3500, e * s * n * 160))),
    f = h / i.mass,
    u = (r * 2) / (i.a + i.b),
    d = (t.min[2] + t.max[2]) / 2;
  return {
    ...i,
    mass: h,
    izz: i.izz * f * u * u,
    a: r,
    b: r,
    track: l,
    wheelR: c,
    hcg: Math.max(0.38, Math.min(0.75, n * 0.38)),
    ipitch: i.ipitch * f,
    iroll: i.iroll * f,
    brakeF: i.brakeF * Math.sqrt(f),
    brakeR: i.brakeR * Math.sqrt(f),
    box: {
      hx: Math.max(0.5, s / 2 - 0.02),
      hz: Math.max(0.8, e / 2 - 0.03),
      off: -d,
    },
  };
}
function VE(o, t) {
  let e = $M(o.vehicle),
    s = Math.max(0.8, Math.min(1.45, e.L / 4.6)),
    n = Math.max(0.85, Math.min(1.4, 0.6 + (0.4 * e.H) / 1.25));
  return {
    id: "custom",
    name: o.name,
    model: o.own ? "Your mindblown car" : "From mindblown",
    maker: "mindblown inventory",
    ride: o,
    item: !0,
    dir: "",
    glb: "",
    meta: "",
    tex: [],
    load: t,
    spec: Bv(o.vehicle),
    sound: "custom",
    cam: { h: n, dist: s, look: n * 1.05 },
    hl: [e.W * 0.32, Math.max(0.45, e.H * 0.5), e.min[2] + 0.15],
    orbit: { R: 6.4 * s, h: 1.5 * n, look: 0.55 * n },
    stats: [
      [e.L.toFixed(1) + " m", "long"],
      [e.W.toFixed(1) + " m", "wide"],
      [Bv(o.vehicle).mass + " kg", "est. mass"],
    ],
    drives:
      "Made with mindblown. Its handling is set from its size: wheelbase, track and weight.",
    accent: "#b98cff",
    icon: o.icon,
  };
}
function N4t(o) {
  let t = new Le();
  for (let [e, s] of Object.entries(o.attributes)) {
    let n = s.itemSize,
      i = new Float32Array(s.count * n);
    for (let a = 0; a < s.count; a++)
      ((i[a * n] = s.getX(a)),
        n > 1 && (i[a * n + 1] = s.getY(a)),
        n > 2 && (i[a * n + 2] = s.getZ(a)),
        n > 3 && (i[a * n + 3] = s.getW(a)));
    t.setAttribute(e, new Te(i, n));
  }
  o.index && t.setIndex(new Te(o.index.array.slice(), 1));
  for (let e of o.groups) t.addGroup(e.start, e.count, e.materialIndex);
  return t;
}
var gB = (o) => (o.index ? o.index.count : o.attributes.position.count) / 3;
async function H4t(o, t) {
  let e = new Set();
  for (let s of o)
    for (let n of [
      "map",
      "normalMap",
      "roughnessMap",
      "metalnessMap",
      "emissiveMap",
      "aoMap",
    ]) {
      let i = s[n];
      if (!i || e.has(i)) continue;
      e.add(i);
      let a = i.image,
        r = a?.width || 0,
        l = a?.height || 0;
      if (Math.max(r, l) <= t || typeof createImageBitmap != "function")
        continue;
      let c = t / Math.max(r, l);
      try {
        ((i.image = await createImageBitmap(a, {
          resizeWidth: Math.round(r * c),
          resizeHeight: Math.round(l * c),
          resizeQuality: "high",
        })),
          (i.needsUpdate = !0));
      } catch {}
    }
}
async function D4t(o, t) {
  let e = o.reduce((a, r) => a + gB(r), 0);
  if (e <= t) return 0;
  let { MeshoptSimplifier: s } = await Promise.resolve().then(() => (k7(), S7));
  await s.ready;
  let n = t / e,
    i = 0;
  for (let a of o) {
    if (!a.index) continue;
    let r = new Uint32Array(a.index.array),
      l = a.attributes.position.array,
      c = Math.max(3, Math.floor((r.length * n) / 3) * 3),
      [h] = s.simplify(r, l, 3, c, 0.02, ["LockBorder"]);
    ((i += (r.length - h.length) / 3), a.setIndex(new Te(h, 1)));
  }
  return i;
}
async function Ust(o, t) {
  let e = $M(t.vehicle),
    s = null;
  if (o && o.byteLength <= GE.bytes)
    try {
      s = await U4t(o, e);
    } catch (n) {
      console.warn(
        "custom car: its model could not be used, a placeholder instead",
        n,
      );
    }
  else
    o &&
      console.warn(
        "custom car: too large (" +
          o.byteLength +
          " bytes), a placeholder instead",
      );
  return (s || (s = G4t(e)), V4t(s, e));
}
async function U4t(o, t) {
  let e = o.buffer
    ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength)
    : o;
  await dv.ready;
  let n = (await new va().setMeshoptDecoder(dv).parseAsync(e, "./")).scene;
  n.updateMatrixWorld(!0);
  let i = new fe().makeRotationY(Math.PI),
    a = new fe().makeTranslation(0, 0, -t.mid),
    r = (w, _) => {
      for (let z = w; z && z !== n; z = z.parent) {
        let A = _.indexOf((z.name || "").toLowerCase());
        if (A >= 0) return A;
      }
      return -1;
    },
    l = (w) => r(w, O4t),
    c = (w) => r(w, B4t),
    h = (w) => {
      let _ = [
        w.name,
        w.parent?.name,
        ...[w.material].flat().map((z) => z?.name),
      ].join(" ");
      return /tyre|tire/i.test(_)
        ? "Tyre"
        : /caliper/i.test(_)
          ? "Caliper"
          : /disc|rotor|brake/i.test(_)
            ? "Disc"
            : "Rim";
    },
    f = [],
    u = [[], [], [], []],
    d = [[], [], [], []],
    p = new Set();
  if (
    (n.traverse((w) => {
      if (!w.isMesh) return;
      let _ = l(w),
        z = _ < 0 ? c(w) : -1;
      z >= 0 && (_ = z);
      let A = N4t(w.geometry),
        T = new fe().multiplyMatrices(a, i).multiply(w.matrixWorld);
      if (
        (_ >= 0 &&
          T.premultiply(
            new fe().makeTranslation(
              -t.wheels[_][0],
              -t.wheels[_][1],
              -t.wheels[_][2],
            ),
          ),
        A.applyMatrix4(T),
        T.determinant() < 0)
      ) {
        let R = A.index;
        if (R)
          for (let P = 0; P < R.count; P += 3) {
            let C = R.getX(P + 1);
            (R.setX(P + 1, R.getX(P + 2)), R.setX(P + 2, C));
          }
      }
      A.computeBoundingSphere();
      for (let R of [w.material].flat()) p.add(R);
      let E =
        _ >= 0
          ? z >= 0
            ? "Caliper"
            : h(w)
          : w.material?.name || w.name || "Body";
      (z >= 0 ? d[_] : _ >= 0 ? u[_] : f).push({
        g: A,
        m: w.material,
        name: E,
      });
    }),
    !f.length)
  )
    throw new Error("no body");
  let m = await D4t(
    [...f, ...u.flat(), ...d.flat()].map((w) => w.g),
    GE.tris(),
  );
  (m &&
    console.log(
      "custom car: " +
        Math.round(m) +
        " triangles simplified away (the cap " +
        GE.tris() +
        ")",
    ),
    await H4t([...p], GE.tex()));
  for (let w of p)
    ((w.side = $a), w.transparent && w.opacity > 0.98 && (w.transparent = !1));
  let g =
      /glass|window|windscreen|windshield|head|tail|lamp|light|cabin|interior|liner|seat|tyre|tire|rim|wheel|chrome|grille|grill|plate|trim|mirror|exhaust|badge|logo/i,
    b = (w) =>
      !!w &&
      (w.transmission > 0.05 ||
        (w.transparent && w.opacity < 0.95) ||
        /glass|window|windscreen|windshield/i.test(w.name || "")),
    v = (w) =>
      !w ||
      g.test(w.name || "") ||
      b(w) ||
      (w.emissive &&
        Math.max(w.emissive.r, w.emissive.g, w.emissive.b) *
          (w.emissiveIntensity ?? 1) >
          0.3) ||
      (w.metalness > 0.9 && w.roughness < 0.12 && !w.map),
    x = new Map();
  for (let w of f) {
    let _ = w.m;
    v(_) || x.set(_, (x.get(_) || 0) + gB(w.g));
  }
  let y =
    [...x.keys()].find((w) => /^body$|paint|^carbody/i.test(w.name || "")) ||
    null;
  !y && x.size && (y = [...x.entries()].sort((w, _) => _[1] - w[1])[0][0]);
  let M = 0.5;
  if (y?.map?.image && typeof OffscreenCanvas == "function")
    try {
      let w = new OffscreenCanvas(16, 16),
        _ = w.getContext("2d");
      _.drawImage(y.map.image, 0, 0, 16, 16);
      let z = _.getImageData(0, 0, 16, 16).data,
        A = 0;
      for (let T = 0; T < z.length; T += 4)
        A += (0.2126 * z[T] + 0.7152 * z[T + 1] + 0.0722 * z[T + 2]) / 255;
      M = Math.max(0.12, A / 256);
    } catch {}
  let S = y ? W4t(y, f, b) : null;
  return {
    body: f,
    wheels: u,
    calipers: d,
    mats: [...p],
    hasWheels: u.every((w) => w.length),
    paint: y,
    lref: M,
    look: S,
  };
}
