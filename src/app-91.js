// app 91 — pts
// Lines 75864-76194 of readable/app.pretty.js (statement-aligned).
function Rk({
  lonlat: o = null,
  at: t = null,
  grid: e = [0, 0],
  bearing: s = null,
  rot: n = 0,
  dy: i = 0,
} = {}) {
  let [a, r] = o ? ji(o[0], o[1]) : t,
    l = s != null ? (s * Math.PI) / 180 : n,
    c = Math.cos(l),
    h = Math.sin(l),
    f = e[0],
    u = e[1];
  return {
    x0: a,
    z0: r,
    gx: f,
    gz: u,
    c,
    s: h,
    rot: l,
    dy: i,
    fwd: (p, m) => {
      let g = p - f,
        b = m - u;
      return [a + c * g - h * b, r + h * g + c * b];
    },
    inv: (p, m) => {
      let g = p - a,
        b = m - r;
      return [f + c * g + h * b, u - h * g + c * b];
    },
    vec: (p, m) => [c * p - h * m, h * p + c * m],
    ivec: (p, m) => [c * p + h * m, -h * p + c * m],
    prot: (p) => p - l,
    matrix: () =>
      new fe().set(
        c,
        0,
        -h,
        a - c * f + h * u,
        0,
        1,
        0,
        i,
        h,
        0,
        c,
        r - h * f - c * u,
        0,
        0,
        0,
        1,
      ),
  };
}
function Wb(o) {
  let t = (n, i) => {
      let a = o.probe(n, i);
      return a.road ? a.road.y : a.walk ? a.walk.y - o.CURB : o.terrainAt(n, i);
    },
    e = new Map(),
    s = (n, i) => {
      let a = Math.round(n * 64) * 4294967296 + Math.round(i * 64),
        r = e.get(a);
      return (
        r === void 0 && ((r = t(n, i)), e.size > 4e5 && e.clear(), e.set(a, r)),
        r
      );
    };
  return (n, i, a = null) => {
    let r = s(n, i);
    return (
      a &&
        ((a.dx = (s(n + 0.6, i) - s(n - 0.6, i)) / (2 * 0.6)),
        (a.dz = (s(n, i + 0.6) - s(n, i - 0.6)) / (2 * 0.6))),
      r
    );
  };
}
var mq = Be.prototype.vert,
  gq = Be.prototype.geometry,
  ah = null;
