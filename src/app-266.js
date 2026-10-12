// app 266 — position
// Lines 133322-133568 of readable/app.pretty.js (statement-aligned).
var abt = 1.05,
  km = 0.42,
  rbt = 0.5,
  FL = (i) => (i <= 0 ? 0 : i >= 1 ? 1 : i * i * (3 - 2 * i));
function mY(i, t) {
  let e = i.geometry,
    s = e.attributes.position;
  if (!s) return null;
  let n = e.index ? e.index.array : null,
    o = (n ? n.length : s.count) / 3,
    a = (x, v) => (n ? n[x * 3 + v] : x * 3 + v),
    r = [],
    l = [[], []];
  for (let x = 0; x < o; x++) {
    let v = 0,
      y = 0,
      M = 0;
    for (let w = 0; w < 3; w++) {
      let z = a(x, w);
      ((v += s.getX(z)), (y += s.getY(z)), (M += s.getZ(z)));
    }
    ((v /= 3),
      (y /= 3),
      (M /= 3),
      M > t.z0 &&
      M < t.z1 &&
      y > t.y0 &&
      y < t.y1 &&
      Math.abs(v) > t.xIn - (y - t.y0) * (t.hinge.lean || 0)
        ? l[v > 0 ? 1 : 0].push(x)
        : r.push(x));
  }
  if (l[0].length < 50 || l[1].length < 50) return null;
  let c = new De();
  for (let x in e.attributes) c.setAttribute(x, e.attributes[x]);
  (c.setIndex(r.flatMap((x) => [a(x, 0), a(x, 1), a(x, 2)])),
    c.computeBoundingSphere(),
    c.computeBoundingBox());
  let h = (x, v, y) => {
      let M = new De();
      for (let S in e.attributes) {
        let w = e.attributes[S],
          z = w.itemSize,
          _ = new w.array.constructor(x.length * 3 * z);
        (x.forEach((R, T) => {
          for (let E = 0; E < 3; E++) {
            let A = a(R, E);
            for (let C = 0; C < z; C++)
              _[(T * 3 + E) * z + C] = w.array[A * z + C];
          }
        }),
          M.setAttribute(S, new Te(_, z, w.normalized)));
      }
      return (M.translate(-v, -t.y0, -y), M.computeBoundingSphere(), M);
    },
    f = i.parent,
    u = Array.isArray(i.material) ? i.material[0] : i.material,
    d = u.clone();
  ((d.side = Ss), (d.userData = { ...u.userData }), (i.geometry = c));
  let p = [-1, 1].map((x, v) => {
      let y = x * t.hinge.x,
        M = t.hinge.z,
        S = new ke();
      ((S.name = "DoorHinge" + (x < 0 ? "L" : "R")),
        S.position.set(
          y + i.position.x,
          t.y0 + i.position.y,
          M + i.position.z,
        ));
      let w = new ke();
      ((w.rotation.z = x * Math.atan(t.hinge.lean || 0)), S.add(w));
      let z = new ke();
      w.add(z);
      let _ = new _e(h(l[v], y, M), u);
      return (
        (_.name = i.name + "Door" + (x < 0 ? "L" : "R")),
        (_.castShadow = i.castShadow),
        (_.receiveShadow = i.receiveShadow),
        (_.rotation.z = -w.rotation.z),
        z.add(_),
        f.add(S),
        { s: x, pivot: S, swing: z, a: 0, t: -1, hold: 0 }
      );
    }),
    m = null;
  if (t.cabin) {
    let [x, v, y, M, S, w, z = 1] = t.cabin,
      _ = new qs(M - x, S - v, w - y),
      R = _.attributes.position;
    for (let T = 0; T < R.count; T++) R.getY(T) > 0 && R.setX(T, R.getX(T) * z);
    (_.computeVertexNormals(),
      (m = new _e(_, new Ee({ color: 723982, roughness: 0.9, side: ia }))),
      m.position.set(
        (x + M) / 2 + i.position.x,
        (v + S) / 2 + i.position.y,
        (y + w) / 2 + i.position.z,
      ),
      (m.name = "CabinInside"),
      (m.visible = !1),
      (m.castShadow = !1),
      f.add(m));
  }
  let g = () => {
      ((d.userData.mbAlbedo !== u.userData.mbAlbedo ||
        d.userData.mbExtraMap !== u.userData.mbExtraMap) &&
        (d.userData = { ...u.userData }),
        d.color.equals(u.color) || d.color.copy(u.color));
      for (let x of [
        "map",
        "clearcoat",
        "clearcoatRoughness",
        "roughness",
        "metalness",
      ])
        d[x] !== u[x] && (d[x] = u[x]);
      b._ver !== u.version && ((b._ver = u.version), (d.needsUpdate = !0));
    },
    b = {
      sides: p,
      open: [0, 0],
      pulse(x, v = 1) {
        let y = p[x < 0 ? 0 : 1];
        ((y.t < 0 || y.t > km) &&
          (y.t = Math.max(0, Math.min(y.t < 0 ? 0 : km, FL(y.a) * km))),
          (y.hold = v),
          (y.on = !0));
      },
      update(x) {
        let v = !1;
        g();
        for (let y of p)
          if (!(!y.on && y.a <= 0)) {
            if (((y.t += x), y.t < km)) y.a = FL(y.t / km);
            else if (y.t < km + y.hold) y.a = 1;
            else {
              let M = (y.t - km - y.hold) / rbt;
              ((y.a = 1 - FL(M)),
                M >= 1 && ((y.a = 0), (y.on = !1), (y.t = -1)));
            }
            ((y.swing.rotation.y = y.s * abt * y.a),
              (b.open[y.s < 0 ? 0 : 1] = y.a),
              y.a > 0.01 && (v = !0));
          }
        m && (m.visible = v);
        for (let y of p) {
          let M = y.swing.children[0],
            S = y.a > 0.01 ? d : u;
          M.material !== S && (M.material = S);
        }
      },
    };
  return b;
}
var lx = "assets/waymo/",
  gY = new Map();
