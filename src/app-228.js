// app 228 — math
// Lines 119194-119236 of readable/app.pretty.js (statement-aligned).
function Jh(i, t, e, s, n, o, a = 0.2, r = null) {
  let l = i.v,
    c = s.length,
    h =
      typeof a == "number"
        ? Math.max(1, Math.round((2 * Math.PI * s[0][0]) / a)) * a
        : a.n,
    f = 0,
    u = [0];
  for (let d = 1; d < c; d++)
    ((f += Math.hypot(s[d][0] - s[d - 1][0], s[d][1] - s[d - 1][1])),
      u.push(f));
  for (let d = 0; d <= n; d++) {
    let p = (Math.PI * 2 * d) / n,
      m = Math.cos(p),
      g = Math.sin(p);
    for (let b = 0; b < c; b++) {
      let [x, v] = s[b],
        y = Math.max(0, b - 1),
        M = Math.min(c - 1, b + 1),
        S = s[M][0] - s[y][0],
        w = s[M][1] - s[y][1],
        z = Math.hypot(S, w) || 1;
      i.vert(
        t + m * x,
        v,
        e + g * x,
        (m * w) / z,
        -S / z,
        (g * w) / z,
        (h * d) / n,
        r ? r(b) : u[b],
        o,
      );
    }
  }
  for (let d = 0; d < n; d++)
    for (let p = 0; p + 1 < c; p++) {
      let m = l + d * c + p,
        g = m + c;
      (i.tri(m, m + 1, g + 1), i.tri(m, g + 1, g));
    }
}
