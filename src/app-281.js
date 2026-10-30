// app 281 — math
// Lines 138570-138823 of readable/app.pretty.js (statement-aligned).
function pQ(o, t, e, s = () => !1) {
  let n = [],
    i = performance.now(),
    a = 2121,
    r = () => (a = (a * 16807) % 2147483647) / 2147483647,
    l = (x, y, M) => {
      let S = o.idx.get(Math.floor(x / 256) + "," + Math.floor(y / 256));
      if (!S) return !1;
      for (let w of S.lines) {
        if (x < w.bb[0] || x > w.bb[2] || y < w.bb[1] || y > w.bb[3]) continue;
        let _ = w.pts;
        for (let z = 0; z + 3 < _.length; z += 2) {
          let A = _[z],
            T = _[z + 1],
            E = _[z + 2] - A,
            R = _[z + 3] - T,
            P = E * E + R * R || 1e-9,
            C = Math.max(0, Math.min(1, ((x - A) * E + (y - T) * R) / P));
          if (Math.hypot(x - A - C * E, y - T - C * R) < w.w / 2 + M) return !0;
        }
      }
      return !1;
    },
    c = t.clearOfRoads
      ? (x, y, M) => t.clearOfRoads(x, y, M, !0)
      : (x, y, M) => {
          let S = t.roadAt(x, y, M + 9, void 0, !0);
          return !S || S.dd > M + (S.E.sw ?? 3);
        },
    h = {},
    f = (x, y, M) => {
      let S = t.coverAt(x, y);
      if ((S & 15) === 3 || (S & 15) === 4 || S & 24) return NaN;
      let w = t.terrainAt(x, y, h);
      if (h.dx * h.dx + h.dz * h.dz > 0.6) return NaN;
      if (s(x, y) || sv(o, x, y) >= 0 || l(x, y, M + 0.3)) return NaN;
      if (g === null) {
        let _ = t.roadAt(b, v, 14, void 0, !0);
        g = !_ || _.dd > 8.5 + (_.E.sw ?? 3);
      }
      return g || c(x, y, M) ? w : NaN;
    },
    u = (x, y, M, S, w, _) => {
      let z = f(M, S, _ * w);
      return z !== z
        ? !1
        : (n.push({
            kind: x,
            cell: y,
            x: M,
            y: z,
            z: S,
            rot: r() * 6.283,
            scale: w,
            sz: w * (0.85 + r() * 0.3),
          }),
          !0);
    },
    d = 0,
    p = 0,
    m = 0,
    g = null,
    b = 0,
    v = 0;
  for (let x of e) {
    if (x.kind !== "tree") continue;
    if (!x.park) {
      let w = nv(x.x, x.z, 31);
      if (w > 0.14 || uQ.has(Di(x.x, x.z))) continue;
      (n.push({
        kind: w < 0.08 ? "mat" : "clump",
        cell: w < 0.05 ? gn.ivy : w < 0.08 ? gn.clover : gn.agap,
        x: x.x,
        y: x.y + 0.17,
        z: x.z,
        rot: w * 900,
        scale: w < 0.08 ? 0.42 : 0.65,
      }),
        m++);
      continue;
    }
    ((g = null), (b = x.x), (v = x.z));
    let y = /euc|cypress|pine/.test(x.sp || "") && Di(x.x, x.z) === "presidio",
      M = x.z < -1100 && x.x < -2600,
      S = zyt(x.x / 25, x.z / 25);
    if (y) {
      if (S < 0.4) continue;
      let w = 1 + Math.floor(r() * (S > 0.62 ? 3 : 1.6));
      for (let _ = 0; _ < w; _++) {
        let z = r() * 6.283,
          A = 2.2 + r() * 5.5,
          T = x.x + Math.cos(z) * A,
          E = x.z + Math.sin(z) * A,
          R = r();
        A < 4.5 && R < 0.6
          ? (d += u("clump", gn.fern, T, E, 0.8 + r() * 0.5, 0.5))
          : R < 0.75
            ? (d += u(
                "shrub",
                v_([gn.coyote, gn.coyote, gn.juniper], r()),
                T,
                E,
                0.75 + r() * 0.6,
                0.7,
              ))
            : (d += u("clump", gn.wild, T, E, 0.7 + r() * 0.5, 0.4));
      }
    } else if (M) {
      if (S < 0.45) continue;
      for (let w = 0; w < 2; w++) {
        let _ = r() * 6.283,
          z = 2 + r() * 4,
          A = x.x + Math.cos(_) * z,
          T = x.z + Math.sin(_) * z;
        p +=
          r() < 0.6
            ? u("mat", gn.ice, A, T, 0.9 + r() * 0.5, 0.7)
            : u("clump", gn.wild, A, T, 0.7 + r() * 0.4, 0.4);
      }
    } else {
      let w = r();
      if (w < 0.13 && S > 0.5) {
        let _ = r() * 6.283,
          z = 3.2 + r() * 1.5,
          A = v_(BF.park, r()),
          T = 2 + Math.floor(r() * 3);
        for (let E = 0; E < T; E++) {
          let R = _ + (E - T / 2) * 0.32,
            P = z + (E % 2) * 0.9;
          p += u(
            "shrub",
            E % 3 === 2 ? v_(BF.park, r()) : A,
            x.x + Math.cos(R) * P,
            x.z + Math.sin(R) * P,
            0.65 + 0.35 * (1 - (E % 2)) + r() * 0.2,
            0.7,
          );
        }
        if (r() < 0.5) {
          let E = _ + 0.9,
            R = x.x + Math.cos(E) * (z + 1.4),
            P = x.z + Math.sin(E) * (z + 1.4);
          p += u(
            "clump",
            r() < 0.5 ? gn.agap : gn.flax,
            R,
            P,
            0.7 + r() * 0.3,
            0.45,
          );
        }
      } else
        w < 0.22
          ? (p += u(
              "mat",
              r() < 0.6 ? gn.ivy : gn.clover,
              x.x + (r() - 0.5) * 0.8,
              x.z + (r() - 0.5) * 0.8,
              0.9 + r() * 0.4,
              0.3,
            ))
          : w < 0.27 &&
            S > 0.55 &&
            (p += u(
              "clump",
              gn.fern,
              x.x + (r() - 0.5) * 3,
              x.z + (r() - 0.5) * 3,
              0.7 + r() * 0.3,
              0.4,
            ));
    }
  }
  return (
    (n.stats = {
      forest: d,
      park: p,
      wells: m,
      ms: Math.round(performance.now() - i),
    }),
    n
  );
}
var Eyt = ["fhedge", "planter", "shrub", "clump", "ivywall", "mat", "fhedge2"],
  Tyt = 19;
