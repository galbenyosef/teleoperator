// app 182 — box
// Lines 105317-105592 of readable/app.pretty.js (statement-aligned).
function eK(o, t) {
  let e = gz(o),
    s = HX.get(o);
  if (
    ((!s || s.n !== e.n) && (HX.set(o, (s = new Map())), (s.n = e.n)),
    s.has(t.i))
  )
    return s.get(t.i);
  let n = o.bld,
    i = t.i,
    a = i * 4,
    r = t.rings[0],
    l = r.length / 2,
    c = 32,
    h = new Set(),
    f = null,
    u = n.bF[i * 3 + 1],
    d = Math.max(
      n.bF[i * 3 + 2] > 0 ? n.bF[i * 3 + 2] : -1e9,
      e.cut[i] || -1e9,
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
          g === i ||
          h.has(g) ||
          (h.add(g),
          e.hide[g] ||
            e.area[g] < e.area[i] ||
            (e.area[g] === e.area[i] && g > i))
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
        let v = Math.max(
            n.bF[g * 3 + 2] > 0 ? n.bF[g * 3 + 2] : -1e9,
            e.cut[g] || -1e9,
          ),
          x = e.tcut[g] || n.bF[g * 3 + 1];
        if (v > d + 1 || v >= u - 0.1) continue;
        let y = n.pts.subarray(
          n.rStart[n.bRing[g]] * 2,
          n.rStart[n.bRing[g] + 1] * 2,
        );
        for (let M = 0; M < l; M++) {
          let S = r[M * 2],
            w = r[M * 2 + 1],
            _ = r[((M + 1) % l) * 2],
            z = r[((M + 1) % l) * 2 + 1],
            A = Math.hypot(_ - S, z - w);
          if (
            A < 0.1 ||
            Math.max(S, _) < e.box[b] - 0.1 ||
            Math.min(S, _) > e.box[b + 2] + 0.1 ||
            Math.max(w, z) < e.box[b + 1] - 0.1 ||
            Math.min(w, z) > e.box[b + 3] + 0.1
          )
            continue;
          let T = (S + _) / 2,
            E = (w + z) / 2;
          if (
            A >= 0.8 &&
            !(
              T < e.box[b] - 0.5 ||
              T > e.box[b + 2] + 0.5 ||
              E < e.box[b + 1] - 0.5 ||
              E > e.box[b + 3] + 0.5
            )
          ) {
            let I = (-(z - w) / A) * 0.3,
              L = ((_ - S) / A) * 0.3,
              F = !0;
            for (let O of [0.15, 0.5, 0.85]) {
              let B = S + (_ - S) * O,
                H = w + (z - w) * O;
              if (!rn(y, B - I, H - L) || rn(y, B + I, H + L)) {
                F = !1;
                break;
              }
            }
            if (F) {
              ((f ||= new Float32Array(l)), (f[M] = Math.max(f[M], x)));
              continue;
            }
          }
          let R = (_ - S) / A,
            P = (z - w) / A,
            C = y.length / 2;
          for (let I = 0; I < C; I++) {
            let L = y[I * 2],
              F = y[I * 2 + 1],
              O = y[((I + 1) % C) * 2],
              B = y[((I + 1) % C) * 2 + 1],
              H = Math.hypot(O - L, B - F);
            if (H < 0.1 || ((O - L) * R + (B - F) * P) / H < 0.996) continue;
            let N = (L - S) * -P + (F - w) * R,
              D = (O - S) * -P + (B - w) * R;
            if (Math.abs(N) > 0.06 || Math.abs(D) > 0.06) continue;
            let U = Math.max(0, (L - S) * R + (F - w) * P),
              G = Math.min(A, (O - S) * R + (B - w) * P);
            G - U < 0.03 ||
              ((f ||= new Float32Array(l)).spans ||= []).push({
                ax: S,
                az: w,
                ux: R,
                uz: P,
                l: A,
                sa: U,
                sb: G,
                y: x,
              });
          }
        }
      }
  return (s.set(i, f), f);
}
function DX(o) {
  let t = pc;
  if (!t || !(o.minh > 0)) return 0;
  let e = gz(t),
    s = t.bld,
    n = o.i,
    i = n * 4,
    a = 32,
    r = new Set(),
    l = o.rings[0];
  for (let c = Math.floor(e.box[i] / a); c <= Math.floor(e.box[i + 2] / a); c++)
    for (
      let h = Math.floor(e.box[i + 1] / a);
      h <= Math.floor(e.box[i + 3] / a);
      h++
    )
      for (let f of e.cells.get((c + 4096) * 8192 + h + 4096) || []) {
        if (
          f === n ||
          r.has(f) ||
          (r.add(f),
          e.hide[f] ||
            !(s.bF[f * 3 + 2] > 0) ||
            Math.abs(s.bF[f * 3 + 2] - o.minh) > 0.06 ||
            e.area[f] < e.area[n] ||
            (e.area[f] === e.area[n] && f > n))
        )
          continue;
        let u = f * 4;
        if (
          e.box[u] >= e.box[i + 2] ||
          e.box[u + 2] <= e.box[i] ||
          e.box[u + 1] >= e.box[i + 3] ||
          e.box[u + 3] <= e.box[i + 1]
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
            v = (m + l[b]) / 2,
            x = (g + l[b + 1]) / 2;
          if (rn(d, m, g) || rn(d, v, x)) return 0.08;
        }
        for (let p = 0; p < d.length; p += 2)
          if (rn(l, d[p], d[p + 1])) return 0.08;
      }
  return 0;
}
var UX = new WeakMap();
function sK(o) {
  let t = pc;
  if (!t || o.rs) return 0;
  let e = UX.get(t);
  if ((e || UX.set(t, (e = new Map())), e.has(o.i))) return e.get(o.i);
  let s = gz(t),
    n = t.bld,
    i = o.i,
    a = i * 4,
    r = 32,
    l = new Set(),
    c = o.rings[0],
    h = o.tcut ? Math.min(o.top - o.rh, o.tcut) : o.top - o.rh,
    f = (g) => [g, g - 0.15, g - 0.55],
    u = (g, b) =>
      b.some((v) => f(g).some((x) => f(v).some((y) => Math.abs(x - y) < 0.07))),
    d = [],
    p = null;
  for (let g = Math.floor(s.box[a] / r); g <= Math.floor(s.box[a + 2] / r); g++)
    for (
      let b = Math.floor(s.box[a + 1] / r);
      b <= Math.floor(s.box[a + 3] / r);
      b++
    )
      for (let v of s.cells.get((g + 4096) * 8192 + b + 4096) || []) {
        if (
          v === i ||
          l.has(v) ||
          (l.add(v),
          s.hide[v] ||
            s.area[v] < s.area[i] ||
            (s.area[v] === s.area[i] && v > i))
        )
          continue;
        let x = v * 4;
        if (
          s.box[x] >= s.box[a + 2] ||
          s.box[x + 2] <= s.box[a] ||
          s.box[x + 1] >= s.box[a + 3] ||
          s.box[x + 3] <= s.box[a + 1]
        )
          continue;
        let y = s.tcut[v] || n.bF[v * 3 + 1];
        if (!u(h, [y])) continue;
        if (!p) {
          p = Array.from(c);
          let S = s.box[a + 2] - s.box[a],
            w = s.box[a + 3] - s.box[a + 1],
            _ = 12;
          for (let A = 0; A < _; A++)
            for (let T = 0; T < _; T++) {
              let E = s.box[a] + (S * (A + 0.5)) / _,
                R = s.box[a + 1] + (w * (T + 0.5)) / _;
              rn(c, E, R) && p.push(E, R);
            }
          let z = c.length / 2;
          for (let A = 0; A < z; A++) {
            let T = c[A * 2],
              E = c[A * 2 + 1],
              R = c[((A + 1) % z) * 2],
              P = c[((A + 1) % z) * 2 + 1],
              C = Math.hypot(R - T, P - E);
            if (!(C < 0.3))
              for (let I = 0.5; I < C; I += 1)
                for (let L of [-0.35, 0.35]) {
                  let F = T + ((R - T) * I) / C - ((P - E) / C) * L,
                    O = E + ((P - E) * I) / C + ((R - T) / C) * L;
                  rn(c, F, O) && p.push(F, O);
                }
          }
        }
        let M = n.pts.subarray(
          n.rStart[n.bRing[v]] * 2,
          n.rStart[n.bRing[v] + 1] * 2,
        );
        for (let S = 0; S < p.length; S += 2)
          if (rn(M, p[S], p[S + 1])) {
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
  return (e.set(i, m), m);
}
