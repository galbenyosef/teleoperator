// app 339 — math
// Lines 164776-165035 of readable/app.pretty.js (statement-aligned).
function d5t(i, t, e) {
  let s = t.some((_) => e(_.m)),
    n = {
      col: [0.6, 0.6, 0.6],
      tol: 0.18,
      sep: s,
      belt: null,
      rough: i.roughness ?? 0.5,
      metal: i.metalness ?? 0,
    },
    o = (_) => (_ <= 0.04045 ? _ / 12.92 : Math.pow((_ + 0.055) / 1.055, 2.4)),
    a = i.color ? [i.color.r, i.color.g, i.color.b] : [1, 1, 1],
    r = [],
    l = null,
    c = 512;
  if (i.map?.image && typeof OffscreenCanvas == "function")
    try {
      let _ = new OffscreenCanvas(c, c),
        R = _.getContext("2d", { willReadFrequently: !0 });
      (R.drawImage(i.map.image, 0, 0, c, c),
        (l = R.getImageData(0, 0, c, c).data));
    } catch {
      l = null;
    }
  let h = (_, R) => {
    let T = Math.min(c - 1, Math.max(0, Math.floor((_ - Math.floor(_)) * c))),
      E = Math.min(c - 1, Math.max(0, Math.floor((R - Math.floor(R)) * c))),
      A = (E * c + T) * 4;
    return [o(l[A] / 255), o(l[A + 1] / 255), o(l[A + 2] / 255)];
  };
  for (let _ of t) {
    if (_.m !== i) continue;
    let R = _.g.attributes.position,
      T = _.g.attributes.normal,
      E = _.g.attributes.uv,
      A = _.g.index,
      C = (A ? A.count : R.count) / 3,
      P = Math.max(1, Math.floor(C / 8e3)),
      I = (L) => (A ? A.getX(L) : L);
    for (let L = 0; L < C; L += P) {
      let F = I(3 * L),
        N = I(3 * L + 1),
        B = I(3 * L + 2),
        H =
          l && E
            ? h(
                (E.getX(F) + E.getX(N) + E.getX(B)) / 3,
                (E.getY(F) + E.getY(N) + E.getY(B)) / 3,
              )
            : [1, 1, 1],
        O = R.getX(N) - R.getX(F),
        D = R.getY(N) - R.getY(F),
        U = R.getZ(N) - R.getZ(F),
        G = R.getX(B) - R.getX(F),
        q = R.getY(B) - R.getY(F),
        W = R.getZ(B) - R.getZ(F),
        V = 0.5 * Math.hypot(D * W - U * q, U * G - O * W, O * q - D * G);
      r.push([
        H[0] * a[0],
        H[1] * a[1],
        H[2] * a[2],
        (R.getY(F) + R.getY(N) + R.getY(B)) / 3,
        T ? Math.abs(T.getX(F) + T.getX(N) + T.getX(B)) / 3 : 0,
        V,
        Math.abs(R.getX(F) + R.getX(N) + R.getX(B)) / 3,
        T ? (T.getY(F) + T.getY(N) + T.getY(B)) / 3 : 0,
      ]);
    }
  }
  if (!r.length) return n;
  let f = 0;
  for (let _ of r) f = Math.max(f, _[6]);
  for (let _ of r)
    _[5] *= _[6] > f * 0.72 && _[7] > -0.3 && _[4] > 0.3 ? 1 : 0.02;
  let u = (_) => Math.min(5, Math.floor(Math.pow(Math.max(0, _), 1 / 2.2) * 6)),
    d = new Map();
  for (let _ of r) {
    let R = u(_[0]) * 36 + u(_[1]) * 6 + u(_[2]);
    d.set(R, (d.get(R) || 0) + _[5]);
  }
  let p = [...d.entries()].sort((_, R) => R[1] - _[1])[0][0],
    m = 0,
    g = [0, 0, 0];
  for (let _ of r)
    u(_[0]) * 36 + u(_[1]) * 6 + u(_[2]) === p &&
      ((g[0] += _[0] * _[5]),
      (g[1] += _[1] * _[5]),
      (g[2] += _[2] * _[5]),
      (m += _[5]));
  n.col = g.map((_) => Math.max(0.004, _ / Math.max(m, 1e-9)));
  let b = (_) => 0.2126 * _[0] + 0.7152 * _[1] + 0.0722 * _[2],
    x = b(n.col),
    v = (_) => {
      let R = Math.max(b(_), 0.001);
      return [_[0] / R, _[1] / R, _[2] / R];
    },
    y = v(n.col),
    M = 1 / 0,
    S = -1 / 0;
  for (let _ of r) ((M = Math.min(M, _[3])), (S = Math.max(S, _[3])));
  let w = (_) => {
      let R = v(_);
      return (
        b(_) / x < 0.45 ||
        Math.hypot(R[0] - y[0], R[1] - y[1], R[2] - y[2]) > n.tol * 2.2
      );
    },
    z = r
      .filter((_) => _[4] > 0.45 && _[3] > M + (S - M) * 0.55 && !s && w(_))
      .map((_) => _[3])
      .sort((_, R) => _ - R);
  if (s)
    for (let _ of t) {
      if (!e(_.m)) continue;
      let R = _.g.attributes.position,
        T = _.g.attributes.normal;
      for (let E = 0; E < R.count; E += Math.max(1, Math.floor(R.count / 3e3)))
        T && Math.abs(T.getX(E)) > 0.45 && z.push(R.getY(E));
    }
  return (
    z.sort((_, R) => _ - R),
    z.length >= 4 && (n.belt = z[Math.floor(z.length * 0.1)]),
    n
  );
}
function p5t(i, t, e) {
  if (!i) return;
  let s = (a) => a.toFixed(4),
    n = (a) => `vec3f(${a.map(s).join(", ")})`,
    o = 0.2126 * e.col[0] + 0.7152 * e.col[1] + 0.0722 * e.col[2];
  return (
    a_({ g: 1, b: 1, ...i }) +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fwP = length(fwidth((F.nf * vec4f(wp, 1.0)).xyz * ${(i.flakeScale || 1400).toFixed(1)}));
  let t = textureSample(matMap, matSamp, uv); let tc = t.rgb * bc.rgb; let lum = dot(tc, vec3f(0.2126, 0.7152, 0.0722));
  let r = lum / ${s(o)};
  let chd = length(tc / max(lum, 1e-3) - ${n(e.col.map((a) => a / o))});
  // (one texture for all: the glass and the trim - far darker than the paint - and the lamps - another colour, red to amber, or
  // far brighter - keep the model's look; a stripe of another colour in the paint is paint, the wrap covers it)
  let sat = (max(tc.r, max(tc.g, tc.b)) - min(tc.r, min(tc.g, tc.b))) / max(max(tc.r, max(tc.g, tc.b)), 1e-3);
  let dk = max(1.0 - smoothstep(0.1, 0.2, r), (1.0 - smoothstep(${e.sep ? "0.22, 0.4" : "0.38, 0.55"}, r)) * (1.0 - smoothstep(0.3, 0.5, sat)));   // (dark and colourless: glass, tyres, trim - a dark blue stripe is paint)
  let pm = (1.0 - dk)${e.sep ? "" : ` * (1.0 - smoothstep(1.9, 2.8, r)) * (1.0 - smoothstep(${s(e.tol)}, ${s(e.tol * 2.2)}, chd) * smoothstep(1.4, 2.2, tc.r / max(tc.b, 1e-3)))`};
  if (pm < 0.002) { return vec4f(t.rgb * bc.rgb, t.a); }
  let sh = mix(1.0, clamp(r, 0.55, 1.1), ${i.wrap ? "0.25" : "0.45"});
  let pc = carPaintW(wp, vec4f(bc.rgb * sh, 1.0), fwP);
  gHK = vec4f(mix(${s(e.rough)}, gHK.x, pm), mix(${s(e.metal)}, gHK.y, pm), gHK.z, 1.0); gHN = vec4f(gHN.xyz * pm, gHN.w); gHF0 = mix(1.0, gHF0, pm);
  return vec4f(mix(t.rgb * bc.rgb, pc.rgb, pm), t.a);
}
`
  );
}
function m5t(i, t) {
  let e = [];
  for (let s = 0; s < 4; s++) {
    let n = i.wheels[s].spin.children.filter(
      (c) => c.isMesh && c.name === "Tyre",
    );
    if (!n.length) return null;
    let o = 0,
      a = 1e9,
      r = new Ti();
    for (let c of n) {
      let h = c.geometry.attributes.position;
      (c.geometry.computeBoundingBox(), r.union(c.geometry.boundingBox));
      for (
        let f = 0;
        f < h.count;
        f += Math.max(1, Math.floor(h.count / 4e3))
      ) {
        let u = Math.hypot(h.getY(f), h.getZ(f));
        (u > o && (o = u), u < a && (a = u));
      }
    }
    let l = r.getCenter(new xt());
    if (
      Math.abs(o - t.wheelR[s]) > t.wheelR[s] * 0.1 ||
      Math.hypot(l.y, l.z) > 0.02
    )
      return null;
    e.push({ R: o, r: a, w: r.max.x - r.min.x });
  }
  return e;
}
as();
ml();
var nr = (i) =>
    String(i).replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    ),
  oh = (i) => "$" + Math.round(i).toLocaleString("en-US"),
  WQ = {
    wheels: "Wheels",
    tyres: "Tyres",
    engine: "Engine",
    perf: "Performance",
  },
  g5t = {
    engine: ["engine", "turbo", "exhaust", "nitro"],
    perf: ["trans", "weight", "brakes", "susp", "diff", "aero"],
  },
  qQ = 7,
  jQ = {
    engine: "M4 9h3l2-2h6v3h3v-2h2v8h-2v-2h-3v3h-8l-3-3z",
    turbo: "M12 4a8 8 0 1 0 8 8M12 8a4 4 0 1 0 4 4M20 12h-4M12 4v4",
    exhaust: "M2 10h11l3-2h5v8h-5l-3-2H2z",
    nitro: "M9 3h6v3l2 2v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8l2-2zM9 11h6M9 15h6",
    gearbox: "M5 5v14M12 5v14M19 5v7H5M8 3h-6M15 3h-6M22 3h-6",
    weight: "M7 8h10l3 12H4zM10 8a2 2 0 1 1 4 0",
    brake:
      "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M16 4l4 4",
    spring: "M8 3h8M8 21h8M8 6l8 2-8 2 8 2-8 2 8 2-8 2",
    diff: "M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0-14M2 12h5M17 12h5M12 9v6",
    wing: "M3 9h18l-2 3H5zM7 12v6M17 12v6",
    tyre: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10",
  },
  VQ = (i) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${i}"/></svg>`;
function b5t(i) {
  let [, t, e] = Mr[i],
    s =
      '<circle cx="20" cy="20" r="18" class="t"/><circle cx="20" cy="20" r="13.5" class="l"/>';
  if (e === "factory") s += '<text x="20" y="24" text-anchor="middle">F</text>';
  else if (e === "disc")
    s +=
      '<circle cx="20" cy="20" r="12" class="f"/>' +
      [...Array(6)]
        .map((n, o) => {
          let a = (o / 6) * Math.PI * 2;
          return `<circle cx="${20 + 8 * Math.cos(a)}" cy="${20 + 8 * Math.sin(a)}" r="1.6" class="h"/>`;
        })
        .join("");
  else {
    let n =
      { split: 1.2, mesh: 0.8, fan: 2.4, dish: 2, blade: 3, mono: 4 }[e] || 2;
    for (let o = 0; o < t; o++) {
      let a = (o / t) * Math.PI * 2,
        r = e === "fan" || e === "blade" ? 0.35 : 0,
        l = (c, h) =>
          `<line x1="${20 + 3.5 * Math.cos(a + c)}" y1="${20 + 3.5 * Math.sin(a + c)}" x2="${20 + 13 * Math.cos(a + c + r)}" y2="${20 + 13 * Math.sin(a + c + r)}" stroke-width="${h}"/>`;
      s +=
        e === "split"
          ? l(-0.12, n) + l(0.12, n)
          : e === "mesh"
            ? l(0, n) +
              `<line x1="${20 + 3.5 * Math.cos(a)}" y1="${20 + 3.5 * Math.sin(a)}" x2="${20 + 13 * Math.cos(a + Math.PI / t)}" y2="${20 + 13 * Math.sin(a + Math.PI / t)}" stroke-width="${n}"/>`
            : l(0, n);
    }
    e === "dish" && (s += '<circle cx="20" cy="20" r="13.5" class="l2"/>');
  }
  return `<svg viewBox="0 0 40 40" class="tu-rim" aria-hidden="true">${s}<circle cx="20" cy="20" r="3.2" class="h"/></svg>`;
}
