// app 156 — math
// Lines 96759-97098 of readable/app.pretty.js (statement-aligned).
function Emt(o) {
  let t = 0;
  for (let e of o.edges) !e.inner && A$.has(e.way) && ((e.inner = !0), t++);
  if (!t) return 0;
  for (let e of o.juns) {
    if (!e.legs.length || !e.legs.some(([m]) => m.inner)) continue;
    let s = e.legs.filter(([m]) => !m.inner);
    if (!s.length) {
      ((e.rings = []), (e.polys = []));
      continue;
    }
    if (s.length !== 1 || !e.legs.some(([m]) => m.inner && A$.has(m.way)))
      continue;
    let [n, i] = s[0],
      a = null,
      r = 5;
    for (let m of o.juns) {
      if (m === e || !m.legs.some(([b]) => !b.inner && b !== n)) continue;
      let g = Math.hypot(m.x - e.x, m.z - e.z);
      g < r && ((r = g), (a = m));
    }
    if (!a || n.n < 2) continue;
    let l = i === "a" ? 0 : n.n - 1,
      c = a.y - n.P[l * 3 + 2],
      h = Float32Array.from(n.P);
    ((h[l * 3] = a.x), (h[l * 3 + 1] = a.z));
    let f = n.L,
      u = n.ta,
      d = n.tb;
    ((n.P = h),
      Tr(n),
      (n._gb = null),
      (n.ta = u),
      (n.tb = d),
      (n.s0 = u),
      (n.s1 = n.L - d));
    let p = Math.min(n.L * 0.8, Math.max(10, Math.abs(c) / 0.06));
    for (let m = 0; m < n.n; m++) {
      let g = i === "a" ? n.S[m] : n.L - n.S[m];
      if (g < p) {
        let b = 1 - g / p;
        n.P[m * 3 + 2] += c * b * b * (3 - 2 * b);
      }
    }
    (i === "a" ? (n.ja = a.id) : (n.jb = a.id),
      a.legs.push([n, i]),
      (e.legs = e.legs.filter(([m]) => m !== n)),
      (e.rings = []),
      (e.polys = []));
  }
  return t;
}
function Tmt(o) {
  let { EH: t, HC: e, hk: s } = o,
    n = {},
    i = {},
    a = 0;
  for (let r of o.edges) {
    if (r.inner || r.layered || r.hwy || r.groundBridge || r.s1 - r.s0 < 2)
      continue;
    let l = 0;
    for (let f = 0; f < r.n; f++) l = Math.max(l, r.W[f]);
    if (l > 3.2) continue;
    let c = 0,
      h = 0;
    for (let f = r.s0 + 0.5; f < r.s1 - 0.5; f += 2) {
      (Ot(r, f, n), c++);
      let u = t.get(s(Math.floor(n.x / e), Math.floor(n.z / e)));
      if (!u) continue;
      let d = !1;
      for (let p of u) {
        let m = o.edges[Math.floor(p / 65536)];
        if (m === r || m.inner || m.layered) continue;
        let g = p % 65536;
        if (
          (ys(m, n.x, n.z, i, g, g),
          i.w > l + 0.5 && i.d + l * 0.5 <= i.w && i.s >= m.s0 && i.s <= m.s1)
        ) {
          d = !0;
          break;
        }
      }
      d && h++;
    }
    c && h >= c * 0.5 && ((r.inner = !0), a++);
  }
  return a;
}
function Rmt(o) {
  let t = new Map(),
    e = new Map(),
    s = (n, i, a) => {
      let r = n.get(i);
      (r || n.set(i, (r = [])), r.push(a));
    };
  for (let n of o.edges) {
    let i = n.P;
    for (let a = 0; a + 1 < n.n; a++) {
      let r = Math.max(n.W[a], n.W[a + 1]) + n.sw + 1.5,
        l = Math.min(i[a * 3], i[a * 3 + 3]) - r,
        c = Math.max(i[a * 3], i[a * 3 + 3]) + r,
        h = Math.min(i[a * 3 + 1], i[a * 3 + 4]) - r,
        f = Math.max(i[a * 3 + 1], i[a * 3 + 4]) + r;
      for (let u = Math.floor(l / T0); u <= Math.floor(c / T0); u++)
        for (let d = Math.floor(h / T0); d <= Math.floor(f / T0); d++)
          s(t, Aw(u, d), n.id * 65536 + a);
    }
  }
  for (let n of o.juns)
    if (n.rings.length)
      for (let i = Math.floor(n.bb[0] / T0); i <= Math.floor(n.bb[2] / T0); i++)
        for (
          let a = Math.floor(n.bb[1] / T0);
          a <= Math.floor(n.bb[3] / T0);
          a++
        )
          s(e, Aw(i, a), n);
  ((o.EH = t), (o.JH = e), (o.HC = T0), (o.hk = Aw));
}
var Rl = (o, t, e = 0) => {
  let s = new o.constructor(o.length + t.length);
  if ((s.set(o), e))
    for (let n = 0; n < t.length; n++) s[o.length + n] = t[n] + e;
  else s.set(t, o.length);
  return s;
};
function Amt(o, t) {
  let e = o.n,
    s = o.rStart.length - 1,
    n = o.pts.length / 2;
  ((o.bRing = Rl(o.bRing.subarray(0, e), t.bRing, s)),
    (o.rStart = Rl(o.rStart.subarray(0, s), t.rStart, n)),
    (o.pts = Rl(o.pts, t.pts)),
    (o.front = Rl(o.front, t.front)),
    (o.bF = Rl(o.bF, t.bF)),
    (o.bB = Rl(o.bB, t.bB)),
    (o.seed = Rl(o.seed, t.seed)),
    (o.roof = Rl(o.roof, t.roof)),
    (o.roofH = Rl(o.roofH, t.roofH)),
    (o.named = { ...o.named }));
  for (let [i, a] of Object.entries(t.meta.named || {})) o.named[e + +i] = a;
  o.n += t.meta.count;
}
function Pmt(o, t) {
  if (t.meta.kinds.join() !== o.kinds.join()) {
    let e = t.meta.kinds.map((s) => o.kinds.indexOf(s));
    t.pk = t.pk.map((s) => e[s]);
  }
  ((o.pf = Rl(o.pf, t.pf)),
    (o.pk = Rl(o.pk, t.pk)),
    (o.px = Rl(o.px, t.px)),
    (o.n += t.meta.count));
}
var cx = (o, t, e) => {
  if (!rn(o[0].pts || o[0], t, e)) return !1;
  for (let s = 1; s < o.length; s++) if (rn(o[s].pts || o[s], t, e)) return !1;
  return !0;
};
async function zC(o, t = "assets/real/") {
  let e = [
      "terrain.bin",
      "roads.bin",
      "buildings.bin",
      "props.bin",
      "coast.bin",
    ],
    s = await Promise.all(e.map((n) => o(t + n)));
  return zmt(Object.fromEntries(e.map((n, i) => [n, s[i]])));
}
async function L$(o, t, e, s = "assets/real/") {
  let n = z0[t],
    i = [...Jk, ...(n.split ? [] : ["ground.bin", "green.bin"])],
    a = await Promise.all(i.map((l) => e(s + n.dir + l).catch(() => null))),
    r = C$(o, t, Object.fromEntries(Jk.map((l, c) => [l, a[c]])));
  return (
    r &&
      ((r.ground = a[i.indexOf("ground.bin")] || null),
      (r.green = a[i.indexOf("green.bin")] || null)),
    r
  );
}
await No();
var wf = bi.districts || {},
  I$ = Object.fromEntries(
    Object.entries(wf.lines || {}).map(([o, [t, e, s, n]]) => [
      o,
      (i, a) => (i + t) * e + (a + s) * n,
    ]),
  ),
  Cmt = Object.fromEntries(
    Object.entries(wf.edges || {}).map(([o, t]) => [
      o,
      (e) => {
        for (let s of t)
          if (s.length < 4 || e > s[3]) return s[0] + (s[1] - e) * s[2];
        return 0;
      },
    ]),
  ),
  Lmt = {
    "<": (o, t) => o < t,
    "<=": (o, t) => o <= t,
    ">": (o, t) => o > t,
    ">=": (o, t) => o >= t,
  };
