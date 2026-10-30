// app 24 — map
// Lines 44036-44353 of readable/app.pretty.js (statement-aligned).
async function iV(o, t) {
  for (let s of nV) s.re.test(o) && (await s.gate);
  if (globalThis.MB_B64) {
    let s = await sc(o + ".json", { priority: t, read: (a) => a.json() });
    if (s.parts) {
      let a = await Promise.all(
        Array.from({ length: s.parts }, (r, l) =>
          sc(`${o}.part${l}.json`, { read: (c) => c.json() }),
        ),
      );
      s.b64gz = a.map((r) => r.b64gz).join("");
    }
    let n = s.b64 ?? s.b64gz,
      i;
    if (Uint8Array.fromBase64) i = Uint8Array.fromBase64(n);
    else {
      let a = atob(n);
      i = new Uint8Array(a.length);
      for (let r = 0; r < a.length; r++) i[r] = a.charCodeAt(r);
    }
    return s.b64gz != null
      ? new Response(
          new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip")),
        ).arrayBuffer()
      : i.buffer;
  }
  let e =
    !globalThis.SF_PRE?.has(o) && !globalThis.SF_PRE?.has(o + ".gz")
      ? globalThis.SF_FETCH
      : null;
  if (e) {
    let s = !!globalThis.MB_GZ && /\.(bin|hdr|glb)$/.test(o);
    try {
      let n = await e(s ? o + ".gz" : o, t, s);
      if (n) return n;
    } catch (n) {
      if (n.name === "AssetLoadError" && !(s && n.status === 404)) throw n;
    }
  }
  if (globalThis.MB_GZ && /\.(bin|hdr|glb)$/.test(o))
    try {
      return await sc(o + ".gz", {
        priority: t,
        read: (s) =>
          new Response(
            s.body.pipeThrough(new DecompressionStream("gzip")),
          ).arrayBuffer(),
      });
    } catch (s) {
      if (s.status !== 404) throw s;
    }
  return sc(o, { priority: t });
}
var oV = (o) => {
  let t = Number.isInteger(o) ? o.toFixed(1) : o.toPrecision(7);
  return t.includes("e") || t.includes(".") ? t : t + ".0";
};
function aV(o, t, e, s = "inline", n = !1) {
  let i = n ? "vec4h" : "vec4f",
    a = n ? "mat4x4h" : "mat4x4f",
    r = o.layers,
    l = (x) => Math.ceil(x / 4) * 4,
    c = [],
    h = l(e.length);
  for (let x = 0; x < h; x += 4) {
    let y = [0, 1, 2, 3].map((M) => e[x + M] ?? "0.0");
    c.push(`${i}(${n ? `vec4f(${y.join(", ")})` : y.join(", ")})`);
  }
  let f = "",
    u = new Set(
      c
        .map((x, y) => y)
        .filter((x) =>
          [0, 1, 2, 3].every((y) => (e[x * 4 + y] ?? "0.0") === "0.0"),
        ),
    ),
    d =
      c.map((x, y) => (u.has(y) ? "" : `let x0_${y} = ${x};`)).filter(Boolean)
        .join(`
  `) +
      `
  `,
    p = [],
    m = new Set(),
    g = c.map((x, y) => `x0_${y}`);
  if (
    (r.forEach((x, y) => {
      let M = t.subarray(x.offset, x.offset + x.in * x.out),
        S = t.subarray(
          x.offset + x.in * x.out,
          x.offset + x.in * x.out + x.out,
        ),
        w = l(x.in) / 4,
        _ = l(x.out) / 4,
        z = y === r.length - 1,
        A = [];
      for (let T = 0; T < _; T++) {
        let E = [],
          R = "";
        for (let L = 0; L < w; L++) {
          if (y === 0 && u.has(L)) continue;
          let F = [],
            O = !1;
          for (let H = 0; H < 4; H++) {
            let N = [];
            for (let D = 0; D < 4; D++) {
              let U = T * 4 + D,
                G = L * 4 + H,
                W = U < x.out && G < x.in ? M[U * x.in + G] : 0;
              (W !== 0 && (O = !0), N.push(oV(W)));
            }
            F.push(`${i}(${N.join(", ")})`);
          }
          if (!O) continue;
          let B = `W${y}_${T}_${L}`;
          (s === "inline" &&
            (R += `const ${B} = ${a}(${F.join(", ")});
`),
            E.push(
              s === "inline"
                ? `${B} * ${g[L]}`
                : `NW.m[${y}u][${T * w + L}] * ${g[L]}`,
            ));
        }
        let P = [0, 1, 2, 3].map((L) =>
            oV(T * 4 + L < x.out ? S[T * 4 + L] : 0),
          ),
          C = `${i}(${P.join(", ")}) + ${E.join(" + ")}`,
          I = `h${y + 1}_${T}`;
        (z
          ? (p[T] = {
              decls: R,
              body: `let ${I} = vec4f(${C});
  `,
            })
          : ((f += R),
            (d += `let ${I} = max(${C}, ${i}(0.0));
  `)),
          A.push(I));
      }
      g = A;
    }),
    s !== "inline")
  )
    throw new Error("uniform mode not wired in this prototype");
  let b = (x) => (m.add(x >> 2), `${g[x >> 2]}.${"xyzw"[x & 3]}`),
    v = (x) =>
      p
        .filter((y, M) => m.has(M))
        .map((y) => y[x])
        .join("");
  return {
    get decls() {
      return f + v("decls");
    },
    get body() {
      return d + v("body");
    },
    get out() {
      return (m.add(0), `${g[0]}.xyz`);
    },
    comp: b,
    vec3: (x) => `vec3f(${b(x)}, ${b(x + 1)}, ${b(x + 2)})`,
    outBlocks: () => [m.size, p.length],
  };
}
var rp = class o {
  static async load(t, e, s = {}) {
    let n = e.replace(/[^/]*$/, ""),
      i = await sc(e, { read: (g) => g.json() }),
      a = s.latents === !1,
      [r, l, ...c] = await Promise.all([
        bo(n + "weights.bin"),
        bo(n + i.priors.file),
        ...(a ? [] : i.latents.map((g) => bo(n + g.file))),
      ]),
      h = new o();
    ((h.manifest = i),
      (h.weights = new Float32Array(r)),
      (h.bytes =
        r.byteLength + l.byteLength + c.reduce((g, b) => g + b.byteLength, 0)));
    let f = i.priors;
    if (f.mips) {
      h.priorTex = t.createTexture({
        size: [f.width, f.height, f.layers],
        mipLevelCount: f.levels,
        format: f.format,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });
      let g = 0;
      for (let b = 0; b < f.levels; b++) {
        let v = f.width >> b,
          x = f.height >> b;
        (t.queue.writeTexture(
          { texture: h.priorTex, mipLevel: b },
          l,
          { offset: g, bytesPerRow: v * 4, rowsPerImage: x },
          [v, x, f.layers],
        ),
          (g += v * x * 4 * f.layers));
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
    let u = i.latents[0].groups,
      d = a ? 1 : Math.max(...i.latents.map((g) => g.size));
    if (!i.latents.every((g) => g.groups === u))
      throw new Error("latent layers need the same channel count");
    h.latentScale = i.latents.map((g) => (a ? 1 : g.size / d));
    let p = i.latentFormat || "rgba16float",
      m = i.latentBytesPerTexel || 8;
    return (
      (h.latentTex = t.createTexture({
        size: [d, d, i.latents.length * u],
        format: p,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      })),
      c.forEach((g, b) => {
        let v = i.latents[b].size;
        t.queue.writeTexture(
          { texture: h.latentTex, origin: [0, 0, b * u] },
          g,
          { bytesPerRow: v * m, rowsPerImage: v },
          [v, v, u],
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
var m7 = (o) =>
  /XPC_ERROR_CONNECTION_(?:INTERRUPTED|INVALID)|Compiler encountered an internal error/.test(
    String(o?.message || o),
  );
function g7(o, t = 45e3) {
  let e,
    s = new Promise((n, i) => {
      e = setTimeout(() => i(new Error("Shader compilation timed out")), t);
    });
  return Promise.race([o, s])
    .catch((n) => {
      let i = new Error("The graphics shaders could not start. Please retry.", {
        cause: n,
      });
      throw ((i.name = "ShaderStartupError"), i);
    })
    .finally(() => clearTimeout(e));
}
var Tm = class {
  constructor({
    concurrency: t = 2,
    retries: e = 2,
    delay: s = (n) => new Promise((i) => setTimeout(i, n)),
  } = {}) {
    ((this.concurrency = t),
      (this.retries = e),
      (this.delay = s),
      (this.active = 0),
      (this.queue = []));
  }
  run(t, { priority: e = 0 } = {}) {
    let s,
      n = new Promise((i, a) => {
        ((s = { compile: t, resolve: i, reject: a, priority: e }),
          this.queue.push(s),
          this.drain());
      });
    return (
      (n.prioritize = (i) => {
        s.priority = Math.max(s.priority, i);
      }),
      n
    );
  }
  drain() {
    for (; this.active < this.concurrency && this.queue.length;) {
      this.queue.sort((e, s) => s.priority - e.priority);
      let t = this.queue.shift();
      (this.active++,
        this.compile(t.compile)
          .then(t.resolve, t.reject)
          .finally(() => {
            (this.active--, this.drain());
          }));
    }
  }
  async compile(t) {
    for (let e = 0; ; e++)
      try {
        return await t(e);
      } catch (s) {
        if (e >= this.retries || !m7(s)) throw s;
        await this.delay(1e3 * (e + 1));
      }
  }
};
var pzt = Math.PI * 2;
