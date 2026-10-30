// app 92 — math
// Lines 76195-76370 of readable/app.pretty.js (statement-aligned).
function Dm(
  o,
  {
    poly: t = null,
    ids: e = [],
    names: s = [],
    frac: n = 0.5,
    buildings: i = !0,
    props: a = !0,
    name: r = "",
  } = {},
) {
  let l = Du(o),
    c = Spt(t),
    h = o.bld,
    f = new Set(e.map(Number)),
    u = zpt(o),
    d = 1e9,
    p = 1e9,
    m = -1e9,
    g = -1e9;
  if (c)
    for (let y = 0; y < c.length; y += 2)
      ((d = Math.min(d, c[y])),
        (m = Math.max(m, c[y])),
        (p = Math.min(p, c[y + 1])),
        (g = Math.max(g, c[y + 1])));
  let b = 0,
    v = 0,
    x = s.length
      ? new RegExp(
          "^(" +
            s.map((y) => y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") +
            ")$",
          "i",
        )
      : null;
  for (let y = 0; y < h.n; y++) {
    if (l.bSkip[y]) continue;
    let M = f.size && f.has(Number(h.seed[y]));
    (!M && x && h.named?.[y] && x.test(h.named[y]) && (M = !0),
      !M &&
        c &&
        i &&
        !(
          u[y * 4 + 2] < d ||
          u[y * 4] > m ||
          u[y * 4 + 3] < p ||
          u[y * 4 + 1] > g
        ) &&
        (M = _pt(o, y, c) >= n),
      M && ((l.bSkip[y] = 1), b++));
  }
  if (c && a) {
    let y = o.props,
      M = Array.isArray(a) ? new Set(a) : null,
      S = kpt(o);
    for (let w = Math.floor(d / 64); w <= Math.floor(m / 64); w++)
      for (let _ = Math.floor(p / 64); _ <= Math.floor(g / 64); _++) {
        let z = S.get(w * 100003 + _);
        if (z)
          for (let A of z) {
            let T = y.pf[A * 5],
              E = y.pf[A * 5 + 1];
            T < d ||
              T > m ||
              E < p ||
              E > g ||
              (M && !M.has(y.kinds[y.pk[A]])) ||
              (rn(c, T, E) && ((l.pSkip[A] = 1), v++));
          }
      }
  }
  return (
    l.list.push({ name: r, poly: c, nb: b, np: v }),
    { buildings: b, props: v }
  );
}
function Pk(o, t, e, s, n, i = 0) {
  let a = (e * Math.PI) / 180,
    r = Math.cos(a),
    l = Math.sin(a),
    c = s / 2 + i,
    h = n / 2 + i;
  return [
    [-c, -h],
    [c, -h],
    [c, h],
    [-c, h],
  ].map(([f, u]) => [o + r * f - l * u, t + l * f + r * u]);
}
function EP(o, t, e, s, n = 150) {
  let i = [],
    a = {},
    r = {};
  for (let l of o.edges)
    l.name !== t ||
      l.inner ||
      (ys(l, e, s, a),
      !(a.d > n) &&
        (Ot(l, a.s, r),
        i.push({
          E: l,
          s: a.s,
          d: a.d,
          x: r.x,
          z: r.z,
          y: r.y,
          w: r.w,
          dx: r.dx,
          dz: r.dz,
          nx: r.nx,
          nz: r.nz,
          sw: l.sw,
        })));
  return i.sort((l, c) => l.d - c.d);
}
function TP(o, t, e, s, n = null, i = 200) {
  let [a, r] = n || t.fwd(t.gx, t.gz),
    l = EP(o, e, a, r, i)[0];
  if (!l) return null;
  let [c, h] = t.inv(l.x, l.z);
  return { v: s === "x" ? c : h, hw: l.w, sw: l.sw, y: l.y, hit: l };
}
function Ck(o, t, e, s, { W: n, E: i, N: a, S: r } = {}, l = 220) {
  let c = [],
    h = (f, u, d, p, m) => {
      if (!p) return;
      if (typeof p == "object") {
        let [b, v] = t.inv(p.at[0], p.at[1]);
        c.push(
          [f, d, m === "x" ? b : v],
          [u[d], "hw", p.hw ?? 0],
          [u[d], "sw", p.sw ?? 0],
        );
        return;
      }
      let g = TP(o, t, p, m, null, l);
      if (!g) {
        console.warn("landmark block: no", p);
        return;
      }
      c.push([f, d, g.v], [u[d], "hw", g.hw], [u[d], "sw", g.sw]);
    };
  return (
    h(he, ps, e, n, "x"),
    h(he, ps, e + 1, i, "x"),
    h(pe, ns, s, a, "z"),
    h(pe, ns, s + 1, r, "z"),
    c
  );
}
function rw(o, t) {
  let e = o.map(([s, n, i]) => {
    let a = s[n];
    return ((s[n] = i), [s, n, a]);
  });
  try {
    return t();
  } finally {
    for (let [s, n, i] of e.reverse()) s[n] = i;
  }
}
function Lk(o, t, e, s, { inner: n = !0, pad: i = 0 } = {}) {
  let a = rw(t, () => (n ? Hi(e, s) : Wa(e, s)));
  return [
    [a.x0 - i, a.z0 - i],
    [a.x1 + i, a.z0 - i],
    [a.x1 + i, a.z1 + i],
    [a.x0 - i, a.z1 + i],
  ].map(([r, l]) => o.fwd(r, l));
}
await _0();
es();
Ya();
await No();
