// app 181 — math
// Lines 104980-105316 of readable/app.pretty.js (statement-aligned).
var LX = [
    [1.14, 0.84, 1.12],
    [0.82, 1.08, 1.12],
    [1.14, 1.06, 0.78],
    [1.12, 0.9, 0.84],
    [0.9, 1.1, 0.9],
    [1.1, 0.82, 0.86],
    [0.84, 0.92, 1.16],
  ],
  Z2t = {
    haight: 0.75,
    castro: 0.7,
    mission: 0.65,
    dolores: 0.55,
    noe: 0.55,
    western: 0.7,
    hayes: 0.7,
    pacific: 0.6,
    cowhollow: 0.55,
    marina: 0.45,
    russian: 0.55,
    twinpeaks: 0.55,
    richmond: 0.5,
    northbeach: 0.25,
    telegraph: 0.25,
    seacliff: 0.85,
    sausalito: 0.55,
  },
  IX = [
    [1.12, 0.9, 0.82],
    [1.06, 1.02, 0.86],
    [1.05, 1.04, 1],
    [1.1, 0.97, 0.86],
    [1.14, 0.86, 0.8],
    [1.02, 0.98, 0.9],
  ],
  FX = [
    [0.74, 0.9, 1.18],
    [0.7, 0.8, 1],
    [0.84, 1.04, 0.88],
    [0.64, 0.84, 1.14],
    [0.88, 0.94, 1.1],
    [0.68, 0.94, 1],
    [0.78, 0.8, 0.92],
    [0.86, 0.82, 1.06],
  ],
  tL = new Set([
    "western",
    "hayes",
    "pacific",
    "cowhollow",
    "marina",
    "russian",
    "twinpeaks",
    "haight",
    "castro",
    "mission",
    "dolores",
    "noe",
    "richmond",
  ]);
function tK(o, t) {
  let e = o._lk ? o._lk.st : o.st;
  if (e !== 0 && e !== 1 && e !== 2 && e !== 3) return null;
  let s = o.cx ?? Ef(o.rings[0])[0],
    n = o.cz ?? Ef(o.rings[0])[1],
    i = Di(s, n),
    a = Z2t[i];
  return !a || e === 2 || Bn(t, 24) >= a
    ? tL.has(i)
      ? [0.94, 0.98, 1.07].map(
          (r, l) => r * (1 + [0.08, 0.06, 0.08][l] * (Bn(t, 21 + l) - 0.5)),
        )
      : null
    : i === "seacliff"
      ? IX[Math.floor(Bn(t, 28) * IX.length)]
      : i !== "haight" && i !== "castro" && i !== "mission" && Bn(t, 26) < 0.7
        ? FX[Math.floor(Bn(t, 27) * FX.length)]
        : LX[Math.floor(Bn(t, 25) * LX.length)];
}
var Q2t = {
    vic: 3,
    edw: 3,
    mar: 3,
    mix: 3,
    nb: 3,
    chn: 3,
    apt: 3,
    pal: 4,
    bank: 4,
    brk: 3,
    jsq: 3,
    wrf: 4,
  },
  tgt = {
    vic: [1, 1, 1, 2],
    edw: [1, 1, 1, 2],
    mar: [1, 1, 2],
    mix: [1, 1, 2],
    nb: [1, 1, 2],
    chn: [1, 1, 2],
    apt: [1, 2, 2, 3],
    pal: [2, 2, 3],
    bank: [2, 3],
    brk: [1, 2, 2, 3],
    jsq: [1, 1, 2],
    wrf: [2, 3],
  },
  OX = [
    [1.08, 0.94, 0.88],
    [0.82, 0.94, 1.12],
    [1.04, 1.02, 0.86],
    [0.88, 1.04, 0.92],
    [1.06, 0.88, 0.96],
    [0.9, 0.92, 1.06],
    [0.74, 0.84, 1],
  ];
