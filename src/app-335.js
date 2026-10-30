// app 335 — math
// Lines 163457-163665 of readable/app.pretty.js (statement-aligned).
function Oet(o) {
  for (let n of o) {
    let i = n.attrs.position.array,
      a = i.length / 3;
    for (let r = 0; r < a; r++) {
      let l = i[r * 3],
        c = i[r * 3 + 1],
        h = i[r * 3 + 2],
        f = 1;
      for (let [u, , d] of jM)
        if (Math.abs(l) > 0.5 && Math.sign(l) === Math.sign(u)) {
          let p = Math.hypot(c - 0.358, h - d);
          f = Math.min(f, Math.min(1, Math.max(0, (p - 0.37) / 0.05)));
        }
      i[r * 3 + 1] = c - 0.035 * f * f * (3 - 2 * f);
    }
  }
  let e = o.filter((n) => OMt.test(n.name));
  if (e.length) {
    let i = e.map((r) => {
        let l = r.attrs.normal.array,
          c = new Float32Array(l.length);
        for (let h = 0; h < l.length; h += 3) {
          let f = Math.hypot(l[h], l[h + 1], l[h + 2]) || 1;
          ((c[h] = l[h] / f),
            (c[h + 1] = l[h + 1] / f),
            (c[h + 2] = l[h + 2] / f));
        }
        return c;
      }),
      a = i.map((r) => r.slice());
    for (let r of Iet(
      e.map((l) => l.attrs.position.array),
      1e4,
    ))
      if (!(r.length <= 2))
        for (let l = 0; l < r.length; l += 2) {
          let c = i[r[l]],
            h = r[l + 1],
            f = c[h * 3],
            u = c[h * 3 + 1],
            d = c[h * 3 + 2],
            p = 0,
            m = 0,
            g = 0;
          for (let x = 0; x < r.length; x += 2) {
            let y = i[r[x]],
              M = r[x + 1],
              S = y[M * 3],
              w = y[M * 3 + 1],
              _ = y[M * 3 + 2];
            S * f + w * u + _ * d >= 0.64 && ((p += S), (m += w), (g += _));
          }
          let b = Math.hypot(p, m, g) || 1,
            v = a[r[l]];
          ((v[h * 3] = p / b), (v[h * 3 + 1] = m / b), (v[h * 3 + 2] = g / b));
        }
    e.forEach((r, l) => {
      let c = a[l];
      for (let h = 0; h < c.length; h += 3) {
        let f = Math.hypot(c[h], c[h + 1], c[h + 2]) || 1;
        ((c[h] /= f), (c[h + 1] /= f), (c[h + 2] /= f));
      }
      r.attrs.normal = { array: c, itemSize: 3 };
    });
  }
  for (let n of o) {
    if (!BMt.test(n.name) || !n.index) continue;
    let i = 4,
      a = 0.82,
      r = 0.6,
      l = n.attrs.position.array,
      c = n.attrs.normal.array,
      h = l.length / 3,
      f = n.index,
      u = new Int32Array(h);
    for (let S of Iet([l], 1e5)) {
      let w = S[1];
      for (let _ = 1; _ < S.length; _ += 2) u[S[_]] = w;
    }
    let d = new Float64Array(f.length * 2),
      p = 0,
      m = (S, w) => {
        ((S = u[S]), (w = u[w]), S !== w && (d[p++] = S * 4294967296 + w));
      };
    for (let S = 0; S < f.length; S += 3) {
      let w = f[S],
        _ = f[S + 1],
        z = f[S + 2];
      (m(w, _), m(_, w), m(_, z), m(z, _), m(z, w), m(w, z));
    }
    let g = d.subarray(0, p).sort(),
      b = new Int32Array(h + 1),
      v = new Int32Array(p),
      x = 0,
      y = -1;
    for (let S = 0; S < p; S++) {
      if (g[S] === y) continue;
      y = g[S];
      let w = Math.floor(g[S] / 4294967296);
      ((v[x++] = g[S] - w * 4294967296), b[w + 1]++);
    }
    for (let S = 0; S < h; S++) b[S + 1] += b[S];
    let M = new Float32Array(c);
    for (let S = 0; S < i; S++) {
      let w = M.slice();
      for (let _ = 0; _ < h; _++) {
        let z = u[_],
          A = b[z],
          T = b[z + 1];
        if (A === T) continue;
        let E = M[_ * 3],
          R = M[_ * 3 + 1],
          P = M[_ * 3 + 2],
          C = 0,
          I = 0,
          L = 0,
          F = 0;
        for (let D = A; D < T; D++) {
          let U = v[D],
            G = M[U * 3],
            W = M[U * 3 + 1],
            V = M[U * 3 + 2];
          E * G + R * W + P * V < a || ((C += G), (I += W), (L += V), F++);
        }
        if (!F) continue;
        let O = E + r * (C / F - E),
          B = R + r * (I / F - R),
          H = P + r * (L / F - P),
          N = Math.hypot(O, B, H) || 1;
        ((w[_ * 3] = O / N), (w[_ * 3 + 1] = B / N), (w[_ * 3 + 2] = H / N));
      }
      M = w;
    }
    n.attrs.normal = { array: M, itemSize: 3 };
  }
  let s = /^(CarTires|CarChrome|CarMetal|CarDetails|CarYellow|CarCarbon)$/;
  return o.map((n) => {
    if (!s.test(n.name)) {
      let p = n.index ? n.index.length / 3 : n.attrs.position.array.length / 9;
      n = { ...n, _body: p };
    }
    let i = n.index,
      a = n.attrs.position.array,
      r = a.length / 3,
      l = i ? i.length / 3 : r / 3,
      c = (p, m) => (i ? i[p * 3 + m] : p * 3 + m),
      h = new Int8Array(l).fill(-1);
    for (let p = 0; p < l; p++) {
      let m = 0,
        g = 0,
        b = 0;
      for (let v = 0; v < 3; v++) {
        let x = c(p, v);
        ((m += a[x * 3]), (g += a[x * 3 + 1]), (b += a[x * 3 + 2]));
      }
      if (
        ((m /= 3),
        (g /= 3),
        (b /= 3),
        !(n._body || Math.abs(m) < 0.55 || Math.abs(m) > 1.02))
      )
        for (let v = 0; v < 4; v++) {
          let [x, y, M] = jM[v];
          if (Math.sign(m) === Math.sign(x) && Math.hypot(g - y, b - M) < 0.4) {
            h[p] = v;
            break;
          }
        }
    }
    let f = [[], [], [], [], []];
    for (let p = 0; p < l; p++) f[h[p] < 0 ? 4 : h[p]].push(p);
    let u = Object.entries(n.attrs);
    return {
      parts: f.map((p, m) => {
        if (!p.length) return null;
        let g = new Map(),
          b = new Uint32Array(p.length * 3),
          v = [];
        p.forEach((M, S) => {
          for (let w = 0; w < 3; w++) {
            let _ = c(M, w),
              z = g.get(_);
            (z === void 0 && ((z = v.length), g.set(_, z), v.push(_)),
              (b[S * 3 + w] = z));
          }
        });
        let x = {},
          y = {};
        for (let [M, { array: S, itemSize: w }] of u) {
          let _ = new Float32Array(v.length * w);
          for (let z = 0; z < v.length; z++)
            for (let A = 0; A < w; A++) _[z * w + A] = S[v[z] * w + A];
          if (M === "position" && m < 4) {
            let [z, A, T] = jM[m];
            for (let E = 0; E < _.length; E += 3)
              ((_[E] -= z), (_[E + 1] -= A), (_[E + 2] -= T));
          }
          ((x[M] = _), (y[M] = w));
        }
        return { attrs: x, sizes: y, index: b };
      }),
    };
  });
}
P0();
var Bet = jM,
  Get = 0.36,
  NMt = /^(CarTires|CarChrome|CarMetal|CarDetails)$/;
