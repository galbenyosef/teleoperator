// app 419 — math
// Lines 203746-204059 of readable/app.pretty.js (statement-aligned).
function Rkt(o) {
  let t = performance.now(),
    e = { D: o, names: [], nameId: new Map() },
    s = o.terrain;
  e.fine = [s.x0, s.z0, s.x0 + (s.nx - 1) * s.step, s.z0 + (s.nz - 1) * s.step];
  let n = s.cover;
  ((e.sea = RN(
    s.nx,
    s.nz,
    (r, l) => (n[l * s.nx + r] & 8 ? 1 : 0),
    s.x0,
    s.z0,
    s.step,
    1.4,
  ).path),
    pot(e),
    (e.hasFar = (o.far || []).length > 0),
    (e.farLand = []),
    (e.outsideGreen = wkt.map((r) => {
      let l = new Path2D();
      return (
        r.forEach(([c, h], f) => (f ? l.lineTo(c, h) : l.moveTo(c, h))),
        l.closePath(),
        l
      );
    })),
    (e.outside = ykt
      .filter((r, l) => !(e.hasFar && l >= 1 && l <= 3))
      .map((r) => {
        let l = new Path2D();
        return (
          r.forEach(([c, h], f) => (f ? l.lineTo(c, h) : l.moveTo(c, h))),
          l.closePath(),
          l
        );
      })),
    (e.beyond = _N.filter((r) => !(e.regions.length && r.id === "101"))));
  let i = o.edges,
    a = i.length;
  ((e.rank = new Uint8Array(a)),
    (e.hw = new Float32Array(a)),
    (e.bb = new Float32Array(a * 4)),
    (e.EB = new Map()));
  for (let r of i) {
    let l = r.P,
      c = 0,
      h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let m = 0; m < r.n; m++)
      ((c += r.W[m]),
        (h = Math.min(h, l[m * 3])),
        (u = Math.max(u, l[m * 3])),
        (f = Math.min(f, l[m * 3 + 1])),
        (d = Math.max(d, l[m * 3 + 1])));
    let p = Array.from(
      r.W.subarray ? r.W.subarray(0, r.n) : r.W.slice(0, r.n),
    ).sort((m, g) => m - g);
    ((e.rank[r.id] = bkt[r.cls] ?? 6),
      (e.hw[r.id] = p.length ? p[p.length >> 1] : c / r.n),
      e.bb.set([h, f, u, d], r.id * 4),
      TN(e.EB, h, f, u, d, r.id));
  }
  {
    let r = new Map();
    for (let l of i) {
      if (!l.name) continue;
      let c = l.name + "|" + e.rank[l.id],
        h = r.get(c);
      (h || r.set(c, (h = [])), h.push(l));
    }
    for (let l of r.values()) {
      if (l.length < 2) continue;
      let c = l.map((d) => [e.hw[d.id], d.L || 1]).sort((d, p) => d[0] - p[0]),
        h = c.reduce((d, p) => d + p[1], 0),
        f = 0,
        u = c[0][0];
      for (let [d, p] of c)
        if (((f += p), f >= h / 2)) {
          u = d;
          break;
        }
      for (let d of l) e.hw[d.id] = Hh(e.hw[d.id], u * 0.8, u * 1.2);
    }
  }
  return (
    (e.eSeen = new Uint32Array(a)),
    mot(e),
    (e.A = null),
    (e.shields = []),
    (e.ms = performance.now() - t),
    e
  );
}
function pot(o) {
  ((o.regions = (o.D.terrain.regions || []).map((t) => {
    let e = t.cover;
    return {
      fine: t.clipBox || [
        t.x0,
        t.z0,
        t.x0 + (t.nx - 1) * t.step,
        t.z0 + (t.nz - 1) * t.step,
      ],
      sea: RN(
        Math.ceil(t.nx / 2),
        Math.ceil(t.nz / 2),
        (n, i) =>
          e[Math.min(t.nz - 1, i * 2) * t.nx + Math.min(t.nx - 1, n * 2)] & 8
            ? 1
            : 0,
        t.x0,
        t.z0,
        t.step * 2,
        2.5,
      ).path,
    };
  })),
    (o.fineAll = null));
}
function mot(o) {
  let t = o.D.bld,
    e = t.styles.indexOf("pier");
  ((o.bbb = new Float32Array(t.n * 4)),
    (o.BB = new Map()),
    (o.pier = new Uint8Array(t.n)));
  for (let s = 0; s < t.n; s++) {
    let n = 1e9,
      i = 1e9,
      a = -1e9,
      r = -1e9;
    for (let l = t.rStart[t.bRing[s]]; l < t.rStart[t.bRing[s] + 1]; l++) {
      let c = t.pts[l * 2],
        h = t.pts[l * 2 + 1];
      (c < n && (n = c), c > a && (a = c), h < i && (i = h), h > r && (r = h));
    }
    ((o.bbb[s * 4] = n),
      (o.bbb[s * 4 + 1] = i),
      (o.bbb[s * 4 + 2] = a),
      (o.bbb[s * 4 + 3] = r),
      (o.pier[s] = t.bB[s * 5] === e ? 1 : 0),
      TN(o.BB, (n + a) / 2, (i + r) / 2, (n + a) / 2, (i + r) / 2, s));
  }
  ((o.bSeen = new Uint32Array(t.n)), (o.bPad = 160));
}
function Akt(o) {
  let t = performance.now(),
    e = o.D;
  o.farLand = (e.far || []).map((r) => {
    let l = r.meta;
    return RN(
      l.nx,
      l.nz,
      (c, h) => (r.h[h * l.nx + c] * l.hScale > 0.4 ? 1 : 0),
      l.x0,
      l.z0,
      l.cell,
      6,
    ).path;
  });
  let s = { x: [], z: [], tx: [], tz: [], half: [], name: [], rank: [], w: [] },
    n = (r, l, c, h) => {
      let f = o.nameId.get(r);
      f === void 0 &&
        ((f = o.names.length), o.names.push(r), o.nameId.set(r, f));
      let u = MN(c, 10);
      for (let d = 2; d < u.n - 2; d += 4) {
        let p = u.tx[d],
          m = u.tz[d],
          g = d,
          b = d;
        for (
          ;
          g > 0 && d - g < 40 && u.tx[g - 1] * p + u.tz[g - 1] * m > 0.985;
        )
          g--;
        for (
          ;
          b < u.n - 1 &&
          b - d < 40 &&
          u.tx[b + 1] * p + u.tz[b + 1] * m > 0.985;
        )
          b++;
        let v = Math.min(d - g, b - d) * 10;
        v < 20 ||
          (s.x.push(u.x[d]),
          s.z.push(u.z[d]),
          s.tx.push(p),
          s.tz.push(m),
          s.half.push(v),
          s.name.push(f),
          s.rank.push(l),
          s.w.push(h));
      }
    },
    i = (r) => o.rank[r.id];
  for (let r of hot(
    e,
    (l) =>
      l.name && i(l) <= 6 && l.cls !== "busway" && !/^Route \d/.test(l.name)
        ? l.name
        : "",
    i,
  )) {
    let l = r.edges.reduce((c, h) => c + o.hw[h.id], 0) / r.edges.length;
    n(xkt(r.key), r.rank, r.pts, l);
  }
  for (let r of Mkt) n(r.name, 0.5, [r.B.at(r.s0), r.B.at(r.s1)], r.B.hw);
  let a = s.x.length;
  ((o.A = {
    n: a,
    x: Float32Array.from(s.x),
    z: Float32Array.from(s.z),
    tx: Float32Array.from(s.tx),
    tz: Float32Array.from(s.tz),
    half: Float32Array.from(s.half),
    name: Int32Array.from(s.name),
    rank: Float32Array.from(s.rank),
    w: Float32Array.from(s.w),
  }),
    (o.AB = new Map()));
  for (let r = 0; r < a; r++)
    TN(o.AB, o.A.x[r], o.A.z[r], o.A.x[r], o.A.z[r], r);
  ((o.aSeen = new Uint32Array(a)),
    (o.nameCol = o.names.map((r) =>
      r === "Golden Gate Bridge" ? "#ffc0a6" : null,
    )),
    (o.shields = []));
  for (let r of hot(
    e,
    (l) => (i(l) <= 1 && lot[l.name] ? lot[l.name] : ""),
    i,
  )) {
    let l = MN(r.pts, 20);
    if (!(l.n < 8))
      for (let c = 6; c < l.n - 3; c += 16)
        o.shields.push({ id: r.key, p: [l.x[c], l.z[c]] });
  }
  for (let r of o.beyond || _N) {
    let l = MN(r.pts, 20);
    for (let c = 12; c < l.n; c += 40)
      o.shields.push({ id: r.id, p: [l.x[c], l.z[c]] });
  }
  o.msLabels = performance.now() - t;
}
function got(o, t) {
  if (!t) return;
  let e = o.green ? o.green.slice() : [],
    s = _a(t);
  for (let n = 0; n + 1 < s.gPoly.length; n++) {
    let i = new Path2D(),
      a = 1e9,
      r = 1e9,
      l = -1e9,
      c = -1e9;
    for (let d = s.gPoly[n]; d < s.gPoly[n + 1]; d++) {
      for (let p = s.gRing[d]; p < s.gRing[d + 1]; p++) {
        let m = s.gPts[p * 2],
          g = s.gPts[p * 2 + 1];
        (p === s.gRing[d] ? i.moveTo(m, g) : i.lineTo(m, g),
          (a = Math.min(a, m)),
          (l = Math.max(l, m)),
          (r = Math.min(r, g)),
          (c = Math.max(c, g)));
      }
      i.closePath();
    }
    let h = s.gC[n],
      f = h & 15,
      u = !!(h & 16);
    e.push({
      path: i,
      bb: [a, r, l, c],
      col:
        f === 4
          ? Es.lagoon
          : f === 3
            ? Es.sand
            : f === 2
              ? Es.wood
              : u
                ? Es.park
                : Es.lawn,
      o: f === 4 ? 4 : f === 3 ? 3 : f === 2 ? 2 : u ? 0 : 1,
    });
  }
  (e.sort((n, i) => n.o - i.o), (o.green = e));
}
async function Pkt(o, t = "assets/real/") {
  let [e, s] = await Promise.all([
    bo(t + "green.bin").catch(() => null),
    bo(t + "rails.bin").catch(() => null),
  ]);
  if ((got(o, e), s)) {
    let n = _a(s);
    o.rails = [];
    for (let i = 0; i + 1 < n.rStart.length; i++) {
      let a = n.rPts.subarray(n.rStart[i] * 2, n.rStart[i + 1] * 2),
        r = 1e9,
        l = 1e9,
        c = -1e9,
        h = -1e9;
      for (let f = 0; f < a.length; f += 2)
        ((r = Math.min(r, a[f])),
          (c = Math.max(c, a[f])),
          (l = Math.min(l, a[f + 1])),
          (h = Math.max(h, a[f + 1])));
      o.rails.push({ t: n.rT[i], pts: a, bb: [r, l, c, h] });
    }
  }
}
var y9 = 1;
var F4 = 600;
