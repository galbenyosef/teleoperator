// app 34 — cell
// Lines 48935-48946 of readable/app.pretty.js (statement-aligned).
function Aut(o) {
  let t = o.w >> 1,
    e = o.h >> 1,
    s = new Uint8Array(t * e),
    n = o.data;
  for (let i = 0; i < e; i++)
    for (let a = 0; a < t; a++) {
      let r = 2 * i * o.w + 2 * a;
      s[i * t + a] = (n[r] + n[r + 1] + n[r + o.w] + n[r + o.w + 1] + 2) >> 2;
    }
  return { data: s, w: t, h: e, x0: o.x0, z0: o.z0, cell: o.cell * 2 };
}
