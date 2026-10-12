// app 235 — math
// Lines 121940-122281 of readable/app.pretty.js (statement-aligned).
function tw(i, t, e = null) {
  let s = e ? e.x : ae[3],
    n = e ? e.zN : fe[0] - Qe[0].hw - Qe[0].sw,
    o = e ? e.zS : Ve.z + 1.5,
    a = e ? e.tz : (n + o) / 2,
    r = 4.2,
    l = Yt(s, a) + Ke,
    c = e ? e.wW : 16,
    h = e ? e.wE : 16,
    f = t.G("hyde", "wall"),
    u = t.G("hyde", "ground"),
    d = t.G("hyde", "paint"),
    p = t.G("hyde", "metal");
  Aa(
    u,
    s - c,
    o,
    s + h,
    n,
    0.5,
    (x, v) =>
      Math.min(Math.hypot(x - s, v - a) - r - 0.3, x - s + c, s + h - x),
    (x, v) => (e ? Yt(x, v) + Ke + 0.03 : l + 0.03),
    (x) =>
      Math.abs(x - s) > 9
        ? [0.52, 0.6, 0.44, To.lawn]
        : [0.8, 0.75, 0.75, To.pavers],
  );
  let m = [0.35, 0.24, 0.15, 0.85],
    g = [0.32, 0.32, 0.33, 0.35];
  for (let x = 0; x < 40; x++) {
    let v = (x / 40) * Math.PI * 2,
      y = ((x + 1) / 40) * Math.PI * 2,
      M = 0.85 + 0.3 * ((x * 0.618) % 1);
    js(
      d,
      [s, l + 0.04, a],
      [s + Math.cos(y) * r, l + 0.04, a + Math.sin(y) * r],
      [s + Math.cos(y) * r, l + 0.04, a + Math.sin(y) * r],
      [s + Math.cos(v) * r, l + 0.04, a + Math.sin(v) * r],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      m.map((S, w) => (w < 3 ? S * M : S)),
      [0, 1, 0],
    );
  }
  yo(
    p,
    s,
    a,
    [
      [r, l - 0.1],
      [r, l + 0.06],
      [r + 0.3, l + 0.06],
      [r + 0.3, l - 0.1],
    ],
    40,
    g,
  );
  for (let x of [-0.72, 0.72])
    (ii(
      p,
      [s + x, l + 0.07, a - r + 0.1],
      [s + x, l + 0.07, a + r - 0.1],
      0.08,
      0.05,
      [0.5, 0.5, 0.5, 0.3],
    ),
      e ||
        ii(
          p,
          [s + x, Yt(s, n) + 0.03, n - 0.2],
          [s + x, Yt(s, fe[0] - Qe[0].hw) + 0.03, fe[0] - Qe[0].hw],
          0.08,
          0.04,
          [0.5, 0.5, 0.5, 0.3],
        ),
      e ||
        ii(
          p,
          [s + x, l + 0.05, a + r + 0.3],
          [s + x, l + 0.05, n],
          0.08,
          0.05,
          [0.5, 0.5, 0.5, 0.3],
        ));
  if (!e)
    ii(
      p,
      [s, l + 0.05, a + r + 0.3],
      [s, Yt(s, fe[0] - Qe[0].hw) + 0.03, fe[0] - Qe[0].hw],
      0.05,
      0.03,
      [0.2, 0.2, 0.2, 0.3],
    );
  else {
    let x = [[s, a + r + 0.3], [s, n], ...e.rails];
    for (let v = 0; v + 1 < x.length; v++) {
      let [y, M] = x[v],
        [S, w] = x[v + 1],
        z = Math.hypot(S - y, w - M),
        _ = -(w - M) / z,
        R = (S - y) / z;
      for (let T of [-0.72, 0.72, 0])
        ii(
          p,
          [y + _ * T, Yt(y, M) + (v ? 0.03 : Ke + 0.05), M + R * T],
          [S + _ * T, Yt(S, w) + 0.03, w + R * T],
          T ? 0.08 : 0.05,
          T ? 0.05 : 0.03,
          T ? [0.5, 0.5, 0.5, 0.3] : [0.2, 0.2, 0.2, 0.3],
        );
    }
  }
  let b = Gk();
  (b &&
    t.inst("hydecar", b, "paint", [
      [new ye().makeTranslation(s, l + 0.02, a), [1, 1, 1]],
    ]),
    i.colliders.push({ t: "obb", x: s, z: a, hx: 1.45, hz: 4.4, c: 1, s: 0 }));
  {
    let x = e ? s - 6 : s + 10.5,
      v = e ? a - 8 : a + 2.5;
    (Ne(f, x, v, 1, 0, 1.6, 1.3, l, l + 2.6, [0.55, 0.7, 0.55, hi.stone]),
      Ne(
        d,
        x,
        v,
        1,
        0,
        1.68,
        1.4,
        l + 1.1,
        l + 2.2,
        [0.04, 0.05, 0.06, 0.1],
        [1, 1, 1, 1, 0, 0],
      ),
      Ne(
        d,
        x,
        v,
        1,
        0,
        1.95,
        1.65,
        l + 2.6,
        l + 2.9,
        [0.06, 0.25, 0.14, 0.6],
        [1, 1, 1, 1, 1, 1],
      ),
      i.colliders.push({ t: "obb", x, z: v, hx: 1.6, hz: 1.3, c: 1, s: 0 }));
  }
  for (let x of e ? [s - 7] : [s - 7.5, s + 7.5])
    for (let v of [a - 3.5, a + 3.5]) {
      Ne(
        d,
        x,
        v,
        0,
        1,
        0.9,
        0.22,
        l + 0.42,
        l + 0.48,
        [0.2, 0.13, 0.08, 0.6],
        [1, 1, 1, 1, 1, 1],
      );
      for (let y of [-0.75, 0.75])
        Ne(
          p,
          x,
          v + y,
          0,
          1,
          0.04,
          0.2,
          l,
          l + 0.42,
          [0.1, 0.1, 0.1, 0.5],
          [1, 1, 1, 1, 0, 0],
        );
    }
  for (let x of e ? [s - 8] : [s - 12, s + 12])
    (i.inst.push({
      kind: "lamp",
      x,
      y: l,
      z: a - 3,
      rot: (Math.PI / 2) * Math.sign(s - x),
    }),
      i.colliders.push({ t: "circ", x, z: a - 3, r: 0.18 }));
  if (!e)
    for (let x of [-1, 1])
      Ne(f, s + x * 9.2, a, 1, 0, 0.15, (n - o) / 2 - 0.4, l - 0.1, l + 0.25, [
        0.75,
        0.73,
        0.7,
        hi.granite,
      ]);
}
as();
En();
as();
f0();
Oa();
as();
var Vs = (i = 0, t = 0, e = 0) => new xt(i, t, e),
  oi = Vs(0, 1, 0);
