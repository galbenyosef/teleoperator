// app 326 — math
// Lines 156377-156643 of readable/app.pretty.js (statement-aligned).
function hMt(o, t, e, s, n, i, a, r) {
  let l = (e - t.x) * t.nx + (s - t.z) * t.nz,
    c = l >= -0.3 ? 1 : -1,
    h = { x: t.nx * c, z: t.nz * c },
    f =
      a * Math.abs(n.x * h.x + n.z * h.z) + r * Math.abs(i.x * h.x + i.z * h.z),
    u = f + t.hz - c * l;
  if (u <= 0) return null;
  let d = e,
    p = s,
    m = 1 / 0;
  for (let [g, b] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let v = e + n.x * a * g + i.x * r * b,
      x = s + n.z * a * g + i.z * r * b,
      y = v * h.x + x * h.z;
    y < m && ((m = y), (d = v), (p = x));
  }
  return { d: Math.min(u, 1.5), n: h, px: d, pz: p };
}
function fet(o, t, e, s, n, i, a, r, l, c, h, f, u = !1) {
  let d = [e, s, l, c],
    p = o - a,
    m = t - r,
    g = null;
  for (let y of d) {
    let M =
        n * Math.abs(e.x * y.x + e.z * y.z) +
        i * Math.abs(s.x * y.x + s.z * y.z),
      S =
        h * Math.abs(l.x * y.x + l.z * y.z) +
        f * Math.abs(c.x * y.x + c.z * y.z),
      w = p * y.x + m * y.z,
      _ = M + S - Math.abs(w);
    if (_ <= 0) return null;
    (!g || _ < g.d) &&
      (g = { d: _, n: w >= 0 ? { x: y.x, z: y.z } : { x: -y.x, z: -y.z } });
  }
  let b = o,
    v = t,
    x = 1 / 0;
  for (let [y, M] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let S = o + e.x * n * y + s.x * i * M,
      w = t + e.z * n * y + s.z * i * M,
      _ = S * g.n.x + w * g.n.z;
    _ < x && ((x = _), (b = S), (v = w));
  }
  if (((g.px = b), (g.pz = v), u)) {
    let y = 0,
      M = 0,
      S = 0,
      w = (_, z, A, T, E, R, P, C) => {
        let I = _ - A,
          L = z - T;
        return (
          Math.abs(I * E.x + L * E.z) <= P + 0.001 &&
          Math.abs(I * R.x + L * R.z) <= C + 0.001
        );
      };
    for (let [_, z] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      let A = o + e.x * n * _ + s.x * i * z,
        T = t + e.z * n * _ + s.z * i * z;
      w(A, T, a, r, l, c, h, f) && ((M += A), (S += T), y++);
      let E = a + l.x * h * _ + c.x * f * z,
        R = r + l.z * h * _ + c.z * f * z;
      w(E, R, o, t, e, s, n, i) && ((M += E), (S += R), y++);
    }
    y && ((g.px = M / y), (g.pz = S / y));
  }
  return g;
}
var uet = {
  4: [
    [1, 0],
    [0.92, 0.38],
    [0.71, 0.71],
    [0.38, 0.92],
    [0.02, 1],
  ],
  1: [
    [1, 0],
    [0.004, 1],
  ],
  2: [
    [1, 0],
    [0.3, 1],
  ],
};
function det(o, t, e) {
  if (!o.rh) return o.y1;
  let s = o.pts,
    n = s.length / 2,
    i = t - o.cx,
    a = e - o.cz;
  if (Math.hypot(i, a) < 1e-6) return o.y1;
  let l = 1 / 0;
  for (let f = 0; f < n; f++) {
    let u = s[f * 2] - o.cx,
      d = s[f * 2 + 1] - o.cz,
      p = s[((f + 1) % n) * 2] - o.cx - u,
      m = s[((f + 1) % n) * 2 + 1] - o.cz - d,
      g = i * m - a * p;
    if (Math.abs(g) < 1e-9) continue;
    let b = (u * m - d * p) / g,
      v = (u * a - d * i) / g;
    b > 0 && v >= 0 && v <= 1 && b < l && (l = b);
  }
  if (!Number.isFinite(l)) return o.y1;
  let c = 1 / l,
    h = uet[o.rs] || uet[2];
  if (c >= 1) return o.eave;
  for (let f = 0; f + 1 < h.length; f++) {
    let [u, d] = h[f],
      [p, m] = h[f + 1];
    if (c <= u && c >= p)
      return o.eave + o.rh * (d + ((m - d) * (u - c)) / (u - p));
  }
  return o.y1;
}
function fMt(o, t, e) {
  let s = !1;
  for (let n = 0, i = o.length / 2, a = i - 1; n < i; a = n++) {
    let r = o[n * 2],
      l = o[n * 2 + 1],
      c = o[a * 2],
      h = o[a * 2 + 1];
    l > e != h > e && t < ((c - r) * (e - l)) / (h - l) + r && (s = !s);
  }
  return s;
}
function uMt(o, t, e, s, n, i, a) {
  let r = a.pts,
    l = r.length / 2,
    c = Math.abs(e.x) * n + Math.abs(s.x) * i,
    h = Math.abs(e.z) * n + Math.abs(s.z) * i;
  if (o + c < a.bb[0] || o - c > a.bb[2] || t + h < a.bb[1] || t - h > a.bb[3])
    return null;
  if (a.sgn === void 0) {
    let u = 0;
    for (let d = 0, p = l - 1; d < l; p = d++)
      u += r[p * 2] * r[d * 2 + 1] - r[d * 2] * r[p * 2 + 1];
    a.sgn = u < 0 ? 1 : -1;
  }
  let f = null;
  for (let [u, d] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let p = o + e.x * n * u + s.x * i * d,
      m = t + e.z * n * u + s.z * i * d;
    if (p < a.bb[0] || p > a.bb[2] || m < a.bb[1] || m > a.bb[3]) continue;
    let g = !1;
    for (let M = 0, S = l - 1; M < l; S = M++) {
      let w = r[M * 2],
        _ = r[M * 2 + 1],
        z = r[S * 2],
        A = r[S * 2 + 1];
      _ > m != A > m && p < ((z - w) * (m - _)) / (A - _) + w && (g = !g);
    }
    if (!g) continue;
    let b = 1 / 0,
      v = null,
      x = 1 / 0,
      y = null;
    for (let M = 0; M < l; M++) {
      let S = r[M * 2],
        w = r[M * 2 + 1],
        _ = r[((M + 1) % l) * 2],
        z = r[((M + 1) % l) * 2 + 1],
        A = _ - S,
        T = z - w,
        E = Math.hypot(A, T);
      if (E < 1e-6) continue;
      let R = ((p - S) * A + (m - w) * T) / (E * E);
      R = R < 0 ? 0 : R > 1 ? 1 : R;
      let P = Math.hypot(p - S - A * R, m - w - T * R),
        C = { x: (-T / E) * a.sgn, z: (A / E) * a.sgn };
      P < b
        ? (v && v.x * C.x + v.z * C.z < 0.5 && ((x = b), (y = v)),
          (b = P),
          (v = C))
        : P < x && (!v || v.x * C.x + v.z * C.z < 0.5) && ((x = P), (y = C));
    }
    if (v && y && x < 0.55 && Math.abs(v.x * s.x + v.z * s.z) > 0.7) {
      let M = 0.9 * (1 - x / 0.55),
        S = v.x + y.x * M,
        w = v.z + y.z * M,
        _ = Math.hypot(S, w);
      v = { x: S / _, z: w / _ };
    }
    v && (!f || b > f.d) && (f = { d: b, n: v, px: p, pz: m });
  }
  for (let u = 0; u < l; u++) {
    let d = r[u * 2] - o,
      p = r[u * 2 + 1] - t,
      m = d * e.x + p * e.z,
      g = d * s.x + p * s.z,
      b = n - Math.abs(m),
      v = i - Math.abs(g);
    if (b <= 0 || v <= 0) continue;
    let x = Math.min(b, v),
      y =
        b < v
          ? { x: -e.x * Math.sign(m), z: -e.z * Math.sign(m) }
          : { x: -s.x * Math.sign(g), z: -s.z * Math.sign(g) };
    if (b >= v && b < 0.55) {
      let M = 0.9 * (1 - b / 0.55),
        S = y.x - e.x * Math.sign(m) * M,
        w = y.z - e.z * Math.sign(m) * M,
        _ = Math.hypot(S, w);
      y = { x: S / _, z: w / _ };
    }
    (!f || x > f.d) && (f = { d: x, n: y, px: r[u * 2], pz: r[u * 2 + 1] });
  }
  return f;
}
function dMt(o, t, e, s, n, i, a) {
  let r = a.x - o,
    l = a.z - t,
    c = r * e.x + l * e.z,
    h = r * s.x + l * s.z,
    f = Math.max(-n, Math.min(n, c)),
    u = Math.max(-i, Math.min(i, h)),
    d = c - f,
    p = h - u,
    m = Math.hypot(d, p);
  if (m > a.r) return null;
  let g, b, v;
  if (m > 1e-6) ((g = -d / m), (b = -p / m), (v = a.r - m));
  else {
    let S = n - Math.abs(c),
      w = i - Math.abs(h);
    S < w
      ? ((g = -Math.sign(c) || 1), (b = 0), (v = S + a.r))
      : ((g = 0), (b = -Math.sign(h) || 1), (v = w + a.r));
  }
  if (a.r < 0.6 && g === 0 && Math.abs(b) > 0.5) {
    let S = n - Math.abs(c);
    if (S < 0.55) {
      let w = 0.9 * (1 - Math.max(0, S) / 0.55);
      g = -Math.sign(c) * w;
      let _ = Math.hypot(g, b);
      ((g /= _), (b /= _));
    }
  }
  let x = { x: e.x * g + s.x * b, z: e.z * g + s.z * b },
    y = o + e.x * f + s.x * u,
    M = t + e.z * f + s.z * u;
  return { d: v, n: x, px: y, pz: M };
}
Pn();
