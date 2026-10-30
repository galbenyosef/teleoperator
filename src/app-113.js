// app 113 — math
// Lines 82979-83328 of readable/app.pretty.js (statement-aligned).
function b1t({ B: o, colliders: t }, e, s) {
  let { D: n, L: i } = e,
    a = Rt([0.07, 0.09, 0.08], Tt.metal),
    r = s.list.flatMap((p) =>
      (p.claims || []).filter((m) => m.buildings !== !1).map((m) => m.poly),
    ),
    l = (p, m) =>
      r.some((g) => {
        let b = !1;
        for (let v = 0, x = g.length - 1; v < g.length; x = v++) {
          let [y, M] = g[v],
            [S, w] = g[x];
          M > m != w > m && p < ((S - y) * (m - M)) / (w - M) + y && (b = !b);
        }
        return b;
      }),
    c = /^(The Embarcadero|Jefferson Street|Beach Street)$/,
    h = (p, m) => m > 330 && m < 1100 && p > 230 && p < 1200,
    f = new Map(),
    u = (p, m) => {
      let g = Math.floor(p / 4) * 100003 + Math.floor(m / 4),
        b = f.get(g);
      return (
        b === void 0 && ((b = i.roadAt(p, m, 26) || null), f.set(g, b)),
        b
      );
    },
    d = (p, m) => {
      if (!h(p, m)) {
        let g = u(p, m);
        if (!g || !c.test(g.E.name) || g.dd > 24 || g.E.layered) return !1;
      }
      return !l(p, m) && i.surfaceAt(p, m) !== "road";
    };
  for (let p of n.seawall) {
    let m = [];
    for (let x = 0; x + 2 < p.length; x += 2) {
      let y = p[x],
        M = p[x + 1],
        S = p[x + 2],
        w = p[x + 3],
        _ = Math.max(1, Math.ceil(Math.hypot(S - y, w - M) / 2.5));
      for (let z = 0; z < _; z++)
        m.push([y + ((S - y) * z) / _, M + ((w - M) * z) / _]);
    }
    let g = [];
    for (let x = 0; x < m.length; x++) {
      let y = m[Math.max(0, x - 1)],
        M = m[Math.min(m.length - 1, x + 1)],
        S = M[0] - y[0],
        w = M[1] - y[1],
        _ = Math.hypot(S, w) || 1,
        z = -w / _,
        A = S / _,
        [T, E] = m[x],
        R = [T + z * 1.9, E + A * 1.9],
        P = [T - z * 1.9, E - A * 1.9],
        C = i.coverAt(...R) & 8 ? P : i.coverAt(...P) & 8 ? R : null;
      g.push(C && d(...C) ? { p: C, n: C === R ? [-z, -A] : [z, A] } : null);
    }
    let b = [],
      v = () => {
        if (b.length > 2) {
          let x = o.get(
              "promR" +
                Math.floor((b[0].p[0] + 3e3) / 400) +
                "_" +
                Math.floor((b[0].p[1] + 3e3) / 400),
              "solid",
            ),
            y = b.map((M) =>
              i.driveHeight(M.p[0] + M.n[0] * -0.6, M.p[1] + M.n[1] * -0.6),
            );
          for (let M = 0; M + 1 < b.length; M++) {
            let S = b[M].p,
              w = b[M + 1].p;
            (rs(
              x,
              [S[0], y[M] + 1.05, S[1]],
              [w[0], y[M + 1] + 1.05, w[1]],
              0.08,
              0.06,
              a,
            ),
              rs(
                x,
                [S[0], y[M] + 0.55, S[1]],
                [w[0], y[M + 1] + 0.55, w[1]],
                0.04,
                0.04,
                a,
              ));
          }
          for (let M = 0; M < b.length; M++) {
            let S = b[M].p;
            zs(
              x,
              S[0] - 0.04,
              y[M] - 0.05,
              S[1] - 0.04,
              S[0] + 0.04,
              y[M] + 1.08,
              S[1] + 0.04,
              a,
              { top: !1 },
            );
          }
          for (let M = 7; M + 7 < b.length; M += 14) {
            let S = b[M],
              w = b[M - 1].p,
              _ = b[M + 1].p,
              z = _[0] - w[0],
              A = _[1] - w[1],
              T = Math.hypot(z, A) || 1,
              E = z / T,
              R = A / T,
              P = S.p[0] - S.n[0] * 2.3,
              C = S.p[1] - S.n[1] * 2.3,
              I = i.driveHeight(P, C);
            if (
              i.surfaceAt(P, C) === "road" ||
              i.surfaceAt(P + S.n[0] * -1.2, C + S.n[1] * -1.2) === "road"
            )
              continue;
            (ih(
              x,
              {
                box: (F, O, B, H, N, D, U, G) => {
                  let W = (O + H) / 2,
                    V = (B + N) / 2;
                  Vs(
                    F,
                    P + E * W - R * V,
                    C + R * W + E * V,
                    E,
                    R,
                    Math.abs(H - O) / 2,
                    Math.abs(N - B) / 2,
                    D - 3 + I,
                    U - 3 + I,
                    G,
                  );
                },
              },
              0,
              0,
              S.n[0] * -R + S.n[1] * E > 0 ? 1 : -1,
            ),
              t.push({
                t: "obb",
                x: P,
                z: C,
                hx: 0.35,
                hz: 1,
                c: R,
                s: E,
                y0: I - 1,
                y1: I + 2,
              }));
          }
        }
        b = [];
      };
    for (let x of g) x ? b.push(x) : v();
    v();
  }
}
var x1t = "waterfront",
  v1t = [
    [1, 0],
    [15, 21],
  ],
  ij = "assets/tex/lm/waterfront/";
