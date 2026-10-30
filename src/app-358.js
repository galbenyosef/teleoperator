// app 358 — math
// Lines 172063-172367 of readable/app.pretty.js (statement-aligned).
function t8t(o, t, e, s) {
  let n = [o, t.toFixed(3), e.toFixed(3), s.toFixed(3)].join(":"),
    i = Kst.get(n);
  if (i) return i;
  let [, a, r] = Hr[o],
    l = 0.016,
    c = Math.max(0.06, t * 0.24),
    h = e - s,
    f = [],
    u = [],
    d = [],
    p = [];
  (f.push(
    F2(
      [
        [e - 0.03, t + 0.004],
        [e - 0.004, t + 0.006],
        [e + 0.004, t + 0.002],
        [e + 0.004, t - l * 0.6],
        [e - 0.004, t - l],
      ],
      64,
    ),
  ),
    u.push(
      F2(
        [
          [e - 0.004, t - l],
          [e - 0.03, t - l - 0.004],
          [h, t - l - 0.006],
        ],
        48,
      ),
    ),
    d.push(
      F2(
        [
          [h + 0.02, c * 0.9],
          [h + 0.02, t * 0.82],
        ],
        40,
      ),
    ));
  let m = r === "dish" ? e - 0.06 : e - 0.008,
    g = r === "dish" ? 0 : r === "fan" || r === "disc" ? 0.002 : -0.022;
  (f.push(
    F2(
      [
        [m + g - 0.03, c + 0.004],
        [m + g + 0.004, c],
        [m + g + 0.012, c * 0.6],
        [m + g + 0.016, 1e-4],
      ],
      32,
    ),
  ),
    r === "dish" &&
      f.push(
        F2(
          [
            [e - 0.004, t - l],
            [e - 0.05, t - l - 0.01],
            [m, t - l - 0.02],
          ],
          64,
        ),
      ));
  let b = c * 0.92,
    v = t - l * 0.8;
  if (r === "split")
    for (let x = 0; x < a; x++) {
      let y = (x / a) * Math.PI * 2,
        M = 0.075;
      for (let S of [-1, 1])
        f.push(Nv(b, v, 0.026, 0.02, m, 0.028, y + S * M, 0, g));
    }
  else if (r === "mesh")
    for (let x = 0; x < a; x++) {
      let y = (x / a) * Math.PI * 2;
      f.push(
        Nv(b, v, 0.016, 0.012, m, 0.022, y, 0.09, g),
        Nv(b, v, 0.016, 0.012, m - 0.004, 0.022, y + Math.PI / a, -0.09, g),
      );
    }
  else if (r === "fan") {
    for (let x = 0; x < a; x++)
      f.push(Nv(b, v, 0.032, 0.05, m, 0.016, (x / a) * Math.PI * 2, 0.07, g));
    f.push(
      F2(
        [
          [m - 0.012, v - 0.03],
          [m + 0.004, v - 0.028],
          [m + 0.004, v],
        ],
        48,
      ),
    );
  } else if (r === "dish" || r === "blade")
    for (let x = 0; x < a; x++)
      f.push(
        Nv(
          b,
          v,
          r === "blade" ? 0.07 : 0.05,
          r === "blade" ? 0.03 : 0.045,
          m,
          0.03,
          (x / a) * Math.PI * 2,
          r === "blade" ? 0.08 : 0,
          g,
        ),
      );
  else if (r === "mono")
    for (let x = 0; x < a; x++)
      f.push(Nv(b, v, 0.085, 0.06, m, 0.04, (x / a) * Math.PI * 2, 0, g));
  else if (r === "disc") {
    f.push(
      F2(
        [
          [m + 0.004, b],
          [m + 0.012, (b + v) / 2],
          [m + 0.004, v],
        ],
        64,
      ),
    );
    for (let x = 0; x < 6; x++) {
      let y = (x / 6) * Math.PI * 2,
        M = (b + v) / 2,
        S = new vs(0.022, 0.022, 0.008, 12);
      (S.rotateZ(Math.PI / 2),
        S.translate(m + 0.012, M * Math.cos(y), M * Math.sin(y)),
        d.push(S));
    }
  }
  if (r !== "disc")
    for (let x = 0; x < 5; x++) {
      let y = ((x + 0.5) / 5) * Math.PI * 2,
        M = new vs(0.011, 0.011, 0.018, 6);
      (M.rotateZ(Math.PI / 2),
        M.translate(m + g + 0.008, 0.057 * Math.cos(y), 0.057 * Math.sin(y)),
        p.push(M));
    }
  return (
    (i = {
      face: jE(f),
      barrel: jE(u),
      dark: jE(d),
      nuts: p.length ? jE(p) : null,
    }),
    Kst.set(n, i),
    i
  );
}
var e8t = 0.0254;
function i4(o, t, e = null) {
  if (!o?.wheels?.length) return;
  t &&
    o.noWheelTune &&
    (t = { ...t, rim: 0, size: 0, side: 0, width: 0, camF: 0, camR: 0 });
  let s = (o.userData ||= {}),
    n = s.tuneVis,
    i = t
      ? JSON.stringify([
          t.rim,
          t.size,
          t.side,
          t.width,
          t.wing,
          +t.dh.toFixed(3),
          +t.camF.toFixed(2),
          +t.camR.toFixed(2),
          e,
        ])
      : "";
  if (n?.key === i) return;
  if (n) {
    for (let h of n.added) h.parent?.remove(h);
    for (let h of n.hidden) h.visible = !0;
    for (let [h, f] of n.scaled) h.scale.x = f;
    for (let h of o.wheels) h.steer.rotation.z = 0;
    o.rideDy = 0;
  }
  if (((s.tuneVis = { key: i, added: [], hidden: [], scaled: [] }), !t)) return;
  let a = s.tuneVis,
    r = J4t(o),
    l = Z4t(),
    c = (h, f, u) => {
      let d = new ye(f, u);
      return (
        (d.castShadow = !0),
        (d.receiveShadow = !0),
        (d.userData.mbMover = !0),
        (d.name = "Tune" + (u.name || "")),
        h.add(d),
        a.added.push(d),
        d
      );
    };
  if (
    ((o.rideDy = t.dh || 0),
    o.wheels.forEach((h, f) => {
      let u = r.W[f],
        p = ((f < 2 ? t.camF : t.camR) * Math.PI) / 180;
      ((h.steer.rotation.z = u.out * p),
        t.width &&
          h.spin.traverse((x) => {
            x.isMesh &&
              Yst.test(x.name) &&
              (a.scaled.push([x, x.scale.x]),
              (x.scale.x *= 1 + 0.07 * t.width));
          }));
      let m = u.xo * (1 + 0.07 * (t.width || 0)),
        g = u.xi * (1 + 0.07 * (t.width || 0)),
        b = new le();
      ((b.scale.x = u.out), h.spin.add(b), a.added.push(b));
      let v = t.rim
        ? Math.min(
            u.R - 0.05,
            Math.max(u.bead * 0.86, u.bead + ((t.size || 0) * e8t) / 2),
          )
        : u.bead;
      if (t.rim) {
        h.spin.traverse((S) => {
          S.isMesh &&
            !Y4t.test(S.name) &&
            !S.name.startsWith("Tune") &&
            S.visible &&
            ((S.visible = !1), a.hidden.push(S));
        });
        let x = m - (t.size > 0 ? 0.004 : 0.016),
          y = t8t(t.rim, v, x, x - g + 0.01),
          M = e ? (s.rimMat ||= l.rim.clone()) : l.rim;
        (e && M.color.set(e),
          c(b, y.face, M),
          c(b, y.barrel, l.barrel),
          c(b, y.dark, l.rotor),
          y.nuts && c(b, y.nuts, l.nut),
          v < u.bead - 0.004 &&
            c(
              b,
              Xst(
                m - 0.012,
                v - 0.002,
                Math.min(u.bead + 0.01, u.R - 0.004),
                64,
                1,
              ),
              l.rubber,
            ));
      }
      if (t.side) {
        let x = v + 0.012,
          y = Math.min(u.R - 0.025, x + Math.max(0.03, (u.R - x) * 0.7));
        if (y > x + 0.012) {
          let M = "side" + t.side,
            S = (s[M] ||= new me({
              name: "TuneSide",
              map: Q4t(t.side),
              alphaTest: 0.5,
              roughness: 0.7,
              metalness: 0,
              side: ls,
            }));
          c(b, Xst(m + 0.002, x, y, 96, 2), S);
        }
      }
    }),
    t.wing)
  ) {
    let h = r.deck,
      f = new le();
    (f.position.set(0, h.y, h.z), o.body.add(f), a.added.push(f));
    let u = h.w;
    if (t.wing === 1) {
      let p = c(f, new Is(u * 0.85, 0.03, 0.12), l.carbon);
      (p.position.set(0, 0.012, 0.02), (p.rotation.x = -0.25));
    } else {
      let p = t.wing === 2 ? 0.17 : 0.3,
        m = t.wing === 2 ? 0.2 : 0.27,
        g = t.wing === 2 ? u * 0.95 : Math.min(1.8, u * 1.05),
        b = c(f, new Is(g, 0.022, m), l.carbon);
      if (
        (b.position.set(0, p, 0.04),
        (b.rotation.x = t.wing === 2 ? -0.12 : -0.2),
        t.wing === 3)
      ) {
        let v = c(f, new Is(g * 0.98, 0.014, 0.08), l.carbon);
        (v.position.set(0, p + 0.035, 0.16), (v.rotation.x = -0.45));
      }
      for (let v of [-1, 1]) {
        let x = c(f, new Is(0.018, p, 0.09), l.carbon);
        (x.position.set(v * g * 0.3, p / 2, 0.02),
          (x.rotation.x = -0.15),
          t.wing === 3 &&
            c(f, new Is(0.012, 0.16, 0.34), l.carbon).position.set(
              (v * g) / 2,
              p + 0.02,
              0.06,
            ));
      }
    }
  }
}
es();
