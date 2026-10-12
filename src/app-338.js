// app 338 — math
// Lines 164501-164775 of readable/app.pretty.js (statement-aligned).
async function h5t(i, t) {
  let e = i.buffer
    ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength)
    : i;
  await vF.ready;
  let n = (await new Vr().setMeshoptDecoder(vF).parseAsync(e, "./")).scene;
  n.updateMatrixWorld(!0);
  let o = new ye().makeRotationY(Math.PI),
    a = new ye().makeTranslation(0, 0, -t.mid),
    r = (w, z) => {
      for (let _ = w; _ && _ !== n; _ = _.parent) {
        let R = z.indexOf((_.name || "").toLowerCase());
        if (R >= 0) return R;
      }
      return -1;
    },
    l = (w) => r(w, o5t),
    c = (w) => r(w, a5t),
    h = (w) => {
      let z = [
        w.name,
        w.parent?.name,
        ...[w.material].flat().map((_) => _?.name),
      ].join(" ");
      return /tyre|tire/i.test(z)
        ? "Tyre"
        : /caliper/i.test(z)
          ? "Caliper"
          : /disc|rotor|brake/i.test(z)
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
      let z = l(w),
        _ = z < 0 ? c(w) : -1;
      _ >= 0 && (z = _);
      let R = r5t(w.geometry),
        T = new ye().multiplyMatrices(a, o).multiply(w.matrixWorld);
      if (
        (z >= 0 &&
          T.premultiply(
            new ye().makeTranslation(
              -t.wheels[z][0],
              -t.wheels[z][1],
              -t.wheels[z][2],
            ),
          ),
        R.applyMatrix4(T),
        T.determinant() < 0)
      ) {
        let A = R.index;
        if (A)
          for (let C = 0; C < A.count; C += 3) {
            let P = A.getX(C + 1);
            (A.setX(C + 1, A.getX(C + 2)), A.setX(C + 2, P));
          }
      }
      R.computeBoundingSphere();
      for (let A of [w.material].flat()) p.add(A);
      let E =
        z >= 0
          ? _ >= 0
            ? "Caliper"
            : h(w)
          : w.material?.name || w.name || "Body";
      (_ >= 0 ? d[z] : z >= 0 ? u[z] : f).push({
        g: R,
        m: w.material,
        name: E,
      });
    }),
    !f.length)
  )
    throw new Error("no body");
  let m = await c5t(
    [...f, ...u.flat(), ...d.flat()].map((w) => w.g),
    _z.tris(),
  );
  (m &&
    console.log(
      "custom car: " +
        Math.round(m) +
        " triangles simplified away (the cap " +
        _z.tris() +
        ")",
    ),
    await l5t([...p], _z.tex()));
  for (let w of p)
    ((w.side = Fa), w.transparent && w.opacity > 0.98 && (w.transparent = !1));
  let g =
      /glass|window|windscreen|windshield|head|tail|lamp|light|cabin|interior|liner|seat|tyre|tire|rim|wheel|chrome|grille|grill|plate|trim|mirror|exhaust|badge|logo/i,
    b = (w) =>
      !!w &&
      (w.transmission > 0.05 ||
        (w.transparent && w.opacity < 0.95) ||
        /glass|window|windscreen|windshield/i.test(w.name || "")),
    x = (w) =>
      !w ||
      g.test(w.name || "") ||
      b(w) ||
      (w.emissive &&
        Math.max(w.emissive.r, w.emissive.g, w.emissive.b) *
          (w.emissiveIntensity ?? 1) >
          0.3) ||
      (w.metalness > 0.9 && w.roughness < 0.12 && !w.map),
    v = new Map();
  for (let w of f) {
    let z = w.m;
    x(z) || v.set(z, (v.get(z) || 0) + yF(w.g));
  }
  let y =
    [...v.keys()].find((w) => /^body$|paint|^carbody/i.test(w.name || "")) ||
    null;
  !y && v.size && (y = [...v.entries()].sort((w, z) => z[1] - w[1])[0][0]);
  let M = 0.5;
  if (y?.map?.image && typeof OffscreenCanvas == "function")
    try {
      let w = new OffscreenCanvas(16, 16),
        z = w.getContext("2d");
      z.drawImage(y.map.image, 0, 0, 16, 16);
      let _ = z.getImageData(0, 0, 16, 16).data,
        R = 0;
      for (let T = 0; T < _.length; T += 4)
        R += (0.2126 * _[T] + 0.7152 * _[T + 1] + 0.0722 * _[T + 2]) / 255;
      M = Math.max(0.12, R / 256);
    } catch {}
  let S = y ? d5t(y, f, b) : null;
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
function f5t(i) {
  let t = new Ee({
      name: "CustomPlaceholder",
      color: new $t(0.32, 0.22, 0.55),
      roughness: 0.35,
      metalness: 0.4,
    }),
    e = new Ee({
      name: "CustomGlass",
      color: new $t(0.03, 0.035, 0.04),
      roughness: 0.1,
      metalness: 0.2,
    }),
    s = new Ee({
      name: "CustomTyre",
      color: new $t(0.03, 0.03, 0.03),
      roughness: 0.9,
    }),
    { L: n, W: o, H: a } = i,
    r = Math.max(0.2, i.wheelR[0]),
    l = (i.min[2] + i.max[2]) / 2,
    c = (d, p, m, g, b, x) => {
      let v = new qs(d, p, m);
      return (v.translate(0, g, b), { g: v, m: x });
    },
    h = Math.max(0.3, a * 0.45),
    f = [
      c(o * 0.98, h, n * 0.98, r * 0.6 + h / 2, l, t),
      c(
        o * 0.84,
        a - r * 0.6 - h,
        n * 0.5,
        r * 0.6 + h + (a - r * 0.6 - h) / 2,
        l + n * 0.04,
        e,
      ),
    ],
    u = i.wheelR.map((d) => {
      let p = new ks(d, d, Math.min(0.3, o * 0.14), 20);
      return (p.rotateZ(Math.PI / 2), [{ g: p, m: s, name: "Tyre" }]);
    });
  return {
    body: f,
    wheels: u,
    mats: [t, e, s],
    hasWheels: !0,
    placeholder: !0,
  };
}
function u5t(i, t) {
  let e = new ke();
  e.name = "CustomModel";
  let s = new ke();
  ((s.name = "CustomBody"), e.add(s));
  let n = ({ g: u, m: d, name: p }) => {
    let m = new _e(u, d);
    return ((m.castShadow = !0), (m.receiveShadow = !0), p && (m.name = p), m);
  };
  for (let u of i.body) s.add(n(u));
  let o = t.wheels.map((u, d) => {
      let p = new ke();
      (p.position.set(...u), (p.name = "WheelSteer" + d));
      let m = new ke();
      ((m.name = "WheelSpin" + d), p.add(m));
      for (let g of i.wheels[d] || []) m.add(n(g));
      for (let g of i.calipers?.[d] || []) p.add(n(g));
      return (e.add(p), { c: u, steer: p, spin: m });
    }),
    a = new ke();
  ((a.name = "Car"), (a.rotation.order = "YXZ"), a.add(e));
  let r = (t.min[2] + t.max[2]) / 2,
    l = {
      w: t.W,
      l: t.L,
      cz: r,
      wheels: t.wheels.map((u) => [u[0], u[2]]),
      pivotY: Math.max(0.3, Math.min(0.7, t.H * 0.36)),
      cgZ: 0,
      steerK: i.hasWheels ? 1 : 0,
      tail: [
        [-t.W * 0.34, Math.max(0.4, t.H * 0.55), t.max[2] - 0.05],
        [t.W * 0.34, Math.max(0.4, t.H * 0.55), t.max[2] - 0.05],
      ],
    },
    c = Object.fromEntries(i.mats.map((u, d) => ["M" + d, u])),
    h = 0;
  a.traverse((u) => {
    u.isMesh && (h += yF(u.geometry));
  });
  let f = {
    root: a,
    model: e,
    body: s,
    wheels: o,
    lamps: { tail: [], head: [], signal: [] },
    dims: l,
    materials: c,
    setLamps: () => {},
    onNight: () => {},
    custom: !0,
    placeholder: !!i.placeholder,
    tris: h,
  };
  if (((f.wheelFit = i.placeholder ? null : m5t(f, t)), i.paint)) {
    let u = i.look || {
      col: [0.5, 0.5, 0.5],
      tol: 0.25,
      sep: !0,
      belt: null,
      rough: 0.5,
      metal: 0,
    };
    ((f.paintKit = pl({
      mat: i.paint,
      kind:
        "item" +
        Math.round(i.lref * 100) +
        (u.sep ? "s" : "m") +
        u.col.map((d) => Math.round(d * 50)).join(""),
      factory: i.paint.color.clone(),
      hook: (d) => p5t(d, i.lref, u),
      coatOn: "material",
    })),
      u.belt != null && (f.paintKit.belt = u.belt),
      (f.paintKit.look = u));
  } else
    f.noPaint = i.placeholder
      ? "A stand-in body: its paint is the model's."
      : "Its paint, glass and lamps share one picture in its model, so a wrap would cover the windows.";
  return ((f.noWheelTune = !f.wheelFit), f);
}
