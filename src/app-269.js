// app 269 — attributes
// Lines 134255-134572 of readable/app.pretty.js (statement-aligned).
async function OY(i, t, e = 150) {
  let s = i && DL.get(i);
  if (!s) return 0;
  DL.delete(i);
  let n = IY(s.loader, s.base),
    o = 0;
  for (let a of s.names) {
    try {
      let r = i[a];
      if (!r) continue;
      let l = await n(a + ".glb"),
        c = AY[a];
      c && (EY(l.geometry, c), l.geometry.computeBoundingSphere());
      let h = LY(a, CY(l.geometry));
      if (
        (a === "bus" && (h = bw(h, DY(h))),
        !r.mat.userData.mbExtraMap &&
          (l.material.metalnessMap || l.material.roughnessMap) &&
          (r.mat.userData.mbExtraMap =
            l.material.metalnessMap || l.material.roughnessMap),
        ho[a]
          ? (_m[a] = { ...(_m[a] || {}), geo: HL(h, ho[a]) }).geo.bad &&
            (console.warn("car wheels: stray tags, wheels kept still", a),
            gw(h))
          : !ex[a] && h.attributes.position.array && gw(h),
        (r.base = h),
        UL(a, r, h),
        t?.(a, r),
        o++,
        a === "suv" && i.police)
      ) {
        let f = i.police,
          [u] = NY({ geo: h, geo1: r.geo1 });
        (ho.police &&
          (_m.police = { ...(_m.police || {}), geo: HL(u, ho.police) }).geo
            .bad &&
          gw(u),
          (f.base = u),
          UL("police", f, u),
          t?.("police", f));
      }
    } catch (r) {
      console.warn("cars: no full mesh", a, r?.message || r);
    }
    await new Promise((r) => setTimeout(r, e));
  }
  return o;
}
var bbt = ["sedan", "suv", "hatch", "taxi", "pickup", "van"];
function HY(i, t = "assets/cars/", e = 700) {
  if (!i) return Promise.resolve(0);
  let s = 0;
  return bbt
    .reduce(
      (n, o) =>
        n.then(async () => {
          let a = i[o]?.mat?.map;
          if (a) {
            try {
              let r = await Ed(t + o + "_2k.webp", "low");
              ((a.image = r), (a.needsUpdate = !0), s++);
            } catch {
              console.warn("cars: no 2k albedo", o);
            }
            await new Promise((r) => setTimeout(r, e));
          }
        }),
      Promise.resolve(),
    )
    .then(() => s);
}
var cx = (i, t, e = null) => {
  i = i.index ? i.toNonIndexed() : i;
  for (let o of Object.keys(i.attributes))
    ["position", "normal", "uv"].includes(o) || i.deleteAttribute(o);
  let s = i.attributes.position.count,
    n = new Float32Array(s * 4);
  for (let o = 0; o < s; o++)
    ((n[o * 4] = n[o * 4 + 1] = n[o * 4 + 2] = 1),
      (n[o * 4 + 3] = e ?? (t < 0.2 ? 3.5 : 2.5)));
  (i.setAttribute("color", new Te(n, 4)),
    i.attributes.uv ||
      i.setAttribute("uv", new Te(new Float32Array(s * 2), 2)));
  for (let o = 0; o < s; o++) GL(i.attributes.position, o, 0);
  return i;
};
function yw(i) {
  let t = new De();
  for (let [e, s] of Object.entries(i.attributes)) {
    let n = s.count,
      o = s.itemSize,
      a = new Float32Array(n * o);
    for (let r = 0; r < n; r++)
      for (let l = 0; l < o; l++)
        a[r * o + l] = s.getComponent
          ? s.getComponent(r, l)
          : [s.getX, s.getY, s.getZ, s.getW][l].call(s, r);
    t.setAttribute(e, new Te(a, o));
  }
  return (i.index && t.setIndex(new Te(Uint32Array.from(i.index.array), 1)), t);
}
function bw(i, t) {
  let e = (o) => {
      let a = o.attributes.position.array,
        r = new Uint32Array(a.buffer, a.byteOffset, a.length);
      for (let l = 0; l < r.length; l += 3) r[l] &= -8;
      return o;
    },
    s = t.map((o) => {
      let a = e(yw(o));
      return (
        i.index && a.setIndex([...Array(a.attributes.position.count).keys()]),
        a
      );
    }),
    n = wi([yw(i), ...s]);
  return n
    ? (n.computeBoundingSphere(), n)
    : (console.warn("car decals: attributes differ"), i);
}
function DY(i) {
  let t = i.attributes.position,
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
    o = 0.72,
    a = -2.2,
    r = [];
  for (let l of [1, -1]) {
    let h =
        ((m, g) => {
          let b = 0;
          for (let x = 0; x < t.count; x++) {
            let v = t.getX(x) * l;
            v > b &&
              Math.abs(t.getY(x) - m) < 0.2 &&
              Math.abs(t.getZ(x) - g) < 0.2 &&
              (b = v);
          }
          return b;
        })(o + 0.25, a) + 0.012,
      f = (m) => a - l * (m - 1.38) * s,
      u = [],
      d = [];
    for (let m of e)
      for (let g = 0; g + 1 < m.length; g++) {
        let [b, x] = m[g],
          [v, y] = m[g + 1],
          M = f(b),
          S = f(v),
          w = o + x * s,
          z = o + y * s,
          _ = S - M,
          R = z - w,
          T = Math.hypot(_, R) || 1,
          E = ((-R / T) * n) / 2,
          A = ((_ / T) * n) / 2,
          C = ((_ / T) * n) / 2,
          P = ((R / T) * n) / 2,
          I = [
            [M - E - C, w - A - P],
            [S - E + C, z - A + P],
            [S + E + C, z + A + P],
            [M + E - C, w + A - P],
          ],
          L = l > 0 ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3],
          F = (U) => [h * l, I[U][1], I[U][0]],
          N = F(0),
          B = F(1),
          H = F(2),
          D =
            ((B[1] - N[1]) * (H[2] - N[2]) - (B[2] - N[2]) * (H[1] - N[1])) *
              l >
            0
              ? [0, 1, 2, 0, 2, 3]
              : [0, 2, 1, 0, 3, 2];
        for (let U of D) (u.push(...F(U)), d.push(l, 0, 0));
      }
    let p = new De();
    (p.setAttribute("position", new Te(new Float32Array(u), 3)),
      p.setAttribute("normal", new Te(new Float32Array(d), 3)),
      r.push(cx(p, 0.3)));
  }
  return r;
}
var BL = (i, t, e) => {
  let s = Math.min(1, Math.max(0, (e - i) / (t - i)));
  return s * s * (3 - 2 * s);
};
function OL(i, t, e, s) {
  (e < -1.3 && (e = -1.3 + (e - -1.3) * (1 + 0.27 * BL(1.36, 1.56, t))),
    (t += 0.1 * BL(1, 2.25, e) * BL(0.8, 1.05, t)));
  let o = 0.95;
  return (
    (e = Math.abs(e) < o ? (e * (o + vw)) / o : e + Math.sign(e) * vw),
    (s[0] = i),
    (s[1] = t),
    (s[2] = e),
    s
  );
}
var hx = 0.05,
  xw = [-1.1, 1.08],
  yY = 1.2 + hx;
