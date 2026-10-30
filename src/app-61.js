// app 61 — math
// Lines 65087-65350 of readable/app.pretty.js (statement-aligned).
function Im(o, t, e) {
  let s = 1e9;
  for (let n = 0, i = o.length - 2; n < o.length; i = n, n += 2) {
    let a = o[i],
      r = o[i + 1],
      l = o[n],
      c = o[n + 1],
      h = l - a,
      f = c - r,
      u = h * h + f * f || 1e-9,
      d = Math.max(0, Math.min(1, ((t - a) * h + (e - r) * f) / u));
    s = Math.min(s, Math.hypot(t - a - h * d, e - r - f * d));
  }
  return s;
}
function $5(o) {
  if (o.free) return o.free;
  let [t, e, s, n] = o.bb,
    i = Math.ceil(s - t) + 1,
    a = Math.ceil(n - e) + 1,
    r = new Float32Array(i * a),
    l = o.carousel;
  for (let f = 0; f < a; f++)
    for (let u = 0; u < i; u++) {
      let d = t + u + 0.5,
        p = e + f + 0.5;
      !rn(o.flat, d, p) ||
        o.inHouse(d, p) ||
        (l && Math.hypot(d - l.x, p - l.z) < l.r + 1.4) ||
        (r[f * i + u] = 1);
    }
  let c = new Float32Array(i * a);
  for (let f = 0; f < c.length; f++) c[f] = r[f] ? 1e6 : 0;
  let h = Math.SQRT2;
  for (let f = 0; f < a; f++)
    for (let u = 0; u < i; u++) {
      let d = f * i + u;
      if (!c[d]) continue;
      let p = c[d];
      (u > 0 && (p = Math.min(p, c[d - 1] + 1)),
        f > 0 &&
          ((p = Math.min(p, c[d - i] + 1)),
          u > 0 && (p = Math.min(p, c[d - i - 1] + h)),
          u < i - 1 && (p = Math.min(p, c[d - i + 1] + h))),
        (c[d] = p));
    }
  for (let f = a - 1; f >= 0; f--)
    for (let u = i - 1; u >= 0; u--) {
      let d = f * i + u;
      if (!c[d]) continue;
      let p = c[d];
      (u < i - 1 && (p = Math.min(p, c[d + 1] + 1)),
        f < a - 1 &&
          ((p = Math.min(p, c[d + i] + 1)),
          u < i - 1 && (p = Math.min(p, c[d + i + 1] + h)),
          u > 0 && (p = Math.min(p, c[d + i - 1] + h))),
        (c[d] = p));
    }
  return (
    (o.free = {
      x0: t,
      z0: e,
      nx: i,
      nz: a,
      D: c,
      at: (f, u) => {
        let d = Math.floor(f - t),
          p = Math.floor(u - e);
        return d < 0 || p < 0 || d >= i || p >= a ? 0 : c[p * i + d];
      },
    }),
    o.free
  );
}
es();
await oc();
var kW = {
    wood: [12.5, 8.2],
    grey: [12.5, 8.2],
    cream: [12.5, 8.2],
    tan: [12.5, 8.2],
    mural: [24, 8.2],
    crown: [5.08, 1.27],
    drum: [9.11, 2.28],
  },
  zW = Object.fromEntries(Object.keys(kW).map((o, t) => [o, t])),
  Edt = `
fn pH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
`,
  _W =
    Edt +
    `
const PCELL = array<vec2f, 7>(${Object.values(kW)
      .map(([o, t]) => `vec2f(${o.toFixed(2)}, ${t.toFixed(2)})`)
      .join(", ")});
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let k0 = u32(clamp(floor(col.a * 16.0), 0.0, 6.0));
  let cs = PCELL[k0];
  let q = uv / cs;
  // the crown's strips (one after another round the band) and the drum's (the cell's last quarter): rows of a quarter cell
  var k = k0; var rows = 1.0; var row = 0.0;
  if (k0 == 5u) { rows = 4.0; row = floor(q.x) - 3.0 * floor(q.x / 3.0); }
  if (k0 == 6u) { k = 5u; rows = 4.0; row = 3.0; }
  let f2 = vec2f(clamp(fract(q.x), 0.002, 0.998), (row + 1.0 - clamp(fract(q.y), 0.01, 0.99)) / rows);
  let a = (vec2f(f32(k % 3u), f32(k / 3u)) + f2) / vec2f(3.0, 2.0);
  let gdx = dpdx(q) / vec2f(3.0, -2.0 * rows); let gdy = dpdy(q) / vec2f(3.0, -2.0 * rows);
  let photo = textureDimensions(matMap).x > 8u;
  var c = col.rgb * 0.45;
  var win = 0.0;
  if (photo) {
    c = textureSampleGrad(matMap, matSamp, a, gdx, gdy).rgb * col.rgb;
    win = textureSampleGrad(matExtra, matSamp, a, gdx, gdy).r;
  }
  let night = bc.b; let wet = bc.g;
  // shop windows and rooms lit at night: the shops all (they trade into the evening), the rooms upstairs by a hash
  let wid = floor(uv / vec2f(3.0, 4.0));
  let shop = 1.0 - step(3.6, uv.y);
  let on = max(shop, step(0.4, pH(wid + vec2f(f32(k) * 7.0, 3.0)))) * (1.0 - step(7.0, uv.y));   // (nothing over the upper windows: the cornices' dark dentils read as glass)
  let wm = smoothstep(0.35, 0.85, win);
  gHE = vec3f(1.0, 0.76, 0.48) * wm * on * night * mix(0.45 + 0.35 * pH(wid), 0.22 + 0.12 * pH(wid), shop);   // (the shop windows big: dimmer a pixel)
  // the carousel's crown: its bulbs (the bright dots of the painting) glow at night
  if (k == 5u) { let l = max(c.r, max(c.g, c.b)); gHE += c * smoothstep(0.75, 0.95, l) * (night * 6.0 + 0.15); }
  c = mix(c, c * 0.6, wm * on * night);
  c *= 1.0 - 0.12 * wet;
  gHK = vec4f(mix(0.82, 0.12, win), 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
await Pb();
var cP = (o, t = [1, 1, 1]) => [t[0], t[1], t[2], (zW[o] + 0.5) / 16],
  lP = (o) => () => (o = (o * 16807) % 2147483647) / 2147483647,
  X5 = 8.2,
  ge = {
    plank: Rt([0.43, 0.4, 0.36], Tt.planks),
    plankDk: Rt([0.33, 0.27, 0.22], Tt.planks),
    shingle: Rt([0.23, 0.21, 0.2], Tt.planks),
    fascia: Rt([0.3, 0.24, 0.19], Tt.planks),
    cap: Rt([0.45, 0.4, 0.34], Tt.planks),
    railPost: Rt([0.36, 0.32, 0.27], Tt.planks),
    pipe: Rt([0.6, 0.61, 0.62], Tt.metal),
    pile: Rt([0.2, 0.17, 0.14], Tt.pile),
    rail: Rt([0.4, 0.31, 0.23], Tt.paint),
    post: Rt([0.3, 0.23, 0.17], Tt.paint),
    blue: Rt([0.04, 0.16, 0.42], Tt.paint),
    white: Rt([0.86, 0.85, 0.8], Tt.paint),
    trim: Rt([0.82, 0.8, 0.74], Tt.paint),
    globe: Rt([1, 0.93, 0.8], Tt.lamp),
    gold: Rt([0.78, 0.56, 0.2], Tt.metal),
    red: Rt([0.62, 0.07, 0.06], Tt.paint),
    cblue: Rt([0.12, 0.35, 0.72], Tt.paint),
    cream: Rt([0.92, 0.86, 0.74], Tt.paint),
    bulb: Rt([1, 0.86, 0.55], Tt.lamp),
    float: Rt([0.47, 0.42, 0.36], Tt.planks),
    floatSide: Rt([0.32, 0.31, 0.29], Tt.conc),
    hull: Rt([0.9, 0.9, 0.88], Tt.paint),
    mast: Rt([0.75, 0.76, 0.78], Tt.metal),
    dock: Rt([0.55, 0.5, 0.44], Tt.planks),
    dark: Rt([0.08, 0.08, 0.08], Tt.paint),
    barrel: Rt([0.4, 0.27, 0.15], Tt.planks),
    brass: Rt([0.85, 0.66, 0.3], Tt.metal),
    drape: Rt([0.8, 0.8, 0.79], Tt.paint),
    redDk: Rt([0.42, 0.04, 0.04], Tt.paint),
    valance: Rt([0.88, 0.72, 0.38], Tt.paint),
    syellow: Rt([0.95, 0.78, 0.16], Tt.paint),
    ypanel: Rt([0.98, 0.88, 0.45], Tt.paint),
    stageFloor: Rt([0.62, 0.46, 0.3], Tt.planks),
    curtain: Rt([0.55, 0.04, 0.05], Tt.paint),
    awnRed: Rt([0.72, 0.08, 0.07], Tt.paint),
    binGreen: Rt([0.05, 0.36, 0.2], Tt.paint),
    aquaRoof: Rt([0.12, 0.3, 0.62], Tt.metal),
    benchWood: Rt([0.45, 0.3, 0.17], Tt.planks),
    shield: Rt([0.82, 0.62, 0.22], Tt.metal),
    green: Rt([0.1, 0.45, 0.2], Tt.paint),
    leaf: Rt([0.16, 0.3, 0.1], Tt.lawn),
    soil: Rt([0.2, 0.14, 0.09], Tt.paint),
  },
  EW = [
    [0.05, 0.18, 0.5],
    [0.62, 0.08, 0.06],
    [0.06, 0.32, 0.16],
    [0.45, 0.12, 0.45],
    [0.75, 0.55, 0.08],
    [0.05, 0.4, 0.5],
  ],
  TW = [
    "CHOCOLATE",
    "SOURDOUGH",
    "GIFTS",
    "FUDGE",
    "MAGIC SHOP",
    "SEAFOOD",
    "CANDY",
    "T-SHIRTS",
    "CRAB HOUSE",
    "SWEATSHIRTS",
    "ICE CREAM",
    "SOUVENIRS",
    "CHOWDER",
    "HATS",
    "TOYS",
    "KITES",
    "CAFE",
    "COFFEE",
    "CRYSTALS",
    "LEFTIES",
    "MUSIC BOX",
    "PRETZELS",
    "GAMES",
    "SOCKS",
    "BAKERY",
    "GALLERY",
  ];
function K5(o, t, e, s, n, i, a, r = 0, l = n) {
  let c = e[0] - t[0],
    h = e[1] - t[1];
  if (-h * s[0] + c * s[1] >= 0)
    o.wall(t[0], t[1], e[0], e[1], n, n, i, i, a, r, l);
  else {
    let f = Math.hypot(c, h);
    o.wall(e[0], e[1], t[0], t[1], n, n, i, i, a, -r - f, l);
  }
}
function CW(o) {
  let t = null;
  for (let s = 0; s < o.length; s++) {
    let n = o[s],
      i = o[(s + 1) % o.length],
      a = Math.hypot(i[0] - n[0], i[1] - n[1]);
    if (a < 0.5) continue;
    let r = (i[0] - n[0]) / a,
      l = (i[1] - n[1]) / a,
      c = 1e9,
      h = -1e9,
      f = 1e9,
      u = -1e9;
    for (let p of o) {
      let m = p[0] * r + p[1] * l,
        g = -p[0] * l + p[1] * r;
      ((c = Math.min(c, m)),
        (h = Math.max(h, m)),
        (f = Math.min(f, g)),
        (u = Math.max(u, g)));
    }
    let d = (h - c) * (u - f);
    if (!t || d < t.A) {
      let p = (c + h) / 2,
        m = (f + u) / 2;
      t = {
        A: d,
        c: [p * r - m * l, p * l + m * r],
        u: [r, l],
        hu: (h - c) / 2,
        hv: (u - f) / 2,
      };
    }
  }
  let e = t.hu >= t.hv;
  return {
    c: t.c,
    d: e ? t.u : [-t.u[1], t.u[0]],
    hl: e ? t.hu : t.hv,
    hw: e ? t.hv : t.hu,
  };
}
