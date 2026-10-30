// app 153 — math
// Lines 95786-96072 of readable/app.pretty.js (statement-aligned).
function z$(o) {
  let t = {},
    e = {},
    s = 0;
  for (let n of o.juns) {
    if (!n.rings.length || !n.legs.some(([l]) => l.elev)) continue;
    let i =
        n.legs.length >= 3 &&
        n.legs.every(
          ([l]) => !l.hwy && !l.inner && l.name && l.name === n.legs[0][0].name,
        ),
      a = (l) => Rw(l) || (l.custom && l.hwy);
    if (
      (n.bridgeJoin ||
        i ||
        (n.legs.every(([l]) => a(l)) && n.legs.some(([l]) => l.elev))) &&
      xmt(n)
    ) {
      ((n.plate = !0), (n.flat = !1), s++);
      continue;
    }
    let r = n.legs
      .filter(([l]) => !l.inner && l.L > 0.5)
      .map(([l, c]) => {
        let h = c === "a" ? l.s0 : l.s1;
        return (
          Ot(l, h, t),
          {
            E: l,
            end: c,
            s: h,
            x: t.x,
            z: t.z,
            y: t.y,
            dx: t.dx,
            dz: t.dz,
            nx: t.nx,
            nz: t.nz,
            w: t.w,
          }
        );
      });
    for (let l of n.rings)
      for (let c = 0; c < l.y.length; c++) {
        let h = l.pts[c * 2],
          f = l.pts[c * 2 + 1],
          u = null,
          d = 1e9;
        for (let m of r) {
          let g = h - m.x,
            b = f - m.z,
            v = Math.abs(g * m.dx + b * m.dz),
            x = Math.abs(g * m.nx + b * m.nz);
          v < 0.2 &&
            x < m.w + 0.35 &&
            v + Math.max(0, x - m.w) < d &&
            ((d = v + Math.max(0, x - m.w)), (u = m));
        }
        if (u) {
          u.E.elev && (l.y[c] = u.y);
          continue;
        }
        if (!n.legs.every(([m]) => m.elev)) continue;
        let p = null;
        d = 1e9;
        for (let m of r) {
          ys(m.E, h, f, e);
          let g = e.s;
          ((g = m.end === "a" ? Math.min(g, m.s) : Math.max(g, m.s)),
            Ot(m.E, g, t));
          let b = Math.hypot(h - t.x, f - t.z) - t.w;
          b < d && ((d = b), (p = t.y));
        }
        p !== null && (l.y[c] = p);
      }
    ((n.plate = !0), (n.flat = !1), s++);
  }
  return s;
}
function _$(o) {
  let t = 0,
    e = (s, n, i) => {
      let a = n === "a" ? 0 : s.n - 2,
        r = s.D[a * 2],
        l = s.D[a * 2 + 1];
      return (n === "a") === !i ? [r, l] : [-r, -l];
    };
  for (let s of o.juns) {
    if (s.legs.length !== 2 || s.polys.length) continue;
    let [[n, i], [a, r]] = s.legs;
    if (!(
      n === a ||
      n.inner ||
      a.inner ||
      (!n.layered && !a.layered) ||
      !(n.layered || Rw(n)) ||
      !(a.layered || Rw(a)) ||
      n.n < 2 ||
      a.n < 2
    )) {
      for (let [l, c, h, f] of [
        [n, i, a, r],
        [a, r, n, i],
      ]) {
        if (!h.custom || l.custom || l.n < 3) continue;
        let u = c === "a" ? 0 : l.n - 1,
          d = f === "a" ? 0 : h.n - 1,
          p = Math.hypot(
            h.P[d * 3] - l.P[u * 3],
            h.P[d * 3 + 1] - l.P[u * 3 + 1],
          );
        if (p < 0.01 || p > 1.5) continue;
        let m = Float32Array.from(l.P);
        ((m[u * 3] = h.P[d * 3]), (m[u * 3 + 1] = h.P[d * 3 + 1]));
        let g = l.ta,
          b = l.tb;
        ((l.P = m),
          Tr(l),
          (l._gb = null),
          (l.ta = g),
          (l.tb = b),
          (l.s0 = g),
          (l.s1 = l.L - b));
      }
      for (let [l, c, h, f] of [
        [n, i, a, r],
        [a, r, n, i],
      ]) {
        if (!h.custom || l.custom || l.n < 2) continue;
        let u = c === "a" ? 0 : l.n - 1,
          d = f === "a" ? 0 : h.n - 1,
          p = h.P[d * 3 + 2];
        if (Math.abs(p - l.P[u * 3 + 2]) > 0.3) continue;
        let m = {};
        Ot(h, f === "a" ? Math.min(h.L, 5) : Math.max(0, h.L - 5), m);
        let g = -(m.y - p) / 5,
          b = Math.min(40, l.L / 2),
          v = c === "a" ? b : l.L - b;
        Ot(l, v, m);
        let x = m.y;
        Ot(l, c === "a" ? v + 2 : v - 2, m);
        let y = (m.y - x) / 2;
        for (let M = 0; M < l.n; M++) {
          let S = c === "a" ? l.S[M] : l.L - l.S[M];
          if (S >= b) continue;
          let w = S / b;
          l.P[M * 3 + 2] =
            (2 * w ** 3 - 3 * w ** 2 + 1) * p +
            (w ** 3 - 2 * w ** 2 + w) * b * g +
            (-2 * w ** 3 + 3 * w ** 2) * x +
            (w ** 3 - w ** 2) * b * y;
        }
      }
      for (let [l, c, h, f] of [
        [n, i, a, r],
        [a, r, n, i],
      ]) {
        let u = c === "b" ? e(l, c, !0) : e(l, c, !1),
          d = c === "b" ? e(h, f, !1) : e(h, f, !0),
          p = -(u[1] + d[1]),
          m = u[0] + d[0],
          g = Math.hypot(p, m);
        if (g < 1e-6) continue;
        ((p /= g), (m /= g));
        let b =
            c === "b"
              ? [-l.D[(l.n - 2) * 2 + 1], l.D[(l.n - 2) * 2]]
              : [-l.D[1], l.D[0]],
          v = p * b[0] + m * b[1];
        if (v < 0.85) continue;
        let x = c === "a" ? 0 : l.n - 1;
        ((l.M[x * 2] = p / v),
          (l.M[x * 2 + 1] = m / v),
          ((l.mit ||= [!1, !1])[c === "a" ? 0 : 1] = !0),
          t++);
      }
    }
  }
  return t;
}
function E$(o, t) {
  if (!t?.h) return 0;
  let e = {},
    s = 0,
    n = t.x0 + (t.nx - 1) * t.step,
    i = t.z0 + (t.nz - 1) * t.step,
    a = (r, l, c) => {
      let h = Math.floor((r - t.x0) / t.step),
        f = Math.floor((l - t.z0) / t.step);
      for (let u = f; u <= f + 1; u++)
        for (let d = h; d <= h + 1; d++) {
          if (d < 0 || u < 0 || d >= t.nx || u >= t.nz) continue;
          let p = u * t.nx + d;
          t.h[p] > c && ((t.h[p] = c), s++);
        }
    };
  for (let r of o.edges) {
    if (!r.elev || r.inner || r.tunnel || r.tunnelR || r.n < 2) continue;
    let l = 1e9,
      c = 1e9,
      h = -1e9,
      f = -1e9;
    for (let u = 0; u < r.n; u++)
      ((l = Math.min(l, r.P[u * 3])),
        (h = Math.max(h, r.P[u * 3])),
        (c = Math.min(c, r.P[u * 3 + 1])),
        (f = Math.max(f, r.P[u * 3 + 1])));
    if (!(h < t.x0 - 20 || l > n + 20 || f < t.z0 - 20 || c > i + 20))
      for (let u = 0; u <= r.L; u += 1) {
        if (
          (Ot(r, u, e),
          e.x < t.x0 - 8 || e.x > n + 8 || e.z < t.z0 - 8 || e.z > i + 8)
        )
          continue;
        let d = e.w + 0.6;
        for (let p = -d; p <= d + 0.01; p += 1)
          a(e.x + e.nx * p, e.z + e.nz * p, e.y - 0.35);
      }
  }
  for (let r of o.dropped || []) r.underpass && r.region && (s += w$(t, r, o));
  return s;
}
function T$(o) {
  let t = 0;
  for (let e of o.juns) {
    if (e.legs.length !== 1) continue;
    let [s, n] = e.legs[0];
    if (!s.elev || s.inner || s.custom || s.tunnel || s.tunnelR || s.n < 2)
      continue;
    let i = null,
      a = 1;
    for (let p of o.juns) {
      if (p === e || !p.legs.length || p.legs.some(([g]) => g.elev || g === s))
        continue;
      let m = Math.hypot(p.x - e.x, p.z - e.z);
      m < a && ((a = m), (i = p));
    }
    if (!i) continue;
    let r = n === "a" ? 0 : s.n - 1,
      l = i.y - s.P[r * 3 + 2];
    if (Math.abs(l) > 3) continue;
    let c = 0;
    for (let [p, m] of i.legs) c = Math.max(c, m === "a" ? p.ta : p.tb);
    let h = Float32Array.from(s.P);
    ((h[r * 3] = i.x), (h[r * 3 + 1] = i.z));
    let f = s.ta,
      u = s.tb;
    (n === "a" ? (f = Math.max(f, c)) : (u = Math.max(u, c)),
      (s.P = h),
      Tr(s),
      (s._gb = null),
      (s.ta = f),
      (s.tb = u),
      (s.s0 = f),
      (s.s1 = s.L - u));
    let d = Math.min(s.L, Math.max(10, Math.abs(l) / 0.08));
    for (let p = 0; p < s.n; p++) {
      let m = n === "a" ? s.S[p] : s.L - s.S[p];
      m < d && (s.P[p * 3 + 2] += l * $u(1 - m / d));
    }
    (n === "a" ? (s.ja = i.id) : (s.jb = i.id),
      i.legs.push([s, n]),
      (i.bridgeJoin = !0),
      (e.legs = []),
      (e.rings = []),
      (e.polys = []),
      t++);
  }
  for (let e of o.edges)
    e.elev ||
      e.inner ||
      !e.hwy ||
      e.custom ||
      e.tunnel ||
      e.L >= 3 ||
      e.ja < 0 ||
      e.jb < 0 ||
      ([e.ja, e.jb].every((s) =>
        o.juns[s].legs.some(([n]) => n !== e && n.elev && !n.inner),
      ) &&
        ((e.elev = !0),
        (e.layered = !0),
        (e.flags |= 64),
        e.layer < 1 && (e.layer = 1),
        t++));
  return t;
}
