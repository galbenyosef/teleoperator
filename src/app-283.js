// app 283 — math
// Lines 139142-139485 of readable/app.pretty.js (statement-aligned).
function Cyt() {
  let o = [],
    t = [],
    e = [],
    s = [],
    n = [];
  for (let a = 0; a < 3; a++) {
    let r = (a * Math.PI) / 3,
      l = Math.cos(r) * 0.5,
      c = Math.sin(r) * 0.5,
      h = o.length / 3;
    (o.push(-l, 0, -c, l, 0, c, l, 1, c, -l, 1, -c),
      t.push(0, 1, 1, 1, 1, 0, 0, 0),
      e.push(
        0.62,
        0.62,
        0.62,
        0.62,
        0.62,
        0.62,
        1.05,
        1.05,
        1.05,
        1.05,
        1.05,
        1.05,
      ));
    for (let f = 0; f < 4; f++) s.push(0, 1, 0);
    n.push(h, h + 1, h + 2, h, h + 2, h + 3);
  }
  let i = new Le();
  return (
    i.setAttribute("position", new Re(o, 3)),
    i.setAttribute("uv", new Re(t, 2)),
    i.setAttribute("color", new Re(e, 3)),
    i.setAttribute("normal", new Re(s, 3)),
    i.setIndex(n),
    i
  );
}
var Lyt = Wp(
  mw +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let dist = length(F.camPos.xyz - wp);
  let t = textureSample(matMap, matSamp, uv);
  let dim = vec2f(textureDimensions(matMap));
  let du = dpdx(uv * dim); let dv = dpdy(uv * dim);
  let lod = 0.5 * log2(max(max(dot(du, du), dot(dv, dv)), 1e-8));
  var a = t.a * (1.0 + 0.2 * clamp(lod - 1.0, 0.0, 5.0));
  let ng = normalize(cross(dpdx(wp), dpdy(wp))); let ve = normalize(F.camPos.xyz - wp);
  a *= smoothstep(0.04, 0.25, abs(dot(ng, ve)));
  // the lawn's colour where the blade stands (the ground's: city/ground_wgsl.js, the photo's mean)
  let p = wp.xz;
  let n1 = sfLwN(p * 0.021 + 3.7); let n3 = sfLwN(p * 0.53 + 1.3);
  var g = vec3f(0.136, 0.1735, 0.0496) * mix(vec3f(0.86, 0.92, 0.82), vec3f(1.06, 1.04, 0.94), n1) * (0.9 + 0.2 * n3);
  let lum = dot(g, vec3f(0.3, 0.55, 0.15)); g = mix(vec3f(lum), g, 0.86) * vec3f(0.97, 1.01, 0.88);
  g = sfTurf(sfLawn(g, wp), p, dist, 0.0);
  // the blade: its own shade and a few straw ones (the texture over its mean green), the foot in the turf's shade (the
  // vertex colour)
  let tb = t.rgb;
  var c = g * col.rgb * (0.3 + 0.62 * tb / vec3f(0.3, 0.42, 0.12));
  { let cc = F.vpu * vec4f(wp, 1.0); let px = floor((cc.xy / cc.w * 0.5 + 0.5) / F.screen.xy);
    let nz = fract(52.9829189 * fract(dot(px + 7.31 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a = select(0.0, 1.0, smoothstep(0.3, 0.7, a) > nz * 0.9 + 0.05);
    let nf = fract(52.9829189 * fract(dot(px + 5.588238 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a *= step(smoothstep(${vQ[0].toFixed(1)}, ${vQ[1].toFixed(1)}, dist), nf); }
  gHN = vec4f(0.0, 2.2, 0.0, 1.0);   // (lit as the ground under it: the cards' own normals would light each card apart)
  gHT = vec4f(c * vec3f(0.2, 0.26, 0.08), 1.0);
  gHK = vec4f(0.96, 0.0, 0.0, 1.0);   // (as rough as the turf: a sheen on the blades toward a low sun read as a pale band)
  return vec4f(c, a);
}
`,
);
function wQ(o, t) {
  let e = new me({
    color: 16777215,
    roughness: 0.82,
    metalness: 0,
    vertexColors: !0,
    map: Pyt(),
    alphaTest: 0.5,
    side: ls,
  });
  ((e.userData.mbAlbedo = Lyt),
    (e.userData.mbWind = 1.02),
    (e.name = "sfBlades"));
  let s = new En(Cyt(), e, HF);
  ((s.count = 0),
    (s.frustumCulled = !1),
    (s.castShadow = !1),
    (s.receiveShadow = !0),
    (s.name = "sfLawnBlades"),
    (s.userData.mbReflR = 1));
  let n = new fe(),
    i = new tn(),
    a = new vi(),
    r = new dt(),
    l = new dt(),
    c = new It();
  s.setColorAt(0, c.setRGB(1, 1, 1));
  let h = new Map(),
    f = (p, m) => {
      let g = Math.floor(p * 2) * 65536 + Math.floor(m * 2),
        b = h.get(g);
      return (
        b === void 0 &&
          (h.size > 4e5 && h.clear(),
          (b = !o.clearOfRoads || o.clearOfRoads(p, m, 0.1, !0)),
          h.set(g, b)),
        b
      );
    },
    u = null;
  return {
    mesh: s,
    update: (p, m, g = !1) => {
      let b = globalThis.SF_Q !== "perf";
      if (((s.visible = b), !b)) {
        u = null;
        return;
      }
      if (!g && u && Math.hypot(p - u[0], m - u[1]) < 2.5) return;
      u = [p, m];
      let v = 0,
        x = Math.floor((p - rv) / av),
        y = Math.floor((p + rv) / av),
        M = Math.floor((m - rv) / av),
        S = Math.floor((m + rv) / av);
      for (let w = M; w <= S && v < HF; w++)
        for (let _ = x; _ <= y && v < HF; _++) {
          let z = (_ + oa(_, w, 2)) * av,
            A = (w + oa(_, w, 3)) * av;
          if ((z - p) ** 2 + (A - m) ** 2 > rv * rv) continue;
          let T = t.grassAt(z, A);
          if (T < 0) {
            let F = o.coverAt(z, A);
            T = F & 8 || (F & 15) !== 1 ? 0 : 1;
          }
          if (T < 0.5 + 0.35 * DF(z * 1.3, A * 1.3) || !f(z, A)) continue;
          let E = oa(_, w, 4),
            R = DF(z / 3, A / 3),
            P = 0.38 + 0.25 * E,
            C = (0.07 + 0.06 * R + 0.04 * oa(_, w, 5)) * Math.min(1, 0.5 + T);
          (a.set(0, oa(_, w, 6) * 6.283, 0, "YXZ"),
            i.setFromEuler(a),
            r.set(P, C, P),
            l.set(z, o.terrainAt(z, A) - 0.01, A),
            n.compose(l, i, r),
            s.setMatrixAt(v, n));
          let I = 0.85 + 0.3 * oa(_, w, 8),
            L = t.dryAt ? Math.min(1, t.dryAt(z, A) * 1.4) : 0;
          (s.setColorAt(
            v,
            c.setRGB(
              I * (0.97 + 0.08 * R) * (1 + 0.45 * L),
              I * (1 + 0.12 * L),
              I * (0.95 + 0.1 * oa(_, w, 9)) * (1 - 0.35 * L),
            ),
          ),
            v++);
        }
      ((s.count = v),
        (s.instanceMatrix.needsUpdate = !0),
        (s.instanceColor.needsUpdate = !0));
    },
  };
}
es();
await No();
var Eh = On("local"),
  Fo = (o, t, e) => {
    let s = Math.sin(o * 12.9898 + t * 78.233 + e * 17.17) * 43758.5453;
    return s - Math.floor(s);
  };
function Iyt(o, t, e) {
  let s = Fo(o, t, 1);
  return Eh && o > -3110 && o < -2810 && t > 3850 && t < 4090
    ? s < 0.38
      ? "palm"
      : s < 0.5
        ? "fpalm"
        : s < 0.7
          ? "tree0"
          : s < 0.85
            ? "cypress"
            : "tree2"
    : Eh && o < -7611 && t < 1700
      ? e
        ? s < 0.55
          ? "cypress"
          : s < 0.85
            ? "pine"
            : "euc"
        : s < 0.5
          ? "cypress"
          : s < 0.8
            ? "pine"
            : s < 0.9
              ? "euc"
              : "tree1"
      : Eh && t < -2600
        ? e
          ? s < 0.4
            ? "euc"
            : s < 0.62
              ? "cypress"
              : s < 0.78
                ? "pine"
                : "tree1"
          : s < 0.3
            ? "cypress"
            : s < 0.5
              ? "pine"
              : s < 0.68
                ? "euc"
                : s < 0.88
                  ? "tree1"
                  : "tree2"
        : e
          ? s < 0.42
            ? "euc"
            : s < 0.74
              ? "cypress"
              : "pine"
          : s < 0.26
            ? "tree0"
            : s < 0.44
              ? "tree2"
              : s < 0.62
                ? "cypress"
                : s < 0.72
                  ? "pine"
                  : s < 0.8
                    ? "euc"
                    : s < 0.93
                      ? "tree1"
                      : "fpalm";
}
var MQ = {
  shrub: 0.85,
  flowers: 0.55,
  hedge: 1,
  palm: 0.6,
  tree: 0.35,
  well: 0.6,
  clump: 0.5,
  mat: 0.7,
  fhedge: 0.4,
  fhedge2: 0.45,
};
function UF(o, t, e = null, s = !1, n = null) {
  if (!o || !o.clearOfRoads) return 0;
  let i = new Set(),
    a = (l, c) => Math.round(l * 10) + "," + Math.round(c * 10);
  for (let l of t) {
    let c = MQ[l.kind];
    c === void 0 ||
      (l.kind === "well" && !s) ||
      (n && !n(l)) ||
      o.clearOfRoads(l.x, l.z, Math.max(0, c * (l.scale || 1) - 0.2)) ||
      i.add(a(l.x, l.z));
  }
  if (!i.size) return 0;
  let r = (l, c) => {
    let h = 0;
    for (let f = 0; f < l.length; f++) c(l[f]) && (l[h++] = l[f]);
    l.length = h;
  };
  return (
    r(t, (l) => !(MQ[l.kind] !== void 0 && i.has(a(l.x, l.z)))),
    e && r(e, (l) => !(l.t === "circ" && l.r < 1 && i.has(a(l.x, l.z)))),
    i.size
  );
}
var SQ = new WeakMap();
function TQ(o) {
  let t = SQ.get(o);
  if (t && t.n === o.edges.length) return t;
  let e = 16,
    s = new Map();
  for (let n of o.edges)
    if (!(
      n.inner ||
      !(
        n.hwy ||
        n.cls === "motorway" ||
        n.cls === "trunk" ||
        n.cls === "trunk_link" ||
        n.cls === "motorway_link"
      )
    ))
      for (let i = 0; i + 1 < n.n; i++) {
        let a = n.P[i * 3],
          r = n.P[i * 3 + 1],
          l = n.P[i * 3 + 3],
          c = n.P[i * 3 + 4],
          h = Math.max(n.W[i], n.W[i + 1]) + 2,
          f = [a, r, n.P[i * 3 + 2], l, c, n.P[i * 3 + 5], n.W[i], n.W[i + 1]];
        for (
          let u = Math.floor((Math.min(a, l) - h) / e);
          u <= Math.floor((Math.max(a, l) + h) / e);
          u++
        )
          for (
            let d = Math.floor((Math.min(r, c) - h) / e);
            d <= Math.floor((Math.max(r, c) + h) / e);
            d++
          ) {
            let p = u * 100003 + d,
              m = s.get(p);
            (m || s.set(p, (m = [])), m.push(f));
          }
      }
  return ((t = { n: o.edges.length, cells: s, C: e }), SQ.set(o, t), t);
}
function wM(o, t, e, s, n) {
  let i = TQ(o),
    a = i.cells.get(Math.floor(t / i.C) * 100003 + Math.floor(e / i.C));
  if (!a) return !1;
  for (let [r, l, c, h, f, u, d, p] of a) {
    let m = h - r,
      g = f - l,
      b = m * m + g * g || 1,
      v = Math.max(0, Math.min(1, ((t - r) * m + (e - l) * g) / b));
    if (
      !(s !== void 0 && Math.abs(c + (u - c) * v - s) > 5) &&
      Math.hypot(r + m * v - t, l + g * v - e) < d + (p - d) * v + n
    )
      return !0;
  }
  return !1;
}
var kQ = new Set(["tree", "ptree", "palm"]),
  zQ = new Set([
    "shrub",
    "clump",
    "mat",
    "flowers",
    "hedge",
    "fhedge",
    "fhedge2",
    "planter",
  ]);
