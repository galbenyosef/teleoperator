// app 280 — math
// Lines 138220-138569 of readable/app.pretty.js (statement-aligned).
async function cQ({
  mats: o,
  mb: t,
  hook: e,
  code: s,
  fetchBytes: n,
  base: i = "assets/",
  lazy: a = null,
}) {
  let r = new ko(),
    l = (y) => (M) => (
      (M.colorSpace = y ? Je : Nn),
      (M.flipY = !1),
      (M.anisotropy = 8),
      (M.wrapS = M.wrapT = so),
      M
    ),
    c = (y, M) =>
      a
        ? Promise.resolve(a(`${i}tex/${y}.webp`, l(M)))
        : r
            .loadAsync(`${i}tex/${y}.webp`)
            .then(l(M))
            .catch(() => null),
    [h, f, u, d, p, m] = await Promise.all([
      c("ground_a", !0),
      c("ground_b", !0),
      c("ground_a_n", !1),
      c("ground_b_n", !1),
      n(i + "real/ground.bin").catch(() => null),
      n(i + "real/green.bin").catch(() => null),
    ]);
  if (!h || !f || !u || !d) return null;
  let g = new no(new Uint8Array([0, 0, 0, 255]), 1, 1, go);
  ((g.needsUpdate = !0), (g.colorSpace = Nn));
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
    v = o.terrain.color;
  ((o.terrain = b(g)), (o.terrain.color = v));
  let x = OF(p, m);
  return (
    (x.live = new Map()),
    (x.materialFor = (y) => {
      let M = b(y);
      M.color = o.terrain.color;
      let S = y.name.slice(11);
      return (y.image?.data && x.live.set(S, y), M);
    }),
    (x.grassAt = (y, M) => {
      let S = Math.floor(y / Fi),
        w = Math.floor(M / Fi),
        _ = x.live.get(S + "," + w);
      if (!_) return -1;
      let z = _.image.data,
        A = Math.min(qp - 1, Math.floor((y - S * Fi) * Bl)),
        T = Math.min(qp - 1, Math.floor((M - w * Fi) * Bl)),
        E = (T * qp + A) * 4;
      return (z[E] / 255) * (1 - z[E + 1] / 255);
    }),
    (x.dryAt = (y, M) => {
      let S = Math.floor(y / Fi),
        w = Math.floor(M / Fi),
        _ = x.live.get(S + "," + w);
      if (!_) return 0;
      let z = _.image.data,
        A = Math.min(qp - 1, Math.floor((y - S * Fi) * Bl)),
        T = Math.min(qp - 1, Math.floor((M - w * Fi) * Bl)),
        E = (T * qp + A) * 4;
      return z[E + 1] > 127 ? 0 : z[E + 2] / 255;
    }),
    (x.release = (y) => {
      let M = y.userData.mbMap8,
        S = t._texCache?.get(M);
      (x.live.get(M.name.slice(11)) === M && x.live.delete(M.name.slice(11)),
        S && (S.tex.destroy(), t._texCache.delete(M)),
        t._matCache?.delete(y),
        M.dispose(),
        y.dispose());
    }),
    x
  );
}
function hQ(o, t, e = null) {
  let s = [],
    n = (o.beds = new Map()),
    i = 12345,
    a = () => (i = (i * 16807) % 2147483647) / 2147483647,
    r = (p, m) => {
      let g = o.idx.get(Math.floor(p / Fi) + "," + Math.floor(m / Fi));
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
    l = (p, m) => sv(o, p, m) >= 0 || c(p, m, 1.2),
    c = (p, m, g) => {
      let b = o.idx.get(Math.floor(p / Fi) + "," + Math.floor(m / Fi));
      if (!b) return !1;
      for (let v of b.lines) {
        if (p < v.bb[0] || p > v.bb[2] || m < v.bb[1] || m > v.bb[3]) continue;
        let x = v.pts;
        for (let y = 0; y + 3 < x.length; y += 2) {
          let M = x[y],
            S = x[y + 1],
            w = x[y + 2] - M,
            _ = x[y + 3] - S,
            z = w * w + _ * _ || 1e-9,
            A = Math.max(0, Math.min(1, ((p - M) * w + (m - S) * _) / z));
          if (Math.hypot(p - M - A * w, m - S - A * _) < v.w / 2 + g) return !0;
        }
      }
      return !1;
    },
    h = (p, m, g) => {
      let b = Math.floor(p / Fi) + "," + Math.floor(m / Fi),
        v = n.get(b);
      (v || n.set(b, (v = [])), v.push([p, m, g]));
    },
    f = { shrub: 0.85, flowers: 0.55 },
    u = (p, m, g, b, v) => !e || e(m, g, f[p] * b + 0.3, v),
    d = (p, m, g, b, v = !0) => {
      let x = a() * 6.283;
      return u(p, m, g, b, v)
        ? (s.push({ kind: p, x: m, y: t(m, g), z: g, rot: x, scale: b }), !0)
        : !1;
    };
  for (let p of o.green) {
    if (!p.park) continue;
    let m = p.rings[0];
    for (let g = 0, b = m.length - 2; g < m.length; b = g, g += 2) {
      let v = m[b],
        x = m[b + 1],
        y = m[g],
        M = m[g + 1],
        S = Math.hypot(y - v, M - x);
      if (S < 4) continue;
      let w = -(M - x) / S,
        _ = (y - v) / S;
      for (let z = 3; z < S - 3; z += 8 + a() * 6) {
        if (a() < 0.45) continue;
        let A = v + ((y - v) * z) / S,
          T = x + ((M - x) * z) / S,
          E = 1.8 + a() * 1.5,
          R = A + w * E,
          P = T + _ * E;
        if (
          (!b_(p.rings, R, P) &&
            ((R = A - w * E), (P = T - _ * E), !b_(p.rings, R, P))) ||
          l(R, P)
        )
          continue;
        let C = 1 + Math.floor(a() * 3);
        for (let I = 0; I < C; I++) {
          let L = R + ((y - v) / S) * (I - C / 2) * 1.5,
            F = P + ((M - x) / S) * (I - C / 2) * 1.5,
            O = 0.7 + a() * 0.6;
          d("shrub", L, F, O) && h(L, F, 1.3);
        }
      }
    }
  }
  for (let p of o.lines) {
    let m = p.pts;
    for (let g = 0; g + 3 < m.length; g += 2) {
      let b = m[g],
        v = m[g + 1],
        x = m[g + 2],
        y = m[g + 3],
        M = Math.hypot(x - b, y - v);
      if (M < 3) continue;
      let S = -(y - v) / M,
        w = (x - b) / M;
      for (let _ = 2; _ < M - 2; _ += 14 + a() * 16) {
        if (a() < 0.55) continue;
        let z = a() < 0.5 ? 1 : -1,
          A = p.w / 2 + 1.2,
          T = b + ((x - b) * _) / M + S * A * z,
          E = v + ((y - v) * _) / M + w * A * z;
        if (!r(T, E) || l(T, E)) continue;
        let R = 2 + Math.floor(a() * 3),
          P = 0;
        for (let C = 0; C < R; C++) {
          let I = T + ((x - b) / M) * C * 0.9 + S * z * a() * 0.6,
            L = E + ((y - v) / M) * C * 0.9 + w * z * a() * 0.6;
          P += d("flowers", I, L, 0.8 + a() * 0.4);
        }
        P &&
          h(
            T + ((x - b) / M) * R * 0.45,
            E + ((y - v) / M) * R * 0.45,
            R * 0.6 + 0.6,
          );
      }
    }
  }
  for (let p of o.areas) {
    if (p.c !== 1) continue;
    let m = p.rings[0];
    for (let g = 0, b = m.length - 2; g < m.length; b = g, g += 2) {
      let v = m[b],
        x = m[b + 1],
        y = m[g],
        M = m[g + 1],
        S = Math.hypot(y - v, M - x);
      if (!(S < 6))
        for (let w = 4; w < S - 4; w += 12 + a() * 10) {
          if (a() < 0.6) continue;
          let _ = v + ((y - v) * w) / S,
            z = x + ((M - x) * w) / S;
          c(_, z, 0.5) ||
            (d("shrub", _, z, 0.8 + a() * 0.4, !1) && h(_, z, 1.2));
        }
    }
  }
  return s;
}
function fQ(o, t, e) {
  if (!o || o.viaLots) return;
  o.viaLots = !0;
  let s = {},
    n = (i, a) => {
      let r = i[0],
        l = 1e9,
        c = 1e9,
        h = -1e9,
        f = -1e9;
      for (let d = 0; d < r.length; d += 2)
        ((l = Math.min(l, r[d])),
          (h = Math.max(h, r[d])),
          (c = Math.min(c, r[d + 1])),
          (f = Math.max(f, r[d + 1])));
      let u = { rings: i, c: 1, m: a, bb: [l, c, h, f] };
      o.areas.push(u);
      for (let d = Math.floor(l / Fi); d <= Math.floor(h / Fi); d++)
        for (let p = Math.floor(c / Fi); p <= Math.floor(f / Fi); p++) {
          let m = d + "," + p,
            g = o.idx.get(m);
          (g || o.idx.set(m, (g = { areas: [], lines: [], green: [] })),
            g.areas.push(u));
        }
    };
  for (let i of t.edges) {
    if (
      !i.elev ||
      i.inner ||
      i.custom ||
      i.tunnelR ||
      (i.cls !== "motorway" && i.cls !== "motorway_link")
    )
      continue;
    let a = FF(i.id, 7.3) < 0.2 ? rQ.dg : rQ.asphalt,
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
    for (let h = i.s0; h < i.s1 + 3.99; h += 4) {
      if (
        (Ot(i, Math.min(h, i.s1), s),
        (Syt && s.x < -3e3) || s.y - e.terrainAt(s.x, s.z) < 3.5)
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
var nv = (o, t, e) => {
    let s = Math.sin(o * 12.9898 + t * 78.233 + e * 17.17) * 43758.5453;
    return s - Math.floor(s);
  },
  zyt = (o, t) => {
    let e = Math.floor(o),
      s = Math.floor(t),
      n = o - e,
      i = t - s,
      a = (f) => f * f * (3 - 2 * f),
      r = nv(e, s, 1),
      l = nv(e + 1, s, 1),
      c = nv(e, s + 1, 1),
      h = nv(e + 1, s + 1, 1);
    return (
      r + (l - r) * a(n) + (c + (h - c) * a(n) - (r + (l - r) * a(n))) * a(i)
    );
  },
  v_ = (o, t) => o[Math.min(o.length - 1, Math.floor(t * o.length))],
  BF = {
    presidio: [gn.coyote, gn.coyote, gn.juniper, gn.escal],
    downtown: [gn.pitto, gn.escal, gn.pitto, gn.rosem],
    park: [gn.pitto, gn.escal, gn.hydr, gn.pitto, gn.rosem, gn.coyote],
  },
  uQ = new Set([
    "towers",
    "fidi",
    "union",
    "soma",
    "chinatown",
    "jackson",
    "tenderloin",
  ]),
  _yt = (o, t) => {
    let e = Di(o, t);
    return e === "presidio" ? "presidio" : uQ.has(e) ? "downtown" : "park";
  };
function dQ(o) {
  return (
    o.kind === "shrub" &&
      o.cell === void 0 &&
      (o.cell = v_(BF[_yt(o.x, o.z)], nv(o.x, o.z, 21))),
    o
  );
}
