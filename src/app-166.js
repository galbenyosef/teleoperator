// app 166 — math
// Lines 100209-100660 of readable/app.pretty.js (statement-aligned).
function lz(o, t, e, s, n = null, i = "all") {
  if (!rz(t, e)) return;
  let a = i === "under" ? null : s,
    r = i === "top" ? null : s,
    l = t.legs.filter(([g]) => !g.inner && g.L > 0.5),
    c = null;
  for (let [g] of l)
    g.elev && (!c || g.W[0] + g.W[g.n - 1] > c.W[0] + c.W[c.n - 1]) && (c = g);
  if (!c) return;
  let h = UC(c),
    f = {},
    u = e?.terrainAt && n?.bld ? Vm(n) : null,
    d = (g, b) => {
      if (!u) return !1;
      let v = Math.round((g - u.x0) / u.cell),
        x = Math.round((b - u.z0) / u.cell);
      return (
        v >= 0 &&
        x >= 0 &&
        v < u.w &&
        x < u.h &&
        u.H[x * u.w + v] > e.terrainAt(g, b) + 2.5
      );
    },
    p = l.map(([g, b]) => {
      let v = b === "a" ? g.s0 : g.s1;
      return (
        Ot(g, v, f),
        {
          E: g,
          end: b,
          x: f.x,
          z: f.z,
          y: f.y,
          dx: f.dx * (b === "a" ? -1 : 1),
          dz: f.dz * (b === "a" ? -1 : 1),
          nx: f.nx,
          nz: f.nz,
          w: f.w,
        }
      );
    }),
    m = (g, b) => {
      for (let v of p) {
        let x = g - v.x,
          y = b - v.z;
        if (
          Math.abs(x * v.dx + y * v.dz) < 0.3 &&
          Math.abs(x * v.nx + y * v.nz) < v.w + 0.45
        )
          return v;
      }
      return null;
    };
  for (let g of t.polys) {
    let b = g.map((H) => H.pts),
      v = [];
    for (let H of g) for (let N = 0; N < H.y.length; N++) v.push(H.y[N]);
    let x = dc(b),
      y = x.flat,
      M =
        t.tri && t.polys.length === 1
          ? t.tri
          : { tris: x.tris, flat: y, ys: v },
      S = M.tris,
      w = (H, N, D) => Math.min(Cw(c, 3.5), iz(e, H, N, D, t)),
      _ = y.length / 2,
      z = new Float64Array(_);
    for (let H = 0; H < _; H++) z[H] = w(y[H * 2], y[H * 2 + 1], v[H]);
    let A = (H, N, D, U, G, W, V, $) => {
      if (!e?.probe) return !1;
      for (let J of [0.15, 0.5, 0.85]) {
        let X = H + (D - H) * J + V * 0.7,
          tt = N + (U - N) * J + $ * 0.7,
          Z = G + (W - G) * J;
        for (let q of e.probe(X, tt).all)
          if (q.J !== t && Math.abs(q.y - Z) < 0.45) return !0;
      }
      return !1;
    };
    if (t.hull && t.tri && t.polys.length === 1)
      h2t(o, t, g[0], M, c, p, m, A, a, e);
    else {
      if (o) {
        let N = M.flat,
          D = M.ys,
          U = (G) => [
            N[G * 2],
            D[G] - w(N[G * 2], N[G * 2 + 1], D[G]),
            N[G * 2 + 1],
          ];
        for (let [G, W, V] of S) sz(o, U(G), U(W), U(V), Pl, -1);
      }
      let H = 0;
      for (let N of g) {
        let D = N.y.length;
        for (let U = 0; U < D; U++) {
          let G = (U + 1) % D,
            W = H + U,
            V = H + G,
            $ = y[W * 2],
            J = y[W * 2 + 1],
            X = y[V * 2],
            tt = y[V * 2 + 1],
            Z = v[W],
            q = v[V],
            j = X - $,
            K = tt - J,
            nt = Math.hypot(j, K);
          if (nt < 0.05) continue;
          let Q = K / nt,
            et = -j / nt,
            st = ($ + X) / 2,
            ot = (J + tt) / 2;
          cx(g, st + Q * 0.15, ot + et * 0.15) && ((Q = -Q), (et = -et));
          let rt = m($, J),
            lt = m(X, tt),
            ht = rt && rt === lt ? rt : null,
            pt = z[W],
            ut = z[V];
          if (ht) {
            o &&
              ht.E.elev &&
              na(
                o,
                [$, Z - 0.3, J],
                [X, q - 0.3, tt],
                [X, q - ut, tt],
                [$, Z - pt, J],
                [0, 0],
                [nt, 0],
                [nt, ut],
                [0, pt],
                bx,
                [Q, 0, et],
              );
            continue;
          }
          let it = !1;
          if (e?.probe)
            for (let vt of [0.15, 0.5, 0.85]) {
              let At = $ + j * vt + Q * 0.7,
                Ut = J + K * vt + et * 0.7,
                Gt = Z + (q - Z) * vt;
              for (let Pt of e.probe(At, Ut).all)
                if (Pt.J !== t && Math.abs(Pt.y - Gt) < 0.7) {
                  it = !0;
                  break;
                }
              if (it) break;
            }
          if (it) {
            o &&
              na(
                o,
                [$, Z - 0.3, J],
                [X, q - 0.3, tt],
                [X, q - ut, tt],
                [$, Z - pt, J],
                [0, 0],
                [nt, 0],
                [nt, ut],
                [0, pt],
                xx,
                [Q, 0, et],
              );
            continue;
          }
          let at = Q * 0.4,
            yt = et * 0.4;
          (o &&
            (na(
              o,
              [X, q, tt],
              [$, Z, J],
              [$, Z + 0.85, J],
              [X, q + 0.85, tt],
              [0, 0],
              [nt, 0],
              [nt, 0.85],
              [0, 0.85],
              Ar,
              [-Q, 0, -et],
            ),
            vx(
              o,
              [$, Z + 0.85, J],
              [X, q + 0.85, tt],
              [X + at, q + 0.85, tt + yt],
              [$ + at, Z + 0.85, J + yt],
              Ar,
              !0,
            ),
            na(
              o,
              [$ + at, Z - pt, J + yt],
              [X + at, q - ut, tt + yt],
              [X + at, q + 0.85, tt + yt],
              [$ + at, Z + 0.85, J + yt],
              [0, Z - pt],
              [nt, q - ut],
              [nt, q + 0.85],
              [0, Z + 0.85],
              xx,
              [Q, 0, et],
            ),
            na(
              o,
              [$, Z - pt, J],
              [X, q - ut, tt],
              [X + at, q - ut, tt + yt],
              [$ + at, Z - pt, J + yt],
              [0, 0],
              [nt, 0],
              [nt, 0.4],
              [0, 0.4],
              Pl,
              [0, -1, 0],
            )),
            a &&
              nt > 0.2 &&
              a.push({
                t: "obb",
                x: st + Q * 0.2,
                z: ot + et * 0.2,
                hx: 0.25,
                hz: nt / 2 + 0.05,
                c: K / nt,
                s: j / nt,
                y0: Math.min(Z, q) - 0.5,
                y1: Math.max(Z, q) + 1.2,
                rail: !0,
              }));
        }
        H += D;
      }
    }
    if (!e?.terrainAt) continue;
    let T = p.find((H) => H.E === c),
      E = T.dx,
      R = T.dz,
      P = -R,
      C = E,
      I = 1e9,
      L = -1e9;
    for (let H = 0; H < _; H++) {
      let N = (y[H * 2] - t.x) * E + (y[H * 2 + 1] - t.z) * R;
      ((I = Math.min(I, N)), (L = Math.max(L, N)));
    }
    let F = 26,
      O = Math.max(1, Math.round((L - I) / F)),
      B = (H, N) => {
        let D = LC(S, M.flat, M.ys, H, N);
        return D === null
          ? null
          : D -
              (t.hull && t._dP
                ? t._dP
                : Math.min(Cw(c, 3.5), iz(e, H, N, D, t)));
      };
    for (let H = 0; H < O; H++)
      for (let N of [0, 4, -4, 8, -8]) {
        let D = I + ((L - I) * (H + 0.5)) / O + N,
          U = t.x + E * D,
          G = t.z + R * D;
        if (p.some((ot) => Math.hypot(U - ot.x, G - ot.z) < 5)) continue;
        let W = null,
          V = null;
        for (let ot = -60; ot <= 60; ot += 0.5)
          cx(g, U + P * ot, G + C * ot) && (W === null && (W = ot), (V = ot));
        if (W === null || V - W < 2) continue;
        let $ = V - W,
          J = $ < 7 ? 1 : $ < 17 ? 2 : Math.ceil($ / 8.5),
          X = Math.max(h.hu, h.hv) * (J === 1 ? 1.1 : 1),
          tt = t.hull ? Mf + X : X + 0.5,
          Z = (ot, rt, lt, ht) => {
            for (let pt = 0; pt <= 8; pt++) {
              let ut = (pt * Math.PI) / 4,
                it = pt === 8 ? 0 : X + 0.6;
              for (let at of e.probe(
                ot + Math.cos(ut) * it,
                rt + Math.sin(ut) * it,
              ).all)
                if (at.J !== t && at.y > lt - 1.5 && at.y < ht - 0.3) return !1;
            }
            return !d(ot, rt);
          },
          q = null,
          j = null;
        {
          let ot = [],
            rt = !0;
          for (let lt = 0; lt < J && rt; lt++) {
            let ht = J === 1 ? 0.5 : lt / (J - 1),
              pt = Math.min(W + tt, (W + V) / 2),
              ut = Math.max(V - tt, (W + V) / 2),
              it = pt + (ut - pt) * ht,
              at = U + P * it,
              yt = G + C * it,
              vt = B(at, yt),
              At = e.terrainAt(at, yt);
            if (vt === null || vt - At < 3 || !Z(at, yt, At, vt)) {
              rt = !1;
              break;
            }
            ot.push([at, yt, vt, At, it]);
          }
          rt && ((q = ot), (j = [W + 0.5, V - 0.5]));
        }
        if (!q) {
          let ot = B(U + (P * (W + V)) / 2, G + (C * (W + V)) / 2);
          if (ot === null) continue;
          let rt = (pt) => {
              for (let ut = X + 0.5; ut <= 20; ut += 0.75) {
                let it = pt < 0 ? W - ut : V + ut,
                  at = U + P * it,
                  yt = G + C * it,
                  vt = e.terrainAt(at, yt);
                if (!(ot - h.cap - vt < 3) && Z(at, yt, vt, ot)) return it;
              }
              return null;
            },
            lt = rt(-1),
            ht = rt(1);
          if (lt === null && ht === null) continue;
          if (lt === null) {
            if (ht - V > 10) continue;
            lt = W + tt;
          } else if (ht === null) {
            if (W - lt > 10) continue;
            ht = V - tt;
          }
          q = [];
          for (let pt of [lt, ht]) {
            if (pt > W + tt - 0.01 && pt < V - tt + 0.01) continue;
            let ut = U + P * pt,
              it = G + C * pt;
            q.push([ut, it, ot, e.terrainAt(ut, it), pt]);
          }
          j = [lt - X - 0.3, ht + X + 0.3];
        }
        let K = Math.min(...q.map((ot) => ot[2])),
          nt = q.some((ot) => ot[4] < W || ot[4] > V),
          Q = q.length > 1 || nt,
          et = null;
        if (Q) {
          for (let ot of nt ? [h.cap, 0.35] : [h.cap]) {
            et = K - ot;
            let rt = !0;
            for (let lt = 0; lt <= 12 && rt; lt++) {
              let ht = j[0] + ((j[1] - j[0]) * lt) / 12,
                pt = U + P * ht,
                ut = G + C * ht;
              for (let it of e.probe(pt, ut).all)
                if (
                  it.J !== t &&
                  it.y < et + 0.2 &&
                  it.y > et - (ot > 1 ? 4.4 : 3.5)
                ) {
                  rt = !1;
                  break;
                }
            }
            if (rt) break;
            et = null;
          }
          if (et === null) {
            if (nt) continue;
            Q = !1;
          }
        }
        if (o) {
          if (Q) {
            let ot = (j[0] + j[1]) / 2,
              rt = (j[1] - j[0]) / 2;
            FC(
              o,
              U + P * ot,
              G + C * ot,
              E,
              R,
              h.hu + 0.25,
              rt,
              et,
              K + 0.05,
              h.col,
            );
          }
          for (let [ot, rt, lt, ht] of q) {
            let pt = Q ? et : lt,
              ut = q.length === 1 && !Q ? 1.1 : 1,
              it = ht - 0.5;
            (h.band &&
              pt - it > 5 &&
              (dx(
                o,
                ot,
                rt,
                E,
                R,
                h.hu * ut,
                h.hv * ut,
                h.ch * ut,
                it,
                ht + 2.9,
                h.band,
                0,
              ),
              (it = ht + 2.9)),
              dx(
                o,
                ot,
                rt,
                E,
                R,
                h.hu * ut,
                h.hv * ut,
                h.ch * ut,
                it,
                pt + 0.05,
                h.col,
                it - ht + 0.5,
              ));
          }
        }
        let st = [
          U + P * j[0],
          G + C * j[0],
          U + P * j[1],
          G + C * j[1],
          Q ? et : K,
        ];
        if (r)
          for (let [ot, rt, lt, ht] of q)
            r.push({
              t: "obb",
              x: ot,
              z: rt,
              hx: h.hv * 1.1 + 0.05,
              hz: h.hu * 1.1 + 0.05,
              c: R,
              s: E,
              y0: ht - 1,
              y1: Q ? et : lt,
              pier: !0,
              sup: st,
              src: -1 - t.id,
            });
        break;
      }
  }
}
