// app 288 — math
// Lines 140043-140094 of readable/app.pretty.js (statement-aligned).
function EJ(i = 512) {
  let t = ka(11),
    e = [vr(i, 4, t), vr(i, 8, t), vr(i, 16, t), vr(i, 32, t)],
    s = [vr(i, 64, t), vr(i, 128, t)],
    n = vr(i, 12, t),
    o = vr(i, 24, t);
  return zJ(i, (a) => {
    for (let r = 0; r < i; r++)
      for (let l = 0; l < i; l++) {
        let c = (r * i + l) * 4,
          h = Ew(e, l, r),
          f = Ew(s, l, r),
          u = 78 + (h - 0.5) * 34 + (f - 0.5) * 38,
          d = t();
        d < 0.06 ? (u += 32 * t()) : d < 0.12 && (u -= 22 * t());
        let p = Math.abs(n(l, r) - 0.5) + Math.abs(o(l, r) - 0.5) * 0.35,
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
function pI(i = 512, t = 21) {
  let e = ka(t),
    s = [vr(i, 4, e), vr(i, 8, e), vr(i, 16, e), vr(i, 48, e), vr(i, 128, e)],
    n = [vr(i, 6, e), vr(i, 20, e)],
    o = [vr(i, 5, e), vr(i, 11, e)];
  return zJ(
    i,
    (a) => {
      for (let r = 0; r < i; r++)
        for (let l = 0; l < i; l++) {
          let c = (r * i + l) * 4;
          ((a[c] = 255 * (0.35 + 0.45 * Ew(s, l, r) + 0.08 * (e() - 0.5))),
            (a[c + 1] = 255 * Ew(n, l, r)),
            (a[c + 2] = 255 * Ew(o, l, r)),
            (a[c + 3] = 255));
        }
    },
    !1,
  );
}
En();
as();
Oa();
f0();
f0();