function xpt(o, t, e) {
  let s = o.p.a,
    n = o.nm.a,
    { c: i, s: a, x0: r, z0: l, gx: c, gz: h, dy: f } = e;
  for (let u = t; u < o.v; u++) {
    let d = s[u * 3] - c,
      p = s[u * 3 + 2] - h;
    ((s[u * 3] = r + i * d - a * p),
      (s[u * 3 + 1] += f),
      (s[u * 3 + 2] = l + a * d + i * p));
    let m = n[u * 3],
      g = n[u * 3 + 2];
    ((n[u * 3] = i * m - a * g), (n[u * 3 + 2] = a * m + i * g));
  }
}
function bq(o) {
  let t = ah,
    e = t.touched.get(o);
  e === void 0 || e >= o.v || (xpt(o, e, t.F), t.touched.set(o, o.v));
}
function vpt(...o) {
  return (
    ah && !ah.touched.has(this) && ah.touched.set(this, this.v),
    mq.apply(this, o)
  );
}
function ypt(o = !1) {
  let t = !1;
  ah && ah.touched.has(this) && (bq(this), (t = !0));
  let e = gq.call(this, o);
  return (t && (e.userData.lmFramed = !0), e);
}
function wpt(o, t) {
  let [e, s] = [t.c, t.s];
  if (o.t === "box") {
    let [n, i] = t.fwd((o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2),
      a = {
        ...o,
        t: "obb",
        x: n,
        z: i,
        hx: (o.x1 - o.x0) / 2,
        hz: (o.z1 - o.z0) / 2,
        c: e,
        s: -s,
      };
    return (delete a.x0, delete a.z0, delete a.x1, delete a.z1, a);
  }
  if (o.t === "obb") {
    let [n, i] = t.fwd(o.x, o.z);
    return { ...o, x: n, z: i, s: e * o.s - s * o.c, c: s * o.s + e * o.c };
  }
  if (o.t === "circ") {
    let [n, i] = t.fwd(o.x, o.z);
    return { ...o, x: n, z: i };
  }
  if (o.t === "poly") {
    let n = o.pts.map((l) => (Array.isArray(l) ? t.fwd(l[0], l[1]) : l)),
      i = null;
    if (!Array.isArray(o.pts[0])) {
      i = new Float64Array(o.pts.length);
      for (let l = 0; l < o.pts.length; l += 2) {
        let [c, h] = t.fwd(o.pts[l], o.pts[l + 1]);
        ((i[l] = c), (i[l + 1] = h));
      }
    }
    let a = i || n,
      r = [1e9, 1e9, -1e9, -1e9];
    for (let l = 0; l < (i ? i.length / 2 : n.length); l++) {
      let c = i ? i[l * 2] : n[l][0],
        h = i ? i[l * 2 + 1] : n[l][1];
      ((r[0] = Math.min(r[0], c)),
        (r[1] = Math.min(r[1], h)),
        (r[2] = Math.max(r[2], c)),
        (r[3] = Math.max(r[3], h)));
    }
    return { ...o, pts: a, bb: r };
  }
  return o;
}
var Mpt = (o) => {
  let t = !0;
  return (
    o.traverse((e) => {
      e.isMesh && !e.geometry?.userData?.lmFramed && (t = !1);
    }),
    t
  );
};
function Ak(o, t, e) {
  let s = t.F,
    n = new le();
  n.name = "lm_" + (t.name || "site");
  let i = {
      C: o.C ? (u, d) => o.C(...s.fwd(u, d)) : null,
      group: n,
      colliders: [],
      inst: [],
      mats: o.mats,
      night: o.night,
      TEX: o.tex,
      F: s,
      rc: o,
      site: t,
      real: !0,
    },
    a = (t.set || []).map(([u, d, p]) => {
      let m = u[d];
      return ((u[d] = p), [u, d, m]);
    }),
    r = o.ground;
  oR({
    ground: (u, d, p) => {
      let [m, g] = s.fwd(u, d),
        b = r(m, g, p);
      if (p) {
        let [v, x] = s.ivec(p.dx, p.dz);
        ((p.dx = v), (p.dz = x));
      }
      return b - s.dy;
    },
    surfaceAt: (u, d) => o.L.surfaceAt(...s.fwd(u, d)),
    driveHeight: (u, d, p) => {
      let [m, g] = s.fwd(u, d),
        b = o.L.driveHeight(m, g, p);
      if (p) {
        let [v, x] = s.ivec(p.dx, p.dz);
        ((p.dx = v), (p.dz = x));
      }
      return b - s.dy;
    },
  });
  let c = ah;
  ((ah = { F: s, touched: new Map() }),
    (Be.prototype.vert = vpt),
    (Be.prototype.geometry = ypt));
  let h = new Set(o.group.children);
  try {
    e(i);
  } catch (u) {
    console.error("landmark site", t.name, u);
  } finally {
    for (let u of ah.touched.keys()) bq(u);
    ((ah = c),
      ah || ((Be.prototype.vert = mq), (Be.prototype.geometry = gq)),
      oR(null));
    for (let [u, d, p] of a.reverse()) u[d] = p;
  }
  for (let u of o.group.children.slice()) h.has(u) || n.add(u);
  let f = n.children.filter((u) => !Mpt(u));
  if (f.length) {
    let u = new le();
    ((u.name = n.name + "_f"),
      (u.matrixAutoUpdate = !1),
      u.matrix.copy(s.matrix()),
      (u.matrixWorldNeedsUpdate = !0));
    for (let d of f) u.add(d);
    n.add(u);
  }
  for (let u of i.colliders) {
    let d = wpt(u, s);
    if (d.y1 === void 0 && o.ground) {
      let p = d.x ?? (d.bb ? (d.bb[0] + d.bb[2]) / 2 : 0),
        m = d.z ?? (d.bb ? (d.bb[1] + d.bb[3]) / 2 : 0),
        g = o.ground(p, m);
      ((d.y0 = g - 6), (d.y1 = g + 24));
    }
    o.colliders.push(d);
  }
  for (let u of i.inst) {
    let [d, p] = s.fwd(u.x, u.z);
    o.inst.push({ ...u, x: d, z: p, y: u.y + s.dy, rot: s.prot(u.rot || 0) });
  }
  if (n.children.length) {
    o.group.add(n);
    let [u, d] = s.fwd(s.gx, s.gz);
    o.sites.push({ group: n, x: t.cx ?? u, z: t.cz ?? d, cull: t.cull ?? 0 });
  }
  return n;
}
function Du(o) {
  return (
    o.claims ||
      (o.claims = {
        bSkip: new Uint8Array(o.bld.n),
        pSkip: new Uint8Array(o.props.n),
        list: [],
        done: !1,
      }),
    o.claims
  );
}
var Spt = (o) => (o && Array.isArray(o[0]) ? o.flat() : o),
  ow = null,
  aw = null;
function kpt(o) {
  if (aw && aw.D === o && aw.n === o.props.n) return aw.g;
  let t = o.props,
    e = new Map();
  for (let s = 0; s < t.n; s++) {
    let n =
        Math.floor(t.pf[s * 5] / 64) * 100003 +
        Math.floor(t.pf[s * 5 + 1] / 64),
      i = e.get(n);
    (i || e.set(n, (i = [])), i.push(s));
  }
  return ((aw = { D: o, g: e, n: t.n }), e);
}
function zpt(o) {
  if (ow && ow.D === o && ow.n === o.bld.n) return ow.a;
  let t = o.bld,
    e = new Float32Array(t.n * 4);
  for (let s = 0; s < t.n; s++) {
    let n = 1e9,
      i = 1e9,
      a = -1e9,
      r = -1e9,
      l = t.bRing[s];
    for (let c = t.rStart[l]; c < t.rStart[l + 1]; c++) {
      let h = t.pts[c * 2],
        f = t.pts[c * 2 + 1];
      (h < n && (n = h), h > a && (a = h), f < i && (i = f), f > r && (r = f));
    }
    e.set([n, i, a, r], s * 4);
  }
  return ((ow = { D: o, a: e, n: t.n }), e);
}
function _pt(o, t, e) {
  let s = o.bld,
    n = s.bRing[t],
    i = s.rStart[n],
    a = s.rStart[n + 1],
    r = 0,
    l = 0,
    c = 0,
    h = 0;
  for (let u = i; u < a; u++) {
    let d = s.pts[u * 2],
      p = s.pts[u * 2 + 1],
      m = u + 1 < a ? u + 1 : i,
      g = (d + s.pts[m * 2]) / 2,
      b = (p + s.pts[m * 2 + 1]) / 2;
    ((c += d), (h += p), (r += 2), rn(e, d, p) && l++, rn(e, g, b) && l++);
  }
  let f = a - i;
  return (rn(e, c / f, h / f) && (l += 2), (r += 2), l / r);
}
