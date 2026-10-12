// app 121 — math
// Lines 85014-85035 of readable/app.pretty.js (statement-aligned).
function Gh(i, t, e = () => !1) {
  if (i.real) return;
  let s = [
    [t.x0 + 4, t.z0 + 0.6, t.x1 - 4, t.z0 + 0.6, 0, -1],
    [t.x0 + 4, t.z1 - 0.6, t.x1 - 4, t.z1 - 0.6, 0, 1],
    [t.x0 + 0.6, t.z0 + 4, t.x0 + 0.6, t.z1 - 4, -1, 0],
    [t.x1 - 0.6, t.z0 + 4, t.x1 - 0.6, t.z1 - 4, 1, 0],
  ];
  for (let [n, o, a, r, l, c] of s) {
    let h = Math.hypot(a - n, r - o),
      f = Math.atan2(l, c);
    for (let u = 8; u < h - 2; u += 30) {
      let d = u / h,
        p = n + (a - n) * d,
        m = o + (r - o) * d;
      e(p, m) ||
        (i.inst.push({ kind: "lamp", x: p, y: Yt(p, m) + Ke, z: m, rot: f }),
        i.colliders.push({ t: "circ", x: p, z: m, r: 0.18 }));
    }
  }
}
En();
