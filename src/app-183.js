// app 183 — box
// Lines 105081-105356 of readable/app.pretty.js (statement-aligned).
function ZV(i, t) {
  let e = gk(i),
    s = NV.get(i);
  if (
    ((!s || s.n !== e.n) && (NV.set(i, (s = new Map())), (s.n = e.n)),
    s.has(t.i))
  )
    return s.get(t.i);
  let n = i.bld,
    o = t.i,
    a = o * 4,
    r = t.rings[0],
    l = r.length / 2,
    c = 32,
    h = new Set(),
    f = null,
    u = n.bF[o * 3 + 1],
    d = Math.max(
      n.bF[o * 3 + 2] > 0 ? n.bF[o * 3 + 2] : -1e9,
      e.cut[o] || -1e9,
    );
  for (
    let p = Math.floor((e.box[a] - 1) / c);
    p <= Math.floor((e.box[a + 2] + 1) / c);
    p++
  )
    for (
      let m = Math.floor((e.box[a + 1] - 1) / c);
      m <= Math.floor((e.box[a + 3] + 1) / c);
      m++
    )
      for (let g of e.cells.get((p + 4096) * 8192 + m + 4096) || []) {
        if (
          g === o ||
          h.has(g) ||
          (h.add(g),
          e.hide[g] ||
            e.area[g] < e.area[o] ||
            (e.area[g] === e.area[o] && g > o))
        )
          continue;
        let b = g * 4;
        if (
          e.box[b] > e.box[a + 2] + 0.5 ||
          e.box[b + 2] < e.box[a] - 0.5 ||
          e.box[b + 1] > e.box[a + 3] + 0.5 ||
          e.box[b + 3] < e.box[a + 1] - 0.5
        )
          continue;
        let x = Math.max(
            n.bF[g * 3 + 2] > 0 ? n.bF[g * 3 + 2] : -1e9,
            e.cut[g] || -1e9,
          ),
          v = e.tcut[g] || n.bF[g * 3 + 1];
        if (x > d + 1 || x >= u - 0.1) continue;
        let y = n.pts.subarray(
          n.rStart[n.bRing[g]] * 2,
          n.rStart[n.bRing[g] + 1] * 2,
        );
        for (let M = 0; M < l; M++) {
          let S = r[M * 2],
            w = r[M * 2 + 1],
            z = r[((M + 1) % l) * 2],
            _ = r[((M + 1) % l) * 2 + 1],
            R = Math.hypot(z - S, _ - w);
          if (
            R < 0.1 ||
            Math.max(S, z) < e.box[b] - 0.1 ||
            Math.min(S, z) > e.box[b + 2] + 0.1 ||
            Math.max(w, _) < e.box[b + 1] - 0.1 ||
            Math.min(w, _) > e.box[b + 3] + 0.1
          )
            continue;
          let T = (S + z) / 2,
            E = (w + _) / 2;
          if (
            R >= 0.8 &&
            !(
              T < e.box[b] - 0.5 ||
              T > e.box[b + 2] + 0.5 ||
              E < e.box[b + 1] - 0.5 ||
              E > e.box[b + 3] + 0.5
            )
          ) {
            let I = (-(_ - w) / R) * 0.3,
              L = ((z - S) / R) * 0.3,
              F = !0;
            for (let N of [0.15, 0.5, 0.85]) {
              let B = S + (z - S) * N,
                H = w + (_ - w) * N;
              if (!en(y, B - I, H - L) || en(y, B + I, H + L)) {
                F = !1;
                break;
              }
            }
            if (F) {
              ((f ||= new Float32Array(l)), (f[M] = Math.max(f[M], v)));
              continue;
            }
          }
          let A = (z - S) / R,
            C = (_ - w) / R,
            P = y.length / 2;
          for (let I = 0; I < P; I++) {
            let L = y[I * 2],
              F = y[I * 2 + 1],
              N = y[((I + 1) % P) * 2],
              B = y[((I + 1) % P) * 2 + 1],
              H = Math.hypot(N - L, B - F);
            if (H < 0.1 || ((N - L) * A + (B - F) * C) / H < 0.996) continue;
            let O = (L - S) * -C + (F - w) * A,
              D = (N - S) * -C + (B - w) * A;
            if (Math.abs(O) > 0.06 || Math.abs(D) > 0.06) continue;
            let U = Math.max(0, (L - S) * A + (F - w) * C),
              G = Math.min(R, (N - S) * A + (B - w) * C);
            G - U < 0.03 ||
              ((f ||= new Float32Array(l)).spans ||= []).push({
                ax: S,
                az: w,
                ux: A,
                uz: C,
                l: R,
                sa: U,
                sb: G,
                y: v,
              });
          }
        }
      }
  return (s.set(o, f), f);
}
function BV(i) {
  let t = $l;
  if (!t || !(i.minh > 0)) return 0;
  let e = gk(t),
    s = t.bld,
    n = i.i,
    o = n * 4,
    a = 32,
    r = new Set(),
    l = i.rings[0];
  for (let c = Math.floor(e.box[o] / a); c <= Math.floor(e.box[o + 2] / a); c++)
    for (
      let h = Math.floor(e.box[o + 1] / a);
      h <= Math.floor(e.box[o + 3] / a);
      h++
    )
      for (let f of e.cells.get((c + 4096) * 8192 + h + 4096) || []) {
        if (
          f === n ||
          r.has(f) ||
          (r.add(f),
          e.hide[f] ||
            !(s.bF[f * 3 + 2] > 0) ||
            Math.abs(s.bF[f * 3 + 2] - i.minh) > 0.06 ||
            e.area[f] < e.area[n] ||
            (e.area[f] === e.area[n] && f > n))
        )
          continue;
        let u = f * 4;
        if (
          e.box[u] >= e.box[o + 2] ||
          e.box[u + 2] <= e.box[o] ||
          e.box[u + 1] >= e.box[o + 3] ||
          e.box[u + 3] <= e.box[o + 1]
        )
          continue;
        let d = s.pts.subarray(
          s.rStart[s.bRing[f]] * 2,
          s.rStart[s.bRing[f] + 1] * 2,
        );
        for (let p = 0; p < l.length; p += 2) {
          let m = l[p],
            g = l[p + 1],
            b = (p + 2) % l.length,
            x = (m + l[b]) / 2,
            v = (g + l[b + 1]) / 2;
          if (en(d, m, g) || en(d, x, v)) return 0.08;
        }
        for (let p = 0; p < d.length; p += 2)
          if (en(l, d[p], d[p + 1])) return 0.08;
      }
  return 0;
}
var OV = new WeakMap();
function QV(i) {
  let t = $l;
  if (!t || i.rs) return 0;
  let e = OV.get(t);
  if ((e || OV.set(t, (e = new Map())), e.has(i.i))) return e.get(i.i);
  let s = gk(t),
    n = t.bld,
    o = i.i,
    a = o * 4,
    r = 32,
    l = new Set(),
    c = i.rings[0],
    h = i.tcut ? Math.min(i.top - i.rh, i.tcut) : i.top - i.rh,
    f = (g) => [g, g - 0.15, g - 0.55],
    u = (g, b) =>
      b.some((x) => f(g).some((v) => f(x).some((y) => Math.abs(v - y) < 0.07))),
    d = [],
    p = null;
  for (let g = Math.floor(s.box[a] / r); g <= Math.floor(s.box[a + 2] / r); g++)
    for (
      let b = Math.floor(s.box[a + 1] / r);
      b <= Math.floor(s.box[a + 3] / r);
      b++
    )
      for (let x of s.cells.get((g + 4096) * 8192 + b + 4096) || []) {
        if (
          x === o ||
          l.has(x) ||
          (l.add(x),
          s.hide[x] ||
            s.area[x] < s.area[o] ||
            (s.area[x] === s.area[o] && x > o))
        )
          continue;
        let v = x * 4;
        if (
          s.box[v] >= s.box[a + 2] ||
          s.box[v + 2] <= s.box[a] ||
          s.box[v + 1] >= s.box[a + 3] ||
          s.box[v + 3] <= s.box[a + 1]
        )
          continue;
        let y = s.tcut[x] || n.bF[x * 3 + 1];
        if (!u(h, [y])) continue;
        if (!p) {
          p = Array.from(c);
          let S = s.box[a + 2] - s.box[a],
            w = s.box[a + 3] - s.box[a + 1],
            z = 12;
          for (let R = 0; R < z; R++)
            for (let T = 0; T < z; T++) {
              let E = s.box[a] + (S * (R + 0.5)) / z,
                A = s.box[a + 1] + (w * (T + 0.5)) / z;
              en(c, E, A) && p.push(E, A);
            }
          let _ = c.length / 2;
          for (let R = 0; R < _; R++) {
            let T = c[R * 2],
              E = c[R * 2 + 1],
              A = c[((R + 1) % _) * 2],
              C = c[((R + 1) % _) * 2 + 1],
              P = Math.hypot(A - T, C - E);
            if (!(P < 0.3))
              for (let I = 0.5; I < P; I += 1)
                for (let L of [-0.35, 0.35]) {
                  let F = T + ((A - T) * I) / P - ((C - E) / P) * L,
                    N = E + ((C - E) * I) / P + ((A - T) / P) * L;
                  en(c, F, N) && p.push(F, N);
                }
          }
        }
        let M = n.pts.subarray(
          n.rStart[n.bRing[x]] * 2,
          n.rStart[n.bRing[x] + 1] * 2,
        );
        for (let S = 0; S < p.length; S += 2)
          if (en(M, p[S], p[S + 1])) {
            d.push(y);
            break;
          }
      }
  let m = 0;
  if (d.length) {
    for (let g of [-0.12, 0.12, -0.24, 0.24])
      if (!u(h + g, d)) {
        m = g;
        break;
      }
  }
  return (e.set(o, m), m);
}
