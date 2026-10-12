// app 212 — math
// Lines 113876-114216 of readable/app.pretty.js (statement-aligned).
var Hmt = Be(be.granite, 0.72, 0.7, 0.66),
  Dmt = yn(sn.WIN, be.stucco, 0.93, 0.86, 0.7),
  jb = Be(be.stucco, 0.95, 0.88, 0.72),
  sC = Be(be.terracotta, 0.62, 0.24, 0.14),
  eC = It(Lt.matte, 0.32, 0.52, 0.46);
function Umt(i, t, e, s) {
  let [n, o] = uX(t.L, e),
    a = o + s;
  ys(i, e, n - 0.6, a, Dmt, { vBase: o - 4 });
  let r = Xo(e);
  return (
    vo(i, r, 0.3, a - 0.5, a, jb),
    r.forEach((l, c) => {
      let h = [-l.n[0], -l.n[1]],
        f = 0.7,
        u = 2.6,
        d = r[(c + r.length - 1) % r.length],
        p = r[(c + 1) % r.length],
        m = d.u[0] * l.u[0] + d.u[1] * l.u[1] > 0.996 ? 0 : f,
        g = p.u[0] * l.u[0] + p.u[1] * l.u[1] > 0.996 ? 0 : f;
      ne(
        i,
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
        sC,
        [l.n[0], 1.2, l.n[1]],
      );
    }),
    Ua(i, e, a + 2.15, sC),
    nC(t, e, n - 3, a + 3),
    { gmin: n, gmax: o, top: a }
  );
}
function Gmt(i, t) {
  let { D: e } = t,
    s = null;
  for (let u of Uc.lone) {
    let d = fX(e, u);
    if (!d) continue;
    let p = va(d),
      m = Umt(i, t, p, u === Uc.lone[0] ? 15 : 12);
    u === Uc.lone[0] && (s = { pts: p, ...m });
  }
  if (!s) return;
  let n = s.pts,
    o = 0,
    a = 0;
  for (let [u, d] of n) ((o += u / n.length), (a += d / n.length));
  let r = n[0];
  for (let u of n)
    u[1] - Math.abs(u[0] - o) * 0.3 > r[1] - Math.abs(r[0] - o) * 0.3 &&
      (r = u);
  let l = o * 0.5 + r[0] * 0.5,
    c = Math.min(r[1] - 6, a + 14),
    h = s.top,
    f = 4.6;
  nn(i, [l, c], [1, 0], [0, 1], f, f, s.gmin, h + 12, jb);
  for (let [u, d] of [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]) {
    let p = [l + u * (f + 0.09), c + d * (f + 0.09)],
      m = [-d, u];
    ne(
      i,
      [
        [p[0] - m[0] * 1.1, h + 4, p[1] - m[1] * 1.1],
        [p[0] + m[0] * 1.1, h + 4, p[1] + m[1] * 1.1],
        [p[0] + m[0] * 1.1, h + 9, p[1] + m[1] * 1.1],
        [p[0], h + 10.6, p[1]],
        [p[0] - m[0] * 1.1, h + 9, p[1] - m[1] * 1.1],
      ],
      Dc,
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
    (Ae(i, [p[0], s.gmin, p[1]], [p[0], h + 12, p[1]], 0.45, jb, 4),
      Ae(i, [p[0], h + 12, p[1]], [p[0], h + 15.5, p[1]], [0.45, 0.05], jb, 4));
  }
  Oe(
    i,
    l,
    c,
    [
      [f - 0.4, h + 12],
      [f - 0.4, h + 18],
      [f - 0.1, h + 18],
      [f - 0.1, h + 18.8],
    ],
    8,
    jb,
  );
  for (let u = 0; u < 8; u++) {
    let d = ((u + 0.5) / 8) * Math.PI * 2,
      p = [l + Math.cos(d) * (f - 0.38), c - Math.sin(d) * (f - 0.38)];
    nn(
      i,
      p,
      [Math.sin(d), Math.cos(d)],
      [Math.cos(d), -Math.sin(d)],
      0.7,
      0.06,
      h + 13,
      h + 17,
      Dc,
    );
    let m = [
      l + Math.cos((u / 8) * Math.PI * 2) * (f - 0.1),
      c - Math.sin((u / 8) * Math.PI * 2) * (f - 0.1),
    ];
    Ae(i, [m[0], h + 18.8, m[1]], [m[0], h + 21, m[1]], [0.25, 0.03], jb, 4);
  }
  (Oe(
    i,
    l,
    c,
    [
      [f - 0.2, h + 18.8],
      [f * 0.55, h + 21.5],
      [0.4, h + 23.2],
    ],
    8,
    sC,
  ),
    Oe(
      i,
      l,
      c,
      [
        [0.4, h + 23.2],
        [0.3, h + 24],
      ],
      6,
      eC,
    ),
    Ae(i, [l, h + 24, c], [l, h + 27.5, c], 0.1, eC, 4),
    Ae(i, [l - 0.9, h + 26.4, c], [l + 0.9, h + 26.4, c], 0.08, eC, 4),
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
var oC = [];
function dX(i, t, e) {
  for (let [o, a, r] of Lmt) {
    let l = e.L.terrainAt(o, a);
    (e.inst.push({
      kind: "palm",
      x: o,
      y: l,
      z: a,
      rot: (o * 7.1 + a) % 6.28,
      scale: r,
    }),
      e.colliders.push({
        t: "circ",
        x: o,
        z: a,
        r: 0.45,
        y0: l - 1.5,
        y1: l + 6,
      }));
  }
  let s = [
      ["conservatory", Nmt],
      ["stignatius", Omt],
      ["lonemountain", Gmt],
    ],
    n = (o, a) => {
      let r = new Ce();
      try {
        a(r, e);
      } catch (l) {
        console.error("r20b:", o, l);
      }
      return r;
    };
  if (typeof window > "u" || typeof document > "u" || !document.body) {
    for (let [o, a] of s) gn(i.group, n(o, a), t.lm, "R20B_" + o);
    return;
  }
  for (let [o, a] of s)
    oC.push(() => {
      let r = e.colliders,
        l = [];
      e.colliders = l;
      let c;
      try {
        c = n(o, a);
      } finally {
        e.colliders = r;
      }
      return (gn(i.rc?.group || i.group, c, t.lm, "R20B_" + o), l);
    });
}
as();
var Wc = {
  at: [-87.64, 89.99],
  face: [-0.7, 0.715],
  plinthR: 3.5,
  plinthH: 0.55,
  name: "R-Evolution",
};
function pX(i) {
  let [t, e] = Wc.at,
    s = 24,
    n = Wc.plinthR + 2.5;
  i.claim({
    name: "revolution",
    buildings: !1,
    poly: Array.from({ length: s }, (o, a) => [
      t + Math.cos((a / s) * 2 * Math.PI) * n,
      e + Math.sin((a / s) * 2 * Math.PI) * n,
    ]),
  });
}
var rC = (i) => (i + 0.5) / 8,
  Wmt = (i) => `
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
      i
        ? ""
        : `if (F.sunB.w > 0.5) {
      let cp = F.viewProj * vec4f(wp, 1.0); let sp = (cp.xy / cp.w * 0.5 + 0.5) / F.screen.xy;
      dith = select(0.0, 1.0, rvH(floor(sp) + vec2f(F.sunB.w * 7.13, F.sunB.w * 3.71)) < cover);
    }`
    }
    a = mix(m, dith, far);
    ${i ? "a = 1.0;" : ""}
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
  Vb = null;
function qmt(i) {
  if (Vb) return Vb;
  let t = !!globalThis.SF_LITE,
    e = (n) => {
      let o = new Ee({
        color: 16777215,
        roughness: 0.4,
        metalness: 1,
        vertexColors: !0,
        side: n ? Ss : Fa,
        alphaTest: n && !t ? 0.5 : 0,
      });
      return (
        (o.userData.mbAlbedo = Wmt(t)),
        (o.userData.dayGlow = 0),
        (o.name = n ? "revo_skin" : "revo_steel"),
        i.night.push(o),
        o
      );
    };
  Vb = { skin: e(!0), steel: e(!1) };
  let s = 0;
  return (
    i.onUpdate.push((n, o, a) => {
      s += a;
      let r = (s / 96) % 1;
      ((Vb.skin.color.r = r), (Vb.steel.color.r = r));
    }),
    Vb
  );
}
