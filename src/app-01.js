// app 01 — math
// Lines 1-340 of readable/app.pretty.js (statement-aligned).
globalThis.MB_GZ = true;
globalThis.SF_DIST = true;
globalThis.SF_VARIANT = "taxi";
globalThis.SF_MP = true;
var bat = Object.defineProperty;
var Ki = (o, t, e) => () => {
  if (e) throw e[0];
  try {
    return (o && (t = o((o = 0))), t);
  } catch (s) {
    throw ((e = [s]), s);
  }
};
var Kh = (o, t) => {
  for (var e in t) bat(o, e, { get: t[e], enumerable: !0 });
};
async function xat() {
  if (tR) {
    let t = [
      globalThis.process.env.PLACE_FILE,
      globalThis.process.cwd() + "/assets/real/place.json",
      new URL("../assets/real/place.json", import.meta.url).pathname,
    ].filter(Boolean);
    for (let e of t)
      if (tR.existsSync(e)) return JSON.parse(tR.readFileSync(e, "utf8"));
    throw new Error("place.json not found: " + t.join(", "));
  }
  for (let o = 0; ; o++)
    try {
      let t = await fetch(new URL("assets/real/place.json", document.baseURI));
      if (!t.ok) throw new Error("assets/real/place.json: " + t.status);
      return await t.json();
    } catch (t) {
      if (o >= 3) throw t;
      await new Promise((e) => setTimeout(e, [500, 1500, 3e3][o]));
    }
}
var tR,
  bi,
  On,
  Ia,
  No = Ki(async () => {
    tR =
      typeof window > "u" ? globalThis.process?.getBuiltinModule?.("fs") : null;
    ((bi = await xat()),
      (On = (o) => !!bi.features?.[o]),
      (Ia = (o, t) =>
        bi.content ? (bi.content[o] ?? (Array.isArray(t) ? [] : null)) : t));
  });
