// app 268 — attributes
// Lines 134526-134841 of readable/app.pretty.js (statement-aligned).
async function UZ(o, t, e = 150) {
  let s = o && gF.get(o);
  if (!s) return 0;
  gF.delete(o);
  let n = BZ(s.loader, s.base),
    i = 0;
  for (let a of s.names) {
    try {
      let r = o[a];
      if (!r) continue;
      let l = await n(a + ".glb"),
        c = CZ[a];
      c && (AZ(l.geometry, c), l.geometry.computeBoundingSphere());
      let h = OZ(a, FZ(l.geometry));
      if (
        (a === "bus" && (h = dM(h, VZ(h))),
        !r.mat.userData.mbExtraMap &&
          (l.material.metalnessMap || l.material.roughnessMap) &&
          (r.mat.userData.mbExtraMap =
            l.material.metalnessMap || l.material.roughnessMap),
        ro[a]
          ? (d2[a] = { ...(d2[a] || {}), geo: mF(h, ro[a]) }).geo.bad &&
            (console.warn("car wheels: stray tags, wheels kept still", a),
            uM(h))
          : !Ux[a] && h.attributes.position.array && uM(h),
        (r.base = h),
        bF(a, r, h),
        t?.(a, r),
        i++,
        a === "suv" && o.police)
      ) {
        let f = o.police,
          [u] = HZ({ geo: h, geo1: r.geo1 });
        (ro.police &&
          (d2.police = { ...(d2.police || {}), geo: mF(u, ro.police) }).geo
            .bad &&
          uM(u),
          (f.base = u),
          bF("police", f, u),
          t?.("police", f));
      }
    } catch (r) {
      console.warn("cars: no full mesh", a, r?.message || r);
    }
    await new Promise((r) => setTimeout(r, e));
  }
  return i;
}
var U3t = ["sedan", "suv", "hatch", "taxi", "pickup", "van"];
function GZ(o, t = "assets/cars/", e = 700) {
  if (!o) return Promise.resolve(0);
  let s = 0;
  return U3t.reduce(
    (n, i) =>
      n.then(async () => {
        let a = o[i]?.mat?.map;
        if (a) {
          try {
            let r = await ap(t + i + "_2k.webp", "low");
            ((a.image = r), (a.needsUpdate = !0), s++);
          } catch {
            console.warn("cars: no 2k albedo", i);
          }
          await new Promise((r) => setTimeout(r, e));
        }
      }),
    Promise.resolve(),
  ).then(() => s);
}
var Xx = (o, t, e = null) => {
  o = o.index ? o.toNonIndexed() : o;
  for (let i of Object.keys(o.attributes))
    ["position", "normal", "uv"].includes(i) || o.deleteAttribute(i);
  let s = o.attributes.position.count,
    n = new Float32Array(s * 4);
  for (let i = 0; i < s; i++)
    ((n[i * 4] = n[i * 4 + 1] = n[i * 4 + 2] = 1),
      (n[i * 4 + 3] = e ?? (t < 0.2 ? 3.5 : 2.5)));
  (o.setAttribute("color", new Te(n, 4)),
    o.attributes.uv ||
      o.setAttribute("uv", new Te(new Float32Array(s * 2), 2)));
  for (let i = 0; i < s; i++) xF(o.attributes.position, i, 0);
  return o;
};
function gM(o) {
  let t = new Le();
  for (let [e, s] of Object.entries(o.attributes)) {
    let n = s.count,
      i = s.itemSize,
      a = new Float32Array(n * i);
    for (let r = 0; r < n; r++)
      for (let l = 0; l < i; l++)
        a[r * i + l] = s.getComponent
          ? s.getComponent(r, l)
          : [s.getX, s.getY, s.getZ, s.getW][l].call(s, r);
    t.setAttribute(e, new Te(a, i));
  }
  return (o.index && t.setIndex(new Te(Uint32Array.from(o.index.array), 1)), t);
}
function dM(o, t) {
  let e = (i) => {
      let a = i.attributes.position.array,
        r = new Uint32Array(a.buffer, a.byteOffset, a.length);
      for (let l = 0; l < r.length; l += 3) r[l] &= -8;
      return i;
    },
    s = t.map((i) => {
      let a = e(gM(i));
      return (
        o.index && a.setIndex([...Array(a.attributes.position.count).keys()]),
        a
      );
    }),
    n = wi([gM(o), ...s]);
  return n
    ? (n.computeBoundingSphere(), n)
    : (console.warn("car decals: attributes differ"), o);
}
function VZ(o) {
  let t = o.attributes.position,
    e = [
      [
        [0, 0],
        [0, 0.8],
        [0.15, 1],
        [0.35, 1],
        [0.5, 0.8],
        [0.5, 0],
        [0.5, 0.8],
        [0.65, 1],
        [0.85, 1],
        [1, 0.8],
        [1, 0],
      ],
      [
        [1.25, 1],
        [1.25, 0.2],
        [1.4, 0],
        [1.6, 0],
        [1.75, 0.2],
        [1.75, 1],
      ],
      [
        [1.75, 0.2],
        [1.75, 0],
      ],
      [
        [2, 0],
        [2, 0.8],
        [2.15, 1],
        [2.35, 1],
        [2.5, 0.8],
        [2.5, 0],
      ],
      [
        [2.75, 0],
        [2.75, 1],
      ],
      [
        [2.75, 1.22],
        [2.75, 1.36],
      ],
    ],
    s = 0.5,
    n = 0.085,
    i = 0.72,
    a = -2.2,
    r = [];
  for (let l of [1, -1]) {
    let h =
        ((m, g) => {
          let b = 0;
          for (let v = 0; v < t.count; v++) {
            let x = t.getX(v) * l;
            x > b &&
              Math.abs(t.getY(v) - m) < 0.2 &&
              Math.abs(t.getZ(v) - g) < 0.2 &&
              (b = x);
          }
          return b;
        })(i + 0.25, a) + 0.012,
      f = (m) => a - l * (m - 1.38) * s,
      u = [],
      d = [];
    for (let m of e)
      for (let g = 0; g + 1 < m.length; g++) {
        let [b, v] = m[g],
          [x, y] = m[g + 1],
          M = f(b),
          S = f(x),
          w = i + v * s,
          _ = i + y * s,
          z = S - M,
          A = _ - w,
          T = Math.hypot(z, A) || 1,
          E = ((-A / T) * n) / 2,
          R = ((z / T) * n) / 2,
          P = ((z / T) * n) / 2,
          C = ((A / T) * n) / 2,
          I = [
            [M - E - P, w - R - C],
            [S - E + P, _ - R + C],
            [S + E + P, _ + R + C],
            [M + E - P, w + R - C],
          ],
          L = l > 0 ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3],
          F = (U) => [h * l, I[U][1], I[U][0]],
          O = F(0),
          B = F(1),
          H = F(2),
          D =
            ((B[1] - O[1]) * (H[2] - O[2]) - (B[2] - O[2]) * (H[1] - O[1])) *
              l >
            0
              ? [0, 1, 2, 0, 2, 3]
              : [0, 2, 1, 0, 3, 2];
        for (let U of D) (u.push(...F(U)), d.push(l, 0, 0));
      }
    let p = new Le();
    (p.setAttribute("position", new Te(new Float32Array(u), 3)),
      p.setAttribute("normal", new Te(new Float32Array(d), 3)),
      r.push(Xx(p, 0.3)));
  }
  return r;
}
var dF = (o, t, e) => {
  let s = Math.min(1, Math.max(0, (e - o) / (t - o)));
  return s * s * (3 - 2 * s);
};
function pF(o, t, e, s) {
  (e < -1.3 && (e = -1.3 + (e - -1.3) * (1 + 0.27 * dF(1.36, 1.56, t))),
    (t += 0.1 * dF(1, 2.25, e) * dF(0.8, 1.05, t)));
  let i = 0.95;
  return (
    (e = Math.abs(e) < i ? (e * (i + mM)) / i : e + Math.sign(e) * mM),
    (s[0] = o),
    (s[1] = t),
    (s[2] = e),
    s
  );
}
var Kx = 0.05,
  pM = [-1.1, 1.08],
  SZ = 1.2 + Kx;
