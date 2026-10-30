// app 107 — math
// Lines 81261-81340 of readable/app.pretty.js (statement-aligned).
function s1t() {
  if (uw) return uw;
  let o = UP.map((i) => {
      let a = [];
      for (let r = 0; r < i.length; r += 2) a.push([i[r], i[r + 1]]);
      return a;
    }).sort((i, a) => a.length - i.length),
    [t, e] = o,
    s = (i, a) => {
      let r = null,
        l = 1e9;
      for (let c = 0; c + 1 < e.length; c++) {
        let [h, f] = e[c],
          [u, d] = e[c + 1],
          p = u - h,
          m = d - f,
          g = p * p + m * m || 1,
          b = Math.max(0, Math.min(1, ((i - h) * p + (a - f) * m) / g)),
          v = h + p * b,
          x = f + m * b,
          y = Math.hypot(i - v, a - x);
        y < l && ((l = y), (r = [v, x]));
      }
      return [r, l];
    };
  uw = [];
  let n = 0;
  for (let i = 0; i + 1 < t.length; i++) {
    let [a, r] = t[i],
      [l, c] = t[i + 1],
      h = Math.hypot(l - a, c - r);
    for (let f = (2 - (n % 2)) % 2; f < h; f += 2) {
      let u = a + ((l - a) * f) / h,
        d = r + ((c - r) * f) / h,
        [p, m] = s(u, d);
      m > 6 &&
        m < 13.5 &&
        u < -2440 &&
        u > -3480 &&
        uw.push([(u + p[0]) / 2, (d + p[1]) / 2]);
    }
    n += h;
  }
  return uw;
}
function Yq(o) {
  let t = s1t(),
    e = new Map(),
    s = (a, r) => Math.floor(a / 16) * 100003 + Math.floor(r / 16);
  for (let [a, r] of t) {
    let l = s(a, r),
      c = e.get(l);
    (c || e.set(l, (c = [])), c.push(a, r));
  }
  let n = (a, r) => {
      for (let l = -1; l <= 1; l++)
        for (let c = -1; c <= 1; c++) {
          let h = e.get(s(a + l * 16, r + c * 16));
          if (h) {
            for (let f = 0; f < h.length; f += 2)
              if (Math.hypot(h[f] - a, h[f + 1] - r) < 2.2) return !0;
          }
        }
      return !1;
    },
    i = 0;
  for (let a of o)
    if (
      a.kind === "tree" &&
      a.x < -2400 &&
      a.x > -3520 &&
      a.z > 2400 &&
      a.z < 3560 &&
      n(a.x, a.z)
    ) {
      let r = Math.abs(Math.sin(a.x * 12.9898 + a.z * 78.233) * 43758.5453) % 1;
      ((a.sp = "palm"), (a.scale = 1 + 0.25 * r), i++);
    }
  return i;
}
