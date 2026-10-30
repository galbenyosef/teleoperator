// app 211 — math
// Lines 114132-114472 of readable/app.pretty.js (statement-aligned).
var cxt = We(we.granite, 0.72, 0.7, 0.66),
  hxt = Tn(ln.WIN, we.stucco, 0.93, 0.86, 0.7),
  Px = We(we.stucco, 0.95, 0.88, 0.72),
  CL = We(we.terracotta, 0.62, 0.24, 0.14),
  PL = Lt(Ct.matte, 0.32, 0.52, 0.46);
function fxt(o, t, e, s) {
  let [n, i] = mY(t.L, e),
    a = i + s;
  Ss(o, e, n - 0.6, a, hxt, { vBase: i - 4 });
  let r = ia(e);
  return (
    Eo(o, r, 0.3, a - 0.5, a, Px),
    r.forEach((l, c) => {
      let h = [-l.n[0], -l.n[1]],
        f = 0.7,
        u = 2.6,
        d = r[(c + r.length - 1) % r.length],
        p = r[(c + 1) % r.length],
        m = d.u[0] * l.u[0] + d.u[1] * l.u[1] > 0.996 ? 0 : f,
        g = p.u[0] * l.u[0] + p.u[1] * l.u[1] > 0.996 ? 0 : f;
      oe(
        o,
        [
          [
            l.a[0] + l.n[0] * f - l.u[0] * m,
            a,
            l.a[1] + l.n[1] * f - l.u[1] * m,
          ],
          [
            l.b[0] + l.n[0] * f + l.u[0] * g,
            a,
            l.b[1] + l.n[1] * f + l.u[1] * g,
          ],
          [l.b[0] + h[0] * u, a + 2.2, l.b[1] + h[1] * u],
          [l.a[0] + h[0] * u, a + 2.2, l.a[1] + h[1] * u],
        ],
        CL,
        [l.n[0], 1.2, l.n[1]],
      );
    }),
    sr(o, e, a + 2.15, CL),
    LL(t, e, n - 3, a + 3),
    { gmin: n, gmax: i, top: a }
  );
}
function uxt(o, t) {
  let { D: e } = t,
    s = null;
  for (let u of bh.lone) {
    let d = pY(e, u);
    if (!d) continue;
    let p = Ra(d),
      m = fxt(o, t, p, u === bh.lone[0] ? 15 : 12);
    u === bh.lone[0] && (s = { pts: p, ...m });
  }
  if (!s) return;
  let n = s.pts,
    i = 0,
    a = 0;
  for (let [u, d] of n) ((i += u / n.length), (a += d / n.length));
  let r = n[0];
  for (let u of n)
    u[1] - Math.abs(u[0] - i) * 0.3 > r[1] - Math.abs(r[0] - i) * 0.3 &&
      (r = u);
  let l = i * 0.5 + r[0] * 0.5,
    c = Math.min(r[1] - 6, a + 14),
    h = s.top,
    f = 4.6;
  cn(o, [l, c], [1, 0], [0, 1], f, f, s.gmin, h + 12, Px);
  for (let [u, d] of [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]) {
    let p = [l + u * (f + 0.09), c + d * (f + 0.09)],
      m = [-d, u];
    oe(
      o,
      [
        [p[0] - m[0] * 1.1, h + 4, p[1] - m[1] * 1.1],
        [p[0] + m[0] * 1.1, h + 4, p[1] + m[1] * 1.1],
        [p[0] + m[0] * 1.1, h + 9, p[1] + m[1] * 1.1],
        [p[0], h + 10.6, p[1]],
        [p[0] - m[0] * 1.1, h + 9, p[1] - m[1] * 1.1],
      ],
      gh,
      [u, 0, d],
    );
  }
  for (let [u, d] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let p = [l + u * f, c + d * f];
    (Ce(o, [p[0], s.gmin, p[1]], [p[0], h + 12, p[1]], 0.45, Px, 4),
      Ce(o, [p[0], h + 12, p[1]], [p[0], h + 15.5, p[1]], [0.45, 0.05], Px, 4));
  }
  qe(
    o,
    l,
    c,
    [
      [f - 0.4, h + 12],
      [f - 0.4, h + 18],
      [f - 0.1, h + 18],
      [f - 0.1, h + 18.8],
    ],
    8,
    Px,
  );
  for (let u = 0; u < 8; u++) {
    let d = ((u + 0.5) / 8) * Math.PI * 2,
      p = [l + Math.cos(d) * (f - 0.38), c - Math.sin(d) * (f - 0.38)];
    cn(
      o,
      p,
      [Math.sin(d), Math.cos(d)],
      [Math.cos(d), -Math.sin(d)],
      0.7,
      0.06,
      h + 13,
      h + 17,
      gh,
    );
    let m = [
      l + Math.cos((u / 8) * Math.PI * 2) * (f - 0.1),
      c - Math.sin((u / 8) * Math.PI * 2) * (f - 0.1),
    ];
    Ce(o, [m[0], h + 18.8, m[1]], [m[0], h + 21, m[1]], [0.25, 0.03], Px, 4);
  }
  (qe(
    o,
    l,
    c,
    [
      [f - 0.2, h + 18.8],
      [f * 0.55, h + 21.5],
      [0.4, h + 23.2],
    ],
    8,
    CL,
  ),
    qe(
      o,
      l,
      c,
      [
        [0.4, h + 23.2],
        [0.3, h + 24],
      ],
      6,
      PL,
    ),
    Ce(o, [l, h + 24, c], [l, h + 27.5, c], 0.1, PL, 4),
    Ce(o, [l - 0.9, h + 26.4, c], [l + 0.9, h + 26.4, c], 0.08, PL, 4),
    t.colliders.push({
      t: "obb",
      x: l,
      z: c,
      hx: f,
      hz: f,
      c: 1,
      s: 0,
      y0: s.gmin - 3,
      y1: h + 25,
    }));
}
var FL = [];
function gY(o, t, e) {
  for (let [i, a, r] of nxt) {
    let l = e.L.terrainAt(i, a);
    (e.inst.push({
      kind: "palm",
      x: i,
      y: l,
      z: a,
      rot: (i * 7.1 + a) % 6.28,
      scale: r,
    }),
      e.colliders.push({
        t: "circ",
        x: i,
        z: a,
        r: 0.45,
        y0: l - 1.5,
        y1: l + 6,
      }));
  }
  let s = [
      ["conservatory", axt],
      ["stignatius", lxt],
      ["lonemountain", uxt],
    ],
    n = (i, a) => {
      let r = new Be();
      try {
        a(r, e);
      } catch (l) {
        console.error("r20b:", i, l);
      }
      return r;
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [i, a] of s) vn(o.group, n(i, a), t.lm, "R20B_" + i);
    return;
  }
  for (let [i, a] of s)
    FL.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(i, a);
      } finally {
        e.colliders = r;
      }
      return (vn(o.rc?.group || o.group, c, t.lm, "R20B_" + i), l);
    });
}
es();
var vh = {
  at: [-87.64, 89.99],
  face: [-0.7, 0.715],
  plinthR: 3.5,
  plinthH: 0.55,
  name: "R-Evolution",
};
function bY(o) {
  let [t, e] = vh.at,
    s = 24,
    n = vh.plinthR + 2.5;
  o.claim({
    name: "revolution",
    buildings: !1,
    poly: Array.from({ length: s }, (i, a) => [
      t + Math.cos((a / s) * 2 * Math.PI) * n,
      e + Math.sin((a / s) * 2 * Math.PI) * n,
    ]),
  });
}
var BL = (o) => (o + 0.5) / 8,
  dxt = (o) => `
var<private> RV_LED: array<vec3f, 6> = array<vec3f, 6>(vec3f(0.06, 0.2, 1.0), vec3f(0.4, 0.1, 1.0), vec3f(1.0, 0.08, 0.62), vec3f(1.0, 0.05, 0.08), vec3f(0.62, 0.7, 1.0), vec3f(0.12, 0.42, 1.0));
fn rvLed(p: f32) -> vec3f { let k = fract(p) * 6.0; let i = u32(floor(k)); let f = smoothstep(0.15, 0.85, fract(k)); return mix(RV_LED[i], RV_LED[(i + 1u) % 6u], f); }
fn rvH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(12.9898, 78.233))) * 43758.5453); }
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let kind = floor(col.a * 8.0); let h = col.r;
  let night = bc.b; let wet = bc.g;
  let led = rvLed(bc.r);
  // the uplights from the plinth: brightest at the feet, still strong at the head
  let up = mix(1.35, 0.7, clamp(h, 0.0, 1.0));
  // the mesh skin: wire in a triangular lattice (world metres on the face's dominant axis; derivatives in uniform flow)
  let n = abs(gNw);
  var q = wp.xz;
  if (n.x > n.y && n.x > n.z) { q = wp.zy; } else if (n.z > n.y) { q = wp.xy; }
  let P = 0.07; let wire = 0.45;
  var m = 0.0; var fwm = 0.0;
  for (var k = 0; k < 3; k++) {
    let ang = f32(k) * 2.0943951 + 0.3;
    let s = dot(q, vec2f(cos(ang), sin(ang))) / P;
    let fw = max(fwidth(s), 1e-4);
    let d = abs(fract(s + 0.5) - 0.5);
    m = max(m, 1.0 - smoothstep(wire * 0.5 - fw, wire * 0.5 + fw, d));
    fwm = max(fwm, fw);
  }
  var c = vec3f(0.6, 0.61, 0.62); var rough = 0.36; var metal = 1.0; var emit = vec3f(0.0); var a = 1.0;
  if (kind < 0.5) {
    // beyond where the lattice resolves: its coverage, dithered per pixel and per TAA frame (the TAA averages a veil)
    let far = smoothstep(0.18, 0.4, fwm);
    let cover = 0.85;
    var dith = 1.0;
    ${
      o
        ? ""
        : `if (F.sunB.w > 0.5) {
      let cp = F.viewProj * vec4f(wp, 1.0); let sp = (cp.xy / cp.w * 0.5 + 0.5) / F.screen.xy;
      dith = select(0.0, 1.0, rvH(floor(sp) + vec2f(F.sunB.w * 7.13, F.sunB.w * 3.71)) < cover);
    }`
    }
    a = mix(m, dith, far);
    ${o ? "a = 1.0;" : ""}
    c = vec3f(0.56, 0.565, 0.57) * mix(1.0, 0.88, far); rough = 0.48; metal = 0.75;
    emit = led * night * 0.12 * up;
  } else if (kind < 1.5) {
    // the tubes: brighter, smoother steel; the LEDs' light along them
    c = vec3f(0.44, 0.445, 0.45); rough = 0.4; metal = 0.9;
    emit = led * night * 0.2 * up;
  } else if (kind < 2.5) {
    // the hair: a darker woven steel, bronzed
    c = vec3f(0.3, 0.27, 0.23); rough = 0.5; metal = 0.85;
    emit = led * night * 0.07;
  } else if (kind < 3.5) {
    // the plinth's polished rim, the LEDs round its foot
    c = vec3f(0.5, 0.505, 0.51); rough = 0.28; metal = 0.85;
    emit = led * night * 0.25 * smoothstep(0.75, 0.0, h);
  } else {
    c = vec3f(0.36, 0.365, 0.37); rough = 0.5; metal = 0.6;
    emit = led * night * 0.1;
  }
  c *= 1.0 - 0.15 * wet;
  gHE = emit;
  gHK = vec4f(rough, metal, 0.0, 1.0);
  return vec4f(c, a);
}
`,
  Cx = null;
function pxt(o) {
  if (Cx) return Cx;
  let t = !!globalThis.SF_LITE,
    e = (n) => {
      let i = new me({
        color: 16777215,
        roughness: 0.4,
        metalness: 1,
        vertexColors: !0,
        side: n ? ls : $a,
        alphaTest: n && !t ? 0.5 : 0,
      });
      return (
        (i.userData.mbAlbedo = dxt(t)),
        (i.userData.dayGlow = 0),
        (i.name = n ? "revo_skin" : "revo_steel"),
        o.night.push(i),
        i
      );
    };
  Cx = { skin: e(!0), steel: e(!1) };
  let s = 0;
  return (
    o.onUpdate.push((n, i, a) => {
      s += a;
      let r = (s / 96) % 1;
      ((Cx.skin.color.r = r), (Cx.steel.color.r = r));
    }),
    Cx
  );
}
