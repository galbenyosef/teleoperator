// workers__car 02 — array
// Lines 271-441 of readable/workers__car.pretty.js (statement-aligned).
function X(A, v) {
  let M = new DataView(A),
    O = M.getUint32(12, !0),
    c = JSON.parse(new TextDecoder().decode(new Uint8Array(A, 20, O))),
    d = 20 + O + 8,
    b = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 },
    f = (x, o = null) => {
      let a = c.accessors[x],
        n = c.bufferViews[a.bufferView],
        y = b[a.type],
        h = a.componentType,
        m = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 }[h],
        w = n.byteStride || y * m,
        g = d + (n.byteOffset || 0) + (a.byteOffset || 0),
        t = o || new Float32Array(a.count * y),
        i = {
          5120: (r) => M.getInt8(r),
          5121: (r) => M.getUint8(r),
          5122: (r) => M.getInt16(r, !0),
          5123: (r) => M.getUint16(r, !0),
          5125: (r) => M.getUint32(r, !0),
          5126: (r) => M.getFloat32(r, !0),
        }[h],
        l = a.normalized
          ? {
              5120: (r) => Math.max(r / 127, -1),
              5121: (r) => r / 255,
              5122: (r) => Math.max(r / 32767, -1),
              5123: (r) => r / 65535,
            }[h]
          : null;
      for (let r = 0; r < a.count; r++)
        for (let z = 0; z < y; z++) {
          let U = i(g + r * w + z * m);
          t[r * y + z] = l ? l(U) : U;
        }
      return t;
    },
    s = (x, o) => {
      let a = new Array(16);
      for (let n = 0; n < 4; n++)
        for (let y = 0; y < 4; y++) {
          let h = 0;
          for (let m = 0; m < 4; m++) h += x[m * 4 + y] * o[n * 4 + m];
          a[n * 4 + y] = h;
        }
      return a;
    },
    u = (x) => {
      if (x.matrix) return x.matrix.slice();
      let [o, a, n, y] = x.rotation || [0, 0, 0, 1],
        [h, m, w] = x.scale || [1, 1, 1],
        [g, t, i] = x.translation || [0, 0, 0];
      return [
        (1 - 2 * (a * a + n * n)) * h,
        2 * (o * a + n * y) * h,
        2 * (o * n - a * y) * h,
        0,
        2 * (o * a - n * y) * m,
        (1 - 2 * (o * o + n * n)) * m,
        2 * (a * n + o * y) * m,
        0,
        2 * (o * n + a * y) * w,
        2 * (a * n - o * y) * w,
        (1 - 2 * (o * o + a * a)) * w,
        0,
        g,
        t,
        i,
        1,
      ];
    },
    e = [],
    p = { POSITION: "position", NORMAL: "normal", TEXCOORD_0: "uv" },
    C = (x, o) => {
      let a = c.nodes[x],
        n = o ? s(o, u(a)) : u(a),
        y = (a.name || "")
          .replace(/\s/g, "_")
          .replace(/[[\].:/]/g, "")
          .replace(/_\d+$/, "");
      if (a.mesh != null && /^Car/.test(y) && v(y))
        for (let h of c.meshes[a.mesh].primitives) {
          let m = {};
          for (let [t, i] of Object.entries(p))
            h.attributes[t] != null &&
              (m[i] = {
                array: f(h.attributes[t]),
                itemSize: b[c.accessors[h.attributes[t]].type],
              });
          let w = m.position.array,
            g = m.normal?.array;
          for (let t = 0; t < w.length; t += 3) {
            let i = w[t],
              l = w[t + 1],
              r = w[t + 2];
            ((w[t] = n[0] * i + n[4] * l + n[8] * r + n[12]),
              (w[t + 1] = n[1] * i + n[5] * l + n[9] * r + n[13]),
              (w[t + 2] = n[2] * i + n[6] * l + n[10] * r + n[14]));
          }
          if (g) {
            let [t, i, l, r, z, U, S, j, E] = [
                n[0],
                n[4],
                n[8],
                n[1],
                n[5],
                n[9],
                n[2],
                n[6],
                n[10],
              ],
              V = z * E - U * j,
              R = U * S - r * E,
              _ = r * j - z * S,
              P = Math.sign(t * V + i * R + l * _) || 1,
              T = [
                V,
                R,
                _,
                -(i * E - l * j),
                t * E - l * S,
                -(t * j - i * S),
                i * U - l * z,
                -(t * U - l * r),
                t * z - i * r,
              ].map((k) => k * P);
            for (let k = 0; k < g.length; k += 3) {
              let L = g[k],
                I = g[k + 1],
                D = g[k + 2],
                F = T[0] * L + T[1] * I + T[2] * D,
                B = T[3] * L + T[4] * I + T[5] * D,
                H = T[6] * L + T[7] * I + T[8] * D,
                N = Math.hypot(F, B, H) || 1;
              ((g[k] = F / N), (g[k + 1] = B / N), (g[k + 2] = H / N));
            }
          }
          e.push({
            name: y,
            attrs: m,
            index: h.indices != null ? Uint32Array.from(f(h.indices)) : null,
          });
        }
      for (let h of a.children || []) C(h, n);
    };
  for (let x of c.scenes[c.scene || 0].nodes) C(x, null);
  return e;
}
self.onmessage = ({ data: { meshes: A, glb: v, keep: M, ao: O } }) => {
  try {
    let c = null;
    if (v) {
      let f = new Set(M);
      ((A = X(v, (s) => f.has(s))), (c = A.map((s) => s.name)));
    }
    J(A, O);
    let d = W(A),
      b = [];
    for (let f of d)
      for (let s of f.parts)
        if (s) {
          for (let u of Object.values(s.attrs)) b.push(u.buffer);
          b.push(s.index.buffer);
        }
    self.postMessage({ out: d, names: c }, b);
  } catch (c) {
    self.postMessage({ err: String(c?.stack || c) });
  }
};
self.postMessage({ hi: 1 });
