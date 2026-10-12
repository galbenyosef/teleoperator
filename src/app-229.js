// app 229 — math
// Lines 119237-120532 of readable/app.pretty.js (statement-aligned).
function Nk(i, t) {
  let e = !!i.real,
    s = to.west(-122.4484),
    n = 303,
    o = 355,
    a = e ? s - 10 : s,
    r = e ? 286 : 298,
    l = e ? 115 : 95,
    c = e ? 35 : 33,
    h = t.G("pfa", "walllit"),
    f = t.G("pfa", "elev"),
    u = t.G("pfa", "ground"),
    d = t.G("pfa", "paint"),
    p = t.G("pfa", "foliage");
  ((t.M.walllit.userData.mbSkyVis = 1), (t.M.elev.userData.mbSkyVis = 1));
  let m = ka(1915),
    g,
    b,
    x;
  if (e) {
    let it = 1e9;
    for (let Wt = a - l; Wt <= a + l; Wt += 4)
      for (let Ct = r - c; Ct <= r + c; Ct += 4) it = Math.min(it, di(Wt, Ct));
    let rt = it + 0.36,
      lt = 2,
      ct = a - l - 30,
      dt = r - c - 30,
      ut = Math.ceil((2 * l + 60) / lt) + 1,
      ot = Math.ceil((2 * c + 60) / lt) + 1,
      at = new Uint8Array(ut * ot),
      yt = new Float32Array(ut * ot).fill(1e9),
      vt = new Float32Array(ut * ot).fill(1e9);
    for (let Wt = 0; Wt < ot; Wt++)
      for (let Ct = 0; Ct < ut; Ct++) {
        let qt = ct + Ct * lt,
          Zt = dt + Wt * lt;
        at[Wt * ut + Ct] =
          ((qt - a) / (l * 1.2)) ** 2 + ((Zt - r) / (c * 1.35)) ** 2 < 1 &&
          di(qt, Zt) < rt
            ? 1
            : 0;
      }
    for (let Wt = 0; Wt < ot; Wt++)
      for (let Ct = 0; Ct < ut; Ct++) {
        let qt = Wt * ut + Ct;
        at[qt] ? (vt[qt] = 0) : (yt[qt] = 0);
      }
    let Pt = (Wt) => {
      let Ct = lt,
        qt = lt * Math.SQRT2;
      for (let Zt = 0; Zt < ot; Zt++)
        for (let he = 0; he < ut; he++) {
          let ee = Zt * ut + he,
            Xt = Wt[ee];
          (he && (Xt = Math.min(Xt, Wt[ee - 1] + Ct)),
            Zt &&
              ((Xt = Math.min(Xt, Wt[ee - ut] + Ct)),
              he && (Xt = Math.min(Xt, Wt[ee - ut - 1] + qt)),
              he < ut - 1 && (Xt = Math.min(Xt, Wt[ee - ut + 1] + qt))),
            (Wt[ee] = Xt));
        }
      for (let Zt = ot - 1; Zt >= 0; Zt--)
        for (let he = ut - 1; he >= 0; he--) {
          let ee = Zt * ut + he,
            Xt = Wt[ee];
          (he < ut - 1 && (Xt = Math.min(Xt, Wt[ee + 1] + Ct)),
            Zt < ot - 1 &&
              ((Xt = Math.min(Xt, Wt[ee + ut] + Ct)),
              he < ut - 1 && (Xt = Math.min(Xt, Wt[ee + ut + 1] + qt)),
              he && (Xt = Math.min(Xt, Wt[ee + ut - 1] + qt))),
            (Wt[ee] = Xt));
        }
    };
    (Pt(yt), Pt(vt));
    let jt = new Float32Array(ut * ot);
    for (let Wt = 0; Wt < ut * ot; Wt++)
      jt[Wt] = at[Wt] ? yt[Wt] - lt / 2 : -(vt[Wt] - lt / 2);
    for (let Wt = 0; Wt < 4; Wt++) {
      let Ct = new Float32Array(ut * ot);
      for (let qt = 0; qt < ot; qt++)
        for (let Zt = 0; Zt < ut; Zt++) {
          let he = 0,
            ee = 0;
          for (let Xt = -1; Xt <= 1; Xt++)
            for (let me = -1; me <= 1; me++) {
              let re = Zt + me,
                os = qt + Xt;
              if (re < 0 || os < 0 || re >= ut || os >= ot) continue;
              let Dt = (2 - Math.abs(me)) * (2 - Math.abs(Xt));
              ((he += jt[os * ut + re] * Dt), (ee += Dt));
            }
          Ct[qt * ut + Zt] = he / ee;
        }
      jt = Ct;
    }
    ((g = (Wt, Ct) => {
      let qt = (Wt - ct) / lt,
        Zt = (Ct - dt) / lt;
      if (qt < 0 || Zt < 0 || qt >= ut - 1 || Zt >= ot - 1) return -40;
      let he = Math.floor(qt),
        ee = Math.floor(Zt),
        Xt = qt - he,
        me = Zt - ee,
        re = ee * ut + he;
      return (
        (jt[re] * (1 - Xt) + jt[re + 1] * Xt) * (1 - me) +
        (jt[re + ut] * (1 - Xt) + jt[re + ut + 1] * Xt) * me
      );
    }),
      (b = -1e9),
      (x = it + 0.14));
  } else {
    g = (rt, lt) => {
      let ct = Math.atan2(lt - r, rt - a),
        dt = 1 + 0.07 * Math.sin(3 * ct + 1) + 0.04 * Math.sin(5 * ct),
        ut = (rt - a) / l,
        ot = (lt - r) / c;
      return (1 - Math.hypot(ut, ot) / dt) * c;
    };
    let it = -1e9;
    for (let rt = a - l - 12; rt <= a + l + 12; rt += 5)
      for (let lt = r - c - 10; lt <= r + c + 10; lt += 5)
        g(rt, lt) > -3 && (it = Math.max(it, di(rt, lt)));
    ((b = it + 0.85), (x = b - 0.32));
  }
  let v = (it, rt) => {
      let lt = (it - s) / 170,
        ct = (rt - 330) / 105;
      return (1 - Math.hypot(lt, ct)) * 105;
    },
    y = i.clear || ((it, rt) => !Hi(it, rt, 14)),
    M = (it, rt) => {
      let lt = 0;
      for (
        let ct = 0;
        ct < 50 && !(g(a + Math.cos(it) * lt, r + Math.sin(it) * lt) < rt);
        ct++
      )
        lt += 3;
      for (let ct = 0; ct < 12; ct++)
        lt +=
          g(a + Math.cos(it) * lt, r + Math.sin(it) * lt) > rt ? 0.25 : -0.25;
      return lt;
    },
    S = (it, rt) => {
      let lt = di(it, rt) + 0.08,
        ct = v(it, rt);
      return Math.max(lt, Math.min(b, b + ct * 0.25));
    },
    w = 17.5,
    z = Math.max(b, di(s, o)) + 0.1;
  if (e)
    for (let it = 0; it < 16; it++)
      z = Math.max(
        z,
        Math.min(
          di(
            s + Math.cos(it * 0.3927) * (w + 6),
            o + Math.sin(it * 0.3927) * (w + 6),
          ),
          di(s, o) + 0.6,
        ) + 0.1,
      );
  let _ = z + 1.5,
    R = 2.8,
    T = 19,
    E = _ + T,
    A = E + 5.2,
    C = A + 6.5,
    P = w - 3.2,
    I = C + 1,
    L = 90,
    F = -1.2,
    N = 1.2,
    B = 44,
    H = (it, rt) => [s + Math.sin(it) * rt, n + Math.cos(it) * rt],
    O = (it) => Math.max(b, di(...H(it, L))) + 0.1,
    D = -1e9;
  for (let it = 0; it <= B; it++) D = Math.max(D, O(F + ((N - F) * it) / B));
  let U = 12.5,
    G = D + 1.1,
    q = G + U,
    W = 108,
    V = 135,
    Y = (it, rt, lt) => {
      let ct = 1,
        dt = Math.hypot(it - s, lt - o);
      dt < w + 7.5 &&
        rt < $ + 6 &&
        ((ct *= 0.62 + 0.38 * Mu(0, 2.2, rt - (dt < w + 4.8 ? _ : z - 3))),
        dt < w - 2.6
          ? (ct *=
              rt < A ? 0.62 + 0.18 * Mu(_, E, rt) : 0.55 + 0.25 * Mu(I, $, rt))
          : dt < w + 3.7 && rt > E - 0.6 && rt < E + 0.05 && (ct *= 0.55));
      let ut = Math.hypot(it - s, lt - n),
        ot = Math.atan2(it - s, lt - n);
      if (Math.abs(ot) < 1.25 && ut > L - 6 && ut < L + 6) {
        let at = Math.abs(ut - L);
        ((ct *= 0.6 + 0.4 * Mu(0, 2.5, rt - G)),
          at < 2.9 &&
            rt < q + 0.05 &&
            (ct *=
              0.5 +
              0.3 * Mu(0, 2.9, at) +
              0.2 * Mu(G, q, rt) * Mu(1.5, 2.9, at)),
          rt > q + 3 && (ct *= 1));
      }
      return (
        Math.abs(ot) < 1.1 &&
          ut > W - 0.5 &&
          ut < V + 0.5 &&
          (ct *= 0.62 + 0.38 * Mu(0, 4, rt - D)),
        ct
      );
    },
    $ = I + P * 0.92,
    st = new Map(),
    Q = (it) => {
      let rt = [];
      return (
        st.set(it, { a: rt, v0: it.v }),
        (lt, ct, dt, ut, ot, at) => {
          let yt = Y(lt, ct, dt);
          return (
            rt.push(yt),
            Math.max(1 / 255, yt * (0.55 + 0.45 * ot) + 0.04 * (1 - yt))
          );
        }
      );
    };
  ((h.sky = Q(h)), (f.sky = Q(f)));
  let j = [];
  {
    let it = ka(1916);
    for (let rt = 0; rt < 46; rt++) {
      let lt = it() * Math.PI * 2,
        ct = 1.08 + it() * 0.5,
        dt = it(),
        ut = it(),
        ot = it(),
        at = it(),
        yt = a + Math.cos(lt) * l * ct,
        vt =
          r +
          Math.sin(lt) * c * ct * (Math.sin(lt) > 0 ? 1 : 0.8) +
          (Math.sin(lt) > 0 ? 40 * dt : 0);
      if (
        !y(yt, vt) ||
        v(yt, vt) < 0 ||
        g(yt, vt) > -2 ||
        Math.hypot(yt - s, vt - o) < w + 12
      )
        continue;
      let Pt = Math.atan2(yt - s, vt - n),
        jt = Math.hypot(yt - s, vt - n);
      (Math.abs(Pt) < 1.25 && jt > L - 8 && jt < 135) ||
        j.some((Wt) => Math.hypot(Wt.x - yt, Wt.z - vt) < 6) ||
        j.push({ x: yt, z: vt, euc: ut < 0.85, rot: ot * 6.283, s: at });
    }
  }
  let X = (it, rt) => {
      let lt = 1;
      for (let ct of j) {
        let dt = (ct.x - it) ** 2 + (ct.z - rt) ** 2;
        dt < 30 && (lt *= 1 - 0.4 * Math.exp(-dt / 5));
      }
      return lt;
    },
    K = (it, rt) => {
      let lt = Math.hypot(it - s, rt - o),
        ct = Math.hypot(it - s, rt - n),
        dt = Math.atan2(it - s, rt - n),
        ut =
          1 -
          0.3 *
            Math.exp(-Math.max(0, lt - (w + 6.5)) / 1.5) *
            (lt > w + 6 ? 1 : 0);
      if (Math.abs(dt) < 1.22) {
        let ot = Math.abs(ct - L) - 4.2;
        ot > 0 && (ut *= 1 - 0.3 * Math.exp(-ot / 1.5));
      }
      return (
        Math.abs(dt) < 1.06 &&
          ct > W - 6 &&
          ct < W &&
          (ut *= 1 - 0.3 * Math.exp(-(W - ct) / 2)),
        ut
      );
    },
    nt = (it, rt) => {
      let lt = g(it, rt);
      return e
        ? Math.min(lt + 2.5, Math.max(lt, x - 0.25 - S(it, rt)))
        : lt + 0.4;
    };
  Aa(
    u,
    s - 175,
    236,
    s + 175,
    440,
    2,
    (it, rt) => Math.min(v(it, rt) + 30, -nt(it, rt), y(it, rt) ? 1 / 0 : -1),
    S,
    (it, rt) => {
      let lt = X(it, rt) * K(it, rt) * (1 - 0.12 * Mu(-6, -1.5, g(it, rt)));
      return [0.58 * lt, 0.63 * lt, 0.46 * lt, To.lawn];
    },
    (it, rt) => (S(it, rt) > di(it, rt) + 0.2 ? [0, 1, 0] : Kb(it, rt)),
  );
  {
    let rt = [];
    for (let dt = 0; dt <= 400; dt++) {
      let ut = (dt / 400) * Math.PI * 2,
        ot = Math.cos(ut),
        at = Math.sin(ut);
      rt.push(
        [M(ut, -1.6), M(ut, -4.4)].map((yt) => [a + ot * yt, r + at * yt]),
      );
    }
    let lt = (dt) => y(dt[0], dt[1]) && v(dt[0], dt[1]) > -20,
      ct = (dt) => S(dt[0], dt[1]) + 0.08;
    for (let dt = 0; dt < 400; dt++) {
      let [ut, ot] = rt[dt],
        [at, yt] = rt[dt + 1];
      !lt(ut) ||
        !lt(ot) ||
        !lt(at) ||
        !lt(yt) ||
        Math.hypot(ut[0] - at[0], ut[1] - at[1]) > 6 ||
        js(
          u,
          [ut[0], ct(ut), ut[1]],
          [at[0], ct(at), at[1]],
          [yt[0], ct(yt), yt[1]],
          [ot[0], ct(ot), ot[1]],
          [ut[0], ut[1]],
          [at[0], at[1]],
          [yt[0], yt[1]],
          [ot[0], ot[1]],
          [0.55, 0.52, 0.48, To.sand],
          [0, 1, 0],
        );
    }
  }
  if (
    (t.planar?.set("pfa|water", 320),
    Aa(
      t.G("pfa", "water"),
      s - 175,
      236,
      s + 175,
      440,
      2,
      nt,
      () => x,
      [0.018, 0.03, 0.028, 1],
    ),
    !e)
  ) {
    let it = null,
      rt = 160;
    for (let lt = 0; lt <= rt; lt++) {
      let ct = (lt / rt) * Math.PI * 2,
        dt = M(ct, 0),
        ut = [a + Math.cos(ct) * dt, r + Math.sin(ct) * dt],
        ot = [a + Math.cos(ct) * (dt + 0.55), r + Math.sin(ct) * (dt + 0.55)];
      if (it) {
        let at = [-(ut[0] - a), 0, -(ut[1] - r)],
          yt = (lt - 1) * 0.6,
          vt = lt * 0.6;
        (js(
          h,
          [it[0][0], x - 0.4, it[0][1]],
          [ut[0], x - 0.4, ut[1]],
          [ut[0], x + 0.06, ut[1]],
          [it[0][0], x + 0.06, it[0][1]],
          [yt, 0],
          [vt, 0],
          [vt, 0.4],
          [yt, 0.4],
          B0(0.5, 0.47, 0.42),
          at,
        ),
          js(
            h,
            [it[0][0], x + 0.06, it[0][1]],
            [ut[0], x + 0.06, ut[1]],
            [ut[0], b + 0.12, ut[1]],
            [it[0][0], b + 0.12, it[0][1]],
            [yt, x],
            [vt, x],
            [vt, b],
            [yt, b],
            jr,
            at,
          ),
          js(
            h,
            [it[0][0], b + 0.12, it[0][1]],
            [ut[0], b + 0.12, ut[1]],
            [ot[0], b + 0.12, ot[1]],
            [it[1][0], b + 0.12, it[1][1]],
            [it[0][0], it[0][1]],
            [ut[0], ut[1]],
            [ot[0], ot[1]],
            [it[1][0], it[1][1]],
            tr,
            [0, 1, 0],
          ),
          js(
            h,
            [it[1][0], b - 0.2, it[1][1]],
            [ot[0], b - 0.2, ot[1]],
            [ot[0], b + 0.12, ot[1]],
            [it[1][0], b + 0.12, it[1][1]],
            [yt, b],
            [vt, b],
            [vt, b + 0.3],
            [yt, b + 0.3],
            tr,
            [ot[0] - a, 0, ot[1] - r],
          ));
      }
      it = [ut, ot];
    }
  }
  let Z = (it, rt, lt, ct, dt, ut = 1, ot = 0, at = 14) => {
      let yt = 2.3 * lt,
        vt = dt + 0.95 * lt,
        Pt = dt + ct - yt;
      (Ne(
        h,
        it,
        rt,
        ut,
        ot,
        1.42 * lt,
        1.42 * lt,
        dt,
        dt + 0.32 * lt,
        Fk,
        [1, 1, 1, 1, 1, 0],
      ),
        Jh(
          h,
          it,
          rt,
          [
            [1.3 * lt, dt + 0.32 * lt],
            [1.36 * lt, dt + 0.48 * lt],
            [1.12 * lt, dt + 0.68 * lt],
            [1.04 * lt, dt + 0.95 * lt],
          ],
          at,
          tr,
          { n: 2 },
        ),
        Jh(
          h,
          it,
          rt,
          [
            [lt, vt],
            [lt * 0.985, vt + 0.33 * (Pt - vt)],
            [lt * 0.93, vt + 0.66 * (Pt - vt)],
            [lt * 0.86, Pt - 0.18 * lt],
          ],
          at,
          b2t,
        ),
        Jh(
          h,
          it,
          rt,
          [
            [lt * 0.86, Pt - 0.18 * lt],
            [lt * 0.96, Pt - 0.06 * lt],
            [lt * 0.88, Pt + 0.06 * lt],
          ],
          at,
          tr,
          { n: 2 },
        ),
        Jh(
          h,
          it,
          rt,
          [
            [lt * 0.88, Pt + 0.06 * lt],
            [lt * 1, Pt + 0.95 * lt],
            [lt * 1.3, Pt + 1.75 * lt],
            [lt * 1.42, Pt + 2 * lt],
          ],
          at,
          HX,
          0.42,
        ));
      let jt = -ot,
        Wt = ut;
      for (let [Ct, qt] of [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ])
        Ne(
          h,
          it + (ut * Ct + jt * qt) * 1.05 * lt,
          rt + (ot * Ct + Wt * qt) * 1.05 * lt,
          ut,
          ot,
          0.32 * lt,
          0.32 * lt,
          Pt + 1.45 * lt,
          Pt + 2 * lt,
          HX,
          [1, 1, 1, 1, 0, 0],
        );
      Ne(
        h,
        it,
        rt,
        ut,
        ot,
        1.5 * lt,
        1.5 * lt,
        Pt + 2 * lt,
        dt + ct,
        br,
        [1, 1, 1, 1, 1, 1],
      );
    },
    et = (it, rt) => [
      s + it * Math.cos(Math.PI / 8 + (rt * Math.PI) / 4),
      o + it * Math.sin(Math.PI / 8 + (rt * Math.PI) / 4),
    ],
    tt = (it, rt, lt, ct, dt, ut, ot = [1, 1, 1, 1]) => {
      for (let at = 0; at < 8; at++) {
        let yt = et(lt, at),
          vt = et(lt, at + 1),
          Pt = et(rt, at),
          jt = et(rt, at + 1),
          Wt = Math.hypot(vt[0] - yt[0], vt[1] - yt[1]),
          Ct = Math.hypot(jt[0] - Pt[0], jt[1] - Pt[1]),
          qt = [(yt[0] + vt[0]) / 2 - s, 0, (yt[1] + vt[1]) / 2 - o],
          Zt = at * Wt;
        (ot[0] &&
          js(
            it,
            [yt[0], ct, yt[1]],
            [vt[0], ct, vt[1]],
            [vt[0], dt, vt[1]],
            [yt[0], dt, yt[1]],
            [Zt, ct],
            [Zt + Wt, ct],
            [Zt + Wt, dt],
            [Zt, dt],
            ut,
            qt,
          ),
          ot[1] &&
            rt > 0 &&
            js(
              it,
              [Pt[0], ct, Pt[1]],
              [jt[0], ct, jt[1]],
              [jt[0], dt, jt[1]],
              [Pt[0], dt, Pt[1]],
              [at * Ct, ct],
              [(at + 1) * Ct, ct],
              [(at + 1) * Ct, dt],
              [at * Ct, dt],
              ut,
              qt.map((he) => -he),
            ),
          ot[2] &&
            js(
              it,
              [yt[0], dt, yt[1]],
              [vt[0], dt, vt[1]],
              [jt[0], dt, jt[1]],
              [Pt[0], dt, Pt[1]],
              [yt[0], yt[1]],
              [vt[0], vt[1]],
              [jt[0], jt[1]],
              [Pt[0], Pt[1]],
              ut,
              [0, 1, 0],
            ),
          ot[3] &&
            js(
              it,
              [yt[0], ct, yt[1]],
              [vt[0], ct, vt[1]],
              [jt[0], ct, jt[1]],
              [Pt[0], ct, Pt[1]],
              [yt[0], yt[1]],
              [vt[0], vt[1]],
              [jt[0], jt[1]],
              [Pt[0], Pt[1]],
              ut,
              [0, -1, 0],
            ));
      }
    };
  (tt(h, 0, w + 6.5, z - 3, z + 0.5, jr, [1, 0, 1, 0]),
    tt(h, 0, w + 5.6, z + 0.5, z + 1, jr, [1, 0, 1, 0]),
    tt(h, 0, w + 4.8, z + 1, z + 1.5, tr, [1, 0, 0, 0]),
    tt(h, 0, w + 4.8, _ - 0.02, _, [0.8, 0.76, 0.7, hi.granite], [0, 0, 1, 0]));
  for (let it = 0; it < 8; it++) {
    let rt = et(w, it),
      lt = Math.PI / 8 + (it * Math.PI) / 4,
      ct = Math.cos(lt),
      dt = Math.sin(lt);
    (Ne(h, rt[0], rt[1], ct, dt, 1.5, 1.5, _ + R, E, jr, [1, 1, 1, 1, 0, 0]),
      Ne(h, rt[0], rt[1], ct, dt, 3.1, 3.1, _, _ + 0.45, Fk),
      Ne(
        h,
        rt[0],
        rt[1],
        ct,
        dt,
        2.9,
        2.9,
        _ + 0.45,
        _ + R - 0.35,
        Fk,
        [1, 1, 1, 1, 0, 0],
      ),
      Ne(
        h,
        rt[0],
        rt[1],
        ct,
        dt,
        3.15,
        3.15,
        _ + R - 0.35,
        _ + R,
        br,
        [1, 1, 1, 1, 1, 1],
      ));
    for (let [ot, at] of [
      [1.9, 1.9],
      [1.9, -1.9],
      [-1.9, 1.9],
      [-1.9, -1.9],
    ])
      Z(
        rt[0] + ct * ot - dt * at,
        rt[1] + dt * ot + ct * at,
        0.78,
        E - (_ + R),
        _ + R,
        ct,
        dt,
      );
    let ut = et(w - 4.2, it);
    (Ne(h, ut[0], ut[1], ct, dt, 1.15, 1.15, _, _ + 1.2, Fk),
      Z(ut[0], ut[1], 0.7, E - (_ + 1.2), _ + 1.2, ct, dt),
      i.colliders.push(
        { t: "circ", x: rt[0], z: rt[1], r: 4.2 },
        { t: "circ", x: ut[0], z: ut[1], r: 1.1 },
      ));
  }
  (tt(h, w - 3.4, w + 2.45, E, E + 0.55, br, [1, 1, 0, 1]),
    tt(h, w - 3.4, w + 2.6, E + 0.55, E + 1.1, tr, [1, 1, 1, 0]),
    tt(h, w - 3.4, w + 2.75, E + 1.1, E + 1.65, br, [1, 1, 1, 0]),
    tt(h, w - 3.4, w + 2.6, E + 1.65, E + 3.25, tr, [1, 1, 0, 1]),
    tt(h, w - 3.4, w + 2.95, E + 3.25, E + 3.7, Zy, [1, 1, 0, 1]),
    tt(h, w - 3.6, w + 3.7, E + 3.7, E + 4.25, br, [1, 1, 0, 1]),
    tt(h, w - 3.5, w + 3.45, E + 4.25, E + 4.6, tr, [1, 1, 1, 0]),
    tt(h, w - 2.6, w + 2.4, E + 4.6, A, jr, [1, 1, 1, 0]));
  {
    let it = w - 5,
      rt = w - 3.4;
    for (let lt = 0; lt < 8; lt++) {
      let ct = et(it, lt),
        dt = et(it, lt + 1),
        ut = et(rt, lt),
        ot = et(rt, lt + 1),
        at = Math.hypot(dt[0] - ct[0], dt[1] - ct[1]),
        yt = at / 2 - 1,
        vt = 14,
        Pt = (he) =>
          E + 0.3 + Math.sqrt(Math.max(0, yt * yt - (he - at / 2) ** 2)),
        jt = (he, ee, Xt) => [
          he[0] + (ee[0] - he[0]) * Xt,
          he[1] + (ee[1] - he[1]) * Xt,
        ],
        Wt = [s - (ct[0] + dt[0]) / 2, 0, o - (ct[1] + dt[1]) / 2],
        Ct = (dt[0] - ct[0]) / at,
        qt = (dt[1] - ct[1]) / at,
        Zt = null;
      for (let he = 0; he <= vt; he++) {
        let ee = 1 + ((at - 2) * he) / vt,
          Xt = ee / at,
          me = jt(ct, dt, Xt),
          re = jt(ut, ot, Xt),
          os = Pt(ee);
        if (Zt) {
          js(
            h,
            [Zt.P[0], Zt.y, Zt.P[1]],
            [me[0], os, me[1]],
            [me[0], A, me[1]],
            [Zt.P[0], A, Zt.P[1]],
            [Zt.s, Zt.y],
            [ee, os],
            [ee, A],
            [Zt.s, A],
            tr,
            Wt,
          );
          let Dt = (Zt.s + ee) / 2 - at / 2,
            qe = -Math.sqrt(Math.max(1e-4, yt * yt - Dt * Dt)) / yt,
            pe = -Dt / yt;
          js(
            h,
            [Zt.P[0], Zt.y, Zt.P[1]],
            [me[0], os, me[1]],
            [re[0], os, re[1]],
            [Zt.Po[0], Zt.y, Zt.Po[1]],
            [Zt.s, 0],
            [ee, 0],
            [ee, 1.6],
            [Zt.s, 1.6],
            jr,
            [Ct * pe, qe, qt * pe],
          );
        }
        Zt = { P: me, Po: re, y: os, s: ee };
      }
      for (let [he, ee, Xt] of [
        [ct, 0, 1],
        [jt(ct, dt, (at - 1) / at), at - 1, at],
      ]) {
        let me = [he[0] + Ct * (Xt - ee), he[1] + qt * (Xt - ee)];
        js(
          h,
          [he[0], E, he[1]],
          [me[0], E, me[1]],
          [me[0], A, me[1]],
          [he[0], A, he[1]],
          [ee, E],
          [Xt, E],
          [Xt, A],
          [ee, A],
          tr,
          Wt,
        );
      }
    }
  }
  for (let it = 0; it < 8; it++) {
    let rt = et(w - 0.95, it),
      lt = et(w - 0.95, it + 1),
      ct = [(rt[0] + lt[0]) / 2 - s, 0, (rt[1] + lt[1]) / 2 - o],
      dt = [rt[0] + (lt[0] - rt[0]) * 0.12, rt[1] + (lt[1] - rt[1]) * 0.12],
      ut = [rt[0] + (lt[0] - rt[0]) * 0.88, rt[1] + (lt[1] - rt[1]) * 0.88];
    js(
      f,
      [dt[0], A + 0.5, dt[1]],
      [ut[0], A + 0.5, ut[1]],
      [ut[0], C - 0.6, ut[1]],
      [dt[0], C - 0.6, dt[1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0.95, 0.85, 0.75, 0.75],
      ct,
    );
    let ot = et(w - 0.85, it),
      at = Math.PI / 8 + (it * Math.PI) / 4;
    Ne(
      h,
      ot[0],
      ot[1],
      Math.cos(at),
      Math.sin(at),
      0.5,
      1.3,
      A,
      C,
      br,
      [1, 1, 1, 1, 0, 0],
    );
  }
  (tt(h, w - 5, w - 1.05, A, C, tr, [1, 1, 0, 1]),
    tt(h, w - 5, w - 0.95, A, A + 0.5, br, [1, 0, 0, 0]),
    tt(h, w - 5.2, w - 0.75, C - 0.6, C - 0.15, Zy, [1, 0, 0, 1]),
    tt(h, w - 5.2, w - 0.45, C - 0.15, C + 0.45, br, [1, 1, 1, 1]),
    tt(h, w - 5, w - 1.4, C + 0.45, I, jr, [1, 1, 1, 0]));
  for (let it = 0; it < 8; it++) {
    let rt = et(w + 0.6, it),
      lt = Math.PI / 8 + (it * Math.PI) / 4,
      ct = Math.cos(lt),
      dt = Math.sin(lt);
    (Ne(h, rt[0], rt[1], ct, dt, 1.5, 1.5, A, A + 1.2, jr),
      Ne(h, rt[0], rt[1], ct, dt, 1.25, 1.25, A + 1.2, A + 1.5, br),
      Jh(
        h,
        rt[0],
        rt[1],
        [
          [0.75, A + 1.5],
          [0.55, A + 1.75],
          [0.5, A + 2],
          [1.05, A + 2.7],
          [1.18, A + 3.4],
          [1, A + 4.1],
          [0.62, A + 4.5],
          [0.7, A + 4.75],
          [0.25, A + 5.1],
          [0.05, A + 5.4],
        ],
        14,
        br,
        { n: 4 },
      ));
  }
  {
    let it = [],
      rt = [];
    for (let ct = 0; ct <= 12; ct++) {
      let dt = ((ct / 12) * Math.PI) / 2;
      it.push([P * Math.cos(dt) + 0.01, I + P * 0.92 * Math.sin(dt)]);
    }
    for (let ct = 0; ct <= 14; ct++) {
      let dt = (((ct / 14) * Math.PI) / 2) * 0.97;
      rt.unshift([
        (P - 0.8) * Math.cos(dt) + 0.01,
        I - 0.2 + (P - 0.8) * 0.9 * Math.sin(dt),
      ]);
    }
    (Jh(h, s, o, it, 48, v2t, 1),
      Jh(h, s, o, rt, 48, w2t, { n: 16 }, (ct) => ((14 - ct) / 14) * 7),
      Jh(
        h,
        s,
        o,
        [
          [0.01, I - 0.2 + (P - 0.8) * 0.9 + 0.05],
          [
            (P - 0.8) * Math.cos((Math.PI / 2) * 0.97) + 0.05,
            I - 0.2 + (P - 0.8) * 0.9 * Math.sin((Math.PI / 2) * 0.97) - 0.02,
          ],
        ],
        16,
        B0(1.1, 0.95, 0.75, Zh.capital),
        0.6,
      ));
    for (let ct = 0; ct < 16; ct++) {
      let dt = (ct * Math.PI) / 8,
        ut = null;
      for (let ot = 0; ot <= 10; ot++) {
        let at = (((ot / 10) * Math.PI) / 2) * 0.94,
          yt = [
            s + Math.cos(dt) * (P + 0.15) * Math.cos(at),
            I + (P * 0.92 + 0.15) * Math.sin(at),
            o + Math.sin(dt) * (P + 0.15) * Math.cos(at),
          ];
        (ut && ii(h, ut, yt, 0.55, 0.38, y2t), (ut = yt));
      }
    }
    (Jh(
      h,
      s,
      o,
      [
        [P + 1.1, I - 0.02],
        [P + 1.1, I + 0.5],
        [P + 0.6, I + 0.55],
        [P + 0.6, I + 1],
        [P + 0.1, I + 1.05],
      ],
      32,
      tr,
      { n: 32 },
    ),
      Jh(
        h,
        s,
        o,
        [
          [2.4, $ - 0.4],
          [2.4, $ + 0.3],
          [2.1, $ + 0.4],
          [2.1, $ + 1.7],
          [2.7, $ + 1.85],
          [2.6, $ + 2.1],
          [1.3, $ + 2.6],
          [0.4, $ + 3.4],
          [0.12, $ + 4.4],
          [0.02, $ + 4.6],
        ],
        16,
        br,
        { n: 8 },
      ));
  }
  for (let it = 0; it < B; it++) {
    let rt = F + ((N - F) * it) / B,
      lt = F + ((N - F) * (it + 1)) / B,
      ct = (rt + lt) / 2,
      dt = H(ct, L),
      ut = L * (lt - rt),
      ot = Math.cos(ct),
      at = -Math.sin(ct),
      yt = it % 3 === 1,
      vt = (Ct, qt, Zt, he) => {
        let ee = H(rt, L - Ct),
          Xt = H(lt, L - Ct),
          me = H(lt, L + Ct),
          re = H(rt, L + Ct);
        js(
          h,
          [ee[0], qt, ee[1]],
          [Xt[0], qt, Xt[1]],
          [me[0], qt, me[1]],
          [re[0], qt, re[1]],
          [ee[0], ee[1]],
          [Xt[0], Xt[1]],
          [me[0], me[1]],
          [re[0], re[1]],
          Zt,
          [0, he ? 1 : -1, 0],
        );
      },
      Pt = (Ct, qt, Zt, he) => {
        for (let ee of [-1, 1]) {
          let Xt = H(rt, L + Ct * ee),
            me = H(lt, L + Ct * ee),
            re = Zt - qt,
            os = Math.hypot(me[0] - Xt[0], me[1] - Xt[1]);
          js(
            h,
            [Xt[0], qt, Xt[1]],
            [me[0], qt, me[1]],
            [me[0], Zt, me[1]],
            [Xt[0], Zt, Xt[1]],
            [0, qt],
            [os, qt],
            [os, qt + re],
            [0, qt + re],
            he,
            [Math.sin(ct) * ee, 0, Math.cos(ct) * ee],
          );
        }
      },
      jt = Math.min(O(ct), D) - 2.5;
    (Pt(5.1, jt, G - 0.9, jr),
      vt(5.1, G - 0.9, jr, !0),
      Pt(4.65, G - 0.9, G - 0.6, tr),
      vt(4.65, G - 0.6, tr, !0),
      Pt(4.2, G - 0.6, G - 0.3, jr),
      vt(4.2, G - 0.3, jr, !0),
      Pt(3.7, G - 0.3, G, tr),
      vt(3.7, G, tr, !0));
    let Wt = (Ct, qt, Zt) => {
      let he = (os, Dt) => [
          dt[0] + ot * (ut / 2 + 0.02) * os + Math.sin(ct) * Ct * Dt,
          dt[1] + at * (ut / 2 + 0.02) * os + Math.cos(ct) * Ct * Dt,
        ],
        ee = he(-1, 1),
        Xt = he(1, 1),
        me = (ct - F) * L,
        re = [Math.sin(ct) * Ct, 0, Math.cos(ct) * Ct];
      js(
        h,
        [ee[0], qt, ee[1]],
        [Xt[0], qt, Xt[1]],
        [Xt[0], Zt, Xt[1]],
        [ee[0], Zt, ee[1]],
        [me - ut / 2, 0],
        [me + ut / 2, 0],
        [me + ut / 2, 1],
        [me - ut / 2, 1],
        x2t,
        re,
      );
    };
    (vt(3.6, q, tr, !1),
      Wt(-3.6, q + 0.25, q + 1.3),
      Wt(3.6, q + 0.25, q + 1.3),
      Pt(3.6, q, q + 0.25, br),
      Pt(3.3, q + 1.3, q + 2.4, jr),
      Pt(3.55, q + 2.4, q + 2.75, Zy),
      vt(3.55, q + 2.4, Zy, !1),
      Pt(4.1, q + 2.75, q + 3.1, br),
      vt(4.1, q + 3.1, br, !0),
      vt(4.1, q + 2.75, br, !1));
    for (let Ct of [-2.6, 2.6])
      for (let qt of yt ? [-1.2, 1.2] : [0]) {
        let Zt = [
          dt[0] + ot * qt + Math.sin(ct) * Ct,
          dt[1] + at * qt + Math.cos(ct) * Ct,
        ];
        (Z(Zt[0], Zt[1], 0.55, U, G, ot, at, 12),
          i.colliders.push({ t: "circ", x: Zt[0], z: Zt[1], r: 0.75 }));
      }
    if (yt) {
      let Ct = q + 3.1,
        qt = 4.6,
        Zt = 3.4,
        he = 2.5;
      Ne(
        h,
        dt[0],
        dt[1],
        ot,
        at,
        Zt + 0.3,
        he + 0.3,
        Ct,
        Ct + 0.35,
        br,
        [1, 1, 1, 1, 1, 0],
      );
      let ee = (Xt, me) => [
        dt[0] + ot * Zt * Xt + Math.sin(ct) * he * me,
        dt[1] + at * Zt * Xt + Math.cos(ct) * he * me,
      ];
      for (let [Xt, me] of [
        [ee(-1, -1), ee(1, -1)],
        [ee(1, 1), ee(-1, 1)],
        [ee(1, -1), ee(1, 1)],
        [ee(-1, 1), ee(-1, -1)],
      ]) {
        let re = [-(me[1] - Xt[1]), 0, me[0] - Xt[0]],
          os = [(Xt[0] + me[0]) / 2 - dt[0], 0, (Xt[1] + me[1]) / 2 - dt[1]];
        js(
          f,
          [Xt[0], Ct + 0.35, Xt[1]],
          [me[0], Ct + 0.35, me[1]],
          [me[0], Ct + qt, me[1]],
          [Xt[0], Ct + qt, Xt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [1, 0.92, 0.84, 0.75],
          re[0] * os[0] + re[2] * os[2] > 0 ? re : re.map((Dt) => -Dt),
        );
      }
      (Ne(
        h,
        dt[0],
        dt[1],
        ot,
        at,
        Zt + 0.22,
        he + 0.22,
        Ct + qt - 0.05,
        Ct + qt + 0.3,
        Zy,
        [1, 1, 1, 1, 0, 1],
      ),
        Ne(
          h,
          dt[0],
          dt[1],
          ot,
          at,
          Zt + 0.4,
          he + 0.4,
          Ct + qt + 0.3,
          Ct + qt + 0.65,
          br,
          [1, 1, 1, 1, 1, 1],
        ));
      for (let Xt = 0; Xt < 5; Xt++)
        Ga(
          p,
          [dt[0] + (m() - 0.5) * 4.5, Ct + qt + 0.45, dt[1] + (m() - 0.5) * 3],
          m() * 3,
          1.9,
          1.4,
          Wa(3),
          [0.75, 0.9, 0.7, 1],
        );
    }
  }
  for (let it of [F, N]) {
    let rt = H(it, L),
      lt = Math.cos(it),
      ct = -Math.sin(it);
    Ne(h, rt[0], rt[1], lt, ct, 1, 4, G, q + 3.2, jr, [1, 1, 1, 1, 1, 0]);
  }
  {
    for (let dt = 0; dt < 30; dt++) {
      let ut = -1.05 + (2.1 * dt) / 30,
        ot = -1.05 + ((1.05 - -1.05) * (dt + 1)) / 30,
        at = H(ut, W),
        yt = H(ot, W),
        vt = H(ut, V),
        Pt = H(ot, V),
        jt = Math.min(di(...at), di(...vt)) - 1,
        Wt = D + 21,
        Ct = (ut - -1.05) * W,
        qt = (ot - -1.05) * W,
        Zt = (ut - -1.05) * V,
        he = (ot - -1.05) * V;
      (js(
        h,
        [at[0], jt, at[1]],
        [yt[0], jt, yt[1]],
        [yt[0], Wt, yt[1]],
        [at[0], Wt, at[1]],
        [Ct, jt],
        [qt, jt],
        [qt, Wt],
        [Ct, Wt],
        dC,
        [s - at[0], 0, n - at[1]],
      ),
        js(
          h,
          [vt[0], jt, vt[1]],
          [Pt[0], jt, Pt[1]],
          [Pt[0], Wt, Pt[1]],
          [vt[0], Wt, vt[1]],
          [Zt, jt],
          [he, jt],
          [he, Wt],
          [Zt, Wt],
          dC,
          [vt[0] - s, 0, vt[1] - n],
        ));
      let ee = H(ut, W - 0.6),
        Xt = H(ot, W - 0.6);
      (js(
        h,
        [ee[0], Wt - 1.2, ee[1]],
        [Xt[0], Wt - 1.2, Xt[1]],
        [Xt[0], Wt, Xt[1]],
        [ee[0], Wt, ee[1]],
        [Ct, Wt - 1.2],
        [qt, Wt - 1.2],
        [qt, Wt],
        [Ct, Wt],
        tr,
        [s - at[0], 0, n - at[1]],
      ),
        js(
          h,
          [ee[0], Wt - 1.2, ee[1]],
          [Xt[0], Wt - 1.2, Xt[1]],
          [yt[0], Wt - 1.2, yt[1]],
          [at[0], Wt - 1.2, at[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          jr,
          [0, -1, 0],
        ));
      let me = H(ut, (W + V) / 2),
        re = H(ot, (W + V) / 2);
      if (
        (js(
          d,
          [at[0], Wt, at[1]],
          [yt[0], Wt, yt[1]],
          [re[0], Wt + 5, re[1]],
          [me[0], Wt + 5, me[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.15, 0.15, 0.14, 0.75],
          [0, 1, 0],
        ),
        js(
          d,
          [me[0], Wt + 5, me[1]],
          [re[0], Wt + 5, re[1]],
          [Pt[0], Wt, Pt[1]],
          [vt[0], Wt, vt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.15, 0.15, 0.14, 0.75],
          [0, 1, 0],
        ),
        dt % 5 === 2)
      ) {
        let os = H((ut + ot) / 2, W - 0.1);
        Ne(
          d,
          os[0],
          os[1],
          Math.cos((ut + ot) / 2),
          -Math.sin((ut + ot) / 2),
          2.2,
          0.15,
          jt + 1,
          D + 7,
          [0.06, 0.06, 0.07, 0.3],
          [0, 0, 1, 1, 0, 0],
        );
      }
    }
    for (let dt of [-1.05, 1.05]) {
      let ut = H(dt, W),
        ot = H(dt, V),
        at = Math.min(di(...ut), di(...ot)) - 1,
        yt = D + 21,
        vt = H(dt, (W + V) / 2);
      (js(
        h,
        [ut[0], at, ut[1]],
        [ot[0], at, ot[1]],
        [ot[0], yt, ot[1]],
        [ut[0], yt, ut[1]],
        [0, at],
        [29, at],
        [29, yt],
        [0, yt],
        dC,
        [Math.cos(dt) * Math.sign(dt), 0, -Math.sin(dt) * Math.sign(dt)],
      ),
        js(
          h,
          [ut[0], yt, ut[1]],
          [ot[0], yt, ot[1]],
          [vt[0], yt + 5, vt[1]],
          [vt[0], yt + 5, vt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          jr,
          [Math.cos(dt) * Math.sign(dt), 0, -Math.sin(dt) * Math.sign(dt)],
        ));
    }
    for (let dt = 0; dt <= 8; dt++) {
      let ut = -1.05 + (2.1 * dt) / 8,
        ot = H(ut, (W + V) / 2);
      i.colliders.push({ t: "circ", x: ot[0], z: ot[1], r: 15 });
    }
  }
  for (let [it, { a: rt, v0: lt }] of st) {
    let ct = it.c.a;
    for (let dt = 0; dt < rt.length; dt++) {
      let ut = 0.62 + 0.38 * rt[dt];
      ((ct[(lt + dt) * 4] *= ut),
        (ct[(lt + dt) * 4 + 1] *= ut),
        (ct[(lt + dt) * 4 + 2] *= ut));
    }
    it.sky = null;
  }
  for (let it of j) {
    let rt = S(it.x, it.z) - 0.02;
    (i.inst.push(
      it.euc
        ? {
            kind: "tree",
            sp: "euc",
            x: it.x,
            y: rt,
            z: it.z,
            rot: it.rot,
            scale: 0.95 + 0.4 * it.s,
          }
        : {
            kind: "tree",
            sp: "cypress",
            x: it.x,
            y: rt,
            z: it.z,
            rot: it.rot,
            scale: 0.85 + 0.3 * it.s,
          },
    ),
      i.colliders.push({ t: "circ", x: it.x, z: it.z, r: 0.6 }));
  }
  for (let it = 0; it < 14; it++) {
    let rt = (it / 14) * Math.PI * 2 + 0.2,
      lt = M(rt, -5.2),
      ct = a + Math.cos(rt) * lt,
      dt = r + Math.sin(rt) * lt;
    y(ct, dt) &&
      (i.inst.push({
        kind: "lamp",
        x: ct,
        y: S(ct, dt),
        z: dt,
        rot: Math.atan2(s - ct, r - dt),
      }),
      i.colliders.push({ t: "circ", x: ct, z: dt, r: 0.18 }));
  }
}
