// app 114 — math
// Lines 82745-83094 of readable/app.pretty.js (statement-aligned).
function Kft({ B: i, colliders: t }, e, s) {
  let { D: n, L: o } = e,
    a = At([0.07, 0.09, 0.08], Tt.metal),
    r = s.list.flatMap((p) =>
      (p.claims || []).filter((m) => m.buildings !== !1).map((m) => m.poly),
    ),
    l = (p, m) =>
      r.some((g) => {
        let b = !1;
        for (let x = 0, v = g.length - 1; x < g.length; v = x++) {
          let [y, M] = g[x],
            [S, w] = g[v];
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
        b === void 0 && ((b = o.roadAt(p, m, 26) || null), f.set(g, b)),
        b
      );
    },
    d = (p, m) => {
      if (!h(p, m)) {
        let g = u(p, m);
        if (!g || !c.test(g.E.name) || g.dd > 24 || g.E.layered) return !1;
      }
      return !l(p, m) && o.surfaceAt(p, m) !== "road";
    };
  for (let p of n.seawall) {
    let m = [];
    for (let v = 0; v + 2 < p.length; v += 2) {
      let y = p[v],
        M = p[v + 1],
        S = p[v + 2],
        w = p[v + 3],
        z = Math.max(1, Math.ceil(Math.hypot(S - y, w - M) / 2.5));
      for (let _ = 0; _ < z; _++)
        m.push([y + ((S - y) * _) / z, M + ((w - M) * _) / z]);
    }
    let g = [];
    for (let v = 0; v < m.length; v++) {
      let y = m[Math.max(0, v - 1)],
        M = m[Math.min(m.length - 1, v + 1)],
        S = M[0] - y[0],
        w = M[1] - y[1],
        z = Math.hypot(S, w) || 1,
        _ = -w / z,
        R = S / z,
        [T, E] = m[v],
        A = [T + _ * 1.9, E + R * 1.9],
        C = [T - _ * 1.9, E - R * 1.9],
        P = o.coverAt(...A) & 8 ? C : o.coverAt(...C) & 8 ? A : null;
      g.push(P && d(...P) ? { p: P, n: P === A ? [-_, -R] : [_, R] } : null);
    }
    let b = [],
      x = () => {
        if (b.length > 2) {
          let v = i.get(
              "promR" +
                Math.floor((b[0].p[0] + 3e3) / 400) +
                "_" +
                Math.floor((b[0].p[1] + 3e3) / 400),
              "solid",
            ),
            y = b.map((M) =>
              o.driveHeight(M.p[0] + M.n[0] * -0.6, M.p[1] + M.n[1] * -0.6),
            );
          for (let M = 0; M + 1 < b.length; M++) {
            let S = b[M].p,
              w = b[M + 1].p;
            (ss(
              v,
              [S[0], y[M] + 1.05, S[1]],
              [w[0], y[M + 1] + 1.05, w[1]],
              0.08,
              0.06,
              a,
            ),
              ss(
                v,
                [S[0], y[M] + 0.55, S[1]],
                [w[0], y[M + 1] + 0.55, w[1]],
                0.04,
                0.04,
                a,
              ));
          }
          for (let M = 0; M < b.length; M++) {
            let S = b[M].p;
            Ms(
              v,
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
              z = b[M + 1].p,
              _ = z[0] - w[0],
              R = z[1] - w[1],
              T = Math.hypot(_, R) || 1,
              E = _ / T,
              A = R / T,
              C = S.p[0] - S.n[0] * 2.3,
              P = S.p[1] - S.n[1] * 2.3,
              I = o.driveHeight(C, P);
            if (
              o.surfaceAt(C, P) === "road" ||
              o.surfaceAt(C + S.n[0] * -1.2, P + S.n[1] * -1.2) === "road"
            )
              continue;
            (Ac(
              v,
              {
                box: (F, N, B, H, O, D, U, G) => {
                  let q = (N + H) / 2,
                    W = (B + O) / 2;
                  Us(
                    F,
                    C + E * q - A * W,
                    P + A * q + E * W,
                    E,
                    A,
                    Math.abs(H - N) / 2,
                    Math.abs(O - B) / 2,
                    D - 3 + I,
                    U - 3 + I,
                    G,
                  );
                },
              },
              0,
              0,
              S.n[0] * -A + S.n[1] * E > 0 ? 1 : -1,
            ),
              t.push({
                t: "obb",
                x: C,
                z: P,
                hx: 0.35,
                hz: 1,
                c: A,
                s: E,
                y0: I - 1,
                y1: I + 2,
              }));
          }
        }
        b = [];
      };
    for (let v of g) v ? b.push(v) : x();
    x();
  }
}
var Yft = "waterfront",
  Jft = [
    [1, 0],
    [15, 21],
  ],
  sq = "assets/tex/lm/waterfront/";
function Zft(i) {
  if (typeof location < "u" && /[?&]nowf\b/.test(location.search)) return;
  let t = new Tc(),
    e = new su(2048, 2048);
  (e.add("clock", 512, 512, oS), e.add("crabwheel", 768, 768, cS));
  let s = {
      B: t,
      A: e,
      ctx: i,
      colliders: i.colliders,
      inst: i.inst,
      extra: [],
      tick: [],
    },
    n = [
      ["ferry", iS],
      ["piers", uR],
      ["north", gG],
      ["ghirardelli", hS],
      ["alcatraz", fS],
      ["plazas", bG],
      ["baylights", uS],
      ["street", yG],
    ];
  for (let [f, u] of n)
    try {
      u(s);
    } catch (d) {
      console.error("waterfront:", f, d);
    }
  if (typeof document > "u") return;
  let o = iq(e);
  i.night.push(...Object.values(o));
  let a = t.meshes(o, i.group),
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
  for (let f of s.extra) f(i.group, o, i.night);
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
var nq = () => typeof location < "u" && /[?&]nowf\b/.test(location.search);
function Qft(i) {
  nq() || tq(i);
}
function tut(i) {
  if (nq()) return;
  let t = new Tc(),
    e = new su(2048, 2048);
  if (
    (e.add("clock", 512, 512, oS),
    e.add("crabwheel", 768, 768, cS),
    eq(i, t, e),
    i.headless)
  )
    return;
  let s = iq(e);
  i.night.push(...Object.values(s));
  let n = t.meshes(s, i.group),
    o = [
      [/^wf_(railsR|promR)/, 700],
      [/^wf_(justin|cupid|wharf)/, 1300],
      [/^wf_rpier/, 2400],
      [/^wf_(p39|hyde|ghira|aquatic)/, 2800],
      [/^wf_ferry/, 4e3],
    ],
    a = n
      .map((l) => {
        let c = o.find(([h]) => h.test(l.name));
        return c
          ? (l.geometry.computeBoundingSphere(),
            [l, l.geometry.boundingSphere, c[1]])
          : null;
      })
      .filter(Boolean),
    r = 0;
  i.onUpdate.push((l, c, h) => {
    if (!((r -= h) > 0)) {
      r = 0.4;
      for (let [f, u, d] of a)
        f.visible = Math.hypot(u.center.x - l, u.center.z - c) - u.radius < d;
    }
  });
}
function iq(i) {
  let t = (l, c = {}) => {
      let h = new Ee({
        color: 16777215,
        roughness: 0.8,
        metalness: 0,
        vertexColors: !0,
        ...c,
      });
      return ((h.userData.mbAlbedo = l), (h.userData.dayGlow = 0), h);
    },
    e = {
      atlas: t(XU),
      solid: t(Hg),
      text: t(Dg, {
        alphaTest: 0.5,
        polygonOffset: !0,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -4,
        depthWrite: !1,
      }),
    };
  if (((e.text.userData.surfaceDecal = !0), typeof document > "u")) return e;
  let s = new go(),
    n = (l, c, h) =>
      s.load(
        sq + l,
        (f) => {
          ((f.flipY = !1),
            (f.colorSpace = c ? is : On),
            (f.anisotropy = 8),
            (f.wrapS = f.wrapT = ti),
            (f.needsUpdate = !0),
            h(f));
        },
        void 0,
        () => console.warn("waterfront: missing", l),
      ),
    o = null;
  (n("facades.webp", !0, (l) => {
    ((e.atlas.map = l), (e.atlas.needsUpdate = !0));
  }),
    n("facades_mask.webp", !1, (l) => {
      ((e.atlas.userData.mbExtraMap = l), (e.atlas.needsUpdate = !0));
    }),
    n("tiles.webp", !0, (l) => {
      ((e.solid.map = l), (e.solid.needsUpdate = !0));
    }));
  let a = i.texture();
  e.text.map = a;
  let r = new Image();
  return (
    (r.onload = () => {
      ((o = r), (i.images = { crab: o }), i.redraw?.(), (a.needsUpdate = !0));
    }),
    (r.src = sq + "crab.webp"),
    (i.redraw = () => {
      let l = i.ctx;
      l.clearRect(0, 0, i.W, i.H);
      for (let c of i.items)
        (l.save(),
          l.beginPath(),
          l.rect(c.x, c.y, c.w, c.h),
          l.clip(),
          c.draw(l, c.x, c.y, c.w, c.h, i.images || {}),
          l.restore());
      a.needsUpdate = !0;
    }),
    e
  );
}
