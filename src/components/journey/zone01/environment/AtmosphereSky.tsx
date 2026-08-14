import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { JOURNEY_ASSETS } from '@/data/journeyAssets';

/**
 * AtmosphereSky Component - Malpe Waterfront Digital Twin
 * 
 * Coastal Golden Hour Sunset Atmosphere Architecture:
 * 1. 5200K Sunset Golden Solar & Ambient Lighting Rig:
 *    - Main 5200K directional golden sun (#FFD7A8, intensity 2.6, 12° solar altitude above horizon, 248° azimuth).
 *    - Hemispheric ambient light (#3B629B tropical sky to #5A3525 warm laterite/sand ground bounce, intensity 0.90).
 *    - Secondary ocean crimson-gold counter-bounce fill (#F4A261).
 *    - Warm golden canopy-dappled luminescence across Arrival Gardens, Pavilion, and Promenade.
 * 
 * 2. Coastal Karnataka Horizon Atmosphere & Exponential Fog:
 *    - Calibrated FogExp2 (#F4A261 horizon crimson-pink, density 0.0022) seamlessly blending ocean into sky dome horizon at z: 320..450m.
 *    - Procedural 360° Panoramic Sky Dome with Rayleigh/Mie golden hour scattering gradient:
 *      Zenith Navy (#1B3B6F) -> Tropical Sky (#3B629B) -> Golden Amber (#E07A5F) -> Horizon Crimson-Pink (#F4A261).
 * 
 * 3. St. Mary's Island Columnar Basalt Silhouette (z: 420m, x: -60m):
 *    - Geologically accurate hexagonal columnar basalt formations (vertical 6-sided prisms with stepped cooling joints).
 *    - Crowned with wind-sculpted miniature coconut palm silhouettes.
 *    - Atmospheric aerial perspective depth desaturation under sunset mist.
 * 
 * 4. Dynamic Atmospheric Life:
 *    - High-altitude drifting sunset cloud layers with golden rim highlights.
 *    - Flocking soaring Brahminy sea birds with aerodynamic wing articulation.
 *    - Warm golden afternoon sun motes.
 */

// ==========================================
// 1. PROCEDURAL SKY DOME GRADIENT GENERATOR
// ==========================================

