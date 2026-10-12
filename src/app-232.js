// app 232 — math
// Lines 121076-121245 of readable/app.pretty.js (statement-aligned).
function bC() {
  let i = [],
    t = (h, f) => {
      h = h.index ? h.toNonIndexed() : h;
      let u = h.attributes.position.count,
        d = new Float32Array(u * 4);
      for (let p = 0; p < u; p++) d.set([...f, 1], p * 4);
      return (
        h.setAttribute("color", new Te(d, 4)),
        h.attributes.uv ||
          h.setAttribute("uv", new Te(new Float32Array(u * 2), 2)),
        h
      );
    },
    e = new _h();
  (e.moveTo(-4.4, -1.35),
    e.lineTo(1.6, -1.4),
    e.quadraticCurveTo(4, -1.1, 4.7, 0),
    e.quadraticCurveTo(4, 1.1, 1.6, 1.4),
    e.lineTo(-4.4, 1.35),
    e.lineTo(-4.4, -1.35));
  let s = new T1(e, { depth: 1.2, bevelEnabled: !1, curveSegments: 6 });
  (s.rotateX(-Math.PI / 2), s.translate(0, -0.45, 0));
  {
    let h = s.attributes.position;
    for (let f = 0; f < h.count; f++)
      h.getY(f) < 0 &&
        (h.setX(f, h.getX(f) * 0.9), h.setZ(f, h.getZ(f) * 0.55));
    s.computeVertexNormals();
  }
  (i.push(t(s, [0.9, 0.9, 0.9])),
    ((h, f, u, d, p, m, g) => {
      let b = new qs(h, f, u);
      (b.translate(d, p, m), i.push(t(b, g)));
    })(3.2, 0.55, 1.7, -0.6, 1, 0, [0.85, 0.83, 0.78]));
  let o = new ks(0.06, 0.08, 12.5, 6);
  (o.translate(0.4, 0.75 + 6.25, 0), i.push(t(o, [0.7, 0.72, 0.74])));
  let a = new ks(0.05, 0.05, 3.8, 5);
  (a.rotateZ(Math.PI / 2),
    a.translate(-1.5, 2.2, 0),
    i.push(t(a, [0.6, 0.6, 0.62])));
  let r = new ks(0.18, 0.18, 3.6, 6);
  (r.rotateZ(Math.PI / 2),
    r.translate(-1.5, 2.05, 0),
    i.push(t(r, [0.1, 0.18, 0.35])));
  let l = i.reduce((h, f) => h + f.attributes.position.count, 0),
    c = new De();
  for (let [h, f] of [
    ["position", 3],
    ["normal", 3],
    ["uv", 2],
    ["color", 4],
  ]) {
    let u = new Float32Array(l * f),
      d = 0;
    for (let p of i)
      (u.set(p.attributes[h].array, d), (d += p.attributes[h].array.length));
    c.setAttribute(h, new Te(u, f));
  }
  return (c.computeBoundingSphere(), c);
}
function _2t(i, t, e) {
  let s = t.G("crissy", "ground");
  if (er.beach) {
    Aa(
      s,
      -4300,
      -470,
      -1965,
      -250,
      3,
      (r, l) =>
        Math.min(3.5 - di(r, l), di(r, l) + 1.6, r + 4300, -1965 - r, -250 - l),
      (r, l) => di(r, l) + 0.06,
      [0.62, 0.58, 0.52, To.sand],
      Kb,
    );
    let o = -3350,
      a = -2150;
    Aa(
      s,
      o,
      -330,
      a,
      -150,
      3,
      (r, l) =>
        Math.min(di(r, l) - 3.55, r - o, a - r, -165 - l, Hi(r, l, 8) ? -1 : 1),
      (r, l) => di(r, l) + 0.08,
      (r, l) =>
        di(r, l) < 3.9
          ? [0.5, 0.49, 0.46, To.sand]
          : [0.5, 0.58, 0.42, To.lawn],
      Kb,
    );
  }
  let n = t.G("crissy", "paint");
  for (let o = 0; o < 18; o++) {
    let a = er.drift[0] + e() * er.drift[1],
      r = jc(a, 1.2) + 3 + e() * 6,
      l = di(a, r),
      c = e() * 3;
    ii(
      n,
      [a, l + 0.15, r],
      [a + Math.cos(c) * (2 + e() * 3), l + 0.15, r + Math.sin(c) * 2],
      0.3,
      0.3,
      [0.45, 0.4, 0.34, 0.9],
    );
  }
}
function z2t(i, t, e) {
  let s = t.G("presidio", "paint"),
    n = t.G("presidio", "foliage"),
    o = (m, g) =>
      m < -1650 && Ws(Math.floor(m / 90), Math.floor(g / 90), 3) < 0.72,
    a = (m, g) =>
      (m > -2330 && m < -1870 && g > 250 && g < 470) ||
      (m > -3360 && m < -2140 && g < -150) ||
      (m > -4640 && m < -4460 && g < -560) ||
      !!Hi(m, g, 16),
    r = 0;
  for (let m = -4600; m < -1700; m += 11)
    for (let g = -300; g < 700; g += 11) {
      let b = m + (e() - 0.5) * 8,
        x = g + (e() - 0.5) * 8;
      if (!o(b, x) || a(b, x) || e() < 0.62) continue;
      let v = di(b, x);
      v < 5 ||
        !(Hi(b, x, 90) || (x < -60 && b > -3500 && b < -2e3)) ||
        (e() < 0.5
          ? GX(s, n, b, v, x, 20 + e() * 14, e)
          : WX(s, n, b, v, x, 11 + e() * 7, e),
        i.colliders.push({ t: "circ", x: b, z: x, r: 0.7 }),
        r++);
    }
  let l = [pC(0), pC(1)],
    c = new Map(),
    h = new ye(),
    f = new wn(),
    u = new Ii(),
    d = new xt(),
    p = new xt();
  for (let m = -7200; m < -1650; m += 23)
    for (let g = -520; g < 1900; g += 23) {
      let b = m + (e() - 0.5) * 18,
        x = g + (e() - 0.5) * 18;
      if (!o(b, x) || a(b, x) || e() < 0.25) continue;
      let v = di(b, x);
      if (v < 6 || (Hi(b, x, 120) && e() < 0.8)) continue;
      let y = e() < 0.55 ? 0 : 1,
        M = 0.8 + e() * 0.6;
      (u.set(0, e() * 6.28, 0),
        f.setFromEuler(u),
        d.set(M * (0.85 + e() * 0.3), M, M * (0.85 + e() * 0.3)),
        p.set(b, v - 0.4, x));
      let S = `${Math.floor(b / 600)},${Math.floor(x / 600)},${y}`,
        w = c.get(S);
      w || c.set(S, (w = []));
      let z = 0.8 + e() * 0.4;
      w.push([h.compose(p, f, d).clone(), [z, z * (0.95 + e() * 0.1), z]]);
    }
  for (let [m, g] of c)
    t.inst("far_" + m, l[+m.split(",")[2]], "foliage", g, { shadow: !1 });
}
as();
En();
as();
as();
