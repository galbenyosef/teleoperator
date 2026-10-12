// app 294 — math
// Lines 143165-143376 of readable/app.pretty.js (statement-aligned).
function IJ(i) {
  if (typeof document > "u") return null;
  let t = {},
    e = [],
    s = [],
    n = [],
    o = [],
    a = (u, d, p, m, g, b, x) => {
      let v = new qs(u, d, p);
      (v.translate(m, g, b), v.applyMatrix4(x));
      for (let y of ["uv"]) v.deleteAttribute(y);
      return v;
    },
    r = (u, d, p = !1, m = !1) => {
      e.push([u.x, u.z, u.dx, u.dz]);
      let g = new ye()
          .makeBasis(
            new xt(-u.nx, 0, -u.nz),
            new xt(0, 1, 0),
            new xt(u.dx, 0, u.dz),
          )
          .setPosition(u.x, u.y, u.z),
        b = m ? u.w + 0.2 : u.w + 1,
        x = m ? 0.85 : 0,
        v = 7;
      if (p) {
        let z = [new xt(-b, 0, 0), new xt(-b, v + 0.4 - 2.2, 0)];
        for (let T = 1; T < 8; T++) {
          let E = Math.PI - ((T / 8) * Math.PI) / 2;
          z.push(
            new xt(
              -b + 2.2 + Math.cos(E) * 2.2,
              v + 0.4 - 2.2 + Math.sin(E) * 2.2,
              0,
            ),
          );
        }
        z.push(new xt(-b + 2.2, v + 0.4, 0), new xt(b - 2.2, v + 0.4, 0));
        for (let T = 1; T < 8; T++) {
          let E = Math.PI / 2 - ((T / 8) * Math.PI) / 2;
          z.push(
            new xt(
              b - 2.2 + Math.cos(E) * 2.2,
              v + 0.4 - 2.2 + Math.sin(E) * 2.2,
              0,
            ),
          );
        }
        z.push(new xt(b, v + 0.4 - 2.2, 0), new xt(b, 0, 0));
        let _ = new z1();
        for (let T = 0; T + 1 < z.length; T++) _.add(new _1(z[T], z[T + 1]));
        let R = new R1(_, 96, 0.32, 8, !1);
        (R.deleteAttribute("uv"),
          R.applyMatrix4(g),
          o.push(R),
          o.push(a(b * 2 - 2.2, 0.2, 0.2, 0, v - 0.9, -0.3, g)));
      } else {
        for (let w of [-b, b])
          s.push(
            a(0.36, v + 0.4 - x, 0.36, w, x + (v + 0.4 - x) / 2, 0, g),
            a(m ? 0.5 : 0.9, 0.08, m ? 0.5 : 0.9, w, x + 0.04, 0, g),
          );
        s.push(
          a(b * 2 + 0.5, 0.18, 0.18, 0, v, -0.35, g),
          a(b * 2 + 0.5, 0.18, 0.18, 0, v, 0.35, g),
          a(b * 2 + 0.5, 0.16, 0.16, 0, v - 0.9, -0.35, g),
          a(b * 2 + 0.5, 0.16, 0.16, 0, v - 0.9, 0.35, g),
        );
        for (let w = -b; w <= b + 0.01; w += 1.2)
          s.push(
            a(0.09, 0.9, 0.09, w, v - 0.45, -0.35, g),
            a(0.09, 0.9, 0.09, w, v - 0.45, 0.35, g),
          );
      }
      let y = d.length,
        M = Math.min((u.w * 2 * 0.9) / y, 5.2),
        S = M * 0.5;
      d.forEach((w, z) => {
        let _ =
            u.w *
            (y === 1 ? 0 : (1 - (2 * z) / (y - 1)) * (y === 2 ? 0.5 : 0.66)),
          R = (w % 2) * 0.5,
          T = 1 - (Math.floor(w / 2) + 1) / k_,
          E = new $n(M, S);
        (E.rotateY(Math.PI), E.translate(_, v - 0.95 - S / 2, -0.68));
        let A = 6 / 1024,
          C = 6 / (256 * k_),
          P = E.attributes.uv;
        for (let I = 0; I < P.count; I++)
          P.setXY(
            I,
            R + A + P.getX(I) * (0.5 - 2 * A),
            T + C + P.getY(I) * (1 / k_ - 2 * C),
          );
        (E.applyMatrix4(g),
          n.push(E),
          s.push(
            a(M - 0.1, S - 0.1, 0.08, _, v - 0.95 - S / 2, -0.45, g),
            a(0.08, 0.95, 0.08, _ - M * 0.3, v - 0.5, -0.45, g),
            a(0.08, 0.95, 0.08, _ + M * 0.3, v - 0.5, -0.45, g),
          ));
      });
    };
  for (let u of Pxt) {
    let d = null,
      p = 1e9,
      m = {};
    for (let g of i.edges)
      if (!(g.name !== u.name || !g.oneway || g.inner))
        for (let b = g.s0 + 5; b < g.s1 - 5; b += 2) {
          if ((Ot(g, b, m), m.dx * u.dir[0] + m.dz * u.dir[1] < 0.5)) continue;
          let x = Math.hypot(m.x - u.at[0], m.z - u.at[1]);
          x < p && ((p = x), (d = { ...m, elev: g.elev }));
        }
    d && p < 40 && r(d, u.cells, !!u.arch, !!d.elev);
  }
  for (let u of i.edges)
    if (!(
      u.cls !== "motorway" ||
      !u.oneway ||
      u.inner ||
      u.region ||
      Cxt.has(u.name) ||
      u.s1 - u.s0 < 60
    ))
      for (let d = u.s0 + 25; d < u.s1 - 25; d += 30) {
        if (
          (Ot(u, d, t),
          t.w < 4.5 ||
            e.some(
              (b) =>
                Math.hypot(b[0] - t.x, b[1] - t.z) < 380 &&
                b[2] * t.dx + b[3] * t.dz > 0.5,
            ) ||
            e.some((b) => Math.hypot(b[0] - t.x, b[1] - t.z) < 25) ||
            i.edges.some(
              (b) => b !== u && b.elev && b.layer > u.layer && Ixt(b, t.x, t.z),
            ))
        )
          continue;
        let p = (Math.sin(t.x * 12.9898 + t.z * 78.233) * 43758.5453) % 1,
          [m, g] = Lxt(u.name, t.dx, t.dz, Math.abs(p));
        r(t, [m, g], !1, u.elev);
      }
  if (!e.length) return null;
  let l = new ke();
  l.name = "Gantries";
  let c = new Ee({ color: 9343894, roughness: 0.5, metalness: 0.55 }),
    h = new Ee({ color: 16777215, map: Rxt(), roughness: 0.45, metalness: 0 }),
    f = new Ee({ color: 9053206, roughness: 0.45, metalness: 0.3 });
  for (let [u, d, p] of [
    [s, c, "gantry_steel"],
    [n, h, "gantry_signs"],
    [o, f, "gantry_red"],
  ]) {
    if (!u.length) continue;
    let m = wi(u.map((b) => (b.index ? b.toNonIndexed() : b)));
    m.computeBoundingSphere();
    let g = new _e(m, d);
    ((g.name = p),
      (g.castShadow = !0),
      (g.receiveShadow = !0),
      (g.matrixAutoUpdate = !1),
      g.updateMatrix(),
      l.add(g));
  }
  return ((l.userData.count = e.length), (l.userData.placed = e), l);
}
function Ixt(i, t, e) {
  let s = i.P,
    n = s.length / 3;
  for (let o = 0; o + 1 < n; o++) {
    let a = s[o * 3],
      r = s[o * 3 + 1],
      l = s[o * 3 + 3],
      c = s[o * 3 + 4],
      h = l - a,
      f = c - r,
      u = h * h + f * f || 1,
      d = Math.max(0, Math.min(1, ((t - a) * h + (e - r) * f) / u));
    if (Math.hypot(t - a - h * d, e - r - f * d) < (i.W[o] || 6) + 6) return !0;
  }
  return !1;
}
as();
var bI = 12;
var FJ = [0, 1, 2, 3, 6, 7],
  Fxt = 4,
  Nxt = 5,
  __ = [0, 2, 3, 7, 8, 10, 11, 15],
  Bxt = [8, 9, 14, 12, 3, 6, 13, 1],
  NJ = [10, 11, 0, 15, 7, 2, 3, 6],
  BJ = [12, 13, 6, 9],
  OJ = [14, 12, 9],
  Oxt = {
    "Clarion Alley": Bxt,
    "Balmy Street": NJ,
    "Balmy Alley": NJ,
    "Lilac Street": __,
    "Cypress Street": __,
  },
  Hxt =
    /^(Route 80|Central Freeway|John F Foran Freeway|Southern Embarcadero Freeway|Dwight D\. Eisenhower Highway|Octavia Boulevard)$/,
  HJ = (i, t = 0) => {
    let e = Math.imul(i | 0, 374761393) ^ Math.imul(t | 0, 668265263);
    return (
      (e = Math.imul(e ^ (e >>> 13), 1274126177)),
      ((e ^ (e >>> 16)) >>> 0) / 4294967296
    );
  },
  Pw = 14.6,
  xI = Pw / 3;