function createSkyGradientTexture(): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return new THREE.Texture();
  }

  const canvas = window.document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Multi-stop Rayleigh & Mie golden hour atmospheric scattering gradient
  // Zenith navy (#1B3B6F) -> Tropical sky (#3B629B) -> Golden amber (#E07A5F) -> Horizon crimson-pink (#F4A261)
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0.0, '#1B3B6F');   // Zenith navy
  grad.addColorStop(0.28, '#3B629B');  // Tropical sky blue
  grad.addColorStop(0.55, '#D96B43');  // Transition golden amber
  grad.addColorStop(0.76, '#E07A5F');  // Deep golden amber
  grad.addColorStop(0.92, '#F4A261');  // Horizon crimson-pink
  grad.addColorStop(1.0, '#F4A261');   // Perfect match to FogExp2 base color (#F4A261)

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  // 5200K Solar glow bloom overlay positioned at sunset solar angle (azimuth 248°, altitude 12°)
  const sunGlow = ctx.createRadialGradient(190, 780, 15, 190, 780, 280);
  sunGlow.addColorStop(0.0, 'rgba(255, 226, 179, 0.65)');
  sunGlow.addColorStop(0.25, 'rgba(244, 162, 97, 0.40)');
  sunGlow.addColorStop(0.65, 'rgba(224, 122, 95, 0.18)');
  sunGlow.addColorStop(1.0, 'rgba(27, 59, 111, 0.0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, 256, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ==========================================
// 2. MAIN ATMOSPHERE & SKY COMPONENT
// ==========================================

export const AtmosphereSky: React.FC = () => {
  const birdsGroupRef = useRef<THREE.Group>(null);
  const cloudsGroupRef = useRef<THREE.Group>(null);
  const motesGroupRef = useRef<THREE.Group>(null);

  const skyTexture = useMemo(() => createSkyGradientTexture(), []);

  // Frame loop for dynamic atmospheric phenomena
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. High-altitude sunset clouds drifting steadily eastward across the Malpe coastline
    if (cloudsGroupRef.current) {
      cloudsGroupRef.current.position.x = ((t * 0.9) % 400) - 200;
      cloudsGroupRef.current.position.z = 210 + Math.sin(t * 0.04) * 15;
    }

    // 2. Flocking sea birds soaring in smooth aerodynamic thermal loops over Malpe bay
    if (birdsGroupRef.current) {
      const birdLoopSpeed = 0.09;
      birdsGroupRef.current.position.x = Math.sin(t * birdLoopSpeed) * 65;
      birdsGroupRef.current.position.z = 250 + Math.cos(t * birdLoopSpeed) * 55;
      birdsGroupRef.current.position.y = 24 + Math.sin(t * 0.22) * 2.8;
      birdsGroupRef.current.rotation.y = -(t * birdLoopSpeed) + Math.PI * 0.5;

      // Animate individual bird wing flex
      birdsGroupRef.current.children.forEach((bird, idx) => {
        const wingL = bird.getObjectByName('WingLeft');
        const wingR = bird.getObjectByName('WingRight');
        if (wingL && wingR) {
          const flap = Math.sin(t * 5.2 + idx * 1.4) * 0.28;
          wingL.rotation.z = -0.35 + flap;
          wingR.rotation.z = 0.35 - flap;
        }
      });
    }

    // 3. Floating atmospheric warm golden sun motes & sea mist shimmer particles
    if (motesGroupRef.current) {
      motesGroupRef.current.children.forEach((mote, idx) => {
        const phase = idx * 0.9;
        mote.position.y += Math.sin(t * 0.8 + phase) * 0.003;
        mote.position.x += Math.cos(t * 0.5 + phase) * 0.002;
      });
    }
  });

  return (
    <group name="Atmosphere_SkyLighting">
      {/* 1. Coastal Karnataka Sunset Calibrated Exponential Sea-Mist Fog */}
      {/* Seamlessly matches horizon crimson-pink (#F4A261) sky dome at z: 320..450m */}
      <fogExp2 attach="fog" args={['#F4A261', 0.0022]} />

      {/* 2. Drei HDRI Sky Fill & Environment Lighting */}
      <Environment
        files={JOURNEY_ASSETS.environment.hdriMap}
        preset="sunset"
        background={false}
      />

      {/* 3. Soft Contact Shadows grounding furniture, laterite plinths, boulders, and palm trunks */}
      <ContactShadows
        position={[0, 0.02, 100]}
        opacity={0.65}
        scale={180}
        blur={2.5}
        far={15}
        color="#2A1B0E"
        name="GroundContactShadows"
      />

      {/* 4. Panoramic Sky Dome (360° Multi-Stop Atmospheric Scattering) */}
      <mesh position={[0, 0, 180]} scale={[-1, 1, 1]} name="PanoramicSkyDome">
        <sphereGeometry args={[520, 48, 32]} />
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
      </mesh>

      {/* 5. 5200K Golden Sunset Solar & Coastal Karnataka Lighting Rig */}
      <CoastalLightingRig />

      {/* 6. St. Mary's Island Columnar Basalt Silhouette (NW Horizon: z ~ 420m, x ~ -60m) */}
      <group position={[-60, 0, 420]} name="StMarysBasaltIsland">
        <StMarysBasaltFormation />
      </group>

      {/* 7. Secondary Basalt Outer Reef Stack (z ~ 455m, x ~ -110m) */}
      <group position={[-110, 0, 455]} scale={[0.65, 0.65, 0.65]} name="StMarysOuterReef">
        <StMarysBasaltFormation />
      </group>

      {/* 8. High-Altitude Drifting Clouds */}
      <group ref={cloudsGroupRef} position={[0, 85, 220]} name="AtmosphericClouds">
        <CloudFormation position={[-90, 0, -50]} scale={38} opacity={0.48} />
        <CloudFormation position={[25, 10, 15]} scale={46} opacity={0.42} />
        <CloudFormation position={[130, -5, -70]} scale={34} opacity={0.46} />
        <CloudFormation position={[-30, 14, 90]} scale={30} opacity={0.38} />
      </group>

      {/* 9. Flocking Coastal Sea Birds (Brahminy Kites / Sea Gulls) */}
      <group ref={birdsGroupRef} position={[0, 24, 250]} name="FlockingSeaBirds">
        <SeaBird position={[0, 0, 0]} scale={1.0} />
        <SeaBird position={[4.2, 1.0, -3.2]} scale={0.92} />
        <SeaBird position={[-3.8, -0.8, -4.5]} scale={0.88} />
        <SeaBird position={[7.5, 1.8, -8.0]} scale={0.85} />
        <SeaBird position={[-7.0, -1.2, -9.0]} scale={0.82} />
      </group>

      {/* 10. Warm Golden Atmospheric Sun Motes */}
      <group ref={motesGroupRef} name="GoldenSunMotes">
        <AtmosphericSunMotes />
      </group>
    </group>
  );
};

