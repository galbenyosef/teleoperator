// app 104 — math
// Lines 79981-80598 of readable/app.pretty.js (statement-aligned).
function BP(o, t, e = null) {
  let s = new le();
  s.name = "Tunnels";
  let n = [],
    i = [],
    a = new me({ color: 16777215, roughness: 0.4, vertexColors: !0 });
  ((a.userData.mbAlbedo = pf), (a.userData.dayGlow = 0.6), i.push(a));
  let r = new me({ color: 16777215, roughness: 0.9, vertexColors: !0 }),
    l = new Be(),
    c = new Be(),
    h = [0.5, 0.49, 0.46, 0],
    f = [0.4, 0.39, 0.37, 0],
    u = [0.2, 0.2, 0.19, 0];
  for (let p of e || o.tunnels || []) {
    let { tn: m, E: g } = p;
    if (m.open || !p.foot) continue;
    let b = new Be(),
      v = new me({
        color: 16777215,
        roughness: 0.6,
        vertexColors: !0,
        side: ls,
      });
    ((v.userData.mbAlbedo = Jpt.replace(
      "GLOW_RGB",
      m.glow.map((T) => T.toFixed(3)).join(", "),
    )),
      (v.userData.mbSkyVis = 1));
    let x = [...m.col, 0],
      y = (T) => Math.max(0.05, 0.6 * Math.exp(-Math.min(T, p.L - T) / 12)),
      M = (T) => {
        let E = Ot(g, Math.min(g.L, Math.max(0, T)), {});
        return { x: E.x, z: E.z, y: E.y, nx: -E.dz, nz: E.dx };
      },
      S = -p.uz,
      w = p.ux,
      _ = (T, E, R) => [T.x + T.nx * E, R, T.z + T.nz * E],
      z = Math.max(2, Math.ceil(p.L / 4));
    for (let T of p.bores) {
      for (let E = 0; E < z; E++) {
        let R = (p.L * E) / z,
          P = (p.L * (E + 1)) / z,
          C = M(R),
          I = M(P),
          L = rh(p, T, R),
          F = rh(p, T, P),
          O = rh(p, T, (R + P) / 2),
          B = FP(p, L, C.y),
          H = FP(p, F, I.y);
        b.sky = (N, D, U) => y((R + P) / 2);
        for (let N = 0; N + 1 < B.length; N++) {
          let D = _(C, B[N][0], B[N][1]),
            U = _(C, B[N + 1][0], B[N + 1][1]),
            G = _(I, H[N][0], H[N][1]),
            W = _(I, H[N + 1][0], H[N + 1][1]),
            V = (B[N][0] + B[N + 1][0]) / 2 - (O.v0 + O.v1) / 2,
            $ = (B[N][1] + B[N + 1][1]) / 2 - (C.y + ch(m) * 0.6),
            J = Math.hypot(V, $) || 1,
            X = [-(S * V) / J, -$ / J, -(w * V) / J];
          b.quad(
            D,
            G,
            W,
            U,
            [R, B[N][1] - C.y],
            [P, H[N][1] - I.y],
            [P, H[N + 1][1] - I.y],
            [R, B[N + 1][1] - C.y],
            x,
            X,
          );
        }
        ((b.sky = () => 0.05),
          b.quad(
            _(C, L.v0, C.y - 0.06),
            _(C, L.v1, C.y - 0.06),
            _(I, F.v1, I.y - 0.06),
            _(I, F.v0, I.y - 0.06),
            [R, 0],
            [R, 1],
            [P, 1],
            [P, 0],
            u,
            [0, 1, 0],
          ),
          (b.sky = (N, D, U) => y((R + P) / 2)));
        for (let [N, D, U, G] of [
          [L.v0, T.v0 + wo, F.v0, T.v0 + wo],
          [T.v1 - wo, L.v1, T.v1 - wo, F.v1],
        ]) {
          if (Math.abs((N + D) / 2) < 1.5 || D - N < 0.2 || G - U < 0.2)
            continue;
          b.quad(
            _(C, N, C.y + 0.25),
            _(C, D, C.y + 0.25),
            _(I, G, I.y + 0.25),
            _(I, U, I.y + 0.25),
            [R, 0],
            [R, 1],
            [P, 1],
            [P, 0],
            h,
            [0, 1, 0],
          );
          let W = N < 0,
            V = W ? D : N,
            $ = W ? G : U;
          b.quad(
            _(C, V, C.y - 0.1),
            _(I, $, I.y - 0.1),
            _(I, $, I.y + 0.25),
            _(C, V, C.y + 0.25),
            [R, 0],
            [P, 0],
            [P, 0.3],
            [R, 0.3],
            f,
            [W ? S : -S, 0, W ? w : -w],
          );
        }
      }
      for (let E = 4; E < p.L - 2; E += m.lampStep || 8) {
        let R = rh(p, T, E),
          P = M(E),
          C = P.y + (m.shape === "box" ? Gu(m) - 0.15 : ch(m) + 0.2);
        for (let I of m.lampRows
          ? m.lampRows.map((L) => (R.v0 + R.v1) / 2 + (L * (R.v1 - R.v0)) / 2)
          : m.shape === "box"
            ? [(R.v0 + R.v1) / 2]
            : [R.v0 + 0.25, R.v1 - 0.25]) {
          let L = _(P, I, C),
            F = 0.8,
            O = 0.12,
            B = (W, V) => [L[0] + p.ux * W + S * V, L[2] + p.uz * W + w * V],
            H = B(-F, -O),
            N = B(F, -O),
            D = B(F, O),
            U = B(-F, O),
            G = [...m.glow, 0];
          (l.quad(
            [H[0], C, H[1]],
            [N[0], C, N[1]],
            [D[0], C, D[1]],
            [U[0], C, U[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            G,
            [0, -1, 0],
          ),
            l.quad(
              [H[0], C, H[1]],
              [U[0], C, U[1]],
              [D[0], C, D[1]],
              [N[0], C, N[1]],
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
        for (let R = 0; R < p.L; R += 20) {
          let P = Math.min(p.L, R + 20),
            C = M((R + P) / 2),
            I = rh(p, T, (R + P) / 2),
            L = E < 0 ? I.v0 + 0.5 : I.v1 - 0.5;
          n.push({
            t: "obb",
            x: C.x + S * L,
            z: C.z + w * L,
            hx: 0.5,
            hz: (P - R) / 2 + 0.3,
            c: p.uz,
            s: p.ux,
            wall: !0,
            y0: C.y - 2,
            y1: C.y + 4,
          });
        }
    }
    {
      let T = p.roof + 0.15;
      c.sky = () => 0.6;
      for (let E = 0; E < z; E++) {
        let R = (p.L * E) / z,
          P = (p.L * (E + 1)) / z,
          C = M(R),
          I = M(P),
          L = (R + P) / 2,
          F = Math.min(...p.bores.map((N) => rh(p, N, L).v0)) - 0.08,
          O = Math.max(...p.bores.map((N) => rh(p, N, L).v1)) + 0.08,
          B = (N) => {
            let D = _(C, (N < 0 ? F : O) + N * 5.5, 0);
            return t
              ? Math.min(
                  C.y + T - 0.5,
                  Math.max(C.y - 0.45, t.terrainAt(D[0], D[2]) - 0.1),
                )
              : C.y - 0.45;
          },
          H = (N) => {
            let D = _(I, (N < 0 ? F : O) + N * 5.5, 0);
            return t
              ? Math.min(
                  I.y + T - 0.5,
                  Math.max(I.y - 0.45, t.terrainAt(D[0], D[2]) - 0.1),
                )
              : I.y - 0.45;
          };
        c.quad(
          _(C, F, C.y + T),
          _(I, F, I.y + T),
          _(I, O, I.y + T),
          _(C, O, C.y + T),
          [R, F],
          [P, F],
          [P, O],
          [R, O],
          f,
          [0, 1, 0],
        );
        for (let [N, D] of [
          [F, -1],
          [O, 1],
        ]) {
          let U = B(D),
            G = H(D),
            W = [S * D, 0, w * D];
          c.quad(
            _(C, N, Math.min(C.y - 3, U - 1)),
            _(I, N, Math.min(I.y - 3, G - 1)),
            _(I, N, I.y + T),
            _(C, N, C.y + T),
            [R, 0],
            [P, 0],
            [P, 1],
            [R, 1],
            h,
            W,
          );
          let V = (J, X) =>
              !p.noClip &&
              (o.tunnels || []).some(
                (tt) =>
                  !tt.tn.open &&
                  !tt.noClip &&
                  tt !== p &&
                  tt.box &&
                  J[0] > tt.box[0] - 1 &&
                  J[0] < tt.box[2] + 1 &&
                  J[2] > tt.box[1] - 1 &&
                  J[2] < tt.box[3] + 1 &&
                  hw(tt, J[0], X, J[2], 0),
              ),
            $ = 5.5;
          if (t?.surfaceAt)
            for (let J of [0.5, 1.5, 3, 4.5, 5.5]) {
              let X = _(C, N + D * J, 0),
                tt = _(I, N + D * J, 0);
              if (
                t.surfaceAt(X[0], X[2]) === "road" ||
                t.surfaceAt(tt[0], tt[2]) === "road" ||
                V(X, U) ||
                V(tt, G)
              ) {
                $ = Math.max(0, J - 1);
                break;
              }
            }
          $ > 0.2 &&
            c.quad(
              _(C, N, U),
              _(I, N, G),
              _(I, N + D * $, G),
              _(C, N + D * $, U),
              [R, 0],
              [P, 0],
              [P, 1],
              [R, 1],
              f,
              [0, 1, 0],
            );
        }
      }
    }
    let A = new ye(b.geometry(), v);
    if (
      ((A.name = "tunnel_" + m.key),
      (A.castShadow = !0),
      (A.receiveShadow = !0),
      (A.matrixAutoUpdate = !1),
      s.add(A),
      m.portals)
    )
      for (let T = 0; T < 2; T++) {
        let E = T ? p.L : 0,
          R = T ? 1 : -1,
          P = M(E),
          C = p.top[T],
          I = p.W + 6,
          [L, F] = p.hw?.[T] || [I, I],
          O = (Z, q, j) => {
            let K = M(Z);
            return [K.x + K.nx * q, j, K.z + K.nz * q];
          };
        if (t?.terrainAt) {
          let Z = p.foot[T];
          for (let q = -L; q <= F; q += 0.5)
            for (let j of [0.3, 1.5]) {
              let K = O(E + R * j, q, 0);
              Z = Math.min(Z, t.terrainAt(K[0], K[2]) - 0.3);
            }
          for (let q of [-L - 0.3, F + 0.3])
            for (let j = 0; j <= lh; j += 1) {
              let K = O(E - R * j, q, 0);
              Z = Math.min(Z, t.terrainAt(K[0], K[2]) - 0.3);
            }
          p.foot[T] = Math.max(P.y - 6, Z);
        }
        let B = p.foot[T],
          H = [new Pe(-L, B), new Pe(F, B), new Pe(F, C), new Pe(-L, C)],
          N = p.bores.map((Z) =>
            Ypt(p, rh(p, Z, E), Z, P.y)
              .map(([q, j]) => new Pe(q, Math.max(j, B + 0.05)))
              .reverse(),
          ),
          D = So.triangulateShape(H, N),
          U = [...H, ...N.flat()],
          G = [p.ux * R, 0, p.uz * R],
          W = c.v,
          V = Math.min(0.9, 0.5);
        c.sky = () => V;
        let $ = m.key === "stockton" && T === 0,
          J = $ ? Fk : h;
        for (let Z of U) {
          let q = O(E, Z.x, Z.y);
          c.vert(q[0], q[1], q[2], G[0], G[1], G[2], Z.x, Z.y, J);
        }
        for (let [Z, q, j] of D)
          T ? c.tri(W + Z, W + q, W + j) : c.tri(W + Z, W + j, W + q);
        let X = E - R * lh,
          tt = (Z, q, j) => O(Z, q, j);
        (c.quad(
          tt(E, -L, C),
          tt(E, F, C),
          tt(X, F, C),
          tt(X, -L, C),
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          f,
          [0, 1, 0],
        ),
          c.quad(
            tt(E + R * 0.35, -L - 0.35, C - 0.6),
            tt(E + R * 0.35, F + 0.35, C - 0.6),
            tt(E + R * 0.35, F + 0.35, C + 0.25),
            tt(E + R * 0.35, -L - 0.35, C + 0.25),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            G,
          ),
          c.quad(
            tt(E + R * 0.35, -L - 0.35, C + 0.25),
            tt(E + R * 0.35, F + 0.35, C + 0.25),
            tt(E, F + 0.35, C + 0.25),
            tt(E, -L - 0.35, C + 0.25),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            [0, 1, 0],
          ));
        for (let Z of [-L, F])
          c.quad(
            tt(E, Z, B),
            tt(X, Z, B),
            tt(X, Z, C),
            tt(E, Z, C),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            f,
            [S * Math.sign(Z), 0, w * Math.sign(Z)],
          );
        if (m.key === "broadway" && T === 1) {
          let Z = [0.16, 0.16, 0.15, 0];
          for (let q = -I + 1.2; q < I - 0.8; q += 1.6) {
            let j = O(E + R * 0.03, q, C - 1.6),
              K = O(E + R * 0.03, q + 0.55, C - 1.6),
              nt = O(E + R * 0.03, q + 0.55, C - 1.05),
              Q = O(E + R * 0.03, q, C - 1.05);
            c.quad(j, K, nt, Q, [0, 0], [1, 0], [1, 1], [0, 1], Z, G);
          }
        }
        if (
          (m.key === "broadway" && t?.probe && t1t(p, T, P, R, c, n, t, h, f),
          $)
        ) {
          let Z = (Q) => E + R * Q,
            q = (Q, et, st, ot, rt, lt, ht) => {
              let pt = (it, at, yt) => O(Z(it), at, yt),
                ut = (it, at, yt, vt, At) =>
                  c.quad(
                    it,
                    at,
                    yt,
                    vt,
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    ht,
                    At,
                  );
              (ut(
                pt(et, st, rt),
                pt(et, ot, rt),
                pt(et, ot, lt),
                pt(et, st, lt),
                G,
              ),
                ut(
                  pt(Q, st, lt),
                  pt(et, st, lt),
                  pt(et, ot, lt),
                  pt(Q, ot, lt),
                  [0, 1, 0],
                ),
                ut(
                  pt(Q, st, rt),
                  pt(et, st, rt),
                  pt(et, st, lt),
                  pt(Q, st, lt),
                  [-S, 0, -w],
                ),
                ut(
                  pt(et, ot, rt),
                  pt(Q, ot, rt),
                  pt(Q, ot, lt),
                  pt(et, ot, lt),
                  [S, 0, w],
                ),
                ut(
                  pt(et, st, rt),
                  pt(Q, st, rt),
                  pt(Q, ot, rt),
                  pt(et, ot, rt),
                  [0, -1, 0],
                ));
            },
            j = p.W + wo,
            K = P.y + ch(m),
            nt = 13;
          for (let Q = 0; Q < nt; Q++) {
            let et = (Math.PI * Q) / nt,
              st = (Math.PI * (Q + 1)) / nt,
              ot = Q % 2 ? 1.25 : 1,
              rt = 0.32,
              lt = [Math.cos(et) * j, K + ((Math.sin(et) * hc(m)) / 2) * 2.4],
              ht = [Math.cos(st) * j, K + ((Math.sin(st) * hc(m)) / 2) * 2.4],
              pt = [
                Math.cos(et) * (j + ot),
                K + Math.sin(et) * (hc(m) * 1.2 + ot),
              ],
              ut = [
                Math.cos(st) * (j + ot),
                K + Math.sin(st) * (hc(m) * 1.2 + ot),
              ];
            (c.quad(
              O(Z(rt), lt[0], lt[1]),
              O(Z(rt), ht[0], ht[1]),
              O(Z(rt), ut[0], ut[1]),
              O(Z(rt), pt[0], pt[1]),
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              jb,
              G,
            ),
              c.quad(
                O(Z(0), pt[0], pt[1]),
                O(Z(rt), pt[0], pt[1]),
                O(Z(rt), ut[0], ut[1]),
                O(Z(0), ut[0], ut[1]),
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                Fk,
                [0, 1, 0],
              ));
          }
          q(
            0,
            0.55,
            -0.7,
            0.7,
            K + hc(m) * 1.2 - 0.3,
            K + hc(m) * 1.2 + 1.6,
            jb,
          );
          for (let Q of [-1, 1])
            for (let et = P.y - 0.3; et < C - 1.4; et += 0.9)
              q(
                0,
                et % 1.8 < 0.9 ? 0.45 : 0.35,
                Q * (j + 1.6),
                Q * (j + 3),
                et,
                et + 0.82,
                jb,
              );
          (q(0, 0.7, -I, I, C - 1.3, C - 0.55, jb),
            q(0, 0.45, -I, I, C - 1.6, C - 1.3, Fk),
            q(-0.3, 0.3, -I, I, C, C + 0.25, Fk),
            q(-0.25, 0.25, -I, I, C + 0.95, C + 1.15, jb));
          for (let Q = -I + 0.3; Q < I - 0.2; Q += 0.4)
            q(-0.09, 0.09, Q - 0.08, Q + 0.08, C + 0.25, C + 0.95, jb);
        }
        if (m.portals === "hood") {
          let Z = [0.62, 0.61, 0.57, 0],
            q = 0.9,
            j = 0.3,
            K = P.y - 0.4,
            nt = P.y + Gu(m),
            Q = (et, st, ot, rt) => {
              let lt = (pt, ut, it) => O(E + R * pt, ut, it),
                ht = (pt, ut, it, at, yt) =>
                  c.quad(pt, ut, it, at, [0, 0], [1, 0], [1, 1], [0, 1], Z, yt);
              (ht(
                lt(j, et, ot),
                lt(j, st, ot),
                lt(j, st, rt),
                lt(j, et, rt),
                G,
              ),
                ht(
                  lt(0, et, rt),
                  lt(j, et, rt),
                  lt(j, st, rt),
                  lt(0, st, rt),
                  [0, 1, 0],
                ),
                ht(lt(0, et, ot), lt(j, et, ot), lt(j, et, rt), lt(0, et, rt), [
                  -S,
                  0,
                  -w,
                ]),
                ht(lt(j, st, ot), lt(0, st, ot), lt(0, st, rt), lt(j, st, rt), [
                  S,
                  0,
                  w,
                ]),
                ht(
                  lt(j, et, ot),
                  lt(0, et, ot),
                  lt(0, st, ot),
                  lt(j, st, ot),
                  [0, -1, 0],
                ));
            };
          for (let et of p.bores) {
            let st = rh(p, et, E);
            (Q(st.v0 - q, st.v1 + q, nt, nt + q),
              Q(st.v0 - q, st.v0, K, nt),
              Q(st.v1, st.v1 + q, K, nt));
          }
        }
        for (let [Z, q] of [
          [-(L + p.W + wo) / 2, L],
          [(F + p.W + wo) / 2, F],
        ]) {
          if (q - p.W - wo < 0.2) continue;
          let j = O(E - R * 0.5, Z, 0);
          n.push({
            t: "obb",
            x: j[0],
            z: j[2],
            hx: (q - p.W - wo) / 2,
            hz: 0.6,
            c: p.uz,
            s: p.ux,
            wall: !0,
            y0: P.y - 2,
            y1: C,
          });
        }
      }
  }
  (Xpt(o, c, n), Oq(o, c, n, t.CURB));
  let d = new ye(c.geometry(), Object.assign(r, { side: ls }));
  if (
    ((d.name = "tunnelPortals"),
    (d.castShadow = !0),
    (d.receiveShadow = !0),
    (d.matrixAutoUpdate = !1),
    (r.userData.mbSkyVis = 1),
    s.add(d),
    !l.empty)
  ) {
    let p = new ye(l.geometry(), a);
    ((p.name = "tunnelLamps"), (p.matrixAutoUpdate = !1), s.add(p));
  }
  return { group: s, colliders: n, night: i };
}
