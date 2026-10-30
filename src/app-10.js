// app 10 — lat
// Lines 39245-39589 of readable/app.pretty.js (statement-aligned).
var $V,
  XV,
  KV,
  YV,
  Tt,
  Tb,
  Rb,
  Ab = Ki(() => {
    (($V = `
fn wH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn wN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(wH(i), wH(i + vec2f(1.0, 0.0)), u.x), mix(wH(i + vec2f(0.0, 1.0)), wH(i + vec2f(1.0, 1.0)), u.x), u.y); }
fn wR(x: f32, a: f32, b: f32, aa: f32) -> f32 { return clamp(min(x - a, b - x) / aa + 0.5, 0.0, 1.0); }
`),
      (XV = {
        ferry_arcade: [24, 18],
        ferry_shaft: [13, 16],
        bulk_a: [20, 18],
        bulk_b: [20, 18],
        bulk_wing: [14, 13],
        shed_side: [24, 12],
        ghirardelli: [22, 17],
        cellhouse: [24, 14],
        pier39: [18, 8.5],
        bldg64: [24, 14],
        wharf: [18, 9],
        ferry_rear: [24, 18],
      }),
      (KV = Object.fromEntries(Object.keys(XV).map((o, t) => [o, t]))),
      (YV =
        $V +
        `
const WCELL = array<vec2f, 12>(${Object.values(XV)
          .map(([o, t]) => `vec2f(${o.toFixed(1)}, ${t.toFixed(1)})`)
          .join(", ")});
// (night49) a floodlit landmark as the lamps at its foot light it: bright low, falling off up the wall in scallops between
// the fixtures (~9 m apart), the tower's own lights above the roofline - not one flat daylit slab (0.35-0.6 everywhere)
fn wfFlood(wp: vec3f) -> f32 {
  let sc = 0.6 + 0.4 * pow(abs(sin(3.14159 * (wp.x + wp.z) / 9.0)), 2.0);
  return (0.05 + 0.32 * exp(-max(wp.y - 3.0, 0.0) / 6.0)) * sc + 0.3 * smoothstep(24.0, 40.0, wp.y);
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col0: vec4f, bc: vec4f) -> vec4f {
  let flood = step(1.5, col0.r); let col = vec4f(col0.r - 2.0 * flood, col0.gba);
  let k = u32(clamp(floor(col.a * 16.0), 0.0, 11.0));
  let cs = WCELL[k];
  let q = uv / cs;                        // cells
  let f2 = vec2f(clamp(fract(q.x), 0.002, 0.998), 1.0 - clamp(fract(q.y), 0.002, 0.998));
  let cell = vec2f(f32(k % 4u), f32(k / 4u));
  let a = (cell + f2) / vec2f(4.0, 3.0);
  let gdx = dpdx(q) / vec2f(4.0, -3.0); let gdy = dpdy(q) / vec2f(4.0, -3.0);
  let photo = textureDimensions(matMap).x > 8u;
  var c = col.rgb * 0.6;
  var win = 0.0;
  if (photo) {
    c = textureSampleGrad(matMap, matSamp, a, gdx, gdy).rgb * col.rgb;
    win = textureSampleGrad(matExtra, matSamp, a, gdx, gdy).r;
  }
  let night = bc.b; let wet = bc.g;
  // lit windows: per window-sized patch of the wall (a hash of the cell and position), warm
  let wid = floor(uv / vec2f(3.0, 4.0));
  let on = step(0.45, wH(wid + vec2f(f32(k) * 7.0, 3.0)));
  gHE = vec3f(1.0, 0.74, 0.45) * win * on * night * (0.5 + 0.7 * wH(wid));
  gHE += c * flood * night * vec3f(1.0, 0.85, 0.65) * wfFlood(wp);
  c = mix(c, c * 0.6, win * night);
  c *= 1.0 - 0.12 * wet;
  gHK = vec4f(mix(0.85, 0.12, win), 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`),
      (Tt = {
        paint: 0,
        stone: 1,
        planks: 2,
        rock: 3,
        corr: 4,
        metal: 5,
        copper: 6,
        glass: 7,
        lamp: 8,
        pile: 9,
        lawn: 10,
        pavers: 11,
        tar: 12,
        water: 13,
        conc: 14,
        glow: 15,
      }),
      (Tb =
        $V +
        `
var<private> wGX: vec2f; var<private> wGY: vec2f;
fn wTile(uv: vec2f, t: u32, s: f32) -> vec3f {
  let q = uv * s; let f = fract(q) * 0.996 + 0.002;
  let a = (vec2f(f32(t % 2u), f32(t / 2u)) + f) * 0.5;
  return textureSampleGrad(matMap, matSamp, a, wGX * s * 0.5, wGY * s * 0.5).rgb;
}
// (night49) a floodlit landmark as the lamps at its foot light it: bright low, falling off up the wall in scallops between
// the fixtures (~9 m apart), the tower's own lights above the roofline - not one flat daylit slab (0.35-0.6 everywhere)
fn wfFlood(wp: vec3f) -> f32 {
  let sc = 0.6 + 0.4 * pow(abs(sin(3.14159 * (wp.x + wp.z) / 9.0)), 2.0);
  return (0.05 + 0.32 * exp(-max(wp.y - 3.0, 0.0) / 6.0)) * sc + 0.3 * smoothstep(24.0, 40.0, wp.y);
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col0: vec4f, bc: vec4f) -> vec4f {
  let flood = step(1.5, col0.r); let col = vec4f(col0.r - 2.0 * flood, col0.gba);
  let kind = floor(col.a * 16.0);
  let photo = textureDimensions(matMap).x > 8u;
  let night = bc.b; let wet = bc.g;
  let n = wN(uv * 0.35) * 0.5 + wN(uv * 2.3) * 0.5;
  var c = col.rgb * (0.9 + 0.2 * n);
  var rough = 0.8; var metal = 0.0;
  let fw = max(fwidth(uv), vec2f(0.002));
  wGX = dpdx(uv); wGY = dpdy(uv);
  if (kind < 0.5) {   // paint: smooth, a little dirt low down
    c *= 1.0 - 0.15 * (1.0 - smoothstep(0.0, 3.0, wp.y - 3.0)) * wN(uv * 0.8);
    rough = 0.65;
  } else if (kind < 1.5) {
    if (photo) { c = wTile(uv, 0u, 1.0 / 6.0) * col.rgb / 0.62; }
    rough = 0.85;
  } else if (kind < 2.5) {
    if (photo) { c = wTile(uv, 1u, 1.0 / 4.0) * col.rgb / 0.45; }
    rough = 0.8;
  } else if (kind < 3.5) {
    if (photo) { c = mix(wTile(uv, 2u, 1.0 / 14.0), wTile(uv + vec2f(3.7, 1.3), 2u, 1.0 / 5.0), 0.4) * col.rgb / 0.45; }
    rough = 0.92;
  } else if (kind < 4.5) {
    if (photo) { c = wTile(uv, 3u, 1.0 / 4.0) * col.rgb / 0.6; }
    rough = 0.55; metal = 0.3;
  } else if (kind < 5.5) {
    rough = 0.38; metal = 0.7;
  } else if (kind < 6.5) {   // copper roofs, streaked verdigris
    c = mix(col.rgb, col.rgb * vec3f(0.8, 1.1, 1.05), wN(vec2f(uv.x * 3.0, uv.y * 0.3)));
    rough = 0.6; metal = 0.2;
  } else if (kind < 7.5) {   // glass: dark, glossy; rooms lit at night
    let w = floor(uv / vec2f(2.5, 3.5));
    let on = step(0.35, wH(w + floor(wp.xz * 0.01)));
    gHE = vec3f(1.0, 0.8, 0.55) * on * night * (0.8 + 0.6 * wH(w + 1.7));
    c = col.rgb; rough = 0.06;
  } else if (kind < 8.5) {   // lamps
    gHE = col.rgb * (night * 7.0 + 0.1);
    c = col.rgb * 0.6; rough = 0.3;
  } else if (kind < 9.5) {   // piles: tar-dark timber / concrete, weed and a wet band at the tide line
    let tide = smoothstep(1.6, 0.6, wp.y);
    c = mix(c, vec3f(0.035, 0.05, 0.03), tide * 0.85);
    rough = mix(0.85, 0.3, tide);
  } else if (kind < 10.5) {   // lawn
    let g = wN(uv * 1.7) * 0.5 + wN(uv * 9.0) * 0.5;
    c = col.rgb * (0.7 + 0.6 * g) * (0.85 + 0.3 * wN(uv * 0.05));
    rough = 0.95;
  } else if (kind < 11.5) {   // brick pavers in a herringbone-ish running bond
    let bw = 0.2; let bh = 0.1; let row = floor(uv.y / bh);
    let bu = uv.x / bw + 0.5 * (row % 2.0);
    let j = max(1.0 - wR(fract(bu), 0.05, 0.95, fw.x / bw * 1.5), 1.0 - wR(fract(uv.y / bh), 0.1, 0.9, fw.y / bh * 1.5));
    c = mix(col.rgb * (0.8 + 0.4 * wH(vec2f(floor(bu), row))), vec3f(0.25, 0.24, 0.22), j * 0.7);
    rough = 0.8;
  } else if (kind < 12.5) {   // tar and gravel
    c = col.rgb * (0.7 + 0.5 * wN(uv * 4.0)); rough = 0.9;
  } else if (kind < 13.5) {   // water sheets (fountains)
    c = col.rgb * (0.8 + 0.4 * wN(vec2f(uv.x * 4.0, uv.y * 0.6 - wp.y)));
    rough = 0.08;
  } else if (kind < 14.5) {   // concrete
    c = col.rgb * (0.8 + 0.25 * wN(uv * 0.5) + 0.12 * wN(uv * 6.0));
    c *= 1.0 - 0.2 * smoothstep(0.55, 0.9, wN(vec2f(uv.x * 1.3, uv.y * 0.15)));
    rough = 0.9;
  } else {   // signs, clock faces: lit at night (a little by day)
    gHE = col.rgb * (night * 3.0 + 0.05);
    rough = 0.4;
  }
  gHE += c * flood * night * vec3f(1.0, 0.85, 0.65) * wfFlood(wp);
  c *= 1.0 - 0.15 * wet; rough = mix(rough, 0.25, wet * 0.5);
  // the splash zone: stone, rock, concrete and paint that reach the bay dark and wet up to ~1.3 m, weed below the tide line
  if (kind < 3.5 || (kind > 13.5 && kind < 14.5)) {
    let tl = 1.25 + 0.3 * wN(vec2f(uv.x * 0.9, 3.1));
    let sp = 1.0 - smoothstep(tl - 0.5, tl, wp.y);
    c = mix(c, c * vec3f(0.42, 0.45, 0.42), sp); c = mix(c, vec3f(0.03, 0.045, 0.028), (1.0 - smoothstep(0.0, 0.5, wp.y)) * 0.75);
    rough = mix(rough, 0.28, sp);
  }
  gHK = vec4f(rough, metal, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`),
      (Rb = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let t = textureSample(matMap, matSamp, uv);
  let pic = col.a > 0.5;
  let lit = fract(col.a * 2.0 + 0.01) > 0.5;   // 0.35 -> 0.71, 0.85 -> 0.71; 0.1 -> 0.21, 0.6 -> 0.21
  let c = t.rgb * col.rgb;   // (ink: the glyphs are white in the atlas; an outline stroked dark stays dark)
  if (lit) { gHE = c * (bc.b * select(4.0, 1.3, pic) + 0.04); }
  gHK = vec4f(0.45, 0.0, 0.0, 1.0);
  return vec4f(c, t.a);
}
`));
  });
var QV,
  ZV = Ki(() => {
    QV = {
      id: "us/san_francisco",
      aliases: ["sf"],
      name: "San Francisco",
      status: "live",
      region: "us",
      origin: { lon: -122.3935, lat: 37.79553, label: "Ferry Building" },
      projection: { kind: "equirect", kx: 87990, kz: 111050 },
      bounds: { lon: [-122.516, -122.384], lat: [37.75, 37.812] },
      notch: { lon: [null, -122.48], lat: [null, 37.779] },
      regions: {
        west: {
          dir: "west/",
          split: !0,
          bounds: { lon: [-122.516, -122.48], lat: [37.75, 37.812] },
        },
        marin: {
          dir: "marin/",
          skipName: "^Golden Gate Bridge$",
          bounds: { lon: [-122.51, -122.468], lat: [37.823, 37.879] },
        },
      },
      drivingSide: "right",
      units: { speed: "mph", distance: "mi" },
      timezone: "America/Los_Angeles",
      spawn: { x: -1371, z: 385, label: "California St, Nob Hill" },
      paths: {
        raw: "tools/real/",
        data: "assets/real/",
        district: "src/city/real/district.js",
        seeds: "tools/place/sf/round39_bake.json",
        assets: "assets/tex/",
        landmarks: "src/city/landmarks/",
        content: "cities/us/san_francisco/content/",
      },
      sources: {
        osm: "overpass",
        dem: "usgs-3dep",
        trees: "datasf-street-trees",
        coast: "osm",
      },
      credits: ["osm", "usgs-3dep", "datasf-street-trees"],
    };
  });
var eW,
  tW = Ki(() => {
    eW = {
      id: "jp/tokyo",
      aliases: ["tokyo"],
      name: "Tokyo",
      status: "coming-soon",
      region: "jp",
      origin: { lon: 139.7005, lat: 35.6595, label: "Shibuya Crossing" },
      projection: { kind: "equirect" },
      bounds: { lon: [139.692, 139.709], lat: [35.653, 35.666] },
      notch: null,
      regions: {},
      drivingSide: "left",
      units: { speed: "kmh", distance: "km" },
      timezone: "Asia/Tokyo",
      spawn: { lon: 139.7005, lat: 35.6595, heading: 0 },
      paths: {
        data: "cities/jp/tokyo/data/",
        assets: "cities/jp/tokyo/assets/",
        landmarks: "cities/jp/tokyo/landmarks/",
        content: "cities/jp/tokyo/content/",
      },
      sources: { osm: "overpass", dem: "gsi-dem5a", trees: null, coast: "osm" },
      credits: ["osm", "gsi-dem"],
    };
  });
var nW,
  sW = Ki(() => {
    nW = {
      id: "fr/paris",
      aliases: ["paris"],
      name: "Paris",
      status: "coming-soon",
      region: "fr",
      origin: { lon: 2.3522, lat: 48.8566, label: "H\xF4tel de Ville" },
      projection: { kind: "equirect" },
      bounds: { lon: [2.342, 2.3625], lat: [48.85, 48.8635] },
      notch: null,
      regions: {},
      drivingSide: "right",
      units: { speed: "kmh", distance: "km" },
      timezone: "Europe/Paris",
      spawn: { lon: 2.3522, lat: 48.8566, heading: 0 },
      paths: {
        data: "cities/fr/paris/data/",
        assets: "cities/fr/paris/assets/",
        landmarks: "cities/fr/paris/landmarks/",
        content: "cities/fr/paris/content/",
      },
      sources: {
        osm: "overpass",
        dem: "ign-rge-alti",
        trees: null,
        coast: "osm",
      },
      credits: ["osm", "ign-rge-alti"],
    };
  });
function F7(o = globalThis.location?.search || "", t = null) {
  let e = new URLSearchParams(o).get("city"),
    s = null;
  try {
    s = (t ?? globalThis.localStorage)?.getItem("sf-drive.city") ?? null;
  } catch {}
  for (let n of [e, s]) if (n && Fu(n)?.enabled) return Fu(n).id;
  return iW;
}
function oW(o, t = null) {
  try {
    Fu(o)?.enabled &&
      (t ?? globalThis.localStorage)?.setItem("sf-drive.city", Fu(o).id);
  } catch {}
}
function aW() {
  let o = globalThis.process;
  if (o?.versions?.node && !globalThis.document) {
    let t = o.argv.indexOf("--city"),
      e = t >= 0 ? o.argv[t + 1] : o.env.CITY;
    if (e) {
      let s = Fu(e);
      if (!s) throw new Error("no city " + e);
      return s;
    }
    return Fu(iW);
  }
  return Fu(F7());
}
var iW,
  I7,
  Fu,
  O7 = Ki(() => {
    ZV();
    tW();
    sW();
    ((iW = "us/san_francisco"),
      (I7 = [QV, eW, nW].map((o) => ({
        id: o.id,
        name: o.name,
        status: o.status,
        enabled: o.status === "live",
        label: o.status === "live" ? o.name : o.name + " (coming soon)",
        manifest: o,
      }))),
      (Fu = (o) =>
        I7.find((t) => t.id === o || t.manifest.aliases?.includes(o)) || null));
  });
