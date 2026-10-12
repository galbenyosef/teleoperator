// app 01 — math
// Lines 1-345 of readable/app.pretty.js (statement-aligned).
globalThis.MB_GZ = true;
globalThis.SF_DIST = true;
globalThis.SF_VARIANT = "taxi";
globalThis.SF_MP = true;
var Zst = Object.defineProperty;
var Vi = (i, t, e) => () => {
  if (e) throw e[0];
  try {
    return (i && (t = i((i = 0))), t);
  } catch (s) {
    throw ((e = [s]), s);
  }
};
var wh = (i, t) => {
  for (var e in t) Zst(i, e, { get: t[e], enumerable: !0 });
};
function CT(i) {
  hc = i;
}
function ka(i) {
  let t = i >>> 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function LT(i, t) {
  if (hc) return hc.ground(i, t);
  let e = 4;
  for (let o of tnt) {
    let a = (i - o.x) / o.sx,
      r = (t - o.z) / o.sz;
    e += o.a * Math.exp(-0.5 * (a * a + r * r));
  }
  let s = q0((i - 1200) / 260) * q0((t - 820) / 200),
    n = Math.max(q0((i - 1450) / 180), q0((60 - t) / 130));
  return (
    (e = e * (1 - 0.85 * s) + 4.5 * 0.85 * s),
    (e = e * (1 - n) + 3.2 * n),
    e
  );
}
function q0(i) {
  return ((i = Math.min(1, Math.max(0, i))), i * i * (3 - 2 * i));
}
function IT(i) {
  let t = Oi;
  return (
    t.lift * Math.min(1, Math.max(0, Math.min(i - t.x0, t.x1 - i) / t.ramp))
  );
}
function OB(i) {
  return i <= 0
    ? 0
    : i >= 1
      ? 1
      : i < Rf
        ? i * i * d4
        : i > 1 - Rf
          ? 1 - (1 - i) * (1 - i) * d4
          : (i - Rf / 2) / (1 - Rf);
}
function HB(i) {
  return i <= 0 || i >= 1
    ? 0
    : i < Rf
      ? 2 * i * d4
      : i > 1 - Rf
        ? 2 * (1 - i) * d4
        : 1 / (1 - Rf);
}
function FT(i) {
  let t = 0;
  for (; t < mn - 2 && i > ae[t + 1];) t++;
  return t;
}
function NT(i) {
  let t = 0;
  for (; t < ws - 2 && i > fe[t + 1];) t++;
  return t;
}
function DB(i, t, e, s, n) {
  return (i - (t + s)) / (e - n - (t + s));
}
function Yt(i, t, e = null) {
  if (hc) return hc.ground(i, t, e);
  if (i < ae[0] || i > ae[mn - 1] || t < fe[0] || t > fe[ws - 1])
    return TT(i, t, e);
  let s = FT(i),
    n = NT(t),
    o = DB(i, ae[s], ae[s + 1], c4[s], c4[s + 1]),
    a = DB(t, fe[n], fe[n + 1], h4[n], h4[n + 1]),
    r = OB(o),
    l = OB(a),
    c = Rl[s][n],
    h = Rl[s + 1][n],
    f = Rl[s][n + 1],
    u = Rl[s + 1][n + 1],
    d = c + (h - c) * r,
    p = f + (u - f) * r,
    m = d + (p - d) * l;
  if (e) {
    let g = HB(o) / (ae[s + 1] - c4[s + 1] - (ae[s] + c4[s])),
      b = HB(a) / (fe[n + 1] - h4[n + 1] - (fe[n] + h4[n]));
    ((e.dx = ((h - c) * (1 - l) + (u - f) * l) * g), (e.dz = (p - d) * b));
  }
  return m;
}
function TT(i, t, e) {
  if (i > Ve.x || t < Ve.z) return (e && ((e.dx = 0), (e.dz = 0)), WB);
  let s = Math.min(Math.max(i, ae[0]), ae[mn - 1]),
    n = Math.min(Math.max(t, fe[0]), fe[ws - 1]);
  if (i > ae[mn - 1] || t < fe[0]) return (e && ((e.dx = 0), (e.dz = 0)), 3);
  let o = 0.5,
    a = Yt(s, n),
    r = Math.hypot(i - s, t - n),
    l = LT(i, t),
    c = q0(r / 160),
    h = a * (1 - c) + l * c;
  if (e) {
    let f = TT(i + o, t, null),
      u = TT(i, t + o, null);
    ((e.dx = (f - h) / o), (e.dz = (u - h) / o));
  }
  return h;
}
function UB(i, t) {
  let e = [];
  for (let s = 0; s + 1 < i.length; s++) {
    let n = i[Math.max(0, s - 1)],
      o = i[s],
      a = i[s + 1],
      r = i[Math.min(i.length - 1, s + 2)],
      l = Math.max(1, Math.ceil(Math.hypot(a[0] - o[0], a[2] - o[2]) / t));
    for (let c = 0; c < l; c++) {
      let h = c / l,
        f = h * h,
        u = f * h;
      e.push(
        [0, 1, 2].map(
          (d) =>
            0.5 *
            (2 * o[d] +
              (-n[d] + a[d]) * h +
              (2 * n[d] - 5 * o[d] + 4 * a[d] - r[d]) * f +
              (-n[d] + 3 * o[d] - 3 * a[d] + r[d]) * u),
        ),
      );
    }
  }
  return (e.push(i[i.length - 1].slice()), e);
}
function Hi(i, t, e = 0.6) {
  if (Zp) return null;
  let s = Qi.grid.get(Math.floor(i / Qi.HC) * 100003 + Math.floor(t / Qi.HC));
  if (!s) return null;
  let n = null;
  for (let [o, a] of s) {
    let r = Qi[o];
    if (a < 0) {
      let x = r.end;
      Math.hypot(i - x[0], t - x[2]) <= r.plaza + e &&
        (!n || n.plaza) &&
        (n = {
          H: r,
          k: -1,
          s: r.len,
          v: 0,
          y: x[1],
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
      d = ((i - l[0]) * h + (t - l[2]) * f) / u;
    if (d < -0.02 || d > 1.02) continue;
    d = Math.min(1, Math.max(0, d));
    let p = Math.sqrt(u),
      m = h / p,
      g = f / p,
      b = (i - l[0]) * -g + (t - l[2]) * m;
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
function u4(i, t) {
  let e = i[0][0] > i[i.length - 1][0] ? i.slice().reverse() : i;
  if (t <= e[0][0]) return e[0][1];
  if (t >= e[e.length - 1][0]) return e[e.length - 1][1];
  for (let s = 0; s + 1 < e.length; s++)
    if (t <= e[s + 1][0]) {
      let n = (t - e[s][0]) / (e[s + 1][0] - e[s][0]);
      return e[s][1] + (e[s + 1][1] - e[s][1]) * n;
    }
  return e[e.length - 1][1];
}
function VB() {
  let i = (e, s) => {
      let n = e[0][0] > e[e.length - 1][0] ? e.slice().reverse() : e,
        o = `fn ${s}(x: f32) -> f32 {
  if (x <= ${n[0][0].toFixed(1)}) { return ${n[0][1].toFixed(1)}; }
`;
      for (let a = 0; a + 1 < n.length; a++)
        o += `  if (x <= ${n[a + 1][0].toFixed(1)}) { return mix(${n[a][1].toFixed(1)}, ${n[a + 1][1].toFixed(1)}, (x - ${n[a][0].toFixed(1)}) / ${(n[a + 1][0] - n[a][0]).toFixed(1)}); }
`;
      return (
        o +
        `  return ${n[n.length - 1][1].toFixed(1)};
}
`
      );
    },
    t = [[Ve.x + 400, Ve.z], ...j0];
  return {
    fns: i(t, "sfShoreW") + i(Jp, "sfShoreM"),
    body: `let sw = select(smoothstep(${(Ve.z + 4).toFixed(1)}, ${(Ve.z - 30).toFixed(1)}, xz.y), smoothstep(sfShoreW(xz.x) + 4.0, sfShoreW(xz.x) - 30.0, xz.y), xz.x < -120.0);
  let east = smoothstep(${(Ve.x - 4).toFixed(1)}, ${(Ve.x + 30).toFixed(1)}, xz.x) * step(-2000.0, xz.y);
  let marin = select(1.0, smoothstep(sfShoreM(xz.x) - 4.0, sfShoreM(xz.x) + 30.0, xz.y), xz.x < -1000.0);
  return min(max(sw, east), marin);`,
  };
}
function Io(i, t, e = !0) {
  if (hc) return hc.ground(i, t);
  let s;
  if (i < -1e3 && t < u4(Jp, i) + 40) {
    let n = u4(Jp, i) - t;
    s = -8 + (18 + f4(i, t, int) + 8) * q0(n / 110);
  } else if (i > 3300 && t < 800) {
    let n = f4(i, t, [[4560, -80, 125, 310, 250]]) - 9,
      o = Math.max(0, Math.abs(i - 4200) - 430),
      a = Math.max(0, Math.abs(t + 1500) - 620),
      r = Math.hypot(o, a);
    s = Math.max(n, 4 - 12 * q0(r / 35), -8);
  } else if (i < 900 && t < -4800)
    s = f4(i, t, [[-485, -6190, 240, 620, 560]]) - 12;
  else {
    let n = Math.min(Math.max(i, ae[0]), ae[mn - 1]),
      o = Math.min(Math.max(t, fe[0]), fe[ws - 1]),
      a = q0(Math.hypot(i - n, t - o) / 160);
    s =
      Yt(n, o) * (1 - a) +
      (LT(i, t) + f4(i, t, nnt) * q0((-1400 - i) / 900)) * a;
    let r =
      i < -120
        ? q0((u4(j0, i) - t) / 45)
        : i > Ve.x
          ? q0((i - Ve.x) / 20)
          : t < Ve.z
            ? q0((Ve.z - t) / 20)
            : 0;
    s = s * (1 - r) - 8 * r;
  }
  if (e) {
    let n = Hi(i, t, 24);
    if (n) {
      let o = n.y - 0.45,
        a = Math.abs(n.v),
        r = a <= n.H.hw + 2 ? 1 : Math.max(0, 1 - (a - n.H.hw - 2) / 22);
      (s > o || o - s < 9) &&
        (s = s + (o - s) * r * (s > o ? 1 : q0(1 - (o - s - 6) / 3)));
    }
  }
  return s;
}
function $B(i, t, e) {
  let s = Ws(Math.floor(i / 90), Math.floor(t / 90), 3),
    n = Ws(Math.floor(i / 23), Math.floor(t / 23), 9);
  return e < 2.5
    ? [0.3, 0.27, 0.22, 1]
    : i < -1e3 && t < u4(Jp, i) + 40
      ? s < 0.35
        ? [0.035, 0.05, 0.025, 1]
        : [0.16 + 0.04 * n, 0.125 + 0.025 * n, 0.06, 1]
      : i > 3300 && t < 800
        ? t < -800
          ? [0.3, 0.3, 0.29, 0]
          : [0.03 + 0.015 * n, 0.05 + 0.015 * n, 0.025, 1]
        : t < -4800
          ? [0.035, 0.055, 0.028, 1]
          : i < -1600
            ? s < 0.72
              ? [0.022 + 0.012 * n, 0.04 + 0.014 * n, 0.022, 1]
              : [0.055, 0.085, 0.032, 1]
            : [0.36, 0.35, 0.33, 0];
}
function Qr(i, t) {
  if (hc) return hc.surfaceAt(i, t);
  if (Zp) return Zp.surfaceAt(i, t);
  if (
    Qi.grid.has(Math.floor(i / Qi.HC) * 100003 + Math.floor(t / Qi.HC)) &&
    Hi(i, t)
  )
    return "road";
  if (i > Ve.x || t < Ve.z) return "sea";
  if (
    i < ae[0] - ls[0].hw - ls[0].sw ||
    t > fe[ws - 1] + Qe[ws - 1].hw + Qe[ws - 1].sw
  )
    return "out";
  let e = g4(i),
    s = b4(t),
    n = Math.abs(i - ae[e]),
    o = Math.abs(t - fe[s]),
    a = ls[e],
    r = Qe[s];
  return n <= a.hw || o <= r.hw
    ? (a.median && n < a.median && o > r.hw) ||
      (r.median && o < r.median && n > a.hw)
      ? "median"
      : "road"
    : n <= a.hw + a.sw || o <= r.hw + r.sw
      ? "walk"
      : "lot";
}
function g4(i) {
  let t = 0,
    e = 1e9;
  for (let s = 0; s < mn; s++) {
    let n = Math.abs(i - ae[s]);
    n < e && ((e = n), (t = s));
  }
  return t;
}
