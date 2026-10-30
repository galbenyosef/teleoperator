// app 134 — foreach
// Lines 89552-89566 of readable/app.pretty.js (statement-aligned).
function vw(o, t, e, s, n, i, a, r = !0) {
  let l = t.length;
  [...t].forEach((c, h) => {
    for (let f of P1t[c] || [])
      for (let u = 0; u + 1 < f.length; u++) {
        let [d, p] = f[u],
          [m, g] = f[u + 1],
          b = r ? -2 * s : (h - l / 2) * (4 * s + n),
          v = r
            ? (l - 1 - h) * (6 * s + n) - (l * (6 * s + n) - n) / 2
            : -3 * s;
        Ce(o, e(b + d * s, v + p * s), e(b + m * s, v + g * s), i, a, 4);
      }
  });
}
