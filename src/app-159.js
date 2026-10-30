// app 159 — math
// Lines 97653-97985 of readable/app.pretty.js (statement-aligned).
function tX(o, t) {
  if (t.tri) {
    let { tris: e, flat: s, ys: n } = t.tri,
      i = o.v,
      a = [0.3, 0, 0.65, 0.25];
    for (let r = 0; r < n.length; r++)
      o.vert(s[r * 2], n[r], s[r * 2 + 1], 0, 1, 0, s[r * 2], s[r * 2 + 1], a);
    for (let [r, l, c] of e) nz(o, i + r, i + l, i + c);
    return;
  }
  if (t.paint) return Wmt(o, t, dc);
  for (let e of t.polys) {
    let s = e.map((h) => h.pts),
      n = e.map((h) => h.y),
      { tris: i, flat: a } = dc(s),
      r = [];
    for (let h of n) for (let f = 0; f < h.length; f++) r.push(h[f]);
    let l = o.v,
      c = [0.3, 0, 0.65, 0.25];
    for (let h = 0; h < a.length / 2; h++)
      o.vert(a[h * 2], r[h], a[h * 2 + 1], 0, 1, 0, a[h * 2], a[h * 2 + 1], c);
    for (let [h, f, u] of i) nz(o, l + h, l + f, l + u);
  }
}
var px = null,
  eX = (o, t) => Math.floor(o / 24) * 100003 + Math.floor(t / 24);