function h_(i, t) {
  let e = gY.get(i);
  return (
    e ||
      gY.set(
        i,
        (e = Fr(lx + i, (s) => {
          ((s.colorSpace = t ? is : On), (s.flipY = !1), (s.anisotropy = 8));
        })),
      ),
    e
  );
}
async function bY(i, t, e = h_) {
  let s = await new Vr().parseAsync(
      i.buffer ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength) : i,
      "./",
    ),
    n = e("waymo_albedo.webp", !0),
    o = e("waymo_orm.webp", !1),
    a = e("waymo_emit.webp", !0),
    r = new An({
      name: "WaymoBody",
      map: n,
      roughnessMap: o,
      metalnessMap: o,
      clearcoatMap: o,
      roughness: 1,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      envMapIntensity: 1,
    });
  return (
    (r.userData.mbExtraMap = o),
    (r.userData.mbAlbedo = xY(null)),
    lbt(s, t, r, a)
  );
}
function xY(i) {
  return (
    xm +
    (i ? a_({ g: 1, b: 1, ...i }) : "") +
    `
// (polish) the sensor bar across the bonnet's back between the fender pods - all the hood camera sees of the car (the
// body's frame: y ~1.1, z -1.15 .. -1.6, the pods at x +-0.83): its near mirror-smooth coat (the ORM map's full coat at 0.035) caught an oncoming car's
// lamps as a pin-point glint, a fraction of a pixel that flashed with the TAA's jitter. A satin coat there (rougher,
// thinner) and the lamps' least roughness on it (gHPL.y): a soft sheen, not a spark. coat: the ORM map's coat (o.r)
fn wmBar(wp: vec3f, coat: f32) {
  let m3 = mat3x3f(O.model[0].xyz, O.model[1].xyz, O.model[2].xyz); let lp = transpose(cofactor(m3)) * (wp - O.model[3].xyz) / dot(m3[0], cross(m3[1], m3[2]));
  let bar = smoothstep(0.98, 1.03, lp.y) * (1.0 - smoothstep(1.22, 1.27, lp.y)) * smoothstep(-1.72, -1.66, lp.z) * (1.0 - smoothstep(-1.12, -1.06, lp.z)) * (1.0 - smoothstep(0.98, 1.02, abs(lp.x)));
  if (bar > 0.001) { gHC = vec2f(max(coat, 1e-3) * mix(1.0, 0.45, bar), mix(0.04, 0.34, bar)); gHPL = vec2f(1.0, 0.4 * bar); }
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {${
      i
        ? `
  let fwP = length(fwidth((F.nf * vec4f(wp, 1.0)).xyz * ${(i.flakeScale || 1400).toFixed(1)}));`
        : ""
    }
  let t = textureSample(matMap, matSamp, uv); let o = textureSample(matExtra, matSamp, uv);
  // (the glass: coated (o.r 0.56 the tinted panes, 0.94 the black glass), smooth (roughness <= 0.13) and dark; the paint:
  // the full coat at roughness 0.25)
  let dk = 1.0 - smoothstep(0.03, 0.06, dot(t.rgb, vec3f(0.2126, 0.7152, 0.0722)));
  let gl = smoothstep(0.45, 0.52, o.r) * (1.0 - smoothstep(0.14, 0.18, o.g)) * dk;
  let pt = smoothstep(0.8, 0.9, o.r) * smoothstep(0.15, 0.2, o.g) * (1.0 - smoothstep(0.4, 0.5, o.g));
  let rv = reflect(-normalize(F.camPos.xyz - wp), gNw); let crn = crNight();
  let cty = crCity(wp, rv, crn); let pR = pt * crn * 0.35;
  gHR = vec4f(cty.rgb * cty.a * mix(0.25, 1.0, gl), max(0.85 * gl, pR) * cty.a); gHRe = crE; gHCR = max(0.85 * gl, pR) * cty.a;
  // (the lights in the glass a little stronger than its 4 % Fresnel: the lamps' and the shops' glints read on the dark panes)
  let ndv = abs(dot(gNw, normalize(F.camPos.xyz - wp)));
  gHE = crE * cty.a * gl * (0.05 + 0.3 * pow(1.0 - ndv, 4.0));
  wmBar(wp, o.r);${
    i
      ? `
  let lum = dot(t.rgb, vec3f(0.2126, 0.7152, 0.0722)); let sat = max(t.r, max(t.g, t.b)) - min(t.r, min(t.g, t.b));
  var pm = pt * smoothstep(0.5, 0.66, lum) * (1.0 - smoothstep(0.07, 0.14, sat)) * (1.0 - gl);
  // (gen68) its hardware keeps its own white and black whatever the paint: everything over the roof (the lidar dome, its
  // ring and the roof rack), the mirror-mounted sensor pods and the bumpers' corner pods (the body mesh's frame: the roof
  // at y <= 1.55, the doors' side at |x| <= 0.95 - the pods stand out past 0.98)
  let m3 = mat3x3f(O.model[0].xyz, O.model[1].xyz, O.model[2].xyz); let lp = transpose(cofactor(m3)) * (wp - O.model[3].xyz) / dot(m3[0], cross(m3[1], m3[2]));
  let out = smoothstep(0.972, 0.992, abs(lp.x));
  pm = pm * (1.0 - smoothstep(1.562, 1.6, lp.y)) * (1.0 - out * smoothstep(0.93, 0.97, lp.y)) * (1.0 - out * smoothstep(1.85, 1.95, abs(lp.z)));
  var pc = vec4f(0.0); var pk = vec4f(o.g, o.b, 0.0, 1.0); var pn = vec4f(0.0);
  if (pm > 0.002) { pc = carPaintW(wp, vec4f(bc.rgb * clamp(lum / 0.82, 0.6, 1.1), 1.0), fwP); pk = gHK; pn = gHN; }
  gHK = vec4f(mix(o.g, pk.x, pm), mix(o.b, pk.y, pm), 0.0, 1.0); gHN = vec4f(pn.xyz * pm, pn.w); gHF0 = mix(1.0, gHF0, pm);
  return vec4f(mix(t.rgb * (1.0 - 0.15 * F.skyG.y * 0.0), pc.rgb, pm), t.a);`
      : `
  return vec4f(bc.rgb * t.rgb, bc.a * t.a);`
  }
}`
  );
}