function oR(o) {
  Hc = o;
}
function Fa(o) {
  let t = o >>> 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function aR(o, t) {
  if (Hc) return Hc.ground(o, t);
  let e = 4;
  for (let i of yat) {
    let a = (o - i.x) / i.sx,
      r = (t - i.z) / i.sz;
    e += i.a * Math.exp(-0.5 * (a * a + r * r));
  }
  let s = ml((o - 1200) / 260) * ml((t - 820) / 200),
    n = Math.max(ml((o - 1450) / 180), ml((60 - t) / 130));
  return (
    (e = e * (1 - 0.85 * s) + 4.5 * 0.85 * s),
    (e = e * (1 - n) + 3.2 * n),
    e
  );
}
function ml(o) {
  return ((o = Math.min(1, Math.max(0, o))), o * o * (3 - 2 * o));
}
function rR(o) {
  let t = Yi;
  return (
    t.lift * Math.min(1, Math.max(0, Math.min(o - t.x0, t.x1 - o) / t.ramp))
  );
}
function UH(o) {
  return o <= 0
    ? 0
    : o >= 1
      ? 1
      : o < hu
        ? o * o * g8
        : o > 1 - hu
          ? 1 - (1 - o) * (1 - o) * g8
          : (o - hu / 2) / (1 - hu);
}
function GH(o) {
  return o <= 0 || o >= 1
    ? 0
    : o < hu
      ? 2 * o * g8
      : o > 1 - hu
        ? 2 * (1 - o) * g8
        : 1 / (1 - hu);
}
function lR(o) {
  let t = 0;
  for (; t < xn - 2 && o > he[t + 1];) t++;
  return t;
}
function cR(o) {
  let t = 0;
  for (; t < ks - 2 && o > pe[t + 1];) t++;
  return t;
}
function VH(o, t, e, s, n) {
  return (o - (t + s)) / (e - n - (t + s));
}
function $t(o, t, e = null) {
  if (Hc) return Hc.ground(o, t, e);
  if (o < he[0] || o > he[xn - 1] || t < pe[0] || t > pe[ks - 1])
    return eR(o, t, e);
  let s = lR(o),
    n = cR(t),
    i = VH(o, he[s], he[s + 1], u8[s], u8[s + 1]),
    a = VH(t, pe[n], pe[n + 1], d8[n], d8[n + 1]),
    r = UH(i),
    l = UH(a),
    c = Yl[s][n],
    h = Yl[s + 1][n],
    f = Yl[s][n + 1],
    u = Yl[s + 1][n + 1],
    d = c + (h - c) * r,
    p = f + (u - f) * r,
    m = d + (p - d) * l;
  if (e) {
    let g = GH(i) / (he[s + 1] - u8[s + 1] - (he[s] + u8[s])),
      b = GH(a) / (pe[n + 1] - d8[n + 1] - (pe[n] + d8[n]));
    ((e.dx = ((h - c) * (1 - l) + (u - f) * l) * g), (e.dz = (p - d) * b));
  }
  return m;
}
function eR(o, t, e) {
  if (o > Ye.x || t < Ye.z) return (e && ((e.dx = 0), (e.dz = 0)), jH);
  let s = Math.min(Math.max(o, he[0]), he[xn - 1]),
    n = Math.min(Math.max(t, pe[0]), pe[ks - 1]);
  if (o > he[xn - 1] || t < pe[0]) return (e && ((e.dx = 0), (e.dz = 0)), 3);
  let i = 0.5,
    a = $t(s, n),
    r = Math.hypot(o - s, t - n),
    l = aR(o, t),
    c = ml(r / 160),
    h = a * (1 - c) + l * c;
  if (e) {
    let f = eR(o + i, t, null),
      u = eR(o, t + i, null);
    ((e.dx = (f - h) / i), (e.dz = (u - h) / i));
  }
  return h;
}
function WH(o, t) {
  let e = [];
  for (let s = 0; s + 1 < o.length; s++) {
    let n = o[Math.max(0, s - 1)],
      i = o[s],
      a = o[s + 1],
      r = o[Math.min(o.length - 1, s + 2)],
      l = Math.max(1, Math.ceil(Math.hypot(a[0] - i[0], a[2] - i[2]) / t));
    for (let c = 0; c < l; c++) {
      let h = c / l,
        f = h * h,
        u = f * h;
      e.push(
        [0, 1, 2].map(
          (d) =>
            0.5 *
            (2 * i[d] +
              (-n[d] + a[d]) * h +
              (2 * n[d] - 5 * i[d] + 4 * a[d] - r[d]) * f +
              (-n[d] + 3 * i[d] - 3 * a[d] + r[d]) * u),
        ),
      );
    }
  }
  return (e.push(o[o.length - 1].slice()), e);
}
function Ni(o, t, e = 0.6) {
  if (O1) return null;
  let s = uo.grid.get(Math.floor(o / uo.HC) * 100003 + Math.floor(t / uo.HC));
  if (!s) return null;
  let n = null;
  for (let [i, a] of s) {
    let r = uo[i];
    if (a < 0) {
      let v = r.end;
      Math.hypot(o - v[0], t - v[2]) <= r.plaza + e &&
        (!n || n.plaza) &&
        (n = {
          H: r,
          k: -1,
          s: r.len,
          v: 0,
          y: v[1],
          plaza: !0,
          dy: 0,
          ux: 0,
          uz: 1,
        });
      continue;
    }
    let l = r.pts[a],
      c = r.pts[a + 1],
      h = c[0] - l[0],
      f = c[2] - l[2],
      u = h * h + f * f,
      d = ((o - l[0]) * h + (t - l[2]) * f) / u;
    if (d < -0.02 || d > 1.02) continue;
    d = Math.min(1, Math.max(0, d));
    let p = Math.sqrt(u),
      m = h / p,
      g = f / p,
      b = (o - l[0]) * -g + (t - l[2]) * m;
    Math.abs(b) > r.hw + e ||
      ((!n || n.plaza || Math.abs(b) < Math.abs(n.v)) &&
        (n = {
          H: r,
          k: a,
          s: r.s[a] + d * p,
          v: b,
          y: l[1] + (c[1] - l[1]) * d,
          dy: (c[1] - l[1]) / p,
          ux: m,
          uz: g,
        }));
  }
  return n;
}
function m8(o, t) {
  let e = o[0][0] > o[o.length - 1][0] ? o.slice().reverse() : o;
  if (t <= e[0][0]) return e[0][1];
  if (t >= e[e.length - 1][0]) return e[e.length - 1][1];
  for (let s = 0; s + 1 < e.length; s++)
    if (t <= e[s + 1][0]) {
      let n = (t - e[s][0]) / (e[s + 1][0] - e[s][0]);
      return e[s][1] + (e[s + 1][1] - e[s][1]) * n;
    }
  return e[e.length - 1][1];
}
function KH() {
  let o = (e, s) => {
      let n = e[0][0] > e[e.length - 1][0] ? e.slice().reverse() : e,
        i = `fn ${s}(x: f32) -> f32 {
  if (x <= ${n[0][0].toFixed(1)}) { return ${n[0][1].toFixed(1)}; }
`;
      for (let a = 0; a + 1 < n.length; a++)
        i += `  if (x <= ${n[a + 1][0].toFixed(1)}) { return mix(${n[a][1].toFixed(1)}, ${n[a + 1][1].toFixed(1)}, (x - ${n[a][0].toFixed(1)}) / ${(n[a + 1][0] - n[a][0]).toFixed(1)}); }
`;
      return (
        i +
        `  return ${n[n.length - 1][1].toFixed(1)};
}
`
      );
    },
    t = [[Ye.x + 400, Ye.z], ...gl];
  return {
    fns: o(t, "sfShoreW") + o(F1, "sfShoreM"),
    body: `let sw = select(smoothstep(${(Ye.z + 4).toFixed(1)}, ${(Ye.z - 30).toFixed(1)}, xz.y), smoothstep(sfShoreW(xz.x) + 4.0, sfShoreW(xz.x) - 30.0, xz.y), xz.x < -120.0);
  let east = smoothstep(${(Ye.x - 4).toFixed(1)}, ${(Ye.x + 30).toFixed(1)}, xz.x) * step(-2000.0, xz.y);
  let marin = select(1.0, smoothstep(sfShoreM(xz.x) - 4.0, sfShoreM(xz.x) + 30.0, xz.y), xz.x < -1000.0);
  return min(max(sw, east), marin);`,
  };
}
function Vo(o, t, e = !0) {
  if (Hc) return Hc.ground(o, t);
  let s;
  if (o < -1e3 && t < m8(F1, o) + 40) {
    let n = m8(F1, o) - t;
    s = -8 + (18 + p8(o, t, kat) + 8) * ml(n / 110);
  } else if (o > 3300 && t < 800) {
    let n = p8(o, t, [[4560, -80, 125, 310, 250]]) - 9,
      i = Math.max(0, Math.abs(o - 4200) - 430),
      a = Math.max(0, Math.abs(t + 1500) - 620),
      r = Math.hypot(i, a);
    s = Math.max(n, 4 - 12 * ml(r / 35), -8);
  } else if (o < 900 && t < -4800)
    s = p8(o, t, [[-485, -6190, 240, 620, 560]]) - 12;
  else {
    let n = Math.min(Math.max(o, he[0]), he[xn - 1]),
      i = Math.min(Math.max(t, pe[0]), pe[ks - 1]),
      a = ml(Math.hypot(o - n, t - i) / 160);
    s =
      $t(n, i) * (1 - a) +
      (aR(o, t) + p8(o, t, Sat) * ml((-1400 - o) / 900)) * a;
    let r =
      o < -120
        ? ml((m8(gl, o) - t) / 45)
        : o > Ye.x
          ? ml((o - Ye.x) / 20)
          : t < Ye.z
            ? ml((Ye.z - t) / 20)
            : 0;
    s = s * (1 - r) - 8 * r;
  }
  if (e) {
    let n = Ni(o, t, 24);
    if (n) {
      let i = n.y - 0.45,
        a = Math.abs(n.v),
        r = a <= n.H.hw + 2 ? 1 : Math.max(0, 1 - (a - n.H.hw - 2) / 22);
      (s > i || i - s < 9) &&
        (s = s + (i - s) * r * (s > i ? 1 : ml(1 - (i - s - 6) / 3)));
    }
  }
  return s;
}
function YH(o, t, e) {
  let s = js(Math.floor(o / 90), Math.floor(t / 90), 3),
    n = js(Math.floor(o / 23), Math.floor(t / 23), 9);
  return e < 2.5
    ? [0.3, 0.27, 0.22, 1]
    : o < -1e3 && t < m8(F1, o) + 40
      ? s < 0.35
        ? [0.035, 0.05, 0.025, 1]
        : [0.16 + 0.04 * n, 0.125 + 0.025 * n, 0.06, 1]
      : o > 3300 && t < 800
        ? t < -800
          ? [0.3, 0.3, 0.29, 0]
          : [0.03 + 0.015 * n, 0.05 + 0.015 * n, 0.025, 1]
        : t < -4800
          ? [0.035, 0.055, 0.028, 1]
          : o < -1600
            ? s < 0.72
              ? [0.022 + 0.012 * n, 0.04 + 0.014 * n, 0.022, 1]
              : [0.055, 0.085, 0.032, 1]
            : [0.36, 0.35, 0.33, 0];
}