function G3t(o) {
  let t = gM(o.index ? o.toNonIndexed() : o),
    e = t.attributes.position.array,
    s = t.attributes.normal?.array,
    n = new Uint32Array(e.buffer, e.byteOffset, e.length),
    i = [0, 0, 0],
    a = [0, 0, 0],
    r = [0, 0, 0],
    l = 0.001,
    c = [[], [], []];
  for (let m = 0; m < e.length; m += 3) {
    let g = e[m],
      b = e[m + 1],
      v = e[m + 2];
    if (n[m] & 7) {
      e[m + 2] = v + Math.sign(v) * mM;
      continue;
    }
    if (s) {
      for (let T = 0; T < 3; T++) {
        let E = [0, 0, 0];
        ((E[T] = l),
          pF(g + E[0], b + E[1], v + E[2], a),
          pF(g - E[0], b - E[1], v - E[2], r));
        for (let R = 0; R < 3; R++) c[R][T] = (a[R] - r[R]) / (2 * l);
      }
      let x = s[m],
        y = s[m + 1],
        M = s[m + 2],
        S = [
          c[1][1] * c[2][2] - c[1][2] * c[2][1],
          c[1][2] * c[2][0] - c[1][0] * c[2][2],
          c[1][0] * c[2][1] - c[1][1] * c[2][0],
          c[0][2] * c[2][1] - c[0][1] * c[2][2],
          c[0][0] * c[2][2] - c[0][2] * c[2][0],
          c[0][1] * c[2][0] - c[0][0] * c[2][1],
          c[0][1] * c[1][2] - c[0][2] * c[1][1],
          c[0][2] * c[1][0] - c[0][0] * c[1][2],
          c[0][0] * c[1][1] - c[0][1] * c[1][0],
        ],
        w = S[0] * x + S[3] * y + S[6] * M,
        _ = S[1] * x + S[4] * y + S[7] * M,
        z = S[2] * x + S[5] * y + S[8] * M,
        A = Math.hypot(w, _, z) || 1;
      ((s[m] = w / A), (s[m + 1] = _ / A), (s[m + 2] = z / A));
    }
    (pF(g, b, v, i), (e[m + 1] = i[1] + Kx), (e[m + 2] = i[2]));
  }
  let h = V3t(t, [
      [2, pM[0]],
      [2, pM[1]],
      [1, SZ],
    ]),
    f = h.attributes.position.array,
    u = h.attributes.color.array,
    [d, p] = pM;
  for (let m = 0; m < f.length; m += 9) {
    let g = (f[m] + f[m + 3] + f[m + 6]) / 3,
      b = (f[m + 1] + f[m + 4] + f[m + 7]) / 3,
      v = (f[m + 2] + f[m + 5] + f[m + 8]) / 3,
      x = new Uint32Array(f.buffer, f.byteOffset + m * 4, 1)[0] & 7,
      y = 0;
    if (
      (v > d && v < p && b > 0.25 && b < SZ && Math.abs(g) > 0.7
        ? (y = 7.5)
        : !x && v > 2.05 && b < 1.12 + Kx && (y = 8.5),
      y)
    )
      for (let M = 0; M < 3; M++) u[(m / 3 + M) * 4 + 3] = y;
  }
  return (h.computeBoundingSphere(), h);
}
