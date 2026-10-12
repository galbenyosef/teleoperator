// app 297 — math
// Lines 144155-144346 of readable/app.pretty.js (statement-aligned).
function qJ({
  D: i,
  L: t,
  mats: e = {},
  tex: s = null,
  headless: n = typeof document > "u",
  strict: o = !1,
}) {
  vI(i, t);
  let a = new ke();
  a.name = "Landmarks";
  let r = new Map(),
    c = WJ(i, t, {
      group: a,
      mats: e,
      tex: s,
      headless: n,
      C: (u, d) => {
        let p = hu(u, d),
          m = r.get(p);
        return (
          m || r.set(p, (m = {})),
          new Proxy(m, {
            get: (g, b) =>
              typeof b == "string" ? (g[b] ||= new Ce()) : void 0,
          })
        );
      },
    });
  if (!GJ())
    for (let u of UJ) {
      let d = performance.now();
      try {
        u.buildReal?.(c);
      } catch (p) {
        if (o) throw p;
        console.error("landmarks:", u.NAME, p);
      }
      c.ms = { ...(c.ms || {}), [u.NAME]: Math.round(performance.now() - d) };
    }
  if (!n)
    for (let [u, d] of r)
      for (let [p, m] of Object.entries(d)) {
        if (m.empty || !e[p]) continue;
        let g = new _e(m.geometry(!0), e[p]);
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
      vegOffRoads: fI(t, c.inst, c.colliders) + Mx(i, c.inst, c.colliders),
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
var qxt = typeof location < "u" && /[?&]oldlow\b/.test(location.search || ""),
  jxt =
    +(
      typeof location < "u" && new URLSearchParams(location.search).get("thinK")
    ) || 1;
var XJ = (i) => mI(i),
  yI = (i) =>
    (i || "")
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
  Jc = (i) => {
    let t = new ke();
    return (
      (t.name = i),
      (t.matrixAutoUpdate = !1),
      (t.matrixWorldNeedsUpdate = !0),
      t
    );
  },
  jJ =
    (!!globalThis.SF_MP ||
      (typeof location < "u" && /[?&]mp\b/.test(location.search || ""))) &&
    !(typeof location < "u" && /[?&]nocarextra\b/.test(location.search || "")),
  Pu = 520,
  Cw = 2700,
  Am = 5200;
function KJ(i) {
  let t = i.terrain.sea,
    e = t.bits,
    s = Object.values(i.regions || {})
      .map((r) => r.sea)
      .filter(Boolean),
    n = (r) => r.toFixed(1),
    o = `const SF_SEA = array<u32, ${e.length}>(${e.map((r) => (r >>> 0) + "u").join(",")});
${s.map(
  (r, l) =>
    `const SF_SEA_R${l} = array<u32, ${r.bits.length}>(${r.bits.map((c) => (c >>> 0) + "u").join(",")});`,
).join(`
`)}
fn sfSeaBit(i: i32, j: i32) -> f32 {
  if (i < 0 || j < 0 || i >= ${t.nx} || j >= ${t.nz}) { return select(0.0, 1.0, j < 0 || i < 0 || (i >= ${t.nx} && j < ${Math.round((2600 - t.z0) / t.cell)})); }
  let k = u32(j * ${t.nx} + i); return f32((SF_SEA[k >> 5u] >> (k & 31u)) & 1u);
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
  return { fns: o, body: a };
}
function zx(i, t, e, s, n, o, a, { plateau: r = !1 } = {}) {
  let l = null,
    c = {};
  for (let f of i.edges)
    f.name !== e ||
      f.inner ||
      f.s1 - f.s0 < 8 ||
      (vs(f, s, n, c),
      c.d < 250 &&
        (!l || c.d < l.d) &&
        (l = { E: f, s: c.s, d: c.d, dd: c.d - c.w }));
  let h = l || t.roadAt(s, n, 60);
  return h ? wI(h.E, h.s, o, a, { plateau: r }) : [s, n, Math.atan2(-o, -a)];
}
function wI(i, t, e, s, { plateau: n = !1 } = {}) {
  let o = n
      ? Math.min(i.L - 0.6, Math.max(0.6, t))
      : Math.min(i.s1 - 3, Math.max(i.s0 + 3, t)),
    a = $g(i, o, o + 0.5),
    [, r, l, , c, h, f] = a[0],
    u = a[1][1] - r,
    d = a[1][2] - l,
    p = u * e + d * s >= 0 ? 1 : -1,
    m = i.flags & 4 ? 0 : 2.3,
    g = Math.max(1, i.lanes),
    b = tp(i),
    x = i.oneway
      ? (2 * (f - m) - b) / g
      : Math.max((f - m - (i.median ? 1.6 : 0) - b) / g, 2.6),
    v = i.oneway
      ? -(f - m) + x * (g - 0.5)
      : (i.median ? 1.6 : 0) + x * (g - 0.5),
    y = i.oneway ? 1 : p;
  return [r + c * v * y, l + h * v * y, Math.atan2(-u * p, -d * p)];
}
var VJ = (i, t) => {
    for (let [e, s] of Object.entries(h0)) {
      let n = s.bounds;
      if (i >= n.x0 && i <= n.x1 && t >= n.z0 && t <= n.z1) return e;
    }
    return null;
  },
  Vxt = (i) => {
    let t = Math.floor(i.n / 2) * 3;
    return [i.P[t], i.P[t + 2]];
  };
