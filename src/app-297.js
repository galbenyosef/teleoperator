// app 297 — push
// Lines 144632-144896 of readable/app.pretty.js (statement-aligned).
function YQ(o, t, e = [], s = null, n = null, i = null) {
  let a = n
      ? (g, b) => KQ(g, b) === n
      : (g, b) => {
          let v = KQ(g, b),
            x = v && o.regions?.[v];
          return !x || x.loaded;
        },
    r = (g) => a(...b5t(g));
  {
    let g = o.edges.filter(
      (v) => v.elev && !v.inner && v.s1 - v.s0 > 0.05 && r(v),
    );
    for (let v of g) az(null, v, v.s0, v.s1, t, e, o, s ? "top" : "all");
    if (s)
      for (let v = 0; v < 4; v++)
        s.push((x = []) => {
          for (let y = v; y < g.length; y += 4)
            az(null, g[y], g[y].s0, g[y].s1, t, x, o, "under");
          return x;
        });
    let b = o.juns.filter((v) => a(v.x, v.z) && rz(v, t));
    for (let v of b) lz(null, v, t, e, o, s ? "top" : "all");
    s &&
      s.push((v = []) => {
        for (let x of b) lz(null, x, t, v, o, "under");
        return v;
      });
  }
  {
    let g = o.edges.filter(
        (v) =>
          v.cls === "motorway" &&
          !v.elev &&
          !v.sunk &&
          !v.tunnel &&
          !v.inner &&
          v.s1 - v.s0 > 0.05 &&
          r(v),
      ),
      b = s ? 6 : 1;
    for (let v = 0; v < b; v++) {
      let x = (y = []) => {
        for (let M = v; M < g.length; M += b)
          DC(null, g[M], g[M].s0, g[M].s1, t, y, o);
        return y;
      };
      s ? s.push(x) : x(e);
    }
  }
  let l = (g, b, v = 0) =>
    i?.push({ kind: g, x: b[0], y: b[1], z: b[2], rot: v });
  for (let g of o.edges)
    if (r(g))
      for (let b of GC(g, t))
        for (let v of [b.L, b.R])
          v &&
            (e.push({
              t: "circ",
              x: v[0],
              z: v[2],
              r: 0.16,
              y0: v[1] - 1.5,
              y1: v[1] + 7,
            }),
            l("tpole", v));
  for (let g of o.juns)
    if (!g.elev && a(g.x, g.z))
      for (let b of VC(g, t))
        (e.push({
          t: "circ",
          x: b[0],
          z: b[2],
          r: 0.16,
          y0: b[1] - 1.5,
          y1: b[1] + 7,
        }),
          l("tpole", b));
  for (let g of o.edges)
    if (r(g))
      for (let b of qC(g, t))
        b.P &&
          (t &&
            !b.y &&
            ((b.P[1] = t.driveHeight(b.P[0], b.P[2]) + 0.12), (b.y = !0)),
          e.push({
            t: "circ",
            x: b.P[0],
            z: b.P[2],
            r: 0.17,
            y0: b.P[1] - 3,
            y1: b.P[1] + 11,
          }),
          l(
            b.k % 3 === 1 ? "upolet" : "upole",
            b.P,
            Math.atan2(b.o.nx * b.sd, b.o.nz * b.sd),
          ));
  for (let g of x5t(o, t)) a(g.x, g.z) && e.push(g);
  if (n) return e;
  let c = o.terrain.bounds,
    h = 40,
    f = 1e5,
    u = c.z0 + h,
    d = On("bridges") ? { y0: -200, y1: 30 } : {};
  (e.push(
    { t: "box", x0: -f, z0: u, x1: c.x0 + h, z1: f, wall: !0 },
    { t: "box", x0: -f, z0: -f, x1: c.x0 + h, z1: u, wall: !0, ...d },
    { t: "box", x0: c.x1 - h, z0: 600, x1: f, z1: f, wall: !0 },
    { t: "box", x0: c.x1 - h, z0: -f, x1: f, z1: 600, wall: !0, ...d },
    { t: "box", x0: -f, z0: c.z1 - h, x1: f, z1: f, wall: !0 },
  ),
    bi.notch &&
      e.push({
        t: "box",
        x0: c.x0 + h - 1,
        z0: nc.z0 - h,
        x1: nc.x1 + h,
        z1: c.z1 - h + 1,
        wall: !0,
      }));
  let p = Object.values(z0)
      .filter((g) => !g.split)
      .map((g) => g.bounds)
      .sort((g, b) => g.x0 - b.x0),
    m = c.x0 + h;
  for (let g of p) {
    (e.push({ t: "box", x0: m, z0: -f, x1: g.x0 + h, z1: u, wall: !0, ...d }),
      e.push({
        t: "box",
        x0: g.x0 + h,
        z0: g.z1 - h,
        x1: g.x1 - h,
        z1: u,
        wall: !0,
        ...d,
      }));
    let b = { y0: -200, y1: 2e3 };
    (e.push(
      {
        t: "box",
        x0: g.x0 - 400,
        z0: g.z0 - 400,
        x1: g.x0 + h,
        z1: g.z1 - h,
        wall: !0,
        ...b,
      },
      {
        t: "box",
        x0: g.x1 - h,
        z0: g.z0 - 400,
        x1: g.x1 + 400,
        z1: g.z1 - h,
        wall: !0,
        ...b,
      },
      {
        t: "box",
        x0: g.x0 - 400,
        z0: g.z0 - 400,
        x1: g.x1 + 400,
        z1: g.z0 + h,
        wall: !0,
        ...b,
      },
    ),
      (m = g.x1 - h));
  }
  return (
    e.push({ t: "box", x0: m, z0: -f, x1: c.x1 - h, z1: u, wall: !0, ...d }),
    u$(o, e),
    e
  );
}
function x5t(o, t) {
  let e = [],
    s = o.seawallCode,
    n = o.quayStep;
  return (
    o.seawall.forEach((i, a) => {
      let r = s?.[a],
        l = o.seawallY?.[a],
        c = o.seawallSide?.[a] ?? 0,
        h = 0;
      for (let f = 0; f + 2 < i.length; f += 2) {
        let u = i[f],
          d = i[f + 1],
          p = i[f + 2] - u,
          m = i[f + 3] - d,
          g = Math.hypot(p, m);
        if (((h += g), g < 0.05)) continue;
        let b = p / g,
          v = m / g,
          x = -v * c,
          y = b * c,
          M = h - g,
          S = (T, E, R, P) => {
            if (
              (R === 253 && c && ((T = Math.max(0, T)), (E = Math.min(g, E))),
              R === 252 || E - T < 0.05)
            )
              return;
            let C = R === 251 || !c,
              I = R === 253 && !!c,
              L = I ? 1.2 : 3.4,
              F = I ? 0.35 : C ? 0.6 : R / 10 + 0.35,
              O = I ? (F + L) / 2 : C ? 0.6 : (Math.ceil(F * 2) / 2 + 3.4) / 2,
              B = C && !I ? 0 : L - O,
              H = (T + E) / 2;
            e.push({
              t: "obb",
              x: u + b * H + x * B,
              z: d + v * H + y * B,
              hx: O,
              hz: (E - T) / 2,
              c: v,
              s: b,
              wall: !0,
              sea: !0,
              y0: -60,
              y1: P > 0 ? Math.min(16, P - 1) : 16,
            });
          };
        if (!r) {
          S(-0.3, g + 0.3, 251, 0);
          continue;
        }
        let w = (T) => (T <= 250 ? Math.ceil(T / 5) * 5 : T),
          _ = -0.3,
          z = -1,
          A = 0;
        for (
          let T = Math.max(0, Math.floor((M - 1) / n));
          T * n <= h + 1 && T < r.length;
          T++
        ) {
          let E = Math.max(-0.3, T * n - n / 2 - M);
          if (Math.min(g + 0.3, T * n + n / 2 - M) <= E) continue;
          let P = w(r[T]),
            C = l[T] / 10;
          (P !== z || C !== A) &&
            (z >= 0 && S(_, E, z, A), (_ = E), (z = P), (A = C));
        }
        z >= 0 && S(_, g + 0.3, z, A);
        {
          let T = r[Math.min(r.length - 1, Math.round(M / n))];
          f > 0 &&
            (T < 252 || T === 253) &&
            e.push({
              t: "circ",
              x: u,
              z: d,
              r: T === 253 ? 0.35 : 0.6,
              wall: !0,
              sea: !0,
              y0: -60,
              y1: 16,
            });
        }
      }
    }),
    e
  );
}
