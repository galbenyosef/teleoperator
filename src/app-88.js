// app 88 — math
// Lines 74094-74397 of readable/app.pretty.js (statement-aligned).
function sw(o) {
  let t = 1e9,
    e = 1e9,
    s = -1e9,
    n = -1e9;
  for (let [i, a] of o)
    ((t = Math.min(t, i)),
      (s = Math.max(s, i)),
      (e = Math.min(e, a)),
      (n = Math.max(n, a)));
  return [t, e, s, n];
}
es();
await oc();
var oq = {
    shed_side: [24, 11.2],
    gable2: [1, 1],
    gable3: [1, 1],
    gable1: [1, 1],
    wh_side: [18.9, 12.6],
    wh_end: [1, 1],
    tile: [4.2, 4.2],
    asphalt: [7, 7],
    house: [12, 1],
    hall: [14, 1],
    mission: [12, 1],
    deck: [12, 12],
  },
  aq = Object.fromEntries(Object.keys(oq).map((o, t) => [o, t])),
  rq = `
fn fH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn fN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(fH(i), fH(i + vec2f(1.0, 0.0)), u.x), mix(fH(i + vec2f(0.0, 1.0)), fH(i + vec2f(1.0, 1.0)), u.x), u.y); }
const FCELL = array<vec2f, 12>(${Object.values(oq)
    .map(([o, t]) => `vec2f(${o.toFixed(2)}, ${t.toFixed(2)})`)
    .join(", ")});
fn mbAlbedo(uv: vec2f, wp: vec3f, col0: vec4f, bc: vec4f) -> vec4f {
  let flood = step(1.5, col0.r); let col = vec4f(col0.r - 2.0 * flood, col0.gba);
  let k = u32(clamp(floor(col.a * 16.0), 0.0, 11.0));
  let cs = FCELL[k];
  let q = uv / cs;
  let whole = cs.x < 1.5 && cs.y < 1.5;
  var fx = clamp(fract(q.x), 0.002, 0.998); var fy = clamp(fract(q.y), 0.002, 0.998);
  if (whole) { fx = clamp(q.x, 0.002, 0.998); fy = clamp(q.y, 0.002, 0.998); }
  if (cs.y < 1.5 && !whole) { fy = clamp(q.y, 0.002, 0.998); }   // (the houses: the cell spans the wall's height, uv.y 0..1)
  let f2 = vec2f(0.03125, 0.03125) + vec2f(fx, 1.0 - fy) * 0.9375;   // (the cells' 24 px borders: tools/gen_lm_fortmason.py)
  let a = (vec2f(f32(k % 4u), f32(k / 4u)) + f2) / vec2f(4.0, 3.0);
  let gdx = dpdx(q) / vec2f(4.0, -3.0); let gdy = dpdy(q) / vec2f(4.0, -3.0);
  let photo = textureDimensions(matMap).x > 8u;
  var c = col.rgb * 0.7;
  var win = 0.0;
  if (photo) {
    c = textureSampleGrad(matMap, matSamp, a, gdx, gdy).rgb * col.rgb;
    win = textureSampleGrad(matExtra, matSamp, a, gdx, gdy).r;
  }
  let night = bc.b; let wet = bc.g;
  var rough = mix(0.85, 0.1, win);
  let surf = k == 6u || k == 7u || k == 11u;   // (roof tile, asphalt, the piers' concrete deck)
  if (surf) {
    win = 0.0;
    c *= 0.88 + 0.24 * fN(uv * 0.13);
    rough = select(0.9, 0.62, k == 6u);
    rough = mix(rough, 0.18, wet * select(0.7, 0.3, k == 6u));
    c *= 1.0 - select(0.28, 0.12, k == 6u) * wet;
  } else {
    // a little grime low on the walls
    c *= 1.0 - 0.1 * (1.0 - smoothstep(0.0, 2.5, uv.y)) * fN(uv * 0.7);
    c *= 1.0 - 0.1 * wet;
  }
  let gable = k >= 1u && k <= 3u;
  let wid = floor(uv / vec2f(3.0, 3.6));
  let pr = select(0.5, 0.35, k == 0u);
  let on = select(step(1.0 - pr, fH(wid + vec2f(f32(k) * 7.0, floor(wp.x * 0.02)))), 1.0, gable);
  let wm = smoothstep(0.3, 0.8, win);
  gHE = vec3f(1.0, 0.72, 0.42) * wm * on * night * select(0.55 + 0.4 * fH(wid), 1.9, gable);
  gHE += c * flood * night * vec3f(1.0, 0.8, 0.58) * 0.5;
  c = mix(c, c * 0.55, wm * on * night);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
var zP = {
  gable2: [
    0.7085, 0.7085, 0.7085, 0.7095, 0.7095, 0.7571, 0.7571, 0.7571, 0.7702,
    0.7834, 0.7955, 0.8087, 0.8219, 0.834, 0.8462, 0.8583, 0.8694, 0.8806,
    0.8927, 0.9038, 0.915, 0.9646, 0.9646, 0.9646, 0.9646, 0.9646, 0.9636,
    0.9636, 0.913, 0.9008, 0.8897, 0.8775, 0.8664, 0.8543, 0.8421, 0.83, 0.8168,
    0.8047, 0.7915, 0.7783, 0.7652, 0.7561, 0.7561, 0.7571, 0.7095, 0.7095,
    0.7085, 0.7085, 0.7085,
  ],
  gable3: [
    0.7034, 0.7034, 0.7045, 0.7034, 0.6872, 0.6872, 0.6953, 0.7105, 0.7267,
    0.7429, 0.7591, 0.7743, 0.7905, 0.8057, 0.8219, 0.837, 0.8522, 0.8684,
    0.8836, 0.8988, 0.913, 0.9605, 0.9605, 0.9615, 0.9615, 0.9605, 0.9605,
    0.9605, 0.913, 0.8988, 0.8836, 0.8694, 0.8543, 0.8391, 0.8239, 0.8087,
    0.7925, 0.7763, 0.7601, 0.7439, 0.7277, 0.7115, 0.6943, 0.6852, 0.6852,
    0.7024, 0.7024, 0.7014, 0.7014,
  ],
  gable1: [
    0.7143, 0.7143, 0.7143, 0.7183, 0.7292, 0.7401, 0.751, 0.7619, 0.7728,
    0.7827, 0.7927, 0.8026, 0.8135, 0.8234, 0.8333, 0.8442, 0.8542, 0.8641,
    0.874, 0.8849, 0.9722, 0.9732, 0.9732, 0.9732, 0.9732, 0.9732, 0.9732,
    0.9732, 0.9673, 0.881, 0.871, 0.8611, 0.8512, 0.8413, 0.8313, 0.8224,
    0.8125, 0.8026, 0.7927, 0.7827, 0.7728, 0.7629, 0.753, 0.7421, 0.7321,
    0.7212, 0.7153, 0.7153, 0.7153,
  ],
};
await Pb();
var cc = (o, t = [1, 1, 1], e = !1) => [
    t[0] + (e ? 2 : 0),
    t[1],
    t[2],
    (aq[o] + 0.5) / 16,
  ],
  Bs = {
    conc: Rt([0.62, 0.6, 0.56], Tt.conc),
    concDk: Rt([0.36, 0.35, 0.33], Tt.conc),
    pile: Rt([0.32, 0.31, 0.29], Tt.pile),
    fender: Rt([0.09, 0.08, 0.07], Tt.pile),
    timber: Rt([0.24, 0.19, 0.14], Tt.planks),
    rail: Rt([0.62, 0.64, 0.64], Tt.metal),
    red: Rt([0.46, 0.13, 0.11], Tt.paint),
    redDk: Rt([0.36, 0.1, 0.09], Tt.paint),
    cream: Rt([0.86, 0.81, 0.69], Tt.paint),
    white: Rt([0.88, 0.88, 0.85], Tt.paint),
    wall: Rt([0.82, 0.8, 0.74], Tt.conc),
    roof: Rt([0.34, 0.17, 0.13], Tt.tar),
    roofG: Rt([0.5, 0.5, 0.48], Tt.tar),
    glass: Rt([0.06, 0.07, 0.08], Tt.glass),
    copper: Rt([0.3, 0.45, 0.38], Tt.copper),
    solar: Rt([0.05, 0.07, 0.13], Tt.metal),
    lamp: Rt([1, 0.86, 0.62], Tt.lamp),
    pole: Rt([0.3, 0.31, 0.32], Tt.metal),
    paintW: Rt([0.86, 0.86, 0.84], Tt.paint),
    green: Rt([0.24, 0.29, 0.24], Tt.paint),
    bronze: Rt([0.2, 0.15, 0.1], Tt.metal),
    pavers: Rt([0.55, 0.5, 0.45], Tt.pavers),
    plank: Rt([0.46, 0.42, 0.36], Tt.planks),
    hull: Rt([0.9, 0.9, 0.88], Tt.paint),
    mast: Rt([0.78, 0.79, 0.8], Tt.metal),
    black: Rt([0.05, 0.05, 0.05], Tt.paint),
    soffit: Rt([0.5, 0.42, 0.34], Tt.paint),
    dark: Rt([0.12, 0.11, 0.1], Tt.paint),
  },
  mpt = (o) => () => (o = (o * 16807) % 2147483647) / 2147483647;
function kl(o, t, e, s, n, i, a, r = 0, l = n, c = 1) {
  let h = e[0] - t[0],
    f = e[1] - t[1],
    u = Math.hypot(h, f),
    d = -f * s[0] + h * s[1] < 0,
    p = d ? e : t,
    m = d ? t : e,
    g = d ? -r - u : r;
  o.quad(
    [p[0], n, p[1]],
    [m[0], n, m[1]],
    [m[0], i, m[1]],
    [p[0], i, p[1]],
    [g, (n - l) * c],
    [g + u, (n - l) * c],
    [g + u, (i - l) * c],
    [g, (i - l) * c],
    a,
    [s[0], 0, s[1]],
  );
}
function lq(o, t, e, s, n, i, a, r = 0, l = 1, c = 1, h = 1) {
  let f = [t[0] + (e[0] - t[0]) * r, t[1] + (e[1] - t[1]) * r],
    u = [t[0] + (e[0] - t[0]) * l, t[1] + (e[1] - t[1]) * l],
    d = u[0] - f[0],
    g =
      -(u[1] - f[1]) * s[0] + d * s[1] < 0
        ? [u, f, l, r, h, c]
        : [f, u, r, l, c, h];
  o.quad(
    [g[0][0], n, g[0][1]],
    [g[1][0], n, g[1][1]],
    [g[1][0], n + i * g[5], g[1][1]],
    [g[0][0], n + i * g[4], g[0][1]],
    [g[2], 0],
    [g[3], 0],
    [g[3], g[5]],
    [g[2], g[4]],
    a,
    [s[0], 0, s[1]],
  );
}
function cq(o, t, e, s, n = 6, i = 0) {
  let a = t.map((c) => new Pe(c[0], c[1])),
    r = So.triangulateShape(a, []),
    l = (c, h, f, u) => {
      let d = Math.hypot(h[0] - c[0], h[1] - c[1]),
        p = Math.hypot(f[0] - h[0], f[1] - h[1]),
        m = Math.hypot(c[0] - f[0], c[1] - f[1]),
        g = Math.max(d, p, m);
      if (g > n && u < 12) {
        let x = (y, M) => [(y[0] + M[0]) / 2, (y[1] + M[1]) / 2];
        if (g === d) {
          let y = x(c, h);
          (l(c, y, f, u + 1), l(y, h, f, u + 1));
        } else if (g === p) {
          let y = x(h, f);
          (l(c, h, y, u + 1), l(c, y, f, u + 1));
        } else {
          let y = x(f, c);
          (l(c, h, y, u + 1), l(y, h, f, u + 1));
        }
        return;
      }
      let b = s((c[0] + h[0] + f[0]) / 3, (c[1] + h[1] + f[1]) / 3),
        v = [c, h, f].map((x) =>
          o.vert(x[0], e(x[0], x[1]) + i, x[1], 0, 1, 0, x[0], -x[1], b),
        );
      (h[1] - c[1]) * (f[0] - c[0]) - (h[0] - c[0]) * (f[1] - c[1]) >= 0
        ? o.tri(v[0], v[1], v[2])
        : o.tri(v[0], v[2], v[1]);
    };
  for (let [c, h, f] of r) l(t[c], t[h], t[f], 0);
}
function _P(o, t, e, s, n, i, a, r, l = null) {
  let c = Math.max(0, s.hl - s.hw),
    h = n + i,
    f = (p) => {
      let m = Math.max(
        -c,
        Math.min(c, (p[0] - s.c[0]) * s.d[0] + (p[1] - s.c[1]) * s.d[1]),
      );
      return [s.c[0] + s.d[0] * m, h, s.c[1] + s.d[1] * m];
    },
    u = t.length,
    d = t.map((p, m) => {
      let g = df(e, t[(m - 1 + u) % u], p),
        b = df(e, p, t[(m + 1) % u]),
        v = g[0] + b[0],
        x = g[1] + b[1],
        y = Math.hypot(v, x) || 1,
        M = Math.max(0.5, (g[0] * b[0] + g[1] * b[1] + 1) / 2) ** 0.5;
      return [v / y / M, x / y / M];
    });
  for (let p = 0; p < u; p++) {
    let m = t[p],
      g = t[(p + 1) % u];
    if (Math.hypot(g[0] - m[0], g[1] - m[1]) < 0.05) continue;
    let b = [m[0] + d[p][0] * r, n - r * 0.3, m[1] + d[p][1] * r],
      v = [
        g[0] + d[(p + 1) % u][0] * r,
        n - r * 0.3,
        g[1] + d[(p + 1) % u][1] * r,
      ],
      x = f(m),
      y = f(g),
      M = df(e, m, g),
      S = [
        (m[0] + g[0]) / 2 + M[0] * 30,
        n + 40,
        (m[1] + g[1]) / 2 + M[1] * 30,
      ];
    if (
      (Math.hypot(x[0] - y[0], x[2] - y[2]) < 0.05
        ? Y0(o, b, v, x, a, S)
        : Ms(o, b, v, y, x, a, S),
      l)
    ) {
      let w = [m[0], n - r * 0.3, m[1]],
        _ = [g[0], n - r * 0.3, g[1]];
      Ms(l, w, _, v, b, Bs.soffit, [
        (m[0] + g[0]) / 2 + M[0] * 3,
        n - 20,
        (m[1] + g[1]) / 2 + M[1] * 3,
      ]);
    }
  }
  return h;
}
var Ek = (o) => (t, e, s, n, i) => {
  if (o === "us") {
    for (let a = 0; a < 13; a++)
      ((t.fillStyle = a % 2 ? "#fff" : "#b22234"),
        t.fillRect(e, s + (a * i) / 13, n, i / 13 + 1));
    ((t.fillStyle = "#3c3b6e"),
      t.fillRect(e, s, n * 0.4, (i * 7) / 13),
      (t.fillStyle = "#fff"));
    for (let a = 0; a < 6; a++)
      for (let r = 0; r < 5; r++)
        t.fillRect(
          e + 6 + (a * n * 0.4) / 6.3,
          s + 5 + (r * i * 7) / 13 / 5.4,
          3,
          3,
        );
  } else
    o === "ca"
      ? ((t.fillStyle = "#fff"),
        t.fillRect(e, s, n, i),
        (t.fillStyle = "#b4232a"),
        t.fillRect(e, s + i * 0.82, n, i * 0.18),
        (t.fillStyle = "#5a3a22"),
        t.beginPath(),
        t.ellipse(e + n * 0.5, s + i * 0.5, n * 0.2, i * 0.14, 0, 0, 7),
        t.fill(),
        (t.fillStyle = "#b4232a"),
        t.fillRect(e + n * 0.08, s + i * 0.08, n * 0.12, i * 0.12))
      : ((t.fillStyle = o), t.fillRect(e, s, n, i));
};
