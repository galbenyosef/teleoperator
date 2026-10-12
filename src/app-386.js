// app 386 — math
// Lines 190704-191220 of readable/app.pretty.js (statement-aligned).
function _et(i, t, e, { seed: s = 64064, avoid: n = [], quota: o = Iwt } = {}) {
  let a = typeof performance < "u" ? performance.now() : 0,
    r = Fwt(s),
    l = {},
    c = Bwt(i, t, e),
    h = (C) => Nwt(C) && c.has(C.ja) && c.has(C.jb),
    f = [],
    u = n.map((C) => ({ x: C.x, z: C.z, cat: C.cat || "" })),
    d = (C, P, I, L = hN, F = ket) =>
      u.every((N) => {
        let B = Math.hypot(N.x - C, N.z - P);
        return B >= L && (N.cat !== I || B >= F);
      }),
    p = (C) => (u.push({ x: C.x, z: C.z, cat: C.cat }), f.push(C), C),
    m = {},
    g = (C) => C + String((m[C] = (m[C] || 0) + 1)).padStart(2, "0"),
    b = new Map();
  for (let C of i.edges) {
    if (!h(C)) continue;
    Ot(C, (C.s0 + C.s1) / 2, l);
    let P = Math.floor(l.x / 110) + "," + Math.floor(l.z / 110),
      I = b.get(P);
    (!I || C.s1 - C.s0 > I.E.s1 - I.E.s0) &&
      b.set(P, {
        E: C,
        s: (C.s0 + C.s1) / 2,
        x: l.x,
        z: l.z,
        y: l.y,
        dx: l.dx,
        dz: l.dz,
      });
  }
  let x = [...b.values()].sort((C, P) => C.E.id - P.E.id);
  for (let C = x.length - 1; C > 0; C--) {
    let P = Math.floor(r() * (C + 1));
    [x[C], x[P]] = [x[P], x[C]];
  }
  let v = (C, P, I, L = null) => {
      let [F, N] = $5(P, I),
        B = e._snap(C, C, F, N, L);
      return B && h(B.E) ? B : null;
    },
    y = (C, P, I) =>
      100 +
      (Math.abs(Math.round(P * 7 + I * 13)) % 38) * 50 +
      (Math.abs(Math.round(P + I)) % 2 ? 1 : 0) * 25 +
      " " +
      Sl(C.name),
    M = (C, P, I, L, F = []) => {
      let N = null,
        B = -1;
      for (let O = 0; O < x.length; O++) {
        let D = x[(O + Math.floor(r() * x.length)) % x.length],
          U = Math.hypot(D.x - C, D.z - P);
        if (
          U < I ||
          U > L ||
          F.some((q) => Math.hypot(q.x - D.x, q.z - D.z) < I * 0.6)
        )
          continue;
        let G = (LE.has(D.E.cls) ? 1.3 : 1) * (0.6 + r() * 0.4);
        if ((G > B && ((B = G), (N = D)), O > 160 && N)) break;
      }
      if (!N) return null;
      let H = v("stop", N.x, N.z, N.E.name);
      return H
        ? ((H.addr = y(H.E, H.x, H.z)), (H.hood = t2(H.E.dist)), H)
        : null;
    },
    S = (C, P, I = {}) => ({
      id: g(C),
      cat: C,
      x: P.x,
      z: P.z,
      y: P.y,
      dir: kM(P.dx ?? P.hx ?? 1, P.dz ?? P.hz ?? 0),
      tier: av(P.x, P.z, P.y, P.E),
      hood: t2(P.E?.dist),
      street: P.E?.name || "",
      ...I,
    });
  {
    let C = 0;
    for (let [P, I, L, F] of vet) {
      if (C >= o.food) break;
      let [N, B] = Gi(I, L),
        H = e._snap(P, P, I, L, F);
      if (!H || !h(H.E) || !d(H.x, H.z, "food")) continue;
      let O = av(H.x, H.z, H.y, H.E),
        D = [0, 700, 900, 1100][O],
        U = [0, 1400, 1900, 2400][O],
        G = M(H.x, H.z, D, U);
      G &&
        (p(
          S(
            "food",
            { ...H, E: H.E, dx: H.hx, dz: H.hz },
            {
              name: P,
              sub: "to " + G.addr + ", " + G.hood,
              spot: H,
              stops: [G],
            },
          ),
        ),
        C++);
    }
  }
  {
    let C = 0;
    for (let [P, I, L, F, N, B] of yet) {
      if (C >= o.photo) break;
      let [H, O] = Gi(I, L),
        D = null,
        U = 1e9;
      for (let V of x) {
        let Y = Math.hypot(V.x - H, V.z - O);
        if (Y < N || Y > B) continue;
        let $ = Math.abs(Y - (N + B) / 2) - V.y * 0.5;
        $ < U && d(V.x, V.z, "photo") && ((U = $), (D = V));
      }
      if (!D) continue;
      let G = v(P, D.x, D.z, D.E.name);
      if (!G || !d(G.x, G.z, "photo")) continue;
      let q = t.terrainAt ? t.terrainAt(H, O) : G.y,
        W = (Number.isFinite(q) ? q : G.y) + F * 0.6;
      (p(
        S(
          "photo",
          { ...G, E: G.E, dx: G.hx, dz: G.hz },
          {
            name: P,
            sub:
              "from " +
              Sl(G.street) +
              " \xB7 " +
              Math.round(Math.hypot(G.x - H, G.z - O)) +
              " m",
            spot: G,
            look: { x: H, z: O, y: W, name: P },
          },
        ),
      ),
        C++);
    }
  }
  {
    let C = [];
    for (let I of i.juns)
      if (!(!c.has(I.id) || !I.legs || I.legs.length < 2))
        for (let [L, F] of I.legs)
          for (let [N, B] of I.legs) {
            if (
              L === N ||
              !h(L) ||
              !h(N) ||
              !L.name ||
              L.name !== N.name ||
              (N.oneway && B !== "a") ||
              (L.oneway && F !== "b")
            )
              continue;
            let H = F === "a" ? L.s0 : L.s1,
              O = B === "a" ? N.s0 : N.s1,
              D = F === "a" ? 1 : -1,
              U = B === "a" ? 1 : -1;
            if (Math.abs(N.s1 - N.s0) < 60 || L.s1 - L.s0 < 40) continue;
            let G = Ot(L, H + D * 30, {}),
              q = Ot(L, H, {}),
              W = Ot(N, O, {}),
              V = Ot(N, O + U * 30, {}),
              Y = Ot(N, O + U * 55, {}),
              $ = (q.y - G.y) / 30,
              st = (V.y - W.y) / 30,
              Q = (q.x - G.x) / 30,
              j = (q.z - G.z) / 30,
              X = (Y.x - W.x) / 55,
              K = (Y.z - W.z) / 55;
            $ < 0.07 ||
              st > -0.09 ||
              Q * X + j * K < 0.96 ||
              C.push({
                E: N,
                s: O + U * 2,
                sg: U,
                x: W.x,
                z: W.z,
                y: W.y,
                dx: X,
                dz: K,
                k: $ - st,
                name: N.name,
              });
          }
    C.sort((I, L) => L.k - I.k);
    let P = 0;
    for (let I of C) {
      if (P >= o.jump) break;
      if (!d(I.x, I.z, "jump", hN, 500)) continue;
      let L = I.k,
        F = av(I.x, I.z, I.y, I.E),
        N = L > 0.36 ? [16, 30, 46] : L > 0.28 ? [12, 24, 36] : [8, 16, 26];
      (p(
        S("jump", I, {
          name: Sl(I.name) + " crest",
          sub:
            t2(I.E.dist) + " \xB7 " + Math.round(L * 100) + " % over the top",
          tier: Math.max(F, L > 0.3 ? 2 : 1),
          kind: "jump",
          gates: [{ x: I.x, z: I.z, y: I.y, dir: kM(I.dx, I.dz) }],
          hw: Math.max(6, (Ot(I.E, I.s, l).w || 6) + 1),
          stars: N,
        }),
      ),
        P++);
    }
  }
  {
    let C = [];
    for (let I of i.edges) {
      if (
        !h(I) ||
        I.s1 - I.s0 < 160 ||
        I.cls === "primary" ||
        I.cls === "trunk"
      )
        continue;
      let L = 0,
        F = null,
        N = null;
      for (let O = I.s0 + 8; O <= I.s1 - 8; O += 8)
        (Ot(I, O, l),
          F !== null &&
            (L += Math.abs(
              Math.atan2(F * l.dz - N * l.dx, F * l.dx + N * l.dz),
            )),
          (F = l.dx),
          (N = l.dz));
      let B = I.s1 - I.s0,
        H = ((L * 57.3) / B) * 100;
      H < 22 || L < 1.6 || C.push({ E: I, per: H, L0: B });
    }
    C.sort((I, L) => L.per * Math.sqrt(L.L0) - I.per * Math.sqrt(I.L0));
    let P = 0;
    for (let I of C) {
      if (P >= o.drift) break;
      let L = I.E,
        F = Ot(L, L.s0 + 6, {}),
        N = Ot(L, L.s1 - 6, {});
      if (!d(F.x, F.z, "drift")) continue;
      let B = I.L0 - 12,
        H = (U) => Math.round(U / 500) * 500,
        O = kM(F.dx, F.dz),
        D = kM(N.dx, N.dz);
      (p(
        S(
          "drift",
          { ...F, E: L },
          {
            name: Sl(L.name) + " drift",
            sub: t2(L.dist) + " \xB7 " + Math.round(B) + " m of bends",
            kind: "drift",
            gates: [
              { x: F.x, z: F.z, y: F.y, dir: O },
              { x: N.x, z: N.z, y: N.y, dir: D },
            ],
            hw: Math.max(6, F.w + 1.5),
            stars: [H(B * 18), H(B * 45), H(B * 85)],
            maxT: Math.round(B / 5 + 25),
          },
        ),
      ),
        P++);
    }
  }
  {
    let C = [],
      P = new Set();
    for (let F of i.edges) {
      if (!h(F) || !LE.has(F.cls) || P.has(F)) continue;
      let N = [F];
      P.add(F);
      for (let H of ["b", "a"]) {
        let O = F,
          D = H;
        for (let U = 0; U < 12; U++) {
          let G = i.juns[D === "b" ? O.jb : O.ja];
          if (!G?.legs) break;
          let q = Ot(O, D === "b" ? O.s1 - 2 : O.s0 + 2, {}),
            W = q.dx * (D === "b" ? 1 : -1),
            V = q.dz * (D === "b" ? 1 : -1),
            Y = null,
            $ = null;
          for (let [st, Q] of G.legs) {
            if (st === O || !h(st) || st.name !== O.name || P.has(st)) continue;
            let j = Ot(st, Q === "a" ? st.s0 + 2 : st.s1 - 2, {}),
              X = j.dx * (Q === "a" ? 1 : -1),
              K = j.dz * (Q === "a" ? 1 : -1);
            X * W + K * V > 0.985 && ((Y = st), ($ = Q === "a" ? "b" : "a"));
          }
          if (!Y) break;
          (P.add(Y), H === "b" ? N.push(Y) : N.unshift(Y), (O = Y), (D = $));
        }
      }
      let B = N.reduce((H, O) => H + O.s1 - O.s0, 0);
      B > 380 && C.push({ chain: N, len: B, name: F.name, cls: F.cls });
    }
    C.sort((F, N) => N.len - F.len);
    let I = 0,
      L = (F) => {
        let N = F.chain[0],
          B = F.chain[F.chain.length - 1],
          H = [
            Ot(N, N.s0 + 4, {}),
            Ot(N, N.s1 - 4, {}),
            Ot(B, B.s0 + 4, {}),
            Ot(B, B.s1 - 4, {}),
          ],
          O = H[0],
          D = H[2],
          U = 0;
        for (let G of H)
          for (let q of H) {
            let W = Math.hypot(G.x - q.x, G.z - q.z);
            W > U && ((U = W), (O = G), (D = q));
          }
        return [O, D, U];
      };
    for (let F of C) {
      if (I >= o.speed) break;
      let [N, B, H] = L(F);
      if (H < F.len * 0.93) continue;
      let O = I % 3 === 2 && H > 520,
        D = kM(B.x - N.x, B.z - N.z);
      if (O) {
        if (!d(N.x, N.z, "speed")) continue;
        let U = av(N.x, N.z, N.y, F.chain[0]),
          G = F.cls === "primary" || F.cls === "trunk" ? 95 : 85;
        p(
          S(
            "speed",
            { ...N, E: F.chain[0], dx: D[0], dz: D[1] },
            {
              kind: "zone",
              name: Sl(F.name) + " speed zone",
              sub: t2(F.chain[0].dist) + " \xB7 " + Math.round(H) + " m",
              tier: U,
              gates: [
                { x: N.x, z: N.z, y: N.y, dir: D },
                { x: B.x, z: B.z, y: B.y, dir: D },
              ],
              hw: Math.max(7, N.w + 1),
              stars: [G, G + 25, G + 50],
              maxT: Math.round(H / 8 + 20),
            },
          ),
        );
      } else {
        let U = { x: (N.x + B.x) / 2, z: (N.z + B.z) / 2 },
          G = t.roadAt(U.x, U.z, 20);
        if (!G || G.E.name !== F.name) continue;
        let q = Ot(G.E, G.s, {});
        if (!d(q.x, q.z, "speed")) continue;
        let W = Math.round(Math.min(125, 80 + H * 0.05) / 5) * 5,
          V = av(q.x, q.z, q.y, G.E);
        p(
          S(
            "speed",
            { ...q, E: G.E, dx: D[0], dz: D[1] },
            {
              kind: "trap",
              name: Sl(F.name) + " speed trap",
              sub: t2(G.E.dist) + " \xB7 a " + Math.round(H) + " m run-up",
              tier: V,
              gates: [{ x: q.x, z: q.z, y: q.y, dir: D }],
              hw: Math.max(7, q.w + 1),
              stars: [W, W + 30, W + 60],
            },
          ),
        );
      }
      I++;
    }
  }
  let w = ["race", "police", "taxi", "courier", "vip", "trial", "nearmiss"],
    z = Object.fromEntries(w.map((C) => [C, o[C] || 0])),
    _ = (C, P) =>
      C === "nearmiss"
        ? LE.has(P.E.cls) && P.E.lanes >= 2 && P.E.dist !== "sausalito"
        : C === "race" || C === "trial" || C === "police"
          ? LE.has(P.E.cls) || (P.E.cls === "residential" && r() < 0.3)
          : !0,
    R = 0,
    T = Object.fromEntries(w.map((C) => [C, 2]));
  for (let C = 0; C < 4 && w.some((P) => z[P] > 0); C++)
    for (let P of x) {
      if (!w.some((B) => z[B] > 0)) break;
      if (C === 0 && Math.hypot(P.x - Qm[0], P.z - Qm[1]) > 2100) continue;
      let I = null;
      for (let B = 0; B < w.length; B++) {
        let H = w[(R + B) % w.length];
        if (
          z[H] > 0 &&
          (C > 0 || T[H] > 0) &&
          (C > 2 || _(H, P)) &&
          d(P.x, P.z, H, hN, C === 0 ? 900 : ket)
        ) {
          ((I = H), (R = (R + B + 1) % w.length));
          break;
        }
      }
      if (!I) continue;
      let L = f.length,
        F = av(P.x, P.z, P.y, P.E),
        N = t2(P.E.dist);
      try {
        E(I, P, F, N);
      } finally {
        f.length > L && C === 0 && T[I]--;
      }
    }
  function E(C, P, I, L) {
    if (C === "taxi" || C === "courier" || C === "vip") {
      let F = v(C, P.x, P.z, P.E.name);
      if (!F || !d(F.x, F.z, C)) return;
      let N =
          C === "vip" ? 1 : C === "taxi" ? [0, 3, 4, 4][I] : [0, 3, 4, 5][I],
        B = C === "vip" ? [0, 900, 1200, 1500][I] : [0, 380, 480, 600][I],
        H = C === "vip" ? [0, 1600, 2200, 2800][I] : [0, 850, 1100, 1400][I],
        O = [],
        D = F;
      for (let q = 0; q < N; q++) {
        let W = M(D.x, D.z, B, H, [F, ...O]);
        if (!W) break;
        (O.push(W), (D = W));
      }
      if (O.length < N) return;
      let U =
          C === "taxi"
            ? "Taxi Rush \xB7 " + Sl(F.street)
            : C === "courier"
              ? "Courier \xB7 " + Sl(F.street)
              : "VIP pickup \xB7 " + Sl(F.street),
        G =
          C === "vip"
            ? "to " + O[0].addr + ", " + O[0].hood
            : N + (C === "taxi" ? " fares" : " parcels") + " round " + L;
      (p(
        S(
          C,
          { ...F, E: F.E, dx: F.hx, dz: F.hz },
          { name: U, sub: G, spot: F, stops: O },
        ),
      ),
        z[C]--);
      return;
    }
    if (C === "race" || C === "trial") {
      let F = C === "race" ? [0, 1500, 1900, 2300][I] : [0, 1200, 1600, 2e3][I],
        N = F + 1200,
        B = M(P.x, P.z, F, N);
      if (!B) return;
      let H =
        (C === "race" ? Sl(P.E.name) + " to " : Sl(P.E.name) + " trial \xB7 ") +
        (C === "race"
          ? B.hood.replace(/^the /, "")
          : B.hood.replace(/^the /, ""));
      (p(
        S(C, P, {
          name: H,
          sub:
            (C === "race" ? "Sprint vs 3 rivals" : "Checkpoints") +
            " \xB7 ~" +
            Math.round(Math.hypot(B.x - P.x, B.z - P.z) / 100) / 10 +
            " km as the crow flies",
          to: [B.x, B.z],
          stops: [B],
        }),
      ),
        z[C]--);
      return;
    }
    if (C === "police") {
      let F = Math.min(4, I + (r() < 0.3 ? 1 : 0));
      (p(
        S(C, P, {
          name: Sl(P.E.name) + " getaway",
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
        z[C]--);
      return;
    }
    if (C === "nearmiss") {
      let F = [0, 60, 75, 90][I];
      (p(
        S(C, P, {
          name: Sl(P.E.name) + " traffic run",
          sub: L + " \xB7 " + F + " s on the clock",
          secs: F,
          stars: [[0], [3, 6, 10], [5, 9, 14], [7, 12, 18]][I],
        }),
      ),
        z[C]--);
    }
  }
  let A = typeof performance < "u" ? performance.now() - a : 0;
  return ((f.ms = A), (f.reach = c), f);
}
