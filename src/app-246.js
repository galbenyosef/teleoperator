// app 246 — math
// Lines 125028-125330 of readable/app.pretty.js (statement-aligned).
var CC = 320,
  U2t = 1800,
  dl = {
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
    set(i, t, e, s) {
      ((this.plan = i), (this.plants = t), (this.M = e), (this.centre = s));
    },
    dist(i, t) {
      let e = this.centre;
      return e ? Math.max(0, Math.hypot(i - e[0], t - e[1]) - 75) : 1e9;
    },
    start({
      scene: i,
      mobile: t = !1,
      pedTex: e = null,
      buildPlants: s = null,
      mb: n = null,
    }) {
      if (this.started || !this.plan || !this.M) return;
      this.started = !0;
      let o = performance.now(),
        a =
          typeof location < "u"
            ? new URLSearchParams(location.search)
            : new URLSearchParams(),
        r = this.plan.F.matrix(),
        l = (p, m, g, b) => {
          let x = new _e(p.geometry(!0), m);
          return (
            (x.name = g),
            (x.matrixAutoUpdate = !1),
            x.matrix.copy(r),
            (x.matrixWorldNeedsUpdate = !0),
            (x.castShadow = b),
            (x.receiveShadow = !0),
            x
          );
        },
        c = cK(this.plan, !1),
        h = cK(this.plan, !0),
        f = new ke();
      ((f.name = "LombardWalksNear"),
        f.add(
          l(c.g, this.M.wall, "lomb_walk", !0),
          l(c.gm, this.M.metal, "lomb_rail", !0),
        ));
      let u = new ke();
      ((u.name = "LombardWalksFar"),
        u.add(l(h.g, this.M.wall, "lomb_walk_far", !1)),
        (f.visible = u.visible = !1),
        i.add(f, u),
        (this.near = f),
        (this.far = u),
        a.has("nolwm") && ((f.visible = u.visible = !1), (this.noMesh = !0)),
        s &&
          this.plants?.length &&
          !a.has("nolwp") &&
          ((this.plantsRoot = s(this.plants.filter((p) => !(t && p.extra)))),
          (this.plantsRoot.name = "LombardPlants"),
          i.add(this.plantsRoot)),
        a.has("nolwc") ||
          ((this.crowd = D2t(this.plan, { max: t ? 10 : 20, map: e })),
          i.add(this.crowd.group)));
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
        ms: Math.round(performance.now() - o),
      }),
        (this.built = !0),
        (this.mb = n),
        console.log(
          `lombard walks: ${this.stats.tris} triangles, ${this.stats.plants} plants, ${this.stats.visitors} visitors, ${this.stats.ms} ms`,
        ));
    },
    yieldTo(i) {
      return !this.crowd ||
        !this.centre ||
        Math.abs(i.x - this.centre[0]) > 260 ||
        Math.abs(i.z - this.centre[1]) > 260
        ? 1e9
        : this.crowd.yieldTo(i);
    },
    update(i, t, e = null) {
      if (!this.built) return;
      let s = t.position.x,
        n = t.position.z,
        o = this.dist(s, n),
        a = this.near.visible ? o < CC + 30 : o < CC;
      ((this.near.visible = a && !this.noMesh),
        (this.far.visible = !a && o < U2t && !this.noMesh),
        this.plantsRoot &&
          (this.cullT -= i) < 0 &&
          ((this.cullT = 0.4),
          this.plantsRoot.userData.cull?.(s, n, 420, t.position.y),
          this.plantsRoot.userData.step?.()),
        o < CC
          ? this.crowd?.update(i, t, e)
          : this.crowd?.stats.drawn && this.crowd.update(i, t, e));
    },
  };
var G2t = [-2310, -760, -2140, -700],
  bK = 2.3,
  W2t = 0.22,
  q2t = 3,
  j2t = (i, t, e) => i > e[0] && i < e[2] && t > e[1] && t < e[3];
