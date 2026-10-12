// app 160 — math
// Lines 97417-97749 of readable/app.pretty.js (statement-aligned).
function Jj(i, t) {
  if (t.tri) {
    let { tris: e, flat: s, ys: n } = t.tri,
      o = i.v,
      a = [0.3, 0, 0.65, 0.25];
    for (let r = 0; r < n.length; r++)
      i.vert(s[r * 2], n[r], s[r * 2 + 1], 0, 1, 0, s[r * 2], s[r * 2 + 1], a);
    for (let [r, l, c] of e) nk(i, o + r, o + l, o + c);
    return;
  }
  if (t.paint) return ydt(i, t, Vl);
  for (let e of t.polys) {
    let s = e.map((h) => h.pts),
      n = e.map((h) => h.y),
      { tris: o, flat: a } = Vl(s),
      r = [];
    for (let h of n) for (let f = 0; f < h.length; f++) r.push(h[f]);
    let l = i.v,
      c = [0.3, 0, 0.65, 0.25];
    for (let h = 0; h < a.length / 2; h++)
      i.vert(a[h * 2], r[h], a[h * 2 + 1], 0, 1, 0, a[h * 2], a[h * 2 + 1], c);
    for (let [h, f, u] of o) nk(i, l + h, l + f, l + u);
  }
}
var Tb = null,
  Zj = (i, t) => Math.floor(i / 24) * 100003 + Math.floor(t / 24);
