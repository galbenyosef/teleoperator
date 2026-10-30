// app 120 — math
// Lines 85282-85303 of readable/app.pretty.js (statement-aligned).
function xf(o, t, e = () => !1) {
  if (o.real) return;
  let s = [
    [t.x0 + 4, t.z0 + 0.6, t.x1 - 4, t.z0 + 0.6, 0, -1],
    [t.x0 + 4, t.z1 - 0.6, t.x1 - 4, t.z1 - 0.6, 0, 1],
    [t.x0 + 0.6, t.z0 + 4, t.x0 + 0.6, t.z1 - 4, -1, 0],
    [t.x1 - 0.6, t.z0 + 4, t.x1 - 0.6, t.z1 - 4, 1, 0],
  ];
  for (let [n, i, a, r, l, c] of s) {
    let h = Math.hypot(a - n, r - i),
      f = Math.atan2(l, c);
    for (let u = 8; u < h - 2; u += 30) {
      let d = u / h,
        p = n + (a - n) * d,
        m = i + (r - i) * d;
      e(p, m) ||
        (o.inst.push({ kind: "lamp", x: p, y: $t(p, m) + Ze, z: m, rot: f }),
        o.colliders.push({ t: "circ", x: p, z: m, r: 0.18 }));
    }
  }
}
Pn();
