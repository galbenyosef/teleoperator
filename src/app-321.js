// app 321 — math
// Lines 157808-158016 of readable/app.pretty.js (statement-aligned).
function WZ(i) {
  for (let n of i) {
    let o = n.attrs.position.array,
      a = o.length / 3;
    for (let r = 0; r < a; r++) {
      let l = o[r * 3],
        c = o[r * 3 + 1],
        h = o[r * 3 + 2],
        f = 1;
      for (let [u, , d] of qw)
        if (Math.abs(l) > 0.5 && Math.sign(l) === Math.sign(u)) {
          let p = Math.hypot(c - 0.358, h - d);
          f = Math.min(f, Math.min(1, Math.max(0, (p - 0.37) / 0.05)));
        }
      o[r * 3 + 1] = c - 0.035 * f * f * (3 - 2 * f);
    }
  }
  let e = i.filter((n) => d3t.test(n.name));
  if (e.length) {
    let o = e.map((r) => {
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
      a = o.map((r) => r.slice());
    for (let r of UZ(
      e.map((l) => l.attrs.position.array),
      1e4,
    ))
      if (!(r.length <= 2))
        for (let l = 0; l < r.length; l += 2) {
          let c = o[r[l]],
            h = r[l + 1],
            f = c[h * 3],
            u = c[h * 3 + 1],
            d = c[h * 3 + 2],
            p = 0,
            m = 0,
            g = 0;
          for (let v = 0; v < r.length; v += 2) {
            let y = o[r[v]],
              M = r[v + 1],
              S = y[M * 3],
              w = y[M * 3 + 1],
              z = y[M * 3 + 2];
            S * f + w * u + z * d >= 0.64 && ((p += S), (m += w), (g += z));
          }
          let b = Math.hypot(p, m, g) || 1,
            x = a[r[l]];
          ((x[h * 3] = p / b), (x[h * 3 + 1] = m / b), (x[h * 3 + 2] = g / b));
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
  for (let n of i) {
    if (!p3t.test(n.name) || !n.index) continue;
    let o = 4,
      a = 0.82,
      r = 0.6,
      l = n.attrs.position.array,
      c = n.attrs.normal.array,
      h = l.length / 3,
      f = n.index,
      u = new Int32Array(h);
    for (let S of UZ([l], 1e5)) {
      let w = S[1];
      for (let z = 1; z < S.length; z += 2) u[S[z]] = w;
    }
    let d = new Float64Array(f.length * 2),
      p = 0,
      m = (S, w) => {
        ((S = u[S]), (w = u[w]), S !== w && (d[p++] = S * 4294967296 + w));
      };
    for (let S = 0; S < f.length; S += 3) {
      let w = f[S],
        z = f[S + 1],
        _ = f[S + 2];
      (m(w, z), m(z, w), m(z, _), m(_, z), m(_, w), m(w, _));
    }
    let g = d.subarray(0, p).sort(),
      b = new Int32Array(h + 1),
      x = new Int32Array(p),
      v = 0,
      y = -1;
    for (let S = 0; S < p; S++) {
      if (g[S] === y) continue;
      y = g[S];
      let w = Math.floor(g[S] / 4294967296);
      ((x[v++] = g[S] - w * 4294967296), b[w + 1]++);
    }
    for (let S = 0; S < h; S++) b[S + 1] += b[S];
    let M = new Float32Array(c);
    for (let S = 0; S < o; S++) {
      let w = M.slice();
      for (let z = 0; z < h; z++) {
        let _ = u[z],
          R = b[_],
          T = b[_ + 1];
        if (R === T) continue;
        let E = M[z * 3],
          A = M[z * 3 + 1],
          C = M[z * 3 + 2],
          P = 0,
          I = 0,
          L = 0,
          F = 0;
        for (let D = R; D < T; D++) {
          let U = x[D],
            G = M[U * 3],
            q = M[U * 3 + 1],
            W = M[U * 3 + 2];
          E * G + A * q + C * W < a || ((P += G), (I += q), (L += W), F++);
        }
        if (!F) continue;
        let N = E + r * (P / F - E),
          B = A + r * (I / F - A),
          H = C + r * (L / F - C),
          O = Math.hypot(N, B, H) || 1;
        ((w[z * 3] = N / O), (w[z * 3 + 1] = B / O), (w[z * 3 + 2] = H / O));
      }
      M = w;
    }
    n.attrs.normal = { array: M, itemSize: 3 };
  }
  let s = /^(CarTires|CarChrome|CarMetal|CarDetails|CarYellow|CarCarbon)$/;
  return i.map((n) => {
    if (!s.test(n.name)) {
      let p = n.index ? n.index.length / 3 : n.attrs.position.array.length / 9;
      n = { ...n, _body: p };
    }
    let o = n.index,
      a = n.attrs.position.array,
      r = a.length / 3,
      l = o ? o.length / 3 : r / 3,
      c = (p, m) => (o ? o[p * 3 + m] : p * 3 + m),
      h = new Int8Array(l).fill(-1);
    for (let p = 0; p < l; p++) {
      let m = 0,
        g = 0,
        b = 0;
      for (let x = 0; x < 3; x++) {
        let v = c(p, x);
        ((m += a[v * 3]), (g += a[v * 3 + 1]), (b += a[v * 3 + 2]));
      }
      if (
        ((m /= 3),
        (g /= 3),
        (b /= 3),
        !(n._body || Math.abs(m) < 0.55 || Math.abs(m) > 1.02))
      )
        for (let x = 0; x < 4; x++) {
          let [v, y, M] = qw[x];
          if (Math.sign(m) === Math.sign(v) && Math.hypot(g - y, b - M) < 0.4) {
            h[p] = x;
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
          x = [];
        p.forEach((M, S) => {
          for (let w = 0; w < 3; w++) {
            let z = c(M, w),
              _ = g.get(z);
            (_ === void 0 && ((_ = x.length), g.set(z, _), x.push(z)),
              (b[S * 3 + w] = _));
          }
        });
        let v = {},
          y = {};
        for (let [M, { array: S, itemSize: w }] of u) {
          let z = new Float32Array(x.length * w);
          for (let _ = 0; _ < x.length; _++)
            for (let R = 0; R < w; R++) z[_ * w + R] = S[x[_] * w + R];
          if (M === "position" && m < 4) {
            let [_, R, T] = qw[m];
            for (let E = 0; E < z.length; E += 3)
              ((z[E] -= _), (z[E + 1] -= R), (z[E + 2] -= T));
          }
          ((v[M] = z), (y[M] = w));
        }
        return { attrs: v, sizes: y, index: b };
      }),
    };
  });
}
ml();
var qZ = qw,
  XZ = 0.36,
  m3t = /^(CarTires|CarChrome|CarMetal|CarDetails)$/;