function wdt(i) {
  Tb = new Map();
  let t = {};
  for (let e of i.edges)
    if (!(e.name !== "Market Street" || e.inner || e.elev || e.hwy))
      for (let s = 0; s <= e.L; s += 3) {
        Ot(e, s, t);
        let n = Zj(t.x, t.z),
          o = Tb.get(n);
        (o || Tb.set(n, (o = [])), o.push(t.x, t.z, t.w, t.dx, t.dz));
      }
}
function Mdt(i, t) {
  if (!Tb || !Tb.size) return Lj;
  let e = 1e9,
    s = -1,
    n = null;
  for (let r = -1; r <= 1; r++)
    for (let l = -1; l <= 1; l++) {
      let c = Tb.get(Zj(i + r * 24, t + l * 24));
      if (c)
        for (let h = 0; h < c.length; h += 5) {
          let f = Math.hypot(c[h] - i, c[h + 1] - t) - c[h + 2];
          f < e && ((e = f), (s = h), (n = c));
        }
    }
  if (s < 0 || e > 12 || e < -1) return Lj;
  let o = n[s + 3],
    a = n[s + 4];
  return (
    o < 0 && ((o = -o), (a = -a)),
    [0.5 + 0.5 * o, 0.5 + 0.5 * a, Math.max(0, Math.min(1, e / 16)), 0.12]
  );
}
function Sdt(i, t, e, s) {
  let n = t.length / 2,
    o = i.v,
    a = new Float32Array(n * 3);
  for (let [r, l, c] of s) {
    let h = t[r * 2],
      f = t[r * 2 + 1],
      u = t[l * 2] - h,
      d = e[l] - e[r],
      p = t[l * 2 + 1] - f,
      m = t[c * 2] - h,
      g = e[c] - e[r],
      b = t[c * 2 + 1] - f,
      x = d * b - p * g,
      v = p * m - u * b,
      y = u * g - d * m;
    v < 0 && ((x = -x), (v = -v), (y = -y));
    for (let M of [r, l, c])
      ((a[M * 3] += x), (a[M * 3 + 1] += v), (a[M * 3 + 2] += y));
  }
  for (let r = 0; r < n; r++) {
    let l = Math.hypot(a[r * 3], a[r * 3 + 1], a[r * 3 + 2]) || 1;
    i.vert(
      t[r * 2],
      e[r],
      t[r * 2 + 1],
      a[r * 3] / l,
      a[r * 3 + 1] / l,
      a[r * 3 + 2] / l,
      t[r * 2],
      t[r * 2 + 1],
      Mdt(t[r * 2], t[r * 2 + 1]),
    );
  }
  for (let [r, l, c] of s) nk(i, o + r, o + l, o + c);
}
function* kdt(i, t, e, s) {
  let n = (y, M, S) =>
      (t[M] - t[y]) * (e[S] - e[y]) - (e[M] - e[y]) * (t[S] - t[y]),
    o = i.length,
    a = new Int32Array(o * 3);
  i.forEach(([y, M, S], w) => {
    n(y, M, S) > 0
      ? ((a[w * 3] = y), (a[w * 3 + 1] = M), (a[w * 3 + 2] = S))
      : ((a[w * 3] = y), (a[w * 3 + 1] = S), (a[w * 3 + 2] = M));
  });
  let r = (y, M) => (y < M ? y * 1048576 + M : M * 1048576 + y),
    l = new Set();
  {
    let y = 0;
    for (let M of s) {
      let S = M.length;
      for (let w = 0; w < S; w++) l.add(r(y + w, y + ((w + 1) % S)));
      y += S;
    }
  }
  let c = new Map(),
    h = (y, M) => {
      let S = c.get(y) || 0,
        w = S % 4194304;
      w
        ? w !== M + 1 && !(S - w) && c.set(y, S + (M + 1) * 4194304)
        : c.set(y, S + M + 1);
    },
    f = (y, M) => {
      let S = c.get(y);
      if (!S) return;
      let w = S % 4194304,
        z = (S - w) / 4194304;
      w === M + 1 ? c.set(y, z) : z === M + 1 && c.set(y, w);
    },
    u = (y) => {
      let M = a[y * 3],
        S = a[y * 3 + 1],
        w = a[y * 3 + 2];
      (h(r(M, S), y), h(r(S, w), y), h(r(w, M), y));
    },
    d = (y) => {
      let M = a[y * 3],
        S = a[y * 3 + 1],
        w = a[y * 3 + 2];
      (f(r(M, S), y), f(r(S, w), y), f(r(w, M), y));
    };
  for (let y = 0; y < o; y++) u(y);
  let p = (y, M, S, w) => {
      let z = t[y] - t[w],
        _ = e[y] - e[w],
        R = t[M] - t[w],
        T = e[M] - e[w],
        E = t[S] - t[w],
        A = e[S] - e[w];
      return (
        (z * z + _ * _) * (R * A - E * T) -
          (R * R + T * T) * (z * A - E * _) +
          (E * E + A * A) * (z * T - R * _) >
        1e-9
      );
    },
    m = (y, M, S) => {
      for (let w = 0; w < 3; w++) {
        let z = a[y * 3 + w];
        if (z !== M && z !== S) return z;
      }
      return -1;
    },
    g = [...c.keys()],
    b = new Set(g),
    x = o * 30;
  for (yield; g.length && x-- > 0;) {
    (x & 2047) === 0 && (yield);
    let y = g.pop();
    if ((b.delete(y), l.has(y))) continue;
    let M = c.get(y);
    if (!M) continue;
    let S = M % 4194304,
      w = (M - S) / 4194304;
    if (!S || !w) continue;
    let z = S - 1,
      _ = w - 1,
      R = Math.floor(y / 1048576),
      T = y % 1048576,
      E = m(z, R, T),
      A = m(_, R, T);
    if (
      E < 0 ||
      A < 0 ||
      E === A ||
      !p(a[z * 3], a[z * 3 + 1], a[z * 3 + 2], A)
    )
      continue;
    let C = n(E, A, R),
      P = n(E, A, T);
    if (!(C * P >= 0)) {
      (d(z),
        d(_),
        C > 0
          ? ((a[z * 3] = E), (a[z * 3 + 1] = A), (a[z * 3 + 2] = R))
          : ((a[z * 3] = E), (a[z * 3 + 1] = R), (a[z * 3 + 2] = A)),
        P > 0
          ? ((a[_ * 3] = E), (a[_ * 3 + 1] = A), (a[_ * 3 + 2] = T))
          : ((a[_ * 3] = E), (a[_ * 3 + 1] = T), (a[_ * 3 + 2] = A)),
        u(z),
        u(_));
      for (let I of [r(R, E), r(E, T), r(T, A), r(A, R)])
        b.has(I) || (b.add(I), g.push(I));
    }
  }
  let v = new Array(o);
  for (let y = 0; y < o; y++) v[y] = [a[y * 3], a[y * 3 + 1], a[y * 3 + 2]];
  return v;
}
function Qj(i, t, e, s = !1, n = null, o = !1) {
  let a = Tdt(t, e, s);
  return () => {
    let r = a.next();
    if (!r.done) return !1;
    if (r.value) {
      let l = n && (!s || o) ? Edt(t, n, r.value) : r.value;
      (Sdt(i, l.flat, l.ys, l.tris), tj(t, l.flat, l.ys, l.tris));
    }
    return !0;
  };
}
var im = new Map(),
  uu = 256,
  Zd = 0.5,
  _b = uu / Zd;