function $c(i) {
  let t = (i >>> 0) % 2147483647 || 1;
  return () => (t = (t * 16807) % 2147483647) / 2147483647;
}
var ul = (i, t, e) => {
    let s = Math.min(1, Math.max(0, (e - i) / (t - i)));
    return s * s * (3 - 2 * s);
  },
  la = class {
    constructor() {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.c = []),
        (this.i = []));
    }
    v(t, e, s, n, o) {
      return (
        this.p.push(t.x, t.y, t.z),
        this.n.push(e.x, e.y, e.z),
        this.uv.push(s, n),
        this.c.push(o[0], o[1], o[2], o[3] ?? 1),
        this.p.length / 3 - 1
      );
    }
    t(t, e, s) {
      this.i.push(t, e, s);
    }
    q(t, e, s, n) {
      this.i.push(t, e, s, t, s, n);
    }
    get count() {
      return this.p.length / 3;
    }
    geo() {
      let t = new De();
      return (
        t.setAttribute("position", new ze(this.p, 3)),
        t.setAttribute("normal", new ze(this.n, 3)),
        t.setAttribute("uv", new ze(this.uv, 2)),
        t.setAttribute("color", new ze(this.c, 4)),
        kC(this.p, this.n, this.i),
        t.setIndex(this.i),
        t.computeBoundingSphere(),
        t
      );
    }
  };
function kC(i, t, e) {
  for (let s = 0; s + 2 < e.length; s += 3) {
    let n = e[s] * 3,
      o = e[s + 1] * 3,
      a = e[s + 2] * 3,
      r = i[o] - i[n],
      l = i[o + 1] - i[n + 1],
      c = i[o + 2] - i[n + 2],
      h = i[a] - i[n],
      f = i[a + 1] - i[n + 1],
      u = i[a + 2] - i[n + 2];
    if (
      (l * u - c * f) * (t[n] + t[o] + t[a]) +
        (c * h - r * u) * (t[n + 1] + t[o + 1] + t[a + 1]) +
        (r * f - l * h) * (t[n + 2] + t[o + 2] + t[a + 2]) <
      0
    ) {
      let p = e[s + 1];
      ((e[s + 1] = e[s + 2]), (e[s + 2] = p));
    }
  }
  return e;
}
function ku(
  i,
  t,
  e,
  s,
  { texW: n = 1, texH: o = 1.3, ao: a = () => 1, cap: r = !1, v0: l = 0 } = {},
) {
  let c = t.length;
  if (c < 2) return;
  let h = t.map((m, g) =>
    (g + 1 < c ? t[g + 1].clone().sub(m) : m.clone().sub(t[g - 1])).normalize(),
  );
  for (let m = 1; m + 1 < c; m++)
    h[m] = t[m + 1]
      .clone()
      .sub(t[m - 1])
      .normalize();
  let f =
      Math.abs(h[0].y) < 0.9
        ? Vs(0, 1, 0).cross(h[0]).normalize()
        : Vs(1, 0, 0).cross(h[0]).normalize(),
    u = Math.max(1, Math.round((2 * Math.PI * e[0]) / n)),
    d = l,
    p = i.count;
  for (let m = 0; m < c; m++) {
    if (m) {
      let x = h[m - 1].clone().cross(h[m]),
        v = x.length();
      (v > 1e-6 &&
        f.applyAxisAngle(x.divideScalar(v), Math.asin(Math.min(1, v))),
        (d += t[m].distanceTo(t[m - 1])));
    }
    let g = h[m].clone().cross(f).normalize(),
      b = a(m);
    for (let x = 0; x <= s; x++) {
      let v = (x / s) * Math.PI * 2,
        y = f
          .clone()
          .multiplyScalar(Math.cos(v))
          .addScaledVector(g, Math.sin(v));
      i.v(t[m].clone().addScaledVector(y, e[m]), y, (x / s) * u, d / o, [
        b,
        b,
        b,
        1,
      ]);
    }
  }
  for (let m = 0; m + 1 < c; m++)
    for (let g = 0; g < s; g++) {
      let b = p + m * (s + 1) + g,
        x = b + s + 1;
      i.q(b, x, x + 1, b + 1);
    }
  if (r) {
    let m = i.v(t[c - 1], h[c - 1], 0.5, d / o, [0.8, 0.8, 0.8, 1]),
      g = p + (c - 1) * (s + 1);
    for (let b = 0; b < s; b++) i.t(g + b, g + b + 1, m);
  }
  return d;
}
