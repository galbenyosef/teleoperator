// app 393 — math
// Lines 193168-193507 of readable/app.pretty.js (statement-aligned).
as();
var Det = new Set([
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
  HE = 2,
  Qwt = 90,
  tMt = 45,
  eMt = 1.5,
  Oet = 0.75,
  sMt = 0.42,
  nMt = 0.76,
  Het = 10,
  iMt = 12;
function oMt(i) {
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
    e.scale(i, 1),
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
  return ((s.colorSpace = is), (s.anisotropy = 4), s);
}
function Uet(i, t, { mobile: e = !1 } = {}) {
  let s = [],
    n = [],
    o = [[], []],
    a = [],
    r = { p: [], n: [], i: [] },
    l = {},
    c = {},
    h = { roads: 0, railM: 0, chevrons: 0, delineators: 0 },
    f = (x, v, y) => Ot(x, Math.max(x.s0, Math.min(x.s1, v)), y);
  for (let x of i) {
    if (!x || x.inner || x.car === !1 || x.s1 - x.s0 < 40) continue;
    h.roads++;
    let v = Math.floor((x.s1 - x.s0 - 2 * Het) / HE);
    if (v < 2) continue;
    let y = [];
    for (let M = 0; M <= v; M++) {
      let S = x.s0 + Het + M * HE;
      f(x, S, l);
      let w = Math.max(x.W[l.k] || 3, x.W[l.k + 1] || 3);
      f(x, S - 6, c);
      let z = c.dx,
        _ = c.dz;
      f(x, S + 6, c);
      let R = (z * c.dz - _ * c.dx) / 12,
        T = -l.dz,
        E = l.dx,
        A = [1, -1].map((C) => {
          let P = R > 0 ? -1 : 1,
            I = Math.abs(R) > 1 / Qwt && C === P,
            L = l.x + T * C * (w + 3),
            F = l.z + E * C * (w + 3),
            N = t(L, F);
          return I || (Number.isFinite(N) && N < l.y - eMt);
        });
      y.push({
        s: S,
        x: l.x,
        y: l.y,
        z: l.z,
        dx: l.dx,
        dz: l.dz,
        w,
        cr: R,
        side: A,
      });
    }
    for (let [M, S] of [
      [0, 1],
      [1, -1],
    ]) {
      let w = -1,
        z = (_) => {
          w < 0 || ((_ - w) * HE >= iMt && u(y.slice(w, _ + 1), S), (w = -1));
        };
      for (let _ = 0; _ < y.length; _++) {
        let R =
          y[_].side[M] ||
          (_ > 0 && _ < y.length - 1 && y[_ - 1].side[M] && y[_ + 1].side[M]);
        (R && w < 0 && (w = _), R || z(_ - 1));
      }
      z(y.length - 1);
      for (let _ = 0; _ < y.length; _ += 15) {
        let R = y[_],
          T = R.w + 0.9;
        (n.push([R.x - R.dz * T * S, R.y, R.z + R.dx * T * S]),
          h.delineators++);
      }
    }
    for (let M = 3; M < y.length - 3; M++) {
      let S = y[M];
      if (
        Math.abs(S.cr) < 1 / tMt ||
        Math.abs(S.cr) < Math.abs(y[M - 1].cr) ||
        Math.abs(S.cr) < Math.abs(y[M + 1].cr)
      )
        continue;
      let w = S.cr > 0 ? -1 : 1,
        z = S.cr > 0 ? 1 : -1;
      for (let _ of [-4, 0, 4]) {
        let R = y[Math.max(0, Math.min(y.length - 1, M + _))],
          T = R.w + 1.3;
        (o[z > 0 ? 0 : 1].push([
          R.x - R.dz * T * w,
          R.y,
          R.z + R.dx * T * w,
          Math.atan2(-R.dx, -R.dz),
        ]),
          h.chevrons++);
      }
      M += 8;
    }
  }
  function u(x, v) {
    let y = r.p.length / 3;
    for (let M = 0; M < x.length; M++) {
      let S = x[M],
        w = S.w + 0.35,
        z = S.x - S.dz * w * v,
        _ = S.z + S.dx * w * v,
        R = S.dz * v,
        T = -S.dx * v;
      if (
        (r.p.push(z, S.y + sMt, _, z, S.y + nMt, _),
        r.n.push(R, 0, T, R, 0, T),
        M)
      ) {
        let E = y + (M - 1) * 2;
        r.i.push(E, E + 2, E + 1, E + 1, E + 2, E + 3);
      }
      s.push([
        S.x - S.dz * (w + 0.12) * v,
        S.y,
        S.z + S.dx * (w + 0.12) * v,
        Math.atan2(-S.dx, -S.dz),
      ]);
    }
    for (let M = 0; M + 1 < x.length; M += 3) {
      let S = x[M],
        w = x[Math.min(x.length - 1, M + 3)],
        z = (S.w + w.w) / 2 + 0.4,
        _ = S.x - S.dz * z * v,
        R = S.z + S.dx * z * v,
        T = w.x - w.dz * z * v,
        E = w.z + w.dx * z * v,
        A = Math.hypot(T - _, E - R);
      if (A < 0.5) continue;
      let C = Math.atan2(-(T - _), -(E - R));
      a.push({
        t: "obb",
        x: (_ + T) / 2,
        z: (R + E) / 2,
        hx: 0.18,
        hz: A / 2 + 0.1,
        c: Math.cos(C),
        s: Math.sin(C),
        y0: Math.min(S.y, w.y) - 0.6,
        y1: Math.max(S.y, w.y) + 1.1,
        rail: !0,
      });
    }
    h.railM += (x.length - 1) * HE;
  }
  let d = new ke();
  d.name = "RoadDress";
  let p = new Ee({
    color: 12172996,
    roughness: 0.38,
    metalness: 0.85,
    side: Ss,
  });
  if (r.i.length) {
    let x = new De();
    (x.setAttribute("position", new ze(r.p, 3)),
      x.setAttribute("normal", new ze(r.n, 3)),
      x.setIndex(r.i),
      x.computeBoundingSphere());
    let v = new _e(x, p);
    ((v.name = "Guardrails"),
      (v.castShadow = !0),
      (v.receiveShadow = !0),
      d.add(v));
  }
  let m = (x, v, y, M, S, w = !0) => {
    if (!y.length) return;
    let z = new zn(x, v, y.length);
    z.name = M;
    let _ = new ye(),
      R = new wn(),
      T = new xt(0, 1, 0),
      E = new xt(),
      A = new xt(1, 1, 1);
    return (
      y.forEach((C, P) => {
        (R.setFromAxisAngle(T, C[3] || 0),
          _.compose(E.set(C[0], C[1] + S, C[2]), R, A),
          z.setMatrixAt(P, _));
      }),
      (z.instanceMatrix.needsUpdate = !0),
      z.computeBoundingSphere(),
      (z.castShadow = w && !e),
      (z.receiveShadow = !0),
      d.add(z),
      z
    );
  };
  (m(
    new qs(0.12, Oet + 0.1, 0.16),
    new Ee({ color: 8423052, roughness: 0.5, metalness: 0.7 }),
    s,
    "RailPosts",
    (Oet + 0.1) / 2,
  ),
    m(
      new qs(0.1, 1, 0.1),
      new Ee({ color: 15658730, roughness: 0.6 }),
      n,
      "Delineators",
      0.5,
      !1,
    ),
    m(
      new qs(0.11, 0.09, 0.105),
      new Ee({
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
  let g = new Ee({ color: 9080724, roughness: 0.5, metalness: 0.6 }),
    b = o[0].concat(o[1]);
  return (
    m(new qs(0.07, 1.5, 0.07), g, b, "ChevronPoles", 0.75),
    [1, -1].forEach((x, v) =>
      m(
        new $n(0.62, 0.8),
        new Ee({ map: oMt(x), roughness: 0.55, side: Ss }),
        o[v],
        "Chevrons",
        1.45,
        !1,
      ),
    ),
    d.traverse((x) => {
      x.isMesh && (x.userData.mbNoReflect = !1);
    }),
    { group: d, colliders: a, stats: h }
  );
}
var aMt = `
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
`;
function rMt({ touch: i = !1, taxi: t = !1 } = {}) {
  let e = (s, n = s) => (i ? n : `<kbd>${s}</kbd>`);
  return [
    {
      st: "Welcome to San Francisco",
      h: "Drive",
      p: i
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
      p: i
        ? "Hold the \u27F2 button to run the last 10 seconds back, then drive on. Stuck? The menu puts you back on the road."
        : `Hold ${e("Backspace")} (pad: d-pad left) to run the last 10 seconds back, then drive on. ${e("R")} puts you back on the road.`,
    },
    {
      st: "Find your way",
      h: "The map",
      p: i
        ? "Tap the minimap for the city map: tap a street to go there. The streets you drive are discovered; the menu has the settings."
        : `${e("Tab")} opens the map: click a street to go there. The streets you drive are discovered. ${e("Esc")} for the settings, ${e("H")} for all the keys.`,
    },
  ];
}
