// app 296 — math
// Lines 144435-144631 of readable/app.pretty.js (statement-aligned).
function $Q({
  D: o,
  L: t,
  mats: e = {},
  tex: s = null,
  headless: n = typeof document > "u",
  strict: i = !1,
}) {
  KF(o, t);
  let a = new le();
  a.name = "Landmarks";
  let r = new Map(),
    c = jQ(o, t, {
      group: a,
      mats: e,
      tex: s,
      headless: n,
      C: (u, d) => {
        let p = ju(u, d),
          m = r.get(p);
        return (
          m || r.set(p, (m = {})),
          new Proxy(m, {
            get: (g, b) =>
              typeof b == "string" ? (g[b] ||= new Be()) : void 0,
          })
        );
      },
    });
  if (!qQ())
    for (let u of WQ) {
      let d = performance.now();
      try {
        u.buildReal?.(c);
      } catch (p) {
        if (i) throw p;
        console.error("landmarks:", u.NAME, p);
      }
      c.ms = { ...(c.ms || {}), [u.NAME]: Math.round(performance.now() - d) };
    }
  if (!n)
    for (let [u, d] of r)
      for (let [p, m] of Object.entries(d)) {
        if (m.empty || !e[p]) continue;
        let g = new ye(m.geometry(!0), e[p]);
        ((g.name = `lmc_${u}_${p}`),
          (g.matrixAutoUpdate = !1),
          g.updateMatrix(),
          (g.castShadow = !0),
          (g.receiveShadow = !0),
          a.add(g));
      }
  r.clear();
  let h = 0;
  function f(u, d, p = 0.016) {
    for (let m of c.onUpdate) m(u, d, p);
    if (!((h -= p) > 0)) {
      h = 0.3;
      for (let m of c.sites)
        m.cull && (m.group.visible = Math.hypot(m.x - u, m.z - d) < m.cull);
    }
  }
  return (
    (c.ms = {
      ...(c.ms || {}),
      vegOffRoads: UF(t, c.inst, c.colliders) + lv(o, c.inst, c.colliders),
    }),
    {
      group: a,
      colliders: c.colliders,
      inst: c.inst,
      night: c.night,
      update: f,
      ms: c.ms,
      sites: c.sites,
    }
  );
}
var m5t = typeof location < "u" && /[?&]oldlow\b/.test(location.search || ""),
  g5t =
    +(
      typeof location < "u" && new URLSearchParams(location.search).get("thinK")
    ) || 1;
var JQ = (o) => qF(o),
  YF = (o) =>
    (o || "")
      .toUpperCase()
      .replace(/\bSTREET\b/g, "ST")
      .replace(/\bAVENUE\b/g, "AVE")
      .replace(/\bBOULEVARD\b/g, "BLVD")
      .replace(/\bDRIVE\b/g, "DR")
      .replace(/\bPLACE\b/g, "PL")
      .replace(/\bTERRACE\b/g, "TER")
      .replace(/\bCOURT\b/g, "CT")
      .replace(/\bLANE\b/g, "LN")
      .replace(/\bROAD\b/g, "RD")
      .replace(/\bHIGHWAY\b/g, "HWY"),
  Sc = (o) => {
    let t = new le();
    return (
      (t.name = o),
      (t.matrixAutoUpdate = !1),
      (t.matrixWorldNeedsUpdate = !0),
      t
    );
  },
  XQ =
    (!!globalThis.SF_MP ||
      (typeof location < "u" && /[?&]mp\b/.test(location.search || ""))) &&
    !(typeof location < "u" && /[?&]nocarextra\b/.test(location.search || "")),
  ud = 520,
  EM = 2700,
  g2 = 5200;
