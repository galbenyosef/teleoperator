// app 39 — push
// Lines 49934-50356 of readable/app.pretty.js (statement-aligned).
function ZA(i, t, e = !1, s = !1) {
  let n = i.manifest,
    o = n.channels / 4,
    a = n.priors.levels,
    r = !!n.priors.mips,
    l = n.output === "phys2",
    c = [];
  for (let v = 0; v < o; v++) for (let y of "xyzw") c.push(`z${v}.${y}`);
  (c.push("n.x", "n.y", "n.z", "ndv", "v.x", "v.y", "v.z"),
    n.sunBounce && c.push("sl.x", "sl.y", "sl.z"));
  for (let v = 0; v < a - 1; v++) for (let y of "xyz") c.push(`p${v}.${y}`);
  for (let v of "xyz") c.push(`pn.${v}`);
  if (l)
    for (let v of ["tv0", "tv2", "tr0"])
      for (let y of "xyz") c.push(n.noSeeThrough ? "0.0" : `l_${v}.${y}`);
  let h = [];
  n.sunBounce &&
    h.push(
      "let sl = select(vec3f(0.0, 1.0, 0.0), normalize(F.sunDir.xyz), dot(F.sunDir.xyz, F.sunDir.xyz) > 1e-8);",
    );
  let f = i.latentScale || n.latents.map(() => 1);
  f.some((v) => v !== 1)
    ? h.push(
        `let luv = i.uv * array<f32, ${f.length}>(${f.map((v) => v.toFixed(6)).join(", ")})[u32(layer)];`,
      )
    : h.push("let luv = i.uv;");
  for (let v = 0; v < o; v++)
    h.push(
      `let z${v} = textureSampleLevel(latents, latSamp, luv, layer * ${o} + ${v}, 0.0);`,
    );
  let u = r ? n.probes[0] : n.probe;
  if (l) {
    (h.push(
      "let rpA = probeDir(i.wpos, r, O.probe.xyz); let rpB = probeDir(i.wpos, r, O.probe2.xyz);",
    ),
      h.push("let smode = i32(O.params.w); let pk = i32(F.misc.z);"),
      h.push(
        `var tb0 = vec3f(0.0); if (F.tubeInfo.x > 0.5 && pk == 0 && smode >= 2) { tb0 = tubeRefl(i.wpos, r, ${(n.tubeGloss ?? 0.009).toFixed(4)}, rfw * ${(n.tubeFootprint ?? 1).toFixed(2)}); }`,
      ),
      h.push("let mEnv = F.tubeInfo.y;"),
      h.push(
        "if (smode == 2) { return glassShade(n, v, r, ndv, look(0, rpA, rpB) * mEnv + tb0, i.wpos, i.pos.xy, pk == 0); }",
      ),
      h.push(
        "if (smode == 3) { return thinGlassShade(n, v, r, ndv, look(0, rpA, rpB) * mEnv + tb0, i.wpos, i.pos.xy, pk == 0); }",
      ),
      h.push(
        "if (smode == 5) { let f0 = O.baseColor.rgb; let fm = f0 + (1.0 - f0) * pow(1.0 - clamp(ndv, 0.0, 1.0), 5.0); let ro = clamp(O.mr.x, 0.0, 1.0); var me = mix(look(0, rpA, rpB), look(1, rpA, rpB), clamp(ro * 12.0, 0.0, 1.0)) * F.tubeInfo2.x + tubeRefl(i.wpos, r, 0.003 + ro * 0.4, rfw); if (F.tubeInfo2.w > 0.5 && pk == 0) { let sr = ssrTrace(i.wpos + n * 0.01, r, i.pos.xy, n); me = mix(me, sr.rgb, sr.a); } return fm * me; }",
      ),
      h.push(
        "let tvA = probeDir(i.wpos, -v, O.probe.xyz); let tvB = probeDir(i.wpos, -v, O.probe2.xyz);",
      ),
      h.push(
        `var trf = refractDir(-v, n, ${(1 / n.ior).toFixed(6)}); var trp = i.wpos;`,
      ),
      h.push(
        "if (O.proxyC.w > 0.5) { let ex = boxExit(i.wpos, trf); trp = ex.p; trf = ex.d; }",
      ),
      h.push(
        "let trA = probeDir(trp, trf, O.probe.xyz); let trB = probeDir(trp, trf, O.probe2.xyz);",
      ),
      h.push("let usePlanar = smode == 1 && pk == 0 && F.screen.z > 0.5;"));
    for (let y = 0; y < a - 1; y++)
      h.push(
        `let q${y} = look(${y}, rpA, rpB); let p${y} = log(1.0 + q${y}); var qc${y} = q${y}; if (usePlanar) { let pl = planarAt(i.pos.xy, ${y}); qc${y} = q${y} * (1.0 - pl.a) + pl.rgb; }`,
      );
    (n.detailNormals &&
      h.push(
        "if (O.mflags.y > 0.5) { let rdA = probeDir(i.wpos, rd, O.probe.xyz); let rdB = probeDir(i.wpos, rd, O.probe2.xyz); " +
          Array.from(
            { length: a - 1 },
            (y, M) => `qc${M} = look(${M}, rdA, rdB);`,
          ).join(" ") +
          " let ur = (1.0 - dk) * O.mflags2.z; qc0 = mix(qc0, qc1, clamp(ur * 2.0, 0.0, 1.0)); }",
      ),
      h.push(
        `let qn = look(${a - 1}, n, n); let pn = log(1.0 + qn); var qnc = qn;`,
      ),
      h.push(
        "let dynOn = F.screen.w > 0.5 && F.misc.x > 1e-4 && pk == 0; let dynD = equirectUV(probeDir(i.wpos, r, PROBE_C));",
      ),
      h.push(
        "if (dynOn) { if (smode != 1) { " +
          Array.from(
            { length: a - 1 },
            (y, M) =>
              `qc${M} += textureSampleLevel(dynProbe, envSamp, dynD, ${M}.0).rgb / F.misc.x;`,
          ).join(" ") +
          ` } qnc += textureSampleLevel(dynProbe, envSamp, equirectUV(n), ${a - 1}.0).rgb / F.misc.x; }`,
      ),
      h.push(
        n.studioFloor?.lit
          ? "let sfl = smode == 1;"
          : "let sfl = F.probeBoxMin.w > 0.5 && smode == 1;",
      ),
      n.noSeeThrough
        ? h.push(
            "let tv0 = vec3f(0.0); let tv2 = vec3f(0.0); let tr0 = vec3f(0.0);",
          )
        : h.push(
            "let tv0 = select(look(0, tvA, tvB), vec3f(0.0), sfl); let tv2 = select(look(2, tvA, tvB), vec3f(0.0), sfl); let tr0 = select(look(0, trA, trB), vec3f(0.0), sfl);",
          ));
    let v = n.studioFloor;
    if (v) {
      let y = Math.log2(1 + v.lmK * v.lmMax),
        M = v.planar || v.spec,
        S = Math.max(v.spec.length, M.length),
        w = v.contactBox,
        z = (L) => `vec3f(${L.map((F) => F.toFixed(4)).join(", ")})`,
        _ =
          (w
            ? `let cbI = 1.0 / select(r, vec3f(1e-5), abs(r) < vec3f(1e-5)); let cbA = (${z(w[0])} - i.wpos) * cbI; let cbB = (${z(w[1])} - i.wpos) * cbI; let cbN = max(max(max(min(cbA.x, cbB.x), min(cbA.y, cbB.y)), min(cbA.z, cbB.z)), 0.0); let cbF = min(min(max(cbA.x, cbB.x), max(cbA.y, cbB.y)), max(cbA.z, cbB.z)); let cbT = select(${(w[1][1] * 0.5).toFixed(4)} / max(r.y, 0.02), cbN, cbF >= cbN); let cbS = log2(max(${(v.contactGain ?? 1).toFixed(4)} * cbT / (cbT + distance(F.camPos.xyz, i.wpos)), 1e-4)); let cbSt = ${v.contactStretch ? `clamp(1.0 / max(ndv, 0.02), 1.0, ${(+v.contactStretch).toFixed(3)})` : "1.0"}; `
            : "") +
          Array.from(
            { length: S },
            (L, F) =>
              `let fp${F} = select(vec4f(0.0), ${w ? `planarAniso(i.pos.xy, F.planarLod[${F}] + cbS, cbSt)` : `planarAtSmooth(i.pos.xy, ${F})`}, usePlanar);`,
          ).join(" "),
        R = v.spec
          .map(
            (L, F) =>
              `${L.toFixed(4)} * q${F} * (1.0 - ${w ? `mix(fp${F}.a, select(0.0, planarAtSmooth(i.pos.xy, ${F}).a, usePlanar), ${(v.contactAlphaMix ?? 1).toFixed(3)})` : `fp${F}.a`})`,
          )
          .join(" + "),
        T = M.map((L, F) => `${L.toFixed(4)} * fp${F}.rgb`).join(" + "),
        E = v.lit ? "F.misc.x * " : "",
        A = v.lit
          ? " + select(vec3f(0.0), F.sunDir.w * sunShadow(i.wpos, i.pos.xy, true) * pbrDirect(n, v, normalize(F.sunDir.xyz), F.shadow.w), F.sunDir.w > 0.0) + punctual(i.wpos, n, r, i.pos.xy, vec3f(0.0), vec4f(0.0), vec3f(0.0), vec3f(0.0))"
          : "",
        C = v.lit
          ? `envBrdfApprox(0.04, ${(v.roughness ?? 0.42).toFixed(3)}, ndv)`
          : `fresnelDiel(ndv, ${v.ior.toFixed(3)})`,
        P =
          v.contactAO && w
            ? `let caQ = abs(i.wpos.xz - vec2f(${((w[0][0] + w[1][0]) / 2).toFixed(4)}, ${((w[0][2] + w[1][2]) / 2).toFixed(4)})) - vec2f(${((w[1][0] - w[0][0]) / 2 - 0.25).toFixed(4)}, ${((w[1][2] - w[0][2]) / 2 - 0.25).toFixed(4)}); let caD = length(max(caQ + 0.35, vec2f(0.0))) + min(max(caQ.x, caQ.y) + 0.35, 0.0) - 0.6; let ucv = mix(0.06, 1.0, smoothstep(-0.55, 0.15, caD)); var cao = mix(${(+v.contactAO[0]).toFixed(3)}, 1.0, smoothstep(-0.2, ${(+v.contactAO[1]).toFixed(3)}, caD)); ` +
              (v.contactAO[2] != null
                ? `cao *= mix(${(+v.contactAO[2]).toFixed(3)}, 1.0, smoothstep(-0.55, 0.05, caD)); `
                : "") +
              (v.tires || [])
                .map(
                  ([L, F]) =>
                    `{ let tq = (i.wpos.xz - vec2f(${L.toFixed(3)}, ${F.toFixed(3)})) / vec2f(0.17, 0.22); let td = dot(tq, tq); cao *= (1.0 - 0.3 * exp(-td * 0.45)) * (1.0 - 0.35 * exp(-td * 3.0)); } `,
                )
                .join("")
            : "let cao = 1.0; let ucv = 1.0; ",
        I = v.concreteTex
          ? "let ctx = textureSampleGrad(matMap, matSamp, cuv, cdx, cdy); let cmod = ctx.rgb * 2.0; let cfr = mix(0.45, 1.4, ctx.a); "
          : v.concrete
            ? `let cq = i.wpos.xz; let cnz = 0.6 * vnoise2(cq * 1.7) + 0.4 * vnoise2(cq * 9.0); let cmod = 1.0 + ${(+v.concrete).toFixed(3)} * (2.0 * cnz - 1.0); let cfr = 1.0; `
            : "let cmod = 1.0; let cfr = 1.0; ";
      h.push(`if (sfl) { let E = (exp2(z0.rgb * ${y.toFixed(6)}) - 1.0) / ${v.lmK.toFixed(3)} * F.tubeInfo.z; ${I}let Fr = ${C} * F.tubeInfo.w * cfr; ${_} ${P}${v.radial ? ` let rdl = mix(1.0, ${(+v.radial[2]).toFixed(3)}, smoothstep(${(+v.radial[0]).toFixed(2)}, ${(+v.radial[1]).toFixed(2)}, length((i.wpos.xz - vec2f(${w ? ((w[0][0] + w[1][0]) / 2).toFixed(3) : "0.0"}, ${w ? ((w[0][2] + w[1][2]) / 2).toFixed(3) : "0.0"})) * vec2f(1.0, 0.62))));` : " let rdl = 1.0;"} var Ed = vec3f(0.0); let cdc = length(i.wpos.xz - vec2f(${w ? ((w[0][0] + w[1][0]) / 2).toFixed(3) : "0.0"}, ${w ? ((w[0][2] + w[1][2]) / 2).toFixed(3) : "0.0"}));
      // the car's shadow from the tubes that are on now: the baked light x (occluded / open tube light), near the car only
      if (F.tubeInfo2.z > 0.0 && pk == 0 && cdc < 3.2) { let sr = tubeShadow(i.wpos, vec3f(${w ? ((w[0][0] + w[1][0]) / 2).toFixed(3) : "0.0"}, 0.45, ${w ? ((w[0][2] + w[1][2]) / 2).toFixed(3) : "0.0"}), vec3f(1.02, 0.62, 2.2));
        Ed = E * (mix(1.0, sr, smoothstep(3.2, 2.2, cdc) * F.tubeInfo2.z) - 1.0); } return ${E}${(v.diffuse ?? 1).toFixed(4)} * (1.0 - Fr) * vec3f(${v.albedo.map((L) => L.toFixed(5)).join(", ")}) * cmod * (E + Ed) * cao * rdl + Fr * (${E}(${R}) * cao * rdl * ucv * F.tubeInfo.y + ${T} + ${v.tubeSpread != null ? `select(vec3f(0.0), tubeRefl(i.wpos, r, ${(+v.tubeSpread).toFixed(4)}, rfw) * cao * ucv * (1.0 - fp${Math.min(1, S - 1)}.a), F.tubeInfo.x > 0.5 && pk == 0)` : "vec3f(0.0)"})${A}; }`);
    }
    (h.push("var ssrA = 0.0;"),
      h.push(
        "if (F.ssr.x > 0.5 && pk == 0 && smode != 1) { let sr = ssrTrace(i.wpos + n * 0.01, r, i.pos.xy, n); ssrA = sr.a; if (sr.a > 0.0) { let a = sr.a * F.ssr.w; let e = sr.rgb / max(F.misc.x, 1e-4); qc0 = mix(qc0, e, a); qc1 = mix(qc1, e, a * 0.75); qc2 = mix(qc2, e, a * 0.4); } }",
      ),
      h.push(
        "if (F.floorRefl.x + F.floorRefl.y + F.floorRefl.z > 0.0 && pk == 0 && smode != 1 && r.y < -0.02) { let hp = i.wpos + r * ((F.floorRefl.w - i.wpos.y) / r.y); let lf = floorLampRadiance(hp, i.pos.xy) * (1.0 - ssrA) / max(F.misc.x, 1e-4); qc0 += lf; qc1 += lf; qc2 += lf; qc3 += lf * 0.6; }",
      ),
      h.push(
        "let l_tv0 = log(1.0 + tv0); let l_tv2 = log(1.0 + tv2); let l_tr0 = log(1.0 + tr0);",
      ));
  } else {
    h.push(
      u
        ? `let rp = probeDir(i.wpos, r, ${r ? "O.probe.xyz" : "PROBE_C"});`
        : "let rp = r;",
    );
    for (let v = 0; v < a - 1; v++)
      h.push(`let q${v} = prior(rp, ${v}); let p${v} = log(1.0 + q${v});`);
    h.push(`let qn = prior(n, ${a - 1}); let pn = log(1.0 + qn);`);
  }
  let d = nU(n, i.weights, c, t, e),
    p = u ? u.center_gltf : [0, 0, 0],
    g = (n.sun?.lobes || [2e3, 400, 64, 8])
      .map(
        (v, y) =>
          `lob.${"xyzw"[y]} * ${((v + 1) / (2 * Math.PI)).toFixed(6)} * pow(rl, ${v.toFixed(1)})`,
      )
      .join(" + "),
    b = `
const PROBE_C = vec3f(${p.map((v) => v.toFixed(6)).join(", ")});
const PROBE_R = ${(u ? u.ground_radius : 0).toFixed(3)};
const IOR = ${(n.ior || 1.5).toFixed(4)};
fn probeDir(p: vec3f, r: vec3f, pc: vec3f) -> vec3f {   // downward rays hit the ground plane, re-aimed from the probe
  if (F.probeBoxMin.w > 0.5) {   // studio: where the ray leaves the room box, re-aimed from the probe (same as train3.py)
    let rs = select(r, select(vec3f(1e-6), vec3f(-1e-6), r < vec3f(0.0)), abs(r) < vec3f(1e-6));
    let tf = max((F.probeBoxMin.xyz - p) / rs, (F.probeBoxMax.xyz - p) / rs);
    return normalize(p + max(min(tf.x, min(tf.y, tf.z)), 0.0) * r - pc);
  }
  if (r.y < -1e-4) {
    let h = p + (-p.y / r.y) * r;
    if (length(h.xz - pc.xz) < PROBE_R) { return normalize(h - pc); }
  }
  return r;
}
fn envBrdfApprox(f0: f32, rough: f32, ndv: f32) -> f32 {   // Karis' fit of the split-sum GGX reflectance: rough surfaces stay dim at grazing
  let r = rough * vec4f(-1.0, -0.0275, -0.572, 0.022) + vec4f(1.0, 0.0425, 1.04, -0.04);
  let a004 = min(r.x * r.x, exp2(-9.28 * ndv)) * r.x + r.y;
  let ab = vec2f(-1.04, 1.04) * a004 + r.zw;
  return f0 * ab.x + ab.y;
}
fn fresnelDiel(c0: f32, eta: f32) -> f32 {   // exact unpolarised Fresnel reflectance of a dielectric (as Cycles' Principled v2)
  let c = clamp(c0, 1e-4, 1.0); let g = sqrt(eta * eta - 1.0 + c * c);
  let a = (g - c) / (g + c); let b = (c * (g + c) - 1.0) / (c * (g - c) + 1.0);
  return 0.5 * a * a * (1.0 + b * b);
}
fn refractDir(i: vec3f, n: vec3f, eta: f32) -> vec3f {
  let cosi = -dot(i, n); let k = 1.0 - eta * eta * (1.0 - cosi * cosi);
  if (k <= 0.0) { return i + 2.0 * cosi * n; }
  return normalize(eta * i + (eta * cosi - sqrt(k)) * n);
}
struct Exit { p: vec3f, d: vec3f };
fn boxExit(p: vec3f, t1: vec3f) -> Exit {   // solid glass: leave through the far side of the proxy box (same math as train3.py)
  let A = mat3x3f(O.proxyX.xyz, O.proxyY.xyz, O.proxyZ.xyz);
  let h = vec3f(O.proxyX.w, O.proxyY.w, O.proxyZ.w);
  let lp = transpose(A) * (p - O.proxyC.xyz);
  var ld = transpose(A) * t1;
  ld = select(ld, vec3f(1e-6), abs(ld) < vec3f(1e-6));
  let s3 = max((sign(ld) * h - lp) / ld, vec3f(0.0));
  var nl = vec3f(0.0, 0.0, sign(ld.z)); var s = s3.z;
  if (s3.x <= s3.y && s3.x <= s3.z) { nl = vec3f(sign(ld.x), 0.0, 0.0); s = s3.x; }
  else if (s3.y <= s3.z) { nl = vec3f(0.0, sign(ld.y), 0.0); s = s3.y; }
  return Exit(p + s * t1, refractDir(t1, -(A * nl), IOR));
}
// Glass is shaded physically, not by the network: Fresnel between a probe reflection and what is actually behind it
// (last frame's opaque colour along the ray refracted through the proxy box), plus the sun's glint.
fn glassPath(p0: vec3f, t0: vec3f) -> Exit {   // follow total internal reflection inside the proxy box until the ray leaves
  let A = mat3x3f(O.proxyX.xyz, O.proxyY.xyz, O.proxyZ.xyz);
  let h = vec3f(O.proxyX.w, O.proxyY.w, O.proxyZ.w);
  var p = p0; var d = t0;
  for (var b = 0; b < 4; b++) {
    let lp = transpose(A) * (p - O.proxyC.xyz);
    var ld = transpose(A) * d;
    ld = select(ld, vec3f(1e-6), abs(ld) < vec3f(1e-6));
    let s3 = max((sign(ld) * h - lp) / ld, vec3f(0.0));
    var nl = vec3f(0.0, 0.0, sign(ld.z)); var s = s3.z;
    if (s3.x <= s3.y && s3.x <= s3.z) { nl = vec3f(sign(ld.x), 0.0, 0.0); s = s3.x; }
    else if (s3.y <= s3.z) { nl = vec3f(0.0, sign(ld.y), 0.0); s = s3.y; }
    let no = A * nl;
    p = p + s * d;
    let c = dot(d, no); let k = 1.0 - IOR * IOR * (1.0 - c * c);
    if (k > 0.0) { return Exit(p, normalize(IOR * d + (sqrt(k) - IOR * c) * no)); }
    d = d - 2.0 * c * no;
    p = p - no * 1e-4;
  }
  return Exit(p, d);
}
fn discMask(c: f32, t: f32) -> f32 { let q = (1.0 - c) / (0.5 * t * t); return 1.0 - smoothstep(0.85, 1.15, q); }   // inside a disc of angular radius t
fn glints(r: vec3f, fr: f32, wpos: vec3f, n: vec3f, px: vec2f) -> vec3f {   // mirror highlights of the sun and the lights
  var g = vec3f(0.0);
  if (F.gbounce.z > 0.5) { return g; }   // renderer.glints = false
  // the sources' mirror images: hard discs of their true radiance (sun: E / (pi tan^2), the scene's sun angle; lamp: a 3 cm
  // sphere, I / (pi R^2)). A Phong lobe of the same width keeps saturating tails: a glint several times too big (P3 rig16)
  if (F.sunDir.w > 0.0 && F.gbounce.w < 0.5) {   // gbounce.w: no sun glints (renderer.sunGlints = false)
    let t = max(F.shadow.w, 1e-3);
    g += vec3f(F.sunDir.w / (PI * t * t)) * discMask(dot(r, normalize(F.sunDir.xyz)), t) * sunShadow(wpos, px, true);
  }
  for (var k = 0u; k < u32(LB.info.x); k++) {
    let L = LB.l[k]; if (L.dir.w < -2.5) { continue; }   // floor bounce discs are broad: no glint
    var l = vec3f(0.0); let a = lightAtten(L, wpos, &l);
    if (a > 0.0) { let dd = distance(L.pos.xyz, wpos); let t = 0.03 / max(dd, 0.05);
      g += L.color.rgb * (a * dd * dd) / (PI * 0.0009) * discMask(dot(r, l), t); }   // attenuation (spot cone, cutoff) x I / (pi R^2)
  }
  return fr * g;
}
fn glassShade(n: vec3f, v: vec3f, r: vec3f, ndv: f32, refl: vec3f, wpos: vec3f, px: vec2f, useSS: bool) -> vec3f {
  let fr = 0.04 + 0.96 * pow(1.0 - clamp(ndv, 0.0, 1.0), 5.0);
  var ex = Exit(wpos, -v);
  if (O.proxyC.w > 0.5) { ex = glassPath(wpos, refractDir(-v, n, 1.0 / IOR)); }
  var refr = priorAt(probeDir(ex.p, ex.d, O.probe.xyz), 0, i32(O.probe.w)) * F.misc.x;
  if (useSS) { let D = select(1.0, min(-ex.p.y / min(ex.d.y, -1e-3), 3.0), ex.d.y < -1e-3); refr = sceneAt(ex.p + ex.d * D, refr); }
  return fr * refl * F.misc.x + (1.0 - fr) * (1.0 - fr) * vec3f(0.90, 0.95, 0.97) * refr + glints(r, fr, wpos, n, px);
}
// Thin (automotive) glass, as in the Cycles bake: Fresnel mix of a mirror and straight-through transmission.
fn thinGlassShade(n: vec3f, v: vec3f, r: vec3f, ndv: f32, refl: vec3f, wpos: vec3f, px: vec2f, useSS: bool) -> vec3f {
  let fr = 0.04 + 0.96 * pow(1.0 - clamp(ndv, 0.0, 1.0), 5.0);
  var behind = priorAt(probeDir(wpos, -v, O.probe.xyz), 0, i32(O.probe.w)) * F.misc.x;
  if (useSS) { behind = sceneAt(wpos - v * 0.35, behind); }
  return fr * refl * F.misc.x + (1.0 - fr) * vec3f(0.90, 0.95, 0.97) * behind + glints(r, fr, wpos, n, px);
}
fn look(level: i32, dA: vec3f, dB: vec3f) -> vec3f {
  var c = priorAt(dA, level, i32(O.probe.w));
  if (O.params.z > 0.0) { c = mix(c, priorAt(dB, level, i32(O.probe2.w)), O.params.z); }
  return c;
}
// the learned lobe BRDF (network outputs, once per pixel) evaluated for one light direction
fn lobeBrdf(spc: vec3f, lob: vec4f, dif: vec3f, wrp: vec3f, rl0: f32, nl: f32) -> vec3f {
  let rl = clamp(rl0, 0.0, 1.0);
  return spc * (${g})${n.sun?.lobeCos ? " * max(nl, 0.0)" : ""} + dif * (max(nl, 0.0) / PI) + wrp * ((nl + 1.0) * (nl + 1.0) * 0.25 / PI);
}
// the material's own BRDF x cosine (manifest.analytic: plain Principled surfaces, optional clear coat): exact under any light, where
// the learned lobes only saw the baked sun and one random direction per view (P3 gate: they speckle the floor under a moved sun)
// srcR: the source's angular radius (tan): the sun's disc, a lamp's sphere. Karis 2013's widening (alpha + srcR / 3, energy
// renormalised): a smooth surface shows the source's disc, not a point light's pin-prick with saturating GGX tails
fn pbrDirect(n: vec3f, v: vec3f, l: vec3f, srcR: f32) -> vec3f {
  let nl = dot(n, l); if (nl <= 0.0) { return vec3f(0.0); }
  let base = O.baseColor.rgb; let metal = O.mr.y;
  let nv = max(dot(n, v), 1e-4); let h = normalize(l + v); let nh = max(dot(n, h), 0.0); let vh = max(dot(v, h), 0.0);
  let a0 = sqrt(max(O.mr.x * O.mr.x, 2e-3) * max(O.mr.x * O.mr.x, 2e-3) + O.mflags6.z); let a1 = min(a0 + srcR * 0.333, 1.0);   // Toksvig: + detail variance
  let ggx = fn_ggx(nh, nl, nv, a1) * (a0 / a1) * (a0 / a1);
  let fs = pow(1.0 - vh, 5.0); let f0 = mix(vec3f(0.04), base, metal); let F = f0 + (1.0 - f0) * fs;
  var c = ((1.0 - F) * (1.0 - metal) * base / PI + ggx * F) * nl;
  if (O.mr.z > 1.001) {   // clear coat (IOR 1.5, weight mr.z - 1) over the base: its own sharp lobe, the base behind (1 - w Fc)
    let fc = (0.04 + 0.96 * fs) * (O.mr.z - 1.0);
    let c0 = max(O.mr.w * O.mr.w, 2e-3); let c1 = min(c0 + srcR * 0.333, 1.0);
    c = c * (1.0 - fc) + fn_ggx(nh, nl, nv, c1) * (c0 / c1) * (c0 / c1) * fc * nl;
  }
  return c;
}
// sf-drive: a studio bundle (no sun term) driven outdoors: the sun's direct light added analytically from the material
// (base colour diffuse + a clear-coat lobe on paint, a weaker one elsewhere), shadowed by the live sun shadow map
fn neuralSun(p: vec3f, n: vec3f, px: vec2f, smode: i32) -> vec3f {
  if (F.sunDir.w <= 0.0 || smode == 2 || smode == 3) { return vec3f(0.0); }
  let l = normalize(F.sunDir.xyz); let nl = dot(n, l); if (nl <= 0.0) { return vec3f(0.0); }
  let v = normalize(F.camPos.xyz - p); let nv = max(dot(n, v), 1e-4); let h = normalize(l + v); let nh = max(dot(n, h), 0.0);
  let fs = pow(1.0 - max(dot(v, h), 0.0), 5.0);
  let paint = select(0.35, 1.0, smode == 4);
  let base = O.baseColor.rgb * (1.0 - O.mr.y);
  let spec = fn_ggx(nh, nl, nv, 0.06) * (0.04 + 0.96 * fs) + fn_ggx(nh, nl, nv, 0.3) * (0.04 + 0.96 * fs) * 0.5;
  return (base * (1.0 - 0.04) / PI * 0.85 + vec3f(spec * paint)) * nl * F.sunDir.w * sunShadow(p, px, true);
}
fn fn_ggx(nh: f32, nl: f32, nv: f32, a: f32) -> f32 {   // GGX D x height-correlated Smith visibility (= D G / (4 nl nv))
  let a2 = a * a; let dd = nh * nh * (a2 - 1.0) + 1.0; let d = a2 / (PI * dd * dd);
  let gv = nl * sqrt(nv * nv * (1.0 - a2) + a2); let gl = nv * sqrt(nl * nl * (1.0 - a2) + a2);
  return d * 0.5 / max(gv + gl, 1e-5);
}
fn neuralLight(i: u32, p: vec3f, n: vec3f, r: vec3f, px: vec2f, spc: vec3f, lob: vec4f, dif: vec3f, wrp: vec3f) -> vec3f {
  let L = LB.l[i]; var l = vec3f(0.0); let a = lightAtten(L, p, &l);
  if (a <= 0.0) { return vec3f(0.0); }
  let nl = dot(n, l);
  if (L.dir.w < -2.5) {   // floor bounce: a broad source, the diffuse part of the material only
    if (O.mr.z > 0.5) { return L.color.rgb * a * O.baseColor.rgb * (1.0 - O.mr.y) * (max(nl, 0.0) / PI); }
    return L.color.rgb * a * (dif * (max(nl, 0.0) / PI) + wrp * ((nl + 1.0) * (nl + 1.0) * 0.25 / PI));
  }
  var sh = 1.0; let t = i32(L.extra.y);
  if (t >= 0) { sh = spotShadow(t, p, n, px); }
  if (O.mr.z > 0.5) { return L.color.rgb * a * sh * pbrDirect(n, 2.0 * dot(n, r) * n - r, l, 0.03 / max(distance(L.pos.xyz, p), 0.05)); }
  return L.color.rgb * a * sh * lobeBrdf(spc, lob, dif, wrp, dot(r, l), dot(n, l));
}
fn floorLampRadiance(hp: vec3f, px: vec2f) -> vec3f {   // radiance of the (diffuse) floor at hp under the lamps
  var e = vec3f(0.0);
  for (var k = 0u; k < u32(LB.info.y); k++) {
    let L = LB.l[k]; if (L.dir.w < -2.5) { continue; }
    var l = vec3f(0.0); let a = lightAtten(L, hp, &l);
    if (a <= 0.0 || l.y <= 0.0) { continue; }
    var sh = 1.0; let t = i32(L.extra.y); if (t >= 0) { sh = spotShadow(t, hp, vec3f(0.0, 1.0, 0.0), px); }
    e += L.color.rgb * a * l.y * sh;
  }
  if (F.sunOld.w > 0.5 && F.sunDir.w > 0.0) {   // moved sun: its light on the floor for the baked sun's (baked into the probe)
    let sd = normalize(F.sunDir.xyz);
    e += vec3f(F.sunDir.w * (max(sd.y, 0.0) * sunShadow(hp, px, false) - max(F.sunOld.y, 0.0)));
  }
  return F.floorRefl.rgb * e / PI;
}
fn punctual(p: vec3f, n: vec3f, r: vec3f, px: vec2f, spc: vec3f, lob: vec4f, dif: vec3f, wrp: vec3f) -> vec3f {
  var c = vec3f(0.0);
  for (var k = 0u; k < u32(LB.info.x); k++) { c += neuralLight(k, p, n, r, px, spc, lob, dif, wrp); }
  if (F.misc.z < 0.5 && LB.info.y > LB.info.x) {   // small lights: only the ones listed for this cluster (main pass)
    let b = clusterBase(px, p); let cnt = CLU[b];
    for (var k = 0u; k < cnt; k++) { c += neuralLight(CLU[b + 1u + k], p, n, r, px, spc, lob, dif, wrp); }
  }
  return c;
}
`,
    x = gct(n, d);
  return (
    (e
      ? `enable f16;
`
      : "") +
    (s ? uct(!!n.detailNormals) : Ec) +
    tR(r) +
    (n.detailNormals ? DU : "") +
    (n.tires ? mct(n.tires) : "") +
    (n.coat ? pct : "") +
    b +
    d.decls +
    `
@fragment fn fs(i: VOut) -> FOut { let c0 = shade(i); let c = select(vec3f(0.0), c0, c0 == c0); return FOut(fogged(present(c), i.wpos), vec4f(c, viewDepth(i.wpos))); }
@fragment fn fsLin(i: VOut) -> @location(0) vec4f { return vec4f(shade(i)${n.studioFloor?.underside != null ? ` * mix(1.0, ${(+n.studioFloor.underside).toFixed(4)}, smoothstep(-0.15, -0.6, normalize(i.wnrm).y))` : ""}, 1.0); }
@fragment fn fsDepth() {}   // depth pre-pass: no colour, so the network runs once per pixel afterwards
${s ? dct : OU}
fn shade(i: VOut) -> vec3f {
  var n = normalize(i.wnrm);
  let v = normalize(F.camPos.xyz - i.wpos);
  if (dot(n, v) < 0.0) { n = -n; }                 // two-sided, as in training
  let ndv = dot(n, v);
  let r = 2.0 * ndv * n - v;
  let rfw = length(fwidth(r)) * 0.7;   // studio tubes: the reflection's footprint per pixel
  let layer = i32(O.params.x);${
    n.tires
      ? `
  let tuv = tireUV(i.wpos); let tdx = dpdx(tuv); let tdy = dpdy(tuv);   // tyres (manifest.tires): polar atlas coordinates around the nearest axle`
      : ""
  }${
    n.studioFloor?.concreteTex
      ? `
  let cuv = i.wpos.xz * ${(1 / n.studioFloor.concreteTex).toFixed(5)}; let cdx = dpdx(cuv); let cdy = dpdy(cuv);   // the floor's concrete texture (material map, world space)`
      : ""
  }${
    n.detailNormals
      ? `
  var rd = r; var dk = 0.0;   // detail normal map (manifest.detailNormals): bends the specular lookups only; the network sees the smooth normal
  { let muv = vec2f(dot(O.uvT0.xyz, vec3f(i.uv2, 1.0)), dot(O.uvT1.xyz, vec3f(i.uv2, 1.0))); let nd = detailNormal(n, i.wpos, muv);
    // flakes far below a pixel are roughness, not per-pixel normals (one bent lookup per pixel against HDR softboxes
    // speckles; Cycles averages many flakes per pixel): fade the bend with the texels per pixel, blur by the rest
    let tpp = max(length(dpdx(muv)), length(dpdy(muv))) * f32(textureDimensions(matDetail).x);
    dk = clamp(1.5 / max(tpp, 1e-3), 0.0, 1.0);
    if (O.mflags.y > 0.5) { let nb = normalize(mix(n, nd, dk)); rd = 2.0 * max(dot(nb, v), 1e-3) * nb - v; } }`
      : ""
  }
  ${h.join(`
  `)}
  ${d.body}
  ${x}
}
`
  );
}
