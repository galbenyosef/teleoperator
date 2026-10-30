// app 320 — math
// Lines 153050-153158 of readable/app.pretty.js (statement-aligned).
var sE = (o, t, e) => Math.min(e, Math.max(t, o)),
  jwt = { road: 1, walk: 1.7, park: 2.6, sand: 2.4, lot: 1.4 },
  nE = class {
    constructor() {
      ((this.t = 0),
        (this.k = 0),
        (this.amp = 0),
        (this.on = !0),
        (this.last = { p: 0, r: 0, y: 0 }));
    }
    level(t, e = "road", s = 0) {
      let n = t * 3.6,
        i = Math.pow(sE((n - 90) / 190, 0, 1), 1.4),
        a = jwt[e] ?? 1,
        r = a > 1.2 ? sE(n / 70, 0, 1) * (a - 1) * 0.35 : 0;
      return sE(i * a + r + sE(Math.abs(s) / 2.5, 0, 0.6), 0, 1.6);
    }
    apply(t, e, s, n = "road", i = !1) {
      this.t += e;
      let a = Math.hypot(s?.vel?.x ?? 0, s?.vel?.z ?? 0),
        r = this.on ? this.level(a, n, s?.heaveV ?? s?.vel?.y ?? 0) : 0;
      this.k = this.on ? this.k + (r - this.k) * Math.min(1, e / 0.12) : 0;
      let l = this.t,
        c = this.k * (i ? 0.5 : 1);
      if (c < 1e-4) return ((this.last = { p: 0, r: 0, y: 0 }), this.last);
      let h =
          Math.sin(l * 2 * Math.PI * 11.3) +
          0.7 * Math.sin(l * 2 * Math.PI * 17.9 + 1.7) +
          0.45 * Math.sin(l * 2 * Math.PI * 26.6 + 0.4),
        f =
          Math.sin(l * 2 * Math.PI * 13.1 + 2.1) +
          0.6 * Math.sin(l * 2 * Math.PI * 21.4 + 0.9) +
          0.4 * Math.sin(l * 2 * Math.PI * 24.2 + 2.8),
        u =
          Math.sin(l * 2 * Math.PI * 9.7 + 0.3) +
          0.5 * Math.sin(l * 2 * Math.PI * 19.3 + 1.1),
        d = (h / 2.15) * 0.0017 * c,
        p = (f / 2) * 0.0011 * c,
        m = (u / 1.5) * 0.009 * c;
      return (
        t.rotateX(d),
        t.rotateZ(p),
        (t.position.y += m),
        t.updateMatrixWorld?.(),
        (this.last = { p: d, r: p, y: m }),
        this.last
      );
    }
  };
var Ytt = (o, t, e) => Math.min(e, Math.max(t, o)),
  iE = class {
    constructor() {
      ((this.k = 1), (this.n = 0));
    }
    update(t, e, s, n) {
      let i = t.position,
        a = i.x - e.x,
        r = i.y - e.y,
        l = i.z - e.z,
        c = 1;
      if (s.length)
        for (let h = 1; h >= 0.3 - 1e-6; h -= 0.05) {
          let f = e.x + a * h,
            u = e.y + r * h,
            d = e.z + l * h,
            p = !1;
          for (let m of s) {
            let g = m[3] + 0.35;
            if ((f - m[0]) ** 2 + (u - m[1]) ** 2 + (d - m[2]) ** 2 < g * g) {
              p = !0;
              break;
            }
          }
          if (((c = h), !p)) break;
        }
      return (
        (this.k =
          c < this.k
            ? this.k + (c - this.k) * Ytt(n / 0.02, 0, 1)
            : this.k + (c - this.k) * Ytt(n / 0.6, 0, 1)),
        this.k < 0.999 &&
          (i.set(e.x + a * this.k, e.y + r * this.k, e.z + l * this.k),
          t.updateMatrixWorld?.(),
          this.n++),
        this.k
      );
    }
  };
function Jtt(o, t, e, s, n = null, i = 1) {
  let a = o.pts[1][1],
    r = Math.abs(o.pts[2][0]),
    l = o.pts[2][1],
    c = 0,
    h = l * i,
    f = 0;
  if (n) {
    let { x: u, y: d, z: p, w: m } = n,
      g = m * c + d * f - p * h,
      b = m * h + p * c - u * f,
      v = m * f + u * h - d * c,
      x = -u * c - d * h - p * f;
    ((c = g * m + x * -u + b * -p - v * -d),
      (h = b * m + x * -d + v * -u - g * -p),
      (f = v * m + x * -p + g * -d - b * -u));
  }
  return [t + c, e + h, s + f, Math.max(r, a * 0.12) * i];
}
await Pb();
Pn();
