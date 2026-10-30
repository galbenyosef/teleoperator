// app 81 — math
// Lines 71873-72094 of readable/app.pretty.js (statement-aligned).
function yk(o, t, e) {
  let s = o.kb;
  if (((s.t += t), s.ph === "air")) {
    ((s.vy -= 9.8 * t),
      (o.x += s.vx * t),
      (o.z += s.vz * t),
      (s.y += s.vy * t),
      (s.ang += s.w * t));
    let n = e(o.x, o.z, s.y);
    (n > -1e4 || (n = s.y0 ?? s.y),
      s.t > 4 && (n = s.y + 1),
      s.y <= n &&
        s.vy < 0 &&
        ((s.y = n),
        s.n++,
        -s.vy > 1.3 && s.n < 3
          ? ((s.vy = -s.vy * 0.38),
            (s.vx *= 0.55),
            (s.vz *= 0.55),
            (s.w *= 0.5))
          : (s.ph = "slide")));
  } else if (s.ph === "slide" || s.ph === "rest") {
    let n = Math.exp(-6 * t);
    ((s.vx *= n),
      (s.vz *= n),
      (o.x += s.vx * t),
      (o.z += s.vz * t),
      (s.y = e(o.x, o.z, s.y)));
    let i = (((s.ang % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    ((i += (-Math.PI / 2 - i) * Math.min(1, t * 6)),
      (s.ang = i),
      s.ph === "slide" &&
        Math.hypot(s.vx, s.vz) < 0.25 &&
        ((s.ph = "rest"), (s.t = 0)),
      s.ph === "rest" &&
        s.t > s.rest &&
        ((s.ph = "up"), (s.t = 0), (s.a0 = s.ang)));
  } else {
    s.y = e(o.x, o.z, s.y);
    let n = Math.min(1, s.t / 0.8);
    if (((s.ang = s.a0 * (1 - n * n * (3 - 2 * n))), n >= 1))
      return (
        (o.y = s.y),
        (o.kb = null),
        (o.mad = 3.5 + Math.random() * 2),
        !0
      );
  }
  return ((o.y = s.y), !1);
}
var yP = (o, t) =>
  ((Math.imul(o, 73856093) ^ Math.imul(t, 19349663)) >>> 0) & 8191;
function lc(o, t, e, s) {
  if (o.t === "circ") {
    let y = t - o.x,
      M = e - o.z,
      S = Math.hypot(y, M),
      w = o.r + s;
    return S >= w
      ? null
      : S > 1e-6
        ? [(y / S) * (w - S), (M / S) * (w - S)]
        : [w, 0];
  }
  if (o.t === "box") {
    if (t < o.x0 - s || t > o.x1 + s || e < o.z0 - s || e > o.z1 + s)
      return null;
    let y = Math.max(o.x0, Math.min(o.x1, t)),
      M = Math.max(o.z0, Math.min(o.z1, e)),
      S = t - y,
      w = e - M,
      _ = Math.hypot(S, w);
    if (_ > 1e-6) return _ >= s ? null : [(S / _) * (s - _), (w / _) * (s - _)];
    let z = [t - o.x0, o.x1 - t, e - o.z0, o.z1 - e],
      A = z.indexOf(Math.min(...z));
    return A === 0
      ? [-(z[0] + s), 0]
      : A === 1
        ? [z[1] + s, 0]
        : A === 2
          ? [0, -(z[2] + s)]
          : [0, z[3] + s];
  }
  if (o.t === "poly") {
    let y = o.bb;
    if (t < y[0] - s || t > y[2] + s || e < y[1] - s || e > y[3] + s)
      return null;
    let M = o.pts,
      S = M.length >> 1,
      w = !1,
      _ = 1e18,
      z = 0,
      A = 0;
    for (let P = 0, C = S - 1; P < S; C = P++) {
      let I = M[C * 2],
        L = M[C * 2 + 1],
        F = M[P * 2],
        O = M[P * 2 + 1];
      O > e != L > e && t < ((I - F) * (e - O)) / (L - O) + F && (w = !w);
      let B = F - I,
        H = O - L,
        N = B * B + H * H,
        D = N > 0 ? ((t - I) * B + (e - L) * H) / N : 0;
      D = D < 0 ? 0 : D > 1 ? 1 : D;
      let U = I + B * D,
        G = L + H * D,
        W = (t - U) ** 2 + (e - G) ** 2;
      W < _ && ((_ = W), (z = U), (A = G));
    }
    let T = Math.sqrt(_);
    if (w) {
      let P = z - t,
        C = A - e;
      return T > 1e-6 ? [(P / T) * (T + s), (C / T) * (T + s)] : [s, 0];
    }
    if (T >= s) return null;
    let E = t - z,
      R = e - A;
    return T > 1e-6 ? [(E / T) * (s - T), (R / T) * (s - T)] : [s, 0];
  }
  let n = t - o.x,
    i = e - o.z,
    a = o.c,
    r = -o.s,
    l = o.s,
    c = o.c,
    h = n * a + i * r,
    f = n * l + i * c;
  if (Math.abs(h) > o.hx + s || Math.abs(f) > o.hz + s) return null;
  let u = Math.max(-o.hx, Math.min(o.hx, h)),
    d = Math.max(-o.hz, Math.min(o.hz, f)),
    p = h - u,
    m = f - d,
    g = Math.hypot(p, m);
  if (g > 1e-6) {
    if (g >= s) return null;
    let y = (s - g) / g;
    return [(a * p + l * m) * y, (r * p + c * m) * y];
  }
  let b = o.hx - Math.abs(h),
    v = o.hz - Math.abs(f);
  if (b < v) {
    let y = h >= 0 ? 1 : -1;
    return [a * y * (b + s), r * y * (b + s)];
  }
  let x = f >= 0 ? 1 : -1;
  return [l * x * (v + s), c * x * (v + s)];
}
function Gb(o, t, e, s) {
  let n = t - o.x,
    i = e - o.z,
    a = n * o.fx + i * o.fz,
    r = n * o.fz - i * o.fx,
    l = Math.max(-o.hl, Math.min(o.hl, a)),
    c = Math.max(-o.hw, Math.min(o.hw, r)),
    h = a - l,
    f = r - c,
    u = Math.hypot(h, f);
  if (u > 1e-6) {
    if (u >= s) return null;
    let g = (s - u) / u;
    return [(o.fx * h + o.fz * f) * g, (o.fz * h - o.fx * f) * g];
  }
  let d = o.hl - Math.abs(a),
    p = o.hw - Math.abs(r);
  if (p < d) {
    let g = r >= 0 ? 1 : -1;
    return [o.fz * g * (p + s), -o.fx * g * (p + s)];
  }
  let m = a >= 0 ? 1 : -1;
  return [o.fx * m * (d + s), o.fz * m * (d + s)];
}
function wk(o, t, e, s, n, i) {
  let a = (S, w) => {
      let _ = S - o.x,
        z = w - o.z;
      return [_ * o.fx + z * o.fz, _ * o.fz - z * o.fx];
    },
    [r, l] = a(t, e),
    [c, h] = a(s, n),
    f = o.hl + i,
    u = o.hw + i,
    d = 0,
    p = 1,
    m = c - r,
    g = h - l;
  for (let [S, w, _] of [
    [r, m, f],
    [l, g, u],
  ]) {
    if (Math.abs(w) < 1e-9) {
      if (Math.abs(S) > _) return null;
      continue;
    }
    let z = (-_ - S) / w,
      A = (_ - S) / w;
    if (
      (z > A && ([z, A] = [A, z]),
      (d = Math.max(d, z)),
      (p = Math.min(p, A)),
      d > p)
    )
      return null;
  }
  let b = [
      [f, u],
      [f, -u],
      [-f, u],
      [-f, -u],
    ].map(([S, w]) => [S * 1.02, w * 1.02]),
    v = null,
    x = 1e18;
  for (let [S, w] of b) {
    let _ = Math.hypot(S - r, w - l) + Math.hypot(c - S, h - w),
      z = [(S + r) / 2, (w + l) / 2];
    (Math.abs(z[0]) < f * 0.98 && Math.abs(z[1]) < u * 0.98) ||
      (_ < x && ((x = _), (v = [S, w])));
  }
  if (!v) return null;
  let [y, M] = v;
  return [o.x + o.fx * y + o.fz * M, o.z + o.fz * y - o.fx * M];
}
