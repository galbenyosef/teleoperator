// app 61 — push
// Lines 64468-64855 of readable/app.pretty.js (statement-aligned).
function oht(i) {
  let t = Z5(i),
    e = i.Yd,
    s = i.colliders,
    n = (i.f = {
      fronts: [],
      balconies: [],
      stairs: [],
      lamps: [],
      seats: [],
      oldSign: null,
    }),
    o = new Set([zR]);
  for (let c of i.houses) {
    let h = Xg(c.ring);
    for (let f = 0; f < h.length; f++) {
      let u = h[f],
        d = h[(f + 1) % h.length],
        p = Math.hypot(d[0] - u[0], d[1] - u[1]);
      if (p < 4.5) continue;
      let m = Hl(c.ring, u, d),
        g = (u[0] + d[0]) / 2,
        b = (u[1] + d[1]) / 2;
      if (t.at(g + m[0] * 3, b + m[1] * 3) < 1.5) continue;
      let v = (d[0] - u[0]) / p,
        y = (d[1] - u[1]) / p,
        M =
          p >= 7 &&
          !o.has(c.id) &&
          [0.25, 0.5, 0.75].every(
            (w) =>
              t.at(u[0] + v * p * w + m[0] * 6, u[1] + y * p * w + m[1] * 6) >=
                2.2 &&
              t.at(
                u[0] + v * p * w + m[0] * 2.6,
                u[1] + y * p * w + m[1] * 2.6,
              ) >= 2.4,
          ),
        S = { q: c, a: u, b: d, n: m, L: p, ux: v, uz: y, wide: M };
      (n.fronts.push(S), M && n.balconies.push(S));
    }
  }
  let a = 2.3,
    r = e + 3.6;
  for (let c of n.balconies) {
    let { a: h, n: f, L: u, ux: d, uz: p } = c,
      m = (b, x) => [h[0] + d * b + f[0] * x, h[1] + p * b + f[1] * x],
      g = Math.max(1, Math.round((u - 0.4) / 4.2));
    c.posts = [];
    for (let b = 0; b <= g; b++) {
      let x = m(0.2 + ((u - 0.4) * b) / g, a - 0.12);
      (c.posts.push(x),
        s.push({
          t: "circ",
          x: x[0],
          z: x[1],
          r: 0.2,
          y0: e - 1,
          y1: r,
          p39: !0,
        }));
    }
    if (
      n.stairs.length < 10 &&
      u > 9 &&
      [0.2, 3.2, 6.4].every((b) => t.at(...m(u + b, a * 0.5)) > 2.4)
    ) {
      ((c.stair = !0), n.stairs.push(c));
      let b = m(u + 2.8, a * 0.5);
      s.push({
        t: "obb",
        x: b[0],
        z: b[1],
        hx: 3.1,
        hz: a / 2,
        c: d,
        s: p,
        y0: e - 1,
        y1: r + 1,
        p39: !0,
      });
    }
  }
  let l = (c, h, f) =>
    n.balconies.some((u) =>
      u.posts.some((d) => Math.hypot(d[0] - c, d[1] - h) < f),
    );
  for (let c = 0; c < t.nz; c++)
    for (let h = 0; h < t.nx; h++) {
      let f = t.D[c * t.nx + h];
      if (!f) continue;
      let u = t.x0 + h + 0.5,
        d = t.z0 + c + 0.5,
        p = () => {
          let m = t.at(u + 1, d) - t.at(u - 1, d),
            g = t.at(u, d + 1) - t.at(u, d - 1),
            b = Math.hypot(m, g) || 1;
          return t.at(u + (m / b) * 2.5, d + (g / b) * 2.5) >= 5;
        };
      f >= 3.1 &&
      f < 3.6 &&
      !n.lamps.some((m) => Math.hypot(m[0] - u, m[1] - d) < 21) &&
      !l(u, d, 2.5) &&
      p()
        ? n.lamps.push([u, d])
        : f >= 1.4 &&
          f < 1.8 &&
          !n.seats.some((m) => Math.hypot(m[0] - u, m[1] - d) < 26) &&
          !n.lamps.some((m) => Math.hypot(m[0] - u, m[1] - d) < 4) &&
          !l(u, d, 2.5) &&
          n.seats.push([u, d]);
    }
  for (let [c, h] of n.lamps)
    s.push({ t: "circ", x: c, z: h, r: 0.22, y0: e - 1, y1: e + 5, p39: !0 });
  if (
    ((n.seats = n.seats.map(([c, h], f) => {
      let u = t.at(c + 1, h) - t.at(c - 1, h),
        d = t.at(c, h + 1) - t.at(c, h - 1),
        p = Math.hypot(u, d) || 1,
        m = u / p,
        g = d / p,
        b = { x: c, z: h, nx: m, nz: g, barrel: f % 3 === 2 };
      return (
        s.push(
          b.barrel
            ? { t: "circ", x: c, z: h, r: 0.6, y0: e - 1, y1: e + 2, p39: !0 }
            : {
                t: "obb",
                x: c,
                z: h,
                hx: 0.95,
                hz: 0.3,
                c: -g,
                s: m,
                y0: e - 1,
                y1: e + 1.5,
                p39: !0,
              },
        ),
        b
      );
    })),
    i.carousel)
  ) {
    let { x: c, z: h } = i.carousel,
      f = [-1515.2, -1695.6],
      u = Math.hypot(f[0] - c, f[1] - h),
      d = (f[0] - c) / u,
      p = (f[1] - h) / u,
      m = (n.stage = {
        x: f[0],
        z: f[1],
        nx: d,
        nz: p,
        ux: -p,
        uz: d,
        w: 3.6,
        d: 2.3,
        h: 0.9,
      }),
      g = (b, x) => [m.x + m.ux * b + m.nx * x, m.z + m.uz * b + m.nz * x];
    s.push({
      t: "obb",
      x: m.x - m.nx * 0.35,
      z: m.z - m.nz * 0.35,
      hx: m.w + 0.25,
      hz: m.d + 0.35,
      c: -m.nz,
      s: -m.nx,
      y0: e - 1,
      y1: e + 6,
      p39: !0,
    });
    {
      let [b, x] = g(m.w + 0.75, m.d - 0.55);
      ((m.steps = [b, x]),
        s.push({
          t: "obb",
          x: b,
          z: x,
          hx: 0.55,
          hz: 0.6,
          c: -m.nz,
          s: -m.nx,
          y0: e - 1,
          y1: e + 1.2,
          p39: !0,
        }));
    }
    {
      let [b, x] = g(-m.w - 1.2, -m.d + 0.9);
      ((m.booth = [b, x]),
        s.push({
          t: "obb",
          x: b,
          z: x,
          hx: 0.95,
          hz: 0.95,
          c: -m.nz,
          s: -m.nx,
          y0: e - 1,
          y1: e + 5,
          p39: !0,
        }));
    }
    {
      let b = n.lamps.filter(([x, v]) => {
        let y = x - m.x,
          M = v - m.z,
          S = y * m.ux + M * m.uz,
          w = y * m.nx + M * m.nz;
        return Math.abs(S) < 7.5 && w > -4 && w < 16;
      });
      for (let [x, v] of b) {
        let y = s.findIndex((M) => M.t === "circ" && M.x === x && M.z === v);
        y >= 0 && s.splice(y, 1);
      }
      n.lamps = n.lamps.filter((x) => !b.includes(x));
    }
    m.benches = [];
    for (let b = 0; b < 6; b++)
      for (let x of [-1, 1]) {
        let v = m.d + 2.6 + b * 1.55,
          y = x * (0.6 + 1.1),
          [M, S] = g(y, v);
        if (
          t.at(M, S) < 1.2 ||
          t.at(...g(y + 1.1, v)) < 0.8 ||
          t.at(...g(y - 1.1, v)) < 0.8
        )
          continue;
        let [w, z] = g(y, v - 0.1);
        (m.benches.push({ x: M, z: S, a: y, b: v, L: 1.1 }),
          s.push({
            t: "obb",
            x: w,
            z,
            hx: 1.15,
            hz: 0.5,
            c: -m.nz,
            s: -m.nx,
            y0: e - 1,
            y1: e + 1.2,
            p39: !0,
          }));
      }
    ((n.booths = []), (n.bins = []));
    {
      let [b, x] = g(-(m.w + 0.7), m.d + 1);
      t.at(b, x) >= 1.4 && n.bins.push([b, x]);
    }
  }
  if (((n.kiosks = []), i.carousel)) {
    let { x: c, z: h } = i.carousel,
      f = n.stage,
      u = [];
    for (let d = 0; d < t.nz; d++)
      for (let p = 0; p < t.nx; p++) {
        let m = t.D[d * t.nx + p];
        if (m < 2 || m > 3.2) continue;
        let g = t.x0 + p + 0.5,
          b = t.z0 + d + 0.5,
          x = Math.hypot(g - c, b - h);
        if (x < 16 || x > 34 || (f && Math.hypot(g - f.x, b - f.z) < 15))
          continue;
        let v = t.at(g + 1, b) - t.at(g - 1, b),
          y = t.at(g, b + 1) - t.at(g, b - 1),
          M = Math.hypot(v, y) || 1,
          S = v / M,
          w = y / M,
          z = t.at(g + S * 5, b + w * 5);
        z < 6.5 ||
          s.some(
            (_) =>
              _.t !== "poly" &&
              Math.hypot(_.x - g, _.z - b) <
                (_.t === "circ" ? _.r : Math.hypot(_.hx, _.hz)) + 1.9,
          ) ||
          u.push({ x: g, z: b, nx: S, nz: w, w: z });
      }
    u.sort((d, p) => p.w - d.w);
    for (let d of u) {
      if (n.kiosks.length >= 3) break;
      n.kiosks.some((p) => Math.hypot(p.x - d.x, p.z - d.z) < 14) ||
        (n.kiosks.push({
          x: d.x,
          z: d.z,
          nx: d.nx,
          nz: d.nz,
          k: n.kiosks.length,
        }),
        s.push({
          t: "obb",
          x: d.x,
          z: d.z,
          hx: 0.85,
          hz: 0.85,
          c: 1,
          s: 0,
          y0: e - 1,
          y1: e + 4,
          p39: !0,
        }));
    }
  }
  {
    let c = null,
      h = n.stage;
    if (h)
      for (let f of n.fronts) {
        if (f.q.id !== 128240131) continue;
        let u = (f.a[0] + f.b[0]) / 2,
          d = (f.a[1] + f.b[1]) / 2,
          p = Math.hypot(h.x - u, h.z - d) || 1,
          m =
            ((f.n[0] * (h.x - u) + f.n[1] * (h.z - d)) / p) * Math.min(f.L, 14);
        (!c || m > c.sc) && (c = { E: f, sc: m });
      }
    c && ((c.E.arcade = !0), (n.arcade = c.E));
  }
  for (let c of n.seats) {
    if (c.barrel) continue;
    let h = c.x - c.nz * 1.45,
      f = c.z + c.nx * 1.45;
    t.at(h, f) < 1 ||
      t.at(h + c.nx * 4, f + c.nz * 4) < 5.5 ||
      (n.bins ||= []).push([h, f]);
  }
  for (let [c, h] of n.bins || [])
    s.push({ t: "circ", x: c, z: h, r: 0.38, y0: e - 1, y1: e + 1.3, p39: !0 });
  n.boards = [];
  for (let c of [288396171, 466623895, zR]) {
    let h = i.houses.find((p) => p.id === c);
    if (!h) continue;
    let f = Xg(h.ring),
      u = null;
    for (let p = 0; p < f.length; p++) {
      let m = f[p],
        g = f[(p + 1) % f.length],
        b = Hl(h.ring, m, g),
        x = Math.hypot(g[0] - m[0], g[1] - m[1]),
        v = b[1] * x;
      b[1] > 0.6 && (!u || v > u.sc) && (u = { a: m, b: g, n: b, L: x, sc: v });
    }
    if (!u) continue;
    let d = {
      q: h,
      ...u,
      ux: (u.b[0] - u.a[0]) / u.L,
      uz: (u.b[1] - u.a[1]) / u.L,
      m: [(u.a[0] + u.b[0]) / 2, (u.a[1] + u.b[1]) / 2],
    };
    if ((n.boards.push(d), c === zR)) {
      d.vault = [
        d.m[0] - d.ux * 3.5 + d.n[0] * 0.1,
        d.m[1] - d.uz * 3.5 + d.n[1] * 0.1,
      ];
      for (let p of [-1, 1])
        s.push({
          t: "circ",
          x: d.vault[0] + d.ux * p * 1.6 + d.n[0] * 3.3,
          z: d.vault[1] + d.uz * p * 1.6 + d.n[1] * 3.3,
          r: 0.15,
          y0: e - 1,
          y1: e + 4,
          p39: !0,
        });
    }
  }
  {
    let c = i.edge,
      h = Math.max(
        0,
        c.findIndex((f) => f[0] > -1483),
      );
    n.oldSign = [c[h][0], c[h][1] - 6];
    for (let f of [-2.7, 2.7])
      s.push({
        t: "circ",
        x: n.oldSign[0] + f,
        z: n.oldSign[1],
        r: 0.25,
        y0: e - 1,
        y1: e + 4,
        p39: !0,
      });
  }
}
