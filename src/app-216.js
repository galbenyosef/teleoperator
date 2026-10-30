// app 216 — math
// Lines 115669-116009 of readable/app.pretty.js (statement-aligned).
function Lx(o, t = !0) {
  if (!IY) return null;
  let e = new ko().load(_xt + o, void 0, void 0, () =>
    console.warn("lombard_gg: missing texture", o),
  );
  return (
    (e.flipY = !1),
    (e.colorSpace = t ? Je : Nn),
    (e.anisotropy = 8),
    (e.wrapS = e.wrapT = oi),
    e
  );
}
var UL = { y: 1e9, albedo: 0.05, color: new It(1, 1, 1) };
function Ext(o, t) {
  let e = o.geometry;
  (e.computeBoundingBox(), e.computeBoundingSphere());
  let s = e.boundingBox,
    n = new Tf((s.min.x + s.max.x) / 2, s.max.y, (s.min.z + s.max.z) / 2);
  (e.translate(-n.x, -n.y, -n.z),
    e.computeBoundingSphere(),
    e.computeBoundingBox(),
    o.position.copy(n),
    o.updateMatrix());
  let i = new ye(e, o.material);
  ((i.name = o.name + "_planar"),
    i.position.copy(n),
    (i.matrixAutoUpdate = !1),
    i.updateMatrix(),
    (i.castShadow = !1),
    (i.receiveShadow = !0),
    (i.visible = !1),
    (i.userData.mbPlanar = { r: t }));
  let a = t * 0.85 + e.boundingSphere.radius,
    r = (f, u) =>
      globalThis.SF_TIER !== "mobile" &&
      globalThis.SF_TIER !== "safe" &&
      !globalThis.SF_LITE &&
      (globalThis.SF_Q === "high" || globalThis.SF_Q === "ultra") &&
      f?.planarEnabled !== !1 &&
      !!u &&
      Math.hypot(u.position.x - n.x, u.position.z - n.z) < a &&
      u.position.y > n.y - 0.5;
  o.onBeforeRender = (f, u, d) => {
    r(f, d) && ((o.visible = !1), (i.visible = !0));
  };
  let l = 0,
    c = 0,
    h = (f) => {
      ((c = 0),
        f._bounceFloor === UL &&
          (performance.now() - l > 400
            ? (f._bounceFloor = null)
            : (c = setTimeout(h, 500, f))));
    };
  return (
    (i.onBeforeRender = (f, u, d) => {
      if (!r(f, d)) {
        ((i.visible = !1),
          (o.visible = !0),
          f && f._bounceFloor === UL && (f._bounceFloor = null));
        return;
      }
      f &&
        (f._bounceFloor || (f._bounceFloor = UL),
        (l = performance.now()),
        c || (c = setTimeout(h, 500, f)));
    }),
    i
  );
}
function Ix(o) {
  let t = {
    ground: Lx("ground.webp"),
    groundN: Lx("ground_n.webp", !1),
    wall: Lx("wall.webp"),
    wallN: Lx("wall_n.webp", !1),
    foliage: Lx("foliage.webp"),
    elev: Lx("elev.webp"),
  };
  t.foliage && (t.foliage.wrapS = t.foliage.wrapT = so);
  let e = (h = {}) =>
      new me({
        color: 16777215,
        roughness: 0.8,
        metalness: 0,
        vertexColors: !0,
        ...h,
      }),
    s = (h, f = {}, u = null, d = !0) => {
      let p = e(f);
      return (
        (p.userData.mbAlbedo = h),
        u && (p.userData.mbExtraMap = u),
        d && ((p.userData.dayGlow = 0), o.night.push(p)),
        p
      );
    },
    n = {
      ground: s(SY, { map: t.ground }, t.groundN),
      wall: s(kY, { map: t.wall }, t.wallN),
      walllit: s(CY, { map: t.wall }, t.wallN),
      elev: s(zY, { map: t.elev }),
      orange: s(EY, { fog: !1 }),
      gpaint: s(AY, { fog: !1 }),
      glow: s(RY, { fog: !1 }),
      water: s(PY),
      paint: e({ roughness: 0.6 }),
      metal: e({ roughness: 0.4, metalness: 0.7 }),
      foliage: e({ map: t.foliage, alphaTest: 0.5, side: ls, roughness: 0.85 }),
      tree: e({ roughness: 0.95 }),
    };
  t.foliage || (n.foliage.map = null);
  let i = new Map(),
    a = new Map(),
    r = (h, f) => {
      let u = h + "|" + f,
        d = i.get(u);
      return (d || i.set(u, (d = new Be())), d);
    },
    l = [],
    c = {
      M: n,
      G: r,
      T: t,
      planar: a,
      frame: null,
      inst(h, f, u, d, { shadow: p = !0 } = {}) {
        if (c.frame) {
          let m = c.frame.matrix();
          d = d.map(([g, b]) => [g.clone().premultiply(m), b]);
        }
        d.length && l.push({ name: h, geo: f, mat: u, list: d, shadow: p });
      },
      finish() {
        for (let [f, u] of i) {
          if (u.empty) continue;
          let [d, p] = f.split("|"),
            m = new ye(u.geometry(!0), n[p]);
          ((m.name = `lgg_${d}_${p}`),
            (m.castShadow = !/ground|water|glow/.test(p) && !/far/.test(d)),
            (m.receiveShadow = !0),
            (m.matrixAutoUpdate = !1),
            m.updateMatrix(),
            o.group.add(m),
            a.has(f) && IY && o.group.add(Ext(m, a.get(f))));
        }
        (i.clear(), a.clear());
        let h = new It();
        for (let { name: f, geo: u, mat: d, list: p, shadow: m } of l) {
          let g = new En(u, typeof d == "string" ? n[d] : d, p.length);
          (p.forEach(([b, v], x) => {
            (g.setMatrixAt(x, b),
              g.setColorAt(
                x,
                v ? h.setRGB(v[0], v[1], v[2]) : h.setRGB(1, 1, 1),
              ));
          }),
            (g.instanceMatrix.needsUpdate = !0),
            (g.instanceColor.needsUpdate = !0),
            g.computeBoundingSphere(),
            (g.castShadow = m),
            (g.receiveShadow = !0),
            (g.name = "lgg_" + f),
            (g.matrixAutoUpdate = !1),
            g.updateMatrix(),
            o.group.add(g));
        }
        l.length = 0;
      },
    };
  return c;
}
var Txt = he[0] - ps[0].hw - ps[0].sw,
  Rxt = pe[ks - 1] + ns[ks - 1].hw + ns[ks - 1].sw,
  LY = new Map();