function Imt([o, t, e], s, n) {
  let i = o === "x" ? s : o === "z" ? n : I$[o](s, n);
  return Lmt[t](i, typeof e == "string" ? Cmt[e.slice(5)](s) : e);
}
function F$(o, t, e) {
  for (let s of o) {
    if (s.if && !s.if.every((i) => Imt(i, t, e))) continue;
    if (typeof s.then == "string") return s.then;
    let n = F$(s.then, t, e);
    if (n) return n;
  }
  return null;
}
var yf = wf.grid;
function Di(o, t) {
  let e = wf.rules ? F$(wf.rules, o, t) : null;
  if (e) return e;
  if (yf) {
    let s = Math.floor((o - yf.x0) / yf.cell),
      n = Math.floor((t - yf.z0) / yf.cell);
    if (s >= 0 && n >= 0 && s < yf.nx && n < yf.nz)
      return yf.names[yf.idx[n * yf.nx + s]];
  }
  return wf.default || "western";
}
var Zk = I$.market || null,
  jm = new Set(wf.downtown || []),
  MAt = wf.list || [wf.default || "western"],
  SAt = new Set(wf.rowhouse || []);
var Fmt = Array.from({ length: 8 }, (o, t) => [
  Math.cos((t * Math.PI) / 4),
  Math.sin((t * Math.PI) / 4),
]);
function Rp(o, t, e, s, n, i = 0) {
  if (!o) return !0;
  let a = (r, l) =>
    !o.probe(r, l).all.some((c) => s < c.y + 4.5 && n > c.y - 1.5);
  return a(t, e) ? !i || Fmt.every(([r, l]) => a(t + r * i, e + l * i)) : !1;
}
function dh(o, t, e, s = 0, n = 0.04) {
  if (!o) return !0;
  let i = Math.max(1, Math.ceil(Math.hypot(e[0] - t[0], e[2] - t[2]) / 0.75));
  for (let a = 0; a <= i; a++) {
    let r = a / i,
      l = t[1] + (e[1] - t[1]) * r - 4 * s * r * (1 - r);
    if (
      !Rp(o, t[0] + (e[0] - t[0]) * r, t[2] + (e[2] - t[2]) * r, l - n, l + n)
    )
      return !1;
  }
  return !0;
}
var O$ = [0.35, 0.345, 0.33, 0],
  AC = [0.48, 0.47, 0.45, 0.5],
  Ar = [0.5, 0.49, 0.46, 0.5],
  Qk = [-2300, -760, -2150, -700];
