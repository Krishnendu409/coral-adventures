import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * OceanWater Component
 * High-fidelity Arabian Sea Living Water Engine for Malpe Digital Twin:
 * 
 * 1. Multi-Harmonic Gerstner Wave Displacement:
 *    - Deep Arabian Swell (24m wavelength, steepness 0.22, shoreward propagation)
 *    - Coastal Medium Chop (12m wavelength, steepness 0.18)
 *    - Capillary Ripple Harmonics (4m & 2.4m wavelengths for micro-facets)
 *    - Exact analytical tangent/binormal calculations for accurate surface normals
 * 
 * 2. PBR Optical Characteristics & Depth Shading:
 *    - Color Depth Gradient: Crystal Coastal Turquoise (#1FA7A6) in shallows (Z: 195m..220m)
 *      transitioning to Deep Sapphire Navy (#071A2B) in open waters (Z > 240m)
 *    - Full Schlick Fresnel Reflectance: High reflectivity at glancing angles, exposing
 *      translucent turquoise shallows & illuminated sandbars at steep incidence
 *    - Dual-Lobe Sun Specular Glint: Calibrated for 5500K golden sunlight (#FFF4E0)
 * 
 * 3. Dynamic Shoreline Foam & Wave Crest Caustics:
 *    - Procedural Voronoi caustics and breaking whitecap crests on peaked wave summits
 *    - Dynamic oscillating intertidal surf foam band matching swell period
 * 
 * 4. Strict Anti-Primitive Rules & Seamless Shoreline Blending:
 *    - High-density subdivided mesh (160x160 vertices)
 *    - Soft edge alpha fade (Z: 193m..203m) blending seamlessly with MalpeTerrain.tsx
 */

export const OceanWater: React.FC = () => {
  const waterMeshRef = useRef<THREE.Mesh>(null);
  const surfFoamRef = useRef<THREE.Mesh>(null);
  const sandbarCausticsRef = useRef<THREE.Mesh>(null);

  const { waterMaterial, surfFoamMaterial, causticsMaterial } = useMemo(() => {
    // 1. Primary Arabian Sea Water Shader
    const uniforms = {
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#071A2B') },      // Deep Sapphire Navy
      uShallowColor: { value: new THREE.Color('#1FA7A6') },   // Crystal Coastal Turquoise
      uUltraShallowColor: { value: new THREE.Color('#2ED1C8') }, // Bright Aqua Shallows
      uSubmergedSandColor: { value: new THREE.Color('#DEC4A0') }, // Illuminated Sandbar Tone
      uSunColor: { value: new THREE.Color('#FFF4E0') },       // 5500K Golden Sun Glint
      uSkyColor: { value: new THREE.Color('#98C4DB') },       // Atmospheric Sky Reflection
      uFoamColor: { value: new THREE.Color('#F6FAFC') },      // Crisp Ocean Spray Foam
      uSunDirection: { value: new THREE.Vector3(0.45, 0.75, -0.48).normalize() }
    };

    const vertexShader = `
      uniform float uTime;
      
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying float vWaveCrest;
      varying float vDepthFactor;
      varying float vShoreFade;

      struct WaveHarmonic {
        vec2 dir;
        float steepness;
        float wavelength;
        float speed;
      };

      // Gerstner Wave Mathematical Displacement & Normal Formulation
      vec3 calculateGerstner(WaveHarmonic w, vec3 p, inout vec3 tangent, inout vec3 binormal) {
        float k = 2.0 * 3.14159265359 / w.wavelength;
        float c = sqrt(9.80665 / k) * w.speed;
        vec2 d = normalize(w.dir);
        float f = k * (dot(d, p.xz) - c * uTime);
        float a = w.steepness / k;

        float sinF = sin(f);
        float cosF = cos(f);

        // Analytical Tangent Derivatives
        tangent += vec3(
          -d.x * d.x * (w.steepness * sinF),
          d.x * (w.steepness * cosF),
          -d.x * d.y * (w.steepness * sinF)
        );

        // Analytical Binormal Derivatives
        binormal += vec3(
          -d.x * d.y * (w.steepness * sinF),
          d.y * (w.steepness * cosF),
          -d.y * d.y * (w.steepness * sinF)
        );

        // Horizontal and Vertical Displacements
        return vec3(
          d.x * (a * cosF),
          a * sinF,
          d.y * (a * cosF)
        );
      }

      void main() {
        vUv = uv;
        vec3 p = position;
        vec3 tangent = vec3(1.0, 0.0, 0.0);
        vec3 binormal = vec3(0.0, 0.0, 1.0);

        // World-space coordinate approximation before displacement
        vec4 initialWorldPos = modelMatrix * vec4(p, 1.0);

        // Shoreline wave dampening: gently reduce wave displacement in ultra-shallows
        // to ensure zero clipping with sloping beach sand (Z: 190m..218m)
        float shoreDamp = smoothstep(192.0, 218.0, initialWorldPos.z);

        // Multi-frequency wave harmonics:
        // 1. Primary Deep Arabian Sea Swell (24m wavelength, long shoreward swell)
        WaveHarmonic wave1 = WaveHarmonic(vec2(0.20, -0.98), 0.22 * shoreDamp, 24.0, 0.65);
        // 2. Coastal Medium Chop (12m wavelength)
        WaveHarmonic wave2 = WaveHarmonic(vec2(-0.35, -0.94), 0.18 * shoreDamp, 12.0, 0.78);
        // 3. Capillary Ripples (4m wavelength)
        WaveHarmonic wave3 = WaveHarmonic(vec2(0.50, -0.86), 0.12 * shoreDamp, 4.0, 1.15);
        // 4. Secondary Cross-Swell (16m wavelength)
        WaveHarmonic wave4 = WaveHarmonic(vec2(-0.12, -0.99), 0.14 * shoreDamp, 16.0, 0.70);
        // 5. High-Frequency Micro-Texture Ripple (2.4m wavelength)
        WaveHarmonic wave5 = WaveHarmonic(vec2(0.65, -0.76), 0.06 * shoreDamp, 2.4, 1.45);

        vec3 displacement = vec3(0.0);
        displacement += calculateGerstner(wave1, p, tangent, binormal);
        displacement += calculateGerstner(wave2, p, tangent, binormal);
        displacement += calculateGerstner(wave3, p, tangent, binormal);
        displacement += calculateGerstner(wave4, p, tangent, binormal);
        displacement += calculateGerstner(wave5, p, tangent, binormal);

        p += displacement;

        // Accurate Orthogonal Surface Normal
        vec3 normal = normalize(cross(binormal, tangent));
        vNormal = normal;

        vec4 worldPos = modelMatrix * vec4(p, 1.0);
        vWorldPosition = worldPos.xyz;

        // Crest height metric for dynamic whitecap breaking foam
        vWaveCrest = displacement.y;

        // Color depth gradient factor: Shoreline shallows (Z: 195m..220m) to Deep Ocean (Z > 240m)
        vDepthFactor = smoothstep(195.0, 242.0, worldPos.z);

        // Shoreline edge soft alpha blending
        vShoreFade = smoothstep(193.0, 203.0, worldPos.z);

        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uDeepColor;
      uniform vec3 uShallowColor;
      uniform vec3 uUltraShallowColor;
      uniform vec3 uSubmergedSandColor;
      uniform vec3 uSunColor;
      uniform vec3 uSkyColor;
      uniform vec3 uFoamColor;
      uniform vec3 uSunDirection;

      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying float vWaveCrest;
      varying float vDepthFactor;
      varying float vShoreFade;

      // Hash function for procedural Voronoi caustics
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      // 2D Cellular Voronoi Noise
      float voronoi(vec2 p) {
        vec2 n = floor(p);
        vec2 f = fract(p);
        float minD = 8.0;
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            o = 0.5 + 0.5 * sin(uTime * 1.4 + 6.2831853 * o);
            vec2 r = g + o - f;
            float d = dot(r, r);
            if (d < minD) {
              minD = d;
            }
          }
        }
        return sqrt(minD);
      }

      // Multi-layer Animated Caustic Patterns
      float getCaustics(vec2 uv, float time) {
        vec2 p1 = uv * 3.8 + vec2(time * 0.14, time * 0.09);
        vec2 p2 = uv * 4.6 - vec2(time * 0.11, -time * 0.16);
        float c1 = voronoi(p1);
        float c2 = voronoi(p2);
        return pow(1.0 - abs(c1 - c2), 3.2);
      }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        vec3 normal = normalize(vNormal);

        // 1. Water Depth Color Gradient
        // Ultra-shallow aqua (#2ED1C8) -> Coastal Turquoise (#1FA7A6) -> Deep Sapphire Navy (#071A2B)
        float shallowGrad = smoothstep(195.0, 218.0, vWorldPosition.z);
        vec3 shallowColor = mix(uUltraShallowColor, uShallowColor, shallowGrad);
        vec3 baseWaterColor = mix(shallowColor, uDeepColor, vDepthFactor);

        // Steep incidence illumination: in clear shallows, expose illuminated sandbars
        float NdotV = clamp(dot(normal, viewDir), 0.0, 1.0);
        float steepnessGaze = pow(NdotV, 2.0);
        if (vDepthFactor < 0.55) {
          float sandbarExposure = (1.0 - vDepthFactor / 0.55) * steepnessGaze * 0.45;
          baseWaterColor = mix(baseWaterColor, uSubmergedSandColor, sandbarExposure);
        }

        // 2. Submerged Sunlight Caustics in Shallows
        if (vDepthFactor < 0.7) {
          float caustics = getCaustics(vWorldPosition.xz * 0.22, uTime * 0.85);
          float causticIntensity = (1.0 - vDepthFactor) * caustics * 0.42;
          baseWaterColor += vec3(0.18, 0.38, 0.32) * causticIntensity;
        }

        // 3. PBR Fresnel Reflectance (Schlick Approximation)
        float fresnel = pow(1.0 - NdotV, 4.5);
        vec3 skyReflect = mix(uSkyColor, vec3(0.96, 0.98, 1.0), fresnel * 0.55);
        vec3 waterSurface = mix(baseWaterColor, skyReflect, fresnel * 0.72);

        // 4. Sun Specular Highlights (5500K Golden Sun Glint)
        vec3 halfVector = normalize(uSunDirection + viewDir);
        float NdotH = max(0.0, dot(normal, halfVector));
        float sharpSpecular = pow(NdotH, 380.0) * 3.4;
        float broadSpecular = pow(NdotH, 56.0) * 0.65;
        vec3 sunGlint = uSunColor * (sharpSpecular + broadSpecular);

        // 5. Dynamic Wave Crest Whitecaps & Breaking Foam
        float crestThreshold = smoothstep(0.14, 0.34, vWaveCrest);
        float foamNoise = voronoi(vWorldPosition.xz * 0.45 + vec2(uTime * 0.25));
        float crestWhitecaps = crestThreshold * smoothstep(0.28, 0.72, foamNoise) * 0.88;

        // 6. Dynamic Intertidal Shoreline Swash Foam
        float swashCycle = 204.0 + sin(uTime * 0.62) * 4.2 + sin(uTime * 1.25) * 1.5;
        float shoreProximity = 1.0 - smoothstep(swashCycle - 2.8, swashCycle + 5.5, vWorldPosition.z);
        float shoreNoise = voronoi(vWorldPosition.xz * 0.65 - vec2(0.0, uTime * 0.3));
        float shoreSurfFoam = shoreProximity * smoothstep(0.2, 0.75, shoreNoise) * smoothstep(193.0, 198.0, vWorldPosition.z);

        float totalFoam = clamp(crestWhitecaps + shoreSurfFoam * 0.95, 0.0, 1.0);

        // 7. Final Composite Color & Soft Boundary Blending
        vec3 finalColor = mix(waterSurface, uFoamColor, totalFoam);
        finalColor += sunGlint * (1.0 - totalFoam * 0.45);

        // Alpha calculation: feathered at shoreline edge (Z: 193m..203m) with deep water opacity (0.92)
        float alpha = vShoreFade * (0.84 + 0.12 * vDepthFactor);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const waterMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    // 2. Intertidal Dynamic Shoreline Foam Band Material
    const surfFoamMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uFoamColor: { value: new THREE.Color('#FFFFFF') },
        uTranslucentColor: { value: new THREE.Color('#E0F4F7') }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 p = position;
          // Gentle wave motion across foam band
          p.z += sin(p.x * 0.08 + uTime * 1.2) * 0.6;
          p.y += sin(p.x * 0.15 + uTime * 0.8) * 0.04;
          vec4 worldPos = modelMatrix * vec4(p, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uFoamColor;
        uniform vec3 uTranslucentColor;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          // Bubbly lace pattern along edge of swash
          float n = hash(floor(vUv * vec2(80.0, 16.0) + vec2(uTime * 0.5, 0.0)));
          float edgeAlpha = sin(vUv.x * 3.14159) * (1.0 - abs(vUv.y * 2.0 - 1.0));
          float bubbleFoam = smoothstep(0.3, 0.8, n) * edgeAlpha;
          vec3 col = mix(uTranslucentColor, uFoamColor, bubbleFoam);
          gl_FragColor = vec4(col, bubbleFoam * 0.75);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    // 3. Submerged Sandbar Caustics Ribbon Material
    const causticsMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uCausticColor: { value: new THREE.Color('#48E0D2') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uCausticColor;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          float t = uTime * 0.8;
          vec2 p = vWorldPos.xz * 0.25;
          float c1 = sin(p.x * 3.0 + t) * cos(p.y * 3.0 + t);
          float c2 = cos(p.x * 4.2 - t * 0.8) * sin(p.y * 4.2 - t * 0.8);
          float caustic = pow(clamp(c1 + c2, 0.0, 1.0), 2.5);
          float edgeAlpha = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
          gl_FragColor = vec4(uCausticColor, caustic * edgeAlpha * 0.35);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    return {
      waterMaterial: waterMat,
      surfFoamMaterial: surfFoamMat,
      causticsMaterial: causticsMat
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterMaterial) {
      waterMaterial.uniforms.uTime.value = t;
    }
    if (surfFoamMaterial) {
      surfFoamMaterial.uniforms.uTime.value = t;
    }
    if (causticsMaterial) {
      causticsMaterial.uniforms.uTime.value = t;
    }

    // Dynamic oscillating swash motion for the physical shoreline foam ribbon
    if (surfFoamRef.current) {
      surfFoamRef.current.position.z = 208.5 + Math.sin(t * 0.62) * 3.8 + Math.sin(t * 1.25) * 1.2;
      surfFoamRef.current.scale.x = 1.0 + Math.sin(t * 0.9) * 0.04;
    }
  });

  return (
    <group name="ArabianSea_OceanWater">
      {/* 1. Primary Continuous Arabian Sea Ocean Surface with Gerstner Waves */}
      <mesh
        ref={waterMeshRef}
        position={[0, -0.32, 335]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={waterMaterial}
      >
        <planeGeometry args={[360, 300, 160, 160]} />
      </mesh>

      {/* 2. Dynamic Intertidal Surf Foam Swash Ribbon */}
      <mesh
        ref={surfFoamRef}
        position={[0, -0.28, 208.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={surfFoamMaterial}
      >
        <planeGeometry args={[180, 5.5, 64, 4]} />
      </mesh>

      {/* 3. Submerged Sandbar Caustics Ribbon */}
      <mesh
        ref={sandbarCausticsRef}
        position={[0, -0.42, 218]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={causticsMaterial}
      >
        <planeGeometry args={[200, 18, 32, 4]} />
      </mesh>
    </group>
  );
};
