// app 93 — math
// Lines 75961-76135 of readable/app.pretty.js (statement-aligned).
function uy(
  i,
  {
    poly: t = null,
    ids: e = [],
    names: s = [],
    frac: n = 0.5,
    buildings: o = !0,
    props: a = !0,
    name: r = "",
  } = {},
) {
  let l = sb(i),
    c = sft(t),
    h = i.bld,
    f = new Set(e.map(Number)),
    u = ift(i),
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
    x = 0,
    v = s.length
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
    (!M && v && h.named?.[y] && v.test(h.named[y]) && (M = !0),
      !M &&
        c &&
        o &&
        !(
          u[y * 4 + 2] < d ||
          u[y * 4] > m ||
          u[y * 4 + 3] < p ||
          u[y * 4 + 1] > g
        ) &&
        (M = oft(i, y, c) >= n),
      M && ((l.bSkip[y] = 1), b++));
  }
  if (c && a) {
    let y = i.props,
      M = Array.isArray(a) ? new Set(a) : null,
      S = nft(i);
    for (let w = Math.floor(d / 64); w <= Math.floor(m / 64); w++)
      for (let z = Math.floor(p / 64); z <= Math.floor(g / 64); z++) {
        let _ = S.get(w * 100003 + z);
        if (_)
          for (let R of _) {
            let T = y.pf[R * 5],
              E = y.pf[R * 5 + 1];
            T < d ||
              T > m ||
              E < p ||
              E > g ||
              (M && !M.has(y.kinds[y.pk[R]])) ||
              (en(c, T, E) && ((l.pSkip[R] = 1), x++));
          }
      }
  }
  return (
    l.list.push({ name: r, poly: c, nb: b, np: x }),
    { buildings: b, props: x }
  );
}
function RS(i, t, e, s, n, o = 0) {
  let a = (e * Math.PI) / 180,
    r = Math.cos(a),
    l = Math.sin(a),
    c = s / 2 + o,
    h = n / 2 + o;
  return [
    [-c, -h],
    [c, -h],
    [c, h],
    [-c, h],
  ].map(([f, u]) => [i + r * f - l * u, t + l * f + r * u]);
}
function JR(i, t, e, s, n = 150) {
  let o = [],
    a = {},
    r = {};
  for (let l of i.edges)
    l.name !== t ||
      l.inner ||
      (vs(l, e, s, a),
      !(a.d > n) &&
        (Ot(l, a.s, r),
        o.push({
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
  return o.sort((l, c) => l.d - c.d);
}
function ZR(i, t, e, s, n = null, o = 200) {
  let [a, r] = n || t.fwd(t.gx, t.gz),
    l = JR(i, e, a, r, o)[0];
  if (!l) return null;
  let [c, h] = t.inv(l.x, l.z);
  return { v: s === "x" ? c : h, hw: l.w, sw: l.sw, y: l.y, hit: l };
}
function PS(i, t, e, s, { W: n, E: o, N: a, S: r } = {}, l = 220) {
  let c = [],
    h = (f, u, d, p, m) => {
      if (!p) return;
      if (typeof p == "object") {
        let [b, x] = t.inv(p.at[0], p.at[1]);
        c.push(
          [f, d, m === "x" ? b : x],
          [u[d], "hw", p.hw ?? 0],
          [u[d], "sw", p.sw ?? 0],
        );
        return;
      }
      let g = ZR(i, t, p, m, null, l);
      if (!g) {
        console.warn("landmark block: no", p);
        return;
      }
      c.push([f, d, g.v], [u[d], "hw", g.hw], [u[d], "sw", g.sw]);
    };
  return (
    h(ae, ls, e, n, "x"),
    h(ae, ls, e + 1, o, "x"),
    h(fe, Qe, s, a, "z"),
    h(fe, Qe, s + 1, r, "z"),
    c
  );
}
function dy(i, t) {
  let e = i.map(([s, n, o]) => {
    let a = s[n];
    return ((s[n] = o), [s, n, a]);
  });
  try {
    return t();
  } finally {
    for (let [s, n, o] of e.reverse()) s[n] = o;
  }
}
function CS(i, t, e, s, { inner: n = !0, pad: o = 0 } = {}) {
  let a = dy(t, () => (n ? Ei(e, s) : Ca(e, s)));
  return [
    [a.x0 - o, a.z0 - o],
    [a.x1 + o, a.z0 - o],
    [a.x1 + o, a.z1 + o],
    [a.x0 - o, a.z1 + o],
  ].map(([r, l]) => i.fwd(r, l));
}
f0();
as();
Oa();