function egt(o, t, e, s, n, i, a, r) {
  let l = o.cell,
    c = l.style,
    h = (g, b, v) => (v ? (x) => 2 * g + b - 1e-4 - x : (x) => x),
    f = [
      { u0: s, n: e, cell: l, mirror: o.mirror, fcol: a, U: h(s, e, o.mirror) },
    ];
  if (
    e < (Q2t[c] ?? 1e9) ||
    Ku[i.seed] ||
    sL[i.seed] !== void 0 ||
    mz.has(i.seed)
  )
    return f;
  let u = t.fronts[o.group].cells.filter(
    (g) => g.style === c && Math.abs(g.w - l.w) <= l.w * 0.35,
  );
  if (u.length < 2) return f;
  let d = a[3] - (l.cell + 0.5) / 64,
    p = tgt[c],
    m = [];
  for (let g = 0, b = 0; g < e; b++) {
    let v = Math.min(e - g, p[Math.floor(Bn(n, 300 + b) * p.length)]);
    e - g - v === 1 && v > 1 && p[0] > 1 && v++;
    let x, y, M;
    if (b === 0) ((x = l), (y = o.mirror), (M = a));
    else {
      let S = m[b - 1],
        w = n * 31 + b * 977,
        _ = 0.92 + 0.16 * Bn(w, 4);
      if (Bn(w, 320) < 0.22) {
        ((x = S.cell), (y = 1 - S.mirror));
        let z = OX[Math.floor(Bn(w, 321) * OX.length)];
        M = [_ * z[0], _ * z[1], _ * z[2], (x.cell + 0.5) / 64 + d];
      } else {
        let z = 0;
        do x = u[Math.floor(Bn(w, 340 + z) * u.length)];
        while ((x === S.cell || (b > 1 && x === m[b - 2].cell)) && ++z < 10);
        y = Bn(w, 360) < 0.5 ? 1 : 0;
        let A = tK(i, w) || [
          1 + 0.09 * (Bn(w, 21) - 0.5),
          1 + 0.07 * (Bn(w, 22) - 0.5),
          1 + 0.09 * (Bn(w, 23) - 0.5),
        ];
        M = [_ * A[0], _ * A[1], _ * A[2], (x.cell + 0.5) / 64 + d];
      }
    }
    (m.push({
      u0: s + g,
      n: v,
      cell: x,
      mirror: y,
      fcol: M,
      U: h(s + g, v, y),
    }),
      (g += v));
  }
  return m;
}
var BX = new WeakMap();
function sgt(o) {
  let t = BX.get(o);
  if (t && t.skipN === (o.claims?.list?.length ?? -1) && t.n === o.bld.n)
    return t;
  let e = o.bld,
    s = o.claims?.bSkip,
    n = new Map(),
    i = 32,
    a = new Float32Array(e.n * 4);
  for (let r = 0; r < e.n; r++) {
    if (s?.[r]) continue;
    let l = e.rStart[e.bRing[r]],
      c = e.rStart[e.bRing[r] + 1],
      h = 1e9,
      f = 1e9,
      u = -1e9,
      d = -1e9;
    for (let p = l; p < c; p++) {
      let m = e.pts[p * 2],
        g = e.pts[p * 2 + 1];
      (m < h && (h = m), m > u && (u = m), g < f && (f = g), g > d && (d = g));
    }
    a.set([h, f, u, d], r * 4);
    for (let p = Math.floor(h / i); p <= Math.floor(u / i); p++)
      for (let m = Math.floor(f / i); m <= Math.floor(d / i); m++) {
        let g = (p + 4096) * 8192 + m + 4096,
          b = n.get(g);
        (b || n.set(g, (b = [])), b.push(r));
      }
  }
  return (
    (t = {
      cells: n,
      box: a,
      CS: i,
      skipN: o.claims?.list?.length ?? -1,
      n: e.n,
    }),
    BX.set(o, t),
    t
  );
}
var NX = new WeakMap();
function gz(o) {
  let t = o.bld,
    e = NX.get(o);
  if (e && e.n === t.n) return e;
  let s = t.n,
    n = e ? e.n : 0,
    i = 32,
    a = (p, m, g = 1) => {
      let b = new m(s * g);
      return (p && b.set(p), b);
    },
    r = a(e?.hide, Uint8Array),
    l = a(e?.cut, Float32Array),
    c = a(e?.tcut, Float32Array),
    h = a(e?.box, Float32Array, 4),
    f = a(e?.area, Float32Array),
    u = e ? e.cells : new Map(),
    d = (p) =>
      t.pts.subarray(t.rStart[t.bRing[p]] * 2, t.rStart[t.bRing[p] + 1] * 2);
  for (let p = n; p < s; p++) {
    let m = d(p),
      g = 1e9,
      b = 1e9,
      v = -1e9,
      x = -1e9;
    for (let y = 0; y < m.length; y += 2)
      ((g = Math.min(g, m[y])),
        (v = Math.max(v, m[y])),
        (b = Math.min(b, m[y + 1])),
        (x = Math.max(x, m[y + 1])));
    if (
      ((h[p * 4] = g),
      (h[p * 4 + 1] = b),
      (h[p * 4 + 2] = v),
      (h[p * 4 + 3] = x),
      (f[p] = Math.abs(j5(m))),
      v > g)
    )
      for (let y = Math.floor(g / i); y <= Math.floor(v / i); y++)
        for (let M = Math.floor(b / i); M <= Math.floor(x / i); M++) {
          let S = (y + 4096) * 8192 + M + 4096,
            w = u.get(S);
          (w || u.set(S, (w = [])), w.push(p));
        }
  }
  for (let p = n; p < s; p++) {
    let m = p * 4,
      g = h[m + 2] - h[m],
      b = h[m + 3] - h[m + 1];
    if (!(g > 0 && b > 0) || f[p] < 1) continue;
    let v = null,
      x = null;
    for (let y of u.get(
      (Math.floor((h[m] + h[m + 2]) / 2 / i) + 4096) * 8192 +
        Math.floor((h[m + 1] + h[m + 3]) / 2 / i) +
        4096,
    ) || []) {
      if (y === p || f[y] < f[p] || (f[y] === f[p] && y > p)) continue;
      let M = y * 4,
        S = Math.min(h[m + 2], h[M + 2]) - Math.max(h[m], h[M]),
        w = Math.min(h[m + 3], h[M + 3]) - Math.max(h[m + 1], h[M + 1]);
      if (S <= 0 || w <= 0 || S * w < 0.85 * g * b) continue;
      let _ = t.bF[p * 3 + 1],
        z = t.bF[y * 3 + 1],
        A = t.bF[p * 3 + 2] > 0 ? t.bF[p * 3 + 2] : -1e9,
        T = t.bF[y * 3 + 2] > 0 ? t.bF[y * 3 + 2] : -1e9;
      if (A >= z - 0.1 || T >= _ - 0.1) continue;
      if (!x) {
        ((v = d(p)), (x = []));
        let C = Math.max(6, Math.min(24, Math.ceil(Math.sqrt(f[p]))));
        for (let I = 0; I < C; I++)
          for (let L = 0; L < C; L++) {
            let F = h[m] + (g * (I + 0.5)) / C,
              O = h[m + 1] + (b * (L + 0.5)) / C;
            rn(v, F, O) && x.push(F, O);
          }
      }
      if (x.length < 6) continue;
      let E = d(y),
        R = 0;
      for (let C = 0; C < x.length; C += 2) rn(E, x[C], x[C + 1]) && R++;
      if (R < (0.9 * x.length) / 2) continue;
      let P = !0;
      for (let C = 0; C < v.length && P; C += 2) {
        let I = v[C],
          L = v[C + 1];
        if (rn(E, I, L)) continue;
        let F = 1e9;
        for (let O = 0, B = E.length / 2; O < B; O++) {
          let H = E[O * 2],
            N = E[O * 2 + 1],
            D = E[((O + 1) % B) * 2] - H,
            U = E[((O + 1) % B) * 2 + 1] - N,
            G = D * D + U * U || 1,
            W = Math.max(0, Math.min(1, ((I - H) * D + (L - N) * U) / G));
          F = Math.min(F, Math.hypot(H + D * W - I, N + U * W - L));
        }
        F > 1 && (P = !1);
      }
      if (P) {
        if (T <= A + 1 && _ <= z + 1) {
          r[p] = 1;
          break;
        }
        T <= A + 1
          ? (l[p] = Math.max(l[p], z))
          : _ <= z + 1 && (c[p] = Math.min(c[p] || 1e9, T));
      }
    }
  }
  return (
    (e = { n: s, hide: r, cut: l, tcut: c, box: h, area: f, cells: u }),
    NX.set(o, e),
    e
  );
}
var HX = new WeakMap();
