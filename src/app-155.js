// app 155 — math
// Lines 96415-96758 of readable/app.pretty.js (statement-aligned).
function zmt(o) {
  let t = _a(o["terrain.bin"]),
    e = _a(o["roads.bin"]),
    s = _a(o["buildings.bin"]),
    n = _a(o["props.bin"]),
    i = o["coast.bin"] ? _a(o["coast.bin"]) : null,
    a = {
      meta: {
        terrain: t.meta,
        roads: e.meta,
        buildings: s.meta,
        props: n.meta,
      },
    };
  ((a.terrain = P$(t)), On("crissy") && Smt(a.terrain));
  let r = Object.entries(z0).map(([m, g]) => ({ key: m, def: g, dir: g.dir }));
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
    kmt(a, e));
  for (let [m, g] of Object.entries(e.meta.regions || {})) {
    for (let b = g.e0; b < g.e1; b++) a.edges[b].region = m;
    for (let b = g.j0; b < g.j1; b++) a.juns[b].region = m;
  }
  let l = 0;
  for (let m of a.edges) l += Mmt(m);
  ((a.fillets = l), On("highways") && f$(a), On("tunnels") && Vq(a));
  for (let m of a.edges)
    (m.ja >= 0 && a.juns[m.ja].legs.push([m, "a"]),
      m.jb >= 0 && a.juns[m.jb].legs.push([m, "b"]));
  (Emt(a), (a.joinedEnds = T$(a)));
  for (let m of a.juns)
    ((m.elev = m.legs.length > 0 && m.legs.every(([g]) => g.elev)),
      (m.layered = m.legs.length > 0 && m.legs.every(([g]) => g.layered)));
  for (let m of a.juns)
    if (m.legs.some(([g]) => g.tunnel))
      for (let [g, b] of m.legs)
        g.tunnel || ((g.atPortal ||= [!1, !1])[b === "a" ? 0 : 1] = !0);
  let c = m$(a),
    h = R$(a);
  ((a.decks = y$(a)),
    (a.decks.merged = h),
    (a.decks.underpasses = M$(a)),
    (a.decks.joins = k$(a)),
    (a.decks.plates = z$(a)),
    (a.decks.carved = S$(a)),
    (a.walks = new Map()),
    (a.curbs = new Map()));
  let f = e,
    u = (m, g, b) => {
      let v = new Float32Array(m.length);
      for (let x = 0; x + 1 < g.length; x++) {
        let [y, M] = b(x);
        for (let S = g[x]; S < g[x + 1]; S++)
          ((v[S * 2] = y * _i + m[S * 2] / 100),
            (v[S * 2 + 1] = M * _i + m[S * 2 + 1] / 100));
      }
      return v;
    };
  for (let m of [f]) {
    if (m.wQ) {
      let g = new Int32Array(m.wRing.length - 1);
      for (let b = 0; b + 1 < m.wPoly.length; b++)
        for (let v = m.wPoly[b]; v < m.wPoly[b + 1]; v++) g[v] = b;
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
        v = [],
        x = [];
      for (let M = m.wPoly[g]; M < m.wPoly[g + 1]; M++)
        (v.push(m.wPts.subarray(m.wRing[M] * 2, m.wRing[M + 1] * 2)),
          m.wY && x.push(m.wY.subarray(m.wRing[M], m.wRing[M + 1])));
      v.ys = m.wY ? x : null;
      let y = a.walks.get(b);
      (y || a.walks.set(b, (y = [])), y.push(v));
    }
    for (let g = 0; g + 1 < m.cStart.length; g++) {
      let b = `${m.cChunk[g * 2]},${m.cChunk[g * 2 + 1]}`,
        v = m.cPts.subarray(m.cStart[g] * 2, m.cStart[g + 1] * 2);
      v.ys = m.cY ? m.cY.subarray(m.cStart[g], m.cStart[g + 1]) : null;
      let x = a.curbs.get(b);
      (x || a.curbs.set(b, (x = [])), x.push(v));
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
  for (let m of [i]) {
    if (!m) continue;
    let g = a.seawall.length;
    for (let b = 0; b + 1 < m.sStart.length; b++)
      a.seawall.push(m.sPts.subarray(m.sStart[b] * 2, m.sStart[b + 1] * 2));
    if (m.iCode) {
      let b = (v, x) => v.subarray(m.iStart[x], m.iStart[x + 1]);
      a.seawallCode ||
        ((a.seawallCode = []), (a.seawallY = []), (a.seawallSide = []));
      for (let v = g; v < a.seawall.length; v++)
        ((a.seawallCode[v] = b(m.iCode, v - g)),
          (a.seawallY[v] = b(m.iY, v - g)),
          (a.seawallSide[v] = m.iSide[v - g]));
      a.quayStep = m.meta.quay.step;
    }
  }
  (g$(a, c),
    (a.groundBridges = c.length),
    On("highways") && h$(a),
    On("trench") && Fq(a),
    On("highways") && (a.decks.mitered = _$(a)),
    Rmt(a),
    (a.absorbed = Tmt(a)),
    (a.alleySnap = _mt(a)));
  let p =
    typeof window > "u" &&
    !o.__noRegions &&
    globalThis.process?.getBuiltinModule?.("fs");
  for (let m of r) {
    let g = o[m.dir + "terrain.bin"]
      ? Object.fromEntries(Jk.map((b) => [b, o[m.dir + b]]))
      : null;
    if (!g && p) {
      let b = globalThis.process?.env?.PLACE_OUT,
        v =
          (b
            ? b.replace(/\/?$/, "/")
            : new URL("../../../assets/real/", import.meta.url).pathname) +
          m.dir;
      p.existsSync(v + "terrain.bin") &&
        (g = Object.fromEntries(
          Jk.map((x) => {
            if (!p.existsSync(v + x)) return [x, null];
            let y = p.readFileSync(v + x);
            return [
              x,
              y.buffer.slice(y.byteOffset, y.byteOffset + y.byteLength),
            ];
          }),
        ));
    }
    g && C$(a, m.key, g);
  }
  return a;
}
function C$(o, t, e) {
  let s = o.regions[t];
  if (!s || s.loaded) return null;
  let n = e["terrain.bin"] ? _a(e["terrain.bin"]) : null,
    i = e["buildings.bin"] ? _a(e["buildings.bin"]) : null,
    a = e["props.bin"] ? _a(e["props.bin"]) : null,
    r = null;
  if (n) {
    if (
      ((r = Object.assign(P$(n), { key: t })),
      o.far.some((h) => h.meta.region === t))
    ) {
      let h = (f) => 32 * Math.floor(((f - 1) * r.step) / 32);
      r.clipBox = [r.x0, r.z0, r.x0 + h(r.nx), r.z0 + h(r.nz)];
    }
    (o.terrain.regions.push(r), jq(o, r), E$(o, r));
  }
  let l = o.bld.n,
    c = o.props.n;
  if (i && i.meta.count) {
    if (i.q) {
      i.pts = new Float32Array(i.q.length);
      for (let h = 0; h < i.meta.count; h++)
        for (let f = i.rStart[i.bRing[h]]; f < i.rStart[i.bRing[h + 1]]; f++)
          ((i.pts[f * 2] = i.org[h * 2] + i.q[f * 2] / 100),
            (i.pts[f * 2 + 1] = i.org[h * 2 + 1] + i.q[f * 2 + 1] / 100));
    }
    (Amt(o.bld, i), o.bld.pts0 && (o.bld.pts0 = Rl(o.bld.pts0, i.pts)));
  }
  if ((a && a.meta.count && Pmt(o.props, a), o.claims)) {
    let h = (f, u) => {
      let d = new f.constructor(u);
      return (d.set(f), d);
    };
    ((o.claims.bSkip = h(o.claims.bSkip, o.bld.n)),
      (o.claims.pSkip = h(o.claims.pSkip, o.props.n)));
  }
  return (
    (s.loaded = !0),
    { key: t, grid: r, b0: l, b1: o.bld.n, p0: c, p1: o.props.n }
  );
}
function _mt(o) {
  let t = new Map(),
    e = o.bld,
    s = 0;
  for (let u of o.edges) {
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
        v = Math.min(d[p * 3 + 1], d[p * 3 + 4]) - 4,
        x = Math.max(d[p * 3 + 1], d[p * 3 + 4]) + 4;
      for (let y = Math.floor(g / T0); y <= Math.floor(b / T0); y++)
        for (let M = Math.floor(v / T0); M <= Math.floor(x / T0); M++) {
          let S = Aw(y, M),
            w = t.get(S);
          (w || t.set(S, (w = [])), w.push([u, p]));
        }
    }
  }
  if (!t.size) return 0;
  let n = e.pts,
    i = n.length / 2,
    a = n.slice(),
    r = [];
  for (let u = 0; u < i; u++) {
    let d = n[u * 2],
      p = n[u * 2 + 1],
      m = t.get(Aw(Math.floor(d / T0), Math.floor(p / T0)));
    if (!m) continue;
    let g = null,
      b = 1e9;
    for (let [v, x] of m) {
      let y = v.P,
        M = y[x * 3],
        S = y[x * 3 + 1],
        w = y[x * 3 + 3] - M,
        _ = y[x * 3 + 4] - S,
        z = w * w + _ * _;
      if (z < 1e-6) continue;
      let A = ((d - M) * w + (p - S) * _) / z;
      if (A < 0 || A > 1) continue;
      let T = M + w * A,
        E = S + _ * A,
        R = Math.hypot(d - T, p - E),
        P = v.W[x] + (v.W[x + 1] - v.W[x]) * A;
      Math.abs(R - P) < 0.7 &&
        R > 0.3 &&
        Math.abs(R - P) < b &&
        ((b = Math.abs(R - P)), (g = [T, E, R, P]));
    }
    if (g) {
      let [v, x, y, M] = g,
        S = M / y;
      (b > 0.02 &&
        ((n[u * 2] = v + (d - v) * S), (n[u * 2 + 1] = x + (p - x) * S), s++),
        r.push(u));
    }
  }
  let l = new Int32Array(i);
  for (let u = 0; u < e.n; u++)
    for (let d = e.rStart[e.bRing[u]]; d < e.rStart[e.bRing[u + 1]]; d++)
      l[d] = u;
  let c = new Map(),
    h = (u, d) => Math.floor(u / 4) * 100003 + Math.floor(d / 4),
    f = new Uint8Array(i);
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
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let M of c.get(
          (Math.floor(d / 4) + x) * 100003 + Math.floor(p / 4) + y,
        ) || []) {
          if (f[M] || l[M] === l[u]) continue;
          let S = Math.hypot(n[M * 2] - d, n[M * 2 + 1] - p);
          S > 0.05 && S < g && ((g = S), (m = M));
        }
    if (m < 0) continue;
    let b = (d + n[m * 2]) / 2,
      v = (p + n[m * 2 + 1]) / 2;
    ((n[u * 2] = n[m * 2] = b),
      (n[u * 2 + 1] = n[m * 2 + 1] = v),
      (f[u] = f[m] = 1),
      (s += 2));
  }
  return (s && (e.pts0 = a), s);
}
var A$ = new Set([1006830791, 1006830792, 1006830794, 24326092, 243260921]);
