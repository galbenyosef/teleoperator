// app 148 — math
// Lines 93592-93929 of readable/app.pretty.js (statement-aligned).
function cj(i, t = But(i.terrain)) {
  let e = {};
  try {
    Fut(i, e, t);
  } catch (s) {
    console.error("highways: presidio", s);
  }
  try {
    Cut(i, e);
  } catch (s) {
    console.error("highways: golden gate", s);
  }
  try {
    Iut(i, e);
  } catch (s) {
    console.error("highways: bay bridge", s);
  }
  return ((i.highways = e), e);
}
function Mb(i, t, e) {
  {
    let s = Ly.s(i, t),
      n = Math.abs(Ly.v(i, t));
    s > 900 &&
      s < 3200 &&
      (e = Math.min(
        e,
        Ly.deck(Math.min(s, 2450)) -
          7 +
          Math.max(0, n - 45) * 0.38 +
          Math.max(0, s - 2500) * 0.38,
      ));
    let o = Mb.gg;
    if (o?.C) {
      let a = Math.hypot(i - o.C[0], t - o.C[1]);
      e = Math.min(e, o.YP - 5 + Math.max(0, a - 50) * 0.38);
    }
  }
  {
    let s = qi.s(i, t),
      n = Math.abs(qi.v(i, t));
    s > 2e3 &&
      s < qi.portal + 32 &&
      n < 200 &&
      (e = Math.min(
        e,
        qi.lower(Math.min(s, qi.portal)) - 9 + Math.max(0, n - 30) * 1.1,
      ));
  }
  return e;
}
function W7(i, t = 48) {
  let { C: e, R: s } = i.gg,
    n = [];
  if (!e) return n;
  for (let o = 0; o < t; o++) {
    let a = (o / t) * Math.PI * 2,
      r = ((o + 1) / t) * Math.PI * 2,
      l = (p, m) => [e[0] + Math.cos(p) * m, e[1] + Math.sin(p) * m],
      c = l(a, s + 0.4),
      h = l(r, s + 0.4),
      f = (c[0] + h[0]) / 2,
      u = (c[1] + h[1]) / 2,
      d = [i.gg.nb, i.gg.sb].some((p) => {
        let m = vs(p, f, u, {});
        return m.d < m.w + 0.9;
      });
    n.push({ q0: l(a, s), q1: l(r, s), p0: c, p1: h, open: d });
  }
  return n;
}
function hj(i, t = []) {
  let e = i.highways;
  if (!e?.gg) return t;
  for (let { p0: s, p1: n, open: o } of W7(e)) {
    if (o) continue;
    let a = (s[0] + n[0]) / 2,
      r = (s[1] + n[1]) / 2,
      l = Math.hypot(n[0] - s[0], n[1] - s[1]);
    t.push({
      t: "obb",
      x: a,
      z: r,
      hx: 0.3,
      hz: l / 2 + 0.2,
      c: (n[1] - s[1]) / l,
      s: (n[0] - s[0]) / l,
      y0: e.gg.YP - 2,
      y1: e.gg.YP + 1.5,
      rail: !0,
    });
  }
  return t;
}
var KS = [-7228, -1298],
  Out = new Set([
    420287682, 420287677, 25814380, 1387340262, 1387340263, 1387340264,
    1387340265, 1387340266, 1387340267, 1387340268, 1387340269, 1386780446,
    1386780447, 1386780448, 1387335715, 1387335716,
  ]);
