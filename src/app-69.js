// app 69 — top
// Lines 67791-68134 of readable/app.pretty.js (statement-aligned).
function Id(i, t = 0) {
  let e = new IR(
      xht[i.top],
      i.bottom === "shorts" ? 2 : i.bottom === "skirt" ? 3 : i.jeans ? 0 : 1,
      i.f,
    ),
    s = t ? 6 : 24,
    n = i.f,
    o = i.w,
    a = (n ? 0.168 : 0.155) * o,
    r = (n ? 0.125 : 0.145) * o,
    l = (n ? 0.158 : 0.175) * o,
    c = (n ? 0.17 : 0.19) * o,
    h = i.top === "long" || i.top === "coat",
    f = (x, v = 1) => {
      if (x > 1.49) return Xn.skin;
      let y = Math.cos(v);
      return h &&
        x < 1.47 &&
        (i.top === "coat"
          ? x > 1.36 && y > 0.99 - (0.14 * (x - 1.36)) / 0.11
          : x > 1.02 && y > 0.985 - 0.1 * Math.max(0, (x - 1.3) / 0.17))
        ? Xn.shirt
        : i.top === "short" && x > 1.43 && y > 0.8
          ? Xn.skin
          : x > 0.985 || i.top === "coat"
            ? i.top !== "short" && x < 1.03 && i.top !== "coat"
              ? Xn.trim
              : Xn.top
            : x > 0.945 && i.bottom === "pants"
              ? Xn.belt
              : Xn.bottom;
    },
    u = [
      [0.8, 0, 0, a * 0.72, 0.095 * o],
      [0.86, 0, 0, a * 0.96, 0.112 * o],
      [0.94, 0, -0.005, a, 0.112 * o],
      [1.02, 0, 0, r * 1.02, 0.1 * o],
      [1.08, 0, 0, r, 0.098 * o],
      [1.18, 0, 0.004, (r + l) / 2, 0.104 * o],
      [1.28, 0, 0.01, l, (n ? 0.122 : 0.112) * o],
      [1.36, 0, 0, c * 0.98, 0.108 * o],
      [1.41, 0, -0.004, c * 0.94, 0.101 * o],
      [1.44, 0, -0.007, c * 0.8, 0.092 * o],
      [1.465, 0, -0.01, c * 0.56, 0.08 * o],
      [1.49, 0, -0.012, 0.075, 0.066],
      [1.51, 0, -0.01, 0.058, 0.058],
      [1.58, 0, -0.005, 0.052, 0.054],
    ];
  if (
    (e.loft(u, s, 0, (x, v) => f(x, v), { capBottom: !0, capTop: !1 }),
    h &&
      !t &&
      e.loft(
        [
          [1.44, 0, -0.012, c * 0.62, 0.082 * o],
          [1.475, 0, -0.018, 0.078, 0.075],
          [1.52, 0, -0.024, 0.07, 0.066],
        ],
        12,
        0,
        (x, v) => (Math.cos(v) > 0.75 ? Xn.shirt : Xn.trim),
        { capBottom: !1, capTop: !1 },
      ),
    i.top === "coat" || i.bottom === "skirt")
  ) {
    let x = i.top === "coat" ? 0.56 : 0.52,
      v = i.top === "coat" ? Xn.top : Xn.bottom;
    e.loft(
      [
        [x, 0, 0, a * 1.34, 0.205 * o],
        [x + 0.14, 0, 0, a * 1.22, 0.17 * o],
        [0.86, 0, 0, a * 1.06, 0.13 * o],
        [0.99, 0, 0, a * 1, 0.115 * o],
      ],
      s,
      0,
      v,
      { capBottom: !1, capTop: !1 },
    );
  }
  let d = t ? [8, 5] : [14, 9],
    p = n ? 0.94 : 1,
    m = t
      ? [
          [1.565, 0, 0.005, 0.05, 0.052],
          [1.6, 0, 0.024, 0.06 * p, 0.074],
          [1.66, 0, 0.012, 0.074, 0.092],
          [1.72, 0, 0.002, 0.079, 0.1],
          [1.772, 0, -0.008, 0.06, 0.078],
          [1.794, 0, -0.01, 0.008, 0.01],
        ]
      : [
          [1.565, 0, 0.005, 0.05, 0.052],
          [1.585, 0, 0.022, 0.05 * p, 0.062],
          [1.605, 0, 0.026, 0.06 * p, 0.074],
          [1.63, 0, 0.018, 0.068 * p, 0.086],
          [1.66, 0, 0.012, 0.074, 0.092],
          [1.69, 0, 0.008, 0.078, 0.097],
          [1.72, 0, 0.002, 0.079, 0.1],
          [1.748, 0, -0.004, 0.074, 0.095],
          [1.772, 0, -0.008, 0.06, 0.078],
          [1.788, 0, -0.01, 0.036, 0.048],
          [1.794, 0, -0.01, 0.008, 0.01],
        ];
  if (
    (e.loft(
      m,
      t ? 10 : 20,
      0,
      (x, v) =>
        x > 1.572 && x < 1.75 && Math.cos(v) > 0.2 ? Xn.face : Xn.skin,
      { capBottom: !1, capTop: !0, faceW: 0.158 },
    ),
    !t)
  ) {
    e.ellipsoid(0, 1.652, 0.094, 0.011, 0.022, 0.016, 6, 4, 0, Xn.face);
    for (let x of [-1, 1])
      e.ellipsoid(
        x * 0.079,
        1.668,
        0.004,
        0.011,
        0.026,
        0.017,
        6,
        4,
        0,
        Xn.skin,
      );
  }
  let g = (x) => {
      let v = Math.cos(x),
        y = Math.max(0, -v),
        M = Math.max(0, v),
        S = i.hair === "long" ? 2.2 : i.hair === "bun" ? 1.75 : 1.85;
      return 1.47 - 0.4 * Math.pow(M, 1.5) + (S - 1.47) * Math.pow(y, 0.8);
    },
    b = i.hair === "cap" ? Xn.bag : Xn.hair;
  (e.ellipsoid(
    0,
    1.684,
    -0.004,
    0.09,
    0.121,
    0.105,
    t ? d[0] : 20,
    t ? 4 : 8,
    0,
    b,
    { latAt: g, jit: t || i.hair === "cap" ? 0 : 0.07 },
  ),
    i.hair === "long" &&
      !t &&
      e.loft(
        [
          [1.36, 0, -0.07, 0.085, 0.035],
          [1.52, 0, -0.07, 0.09, 0.045],
          [1.64, 0, -0.05, 0.09, 0.07],
        ],
        8,
        0,
        Xn.hair,
        { capBottom: !0, capTop: !1 },
      ),
    i.hair === "bun" &&
      e.ellipsoid(0, 1.73, -0.1, 0.045, 0.045, 0.045, 8, 5, 0, Xn.hair),
    i.hair === "cap" && e.box(0, 1.745, 0.1, 0.07, 0.008, 0.055, 0, Xn.bag),
    i.bag === "back" && e.box(0, 1.2, -0.17 * o, 0.14, 0.2, 0.07, 0, Xn.bag));
  for (let [x, v] of [
    [1, 1],
    [2, -1],
  ]) {
    let y = v * 0.088 * o * (n ? 1.05 : 1),
      M = (w) =>
        i.bottom === "shorts"
          ? w > 0.6
            ? Xn.bottom
            : Xn.skin
          : i.bottom === "skirt"
            ? Xn.legs
            : Xn.bottom,
      S = [
        [0.08, y, 0, 0.043, 0.047],
        [0.2, y, 0, 0.049, 0.053],
        [0.33, y, -0.006, 0.059, 0.063],
        [0.43, y, -0.006, 0.06, 0.062],
        [0.5, y, 0, 0.056, 0.058],
        [0.62, y, 0, 0.064, 0.066],
        [0.76, y, 0, 0.076, 0.08],
        [0.88, y * 0.95, 0, 0.084 * o, 0.088 * o],
        [0.97, y * 0.85, 0, 0.08 * o, 0.085 * o],
      ];
    if (i.bottom === "pants" || i.top === "coat")
      for (let w of S) ((w[3] *= 1.12), (w[4] *= 1.1));
    (e.loft(S, t ? 5 : 9, x, (w) => M(w), { capBottom: !1, capTop: !0 }),
      e.ellipsoid(
        y,
        0.045,
        0.04,
        0.047,
        0.047,
        0.125,
        t ? 6 : 10,
        t ? 4 : 6,
        x,
        (w, z) => (z < -0.026 ? Xn.sole : Xn.shoes),
      ));
  }
  for (let [x, v] of [
    [3, 1],
    [4, -1],
  ]) {
    let y = v * (c - 0.01),
      M = v * (c + 0.03),
      S = (_) => y + ((M - y) * (IG + 0.02 - _)) / (IG + 0.02 - 0.87),
      w = i.top === "short" ? 1.27 : 0.9,
      z = [
        [0.87, S(0.87), 0, 0.027, 0.03],
        [0.95, S(0.95), 0, 0.033, 0.036],
        [1.06, S(1.06), -0.005, 0.038, 0.041],
        [1.13, S(1.13), -0.008, 0.039, 0.042],
        [1.24, S(1.24), -0.006, 0.045, 0.048],
        [1.34, S(1.34), -0.005, 0.049, 0.052],
        [1.41, S(1.41), -0.01, 0.049, 0.052],
        [1.44, S(1.44), -0.012, 0.041, 0.046],
        [1.462, S(1.462), -0.014, 0.024, 0.028],
      ];
    if (i.top === "coat" || i.top === "long")
      for (let _ of z) _[0] > 0.9 && ((_[3] *= 1.12), (_[4] *= 1.12));
    (e.loft(
      z,
      t ? 5 : 8,
      x,
      (_) =>
        _ > w + 0.03 || (_ > w && i.top === "short")
          ? Xn.top
          : _ > w
            ? Xn.trim
            : Xn.skin,
      { capBottom: !1, capTop: !0 },
    ),
      e.ellipsoid(
        S(0.82),
        0.8,
        0.005,
        0.024,
        0.07,
        0.042,
        t ? 6 : 8,
        t ? 4 : 6,
        x,
        Xn.skin,
      ),
      i.bag === "hand" &&
        v < 0 &&
        e.box(S(0.72), 0.66, 0.01, 0.045, 0.12, 0.16, x, Xn.bag));
  }
  return e.geometry();
}
var vht = [
    [0.723, 0.434, 0.309],
    [0.381, 0.171, 0.093],
    [0.672, 0.328, 0.231],
    [0.723, 0.386, 0.25],
    [0.527, 0.238, 0.114],
    [0.701, 0.381, 0.246],
    [0.474, 0.202, 0.1],
    [0.708, 0.407, 0.27],
  ]
    .map((i) => `vec3f(${i.map((t) => (t * 0.62).toFixed(3)).join(", ")})`)
    .join(", "),
  Fd = `
fn pedPick3(i: f32, a: vec3f, b: vec3f, c: vec3f) -> vec3f { return select(select(c, b, i < 1.5), a, i < 0.5); }
// the atlas at cell origin o (px) + q (px), q's screen gradients gx, gy (px)
fn pedAt(o: vec2f, q: vec2f, gx: vec2f, gy: vec2f) -> vec3f { return textureSampleGrad(matMap, matSamp, (o + q) / 2048.0, gx / 2048.0, gy / 2048.0).rgb; }
fn pedTile(o: vec2f, sz: f32, q: vec2f, gx: vec2f, gy: vec2f) -> f32 { return pedAt(o, fract(q) * sz, gx * sz, gy * sz).r; }
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let s = col.rgb;
  let dux = dpdx(uv.x); let duy = dpdy(uv.x); let dyx = dpdx(uv.y) * 2.0; let dyy = dpdy(uv.y) * 2.0;
  let idf = floor(uv.x); let u = uv.x - idf; let kind = floor(idf / 128.0 + 0.001); let r1 = idf - kind * 128.0; let part = floor(r1 / 16.0 + 0.001);
  let zone = r1 - part * 16.0; let y = uv.y * 2.0;
  let h1 = fract(s.x * 7.13 + s.y * 3.7); let h2 = fract(s.y * 11.7 + s.z * 5.3); let h3 = fract(s.z * 13.1 + s.x * 2.9);
  var fset = array<f32, 8>(1.0, 2.0, 4.0, 7.0, 0.0, 3.0, 5.0, 6.0);   // the atlas' men's faces, then women's
  let female = ((zone < 0.5 || zone > 13.5) && kind > 0.5) || (zone > 5.5 && zone < 6.5);   // (skin and face carry the build's sex; legwear: a skirt's)
  let fi = fset[u32(min(floor(s.z * 4.0), 3.0) + select(0.0, 4.0, female))];
  var skins = array<vec3f, 8>(${vht});
  var hair = array<vec3f, 6>(vec3f(0.02, 0.015, 0.012), vec3f(0.06, 0.035, 0.02), vec3f(0.14, 0.08, 0.04), vec3f(0.3, 0.19, 0.08), vec3f(0.3, 0.29, 0.27), vec3f(0.03, 0.025, 0.02));
  var tops = array<vec3f, 16>(vec3f(0.02, 0.02, 0.025), vec3f(0.6, 0.6, 0.58), vec3f(0.03, 0.05, 0.12), vec3f(0.35, 0.03, 0.03), vec3f(0.12, 0.12, 0.13),
    vec3f(0.25, 0.2, 0.12), vec3f(0.05, 0.14, 0.08), vec3f(0.55, 0.35, 0.08), vec3f(0.08, 0.2, 0.4), vec3f(0.4, 0.4, 0.42), vec3f(0.5, 0.15, 0.2),
    vec3f(0.02, 0.02, 0.02), vec3f(0.7, 0.62, 0.45), vec3f(0.15, 0.25, 0.15), vec3f(0.6, 0.25, 0.05), vec3f(0.25, 0.1, 0.3));
  var bots = array<vec3f, 8>(vec3f(0.06, 0.1, 0.2), vec3f(0.02, 0.02, 0.025), vec3f(0.1, 0.15, 0.28), vec3f(0.3, 0.25, 0.16), vec3f(0.12, 0.12, 0.13),
    vec3f(0.04, 0.05, 0.1), vec3f(0.2, 0.18, 0.15), vec3f(0.45, 0.43, 0.4));
  var shoes = array<vec3f, 5>(vec3f(0.75, 0.75, 0.73), vec3f(0.02, 0.02, 0.02), vec3f(0.12, 0.06, 0.03), vec3f(0.3, 0.3, 0.32), vec3f(0.04, 0.04, 0.06));
  let skin = skins[u32(fi)]; let hc = hair[u32(h2 * 5.99)];
  var c = skin; var rough = 0.55;
  if (zone > 13.5) {   // the face: the cell's photograph across it, its rim into the skin's tone
    let o = vec2f((fi % 4.0) * 384.0, floor(fi / 4.0) * 512.0); let fy = (1.742 - y) / 0.165;
    let t = pedAt(o, vec2f(clamp(u, 0.0, 1.0) * 384.0, clamp(fy, 0.0, 1.0) * 512.0), vec2f(dux * 384.0, -dyx / 0.165 * 512.0), vec2f(duy * 384.0, -dyy / 0.165 * 512.0)) * 0.62;
    let e = smoothstep(0.0, 0.12, min(u, 1.0 - u)) * smoothstep(-0.02, 0.06, fy) * smoothstep(-0.02, 0.05, 1.0 - fy);
    c = mix(skin, t, e); rough = 0.5;
  }
  else if (zone < 0.5) { c = skin * (0.94 + 0.06 * sin(y * 40.0 + u * 20.0)); }
  else if (zone < 1.5 || (zone > 12.5 && zone < 13.5)) {   // the top (and its trim): the garment's cell on the torso, its fabric on the sleeves
    var L = 0.8;
    if (part < 0.5) { let v = (1.55 - y) / 1.05; L = pedAt(vec2f(kind * 512.0, 1024.0), vec2f(u, v) * 512.0, vec2f(dux, -dyx / 1.05) * 512.0, vec2f(duy, -dyy / 1.05) * 512.0).r; }
    else { let fo = select(select(vec2f(1536.0, 768.0), vec2f(1792.0, 768.0), kind > 0.5 && kind < 1.5), vec2f(1536.0, 512.0), kind < 0.5); L = pedTile(fo, 256.0, vec2f(u, y * 3.0), vec2f(dux, dyx * 3.0), vec2f(duy, dyy * 3.0)); }
    c = tops[u32(s.x * 15.99)] * L * 1.25 * select(1.0, 0.62, zone > 12.5); rough = 0.85;
    if (part < 0.5) { let side = pow(abs(sin(6.2832 * u)), 4.0); c *= 1.0 - 0.3 * side * smoothstep(1.02, 1.22, y) * (1.0 - smoothstep(1.36, 1.44, y)); }   // (the shade under the arms)
    else { let dE = abs(y - 1.13); c *= 1.0 - 0.22 * smoothstep(0.55, 1.0, sin(y * 90.0 + u * 3.0)) * (1.0 - smoothstep(0.0, 0.07, dE)); }   // (the sleeve's creases at the elbow)
  }
  else if (zone < 2.5) {   // the bottom: jeans, trousers, shorts, a skirt
    let v = (1.0 - y) / 0.95; let L = pedAt(vec2f(kind * 512.0, 1536.0), vec2f(u, v) * 512.0, vec2f(dux, -dyx / 0.95) * 512.0, vec2f(duy, -dyy / 0.95) * 512.0).r;
    c = bots[u32(s.y * 7.99)] * L * 1.25; rough = 0.9;
    if (part > 0.5) { c *= (1.0 - 0.2 * smoothstep(0.5, 1.0, sin(y * 70.0 + u * 4.0)) * (1.0 - smoothstep(0.0, 0.06, abs(y - 0.5)))) * (1.0 - 0.25 * (1.0 - smoothstep(0.1, 0.24, y)) * smoothstep(0.3, 1.0, sin(y * 110.0))); }   // (knee creases, the hem bunched on the shoe)
    else { c *= 1.0 - 0.3 * (1.0 - smoothstep(0.8, 0.9, y)) * pow(abs(cos(6.2832 * u)), 6.0); }   // (the crotch's shade)
  }
  else if (zone < 3.5) { c = shoes[u32(h1 * 4.99)]; rough = 0.5; }
  else if (zone < 4.5) {   // hair: strands along it, locks lighter and darker
    let L = pedTile(vec2f(1536.0, 0.0), 512.0, vec2f(u * 2.0, y * 5.0), vec2f(dux * 2.0, dyx * 5.0), vec2f(duy * 2.0, dyy * 5.0));
    c = hc * (0.5 + 0.9 * L); rough = 0.45;
  }
  else if (zone < 5.5) { c = pedPick3(floor(h3 * 2.99), vec3f(0.03, 0.03, 0.035), vec3f(0.2, 0.1, 0.04), tops[u32(h2 * 15.99)]); rough = 0.6; }
  else if (zone < 6.5) { c = pedPick3(floor(h1 * 2.99), vec3f(0.02, 0.02, 0.02), skin, vec3f(0.05, 0.05, 0.08)); rough = 0.6; }
  else if (zone < 7.5) { c = vec3f(0.015, 0.012, 0.01); rough = 0.3; }
  else if (zone < 8.5) {   // the shirt under a jacket or a coat: woven cotton, its placket and buttons, in the lapels' shade
    let sc = pedPick3(floor(h1 * 2.99), vec3f(0.58, 0.58, 0.56), vec3f(0.26, 0.34, 0.48), pedPick3(floor(h2 * 2.99), vec3f(0.09, 0.09, 0.1), vec3f(0.5, 0.45, 0.38), vec3f(0.42, 0.17, 0.11)));
    let L = pedTile(vec2f(1536.0, 512.0), 256.0, vec2f(u * 9.0, y * 4.0), vec2f(dux * 9.0, dyx * 4.0), vec2f(duy * 9.0, dyy * 4.0));
    let d = abs(u - 0.5); let hw = select(0.03, 0.045, kind > 1.5);   // (the opening's half width in u)
    let lap = mix(0.52, 1.0, smoothstep(0.1, 0.75, 1.0 - d / hw));
    let plk = 1.0 - 0.22 * (1.0 - smoothstep(0.0015, 0.004, d));
    let btn = 1.0 - 0.45 * (1.0 - smoothstep(0.0, 0.004, length(vec2f(d * 3.0, (fract(y / 0.085) - 0.5) * 0.085))));
    c = sc * (0.75 + 0.5 * L) * lap * plk * btn * (1.0 - 0.2 * smoothstep(1.3, 1.46, y)); rough = 0.85;
  }
  else if (zone < 9.5) { c = pedPick3(floor(h3 * 2.99), vec3f(0.02, 0.018, 0.016), vec3f(0.12, 0.06, 0.03), vec3f(0.06, 0.05, 0.045)); rough = 0.45; }   // a belt
  else if (zone < 10.5) { c = skin * vec3f(0.78, 0.55, 0.52); rough = 0.4; }
  else if (zone < 11.5) { c = pedPick3(floor(h2 * 2.99), vec3f(0.55, 0.53, 0.5), vec3f(0.02, 0.02, 0.02), vec3f(0.25, 0.16, 0.08)); rough = 0.7; }   // soles
  else { c = vec3f(0.62, 0.6, 0.57); rough = 0.25; }
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
as();
as();