// ==========================================
// 3. 5200K GOLDEN SUNLIGHT & LIGHTING RIG
// ==========================================

const CoastalLightingRig: React.FC = () => {
  return (
    <group name="CoastalLightingRig">
      {/* 1. Main 5200K Golden Sun Directional Light (12° Solar Altitude, Azimuth 248°) */}
      {/* Positioned at [-227, 52, -92] for low-angle 12° golden sunset solar direction */}
      <directionalLight
        name="Main5200KSun"
        position={[-227, 52, -92]}
        intensity={2.6}
        color="#FFD7A8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={700}
        shadow-camera-left={-220}
        shadow-camera-right={220}
        shadow-camera-top={220}
        shadow-camera-bottom={-220}
        shadow-bias={-0.00012}
      />

      {/* 2. Hemispheric Ambient Light (Tropical Sky Blue #3B629B to Warm Laterite/Sand Bounce #5A3525) */}
      <hemisphereLight
        name="HemisphereAmbient"
        args={['#3B629B', '#5A3525', 0.90]}
      />

      {/* 3. Global Ambient Baseline Light (Warm Golden Glow Fill) */}
      <ambientLight
        name="GlobalAmbientFill"
        color="#E07A5F"
        intensity={0.38}
      />

      {/* 4. Secondary Ocean Sunset Crimson-Gold Counter-Bounce Fill Light */}
      <directionalLight
        name="OceanCounterBounce"
        position={[120, 30, 180]}
        intensity={0.32}
        color="#F4A261"
      />

      {/* 5. Canopy-Dappled & Garden Luminescence Warm Sunset Point Lights */}
      {/* Arrival Roadside & Garden Approach (z ~ 45m) */}
      <pointLight
        name="GardenApproachFill"
        position={[-12, 6.5, 45]}
        color="#F4A261"
        intensity={0.75}
        distance={38}
        decay={2}
      />

      {/* Arrival Sanctuary & Pavilion Courtyard (z ~ 95m) */}
      <pointLight
        name="PavilionCourtyardFill"
        position={[10, 5.5, 95]}
        color="#E07A5F"
        intensity={0.80}
        distance={35}
        decay={2}
      />

      {/* Canopy Threshold & Shaded Walkway (z ~ 140m) */}
      <pointLight
        name="CanopyThresholdFill"
        position={[-6, 7.0, 140]}
        color="#FFD7A8"
        intensity={0.70}
        distance={36}
        decay={2}
      />

      {/* Jetty & Boarding Promenade Approach (z ~ 210m) */}
      <pointLight
        name="JettyPromenadeFill"
        position={[4, 5.0, 210]}
        color="#F4A261"
        intensity={0.65}
        distance={42}
        decay={2}
      />
    </group>
  );
};

// ==========================================
// 4. ST. MARY'S ISLAND COLUMNAR BASALT
// ==========================================