function q7(i) {
  if (i._plazaB) return i._plazaB;
  let t = i.bld,
    e = [];
  for (let s = 0; s < t.n; s++) {
    let n = t.bRing[s],
      o = t.rStart[n],
      a = t.rStart[n + 1],
      r = 0,
      l = 0;
    for (let h = o; h < a; h++) ((r += t.pts[h * 2]), (l += t.pts[h * 2 + 1]));
    if (
      ((r /= a - o),
      (l /= a - o),
      Math.hypot(r - KS[0], l - KS[1]) > 170 ||
        Out.has(Number(t.seed[s])) ||
        t.bF[s * 3 + 1] - t.bF[s * 3] < 1.5)
    )
      continue;
    let c = [];
    for (let h = o; h < a; h++) c.push([t.pts[h * 2], t.pts[h * 2 + 1]]);
    e.push({
      i: s,
      ring: c,
      cx: r,
      cz: l,
      base: t.bF[s * 3],
      top: t.bF[s * 3 + 1],
      name: t.named?.[s] || "",
      seed: Number(t.seed[s]),
    });
  }
  return (i._plazaB = e);
}
function fj(i) {
  let t = sb(i);
  if (t.highways) return;
  t.highways = !0;
  let e = i.highways;
  if (!e) return;
  ($W(i, t), uy(i, { name: "fort point", ids: [44036288, 1358282761] }));
  {
    let x = sb(i);
    for (let v of q7(i)) x.bSkip[v.i] = 1;
  }
  uy(i, {
    name: "gg toll plaza",
    ids: [
      25814380, 1387340263, 1387340264, 1387340265, 1387340266, 1386780446,
      1386780447, 1386780448, 1387335715, 1387335716,
    ],
  });
  let s = i.bld,
    n = new Set(),
    o = {},
    a = new Float32Array(s.n * 4),
    r = new Map(),
    l = 64,
    c = (x, v) => Math.floor(x / l) * 65536 + Math.floor(v / l);
  for (let x = 0; x < s.n; x++) {
    let v = 1e9,
      y = 1e9,
      M = -1e9,
      S = -1e9,
      w = s.bRing[x];
    for (let z = s.rStart[w]; z < s.rStart[w + 1]; z++) {
      let _ = s.pts[z * 2],
        R = s.pts[z * 2 + 1];
      ((v = Math.min(v, _)),
        (M = Math.max(M, _)),
        (y = Math.min(y, R)),
        (S = Math.max(S, R)));
    }
    a.set([v, y, M, S], x * 4);
    for (let z = Math.floor(v / l); z <= Math.floor(M / l); z++)
      for (let _ = Math.floor(y / l); _ <= Math.floor(S / l); _++) {
        let R = z * 65536 + _,
          T = r.get(R);
        (T || r.set(R, (T = [])), T.push(x));
      }
  }
  let h = [
    e.gg?.nb,
    e.gg?.sb,
    e.bb?.eb,
    e.bb?.wb,
    e.bb?.e1,
    ...(e.presidio || []),
  ].filter(Boolean);
  for (let x of h)
    for (let v = 0; v < x.L; v += 4) {
      let y = Ot(x, v, o);
      if (!(y.x < -7700 || y.x > 900 || y.z < -1900))
        for (let M = -y.w - 1; M <= y.w + 1; M += 2.5) {
          let S = y.x + y.nx * M,
            w = y.z + y.nz * M;
          for (let z of r.get(c(S, w)) || [])
            S < a[z * 4] ||
              S > a[z * 4 + 2] ||
              w < a[z * 4 + 1] ||
              w > a[z * 4 + 3] ||
              n.has(z) ||
              (s.bF[z * 3 + 1] > y.y - 2 &&
                en(
                  s.pts.subarray(
                    s.rStart[s.bRing[z]] * 2,
                    s.rStart[s.bRing[z] + 1] * 2,
                  ),
                  S,
                  w,
                ) &&
                n.add(z));
        }
    }
  for (let x of n) t.bSkip[x] = 1;
  let f = i.props,
    u = new Map(),
    d = 0;
  for (let x = 0; x < f.n; x++) {
    let v = c(f.pf[x * 5], f.pf[x * 5 + 1]),
      y = u.get(v);
    (y || u.set(v, (y = [])), y.push(x));
  }
  let p = (x, v) => {
      let y = [];
      for (let M = -1; M <= 1; M++)
        for (let S = -1; S <= 1; S++)
          for (let w of u.get(c(x + M * l, v + S * l)) || []) y.push(w);
      return y;
    },
    m = i.terrain,
    g = (x, v) => {
      let y = Math.round((x - m.x0) / m.step),
        M = Math.round((v - m.z0) / m.step);
      return m.h[
        Math.min(m.nz - 1, Math.max(0, M)) * m.nx +
          Math.min(m.nx - 1, Math.max(0, y))
      ];
    };
  for (let x of e.presidioChain || [])
    for (let v = 0; v < x.L; v += 8) {
      let y = Ot(x, v, o);
      for (let M of p(y.x, y.z)) {
        let S = i.props.pf[M * 5] - y.x,
          w = i.props.pf[M * 5 + 1] - y.z;
        Math.hypot(S, w) < x.W[0] + 50 &&
          i.props.pf[M * 5 + 2] - g(i.props.pf[M * 5], i.props.pf[M * 5 + 1]) >
            0.6 &&
          (t.pSkip[M] = 1);
      }
    }
  let b = i.edges.filter((x) => x.hwy && !x.synthetic && x.P[0] < -4400);
  for (let x of h.concat(b))
    for (let v = 0; v < x.L; v += 3) {
      let y = Ot(x, v, o);
      for (let M = -1; M <= 1; M++)
        for (let S = -1; S <= 1; S++)
          for (let w of u.get(c(y.x + M * l, y.z + S * l)) || []) {
            if (t.pSkip[w]) continue;
            let z = f.pf[w * 5] - y.x,
              _ = f.pf[w * 5 + 1] - y.z;
            Math.abs(z * y.dx + _ * y.dz) < 2 &&
              Math.abs(z * y.nx + _ * y.nz) < y.w + 1.5 &&
              Math.abs(f.pf[w * 5 + 2] - y.y) < 4 &&
              ((t.pSkip[w] = 1), d++);
          }
    }
  t.list.push({ name: "under the decks", nb: n.size, np: d });
}
var Hut = new Set([
    "primary",
    "secondary",
    "tertiary",
    "residential",
    "unclassified",
    "living_street",
    "service",
    "trunk",
    "primary_link",
    "secondary_link",
    "tertiary_link",
  ]),
  uj = 0.15;
