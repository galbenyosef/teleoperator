// app 30 — math
// Lines 47087-47806 of readable/app.pretty.js (statement-aligned).
var yut = 7,
  wut = `
@group(0) @binding(4) var tDepth: DEPTH_T;
@group(1) @binding(0) var vRG: texture_2d<u32>;
@group(1) @binding(1) var vBA: texture_2d<u32>;
@group(1) @binding(2) var vD: texture_2d<f32>;
@group(1) @binding(3) var tLin: texture_2d<f32>;
@group(1) @binding(4) var tAcc: texture_2d<f32>;
@group(1) @binding(5) var tHaze: texture_2d<u32>;
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u)); return vec4f(p * 2.0 - 1.0, 0.0, 1.0);
}
fn volAt(q: vec2i) -> vec4f {
  return vec4f(unpack2x16float(textureLoad(vRG, q, 0).x), unpack2x16float(textureLoad(vBA, q, 0).x));
}
// half resolution -> full: bilinear, weighted by how well each texel's cut distance matches this pixel's depth
@fragment fn fsUp(@builtin(position) fp: vec4f) -> @location(0) vec4f {
  let ip = vec2i(fp.xy);
  let dist = depthDist(fp.xy, textureLoad(tDepth, ip, 0));
  let hp = fp.xy * 0.5 - 0.5; let h0 = vec2i(floor(hp)); let f = hp - floor(hp);
  let hmax = vec2i(G.half.xy) - 1;
  var acc = vec4f(0.0); var ws = 0.0;
  for (var k = 0; k < 4; k++) {
    let o = vec2i(k & 1, k >> 1); let q = clamp(h0 + o, vec2i(0), hmax);
    let wb = select(1.0 - f.x, f.x, o.x == 1) * select(1.0 - f.y, f.y, o.y == 1);
    let dq = textureLoad(vD, q, 0).r;
    let err = abs(dq - dist) / max(min(dist, dq), 1e-3);
    let w = (wb + 1e-3) / (1e-3 + err);
    acc += volAt(q) * w; ws += w;
  }
  return acc / ws;
}
// over the displayed (tone-mapped) image: exact where it shows the linear target, a sensible blend where it does not (glass)
fn hz1(q: vec2i) -> f32 { return unpack2x16float(textureLoad(tHaze, q, 0).x).y; }
fn hazeAt(fp: vec2f) -> f32 {   // bilinear from the half-resolution haze buffer
  let hp = fp * 0.5 - 0.5; let h0 = vec2i(floor(hp)); let f = hp - floor(hp); let hm = vec2i(G.half.xy) - 1;
  let a = hz1(clamp(h0, vec2i(0), hm)); let b = hz1(clamp(h0 + vec2i(1, 0), vec2i(0), hm));
  let c = hz1(clamp(h0 + vec2i(0, 1), vec2i(0), hm)); let d = hz1(clamp(h0 + vec2i(1, 1), vec2i(0), hm));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
@fragment fn fsDisp(@builtin(position) fp: vec4f) -> @location(0) vec4f {
  let ip = vec2i(fp.xy);
  let a = textureLoad(tAcc, ip, 0);
  let hz = hazeAt(fp.xy);
  if (hz > 0.02) {   // heat haze: what is behind hot air wobbles (a refracted lookup of the scene; replaces the pixel)
    let q = vec3f(fp.xy * G.screen.w * 3.0, G.time.x * 0.9) + vec3f(0.0, G.time.x * 0.55, 0.0);
    let n0 = textureSampleLevel(tDetail, sRep, q, 0.0).r; let nx = textureSampleLevel(tDetail, sRep, q + vec3f(0.02, 0.0, 0.0), 0.0).r;
    let ny = textureSampleLevel(tDetail, sRep, q + vec3f(0.0, 0.02, 0.0), 0.0).r;
    let off = vec2f(nx - n0, ny - n0) * 220.0 * min(hz, 1.0) * G.screen.y / 1080.0;
    let sp = clamp(vec2i(fp.xy + off), vec2i(0), vec2i(G.screen.xy) - 1);
    let lb = max(textureLoad(tLin, sp, 0).rgb, vec3f(0.0));
    return vec4f(present(lb * a.a + a.rgb).rgb, 0.0);
  }
  if (a.a > 0.9995 && max(a.r, max(a.g, a.b)) < 1e-6) { discard; }
  let lin = max(textureLoad(tLin, ip, 0).rgb, vec3f(0.0));
  let A = present(lin).rgb; let B = present(lin * a.a + a.rgb).rgb;
  return vec4f(max(B - A * a.a, vec3f(0.0)), a.a);
}
@fragment fn fsLin(@builtin(position) fp: vec4f) -> @location(0) vec4f {
  let a = textureLoad(tAcc, vec2i(fp.xy), 0);
  if (a.a > 0.9995 && max(a.r, max(a.g, a.b)) < 1e-6) { discard; }
  return a;
}
`,
  Mut = `
@group(0) @binding(4) var tDepth: DEPTH_T;
@group(1) @binding(0) var oRG: texture_storage_2d<r32uint, write>;
@group(1) @binding(1) var oBA: texture_storage_2d<r32uint, write>;
@group(1) @binding(2) var oD: texture_storage_2d<r32float, write>;
@group(1) @binding(3) var oRH: texture_storage_2d<r32uint, write>;
// clear the half-resolution volume buffer to (0, transmittance 1) and store each texel's ray cut: the farthest of its 2x2 depths
@compute @workgroup_size(8, 8) fn prep(@builtin(global_invocation_id) g: vec3u) {
  if (any(vec2f(g.xy) >= G.half.xy)) { return; }
  let full = vec2i(G.screen.xy) - 1;
  var dm = 0.0;
  for (var k = 0; k < 4; k++) {
    let p = min(vec2i(g.xy) * 2 + vec2i(k & 1, k >> 1), full);
    dm = max(dm, depthDist(vec2f(p) + 0.5, textureLoad(tDepth, p, 0)));
  }
  textureStore(oRG, g.xy, vec4u(pack2x16float(vec2f(0.0)), 0u, 0u, 0u));
  textureStore(oBA, g.xy, vec4u(pack2x16float(vec2f(0.0, 1.0)), 0u, 0u, 0u));
  textureStore(oD, g.xy, vec4f(dm, 0.0, 0.0, 0.0));
  textureStore(oRH, g.xy, vec4u(pack2x16float(vec2f(0.0)), 0u, 0u, 0u));
}
`,
  Sut = `
@group(0) @binding(0) var tR: texture_2d<u32>;
@vertex fn vsFull(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u)); return vec4f(p * 2.0 - 1.0, 0.0, 1.0);
}
@fragment fn fsReact(@builtin(position) fp: vec4f) -> @location(0) vec4f {
  let hd = vec2i(textureDimensions(tR)) - 1; let q = vec2i(fp.xy * 0.5);
  var r = 0.0;
  for (var k = 0; k < 4; k++) { r = max(r, unpack2x16float(textureLoad(tR, clamp(q + vec2i(k & 1, k >> 1) - 1, vec2i(0), hd), 0).x).x); }
  if (r < 0.004) { discard; }
  return vec4f(0.0, 0.0, 0.0, r);
}
`,
  $S = class {
    constructor(t, e) {
      ((this.r = t),
        (this.d = t.device),
        (this.prelude = e),
        (this.ms = t.samples > 1),
        (this.mobile = (t.maxBloomLevels ?? 8) < 6),
        (this.depthT = this.ms
          ? "texture_depth_multisampled_2d"
          : "texture_depth_2d"),
        (this.time = 0),
        (this.frameNo = 0),
        (this.dt = 1 / 60),
        (this._last = null),
        (this.ready = !1),
        (this.list = []),
        (this.box = new xi()),
        (this._v = new dt()),
        (this._m = new fe()),
        (this.whenReady = this._init().catch((s) => {
          console.warn("MindblownRenderer VFX: init failed", s);
        })));
    }
    wgsl(t) {
      return this.prelude + x7 + t.replaceAll("DEPTH_T", this.depthT);
    }
    module(t, e) {
      let s = this.d.createShaderModule({ code: t, label: e });
      return (
        s.getCompilationInfo?.().then((n) => {
          for (let i of n.messages)
            i.type === "error" &&
              console.error(`[${e}] ${i.lineNum}:${i.linePos} ${i.message}`);
        }),
        s
      );
    }
    async _init() {
      let t = this.d,
        e = this.r;
      ((this.gBuf = Cu(t, 96, K0.UNIFORM | K0.COPY_DST, "vfx-globals")),
        (this.vlBuf = Cu(
          t,
          96,
          K0.STORAGE | K0.COPY_DST | K0.COPY_SRC,
          "vfx-light",
        )),
        (this.ambDummy = Cu(t, 80, K0.STORAGE | K0.COPY_DST, "vfx-amb0")),
        (this.g = new Float32Array(24)),
        (this.vlRead = Cu(t, 96, K0.MAP_READ | K0.COPY_DST, "vfx-light-read")),
        (this.lightCPU = null),
        (this.sClamp = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          addressModeU: "clamp-to-edge",
          addressModeV: "clamp-to-edge",
          addressModeW: "clamp-to-edge",
        })),
        (this.sRep = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          mipmapFilter: "linear",
          addressModeU: "repeat",
          addressModeV: "repeat",
          addressModeW: "repeat",
        })),
        (this.tNoise = Sl(t, [128, 128, 128], "rgba8unorm", za.TB | za.SB, {
          dimension: "3d",
        })),
        (this.tDetail = Sl(t, [32, 32, 32], "rgba8unorm", za.TB | za.SB, {
          dimension: "3d",
        })));
      let s = this.module(
          b7 +
            `fn sat(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / (hi - lo); }`,
          "vfx-noise",
        ),
        [n, i] = await Promise.all(
          ["base", "detail"].map((x) =>
            t.createComputePipelineAsync({
              layout: "auto",
              compute: { module: s, entryPoint: x },
            }),
          ),
        );
      {
        let x = t.createCommandEncoder(),
          y = x.beginComputePass();
        (y.setPipeline(n),
          y.setBindGroup(
            0,
            t.createBindGroup({
              layout: n.getBindGroupLayout(0),
              entries: [{ binding: 0, resource: this.tNoise.createView() }],
            }),
          ),
          y.dispatchWorkgroups(32, 32, 32),
          y.setPipeline(i),
          y.setBindGroup(
            0,
            t.createBindGroup({
              layout: i.getBindGroupLayout(0),
              entries: [{ binding: 1, resource: this.tDetail.createView() }],
            }),
          ),
          y.dispatchWorkgroups(8, 8, 8),
          y.end(),
          t.queue.submit([x.finish()]));
      }
      ((this.tBB = Sl(t, [256, 1], "rgba16float", za.TB | za.CD)),
        t.queue.writeTexture(
          { texture: this.tBB },
          hV(cV(256)),
          { bytesPerRow: 256 * 8 },
          [256, 1],
        ));
      let a = (x, y) => ({ binding: x, visibility: yut, ...y }),
        r = [
          a(0, { buffer: {} }),
          a(2, { buffer: {} }),
          a(3, { buffer: { type: "read-only-storage" } }),
          a(5, { sampler: {} }),
          a(6, { sampler: {} }),
          a(7, { texture: { viewDimension: "3d" } }),
          a(8, { texture: { viewDimension: "3d" } }),
          a(9, { texture: {} }),
        ];
      ((this.gl0 = t.createBindGroupLayout({ entries: r, label: "vfx-g0" })),
        (this.gl1 = t.createBindGroupLayout({
          entries: [
            ...r,
            {
              binding: 4,
              visibility: 6,
              texture: { sampleType: "depth", multisampled: this.ms },
            },
          ],
          label: "vfx-g0-depth",
        })));
      let l = t.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: 4, buffer: {} },
          { binding: 2, visibility: 4, buffer: {} },
          { binding: 6, visibility: 4, sampler: {} },
        ],
      });
      ((this.lightLayout = t.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: 4, buffer: { type: "read-only-storage" } },
          { binding: 1, visibility: 4, buffer: { type: "storage" } },
          { binding: 2, visibility: 4, texture: { viewDimension: "2d-array" } },
        ],
      })),
        (this.glLGroup = k0(t, l, [
          [0, e.frameBuf],
          [2, this.gBuf],
          [6, this.sRep],
        ])),
        (this.ioLayout = t.createBindGroupLayout({
          entries: [
            {
              binding: 0,
              visibility: 4,
              storageTexture: { access: "read-write", format: "r32uint" },
            },
            {
              binding: 1,
              visibility: 4,
              storageTexture: { access: "read-write", format: "r32uint" },
            },
            {
              binding: 2,
              visibility: 4,
              texture: { sampleType: "unfilterable-float" },
            },
            {
              binding: 3,
              visibility: 4,
              storageTexture: { access: "read-write", format: "r32uint" },
            },
          ],
        })));
      let c = t.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: 4,
            storageTexture: { access: "write-only", format: "r32uint" },
          },
          {
            binding: 1,
            visibility: 4,
            storageTexture: { access: "write-only", format: "r32uint" },
          },
          {
            binding: 2,
            visibility: 4,
            storageTexture: { access: "write-only", format: "r32float" },
          },
          {
            binding: 3,
            visibility: 4,
            storageTexture: { access: "write-only", format: "r32uint" },
          },
        ],
      });
      ((this.prepLayout = c),
        (this.reactLayout = t.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: 2, texture: { sampleType: "uint" } },
          ],
        })));
      let h = this.module(Sut, "vfx-react"),
        f = { operation: "max", srcFactor: "one", dstFactor: "one" };
      t.createRenderPipelineAsync({
        layout: t.createPipelineLayout({
          bindGroupLayouts: [this.reactLayout],
        }),
        vertex: { module: h, entryPoint: "vsFull" },
        fragment: {
          module: h,
          entryPoint: "fsReact",
          targets: [
            {
              format: "rgba16float",
              writeMask: 8,
              blend: { color: f, alpha: f },
            },
          ],
        },
        primitive: { topology: "triangle-list" },
        depthStencil: {
          format: "depth24plus",
          depthWriteEnabled: !1,
          depthCompare: "always",
        },
      })
        .then((x) => (this.pReact = x))
        .catch((x) => console.warn("vfx react", x));
      let u = (x, y) => ({
        binding: x,
        visibility: 2,
        texture: { sampleType: y },
      });
      ((this.upLayout = t.createBindGroupLayout({
        entries: [u(0, "uint"), u(1, "uint"), u(2, "unfilterable-float")],
      })),
        (this.dispLayout = t.createBindGroupLayout({
          entries: [
            u(3, "unfilterable-float"),
            u(4, "unfilterable-float"),
            u(5, "uint"),
          ],
        })),
        (this.linLayout = t.createBindGroupLayout({
          entries: [u(4, "unfilterable-float")],
        })));
      let d = this.module(this.prelude + x7 + lV, "vfx-light"),
        p = this.module(this.wgsl(Mut), "vfx-prep"),
        m = this.module(this.wgsl(wut), "vfx-composite"),
        g = (...x) => t.createPipelineLayout({ bindGroupLayouts: x }),
        b = (x, y, M, S, w = 15) =>
          t.createRenderPipelineAsync({
            layout: g(this.gl1, y),
            vertex: { module: m, entryPoint: "vsFull" },
            fragment: {
              module: m,
              entryPoint: x,
              targets: [{ format: M, blend: S, writeMask: w }],
            },
            primitive: { topology: "triangle-list" },
          }),
        v = {
          color: { srcFactor: "one", dstFactor: "src-alpha" },
          alpha: { srcFactor: "zero", dstFactor: "one" },
        };
      (([this.pLight, this.pPrep, this.pUp, this.pDisp, this.pLin] =
        await Promise.all([
          t.createComputePipelineAsync({
            layout: g(l, this.lightLayout),
            compute: { module: d, entryPoint: "lightPrep" },
          }),
          t.createComputePipelineAsync({
            layout: g(this.gl1, c),
            compute: { module: p, entryPoint: "prep" },
          }),
          b("fsUp", this.upLayout, "rgba16float", void 0),
          b("fsDisp", this.dispLayout, e.format, v),
          b("fsLin", this.linLayout, "rgba16float", v, 7),
        ])),
        (this.ready = !0));
    }
    _groups(t) {
      let e = this.d,
        n = [
          [0, this.r.frameBuf],
          [2, this.gBuf],
          [3, this.vlBuf],
          [5, this.sClamp],
          [6, this.sRep],
          [7, this.tNoise.createView({ dimension: "3d" })],
          [8, this.tDetail.createView({ dimension: "3d" })],
          [9, this.tBB.createView()],
        ];
      (this.g0 || (this.g0 = k0(e, this.gl0, n)),
        t &&
          t !== this._depthView &&
          ((this._depthView = t), (this.g1 = k0(e, this.gl1, [...n, [4, t]]))));
    }
    _size(t, e) {
      if (this._W === t && this._H === e) return;
      let s = this.d;
      ((this._W = t), (this._H = e));
      for (let r of [this.acc, this.vRG, this.vBA, this.vD, this.vRH])
        r?.destroy();
      let n = Math.ceil(t / 2),
        i = Math.ceil(e / 2);
      ((this.hw = n),
        (this.hh = i),
        (this.acc = Sl(s, [t, e], "rgba16float", za.RA | za.TB)),
        (this.vRG = Sl(s, [n, i], "r32uint", za.SB | za.TB)),
        (this.vBA = Sl(s, [n, i], "r32uint", za.SB | za.TB)),
        (this.vD = Sl(s, [n, i], "r32float", za.SB | za.TB)),
        (this.vRH = Sl(s, [n, i], "r32uint", za.SB | za.TB)));
      let a = [
        [0, this.vRG.createView()],
        [1, this.vBA.createView()],
        [2, this.vD.createView()],
        [3, this.vRH.createView()],
      ];
      ((this.io = k0(s, this.ioLayout, a)),
        (this.prepGroup = k0(s, this.prepLayout, a)),
        (this.reactGroup = k0(s, this.reactLayout, [
          [0, this.vRH.createView()],
        ])),
        (this._comp = null));
    }
    frame(
      t,
      {
        camera: e,
        scene: s,
        sun: n,
        skyOcean: i,
        sky: a,
        W: r,
        H: l,
        envOn: c,
      },
    ) {
      let h = performance.now() / 1e3,
        f =
          this.r.vfxDt ??
          (this._last === null
            ? 1 / 60
            : Math.min(Math.max(h - this._last, 0), 1 / 20));
      ((this._last = h),
        (this.dt = f),
        (this.time += f),
        this.frameNo++,
        (this.camera = e),
        (this.scene = s),
        (this.skyOcean = i || null),
        this._size(r, l));
      let u = this.g,
        d = n.light;
      ((u[0] = this.time),
        (u[1] = f),
        (u[2] = this.frameNo),
        (u[3] = 0),
        (u[4] = r),
        (u[5] = l),
        (u[6] = 1 / r),
        (u[7] = 1 / l),
        (u[8] = this.hw),
        (u[9] = this.hh),
        (u[10] = 1 / this.hw),
        (u[11] = 1 / this.hh));
      let p = n.intensity || 0,
        m = d?.color || { r: 1, g: 1, b: 1 };
      ((u[12] = m.r * p),
        (u[13] = m.g * p),
        (u[14] = m.b * p),
        (u[15] = p > 0 ? 1 : 0),
        (u[16] = i ? 1 : 0),
        (u[17] = c
          ? this.r.environmentIntensity * (s.environmentIntensity ?? 1)
          : 0),
        (u[18] = 0),
        (u[19] = 0));
      let g = a?.material?.uniforms?.sunPosition?.value;
      ((this.sunDir = (this._sd ||= new dt())
        .copy(g && i ? g : n.dir)
        .normalize()),
        (this.sunOn = i && g ? this.sunDir.y > -0.04 : p > 0),
        (u[20] = this.sunDir.x),
        (u[21] = this.sunDir.y),
        (u[22] = this.sunDir.z),
        (u[23] = this.sunOn ? 1 : 0),
        this.d.queue.writeBuffer(this.gBuf, 0, u),
        (this.list = t));
      for (let b of t)
        b._sys ||
          ((b._sys = this),
          (b._setupPromise = Promise.resolve(b._setup?.(this)).catch((v) => {
            (console.warn("VFX setup failed", b, v), (b.enabled = !1));
          })));
      this.active = t.filter((b) => b._ready && b.enabled);
      for (let b of this.active)
        b._update?.(f * (b.timeScale ?? 1), this, { camera: e, scene: s });
    }
    _lightGroup(t, e) {
      let s = t;
      return this._lgKey === s && this._lgAmb === e
        ? this._lg
        : ((this._lgKey = s),
          (this._lgAmb = e),
          (this._lg = k0(this.d, this.lightLayout, [
            [0, e || this.ambDummy],
            [1, this.vlBuf],
            [2, t.createView({ dimension: "2d-array" })],
          ])));
    }
    simulate(t, { envTex: e, timestampWrites: s }) {
      (this._groups(null), (this.envTex = e));
      let n = t.beginComputePass(s ? { timestampWrites: s } : {});
      (n.setPipeline(this.pLight),
        n.setBindGroup(0, this.glLGroup),
        n.setBindGroup(1, this._lightGroup(e, this.skyOcean?.amb)),
        n.dispatchWorkgroups(1));
      for (let i of this.active) i._simulate && i._simulate(n, this);
      n.end();
      for (let i of this.active) (i._afterSim?.(t), i._prepass?.(t, this));
      !this._vlBusy &&
        this.frameNo % 16 === 4 &&
        (t.copyBufferToBuffer(this.vlBuf, 0, this.vlRead, 0, 96),
        (this._vlPending = !0));
    }
    afterSubmit() {
      for (let t of this.active || []) t._afterSubmit?.();
      this._vlPending &&
        ((this._vlPending = !1),
        (this._vlBusy = !0),
        this.vlRead
          .mapAsync(GPUMapMode.READ)
          .then(() => {
            let t = new Float32Array(this.vlRead.getMappedRange().slice(0));
            (this.vlRead.unmap(),
              (this._vlBusy = !1),
              (this.lightCPU = {
                sunIrr: [t[0], t[1], t[2]],
                skyIrr: [t[4], t[5], t[6]],
                groundIrr: [t[8], t[9], t[10]],
                sunDir: [t[12], t[13], t[14]],
                horizon: [t[16], t[17], t[18]],
              }));
          })
          .catch(() => {
            this._vlBusy = !1;
          }));
    }
    drawOpaque(t) {
      for (let e of this.active) e._drawOpaque && e._drawOpaque(t, this);
    }
    get hasPost() {
      return (
        this.ready && this.active?.some((t) => t._march || t._drawParticles)
      );
    }
    rect(t) {
      let e = this.camera,
        s = this._v,
        n = this._m.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        i = 1e9,
        a = 1e9,
        r = -1e9,
        l = -1e9;
      for (let m = 0; m < 8; m++) {
        if (
          (s.set(
            m & 1 ? t.max.x : t.min.x,
            m & 2 ? t.max.y : t.min.y,
            m & 4 ? t.max.z : t.min.z,
          ),
          n.elements[3] * s.x +
            n.elements[7] * s.y +
            n.elements[11] * s.z +
            n.elements[15] <=
            1e-4)
        )
          return [0, 0, this._W, this._H];
        (s.applyMatrix4(n),
          (i = Math.min(i, s.x)),
          (r = Math.max(r, s.x)),
          (a = Math.min(a, s.y)),
          (l = Math.max(l, s.y)));
      }
      if (r < -1 || i > 1 || l < -1 || a > 1) return null;
      let c = this._W,
        h = this._H,
        f = Math.max(0, Math.floor((i * 0.5 + 0.5) * c) - 2),
        u = Math.min(c, Math.ceil((r * 0.5 + 0.5) * c) + 2),
        d = Math.max(0, Math.floor((0.5 - l * 0.5) * h) - 2),
        p = Math.min(h, Math.ceil((0.5 - a * 0.5) * h) + 2);
      return u <= f || p <= d ? null : [f, d, u - f, p - d];
    }
    drawReactive(t) {
      !this.pReact ||
        !this.reactGroup ||
        !this._reactOn ||
        (t.setPipeline(this.pReact),
        t.setBindGroup(0, this.reactGroup),
        t.draw(3));
    }
    post(t, { depthView: e, linTex: s, linView: n, displayView: i, span: a }) {
      if (!this.hasPost) return;
      let r = this.d;
      this._groups(e);
      let l = [],
        c = [],
        h = null,
        f = (g) => {
          g &&
            (h
              ? ((h[0] = Math.min(h[0], g[0])),
                (h[1] = Math.min(h[1], g[1])),
                (h[2] = Math.max(h[2], g[0] + g[2])),
                (h[3] = Math.max(h[3], g[1] + g[3])))
              : (h = [g[0], g[1], g[0] + g[2], g[1] + g[3]]));
        },
        u = this.camera.getWorldPosition(this._v).clone();
      for (let g of this.active) {
        let b = g._screenBox?.(this),
          v = b ? this.rect(b) : [0, 0, this._W, this._H];
        v &&
          (g._march &&
            l.push({ o: g, rc: v, dist: b ? b.distanceToPoint(u) : 0 }),
          g._drawParticles && c.push(g),
          f(v));
      }
      if (!h) return;
      let d = [h[0], h[1], h[2] - h[0], h[3] - h[1]];
      if (
        ((this._reactOn = l.some((g) => (g.o.reactive ?? 0) > 0)), l.length)
      ) {
        l.sort((b, v) => b.dist - v.dist);
        let g = t.beginComputePass(
          a ? { timestampWrites: a("vfx volumes") } : {},
        );
        (g.setPipeline(this.pPrep),
          g.setBindGroup(0, this.g1),
          g.setBindGroup(1, this.prepGroup),
          g.dispatchWorkgroups(Math.ceil(this.hw / 8), Math.ceil(this.hh / 8)));
        for (let b of l) {
          let v = [
            Math.floor(b.rc[0] / 2),
            Math.floor(b.rc[1] / 2),
            Math.ceil(b.rc[2] / 2) + 1,
            Math.ceil(b.rc[3] / 2) + 1,
          ];
          b.o._march(g, this, v);
        }
        g.end();
      }
      this._comp ||
        (this._comp = {
          up: k0(r, this.upLayout, [
            [0, this.vRG.createView()],
            [1, this.vBA.createView()],
            [2, this.vD.createView()],
          ]),
          lin: k0(r, this.linLayout, [[4, this.acc.createView()]]),
          disp: new Map(),
        });
      let p = this._comp.disp.get(s);
      p ||
        ((p = k0(r, this.dispLayout, [
          [3, s.createView()],
          [4, this.acc.createView()],
          [5, this.vRH.createView()],
        ])),
        this._comp.disp.set(s, p));
      let m = (g) => g.setScissorRect(d[0], d[1], d[2], d[3]);
      {
        let g = t.beginRenderPass({
          colorAttachments: [
            {
              view: this.acc.createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 1 },
            },
          ],
          timestampWrites: a ? a("vfx particles") : void 0,
        });
        (m(g),
          l.length &&
            (g.setPipeline(this.pUp),
            g.setBindGroup(0, this.g1),
            g.setBindGroup(1, this._comp.up),
            g.draw(3)));
        for (let b of c) b._drawParticles(g, this);
        g.end();
      }
      for (let [g, b, v, x] of [
        [this.pDisp, i, "vfx composite", p],
        [this.pLin, n, null, this._comp.lin],
      ]) {
        let y = t.beginRenderPass({
          colorAttachments: [{ view: b, loadOp: "load", storeOp: "store" }],
          timestampWrites: a && v ? a(v, !0, !1) : a ? a(null, !1, !0) : void 0,
        });
        (m(y),
          y.setPipeline(g),
          y.setBindGroup(0, this.g1),
          y.setBindGroup(1, x),
          y.draw(3),
          y.end());
      }
    }
  };
