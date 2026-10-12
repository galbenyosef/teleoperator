// app 135 — cut
// Lines 89284-89298 of readable/app.pretty.js (statement-aligned).
function _y(i, t, e, s, n, o, a, r = !0) {
  let l = t.length;
  [...t].forEach((c, h) => {
    for (let f of cut[c] || [])
      for (let u = 0; u + 1 < f.length; u++) {
        let [d, p] = f[u],
          [m, g] = f[u + 1],
          b = r ? -2 * s : (h - l / 2) * (4 * s + n),
          x = r
            ? (l - 1 - h) * (6 * s + n) - (l * (6 * s + n) - n) / 2
            : -3 * s;
        Ae(i, e(b + d * s, x + p * s), e(b + m * s, x + g * s), o, a, 4);
      }
  });
}
