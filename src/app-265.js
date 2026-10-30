// app 265 — position
// Lines 133530-133840 of readable/app.pretty.js (statement-aligned).
function xc(
  o = {},
  {
    detail: t = 0.35,
    lumRef: e = 0.45,
    scale: s = 165,
    coat: n = 1,
    coatRough: i = 0.035,
    repaint: a = null,
  } = {},
) {
  let r = { ...kh, ...lZ, ...o };
  return (
    Gx +
    Vx(r) +
    `
fn gCarbon(wp: vec3f, fwp: vec3f) -> vec2f {   // (fwp: fwidth of the weave's coordinates, taken in uniform control flow)
  let R = mat3x3f(F.nf[0].xyz, F.nf[1].xyz, F.nf[2].xyz);
  let pc = (F.nf * vec4f(wp, 1.0)).xyz * ${In(s)};
  let nb = R * gNw; let a = abs(nb);
  var q = pc.xz; var fq = fwp.xz; var ua = vec3f(1.0, 0.0, 0.0); var va = vec3f(0.0, 0.0, 1.0);
  if (a.x > a.y && a.x > a.z) { q = pc.zy; fq = fwp.zy; ua = vec3f(0.0, 0.0, 1.0); va = vec3f(0.0, 1.0, 0.0); }
  else if (a.z > a.y) { q = pc.xy; fq = fwp.xy; ua = vec3f(1.0, 0.0, 0.0); va = vec3f(0.0, 1.0, 0.0); }
  let c = floor(q); let fr = fract(q);
  let k = ((i32(c.x) + i32(c.y)) % 4 + 4) % 4;
  let warp = k < 2;
  let tow = sin(select(fr.x, fr.y, warp) * 3.14159265);
  let tw = normalize(transpose(R) * select(va, ua, warp));
  let v = normalize(F.camPos.xyz - wp); let h = normalize(v + normalize(F.sunDir.xyz));
  let sheen = pow(clamp(1.0 - abs(dot(h, tw)), 0.0, 1.0), 3.0);
  let vis = 1.0 - smoothstep(0.35, 1.1, length(fq));
  return vec2f(mix(1.0, mix(0.55, 1.6, sheen) * (0.7 + 0.3 * tow), vis), mix(0.42, 0.3 + 0.2 * (1.0 - tow), vis));
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp);
  let t = textureSample(matMap, matSamp, uv); let mk = textureSample(matExtra, matSamp, uv);
  ${a ? "var" : "let"} p = mk.r; let cb = mk.g; let bk = mk.b; let gl = 1.0 - mk.a; ${a ? "var" : "let"} rest = clamp(1.0 - p - cb - bk - gl, 0.0, 1.0);   // (gl: dark glass-black - the Corvette's engine cover, fix34)
  let lum = dot(t.rgb, vec3f(0.2126, 0.7152, 0.0722));${
    a
      ? `
  { let ch = t.rgb / max(t.r + t.g + t.b, 1e-3); let rf = vec3f(${a.map(In).join(", ")}); let rc = rf / max(rf.x + rf.y + rf.z, 1e-3);
    let q = (1.0 - smoothstep(0.1, 0.3, length(ch - rc))) * smoothstep(0.03, 0.12, lum); let mv = rest * q; p = p + mv; rest = rest - mv; }`
      : ""
  }
  let sh = mix(1.0, clamp(lum / ${In(e)}, 0.55, 1.08), ${In(t)});
  // (each surface's shading only where it has weight: the paint's flakes and the weave are the hook's cost; their
  // derivatives taken first - fwidth in a branch on a texel's weight is not uniform control flow: the module failed to
  // compile and the body fell back to the plain textured material, the generator's colours as they are)
  let po = (F.nf * vec4f(wp, 1.0)).xyz; let fwP = length(fwidth(po * ${In(r.flakeScale)})); let fwC = fwidth(po * ${In(s)});
  var pc = vec4f(0.0); var pk = vec4f(0.5, 0.0, 0.0, 1.0); var pn = vec4f(0.0);
  if (p > 0.002) { pc = carPaintW(wp, vec4f(bc.rgb * sh, 1.0), fwP); pk = gHK; pn = gHN; gHF0 = mix(1.0, gHF0, p); }
  var cbn = vec2f(1.0, 0.4); if (cb > 0.002) { cbn = gCarbon(wp, fwC); }
  gHK = vec4f(pk.x * p + cbn.y * cb + 0.5 * bk + 0.4 * gl + 0.45 * rest, pk.y * p, 0.0, 1.0);
  gHN = vec4f(pn.xyz * p, pn.w);
  gHC = vec2f(max(${In(n)} * p + 0.55 * cb + 0.2 * bk + 0.25 * gl + 0.35 * rest, 0.002), mix(mix(0.12, ${In(i)}, p), 0.08, gl));
  gHSS = 1.0 - 0.85 * clamp(p, 0.0, 1.0);
  let alb = pc.rgb * p + vec3f(0.05, 0.05, 0.055) * cbn.x * cb + vec3f(0.018, 0.018, 0.02) * bk + vec3f(0.008, 0.008, 0.009) * gl + t.rgb * rest;
  return vec4f(alb, 1.0);
}
`
  );
}
P0();
es();
var A3t = 1.05,
  u2 = 0.42,
  P3t = 0.5,
  fF = (o) => (o <= 0 ? 0 : o >= 1 ? 1 : o * o * (3 - 2 * o));
