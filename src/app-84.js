// app 84 — math
// Lines 72175-72264 of readable/app.pretty.js (statement-aligned).
function oy(i) {
  let e = 0;
  return (s, n, o, a, r = 0.6) => {
    let l = i?.grid;
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
                !(g.y1 !== void 0 && (o > g.y1 + 0.3 || o + 1.7 < g.y0)))
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
function YG(i, t = 8) {
  let e = new Map(),
    s = (o, a) => o * 100003 + a,
    n = 0;
  for (let o of i) {
    let a =
      o.t === "box"
        ? [o.x0, o.z0, o.x1, o.z1]
        : o.t === "circ"
          ? [o.x - o.r, o.z - o.r, o.x + o.r, o.z + o.r]
          : o.t === "poly"
            ? o.bb
            : [
                o.x - Math.hypot(o.hx, o.hz),
                o.z - Math.hypot(o.hx, o.hz),
                o.x + Math.hypot(o.hx, o.hz),
                o.z + Math.hypot(o.hx, o.hz),
              ];
    for (let r = Math.floor(a[0] / t); r <= Math.floor(a[2] / t); r++)
      for (let l = Math.floor(a[1] / t); l <= Math.floor(a[3] / t); l++) {
        let c = s(r, l),
          h = e.get(c);
        (h || e.set(c, (h = [])), h.push(o));
      }
  }
  return (o, a, r, l, c = 0.6) => {
    n = (n + 1) & 1073741823;
    for (let h = Math.floor((o - c) / t); h <= Math.floor((o + c) / t); h++)
      for (let f = Math.floor((a - c) / t); f <= Math.floor((a + c) / t); f++)
        for (let u of e.get(s(h, f)) || [])
          u._ls !== n &&
            ((u._ls = n),
            !u.dead &&
              ((u.y1 !== void 0 && (r > u.y1 + 0.3 || r + 1.7 < u.y0)) ||
                l(u)));
  };
}
var Hht = 35,
  JG = 150,
  Dht = 320,
  jR = 40;
