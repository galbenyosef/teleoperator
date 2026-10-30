// app 228 — math
// Lines 119493-120788 of readable/app.pretty.js (statement-aligned).
function Oz(o, t) {
  let e = !!o.real,
    s = po.west(-122.4484),
    n = 303,
    i = 355,
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
  let m = Fa(1915),
    g,
    b,
    v;
  if (e) {
    let ot = 1e9;
    for (let Gt = a - l; Gt <= a + l; Gt += 4)
      for (let Pt = r - c; Pt <= r + c; Pt += 4) ot = Math.min(ot, Ei(Gt, Pt));
    let rt = ot + 0.36,
      lt = 2,
      ht = a - l - 30,
      pt = r - c - 30,
      ut = Math.ceil((2 * l + 60) / lt) + 1,
      it = Math.ceil((2 * c + 60) / lt) + 1,
      at = new Uint8Array(ut * it),
      yt = new Float32Array(ut * it).fill(1e9),
      vt = new Float32Array(ut * it).fill(1e9);
    for (let Gt = 0; Gt < it; Gt++)
      for (let Pt = 0; Pt < ut; Pt++) {
        let Vt = ht + Pt * lt,
          Kt = pt + Gt * lt;
        at[Gt * ut + Pt] =
          ((Vt - a) / (l * 1.2)) ** 2 + ((Kt - r) / (c * 1.35)) ** 2 < 1 &&
          Ei(Vt, Kt) < rt
            ? 1
            : 0;
      }
    for (let Gt = 0; Gt < it; Gt++)
      for (let Pt = 0; Pt < ut; Pt++) {
        let Vt = Gt * ut + Pt;
        at[Vt] ? (vt[Vt] = 0) : (yt[Vt] = 0);
      }
    let At = (Gt) => {
      let Pt = lt,
        Vt = lt * Math.SQRT2;
      for (let Kt = 0; Kt < it; Kt++)
        for (let ue = 0; ue < ut; ue++) {
          let ne = Kt * ut + ue,
            jt = Gt[ne];
          (ue && (jt = Math.min(jt, Gt[ne - 1] + Pt)),
            Kt &&
              ((jt = Math.min(jt, Gt[ne - ut] + Pt)),
              ue && (jt = Math.min(jt, Gt[ne - ut - 1] + Vt)),
              ue < ut - 1 && (jt = Math.min(jt, Gt[ne - ut + 1] + Vt))),
            (Gt[ne] = jt));
        }
      for (let Kt = it - 1; Kt >= 0; Kt--)
        for (let ue = ut - 1; ue >= 0; ue--) {
          let ne = Kt * ut + ue,
            jt = Gt[ne];
          (ue < ut - 1 && (jt = Math.min(jt, Gt[ne + 1] + Pt)),
            Kt < it - 1 &&
              ((jt = Math.min(jt, Gt[ne + ut] + Pt)),
              ue < ut - 1 && (jt = Math.min(jt, Gt[ne + ut + 1] + Vt)),
              ue && (jt = Math.min(jt, Gt[ne + ut - 1] + Vt))),
            (Gt[ne] = jt));
        }
    };
    (At(yt), At(vt));
    let Ut = new Float32Array(ut * it);
    for (let Gt = 0; Gt < ut * it; Gt++)
      Ut[Gt] = at[Gt] ? yt[Gt] - lt / 2 : -(vt[Gt] - lt / 2);
    for (let Gt = 0; Gt < 4; Gt++) {
      let Pt = new Float32Array(ut * it);
      for (let Vt = 0; Vt < it; Vt++)
        for (let Kt = 0; Kt < ut; Kt++) {
          let ue = 0,
            ne = 0;
          for (let jt = -1; jt <= 1; jt++)
            for (let be = -1; be <= 1; be++) {
              let re = Kt + be,
                ds = Vt + jt;
              if (re < 0 || ds < 0 || re >= ut || ds >= it) continue;
              let Nt = (2 - Math.abs(be)) * (2 - Math.abs(jt));
              ((ue += Ut[ds * ut + re] * Nt), (ne += Nt));
            }
          Pt[Vt * ut + Kt] = ue / ne;
        }
      Ut = Pt;
    }
    ((g = (Gt, Pt) => {
      let Vt = (Gt - ht) / lt,
        Kt = (Pt - pt) / lt;
      if (Vt < 0 || Kt < 0 || Vt >= ut - 1 || Kt >= it - 1) return -40;
      let ue = Math.floor(Vt),
        ne = Math.floor(Kt),
        jt = Vt - ue,
        be = Kt - ne,
        re = ne * ut + ue;
      return (
        (Ut[re] * (1 - jt) + Ut[re + 1] * jt) * (1 - be) +
        (Ut[re + ut] * (1 - jt) + Ut[re + ut + 1] * jt) * be
      );
    }),
      (b = -1e9),
      (v = ot + 0.14));
  } else {
    g = (rt, lt) => {
      let ht = Math.atan2(lt - r, rt - a),
        pt = 1 + 0.07 * Math.sin(3 * ht + 1) + 0.04 * Math.sin(5 * ht),
        ut = (rt - a) / l,
        it = (lt - r) / c;
      return (1 - Math.hypot(ut, it) / pt) * c;
    };
    let ot = -1e9;
    for (let rt = a - l - 12; rt <= a + l + 12; rt += 5)
      for (let lt = r - c - 10; lt <= r + c + 10; lt += 5)
        g(rt, lt) > -3 && (ot = Math.max(ot, Ei(rt, lt)));
    ((b = ot + 0.85), (v = b - 0.32));
  }
  let x = (ot, rt) => {
      let lt = (ot - s) / 170,
        ht = (rt - 330) / 105;
      return (1 - Math.hypot(lt, ht)) * 105;
    },
    y = o.clear || ((ot, rt) => !Ni(ot, rt, 14)),
    M = (ot, rt) => {
      let lt = 0;
      for (
        let ht = 0;
        ht < 50 && !(g(a + Math.cos(ot) * lt, r + Math.sin(ot) * lt) < rt);
        ht++
      )
        lt += 3;
      for (let ht = 0; ht < 12; ht++)
        lt +=
          g(a + Math.cos(ot) * lt, r + Math.sin(ot) * lt) > rt ? 0.25 : -0.25;
      return lt;
    },
    S = (ot, rt) => {
      let lt = Ei(ot, rt) + 0.08,
        ht = x(ot, rt);
      return Math.max(lt, Math.min(b, b + ht * 0.25));
    },
    w = 17.5,
    _ = Math.max(b, Ei(s, i)) + 0.1;
  if (e)
    for (let ot = 0; ot < 16; ot++)
      _ = Math.max(
        _,
        Math.min(
          Ei(
            s + Math.cos(ot * 0.3927) * (w + 6),
            i + Math.sin(ot * 0.3927) * (w + 6),
          ),
          Ei(s, i) + 0.6,
        ) + 0.1,
      );
  let z = _ + 1.5,
    A = 2.8,
    T = 19,
    E = z + T,
    R = E + 5.2,
    P = R + 6.5,
    C = w - 3.2,
    I = P + 1,
    L = 90,
    F = -1.2,
    O = 1.2,
    B = 44,
    H = (ot, rt) => [s + Math.sin(ot) * rt, n + Math.cos(ot) * rt],
    N = (ot) => Math.max(b, Ei(...H(ot, L))) + 0.1,
    D = -1e9;
  for (let ot = 0; ot <= B; ot++) D = Math.max(D, N(F + ((O - F) * ot) / B));
  let U = 12.5,
    G = D + 1.1,
    W = G + U,
    V = 108,
    $ = 135,
    J = (ot, rt, lt) => {
      let ht = 1,
        pt = Math.hypot(ot - s, lt - i);
      pt < w + 7.5 &&
        rt < X + 6 &&
        ((ht *= 0.62 + 0.38 * nd(0, 2.2, rt - (pt < w + 4.8 ? z : _ - 3))),
        pt < w - 2.6
          ? (ht *=
              rt < R ? 0.62 + 0.18 * nd(z, E, rt) : 0.55 + 0.25 * nd(I, X, rt))
          : pt < w + 3.7 && rt > E - 0.6 && rt < E + 0.05 && (ht *= 0.55));
      let ut = Math.hypot(ot - s, lt - n),
        it = Math.atan2(ot - s, lt - n);
      if (Math.abs(it) < 1.25 && ut > L - 6 && ut < L + 6) {
        let at = Math.abs(ut - L);
        ((ht *= 0.6 + 0.4 * nd(0, 2.5, rt - G)),
          at < 2.9 &&
            rt < W + 0.05 &&
            (ht *=
              0.5 +
              0.3 * nd(0, 2.9, at) +
              0.2 * nd(G, W, rt) * nd(1.5, 2.9, at)),
          rt > W + 3 && (ht *= 1));
      }
      return (
        Math.abs(it) < 1.1 &&
          ut > V - 0.5 &&
          ut < $ + 0.5 &&
          (ht *= 0.62 + 0.38 * nd(0, 4, rt - D)),
        ht
      );
    },
    X = I + C * 0.92,
    tt = new Map(),
    Z = (ot) => {
      let rt = [];
      return (
        tt.set(ot, { a: rt, v0: ot.v }),
        (lt, ht, pt, ut, it, at) => {
          let yt = J(lt, ht, pt);
          return (
            rt.push(yt),
            Math.max(1 / 255, yt * (0.55 + 0.45 * it) + 0.04 * (1 - yt))
          );
        }
      );
    };
  ((h.sky = Z(h)), (f.sky = Z(f)));
  let q = [];
  {
    let ot = Fa(1916);
    for (let rt = 0; rt < 46; rt++) {
      let lt = ot() * Math.PI * 2,
        ht = 1.08 + ot() * 0.5,
        pt = ot(),
        ut = ot(),
        it = ot(),
        at = ot(),
        yt = a + Math.cos(lt) * l * ht,
        vt =
          r +
          Math.sin(lt) * c * ht * (Math.sin(lt) > 0 ? 1 : 0.8) +
          (Math.sin(lt) > 0 ? 40 * pt : 0);
      if (
        !y(yt, vt) ||
        x(yt, vt) < 0 ||
        g(yt, vt) > -2 ||
        Math.hypot(yt - s, vt - i) < w + 12
      )
        continue;
      let At = Math.atan2(yt - s, vt - n),
        Ut = Math.hypot(yt - s, vt - n);
      (Math.abs(At) < 1.25 && Ut > L - 8 && Ut < 135) ||
        q.some((Gt) => Math.hypot(Gt.x - yt, Gt.z - vt) < 6) ||
        q.push({ x: yt, z: vt, euc: ut < 0.85, rot: it * 6.283, s: at });
    }
  }
  let j = (ot, rt) => {
      let lt = 1;
      for (let ht of q) {
        let pt = (ht.x - ot) ** 2 + (ht.z - rt) ** 2;
        pt < 30 && (lt *= 1 - 0.4 * Math.exp(-pt / 5));
      }
      return lt;
    },
    K = (ot, rt) => {
      let lt = Math.hypot(ot - s, rt - i),
        ht = Math.hypot(ot - s, rt - n),
        pt = Math.atan2(ot - s, rt - n),
        ut =
          1 -
          0.3 *
            Math.exp(-Math.max(0, lt - (w + 6.5)) / 1.5) *
            (lt > w + 6 ? 1 : 0);
      if (Math.abs(pt) < 1.22) {
        let it = Math.abs(ht - L) - 4.2;
        it > 0 && (ut *= 1 - 0.3 * Math.exp(-it / 1.5));
      }
      return (
        Math.abs(pt) < 1.06 &&
          ht > V - 6 &&
          ht < V &&
          (ut *= 1 - 0.3 * Math.exp(-(V - ht) / 2)),
        ut
      );
    },
    nt = (ot, rt) => {
      let lt = g(ot, rt);
      return e
        ? Math.min(lt + 2.5, Math.max(lt, v - 0.25 - S(ot, rt)))
        : lt + 0.4;
    };
  Da(
    u,
    s - 175,
    236,
    s + 175,
    440,
    2,
    (ot, rt) => Math.min(x(ot, rt) + 30, -nt(ot, rt), y(ot, rt) ? 1 / 0 : -1),
    S,
    (ot, rt) => {
      let lt = j(ot, rt) * K(ot, rt) * (1 - 0.12 * nd(-6, -1.5, g(ot, rt)));
      return [0.58 * lt, 0.63 * lt, 0.46 * lt, Ho.lawn];
    },
    (ot, rt) => (S(ot, rt) > Ei(ot, rt) + 0.2 ? [0, 1, 0] : Fx(ot, rt)),
  );
  {
    let rt = [];
    for (let pt = 0; pt <= 400; pt++) {
      let ut = (pt / 400) * Math.PI * 2,
        it = Math.cos(ut),
        at = Math.sin(ut);
      rt.push(
        [M(ut, -1.6), M(ut, -4.4)].map((yt) => [a + it * yt, r + at * yt]),
      );
    }
    let lt = (pt) => y(pt[0], pt[1]) && x(pt[0], pt[1]) > -20,
      ht = (pt) => S(pt[0], pt[1]) + 0.08;
    for (let pt = 0; pt < 400; pt++) {
      let [ut, it] = rt[pt],
        [at, yt] = rt[pt + 1];
      !lt(ut) ||
        !lt(it) ||
        !lt(at) ||
        !lt(yt) ||
        Math.hypot(ut[0] - at[0], ut[1] - at[1]) > 6 ||
        $s(
          u,
          [ut[0], ht(ut), ut[1]],
          [at[0], ht(at), at[1]],
          [yt[0], ht(yt), yt[1]],
          [it[0], ht(it), it[1]],
          [ut[0], ut[1]],
          [at[0], at[1]],
          [yt[0], yt[1]],
          [it[0], it[1]],
          [0.55, 0.52, 0.48, Ho.sand],
          [0, 1, 0],
        );
    }
  }
  if (
    (t.planar?.set("pfa|water", 320),
    Da(
      t.G("pfa", "water"),
      s - 175,
      236,
      s + 175,
      440,
      2,
      nt,
      () => v,
      [0.018, 0.03, 0.028, 1],
    ),
    !e)
  ) {
    let ot = null,
      rt = 160;
    for (let lt = 0; lt <= rt; lt++) {
      let ht = (lt / rt) * Math.PI * 2,
        pt = M(ht, 0),
        ut = [a + Math.cos(ht) * pt, r + Math.sin(ht) * pt],
        it = [a + Math.cos(ht) * (pt + 0.55), r + Math.sin(ht) * (pt + 0.55)];
      if (ot) {
        let at = [-(ut[0] - a), 0, -(ut[1] - r)],
          yt = (lt - 1) * 0.6,
          vt = lt * 0.6;
        ($s(
          h,
          [ot[0][0], v - 0.4, ot[0][1]],
          [ut[0], v - 0.4, ut[1]],
          [ut[0], v + 0.06, ut[1]],
          [ot[0][0], v + 0.06, ot[0][1]],
          [yt, 0],
          [vt, 0],
          [vt, 0.4],
          [yt, 0.4],
          al(0.5, 0.47, 0.42),
          at,
        ),
          $s(
            h,
            [ot[0][0], v + 0.06, ot[0][1]],
            [ut[0], v + 0.06, ut[1]],
            [ut[0], b + 0.12, ut[1]],
            [ot[0][0], b + 0.12, ot[0][1]],
            [yt, v],
            [vt, v],
            [vt, b],
            [yt, b],
            l0,
            at,
          ),
          $s(
            h,
            [ot[0][0], b + 0.12, ot[0][1]],
            [ut[0], b + 0.12, ut[1]],
            [it[0], b + 0.12, it[1]],
            [ot[1][0], b + 0.12, ot[1][1]],
            [ot[0][0], ot[0][1]],
            [ut[0], ut[1]],
            [it[0], it[1]],
            [ot[1][0], ot[1][1]],
            gr,
            [0, 1, 0],
          ),
          $s(
            h,
            [ot[1][0], b - 0.2, ot[1][1]],
            [it[0], b - 0.2, it[1]],
            [it[0], b + 0.12, it[1]],
            [ot[1][0], b + 0.12, ot[1][1]],
            [yt, b],
            [vt, b],
            [vt, b + 0.3],
            [yt, b + 0.3],
            gr,
            [it[0] - a, 0, it[1] - r],
          ));
      }
      ot = [ut, it];
    }
  }
  let Q = (ot, rt, lt, ht, pt, ut = 1, it = 0, at = 14) => {
      let yt = 2.3 * lt,
        vt = pt + 0.95 * lt,
        At = pt + ht - yt;
      (Ge(
        h,
        ot,
        rt,
        ut,
        it,
        1.42 * lt,
        1.42 * lt,
        pt,
        pt + 0.32 * lt,
        Fz,
        [1, 1, 1, 1, 1, 0],
      ),
        Af(
          h,
          ot,
          rt,
          [
            [1.3 * lt, pt + 0.32 * lt],
            [1.36 * lt, pt + 0.48 * lt],
            [1.12 * lt, pt + 0.68 * lt],
            [1.04 * lt, pt + 0.95 * lt],
          ],
          at,
          gr,
          { n: 2 },
        ),
        Af(
          h,
          ot,
          rt,
          [
            [lt, vt],
            [lt * 0.985, vt + 0.33 * (At - vt)],
            [lt * 0.93, vt + 0.66 * (At - vt)],
            [lt * 0.86, At - 0.18 * lt],
          ],
          at,
          Uxt,
        ),
        Af(
          h,
          ot,
          rt,
          [
            [lt * 0.86, At - 0.18 * lt],
            [lt * 0.96, At - 0.06 * lt],
            [lt * 0.88, At + 0.06 * lt],
          ],
          at,
          gr,
          { n: 2 },
        ),
        Af(
          h,
          ot,
          rt,
          [
            [lt * 0.88, At + 0.06 * lt],
            [lt * 1, At + 0.95 * lt],
            [lt * 1.3, At + 1.75 * lt],
            [lt * 1.42, At + 2 * lt],
          ],
          at,
          GY,
          0.42,
        ));
      let Ut = -it,
        Gt = ut;
      for (let [Pt, Vt] of [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ])
        Ge(
          h,
          ot + (ut * Pt + Ut * Vt) * 1.05 * lt,
          rt + (it * Pt + Gt * Vt) * 1.05 * lt,
          ut,
          it,
          0.32 * lt,
          0.32 * lt,
          At + 1.45 * lt,
          At + 2 * lt,
          GY,
          [1, 1, 1, 1, 0, 0],
        );
      Ge(
        h,
        ot,
        rt,
        ut,
        it,
        1.5 * lt,
        1.5 * lt,
        At + 2 * lt,
        pt + ht,
        Cr,
        [1, 1, 1, 1, 1, 1],
      );
    },
    et = (ot, rt) => [
      s + ot * Math.cos(Math.PI / 8 + (rt * Math.PI) / 4),
      i + ot * Math.sin(Math.PI / 8 + (rt * Math.PI) / 4),
    ],
    st = (ot, rt, lt, ht, pt, ut, it = [1, 1, 1, 1]) => {
      for (let at = 0; at < 8; at++) {
        let yt = et(lt, at),
          vt = et(lt, at + 1),
          At = et(rt, at),
          Ut = et(rt, at + 1),
          Gt = Math.hypot(vt[0] - yt[0], vt[1] - yt[1]),
          Pt = Math.hypot(Ut[0] - At[0], Ut[1] - At[1]),
          Vt = [(yt[0] + vt[0]) / 2 - s, 0, (yt[1] + vt[1]) / 2 - i],
          Kt = at * Gt;
        (it[0] &&
          $s(
            ot,
            [yt[0], ht, yt[1]],
            [vt[0], ht, vt[1]],
            [vt[0], pt, vt[1]],
            [yt[0], pt, yt[1]],
            [Kt, ht],
            [Kt + Gt, ht],
            [Kt + Gt, pt],
            [Kt, pt],
            ut,
            Vt,
          ),
          it[1] &&
            rt > 0 &&
            $s(
              ot,
              [At[0], ht, At[1]],
              [Ut[0], ht, Ut[1]],
              [Ut[0], pt, Ut[1]],
              [At[0], pt, At[1]],
              [at * Pt, ht],
              [(at + 1) * Pt, ht],
              [(at + 1) * Pt, pt],
              [at * Pt, pt],
              ut,
              Vt.map((ue) => -ue),
            ),
          it[2] &&
            $s(
              ot,
              [yt[0], pt, yt[1]],
              [vt[0], pt, vt[1]],
              [Ut[0], pt, Ut[1]],
              [At[0], pt, At[1]],
              [yt[0], yt[1]],
              [vt[0], vt[1]],
              [Ut[0], Ut[1]],
              [At[0], At[1]],
              ut,
              [0, 1, 0],
            ),
          it[3] &&
            $s(
              ot,
              [yt[0], ht, yt[1]],
              [vt[0], ht, vt[1]],
              [Ut[0], ht, Ut[1]],
              [At[0], ht, At[1]],
              [yt[0], yt[1]],
              [vt[0], vt[1]],
              [Ut[0], Ut[1]],
              [At[0], At[1]],
              ut,
              [0, -1, 0],
            ));
      }
    };
  (st(h, 0, w + 6.5, _ - 3, _ + 0.5, l0, [1, 0, 1, 0]),
    st(h, 0, w + 5.6, _ + 0.5, _ + 1, l0, [1, 0, 1, 0]),
    st(h, 0, w + 4.8, _ + 1, _ + 1.5, gr, [1, 0, 0, 0]),
    st(h, 0, w + 4.8, z - 0.02, z, [0.8, 0.76, 0.7, yi.granite], [0, 0, 1, 0]));
  for (let ot = 0; ot < 8; ot++) {
    let rt = et(w, ot),
      lt = Math.PI / 8 + (ot * Math.PI) / 4,
      ht = Math.cos(lt),
      pt = Math.sin(lt);
    (Ge(h, rt[0], rt[1], ht, pt, 1.5, 1.5, z + A, E, l0, [1, 1, 1, 1, 0, 0]),
      Ge(h, rt[0], rt[1], ht, pt, 3.1, 3.1, z, z + 0.45, Fz),
      Ge(
        h,
        rt[0],
        rt[1],
        ht,
        pt,
        2.9,
        2.9,
        z + 0.45,
        z + A - 0.35,
        Fz,
        [1, 1, 1, 1, 0, 0],
      ),
      Ge(
        h,
        rt[0],
        rt[1],
        ht,
        pt,
        3.15,
        3.15,
        z + A - 0.35,
        z + A,
        Cr,
        [1, 1, 1, 1, 1, 1],
      ));
    for (let [it, at] of [
      [1.9, 1.9],
      [1.9, -1.9],
      [-1.9, 1.9],
      [-1.9, -1.9],
    ])
      Q(
        rt[0] + ht * it - pt * at,
        rt[1] + pt * it + ht * at,
        0.78,
        E - (z + A),
        z + A,
        ht,
        pt,
      );
    let ut = et(w - 4.2, ot);
    (Ge(h, ut[0], ut[1], ht, pt, 1.15, 1.15, z, z + 1.2, Fz),
      Q(ut[0], ut[1], 0.7, E - (z + 1.2), z + 1.2, ht, pt),
      o.colliders.push(
        { t: "circ", x: rt[0], z: rt[1], r: 4.2 },
        { t: "circ", x: ut[0], z: ut[1], r: 1.1 },
      ));
  }
  (st(h, w - 3.4, w + 2.45, E, E + 0.55, Cr, [1, 1, 0, 1]),
    st(h, w - 3.4, w + 2.6, E + 0.55, E + 1.1, gr, [1, 1, 1, 0]),
    st(h, w - 3.4, w + 2.75, E + 1.1, E + 1.65, Cr, [1, 1, 1, 0]),
    st(h, w - 3.4, w + 2.6, E + 1.65, E + 3.25, gr, [1, 1, 0, 1]),
    st(h, w - 3.4, w + 2.95, E + 3.25, E + 3.7, $w, [1, 1, 0, 1]),
    st(h, w - 3.6, w + 3.7, E + 3.7, E + 4.25, Cr, [1, 1, 0, 1]),
    st(h, w - 3.5, w + 3.45, E + 4.25, E + 4.6, gr, [1, 1, 1, 0]),
    st(h, w - 2.6, w + 2.4, E + 4.6, R, l0, [1, 1, 1, 0]));
  {
    let ot = w - 5,
      rt = w - 3.4;
    for (let lt = 0; lt < 8; lt++) {
      let ht = et(ot, lt),
        pt = et(ot, lt + 1),
        ut = et(rt, lt),
        it = et(rt, lt + 1),
        at = Math.hypot(pt[0] - ht[0], pt[1] - ht[1]),
        yt = at / 2 - 1,
        vt = 14,
        At = (ue) =>
          E + 0.3 + Math.sqrt(Math.max(0, yt * yt - (ue - at / 2) ** 2)),
        Ut = (ue, ne, jt) => [
          ue[0] + (ne[0] - ue[0]) * jt,
          ue[1] + (ne[1] - ue[1]) * jt,
        ],
        Gt = [s - (ht[0] + pt[0]) / 2, 0, i - (ht[1] + pt[1]) / 2],
        Pt = (pt[0] - ht[0]) / at,
        Vt = (pt[1] - ht[1]) / at,
        Kt = null;
      for (let ue = 0; ue <= vt; ue++) {
        let ne = 1 + ((at - 2) * ue) / vt,
          jt = ne / at,
          be = Ut(ht, pt, jt),
          re = Ut(ut, it, jt),
          ds = At(ne);
        if (Kt) {
          $s(
            h,
            [Kt.P[0], Kt.y, Kt.P[1]],
            [be[0], ds, be[1]],
            [be[0], R, be[1]],
            [Kt.P[0], R, Kt.P[1]],
            [Kt.s, Kt.y],
            [ne, ds],
            [ne, R],
            [Kt.s, R],
            gr,
            Gt,
          );
          let Nt = (Kt.s + ne) / 2 - at / 2,
            $e = -Math.sqrt(Math.max(1e-4, yt * yt - Nt * Nt)) / yt,
            ve = -Nt / yt;
          $s(
            h,
            [Kt.P[0], Kt.y, Kt.P[1]],
            [be[0], ds, be[1]],
            [re[0], ds, re[1]],
            [Kt.Po[0], Kt.y, Kt.Po[1]],
            [Kt.s, 0],
            [ne, 0],
            [ne, 1.6],
            [Kt.s, 1.6],
            l0,
            [Pt * ve, $e, Vt * ve],
          );
        }
        Kt = { P: be, Po: re, y: ds, s: ne };
      }
      for (let [ue, ne, jt] of [
        [ht, 0, 1],
        [Ut(ht, pt, (at - 1) / at), at - 1, at],
      ]) {
        let be = [ue[0] + Pt * (jt - ne), ue[1] + Vt * (jt - ne)];
        $s(
          h,
          [ue[0], E, ue[1]],
          [be[0], E, be[1]],
          [be[0], R, be[1]],
          [ue[0], R, ue[1]],
          [ne, E],
          [jt, E],
          [jt, R],
          [ne, R],
          gr,
          Gt,
        );
      }
    }
  }
  for (let ot = 0; ot < 8; ot++) {
    let rt = et(w - 0.95, ot),
      lt = et(w - 0.95, ot + 1),
      ht = [(rt[0] + lt[0]) / 2 - s, 0, (rt[1] + lt[1]) / 2 - i],
      pt = [rt[0] + (lt[0] - rt[0]) * 0.12, rt[1] + (lt[1] - rt[1]) * 0.12],
      ut = [rt[0] + (lt[0] - rt[0]) * 0.88, rt[1] + (lt[1] - rt[1]) * 0.88];
    $s(
      f,
      [pt[0], R + 0.5, pt[1]],
      [ut[0], R + 0.5, ut[1]],
      [ut[0], P - 0.6, ut[1]],
      [pt[0], P - 0.6, pt[1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0.95, 0.85, 0.75, 0.75],
      ht,
    );
    let it = et(w - 0.85, ot),
      at = Math.PI / 8 + (ot * Math.PI) / 4;
    Ge(
      h,
      it[0],
      it[1],
      Math.cos(at),
      Math.sin(at),
      0.5,
      1.3,
      R,
      P,
      Cr,
      [1, 1, 1, 1, 0, 0],
    );
  }
  (st(h, w - 5, w - 1.05, R, P, gr, [1, 1, 0, 1]),
    st(h, w - 5, w - 0.95, R, R + 0.5, Cr, [1, 0, 0, 0]),
    st(h, w - 5.2, w - 0.75, P - 0.6, P - 0.15, $w, [1, 0, 0, 1]),
    st(h, w - 5.2, w - 0.45, P - 0.15, P + 0.45, Cr, [1, 1, 1, 1]),
    st(h, w - 5, w - 1.4, P + 0.45, I, l0, [1, 1, 1, 0]));
  for (let ot = 0; ot < 8; ot++) {
    let rt = et(w + 0.6, ot),
      lt = Math.PI / 8 + (ot * Math.PI) / 4,
      ht = Math.cos(lt),
      pt = Math.sin(lt);
    (Ge(h, rt[0], rt[1], ht, pt, 1.5, 1.5, R, R + 1.2, l0),
      Ge(h, rt[0], rt[1], ht, pt, 1.25, 1.25, R + 1.2, R + 1.5, Cr),
      Af(
        h,
        rt[0],
        rt[1],
        [
          [0.75, R + 1.5],
          [0.55, R + 1.75],
          [0.5, R + 2],
          [1.05, R + 2.7],
          [1.18, R + 3.4],
          [1, R + 4.1],
          [0.62, R + 4.5],
          [0.7, R + 4.75],
          [0.25, R + 5.1],
          [0.05, R + 5.4],
        ],
        14,
        Cr,
        { n: 4 },
      ));
  }
  {
    let ot = [],
      rt = [];
    for (let ht = 0; ht <= 12; ht++) {
      let pt = ((ht / 12) * Math.PI) / 2;
      ot.push([C * Math.cos(pt) + 0.01, I + C * 0.92 * Math.sin(pt)]);
    }
    for (let ht = 0; ht <= 14; ht++) {
      let pt = (((ht / 14) * Math.PI) / 2) * 0.97;
      rt.unshift([
        (C - 0.8) * Math.cos(pt) + 0.01,
        I - 0.2 + (C - 0.8) * 0.9 * Math.sin(pt),
      ]);
    }
    (Af(h, s, i, ot, 48, Vxt, 1),
      Af(h, s, i, rt, 48, qxt, { n: 16 }, (ht) => ((14 - ht) / 14) * 7),
      Af(
        h,
        s,
        i,
        [
          [0.01, I - 0.2 + (C - 0.8) * 0.9 + 0.05],
          [
            (C - 0.8) * Math.cos((Math.PI / 2) * 0.97) + 0.05,
            I - 0.2 + (C - 0.8) * 0.9 * Math.sin((Math.PI / 2) * 0.97) - 0.02,
          ],
        ],
        16,
        al(1.1, 0.95, 0.75, Pf.capital),
        0.6,
      ));
    for (let ht = 0; ht < 16; ht++) {
      let pt = (ht * Math.PI) / 8,
        ut = null;
      for (let it = 0; it <= 10; it++) {
        let at = (((it / 10) * Math.PI) / 2) * 0.94,
          yt = [
            s + Math.cos(pt) * (C + 0.15) * Math.cos(at),
            I + (C * 0.92 + 0.15) * Math.sin(at),
            i + Math.sin(pt) * (C + 0.15) * Math.cos(at),
          ];
        (ut && ci(h, ut, yt, 0.55, 0.38, Wxt), (ut = yt));
      }
    }
    (Af(
      h,
      s,
      i,
      [
        [C + 1.1, I - 0.02],
        [C + 1.1, I + 0.5],
        [C + 0.6, I + 0.55],
        [C + 0.6, I + 1],
        [C + 0.1, I + 1.05],
      ],
      32,
      gr,
      { n: 32 },
    ),
      Af(
        h,
        s,
        i,
        [
          [2.4, X - 0.4],
          [2.4, X + 0.3],
          [2.1, X + 0.4],
          [2.1, X + 1.7],
          [2.7, X + 1.85],
          [2.6, X + 2.1],
          [1.3, X + 2.6],
          [0.4, X + 3.4],
          [0.12, X + 4.4],
          [0.02, X + 4.6],
        ],
        16,
        Cr,
        { n: 8 },
      ));
  }
  for (let ot = 0; ot < B; ot++) {
    let rt = F + ((O - F) * ot) / B,
      lt = F + ((O - F) * (ot + 1)) / B,
      ht = (rt + lt) / 2,
      pt = H(ht, L),
      ut = L * (lt - rt),
      it = Math.cos(ht),
      at = -Math.sin(ht),
      yt = ot % 3 === 1,
      vt = (Pt, Vt, Kt, ue) => {
        let ne = H(rt, L - Pt),
          jt = H(lt, L - Pt),
          be = H(lt, L + Pt),
          re = H(rt, L + Pt);
        $s(
          h,
          [ne[0], Vt, ne[1]],
          [jt[0], Vt, jt[1]],
          [be[0], Vt, be[1]],
          [re[0], Vt, re[1]],
          [ne[0], ne[1]],
          [jt[0], jt[1]],
          [be[0], be[1]],
          [re[0], re[1]],
          Kt,
          [0, ue ? 1 : -1, 0],
        );
      },
      At = (Pt, Vt, Kt, ue) => {
        for (let ne of [-1, 1]) {
          let jt = H(rt, L + Pt * ne),
            be = H(lt, L + Pt * ne),
            re = Kt - Vt,
            ds = Math.hypot(be[0] - jt[0], be[1] - jt[1]);
          $s(
            h,
            [jt[0], Vt, jt[1]],
            [be[0], Vt, be[1]],
            [be[0], Kt, be[1]],
            [jt[0], Kt, jt[1]],
            [0, Vt],
            [ds, Vt],
            [ds, Vt + re],
            [0, Vt + re],
            ue,
            [Math.sin(ht) * ne, 0, Math.cos(ht) * ne],
          );
        }
      },
      Ut = Math.min(N(ht), D) - 2.5;
    (At(5.1, Ut, G - 0.9, l0),
      vt(5.1, G - 0.9, l0, !0),
      At(4.65, G - 0.9, G - 0.6, gr),
      vt(4.65, G - 0.6, gr, !0),
      At(4.2, G - 0.6, G - 0.3, l0),
      vt(4.2, G - 0.3, l0, !0),
      At(3.7, G - 0.3, G, gr),
      vt(3.7, G, gr, !0));
    let Gt = (Pt, Vt, Kt) => {
      let ue = (ds, Nt) => [
          pt[0] + it * (ut / 2 + 0.02) * ds + Math.sin(ht) * Pt * Nt,
          pt[1] + at * (ut / 2 + 0.02) * ds + Math.cos(ht) * Pt * Nt,
        ],
        ne = ue(-1, 1),
        jt = ue(1, 1),
        be = (ht - F) * L,
        re = [Math.sin(ht) * Pt, 0, Math.cos(ht) * Pt];
      $s(
        h,
        [ne[0], Vt, ne[1]],
        [jt[0], Vt, jt[1]],
        [jt[0], Kt, jt[1]],
        [ne[0], Kt, ne[1]],
        [be - ut / 2, 0],
        [be + ut / 2, 0],
        [be + ut / 2, 1],
        [be - ut / 2, 1],
        Gxt,
        re,
      );
    };
    (vt(3.6, W, gr, !1),
      Gt(-3.6, W + 0.25, W + 1.3),
      Gt(3.6, W + 0.25, W + 1.3),
      At(3.6, W, W + 0.25, Cr),
      At(3.3, W + 1.3, W + 2.4, l0),
      At(3.55, W + 2.4, W + 2.75, $w),
      vt(3.55, W + 2.4, $w, !1),
      At(4.1, W + 2.75, W + 3.1, Cr),
      vt(4.1, W + 3.1, Cr, !0),
      vt(4.1, W + 2.75, Cr, !1));
    for (let Pt of [-2.6, 2.6])
      for (let Vt of yt ? [-1.2, 1.2] : [0]) {
        let Kt = [
          pt[0] + it * Vt + Math.sin(ht) * Pt,
          pt[1] + at * Vt + Math.cos(ht) * Pt,
        ];
        (Q(Kt[0], Kt[1], 0.55, U, G, it, at, 12),
          o.colliders.push({ t: "circ", x: Kt[0], z: Kt[1], r: 0.75 }));
      }
    if (yt) {
      let Pt = W + 3.1,
        Vt = 4.6,
        Kt = 3.4,
        ue = 2.5;
      Ge(
        h,
        pt[0],
        pt[1],
        it,
        at,
        Kt + 0.3,
        ue + 0.3,
        Pt,
        Pt + 0.35,
        Cr,
        [1, 1, 1, 1, 1, 0],
      );
      let ne = (jt, be) => [
        pt[0] + it * Kt * jt + Math.sin(ht) * ue * be,
        pt[1] + at * Kt * jt + Math.cos(ht) * ue * be,
      ];
      for (let [jt, be] of [
        [ne(-1, -1), ne(1, -1)],
        [ne(1, 1), ne(-1, 1)],
        [ne(1, -1), ne(1, 1)],
        [ne(-1, 1), ne(-1, -1)],
      ]) {
        let re = [-(be[1] - jt[1]), 0, be[0] - jt[0]],
          ds = [(jt[0] + be[0]) / 2 - pt[0], 0, (jt[1] + be[1]) / 2 - pt[1]];
        $s(
          f,
          [jt[0], Pt + 0.35, jt[1]],
          [be[0], Pt + 0.35, be[1]],
          [be[0], Pt + Vt, be[1]],
          [jt[0], Pt + Vt, jt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [1, 0.92, 0.84, 0.75],
          re[0] * ds[0] + re[2] * ds[2] > 0 ? re : re.map((Nt) => -Nt),
        );
      }
      (Ge(
        h,
        pt[0],
        pt[1],
        it,
        at,
        Kt + 0.22,
        ue + 0.22,
        Pt + Vt - 0.05,
        Pt + Vt + 0.3,
        $w,
        [1, 1, 1, 1, 0, 1],
      ),
        Ge(
          h,
          pt[0],
          pt[1],
          it,
          at,
          Kt + 0.4,
          ue + 0.4,
          Pt + Vt + 0.3,
          Pt + Vt + 0.65,
          Cr,
          [1, 1, 1, 1, 1, 1],
        ));
      for (let jt = 0; jt < 5; jt++)
        nr(
          p,
          [pt[0] + (m() - 0.5) * 4.5, Pt + Vt + 0.45, pt[1] + (m() - 0.5) * 3],
          m() * 3,
          1.9,
          1.4,
          ir(3),
          [0.75, 0.9, 0.7, 1],
        );
    }
  }
  for (let ot of [F, O]) {
    let rt = H(ot, L),
      lt = Math.cos(ot),
      ht = -Math.sin(ot);
    Ge(h, rt[0], rt[1], lt, ht, 1, 4, G, W + 3.2, l0, [1, 1, 1, 1, 1, 0]);
  }
  {
    for (let pt = 0; pt < 30; pt++) {
      let ut = -1.05 + (2.1 * pt) / 30,
        it = -1.05 + ((1.05 - -1.05) * (pt + 1)) / 30,
        at = H(ut, V),
        yt = H(it, V),
        vt = H(ut, $),
        At = H(it, $),
        Ut = Math.min(Ei(...at), Ei(...vt)) - 1,
        Gt = D + 21,
        Pt = (ut - -1.05) * V,
        Vt = (it - -1.05) * V,
        Kt = (ut - -1.05) * $,
        ue = (it - -1.05) * $;
      ($s(
        h,
        [at[0], Ut, at[1]],
        [yt[0], Ut, yt[1]],
        [yt[0], Gt, yt[1]],
        [at[0], Gt, at[1]],
        [Pt, Ut],
        [Vt, Ut],
        [Vt, Gt],
        [Pt, Gt],
        VL,
        [s - at[0], 0, n - at[1]],
      ),
        $s(
          h,
          [vt[0], Ut, vt[1]],
          [At[0], Ut, At[1]],
          [At[0], Gt, At[1]],
          [vt[0], Gt, vt[1]],
          [Kt, Ut],
          [ue, Ut],
          [ue, Gt],
          [Kt, Gt],
          VL,
          [vt[0] - s, 0, vt[1] - n],
        ));
      let ne = H(ut, V - 0.6),
        jt = H(it, V - 0.6);
      ($s(
        h,
        [ne[0], Gt - 1.2, ne[1]],
        [jt[0], Gt - 1.2, jt[1]],
        [jt[0], Gt, jt[1]],
        [ne[0], Gt, ne[1]],
        [Pt, Gt - 1.2],
        [Vt, Gt - 1.2],
        [Vt, Gt],
        [Pt, Gt],
        gr,
        [s - at[0], 0, n - at[1]],
      ),
        $s(
          h,
          [ne[0], Gt - 1.2, ne[1]],
          [jt[0], Gt - 1.2, jt[1]],
          [yt[0], Gt - 1.2, yt[1]],
          [at[0], Gt - 1.2, at[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          l0,
          [0, -1, 0],
        ));
      let be = H(ut, (V + $) / 2),
        re = H(it, (V + $) / 2);
      if (
        ($s(
          d,
          [at[0], Gt, at[1]],
          [yt[0], Gt, yt[1]],
          [re[0], Gt + 5, re[1]],
          [be[0], Gt + 5, be[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.15, 0.15, 0.14, 0.75],
          [0, 1, 0],
        ),
        $s(
          d,
          [be[0], Gt + 5, be[1]],
          [re[0], Gt + 5, re[1]],
          [At[0], Gt, At[1]],
          [vt[0], Gt, vt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.15, 0.15, 0.14, 0.75],
          [0, 1, 0],
        ),
        pt % 5 === 2)
      ) {
        let ds = H((ut + it) / 2, V - 0.1);
        Ge(
          d,
          ds[0],
          ds[1],
          Math.cos((ut + it) / 2),
          -Math.sin((ut + it) / 2),
          2.2,
          0.15,
          Ut + 1,
          D + 7,
          [0.06, 0.06, 0.07, 0.3],
          [0, 0, 1, 1, 0, 0],
        );
      }
    }
    for (let pt of [-1.05, 1.05]) {
      let ut = H(pt, V),
        it = H(pt, $),
        at = Math.min(Ei(...ut), Ei(...it)) - 1,
        yt = D + 21,
        vt = H(pt, (V + $) / 2);
      ($s(
        h,
        [ut[0], at, ut[1]],
        [it[0], at, it[1]],
        [it[0], yt, it[1]],
        [ut[0], yt, ut[1]],
        [0, at],
        [29, at],
        [29, yt],
        [0, yt],
        VL,
        [Math.cos(pt) * Math.sign(pt), 0, -Math.sin(pt) * Math.sign(pt)],
      ),
        $s(
          h,
          [ut[0], yt, ut[1]],
          [it[0], yt, it[1]],
          [vt[0], yt + 5, vt[1]],
          [vt[0], yt + 5, vt[1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          l0,
          [Math.cos(pt) * Math.sign(pt), 0, -Math.sin(pt) * Math.sign(pt)],
        ));
    }
    for (let pt = 0; pt <= 8; pt++) {
      let ut = -1.05 + (2.1 * pt) / 8,
        it = H(ut, (V + $) / 2);
      o.colliders.push({ t: "circ", x: it[0], z: it[1], r: 15 });
    }
  }
  for (let [ot, { a: rt, v0: lt }] of tt) {
    let ht = ot.c.a;
    for (let pt = 0; pt < rt.length; pt++) {
      let ut = 0.62 + 0.38 * rt[pt];
      ((ht[(lt + pt) * 4] *= ut),
        (ht[(lt + pt) * 4 + 1] *= ut),
        (ht[(lt + pt) * 4 + 2] *= ut));
    }
    ot.sky = null;
  }
  for (let ot of q) {
    let rt = S(ot.x, ot.z) - 0.02;
    (o.inst.push(
      ot.euc
        ? {
            kind: "tree",
            sp: "euc",
            x: ot.x,
            y: rt,
            z: ot.z,
            rot: ot.rot,
            scale: 0.95 + 0.4 * ot.s,
          }
        : {
            kind: "tree",
            sp: "cypress",
            x: ot.x,
            y: rt,
            z: ot.z,
            rot: ot.rot,
            scale: 0.85 + 0.3 * ot.s,
          },
    ),
      o.colliders.push({ t: "circ", x: ot.x, z: ot.z, r: 0.6 }));
  }
  for (let ot = 0; ot < 14; ot++) {
    let rt = (ot / 14) * Math.PI * 2 + 0.2,
      lt = M(rt, -5.2),
      ht = a + Math.cos(rt) * lt,
      pt = r + Math.sin(rt) * lt;
    y(ht, pt) &&
      (o.inst.push({
        kind: "lamp",
        x: ht,
        y: S(ht, pt),
        z: pt,
        rot: Math.atan2(s - ht, r - pt),
      }),
      o.colliders.push({ t: "circ", x: ht, z: pt, r: 0.18 }));
  }
}
