// app 105 — math
// Lines 79745-80362 of readable/app.pretty.js (statement-aligned).
function r7(i, t, e = null) {
  let s = new ke();
  s.name = "Tunnels";
  let n = [],
    o = [],
    a = new Ee({ color: 16777215, roughness: 0.4, vertexColors: !0 });
  ((a.userData.mbAlbedo = Oh), (a.userData.dayGlow = 0.6), o.push(a));
  let r = new Ee({ color: 16777215, roughness: 0.9, vertexColors: !0 }),
    l = new Ce(),
    c = new Ce(),
    h = [0.5, 0.49, 0.46, 0],
    f = [0.4, 0.39, 0.37, 0],
    u = [0.2, 0.2, 0.19, 0];
  for (let p of e || i.tunnels || []) {
    let { tn: m, E: g } = p;
    if (m.open || !p.foot) continue;
    let b = new Ce(),
      x = new Ee({
        color: 16777215,
        roughness: 0.6,
        vertexColors: !0,
        side: Ss,
      });
    ((x.userData.mbAlbedo = Aft.replace(
      "GLOW_RGB",
      m.glow.map((T) => T.toFixed(3)).join(", "),
    )),
      (x.userData.mbSkyVis = 1));
    let v = [...m.col, 0],
      y = (T) => Math.max(0.05, 0.6 * Math.exp(-Math.min(T, p.L - T) / 12)),
      M = (T) => {
        let E = Ot(g, Math.min(g.L, Math.max(0, T)), {});
        return { x: E.x, z: E.z, y: E.y, nx: -E.dz, nz: E.dx };
      },
      S = -p.uz,
      w = p.ux,
      z = (T, E, A) => [T.x + T.nx * E, A, T.z + T.nz * E],
      _ = Math.max(2, Math.ceil(p.L / 4));
    for (let T of p.bores) {
      for (let E = 0; E < _; E++) {
        let A = (p.L * E) / _,
          C = (p.L * (E + 1)) / _,
          P = M(A),
          I = M(C),
          L = Cc(p, T, A),
          F = Cc(p, T, C),
          N = Cc(p, T, (A + C) / 2),
          B = o7(p, L, P.y),
          H = o7(p, F, I.y);
        b.sky = (O, D, U) => y((A + C) / 2);
        for (let O = 0; O + 1 < B.length; O++) {
          let D = z(P, B[O][0], B[O][1]),
            U = z(P, B[O + 1][0], B[O + 1][1]),
            G = z(I, H[O][0], H[O][1]),
            q = z(I, H[O + 1][0], H[O + 1][1]),
            W = (B[O][0] + B[O + 1][0]) / 2 - (N.v0 + N.v1) / 2,
            V = (B[O][1] + B[O + 1][1]) / 2 - (P.y + Ic(m) * 0.6),
            Y = Math.hypot(W, V) || 1,
            $ = [-(S * W) / Y, -V / Y, -(w * W) / Y];
          b.quad(
            D,
            G,
            q,
            U,
            [A, B[O][1] - P.y],
            [C, H[O][1] - I.y],
            [C, H[O + 1][1] - I.y],
            [A, B[O + 1][1] - P.y],
            v,
            $,
          );
        }
        ((b.sky = () => 0.05),
          b.quad(
            z(P, L.v0, P.y - 0.06),
            z(P, L.v1, P.y - 0.06),
            z(I, F.v1, I.y - 0.06),
            z(I, F.v0, I.y - 0.06),
            [A, 0],
            [A, 1],
            [C, 1],
            [C, 0],
            u,
            [0, 1, 0],
          ),
          (b.sky = (O, D, U) => y((A + C) / 2)));
        for (let [O, D, U, G] of [
          [L.v0, T.v0 + lo, F.v0, T.v0 + lo],
          [T.v1 - lo, L.v1, T.v1 - lo, F.v1],
        ]) {
          if (Math.abs((O + D) / 2) < 1.5 || D - O < 0.2 || G - U < 0.2)
            continue;
          b.quad(
            z(P, O, P.y + 0.25),
            z(P, D, P.y + 0.25),
            z(I, G, I.y + 0.25),
            z(I, U, I.y + 0.25),
            [A, 0],
            [A, 1],
            [C, 1],
            [C, 0],
            h,
            [0, 1, 0],
          );
          let q = O < 0,
            W = q ? D : O,
            V = q ? G : U;
          b.quad(
            z(P, W, P.y - 0.1),
            z(I, V, I.y - 0.1),
            z(I, V, I.y + 0.25),
            z(P, W, P.y + 0.25),
            [A, 0],
            [C, 0],
            [C, 0.3],
            [A, 0.3],
            f,
            [q ? S : -S, 0, q ? w : -w],
          );
        }
      }
      for (let E = 4; E < p.L - 2; E += m.lampStep || 8) {
        let A = Cc(p, T, E),
          C = M(E),
          P = C.y + (m.shape === "box" ? au(m) - 0.15 : Ic(m) + 0.2);
        for (let I of m.lampRows
          ? m.lampRows.map((L) => (A.v0 + A.v1) / 2 + (L * (A.v1 - A.v0)) / 2)
          : m.shape === "box"
            ? [(A.v0 + A.v1) / 2]
            : [A.v0 + 0.25, A.v1 - 0.25]) {
          let L = z(C, I, P),
            F = 0.8,
            N = 0.12,
            B = (q, W) => [L[0] + p.ux * q + S * W, L[2] + p.uz * q + w * W],
            H = B(-F, -N),
            O = B(F, -N),
            D = B(F, N),
            U = B(-F, N),
            G = [...m.glow, 0];
          (l.quad(
            [H[0], P, H[1]],
            [O[0], P, O[1]],
            [D[0], P, D[1]],
            [U[0], P, U[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            G,
            [0, -1, 0],
          ),
            l.quad(
              [H[0], P, H[1]],
              [U[0], P, U[1]],
              [D[0], P, D[1]],
              [O[0], P, O[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              G,
              [0, 1, 0],
            ));
        }
      }
      for (let E of [-1, 1])
        for (let A = 0; A < p.L; A += 20) {
          let C = Math.min(p.L, A + 20),
            P = M((A + C) / 2),
            I = Cc(p, T, (A + C) / 2),
            L = E < 0 ? I.v0 + 0.5 : I.v1 - 0.5;
          n.push({
            t: "obb",
            x: P.x + S * L,
            z: P.z + w * L,
            hx: 0.5,
            hz: (C - A) / 2 + 0.3,
            c: p.uz,
            s: p.ux,
            wall: !0,
            y0: P.y - 2,
            y1: P.y + 4,
          });
        }
    }
    {
      let T = p.roof + 0.15;
      c.sky = () => 0.6;
      for (let E = 0; E < _; E++) {
        let A = (p.L * E) / _,
          C = (p.L * (E + 1)) / _,
          P = M(A),
          I = M(C),
          L = (A + C) / 2,
          F = Math.min(...p.bores.map((O) => Cc(p, O, L).v0)) - 0.08,
          N = Math.max(...p.bores.map((O) => Cc(p, O, L).v1)) + 0.08,
          B = (O) => {
            let D = z(P, (O < 0 ? F : N) + O * 5.5, 0);
            return t
              ? Math.min(
                  P.y + T - 0.5,
                  Math.max(P.y - 0.45, t.terrainAt(D[0], D[2]) - 0.1),
                )
              : P.y - 0.45;
          },
          H = (O) => {
            let D = z(I, (O < 0 ? F : N) + O * 5.5, 0);
            return t
              ? Math.min(
                  I.y + T - 0.5,
                  Math.max(I.y - 0.45, t.terrainAt(D[0], D[2]) - 0.1),
                )
              : I.y - 0.45;
          };
        c.quad(
          z(P, F, P.y + T),
          z(I, F, I.y + T),
          z(I, N, I.y + T),
          z(P, N, P.y + T),
          [A, F],
          [C, F],
          [C, N],
          [A, N],
          f,
          [0, 1, 0],
        );
        for (let [O, D] of [
          [F, -1],
          [N, 1],
        ]) {
          let U = B(D),
            G = H(D),
            q = [S * D, 0, w * D];
          c.quad(
            z(P, O, Math.min(P.y - 3, U - 1)),
            z(I, O, Math.min(I.y - 3, G - 1)),
            z(I, O, I.y + T),
            z(P, O, P.y + T),
            [A, 0],
            [C, 0],
            [C, 1],
            [A, 1],
            h,
            q,
          );
          let W = (Y, $) =>
              !p.noClip &&
              (i.tunnels || []).some(
                (st) =>
                  !st.tn.open &&
                  !st.noClip &&
                  st !== p &&
                  st.box &&
                  Y[0] > st.box[0] - 1 &&
                  Y[0] < st.box[2] + 1 &&
                  Y[2] > st.box[1] - 1 &&
                  Y[2] < st.box[3] + 1 &&
                  gy(st, Y[0], $, Y[2], 0),
              ),
            V = 5.5;
          if (t?.surfaceAt)
            for (let Y of [0.5, 1.5, 3, 4.5, 5.5]) {
              let $ = z(P, O + D * Y, 0),
                st = z(I, O + D * Y, 0);
              if (
                t.surfaceAt($[0], $[2]) === "road" ||
                t.surfaceAt(st[0], st[2]) === "road" ||
                W($, U) ||
                W(st, G)
              ) {
                V = Math.max(0, Y - 1);
                break;
              }
            }
          V > 0.2 &&
            c.quad(
              z(P, O, U),
              z(I, O, G),
              z(I, O + D * V, G),
              z(P, O + D * V, U),
              [A, 0],
              [C, 0],
              [C, 1],
              [A, 1],
              f,
              [0, 1, 0],
            );
        }
      }
    }
    let R = new _e(b.geometry(), x);
    if (
      ((R.name = "tunnel_" + m.key),
      (R.castShadow = !0),
      (R.receiveShadow = !0),
      (R.matrixAutoUpdate = !1),
      s.add(R),
      m.portals)
    )
      for (let T = 0; T < 2; T++) {
        let E = T ? p.L : 0,
          A = T ? 1 : -1,
          C = M(E),
          P = p.top[T],
          I = p.W + 6,
          [L, F] = p.hw?.[T] || [I, I],
          N = (Q, j, X) => {
            let K = M(Q);
            return [K.x + K.nx * j, X, K.z + K.nz * j];
          };
        if (t?.terrainAt) {
          let Q = p.foot[T];
          for (let j = -L; j <= F; j += 0.5)
            for (let X of [0.3, 1.5]) {
              let K = N(E + A * X, j, 0);
              Q = Math.min(Q, t.terrainAt(K[0], K[2]) - 0.3);
            }
          for (let j of [-L - 0.3, F + 0.3])
            for (let X = 0; X <= Lc; X += 1) {
              let K = N(E - A * X, j, 0);
              Q = Math.min(Q, t.terrainAt(K[0], K[2]) - 0.3);
            }
          p.foot[T] = Math.max(C.y - 6, Q);
        }
        let B = p.foot[T],
          H = [new Re(-L, B), new Re(F, B), new Re(F, P), new Re(-L, P)],
          O = p.bores.map((Q) =>
            Tft(p, Cc(p, Q, E), Q, C.y)
              .map(([j, X]) => new Re(j, Math.max(X, B + 0.05)))
              .reverse(),
          ),
          D = mo.triangulateShape(H, O),
          U = [...H, ...O.flat()],
          G = [p.ux * A, 0, p.uz * A],
          q = c.v,
          W = Math.min(0.9, 0.5);
        c.sky = () => W;
        let V = m.key === "stockton" && T === 0,
          Y = V ? IS : h;
        for (let Q of U) {
          let j = N(E, Q.x, Q.y);
          c.vert(j[0], j[1], j[2], G[0], G[1], G[2], Q.x, Q.y, Y);
        }
        for (let [Q, j, X] of D)
          T ? c.tri(q + Q, q + j, q + X) : c.tri(q + Q, q + X, q + j);
        let $ = E - A * Lc,
          st = (Q, j, X) => N(Q, j, X);
        (c.quad(
          st(E, -L, P),
          st(E, F, P),
          st($, F, P),
          st($, -L, P),
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          f,
          [0, 1, 0],
        ),
          c.quad(
            st(E + A * 0.35, -L - 0.35, P - 0.6),
            st(E + A * 0.35, F + 0.35, P - 0.6),
            st(E + A * 0.35, F + 0.35, P + 0.25),
            st(E + A * 0.35, -L - 0.35, P + 0.25),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            G,
          ),
          c.quad(
            st(E + A * 0.35, -L - 0.35, P + 0.25),
            st(E + A * 0.35, F + 0.35, P + 0.25),
            st(E, F + 0.35, P + 0.25),
            st(E, -L - 0.35, P + 0.25),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            [0, 1, 0],
          ));
        for (let Q of [-L, F])
          c.quad(
            st(E, Q, B),
            st($, Q, B),
            st($, Q, P),
            st(E, Q, P),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            [S * Math.sign(Q), 0, w * Math.sign(Q)],
          );
        if (m.key === "broadway" && T === 1) {
          let Q = [0.16, 0.16, 0.15, 0];
          for (let j = -I + 1.2; j < I - 0.8; j += 1.6) {
            let X = N(E + A * 0.03, j, P - 1.6),
              K = N(E + A * 0.03, j + 0.55, P - 1.6),
              nt = N(E + A * 0.03, j + 0.55, P - 1.05),
              Z = N(E + A * 0.03, j, P - 1.05);
            c.quad(X, K, nt, Z, [0, 0], [1, 0], [1, 1], [0, 1], Q, G);
          }
        }
        if (
          (m.key === "broadway" && t?.probe && Cft(p, T, C, A, c, n, t, h, f),
          V)
        ) {
          let Q = (Z) => E + A * Z,
            j = (Z, et, tt, it, rt, lt, ct) => {
              let dt = (ot, at, yt) => N(Q(ot), at, yt),
                ut = (ot, at, yt, vt, Pt) =>
                  c.quad(
                    ot,
                    at,
                    yt,
                    vt,
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    ct,
                    Pt,
                  );
              (ut(
                dt(et, tt, rt),
                dt(et, it, rt),
                dt(et, it, lt),
                dt(et, tt, lt),
                G,
              ),
                ut(
                  dt(Z, tt, lt),
                  dt(et, tt, lt),
                  dt(et, it, lt),
                  dt(Z, it, lt),
                  [0, 1, 0],
                ),
                ut(
                  dt(Z, tt, rt),
                  dt(et, tt, rt),
                  dt(et, tt, lt),
                  dt(Z, tt, lt),
                  [-S, 0, -w],
                ),
                ut(
                  dt(et, it, rt),
                  dt(Z, it, rt),
                  dt(Z, it, lt),
                  dt(et, it, lt),
                  [S, 0, w],
                ),
                ut(
                  dt(et, tt, rt),
                  dt(Z, tt, rt),
                  dt(Z, it, rt),
                  dt(et, it, rt),
                  [0, -1, 0],
                ));
            },
            X = p.W + lo,
            K = C.y + Ic(m),
            nt = 13;
          for (let Z = 0; Z < nt; Z++) {
            let et = (Math.PI * Z) / nt,
              tt = (Math.PI * (Z + 1)) / nt,
              it = Z % 2 ? 1.25 : 1,
              rt = 0.32,
              lt = [Math.cos(et) * X, K + ((Math.sin(et) * Wl(m)) / 2) * 2.4],
              ct = [Math.cos(tt) * X, K + ((Math.sin(tt) * Wl(m)) / 2) * 2.4],
              dt = [
                Math.cos(et) * (X + it),
                K + Math.sin(et) * (Wl(m) * 1.2 + it),
              ],
              ut = [
                Math.cos(tt) * (X + it),
                K + Math.sin(tt) * (Wl(m) * 1.2 + it),
              ];
            (c.quad(
              N(Q(rt), lt[0], lt[1]),
              N(Q(rt), ct[0], ct[1]),
              N(Q(rt), ut[0], ut[1]),
              N(Q(rt), dt[0], dt[1]),
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              ib,
              G,
            ),
              c.quad(
                N(Q(0), dt[0], dt[1]),
                N(Q(rt), dt[0], dt[1]),
                N(Q(rt), ut[0], ut[1]),
                N(Q(0), ut[0], ut[1]),
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                IS,
                [0, 1, 0],
              ));
          }
          j(
            0,
            0.55,
            -0.7,
            0.7,
            K + Wl(m) * 1.2 - 0.3,
            K + Wl(m) * 1.2 + 1.6,
            ib,
          );
          for (let Z of [-1, 1])
            for (let et = C.y - 0.3; et < P - 1.4; et += 0.9)
              j(
                0,
                et % 1.8 < 0.9 ? 0.45 : 0.35,
                Z * (X + 1.6),
                Z * (X + 3),
                et,
                et + 0.82,
                ib,
              );
          (j(0, 0.7, -I, I, P - 1.3, P - 0.55, ib),
            j(0, 0.45, -I, I, P - 1.6, P - 1.3, IS),
            j(-0.3, 0.3, -I, I, P, P + 0.25, IS),
            j(-0.25, 0.25, -I, I, P + 0.95, P + 1.15, ib));
          for (let Z = -I + 0.3; Z < I - 0.2; Z += 0.4)
            j(-0.09, 0.09, Z - 0.08, Z + 0.08, P + 0.25, P + 0.95, ib);
        }
        if (m.portals === "hood") {
          let Q = [0.62, 0.61, 0.57, 0],
            j = 0.9,
            X = 0.3,
            K = C.y - 0.4,
            nt = C.y + au(m),
            Z = (et, tt, it, rt) => {
              let lt = (dt, ut, ot) => N(E + A * dt, ut, ot),
                ct = (dt, ut, ot, at, yt) =>
                  c.quad(dt, ut, ot, at, [0, 0], [1, 0], [1, 1], [0, 1], Q, yt);
              (ct(
                lt(X, et, it),
                lt(X, tt, it),
                lt(X, tt, rt),
                lt(X, et, rt),
                G,
              ),
                ct(
                  lt(0, et, rt),
                  lt(X, et, rt),
                  lt(X, tt, rt),
                  lt(0, tt, rt),
                  [0, 1, 0],
                ),
                ct(lt(0, et, it), lt(X, et, it), lt(X, et, rt), lt(0, et, rt), [
                  -S,
                  0,
                  -w,
                ]),
                ct(lt(X, tt, it), lt(0, tt, it), lt(0, tt, rt), lt(X, tt, rt), [
                  S,
                  0,
                  w,
                ]),
                ct(
                  lt(X, et, it),
                  lt(0, et, it),
                  lt(0, tt, it),
                  lt(X, tt, it),
                  [0, -1, 0],
                ));
            };
          for (let et of p.bores) {
            let tt = Cc(p, et, E);
            (Z(tt.v0 - j, tt.v1 + j, nt, nt + j),
              Z(tt.v0 - j, tt.v0, K, nt),
              Z(tt.v1, tt.v1 + j, K, nt));
          }
        }
        for (let [Q, j] of [
          [-(L + p.W + lo) / 2, L],
          [(F + p.W + lo) / 2, F],
        ]) {
          if (j - p.W - lo < 0.2) continue;
          let X = N(E - A * 0.5, Q, 0);
          n.push({
            t: "obb",
            x: X[0],
            z: X[2],
            hx: (j - p.W - lo) / 2,
            hz: 0.6,
            c: p.uz,
            s: p.ux,
            wall: !0,
            y0: C.y - 2,
            y1: P,
          });
        }
      }
  }
  (zft(i, c, n), IW(i, c, n, t.CURB));
  let d = new _e(c.geometry(), Object.assign(r, { side: Ss }));
  if (
    ((d.name = "tunnelPortals"),
    (d.castShadow = !0),
    (d.receiveShadow = !0),
    (d.matrixAutoUpdate = !1),
    (r.userData.mbSkyVis = 1),
    s.add(d),
    !l.empty)
  ) {
    let p = new _e(l.geometry(), a);
    ((p.name = "tunnelLamps"), (p.matrixAutoUpdate = !1), s.add(p));
  }
  return { group: s, colliders: n, night: o };
}
