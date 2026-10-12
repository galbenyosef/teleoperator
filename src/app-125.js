// app 125 — math
// Lines 86267-86290 of readable/app.pretty.js (statement-aligned).
En();
function lu(i, t, e, s, n, o, a) {
  let { ox: r, oz: l, tx: c, tz: h, nx: f, nz: u, off: d = 0.09 } = t,
    p = (x, v) => [r + c * x + f * d, v, l + h * x + u * d],
    m = [p(e - n / 2, s), p(e + n / 2, s), p(e + n / 2, o)],
    g = 6,
    b = n;
  for (let x = 1; x <= g; x++) {
    let v = (x / g) * Math.acos(0.5);
    m.push(p(e - n / 2 + Math.cos(v) * b, o + Math.sin(v) * b));
  }
  for (let x = g - 1; x >= 1; x--) {
    let v = (x / g) * Math.acos(0.5);
    m.push(p(e + n / 2 - Math.cos(v) * b, o + Math.sin(v) * b));
  }
  (m.push(p(e - n / 2, o)),
    ne(i, m, a, [f, 0, u], (x) => [(x[0] - r) * c + (x[2] - l) * h, x[1] - s]));
}
var Nc = (i, t, e, s) => {
  let n = Math.hypot(e - i, s - t),
    o = (e - i) / n,
    a = (s - t) / n;
  return { ox: i, oz: t, tx: o, tz: a, nx: -a, nz: o, L: n };
};