function y1t(o) {
  if (typeof location < "u" && /[?&]nowf\b/.test(location.search)) return;
  let t = new nh(),
    e = new Bu(2048, 2048);
  (e.add("clock", 512, 512, rk), e.add("crabwheel", 768, 768, fk));
  let s = {
      B: t,
      A: e,
      ctx: o,
      colliders: o.colliders,
      inst: o.inst,
      extra: [],
      tick: [],
    },
    n = [
      ["ferry", ak],
      ["piers", G7],
      ["north", xW],
      ["ghirardelli", uk],
      ["alcatraz", dk],
      ["plazas", vW],
      ["baylights", pk],
      ["street", MW],
    ];
  for (let [f, u] of n)
    try {
      u(s);
    } catch (d) {
      console.error("waterfront:", f, d);
    }
  if (typeof document > "u") return;
  let i = aj(e);
  o.night.push(...Object.values(i));
  let a = t.meshes(i, o.group),
    r = [
      [/^wf_(prom|rails)/, 650],
      [/^wf_(wharf|justin|cupid|aquatic)/, 900],
      [/^wf_(p39|hyde|ghira)/, 1400],
    ],
    l = a
      .map((f) => {
        let u = r.find(([d]) => d.test(f.name));
        return u
          ? (f.geometry.computeBoundingSphere(),
            [f, f.geometry.boundingSphere, u[1]])
          : null;
      })
      .filter(Boolean),
    c = 0;
  for (let f of s.extra) f(o.group, i, o.night);
  let h = () => {
    let f = performance.now() / 1e3;
    for (let d of s.tick) d(f);
    let u = globalThis.__sf?.camera;
    if (u && f - c > 0.4) {
      c = f;
      for (let [d, p, m] of l)
        d.visible = p.center.distanceTo(u.position) - p.radius < m;
    }
    requestAnimationFrame(h);
  };
  requestAnimationFrame(h);
}
var oj = () => typeof location < "u" && /[?&]nowf\b/.test(location.search);
function w1t(o) {
  oj() || sj(o);
}
function M1t(o) {
  if (oj()) return;
  let t = new nh(),
    e = new Bu(2048, 2048);
  if (
    (e.add("clock", 512, 512, rk),
    e.add("crabwheel", 768, 768, fk),
    nj(o, t, e),
    o.headless)
  )
    return;
  let s = aj(e);
  o.night.push(...Object.values(s));
  let n = t.meshes(s, o.group),
    i = [
      [/^wf_(railsR|promR)/, 700],
      [/^wf_(justin|cupid|wharf)/, 1300],
      [/^wf_rpier/, 2400],
      [/^wf_(p39|hyde|ghira|aquatic)/, 2800],
      [/^wf_ferry/, 4e3],
    ],
    a = n
      .map((l) => {
        let c = i.find(([h]) => h.test(l.name));
        return c
          ? (l.geometry.computeBoundingSphere(),
            [l, l.geometry.boundingSphere, c[1]])
          : null;
      })
      .filter(Boolean),
    r = 0;
  o.onUpdate.push((l, c, h) => {
    if (!((r -= h) > 0)) {
      r = 0.4;
      for (let [f, u, d] of a)
        f.visible = Math.hypot(u.center.x - l, u.center.z - c) - u.radius < d;
    }
  });
}
function aj(o) {
  let t = (l, c = {}) => {
      let h = new me({
        color: 16777215,
        roughness: 0.8,
        metalness: 0,
        vertexColors: !0,
        ...c,
      });
      return ((h.userData.mbAlbedo = l), (h.userData.dayGlow = 0), h);
    },
    e = {
      atlas: t(YV),
      solid: t(Tb),
      text: t(Rb, {
        alphaTest: 0.5,
        polygonOffset: !0,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -4,
        depthWrite: !1,
      }),
    };
  if (((e.text.userData.surfaceDecal = !0), typeof document > "u")) return e;
  let s = new ko(),
    n = (l, c, h) =>
      s.load(
        ij + l,
        (f) => {
          ((f.flipY = !1),
            (f.colorSpace = c ? Je : Nn),
            (f.anisotropy = 8),
            (f.wrapS = f.wrapT = oi),
            (f.needsUpdate = !0),
            h(f));
        },
        void 0,
        () => console.warn("waterfront: missing", l),
      ),
    i = null;
  (n("facades.webp", !0, (l) => {
    ((e.atlas.map = l), (e.atlas.needsUpdate = !0));
  }),
    n("facades_mask.webp", !1, (l) => {
      ((e.atlas.userData.mbExtraMap = l), (e.atlas.needsUpdate = !0));
    }),
    n("tiles.webp", !0, (l) => {
      ((e.solid.map = l), (e.solid.needsUpdate = !0));
    }));
  let a = o.texture();
  e.text.map = a;
  let r = new Image();
  return (
    (r.onload = () => {
      ((i = r), (o.images = { crab: i }), o.redraw?.(), (a.needsUpdate = !0));
    }),
    (r.src = ij + "crab.webp"),
    (o.redraw = () => {
      let l = o.ctx;
      l.clearRect(0, 0, o.W, o.H);
      for (let c of o.items)
        (l.save(),
          l.beginPath(),
          l.rect(c.x, c.y, c.w, c.h),
          l.clip(),
          c.draw(l, c.x, c.y, c.w, c.h, o.images || {}),
          l.restore());
      a.needsUpdate = !0;
    }),
    e
  );
}
