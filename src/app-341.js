// app 341 — math
// Lines 165689-165933 of readable/app.pretty.js (statement-aligned).
function $Q(i, t) {
  let e = vz[i],
    s = e[6],
    n = Math.abs(t) < 1e-9 ? 0 : t;
  return (
    (n > 0 ? "+" : n < 0 ? "\u2212" : "\xB1") +
    Math.abs(n).toFixed(e[5] < 0.1 ? 2 : e[5] < 1 ? 1 : 0) +
    (s.startsWith("%") || s === "\xB0" ? "" : " ") +
    s
  );
}
as();
var JQ = /Tyre|Tires|Tire/,
  v5t = /Tyre|Tires|Tire|Disc|Caliper/,
  Tz = new xt(),
  XQ = new ye();
function y5t(i) {
  if (i.userData?.tuneFit) return i.userData.tuneFit;
  i.root.updateMatrixWorld(!0);
  let t = i.wheels.map((f) => {
    let u = Math.sign(f.c[0]) || 1,
      d = new ye().copy(f.spin.matrixWorld).invert(),
      p = 0,
      m = 1e9,
      g = -1e9,
      b = 1e9,
      x = 0;
    return (
      f.spin.traverse((v) => {
        if (!v.isMesh || !JQ.test(v.name)) return;
        let y = v.geometry?.attributes?.position;
        if (!y?.array?.length) return;
        XQ.multiplyMatrices(d, v.matrixWorld);
        let M = Math.max(1, Math.floor(y.count / 6e3));
        for (let S = 0; S < y.count; S += M) {
          Tz.fromBufferAttribute(y, S).applyMatrix4(XQ);
          let w = Math.hypot(Tz.y, Tz.z),
            z = Tz.x * u;
          ((p = Math.max(p, w)),
            (g = Math.max(g, z)),
            (b = Math.min(b, z)),
            x++,
            w < m && (m = w));
        }
      }),
      (!x || !(p > 0.08) || !(m < p)) &&
        ((p = 0.34), (m = 0.25), (g = 0.13), (b = -0.12)),
      { R: p, bead: Math.max(m, p * 0.55), xo: g, xi: b, out: u }
    );
  });
  for (let [f, u] of [
    [0, 1],
    [2, 3],
  ])
    if (t[f] && t[u]) {
      let d = t[f].R <= t[u].R ? t[f] : t[u];
      for (let p of [f, u])
        t[p] = { ...d, xi: Math.max(t[f].xi, t[u].xi), out: t[p].out };
    }
  let e = Math.max(i.wheels[2].c[2], i.wheels[3].c[2]),
    s = [];
  i.body.traverse((f) => {
    f.isMesh &&
      f.visible &&
      f.geometry?.attributes?.position?.array?.length &&
      !/Glass|Head|Tail|Plate|Lamp/i.test(f.name) &&
      s.push(f);
  });
  let n = new ye().copy(i.model.matrixWorld).invert(),
    o = new cg(),
    a = new xt(0, -1, 0).transformDirection(i.model.matrixWorld),
    r = (f) => {
      o.set(new xt(0, 4, f).applyMatrix4(i.model.matrixWorld), a);
      let u = o.intersectObjects(s, !1)[0];
      return u ? u.point.clone().applyMatrix4(n).y : null;
    },
    l = null,
    c = null;
  if (s.length)
    for (let f = e; f < e + 1.8; f += 0.08) {
      let u = r(f);
      if (u !== null && u > 0.45) l = f;
      else if (l !== null) break;
    }
  if (l !== null) {
    let f = Math.max(e + 0.1, l - 0.3);
    ((c = r(f)), (l = f));
  }
  let h = {
    W: t,
    deck: {
      y: c ?? (i.dims?.tail?.[0]?.[1] ?? 0.9) + 0.12,
      z: l ?? e + 0.7,
      w: Math.min(1.7, (i.dims?.w || 1.9) * 0.82),
    },
  };
  return (((i.userData ||= {}).tuneFit = h), h);
}
var uf = {};
function w5t() {
  if (uf.rim) return uf;
  let i = (t, e) => {
    let s = new t(e);
    return ((s.side = Ss), s);
  };
  return (
    (uf.rim = i(An, {
      name: "TuneRim",
      color: new $t(0.62, 0.63, 0.65),
      metalness: 1,
      roughness: 0.26,
      clearcoat: 0.6,
      clearcoatRoughness: 0.08,
    })),
    (uf.barrel = i(Ee, {
      name: "TuneBarrel",
      color: new $t(0.32, 0.32, 0.33),
      metalness: 1,
      roughness: 0.45,
    })),
    (uf.dark = i(Ee, {
      name: "TuneDark",
      color: new $t(0.02, 0.02, 0.022),
      metalness: 0.2,
      roughness: 0.7,
    })),
    (uf.rotor = i(Ee, {
      name: "TuneRotor",
      color: new $t(0.2, 0.2, 0.21),
      metalness: 0.8,
      roughness: 0.42,
    })),
    (uf.nut = i(Ee, {
      name: "TuneNut",
      color: new $t(0.8, 0.8, 0.82),
      metalness: 1,
      roughness: 0.2,
    })),
    (uf.rubber = i(Ee, {
      name: "TuneRubber",
      color: new $t(0.018, 0.018, 0.02),
      metalness: 0,
      roughness: 0.85,
    })),
    (uf.carbon = i(An, {
      name: "TuneCarbon",
      color: new $t(0.025, 0.026, 0.03),
      metalness: 0.3,
      roughness: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    })),
    uf
  );
}
var wF = {};
function M5t(i) {
  if (wF[i]) return wF[i];
  let t = 2048,
    e = 64,
    s = document.createElement("canvas");
  ((s.width = t), (s.height = e));
  let n = s.getContext("2d");
  if ((n.clearRect(0, 0, t, e), i === 1)) {
    ((n.fillStyle = "#f4f4f0"),
      (n.font = "800 44px Arial Black, Arial, sans-serif"),
      (n.textBaseline = "middle"));
    for (let a = 0; a < 2; a++)
      (n.save(),
        n.translate((a * t) / 2, 0),
        n.fillText("SF DRIVE", 120, e / 2),
        (n.font = "700 30px Arial, sans-serif"),
        n.fillText("RACING RADIAL \xB7 245/35", 520, e / 2 + 2),
        (n.font = "800 44px Arial Black, Arial, sans-serif"),
        n.restore());
  } else
    i === 2
      ? ((n.fillStyle = "#f2f1ea"), n.fillRect(0, 10, t, e - 20))
      : i === 3 && ((n.fillStyle = "#d4141c"), n.fillRect(0, 24, t, 14));
  let o = new Sn(s);
  return ((o.colorSpace = is), (o.wrapS = ti), (o.anisotropy = 4), (wF[i] = o));
}
function jm(i, t = 40) {
  let e = new A1(
    i.map(([s, n]) => new Re(Math.max(n, 1e-4), s)),
    t,
  );
  return (e.rotateZ(-Math.PI / 2), e);
}
function KQ(i, t, e, s = 96, n = 2) {
  let o = [],
    a = [],
    r = [];
  for (let c = 0; c <= s; c++) {
    let h = (c / s) * Math.PI * 2,
      f = Math.cos(h),
      u = Math.sin(h);
    (o.push(i, t * f, t * u, i, e * f, e * u),
      a.push((c / s) * n, 0, (c / s) * n, 1));
  }
  for (let c = 0; c < s; c++) {
    let h = c * 2;
    r.push(h, h + 2, h + 1, h + 1, h + 2, h + 3);
  }
  let l = new De();
  return (
    l.setAttribute("position", new ze(o, 3)),
    l.setAttribute("uv", new ze(a, 2)),
    l.setIndex(r),
    l.computeVertexNormals(),
    l
  );
}
function Xx(i, t, e, s, n, o, a, r = 0, l = 0) {
  let c = new qs(o, t - i, 1, 1, 3, 1),
    h = c.attributes.position;
  for (let f = 0; f < h.count; f++) {
    let u = (h.getY(f) + (t - i) / 2) / (t - i),
      d = e + (s - e) * u;
    (h.setZ(f, h.getZ(f) * d + r * (u - 0.5) * (t - i)),
      h.setX(f, h.getX(f) - o / 2 + n + l * (1 - u) * (1 - u)),
      h.setY(f, i + u * (t - i)));
  }
  return (c.computeVertexNormals(), c.rotateX(a), c);
}
var Az = (i) => {
    let t = [];
    for (let r of i) t.push(r.index ? r.toNonIndexed() : r);
    let e = t.reduce((r, l) => r + l.attributes.position.count, 0),
      s = new Float32Array(e * 3),
      n = new Float32Array(e * 3),
      o = 0;
    for (let r of t)
      (s.set(r.attributes.position.array, o * 3),
        n.set(r.attributes.normal.array, o * 3),
        (o += r.attributes.position.count));
    let a = new De();
    return (
      a.setAttribute("position", new Te(s, 3)),
      a.setAttribute("normal", new Te(n, 3)),
      a.computeBoundingSphere(),
      a
    );
  },
  YQ = new Map();
