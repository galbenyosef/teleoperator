// app 410 — math
// Lines 200999-201340 of readable/app.pretty.js (statement-aligned).
es();
var Zit = new Set([
    "Conzelman Road",
    "McCullough Road",
    "Bunker Road",
    "Field Road",
    "Alexander Avenue",
    "Danes Drive",
    "Moore Road",
    "Upper Fisher Loop",
    "Kirby Cove Road",
    "Mitchell Road",
    "Twin Peaks Boulevard",
    "Christmas Tree Point Road",
    "Lincoln Boulevard",
    "El Camino del Mar",
    "Legion of Honor Drive",
  ]),
  a9 = 2,
  WSt = 90,
  qSt = 45,
  jSt = 1.5,
  Yit = 0.75,
  $St = 0.42,
  XSt = 0.76,
  Jit = 10,
  KSt = 12;
function YSt(o) {
  let t = document.createElement("canvas");
  ((t.width = 96), (t.height = 128));
  let e = t.getContext("2d");
  ((e.fillStyle = "#f6c200"),
    e.fillRect(0, 0, 96, 128),
    (e.strokeStyle = "#111"),
    (e.lineWidth = 6),
    e.strokeRect(3, 3, 90, 122),
    e.save(),
    e.translate(48, 64),
    e.scale(o, 1),
    (e.fillStyle = "#111"),
    e.beginPath(),
    e.moveTo(-26, -40),
    e.lineTo(2, -40),
    e.lineTo(30, 0),
    e.lineTo(2, 40),
    e.lineTo(-26, 40),
    e.lineTo(2, 0),
    e.closePath(),
    e.fill(),
    e.restore());
  let s = new Sn(t);
  return ((s.colorSpace = Je), (s.anisotropy = 4), s);
}
function Qit(o, t, { mobile: e = !1 } = {}) {
  let s = [],
    n = [],
    i = [[], []],
    a = [],
    r = { p: [], n: [], i: [] },
    l = {},
    c = {},
    h = { roads: 0, railM: 0, chevrons: 0, delineators: 0 },
    f = (v, x, y) => Ot(v, Math.max(v.s0, Math.min(v.s1, x)), y);
  for (let v of o) {
    if (!v || v.inner || v.car === !1 || v.s1 - v.s0 < 40) continue;
    h.roads++;
    let x = Math.floor((v.s1 - v.s0 - 2 * Jit) / a9);
    if (x < 2) continue;
    let y = [];
    for (let M = 0; M <= x; M++) {
      let S = v.s0 + Jit + M * a9;
      f(v, S, l);
      let w = Math.max(v.W[l.k] || 3, v.W[l.k + 1] || 3);
      f(v, S - 6, c);
      let _ = c.dx,
        z = c.dz;
      f(v, S + 6, c);
      let A = (_ * c.dz - z * c.dx) / 12,
        T = -l.dz,
        E = l.dx,
        R = [1, -1].map((P) => {
          let C = A > 0 ? -1 : 1,
            I = Math.abs(A) > 1 / WSt && P === C,
            L = l.x + T * P * (w + 3),
            F = l.z + E * P * (w + 3),
            O = t(L, F);
          return I || (Number.isFinite(O) && O < l.y - jSt);
        });
      y.push({
        s: S,
        x: l.x,
        y: l.y,
        z: l.z,
        dx: l.dx,
        dz: l.dz,
        w,
        cr: A,
        side: R,
      });
    }
    for (let [M, S] of [
      [0, 1],
      [1, -1],
    ]) {
      let w = -1,
        _ = (z) => {
          w < 0 || ((z - w) * a9 >= KSt && u(y.slice(w, z + 1), S), (w = -1));
        };
      for (let z = 0; z < y.length; z++) {
        let A =
          y[z].side[M] ||
          (z > 0 && z < y.length - 1 && y[z - 1].side[M] && y[z + 1].side[M]);
        (A && w < 0 && (w = z), A || _(z - 1));
      }
      _(y.length - 1);
      for (let z = 0; z < y.length; z += 15) {
        let A = y[z],
          T = A.w + 0.9;
        (n.push([A.x - A.dz * T * S, A.y, A.z + A.dx * T * S]),
          h.delineators++);
      }
    }
    for (let M = 3; M < y.length - 3; M++) {
      let S = y[M];
      if (
        Math.abs(S.cr) < 1 / qSt ||
        Math.abs(S.cr) < Math.abs(y[M - 1].cr) ||
        Math.abs(S.cr) < Math.abs(y[M + 1].cr)
      )
        continue;
      let w = S.cr > 0 ? -1 : 1,
        _ = S.cr > 0 ? 1 : -1;
      for (let z of [-4, 0, 4]) {
        let A = y[Math.max(0, Math.min(y.length - 1, M + z))],
          T = A.w + 1.3;
        (i[_ > 0 ? 0 : 1].push([
          A.x - A.dz * T * w,
          A.y,
          A.z + A.dx * T * w,
          Math.atan2(-A.dx, -A.dz),
        ]),
          h.chevrons++);
      }
      M += 8;
    }
  }
  function u(v, x) {
    let y = r.p.length / 3;
    for (let M = 0; M < v.length; M++) {
      let S = v[M],
        w = S.w + 0.35,
        _ = S.x - S.dz * w * x,
        z = S.z + S.dx * w * x,
        A = S.dz * x,
        T = -S.dx * x;
      if (
        (r.p.push(_, S.y + $St, z, _, S.y + XSt, z),
        r.n.push(A, 0, T, A, 0, T),
        M)
      ) {
        let E = y + (M - 1) * 2;
        r.i.push(E, E + 2, E + 1, E + 1, E + 2, E + 3);
      }
      s.push([
        S.x - S.dz * (w + 0.12) * x,
        S.y,
        S.z + S.dx * (w + 0.12) * x,
        Math.atan2(-S.dx, -S.dz),
      ]);
    }
    for (let M = 0; M + 1 < v.length; M += 3) {
      let S = v[M],
        w = v[Math.min(v.length - 1, M + 3)],
        _ = (S.w + w.w) / 2 + 0.4,
        z = S.x - S.dz * _ * x,
        A = S.z + S.dx * _ * x,
        T = w.x - w.dz * _ * x,
        E = w.z + w.dx * _ * x,
        R = Math.hypot(T - z, E - A);
      if (R < 0.5) continue;
      let P = Math.atan2(-(T - z), -(E - A));
      a.push({
        t: "obb",
        x: (z + T) / 2,
        z: (A + E) / 2,
        hx: 0.18,
        hz: R / 2 + 0.1,
        c: Math.cos(P),
        s: Math.sin(P),
        y0: Math.min(S.y, w.y) - 0.6,
        y1: Math.max(S.y, w.y) + 1.1,
        rail: !0,
      });
    }
    h.railM += (v.length - 1) * a9;
  }
  let d = new le();
  d.name = "RoadDress";
  let p = new me({
    color: 12172996,
    roughness: 0.38,
    metalness: 0.85,
    side: ls,
  });
  if (r.i.length) {
    let v = new Le();
    (v.setAttribute("position", new Re(r.p, 3)),
      v.setAttribute("normal", new Re(r.n, 3)),
      v.setIndex(r.i),
      v.computeBoundingSphere());
    let x = new ye(v, p);
    ((x.name = "Guardrails"),
      (x.castShadow = !0),
      (x.receiveShadow = !0),
      d.add(x));
  }
  let m = (v, x, y, M, S, w = !0) => {
    if (!y.length) return;
    let _ = new En(v, x, y.length);
    _.name = M;
    let z = new fe(),
      A = new tn(),
      T = new dt(0, 1, 0),
      E = new dt(),
      R = new dt(1, 1, 1);
    return (
      y.forEach((P, C) => {
        (A.setFromAxisAngle(T, P[3] || 0),
          z.compose(E.set(P[0], P[1] + S, P[2]), A, R),
          _.setMatrixAt(C, z));
      }),
      (_.instanceMatrix.needsUpdate = !0),
      _.computeBoundingSphere(),
      (_.castShadow = w && !e),
      (_.receiveShadow = !0),
      d.add(_),
      _
    );
  };
  (m(
    new Is(0.12, Yit + 0.1, 0.16),
    new me({ color: 8423052, roughness: 0.5, metalness: 0.7 }),
    s,
    "RailPosts",
    (Yit + 0.1) / 2,
  ),
    m(
      new Is(0.1, 1, 0.1),
      new me({ color: 15658730, roughness: 0.6 }),
      n,
      "Delineators",
      0.5,
      !1,
    ),
    m(
      new Is(0.11, 0.09, 0.105),
      new me({
        color: 16751130,
        emissive: 16742912,
        emissiveIntensity: 0.6,
        roughness: 0.3,
      }),
      n,
      "Reflectors",
      0.88,
      !1,
    ));
  let g = new me({ color: 9080724, roughness: 0.5, metalness: 0.6 }),
    b = i[0].concat(i[1]);
  return (
    m(new Is(0.07, 1.5, 0.07), g, b, "ChevronPoles", 0.75),
    [1, -1].forEach((v, x) =>
      m(
        new Yn(0.62, 0.8),
        new me({ map: YSt(v), roughness: 0.55, side: ls }),
        i[x],
        "Chevrons",
        1.45,
        !1,
      ),
    ),
    d.traverse((v) => {
      v.isMesh && (v.userData.mbNoReflect = !1);
    }),
    { group: d, colliders: a, stats: h }
  );
}
await No();
var JSt = `
#intro { position: fixed; right: var(--safe-r); top: calc(var(--safe-t) + 64px); transform: translateX(10px); z-index: 11; width: min(400px, calc(100vw - 32px)); padding: 16px 20px 16px; border-radius: var(--r-lg); background: var(--glass-strong); border: 1px solid var(--line); color: var(--ink); font-family: var(--font); box-shadow: var(--sh-2); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); opacity: 0; transition: opacity var(--t-med) var(--ease-out), transform var(--t-med) var(--ease-out); pointer-events: none; overflow: hidden; }
#intro::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: var(--brand); }
#intro.on { opacity: 1; transform: none; pointer-events: auto; }
body.touch #intro { top: auto; bottom: calc(var(--sb) + 10px); right: 50%; transform: translateX(50%); padding: 12px 16px 14px; } body.touch #intro.on { transform: translateX(50%); }
#intro .st { font: var(--fw-black) var(--fs-xs) var(--font); letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--brand-2); }
#intro h3 { margin: 4px 0 6px; font: var(--fw-black) var(--fs-xl) var(--font); font-stretch: var(--wide); letter-spacing: .01em; }
#intro p { margin: 0; font: var(--fw-reg) var(--fs-md)/1.45 var(--font); color: var(--ink-2); }
#intro p kbd { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; margin: 0 2px; border-radius: 5px; background: var(--ink); color: #0b0d10; font: var(--fw-black) 10.5px var(--font); }
#intro .ft { display: flex; align-items: center; gap: 8px; margin-top: 14px; }
#intro .dots { display: flex; gap: 5px; flex: 1; } #intro .dots i { width: 6px; height: 6px; border-radius: 50%; background: var(--ink-4); } #intro .dots i.on { width: 18px; border-radius: 3px; background: var(--brand-2); }
#intro .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--fill); overflow: hidden; } #intro .bar b { display: block; height: 100%; background: var(--brand-2); transform-origin: left; }
#intro button { padding: 8px 14px; border-radius: var(--r-sm); border: 1px solid var(--line-strong); background: var(--fill); color: var(--ink); font: var(--fw-black) var(--fs-xs) var(--font); letter-spacing: var(--ls-label); text-transform: uppercase; cursor: pointer; }
#intro button.go { background: var(--brand); border-color: var(--brand); color: #fff; }
body.photo #intro, body.hud-off #intro { visibility: hidden; }
`,
  tot = 9;
