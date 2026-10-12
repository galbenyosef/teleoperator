// app 265 — the
// Lines 132975-133321 of readable/app.pretty.js (statement-aligned).
function e_(i, t, e = globalThis.SF_LITE ? 0.012 : 0) {
  let s = hw(i);
  if (!s?.length) return null;
  let n = new zn(ZK(s, e), wL(), 1);
  return (
    (n.instanceMatrix = t.instanceMatrix),
    (n.count = 0),
    (n.name = t.name + "_plates"),
    (n.frustumCulled = !1),
    (n.castShadow = !1),
    (n.receiveShadow = !0),
    (n.matrixAutoUpdate = !1),
    n
  );
}
wm();
var Kc = {
  si: 0,
  g: 2,
  b: 0.4,
  depth: 0.9,
  flakeScale: 900,
  flakeTilt: 0.32,
  flakeMetal: 0.4,
  flakeRough: 0.16,
  baseRough: 0.42,
  baseMetal: 0.12,
  ao: 1,
  beads: 1,
  lamps: 0.25,
  lampRough: 0.14,
};
try {
  for (let i of (new URLSearchParams(location.search).get("paint") || "").split(
    ",",
  )) {
    let [t, e] = i.split(":");
    t in Kc && e !== void 0 && (Kc[t] = +e);
  }
} catch {}
var Rn = (i) => (+i).toFixed(4),
  o_ = Kc,
  sx = `
fn carAO(wp: vec3f) -> f32 {
  gHPL = vec2f(${Rn(Kc.lamps)}, ${Rn(Kc.lampRough)});   // (the street lamps' pools: the car under a cobra head 8 m up lit as by day - as the neural car's 0.3)
  let fld = mix(1.0, F.skyH.x + (1.0 - F.skyH.x) * skyFieldAt(wp), F.skyG.z);
  return clamp(1.0 - gUV2.x * ${Rn(Kc.ao)}, 0.0, 1.0) * fld;
}
`,
  nx = (i) =>
    (i.wrap ? kL(i.wrap, i.flakeScale) : "") +
    `
fn pHash3(p: vec3f) -> vec3f {
  var q = fract(p * vec3f(0.1031, 0.1030, 0.0973)); q += dot(q, q.yxz + 33.33);
  return fract((q.xxy + q.yxx) * q.zyx);
}
// rain beads on the coat (renderer.carWet in F.shadowM.z): in the body's frame (they ride with it), on the plane the
// normal faces most; each a small lens - the coat's normal bent toward its rim (the sky gathered into a glint at its
// top, the street's dark at its edge). Two layers: big beads and a fine mist. -> the coat normal's offset (world)
fn pBeads(pc: vec3f, nc: vec3f) -> vec3f {
  let a = abs(nc);
  var q = pc.xz; var ax = 0; if (a.x > a.y && a.x > a.z) { q = pc.zy; ax = 1; } else if (a.z > a.y) { q = pc.xy; ax = 2; }
  var o = vec2f(0.0);
  for (var k = 0; k < 2; k++) {
    let sc = select(38.0, 85.0, k == 1); let s = q * sc + f32(k) * 17.3; let id = floor(s); let fr = fract(s) - 0.5;
    let h = fract(sin(dot(id, vec2f(127.1, 311.7))) * 43758.5453); let h2 = fract(h * 13.7); let h3 = fract(h * 71.3);
    let c = (vec2f(h2, h3) - 0.5) * 0.45; let r = (0.12 + 0.24 * h) * select(1.0, 0.8, k == 1);
    let d = (fr - c) / r; let dl = length(d);
    let on = step(h, select(0.55, 0.4, k == 1)) * select(1.0, 0.6, k == 1) * (0.5 + 0.5 * smoothstep(-0.2, 0.6, nc.y));
    o += on * d * 0.9 * (1.0 - smoothstep(0.85, 1.0, dl));   // a spherical cap: the slope grows to the rim
  }
  var l = vec3f(o.x, 0.0, o.y); if (ax == 1) { l = vec3f(0.0, o.y, o.x); } else if (ax == 2) { l = vec3f(o.x, o.y, 0.0); }
  return l;
}
// (the flakes' footprint: fwidth only in uniform control flow - a caller that branches on a weight takes it first, carPaintW)
fn carPaint(wp: vec3f, bc: vec4f) -> vec4f { return carPaintW(wp, bc, length(fwidth((F.nf * vec4f(wp, 1.0)).xyz * ${Rn(i.flakeScale)}))); }
fn carPaintW(wp: vec3f, bc: vec4f, fw: f32) -> vec4f {
  let n = gNw; let v = normalize(F.camPos.xyz - wp); let ndv = clamp(dot(n, v), 0.0, 1.0);
  // the pigment: deeper toward the silhouette (Beer-Lambert through the colour layer: x^(1 + k (1 - n.v)))
  ${i.pearl ? "var" : "let"} base = pow(max(${i.wrap ? "wrapCol(wp, bc.rgb, fw)" : "bc.rgb"} * vec3f(1.0, ${Rn(i.g)}, ${Rn(i.b)}), vec3f(1e-4)), vec3f(1.0 + ${Rn(i.depth)} * (1.0 - ndv) * (1.0 - ndv)));${
    i.pearl
      ? `
  // (garage50) a pearl: the colour flops with the angle - a pale, slightly hue-turned glow where the panel faces the eye,
  // the pigment deepening and turning the other way toward the silhouette (the mica's interference, roughly)
  { let lu = dot(base, vec3f(0.2126, 0.7152, 0.0722)); let k = ${Rn(i.pearl)};
    let face = mix(base, vec3f(lu) * 1.15 + (base.gbr - base) * 0.18, 0.35 * k * ndv * ndv);
    base = max(mix(face, face.brg * 0.6 + face * 0.55, 0.4 * k * (1.0 - ndv) * (1.0 - ndv)), vec3f(1e-4)); }`
      : ""
  }
  // the flakes: one per cell of the body's frame, each tilted at random; their pixel footprint fades them into the
  // average (a sheen: the base's roughness and metalness) once many share a pixel - no sparkle noise at a distance
  let R = mat3x3f(F.nf[0].xyz, F.nf[1].xyz, F.nf[2].xyz);
  let pc = (F.nf * vec4f(wp, 1.0)).xyz * ${Rn(i.flakeScale)};
  let vis = 1.0 - smoothstep(0.6, 2.2, fw);
  let h = pHash3(floor(pc));
  let isFlake = step(0.55, h.z)${i.flakes !== void 0 ? " * " + Rn(i.flakes) : ""};
  let tilt = (h - 0.5) * 2.0 * ${Rn(i.flakeTilt)};
  let nf = normalize(n + (tilt - n * dot(tilt, n)) * isFlake * vis);
  var co = vec3f(0.0);
  if (F.shadowM.z > 0.0) {   // rain beads on the coat, in the body's frame (R: world -> body; its transpose back)
    let nc = R * n; let l = pBeads(pc / ${Rn(i.flakeScale)}, nc);
    co = transpose(R) * l * F.shadowM.z * ${Rn(i.beads)};
  }
  gHCN = vec4f(co, select(0.0, 1.0, F.shadowM.z > 0.0));
  gHN = vec4f(nf - n, 1.0);
  let fm = mix(${Rn(i.baseMetal)}, mix(${Rn(i.baseMetal)}, ${Rn(i.flakeMetal)}, isFlake), vis);
  let fr = mix(${Rn(i.baseRough)}, mix(${Rn(i.baseRough)}, ${Rn(i.flakeRough)}, isFlake), vis);
  gHK = vec4f(fr, fm, 0.0, 1.0);
  // (tyres49) the pigment's dielectric sheen under the coat mostly off - the coat is the paint's reflection, the flakes
  // their own glints; at 4 % with the base's roughness it drew a second, broad sun lobe: a burnt blob on the tail
  gHF0 = mix(0.25, 1.0, isFlake * vis);
  return vec4f(base, 1.0);
}
`,
  Qgt = nx(Kc),
  a_ = (i = {}) => nx({ ...Kc, ...i });
