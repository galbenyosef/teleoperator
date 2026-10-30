// app 84 — math
// Lines 72499-72984 of readable/app.pretty.js (statement-aligned).
function tq(o, { max: t = 70, map: e = null, seed: s = 39 } = {}) {
  let n = s,
    i = () => (n = (n * 16807) % 2147483647) / 2147483647,
    a = $5(o),
    r = o.Yd,
    l = new me({ color: 16777215, roughness: 0.8, metalness: 0, map: e });
  ((l.userData.mbAlbedo = pp),
    (l.userData.mbWind = -1),
    (l.userData.mbSkyVis = 2),
    (l.name = "pier39 visitors"));
  let c = new le();
  c.name = "Pier39Crowd";
  let h = i0() ? new Q0("Pier39Vox", t + wP) : null;
  h && c.add(h.group);
  let f = h
      ? []
      : n0.map((I, L) =>
          [0, 1].map((F) => {
            let O = new En(dp(I, F), l, t + wP);
            return (
              (O.count = 0),
              (O.frustumCulled = !1),
              (O.castShadow = F === 0),
              (O.receiveShadow = !0),
              (O.name = `p39ped${L}_lod${F}`),
              (O.userData.mbMover = !0),
              (O.matrixAutoUpdate = !1),
              O.setColorAt(0, new It(1, 1, 1)),
              (O.boundingSphere = new _n(new dt(), 1)),
              (O.visible = !1),
              c.add(O),
              O
            );
          }),
        ),
    u = new Uint8Array(a.nx * a.nz);
  for (let I of o.colliders) {
    if (I.t === "poly") continue;
    let L = (I.t === "circ" ? I.r : Math.hypot(I.hx, I.hz)) + 0.5;
    for (let F = Math.floor(I.z - L); F <= I.z + L; F++)
      for (let O = Math.floor(I.x - L); O <= I.x + L; O++) {
        let B = Math.floor(O - a.x0),
          H = Math.floor(F - a.z0);
        B >= 0 &&
          H >= 0 &&
          B < a.nx &&
          H < a.nz &&
          Math.hypot(O + 0.5 - I.x, F + 0.5 - I.z) <= L &&
          (u[H * a.nx + B] = 1);
      }
  }
  let d = (I, L) => {
      let F = Math.floor(I - a.x0),
        O = Math.floor(L - a.z0);
      return F < 0 || O < 0 || F >= a.nx || O >= a.nz || u[O * a.nx + F] === 1;
    },
    p = (I, L, F, O) => {
      let B = Math.hypot(F - I, O - L);
      for (let H = 0; H <= B; H += 0.5) {
        let N = H / B,
          D = I + (F - I) * N,
          U = L + (O - L) * N;
        if (a.at(D, U) < 0.7 || d(D, U)) return !1;
      }
      return !0;
    },
    m = [];
  for (let I = 0; I < a.nz; I += 2)
    for (let L = 0; L < a.nx; L += 2)
      a.D[I * a.nx + L] >= 1.1 &&
        !u[I * a.nx + L] &&
        m.push([a.x0 + L + 0.5, a.z0 + I + 0.5]);
  let g = (I, L, F) => {
      for (let O = 0; O < 24; O++) {
        let B = m[Math.floor(i() * m.length)],
          H = Math.hypot(B[0] - I, B[1] - L);
        if (H > 4 && H < F && p(I, L, B[0], B[1])) return B;
      }
      return null;
    },
    b = [],
    [v, x] = o.lions;
  for (let I of m)
    a.at(I[0], I[1]) < 1.6 &&
      Math.hypot(I[0] - v, I[1] - x) < 75 &&
      !o.inHouse(I[0], I[1], 3) &&
      b.push([I[0], I[1], v - I[0], x - I[1]]);
  if (o.carousel) {
    let { x: I, z: L, r: F } = o.carousel;
    for (let O = 0; O < 14; O++) {
      let B = (O / 14) * Math.PI * 2,
        H = I + Math.cos(B) * (F + 2.3),
        N = L + Math.sin(B) * (F + 2.3);
      a.at(H, N) > 0.9 && b.push([H, N, I - H, L - N]);
    }
  }
  let y = new bp({ statics: ZW(o.colliders) }),
    M = (I, L, F) => {
      let O = a.at(L, F),
        B = 0.3 + 0.05;
      if (O >= B) return null;
      let H = a.at(L + 0.5, F) - a.at(L - 0.5, F),
        N = a.at(L, F + 0.5) - a.at(L, F - 0.5),
        D = Math.hypot(H, N);
      return D < 1e-6
        ? null
        : [(H / D) * Math.min(0.3, B - O), (N / D) * Math.min(0.3, B - O)];
    },
    S = [];
  for (let I = 0; I < t && m.length; I++) {
    let L = Math.floor(i() * n0.length),
      F = 0.9 + i() * 0.17 - (n0[L].f ? 0.05 : 0),
      O = 0.95 + i() * 0.5,
      B = {
        B: L,
        sc: F,
        sw: 0.94 + i() * 0.14,
        seeds: [i(), i(), i()],
        speed: O,
        ph0: i() * 6.283,
        cad: (2 * Math.PI * O) / (1.37 * F),
        pose: 0,
        st: "stand",
        x: 0,
        z: 0,
        hx: 0,
        hz: 1,
        t: i() * 6,
        tx: 0,
        tz: 0,
        leap: null,
      };
    if (I < b.length * 0.6 && I % 3 === 0 && b.length) {
      let H = b[Math.floor(i() * b.length)];
      ((B.x = H[0] + (i() - 0.5) * 0.8), (B.z = H[1] + (i() - 0.5) * 0.8));
      let N = Math.hypot(H[2], H[3]) || 1;
      ((B.hx = H[2] / N),
        (B.hz = H[3] / N),
        (B.watch = !0),
        (B.t = -1e9),
        (B.pose = h
          ? i() < 0.35
            ? Rn.photo
            : i() < 0.2
              ? Rn.point
              : gp(i)
          : i() < 0.4
            ? 2
            : 0));
    } else {
      let H = m[Math.floor(i() * m.length)];
      ((B.x = H[0] + (i() - 0.5)), (B.z = H[1] + (i() - 0.5)));
      let N = i() * 6.283;
      ((B.hx = Math.cos(N)),
        (B.hz = Math.sin(N)),
        (B.pose = i() < 0.15 ? 2 : 0));
    }
    S.push(B);
  }
  let w = [];
  if (o.f.stage) {
    let I = o.f.stage,
      L = (B, H) => [I.x + I.ux * B + I.nx * H, I.z + I.uz * B + I.nz * H],
      F = (B, H, N, D, U, G = 0) => {
        if (w.length >= (t < 50 ? 14 : wP)) return;
        let W = Math.floor(i() * n0.length),
          V = 0.9 + i() * 0.17 - (n0[W].f ? 0.05 : 0);
        w.push({
          B: W,
          sc: V,
          sw: 0.94 + i() * 0.14,
          seeds: [i(), i(), i()],
          speed: 1,
          ph0: i() * 6.283,
          cad: 0,
          pose: U,
          st: "show",
          show: !0,
          x: B,
          z: H,
          hx: N,
          hz: D,
          y0: G,
          t: 0,
          leap: null,
        });
      };
    {
      let [B, H] = L(0.2, 0.55);
      F(B, H, I.nx, I.nz, 5, I.h);
    }
    for (let B of I.benches)
      for (let H of [-0.72, 0, 0.72]) {
        if (i() < 0.3) continue;
        let [N, D] = L(B.a + H + (i() - 0.5) * 0.12, B.b);
        F(N, D, -I.nx, -I.nz, 4);
      }
    let O = Math.max(0, ...I.benches.map((B) => B.b));
    for (let B = 0; B < 6; B++) {
      let H = (B - 2.5) * 1.3 + (i() - 0.5) * 0.5,
        N = O + 1.6 + i() * 1.2,
        [D, U] = L(H, N);
      if (a.at(D, U) < 0.9 || d(D, U)) continue;
      let G = Math.hypot(I.x - D, I.z - U);
      F(D, U, (I.x - D) / G, (I.z - U) / G, i() < 0.3 ? 3 : 0);
    }
  }
  let _ = (I) => {
      let L = g(I.x, I.z, 30);
      if (!L) {
        ((I.st = "stand"), (I.t = 2 + i() * 4));
        return;
      }
      ((I.tx = L[0] + (i() - 0.5) * 0.8),
        (I.tz = L[1] + (i() - 0.5) * 0.8),
        (I.st = "walk"),
        (I.pose = 0));
    },
    z = new qo(),
    A = new fe(),
    T = new _n(new dt(), 1.2),
    E = { n: S.length, drawn: 0, show: w.length },
    R = [...S, ...w],
    P = { night: 0 };
  function C(I, L, F) {
    let O = F.position.x,
      B = F.position.z,
      [H, N, D, U] = o.bb;
    if (Math.max(H - O, O - D, N - B, B - U) > rpt) {
      if (E.drawn) {
        for (let st of f)
          for (let ot of st) ((ot.count = 0), (ot.visible = !1));
        (h?.hide(), (E.drawn = 0));
      }
      return;
    }
    I = Math.min(I, 0.1);
    let W = L?.vel?.x || 0,
      V = L?.vel?.z || 0,
      $ = Math.hypot(W, V),
      J = L?.pos?.x ?? 1e9,
      X = L?.pos?.z ?? 1e9,
      tt = L ? -Math.sin(L.psi) : 0,
      Z = L ? -Math.cos(L.psi) : 1;
    for (let st of S) {
      if ((st.mad > 0 && (st.mad -= I), h)) {
        if (st.kb) {
          yk(st, I, (ot, rt) => o.yAt(ot, rt)) &&
            ((st.st = "stand"), (st.t = 1 + i()), (st.watch = !1));
          continue;
        }
        if (L)
          for (let ot of Bm(st.x, st.z, 7, L, null)) {
            if (ot.sp <= 1.8) continue;
            let rt = Nm(st.x + (st.sx || 0), st.z + (st.sz || 0), ot);
            if (rt) {
              ((st.x += st.sx || 0),
                (st.z += st.sz || 0),
                (st.sx = st.sz = 0),
                (st.y = o.yAt(st.x, st.z)),
                Q5(st, ot, rt),
                (st.leap = null),
                (st.st = "knock"),
                Ea.onBump?.(Math.min(1, ot.sp / 16), ot, st));
              break;
            }
          }
        if (st.kb) continue;
      }
      if (st.leap) {
        let ot = st.leap;
        ot.t += I;
        let rt = Math.min(1, ot.t / ot.dur);
        ((st.x += ot.vx * I * (1 - rt * 0.6)),
          (st.z += ot.vz * I * (1 - rt * 0.6)),
          ot.t >= ot.dur &&
            ((st.leap = null),
            (st.st = "stand"),
            (st.t = 0.5 + i()),
            h &&
              ((st.x += st.sx || 0),
              (st.z += st.sz || 0),
              (st.sx = st.sz = 0))));
      } else if (st.st === "walk") {
        let ot = st.tx - st.x,
          rt = st.tz - st.z,
          lt = Math.hypot(ot, rt),
          ht = st.speed * I;
        if (lt < 0.3)
          i() < 0.4
            ? ((st.st = "stand"),
              (st.t = 3 + i() * 9),
              (st.pose = h ? gp(i) : i() < 0.3 ? 2 : 0))
            : _(st);
        else {
          let pt = h
            ? Math.max(0.12, Math.min(1, 1.6 - (st.lag || 0) * 0.9))
            : 1;
          (h &&
            (st.lag || 0) > 2 &&
            (st.blk = (st.blk || 0) + I) > 3 &&
            ((st.blk = 0),
            (st.x += st.sx || 0),
            (st.z += st.sz || 0),
            (st.sx = st.sz = 0),
            _(st)),
            (st.hx += (ot / lt - st.hx) * Math.min(1, I * 5)),
            (st.hz += (rt / lt - st.hz) * Math.min(1, I * 5)));
          let ut = Math.hypot(st.hx, st.hz) || 1;
          ((st.hx /= ut),
            (st.hz /= ut),
            (st.x += (ot / lt) * ht * pt),
            (st.z += (rt / lt) * ht * pt));
        }
      } else st.watch || ((st.t -= I) <= 0 && _(st));
      if (L && $ > 0.4) {
        let ot = st.x - J,
          rt = st.z - X,
          lt = W / $,
          ht = V / $,
          pt = ot * lt + rt * ht,
          ut = ot * ht - rt * lt;
        if (
          pt > -2.6 &&
          pt < (h ? 2 + $ * 0.6 : 2.5 + $ * 1.2) &&
          Math.abs(ut) < (h ? 1.3 : 1.6) &&
          !st.leap
        ) {
          let it = ut >= 0 ? 1 : -1;
          (a.at(st.x + ht * it * 1.5, st.z - lt * it * 1.5) < 0.5 && (it = -it),
            h &&
              ((st.x += st.sx || 0),
              (st.z += st.sz || 0),
              (st.sx = st.sz = 0)));
          let at = h ? 1.8 : Math.max(2.6, $ * 0.9);
          ((st.leap = {
            t: 0,
            dur: h ? 0.5 : 0.55,
            vx: ht * it * at,
            vz: -lt * it * at,
          }),
            (st.st = "leap"),
            (st.watch = !1));
        }
      }
      if (L && !h) {
        let ot = st.x - J,
          rt = st.z - X,
          lt = ot * tt + rt * Z,
          ht = ot * Z - rt * tt;
        if (Math.abs(lt) < 2.7 && Math.abs(ht) < 1.25) {
          let pt = ht >= 0 ? 1 : -1,
            ut = 1.25 - Math.abs(ht);
          ((st.x += Z * pt * ut), (st.z -= tt * pt * ut));
        }
      }
      if (!h && a.at(st.x, st.z) <= 0) {
        let ot = g(st.x, st.z, 12) || m[0];
        ot &&
          Math.hypot(ot[0] - st.x, ot[1] - st.z) < 6 &&
          ((st.x = ot[0]), (st.z = ot[1]));
      }
    }
    if (
      (A.multiplyMatrices(F.projectionMatrix, F.matrixWorldInverse),
      z.setFromProjectionMatrix(A),
      h)
    ) {
      let st = P.night > 0.5 ? S : R,
        ot = L ? Bm(J, X, 400, L, null) : [];
      for (let lt of st)
        (lt.y === void 0 || !lt.kb) && (lt.y = o.yAt(lt.x, lt.z));
      (y.step(st, I, ot, {
        skip: (lt) => !!lt.kb,
        fixed: (lt) => !!lt.show,
        vmax: (lt) => (lt.leap ? 3 : Math.max(1.4, lt.speed * 1.35)),
        gain: (lt) => (lt.leap ? 12 : 3),
        wall: M,
      }),
        h.begin(I));
      let rt = 0;
      for (let lt of R) {
        if (lt.show && P.night > 0.5) continue;
        let ht = Math.hypot(lt.x - O, lt.z - B);
        if (ht > QW) continue;
        let pt = lt.x + (lt.sx || 0),
          ut = lt.z + (lt.sz || 0),
          it = lt.kb,
          at = it ? it.y : o.yAt(pt, ut) + (lt.y0 || 0);
        if ((T.center.set(pt, at + 0.9, ut), !z.intersectsSphere(T))) continue;
        let yt = it ? 0 : lt.vs || 0,
          vt = lt.st === "walk" || lt.leap ? yt > 0.08 : yt > 0.35,
          At = vt && yt > 0.25 && lt.vhx !== void 0 ? lt.vhx : lt.hx,
          Ut = vt && yt > 0.25 && lt.vhx !== void 0 ? lt.vhz : lt.hz;
        (h.put(lt, pt, at, ut, At, Ut, ht, {
          speed: vt && !lt.show ? Math.min(yt, 2) * (lt.mad > 0 ? 1.15 : 1) : 0,
          pose: it
            ? Rn.knock
            : lt.leap
              ? Rn.leap
              : lt.st === "walk" && lt.pose !== 2
                ? 0
                : lt.pose,
          k: it ? -it.ang : lt.leap ? lt.leap.t / lt.leap.dur : 0,
          rnd: i,
          look: it ? li.dizzy : lt.mad > 0 ? li.angry : null,
          snap: !!it,
        }),
          lt.show && rt++);
      }
      (h.end(), (E.drawn = h.drawn), (E.showDrawn = rt));
      return;
    }
    let q = f.map(() => [0, 0]),
      j = 0,
      K = 0;
    for (let st of R) {
      if (st.show && P.night > 0.5) continue;
      let ot = Math.hypot(st.x - O, st.z - B);
      if (ot > QW) continue;
      let rt = o.yAt(st.x, st.z) + (st.y0 || 0);
      if ((T.center.set(st.x, rt + 0.9, st.z), !z.intersectsSphere(T)))
        continue;
      let lt = ot < apt ? 0 : 1,
        ht = f[st.B][lt],
        pt = q[st.B][lt]++,
        ut = ht.instanceMatrix.array,
        it = ht.instanceColor.array,
        at = pt * 16,
        yt = st.sc,
        vt = yt * st.sw,
        At = st.hx,
        Ut = st.hz,
        Gt = st.st === "walk";
      ((ut[at] = Ut * vt),
        (ut[at + 1] = 0),
        (ut[at + 2] = -At * vt),
        (ut[at + 3] = st.leap ? st.leap.t / st.leap.dur : st.ph0),
        (ut[at + 4] = 0),
        (ut[at + 5] = yt),
        (ut[at + 6] = 0),
        (ut[at + 7] = Gt ? st.cad : 0),
        (ut[at + 8] = At * vt),
        (ut[at + 9] = 0),
        (ut[at + 10] = Ut * vt),
        (ut[at + 11] = st.leap ? 1 : st.pose),
        (ut[at + 12] = st.x),
        (ut[at + 13] = rt),
        (ut[at + 14] = st.z),
        (ut[at + 15] = 1),
        (it[pt * 3] = st.seeds[0]),
        (it[pt * 3 + 1] = st.seeds[1]),
        (it[pt * 3 + 2] = st.seeds[2]),
        j++,
        st.show && K++);
    }
    let nt = (H + D) / 2,
      Q = (N + U) / 2,
      et = Math.hypot(D - H, U - N) / 2 + 2;
    (f.forEach((st, ot) =>
      st.forEach((rt, lt) => {
        let ht = q[ot][lt];
        ((rt.count = ht),
          (rt.visible = ht > 0),
          ht &&
            ((rt.instanceMatrix.needsUpdate = !0),
            (rt.instanceColor.needsUpdate = !0),
            rt.boundingSphere.center.set(nt, r + 1, Q),
            (rt.boundingSphere.radius = et)));
      }),
    ),
      (E.drawn = j),
      (E.showDrawn = K));
  }
  return {
    group: c,
    update: C,
    people: S,
    show: w,
    stats: E,
    nav: y,
    setNight: (I) => {
      P.night = I;
    },
  };
}
