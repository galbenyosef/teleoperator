// app 255 — app
// Lines 130068-130331 of readable/app.pretty.js (statement-aligned).
var xm = `
var<private> crE: vec3f = vec3f(0.0);
fn crH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
// the night factor from the city's glow (renderer: the hemisphere is on only at night)
fn crNight() -> f32 { return clamp(dot(F.hemiSky.rgb, vec3f(0.3333)) * 40.0, 0.0, 1.0); }   // (night49: x40 - the glow fill is dimmer now)
fn crCity(p: vec3f, r: vec3f, crN: f32) -> vec4f {
  // (no early returns before the derivatives: uniform control flow)
  // (the street's axis: the camera's heading over the ground - the chase camera looks down the street; the facades 11 m
  // either side of it, the far end 160 m off where the street's walls close as the distant city)
  let fwd = -vec3f(F.view[0].z, F.view[1].z, F.view[2].z);
  let ax = normalize(vec2f(fwd.x, fwd.z) + vec2f(1e-4, 0.0)); let sd = vec2f(-ax.y, ax.x);
  let h0 = 1.1;
  let rx = dot(r.xz, sd); let t = min(11.0 / max(abs(rx), 1e-4), 160.0);
  let onX = rx > 0.0;
  let along = dot(p.xz + r.xz * t, ax) + select(0.0, 500.0, onX);
  let rel = h0 + r.y * t;   // the height over the street
  let fw = max(fwidth(along), fwidth(rel)) + 1e-3;   // (metres a pixel on that wall)
  // the street: a downward ray meets it before the wall - the lamps' pools on it at night (a warm patch every 30 m)
  let street = r.y < 0.0 && -h0 / r.y < t;
  let ts = -h0 / min(r.y, -1e-4); let q = p.xz + r.xz * ts;
  let qa = dot(q, ax); let ql = abs(dot(q - p.xz, sd));
  let pool = exp(-pow(fract(qa / 30.0) - 0.5, 2.0) * 30.0) * exp(-pow(ql - 7.0, 2.0) / 18.0);
  let streetE = vec3f(1.0, 0.72, 0.45) * pool * crN * 0.05;
  let lot = floor(along / 18.0); let hb = crH(vec2f(lot, select(3.1, 5.7, onX))); let hc = crH(vec2f(lot, 9.3));
  let top = 11.0 + 45.0 * hb * hb;
  // the roofline (a soft edge: the cornice under a pixel or two)
  let roof = (1.0 - smoothstep(top - fw, top + fw, rel)) * (1.0 - smoothstep(0.8, 0.95, r.y));
  let ul = along - lot * 18.0;
  let gap = smoothstep(0.0, 0.6 + fw, min(ul, 18.0 - ul));   // (an alley's sliver of dark between lots)
  let glassy = step(0.7, fract(hb * 13.7)); let pale = step(0.55, fract(hc * 29.1));
  var alb = mix(mix(vec3f(0.42, 0.37, 0.31), vec3f(0.66, 0.64, 0.6), pale) * (0.75 + 0.4 * fract(hc * 17.3)), vec3f(0.2, 0.24, 0.29), glassy);
  // storeys and bays: the windows' share (box-filtered to their mean under a pixel)
  let fh = mix(3.3, 3.9, glassy); let cw = mix(1.7 + 0.8 * fract(hc * 7.1), 3.0, glassy);
  let fu = fract(ul / cw); let fv = fract((rel - 4.2) / fh);
  let ww = mix(0.62, 0.9, glassy); let wh = mix(0.55, 0.7, glassy);
  let sharp = 1.0 - smoothstep(0.25, 0.7, fw / min(cw, fh));
  let winS = step(abs(fu - 0.5), ww * 0.5) * step(abs(fv - 0.5), wh * 0.5);
  let up = step(4.2, rel);
  let win = mix(ww * wh, winS, sharp) * up;
  alb = mix(alb, vec3f(0.06, 0.07, 0.085), win * 0.85);
  // who is home: three rooms in ten lit, each its own bulb (2700 K .. 4000 K, a TV's blue now and then)
  let room = vec2f(floor(ul / cw) + lot * 31.0, floor((rel - 4.2) / fh));
  let lh = crH(room); let lt = crH(room + vec2f(7.7, 1.3));
  let litS = step(0.7, lh);
  let lit = mix(0.3 * 0.75, litS * (0.55 + 0.9 * lt), sharp);
  let warm = mix(vec3f(1.0, 0.7, 0.42), vec3f(1.0, 0.86, 0.68), smoothstep(0.3, 0.9, lt));
  let tone = mix(warm, vec3f(0.55, 0.7, 1.0), step(0.93, lt) * sharp);
  crE = tone * win * lit * 0.24;
  // the street's shops: the ground floor's glass (dark by day), lit at night - most open, a few shuttered
  let shopV = smoothstep(0.35, 0.35 + fw, rel) * (1.0 - smoothstep(3.3 - fw, 3.3, rel));
  let bay = fract(ul / 4.5); let shopU = mix(0.8, step(0.08, bay) * step(bay, 0.92), sharp);
  let open = step(0.22, crH(vec2f(floor(ul / 4.5) + lot * 13.0, 2.0)));
  let shop = shopV * shopU * (1.0 - glassy * 0.3);
  alb = mix(alb, vec3f(0.05, 0.055, 0.06), shop);
  let sc = crH(vec2f(lot, 4.4));
  let shopC = mix(vec3f(1.0, 0.74, 0.48), vec3f(0.95, 0.93, 0.85), step(0.6, sc));
  crE += shopC * shop * mix(0.7, open, sharp) * 0.9 * (0.55 + 0.6 * smoothstep(0.35, 3.0, rel));
  // a sign over some of them: a neon band (red, pink, cyan, amber)
  let signV = smoothstep(3.55, 3.55 + fw, rel) * (1.0 - smoothstep(4.0 - fw, 4.0, rel)) * step(0.62, hc) * step(abs(ul - 9.0), 4.5);
  let nc = fract(hc * 41.0);
  let neon = select(select(select(vec3f(1.0, 0.62, 0.18), vec3f(0.2, 0.85, 1.0), nc < 0.72), vec3f(1.0, 0.25, 0.6), nc < 0.45), vec3f(1.0, 0.12, 0.08), nc < 0.2);
  crE += neon * signV * 2.2;
  // the street lamps: a head at 7.5 m every 30 m along the kerb (a bright point: the glass' glint)
  let la = fract((along + 7.0) / 30.0) * 30.0 - 15.0; let ld = length(vec2f(la, (rel - 7.5) * 1.3));
  let lamp = exp(-ld * ld / max(0.09, fw * fw * 1.5)) * mix(0.35, 1.0, sharp);
  let lc = select(vec3f(1.0, 0.66, 0.34), vec3f(1.0, 0.9, 0.78), crH(vec2f(floor((along + 7.0) / 30.0), 1.7)) > 0.4);
  crE = (crE + lc * lamp * 14.0) * crN * gap * roof;
  // (the lamps' light on the facades' lowest storeys: the warm pools reach up the walls)
  crE += alb * vec3f(1.0, 0.75, 0.5) * 0.05 * crN * (1.0 - smoothstep(2.0, 9.0, rel)) * gap * roof;
  if (street) { crE = streetE; return vec4f(vec3f(0.055, 0.055, 0.058), 1.0); }
  return vec4f(alb * gap * mix(1.0, 0.3, crN), roof);   // (at night the facades dim: their rooms, shops and lamps read)
}
`;
var tx =
  xm +
  `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let t = textureSample(matMap, matSamp, uv);
  // (tyres49) the wheel kit's tyre (zone 11.5, city/tyres.js: uv.x round the wheel, uv.y across its section - the crown
  // 0.31-0.69): the tread's height (1 a block's face, 0 a groove's floor) - three circumferential grooves, the shoulder
  // blocks cut by lateral grooves, the ribs by fine slanted sipes - faded to its average once a block is under a pixel or
  // two; its slope a bump (the derivatives here: uniform control flow)
  let tq = vec2f(uv.x * 64.0, (uv.y - 0.31) / 0.38); let tfw = max(fwidth(tq), vec2f(1e-4));
  let tgv = abs(fract(tq.y * 3.6 + 0.5) - 0.5) / 3.6;   // (across: the distance to the nearest circumferential groove's centre)
  let tcg = 1.0 - (1.0 - smoothstep(0.022, 0.034, tgv)) * step(0.1, tq.y) * step(tq.y, 0.9);
  let tsh = 1.0 - step(0.22, tq.y) * step(tq.y, 0.78);   // (the shoulders)
  let tlat = smoothstep(0.06, 0.1, abs(fract(tq.x + tq.y * 0.35) - 0.5));
  let tsip = mix(1.0, smoothstep(0.015, 0.04, abs(fract(tq.x * 2.0 + tq.y * 1.4) - 0.5)), 0.6);
  let tvis = 1.0 - smoothstep(0.25, 0.7, max(tfw.x, tfw.y * 0.4));
  let tcrown = step(-0.02, tq.y) * step(tq.y, 1.02);
  let th = mix(0.86, tcg * mix(tsip, 1.0 - (1.0 - tlat) * 0.9, tsh), tvis) * tcrown;
  let tdh = vec2f(dpdx(th), dpdy(th)); let tsx = dpdx(wp); let tsy = dpdy(wp);
  let mrT = textureSample(matExtra, matSamp, uv);
  // the masks from a blurred look (two mips down): the generated textures are blotchy at full resolution
  let tb = textureSampleBias(matMap, matSamp, uv, 3.0).rgb; let mrB = textureSampleBias(matExtra, matSamp, uv, 2.0);
  let tbb = textureSampleBias(matMap, matSamp, uv, 5.5).rgb;   // very blurred: the panel's average (no baked blotches)
  let hasMR = textureDimensions(matExtra).x > 4u;
  let c = t.rgb;
  var paint = col.rgb; var brake = 0.0;
  if (paint.r > 3.0) { paint.r = paint.r - 4.0; brake = 1.0; }
  var drive = 0.0; if (paint.g > 3.0) { paint.g = paint.g - 4.0; drive = 1.0; }
  // (police) the light bar: b + 8 the blue lens lit, b + 4 the red (car/traffic.js draw: the strobe's phase)
  var siren = 0.0; if (paint.b > 7.0) { paint.b = paint.b - 8.0; siren = 2.0; } else if (paint.b > 3.0) { paint.b = paint.b - 4.0; siren = 1.0; }
  // (police) zone 7.5 (vertex alpha, cars.js piuBody: the doors): the paint white - the glass, trim and handles kept
  if (col.a > 7.0) { paint = vec3f(0.78, 0.78, 0.76); }
  let lum = dot(c, vec3f(0.2126, 0.7152, 0.0722));
  let mx = max(tb.r, max(tb.g, tb.b)); let mn = min(tb.r, min(tb.g, tb.b));
  let lumB = dot(tb, vec3f(0.2126, 0.7152, 0.0722)); let sat = (mx - mn) / max(mx, 1e-3);
  let metalT = select(0.0, mrT.b, hasMR); let roughT = select(0.7, mrT.g, hasMR); let metalB = select(0.0, mrB.b, hasMR);
  // the white paint: light (sRGB > ~0.5), neutral, not the alloy rims (metallic)
  var pm = smoothstep(0.12, 0.26, lumB) * (1.0 - smoothstep(0.22, 0.4, sat)) * (1.0 - smoothstep(0.45, 0.7, metalB));
  // glass: dark, a cool tint (blue >= red); tyres and rubber trim are neutral black
  var gm = smoothstep(0.004, 0.02, tb.b - tb.r) * (1.0 - smoothstep(0.2, 0.35, lumB)) * (1.0 - pm);
  // the texture's baked shading on the paint, mostly flattened (the renderer lights the body; the generated textures'
  // baked light is blotchy): a little of the fine detail (panel gaps, badges) over the panel's blurred average
  let lumBB = dot(tbb, vec3f(0.2126, 0.7152, 0.0722));
  let shade = clamp(mix(0.95, lumBB / 0.62, 0.25) * mix(1.0, lum / max(lumB, 0.05), 0.5), 0.0, 1.15);
  var outc = mix(c, paint * shade, pm);
  var rough = clamp(roughT, 0.4, 0.95);
  rough = mix(rough, 0.3, pm); rough = mix(rough, 0.07, gm);
  var metal = metalT * (1.0 - pm) * (1.0 - gm) * 0.85;
  // (round 20) the generated cars (bc.r 0.5): their surfaces from a mask (tools/cars/masks.mjs, the metallic-roughness
  // slot: r paint, g glass, b dark rubber and plastic, a metal; none: the texture as it is - lamps, badges, plates), each
  // a material of its own, the texture kept only where it carries the detail: the generated textures' blotches and baked
  // light no longer reach the paint, the glass, the tyres or the rims
  let masked = bc.r < 0.75;
  var lampW = 1.0 - pm;   // (glare63: the headlamp's glow only on the lamp's own texels - not the paint round it)
  if (masked) {
    let mk = textureSample(matExtra, matSamp, uv);
    pm = mk.r; gm = mk.g; let dkm = mk.b; var mtm = clamp((mk.a - 0.031) * 1.033, 0.0, 1.0);  let tx = clamp(1.0 - pm - gm - dkm - mtm, 0.0, 1.0);   // (a: 8 / 255 + the metal's weight)
    // (tyres49) the masks' metal is chrome trim - thin strips round the glass and the grille - or (the far LOD) a rim; where
    // it sits inside the paint (the generator's metallic map: speckles over the panels, the suv's whole roof) it is paint:
    // as polished metal at roughness 0.32 it drew the dark cars grey, a burnt sun blob on the tailgates and white sparkles
    // along the sides. Kept on the wheels (vertex alpha 1.5, cars.js lampZone) and where the paint round it is thin
    let mkB = textureSampleBias(matExtra, matSamp, uv, 5.0); let mtB = clamp((mkB.a - 0.031) * 1.033, 0.0, 1.0);
    let onWheel = step(1.25, col.a) * step(col.a, 1.75);
    let keepM = max(onWheel, (1.0 - smoothstep(0.25, 0.45, mkB.r)) * (1.0 - smoothstep(0.6, 0.85, mtB)));
    pm = pm + mtm * (1.0 - keepM); mtm = mtm * keepM;
    let tone2 = smoothstep(0.8, 0.9, t.a);   // (the albedo's alpha: Yellow Cab's black lower body)
    let pcol = mix(paint, vec3f(0.012, 0.012, 0.013), tone2);
    // paint (round 21, as the player's car's two layers, car/paint.js: base 0.42, flake metal 0.12-0.4): the instance's
    // colour, flat (a hint of the panel lines), a solid base at roughness 0.45; only the light and mid greys and silvers
    // metallic, a little (0.15 at roughness 0.36: round 20's 0.5 drew grey and blue cars as polished foil)
    let pl = dot(pcol, vec3f(0.2126, 0.7152, 0.0722)); let px = max(pcol.r, max(pcol.g, pcol.b));
    let psat = (px - min(pcol.r, min(pcol.g, pcol.b))) / max(px, 1e-3);
    let flake = smoothstep(0.06, 0.15, pl) * (1.0 - smoothstep(0.65, 0.8, pl)) * (1.0 - smoothstep(0.2, 0.4, psat)) * (1.0 - tone2);
    let pk = max(c.r, max(c.g, c.b)); let pkB = max(tb.r, max(tb.g, tb.b));
    let lines = clamp(mix(1.0, pk / max(pkB, 0.05), 0.18), 0.82, 1.03);
    // glass: dark, tinted, the interior barely through it; tyres and black plastic: dark, matte, their texture's pattern
    // as a little relief; rims and chrome: bright metal shaded by the texture (the spokes)
    let glass = c * 0.09 + vec3f(0.004, 0.005, 0.006);   // (round 21: the interior the texture painted shows a little - headrests, the dash - under the Fresnel mirror)
    // (tyres49: black plastic ~0.03, satin 0.6 - the near LOD's tyres are the wheel kit's now; the far LOD's keep this)
    let dark = vec3f(min(lum, 0.06) * 0.25 + 0.024);
    let rim = vec3f(0.58, 0.59, 0.6) * (0.55 + 0.45 * clamp(lum / 0.45, 0.0, 1.0));
    outc = pm * pcol * lines + gm * glass + dkm * dark + mtm * rim + tx * c;
    rough = pm * mix(0.45, 0.36, flake) + gm * 0.05 + dkm * 0.62 + mtm * 0.25 + tx * 0.55;
    metal = pm * flake * 0.15 + mtm * 0.85;
    lampW = clamp(tx + 0.3 * mtm, 0.0, 1.0);   // (the chrome a little: a reflector in the lamp, not the grille's bars)
    // the clear coat: a dielectric (Fresnel from 4 % face-on, the renderer's coat lobe), 0.85 at roughness 0.09 over the
    // smoothed panels (tools/cars/smooth_normals.mjs 0.5)
    gHC = vec2f(pm * 0.85, 0.045);
    gHF0 = 1.0 - 0.85 * clamp(pm, 0.0, 1.0) * (1.0 - flake) - 0.5 * tx;   // (the solid paints' base: a diffuser under the coat; the texture's rest - badges, lamps' bezels - a softer sheen: its glint was a burnt patch)
    // (round 21) the screen-space AO mostly off the paint and the glass: on these meshes it was blotches (dark smears over
    // the van's side, the sedans' hoods), the coat's specular occlusion showing each; the tyres and the trim keep it
    gHSS = 1.0 - 0.85 * clamp(pm + gm, 0.0, 1.0);
  }
  // (night49) the traffic's Waymo (bc.r 0.9: cars.js setCarNight): its atlas and ORM map as the player's I-PACE reads them
  // (car/waymoModel.js) - the guess above took its 0.66 white for paint and repainted it the instance's 1.0 white: an
  // albedo of ~1 (a light bulb under the headlamps and the lamps at night, chalky by day), no clear coat. Now: the
  // atlas' white, eased down at night as the player's (white paint clipped under the pools), the coat by the ORM's r
  // (paint, glass and the gloss-black trim), its roughness by g
  if (bc.r > 0.8 && bc.r < 0.95) {
    let ptW = smoothstep(0.8, 0.9, mrT.r) * smoothstep(0.15, 0.2, mrT.g) * (1.0 - smoothstep(0.4, 0.5, mrT.g));
    let glW = smoothstep(0.45, 0.52, mrT.r) * (1.0 - smoothstep(0.14, 0.18, mrT.g)) * (1.0 - smoothstep(0.03, 0.06, lum));
    pm = ptW; gm = glW;
    outc = c * mix(1.0, 0.85, ptW * (1.0 - bc.b));
    rough = mix(clamp(mrT.g, 0.05, 1.0), 0.34, ptW); metal = mrT.b * (1.0 - ptW) * (1.0 - glW);
    gHC = vec2f(mrT.r * max(ptW, step(0.45, mrT.r) * (1.0 - smoothstep(0.3, 0.5, mrT.g))), mix(0.05, 0.035, ptW));
    gHSS = 1.0 - 0.85 * clamp(ptW + glW, 0.0, 1.0);
  }
  // the liveries' zones (vertex colour alpha, cars.js: not multiplied by the instance colour, as rgb is): 3.5 gloss black
  // (the Waymo's lidar and pods), 2.5 white paint (the Muni worm, the domes). (Round 15: in b they read the paint's blue -
  // grey, pale blue and beige cars drew plain white, the dark ones gloss black)
  let za = col.a;
  let zb = select(1.0, 0.1, za > 2.0 && (za < 7.0 || za > 8.0));   // (zb < 0.4: a flat finish - no metal, no lamp glow)
  var lens = vec3f(0.0);
  // (police, cars.js piuBody / policeKit) 10.5 the hubcaps' chrome, 9.5 the headlamps' lenses (lit as the lamp zone), 8.5
  // the blacked-out front (the grille a black mesh: a trace of the texture's pattern), 7.5 the white doors (the paint, above)
  var zmetal = 0.0; var wR = 0.0;
  // (tyres49, city/tyres.js) the wheel kit: 11.5 the tyre (rubber: albedo ~0.03-0.04, the sidewall's satin even, the
  // tread's face a little greyer and rougher, its grooves darker), 12.5 / 13.5 / 14.5 the rim (silver alloy, gunmetal,
  // black steel - painted, under a clear coat), 15.5 the cast-iron brake disc, 16.5 the caliper, 17.5 the arch's dark
  // backing plate, 18.5 the alloys' centre cap, 19.5 the barrel's bare cast inside; their own finish, none of the atlas' (pm / gm off: no paint reflection)
  if (za > 11.0) {
    pm = 0.0; gm = 0.0; gHSS = 1.0; gHC = vec2f(0.0);
    // (the wheels mirror the street round them, as the glass: a vertical tyre or rim took the sky's horizon - blue rubber)
    wR = select(select(0.25, 0.5, za > 13.5), mix(0.3, 0.85, bc.b * bc.b), za < 12.0);   // (the tyre: less at night - the canyon's lights sharp in the rubber)
    if (za > 19.0) { outc = vec3f(0.2, 0.2, 0.205); rough = 0.55; zmetal = 1.0; }
    else if (za > 18.0) { outc = vec3f(0.03, 0.03, 0.032); rough = 0.3; gHC = vec2f(0.5, 0.06); }
    else if (za > 17.0) { outc = vec3f(0.012, 0.012, 0.013); rough = 0.9; }
    else if (za > 16.0) { outc = vec3f(0.15, 0.145, 0.14); rough = 0.6; }   // (bare cast iron, dusty)
    else if (za > 15.0) { outc = vec3f(0.26, 0.25, 0.24); rough = 0.5; zmetal = 1.0; }
    else if (za > 14.0) { outc = vec3f(0.02, 0.02, 0.022); rough = 0.38; gHC = vec2f(0.55, 0.1); }
    else if (za > 13.0) { outc = vec3f(0.15, 0.155, 0.16); rough = 0.32; zmetal = 1.0; gHC = vec2f(0.7, 0.05); }
    else if (za > 12.0) { outc = vec3f(0.56, 0.57, 0.58); rough = 0.3; zmetal = 1.0; gHC = vec2f(0.7, 0.05); }
    else {
      let face = tcrown * th; let groove = tcrown * (1.0 - th);
      outc = vec3f(0.034, 0.033, 0.032) * (1.0 - tcrown) + vec3f(0.044, 0.042, 0.04) * face + vec3f(0.018, 0.018, 0.019) * groove;
      rough = 0.74 * (1.0 - tcrown) + 0.86 * face + 0.93 * groove;
      // the bump (Mikkelsen's surface gradient: the height in metres, a groove ~7 mm deep)
      let n0 = gNw; let r1 = cross(tsy, n0); let r2 = cross(n0, tsx); let det = dot(tsx, r1);
      let grad = sign(det) * (tdh.x * r1 + tdh.y * r2) * 0.007;
      gHN = vec4f(normalize(abs(det) * n0 - grad) - n0, select(0.0, 1.0, abs(det) > 1e-12));
    }
  }
  else if (za > 10.0) { outc = vec3f(0.62, 0.63, 0.66); rough = 0.18; gHC = vec2f(0.0); zmetal = 1.0; }
  else if (za > 9.0) { outc = vec3f(0.1, 0.105, 0.115) + c * 0.12; rough = 0.04; gHC = vec2f(0.0); zmetal = 0.9; lens = vec3f(0.92, 0.95, 1.0) * drive * (1.0 - bc.b) * 6.0; }
  else if (za > 8.0) { outc = vec3f(0.008, 0.008, 0.009) + c * 0.035; rough = 0.3; gHC = vec2f(0.0); }
  else if (za > 7.0) { } else if (za > 6.0) { outc = vec3f(0.62, 0.42, 0.1); rough = 0.35; gHC = vec2f(0.0); }   // (police: the gold of the letters' outline)
  else if (za > 5.0) { outc = vec3f(0.03, 0.06, 0.32); rough = 0.1; gHC = vec2f(0.0); lens = vec3f(0.04, 0.16, 1.0) * 7.0 * step(1.5, siren); }
  else if (za > 4.0) { outc = vec3f(0.32, 0.03, 0.03); rough = 0.1; gHC = vec2f(0.0); lens = vec3f(1.0, 0.03, 0.02) * 7.0 * step(0.5, siren) * step(siren, 1.5); }
  else if (za > 3.0) { outc = vec3f(0.018, 0.02, 0.024); rough = 0.12; gHC = vec2f(0.0); }
  else if (za > 2.0) { outc = vec3f(0.8, 0.8, 0.78); rough = 0.32; gHC = vec2f(0.0); }
  metal = max(metal * step(0.4, zb), zmetal);
  gHK = vec4f(rough, metal, 0.0, 1.0);
  // (night48) the glass mirrors the street canyon round the car (car/cityrefl.js: the facades, the shops, the lit rooms,
  // the lamps), by day and night - not the sky map's horizon (a navy slab by day, black at night); at night the paint's
  // coat too (the street's lights sliding over the panels). The screen-space reflection still wins where it hits
  let rv = reflect(-normalize(F.camPos.xyz - wp), gNw); let crn = crNight();
  let cty0 = crCity(wp, rv, crn);
  let gmR = clamp(gm, 0.0, 1.0) * step(0.4, zb); let pmR = clamp(pm, 0.0, 1.0) * crn * 0.35;
  // (forza62) the paint's coat mirrors the canyon soft - its mean tone under a soft roofline, the lit rooms as a glow: the
  // lots' and windows' hard edges over the generated bodies' lumpy panels were big flat beige and grey blocks on the
  // roofs, hoods and doors at dusk and night ('camouflage' on the traffic, worst up close); the glass keeps some of the
  // detail (the lots' blocks there too, a step softer) and the lamps' and rooms' glints
  let sA = 1.0 - smoothstep(0.05, 0.5, rv.y);
  let sAlb = mix(vec3f(0.5, 0.47, 0.43) * mix(1.0, 0.3, crn), vec3f(0.055, 0.055, 0.058), smoothstep(0.0, -0.3, rv.y));
  let pw = clamp(pm, 0.0, 1.0) * (1.0 - clamp(gm, 0.0, 1.0));
  let cty = mix(cty0, vec4f(sAlb, sA), max(pw, 0.6 * clamp(gm, 0.0, 1.0)));
  crE = mix(crE, vec3f(1.0, 0.8, 0.6) * 0.045 * crn * sA, pw);
  gHR = vec4f(cty.rgb * cty.a * mix(0.25, 1.0, max(gmR, wR)), max(max(0.85 * gmR, pmR), wR) * cty.a); gHRe = crE; gHCR = pmR * cty.a;
  let ndv = abs(dot(gNw, normalize(F.camPos.xyz - wp)));
  let glint = crE * cty.a * gmR * (0.05 + 0.3 * pow(1.0 - ndv, 4.0));   // (the lights in the glass a little over its 4 % Fresnel)
  // lamps: the strongly red texels (tail / brake lights) glow under the brakes and at night
  // (not the yellows and oranges: Yellow Cab's body glowed orange under its brakes and at night)
  let red = smoothstep(0.12, 0.3, c.r - max(c.g, c.b)) * smoothstep(0.45, 0.7, sat) * step(0.4, zb) * (1.0 - smoothstep(0.38, 0.55, c.g / max(c.r, 1e-3)));
  let night = 1.0 - bc.b;
  gHE = select(vec3f(0.0), vec3f(1.0, 0.08, 0.04) * red * (brake * 5.0 + night * 2.5), bc.g > 0.99) + lens + glint;
  // headlamps (driven cars at night): the lamp zone's light texels (col.a 0.25 at the front corners, cars.js), a cool white
  let hz = (1.0 - smoothstep(0.26, 0.3, col.a)) * smoothstep(0.17, 0.22, col.a);   // (round 14: sharp - the zone bled along the big triangles, half a car glowed)
  // (glare63, 'burning of lights still too much': the zone - the front's corners, ~0.6 x 0.6 m - glowed 6x over every light
  // texel in it, the light paint too: a white car's whole nose a white blob and bloom at night) the lens alone (the lamp's
  // texels: the masks' texture and chrome, not the paint), dim, its brightest texels (the reflector, the bulb) a hotter
  // core, and the lamp's lens a forward-throwing optic: full face-on, a third from the side. Farther off (12-30 m) the
  // whole lens lit evenly and brighter (to 2.5x by 50 m): a lamp a few pixels across a bright point down the street, as
  // the eye sees it, not lost in the pixel's average
  let ld = length(F.camPos.xyz - wp);
  let lcore = mix(smoothstep(0.3, 0.55, lum) * 0.7 + smoothstep(0.55, 0.85, lum) * 3.0, smoothstep(0.1, 0.35, lum) * 2.4, smoothstep(12.0, 30.0, ld)) * clamp(ld / 20.0, 1.0, 2.5);
  let lface = mix(0.3, 1.0, smoothstep(0.25, 0.85, ndv));
  gHE += vec3f(0.92, 0.95, 1.0) * hz * drive * night * lcore * lampW * lface * (1.0 - gm);
  return vec4f(outc, 1.0);
}
`;
as();
