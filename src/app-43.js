// app 43 — uniforms
// Lines 59419-59691 of readable/app.pretty.js (statement-aligned).
function Iu(o) {
  if (!o) return !1;
  let t = o.name || o.constructor?.name || "";
  return (
    t === "GPUOutOfMemoryError" ||
    /out[ -]of[ -]memory|unable to create (?:a )?(?:buffer|texture)|failed to allocate.*(?:buffer|texture|memory)/i.test(
      String(o.message || o),
    ) ||
    (t === "InvalidStateError" &&
      /^GPU\w+\.\w+: Unable to/.test(String(o.message || ""))) ||
    (o.cause && o.cause !== o ? Iu(o.cause) : !1)
  );
}
function D5(o = {}) {
  let t = o.curve ?? 0;
  return {
    ...o,
    saturation: (1 + (o.saturation ?? 0)) * 1.22 - 1,
    vibrance: (o.vibrance ?? 0) + 0.14,
    curve: t + (1 - t) * 0.08,
  };
}
es();
var ek = class extends ye {
  constructor(t, e = {}) {
    (super(t), (this.isWater = !0));
    let s = this,
      n = e.textureWidth !== void 0 ? e.textureWidth : 512,
      i = e.textureHeight !== void 0 ? e.textureHeight : 512,
      a = e.clipBias !== void 0 ? e.clipBias : 0,
      r = e.alpha !== void 0 ? e.alpha : 1,
      l = e.time !== void 0 ? e.time : 0,
      c = e.waterNormals !== void 0 ? e.waterNormals : null,
      h =
        e.sunDirection !== void 0
          ? e.sunDirection
          : new dt(0.70707, 0.70707, 0),
      f = new It(e.sunColor !== void 0 ? e.sunColor : 16777215),
      u = new It(e.waterColor !== void 0 ? e.waterColor : 8355711),
      d = e.eye !== void 0 ? e.eye : new dt(0, 0, 0),
      p = e.distortionScale !== void 0 ? e.distortionScale : 20,
      m = e.side !== void 0 ? e.side : $a,
      g = e.fog !== void 0 ? e.fog : !1,
      b = new V0(),
      v = new dt(),
      x = new dt(),
      y = new dt(),
      M = new fe(),
      S = new dt(0, 0, -1),
      w = new zi(),
      _ = new dt(),
      z = new dt(),
      A = new zi(),
      T = new fe(),
      E = new Ji(),
      R = new sa(n, i, { type: ga }),
      P = {
        name: "MirrorShader",
        uniforms: lf.merge([
          Fs.fog,
          Fs.lights,
          {
            normalSampler: { value: null },
            mirrorSampler: { value: null },
            alpha: { value: 1 },
            time: { value: 0 },
            size: { value: 1 },
            distortionScale: { value: 20 },
            textureMatrix: { value: new fe() },
            sunColor: { value: new It(8355711) },
            sunDirection: { value: new dt(0.70707, 0.70707, 0) },
            eye: { value: new dt() },
            waterColor: { value: new It(5592405) },
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
      C = new jo({
        name: P.name,
        uniforms: lf.clone(P.uniforms),
        vertexShader: P.vertexShader,
        fragmentShader: P.fragmentShader,
        lights: !0,
        side: m,
        fog: g,
      });
    ((C.uniforms.mirrorSampler.value = R.texture),
      (C.uniforms.textureMatrix.value = T),
      (C.uniforms.alpha.value = r),
      (C.uniforms.time.value = l),
      (C.uniforms.normalSampler.value = c),
      (C.uniforms.sunColor.value = f),
      (C.uniforms.waterColor.value = u),
      (C.uniforms.sunDirection.value = h),
      (C.uniforms.distortionScale.value = p),
      (C.uniforms.eye.value = d),
      (s.material = C),
      (s.onBeforeRender = function (I, L, F) {
        if (
          (x.setFromMatrixPosition(s.matrixWorld),
          y.setFromMatrixPosition(F.matrixWorld),
          M.extractRotation(s.matrixWorld),
          v.set(0, 0, 1),
          v.applyMatrix4(M),
          _.subVectors(x, y),
          _.dot(v) > 0)
        )
          return;
        (_.reflect(v).negate(),
          _.add(x),
          M.extractRotation(F.matrixWorld),
          S.set(0, 0, -1),
          S.applyMatrix4(M),
          S.add(y),
          z.subVectors(x, S),
          z.reflect(v).negate(),
          z.add(x),
          E.position.copy(_),
          E.up.set(0, 1, 0),
          E.up.applyMatrix4(M),
          E.up.reflect(v),
          E.lookAt(z),
          (E.far = F.far),
          E.updateMatrixWorld(),
          E.projectionMatrix.copy(F.projectionMatrix),
          T.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
          T.multiply(E.projectionMatrix),
          T.multiply(E.matrixWorldInverse),
          b.setFromNormalAndCoplanarPoint(v, x),
          b.applyMatrix4(E.matrixWorldInverse),
          w.set(b.normal.x, b.normal.y, b.normal.z, b.constant));
        let O = E.projectionMatrix;
        ((A.x = (Math.sign(w.x) + O.elements[8]) / O.elements[0]),
          (A.y = (Math.sign(w.y) + O.elements[9]) / O.elements[5]),
          (A.z = -1),
          (A.w = (1 + O.elements[10]) / O.elements[14]),
          w.multiplyScalar(2 / w.dot(A)),
          (O.elements[2] = w.x),
          (O.elements[6] = w.y),
          (O.elements[10] = w.z + 1 - a),
          (O.elements[14] = w.w),
          d.setFromMatrixPosition(F.matrixWorld));
        let B = I.getRenderTarget(),
          H = I.xr.enabled,
          N = I.shadowMap.autoUpdate;
        ((s.visible = !1),
          (I.xr.enabled = !1),
          (I.shadowMap.autoUpdate = !1),
          I.setRenderTarget(R),
          I.state.buffers.depth.setMask(!0),
          I.autoClear === !1 && I.clear(),
          I.render(L, E),
          (s.visible = !0),
          (I.xr.enabled = H),
          (I.shadowMap.autoUpdate = N),
          I.setRenderTarget(B));
        let D = F.viewport;
        D !== void 0 && I.state.viewport(D);
      }));
  }
};
es();
var U5 = class o extends ye {
  constructor() {
    let t = o.SkyShader,
      e = new jo({
        name: t.name,
        uniforms: lf.clone(t.uniforms),
        vertexShader: t.vertexShader,
        fragmentShader: t.fragmentShader,
        side: pa,
        depthWrite: !1,
      });
    (super(new Is(1, 1, 1), e), (this.isSky = !0));
  }
};
