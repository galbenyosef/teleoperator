// app 420 — math
// Lines 204060-204324 of readable/app.pretty.js (statement-aligned).
function* Ckt(o, t, e, s) {
  let [n, i, a, r] = s,
    l = (m) => m / e,
    c = (m) => m[0] < a && m[2] > n && m[1] < r && m[3] > i,
    h = t.fine,
    f = h[2] - h[0],
    u = h[3] - h[1];
  ((o.lineJoin = "round"),
    (o.lineCap = "round"),
    (o.fillStyle = Es.water),
    o.fillRect(n, i, a - n, r - i));
  let d = (t.regions || []).map((m) => m.fine),
    p = (m) => n >= m[0] && a <= m[2] && i >= m[1] && r <= m[3];
  if (!p(h) && !d.some(p)) {
    (o.save(),
      o.beginPath(),
      o.rect(n - 10, i - 10, a - n + 20, r - i + 20),
      o.rect(h[0], h[1], f, u));
    for (let m of d) o.rect(m[0], m[1], m[2] - m[0], m[3] - m[1]);
    (o.clip("evenodd"),
      (o.fillStyle = Es.land),
      (o.strokeStyle = Es.shore),
      (o.lineWidth = l(1.2)));
    for (let m of t.outside) (o.fill(m), o.stroke(m));
    for (let m of t.farLand || []) (o.fill(m, "evenodd"), o.stroke(m));
    o.fillStyle = Es.wood;
    for (let m of t.outsideGreen) o.fill(m);
    o.restore();
  }
  for (let m of t.regions || []) {
    let g = m.fine;
    c(g) &&
      (o.save(),
      o.beginPath(),
      o.rect(g[0], g[1], g[2] - g[0], g[3] - g[1]),
      o.clip(),
      (o.fillStyle = Es.land),
      o.fillRect(g[0], g[1], g[2] - g[0], g[3] - g[1]),
      (o.fillStyle = Es.water),
      o.fill(m.sea, "evenodd"),
      (o.strokeStyle = Es.shore),
      (o.lineWidth = l(e > 1 ? 1.5 : 1.2)),
      o.stroke(m.sea),
      o.restore());
  }
  if (
    (c(h) &&
      (o.save(),
      o.beginPath(),
      o.rect(h[0], h[1], f, u),
      o.clip(),
      (o.fillStyle = Es.land),
      o.fillRect(
        Math.max(n, h[0]),
        Math.max(i, h[1]),
        Math.min(a, h[2]) - Math.max(n, h[0]),
        Math.min(r, h[3]) - Math.max(i, h[1]),
      ),
      (o.fillStyle = Es.water),
      o.fill(t.sea, "evenodd"),
      (o.strokeStyle = Es.shore),
      (o.lineWidth = l(e > 1 ? 1.5 : 1.2)),
      o.stroke(t.sea),
      o.restore()),
    yield,
    t.green)
  ) {
    let m = 0;
    for (let g of t.green)
      c(g.bb) &&
        (g.bb[2] - g.bb[0]) * e > 0.8 &&
        ((o.fillStyle = g.col),
        o.fill(g.path, "evenodd"),
        ++m % 200 === 0 && (yield));
  }
  yield;
  {
    let m = t.D.bld,
      g = v9(
        t.BB,
        n - t.bPad,
        i - t.bPad,
        a + t.bPad,
        r + t.bPad,
        [],
        ++y9,
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
            S[M * 4 + 3] < i
          );
        }),
      v = (y, M, S) => {
        o.beginPath();
        for (let w = M; w < S; w++) {
          let _ = y[w];
          for (let z = m.bRing[_]; z < m.bRing[_ + 1]; z++) {
            let A = m.rStart[z],
              T = m.rStart[z + 1];
            o.moveTo(m.pts[A * 2], m.pts[A * 2 + 1]);
            for (let E = A + 1; E < T; E++)
              o.lineTo(m.pts[E * 2], m.pts[E * 2 + 1]);
            o.closePath();
          }
        }
      },
      x = b(1);
    for (let y = 0; y < x.length; y += F4)
      (v(x, y, Math.min(x.length, y + F4)),
        (o.fillStyle = Es.pier),
        o.fill(),
        e > 0.6 &&
          ((o.strokeStyle = Es.bldEdge), (o.lineWidth = l(0.8)), o.stroke()),
        yield);
    if (e >= 0.4) {
      let y = b(0),
        M = vkt(Es.land, Es.bld, Hh((e - 0.4) / 0.4, 0.35, 1));
      for (let S = 0; S < y.length; S += F4)
        (v(y, S, Math.min(y.length, S + F4)),
          (o.fillStyle = M),
          o.fill(),
          e >= 1.5 &&
            ((o.strokeStyle = Es.bldEdge), (o.lineWidth = l(0.8)), o.stroke()),
          yield);
    }
  }
  {
    let m =
        a - n > 3e3
          ? t.D.edges.map((M) => M.id)
          : v9(t.EB, n - 40, i - 40, a + 40, r + 40, [], ++y9, t.eSeen),
      g = [],
      b = e < 0.3 ? Hh((e - 0.06) / 0.24, 0, 1) : 1;
    for (let M of m) {
      let S = t.D.edges[M],
        w = t.rank[M],
        _ = t.bb.subarray(M * 4, M * 4 + 4);
      if (
        _[0] > a + 30 ||
        _[2] < n - 30 ||
        _[1] > r + 30 ||
        _[3] < i - 30 ||
        (w === 7 && e < 0.5) ||
        (w === 6 && e < 0.3) ||
        (w === 5 && b <= 0)
      )
        continue;
      let z = Math.max(
        t.hw[M] * 2 * e,
        I4[w] * (w >= 5 ? Math.max(0.5, b) : 1),
      );
      g.push([S.sunk ? 0 : S.elev ? 2 : 1, w, Math.round(z * 4) / 4, S]);
    }
    g.sort((M, S) => M[0] - S[0] || S[1] - M[1] || M[2] - S[2]);
    function* v(M, S, w, _) {
      let z = M;
      for (; z < S;) {
        let A = z;
        for (
          o.beginPath();
          A < S && g[A][2] === g[z][2] && (o.globalAlpha < 1 || A - z < F4);
        ) {
          let E = g[A][3],
            R = E.P;
          o.moveTo(R[0], R[1]);
          for (let P = 1; P < E.n; P++) o.lineTo(R[P * 3], R[P * 3 + 1]);
          A++;
        }
        ((o.strokeStyle = typeof w == "function" ? w(g[z]) : w),
          (o.lineWidth = l(g[z][2] + _)),
          o.stroke(),
          (z = A));
        let T = o.globalAlpha;
        (yield, (o.globalAlpha = T));
      }
    }
    let x = (M) => Es.road[M[1]],
      y = 0;
    for (let M of [0, 1, 2]) {
      let S = y;
      for (; y < g.length && g[y][0] === M;) y++;
      if (S === y) continue;
      ((o.globalAlpha = M === 0 ? 0.55 : 1),
        M === 2 && (yield* v(S, y, Es.elevCase, Math.max(2, 1.5 * e))));
      let w = S;
      for (; w < y && g[w][1] >= 2;) w++;
      if (M === 1 && b < 1) {
        let _ = S;
        for (; _ < w && g[_][1] >= 5;) _++;
        ((o.globalAlpha = 0.35 + 0.65 * b),
          yield* v(S, _, x, 0),
          (o.globalAlpha = 1),
          yield* v(_, w, x, 0));
      } else yield* v(S, w, x, 0);
      (w < y &&
        (yield* v(w, y, Es.hwyCase, Math.max(1.6, 2.4 * e)),
        yield* v(w, y, x, 0)),
        (o.globalAlpha = 1));
    }
  }
  if ((yield, t.rails && e >= 0.3))
    for (let m of [3, 2, 1]) {
      if (m !== 1 && e < 0.6) continue;
      o.beginPath();
      let g = !1;
      for (let b of t.rails) {
        if (b.t !== m || !c(b.bb)) continue;
        let v = b.pts;
        o.moveTo(v[0], v[1]);
        for (let x = 2; x < v.length; x += 2) o.lineTo(v[x], v[x + 1]);
        g = !0;
      }
      g &&
        ((o.strokeStyle = m === 1 ? Es.cable : Es.tram),
        (o.lineWidth = l(m === 1 ? (e > 1.5 ? 2 : 1.4) : 1)),
        o.setLineDash(m === 1 ? [l(5), l(3.5)] : []),
        (o.lineCap = "butt"),
        o.stroke(),
        o.setLineDash([]),
        (o.lineCap = "round"));
    }
  for (let m of t.beyond || _N)
    (o.beginPath(),
      m.pts.forEach(([g, b], v) => (v ? o.lineTo(g, b) : o.moveTo(g, b))),
      (o.strokeStyle = Es.hwyCase),
      (o.lineWidth = Math.max(l(I4[0] + 1.6), 26)),
      o.stroke(),
      (o.strokeStyle = Es.road[0]),
      (o.lineWidth = Math.max(l(I4[0]), 22)),
      o.stroke());
  for (let m of On("bridges") ? [X2, K2] : []) {
    let g = m.at(m.s0),
      b = m.at(m.s1),
      v = m === X2;
    ((o.lineCap = "butt"),
      o.beginPath(),
      o.moveTo(g[0], g[1]),
      o.lineTo(b[0], b[1]),
      (o.strokeStyle = v ? Es.ggCase : Es.hwyCase),
      (o.lineWidth = Math.max(l(I4[0] + 2.6), m.hw * 2 + 6)),
      o.stroke(),
      (o.strokeStyle = v ? Es.gg : Es.road[0]),
      (o.lineWidth = Math.max(l(I4[0] + 0.6), m.hw * 2)),
      o.stroke());
    for (let x of m.towers) {
      let y = m.at(x),
        M = [-m.u[1], m.u[0]],
        S = Math.max(l(4.5), m.hw + 7);
      (o.beginPath(),
        o.moveTo(y[0] - M[0] * S, y[1] - M[1] * S),
        o.lineTo(y[0] + M[0] * S, y[1] + M[1] * S),
        (o.strokeStyle = v ? "#ff8a5a" : Es.tower),
        (o.lineWidth = Math.max(l(2.2), 9)),
        o.stroke());
    }
    o.lineCap = "round";
  }
}
