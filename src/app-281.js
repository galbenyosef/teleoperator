// app 281 — math
// Lines 137949-138298 of readable/app.pretty.js (statement-aligned).
async function aJ({
  mats: i,
  mb: t,
  hook: e,
  code: s,
  fetchBytes: n,
  base: o = "assets/",
  lazy: a = null,
}) {
  let r = new go(),
    l = (y) => (M) => (
      (M.colorSpace = y ? is : On),
      (M.flipY = !1),
      (M.anisotropy = 8),
      (M.wrapS = M.wrapT = $i),
      M
    ),
    c = (y, M) =>
      a
        ? Promise.resolve(a(`${o}tex/${y}.webp`, l(M)))
        : r
            .loadAsync(`${o}tex/${y}.webp`)
            .then(l(M))
            .catch(() => null),
    [h, f, u, d, p, m] = await Promise.all([
      c("ground_a", !0),
      c("ground_b", !0),
      c("ground_a_n", !1),
      c("ground_b_n", !1),
      n(o + "real/ground.bin").catch(() => null),
      n(o + "real/green.bin").catch(() => null),
    ]);
  if (!h || !f || !u || !d) return null;
  let g = new Xi(new Uint8Array([0, 0, 0, 255]), 1, 1, no);
  ((g.needsUpdate = !0), (g.colorSpace = On));
  let b = (y) => {
      let M = e(s, h);
      return (
        Object.assign(M.userData, {
          mbExtraMap: f,
          mbMap1: u,
          mbMap3: d,
          mbMap8: y,
          mbSkyVis: 2,
        }),
        M
      );
    },
    x = i.terrain.color;
  ((i.terrain = b(g)), (i.terrain.color = x));
  let v = aI(p, m);
  return (
    (v.live = new Map()),
    (v.materialFor = (y) => {
      let M = b(y);
      M.color = i.terrain.color;
      let S = y.name.slice(11);
      return (y.image?.data && v.live.set(S, y), M);
    }),
    (v.grassAt = (y, M) => {
      let S = Math.floor(y / Mi),
        w = Math.floor(M / Mi),
        z = v.live.get(S + "," + w);
      if (!z) return -1;
      let _ = z.image.data,
        R = Math.min(dp - 1, Math.floor((y - S * Mi) * bl)),
        T = Math.min(dp - 1, Math.floor((M - w * Mi) * bl)),
        E = (T * dp + R) * 4;
      return (_[E] / 255) * (1 - _[E + 1] / 255);
    }),
    (v.dryAt = (y, M) => {
      let S = Math.floor(y / Mi),
        w = Math.floor(M / Mi),
        z = v.live.get(S + "," + w);
      if (!z) return 0;
      let _ = z.image.data,
        R = Math.min(dp - 1, Math.floor((y - S * Mi) * bl)),
        T = Math.min(dp - 1, Math.floor((M - w * Mi) * bl)),
        E = (T * dp + R) * 4;
      return _[E + 1] > 127 ? 0 : _[E + 2] / 255;
    }),
    (v.release = (y) => {
      let M = y.userData.mbMap8,
        S = t._texCache?.get(M);
      (v.live.get(M.name.slice(11)) === M && v.live.delete(M.name.slice(11)),
        S && (S.tex.destroy(), t._texCache.delete(M)),
        t._matCache?.delete(y),
        M.dispose(),
        y.dispose());
    }),
    v
  );
}
function rJ(i, t, e = null) {
  let s = [],
    n = (i.beds = new Map()),
    o = 12345,
    a = () => (o = (o * 16807) % 2147483647) / 2147483647,
    r = (p, m) => {
      let g = i.idx.get(Math.floor(p / Mi) + "," + Math.floor(m / Mi));
      if (!g) return !1;
      for (let b of g.green)
        if (
          p >= b.bb[0] &&
          p <= b.bb[2] &&
          m >= b.bb[1] &&
          m <= b.bb[3] &&
          b_(b.rings, p, m)
        )
          return b;
      return !1;
    },
    l = (p, m) => gx(i, p, m) >= 0 || c(p, m, 1.2),
    c = (p, m, g) => {
      let b = i.idx.get(Math.floor(p / Mi) + "," + Math.floor(m / Mi));
      if (!b) return !1;
      for (let x of b.lines) {
        if (p < x.bb[0] || p > x.bb[2] || m < x.bb[1] || m > x.bb[3]) continue;
        let v = x.pts;
        for (let y = 0; y + 3 < v.length; y += 2) {
          let M = v[y],
            S = v[y + 1],
            w = v[y + 2] - M,
            z = v[y + 3] - S,
            _ = w * w + z * z || 1e-9,
            R = Math.max(0, Math.min(1, ((p - M) * w + (m - S) * z) / _));
          if (Math.hypot(p - M - R * w, m - S - R * z) < x.w / 2 + g) return !0;
        }
      }
      return !1;
    },
    h = (p, m, g) => {
      let b = Math.floor(p / Mi) + "," + Math.floor(m / Mi),
        x = n.get(b);
      (x || n.set(b, (x = [])), x.push([p, m, g]));
    },
    f = { shrub: 0.85, flowers: 0.55 },
    u = (p, m, g, b, x) => !e || e(m, g, f[p] * b + 0.3, x),
    d = (p, m, g, b, x = !0) => {
      let v = a() * 6.283;
      return u(p, m, g, b, x)
        ? (s.push({ kind: p, x: m, y: t(m, g), z: g, rot: v, scale: b }), !0)
        : !1;
    };
  for (let p of i.green) {
    if (!p.park) continue;
    let m = p.rings[0];
    for (let g = 0, b = m.length - 2; g < m.length; b = g, g += 2) {
      let x = m[b],
        v = m[b + 1],
        y = m[g],
        M = m[g + 1],
        S = Math.hypot(y - x, M - v);
      if (S < 4) continue;
      let w = -(M - v) / S,
        z = (y - x) / S;
      for (let _ = 3; _ < S - 3; _ += 8 + a() * 6) {
        if (a() < 0.45) continue;
        let R = x + ((y - x) * _) / S,
          T = v + ((M - v) * _) / S,
          E = 1.8 + a() * 1.5,
          A = R + w * E,
          C = T + z * E;
        if (
          (!b_(p.rings, A, C) &&
            ((A = R - w * E), (C = T - z * E), !b_(p.rings, A, C))) ||
          l(A, C)
        )
          continue;
        let P = 1 + Math.floor(a() * 3);
        for (let I = 0; I < P; I++) {
          let L = A + ((y - x) / S) * (I - P / 2) * 1.5,
            F = C + ((M - v) / S) * (I - P / 2) * 1.5,
            N = 0.7 + a() * 0.6;
          d("shrub", L, F, N) && h(L, F, 1.3);
        }
      }
    }
  }
  for (let p of i.lines) {
    let m = p.pts;
    for (let g = 0; g + 3 < m.length; g += 2) {
      let b = m[g],
        x = m[g + 1],
        v = m[g + 2],
        y = m[g + 3],
        M = Math.hypot(v - b, y - x);
      if (M < 3) continue;
      let S = -(y - x) / M,
        w = (v - b) / M;
      for (let z = 2; z < M - 2; z += 14 + a() * 16) {
        if (a() < 0.55) continue;
        let _ = a() < 0.5 ? 1 : -1,
          R = p.w / 2 + 1.2,
          T = b + ((v - b) * z) / M + S * R * _,
          E = x + ((y - x) * z) / M + w * R * _;
        if (!r(T, E) || l(T, E)) continue;
        let A = 2 + Math.floor(a() * 3),
          C = 0;
        for (let P = 0; P < A; P++) {
          let I = T + ((v - b) / M) * P * 0.9 + S * _ * a() * 0.6,
            L = E + ((y - x) / M) * P * 0.9 + w * _ * a() * 0.6;
          C += d("flowers", I, L, 0.8 + a() * 0.4);
        }
        C &&
          h(
            T + ((v - b) / M) * A * 0.45,
            E + ((y - x) / M) * A * 0.45,
            A * 0.6 + 0.6,
          );
      }
    }
  }
  for (let p of i.areas) {
    if (p.c !== 1) continue;
    let m = p.rings[0];
    for (let g = 0, b = m.length - 2; g < m.length; b = g, g += 2) {
      let x = m[b],
        v = m[b + 1],
        y = m[g],
        M = m[g + 1],
        S = Math.hypot(y - x, M - v);
      if (!(S < 6))
        for (let w = 4; w < S - 4; w += 12 + a() * 10) {
          if (a() < 0.6) continue;
          let z = x + ((y - x) * w) / S,
            _ = v + ((M - v) * w) / S;
          c(z, _, 0.5) ||
            (d("shrub", z, _, 0.8 + a() * 0.4, !1) && h(z, _, 1.2));
        }
    }
  }
  return s;
}
function lJ(i, t, e) {
  if (!i || i.viaLots) return;
  i.viaLots = !0;
  let s = {},
    n = (o, a) => {
      let r = o[0],
        l = 1e9,
        c = 1e9,
        h = -1e9,
        f = -1e9;
      for (let d = 0; d < r.length; d += 2)
        ((l = Math.min(l, r[d])),
          (h = Math.max(h, r[d])),
          (c = Math.min(c, r[d + 1])),
          (f = Math.max(f, r[d + 1])));
      let u = { rings: o, c: 1, m: a, bb: [l, c, h, f] };
      i.areas.push(u);
      for (let d = Math.floor(l / Mi); d <= Math.floor(h / Mi); d++)
        for (let p = Math.floor(c / Mi); p <= Math.floor(f / Mi); p++) {
          let m = d + "," + p,
            g = i.idx.get(m);
          (g || i.idx.set(m, (g = { areas: [], lines: [], green: [] })),
            g.areas.push(u));
        }
    };
  for (let o of t.edges) {
    if (
      !o.elev ||
      o.inner ||
      o.custom ||
      o.tunnelR ||
      (o.cls !== "motorway" && o.cls !== "motorway_link")
    )
      continue;
    let a = oI(o.id, 7.3) < 0.2 ? iJ.dg : iJ.asphalt,
      r = [],
      l = [],
      c = () => {
        if (r.length >= 4) {
          let h = new Float32Array(r.length * 2),
            f = 0;
          for (let u = 0; u < r.length; u += 2)
            ((h[f++] = r[u]), (h[f++] = r[u + 1]));
          for (let u = l.length - 2; u >= 0; u -= 2)
            ((h[f++] = l[u]), (h[f++] = l[u + 1]));
          n([h], a);
        }
        ((r = []), (l = []));
      };
    for (let h = o.s0; h < o.s1 + 3.99; h += 4) {
      if (
        (Ot(o, Math.min(h, o.s1), s),
        s.x < -3e3 || s.y - e.terrainAt(s.x, s.z) < 3.5)
      ) {
        c();
        continue;
      }
      let f = s.w + 1.4;
      if (
        (r.push(s.x + s.nx * f, s.z + s.nz * f),
        l.push(s.x - s.nx * f, s.z - s.nz * f),
        r.length >= 22)
      ) {
        let u = r.slice(-2),
          d = l.slice(-2);
        (c(), r.push(...u), l.push(...d));
      }
    }
    c();
  }
}
var bx = (i, t, e) => {
    let s = Math.sin(i * 12.9898 + t * 78.233 + e * 17.17) * 43758.5453;
    return s - Math.floor(s);
  },
  txt = (i, t) => {
    let e = Math.floor(i),
      s = Math.floor(t),
      n = i - e,
      o = t - s,
      a = (f) => f * f * (3 - 2 * f),
      r = bx(e, s, 1),
      l = bx(e + 1, s, 1),
      c = bx(e, s + 1, 1),
      h = bx(e + 1, s + 1, 1);
    return (
      r + (l - r) * a(n) + (c + (h - c) * a(n) - (r + (l - r) * a(n))) * a(o)
    );
  },
  v_ = (i, t) => i[Math.min(i.length - 1, Math.floor(t * i.length))],
  rI = {
    presidio: [un.coyote, un.coyote, un.juniper, un.escal],
    downtown: [un.pitto, un.escal, un.pitto, un.rosem],
    park: [un.pitto, un.escal, un.hydr, un.pitto, un.rosem, un.coyote],
  },
  cJ = new Set([
    "towers",
    "fidi",
    "union",
    "soma",
    "chinatown",
    "jackson",
    "tenderloin",
  ]),
  ext = (i, t) => {
    let e = Ai(i, t);
    return e === "presidio" ? "presidio" : cJ.has(e) ? "downtown" : "park";
  };
function hJ(i) {
  return (
    i.kind === "shrub" &&
      i.cell === void 0 &&
      (i.cell = v_(rI[ext(i.x, i.z)], bx(i.x, i.z, 21))),
    i
  );
}
