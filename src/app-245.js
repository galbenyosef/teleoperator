// app 245 — math
// Lines 125287-125589 of readable/app.pretty.js (statement-aligned).
var lI = 320,
  fvt = 1800,
  Fl = {
    plan: null,
    plants: null,
    M: null,
    near: null,
    far: null,
    crowd: null,
    plantsRoot: null,
    started: !1,
    built: !1,
    stats: {},
    cullT: 0,
    set(o, t, e, s) {
      ((this.plan = o), (this.plants = t), (this.M = e), (this.centre = s));
    },
    dist(o, t) {
      let e = this.centre;
      return e ? Math.max(0, Math.hypot(o - e[0], t - e[1]) - 75) : 1e9;
    },
    start({
      scene: o,
      mobile: t = !1,
      pedTex: e = null,
      buildPlants: s = null,
      mb: n = null,
    }) {
      if (this.started || !this.plan || !this.M) return;
      this.started = !0;
      let i = performance.now(),
        a =
          typeof location < "u"
            ? new URLSearchParams(location.search)
            : new URLSearchParams(),
        r = this.plan.F.matrix(),
        l = (p, m, g, b) => {
          let v = new ye(p.geometry(!0), m);
          return (
            (v.name = g),
            (v.matrixAutoUpdate = !1),
            v.matrix.copy(r),
            (v.matrixWorldNeedsUpdate = !0),
            (v.castShadow = b),
            (v.receiveShadow = !0),
            v
          );
        },
        c = uJ(this.plan, !1),
        h = uJ(this.plan, !0),
        f = new le();
      ((f.name = "LombardWalksNear"),
        f.add(
          l(c.g, this.M.wall, "lomb_walk", !0),
          l(c.gm, this.M.metal, "lomb_rail", !0),
        ));
      let u = new le();
      ((u.name = "LombardWalksFar"),
        u.add(l(h.g, this.M.wall, "lomb_walk_far", !1)),
        (f.visible = u.visible = !1),
        o.add(f, u),
        (this.near = f),
        (this.far = u),
        a.has("nolwm") && ((f.visible = u.visible = !1), (this.noMesh = !0)),
        s &&
          this.plants?.length &&
          !a.has("nolwp") &&
          ((this.plantsRoot = s(this.plants.filter((p) => !(t && p.extra)))),
          (this.plantsRoot.name = "LombardPlants"),
          o.add(this.plantsRoot)),
        a.has("nolwc") ||
          ((this.crowd = hvt(this.plan, { max: t ? 10 : 20, map: e })),
          o.add(this.crowd.group)));
      let d = 0;
      for (let p of [f, u])
        p.traverse((m) => {
          m.isMesh &&
            (d +=
              (m.geometry.index
                ? m.geometry.index.count
                : m.geometry.attributes.position.count) / 3);
        });
      ((this.stats = {
        tris: Math.round(d),
        plants: this.plants?.length || 0,
        visitors: this.crowd?.people.length || 0,
        ms: Math.round(performance.now() - i),
      }),
        (this.built = !0),
        (this.mb = n),
        console.log(
          `lombard walks: ${this.stats.tris} triangles, ${this.stats.plants} plants, ${this.stats.visitors} visitors, ${this.stats.ms} ms`,
        ));
    },
    yieldTo(o) {
      return !this.crowd ||
        !this.centre ||
        Math.abs(o.x - this.centre[0]) > 260 ||
        Math.abs(o.z - this.centre[1]) > 260
        ? 1e9
        : this.crowd.yieldTo(o);
    },
    update(o, t, e = null) {
      if (!this.built) return;
      let s = t.position.x,
        n = t.position.z,
        i = this.dist(s, n),
        a = this.near.visible ? i < lI + 30 : i < lI;
      ((this.near.visible = a && !this.noMesh),
        (this.far.visible = !a && i < fvt && !this.noMesh),
        this.plantsRoot &&
          (this.cullT -= o) < 0 &&
          ((this.cullT = 0.4),
          this.plantsRoot.userData.cull?.(s, n, 420, t.position.y),
          this.plantsRoot.userData.step?.()),
        i < lI
          ? this.crowd?.update(o, t, e)
          : this.crowd?.stats.drawn && this.crowd.update(o, t, e));
    },
  };
var uvt = [-2310, -760, -2140, -700],
  yJ = 2.3,
  dvt = 0.22,
  pvt = 3,
  mvt = (o, t, e) => o > e[0] && o < e[2] && t > e[1] && t < e[3];
