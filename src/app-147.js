// app 147 — math
// Lines 93861-94199 of readable/app.pretty.js (statement-aligned).
function f$(o, t = omt(o.terrain)) {
  let e = {};
  try {
    nmt(o, e, t);
  } catch (s) {
    console.error("highways: presidio", s);
  }
  try {
    tmt(o, e);
  } catch (s) {
    console.error("highways: golden gate", s);
  }
  try {
    smt(o, e);
  } catch (s) {
    console.error("highways: bay bridge", s);
  }
  return ((o.highways = e), e);
}
function lx(o, t, e) {
  {
    let s = Ew.s(o, t),
      n = Math.abs(Ew.v(o, t));
    s > 900 &&
      s < 3200 &&
      (e = Math.min(
        e,
        Ew.deck(Math.min(s, 2450)) -
          7 +
          Math.max(0, n - 45) * 0.38 +
          Math.max(0, s - 2500) * 0.38,
      ));
    let i = lx.gg;
    if (i?.C) {
      let a = Math.hypot(o - i.C[0], t - i.C[1]);
      e = Math.min(e, i.YP - 5 + Math.max(0, a - 50) * 0.38);
    }
  }
  {
    let s = to.s(o, t),
      n = Math.abs(to.v(o, t));
    s > 2e3 &&
      s < to.portal + 32 &&
      n < 200 &&
      (e = Math.min(
        e,
        to.lower(Math.min(s, to.portal)) - 9 + Math.max(0, n - 30) * 1.1,
      ));
  }
  return e;
}
function yC(o, t = 48) {
  let { C: e, R: s } = o.gg,
    n = [];
  if (!e) return n;
  for (let i = 0; i < t; i++) {
    let a = (i / t) * Math.PI * 2,
      r = ((i + 1) / t) * Math.PI * 2,
      l = (p, m) => [e[0] + Math.cos(p) * m, e[1] + Math.sin(p) * m],
      c = l(a, s + 0.4),
      h = l(r, s + 0.4),
      f = (c[0] + h[0]) / 2,
      u = (c[1] + h[1]) / 2,
      d = [o.gg.nb, o.gg.sb].some((p) => {
        let m = ys(p, f, u, {});
        return m.d < m.w + 0.9;
      });
    n.push({ q0: l(a, s), q1: l(r, s), p0: c, p1: h, open: d });
  }
  return n;
}
function u$(o, t = []) {
  let e = o.highways;
  if (!e?.gg) return t;
  for (let { p0: s, p1: n, open: i } of yC(e)) {
    if (i) continue;
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
var Kk = [-7228, -1298],
  amt = new Set([
    420287682, 420287677, 25814380, 1387340262, 1387340263, 1387340264,
    1387340265, 1387340266, 1387340267, 1387340268, 1387340269, 1386780446,
    1386780447, 1386780448, 1387335715, 1387335716,
  ]);
function wC(o) {
  if (o._plazaB) return o._plazaB;
  let t = o.bld,
    e = [];
  for (let s = 0; s < t.n; s++) {
    let n = t.bRing[s],
      i = t.rStart[n],
      a = t.rStart[n + 1],
      r = 0,
      l = 0;
    for (let h = i; h < a; h++) ((r += t.pts[h * 2]), (l += t.pts[h * 2 + 1]));
    if (
      ((r /= a - i),
      (l /= a - i),
      Math.hypot(r - Kk[0], l - Kk[1]) > 170 ||
        amt.has(Number(t.seed[s])) ||
        t.bF[s * 3 + 1] - t.bF[s * 3] < 1.5)
    )
      continue;
    let c = [];
    for (let h = i; h < a; h++) c.push([t.pts[h * 2], t.pts[h * 2 + 1]]);
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
  return (o._plazaB = e);
}
function d$(o) {
  let t = Du(o);
  if (t.highways) return;
  t.highways = !0;
  let e = o.highways;
  if (!e) return;
  (Kq(o, t), Dm(o, { name: "fort point", ids: [44036288, 1358282761] }));
  {
    let v = Du(o);
    for (let x of wC(o)) v.bSkip[x.i] = 1;
  }
  Dm(o, {
    name: "gg toll plaza",
    ids: [
      25814380, 1387340263, 1387340264, 1387340265, 1387340266, 1386780446,
      1386780447, 1386780448, 1387335715, 1387335716,
    ],
  });
  let s = o.bld,
    n = new Set(),
    i = {},
    a = new Float32Array(s.n * 4),
    r = new Map(),
    l = 64,
    c = (v, x) => Math.floor(v / l) * 65536 + Math.floor(x / l);
  for (let v = 0; v < s.n; v++) {
    let x = 1e9,
      y = 1e9,
      M = -1e9,
      S = -1e9,
      w = s.bRing[v];
    for (let _ = s.rStart[w]; _ < s.rStart[w + 1]; _++) {
      let z = s.pts[_ * 2],
        A = s.pts[_ * 2 + 1];
      ((x = Math.min(x, z)),
        (M = Math.max(M, z)),
        (y = Math.min(y, A)),
        (S = Math.max(S, A)));
    }
    a.set([x, y, M, S], v * 4);
    for (let _ = Math.floor(x / l); _ <= Math.floor(M / l); _++)
      for (let z = Math.floor(y / l); z <= Math.floor(S / l); z++) {
        let A = _ * 65536 + z,
          T = r.get(A);
        (T || r.set(A, (T = [])), T.push(v));
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
  for (let v of h)
    for (let x = 0; x < v.L; x += 4) {
      let y = Ot(v, x, i);
      if (!(y.x < -7700 || y.x > 900 || y.z < -1900))
        for (let M = -y.w - 1; M <= y.w + 1; M += 2.5) {
          let S = y.x + y.nx * M,
            w = y.z + y.nz * M;
          for (let _ of r.get(c(S, w)) || [])
            S < a[_ * 4] ||
              S > a[_ * 4 + 2] ||
              w < a[_ * 4 + 1] ||
              w > a[_ * 4 + 3] ||
              n.has(_) ||
              (s.bF[_ * 3 + 1] > y.y - 2 &&
                rn(
                  s.pts.subarray(
                    s.rStart[s.bRing[_]] * 2,
                    s.rStart[s.bRing[_] + 1] * 2,
                  ),
                  S,
                  w,
                ) &&
                n.add(_));
        }
    }
  for (let v of n) t.bSkip[v] = 1;
  let f = o.props,
    u = new Map(),
    d = 0;
  for (let v = 0; v < f.n; v++) {
    let x = c(f.pf[v * 5], f.pf[v * 5 + 1]),
      y = u.get(x);
    (y || u.set(x, (y = [])), y.push(v));
  }
  let p = (v, x) => {
      let y = [];
      for (let M = -1; M <= 1; M++)
        for (let S = -1; S <= 1; S++)
          for (let w of u.get(c(v + M * l, x + S * l)) || []) y.push(w);
      return y;
    },
    m = o.terrain,
    g = (v, x) => {
      let y = Math.round((v - m.x0) / m.step),
        M = Math.round((x - m.z0) / m.step);
      return m.h[
        Math.min(m.nz - 1, Math.max(0, M)) * m.nx +
          Math.min(m.nx - 1, Math.max(0, y))
      ];
    };
  for (let v of e.presidioChain || [])
    for (let x = 0; x < v.L; x += 8) {
      let y = Ot(v, x, i);
      for (let M of p(y.x, y.z)) {
        let S = o.props.pf[M * 5] - y.x,
          w = o.props.pf[M * 5 + 1] - y.z;
        Math.hypot(S, w) < v.W[0] + 50 &&
          o.props.pf[M * 5 + 2] - g(o.props.pf[M * 5], o.props.pf[M * 5 + 1]) >
            0.6 &&
          (t.pSkip[M] = 1);
      }
    }
  let b = o.edges.filter((v) => v.hwy && !v.synthetic && v.P[0] < -4400);
  for (let v of h.concat(b))
    for (let x = 0; x < v.L; x += 3) {
      let y = Ot(v, x, i);
      for (let M = -1; M <= 1; M++)
        for (let S = -1; S <= 1; S++)
          for (let w of u.get(c(y.x + M * l, y.z + S * l)) || []) {
            if (t.pSkip[w]) continue;
            let _ = f.pf[w * 5] - y.x,
              z = f.pf[w * 5 + 1] - y.z;
            Math.abs(_ * y.dx + z * y.dz) < 2 &&
              Math.abs(_ * y.nx + z * y.nz) < y.w + 1.5 &&
              Math.abs(f.pf[w * 5 + 2] - y.y) < 4 &&
              ((t.pSkip[w] = 1), d++);
          }
    }
  t.list.push({ name: "under the decks", nb: n.size, np: d });
}
await No();
var rmt = new Set([
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
  p$ = 0.15;
var lmt = On("local") ? (o, t) => o < -7611 || t < -2600 : () => !1;
function m$(o) {
  let t = o.terrain,
    e = {},
    s = [],
    n = (i, a) =>
      i >= t.x0 &&
      a >= t.z0 &&
      i <= t.x0 + (t.nx - 1) * t.step &&
      a <= t.z0 + (t.nz - 1) * t.step;
  for (let i of o.edges) {
    if (
      !i.elev ||
      i.inner ||
      i.hwy ||
      i.custom ||
      i.tunnel ||
      i.region ||
      !rmt.has(i.cls) ||
      i.L > 60 ||
      i.ja < 0 ||
      i.jb < 0
    )
      continue;
    let a = -1e9,
      r = !0;
    for (let c = 0; c <= i.L; c += 1) {
      if ((Ot(i, c, e), !n(e.x, e.z))) {
        r = !1;
        break;
      }
      a = Math.max(a, e.y - b$(t, e.x, e.z));
    }
    if (!r || a > 0.6) continue;
    let l = (c) =>
      o.juns[c].legs ? o.juns[c].legs.some(([h]) => h !== i && !h.elev) : !0;
    !l(i.ja) || !l(i.jb) || s.push(i);
  }
  for (let i of s) {
    ((i.elev = !1),
      (i.layered = !1),
      (i.layer = 0),
      (i.flags &= -65),
      (i.groundBridge = !0));
    let a = o.juns[i.ja].y,
      r = o.juns[i.jb].y,
      l = i.P;
    for (let c = 0; c < i.n; c++)
      l[c * 3 + 2] = a + (r - a) * (i.S[c] / (i.L || 1));
  }
  for (let i of o.juns)
    ((i.elev = i.legs.length > 0 && i.legs.every(([a]) => a.elev)),
      (i.layered = i.legs.length > 0 && i.legs.every(([a]) => a.layered)));
  return s;
}