var Dut = (i, t) => i < -7611 || t < -2600;
function dj(i) {
  let t = i.terrain,
    e = {},
    s = [],
    n = (o, a) =>
      o >= t.x0 &&
      a >= t.z0 &&
      o <= t.x0 + (t.nx - 1) * t.step &&
      a <= t.z0 + (t.nz - 1) * t.step;
  for (let o of i.edges) {
    if (
      !o.elev ||
      o.inner ||
      o.hwy ||
      o.custom ||
      o.tunnel ||
      o.region ||
      !Hut.has(o.cls) ||
      o.L > 60 ||
      o.ja < 0 ||
      o.jb < 0
    )
      continue;
    let a = -1e9,
      r = !0;
    for (let c = 0; c <= o.L; c += 1) {
      if ((Ot(o, c, e), !n(e.x, e.z))) {
        r = !1;
        break;
      }
      a = Math.max(a, e.y - mj(t, e.x, e.z));
    }
    if (!r || a > 0.6) continue;
    let l = (c) =>
      i.juns[c].legs ? i.juns[c].legs.some(([h]) => h !== o && !h.elev) : !0;
    !l(o.ja) || !l(o.jb) || s.push(o);
  }
  for (let o of s) {
    ((o.elev = !1),
      (o.layered = !1),
      (o.layer = 0),
      (o.flags &= -65),
      (o.groundBridge = !0));
    let a = i.juns[o.ja].y,
      r = i.juns[o.jb].y,
      l = o.P;
    for (let c = 0; c < o.n; c++)
      l[c * 3 + 2] = a + (r - a) * (o.S[c] / (o.L || 1));
  }
  for (let o of i.juns)
    ((o.elev = o.legs.length > 0 && o.legs.every(([a]) => a.elev)),
      (o.layered = o.legs.length > 0 && o.legs.every(([a]) => a.layered)));
  return s;
}
