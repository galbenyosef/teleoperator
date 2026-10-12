// workers__car 01 — math
// Lines 1-270 of readable/workers__car.pretty.js (statement-aligned).
var $ = [
    [-0.855, 0.358, -1.16],
    [0.849, 0.358, -1.159],
    [-0.844, 0.358, 1.486],
    [0.848, 0.358, 1.487],
  ],
  K = /^(CarBody|CarCarbon|CarTaillight|CarHeadlight|CarSignal|CarYellow)$/,
  Q = /^(CarBody|CarCarbon)$/;
function Y(A, v) {
  let M = new Map();
  for (let c = 0; c < A.length; c++) {
    let d = A[c],
      b = d.length / 3;
    for (let f = 0; f < b; f++) {
      let s = Math.round(d[f * 3] * v),
        u = Math.round(d[f * 3 + 1] * v),
        e = Math.round(d[f * 3 + 2] * v),
        p =
          (Math.imul(s, 73856093) ^
            Math.imul(u, 19349663) ^
            Math.imul(e, 83492791)) |
          0,
        C = M.get(p);
      C || M.set(p, (C = []));
      let x = null;
      for (let o of C)
        if (o[0] === s && o[1] === u && o[2] === e) {
          x = o;
          break;
        }
      (x || C.push((x = [s, u, e, []])), x[3].push(c, f));
    }
  }
  let O = [];
  for (let c of M.values()) for (let d of c) O.push(d[3]);
  return O;
}
function J(A, v) {
  if (!v) return 0;
  let M = new DataView(v.buffer || v, v.byteOffset || 0);
  if (M.getUint32(0, !0) !== 827277635) return 0;
  let O = 8,
    c = [];
  for (let s = 0, u = M.getUint32(4, !0); s < u; s++) {
    let e = M.getUint8(O),
      p = new TextDecoder().decode(
        new Uint8Array(M.buffer, M.byteOffset + O + 1, e),
      );
    ((O += 1 + e), c.push([p, M.getUint32(O, !0)]), (O += 4));
  }
  let d = new Uint8Array(M.buffer, M.byteOffset + O),
    b = 0,
    f = 0;
  for (let s = 0; s < c.length && s < A.length; s++) {
    let [u, e] = c[s],
      p = A[s];
    if (p.name === u && p.attrs.position.array.length / 3 === e) {
      let C = new Float32Array(e * 2);
      for (let x = 0; x < e; x++) C[x * 2] = 1 - d[b + x] / 255;
      ((p.attrs.uv1 = { array: C, itemSize: 2 }), f++);
    }
    b += e;
  }
  return f;
}
function W(A) {
  for (let c of A) {
    let d = c.attrs.position.array,
      b = d.length / 3;
    for (let f = 0; f < b; f++) {
      let s = d[f * 3],
        u = d[f * 3 + 1],
        e = d[f * 3 + 2],
        p = 1;
      for (let [C, , x] of $)
        if (Math.abs(s) > 0.5 && Math.sign(s) === Math.sign(C)) {
          let o = Math.hypot(u - 0.358, e - x);
          p = Math.min(p, Math.min(1, Math.max(0, (o - 0.37) / 0.05)));
        }
      d[f * 3 + 1] = u - 0.035 * p * p * (3 - 2 * p);
    }
  }
  let M = A.filter((c) => K.test(c.name));
  if (M.length) {
    let d = M.map((f) => {
        let s = f.attrs.normal.array,
          u = new Float32Array(s.length);
        for (let e = 0; e < s.length; e += 3) {
          let p = Math.hypot(s[e], s[e + 1], s[e + 2]) || 1;
          ((u[e] = s[e] / p),
            (u[e + 1] = s[e + 1] / p),
            (u[e + 2] = s[e + 2] / p));
        }
        return u;
      }),
      b = d.map((f) => f.slice());
    for (let f of Y(
      M.map((s) => s.attrs.position.array),
      1e4,
    ))
      if (!(f.length <= 2))
        for (let s = 0; s < f.length; s += 2) {
          let u = d[f[s]],
            e = f[s + 1],
            p = u[e * 3],
            C = u[e * 3 + 1],
            x = u[e * 3 + 2],
            o = 0,
            a = 0,
            n = 0;
          for (let m = 0; m < f.length; m += 2) {
            let w = d[f[m]],
              g = f[m + 1],
              t = w[g * 3],
              i = w[g * 3 + 1],
              l = w[g * 3 + 2];
            t * p + i * C + l * x >= 0.64 && ((o += t), (a += i), (n += l));
          }
          let y = Math.hypot(o, a, n) || 1,
            h = b[f[s]];
          ((h[e * 3] = o / y), (h[e * 3 + 1] = a / y), (h[e * 3 + 2] = n / y));
        }
    M.forEach((f, s) => {
      let u = b[s];
      for (let e = 0; e < u.length; e += 3) {
        let p = Math.hypot(u[e], u[e + 1], u[e + 2]) || 1;
        ((u[e] /= p), (u[e + 1] /= p), (u[e + 2] /= p));
      }
      f.attrs.normal = { array: u, itemSize: 3 };
    });
  }
  for (let c of A) {
    if (!Q.test(c.name) || !c.index) continue;
    let d = 4,
      b = 0.82,
      f = 0.6,
      s = c.attrs.position.array,
      u = c.attrs.normal.array,
      e = s.length / 3,
      p = c.index,
      C = new Int32Array(e);
    for (let t of Y([s], 1e5)) {
      let i = t[1];
      for (let l = 1; l < t.length; l += 2) C[t[l]] = i;
    }
    let x = new Float64Array(p.length * 2),
      o = 0,
      a = (t, i) => {
        ((t = C[t]), (i = C[i]), t !== i && (x[o++] = t * 4294967296 + i));
      };
    for (let t = 0; t < p.length; t += 3) {
      let i = p[t],
        l = p[t + 1],
        r = p[t + 2];
      (a(i, l), a(l, i), a(l, r), a(r, l), a(r, i), a(i, r));
    }
    let n = x.subarray(0, o).sort(),
      y = new Int32Array(e + 1),
      h = new Int32Array(o),
      m = 0,
      w = -1;
    for (let t = 0; t < o; t++) {
      if (n[t] === w) continue;
      w = n[t];
      let i = Math.floor(n[t] / 4294967296);
      ((h[m++] = n[t] - i * 4294967296), y[i + 1]++);
    }
    for (let t = 0; t < e; t++) y[t + 1] += y[t];
    let g = new Float32Array(u);
    for (let t = 0; t < d; t++) {
      let i = g.slice();
      for (let l = 0; l < e; l++) {
        let r = C[l],
          z = y[r],
          U = y[r + 1];
        if (z === U) continue;
        let S = g[l * 3],
          j = g[l * 3 + 1],
          E = g[l * 3 + 2],
          V = 0,
          R = 0,
          _ = 0,
          P = 0;
        for (let D = z; D < U; D++) {
          let F = h[D],
            B = g[F * 3],
            H = g[F * 3 + 1],
            N = g[F * 3 + 2];
          S * B + j * H + E * N < b || ((V += B), (R += H), (_ += N), P++);
        }
        if (!P) continue;
        let T = S + f * (V / P - S),
          k = j + f * (R / P - j),
          L = E + f * (_ / P - E),
          I = Math.hypot(T, k, L) || 1;
        ((i[l * 3] = T / I), (i[l * 3 + 1] = k / I), (i[l * 3 + 2] = L / I));
      }
      g = i;
    }
    c.attrs.normal = { array: g, itemSize: 3 };
  }
  let O = /^(CarTires|CarChrome|CarMetal|CarDetails|CarYellow|CarCarbon)$/;
  return A.map((c) => {
    if (!O.test(c.name)) {
      let o = c.index ? c.index.length / 3 : c.attrs.position.array.length / 9;
      c = { ...c, _body: o };
    }
    let d = c.index,
      b = c.attrs.position.array,
      f = b.length / 3,
      s = d ? d.length / 3 : f / 3,
      u = (o, a) => (d ? d[o * 3 + a] : o * 3 + a),
      e = new Int8Array(s).fill(-1);
    for (let o = 0; o < s; o++) {
      let a = 0,
        n = 0,
        y = 0;
      for (let h = 0; h < 3; h++) {
        let m = u(o, h);
        ((a += b[m * 3]), (n += b[m * 3 + 1]), (y += b[m * 3 + 2]));
      }
      if (
        ((a /= 3),
        (n /= 3),
        (y /= 3),
        !(c._body || Math.abs(a) < 0.55 || Math.abs(a) > 1.02))
      )
        for (let h = 0; h < 4; h++) {
          let [m, w, g] = $[h];
          if (Math.sign(a) === Math.sign(m) && Math.hypot(n - w, y - g) < 0.4) {
            e[o] = h;
            break;
          }
        }
    }
    let p = [[], [], [], [], []];
    for (let o = 0; o < s; o++) p[e[o] < 0 ? 4 : e[o]].push(o);
    let C = Object.entries(c.attrs);
    return {
      parts: p.map((o, a) => {
        if (!o.length) return null;
        let n = new Map(),
          y = new Uint32Array(o.length * 3),
          h = [];
        o.forEach((g, t) => {
          for (let i = 0; i < 3; i++) {
            let l = u(g, i),
              r = n.get(l);
            (r === void 0 && ((r = h.length), n.set(l, r), h.push(l)),
              (y[t * 3 + i] = r));
          }
        });
        let m = {},
          w = {};
        for (let [g, { array: t, itemSize: i }] of C) {
          let l = new Float32Array(h.length * i);
          for (let r = 0; r < h.length; r++)
            for (let z = 0; z < i; z++) l[r * i + z] = t[h[r] * i + z];
          if (g === "position" && a < 4) {
            let [r, z, U] = $[a];
            for (let S = 0; S < l.length; S += 3)
              ((l[S] -= r), (l[S + 1] -= z), (l[S + 2] -= U));
          }
          ((m[g] = l), (w[g] = i));
        }
        return { attrs: m, sizes: w, index: y };
      }),
    };
  });
}
