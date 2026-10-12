// app 185 — math
// Lines 105602-106302 of readable/app.pretty.js (statement-aligned).
function zP(i, t, e, s, n = null, o = !1) {
  if (i.hide) return;
  if ($l && !o) {
    let L = ZV($l, i);
    if (L) {
      let F = t,
        N = new Map();
      t = (B) => {
        let H = N.get(B);
        return (H || N.set(B, (H = t$(F(B), i, L))), H);
      };
    }
  }
  let a = YV(i, s),
    { st: r } = a,
    l = (i.tcut ? Math.min(i.top - i.rh, i.tcut) : i.top - i.rh) + QV(i),
    c = Math.max(
      i.minh > 0 ? i.minh : i.st === 7 ? -2.5 : i.base - 0.3,
      i.cut || -1e9,
    ),
    h = i.seed,
    f = i.cut > 0,
    u = f ? null : a.shopCells,
    d = i.base - 0.3,
    p = 0.94 + 0.12 * Cn(h, 4),
    m = du[h]?.hue ||
      JV(i, h) || [
        1 + 0.07 * (Cn(h, 21) - 0.5),
        1 + 0.05 * (Cn(h, 22) - 0.5),
        1 + 0.07 * (Cn(h, 23) - 0.5),
      ],
    g = uk[r] ? uk[r][a.r < 0.5 ? 0 : 1] : "w_stucco",
    b = [
      ...a.wall.map(
        (L) => 0.72 * (0.6 + (0.4 * L) / Math.max(...a.wall, 0.01)),
      ),
      0,
    ];
  if (a.cool) for (let L = 0; L < 3; L++) b[L] *= [0.9, 0.96, 1.1][L];
  let x = a.cell && a.group,
    v = s?.fronts ? 2 * (Object.keys(s.fronts).indexOf(a.group) + 1) : 0,
    y = s?.fronts ? 2 * (Object.keys(s.fronts).indexOf("shop") + 1) : 0,
    M = r >= 2 && !i.rs,
    w = l - (M ? 0.55 : 0.15),
    z = [
      ...(a.glass ? a.wall : a.wall.map((L) => 0.85 + 0.3 * L)),
      (a.office + 0.5) / 32,
    ],
    _ = (L, F, N, B, H = 0.5) => {
      let O = Math.hypot(N - L, B - F) || 1;
      return Math.min(
        l - 3,
        Math.max(
          d,
          e.driveHeight(
            L + (N - L) * H - ((B - F) / O) * 1.6,
            F + (B - F) * H + ((N - L) / O) * 1.6,
          ),
        ),
      );
    },
    R = $l ? Lpt($l, i) : null,
    T = (L, F, N, B) => {
      let H = Math.hypot(N - L, B - F) || 1,
        O = (N - L) / H,
        D = (B - F) / H;
      return (U) => e.driveHeight(L + O * U - D * 1.6, F + D * U + O * 1.6);
    },
    E = 0,
    A = (L, F, N, B, H, O = 4.8) => {
      let D = u,
        U = Math.hypot(N - L, B - F),
        G = Math.max(1, Math.ceil(U / 8.4 - 0.05)),
        q = -(B - F) / U,
        W = (N - L) / U,
        V = -1;
      if (!(H + O <= c + 0.05)) {
        if (U < 3.5) {
          t(uk[r] ? uk[r][a.r < 0.5 ? 0 : 1] : "w_stucco").wall(
            L,
            F,
            N,
            B,
            c,
            c,
            H + 4.8,
            H + 4.8,
            [
              ...a.wall.map(
                (Y) => 0.72 * (0.6 + (0.4 * Y) / Math.max(...a.wall, 0.01)),
              ),
              0,
            ],
            0,
            i.base,
          );
          return;
        }
        for (let Y = 0; Y < G; Y++) {
          let $ = Math.floor(Cn(h, 50 + E++) * D.length) % D.length;
          ($ === V && ($ = ($ + 1) % D.length), (V = $));
          let st = D[$],
            Q = Y / G,
            j = (Y + 1) / G,
            X = L + (N - L) * Q,
            K = F + (B - F) * Q,
            nt = L + (N - L) * j,
            Z = F + (B - F) * j,
            et = (h % 37) * 5 + E * 2,
            tt = [p, p, p, (st.cell + 32.5) / 64 + y],
            it = (c - H) / O;
          (t("f_shop").quad(
            [X, c, K],
            [nt, c, Z],
            [nt, H + O, Z],
            [X, H + O, K],
            [et, it],
            [et + 0.9999, it],
            [et + 0.9999, 1],
            [et, 1],
            tt,
            [q, 0, W],
          ),
            n &&
              (O > 4.6 &&
                MV(
                  n,
                  X,
                  K,
                  nt,
                  Z,
                  H,
                  st,
                  h * 31 + E,
                  Y === 0,
                  T(X, K, nt, Z),
                  R,
                ),
              yP(
                n,
                e,
                X,
                K,
                nt,
                Z,
                h * 31 + E,
                Math.max(0.7, vP(e, X, K, nt, Z)),
              )));
        }
      }
    },
    C = r === 6 && !a.shopCells && !i.minh && !f ? 1 : 0,
    P = [...a.wall, ((VV[r] ?? 1) + 0.5) / 16];
  if (
    (i.rings.forEach((L, F) => {
      let N = L.length / 2,
        B = i.fronts[F],
        H = (Q) =>
          Math.hypot(
            L[((Q + 1) % N) * 2] - L[Q * 2],
            L[((Q + 1) % N) * 2 + 1] - L[Q * 2 + 1],
          ),
        O = (Q) => x && r !== 6 && (B[Q] === 1 || (B[Q] === 2 && _V.has(r))),
        D = new Uint8Array(N);
      if (x && r !== 6)
        for (let Q = 0; Q < N; Q++) {
          if (O(Q) || H(Q) >= 1.5) continue;
          let j = (Q + N - 1) % N,
            X = (Q + 1) % N,
            K = 0;
          for (; K++ < N && !O(j) && H(j) < 1.5;) j = (j + N - 1) % N;
          for (; K++ < 2 * N && !O(X) && H(X) < 1.5;) X = (X + 1) % N;
          O(j) && O(X) && (D[Q] = 1);
        }
      let U = (Q) => O(Q) || D[Q] === 1,
        G = WV(L),
        q = wP(i.rings, F),
        W = wP(i.rings, F, !0);
      for (let Q = 0; Q < q.length; Q++) W[Q] < 0.6 && (q[Q] = 0);
      let V = (Q) => x && (Q === 1 || (Q === 2 && _V.has(r))),
        Y = new Uint8Array(N),
        $ = -1;
      for (let Q = 0; Q < N; Q++)
        if (U(Q) && !U((Q + N - 1) % N)) {
          $ = Q;
          break;
        }
      if ($ < 0) {
        $ = 0;
        for (let Q = 0; Q < N; Q++)
          if (O(Q) && !O((Q + N - 1) % N)) {
            $ = Q;
            break;
          }
        for (let Q = 0; Q < N && D[($ + N - 1) % N]; Q++) $ = ($ + N - 1) % N;
      }
      let st = Cn(h, 5) * 30;
      for (let Q = 0, j = $; Q < N; Q++, j = (j + 1) % N) {
        if (Y[j]) continue;
        if (r === 6) {
          let de = L[j * 2],
            Ie = L[j * 2 + 1],
            ps = L[((j + 1) % N) * 2],
            gt = L[((j + 1) % N) * 2 + 1];
          if (u && B[j] === 1 && H(j) > 3 && F === 0) {
            let se = _(de, Ie, ps, gt);
            A(de, Ie, ps, gt, se);
            let Nt = Math.max(c, se + 4.8);
            t("office").wall(de, Ie, ps, gt, Nt, Nt, l, l, z, st, i.base);
          } else t("office").wall(de, Ie, ps, gt, c, c, l, l, z, st, i.base);
          ((st += H(j)), (Y[j] = 1));
          continue;
        }
        if (!U(j)) {
          let de = L[j * 2],
            Ie = L[j * 2 + 1],
            ps = L[((j + 1) % N) * 2],
            gt = L[((j + 1) % N) * 2 + 1],
            se =
              r === 8 && u && B[j] === 1 && H(j) > 3 && F === 0
                ? (() => {
                    let Nt = H(j) || 1;
                    return e.driveHeight(
                      (de + ps) / 2 - ((gt - Ie) / Nt) * 1.6,
                      (Ie + gt) / 2 + ((ps - de) / Nt) * 1.6,
                    );
                  })()
                : null;
          if (se !== null && se < l - 3.3 && se > i.base - 1.2) {
            let Nt = _(de, Ie, ps, gt);
            (A(de, Ie, ps, gt, Nt, Math.min(4.8, l - Nt)),
              l > Nt + 4.85 &&
                t(g).wall(
                  de,
                  Ie,
                  ps,
                  gt,
                  Nt + 4.8,
                  Nt + 4.8,
                  l,
                  l,
                  b,
                  st,
                  i.base,
                ));
          } else
            B[j] && !V(B[j])
              ? t("facade").wall(de, Ie, ps, gt, c, c, l, l, P, st, i.base)
              : t(g).wall(de, Ie, ps, gt, c, c, l, l, b, st, i.base);
          ((st += H(j)), (Y[j] = 1));
          continue;
        }
        let X = [],
          K = 0;
        for (
          let de = j, Ie = 0;
          Ie < N && U(de) && !Y[de];
          Ie++, de = (de + 1) % N
        )
          (X.push(de), (K += H(de)), (Y[de] = 1));
        let nt = a.cell,
          Z = nt.w,
          et = Math.max(1, Math.round(K / Z + 0.2));
        if (K < Z * 0.45) {
          for (let de of X) {
            let Ie = L[de * 2],
              ps = L[de * 2 + 1],
              gt = L[((de + 1) % N) * 2],
              se = L[((de + 1) % N) * 2 + 1];
            (t(g).wall(Ie, ps, gt, se, c, c, l, l, b, st, i.base),
              (st += H(de)));
          }
          continue;
        }
        let tt = 0,
          it = X[0],
          rt = 0.5;
        for (let de of X) {
          let Ie = H(de);
          if (tt + Ie >= K / 2) {
            ((it = de), (rt = (K / 2 - tt) / Ie));
            break;
          }
          tt += Ie;
        }
        let lt = L[it * 2],
          ct = L[it * 2 + 1],
          dt = L[((it + 1) % N) * 2],
          ut = L[((it + 1) % N) * 2 + 1],
          ot = Math.hypot(dt - lt, ut - ct) || 1,
          at = lt + (dt - lt) * rt + (-(ut - ct) / ot) * 1.6,
          yt = ct + (ut - ct) * rt + ((dt - lt) / ot) * 1.6,
          vt = Math.min(l - 3, Math.max(d, e.driveHeight(at, yt))),
          Pt = l - vt,
          jt = Pt / nt.h,
          Wt = (de, Ie = a.cell) => {
            let ps = l - de,
              gt = ps / Ie.h;
            if (gt <= 1.12) {
              let Fe = gt < 0.75 ? Math.min(1, ps / (Ie.h * 0.92)) : 1;
              return [[c, l, ((c - de) / ps) * Fe, Fe]];
            }
            let [se, Nt] = Ie.band || Mpt[Ie.style] || [0.34, 0.66],
              xe = Math.max(1, Math.round((gt - 1) / (Nt - se))),
              ce = ps / (1 + xe * (Nt - se)),
              Ge = [[c, de + Nt * ce, (c - de) / ce, Nt]];
            for (let Fe = 0; Fe < xe; Fe++) {
              let $e = de + (Nt + Fe * (Nt - se)) * ce;
              Ge.push([$e, $e + (Nt - se) * ce, se, Nt]);
            }
            return (
              Ge.push([de + (Nt + xe * (Nt - se)) * ce, l, Nt, 1]),
              Ge.filter((Fe) => Fe[1] > c + 0.01).map((Fe) =>
                Fe[0] < c
                  ? [
                      c,
                      Fe[1],
                      Fe[2] + ((Fe[3] - Fe[2]) * (c - Fe[0])) / (Fe[1] - Fe[0]),
                      Fe[3],
                    ]
                  : Fe,
              )
            );
          },
          Ct = Wt(vt),
          qt = (h % 61) * 3 + F * 7,
          Zt = qt,
          he = [p * m[0], p * m[1], p * m[2], (nt.cell + 0.5) / 64 + v],
          ee = a.mirror ? (de) => 2 * qt + et - 1e-4 - de : (de) => de,
          Xt = X.every((de) => B[de] !== 1 && !D[de]) && Pt > 7,
          me = (Ct[0][1] - vt) / Math.max(0.05, Ct[0][3]),
          re = u && Pt > 9 && !Xt ? vt + 4.8 : Xt ? vt + 0.32 * me : -1e9,
          os = Ct.filter((de) => de[1] > re + 0.01).map(([de, Ie, ps, gt]) =>
            de < re
              ? [re, Ie, ps + ((gt - ps) * (re - de)) / (Ie - de), gt]
              : [de, Ie, ps, gt],
          ),
          Dt = Ppt(a, s, et, qt, h + F * 7919 + X[0] * 131, i, he, Xt),
          qe = new Int16Array(et);
        Dt.forEach((de, Ie) => {
          for (let ps = de.u0 - qt; ps < de.u0 - qt + de.n; ps++) qe[ps] = Ie;
        });
        let pe = null;
        if ((r === 0 || r === 1) && re < -1e8 && et > 1) {
          pe = new Float64Array(et).fill(NaN);
          let de = qt;
          for (let gt of X) {
            let se = H(gt),
              Nt = (se * et) / K,
              xe = L[gt * 2],
              ce = L[gt * 2 + 1],
              Ge = L[((gt + 1) % N) * 2],
              Fe = L[((gt + 1) % N) * 2 + 1];
            for (let $e = 0; $e < et; $e++) {
              let Ds = qt + $e + 0.5;
              Ds >= de &&
                Ds < de + Nt &&
                (pe[$e] = _(xe, ce, Ge, Fe, (Ds - de) / Nt));
            }
            de += Nt;
          }
          let Ie = 1e9,
            ps = -1e9;
          for (let gt = 0; gt < et; gt++)
            (pe[gt] !== pe[gt] && (pe[gt] = vt),
              (Ie = Math.min(Ie, pe[gt])),
              (ps = Math.max(ps, pe[gt])));
          ps - Ie < 0.35 && (pe = null);
        }
        let we = (de) =>
          de
            .filter((Ie) => Ie[1] > re + 0.01)
            .map(([Ie, ps, gt, se]) =>
              Ie < re
                ? [re, ps, gt + ((se - gt) * (re - Ie)) / (ps - Ie), se]
                : [Ie, ps, gt, se],
            );
        for (let de of Dt)
          ((de.cut = de.cell === nt ? os : we(Wt(vt, de.cell))),
            (de.full = de.cell === nt ? Ct : Wt(vt, de.cell)),
            pe && (de.secsM = Array.from(pe, (Ie) => Wt(Ie, de.cell))));
        let rs = X[X.length - 1],
          Le = Cn(h, 92);
        for (let de of X) {
          let Ie = L[de * 2],
            ps = L[de * 2 + 1],
            gt = L[((de + 1) % N) * 2],
            se = L[((de + 1) % N) * 2 + 1],
            Nt = H(de),
            xe = (Nt * et) / K,
            ce = Math.min(Zt + xe, qt + et - 1e-4),
            Ge = [-(se - ps) / Nt, 0, (gt - Ie) / Nt],
            Fe = !pe && re > -1e8 && !Xt && !(Nt > 1.5 && B[de] === 1),
            $e =
              (pe
                ? r === 0 || r === 1
                : r === 0 || r === 1 || r === 3 || r === 4) && Nt > 1.5,
            Ds = Zt;
          for (; Ds < ce - 1e-6;) {
            let Es = Math.min(et - 1, Math.floor(Ds - qt + 1e-6)),
              Ls = qe[Es],
              Os = Dt[Ls],
              hs = Math.min(ce, pe ? qt + Es + 1 : Os.u0 + Os.n),
              Zs = (Ds - Zt) / xe,
              We = (hs - Zt) / xe,
              Is = Ie + (gt - Ie) * Zs,
              ns = ps + (se - ps) * Zs,
              rn = Ie + (gt - Ie) * We,
              dn = ps + (se - ps) * We,
              Hn = pe ? Os.secsM[Es] : Fe ? Os.full : Os.cut,
              Dn = Os.U;
            for (let [Mt, Kt, bt, wt] of Hn)
              t("f_" + a.group).quad(
                [Is, Mt, ns],
                [rn, Mt, dn],
                [rn, Kt, dn],
                [Is, Kt, ns],
                [Dn(Ds), bt],
                [Dn(hs), bt],
                [Dn(hs), wt],
                [Dn(Ds), wt],
                Os.fcol,
                Ge,
              );
            let Un = Zs < 1e-6 ? G.out[de][0] : 0,
              Xs = We > 1 - 1e-6 ? G.out[de][1] : 0,
              _i =
                R &&
                [0.15, 0.5, 0.85].some((Mt) =>
                  [0.45, 1.15].some((Kt) =>
                    [l - 0.1, l - 0.45].some((bt) =>
                      R(
                        Is + (rn - Is) * Mt + Ge[0] * Kt,
                        ns + (dn - ns) * Mt + Ge[2] * Kt,
                        bt,
                      ),
                    ),
                  ),
                );
            if ($e && (We - Zs) * Nt > 0.15 && !_i) {
              let Mt = xV(Os.cell, Hn, l),
                Kt = [0.8, 0.79, 0.74, 8.5 / 16],
                bt = !bV(Os.cell, Hn, l - 0.9, l + 0.4),
                wt = (pt) => q[de] > 2 * pt + 0.05,
                _t = (We - Zs) * Nt,
                ie = (rn - Is) / Math.max(1e-6, _t),
                te = (dn - ns) / Math.max(1e-6, _t),
                Qt = (pt, le, Ut) =>
                  R &&
                  [0.06, 0.5 * Ut].some((zt) =>
                    [l - 0.1, l - 0.45].some((ft) =>
                      R(pt + Ge[0] * zt, le + Ge[2] * zt, ft),
                    ),
                  ),
                ge = (pt) => {
                  let le =
                      Zs < 1e-6 && Qt(Is - ie * 0.25, ns - te * 0.25, pt)
                        ? pt + 0.05
                        : 0,
                    Ut =
                      We > 1 - 1e-6 && Qt(rn + ie * 0.25, dn + te * 0.25, pt)
                        ? pt + 0.05
                        : 0;
                  return _t - le - Ut > 0.3
                    ? [
                        Is + ie * le,
                        ns + te * le,
                        rn - ie * Ut,
                        dn - te * Ut,
                        le ? 0 : Un,
                        Ut ? 0 : Xs,
                      ]
                    : null;
                };
              if (Mt === null && bt && wt(r === 0 ? 0.42 : 0.3)) {
                let pt = ge(r === 0 ? 0.42 : 0.3);
                pt &&
                  qV(
                    t("facade"),
                    pt[0],
                    pt[1],
                    pt[2],
                    pt[3],
                    l - 0.38,
                    l + 0.12,
                    r === 0 ? 0.42 : 0.3,
                    Kt,
                    pt[4],
                    pt[5],
                  );
              } else if (Mt && bt && (We - Zs) * Nt > 0.3 && wt(Mt[2])) {
                let pt = ge(Mt[2] + 0.08);
                if (pt) {
                  let le = 0.06 / Math.hypot(pt[2] - pt[0], pt[3] - pt[1]),
                    Ut = pt[2] - pt[0],
                    zt = pt[3] - pt[1];
                  qV(
                    t("facade"),
                    pt[0] + Ut * le,
                    pt[1] + zt * le,
                    pt[2] - Ut * le,
                    pt[3] - zt * le,
                    Mt[0],
                    Mt[1],
                    Mt[2],
                    Kt,
                    pt[4],
                    pt[5],
                  );
                }
              }
            }
            if (n && (We - Zs) * Nt > (pe ? 0.3 : 0.6)) {
              let Mt = de === X[0] && Ds === Zt,
                Kt = de === rs && hs >= ce - 1e-6;
              (pe &&
                !Xt &&
                !f &&
                B[de] === 1 &&
                yP(
                  n,
                  e,
                  Is,
                  ns,
                  rn,
                  dn,
                  h + de * 131 + Es * 17,
                  vP(e, Is, ns, rn, dn),
                ),
                wV({
                  g: n,
                  L: e,
                  gy: T(Is, ns, rn, dn),
                  solid: R,
                  ax: Is,
                  az: ns,
                  bx: rn,
                  bz: dn,
                  uA: Ds,
                  uB: hs,
                  u0: Os.u0,
                  nm: Os.n,
                  mirror: Os.mirror,
                  secs: Hn,
                  cell: Os.cell,
                  group: a.group,
                  fcol: Os.fcol,
                  gF: pe ? pe[Es] : vt,
                  top: l,
                  st: r,
                  seed: h + F * 7919 + de * 131 + (pe ? Es * 17 : Ls * 17),
                  mA: Un,
                  mB: Xs,
                  slot: q[de],
                  shop: !pe && re > -1e8 && !Xt && !Fe,
                  flank: Xt,
                  cut: f,
                  cornice: Nt > 1.5,
                  pipe: Le < 0.3 && Mt ? 1 : Le > 0.7 && Kt ? -1 : 0,
                  flag:
                    !pe &&
                    de === it &&
                    Ds <= qt + et / 2 &&
                    hs > qt + et / 2 &&
                    Cn(h, 93) < 0.6,
                }));
            }
            Ds = hs;
          }
          (pe ||
            (re > -1e8 && Nt > 1.5 && !Xt && B[de] === 1
              ? A(Ie, ps, gt, se, vt)
              : re > c + 0.01 &&
                !Fe &&
                t(g).wall(Ie, ps, gt, se, c, c, re, re, b, Zt * Z, i.base),
            n &&
              Nt > 0.6 &&
              !Xt &&
              !f &&
              re < -1e8 &&
              B[de] === 1 &&
              r !== 6 &&
              r !== 8 &&
              yP(n, e, Ie, ps, gt, se, h + de * 131, vP(e, Ie, ps, gt, se))),
            (Zt += xe));
        }
      }
    }),
    o)
  )
    return;
  if (C) {
    let L = i.rings[0],
      F = L.length / 2,
      N = i.fronts[0],
      B = -1,
      H = 12;
    for (let O = 0; O < F; O++)
      if (N[O] === 1) {
        let D = Math.hypot(
          L[((O + 1) % F) * 2] - L[O * 2],
          L[((O + 1) % F) * 2 + 1] - L[O * 2 + 1],
        );
        D > H && ((H = D), (B = O));
      }
    if (B >= 0) {
      let O = L[B * 2],
        D = L[B * 2 + 1],
        U = L[((B + 1) % F) * 2],
        G = L[((B + 1) % F) * 2 + 1],
        q = (U - O) / H,
        W = (G - D) / H,
        V = 0.3 + 0.4 * Cn(h, 60),
        Y = _(O, D, U, G, V),
        $ = Math.min(4.5, H * 0.2),
        st = 2.6,
        Q = t("roof"),
        j = [0.1, 0.095, 0.09, 0],
        X = O + (U - O) * V - (W * st) / 2,
        K = D + (G - D) * V + (q * st) / 2,
        nt = Y + 4.2,
        Z = Y + 4.5;
      Pi(Q, X, K, q, W, $, st / 2, nt, Z, j);
      let et = (tt, it) => [
        X + q * $ * tt - ((W * st) / 2) * it,
        nt,
        K + W * $ * tt + ((q * st) / 2) * it,
      ];
      Uy(Q, et(-1, -1), et(1, -1), et(1, 1), et(-1, 1), j, !1);
    }
  }
  if (i.tcut) return;
  if (i.rs) {
    let L = i.rings[0],
      F = 1e9,
      N = -1e9,
      B = 1e9,
      H = -1e9;
    for (let U = 0; U < L.length; U += 2)
      ((F = Math.min(F, L[U])),
        (N = Math.max(N, L[U])),
        (B = Math.min(B, L[U + 1])),
        (H = Math.max(H, L[U + 1])));
    let O = i.rh > (0.6 * Math.min(N - F, H - B)) / 2,
      D = r === 6 && O;
    (s$(
      t(D ? "office" : "roofT"),
      i,
      l,
      D
        ? z
        : r === 6
          ? kP(i, a).near
          : _P[h] !== void 0
            ? e$
            : i.roofCol || (i.tile ? $V : GV[h % GV.length]),
      D,
    ),
      i.minh > 0 &&
        Hb(t("roofT"), i.rings, c + BV(i), [0.35, 0.35, 0.35, 1 / 7], !1));
    return;
  }
  let I = kP(i, a);
  if (
    (Hb(t("roofT"), i.rings, w, I.near, !0),
    i.minh > 0 &&
      Hb(t("roofT"), i.rings, c + BV(i), [0.35, 0.35, 0.35, 1 / 7], !1),
    M)
  ) {
    let L = [...jV[h % 3], 0];
    i.rings.forEach((F, N) => {
      let B = F.length / 2,
        H = WV(F).inn,
        O = wP(i.rings, N, !0);
      for (let D = 0; D < B; D++) {
        let U = F[D * 2],
          G = F[D * 2 + 1],
          q = F[((D + 1) % B) * 2],
          W = F[((D + 1) % B) * 2 + 1],
          V = Math.hypot(q - U, W - G);
        if (V < 0.05 || O[D] < 0.6) continue;
        let Y = (-(W - G) / V) * 0.25,
          $ = ((q - U) / V) * 0.25,
          [st, Q] = H[D];
        {
          let tt = Math.min(1, (V * 0.98) / Math.max(1e-6, (st + Q) * 0.25));
          ((st *= tt), (Q *= tt));
        }
        let j = ((q - U) / V) * 0.25,
          X = ((W - G) / V) * 0.25,
          K = U - Y + j * st,
          nt = G - $ + X * st,
          Z = q - Y - j * Q,
          et = W - $ - X * Q;
        (t("roof").wall(Z, et, K, nt, w, w, l, l, L, 0, w),
          Uy(t("roof"), [K, l, nt], [U, l, G], [q, l, W], [Z, l, et], L, !0));
      }
    });
  }
  i.minh <= 0 && Npt(t("roof"), i, w, r, a.wall, I, t("roofT"), R);
}
