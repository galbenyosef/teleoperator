// app 403 — math
// Lines 198533-199049 of readable/app.pretty.js (statement-aligned).
function Bit(o, t, e, { seed: s = 64064, avoid: n = [], quota: i = SSt } = {}) {
  let a = typeof performance < "u" ? performance.now() : 0,
    r = _St(s),
    l = {},
    c = TSt(o, t, e),
    h = (P) => ESt(P) && c.has(P.ja) && c.has(P.jb),
    f = [],
    u = n.map((P) => ({ x: P.x, z: P.z, cat: P.cat || "" })),
    d = (P, C, I, L = fN, F = Oit) =>
      u.every((O) => {
        let B = Math.hypot(O.x - P, O.z - C);
        return B >= L && (O.cat !== I || B >= F);
      }),
    p = (P) => (u.push({ x: P.x, z: P.z, cat: P.cat }), f.push(P), P),
    m = {},
    g = (P) => P + String((m[P] = (m[P] || 0) + 1)).padStart(2, "0"),
    b = new Map();
  for (let P of o.edges) {
    if (!h(P)) continue;
    Ot(P, (P.s0 + P.s1) / 2, l);
    let C = Math.floor(l.x / 110) + "," + Math.floor(l.z / 110),
      I = b.get(C);
    (!I || P.s1 - P.s0 > I.E.s1 - I.E.s0) &&
      b.set(C, {
        E: P,
        s: (P.s0 + P.s1) / 2,
        x: l.x,
        z: l.z,
        y: l.y,
        dx: l.dx,
        dz: l.dz,
      });
  }
  let v = [...b.values()].sort((P, C) => P.E.id - C.E.id);
  for (let P = v.length - 1; P > 0; P--) {
    let C = Math.floor(r() * (P + 1));
    [v[P], v[C]] = [v[C], v[P]];
  }
  let x = (P, C, I, L = null) => {
      let [F, O] = G5(C, I),
        B = e._snap(P, P, F, O, L);
      return B && h(B.E) ? B : null;
    },
    y = (P, C, I) =>
      100 +
      (Math.abs(Math.round(C * 7 + I * 13)) % 38) * 50 +
      (Math.abs(Math.round(C + I)) % 2 ? 1 : 0) * 25 +
      " " +
      jl(P.name),
    M = (P, C, I, L, F = []) => {
      let O = null,
        B = -1;
      for (let N = 0; N < v.length; N++) {
        let D = v[(N + Math.floor(r() * v.length)) % v.length],
          U = Math.hypot(D.x - P, D.z - C);
        if (
          U < I ||
          U > L ||
          F.some((W) => Math.hypot(W.x - D.x, W.z - D.z) < I * 0.6)
        )
          continue;
        let G = (t9.has(D.E.cls) ? 1.3 : 1) * (0.6 + r() * 0.4);
        if ((G > B && ((B = G), (O = D)), N > 160 && O)) break;
      }
      if (!O) return null;
      let H = x("stop", O.x, O.z, O.E.name);
      return H
        ? ((H.addr = y(H.E, H.x, H.z)), (H.hood = V2(H.E.dist)), H)
        : null;
    },
    S = (P, C, I = {}) => ({
      id: g(P),
      cat: P,
      x: C.x,
      z: C.z,
      y: C.y,
      dir: T4(C.dx ?? C.hx ?? 1, C.dz ?? C.hz ?? 0),
      tier: Zv(C.x, C.z, C.y, C.E),
      hood: V2(C.E?.dist),
      street: C.E?.name || "",
      ...I,
    });
  {
    let P = 0;
    for (let [C, I, L, F] of kSt) {
      if (P >= i.food) break;
      let [O, B] = ji(I, L),
        H = e._snap(C, C, I, L, F);
      if (!H || !h(H.E) || !d(H.x, H.z, "food")) continue;
      let N = Zv(H.x, H.z, H.y, H.E),
        D = [0, 700, 900, 1100][N],
        U = [0, 1400, 1900, 2400][N],
        G = M(H.x, H.z, D, U);
      G &&
        (p(
          S(
            "food",
            { ...H, E: H.E, dx: H.hx, dz: H.hz },
            {
              name: C,
              sub: "to " + G.addr + ", " + G.hood,
              spot: H,
              stops: [G],
            },
          ),
        ),
        P++);
    }
  }
  {
    let P = 0;
    for (let [C, I, L, F, O, B] of zSt) {
      if (P >= i.photo) break;
      let [H, N] = ji(I, L),
        D = null,
        U = 1e9;
      for (let $ of v) {
        let J = Math.hypot($.x - H, $.z - N);
        if (J < O || J > B) continue;
        let X = Math.abs(J - (O + B) / 2) - $.y * 0.5;
        X < U && d($.x, $.z, "photo") && ((U = X), (D = $));
      }
      if (!D) continue;
      let G = x(C, D.x, D.z, D.E.name);
      if (!G || !d(G.x, G.z, "photo")) continue;
      let W = t.terrainAt ? t.terrainAt(H, N) : G.y,
        V = (Number.isFinite(W) ? W : G.y) + F * 0.6;
      (p(
        S(
          "photo",
          { ...G, E: G.E, dx: G.hx, dz: G.hz },
          {
            name: C,
            sub:
              "from " +
              jl(G.street) +
              " \xB7 " +
              Math.round(Math.hypot(G.x - H, G.z - N)) +
              " m",
            spot: G,
            look: { x: H, z: N, y: V, name: C },
          },
        ),
      ),
        P++);
    }
  }
  {
    let P = [];
    for (let I of o.juns)
      if (!(!c.has(I.id) || !I.legs || I.legs.length < 2))
        for (let [L, F] of I.legs)
          for (let [O, B] of I.legs) {
            if (
              L === O ||
              !h(L) ||
              !h(O) ||
              !L.name ||
              L.name !== O.name ||
              (O.oneway && B !== "a") ||
              (L.oneway && F !== "b")
            )
              continue;
            let H = F === "a" ? L.s0 : L.s1,
              N = B === "a" ? O.s0 : O.s1,
              D = F === "a" ? 1 : -1,
              U = B === "a" ? 1 : -1;
            if (Math.abs(O.s1 - O.s0) < 60 || L.s1 - L.s0 < 40) continue;
            let G = Ot(L, H + D * 30, {}),
              W = Ot(L, H, {}),
              V = Ot(O, N, {}),
              $ = Ot(O, N + U * 30, {}),
              J = Ot(O, N + U * 55, {}),
              X = (W.y - G.y) / 30,
              tt = ($.y - V.y) / 30,
              Z = (W.x - G.x) / 30,
              q = (W.z - G.z) / 30,
              j = (J.x - V.x) / 55,
              K = (J.z - V.z) / 55;
            X < 0.07 ||
              tt > -0.09 ||
              Z * j + q * K < 0.96 ||
              P.push({
                E: O,
                s: N + U * 2,
                sg: U,
                x: V.x,
                z: V.z,
                y: V.y,
                dx: j,
                dz: K,
                k: X - tt,
                name: O.name,
              });
          }
    P.sort((I, L) => L.k - I.k);
    let C = 0;
    for (let I of P) {
      if (C >= i.jump) break;
      if (!d(I.x, I.z, "jump", fN, 500)) continue;
      let L = I.k,
        F = Zv(I.x, I.z, I.y, I.E),
        O = L > 0.36 ? [16, 30, 46] : L > 0.28 ? [12, 24, 36] : [8, 16, 26];
      (p(
        S("jump", I, {
          name: jl(I.name) + " crest",
          sub:
            V2(I.E.dist) + " \xB7 " + Math.round(L * 100) + " % over the top",
          tier: Math.max(F, L > 0.3 ? 2 : 1),
          kind: "jump",
          gates: [{ x: I.x, z: I.z, y: I.y, dir: T4(I.dx, I.dz) }],
          hw: Math.max(6, (Ot(I.E, I.s, l).w || 6) + 1),
          stars: O,
        }),
      ),
        C++);
    }
  }
  {
    let P = [];
    for (let I of o.edges) {
      if (
        !h(I) ||
        I.s1 - I.s0 < 160 ||
        I.cls === "primary" ||
        I.cls === "trunk"
      )
        continue;
      let L = 0,
        F = null,
        O = null;
      for (let N = I.s0 + 8; N <= I.s1 - 8; N += 8)
        (Ot(I, N, l),
          F !== null &&
            (L += Math.abs(
              Math.atan2(F * l.dz - O * l.dx, F * l.dx + O * l.dz),
            )),
          (F = l.dx),
          (O = l.dz));
      let B = I.s1 - I.s0,
        H = ((L * 57.3) / B) * 100;
      H < 22 || L < 1.6 || P.push({ E: I, per: H, L0: B });
    }
    P.sort((I, L) => L.per * Math.sqrt(L.L0) - I.per * Math.sqrt(I.L0));
    let C = 0;
    for (let I of P) {
      if (C >= i.drift) break;
      let L = I.E,
        F = Ot(L, L.s0 + 6, {}),
        O = Ot(L, L.s1 - 6, {});
      if (!d(F.x, F.z, "drift")) continue;
      let B = I.L0 - 12,
        H = (U) => Math.round(U / 500) * 500,
        N = T4(F.dx, F.dz),
        D = T4(O.dx, O.dz);
      (p(
        S(
          "drift",
          { ...F, E: L },
          {
            name: jl(L.name) + " drift",
            sub: V2(L.dist) + " \xB7 " + Math.round(B) + " m of bends",
            kind: "drift",
            gates: [
              { x: F.x, z: F.z, y: F.y, dir: N },
              { x: O.x, z: O.z, y: O.y, dir: D },
            ],
            hw: Math.max(6, F.w + 1.5),
            stars: [H(B * 18), H(B * 45), H(B * 85)],
            maxT: Math.round(B / 5 + 25),
          },
        ),
      ),
        C++);
    }
  }
  {
    let P = [],
      C = new Set();
    for (let F of o.edges) {
      if (!h(F) || !t9.has(F.cls) || C.has(F)) continue;
      let O = [F];
      C.add(F);
      for (let H of ["b", "a"]) {
        let N = F,
          D = H;
        for (let U = 0; U < 12; U++) {
          let G = o.juns[D === "b" ? N.jb : N.ja];
          if (!G?.legs) break;
          let W = Ot(N, D === "b" ? N.s1 - 2 : N.s0 + 2, {}),
            V = W.dx * (D === "b" ? 1 : -1),
            $ = W.dz * (D === "b" ? 1 : -1),
            J = null,
            X = null;
          for (let [tt, Z] of G.legs) {
            if (tt === N || !h(tt) || tt.name !== N.name || C.has(tt)) continue;
            let q = Ot(tt, Z === "a" ? tt.s0 + 2 : tt.s1 - 2, {}),
              j = q.dx * (Z === "a" ? 1 : -1),
              K = q.dz * (Z === "a" ? 1 : -1);
            j * V + K * $ > 0.985 && ((J = tt), (X = Z === "a" ? "b" : "a"));
          }
          if (!J) break;
          (C.add(J), H === "b" ? O.push(J) : O.unshift(J), (N = J), (D = X));
        }
      }
      let B = O.reduce((H, N) => H + N.s1 - N.s0, 0);
      B > 380 && P.push({ chain: O, len: B, name: F.name, cls: F.cls });
    }
    P.sort((F, O) => O.len - F.len);
    let I = 0,
      L = (F) => {
        let O = F.chain[0],
          B = F.chain[F.chain.length - 1],
          H = [
            Ot(O, O.s0 + 4, {}),
            Ot(O, O.s1 - 4, {}),
            Ot(B, B.s0 + 4, {}),
            Ot(B, B.s1 - 4, {}),
          ],
          N = H[0],
          D = H[2],
          U = 0;
        for (let G of H)
          for (let W of H) {
            let V = Math.hypot(G.x - W.x, G.z - W.z);
            V > U && ((U = V), (N = G), (D = W));
          }
        return [N, D, U];
      };
    for (let F of P) {
      if (I >= i.speed) break;
      let [O, B, H] = L(F);
      if (H < F.len * 0.93) continue;
      let N = I % 3 === 2 && H > 520,
        D = T4(B.x - O.x, B.z - O.z);
      if (N) {
        if (!d(O.x, O.z, "speed")) continue;
        let U = Zv(O.x, O.z, O.y, F.chain[0]),
          G = F.cls === "primary" || F.cls === "trunk" ? 95 : 85;
        p(
          S(
            "speed",
            { ...O, E: F.chain[0], dx: D[0], dz: D[1] },
            {
              kind: "zone",
              name: jl(F.name) + " speed zone",
              sub: V2(F.chain[0].dist) + " \xB7 " + Math.round(H) + " m",
              tier: U,
              gates: [
                { x: O.x, z: O.z, y: O.y, dir: D },
                { x: B.x, z: B.z, y: B.y, dir: D },
              ],
              hw: Math.max(7, O.w + 1),
              stars: [G, G + 25, G + 50],
              maxT: Math.round(H / 8 + 20),
            },
          ),
        );
      } else {
        let U = { x: (O.x + B.x) / 2, z: (O.z + B.z) / 2 },
          G = t.roadAt(U.x, U.z, 20);
        if (!G || G.E.name !== F.name) continue;
        let W = Ot(G.E, G.s, {});
        if (!d(W.x, W.z, "speed")) continue;
        let V = Math.round(Math.min(125, 80 + H * 0.05) / 5) * 5,
          $ = Zv(W.x, W.z, W.y, G.E);
        p(
          S(
            "speed",
            { ...W, E: G.E, dx: D[0], dz: D[1] },
            {
              kind: "trap",
              name: jl(F.name) + " speed trap",
              sub: V2(G.E.dist) + " \xB7 a " + Math.round(H) + " m run-up",
              tier: $,
              gates: [{ x: W.x, z: W.z, y: W.y, dir: D }],
              hw: Math.max(7, W.w + 1),
              stars: [V, V + 30, V + 60],
            },
          ),
        );
      }
      I++;
    }
  }
  let w = ["race", "police", "taxi", "courier", "vip", "trial", "nearmiss"],
    _ = Object.fromEntries(w.map((P) => [P, i[P] || 0])),
    z = (P, C) =>
      P === "nearmiss"
        ? t9.has(C.E.cls) && C.E.lanes >= 2 && C.E.dist !== "sausalito"
        : P === "race" || P === "trial" || P === "police"
          ? t9.has(C.E.cls) || (C.E.cls === "residential" && r() < 0.3)
          : !0,
    A = 0,
    T = Object.fromEntries(w.map((P) => [P, 2]));
  for (let P = 0; P < 4 && w.some((C) => _[C] > 0); P++)
    for (let C of v) {
      if (!w.some((B) => _[B] > 0)) break;
      if (P === 0 && Math.hypot(C.x - Qv[0], C.z - Qv[1]) > 2100) continue;
      let I = null;
      for (let B = 0; B < w.length; B++) {
        let H = w[(A + B) % w.length];
        if (
          _[H] > 0 &&
          (P > 0 || T[H] > 0) &&
          (P > 2 || z(H, C)) &&
          d(C.x, C.z, H, fN, P === 0 ? 900 : Oit)
        ) {
          ((I = H), (A = (A + B + 1) % w.length));
          break;
        }
      }
      if (!I) continue;
      let L = f.length,
        F = Zv(C.x, C.z, C.y, C.E),
        O = V2(C.E.dist);
      try {
        E(I, C, F, O);
      } finally {
        f.length > L && P === 0 && T[I]--;
      }
    }
  function E(P, C, I, L) {
    if (P === "taxi" || P === "courier" || P === "vip") {
      let F = x(P, C.x, C.z, C.E.name);
      if (!F || !d(F.x, F.z, P)) return;
      let O =
          P === "vip" ? 1 : P === "taxi" ? [0, 3, 4, 4][I] : [0, 3, 4, 5][I],
        B = P === "vip" ? [0, 900, 1200, 1500][I] : [0, 380, 480, 600][I],
        H = P === "vip" ? [0, 1600, 2200, 2800][I] : [0, 850, 1100, 1400][I],
        N = [],
        D = F;
      for (let W = 0; W < O; W++) {
        let V = M(D.x, D.z, B, H, [F, ...N]);
        if (!V) break;
        (N.push(V), (D = V));
      }
      if (N.length < O) return;
      let U =
          P === "taxi"
            ? "Taxi Rush \xB7 " + jl(F.street)
            : P === "courier"
              ? "Courier \xB7 " + jl(F.street)
              : "VIP pickup \xB7 " + jl(F.street),
        G =
          P === "vip"
            ? "to " + N[0].addr + ", " + N[0].hood
            : O + (P === "taxi" ? " fares" : " parcels") + " round " + L;
      (p(
        S(
          P,
          { ...F, E: F.E, dx: F.hx, dz: F.hz },
          { name: U, sub: G, spot: F, stops: N },
        ),
      ),
        _[P]--);
      return;
    }
    if (P === "race" || P === "trial") {
      let F = P === "race" ? [0, 1500, 1900, 2300][I] : [0, 1200, 1600, 2e3][I],
        O = F + 1200,
        B = M(C.x, C.z, F, O);
      if (!B) return;
      let H =
        (P === "race" ? jl(C.E.name) + " to " : jl(C.E.name) + " trial \xB7 ") +
        (P === "race"
          ? B.hood.replace(/^the /, "")
          : B.hood.replace(/^the /, ""));
      (p(
        S(P, C, {
          name: H,
          sub:
            (P === "race" ? "Sprint vs 3 rivals" : "Checkpoints") +
            " \xB7 ~" +
            Math.round(Math.hypot(B.x - C.x, B.z - C.z) / 100) / 10 +
            " km as the crow flies",
          to: [B.x, B.z],
          stops: [B],
        }),
      ),
        _[P]--);
      return;
    }
    if (P === "police") {
      let F = Math.min(4, I + (r() < 0.3 ? 1 : 0));
      (p(
        S(P, C, {
          name: jl(C.E.name) + " getaway",
          sub:
            "Heat " +
            F +
            " \xB7 lose them in " +
            [0, 90, 120, 150, 170][F] +
            " s",
          heat: F,
          secs: [0, 90, 120, 150, 170][F],
        }),
      ),
        _[P]--);
      return;
    }
    if (P === "nearmiss") {
      let F = [0, 60, 75, 90][I];
      (p(
        S(P, C, {
          name: jl(C.E.name) + " traffic run",
          sub: L + " \xB7 " + F + " s on the clock",
          secs: F,
          stars: [[0], [3, 6, 10], [5, 9, 14], [7, 12, 18]][I],
        }),
      ),
        _[P]--);
    }
  }
  let R = typeof performance < "u" ? performance.now() - a : 0;
  return ((f.ms = R), (f.reach = c), f);
}
