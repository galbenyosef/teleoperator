// app 85 — math
// Lines 72265-72750 of readable/app.pretty.js (statement-aligned).
function ZG(i, { max: t = 70, map: e = null, seed: s = 39 } = {}) {
  let n = s,
    o = () => (n = (n * 16807) % 2147483647) / 2147483647,
    a = Z5(i),
    r = i.Yd,
    l = new Ee({ color: 16777215, roughness: 0.8, metalness: 0, map: e });
  ((l.userData.mbAlbedo = Fd),
    (l.userData.mbWind = -1),
    (l.userData.mbSkyVis = 2),
    (l.name = "pier39 visitors"));
  let c = new ke();
  c.name = "Pier39Crowd";
  let h = Or() ? new R0("Pier39Vox", t + jR) : null;
  h && c.add(h.group);
  let f = h
      ? []
      : Br.map((I, L) =>
          [0, 1].map((F) => {
            let N = new zn(Id(I, F), l, t + jR);
            return (
              (N.count = 0),
              (N.frustumCulled = !1),
              (N.castShadow = F === 0),
              (N.receiveShadow = !0),
              (N.name = `p39ped${L}_lod${F}`),
              (N.userData.mbMover = !0),
              (N.matrixAutoUpdate = !1),
              N.setColorAt(0, new $t(1, 1, 1)),
              (N.boundingSphere = new _n(new xt(), 1)),
              (N.visible = !1),
              c.add(N),
              N
            );
          }),
        ),
    u = new Uint8Array(a.nx * a.nz);
  for (let I of i.colliders) {
    if (I.t === "poly") continue;
    let L = (I.t === "circ" ? I.r : Math.hypot(I.hx, I.hz)) + 0.5;
    for (let F = Math.floor(I.z - L); F <= I.z + L; F++)
      for (let N = Math.floor(I.x - L); N <= I.x + L; N++) {
        let B = Math.floor(N - a.x0),
          H = Math.floor(F - a.z0);
        B >= 0 &&
          H >= 0 &&
          B < a.nx &&
          H < a.nz &&
          Math.hypot(N + 0.5 - I.x, F + 0.5 - I.z) <= L &&
          (u[H * a.nx + B] = 1);
      }
  }
  let d = (I, L) => {
      let F = Math.floor(I - a.x0),
        N = Math.floor(L - a.z0);
      return F < 0 || N < 0 || F >= a.nx || N >= a.nz || u[N * a.nx + F] === 1;
    },
    p = (I, L, F, N) => {
      let B = Math.hypot(F - I, N - L);
      for (let H = 0; H <= B; H += 0.5) {
        let O = H / B,
          D = I + (F - I) * O,
          U = L + (N - L) * O;
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
      for (let N = 0; N < 24; N++) {
        let B = m[Math.floor(o() * m.length)],
          H = Math.hypot(B[0] - I, B[1] - L);
        if (H > 4 && H < F && p(I, L, B[0], B[1])) return B;
      }
      return null;
    },
    b = [],
    [x, v] = i.lions;
  for (let I of m)
    a.at(I[0], I[1]) < 1.6 &&
      Math.hypot(I[0] - x, I[1] - v) < 75 &&
      !i.inHouse(I[0], I[1], 3) &&
      b.push([I[0], I[1], x - I[0], v - I[1]]);
  if (i.carousel) {
    let { x: I, z: L, r: F } = i.carousel;
    for (let N = 0; N < 14; N++) {
      let B = (N / 14) * Math.PI * 2,
        H = I + Math.cos(B) * (F + 2.3),
        O = L + Math.sin(B) * (F + 2.3);
      a.at(H, O) > 0.9 && b.push([H, O, I - H, L - O]);
    }
  }
  let y = new Od({ statics: YG(i.colliders) }),
    M = (I, L, F) => {
      let N = a.at(L, F),
        B = 0.3 + 0.05;
      if (N >= B) return null;
      let H = a.at(L + 0.5, F) - a.at(L - 0.5, F),
        O = a.at(L, F + 0.5) - a.at(L, F - 0.5),
        D = Math.hypot(H, O);
      return D < 1e-6
        ? null
        : [(H / D) * Math.min(0.3, B - N), (O / D) * Math.min(0.3, B - N)];
    },
    S = [];
  for (let I = 0; I < t && m.length; I++) {
    let L = Math.floor(o() * Br.length),
      F = 0.9 + o() * 0.17 - (Br[L].f ? 0.05 : 0),
      N = 0.95 + o() * 0.5,
      B = {
        B: L,
        sc: F,
        sw: 0.94 + o() * 0.14,
        seeds: [o(), o(), o()],
        speed: N,
        ph0: o() * 6.283,
        cad: (2 * Math.PI * N) / (1.37 * F),
        pose: 0,
        st: "stand",
        x: 0,
        z: 0,
        hx: 0,
        hz: 1,
        t: o() * 6,
        tx: 0,
        tz: 0,
        leap: null,
      };
    if (I < b.length * 0.6 && I % 3 === 0 && b.length) {
      let H = b[Math.floor(o() * b.length)];
      ((B.x = H[0] + (o() - 0.5) * 0.8), (B.z = H[1] + (o() - 0.5) * 0.8));
      let O = Math.hypot(H[2], H[3]) || 1;
      ((B.hx = H[2] / O),
        (B.hz = H[3] / O),
        (B.watch = !0),
        (B.t = -1e9),
        (B.pose = h
          ? o() < 0.35
            ? kn.photo
            : o() < 0.2
              ? kn.point
              : Bd(o)
          : o() < 0.4
            ? 2
            : 0));
    } else {
      let H = m[Math.floor(o() * m.length)];
      ((B.x = H[0] + (o() - 0.5)), (B.z = H[1] + (o() - 0.5)));
      let O = o() * 6.283;
      ((B.hx = Math.cos(O)),
        (B.hz = Math.sin(O)),
        (B.pose = o() < 0.15 ? 2 : 0));
    }
    S.push(B);
  }
  let w = [];
  if (i.f.stage) {
    let I = i.f.stage,
      L = (B, H) => [I.x + I.ux * B + I.nx * H, I.z + I.uz * B + I.nz * H],
      F = (B, H, O, D, U, G = 0) => {
        if (w.length >= (t < 50 ? 14 : jR)) return;
        let q = Math.floor(o() * Br.length),
          W = 0.9 + o() * 0.17 - (Br[q].f ? 0.05 : 0);
        w.push({
          B: q,
          sc: W,
          sw: 0.94 + o() * 0.14,
          seeds: [o(), o(), o()],
          speed: 1,
          ph0: o() * 6.283,
          cad: 0,
          pose: U,
          st: "show",
          show: !0,
          x: B,
          z: H,
          hx: O,
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
        if (o() < 0.3) continue;
        let [O, D] = L(B.a + H + (o() - 0.5) * 0.12, B.b);
        F(O, D, -I.nx, -I.nz, 4);
      }
    let N = Math.max(0, ...I.benches.map((B) => B.b));
    for (let B = 0; B < 6; B++) {
      let H = (B - 2.5) * 1.3 + (o() - 0.5) * 0.5,
        O = N + 1.6 + o() * 1.2,
        [D, U] = L(H, O);
      if (a.at(D, U) < 0.9 || d(D, U)) continue;
      let G = Math.hypot(I.x - D, I.z - U);
      F(D, U, (I.x - D) / G, (I.z - U) / G, o() < 0.3 ? 3 : 0);
    }
  }
  let z = (I) => {
      let L = g(I.x, I.z, 30);
      if (!L) {
        ((I.st = "stand"), (I.t = 2 + o() * 4));
        return;
      }
      ((I.tx = L[0] + (o() - 0.5) * 0.8),
        (I.tz = L[1] + (o() - 0.5) * 0.8),
        (I.st = "walk"),
        (I.pose = 0));
    },
    _ = new No(),
    R = new ye(),
    T = new _n(new xt(), 1.2),
    E = { n: S.length, drawn: 0, show: w.length },
    A = [...S, ...w],
    C = { night: 0 };
  function P(I, L, F) {
    let N = F.position.x,
      B = F.position.z,
      [H, O, D, U] = i.bb;
    if (Math.max(H - N, N - D, O - B, B - U) > Dht) {
      if (E.drawn) {
        for (let tt of f)
          for (let it of tt) ((it.count = 0), (it.visible = !1));
        (h?.hide(), (E.drawn = 0));
      }
      return;
    }
    I = Math.min(I, 0.1);
    let q = L?.vel?.x || 0,
      W = L?.vel?.z || 0,
      V = Math.hypot(q, W),
      Y = L?.pos?.x ?? 1e9,
      $ = L?.pos?.z ?? 1e9,
      st = L ? -Math.sin(L.psi) : 0,
      Q = L ? -Math.cos(L.psi) : 1;
    for (let tt of S) {
      if ((tt.mad > 0 && (tt.mad -= I), h)) {
        if (tt.kb) {
          xS(tt, I, (it, rt) => i.yAt(it, rt)) &&
            ((tt.st = "stand"), (tt.t = 1 + o()), (tt.watch = !1));
          continue;
        }
        if (L)
          for (let it of Q1(tt.x, tt.z, 7, L, null)) {
            if (it.sp <= 1.8) continue;
            let rt = Qg(tt.x + (tt.sx || 0), tt.z + (tt.sz || 0), it);
            if (rt) {
              ((tt.x += tt.sx || 0),
                (tt.z += tt.sz || 0),
                (tt.sx = tt.sz = 0),
                (tt.y = i.yAt(tt.x, tt.z)),
                iy(tt, it, rt),
                (tt.leap = null),
                (tt.st = "knock"),
                ba.onBump?.(Math.min(1, it.sp / 16), it, tt));
              break;
            }
          }
        if (tt.kb) continue;
      }
      if (tt.leap) {
        let it = tt.leap;
        it.t += I;
        let rt = Math.min(1, it.t / it.dur);
        ((tt.x += it.vx * I * (1 - rt * 0.6)),
          (tt.z += it.vz * I * (1 - rt * 0.6)),
          it.t >= it.dur &&
            ((tt.leap = null),
            (tt.st = "stand"),
            (tt.t = 0.5 + o()),
            h &&
              ((tt.x += tt.sx || 0),
              (tt.z += tt.sz || 0),
              (tt.sx = tt.sz = 0))));
      } else if (tt.st === "walk") {
        let it = tt.tx - tt.x,
          rt = tt.tz - tt.z,
          lt = Math.hypot(it, rt),
          ct = tt.speed * I;
        if (lt < 0.3)
          o() < 0.4
            ? ((tt.st = "stand"),
              (tt.t = 3 + o() * 9),
              (tt.pose = h ? Bd(o) : o() < 0.3 ? 2 : 0))
            : z(tt);
        else {
          let dt = h
            ? Math.max(0.12, Math.min(1, 1.6 - (tt.lag || 0) * 0.9))
            : 1;
          (h &&
            (tt.lag || 0) > 2 &&
            (tt.blk = (tt.blk || 0) + I) > 3 &&
            ((tt.blk = 0),
            (tt.x += tt.sx || 0),
            (tt.z += tt.sz || 0),
            (tt.sx = tt.sz = 0),
            z(tt)),
            (tt.hx += (it / lt - tt.hx) * Math.min(1, I * 5)),
            (tt.hz += (rt / lt - tt.hz) * Math.min(1, I * 5)));
          let ut = Math.hypot(tt.hx, tt.hz) || 1;
          ((tt.hx /= ut),
            (tt.hz /= ut),
            (tt.x += (it / lt) * ct * dt),
            (tt.z += (rt / lt) * ct * dt));
        }
      } else tt.watch || ((tt.t -= I) <= 0 && z(tt));
      if (L && V > 0.4) {
        let it = tt.x - Y,
          rt = tt.z - $,
          lt = q / V,
          ct = W / V,
          dt = it * lt + rt * ct,
          ut = it * ct - rt * lt;
        if (
          dt > -2.6 &&
          dt < (h ? 2 + V * 0.6 : 2.5 + V * 1.2) &&
          Math.abs(ut) < (h ? 1.3 : 1.6) &&
          !tt.leap
        ) {
          let ot = ut >= 0 ? 1 : -1;
          (a.at(tt.x + ct * ot * 1.5, tt.z - lt * ot * 1.5) < 0.5 && (ot = -ot),
            h &&
              ((tt.x += tt.sx || 0),
              (tt.z += tt.sz || 0),
              (tt.sx = tt.sz = 0)));
          let at = h ? 1.8 : Math.max(2.6, V * 0.9);
          ((tt.leap = {
            t: 0,
            dur: h ? 0.5 : 0.55,
            vx: ct * ot * at,
            vz: -lt * ot * at,
          }),
            (tt.st = "leap"),
            (tt.watch = !1));
        }
      }
      if (L && !h) {
        let it = tt.x - Y,
          rt = tt.z - $,
          lt = it * st + rt * Q,
          ct = it * Q - rt * st;
        if (Math.abs(lt) < 2.7 && Math.abs(ct) < 1.25) {
          let dt = ct >= 0 ? 1 : -1,
            ut = 1.25 - Math.abs(ct);
          ((tt.x += Q * dt * ut), (tt.z -= st * dt * ut));
        }
      }
      if (!h && a.at(tt.x, tt.z) <= 0) {
        let it = g(tt.x, tt.z, 12) || m[0];
        it &&
          Math.hypot(it[0] - tt.x, it[1] - tt.z) < 6 &&
          ((tt.x = it[0]), (tt.z = it[1]));
      }
    }
    if (
      (R.multiplyMatrices(F.projectionMatrix, F.matrixWorldInverse),
      _.setFromProjectionMatrix(R),
      h)
    ) {
      let tt = C.night > 0.5 ? S : A,
        it = L ? Q1(Y, $, 400, L, null) : [];
      for (let lt of tt)
        (lt.y === void 0 || !lt.kb) && (lt.y = i.yAt(lt.x, lt.z));
      (y.step(tt, I, it, {
        skip: (lt) => !!lt.kb,
        fixed: (lt) => !!lt.show,
        vmax: (lt) => (lt.leap ? 3 : Math.max(1.4, lt.speed * 1.35)),
        gain: (lt) => (lt.leap ? 12 : 3),
        wall: M,
      }),
        h.begin(I));
      let rt = 0;
      for (let lt of A) {
        if (lt.show && C.night > 0.5) continue;
        let ct = Math.hypot(lt.x - N, lt.z - B);
        if (ct > JG) continue;
        let dt = lt.x + (lt.sx || 0),
          ut = lt.z + (lt.sz || 0),
          ot = lt.kb,
          at = ot ? ot.y : i.yAt(dt, ut) + (lt.y0 || 0);
        if ((T.center.set(dt, at + 0.9, ut), !_.intersectsSphere(T))) continue;
        let yt = ot ? 0 : lt.vs || 0,
          vt = lt.st === "walk" || lt.leap ? yt > 0.08 : yt > 0.35,
          Pt = vt && yt > 0.25 && lt.vhx !== void 0 ? lt.vhx : lt.hx,
          jt = vt && yt > 0.25 && lt.vhx !== void 0 ? lt.vhz : lt.hz;
        (h.put(lt, dt, at, ut, Pt, jt, ct, {
          speed: vt && !lt.show ? Math.min(yt, 2) * (lt.mad > 0 ? 1.15 : 1) : 0,
          pose: ot
            ? kn.knock
            : lt.leap
              ? kn.leap
              : lt.st === "walk" && lt.pose !== 2
                ? 0
                : lt.pose,
          k: ot ? -ot.ang : lt.leap ? lt.leap.t / lt.leap.dur : 0,
          rnd: o,
          look: ot ? ni.dizzy : lt.mad > 0 ? ni.angry : null,
          snap: !!ot,
        }),
          lt.show && rt++);
      }
      (h.end(), (E.drawn = h.drawn), (E.showDrawn = rt));
      return;
    }
    let j = f.map(() => [0, 0]),
      X = 0,
      K = 0;
    for (let tt of A) {
      if (tt.show && C.night > 0.5) continue;
      let it = Math.hypot(tt.x - N, tt.z - B);
      if (it > JG) continue;
      let rt = i.yAt(tt.x, tt.z) + (tt.y0 || 0);
      if ((T.center.set(tt.x, rt + 0.9, tt.z), !_.intersectsSphere(T)))
        continue;
      let lt = it < Hht ? 0 : 1,
        ct = f[tt.B][lt],
        dt = j[tt.B][lt]++,
        ut = ct.instanceMatrix.array,
        ot = ct.instanceColor.array,
        at = dt * 16,
        yt = tt.sc,
        vt = yt * tt.sw,
        Pt = tt.hx,
        jt = tt.hz,
        Wt = tt.st === "walk";
      ((ut[at] = jt * vt),
        (ut[at + 1] = 0),
        (ut[at + 2] = -Pt * vt),
        (ut[at + 3] = tt.leap ? tt.leap.t / tt.leap.dur : tt.ph0),
        (ut[at + 4] = 0),
        (ut[at + 5] = yt),
        (ut[at + 6] = 0),
        (ut[at + 7] = Wt ? tt.cad : 0),
        (ut[at + 8] = Pt * vt),
        (ut[at + 9] = 0),
        (ut[at + 10] = jt * vt),
        (ut[at + 11] = tt.leap ? 1 : tt.pose),
        (ut[at + 12] = tt.x),
        (ut[at + 13] = rt),
        (ut[at + 14] = tt.z),
        (ut[at + 15] = 1),
        (ot[dt * 3] = tt.seeds[0]),
        (ot[dt * 3 + 1] = tt.seeds[1]),
        (ot[dt * 3 + 2] = tt.seeds[2]),
        X++,
        tt.show && K++);
    }
    let nt = (H + D) / 2,
      Z = (O + U) / 2,
      et = Math.hypot(D - H, U - O) / 2 + 2;
    (f.forEach((tt, it) =>
      tt.forEach((rt, lt) => {
        let ct = j[it][lt];
        ((rt.count = ct),
          (rt.visible = ct > 0),
          ct &&
            ((rt.instanceMatrix.needsUpdate = !0),
            (rt.instanceColor.needsUpdate = !0),
            rt.boundingSphere.center.set(nt, r + 1, Z),
            (rt.boundingSphere.radius = et)));
      }),
    ),
      (E.drawn = X),
      (E.showDrawn = K));
  }
  return {
    group: c,
    update: P,
    people: S,
    show: w,
    stats: E,
    nav: y,
    setNight: (I) => {
      C.night = I;
    },
  };
}