function kf(o) {
  if (o.name === "Lombard Street" && o.oneway) {
    let t = Ot(o, o.L / 2, {});
    if (t.x > Qk[0] && t.x < Qk[2] && t.z > Qk[1] && t.z < Qk[3]) return 0.85;
  }
  return o.flags & Al.cable || (o.flags & Al.tram && !o.median && !o.oneway)
    ? 0.45
    : o.hwy || (o.elev && o.rank >= 6) || o.cls === "trunk_link"
      ? 0.52
      : o.median
        ? 0.3
        : 0.1;
}
function dc(o) {
  let t = (a) => {
      let r = [];
      for (let l = 0; l < a.length; l += 2) r.push(new Pe(a[l], a[l + 1]));
      return r;
    },
    e = t(o[0]),
    s = o.slice(1).map(t),
    n = So.triangulateShape(e, s),
    i = [];
  for (let a of o) for (let r = 0; r < a.length; r++) i.push(a[r]);
  return { tris: n, flat: i };
}
function nz(o, t, e, s) {
  let n = o.p.a,
    i = n[t * 3],
    a = n[t * 3 + 2],
    r = n[e * 3],
    l = n[e * 3 + 2],
    c = n[s * 3],
    h = n[s * 3 + 2];
  (l - a) * (c - i) - (r - i) * (h - a) >= 0 ? o.tri(t, e, s) : o.tri(t, s, e);
}
function Omt(o, t, e = !0) {
  let s = [],
    n = o.length / 2,
    i = e ? n : n - 1;
  for (let a = 0; a < i; a++) {
    let r = o[a * 2],
      l = o[a * 2 + 1],
      c = o[((a + 1) % n) * 2],
      h = o[((a + 1) % n) * 2 + 1],
      f = Math.max(1, Math.ceil(Math.hypot(c - r, h - l) / t));
    for (let u = 0; u < f; u++)
      s.push(r + ((c - r) * u) / f, l + ((h - l) * u) / f);
  }
  return (e || s.push(o[(n - 1) * 2], o[(n - 1) * 2 + 1]), s);
}
var j$ = 32,
  $$ = 64,
  X$ = 128,
  K$ = (o) => !!(o.flags & Al.tram) && !(o.flags & Al.cable) && kf(o) === 0.45,
  Bmt = (o) =>
    !o.hwy &&
    !o.elev &&
    !o.layer &&
    (o.cls === "service" ||
      o.cls === "living_street" ||
      o.cls === "pedestrian" ||
      (o.lanes <= 1 &&
        o.W[0] <= 4 &&
        /(Alley|Place|Lane)$/.test(o.name || "")));
function PC(o) {
  return (
    ((o.flags | (o.noX || 0) | (Bmt(o) ? 15 : 0)) & 15) | 16 | (K$(o) ? j$ : 0)
  );
}
var Nmt = new Set([
    "Mission Street",
    "Geary Street",
    "O'Farrell Street",
    "3rd Street",
    "Kearny Street",
    "Stockton Street",
  ]),
  Hmt = new Set(["fidi", "towers", "union", "tenderloin", "soma", "mission"]);
