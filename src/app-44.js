// app 44 — uniforms
// Lines 59192-59460 of readable/app.pretty.js (statement-aligned).
function Bg(i) {
  return i
    ? (i.name || i.constructor?.name || "") === "GPUOutOfMemoryError" ||
        /out[ -]of[ -]memory|unable to create (?:a )?(?:buffer|texture)|failed to allocate.*(?:buffer|texture|memory)/i.test(
          String(i.message || i),
        ) ||
        (i.cause && i.cause !== i ? Bg(i.cause) : !1)
    : !1;
}
function j5(i = {}) {
  let t = i.curve ?? 0;
  return {
    ...i,
    saturation: (1 + (i.saturation ?? 0)) * 1.22 - 1,
    vibrance: (i.vibrance ?? 0) + 0.14,
    curve: t + (1 - t) * 0.08,
  };
}
as();
var Q6 = class extends _e {
  constructor(t, e = {}) {
    (super(t), (this.isWater = !0));
    let s = this,
      n = e.textureWidth !== void 0 ? e.textureWidth : 512,
      o = e.textureHeight !== void 0 ? e.textureHeight : 512,
      a = e.clipBias !== void 0 ? e.clipBias : 0,
      r = e.alpha !== void 0 ? e.alpha : 1,
      l = e.time !== void 0 ? e.time : 0,
      c = e.waterNormals !== void 0 ? e.waterNormals : null,
      h =
        e.sunDirection !== void 0
          ? e.sunDirection
          : new xt(0.70707, 0.70707, 0),
      f = new $t(e.sunColor !== void 0 ? e.sunColor : 16777215),
      u = new $t(e.waterColor !== void 0 ? e.waterColor : 8355711),
      d = e.eye !== void 0 ? e.eye : new xt(0, 0, 0),
      p = e.distortionScale !== void 0 ? e.distortionScale : 20,
      m = e.side !== void 0 ? e.side : Fa,
      g = e.fog !== void 0 ? e.fog : !1,
      b = new x0(),
      x = new xt(),
      v = new xt(),
      y = new xt(),
      M = new ye(),
      S = new xt(0, 0, -1),
      w = new fi(),
      z = new xt(),
      _ = new xt(),
      R = new fi(),
      T = new ye(),
      E = new Di(),
      A = new Vo(n, o, { type: aa }),
      C = {
        name: "MirrorShader",
        uniforms: Lh.merge([
          Cs.fog,
          Cs.lights,
          {
            normalSampler: { value: null },
            mirrorSampler: { value: null },
            alpha: { value: 1 },
            time: { value: 0 },
            size: { value: 1 },
            distortionScale: { value: 20 },
            textureMatrix: { value: new ye() },
            sunColor: { value: new $t(8355711) },
            sunDirection: { value: new xt(0.70707, 0.70707, 0) },
            eye: { value: new xt() },
            waterColor: { value: new $t(5592405) },
          },
        ]),
        vertexShader: `
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,
        fragmentShader: `
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.02;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), reflectionSample + specularLight, reflectance );
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`,
      },
      P = new Bo({
        name: C.name,
        uniforms: Lh.clone(C.uniforms),
        vertexShader: C.vertexShader,
        fragmentShader: C.fragmentShader,
        lights: !0,
        side: m,
        fog: g,
      });
    ((P.uniforms.mirrorSampler.value = A.texture),
      (P.uniforms.textureMatrix.value = T),
      (P.uniforms.alpha.value = r),
      (P.uniforms.time.value = l),
      (P.uniforms.normalSampler.value = c),
      (P.uniforms.sunColor.value = f),
      (P.uniforms.waterColor.value = u),
      (P.uniforms.sunDirection.value = h),
      (P.uniforms.distortionScale.value = p),
      (P.uniforms.eye.value = d),
      (s.material = P),
      (s.onBeforeRender = function (I, L, F) {
        if (
          (v.setFromMatrixPosition(s.matrixWorld),
          y.setFromMatrixPosition(F.matrixWorld),
          M.extractRotation(s.matrixWorld),
          x.set(0, 0, 1),
          x.applyMatrix4(M),
          z.subVectors(v, y),
          z.dot(x) > 0)
        )
          return;
        (z.reflect(x).negate(),
          z.add(v),
          M.extractRotation(F.matrixWorld),
          S.set(0, 0, -1),
          S.applyMatrix4(M),
          S.add(y),
          _.subVectors(v, S),
          _.reflect(x).negate(),
          _.add(v),
          E.position.copy(z),
          E.up.set(0, 1, 0),
          E.up.applyMatrix4(M),
          E.up.reflect(x),
          E.lookAt(_),
          (E.far = F.far),
          E.updateMatrixWorld(),
          E.projectionMatrix.copy(F.projectionMatrix),
          T.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
          T.multiply(E.projectionMatrix),
          T.multiply(E.matrixWorldInverse),
          b.setFromNormalAndCoplanarPoint(x, v),
          b.applyMatrix4(E.matrixWorldInverse),
          w.set(b.normal.x, b.normal.y, b.normal.z, b.constant));
        let N = E.projectionMatrix;
        ((R.x = (Math.sign(w.x) + N.elements[8]) / N.elements[0]),
          (R.y = (Math.sign(w.y) + N.elements[9]) / N.elements[5]),
          (R.z = -1),
          (R.w = (1 + N.elements[10]) / N.elements[14]),
          w.multiplyScalar(2 / w.dot(R)),
          (N.elements[2] = w.x),
          (N.elements[6] = w.y),
          (N.elements[10] = w.z + 1 - a),
          (N.elements[14] = w.w),
          d.setFromMatrixPosition(F.matrixWorld));
        let B = I.getRenderTarget(),
          H = I.xr.enabled,
          O = I.shadowMap.autoUpdate;
        ((s.visible = !1),
          (I.xr.enabled = !1),
          (I.shadowMap.autoUpdate = !1),
          I.setRenderTarget(A),
          I.state.buffers.depth.setMask(!0),
          I.autoClear === !1 && I.clear(),
          I.render(L, E),
          (s.visible = !0),
          (I.xr.enabled = H),
          (I.shadowMap.autoUpdate = O),
          I.setRenderTarget(B));
        let D = F.viewport;
        D !== void 0 && I.state.viewport(D);
      }));
  }
};
as();
var V5 = class i extends _e {
  constructor() {
    let t = i.SkyShader,
      e = new Bo({
        name: t.name,
        uniforms: Lh.clone(t.uniforms),
        vertexShader: t.vertexShader,
        fragmentShader: t.fragmentShader,
        side: ia,
        depthWrite: !1,
      });
    (super(new qs(1, 1, 1), e), (this.isSky = !0));
  }
};
