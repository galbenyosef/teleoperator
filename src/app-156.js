// app 156 — math
// Lines 96145-96484 of readable/app.pretty.js (statement-aligned).
function ndt(i) {
  let t = ga(i["terrain.bin"]),
    e = ga(i["roads.bin"]),
    s = ga(i["buildings.bin"]),
    n = ga(i["props.bin"]),
    o = i["coast.bin"] ? ga(i["coast.bin"]) : null,
    a = {
      meta: {
        terrain: t.meta,
        roads: e.meta,
        buildings: s.meta,
        props: n.meta,
      },
    };
  ((a.terrain = Aj(t)), edt(a.terrain));
  let r = Object.entries(h0).map(([m, g]) => ({ key: m, def: g, dir: g.dir }));
  ((a.regions = Object.fromEntries(
    r.map((m) => [
      m.key,
      {
        key: m.key,
        def: m.def,
        sea: t.meta.regionSea?.[m.key] || null,
        loaded: !1,
      },
    ]),
  )),
    (a.far = t.farH ? [{ h: t.farH, meta: t.meta.far }] : []),
    (a.terrain.regions = []),
    (a.edges = []),
    (a.juns = []),
    sdt(a, e));
  for (let [m, g] of Object.entries(e.meta.regions || {})) {
    for (let b = g.e0; b < g.e1; b++) a.edges[b].region = m;
    for (let b = g.j0; b < g.j1; b++) a.juns[b].region = m;
  }
  let l = 0;
  for (let m of a.edges) l += tdt(m);
  ((a.fillets = l), cj(a), UW(a));
  for (let m of a.edges)
    (m.ja >= 0 && a.juns[m.ja].legs.push([m, "a"]),
      m.jb >= 0 && a.juns[m.jb].legs.push([m, "b"]));
  (odt(a), (a.joinedEnds = zj(a)));
  for (let m of a.juns)
    ((m.elev = m.legs.length > 0 && m.legs.every(([g]) => g.elev)),
      (m.layered = m.legs.length > 0 && m.legs.every(([g]) => g.layered)));
  for (let m of a.juns)
    if (m.legs.some(([g]) => g.tunnel))
      for (let [g, b] of m.legs)
        g.tunnel || ((g.atPortal ||= [!1, !1])[b === "a" ? 0 : 1] = !0);
  let c = dj(a),
    h = Ej(a);
  ((a.decks = xj(a)),
    (a.decks.merged = h),
    (a.decks.underpasses = yj(a)),
    (a.decks.joins = Mj(a)),
    (a.decks.plates = Sj(a)),
    (a.decks.carved = wj(a)),
    (a.walks = new Map()),
    (a.curbs = new Map()));
  let f = e,
    u = (m, g, b) => {
      let x = new Float32Array(m.length);
      for (let v = 0; v + 1 < g.length; v++) {
        let [y, M] = b(v);
        for (let S = g[v]; S < g[v + 1]; S++)
          ((x[S * 2] = y * ui + m[S * 2] / 100),
            (x[S * 2 + 1] = M * ui + m[S * 2 + 1] / 100));
      }
      return x;
    };
  for (let m of [f]) {
    if (m.wQ) {
      let g = new Int32Array(m.wRing.length - 1);
      for (let b = 0; b + 1 < m.wPoly.length; b++)
        for (let x = m.wPoly[b]; x < m.wPoly[b + 1]; x++) g[x] = b;
      m.wPts = u(m.wQ, m.wRing, (b) => [
        m.wChunk[g[b] * 2],
        m.wChunk[g[b] * 2 + 1],
      ]);
    }
    m.cQ &&
      (m.cPts = u(m.cQ, m.cStart, (g) => [
        m.cChunk[g * 2],
        m.cChunk[g * 2 + 1],
      ]));
    for (let g = 0; g + 1 < m.wPoly.length; g++) {
      let b = `${m.wChunk[g * 2]},${m.wChunk[g * 2 + 1]}`,
        x = [],
        v = [];
      for (let M = m.wPoly[g]; M < m.wPoly[g + 1]; M++)
        (x.push(m.wPts.subarray(m.wRing[M] * 2, m.wRing[M + 1] * 2)),
          m.wY && v.push(m.wY.subarray(m.wRing[M], m.wRing[M + 1])));
      x.ys = m.wY ? v : null;
      let y = a.walks.get(b);
      (y || a.walks.set(b, (y = [])), y.push(x));
    }
    for (let g = 0; g + 1 < m.cStart.length; g++) {
      let b = `${m.cChunk[g * 2]},${m.cChunk[g * 2 + 1]}`,
        x = m.cPts.subarray(m.cStart[g] * 2, m.cStart[g + 1] * 2);
      x.ys = m.cY ? m.cY.subarray(m.cStart[g], m.cStart[g + 1]) : null;
      let v = a.curbs.get(b);
      (v || a.curbs.set(b, (v = [])), v.push(x));
    }
  }
  (((m) => {
    if (m.q) {
      m.pts = new Float32Array(m.q.length);
      for (let g = 0; g < m.meta.count; g++)
        for (let b = m.rStart[m.bRing[g]]; b < m.rStart[m.bRing[g + 1]]; b++)
          ((m.pts[b * 2] = m.org[g * 2] + m.q[b * 2] / 100),
            (m.pts[b * 2 + 1] = m.org[g * 2 + 1] + m.q[b * 2 + 1] / 100));
    }
  })(s),
    (a.bld = {
      n: s.meta.count,
      bRing: s.bRing,
      rStart: s.rStart,
      pts: s.pts,
      front: s.front,
      bF: s.bF,
      bB: s.bB,
      seed: s.seed,
      roof: s.roof,
      roofH: s.roofH,
      styles: s.meta.styles,
      named: s.meta.named,
    }),
    (a.props = {
      n: n.meta.count,
      kinds: n.meta.kinds,
      pf: n.pf,
      pk: n.pk,
      px: n.px,
    }),
    (a.bld.nMain = a.bld.n),
    (a.props.nMain = a.props.n),
    (a.seawall = []),
    (a.seawallCode = null));
  for (let m of [o]) {
    if (!m) continue;
    let g = a.seawall.length;
    for (let b = 0; b + 1 < m.sStart.length; b++)
      a.seawall.push(m.sPts.subarray(m.sStart[b] * 2, m.sStart[b + 1] * 2));
    if (m.iCode) {
      let b = (x, v) => x.subarray(m.iStart[v], m.iStart[v + 1]);
      a.seawallCode ||
        ((a.seawallCode = []), (a.seawallY = []), (a.seawallSide = []));
      for (let x = g; x < a.seawall.length; x++)
        ((a.seawallCode[x] = b(m.iCode, x - g)),
          (a.seawallY[x] = b(m.iY, x - g)),
          (a.seawallSide[x] = m.iSide[x - g]));
      a.quayStep = m.meta.quay.step;
    }
  }
  (pj(a, c),
    (a.groundBridges = c.length),
    lj(a),
    LW(a),
    (a.decks.mitered = kj(a)),
    rdt(a),
    (a.absorbed = adt(a)),
    (a.alleySnap = idt(a)));
  let p =
    typeof window > "u" &&
    !i.__noRegions &&
    globalThis.process?.getBuiltinModule?.("fs");
  for (let m of r) {
    let g = i[m.dir + "terrain.bin"]
      ? Object.fromEntries(JS.map((b) => [b, i[m.dir + b]]))
      : null;
    if (!g && p) {
      let b = new URL("../../../assets/real/" + m.dir, import.meta.url)
        .pathname;
      p.existsSync(b + "terrain.bin") &&
        (g = Object.fromEntries(
          JS.map((x) => {
            if (!p.existsSync(b + x)) return [x, null];
            let v = p.readFileSync(b + x);
            return [
              x,
              v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength),
            ];
          }),
        ));
    }
    g && Rj(a, m.key, g);
  }
  return a;
}
function Rj(i, t, e) {
  let s = i.regions[t];
  if (!s || s.loaded) return null;
  let n = e["terrain.bin"] ? ga(e["terrain.bin"]) : null,
    o = e["buildings.bin"] ? ga(e["buildings.bin"]) : null,
    a = e["props.bin"] ? ga(e["props.bin"]) : null,
    r = null;
  if (n) {
    if (
      ((r = Object.assign(Aj(n), { key: t })),
      i.far.some((h) => h.meta.region === t))
    ) {
      let h = (f) => 32 * Math.floor(((f - 1) * r.step) / 32);
      r.clipBox = [r.x0, r.z0, r.x0 + h(r.nx), r.z0 + h(r.nz)];
    }
    (i.terrain.regions.push(r), qW(i, r), _j(i, r));
  }
  let l = i.bld.n,
    c = i.props.n;
  if (o && o.meta.count) {
    if (o.q) {
      o.pts = new Float32Array(o.q.length);
      for (let h = 0; h < o.meta.count; h++)
        for (let f = o.rStart[o.bRing[h]]; f < o.rStart[o.bRing[h + 1]]; f++)
          ((o.pts[f * 2] = o.org[h * 2] + o.q[f * 2] / 100),
            (o.pts[f * 2 + 1] = o.org[h * 2 + 1] + o.q[f * 2 + 1] / 100));
    }
    (ldt(i.bld, o), i.bld.pts0 && (i.bld.pts0 = rl(i.bld.pts0, o.pts)));
  }
  if ((a && a.meta.count && cdt(i.props, a), i.claims)) {
    let h = (f, u) => {
      let d = new f.constructor(u);
      return (d.set(f), d);
    };
    ((i.claims.bSkip = h(i.claims.bSkip, i.bld.n)),
      (i.claims.pSkip = h(i.claims.pSkip, i.props.n)));
  }
  return (
    (s.loaded = !0),
    { key: t, grid: r, b0: l, b1: i.bld.n, p0: c, p1: i.props.n }
  );
}
function idt(i) {
  let t = new Map(),
    e = i.bld,
    s = 0;
  for (let u of i.edges) {
    if (
      u.layered ||
      u.hwy ||
      u.inner ||
      !u.name ||
      (u.cls !== "service" &&
        u.cls !== "residential" &&
        u.cls !== "living_street" &&
        u.cls !== "pedestrian")
    )
      continue;
    let d = u.P;
    for (let p = 0; p + 1 < u.n; p++) {
      if (Math.max(u.W[p], u.W[p + 1]) > 3) continue;
      let g = Math.min(d[p * 3], d[p * 3 + 3]) - 4,
        b = Math.max(d[p * 3], d[p * 3 + 3]) + 4,
        x = Math.min(d[p * 3 + 1], d[p * 3 + 4]) - 4,
        v = Math.max(d[p * 3 + 1], d[p * 3 + 4]) + 4;
      for (let y = Math.floor(g / d0); y <= Math.floor(b / d0); y++)
        for (let M = Math.floor(x / d0); M <= Math.floor(v / d0); M++) {
          let S = Ny(y, M),
            w = t.get(S);
          (w || t.set(S, (w = [])), w.push([u, p]));
        }
    }
  }
  if (!t.size) return 0;
  let n = e.pts,
    o = n.length / 2,
    a = n.slice(),
    r = [];
  for (let u = 0; u < o; u++) {
    let d = n[u * 2],
      p = n[u * 2 + 1],
      m = t.get(Ny(Math.floor(d / d0), Math.floor(p / d0)));
    if (!m) continue;
    let g = null,
      b = 1e9;
    for (let [x, v] of m) {
      let y = x.P,
        M = y[v * 3],
        S = y[v * 3 + 1],
        w = y[v * 3 + 3] - M,
        z = y[v * 3 + 4] - S,
        _ = w * w + z * z;
      if (_ < 1e-6) continue;
      let R = ((d - M) * w + (p - S) * z) / _;
      if (R < 0 || R > 1) continue;
      let T = M + w * R,
        E = S + z * R,
        A = Math.hypot(d - T, p - E),
        C = x.W[v] + (x.W[v + 1] - x.W[v]) * R;
      Math.abs(A - C) < 0.7 &&
        A > 0.3 &&
        Math.abs(A - C) < b &&
        ((b = Math.abs(A - C)), (g = [T, E, A, C]));
    }
    if (g) {
      let [x, v, y, M] = g,
        S = M / y;
      (b > 0.02 &&
        ((n[u * 2] = x + (d - x) * S), (n[u * 2 + 1] = v + (p - v) * S), s++),
        r.push(u));
    }
  }
  let l = new Int32Array(o);
  for (let u = 0; u < e.n; u++)
    for (let d = e.rStart[e.bRing[u]]; d < e.rStart[e.bRing[u + 1]]; d++)
      l[d] = u;
  let c = new Map(),
    h = (u, d) => Math.floor(u / 4) * 100003 + Math.floor(d / 4),
    f = new Uint8Array(o);
  for (let u of r) {
    let d = h(n[u * 2], n[u * 2 + 1]),
      p = c.get(d);
    (p || c.set(d, (p = [])), p.push(u));
  }
  for (let u of r) {
    if (f[u]) continue;
    let d = n[u * 2],
      p = n[u * 2 + 1],
      m = -1,
      g = 1.2;
    for (let v = -1; v <= 1; v++)
      for (let y = -1; y <= 1; y++)
        for (let M of c.get(
          (Math.floor(d / 4) + v) * 100003 + Math.floor(p / 4) + y,
        ) || []) {
          if (f[M] || l[M] === l[u]) continue;
          let S = Math.hypot(n[M * 2] - d, n[M * 2 + 1] - p);
          S > 0.05 && S < g && ((g = S), (m = M));
        }
    if (m < 0) continue;
    let b = (d + n[m * 2]) / 2,
      x = (p + n[m * 2 + 1]) / 2;
    ((n[u * 2] = n[m * 2] = b),
      (n[u * 2 + 1] = n[m * 2 + 1] = x),
      (f[u] = f[m] = 1),
      (s += 2));
  }
  return (s && (e.pts0 = a), s);
}
var Tj = new Set([1006830791, 1006830792, 1006830794, 24326092, 243260921]);
