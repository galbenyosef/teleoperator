// app 182 — math
// Lines 104744-105080 of readable/app.pretty.js (statement-aligned).
var RV = [
    [1.14, 0.84, 1.12],
    [0.82, 1.08, 1.12],
    [1.14, 1.06, 0.78],
    [1.12, 0.9, 0.84],
    [0.9, 1.1, 0.9],
    [1.1, 0.82, 0.86],
    [0.84, 0.92, 1.16],
  ],
  Tpt = {
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
  PV = [
    [1.12, 0.9, 0.82],
    [1.06, 1.02, 0.86],
    [1.05, 1.04, 1],
    [1.1, 0.97, 0.86],
    [1.14, 0.86, 0.8],
    [1.02, 0.98, 0.9],
  ],
  CV = [
    [0.74, 0.9, 1.18],
    [0.7, 0.8, 1],
    [0.84, 1.04, 0.88],
    [0.64, 0.84, 1.14],
    [0.88, 0.94, 1.1],
    [0.68, 0.94, 1],
    [0.78, 0.8, 0.92],
    [0.86, 0.82, 1.06],
  ],
  SP = new Set([
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
function JV(i, t) {
  let e = i._lk ? i._lk.st : i.st;
  if (e !== 0 && e !== 1 && e !== 2 && e !== 3) return null;
  let s = i.cx ?? pu(i.rings[0])[0],
    n = i.cz ?? pu(i.rings[0])[1],
    o = Ai(s, n),
    a = Tpt[o];
  return !a || e === 2 || Cn(t, 24) >= a
    ? SP.has(o)
      ? [0.94, 0.98, 1.07].map(
          (r, l) => r * (1 + [0.08, 0.06, 0.08][l] * (Cn(t, 21 + l) - 0.5)),
        )
      : null
    : o === "seacliff"
      ? PV[Math.floor(Cn(t, 28) * PV.length)]
      : o !== "haight" && o !== "castro" && o !== "mission" && Cn(t, 26) < 0.7
        ? CV[Math.floor(Cn(t, 27) * CV.length)]
        : RV[Math.floor(Cn(t, 25) * RV.length)];
}
var Apt = {
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
  Rpt = {
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
  LV = [
    [1.08, 0.94, 0.88],
    [0.82, 0.94, 1.12],
    [1.04, 1.02, 0.86],
    [0.88, 1.04, 0.92],
    [1.06, 0.88, 0.96],
    [0.9, 0.92, 1.06],
    [0.74, 0.84, 1],
  ];
function Ppt(i, t, e, s, n, o, a, r) {
  let l = i.cell,
    c = l.style,
    h = (g, b, x) => (x ? (v) => 2 * g + b - 1e-4 - v : (v) => v),
    f = [
      { u0: s, n: e, cell: l, mirror: i.mirror, fcol: a, U: h(s, e, i.mirror) },
    ];
  if (
    e < (Apt[c] ?? 1e9) ||
    du[o.seed] ||
    _P[o.seed] !== void 0 ||
    mk.has(o.seed)
  )
    return f;
  let u = t.fronts[i.group].cells.filter(
    (g) => g.style === c && Math.abs(g.w - l.w) <= l.w * 0.35,
  );
  if (u.length < 2) return f;
  let d = a[3] - (l.cell + 0.5) / 64,
    p = Rpt[c],
    m = [];
  for (let g = 0, b = 0; g < e; b++) {
    let x = Math.min(e - g, p[Math.floor(Cn(n, 300 + b) * p.length)]);
    e - g - x === 1 && x > 1 && p[0] > 1 && x++;
    let v, y, M;
    if (b === 0) ((v = l), (y = i.mirror), (M = a));
    else {
      let S = m[b - 1],
        w = n * 31 + b * 977,
        z = 0.92 + 0.16 * Cn(w, 4);
      if (Cn(w, 320) < 0.22) {
        ((v = S.cell), (y = 1 - S.mirror));
        let _ = LV[Math.floor(Cn(w, 321) * LV.length)];
        M = [z * _[0], z * _[1], z * _[2], (v.cell + 0.5) / 64 + d];
      } else {
        let _ = 0;
        do v = u[Math.floor(Cn(w, 340 + _) * u.length)];
        while ((v === S.cell || (b > 1 && v === m[b - 2].cell)) && ++_ < 10);
        y = Cn(w, 360) < 0.5 ? 1 : 0;
        let R = JV(o, w) || [
          1 + 0.09 * (Cn(w, 21) - 0.5),
          1 + 0.07 * (Cn(w, 22) - 0.5),
          1 + 0.09 * (Cn(w, 23) - 0.5),
        ];
        M = [z * R[0], z * R[1], z * R[2], (v.cell + 0.5) / 64 + d];
      }
    }
    (m.push({
      u0: s + g,
      n: x,
      cell: v,
      mirror: y,
      fcol: M,
      U: h(s + g, x, y),
    }),
      (g += x));
  }
  return m;
}
var IV = new WeakMap();
function Cpt(i) {
  let t = IV.get(i);
  if (t && t.skipN === (i.claims?.list?.length ?? -1) && t.n === i.bld.n)
    return t;
  let e = i.bld,
    s = i.claims?.bSkip,
    n = new Map(),
    o = 32,
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
    for (let p = Math.floor(h / o); p <= Math.floor(u / o); p++)
      for (let m = Math.floor(f / o); m <= Math.floor(d / o); m++) {
        let g = (p + 4096) * 8192 + m + 4096,
          b = n.get(g);
        (b || n.set(g, (b = [])), b.push(r));
      }
  }
  return (
    (t = {
      cells: n,
      box: a,
      CS: o,
      skipN: i.claims?.list?.length ?? -1,
      n: e.n,
    }),
    IV.set(i, t),
    t
  );
}
var FV = new WeakMap();
function gk(i) {
  let t = i.bld,
    e = FV.get(i);
  if (e && e.n === t.n) return e;
  let s = t.n,
    n = e ? e.n : 0,
    o = 32,
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
      x = -1e9,
      v = -1e9;
    for (let y = 0; y < m.length; y += 2)
      ((g = Math.min(g, m[y])),
        (x = Math.max(x, m[y])),
        (b = Math.min(b, m[y + 1])),
        (v = Math.max(v, m[y + 1])));
    if (
      ((h[p * 4] = g),
      (h[p * 4 + 1] = b),
      (h[p * 4 + 2] = x),
      (h[p * 4 + 3] = v),
      (f[p] = Math.abs(J5(m))),
      x > g)
    )
      for (let y = Math.floor(g / o); y <= Math.floor(x / o); y++)
        for (let M = Math.floor(b / o); M <= Math.floor(v / o); M++) {
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
    let x = null,
      v = null;
    for (let y of u.get(
      (Math.floor((h[m] + h[m + 2]) / 2 / o) + 4096) * 8192 +
        Math.floor((h[m + 1] + h[m + 3]) / 2 / o) +
        4096,
    ) || []) {
      if (y === p || f[y] < f[p] || (f[y] === f[p] && y > p)) continue;
      let M = y * 4,
        S = Math.min(h[m + 2], h[M + 2]) - Math.max(h[m], h[M]),
        w = Math.min(h[m + 3], h[M + 3]) - Math.max(h[m + 1], h[M + 1]);
      if (S <= 0 || w <= 0 || S * w < 0.85 * g * b) continue;
      let z = t.bF[p * 3 + 1],
        _ = t.bF[y * 3 + 1],
        R = t.bF[p * 3 + 2] > 0 ? t.bF[p * 3 + 2] : -1e9,
        T = t.bF[y * 3 + 2] > 0 ? t.bF[y * 3 + 2] : -1e9;
      if (R >= _ - 0.1 || T >= z - 0.1) continue;
      if (!v) {
        ((x = d(p)), (v = []));
        let P = Math.max(6, Math.min(24, Math.ceil(Math.sqrt(f[p]))));
        for (let I = 0; I < P; I++)
          for (let L = 0; L < P; L++) {
            let F = h[m] + (g * (I + 0.5)) / P,
              N = h[m + 1] + (b * (L + 0.5)) / P;
            en(x, F, N) && v.push(F, N);
          }
      }
      if (v.length < 6) continue;
      let E = d(y),
        A = 0;
      for (let P = 0; P < v.length; P += 2) en(E, v[P], v[P + 1]) && A++;
      if (A < (0.9 * v.length) / 2) continue;
      let C = !0;
      for (let P = 0; P < x.length && C; P += 2) {
        let I = x[P],
          L = x[P + 1];
        if (en(E, I, L)) continue;
        let F = 1e9;
        for (let N = 0, B = E.length / 2; N < B; N++) {
          let H = E[N * 2],
            O = E[N * 2 + 1],
            D = E[((N + 1) % B) * 2] - H,
            U = E[((N + 1) % B) * 2 + 1] - O,
            G = D * D + U * U || 1,
            q = Math.max(0, Math.min(1, ((I - H) * D + (L - O) * U) / G));
          F = Math.min(F, Math.hypot(H + D * q - I, O + U * q - L));
        }
        F > 1 && (C = !1);
      }
      if (C) {
        if (T <= R + 1 && z <= _ + 1) {
          r[p] = 1;
          break;
        }
        T <= R + 1
          ? (l[p] = Math.max(l[p], _))
          : z <= _ + 1 && (c[p] = Math.min(c[p] || 1e9, T));
      }
    }
  }
  return (
    (e = { n: s, hide: r, cut: l, tcut: c, box: h, area: f, cells: u }),
    FV.set(i, e),
    e
  );
}
var NV = new WeakMap();
