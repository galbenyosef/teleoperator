// app 124 — math
// Lines 86535-86558 of readable/app.pretty.js (statement-aligned).
Pn();
function Wu(o, t, e, s, n, i, a) {
  let { ox: r, oz: l, tx: c, tz: h, nx: f, nz: u, off: d = 0.09 } = t,
    p = (v, x) => [r + c * v + f * d, x, l + h * v + u * d],
    m = [p(e - n / 2, s), p(e + n / 2, s), p(e + n / 2, i)],
    g = 6,
    b = n;
  for (let v = 1; v <= g; v++) {
    let x = (v / g) * Math.acos(0.5);
    m.push(p(e - n / 2 + Math.cos(x) * b, i + Math.sin(x) * b));
  }
  for (let v = g - 1; v >= 1; v--) {
    let x = (v / g) * Math.acos(0.5);
    m.push(p(e + n / 2 - Math.cos(x) * b, i + Math.sin(x) * b));
  }
  (m.push(p(e - n / 2, i)),
    oe(o, m, a, [f, 0, u], (v) => [(v[0] - r) * c + (v[2] - l) * h, v[1] - s]));
}
var uh = (o, t, e, s) => {
  let n = Math.hypot(e - o, s - t),
    i = (e - o) / n,
    a = (s - t) / n;
  return { ox: o, oz: t, tx: i, tz: a, nx: -a, nz: i, L: n };
};
