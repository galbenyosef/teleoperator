// app 83 — math
// Lines 72409-72498 of readable/app.pretty.js (statement-aligned).
function tw(o) {
  let e = 0;
  return (s, n, i, a, r = 0.6) => {
    let l = o?.grid;
    if (!l) return;
    e = (e + 1) & 1073741823;
    let c = Math.floor((s - r) / 24),
      h = Math.floor((s + r) / 24),
      f = Math.floor((n - r) / 24),
      u = Math.floor((n + r) / 24);
    for (let d = c; d <= h; d++)
      for (let p = f; p <= u; p++) {
        let m = l.get((d * 73856093) ^ (p * 19349663));
        if (m) {
          for (let g of m)
            if (
              g._ns !== e &&
              ((g._ns = e),
              !(g.dead || g.traffic || g.wall || g.broken) &&
                !(g.y1 !== void 0 && (i > g.y1 + 0.3 || i + 1.7 < g.y0)))
            ) {
              if (r > 1) {
                let b =
                  g.t === "poly"
                    ? g.bb
                    : g.t === "circ"
                      ? null
                      : g.t === "box"
                        ? [g.x0, g.z0, g.x1, g.z1]
                        : null;
                if (
                  b
                    ? s < b[0] - r ||
                      s > b[2] + r ||
                      n < b[1] - r ||
                      n > b[3] + r
                    : Math.abs(g.x - s) >
                        r + (g.r || Math.hypot(g.hx, g.hz) || 0) ||
                      Math.abs(g.z - n) >
                        r + (g.r || Math.hypot(g.hx, g.hz) || 0)
                )
                  continue;
              }
              a(g);
            }
        }
      }
  };
}
function ZW(o, t = 8) {
  let e = new Map(),
    s = (i, a) => i * 100003 + a,
    n = 0;
  for (let i of o) {
    let a =
      i.t === "box"
        ? [i.x0, i.z0, i.x1, i.z1]
        : i.t === "circ"
          ? [i.x - i.r, i.z - i.r, i.x + i.r, i.z + i.r]
          : i.t === "poly"
            ? i.bb
            : [
                i.x - Math.hypot(i.hx, i.hz),
                i.z - Math.hypot(i.hx, i.hz),
                i.x + Math.hypot(i.hx, i.hz),
                i.z + Math.hypot(i.hx, i.hz),
              ];
    for (let r = Math.floor(a[0] / t); r <= Math.floor(a[2] / t); r++)
      for (let l = Math.floor(a[1] / t); l <= Math.floor(a[3] / t); l++) {
        let c = s(r, l),
          h = e.get(c);
        (h || e.set(c, (h = [])), h.push(i));
      }
  }
  return (i, a, r, l, c = 0.6) => {
    n = (n + 1) & 1073741823;
    for (let h = Math.floor((i - c) / t); h <= Math.floor((i + c) / t); h++)
      for (let f = Math.floor((a - c) / t); f <= Math.floor((a + c) / t); f++)
        for (let u of e.get(s(h, f)) || [])
          u._ls !== n &&
            ((u._ls = n),
            !u.dead &&
              ((u.y1 !== void 0 && (r > u.y1 + 0.3 || r + 1.7 < u.y0)) ||
                l(u)));
  };
}
var apt = 35,
  QW = 150,
  rpt = 320,
  wP = 40;
