// app 312 — math
// Lines 150791-150998 of readable/app.pretty.js (statement-aligned).
function Gvt(i, t, e, s, n, o, a, r) {
  let l = (e - t.x) * t.nx + (s - t.z) * t.nz,
    c = l >= -0.3 ? 1 : -1,
    h = { x: t.nx * c, z: t.nz * c },
    f =
      a * Math.abs(n.x * h.x + n.z * h.z) + r * Math.abs(o.x * h.x + o.z * h.z),
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
    let x = e + n.x * a * g + o.x * r * b,
      v = s + n.z * a * g + o.z * r * b,
      y = x * h.x + v * h.z;
    y < m && ((m = y), (d = x), (p = v));
  }
  return { d: Math.min(u, 1.5), n: h, px: d, pz: p };
}
function wZ(i, t, e, s, n, o, a, r, l, c, h, f, u = !1) {
  let d = [e, s, l, c],
    p = i - a,
    m = t - r,
    g = null;
  for (let y of d) {
    let M =
        n * Math.abs(e.x * y.x + e.z * y.z) +
        o * Math.abs(s.x * y.x + s.z * y.z),
      S =
        h * Math.abs(l.x * y.x + l.z * y.z) +
        f * Math.abs(c.x * y.x + c.z * y.z),
      w = p * y.x + m * y.z,
      z = M + S - Math.abs(w);
    if (z <= 0) return null;
    (!g || z < g.d) &&
      (g = { d: z, n: w >= 0 ? { x: y.x, z: y.z } : { x: -y.x, z: -y.z } });
  }
  let b = i,
    x = t,
    v = 1 / 0;
  for (let [y, M] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    let S = i + e.x * n * y + s.x * o * M,
      w = t + e.z * n * y + s.z * o * M,
      z = S * g.n.x + w * g.n.z;
    z < v && ((v = z), (b = S), (x = w));
  }
  if (((g.px = b), (g.pz = x), u)) {
    let y = 0,
      M = 0,
      S = 0,
      w = (z, _, R, T, E, A, C, P) => {
        let I = z - R,
          L = _ - T;
        return (
          Math.abs(I * E.x + L * E.z) <= C + 0.001 &&
          Math.abs(I * A.x + L * A.z) <= P + 0.001
        );
      };
    for (let [z, _] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      let R = i + e.x * n * z + s.x * o * _,
        T = t + e.z * n * z + s.z * o * _;
      w(R, T, a, r, l, c, h, f) && ((M += R), (S += T), y++);
      let E = a + l.x * h * z + c.x * f * _,
        A = r + l.z * h * z + c.z * f * _;
      w(E, A, i, t, e, s, n, o) && ((M += E), (S += A), y++);
    }
    y && ((g.px = M / y), (g.pz = S / y));
  }
  return g;
}
function Wvt(i, t, e, s, n, o, a) {
  let r = a.pts,
    l = r.length / 2,
    c = Math.abs(e.x) * n + Math.abs(s.x) * o,
    h = Math.abs(e.z) * n + Math.abs(s.z) * o;
  if (i + c < a.bb[0] || i - c > a.bb[2] || t + h < a.bb[1] || t - h > a.bb[3])
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
    let p = i + e.x * n * u + s.x * o * d,
      m = t + e.z * n * u + s.z * o * d;
    if (p < a.bb[0] || p > a.bb[2] || m < a.bb[1] || m > a.bb[3]) continue;
    let g = !1;
    for (let M = 0, S = l - 1; M < l; S = M++) {
      let w = r[M * 2],
        z = r[M * 2 + 1],
        _ = r[S * 2],
        R = r[S * 2 + 1];
      z > m != R > m && p < ((_ - w) * (m - z)) / (R - z) + w && (g = !g);
    }
    if (!g) continue;
    let b = 1 / 0,
      x = null,
      v = 1 / 0,
      y = null;
    for (let M = 0; M < l; M++) {
      let S = r[M * 2],
        w = r[M * 2 + 1],
        z = r[((M + 1) % l) * 2],
        _ = r[((M + 1) % l) * 2 + 1],
        R = z - S,
        T = _ - w,
        E = Math.hypot(R, T);
      if (E < 1e-6) continue;
      let A = ((p - S) * R + (m - w) * T) / (E * E);
      A = A < 0 ? 0 : A > 1 ? 1 : A;
      let C = Math.hypot(p - S - R * A, m - w - T * A),
        P = { x: (-T / E) * a.sgn, z: (R / E) * a.sgn };
      C < b
        ? (x && x.x * P.x + x.z * P.z < 0.5 && ((v = b), (y = x)),
          (b = C),
          (x = P))
        : C < v && (!x || x.x * P.x + x.z * P.z < 0.5) && ((v = C), (y = P));
    }
    if (x && y && v < 0.55 && Math.abs(x.x * s.x + x.z * s.z) > 0.7) {
      let M = 0.9 * (1 - v / 0.55),
        S = x.x + y.x * M,
        w = x.z + y.z * M,
        z = Math.hypot(S, w);
      x = { x: S / z, z: w / z };
    }
    x && (!f || b > f.d) && (f = { d: b, n: x, px: p, pz: m });
  }
  for (let u = 0; u < l; u++) {
    let d = r[u * 2] - i,
      p = r[u * 2 + 1] - t,
      m = d * e.x + p * e.z,
      g = d * s.x + p * s.z,
      b = n - Math.abs(m),
      x = o - Math.abs(g);
    if (b <= 0 || x <= 0) continue;
    let v = Math.min(b, x),
      y =
        b < x
          ? { x: -e.x * Math.sign(m), z: -e.z * Math.sign(m) }
          : { x: -s.x * Math.sign(g), z: -s.z * Math.sign(g) };
    if (b >= x && b < 0.55) {
      let M = 0.9 * (1 - b / 0.55),
        S = y.x - e.x * Math.sign(m) * M,
        w = y.z - e.z * Math.sign(m) * M,
        z = Math.hypot(S, w);
      y = { x: S / z, z: w / z };
    }
    (!f || v > f.d) && (f = { d: v, n: y, px: r[u * 2], pz: r[u * 2 + 1] });
  }
  return f;
}
function qvt(i, t, e, s, n, o, a) {
  let r = a.x - i,
    l = a.z - t,
    c = r * e.x + l * e.z,
    h = r * s.x + l * s.z,
    f = Math.max(-n, Math.min(n, c)),
    u = Math.max(-o, Math.min(o, h)),
    d = c - f,
    p = h - u,
    m = Math.hypot(d, p);
  if (m > a.r) return null;
  let g, b, x;
  if (m > 1e-6) ((g = -d / m), (b = -p / m), (x = a.r - m));
  else {
    let S = n - Math.abs(c),
      w = o - Math.abs(h);
    S < w
      ? ((g = -Math.sign(c) || 1), (b = 0), (x = S + a.r))
      : ((g = 0), (b = -Math.sign(h) || 1), (x = w + a.r));
  }
  if (a.r < 0.6 && g === 0 && Math.abs(b) > 0.5) {
    let S = n - Math.abs(c);
    if (S < 0.55) {
      let w = 0.9 * (1 - Math.max(0, S) / 0.55);
      g = -Math.sign(c) * w;
      let z = Math.hypot(g, b);
      ((g /= z), (b /= z));
    }
  }
  let v = { x: e.x * g + s.x * b, z: e.z * g + s.z * b },
    y = i + e.x * f + s.x * u,
    M = t + e.z * f + s.z * u;
  return { d: x, n: v, px: y, pz: M };
}
En();
