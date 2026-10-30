// app 357 — math
// Lines 171818-172062 of readable/app.pretty.js (statement-aligned).
function jst(o, t) {
  let e = OE[o],
    s = e[6],
    n = Math.abs(t) < 1e-9 ? 0 : t;
  return (
    (n > 0 ? "+" : n < 0 ? "\u2212" : "\xB1") +
    Math.abs(n).toFixed(e[5] < 0.1 ? 2 : e[5] < 1 ? 1 : 0) +
    (s.startsWith("%") || s === "\xB0" ? "" : " ") +
    s
  );
}
es();
var Yst = /Tyre|Tires|Tire/,
  Y4t = /Tyre|Tires|Tire|Disc|Caliper/,
  qE = new dt(),
  $st = new fe();
function J4t(o) {
  if (o.userData?.tuneFit) return o.userData.tuneFit;
  o.root.updateMatrixWorld(!0);
  let t = o.wheels.map((f) => {
    let u = Math.sign(f.c[0]) || 1,
      d = new fe().copy(f.spin.matrixWorld).invert(),
      p = 0,
      m = 1e9,
      g = -1e9,
      b = 1e9,
      v = 0;
    return (
      f.spin.traverse((x) => {
        if (!x.isMesh || !Yst.test(x.name)) return;
        let y = x.geometry?.attributes?.position;
        if (!y?.array?.length) return;
        $st.multiplyMatrices(d, x.matrixWorld);
        let M = Math.max(1, Math.floor(y.count / 6e3));
        for (let S = 0; S < y.count; S += M) {
          qE.fromBufferAttribute(y, S).applyMatrix4($st);
          let w = Math.hypot(qE.y, qE.z),
            _ = qE.x * u;
          ((p = Math.max(p, w)),
            (g = Math.max(g, _)),
            (b = Math.min(b, _)),
            v++,
            w < m && (m = w));
        }
      }),
      (!v || !(p > 0.08) || !(m < p)) &&
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
  let e = Math.max(o.wheels[2].c[2], o.wheels[3].c[2]),
    s = [];
  o.body.traverse((f) => {
    f.isMesh &&
      f.visible &&
      f.geometry?.attributes?.position?.array?.length &&
      !/Glass|Head|Tail|Plate|Lamp/i.test(f.name) &&
      s.push(f);
  });
  let n = new fe().copy(o.model.matrixWorld).invert(),
    i = new Qg(),
    a = new dt(0, -1, 0).transformDirection(o.model.matrixWorld),
    r = (f) => {
      i.set(new dt(0, 4, f).applyMatrix4(o.model.matrixWorld), a);
      let u = i.intersectObjects(s, !1)[0];
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
      y: c ?? (o.dims?.tail?.[0]?.[1] ?? 0.9) + 0.12,
      z: l ?? e + 0.7,
      w: Math.min(1.7, (o.dims?.w || 1.9) * 0.82),
    },
  };
  return (((o.userData ||= {}).tuneFit = h), h);
}
var Xf = {};
function Z4t() {
  if (Xf.rim) return Xf;
  let o = (t, e) => {
    let s = new t(e);
    return ((s.side = ls), s);
  };
  return (
    (Xf.rim = o(mn, {
      name: "TuneRim",
      color: new It(0.62, 0.63, 0.65),
      metalness: 1,
      roughness: 0.26,
      clearcoat: 0.6,
      clearcoatRoughness: 0.08,
    })),
    (Xf.barrel = o(me, {
      name: "TuneBarrel",
      color: new It(0.32, 0.32, 0.33),
      metalness: 1,
      roughness: 0.45,
    })),
    (Xf.dark = o(me, {
      name: "TuneDark",
      color: new It(0.02, 0.02, 0.022),
      metalness: 0.2,
      roughness: 0.7,
    })),
    (Xf.rotor = o(me, {
      name: "TuneRotor",
      color: new It(0.2, 0.2, 0.21),
      metalness: 0.8,
      roughness: 0.42,
    })),
    (Xf.nut = o(me, {
      name: "TuneNut",
      color: new It(0.8, 0.8, 0.82),
      metalness: 1,
      roughness: 0.2,
    })),
    (Xf.rubber = o(me, {
      name: "TuneRubber",
      color: new It(0.018, 0.018, 0.02),
      metalness: 0,
      roughness: 0.85,
    })),
    (Xf.carbon = o(mn, {
      name: "TuneCarbon",
      color: new It(0.025, 0.026, 0.03),
      metalness: 0.3,
      roughness: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    })),
    Xf
  );
}
var bB = {};
function Q4t(o) {
  if (bB[o]) return bB[o];
  let t = 2048,
    e = 64,
    s = document.createElement("canvas");
  ((s.width = t), (s.height = e));
  let n = s.getContext("2d");
  if ((n.clearRect(0, 0, t, e), o === 1)) {
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
    o === 2
      ? ((n.fillStyle = "#f2f1ea"), n.fillRect(0, 10, t, e - 20))
      : o === 3 && ((n.fillStyle = "#d4141c"), n.fillRect(0, 24, t, 14));
  let i = new Sn(s);
  return ((i.colorSpace = Je), (i.wrapS = oi), (i.anisotropy = 4), (bB[o] = i));
}
function F2(o, t = 40) {
  let e = new Mu(
    o.map(([s, n]) => new Pe(Math.max(n, 1e-4), s)),
    t,
  );
  return (e.rotateZ(-Math.PI / 2), e);
}
function Xst(o, t, e, s = 96, n = 2) {
  let i = [],
    a = [],
    r = [];
  for (let c = 0; c <= s; c++) {
    let h = (c / s) * Math.PI * 2,
      f = Math.cos(h),
      u = Math.sin(h);
    (i.push(o, t * f, t * u, o, e * f, e * u),
      a.push((c / s) * n, 0, (c / s) * n, 1));
  }
  for (let c = 0; c < s; c++) {
    let h = c * 2;
    r.push(h, h + 2, h + 1, h + 1, h + 2, h + 3);
  }
  let l = new Le();
  return (
    l.setAttribute("position", new Re(i, 3)),
    l.setAttribute("uv", new Re(a, 2)),
    l.setIndex(r),
    l.computeVertexNormals(),
    l
  );
}
function Nv(o, t, e, s, n, i, a, r = 0, l = 0) {
  let c = new Is(i, t - o, 1, 1, 3, 1),
    h = c.attributes.position;
  for (let f = 0; f < h.count; f++) {
    let u = (h.getY(f) + (t - o) / 2) / (t - o),
      d = e + (s - e) * u;
    (h.setZ(f, h.getZ(f) * d + r * (u - 0.5) * (t - o)),
      h.setX(f, h.getX(f) - i / 2 + n + l * (1 - u) * (1 - u)),
      h.setY(f, o + u * (t - o)));
  }
  return (c.computeVertexNormals(), c.rotateX(a), c);
}
var jE = (o) => {
    let t = [];
    for (let r of o) t.push(r.index ? r.toNonIndexed() : r);
    let e = t.reduce((r, l) => r + l.attributes.position.count, 0),
      s = new Float32Array(e * 3),
      n = new Float32Array(e * 3),
      i = 0;
    for (let r of t)
      (s.set(r.attributes.position.array, i * 3),
        n.set(r.attributes.normal.array, i * 3),
        (i += r.attributes.position.count));
    let a = new Le();
    return (
      a.setAttribute("position", new Te(s, 3)),
      a.setAttribute("normal", new Te(n, 3)),
      a.computeBoundingSphere(),
      a
    );
  },
  Kst = new Map();
