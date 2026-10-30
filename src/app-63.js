// app 63 — math
// Lines 66602-66656 of readable/app.pretty.js (statement-aligned).
function Tdt(o, t, e, s, n, i, a = ge.shingle) {
  let r = CW(t),
    l = Math.max(0, r.hl - r.hw),
    c = s + Math.min(n, r.hw * 0.75),
    h = (m) => {
      let g = Math.max(
        -l,
        Math.min(l, (m[0] - r.c[0]) * r.d[0] + (m[1] - r.c[1]) * r.d[1]),
      );
      return [r.c[0] + r.d[0] * g, c, r.c[1] + r.d[1] * g];
    },
    f = t.length,
    u = t.map((m, g) => {
      let b = ac(e, t[(g - 1 + f) % f], m),
        v = ac(e, m, t[(g + 1) % f]),
        x = b[0] + v[0],
        y = b[1] + v[1],
        M = Math.hypot(x, y) || 1;
      return [x / M, y / M];
    }),
    d = i ? 0.45 : 0.3,
    p = a;
  for (let m = 0; m < f; m++) {
    let g = t[m],
      b = t[(m + 1) % f];
    if (Math.hypot(b[0] - g[0], b[1] - g[1]) < 0.05) continue;
    let v = [g[0] + u[m][0] * d, s - 0.1, g[1] + u[m][1] * d],
      x = [b[0] + u[(m + 1) % f][0] * d, s - 0.1, b[1] + u[(m + 1) % f][1] * d],
      y = h(g),
      M = h(b),
      S = ac(e, g, b),
      w = [
        (g[0] + b[0]) / 2 + S[0] * 30,
        s + 40,
        (g[1] + b[1]) / 2 + S[1] * 30,
      ];
    Math.hypot(y[0] - M[0], y[2] - M[2]) < 0.05
      ? Y0(o, v, x, y, p, w)
      : Ms(o, v, x, M, y, p, w);
  }
  if (i) {
    let m = h([r.c[0] - r.d[0] * 1e3, r.c[1] - r.d[1] * 1e3]),
      g = h([r.c[0] + r.d[0] * 1e3, r.c[1] + r.d[1] * 1e3]);
    l > 0.3 &&
      rs(
        o,
        [m[0], c + 0.05, m[2]],
        [g[0], c + 0.05, g[2]],
        0.22,
        0.12,
        ge.fascia,
      );
  }
}
var IW = 0.35;
