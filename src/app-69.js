// app 69 — math
// Lines 68366-68676 of readable/app.pretty.js (statement-aligned).
var Fm = 0.03,
  bs = {
    head: 0,
    face: 1,
    hand: 2,
    legskin: 3,
    top: 4,
    topacc: 5,
    jacket: 6,
    bottom: 7,
    shoes: 8,
    sole: 9,
    hair: 10,
    hat: 11,
    hatacc: 12,
    bag: 13,
    bagacc: 14,
    glasses: 15,
    cloud: 16,
    phone: 17,
    tights: 18,
    belt: 19,
    lens: 20,
    metal: 21,
    star: 22,
  },
  BW = (o, t) => (o ? Lu[o] * 16 + t : 0),
  Y5 = (o, t, e) => o + 512 + (t + 512) * 1024 + (e + 512) * 1048576,
  rc = class o {
    constructor(t, e, s = null, n = null, i = -1e9, a = 0) {
      ((this.vox = new Map()),
        (this.part = t),
        (this.pivot = e),
        (this.c1 = s ? BW(...s) : 0),
        (this.c2 = n ? BW(...n) : 0),
        (this.low = i),
        (this.L = a),
        (this.face = null),
        (this.occ = null),
        (this.spine = null));
    }
    set(t, e, s, n) {
      return (this.vox.set(Y5(t, e, s), [t, e, s, n]), this);
    }
    has(t, e, s) {
      return this.vox.has(Y5(t, e, s));
    }
    get(t, e, s) {
      return this.vox.get(Y5(t, e, s));
    }
    box(t, e, s, n, i, a, r) {
      for (let l = Math.floor(t); l < e; l++)
        for (let c = Math.floor(s); c < n; c++)
          for (let h = Math.floor(i); h < a; h++) {
            let f = typeof r == "function" ? r(l, c, h) : r;
            f != null && this.set(l, c, h, f);
          }
      return this;
    }
    column(t, e, s, n, i = 2.6) {
      for (let a = t; a < e; a++) {
        let r = s(a);
        if (!r) continue;
        let [l, c, h, f] = r;
        for (let u = Math.floor(l - h - 1); u <= l + h + 1; u++)
          for (let d = Math.floor(c - f - 1); d <= c + f + 1; d++) {
            let p = Math.abs(u + 0.5 - l) / h,
              m = Math.abs(d + 0.5 - c) / f;
            if (Math.pow(p, i) + Math.pow(m, i) > 1) continue;
            let g =
              typeof n == "function"
                ? n(u, a, d, (d + 0.5 - c) / f, (u + 0.5 - l) / h)
                : n;
            g != null && this.set(u, a, d, g);
          }
      }
      return this;
    }
    blob(t, e, s, n, i, a, r, l = 2) {
      for (let c = Math.floor(t - n); c <= t + n; c++)
        for (let h = Math.floor(e - i); h <= e + i; h++)
          for (let f = Math.floor(s - a); f <= s + a; f++)
            if (
              Math.pow(Math.abs(c + 0.5 - t) / n, l) +
                Math.pow(Math.abs(h + 0.5 - e) / i, l) +
                Math.pow(Math.abs(f + 0.5 - s) / a, l) <=
              1
            ) {
              let u = typeof r == "function" ? r(c, h, f) : r;
              u !== null && this.set(c, h, f, u);
            }
      return this;
    }
    coarse(t) {
      let e = new o(
        this.part,
        this.pivot.map((i) => i / t),
        null,
        null,
        this.low / t,
        this.L,
      );
      ((e.c1 = this.c1),
        (e.c2 = this.c2),
        (e.spine = this.spine),
        (e.n = t),
        (e.inflate = this.inflate
          ? [...this.inflate.slice(0, 3), this.inflate[3] * t]
          : null));
      let s = new Map();
      for (let [i, a, r, l] of this.vox.values()) {
        let c = Y5(Math.floor(i / t), Math.floor(a / t), Math.floor(r / t)),
          h = s.get(c);
        (h ||
          s.set(
            c,
            (h = {
              x: Math.floor(i / t),
              y: Math.floor(a / t),
              z: Math.floor(r / t),
              n: 0,
              z2: new Map(),
            }),
          ),
          h.n++,
          h.z2.set(l, (h.z2.get(l) || 0) + 1));
      }
      let n = Math.max(1, Math.round(t * t * t * 0.33));
      for (let i of s.values())
        if (i.n >= n) {
          let a = 0,
            r = -1;
          for (let [l, c] of i.z2) c > r && ((r = c), (a = l));
          e.set(i.x, i.y, i.z, a);
        }
      return (
        this.face &&
          (e.face = {
            x0: this.face.x0 / t,
            x1: this.face.x1 / t,
            y0: this.face.y0 / t,
            y1: this.face.y1 / t,
          }),
        e
      );
    }
  },
  Udt = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ],
  NW = 4,
  fP = 0.45,
  uP = class {
    constructor() {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.j = []),
        (this.w = []),
        (this.ix = []));
    }
    get v() {
      return this.p.length / 3;
    }
  };
