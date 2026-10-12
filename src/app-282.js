// app 282 — math
// Lines 138299-138552 of readable/app.pretty.js (statement-aligned).
function fJ(i, t, e, s = () => !1) {
  let n = [],
    o = performance.now(),
    a = 2121,
    r = () => (a = (a * 16807) % 2147483647) / 2147483647,
    l = (v, y, M) => {
      let S = i.idx.get(Math.floor(v / 256) + "," + Math.floor(y / 256));
      if (!S) return !1;
      for (let w of S.lines) {
        if (v < w.bb[0] || v > w.bb[2] || y < w.bb[1] || y > w.bb[3]) continue;
        let z = w.pts;
        for (let _ = 0; _ + 3 < z.length; _ += 2) {
          let R = z[_],
            T = z[_ + 1],
            E = z[_ + 2] - R,
            A = z[_ + 3] - T,
            C = E * E + A * A || 1e-9,
            P = Math.max(0, Math.min(1, ((v - R) * E + (y - T) * A) / C));
          if (Math.hypot(v - R - P * E, y - T - P * A) < w.w / 2 + M) return !0;
        }
      }
      return !1;
    },
    c = t.clearOfRoads
      ? (v, y, M) => t.clearOfRoads(v, y, M, !0)
      : (v, y, M) => {
          let S = t.roadAt(v, y, M + 9, void 0, !0);
          return !S || S.dd > M + (S.E.sw ?? 3);
        },
    h = {},
    f = (v, y, M) => {
      let S = t.coverAt(v, y);
      if ((S & 15) === 3 || (S & 15) === 4 || S & 24) return NaN;
      let w = t.terrainAt(v, y, h);
      if (h.dx * h.dx + h.dz * h.dz > 0.6) return NaN;
      if (s(v, y) || gx(i, v, y) >= 0 || l(v, y, M + 0.3)) return NaN;
      if (g === null) {
        let z = t.roadAt(b, x, 14, void 0, !0);
        g = !z || z.dd > 8.5 + (z.E.sw ?? 3);
      }
      return g || c(v, y, M) ? w : NaN;
    },
    u = (v, y, M, S, w, z) => {
      let _ = f(M, S, z * w);
      return _ !== _
        ? !1
        : (n.push({
            kind: v,
            cell: y,
            x: M,
            y: _,
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
    x = 0;
  for (let v of e) {
    if (v.kind !== "tree") continue;
    if (!v.park) {
      let w = bx(v.x, v.z, 31);
      if (w > 0.14 || cJ.has(Ai(v.x, v.z))) continue;
      (n.push({
        kind: w < 0.08 ? "mat" : "clump",
        cell: w < 0.05 ? un.ivy : w < 0.08 ? un.clover : un.agap,
        x: v.x,
        y: v.y + 0.17,
        z: v.z,
        rot: w * 900,
        scale: w < 0.08 ? 0.42 : 0.65,
      }),
        m++);
      continue;
    }
    ((g = null), (b = v.x), (x = v.z));
    let y = /euc|cypress|pine/.test(v.sp || "") && Ai(v.x, v.z) === "presidio",
      M = v.z < -1100 && v.x < -2600,
      S = txt(v.x / 25, v.z / 25);
    if (y) {
      if (S < 0.4) continue;
      let w = 1 + Math.floor(r() * (S > 0.62 ? 3 : 1.6));
      for (let z = 0; z < w; z++) {
        let _ = r() * 6.283,
          R = 2.2 + r() * 5.5,
          T = v.x + Math.cos(_) * R,
          E = v.z + Math.sin(_) * R,
          A = r();
        R < 4.5 && A < 0.6
          ? (d += u("clump", un.fern, T, E, 0.8 + r() * 0.5, 0.5))
          : A < 0.75
            ? (d += u(
                "shrub",
                v_([un.coyote, un.coyote, un.juniper], r()),
                T,
                E,
                0.75 + r() * 0.6,
                0.7,
              ))
            : (d += u("clump", un.wild, T, E, 0.7 + r() * 0.5, 0.4));
      }
    } else if (M) {
      if (S < 0.45) continue;
      for (let w = 0; w < 2; w++) {
        let z = r() * 6.283,
          _ = 2 + r() * 4,
          R = v.x + Math.cos(z) * _,
          T = v.z + Math.sin(z) * _;
        p +=
          r() < 0.6
            ? u("mat", un.ice, R, T, 0.9 + r() * 0.5, 0.7)
            : u("clump", un.wild, R, T, 0.7 + r() * 0.4, 0.4);
      }
    } else {
      let w = r();
      if (w < 0.13 && S > 0.5) {
        let z = r() * 6.283,
          _ = 3.2 + r() * 1.5,
          R = v_(rI.park, r()),
          T = 2 + Math.floor(r() * 3);
        for (let E = 0; E < T; E++) {
          let A = z + (E - T / 2) * 0.32,
            C = _ + (E % 2) * 0.9;
          p += u(
            "shrub",
            E % 3 === 2 ? v_(rI.park, r()) : R,
            v.x + Math.cos(A) * C,
            v.z + Math.sin(A) * C,
            0.65 + 0.35 * (1 - (E % 2)) + r() * 0.2,
            0.7,
          );
        }
        if (r() < 0.5) {
          let E = z + 0.9,
            A = v.x + Math.cos(E) * (_ + 1.4),
            C = v.z + Math.sin(E) * (_ + 1.4);
          p += u(
            "clump",
            r() < 0.5 ? un.agap : un.flax,
            A,
            C,
            0.7 + r() * 0.3,
            0.45,
          );
        }
      } else
        w < 0.22
          ? (p += u(
              "mat",
              r() < 0.6 ? un.ivy : un.clover,
              v.x + (r() - 0.5) * 0.8,
              v.z + (r() - 0.5) * 0.8,
              0.9 + r() * 0.4,
              0.3,
            ))
          : w < 0.27 &&
            S > 0.55 &&
            (p += u(
              "clump",
              un.fern,
              v.x + (r() - 0.5) * 3,
              v.z + (r() - 0.5) * 3,
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
      ms: Math.round(performance.now() - o),
    }),
    n
  );
}
var sxt = ["fhedge", "planter", "shrub", "clump", "ivywall", "mat", "fhedge2"],
  nxt = 19;
function uJ(i) {
  let t = i instanceof Uint8Array ? i : new Uint8Array(i),
    e = new DataView(t.buffer, t.byteOffset, t.byteLength),
    s = e.getUint32(0, !0),
    n = [];
  for (let o = 0; o < s; o++) {
    let a = 4 + o * nxt,
      r = e.getUint8(a + 1),
      l = e.getUint8(a + 17),
      c = e.getUint16(a + 15, !0) / 100,
      h = {
        kind: sxt[e.getUint8(a)],
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
as();
var xx = 630,
  ixt = 2600,
  dJ = (i, t, e = 0) => {
    let s = Math.sin(i * 12.9898 + t * 78.233 + e * 37.719) * 43758.5453;
    return s - Math.floor(s);
  };
function pJ(i, t, e = [0, 1]) {
  let s = [],
    n = [],
    o = [],
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
        o.push((c + 0.004 + 0.992 * f) / i, (0.004 + 0.992 * u) / t),
        a.push(1, 1, 1, 1));
    }
    r.push(h, h + 1, h + 2, h, h + 2, h + 3);
  }
  let l = new De();
  return (
    l.setAttribute("position", new ze(s, 3)),
    l.setAttribute("normal", new ze(n, 3)),
    l.setAttribute("uv", new ze(o, 2)),
    l.setAttribute("color", new ze(a, 4)),
    l.setIndex(r),
    l
  );
}