function _dt(i, t, e) {
  let s = t * 100003 + e,
    n = im.get(s);
  if (n) return (im.delete(s), im.set(s, n), n);
  n = new Uint8Array(_b * _b);
  let o = t * uu,
    a = e * uu,
    r = (h, f = !1, u = 1) => {
      let d = 1e9,
        p = -1e9;
      for (let x of h)
        for (let v = 1; v < x.length; v += 2)
          ((d = Math.min(d, x[v])), (p = Math.max(p, x[v])));
      let m = Math.max(0, Math.floor((d - a) / Zd)),
        g = Math.min(_b - 1, Math.ceil((p - a) / Zd)),
        b = [];
      for (let x = m; x <= g; x++) {
        let v = a + (x + 0.5) * Zd;
        b.length = 0;
        for (let y of h)
          for (let M = 0, S = y.length - 2; M < y.length; S = M, M += 2) {
            let w = y[S + 1],
              z = y[M + 1];
            w > v != z > v &&
              b.push(y[S] + ((y[M] - y[S]) * (v - w)) / (z - w));
          }
        if (f) {
          if (b.length < 2) continue;
          let y = 1e9,
            M = -1e9;
          for (let S of b) (S < y && (y = S), S > M && (M = S));
          ((b.length = 2), (b[0] = y), (b[1] = M));
        } else b.sort((y, M) => y - M);
        for (let y = 0; y + 1 < b.length; y += 2) {
          let M = Math.max(0, Math.ceil((b[y] - o) / Zd - 0.5)),
            S = Math.min(_b - 1, Math.floor((b[y + 1] - o) / Zd - 0.5));
          for (let w = M; w <= S; w++) n[x * _b + w] = u;
        }
      }
    },
    l = new Set(),
    c = new Set();
  for (
    let h = Math.floor((o - 16) / i.HC);
    h <= Math.floor((o + uu + 16) / i.HC);
    h++
  )
    for (
      let f = Math.floor((a - 16) / i.HC);
      f <= Math.floor((a + uu + 16) / i.HC);
      f++
    ) {
      let u = i.hk(h, f);
      for (let d of i.EH.get(u) || []) {
        let p = Math.floor(d / 65536),
          m = d % 65536,
          g = i.edges[p],
          b = g.layered || g.tunnel ? g.maskS : null;
        if (
          g.inner ||
          ((g.layered || g.tunnel) && !b) ||
          l.has(d) ||
          (l.add(d), m + 1 >= g.n)
        )
          continue;
        let x = Math.max(g.S[m], g.s0, b ? b[0] : -1),
          v = Math.min(g.S[m + 1], g.s1, b ? b[1] : 1e9);
        if (v - x < 0.05) continue;
        let y = {},
          M = {};
        (Ot(g, x, y), Ot(g, v, M));
        let S = y.w - 0.8,
          w = M.w - 0.8;
        S <= 0 ||
          w <= 0 ||
          r(
            [
              [
                y.x + y.nx * S,
                y.z + y.nz * S,
                M.x + M.nx * w,
                M.z + M.nz * w,
                M.x - M.nx * w,
                M.z - M.nz * w,
                y.x - y.nx * S,
                y.z - y.nz * S,
              ],
            ],
            !0,
          );
      }
      for (let d of i.JH.get(u) || [])
        if (!(d.layered || c.has(d))) {
          c.add(d);
          for (let p of d.polys) r(p.map((m) => m.pts));
        }
    }
  return (im.set(s, n), im.size > 48 && im.delete(im.keys().next().value), n);
}
function Qd(i, t, e) {
  let s = Math.floor(t / uu),
    n = Math.floor(e / uu);
  return _dt(i, s, n)[
    Math.floor((e - n * uu) / Zd) * _b + Math.floor((t - s * uu) / Zd)
  ];
}