function mQ(o) {
  let t = o instanceof Uint8Array ? o : new Uint8Array(o),
    e = new DataView(t.buffer, t.byteOffset, t.byteLength),
    s = e.getUint32(0, !0),
    n = [];
  for (let i = 0; i < s; i++) {
    let a = 4 + i * Tyt,
      r = e.getUint8(a + 1),
      l = e.getUint8(a + 17),
      c = e.getUint16(a + 15, !0) / 100,
      h = {
        kind: Eyt[e.getUint8(a)],
        x: e.getInt32(a + 2, !0) / 100,
        z: e.getInt32(a + 6, !0) / 100,
        y: (e.getUint16(a + 10, !0) - 32768) / 100,
        rot: (e.getUint16(a + 12, !0) / 65535) * 6.2832,
        scale: e.getUint8(a + 14) / 50,
      };
    (r !== 255 && (h.cell = r),
      c && (h.sz = c),
      l && (h.sx = (h.scale * l) / 100));
    let f = e.getInt8(a + 18);
    (f && (h.shy = f / 200), n.push(h));
  }
  return n;
}
es();
var iv = 630,
  Ryt = 2600,
  gQ = (o, t, e = 0) => {
    let s = Math.sin(o * 12.9898 + t * 78.233 + e * 37.719) * 43758.5453;
    return s - Math.floor(s);
  };
function bQ(o, t, e = [0, 1]) {
  let s = [],
    n = [],
    i = [],
    a = [],
    r = [];
  for (let c of e) {
    let h = s.length / 3;
    for (let [f, u] of [
      [0, 1],
      [1, 1],
      [1, 0],
      [0, 0],
    ]) {
      let d = f - 0.5,
        p = 1 - u;
      (c === 0
        ? (s.push(d, p, 0), n.push(0, 0, 1))
        : c === 1
          ? (s.push(0, p, -d), n.push(1, 0, 0))
          : (s.push(d, 0, u - 0.5), n.push(0, 1, 0)),
        i.push((c + 0.004 + 0.992 * f) / o, (0.004 + 0.992 * u) / t),
        a.push(1, 1, 1, 1));
    }
    r.push(h, h + 1, h + 2, h, h + 2, h + 3);
  }
  let l = new Le();
  return (
    l.setAttribute("position", new Re(s, 3)),
    l.setAttribute("normal", new Re(n, 3)),
    l.setAttribute("uv", new Re(i, 2)),
    l.setAttribute("color", new Re(a, 4)),
    l.setIndex(r),
    l
  );
}
