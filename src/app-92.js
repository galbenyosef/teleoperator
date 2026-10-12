// app 92 — pts
// Lines 75630-75960 of readable/app.pretty.js (statement-aligned).
function ES({
  lonlat: i = null,
  at: t = null,
  grid: e = [0, 0],
  bearing: s = null,
  rot: n = 0,
  dy: o = 0,
} = {}) {
  let [a, r] = i ? Gi(i[0], i[1]) : t,
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
    dy: o,
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
      new ye().set(
        c,
        0,
        -h,
        a - c * f + h * u,
        0,
        1,
        0,
        o,
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
function TS(i) {
  let t = (n, o) => {
      let a = i.probe(n, o);
      return a.road ? a.road.y : a.walk ? a.walk.y - i.CURB : i.terrainAt(n, o);
    },
    e = new Map(),
    s = (n, o) => {
      let a = Math.round(n * 64) * 4294967296 + Math.round(o * 64),
        r = e.get(a);
      return (
        r === void 0 && ((r = t(n, o)), e.size > 4e5 && e.clear(), e.set(a, r)),
        r
      );
    };
  return (n, o, a = null) => {
    let r = s(n, o);
    return (
      a &&
        ((a.dx = (s(n + 0.6, o) - s(n - 0.6, o)) / (2 * 0.6)),
        (a.dz = (s(n, o + 0.6) - s(n, o - 0.6)) / (2 * 0.6))),
      r
    );
  };
}
var dW = Ce.prototype.vert,
  pW = Ce.prototype.geometry,
  Pc = null;
function Jht(i, t, e) {
  let s = i.p.a,
    n = i.nm.a,
    { c: o, s: a, x0: r, z0: l, gx: c, gz: h, dy: f } = e;
  for (let u = t; u < i.v; u++) {
    let d = s[u * 3] - c,
      p = s[u * 3 + 2] - h;
    ((s[u * 3] = r + o * d - a * p),
      (s[u * 3 + 1] += f),
      (s[u * 3 + 2] = l + a * d + o * p));
    let m = n[u * 3],
      g = n[u * 3 + 2];
    ((n[u * 3] = o * m - a * g), (n[u * 3 + 2] = a * m + o * g));
  }
}
function mW(i) {
  let t = Pc,
    e = t.touched.get(i);
  e === void 0 || e >= i.v || (Jht(i, e, t.F), t.touched.set(i, i.v));
}
function Zht(...i) {
  return (
    Pc && !Pc.touched.has(this) && Pc.touched.set(this, this.v),
    dW.apply(this, i)
  );
}
function Qht(i = !1) {
  let t = !1;
  Pc && Pc.touched.has(this) && (mW(this), (t = !0));
  let e = pW.call(this, i);
  return (t && (e.userData.lmFramed = !0), e);
}
function tft(i, t) {
  let [e, s] = [t.c, t.s];
  if (i.t === "box") {
    let [n, o] = t.fwd((i.x0 + i.x1) / 2, (i.z0 + i.z1) / 2),
      a = {
        ...i,
        t: "obb",
        x: n,
        z: o,
        hx: (i.x1 - i.x0) / 2,
        hz: (i.z1 - i.z0) / 2,
        c: e,
        s: -s,
      };
    return (delete a.x0, delete a.z0, delete a.x1, delete a.z1, a);
  }
  if (i.t === "obb") {
    let [n, o] = t.fwd(i.x, i.z);
    return { ...i, x: n, z: o, s: e * i.s - s * i.c, c: s * i.s + e * i.c };
  }
  if (i.t === "circ") {
    let [n, o] = t.fwd(i.x, i.z);
    return { ...i, x: n, z: o };
  }
  if (i.t === "poly") {
    let n = i.pts.map((l) => (Array.isArray(l) ? t.fwd(l[0], l[1]) : l)),
      o = null;
    if (!Array.isArray(i.pts[0])) {
      o = new Float64Array(i.pts.length);
      for (let l = 0; l < i.pts.length; l += 2) {
        let [c, h] = t.fwd(i.pts[l], i.pts[l + 1]);
        ((o[l] = c), (o[l + 1] = h));
      }
    }
    let a = o || n,
      r = [1e9, 1e9, -1e9, -1e9];
    for (let l = 0; l < (o ? o.length / 2 : n.length); l++) {
      let c = o ? o[l * 2] : n[l][0],
        h = o ? o[l * 2 + 1] : n[l][1];
      ((r[0] = Math.min(r[0], c)),
        (r[1] = Math.min(r[1], h)),
        (r[2] = Math.max(r[2], c)),
        (r[3] = Math.max(r[3], h)));
    }
    return { ...i, pts: a, bb: r };
  }
  return i;
}
var eft = (i) => {
  let t = !0;
  return (
    i.traverse((e) => {
      e.isMesh && !e.geometry?.userData?.lmFramed && (t = !1);
    }),
    t
  );
};
function AS(i, t, e) {
  let s = t.F,
    n = new ke();
  n.name = "lm_" + (t.name || "site");
  let o = {
      C: i.C ? (u, d) => i.C(...s.fwd(u, d)) : null,
      group: n,
      colliders: [],
      inst: [],
      mats: i.mats,
      night: i.night,
      TEX: i.tex,
      F: s,
      rc: i,
      site: t,
      real: !0,
    },
    a = (t.set || []).map(([u, d, p]) => {
      let m = u[d];
      return ((u[d] = p), [u, d, m]);
    }),
    r = i.ground;
  CT({
    ground: (u, d, p) => {
      let [m, g] = s.fwd(u, d),
        b = r(m, g, p);
      if (p) {
        let [x, v] = s.ivec(p.dx, p.dz);
        ((p.dx = x), (p.dz = v));
      }
      return b - s.dy;
    },
    surfaceAt: (u, d) => i.L.surfaceAt(...s.fwd(u, d)),
    driveHeight: (u, d, p) => {
      let [m, g] = s.fwd(u, d),
        b = i.L.driveHeight(m, g, p);
      if (p) {
        let [x, v] = s.ivec(p.dx, p.dz);
        ((p.dx = x), (p.dz = v));
      }
      return b - s.dy;
    },
  });
  let c = Pc;
  ((Pc = { F: s, touched: new Map() }),
    (Ce.prototype.vert = Zht),
    (Ce.prototype.geometry = Qht));
  let h = new Set(i.group.children);
  try {
    e(o);
  } catch (u) {
    console.error("landmark site", t.name, u);
  } finally {
    for (let u of Pc.touched.keys()) mW(u);
    ((Pc = c),
      Pc || ((Ce.prototype.vert = dW), (Ce.prototype.geometry = pW)),
      CT(null));
    for (let [u, d, p] of a.reverse()) u[d] = p;
  }
  for (let u of i.group.children.slice()) h.has(u) || n.add(u);
  let f = n.children.filter((u) => !eft(u));
  if (f.length) {
    let u = new ke();
    ((u.name = n.name + "_f"),
      (u.matrixAutoUpdate = !1),
      u.matrix.copy(s.matrix()),
      (u.matrixWorldNeedsUpdate = !0));
    for (let d of f) u.add(d);
    n.add(u);
  }
  for (let u of o.colliders) {
    let d = tft(u, s);
    if (d.y1 === void 0 && i.ground) {
      let p = d.x ?? (d.bb ? (d.bb[0] + d.bb[2]) / 2 : 0),
        m = d.z ?? (d.bb ? (d.bb[1] + d.bb[3]) / 2 : 0),
        g = i.ground(p, m);
      ((d.y0 = g - 6), (d.y1 = g + 24));
    }
    i.colliders.push(d);
  }
  for (let u of o.inst) {
    let [d, p] = s.fwd(u.x, u.z);
    i.inst.push({ ...u, x: d, z: p, y: u.y + s.dy, rot: s.prot(u.rot || 0) });
  }
  if (n.children.length) {
    i.group.add(n);
    let [u, d] = s.fwd(s.gx, s.gz);
    i.sites.push({ group: n, x: t.cx ?? u, z: t.cz ?? d, cull: t.cull ?? 0 });
  }
  return n;
}
function sb(i) {
  return (
    i.claims ||
      (i.claims = {
        bSkip: new Uint8Array(i.bld.n),
        pSkip: new Uint8Array(i.props.n),
        list: [],
        done: !1,
      }),
    i.claims
  );
}
var sft = (i) => (i && Array.isArray(i[0]) ? i.flat() : i),
  hy = null,
  fy = null;
function nft(i) {
  if (fy && fy.D === i && fy.n === i.props.n) return fy.g;
  let t = i.props,
    e = new Map();
  for (let s = 0; s < t.n; s++) {
    let n =
        Math.floor(t.pf[s * 5] / 64) * 100003 +
        Math.floor(t.pf[s * 5 + 1] / 64),
      o = e.get(n);
    (o || e.set(n, (o = [])), o.push(s));
  }
  return ((fy = { D: i, g: e, n: t.n }), e);
}
function ift(i) {
  if (hy && hy.D === i && hy.n === i.bld.n) return hy.a;
  let t = i.bld,
    e = new Float32Array(t.n * 4);
  for (let s = 0; s < t.n; s++) {
    let n = 1e9,
      o = 1e9,
      a = -1e9,
      r = -1e9,
      l = t.bRing[s];
    for (let c = t.rStart[l]; c < t.rStart[l + 1]; c++) {
      let h = t.pts[c * 2],
        f = t.pts[c * 2 + 1];
      (h < n && (n = h), h > a && (a = h), f < o && (o = f), f > r && (r = f));
    }
    e.set([n, o, a, r], s * 4);
  }
  return ((hy = { D: i, a: e, n: t.n }), e);
}
function oft(i, t, e) {
  let s = i.bld,
    n = s.bRing[t],
    o = s.rStart[n],
    a = s.rStart[n + 1],
    r = 0,
    l = 0,
    c = 0,
    h = 0;
  for (let u = o; u < a; u++) {
    let d = s.pts[u * 2],
      p = s.pts[u * 2 + 1],
      m = u + 1 < a ? u + 1 : o,
      g = (d + s.pts[m * 2]) / 2,
      b = (p + s.pts[m * 2 + 1]) / 2;
    ((c += d), (h += p), (r += 2), en(e, d, p) && l++, en(e, g, b) && l++);
  }
  let f = a - o;
  return (en(e, c / f, h / f) && (l += 2), (r += 2), l / r);
}
