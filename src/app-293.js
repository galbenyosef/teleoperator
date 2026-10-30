// app 293 — math
// Lines 143442-143653 of readable/app.pretty.js (statement-aligned).
function BQ(o) {
  if (typeof document > "u") return null;
  let t = {},
    e = [],
    s = [],
    n = [],
    i = [],
    a = (u, d, p, m, g, b, v) => {
      let x = new Is(u, d, p);
      (x.translate(m, g, b), x.applyMatrix4(v));
      for (let y of ["uv"]) x.deleteAttribute(y);
      return x;
    },
    r = (u, d, p = !1, m = !1) => {
      e.push([u.x, u.z, u.dx, u.dz]);
      let g = new fe()
          .makeBasis(
            new dt(-u.nx, 0, -u.nz),
            new dt(0, 1, 0),
            new dt(u.dx, 0, u.dz),
          )
          .setPosition(u.x, u.y, u.z),
        b = m ? u.w + 0.2 : u.w + 1,
        v = m ? 0.85 : 0,
        x = 7;
      if (p) {
        let _ = [new dt(-b, 0, 0), new dt(-b, x + 0.4 - 2.2, 0)];
        for (let T = 1; T < 8; T++) {
          let E = Math.PI - ((T / 8) * Math.PI) / 2;
          _.push(
            new dt(
              -b + 2.2 + Math.cos(E) * 2.2,
              x + 0.4 - 2.2 + Math.sin(E) * 2.2,
              0,
            ),
          );
        }
        _.push(new dt(-b + 2.2, x + 0.4, 0), new dt(b - 2.2, x + 0.4, 0));
        for (let T = 1; T < 8; T++) {
          let E = Math.PI / 2 - ((T / 8) * Math.PI) / 2;
          _.push(
            new dt(
              b - 2.2 + Math.cos(E) * 2.2,
              x + 0.4 - 2.2 + Math.sin(E) * 2.2,
              0,
            ),
          );
        }
        _.push(new dt(b, x + 0.4 - 2.2, 0), new dt(b, 0, 0));
        let z = new hm();
        for (let T = 0; T + 1 < _.length; T++) z.add(new cm(_[T], _[T + 1]));
        let A = new dm(z, 96, 0.32, 8, !1);
        (A.deleteAttribute("uv"),
          A.applyMatrix4(g),
          i.push(A),
          i.push(a(b * 2 - 2.2, 0.2, 0.2, 0, x - 0.9, -0.3, g)));
      } else {
        for (let w of [-b, b])
          s.push(
            a(0.36, x + 0.4 - v, 0.36, w, v + (x + 0.4 - v) / 2, 0, g),
            a(m ? 0.5 : 0.9, 0.08, m ? 0.5 : 0.9, w, v + 0.04, 0, g),
          );
        s.push(
          a(b * 2 + 0.5, 0.18, 0.18, 0, x, -0.35, g),
          a(b * 2 + 0.5, 0.18, 0.18, 0, x, 0.35, g),
          a(b * 2 + 0.5, 0.16, 0.16, 0, x - 0.9, -0.35, g),
          a(b * 2 + 0.5, 0.16, 0.16, 0, x - 0.9, 0.35, g),
        );
        for (let w = -b; w <= b + 0.01; w += 1.2)
          s.push(
            a(0.09, 0.9, 0.09, w, x - 0.45, -0.35, g),
            a(0.09, 0.9, 0.09, w, x - 0.45, 0.35, g),
          );
      }
      let y = d.length,
        M = Math.min((u.w * 2 * 0.9) / y, 5.2),
        S = M * 0.5;
      d.forEach((w, _) => {
        let z =
            u.w *
            (y === 1 ? 0 : (1 - (2 * _) / (y - 1)) * (y === 2 ? 0.5 : 0.66)),
          A = (w % 2) * 0.5,
          T = 1 - (Math.floor(w / 2) + 1) / k_,
          E = new Yn(M, S);
        (E.rotateY(Math.PI), E.translate(z, x - 0.95 - S / 2, -0.68));
        let R = 6 / 1024,
          P = 6 / (256 * k_),
          C = E.attributes.uv;
        for (let I = 0; I < C.count; I++)
          C.setXY(
            I,
            A + R + C.getX(I) * (0.5 - 2 * R),
            T + P + C.getY(I) * (1 / k_ - 2 * P),
          );
        (E.applyMatrix4(g),
          n.push(E),
          s.push(
            a(M - 0.1, S - 0.1, 0.08, z, x - 0.95 - S / 2, -0.45, g),
            a(0.08, 0.95, 0.08, z - M * 0.3, x - 0.5, -0.45, g),
            a(0.08, 0.95, 0.08, z + M * 0.3, x - 0.5, -0.45, g),
          ));
      });
    };
  for (let u of s5t) {
    let d = null,
      p = 1e9,
      m = {};
    for (let g of o.edges)
      if (!(g.name !== u.name || !g.oneway || g.inner))
        for (let b = g.s0 + 5; b < g.s1 - 5; b += 2) {
          if ((Ot(g, b, m), m.dx * u.dir[0] + m.dz * u.dir[1] < 0.5)) continue;
          let v = Math.hypot(m.x - u.at[0], m.z - u.at[1]);
          v < p && ((p = v), (d = { ...m, elev: g.elev }));
        }
    d && p < 40 && r(d, u.cells, !!u.arch, !!d.elev);
  }
  for (let u of o.edges)
    if (!(
      u.cls !== "motorway" ||
      !u.oneway ||
      u.inner ||
      u.region ||
      n5t.has(u.name) ||
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
            o.edges.some(
              (b) => b !== u && b.elev && b.layer > u.layer && o5t(b, t.x, t.z),
            ))
        )
          continue;
        let p = (Math.sin(t.x * 12.9898 + t.z * 78.233) * 43758.5453) % 1,
          [m, g] = i5t(u.name, t.dx, t.dz, Math.abs(p));
        r(t, [m, g], !1, u.elev);
      }
  if (!e.length) return null;
  let l = new le();
  l.name = "Gantries";
  let c = new me({ color: 9343894, roughness: 0.5, metalness: 0.55 }),
    h = new me({ color: 16777215, map: e5t(), roughness: 0.45, metalness: 0 }),
    f = new me({ color: 9053206, roughness: 0.45, metalness: 0.3 });
  for (let [u, d, p] of [
    [s, c, "gantry_steel"],
    [n, h, "gantry_signs"],
    [i, f, "gantry_red"],
  ]) {
    if (!u.length) continue;
    let m = wi(u.map((b) => (b.index ? b.toNonIndexed() : b)));
    m.computeBoundingSphere();
    let g = new ye(m, d);
    ((g.name = p),
      (g.castShadow = !0),
      (g.receiveShadow = !0),
      (g.matrixAutoUpdate = !1),
      g.updateMatrix(),
      l.add(g));
  }
  return ((l.userData.count = e.length), (l.userData.placed = e), l);
}
function o5t(o, t, e) {
  let s = o.P,
    n = s.length / 3;
  for (let i = 0; i + 1 < n; i++) {
    let a = s[i * 3],
      r = s[i * 3 + 1],
      l = s[i * 3 + 3],
      c = s[i * 3 + 4],
      h = l - a,
      f = c - r,
      u = h * h + f * f || 1,
      d = Math.max(0, Math.min(1, ((t - a) * h + (e - r) * f) / u));
    if (Math.hypot(t - a - h * d, e - r - f * d) < (o.W[i] || 6) + 6) return !0;
  }
  return !1;
}
es();
var $F = 12;
var NQ = [0, 1, 2, 3, 6, 7],
  a5t = 4,
  r5t = 5,
  z_ = [0, 2, 3, 7, 8, 10, 11, 15],
  l5t = [8, 9, 14, 12, 3, 6, 13, 1],
  HQ = [10, 11, 0, 15, 7, 2, 3, 6],
  DQ = [12, 13, 6, 9],
  UQ = [14, 12, 9],
  c5t = {
    "Clarion Alley": l5t,
    "Balmy Street": HQ,
    "Balmy Alley": HQ,
    "Lilac Street": z_,
    "Cypress Street": z_,
  },
  h5t =
    /^(Route 80|Central Freeway|John F Foran Freeway|Southern Embarcadero Freeway|Dwight D\. Eisenhower Highway|Octavia Boulevard)$/,
  GQ = (o, t = 0) => {
    let e = Math.imul(o | 0, 374761393) ^ Math.imul(t | 0, 668265263);
    return (
      (e = Math.imul(e ^ (e >>> 13), 1274126177)),
      ((e ^ (e >>> 16)) >>> 0) / 4294967296
    );
  },
  _M = 14.6,
  XF = _M / 3;
