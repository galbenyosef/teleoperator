// app 32 — queue
// Lines 47949-48294 of readable/app.pretty.js (statement-aligned).
var pU = `
fn crowdPaletteFallback(uv: vec2f, codes: vec3f, smoothStyle: bool) -> vec3f {
  let packed = floor(codes.g + 0.5);
  let tone = floor(packed / 32.0);
  var row = packed - tone * 32.0;
  var zone = floor(uv.x);
  // Map the smooth figures' zones onto the voxel palette's zones.
  if (smoothStyle && zone >= 2.0) {
    zone += select(1.0, 2.0, zone < 5.0);
    if (floor(uv.x) == 5.0) { zone = 4.0; }
  }
  var column = 0.0;
  if (zone < 4.0) { column = tone; row = 32.0; }
  else if (zone < 10.0) { column = zone - 4.0; }
  else if (zone == 10.0) { column = floor(floor(codes.r + 0.5) / 16.0); row = 33.0; }
  else if (zone < 15.0) { column = zone - 5.0; }
  else if (zone == 16.0) { return vec3f(0.78, 0.88, 1.0); }
  else if (zone == 18.0 || zone == 19.0) { column = zone - 8.0; }
  else if (zone >= 21.0) { return vec3f(0.75, 0.68, 0.45); }
  else { return vec3f(0.02); }
  return textureSampleLevel(matMap, matSamp, vec2f(column + 0.5, row + 0.5) / vec2f(16.0, 40.0), 0.0).rgb;
}
`;
var mU = `
fn trafficFallback(uv: vec2f, col: vec4f, bc: vec4f) -> vec3f {
  let t = textureSampleLevel(matMap, matSamp, uv, 0.0);
  let mk = textureSampleLevel(matExtra, matSamp, uv, 0.0);
  let c = t.rgb;
  let brake = select(0.0, 1.0, col.r > 3.0);
  let drive = select(0.0, 1.0, col.g > 3.0);
  let siren = select(select(0.0, 1.0, col.b > 3.0), 2.0, col.b > 7.0);
  var paint = clamp(col.rgb - vec3f(brake * 4.0, drive * 4.0, siren * 4.0), vec3f(0.0), vec3f(1.0));
  let zone = col.a;
  if (zone > 7.0) { paint = vec3f(0.78, 0.78, 0.76); }
  let hi = max(c.r, max(c.g, c.b)); let lo = min(c.r, min(c.g, c.b));
  let sat = (hi - lo) / max(hi, 0.001);
  let lum = dot(c, vec3f(0.2126, 0.7152, 0.0722));
  let hasMR = textureDimensions(matExtra).x > 4u;
  var pm = smoothstep(0.12, 0.26, lum) * (1.0 - smoothstep(0.22, 0.4, sat)) * (1.0 - smoothstep(0.45, 0.7, select(0.0, mk.b, hasMR)));
  var outc = mix(c, paint * (0.75 + 0.25 * lum), pm);
  var rough = mix(0.65, 0.4, pm); var metal = 0.0; var lampW = 1.0 - pm;
  if (bc.r < 0.75) {
    // Generated vehicles: paint, glass, rubber and metal weights in the mask.
    pm = mk.r; let gm = mk.g; let dark = mk.b;
    let mt = clamp((mk.a - 0.031) * 1.033, 0.0, 1.0);
    let rest = clamp(1.0 - pm - gm - dark - mt, 0.0, 1.0);
    let pcol = mix(paint, vec3f(0.012, 0.012, 0.013), smoothstep(0.8, 0.9, t.a));
    outc = pm * pcol + gm * (c * 0.09 + vec3f(0.004, 0.005, 0.006)) + dark * vec3f(0.03) + mt * vec3f(0.58, 0.59, 0.6) + rest * c;
    rough = pm * 0.45 + gm * 0.07 + dark * 0.75 + mt * 0.25 + rest * 0.55; metal = mt * 0.85; lampW = rest;
  } else if (bc.r > 0.8 && bc.r < 0.95) {
    // Waymo uses its original colored atlas and ORM, not a repaint mask.
    pm = smoothstep(0.8, 0.9, mk.r) * smoothstep(0.15, 0.2, mk.g) * (1.0 - smoothstep(0.4, 0.5, mk.g));
    outc = c * mix(1.0, 0.85, pm * (1.0 - bc.b)); rough = mix(clamp(mk.g, 0.05, 1.0), 0.34, pm); metal = mk.b * (1.0 - pm); lampW = 1.0 - pm;
  }
  var lens = vec3f(0.0);
  if (zone > 11.0) {
    pm = 0.0; lampW = 0.0; metal = 0.0; rough = 0.75;
    outc = vec3f(0.034, 0.033, 0.032);
    if (zone > 19.0) { outc = vec3f(0.2, 0.2, 0.205); metal = 1.0; }
    else if (zone > 18.0) { outc = vec3f(0.03, 0.03, 0.032); }
    else if (zone > 17.0) { outc = vec3f(0.012, 0.012, 0.013); }
    else if (zone > 16.0) { outc = vec3f(0.15, 0.145, 0.14); }
    else if (zone > 15.0) { outc = vec3f(0.26, 0.25, 0.24); metal = 1.0; }
    else if (zone > 14.0) { outc = vec3f(0.02, 0.02, 0.022); }
    else if (zone > 12.0) { outc = select(vec3f(0.56, 0.57, 0.58), vec3f(0.15, 0.155, 0.16), zone > 13.0); metal = 1.0; rough = 0.32; }
  } else if (zone > 8.0 || (zone > 2.0 && zone < 7.0)) {
    pm = 0.0; lampW = 0.0; metal = 0.0; rough = 0.32;
    outc = vec3f(0.8, 0.8, 0.78);
    if (zone > 10.0) { outc = vec3f(0.62, 0.63, 0.66); metal = 1.0; }
    else if (zone > 9.0) { outc = vec3f(0.1, 0.105, 0.115) + c * 0.12; lens = vec3f(0.92, 0.95, 1.0) * drive * (1.0 - bc.b) * 6.0; }
    else if (zone > 8.0) { outc = vec3f(0.008, 0.008, 0.009) + c * 0.035; }
    else if (zone > 6.0) { outc = vec3f(0.62, 0.42, 0.1); }
    else if (zone > 5.0) { outc = vec3f(0.03, 0.06, 0.32); lens = vec3f(0.04, 0.16, 1.0) * 7.0 * step(1.5, siren); }
    else if (zone > 4.0) { outc = vec3f(0.32, 0.03, 0.03); lens = vec3f(1.0, 0.03, 0.02) * 7.0 * step(0.5, siren) * step(siren, 1.5); }
    else if (zone > 3.0) { outc = vec3f(0.018, 0.02, 0.024); }
  }
  let red = smoothstep(0.12, 0.3, c.r - max(c.g, c.b)) * smoothstep(0.45, 0.7, sat) * (1.0 - smoothstep(0.38, 0.55, c.g / max(c.r, 0.001)));
  let night = clamp(1.0 - bc.b, 0.0, 1.0);
  let head = (1.0 - smoothstep(0.26, 0.3, zone)) * smoothstep(0.17, 0.22, zone) * smoothstep(0.5, 0.85, lum);
  gHE = lens + select(vec3f(0.0), vec3f(1.0, 0.08, 0.04) * red * lampW * (brake * 5.0 + night * 2.5), bc.g > 0.99) + vec3f(0.92, 0.95, 1.0) * head * lampW * drive * night * 2.0;
  gHK = vec4f(rough, metal, 0.0, 1.0); gHC = vec2f(pm * 0.6, 0.08);
  return outc;
}
`;
var gU = `
fn landmarkBand(x: f32, period: f32, a: f32, b: f32, footprint: f32) -> f32 {
  let w = max(footprint, 1e-4);
  let lo = x - w * 0.5; let hi = x + w * 0.5;
  let kl = floor(lo / period); let kh = floor(hi / period);
  let il = kl * (b - a) + clamp(lo - kl * period - a, 0.0, b - a);
  let ih = kh * (b - a) + clamp(hi - kh * period - a, 0.0, b - a);
  return clamp((ih - il) / w, 0.0, 1.0);
}
fn landmarkFallback(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f, haze: f32) -> vec3f {
  let id = clamp(floor(col.a * 256.0), 0.0, 239.0);
  let mode = floor(id / 16.0); let cell = id - mode * 16.0;
  let gx = dpdx(uv); let gy = dpdy(uv); let fw = max(abs(gx) + abs(gy), vec2f(1e-4));
  let scales = array<f32, 16>(3.0, 2.4, 3.2, 4.8, 3.6, 3.0, 2.2, 2.6, 2.4, 1.6, 1.8, 3.0, 3.0, 3.0, 2.0, 1.6);
  let sc = scales[u32(cell)];
  let tileUV = vec2f(cell % 4.0, floor(cell / 4.0)) * 0.25 + 16.0 / 2048.0 + fract(uv * vec2f(1.0, -1.0) / sc) * (480.0 / 2048.0);
  var tile = vec3f(0.8);
  if (textureDimensions(matMap).x > 4u) { tile = textureSampleGrad(matMap, matSamp, tileUV, gx * (480.0 / 2048.0) / sc, -gy * (480.0 / 2048.0) / sc).rgb; }
  var c = col.rgb * tile; var rough = 0.8; var metal = 0.0; var emit = vec3f(0.0); var glass = 0.0;
  let night = clamp(bc.b, 0.0, 1.0);
  if (mode == 8.0) { c = col.rgb; rough = select(0.3, 0.85, cell == 0.0 || cell == 5.0 || cell == 6.0); metal = select(0.0, 1.0, cell == 2.0 || cell == 3.0); }
  else if (mode == 11.0 || mode == 2.0 || mode == 1.0) {
    var bay = 2.6; var floorH = 3.4; var ground = 4.0;
    if (mode == 2.0) { bay = 2.2; floorH = 3.7; ground = 7.2; }
    if (mode == 1.0) { bay = 1.52; floorH = 3.96; ground = 16.0; c = tile * vec3f(0.93, 0.92, 0.89); }
    glass = landmarkBand(uv.x, bay, bay * 0.22, bay * 0.78, fw.x) * landmarkBand(uv.y - ground, floorH, floorH * 0.21, floorH * 0.82, fw.y) * step(ground, uv.y);
  } else if (mode == 3.0 || mode == 4.0 || mode == 13.0) {
    let floorH = select(3.3, 4.15, mode == 3.0);
    glass = landmarkBand(uv.x, 1.52, 0.1, 1.42, fw.x) * landmarkBand(uv.y, floorH, 0.55, floorH - 0.4, fw.y);
    if (mode == 3.0) { c = tile * vec3f(0.95, 0.95, 0.93); }
  } else if (mode == 7.0 || mode == 10.0) {
    let a = (vec2f(cell % 2.0, floor(cell / 2.0)) + clamp(uv * vec2f(1.0, -1.0) + vec2f(0.0, 1.0), vec2f(0.002), vec2f(0.998))) * 0.5;
    if (textureDimensions(matExtra).x > 4u) { c = textureSampleGrad(matExtra, matSamp, a, gx * vec2f(0.5, -0.5), gy * vec2f(0.5, -0.5)).rgb * col.rgb; }
  } else if (mode == 12.0) { c = tile * vec3f(col.r, col.g, col.r); emit = c * vec3f(1.0, 0.86, 0.66) * night * 0.3; }
  else if (mode == 14.0) { c = tile * col.r * vec3f(1.0, 0.99, 0.97); rough = 0.5; metal = 0.25; }
  else if (mode == 5.0) { c = col.rgb * 0.35; emit = col.rgb * (night * select(7.0, 1.6, cell > 0.5) + max(bc.r, 0.0) * 1.5); }
  else if (mode == 6.0) { c *= 0.3; rough = 0.08; emit = tile * col.rgb * (0.04 + night * 2.2); }
  else if (mode == 9.0) { c = vec3f(0.34, 0.37, 0.4); emit = vec3f(0.9, 0.95, 1.0) * night * 0.5; }
  c = mix(c, select(vec3f(0.05, 0.055, 0.06), vec3f(0.26, 0.31, 0.36), mode == 3.0), glass);
  rough = mix(rough, 0.08, glass); emit += vec3f(1.0, 0.8, 0.6) * glass * night * 0.12;
  c *= 1.0 - 0.18 * clamp(bc.g, 0.0, 1.0);
  // These meshes disable scene fog because their original shader supplies its
  // own aerial perspective. Keep it while that shader is unavailable too.
  let d = length(F.camPos.xyz - wp) * F.fogP.z * haze; let k = 1.0 - exp(-d * d);
  c *= 1.0 - k; emit = emit * (1.0 - k * 0.6) + F.fog.rgb * k * 1.1 / max(F.camPos.w, 0.3);
  gHE = emit; gHK = vec4f(rough, metal, glass, 1.0);
  return c;
}
`;
var jA = (i) =>
  i?.reason === "internal" ||
  /XPC_ERROR_CONNECTION_(?:INTERRUPTED|INVALID)|internal error/i.test(
    String(i?.message || i),
  );
