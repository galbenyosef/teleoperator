// app 108 — math
// Lines 81025-81106 of readable/app.pretty.js (statement-aligned).
function Ift() {
  if (xy) return xy;
  let i = f7
      .map((o) => {
        let a = [];
        for (let r = 0; r < o.length; r += 2) a.push([o[r], o[r + 1]]);
        return a;
      })
      .sort((o, a) => a.length - o.length),
    [t, e] = i,
    s = (o, a) => {
      let r = null,
        l = 1e9;
      for (let c = 0; c + 1 < e.length; c++) {
        let [h, f] = e[c],
          [u, d] = e[c + 1],
          p = u - h,
          m = d - f,
          g = p * p + m * m || 1,
          b = Math.max(0, Math.min(1, ((o - h) * p + (a - f) * m) / g)),
          x = h + p * b,
          v = f + m * b,
          y = Math.hypot(o - x, a - v);
        y < l && ((l = y), (r = [x, v]));
      }
      return [r, l];
    };
  xy = [];
  let n = 0;
  for (let o = 0; o + 1 < t.length; o++) {
    let [a, r] = t[o],
      [l, c] = t[o + 1],
      h = Math.hypot(l - a, c - r);
    for (let f = (2 - (n % 2)) % 2; f < h; f += 2) {
      let u = a + ((l - a) * f) / h,
        d = r + ((c - r) * f) / h,
        [p, m] = s(u, d);
      m > 6 &&
        m < 13.5 &&
        u < -2440 &&
        u > -3480 &&
        xy.push([(u + p[0]) / 2, (d + p[1]) / 2]);
    }
    n += h;
  }
  return xy;
}
function XW(i) {
  let t = Ift(),
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
    o = 0;
  for (let a of i)
    if (
      a.kind === "tree" &&
      a.x < -2400 &&
      a.x > -3520 &&
      a.z > 2400 &&
      a.z < 3560 &&
      n(a.x, a.z)
    ) {
      let r = Math.abs(Math.sin(a.x * 12.9898 + a.z * 78.233) * 43758.5453) % 1;
      ((a.sp = "palm"), (a.scale = 1 + 0.25 * r), o++);
    }
  return o;
}