function xZ(o, t) {
  let e = o.geometry,
    s = e.attributes.position;
  if (!s) return null;
  let n = e.index ? e.index.array : null,
    i = (n ? n.length : s.count) / 3,
    a = (v, x) => (n ? n[v * 3 + x] : v * 3 + x),
    r = [],
    l = [[], []];
  for (let v = 0; v < i; v++) {
    let x = 0,
      y = 0,
      M = 0;
    for (let w = 0; w < 3; w++) {
      let _ = a(v, w);
      ((x += s.getX(_)), (y += s.getY(_)), (M += s.getZ(_)));
    }
    ((x /= 3),
      (y /= 3),
      (M /= 3),
      M > t.z0 &&
      M < t.z1 &&
      y > t.y0 &&
      y < t.y1 &&
      Math.abs(x) > t.xIn - (y - t.y0) * (t.hinge.lean || 0)
        ? l[x > 0 ? 1 : 0].push(v)
        : r.push(v));
  }
  if (l[0].length < 50 || l[1].length < 50) return null;
  let c = new Le();
  for (let v in e.attributes) c.setAttribute(v, e.attributes[v]);
  (c.setIndex(r.flatMap((v) => [a(v, 0), a(v, 1), a(v, 2)])),
    c.computeBoundingSphere(),
    c.computeBoundingBox());
  let h = (v, x, y) => {
      let M = new Le();
      for (let S in e.attributes) {
        let w = e.attributes[S],
          _ = w.itemSize,
          z = new w.array.constructor(v.length * 3 * _);
        (v.forEach((A, T) => {
          for (let E = 0; E < 3; E++) {
            let R = a(A, E);
            for (let P = 0; P < _; P++)
              z[(T * 3 + E) * _ + P] = w.array[R * _ + P];
          }
        }),
          M.setAttribute(S, new Te(z, _, w.normalized)));
      }
      return (M.translate(-x, -t.y0, -y), M.computeBoundingSphere(), M);
    },
    f = o.parent,
    u = Array.isArray(o.material) ? o.material[0] : o.material,
    d = u.clone();
  ((d.side = ls), (d.userData = { ...u.userData }), (o.geometry = c));
  let p = [-1, 1].map((v, x) => {
      let y = v * t.hinge.x,
        M = t.hinge.z,
        S = new le();
      ((S.name = "DoorHinge" + (v < 0 ? "L" : "R")),
        S.position.set(
          y + o.position.x,
          t.y0 + o.position.y,
          M + o.position.z,
        ));
      let w = new le();
      ((w.rotation.z = v * Math.atan(t.hinge.lean || 0)), S.add(w));
      let _ = new le();
      w.add(_);
      let z = new ye(h(l[x], y, M), u);
      return (
        (z.name = o.name + "Door" + (v < 0 ? "L" : "R")),
        (z.castShadow = o.castShadow),
        (z.receiveShadow = o.receiveShadow),
        (z.rotation.z = -w.rotation.z),
        _.add(z),
        f.add(S),
        { s: v, pivot: S, swing: _, a: 0, t: -1, hold: 0 }
      );
    }),
    m = null;
  if (t.cabin) {
    let [v, x, y, M, S, w, _ = 1] = t.cabin,
      z = new Is(M - v, S - x, w - y),
      A = z.attributes.position;
    for (let T = 0; T < A.count; T++) A.getY(T) > 0 && A.setX(T, A.getX(T) * _);
    (z.computeVertexNormals(),
      (m = new ye(z, new me({ color: 723982, roughness: 0.9, side: pa }))),
      m.position.set(
        (v + M) / 2 + o.position.x,
        (x + S) / 2 + o.position.y,
        (y + w) / 2 + o.position.z,
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
      for (let v of [
        "map",
        "clearcoat",
        "clearcoatRoughness",
        "roughness",
        "metalness",
      ])
        d[v] !== u[v] && (d[v] = u[v]);
      b._ver !== u.version && ((b._ver = u.version), (d.needsUpdate = !0));
    },
    b = {
      sides: p,
      open: [0, 0],
      pulse(v, x = 1) {
        let y = p[v < 0 ? 0 : 1];
        ((y.t < 0 || y.t > u2) &&
          (y.t = Math.max(0, Math.min(y.t < 0 ? 0 : u2, fF(y.a) * u2))),
          (y.hold = x),
          (y.on = !0));
      },
      update(v) {
        let x = !1;
        g();
        for (let y of p)
          if (!(!y.on && y.a <= 0)) {
            if (((y.t += v), y.t < u2)) y.a = fF(y.t / u2);
            else if (y.t < u2 + y.hold) y.a = 1;
            else {
              let M = (y.t - u2 - y.hold) / P3t;
              ((y.a = 1 - fF(M)),
                M >= 1 && ((y.a = 0), (y.on = !1), (y.t = -1)));
            }
            ((y.swing.rotation.y = y.s * A3t * y.a),
              (b.open[y.s < 0 ? 0 : 1] = y.a),
              y.a > 0.01 && (x = !0));
          }
        m && (m.visible = x);
        for (let y of p) {
          let M = y.swing.children[0],
            S = y.a > 0.01 ? d : u;
          M.material !== S && (M.material = S);
        }
      },
    };
  return b;
}
var $x = "assets/waymo/",
  vZ = new Map();
function h_(o, t) {
  let e = vZ.get(o);
  return (
    e ||
      vZ.set(
        o,
        (e = e0($x + o, (s) => {
          ((s.colorSpace = t ? Je : Nn), (s.flipY = !1), (s.anisotropy = 8));
        })),
      ),
    e
  );
}
async function yZ(o, t, e = h_) {
  let s = await new va().parseAsync(
      o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
      "./",
    ),
    n = e("waymo_albedo.webp", !0),
    i = e("waymo_orm.webp", !1),
    a = e("waymo_emit.webp", !0),
    r = new mn({
      name: "WaymoBody",
      map: n,
      roughnessMap: i,
      metalnessMap: i,
      clearcoatMap: i,
      roughness: 1,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      envMapIntensity: 1,
    });
  return (
    (r.userData.mbExtraMap = i),
    (r.userData.mbAlbedo = wZ(null)),
    C3t(s, t, r, a)
  );
}
function wZ(o) {
  return (
    r2 +
    (o ? a_({ g: 1, b: 1, ...o }) : "") +
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
      o
        ? `
  let fwP = length(fwidth((F.nf * vec4f(wp, 1.0)).xyz * ${(o.flakeScale || 1400).toFixed(1)}));`
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
    o
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