function xK(i) {
  let t = i.edges.filter(
    (s) =>
      s.name === "Lombard Street" &&
      s.oneway &&
      (() => {
        let n = Ot(s, s.L / 2, {});
        return j2t(n.x, n.z, G2t);
      })(),
  );
  if (!t.length) return [];
  let e = [t.reduce((s, n) => (s.P[0] < n.P[0] ? s : n))];
  for (; e.length < t.length;) {
    let s = e[e.length - 1],
      n = s.P[s.n * 3 - 3],
      o = s.P[s.n * 3 - 2],
      a = t.find(
        (r) => !e.includes(r) && Math.hypot(r.P[0] - n, r.P[1] - o) < 0.5,
      );
    if (!a) break;
    e.push(a);
  }
  return e;
}
function V2t(i) {
  for (let t of xK(i))
    if (!t._lombard) {
      t._lombard = !0;
      for (let e = 0; e < t.n; e++) {
        t.W[e] = Math.max(t.W[e], bK);
        let s = t.S[e],
          n = Math.min(1, Math.max(0, Math.min(s - t.s0, t.s1 - s) / q2t));
        t.P[e * 3 + 2] += W2t * n * n * (3 - 2 * n);
      }
    }
}
function $2t(i) {
  let t = xK(i.D);
  if (t.length < 1) return null;
  let e = [t[0].P[0], t[0].P[1]],
    s = t[t.length - 1],
    n = [s.P[s.n * 3 - 3], s.P[s.n * 3 - 2]],
    o = i.frame({
      at: e,
      grid: [0, 0],
      rot: Math.atan2(n[1] - e[1], n[0] - e[0]),
    }),
    a = Math.hypot(n[0] - e[0], n[1] - e[1]),
    r = [];
  for (let h of t)
    for (let f = r.length ? 1 : 0; f < h.n; f++)
      r.push(o.inv(h.P[f * 3], h.P[f * 3 + 1]));
  let l = [r[0]];
  for (let h = 1; h < r.length; h++) {
    let f = r[h - 1],
      u = r[h],
      d = Math.max(1, Math.ceil(Math.hypot(u[0] - f[0], u[1] - f[1]) / 0.3));
    for (let p = 1; p <= d; p++)
      l.push([f[0] + ((u[0] - f[0]) * p) / d, f[1] + ((u[1] - f[1]) * p) / d]);
  }
  let c = [];
  for (let h of i.D.edges) {
    if (t.includes(h) || h.inner) continue;
    let f = Ot(h, h.L / 2, {});
    if (Math.hypot(f.x - (e[0] + n[0]) / 2, f.z - (e[1] + n[1]) / 2) > 200)
      continue;
    let u = [],
      d = !1;
    for (let p = 0; p < h.n; p++) {
      let [m, g] = o.inv(h.P[p * 3], h.P[p * 3 + 1]);
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
  return { F: o, P: l, len: a, others: c, Es: t };
}
function pK(i, t, e) {
  let s = 1e9;
  for (let n = 0; n + 1 < i.length; n++) {
    let o = i[n],
      a = i[n + 1],
      r = a[0] - o[0],
      l = a[1] - o[1],
      c = r * r + l * l,
      h = Math.max(
        0,
        Math.min(1, ((t - o[0]) * r + (e - o[1]) * l) / (c || 1)),
      ),
      f = Math.hypot(t - o[0] - r * h, e - o[1] - l * h);
    f < s && (s = f);
  }
  return s;
}
function X2t(i, t = 7) {
  let s = new Map(),
    n = (a, r) => a * 7919 + r;
  for (let a = 0; a + 1 < i.length; a++) {
    let r = Math.floor(Math.min(i[a][0], i[a + 1][0]) / 2),
      l = Math.floor(Math.min(i[a][1], i[a + 1][1]) / 2),
      c = Math.floor(Math.max(i[a][0], i[a + 1][0]) / 2),
      h = Math.floor(Math.max(i[a][1], i[a + 1][1]) / 2);
    for (let f = r; f <= c; f++)
      for (let u = l; u <= h; u++) {
        let d = n(f, u),
          p = s.get(d);
        (p || s.set(d, (p = [])), p.push(a));
      }
  }
  let o = Math.ceil(t / 2);
  return (a, r) => {
    let l = Math.floor(a / 2),
      c = Math.floor(r / 2),
      h = t * t;
    for (let f = l - o; f <= l + o; f++)
      for (let u = c - o; u <= c + o; u++) {
        let d = s.get(n(f, u));
        if (d)
          for (let p of d) {
            let m = i[p],
              g = i[p + 1],
              b = g[0] - m[0],
              x = g[1] - m[1],
              v = b * b + x * x,
              y = Math.max(
                0,
                Math.min(1, ((a - m[0]) * b + (r - m[1]) * x) / (v || 1)),
              ),
              M = a - m[0] - b * y,
              S = r - m[1] - x * y,
              w = M * M + S * S;
            w < h && (h = w);
          }
      }
    return Math.sqrt(h);
  };
}
var ya = { xa: 9, xbFromEnd: 8.8, wN: -8.3, wS: 7.5, wNb: -11.6, wSb: 10.6 };
function K2t(i, t, e) {
  let s = [],
    n = i.D.bld,
    [o, a] = t.fwd(e / 2, 0),
    r = (e / 2 + 40) ** 2;
  for (let c = 0; c < n.n; c++) {
    let h = n.pts.subarray(
        n.rStart[n.bRing[c]] * 2,
        n.rStart[n.bRing[c] + 1] * 2,
      ),
      f = [];
    if ((h[0] - o) ** 2 + (h[1] - a) ** 2 > r) continue;
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
var mK = [];
