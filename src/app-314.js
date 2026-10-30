// app 314 — math
// Lines 150988-151285 of readable/app.pretty.js (statement-aligned).
function X_(o) {
  if (o.g) return !0;
  if (!Rwt(o.g0)) return !1;
  let t = new Le();
  for (let i in o.g0.attributes) {
    let a = o.g0.attributes[i];
    t.setAttribute(i, a.isInterleavedBufferAttribute ? a : a.clone());
  }
  (t.setAttribute("position", new Te(o.p0.slice(), 3)),
    t.setAttribute("normal", new Te(o.n0.slice(), 3)),
    o.g0.index && t.setIndex(o.g0.index.clone()));
  for (let i of o.g0.groups) t.addGroup(i.start, i.count, i.materialIndex);
  let { mbDropCpu: e, ...s } = o.g0.userData;
  ((t.userData = { ...s, mbPosOnly: !0 }),
    (t.boundingBox = o.g0.boundingBox?.clone() || null),
    (t.boundingSphere = o.g0.boundingSphere?.clone() || null));
  let n = o.p0.length / 3;
  if (o.scuff) {
    let i = new Float32Array(n * 4);
    for (let a = 0; a < n * 4; a += 4) i[a] = i[a + 1] = i[a + 2] = 1;
    t.setAttribute("color", new Te(i, 4));
  }
  return (
    (o.g = t),
    (o.o.geometry = t),
    (o.acc = new Float32Array(n)),
    n >= Ltt && (o.grid ||= Itt(o.p0)),
    !0
  );
}
function Awt(o, t = !1) {
  let e = o.geometry,
    s = e.attributes.position,
    n = e.attributes.normal;
  return { o, g0: e, g: null, p0: q_(s), n0: q_(n), acc: null, scuff: t };
}
function Utt(o) {
  if (o.adj) return o.adj;
  let t = o.g0.index && o.g0.index.array.length ? o.g0.index : o.g?.index,
    e = t ? t.array : null,
    s = o.p0.length / 3,
    n = ((e ? e.length : s) / 3) | 0,
    i = new Int32Array(s + 1),
    a = new Int32Array(n * 3);
  for (let l = 0; l < n * 3; l++) i[(e ? e[l] : l) + 1]++;
  for (let l = 0; l < s; l++) i[l + 1] += i[l];
  let r = i.slice(0, s);
  for (let l = 0; l < n * 3; l++) a[r[e ? e[l] : l]++] = (l / 3) | 0;
  return (o.adj = { I: e, start: i, tri: a });
}
function MO(o, t, e, s, n, i, a = V_) {
  let r = new dt(e.x, e.y ?? a, e.z).applyMatrix4(i),
    l = new dt(e.nx, e.ny || 0, e.nz).transformDirection(i).normalize(),
    c = new dt(0, 1, 0).transformDirection(i).normalize(),
    h = new dt(),
    f = new dt();
  (Math.abs(l.dot(c)) > 0.7
    ? (h.set(1, 0, 0).transformDirection(i),
      h.addScaledVector(l, -h.dot(l)).normalize())
    : h.crossVectors(c, l).normalize(),
    f.crossVectors(l, h).normalize(),
    f.dot(c) < -0.1 && f.negate());
  let u = new dt().setFromMatrixScale(i).x || 1,
    d = e.kind || "wall",
    p = (e.W ?? 0.85) * u,
    m = (e.F ?? 0.8) * u,
    g = (e.Z ?? 0.6) * u,
    b = p + m + g,
    v = t.g0.boundingBox || (t.g0.computeBoundingBox(), t.g0.boundingBox);
  if (
    v &&
    (r.x < v.min.x - b ||
      r.x > v.max.x + b ||
      r.z < v.min.z - b ||
      r.z > v.max.z + b ||
      r.y < v.min.y - b - 2 * u ||
      r.y > v.max.y + b + 2 * u)
  )
    return;
  let x = {
    q: t,
    c: r,
    dir: l,
    up: f,
    h,
    sc: u,
    kind: d,
    W: p,
    F: m,
    Z: g,
    lam: (e.lam ?? 0.15 + 0.12 * Math.min(1, s)) * u,
    dep: s * u,
    fold: Math.min(1, 0.6 / (e.Z ?? 0.6)),
    lim: xwt * u,
    scr: n,
    seed: e.seed || 1,
    touched: [],
  };
  if (t.p0.length < Ltt * 3) {
    o.push({ J: x, row: -1 });
    return;
  }
  let y = (t.grid ||= Itt(t.p0));
  ((x.gx0 = Math.max(0, Math.floor((r.x - b - y.x0) / e1))),
    (x.gx1 = Math.min(y.nx - 1, Math.floor((r.x + b - y.x0) / e1))));
  let M = Math.max(0, Math.floor((r.z - b - y.z0) / e1)),
    S = Math.min(y.nz - 1, Math.floor((r.z + b - y.z0) / e1));
  for (let w = M; w <= S; w++) o.push({ J: x, row: w });
  o.push({ J: x, row: -2, from: 0 });
}
var W_ = (o) =>
    (o.u0 ||= new Uint32Array(o.p0.buffer, o.p0.byteOffset, o.p0.length)),
  rr = { x: 0, y: 0, z: 0, push: 0, k: 0 };