function ZSt({ touch: o = !1, taxi: t = !1 } = {}) {
  let e = (s, n = s) => (o ? n : `<kbd>${s}</kbd>`);
  return [
    {
      st: "Welcome to " + bi.name,
      h: "Drive",
      p: o
        ? "Hold anywhere to drive, slide to steer, a second finger or a pull down to brake."
        : `${e("W")}${e("A")}${e("S")}${e("D")} or the arrows to drive \xB7 tap ${e("S")} in a turn to drift \xB7 ${e("Shift")} nitrous \xB7 ${e("C")} camera. A gamepad works too.`,
    },
    t
      ? {
          st: "Fares and stunts",
          h: "Pick up, drop off, show off",
          p: "Stop at the glowing kerb to pick a passenger up. Near misses, drifts and air chain into a bounty - and the city has speed traps, drift zones and danger signs to beat.",
        }
      : {
          st: "Things to do",
          h: "Stunts and What's next",
          p: "Speed traps, speed zones, drift zones and danger signs across the city - beat them for stars. The card at the top routes you to the nearest one; boards at the viewpoints give XP.",
        },
    {
      st: "Made a mess?",
      h: "Rewind",
      p: o
        ? "Hold the \u27F2 button to run the last 10 seconds back, then drive on. Stuck? The menu puts you back on the road."
        : `Hold ${e("Backspace")} (pad: d-pad left) to run the last 10 seconds back, then drive on. ${e("R")} puts you back on the road.`,
    },
    {
      st: "Find your way",
      h: "The map",
      p: o
        ? "Tap the minimap for the city map: tap a street to go there. The streets you drive are discovered; the menu has the settings."
        : `${e("Tab")} opens the map: click a street to go there. The streets you drive are discovered. ${e("Esc")} for the settings, ${e("H")} for all the keys.`,
    },
  ];
}
