// app 287 — math
// Lines 140319-140371 of readable/app.pretty.js (statement-aligned).
function AQ(o = 512) {
  let t = Fa(11),
    e = [Fr(o, 4, t), Fr(o, 8, t), Fr(o, 16, t), Fr(o, 32, t)],
    s = [Fr(o, 64, t), Fr(o, 128, t)],
    n = Fr(o, 12, t),
    i = Fr(o, 24, t);
  return RQ(o, (a) => {
    for (let r = 0; r < o; r++)
      for (let l = 0; l < o; l++) {
        let c = (r * o + l) * 4,
          h = MM(e, l, r),
          f = MM(s, l, r),
          u = 78 + (h - 0.5) * 34 + (f - 0.5) * 38,
          d = t();
        d < 0.06 ? (u += 32 * t()) : d < 0.12 && (u -= 22 * t());
        let p = Math.abs(n(l, r) - 0.5) + Math.abs(i(l, r) - 0.5) * 0.35,
          m = p < 0.012 ? 1 : 0,
          g = p < 0.03 && h > 0.52 ? 1 : 0;
        (g && (u *= 0.62),
          m && (u *= 0.55),
          (a[c] = u),
          (a[c + 1] = u),
          (a[c + 2] = 255 * Math.min(1, 0.25 + 0.4 * f + 0.7 * g)),
          (a[c + 3] = 255));
      }
  });
}
function WF(o = 512, t = 21) {
  let e = Fa(t),
    s = [Fr(o, 4, e), Fr(o, 8, e), Fr(o, 16, e), Fr(o, 48, e), Fr(o, 128, e)],
    n = [Fr(o, 6, e), Fr(o, 20, e)],
    i = [Fr(o, 5, e), Fr(o, 11, e)];
  return RQ(
    o,
    (a) => {
      for (let r = 0; r < o; r++)
        for (let l = 0; l < o; l++) {
          let c = (r * o + l) * 4;
          ((a[c] = 255 * (0.35 + 0.45 * MM(s, l, r) + 0.08 * (e() - 0.5))),
            (a[c + 1] = 255 * MM(n, l, r)),
            (a[c + 2] = 255 * MM(i, l, r)),
            (a[c + 3] = 255));
        }
    },
    !1,
  );
}
Pn();
es();
Ya();
await _0();
await No();
await _0();