export const StMarysBasaltFormation: React.FC = () => {
  // Volcanic Basalt Material with subtle PBR roughness and volcanic sheen
  const basaltMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3A4750', // Basalt volcanic stone (softened by sunset mist)
      roughness: 0.94,
      metalness: 0.08,
      flatShading: true // Enhances crisp hexagonal polygonal prism facets
    });
  }, []);

  // Weathered Basalt Cap Material
  const basaltCapMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#46545D',
      roughness: 0.90,
      metalness: 0.06,
      flatShading: true
    });
  }, []);

  // Sunset Shoreline Surf Material with warm reflection tint
  const surfMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#F4A261',
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
  }, []);

  return (
    <group name="StMarysBasaltComplex" scale={[1.4, 1.4, 1.4]}>
      {/* --- A. CENTRAL VOLCANIC COLUMNAR SPUR (High Basalt Pinnacle) --- */}
      {/* Central Spire Column */}
      <mesh position={[0, 9.5, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[4.2, 5.4, 19, 6]} />
      </mesh>
      <mesh position={[0, 19.1, 0]} material={basaltCapMat}>
        <cylinderGeometry args={[3.9, 4.2, 0.4, 6]} />
      </mesh>

      {/* Tier 2 Hexagonal Columns (Stepped Joint Fractures) */}
      <mesh position={[-4.8, 7.5, 1.8]} rotation={[0, 0.35, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 4.0, 15, 6]} />
      </mesh>
      <mesh position={[4.6, 8.2, -1.5]} rotation={[0, -0.45, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[3.6, 4.4, 16.5, 6]} />
      </mesh>
      <mesh position={[1.5, 6.5, 4.8]} rotation={[0, 0.62, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 3.6, 13, 6]} />
      </mesh>
      <mesh position={[-2.2, 7.0, -4.5]} rotation={[0, -0.28, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 3.8, 14, 6]} />
      </mesh>

      {/* --- B. EAST & WEST TERRACED BASALT FLANKS --- */}
      {/* West Flank (Stepping down toward sea) */}
      <mesh position={[-9.2, 5.0, 3.5]} rotation={[0.04, 0.5, 0.03]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.6, 3.4, 10, 6]} />
      </mesh>
      <mesh position={[-13.5, 3.5, 1.2]} rotation={[-0.02, 0.15, -0.04]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 3.0, 7, 6]} />
      </mesh>
      <mesh position={[-17.0, 2.0, 2.5]} rotation={[0, 0.4, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.6, 4, 6]} />
      </mesh>

      {/* East Flank (Cascading Basalt Columns) */}
      <mesh position={[9.0, 5.8, -2.8]} rotation={[-0.03, -0.35, 0.02]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 3.8, 11.5, 6]} />
      </mesh>
      <mesh position={[13.8, 4.2, -0.8]} rotation={[0.02, -0.6, -0.03]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 3.2, 8.5, 6]} />
      </mesh>
      <mesh position={[18.2, 2.4, -2.0]} rotation={[0, -0.2, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.8, 5, 6]} />
      </mesh>

      {/* Outlying North & South Hexagonal Stacks */}
      <mesh position={[3.2, 4.0, -8.5]} rotation={[0.03, 0.2, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.6, 3.4, 8, 6]} />
      </mesh>
      <mesh position={[-5.5, 3.2, 7.8]} rotation={[-0.02, 0.45, 0]} material={basaltMat} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 3.0, 6.5, 6]} />
      </mesh>

      {/* --- C. WIND-SCULPTED COCONUT PALM SILHOUETTES (Coconut Island) --- */}
      <group position={[0, 19.3, 0]} name="StMarysPalmCrowns">
        <MiniatureWindBlownPalm position={[0.6, 0, 0.4]} scale={0.75} lean={0.24} yaw={0.3} />
        <MiniatureWindBlownPalm position={[-1.2, -0.2, -0.5]} scale={0.65} lean={0.32} yaw={1.1} />
        <MiniatureWindBlownPalm position={[1.4, -0.3, -0.8]} scale={0.6} lean={0.28} yaw={2.2} />
      </group>

      {/* West Terrace Palms */}
      <group position={[-9.2, 10.0, 3.5]}>
        <MiniatureWindBlownPalm position={[0, 0, 0]} scale={0.55} lean={0.35} yaw={0.7} />
      </group>

      {/* East Terrace Palms */}
      <group position={[9.0, 11.5, -2.8]}>
        <MiniatureWindBlownPalm position={[0, 0, 0]} scale={0.58} lean={0.30} yaw={-0.5} />
      </group>

      {/* --- D. ARABIAN SEA BREAKING FOAM & SURF RINGS --- */}
      {/* Foam base mist where ocean waves impact the basalt column bases */}
      <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]} material={surfMat}>
        <ringGeometry args={[14, 23, 24]} />
      </mesh>
      <mesh position={[-12, 0.22, 2]} rotation={[-Math.PI / 2, 0, 0]} material={surfMat}>
        <ringGeometry args={[6, 12, 18]} />
      </mesh>
      <mesh position={[12, 0.22, -1.5]} rotation={[-Math.PI / 2, 0, 0]} material={surfMat}>
        <ringGeometry args={[6, 13, 18]} />
      </mesh>
    </group>
  );
};

// ==========================================
// 5. MINIATURE WIND-BLOWN PALM SILHOUETTE
// ==========================================

interface MiniPalmProps {
  position: [number, number, number];
  scale: number;
  lean: number;
  yaw: number;
}