function ZQ(o) {
  let t = o.terrain.sea,
    e = t.bits,
    s = Object.values(o.regions || {})
      .map((r) => r.sea)
      .filter(Boolean),
    n = (r) => r.toFixed(1),
    i = `const SF_SEA = array<u32, ${e.length}>(${e.map((r) => (r >>> 0) + "u").join(",")});
${s.map(
  (r, l) =>
    `const SF_SEA_R${l} = array<u32, ${r.bits.length}>(${r.bits.map((c) => (c >>> 0) + "u").join(",")});`,
).join(`
`)}
fn sfSeaBit(i: i32, j: i32) -> f32 {
${
  bi.bake?.outsideSea
    ? `  if (i < 0 || j < 0 || i >= ${t.nx} || j >= ${t.nz}) { return select(0.0, 1.0, j < 0 || i < 0 || (i >= ${t.nx} && j < ${Math.round((2600 - t.z0) / t.cell)})); }
  let k = u32(j * ${t.nx} + i);`
    : `  let k = u32(clamp(j, 0, ${t.nz - 1}) * ${t.nx} + clamp(i, 0, ${t.nx - 1}));`
}   // (outside the mask: San Francisco's bay and ocean; a place's own edge carried on)
  return f32((SF_SEA[k >> 5u] >> (k & 31u)) & 1u);
}
// a sample at world p (a cell centre of the city's mask): a region's bit inside its box
fn sfSeaAt(i: i32, j: i32) -> f32 {
  let p = vec2f(${n(t.x0)}, ${n(t.z0)}) + (vec2f(f32(i), f32(j)) + 0.5) * ${n(t.cell)};
${s.map(
  (r, l) =>
    `  { let q = (p - vec2f(${n(r.x0)}, ${n(r.z0)})) / ${n(r.cell)}; if (q.x >= 0.0 && q.y >= 0.0 && q.x < ${n(r.nx)} && q.y < ${n(r.nz)}) { let kk = u32(i32(q.y) * ${r.nx} + i32(q.x)); return f32((SF_SEA_R${l}[kk >> 5u] >> (kk & 31u)) & 1u); } }`,
).join(`
`)}
  return sfSeaBit(i, j);
}
`,
    a = `let q = (xz - vec2f(${t.x0.toFixed(1)}, ${t.z0.toFixed(1)})) / ${t.cell.toFixed(1)} - 0.5; let i = i32(floor(q.x)); let j = i32(floor(q.y)); let f = q - floor(q);
  let a = mix(sfSeaAt(i, j), sfSeaAt(i + 1, j), f.x); let b = mix(sfSeaAt(i, j + 1), sfSeaAt(i + 1, j + 1), f.x);
  return smoothstep(0.25, 0.75, mix(a, b, f.y));`;
  return { fns: i, body: a };
}
function Yp(o, t, e, s, n, i, a, { plateau: r = !1 } = {}) {
  let l = null,
    c = {};
  for (let f of o.edges)
    f.name !== e ||
      f.inner ||
      f.s1 - f.s0 < 8 ||
      (ys(f, s, n, c),
      c.d < 250 &&
        (!l || c.d < l.d) &&
        (l = { E: f, s: c.s, d: c.d, dd: c.d - c.w }));
  let h = l || t.roadAt(s, n, 60);
  return h ? JF(h.E, h.s, i, a, { plateau: r }) : [s, n, Math.atan2(-i, -a)];
}
function JF(o, t, e, s, { plateau: n = !1 } = {}) {
  let i = n
      ? Math.min(o.L - 0.6, Math.max(0.6, t))
      : Math.min(o.s1 - 3, Math.max(o.s0 + 3, t)),
    a = Ob(o, i, i + 0.5),
    [, r, l, , c, h, f] = a[0],
    u = a[1][1] - r,
    d = a[1][2] - l,
    p = u * e + d * s >= 0 ? 1 : -1,
    m = o.flags & 4 ? 0 : 2.3,
    g = Math.max(1, o.lanes),
    b = Cp(o),
    v = o.oneway
      ? (2 * (f - m) - b) / g
      : Math.max((f - m - (o.median ? 1.6 : 0) - b) / g, 2.6),
    x = o.oneway
      ? -(f - m) + v * (g - 0.5)
      : (o.median ? 1.6 : 0) + v * (g - 0.5),
    y = o.oneway ? 1 : p;
  return [r + c * x * y, l + h * x * y, Math.atan2(-u * p, -d * p)];
}
var KQ = (o, t) => {
    for (let [e, s] of Object.entries(z0)) {
      let n = s.bounds;
      if (o >= n.x0 && o <= n.x1 && t >= n.z0 && t <= n.z1) return e;
    }
    return null;
  },
  b5t = (o) => {
    let t = Math.floor(o.n / 2) * 3;
    return [o.P[t], o.P[t + 2]];
  };