function qmt(o) {
  px = new Map();
  let t = {};
  for (let e of o.edges)
    if (!(e.name !== "Market Street" || e.inner || e.elev || e.hwy))
      for (let s = 0; s <= e.L; s += 3) {
        Ot(e, s, t);
        let n = eX(t.x, t.z),
          i = px.get(n);
        (i || px.set(n, (i = [])), i.push(t.x, t.z, t.w, t.dx, t.dz));
      }
}
function jmt(o, t) {
  if (!px || !px.size) return O$;
  let e = 1e9,
    s = -1,
    n = null;
  for (let r = -1; r <= 1; r++)
    for (let l = -1; l <= 1; l++) {
      let c = px.get(eX(o + r * 24, t + l * 24));
      if (c)
        for (let h = 0; h < c.length; h += 5) {
          let f = Math.hypot(c[h] - o, c[h + 1] - t) - c[h + 2];
          f < e && ((e = f), (s = h), (n = c));
        }
    }
  if (s < 0 || e > 12 || e < -1) return O$;
  let i = n[s + 3],
    a = n[s + 4];
  return (
    i < 0 && ((i = -i), (a = -a)),
    [0.5 + 0.5 * i, 0.5 + 0.5 * a, Math.max(0, Math.min(1, e / 16)), 0.12]
  );
}
function $mt(o, t, e, s) {
  let n = t.length / 2,
    i = o.v,
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
      v = d * b - p * g,
      x = p * m - u * b,
      y = u * g - d * m;
    x < 0 && ((v = -v), (x = -x), (y = -y));
    for (let M of [r, l, c])
      ((a[M * 3] += v), (a[M * 3 + 1] += x), (a[M * 3 + 2] += y));
  }
  for (let r = 0; r < n; r++) {
    let l = Math.hypot(a[r * 3], a[r * 3 + 1], a[r * 3 + 2]) || 1;
    o.vert(
      t[r * 2],
      e[r],
      t[r * 2 + 1],
      a[r * 3] / l,
      a[r * 3 + 1] / l,
      a[r * 3 + 2] / l,
      t[r * 2],
      t[r * 2 + 1],
      jmt(t[r * 2], t[r * 2 + 1]),
    );
  }
  for (let [r, l, c] of s) nz(o, i + r, i + l, i + c);
}
function* Xmt(o, t, e, s) {
  let n = (y, M, S) =>
      (t[M] - t[y]) * (e[S] - e[y]) - (e[M] - e[y]) * (t[S] - t[y]),
    i = o.length,
    a = new Int32Array(i * 3);
  o.forEach(([y, M, S], w) => {
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
        _ = (S - w) / 4194304;
      w === M + 1 ? c.set(y, _) : _ === M + 1 && c.set(y, w);
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
  for (let y = 0; y < i; y++) u(y);
  let p = (y, M, S, w) => {
      let _ = t[y] - t[w],
        z = e[y] - e[w],
        A = t[M] - t[w],
        T = e[M] - e[w],
        E = t[S] - t[w],
        R = e[S] - e[w];
      return (
        (_ * _ + z * z) * (A * R - E * T) -
          (A * A + T * T) * (_ * R - E * z) +
          (E * E + R * R) * (_ * T - A * z) >
        1e-9
      );
    },
    m = (y, M, S) => {
      for (let w = 0; w < 3; w++) {
        let _ = a[y * 3 + w];
        if (_ !== M && _ !== S) return _;
      }
      return -1;
    },
    g = [...c.keys()],
    b = new Set(g),
    v = i * 30;
  for (yield; g.length && v-- > 0;) {
    (v & 2047) === 0 && (yield);
    let y = g.pop();
    if ((b.delete(y), l.has(y))) continue;
    let M = c.get(y);
    if (!M) continue;
    let S = M % 4194304,
      w = (M - S) / 4194304;
    if (!S || !w) continue;
    let _ = S - 1,
      z = w - 1,
      A = Math.floor(y / 1048576),
      T = y % 1048576,
      E = m(_, A, T),
      R = m(z, A, T);
    if (
      E < 0 ||
      R < 0 ||
      E === R ||
      !p(a[_ * 3], a[_ * 3 + 1], a[_ * 3 + 2], R)
    )
      continue;
    let P = n(E, R, A),
      C = n(E, R, T);
    if (!(P * C >= 0)) {
      (d(_),
        d(z),
        P > 0
          ? ((a[_ * 3] = E), (a[_ * 3 + 1] = R), (a[_ * 3 + 2] = A))
          : ((a[_ * 3] = E), (a[_ * 3 + 1] = A), (a[_ * 3 + 2] = R)),
        C > 0
          ? ((a[z * 3] = E), (a[z * 3 + 1] = R), (a[z * 3 + 2] = T))
          : ((a[z * 3] = E), (a[z * 3 + 1] = T), (a[z * 3 + 2] = R)),
        u(_),
        u(z));
      for (let I of [r(A, E), r(E, T), r(T, R), r(R, A)])
        b.has(I) || (b.add(I), g.push(I));
    }
  }
  let x = new Array(i);
  for (let y = 0; y < i; y++) x[y] = [a[y * 3], a[y * 3 + 1], a[y * 3 + 2]];
  return x;
}
function sX(o, t, e, s = !1, n = null, i = !1) {
  let a = Zmt(t, e, s);
  return () => {
    let r = a.next();
    if (!r.done) return !1;
    if (r.value) {
      let l = n && (!s || i) ? Jmt(t, n, r.value) : r.value;
      ($mt(o, l.flat, l.ys, l.tris), s$(t, l.flat, l.ys, l.tris));
    }
    return !0;
  };
}
var $m = new Map(),
  Xu = 256,
  Ap = 0.5,
  fx = Xu / Ap;
function Kmt(o, t, e) {
  let s = t * 100003 + e,
    n = $m.get(s);
  if (n) return ($m.delete(s), $m.set(s, n), n);
  n = new Uint8Array(fx * fx);
  let i = t * Xu,
    a = e * Xu,
    r = (h, f = !1, u = 1) => {
      let d = 1e9,
        p = -1e9;
      for (let v of h)
        for (let x = 1; x < v.length; x += 2)
          ((d = Math.min(d, v[x])), (p = Math.max(p, v[x])));
      let m = Math.max(0, Math.floor((d - a) / Ap)),
        g = Math.min(fx - 1, Math.ceil((p - a) / Ap)),
        b = [];
      for (let v = m; v <= g; v++) {
        let x = a + (v + 0.5) * Ap;
        b.length = 0;
        for (let y of h)
          for (let M = 0, S = y.length - 2; M < y.length; S = M, M += 2) {
            let w = y[S + 1],
              _ = y[M + 1];
            w > x != _ > x &&
              b.push(y[S] + ((y[M] - y[S]) * (x - w)) / (_ - w));
          }
        if (f) {
          if (b.length < 2) continue;
          let y = 1e9,
            M = -1e9;
          for (let S of b) (S < y && (y = S), S > M && (M = S));
          ((b.length = 2), (b[0] = y), (b[1] = M));
        } else b.sort((y, M) => y - M);
        for (let y = 0; y + 1 < b.length; y += 2) {
          let M = Math.max(0, Math.ceil((b[y] - i) / Ap - 0.5)),
            S = Math.min(fx - 1, Math.floor((b[y + 1] - i) / Ap - 0.5));
          for (let w = M; w <= S; w++) n[v * fx + w] = u;
        }
      }
    },
    l = new Set(),
    c = new Set();
  for (
    let h = Math.floor((i - 16) / o.HC);
    h <= Math.floor((i + Xu + 16) / o.HC);
    h++
  )
    for (
      let f = Math.floor((a - 16) / o.HC);
      f <= Math.floor((a + Xu + 16) / o.HC);
      f++
    ) {
      let u = o.hk(h, f);
      for (let d of o.EH.get(u) || []) {
        let p = Math.floor(d / 65536),
          m = d % 65536,
          g = o.edges[p],
          b = g.layered || g.tunnel ? g.maskS : null;
        if (
          g.inner ||
          ((g.layered || g.tunnel) && !b) ||
          l.has(d) ||
          (l.add(d), m + 1 >= g.n)
        )
          continue;
        let v = Math.max(g.S[m], g.s0, b ? b[0] : -1),
          x = Math.min(g.S[m + 1], g.s1, b ? b[1] : 1e9);
        if (x - v < 0.05) continue;
        let y = {},
          M = {};
        (Ot(g, v, y), Ot(g, x, M));
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
      for (let d of o.JH.get(u) || [])
        if (!(d.layered || c.has(d))) {
          c.add(d);
          for (let p of d.polys) r(p.map((m) => m.pts));
        }
    }
  return ($m.set(s, n), $m.size > 48 && $m.delete($m.keys().next().value), n);
}
function Pp(o, t, e) {
  let s = Math.floor(t / Xu),
    n = Math.floor(e / Xu);
  return Kmt(o, s, n)[
    Math.floor((e - n * Xu) / Ap) * fx + Math.floor((t - s * Xu) / Ap)
  ];
}
