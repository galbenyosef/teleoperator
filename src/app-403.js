// app 403 — math
// Lines 196174-196438 of readable/app.pretty.js (statement-aligned).
function* HMt(i, t, e, s) {
  let [n, o, a, r] = s,
    l = (m) => m / e,
    c = (m) => m[0] < a && m[2] > n && m[1] < r && m[3] > o,
    h = t.fine,
    f = h[2] - h[0],
    u = h[3] - h[1];
  ((i.lineJoin = "round"),
    (i.lineCap = "round"),
    (i.fillStyle = zs.water),
    i.fillRect(n, o, a - n, r - o));
  let d = (t.regions || []).map((m) => m.fine),
    p = (m) => n >= m[0] && a <= m[2] && o >= m[1] && r <= m[3];
  if (!p(h) && !d.some(p)) {
    (i.save(),
      i.beginPath(),
      i.rect(n - 10, o - 10, a - n + 20, r - o + 20),
      i.rect(h[0], h[1], f, u));
    for (let m of d) i.rect(m[0], m[1], m[2] - m[0], m[3] - m[1]);
    (i.clip("evenodd"),
      (i.fillStyle = zs.land),
      (i.strokeStyle = zs.shore),
      (i.lineWidth = l(1.2)));
    for (let m of t.outside) (i.fill(m), i.stroke(m));
    for (let m of t.farLand || []) (i.fill(m, "evenodd"), i.stroke(m));
    i.fillStyle = zs.wood;
    for (let m of t.outsideGreen) i.fill(m);
    i.restore();
  }
  for (let m of t.regions || []) {
    let g = m.fine;
    c(g) &&
      (i.save(),
      i.beginPath(),
      i.rect(g[0], g[1], g[2] - g[0], g[3] - g[1]),
      i.clip(),
      (i.fillStyle = zs.land),
      i.fillRect(g[0], g[1], g[2] - g[0], g[3] - g[1]),
      (i.fillStyle = zs.water),
      i.fill(m.sea, "evenodd"),
      (i.strokeStyle = zs.shore),
      (i.lineWidth = l(e > 1 ? 1.5 : 1.2)),
      i.stroke(m.sea),
      i.restore());
  }
  if (
    (c(h) &&
      (i.save(),
      i.beginPath(),
      i.rect(h[0], h[1], f, u),
      i.clip(),
      (i.fillStyle = zs.land),
      i.fillRect(
        Math.max(n, h[0]),
        Math.max(o, h[1]),
        Math.min(a, h[2]) - Math.max(n, h[0]),
        Math.min(r, h[3]) - Math.max(o, h[1]),
      ),
      (i.fillStyle = zs.water),
      i.fill(t.sea, "evenodd"),
      (i.strokeStyle = zs.shore),
      (i.lineWidth = l(e > 1 ? 1.5 : 1.2)),
      i.stroke(t.sea),
      i.restore()),
    yield,
    t.green)
  ) {
    let m = 0;
    for (let g of t.green)
      c(g.bb) &&
        (g.bb[2] - g.bb[0]) * e > 0.8 &&
        ((i.fillStyle = g.col),
        i.fill(g.path, "evenodd"),
        ++m % 200 === 0 && (yield));
  }
  yield;
  {
    let m = t.D.bld,
      g = ZE(
        t.BB,
        n - t.bPad,
        o - t.bPad,
        a + t.bPad,
        r + t.bPad,
        [],
        ++QE,
        t.bSeen,
      ),
      b = (y) =>
        g.filter((M) => {
          if (t.pier[M] !== y) return !1;
          let S = t.bbb;
          return !(
            S[M * 4] > a ||
            S[M * 4 + 2] < n ||
            S[M * 4 + 1] > r ||
            S[M * 4 + 3] < o
          );
        }),
      x = (y, M, S) => {
        i.beginPath();
        for (let w = M; w < S; w++) {
          let z = y[w];
          for (let _ = m.bRing[z]; _ < m.bRing[z + 1]; _++) {
            let R = m.rStart[_],
              T = m.rStart[_ + 1];
            i.moveTo(m.pts[R * 2], m.pts[R * 2 + 1]);
            for (let E = R + 1; E < T; E++)
              i.lineTo(m.pts[E * 2], m.pts[E * 2 + 1]);
            i.closePath();
          }
        }
      },
      v = b(1);
    for (let y = 0; y < v.length; y += PM)
      (x(v, y, Math.min(v.length, y + PM)),
        (i.fillStyle = zs.pier),
        i.fill(),
        e > 0.6 &&
          ((i.strokeStyle = zs.bldEdge), (i.lineWidth = l(0.8)), i.stroke()),
        yield);
    if (e >= 0.4) {
      let y = b(0),
        M = TMt(zs.land, zs.bld, hh((e - 0.4) / 0.4, 0.35, 1));
      for (let S = 0; S < y.length; S += PM)
        (x(y, S, Math.min(y.length, S + PM)),
          (i.fillStyle = M),
          i.fill(),
          e >= 1.5 &&
            ((i.strokeStyle = zs.bldEdge), (i.lineWidth = l(0.8)), i.stroke()),
          yield);
    }
  }
  {
    let m =
        a - n > 3e3
          ? t.D.edges.map((M) => M.id)
          : ZE(t.EB, n - 40, o - 40, a + 40, r + 40, [], ++QE, t.eSeen),
      g = [],
      b = e < 0.3 ? hh((e - 0.06) / 0.24, 0, 1) : 1;
    for (let M of m) {
      let S = t.D.edges[M],
        w = t.rank[M],
        z = t.bb.subarray(M * 4, M * 4 + 4);
      if (
        z[0] > a + 30 ||
        z[2] < n - 30 ||
        z[1] > r + 30 ||
        z[3] < o - 30 ||
        (w === 7 && e < 0.5) ||
        (w === 6 && e < 0.3) ||
        (w === 5 && b <= 0)
      )
        continue;
      let _ = Math.max(
        t.hw[M] * 2 * e,
        RM[w] * (w >= 5 ? Math.max(0.5, b) : 1),
      );
      g.push([S.sunk ? 0 : S.elev ? 2 : 1, w, Math.round(_ * 4) / 4, S]);
    }
    g.sort((M, S) => M[0] - S[0] || S[1] - M[1] || M[2] - S[2]);
    function* x(M, S, w, z) {
      let _ = M;
      for (; _ < S;) {
        let R = _;
        for (
          i.beginPath();
          R < S && g[R][2] === g[_][2] && (i.globalAlpha < 1 || R - _ < PM);
        ) {
          let E = g[R][3],
            A = E.P;
          i.moveTo(A[0], A[1]);
          for (let C = 1; C < E.n; C++) i.lineTo(A[C * 3], A[C * 3 + 1]);
          R++;
        }
        ((i.strokeStyle = typeof w == "function" ? w(g[_]) : w),
          (i.lineWidth = l(g[_][2] + z)),
          i.stroke(),
          (_ = R));
        let T = i.globalAlpha;
        (yield, (i.globalAlpha = T));
      }
    }
    let v = (M) => zs.road[M[1]],
      y = 0;
    for (let M of [0, 1, 2]) {
      let S = y;
      for (; y < g.length && g[y][0] === M;) y++;
      if (S === y) continue;
      ((i.globalAlpha = M === 0 ? 0.55 : 1),
        M === 2 && (yield* x(S, y, zs.elevCase, Math.max(2, 1.5 * e))));
      let w = S;
      for (; w < y && g[w][1] >= 2;) w++;
      if (M === 1 && b < 1) {
        let z = S;
        for (; z < w && g[z][1] >= 5;) z++;
        ((i.globalAlpha = 0.35 + 0.65 * b),
          yield* x(S, z, v, 0),
          (i.globalAlpha = 1),
          yield* x(z, w, v, 0));
      } else yield* x(S, w, v, 0);
      (w < y &&
        (yield* x(w, y, zs.hwyCase, Math.max(1.6, 2.4 * e)),
        yield* x(w, y, v, 0)),
        (i.globalAlpha = 1));
    }
  }
  if ((yield, t.rails && e >= 0.3))
    for (let m of [3, 2, 1]) {
      if (m !== 1 && e < 0.6) continue;
      i.beginPath();
      let g = !1;
      for (let b of t.rails) {
        if (b.t !== m || !c(b.bb)) continue;
        let x = b.pts;
        i.moveTo(x[0], x[1]);
        for (let v = 2; v < x.length; v += 2) i.lineTo(x[v], x[v + 1]);
        g = !0;
      }
      g &&
        ((i.strokeStyle = m === 1 ? zs.cable : zs.tram),
        (i.lineWidth = l(m === 1 ? (e > 1.5 ? 2 : 1.4) : 1)),
        i.setLineDash(m === 1 ? [l(5), l(3.5)] : []),
        (i.lineCap = "butt"),
        i.stroke(),
        i.setLineDash([]),
        (i.lineCap = "round"));
    }
  for (let m of t.beyond || _N)
    (i.beginPath(),
      m.pts.forEach(([g, b], x) => (x ? i.lineTo(g, b) : i.moveTo(g, b))),
      (i.strokeStyle = zs.hwyCase),
      (i.lineWidth = Math.max(l(RM[0] + 1.6), 26)),
      i.stroke(),
      (i.strokeStyle = zs.road[0]),
      (i.lineWidth = Math.max(l(RM[0]), 22)),
      i.stroke());
  for (let m of [o2, a2]) {
    let g = m.at(m.s0),
      b = m.at(m.s1),
      x = m === o2;
    ((i.lineCap = "butt"),
      i.beginPath(),
      i.moveTo(g[0], g[1]),
      i.lineTo(b[0], b[1]),
      (i.strokeStyle = x ? zs.ggCase : zs.hwyCase),
      (i.lineWidth = Math.max(l(RM[0] + 2.6), m.hw * 2 + 6)),
      i.stroke(),
      (i.strokeStyle = x ? zs.gg : zs.road[0]),
      (i.lineWidth = Math.max(l(RM[0] + 0.6), m.hw * 2)),
      i.stroke());
    for (let v of m.towers) {
      let y = m.at(v),
        M = [-m.u[1], m.u[0]],
        S = Math.max(l(4.5), m.hw + 7);
      (i.beginPath(),
        i.moveTo(y[0] - M[0] * S, y[1] - M[1] * S),
        i.lineTo(y[0] + M[0] * S, y[1] + M[1] * S),
        (i.strokeStyle = x ? "#ff8a5a" : zs.tower),
        (i.lineWidth = Math.max(l(2.2), 9)),
        i.stroke());
    }
    i.lineCap = "round";
  }
}
