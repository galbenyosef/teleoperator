// app 24 — map
// Lines 43921-44172 of readable/app.pretty.js (statement-aligned).
async function eU(i, t) {
  for (let s of tU) s.re.test(i) && (await s.gate);
  if (globalThis.MB_B64) {
    let s = await Nl(i + ".json", { priority: t, read: (a) => a.json() });
    if (s.parts) {
      let a = await Promise.all(
        Array.from({ length: s.parts }, (r, l) =>
          Nl(`${i}.part${l}.json`, { read: (c) => c.json() }),
        ),
      );
      s.b64gz = a.map((r) => r.b64gz).join("");
    }
    let n = s.b64 ?? s.b64gz,
      o;
    if (Uint8Array.fromBase64) o = Uint8Array.fromBase64(n);
    else {
      let a = atob(n);
      o = new Uint8Array(a.length);
      for (let r = 0; r < a.length; r++) o[r] = a.charCodeAt(r);
    }
    return s.b64gz != null
      ? new Response(
          new Blob([o]).stream().pipeThrough(new DecompressionStream("gzip")),
        ).arrayBuffer()
      : o.buffer;
  }
  let e =
    !globalThis.SF_PRE?.has(i) && !globalThis.SF_PRE?.has(i + ".gz")
      ? globalThis.SF_FETCH
      : null;
  if (e) {
    let s = !!globalThis.MB_GZ && /\.(bin|hdr|glb)$/.test(i);
    try {
      let n = await e(s ? i + ".gz" : i, t, s);
      if (n) return n;
    } catch (n) {
      if (n.name === "AssetLoadError" && !(s && n.status === 404)) throw n;
    }
  }
  if (globalThis.MB_GZ && /\.(bin|hdr|glb)$/.test(i))
    try {
      return await Nl(i + ".gz", {
        priority: t,
        read: (s) =>
          new Response(
            s.body.pipeThrough(new DecompressionStream("gzip")),
          ).arrayBuffer(),
      });
    } catch (s) {
      if (s.status !== 404) throw s;
    }
  return Nl(i, { priority: t });
}
var sU = (i) => {
  let t = Number.isInteger(i) ? i.toFixed(1) : i.toPrecision(7);
  return t.includes("e") || t.includes(".") ? t : t + ".0";
};
function nU(i, t, e, s = "inline", n = !1) {
  let o = n ? "vec4h" : "vec4f",
    a = n ? "mat4x4h" : "mat4x4f",
    r = i.layers,
    l = (v) => Math.ceil(v / 4) * 4,
    c = [],
    h = l(e.length);
  for (let v = 0; v < h; v += 4) {
    let y = [0, 1, 2, 3].map((M) => e[v + M] ?? "0.0");
    c.push(`${o}(${n ? `vec4f(${y.join(", ")})` : y.join(", ")})`);
  }
  let f = "",
    u = new Set(
      c
        .map((v, y) => y)
        .filter((v) =>
          [0, 1, 2, 3].every((y) => (e[v * 4 + y] ?? "0.0") === "0.0"),
        ),
    ),
    d =
      c.map((v, y) => (u.has(y) ? "" : `let x0_${y} = ${v};`)).filter(Boolean)
        .join(`
  `) +
      `
  `,
    p = [],
    m = new Set(),
    g = c.map((v, y) => `x0_${y}`);
  if (
    (r.forEach((v, y) => {
      let M = t.subarray(v.offset, v.offset + v.in * v.out),
        S = t.subarray(
          v.offset + v.in * v.out,
          v.offset + v.in * v.out + v.out,
        ),
        w = l(v.in) / 4,
        z = l(v.out) / 4,
        _ = y === r.length - 1,
        R = [];
      for (let T = 0; T < z; T++) {
        let E = [],
          A = "";
        for (let L = 0; L < w; L++) {
          if (y === 0 && u.has(L)) continue;
          let F = [],
            N = !1;
          for (let H = 0; H < 4; H++) {
            let O = [];
            for (let D = 0; D < 4; D++) {
              let U = T * 4 + D,
                G = L * 4 + H,
                q = U < v.out && G < v.in ? M[U * v.in + G] : 0;
              (q !== 0 && (N = !0), O.push(sU(q)));
            }
            F.push(`${o}(${O.join(", ")})`);
          }
          if (!N) continue;
          let B = `W${y}_${T}_${L}`;
          (s === "inline" &&
            (A += `const ${B} = ${a}(${F.join(", ")});
`),
            E.push(
              s === "inline"
                ? `${B} * ${g[L]}`
                : `NW.m[${y}u][${T * w + L}] * ${g[L]}`,
            ));
        }
        let C = [0, 1, 2, 3].map((L) =>
            sU(T * 4 + L < v.out ? S[T * 4 + L] : 0),
          ),
          P = `${o}(${C.join(", ")}) + ${E.join(" + ")}`,
          I = `h${y + 1}_${T}`;
        (_
          ? (p[T] = {
              decls: A,
              body: `let ${I} = vec4f(${P});
  `,
            })
          : ((f += A),
            (d += `let ${I} = max(${P}, ${o}(0.0));
  `)),
          R.push(I));
      }
      g = R;
    }),
    s !== "inline")
  )
    throw new Error("uniform mode not wired in this prototype");
  let b = (v) => (m.add(v >> 2), `${g[v >> 2]}.${"xyzw"[v & 3]}`),
    x = (v) =>
      p
        .filter((y, M) => m.has(M))
        .map((y) => y[v])
        .join("");
  return {
    get decls() {
      return f + x("decls");
    },
    get body() {
      return d + x("body");
    },
    get out() {
      return (m.add(0), `${g[0]}.xyz`);
    },
    comp: b,
    vec3: (v) => `vec3f(${b(v)}, ${b(v + 1)}, ${b(v + 2)})`,
    outBlocks: () => [m.size, p.length],
  };
}
var Td = class i {
  static async load(t, e, s = {}) {
    let n = e.replace(/[^/]*$/, ""),
      o = await Nl(e, { read: (g) => g.json() }),
      a = s.latents === !1,
      [r, l, ...c] = await Promise.all([
        io(n + "weights.bin"),
        io(n + o.priors.file),
        ...(a ? [] : o.latents.map((g) => io(n + g.file))),
      ]),
      h = new i();
    ((h.manifest = o),
      (h.weights = new Float32Array(r)),
      (h.bytes =
        r.byteLength + l.byteLength + c.reduce((g, b) => g + b.byteLength, 0)));
    let f = o.priors;
    if (f.mips) {
      h.priorTex = t.createTexture({
        size: [f.width, f.height, f.layers],
        mipLevelCount: f.levels,
        format: f.format,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });
      let g = 0;
      for (let b = 0; b < f.levels; b++) {
        let x = f.width >> b,
          v = f.height >> b;
        (t.queue.writeTexture(
          { texture: h.priorTex, mipLevel: b },
          l,
          { offset: g, bytesPerRow: x * 4, rowsPerImage: v },
          [x, v, f.layers],
        ),
          (g += x * v * 4 * f.layers));
      }
    } else
      ((h.priorTex = t.createTexture({
        size: [f.width, f.height, f.levels],
        format: "rgba16float",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      })),
        t.queue.writeTexture(
          { texture: h.priorTex },
          l,
          { bytesPerRow: f.width * 8, rowsPerImage: f.height },
          [f.width, f.height, f.levels],
        ));
    let u = o.latents[0].groups,
      d = a ? 1 : Math.max(...o.latents.map((g) => g.size));
    if (!o.latents.every((g) => g.groups === u))
      throw new Error("latent layers need the same channel count");
    h.latentScale = o.latents.map((g) => (a ? 1 : g.size / d));
    let p = o.latentFormat || "rgba16float",
      m = o.latentBytesPerTexel || 8;
    return (
      (h.latentTex = t.createTexture({
        size: [d, d, o.latents.length * u],
        format: p,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      })),
      c.forEach((g, b) => {
        let x = o.latents[b].size;
        t.queue.writeTexture(
          { texture: h.latentTex, origin: [0, 0, b * u] },
          g,
          { bytesPerRow: x * m, rowsPerImage: x },
          [x, x, u],
        );
      }),
      h
    );
  }
  static empty(t) {
    if (!this._empty) {
      let e = (s) =>
        t.createTexture({
          size: [1, 1, s],
          format: "rgba16float",
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });
      this._empty = { priorTex: e(5), latentTex: e(2) };
    }
    return this._empty;
  }
};
var x4t = Math.PI * 2;
