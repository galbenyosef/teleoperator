// app 43 — math
// Lines 51077-59191 of readable/app.pretty.js (statement-aligned).
var Z6 = class i {
  constructor({
    canvas: t = document.createElement("canvas"),
    antialias: e = !0,
    mlp: s = "inline",
    f16: n = !1,
    autoInit: o = !1,
    depthPrepass: a = !0,
    cullBackFaces: r = !1,
    planarMips: l = 99,
    bloomLevels: c = 6,
    powerPreference: h = "default",
  } = {}) {
    ((this.isMindblownRenderer = !0),
      (this.powerPreference = h),
      i._composerPatched ||
        (i._composerPatched = Promise.resolve()
          .then(() => (kU(), SU))
          .then((u) => kct(u.EffectComposer))
          .catch(() => {})),
      (this.coordinateSystem = Pr),
      (this.domElement = t),
      (this.shadowMap = {
        enabled: !0,
        autoUpdate: !0,
        needsUpdate: !1,
        type: 1,
      }),
      (this.toneMapping = 0),
      (this.outputColorSpace = "srgb"),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.capabilities = {
        isWebGL2: !0,
        maxTextures: 16,
        maxAnisotropy: 8,
        precision: "highp",
        logarithmicDepthBuffer: !1,
        maxSamples: 4,
        maxTextureSize: 8192,
        maxCubemapSize: 4096,
        getMaxAnisotropy: () => 8,
        getMaxPrecision: () => "highp",
      }),
      (this._target = null),
      (this.extensions = { get: () => null, has: () => !1, init() {} }));
    let f = {
      setTest() {},
      setMask() {},
      setFunc() {},
      setClear() {},
      setLocked() {},
      reset() {},
      getReversed: () => !1,
      setReversed() {},
    };
    ((this.state = {
      buffers: { color: f, depth: f, stencil: f },
      reset() {},
      enable() {},
      disable() {},
      setBlending() {},
      viewport() {},
      scissor() {},
    }),
      (this.properties = {
        get: () => ({}),
        remove() {},
        update() {},
        dispose() {},
      }),
      (this.xr = {
        enabled: !1,
        isPresenting: !1,
        addEventListener() {},
        removeEventListener() {},
        setSession: async () => {},
        getSession: () => null,
        setReferenceSpaceType() {},
        getReferenceSpace: () => null,
        getController: () => new ke(),
        getControllerGrip: () => new ke(),
        getHand: () => new ke(),
        getCamera: () => new Di(),
        setAnimationLoop() {},
        updateCamera() {},
      }),
      (this.fxaa = e === "fxaa" || e === !0),
      (this.samples = e === "msaa" ? rct : 1),
      (this.mlpMode = s),
      (this.wantF16 = n),
      (this.depthPrepass = a),
      (this.maxPlanarMips = l),
      (this.maxBloomLevels = c),
      (this.cullBack = r),
      (this.bloom = 0),
      (this.vignette = 0),
      (this.toneMappingExposure = 1),
      (this.environmentIntensity = 1),
      (this.backgroundIntensity = 1),
      (this.pixelRatio = 1),
      (this.width = t.width),
      (this.height = t.height),
      (this.info = {
        render: { calls: 0, triangles: 0, frame: 0, points: 0, lines: 0 },
        memory: { geometries: 0, textures: 0 },
        autoReset: !0,
        reset() {},
        gpuTimeMs: 0,
        compileMs: 0,
        neuralReadyMs: 0,
        relit: !1,
        lights: 0,
      }),
      (this.neural = null),
      (this._geo = new Map()),
      (this._frustum = new No()),
      (this._m = new ye()),
      (this._vp = new ye()),
      (this._nm = new ye()),
      (this._sphere = new _n()),
      (this._v = new xt()),
      (this._v2 = new xt()),
      (this._lightVP = new ye()),
      (this._refl = new ye()),
      (this._vpR = new ye()),
      (this._prevVP = null),
      (this._shadowHalf = 3.8),
      (this._lightCam = new Lr(-3.8, 3.8, 3.8, -3.8, 0.5, 30)),
      (this._spotCam = new Di(60, 1, 0.05, 30)),
      (this._shadowCenter = new xt(0.15, 0.2, -0.25)),
      (this._staticSunKey = null),
      (this._staticSpotKey = null),
      (this._objData = new Float32Array((Rg * Ya) / 4)),
      (this._frameData = new Float32Array(Ag / 4)),
      (this._frameRefl = new Float32Array(Ag / 4)),
      (this._frameSpot = new Float32Array(Ag / 4)),
      (this._lightData = new Float32Array(EU / 4)),
      (this._boneData = new Float32Array(Pg * 16)),
      (this._boneDataPrev = new Float32Array(Pg * 16)),
      (this._spots = []),
      (this._cur = 0),
      (this._fallbackOk = o || arguments[0]?.fallback === !0),
      o && (this.ready = this.init().catch((u) => this._useFallback(u))));
  }
  getContext() {
    return {
      getExtension: () => null,
      getParameter: () => "WebGPU (Mindblown)",
      isContextLost: () => !1,
    };
  }
  setRenderTarget(t, e, s) {
    ((this._target = t), this._fallback?.setRenderTarget(t, e, s));
  }
  getRenderTarget() {
    return this._target;
  }
  _useFallback(t) {
    if (!this._fallbackOk || this._fallback) throw t;
    console.warn(
      "MindblownRenderer: WebGPU unavailable, drawing with THREE.WebGLRenderer instead:",
      t?.message || t,
    );
    let e = i.fallbackClass || zg;
    if (e === i || e.prototype instanceof i) throw t;
    let s = (this._fallback = new e({
      canvas: this.domElement,
      antialias: this.samples > 1 || this.fxaa,
      powerPreference: this.powerPreference,
    }));
    (s.setPixelRatio(this.pixelRatio),
      s.setSize(this.width, this.height, !1),
      (this.capabilities = s.capabilities),
      (this.extensions = s.extensions),
      (this.state = s.state),
      (this.properties = s.properties),
      (this._pmrem = new Map()));
  }
  _renderFallback(t, e) {
    let s = this._fallback;
    ((s.toneMapping = this.toneMapping ?? 0),
      (s.toneMappingExposure = this.toneMappingExposure),
      (s.outputColorSpace = this.outputColorSpace),
      (s.shadowMap.enabled = this.shadowMap.enabled),
      (s.shadowMap.type = this.shadowMap.type ?? s.shadowMap.type),
      (s.autoClear = this.autoClear !== !1),
      this._clearColor &&
        s.setClearColor(this._clearColor, this._clearAlpha ?? 1),
      this._viewport && s.setViewport(...this._viewport),
      this._scissor && s.setScissor(...this._scissor),
      s.setScissorTest(!!this._scissorTest));
    let n = (r) => {
        let l = r?.userData?.mbEnv;
        if (!l) return r;
        let c = this._pmrem.get(r);
        if (!c) {
          let h = new _d(s);
          ((h._mbFallback = !0),
            (c = (
              l.scene
                ? h.fromScene(l.scene)
                : l.cube
                  ? h.fromCubemap(l.cube)
                  : h.fromEquirectangular(l.equirect)
            ).texture),
            this._pmrem.set(r, c));
        }
        return c;
      },
      o = t.environment,
      a = t.background;
    (o?.userData?.mbEnv && (t.environment = n(o)),
      a?.userData?.mbEnv && (t.background = n(a)),
      s.render(t, e),
      (t.environment = o),
      (t.background = a),
      (this.info.render = s.info.render));
  }
  getDrawingBufferSize(t = new Re()) {
    return t.set(
      Math.floor(this.width * this.pixelRatio),
      Math.floor(this.height * this.pixelRatio),
    );
  }
  setClearColor(t, e) {
    ((this._clearColor ||= new $t(0, 0, 0)).set(t),
      e !== void 0 && (this._clearAlpha = e));
  }
  getClearColor(t) {
    return t.copy(this._clearColor || new $t(0, 0, 0));
  }
  clear() {}
  resetState() {}
  initTexture(t) {
    this.device && this._texture(t);
  }
  compile() {}
  setEffects(t) {
    this._effects = t || [];
    let e = this._effects.find(
      (s) => s && s.strength !== void 0 && s.radius !== void 0,
    );
    this.bloom = e ? Math.min(e.strength, 2) * 0.25 : 0;
  }
  setAnimationLoop(t) {
    if (((this._loopCb = t), t && !this._raf)) {
      let e = (s) => {
        ((this._raf = requestAnimationFrame(e)), this._loopCb?.(s));
      };
      this._raf = requestAnimationFrame(e);
    } else
      !t && this._raf && (cancelAnimationFrame(this._raf), (this._raf = null));
  }
  getClearAlpha() {
    return this._clearAlpha ?? 1;
  }
  setClearAlpha(t) {
    this._clearAlpha = t;
  }
  setViewport(t, e, s, n) {
    this._viewport = t?.isVector4 ? [t.x, t.y, t.z, t.w] : [t, e, s, n];
  }
  setScissor(t, e, s, n) {
    this._scissor = t?.isVector4 ? [t.x, t.y, t.z, t.w] : [t, e, s, n];
  }
  setScissorTest(t) {
    this._scissorTest = !!t;
  }
  getScissorTest() {
    return !!this._scissorTest;
  }
  getScissor(t = new fi()) {
    return this._scissor
      ? t.fromArray(this._scissor)
      : t.set(0, 0, this.width, this.height);
  }
  getViewport(t = new fi()) {
    return this._viewport
      ? t.fromArray(this._viewport)
      : t.set(0, 0, this.width, this.height);
  }
  setOpaqueSort() {}
  setTransparentSort() {}
  forceContextLoss() {}
  forceContextRestore() {}
  readRenderTargetPixels() {}
  copyFramebufferToTexture() {}
  copyTextureToTexture() {}
  clearDepth() {}
  clearColor() {}
  clearStencil() {}
  getActiveCubeFace() {
    return 0;
  }
  getActiveMipmapLevel() {
    return 0;
  }
  async init() {
    if (!navigator.gpu) throw new Error("WebGPU not available");
    let t = null,
      e = null;
    for (let m = 0; m < 6 && !this.device; m++) {
      m && (await new Promise((S) => setTimeout(S, 150 * m)));
      let g =
        !m && this.powerPreference === "high-performance" && globalThis.SF_GPU
          ? await globalThis.SF_GPU
          : null;
      if (((globalThis.SF_GPU = null), g?.device)) {
        ((t = g.adapter),
          (this.device = g.device),
          (this.fullMat = g.texLimit >= 31 && this.fullMaterials !== !1));
        break;
      }
      let b =
        this.powerPreference === "high-performance" ||
        this.powerPreference === "low-power"
          ? { powerPreference: this.powerPreference }
          : {};
      if (
        ((t = await navigator.gpu
          .requestAdapter(b)
          .catch((S) => ((e = S), null))),
        !t)
      )
        continue;
      let x = m === 1 || m >= 3,
        v = m >= 2,
        y = x
          ? []
          : ["timestamp-query", "shader-f16"].filter((S) => t.features.has(S)),
        M = v
          ? 16
          : Math.min(t.limits.maxSampledTexturesPerShaderStage || 16, 32);
      ((this.device = await t
        .requestDevice({
          requiredFeatures: y,
          requiredLimits: M > 16 ? { maxSampledTexturesPerShaderStage: M } : {},
        })
        .catch((S) => ((e = S), null))),
        (this.fullMat = !!this.device && M >= 31 && this.fullMaterials !== !1));
    }
    if (!this.device) throw e || new Error("No WebGPU adapter");
    let s = performance.now();
    ((this.info.bundleCompatibility = await xU(this.device)),
      (this.info.bundleCompatibility.ms = performance.now() - s),
      this.info.bundleCompatibility.safe || (this.renderBundles = !1),
      (this.adapterInfo = t.info || {}),
      (this.hasTimestamps = this.device.features.has("timestamp-query")),
      (this.ctx = this.domElement.getContext("webgpu")),
      (this.format = navigator.gpu.getPreferredCanvasFormat()),
      this.ctx.configure({
        device: this.device,
        format: this.format,
        alphaMode: "opaque",
      }));
    let n = this.device,
      o = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      a = (m = Ag) => n.createBuffer({ size: m, usage: o });
    ((this.frameBuf = a()),
      (this.frameBufRefl = a()),
      (this.frameBufSpot = Array.from({ length: J6 }, () => a())),
      (this.boneBuf = a(Pg * 64)),
      (this.boneBufPrev = a(Pg * 64)),
      (this.lightBuf = a(EU)),
      (this.clusterBuf = n.createBuffer({
        size: zc.x * zc.y * zc.z * (zc.max + 1) * 4,
        usage: GPUBufferUsage.STORAGE,
      })),
      (this.objBuf = n.createBuffer({ size: Rg * Ya, usage: o })));
    let r = GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      l = GPUShaderStage.FRAGMENT,
      c = GPUShaderStage.COMPUTE;
    ((this.frameLayout = n.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: r, buffer: {} },
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: {} },
        { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: {} },
      ],
    })),
      (this.objLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: r, buffer: { hasDynamicOffset: !0 } },
        ],
      })));
    let h = { sampleType: "float", viewDimension: "2d-array" };
    ((Cg =
      !this.fullMat &&
      this.skyBuffer !== !1 &&
      (n.limits.maxStorageBuffersPerShaderStage | 0) >= 4),
      (this._skyBuf0 = Cg
        ? n.createBuffer({
            size: 16,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            label: "sky-field-none",
          })
        : null),
      (Lg =
        this.sunBuffer !== !1 &&
        (n.limits.maxStorageBuffersPerShaderStage | 0) >= 4),
      (this._sunBuf0 = Lg
        ? n.createBuffer({
            size: 32,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            label: "sun-field-none",
          })
        : null),
      (this.envLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: l, texture: h },
          { binding: 1, visibility: l, sampler: {} },
          { binding: 2, visibility: l, texture: h },
          { binding: 3, visibility: l, sampler: {} },
          { binding: 4, visibility: l, texture: { sampleType: "float" } },
          { binding: 5, visibility: l, texture: { sampleType: "depth" } },
          { binding: 6, visibility: l, texture: { sampleType: "depth" } },
          { binding: 7, visibility: l, sampler: { type: "comparison" } },
          { binding: 8, visibility: l, texture: { sampleType: "float" } },
          { binding: 9, visibility: l, texture: { sampleType: "float" } },
          { binding: 10, visibility: l, sampler: {} },
          { binding: 11, visibility: l, buffer: {} },
          { binding: 12, visibility: l, buffer: { type: "read-only-storage" } },
          { binding: 13, visibility: l, texture: { sampleType: "depth" } },
          { binding: 14, visibility: l, texture: { sampleType: "depth" } },
          { binding: 15, visibility: l, texture: { sampleType: "float" } },
          {
            binding: 16,
            visibility: l,
            texture: {
              sampleType: "unfilterable-float",
              viewDimension: "2d-array",
            },
          },
          ...(Cg
            ? [
                {
                  binding: 22,
                  visibility: l,
                  buffer: { type: "read-only-storage" },
                },
              ]
            : []),
          ...(Lg
            ? [
                {
                  binding: 23,
                  visibility: l,
                  buffer: { type: "read-only-storage" },
                },
              ]
            : []),
          ...(this.fullMat
            ? [
                {
                  binding: 17,
                  visibility: l,
                  texture: { sampleType: "depth", viewDimension: "2d-array" },
                },
                {
                  binding: 18,
                  visibility: l,
                  texture: { sampleType: "float", viewDimension: "2d-array" },
                },
                {
                  binding: 19,
                  visibility: l,
                  texture: { sampleType: "float" },
                },
                {
                  binding: 20,
                  visibility: l,
                  texture: { sampleType: "float" },
                },
                {
                  binding: 21,
                  visibility: l,
                  texture: { sampleType: "depth" },
                },
              ]
            : []),
        ],
      })),
      (Rd = this.fullMat),
      (this.mipLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: l, texture: { sampleType: "float" } },
          { binding: 1, visibility: l, sampler: {} },
        ],
      })),
      (this.bloomLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: l, texture: { sampleType: "float" } },
          { binding: 1, visibility: l, sampler: {} },
          { binding: 2, visibility: l, buffer: {} },
        ],
      })),
      (this.bloomBuf = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })));
    {
      let m = n.createShaderModule({ code: UU, label: "bloom" }),
        g = n.createPipelineLayout({ bindGroupLayouts: [this.bloomLayout] });
      ((this.pBloomUp = n.createRenderPipeline({
        label: "bloom-up",
        layout: g,
        vertex: { module: m, entryPoint: "vs" },
        fragment: {
          module: m,
          entryPoint: "fsUp",
          targets: [
            {
              format: "rgba16float",
              blend: {
                color: { srcFactor: "one", dstFactor: "one" },
                alpha: { srcFactor: "one", dstFactor: "one" },
              },
            },
          ],
        },
      })),
        (this.pBloomComp = n.createRenderPipeline({
          label: "bloom-comp",
          layout: g,
          vertex: { module: m, entryPoint: "vs" },
          fragment: {
            module: m,
            entryPoint: "fsComp",
            targets: [
              {
                format: this.format,
                blend: {
                  color: { srcFactor: "one", dstFactor: "src-alpha" },
                  alpha: { srcFactor: "zero", dstFactor: "one" },
                },
              },
            ],
          },
        })));
    }
    {
      let m = n.createShaderModule({
          label: "clear-rect",
          code: `
        @group(0) @binding(0) var<uniform> CC: vec4f;
        struct O2 { @location(0) c: vec4f, @location(1) l: vec4f };
        @vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
          return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0); }
        @fragment fn fs() -> O2 { return O2(CC, vec4f(0.0)); }`,
        }),
        g = n.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: {} },
          ],
        });
      ((this.clearBuf = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })),
        (this.clearGroup = n.createBindGroup({
          layout: g,
          entries: [{ binding: 0, resource: { buffer: this.clearBuf } }],
        })),
        (this.pClear = n.createRenderPipeline({
          label: "clear-rect",
          layout: n.createPipelineLayout({ bindGroupLayouts: [g] }),
          vertex: { module: m, entryPoint: "vs" },
          fragment: {
            module: m,
            entryPoint: "fs",
            targets: [{ format: this.format }, { format: "rgba16float" }],
          },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "always",
          },
          multisample: { count: this.samples },
        })));
    }
    ((this.postLayout = n.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.COMPUTE,
          texture: { sampleType: "float" },
        },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, sampler: {} },
        {
          binding: 2,
          visibility: GPUShaderStage.COMPUTE,
          storageTexture: { access: "write-only", format: "rgba16float" },
        },
        {
          binding: 3,
          visibility: GPUShaderStage.COMPUTE,
          texture: { sampleType: "float" },
        },
        { binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: {} },
      ],
    })),
      (this.postBuf = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })),
      (this.hotLayout = n.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE,
            texture: { sampleType: "float" },
          },
          {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: "storage" },
          },
        ],
      })),
      (this.pHot = n.createComputePipeline({
        label: "glare-hot",
        layout: n.createPipelineLayout({ bindGroupLayouts: [this.hotLayout] }),
        compute: {
          entryPoint: "hot",
          module: n.createShaderModule({
            label: "glare-hot",
            code: `
        @group(0) @binding(0) var src: texture_2d<f32>;
        @group(0) @binding(1) var<storage, read_write> cnt: atomic<u32>;
        var<workgroup> any: atomic<u32>;
        @compute @workgroup_size(8, 8) fn hot(@builtin(global_invocation_id) g: vec3u, @builtin(local_invocation_index) li: u32) {
          let d = textureDimensions(src);
          if (all(g.xy < d)) { let c = textureLoad(src, g.xy, 0).rgb; if (max(c.r, max(c.g, c.b)) > 0.02) { atomicStore(&any, 1u); } }
          workgroupBarrier();
          if (li == 0u && atomicLoad(&any) != 0u) { atomicAdd(&cnt, 1u); }
        }`,
          }),
        },
      })),
      (this._hotBuf = n.createBuffer({
        size: 4,
        usage:
          GPUBufferUsage.STORAGE |
          GPUBufferUsage.COPY_SRC |
          GPUBufferUsage.COPY_DST,
      })),
      (this._hotRb = [0, 1, 2].map(() => ({
        buf: n.createBuffer({
          size: 4,
          usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
        }),
        busy: !1,
      }))));
    {
      let m = n.createShaderModule({ code: xct, label: "post-cs" }),
        g = n.createPipelineLayout({ bindGroupLayouts: [this.postLayout] });
      ((this.pDownCS = n.createComputePipeline({
        label: "down-cs",
        layout: g,
        compute: { module: m, entryPoint: "down" },
      })),
        (this.pDownTCS = n.createComputePipeline({
          label: "downT-cs",
          layout: g,
          compute: { module: m, entryPoint: "downT" },
        })),
        (this.pDown13CS = n.createComputePipeline({
          label: "down13-cs",
          layout: g,
          compute: { module: m, entryPoint: "down13" },
        })),
        (this.pUpCS = n.createComputePipeline({
          label: "up-cs",
          layout: g,
          compute: { module: m, entryPoint: "up" },
        })));
    }
    if (
      ((this.finalLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: l, texture: { sampleType: "float" } },
          { binding: 1, visibility: l, sampler: {} },
          { binding: 2, visibility: l, buffer: {} },
          { binding: 3, visibility: l, texture: { sampleType: "float" } },
          { binding: 4, visibility: l, texture: { sampleType: "depth" } },
          {
            binding: 5,
            visibility: l,
            texture: { sampleType: "unfilterable-float" },
          },
          { binding: 6, visibility: l, buffer: {} },
        ],
      })),
      (this._fbuf = n.createBuffer({
        size: 256,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })),
      (this._dummyDepth = n.createTexture({
        size: [1, 1],
        format: "depth24plus",
        usage:
          GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT,
      })),
      this.fxaa)
    ) {
      let m = n.createShaderModule({ code: wct, label: "final" });
      ((this.pFinal = n.createRenderPipeline({
        label: "final-fxaa",
        layout: n.createPipelineLayout({
          bindGroupLayouts: [this.finalLayout],
        }),
        vertex: { module: m, entryPoint: "vs" },
        fragment: {
          module: m,
          entryPoint: "fsFinal",
          targets: [{ format: this.format }],
        },
      })),
        (this.pFinalT = n.createRenderPipeline({
          label: "final-taa",
          layout: n.createPipelineLayout({
            bindGroupLayouts: [this.finalLayout],
          }),
          vertex: { module: m, entryPoint: "vs" },
          fragment: {
            module: m,
            entryPoint: "fsFinalT",
            targets: [{ format: this.format }],
          },
        })),
        (this.taaLayout = n.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: l, texture: { sampleType: "float" } },
            { binding: 1, visibility: l, texture: { sampleType: "float" } },
            { binding: 2, visibility: l, texture: { sampleType: "depth" } },
            { binding: 3, visibility: l, sampler: {} },
            { binding: 4, visibility: l, buffer: {} },
            {
              binding: 5,
              visibility: l,
              texture: { sampleType: "unfilterable-float" },
            },
          ],
        })));
      {
        let b = n.createShaderModule({ code: Mct, label: "upscale" });
        ((this.upLayout = n.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: l, texture: { sampleType: "float" } },
            { binding: 1, visibility: l, buffer: {} },
          ],
        })),
          (this.pUp = n.createRenderPipeline({
            label: "upscale",
            layout: n.createPipelineLayout({
              bindGroupLayouts: [this.upLayout],
            }),
            vertex: { module: b, entryPoint: "vs" },
            fragment: {
              module: b,
              entryPoint: "fsUp",
              targets: [{ format: this.format }],
            },
          })),
          (this._upBuf = n.createBuffer({
            size: 16,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
          })));
      }
      let g = n.createShaderModule({ code: Sct, label: "taa" });
      ((this.pTAA = n.createRenderPipeline({
        label: "taa",
        layout: n.createPipelineLayout({ bindGroupLayouts: [this.taaLayout] }),
        vertex: { module: g, entryPoint: "vs" },
        fragment: {
          module: g,
          entryPoint: "fsTAA",
          targets: [{ format: this.format }],
        },
      })),
        (this.taaBuf = n.createBuffer({
          size: 160,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })),
        (this.clampSampler = n.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          addressModeU: "clamp-to-edge",
          addressModeV: "clamp-to-edge",
        })));
    }
    ((this.dynLayout = n.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: c,
          texture: { sampleType: "float", viewDimension: "2d-array" },
        },
        { binding: 1, visibility: c, sampler: {} },
        { binding: 2, visibility: c, buffer: {} },
        {
          binding: 3,
          visibility: c,
          storageTexture: { access: "write-only", format: "rgba16float" },
        },
      ],
    })),
      n
        .createComputePipelineAsync({
          label: "dyn-prefilter",
          layout: n.createPipelineLayout({
            bindGroupLayouts: [this.dynLayout],
          }),
          compute: {
            module: n.createShaderModule({ code: vct, label: "dyn" }),
            entryPoint: "prefilter",
          },
        })
        .then((m) => (this.pDynPrefilter = m))
        .catch((m) => console.warn(m)),
      (this.envPreLayout = n.createBindGroupLayout({
        entries: [
          { binding: 0, visibility: c, texture: { sampleType: "float" } },
          {
            binding: 1,
            visibility: c,
            texture: { sampleType: "float", viewDimension: "2d-array" },
          },
          { binding: 2, visibility: c, sampler: {} },
          { binding: 3, visibility: c, buffer: {} },
          {
            binding: 4,
            visibility: c,
            storageTexture: { access: "write-only", format: "rgba16float" },
          },
        ],
      })));
    {
      let m = n.createShaderModule({ code: yct, label: "envpre" }),
        g = n.createPipelineLayout({ bindGroupLayouts: [this.envPreLayout] });
      (n
        .createComputePipelineAsync({
          label: "env-eq",
          layout: g,
          compute: { module: m, entryPoint: "fromEq" },
        })
        .then((b) => (this.pEnvEq = b))
        .catch((b) => console.warn(b)),
        n
          .createComputePipelineAsync({
            label: "env-cube",
            layout: g,
            compute: { module: m, entryPoint: "fromCube" },
          })
          .then((b) => (this.pEnvCube = b))
          .catch((b) => console.warn(b)));
    }
    this.clusterLayout = n.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: c, buffer: {} },
        { binding: 1, visibility: c, buffer: {} },
        { binding: 2, visibility: c, buffer: { type: "storage" } },
      ],
    });
    let f = (m) =>
      n.createBindGroup({
        layout: this.frameLayout,
        entries: [
          { binding: 0, resource: { buffer: m } },
          { binding: 1, resource: { buffer: this.boneBuf } },
          { binding: 2, resource: { buffer: this.boneBufPrev } },
        ],
      });
    ((this.frameGroup = f(this.frameBuf)),
      (this.frameGroupRefl = f(this.frameBufRefl)),
      (this.frameBufDyn = a()),
      (this.frameGroupDyn = f(this.frameBufDyn)),
      (this.frameGroupSpot = this.frameBufSpot.map(f)),
      (this.objGroup = n.createBindGroup({
        layout: this.objLayout,
        entries: [{ binding: 0, resource: { buffer: this.objBuf, size: Ya } }],
      })),
      (this.clusterGroup = n.createBindGroup({
        layout: this.clusterLayout,
        entries: [
          { binding: 0, resource: { buffer: this.frameBuf } },
          { binding: 1, resource: { buffer: this.lightBuf } },
          { binding: 2, resource: { buffer: this.clusterBuf } },
        ],
      })),
      (this._matSlots = this.fullMat
        ? [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        : [0, 1, 3, 4, 8]),
      (this.matLayout = n.createBindGroupLayout({
        entries: [
          { binding: 2, visibility: l, sampler: {} },
          ...this._matSlots.map((m) => ({
            binding: m,
            visibility: l,
            texture: { sampleType: "float" },
          })),
        ],
      })),
      (this.pipeLayout = n.createPipelineLayout({
        bindGroupLayouts: [
          this.frameLayout,
          this.objLayout,
          this.envLayout,
          this.matLayout,
        ],
      })),
      (this.shadowLayout = n.createPipelineLayout({
        bindGroupLayouts: [this.frameLayout, this.objLayout],
      })),
      (this.envSampler = n.createSampler({
        addressModeU: "repeat",
        addressModeV: "clamp-to-edge",
        magFilter: "linear",
        minFilter: "linear",
      })),
      (this.latSampler = n.createSampler({
        magFilter: "linear",
        minFilter: "linear",
      })),
      (this.linSampler = n.createSampler({
        magFilter: "linear",
        minFilter: "linear",
        mipmapFilter: "linear",
      })),
      (this.shadowSampler = n.createSampler({
        compare: "less",
        magFilter: "linear",
        minFilter: "linear",
      })));
    let u = (m) =>
      n.createTexture({
        size: [m, m],
        format: "depth32float",
        usage:
          GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      });
    ((this.spotStatic = u(Fg)),
      (this.spotDyn = u(Fg)),
      this._sunMaps(LU),
      (this.dummy2d = n.createTexture({
        size: [1, 1],
        format: "rgba16float",
        usage: GPUTextureUsage.TEXTURE_BINDING,
      })),
      (this._zeroVerts = 0),
      this._growZero(65536));
    let d = (m) => {
      let g = n.createBuffer({
        size: m.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: !0,
      });
      return (new Float32Array(g.getMappedRange()).set(m), g.unmap(), g);
    };
    ((this._identityBuf = d(
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
    )),
      (this._onesBuf = d(new Float32Array([1, 1, 1]))));
    let p = (m, g) => {
      let b = n.createTexture({
        size: [1, 1],
        format: m,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });
      return (
        n.queue.writeTexture(
          { texture: b },
          new Uint8Array(g),
          { bytesPerRow: 4 },
          [1, 1],
        ),
        b
      );
    };
    return (
      (this._white = p("rgba8unorm", [255, 255, 255, 255])),
      (this._flat = p("rgba8unorm", [128, 128, 255, 255])),
      (this._samplers = new Map()),
      (this._texCache = new Map()),
      (this._matCache = new Map()),
      (this._instCache = new Map()),
      (this._defaultMat = n.createBindGroup({
        layout: this.matLayout,
        entries: [
          { binding: 2, resource: this._sampler(1e3, 1e3) },
          ...this._matSlots.map((m) => ({
            binding: m,
            resource: (m === 1 || m === 11
              ? this._flat
              : this._white
            ).createView(),
          })),
        ],
      })),
      this.fullMat &&
        ((this.pointSM = n.createTexture({
          size: [3 * K6, 2 * K6, Ng],
          format: "depth32float",
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        })),
        (this._pointSMView = [...Array(Ng).keys()].map((m) =>
          this.pointSM.createView({
            dimension: "2d",
            baseArrayLayer: m,
            arrayLayerCount: 1,
          }),
        )),
        (this.spotMaps = n.createTexture({
          size: [512, 512, q5],
          format: "rgba8unorm-srgb",
          mipLevelCount: 10,
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        })),
        (this._spotMapView = [...Array(q5).keys()].map((m) =>
          [...Array(10).keys()].map((g) =>
            this.spotMaps.createView({
              dimension: "2d",
              baseArrayLayer: m,
              arrayLayerCount: 1,
              baseMipLevel: g,
              mipLevelCount: 1,
            }),
          ),
        )),
        (this.frameBufPoint = Array.from({ length: 6 * Ng }, () => a())),
        (this.frameGroupPoint = this.frameBufPoint.map(f)),
        (this._spotMapKeys = [])),
      this.hasTimestamps &&
        ((this.qset = n.createQuerySet({ type: "timestamp", count: 48 })),
        (this.qbuf = n.createBuffer({
          size: 384,
          usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC,
        })),
        (this.qread = [0, 1, 2].map(() => ({
          buf: n.createBuffer({
            size: 384,
            usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
          }),
          busy: !1,
        })))),
      this._resize(),
      this
    );
  }
  _growZero(t) {
    t <= this._zeroVerts ||
      (this._zeroBuf?.destroy(),
      (this._zeroVerts = Math.max(t, this._zeroVerts * 2)),
      (this._zeroBuf = this.device.createBuffer({
        size: this._zeroVerts * 16,
        usage: GPUBufferUsage.VERTEX,
      })));
  }
  setPixelRatio(t) {
    ((this.pixelRatio = t), this._fallback?.setPixelRatio(t), this._resize());
  }
  getPixelRatio() {
    return this.pixelRatio;
  }
  setDrawingBufferSize(t, e, s) {
    if (
      ((this.pixelRatio = s),
      (this.width = t),
      (this.height = e),
      (this._viewport = [0, 0, t, e]),
      (this._scissor = [0, 0, t, e]),
      this._fallback)
    ) {
      this._fallback.setDrawingBufferSize(t, e, s);
      return;
    }
    this._resize();
  }
  setSize(t, e, s = !0) {
    if (
      ((this.width = t),
      (this.height = e),
      (this._viewport = [0, 0, t, e]),
      (this._scissor = [0, 0, t, e]),
      this._fallback)
    ) {
      this._fallback.setSize(t, e, s);
      return;
    }
    (s &&
      ((this.domElement.style.width = t + "px"),
      (this.domElement.style.height = e + "px")),
      this._resize());
  }
  getSize(t = new Re()) {
    return t.set(this.width, this.height);
  }
  _resize() {
    let t = Math.max(1, Math.floor(this.width * this.pixelRatio)),
      e = Math.max(1, Math.floor(this.height * this.pixelRatio)),
      s = !!(
        this.fxaa &&
        this.upscale > this.pixelRatio * 1.05 &&
        !this._fallback &&
        !this._upOff
      ),
      n = s ? Math.max(t, Math.floor(this.width * this.upscale)) : t,
      o = s ? Math.max(e, Math.floor(this.height * this.upscale)) : e;
    if (
      (this.domElement.width !== n && (this.domElement.width = n),
      this.domElement.height !== o && (this.domElement.height = o),
      !this.device)
    )
      return;
    let a = this.device,
      r = GPUTextureUsage.RENDER_ATTACHMENT,
      l = GPUTextureUsage.TEXTURE_BINDING;
    if (
      ((s !== !!this._out ||
        (s && (this._out.width !== t || this._out.height !== e))) &&
        (this._out?.destroy(),
        (this._out = null),
        (this._upGroup = null),
        s &&
          this.pUp &&
          ((this._out = a.createTexture({
            size: [t, e],
            format: this.format,
            usage: r | l,
          })),
          (this._upGroup = a.createBindGroup({
            layout: this.upLayout,
            entries: [
              { binding: 0, resource: this._out.createView() },
              { binding: 1, resource: { buffer: this._upBuf } },
            ],
          }))),
        this._views && (this._views.out = this._out?.createView())),
      this._out &&
        a.queue.writeBuffer(
          this._upBuf,
          0,
          new Float32Array([t, e, 1 / n, 1 / o]),
        ),
      this._color && this._W === t && this._H === e)
    )
      return;
    ((this._W = t), (this._H = e));
    for (let w of [
      this._color,
      this._hdr,
      this._depth,
      this._planar,
      this._planarDepth,
      ...(this._scene || []),
    ])
      w?.destroy();
    ((this._color = a.createTexture({
      size: [t, e],
      sampleCount: this.samples,
      format: this.format,
      usage: r,
    })),
      (this._hdr = a.createTexture({
        size: [t, e],
        sampleCount: this.samples,
        format: "rgba16float",
        usage: r,
      })),
      (this._depth = a.createTexture({
        size: [t, e],
        sampleCount: this.samples,
        format: "depth24plus",
        usage: r | l,
      })),
      (this._scene = [0, 1].map(() =>
        a.createTexture({ size: [t, e], format: "rgba16float", usage: r | l }),
      )));
    let c = Math.max(8, Math.round(t / 16) * 8),
      h = Math.max(8, Math.round(e / 16) * 8),
      f = Math.max(
        1,
        Math.min(this.maxPlanarMips, Math.floor(Math.log2(Math.min(c, h))) - 1),
      ),
      u = GPUTextureUsage.STORAGE_BINDING;
    ((this._planar = a.createTexture({
      size: [c, h],
      format: "rgba16float",
      mipLevelCount: f,
      usage: r | l | u,
    })),
      (this._planarDepth = a.createTexture({
        size: [c, h],
        format: "depth24plus",
        usage: r,
      })),
      (this._planarLevels = f),
      (this._pw = c),
      (this._ph = h));
    let d = (w, z) => w.createView({ baseMipLevel: z, mipLevelCount: 1 }),
      p = (w, z, _) =>
        a.createBindGroup({
          layout: this.postLayout,
          entries: [
            { binding: 0, resource: w },
            { binding: 1, resource: this.linSampler },
            { binding: 2, resource: z },
            { binding: 3, resource: _ || this.dummy2d.createView() },
            { binding: 4, resource: { buffer: this.postBuf } },
          ],
        });
    this._mipGroups = [];
    for (let w = 1; w < f; w++)
      this._mipGroups.push({
        group: p(d(this._planar, w - 1), d(this._planar, w)),
        w: Math.max(1, c >> w),
        h: Math.max(1, h >> w),
      });
    (this._bloomTex?.destroy(), this._bloomUp?.destroy());
    let m = Math.max(1, t >> 1),
      g = Math.max(1, e >> 1),
      b = Math.max(
        1,
        Math.min(
          this.maxBloomLevels,
          Math.floor(Math.log2(Math.min(m, g))) - 2,
        ),
      );
    ((this._bloomTex = a.createTexture({
      size: [m, g],
      format: "rgba16float",
      mipLevelCount: b,
      usage: r | l | u,
    })),
      (this._hotGroup = a.createBindGroup({
        layout: this.hotLayout,
        entries: [
          {
            binding: 0,
            resource: this._bloomTex.createView({
              baseMipLevel: 0,
              mipLevelCount: 1,
            }),
          },
          { binding: 1, resource: { buffer: this._hotBuf } },
        ],
      })),
      (this._bloomUp = a.createTexture({
        size: [m, g],
        format: "rgba16float",
        mipLevelCount: Math.max(1, b - 1),
        usage: l | u,
      })));
    let x = (w) =>
        this._bloomTex.createView({ baseMipLevel: w, mipLevelCount: 1 }),
      v = (w) =>
        a.createBindGroup({
          layout: this.mipLayout,
          entries: [
            { binding: 0, resource: w },
            { binding: 1, resource: this.linSampler },
          ],
        }),
      y = (w) =>
        a.createBindGroup({
          layout: this.bloomLayout,
          entries: [
            { binding: 0, resource: w },
            { binding: 1, resource: this.linSampler },
            { binding: 2, resource: { buffer: this.bloomBuf } },
          ],
        }),
      M = (w) =>
        this._bloomUp.createView({ baseMipLevel: w, mipLevelCount: 1 }),
      S = b > 1 ? M(0) : x(0);
    ((this._bloom = {
      levels: b,
      size: (w) => [Math.max(1, m >> w), Math.max(1, g >> w)],
      down0: this._scene.map((w) => p(w.createView(), x(0))),
      down: [...Array(b).keys()].map((w) => (w ? p(x(w - 1), x(w)) : null)),
      up: [...Array(b).keys()].map((w) =>
        w + 1 < b ? p(w + 2 < b ? M(w + 1) : x(w + 1), M(w), x(w)) : null,
      ),
      comp: y(S),
      glow0: S,
    }),
      this._ldr?.destroy(),
      (this._ldr = null));
    for (let w of this._taaTex || []) w.destroy();
    if (
      ((this._taaTex = null),
      (this._taaReset = !0),
      this.fxaa &&
        ((this._ldr = a.createTexture({
          size: [t, e],
          format: this.format,
          usage: r | l,
        })),
        this.fullMat &&
          (this._velTex?.destroy(),
          (this._velTex = a.createTexture({
            size: [t, e],
            format: "rgba16float",
            usage: r | l,
          }))),
        (this._finalGroup = a.createBindGroup({
          layout: this.finalLayout,
          entries: [
            { binding: 0, resource: this._ldr.createView() },
            { binding: 1, resource: this.linSampler },
            { binding: 2, resource: { buffer: this.bloomBuf } },
            { binding: 3, resource: S },
            ...this._finalExtra(),
          ],
        })),
        this.fullMat &&
          ((this._taaTex = [0, 1].map(() =>
            a.createTexture({
              size: [t, e],
              format: this.format,
              usage: r | l,
            }),
          )),
          (this._finalGroupT = this._taaTex.map((w) =>
            a.createBindGroup({
              layout: this.finalLayout,
              entries: [
                { binding: 0, resource: w.createView() },
                { binding: 1, resource: this.linSampler },
                { binding: 2, resource: { buffer: this.bloomBuf } },
                { binding: 3, resource: S },
                ...this._finalExtra(),
              ],
            }),
          )),
          (this._taaGroups = [0, 1].map((w) =>
            a.createBindGroup({
              layout: this.taaLayout,
              entries: [
                { binding: 0, resource: this._ldr.createView() },
                { binding: 1, resource: this._taaTex[1 - w].createView() },
                { binding: 2, resource: this._depth.createView() },
                { binding: 3, resource: this.clampSampler },
                { binding: 4, resource: { buffer: this.taaBuf } },
                { binding: 5, resource: this._velTex.createView() },
              ],
            }),
          )))),
      (this._views = {
        planar0: this._planar.createView({ baseMipLevel: 0, mipLevelCount: 1 }),
        planarDepth: this._planarDepth.createView(),
        color: this._color.createView(),
        hdr: this._hdr.createView(),
        ldr: this._ldr?.createView(),
        depth: this._depth.createView(),
        scene: this._scene.map((w) => w.createView()),
        out: this._out?.createView(),
      }),
      (this._envGroups = null),
      this._aoTex?.destroy(),
      this._aoRaw?.destroy(),
      (this._aoTex = this._aoRaw = null),
      (this._aoGroups = null),
      this.fullMat && this.samples === 1)
    ) {
      let w = Math.ceil(t / 2),
        z = Math.ceil(e / 2),
        _ = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.STORAGE_BINDING;
      ((this._aoTex = a.createTexture({
        size: [w, z],
        format: "rgba16float",
        usage: _,
      })),
        (this._aoRaw = a.createTexture({
          size: [w, z],
          format: "rgba16float",
          usage: _,
        })));
    }
  }
  async loadNeural(t, e) {
    this.neural = await Td.load(this.device, t, e);
    let s = this.neural.manifest.shadow;
    s && (this._shadowCenter.fromArray(s.center), (this._shadowHalf = s.half));
    let n = this._shadowHalf,
      o = this._lightCam;
    return (
      (o.left = o.bottom = -n),
      (o.right = o.top = n),
      o.updateProjectionMatrix(),
      this.neural
    );
  }
  async compileAsync(t) {
    return (
      this.device || (await (this.ready ||= this.init())),
      this._compileStarted
        ? this.neural &&
          this._startNeural &&
          !this._neuralStarted &&
          !this._startNeural()
          ? ((this._compileStarted = null),
            (this._hooks = this._hooksEq = null),
            this.compileAsync(t))
          : (t?.traverse?.((e) => {
              (e.isMesh || e.isPoints || e.isSprite) &&
                this._geometry(
                  e.geometry,
                  this._uvName(e),
                  e.isMesh ? this._lmName(e) : null,
                );
            }),
            this._compileStarted)
        : ((this._compileStarted = bU(
            Promise.resolve().then(() => this._compilePipelines(t)),
          )),
          this._compileStarted)
    );
  }
  async _compilePipelines(t) {
    let e = performance.now(),
      s = this.device,
      n = new H5(),
      o = new WeakMap(),
      a = (W) => {
        let V = s.createShaderModule(W);
        return (o.set(V, W), V);
      },
      r = 0,
      l = (W, V) => {
        if (!V) return W;
        let Y = { ...W },
          $ = new Map();
        for (let st of ["vertex", "fragment", "compute"]) {
          let Q = W[st],
            j = Q && o.get(Q.module);
          j &&
            ($.has(Q.module) ||
              $.set(
                Q.module,
                a({
                  ...j,
                  code:
                    j.code +
                    `
// base retry ${V}, generation ${++r}`,
                }),
              ),
            (Y[st] = { ...Q, module: $.get(Q.module) }));
        }
        return Y;
      },
      c = (W) => n.run((V) => s.createRenderPipelineAsync(l(W, V))),
      h = (W) => n.run((V) => s.createComputePipelineAsync(l(W, V))),
      f = [
        {
          arrayStride: 12,
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x3" }],
        },
        {
          arrayStride: 12,
          attributes: [{ shaderLocation: 1, offset: 0, format: "float32x3" }],
        },
        {
          arrayStride: 16,
          attributes: [{ shaderLocation: 2, offset: 0, format: "float32x4" }],
        },
        {
          arrayStride: 8,
          attributes: [{ shaderLocation: 3, offset: 0, format: "uint16x4" }],
        },
        {
          arrayStride: 16,
          attributes: [{ shaderLocation: 4, offset: 0, format: "float32x4" }],
        },
        {
          arrayStride: 16,
          attributes: [{ shaderLocation: 5, offset: 0, format: "float32x4" }],
        },
        {
          arrayStride: 64,
          stepMode: "instance",
          attributes: [0, 1, 2, 3].map((W) => ({
            shaderLocation: 6 + W,
            offset: 16 * W,
            format: "float32x4",
          })),
        },
        {
          arrayStride: 12,
          stepMode: "instance",
          attributes: [{ shaderLocation: 10, offset: 0, format: "float32x3" }],
        },
      ],
      u = {
        ms: { count: this.samples },
        targets: [{ format: this.format }, { format: "rgba16float" }],
      },
      d = {
        ms: { count: this.samples },
        targets: [
          {
            format: this.format,
            blend: {
              color: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha",
              },
              alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
            },
          },
          { format: "rgba16float", writeMask: 0 },
        ],
      },
      p = { ms: { count: 1 }, targets: [{ format: "rgba16float" }] },
      m = {
        format: "depth24plus",
        depthWriteEnabled: !0,
        depthCompare: "less",
      },
      g = [f[0], null, null, f[3], f[4], null, f[6], null],
      b = (W) => ({ ...W, arrayStride: 0 }),
      x = [f[0], f[1], f[2], b(f[3]), b(f[4]), b(f[5]), f[6], f[7]],
      v = [f[0], null, null, b(f[3]), b(f[4]), null, f[6], null],
      y = [f[0], b(f[3]), b(f[4]), f[6]],
      M = this.neural?.manifest || this.manifestHint || null,
      S = (W) =>
        !!W &&
        this.leanVertex !== !1 &&
        !Object.values(W.meshes || {}).some((V) => V.skinned),
      w = S(M);
    this.info.leanVertex = w;
    let z = [f[0], f[1], f[2], null, null, null, f[6], null],
      _ = [f[0], null, null, null, null, null, f[6], null],
      R = (W) =>
        (W.label.startsWith("standard-hook")
          ? s.createRenderPipelineAsync(W)
          : c(W)
        ).then(
          (V) => (
            (this._materialPipeDescriptors ||= new WeakMap()).set(V, W),
            V
          ),
        ),
      T = (W, V, Y, $, st, Q = "vs") =>
        R({
          label: V,
          layout: this.pipeLayout,
          vertex: {
            module: W,
            entryPoint: Q,
            buffers:
              w && V.startsWith("neural")
                ? Q === "vsDepth"
                  ? _
                  : z
                : Q === "vsDepth"
                  ? g
                  : f,
          },
          fragment: { module: W, entryPoint: $, targets: Y.targets },
          primitive: {
            topology: "triangle-list",
            cullMode:
              this.cullBack && V.startsWith("neural")
                ? V === "neural-planar"
                  ? "front"
                  : "back"
                : "none",
          },
          depthStencil: st,
          multisample: Y.ms,
        }),
      E = (W, V, Y, $) => T(W, V, Y, $, m),
      A = (W, V, Y, $, st = m) =>
        R({
          label: V + "-z",
          layout: this.pipeLayout,
          vertex: { module: W, entryPoint: "vs", buffers: x },
          fragment: { module: W, entryPoint: $, targets: Y.targets },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: st,
          multisample: Y.ms,
        }),
      C = !!M?.priors?.mips,
      P = new Map(),
      I = new H5(),
      L = 0;
    this._mkHook = (W, V, Y = 0) => {
      let $ = I.run(
        async (st) => {
          let Q = st ? null : P.get(W);
          return (
            Q ||
              ((Q = s.createShaderModule({
                code:
                  JA(C, W, this.fullMat) +
                  `
// compilation attempt ${st}, variant ${V}, generation ${++L}`,
                label: "standard-hook",
              })),
              P.set(W, Q)),
            V === "lin"
              ? E(Q, "standard-hook-planar", p, "fsLin")
              : V
                ? T(Q, "standard-hook-eq", u, "fs", {
                    ...m,
                    depthCompare: "less-equal",
                  })
                : E(Q, "standard-hook", u, "fs")
          );
        },
        { priority: Y },
      );
      return Object.assign(
        $.catch((st) => {
          throw (P.delete(W), st);
        }),
        { prioritize: $.prioritize },
      );
    };
    let F = a({ code: JA(C, "", this.fullMat), label: "standard" }),
      N = a({ code: PU, label: "bg" }),
      B = a({ code: RU, label: "shadow" }),
      H = a({ code: QA, label: "mip" }),
      O = a({ code: CU, label: "cluster" }),
      D = (W, V) =>
        c({
          label: "bg",
          layout: this.pipeLayout,
          vertex: { module: N, entryPoint: "vsBg" },
          fragment: { module: N, entryPoint: V, targets: W.targets },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
          multisample: W.ms,
        }),
      U = (W, V, Y, $ = !1) =>
        c({
          label: W + ($ ? "-z" : ""),
          layout: this.shadowLayout,
          vertex: {
            module: B,
            entryPoint: "vsShadow",
            buffers: $ ? y : [f[0], f[3], f[4], f[6]],
          },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            format: "depth32float",
            depthWriteEnabled: !0,
            depthCompare: "less",
            depthBias: V,
            depthBiasSlopeScale: Y,
          },
        });
    ((this._emptyLayout ||= s.createBindGroupLayout({ entries: [] })),
      (this._emptyGroup ||= s.createBindGroup({
        layout: this._emptyLayout,
        entries: [],
      })));
    let G = (W, V, Y) =>
        c({
          label: W,
          layout: s.createPipelineLayout({
            bindGroupLayouts: [
              this.frameLayout,
              this.objLayout,
              this._emptyLayout,
              this.matLayout,
            ],
          }),
          vertex: { module: B, entryPoint: "vsShadowA", buffers: f },
          fragment: { module: B, entryPoint: "fsShadowA", targets: [] },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            format: "depth32float",
            depthWriteEnabled: !0,
            depthCompare: "less",
            depthBias: V,
            depthBiasSlopeScale: Y,
          },
        }),
      q = [
        G("shadow-alpha", 2, 2.5).then((W) => (this.pShadowA = W)),
        G("shadow-spot-alpha", 64, 2).then((W) => (this.pShadowSpotA = W)),
        c({
          label: "velocity",
          layout: this.shadowLayout,
          vertex: {
            module: B,
            entryPoint: "vsVel",
            buffers: [f[0], f[3], f[4], f[6]],
          },
          fragment: {
            module: B,
            entryPoint: "fsVel",
            targets: [{ format: "rgba16float" }],
          },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
        }).then((W) => (this.pVel = W)),
        c({
          label: "velocity-inst",
          layout: this.shadowLayout,
          vertex: {
            module: B,
            entryPoint: "vsVelI",
            buffers: [
              f[0],
              f[3],
              f[4],
              f[6],
              {
                arrayStride: 64,
                stepMode: "instance",
                attributes: [0, 1, 2, 3].map((W) => ({
                  shaderLocation: 11 + W,
                  offset: 16 * W,
                  format: "float32x4",
                })),
              },
            ],
          },
          fragment: {
            module: B,
            entryPoint: "fsVel",
            targets: [{ format: "rgba16float" }],
          },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
        }).then((W) => (this.pVelI = W)),
        c({
          label: "velocity-line",
          layout: this.shadowLayout,
          vertex: {
            module: B,
            entryPoint: "vsVel",
            buffers: [f[0], f[3], f[4], f[6]],
          },
          fragment: {
            module: B,
            entryPoint: "fsVel",
            targets: [{ format: "rgba16float" }],
          },
          primitive: { topology: "line-list" },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
        }).then((W) => (this.pVelLine = W)),
        E(F, "standard", u, "fs").then((W) => (this.pStandard = W)),
        A(F, "standard", u, "fs").then((W) => (this.pStandardZ = W)),
        A(F, "standard-eq", u, "fs", { ...m, depthCompare: "less-equal" }).then(
          (W) => (this.pStandardEqZ = W),
        ),
        E(F, "standard-glass", d, "fs").then((W) => (this.pStandardGlass = W)),
        ...(this.fullMat
          ? ["back", "front", "none"].flatMap((W) =>
              [
                ["", g],
                ["Z", v],
              ].map(([V, Y]) =>
                c({
                  label: "std-pre-" + W + V,
                  layout: this.pipeLayout,
                  vertex: { module: F, entryPoint: "vsDepth", buffers: Y },
                  primitive: { topology: "triangle-list", cullMode: W },
                  depthStencil: {
                    format: "depth24plus",
                    depthWriteEnabled: !0,
                    depthCompare: "less",
                    depthBias: 4,
                    depthBiasSlopeScale: 1,
                  },
                  multisample: { count: this.samples },
                }).then(($) => ((this.pStdPre ||= {})[W + V] = $)),
              ),
            )
          : []),
        T(F, "standard-eq", u, "fs", { ...m, depthCompare: "less-equal" }).then(
          (W) => (this.pStandardEq = W),
        ),
        ...(this.fullMat
          ? [
              (async () => {
                let W = GPUShaderStage.COMPUTE;
                ((this.aoL0 = s.createBindGroupLayout({
                  entries: [{ binding: 0, visibility: W, buffer: {} }],
                })),
                  (this.aoL1 = s.createBindGroupLayout({
                    entries: [
                      { binding: 0, visibility: W, buffer: {} },
                      {
                        binding: 1,
                        visibility: W,
                        texture: { sampleType: "depth" },
                      },
                      {
                        binding: 2,
                        visibility: W,
                        storageTexture: {
                          access: "write-only",
                          format: "rgba16float",
                        },
                      },
                      {
                        binding: 3,
                        visibility: W,
                        texture: { sampleType: "float" },
                      },
                      {
                        binding: 4,
                        visibility: W,
                        texture: { sampleType: "float" },
                      },
                    ],
                  })),
                  (this.aoBuf = s.createBuffer({
                    size: 64,
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                  })),
                  (this.aoG0 = s.createBindGroup({
                    layout: this.aoL0,
                    entries: [
                      { binding: 0, resource: { buffer: this.frameBuf } },
                    ],
                  })));
                let V = a({
                    code: Ec.split("struct Bones")[0] + fU,
                    label: "gtao",
                  }),
                  Y = s.createPipelineLayout({
                    bindGroupLayouts: [this.aoL0, this.aoL1],
                  });
                [this.pGtao, this.pAoBlur] = await Promise.all(
                  ["gtao", "blur"].map(($) =>
                    h({ layout: Y, compute: { module: V, entryPoint: $ } }),
                  ),
                );
              })(),
            ]
          : []),
        ...[
          ["alpha", !0],
          ["alpha", !1],
          ["add", !1],
          ["mul", !1],
        ].map(([W, V]) => {
          let Y =
            W === "add"
              ? {
                  color: { srcFactor: "src-alpha", dstFactor: "one" },
                  alpha: { srcFactor: "zero", dstFactor: "one" },
                }
              : W === "mul"
                ? {
                    color: { srcFactor: "zero", dstFactor: "src" },
                    alpha: { srcFactor: "zero", dstFactor: "src-alpha" },
                  }
                : {
                    color: {
                      srcFactor: "src-alpha",
                      dstFactor: "one-minus-src-alpha",
                    },
                    alpha: {
                      srcFactor: "one",
                      dstFactor: "one-minus-src-alpha",
                    },
                  };
          return c({
            label: `standard-${W}${V ? "-dw" : ""}`,
            layout: this.pipeLayout,
            vertex: { module: F, entryPoint: "vs", buffers: f },
            fragment: {
              module: F,
              entryPoint: "fs",
              targets: [
                { format: this.format, blend: Y },
                { format: "rgba16float", writeMask: 0 },
              ],
            },
            primitive: { topology: "triangle-list", cullMode: "none" },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: V,
              depthCompare: "less",
            },
            multisample: { count: this.samples },
          }).then(($) => {
            (this.pBlend ||= {})[W + (V ? "1" : "0")] = $;
          });
        }),
        ...["sprite", "points"].flatMap((W) =>
          [
            ["alpha", !0],
            ["alpha", !1],
            ["add", !1],
          ].map(([V, Y]) => {
            let $ =
                V === "add"
                  ? {
                      color: { srcFactor: "src-alpha", dstFactor: "one" },
                      alpha: { srcFactor: "zero", dstFactor: "one" },
                    }
                  : {
                      color: {
                        srcFactor: "src-alpha",
                        dstFactor: "one-minus-src-alpha",
                      },
                      alpha: {
                        srcFactor: "one",
                        dstFactor: "one-minus-src-alpha",
                      },
                    },
              st =
                W === "sprite"
                  ? f
                  : [
                      {
                        arrayStride: 12,
                        stepMode: "instance",
                        attributes: [
                          {
                            shaderLocation: 11,
                            offset: 0,
                            format: "float32x3",
                          },
                        ],
                      },
                      {
                        arrayStride: 16,
                        stepMode: "instance",
                        attributes: [
                          {
                            shaderLocation: 12,
                            offset: 0,
                            format: "float32x4",
                          },
                        ],
                      },
                    ];
            return c({
              label: `${W}-${V}`,
              layout: this.pipeLayout,
              vertex: {
                module: F,
                entryPoint: W === "sprite" ? "vsSprite" : "vsPoints",
                buffers: st,
              },
              fragment: {
                module: F,
                entryPoint: "fs",
                targets: [
                  { format: this.format, blend: $ },
                  { format: "rgba16float", writeMask: 0 },
                ],
              },
              primitive: { topology: "triangle-list", cullMode: "none" },
              depthStencil: {
                format: "depth24plus",
                depthWriteEnabled: Y,
                depthCompare: "less",
              },
              multisample: { count: this.samples },
            }).then((Q) => {
              (this["p_" + W] ||= {})[V + (Y ? "1" : "0")] = Q;
            });
          }),
        ),
        ...["mesh", "sprite", "points"].map((W) => {
          let V =
              W === "points"
                ? [
                    {
                      arrayStride: 12,
                      stepMode: "instance",
                      attributes: [
                        { shaderLocation: 11, offset: 0, format: "float32x3" },
                      ],
                    },
                    {
                      arrayStride: 16,
                      stepMode: "instance",
                      attributes: [
                        { shaderLocation: 12, offset: 0, format: "float32x4" },
                      ],
                    },
                  ]
                : f,
            Y = { operation: "max", srcFactor: "one", dstFactor: "one" };
          return c({
            label: "react-" + W,
            layout: this.pipeLayout,
            vertex: {
              module: F,
              entryPoint:
                W === "sprite"
                  ? "vsSprite"
                  : W === "points"
                    ? "vsPoints"
                    : "vs",
              buffers: V,
            },
            fragment: {
              module: F,
              entryPoint: "fsReact",
              targets: [
                {
                  format: "rgba16float",
                  writeMask: GPUColorWrite.ALPHA,
                  blend: { color: Y, alpha: Y },
                },
              ],
            },
            primitive: { topology: "triangle-list", cullMode: "none" },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: !1,
              depthCompare: "less",
            },
          })
            .then(($) => {
              (this.pReact ||= {})[W] = $;
            })
            .catch(($) => console.warn("react pipeline", $));
        }),
        E(F, "standard-planar", p, "fsLin").then(
          (W) => (this.pStandardLin = W),
        ),
        ...[
          ["opaque", null, !0],
          ["alpha1", "alpha", !0],
          ["alpha0", "alpha", !1],
          ["add0", "add", !1],
        ].map(([W, V, Y]) => {
          let $ =
            V === "add"
              ? {
                  color: { srcFactor: "src-alpha", dstFactor: "one" },
                  alpha: { srcFactor: "zero", dstFactor: "one" },
                }
              : V
                ? {
                    color: {
                      srcFactor: "src-alpha",
                      dstFactor: "one-minus-src-alpha",
                    },
                    alpha: {
                      srcFactor: "one",
                      dstFactor: "one-minus-src-alpha",
                    },
                  }
                : void 0;
          return c({
            label: "line-" + W,
            layout: this.pipeLayout,
            vertex: { module: F, entryPoint: "vs", buffers: f },
            fragment: {
              module: F,
              entryPoint: "fs",
              targets: [
                { format: this.format, blend: $ },
                { format: "rgba16float", writeMask: V ? 0 : 15 },
              ],
            },
            primitive: { topology: "line-list" },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: Y,
              depthCompare: "less",
            },
            multisample: { count: this.samples },
          }).then((st) => {
            (this.pLine ||= {})[W] = st;
          });
        }),
        D(u, "fsBg").then((W) => (this.pBg = W)),
        (() => {
          ((this.skyULayout = s.createBindGroupLayout({
            entries: [
              { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: {} },
            ],
          })),
            (this.skyUBuf = s.createBuffer({
              size: 64,
              usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            })),
            (this.skyUGroup = s.createBindGroup({
              layout: this.skyULayout,
              entries: [{ binding: 0, resource: { buffer: this.skyUBuf } }],
            })));
          let W = a({ label: "preetham", code: AU + bct });
          return c({
            label: "preetham",
            layout: s.createPipelineLayout({
              bindGroupLayouts: [this.frameLayout, this.skyULayout],
            }),
            vertex: { module: W, entryPoint: "vsSky" },
            fragment: { module: W, entryPoint: "fsSky", targets: u.targets },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: !1,
              depthCompare: "less-equal",
            },
            multisample: u.ms,
          }).then((V) => (this.pPreetham = V));
        })(),
        D(p, "fsBgLin").then((W) => (this.pBgLin = W)),
        U("shadow", 2, 2.5).then((W) => (this.pShadow = W)),
        U("shadow", 2, 2.5, !0).then((W) => (this.pShadowZ = W)),
        ...["Sun", "Spot"].map((W) =>
          c({
            label: "glass-trans-" + W,
            layout: this.shadowLayout,
            vertex: { module: B, entryPoint: "vsGlassT", buffers: f },
            primitive: { topology: "triangle-list", cullMode: "none" },
            fragment: {
              module: B,
              entryPoint: "fsGlassT" + W,
              targets: [
                {
                  format: "rgba16float",
                  blend: {
                    color: { srcFactor: "dst", dstFactor: "zero" },
                    alpha: {
                      operation: "min",
                      srcFactor: "one",
                      dstFactor: "one",
                    },
                  },
                },
              ],
            },
          }).then((V) => (this["pGlassT" + W] = V)),
        ),
        U("shadow-spot", 64, 2).then((W) => (this.pShadowSpot = W)),
        U("shadow-spot", 64, 2, !0).then((W) => (this.pShadowSpotZ = W)),
        c({
          label: "mip",
          layout: s.createPipelineLayout({
            bindGroupLayouts: [this.mipLayout],
          }),
          vertex: { module: H, entryPoint: "vs" },
          fragment: {
            module: H,
            entryPoint: "fs",
            targets: [{ format: "rgba16float" }],
          },
        }).then((W) => (this.pMip = W)),
        h({
          label: "cluster",
          layout: s.createPipelineLayout({
            bindGroupLayouts: [this.clusterLayout],
          }),
          compute: { module: O, entryPoint: "build" },
        }).then((W) => (this.pCluster = W)),
      ];
    ((this._neuralStarted = !1),
      (this._startNeural = () => {
        if (this._neuralStarted || !this.neural) return !0;
        if (
          S(this.neural.manifest) !== w ||
          !!this.neural.manifest.priors?.mips !== C
        )
          return !1;
        this._neuralStarted = !0;
        let W = this.wantF16 && this.device.features.has("shader-f16"),
          V = ($) =>
            a({
              code: ZA(this.neural, this.mlpMode, $, w),
              label: $ ? "neural-f16" : "neural",
            }),
          Y = async ($, st) => {
            let Q = await E($, st ? "neural-f16" : "neural", u, "fs");
            ((this.pNeural = Q),
              (this.info.mlpPrecision = st ? "f16" : "f32"),
              (this.info.neuralReadyMs = performance.now() - e),
              E($, "neural-glass", d, "fs")
                .then((X) => (this.pNeuralGlass = X))
                .catch((X) => console.warn(X)));
            let j = {
              ms: u.ms,
              targets: u.targets.map((X) => ({ ...X, writeMask: 0 })),
            };
            (T($, "neural-depth", j, "fsDepth", m, "vsDepth")
              .then((X) => (this.pNeuralPre = X))
              .catch((X) => console.warn(X)),
              T($, "neural-eq", u, "fs", {
                format: "depth24plus",
                depthWriteEnabled: !1,
                depthCompare: "less-equal",
              })
                .then((X) => (this.pNeuralEq = X))
                .catch((X) => console.warn(X)),
              E($, "neural-planar", p, "fsLin")
                .then((X) => (this.pNeuralLin = X))
                .catch((X) => console.warn(X)));
          };
        return (
          (this.neuralReady = W
            ? Y(V(!0), !0).catch(
                ($) => (
                  console.warn("f16 MLP failed, using f32", $),
                  Y(V(!1), !1)
                ),
              )
            : Y(V(!1), !1)),
          !0
        );
      }),
      this._startNeural(),
      t.traverse((W) => {
        W.isMesh &&
          this._geometry(W.geometry, this._uvName(W), this._lmName(W));
      }),
      this._setupEnv(t),
      await Promise.all(q),
      (this.info.compileMs = performance.now() - e));
  }
  _setupEnv(t) {
    let e = this.device;
    this._envEnsure(t);
    let s = t.background && t.background.isTexture ? t.background : null,
      n = t.backgroundBlurriness || 0,
      o =
        n <= 0
          ? 0
          : n < 0.1
            ? 1
            : n < 0.25
              ? 2
              : n < 0.45
                ? 3
                : n < 0.7
                  ? 4
                  : 5,
      a =
        !!s &&
        (s.isCubeTexture || !!s.userData?.mbEnv || o > 0) &&
        !this.neural &&
        !!this._envPrior,
      r = a && o === 0 && this._bgSharp ? this._bgSharp : null;
    if (
      ((a !== !!this._bgEnvView ||
        (a && o !== this._bgLayer) ||
        (a && (r || null) !== (this._bgSharpUsed || null))) &&
        ((this._bgEnvView = a
          ? r ||
            this._envPrior.createView({
              dimension: "2d",
              baseArrayLayer: o,
              arrayLayerCount: 1,
            })
          : null),
        (this._bgLayer = o),
        (this._bgSharpUsed = r),
        (this._envGroups = null)),
      s !== this._bgSrc)
    ) {
      if (
        ((this._bgSrc = s),
        this._bgTex?.destroy(),
        s && s.image && s.image.data)
      ) {
        let { width: l, height: c, data: h } = s.image,
          f = h instanceof Uint16Array;
        ((this._bgTex = e.createTexture({
          size: [l, c],
          format: f ? "rgba16float" : "rgba32float",
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        })),
          e.queue.writeTexture(
            { texture: this._bgTex },
            h,
            { bytesPerRow: l * (f ? 8 : 16) },
            [l, c],
          ));
      } else if (s && s.image && s.image.width) {
        let l = s.image,
          { width: c, height: h } = l;
        ((this._bgTex = e.createTexture({
          size: [c, h],
          format: "rgba8unorm",
          usage:
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.COPY_DST |
            GPUTextureUsage.RENDER_ATTACHMENT,
        })),
          e.queue.copyExternalImageToTexture(
            { source: l, flipY: !1 },
            { texture: this._bgTex },
            [c, h],
          ));
      } else
        this._bgTex = e.createTexture({
          size: [1, 1],
          format: "rgba16float",
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });
      this._envGroups = null;
    }
    if (
      (this._dynNeeded && !this._dyn && this._dynEnsure(), !this._envGroups)
    ) {
      let l = this.neural || Td.empty(e),
        c = (h, f) =>
          e.createBindGroup({
            layout: this.envLayout,
            entries: [
              {
                binding: 0,
                resource: (this.neural
                  ? l.priorTex
                  : this._envPrior || l.priorTex
                ).createView({ dimension: "2d-array" }),
              },
              { binding: 1, resource: this.envSampler },
              {
                binding: 2,
                resource: l.latentTex.createView({ dimension: "2d-array" }),
              },
              { binding: 3, resource: this.latSampler },
              {
                binding: 4,
                resource: this._bgEnvView || this._bgTex.createView(),
              },
              { binding: 5, resource: this.smStatic.createView() },
              { binding: 6, resource: this.smDyn.createView() },
              { binding: 7, resource: this.shadowSampler },
              { binding: 8, resource: h.createView() },
              { binding: 9, resource: f.createView() },
              { binding: 10, resource: this.linSampler },
              { binding: 11, resource: { buffer: this.lightBuf } },
              { binding: 12, resource: { buffer: this.clusterBuf } },
              { binding: 13, resource: this.spotStatic.createView() },
              { binding: 14, resource: this.spotDyn.createView() },
              {
                binding: 15,
                resource: this._dyn?.eqView || this.dummy2d.createView(),
              },
              {
                binding: 16,
                resource: this.glassT.createView({ dimension: "2d-array" }),
              },
              ...(this.fullMat
                ? [
                    {
                      binding: 17,
                      resource: this.pointSM.createView({
                        dimension: "2d-array",
                      }),
                    },
                    {
                      binding: 18,
                      resource: this.spotMaps.createView({
                        dimension: "2d-array",
                      }),
                    },
                    {
                      binding: 19,
                      resource: this._aoTex
                        ? this._aoTex.createView()
                        : this._white.createView(),
                    },
                    {
                      binding: 20,
                      resource: (this._skyTex || this._white).createView(),
                    },
                    { binding: 21, resource: this.smMove.createView() },
                  ]
                : []),
              ...(Cg
                ? [
                    {
                      binding: 22,
                      resource: { buffer: this._skyBuf || this._skyBuf0 },
                    },
                  ]
                : []),
              ...(Lg
                ? [
                    {
                      binding: 23,
                      resource: { buffer: this._sunBuf || this._sunBuf0 },
                    },
                  ]
                : []),
            ],
          });
      this._envGroups = {
        main: [
          c(this._planar, this._scene[1]),
          c(this._planar, this._scene[0]),
        ],
        planar: c(this.dummy2d, this.dummy2d),
      };
    }
  }
  _sunMaps(t) {
    let e = this.device,
      s = (o) =>
        e.createTexture({
          size: [o, o],
          format: "depth32float",
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        });
    for (let o of [this.smStatic, this.smDyn, this.smMove, this.glassT])
      o?.destroy();
    ((this._shadowRes = t),
      (this.smStatic = s(t)),
      (this.smDyn = s(t)),
      this.fullMat && (this.smMove = s(t / 2)));
    let n = Math.max(t, Fg);
    ((this.glassT = e.createTexture({
      size: [n, n, 2],
      format: "rgba16float",
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    })),
      (this._glassTView = [0, 1].map((o) =>
        this.glassT.createView({
          dimension: "2d",
          baseArrayLayer: o,
          arrayLayerCount: 1,
        }),
      )),
      (this._envGroups = null),
      (this._staticSunKey = null),
      (this._staticSpotKey = null));
  }
  setShadowRes(t) {
    this.device && t && t !== this._shadowRes && this._sunMaps(t);
  }
  get shadowRes() {
    return this._shadowRes;
  }
  _inSunBox(t) {
    let e = this._sunBox;
    if (!e) return !0;
    let s = e.m.elements,
      n = t.center.x,
      o = t.center.y,
      a = t.center.z,
      r = t.radius,
      l = s[0] * n + s[4] * o + s[8] * a + s[12],
      c = s[1] * n + s[5] * o + s[9] * a + s[13],
      h = -(s[2] * n + s[6] * o + s[10] * a + s[14]);
    return (
      Math.abs(l) < e.h + r &&
      Math.abs(c) < e.h + r &&
      h > e.n - r &&
      h < e.f + r
    );
  }
  _meshInfo(t) {
    let e = this.neural?.manifest.meshes;
    if (!e) return null;
    let s = t._mbNm;
    if (s && s.M === e && s.n === t.name) return s.v;
    let n =
      e[t.name] ||
      e[t.name.replace(/_\d+$/, "")] ||
      (t.parent && e[t.parent.name]) ||
      null;
    return ((t._mbNm = { M: e, n: t.name, v: n }), n);
  }
  _uvName(t) {
    let e = this._meshInfo(t)?.uvSet;
    return e > 0 ? "uv" + e : "uv";
  }
  _lmName(t) {
    if (this._detailOf(t)) return "uv";
    let e = Array.isArray(t.material) ? t.material[0] : t.material,
      s = e?.lightMap?.channel ?? 1;
    return e?.lightMap
      ? s > 0
        ? "uv" + s
        : "uv"
      : e?.userData?.mbSkyVis === 1 || e?.userData?.mbUV1
        ? "uv1"
        : null;
  }
  _detailOf(t) {
    if (
      !this.neural?.manifest.detailNormals ||
      this.detailNormals === !1 ||
      !this._meshInfo(t)
    )
      return !1;
    let e = Array.isArray(t.material) ? t.material[0] : t.material,
      s = e?.normalMap;
    return !!s && Math.max(Math.abs(s.repeat.x), Math.abs(s.repeat.y)) >= 8;
  }
  _geometry(t, e = "uv", s = null) {
    let n = this._geo.get(t),
      o = t.attributes.position;
    if (
      (n && n.version === o.version && n.uvName === e && n.lmName === s) ||
      (n?.dropCpu && n.version === o.version) ||
      (n && this._regeo(n, t, e, s))
    )
      return n;
    (n && this._freeGeo(n),
      t.__mbDispose ||
        ((t.__mbDispose = () => {
          let m = this._geo.get(t);
          m && (this._geo.delete(t), this._freeGeo(m));
        }),
        t.addEventListener("dispose", t.__mbDispose)));
    let a = this.device,
      r = (m, g) => {
        let b = (m.byteLength + 3) & -4,
          x = a.createBuffer({ size: b, usage: g | GPUBufferUsage.COPY_DST });
        if (b === m.byteLength)
          a.queue.writeBuffer(x, 0, m.buffer, m.byteOffset, b);
        else {
          let v = new Uint8Array(b);
          (v.set(new Uint8Array(m.buffer, m.byteOffset, m.byteLength)),
            a.queue.writeBuffer(x, 0, v));
        }
        return x;
      },
      l = o.count,
      c = (m, g) => {
        if (!m) return new Float32Array(l * g);
        if (
          !m.isInterleavedBufferAttribute &&
          m.array instanceof Float32Array &&
          m.itemSize === g
        )
          return m.array;
        let b = new Float32Array(l * g),
          x = [m.getX, m.getY, m.getZ, m.getW];
        for (let v = 0; v < l; v++)
          for (let y = 0; y < g; y++) b[v * g + y] = x[y].call(m, v);
        return b;
      },
      h = t.attributes[e] || t.attributes.uv,
      f = t.attributes.color,
      u = c(h, 2),
      d = s && t.attributes[s] ? c(t.attributes[s], 2) : null,
      p = new Float32Array(l * 4);
    for (let m = 0; m < l; m++)
      ((p[m * 4] = u[m * 2]),
        (p[m * 4 + 1] = u[m * 2 + 1]),
        d && ((p[m * 4 + 2] = d[m * 2]), (p[m * 4 + 3] = d[m * 2 + 1])));
    if (
      ((n = {
        color: f
          ? r(
              c(
                f.itemSize === 4
                  ? f
                  : {
                      isInterleavedBufferAttribute: !0,
                      getX: (m) => f.getX(m),
                      getY: (m) => f.getY(m),
                      getZ: (m) => f.getZ(m),
                      getW: () => 1,
                    },
                4,
              ),
              GPUBufferUsage.VERTEX,
            )
          : null,
        version: o.version,
        uvName: e,
        lmName: s,
        posArray: c(o, 3),
        pos: null,
        nrm: r(c(t.attributes.normal, 3), GPUBufferUsage.VERTEX),
        uv: r(p, GPUBufferUsage.VERTEX),
      }),
      (n.pos = r(n.posArray, GPUBufferUsage.VERTEX)),
      (n.vcount = l),
      t.attributes.skinIndex && t.attributes.skinWeight)
    ) {
      let m = t.attributes.skinIndex,
        g = t.attributes.skinWeight,
        b = new Uint16Array(l * 4),
        x = new Float32Array(l * 4);
      for (let v = 0; v < l; v++)
        for (let y = 0; y < 4; y++)
          ((b[v * 4 + y] = m.getComponent(v, y)),
            (x[v * 4 + y] = g.getComponent(v, y)));
      ((n.joints = r(b, GPUBufferUsage.VERTEX)),
        (n.weights = r(x, GPUBufferUsage.VERTEX)));
    }
    if ((this._growZero(l), t.index)) {
      let m = t.index.array;
      ((n.index = r(
        m instanceof Uint8Array ? new Uint16Array(m) : m,
        GPUBufferUsage.INDEX,
      )),
        (n.indexArray = m),
        (n.ixv = t.index.version),
        (n.indexFormat = m instanceof Uint32Array ? "uint32" : "uint16"),
        (n.count = m.length));
    } else n.count = l;
    return (
      t.boundingSphere || t.computeBoundingSphere(),
      this._geo.set(t, n),
      this.dropCpuGeometry &&
        t.userData.mbDropCpu &&
        !t.morphAttributes.position &&
        this._dropCpu(t, n),
      n
    );
  }
  _dropCpu(t, e) {
    (t.boundingBox || t.computeBoundingBox(),
      t.boundingSphere || t.computeBoundingSphere());
    for (let s in t.attributes) {
      let n = t.attributes[s];
      if (n.isInterleavedBufferAttribute) continue;
      let o = n.count;
      ((n.array = new n.array.constructor(0)), (n.count = o));
    }
    if (t.index) {
      let s = t.index.count;
      ((t.index.array = new t.index.array.constructor(0)), (t.index.count = s));
    }
    ((e.dropCpu = !0),
      this.reflectionLod === !1 && (e.posArray = e.indexArray = null));
  }
  dropCpu(t) {
    if (!this.dropCpuGeometry) return 0;
    let e = 0,
      s = new Set();
    return (
      t.traverse((n) => {
        let o = n.geometry;
        if (
          !o?.isBufferGeometry ||
          s.has(o) ||
          n.isPoints ||
          n.isLine ||
          n.userData.mbKeepCpu ||
          o.morphAttributes.position ||
          !o.attributes.position
        )
          return;
        (s.add(o),
          o.boundingBox || o.computeBoundingBox(),
          o.boundingSphere || o.computeBoundingSphere(),
          (o.userData.mbDropCpu = !0));
        let a = this._geo.get(o);
        a &&
          !a.freed &&
          !a.dropCpu &&
          a.version === o.attributes.position.version &&
          (this._dropCpu(o, a), e++);
      }),
      e
    );
  }
  _regeo(t, e, s, n) {
    let o = e.attributes.position,
      a = o.count,
      r = e.attributes.normal,
      l = e.attributes[s] || e.attributes.uv,
      c = e.attributes.color,
      h = e.index?.array;
    if (
      t.freed ||
      t.dropCpu ||
      t.joints ||
      t.vcount !== a ||
      t.uvName !== s ||
      t.lmName !== n ||
      !!t.color != !!c ||
      !!h != !!t.index ||
      (h && t.indexArray?.length !== h.length) ||
      e.morphAttributes.position
    )
      return !1;
    let f = (p, m) =>
      p &&
      !p.isInterleavedBufferAttribute &&
      p.array instanceof Float32Array &&
      p.itemSize === m;
    if (
      !f(o, 3) ||
      (r && !f(r, 3)) ||
      (l && !f(l, 2)) ||
      (c && !f(c, 4)) ||
      (n && e.attributes[n]) ||
      (h && (h instanceof Uint8Array || h.byteLength & 3))
    )
      return !1;
    let u = this.device.queue,
      d = (p, m) => u.writeBuffer(p, 0, m.buffer, m.byteOffset, m.byteLength);
    if (
      (d(t.pos, o.array), (t.posArray = o.array), r && d(t.nrm, r.array), l)
    ) {
      let p = l.array,
        m = (this._regeoUV ||= { a: new Float32Array(0) });
      m.a.length < a * 4 && (m.a = new Float32Array(a * 4));
      let g = m.a;
      for (let b = 0; b < a; b++)
        ((g[b * 4] = p[b * 2]),
          (g[b * 4 + 1] = p[b * 2 + 1]),
          (g[b * 4 + 2] = 0),
          (g[b * 4 + 3] = 0));
      u.writeBuffer(t.uv, 0, g.buffer, 0, a * 16);
    }
    if (
      (c && d(t.color, c.array),
      h &&
        t.ixv !== e.index.version &&
        (d(t.index, h), (t.indexArray = h), (t.ixv = e.index.version), t.lines))
    ) {
      for (let p of Object.values(t.lines)) p.index?.destroy();
      t.lines = null;
    }
    return (
      t.lod && (t.lod.index.destroy(), (t.lod = null)),
      (t.version = o.version),
      e.boundingSphere || e.computeBoundingSphere(),
      !0
    );
  }
  _freeGeo(t) {
    if (!t.freed) {
      t.freed = !0;
      for (let e of [
        t.pos,
        t.nrm,
        t.uv,
        t.color,
        t.index,
        t.joints,
        t.weights,
        t.lod?.index,
        ...Object.values(t.lines || {}).map((s) => s.index),
      ])
        e?.destroy();
      t.posArray = t.indexArray = null;
    }
  }
  _morphed(t, e) {
    let s = t.geometry,
      n = t.morphTargetInfluences,
      o = s.morphAttributes.position,
      a = s.morphAttributes.normal;
    this._morphCache ||= new WeakMap();
    let r = this._morphCache.get(t),
      l = n.map((x) => x.toFixed(5)).join(",");
    if (r && r.key === l && r.base === e) return r.rec;
    let c = s.attributes.position.count,
      h = s.morphTargetsRelative,
      f = e.posArray,
      u = new Float32Array(f),
      d = s.attributes.normal,
      p = d ? new Float32Array(c * 3) : null;
    if (p)
      for (let x = 0; x < c; x++)
        ((p[x * 3] = d.getX(x)),
          (p[x * 3 + 1] = d.getY(x)),
          (p[x * 3 + 2] = d.getZ(x)));
    let m = p && !h ? p.slice() : null;
    for (let x = 0; x < n.length; x++) {
      let v = n[x];
      if (!v || !o[x]) continue;
      let y = o[x],
        M =
          !y.isInterleavedBufferAttribute &&
          y.array instanceof Float32Array &&
          y.itemSize === 3 &&
          !y.normalized,
        S = y.array;
      for (let w = 0; w < c; w++)
        for (let z = 0; z < 3; z++) {
          let _ = M ? S[w * 3 + z] : y.getComponent(w, z);
          u[w * 3 + z] += v * (h ? _ : _ - f[w * 3 + z]);
        }
      if (p && a?.[x]) {
        let w = a[x];
        for (let z = 0; z < c; z++)
          for (let _ = 0; _ < 3; _++) {
            let R = w.getComponent(z, _);
            p[z * 3 + _] += v * (h ? R : R - m[z * 3 + _]);
          }
      }
    }
    if (p)
      for (let x = 0; x < c; x++) {
        let v = p[x * 3],
          y = p[x * 3 + 1],
          M = p[x * 3 + 2],
          S = Math.hypot(v, y, M) || 1;
        ((p[x * 3] = v / S), (p[x * 3 + 1] = y / S), (p[x * 3 + 2] = M / S));
      }
    let g = this.device,
      b = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
    return (
      (!r || r.base !== e) &&
        (r?.pos.destroy(),
        r?.nrm?.destroy(),
        (r = {
          base: e,
          pos: g.createBuffer({ size: u.byteLength, usage: b }),
          nrm: p ? g.createBuffer({ size: p.byteLength, usage: b }) : null,
        }),
        this._morphCache.set(t, r)),
      g.queue.writeBuffer(r.pos, 0, u),
      p && g.queue.writeBuffer(r.nrm, 0, p),
      (r.key = l),
      (r.rec = {
        ...e,
        pos: r.pos,
        nrm: r.nrm || e.nrm,
        posArray: u,
        lod: null,
      }),
      r.rec
    );
  }
  upload(t) {
    this.device &&
      t.traverse((e) => {
        e.isMesh &&
          e.geometry?.attributes?.position &&
          this._geometry(e.geometry, this._uvName(e), this._lmName(e));
      });
  }
  _uid(t) {
    return t ? (t[zU] ||= i._uidN = (i._uidN || 0) + 1) : 0;
  }
  _slotBegin(t) {
    let e = (this._slots ||= { free: [], top: 0, scenes: new WeakMap() }),
      s = e.scenes.get(t);
    (s || e.scenes.set(t, (s = { f: 0, used: [], prev: [] })),
      s.f++,
      (this._slotS = s));
  }
  _slotOf(t, e) {
    let s = this._slotS,
      n = this._slots,
      o = t[U5];
    if (!o || o.sc !== s) {
      if (o) for (let r of o.s) r !== void 0 && this._slotFree(r);
      o = t[U5] = {
        sc: s,
        f: -1,
        s: [],
        still: !1,
        np: 0,
        ws: [],
        mm: [],
        ms: [],
        fk: [],
      };
    }
    o.f !== s.f && ((o.f = s.f), s.used.push(t));
    let a = o.s[e];
    if (a === void 0) {
      let r = n.free;
      if (r.length) {
        a = r[0];
        let l = r.pop();
        if (r.length) {
          let c = 0;
          for (r[0] = l; ;) {
            let h = 2 * c + 1,
              f = h + 1,
              u = c;
            if (
              (h < r.length && r[h] < r[u] && (u = h),
              f < r.length && r[f] < r[u] && (u = f),
              u === c)
            )
              break;
            let d = r[c];
            ((r[c] = r[u]), (r[u] = d), (c = u));
          }
        }
      } else if (n.top < Rg) a = n.top++;
      else return -1;
      o.s[e] = a;
    }
    return a;
  }
  _slotFree(t) {
    let e = this._slots.free,
      s = e.push(t) - 1;
    for (; s > 0;) {
      let n = (s - 1) >> 1;
      if (e[n] <= e[s]) break;
      let o = e[n];
      ((e[n] = e[s]), (e[s] = o), (s = n));
    }
  }
  _slotEnd() {
    let t = this._slotS;
    for (let n of t.prev) {
      let o = n[U5];
      if (o && o.sc === t && o.f !== t.f) {
        for (let a of o.s) a !== void 0 && this._slotFree(a);
        ((o.s = []), (o.f = -1), (o.still = !1), (o.ws.length = 0));
      }
    }
    ((t.prev = t.used), (t.used = []));
    let e = this._slots.top,
      s = this._slots.free;
    if (s.length) {
      let n = new Set(s);
      for (; e > 0 && n.has(e - 1);) (n.delete(e - 1), e--);
      e !== this._slots.top &&
        ((this._slots.top = e),
        (this._slots.free = [...n].sort((o, a) => o - a)));
    }
  }
  _drawList(t, e, s = !1, n = !1) {
    for (let o of e) this._draw1(t, o, s, n);
  }
  _ops() {
    let e = (this._opsA ||= [0, 1, 2, 3].map(() => ({
      p: [],
      g2: [],
      d: [],
      f: [],
      n: 0,
    })))[(this._opsI = ((this._opsI ?? -1) + 1) % 4)];
    return ((e.n = 0), e);
  }
  _op(t, e, s, n, o) {
    let a = t.n++;
    ((t.p[a] = e), (t.g2[a] = s), (t.d[a] = n), (t.f[a] = o));
  }
  _tok(t, e, s, n, o, a, r) {
    let l = this._uidB,
      c = o.rec,
      h = o.inst;
    ((t[e] = l(s)),
      (t[e + 1] = n ? l(n) : 0),
      (t[e + 2] = o.slot),
      (t[e + 3] = a ? l(o.mat || this._defaultMat) : 0),
      (t[e + 4] = l(c.pos)),
      (t[e + 5] = l(c.joints || this._zeroBuf)),
      (t[e + 6] = l(c.weights || this._zeroBuf)),
      (t[e + 7] = l(h?.buf || this._identityBuf)),
      a
        ? ((t[e + 8] = l(c.nrm)),
          (t[e + 9] = l(c.uv)),
          (t[e + 10] = l(c.color || this._zeroBuf)),
          (t[e + 11] = l(h ? h.colorBuf || this._zeroBuf : this._onesBuf)))
        : ((t[e + 8] = 0), (t[e + 9] = 0), (t[e + 10] = 0), (t[e + 11] = 0)));
    let f = 0,
      u = 0,
      d,
      p = 0;
    (r && c.lod && !o.range
      ? ((f = l(c.lod.index)), (u = 2), (d = c.lod.count))
      : (c.index &&
          ((f = l(c.index)), (u = c.indexFormat === "uint32" ? 2 : 1)),
        o.range
          ? ((p = Math.min(o.range[0], c.count)),
            (d = Math.max(0, Math.min(o.range[1], c.count - p))))
          : (d = c.count)),
      (t[e + 12] = f),
      (t[e + 13] = u),
      (t[e + 14] = d),
      (t[e + 15] = h ? h.count : 1),
      (t[e + 16] = p));
  }
  _replayOps(t, e, s, n, o, a, r = !1) {
    ((this._bs = null), t.setBindGroup(0, o), a && t.setBindGroup(2, a));
    let l = null,
      c = a;
    for (let h = s; h < n; h++) {
      let f = e.p[h],
        u = e.g2[h];
      (u && u !== c && (t.setBindGroup(2, u), (c = u)),
        f !== l && (t.setPipeline(f), (l = f)),
        this._draw1(t, e.d[h], e.f[h], r));
    }
    this._bs = null;
  }
  _logEnc(t, e) {
    let s = (n) => this._uid(n);
    return {
      setPipeline: (n) => {
        (e.push("P" + s(n)), t?.setPipeline(n));
      },
      setBindGroup: (n, o, a, r, l) => {
        (e.push("B" + n + ":" + s(o) + ":" + (a ? a[r ?? 0] : "-")),
          a ? t?.setBindGroup(n, o, a, r, l) : t?.setBindGroup(n, o));
      },
      setVertexBuffer: (n, o) => {
        (e.push("V" + n + ":" + s(o)), t?.setVertexBuffer(n, o));
      },
      setIndexBuffer: (n, o) => {
        (e.push("I" + s(n) + o), t?.setIndexBuffer(n, o));
      },
      draw: (n, o, a) => {
        (e.push("d" + n + "," + o + "," + (a || 0)), t?.draw(n, o, a));
      },
      drawIndexed: (n, o, a) => {
        (e.push("x" + n + "," + o + "," + (a || 0)), t?.drawIndexed(n, o, a));
      },
    };
  }
  _runBundles(t, e, s, n, o, a, r = !1) {
    let l = s.n,
      c = 17,
      h = (this._bundleC ||= new Map()),
      f = this.info.render.frame,
      u = (this._bundleOut ||= []),
      d = this.info;
    this._uidB ||= (x) => (x ? (x[zU] ||= i._uidN = (i._uidN || 0) + 1) : 0);
    let p = this._tokT;
    (!p || p.length < l * c) &&
      (p = this._tokT = new Int32Array(Math.max(l * c * 2, 4096)));
    let m = (this._tokH ||= []);
    for (let x = 0; x < l; x++) {
      let v = x * c;
      this._tok(p, v, s.p[x], s.g2[x], s.d[x], s.f[x], r);
      let y = 2166136261;
      for (let M = v; M < v + c; M++) y = Math.imul(y ^ p[M], 16777619);
      m[x] = y;
    }
    let g =
      e +
      (r ? "L" : "") +
      "|" +
      a.colorFormats.join(",") +
      "|" +
      a.depthStencilFormat +
      "|" +
      (a.sampleCount || 1) +
      "|" +
      this._uidB(n) +
      "|" +
      this._uidB(o) +
      "|";
    u.length = 0;
    let b = 0;
    for (let x = 0; x < l; x++) {
      if (!(x === l - 1 || (m[x] & 15) === 0 || x - b >= 47)) continue;
      let v = x + 1,
        y = 2654435769,
        M = 2246822507;
      for (let z = b; z < v; z++)
        ((y = Math.imul(y ^ m[z], 16777619)),
          (M = Math.imul((M + m[z]) | 0, 1540483477) ^ (M >>> 15)));
      let S =
          g + (y >>> 0).toString(36) + (M >>> 0).toString(36) + ":" + (v - b),
        w = h.get(S);
      if (w) {
        let z = w.tok;
        if (w.g0 !== n || w.g2 !== o || z.length !== (v - b) * c) w = null;
        else
          for (let _ = 0, R = b * c; _ < z.length; _++)
            if (z[_] !== p[R + _]) {
              w = null;
              break;
            }
      }
      if (w && this.bundleCheck) {
        let z = [];
        (this._replayOps(this._logEnc(null, z), s, b, v, n, o, r),
          w.log
            ? z.join("|") !== w.log.join("|") &&
              ((d.bundleMismatch = (d.bundleMismatch || 0) + 1),
              d.bundleMismatch <= 3 &&
                console.error(
                  "render bundle mismatch",
                  e,
                  w.log.slice(0, 12).join(" "),
                  "|",
                  z.slice(0, 12).join(" "),
                ),
              (w = null))
            : (w.log = z));
      }
      if (!w) {
        let z = this.device.createRenderBundleEncoder(a),
          _ = this.bundleCheck ? [] : null;
        (this._replayOps(_ ? this._logEnc(z, _) : z, s, b, v, n, o, r),
          (w = {
            bundle: z.finish(),
            tok: p.slice(b * c, v * c),
            g0: n,
            g2: o,
            log: _,
            used: f,
          }),
          h.set(S, w),
          (d.bundlesRecorded = (d.bundlesRecorded || 0) + 1));
      }
      ((w.used = f), u.push(w.bundle), (b = v));
    }
    if (
      ((d.bundlesRun = (d.bundlesRun || 0) + u.length),
      t.executeBundles(u),
      (this._bs = null),
      f - (this._bundleSweep || 0) > 120)
    ) {
      this._bundleSweep = f;
      for (let [x, v] of h) f - v.used > 360 && h.delete(x);
    }
  }
  _draw1(t, e, s = !1, n = !1) {
    let o = this._bs;
    (!o || o.pass !== t) &&
      (o = this._bs =
        {
          pass: t,
          vb: [null, null, null, null, null, null, null, null],
          g1: null,
          off: -1,
          g3: null,
          ib: null,
          ibf: null,
        });
    let a = o.vb,
      r = e.rec;
    {
      let l = e.slot * Ya;
      if (o.off !== l || o.g1 !== this.objGroup) {
        let d = (this._offA ||= new Uint32Array(1));
        ((d[0] = l),
          t.setBindGroup(1, this.objGroup, d, 0, 1),
          (o.off = l),
          (o.g1 = this.objGroup));
      }
      a[0] !== r.pos && (t.setVertexBuffer(0, r.pos), (a[0] = r.pos));
      let c = r.joints || this._zeroBuf,
        h = r.weights || this._zeroBuf,
        f = e.inst?.buf || this._identityBuf;
      if (s) {
        let d = e.mat || this._defaultMat;
        o.g3 !== d && (t.setBindGroup(3, d), (o.g3 = d));
        let p = r.color || this._zeroBuf,
          m = e.inst ? e.inst.colorBuf || this._zeroBuf : this._onesBuf;
        (a[1] !== r.nrm && (t.setVertexBuffer(1, r.nrm), (a[1] = r.nrm)),
          a[2] !== r.uv && (t.setVertexBuffer(2, r.uv), (a[2] = r.uv)),
          a[3] !== c && (t.setVertexBuffer(3, c), (a[3] = c)),
          a[4] !== h && (t.setVertexBuffer(4, h), (a[4] = h)),
          a[5] !== p && (t.setVertexBuffer(5, p), (a[5] = p)),
          a[6] !== f && (t.setVertexBuffer(6, f), (a[6] = f)),
          a[7] !== m && (t.setVertexBuffer(7, m), (a[7] = m)));
      } else
        (a[1] !== c && (t.setVertexBuffer(1, c), (a[1] = c)),
          a[2] !== h && (t.setVertexBuffer(2, h), (a[2] = h)),
          a[3] !== f && (t.setVertexBuffer(3, f), (a[3] = f)));
      let u = e.inst ? e.inst.count : 1;
      if (e.line) {
        let d = this._lineIndex(e.rec, e.line);
        (this._ib(t, o, d.index, "uint32"), t.drawIndexed(d.count, u));
      } else if (n && e.rec.lod && !e.range)
        (this._ib(t, o, e.rec.lod.index, "uint32"),
          t.drawIndexed(e.rec.lod.count, u));
      else if (e.rec.index)
        if ((this._ib(t, o, e.rec.index, e.rec.indexFormat), e.range)) {
          let d = Math.min(e.range[0], e.rec.count),
            p = Math.min(e.range[1], e.rec.count - d);
          p > 0 && t.drawIndexed(p, u, d);
        } else t.drawIndexed(e.rec.count, u);
      else if (e.range) {
        let d = Math.min(e.range[0], e.rec.count),
          p = Math.min(e.range[1], e.rec.count - d);
        p > 0 && t.draw(p, u, d);
      } else t.draw(e.rec.count, u);
    }
  }
  _ib(t, e, s, n) {
    (e.ib !== s || e.ibf !== n) &&
      (t.setIndexBuffer(s, n), (e.ib = s), (e.ibf = n));
  }
  _lineIndex(t, e) {
    if (((t.lines ||= {}), t.lines[e])) return t.lines[e];
    let s = t.indexArray || Uint32Array.from({ length: t.count }, (r, l) => l),
      n = s.length,
      o;
    if (e === "seg")
      o = Uint32Array.from(
        s.subarray ? s.subarray(0, n - (n & 1)) : s.slice(0, n - (n & 1)),
      );
    else if (e === "wire") {
      o = new Uint32Array(Math.floor(n / 3) * 6);
      for (let r = 0, l = 0; r + 2 < n; r += 3) {
        let c = s[r],
          h = s[r + 1],
          f = s[r + 2];
        ((o[l++] = c),
          (o[l++] = h),
          (o[l++] = h),
          (o[l++] = f),
          (o[l++] = f),
          (o[l++] = c));
      }
    } else {
      let r = e === "loop" ? n : n - 1;
      o = new Uint32Array(Math.max(r, 0) * 2);
      for (let l = 0; l < r; l++)
        ((o[2 * l] = s[l]), (o[2 * l + 1] = s[(l + 1) % n]));
    }
    let a = this.device.createBuffer({
      size: Math.max(4, o.byteLength),
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });
    return (
      o.length && this.device.queue.writeBuffer(a, 0, o),
      (t.lines[e] = { index: a, count: o.length })
    );
  }
  async _buildLods(t) {
    if (!(this._lodBusy || this.reflectionLod === !1)) {
      this._lodBusy = !0;
      try {
        if (!this._lodWorker && globalThis.MB_LOD_WORKER) {
          let s = (this._lodWorker = new Worker(globalThis.MB_LOD_WORKER, {
              type: "module",
            })),
            n = (this._lodWait = new Map()),
            o = 0;
          ((s.onmessage = ({ data: a }) => {
            let r = n.get(a.id);
            (n.delete(a.id), r?.(a));
          }),
            (this._lodSimplify = (a, r, l) =>
              new Promise((c, h) => {
                let f = ++o;
                (n.set(f, (u) => (u.err ? h(new Error(u.err)) : c(u.out))),
                  s.postMessage({ id: f, idx: a, pos: r, target: l }, [
                    a.buffer,
                    r.buffer,
                  ]));
              })));
        }
        let e = this._lodWorker
          ? null
          : (await Promise.resolve().then(() => (YA(), KA))).MeshoptSimplifier;
        e && (await e.ready);
        for (let s of t) {
          if (
            s.lod !== void 0 ||
            s.freed ||
            !s.posArray ||
            !s.indexArray ||
            s.count < 6e3 ||
            s.indexArray.length % 3
          ) {
            ((s.lod ??= null), s.dropCpu && (s.posArray = s.indexArray = null));
            continue;
          }
          let n = new Uint32Array(s.indexArray),
            o = Math.floor(s.count / 4 / 3) * 3,
            a;
          try {
            a = e
              ? e.simplify(n, s.posArray, 3, o, 0.01, [])[0]
              : await this._lodSimplify(n, s.posArray.slice(), o);
          } catch {
            s.lod = null;
            continue;
          }
          if (a.length >= s.count * 0.8) {
            s.lod = null;
            continue;
          }
          let r = this.device.createBuffer({
            size: a.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
          });
          (this.device.queue.writeBuffer(r, 0, a),
            (s.lod = { index: r, count: a.length }),
            s.dropCpu && (s.posArray = s.indexArray = null),
            s.freed && r.destroy(),
            e && (await new Promise((l) => setTimeout(l, 0))));
        }
      } catch (e) {
        (console.warn("reflection LOD unavailable", e),
          (this.reflectionLod = !1));
      }
      this._lodBusy = !1;
    }
  }
  _sampler(t, e, s = 1006, n = 1008) {
    let o = t + ":" + e + ":" + s + ":" + n,
      a = this._samplers.get(o),
      r = (l) =>
        l === 1001 ? "clamp-to-edge" : l === 1002 ? "mirror-repeat" : "repeat";
    if (!a) {
      let l = s === 1003 ? "nearest" : "linear",
        c = n >= 1003 && n <= 1005 ? "nearest" : "linear",
        h = n === 1005 || n === 1008 ? "linear" : "nearest",
        f = n === 1003 || n === 1006,
        u = l === "linear" && c === "linear" && h === "linear";
      this._samplers.set(
        o,
        (a = this.device.createSampler({
          addressModeU: r(t),
          addressModeV: r(e),
          magFilter: l,
          minFilter: c,
          mipmapFilter: h,
          ...(f ? { lodMaxClamp: 0 } : {}),
          maxAnisotropy: u ? 8 : 1,
        })),
      );
    }
    return a;
  }
  _texture(t) {
    let e = t?.image;
    if (!e || t.isRenderTargetTexture || Array.isArray(e)) return null;
    let s = this._texCache.get(t);
    if (s && s.version === t.version) return s.tex;
    let n = e.width || e.videoWidth,
      o = e.height || e.videoHeight;
    if (!n || !o || e.complete === !1 || e.released) return s?.tex || null;
    let a = this.device,
      r = t.colorSpace === "srgb",
      l = null,
      c = !1;
    if (e.data) {
      let b = e.data,
        x = t.format === 1028 ? 1 : t.format === 1030 ? 2 : 4,
        v = n * o;
      if (
        ((c = b instanceof Float32Array || t.type === 1016 || t.type === 1015),
        c)
      ) {
        let y = t.type === 1016 && b instanceof Uint16Array,
          M = new Uint16Array(v * 4),
          S = (i._f2h ||= (() => {
            let w = new Float32Array(1),
              z = new Uint32Array(w.buffer);
            return (_) => {
              w[0] = _;
              let R = z[0],
                T = (R >>> 16) & 32768,
                E = ((R >>> 23) & 255) - 112,
                A = R & 8388607;
              return E <= 0
                ? T
                : E >= 31
                  ? T | 31744
                  : T | (E << 10) | (A >>> 13);
            };
          })());
        for (let w = 0; w < v; w++)
          for (let z = 0; z < 4; z++) {
            let _ =
              z < x
                ? y
                  ? b[w * x + z]
                  : S(b[w * x + z])
                : z === 3
                  ? 15360
                  : x === 1
                    ? y
                      ? b[w]
                      : S(b[w])
                    : 0;
            M[w * 4 + z] = _;
          }
        l = M;
      } else if (x === 4 && b instanceof Uint8Array) l = b;
      else {
        let y = new Uint8Array(v * 4);
        for (let M = 0; M < v; M++)
          for (let S = 0; S < 4; S++)
            y[M * 4 + S] =
              S < x ? b[M * x + S] : S === 3 ? 255 : x === 1 ? b[M] : 0;
        l = y;
      }
      if (t.flipY) {
        let y = n * 4,
          M = new l.constructor(y);
        for (let S = 0; S < o >> 1; S++) {
          let w = S * y,
            z = (o - 1 - S) * y;
          (M.set(l.subarray(w, w + y)), l.copyWithin(w, z, z + y), l.set(M, z));
        }
      }
    }
    let h = c ? "rgba16float" : r ? "rgba8unorm-srgb" : "rgba8unorm",
      f =
        t.generateMipmaps === !1 && e.data
          ? 1
          : Math.floor(Math.log2(Math.max(n, o))) + 1;
    s?.tex.destroy();
    let u = 0,
      d = this.maxTextureSize || 0;
    if (d && !l) for (; f - u > 1 && Math.max(n >> u, o >> u) > d;) u++;
    let p =
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
      m = a.createTexture({
        size: [n, o],
        format: h,
        mipLevelCount: f,
        usage: p | (u ? GPUTextureUsage.COPY_SRC : 0),
      });
    (l
      ? a.queue.writeTexture(
          { texture: m },
          l,
          { bytesPerRow: n * (c ? 8 : 4) },
          [n, o],
        )
      : a.queue.copyExternalImageToTexture(
          { source: e, flipY: t.flipY },
          {
            texture: m,
            premultipliedAlpha: !!t.premultiplyAlpha || !!e.sfOpaque,
          },
          [n, o],
        ),
      this._mipmaps(m, h, f));
    let g = m;
    if (u) {
      g = a.createTexture({
        size: [Math.max(1, n >> u), Math.max(1, o >> u)],
        format: h,
        mipLevelCount: f - u,
        usage: p,
      });
      let b = a.createCommandEncoder();
      for (let x = 0; x < f - u; x++)
        b.copyTextureToTexture(
          { texture: m, mipLevel: x + u },
          { texture: g, mipLevel: x },
          [Math.max(1, n >> (x + u)), Math.max(1, o >> (x + u))],
        );
      (a.queue.submit([b.finish()]), m.destroy());
    }
    return (
      this._texCache.set(t, { tex: g, version: t.version }),
      !l && this.onTextureUploaded
        ? this.onTextureUploaded(t, e)
        : l &&
          t.userData?.mbDropData &&
          (t.image = { width: n, height: o, released: !0 }),
      g
    );
  }
  _blitPipe(t) {
    if (((this._blitPipes ||= {}), !this._blitPipes[t])) {
      let e = this.device.createShaderModule({
        label: "blit",
        code: `
        @group(0) @binding(0) var src: texture_2d<f32>;
        @group(0) @binding(1) var smp: sampler;
        struct VO { @builtin(position) p: vec4f, @location(0) uv: vec2f };
        @vertex fn vs(@builtin(vertex_index) vi: u32) -> VO {
          let x = f32((vi << 1u) & 2u); let y = f32(vi & 2u); var o: VO; o.p = vec4f(x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0); o.uv = vec2f(x, 1.0 - y); return o; }
        @fragment fn fs(i: VO) -> @location(0) vec4f { return textureSample(src, smp, i.uv); }`,
      });
      this._blitPipes[t] = this.device.createRenderPipeline({
        layout: this.device.createPipelineLayout({
          bindGroupLayouts: [this.mipLayout],
        }),
        vertex: { module: e, entryPoint: "vs" },
        fragment: { module: e, entryPoint: "fs", targets: [{ format: t }] },
      });
    }
    return this._blitPipes[t];
  }
  _blit(t, e, s, n) {
    let o = this.device.createBindGroup({
        layout: this.mipLayout,
        entries: [
          { binding: 0, resource: e.createView() },
          { binding: 1, resource: this.linSampler },
        ],
      }),
      a = t.beginRenderPass({
        colorAttachments: [{ view: s, loadOp: "clear", storeOp: "store" }],
      });
    (a.setPipeline(this._blitPipe(n)),
      a.setBindGroup(0, o),
      a.draw(3),
      a.end());
  }
  _mipmaps(t, e, s) {
    if (s < 2) return;
    let n = this.device;
    if (((this._mipPipes ||= {}), !this._mipPipes[e])) {
      let a = n.createShaderModule({ code: QA });
      this._mipPipes[e] = n.createRenderPipeline({
        layout: n.createPipelineLayout({ bindGroupLayouts: [this.mipLayout] }),
        vertex: { module: a, entryPoint: "vs" },
        fragment: { module: a, entryPoint: "fs", targets: [{ format: e }] },
      });
    }
    let o = n.createCommandEncoder();
    for (let a = 1; a < s; a++) {
      let r = n.createBindGroup({
          layout: this.mipLayout,
          entries: [
            {
              binding: 0,
              resource: t.createView({ baseMipLevel: a - 1, mipLevelCount: 1 }),
            },
            { binding: 1, resource: this.linSampler },
          ],
        }),
        l = o.beginRenderPass({
          colorAttachments: [
            {
              view: t.createView({ baseMipLevel: a, mipLevelCount: 1 }),
              loadOp: "clear",
              storeOp: "store",
            },
          ],
        });
      (l.setPipeline(this._mipPipes[e]),
        l.setBindGroup(0, r),
        l.draw(3),
        l.end());
    }
    n.queue.submit([o.finish()]);
  }
  _matBlock(t, e, s, n, o, a) {
    let r = a.get(t);
    if (r) return r;
    let l = Ya / 4,
      c = (this._matP ||= new WeakMap()).get(t);
    c ||
      this._matP.set(
        t,
        (c = {
          a: new Float32Array(l),
          q: new Float32Array(l),
          stamp: 0,
          init: !1,
        }),
      );
    let h = this._fillMat(c.a, 0, t, e, s, n, null, o, !1),
      f = c.a,
      u = c.q,
      d = c.init;
    if (d)
      for (let p = 0; p < 3 && d; p++) {
        let m = p === 0 ? 36 : p === 1 ? 76 : 157,
          g = p === 0 ? 48 : p === 1 ? 140 : 176;
        for (let b = m; b < g; b++)
          if (
            f[b] !== u[b] &&
            b !== 88 &&
            b !== 91 &&
            b !== 118 &&
            b !== 130 &&
            b !== 138 &&
            b !== 139
          ) {
            d = !1;
            break;
          }
      }
    return (
      d || (c.stamp++, u.set(f), (c.init = !0)),
      (r = { a: f, group: h, stamp: c.stamp }),
      a.set(t, r),
      r
    );
  }
  _fillMatMemo(t, e, s, n, o, a, r, l, c, h) {
    if (r || c) return this._fillMat(t, e, s, n, o, a, r, l, c);
    let f = this._matBlock(s, n, o, a, l, h),
      u = f.a;
    for (let d = 36; d < 48; d++) t[e + d] = u[d];
    for (let d = 76; d < 140; d++) t[e + d] = u[d];
    for (let d = 157; d < 176; d++) t[e + d] = u[d];
    return (
      (t[e + 88] = s.vertexColors && o.color ? 1 : 0),
      (t[e + 91] = n.isInstancedMesh && n.instanceColor ? 1 : 0),
      (t[e + 118] = s.flatShading || !n.geometry.attributes.normal ? 1 : 0),
      (t[e + 130] = this.neural || n.receiveShadow ? 1 : 0),
      (t[e + 138] =
        n.isPoints || n.isSprite ? 2 : s.side === 1 ? 1 : s.side === 2 ? 2 : 0),
      (t[e + 139] = n.matrixWorld.determinant() < 0 ? 1 : 0),
      f.group
    );
  }
  _fillMat(t, e, s, n, o, a, r, l, c) {
    let h = s.color || { r: 1, g: 1, b: 1 };
    ((t[e + 36] = h.r),
      (t[e + 37] = h.g),
      (t[e + 38] = h.b),
      (t[e + 39] = s.opacity ?? 1),
      (t[e + 40] = s.roughness ?? 0.5),
      (t[e + 41] = s.metalness ?? 0));
    let f = r && l?.analytic?.includes(n.name.replace(/_\d+$/, ""));
    ((t[e + 42] = f ? 1 + (s.clearcoat || 0) : 0),
      (t[e + 43] = s.clearcoatRoughness ?? 0));
    let u =
        r && !c && !s.userData?.mbNeuralMaps
          ? this._defaultMat
          : this._material(s),
      d = u !== this._defaultMat,
      p = this.fullMat,
      m = (I, L) => !!I && d && (L === void 0 || this._matSlots.includes(L)),
      g = r && !l.emissive?.[n.name.replace(/_\d+$/, "")] ? null : s.emissive,
      b = s.emissiveIntensity ?? 1,
      x = !s.emissiveMap || m(s.emissiveMap, 8);
    ((t[e + 44] = g && x ? g.r * b : 0),
      (t[e + 45] = g && x ? g.g * b : 0),
      (t[e + 46] = g && x ? g.b * b : 0));
    let v = s.map || s.matcap || null,
      y = s.normalMap || s.bumpMap || null,
      M =
        v ||
        y ||
        s.alphaMap ||
        s.roughnessMap ||
        s.aoMap ||
        s.emissiveMap ||
        null;
    M?.matrixAutoUpdate && M.updateMatrix();
    let S = M ? M.matrix.elements : null;
    ((t[e + 76] = S ? S[0] : 1),
      (t[e + 77] = S ? S[3] : 0),
      (t[e + 78] = S ? S[6] : 0),
      (t[e + 79] = s.userData?.mbAtlas4 ? 1 : 0),
      (t[e + 80] = S ? S[1] : 0),
      (t[e + 81] = S ? S[4] : 1),
      (t[e + 82] = S ? S[7] : 0),
      (t[e + 83] =
        s.userData?.mbLandmarkFallback !== void 0
          ? 5 + s.userData.mbLandmarkFallback
          : s.userData?.mbVertexFallback
            ? 4
            : s.userData?.mbTrafficFallback
              ? 3
              : s.userData?.mbPaletteFallback || 0),
      (t[e + 84] = m(v) ? 1 : 0),
      (t[e + 85] = m(y) ? (s.normalMap ? 1 : 2) : 0),
      (t[e + 86] = s.alphaTest || 0),
      (t[e + 87] =
        s.isMeshBasicMaterial ||
        s.isLineBasicMaterial ||
        s.isPointsMaterial ||
        s.isSpriteMaterial ||
        s.isMeshDepthMaterial ||
        s.isMeshDistanceMaterial
          ? 2
          : s.isMeshLambertMaterial
            ? 1
            : s.isMeshNormalMaterial
              ? 3
              : s.isMeshMatcapMaterial
                ? 4
                : s.isMeshPhongMaterial
                  ? 5
                  : s.isMeshToonMaterial
                    ? 6
                    : 0),
      (t[e + 88] = s.vertexColors && o.color ? 1 : 0),
      (t[e + 89] = s.fog !== !1 && a.fog ? 1 : 0),
      (t[e + 90] = s.normalMap ? s.normalScale.x : (s.bumpScale ?? 1)),
      (t[e + 91] = n.isInstancedMesh && n.instanceColor ? 1 : 0));
    let w = m(s.lightMap),
      z = s.userData?.lightMapLog;
    ((t[e + 92] = w ? (s.lightMapIntensity ?? 1) : 0),
      (t[e + 93] = z ? Math.log2(1 + z.k * z.max) : 0),
      (t[e + 94] = z ? z.k : 1),
      (t[e + 95] = s.userData?.bakedIndirect ? 1 : 0),
      t.fill(0, e + 96, e + 140),
      (t[e + 96] = s.transmission || 0),
      (t[e + 97] = s.thickness ?? 0),
      (t[e + 98] = s.ior ?? 1.5),
      (t[e + 99] = s.toneMapped === !1 ? 1 : 0),
      s.attenuationColor &&
        ((t[e + 100] = s.attenuationColor.r),
        (t[e + 101] = s.attenuationColor.g),
        (t[e + 102] = s.attenuationColor.b),
        (t[e + 103] = Number.isFinite(s.attenuationDistance)
          ? s.attenuationDistance
          : 0)),
      (t[e + 104] = m(s.alphaMap) && !s.userData?.mbExtraMap ? 1 : 0),
      (t[e + 105] = s.specularIntensity ?? 1),
      (t[e + 107] = s.userData?.mbSkyVis || 0));
    let _ = s.normalMap;
    ((t[e + 106] =
      _ && Math.max(Math.abs(_.repeat.x), Math.abs(_.repeat.y)) >= 8
        ? (this.detailVariance ?? 0.2) * (s.normalScale?.x ?? 1) ** 2
        : 0),
      (t[e + 108] = m(s.roughnessMap, 5) ? 1 : 0),
      (t[e + 109] = m(s.metalnessMap, 6) ? 1 : 0),
      (t[e + 110] = m(s.aoMap, 7) ? Math.max(s.aoMapIntensity ?? 1, 0.001) : 0),
      (t[e + 111] = m(s.emissiveMap, 8) ? 1 : 0),
      (t[e + 112] = s.clearcoat || 0),
      (t[e + 113] = s.clearcoatRoughness ?? 0),
      (t[e + 114] = m(s.clearcoatMap, 9) ? 1 : 0),
      (t[e + 115] = m(s.clearcoatRoughnessMap, 10) ? 1 : 0),
      (t[e + 116] = m(s.clearcoatNormalMap, 11) ? 1 : 0),
      (t[e + 117] = s.clearcoatNormalScale?.x ?? 1),
      (t[e + 118] = s.flatShading || !n.geometry.attributes.normal ? 1 : 0),
      (t[e + 119] = s.sheen || 0));
    let R = s.isMeshPhongMaterial ? s.specular : s.specularColor;
    ((t[e + 120] = R ? R.r : 1),
      (t[e + 121] = R ? R.g : 1),
      (t[e + 122] = R ? R.b : 1),
      (t[e + 123] = Math.max(s.shininess ?? 30, 1e-4)),
      (t[e + 124] = m(s.specularIntensityMap || s.specularMap, 12) ? 1 : 0),
      (t[e + 125] = m(s.specularColorMap, 13) ? 1 : 0),
      (t[e + 126] = m(s.transmissionMap, 14) ? 1 : 0),
      (t[e + 127] = m(s.thicknessMap, 15) ? 1 : 0));
    let T = t[e + 87] === 0,
      E =
        T && (r || this.neural || this._skyActive || a.environment || s.envMap);
    if (
      ((t[e + 128] = E ? (s.envMapIntensity ?? 1) : 0),
      !T && s.envMap && t[e + 87] !== 3 && t[e + 87] !== 4)
    ) {
      let I = s.reflectivity ?? 1,
        L = s.combine ?? 0;
      t[e + 129] = L === 1 ? -(1 + I) : L === 2 ? 3 + I : 1 + I;
    }
    ((t[e + 130] = this.neural || n.receiveShadow ? 1 : 0),
      (t[e + 131] = (s.transmission || 0) > 0 ? (s.transparent ? 2 : 1) : 0),
      s.sheenColor &&
        ((t[e + 132] = s.sheenColor.r),
        (t[e + 133] = s.sheenColor.g),
        (t[e + 134] = s.sheenColor.b)),
      (t[e + 135] = s.sheenRoughness ?? 1),
      (t[e + 136] = s.isMeshPhysicalMaterial ? (s.ior ?? 1.5) : 1.5),
      (t[e + 137] =
        s.aoMap && (s.aoMap.channel ?? 0) > 0 && !s.lightMap ? 1 : 0),
      (t[e + 138] =
        r || n.isPoints || n.isSprite
          ? 2
          : s.side === 1
            ? 1
            : s.side === 2
              ? 2
              : 0),
      (t[e + 139] = n.matrixWorld.determinant() < 0 ? 1 : 0));
    let A = s.normalScale,
      C = s.clearcoatNormalScale;
    ((t[e + 157] = A && A.x ? A.y / A.x : 1),
      (t[e + 158] = C && C.x ? C.y / C.x : 1),
      (t[e + 159] = s.userData?.mbWind || 0));
    let P = s.userData?.mbWheels;
    return (P ? t.set(P, e + 160) : t.fill(0, e + 160, e + 176), u);
  }
  _matMaps(t) {
    return {
      0: t.map || t.matcap || null,
      1: t.normalMap || t.bumpMap || t.userData?.mbMap1 || null,
      3: t.lightMap || t.userData?.mbMap3 || null,
      4: t.userData?.mbExtraMap || t.alphaMap || null,
      5: t.roughnessMap || null,
      6: t.metalnessMap || null,
      7: t.aoMap || null,
      8: t.emissiveMap || t.userData?.mbMap8 || null,
      9: t.clearcoatMap || null,
      10: t.clearcoatRoughnessMap || null,
      11: t.clearcoatNormalMap || null,
      12: t.specularIntensityMap || t.specularMap || null,
      13: t.specularColorMap || null,
      14: t.transmissionMap || null,
      15: t.thicknessMap || null,
    };
  }
  _material(t) {
    let e = this._matMaps(t),
      s = this._matSlots,
      n = this._matCache.get(t);
    if (n) {
      let c = !0;
      for (let h = 0; h < s.length; h++) {
        let f = e[s[h]] || null;
        if (f !== n.list[h] || (f && f.version !== n.vers[h])) {
          c = !1;
          break;
        }
      }
      if (c) return n.group;
    }
    let o = s.map((c) => e[c] || null);
    if (o.every((c) => !c)) return this._defaultMat;
    let a = o.map((c) => this._texture(c));
    if (o.some((c, h) => c && !a[h])) return n?.group || this._defaultMat;
    let r = o.find(Boolean),
      l = this.device.createBindGroup({
        layout: this.matLayout,
        entries: [
          {
            binding: 2,
            resource: this._sampler(r.wrapS, r.wrapT, r.magFilter, r.minFilter),
          },
          ...s.map((c, h) => ({
            binding: c,
            resource: (
              a[h] || (c === 1 || c === 11 ? this._flat : this._white)
            ).createView(),
          })),
        ],
      });
    return (
      this._matCache.set(t, {
        list: o,
        vers: o.map((c) => c && c.version),
        group: l,
      }),
      l
    );
  }
  prewarm(t, { planar: e = !1, priority: s = 0 } = {}) {
    if (!this._mkHook) return 0;
    let n = 0,
      o = new Set(),
      a = this.fullMat && this.samples === 1 && this.depthPrepass !== !1,
      r = (l) => {
        let c = l?.userData?.mbAlbedo;
        !c ||
          o.has(l) ||
          (o.add(l),
          n++,
          this._hookPipe(c, !1, s),
          a && !l.transparent && !(l.alphaTest > 0) && this._hookPipe(c, !0, s),
          e && this._hookPipe(c, "lin", s));
      };
    return (
      Array.isArray(t)
        ? t.forEach(r)
        : t.traverse((l) => {
            if (l.isMesh)
              for (let c of Array.isArray(l.material)
                ? l.material
                : [l.material])
                r(c);
          }),
      n
    );
  }
  materialStatus(t, { planar: e = !1, priority: s = 0 } = {}) {
    (this.prewarm(t, { planar: e, priority: s }), this.warmTextures(t));
    let n = new Set(),
      o = new Set(),
      a = new Set(),
      r = this.fullMat && this.samples === 1 && this.depthPrepass !== !1;
    return (
      t.traverse((l) => {
        if (l.isMesh)
          for (let c of Array.isArray(l.material) ? l.material : [l.material]) {
            if (!c || a.has(c)) continue;
            a.add(c);
            let h = c.userData?.mbAlbedo;
            h &&
              (n.add(this._hooks?.get(h)),
              r &&
                !c.transparent &&
                !(c.alphaTest > 0) &&
                n.add(this._hooksEq?.get(h)),
              e && n.add(this._hooksLin?.get(h)));
            let f = this._matMaps(c);
            for (let u of this._matSlots) {
              let d = f[u];
              d && !d.isRenderTargetTexture && o.add(d);
            }
          }
      }),
      {
        pending:
          [...n].filter((l) => !l?.p && !l?.error).length +
          [...o].filter((l) => this._texCache.get(l)?.version !== l.version)
            .length,
        failed: [...n].filter((l) => l?.error).length,
      }
    );
  }
  retryMaterials(t) {
    (t.traverse((e) => {
      for (let s of [].concat(e.material || [])) {
        let n = s.userData?.mbAlbedo;
        if (n)
          for (let o of [this._hooks, this._hooksEq, this._hooksLin]) {
            let a = o?.get(n);
            a?.error &&
              ((a.ready = null),
              (a.error = null),
              (a.retryAt = 0),
              (a.recoveries = 0));
          }
      }
    }),
      this.prewarm(t, { priority: 1 }));
  }
  async prepareMaterials(t, { timeoutMs: e = 15e3 } = {}) {
    this.prewarm(t);
    let s = new Set(),
      n = this.fullMat && this.samples === 1 && this.depthPrepass !== !1,
      o = (l) => {
        let c = l?.userData?.mbAlbedo;
        if (!c) return;
        let h = this._hooks?.get(c);
        if ((h && s.add(h), n && !l.transparent && !(l.alphaTest > 0))) {
          let f = this._hooksEq?.get(c);
          f && s.add(f);
        }
      };
    Array.isArray(t)
      ? t.forEach(o)
      : t.traverse((l) => {
          if (l.isMesh)
            for (let c of Array.isArray(l.material) ? l.material : [l.material])
              o(c);
        });
    let a = () => ({
      total: s.size,
      pending: [...s].filter((l) => !l.p && !l.error).length,
      failed: [...s].filter((l) => l.error).length,
    });
    this.materialPreparation = a();
    let r;
    try {
      await Promise.race([
        Promise.all([...s].map((l) => l.ready)),
        new Promise((l) => {
          r = setTimeout(l, e);
        }),
      ]);
    } finally {
      clearTimeout(r);
    }
    return (this.materialPreparation = a());
  }
  _fitDynShadow(t, e, s) {
    let n = this._dynS || [];
    if (
      ((this._dynS = null),
      (t[80] = 1),
      (t[81] = 1),
      (t[82] = 0),
      (t[83] = 0),
      (t[480] = 0),
      !(e.intensity > 0) || !this._sunShadowOn || this.nearShadow === !1)
    ) {
      this._nearOn = !1;
      return;
    }
    let o = s.matrixWorld.elements,
      a = -o[8],
      r = -o[10],
      l = Math.hypot(a, r) || 1,
      c = this.nearShadowR ?? 24,
      h = o[12] + (a / l) * 14 - c,
      f = h + 2 * c,
      u = o[14] + (r / l) * 14 - c,
      d = u + 2 * c,
      p = o[13] - 30,
      m = o[13] + 10;
    for (let C = 0; C < n.length; C += 4) {
      let P = n[C + 3];
      Math.hypot(n[C] - (h + f) / 2, n[C + 2] - (u + d) / 2) > c * 2.5 ||
        ((h = Math.min(h, n[C] - P)),
        (f = Math.max(f, n[C] + P)),
        (p = Math.min(p, n[C + 1] - P)),
        (m = Math.max(m, n[C + 1] + P)),
        (u = Math.min(u, n[C + 2] - P)),
        (d = Math.max(d, n[C + 2] + P)));
    }
    let g = new xt((h + f) / 2, (p + m) / 2, (u + d) / 2),
      b = (Math.hypot(f - h, d - u) / 2) * 0.75 + 0.35,
      x = Math.min(b, this._shadowHalf),
      v = e.dir.clone().normalize(),
      y = new xt(0, 1, 0).cross(v);
    (y.lengthSq() < 1e-6 && y.set(1, 0, 0), y.normalize());
    let M = v.clone().cross(y),
      S = (2 * x) / this._shadowRes,
      w = Math.round(g.dot(y) / S) * S,
      z = Math.round(g.dot(M) / S) * S,
      _ = g.dot(v);
    g.copy(y).multiplyScalar(w).addScaledVector(M, z).addScaledVector(v, _);
    let R = (this._lightCamD ||= new Lr()),
      T = 400;
    ((R.left = -x),
      (R.right = x),
      (R.top = x),
      (R.bottom = -x),
      (R.near = 0.05),
      (R.far = T + 200),
      R.position.copy(g).addScaledVector(v, T),
      R.up.copy(M),
      R.lookAt(g),
      R.updateMatrixWorld(),
      R.updateProjectionMatrix());
    let E = (this._lightVPD ||= new ye())
      .multiplyMatrices(V1, R.projectionMatrix)
      .multiply(R.matrixWorldInverse);
    (t.set(E.elements, 464),
      (t[480] = 1 / this._shadowRes),
      (t[481] = R.far - R.near),
      (t[482] = 1 / (2 * x)),
      (t[483] = t[63]),
      (this._near = { C: g, lx: y, ly: M, half: x }),
      (this._nearOn = !0));
    let A = (this._frameDynData ||= new Float32Array(t.length));
    (A.set(t),
      A.set(E.elements, 44),
      (A[60] = t[480]),
      (A[61] = t[481]),
      (A[62] = t[482]),
      this.device.queue.writeBuffer(this.frameBufDyn, 0, A));
  }
  _inNearCore(t) {
    let e = this._near;
    if (!e || t.sr === void 0) return !1;
    let s = t.sx * e.lx.x + t.sy * e.lx.y + t.sz * e.lx.z - e.C.dot(e.lx),
      n = t.sx * e.ly.x + t.sy * e.ly.y + t.sz * e.ly.z - e.C.dot(e.ly),
      o = e.half * 0.38 - t.sr;
    return Math.abs(s) < o && Math.abs(n) < o;
  }
  _nearCasters(t) {
    let e = this._near,
      s = e.C.dot(e.lx),
      n = e.C.dot(e.ly),
      o = [];
    for (let a of t) {
      if (a.sr === void 0) {
        o.push(a);
        continue;
      }
      let r = a.sx * e.lx.x + a.sy * e.lx.y + a.sz * e.lx.z - s,
        l = a.sx * e.ly.x + a.sy * e.ly.y + a.sz * e.ly.z - n;
      Math.abs(r) < e.half + a.sr && Math.abs(l) < e.half + a.sr && o.push(a);
    }
    return o;
  }
  pendingTextures(t) {
    let e = new Set(),
      s = new Set();
    return (
      t.traverse((n) => {
        if (!(!n.isMesh && !n.isSprite && !n.isPoints)) {
          for (let o of Array.isArray(n.material) ? n.material : [n.material])
            if (!(!o || s.has(o))) {
              s.add(o);
              for (let a of Object.values(this._matMaps(o))) {
                if (!a?.image || a.isRenderTargetTexture) continue;
                let r = this._texCache.get(a);
                (!r || r.version !== a.version) && e.add(a);
              }
            }
        }
      }),
      [...e]
    );
  }
  warmTextures(t) {
    if (!this.device) return;
    let e = new Set();
    t.traverse((s) => {
      if (!(!s.isMesh && !s.isSprite && !s.isPoints)) {
        for (let n of Array.isArray(s.material) ? s.material : [s.material])
          if (n && !e.has(n)) {
            e.add(n);
            try {
              this._material(n);
            } catch {}
          }
      }
    });
  }
  _instances(t) {
    let e = this._instCache.get(t),
      s = t.instanceMatrix,
      n = t.instanceColor,
      o = this.device;
    (!e || e.cap < s.count) &&
      (e?.buf.destroy(),
      e?.colorBuf?.destroy(),
      (e = {
        cap: s.count,
        buf: o.createBuffer({
          size: Math.max(64, s.count * 64),
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        }),
        v: -1,
        cv: -1,
        colorBuf: null,
      }),
      this._instCache.set(t, e));
    let a = Math.min(s.count, Math.max(1, t.count ?? s.count));
    (e.v !== s.version || a > e.up) &&
      (o.queue.writeBuffer(e.buf, 0, s.array, 0, a * 16),
      (e.v = s.version),
      (e.up = a));
    let r = t.userData.mbPrevInstance;
    if (r && this.pVelI) {
      (!e.prevBuf || e.prevCap !== e.cap) &&
        (e.prevBuf?.destroy(),
        (e.prevBuf = o.createBuffer({
          size: Math.max(64, e.cap * 64),
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })),
        (e.prevCap = e.cap),
        (e.pv = -1));
      let l = t.userData.mbPrevVersion ?? 0;
      e.pv !== l &&
        (o.queue.writeBuffer(
          e.prevBuf,
          0,
          r,
          0,
          Math.min(r.length, e.cap * 16, Math.max(1, t.count) * 16),
        ),
        (e.pv = l));
    } else e.prevBuf && (e.prevBuf.destroy(), (e.prevBuf = null));
    if (
      n &&
      (e.colorBuf ||
        (e.colorBuf = o.createBuffer({
          size: Math.max(12, e.cap * 12),
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })),
      e.cv !== n.version || a > e.cup)
    ) {
      let l = Math.min(n.array.length / 3, e.cap, a);
      (o.queue.writeBuffer(e.colorBuf, 0, n.array, 0, l * 3),
        (e.cv = n.version),
        (e.cup = l));
    }
    return ((e.count = t.count), this._growZero(s.count), e);
  }
  _envSource(t) {
    let e = t.environment?.isTexture ? t.environment : null;
    return (
      e ||
        t.traverse((s) => {
          if (!e && s.isMesh) {
            let n = Array.isArray(s.material) ? s.material[0] : s.material;
            n?.envMap && (e = n.envMap);
          }
        }),
      e?.isRenderTargetTexture ? e.userData.mbCube?.eq || null : e
    );
  }
  _finalExtra() {
    let t = this.device;
    return [
      {
        binding: 4,
        resource: (this.samples === 1 && this._depth
          ? this._depth
          : this._dummyDepth
        ).createView(),
      },
      { binding: 5, resource: (this._velTex || this.dummy2d).createView() },
      { binding: 6, resource: { buffer: this._fbuf } },
    ];
  }
  setSkyField(t) {
    if (
      (this._skyTex?.destroy(),
      (this._skyTex = null),
      this._skyBuf?.destroy(),
      (this._skyBuf = null),
      (this._skyField = null),
      (this._envGroups = null),
      (this.skyPath = "none"),
      !t || !this.device || !(Rd || Cg))
    )
      return !1;
    let e = this.device,
      s = e.limits,
      n = Rd ? s.maxTextureDimension2D : 1e9,
      o = Rd
        ? 1 / 0
        : Math.min(s.maxStorageBufferBindingSize, s.maxBufferSize) - 16;
    for (; t.w > n || t.h > n || t.w * t.h > o;) t = hct(t);
    if (
      (e.pushErrorScope("out-of-memory"), e.pushErrorScope("validation"), Rd)
    ) {
      let r = e.createTexture({
        size: [t.w, t.h],
        format: "r8unorm",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        label: "sky-field",
      });
      (e.queue.writeTexture({ texture: r }, t.data, { bytesPerRow: t.w }, [
        t.w,
        t.h,
      ]),
        (this._skyTex = r));
    } else {
      let r = t.w * t.h,
        l = new Uint32Array(2 + Math.ceil(r / 4));
      ((l[0] = t.w),
        (l[1] = t.h),
        new Uint8Array(l.buffer, 8, r).set(t.data.subarray(0, r)));
      let c = e.createBuffer({
        size: l.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        label: "sky-field",
      });
      (e.queue.writeBuffer(c, 0, l), (this._skyBuf = c));
    }
    let a = this._skyTex || this._skyBuf;
    return (
      Promise.all([e.popErrorScope(), e.popErrorScope()])
        .then(([r, l]) => {
          let c = r || l;
          !c ||
            (this._skyTex || this._skyBuf) !== a ||
            (console.warn(
              "sky field: the GPU refused it, the ambient light unoccluded (" +
                c.message +
                ")",
            ),
            this.setSkyField(null));
        })
        .catch(() => {}),
      (this._skyField = { x0: t.x0, z0: t.z0, w: t.w, h: t.h, cell: t.cell }),
      (this.skyPath = Rd ? "texture" : "buffer"),
      !0
    );
  }
  setSunField(t) {
    if (!this.device || !Lg) return !1;
    let e = this.device;
    return t
      ? t.data.byteLength >
        Math.min(e.limits.maxStorageBufferBindingSize, e.limits.maxBufferSize)
        ? !1
        : ((!this._sunBuf || this._sunBuf.size !== t.data.byteLength) &&
            (this._sunBuf?.destroy(),
            (this._envGroups = null),
            (this._sunBuf = e.createBuffer({
              size: t.data.byteLength,
              usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
              label: "sun-field",
            }))),
          e.queue.writeBuffer(this._sunBuf, 0, t.data),
          !0)
      : (this._sunBuf &&
          (this._sunBuf.destroy(),
          (this._sunBuf = null),
          (this._envGroups = null)),
        !1);
  }
  async setNeuralEnv(t, { width: e = 1024 } = {}) {
    let s = this.device,
      n = this.neural;
    if (!n) throw new Error("setNeuralEnv: no bundle");
    for (; !this.pEnvEq || !this.pMip;)
      await new Promise((_) => setTimeout(_, 16));
    let o = t.image,
      a = o.width * o.height,
      r = o.data instanceof Uint16Array,
      l = Math.max(1, Math.floor(Math.log2(Math.min(o.width, o.height))) - 1),
      c = GPUTextureUsage.TEXTURE_BINDING,
      h = GPUTextureUsage.RENDER_ATTACHMENT,
      f = GPUTextureUsage.COPY_DST,
      u = s.createTexture({
        size: [o.width, o.height, 1],
        format: "rgba16float",
        mipLevelCount: l,
        usage: c | h | f,
      }),
      d = o.data;
    if (!r) {
      let _ = new Uint16Array(a * 4);
      for (let R = 0; R < a * 4; R++) _[R] = Ll.toHalfFloat(d[R]);
      d = _;
    }
    s.queue.writeTexture({ texture: u }, d, { bytesPerRow: o.width * 8 }, [
      o.width,
      o.height,
    ]);
    let p = s.createCommandEncoder();
    for (let _ = 1; _ < l; _++) {
      let R = (E) =>
          u.createView({ dimension: "2d", baseMipLevel: E, mipLevelCount: 1 }),
        T = p.beginRenderPass({
          colorAttachments: [{ view: R(_), loadOp: "clear", storeOp: "store" }],
        });
      (T.setPipeline(this.pMip),
        T.setBindGroup(
          0,
          s.createBindGroup({
            layout: this.mipLayout,
            entries: [
              { binding: 0, resource: R(_ - 1) },
              { binding: 1, resource: this.linSampler },
            ],
          }),
        ),
        T.draw(3),
        T.end());
    }
    let m = e,
      g = m / 2,
      b = 5,
      x = s.createTexture({
        size: [m, g, 1],
        format: "rgba16float",
        mipLevelCount: b,
        usage: c | GPUTextureUsage.STORAGE_BINDING | f,
      }),
      v = [0, 400, 64, 8, 1],
      y = [1, 64, 96, 128, 128],
      M = Math.log2(o.width / 1024),
      S = [0, 2.6, 3.9, 5.4, 7],
      w = p.beginComputePass();
    w.setPipeline(this.pEnvEq);
    let z = Td.empty(s).latentTex.createView({ dimension: "2d-array" });
    for (let _ = 0; _ < b; _++) {
      let R = s.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (s.queue.writeBuffer(
        R,
        0,
        new Float32Array([
          v[_],
          y[_],
          Math.min(Math.max(S[_] + M, 0), l - 1),
          0,
        ]),
      ),
        w.setBindGroup(
          0,
          s.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              { binding: 0, resource: u.createView({ dimension: "2d" }) },
              { binding: 1, resource: z },
              { binding: 2, resource: this.envSampler },
              { binding: 3, resource: { buffer: R } },
              {
                binding: 4,
                resource: x.createView({
                  dimension: "2d",
                  baseMipLevel: _,
                  mipLevelCount: 1,
                }),
              },
            ],
          }),
        ),
        w.dispatchWorkgroups(Math.ceil((m >> _) / 8), Math.ceil((g >> _) / 8)));
    }
    (w.end(),
      s.queue.submit([p.finish()]),
      (this._nbPriorOrig ||= n.priorTex),
      this._nbPriorOwn && this._nbPriorOwn.destroy(),
      (n.priorTex = this._nbPriorOwn = x),
      (this._envGroups = null),
      s.queue.onSubmittedWorkDone().then(() => u.destroy()));
  }
  _envEnsure(t) {
    if (this.neural) return;
    let e = this.envOverride?.isTexture ? this.envOverride : null,
      s = e || this._envSource(t),
      n = this.device,
      o = s
        ? s.userData?.mbEnv || (s.isCubeTexture ? { cube: s } : { equirect: s })
        : null;
    if (o?.scene) {
      let L = this._sceneEnvTex(o);
      L && (o = { equirect: L });
    }
    !e && this._skyActive && this._so?.isReady && (o = { skyOcean: this._so });
    let a = o?.equirect || o?.cube || null,
      r = o?.skyOcean
        ? `so:${o.skyOcean.envKey()}`
        : o
          ? a
            ? `${a.uuid}:${a.version}`
            : `scene:${o.scene?.uuid}`
          : "none";
    if (r === this._envKey) return;
    if (!o) {
      ((this._envKey = r),
        this._envPrior?.destroy(),
        (this._envPrior = null),
        (this._envGroups = null));
      return;
    }
    if (!this.pEnvEq || !this.pEnvCube || !this.pMip) return;
    let l = (L) => (L?.isTexture ? L.image : L),
      c = (L) => ((L = l(L)), L && (L.data || L.width));
    if (
      (o.equirect && !c(o.equirect.image)) ||
      (o.cube && !(o.cube.image?.length === 6 && o.cube.image.every(c)))
    )
      return;
    let h = globalThis.MB_ENV_RES || (this.fullMat ? 1024 : 512),
      f = h / 2,
      u = GPUTextureUsage.TEXTURE_BINDING,
      d = GPUTextureUsage.RENDER_ATTACHMENT,
      p = GPUTextureUsage.COPY_DST,
      m = 7;
    if (
      (this._envPrior &&
        (this._envPrior.width !== h ||
          this._envPrior.depthOrArrayLayers !== m) &&
        (this._envPrior.destroy(), (this._envPrior = null)),
      this._envPrior ||
        (this._envPrior = n.createTexture({
          size: [h, f, m],
          format: "rgba16float",
          usage: u | GPUTextureUsage.STORAGE_BINDING | p,
        })),
      o.scene)
    ) {
      let L = Ll.toHalfFloat(1),
        F = new Uint16Array(h * f * 4).fill(L);
      for (let N = 3; N < F.length; N += 4) F[N] = Ll.toHalfFloat(1);
      for (let N = 0; N < m; N++)
        n.queue.writeTexture(
          { texture: this._envPrior, origin: [0, 0, N] },
          F,
          { bytesPerRow: h * 8 },
          [h, f],
        );
      ((this._envKey = r), (this._envGroups = null), (this._bgEnvView = null));
      return;
    }
    let g = (L, F, N) => {
        let B = new Uint16Array(F * 4),
          H = L instanceof Uint16Array;
        for (let O = 0; O < F; O++)
          for (let D = 0; D < 4; D++) {
            let U =
              D < N ? L[O * N + D] : D === 3 ? (H ? Ll.toHalfFloat(1) : 1) : 0;
            B[O * 4 + D] = H ? U : Ll.toHalfFloat(U);
          }
        return B;
      },
      b = (L, F, N) => {
        if (F.data) {
          let B = F.width * F.height,
            H = Math.round(F.data.length / B);
          return (
            n.queue.writeTexture(
              { texture: L, origin: [0, 0, N] },
              g(F.data, B, H),
              { bytesPerRow: F.width * 8 },
              [F.width, F.height],
            ),
            !1
          );
        }
        return (
          n.queue.copyExternalImageToTexture(
            { source: F, flipY: !1 },
            { texture: L, origin: [0, 0, N] },
            [F.width, F.height],
          ),
          !0
        );
      },
      x = !!o.cube,
      v = o.skyOcean
        ? [{ width: 512, height: 256 }]
        : (x ? [...o.cube.image] : [o.equirect.image]).map(l),
      y = v[0].width,
      M = v[0].height,
      S = o.skyOcean
        ? o.skyOcean.envLevels
        : Math.max(1, Math.floor(Math.log2(Math.min(y, M))) - 1),
      w = o.skyOcean
        ? o.skyOcean.tEnv
        : n.createTexture({
            size: [y, M, v.length],
            format: "rgba16float",
            mipLevelCount: S,
            usage: u | d | p,
            dimension: "2d",
          }),
      z = !1;
    o.skyOcean ||
      v.forEach((L, F) => {
        z = b(w, L, F) && (x ? o.cube : o.equirect).colorSpace === is;
      });
    let _ = n.createCommandEncoder();
    if (!o.skyOcean)
      for (let L = 0; L < v.length; L++)
        for (let F = 1; F < S; F++) {
          let N = (H) =>
              w.createView({
                dimension: "2d",
                baseArrayLayer: L,
                arrayLayerCount: 1,
                baseMipLevel: H,
                mipLevelCount: 1,
              }),
            B = _.beginRenderPass({
              colorAttachments: [
                { view: N(F), loadOp: "clear", storeOp: "store" },
              ],
            });
          (B.setPipeline(this.pMip),
            B.setBindGroup(
              0,
              n.createBindGroup({
                layout: this.mipLayout,
                entries: [
                  { binding: 0, resource: N(F - 1) },
                  { binding: 1, resource: this.linSampler },
                ],
              }),
            ),
            B.draw(3),
            B.end());
        }
    let R = [0, 3e3, 600, 120, 24, 5, 1],
      T = [1, 48, 64, 96, 128, 128, 128],
      E = [0, 1.8, 3, 4.2, 5.4, 6.8, 7.5],
      A = Math.log2((x ? y * 4 : y) / 1024),
      C = _.beginComputePass();
    C.setPipeline(x ? this.pEnvCube : this.pEnvEq);
    let P = this.dummy2d.createView(),
      I = Td.empty(n).latentTex.createView({ dimension: "2d-array" });
    for (let L = 0; L < m; L++) {
      let F = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (n.queue.writeBuffer(
        F,
        0,
        new Float32Array([
          R[L],
          T[L],
          Math.min(Math.max(E[L] + A, 0), S - 1),
          z ? 1 : 0,
        ]),
      ),
        C.setBindGroup(
          0,
          n.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              {
                binding: 0,
                resource: x ? P : w.createView({ dimension: "2d" }),
              },
              {
                binding: 1,
                resource: x ? w.createView({ dimension: "2d-array" }) : I,
              },
              { binding: 2, resource: this.envSampler },
              { binding: 3, resource: { buffer: F } },
              {
                binding: 4,
                resource: this._envPrior.createView({
                  dimension: "2d",
                  baseArrayLayer: L,
                  arrayLayerCount: 1,
                }),
              },
            ],
          }),
        ),
        C.dispatchWorkgroups(h / 8, f / 8));
    }
    if (((this._bgSharp = null), !o.skyOcean && x)) {
      let L = Math.min(4096, Math.max(2048, y * 8)),
        F = L / 2;
      (this._bgCubeEq?.destroy(),
        (this._bgCubeEq = n.createTexture({
          size: [L, F],
          format: "rgba16float",
          usage: u | GPUTextureUsage.STORAGE_BINDING,
        })));
      let N = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (n.queue.writeBuffer(N, 0, new Float32Array([0, 1, 0, z ? 1 : 0])),
        C.setBindGroup(
          0,
          n.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              { binding: 0, resource: P },
              { binding: 1, resource: w.createView({ dimension: "2d-array" }) },
              { binding: 2, resource: this.envSampler },
              { binding: 3, resource: { buffer: N } },
              { binding: 4, resource: this._bgCubeEq.createView() },
            ],
          }),
        ),
        C.dispatchWorkgroups(Math.ceil(L / 8), Math.ceil(F / 8)),
        (this._bgSharp = this._bgCubeEq.createView()));
    } else
      !o.skyOcean &&
        !z &&
        (this._bgSharp = w.createView({
          dimension: "2d",
          baseArrayLayer: 0,
          arrayLayerCount: 1,
          baseMipLevel: 0,
          mipLevelCount: 1,
        }));
    (C.end(),
      n.queue.submit([_.finish()]),
      (this._envKey = r),
      (this._envGroups = null),
      (this._bgEnvView = null));
  }
  _dynEnsure() {
    let t = this.device,
      e = this.neural?.manifest?.probes?.[0];
    if (!e) return;
    let s = 128,
      n = 8,
      o = GPUTextureUsage.RENDER_ATTACHMENT,
      a = GPUTextureUsage.TEXTURE_BINDING,
      r = t.createTexture({
        size: [s, s, 6],
        format: "rgba16float",
        mipLevelCount: n,
        usage: o | a,
      }),
      l = t.createTexture({ size: [s, s], format: "depth24plus", usage: o }),
      c = t.createTexture({
        size: [256, 128],
        format: "rgba16float",
        mipLevelCount: 5,
        usage: a | GPUTextureUsage.STORAGE_BINDING,
      }),
      h = new xt().fromArray(e.center_gltf),
      f = new Di(90, 1, 0.02, 60),
      u = [
        [1, 0, 0, 0, -1, 0],
        [-1, 0, 0, 0, -1, 0],
        [0, 1, 0, 0, 0, 1],
        [0, -1, 0, 0, 0, -1],
        [0, 0, 1, 0, -1, 0],
        [0, 0, -1, 0, -1, 0],
      ].map(
        ([M, S, w, z, _, R]) => (
          f.position.copy(h),
          f.up.set(z, _, R),
          f.lookAt(h.x + M, h.y + S, h.z + w),
          f.updateMatrixWorld(),
          f.updateProjectionMatrix(),
          new ye()
            .multiplyMatrices(V1, f.projectionMatrix)
            .multiply(f.matrixWorldInverse)
        ),
      ),
      d = u.map(() =>
        t.createBuffer({
          size: Ag,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        }),
      ),
      p = d.map((M) =>
        t.createBindGroup({
          layout: this.frameLayout,
          entries: [
            { binding: 0, resource: { buffer: M } },
            { binding: 1, resource: { buffer: this.boneBuf } },
            { binding: 2, resource: { buffer: this.boneBufPrev } },
          ],
        }),
      ),
      m = (M, S) =>
        r.createView({
          dimension: "2d",
          baseArrayLayer: M,
          arrayLayerCount: 1,
          baseMipLevel: S,
          mipLevelCount: 1,
        }),
      g = [];
    for (let M = 0; M < 6; M++)
      for (let S = 1; S < n; S++)
        g.push({
          dst: m(M, S),
          group: t.createBindGroup({
            layout: this.mipLayout,
            entries: [
              { binding: 0, resource: m(M, S - 1) },
              { binding: 1, resource: this.linSampler },
            ],
          }),
        });
    let b = [0, 400, 64, 8, 1],
      x = [1, 64, 128, 128, 128],
      v = [0, 1.5, 3.5, 5, 6],
      y = b.map((M, S) => {
        let w = t.createBuffer({
            size: 416,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
          }),
          z = new Float32Array(104);
        return (
          u.forEach((_, R) => z.set(_.elements, 16 * R)),
          z.set([h.x, h.y, h.z, 1], 96),
          z.set([M, x[S], v[S], 0], 100),
          t.queue.writeBuffer(w, 0, z),
          {
            w: 256 >> S,
            h: 128 >> S,
            group: t.createBindGroup({
              layout: this.dynLayout,
              entries: [
                {
                  binding: 0,
                  resource: r.createView({ dimension: "2d-array" }),
                },
                { binding: 1, resource: this.linSampler },
                { binding: 2, resource: { buffer: w } },
                {
                  binding: 3,
                  resource: c.createView({ baseMipLevel: S, mipLevelCount: 1 }),
                },
              ],
            }),
          }
        );
      });
    ((this._dyn = {
      faces: r,
      depth: l,
      depthView: l.createView(),
      eq: c,
      eqView: c.createView(),
      c: h,
      vps: u,
      fb: d,
      fg: p,
      face0: [0, 1, 2, 3, 4, 5].map((M) => m(M, 0)),
      mips: g,
      pre: y,
      key: "",
      frame: new Float32Array(Ag / 4),
    }),
      (this._envGroups = null));
  }
  _dynEncode(t, e) {
    let s = this._dyn;
    for (let o = 0; o < 6; o++) {
      let a = t.beginRenderPass({
        colorAttachments: [
          {
            view: s.face0[o],
            loadOp: "clear",
            storeOp: "store",
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
          },
        ],
        depthStencilAttachment: {
          view: s.depthView,
          depthLoadOp: "clear",
          depthStoreOp: "discard",
          depthClearValue: 1,
        },
      });
      (a.setBindGroup(0, s.fg[o]),
        a.setBindGroup(2, this._envGroups.planar),
        this._drawGrouped(a, e, (r) =>
          r.nm && this.pNeuralLin ? this.pNeuralLin : this.pStandardLin,
        ),
        a.end());
    }
    for (let o of s.mips) {
      let a = t.beginRenderPass({
        colorAttachments: [
          {
            view: o.dst,
            loadOp: "clear",
            storeOp: "store",
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
          },
        ],
      });
      (a.setPipeline(this.pMip),
        a.setBindGroup(0, o.group),
        a.draw(3),
        a.end());
    }
    let n = t.beginComputePass();
    n.setPipeline(this.pDynPrefilter);
    for (let o of s.pre)
      (n.setBindGroup(0, o.group),
        n.dispatchWorkgroups(Math.ceil(o.w / 8), Math.ceil(o.h / 8)));
    n.end();
  }
  _drawCasters(t, e, s, n, o = null) {
    let a = n ? e.filter((l) => l.at) : [],
      r = a.length ? e.filter((l) => !l.at) : e;
    if (r.length && s) {
      let l = o ? r.filter((h) => h.lean) : [],
        c = l.length ? r.filter((h) => !h.lean) : r;
      (c.length && (t.setPipeline(s), this._drawList(t, c)),
        l.length && (t.setPipeline(o), this._drawList(t, l)));
    }
    a.length &&
      (t.setPipeline(n),
      t.setBindGroup(2, this._emptyGroup),
      this._drawList(t, a, !0));
  }
  _casterOps(t, e, s, n, o = null) {
    let a = n ? e.filter((l) => l.at) : [],
      r = a.length ? e.filter((l) => !l.at) : e;
    if (r.length && s) {
      let l = o ? r.filter((h) => h.lean) : [],
        c = l.length ? r.filter((h) => !h.lean) : r;
      for (let h of c) this._op(t, s, null, h, !1);
      for (let h of l) this._op(t, o, null, h, !1);
    }
    for (let l of a) this._op(t, n, this._emptyGroup, l, !0);
  }
  _drawGrouped(t, e, s, n = !1) {
    let o = null;
    for (let a of e) {
      let r = s(a);
      r && (r !== o && (t.setPipeline(r), (o = r)), this._draw1(t, a, !0, n));
    }
  }
  _sideGL() {
    if (this._side) return this._side.glr;
    let t = i.fallbackClass || zg;
    if (this.shaderSidecar === !1 || t === i || t.prototype instanceof i)
      return null;
    let e = document.createElement("canvas");
    try {
      this._side = {
        cv: e,
        glr: new t({
          canvas: e,
          alpha: !0,
          antialias: !0,
          premultipliedAlpha: !0,
        }),
        cam: null,
        tex: null,
        w: 0,
        h: 0,
      };
    } catch (s) {
      return (
        console.warn("MindblownRenderer: no WebGL side renderer", s),
        (this.shaderSidecar = !1),
        null
      );
    }
    return this._side.glr;
  }
  _sceneEnvTex(t) {
    return (
      t._eq === void 0 &&
        (t._eq = this._captureEnv(
          t.scene,
          t.near,
          t.far,
          t.opts?.position,
          t.opts?.size,
        )),
      t._eq
    );
  }
  _noteCube(t, e, s) {
    let n = (t.texture.userData.mbCube ||= { eq: null, frame: -1e9 });
    if (this.info.render.frame - n.frame < 15 || this._capturing) return;
    this._capturing = !0;
    let o = this._captureEnv(
      e,
      s.near,
      s.far,
      s.getWorldPosition(new xt()),
      Math.min(t.width || 256, 512),
    );
    ((this._capturing = !1),
      o && (n.eq?.dispose(), (n.eq = o), (n.frame = this.info.render.frame)));
  }
  _captureEnv(t, e = 0.1, s = 100, n = null, o = 256) {
    let a = this._sideGL();
    if (!a || !t) return null;
    try {
      let c = new q1(o, { type: aa, generateMipmaps: !1 }),
        h = new F1(e, s, c);
      (n && h.position.copy(n), h.updateMatrixWorld(!0));
      let f = a.toneMapping,
        u = a.getClearColor(new $t()),
        d = a.getClearAlpha();
      ((a.toneMapping = _0), a.setClearColor(0, 1));
      let p = t.background;
      (p && !p.isColor && !p.isTexture && (t.background = null),
        h.update(a, t),
        (t.background = p));
      let m = new Vo(1024, 512, { type: La, depthBuffer: !1 }),
        g = new Bo({
          uniforms: { t: { value: c.texture } },
          depthTest: !1,
          depthWrite: !1,
          vertexShader:
            "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
          fragmentShader: `uniform samplerCube t; varying vec2 vUv;
          void main() { float ph = (vUv.x - 0.5) * 6.28318531, th = (0.5 - vUv.y) * 3.14159265;   // row 0 = up (this renderer's equirects)
            gl_FragColor = vec4(textureCube(t, vec3(cos(ph) * cos(th), sin(th), sin(ph) * cos(th))).rgb, 1.0); }`,
        }),
        b = new _e(new $n(2, 2), g);
      ((b.frustumCulled = !1),
        a.setRenderTarget(m),
        a.render(b, new Lr(-1, 1, 1, -1, 0, 1)),
        a.setRenderTarget(null));
      let x = new Float32Array(1024 * 512 * 4);
      (a.readRenderTargetPixels(m, 0, 0, 1024, 512, x),
        (a.toneMapping = f),
        a.setClearColor(u, d),
        c.dispose(),
        m.dispose(),
        g.dispose(),
        b.geometry.dispose());
      let v = new Xi(x, 1024, 512, no, La);
      return ((v.needsUpdate = !0), v);
    } catch (r) {
      return (
        console.warn("MindblownRenderer: environment capture failed", r),
        null
      );
    }
  }
  _sideRender(t, e, s) {
    if (!this._sideGL()) return null;
    let n = this.device;
    if (!this._sidePipeInit) {
      this._sidePipeInit = !0;
      let d = n.createShaderModule({
        label: "side",
        code: `
        @group(0) @binding(0) var t: texture_2d<f32>;
        @group(0) @binding(1) var sm: sampler;
        @vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
          return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 1.0, 1.0); }
        struct O2 { @location(0) c: vec4f, @location(1) l: vec4f };
        // the side image is half resolution: bilinear up (backgrounds and gradients are smooth)
        @fragment fn fs(@builtin(position) p: vec4f) -> O2 { let c = textureSampleLevel(t, sm, p.xy / (vec2f(textureDimensions(t)) * 2.0), 0.0); return O2(c, vec4f(0.0)); }`,
      });
      ((this._sideLayout = n.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { sampleType: "float" },
          },
          { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
        ],
      })),
        n
          .createRenderPipelineAsync({
            label: "side",
            layout: n.createPipelineLayout({
              bindGroupLayouts: [this._sideLayout],
            }),
            vertex: { module: d, entryPoint: "vs" },
            fragment: {
              module: d,
              entryPoint: "fs",
              targets: [
                {
                  format: this.format,
                  blend: {
                    color: {
                      srcFactor: "one",
                      dstFactor: "one-minus-src-alpha",
                    },
                    alpha: {
                      srcFactor: "one",
                      dstFactor: "one-minus-src-alpha",
                    },
                  },
                },
                { format: "rgba16float", writeMask: 0 },
              ],
            },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: !1,
              depthCompare: "less-equal",
            },
            multisample: { count: this.samples },
          })
          .then((p) => (this.pSide = p))
          .catch((p) => console.warn("side pass", p)));
    }
    let o = this._side,
      a = Math.max(1, this._W >> 1),
      r = Math.max(1, this._H >> 1);
    (o.w !== a || o.h !== r) &&
      (o.glr.setPixelRatio(1),
      o.glr.setSize(a, r, !1),
      (o.w = a),
      (o.h = r),
      (o.key = null),
      o.tex?.destroy(),
      (o.tex = n.createTexture({
        size: [a, r],
        format: "rgba8unorm",
        usage:
          GPUTextureUsage.TEXTURE_BINDING |
          GPUTextureUsage.COPY_DST |
          GPUTextureUsage.RENDER_ATTACHMENT,
      })),
      (this._sideGroup = n.createBindGroup({
        layout: this._sideLayout,
        entries: [
          { binding: 0, resource: o.tex.createView() },
          { binding: 1, resource: this.clampSampler },
        ],
      })));
    let l = 17,
      c = (d) => {
        l = (Math.imul(l, 31) + Math.round(d * 1e4)) | 0;
      };
    (e.matrixWorld.elements.forEach(c),
      e.projectionMatrix.elements.forEach(c),
      c(this.toneMappingExposure),
      c(this.toneMapping ?? 0));
    for (let d of s) {
      d.matrixWorld.elements.forEach(c);
      let p = d.material;
      c(p.version);
      for (let m in p.uniforms) {
        let g = p.uniforms[m].value;
        typeof g == "number"
          ? c(g)
          : g?.isVector3 || g?.isVector2 || g?.isVector4
            ? (c(g.x), c(g.y), c(g.z ?? 0), c(g.w ?? 0))
            : g?.isColor && (c(g.r), c(g.g), c(g.b));
      }
    }
    if (l === o.key) return o.tex;
    o.key = l;
    for (let d of s) d.layers.enable(31);
    ((o.cam ||= e.clone()), o.cam.copy(e), o.cam.layers.set(31));
    let h = o.glr;
    ((h.toneMapping = this.toneMapping ?? 0),
      (h.toneMappingExposure = this.toneMappingExposure),
      (h.outputColorSpace = this.outputColorSpace),
      h.setClearColor(0, 0));
    let f = t.background,
      u = t.fog;
    t.background = null;
    try {
      h.render(t, o.cam);
    } finally {
      ((t.background = f), (t.fog = u));
    }
    return (
      n.queue.copyExternalImageToTexture(
        { source: o.cv },
        { texture: o.tex, premultipliedAlpha: !0 },
        [a, r],
      ),
      o.tex
    );
  }
  _lights(t) {
    if (
      !this._lightCache ||
      this._lightCache.scene !== t ||
      this._lightCache.version !== t.userData.lightsVersion
    ) {
      let g = [];
      (t.traverse((b) => {
        (b.isPointLight ||
          b.isSpotLight ||
          b.isDirectionalLight ||
          b.isSunLight) &&
          g.push(b);
      }),
        (this._lightCache = {
          scene: t,
          list: g,
          version: t.userData.lightsVersion,
        }));
    }
    let e = this._lightData,
      s = [],
      n = this._sunCache?.light;
    for (let g of this._lightCache.list) {
      if (!g.visible || g.intensity <= 0 || g === n) continue;
      let b = !0;
      (g.traverseAncestors((x) => {
        x.visible || (b = !1);
      }),
        b && s.push(g));
    }
    let o = (g) =>
      g.isDirectionalLight || g.isSunLight ? 0 : g.distance > 0 ? 2 : 1;
    s.sort((g, b) => o(g) - o(b));
    let a = this.lampBounce === !1 ? null : this._bounceFloor,
      r = [];
    if (a)
      for (let g of s) {
        if (r.length >= 8 || g.isDirectionalLight || g.isSunLight) continue;
        g.updateMatrixWorld();
        let b = new xt().setFromMatrixPosition(g.matrixWorld),
          x = b.y - a.y;
        if (x < 0.05) continue;
        let v, y, M;
        if (g.isSpotLight) {
          g.target.updateMatrixWorld();
          let w = new xt()
            .setFromMatrixPosition(g.target.matrixWorld)
            .sub(b)
            .normalize();
          if (w.y > -0.05) continue;
          let z = x / -w.y;
          ((v = b.clone().addScaledVector(w, z)),
            (y = z * Math.tan(Math.min(g.angle, 1.4))),
            (M =
              2 *
              Math.PI *
              g.intensity *
              (1 - Math.cos(g.angle * (1 - 0.5 * g.penumbra))) *
              Math.min(1, -w.y * 2)));
        } else
          ((v = new xt(b.x, a.y, b.z)),
            (y = x),
            (M = 2 * Math.PI * g.intensity));
        let S = ((a.albedo * M) / Math.PI) * (this.bounceScale ?? 1);
        r.push({
          c: v,
          R: y,
          r: g.color.r * S * a.color.r,
          g: g.color.g * S * a.color.g,
          b: g.color.b * S * a.color.b,
        });
      }
    let l = Math.min(r.length, Y6);
    for (let g = 0; g < l; g++) {
      let b = r[g],
        x = G5 + $1 * g;
      (e.fill(0, x, x + $1),
        (e[x] = b.c.x),
        (e[x + 1] = a.y + 0.01),
        (e[x + 2] = b.c.z),
        (e[x + 3] = 0),
        (e[x + 4] = b.r),
        (e[x + 5] = b.g),
        (e[x + 6] = b.b),
        (e[x + 7] = 0),
        (e[x + 8] = 0),
        (e[x + 9] = 1),
        (e[x + 10] = 0),
        (e[x + 11] = -3),
        (e[x + 12] = 0),
        (e[x + 13] = -1),
        (e[x + 14] = b.R * b.R),
        (e[x + 15] = 2),
        (e[x + 16] = -1),
        (e[x + 17] = -1));
    }
    let c = Math.min(s.length + l, Y6),
      h = l,
      f = 0,
      u = 0,
      d = 0,
      p = this.shadowMap.enabled !== !1;
    ((this._spots = []), (this._points = []), (this._spotMapReq = []));
    let m = this._v;
    for (let g = l; g < c; g++) {
      let b = s[g - l],
        x = G5 + $1 * g;
      (b.updateMatrixWorld(), e.fill(0, x, x + $1));
      let v = m.setFromMatrixPosition(b.matrixWorld),
        y = b.isDirectionalLight || b.isSunLight;
      ((e[x] = v.x),
        (e[x + 1] = v.y),
        (e[x + 2] = v.z),
        (e[x + 3] = y ? 0 : b.distance || 0),
        (e[x + 4] = b.color.r * b.intensity),
        (e[x + 5] = b.color.g * b.intensity),
        (e[x + 6] = b.color.b * b.intensity),
        (e[x + 7] = 0),
        e[x + 3] > 0 || h++,
        (e[x + 15] =
          (b.decay ?? 2) +
          8 *
            (Math.min(999, Math.round((b.userData.mbNear || 0) * 100)) +
              (b.userData.mbLowBeam ? 1e3 : 0))),
        (e[x + 16] = -1),
        (e[x + 17] = -1));
      let M = b.shadow;
      ((e[x + 18] = M ? -(M.bias || 0) : 0),
        (e[x + 19] = (M && M.normalBias) || 0));
      let S = -1;
      if (y) {
        let w = b.isSunLight
          ? this._v2.copy(v).negate().normalize()
          : (b.target.updateMatrixWorld(),
            this._v2
              .setFromMatrixPosition(b.target.matrixWorld)
              .sub(v)
              .normalize());
        ((e[x + 8] = w.x),
          (e[x + 9] = w.y),
          (e[x + 10] = w.z),
          (e[x + 11] = -4));
      } else if (b.isSpotLight) {
        b.target.updateMatrixWorld();
        let w = this._v2
          .setFromMatrixPosition(b.target.matrixWorld)
          .sub(v)
          .normalize();
        ((e[x + 8] = w.x),
          (e[x + 9] = w.y),
          (e[x + 10] = w.z),
          (e[x + 11] = Math.cos(b.angle)),
          (e[x + 12] = Math.cos(b.angle * (1 - b.penumbra))));
        let z = b.userData.mbStreetLamp;
        z
          ? ((e[x + 7] = Math.max(z.k, 1e-4)), (e[x + 14] = z.shield || 0))
          : b.userData.mbLowBeam &&
            (e[x + 14] = Math.tan(b.userData.mbBeamPitch || 0));
        let _ = b.castShadow && p && f < J6,
          R = this.fullMat && b.map && u < q5;
        if (_ || R) {
          let T = this._spotCam,
            E = v.clone(),
            A = w.clone();
          (this.neural
            ? ((T.fov = Math.min(170, (b.angle * 2 * 180) / Math.PI + 4)),
              (T.near = 0.05),
              (T.far = 25))
            : ((T.fov = Math.min(
                170,
                ((b.angle * 2 * 180) / Math.PI) * (M?.focus ?? 1),
              )),
              (T.near = M?.camera?.near ?? 0.5),
              (T.far = M?.camera?.far ?? 500)),
            (T.aspect = 1),
            T.position.copy(E),
            T.up.set(0, 1, 0),
            Math.abs(A.y) > 0.99 && T.up.set(1, 0, 0),
            T.lookAt(E.x + A.x, E.y + A.y, E.z + A.z),
            T.updateMatrixWorld(),
            T.updateProjectionMatrix());
          let C = new ye()
            .multiplyMatrices(V1, T.projectionMatrix)
            .multiply(T.matrixWorldInverse);
          if (
            (_ &&
              ((S = f++),
              e.set(C.elements, 4 + 16 * S),
              this._spots.push({
                tile: S,
                vp: C,
                pos: E,
                key: `${E.toArray().map((P) => P.toFixed(4))}|${C.elements.slice(0, 12).map((P) => P.toFixed(4))}`,
              })),
            R)
          ) {
            let P = u++;
            (e.set(C.elements, IU + 16 * P),
              (e[x + 16] = P),
              this._spotMapReq.push({ layer: P, tex: b.map }));
          }
        }
      } else if (
        ((e[x + 8] = 0),
        (e[x + 9] = -1),
        (e[x + 10] = 0),
        (e[x + 11] = -2),
        (e[x + 12] = 0),
        this.fullMat && b.castShadow && p && d < Ng)
      ) {
        let w = d++,
          z = M?.camera?.near ?? 0.5,
          _ = M?.camera?.far ?? 500,
          R = v.clone(),
          T = (this._pointCam ||= new Di(90, 1, 0.5, 500));
        ((T.near = z),
          (T.far = _),
          (T.fov = 90),
          (T.aspect = 1),
          T.updateProjectionMatrix());
        let A = [
          [1, 0, 0, 0, -1, 0],
          [-1, 0, 0, 0, -1, 0],
          [0, 1, 0, 0, 0, 1],
          [0, -1, 0, 0, 0, -1],
          [0, 0, 1, 0, -1, 0],
          [0, 0, -1, 0, -1, 0],
        ].map(([C, P, I, L, F, N], B) => {
          (T.position.copy(R),
            T.up.set(L, F, N),
            T.lookAt(R.x + C, R.y + P, R.z + I),
            T.updateMatrixWorld());
          let H = new ye()
            .multiplyMatrices(V1, T.projectionMatrix)
            .multiply(T.matrixWorldInverse);
          return (e.set(H.elements, FU + 16 * (w * 6 + B)), H);
        });
        ((e[x + 17] = w), this._points.push({ idx: w, vps: A, pos: R }));
      }
      e[x + 13] = S;
    }
    return (
      (e[0] = h),
      (e[1] = c),
      (e[2] = 0),
      (e[3] = 0),
      (this.info.lights = c),
      { n: c, nUnbounded: h }
    );
  }
  render(t, e) {
    if (this._fallback) return this._renderFallback(t, e);
    if (this._target) {
      this._target.isWebGLCubeRenderTarget &&
        !this.neural &&
        this._noteCube(this._target, t, e);
      return;
    }
    if (!this.pStandard) {
      let ft = () => {
        if (this._pending) {
          let [kt, St] = this._pending;
          ((this._pending = null), this.render(kt, St));
        }
      };
      if (((this._pending = [t, e]), !this.device)) {
        (this.ready ||= this.init().catch((kt) => this._useFallback(kt)))
          .then(ft)
          .catch((kt) => console.error(kt));
        return;
      }
      this._compiling ||
        (this._compiling = this.compileAsync(t)
          .then(ft)
          .catch((kt) => console.error(kt)));
      return;
    }
    let s = this.device,
      n = this.cpuSplit ? [performance.now()] : null;
    (t.matrixWorldAutoUpdate !== !1 && t.updateMatrixWorld(),
      e.parent === null &&
        e.matrixWorldAutoUpdate !== !1 &&
        e.updateMatrixWorld(),
      this._setupEnv(t));
    let o = this.neural?.manifest,
      a = this._vp
        .multiplyMatrices(V1, e.projectionMatrix)
        .multiply(e.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(
      this._m.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
    );
    let r =
        this.autoClear === !1 &&
        this.samples === 1 &&
        this.ctx.getCurrentTexture() === this._lastCanvasTex,
      l =
        !r &&
        !this._scissorTest &&
        (!this._viewport ||
          (this._viewport[0] === 0 &&
            this._viewport[1] === 0 &&
            this._viewport[2] >= this.width &&
            this._viewport[3] >= this.height)),
      c = !!(
        this.fullMat &&
        this.fxaa &&
        this.samples === 1 &&
        (!this.neural || this.enhanceNeural) &&
        this.enhance !== !1 &&
        this.taa !== !1 &&
        l &&
        this.pTAA &&
        this._taaTex
      );
    if (
      ((this._taaVPPrev = this._taaVPPrev || new ye()),
      (this._taaVP = this._taaVP || new ye()),
      this._taaVPPrev.copy(this._taaVP),
      this._taaVP.copy(a),
      c)
    ) {
      let ft = (this.info.render.frame % 8) + 1,
        kt = (Gt, Bt) => {
          let Se = 0,
            Rt = 1;
          for (; Gt > 0;)
            ((Rt /= Bt), (Se += Rt * (Gt % Bt)), (Gt = Math.floor(Gt / Bt)));
          return Se;
        },
        St = kt(ft, 2) - 0.5,
        Ft = kt(ft, 3) - 0.5;
      (a.premultiply(
        (this._jitM ||= new ye()).makeTranslation(
          (2 * St) / this._W,
          (-2 * Ft) / this._H,
          0,
        ),
      ),
        (this._jit = [(2 * St) / this._W, (-2 * Ft) / this._H]));
    } else this._jit = [0, 0];
    c || (this._taaReset = !0);
    let h = this._frameData;
    (TU(h, e.projectionMatrix),
      h.set(a.elements, 0),
      h.set(this._m.copy(a).invert().elements, 16),
      h.set(this._taaVP.elements, 192),
      h.set(this._taaVPPrev.elements, 208));
    {
      let ft = this.tubes || [],
        kt = Math.min(ft.length, Ig),
        St = 232,
        Ft = 0;
      for (let Gt = 0; Gt < kt; Gt++) {
        let Bt = ft[Gt];
        Bt.color[0] + Bt.color[1] + Bt.color[2] > 0 &&
          ((h[St] = Bt.a[0]),
          (h[St + 1] = Bt.a[1]),
          (h[St + 2] = Bt.a[2]),
          (h[St + 3] = Bt.radius),
          (h[St + 4] = Bt.b[0]),
          (h[St + 5] = Bt.b[1]),
          (h[St + 6] = Bt.b[2]),
          (h[St + 7] = Bt.noFloor ? 1 : 0),
          (h[St + 8] = Bt.color[0]),
          (h[St + 9] = Bt.color[1]),
          (h[St + 10] = Bt.color[2]),
          (h[St + 11] = 0),
          (St += 12),
          Ft++);
      }
      {
        let Gt = this.carFrameInv || this.neuralFrameInv;
        h.set(Gt ? Gt.elements : cct, 232 + Ig * 12);
      }
      {
        let Gt = 248 + Ig * 12,
          Bt = this.fogScatter,
          Se = (Pe) =>
            Pe <= 0.0031308
              ? Pe * 12.92
              : 1.055 * Math.pow(Pe, 1 / 2.4) - 0.055;
        if ((h.fill(0, Gt, Gt + 12), Bt)) {
          for (let Pe = 0; Pe < 3; Pe++)
            ((h[Gt + Pe] = Se(Bt.sun[Pe])), (h[Gt + 4 + Pe] = Se(Bt.away[Pe])));
          ((h[Gt + 3] = 1),
            (h[Gt + 7] = Bt.falloff ?? 0),
            (h[Gt + 8] = Bt.base ?? 0),
            (h[Gt + 9] = Bt.reach ?? 1500),
            (h[Gt + 10] = Bt.power ?? 3),
            (h[Gt + 11] = Bt.linear ?? 0));
        }
        let Rt = this._skyField,
          Vt = this.skyVis || {};
        (h.fill(0, Gt + 12, Gt + 24),
          Rt &&
            (this._skyTex || this._skyBuf) &&
            ((h[Gt + 12] = Rt.x0),
            (h[Gt + 13] = Rt.z0),
            (h[Gt + 14] = 1 / (Rt.w * Rt.cell)),
            (h[Gt + 15] = 1 / (Rt.h * Rt.cell))),
          (h[Gt + 16] = Vt.strength ?? 1),
          (h[Gt + 17] = Vt.contrast ?? 1),
          (h[Gt + 18] = Vt.car ?? 0.8),
          (h[Gt + 19] = Vt.debug || 0),
          (h[Gt + 20] = Vt.floor ?? 0.25),
          (h[Gt + 21] = this.neuralEnv ?? 1),
          (h[Gt + 22] = this.coatFloor ?? 0),
          (h[Gt + 23] = this.coatSat ?? 0));
      }
      ((h[224] = Ft),
        (h[225] = this.mirrorEnv ?? 1),
        (h[226] = this.tubeRim ?? this.floorLight ?? 1),
        (h[227] = this.tubeSpec ?? this.floorSpecular ?? 1),
        (h[228] = this.metalEnv ?? 1),
        (h[229] = this.tubeDiffuse ?? 0),
        (h[230] = this.tubeFloor ?? 0),
        (h[231] = this.mirrorSSR ? 1 : 0));
    }
    let f = e.matrixWorld.elements;
    ((h[32] = f[12]),
      (h[33] = f[13]),
      (h[34] = f[14]),
      (h[35] = this.toneMappingExposure));
    let u = this._sun(t);
    ((h[36] = u.dir.x),
      (h[37] = u.dir.y),
      (h[38] = u.dir.z),
      (h[39] = u.intensity));
    let d = !1;
    if (o?.sun) {
      let ft = o.sun.dir;
      d =
        u.dir.x * ft[0] + u.dir.y * ft[1] + u.dir.z * ft[2] <
        Math.cos((0.3 * Math.PI) / 180);
    }
    ((this.info.relit = d),
      (h[40] = this.environmentIntensity * (t.environmentIntensity ?? 1)),
      (h[41] = this.backgroundIntensity * (t.backgroundIntensity ?? 1)),
      (h[42] = 0),
      (h[43] = d ? 1 : 0));
    let p = this._lightCam,
      m = u.light,
      g =
        (!this.neural || this.viewShadows) &&
        m &&
        m.castShadow &&
        this.shadowMap.enabled !== !1 &&
        m.shadow?.camera;
    if (((this._sunShadowOn = !!(this.neural || g)), g && m.isSunLight)) {
      let ft = Math.min(m.shadow.camera.far ?? 100, e.far ?? 100),
        kt = e.near ?? 0.1,
        St = Math.tan(((e.fov ?? 50) * Math.PI) / 180 / 2),
        Ft = e.aspect || this._W / this._H,
        Gt = [];
      for (let Qs of [kt, ft])
        for (let Jt of [-1, 1])
          for (let Ns of [-1, 1])
            Gt.push(
              new xt(Jt * Qs * St * Ft, Ns * Qs * St, -Qs).applyMatrix4(
                e.matrixWorld,
              ),
            );
      let Bt = ft * St * Math.hypot(Ft, 1),
        Se = Math.min(
          ft,
          (ft * ft + Bt * Bt - kt * kt * (1 + St * St * (Ft * Ft + 1))) /
            (2 * (ft - kt)),
        ),
        Rt = new xt(0, 0, -Se).applyMatrix4(e.matrixWorld),
        Vt = 0;
      for (let Qs of Gt) Vt = Math.max(Vt, Qs.distanceTo(Rt));
      Vt = Math.ceil(Vt * 16) / 16;
      let Pe = u.dir.clone(),
        bs = new xt(0, 1, 0).cross(Pe);
      (bs.lengthSq() < 1e-6 && bs.set(1, 0, 0), bs.normalize());
      let Ts = Pe.clone().cross(bs),
        Xe = this.sunFitSlack ?? 0,
        pn = this._sunFit;
      if (
        Xe > 0 &&
        pn &&
        pn.dir.equals(Pe) &&
        pn.rad >= Vt &&
        pn.rad <= Vt * (1 + 2 * Xe) &&
        (() => {
          let Qs = this._v2.copy(Rt).sub(pn.ctr),
            Jt = pn.rad - Vt;
          return (
            Math.abs(Qs.dot(bs)) <= Jt &&
            Math.abs(Qs.dot(Ts)) <= Jt &&
            Math.abs(Qs.dot(Pe)) <= Jt
          );
        })()
      )
        (Rt.copy(pn.ctr), (Vt = pn.rad));
      else {
        Vt = Xe > 0 ? Math.ceil(Vt * (1 + Xe) * 16) / 16 : Vt;
        let Qs = (2 * Vt) / this._shadowRes,
          Jt = Math.round(Rt.dot(bs) / Qs) * Qs,
          Ns = Math.round(Rt.dot(Ts) / Qs) * Qs,
          Sa = Rt.dot(Pe);
        (Rt.copy(bs)
          .multiplyScalar(Jt)
          .addScaledVector(Ts, Ns)
          .addScaledVector(Pe, Sa),
          (this._sunFit =
            Xe > 0 ? { ctr: Rt.clone(), rad: Vt, dir: Pe.clone() } : null));
      }
      ((p.left = -Vt),
        (p.right = Vt),
        (p.top = Vt),
        (p.bottom = -Vt),
        (p.near = 0.05),
        (p.far = Vt * 4),
        p.position.copy(Rt).addScaledVector(u.dir, Vt * 2.5),
        p.up.copy(Ts),
        p.lookAt(Rt),
        p.updateMatrixWorld(),
        p.updateProjectionMatrix(),
        (this._shadowHalf = Vt));
    } else if (g) {
      let ft = m.shadow.camera;
      ((p.left = ft.left),
        (p.right = ft.right),
        (p.top = ft.top),
        (p.bottom = ft.bottom),
        (p.near = ft.near),
        (p.far = ft.far),
        p.position.setFromMatrixPosition(m.matrixWorld),
        p.up.set(0, 1, 0),
        Math.abs(u.dir.y) > 0.99 && p.up.set(0, 0, 1),
        p.lookAt(u.tp),
        p.updateMatrixWorld(),
        p.updateProjectionMatrix(),
        (this._shadowHalf =
          Math.max(ft.right - ft.left, ft.top - ft.bottom) / 2));
    } else
      (this.neural || (this._shadowHalf = 3.8),
        (p.left = -this._shadowHalf),
        (p.right = this._shadowHalf),
        (p.top = this._shadowHalf),
        (p.bottom = -this._shadowHalf),
        (p.near = 0.5),
        (p.far = 30),
        p.position.copy(this._shadowCenter).addScaledVector(u.dir, 14),
        p.up.set(0, 1, 0),
        Math.abs(u.dir.y) > 0.99 && p.up.set(0, 0, 1),
        p.lookAt(this._shadowCenter),
        p.updateMatrixWorld(),
        p.updateProjectionMatrix());
    (this._lightVP
      .multiplyMatrices(V1, p.projectionMatrix)
      .multiply(p.matrixWorldInverse),
      h.set(this._lightVP.elements, 44),
      (h[60] = 1 / this._shadowRes),
      (h[61] = p.far - p.near),
      (h[62] = 1 / (2 * this._shadowHalf)),
      (h[63] = Math.tan(
        this.neural ? lct : ((this.softShadowAngle ?? 0.6) * Math.PI) / 180,
      )),
      (h[180] = g
        ? (m.shadow.normalBias || 0) +
          (1.5 * (2 * this._shadowHalf)) / this._shadowRes
        : 0),
      (h[181] = g ? Math.max(-(m.shadow.bias || 0), 0) : 0),
      g &&
        m.isSunLight &&
        this.shadowBiasM > 0 &&
        (h[181] = this.shadowBiasM / (p.far - p.near)),
      (h[182] = this._sunShadowOn ? 0 : 1),
      (h[183] = c ? 1 + (this.info.render.frame % 64) : 0));
    let b = m?.color || { r: 1, g: 1, b: 1 };
    ((h[184] = b.r),
      (h[185] = b.g),
      (h[186] = b.b),
      (h[187] = (performance.now() / 1e3) % 3600),
      h.fill(0, 64, 80),
      (h[80] = 1),
      (h[81] = 1),
      (h[82] = 0),
      (h[83] = 0),
      h.set(this._prevVP || a.elements, 84),
      (h[100] = 1 / this._W),
      (h[101] = 1 / this._H),
      (h[102] = 0),
      (h[103] = 0));
    let x = ((e.fov || 50) * Math.PI) / 180,
      v = x / this._ph,
      y = o?.planar?.angles || [0, 1, 3, 9];
    for (let ft = 0; ft < 4; ft++)
      h[104 + ft] =
        y[ft] > 0
          ? Math.min(
              Math.max(Math.log2((y[ft] * Math.PI) / 180 / v), 0),
              this._planarLevels - 1,
            )
          : 0;
    (h.set(e.matrixWorldInverse.elements, 108),
      (h[124] = e.near || 0.05),
      (h[125] = Math.min(e.far || 100, 60)),
      (h[126] = Math.tan(x / 2)),
      (h[127] = e.aspect || this._W / this._H));
    let M = t.fog;
    (h.fill(0, 128, 148), (h[135] = this.toneMapping ?? 0));
    let S = (ft) =>
      ft <= 0.0031308 ? ft * 12.92 : 1.055 * Math.pow(ft, 1 / 2.4) - 0.055;
    if (
      M &&
      ((h[128] = S(M.color.r)),
      (h[129] = S(M.color.g)),
      (h[130] = S(M.color.b)),
      (h[131] = M.isFogExp2 ? 2 : 1),
      (h[132] = M.near ?? 0),
      (h[133] = M.far ?? 1),
      (h[134] = M.density ?? 0),
      M.isFogExp2)
    ) {
      let ft = this.fogScatter?.elev;
      ((h[132] = ft ? ft[0] : 0), (h[133] = ft ? ft[1] : 0));
    }
    for (let ft of this._fillLights(t))
      ft.isAmbientLight
        ? ((h[144] += ft.color.r * ft.intensity),
          (h[145] += ft.color.g * ft.intensity),
          (h[146] += ft.color.b * ft.intensity))
        : ((h[136] += ft.color.r * ft.intensity),
          (h[137] += ft.color.g * ft.intensity),
          (h[138] += ft.color.b * ft.intensity),
          (h[140] += ft.groundColor.r * ft.intensity),
          (h[141] += ft.groundColor.g * ft.intensity),
          (h[142] += ft.groundColor.b * ft.intensity));
    {
      let ft = this.glowFall;
      ft &&
        ft.h > 0 &&
        ((h[139] = ft.y), (h[143] = ft.h), (h[147] = ft.floor ?? 0));
    }
    (h.fill(0, 148, 160),
      o?.probeBox &&
        !this.noProbeBox &&
        (h.set(o.probeBox.min, 148),
        (h[151] = 1),
        h.set(o.probeBox.max, 152),
        h.set(o.probes?.[0]?.center_gltf || [0, 0, 0], 156)));
    let w = t.background?.userData?.mbLogBg;
    w && ((h[155] = w.k), (h[159] = Math.log2(1 + w.k * w.max)));
    let z = this._lights(t),
      _ =
        this.ssr === !0 ||
        (this.ssr !== !1 &&
          o?.output === "phys2" &&
          !o.probeBox &&
          (z.n > 0 || d));
    ((h[160] = _ ? 1 : 0),
      (h[161] = this.ssrDistance ?? 4),
      (h[162] = 0.12),
      (h[163] = this.ssrStrength ?? 1));
    let R =
      d &&
      u.intensity > 0 &&
      o?.sun &&
      this._bounceFloor &&
      this.groundBounce !== !1;
    ((h[164] = R
      ? this._bounceFloor.albedo *
        (Math.max(u.dir.y, 0) - Math.max(o.sun.dir[1], 0))
      : 0),
      (h[165] = R ? 1 : 0),
      (h[166] = this.glints === !1 ? 1 : 0),
      (h[167] = this.sunGlints === !1 ? 1 : 0));
    let T = d && u.intensity > 0 && !!o?.sun,
      E =
        this.floorReflection !== !1 &&
        (z.n > 0 || T) &&
        o?.output === "phys2" &&
        !o.probeBox
          ? this._bounceFloor
          : null;
    ((h[168] = E ? E.albedo * E.color.r : 0),
      (h[169] = E ? E.albedo * E.color.g : 0),
      (h[170] = E ? E.albedo * E.color.b : 0),
      (h[171] = E ? E.y : 0),
      (h[172] = o?.sun?.dir[0] || 0),
      (h[173] = o?.sun?.dir[1] || 0),
      (h[174] = o?.sun?.dir[2] || 0),
      (h[175] = E && T && this.floorSunSwap !== !1 ? 1 : 0));
    let A = [],
      C = [],
      P = [],
      I = [],
      L = [],
      F = [],
      N = [],
      B = [],
      H = [],
      O = [],
      D = [],
      U = [],
      G = this._objData,
      q = 0,
      W = 0,
      V = 0,
      Y = 0,
      $ = null,
      st = null,
      Q = o?.surfaces || {},
      j = o?.dynProbes?.length || 6,
      X = u.intensity > 0 && this._sunShadowOn,
      K = this._spots.length > 0 || this._points?.length > 0,
      nt = !this.neural && this.earlyCull !== !1,
      Z = new Map(),
      et = null;
    if (nt && this._mirrorY0 != null) {
      let ft = (this._mirrorM ||= new ye()),
        kt = (this._mirrorR ||= new ye());
      kt.set(1, 0, 0, 0, 0, -1, 0, 2 * this._mirrorY0, 0, 0, 1, 0, 0, 0, 0, 1);
      let St = (this._mirrorF ||= new No());
      (St.setFromProjectionMatrix(
        ft
          .multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)
          .multiply(kt),
      ),
        (et = { f: St, rf: this._mirrorRF || null }));
    }
    if (X) {
      let ft = this._lightCam;
      this._sunBox = {
        m: ft.matrixWorldInverse,
        h: (ft.right - ft.left) / 2,
        n: ft.near,
        f: ft.far,
      };
    }
    ((this._drPool ||= []),
      (this._drN = 0),
      n?.push(performance.now()),
      this._slotBegin(t),
      (this._dirtyS = this._dirtyS || []),
      (this._dirtyS.length = 0),
      t.traverseVisible((ft) => {
        if ((ft.isLOD && ft.autoUpdate && ft.update(e), ft.isVFX)) {
          ft.enabled !== !1 && ft.layers.test(e.layers) && D.push(ft);
          return;
        }
        if (
          (ft.isSprite || ft.isPoints) &&
          q < Rg &&
          ft.layers.test(e.layers)
        ) {
          q = this._billboard(ft, t, e, q, P);
          return;
        }
        if (!(ft.isMesh || ft.isLine) || q >= Rg || !ft.layers.test(e.layers))
          return;
        if (ft.isSky) {
          $ = ft;
          return;
        }
        if (ft.isWater) {
          st = ft;
          return;
        }
        let kt = Array.isArray(ft.material) ? ft.material[0] : ft.material;
        if (!kt || kt.visible === !1 || ft.geometry?.drawRange.count === 0)
          return;
        if (kt.isShaderMaterial) {
          U.push(ft);
          return;
        }
        ft.onBeforeRender(this, t, e, ft.geometry, kt, null);
        let St = ft.geometry,
          Ft = this._meshInfo(ft),
          Gt = !1;
        if (
          nt &&
          !Ft &&
          ft.frustumCulled !== !1 &&
          !ft.isSkinnedMesh &&
          ft.userData.dynamic !== !0 &&
          !(ft.morphTargetInfluences?.length && St.morphAttributes?.position)
        ) {
          let Ps = this._sphere;
          if (((Gt = !0), ft.isInstancedMesh)) {
            if (ft.count === 0) return;
            (ft.boundingSphere || ft.computeBoundingSphere(),
              Ps.copy(ft.boundingSphere));
          } else
            (St.boundingSphere || St.computeBoundingSphere(),
              Ps.copy(St.boundingSphere));
          if (
            (Ps.applyMatrix4(ft.matrixWorld),
            !this._frustum.intersectsSphere(Ps))
          ) {
            let tn =
                ft.castShadow === !0 &&
                this.shadowMap.enabled !== !1 &&
                (K || (X && this._inSunBox(Ps))),
              Bi =
                !tn &&
                !ft.userData.mbNoReflect &&
                (!et ||
                  (et.f.intersectsSphere(Ps) &&
                    (!et.rf ||
                      et.rf(
                        Ps.center.x,
                        Ps.center.y,
                        Ps.center.z,
                        Ps.radius,
                        e,
                      ))));
            if (!tn && !Bi) return;
          }
        }
        let Bt = this._geometry(St, this._uvName(ft), this._lmName(ft));
        ft.morphTargetInfluences &&
          St.morphAttributes?.position &&
          (Bt = this._morphed(ft, Bt));
        let Se = !!(ft.isSkinnedMesh && Bt.joints && ft.skeleton),
          Rt = !!(
            ft.morphTargetInfluences?.length && St.morphAttributes?.position
          ),
          Vt = !!Ft?.dynamic || Se || Rt || ft.userData.dynamic === !0,
          Pe = Ft ? Q[ft.name] || Q[ft.name.replace(/_\d+$/, "")] : null,
          bs =
            Pe === "planar" || (!Ft && ft.userData.mbPlanar)
              ? 1
              : Pe === "glass"
                ? 2
                : Pe === "thinglass"
                  ? 3
                  : 0,
          Ts = this._slotOf(ft, 0);
        if (Ts < 0) return;
        let Xe = (Ts * Ya) / 4;
        if (
          (G.fill(0, Xe + 72, Xe + 76),
          ft.userData.mbThin && (G[Xe + 74] = +ft.userData.mbThin),
          Se)
        ) {
          let Ps = ft.skeleton;
          Ps.update();
          let tn = Ps.bones.length;
          if (Y + tn <= Pg) {
            for (let Hs = 0; Hs < tn; Hs++)
              (this._m
                .fromArray(Ps.boneMatrices, Hs * 16)
                .multiply(ft.bindMatrix),
                this._boneData.set(this._m.elements, (Y + Hs) * 16));
            this._prevBones ||= new WeakMap();
            let ci = this._boneData.subarray(Y * 16, (Y + tn) * 16),
              qn = this._prevBones.get(ft);
            (this._boneDataPrev.set(
              qn && qn.length === ci.length ? qn : ci,
              Y * 16,
            ),
              this._prevBones.set(ft, ci.slice()),
              (G[Xe + 72] = 1),
              (G[Xe + 73] = Y),
              (Y += tn));
          }
          if (!ft.userData._mbSphere) {
            ft.computeBoundingSphere();
            let ci = ft.boundingSphere.clone().applyMatrix4(ft.matrixWorld);
            ft.userData._mbSphere = {
              off: ci.center.sub(
                this._v.setFromMatrixPosition(Ps.bones[0].matrixWorld),
              ),
              r: ci.radius * 1.15,
            };
          }
          let Bi = ft.userData._mbSphere;
          (this._sphere.center
            .setFromMatrixPosition(Ps.bones[0].matrixWorld)
            .add(Bi.off),
            (this._sphere.radius = Bi.r));
        } else
          Gt ||
            (ft.isInstancedMesh
              ? (ft.boundingSphere || ft.computeBoundingSphere(),
                this._sphere
                  .copy(ft.boundingSphere)
                  .applyMatrix4(ft.matrixWorld))
              : this._sphere
                  .copy(St.boundingSphere)
                  .applyMatrix4(ft.matrixWorld));
        if (
          (Vt &&
            (this._dynS ||= []).push(
              this._sphere.center.x,
              this._sphere.center.y,
              this._sphere.center.z,
              this._sphere.radius,
            ),
          Vt && V < 4 && this.neural)
        ) {
          let Ps = ft.skeleton || ft;
          if (
            ((!this._occSeen ||
              this._occSeen.frame !== this.info.render.frame) &&
              (this._occSeen = {
                frame: this.info.render.frame,
                set: new Set(),
              }),
            !this._occSeen.set.has(Ps))
          ) {
            this._occSeen.set.add(Ps);
            let tn = 64 + 4 * V++;
            ((h[tn] = this._sphere.center.x),
              (h[tn + 1] = this._sphere.center.y - this._sphere.radius * 0.25),
              (h[tn + 2] = this._sphere.center.z),
              (h[tn + 3] = this._sphere.radius * 0.55));
          }
        }
        let pn = ft.matrixWorld.elements,
          Qs = ft[_U],
          Jt =
            Se || !!(ft.morphTargetInfluences && St.morphAttributes?.position),
          Ns = !Qs,
          Sa = !Qs,
          kl = Sa;
        if (Qs) {
          let Ps = Qs.m;
          for (let tn = 0; tn < 16; tn++) {
            let Bi = Ps[tn] - pn[tn];
            if (Bi !== 0 && ((kl = !0), Math.abs(Bi) > 1e-6)) {
              Ns = !0;
              break;
            }
          }
          Jt ||= Ns;
        } else
          Qs = ft[_U] = {
            m: new Float32Array(16),
            n: new Float32Array(16),
            det: !1,
          };
        let _l = Array.isArray(ft.material) ? ft.material : null,
          rr =
            _l && St.groups.length
              ? St.groups
                  .map((Ps) => ({
                    mat: _l[Ps.materialIndex],
                    range: [Ps.start, Ps.count],
                  }))
                  .filter((Ps) => Ps.mat && Ps.mat.visible !== !1)
              : (this._part1 ||= [{ mat: null, range: null }]);
        if (
          (rr === this._part1 && (rr[0].mat = _l ? _l[0] : ft.material),
          !rr.length)
        )
          return;
        let ph = rr[0].mat,
          Ue = Ft && this._detailOf(ft),
          Ci = ft.isInstancedMesh ? this._instances(ft) : null;
        if (Ci && Ci.count === 0) return;
        let ro = ft[U5],
          Sf = !Ft && !Ue && !o && !Se && !Jt;
        Ns && (Qs.det = ft.matrixWorld.determinant() < 0);
        let Lo =
            Sf &&
            !kl &&
            ro.still === !0 &&
            ro.np === rr.length &&
            this.cleanSlots !== !1,
          Yr =
            (Vt ? 1 : 0) |
            (ft.isInstancedMesh && ft.instanceColor ? 4 : 0) |
            (St.attributes.normal ? 0 : 8) |
            (this.neural || ft.receiveShadow ? 16 : 0) |
            (Qs.det ? 128 : 0) |
            (ft.isPoints || ft.isSprite ? 256 : 0),
          Ln = (Ps) =>
            Yr |
            (Ps.vertexColors && Bt.color ? 2 : 0) |
            (Ps.flatShading ? 8 : 0) |
            (Ps.side === 1 ? 32 : Ps.side === 2 ? 64 : 0);
        if (Lo)
          for (let Ps = 0; Ps < rr.length; Ps++) {
            let tn = rr[Ps].mat,
              Bi = Ps ? this._slotOf(ft, Ps) : Ts,
              ci = this._matBlock(tn, ft, Bt, t, o, Z);
            if (
              Bi < 0 ||
              ro.ws[Ps] !== Bi ||
              ro.mm[Ps] !== tn ||
              ro.ms[Ps] !== ci.stamp ||
              ro.fk[Ps] !== Ln(tn)
            ) {
              Lo = !1;
              break;
            }
          }
        let hn = Lo && this.slotCheck,
          zl = null;
        if (hn) {
          ((zl = this._slotChk ||= []), (zl.length = 0));
          for (let Ps = 0; Ps < rr.length; Ps++) {
            let tn = Ps ? this._slotOf(ft, Ps) : Ts;
            zl.push(tn, G.slice((tn * Ya) / 4, ((tn + 1) * Ya) / 4));
          }
        }
        let lr;
        if (Lo && !hn) lr = this._matBlock(ph, ft, Bt, t, o, Z).group;
        else {
          (G.set(pn, Xe),
            G.set(Sa ? pn : Qs.m, Xe + 140),
            Ns &&
              (Qs.n.set(
                this._nm.copy(ft.matrixWorld).invert().transpose().elements,
              ),
              Qs.m.set(pn)),
            G.set(Qs.n, Xe + 16),
            (G[Xe + 156] = Jt ? 1 : 0),
            (G[Xe + 32] = Ft ? Ft.layer : 0),
            (G[Xe + 33] = Vt ? 1 : 0),
            (G[Xe + 34] = 0),
            (G[Xe + 35] =
              Pe === "coat" ? 4 : Pe === "metal" ? 5 : Pe === "tire" ? 6 : bs),
            (lr = this._fillMatMemo(G, Xe, ph, ft, Bt, t, Ft, o, Ue, Z)));
          let Ps = (Ft && Ft.probe) || 0,
            tn = Ps,
            Bi = 0;
          if (Vt && Ft && o?.dynProbes) {
            let Qo = o.path,
              Ju = this._sphere.center,
              El =
                ((Math.atan2(
                  (-Ju.z - Qo.center[1]) / Qo.radii[1],
                  (Ju.x - Qo.center[0]) / Qo.radii[0],
                ) +
                  2 * Math.PI) %
                  (2 * Math.PI)) /
                ((2 * Math.PI) / j),
              Zu = Math.floor(El) % j;
            ((Ps = o.dynProbes[Zu]),
              (tn = o.dynProbes[(Zu + 1) % j]),
              (Bi = El - Math.floor(El)));
          }
          let ci = o?.probes?.[Ps],
            qn = o?.probes?.[tn];
          ((G[Xe + 34] = Bi),
            (G[Xe + 48] = ci ? ci.center_gltf[0] : 0),
            (G[Xe + 49] = ci ? ci.center_gltf[1] : 0),
            (G[Xe + 50] = ci ? ci.center_gltf[2] : 0),
            (G[Xe + 51] = Ps),
            (G[Xe + 52] = qn ? qn.center_gltf[0] : 0),
            (G[Xe + 53] = qn ? qn.center_gltf[1] : 0),
            (G[Xe + 54] = qn ? qn.center_gltf[2] : 0),
            (G[Xe + 55] = tn));
          let Hs = o?.proxies?.[ft.name];
          if ((G.fill(0, Xe + 56, Xe + 72), Hs)) {
            ((G[Xe + 56] = Hs.center_gltf[0]),
              (G[Xe + 57] = Hs.center_gltf[1]),
              (G[Xe + 58] = Hs.center_gltf[2]),
              (G[Xe + 59] = 1));
            for (let Qo = 0; Qo < 3; Qo++)
              (G.set(Hs.axes_gltf[Qo], Xe + 60 + 4 * Qo),
                (G[Xe + 63 + 4 * Qo] = Hs.half[Qo]));
          }
          if (
            (this._dirtyS.push(Ts),
            (ro.still = !kl && Sf),
            (ro.np = rr.length),
            (ro.ws.length = ro.mm.length = ro.ms.length = ro.fk.length = 0),
            Sf)
          ) {
            let Qo = this._matBlock(ph, ft, Bt, t, o, Z);
            ((ro.ws[0] = Ts),
              (ro.mm[0] = ph),
              (ro.ms[0] = Qo.stamp),
              (ro.fk[0] = Ln(ph)));
          }
        }
        let qp = !(
            ft.frustumCulled !== !1 &&
            !this._frustum.intersectsSphere(this._sphere)
          ),
          mh = this.neural
            ? ft.castShadow !== !1
            : ft.castShadow === !0 && this.shadowMap.enabled !== !1;
        for (let Ps = 0; Ps < rr.length && q < Rg; Ps++) {
          let tn = rr[Ps].mat,
            Bi = lr,
            ci = Ts;
          if (Ps > 0) {
            if (((ci = this._slotOf(ft, Ps)), ci < 0)) break;
            if (Lo && !hn) Bi = this._matBlock(tn, ft, Bt, t, o, Z).group;
            else {
              let Qo = (ci * Ya) / 4;
              if (
                (G.copyWithin(Qo, Xe, Xe + Ya / 4),
                (Bi = this._fillMatMemo(G, Qo, tn, ft, Bt, t, Ft, o, Ue, Z)),
                this._dirtyS.push(ci),
                Sf && ro.still !== void 0)
              ) {
                let Ju = this._matBlock(tn, ft, Bt, t, o, Z);
                ((ro.ws[Ps] = ci),
                  (ro.mm[Ps] = tn),
                  (ro.ms[Ps] = Ju.stamp),
                  (ro.fk[Ps] = Ln(tn)));
              }
            }
          }
          let qn =
              (!!tn.transparent ||
                (!Ft && (tn.blending === 2 || tn.blending === 4))) &&
              bs < 2,
            Hs = (this._drPool[this._drN++] ||= {});
          ((Hs.rec = Bt),
            (Hs.nm = !!Ft),
            (Hs.slot = ci),
            (Hs.surf = bs),
            (Hs.mat = Bi),
            (Hs.inst = Ci),
            (Hs.ro = ft.renderOrder || 0),
            (Hs.gr = ft.userData.mbGround ? 1 : 0),
            (Hs.hook = (!Ft && tn.userData?.mbAlbedo) || null),
            (Hs.range = rr[Ps].range),
            (Hs.moving = G[Xe + 156] > 0.5 || !!Ci?.prevBuf),
            (Hs.lean =
              !Ft && !Se && !Bt.joints && !(tn.vertexColors && Bt.color)),
            (Hs.at = (tn.alphaTest || 0) > 0 && !!(tn.map || tn.alphaMap)),
            (Hs.po = !Ft && !!tn.polygonOffset),
            (Hs.pb = Number.isFinite(tn.polygonOffsetUnits)
              ? Math.max(
                  -2147483648,
                  Math.min(2147483647, Math.round(tn.polygonOffsetUnits)),
                )
              : 0),
            (Hs.ps = Number.isFinite(tn.polygonOffsetFactor)
              ? tn.polygonOffsetFactor
              : 0),
            (Hs.pw = tn.depthWrite !== !1),
            (Hs.blend = qn
              ? tn.blending === 2
                ? "add0"
                : tn.blending === 4
                  ? "mul0"
                  : "alpha" + (tn.depthWrite ? "1" : "0")
              : null),
            (Hs.line = ft.isLine
              ? ft.isLineSegments
                ? "seg"
                : ft.isLineLoop
                  ? "loop"
                  : "strip"
              : tn.wireframe && !Ft
                ? "wire"
                : null),
            (Hs.o3 = ft),
            (Hs.sx =
              Hs.sy =
              Hs.sz =
              Hs.sr =
              Hs.cx =
              Hs.cy =
              Hs.cz =
              Hs.cr =
              Hs.depth =
                void 0),
            mh &&
            bs < 2 &&
            !qn &&
            !Hs.line &&
            (Vt || K || !nt || (X && this._inSunBox(this._sphere)))
              ? ((ft.userData.mbNearShadow ? B : Vt ? N : F).push(Hs),
                (Hs.sx = this._sphere.center.x),
                (Hs.sy = this._sphere.center.y),
                (Hs.sz = this._sphere.center.z),
                (Hs.sr = this._sphere.radius))
              : bs === 3 &&
                this.glassShadows !== !1 &&
                ft.castShadow !== !1 &&
                O.push(Hs),
            bs !== 1 &&
              !qn &&
              !Hs.line &&
              !ft.userData.mbNoReflect &&
              !ft.userData.mbShadowOnly &&
              (L.push(Hs),
              (Hs.cx = this._sphere.center.x),
              (Hs.cy = this._sphere.center.y),
              (Hs.cz = this._sphere.center.z),
              (Hs.cr = this._sphere.radius)),
            q++,
            !(!qp || ft.userData.mbShadowOnly) &&
              (qn
                ? ((Hs.depth = this._v
                    .copy(this._sphere.center)
                    .applyMatrix4(e.matrixWorldInverse).z),
                  P.push(Hs))
                : Hs.line
                  ? H.push(Hs)
                  : ((bs >= 2 || (!Ft && (tn.transmission || 0) > 0)
                      ? C
                      : A
                    ).push(Hs),
                    bs === 1 && I.push(Hs)),
              (W +=
                ((Hs.range ? Hs.range[1] : Bt.count) / 3) *
                (Ci ? Ci.count : 1))));
        }
        if (zl)
          for (let Ps = 0; Ps < zl.length; Ps += 2) {
            let tn = zl[Ps],
              Bi = zl[Ps + 1],
              ci = (tn * Ya) / 4;
            for (let qn = 0; qn < Bi.length; qn++)
              if (
                Bi[qn] !== G[ci + qn] &&
                !(Bi[qn] !== Bi[qn] && G[ci + qn] !== G[ci + qn])
              ) {
                let Hs = this.info;
                ((Hs.slotMismatch = (Hs.slotMismatch || 0) + 1),
                  Hs.slotMismatch <= 3 &&
                    console.error(
                      "clean slot mismatch",
                      ft.name || ft.type,
                      "float",
                      qn,
                      Bi[qn],
                      G[ci + qn],
                    ));
                break;
              }
          }
      }),
      this._slotEnd(),
      n?.push(performance.now()));
    let tt =
        !this._scissorTest &&
        (!this._viewport ||
          (this._viewport[0] === 0 &&
            this._viewport[1] === 0 &&
            this._viewport[2] >= this.width &&
            this._viewport[3] >= this.height)),
      it =
        this.fullMat &&
        this.samples === 1 &&
        (!this.neural || this.enhanceNeural) &&
        this.enhance !== !1 &&
        tt &&
        !r;
    if (
      it &&
      A.length &&
      (!this._sceneDepth || this.info.render.frame % 8 === 0)
    ) {
      let ft = Math.max(1, Math.floor(A.length / 256)),
        kt = [];
      for (let St = 0; St < A.length; St += ft) {
        let Ft = A[St],
          Gt = Ft.o3.geometry.boundingSphere,
          Bt = Gt
            ? -this._v
                .copy(Gt.center)
                .applyMatrix4(Ft.o3.matrixWorld)
                .applyMatrix4(e.matrixWorldInverse).z
            : 0;
        Bt > 0 && kt.push(Bt);
      }
      (kt.sort((St, Ft) => St - Ft),
        (this._sceneDepth = kt.length ? kt[kt.length >> 1] : 5));
    }
    let rt = this._sceneDepth || 5;
    ((h[188] = it && this.ao !== !1 ? 1 : 0),
      (h[189] = it && this.ssr !== !1 ? 1 : 0),
      (h[190] =
        it && this.specularAA !== !1
          ? +this.specularAA > 0
            ? +this.specularAA
            : 1
          : 0),
      (h[191] = this.aoDebug ? (this.aoDebug === 2 ? 2 : 1) : 0),
      it &&
        !(h[160] > 0) &&
        ((h[161] = this.ssrDistance ?? rt * 0.9),
        (h[162] = this.ssrThickness ?? rt * 0.03),
        (h[163] = this.ssrStrength ?? 1)),
      (h[176] = this.glassTransmittance ?? 0.67),
      (h[177] = O.length && u.intensity > 0 ? 1 : 0),
      (h[178] = O.length && this._spots.length ? 1 : 0),
      (h[179] = o?.glassBackfaceTIR ? 1 : 0));
    let lt = null;
    ($ &&
      !st &&
      !this.physicalSky &&
      ($.visible !== !1 &&
        $.layers.test(e.layers) &&
        (this.pPreetham && $.material?.uniforms?.sunPosition
          ? (lt = $)
          : U.push($)),
      ($ = null)),
      ($ || st) &&
        !this._so &&
        (this._so = new U6(this, {
          quality:
            this.oceanQuality ||
            (this.maxBloomLevels < 6 ? "mobile" : "desktop"),
        })));
    let ct = ($ || st) && this._so?.isReady ? this._so : null;
    D.length && !this._vfx && (this._vfx = new j6(this, AU));
    let dt = D.length && this._vfx?.ready ? this._vfx : null;
    (dt &&
      dt.frame(D, {
        camera: e,
        scene: t,
        sun: u,
        skyOcean: ct && $ ? ct : null,
        sky: $,
        W: this._W,
        H: this._H,
        envOn: !!(this.neural || this._envPrior),
      }),
      (this._skyActive = !!(ct && $)));
    let ut = I.find((ft) => !ft.nm) || null,
      ot = !ut && !!(ct && st && L.length),
      at = (I.length > 0 || ot) && this.planarEnabled !== !1;
    if (this.bounceFloor) this._bounceFloor = this.bounceFloor;
    else if (I.length && !this._bounceFloor) {
      let ft = I[0].o3?.material,
        kt = ft?.color || new $t(0.5, 0.5, 0.5),
        St = 0.2126 * kt.r + 0.7152 * kt.g + 0.0722 * kt.b;
      this._bounceFloor = {
        y: o?.planar?.y ?? 0,
        albedo: Math.min(Math.max(St, 0.05), 0.9),
        color: new $t(
          kt.r / Math.max(St, 0.001),
          kt.g / Math.max(St, 0.001),
          kt.b / Math.max(St, 0.001),
        ),
      };
    }
    (this._fitDynShadow(h, u, e), (h[102] = at ? 1 : 0));
    let yt = this._frameRefl;
    if (at) {
      let ft = ut?.o3.matrixWorld.elements,
        kt = ut ? ft[13] : ot ? st.position.y : (o?.planar?.y ?? 0);
      this._refl.set(1, 0, 0, 0, 0, -1, 0, 2 * kt, 0, 0, 1, 0, 0, 0, 0, 1);
      let St = e.projectionMatrix;
      if (ut) {
        let Ft = +ut.o3.userData.mbPlanar.r || 20,
          Gt = ft[12],
          Bt = ft[14];
        this._studioRF = (Se, Rt, Vt, Pe) =>
          Pe < Ft &&
          (Se - Gt) * (Se - Gt) + (Vt - Bt) * (Vt - Bt) < Ft * Ft &&
          Rt > kt - 0.5 &&
          Rt - Pe < kt + Ft;
      }
      if (
        ((this._mirrorY0 = kt),
        (this._mirrorWater = ot),
        (this._mirrorRF = ut ? this._studioRF : ot ? this.reflectFilter : null),
        ot || ut)
      ) {
        let Ft = (this._projO ||= new ye()).copy(St),
          Gt = Ft.elements,
          Bt = e.matrixWorldInverse.elements,
          Se = kt - (ut ? 0.005 : 0.15),
          Rt = -Bt[4],
          Vt = -Bt[5],
          Pe = -Bt[6],
          bs = Se,
          Ts = bs - (Rt * Bt[12] + Vt * Bt[13] + Pe * Bt[14]),
          Xe = [Rt, Vt, Pe, Ts],
          pn = [
            (Math.sign(Xe[0]) + Gt[8]) / Gt[0],
            (Math.sign(Xe[1]) + Gt[9]) / Gt[5],
            -1,
            (1 + Gt[10]) / Gt[14],
          ],
          Qs =
            2 / (Xe[0] * pn[0] + Xe[1] * pn[1] + Xe[2] * pn[2] + Xe[3] * pn[3]);
        ((Gt[2] = Xe[0] * Qs),
          (Gt[6] = Xe[1] * Qs),
          (Gt[10] = Xe[2] * Qs + 1),
          (Gt[14] = Xe[3] * Qs),
          (St = Ft));
      }
      (this._vpR
        .multiplyMatrices(V1, St)
        .multiply(e.matrixWorldInverse)
        .multiply(this._refl),
        yt.set(h),
        yt.set(this._vpR.elements, 0),
        yt.set(this._m.copy(this._vpR).invert().elements, 16),
        TU(yt, St),
        (yt[33] = 2 * kt - f[13]),
        (yt[42] = 1));
    }
    if (q) {
      let ft = this._dirtyS,
        kt = this._slots.top,
        St = Ya / 4;
      if (ft.length * 2 > kt)
        s.queue.writeBuffer(this.objBuf, 0, G, 0, kt * St);
      else if (ft.length) {
        ft.sort((Bt, Se) => Bt - Se);
        let Ft = ft[0],
          Gt = Ft;
        for (let Bt = 1; Bt <= ft.length; Bt++) {
          let Se = ft[Bt];
          if (Se === Gt || Se === Gt + 1) {
            Gt = Se;
            continue;
          }
          (s.queue.writeBuffer(
            this.objBuf,
            Ft * Ya,
            G,
            Ft * St,
            (Gt - Ft + 1) * St,
          ),
            (Ft = Gt = Se));
        }
      }
      ((this.info.slotsWritten = ft.length), (this.info.slotsTop = kt));
    }
    (Y &&
      (s.queue.writeBuffer(this.boneBuf, 0, this._boneData, 0, Y * 16),
      s.queue.writeBuffer(this.boneBufPrev, 0, this._boneDataPrev, 0, Y * 16)),
      s.queue.writeBuffer(
        this.lightBuf,
        0,
        this._lightData,
        0,
        G5 + $1 * Math.max(z.n, 1),
      ));
    let vt = !1,
      Pt =
        z.n > 0 &&
        o?.output === "phys2" &&
        (o?.dynProbe === !0 || this.dynamicProbe === !0);
    Pt && !this._dyn && (this._dynNeeded = !0);
    let jt =
      Pt &&
      !!this._dyn &&
      !!this.pDynPrefilter &&
      !!this.pNeuralLin &&
      !!this.pStandardLin &&
      !!this.pMip;
    if (jt) {
      let ft = Array.from(this._lightData.subarray(0, G5 + $1 * z.n), (kt) =>
        kt.toFixed(3),
      ).join(",");
      if (ft !== this._dyn.key) {
        ((vt = !0), (this._dyn.key = ft));
        let kt = this._dyn,
          St = kt.frame;
        kt.vps.forEach((Ft, Gt) => {
          (St.set(h),
            St.set(Ft.elements, 0),
            St.set(this._m.copy(Ft).invert().elements, 16),
            (St[W5 + 2] = 0),
            (St[32] = kt.c.x),
            (St[33] = kt.c.y),
            (St[34] = kt.c.z),
            (St[39] = 0),
            (St[40] = 0),
            (St[42] = 1),
            (St[102] = 0),
            (St[103] = 0),
            s.queue.writeBuffer(kt.fb[Gt], 0, St));
        });
      }
    }
    h[103] = jt ? 1 : 0;
    let Ct =
        !!this.smMove &&
        this.moverShadows !== !1 &&
        u.intensity > 0 &&
        this._sunShadowOn
          ? F.filter((ft) => ft.o3.userData.mbMover)
          : [],
      qt = Ct.length ? F.filter((ft) => !ft.o3.userData.mbMover) : F,
      Zt = this._nearOn ? Ct.filter((ft) => !this._inNearCore(ft)) : Ct;
    ((h[484] = Zt.length ? 2 / this._shadowRes : 0),
      (h[485] = this.shadowTaps ?? 32),
      (h[486] = this.carWet ?? 0),
      (h[487] = this.carWarm ?? 0),
      s.queue.writeBuffer(this.frameBuf, 0, h),
      at && s.queue.writeBuffer(this.frameBufRefl, 0, yt),
      n?.push(performance.now()));
    let he = s.createCommandEncoder(),
      ee = !0,
      Xt = this.profile && this.hasTimestamps,
      me = [],
      re = this.hasTimestamps && (Xt || this.info.render.frame % 16 === 0),
      os = () => {
        if (!(Xt || !ee || !re))
          return (
            (ee = !1),
            { querySet: this.qset, beginningOfPassWriteIndex: 0 }
          );
      },
      Dt = (ft, kt = !0, St = !0) => {
        if (!Xt || (kt && me.length >= 24)) return;
        kt && me.push(ft);
        let Ft = me.length - 1;
        if (!(!kt && !St))
          return {
            querySet: this.qset,
            ...(kt ? { beginningOfPassWriteIndex: 2 * Ft } : {}),
            ...(St ? { endOfPassWriteIndex: 2 * Ft + 1 } : {}),
          };
      },
      qe = (ft, kt) =>
        he.beginRenderPass({
          colorAttachments: [],
          timestampWrites: Xt && kt && this.profileShadows ? Dt(kt) : os(),
          depthStencilAttachment: {
            view: ft.createView(),
            depthLoadOp: "clear",
            depthStoreOp: "store",
            depthClearValue: 1,
          },
        }),
      pe = (ft) => {
        let kt = ft.length;
        for (let St of ft)
          kt =
            (Math.imul(kt, 31) +
              this._uid(St.o3) * 7919 +
              this._uid(St.rec) +
              (St.inst
                ? St.o3.instanceMatrix.version * 131 + St.inst.count
                : 0)) |
            0;
        return kt;
      },
      we = "",
      rs = pe(qt);
    (this.neural ||
      (qt.some((ft) => ft.moving) &&
        (this._casterEpoch = (this._casterEpoch || 0) + 1),
      (we = String(this._casterEpoch || 0))),
      this.shadowEpoch && (we += "|" + this.shadowEpoch));
    let Le = F,
      de = [],
      Ie = rs,
      ps = we;
    if (
      (this._spots.length &&
        F.some((ft) => ft.o3.userData.mbMover) &&
        ((Le = F.filter((ft) => !ft.o3.userData.mbMover)),
        (de = F.filter((ft) => ft.o3.userData.mbMover)),
        Le.length !== qt.length &&
          ((Ie = pe(Le)),
          this.neural ||
            (Le.some((ft) => ft.moving) &&
              (this._spotEpoch = (this._spotEpoch || 0) + 1),
            (ps =
              String(this._spotEpoch || 0) +
              (this.shadowEpoch ? "|" + this.shadowEpoch : ""))))),
      u.intensity > 0 && this._sunShadowOn)
    ) {
      let ft = `${this._lightVP.elements.map((Bt) => Bt.toFixed(5)).join(",")}|${rs}|${we}`,
        kt = (Bt, Se, Rt = this.frameGroup) => {
          let Vt = qe(Bt, Bt === this.smStatic ? "sun shadow" : "near shadow");
          if (
            Se.length &&
            Bt === this.smDyn &&
            this.renderBundles !== !1 &&
            !this.neural
          ) {
            let Pe = this._ops();
            (this._casterOps(
              Pe,
              Se,
              this.pShadow,
              this.pShadowA,
              this.pShadowZ,
            ),
              Pe.n &&
                this._runBundles(Vt, "near", Pe, Rt, null, {
                  colorFormats: [],
                  depthStencilFormat: Bt.format,
                }));
          } else
            Se.length &&
              (Vt.setBindGroup(0, Rt),
              this._drawCasters(
                Vt,
                Se,
                this.pShadow,
                this.pShadowA,
                this.pShadowZ,
              ));
          Vt.end();
        },
        St =
          this._staticSunKey &&
          this._staticSunKey.slice(0, this._staticSunKey.indexOf("|")) ===
            ft.slice(0, ft.indexOf("|")),
        Ft = performance.now(),
        Gt =
          ft !== this._staticSunKey &&
          St &&
          this.sunCacheMs > 0 &&
          Ft - (this._sunDrawT || 0) < this.sunCacheMs;
      if (ft !== this._staticSunKey && !Gt) {
        if (((this._sunDrawT = Ft), this.sunKeyLog)) {
          let Se = this._staticSunKey?.split("|") || [],
            Rt = ft.split("|"),
            Vt = qt
              .filter((Pe) => Pe.moving)
              .slice(0, 4)
              .map((Pe) => Pe.o3.name || Pe.o3.parent?.name || Pe.o3.type);
          this.sunKeyLog.push(
            [
              Se[0] !== Rt[0] ? "vp" : "",
              Se[1] !== Rt[1] ? "set" : "",
              Se.slice(2).join("|") !== Rt.slice(2).join("|")
                ? "move:" +
                  Vt.join(",") +
                  (this.shadowEpoch ? " ep" + this.shadowEpoch : "")
                : "",
            ]
              .filter(Boolean)
              .join(" "),
          );
        }
        kt(this.smStatic, qt);
        let Bt = he.beginRenderPass({
          colorAttachments: [
            {
              view: this._glassTView[0],
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 1, g: 1, b: 1, a: 1 },
            },
          ],
        });
        (O.length &&
          this.pGlassTSun &&
          (Bt.setPipeline(this.pGlassTSun),
          Bt.setBindGroup(0, this.frameGroup),
          this._drawList(Bt, O, !0)),
          Bt.end(),
          (this._staticSunKey = ft));
      }
      if (Zt.length) {
        let Bt = qe(this.smMove, "movers shadow");
        if (this.renderBundles !== !1 && !this.neural) {
          let Se = this._ops();
          (this._casterOps(Se, Zt, this.pShadow, this.pShadowA, this.pShadowZ),
            Se.n &&
              this._runBundles(Bt, "movers", Se, this.frameGroup, null, {
                colorFormats: [],
                depthStencilFormat: this.smMove.format,
              }));
        } else
          (Bt.setBindGroup(0, this.frameGroup),
            this._drawCasters(
              Bt,
              Zt,
              this.pShadow,
              this.pShadowA,
              this.pShadowZ,
            ));
        Bt.end();
      }
      this._nearOn
        ? kt(
            this.smDyn,
            this._nearCasters(
              F.filter((Bt) => !Bt.o3.userData.mbFarShadow).concat(N, B),
            ),
            this.frameGroupDyn,
          )
        : kt(this.smDyn, N.concat(B));
    }
    if (this._spots.length) {
      let ft = this._frameSpot;
      this._spots.forEach((Gt, Bt) => {
        (ft.set(h),
          ft.set(Gt.vp.elements, 44),
          (ft[32] = Gt.pos.x),
          (ft[33] = Gt.pos.y),
          (ft[34] = Gt.pos.z),
          s.queue.writeBuffer(this.frameBufSpot[Bt], 0, ft));
      });
      let kt = this._spots.map((Gt) => Gt.key).join(";") + "|" + Ie + "|" + ps,
        St = Fg / 2,
        Ft = (Gt, Bt) => {
          let Se = qe(Gt),
            Rt = this.renderBundles !== !1 && !this.neural,
            Vt = null;
          (Bt.length &&
            Rt &&
            ((Vt = this._ops()),
            this._casterOps(
              Vt,
              Bt,
              this.pShadowSpot,
              this.pShadowSpotA,
              this.pShadowSpotZ,
            )),
            Bt.length &&
              this._spots.forEach((Pe, bs) => {
                (Se.setViewport(
                  (Pe.tile % 2) * St,
                  Math.floor(Pe.tile / 2) * St,
                  St,
                  St,
                  0,
                  1,
                ),
                  Vt
                    ? Vt.n &&
                      this._runBundles(
                        Se,
                        (Gt === this.spotStatic ? "spotS" : "spotD") + bs,
                        Vt,
                        this.frameGroupSpot[bs],
                        null,
                        { colorFormats: [], depthStencilFormat: Gt.format },
                      )
                    : (Se.setBindGroup(0, this.frameGroupSpot[bs]),
                      this._drawCasters(
                        Se,
                        Bt,
                        this.pShadowSpot,
                        this.pShadowSpotA,
                        this.pShadowSpotZ,
                      )));
              }),
            Se.end());
        };
      if (kt !== this._staticSpotKey) {
        if (this.sunKeyLog) {
          let Bt = this._spotKeyParts || [],
            Se = [
              kt.slice(
                0,
                kt.length - (String(Ie).length + String(ps).length + 2),
              ),
              Ie,
              ps,
            ],
            Rt = Le.filter((Vt) => Vt.moving)
              .slice(0, 3)
              .map((Vt) => Vt.o3.name || Vt.o3.parent?.name || Vt.o3.type);
          (this.sunKeyLog.push(
            "spot " +
              [
                Bt[0] !== Se[0] ? "lights" : "",
                Bt[1] !== Se[1] ? "set" : "",
                Bt[2] !== Se[2] ? "move:" + Rt.join(",") : "",
              ]
                .filter(Boolean)
                .join(" "),
          ),
            (this._spotKeyParts = Se));
        }
        Ft(this.spotStatic, Le);
        let Gt = he.beginRenderPass({
          colorAttachments: [
            {
              view: this._glassTView[1],
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 1, g: 1, b: 1, a: 1 },
            },
          ],
        });
        (O.length &&
          this.pGlassTSpot &&
          (Gt.setPipeline(this.pGlassTSpot),
          this._spots.forEach((Bt, Se) => {
            (Gt.setViewport(
              (Bt.tile % 2) * St,
              Math.floor(Bt.tile / 2) * St,
              St,
              St,
              0,
              1,
            ),
              Gt.setBindGroup(0, this.frameGroupSpot[Se]),
              this._drawList(Gt, O, !0));
          })),
          Gt.end(),
          (this._staticSpotKey = kt));
      }
      Ft(this.spotDyn, de.length ? N.concat(de) : N);
    } else
      this._staticSpotKey !== "none" &&
        (qe(this.spotStatic).end(),
        qe(this.spotDyn).end(),
        (this._staticSpotKey = "none"));
    if (this._points?.length) {
      let ft = this._frameSpot,
        kt = K6,
        St = F.concat(N);
      for (let Ft of this._points) {
        Ft.vps.forEach((Bt, Se) => {
          (ft.set(h),
            ft.set(Bt.elements, 44),
            (ft[32] = Ft.pos.x),
            (ft[33] = Ft.pos.y),
            (ft[34] = Ft.pos.z),
            s.queue.writeBuffer(this.frameBufPoint[Ft.idx * 6 + Se], 0, ft));
        });
        let Gt = he.beginRenderPass({
          colorAttachments: [],
          timestampWrites: os(),
          depthStencilAttachment: {
            view: this._pointSMView[Ft.idx],
            depthLoadOp: "clear",
            depthStoreOp: "store",
            depthClearValue: 1,
          },
        });
        if (St.length)
          for (let Bt = 0; Bt < 6; Bt++)
            (Gt.setViewport(
              (Bt % 3) * kt,
              Math.floor(Bt / 3) * kt,
              kt,
              kt,
              0,
              1,
            ),
              Gt.setBindGroup(0, this.frameGroupPoint[Ft.idx * 6 + Bt]),
              this._drawCasters(Gt, St, this.pShadowSpot, this.pShadowSpotA));
        Gt.end();
      }
    }
    if ((n?.push(performance.now()), this._spotMapReq?.length))
      for (let ft of this._spotMapReq) {
        let kt = `${ft.tex.uuid}:${ft.tex.version}`;
        if (this._spotMapKeys[ft.layer] === kt) continue;
        let St = this._texture(ft.tex);
        if (!St) continue;
        let Ft = this._spotMapView[ft.layer];
        this._blit(he, St, Ft[0], "rgba8unorm-srgb");
        for (let Gt = 1; Gt < Ft.length; Gt++) {
          let Bt = s.createBindGroup({
              layout: this.mipLayout,
              entries: [
                { binding: 0, resource: Ft[Gt - 1] },
                { binding: 1, resource: this.linSampler },
              ],
            }),
            Se = he.beginRenderPass({
              colorAttachments: [
                { view: Ft[Gt], loadOp: "clear", storeOp: "store" },
              ],
            });
          (Se.setPipeline(this._blitPipe("rgba8unorm-srgb")),
            Se.setBindGroup(0, Bt),
            Se.draw(3),
            Se.end());
        }
        this._spotMapKeys[ft.layer] = kt;
      }
    dt &&
      dt.simulate(he, {
        envTex: this.neural
          ? this.neural.priorTex
          : this._envPrior || Td.empty(s).priorTex,
        timestampWrites: Xt ? Dt("vfx simulation") : os(),
      });
    let gt = !!dt?.hasPost;
    if (z.n > z.nUnbounded && this.pCluster) {
      let ft = he.beginComputePass({ timestampWrites: os() });
      (ft.setPipeline(this.pCluster),
        ft.setBindGroup(0, this.clusterGroup),
        ft.dispatchWorkgroups(
          Math.ceil(zc.x / 4),
          Math.ceil(zc.y / 3),
          Math.ceil(zc.z / 4),
        ),
        ft.end());
    }
    let se = !!this.pNeural && this.neuralEnabled !== !1;
    if (
      (vt &&
        this._dynEncode(
          he,
          L.filter((ft) => ft.surf < 2),
        ),
      at)
    ) {
      let ft = he.beginRenderPass({
        colorAttachments: [
          {
            view: this._views.planar0,
            loadOp: "clear",
            storeOp: "store",
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
          },
        ],
        depthStencilAttachment: {
          view: this._views.planarDepth,
          depthLoadOp: "clear",
          depthStoreOp: "discard",
          depthClearValue: 1,
        },
        timestampWrites: Xt ? Dt("reflection") : os(),
      });
      (ft.setBindGroup(0, this.frameGroupRefl),
        ft.setBindGroup(2, this._envGroups.planar));
      let kt = (this._frustumR ||= new No()),
        St = (this._sphereR ||= new _n()),
        Ft = ut ? this._studioRF : ot ? this.reflectFilter : null;
      kt.setFromProjectionMatrix(
        this._m
          .multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)
          .multiply(this._refl),
      );
      let Gt = new Map(),
        Bt = L.filter((Rt) => {
          if (
            Rt.surf >= 2 ||
            (ut && Rt.hook && !this._hookPipe(Rt.hook, "lin"))
          )
            return !1;
          if (ut)
            return (
              Rt.cr !== void 0 &&
              Ft(Rt.cx, Rt.cy, Rt.cz, Rt.cr) &&
              (St.center.set(Rt.cx, Rt.cy, Rt.cz),
              (St.radius = Rt.cr),
              kt.intersectsSphere(St))
            );
          let Vt = Rt.o3.userData.mbReflR;
          if (Vt && Ft) {
            let Pe = Gt.get(Vt);
            if (Pe === void 0) {
              let bs = e.position;
              ((Pe = Ft(bs.x, bs.y - 2, bs.z, Vt, e)), Gt.set(Vt, Pe));
            }
            return Pe;
          }
          return Rt.cr === void 0 || Rt.o3.frustumCulled === !1
            ? !0
            : (St.center.set(Rt.cx, Rt.cy, Rt.cz),
              (St.radius = Rt.cr),
              kt.intersectsSphere(St) &&
                (!Ft || Ft(Rt.cx, Rt.cy, Rt.cz, Rt.cr, e)));
        });
      Bt.sort(
        (Rt, Vt) =>
          Rt.ro - Vt.ro || Number(Rt.po && !Rt.pw) - Number(Vt.po && !Vt.pw),
      );
      let Se = (Rt) =>
        this._offsetPipe(
          Rt.nm && this.pNeuralLin
            ? this.pNeuralLin
            : (ut && Rt.hook && this._hookPipe(Rt.hook, "lin")) ||
                this.pStandardLin,
          Rt,
        );
      if (this.renderBundles !== !1 && !this.neural) {
        let Rt = this._ops();
        for (let Vt of Bt) {
          let Pe = Se(Vt);
          Pe && this._op(Rt, Pe, null, Vt, !0);
        }
        Rt.n &&
          this._runBundles(
            ft,
            "refl",
            Rt,
            this.frameGroupRefl,
            this._envGroups.planar,
            {
              colorFormats: [this._planar.format],
              depthStencilFormat: this._planarDepth.format,
            },
            !0,
          );
      } else this._drawGrouped(ft, Bt, Se, !0);
      if (
        (ft.end(),
        !this._lodBusy &&
          Bt.some((Rt) => Rt.rec.lod === void 0) &&
          this._buildLods(Bt.map((Rt) => Rt.rec)),
        this._mipGroups.length)
      ) {
        let Rt = he.beginComputePass(
          Xt ? { timestampWrites: Dt("reflection mips") } : {},
        );
        Rt.setPipeline(this.pDownCS);
        for (let Vt of this._mipGroups)
          (Rt.setBindGroup(0, Vt.group),
            Rt.dispatchWorkgroups(Math.ceil(Vt.w / 8), Math.ceil(Vt.h / 8)));
        Rt.end();
      }
    }
    let Nt = at
        ? (this._views.planarTex ||= this._planar.createView())
        : (this._dummyView ||= this.dummy2d.createView()),
      xe = U.length ? this._sideRender(t, e, U) : null;
    ct &&
      ct.update(he, {
        camera: e,
        vp: h.subarray(0, 16),
        ivp: h.subarray(16, 32),
        sky: $,
        water: st,
        planar: at,
        time: st?.material?.uniforms?.time?.value ?? performance.now() / 1e3,
        W: this._W,
        H: this._H,
        exposure: this.toneMappingExposure,
        toneMapping: this.toneMapping ?? 0,
        timestampWrites: Xt ? Dt("sky+ocean compute") : os(),
        fogU: (() => {
          let ft = (this._oceanFogU ||= new Float32Array(20)),
            kt = 248 + Ig * 12;
          return (
            ft.set(h.subarray(128, 136), 0),
            ft.set(h.subarray(kt, kt + 12), 8),
            ft
          );
        })(),
      });
    let ce = this._cur,
      Ge = this.samples > 1,
      Fe = this.ctx.getCurrentTexture(),
      $e = Fe.createView(),
      Ds = Fe !== this._lastCanvasTex;
    this._lastCanvasTex = Fe;
    let Es = this._W,
      Ls = this._H,
      Os = this.pixelRatio,
      hs = (ft) => {
        let kt = Math.round(ft[2] * Os),
          St = Math.round(ft[3] * Os),
          Ft = Math.round(ft[0] * Os),
          Gt = Math.round(Ls - (ft[1] * Os + St)),
          Bt = Math.min(Math.max(Ft, 0), Es - 1),
          Se = Math.min(Math.max(Gt, 0), Ls - 1);
        return [
          Bt,
          Se,
          Math.max(1, Math.min(kt - (Bt - Ft), Es - Bt)),
          Math.max(1, Math.min(St - (Se - Gt), Ls - Se)),
        ];
      },
      Zs = hs(this._viewport || [0, 0, this.width, this.height]),
      We = this._scissorTest && this._scissor ? hs(this._scissor) : Zs,
      Is = (ft) => ft[0] === 0 && ft[1] === 0 && ft[2] >= Es && ft[3] >= Ls,
      ns = !Is(Zs) || !Is(We);
    if (this._out && (ns || r))
      return (
        console.warn("renderer: upscale off (a viewport / overlay render)"),
        (this._upOff = !0),
        this._resize(),
        (this._lastCanvasTex = null),
        this.render(t, e)
      );
    let rn = (ns || r) && !Ds,
      dn = Xt
        ? Dt("main")
        : re
          ? {
              querySet: this.qset,
              endOfPassWriteIndex: 1,
              ...(ee ? { beginningOfPassWriteIndex: 0 } : {}),
            }
          : void 0,
      Hn = t.background?.isColor ? t.background : null,
      Dn = (ft) =>
        ft <= 0.0031308 ? ft * 12.92 : 1.055 * Math.pow(ft, 1 / 2.4) - 0.055,
      Un = Hn || this._clearColor,
      Xs = Un
        ? { r: Dn(Un.r), g: Dn(Un.g), b: Dn(Un.b), a: 1 }
        : { r: 0, g: 0, b: 0, a: 1 },
      _i = rn ? "load" : "clear",
      Mt = ns ? "store" : "discard",
      Kt = null;
    if (
      ((it && this.depthPrepass !== !1) ||
        (this.fullMat &&
          this.samples === 1 &&
          (!this.neural || this.enhanceNeural) &&
          tt &&
          this.depthPrepass !== !1)) &&
      !ns &&
      this.pStdPre?.back &&
      this.pStdPre.front &&
      this.pStdPre.none &&
      this.pStandardEq
    ) {
      let ft = A.filter(
        (kt) =>
          !kt.nm &&
          !kt.at &&
          !kt.po &&
          (!kt.hook || this._hookPipe(kt.hook, !0)) &&
          !kt.line &&
          kt.surf < 2,
      );
      if (
        (ft.length > 1 &&
          ft.sort(
            (kt, St) =>
              kt.ro - St.ro ||
              (kt.lean ? 1 : 0) - (St.lean ? 1 : 0) ||
              this._uid(kt.rec) - this._uid(St.rec),
          ),
        ft.length)
      ) {
        Kt = new Set(ft);
        let kt = he.beginRenderPass({
            colorAttachments: [],
            depthStencilAttachment: {
              view: this._views.depth,
              depthLoadOp: "clear",
              depthStoreOp: "store",
              depthClearValue: 1,
            },
            timestampWrites: Xt ? Dt("pre-pass") : os(),
          }),
          St = (Ft) => {
            let Gt = (Ft.slot * Ya) / 4,
              Bt = G[Gt + 138],
              Se = G[Gt + 139] > 0.5;
            return this.pStdPre[
              (Bt > 1.5 ? "none" : Bt < 0.5 !== Se ? "back" : "front") +
                (Ft.lean && this.pStdPre.noneZ ? "Z" : "")
            ];
          };
        if (this.renderBundles !== !1 && !this.neural) {
          let Ft = this._ops();
          for (let Gt of ft) this._op(Ft, St(Gt), null, Gt, !0);
          this._runBundles(
            kt,
            "pre",
            Ft,
            this.frameGroup,
            this._envGroups.main[ce],
            {
              colorFormats: [],
              depthStencilFormat: this._depth.format,
              sampleCount: this.samples,
            },
          );
        } else {
          (kt.setBindGroup(0, this.frameGroup),
            kt.setBindGroup(2, this._envGroups.main[ce]));
          let Ft = null;
          for (let Gt of ft) {
            let Bt = St(Gt);
            (Bt !== Ft && (kt.setPipeline(Bt), (Ft = Bt)),
              this._draw1(kt, Gt, !0));
          }
        }
        if ((kt.end(), h[188] > 0 && this.pGtao && this._aoTex)) {
          if (!this._aoGroups) {
            let Rt = (Vt, Pe, bs) =>
              s.createBindGroup({
                layout: this.aoL1,
                entries: [
                  { binding: 0, resource: { buffer: this.aoBuf } },
                  { binding: 1, resource: this._views.depth },
                  { binding: 2, resource: Vt.createView() },
                  { binding: 3, resource: Pe.createView() },
                  { binding: 4, resource: bs.createView() },
                ],
              });
            this._aoGroups = {
              gtao: [0, 1].map((Vt) =>
                Rt(this._aoRaw, this._aoTex, this._scene[1 - Vt]),
              ),
              blur: Rt(this._aoTex, this._aoRaw, this._scene[0]),
            };
          }
          let Ft = e.projectionMatrix.elements;
          s.queue.writeBuffer(
            this.aoBuf,
            0,
            new Float32Array([
              this.aoRadius ?? rt * 0.1,
              this.aoIntensity ?? 1,
              this._W,
              this._H,
              this.info.render.frame % 16,
              this._H * 0.12,
              0.6,
              this.gi === !1 ? 0 : (this.giStrength ?? 1),
              e.near || 0.05,
              e.far || 2e3,
              Ft[0],
              Ft[5],
              Ft[8] - this._jit[0],
              Ft[9] - this._jit[1],
              0,
              0,
            ]),
          );
          let Gt = he.beginComputePass(
              Xt ? { timestampWrites: Dt("gtao") } : {},
            ),
            Bt = Math.ceil(this._W / 2),
            Se = Math.ceil(this._H / 2);
          (Gt.setBindGroup(0, this.aoG0),
            Gt.setPipeline(this.pGtao),
            Gt.setBindGroup(1, this._aoGroups.gtao[ce]),
            Gt.dispatchWorkgroups(Math.ceil(Bt / 8), Math.ceil(Se / 8)),
            Gt.setPipeline(this.pAoBlur),
            Gt.setBindGroup(1, this._aoGroups.blur),
            Gt.dispatchWorkgroups(Math.ceil(Bt / 8), Math.ceil(Se / 8)),
            Gt.end());
        }
      }
    }
    (!Kt &&
      h[188] > 0 &&
      ((h[188] = 0), s.queue.writeBuffer(this.frameBuf, 752, h, 188, 4)),
      n?.push(performance.now()));
    let wt = he.beginRenderPass({
      colorAttachments: [
        Ge
          ? {
              view: this._views.color,
              resolveTarget: $e,
              loadOp: _i,
              storeOp: Mt,
              clearValue: Xs,
            }
          : {
              view: this.fxaa && !r ? this._views.ldr : $e,
              loadOp: _i,
              storeOp: "store",
              clearValue: Xs,
            },
        Ge
          ? {
              view: this._views.hdr,
              resolveTarget: this._views.scene[ce],
              loadOp: _i,
              storeOp: Mt,
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
            }
          : {
              view: this._views.scene[ce],
              loadOp: _i,
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
            },
      ],
      depthStencilAttachment: {
        view: this._views.depth,
        depthLoadOp: Kt ? "load" : "clear",
        depthStoreOp:
          gt || c || this.keepDepth || this.motionBlur > 0
            ? "store"
            : "discard",
        depthClearValue: 1,
      },
      timestampWrites: dn,
    });
    (ns &&
      (wt.setViewport(Zs[0], Zs[1], Zs[2], Zs[3], 0, 1),
      wt.setScissorRect(We[0], We[1], We[2], We[3])),
      rn &&
        this.autoClear !== !1 &&
        this.pClear &&
        (s.queue.writeBuffer(
          this.clearBuf,
          0,
          new Float32Array([Xs.r, Xs.g, Xs.b, 1]),
        ),
        wt.setPipeline(this.pClear),
        wt.setBindGroup(0, this.clearGroup),
        wt.draw(3)),
      wt.setBindGroup(0, this.frameGroup),
      wt.setBindGroup(2, this._envGroups.main[ce]));
    let _t = Kt ? -1 : 1,
      ie =
        A.length > 1
          ? [...A].sort(
              (ft, kt) =>
                ft.ro - kt.ro ||
                Number(ft.po && !ft.pw) - Number(kt.po && !kt.pw) ||
                (ft.gr - kt.gr) * _t ||
                (kt.nm && se) - (ft.nm && se) ||
                !!ft.hook - !!kt.hook ||
                (Kt?.has(ft) ? 1 : 0) - (Kt?.has(kt) ? 1 : 0) ||
                (ft.lean ? 1 : 0) - (kt.lean ? 1 : 0) ||
                this._uid(ft.rec) - this._uid(kt.rec) ||
                this._uid(ft.mat) - this._uid(kt.mat),
            )
          : A,
      te = se && this.depthPrepass && this.pNeuralPre && this.pNeuralEq;
    te &&
      this._drawGrouped(
        wt,
        ie.filter((ft) => ft.nm),
        () => this.pNeuralPre,
      );
    let Qt = (ft) =>
      this._offsetPipe(
        ft.nm && se
          ? te
            ? this.pNeuralEq
            : this.pNeural
          : Kt?.has(ft)
            ? ft.hook
              ? this._hookPipe(ft.hook, !0)
              : (ft.lean && this.pStandardEqZ) || this.pStandardEq
            : (ft.hook && this._hookPipe(ft.hook)) ||
              (ft.lean && this.pStandardZ) ||
              this.pStandard,
        ft,
      );
    if (this.renderBundles !== !1 && !this.neural && !ns && !r && !rn) {
      let ft = this._ops();
      for (let Ft of ie) {
        let Gt = Qt(Ft);
        Gt && this._op(ft, Gt, null, Ft, !0);
      }
      let kt = Ge ? this._color : this.fxaa && !r ? this._ldr : Fe,
        St = Ge ? this._hdr : this._scene[ce];
      (this._runBundles(
        wt,
        "main",
        ft,
        this.frameGroup,
        this._envGroups.main[ce],
        {
          colorFormats: [kt.format, St.format],
          depthStencilFormat: this._depth.format,
          sampleCount: this.samples,
        },
      ),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(2, this._envGroups.main[ce]));
    } else this._drawGrouped(wt, ie, Qt);
    if (
      (H.length &&
        this.pLine?.opaque &&
        this._drawGrouped(wt, H, () => this.pLine.opaque),
      dt &&
        (dt.drawOpaque(wt),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(2, this._envGroups.main[ce]),
        (this._bs = null)),
      ct &&
        st &&
        (ct.drawOcean(wt, Nt),
        wt.setBindGroup(0, this.frameGroup),
        (this._bs = null)),
      ct && $
        ? (ct.drawSky(wt, Nt),
          wt.setBindGroup(0, this.frameGroup),
          (this._bs = null))
        : this._bgSrc &&
          this.pBg &&
          (wt.setPipeline(this.pBg),
          wt.setBindGroup(1, this.objGroup, [0]),
          wt.setBindGroup(3, this._defaultMat),
          wt.draw(3),
          (this._bs = null)),
      lt)
    ) {
      let ft = lt.material.uniforms,
        kt = (Gt) => ft[Gt]?.value,
        St = kt("sunPosition"),
        Ft = (this._skyU ||= new Float32Array(16));
      ((Ft[0] = St.x),
        (Ft[1] = St.y),
        (Ft[2] = St.z),
        (Ft[4] = kt("rayleigh") ?? 1),
        (Ft[5] = kt("turbidity") ?? 2),
        (Ft[6] = kt("mieCoefficient") ?? 0.005),
        (Ft[7] = kt("mieDirectionalG") ?? 0.8),
        (Ft[8] = kt("cloudScale") ?? 2e-4),
        (Ft[9] = kt("cloudSpeed") ?? 2e-5),
        (Ft[10] = kt("cloudCoverage") ?? 0),
        (Ft[11] = kt("cloudDensity") ?? 0.4),
        (Ft[12] = kt("cloudElevation") ?? 0.5),
        (Ft[13] = kt("showSunDisc") ?? 1),
        (Ft[14] = kt("time") ?? 0),
        s.queue.writeBuffer(this.skyUBuf, 0, Ft),
        wt.setPipeline(this.pPreetham),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(1, this.skyUGroup),
        wt.draw(3),
        (this._bs = null));
    }
    if (
      (xe &&
        this.pSide &&
        (wt.setPipeline(this.pSide),
        wt.setBindGroup(0, this._sideGroup),
        wt.draw(3),
        wt.setBindGroup(0, this.frameGroup)),
      C.length &&
        this._drawGrouped(wt, C, (ft) =>
          ft.nm && this.pNeuralGlass ? this.pNeuralGlass : this.pStandardGlass,
        ),
      P.length && this.pBlend)
    ) {
      let ft = null;
      for (let kt of P.sort((St, Ft) => St.ro - Ft.ro || St.depth - Ft.depth)) {
        let St =
            kt.kind === "points"
              ? this.p_points
              : kt.kind === "sprite"
                ? this.p_sprite
                : kt.line
                  ? this.pLine
                  : this.pBlend,
          Ft = St && (St[kt.blend] || St.alpha0);
        Ft &&
          (Ft !== ft && (wt.setPipeline(Ft), (ft = Ft)),
          kt.kind === "points"
            ? (wt.setBindGroup(1, this.objGroup, [kt.slot * Ya]),
              wt.setBindGroup(3, kt.mat || this._defaultMat),
              wt.setVertexBuffer(0, kt.rec.pos),
              wt.setVertexBuffer(1, kt.rec.color || this._zeroBuf),
              wt.draw(6, kt.count),
              (this._bs = null))
            : this._draw1(wt, kt, !0));
      }
    }
    (wt.end(),
      n?.push(performance.now()),
      gt &&
        !ns &&
        dt.post(he, {
          depthView: this._views.depth,
          linTex: this._scene[ce],
          linView: this._views.scene[ce],
          displayView: !Ge && this.fxaa ? this._views.ldr : $e,
          span: Xt ? Dt : null,
        }));
    let ge = c && !ns;
    if (ge && this.pVel) {
      let ft = A.filter((Vt) => Vt.moving && !Vt.line),
        kt = this.pVelLine
          ? [...H, ...P].filter((Vt) => Vt.moving && Vt.line)
          : [],
        St = he.beginRenderPass({
          colorAttachments: [
            {
              view: this._velTex.createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
            },
          ],
          depthStencilAttachment: {
            view: this._views.depth,
            depthReadOnly: !0,
          },
        }),
        Ft = ft.filter((Vt) => Vt.inst?.prevBuf),
        Gt = Ft.length ? ft.filter((Vt) => !Vt.inst?.prevBuf) : ft;
      if (
        (Gt.length &&
          (St.setPipeline(this.pVel),
          St.setBindGroup(0, this.frameGroup),
          this._drawList(St, Gt)),
        Ft.length)
      ) {
        (St.setPipeline(this.pVelI), St.setBindGroup(0, this.frameGroup));
        for (let Vt of Ft)
          (St.setVertexBuffer(4, Vt.inst.prevBuf),
            this._bs?.pass === St && (this._bs.vb[4] = Vt.inst.prevBuf),
            this._draw1(St, Vt));
      }
      kt.length &&
        (St.setPipeline(this.pVelLine),
        St.setBindGroup(0, this.frameGroup),
        this._drawList(St, kt));
      let Bt = this.pReact,
        Se = this._taaVP.elements.some(
          (Vt, Pe) => Math.abs(Vt - this._taaVPPrev.elements[Pe]) > 1e-6,
        ),
        Rt = Bt ? P.filter((Vt) => !Vt.line && (Vt.moving || Se)) : [];
      if (Rt.length) {
        (St.setBindGroup(0, this.frameGroup),
          St.setBindGroup(2, this._envGroups.main[ce]));
        let Vt = null;
        for (let Pe of Rt) {
          let bs =
            Bt[
              Pe.kind === "points"
                ? "points"
                : Pe.kind === "sprite"
                  ? "sprite"
                  : "mesh"
            ];
          bs &&
            (bs !== Vt && (St.setPipeline(bs), (Vt = bs)),
            Pe.kind === "points"
              ? (St.setBindGroup(1, this.objGroup, [Pe.slot * Ya]),
                St.setBindGroup(3, Pe.mat || this._defaultMat),
                St.setVertexBuffer(0, Pe.rec.pos),
                St.setVertexBuffer(1, Pe.rec.color || this._zeroBuf),
                St.draw(6, Pe.count),
                (this._bs = null))
              : this._draw1(St, Pe, !0));
        }
      }
      (gt && dt.drawReactive?.(St), St.end());
    }
    if (ge) {
      let ft = (this._taaU ||= new Float32Array(40));
      (ft.set(
        this._m.multiplyMatrices(
          this._taaVPPrev,
          (this._m2 ||= new ye()).copy(this._taaVP).invert(),
        ).elements,
        0,
      ),
        (ft[32] = 0),
        (ft[33] = 0),
        (ft[34] = this.taaBlend ?? 0.1),
        (ft[35] = this._taaReset ? 1 : 0),
        (ft[36] = this._W),
        (ft[37] = this._H),
        (ft[38] = 1 / this._W),
        (ft[39] = 1 / this._H),
        s.queue.writeBuffer(this.taaBuf, 0, ft));
      let kt = he.beginRenderPass({
        colorAttachments: [
          {
            view: this._taaTex[ce].createView(),
            loadOp: "clear",
            storeOp: "store",
          },
        ],
        timestampWrites: Xt ? Dt("taa") : void 0,
      });
      (kt.setPipeline(this.pTAA),
        kt.setBindGroup(0, this._taaGroups[ce]),
        kt.draw(3),
        kt.end(),
        (this._taaReset = !1));
    }
    let pt =
        this.bloom > 0
          ? this.bloom
          : it && this.defaultBloom !== 0
            ? (this.defaultBloom ?? 0.01)
            : 0,
      le =
        (pt > 0 || this.vignette > 0) && this._bloom && this.pMip && !ns && !r,
      Ut = null;
    if (this.fxaa && !r) {
      let ft = (this._fu ||= new Float32Array(64));
      (ft.set(this._m.copy(this._taaVP).invert().elements, 0),
        ft.set(this._taaVPPrev.elements, 16));
      let kt = this._mbCut;
      ((this._mbCut = !1),
        (ft[32] =
          kt || this.info.render.frame < 2 ? 0 : (this.motionBlur ?? 0)),
        (ft[33] = this.motionBlurMax ?? 0.035),
        (ft[34] = this.radialBlur ?? 0),
        (ft[35] = this.grade?.mids ?? 0));
      {
        let Bt = this.flare,
          Se = this.shafts;
        ((ft[54] = 0), (ft[63] = 0));
        let Rt = Bt?.strength > 0 ? Bt.dir : Se?.strength > 0 ? Se.dir : null;
        if (Rt) {
          let Vt = this._taaVP.elements,
            [Pe, bs, Ts] = Rt,
            Xe = Vt[0] * Pe + Vt[4] * bs + Vt[8] * Ts,
            pn = Vt[1] * Pe + Vt[5] * bs + Vt[9] * Ts,
            Qs = Vt[3] * Pe + Vt[7] * bs + Vt[11] * Ts;
          if (Qs > 1e-4 && Se?.strength > 0) {
            let Jt = Se.color || [1, 1, 1],
              Ns = Se.strength * Math.min(1, Qs * 3);
            ((ft[60] = Jt[0]),
              (ft[61] = Jt[1]),
              (ft[62] = Jt[2]),
              (ft[63] = Ns));
          }
          if (Qs > 1e-4) {
            let Jt = Xe / Qs,
              Ns = pn / Qs;
            ((ft[52] = Jt * 0.5 + 0.5),
              (ft[53] = 0.5 - Ns * 0.5),
              (ft[54] =
                Bt?.strength > 0 ? Bt.strength * Math.min(1, Qs * 4) : 0));
            let Sa = Bt?.color || [1, 1, 1];
            ((ft[56] = Sa[0]),
              (ft[57] = Sa[1]),
              (ft[58] = Sa[2]),
              (ft[59] = Math.max(0, 1 - Math.hypot(Jt, Ns) * 0.6)));
          }
        }
      }
      ((ft[36] = this._W),
        (ft[37] = this._H),
        (ft[38] = 1 / this._W),
        (ft[39] = 1 / this._H));
      let St = this.grade || {};
      ((ft[40] = St.saturation ?? 0),
        (ft[41] = St.contrast ?? 0),
        (ft[42] = St.warmth ?? 0),
        (ft[43] = St.lift ?? 0));
      let Ft = St.shadows || [0, 0, 0],
        Gt = St.highlights || [0, 0, 0];
      ((ft[44] = Ft[0]),
        (ft[45] = Ft[1]),
        (ft[46] = Ft[2]),
        (ft[47] = St.vibrance ?? 0),
        (ft[48] = Gt[0]),
        (ft[49] = Gt[1]),
        (ft[50] = Gt[2]),
        (ft[51] = St.curve ?? 0),
        s.queue.writeBuffer(this._fbuf, 0, ft));
    }
    if ((le || this.fxaa) && !r) {
      let ft = 0,
        kt = this._bloom,
        St = (Bt, Se, Rt = !1) =>
          he.beginRenderPass({
            colorAttachments: [
              {
                view: Bt,
                loadOp: Se ? "load" : "clear",
                storeOp: "store",
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
              },
            ],
            timestampWrites: Dt(
              this.fxaa ? "finish/fxaa" : "finish",
              ft++ === 0,
              Rt,
            ),
          }),
        Ft = le && pt > 0 && !(this.bloom > 0) && this.pHot && this._hotGroup,
        Gt = le && pt > 0 && (!Ft || this._glareHot !== !1);
      if (
        (s.queue.writeBuffer(
          this.bloomBuf,
          0,
          new Float32Array([
            Gt ? pt / kt.levels : 0,
            le ? this.vignette : 0,
            this.toneMappingExposure,
            this._W / this._H,
          ]),
        ),
        le && pt > 0)
      ) {
        let Bt =
          this.bloom > 0
            ? (this._composerThr ?? 0)
            : (this.glareThreshold ?? 1);
        s.queue.writeBuffer(
          this.postBuf,
          0,
          new Float32Array([
            this.glareSpread ?? 1.6,
            Bt,
            Bt * (this.bloom > 0 ? 0.5 : 0.1),
            0,
          ]),
        );
        let Se = he.beginComputePass(
          Xt ? { timestampWrites: Dt("glare") } : {},
        );
        for (let Rt = 0; Rt < (Gt ? kt.levels : 1); Rt++) {
          let [Vt, Pe] = kt.size(Rt);
          (Se.setPipeline(Rt ? this.pDown13CS : this.pDownTCS),
            Se.setBindGroup(0, Rt ? kt.down[Rt] : kt.down0[ce]),
            Se.dispatchWorkgroups(Math.ceil(Vt / 8), Math.ceil(Pe / 8)));
        }
        if (Ft) {
          let [Rt, Vt] = kt.size(0);
          (s.queue.writeBuffer(this._hotBuf, 0, new Uint32Array([0])),
            Se.setPipeline(this.pHot),
            Se.setBindGroup(0, this._hotGroup),
            Se.dispatchWorkgroups(Math.ceil(Rt / 8), Math.ceil(Vt / 8)));
        }
        if (Gt) {
          Se.setPipeline(this.pUpCS);
          for (let Rt = kt.levels - 2; Rt >= 0; Rt--) {
            let [Vt, Pe] = kt.size(Rt);
            (Se.setBindGroup(0, kt.up[Rt]),
              Se.dispatchWorkgroups(Math.ceil(Vt / 8), Math.ceil(Pe / 8)));
          }
        }
        if ((Se.end(), Ft && this.info.render.frame % 8 === 0)) {
          let Rt = this._hotRb.find((Vt) => !Vt.busy);
          Rt &&
            (he.copyBufferToBuffer(this._hotBuf, 0, Rt.buf, 0, 4), (Ut = Rt));
        }
      } else
        this.fxaa ||
          he
            .beginRenderPass({
              colorAttachments: [
                {
                  view: kt.glow0,
                  loadOp: "clear",
                  storeOp: "store",
                  clearValue: { r: 0, g: 0, b: 0, a: 0 },
                },
              ],
            })
            .end();
      if (this.fxaa) {
        let Bt = !!(this._out && this._upGroup && !ns),
          Se = St(Bt ? this._views.out : $e, rn && !Bt, !0);
        if (
          (ns &&
            (Se.setViewport(Zs[0], Zs[1], Zs[2], Zs[3], 0, 1),
            Se.setScissorRect(We[0], We[1], We[2], We[3])),
          Se.setPipeline(ge ? this.pFinalT : this.pFinal),
          Se.setBindGroup(0, ge ? this._finalGroupT[ce] : this._finalGroup),
          Se.draw(3),
          Se.end(),
          Bt)
        ) {
          let Rt = he.beginRenderPass({
            colorAttachments: [
              {
                view: $e,
                loadOp: "clear",
                storeOp: "store",
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
              },
            ],
            timestampWrites: Dt("upscale"),
          });
          (Rt.setPipeline(this.pUp),
            Rt.setBindGroup(0, this._upGroup),
            Rt.draw(3),
            Rt.end());
        }
      } else {
        let Bt = St($e, !0, !0);
        (Bt.setPipeline(this.pBloomComp),
          Bt.setBindGroup(0, kt.comp),
          Bt.draw(3),
          Bt.end());
      }
    }
    ((this._cur = 1 - ce),
      (this._prevVP = this._prevVP || new Float32Array(16)),
      this._prevVP.set(a.elements));
    let zt = null;
    if (re) {
      zt = this.qread.find((kt) => !kt.busy);
      let ft = Xt ? 2 * me.length : 2;
      (ft && he.resolveQuerySet(this.qset, 0, ft, this.qbuf, 0),
        zt && ft && he.copyBufferToBuffer(this.qbuf, 0, zt.buf, 0, ft * 8));
    }
    if ((s.queue.submit([he.finish()]), n)) {
      n.push(performance.now());
      let ft = (this.info.cpu ||= {}),
        kt = [
          "matrices",
          "walk",
          "uploads",
          "shadows",
          "prepass",
          "main",
          "post",
          "total",
        ];
      for (let St = 0; St < 7; St++)
        ft[kt[St]] =
          (ft[kt[St]] ?? 0) + (n[St + 1] - n[St] - (ft[kt[St]] ?? 0)) / 32;
      ft.total = (ft.total ?? 0) + (n[7] - n[0] - (ft.total ?? 0)) / 32;
    }
    if ((dt?.afterSubmit(), Ut)) {
      let ft = Ut;
      ((ft.busy = !0),
        ft.buf
          .mapAsync(GPUMapMode.READ)
          .then(() => {
            ((this._glareHot = new Uint32Array(ft.buf.getMappedRange())[0] > 0),
              ft.buf.unmap(),
              (ft.busy = !1));
          })
          .catch(() => {
            ft.busy = !1;
          }));
    }
    (zt &&
      ((zt.busy = !0),
      zt.buf
        .mapAsync(GPUMapMode.READ)
        .then(() => {
          let ft = new BigUint64Array(zt.buf.getMappedRange());
          if (Xt) {
            let St = {};
            (me.forEach((Ft, Gt) => {
              St[Ft] = Number(ft[2 * Gt + 1] - ft[2 * Gt]) / 1e6;
            }),
              (this.info.passLog ||= []).push(St));
          }
          let kt = Xt
            ? me.reduce(
                (St, Ft, Gt) => St + Number(ft[2 * Gt + 1] - ft[2 * Gt]) / 1e6,
                0,
              )
            : Number(ft[1] - ft[0]) / 1e6;
          (kt > 0 &&
            kt < 1e3 &&
            (this.info.gpuTimeMs = this.info.gpuTimeMs
              ? this.info.gpuTimeMs * 0.9 + kt * 0.1
              : kt),
            zt.buf.unmap(),
            (zt.busy = !1));
        })
        .catch(() => {
          zt.busy = !1;
        })),
      (this.info.render.calls =
        A.length +
        C.length +
        P.length +
        N.length * (1 + this._spots.length) +
        (at ? L.length + 1 : 0) +
        (this._bgSrc ? 1 : 0)),
      (this.info.render.triangles = W),
      (this.info.memory.geometries = this._geo.size),
      (this.info.memory.textures = this._texCache.size),
      this.info.render.frame++);
  }
  _billboard(t, e, s, n, o) {
    let a = t.material;
    if (!a || a.visible === !1) return n;
    let r = Math.min(
      t.geometry.attributes.position.count,
      t.geometry.drawRange.count,
    );
    if (!t.isSprite && r <= 0) return n;
    t.onBeforeRender(this, e, s, t.geometry, a, null);
    let l = this._geometry(t.geometry);
    if (
      (t.isSprite
        ? this._sphere.set(
            this._v.setFromMatrixPosition(t.matrixWorld),
            Math.max(t.scale.x, t.scale.y),
          )
        : (t.geometry.boundingSphere || t.geometry.computeBoundingSphere(),
          this._sphere
            .copy(t.geometry.boundingSphere)
            .applyMatrix4(t.matrixWorld)),
      t.frustumCulled !== !1 && !this._frustum.intersectsSphere(this._sphere))
    )
      return n;
    let c = this._slotOf(t, 0);
    if (c < 0) return n;
    this._dirtyS.push(c);
    let h = t[U5];
    h.still = !1;
    let f = this._objData,
      u = (c * Ya) / 4;
    (f.fill(0, u, u + Ya / 4),
      (f[u + 138] = 2),
      (f[u + 136] = 1.5),
      (f[u + 128] = 0),
      f.set(t.matrixWorld.elements, u),
      f.set(this._nm.identity().elements, u + 16));
    let d = a.color || { r: 1, g: 1, b: 1 };
    ((f[u + 36] = d.r),
      (f[u + 37] = d.g),
      (f[u + 38] = d.b),
      (f[u + 39] = a.opacity ?? 1),
      t.isSprite
        ? ((f[u + 56] = a.rotation || 0),
          (f[u + 57] = a.sizeAttenuation !== !1 ? 1 : 0),
          (f[u + 58] = t.center.x),
          (f[u + 59] = t.center.y))
        : ((f[u + 56] = (a.size ?? 1) * this.pixelRatio),
          (f[u + 57] = a.sizeAttenuation !== !1 ? 1 : 0),
          (f[u + 58] = this._H / 2)));
    let p = a.map || null;
    p?.matrixAutoUpdate && p.updateMatrix();
    let m = p ? p.matrix.elements : null;
    ((f[u + 76] = m ? m[0] : 1),
      (f[u + 77] = m ? m[3] : 0),
      (f[u + 78] = m ? m[6] : 0),
      (f[u + 80] = m ? m[1] : 0),
      (f[u + 81] = m ? m[4] : 1),
      (f[u + 82] = m ? m[7] : 0));
    let g = this._material(a);
    ((f[u + 84] = p && g !== this._defaultMat ? 1 : 0),
      (f[u + 86] = a.alphaTest || 0),
      (f[u + 87] = 2),
      (f[u + 88] = a.vertexColors && l.color ? 1 : 0),
      (f[u + 89] = a.fog !== !1 && e.fog ? 1 : 0));
    let b = a.depthWrite && !(a.transparent && a.blending === 2);
    this._prevM ||= new WeakMap();
    let x = this._prevM.get(t),
      v = t.matrixWorld.elements,
      y = t.geometry.attributes.position.version,
      M = !x || x.v !== y;
    if (x) {
      for (let S = 0; S < 16 && !M; S++)
        Math.abs(x[S] - v[S]) > 1e-6 && (M = !0);
      (x.set(v), (x.v = y));
    } else {
      let S = Float32Array.from(v);
      ((S.v = y), this._prevM.set(t, S));
    }
    return (
      o.push({
        rec: l,
        slot: c,
        mat: g,
        kind: t.isSprite ? "sprite" : "points",
        ro: t.renderOrder || 0,
        count: r,
        moving: M,
        blend: a.blending === 2 ? "add0" : "alpha" + (b ? "1" : "0"),
        depth: this._v
          .copy(this._sphere.center)
          .applyMatrix4(s.matrixWorldInverse).z,
      }),
      n + 1
    );
  }
  _offsetPipe(t, e) {
    if (!t || !e.po) return t;
    let s = this._materialPipeDescriptors?.get(t);
    if (!s) return t;
    let n = (this._offsetPipes ||= new WeakMap()),
      o = n.get(t);
    o || n.set(t, (o = new Map()));
    let a = `${e.pb}|${e.ps}|${e.pw}`,
      r = o.get(a);
    return (
      r ||
        ((r = this.device.createRenderPipeline({
          ...s,
          label: `${s.label}-offset`,
          depthStencil: {
            ...s.depthStencil,
            depthBias: e.pb,
            depthBiasSlopeScale: e.ps,
            depthWriteEnabled: e.pw,
          },
        })),
        o.set(a, r)),
      r
    );
  }
  _hookPipe(t, e = !1, s = 0) {
    let n =
        e === "lin"
          ? (this._hooksLin ||= new Map())
          : e
            ? (this._hooksEq ||= new Map())
            : (this._hooks ||= new Map()),
      o = n.get(t);
    return (
      o || ((o = { p: null, recoveries: 0 }), n.set(t, o)),
      (!o.ready || (o.retryAt && performance.now() >= o.retryAt)) &&
        (o.ready && o.recoveries++,
        (o.error = null),
        (o.retryAt = 0),
        (o.work = this._mkHook(t, e, s)),
        (o.ready = o.work
          .then((a) => (o.p = a))
          .catch((a) => {
            ((o.error = String(a)),
              o.recoveries < 2 &&
                jA(a) &&
                (o.retryAt = performance.now() + 1e4 * (o.recoveries + 1)),
              console.warn("mbAlbedo hook failed", a));
          }))),
      s && !o.p && o.work?.prioritize?.(s),
      o.p
    );
  }
  _fillLights(t) {
    if (
      !this._fillCache ||
      this._fillCache.scene !== t ||
      this._fillCache.version !== t.userData.lightsVersion
    ) {
      let e = [];
      (t.traverse((s) => {
        (s.isAmbientLight || s.isHemisphereLight) && e.push(s);
      }),
        (this._fillCache = {
          scene: t,
          list: e,
          version: t.userData.lightsVersion,
        }));
    }
    return this._fillCache.list.filter((e) => e.visible && e.intensity > 0);
  }
  _sun(t) {
    if (!this._sunCache || this._sunCache.scene !== t) {
      let s = null;
      (t.traverse((n) => {
        !s && (n.isDirectionalLight || n.isSunLight) && (s = n);
      }),
        (this._sunCache = {
          scene: t,
          light: s,
          dir: new xt(0, 1, 0),
          intensity: 0,
          tp: new xt(),
        }));
    }
    let e = this._sunCache;
    return (
      e.light &&
        (e.light.updateMatrixWorld(),
        e.light.isSunLight
          ? e.tp.set(0, 0, 0)
          : (e.light.target.updateMatrixWorld(),
            e.tp.setFromMatrixPosition(e.light.target.matrixWorld)),
        e.dir.setFromMatrixPosition(e.light.matrixWorld).sub(e.tp).normalize(),
        (e.intensity = e.light.visible ? e.light.intensity : 0)),
      e
    );
  }
  shaderSources() {
    let t = !!this.neural?.manifest.priors.mips;
    return {
      standard: JA(t, "", this.fullMat),
      background: PU,
      shadow: RU,
      mip: QA,
      cluster: CU,
      neural: this.neural && ZA(this.neural, this.mlpMode, !1),
      neuralF16: this.neural && ZA(this.neural, this.mlpMode, !0),
    };
  }
  finish() {
    return this.device.queue.onSubmittedWorkDone();
  }
  dispose() {
    for (let t of this._geo.values())
      (t.pos.destroy(),
        t.nrm.destroy(),
        t.uv.destroy(),
        t.index?.destroy(),
        t.joints?.destroy(),
        t.weights?.destroy());
    (this._geo.clear(), this.device?.destroy());
  }
};
