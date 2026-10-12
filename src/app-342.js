// app 342 — math
// Lines 165934-166238 of readable/app.pretty.js (statement-aligned).
function S5t(i, t, e, s) {
  let n = [i, t.toFixed(3), e.toFixed(3), s.toFixed(3)].join(":"),
    o = YQ.get(n);
  if (o) return o;
  let [, a, r] = Mr[i],
    l = 0.016,
    c = Math.max(0.06, t * 0.24),
    h = e - s,
    f = [],
    u = [],
    d = [],
    p = [];
  (f.push(
    jm(
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
      jm(
        [
          [e - 0.004, t - l],
          [e - 0.03, t - l - 0.004],
          [h, t - l - 0.006],
        ],
        48,
      ),
    ),
    d.push(
      jm(
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
    jm(
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
        jm(
          [
            [e - 0.004, t - l],
            [e - 0.05, t - l - 0.01],
            [m, t - l - 0.02],
          ],
          64,
        ),
      ));
  let b = c * 0.92,
    x = t - l * 0.8;
  if (r === "split")
    for (let v = 0; v < a; v++) {
      let y = (v / a) * Math.PI * 2,
        M = 0.075;
      for (let S of [-1, 1])
        f.push(Xx(b, x, 0.026, 0.02, m, 0.028, y + S * M, 0, g));
    }
  else if (r === "mesh")
    for (let v = 0; v < a; v++) {
      let y = (v / a) * Math.PI * 2;
      f.push(
        Xx(b, x, 0.016, 0.012, m, 0.022, y, 0.09, g),
        Xx(b, x, 0.016, 0.012, m - 0.004, 0.022, y + Math.PI / a, -0.09, g),
      );
    }
  else if (r === "fan") {
    for (let v = 0; v < a; v++)
      f.push(Xx(b, x, 0.032, 0.05, m, 0.016, (v / a) * Math.PI * 2, 0.07, g));
    f.push(
      jm(
        [
          [m - 0.012, x - 0.03],
          [m + 0.004, x - 0.028],
          [m + 0.004, x],
        ],
        48,
      ),
    );
  } else if (r === "dish" || r === "blade")
    for (let v = 0; v < a; v++)
      f.push(
        Xx(
          b,
          x,
          r === "blade" ? 0.07 : 0.05,
          r === "blade" ? 0.03 : 0.045,
          m,
          0.03,
          (v / a) * Math.PI * 2,
          r === "blade" ? 0.08 : 0,
          g,
        ),
      );
  else if (r === "mono")
    for (let v = 0; v < a; v++)
      f.push(Xx(b, x, 0.085, 0.06, m, 0.04, (v / a) * Math.PI * 2, 0, g));
  else if (r === "disc") {
    f.push(
      jm(
        [
          [m + 0.004, b],
          [m + 0.012, (b + x) / 2],
          [m + 0.004, x],
        ],
        64,
      ),
    );
    for (let v = 0; v < 6; v++) {
      let y = (v / 6) * Math.PI * 2,
        M = (b + x) / 2,
        S = new ks(0.022, 0.022, 0.008, 12);
      (S.rotateZ(Math.PI / 2),
        S.translate(m + 0.012, M * Math.cos(y), M * Math.sin(y)),
        d.push(S));
    }
  }
  if (r !== "disc")
    for (let v = 0; v < 5; v++) {
      let y = ((v + 0.5) / 5) * Math.PI * 2,
        M = new ks(0.011, 0.011, 0.018, 6);
      (M.rotateZ(Math.PI / 2),
        M.translate(m + g + 0.008, 0.057 * Math.cos(y), 0.057 * Math.sin(y)),
        p.push(M));
    }
  return (
    (o = {
      face: Az(f),
      barrel: Az(u),
      dark: Az(d),
      nuts: p.length ? Az(p) : null,
    }),
    YQ.set(n, o),
    o
  );
}
var k5t = 0.0254;
function nM(i, t, e = null) {
  if (!i?.wheels?.length) return;
  t &&
    i.noWheelTune &&
    (t = { ...t, rim: 0, size: 0, side: 0, width: 0, camF: 0, camR: 0 });
  let s = (i.userData ||= {}),
    n = s.tuneVis,
    o = t
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
  if (n?.key === o) return;
  if (n) {
    for (let h of n.added) h.parent?.remove(h);
    for (let h of n.hidden) h.visible = !0;
    for (let [h, f] of n.scaled) h.scale.x = f;
    for (let h of i.wheels) h.steer.rotation.z = 0;
    i.rideDy = 0;
  }
  if (((s.tuneVis = { key: o, added: [], hidden: [], scaled: [] }), !t)) return;
  let a = s.tuneVis,
    r = y5t(i),
    l = w5t(),
    c = (h, f, u) => {
      let d = new _e(f, u);
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
    ((i.rideDy = t.dh || 0),
    i.wheels.forEach((h, f) => {
      let u = r.W[f],
        p = ((f < 2 ? t.camF : t.camR) * Math.PI) / 180;
      ((h.steer.rotation.z = u.out * p),
        t.width &&
          h.spin.traverse((v) => {
            v.isMesh &&
              JQ.test(v.name) &&
              (a.scaled.push([v, v.scale.x]),
              (v.scale.x *= 1 + 0.07 * t.width));
          }));
      let m = u.xo * (1 + 0.07 * (t.width || 0)),
        g = u.xi * (1 + 0.07 * (t.width || 0)),
        b = new ke();
      ((b.scale.x = u.out), h.spin.add(b), a.added.push(b));
      let x = t.rim
        ? Math.min(
            u.R - 0.05,
            Math.max(u.bead * 0.86, u.bead + ((t.size || 0) * k5t) / 2),
          )
        : u.bead;
      if (t.rim) {
        h.spin.traverse((S) => {
          S.isMesh &&
            !v5t.test(S.name) &&
            !S.name.startsWith("Tune") &&
            S.visible &&
            ((S.visible = !1), a.hidden.push(S));
        });
        let v = m - (t.size > 0 ? 0.004 : 0.016),
          y = S5t(t.rim, x, v, v - g + 0.01),
          M = e ? (s.rimMat ||= l.rim.clone()) : l.rim;
        (e && M.color.set(e),
          c(b, y.face, M),
          c(b, y.barrel, l.barrel),
          c(b, y.dark, l.rotor),
          y.nuts && c(b, y.nuts, l.nut),
          x < u.bead - 0.004 &&
            c(
              b,
              KQ(
                m - 0.012,
                x - 0.002,
                Math.min(u.bead + 0.01, u.R - 0.004),
                64,
                1,
              ),
              l.rubber,
            ));
      }
      if (t.side) {
        let v = x + 0.012,
          y = Math.min(u.R - 0.025, v + Math.max(0.03, (u.R - v) * 0.7));
        if (y > v + 0.012) {
          let M = "side" + t.side,
            S = (s[M] ||= new Ee({
              name: "TuneSide",
              map: M5t(t.side),
              alphaTest: 0.5,
              roughness: 0.7,
              metalness: 0,
              side: Ss,
            }));
          c(b, KQ(m + 0.002, v, y, 96, 2), S);
        }
      }
    }),
    t.wing)
  ) {
    let h = r.deck,
      f = new ke();
    (f.position.set(0, h.y, h.z), i.body.add(f), a.added.push(f));
    let u = h.w;
    if (t.wing === 1) {
      let p = c(f, new qs(u * 0.85, 0.03, 0.12), l.carbon);
      (p.position.set(0, 0.012, 0.02), (p.rotation.x = -0.25));
    } else {
      let p = t.wing === 2 ? 0.17 : 0.3,
        m = t.wing === 2 ? 0.2 : 0.27,
        g = t.wing === 2 ? u * 0.95 : Math.min(1.8, u * 1.05),
        b = c(f, new qs(g, 0.022, m), l.carbon);
      if (
        (b.position.set(0, p, 0.04),
        (b.rotation.x = t.wing === 2 ? -0.12 : -0.2),
        t.wing === 3)
      ) {
        let x = c(f, new qs(g * 0.98, 0.014, 0.08), l.carbon);
        (x.position.set(0, p + 0.035, 0.16), (x.rotation.x = -0.45));
      }
      for (let x of [-1, 1]) {
        let v = c(f, new qs(0.018, p, 0.09), l.carbon);
        (v.position.set(x * g * 0.3, p / 2, 0.02),
          (v.rotation.x = -0.15),
          t.wing === 3 &&
            c(f, new qs(0.012, 0.16, 0.34), l.carbon).position.set(
              (x * g) / 2,
              p + 0.02,
              0.06,
            ));
      }
    }
  }
}
as();
