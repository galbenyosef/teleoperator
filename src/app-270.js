// app 270 — math
// Lines 135192-135532 of readable/app.pretty.js (statement-aligned).
function J3t() {
  let e = document.createElement("canvas");
  ((e.width = 128), (e.height = 256));
  let s = e.getContext("2d"),
    n = s.createImageData(128, 256),
    i = n.data,
    a = 1.9,
    r = 4.7,
    l = a / 2,
    c = r / 2,
    h = 0.4,
    f = 0.4,
    u = [
      [-0.8, -1.4],
      [0.8, -1.4],
      [-0.8, 1.4],
      [0.8, 1.4],
    ];
  for (let p = 0; p < 256; p++)
    for (let m = 0; m < 128; m++) {
      let g = ((m + 0.5) / 128 - 0.5) * qZ * a,
        b = ((p + 0.5) / 256 - 0.5) * jZ * r,
        v = Math.abs(g) - (l - h),
        x = Math.abs(b) - (c - h),
        y =
          Math.hypot(Math.max(v, 0), Math.max(x, 0)) +
          Math.min(Math.max(v, x), 0) -
          h,
        M = Math.min(1, Math.max(0, (y + f * 0.25) / f)),
        S = 1 - M * M * (3 - 2 * M),
        w = Math.min(1, Math.max(0, -y / 0.6)),
        _ = S * (0.16 + 0.34 * w * w);
      for (let [A, T] of u)
        _ += 0.42 * Math.exp(-(((g - A) / 0.17) ** 2 + ((b - T) / 0.32) ** 2));
      let z = (p * 128 + m) * 4;
      ((i[z] = i[z + 1] = i[z + 2] = 0), (i[z + 3] = Math.min(255, _ * 255)));
    }
  s.putImageData(n, 0, 0);
  let d = new Sn(e);
  return ((d.colorSpace = Nn), (d.anisotropy = 8), d);
}
function wF() {
  return (
    d_ ||
      ((WZ = typeof document > "u" ? null : J3t()),
      (d_ = new Ys({ map: WZ, color: 0, transparent: !0, depthWrite: !1 })),
      (d_.name = "CarContactShadow")),
    d_
  );
}
function MF() {
  return (
    p_ ||
      ((p_ = new Yn(1, 1).rotateX(-Math.PI / 2)), p_.computeBoundingSphere()),
    p_
  );
}
function m_(o, t = "CarShadows") {
  let e = new En(MF(), wF(), Math.max(1, o));
  return (
    (e.castShadow = !1),
    (e.receiveShadow = !1),
    (e.name = t),
    (e.renderOrder = 1),
    (e.matrixAutoUpdate = !1),
    e
  );
}
function Of(o, t, e, s, n, i, a) {
  let r = Math.sin(s),
    l = Math.cos(s),
    c = n * qZ,
    h = i * jZ,
    f = i * 0.5,
    u = n * 0.5,
    d = a(t + r * f, e + l * f),
    p = a(t - r * f, e - l * f),
    m = a(t + l * u, e - r * u),
    g = a(t - l * u, e + r * u),
    b = Math.max(a(t, e), (d + p + m + g) * 0.25) + Y3t,
    v = (m - g) / n,
    x = (d - p) / i,
    y = -(l * v + r * x),
    M = 1,
    S = -(-r * v + l * x),
    w = Math.hypot(y, M, S);
  return (
    (y /= w),
    (M /= w),
    (S /= w),
    o.set(
      l * c,
      y,
      r * h,
      t,
      v * c,
      M,
      x * h,
      b,
      -r * c,
      S,
      l * h,
      e,
      0,
      0,
      0,
      1,
    ),
    o
  );
}
es();
var Z3t = typeof location < "u" && /[?&]oldlow\b/.test(location.search || ""),
  Wp = (o) =>
    Z3t
      ? o
      : o.replace(
          /(?<!select\(0\.5, )fract\(52\.9829189 \* fract\(dot\([^,]+? \* F\.sunB\.w, vec2f\(0\.06711056, 0\.00583715\)\)\)\)/g,
          (t) => `select(0.5, ${t}, F.sunB.w > 0.5)`,
        ),
  KZ = (o, t, e, s = "1.0") => `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let t = textureSampleBias(matMap, matSamp, uv, 0.5 * smoothstep(14.0, 40.0, length(F.camPos.xyz - wp)));   // (a touch blurrier with distance: steadier under the TAA jitter; crisp leaves near the camera, round 11)
  let dim = vec2f(textureDimensions(matMap));
  let du = dpdx(uv * dim); let dv = dpdy(uv * dim);
  let lod = 0.5 * log2(max(max(dot(du, du), dot(dv, dv)), 1e-8));
  var a = t.a * (1.0 + 0.1 * clamp(lod - 1.0, 0.0, 5.0));   // alpha-tested cards keep their coverage down the mip chain
  // cards seen edge-on fade out (they would read as streaks; the crown's other cards cover for them)
  let ng = normalize(cross(dpdx(wp), dpdy(wp))); let ve = normalize(F.camPos.xyz - wp);
  a *= smoothstep(0.06, 0.32, abs(dot(ng, ve)));
  // (round 27) the leaves within ~2.5 m of the camera dissolve (the dither below): reversing under a street tree put the
  // chase camera inside its crown, the screen a wall of black leaves
  a *= smoothstep(0.9, 2.6, length(F.camPos.xyz - wp));
  // dead leaves (vertex alpha < 0.1): the photo's luminance in straw and brown
  let dead = smoothstep(0.1, 0.03, col.a);
  // (SF's street trees: London planes, ficus, Brisbane box - a deeper, cooler green than NFS's yellow foliage (the photo's
  // blue-green barely warmed; the sun through the leaves an olive green, not lime); the edge a stochastic coverage (a noise
  // per pixel, turned every TAA frame) instead of the hard 0.5 cut, so the history resolves soft, anti-aliased leaf edges)
  // (round 21: a quarter less saturated - the photos' street trees are olive, (130, 140, 100) at 30-80 m, where ours read
  // lime - and a touch warmer: the sunlit tops toward NFS's yellow-green; sat: the photo's saturation kept)
  let tl = dot(t.rgb, vec3f(0.3, 0.55, 0.15));
  let c = mix(mix(vec3f(tl), t.rgb, ${s}) * ${o}, vec3f(tl) * vec3f(1.9, 1.45, 0.95), dead) * col.rgb;
  { let cc = F.vpu * vec4f(wp, 1.0); let px = floor((cc.xy / cc.w * 0.5 + 0.5) / F.screen.xy);
    let nz = fract(52.9829189 * fract(dot(px + 7.31 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a = select(0.0, 1.0, smoothstep(0.3, 0.7, a) > nz * 0.9 + 0.05); }
  gHT = vec4f(t.rgb * ${t} * mix(0.25, 1.0, col.a) * (1.0 - 0.8 * dead) * (0.55 + 0.45 * col.r), 1.0);
  // (round 22) the leaves' waxy sheen: a glossier surface, its sky reflection occluded by the crown's own depth (the
  // vertex colour carries the baked light inside the crown: deep sprays see little sky, so they mirror little of it)
  let crownAO = clamp(dot(col.rgb, vec3f(0.3, 0.55, 0.15)) * 1.15, 0.0, 1.0);
  gHAO = mix(1.0, crownAO, 0.6);
  gHGF = 0.3;   // (night48: 0.55 -> 0.3, the crowns read lit by day at night) (round 27) the street's glow through the crowns at night (renderer gHGF): no black cut-outs
  gHK = vec4f(mix(mix(${e}, 0.9, smoothstep(15.0, 45.0, length(F.camPos.xyz - wp))), 1.0, dead), 0.0, 0.0, 1.0);   // (the sheen near the camera: further off a sprayful of glints read as pale blotches)
  return vec4f(c, a);
}
`,
  Q3t = Wp(
    KZ(
      "vec3f(0.8, 0.88, 0.7) * 0.95",
      "vec3f(0.14, 0.17, 0.05)",
      "0.7",
      "0.76",
    ),
  ),
  $Z = Wp(KZ("vec3f(0.93, 0.96, 0.72)", "vec3f(0.1, 0.12, 0.04)", "0.86")),
  SF = Wp(`
fn mbAlbedo(uv0: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let b0 = floor(uv0 * 4.0); let cell = b0.x + 4.0 * b0.y + floor(col.b * 16.0);   // (the geometry's own cell + the instance's step)
  let uv = (uv0 * 4.0 - b0 + vec2f(cell % 4.0, floor(cell / 4.0))) * 0.25;
  let dist = length(F.camPos.xyz - wp);
  let t = textureSampleBias(matMap, matSamp, uv, 0.5 * smoothstep(14.0, 40.0, dist));
  let dim = vec2f(textureDimensions(matMap));
  let du = dpdx(uv0 * dim); let dv = dpdy(uv0 * dim);
  let lod = 0.5 * log2(max(max(dot(du, du), dot(dv, dv)), 1e-8));
  var a = t.a * (1.0 + 0.12 * clamp(lod - 1.0, 0.0, 5.0));
  let dp1 = dpdx(wp); let dp2 = dpdy(wp);
  let ng = normalize(cross(dp1, dp2)); let ve = normalize(F.camPos.xyz - wp);
  a *= smoothstep(0.05, 0.28, abs(dot(ng, ve)));
  let ao = vec3f(col.r, col.g, 0.5 * (col.r + col.g) * 0.96);
  let c = t.rgb * vec3f(0.86, 0.94, 0.86) * 0.86 * ao;
  { let cc = F.vpu * vec4f(wp, 1.0); let px = floor((cc.xy / cc.w * 0.5 + 0.5) / F.screen.xy);
    let nz = fract(52.9829189 * fract(dot(px + 7.31 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a = select(0.0, 1.0, smoothstep(0.3, 0.7, a) > nz * 0.9 + 0.05); }
  // the photo's own relief in the card's frame (cotangent frame from the derivatives; screen y down: as detailNormal)
  // (derivatives and implicit-lod samples in uniform control flow: no branch round them)
  { let nm = textureSampleBias(matDetail, matSamp, uv, 0.5).xyz * 2.0 - 1.0;
    let d1 = dpdx(uv0); let d2 = -dpdy(uv0);
    let N0 = select(ng, -ng, dot(ng, ve) < 0.0);
    let p2 = cross(-dp2, N0); let p1 = cross(N0, dp1);
    let T = p2 * d1.x + p1 * d2.x; let B = p2 * d1.y + p1 * d2.y;
    let inv = inverseSqrt(max(max(dot(T, T), dot(B, B)), 1e-20));
    gHN = vec4f((T * inv * nm.x + B * inv * nm.y) * 0.7 * (1.0 - smoothstep(25.0, 45.0, dist)), 1.0); }
  let thin = clamp((max(t.r, max(t.g, t.b)) - min(t.r, min(t.g, t.b))) * 2.2, 0.2, 1.0);   // (saturated leaf tissue glows, stems and flowers' white less)
  gHT = vec4f(t.rgb * vec3f(0.11, 0.15, 0.06) * thin * mix(0.4, 1.0, col.a) * (0.5 + 0.5 * col.r), 1.0);
  gHK = vec4f(0.78, 0.0, 0.0, 1.0);
  return vec4f(c, a);
}
`),
  bM = [340, 420],
  tyt = Wp(`
fn mbAlbedo(uv0: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  // (round 22: three views a species - front, side, top: (species x 3 + view + 0.5) / 64 in the blue, 8 x 5 cells)
  let G = vec2f(8.0, 5.0); let b0 = floor(uv0 * G); let view = b0.x; let cell = b0.x + 8.0 * b0.y + floor(col.b * 64.0);
  let lc = uv0 * G - b0; let uv = (lc + vec2f(cell % 8.0, floor(cell / 8.0))) / G;
  let t = textureSample(matMap, matSamp, uv);
  let d = length(F.camPos.xyz - wp);
  let dp1 = dpdx(wp); let dp2 = dpdy(wp); let d1 = dpdx(uv0); let d2 = -dpdy(uv0);
  let ng = normalize(cross(dp1, dp2)); let ve = normalize(F.camPos.xyz - wp);
  let N0 = select(ng, -ng, dot(ng, ve) < 0.0);
  let p2 = cross(-dp2, N0); let p1 = cross(N0, dp1);
  let T = p2 * d1.x + p1 * d2.x; let B = p2 * d1.y + p1 * d2.y;
  let inv = inverseSqrt(max(max(dot(T, T), dot(B, B)), 1e-20));
  let top = view > 1.5;
  let sx = (lc.x - 0.5) * 1.6; let sy = select((0.62 - lc.y) * 1.4, (0.5 - lc.y) * 1.6, top); let sz = sqrt(max(1.0 - sx * sx - sy * sy, 0.15));
  gHN = vec4f(T * inv * sx + B * inv * sy + N0 * (sz - 1.0), 1.0);
  // the side views give way to the top view as the view steepens (a hilltop's look down into a forest), each view's
  // quad faded as it turns edge-on
  let el = abs(ve.y);
  var a = t.a * select(smoothstep(0.08, 0.35, abs(dot(ng, ve))) * (1.0 - smoothstep(0.5, 0.8, el)), smoothstep(0.22, 0.55, el), top);
  let cc = F.vpu * vec4f(wp, 1.0); let px = floor((cc.xy / cc.w * 0.5 + 0.5) / F.screen.xy);
  let nz = fract(52.9829189 * fract(dot(px + 5.588238 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
  let nz2 = fract(52.9829189 * fract(dot(px + 7.31 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
  a = select(0.0, 1.0, smoothstep(0.3, 0.7, a) > nz2 * 0.9 + 0.05) * (1.0 - step(smoothstep(${bM[0].toFixed(1)}, ${bM[1].toFixed(1)}, d), nz));
  gHT = vec4f(t.rgb * vec3f(0.08, 0.1, 0.04), 1.0);
  gHK = vec4f(0.85, 0.0, 0.0, 1.0);
  return vec4f(t.rgb * vec3f(col.r, col.g, 0.5 * (col.r + col.g)), a);
}
`),
  Qx = [
    [48, 64],
    [132, 162],
  ];
function eyt(o, t) {
  let [e, s] = Qx,
    n = (c, h) => `smoothstep(${c.toFixed(1)}, ${h.toFixed(1)}, d)`,
    i =
      t === 0
        ? `step(${n(...e)}, n)`
        : t === 1
          ? `(1.0 - step(${n(...e)}, n)) * step(${n(...s)}, n)`
          : `(1.0 - step(${n(...s)}, n)) * step(${n(...bM)}, n)`,
    a = Wp(`
fn sfLodKeep(wp: vec3f) -> f32 {
  let d = length(F.camPos.xyz - wp);
  let c = F.vpu * vec4f(wp, 1.0); let px = floor((c.xy / c.w * 0.5 + 0.5) / F.screen.xy);
  let n = fract(52.9829189 * fract(dot(px + 5.588238 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
  return ${i};
}
`),
    r = o.indexOf("fn mbAlbedo"),
    l = o.lastIndexOf("return vec4f(c, a);");
  if (r < 0 || l < 0) throw new Error("lodFadeHook: not a leaf hook");
  return (
    o.slice(0, r) +
    a +
    o.slice(r, l) +
    "return vec4f(c, a * sfLodKeep(wp));" +
    o.slice(l + 19)
  );
}
var kF = new Set(["leaf", "leafmass", "fanleaf", "frond", "shrubleaf"]);
function xM(o) {
  let t = o.userData;
  o.userData = {};
  let e = o.clone();
  return ((o.userData = t), e);
}
var XZ = new WeakMap();
function zF(o, t) {
  let e = XZ.get(o);
  if ((e || XZ.set(o, (e = [])), !e[t])) {
    let s = xM(o);
    ((s.userData = { ...o.userData, mbAlbedo: eyt(o.userData.mbAlbedo, t) }),
      (s.name = (o.name || "leaf") + "_lod" + t),
      (e[t] = s));
  }
  return e[t];
}
function YZ(o = {}) {
  let t = (i, a, r = {}, l = Q3t) => {
      let c = new me({
        color: 16777215,
        roughness: 0.6,
        metalness: 0,
        vertexColors: !0,
        map: i,
        alphaTest: 0.5,
        side: ls,
        ...r,
      });
      return ((c.userData.mbAlbedo = l), (c.userData.mbWind = a), c);
    },
    e = (i, a, r, l = 1) => {
      let c = new me({
        color: Array.isArray(l) ? new It(...l) : new It(l, l, l),
        roughness: 0.92,
        metalness: 0,
        vertexColors: !0,
        map: i || null,
        normalMap: a || null,
      });
      return (a && c.normalScale.set(1.2, 1.2), (c.userData.mbWind = r), c);
    },
    s = (i, a = 0.8) =>
      i && !globalThis.SF_LITE
        ? { normalMap: i, normalScale: new Pe(a, a) }
        : {},
    n = {
      leaf: t(o.twigs, 2.1, s(o.twigs_n)),
      leafmass: t(o.foliage || o.twigs, 2.1),
      fanleaf: t(o.palms, 3.07, {}, $Z),
      frond: t(o.palms, 3.07, {}, $Z),
      bark: e(o.bark, o.bark_n || null, 0.1),
      bark_cyp: e(o.bark_cyp, o.bark_cyp_n, 0.1),
      bark_euc: e(o.bark_euc, o.bark_euc_n, 0.1, [0.66, 0.62, 0.55]),
      bark_palm: e(o.bark_palm, o.bark_palm_n, 0.07),
      bark_head: e(o.bark_head, o.bark_head_n, 0.07),
      bark_fan: e(o.bark_fan, o.bark_fan_n, 0.07),
      well: new me({
        color: 16777215,
        map: o.soil || null,
        roughness: 0.95,
        vertexColors: !0,
      }),
      shrubcore: new me({
        color: 16777215,
        map: o.twigs,
        roughness: 0.85,
        vertexColors: !0,
      }),
      shrubleaf: t(o.shrubs || o.twigs, 2.06, {}, SF),
    };
  return (
    o.shrubs_n &&
      !globalThis.SF_LITE &&
      (n.shrubleaf.userData.mbMap1 = o.shrubs_n),
    (n.shrubleaf.userData.mbAtlas4 = !0),
    (n.shrubcore.userData.mbWind = 0),
    (n.impostorTex = o.impostors || null),
    n
  );
}