function tbt({
  rIn: i = 0.272,
  rOut: t = 0.364,
  xIn: e = 0.7,
  xOut: s = 0.955,
  mean: n = 0.34,
} = {}) {
  return `
fn tWrap(d: vec2f) -> vec2f { return vec2f(d.x - round(d.x), d.y); }
fn carTire(wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let r = length(col.yz); let s = select(-1.0, 1.0, col.x > 0.0);
  let u = fract(s * atan2(col.y, col.z) / 6.2831853 + 0.5);
  var t = vec2f(fract(u * 4.0), 0.5 + 0.5 * clamp((abs(col.x) - ${Rn(e)}) / ${Rn(s - e)}, 0.0, 1.0));   // the tread
  if (r < ${Rn(t - 0.008)}) { t = vec2f(u, 0.5 * clamp((${Rn(t)} - r) / ${Rn(t - i)}, 0.0, 1.0)); }   // the sidewall
  let dx = tWrap(dpdx(t)); let dy = tWrap(dpdy(t));
  let a = textureSampleGrad(matMap, matSamp, t, dx, dy);
  // the relief: the atlas' shading as a height (three.js bump mapping in screen space)
  let hx = textureSampleGrad(matMap, matSamp, t + dx, dx, dy).r - a.r; let hy = textureSampleGrad(matMap, matSamp, t - dy, dx, dy).r - a.r;
  let n0 = gNw; let sx = normalize(dpdx(wp)); let sy = normalize(-dpdy(wp));   // (screen y runs down: as the renderer's bump)
  let r1 = cross(sy, n0); let r2 = cross(n0, sx); let det = dot(sx, r1);
  let grad = sign(det) * (hx * r1 + hy * r2) * 0.6;
  gHN = vec4f(normalize(abs(det) * n0 - grad) - n0, 1.0);
  gHK = vec4f(clamp(0.9 - 0.5 * a.a, 0.55, 0.9), 0.0, 0.0, 1.0);
  return vec4f(bc.rgb * (a.r / ${Rn(n)}), 1.0);
}
`;
}
var r_ = { trim: 0, paint: 1, tire: 2 },
  AL = (i = null) => sx + xm + (i ? nx({ ...Kc, ...i }) : Qgt) + tbt() + ebt,
  ebt = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp);
  let kind = O.mflags4.y;
  if (kind > 1.5) { return carTire(wp, col, bc); }
  if (kind > 0.5) {
    let crn = crNight();
    if (crn > 0.0) {   // (a uniform branch: by day none of it)
      let cty = crCity(wp, reflect(-normalize(F.camPos.xyz - wp), gNw), crn); let k = crn * 0.6 * cty.a;
      gHR = vec4f(cty.rgb * cty.a * 0.25, k); gHRe = crE; gHCR = k;
    }
    return carPaint(wp, bc);
  }
  return bc;
}
`,
  iY = AL(),
  oY = {
    g: 1,
    b: 1,
    depth: 0.3,
    flakeScale: 1400,
    flakeTilt: 0.18,
    flakeMetal: 0.5,
    flakeRough: 0.4,
    baseRough: 0.5,
    baseMetal: 0.38,
  };
function ix(i = {}) {
  let t = { ...Kc, ...oY, ...i };
  return t.solid
    ? sx +
        nx(t) +
        `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp);
  var alb = bc.rgb;
  ${t.map ? "alb = alb * textureSample(matMap, matSamp, uv).rgb;" : ""}
  gHSS = 0.15;   // (the screen-space AO mostly off the paint: its noise read as dirt)
  return carPaint(wp, vec4f(alb, 1.0));
}
`
    : sx +
        nx(t) +
        `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp);
  let t = textureSample(matMap, matSamp, uv); let mk = textureSample(matExtra, matSamp, uv);
  let p = mk.g; let gl = mk.b; let rest = clamp(1.0 - p - gl, 0.0, 1.0);
  let alb = t.rgb * bc.rgb;
  let pc = carPaint(wp, vec4f(alb, 1.0));   // (sets gHK - the flakes' roughness, metalness - and gHN, their normals)
  let pk = gHK; gHF0 = mix(1.0, gHF0, p);
  let restR = mix(${Rn(0.62)}, ${Rn(0.3)}, clamp(mk.r * 1.6 - 0.3, 0.0, 1.0));   // (the rest: matte cladding without a coat, gloss trim with one)
  gHK = vec4f(pk.x * p + ${Rn(0.05)} * gl + restR * rest, pk.y * p, 0.0, 1.0);
  gHN = vec4f(gHN.xyz * p, gHN.w);
  gHSS = 1.0 - 0.85 * clamp(p + gl, 0.0, 1.0);   // (round 2: the screen-space AO mostly off the paint and the glass - its noisy self-occlusion read as dirt on the satin panels; the contact shadow and the street's sky visibility stay)
  return vec4f(mix(alb, pc.rgb, p), 1.0);
}
`;
}
function Mm({ city: i = 0.3, share: t = 0.85, sky: e = 0.8 } = {}) {
  return (
    sx +
    xm +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp); gHSS = 0.15;
  let v = normalize(F.camPos.xyz - wp); let r = reflect(-v, gNw);
  let up = smoothstep(0.08, 0.6, r.y);
  let alb = mix(vec3f(0.06, 0.06, 0.062), vec3f(${Rn(i)}, ${Rn(i * 0.97)}, ${Rn(i * 0.92)}), smoothstep(-0.25, 0.02, r.y));
  let fr = normalize(vec3f(-r.x, 0.0, -r.z) + vec3f(0.0, 1e-4, 0.0));
  let e = dot(envDiffuse(fr), vec3f(0.2126, 0.7152, 0.0722));
  let sl = F.sunC.rgb * F.sunDir.w * max(dot(fr, normalize(F.sunDir.xyz)), 0.0) * 0.55 / PI;
  let cityL = alb * (vec3f(e) + sl + (F.hemiGround.rgb * 0.5 + F.hemiSky.rgb) * 0.5 / PI);
  let sk = dot(envSpec(r, 0.16), vec3f(0.2126, 0.7152, 0.0722)) * vec3f(0.92, 0.95, 1.0);   // (the sky overhead: its brightness, a hint of its blue; round 30: a little blurred - the clouds' detail on the near-level rear glass read as a smeared, cloudy texture)
  // (night48) the street canyon round the car where the ray stays under the roofs (car/cityrefl.js: its facades, shops,
  // lit rooms and lamps), the flat city colour past it, the sky above
  let cc = crCity(wp, r, crNight()); let k = ${Rn(i / 0.3)};
  gHRe = mix(mix(cityL, sk * ${Rn(e)}, up), crE, cc.a);
  gHR = vec4f(cc.rgb * cc.a * k, ${Rn(t)});
  gHE = crE * cc.a * (0.05 + 0.3 * pow(1.0 - abs(dot(gNw, v)), 4.0));   // (the lights in the glass a little over its 4 % Fresnel)
  return bc;
}
`
  );
}
function aY({
  rough: i = 0.27,
  aniso: t = 0.62,
  grain: e = 0.1,
  city: s = 0.62,
} = {}) {
  return (
    sx +
    `
fn ssHash(x: f32) -> f32 { return fract(sin(x * 127.1 + 311.7) * 43758.5453); }
fn ssNoise(x: f32) -> f32 { let i = floor(x); let fr = fract(x); let u = fr * fr * (3.0 - 2.0 * fr); return mix(ssHash(i), ssHash(i + 1.0), u); }
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHAO = carAO(wp); gHSS = 0.2;
  let R = mat3x3f(F.nf[0].xyz, F.nf[1].xyz, F.nf[2].xyz);
  let n = gNw; let nb = R * n; let pc = (F.nf * vec4f(wp, 1.0)).xyz;
  // the grain: along the body's length, or across the car on the faces looking along it
  var gb = vec3f(0.0, 0.0, 1.0) - nb * nb.z;
  if (length(gb) < 0.35) { gb = vec3f(1.0, 0.0, 0.0) - nb * nb.x; }
  gb = normalize(gb); let bb = normalize(cross(nb, gb));
  let a = dot(pc, bb); let al = dot(pc, gb);
  let f1 = a * 900.0; let f2 = a * 160.0;
  let v1 = 1.0 - smoothstep(0.4, 1.2, length(vec2f(dpdx(f1), dpdy(f1))));
  let v2 = 1.0 - smoothstep(0.4, 1.2, length(vec2f(dpdx(f2), dpdy(f2))));
  let fine = (ssNoise(f1 + 13.0 * ssNoise(al * 2.0)) - 0.5) * v1;
  let band = (ssNoise(f2 + 3.0 * ssNoise(al * 0.7 + a * 9.0)) - 0.5) * v2;
  let pv = ssNoise(al * 1.3 + a * 2.1) - 0.5;   // (the sheets' polish varying over the panel)
  let g = fine * 0.6 + band * 0.8 + pv * 0.5;
  // the bent normal: toward the plane across the grain (the highlight stretched across the brushing)
  let v = normalize(F.camPos.xyz - wp);
  let bw = normalize(transpose(R) * bb);
  let at = cross(bw, v); let an = normalize(cross(at, bw) + n * 1e-4);
  let bent = normalize(mix(n, an, ${Rn(t)} * clamp(5.0 * ${Rn(i)}, 0.0, 1.0)));
  gHN = vec4f(bent - n, 1.0);
  // (the surface's own roughness past the screen-space reflection's 0.45: traced on these big flat panels it mirrored the
  // truck's own wheels and flares onto them; the soft reflections are the environment's here, at the steel's roughness)
  gHK = vec4f(0.47 + 0.05 * g, 1.0, 0.0, 1.0);
  // the reflections: the city's colour for level and downward rays, the sky's brightness for upward ones
  let r = reflect(-v, bent); let up = smoothstep(0.05, 0.55, r.y);
  let alb = mix(vec3f(0.12, 0.12, 0.122), vec3f(${Rn(s)}, ${Rn(s * 0.98)}, ${Rn(s * 0.95)}), smoothstep(-0.25, 0.02, r.y));
  let fr = normalize(vec3f(-r.x, 0.0, -r.z) + vec3f(0.0, 1e-4, 0.0));
  let e = dot(envDiffuse(fr), vec3f(0.2126, 0.7152, 0.0722));
  let sl = F.sunC.rgb * F.sunDir.w * max(dot(fr, normalize(F.sunDir.xyz)), 0.0) * 0.55 / PI;
  let cityL = alb * (vec3f(e) + sl + (F.hemiGround.rgb * 0.5 + F.hemiSky.rgb) * 0.5 / PI);
  let sk0 = envSpec(r, clamp(${Rn(i)} + 0.06 * g, 0.12, 0.6)); let sk = mix(sk0, vec3f(dot(sk0, vec3f(0.2126, 0.7152, 0.0722))), 0.85);   // (the sky's blue mostly lost in the grain: a grey steel, not a blue slab)
  let cityN = mix(cityL, vec3f(dot(cityL, vec3f(0.2126, 0.7152, 0.0722))), 0.6);   // (the facades' warm light mostly neutral in the grain)
  gHRe = mix(cityN, sk * 1.15, up);
  gHR = vec4f(0.0, 0.0, 0.0, 0.85);
  return vec4f(bc.rgb * (1.0 + ${Rn(e)} * g * 2.0), 1.0);
}
`
  );
}
function ox(
  i = {},
  {
    detail: t = 0.35,
    lumRef: e = 0.45,
    scale: s = 165,
    coat: n = 1,
    coatRough: o = 0.035,
    repaint: a = null,
  } = {},
) {
  let r = { ...Kc, ...oY, ...i };
  return (
    sx +
    nx(r) +
    `
fn gCarbon(wp: vec3f, fwp: vec3f) -> vec2f {   // (fwp: fwidth of the weave's coordinates, taken in uniform control flow)
  let R = mat3x3f(F.nf[0].xyz, F.nf[1].xyz, F.nf[2].xyz);
  let pc = (F.nf * vec4f(wp, 1.0)).xyz * ${Rn(s)};
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
  { let ch = t.rgb / max(t.r + t.g + t.b, 1e-3); let rf = vec3f(${a.map(Rn).join(", ")}); let rc = rf / max(rf.x + rf.y + rf.z, 1e-3);
    let q = (1.0 - smoothstep(0.1, 0.3, length(ch - rc))) * smoothstep(0.03, 0.12, lum); let mv = rest * q; p = p + mv; rest = rest - mv; }`
      : ""
  }
  let sh = mix(1.0, clamp(lum / ${Rn(e)}, 0.55, 1.08), ${Rn(t)});
  // (each surface's shading only where it has weight: the paint's flakes and the weave are the hook's cost; their
  // derivatives taken first - fwidth in a branch on a texel's weight is not uniform control flow: the module failed to
  // compile and the body fell back to the plain textured material, the generator's colours as they are)
  let po = (F.nf * vec4f(wp, 1.0)).xyz; let fwP = length(fwidth(po * ${Rn(r.flakeScale)})); let fwC = fwidth(po * ${Rn(s)});
  var pc = vec4f(0.0); var pk = vec4f(0.5, 0.0, 0.0, 1.0); var pn = vec4f(0.0);
  if (p > 0.002) { pc = carPaintW(wp, vec4f(bc.rgb * sh, 1.0), fwP); pk = gHK; pn = gHN; gHF0 = mix(1.0, gHF0, p); }
  var cbn = vec2f(1.0, 0.4); if (cb > 0.002) { cbn = gCarbon(wp, fwC); }
  gHK = vec4f(pk.x * p + cbn.y * cb + 0.5 * bk + 0.4 * gl + 0.45 * rest, pk.y * p, 0.0, 1.0);
  gHN = vec4f(pn.xyz * p, pn.w);
  gHC = vec2f(max(${Rn(n)} * p + 0.55 * cb + 0.2 * bk + 0.25 * gl + 0.35 * rest, 0.002), mix(mix(0.12, ${Rn(o)}, p), 0.08, gl));
  gHSS = 1.0 - 0.85 * clamp(p, 0.0, 1.0);
  let alb = pc.rgb * p + vec3f(0.05, 0.05, 0.055) * cbn.x * cb + vec3f(0.018, 0.018, 0.02) * bk + vec3f(0.008, 0.008, 0.009) * gl + t.rgb * rest;
  return vec4f(alb, 1.0);
}
`
  );
}
ml();
as();
