// app 57 — math
// Lines 63938-64285 of readable/app.pretty.js (statement-aligned).
function ydt({ B: o, colliders: t, inst: e }) {
  let s = 3 + Ze,
    n = Rt([0.07, 0.09, 0.08], Tt.metal),
    i = Rt([0.55, 0.54, 0.5], Tt.conc),
    a = { e: [[io.z0 - 8, io.z1 + 8]], n: [] };
  for (let h of lk) a[h.side].push([h.c - h.w / 2 - 0.5, h.c + h.w / 2 + 0.5]);
  a.n.push(
    [he[8] - 40, he[9] + 44],
    [he[3] - 12, he[3] + 12],
    [he[6] - 70, he[7]],
  );
  let r = (h, f) => !a[h].some(([u, d]) => f > u && f < d),
    l = (h, f, u) => {
      let d = o.get(
          h === "e"
            ? "promE" + Math.floor((f + 200) / 500)
            : "promN" + Math.floor((f + 200) / 500),
          "solid",
        ),
        p = (m) => (h === "e" ? [Ye.x - 0.4, m] : [m, Ye.z + 0.4]);
      for (let m = f; m < u - 0.5;) {
        if (!r(h, m)) {
          m += 1;
          continue;
        }
        let g = m;
        for (; g < u && r(h, g + 1);) g += 1;
        if (g - m > 3) {
          let b = p(m),
            v = p(g);
          (rs(d, [b[0], s + 1.05, b[1]], [v[0], s + 1.05, v[1]], 0.08, 0.06, n),
            rs(
              d,
              [b[0], s + 0.55, b[1]],
              [v[0], s + 0.55, v[1]],
              0.04,
              0.04,
              n,
            ));
          for (let x = m; x <= g; x += 2.5) {
            let y = p(x);
            zs(
              d,
              y[0] - 0.04,
              s - 0.02,
              y[1] - 0.04,
              y[0] + 0.04,
              s + 1.08,
              y[1] + 0.04,
              n,
              { top: !1 },
            );
          }
        }
        m = g + 1;
      }
    };
  (l("e", pe[0] - ns[0].hw - ns[0].sw + 1, pe[ks - 1] + 60),
    l("n", he[0] - 130, Ye.x - 1));
  let c = {
    box: (h, f, u, d, p, m, g, b, v) =>
      zs(
        h,
        Math.min(f, d),
        m + Ze,
        Math.min(u, p),
        Math.max(f, d),
        g + Ze,
        Math.max(u, p),
        b,
        v,
      ),
  };
  for (let h = pe[0] + 40; h < pe[ks - 1] - 100; h += 36) {
    if (!r("e", h) || !r("e", h - 2) || !r("e", h + 2) || (h > 740 && h < 980))
      continue;
    let f = o.get("promE" + Math.floor((h + 200) / 500), "solid"),
      u = Ye.x - 3.2;
    (wdt(f, c, u, h),
      t.push({ t: "box", x0: u - 0.35, z0: h - 1, x1: u + 0.35, z1: h + 1 }));
  }
  for (let h = he[0] - 100; h < Ye.x - 60; h += 36) {
    if (!r("n", h) || !r("n", h - 2) || !r("n", h + 2)) continue;
    let f = o.get("promN" + Math.floor((h + 200) / 500), "solid"),
      u = Ye.z + 3.2;
    (ih(f, c, h, u, -1),
      t.push({ t: "box", x0: h - 1, z0: u - 0.35, x1: h + 1, z1: u + 0.35 }));
  }
  eP({ B: o, colliders: t, inst: e });
  {
    let h = o.get("ferry", "solid"),
      f = he[xn - 1],
      u = io.z0 + 22,
      d = io.z0 + 68,
      p = 3 + 0.32,
      m = 1.35;
    (zs(h, f - m, 2.9, u, f + m, p, d, Rt([0.55, 0.54, 0.5], Tt.conc)),
      zs(
        h,
        f - m,
        p,
        u,
        f - m + 0.3,
        p + 0.005,
        d,
        Rt([0.75, 0.62, 0.12], Tt.paint),
        { sides: [0, 0, 0, 0] },
      ),
      zs(
        h,
        f + m - 0.3,
        p,
        u,
        f + m,
        p + 0.005,
        d,
        Rt([0.75, 0.62, 0.12], Tt.paint),
        { sides: [0, 0, 0, 0] },
      ));
    for (let g of [u + 12, d - 12]) {
      for (let b of [-3.5, 3.5]) os(h, f, g + b, 0.08, p, p + 2.7, 6, n);
      (zs(
        h,
        f - 1.2,
        p + 2.7,
        g - 4.2,
        f + 1.2,
        p + 2.85,
        g + 4.2,
        Rt([0.3, 0.38, 0.4], Tt.glass),
        { bottom: !0 },
      ),
        zs(
          h,
          f - 0.05,
          p + 0.3,
          g - 3.4,
          f + 0.05,
          p + 2.4,
          g + 3.4,
          Rt([0.2, 0.25, 0.27], Tt.glass),
        ),
        zs(
          h,
          f - 0.6,
          p + 0.45,
          g - 2.5,
          f - 0.1,
          p + 0.5,
          g + 2.5,
          Rt([0.3, 0.3, 0.3], Tt.metal),
        ));
    }
    (s0(h, [f, u + 1], [f, d - 1], p, n, { h: 1, step: 3 }),
      t.push({ t: "box", x0: f - m, z0: u, x1: f + m, z1: d }));
  }
}
function eP({ B: o, colliders: t, inst: e }, s = {}) {
  let n = Rt([0.07, 0.09, 0.08], Tt.metal),
    i = Rt([0.55, 0.54, 0.5], Tt.conc),
    a = 3 + Ze;
  {
    let r = o.get("ferry", "solid"),
      l = s.x0 ?? he[xn - 1] + ps[xn - 1].hw + 0.4,
      c = Ye.x - 0.3,
      h = io.z0 + 6,
      f = io.z1 - 6,
      u = s.real ? (m, g) => $t(m, g) + Ze : () => a;
    s.real ||
      $i(
        r,
        [
          [l, a + 0.02, h],
          [c, a + 0.02, h],
          [c, a + 0.02, f],
          [l, a + 0.02, f],
        ],
        Rt([0.5, 0.47, 0.43], Tt.pavers),
      );
    for (let m = h + 2; m < f; m += 4) {
      if (Math.abs(m - io.zc) < 10) continue;
      let g = u(l + 0.6, m);
      (Ws(
        r,
        l + 0.6,
        m,
        [
          [0.28, g],
          [0.28, g + 0.7],
          [0.22, g + 0.85],
          [0.01, g + 0.9],
        ],
        8,
        i,
      ),
        t.push({ t: "circ", x: l + 0.6, z: m, r: 0.3 }));
    }
    for (let m = h + 10; m < f; m += 24)
      for (let g of [l + 7, c - 5]) {
        let b = u(g, m);
        (os(r, g, m, 0.12, b, b + 5, 8, n, 0.08),
          os(r, g, m, 0.3, b, b + 0.9, 8, n, 0.18));
        for (let v of [-0.55, 0.55])
          (rs(r, [g, b + 4.6, m], [g, b + 4.8, m + v], 0.05, 0.05, n),
            os(
              r,
              g,
              m + v,
              0.2,
              b + 4.4,
              b + 5,
              6,
              Rt([1, 0.88, 0.62], Tt.lamp),
              0.26,
            ));
        t.push({ t: "circ", x: g, z: m, r: 0.3 });
      }
    for (let m = h + 6; m < f - 2; m += 15) {
      if (Math.abs(m - io.zc) < 14) continue;
      let g = l + 3.4,
        b = u(g, m);
      (e.push({
        kind: "palm",
        x: g,
        y: b,
        z: m,
        rot: m * 0.37,
        scale: 0.95 + 0.1 * Math.sin(m),
      }),
        t.push({ t: "circ", x: g, z: m, r: 0.45 }));
    }
    let d = Rt([0.9, 0.9, 0.88], Tt.paint),
      p = Rt([0.6, 0.6, 0.6], Tt.metal);
    for (let [m, g] of [
      [h + 4, io.zc - 16],
      [io.zc + 16, f - 20],
    ])
      for (let b = m; b < g - 3; b += 3.4) {
        let v = c - 3.6,
          x = c - 0.6,
          y = b + 1.5,
          M = (v + x) / 2,
          S = u(M, y);
        for (let [w, _] of [
          [v, b],
          [x, b],
          [v, b + 3],
          [x, b + 3],
        ])
          os(r, w, _, 0.03, S, S + 2.3, 4, p);
        for (let [w, _] of [
          [
            [v, b],
            [x, b],
          ],
          [
            [x, b],
            [x, b + 3],
          ],
          [
            [x, b + 3],
            [v, b + 3],
          ],
          [
            [v, b + 3],
            [v, b],
          ],
        ])
          Ms(
            r,
            [w[0], S + 2.3, w[1]],
            [_[0], S + 2.3, _[1]],
            [M, S + 3.1, y],
            [M, S + 3.1, y],
            d,
            [((w[0] + _[0]) / 2) * 2 - M, S + 4, ((w[1] + _[1]) / 2) * 2 - y],
          );
        (zs(
          r,
          v + 0.2,
          S + 0.7,
          b + 0.3,
          v + 0.9,
          S + 0.8,
          b + 2.7,
          Rt([0.35, 0.25, 0.15], Tt.planks),
        ),
          t.push({
            t: "box",
            x0: v - 0.1,
            z0: b - 0.1,
            x1: x + 0.1,
            z1: b + 3.1,
          }));
      }
  }
}
function wdt(o, t, e, s) {
  let n = Rt([0.32, 0.22, 0.14], Tt.planks),
    i = Rt([0.05, 0.06, 0.06], Tt.metal),
    a = 3;
  (t.box(o, e - 0.22, s - 0.9, e + 0.22, s + 0.9, a + 0.42, a + 0.47, n),
    t.box(o, e - 0.27, s - 0.9, e - 0.21, s + 0.9, a + 0.55, a + 0.85, n));
  for (let r of [-0.75, 0.75])
    t.box(o, e - 0.25, s + r - 0.04, e + 0.22, s + r + 0.04, a, a + 0.44, i);
}
Pn();
await oc();
await fp();
await up();
await fp();
es();
function Tr(o) {
  let t = o.P,
    e = t.length / 3,
    s = new Float64Array(e),
    n = new Float64Array((e - 1) * 2),
    i = new Float64Array(e * 2);
  for (let a = 1; a < e; a++) {
    let r = t[a * 3] - t[a * 3 - 3],
      l = t[a * 3 + 1] - t[a * 3 - 2],
      c = Math.hypot(r, l) || 1e-9;
    ((s[a] = s[a - 1] + c),
      (n[(a - 1) * 2] = r / c),
      (n[(a - 1) * 2 + 1] = l / c));
  }
  for (let a = 0; a + 1 < e; a++)
    if (s[a + 1] - s[a] < 0.001) {
      let r = a - 1;
      for (; r >= 0 && s[r + 1] - s[r] < 0.001;) r--;
      if (r < 0) for (r = a + 1; r + 1 < e && s[r + 1] - s[r] < 0.001;) r++;
      r >= 0 &&
        r + 1 < e &&
        ((n[a * 2] = n[r * 2]), (n[a * 2 + 1] = n[r * 2 + 1]));
    }
  for (let a = 0; a < e; a++) {
    let r = Math.max(0, a - 1),
      l = Math.min(e - 2, a),
      c = -(n[r * 2 + 1] + n[l * 2 + 1]),
      h = n[r * 2] + n[l * 2],
      f = Math.hypot(c, h);
    f < 1e-6 ? ((c = -n[l * 2 + 1]), (h = n[l * 2])) : ((c /= f), (h /= f));
    let u = c * -n[l * 2 + 1] + h * n[l * 2],
      d = 1 / Math.max(0.5, u);
    ((i[a * 2] = c * d), (i[a * 2 + 1] = h * d));
  }
  return ((o.S = s), (o.D = n), (o.M = i), (o.n = e), (o.L = s[e - 1]), o);
}
