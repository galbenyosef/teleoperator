// app 167 — math
// Lines 99973-100424 of readable/app.pretty.js (statement-aligned).
function lk(i, t, e, s, n = null, o = "all") {
  if (!rk(t, e)) return;
  let a = o === "under" ? null : s,
    r = o === "top" ? null : s,
    l = t.legs.filter(([g]) => !g.inner && g.L > 0.5),
    c = null;
  for (let [g] of l)
    g.elev && (!c || g.W[0] + g.W[g.n - 1] > c.W[0] + c.W[c.n - 1]) && (c = g);
  if (!c) return;
  let h = hP(c),
    f = {},
    u = e?.terrainAt && n?.bld ? fb(n) : null,
    d = (g, b) => {
      if (!u) return !1;
      let x = Math.round((g - u.x0) / u.cell),
        v = Math.round((b - u.z0) / u.cell);
      return (
        x >= 0 &&
        v >= 0 &&
        x < u.w &&
        v < u.h &&
        u.H[v * u.w + x] > e.terrainAt(g, b) + 2.5
      );
    },
    p = l.map(([g, b]) => {
      let x = b === "a" ? g.s0 : g.s1;
      return (
        Ot(g, x, f),
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
      for (let x of p) {
        let v = g - x.x,
          y = b - x.z;
        if (
          Math.abs(v * x.dx + y * x.dz) < 0.3 &&
          Math.abs(v * x.nx + y * x.nz) < x.w + 0.45
        )
          return x;
      }
      return null;
    };
  for (let g of t.polys) {
    let b = g.map((H) => H.pts),
      x = [];
    for (let H of g) for (let O = 0; O < H.y.length; O++) x.push(H.y[O]);
    let v = Vl(b),
      y = v.flat,
      M =
        t.tri && t.polys.length === 1
          ? t.tri
          : { tris: v.tris, flat: y, ys: x },
      S = M.tris,
      w = (H, O, D) => Math.min(Oy(c, 3.5), ik(e, H, O, D, t)),
      z = y.length / 2,
      _ = new Float64Array(z);
    for (let H = 0; H < z; H++) _[H] = w(y[H * 2], y[H * 2 + 1], x[H]);
    let R = (H, O, D, U, G, q, W, V) => {
      if (!e?.probe) return !1;
      for (let Y of [0.15, 0.5, 0.85]) {
        let $ = H + (D - H) * Y + W * 0.7,
          st = O + (U - O) * Y + V * 0.7,
          Q = G + (q - G) * Y;
        for (let j of e.probe($, st).all)
          if (j.J !== t && Math.abs(j.y - Q) < 0.45) return !0;
      }
      return !1;
    };
    if (t.hull && t.tri && t.polys.length === 1)
      Ddt(i, t, g[0], M, c, p, m, R, a, e);
    else {
      if (i) {
        let O = M.flat,
          D = M.ys,
          U = (G) => [
            O[G * 2],
            D[G] - w(O[G * 2], O[G * 2 + 1], D[G]),
            O[G * 2 + 1],
          ];
        for (let [G, q, W] of S) sk(i, U(G), U(q), U(W), cl, -1);
      }
      let H = 0;
      for (let O of g) {
        let D = O.y.length;
        for (let U = 0; U < D; U++) {
          let G = (U + 1) % D,
            q = H + U,
            W = H + G,
            V = y[q * 2],
            Y = y[q * 2 + 1],
            $ = y[W * 2],
            st = y[W * 2 + 1],
            Q = x[q],
            j = x[W],
            X = $ - V,
            K = st - Y,
            nt = Math.hypot(X, K);
          if (nt < 0.05) continue;
          let Z = K / nt,
            et = -X / nt,
            tt = (V + $) / 2,
            it = (Y + st) / 2;
          Sb(g, tt + Z * 0.15, it + et * 0.15) && ((Z = -Z), (et = -et));
          let rt = m(V, Y),
            lt = m($, st),
            ct = rt && rt === lt ? rt : null,
            dt = _[q],
            ut = _[W];
          if (ct) {
            i &&
              ct.E.elev &&
              $o(
                i,
                [V, Q - 0.3, Y],
                [$, j - 0.3, st],
                [$, j - ut, st],
                [V, Q - dt, Y],
                [0, 0],
                [nt, 0],
                [nt, ut],
                [0, dt],
                Pb,
                [Z, 0, et],
              );
            continue;
          }
          let ot = !1;
          if (e?.probe)
            for (let vt of [0.15, 0.5, 0.85]) {
              let Pt = V + X * vt + Z * 0.7,
                jt = Y + K * vt + et * 0.7,
                Wt = Q + (j - Q) * vt;
              for (let Ct of e.probe(Pt, jt).all)
                if (Ct.J !== t && Math.abs(Ct.y - Wt) < 0.7) {
                  ot = !0;
                  break;
                }
              if (ot) break;
            }
          if (ot) {
            i &&
              $o(
                i,
                [V, Q - 0.3, Y],
                [$, j - 0.3, st],
                [$, j - ut, st],
                [V, Q - dt, Y],
                [0, 0],
                [nt, 0],
                [nt, ut],
                [0, dt],
                Cb,
                [Z, 0, et],
              );
            continue;
          }
          let at = Z * 0.4,
            yt = et * 0.4;
          (i &&
            ($o(
              i,
              [$, j, st],
              [V, Q, Y],
              [V, Q + 0.85, Y],
              [$, j + 0.85, st],
              [0, 0],
              [nt, 0],
              [nt, 0.85],
              [0, 0.85],
              pr,
              [-Z, 0, -et],
            ),
            Lb(
              i,
              [V, Q + 0.85, Y],
              [$, j + 0.85, st],
              [$ + at, j + 0.85, st + yt],
              [V + at, Q + 0.85, Y + yt],
              pr,
              !0,
            ),
            $o(
              i,
              [V + at, Q - dt, Y + yt],
              [$ + at, j - ut, st + yt],
              [$ + at, j + 0.85, st + yt],
              [V + at, Q + 0.85, Y + yt],
              [0, Q - dt],
              [nt, j - ut],
              [nt, j + 0.85],
              [0, Q + 0.85],
              Cb,
              [Z, 0, et],
            ),
            $o(
              i,
              [V, Q - dt, Y],
              [$, j - ut, st],
              [$ + at, j - ut, st + yt],
              [V + at, Q - dt, Y + yt],
              [0, 0],
              [nt, 0],
              [nt, 0.4],
              [0, 0.4],
              cl,
              [0, -1, 0],
            )),
            a &&
              nt > 0.2 &&
              a.push({
                t: "obb",
                x: tt + Z * 0.2,
                z: it + et * 0.2,
                hx: 0.25,
                hz: nt / 2 + 0.05,
                c: K / nt,
                s: X / nt,
                y0: Math.min(Q, j) - 0.5,
                y1: Math.max(Q, j) + 1.2,
                rail: !0,
              }));
        }
        H += D;
      }
    }
    if (!e?.terrainAt) continue;
    let T = p.find((H) => H.E === c),
      E = T.dx,
      A = T.dz,
      C = -A,
      P = E,
      I = 1e9,
      L = -1e9;
    for (let H = 0; H < z; H++) {
      let O = (y[H * 2] - t.x) * E + (y[H * 2 + 1] - t.z) * A;
      ((I = Math.min(I, O)), (L = Math.max(L, O)));
    }
    let F = 26,
      N = Math.max(1, Math.round((L - I) / F)),
      B = (H, O) => {
        let D = sP(S, M.flat, M.ys, H, O);
        return D === null
          ? null
          : D -
              (t.hull && t._dP
                ? t._dP
                : Math.min(Oy(c, 3.5), ik(e, H, O, D, t)));
      };
    for (let H = 0; H < N; H++)
      for (let O of [0, 4, -4, 8, -8]) {
        let D = I + ((L - I) * (H + 0.5)) / N + O,
          U = t.x + E * D,
          G = t.z + A * D;
        if (p.some((it) => Math.hypot(U - it.x, G - it.z) < 5)) continue;
        let q = null,
          W = null;
        for (let it = -60; it <= 60; it += 0.5)
          Sb(g, U + C * it, G + P * it) && (q === null && (q = it), (W = it));
        if (q === null || W - q < 2) continue;
        let V = W - q,
          Y = V < 7 ? 1 : V < 17 ? 2 : Math.ceil(V / 8.5),
          $ = Math.max(h.hu, h.hv) * (Y === 1 ? 1.1 : 1),
          st = t.hull ? qh + $ : $ + 0.5,
          Q = (it, rt, lt, ct) => {
            for (let dt = 0; dt <= 8; dt++) {
              let ut = (dt * Math.PI) / 4,
                ot = dt === 8 ? 0 : $ + 0.6;
              for (let at of e.probe(
                it + Math.cos(ut) * ot,
                rt + Math.sin(ut) * ot,
              ).all)
                if (at.J !== t && at.y > lt - 1.5 && at.y < ct - 0.3) return !1;
            }
            return !d(it, rt);
          },
          j = null,
          X = null;
        {
          let it = [],
            rt = !0;
          for (let lt = 0; lt < Y && rt; lt++) {
            let ct = Y === 1 ? 0.5 : lt / (Y - 1),
              dt = Math.min(q + st, (q + W) / 2),
              ut = Math.max(W - st, (q + W) / 2),
              ot = dt + (ut - dt) * ct,
              at = U + C * ot,
              yt = G + P * ot,
              vt = B(at, yt),
              Pt = e.terrainAt(at, yt);
            if (vt === null || vt - Pt < 3 || !Q(at, yt, Pt, vt)) {
              rt = !1;
              break;
            }
            it.push([at, yt, vt, Pt, ot]);
          }
          rt && ((j = it), (X = [q + 0.5, W - 0.5]));
        }
        if (!j) {
          let it = B(U + (C * (q + W)) / 2, G + (P * (q + W)) / 2);
          if (it === null) continue;
          let rt = (dt) => {
              for (let ut = $ + 0.5; ut <= 20; ut += 0.75) {
                let ot = dt < 0 ? q - ut : W + ut,
                  at = U + C * ot,
                  yt = G + P * ot,
                  vt = e.terrainAt(at, yt);
                if (!(it - h.cap - vt < 3) && Q(at, yt, vt, it)) return ot;
              }
              return null;
            },
            lt = rt(-1),
            ct = rt(1);
          if (lt === null && ct === null) continue;
          if (lt === null) {
            if (ct - W > 10) continue;
            lt = q + st;
          } else if (ct === null) {
            if (q - lt > 10) continue;
            ct = W - st;
          }
          j = [];
          for (let dt of [lt, ct]) {
            if (dt > q + st - 0.01 && dt < W - st + 0.01) continue;
            let ut = U + C * dt,
              ot = G + P * dt;
            j.push([ut, ot, it, e.terrainAt(ut, ot), dt]);
          }
          X = [lt - $ - 0.3, ct + $ + 0.3];
        }
        let K = Math.min(...j.map((it) => it[2])),
          nt = j.some((it) => it[4] < q || it[4] > W),
          Z = j.length > 1 || nt,
          et = null;
        if (Z) {
          for (let it of nt ? [h.cap, 0.35] : [h.cap]) {
            et = K - it;
            let rt = !0;
            for (let lt = 0; lt <= 12 && rt; lt++) {
              let ct = X[0] + ((X[1] - X[0]) * lt) / 12,
                dt = U + C * ct,
                ut = G + P * ct;
              for (let ot of e.probe(dt, ut).all)
                if (
                  ot.J !== t &&
                  ot.y < et + 0.2 &&
                  ot.y > et - (it > 1 ? 4.4 : 3.5)
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
            Z = !1;
          }
        }
        if (i) {
          if (Z) {
            let it = (X[0] + X[1]) / 2,
              rt = (X[1] - X[0]) / 2;
            iP(
              i,
              U + C * it,
              G + P * it,
              E,
              A,
              h.hu + 0.25,
              rt,
              et,
              K + 0.05,
              h.col,
            );
          }
          for (let [it, rt, lt, ct] of j) {
            let dt = Z ? et : lt,
              ut = j.length === 1 && !Z ? 1.1 : 1,
              ot = ct - 0.5;
            (h.band &&
              dt - ot > 5 &&
              (Eb(
                i,
                it,
                rt,
                E,
                A,
                h.hu * ut,
                h.hv * ut,
                h.ch * ut,
                ot,
                ct + 2.9,
                h.band,
                0,
              ),
              (ot = ct + 2.9)),
              Eb(
                i,
                it,
                rt,
                E,
                A,
                h.hu * ut,
                h.hv * ut,
                h.ch * ut,
                ot,
                dt + 0.05,
                h.col,
                ot - ct + 0.5,
              ));
          }
        }
        let tt = [
          U + C * X[0],
          G + P * X[0],
          U + C * X[1],
          G + P * X[1],
          Z ? et : K,
        ];
        if (r)
          for (let [it, rt, lt, ct] of j)
            r.push({
              t: "obb",
              x: it,
              z: rt,
              hx: h.hv * 1.1 + 0.05,
              hz: h.hu * 1.1 + 0.05,
              c: A,
              s: E,
              y0: ct - 1,
              y1: Z ? et : lt,
              pier: !0,
              sup: tt,
              src: -1 - t.id,
            });
        break;
      }
  }
}
