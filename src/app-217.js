// app 217 — math
// Lines 115413-115753 of readable/app.pretty.js (statement-aligned).
function $b(i, t = !0) {
  if (!PX) return null;
  let e = new go().load(s2t + i, void 0, void 0, () =>
    console.warn("lombard_gg: missing texture", i),
  );
  return (
    (e.flipY = !1),
    (e.colorSpace = t ? is : On),
    (e.anisotropy = 8),
    (e.wrapS = e.wrapT = ti),
    e
  );
}
var fC = { y: 1e9, albedo: 0.05, color: new $t(1, 1, 1) };
function n2t(i, t) {
  let e = i.geometry;
  (e.computeBoundingBox(), e.computeBoundingSphere());
  let s = e.boundingBox,
    n = new Kh((s.min.x + s.max.x) / 2, s.max.y, (s.min.z + s.max.z) / 2);
  (e.translate(-n.x, -n.y, -n.z),
    e.computeBoundingSphere(),
    e.computeBoundingBox(),
    i.position.copy(n),
    i.updateMatrix());
  let o = new _e(e, i.material);
  ((o.name = i.name + "_planar"),
    o.position.copy(n),
    (o.matrixAutoUpdate = !1),
    o.updateMatrix(),
    (o.castShadow = !1),
    (o.receiveShadow = !0),
    (o.visible = !1),
    (o.userData.mbPlanar = { r: t }));
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
  i.onBeforeRender = (f, u, d) => {
    r(f, d) && ((i.visible = !1), (o.visible = !0));
  };
  let l = 0,
    c = 0,
    h = (f) => {
      ((c = 0),
        f._bounceFloor === fC &&
          (performance.now() - l > 400
            ? (f._bounceFloor = null)
            : (c = setTimeout(h, 500, f))));
    };
  return (
    (o.onBeforeRender = (f, u, d) => {
      if (!r(f, d)) {
        ((o.visible = !1),
          (i.visible = !0),
          f && f._bounceFloor === fC && (f._bounceFloor = null));
        return;
      }
      f &&
        (f._bounceFloor || (f._bounceFloor = fC),
        (l = performance.now()),
        c || (c = setTimeout(h, 500, f)));
    }),
    o
  );
}
function Xb(i) {
  let t = {
    ground: $b("ground.webp"),
    groundN: $b("ground_n.webp", !1),
    wall: $b("wall.webp"),
    wallN: $b("wall_n.webp", !1),
    foliage: $b("foliage.webp"),
    elev: $b("elev.webp"),
  };
  t.foliage && (t.foliage.wrapS = t.foliage.wrapT = $i);
  let e = (h = {}) =>
      new Ee({
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
        d && ((p.userData.dayGlow = 0), i.night.push(p)),
        p
      );
    },
    n = {
      ground: s(yX, { map: t.ground }, t.groundN),
      wall: s(wX, { map: t.wall }, t.wallN),
      walllit: s(AX, { map: t.wall }, t.wallN),
      elev: s(MX, { map: t.elev }),
      orange: s(kX, { fog: !1 }),
      gpaint: s(EX, { fog: !1 }),
      glow: s(zX, { fog: !1 }),
      water: s(TX),
      paint: e({ roughness: 0.6 }),
      metal: e({ roughness: 0.4, metalness: 0.7 }),
      foliage: e({ map: t.foliage, alphaTest: 0.5, side: Ss, roughness: 0.85 }),
      tree: e({ roughness: 0.95 }),
    };
  t.foliage || (n.foliage.map = null);
  let o = new Map(),
    a = new Map(),
    r = (h, f) => {
      let u = h + "|" + f,
        d = o.get(u);
      return (d || o.set(u, (d = new Ce())), d);
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
        for (let [f, u] of o) {
          if (u.empty) continue;
          let [d, p] = f.split("|"),
            m = new _e(u.geometry(!0), n[p]);
          ((m.name = `lgg_${d}_${p}`),
            (m.castShadow = !/ground|water|glow/.test(p) && !/far/.test(d)),
            (m.receiveShadow = !0),
            (m.matrixAutoUpdate = !1),
            m.updateMatrix(),
            i.group.add(m),
            a.has(f) && PX && i.group.add(n2t(m, a.get(f))));
        }
        (o.clear(), a.clear());
        let h = new $t();
        for (let { name: f, geo: u, mat: d, list: p, shadow: m } of l) {
          let g = new zn(u, typeof d == "string" ? n[d] : d, p.length);
          (p.forEach(([b, x], v) => {
            (g.setMatrixAt(v, b),
              g.setColorAt(
                v,
                x ? h.setRGB(x[0], x[1], x[2]) : h.setRGB(1, 1, 1),
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
            i.group.add(g));
        }
        l.length = 0;
      },
    };
  return c;
}
var i2t = ae[0] - ls[0].hw - ls[0].sw,
  o2t = fe[ws - 1] + Qe[ws - 1].hw + Qe[ws - 1].sw,
  RX = new Map();
function di(i, t) {
  if (BT()) return Io(i, t);
  let e, s, n;
  if (i >= -7600 && i <= i2t && t >= -1e3 && t <= o2t + 1700)
    ((e = -7600), (s = -1e3), (n = 25));
  else if (i >= -1e4 && i <= -1200 && t >= -7400 && t <= -1900)
    ((e = -1e4), (s = -7400), (n = 50));
  else return Io(i, t);
  let o = Math.floor((i - e) / n),
    a = Math.floor((t - s) / n),
    r = (i - e) / n - o,
    l = (t - s) / n - a,
    c = (p, m) => {
      let g = (n === 25 ? 0 : 1e9) + p * 100003 + m,
        b = RX.get(g);
      return (b === void 0 && RX.set(g, (b = Io(e + p * n, s + m * n))), b);
    },
    h = c(o, a),
    f = c(o + 1, a),
    u = c(o + 1, a + 1),
    d = c(o, a + 1);
  return r >= l ? h + (f - h) * r + (u - f) * l : h + (u - d) * r + (d - h) * l;
}
function Kb(i, t, e = 6) {
  BT() && (e = Math.min(e, 2));
  let s = (Io(i + e, t) - Io(i - e, t)) / (2 * e),
    n = (Io(i, t + e) - Io(i, t - e)) / (2 * e),
    o = Math.hypot(s, 1, n);
  return [-s / o, 1 / o, -n / o];
}
function ii(i, t, e, s, n, o) {
  let a = new Kh(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new Kh(1, 0, 0) : new Kh(0, 1, 0),
    c = new Kh().crossVectors(a, l).normalize(),
    h = new Kh().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    i.quad(
      u[p],
      u[m],
      d[m],
      d[p],
      [0, 0],
      [p % 2 ? n : s, 0],
      [p % 2 ? n : s, r],
      [0, r],
      o,
    );
  }
}
function Ne(i, t, e, s, n, o, a, r, l, c, h = [1, 1, 1, 1, 1, 0]) {
  let f = -n,
    u = s,
    d = (g, b, x) => [t + s * o * g + f * a * b, x, e + n * o * g + u * a * b],
    p = l - r,
    m = (g, b, x, v, y, M) =>
      i.quad(g, b, x, v, [0, r], [y, r], [y, r + M], [0, r + M], c);
  if (
    (h[0] && m(d(-1, -1, r), d(-1, 1, r), d(-1, 1, l), d(-1, -1, l), 2 * a, p),
    h[1] && m(d(1, 1, r), d(1, -1, r), d(1, -1, l), d(1, 1, l), 2 * a, p),
    h[2] && m(d(1, -1, r), d(-1, -1, r), d(-1, -1, l), d(1, -1, l), 2 * o, p),
    h[3] && m(d(-1, 1, r), d(1, 1, r), d(1, 1, l), d(-1, 1, l), 2 * o, p),
    h[4])
  ) {
    let g = d(-1, -1, l),
      b = d(-1, 1, l),
      x = d(1, 1, l),
      v = d(1, -1, l);
    i.quad(
      g,
      b,
      x,
      v,
      [g[0], g[2]],
      [b[0], b[2]],
      [x[0], x[2]],
      [v[0], v[2]],
      c,
      [0, 1, 0],
    );
  }
  if (h[5]) {
    let g = d(-1, -1, r),
      b = d(1, -1, r),
      x = d(1, 1, r),
      v = d(-1, 1, r);
    i.quad(
      g,
      b,
      x,
      v,
      [g[0], g[2]],
      [b[0], b[2]],
      [x[0], x[2]],
      [v[0], v[2]],
      c,
      [0, -1, 0],
    );
  }
}
function js(i, t, e, s, n, o, a, r, l, c, h) {
  let f = e[0] - t[0],
    u = e[1] - t[1],
    d = e[2] - t[2],
    p = n[0] - t[0],
    m = n[1] - t[1],
    g = n[2] - t[2],
    b = u * g - d * m,
    x = d * p - f * g,
    v = f * m - u * p;
  b * h[0] + x * h[1] + v * h[2] >= 0
    ? i.quad(t, e, s, n, o, a, r, l, c, h)
    : i.quad(t, n, s, e, o, l, r, a, c, h);
}
function yo(i, t, e, s, n, o, a = 0, r = Math.PI * 2, l = !0) {
  let c = i.v,
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
      let [x, v] = s[b],
        y = Math.max(0, b - 1),
        M = Math.min(s.length - 1, b + 1),
        S = s[M][0] - s[y][0],
        w = s[M][1] - s[y][1],
        z = Math.hypot(S, w) || 1,
        _ = w / z,
        R = -S / z;
      i.vert(
        t + m * x,
        v,
        e + g * x,
        m * _,
        R,
        g * _,
        p * Math.max(x, 0.3),
        f[b],
        o,
      );
    }
  }
  let u = s.length;
  for (let d = 0; d < n; d++)
    for (let p = 0; p + 1 < u; p++) {
      let m = c + d * u + p,
        g = m + u;
      (i.tri(m, m + 1, g + 1), i.tri(m, g + 1, g));
    }
}
