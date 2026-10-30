// app 184 — math
// Lines 105838-106542 of readable/app.pretty.js (statement-aligned).
function nL(o, t, e, s, n = null, i = !1) {
  if (o.hide) return;
  if (pc && !i) {
    let L = eK(pc, o);
    if (L) {
      let F = t,
        O = new Map();
      t = (B) => {
        let H = O.get(B);
        return (H || O.set(B, (H = nK(F(B), o, L))), H);
      };
    }
  }
  let a = QX(o, s),
    { st: r } = a,
    l = (o.tcut ? Math.min(o.top - o.rh, o.tcut) : o.top - o.rh) + sK(o),
    c = Math.max(
      o.minh > 0 ? o.minh : o.st === 7 ? -2.5 : o.base - 0.3,
      o.cut || -1e9,
    ),
    h = o.seed,
    f = o.cut > 0,
    u = f ? null : a.shopCells,
    d = o.base - 0.3,
    p = 0.94 + 0.12 * Bn(h, 4),
    m = Ku[h]?.hue ||
      tK(o, h) || [
        1 + 0.07 * (Bn(h, 21) - 0.5),
        1 + 0.05 * (Bn(h, 22) - 0.5),
        1 + 0.07 * (Bn(h, 23) - 0.5),
      ],
    g = uz[r] ? uz[r][a.r < 0.5 ? 0 : 1] : "w_stucco",
    b = [
      ...a.wall.map(
        (L) => 0.72 * (0.6 + (0.4 * L) / Math.max(...a.wall, 0.01)),
      ),
      0,
    ];
  if (a.cool) for (let L = 0; L < 3; L++) b[L] *= [0.9, 0.96, 1.1][L];
  let v = a.cell && a.group,
    x = s?.fronts ? 2 * (Object.keys(s.fronts).indexOf(a.group) + 1) : 0,
    y = s?.fronts ? 2 * (Object.keys(s.fronts).indexOf("shop") + 1) : 0,
    M = r >= 2 && !o.rs,
    w = l - (M ? 0.55 : 0.15),
    _ = [
      ...(a.glass ? a.wall : a.wall.map((L) => 0.85 + 0.3 * L)),
      (a.office + 0.5) / 32,
    ],
    z = (L, F, O, B, H = 0.5) => {
      let N = Math.hypot(O - L, B - F) || 1;
      return Math.min(
        l - 3,
        Math.max(
          d,
          e.driveHeight(
            L + (O - L) * H - ((B - F) / N) * 1.6,
            F + (B - F) * H + ((O - L) / N) * 1.6,
          ),
        ),
      );
    },
    A = pc ? ngt(pc, o) : null,
    T = (L, F, O, B) => {
      let H = Math.hypot(O - L, B - F) || 1,
        N = (O - L) / H,
        D = (B - F) / H;
      return (U) => e.driveHeight(L + N * U - D * 1.6, F + D * U + N * 1.6);
    },
    E = 0,
    R = (L, F, O, B, H, N = 4.8) => {
      let D = u,
        U = Math.hypot(O - L, B - F),
        G = Math.max(1, Math.ceil(U / 8.4 - 0.05)),
        W = -(B - F) / U,
        V = (O - L) / U,
        $ = -1;
      if (!(H + N <= c + 0.05)) {
        if (U < 3.5) {
          t(uz[r] ? uz[r][a.r < 0.5 ? 0 : 1] : "w_stucco").wall(
            L,
            F,
            O,
            B,
            c,
            c,
            H + 4.8,
            H + 4.8,
            [
              ...a.wall.map(
                (J) => 0.72 * (0.6 + (0.4 * J) / Math.max(...a.wall, 0.01)),
              ),
              0,
            ],
            0,
            o.base,
          );
          return;
        }
        for (let J = 0; J < G; J++) {
          let X = Math.floor(Bn(h, 50 + E++) * D.length) % D.length;
          (X === $ && (X = (X + 1) % D.length), ($ = X));
          let tt = D[X],
            Z = J / G,
            q = (J + 1) / G,
            j = L + (O - L) * Z,
            K = F + (B - F) * Z,
            nt = L + (O - L) * q,
            Q = F + (B - F) * q,
            et = (h % 37) * 5 + E * 2,
            st = [p, p, p, (tt.cell + 32.5) / 64 + y],
            ot = (c - H) / N;
          (t("f_shop").quad(
            [j, c, K],
            [nt, c, Q],
            [nt, H + N, Q],
            [j, H + N, K],
            [et, ot],
            [et + 0.9999, ot],
            [et + 0.9999, 1],
            [et, 1],
            st,
            [W, 0, V],
          ),
            n &&
              (N > 4.6 &&
                zX(
                  n,
                  j,
                  K,
                  nt,
                  Q,
                  H,
                  tt,
                  h * 31 + E,
                  J === 0,
                  T(j, K, nt, Q),
                  A,
                ),
              JC(
                n,
                e,
                j,
                K,
                nt,
                Q,
                h * 31 + E,
                Math.max(0.7, YC(e, j, K, nt, Q)),
              )));
        }
      }
    },
    P = r === 6 && !a.shopCells && !o.minh && !f ? 1 : 0,
    C = [...a.wall, ((KX[r] ?? 1) + 0.5) / 16];
  if (
    (o.rings.forEach((L, F) => {
      let O = L.length / 2,
        B = o.fronts[F],
        H = (Z) =>
          Math.hypot(
            L[((Z + 1) % O) * 2] - L[Z * 2],
            L[((Z + 1) % O) * 2 + 1] - L[Z * 2 + 1],
          ),
        N = (Z) => v && r !== 6 && (B[Z] === 1 || (B[Z] === 2 && TX.has(r))),
        D = new Uint8Array(O);
      if (v && r !== 6)
        for (let Z = 0; Z < O; Z++) {
          if (N(Z) || H(Z) >= 1.5) continue;
          let q = (Z + O - 1) % O,
            j = (Z + 1) % O,
            K = 0;
          for (; K++ < O && !N(q) && H(q) < 1.5;) q = (q + O - 1) % O;
          for (; K++ < 2 * O && !N(j) && H(j) < 1.5;) j = (j + 1) % O;
          N(q) && N(j) && (D[Z] = 1);
        }
      let U = (Z) => N(Z) || D[Z] === 1,
        G = jX(L),
        W = ZC(o.rings, F),
        V = ZC(o.rings, F, !0);
      for (let Z = 0; Z < W.length; Z++) V[Z] < 0.6 && (W[Z] = 0);
      let $ = (Z) => v && (Z === 1 || (Z === 2 && TX.has(r))),
        J = new Uint8Array(O),
        X = -1;
      for (let Z = 0; Z < O; Z++)
        if (U(Z) && !U((Z + O - 1) % O)) {
          X = Z;
          break;
        }
      if (X < 0) {
        X = 0;
        for (let Z = 0; Z < O; Z++)
          if (N(Z) && !N((Z + O - 1) % O)) {
            X = Z;
            break;
          }
        for (let Z = 0; Z < O && D[(X + O - 1) % O]; Z++) X = (X + O - 1) % O;
      }
      let tt = Bn(h, 5) * 30;
      for (let Z = 0, q = X; Z < O; Z++, q = (q + 1) % O) {
        if (J[q]) continue;
        if (r === 6) {
          let xe = L[q * 2],
            He = L[q * 2 + 1],
            ms = L[((q + 1) % O) * 2],
            bt = L[((q + 1) % O) * 2 + 1];
          if (u && B[q] === 1 && H(q) > 3 && F === 0) {
            let te = z(xe, He, ms, bt);
            R(xe, He, ms, bt, te);
            let ee = Math.max(c, te + 4.8);
            t("office").wall(xe, He, ms, bt, ee, ee, l, l, _, tt, o.base);
          } else t("office").wall(xe, He, ms, bt, c, c, l, l, _, tt, o.base);
          ((tt += H(q)), (J[q] = 1));
          continue;
        }
        if (!U(q)) {
          let xe = L[q * 2],
            He = L[q * 2 + 1],
            ms = L[((q + 1) % O) * 2],
            bt = L[((q + 1) % O) * 2 + 1],
            te =
              r === 8 && u && B[q] === 1 && H(q) > 3 && F === 0
                ? (() => {
                    let ee = H(q) || 1;
                    return e.driveHeight(
                      (xe + ms) / 2 - ((bt - He) / ee) * 1.6,
                      (He + bt) / 2 + ((ms - xe) / ee) * 1.6,
                    );
                  })()
                : null;
          if (te !== null && te < l - 3.3 && te > o.base - 1.2) {
            let ee = z(xe, He, ms, bt);
            (R(xe, He, ms, bt, ee, Math.min(4.8, l - ee)),
              l > ee + 4.85 &&
                t(g).wall(
                  xe,
                  He,
                  ms,
                  bt,
                  ee + 4.8,
                  ee + 4.8,
                  l,
                  l,
                  b,
                  tt,
                  o.base,
                ));
          } else
            B[q] && !$(B[q])
              ? t("facade").wall(xe, He, ms, bt, c, c, l, l, C, tt, o.base)
              : t(g).wall(xe, He, ms, bt, c, c, l, l, b, tt, o.base);
          ((tt += H(q)), (J[q] = 1));
          continue;
        }
        let j = [],
          K = 0;
        for (
          let xe = q, He = 0;
          He < O && U(xe) && !J[xe];
          He++, xe = (xe + 1) % O
        )
          (j.push(xe), (K += H(xe)), (J[xe] = 1));
        let nt = a.cell,
          Q = nt.w,
          et = Math.max(1, Math.round(K / Q + 0.2));
        if (K < Q * 0.45) {
          for (let xe of j) {
            let He = L[xe * 2],
              ms = L[xe * 2 + 1],
              bt = L[((xe + 1) % O) * 2],
              te = L[((xe + 1) % O) * 2 + 1];
            (t(g).wall(He, ms, bt, te, c, c, l, l, b, tt, o.base),
              (tt += H(xe)));
          }
          continue;
        }
        let st = 0,
          ot = j[0],
          rt = 0.5;
        for (let xe of j) {
          let He = H(xe);
          if (st + He >= K / 2) {
            ((ot = xe), (rt = (K / 2 - st) / He));
            break;
          }
          st += He;
        }
        let lt = L[ot * 2],
          ht = L[ot * 2 + 1],
          pt = L[((ot + 1) % O) * 2],
          ut = L[((ot + 1) % O) * 2 + 1],
          it = Math.hypot(pt - lt, ut - ht) || 1,
          at = lt + (pt - lt) * rt + (-(ut - ht) / it) * 1.6,
          yt = ht + (ut - ht) * rt + ((pt - lt) / it) * 1.6,
          vt = Math.min(l - 3, Math.max(d, e.driveHeight(at, yt))),
          At = l - vt,
          Ut = At / nt.h,
          Gt = (xe, He = a.cell) => {
            let ms = l - xe,
              bt = ms / He.h;
            if (bt <= 1.12) {
              let Oe = bt < 0.75 ? Math.min(1, ms / (He.h * 0.92)) : 1;
              return [[c, l, ((c - xe) / ms) * Oe, Oe]];
            }
            let [te, ee] = He.band || j2t[He.style] || [0.34, 0.66],
              Yt = Math.max(1, Math.round((bt - 1) / (ee - te))),
              ce = ms / (1 + Yt * (ee - te)),
              Xe = [[c, xe + ee * ce, (c - xe) / ce, ee]];
            for (let Oe = 0; Oe < Yt; Oe++) {
              let Ke = xe + (ee + Oe * (ee - te)) * ce;
              Xe.push([Ke, Ke + (ee - te) * ce, te, ee]);
            }
            return (
              Xe.push([xe + (ee + Yt * (ee - te)) * ce, l, ee, 1]),
              Xe.filter((Oe) => Oe[1] > c + 0.01).map((Oe) =>
                Oe[0] < c
                  ? [
                      c,
                      Oe[1],
                      Oe[2] + ((Oe[3] - Oe[2]) * (c - Oe[0])) / (Oe[1] - Oe[0]),
                      Oe[3],
                    ]
                  : Oe,
              )
            );
          },
          Pt = Gt(vt);
        if (!Pt.length) {
          for (let xe of j) tt += H(xe);
          continue;
        }
        let Vt = (h % 61) * 3 + F * 7,
          Kt = Vt,
          ue = [p * m[0], p * m[1], p * m[2], (nt.cell + 0.5) / 64 + x],
          ne = a.mirror ? (xe) => 2 * Vt + et - 1e-4 - xe : (xe) => xe,
          jt = j.every((xe) => B[xe] !== 1 && !D[xe]) && At > 7,
          be = (Pt[0][1] - vt) / Math.max(0.05, Pt[0][3]),
          re = u && At > 9 && !jt ? vt + 4.8 : jt ? vt + 0.32 * be : -1e9,
          ds = Pt.filter((xe) => xe[1] > re + 0.01).map(([xe, He, ms, bt]) =>
            xe < re
              ? [re, He, ms + ((bt - ms) * (re - xe)) / (He - xe), bt]
              : [xe, He, ms, bt],
          ),
          Nt = egt(a, s, et, Vt, h + F * 7919 + j[0] * 131, o, ue, jt),
          $e = new Int16Array(et);
        Nt.forEach((xe, He) => {
          for (let ms = xe.u0 - Vt; ms < xe.u0 - Vt + xe.n; ms++) $e[ms] = He;
        });
        let ve = null;
        if ((r === 0 || r === 1) && re < -1e8 && et > 1) {
          ve = new Float64Array(et).fill(NaN);
          let xe = Vt;
          for (let bt of j) {
            let te = H(bt),
              ee = (te * et) / K,
              Yt = L[bt * 2],
              ce = L[bt * 2 + 1],
              Xe = L[((bt + 1) % O) * 2],
              Oe = L[((bt + 1) % O) * 2 + 1];
            for (let Ke = 0; Ke < et; Ke++) {
              let qs = Vt + Ke + 0.5;
              qs >= xe &&
                qs < xe + ee &&
                (ve[Ke] = z(Yt, ce, Xe, Oe, (qs - xe) / ee));
            }
            xe += ee;
          }
          let He = 1e9,
            ms = -1e9;
          for (let bt = 0; bt < et; bt++)
            (ve[bt] !== ve[bt] && (ve[bt] = vt),
              (He = Math.min(He, ve[bt])),
              (ms = Math.max(ms, ve[bt])));
          ms - He < 0.35 && (ve = null);
        }
        let as = (xe) =>
          xe
            .filter((He) => He[1] > re + 0.01)
            .map(([He, ms, bt, te]) =>
              He < re
                ? [re, ms, bt + ((te - bt) * (re - He)) / (ms - He), te]
                : [He, ms, bt, te],
            );
        for (let xe of Nt)
          ((xe.cut = xe.cell === nt ? ds : as(Gt(vt, xe.cell))),
            (xe.full = xe.cell === nt ? Pt : Gt(vt, xe.cell)),
            ve && (xe.secsM = Array.from(ve, (He) => Gt(He, xe.cell))));
        let Se = j[j.length - 1],
          Fe = Bn(h, 92);
        for (let xe of j) {
          let He = L[xe * 2],
            ms = L[xe * 2 + 1],
            bt = L[((xe + 1) % O) * 2],
            te = L[((xe + 1) % O) * 2 + 1],
            ee = H(xe),
            Yt = (ee * et) / K,
            ce = Math.min(Kt + Yt, Vt + et - 1e-4),
            Xe = [-(te - ms) / ee, 0, (bt - He) / ee],
            Oe = !ve && re > -1e8 && !jt && !(ee > 1.5 && B[xe] === 1),
            Ke =
              (ve
                ? r === 0 || r === 1
                : r === 0 || r === 1 || r === 3 || r === 4) && ee > 1.5,
            qs = Kt;
          for (; qs < ce - 1e-6;) {
            let Rs = Math.min(et - 1, Math.floor(qs - Vt + 1e-6)),
              Ps = $e[Rs],
              Qs = Nt[Ps],
              xs = Math.min(ce, ve ? Vt + Rs + 1 : Qs.u0 + Qs.n),
              an = (qs - Kt) / Yt,
              De = (xs - Kt) / Yt,
              Ds = He + (bt - He) * an,
              hs = ms + (te - ms) * an,
              nn = He + (bt - He) * De,
              dn = ms + (te - ms) * De,
              Wn = ve ? Qs.secsM[Rs] : Oe ? Qs.full : Qs.cut,
              Xn = Qs.U;
            for (let [Mt, Xt, xt, wt] of Wn)
              t("f_" + a.group).quad(
                [Ds, Mt, hs],
                [nn, Mt, dn],
                [nn, Xt, dn],
                [Ds, Xt, hs],
                [Xn(qs), xt],
                [Xn(xs), xt],
                [Xn(xs), wt],
                [Xn(qs), wt],
                Qs.fcol,
                Xe,
              );
            let ni = an < 1e-6 ? G.out[xe][0] : 0,
              An = De > 1 - 1e-6 ? G.out[xe][1] : 0,
              ii =
                A &&
                [0.15, 0.5, 0.85].some((Mt) =>
                  [0.45, 1.15].some((Xt) =>
                    [l - 0.1, l - 0.45].some((xt) =>
                      A(
                        Ds + (nn - Ds) * Mt + Xe[0] * Xt,
                        hs + (dn - hs) * Mt + Xe[2] * Xt,
                        xt,
                      ),
                    ),
                  ),
                );
            if (Ke && (De - an) * ee > 0.15 && !ii) {
              let Mt = wX(Qs.cell, Wn, l),
                Xt = [0.8, 0.79, 0.74, 8.5 / 16],
                xt = !yX(Qs.cell, Wn, l - 0.9, l + 0.4),
                wt = (mt) => W[xe] > 2 * mt + 0.05,
                _t = (De - an) * ee,
                ae = (nn - Ds) / Math.max(1e-6, _t),
                se = (dn - hs) / Math.max(1e-6, _t),
                Jt = (mt, ie, Dt) =>
                  A &&
                  [0.06, 0.5 * Dt].some((Ht) =>
                    [l - 0.1, l - 0.45].some((ft) =>
                      A(mt + Xe[0] * Ht, ie + Xe[2] * Ht, ft),
                    ),
                  ),
                _e = (mt) => {
                  let ie =
                      an < 1e-6 && Jt(Ds - ae * 0.25, hs - se * 0.25, mt)
                        ? mt + 0.05
                        : 0,
                    Dt =
                      De > 1 - 1e-6 && Jt(nn + ae * 0.25, dn + se * 0.25, mt)
                        ? mt + 0.05
                        : 0;
                  return _t - ie - Dt > 0.3
                    ? [
                        Ds + ae * ie,
                        hs + se * ie,
                        nn - ae * Dt,
                        dn - se * Dt,
                        ie ? 0 : ni,
                        Dt ? 0 : An,
                      ]
                    : null;
                };
              if (Mt === null && xt && wt(r === 0 ? 0.42 : 0.3)) {
                let mt = _e(r === 0 ? 0.42 : 0.3);
                mt &&
                  $X(
                    t("facade"),
                    mt[0],
                    mt[1],
                    mt[2],
                    mt[3],
                    l - 0.38,
                    l + 0.12,
                    r === 0 ? 0.42 : 0.3,
                    Xt,
                    mt[4],
                    mt[5],
                  );
              } else if (Mt && xt && (De - an) * ee > 0.3 && wt(Mt[2])) {
                let mt = _e(Mt[2] + 0.08);
                if (mt) {
                  let ie = 0.06 / Math.hypot(mt[2] - mt[0], mt[3] - mt[1]),
                    Dt = mt[2] - mt[0],
                    Ht = mt[3] - mt[1];
                  $X(
                    t("facade"),
                    mt[0] + Dt * ie,
                    mt[1] + Ht * ie,
                    mt[2] - Dt * ie,
                    mt[3] - Ht * ie,
                    Mt[0],
                    Mt[1],
                    Mt[2],
                    Xt,
                    mt[4],
                    mt[5],
                  );
                }
              }
            }
            if (n && (De - an) * ee > (ve ? 0.3 : 0.6)) {
              let Mt = xe === j[0] && qs === Kt,
                Xt = xe === Se && xs >= ce - 1e-6;
              (ve &&
                !jt &&
                !f &&
                B[xe] === 1 &&
                JC(
                  n,
                  e,
                  Ds,
                  hs,
                  nn,
                  dn,
                  h + xe * 131 + Rs * 17,
                  YC(e, Ds, hs, nn, dn),
                ),
                kX({
                  g: n,
                  L: e,
                  gy: T(Ds, hs, nn, dn),
                  solid: A,
                  ax: Ds,
                  az: hs,
                  bx: nn,
                  bz: dn,
                  uA: qs,
                  uB: xs,
                  u0: Qs.u0,
                  nm: Qs.n,
                  mirror: Qs.mirror,
                  secs: Wn,
                  cell: Qs.cell,
                  group: a.group,
                  fcol: Qs.fcol,
                  gF: ve ? ve[Rs] : vt,
                  top: l,
                  st: r,
                  seed: h + F * 7919 + xe * 131 + (ve ? Rs * 17 : Ps * 17),
                  mA: ni,
                  mB: An,
                  slot: W[xe],
                  shop: !ve && re > -1e8 && !jt && !Oe,
                  flank: jt,
                  cut: f,
                  cornice: ee > 1.5,
                  pipe: Fe < 0.3 && Mt ? 1 : Fe > 0.7 && Xt ? -1 : 0,
                  flag:
                    !ve &&
                    xe === ot &&
                    qs <= Vt + et / 2 &&
                    xs > Vt + et / 2 &&
                    Bn(h, 93) < 0.6,
                }));
            }
            qs = xs;
          }
          (ve ||
            (re > -1e8 && ee > 1.5 && !jt && B[xe] === 1
              ? R(He, ms, bt, te, vt)
              : re > c + 0.01 &&
                !Oe &&
                t(g).wall(He, ms, bt, te, c, c, re, re, b, Kt * Q, o.base),
            n &&
              ee > 0.6 &&
              !jt &&
              !f &&
              re < -1e8 &&
              B[xe] === 1 &&
              r !== 6 &&
              r !== 8 &&
              JC(n, e, He, ms, bt, te, h + xe * 131, YC(e, He, ms, bt, te))),
            (Kt += Yt));
        }
      }
    }),
    i)
  )
    return;
  if (P) {
    let L = o.rings[0],
      F = L.length / 2,
      O = o.fronts[0],
      B = -1,
      H = 12;
    for (let N = 0; N < F; N++)
      if (O[N] === 1) {
        let D = Math.hypot(
          L[((N + 1) % F) * 2] - L[N * 2],
          L[((N + 1) % F) * 2 + 1] - L[N * 2 + 1],
        );
        D > H && ((H = D), (B = N));
      }
    if (B >= 0) {
      let N = L[B * 2],
        D = L[B * 2 + 1],
        U = L[((B + 1) % F) * 2],
        G = L[((B + 1) % F) * 2 + 1],
        W = (U - N) / H,
        V = (G - D) / H,
        $ = 0.3 + 0.4 * Bn(h, 60),
        J = z(N, D, U, G, $),
        X = Math.min(4.5, H * 0.2),
        tt = 2.6,
        Z = t("roof"),
        q = [0.1, 0.095, 0.09, 0],
        j = N + (U - N) * $ - (V * tt) / 2,
        K = D + (G - D) * $ + (W * tt) / 2,
        nt = J + 4.2,
        Q = J + 4.5;
      Gi(Z, j, K, W, V, X, tt / 2, nt, Q, q);
      let et = (st, ot) => [
        j + W * X * st - ((V * tt) / 2) * ot,
        nt,
        K + V * X * st + ((W * tt) / 2) * ot,
      ];
      Fw(Z, et(-1, -1), et(1, -1), et(1, 1), et(-1, 1), q, !1);
    }
  }
  if (o.tcut) return;
  if (o.rs) {
    let L = o.rings[0],
      F = 1e9,
      O = -1e9,
      B = 1e9,
      H = -1e9;
    for (let U = 0; U < L.length; U += 2)
      ((F = Math.min(F, L[U])),
        (O = Math.max(O, L[U])),
        (B = Math.min(B, L[U + 1])),
        (H = Math.max(H, L[U + 1])));
    let N = o.rh > (0.6 * Math.min(O - F, H - B)) / 2,
      D = r === 6 && N;
    (oK(
      t(D ? "office" : "roofT"),
      o,
      l,
      D
        ? _
        : r === 6
          ? eL(o, a).near
          : sL[h] !== void 0
            ? iK
            : o.roofCol || (o.tile ? YX : qX[h % qX.length]),
      D,
    ),
      o.minh > 0 &&
        zx(t("roofT"), o.rings, c + DX(o), [0.35, 0.35, 0.35, 1 / 7], !1));
    return;
  }
  let I = eL(o, a);
  if (
    (zx(t("roofT"), o.rings, w, I.near, !0),
    o.minh > 0 &&
      zx(t("roofT"), o.rings, c + DX(o), [0.35, 0.35, 0.35, 1 / 7], !1),
    M)
  ) {
    let L = [...XX[h % 3], 0];
    o.rings.forEach((F, O) => {
      let B = F.length / 2,
        H = jX(F).inn,
        N = ZC(o.rings, O, !0);
      for (let D = 0; D < B; D++) {
        let U = F[D * 2],
          G = F[D * 2 + 1],
          W = F[((D + 1) % B) * 2],
          V = F[((D + 1) % B) * 2 + 1],
          $ = Math.hypot(W - U, V - G);
        if ($ < 0.05 || N[D] < 0.6) continue;
        let J = (-(V - G) / $) * 0.25,
          X = ((W - U) / $) * 0.25,
          [tt, Z] = H[D];
        {
          let st = Math.min(1, ($ * 0.98) / Math.max(1e-6, (tt + Z) * 0.25));
          ((tt *= st), (Z *= st));
        }
        let q = ((W - U) / $) * 0.25,
          j = ((V - G) / $) * 0.25,
          K = U - J + q * tt,
          nt = G - X + j * tt,
          Q = W - J - q * Z,
          et = V - X - j * Z;
        (t("roof").wall(Q, et, K, nt, w, w, l, l, L, 0, w),
          Fw(t("roof"), [K, l, nt], [U, l, G], [W, l, V], [Q, l, et], L, !0));
      }
    });
  }
  o.minh <= 0 && agt(t("roof"), o, w, r, a.wall, I, t("roofT"), A);
}