function xbt(i) {
  let t = yw(i.index ? i.toNonIndexed() : i),
    e = t.attributes.position.array,
    s = t.attributes.normal?.array,
    n = new Uint32Array(e.buffer, e.byteOffset, e.length),
    o = [0, 0, 0],
    a = [0, 0, 0],
    r = [0, 0, 0],
    l = 0.001,
    c = [[], [], []];
  for (let m = 0; m < e.length; m += 3) {
    let g = e[m],
      b = e[m + 1],
      x = e[m + 2];
    if (n[m] & 7) {
      e[m + 2] = x + Math.sign(x) * vw;
      continue;
    }
    if (s) {
      for (let T = 0; T < 3; T++) {
        let E = [0, 0, 0];
        ((E[T] = l),
          OL(g + E[0], b + E[1], x + E[2], a),
          OL(g - E[0], b - E[1], x - E[2], r));
        for (let A = 0; A < 3; A++) c[A][T] = (a[A] - r[A]) / (2 * l);
      }
      let v = s[m],
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
        w = S[0] * v + S[3] * y + S[6] * M,
        z = S[1] * v + S[4] * y + S[7] * M,
        _ = S[2] * v + S[5] * y + S[8] * M,
        R = Math.hypot(w, z, _) || 1;
      ((s[m] = w / R), (s[m + 1] = z / R), (s[m + 2] = _ / R));
    }
    (OL(g, b, x, o), (e[m + 1] = o[1] + hx), (e[m + 2] = o[2]));
  }
  let h = vbt(t, [
      [2, xw[0]],
      [2, xw[1]],
      [1, yY],
    ]),
    f = h.attributes.position.array,
    u = h.attributes.color.array,
    [d, p] = xw;
  for (let m = 0; m < f.length; m += 9) {
    let g = (f[m] + f[m + 3] + f[m + 6]) / 3,
      b = (f[m + 1] + f[m + 4] + f[m + 7]) / 3,
      x = (f[m + 2] + f[m + 5] + f[m + 8]) / 3,
      v = new Uint32Array(f.buffer, f.byteOffset + m * 4, 1)[0] & 7,
      y = 0;
    if (
      (x > d && x < p && b > 0.25 && b < yY && Math.abs(g) > 0.7
        ? (y = 7.5)
        : !v && x > 2.05 && b < 1.12 + hx && (y = 8.5),
      y)
    )
      for (let M = 0; M < 3; M++) u[(m / 3 + M) * 4 + 3] = y;
  }
  return (h.computeBoundingSphere(), h);
}
