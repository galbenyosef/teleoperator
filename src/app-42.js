// app 42 — math
// Lines 51245-59418 of readable/app.pretty.js (statement-aligned).
var tk = class o {
  constructor({
    canvas: t = document.createElement("canvas"),
    antialias: e = !0,
    mlp: s = "inline",
    f16: n = !1,
    autoInit: i = !1,
    depthPrepass: a = !0,
    cullBackFaces: r = !1,
    planarMips: l = 99,
    bloomLevels: c = 6,
    powerPreference: h = "default",
  } = {}) {
    ((this.isMindblownRenderer = !0),
      (this.powerPreference = h),
      o._composerPatched ||
        (o._composerPatched = Promise.resolve()
          .then(() => (_V(), zV))
          .then((u) => Wut(u.EffectComposer))
          .catch(() => {})),
      (this.coordinateSystem = Kr),
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
        getController: () => new le(),
        getControllerGrip: () => new le(),
        getHand: () => new le(),
        getCamera: () => new Ji(),
        setAnimationLoop() {},
        updateCamera() {},
      }),
      (this.fxaa = e === "fxaa" || e === !0),
      (this.samples = e === "msaa" ? Eut : 1),
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
      (this._frustum = new qo()),
      (this._m = new fe()),
      (this._vp = new fe()),
      (this._nm = new fe()),
      (this._sphere = new _n()),
      (this._v = new dt()),
      (this._v2 = new dt()),
      (this._lightVP = new fe()),
      (this._refl = new fe()),
      (this._vpR = new fe()),
      (this._prevVP = null),
      (this._shadowHalf = 3.8),
      (this._lightCam = new Qr(-3.8, 3.8, 3.8, -3.8, 0.5, 30)),
      (this._spotCam = new Ji(60, 1, 0.05, 30)),
      (this._shadowCenter = new dt(0.15, 0.2, -0.25)),
      (this._staticSunKey = null),
      (this._staticSpotKey = null),
      (this._objData = new Float32Array((yb * ur) / 4)),
      (this._frameData = new Float32Array(vb / 4)),
      (this._frameRefl = new Float32Array(vb / 4)),
      (this._frameSpot = new Float32Array(vb / 4)),
      (this._lightData = new Float32Array(RV / 4)),
      (this._boneData = new Float32Array(wb * 16)),
      (this._boneDataPrev = new Float32Array(wb * 16)),
      (this._spots = []),
      (this._cur = 0),
      (this._fallbackOk = i || arguments[0]?.fallback === !0),
      i && (this.ready = this.init().catch((u) => this._useFallback(u))));
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
    let e = o.fallbackClass || gb;
    if (e === o || e.prototype instanceof o) throw t;
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
          let h = new ip(s);
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
      i = t.environment,
      a = t.background;
    (i?.userData?.mbEnv && (t.environment = n(i)),
      a?.userData?.mbEnv && (t.background = n(a)),
      s.render(t, e),
      (t.environment = i),
      (t.background = a),
      (this.info.render = s.info.render));
  }
  getDrawingBufferSize(t = new Pe()) {
    return t.set(
      Math.floor(this.width * this.pixelRatio),
      Math.floor(this.height * this.pixelRatio),
    );
  }
  setClearColor(t, e) {
    ((this._clearColor ||= new It(0, 0, 0)).set(t),
      e !== void 0 && (this._clearAlpha = e));
  }
  getClearColor(t) {
    return t.copy(this._clearColor || new It(0, 0, 0));
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
  getScissor(t = new zi()) {
    return this._scissor
      ? t.fromArray(this._scissor)
      : t.set(0, 0, this.width, this.height);
  }
  getViewport(t = new zi()) {
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
      let v = m === 1 || m >= 3,
        x = m >= 2,
        y = v
          ? []
          : ["timestamp-query", "shader-f16"].filter((S) => t.features.has(S)),
        M = x
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
    ((this.info.bundleCompatibility = await yV(this.device)),
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
      i = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      a = (m = vb) => n.createBuffer({ size: m, usage: i });
    ((this.frameBuf = a()),
      (this.frameBufRefl = a()),
      (this.frameBufSpot = Array.from({ length: QS }, () => a())),
      (this.boneBuf = a(wb * 64)),
      (this.boneBufPrev = a(wb * 64)),
      (this.lightBuf = a(RV)),
      (this.clusterBuf = n.createBuffer({
        size: eh.x * eh.y * eh.z * (eh.max + 1) * 4,
        usage: GPUBufferUsage.STORAGE,
      })),
      (this.objBuf = n.createBuffer({ size: yb * ur, usage: i })));
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
    ((Mb =
      !this.fullMat &&
      this.skyBuffer !== !1 &&
      (n.limits.maxStorageBuffersPerShaderStage | 0) >= 4),
      (this._skyBuf0 = Mb
        ? n.createBuffer({
            size: 16,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            label: "sky-field-none",
          })
        : null),
      (Sb =
        this.sunBuffer !== !1 &&
        (n.limits.maxStorageBuffersPerShaderStage | 0) >= 4),
      (this._sunBuf0 = Sb
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
          ...(Mb
            ? [
                {
                  binding: 22,
                  visibility: l,
                  buffer: { type: "read-only-storage" },
                },
              ]
            : []),
          ...(Sb
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
      (cp = this.fullMat),
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
      let m = n.createShaderModule({ code: VV, label: "bloom" }),
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
      let m = n.createShaderModule({ code: Nut, label: "post-cs" }),
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
      let m = n.createShaderModule({ code: Uut, label: "final" });
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
        let b = n.createShaderModule({ code: Gut, label: "upscale" });
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
      let g = n.createShaderModule({ code: Vut, label: "taa" });
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
            module: n.createShaderModule({ code: Hut, label: "dyn" }),
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
      let m = n.createShaderModule({ code: Dut, label: "envpre" }),
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
        entries: [{ binding: 0, resource: { buffer: this.objBuf, size: ur } }],
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
    ((this.spotStatic = u(zb)),
      (this.spotDyn = u(zb)),
      this._sunMaps(FV),
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
          size: [3 * JS, 2 * JS, _b],
          format: "depth32float",
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        })),
        (this._pointSMView = [...Array(_b).keys()].map((m) =>
          this.pointSM.createView({
            dimension: "2d",
            baseArrayLayer: m,
            arrayLayerCount: 1,
          }),
        )),
        (this.spotMaps = n.createTexture({
          size: [512, 512, H5],
          format: "rgba8unorm-srgb",
          mipLevelCount: 10,
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        })),
        (this._spotMapView = [...Array(H5).keys()].map((m) =>
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
        (this.frameBufPoint = Array.from({ length: 6 * _b }, () => a())),
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
  getSize(t = new Pe()) {
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
      i = s ? Math.max(e, Math.floor(this.height * this.upscale)) : e;
    if (
      (this.domElement.width !== n && (this.domElement.width = n),
      this.domElement.height !== i && (this.domElement.height = i),
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
          new Float32Array([t, e, 1 / n, 1 / i]),
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
    let d = (w, _) => w.createView({ baseMipLevel: _, mipLevelCount: 1 }),
      p = (w, _, z) =>
        a.createBindGroup({
          layout: this.postLayout,
          entries: [
            { binding: 0, resource: w },
            { binding: 1, resource: this.linSampler },
            { binding: 2, resource: _ },
            { binding: 3, resource: z || this.dummy2d.createView() },
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
    let v = (w) =>
        this._bloomTex.createView({ baseMipLevel: w, mipLevelCount: 1 }),
      x = (w) =>
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
      S = b > 1 ? M(0) : v(0);
    ((this._bloom = {
      levels: b,
      size: (w) => [Math.max(1, m >> w), Math.max(1, g >> w)],
      down0: this._scene.map((w) => p(w.createView(), v(0))),
      down: [...Array(b).keys()].map((w) => (w ? p(v(w - 1), v(w)) : null)),
      up: [...Array(b).keys()].map((w) =>
        w + 1 < b ? p(w + 2 < b ? M(w + 1) : v(w + 1), M(w), v(w)) : null,
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
        _ = Math.ceil(e / 2),
        z = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.STORAGE_BINDING;
      ((this._aoTex = a.createTexture({
        size: [w, _],
        format: "rgba16float",
        usage: z,
      })),
        (this._aoRaw = a.createTexture({
          size: [w, _],
          format: "rgba16float",
          usage: z,
        })));
    }
  }
  async loadNeural(t, e) {
    this.neural = await rp.load(this.device, t, e);
    let s = this.neural.manifest.shadow;
    s && (this._shadowCenter.fromArray(s.center), (this._shadowHalf = s.half));
    let n = this._shadowHalf,
      i = this._lightCam;
    return (
      (i.left = i.bottom = -n),
      (i.right = i.top = n),
      i.updateProjectionMatrix(),
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
            g7(this._compileStarted, this.shaderTimeoutMs))
        : ((this._compileStarted = Promise.resolve().then(() =>
            this._compilePipelines(t),
          )),
          g7(this._compileStarted, this.shaderTimeoutMs))
    );
  }
  async _compilePipelines(t) {
    let e = performance.now(),
      s = this.device,
      n = new Tm(),
      i = new WeakMap(),
      a = (V) => {
        let $ = s.createShaderModule(V);
        return (i.set($, V), $);
      },
      r = 0,
      l = (V, $) => {
        if (!$) return V;
        let J = { ...V },
          X = new Map();
        for (let tt of ["vertex", "fragment", "compute"]) {
          let Z = V[tt],
            q = Z && i.get(Z.module);
          q &&
            (X.has(Z.module) ||
              X.set(
                Z.module,
                a({
                  ...q,
                  code:
                    q.code +
                    `
// base retry ${$}, generation ${++r}`,
                }),
              ),
            (J[tt] = { ...Z, module: X.get(Z.module) }));
        }
        return J;
      },
      c = (V) => n.run(($) => s.createRenderPipelineAsync(l(V, $))),
      h = (V) => n.run(($) => s.createComputePipelineAsync(l(V, $))),
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
          attributes: [0, 1, 2, 3].map((V) => ({
            shaderLocation: 6 + V,
            offset: 16 * V,
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
      b = (V) => ({ ...V, arrayStride: 0 }),
      v = [f[0], f[1], f[2], b(f[3]), b(f[4]), b(f[5]), f[6], f[7]],
      x = [f[0], null, null, b(f[3]), b(f[4]), null, f[6], null],
      y = [f[0], b(f[3]), b(f[4]), f[6]],
      M = this.neural?.manifest || this.manifestHint || null,
      S = (V) =>
        !!V &&
        this.leanVertex !== !1 &&
        !Object.values(V.meshes || {}).some(($) => $.skinned),
      w = S(M);
    this.info.leanVertex = w;
    let _ = [f[0], f[1], f[2], null, null, null, f[6], null],
      z = [f[0], null, null, null, null, null, f[6], null],
      A = (V) =>
        (V.label.startsWith("standard-hook")
          ? s.createRenderPipelineAsync(V)
          : c(V)
        ).then(
          ($) => (
            (this._materialPipeDescriptors ||= new WeakMap()).set($, V),
            $
          ),
        ),
      T = (V, $, J, X, tt, Z = "vs") =>
        A({
          label: $,
          layout: this.pipeLayout,
          vertex: {
            module: V,
            entryPoint: Z,
            buffers:
              w && $.startsWith("neural")
                ? Z === "vsDepth"
                  ? z
                  : _
                : Z === "vsDepth"
                  ? g
                  : f,
          },
          fragment: { module: V, entryPoint: X, targets: J.targets },
          primitive: {
            topology: "triangle-list",
            cullMode:
              this.cullBack && $.startsWith("neural")
                ? $ === "neural-planar"
                  ? "front"
                  : "back"
                : "none",
          },
          depthStencil: tt,
          multisample: J.ms,
        }),
      E = (V, $, J, X) => T(V, $, J, X, m),
      R = (V, $, J, X, tt = m) =>
        A({
          label: $ + "-z",
          layout: this.pipeLayout,
          vertex: { module: V, entryPoint: "vs", buffers: v },
          fragment: { module: V, entryPoint: X, targets: J.targets },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: tt,
          multisample: J.ms,
        }),
      P = !!M?.priors?.mips,
      C = new Map(),
      I = new Tm(),
      L = 0;
    this._mkHook = (V, $, J = 0) => {
      let X = I.run(
        async (tt) => {
          let Z = tt ? null : C.get(V);
          return (
            Z ||
              ((Z = s.createShaderModule({
                code:
                  z7(P, V, this.fullMat) +
                  `
// compilation attempt ${tt}, variant ${$}, generation ${++L}`,
                label: "standard-hook",
              })),
              C.set(V, Z)),
            $ === "lin"
              ? E(Z, "standard-hook-planar", p, "fsLin")
              : $
                ? T(Z, "standard-hook-eq", u, "fs", {
                    ...m,
                    depthCompare: "less-equal",
                  })
                : E(Z, "standard-hook", u, "fs")
          );
        },
        { priority: J },
      );
      return Object.assign(
        X.catch((tt) => {
          throw (C.delete(V), tt);
        }),
        { prioritize: X.prioritize },
      );
    };
    let F = a({ code: z7(P, "", this.fullMat), label: "standard" }),
      O = a({ code: LV, label: "bg" }),
      B = a({ code: CV, label: "shadow" }),
      H = a({ code: E7, label: "mip" }),
      N = a({ code: IV, label: "cluster" }),
      D = (V, $) =>
        c({
          label: "bg",
          layout: this.pipeLayout,
          vertex: { module: O, entryPoint: "vsBg" },
          fragment: { module: O, entryPoint: $, targets: V.targets },
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
          multisample: V.ms,
        }),
      U = (V, $, J, X = !1) =>
        c({
          label: V + (X ? "-z" : ""),
          layout: this.shadowLayout,
          vertex: {
            module: B,
            entryPoint: "vsShadow",
            buffers: X ? y : [f[0], f[3], f[4], f[6]],
          },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            format: "depth32float",
            depthWriteEnabled: !0,
            depthCompare: "less",
            depthBias: $,
            depthBiasSlopeScale: J,
          },
        });
    ((this._emptyLayout ||= s.createBindGroupLayout({ entries: [] })),
      (this._emptyGroup ||= s.createBindGroup({
        layout: this._emptyLayout,
        entries: [],
      })));
    let G = (V, $, J) =>
        c({
          label: V,
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
            depthBias: $,
            depthBiasSlopeScale: J,
          },
        }),
      W = [
        G("shadow-alpha", 2, 2.5).then((V) => (this.pShadowA = V)),
        G("shadow-spot-alpha", 64, 2).then((V) => (this.pShadowSpotA = V)),
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
        }).then((V) => (this.pVel = V)),
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
                attributes: [0, 1, 2, 3].map((V) => ({
                  shaderLocation: 11 + V,
                  offset: 16 * V,
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
        }).then((V) => (this.pVelI = V)),
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
        }).then((V) => (this.pVelLine = V)),
        E(F, "standard", u, "fs").then((V) => (this.pStandard = V)),
        R(F, "standard", u, "fs").then((V) => (this.pStandardZ = V)),
        R(F, "standard-eq", u, "fs", { ...m, depthCompare: "less-equal" }).then(
          (V) => (this.pStandardEqZ = V),
        ),
        E(F, "standard-glass", d, "fs").then((V) => (this.pStandardGlass = V)),
        ...(this.fullMat
          ? ["back", "front", "none"].flatMap((V) =>
              [
                ["", g],
                ["Z", x],
              ].map(([$, J]) =>
                c({
                  label: "std-pre-" + V + $,
                  layout: this.pipeLayout,
                  vertex: { module: F, entryPoint: "vsDepth", buffers: J },
                  primitive: { topology: "triangle-list", cullMode: V },
                  depthStencil: {
                    format: "depth24plus",
                    depthWriteEnabled: !0,
                    depthCompare: "less",
                    depthBias: 4,
                    depthBiasSlopeScale: 1,
                  },
                  multisample: { count: this.samples },
                }).then((X) => ((this.pStdPre ||= {})[V + $] = X)),
              ),
            )
          : []),
        T(F, "standard-eq", u, "fs", { ...m, depthCompare: "less-equal" }).then(
          (V) => (this.pStandardEq = V),
        ),
        ...(this.fullMat
          ? [
              (async () => {
                let V = GPUShaderStage.COMPUTE;
                ((this.aoL0 = s.createBindGroupLayout({
                  entries: [{ binding: 0, visibility: V, buffer: {} }],
                })),
                  (this.aoL1 = s.createBindGroupLayout({
                    entries: [
                      { binding: 0, visibility: V, buffer: {} },
                      {
                        binding: 1,
                        visibility: V,
                        texture: { sampleType: "depth" },
                      },
                      {
                        binding: 2,
                        visibility: V,
                        storageTexture: {
                          access: "write-only",
                          format: "rgba16float",
                        },
                      },
                      {
                        binding: 3,
                        visibility: V,
                        texture: { sampleType: "float" },
                      },
                      {
                        binding: 4,
                        visibility: V,
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
                let $ = a({
                    code: sh.split("struct Bones")[0] + pV,
                    label: "gtao",
                  }),
                  J = s.createPipelineLayout({
                    bindGroupLayouts: [this.aoL0, this.aoL1],
                  });
                [this.pGtao, this.pAoBlur] = await Promise.all(
                  ["gtao", "blur"].map((X) =>
                    h({ layout: J, compute: { module: $, entryPoint: X } }),
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
        ].map(([V, $]) => {
          let J =
            V === "add"
              ? {
                  color: { srcFactor: "src-alpha", dstFactor: "one" },
                  alpha: { srcFactor: "zero", dstFactor: "one" },
                }
              : V === "mul"
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
            label: `standard-${V}${$ ? "-dw" : ""}`,
            layout: this.pipeLayout,
            vertex: { module: F, entryPoint: "vs", buffers: f },
            fragment: {
              module: F,
              entryPoint: "fs",
              targets: [
                { format: this.format, blend: J },
                { format: "rgba16float", writeMask: 0 },
              ],
            },
            primitive: { topology: "triangle-list", cullMode: "none" },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: $,
              depthCompare: "less",
            },
            multisample: { count: this.samples },
          }).then((X) => {
            (this.pBlend ||= {})[V + ($ ? "1" : "0")] = X;
          });
        }),
        ...["sprite", "points"].flatMap((V) =>
          [
            ["alpha", !0],
            ["alpha", !1],
            ["add", !1],
          ].map(([$, J]) => {
            let X =
                $ === "add"
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
              tt =
                V === "sprite"
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
              label: `${V}-${$}`,
              layout: this.pipeLayout,
              vertex: {
                module: F,
                entryPoint: V === "sprite" ? "vsSprite" : "vsPoints",
                buffers: tt,
              },
              fragment: {
                module: F,
                entryPoint: "fs",
                targets: [
                  { format: this.format, blend: X },
                  { format: "rgba16float", writeMask: 0 },
                ],
              },
              primitive: { topology: "triangle-list", cullMode: "none" },
              depthStencil: {
                format: "depth24plus",
                depthWriteEnabled: J,
                depthCompare: "less",
              },
              multisample: { count: this.samples },
            }).then((Z) => {
              (this["p_" + V] ||= {})[$ + (J ? "1" : "0")] = Z;
            });
          }),
        ),
        ...["mesh", "sprite", "points"].map((V) => {
          let $ =
              V === "points"
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
            J = { operation: "max", srcFactor: "one", dstFactor: "one" };
          return c({
            label: "react-" + V,
            layout: this.pipeLayout,
            vertex: {
              module: F,
              entryPoint:
                V === "sprite"
                  ? "vsSprite"
                  : V === "points"
                    ? "vsPoints"
                    : "vs",
              buffers: $,
            },
            fragment: {
              module: F,
              entryPoint: "fsReact",
              targets: [
                {
                  format: "rgba16float",
                  writeMask: GPUColorWrite.ALPHA,
                  blend: { color: J, alpha: J },
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
            .then((X) => {
              (this.pReact ||= {})[V] = X;
            })
            .catch((X) => console.warn("react pipeline", X));
        }),
        E(F, "standard-planar", p, "fsLin").then(
          (V) => (this.pStandardLin = V),
        ),
        ...[
          ["opaque", null, !0],
          ["alpha1", "alpha", !0],
          ["alpha0", "alpha", !1],
          ["add0", "add", !1],
        ].map(([V, $, J]) => {
          let X =
            $ === "add"
              ? {
                  color: { srcFactor: "src-alpha", dstFactor: "one" },
                  alpha: { srcFactor: "zero", dstFactor: "one" },
                }
              : $
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
            label: "line-" + V,
            layout: this.pipeLayout,
            vertex: { module: F, entryPoint: "vs", buffers: f },
            fragment: {
              module: F,
              entryPoint: "fs",
              targets: [
                { format: this.format, blend: X },
                { format: "rgba16float", writeMask: $ ? 0 : 15 },
              ],
            },
            primitive: { topology: "line-list" },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: J,
              depthCompare: "less",
            },
            multisample: { count: this.samples },
          }).then((tt) => {
            (this.pLine ||= {})[V] = tt;
          });
        }),
        D(u, "fsBg").then((V) => (this.pBg = V)),
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
          let V = a({ label: "preetham", code: PV + But });
          return c({
            label: "preetham",
            layout: s.createPipelineLayout({
              bindGroupLayouts: [this.frameLayout, this.skyULayout],
            }),
            vertex: { module: V, entryPoint: "vsSky" },
            fragment: { module: V, entryPoint: "fsSky", targets: u.targets },
            depthStencil: {
              format: "depth24plus",
              depthWriteEnabled: !1,
              depthCompare: "less-equal",
            },
            multisample: u.ms,
          }).then(($) => (this.pPreetham = $));
        })(),
        D(p, "fsBgLin").then((V) => (this.pBgLin = V)),
        U("shadow", 2, 2.5).then((V) => (this.pShadow = V)),
        U("shadow", 2, 2.5, !0).then((V) => (this.pShadowZ = V)),
        ...["Sun", "Spot"].map((V) =>
          c({
            label: "glass-trans-" + V,
            layout: this.shadowLayout,
            vertex: { module: B, entryPoint: "vsGlassT", buffers: f },
            primitive: { topology: "triangle-list", cullMode: "none" },
            fragment: {
              module: B,
              entryPoint: "fsGlassT" + V,
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
          }).then(($) => (this["pGlassT" + V] = $)),
        ),
        U("shadow-spot", 64, 2).then((V) => (this.pShadowSpot = V)),
        U("shadow-spot", 64, 2, !0).then((V) => (this.pShadowSpotZ = V)),
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
        }).then((V) => (this.pMip = V)),
        h({
          label: "cluster",
          layout: s.createPipelineLayout({
            bindGroupLayouts: [this.clusterLayout],
          }),
          compute: { module: N, entryPoint: "build" },
        }).then((V) => (this.pCluster = V)),
      ];
    ((this._neuralStarted = !1),
      (this._startNeural = () => {
        if (this._neuralStarted || !this.neural) return !0;
        if (
          S(this.neural.manifest) !== w ||
          !!this.neural.manifest.priors?.mips !== P
        )
          return !1;
        this._neuralStarted = !0;
        let V = this.wantF16 && this.device.features.has("shader-f16"),
          $ = (X) =>
            a({
              code: _7(this.neural, this.mlpMode, X, w),
              label: X ? "neural-f16" : "neural",
            }),
          J = async (X, tt) => {
            let Z = await E(X, tt ? "neural-f16" : "neural", u, "fs");
            ((this.pNeural = Z),
              (this.info.mlpPrecision = tt ? "f16" : "f32"),
              (this.info.neuralReadyMs = performance.now() - e),
              E(X, "neural-glass", d, "fs")
                .then((j) => (this.pNeuralGlass = j))
                .catch((j) => console.warn(j)));
            let q = {
              ms: u.ms,
              targets: u.targets.map((j) => ({ ...j, writeMask: 0 })),
            };
            (T(X, "neural-depth", q, "fsDepth", m, "vsDepth")
              .then((j) => (this.pNeuralPre = j))
              .catch((j) => console.warn(j)),
              T(X, "neural-eq", u, "fs", {
                format: "depth24plus",
                depthWriteEnabled: !1,
                depthCompare: "less-equal",
              })
                .then((j) => (this.pNeuralEq = j))
                .catch((j) => console.warn(j)),
              E(X, "neural-planar", p, "fsLin")
                .then((j) => (this.pNeuralLin = j))
                .catch((j) => console.warn(j)));
          };
        return (
          (this.neuralReady = V
            ? J($(!0), !0).catch(
                (X) => (
                  console.warn("f16 MLP failed, using f32", X),
                  J($(!1), !1)
                ),
              )
            : J($(!1), !1)),
          !0
        );
      }),
      this._startNeural(),
      t.traverse((V) => {
        V.isMesh &&
          this._geometry(V.geometry, this._uvName(V), this._lmName(V));
      }),
      this._setupEnv(t),
      await Promise.all(W),
      (this.info.compileMs = performance.now() - e));
  }
  _setupEnv(t) {
    let e = this.device;
    this._envEnsure(t);
    let s = t.background && t.background.isTexture ? t.background : null,
      n = t.backgroundBlurriness || 0,
      i =
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
        (s.isCubeTexture || !!s.userData?.mbEnv || i > 0) &&
        !this.neural &&
        !!this._envPrior,
      r = a && i === 0 && this._bgSharp ? this._bgSharp : null;
    if (
      ((a !== !!this._bgEnvView ||
        (a && i !== this._bgLayer) ||
        (a && (r || null) !== (this._bgSharpUsed || null))) &&
        ((this._bgEnvView = a
          ? r ||
            this._envPrior.createView({
              dimension: "2d",
              baseArrayLayer: i,
              arrayLayerCount: 1,
            })
          : null),
        (this._bgLayer = i),
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
      let l = this.neural || rp.empty(e),
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
              ...(Mb
                ? [
                    {
                      binding: 22,
                      resource: { buffer: this._skyBuf || this._skyBuf0 },
                    },
                  ]
                : []),
              ...(Sb
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
      s = (i) =>
        e.createTexture({
          size: [i, i],
          format: "depth32float",
          usage:
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        });
    for (let i of [this.smStatic, this.smDyn, this.smMove, this.glassT])
      i?.destroy();
    ((this._shadowRes = t),
      (this.smStatic = s(t)),
      (this.smDyn = s(t)),
      this.fullMat && (this.smMove = s(t / 2)));
    let n = Math.max(t, zb);
    ((this.glassT = e.createTexture({
      size: [n, n, 2],
      format: "rgba16float",
      usage:
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    })),
      (this._glassTView = [0, 1].map((i) =>
        this.glassT.createView({
          dimension: "2d",
          baseArrayLayer: i,
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
      i = t.center.y,
      a = t.center.z,
      r = t.radius,
      l = s[0] * n + s[4] * i + s[8] * a + s[12],
      c = s[1] * n + s[5] * i + s[9] * a + s[13],
      h = -(s[2] * n + s[6] * i + s[10] * a + s[14]);
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
      i = t.attributes.position;
    if (
      (n && n.version === i.version && n.uvName === e && n.lmName === s) ||
      (n?.dropCpu && n.version === i.version) ||
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
          v = a.createBuffer({ size: b, usage: g | GPUBufferUsage.COPY_DST });
        if (b === m.byteLength)
          a.queue.writeBuffer(v, 0, m.buffer, m.byteOffset, b);
        else {
          let x = new Uint8Array(b);
          (x.set(new Uint8Array(m.buffer, m.byteOffset, m.byteLength)),
            a.queue.writeBuffer(v, 0, x));
        }
        return v;
      },
      l = i.count,
      c = (m, g) => {
        if (!m) return new Float32Array(l * g);
        if (
          !m.isInterleavedBufferAttribute &&
          m.array instanceof Float32Array &&
          m.itemSize === g
        )
          return m.array;
        let b = new Float32Array(l * g),
          v = [m.getX, m.getY, m.getZ, m.getW];
        for (let x = 0; x < l; x++)
          for (let y = 0; y < g; y++) b[x * g + y] = v[y].call(m, x);
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
        version: i.version,
        uvName: e,
        lmName: s,
        posArray: c(i, 3),
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
        v = new Float32Array(l * 4);
      for (let x = 0; x < l; x++)
        for (let y = 0; y < 4; y++)
          ((b[x * 4 + y] = m.getComponent(x, y)),
            (v[x * 4 + y] = g.getComponent(x, y)));
      ((n.joints = r(b, GPUBufferUsage.VERTEX)),
        (n.weights = r(v, GPUBufferUsage.VERTEX)));
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
      let i = n.count;
      ((n.array = new n.array.constructor(0)), (n.count = i));
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
        let i = n.geometry;
        if (
          !i?.isBufferGeometry ||
          s.has(i) ||
          n.isPoints ||
          n.isLine ||
          n.userData.mbKeepCpu ||
          i.userData.mbPosOnly ||
          i.morphAttributes.position ||
          !i.attributes.position
        )
          return;
        (s.add(i),
          i.boundingBox || i.computeBoundingBox(),
          i.boundingSphere || i.computeBoundingSphere(),
          (i.userData.mbDropCpu = !0));
        let a = this._geo.get(i);
        a &&
          !a.freed &&
          !a.dropCpu &&
          a.version === i.attributes.position.version &&
          (this._dropCpu(i, a), e++);
      }),
      e
    );
  }
  _regeo(t, e, s, n) {
    let i = e.attributes.position,
      a = i.count,
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
    if (e.userData.mbPosOnly && f(i, 3) && f(r, 3)) {
      let p = this.device.queue;
      return (
        p.writeBuffer(
          t.pos,
          0,
          i.array.buffer,
          i.array.byteOffset,
          i.array.byteLength,
        ),
        p.writeBuffer(
          t.nrm,
          0,
          r.array.buffer,
          r.array.byteOffset,
          r.array.byteLength,
        ),
        c &&
          t.color &&
          f(c, 4) &&
          p.writeBuffer(
            t.color,
            0,
            c.array.buffer,
            c.array.byteOffset,
            c.array.byteLength,
          ),
        h &&
          t.ixv !== e.index.version &&
          t.indexFormat === "uint32" &&
          h instanceof Uint32Array &&
          (p.writeBuffer(t.index, 0, h.buffer, h.byteOffset, h.byteLength),
          (t.indexArray = h),
          (t.ixv = e.index.version)),
        (t.posArray = i.array),
        t.lod && (t.lod.index.destroy(), (t.lod = null)),
        (t.version = i.version),
        !0
      );
    }
    if (
      !f(i, 3) ||
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
      (d(t.pos, i.array), (t.posArray = i.array), r && d(t.nrm, r.array), l)
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
      (t.version = i.version),
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
      i = s.morphAttributes.position,
      a = s.morphAttributes.normal;
    this._morphCache ||= new WeakMap();
    let r = this._morphCache.get(t),
      l = n.map((v) => v.toFixed(5)).join(",");
    if (r && r.key === l && r.base === e) return r.rec;
    let c = s.attributes.position.count,
      h = s.morphTargetsRelative,
      f = e.posArray,
      u = new Float32Array(f),
      d = s.attributes.normal,
      p = d ? new Float32Array(c * 3) : null;
    if (p)
      for (let v = 0; v < c; v++)
        ((p[v * 3] = d.getX(v)),
          (p[v * 3 + 1] = d.getY(v)),
          (p[v * 3 + 2] = d.getZ(v)));
    let m = p && !h ? p.slice() : null;
    for (let v = 0; v < n.length; v++) {
      let x = n[v];
      if (!x || !i[v]) continue;
      let y = i[v],
        M =
          !y.isInterleavedBufferAttribute &&
          y.array instanceof Float32Array &&
          y.itemSize === 3 &&
          !y.normalized,
        S = y.array;
      for (let w = 0; w < c; w++)
        for (let _ = 0; _ < 3; _++) {
          let z = M ? S[w * 3 + _] : y.getComponent(w, _);
          u[w * 3 + _] += x * (h ? z : z - f[w * 3 + _]);
        }
      if (p && a?.[v]) {
        let w = a[v];
        for (let _ = 0; _ < c; _++)
          for (let z = 0; z < 3; z++) {
            let A = w.getComponent(_, z);
            p[_ * 3 + z] += x * (h ? A : A - m[_ * 3 + z]);
          }
      }
    }
    if (p)
      for (let v = 0; v < c; v++) {
        let x = p[v * 3],
          y = p[v * 3 + 1],
          M = p[v * 3 + 2],
          S = Math.hypot(x, y, M) || 1;
        ((p[v * 3] = x / S), (p[v * 3 + 1] = y / S), (p[v * 3 + 2] = M / S));
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
    return t ? (t[TV] ||= o._uidN = (o._uidN || 0) + 1) : 0;
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
      i = t[O5];
    if (!i || i.sc !== s) {
      if (i) for (let r of i.s) r !== void 0 && this._slotFree(r);
      i = t[O5] = {
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
    i.f !== s.f && ((i.f = s.f), s.used.push(t));
    let a = i.s[e];
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
      } else if (n.top < yb) a = n.top++;
      else return -1;
      i.s[e] = a;
    }
    return a;
  }
  _slotFree(t) {
    let e = this._slots.free,
      s = e.push(t) - 1;
    for (; s > 0;) {
      let n = (s - 1) >> 1;
      if (e[n] <= e[s]) break;
      let i = e[n];
      ((e[n] = e[s]), (e[s] = i), (s = n));
    }
  }
  _slotEnd() {
    let t = this._slotS;
    for (let n of t.prev) {
      let i = n[O5];
      if (i && i.sc === t && i.f !== t.f) {
        for (let a of i.s) a !== void 0 && this._slotFree(a);
        ((i.s = []), (i.f = -1), (i.still = !1), (i.ws.length = 0));
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
        (this._slots.free = [...n].sort((i, a) => i - a)));
    }
  }
  _drawList(t, e, s = !1, n = !1) {
    for (let i of e) this._draw1(t, i, s, n);
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
  _op(t, e, s, n, i) {
    let a = t.n++;
    ((t.p[a] = e), (t.g2[a] = s), (t.d[a] = n), (t.f[a] = i));
  }
  _tok(t, e, s, n, i, a, r) {
    let l = this._uidB,
      c = i.rec,
      h = i.inst;
    ((t[e] = l(s)),
      (t[e + 1] = n ? l(n) : 0),
      (t[e + 2] = i.slot),
      (t[e + 3] = a ? l(i.mat || this._defaultMat) : 0),
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
    (r && c.lod && !i.range
      ? ((f = l(c.lod.index)), (u = 2), (d = c.lod.count))
      : (c.index &&
          ((f = l(c.index)), (u = c.indexFormat === "uint32" ? 2 : 1)),
        i.range
          ? ((p = Math.min(i.range[0], c.count)),
            (d = Math.max(0, Math.min(i.range[1], c.count - p))))
          : (d = c.count)),
      (t[e + 12] = f),
      (t[e + 13] = u),
      (t[e + 14] = d),
      (t[e + 15] = h ? h.count : 1),
      (t[e + 16] = p));
  }
  _replayOps(t, e, s, n, i, a, r = !1) {
    ((this._bs = null), t.setBindGroup(0, i), a && t.setBindGroup(2, a));
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
      setBindGroup: (n, i, a, r, l) => {
        (e.push("B" + n + ":" + s(i) + ":" + (a ? a[r ?? 0] : "-")),
          a ? t?.setBindGroup(n, i, a, r, l) : t?.setBindGroup(n, i));
      },
      setVertexBuffer: (n, i) => {
        (e.push("V" + n + ":" + s(i)), t?.setVertexBuffer(n, i));
      },
      setIndexBuffer: (n, i) => {
        (e.push("I" + s(n) + i), t?.setIndexBuffer(n, i));
      },
      draw: (n, i, a) => {
        (e.push("d" + n + "," + i + "," + (a || 0)), t?.draw(n, i, a));
      },
      drawIndexed: (n, i, a) => {
        (e.push("x" + n + "," + i + "," + (a || 0)), t?.drawIndexed(n, i, a));
      },
    };
  }
  _runBundles(t, e, s, n, i, a, r = !1) {
    let l = s.n,
      c = 17,
      h = (this._bundleC ||= new Map()),
      f = this.info.render.frame,
      u = (this._bundleOut ||= []),
      d = this.info;
    this._uidB ||= (v) => (v ? (v[TV] ||= o._uidN = (o._uidN || 0) + 1) : 0);
    let p = this._tokT;
    (!p || p.length < l * c) &&
      (p = this._tokT = new Int32Array(Math.max(l * c * 2, 4096)));
    let m = (this._tokH ||= []);
    for (let v = 0; v < l; v++) {
      let x = v * c;
      this._tok(p, x, s.p[v], s.g2[v], s.d[v], s.f[v], r);
      let y = 2166136261;
      for (let M = x; M < x + c; M++) y = Math.imul(y ^ p[M], 16777619);
      m[v] = y;
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
      this._uidB(i) +
      "|";
    u.length = 0;
    let b = 0;
    for (let v = 0; v < l; v++) {
      if (!(v === l - 1 || (m[v] & 15) === 0 || v - b >= 47)) continue;
      let x = v + 1,
        y = 2654435769,
        M = 2246822507;
      for (let _ = b; _ < x; _++)
        ((y = Math.imul(y ^ m[_], 16777619)),
          (M = Math.imul((M + m[_]) | 0, 1540483477) ^ (M >>> 15)));
      let S =
          g + (y >>> 0).toString(36) + (M >>> 0).toString(36) + ":" + (x - b),
        w = h.get(S);
      if (w) {
        let _ = w.tok;
        if (w.g0 !== n || w.g2 !== i || _.length !== (x - b) * c) w = null;
        else
          for (let z = 0, A = b * c; z < _.length; z++)
            if (_[z] !== p[A + z]) {
              w = null;
              break;
            }
      }
      if (w && this.bundleCheck) {
        let _ = [];
        (this._replayOps(this._logEnc(null, _), s, b, x, n, i, r),
          w.log
            ? _.join("|") !== w.log.join("|") &&
              ((d.bundleMismatch = (d.bundleMismatch || 0) + 1),
              d.bundleMismatch <= 3 &&
                console.error(
                  "render bundle mismatch",
                  e,
                  w.log.slice(0, 12).join(" "),
                  "|",
                  _.slice(0, 12).join(" "),
                ),
              (w = null))
            : (w.log = _));
      }
      if (!w) {
        let _ = this.device.createRenderBundleEncoder(a),
          z = this.bundleCheck ? [] : null;
        (this._replayOps(z ? this._logEnc(_, z) : _, s, b, x, n, i, r),
          (w = {
            bundle: _.finish(),
            tok: p.slice(b * c, x * c),
            g0: n,
            g2: i,
            log: z,
            used: f,
          }),
          h.set(S, w),
          (d.bundlesRecorded = (d.bundlesRecorded || 0) + 1));
      }
      ((w.used = f), u.push(w.bundle), (b = x));
    }
    if (
      ((d.bundlesRun = (d.bundlesRun || 0) + u.length),
      t.executeBundles(u),
      (this._bs = null),
      f - (this._bundleSweep || 0) > 120)
    ) {
      this._bundleSweep = f;
      for (let [v, x] of h) f - x.used > 360 && h.delete(v);
    }
  }
  _draw1(t, e, s = !1, n = !1) {
    let i = this._bs;
    (!i || i.pass !== t) &&
      (i = this._bs =
        {
          pass: t,
          vb: [null, null, null, null, null, null, null, null],
          g1: null,
          off: -1,
          g3: null,
          ib: null,
          ibf: null,
        });
    let a = i.vb,
      r = e.rec;
    {
      let l = e.slot * ur;
      if (i.off !== l || i.g1 !== this.objGroup) {
        let d = (this._offA ||= new Uint32Array(1));
        ((d[0] = l),
          t.setBindGroup(1, this.objGroup, d, 0, 1),
          (i.off = l),
          (i.g1 = this.objGroup));
      }
      a[0] !== r.pos && (t.setVertexBuffer(0, r.pos), (a[0] = r.pos));
      let c = r.joints || this._zeroBuf,
        h = r.weights || this._zeroBuf,
        f = e.inst?.buf || this._identityBuf;
      if (s) {
        let d = e.mat || this._defaultMat;
        i.g3 !== d && (t.setBindGroup(3, d), (i.g3 = d));
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
        (this._ib(t, i, d.index, "uint32"), t.drawIndexed(d.count, u));
      } else if (n && e.rec.lod && !e.range)
        (this._ib(t, i, e.rec.lod.index, "uint32"),
          t.drawIndexed(e.rec.lod.count, u));
      else if (e.rec.index)
        if ((this._ib(t, i, e.rec.index, e.rec.indexFormat), e.range)) {
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
      i;
    if (e === "seg")
      i = Uint32Array.from(
        s.subarray ? s.subarray(0, n - (n & 1)) : s.slice(0, n - (n & 1)),
      );
    else if (e === "wire") {
      i = new Uint32Array(Math.floor(n / 3) * 6);
      for (let r = 0, l = 0; r + 2 < n; r += 3) {
        let c = s[r],
          h = s[r + 1],
          f = s[r + 2];
        ((i[l++] = c),
          (i[l++] = h),
          (i[l++] = h),
          (i[l++] = f),
          (i[l++] = f),
          (i[l++] = c));
      }
    } else {
      let r = e === "loop" ? n : n - 1;
      i = new Uint32Array(Math.max(r, 0) * 2);
      for (let l = 0; l < r; l++)
        ((i[2 * l] = s[l]), (i[2 * l + 1] = s[(l + 1) % n]));
    }
    let a = this.device.createBuffer({
      size: Math.max(4, i.byteLength),
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });
    return (
      i.length && this.device.queue.writeBuffer(a, 0, i),
      (t.lines[e] = { index: a, count: i.length })
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
            i = 0;
          ((s.onmessage = ({ data: a }) => {
            let r = n.get(a.id);
            (n.delete(a.id), r?.(a));
          }),
            (this._lodSimplify = (a, r, l) =>
              new Promise((c, h) => {
                let f = ++i;
                (n.set(f, (u) => (u.err ? h(new Error(u.err)) : c(u.out))),
                  s.postMessage({ id: f, idx: a, pos: r, target: l }, [
                    a.buffer,
                    r.buffer,
                  ]));
              })));
        }
        let e = this._lodWorker
          ? null
          : (await Promise.resolve().then(() => (k7(), S7))).MeshoptSimplifier;
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
            i = Math.floor(s.count / 4 / 3) * 3,
            a;
          try {
            a = e
              ? e.simplify(n, s.posArray, 3, i, 0.01, [])[0]
              : await this._lodSimplify(n, s.posArray.slice(), i);
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
    let i = t + ":" + e + ":" + s + ":" + n,
      a = this._samplers.get(i),
      r = (l) =>
        l === 1001 ? "clamp-to-edge" : l === 1002 ? "mirror-repeat" : "repeat";
    if (!a) {
      let l = s === 1003 ? "nearest" : "linear",
        c = n >= 1003 && n <= 1005 ? "nearest" : "linear",
        h = n === 1005 || n === 1008 ? "linear" : "nearest",
        f = n === 1003 || n === 1006,
        u = l === "linear" && c === "linear" && h === "linear";
      this._samplers.set(
        i,
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
      i = e.height || e.videoHeight;
    if (!n || !i || e.complete === !1 || e.released) return s?.tex || null;
    let a = this.device,
      r = t.colorSpace === "srgb",
      l = null,
      c = !1;
    if (e.data) {
      let b = e.data,
        v = t.format === 1028 ? 1 : t.format === 1030 ? 2 : 4,
        x = n * i;
      if (
        ((c = b instanceof Float32Array || t.type === 1016 || t.type === 1015),
        c)
      ) {
        let y = t.type === 1016 && b instanceof Uint16Array,
          M = new Uint16Array(x * 4),
          S = (o._f2h ||= (() => {
            let w = new Float32Array(1),
              _ = new Uint32Array(w.buffer);
            return (z) => {
              w[0] = z;
              let A = _[0],
                T = (A >>> 16) & 32768,
                E = ((A >>> 23) & 255) - 112,
                R = A & 8388607;
              return E <= 0
                ? T
                : E >= 31
                  ? T | 31744
                  : T | (E << 10) | (R >>> 13);
            };
          })());
        for (let w = 0; w < x; w++)
          for (let _ = 0; _ < 4; _++) {
            let z =
              _ < v
                ? y
                  ? b[w * v + _]
                  : S(b[w * v + _])
                : _ === 3
                  ? 15360
                  : v === 1
                    ? y
                      ? b[w]
                      : S(b[w])
                    : 0;
            M[w * 4 + _] = z;
          }
        l = M;
      } else if (v === 4 && b instanceof Uint8Array) l = b;
      else {
        let y = new Uint8Array(x * 4);
        for (let M = 0; M < x; M++)
          for (let S = 0; S < 4; S++)
            y[M * 4 + S] =
              S < v ? b[M * v + S] : S === 3 ? 255 : v === 1 ? b[M] : 0;
        l = y;
      }
      if (t.flipY) {
        let y = n * 4,
          M = new l.constructor(y);
        for (let S = 0; S < i >> 1; S++) {
          let w = S * y,
            _ = (i - 1 - S) * y;
          (M.set(l.subarray(w, w + y)), l.copyWithin(w, _, _ + y), l.set(M, _));
        }
      }
    }
    let h = c ? "rgba16float" : r ? "rgba8unorm-srgb" : "rgba8unorm",
      f =
        t.generateMipmaps === !1 && e.data
          ? 1
          : Math.floor(Math.log2(Math.max(n, i))) + 1;
    s?.tex.destroy();
    let u = 0,
      d = this.maxTextureSize || 0;
    if (d && !l) for (; f - u > 1 && Math.max(n >> u, i >> u) > d;) u++;
    let p =
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
      m = a.createTexture({
        size: [n, i],
        format: h,
        mipLevelCount: f,
        usage: p | (u ? GPUTextureUsage.COPY_SRC : 0),
      });
    if (l)
      a.queue.writeTexture(
        { texture: m },
        l,
        { bytesPerRow: n * (c ? 8 : 4) },
        [n, i],
      );
    else
      try {
        a.queue.copyExternalImageToTexture(
          { source: e, flipY: t.flipY },
          {
            texture: m,
            premultipliedAlpha: !!t.premultiplyAlpha || !!e.sfOpaque,
          },
          [n, i],
        );
      } catch (b) {
        console.warn("texture upload failed", n, i, b);
      }
    this._mipmaps(m, h, f);
    let g = m;
    if (u) {
      g = a.createTexture({
        size: [Math.max(1, n >> u), Math.max(1, i >> u)],
        format: h,
        mipLevelCount: f - u,
        usage: p,
      });
      let b = a.createCommandEncoder();
      for (let v = 0; v < f - u; v++)
        b.copyTextureToTexture(
          { texture: m, mipLevel: v + u },
          { texture: g, mipLevel: v },
          [Math.max(1, n >> (v + u)), Math.max(1, i >> (v + u))],
        );
      (a.queue.submit([b.finish()]), m.destroy());
    }
    return (
      this._texCache.set(t, { tex: g, version: t.version }),
      !l && this.onTextureUploaded
        ? this.onTextureUploaded(t, e)
        : l &&
          t.userData?.mbDropData &&
          (t.image = { width: n, height: i, released: !0 }),
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
    let i = this.device.createBindGroup({
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
      a.setBindGroup(0, i),
      a.draw(3),
      a.end());
  }
  _mipmaps(t, e, s) {
    if (s < 2) return;
    let n = this.device;
    if (((this._mipPipes ||= {}), !this._mipPipes[e])) {
      let a = n.createShaderModule({ code: E7 });
      this._mipPipes[e] = n.createRenderPipeline({
        layout: n.createPipelineLayout({ bindGroupLayouts: [this.mipLayout] }),
        vertex: { module: a, entryPoint: "vs" },
        fragment: { module: a, entryPoint: "fs", targets: [{ format: e }] },
      });
    }
    let i = n.createCommandEncoder();
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
        l = i.beginRenderPass({
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
    n.queue.submit([i.finish()]);
  }
  _matBlock(t, e, s, n, i, a) {
    let r = a.get(t);
    if (r) return r;
    let l = ur / 4,
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
    let h = this._fillMat(c.a, 0, t, e, s, n, null, i, !1),
      f = c.a,
      u = c.q,
      d = c.init;
    if (d)
      for (let p = 0; p < 3 && d; p++) {
        let m = p === 0 ? 36 : p === 1 ? 76 : 157,
          g = p === 0 ? 48 : p === 1 ? 140 : 180;
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
  _fillMatMemo(t, e, s, n, i, a, r, l, c, h) {
    if (r || c) return this._fillMat(t, e, s, n, i, a, r, l, c);
    let f = this._matBlock(s, n, i, a, l, h),
      u = f.a;
    for (let d = 36; d < 48; d++) t[e + d] = u[d];
    for (let d = 76; d < 140; d++) t[e + d] = u[d];
    for (let d = 157; d < 180; d++) t[e + d] = u[d];
    return (
      (t[e + 88] = s.vertexColors && i.color ? 1 : 0),
      (t[e + 91] = n.isInstancedMesh && n.instanceColor ? 1 : 0),
      (t[e + 118] = s.flatShading || !n.geometry.attributes.normal ? 1 : 0),
      (t[e + 130] = this.neural || n.receiveShadow ? 1 : 0),
      (t[e + 138] =
        n.isPoints || n.isSprite ? 2 : s.side === 1 ? 1 : s.side === 2 ? 2 : 0),
      (t[e + 139] = n.matrixWorld.determinant() < 0 ? 1 : 0),
      f.group
    );
  }
  _fillMat(t, e, s, n, i, a, r, l, c) {
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
      v = !s.emissiveMap || m(s.emissiveMap, 8);
    ((t[e + 44] = g && v ? g.r * b : 0),
      (t[e + 45] = g && v ? g.g * b : 0),
      (t[e + 46] = g && v ? g.b * b : 0));
    let x = s.map || s.matcap || null,
      y = s.normalMap || s.bumpMap || null,
      M =
        x ||
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
      (t[e + 84] = m(x) ? 1 : 0),
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
      (t[e + 88] = s.vertexColors && i.color ? 1 : 0),
      (t[e + 89] = s.fog !== !1 && a.fog ? 1 : 0),
      (t[e + 90] = s.normalMap ? s.normalScale.x : (s.bumpScale ?? 1)),
      (t[e + 91] = n.isInstancedMesh && n.instanceColor ? 1 : 0));
    let w = m(s.lightMap),
      _ = s.userData?.lightMapLog;
    ((t[e + 92] = w ? (s.lightMapIntensity ?? 1) : 0),
      (t[e + 93] = _ ? Math.log2(1 + _.k * _.max) : 0),
      (t[e + 94] = _ ? _.k : 1),
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
    let z = s.normalMap;
    ((t[e + 106] =
      z && Math.max(Math.abs(z.repeat.x), Math.abs(z.repeat.y)) >= 8
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
    let A = s.isMeshPhongMaterial ? s.specular : s.specularColor;
    ((t[e + 120] = A ? A.r : 1),
      (t[e + 121] = A ? A.g : 1),
      (t[e + 122] = A ? A.b : 1),
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
    let R = s.normalScale,
      P = s.clearcoatNormalScale;
    ((t[e + 157] = R && R.x ? R.y / R.x : 1),
      (t[e + 158] = P && P.x ? P.y / P.x : 1),
      (t[e + 159] = s.userData?.mbWind || 0));
    let C = s.userData?.mbWheels;
    return (
      C ? t.set(C, e + 160) : t.fill(0, e + 160, e + 176),
      (t[e + 176] = s.userData?.mbScuff ? 1 : 0),
      t.fill(0, e + 177, e + 180),
      u
    );
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
    let i = s.map((c) => e[c] || null);
    if (i.every((c) => !c)) return this._defaultMat;
    let a = i.map((c) => this._texture(c));
    if (i.some((c, h) => c && !a[h])) return n?.group || this._defaultMat;
    let r = i.find(Boolean),
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
        list: i,
        vers: i.map((c) => c && c.version),
        group: l,
      }),
      l
    );
  }
  prewarm(t, { planar: e = !1, priority: s = 0 } = {}) {
    if (!this._mkHook) return 0;
    let n = 0,
      i = new Set(),
      a = this.fullMat && this.samples === 1 && this.depthPrepass !== !1,
      r = (l) => {
        let c = l?.userData?.mbAlbedo;
        !c ||
          i.has(l) ||
          (i.add(l),
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
      i = new Set(),
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
              d && !d.isRenderTargetTexture && i.add(d);
            }
          }
      }),
      {
        pending:
          [...n].filter((l) => !l?.p && !l?.error).length +
          [...i].filter((l) => this._texCache.get(l)?.version !== l.version)
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
          for (let i of [this._hooks, this._hooksEq, this._hooksLin]) {
            let a = i?.get(n);
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
      i = (l) => {
        let c = l?.userData?.mbAlbedo;
        if (!c) return;
        let h = this._hooks?.get(c);
        if ((h && s.add(h), n && !l.transparent && !(l.alphaTest > 0))) {
          let f = this._hooksEq?.get(c);
          f && s.add(f);
        }
      };
    Array.isArray(t)
      ? t.forEach(i)
      : t.traverse((l) => {
          if (l.isMesh)
            for (let c of Array.isArray(l.material) ? l.material : [l.material])
              i(c);
        });
    let a;
    try {
      await Promise.race([
        Promise.all([...s].map((l) => l.ready)),
        new Promise((l) => {
          a = setTimeout(l, e);
        }),
      ]);
    } finally {
      clearTimeout(a);
    }
    let r = [...s].filter((l) => !l.p && !l.error).length;
    return (this.materialPreparation = {
      total: s.size,
      pending: r,
      failed: [...s].filter((l) => l.error).length,
    });
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
    let i = s.matrixWorld.elements,
      a = -i[8],
      r = -i[10],
      l = Math.hypot(a, r) || 1,
      c = this.nearShadowR ?? 24,
      h = i[12] + (a / l) * 14 - c,
      f = h + 2 * c,
      u = i[14] + (r / l) * 14 - c,
      d = u + 2 * c,
      p = i[13] - 30,
      m = i[13] + 10;
    for (let P = 0; P < n.length; P += 4) {
      let C = n[P + 3];
      Math.hypot(n[P] - (h + f) / 2, n[P + 2] - (u + d) / 2) > c * 2.5 ||
        ((h = Math.min(h, n[P] - C)),
        (f = Math.max(f, n[P] + C)),
        (p = Math.min(p, n[P + 1] - C)),
        (m = Math.max(m, n[P + 1] + C)),
        (u = Math.min(u, n[P + 2] - C)),
        (d = Math.max(d, n[P + 2] + C)));
    }
    let g = new dt((h + f) / 2, (p + m) / 2, (u + d) / 2),
      b = (Math.hypot(f - h, d - u) / 2) * 0.75 + 0.35,
      v = Math.min(b, this._shadowHalf),
      x = e.dir.clone().normalize(),
      y = new dt(0, 1, 0).cross(x);
    (y.lengthSq() < 1e-6 && y.set(1, 0, 0), y.normalize());
    let M = x.clone().cross(y),
      S = (2 * v) / this._shadowRes,
      w = Math.round(g.dot(y) / S) * S,
      _ = Math.round(g.dot(M) / S) * S,
      z = g.dot(x);
    g.copy(y).multiplyScalar(w).addScaledVector(M, _).addScaledVector(x, z);
    let A = (this._lightCamD ||= new Qr()),
      T = 400;
    ((A.left = -v),
      (A.right = v),
      (A.top = v),
      (A.bottom = -v),
      (A.near = 0.05),
      (A.far = T + 200),
      A.position.copy(g).addScaledVector(x, T),
      A.up.copy(M),
      A.lookAt(g),
      A.updateMatrixWorld(),
      A.updateProjectionMatrix());
    let E = (this._lightVPD ||= new fe())
      .multiplyMatrices(Am, A.projectionMatrix)
      .multiply(A.matrixWorldInverse);
    (t.set(E.elements, 464),
      (t[480] = 1 / this._shadowRes),
      (t[481] = A.far - A.near),
      (t[482] = 1 / (2 * v)),
      (t[483] = t[63]),
      (this._near = { C: g, lx: y, ly: M, half: v }),
      (this._nearOn = !0));
    let R = (this._frameDynData ||= new Float32Array(t.length));
    (R.set(t),
      R.set(E.elements, 44),
      (R[60] = t[480]),
      (R[61] = t[481]),
      (R[62] = t[482]),
      this.device.queue.writeBuffer(this.frameBufDyn, 0, R));
  }
  _inNearCore(t) {
    let e = this._near;
    if (!e || t.sr === void 0) return !1;
    let s = t.sx * e.lx.x + t.sy * e.lx.y + t.sz * e.lx.z - e.C.dot(e.lx),
      n = t.sx * e.ly.x + t.sy * e.ly.y + t.sz * e.ly.z - e.C.dot(e.ly),
      i = e.half * 0.38 - t.sr;
    return Math.abs(s) < i && Math.abs(n) < i;
  }
  _nearCasters(t) {
    let e = this._near,
      s = e.C.dot(e.lx),
      n = e.C.dot(e.ly),
      i = [];
    for (let a of t) {
      if (a.sr === void 0) {
        i.push(a);
        continue;
      }
      let r = a.sx * e.lx.x + a.sy * e.lx.y + a.sz * e.lx.z - s,
        l = a.sx * e.ly.x + a.sy * e.ly.y + a.sz * e.ly.z - n;
      Math.abs(r) < e.half + a.sr && Math.abs(l) < e.half + a.sr && i.push(a);
    }
    return i;
  }
  pendingTextures(t) {
    let e = new Set(),
      s = new Set();
    return (
      t.traverse((n) => {
        if (!(!n.isMesh && !n.isSprite && !n.isPoints)) {
          for (let i of Array.isArray(n.material) ? n.material : [n.material])
            if (!(!i || s.has(i))) {
              s.add(i);
              for (let a of Object.values(this._matMaps(i))) {
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
      i = this.device;
    (!e || e.cap < s.count) &&
      (e?.buf.destroy(),
      e?.colorBuf?.destroy(),
      (e = {
        cap: s.count,
        buf: i.createBuffer({
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
      (i.queue.writeBuffer(e.buf, 0, s.array, 0, a * 16),
      (e.v = s.version),
      (e.up = a));
    let r = t.userData.mbPrevInstance;
    if (r && this.pVelI) {
      (!e.prevBuf || e.prevCap !== e.cap) &&
        (e.prevBuf?.destroy(),
        (e.prevBuf = i.createBuffer({
          size: Math.max(64, e.cap * 64),
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })),
        (e.prevCap = e.cap),
        (e.pv = -1));
      let l = t.userData.mbPrevVersion ?? 0;
      e.pv !== l &&
        (i.queue.writeBuffer(
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
        (e.colorBuf = i.createBuffer({
          size: Math.max(12, e.cap * 12),
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })),
      e.cv !== n.version || a > e.cup)
    ) {
      let l = Math.min(n.array.length / 3, e.cap, a);
      (i.queue.writeBuffer(e.colorBuf, 0, n.array, 0, l * 3),
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
      !t || !this.device || !(cp || Mb))
    )
      return !1;
    let e = this.device,
      s = e.limits,
      n = cp ? s.maxTextureDimension2D : 1e9,
      i = cp
        ? 1 / 0
        : Math.min(s.maxStorageBufferBindingSize, s.maxBufferSize) - 16;
    for (; t.w > n || t.h > n || t.w * t.h > i;) t = Aut(t);
    if (
      (e.pushErrorScope("out-of-memory"), e.pushErrorScope("validation"), cp)
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
      (this.skyPath = cp ? "texture" : "buffer"),
      !0
    );
  }
  setSunField(t) {
    if (!this.device || !Sb) return !1;
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
      await new Promise((z) => setTimeout(z, 16));
    let i = t.image,
      a = i.width * i.height,
      r = i.data instanceof Uint16Array,
      l = Math.max(1, Math.floor(Math.log2(Math.min(i.width, i.height))) - 1),
      c = GPUTextureUsage.TEXTURE_BINDING,
      h = GPUTextureUsage.RENDER_ATTACHMENT,
      f = GPUTextureUsage.COPY_DST,
      u = s.createTexture({
        size: [i.width, i.height, 1],
        format: "rgba16float",
        mipLevelCount: l,
        usage: c | h | f,
      }),
      d = i.data;
    if (!r) {
      let z = new Uint16Array(a * 4);
      for (let A = 0; A < a * 4; A++) z[A] = Ql.toHalfFloat(d[A]);
      d = z;
    }
    s.queue.writeTexture({ texture: u }, d, { bytesPerRow: i.width * 8 }, [
      i.width,
      i.height,
    ]);
    let p = s.createCommandEncoder();
    for (let z = 1; z < l; z++) {
      let A = (E) =>
          u.createView({ dimension: "2d", baseMipLevel: E, mipLevelCount: 1 }),
        T = p.beginRenderPass({
          colorAttachments: [{ view: A(z), loadOp: "clear", storeOp: "store" }],
        });
      (T.setPipeline(this.pMip),
        T.setBindGroup(
          0,
          s.createBindGroup({
            layout: this.mipLayout,
            entries: [
              { binding: 0, resource: A(z - 1) },
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
      v = s.createTexture({
        size: [m, g, 1],
        format: "rgba16float",
        mipLevelCount: b,
        usage: c | GPUTextureUsage.STORAGE_BINDING | f,
      }),
      x = [0, 400, 64, 8, 1],
      y = [1, 64, 96, 128, 128],
      M = Math.log2(i.width / 1024),
      S = [0, 2.6, 3.9, 5.4, 7],
      w = p.beginComputePass();
    w.setPipeline(this.pEnvEq);
    let _ = rp.empty(s).latentTex.createView({ dimension: "2d-array" });
    for (let z = 0; z < b; z++) {
      let A = s.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (s.queue.writeBuffer(
        A,
        0,
        new Float32Array([
          x[z],
          y[z],
          Math.min(Math.max(S[z] + M, 0), l - 1),
          0,
        ]),
      ),
        w.setBindGroup(
          0,
          s.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              { binding: 0, resource: u.createView({ dimension: "2d" }) },
              { binding: 1, resource: _ },
              { binding: 2, resource: this.envSampler },
              { binding: 3, resource: { buffer: A } },
              {
                binding: 4,
                resource: v.createView({
                  dimension: "2d",
                  baseMipLevel: z,
                  mipLevelCount: 1,
                }),
              },
            ],
          }),
        ),
        w.dispatchWorkgroups(Math.ceil((m >> z) / 8), Math.ceil((g >> z) / 8)));
    }
    (w.end(),
      s.queue.submit([p.finish()]),
      (this._nbPriorOrig ||= n.priorTex),
      this._nbPriorOwn && this._nbPriorOwn.destroy(),
      (n.priorTex = this._nbPriorOwn = v),
      (this._envGroups = null),
      s.queue.onSubmittedWorkDone().then(() => u.destroy()));
  }
  _envEnsure(t) {
    if (this.neural) return;
    let e = this.envOverride?.isTexture ? this.envOverride : null,
      s = e || this._envSource(t),
      n = this.device,
      i = s
        ? s.userData?.mbEnv || (s.isCubeTexture ? { cube: s } : { equirect: s })
        : null;
    if (i?.scene) {
      let L = this._sceneEnvTex(i);
      L && (i = { equirect: L });
    }
    !e && this._skyActive && this._so?.isReady && (i = { skyOcean: this._so });
    let a = i?.equirect || i?.cube || null,
      r = i?.skyOcean
        ? `so:${i.skyOcean.envKey()}`
        : i
          ? a
            ? `${a.uuid}:${a.version}`
            : `scene:${i.scene?.uuid}`
          : "none";
    if (r === this._envKey) return;
    if (!i) {
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
      (i.equirect && !c(i.equirect.image)) ||
      (i.cube && !(i.cube.image?.length === 6 && i.cube.image.every(c)))
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
      i.scene)
    ) {
      let L = Ql.toHalfFloat(1),
        F = new Uint16Array(h * f * 4).fill(L);
      for (let O = 3; O < F.length; O += 4) F[O] = Ql.toHalfFloat(1);
      for (let O = 0; O < m; O++)
        n.queue.writeTexture(
          { texture: this._envPrior, origin: [0, 0, O] },
          F,
          { bytesPerRow: h * 8 },
          [h, f],
        );
      ((this._envKey = r), (this._envGroups = null), (this._bgEnvView = null));
      return;
    }
    let g = (L, F, O) => {
        let B = new Uint16Array(F * 4),
          H = L instanceof Uint16Array;
        for (let N = 0; N < F; N++)
          for (let D = 0; D < 4; D++) {
            let U =
              D < O ? L[N * O + D] : D === 3 ? (H ? Ql.toHalfFloat(1) : 1) : 0;
            B[N * 4 + D] = H ? U : Ql.toHalfFloat(U);
          }
        return B;
      },
      b = (L, F, O) => {
        if (F.data) {
          let B = F.width * F.height,
            H = Math.round(F.data.length / B);
          return (
            n.queue.writeTexture(
              { texture: L, origin: [0, 0, O] },
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
            { texture: L, origin: [0, 0, O] },
            [F.width, F.height],
          ),
          !0
        );
      },
      v = !!i.cube,
      x = i.skyOcean
        ? [{ width: 512, height: 256 }]
        : (v ? [...i.cube.image] : [i.equirect.image]).map(l),
      y = x[0].width,
      M = x[0].height,
      S = i.skyOcean
        ? i.skyOcean.envLevels
        : Math.max(1, Math.floor(Math.log2(Math.min(y, M))) - 1),
      w = i.skyOcean
        ? i.skyOcean.tEnv
        : n.createTexture({
            size: [y, M, x.length],
            format: "rgba16float",
            mipLevelCount: S,
            usage: u | d | p,
            dimension: "2d",
          }),
      _ = !1;
    i.skyOcean ||
      x.forEach((L, F) => {
        _ = b(w, L, F) && (v ? i.cube : i.equirect).colorSpace === Je;
      });
    let z = n.createCommandEncoder();
    if (!i.skyOcean)
      for (let L = 0; L < x.length; L++)
        for (let F = 1; F < S; F++) {
          let O = (H) =>
              w.createView({
                dimension: "2d",
                baseArrayLayer: L,
                arrayLayerCount: 1,
                baseMipLevel: H,
                mipLevelCount: 1,
              }),
            B = z.beginRenderPass({
              colorAttachments: [
                { view: O(F), loadOp: "clear", storeOp: "store" },
              ],
            });
          (B.setPipeline(this.pMip),
            B.setBindGroup(
              0,
              n.createBindGroup({
                layout: this.mipLayout,
                entries: [
                  { binding: 0, resource: O(F - 1) },
                  { binding: 1, resource: this.linSampler },
                ],
              }),
            ),
            B.draw(3),
            B.end());
        }
    let A = [0, 3e3, 600, 120, 24, 5, 1],
      T = [1, 48, 64, 96, 128, 128, 128],
      E = [0, 1.8, 3, 4.2, 5.4, 6.8, 7.5],
      R = Math.log2((v ? y * 4 : y) / 1024),
      P = z.beginComputePass();
    P.setPipeline(v ? this.pEnvCube : this.pEnvEq);
    let C = this.dummy2d.createView(),
      I = rp.empty(n).latentTex.createView({ dimension: "2d-array" });
    for (let L = 0; L < m; L++) {
      let F = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (n.queue.writeBuffer(
        F,
        0,
        new Float32Array([
          A[L],
          T[L],
          Math.min(Math.max(E[L] + R, 0), S - 1),
          _ ? 1 : 0,
        ]),
      ),
        P.setBindGroup(
          0,
          n.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              {
                binding: 0,
                resource: v ? C : w.createView({ dimension: "2d" }),
              },
              {
                binding: 1,
                resource: v ? w.createView({ dimension: "2d-array" }) : I,
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
        P.dispatchWorkgroups(h / 8, f / 8));
    }
    if (((this._bgSharp = null), !i.skyOcean && v)) {
      let L = Math.min(4096, Math.max(2048, y * 8)),
        F = L / 2;
      (this._bgCubeEq?.destroy(),
        (this._bgCubeEq = n.createTexture({
          size: [L, F],
          format: "rgba16float",
          usage: u | GPUTextureUsage.STORAGE_BINDING,
        })));
      let O = n.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      (n.queue.writeBuffer(O, 0, new Float32Array([0, 1, 0, _ ? 1 : 0])),
        P.setBindGroup(
          0,
          n.createBindGroup({
            layout: this.envPreLayout,
            entries: [
              { binding: 0, resource: C },
              { binding: 1, resource: w.createView({ dimension: "2d-array" }) },
              { binding: 2, resource: this.envSampler },
              { binding: 3, resource: { buffer: O } },
              { binding: 4, resource: this._bgCubeEq.createView() },
            ],
          }),
        ),
        P.dispatchWorkgroups(Math.ceil(L / 8), Math.ceil(F / 8)),
        (this._bgSharp = this._bgCubeEq.createView()));
    } else
      !i.skyOcean &&
        !_ &&
        (this._bgSharp = w.createView({
          dimension: "2d",
          baseArrayLayer: 0,
          arrayLayerCount: 1,
          baseMipLevel: 0,
          mipLevelCount: 1,
        }));
    (P.end(),
      n.queue.submit([z.finish()]),
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
      i = GPUTextureUsage.RENDER_ATTACHMENT,
      a = GPUTextureUsage.TEXTURE_BINDING,
      r = t.createTexture({
        size: [s, s, 6],
        format: "rgba16float",
        mipLevelCount: n,
        usage: i | a,
      }),
      l = t.createTexture({ size: [s, s], format: "depth24plus", usage: i }),
      c = t.createTexture({
        size: [256, 128],
        format: "rgba16float",
        mipLevelCount: 5,
        usage: a | GPUTextureUsage.STORAGE_BINDING,
      }),
      h = new dt().fromArray(e.center_gltf),
      f = new Ji(90, 1, 0.02, 60),
      u = [
        [1, 0, 0, 0, -1, 0],
        [-1, 0, 0, 0, -1, 0],
        [0, 1, 0, 0, 0, 1],
        [0, -1, 0, 0, 0, -1],
        [0, 0, 1, 0, -1, 0],
        [0, 0, -1, 0, -1, 0],
      ].map(
        ([M, S, w, _, z, A]) => (
          f.position.copy(h),
          f.up.set(_, z, A),
          f.lookAt(h.x + M, h.y + S, h.z + w),
          f.updateMatrixWorld(),
          f.updateProjectionMatrix(),
          new fe()
            .multiplyMatrices(Am, f.projectionMatrix)
            .multiply(f.matrixWorldInverse)
        ),
      ),
      d = u.map(() =>
        t.createBuffer({
          size: vb,
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
      v = [1, 64, 128, 128, 128],
      x = [0, 1.5, 3.5, 5, 6],
      y = b.map((M, S) => {
        let w = t.createBuffer({
            size: 416,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
          }),
          _ = new Float32Array(104);
        return (
          u.forEach((z, A) => _.set(z.elements, 16 * A)),
          _.set([h.x, h.y, h.z, 1], 96),
          _.set([M, v[S], x[S], 0], 100),
          t.queue.writeBuffer(w, 0, _),
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
      frame: new Float32Array(vb / 4),
    }),
      (this._envGroups = null));
  }
  _dynEncode(t, e) {
    let s = this._dyn;
    for (let i = 0; i < 6; i++) {
      let a = t.beginRenderPass({
        colorAttachments: [
          {
            view: s.face0[i],
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
      (a.setBindGroup(0, s.fg[i]),
        a.setBindGroup(2, this._envGroups.planar),
        this._drawGrouped(a, e, (r) =>
          r.nm && this.pNeuralLin ? this.pNeuralLin : this.pStandardLin,
        ),
        a.end());
    }
    for (let i of s.mips) {
      let a = t.beginRenderPass({
        colorAttachments: [
          {
            view: i.dst,
            loadOp: "clear",
            storeOp: "store",
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
          },
        ],
      });
      (a.setPipeline(this.pMip),
        a.setBindGroup(0, i.group),
        a.draw(3),
        a.end());
    }
    let n = t.beginComputePass();
    n.setPipeline(this.pDynPrefilter);
    for (let i of s.pre)
      (n.setBindGroup(0, i.group),
        n.dispatchWorkgroups(Math.ceil(i.w / 8), Math.ceil(i.h / 8)));
    n.end();
  }
  _drawCasters(t, e, s, n, i = null) {
    let a = n ? e.filter((l) => l.at) : [],
      r = a.length ? e.filter((l) => !l.at) : e;
    if (r.length && s) {
      let l = i ? r.filter((h) => h.lean) : [],
        c = l.length ? r.filter((h) => !h.lean) : r;
      (c.length && (t.setPipeline(s), this._drawList(t, c)),
        l.length && (t.setPipeline(i), this._drawList(t, l)));
    }
    a.length &&
      (t.setPipeline(n),
      t.setBindGroup(2, this._emptyGroup),
      this._drawList(t, a, !0));
  }
  _casterOps(t, e, s, n, i = null) {
    let a = n ? e.filter((l) => l.at) : [],
      r = a.length ? e.filter((l) => !l.at) : e;
    if (r.length && s) {
      let l = i ? r.filter((h) => h.lean) : [],
        c = l.length ? r.filter((h) => !h.lean) : r;
      for (let h of c) this._op(t, s, null, h, !1);
      for (let h of l) this._op(t, i, null, h, !1);
    }
    for (let l of a) this._op(t, n, this._emptyGroup, l, !0);
  }
  _drawGrouped(t, e, s, n = !1) {
    let i = null;
    for (let a of e) {
      let r = s(a);
      r && (r !== i && (t.setPipeline(r), (i = r)), this._draw1(t, a, !0, n));
    }
  }
  _sideGL() {
    if (this._side) return this._side.glr;
    let t = o.fallbackClass || gb;
    if (this.shaderSidecar === !1 || t === o || t.prototype instanceof o)
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
    let i = this._captureEnv(
      e,
      s.near,
      s.far,
      s.getWorldPosition(new dt()),
      Math.min(t.width || 256, 512),
    );
    ((this._capturing = !1),
      i && (n.eq?.dispose(), (n.eq = i), (n.frame = this.info.render.frame)));
  }
  _captureEnv(t, e = 0.1, s = 100, n = null, i = 256) {
    let a = this._sideGL();
    if (!a || !t) return null;
    try {
      let c = new Em(i, { type: ga, generateMipmaps: !1 }),
        h = new xm(e, s, c);
      (n && h.position.copy(n), h.updateMatrixWorld(!0));
      let f = a.toneMapping,
        u = a.getClearColor(new It()),
        d = a.getClearAlpha();
      ((a.toneMapping = X0), a.setClearColor(0, 1));
      let p = t.background;
      (p && !p.isColor && !p.isTexture && (t.background = null),
        h.update(a, t),
        (t.background = p));
      let m = new sa(1024, 512, { type: qa, depthBuffer: !1 }),
        g = new jo({
          uniforms: { t: { value: c.texture } },
          depthTest: !1,
          depthWrite: !1,
          vertexShader:
            "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
          fragmentShader: `uniform samplerCube t; varying vec2 vUv;
          void main() { float ph = (vUv.x - 0.5) * 6.28318531, th = (0.5 - vUv.y) * 3.14159265;   // row 0 = up (this renderer's equirects)
            gl_FragColor = vec4(textureCube(t, vec3(cos(ph) * cos(th), sin(th), sin(ph) * cos(th))).rgb, 1.0); }`,
        }),
        b = new ye(new Yn(2, 2), g);
      ((b.frustumCulled = !1),
        a.setRenderTarget(m),
        a.render(b, new Qr(-1, 1, 1, -1, 0, 1)),
        a.setRenderTarget(null));
      let v = new Float32Array(1024 * 512 * 4);
      (a.readRenderTargetPixels(m, 0, 0, 1024, 512, v),
        (a.toneMapping = f),
        a.setClearColor(u, d),
        c.dispose(),
        m.dispose(),
        g.dispose(),
        b.geometry.dispose());
      let x = new no(v, 1024, 512, go, qa);
      return ((x.needsUpdate = !0), x);
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
    let i = this._side,
      a = Math.max(1, this._W >> 1),
      r = Math.max(1, this._H >> 1);
    (i.w !== a || i.h !== r) &&
      (i.glr.setPixelRatio(1),
      i.glr.setSize(a, r, !1),
      (i.w = a),
      (i.h = r),
      (i.key = null),
      i.tex?.destroy(),
      (i.tex = n.createTexture({
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
          { binding: 0, resource: i.tex.createView() },
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
    if (l === i.key) return i.tex;
    i.key = l;
    for (let d of s) d.layers.enable(31);
    ((i.cam ||= e.clone()), i.cam.copy(e), i.cam.layers.set(31));
    let h = i.glr;
    ((h.toneMapping = this.toneMapping ?? 0),
      (h.toneMappingExposure = this.toneMappingExposure),
      (h.outputColorSpace = this.outputColorSpace),
      h.setClearColor(0, 0));
    let f = t.background,
      u = t.fog;
    t.background = null;
    try {
      h.render(t, i.cam);
    } finally {
      ((t.background = f), (t.fog = u));
    }
    return (
      n.queue.copyExternalImageToTexture(
        { source: i.cv },
        { texture: i.tex, premultipliedAlpha: !0 },
        [a, r],
      ),
      i.tex
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
      (g.traverseAncestors((v) => {
        v.visible || (b = !1);
      }),
        b && s.push(g));
    }
    let i = (g) =>
      g.isDirectionalLight || g.isSunLight ? 0 : g.distance > 0 ? 2 : 1;
    s.sort((g, b) => i(g) - i(b));
    let a = this.lampBounce === !1 ? null : this._bounceFloor,
      r = [];
    if (a)
      for (let g of s) {
        if (r.length >= 8 || g.isDirectionalLight || g.isSunLight) continue;
        g.updateMatrixWorld();
        let b = new dt().setFromMatrixPosition(g.matrixWorld),
          v = b.y - a.y;
        if (v < 0.05) continue;
        let x, y, M;
        if (g.isSpotLight) {
          g.target.updateMatrixWorld();
          let w = new dt()
            .setFromMatrixPosition(g.target.matrixWorld)
            .sub(b)
            .normalize();
          if (w.y > -0.05) continue;
          let _ = v / -w.y;
          ((x = b.clone().addScaledVector(w, _)),
            (y = _ * Math.tan(Math.min(g.angle, 1.4))),
            (M =
              2 *
              Math.PI *
              g.intensity *
              (1 - Math.cos(g.angle * (1 - 0.5 * g.penumbra))) *
              Math.min(1, -w.y * 2)));
        } else
          ((x = new dt(b.x, a.y, b.z)),
            (y = v),
            (M = 2 * Math.PI * g.intensity));
        let S = ((a.albedo * M) / Math.PI) * (this.bounceScale ?? 1);
        r.push({
          c: x,
          R: y,
          r: g.color.r * S * a.color.r,
          g: g.color.g * S * a.color.g,
          b: g.color.b * S * a.color.b,
        });
      }
    let l = Math.min(r.length, ZS);
    for (let g = 0; g < l; g++) {
      let b = r[g],
        v = B5 + Pm * g;
      (e.fill(0, v, v + Pm),
        (e[v] = b.c.x),
        (e[v + 1] = a.y + 0.01),
        (e[v + 2] = b.c.z),
        (e[v + 3] = 0),
        (e[v + 4] = b.r),
        (e[v + 5] = b.g),
        (e[v + 6] = b.b),
        (e[v + 7] = 0),
        (e[v + 8] = 0),
        (e[v + 9] = 1),
        (e[v + 10] = 0),
        (e[v + 11] = -3),
        (e[v + 12] = 0),
        (e[v + 13] = -1),
        (e[v + 14] = b.R * b.R),
        (e[v + 15] = 2),
        (e[v + 16] = -1),
        (e[v + 17] = -1));
    }
    let c = Math.min(s.length + l, ZS),
      h = l,
      f = 0,
      u = 0,
      d = 0,
      p = this.shadowMap.enabled !== !1;
    ((this._spots = []), (this._points = []), (this._spotMapReq = []));
    let m = this._v;
    for (let g = l; g < c; g++) {
      let b = s[g - l],
        v = B5 + Pm * g;
      (b.updateMatrixWorld(), e.fill(0, v, v + Pm));
      let x = m.setFromMatrixPosition(b.matrixWorld),
        y = b.isDirectionalLight || b.isSunLight;
      ((e[v] = x.x),
        (e[v + 1] = x.y),
        (e[v + 2] = x.z),
        (e[v + 3] = y ? 0 : b.distance || 0),
        (e[v + 4] = b.color.r * b.intensity),
        (e[v + 5] = b.color.g * b.intensity),
        (e[v + 6] = b.color.b * b.intensity),
        (e[v + 7] = 0),
        e[v + 3] > 0 || h++,
        (e[v + 15] =
          (b.decay ?? 2) +
          8 *
            (Math.min(999, Math.round((b.userData.mbNear || 0) * 100)) +
              (b.userData.mbLowBeam ? 1e3 : 0))),
        (e[v + 16] = -1),
        (e[v + 17] = -1));
      let M = b.shadow;
      ((e[v + 18] = M ? -(M.bias || 0) : 0),
        (e[v + 19] = (M && M.normalBias) || 0));
      let S = -1;
      if (y) {
        let w = b.isSunLight
          ? this._v2.copy(x).negate().normalize()
          : (b.target.updateMatrixWorld(),
            this._v2
              .setFromMatrixPosition(b.target.matrixWorld)
              .sub(x)
              .normalize());
        ((e[v + 8] = w.x),
          (e[v + 9] = w.y),
          (e[v + 10] = w.z),
          (e[v + 11] = -4));
      } else if (b.isSpotLight) {
        b.target.updateMatrixWorld();
        let w = this._v2
          .setFromMatrixPosition(b.target.matrixWorld)
          .sub(x)
          .normalize();
        ((e[v + 8] = w.x),
          (e[v + 9] = w.y),
          (e[v + 10] = w.z),
          (e[v + 11] = Math.cos(b.angle)),
          (e[v + 12] = Math.cos(b.angle * (1 - b.penumbra))));
        let _ = b.userData.mbStreetLamp;
        _
          ? ((e[v + 7] = Math.max(_.k, 1e-4)), (e[v + 14] = _.shield || 0))
          : b.userData.mbLowBeam &&
            (e[v + 14] = Math.tan(b.userData.mbBeamPitch || 0));
        let z = b.castShadow && p && f < QS,
          A = this.fullMat && b.map && u < H5;
        if (z || A) {
          let T = this._spotCam,
            E = x.clone(),
            R = w.clone();
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
            Math.abs(R.y) > 0.99 && T.up.set(1, 0, 0),
            T.lookAt(E.x + R.x, E.y + R.y, E.z + R.z),
            T.updateMatrixWorld(),
            T.updateProjectionMatrix());
          let P = new fe()
            .multiplyMatrices(Am, T.projectionMatrix)
            .multiply(T.matrixWorldInverse);
          if (
            (z &&
              ((S = f++),
              e.set(P.elements, 4 + 16 * S),
              this._spots.push({
                tile: S,
                vp: P,
                pos: E,
                key: `${E.toArray().map((C) => C.toFixed(4))}|${P.elements.slice(0, 12).map((C) => C.toFixed(4))}`,
              })),
            A)
          ) {
            let C = u++;
            (e.set(P.elements, OV + 16 * C),
              (e[v + 16] = C),
              this._spotMapReq.push({ layer: C, tex: b.map }));
          }
        }
      } else if (
        ((e[v + 8] = 0),
        (e[v + 9] = -1),
        (e[v + 10] = 0),
        (e[v + 11] = -2),
        (e[v + 12] = 0),
        this.fullMat && b.castShadow && p && d < _b)
      ) {
        let w = d++,
          _ = M?.camera?.near ?? 0.5,
          z = M?.camera?.far ?? 500,
          A = x.clone(),
          T = (this._pointCam ||= new Ji(90, 1, 0.5, 500));
        ((T.near = _),
          (T.far = z),
          (T.fov = 90),
          (T.aspect = 1),
          T.updateProjectionMatrix());
        let R = [
          [1, 0, 0, 0, -1, 0],
          [-1, 0, 0, 0, -1, 0],
          [0, 1, 0, 0, 0, 1],
          [0, -1, 0, 0, 0, -1],
          [0, 0, 1, 0, -1, 0],
          [0, 0, -1, 0, -1, 0],
        ].map(([P, C, I, L, F, O], B) => {
          (T.position.copy(A),
            T.up.set(L, F, O),
            T.lookAt(A.x + P, A.y + C, A.z + I),
            T.updateMatrixWorld());
          let H = new fe()
            .multiplyMatrices(Am, T.projectionMatrix)
            .multiply(T.matrixWorldInverse);
          return (e.set(H.elements, BV + 16 * (w * 6 + B)), H);
        });
        ((e[v + 17] = w), this._points.push({ idx: w, vps: R, pos: A }));
      }
      e[v + 13] = S;
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
          let [zt, kt] = this._pending;
          ((this._pending = null), this.render(zt, kt));
        }
      };
      if (((this._pending = [t, e]), !this.device)) {
        (this.ready ||= this.init().catch((zt) => this._useFallback(zt)))
          .then(ft)
          .catch((zt) => console.error(zt));
        return;
      }
      this._compiling ||
        (this._compiling = this.compileAsync(t)
          .then(ft)
          .catch((zt) => console.error(zt)));
      return;
    }
    let s = this.device,
      n = this.cpuSplit ? [performance.now()] : null;
    (t.matrixWorldAutoUpdate !== !1 && t.updateMatrixWorld(),
      e.parent === null &&
        e.matrixWorldAutoUpdate !== !1 &&
        e.updateMatrixWorld(),
      this._setupEnv(t));
    let i = this.neural?.manifest,
      a = this._vp
        .multiplyMatrices(Am, e.projectionMatrix)
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
      ((this._taaVPPrev = this._taaVPPrev || new fe()),
      (this._taaVP = this._taaVP || new fe()),
      this._taaVPPrev.copy(this._taaVP),
      this._taaVP.copy(a),
      c)
    ) {
      let ft = (this.info.render.frame % 8) + 1,
        zt = (qt, Et) => {
          let Me = 0,
            de = 1;
          for (; qt > 0;)
            ((de /= Et), (Me += de * (qt % Et)), (qt = Math.floor(qt / Et)));
          return Me;
        },
        kt = zt(ft, 2) - 0.5,
        Ft = zt(ft, 3) - 0.5;
      (a.premultiply(
        (this._jitM ||= new fe()).makeTranslation(
          (2 * kt) / this._W,
          (-2 * Ft) / this._H,
          0,
        ),
      ),
        (this._jit = [(2 * kt) / this._W, (-2 * Ft) / this._H]));
    } else this._jit = [0, 0];
    c || (this._taaReset = !0);
    let h = this._frameData;
    (AV(h, e.projectionMatrix),
      h.set(a.elements, 0),
      h.set(this._m.copy(a).invert().elements, 16),
      h.set(this._taaVP.elements, 192),
      h.set(this._taaVPPrev.elements, 208));
    {
      let ft = this.tubes || [],
        zt = Math.min(ft.length, kb),
        kt = 232,
        Ft = 0;
      for (let qt = 0; qt < zt; qt++) {
        let Et = ft[qt];
        Et.color[0] + Et.color[1] + Et.color[2] > 0 &&
          ((h[kt] = Et.a[0]),
          (h[kt + 1] = Et.a[1]),
          (h[kt + 2] = Et.a[2]),
          (h[kt + 3] = Et.radius),
          (h[kt + 4] = Et.b[0]),
          (h[kt + 5] = Et.b[1]),
          (h[kt + 6] = Et.b[2]),
          (h[kt + 7] = Et.noFloor ? 1 : 0),
          (h[kt + 8] = Et.color[0]),
          (h[kt + 9] = Et.color[1]),
          (h[kt + 10] = Et.color[2]),
          (h[kt + 11] = 0),
          (kt += 12),
          Ft++);
      }
      {
        let qt = this.carFrameInv || this.neuralFrameInv;
        h.set(qt ? qt.elements : Rut, 232 + kb * 12);
      }
      {
        let qt = 248 + kb * 12,
          Et = this.fogScatter,
          Me = (Wt) =>
            Wt <= 0.0031308
              ? Wt * 12.92
              : 1.055 * Math.pow(Wt, 1 / 2.4) - 0.055;
        if ((h.fill(0, qt, qt + 12), Et)) {
          for (let Wt = 0; Wt < 3; Wt++)
            ((h[qt + Wt] = Me(Et.sun[Wt])), (h[qt + 4 + Wt] = Me(Et.away[Wt])));
          ((h[qt + 3] = 1),
            (h[qt + 7] = Et.falloff ?? 0),
            (h[qt + 8] = Et.base ?? 0),
            (h[qt + 9] = Et.reach ?? 1500),
            (h[qt + 10] = Et.power ?? 3),
            (h[qt + 11] = Et.linear ?? 0));
        }
        let de = this._skyField,
          ze = this.skyVis || {};
        (h.fill(0, qt + 12, qt + 24),
          de &&
            (this._skyTex || this._skyBuf) &&
            ((h[qt + 12] = de.x0),
            (h[qt + 13] = de.z0),
            (h[qt + 14] = 1 / (de.w * de.cell)),
            (h[qt + 15] = 1 / (de.h * de.cell))),
          (h[qt + 16] = ze.strength ?? 1),
          (h[qt + 17] = ze.contrast ?? 1),
          (h[qt + 18] = ze.car ?? 0.8),
          (h[qt + 19] = ze.debug || 0),
          (h[qt + 20] = ze.floor ?? 0.25),
          (h[qt + 21] = this.neuralEnv ?? 1),
          (h[qt + 22] = this.coatFloor ?? 0),
          (h[qt + 23] = this.coatSat ?? 0));
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
    if (i?.sun) {
      let ft = i.sun.dir;
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
        zt = e.near ?? 0.1,
        kt = Math.tan(((e.fov ?? 50) * Math.PI) / 180 / 2),
        Ft = e.aspect || this._W / this._H,
        qt = [];
      for (let _s of [zt, ft])
        for (let on of [-1, 1])
          for (let fi of [-1, 1])
            qt.push(
              new dt(on * _s * kt * Ft, fi * _s * kt, -_s).applyMatrix4(
                e.matrixWorld,
              ),
            );
      let Et = ft * kt * Math.hypot(Ft, 1),
        Me = Math.min(
          ft,
          (ft * ft + Et * Et - zt * zt * (1 + kt * kt * (Ft * Ft + 1))) /
            (2 * (ft - zt)),
        ),
        de = new dt(0, 0, -Me).applyMatrix4(e.matrixWorld),
        ze = 0;
      for (let _s of qt) ze = Math.max(ze, _s.distanceTo(de));
      ze = Math.ceil(ze * 16) / 16;
      let Wt = u.dir.clone(),
        ke = new dt(0, 1, 0).cross(Wt);
      (ke.lengthSq() < 1e-6 && ke.set(1, 0, 0), ke.normalize());
      let As = Wt.clone().cross(ke),
        je = this.sunFitSlack ?? 0,
        gs = this._sunFit;
      if (
        je > 0 &&
        gs &&
        gs.dir.equals(Wt) &&
        gs.rad >= ze &&
        gs.rad <= ze * (1 + 2 * je) &&
        (() => {
          let _s = this._v2.copy(de).sub(gs.ctr),
            on = gs.rad - ze;
          return (
            Math.abs(_s.dot(ke)) <= on &&
            Math.abs(_s.dot(As)) <= on &&
            Math.abs(_s.dot(Wt)) <= on
          );
        })()
      )
        (de.copy(gs.ctr), (ze = gs.rad));
      else {
        ze = je > 0 ? Math.ceil(ze * (1 + je) * 16) / 16 : ze;
        let _s = (2 * ze) / this._shadowRes,
          on = Math.round(de.dot(ke) / _s) * _s,
          fi = Math.round(de.dot(As) / _s) * _s,
          co = de.dot(Wt);
        (de
          .copy(ke)
          .multiplyScalar(on)
          .addScaledVector(As, fi)
          .addScaledVector(Wt, co),
          (this._sunFit =
            je > 0 ? { ctr: de.clone(), rad: ze, dir: Wt.clone() } : null));
      }
      ((p.left = -ze),
        (p.right = ze),
        (p.top = ze),
        (p.bottom = -ze),
        (p.near = 0.05),
        (p.far = ze * 4),
        p.position.copy(de).addScaledVector(u.dir, ze * 2.5),
        p.up.copy(As),
        p.lookAt(de),
        p.updateMatrixWorld(),
        p.updateProjectionMatrix(),
        (this._shadowHalf = ze));
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
      .multiplyMatrices(Am, p.projectionMatrix)
      .multiply(p.matrixWorldInverse),
      h.set(this._lightVP.elements, 44),
      (h[60] = 1 / this._shadowRes),
      (h[61] = p.far - p.near),
      (h[62] = 1 / (2 * this._shadowHalf)),
      (h[63] = Math.tan(
        this.neural ? Tut : ((this.softShadowAngle ?? 0.6) * Math.PI) / 180,
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
    let v = ((e.fov || 50) * Math.PI) / 180,
      x = v / this._ph,
      y = i?.planar?.angles || [0, 1, 3, 9];
    for (let ft = 0; ft < 4; ft++)
      h[104 + ft] =
        y[ft] > 0
          ? Math.min(
              Math.max(Math.log2((y[ft] * Math.PI) / 180 / x), 0),
              this._planarLevels - 1,
            )
          : 0;
    (h.set(e.matrixWorldInverse.elements, 108),
      (h[124] = e.near || 0.05),
      (h[125] = Math.min(e.far || 100, 60)),
      (h[126] = Math.tan(v / 2)),
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
      i?.probeBox &&
        !this.noProbeBox &&
        (h.set(i.probeBox.min, 148),
        (h[151] = 1),
        h.set(i.probeBox.max, 152),
        h.set(i.probes?.[0]?.center_gltf || [0, 0, 0], 156)));
    let w = t.background?.userData?.mbLogBg;
    w && ((h[155] = w.k), (h[159] = Math.log2(1 + w.k * w.max)));
    let _ = this._lights(t),
      z =
        this.ssr === !0 ||
        (this.ssr !== !1 &&
          i?.output === "phys2" &&
          !i.probeBox &&
          (_.n > 0 || d));
    ((h[160] = z ? 1 : 0),
      (h[161] = this.ssrDistance ?? 4),
      (h[162] = 0.12),
      (h[163] = this.ssrStrength ?? 1));
    let A =
      d &&
      u.intensity > 0 &&
      i?.sun &&
      this._bounceFloor &&
      this.groundBounce !== !1;
    ((h[164] = A
      ? this._bounceFloor.albedo *
        (Math.max(u.dir.y, 0) - Math.max(i.sun.dir[1], 0))
      : 0),
      (h[165] = A ? 1 : 0),
      (h[166] = this.glints === !1 ? 1 : 0),
      (h[167] = this.sunGlints === !1 ? 1 : 0));
    let T = d && u.intensity > 0 && !!i?.sun,
      E =
        this.floorReflection !== !1 &&
        (_.n > 0 || T) &&
        i?.output === "phys2" &&
        !i.probeBox
          ? this._bounceFloor
          : null;
    ((h[168] = E ? E.albedo * E.color.r : 0),
      (h[169] = E ? E.albedo * E.color.g : 0),
      (h[170] = E ? E.albedo * E.color.b : 0),
      (h[171] = E ? E.y : 0),
      (h[172] = i?.sun?.dir[0] || 0),
      (h[173] = i?.sun?.dir[1] || 0),
      (h[174] = i?.sun?.dir[2] || 0),
      (h[175] = E && T && this.floorSunSwap !== !1 ? 1 : 0));
    let R = [],
      P = [],
      C = [],
      I = [],
      L = [],
      F = [],
      O = [],
      B = [],
      H = [],
      N = [],
      D = [],
      U = [],
      G = this._objData,
      W = 0,
      V = 0,
      $ = 0,
      J = 0,
      X = null,
      tt = null,
      Z = i?.surfaces || {},
      q = i?.dynProbes?.length || 6,
      j = u.intensity > 0 && this._sunShadowOn,
      K = this._spots.length > 0 || this._points?.length > 0,
      nt = !this.neural && this.earlyCull !== !1,
      Q = new Map(),
      et = null;
    if (nt && this._mirrorY0 != null) {
      let ft = (this._mirrorM ||= new fe()),
        zt = (this._mirrorR ||= new fe());
      zt.set(1, 0, 0, 0, 0, -1, 0, 2 * this._mirrorY0, 0, 0, 1, 0, 0, 0, 0, 1);
      let kt = (this._mirrorF ||= new qo());
      (kt.setFromProjectionMatrix(
        ft
          .multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)
          .multiply(zt),
      ),
        (et = { f: kt, rf: this._mirrorRF || null }));
    }
    if (j) {
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
          W < yb &&
          ft.layers.test(e.layers)
        ) {
          W = this._billboard(ft, t, e, W, C);
          return;
        }
        if (!(ft.isMesh || ft.isLine) || W >= yb || !ft.layers.test(e.layers))
          return;
        if (ft.isSky) {
          X = ft;
          return;
        }
        if (ft.isWater) {
          tt = ft;
          return;
        }
        let zt = Array.isArray(ft.material) ? ft.material[0] : ft.material;
        if (!zt || zt.visible === !1 || ft.geometry?.drawRange.count === 0)
          return;
        if (zt.isShaderMaterial) {
          U.push(ft);
          return;
        }
        ft.onBeforeRender(this, t, e, ft.geometry, zt, null);
        let kt = ft.geometry,
          Ft = this._meshInfo(ft),
          qt = !1;
        if (
          nt &&
          !Ft &&
          ft.frustumCulled !== !1 &&
          !ft.isSkinnedMesh &&
          ft.userData.dynamic !== !0 &&
          !(ft.morphTargetInfluences?.length && kt.morphAttributes?.position)
        ) {
          let Os = this._sphere;
          if (((qt = !0), ft.isInstancedMesh)) {
            if (ft.count === 0) return;
            (ft.boundingSphere || ft.computeBoundingSphere(),
              Os.copy(ft.boundingSphere));
          } else
            (kt.boundingSphere || kt.computeBoundingSphere(),
              Os.copy(kt.boundingSphere));
          if (
            (Os.applyMatrix4(ft.matrixWorld),
            !this._frustum.intersectsSphere(Os))
          ) {
            let fs =
                ft.castShadow === !0 &&
                this.shadowMap.enabled !== !1 &&
                (K || (j && this._inSunBox(Os))),
              Ts =
                !fs &&
                !ft.userData.mbNoReflect &&
                (!et ||
                  (et.f.intersectsSphere(Os) &&
                    (!et.rf ||
                      et.rf(
                        Os.center.x,
                        Os.center.y,
                        Os.center.z,
                        Os.radius,
                        e,
                      ))));
            if (!fs && !Ts) return;
          }
        }
        let Et = this._geometry(kt, this._uvName(ft), this._lmName(ft));
        ft.morphTargetInfluences &&
          kt.morphAttributes?.position &&
          (Et = this._morphed(ft, Et));
        let Me = !!(ft.isSkinnedMesh && Et.joints && ft.skeleton),
          de = !!(
            ft.morphTargetInfluences?.length && kt.morphAttributes?.position
          ),
          ze = !!Ft?.dynamic || Me || de || ft.userData.dynamic === !0,
          Wt = Ft ? Z[ft.name] || Z[ft.name.replace(/_\d+$/, "")] : null,
          ke =
            Wt === "planar" || (!Ft && ft.userData.mbPlanar)
              ? 1
              : Wt === "glass"
                ? 2
                : Wt === "thinglass"
                  ? 3
                  : 0,
          As = this._slotOf(ft, 0);
        if (As < 0) return;
        let je = (As * ur) / 4;
        if (
          (G.fill(0, je + 72, je + 76),
          ft.userData.mbThin && (G[je + 74] = +ft.userData.mbThin),
          Me)
        ) {
          let Os = ft.skeleton;
          Os.update();
          let fs = Os.bones.length;
          if (J + fs <= wb) {
            for (let Gs = 0; Gs < fs; Gs++)
              (this._m
                .fromArray(Os.boneMatrices, Gs * 16)
                .multiply(ft.bindMatrix),
                this._boneData.set(this._m.elements, (J + Gs) * 16));
            this._prevBones ||= new WeakMap();
            let Vi = this._boneData.subarray(J * 16, (J + fs) * 16),
              Si = this._prevBones.get(ft);
            (this._boneDataPrev.set(
              Si && Si.length === Vi.length ? Si : Vi,
              J * 16,
            ),
              this._prevBones.set(ft, Vi.slice()),
              (G[je + 72] = 1),
              (G[je + 73] = J),
              (J += fs));
          }
          if (!ft.userData._mbSphere) {
            ft.computeBoundingSphere();
            let Vi = ft.boundingSphere.clone().applyMatrix4(ft.matrixWorld);
            ft.userData._mbSphere = {
              off: Vi.center.sub(
                this._v.setFromMatrixPosition(Os.bones[0].matrixWorld),
              ),
              r: Vi.radius * 1.15,
            };
          }
          let Ts = ft.userData._mbSphere;
          (this._sphere.center
            .setFromMatrixPosition(Os.bones[0].matrixWorld)
            .add(Ts.off),
            (this._sphere.radius = Ts.r));
        } else
          qt ||
            (ft.isInstancedMesh
              ? (ft.boundingSphere || ft.computeBoundingSphere(),
                this._sphere
                  .copy(ft.boundingSphere)
                  .applyMatrix4(ft.matrixWorld))
              : this._sphere
                  .copy(kt.boundingSphere)
                  .applyMatrix4(ft.matrixWorld));
        if (
          (ze &&
            (this._dynS ||= []).push(
              this._sphere.center.x,
              this._sphere.center.y,
              this._sphere.center.z,
              this._sphere.radius,
            ),
          ze && $ < 4 && this.neural)
        ) {
          let Os = ft.skeleton || ft;
          if (
            ((!this._occSeen ||
              this._occSeen.frame !== this.info.render.frame) &&
              (this._occSeen = {
                frame: this.info.render.frame,
                set: new Set(),
              }),
            !this._occSeen.set.has(Os))
          ) {
            this._occSeen.set.add(Os);
            let fs = 64 + 4 * $++;
            ((h[fs] = this._sphere.center.x),
              (h[fs + 1] = this._sphere.center.y - this._sphere.radius * 0.25),
              (h[fs + 2] = this._sphere.center.z),
              (h[fs + 3] = this._sphere.radius * 0.55));
          }
        }
        let gs = ft.matrixWorld.elements,
          _s = ft[EV],
          on =
            Me || !!(ft.morphTargetInfluences && kt.morphAttributes?.position),
          fi = !_s,
          co = !_s,
          I0 = co;
        if (_s) {
          let Os = _s.m;
          for (let fs = 0; fs < 16; fs++) {
            let Ts = Os[fs] - gs[fs];
            if (Ts !== 0 && ((I0 = !0), Math.abs(Ts) > 1e-6)) {
              fi = !0;
              break;
            }
          }
          on ||= fi;
        } else
          _s = ft[EV] = {
            m: new Float32Array(16),
            n: new Float32Array(16),
            det: !1,
          };
        let Ld = Array.isArray(ft.material) ? ft.material : null,
          wa =
            Ld && kt.groups.length
              ? kt.groups
                  .map((Os) => ({
                    mat: Ld[Os.materialIndex],
                    range: [Os.start, Os.count],
                  }))
                  .filter((Os) => Os.mat && Os.mat.visible !== !1)
              : (this._part1 ||= [{ mat: null, range: null }]);
        if (
          (wa === this._part1 && (wa[0].mat = Ld ? Ld[0] : ft.material),
          !wa.length)
        )
          return;
        let Zt = wa[0].mat,
          Mn = Ft && this._detailOf(ft),
          fl = ft.isInstancedMesh ? this._instances(ft) : null;
        if (fl && fl.count === 0) return;
        let ho = ft[O5],
          F0 = !Ft && !Mn && !i && !Me && !on;
        fi && (_s.det = ft.matrixWorld.determinant() < 0);
        let Oc =
            F0 &&
            !I0 &&
            ho.still === !0 &&
            ho.np === wa.length &&
            this.cleanSlots !== !1,
          U4 =
            (ze ? 1 : 0) |
            (ft.isInstancedMesh && ft.instanceColor ? 4 : 0) |
            (kt.attributes.normal ? 0 : 8) |
            (this.neural || ft.receiveShadow ? 16 : 0) |
            (_s.det ? 128 : 0) |
            (ft.isPoints || ft.isSprite ? 256 : 0),
          Ne = (Os) =>
            U4 |
            ((Os.vertexColors || Os.userData?.mbScuff) && Et.color ? 2 : 0) |
            (Os.flatShading ? 8 : 0) |
            (Os.side === 1 ? 32 : Os.side === 2 ? 64 : 0);
        if (Oc)
          for (let Os = 0; Os < wa.length; Os++) {
            let fs = wa[Os].mat,
              Ts = Os ? this._slotOf(ft, Os) : As,
              Vi = this._matBlock(fs, ft, Et, t, i, Q);
            if (
              Ts < 0 ||
              ho.ws[Os] !== Ts ||
              ho.mm[Os] !== fs ||
              ho.ms[Os] !== Vi.stamp ||
              ho.fk[Os] !== Ne(fs)
            ) {
              Oc = !1;
              break;
            }
          }
        let ui = Oc && this.slotCheck,
          di = null;
        if (ui) {
          ((di = this._slotChk ||= []), (di.length = 0));
          for (let Os = 0; Os < wa.length; Os++) {
            let fs = Os ? this._slotOf(ft, Os) : As;
            di.push(fs, G.slice((fs * ur) / 4, ((fs + 1) * ur) / 4));
          }
        }
        let Gh;
        if (Oc && !ui) Gh = this._matBlock(Zt, ft, Et, t, i, Q).group;
        else {
          (G.set(gs, je),
            G.set(co ? gs : _s.m, je + 140),
            fi &&
              (_s.n.set(
                this._nm.copy(ft.matrixWorld).invert().transpose().elements,
              ),
              _s.m.set(gs)),
            G.set(_s.n, je + 16),
            (G[je + 156] = on ? 1 : 0),
            (G[je + 32] = Ft ? Ft.layer : 0),
            (G[je + 33] = ze ? 1 : 0),
            (G[je + 34] = 0),
            (G[je + 35] =
              Wt === "coat" ? 4 : Wt === "metal" ? 5 : Wt === "tire" ? 6 : ke),
            (Gh = this._fillMatMemo(G, je, Zt, ft, Et, t, Ft, i, Mn, Q)));
          let Os = (Ft && Ft.probe) || 0,
            fs = Os,
            Ts = 0;
          if (ze && Ft && i?.dynProbes) {
            let Po = i.path,
              B0 = this._sphere.center,
              Vh =
                ((Math.atan2(
                  (-B0.z - Po.center[1]) / Po.radii[1],
                  (B0.x - Po.center[0]) / Po.radii[0],
                ) +
                  2 * Math.PI) %
                  (2 * Math.PI)) /
                ((2 * Math.PI) / q),
              $l = Math.floor(Vh) % q;
            ((Os = i.dynProbes[$l]),
              (fs = i.dynProbes[($l + 1) % q]),
              (Ts = Vh - Math.floor(Vh)));
          }
          let Vi = i?.probes?.[Os],
            Si = i?.probes?.[fs];
          ((G[je + 34] = Ts),
            (G[je + 48] = Vi ? Vi.center_gltf[0] : 0),
            (G[je + 49] = Vi ? Vi.center_gltf[1] : 0),
            (G[je + 50] = Vi ? Vi.center_gltf[2] : 0),
            (G[je + 51] = Os),
            (G[je + 52] = Si ? Si.center_gltf[0] : 0),
            (G[je + 53] = Si ? Si.center_gltf[1] : 0),
            (G[je + 54] = Si ? Si.center_gltf[2] : 0),
            (G[je + 55] = fs));
          let Gs = i?.proxies?.[ft.name];
          if ((G.fill(0, je + 56, je + 72), Gs)) {
            ((G[je + 56] = Gs.center_gltf[0]),
              (G[je + 57] = Gs.center_gltf[1]),
              (G[je + 58] = Gs.center_gltf[2]),
              (G[je + 59] = 1));
            for (let Po = 0; Po < 3; Po++)
              (G.set(Gs.axes_gltf[Po], je + 60 + 4 * Po),
                (G[je + 63 + 4 * Po] = Gs.half[Po]));
          }
          if (
            (this._dirtyS.push(As),
            (ho.still = !I0 && F0),
            (ho.np = wa.length),
            (ho.ws.length = ho.mm.length = ho.ms.length = ho.fk.length = 0),
            F0)
          ) {
            let Po = this._matBlock(Zt, ft, Et, t, i, Q);
            ((ho.ws[0] = As),
              (ho.mm[0] = Zt),
              (ho.ms[0] = Po.stamp),
              (ho.fk[0] = Ne(Zt)));
          }
        }
        let E1 = !(
            ft.frustumCulled !== !1 &&
            !this._frustum.intersectsSphere(this._sphere)
          ),
          O0 = this.neural
            ? ft.castShadow !== !1
            : ft.castShadow === !0 && this.shadowMap.enabled !== !1;
        for (let Os = 0; Os < wa.length && W < yb; Os++) {
          let fs = wa[Os].mat,
            Ts = Gh,
            Vi = As;
          if (Os > 0) {
            if (((Vi = this._slotOf(ft, Os)), Vi < 0)) break;
            if (Oc && !ui) Ts = this._matBlock(fs, ft, Et, t, i, Q).group;
            else {
              let Po = (Vi * ur) / 4;
              if (
                (G.copyWithin(Po, je, je + ur / 4),
                (Ts = this._fillMatMemo(G, Po, fs, ft, Et, t, Ft, i, Mn, Q)),
                this._dirtyS.push(Vi),
                F0 && ho.still !== void 0)
              ) {
                let B0 = this._matBlock(fs, ft, Et, t, i, Q);
                ((ho.ws[Os] = Vi),
                  (ho.mm[Os] = fs),
                  (ho.ms[Os] = B0.stamp),
                  (ho.fk[Os] = Ne(fs)));
              }
            }
          }
          let Si =
              (!!fs.transparent ||
                (!Ft && (fs.blending === 2 || fs.blending === 4))) &&
              ke < 2,
            Gs = (this._drPool[this._drN++] ||= {});
          ((Gs.rec = Et),
            (Gs.nm = !!Ft),
            (Gs.slot = Vi),
            (Gs.surf = ke),
            (Gs.mat = Ts),
            (Gs.inst = fl),
            (Gs.ro = ft.renderOrder || 0),
            (Gs.gr = ft.userData.mbGround ? 1 : 0),
            (Gs.hook = (!Ft && fs.userData?.mbAlbedo) || null),
            (Gs.range = wa[Os].range),
            (Gs.moving = G[je + 156] > 0.5 || !!fl?.prevBuf),
            (Gs.lean =
              !Ft &&
              !Me &&
              !Et.joints &&
              !((fs.vertexColors || fs.userData?.mbScuff) && Et.color)),
            (Gs.at = (fs.alphaTest || 0) > 0 && !!(fs.map || fs.alphaMap)),
            (Gs.po = !Ft && !!fs.polygonOffset),
            (Gs.pb = Number.isFinite(fs.polygonOffsetUnits)
              ? Math.max(
                  -2147483648,
                  Math.min(2147483647, Math.round(fs.polygonOffsetUnits)),
                )
              : 0),
            (Gs.ps = Number.isFinite(fs.polygonOffsetFactor)
              ? fs.polygonOffsetFactor
              : 0),
            (Gs.pw = fs.depthWrite !== !1),
            (Gs.blend = Si
              ? fs.blending === 2
                ? "add0"
                : fs.blending === 4
                  ? "mul0"
                  : "alpha" + (fs.depthWrite ? "1" : "0")
              : null),
            (Gs.line = ft.isLine
              ? ft.isLineSegments
                ? "seg"
                : ft.isLineLoop
                  ? "loop"
                  : "strip"
              : fs.wireframe && !Ft
                ? "wire"
                : null),
            (Gs.o3 = ft),
            (Gs.sx =
              Gs.sy =
              Gs.sz =
              Gs.sr =
              Gs.cx =
              Gs.cy =
              Gs.cz =
              Gs.cr =
              Gs.depth =
                void 0),
            O0 &&
            ke < 2 &&
            !Si &&
            !Gs.line &&
            (ze || K || !nt || (j && this._inSunBox(this._sphere)))
              ? ((ft.userData.mbNearShadow ? B : ze ? O : F).push(Gs),
                (Gs.sx = this._sphere.center.x),
                (Gs.sy = this._sphere.center.y),
                (Gs.sz = this._sphere.center.z),
                (Gs.sr = this._sphere.radius))
              : ke === 3 &&
                this.glassShadows !== !1 &&
                ft.castShadow !== !1 &&
                N.push(Gs),
            ke !== 1 &&
              !Si &&
              !Gs.line &&
              !ft.userData.mbNoReflect &&
              !ft.userData.mbShadowOnly &&
              (L.push(Gs),
              (Gs.cx = this._sphere.center.x),
              (Gs.cy = this._sphere.center.y),
              (Gs.cz = this._sphere.center.z),
              (Gs.cr = this._sphere.radius)),
            W++,
            !(!E1 || ft.userData.mbShadowOnly) &&
              (Si
                ? ((Gs.depth = this._v
                    .copy(this._sphere.center)
                    .applyMatrix4(e.matrixWorldInverse).z),
                  C.push(Gs))
                : Gs.line
                  ? H.push(Gs)
                  : ((ke >= 2 || (!Ft && (fs.transmission || 0) > 0)
                      ? P
                      : R
                    ).push(Gs),
                    ke === 1 && I.push(Gs)),
              (V +=
                ((Gs.range ? Gs.range[1] : Et.count) / 3) *
                (fl ? fl.count : 1))));
        }
        if (di)
          for (let Os = 0; Os < di.length; Os += 2) {
            let fs = di[Os],
              Ts = di[Os + 1],
              Vi = (fs * ur) / 4;
            for (let Si = 0; Si < Ts.length; Si++)
              if (
                Ts[Si] !== G[Vi + Si] &&
                !(Ts[Si] !== Ts[Si] && G[Vi + Si] !== G[Vi + Si])
              ) {
                let Gs = this.info;
                ((Gs.slotMismatch = (Gs.slotMismatch || 0) + 1),
                  Gs.slotMismatch <= 3 &&
                    console.error(
                      "clean slot mismatch",
                      ft.name || ft.type,
                      "float",
                      Si,
                      Ts[Si],
                      G[Vi + Si],
                    ));
                break;
              }
          }
      }),
      this._slotEnd(),
      n?.push(performance.now()));
    let st =
        !this._scissorTest &&
        (!this._viewport ||
          (this._viewport[0] === 0 &&
            this._viewport[1] === 0 &&
            this._viewport[2] >= this.width &&
            this._viewport[3] >= this.height)),
      ot =
        this.fullMat &&
        this.samples === 1 &&
        (!this.neural || this.enhanceNeural) &&
        this.enhance !== !1 &&
        st &&
        !r;
    if (
      ot &&
      R.length &&
      (!this._sceneDepth || this.info.render.frame % 8 === 0)
    ) {
      let ft = Math.max(1, Math.floor(R.length / 256)),
        zt = [];
      for (let kt = 0; kt < R.length; kt += ft) {
        let Ft = R[kt],
          qt = Ft.o3.geometry.boundingSphere,
          Et = qt
            ? -this._v
                .copy(qt.center)
                .applyMatrix4(Ft.o3.matrixWorld)
                .applyMatrix4(e.matrixWorldInverse).z
            : 0;
        Et > 0 && zt.push(Et);
      }
      (zt.sort((kt, Ft) => kt - Ft),
        (this._sceneDepth = zt.length ? zt[zt.length >> 1] : 5));
    }
    let rt = this._sceneDepth || 5;
    ((h[188] = ot && this.ao !== !1 ? 1 : 0),
      (h[189] = ot && this.ssr !== !1 ? 1 : 0),
      (h[190] =
        ot && this.specularAA !== !1
          ? +this.specularAA > 0
            ? +this.specularAA
            : 1
          : 0),
      (h[191] = this.aoDebug ? (this.aoDebug === 2 ? 2 : 1) : 0),
      ot &&
        !(h[160] > 0) &&
        ((h[161] = this.ssrDistance ?? rt * 0.9),
        (h[162] = this.ssrThickness ?? rt * 0.03),
        (h[163] = this.ssrStrength ?? 1)),
      (h[176] = this.glassTransmittance ?? 0.67),
      (h[177] = N.length && u.intensity > 0 ? 1 : 0),
      (h[178] = N.length && this._spots.length ? 1 : 0),
      (h[179] = i?.glassBackfaceTIR ? 1 : 0));
    let lt = null;
    (X &&
      !tt &&
      !this.physicalSky &&
      (X.visible !== !1 &&
        X.layers.test(e.layers) &&
        (this.pPreetham && X.material?.uniforms?.sunPosition
          ? (lt = X)
          : U.push(X)),
      (X = null)),
      this._so?.failed &&
        ((this._so = null),
        this._soQuality === "mobile"
          ? ((this.oceanFailed = !0), this.onOceanFailed?.())
          : (this._soQuality = "mobile")),
      (X || tt) &&
        !this._so &&
        !this.oceanFailed &&
        (this._so = new VS(this, {
          quality: (this._soQuality ||=
            this.oceanQuality ||
            (this.maxBloomLevels < 6 ? "mobile" : "desktop")),
        })));
    let ht = (X || tt) && this._so?.isReady ? this._so : null;
    D.length && !this._vfx && (this._vfx = new $S(this, PV));
    let pt = D.length && this._vfx?.ready ? this._vfx : null;
    (pt &&
      pt.frame(D, {
        camera: e,
        scene: t,
        sun: u,
        skyOcean: ht && X ? ht : null,
        sky: X,
        W: this._W,
        H: this._H,
        envOn: !!(this.neural || this._envPrior),
      }),
      (this._skyActive = !!(ht && X)));
    let ut = I.find((ft) => !ft.nm) || null,
      it = !ut && !!(ht && tt && L.length),
      at = (I.length > 0 || it) && this.planarEnabled !== !1;
    if (this.bounceFloor) this._bounceFloor = this.bounceFloor;
    else if (I.length && !this._bounceFloor) {
      let ft = I[0].o3?.material,
        zt = ft?.color || new It(0.5, 0.5, 0.5),
        kt = 0.2126 * zt.r + 0.7152 * zt.g + 0.0722 * zt.b;
      this._bounceFloor = {
        y: i?.planar?.y ?? 0,
        albedo: Math.min(Math.max(kt, 0.05), 0.9),
        color: new It(
          zt.r / Math.max(kt, 0.001),
          zt.g / Math.max(kt, 0.001),
          zt.b / Math.max(kt, 0.001),
        ),
      };
    }
    (this._fitDynShadow(h, u, e), (h[102] = at ? 1 : 0));
    let yt = this._frameRefl;
    if (at) {
      let ft = ut?.o3.matrixWorld.elements,
        zt = ut ? ft[13] : it ? tt.position.y : (i?.planar?.y ?? 0);
      this._refl.set(1, 0, 0, 0, 0, -1, 0, 2 * zt, 0, 0, 1, 0, 0, 0, 0, 1);
      let kt = e.projectionMatrix;
      if (ut) {
        let Ft = +ut.o3.userData.mbPlanar.r || 20,
          qt = ft[12],
          Et = ft[14];
        this._studioRF = (Me, de, ze, Wt) =>
          Wt < Ft &&
          (Me - qt) * (Me - qt) + (ze - Et) * (ze - Et) < Ft * Ft &&
          de > zt - 0.5 &&
          de - Wt < zt + Ft;
      }
      if (
        ((this._mirrorY0 = zt),
        (this._mirrorWater = it),
        (this._mirrorRF = ut ? this._studioRF : it ? this.reflectFilter : null),
        it || ut)
      ) {
        let Ft = (this._projO ||= new fe()).copy(kt),
          qt = Ft.elements,
          Et = e.matrixWorldInverse.elements,
          Me = zt - (ut ? 0.005 : 0.15),
          de = -Et[4],
          ze = -Et[5],
          Wt = -Et[6],
          ke = Me,
          As = ke - (de * Et[12] + ze * Et[13] + Wt * Et[14]),
          je = [de, ze, Wt, As],
          gs = [
            (Math.sign(je[0]) + qt[8]) / qt[0],
            (Math.sign(je[1]) + qt[9]) / qt[5],
            -1,
            (1 + qt[10]) / qt[14],
          ],
          _s =
            2 / (je[0] * gs[0] + je[1] * gs[1] + je[2] * gs[2] + je[3] * gs[3]);
        ((qt[2] = je[0] * _s),
          (qt[6] = je[1] * _s),
          (qt[10] = je[2] * _s + 1),
          (qt[14] = je[3] * _s),
          (kt = Ft));
      }
      (this._vpR
        .multiplyMatrices(Am, kt)
        .multiply(e.matrixWorldInverse)
        .multiply(this._refl),
        yt.set(h),
        yt.set(this._vpR.elements, 0),
        yt.set(this._m.copy(this._vpR).invert().elements, 16),
        AV(yt, kt),
        (yt[33] = 2 * zt - f[13]),
        (yt[42] = 1));
    }
    if (W) {
      let ft = this._dirtyS,
        zt = this._slots.top,
        kt = ur / 4;
      if (ft.length * 2 > zt)
        s.queue.writeBuffer(this.objBuf, 0, G, 0, zt * kt);
      else if (ft.length) {
        ft.sort((Et, Me) => Et - Me);
        let Ft = ft[0],
          qt = Ft;
        for (let Et = 1; Et <= ft.length; Et++) {
          let Me = ft[Et];
          if (Me === qt || Me === qt + 1) {
            qt = Me;
            continue;
          }
          (s.queue.writeBuffer(
            this.objBuf,
            Ft * ur,
            G,
            Ft * kt,
            (qt - Ft + 1) * kt,
          ),
            (Ft = qt = Me));
        }
      }
      ((this.info.slotsWritten = ft.length), (this.info.slotsTop = zt));
    }
    (J &&
      (s.queue.writeBuffer(this.boneBuf, 0, this._boneData, 0, J * 16),
      s.queue.writeBuffer(this.boneBufPrev, 0, this._boneDataPrev, 0, J * 16)),
      s.queue.writeBuffer(
        this.lightBuf,
        0,
        this._lightData,
        0,
        B5 + Pm * Math.max(_.n, 1),
      ));
    let vt = !1,
      At =
        _.n > 0 &&
        i?.output === "phys2" &&
        (i?.dynProbe === !0 || this.dynamicProbe === !0);
    At && !this._dyn && (this._dynNeeded = !0);
    let Ut =
      At &&
      !!this._dyn &&
      !!this.pDynPrefilter &&
      !!this.pNeuralLin &&
      !!this.pStandardLin &&
      !!this.pMip;
    if (Ut) {
      let ft = Array.from(this._lightData.subarray(0, B5 + Pm * _.n), (zt) =>
        zt.toFixed(3),
      ).join(",");
      if (ft !== this._dyn.key) {
        ((vt = !0), (this._dyn.key = ft));
        let zt = this._dyn,
          kt = zt.frame;
        zt.vps.forEach((Ft, qt) => {
          (kt.set(h),
            kt.set(Ft.elements, 0),
            kt.set(this._m.copy(Ft).invert().elements, 16),
            (kt[N5 + 2] = 0),
            (kt[32] = zt.c.x),
            (kt[33] = zt.c.y),
            (kt[34] = zt.c.z),
            (kt[39] = 0),
            (kt[40] = 0),
            (kt[42] = 1),
            (kt[102] = 0),
            (kt[103] = 0),
            s.queue.writeBuffer(zt.fb[qt], 0, kt));
        });
      }
    }
    h[103] = Ut ? 1 : 0;
    let Pt =
        !!this.smMove &&
        this.moverShadows !== !1 &&
        u.intensity > 0 &&
        this._sunShadowOn
          ? F.filter((ft) => ft.o3.userData.mbMover)
          : [],
      Vt = Pt.length ? F.filter((ft) => !ft.o3.userData.mbMover) : F,
      Kt = this._nearOn ? Pt.filter((ft) => !this._inNearCore(ft)) : Pt;
    ((h[484] = Kt.length ? 2 / this._shadowRes : 0),
      (h[485] = this.shadowTaps ?? 32),
      (h[486] = this.carWet ?? 0),
      (h[487] = this.carWarm ?? 0),
      s.queue.writeBuffer(this.frameBuf, 0, h),
      at && s.queue.writeBuffer(this.frameBufRefl, 0, yt),
      n?.push(performance.now()));
    let ue = s.createCommandEncoder(),
      ne = !0,
      jt = this.profile && this.hasTimestamps,
      be = [],
      re = this.hasTimestamps && (jt || this.info.render.frame % 16 === 0),
      ds = () => {
        if (!(jt || !ne || !re))
          return (
            (ne = !1),
            { querySet: this.qset, beginningOfPassWriteIndex: 0 }
          );
      },
      Nt = (ft, zt = !0, kt = !0) => {
        if (!jt || (zt && be.length >= 24)) return;
        zt && be.push(ft);
        let Ft = be.length - 1;
        if (!(!zt && !kt))
          return {
            querySet: this.qset,
            ...(zt ? { beginningOfPassWriteIndex: 2 * Ft } : {}),
            ...(kt ? { endOfPassWriteIndex: 2 * Ft + 1 } : {}),
          };
      },
      $e = (ft, zt) =>
        ue.beginRenderPass({
          colorAttachments: [],
          timestampWrites: jt && zt && this.profileShadows ? Nt(zt) : ds(),
          depthStencilAttachment: {
            view: ft.createView(),
            depthLoadOp: "clear",
            depthStoreOp: "store",
            depthClearValue: 1,
          },
        }),
      ve = (ft) => {
        let zt = ft.length;
        for (let kt of ft)
          zt =
            (Math.imul(zt, 31) +
              this._uid(kt.o3) * 7919 +
              this._uid(kt.rec) +
              (kt.inst
                ? kt.o3.instanceMatrix.version * 131 + kt.inst.count
                : 0)) |
            0;
        return zt;
      },
      as = "",
      Se = ve(Vt);
    (this.neural ||
      (Vt.some((ft) => ft.moving) &&
        (this._casterEpoch = (this._casterEpoch || 0) + 1),
      (as = String(this._casterEpoch || 0))),
      this.shadowEpoch && (as += "|" + this.shadowEpoch));
    let Fe = F,
      xe = [],
      He = Se,
      ms = as;
    if (
      (this._spots.length &&
        F.some((ft) => ft.o3.userData.mbMover) &&
        ((Fe = F.filter((ft) => !ft.o3.userData.mbMover)),
        (xe = F.filter((ft) => ft.o3.userData.mbMover)),
        Fe.length !== Vt.length &&
          ((He = ve(Fe)),
          this.neural ||
            (Fe.some((ft) => ft.moving) &&
              (this._spotEpoch = (this._spotEpoch || 0) + 1),
            (ms =
              String(this._spotEpoch || 0) +
              (this.shadowEpoch ? "|" + this.shadowEpoch : ""))))),
      u.intensity > 0 && this._sunShadowOn)
    ) {
      let ft = `${this._lightVP.elements.map((Et) => Et.toFixed(5)).join(",")}|${Se}|${as}`,
        zt = (Et, Me, de = this.frameGroup) => {
          let ze = $e(Et, Et === this.smStatic ? "sun shadow" : "near shadow");
          if (
            Me.length &&
            Et === this.smDyn &&
            this.renderBundles !== !1 &&
            !this.neural
          ) {
            let Wt = this._ops();
            (this._casterOps(
              Wt,
              Me,
              this.pShadow,
              this.pShadowA,
              this.pShadowZ,
            ),
              Wt.n &&
                this._runBundles(ze, "near", Wt, de, null, {
                  colorFormats: [],
                  depthStencilFormat: Et.format,
                }));
          } else
            Me.length &&
              (ze.setBindGroup(0, de),
              this._drawCasters(
                ze,
                Me,
                this.pShadow,
                this.pShadowA,
                this.pShadowZ,
              ));
          ze.end();
        },
        kt =
          this._staticSunKey &&
          this._staticSunKey.slice(0, this._staticSunKey.indexOf("|")) ===
            ft.slice(0, ft.indexOf("|")),
        Ft = performance.now(),
        qt =
          ft !== this._staticSunKey &&
          kt &&
          this.sunCacheMs > 0 &&
          Ft - (this._sunDrawT || 0) < this.sunCacheMs;
      if (ft !== this._staticSunKey && !qt) {
        if (((this._sunDrawT = Ft), this.sunKeyLog)) {
          let Me = this._staticSunKey?.split("|") || [],
            de = ft.split("|"),
            ze = Vt.filter((Wt) => Wt.moving)
              .slice(0, 4)
              .map((Wt) => Wt.o3.name || Wt.o3.parent?.name || Wt.o3.type);
          this.sunKeyLog.push(
            [
              Me[0] !== de[0] ? "vp" : "",
              Me[1] !== de[1] ? "set" : "",
              Me.slice(2).join("|") !== de.slice(2).join("|")
                ? "move:" +
                  ze.join(",") +
                  (this.shadowEpoch ? " ep" + this.shadowEpoch : "")
                : "",
            ]
              .filter(Boolean)
              .join(" "),
          );
        }
        zt(this.smStatic, Vt);
        let Et = ue.beginRenderPass({
          colorAttachments: [
            {
              view: this._glassTView[0],
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 1, g: 1, b: 1, a: 1 },
            },
          ],
        });
        (N.length &&
          this.pGlassTSun &&
          (Et.setPipeline(this.pGlassTSun),
          Et.setBindGroup(0, this.frameGroup),
          this._drawList(Et, N, !0)),
          Et.end(),
          (this._staticSunKey = ft));
      }
      if (Kt.length) {
        let Et = $e(this.smMove, "movers shadow");
        if (this.renderBundles !== !1 && !this.neural) {
          let Me = this._ops();
          (this._casterOps(Me, Kt, this.pShadow, this.pShadowA, this.pShadowZ),
            Me.n &&
              this._runBundles(Et, "movers", Me, this.frameGroup, null, {
                colorFormats: [],
                depthStencilFormat: this.smMove.format,
              }));
        } else
          (Et.setBindGroup(0, this.frameGroup),
            this._drawCasters(
              Et,
              Kt,
              this.pShadow,
              this.pShadowA,
              this.pShadowZ,
            ));
        Et.end();
      }
      this._nearOn
        ? zt(
            this.smDyn,
            this._nearCasters(
              F.filter((Et) => !Et.o3.userData.mbFarShadow).concat(O, B),
            ),
            this.frameGroupDyn,
          )
        : zt(this.smDyn, O.concat(B));
    }
    if (this._spots.length) {
      let ft = this._frameSpot;
      this._spots.forEach((qt, Et) => {
        (ft.set(h),
          ft.set(qt.vp.elements, 44),
          (ft[32] = qt.pos.x),
          (ft[33] = qt.pos.y),
          (ft[34] = qt.pos.z),
          s.queue.writeBuffer(this.frameBufSpot[Et], 0, ft));
      });
      let zt = this._spots.map((qt) => qt.key).join(";") + "|" + He + "|" + ms,
        kt = zb / 2,
        Ft = (qt, Et) => {
          let Me = $e(qt),
            de = this.renderBundles !== !1 && !this.neural,
            ze = null;
          (Et.length &&
            de &&
            ((ze = this._ops()),
            this._casterOps(
              ze,
              Et,
              this.pShadowSpot,
              this.pShadowSpotA,
              this.pShadowSpotZ,
            )),
            Et.length &&
              this._spots.forEach((Wt, ke) => {
                (Me.setViewport(
                  (Wt.tile % 2) * kt,
                  Math.floor(Wt.tile / 2) * kt,
                  kt,
                  kt,
                  0,
                  1,
                ),
                  ze
                    ? ze.n &&
                      this._runBundles(
                        Me,
                        (qt === this.spotStatic ? "spotS" : "spotD") + ke,
                        ze,
                        this.frameGroupSpot[ke],
                        null,
                        { colorFormats: [], depthStencilFormat: qt.format },
                      )
                    : (Me.setBindGroup(0, this.frameGroupSpot[ke]),
                      this._drawCasters(
                        Me,
                        Et,
                        this.pShadowSpot,
                        this.pShadowSpotA,
                        this.pShadowSpotZ,
                      )));
              }),
            Me.end());
        };
      if (zt !== this._staticSpotKey) {
        if (this.sunKeyLog) {
          let Et = this._spotKeyParts || [],
            Me = [
              zt.slice(
                0,
                zt.length - (String(He).length + String(ms).length + 2),
              ),
              He,
              ms,
            ],
            de = Fe.filter((ze) => ze.moving)
              .slice(0, 3)
              .map((ze) => ze.o3.name || ze.o3.parent?.name || ze.o3.type);
          (this.sunKeyLog.push(
            "spot " +
              [
                Et[0] !== Me[0] ? "lights" : "",
                Et[1] !== Me[1] ? "set" : "",
                Et[2] !== Me[2] ? "move:" + de.join(",") : "",
              ]
                .filter(Boolean)
                .join(" "),
          ),
            (this._spotKeyParts = Me));
        }
        Ft(this.spotStatic, Fe);
        let qt = ue.beginRenderPass({
          colorAttachments: [
            {
              view: this._glassTView[1],
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 1, g: 1, b: 1, a: 1 },
            },
          ],
        });
        (N.length &&
          this.pGlassTSpot &&
          (qt.setPipeline(this.pGlassTSpot),
          this._spots.forEach((Et, Me) => {
            (qt.setViewport(
              (Et.tile % 2) * kt,
              Math.floor(Et.tile / 2) * kt,
              kt,
              kt,
              0,
              1,
            ),
              qt.setBindGroup(0, this.frameGroupSpot[Me]),
              this._drawList(qt, N, !0));
          })),
          qt.end(),
          (this._staticSpotKey = zt));
      }
      Ft(this.spotDyn, xe.length ? O.concat(xe) : O);
    } else
      this._staticSpotKey !== "none" &&
        ($e(this.spotStatic).end(),
        $e(this.spotDyn).end(),
        (this._staticSpotKey = "none"));
    if (this._points?.length) {
      let ft = this._frameSpot,
        zt = JS,
        kt = F.concat(O);
      for (let Ft of this._points) {
        Ft.vps.forEach((Et, Me) => {
          (ft.set(h),
            ft.set(Et.elements, 44),
            (ft[32] = Ft.pos.x),
            (ft[33] = Ft.pos.y),
            (ft[34] = Ft.pos.z),
            s.queue.writeBuffer(this.frameBufPoint[Ft.idx * 6 + Me], 0, ft));
        });
        let qt = ue.beginRenderPass({
          colorAttachments: [],
          timestampWrites: ds(),
          depthStencilAttachment: {
            view: this._pointSMView[Ft.idx],
            depthLoadOp: "clear",
            depthStoreOp: "store",
            depthClearValue: 1,
          },
        });
        if (kt.length)
          for (let Et = 0; Et < 6; Et++)
            (qt.setViewport(
              (Et % 3) * zt,
              Math.floor(Et / 3) * zt,
              zt,
              zt,
              0,
              1,
            ),
              qt.setBindGroup(0, this.frameGroupPoint[Ft.idx * 6 + Et]),
              this._drawCasters(qt, kt, this.pShadowSpot, this.pShadowSpotA));
        qt.end();
      }
    }
    if ((n?.push(performance.now()), this._spotMapReq?.length))
      for (let ft of this._spotMapReq) {
        let zt = `${ft.tex.uuid}:${ft.tex.version}`;
        if (this._spotMapKeys[ft.layer] === zt) continue;
        let kt = this._texture(ft.tex);
        if (!kt) continue;
        let Ft = this._spotMapView[ft.layer];
        this._blit(ue, kt, Ft[0], "rgba8unorm-srgb");
        for (let qt = 1; qt < Ft.length; qt++) {
          let Et = s.createBindGroup({
              layout: this.mipLayout,
              entries: [
                { binding: 0, resource: Ft[qt - 1] },
                { binding: 1, resource: this.linSampler },
              ],
            }),
            Me = ue.beginRenderPass({
              colorAttachments: [
                { view: Ft[qt], loadOp: "clear", storeOp: "store" },
              ],
            });
          (Me.setPipeline(this._blitPipe("rgba8unorm-srgb")),
            Me.setBindGroup(0, Et),
            Me.draw(3),
            Me.end());
        }
        this._spotMapKeys[ft.layer] = zt;
      }
    pt &&
      pt.simulate(ue, {
        envTex: this.neural
          ? this.neural.priorTex
          : this._envPrior || rp.empty(s).priorTex,
        timestampWrites: jt ? Nt("vfx simulation") : ds(),
      });
    let bt = !!pt?.hasPost;
    if (_.n > _.nUnbounded && this.pCluster) {
      let ft = ue.beginComputePass({ timestampWrites: ds() });
      (ft.setPipeline(this.pCluster),
        ft.setBindGroup(0, this.clusterGroup),
        ft.dispatchWorkgroups(
          Math.ceil(eh.x / 4),
          Math.ceil(eh.y / 3),
          Math.ceil(eh.z / 4),
        ),
        ft.end());
    }
    let te = !!this.pNeural && this.neuralEnabled !== !1;
    if (
      (vt &&
        this._dynEncode(
          ue,
          L.filter((ft) => ft.surf < 2),
        ),
      at)
    ) {
      let ft = ue.beginRenderPass({
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
        timestampWrites: jt ? Nt("reflection") : ds(),
      });
      (ft.setBindGroup(0, this.frameGroupRefl),
        ft.setBindGroup(2, this._envGroups.planar));
      let zt = (this._frustumR ||= new qo()),
        kt = (this._sphereR ||= new _n()),
        Ft = ut ? this._studioRF : it ? this.reflectFilter : null;
      zt.setFromProjectionMatrix(
        this._m
          .multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)
          .multiply(this._refl),
      );
      let qt = new Map(),
        Et = L.filter((de) => {
          if (
            de.surf >= 2 ||
            (ut && de.hook && !this._hookPipe(de.hook, "lin"))
          )
            return !1;
          if (ut)
            return (
              de.cr !== void 0 &&
              Ft(de.cx, de.cy, de.cz, de.cr) &&
              (kt.center.set(de.cx, de.cy, de.cz),
              (kt.radius = de.cr),
              zt.intersectsSphere(kt))
            );
          let ze = de.o3.userData.mbReflR;
          if (ze && Ft) {
            let Wt = qt.get(ze);
            if (Wt === void 0) {
              let ke = e.position;
              ((Wt = Ft(ke.x, ke.y - 2, ke.z, ze, e)), qt.set(ze, Wt));
            }
            return Wt;
          }
          return de.cr === void 0 || de.o3.frustumCulled === !1
            ? !0
            : (kt.center.set(de.cx, de.cy, de.cz),
              (kt.radius = de.cr),
              zt.intersectsSphere(kt) &&
                (!Ft || Ft(de.cx, de.cy, de.cz, de.cr, e)));
        });
      Et.sort(
        (de, ze) =>
          de.ro - ze.ro || Number(de.po && !de.pw) - Number(ze.po && !ze.pw),
      );
      let Me = (de) =>
        this._offsetPipe(
          de.nm && this.pNeuralLin
            ? this.pNeuralLin
            : (ut && de.hook && this._hookPipe(de.hook, "lin")) ||
                this.pStandardLin,
          de,
        );
      if (this.renderBundles !== !1 && !this.neural) {
        let de = this._ops();
        for (let ze of Et) {
          let Wt = Me(ze);
          Wt && this._op(de, Wt, null, ze, !0);
        }
        de.n &&
          this._runBundles(
            ft,
            "refl",
            de,
            this.frameGroupRefl,
            this._envGroups.planar,
            {
              colorFormats: [this._planar.format],
              depthStencilFormat: this._planarDepth.format,
            },
            !0,
          );
      } else this._drawGrouped(ft, Et, Me, !0);
      if (
        (ft.end(),
        !this._lodBusy &&
          Et.some((de) => de.rec.lod === void 0) &&
          this._buildLods(Et.map((de) => de.rec)),
        this._mipGroups.length)
      ) {
        let de = ue.beginComputePass(
          jt ? { timestampWrites: Nt("reflection mips") } : {},
        );
        de.setPipeline(this.pDownCS);
        for (let ze of this._mipGroups)
          (de.setBindGroup(0, ze.group),
            de.dispatchWorkgroups(Math.ceil(ze.w / 8), Math.ceil(ze.h / 8)));
        de.end();
      }
    }
    let ee = at
        ? (this._views.planarTex ||= this._planar.createView())
        : (this._dummyView ||= this.dummy2d.createView()),
      Yt = U.length ? this._sideRender(t, e, U) : null;
    ht &&
      ht.update(ue, {
        camera: e,
        vp: h.subarray(0, 16),
        ivp: h.subarray(16, 32),
        sky: X,
        water: tt,
        planar: at,
        time: tt?.material?.uniforms?.time?.value ?? performance.now() / 1e3,
        W: this._W,
        H: this._H,
        exposure: this.toneMappingExposure,
        toneMapping: this.toneMapping ?? 0,
        timestampWrites: jt ? Nt("sky+ocean compute") : ds(),
        fogU: (() => {
          let ft = (this._oceanFogU ||= new Float32Array(20)),
            zt = 248 + kb * 12;
          return (
            ft.set(h.subarray(128, 136), 0),
            ft.set(h.subarray(zt, zt + 12), 8),
            ft
          );
        })(),
      });
    let ce = this._cur,
      Xe = this.samples > 1,
      Oe = this.ctx.getCurrentTexture(),
      Ke = Oe.createView(),
      qs = Oe !== this._lastCanvasTex;
    this._lastCanvasTex = Oe;
    let Rs = this._W,
      Ps = this._H,
      Qs = this.pixelRatio,
      xs = (ft) => {
        let zt = Math.round(ft[2] * Qs),
          kt = Math.round(ft[3] * Qs),
          Ft = Math.round(ft[0] * Qs),
          qt = Math.round(Ps - (ft[1] * Qs + kt)),
          Et = Math.min(Math.max(Ft, 0), Rs - 1),
          Me = Math.min(Math.max(qt, 0), Ps - 1);
        return [
          Et,
          Me,
          Math.max(1, Math.min(zt - (Et - Ft), Rs - Et)),
          Math.max(1, Math.min(kt - (Me - qt), Ps - Me)),
        ];
      },
      an = xs(this._viewport || [0, 0, this.width, this.height]),
      De = this._scissorTest && this._scissor ? xs(this._scissor) : an,
      Ds = (ft) => ft[0] === 0 && ft[1] === 0 && ft[2] >= Rs && ft[3] >= Ps,
      hs = !Ds(an) || !Ds(De);
    if (this._out && (hs || r))
      return (
        console.warn("renderer: upscale off (a viewport / overlay render)"),
        (this._upOff = !0),
        this._resize(),
        (this._lastCanvasTex = null),
        this.render(t, e)
      );
    let nn = (hs || r) && !qs,
      dn = jt
        ? Nt("main")
        : re
          ? {
              querySet: this.qset,
              endOfPassWriteIndex: 1,
              ...(ne ? { beginningOfPassWriteIndex: 0 } : {}),
            }
          : void 0,
      Wn = t.background?.isColor ? t.background : null,
      Xn = (ft) =>
        ft <= 0.0031308 ? ft * 12.92 : 1.055 * Math.pow(ft, 1 / 2.4) - 0.055,
      ni = Wn || this._clearColor,
      An = ni
        ? { r: Xn(ni.r), g: Xn(ni.g), b: Xn(ni.b), a: 1 }
        : { r: 0, g: 0, b: 0, a: 1 },
      ii = nn ? "load" : "clear",
      Mt = hs ? "store" : "discard",
      Xt = null;
    if (
      ((ot && this.depthPrepass !== !1) ||
        (this.fullMat &&
          this.samples === 1 &&
          (!this.neural || this.enhanceNeural) &&
          st &&
          this.depthPrepass !== !1)) &&
      !hs &&
      this.pStdPre?.back &&
      this.pStdPre.front &&
      this.pStdPre.none &&
      this.pStandardEq
    ) {
      let ft = R.filter(
        (zt) =>
          !zt.nm &&
          !zt.at &&
          !zt.po &&
          (!zt.hook || this._hookPipe(zt.hook, !0)) &&
          !zt.line &&
          zt.surf < 2,
      );
      if (
        (ft.length > 1 &&
          ft.sort(
            (zt, kt) =>
              zt.ro - kt.ro ||
              (zt.lean ? 1 : 0) - (kt.lean ? 1 : 0) ||
              this._uid(zt.rec) - this._uid(kt.rec),
          ),
        ft.length)
      ) {
        Xt = new Set(ft);
        let zt = ue.beginRenderPass({
            colorAttachments: [],
            depthStencilAttachment: {
              view: this._views.depth,
              depthLoadOp: "clear",
              depthStoreOp: "store",
              depthClearValue: 1,
            },
            timestampWrites: jt ? Nt("pre-pass") : ds(),
          }),
          kt = (Ft) => {
            let qt = (Ft.slot * ur) / 4,
              Et = G[qt + 138],
              Me = G[qt + 139] > 0.5;
            return this.pStdPre[
              (Et > 1.5 ? "none" : Et < 0.5 !== Me ? "back" : "front") +
                (Ft.lean && this.pStdPre.noneZ ? "Z" : "")
            ];
          };
        if (this.renderBundles !== !1 && !this.neural) {
          let Ft = this._ops();
          for (let qt of ft) this._op(Ft, kt(qt), null, qt, !0);
          this._runBundles(
            zt,
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
          (zt.setBindGroup(0, this.frameGroup),
            zt.setBindGroup(2, this._envGroups.main[ce]));
          let Ft = null;
          for (let qt of ft) {
            let Et = kt(qt);
            (Et !== Ft && (zt.setPipeline(Et), (Ft = Et)),
              this._draw1(zt, qt, !0));
          }
        }
        if ((zt.end(), h[188] > 0 && this.pGtao && this._aoTex)) {
          if (!this._aoGroups) {
            let de = (ze, Wt, ke) =>
              s.createBindGroup({
                layout: this.aoL1,
                entries: [
                  { binding: 0, resource: { buffer: this.aoBuf } },
                  { binding: 1, resource: this._views.depth },
                  { binding: 2, resource: ze.createView() },
                  { binding: 3, resource: Wt.createView() },
                  { binding: 4, resource: ke.createView() },
                ],
              });
            this._aoGroups = {
              gtao: [0, 1].map((ze) =>
                de(this._aoRaw, this._aoTex, this._scene[1 - ze]),
              ),
              blur: de(this._aoTex, this._aoRaw, this._scene[0]),
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
          let qt = ue.beginComputePass(
              jt ? { timestampWrites: Nt("gtao") } : {},
            ),
            Et = Math.ceil(this._W / 2),
            Me = Math.ceil(this._H / 2);
          (qt.setBindGroup(0, this.aoG0),
            qt.setPipeline(this.pGtao),
            qt.setBindGroup(1, this._aoGroups.gtao[ce]),
            qt.dispatchWorkgroups(Math.ceil(Et / 8), Math.ceil(Me / 8)),
            qt.setPipeline(this.pAoBlur),
            qt.setBindGroup(1, this._aoGroups.blur),
            qt.dispatchWorkgroups(Math.ceil(Et / 8), Math.ceil(Me / 8)),
            qt.end());
        }
      }
    }
    (!Xt &&
      h[188] > 0 &&
      ((h[188] = 0), s.queue.writeBuffer(this.frameBuf, 752, h, 188, 4)),
      n?.push(performance.now()));
    let wt = ue.beginRenderPass({
      colorAttachments: [
        Xe
          ? {
              view: this._views.color,
              resolveTarget: Ke,
              loadOp: ii,
              storeOp: Mt,
              clearValue: An,
            }
          : {
              view: this.fxaa && !r ? this._views.ldr : Ke,
              loadOp: ii,
              storeOp: "store",
              clearValue: An,
            },
        Xe
          ? {
              view: this._views.hdr,
              resolveTarget: this._views.scene[ce],
              loadOp: ii,
              storeOp: Mt,
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
            }
          : {
              view: this._views.scene[ce],
              loadOp: ii,
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
            },
      ],
      depthStencilAttachment: {
        view: this._views.depth,
        depthLoadOp: Xt ? "load" : "clear",
        depthStoreOp:
          bt || c || this.keepDepth || this.motionBlur > 0
            ? "store"
            : "discard",
        depthClearValue: 1,
      },
      timestampWrites: dn,
    });
    (hs &&
      (wt.setViewport(an[0], an[1], an[2], an[3], 0, 1),
      wt.setScissorRect(De[0], De[1], De[2], De[3])),
      nn &&
        this.autoClear !== !1 &&
        this.pClear &&
        (s.queue.writeBuffer(
          this.clearBuf,
          0,
          new Float32Array([An.r, An.g, An.b, 1]),
        ),
        wt.setPipeline(this.pClear),
        wt.setBindGroup(0, this.clearGroup),
        wt.draw(3)),
      wt.setBindGroup(0, this.frameGroup),
      wt.setBindGroup(2, this._envGroups.main[ce]));
    let _t = Xt ? -1 : 1,
      ae =
        R.length > 1
          ? [...R].sort(
              (ft, zt) =>
                ft.ro - zt.ro ||
                Number(ft.po && !ft.pw) - Number(zt.po && !zt.pw) ||
                (ft.gr - zt.gr) * _t ||
                (zt.nm && te) - (ft.nm && te) ||
                !!ft.hook - !!zt.hook ||
                (Xt?.has(ft) ? 1 : 0) - (Xt?.has(zt) ? 1 : 0) ||
                (ft.lean ? 1 : 0) - (zt.lean ? 1 : 0) ||
                this._uid(ft.rec) - this._uid(zt.rec) ||
                this._uid(ft.mat) - this._uid(zt.mat),
            )
          : R,
      se = te && this.depthPrepass && this.pNeuralPre && this.pNeuralEq;
    se &&
      this._drawGrouped(
        wt,
        ae.filter((ft) => ft.nm),
        () => this.pNeuralPre,
      );
    let Jt = (ft) =>
      this._offsetPipe(
        ft.nm && te
          ? se
            ? this.pNeuralEq
            : this.pNeural
          : Xt?.has(ft)
            ? ft.hook
              ? this._hookPipe(ft.hook, !0)
              : (ft.lean && this.pStandardEqZ) || this.pStandardEq
            : (ft.hook && this._hookPipe(ft.hook)) ||
              (ft.lean && this.pStandardZ) ||
              this.pStandard,
        ft,
      );
    if (this.renderBundles !== !1 && !this.neural && !hs && !r && !nn) {
      let ft = this._ops();
      for (let Ft of ae) {
        let qt = Jt(Ft);
        qt && this._op(ft, qt, null, Ft, !0);
      }
      let zt = Xe ? this._color : this.fxaa && !r ? this._ldr : Oe,
        kt = Xe ? this._hdr : this._scene[ce];
      (this._runBundles(
        wt,
        "main",
        ft,
        this.frameGroup,
        this._envGroups.main[ce],
        {
          colorFormats: [zt.format, kt.format],
          depthStencilFormat: this._depth.format,
          sampleCount: this.samples,
        },
      ),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(2, this._envGroups.main[ce]));
    } else this._drawGrouped(wt, ae, Jt);
    if (
      (H.length &&
        this.pLine?.opaque &&
        this._drawGrouped(wt, H, () => this.pLine.opaque),
      pt &&
        (pt.drawOpaque(wt),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(2, this._envGroups.main[ce]),
        (this._bs = null)),
      ht &&
        tt &&
        (ht.drawOcean(wt, ee),
        wt.setBindGroup(0, this.frameGroup),
        (this._bs = null)),
      ht && X
        ? (ht.drawSky(wt, ee),
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
        zt = (qt) => ft[qt]?.value,
        kt = zt("sunPosition"),
        Ft = (this._skyU ||= new Float32Array(16));
      ((Ft[0] = kt.x),
        (Ft[1] = kt.y),
        (Ft[2] = kt.z),
        (Ft[4] = zt("rayleigh") ?? 1),
        (Ft[5] = zt("turbidity") ?? 2),
        (Ft[6] = zt("mieCoefficient") ?? 0.005),
        (Ft[7] = zt("mieDirectionalG") ?? 0.8),
        (Ft[8] = zt("cloudScale") ?? 2e-4),
        (Ft[9] = zt("cloudSpeed") ?? 2e-5),
        (Ft[10] = zt("cloudCoverage") ?? 0),
        (Ft[11] = zt("cloudDensity") ?? 0.4),
        (Ft[12] = zt("cloudElevation") ?? 0.5),
        (Ft[13] = zt("showSunDisc") ?? 1),
        (Ft[14] = zt("time") ?? 0),
        s.queue.writeBuffer(this.skyUBuf, 0, Ft),
        wt.setPipeline(this.pPreetham),
        wt.setBindGroup(0, this.frameGroup),
        wt.setBindGroup(1, this.skyUGroup),
        wt.draw(3),
        (this._bs = null));
    }
    if (
      (Yt &&
        this.pSide &&
        (wt.setPipeline(this.pSide),
        wt.setBindGroup(0, this._sideGroup),
        wt.draw(3),
        wt.setBindGroup(0, this.frameGroup)),
      P.length &&
        this._drawGrouped(wt, P, (ft) =>
          ft.nm && this.pNeuralGlass ? this.pNeuralGlass : this.pStandardGlass,
        ),
      C.length && this.pBlend)
    ) {
      let ft = null;
      for (let zt of C.sort((kt, Ft) => kt.ro - Ft.ro || kt.depth - Ft.depth)) {
        let kt =
            zt.kind === "points"
              ? this.p_points
              : zt.kind === "sprite"
                ? this.p_sprite
                : zt.line
                  ? this.pLine
                  : this.pBlend,
          Ft = kt && (kt[zt.blend] || kt.alpha0);
        Ft &&
          (Ft !== ft && (wt.setPipeline(Ft), (ft = Ft)),
          zt.kind === "points"
            ? (wt.setBindGroup(1, this.objGroup, [zt.slot * ur]),
              wt.setBindGroup(3, zt.mat || this._defaultMat),
              wt.setVertexBuffer(0, zt.rec.pos),
              wt.setVertexBuffer(1, zt.rec.color || this._zeroBuf),
              wt.draw(6, zt.count),
              (this._bs = null))
            : this._draw1(wt, zt, !0));
      }
    }
    (wt.end(),
      n?.push(performance.now()),
      bt &&
        !hs &&
        pt.post(ue, {
          depthView: this._views.depth,
          linTex: this._scene[ce],
          linView: this._views.scene[ce],
          displayView: !Xe && this.fxaa ? this._views.ldr : Ke,
          span: jt ? Nt : null,
        }));
    let _e = c && !hs;
    if (_e && this.pVel) {
      let ft = R.filter((ze) => ze.moving && !ze.line),
        zt = this.pVelLine
          ? [...H, ...C].filter((ze) => ze.moving && ze.line)
          : [],
        kt = ue.beginRenderPass({
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
        Ft = ft.filter((ze) => ze.inst?.prevBuf),
        qt = Ft.length ? ft.filter((ze) => !ze.inst?.prevBuf) : ft;
      if (
        (qt.length &&
          (kt.setPipeline(this.pVel),
          kt.setBindGroup(0, this.frameGroup),
          this._drawList(kt, qt)),
        Ft.length)
      ) {
        (kt.setPipeline(this.pVelI), kt.setBindGroup(0, this.frameGroup));
        for (let ze of Ft)
          (kt.setVertexBuffer(4, ze.inst.prevBuf),
            this._bs?.pass === kt && (this._bs.vb[4] = ze.inst.prevBuf),
            this._draw1(kt, ze));
      }
      zt.length &&
        (kt.setPipeline(this.pVelLine),
        kt.setBindGroup(0, this.frameGroup),
        this._drawList(kt, zt));
      let Et = this.pReact,
        Me = this._taaVP.elements.some(
          (ze, Wt) => Math.abs(ze - this._taaVPPrev.elements[Wt]) > 1e-6,
        ),
        de = Et ? C.filter((ze) => !ze.line && (ze.moving || Me)) : [];
      if (de.length) {
        (kt.setBindGroup(0, this.frameGroup),
          kt.setBindGroup(2, this._envGroups.main[ce]));
        let ze = null;
        for (let Wt of de) {
          let ke =
            Et[
              Wt.kind === "points"
                ? "points"
                : Wt.kind === "sprite"
                  ? "sprite"
                  : "mesh"
            ];
          ke &&
            (ke !== ze && (kt.setPipeline(ke), (ze = ke)),
            Wt.kind === "points"
              ? (kt.setBindGroup(1, this.objGroup, [Wt.slot * ur]),
                kt.setBindGroup(3, Wt.mat || this._defaultMat),
                kt.setVertexBuffer(0, Wt.rec.pos),
                kt.setVertexBuffer(1, Wt.rec.color || this._zeroBuf),
                kt.draw(6, Wt.count),
                (this._bs = null))
              : this._draw1(kt, Wt, !0));
        }
      }
      (bt && pt.drawReactive?.(kt), kt.end());
    }
    if (_e) {
      let ft = (this._taaU ||= new Float32Array(40));
      (ft.set(
        this._m.multiplyMatrices(
          this._taaVPPrev,
          (this._m2 ||= new fe()).copy(this._taaVP).invert(),
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
      let zt = ue.beginRenderPass({
        colorAttachments: [
          {
            view: this._taaTex[ce].createView(),
            loadOp: "clear",
            storeOp: "store",
          },
        ],
        timestampWrites: jt ? Nt("taa") : void 0,
      });
      (zt.setPipeline(this.pTAA),
        zt.setBindGroup(0, this._taaGroups[ce]),
        zt.draw(3),
        zt.end(),
        (this._taaReset = !1));
    }
    let mt =
        this.bloom > 0
          ? this.bloom
          : ot && this.defaultBloom !== 0
            ? (this.defaultBloom ?? 0.01)
            : 0,
      ie =
        (mt > 0 || this.vignette > 0) && this._bloom && this.pMip && !hs && !r,
      Dt = null;
    if (this.fxaa && !r) {
      let ft = (this._fu ||= new Float32Array(64));
      (ft.set(this._m.copy(this._taaVP).invert().elements, 0),
        ft.set(this._taaVPPrev.elements, 16));
      let zt = this._mbCut;
      ((this._mbCut = !1),
        (ft[32] =
          zt || this.info.render.frame < 2 ? 0 : (this.motionBlur ?? 0)),
        (ft[33] = this.motionBlurMax ?? 0.035),
        (ft[34] = this.radialBlur ?? 0),
        (ft[35] = this.grade?.mids ?? 0));
      {
        let Et = this.flare,
          Me = this.shafts;
        ((ft[54] = 0), (ft[63] = 0));
        let de = Et?.strength > 0 ? Et.dir : Me?.strength > 0 ? Me.dir : null;
        if (de) {
          let ze = this._taaVP.elements,
            [Wt, ke, As] = de,
            je = ze[0] * Wt + ze[4] * ke + ze[8] * As,
            gs = ze[1] * Wt + ze[5] * ke + ze[9] * As,
            _s = ze[3] * Wt + ze[7] * ke + ze[11] * As;
          if (_s > 1e-4 && Me?.strength > 0) {
            let on = Me.color || [1, 1, 1],
              fi = Me.strength * Math.min(1, _s * 3);
            ((ft[60] = on[0]),
              (ft[61] = on[1]),
              (ft[62] = on[2]),
              (ft[63] = fi));
          }
          if (_s > 1e-4) {
            let on = je / _s,
              fi = gs / _s;
            ((ft[52] = on * 0.5 + 0.5),
              (ft[53] = 0.5 - fi * 0.5),
              (ft[54] =
                Et?.strength > 0 ? Et.strength * Math.min(1, _s * 4) : 0));
            let co = Et?.color || [1, 1, 1];
            ((ft[56] = co[0]),
              (ft[57] = co[1]),
              (ft[58] = co[2]),
              (ft[59] = Math.max(0, 1 - Math.hypot(on, fi) * 0.6)));
          }
        }
      }
      ((ft[36] = this._W),
        (ft[37] = this._H),
        (ft[38] = 1 / this._W),
        (ft[39] = 1 / this._H));
      let kt = this.grade || {};
      ((ft[40] = kt.saturation ?? 0),
        (ft[41] = kt.contrast ?? 0),
        (ft[42] = kt.warmth ?? 0),
        (ft[43] = kt.lift ?? 0));
      let Ft = kt.shadows || [0, 0, 0],
        qt = kt.highlights || [0, 0, 0];
      ((ft[44] = Ft[0]),
        (ft[45] = Ft[1]),
        (ft[46] = Ft[2]),
        (ft[47] = kt.vibrance ?? 0),
        (ft[48] = qt[0]),
        (ft[49] = qt[1]),
        (ft[50] = qt[2]),
        (ft[51] = kt.curve ?? 0),
        s.queue.writeBuffer(this._fbuf, 0, ft));
    }
    if ((ie || this.fxaa) && !r) {
      let ft = 0,
        zt = this._bloom,
        kt = (Et, Me, de = !1) =>
          ue.beginRenderPass({
            colorAttachments: [
              {
                view: Et,
                loadOp: Me ? "load" : "clear",
                storeOp: "store",
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
              },
            ],
            timestampWrites: Nt(
              this.fxaa ? "finish/fxaa" : "finish",
              ft++ === 0,
              de,
            ),
          }),
        Ft = ie && mt > 0 && !(this.bloom > 0) && this.pHot && this._hotGroup,
        qt = ie && mt > 0 && (!Ft || this._glareHot !== !1);
      if (
        (s.queue.writeBuffer(
          this.bloomBuf,
          0,
          new Float32Array([
            qt ? mt / zt.levels : 0,
            ie ? this.vignette : 0,
            this.toneMappingExposure,
            this._W / this._H,
          ]),
        ),
        ie && mt > 0)
      ) {
        let Et =
          this.bloom > 0
            ? (this._composerThr ?? 0)
            : (this.glareThreshold ?? 1);
        s.queue.writeBuffer(
          this.postBuf,
          0,
          new Float32Array([
            this.glareSpread ?? 1.6,
            Et,
            Et * (this.bloom > 0 ? 0.5 : 0.1),
            0,
          ]),
        );
        let Me = ue.beginComputePass(
          jt ? { timestampWrites: Nt("glare") } : {},
        );
        for (let de = 0; de < (qt ? zt.levels : 1); de++) {
          let [ze, Wt] = zt.size(de);
          (Me.setPipeline(de ? this.pDown13CS : this.pDownTCS),
            Me.setBindGroup(0, de ? zt.down[de] : zt.down0[ce]),
            Me.dispatchWorkgroups(Math.ceil(ze / 8), Math.ceil(Wt / 8)));
        }
        if (Ft) {
          let [de, ze] = zt.size(0);
          (s.queue.writeBuffer(this._hotBuf, 0, new Uint32Array([0])),
            Me.setPipeline(this.pHot),
            Me.setBindGroup(0, this._hotGroup),
            Me.dispatchWorkgroups(Math.ceil(de / 8), Math.ceil(ze / 8)));
        }
        if (qt) {
          Me.setPipeline(this.pUpCS);
          for (let de = zt.levels - 2; de >= 0; de--) {
            let [ze, Wt] = zt.size(de);
            (Me.setBindGroup(0, zt.up[de]),
              Me.dispatchWorkgroups(Math.ceil(ze / 8), Math.ceil(Wt / 8)));
          }
        }
        if ((Me.end(), Ft && this.info.render.frame % 8 === 0)) {
          let de = this._hotRb.find((ze) => !ze.busy);
          de &&
            (ue.copyBufferToBuffer(this._hotBuf, 0, de.buf, 0, 4), (Dt = de));
        }
      } else
        this.fxaa ||
          ue
            .beginRenderPass({
              colorAttachments: [
                {
                  view: zt.glow0,
                  loadOp: "clear",
                  storeOp: "store",
                  clearValue: { r: 0, g: 0, b: 0, a: 0 },
                },
              ],
            })
            .end();
      if (this.fxaa) {
        let Et = !!(this._out && this._upGroup && !hs),
          Me = kt(Et ? this._views.out : Ke, nn && !Et, !0);
        if (
          (hs &&
            (Me.setViewport(an[0], an[1], an[2], an[3], 0, 1),
            Me.setScissorRect(De[0], De[1], De[2], De[3])),
          Me.setPipeline(_e ? this.pFinalT : this.pFinal),
          Me.setBindGroup(0, _e ? this._finalGroupT[ce] : this._finalGroup),
          Me.draw(3),
          Me.end(),
          Et)
        ) {
          let de = ue.beginRenderPass({
            colorAttachments: [
              {
                view: Ke,
                loadOp: "clear",
                storeOp: "store",
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
              },
            ],
            timestampWrites: Nt("upscale"),
          });
          (de.setPipeline(this.pUp),
            de.setBindGroup(0, this._upGroup),
            de.draw(3),
            de.end());
        }
      } else {
        let Et = kt(Ke, !0, !0);
        (Et.setPipeline(this.pBloomComp),
          Et.setBindGroup(0, zt.comp),
          Et.draw(3),
          Et.end());
      }
    }
    ((this._cur = 1 - ce),
      (this._prevVP = this._prevVP || new Float32Array(16)),
      this._prevVP.set(a.elements));
    let Ht = null;
    if (re) {
      Ht = this.qread.find((zt) => !zt.busy);
      let ft = jt ? 2 * be.length : 2;
      (ft && ue.resolveQuerySet(this.qset, 0, ft, this.qbuf, 0),
        Ht && ft && ue.copyBufferToBuffer(this.qbuf, 0, Ht.buf, 0, ft * 8));
    }
    if ((s.queue.submit([ue.finish()]), n)) {
      n.push(performance.now());
      let ft = (this.info.cpu ||= {}),
        zt = [
          "matrices",
          "walk",
          "uploads",
          "shadows",
          "prepass",
          "main",
          "post",
          "total",
        ];
      for (let kt = 0; kt < 7; kt++)
        ft[zt[kt]] =
          (ft[zt[kt]] ?? 0) + (n[kt + 1] - n[kt] - (ft[zt[kt]] ?? 0)) / 32;
      ft.total = (ft.total ?? 0) + (n[7] - n[0] - (ft.total ?? 0)) / 32;
    }
    if ((pt?.afterSubmit(), Dt)) {
      let ft = Dt;
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
    (Ht &&
      ((Ht.busy = !0),
      Ht.buf
        .mapAsync(GPUMapMode.READ)
        .then(() => {
          let ft = new BigUint64Array(Ht.buf.getMappedRange());
          if (jt) {
            let kt = {};
            (be.forEach((Ft, qt) => {
              kt[Ft] = Number(ft[2 * qt + 1] - ft[2 * qt]) / 1e6;
            }),
              (this.info.passLog ||= []).push(kt));
          }
          let zt = jt
            ? be.reduce(
                (kt, Ft, qt) => kt + Number(ft[2 * qt + 1] - ft[2 * qt]) / 1e6,
                0,
              )
            : Number(ft[1] - ft[0]) / 1e6;
          (zt > 0 &&
            zt < 1e3 &&
            (this.info.gpuTimeMs = this.info.gpuTimeMs
              ? this.info.gpuTimeMs * 0.9 + zt * 0.1
              : zt),
            Ht.buf.unmap(),
            (Ht.busy = !1));
        })
        .catch(() => {
          Ht.busy = !1;
        })),
      (this.info.render.calls =
        R.length +
        P.length +
        C.length +
        O.length * (1 + this._spots.length) +
        (at ? L.length + 1 : 0) +
        (this._bgSrc ? 1 : 0)),
      (this.info.render.triangles = V),
      (this.info.memory.geometries = this._geo.size),
      (this.info.memory.textures = this._texCache.size),
      this.info.render.frame++);
  }
  _billboard(t, e, s, n, i) {
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
    let h = t[O5];
    h.still = !1;
    let f = this._objData,
      u = (c * ur) / 4;
    (f.fill(0, u, u + ur / 4),
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
    let v = this._prevM.get(t),
      x = t.matrixWorld.elements,
      y = t.geometry.attributes.position.version,
      M = !v || v.v !== y;
    if (v) {
      for (let S = 0; S < 16 && !M; S++)
        Math.abs(v[S] - x[S]) > 1e-6 && (M = !0);
      (v.set(x), (v.v = y));
    } else {
      let S = Float32Array.from(x);
      ((S.v = y), this._prevM.set(t, S));
    }
    return (
      i.push({
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
      i = n.get(t);
    i || n.set(t, (i = new Map()));
    let a = `${e.pb}|${e.ps}|${e.pw}`,
      r = i.get(a);
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
        i.set(a, r)),
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
      i = n.get(t);
    return (
      i || ((i = { p: null, recoveries: 0 }), n.set(t, i)),
      (!i.ready || (i.retryAt && performance.now() >= i.retryAt)) &&
        (i.ready && i.recoveries++,
        (i.error = null),
        (i.retryAt = 0),
        (i.work = this._mkHook(t, e, s)),
        (i.ready = i.work
          .then((a) => (i.p = a))
          .catch((a) => {
            ((i.error = String(a)),
              i.recoveries < 2 &&
                m7(a) &&
                (i.retryAt = performance.now() + 1e4 * (i.recoveries + 1)),
              console.warn("mbAlbedo hook failed", a));
          }))),
      s && !i.p && i.work?.prioritize?.(s),
      i.p
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
          dir: new dt(0, 1, 0),
          intensity: 0,
          tp: new dt(),
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
      standard: z7(t, "", this.fullMat),
      background: LV,
      shadow: CV,
      mip: E7,
      cluster: IV,
      neural: this.neural && _7(this.neural, this.mlpMode, !1),
      neuralF16: this.neural && _7(this.neural, this.mlpMode, !0),
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
