// app 402 — push
// Lines 195981-196173 of readable/app.pretty.js (statement-aligned).
function sst(i) {
  let t = i.D.bld,
    e = t.styles.indexOf("pier");
  ((i.bbb = new Float32Array(t.n * 4)),
    (i.BB = new Map()),
    (i.pier = new Uint8Array(t.n)));
  for (let s = 0; s < t.n; s++) {
    let n = 1e9,
      o = 1e9,
      a = -1e9,
      r = -1e9;
    for (let l = t.rStart[t.bRing[s]]; l < t.rStart[t.bRing[s] + 1]; l++) {
      let c = t.pts[l * 2],
        h = t.pts[l * 2 + 1];
      (c < n && (n = c), c > a && (a = c), h < o && (o = h), h > r && (r = h));
    }
    ((i.bbb[s * 4] = n),
      (i.bbb[s * 4 + 1] = o),
      (i.bbb[s * 4 + 2] = a),
      (i.bbb[s * 4 + 3] = r),
      (i.pier[s] = t.bB[s * 5] === e ? 1 : 0),
      EN(i.BB, (n + a) / 2, (o + r) / 2, (n + a) / 2, (o + r) / 2, s));
  }
  ((i.bSeen = new Uint32Array(t.n)), (i.bPad = 160));
}
function BMt(i) {
  let t = performance.now(),
    e = i.D;
  i.farLand = (e.far || []).map((r) => {
    let l = r.meta;
    return TN(
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
      let f = i.nameId.get(r);
      f === void 0 &&
        ((f = i.names.length), i.names.push(r), i.nameId.set(r, f));
      let u = wN(c, 10);
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
        let x = Math.min(d - g, b - d) * 10;
        x < 20 ||
          (s.x.push(u.x[d]),
          s.z.push(u.z[d]),
          s.tx.push(p),
          s.tz.push(m),
          s.half.push(x),
          s.name.push(f),
          s.rank.push(l),
          s.w.push(h));
      }
    },
    o = (r) => i.rank[r.id];
  for (let r of Jet(
    e,
    (l) =>
      l.name && o(l) <= 6 && l.cls !== "busway" && !/^Route \d/.test(l.name)
        ? l.name
        : "",
    o,
  )) {
    let l = r.edges.reduce((c, h) => c + i.hw[h.id], 0) / r.edges.length;
    n(EMt(r.key), r.rank, r.pts, l);
  }
  for (let r of PMt) n(r.name, 0.5, [r.B.at(r.s0), r.B.at(r.s1)], r.B.hw);
  let a = s.x.length;
  ((i.A = {
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
    (i.AB = new Map()));
  for (let r = 0; r < a; r++)
    EN(i.AB, i.A.x[r], i.A.z[r], i.A.x[r], i.A.z[r], r);
  ((i.aSeen = new Uint32Array(a)),
    (i.nameCol = i.names.map((r) =>
      r === "Golden Gate Bridge" ? "#ffc0a6" : null,
    )),
    (i.shields = []));
  for (let r of Jet(
    e,
    (l) => (o(l) <= 1 && Ket[l.name] ? Ket[l.name] : ""),
    o,
  )) {
    let l = wN(r.pts, 20);
    if (!(l.n < 8))
      for (let c = 6; c < l.n - 3; c += 16)
        i.shields.push({ id: r.key, p: [l.x[c], l.z[c]] });
  }
  for (let r of i.beyond || _N) {
    let l = wN(r.pts, 20);
    for (let c = 12; c < l.n; c += 40)
      i.shields.push({ id: r.id, p: [l.x[c], l.z[c]] });
  }
  i.msLabels = performance.now() - t;
}
function nst(i, t) {
  if (!t) return;
  let e = i.green ? i.green.slice() : [],
    s = ga(t);
  for (let n = 0; n + 1 < s.gPoly.length; n++) {
    let o = new Path2D(),
      a = 1e9,
      r = 1e9,
      l = -1e9,
      c = -1e9;
    for (let d = s.gPoly[n]; d < s.gPoly[n + 1]; d++) {
      for (let p = s.gRing[d]; p < s.gRing[d + 1]; p++) {
        let m = s.gPts[p * 2],
          g = s.gPts[p * 2 + 1];
        (p === s.gRing[d] ? o.moveTo(m, g) : o.lineTo(m, g),
          (a = Math.min(a, m)),
          (l = Math.max(l, m)),
          (r = Math.min(r, g)),
          (c = Math.max(c, g)));
      }
      o.closePath();
    }
    let h = s.gC[n],
      f = h & 15,
      u = !!(h & 16);
    e.push({
      path: o,
      bb: [a, r, l, c],
      col:
        f === 4
          ? zs.lagoon
          : f === 3
            ? zs.sand
            : f === 2
              ? zs.wood
              : u
                ? zs.park
                : zs.lawn,
      o: f === 4 ? 4 : f === 3 ? 3 : f === 2 ? 2 : u ? 0 : 1,
    });
  }
  (e.sort((n, o) => n.o - o.o), (i.green = e));
}
async function OMt(i, t = "assets/real/") {
  let [e, s] = await Promise.all([
    io(t + "green.bin").catch(() => null),
    io(t + "rails.bin").catch(() => null),
  ]);
  if ((nst(i, e), s)) {
    let n = ga(s);
    i.rails = [];
    for (let o = 0; o + 1 < n.rStart.length; o++) {
      let a = n.rPts.subarray(n.rStart[o] * 2, n.rStart[o + 1] * 2),
        r = 1e9,
        l = 1e9,
        c = -1e9,
        h = -1e9;
      for (let f = 0; f < a.length; f += 2)
        ((r = Math.min(r, a[f])),
          (c = Math.max(c, a[f])),
          (l = Math.min(l, a[f + 1])),
          (h = Math.max(h, a[f + 1])));
      i.rails.push({ t: n.rT[o], pts: a, bb: [r, l, c, h] });
    }
  }
}
var QE = 1;
var PM = 600;
