// app 39 — tires
// Lines 50525-50625 of readable/app.pretty.js (statement-aligned).
var Iut = `
fn sfDrops(pw: vec3f, nw: vec3f) -> vec3f {
  let pc = (F.nf * vec4f(pw, 1.0)).xyz; let nc = normalize((F.nf * vec4f(nw, 0.0)).xyz); let a = abs(nc);
  var q = pc.xz; if (a.x > a.y && a.x > a.z) { q = pc.zy; } else if (a.z > a.y) { q = pc.xy; }
  var o = vec3f(0.0);
  for (var k = 0; k < 2; k++) {   // two layers: big beads and a fine mist of small ones
    let sc = select(38.0, 85.0, k == 1); let s = q * sc + f32(k) * 17.3; let id = floor(s); let f = fract(s) - 0.5;
    let h = fract(sin(dot(id, vec2f(127.1, 311.7))) * 43758.5453); let h2 = fract(h * 13.7); let h3 = fract(h * 71.3);
    let c = (vec2f(h2, h3) - 0.5) * 0.45; let r = (0.12 + 0.24 * h) * select(1.0, 0.8, k == 1);
    let d = length(f - c) / r; let on = step(h, select(0.55, 0.4, k == 1)) * select(1.0, 0.6, k == 1) * (0.5 + 0.5 * smoothstep(-0.2, 0.6, nc.y));
    let g = length(f - c + vec2f(0.32, 0.32) * r) / r;
    o += on * vec3f(1.0 - smoothstep(0.75, 1.0, d), smoothstep(0.55, 0.92, d) * (1.0 - smoothstep(0.95, 1.1, d)), 1.0 - smoothstep(0.0, 0.38, g));
  }
  return min(o, vec3f(1.0));
}
`;
function Fut(o) {
  let t = o.centres
    .map((e) => `vec3f(${e.map((s) => s.toFixed(4)).join(", ")})`)
    .join(", ");
  return `const TIRE_C = array<vec3f, ${o.centres.length}>(${t});
fn tireUV(p0: vec3f) -> vec2f {
  let p = (F.nf * vec4f(p0, 1.0)).xyz;
  var c = TIRE_C[0]; var best = 1e9;
  for (var k = 0; k < ${o.centres.length}; k++) { let q = TIRE_C[k]; let dd = dot(p.xz - q.xz, p.xz - q.xz); if (dd < best) { best = dd; c = q; } }
  let d = p - c; let r = length(d.yz); let s = select(-1.0, 1.0, c.x > 0.0);
  let u = fract(s * atan2(d.y, d.z) / 6.2831853 + 0.5);
  if (r < ${(o.rOut - 0.008).toFixed(4)}) { return vec2f(u, 0.5 * clamp((${o.rOut.toFixed(4)} - r) / ${(o.rOut - o.rIn).toFixed(4)}, 0.0, 1.0)); }
  return vec2f(fract(u * 4.0), 0.5 + 0.5 * clamp((abs(p.x) - ${o.xIn.toFixed(4)}) / ${(o.xOut - o.xIn).toFixed(4)}, 0.0, 1.0));
}
`;
}
function Out(o, t) {
  let e = (h) => `exp(min(${t.vec3(h)}, vec3f(11.0)))`,
    s = (h) => `exp(min(${t.comp(h)}, 11.0))`,
    n = o.priors.levels;
  if (o.output === "exp") return `return exp(min(${t.out}, vec3f(11.0)));`;
  if (o.output === "phys") {
    let h = `${e(0)} + ${e(3 + 3 * (n - 1))} * qn`;
    for (let f = 0; f < n - 1; f++) h += ` + ${e(3 + 3 * f)} * q${f}`;
    return `return ${h};`;
  }
  let i = `${e(0)} + ${e(3 + 3 * (n - 1))} * qnc`;
  for (let h = 0; h < n - 1; h++) i += ` + ${e(3 + 3 * h)} * qc${h}`;
  let a = 3 + 3 * n;
  (o.noSeeThrough ||
    (i += ` + ${e(a)} * tv0 + ${e(a + 3)} * tv2 + ${e(a + 6)} * tr0`),
    (a += 9));
  let r = !(o.probeBox && !(o.sun?.strength > 0)),
    l = o.coat
      ? `
  if (smode == 4 && F.shadowM.z > 0.0) { let dr = sfDrops(i.wpos, n) * F.shadowM.z; let sky = dot(qc0, vec3f(0.2126, 0.7152, 0.0722));   // sf-drive: rain beads (sfDrops)
    env = env * (1.0 - 0.45 * dr.y) * (1.0 - 0.12 * F.shadowM.z) + qc0 * (0.1 * dr.x) + vec3f(sky) * (1.6 * dr.z); }
  if (smode == 4) { env += max(1.0 / (1.0 + exp(-${t.comp(a + 13)})), F.skyH.z) * fresnelDiel(ndv, ${o.coat.ior.toFixed(4)}) * select(qc0, mix(vec3f(dot(qc0, vec3f(0.2126, 0.7152, 0.0722))), qc0, F.skyH.w), F.skyH.w > 0.0) * F.tubeInfo.y + fresnelDiel(ndv, ${o.coat.ior.toFixed(4)}) * tb0; }`
      : "";
  if (!r)
    return `
  var env = ${i};${l}
  if (F.tubeInfo2.y > 0.0 && F.misc.z < 0.5 && smode != 2 && smode != 3) { env += O.baseColor.rgb * tubeIrr(i.wpos, n, false, vec3f(0.0), vec3f(1.0)) * (F.tubeInfo2.y / PI) * select(1.0, 1.0 - fresnelDiel(ndv, 1.5), smode == 4); }   // the studio tubes' direct light, live
  if (O.params.y < 0.5) { env *= occluderAO(i.wpos, n); }${
    o.tires
      ? `
  if (smode == 6) { let tt = textureSampleGrad(matMap, matSamp, tuv, tdx, tdy);   // sidewall lettering, tread: the atlas as albedo under the tubes, its gloss as a rubber sheen
    env = env * tt.rgb * ${(1 / (o.tires.mean || 0.34)).toFixed(4)} + tt.rgb * ${(o.tires.albedo ?? 0.16).toFixed(3)} * tubeIrr(i.wpos, n, false, vec3f(0.0), vec3f(1.0)) * (F.tubeInfo2.y / PI) + tt.rgb * ${(o.tires.ambient ?? 0.02).toFixed(4)} * F.misc.x + tubeRefl(i.wpos, r, 0.22, rfw) * (0.05 * tt.a);${o.tires.debug ? " env = tt.rgb;" : ""} }`
      : ""
  }
  return env * F.misc.x + O.emissive.rgb${globalThis.MB_NEURAL_SUN ? " + neuralSun(i.wpos, n, i.pos.xy, smode)" : ""};`;
  let c = o.sunBounce
    ? `if (!dynamic) { sbv = ${e(a + 14)} * (F.sunDir.w / ${(o.sun.strength || 1).toFixed(6)}); }`
    : "";
  return `
  let dynamic = O.params.y > 0.5;
  var env = (${i}) * select(1.0, F.skyH.y, F.skyH.y > 0.0);${l}   // sf-drive: renderer.neuralEnv, the environment's diffuse / glossy light on the car (not its clear coat)
  var sbv = vec3f(0.0); ${c}
  if (!dynamic) { let ao = occluderAO(i.wpos, n); env *= ao; sbv *= ao; }
  env *= mix(1.0, F.skyH.x + (1.0 - F.skyH.x) * skyFieldAt(i.wpos), F.skyG.z);   // sf-drive: the street's baked sky visibility where the car stands
  let spc = ${e(a)}; let lob = vec4f(${s(a + 3)}, ${s(a + 4)}, ${s(a + 5)}, ${s(a + 6)});
  let dif = ${e(a + 7)}; let wrp = ${e(a + 10)};
  var col = env * F.misc.x + sbv + O.emissive.rgb;
  if (F.gbounce.y > 0.5 && smode != 1) {   // the moved sun's floor bounce minus the baked sun's (baked into env): side / underside light
    let ea = F.gbounce.x * F.sunDir.w * (1.0 - n.y) * 0.5;
    let kd = select(dif, O.baseColor.rgb * (1.0 - O.mr.y), O.mr.z > 0.5);
    col = max(col + kd * (ea / PI), col * 0.5);
  }
  if (F.sunDir.w > 0.0) {
    let l = normalize(F.sunDir.xyz);
    let vis = 1.0 / (1.0 + exp(-${t.comp(a + 13)}));
    // baked visibility is exact for static surfaces under the baked sun; otherwise real-time shadow maps take over
    let useStatic = dynamic || F.misc.w > 0.5;
    var V = sunShadow(i.wpos, i.pos.xy, useStatic);
    if (!useStatic) { V *= vis; }
    // the moved sun (and moving surfaces) on analytic materials: their exact BRDF; the baked sun keeps the lobes V was fitted with
    let bs = select(lobeBrdf(spc, lob, dif, wrp, dot(r, l), dot(n, l)), pbrDirect(n, v, l, F.shadow.w), O.mr.z > 0.5 && useStatic);
    col += V * F.sunDir.w * F.sunC.rgb * bs;   // sf-drive patch: x the sun light's colour (golden hour); was white (bundles baked theirs)
  }
  // sf-drive (round 20): renderer.carWarm (k): the car's light warmed, green and blue down (1 + 0.2 k, 1 - k, 1 - 1.4 k), so its
  // red keeps the hue it had under a warmer city grade (the noon grade's warmth 0.07 -> 0.025 and its lifted mids turned
  // the paint pink in the sun) without changing the city's
  let warm = vec3f(1.0 + 0.2 * F.shadowM.w, 1.0 - F.shadowM.w, 1.0 - 1.4 * F.shadowM.w);
  return (col + punctual(i.wpos, n, r, i.pos.xy, spc, lob, dif, wrp) * ${(globalThis.MB_NEURAL_PUNCTUAL ?? 1).toFixed(3)}) * warm;   // sf-drive: the lamps' weight on the neural car`;
}
