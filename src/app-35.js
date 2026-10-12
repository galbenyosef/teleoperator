// app 35 — cell
// Lines 48794-48805 of readable/app.pretty.js (statement-aligned).
function hct(i) {
  let t = i.w >> 1,
    e = i.h >> 1,
    s = new Uint8Array(t * e),
    n = i.data;
  for (let o = 0; o < e; o++)
    for (let a = 0; a < t; a++) {
      let r = 2 * o * i.w + 2 * a;
      s[o * t + a] = (n[r] + n[r + 1] + n[r + i.w] + n[r + i.w + 1] + 2) >> 2;
    }
  return { data: s, w: t, h: e, x0: i.x0, z0: i.z0, cell: i.cell * 2 };
}