function Ei(o, t) {
  if (hR()) return Vo(o, t);
  let e, s, n;
  if (o >= -7600 && o <= Txt && t >= -1e3 && t <= Rxt + 1700)
    ((e = -7600), (s = -1e3), (n = 25));
  else if (o >= -1e4 && o <= -1200 && t >= -7400 && t <= -1900)
    ((e = -1e4), (s = -7400), (n = 50));
  else return Vo(o, t);
  let i = Math.floor((o - e) / n),
    a = Math.floor((t - s) / n),
    r = (o - e) / n - i,
    l = (t - s) / n - a,
    c = (p, m) => {
      let g = (n === 25 ? 0 : 1e9) + p * 100003 + m,
        b = LY.get(g);
      return (b === void 0 && LY.set(g, (b = Vo(e + p * n, s + m * n))), b);
    },
    h = c(i, a),
    f = c(i + 1, a),
    u = c(i + 1, a + 1),
    d = c(i, a + 1);
  return r >= l ? h + (f - h) * r + (u - f) * l : h + (u - d) * r + (d - h) * l;
}
function Fx(o, t, e = 6) {
  hR() && (e = Math.min(e, 2));
  let s = (Vo(o + e, t) - Vo(o - e, t)) / (2 * e),
    n = (Vo(o, t + e) - Vo(o, t - e)) / (2 * e),
    i = Math.hypot(s, 1, n);
  return [-s / i, 1 / i, -n / i];
}
function ci(o, t, e, s, n, i) {
  let a = new Tf(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new Tf(1, 0, 0) : new Tf(0, 1, 0),
    c = new Tf().crossVectors(a, l).normalize(),
    h = new Tf().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    o.quad(
      u[p],
      u[m],
      d[m],
      d[p],
      [0, 0],
      [p % 2 ? n : s, 0],
      [p % 2 ? n : s, r],
      [0, r],
      i,
    );
  }
}
function Ge(o, t, e, s, n, i, a, r, l, c, h = [1, 1, 1, 1, 1, 0]) {
  let f = -n,
    u = s,
    d = (g, b, v) => [t + s * i * g + f * a * b, v, e + n * i * g + u * a * b],
    p = l - r,
    m = (g, b, v, x, y, M) =>
      o.quad(g, b, v, x, [0, r], [y, r], [y, r + M], [0, r + M], c);
  if (
    (h[0] && m(d(-1, -1, r), d(-1, 1, r), d(-1, 1, l), d(-1, -1, l), 2 * a, p),
    h[1] && m(d(1, 1, r), d(1, -1, r), d(1, -1, l), d(1, 1, l), 2 * a, p),
    h[2] && m(d(1, -1, r), d(-1, -1, r), d(-1, -1, l), d(1, -1, l), 2 * i, p),
    h[3] && m(d(-1, 1, r), d(1, 1, r), d(1, 1, l), d(-1, 1, l), 2 * i, p),
    h[4])
  ) {
    let g = d(-1, -1, l),
      b = d(-1, 1, l),
      v = d(1, 1, l),
      x = d(1, -1, l);
    o.quad(
      g,
      b,
      v,
      x,
      [g[0], g[2]],
      [b[0], b[2]],
      [v[0], v[2]],
      [x[0], x[2]],
      c,
      [0, 1, 0],
    );
  }
  if (h[5]) {
    let g = d(-1, -1, r),
      b = d(1, -1, r),
      v = d(1, 1, r),
      x = d(-1, 1, r);
    o.quad(
      g,
      b,
      v,
      x,
      [g[0], g[2]],
      [b[0], b[2]],
      [v[0], v[2]],
      [x[0], x[2]],
      c,
      [0, -1, 0],
    );
  }
}
function $s(o, t, e, s, n, i, a, r, l, c, h) {
  let f = e[0] - t[0],
    u = e[1] - t[1],
    d = e[2] - t[2],
    p = n[0] - t[0],
    m = n[1] - t[1],
    g = n[2] - t[2],
    b = u * g - d * m,
    v = d * p - f * g,
    x = f * m - u * p;
  b * h[0] + v * h[1] + x * h[2] >= 0
    ? o.quad(t, e, s, n, i, a, r, l, c, h)
    : o.quad(t, n, s, e, i, l, r, a, c, h);
}
function To(o, t, e, s, n, i, a = 0, r = Math.PI * 2, l = !0) {
  let c = o.v,
    h = 0,
    f = [0];
  for (let d = 1; d < s.length; d++)
    ((h += Math.hypot(s[d][0] - s[d - 1][0], s[d][1] - s[d - 1][1])),
      f.push(h));
  for (let d = 0; d <= n; d++) {
    let p = a + (r * d) / n,
      m = Math.cos(p),
      g = Math.sin(p);
    for (let b = 0; b < s.length; b++) {
      let [v, x] = s[b],
        y = Math.max(0, b - 1),
        M = Math.min(s.length - 1, b + 1),
        S = s[M][0] - s[y][0],
        w = s[M][1] - s[y][1],
        _ = Math.hypot(S, w) || 1,
        z = w / _,
        A = -S / _;
      o.vert(
        t + m * v,
        x,
        e + g * v,
        m * z,
        A,
        g * z,
        p * Math.max(v, 0.3),
        f[b],
        i,
      );
    }
  }
  let u = s.length;
  for (let d = 0; d < n; d++)
    for (let p = 0; p + 1 < u; p++) {
      let m = c + d * u + p,
        g = m + u;
      (o.tri(m, m + 1, g + 1), o.tri(m, g + 1, g));
    }
}