function bU(i, t = 45e3) {
  let e,
    s = new Promise((n, o) => {
      e = setTimeout(() => o(new Error("Shader compilation timed out")), t);
    });
  return Promise.race([i, s])
    .catch((n) => {
      let o = new Error("The graphics shaders could not start. Please retry.", {
        cause: n,
      });
      throw ((o.name = "ShaderStartupError"), o);
    })
    .finally(() => clearTimeout(e));
}
var H5 = class {
  constructor({
    concurrency: t = 2,
    retries: e = 2,
    delay: s = (n) => new Promise((o) => setTimeout(o, n)),
  } = {}) {
    ((this.concurrency = t),
      (this.retries = e),
      (this.delay = s),
      (this.active = 0),
      (this.queue = []));
  }
  run(t, { priority: e = 0 } = {}) {
    let s,
      n = new Promise((o, a) => {
        ((s = { compile: t, resolve: o, reject: a, priority: e }),
          this.queue.push(s),
          this.drain());
      });
    return (
      (n.prioritize = (o) => {
        s.priority = Math.max(s.priority, o);
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
        if (e >= this.retries || !jA(s)) throw s;
        await this.delay(1e3 * (e + 1));
      }
  }
};
async function xU(i, t = 3e3) {
  let e = [],
    s = !0,
    n,
    o = async () => {
      let a = i.createShaderModule({
          label: "bundle-offset-check",
          code: `
      @group(0) @binding(0) var<uniform> color: vec4f;
      @vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
        let p = array(vec2f(-1, -3), vec2f(-1, 1), vec2f(3, 1));
        return vec4f(p[i], 0, 1);
      }
      @fragment fn fs() -> @location(0) vec4f { return color; }
    `,
        }),
        r = i.createBindGroupLayout({
          entries: [
            {
              binding: 0,
              visibility: GPUShaderStage.FRAGMENT,
              buffer: { hasDynamicOffset: !0 },
            },
          ],
        }),
        l = await i.createRenderPipelineAsync({
          label: "bundle-offset-check",
          layout: i.createPipelineLayout({ bindGroupLayouts: [r] }),
          vertex: { module: a, entryPoint: "vs" },
          fragment: {
            module: a,
            entryPoint: "fs",
            targets: [{ format: "rgba8unorm" }],
          },
          multisample: { count: 1, mask: 2147483647 },
        });
      if (!s) return { safe: !1, reason: "timeout" };
      let c = (x) => (e.push(x), x),
        h = i.limits.minUniformBufferOffsetAlignment,
        f = c(
          i.createBuffer({
            size: h + 16,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
          }),
        );
      (i.queue.writeBuffer(f, 0, new Float32Array([1, 0, 0, 1])),
        i.queue.writeBuffer(f, h, new Float32Array([0, 1, 0, 1])));
      let u = i.createBindGroup({
          layout: r,
          entries: [{ binding: 0, resource: { buffer: f, size: 16 } }],
        }),
        d = i.createRenderBundleEncoder({
          label: "bundle-offset-check",
          colorFormats: ["rgba8unorm"],
        });
      (d.setPipeline(l),
        d.setBindGroup(0, u, new Uint32Array([h]), 0, 1),
        d.draw(3));
      let p = d.finish(),
        m = c(
          i.createTexture({
            size: [1, 1],
            format: "rgba8unorm",
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
          }),
        ),
        g = c(
          i.createBuffer({
            size: 256,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
          }),
        ),
        b = [];
      for (let x = 0; x < 2; x++) {
        let v = i.createCommandEncoder(),
          y = v.beginRenderPass({
            colorAttachments: [
              {
                view: m.createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue: [0, 0, 0, 1],
              },
            ],
          });
        (y.executeBundles([p]),
          y.end(),
          v.copyTextureToBuffer(
            { texture: m },
            { buffer: g, bytesPerRow: 256 },
            [1, 1],
          ),
          i.queue.submit([v.finish()]),
          await g.mapAsync(GPUMapMode.READ),
          b.push([...new Uint8Array(g.getMappedRange(0, 4))]),
          g.unmap());
      }
      return {
        safe: b.every((x) => x.join() === "0,255,0,255"),
        reason: "pixels",
        pixels: b,
      };
    };
  try {
    return await Promise.race([
      o().catch(() => ({ safe: !1, reason: "unavailable" })),
      new Promise((a) => {
        n = setTimeout(() => a({ safe: !1, reason: "timeout" }), t);
      }),
    ]);
  } finally {
    ((s = !1), clearTimeout(n));
    for (let a of e) a.destroy();
  }
}
{
  let i = _d?.prototype;
  if (i && !i.__mindblown) {
    let t = (s) => {
        let n = new ei();
        return (
          (n.mapping = Vf),
          (n.userData.mbEnv = s),
          { texture: n, dispose() {}, isWebGLRenderTarget: !0 }
        );
      },
      e = (s, n) => {
        let o = i[s];
        i[s] = function (...a) {
          return (
            this._renderer?._fallback &&
              (this._renderer = this._renderer._fallback),
            this._renderer?.isMindblownRenderer ? n(...a) : o?.apply(this, a)
          );
        };
      };
    (e("fromEquirectangular", (s) => t(s.userData?.mbEnv || { equirect: s })),
      e("fromCubemap", (s) => t(s.userData?.mbEnv || { cube: s })),
      e("fromScene", (s, n, o, a, r) =>
        t({ scene: s, sigma: n, near: o, far: a, opts: r }),
      ),
      e("compileEquirectangularShader", () => {}),
      e("compileCubemapShader", () => {}),
      (i.__mindblown = !0));
  }
}
