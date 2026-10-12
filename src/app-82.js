// app 82 — math
// Lines 71639-71860 of readable/app.pretty.js (statement-aligned).
function xS(i, t, e) {
  let s = i.kb;
  if (((s.t += t), s.ph === "air")) {
    ((s.vy -= 9.8 * t),
      (i.x += s.vx * t),
      (i.z += s.vz * t),
      (s.y += s.vy * t),
      (s.ang += s.w * t));
    let n = e(i.x, i.z, s.y);
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
      (i.x += s.vx * t),
      (i.z += s.vz * t),
      (s.y = e(i.x, i.z, s.y)));
    let o = (((s.ang % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    ((o += (-Math.PI / 2 - o) * Math.min(1, t * 6)),
      (s.ang = o),
      s.ph === "slide" &&
        Math.hypot(s.vx, s.vz) < 0.25 &&
        ((s.ph = "rest"), (s.t = 0)),
      s.ph === "rest" &&
        s.t > s.rest &&
        ((s.ph = "up"), (s.t = 0), (s.a0 = s.ang)));
  } else {
    s.y = e(i.x, i.z, s.y);
    let n = Math.min(1, s.t / 0.8);
    if (((s.ang = s.a0 * (1 - n * n * (3 - 2 * n))), n >= 1))
      return (
        (i.y = s.y),
        (i.kb = null),
        (i.mad = 3.5 + Math.random() * 2),
        !0
      );
  }
  return ((i.y = s.y), !1);
}
var qR = (i, t) =>
  ((Math.imul(i, 73856093) ^ Math.imul(t, 19349663)) >>> 0) & 8191;
function Ul(i, t, e, s) {
  if (i.t === "circ") {
    let y = t - i.x,
      M = e - i.z,
      S = Math.hypot(y, M),
      w = i.r + s;
    return S >= w
      ? null
      : S > 1e-6
        ? [(y / S) * (w - S), (M / S) * (w - S)]
        : [w, 0];
  }
  if (i.t === "box") {
    if (t < i.x0 - s || t > i.x1 + s || e < i.z0 - s || e > i.z1 + s)
      return null;
    let y = Math.max(i.x0, Math.min(i.x1, t)),
      M = Math.max(i.z0, Math.min(i.z1, e)),
      S = t - y,
      w = e - M,
      z = Math.hypot(S, w);
    if (z > 1e-6) return z >= s ? null : [(S / z) * (s - z), (w / z) * (s - z)];
    let _ = [t - i.x0, i.x1 - t, e - i.z0, i.z1 - e],
      R = _.indexOf(Math.min(..._));
    return R === 0
      ? [-(_[0] + s), 0]
      : R === 1
        ? [_[1] + s, 0]
        : R === 2
          ? [0, -(_[2] + s)]
          : [0, _[3] + s];
  }
  if (i.t === "poly") {
    let y = i.bb;
    if (t < y[0] - s || t > y[2] + s || e < y[1] - s || e > y[3] + s)
      return null;
    let M = i.pts,
      S = M.length >> 1,
      w = !1,
      z = 1e18,
      _ = 0,
      R = 0;
    for (let C = 0, P = S - 1; C < S; P = C++) {
      let I = M[P * 2],
        L = M[P * 2 + 1],
        F = M[C * 2],
        N = M[C * 2 + 1];
      N > e != L > e && t < ((I - F) * (e - N)) / (L - N) + F && (w = !w);
      let B = F - I,
        H = N - L,
        O = B * B + H * H,
        D = O > 0 ? ((t - I) * B + (e - L) * H) / O : 0;
      D = D < 0 ? 0 : D > 1 ? 1 : D;
      let U = I + B * D,
        G = L + H * D,
        q = (t - U) ** 2 + (e - G) ** 2;
      q < z && ((z = q), (_ = U), (R = G));
    }
    let T = Math.sqrt(z);
    if (w) {
      let C = _ - t,
        P = R - e;
      return T > 1e-6 ? [(C / T) * (T + s), (P / T) * (T + s)] : [s, 0];
    }
    if (T >= s) return null;
    let E = t - _,
      A = e - R;
    return T > 1e-6 ? [(E / T) * (s - T), (A / T) * (s - T)] : [s, 0];
  }
  let n = t - i.x,
    o = e - i.z,
    a = i.c,
    r = -i.s,
    l = i.s,
    c = i.c,
    h = n * a + o * r,
    f = n * l + o * c;
  if (Math.abs(h) > i.hx + s || Math.abs(f) > i.hz + s) return null;
  let u = Math.max(-i.hx, Math.min(i.hx, h)),
    d = Math.max(-i.hz, Math.min(i.hz, f)),
    p = h - u,
    m = f - d,
    g = Math.hypot(p, m);
  if (g > 1e-6) {
    if (g >= s) return null;
    let y = (s - g) / g;
    return [(a * p + l * m) * y, (r * p + c * m) * y];
  }
  let b = i.hx - Math.abs(h),
    x = i.hz - Math.abs(f);
  if (b < x) {
    let y = h >= 0 ? 1 : -1;
    return [a * y * (b + s), r * y * (b + s)];
  }
  let v = f >= 0 ? 1 : -1;
  return [l * v * (x + s), c * v * (x + s)];
}
function tb(i, t, e, s) {
  let n = t - i.x,
    o = e - i.z,
    a = n * i.fx + o * i.fz,
    r = n * i.fz - o * i.fx,
    l = Math.max(-i.hl, Math.min(i.hl, a)),
    c = Math.max(-i.hw, Math.min(i.hw, r)),
    h = a - l,
    f = r - c,
    u = Math.hypot(h, f);
  if (u > 1e-6) {
    if (u >= s) return null;
    let g = (s - u) / u;
    return [(i.fx * h + i.fz * f) * g, (i.fz * h - i.fx * f) * g];
  }
  let d = i.hl - Math.abs(a),
    p = i.hw - Math.abs(r);
  if (p < d) {
    let g = r >= 0 ? 1 : -1;
    return [i.fz * g * (p + s), -i.fx * g * (p + s)];
  }
  let m = a >= 0 ? 1 : -1;
  return [i.fx * m * (d + s), i.fz * m * (d + s)];
}
function vS(i, t, e, s, n, o) {
  let a = (S, w) => {
      let z = S - i.x,
        _ = w - i.z;
      return [z * i.fx + _ * i.fz, z * i.fz - _ * i.fx];
    },
    [r, l] = a(t, e),
    [c, h] = a(s, n),
    f = i.hl + o,
    u = i.hw + o,
    d = 0,
    p = 1,
    m = c - r,
    g = h - l;
  for (let [S, w, z] of [
    [r, m, f],
    [l, g, u],
  ]) {
    if (Math.abs(w) < 1e-9) {
      if (Math.abs(S) > z) return null;
      continue;
    }
    let _ = (-z - S) / w,
      R = (z - S) / w;
    if (
      (_ > R && ([_, R] = [R, _]),
      (d = Math.max(d, _)),
      (p = Math.min(p, R)),
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
    x = null,
    v = 1e18;
  for (let [S, w] of b) {
    let z = Math.hypot(S - r, w - l) + Math.hypot(c - S, h - w),
      _ = [(S + r) / 2, (w + l) / 2];
    (Math.abs(_[0]) < f * 0.98 && Math.abs(_[1]) < u * 0.98) ||
      (z < v && ((v = z), (x = [S, w])));
  }
  if (!x) return null;
  let [y, M] = x;
  return [i.x + i.fx * y + i.fz * M, i.z + i.fz * y - i.fx * M];
}