function wJ(o) {
  let t = o.edges.filter(
    (s) =>
      s.name === "Lombard Street" &&
      s.oneway &&
      (() => {
        let n = Ot(s, s.L / 2, {});
        return mvt(n.x, n.z, uvt);
      })(),
  );
  if (!t.length) return [];
  let e = [t.reduce((s, n) => (s.P[0] < n.P[0] ? s : n))];
  for (; e.length < t.length;) {
    let s = e[e.length - 1],
      n = s.P[s.n * 3 - 3],
      i = s.P[s.n * 3 - 2],
      a = t.find(
        (r) => !e.includes(r) && Math.hypot(r.P[0] - n, r.P[1] - i) < 0.5,
      );
    if (!a) break;
    e.push(a);
  }
  return e;
}
function gvt(o) {
  for (let t of wJ(o))
    if (!t._lombard) {
      t._lombard = !0;
      for (let e = 0; e < t.n; e++) {
        t.W[e] = Math.max(t.W[e], yJ);
        let s = t.S[e],
          n = Math.min(1, Math.max(0, Math.min(s - t.s0, t.s1 - s) / pvt));
        t.P[e * 3 + 2] += dvt * n * n * (3 - 2 * n);
      }
    }
}
function bvt(o) {
  let t = wJ(o.D);
  if (t.length < 1) return null;
  let e = [t[0].P[0], t[0].P[1]],
    s = t[t.length - 1],
    n = [s.P[s.n * 3 - 3], s.P[s.n * 3 - 2]],
    i = o.frame({
      at: e,
      grid: [0, 0],
      rot: Math.atan2(n[1] - e[1], n[0] - e[0]),
    }),
    a = Math.hypot(n[0] - e[0], n[1] - e[1]),
    r = [];
  for (let h of t)
    for (let f = r.length ? 1 : 0; f < h.n; f++)
      r.push(i.inv(h.P[f * 3], h.P[f * 3 + 1]));
  let l = [r[0]];
  for (let h = 1; h < r.length; h++) {
    let f = r[h - 1],
      u = r[h],
      d = Math.max(1, Math.ceil(Math.hypot(u[0] - f[0], u[1] - f[1]) / 0.3));
    for (let p = 1; p <= d; p++)
      l.push([f[0] + ((u[0] - f[0]) * p) / d, f[1] + ((u[1] - f[1]) * p) / d]);
  }
  let c = [];
  for (let h of o.D.edges) {
    if (t.includes(h) || h.inner) continue;
    let f = Ot(h, h.L / 2, {});
    if (Math.hypot(f.x - (e[0] + n[0]) / 2, f.z - (e[1] + n[1]) / 2) > 200)
      continue;
    let u = [],
      d = !1;
    for (let p = 0; p < h.n; p++) {
      let [m, g] = i.inv(h.P[p * 3], h.P[p * 3 + 1]);
      (u.push([m, g]), m > 12 && m < a - 12 && Math.abs(g) < 14 && (d = !0));
    }
    d &&
      c.push({
        pts: u.filter(([p, m]) => Math.abs(m) < 40 || !0),
        r: h.W[0] + h.sw + 0.4,
        rw: h.W[0] + 0.3,
        name: h.name,
      });
  }
  return { F: i, P: l, len: a, others: c, Es: t };
}
function bJ(o, t, e) {
  let s = 1e9;
  for (let n = 0; n + 1 < o.length; n++) {
    let i = o[n],
      a = o[n + 1],
      r = a[0] - i[0],
      l = a[1] - i[1],
      c = r * r + l * l,
      h = Math.max(
        0,
        Math.min(1, ((t - i[0]) * r + (e - i[1]) * l) / (c || 1)),
      ),
      f = Math.hypot(t - i[0] - r * h, e - i[1] - l * h);
    f < s && (s = f);
  }
  return s;
}
function xvt(o, t = 7) {
  let s = new Map(),
    n = (a, r) => a * 7919 + r;
  for (let a = 0; a + 1 < o.length; a++) {
    let r = Math.floor(Math.min(o[a][0], o[a + 1][0]) / 2),
      l = Math.floor(Math.min(o[a][1], o[a + 1][1]) / 2),
      c = Math.floor(Math.max(o[a][0], o[a + 1][0]) / 2),
      h = Math.floor(Math.max(o[a][1], o[a + 1][1]) / 2);
    for (let f = r; f <= c; f++)
      for (let u = l; u <= h; u++) {
        let d = n(f, u),
          p = s.get(d);
        (p || s.set(d, (p = [])), p.push(a));
      }
  }
  let i = Math.ceil(t / 2);
  return (a, r) => {
    let l = Math.floor(a / 2),
      c = Math.floor(r / 2),
      h = t * t;
    for (let f = l - i; f <= l + i; f++)
      for (let u = c - i; u <= c + i; u++) {
        let d = s.get(n(f, u));
        if (d)
          for (let p of d) {
            let m = o[p],
              g = o[p + 1],
              b = g[0] - m[0],
              v = g[1] - m[1],
              x = b * b + v * v,
              y = Math.max(
                0,
                Math.min(1, ((a - m[0]) * b + (r - m[1]) * v) / (x || 1)),
              ),
              M = a - m[0] - b * y,
              S = r - m[1] - v * y,
              w = M * M + S * S;
            w < h && (h = w);
          }
      }
    return Math.sqrt(h);
  };
}
var Aa = { xa: 9, xbFromEnd: 8.8, wN: -8.3, wS: 7.5, wNb: -11.6, wSb: 10.6 };
function vvt(o, t, e) {
  let s = [],
    n = o.D.bld,
    [i, a] = t.fwd(e / 2, 0),
    r = (e / 2 + 40) ** 2;
  for (let c = 0; c < n.n; c++) {
    let h = n.pts.subarray(
        n.rStart[n.bRing[c]] * 2,
        n.rStart[n.bRing[c] + 1] * 2,
      ),
      f = [];
    if ((h[0] - i) ** 2 + (h[1] - a) ** 2 > r) continue;
    let u = !1;
    for (let d = 0; d < h.length; d += 2) {
      let p = t.inv(h[d], h[d + 1]);
      (f.push(p), p[0] > -5 && p[0] < e + 5 && Math.abs(p[1]) < 30 && (u = !0));
    }
    if (u)
      for (let d = 0; d < f.length; d++) s.push([f[d], f[(d + 1) % f.length]]);
  }
  let l = new Map();
  return (c, h) => {
    let f = Math.round(c * 4) * 2 + (h > 0 ? 1 : 0),
      u = l.get(f);
    if (u !== void 0) return u;
    u = 99;
    for (let [d, p] of s) {
      if ((d[0] - c) * (p[0] - c) > 0 || d[0] === p[0]) continue;
      let m = d[1] + ((p[1] - d[1]) * (c - d[0])) / (p[0] - d[0]);
      m * h > 2.5 && (u = Math.min(u, m * h));
    }
    return (l.set(f, u), u);
  };
}
var xJ = [];