const MiniatureWindBlownPalm: React.FC<MiniPalmProps> = ({ position, scale, lean, yaw }) => {
  // Dark silhouette material with subtle deep-green foliage tint
  const trunkMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: '#2B332C' });
  }, []);

  const frondMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: '#202A22', side: THREE.DoubleSide });
  }, []);

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, yaw, 0]}>
      {/* Wind-curved trunk leaning away from monsoon sea breeze */}
      <mesh position={[lean * 3.5, 4.0, 0]} rotation={[0, 0, -lean]} material={trunkMat}>
        <cylinderGeometry args={[0.22, 0.45, 8.0, 5]} />
      </mesh>

      {/* Radial Palm Frond Canopy Silhouette */}
      <group position={[lean * 7.0, 7.8, 0]}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const droop = 0.38 + (idx % 2) * 0.12;
          return (
            <mesh
              key={idx}
              position={[Math.cos(rad) * 1.8, -Math.sin(droop) * 0.7, Math.sin(rad) * 1.8]}
              rotation={[Math.sin(rad) * droop, rad, Math.cos(rad) * droop]}
              material={frondMat}
            >
              <planeGeometry args={[3.8, 0.85]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// ==========================================
// 6. HIGH-ALTITUDE DRIFTING CLOUDS
// ==========================================

interface CloudProps {
  position: [number, number, number];
  scale: number;
  opacity: number;
}

const CloudFormation: React.FC<CloudProps> = ({ position, scale, opacity }) => {
  const cloudMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#FFE8D6',
      transparent: true,
      opacity: opacity,
      depthWrite: false
    });
  }, [opacity]);

  return (
    <group position={position} scale={[scale * 2.4, scale * 0.55, scale * 1.5]}>
      <mesh material={cloudMat} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 14, 12]} />
      </mesh>
      <mesh material={cloudMat} position={[-0.45, -0.1, 0.2]} scale={[0.7, 0.7, 0.7]}>
        <sphereGeometry args={[1, 12, 10]} />
      </mesh>
      <mesh material={cloudMat} position={[0.5, 0.05, -0.15]} scale={[0.75, 0.75, 0.75]}>
        <sphereGeometry args={[1, 12, 10]} />
      </mesh>
      <mesh material={cloudMat} position={[0.85, -0.12, 0.1]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[1, 10, 8]} />
      </mesh>
    </group>
  );
};

// ==========================================
// 7. SOARING BRAHMINY SEA BIRDS
// ==========================================

interface SeaBirdProps {
  position: [number, number, number];
  scale: number;
}

const SeaBird: React.FC<SeaBirdProps> = ({ position, scale }) => {
  const birdMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#FAF8F4',
      side: THREE.DoubleSide
    });
  }, []);

  const wingTipMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#524A42',
      side: THREE.DoubleSide
    });
  }, []);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Streamlined Bird Body */}
      <mesh material={birdMat} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.16, 1.2, 5]} />
      </mesh>

      {/* Articulated Left Wing */}
      <group name="WingLeft" position={[-0.12, 0, 0.1]}>
        <mesh material={birdMat} position={[-0.65, 0, -0.1]} rotation={[0, 0, -0.35]}>
          <planeGeometry args={[1.3, 0.38]} />
        </mesh>
        {/* Dark Primary Feather Tips */}
        <mesh material={wingTipMat} position={[-1.35, -0.18, -0.18]} rotation={[0, 0, -0.5]}>
          <planeGeometry args={[0.5, 0.26]} />
        </mesh>
      </group>

      {/* Articulated Right Wing */}
      <group name="WingRight" position={[0.12, 0, 0.1]}>
        <mesh material={birdMat} position={[0.65, 0, -0.1]} rotation={[0, 0, 0.35]}>
          <planeGeometry args={[1.3, 0.38]} />
        </mesh>
        {/* Dark Primary Feather Tips */}
        <mesh material={wingTipMat} position={[1.35, -0.18, -0.18]} rotation={[0, 0, 0.5]}>
          <planeGeometry args={[0.5, 0.26]} />
        </mesh>
      </group>
    </group>
  );
};

// ==========================================
// 8. ATMOSPHERIC GOLDEN SUN MOTES
// ==========================================

const AtmosphericSunMotes: React.FC = () => {
  const motePositions = useMemo(() => {
    const coords: [number, number, number][] = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = 1.5 + Math.random() * 9.0;
      const z = Math.random() * 240;
      coords.push([x, y, z]);
    }
    return coords;
  }, []);

  const moteMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#FFD7A8',
      transparent: true,
      opacity: 0.65
    });
  }, []);

  return (
    <group name="SunMotesParticles">
      {motePositions.map((pos, idx) => (
        <mesh key={idx} position={pos} material={moteMat} scale={[0.14, 0.14, 0.14]}>
          <sphereGeometry args={[1, 6, 6]} />
        </mesh>
      ))}
    </group>
  );
};

export default AtmosphereSky;