function Gdt(o, t, e, s) {
  let n = [...o.vox.values()];
  if (!n.length) return;
  let i = [1e9, 1e9, 1e9],
    a = [-1e9, -1e9, -1e9];
  for (let [h, f, u] of n)
    ((i = [Math.min(i[0], h), Math.min(i[1], f), Math.min(i[2], u)]),
      (a = [Math.max(a[0], h), Math.max(a[1], f), Math.max(a[2], u)]));
  let r = (h, f, u) => o.has(h, f, u) || (o.occ && o.occ.has(h, f, u)),
    l = new Map(),
    c = (h, f, u) => {
      let d = Y5(h, f, u),
        p = l.get(d);
      if (p) return p;
      let m = 0,
        g = 0,
        b = 0;
      for (let x = -1; x <= 0; x++)
        for (let y = -1; y <= 0; y++)
          for (let M = -1; M <= 0; M++)
            r(h + x, f + y, u + M) &&
              ((m -= x + 0.5), (g -= y + 0.5), (b -= M + 0.5));
      let v = Math.hypot(m, g, b);
      return (
        (p = v > 1e-6 ? [m / v, g / v, b / v] : [0, 0, 0]),
        l.set(d, p),
        p
      );
    };
  for (let h = 0; h < 6; h++) {
    let f = Udt[h],
      u = f[0] ? 0 : f[1] ? 1 : 2,
      d = f[u],
      p = (u + 1) % 3,
      m = (u + 2) % 3;
    for (let g = i[u]; g <= a[u]; g++) {
      let b = a[p] - i[p] + 1,
        v = a[m] - i[m] + 1,
        x = new Int32Array(b * v).fill(-1),
        y = [0, 0, 0],
        M = g + (d > 0 ? 1 : 0);
      for (let S = 0; S < b; S++)
        for (let w = 0; w < v; w++) {
          ((y[u] = g), (y[p] = i[p] + S), (y[m] = i[m] + w));
          let _ = o.get(y[0], y[1], y[2]);
          if (!_ || ((y[u] = g + d), r(y[0], y[1], y[2]))) continue;
          let z = _[3];
          z === bs.head && o.face && h === 4 && (z = bs.face);
          let A = _[1] < o.low ? 1 : 0;
          x[S + w * b] = z * 2 + A;
        }
      for (let S = 0; S < v; S++)
        for (let w = 0; w < b;) {
          let _ = x[w + S * b];
          if (_ < 0) {
            w++;
            continue;
          }
          let z = 1;
          for (; w + z < b && z < NW && x[w + z + S * b] === _;) z++;
          let A = 1;
          t: for (; S + A < v && A < NW;) {
            for (let R = 0; R < z; R++)
              if (x[w + R + (S + A) * b] !== _) break t;
            A++;
          }
          for (let R = 0; R < A; R++)
            for (let P = 0; P < z; P++) x[w + P + (S + R) * b] = -1;
          ((y[u] = g), (y[p] = i[p] + w), (y[m] = i[m] + S));
          let T = o.get(y[0], y[1], y[2]),
            E = T[3];
          (E === bs.head && o.face && h === 4 && (E = bs.face),
            Vdt(
              o,
              t,
              e,
              s,
              u,
              p,
              m,
              M,
              i[p] + w,
              i[m] + S,
              z,
              A,
              f,
              E,
              d,
              T[1] < o.low ? 100 : 0,
              c,
            ),
            (w += z));
        }
    }
  }
}
function Vdt(o, t, e, s, n, i, a, r, l, c, h, f, u, d, p, m, g) {
  let b = [
      [l, c],
      [l + h, c],
      [l + h, c + f],
      [l, c + f],
    ],
    v = t.v;
  for (let [x, y] of b) {
    let M = [0, 0, 0];
    ((M[n] = r), (M[i] = x), (M[a] = y));
    let S = M[0] * s,
      w = M[1] * s,
      _ = M[2] * s,
      z = g(M[0], M[1], M[2]);
    if (o.inflate) {
      let L = o.inflate,
        F = S - L[0],
        O = w - L[1],
        B = _ - L[2],
        H = Math.hypot(F, O, B) || 1;
      ((S += (F / H) * L[3]), (w += (O / H) * L[3]), (_ += (B / H) * L[3]));
    }
    let A = u[0] + fP * z[0],
      T = u[1] + fP * z[1],
      E = u[2] + fP * z[2],
      R = Math.hypot(A, T, E) || 1;
    (t.p.push(S, w, _), t.n.push(A / R, T / R, E / R));
    let P, C;
    if (o.face) {
      let L = o.face;
      ((P = (M[0] - L.x0) / (L.x1 - L.x0)),
        (C = (M[1] - L.y0) / (L.y1 - L.y0)));
    } else ((P = 0.5 + S / 1.2), (C = w));
    t.uv.push(d + Math.min(0.998, Math.max(0, P)), C);
    let I = o.spine
      ? Math.round(Math.min(1, Math.max(0, o.spine(w))) * 100)
      : m;
    (t.j.push(o.part, o.c1, o.c2, I + 101 * Math.round(o.L * 100)),
      t.w.push(o.pivot[0] * s, o.pivot[1] * s, o.pivot[2] * s, e));
  }
  p > 0
    ? t.ix.push(v, v + 1, v + 2, v, v + 2, v + 3)
    : t.ix.push(v, v + 2, v + 1, v, v + 3, v + 2);
}
