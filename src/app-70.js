// app 70 — math
// Lines 68135-68445 of readable/app.pretty.js (statement-aligned).
var J1 = 0.03,
  us = {
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
  FG = (i, t) => (i ? Zf[i] * 16 + t : 0),
  ey = (i, t, e) => i + 512 + (t + 512) * 1024 + (e + 512) * 1048576,
  Dl = class i {
    constructor(t, e, s = null, n = null, o = -1e9, a = 0) {
      ((this.vox = new Map()),
        (this.part = t),
        (this.pivot = e),
        (this.c1 = s ? FG(...s) : 0),
        (this.c2 = n ? FG(...n) : 0),
        (this.low = o),
        (this.L = a),
        (this.face = null),
        (this.occ = null),
        (this.spine = null));
    }
    set(t, e, s, n) {
      return (this.vox.set(ey(t, e, s), [t, e, s, n]), this);
    }
    has(t, e, s) {
      return this.vox.has(ey(t, e, s));
    }
    get(t, e, s) {
      return this.vox.get(ey(t, e, s));
    }
    box(t, e, s, n, o, a, r) {
      for (let l = Math.floor(t); l < e; l++)
        for (let c = Math.floor(s); c < n; c++)
          for (let h = Math.floor(o); h < a; h++) {
            let f = typeof r == "function" ? r(l, c, h) : r;
            f != null && this.set(l, c, h, f);
          }
      return this;
    }
    column(t, e, s, n, o = 2.6) {
      for (let a = t; a < e; a++) {
        let r = s(a);
        if (!r) continue;
        let [l, c, h, f] = r;
        for (let u = Math.floor(l - h - 1); u <= l + h + 1; u++)
          for (let d = Math.floor(c - f - 1); d <= c + f + 1; d++) {
            let p = Math.abs(u + 0.5 - l) / h,
              m = Math.abs(d + 0.5 - c) / f;
            if (Math.pow(p, o) + Math.pow(m, o) > 1) continue;
            let g =
              typeof n == "function"
                ? n(u, a, d, (d + 0.5 - c) / f, (u + 0.5 - l) / h)
                : n;
            g != null && this.set(u, a, d, g);
          }
      }
      return this;
    }
    blob(t, e, s, n, o, a, r, l = 2) {
      for (let c = Math.floor(t - n); c <= t + n; c++)
        for (let h = Math.floor(e - o); h <= e + o; h++)
          for (let f = Math.floor(s - a); f <= s + a; f++)
            if (
              Math.pow(Math.abs(c + 0.5 - t) / n, l) +
                Math.pow(Math.abs(h + 0.5 - e) / o, l) +
                Math.pow(Math.abs(f + 0.5 - s) / a, l) <=
              1
            ) {
              let u = typeof r == "function" ? r(c, h, f) : r;
              u !== null && this.set(c, h, f, u);
            }
      return this;
    }
    coarse(t) {
      let e = new i(
        this.part,
        this.pivot.map((o) => o / t),
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
      for (let [o, a, r, l] of this.vox.values()) {
        let c = ey(Math.floor(o / t), Math.floor(a / t), Math.floor(r / t)),
          h = s.get(c);
        (h ||
          s.set(
            c,
            (h = {
              x: Math.floor(o / t),
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
      for (let o of s.values())
        if (o.n >= n) {
          let a = 0,
            r = -1;
          for (let [l, c] of o.z2) c > r && ((r = c), (a = l));
          e.set(o.x, o.y, o.z, a);
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
  yht = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ],
  NG = 4,
  FR = 0.45,
  NR = class {
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
function wht(i, t, e, s) {
  let n = [...i.vox.values()];
  if (!n.length) return;
  let o = [1e9, 1e9, 1e9],
    a = [-1e9, -1e9, -1e9];
  for (let [h, f, u] of n)
    ((o = [Math.min(o[0], h), Math.min(o[1], f), Math.min(o[2], u)]),
      (a = [Math.max(a[0], h), Math.max(a[1], f), Math.max(a[2], u)]));
  let r = (h, f, u) => i.has(h, f, u) || (i.occ && i.occ.has(h, f, u)),
    l = new Map(),
    c = (h, f, u) => {
      let d = ey(h, f, u),
        p = l.get(d);
      if (p) return p;
      let m = 0,
        g = 0,
        b = 0;
      for (let v = -1; v <= 0; v++)
        for (let y = -1; y <= 0; y++)
          for (let M = -1; M <= 0; M++)
            r(h + v, f + y, u + M) &&
              ((m -= v + 0.5), (g -= y + 0.5), (b -= M + 0.5));
      let x = Math.hypot(m, g, b);
      return (
        (p = x > 1e-6 ? [m / x, g / x, b / x] : [0, 0, 0]),
        l.set(d, p),
        p
      );
    };
  for (let h = 0; h < 6; h++) {
    let f = yht[h],
      u = f[0] ? 0 : f[1] ? 1 : 2,
      d = f[u],
      p = (u + 1) % 3,
      m = (u + 2) % 3;
    for (let g = o[u]; g <= a[u]; g++) {
      let b = a[p] - o[p] + 1,
        x = a[m] - o[m] + 1,
        v = new Int32Array(b * x).fill(-1),
        y = [0, 0, 0],
        M = g + (d > 0 ? 1 : 0);
      for (let S = 0; S < b; S++)
        for (let w = 0; w < x; w++) {
          ((y[u] = g), (y[p] = o[p] + S), (y[m] = o[m] + w));
          let z = i.get(y[0], y[1], y[2]);
          if (!z || ((y[u] = g + d), r(y[0], y[1], y[2]))) continue;
          let _ = z[3];
          _ === us.head && i.face && h === 4 && (_ = us.face);
          let R = z[1] < i.low ? 1 : 0;
          v[S + w * b] = _ * 2 + R;
        }
      for (let S = 0; S < x; S++)
        for (let w = 0; w < b;) {
          let z = v[w + S * b];
          if (z < 0) {
            w++;
            continue;
          }
          let _ = 1;
          for (; w + _ < b && _ < NG && v[w + _ + S * b] === z;) _++;
          let R = 1;
          t: for (; S + R < x && R < NG;) {
            for (let A = 0; A < _; A++)
              if (v[w + A + (S + R) * b] !== z) break t;
            R++;
          }
          for (let A = 0; A < R; A++)
            for (let C = 0; C < _; C++) v[w + C + (S + A) * b] = -1;
          ((y[u] = g), (y[p] = o[p] + w), (y[m] = o[m] + S));
          let T = i.get(y[0], y[1], y[2]),
            E = T[3];
          (E === us.head && i.face && h === 4 && (E = us.face),
            Mht(
              i,
              t,
              e,
              s,
              u,
              p,
              m,
              M,
              o[p] + w,
              o[m] + S,
              _,
              R,
              f,
              E,
              d,
              T[1] < i.low ? 100 : 0,
              c,
            ),
            (w += _));
        }
    }
  }
}
function Mht(i, t, e, s, n, o, a, r, l, c, h, f, u, d, p, m, g) {
  let b = [
      [l, c],
      [l + h, c],
      [l + h, c + f],
      [l, c + f],
    ],
    x = t.v;
  for (let [v, y] of b) {
    let M = [0, 0, 0];
    ((M[n] = r), (M[o] = v), (M[a] = y));
    let S = M[0] * s,
      w = M[1] * s,
      z = M[2] * s,
      _ = g(M[0], M[1], M[2]);
    if (i.inflate) {
      let L = i.inflate,
        F = S - L[0],
        N = w - L[1],
        B = z - L[2],
        H = Math.hypot(F, N, B) || 1;
      ((S += (F / H) * L[3]), (w += (N / H) * L[3]), (z += (B / H) * L[3]));
    }
    let R = u[0] + FR * _[0],
      T = u[1] + FR * _[1],
      E = u[2] + FR * _[2],
      A = Math.hypot(R, T, E) || 1;
    (t.p.push(S, w, z), t.n.push(R / A, T / A, E / A));
    let C, P;
    if (i.face) {
      let L = i.face;
      ((C = (M[0] - L.x0) / (L.x1 - L.x0)),
        (P = (M[1] - L.y0) / (L.y1 - L.y0)));
    } else ((C = 0.5 + S / 1.2), (P = w));
    t.uv.push(d + Math.min(0.998, Math.max(0, C)), P);
    let I = i.spine
      ? Math.round(Math.min(1, Math.max(0, i.spine(w))) * 100)
      : m;
    (t.j.push(i.part, i.c1, i.c2, I + 101 * Math.round(i.L * 100)),
      t.w.push(i.pivot[0] * s, i.pivot[1] * s, i.pivot[2] * s, e));
  }
  p > 0
    ? t.ix.push(x, x + 1, x + 2, x, x + 2, x + 3)
    : t.ix.push(x, x + 2, x + 1, x, x + 3, x + 2);
}