function Rtt(o, t, e, s, n, i, a, r) {
  let l = e - o.c.x,
    c = s - o.c.y,
    h = n - o.c.z,
    f = o.dir,
    u = o.sc,
    d = l * f.x + c * f.y + h * f.z;
  if (d > o.Z || d < -0.4 * u) return !1;
  let p = Math.abs(l * o.h.x + c * o.h.y + h * o.h.z),
    m = (l * o.up.x + c * o.up.y + h * o.up.z) / u,
    g = 1;
  if (p > o.W) {
    let R = (p - o.W) / o.F;
    if (R >= 1) return !1;
    g = o.kind === "pole" ? (1 - R) ** 1.5 : 1 - R * R * (3 - 2 * R);
  }
  if (o.kind === "roof") {
    let R = Math.abs(m);
    if (R > 0.9) {
      if (R > 1.6) return !1;
      g *= 1 - (R - 0.9) / 0.7;
    }
  } else
    o.kind !== "pole" &&
      m > 0.45 &&
      (g *= Math.max(0.35, 1 - (m - 0.45) * 1.1));
  o.kind === "car" && m < -0.35 && (g *= Math.max(0.5, 1 + (m + 0.35) * 1.5));
  let b = d <= 0 ? 0 : d / o.Z,
    v = t * g,
    x = v * (1 - b) ** 1.6,
    y = d / o.lam + o.seed + 0.5 * Math.sin((p / u) * 4.3 + o.seed * 2.1),
    M = 1 - 4 * Math.abs(y - Math.floor(y) - 0.5),
    S =
      Math.sin(Math.PI * Math.min(1, Math.max(0, (d + 0.06 * u) / o.Z))) *
      (1 - 0.5 * b),
    w =
      Math.sin((e / u) * 6.1 + o.seed) *
      Math.sin((s / u) * 5.7 + (n / u) * 4.3 + o.seed * 1.3),
    _ = v * S * o.fold * (0.28 * (0.25 + 0.75 * M) + 0.07 * w),
    z = i * f.x + a * f.y + r * f.z,
    A = i - z * f.x,
    T = a - z * f.y,
    E = r - z * f.z;
  return (
    (rr.x = f.x * x + A * _),
    (rr.y = f.y * x + T * _),
    (rr.z = f.z * x + E * _),
    (rr.push = x),
    (rr.k = g * (1 - b)),
    !0
  );
}
function Gtt(o) {
  let { J: t, row: e } = o,
    { q: s } = t,
    n = s.p0,
    i = s.n0;
  if (e === -1) {
    if (!s.cen) {
      s.cen = [0, 0, 0];
      for (let S = 0; S < n.length; S += 3)
        ((s.cen[0] += n[S]), (s.cen[1] += n[S + 1]), (s.cen[2] += n[S + 2]));
      s.cen = s.cen.map((S) => S / (n.length / 3));
    }
    if (!Rtt(t, t.dep, s.cen[0], s.cen[1], s.cen[2], 0, 0, 0) || !X_(s)) return;
    let u = s.g.attributes.position.array,
      d = s.g.attributes.color?.array,
      p = Math.max(0, t.lim - (s.accR || 0)),
      m = rr.push > p ? p / rr.push : 1;
    s.accR = (s.accR || 0) + rr.push * m;
    let g = rr.x * m,
      b = rr.y * m,
      v = rr.z * m,
      x = t.scr * Math.min(1, rr.k * 1.6),
      y = new Uint32Array(u.buffer, u.byteOffset, u.length),
      M = W_(s);
    for (let S = 0, w = 0; S < u.length; S += 3, w++)
      ((u[S] += g),
        (y[S] = (y[S] & -8) | (M[S] & 7)),
        (u[S + 1] += b),
        (u[S + 2] += v),
        x > 0 &&
          d &&
          s.scuff &&
          (d[w * 4 + 3] = Math.min(1, d[w * 4 + 3] + x)));
    s.dirty = !0;
    return;
  }
  if (e === -2) return Pwt(o);
  let a = s.grid,
    r = !1,
    l,
    c,
    h,
    f;
  for (let u = t.gx0; u <= t.gx1; u++) {
    let d = u + e * a.nx,
      p = a.start[d + 1];
    for (let m = a.start[d]; m < p; m++) {
      let g = a.idx[m],
        b = g * 3;
      if (
        (s.wheels && W_(s)[b] & 7) ||
        !Rtt(t, t.dep, n[b], n[b + 1], n[b + 2], i[b], i[b + 1], i[b + 2])
      )
        continue;
      if (!r) {
        if (!X_(s)) return;
        ((r = !0),
          (l = s.g.attributes.position.array),
          (c = s.scuff ? s.g.attributes.color?.array : null),
          (h = new Uint32Array(l.buffer, l.byteOffset, l.length)),
          (f = W_(s)));
      }
      if (
        (t.scr > 0 &&
          c &&
          (c[g * 4 + 3] = Math.min(
            1,
            c[g * 4 + 3] + t.scr * Math.min(1, rr.k * 1.4),
          )),
        t.dep <= 0)
      )
        continue;
      let v = t.lim - s.acc[g];
      if (v <= 0) continue;
      let x = rr.push > v ? v / rr.push : 1;
      ((s.acc[g] += rr.push * x),
        (l[b] += rr.x * x),
        (h[b] = (h[b] & -8) | (f[b] & 7)),
        (l[b + 1] += rr.y * x),
        (l[b + 2] += rr.z * x),
        t.touched.push(g));
    }
  }
  r && (s.dirty = !0);
}
function Pwt(o) {
  let { J: t } = o,
    e = t.q,
    s = t.touched;
  if (!e.g || !s.length) return;
  let n = Utt(e),
    i = n.I,
    a = e.g.attributes.position.array,
    r = e.p0,
    l = e.n0,
    c = e.g.attributes.normal.array,
    h = Math.min(s.length, o.from + 6e3),
    f = (p, m, g) => {
      let b = (i ? i[m * 3] : m * 3) * 3,
        v = (i ? i[m * 3 + 1] : m * 3 + 1) * 3,
        x = (i ? i[m * 3 + 2] : m * 3 + 2) * 3,
        y = p[v] - p[b],
        M = p[v + 1] - p[b + 1],
        S = p[v + 2] - p[b + 2],
        w = p[x] - p[b],
        _ = p[x + 1] - p[b + 1],
        z = p[x + 2] - p[b + 2];
      ((g[0] += M * z - S * _),
        (g[1] += S * w - y * z),
        (g[2] += y * _ - M * w));
    },
    u = [0, 0, 0],
    d = [0, 0, 0];
  for (let p = o.from; p < h; p++) {
    let m = s[p],
      g = m * 3;
    u[0] = u[1] = u[2] = d[0] = d[1] = d[2] = 0;
    for (let _ = n.start[m]; _ < n.start[m + 1]; _++) {
      let z = n.tri[_];
      (f(a, z, u), f(r, z, d));
    }
    let b = Math.hypot(u[0], u[1], u[2]),
      v = Math.hypot(d[0], d[1], d[2]);
    if (b < 1e-12 || v < 1e-12) continue;
    let x = d[0] * l[g] + d[1] * l[g + 1] + d[2] * l[g + 2] < 0 ? -1 : 1,
      y = l[g] + x * (u[0] / b - d[0] / v),
      M = l[g + 1] + x * (u[1] / b - d[1] / v),
      S = l[g + 2] + x * (u[2] / b - d[2] / v),
      w = Math.hypot(y, M, S) || 1;
    ((c[g] = y / w), (c[g + 1] = M / w), (c[g + 2] = S / w));
  }
  if (((e.dirty = !0), h < s.length)) return { J: t, row: -2, from: h };
}
