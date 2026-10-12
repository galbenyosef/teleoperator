// app 298 — push
// Lines 144347-144610 of readable/app.pretty.js (statement-aligned).
function $J(i, t, e = [], s = null, n = null, o = null) {
  let a = n
      ? (g, b) => VJ(g, b) === n
      : (g, b) => {
          let x = VJ(g, b),
            v = x && i.regions?.[x];
          return !v || v.loaded;
        },
    r = (g) => a(...Vxt(g));
  {
    let g = i.edges.filter(
      (x) => x.elev && !x.inner && x.s1 - x.s0 > 0.05 && r(x),
    );
    for (let x of g) ak(null, x, x.s0, x.s1, t, e, i, s ? "top" : "all");
    if (s)
      for (let x = 0; x < 4; x++)
        s.push((v = []) => {
          for (let y = x; y < g.length; y += 4)
            ak(null, g[y], g[y].s0, g[y].s1, t, v, i, "under");
          return v;
        });
    let b = i.juns.filter((x) => a(x.x, x.z) && rk(x, t));
    for (let x of b) lk(null, x, t, e, i, s ? "top" : "all");
    s &&
      s.push((x = []) => {
        for (let v of b) lk(null, v, t, x, i, "under");
        return x;
      });
  }
  {
    let g = i.edges.filter(
        (x) =>
          x.cls === "motorway" &&
          !x.elev &&
          !x.sunk &&
          !x.tunnel &&
          !x.inner &&
          x.s1 - x.s0 > 0.05 &&
          r(x),
      ),
      b = s ? 6 : 1;
    for (let x = 0; x < b; x++) {
      let v = (y = []) => {
        for (let M = x; M < g.length; M += b)
          cP(null, g[M], g[M].s0, g[M].s1, t, y, i);
        return y;
      };
      s ? s.push(v) : v(e);
    }
  }
  let l = (g, b, x = 0) =>
    o?.push({ kind: g, x: b[0], y: b[1], z: b[2], rot: x });
  for (let g of i.edges)
    if (r(g))
      for (let b of fP(g, t))
        for (let x of [b.L, b.R])
          x &&
            (e.push({
              t: "circ",
              x: x[0],
              z: x[2],
              r: 0.16,
              y0: x[1] - 1.5,
              y1: x[1] + 7,
            }),
            l("tpole", x));
  for (let g of i.juns)
    if (!g.elev && a(g.x, g.z))
      for (let b of uP(g, t))
        (e.push({
          t: "circ",
          x: b[0],
          z: b[2],
          r: 0.16,
          y0: b[1] - 1.5,
          y1: b[1] + 7,
        }),
          l("tpole", b));
  for (let g of i.edges)
    if (r(g))
      for (let b of pP(g, t))
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
  for (let g of $xt(i, t)) a(g.x, g.z) && e.push(g);
  if (n) return e;
  let c = i.terrain.bounds,
    h = 40,
    f = 1e5,
    u = c.z0 + h,
    d = { y0: -200, y1: 30 };
  (e.push(
    { t: "box", x0: -f, z0: u, x1: c.x0 + h, z1: f, wall: !0 },
    { t: "box", x0: -f, z0: -f, x1: c.x0 + h, z1: u, wall: !0, ...d },
    { t: "box", x0: c.x1 - h, z0: 600, x1: f, z1: f, wall: !0 },
    { t: "box", x0: c.x1 - h, z0: -f, x1: f, z1: 600, wall: !0, ...d },
    { t: "box", x0: -f, z0: c.z1 - h, x1: f, z1: f, wall: !0 },
  ),
    e.push({
      t: "box",
      x0: c.x0 + h - 1,
      z0: el.z0 - h,
      x1: el.x1 + h,
      z1: c.z1 - h + 1,
      wall: !0,
    }));
  let p = Object.values(h0)
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
    hj(i, e),
    e
  );
}
function $xt(i, t) {
  let e = [],
    s = i.seawallCode,
    n = i.quayStep;
  return (
    i.seawall.forEach((o, a) => {
      let r = s?.[a],
        l = i.seawallY?.[a],
        c = i.seawallSide?.[a] ?? 0,
        h = 0;
      for (let f = 0; f + 2 < o.length; f += 2) {
        let u = o[f],
          d = o[f + 1],
          p = o[f + 2] - u,
          m = o[f + 3] - d,
          g = Math.hypot(p, m);
        if (((h += g), g < 0.05)) continue;
        let b = p / g,
          x = m / g,
          v = -x * c,
          y = b * c,
          M = h - g,
          S = (T, E, A, C) => {
            if (
              (A === 253 && c && ((T = Math.max(0, T)), (E = Math.min(g, E))),
              A === 252 || E - T < 0.05)
            )
              return;
            let P = A === 251 || !c,
              I = A === 253 && !!c,
              L = I ? 1.2 : 3.4,
              F = I ? 0.35 : P ? 0.6 : A / 10 + 0.35,
              N = I ? (F + L) / 2 : P ? 0.6 : (Math.ceil(F * 2) / 2 + 3.4) / 2,
              B = P && !I ? 0 : L - N,
              H = (T + E) / 2;
            e.push({
              t: "obb",
              x: u + b * H + v * B,
              z: d + x * H + y * B,
              hx: N,
              hz: (E - T) / 2,
              c: x,
              s: b,
              wall: !0,
              sea: !0,
              y0: -60,
              y1: C > 0 ? Math.min(16, C - 1) : 16,
            });
          };
        if (!r) {
          S(-0.3, g + 0.3, 251, 0);
          continue;
        }
        let w = (T) => (T <= 250 ? Math.ceil(T / 5) * 5 : T),
          z = -0.3,
          _ = -1,
          R = 0;
        for (
          let T = Math.max(0, Math.floor((M - 1) / n));
          T * n <= h + 1 && T < r.length;
          T++
        ) {
          let E = Math.max(-0.3, T * n - n / 2 - M);
          if (Math.min(g + 0.3, T * n + n / 2 - M) <= E) continue;
          let C = w(r[T]),
            P = l[T] / 10;
          (C !== _ || P !== R) &&
            (_ >= 0 && S(z, E, _, R), (z = E), (_ = C), (R = P));
        }
        _ >= 0 && S(z, g + 0.3, _, R);
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
