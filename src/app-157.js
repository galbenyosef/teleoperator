// app 157 — math
// Lines 96485-96834 of readable/app.pretty.js (statement-aligned).
function odt(i) {
  let t = 0;
  for (let e of i.edges) !e.inner && Tj.has(e.way) && ((e.inner = !0), t++);
  if (!t) return 0;
  for (let e of i.juns) {
    if (!e.legs.length || !e.legs.some(([m]) => m.inner)) continue;
    let s = e.legs.filter(([m]) => !m.inner);
    if (!s.length) {
      ((e.rings = []), (e.polys = []));
      continue;
    }
    if (s.length !== 1 || !e.legs.some(([m]) => m.inner && Tj.has(m.way)))
      continue;
    let [n, o] = s[0],
      a = null,
      r = 5;
    for (let m of i.juns) {
      if (m === e || !m.legs.some(([b]) => !b.inner && b !== n)) continue;
      let g = Math.hypot(m.x - e.x, m.z - e.z);
      g < r && ((r = g), (a = m));
    }
    if (!a || n.n < 2) continue;
    let l = o === "a" ? 0 : n.n - 1,
      c = a.y - n.P[l * 3 + 2],
      h = Float32Array.from(n.P);
    ((h[l * 3] = a.x), (h[l * 3 + 1] = a.z));
    let f = n.L,
      u = n.ta,
      d = n.tb;
    ((n.P = h),
      dr(n),
      (n._gb = null),
      (n.ta = u),
      (n.tb = d),
      (n.s0 = u),
      (n.s1 = n.L - d));
    let p = Math.min(n.L * 0.8, Math.max(10, Math.abs(c) / 0.06));
    for (let m = 0; m < n.n; m++) {
      let g = o === "a" ? n.S[m] : n.L - n.S[m];
      if (g < p) {
        let b = 1 - g / p;
        n.P[m * 3 + 2] += c * b * b * (3 - 2 * b);
      }
    }
    (o === "a" ? (n.ja = a.id) : (n.jb = a.id),
      a.legs.push([n, o]),
      (e.legs = e.legs.filter(([m]) => m !== n)),
      (e.rings = []),
      (e.polys = []));
  }
  return t;
}
function adt(i) {
  let { EH: t, HC: e, hk: s } = i,
    n = {},
    o = {},
    a = 0;
  for (let r of i.edges) {
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
        let m = i.edges[Math.floor(p / 65536)];
        if (m === r || m.inner || m.layered) continue;
        let g = p % 65536;
        if (
          (vs(m, n.x, n.z, o, g, g),
          o.w > l + 0.5 && o.d + l * 0.5 <= o.w && o.s >= m.s0 && o.s <= m.s1)
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
function rdt(i) {
  let t = new Map(),
    e = new Map(),
    s = (n, o, a) => {
      let r = n.get(o);
      (r || n.set(o, (r = [])), r.push(a));
    };
  for (let n of i.edges) {
    let o = n.P;
    for (let a = 0; a + 1 < n.n; a++) {
      let r = Math.max(n.W[a], n.W[a + 1]) + n.sw + 1.5,
        l = Math.min(o[a * 3], o[a * 3 + 3]) - r,
        c = Math.max(o[a * 3], o[a * 3 + 3]) + r,
        h = Math.min(o[a * 3 + 1], o[a * 3 + 4]) - r,
        f = Math.max(o[a * 3 + 1], o[a * 3 + 4]) + r;
      for (let u = Math.floor(l / d0); u <= Math.floor(c / d0); u++)
        for (let d = Math.floor(h / d0); d <= Math.floor(f / d0); d++)
          s(t, Ny(u, d), n.id * 65536 + a);
    }
  }
  for (let n of i.juns)
    if (n.rings.length)
      for (let o = Math.floor(n.bb[0] / d0); o <= Math.floor(n.bb[2] / d0); o++)
        for (
          let a = Math.floor(n.bb[1] / d0);
          a <= Math.floor(n.bb[3] / d0);
          a++
        )
          s(e, Ny(o, a), n);
  ((i.EH = t), (i.JH = e), (i.HC = d0), (i.hk = Ny));
}
var rl = (i, t, e = 0) => {
  let s = new i.constructor(i.length + t.length);
  if ((s.set(i), e))
    for (let n = 0; n < t.length; n++) s[i.length + n] = t[n] + e;
  else s.set(t, i.length);
  return s;
};
function ldt(i, t) {
  let e = i.n,
    s = i.rStart.length - 1,
    n = i.pts.length / 2;
  ((i.bRing = rl(i.bRing.subarray(0, e), t.bRing, s)),
    (i.rStart = rl(i.rStart.subarray(0, s), t.rStart, n)),
    (i.pts = rl(i.pts, t.pts)),
    (i.front = rl(i.front, t.front)),
    (i.bF = rl(i.bF, t.bF)),
    (i.bB = rl(i.bB, t.bB)),
    (i.seed = rl(i.seed, t.seed)),
    (i.roof = rl(i.roof, t.roof)),
    (i.roofH = rl(i.roofH, t.roofH)),
    (i.named = { ...i.named }));
  for (let [o, a] of Object.entries(t.meta.named || {})) i.named[e + +o] = a;
  i.n += t.meta.count;
}
function cdt(i, t) {
  if (t.meta.kinds.join() !== i.kinds.join()) {
    let e = t.meta.kinds.map((s) => i.kinds.indexOf(s));
    t.pk = t.pk.map((s) => e[s]);
  }
  ((i.pf = rl(i.pf, t.pf)),
    (i.pk = rl(i.pk, t.pk)),
    (i.px = rl(i.px, t.px)),
    (i.n += t.meta.count));
}
var Sb = (i, t, e) => {
  if (!en(i[0].pts || i[0], t, e)) return !1;
  for (let s = 1; s < i.length; s++) if (en(i[s].pts || i[s], t, e)) return !1;
  return !0;
};
async function X7(i, t = "assets/real/") {
  let e = [
      "terrain.bin",
      "roads.bin",
      "buildings.bin",
      "props.bin",
      "coast.bin",
    ],
    s = await Promise.all(e.map((n) => i(t + n)));
  return ndt(Object.fromEntries(e.map((n, o) => [n, s[o]])));
}
async function Pj(i, t, e, s = "assets/real/") {
  let n = h0[t],
    o = [...JS, ...(n.split ? [] : ["ground.bin", "green.bin"])],
    a = await Promise.all(o.map((l) => e(s + n.dir + l).catch(() => null))),
    r = Rj(i, t, Object.fromEntries(JS.map((l, c) => [l, a[c]])));
  return (
    r &&
      ((r.ground = a[o.indexOf("ground.bin")] || null),
      (r.green = a[o.indexOf("green.bin")] || null)),
    r
  );
}
var ZS = (i, t) => 0.697 * i + 0.717 * t,
  hdt = (i) =>
    i > -6148
      ? 466 + (-5059 - i) * 0.257
      : i > -6300
        ? 746 + (-6148 - i) * 1.31
        : 945 + (-6300 - i) * 0.057,
  Cj = (i) => (i > -8180 ? 1080 : 1290);
function Ai(i, t) {
  let e = ZS(i, t) > 30;
  if (t > 3250 && i > -5600) {
    if (i < -4250) return "twinpeaks";
    if (i < -3300) return t > 4350 ? "noe" : "castro";
    if (i < -2560) return t > 4350 ? "noe" : "dolores";
    if (i < -700) return "mission";
  }
  return t < -2600
    ? "sausalito"
    : i < -7611
      ? i > -7960
        ? t < Cj(i)
          ? "presidio"
          : "richmond"
        : i > -8720 && t < Cj(i)
          ? "seacliff"
          : "richmond"
      : i < -5e3
        ? t < hdt(i)
          ? "presidio"
          : "richmond"
        : e
          ? i > -1e3 && t < 1700
            ? "towers"
            : t > 2950 && i >= -2560 && i < -700
              ? "mission"
              : i < -2350
                ? i < -3300
                  ? t > 2550 && t < 3100 && i < -4250
                    ? "haight"
                    : "western"
                  : "hayes"
                : "soma"
          : t > 2550 && t < 3100 && i < -4250 && i > -5300
            ? "haight"
            : (i > -1195 &&
                  i < -1085 &&
                  t > -295 &&
                  t < -175 &&
                  (i + 1140) * 0.66 - (t + 235) * 0.75 < 26) ||
                (i > -1260 && i < -880 && t > -310 && t < -238)
              ? "northbeach"
              : i > -960 && i < -560 && t > -330 && t <= 10
                ? "jackson"
                : i > -1e3 && t > -150
                  ? "fidi"
                  : i > -960 && t > -380 && t <= -150
                    ? "jackson"
                    : t < -1150 && i > -2700 && i < -800
                      ? "wharf"
                      : i > -1290 && i <= -960 && t > -300 && t < 580
                        ? "chinatown"
                        : i > -1560 && i <= -960 && t >= 560
                          ? "union"
                          : i > -2650 && i <= -1560 && t > 720
                            ? "tenderloin"
                            : i > -2150 && i <= -1290 && t > -60 && t <= 720
                              ? "nob"
                              : i > -1750 && t <= -270
                                ? i > -1060 && t > -1150
                                  ? "telegraph"
                                  : "northbeach"
                                : i > -2750
                                  ? "russian"
                                  : t < -400
                                    ? i < -4700
                                      ? "presidio"
                                      : "marina"
                                    : t < -120
                                      ? "cowhollow"
                                      : t < 950
                                        ? "pacific"
                                        : "western";
}
var nm = new Set([
  "fidi",
  "towers",
  "union",
  "jackson",
  "chinatown",
  "tenderloin",
]);
var fdt = Array.from({ length: 8 }, (i, t) => [
  Math.cos((t * Math.PI) / 4),
  Math.sin((t * Math.PI) / 4),
]);
function Jd(i, t, e, s, n, o = 0) {
  if (!i) return !0;
  let a = (r, l) =>
    !i.probe(r, l).all.some((c) => s < c.y + 4.5 && n > c.y - 1.5);
  return a(t, e) ? !o || fdt.every(([r, l]) => a(t + r * o, e + l * o)) : !1;
}
function Bc(i, t, e, s = 0, n = 0.04) {
  if (!i) return !0;
  let o = Math.max(1, Math.ceil(Math.hypot(e[0] - t[0], e[2] - t[2]) / 0.75));
  for (let a = 0; a <= o; a++) {
    let r = a / o,
      l = t[1] + (e[1] - t[1]) * r - 4 * s * r * (1 - r);
    if (
      !Jd(i, t[0] + (e[0] - t[0]) * r, t[2] + (e[2] - t[2]) * r, l - n, l + n)
    )
      return !1;
  }
  return !0;
}
var Lj = [0.35, 0.345, 0.33, 0],
  Q7 = [0.48, 0.47, 0.45, 0.5],
  pr = [0.5, 0.49, 0.46, 0.5],
  QS = [-2300, -760, -2150, -700];
function Vh(i) {
  if (i.name === "Lombard Street" && i.oneway) {
    let t = Ot(i, i.L / 2, {});
    if (t.x > QS[0] && t.x < QS[2] && t.z > QS[1] && t.z < QS[3]) return 0.85;
  }
  return i.flags & ll.cable || (i.flags & ll.tram && !i.median && !i.oneway)
    ? 0.45
    : i.hwy || (i.elev && i.rank >= 6) || i.cls === "trunk_link"
      ? 0.52
      : i.median
        ? 0.3
        : 0.1;
}
function Vl(i) {
  let t = (a) => {
      let r = [];
      for (let l = 0; l < a.length; l += 2) r.push(new Re(a[l], a[l + 1]));
      return r;
    },
    e = t(i[0]),
    s = i.slice(1).map(t),
    n = mo.triangulateShape(e, s),
    o = [];
  for (let a of i) for (let r = 0; r < a.length; r++) o.push(a[r]);
  return { tris: n, flat: o };
}
function nk(i, t, e, s) {
  let n = i.p.a,
    o = n[t * 3],
    a = n[t * 3 + 2],
    r = n[e * 3],
    l = n[e * 3 + 2],
    c = n[s * 3],
    h = n[s * 3 + 2];
  (l - a) * (c - o) - (r - o) * (h - a) >= 0 ? i.tri(t, e, s) : i.tri(t, s, e);
}
function udt(i, t, e = !0) {
  let s = [],
    n = i.length / 2,
    o = e ? n : n - 1;
  for (let a = 0; a < o; a++) {
    let r = i[a * 2],
      l = i[a * 2 + 1],
      c = i[((a + 1) % n) * 2],
      h = i[((a + 1) % n) * 2 + 1],
      f = Math.max(1, Math.ceil(Math.hypot(c - r, h - l) / t));
    for (let u = 0; u < f; u++)
      s.push(r + ((c - r) * u) / f, l + ((h - l) * u) / f);
  }
  return (e || s.push(i[(n - 1) * 2], i[(n - 1) * 2 + 1]), s);
}
