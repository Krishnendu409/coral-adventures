import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * MarineCraft Component
 * Authentic Coastal Karnataka & Luxury Marine Fleet for Malpe Waterfront Digital Twin:
 * 
 * 1. Traditional Malpe Wooden Fishing Trawlers (Deep harbour approach & outer bay)
 *    - Authentic Coastal Karnataka Livery: Deep maritime blue (#1C4E80), white waterline band (#F4F6F9),
 *      rust-red copper anti-fouling keel (#8B3A2B), saffron-gold gunwale rails (#E5A93C).
 *    - Deep-draft curved wooden hull, stempost, skeg keel, hanging rudder with bronze pintles, rubber tire fenders.
 *    - Raised timber forecastle with heavy mooring H-bitts, cast-iron anchor windlass, hawse pipe, stowed Danforth anchor, rope coils.
 *    - Central wheelhouse deck cabin in sea-salt ivory (#F5EFEB), forward-raked bridge windows, brass portholes, searchlight,
 *      masthead/nav lights, loudhailer horn, orange safety lifebuoys.
 *    - Aft working deck with structural A-frame trawler gantry, dual-drum hydraulic winch, net drum with mesh and floats,
 *      stacked HDPE fish crates (blue, orange, yellow), crab pots, dry exhaust stack with rain cap, life-raft canister.
 *    - Dynamic multi-harmonic ocean wave swell bobbing physics (pitch, roll, heave, sway).
 * 
 * 2. Active Coastal Watersports & High-Altitude Towing Parasail (Z: 260m..400m)
 *    - High-altitude colorful parasail canopy (Y=45m, Z=400m) with multi-colored arch panels (saffron, orange, crimson, turquoise),
 *      suspension lines, spreader bar, and tandem passenger figures in buoyancy safety vests dangling in harness.
 *    - 7.5M offshore speed boat tow vessel with outboard motors, windshield, driver in life vest, stern winch arch, and dynamic tow line.
 *    - 2 active Sea-Doo jet skis cutting through waves at Z=260m with high-speed carving motion, rider figures in buoyancy safety vests,
 *      roostertail spray jets (2.5m height), bow wave spray wedges, and foaming wake planes.
 * 
 * 3. Staged Coastal Watersports & Touring Fleet (Staged on beach shallows Z: 200m..230m)
 *    - High-detail Sea-Doo GTX style jet skis staged on sand skids.
 *    - Expedition touring sea kayaks with rocker bow/stern, cockpit coaming, bungee deck rigging, and carbon paddles.
 *    - Stand-up paddleboards (SUPs) in Riviera turquoise & Coral sunburst with EVA deck pads and SUP paddles.
 *    - Beach staging skids, timber launching rollers, and hemp mooring tethers.
 * 
 * 4. Flagship 25.90M Twin-Hull Luxury Expedition Catamaran (Moored at jetty Z: 258m, X: 16m)
 *    - Twin aerodynamic wave-piercing demi-hulls in alabaster composite (#F7F8FA), dark graphite boot-top stripe,
 *      copper underwater fairing, forward trampoline netting with carbon spreader beam, dual transom swim platforms with teak steps.
 *    - Spanning bridgedeck with weathered teak planking, panoramic 360° wraparound privacy-tinted marine glazing (#071A2B),
 *      aft cockpit dining lounge, forward Portuguese bridge sunpad lounge.
 *    - Upper flybridge deck with teak flooring, glass wind deflector, dual helm console, swept aerodynamic radar arch & hardtop
 *      with dual Starlink/Satcom domes, rotating open-array radar bar, FLIR thermal night vision pod, searchlight, VHF aerials.
 *    - Heavy displacement stable ocean swell physics.
 */

export const MarineCraft: React.FC = () => {
  const primaryTrawlerRef = useRef<THREE.Group>(null);
  const secondaryTrawlerRef = useRef<THREE.Group>(null);
  const catamaranRef = useRef<THREE.Group>(null);
  const radarScannerRef = useRef<THREE.Group>(null);
  const trawlerRadarRef = useRef<THREE.Group>(null);
  const surfCraftRef = useRef<THREE.Group>(null);

  // Active Watersports Refs
  const activeJetSki1Ref = useRef<THREE.Group>(null);
  const activeJetSki2Ref = useRef<THREE.Group>(null);
  const parasailBoatRef = useRef<THREE.Group>(null);
  const parasailCanopyRef = useRef<THREE.Group>(null);
  const towLineRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Primary Traditional Malpe Trawler (Dynamic ocean swell bobbing in harbour approach)
    if (primaryTrawlerRef.current) {
      const heave = -0.55 + Math.sin(t * 0.95) * 0.16 + Math.sin(t * 1.9) * 0.04;
      const roll = Math.sin(t * 0.75 + 0.3) * 0.045 + Math.cos(t * 1.5) * 0.015;
      const pitch = Math.cos(t * 0.85 + 0.5) * 0.035 + Math.sin(t * 1.7) * 0.012;
      const yawDrift = 0.42 + Math.sin(t * 0.25) * 0.02;

      primaryTrawlerRef.current.position.y = heave;
      primaryTrawlerRef.current.rotation.z = roll;
      primaryTrawlerRef.current.rotation.x = pitch;
      primaryTrawlerRef.current.rotation.y = yawDrift;
    }

    // 2. Secondary Trawler (Outer bay harbour entrance)
    if (secondaryTrawlerRef.current) {
      const heave2 = -0.55 + Math.sin(t * 0.88 + 1.8) * 0.18 + Math.cos(t * 1.6) * 0.035;
      const roll2 = Math.sin(t * 0.7 + 1.2) * 0.05 + Math.sin(t * 1.4) * 0.015;
      const pitch2 = Math.cos(t * 0.8 + 1.5) * 0.04 + Math.cos(t * 1.8) * 0.012;
      const yawDrift2 = -0.22 + Math.sin(t * 0.2 + 1.0) * 0.025;

      secondaryTrawlerRef.current.position.y = heave2;
      secondaryTrawlerRef.current.rotation.z = roll2;
      secondaryTrawlerRef.current.rotation.x = pitch2;
      secondaryTrawlerRef.current.rotation.y = yawDrift2;
    }

    // 3. Flagship 25.90M Catamaran (Heavy displacement low-frequency swell motion)
    if (catamaranRef.current) {
      const catHeave = -0.45 + Math.sin(t * 0.55) * 0.07 + Math.sin(t * 1.1) * 0.02;
      const catRoll = Math.sin(t * 0.45 + 0.8) * 0.018;
      const catPitch = Math.cos(t * 0.5 + 0.4) * 0.012;

      catamaranRef.current.position.y = catHeave;
      catamaranRef.current.rotation.z = catRoll;
      catamaranRef.current.rotation.x = catPitch;
    }

    // 4. Rotating Open-Array Marine Radars
    if (radarScannerRef.current) {
      radarScannerRef.current.rotation.y = t * 2.4;
    }
    if (trawlerRadarRef.current) {
      trawlerRadarRef.current.rotation.y = t * 2.0;
    }

    // 5. Tidal Surf Wash on Beach Watersports Staging
    if (surfCraftRef.current) {
      surfCraftRef.current.position.y = -0.12 + Math.sin(t * 1.1) * 0.025;
      surfCraftRef.current.rotation.z = Math.sin(t * 0.8) * 0.008;
    }

    // 6. Active Sea-Doo Jet Skis cutting waves at Z: 260m
    if (activeJetSki1Ref.current) {
      const jsX = -18 + Math.sin(t * 0.75) * 4.5;
      const jsZ = 260 + Math.cos(t * 0.75) * 6.0;
      const jsHeave = -0.28 + Math.sin(t * 3.2) * 0.08 + Math.sin(t * 1.6) * 0.04;
      const jsPitch = Math.sin(t * 3.2) * 0.08 - 0.04;
      const jsRoll = Math.cos(t * 0.75) * 0.14;
      const jsYaw = Math.sin(t * 0.75) * 0.35 + 0.1;

      activeJetSki1Ref.current.position.set(jsX, jsHeave, jsZ);
      activeJetSki1Ref.current.rotation.set(jsPitch, jsYaw, jsRoll);
    }

    if (activeJetSki2Ref.current) {
      const jsX2 = -32 + Math.sin(t * 0.72 - 0.9) * 4.5;
      const jsZ2 = 272 + Math.cos(t * 0.72 - 0.9) * 6.0;
      const jsHeave2 = -0.28 + Math.sin(t * 3.0 + 1.2) * 0.08;
      const jsPitch2 = Math.sin(t * 3.0 + 1.2) * 0.08 - 0.04;
      const jsRoll2 = Math.cos(t * 0.72 - 0.9) * 0.14;
      const jsYaw2 = Math.sin(t * 0.72 - 0.9) * 0.35 - 0.1;

      activeJetSki2Ref.current.position.set(jsX2, jsHeave2, jsZ2);
      activeJetSki2Ref.current.rotation.set(jsPitch2, jsYaw2, jsRoll2);
    }

    // 7. Towing Parasail & Speed Boat System at Z: 400m
    const boatX = -35 + Math.sin(t * 0.3) * 6.0;
    const boatZ = 400 + Math.cos(t * 0.3) * 8.0;
    const boatY = -0.38 + Math.sin(t * 1.4) * 0.06;
    const boatYaw = Math.cos(t * 0.3) * 0.25 - 0.15;
    const boatPitch = Math.sin(t * 1.4) * 0.03 - 0.03;

    if (parasailBoatRef.current) {
      parasailBoatRef.current.position.set(boatX, boatY, boatZ);
      parasailBoatRef.current.rotation.set(boatPitch, boatYaw, Math.sin(t * 1.2) * 0.04);
    }

    // Parasail Canopy soaring at high altitude (Y=45m, trailing behind boat)
    const trailingDist = 18.0;
    const parasailX = boatX - Math.sin(boatYaw) * trailingDist + Math.sin(t * 0.5) * 1.2;
    const parasailZ = boatZ - Math.cos(boatYaw) * trailingDist + Math.cos(t * 0.5) * 1.2;
    const parasailY = 45.0 + Math.sin(t * 0.8) * 0.8;
    const parasailRoll = Math.sin(t * 0.6) * 0.06;
    const parasailPitch = Math.cos(t * 0.7) * 0.04;

    if (parasailCanopyRef.current) {
      parasailCanopyRef.current.position.set(parasailX, parasailY, parasailZ);
      parasailCanopyRef.current.rotation.set(parasailPitch, boatYaw + Math.sin(t * 0.4) * 0.05, parasailRoll);
    }

    // Dynamic Tow Line connection (boat winch to parasail harness)
    if (towLineRef.current) {
      const winchPos = new THREE.Vector3(boatX, boatY + 1.2, boatZ);
      const harnessPos = new THREE.Vector3(parasailX, parasailY - 4.2, parasailZ);
      const diff = new THREE.Vector3().subVectors(harnessPos, winchPos);
      const len = diff.length();
      const mid = new THREE.Vector3().addVectors(winchPos, harnessPos).multiplyScalar(0.5);

      towLineRef.current.position.copy(mid);
      towLineRef.current.scale.set(1, len, 1);

      const dir = diff.normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      towLineRef.current.quaternion.copy(q);
    }
  });

  return (
    <group name="MarineCraft_Fleet">
      {/* 1. Primary Malpe Wooden Fishing Trawler (Moored in Malpe harbour approach: X: -45, Z: 245) */}
      <group ref={primaryTrawlerRef} position={[-45, -0.55, 245]} rotation={[0, 0.42, 0]}>
        <MalpeFishingTrawler radarRef={trawlerRadarRef} />
      </group>

      {/* 2. Secondary Traditional Fishing Boat (Distant working vessel in outer harbour: X: -78, Z: 280) */}
      <group ref={secondaryTrawlerRef} position={[-78, -0.55, 280]} rotation={[0, -0.22, 0]} scale={0.88}>
        <MalpeFishingTrawler isSecondary />
      </group>

      {/* 3. Coastal Watersports & Touring Fleet (Staged on beach shallows: X: 24..30, Z: 202..220) */}
      <group ref={surfCraftRef} position={[26, -0.15, 206]}>
        {/* Sea-Doo GTX Jet Ski 1 (Coral Sunburst Sport Livery) */}
        <JetSkiCraft position={[0, 0, 0]} yaw={0.28} color="#F36B2B" secondaryColor="#1E2228" name="JetSki_Coral" />

        {/* Sea-Doo GTX Jet Ski 2 (Riviera Aquamarine Livery) */}
        <JetSkiCraft position={[4.2, 0, -2.8]} yaw={0.12} color="#00B4D8" secondaryColor="#D8DEE9" name="JetSki_Aqua" />

        {/* Expedition Touring Sea Kayak 1 (Sunset Mango) */}
        <TouringKayak position={[-4.2, 0, 1.8]} yaw={-0.35} color="#FF7A00" name="Kayak_Mango" />

        {/* Expedition Touring Sea Kayak 2 (High-Vis Coastal Yellow) */}
        <TouringKayak position={[-7.5, 0, 3.2]} yaw={-0.48} color="#FFD166" name="Kayak_Yellow" />

        {/* Stand-Up Paddleboard 1 (Riviera Turquoise SUP) */}
        <StandUpPaddleboard position={[-1.8, 0.08, 4.5]} yaw={0.18} color="#00F5D4" name="SUP_Turquoise" />

        {/* Stand-Up Paddleboard 2 (Coral Sunburst SUP) */}
        <StandUpPaddleboard position={[2.2, 0.08, 2.2]} yaw={-0.25} color="#FF6B6B" name="SUP_Coral" />

        {/* Beach Staging Infrastructure (Launch rollers, mooring anchor stakes) */}
        <BeachStagingEquipment />
      </group>

      {/* 4. Active Sea-Doo Jet Skis cutting through ocean waves at Z=260m */}
      <group ref={activeJetSki1Ref} position={[-18, -0.28, 260]}>
        <ActiveJetSkiCraft
          color="#FF3366"
          secondaryColor="#1A1D20"
          vestColor="#FF5722"
          name="Active_JetSki_1"
          riderName="Active_Rider_Figure_1"
          sprayName="Roostertail_Spray_1"
        />
      </group>
      <group ref={activeJetSki2Ref} position={[-32, -0.28, 272]}>
        <ActiveJetSkiCraft
          color="#00E5FF"
          secondaryColor="#111318"
          vestColor="#FBC02D"
          name="Active_JetSki_2"
          riderName="Active_Rider_Figure_2"
          sprayName="Roostertail_Spray_2"
        />
      </group>

      {/* 5. Towing Parasail & Speed Boat System (Z=400m, Y=45m) */}
      <group ref={parasailBoatRef} position={[-35, -0.38, 400]}>
        <ParasailSpeedBoat name="Parasail_Speedboat" />
      </group>
      <group ref={parasailCanopyRef} position={[-35, 45, 400]}>
        <ParasailCanopySystem canopyName="Parasail_Canopy" harnessName="Parasail_Harness_Passengers" />
      </group>
      {/* Dynamic Tow Line connecting boat winch to parasail harness */}
      <group ref={towLineRef} name="Parasail_Dynamic_TowLine">
        <mesh>
          <cylinderGeometry args={[0.025, 0.025, 1, 6]} />
          <meshStandardMaterial color="#EAEAEA" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* 6. Flagship 25.90M Twin-Hull Expedition Catamaran (Moored at deepwater jetty: X: 16, Z: 258) */}
      <group ref={catamaranRef} position={[16, -0.45, 258]} rotation={[0, -0.32, 0]}>
        <ExpeditionCatamaran25M radarRef={radarScannerRef} />
      </group>
    </group>
  );
};

/* =========================================================================
 * 1. TRADITIONAL MALPE WOODEN FISHING TRAWLER
 * Deep-draft wooden hull, authentic Karnataka livery, forecastle, wheelhouse,
 * trawling gantry, winches, fish crates, crab pots, and marine rigging.
 * ========================================================================= */

interface TrawlerProps {
  radarRef?: React.RefObject<THREE.Group | null>;
  isSecondary?: boolean;
}

const MalpeFishingTrawler: React.FC<TrawlerProps> = ({ radarRef, isSecondary = false }) => {
  const materials = useMemo(() => {
    const primaryBlue = isSecondary ? '#163E65' : '#1C4E80';
    const gunwaleGold = isSecondary ? '#C89326' : '#E5A93C';

    return {
      topsidesMat: new THREE.MeshStandardMaterial({
        color: primaryBlue,
        roughness: 0.55,
        metalness: 0.08
      }),
      waterlineMat: new THREE.MeshStandardMaterial({
        color: '#F4F6F9',
        roughness: 0.5,
        metalness: 0.05
      }),
      antiFoulingMat: new THREE.MeshStandardMaterial({
        color: '#8B3A2B',
        roughness: 0.7,
        metalness: 0.12
      }),
      gunwaleMat: new THREE.MeshStandardMaterial({
        color: gunwaleGold,
        roughness: 0.6,
        metalness: 0.15
      }),
      derrickYellowMat: new THREE.MeshStandardMaterial({
        color: '#E5A93C',
        roughness: 0.5,
        metalness: 0.25
      }),
      timberDeckMat: new THREE.MeshStandardMaterial({
        color: '#6E4F38',
        roughness: 0.85,
        metalness: 0.02
      }),
      cabinMat: new THREE.MeshStandardMaterial({
        color: '#F5EFEB',
        roughness: 0.45,
        metalness: 0.05
      }),
      cabinTrimMat: new THREE.MeshStandardMaterial({
        color: '#0F2C4C',
        roughness: 0.5,
        metalness: 0.1
      }),
      brassMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.3,
        metalness: 0.88
      }),
      steelMat: new THREE.MeshStandardMaterial({
        color: '#343A40',
        roughness: 0.45,
        metalness: 0.75
      }),
      galvanizedMat: new THREE.MeshStandardMaterial({
        color: '#868E96',
        roughness: 0.5,
        metalness: 0.65
      }),
      glassMat: new THREE.MeshStandardMaterial({
        color: '#0A1C2A',
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.92
      }),
      ropeMat: new THREE.MeshStandardMaterial({
        color: '#C4A47C',
        roughness: 0.9,
        metalness: 0.0
      }),
      tireMat: new THREE.MeshStandardMaterial({
        color: '#1E2022',
        roughness: 0.92,
        metalness: 0.05
      }),
      lifebuoyMat: new THREE.MeshStandardMaterial({
        color: '#FF5722',
        roughness: 0.4,
        metalness: 0.1
      }),
      netMat: new THREE.MeshStandardMaterial({
        color: '#1B4D3E',
        roughness: 0.95,
        metalness: 0.0
      }),
      floatMat: new THREE.MeshStandardMaterial({
        color: '#FF7043',
        roughness: 0.35,
        metalness: 0.1
      }),
      crateBlueMat: new THREE.MeshStandardMaterial({ color: '#1976D2', roughness: 0.5 }),
      crateOrangeMat: new THREE.MeshStandardMaterial({ color: '#F57C00', roughness: 0.5 }),
      crateYellowMat: new THREE.MeshStandardMaterial({ color: '#FBC02D', roughness: 0.5 }),
      crabPotMat: new THREE.MeshStandardMaterial({ color: '#5D4037', roughness: 0.92 })
    };
  }, [isSecondary]);

  return (
    <group scale={[1.15, 1.15, 1.15]}>
      {/* 1. HULL STRUCTURE & KEEL */}
      <group name="Trawler_Hull_Assembly">
        <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.9, 16.4]} />
        </mesh>
        <mesh position={[0, -0.2, 0]} material={materials.antiFoulingMat} castShadow>
          <boxGeometry args={[0.35, 0.6, 15.8]} />
        </mesh>
        <group position={[0, 0.2, 8.2]}>
          <mesh material={materials.antiFoulingMat} castShadow>
            <boxGeometry args={[0.18, 1.2, 1.2]} />
          </mesh>
          <mesh position={[0, 0.3, -0.6]} material={materials.brassMat}>
            <cylinderGeometry args={[0.06, 0.06, 1.3, 8]} />
          </mesh>
        </group>
        <mesh position={[0, 1.0, 0]} material={materials.waterlineMat} castShadow>
          <boxGeometry args={[4.55, 0.3, 16.6]} />
        </mesh>
        <mesh position={[0, 1.8, 0]} material={materials.topsidesMat} castShadow receiveShadow>
          <boxGeometry args={[4.65, 1.35, 16.8]} />
        </mesh>

        <group position={[0, 1.6, -8.6]}>
          <mesh rotation={[0.42, 0, 0]} material={materials.topsidesMat} castShadow>
            <cylinderGeometry args={[0.4, 2.2, 3.4, 4]} />
          </mesh>
          <mesh position={[0, -0.6, 0.3]} rotation={[0.42, 0, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[2.4, 0.25, 2.8]} />
          </mesh>
          <mesh position={[0, -1.2, 0.5]} rotation={[0.42, 0, 0]} material={materials.antiFoulingMat}>
            <boxGeometry args={[0.35, 0.8, 3.2]} />
          </mesh>
          <mesh position={[0, 0.6, -0.8]} rotation={[0.38, 0, 0]} material={materials.gunwaleMat}>
            <boxGeometry args={[0.35, 2.8, 0.4]} />
          </mesh>
        </group>

        <group position={[0, 1.6, 8.4]}>
          <mesh rotation={[-0.25, 0, 0]} material={materials.topsidesMat} castShadow>
            <boxGeometry args={[4.5, 1.6, 0.6]} />
          </mesh>
          <mesh position={[0, 0.8, 0.1]} material={materials.gunwaleMat}>
            <boxGeometry args={[4.6, 0.2, 0.7]} />
          </mesh>
        </group>

        <mesh position={[2.35, 2.45, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.22, 0.22, 17.2]} />
        </mesh>
        <mesh position={[-2.35, 2.45, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.22, 0.22, 17.2]} />
        </mesh>

        {[-4.5, -1.5, 1.5, 4.5].map((zPos, idx) => (
          <React.Fragment key={`fenders-${idx}`}>
            <group position={[2.42, 1.5, zPos]} rotation={[0, Math.PI / 2, 0]}>
              <mesh material={materials.tireMat} castShadow>
                <torusGeometry args={[0.32, 0.12, 8, 16]} />
              </mesh>
              <mesh position={[0, 0.6, 0]} material={materials.ropeMat}>
                <cylinderGeometry args={[0.02, 0.02, 1.0, 6]} />
              </mesh>
            </group>
            <group position={[-2.42, 1.5, zPos]} rotation={[0, Math.PI / 2, 0]}>
              <mesh material={materials.tireMat} castShadow>
                <torusGeometry args={[0.32, 0.12, 8, 16]} />
              </mesh>
              <mesh position={[0, 0.6, 0]} material={materials.ropeMat}>
                <cylinderGeometry args={[0.02, 0.02, 1.0, 6]} />
              </mesh>
            </group>
          </React.Fragment>
        ))}

        <mesh position={[0, 2.4, 0]} material={materials.timberDeckMat} receiveShadow>
          <boxGeometry args={[4.4, 0.15, 16.2]} />
        </mesh>
      </group>

      {/* 2. RAISED TIMBER FORECASTLE */}
      <group name="Trawler_Forecastle">
        <mesh position={[0, 2.75, -6.2]} material={materials.timberDeckMat} receiveShadow>
          <boxGeometry args={[3.8, 0.15, 4.2]} />
        </mesh>
        <group position={[0, 3.15, -6.0]}>
          <mesh material={materials.steelMat} castShadow>
            <boxGeometry args={[1.1, 0.55, 0.6]} />
          </mesh>
        </group>
      </group>

      {/* 3. WHEELHOUSE CABIN */}
      <group name="Trawler_Wheelhouse" position={[0, 3.9, -1.8]}>
        <mesh material={materials.cabinMat} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.8, 4.6]} />
        </mesh>
        <mesh position={[0, 1.48, 0]} material={materials.cabinTrimMat} castShadow>
          <boxGeometry args={[3.6, 0.16, 4.8]} />
        </mesh>
      </group>

      {/* 4. AFT WORKING DECK & GANTRY */}
      <group name="Trawler_AftDeck">
        <group position={[0, 4.8, 6.2]}>
          <mesh position={[-1.9, 0, 0]} rotation={[0, 0, -0.16]} material={materials.steelMat} castShadow>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
          </mesh>
          <mesh position={[1.9, 0, 0]} rotation={[0, 0, 0.16]} material={materials.steelMat} castShadow>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
          </mesh>
          <mesh position={[0, 2.1, 0]} material={materials.steelMat} castShadow>
            <boxGeometry args={[3.8, 0.25, 0.25]} />
          </mesh>
        </group>

        {/* Stacked Crates & Crab Pots */}
        <group position={[-1.4, 2.7, 3.8]}>
          <mesh position={[0, 0.15, 0]} material={materials.crateBlueMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
          <mesh position={[0, 0.15, 0.7]} material={materials.crateOrangeMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
        </group>

        <group position={[1.4, 2.7, 3.8]}>
          <mesh position={[0, 0.2, 0]} material={materials.crabPotMat} castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.4, 10]} />
          </mesh>
        </group>
      </group>

      {/* 5. MAIN MAST */}
      <group name="Trawler_MainMast" position={[0, 5.5, -0.6]}>
        <mesh position={[0, 2.5, 0]} material={materials.steelMat} castShadow>
          <cylinderGeometry args={[0.1, 0.14, 5.8, 10]} />
        </mesh>
        <group position={[0, 3.6, 0.3]} ref={radarRef}>
          <mesh material={materials.waterlineMat} castShadow>
            <boxGeometry args={[1.2, 0.14, 0.16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

/* =========================================================================
 * 2. STAGED COASTAL WATERSPORTS FLEET (JET SKIS, KAYAKS, SUPs)
 * ========================================================================= */

interface JetSkiProps {
  position: [number, number, number];
  yaw?: number;
  color: string;
  secondaryColor: string;
  name: string;
}

const JetSkiCraft: React.FC<JetSkiProps> = ({
  position,
  yaw = 0,
  color,
  secondaryColor,
  name
}) => {
  const materials = useMemo(() => {
    return {
      hullMat: new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.45 }),
      accentMat: new THREE.MeshStandardMaterial({ color: secondaryColor, roughness: 0.3, metalness: 0.6 }),
      seatMat: new THREE.MeshStandardMaterial({ color: '#1A1D20', roughness: 0.88 }),
      tractionMat: new THREE.MeshStandardMaterial({ color: '#2B303A', roughness: 0.95 }),
      hardwareMat: new THREE.MeshStandardMaterial({ color: '#22252A', roughness: 0.4, metalness: 0.8 })
    };
  }, [color, secondaryColor]);

  return (
    <group name={name} position={position} rotation={[0, yaw, 0]} scale={[1.1, 1.1, 1.1]}>
      <mesh position={[0, 0.25, 0]} material={materials.accentMat} castShadow receiveShadow>
        <boxGeometry args={[1.24, 0.42, 3.4]} />
      </mesh>
      <mesh position={[0, 0.55, -0.1]} material={materials.hullMat} castShadow>
        <boxGeometry args={[1.32, 0.32, 3.1]} />
      </mesh>
      <mesh position={[0, 0.78, 0.1]} material={materials.seatMat} castShadow>
        <boxGeometry args={[0.52, 0.28, 1.1]} />
      </mesh>
    </group>
  );
};

interface KayakProps {
  position: [number, number, number];
  yaw?: number;
  color: string;
  name: string;
}

const TouringKayak: React.FC<KayakProps> = ({
  position,
  yaw = 0,
  color,
  name
}) => {
  const materials = useMemo(() => {
    return {
      hullMat: new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.2 }),
      trimMat: new THREE.MeshStandardMaterial({ color: '#1F2421', roughness: 0.8 }),
      paddleMat: new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.2, metalness: 0.85 })
    };
  }, [color]);

  return (
    <group name={name} position={position} rotation={[0, yaw, 0]} scale={[1.05, 1.05, 1.05]}>
      <mesh position={[0, 0.18, 0]} material={materials.hullMat} castShadow receiveShadow>
        <boxGeometry args={[0.68, 0.34, 4.2]} />
      </mesh>
      <group position={[0, 0.36, 0]}>
        <mesh material={materials.trimMat}>
          <torusGeometry args={[0.34, 0.04, 6, 16]} />
        </mesh>
      </group>
      <group position={[0.15, 0.45, -0.2]} rotation={[0.1, 0.4, 0.15]}>
        <mesh material={materials.paddleMat}>
          <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
        </mesh>
      </group>
    </group>
  );
};

interface SUPProps {
  position: [number, number, number];
  yaw?: number;
  color: string;
  name: string;
}

const StandUpPaddleboard: React.FC<SUPProps> = ({ position, yaw = 0, color, name }) => {
  const materials = useMemo(() => {
    return {
      boardMat: new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.25 }),
      padMat: new THREE.MeshStandardMaterial({ color: '#2B303A', roughness: 0.9 }),
      paddleMat: new THREE.MeshStandardMaterial({ color: '#111318', roughness: 0.3, metalness: 0.8 })
    };
  }, [color]);

  return (
    <group name={name} position={position} rotation={[0, yaw, 0]}>
      {/* 3.4m Epoxy Stand-Up Paddleboard Hull */}
      <mesh position={[0, 0.08, 0]} material={materials.boardMat} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.12, 3.4]} />
      </mesh>
      {/* Non-Slip EVA Deck Traction Pad */}
      <mesh position={[0, 0.15, -0.2]} material={materials.padMat}>
        <boxGeometry args={[0.72, 0.02, 2.2]} />
      </mesh>
      {/* Carbon SUP Paddle Resting Across Board */}
      <group position={[0.2, 0.22, 0.1]} rotation={[0.05, 0.2, 0.1]}>
        <mesh material={materials.paddleMat}>
          <cylinderGeometry args={[0.018, 0.018, 2.1, 8]} />
        </mesh>
        <mesh position={[0, 1.0, 0]} material={materials.boardMat}>
          <boxGeometry args={[0.22, 0.4, 0.02]} />
        </mesh>
      </group>
    </group>
  );
};

const BeachStagingEquipment: React.FC = () => {
  const materials = useMemo(() => {
    return {
      timberMat: new THREE.MeshStandardMaterial({ color: '#5C3D28', roughness: 0.85 }),
      ropeMat: new THREE.MeshStandardMaterial({ color: '#D4B996', roughness: 0.9 })
    };
  }, []);

  return (
    <group name="BeachStagingInfrastructure">
      {[-4, 0, 4].map((xOff, i) => (
        <group key={`skid-${i}`} position={[xOff, 0.05, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.timberMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
          </mesh>
          <mesh position={[0, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} material={materials.timberMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* =========================================================================
 * 3. ACTIVE SEA-DOO JET SKIS WITH SPRAY WAKES & RIDER FIGURES
 * ========================================================================= */

interface ActiveJetSkiProps {
  color: string;
  secondaryColor: string;
  vestColor: string;
  name: string;
  riderName: string;
  sprayName: string;
}

const ActiveJetSkiCraft: React.FC<ActiveJetSkiProps> = ({
  color,
  secondaryColor,
  vestColor,
  name,
  riderName,
  sprayName
}) => {
  const materials = useMemo(() => {
    return {
      hullMat: new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.5 }),
      accentMat: new THREE.MeshStandardMaterial({ color: secondaryColor, roughness: 0.3, metalness: 0.6 }),
      seatMat: new THREE.MeshStandardMaterial({ color: '#111315', roughness: 0.9 }),
      vestMat: new THREE.MeshStandardMaterial({ color: vestColor, roughness: 0.4 }),
      riderSkinMat: new THREE.MeshStandardMaterial({ color: '#D4A373', roughness: 0.7 }),
      helmetMat: new THREE.MeshStandardMaterial({ color: '#1B2A4A', roughness: 0.2, metalness: 0.7 }),
      visorMat: new THREE.MeshStandardMaterial({ color: '#00F0FF', roughness: 0.1, metalness: 0.9 }),
      sprayMat: new THREE.MeshStandardMaterial({
        color: '#E0F7FA',
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.75
      }),
      foamWakeMat: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.8,
        transparent: true,
        opacity: 0.65
      })
    };
  }, [color, secondaryColor, vestColor]);

  return (
    <group name={name} scale={[1.15, 1.15, 1.15]}>
      {/* Deep-V Racing Hull & Spray Chines */}
      <mesh position={[0, 0.25, 0]} material={materials.accentMat} castShadow receiveShadow>
        <boxGeometry args={[1.24, 0.42, 3.4]} />
      </mesh>
      {/* Molded Gelcoat Upper Deck */}
      <mesh position={[0, 0.55, -0.1]} material={materials.hullMat} castShadow>
        <boxGeometry args={[1.32, 0.32, 3.1]} />
      </mesh>
      {/* Saddle */}
      <mesh position={[0, 0.76, 0.1]} material={materials.seatMat} castShadow>
        <boxGeometry args={[0.52, 0.26, 1.1]} />
      </mesh>
      {/* Handlebar Console */}
      <mesh position={[0, 1.02, -0.65]} material={materials.accentMat}>
        <boxGeometry args={[0.45, 0.25, 0.35]} />
      </mesh>

      {/* Rider Figure in Buoyancy Safety Vest */}
      <group name={riderName} position={[0, 0.75, -0.1]}>
        {/* Torso in Buoyancy Vest */}
        <mesh position={[0, 0.45, -0.1]} rotation={[0.25, 0, 0]} material={materials.vestMat} castShadow>
          <boxGeometry args={[0.48, 0.55, 0.32]} />
        </mesh>
        {/* Head with Helmet & Visor */}
        <group position={[0, 0.88, -0.22]}>
          <mesh material={materials.helmetMat} castShadow>
            <sphereGeometry args={[0.18, 12, 12]} />
          </mesh>
          <mesh position={[0, 0.02, -0.14]} material={materials.visorMat}>
            <boxGeometry args={[0.22, 0.1, 0.08]} />
          </mesh>
        </group>
        {/* Arms holding handlebars */}
        <mesh position={[0.28, 0.42, -0.38]} rotation={[0.8, 0.3, -0.2]} material={materials.riderSkinMat}>
          <cylinderGeometry args={[0.05, 0.05, 0.45, 8]} />
        </mesh>
        <mesh position={[-0.28, 0.42, -0.38]} rotation={[0.8, -0.3, 0.2]} material={materials.riderSkinMat}>
          <cylinderGeometry args={[0.05, 0.05, 0.45, 8]} />
        </mesh>
      </group>

      {/* Water Spray Wakes & High Roostertail Jet */}
      <group name={sprayName}>
        {/* 2.5m Roostertail Spray Jet from Stern Jet Pump */}
        <mesh position={[0, 1.2, 2.2]} rotation={[-0.55, 0, 0]} material={materials.sprayMat}>
          <coneGeometry args={[0.65, 2.8, 12]} />
        </mesh>
        {/* Bow Wave Spray Wedges (Port & Starboard) */}
        <mesh position={[0.9, 0.25, -0.8]} rotation={[0.2, 0.5, 0.4]} material={materials.sprayMat}>
          <boxGeometry args={[0.4, 0.3, 1.4]} />
        </mesh>
        <mesh position={[-0.9, 0.25, -0.8]} rotation={[0.2, -0.5, -0.4]} material={materials.sprayMat}>
          <boxGeometry args={[0.4, 0.3, 1.4]} />
        </mesh>
        {/* Trailing Ocean Surface Foam Wake */}
        <mesh position={[0, -0.12, 3.2]} rotation={[-Math.PI / 2, 0, 0]} material={materials.foamWakeMat}>
          <planeGeometry args={[1.8, 4.5]} />
        </mesh>
      </group>
    </group>
  );
};

/* =========================================================================
 * 4. PARASAIL TOW SPEEDBOAT & HIGH-ALTITUDE PARASAIL CANOPY SYSTEM
 * ========================================================================= */

interface ParasailBoatProps {
  name: string;
}

const ParasailSpeedBoat: React.FC<ParasailBoatProps> = ({ name }) => {
  const materials = useMemo(() => {
    return {
      hullWhiteMat: new THREE.MeshStandardMaterial({ color: '#F8F9FA', roughness: 0.25, metalness: 0.2 }),
      stripeNavyMat: new THREE.MeshStandardMaterial({ color: '#1D3557', roughness: 0.3, metalness: 0.5 }),
      stripeCoralMat: new THREE.MeshStandardMaterial({ color: '#FF5722', roughness: 0.3 }),
      glassMat: new THREE.MeshStandardMaterial({ color: '#0A192F', roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.88 }),
      winchSteelMat: new THREE.MeshStandardMaterial({ color: '#D8DEE9', roughness: 0.2, metalness: 0.9 }),
      motorMat: new THREE.MeshStandardMaterial({ color: '#111318', roughness: 0.3, metalness: 0.7 }),
      vestMat: new THREE.MeshStandardMaterial({ color: '#FF5722', roughness: 0.4 })
    };
  }, []);

  return (
    <group name={name} scale={[1.2, 1.2, 1.2]}>
      {/* 7.5m Offshore Speed Boat Hull */}
      <mesh position={[0, 0.35, 0]} material={materials.hullWhiteMat} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.7, 7.2]} />
      </mesh>
      {/* Flared Bow V-Cutwater */}
      <mesh position={[0, 0.45, -3.8]} rotation={[0.4, 0, 0]} material={materials.hullWhiteMat} castShadow>
        <boxGeometry args={[2.1, 0.65, 1.8]} />
      </mesh>
      {/* Sport Speed Stripes */}
      <mesh position={[0, 0.52, 0]} material={materials.stripeNavyMat}>
        <boxGeometry args={[2.45, 0.18, 7.0]} />
      </mesh>
      <mesh position={[0, 0.65, 0]} material={materials.stripeCoralMat}>
        <boxGeometry args={[2.46, 0.08, 6.8]} />
      </mesh>

      {/* Windshield & Console */}
      <mesh position={[0, 1.05, -1.2]} rotation={[-0.35, 0, 0]} material={materials.glassMat}>
        <planeGeometry args={[2.1, 0.8]} />
      </mesh>

      {/* Driver Figure in Safety Vest */}
      <group position={[-0.45, 0.9, -0.4]}>
        <mesh material={materials.vestMat} castShadow>
          <boxGeometry args={[0.42, 0.5, 0.3]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} material={materials.hullWhiteMat}>
          <sphereGeometry args={[0.15, 10, 10]} />
        </mesh>
      </group>

      {/* Twin Outboard V6 Engines */}
      <group position={[-0.6, 0.4, 3.8]}>
        <mesh material={materials.motorMat} castShadow>
          <boxGeometry args={[0.45, 0.8, 0.6]} />
        </mesh>
      </group>
      <group position={[0.6, 0.4, 3.8]}>
        <mesh material={materials.motorMat} castShadow>
          <boxGeometry args={[0.45, 0.8, 0.6]} />
        </mesh>
      </group>

      {/* Heavy Stainless Steel Towing Winch Arch at Stern */}
      <group position={[0, 1.2, 2.2]}>
        <mesh position={[-1.0, 0, 0]} rotation={[0, 0, -0.15]} material={materials.winchSteelMat}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
        </mesh>
        <mesh position={[1.0, 0, 0]} rotation={[0, 0, 0.15]} material={materials.winchSteelMat}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
        </mesh>
        <mesh position={[0, 0.65, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.winchSteelMat}>
          <cylinderGeometry args={[0.06, 0.06, 2.1, 8]} />
        </mesh>
      </group>
    </group>
  );
};

interface ParasailCanopyProps {
  canopyName: string;
  harnessName: string;
}

const ParasailCanopySystem: React.FC<ParasailCanopyProps> = ({ canopyName, harnessName }) => {
  const materials = useMemo(() => {
    return {
      saffronMat: new THREE.MeshStandardMaterial({ color: '#FFB703', roughness: 0.4, side: THREE.DoubleSide }),
      orangeMat: new THREE.MeshStandardMaterial({ color: '#FB8500', roughness: 0.4, side: THREE.DoubleSide }),
      crimsonMat: new THREE.MeshStandardMaterial({ color: '#E63946', roughness: 0.4, side: THREE.DoubleSide }),
      turquoiseMat: new THREE.MeshStandardMaterial({ color: '#00B4D8', roughness: 0.4, side: THREE.DoubleSide }),
      navyMat: new THREE.MeshStandardMaterial({ color: '#1D3557', roughness: 0.4, side: THREE.DoubleSide }),
      lineMat: new THREE.MeshStandardMaterial({ color: '#F4F6F9', roughness: 0.3 }),
      barMat: new THREE.MeshStandardMaterial({ color: '#22252A', roughness: 0.4, metalness: 0.8 }),
      vestOrangeMat: new THREE.MeshStandardMaterial({ color: '#FF5722', roughness: 0.4 }),
      vestYellowMat: new THREE.MeshStandardMaterial({ color: '#FFD166', roughness: 0.4 }),
      passengerSkinMat: new THREE.MeshStandardMaterial({ color: '#E0A96D', roughness: 0.7 }),
      helmetMat: new THREE.MeshStandardMaterial({ color: '#2B2D42', roughness: 0.3 })
    };
  }, []);

  return (
    <group name={canopyName} scale={[1.3, 1.3, 1.3]}>
      {/* Multi-Colored Arch Canopy (Y=45m altitude zone) */}
      <group name="Canopy_Panels">
        {/* Center Panel (Saffron Gold) */}
        <mesh position={[0, 0, 0]} material={materials.saffronMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, -0.4, 0.8]} />
        </mesh>
        {/* Flank Panels (Sunset Orange) */}
        <mesh position={[0, 0, 0]} material={materials.orangeMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, 0.4, 0.6]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.orangeMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, -1.0, 0.6]} />
        </mesh>
        {/* Outer Panels (Crimson Red) */}
        <mesh position={[0, 0, 0]} material={materials.crimsonMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, 1.0, 0.5]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.crimsonMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, -1.5, 0.5]} />
        </mesh>
        {/* Wingtip Panels (Turquoise & Navy) */}
        <mesh position={[0, 0, 0]} material={materials.turquoiseMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, 1.5, 0.4]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.navyMat}>
          <cylinderGeometry args={[4.2, 4.6, 2.4, 16, 1, true, -1.9, 0.4]} />
        </mesh>
      </group>

      {/* Suspension Cords radiating down to harness bar */}
      <group name="Suspension_Lines">
        {[-3.2, -1.6, 0, 1.6, 3.2].map((xPos, idx) => (
          <React.Fragment key={`line-${idx}`}>
            <mesh position={[xPos * 0.5, -2.1, 0]} rotation={[0, 0, xPos * 0.15]} material={materials.lineMat}>
              <cylinderGeometry args={[0.015, 0.015, 4.2, 4]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* Tandem Passenger Harness & Figures */}
      <group name={harnessName} position={[0, -4.2, 0]}>
        {/* Harness Spreader Bar */}
        <mesh material={materials.barMat}>
          <boxGeometry args={[1.6, 0.1, 0.1]} />
        </mesh>

        {/* Passenger 1 (Left) */}
        <group position={[-0.4, -0.6, 0]}>
          <mesh material={materials.vestOrangeMat} castShadow>
            <boxGeometry args={[0.42, 0.48, 0.28]} />
          </mesh>
          <mesh position={[0, 0.38, 0]} material={materials.helmetMat}>
            <sphereGeometry args={[0.15, 10, 10]} />
          </mesh>
          <mesh position={[0, -0.4, 0.2]} rotation={[0.4, 0, 0]} material={materials.passengerSkinMat}>
            <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
          </mesh>
        </group>

        {/* Passenger 2 (Right) */}
        <group position={[0.4, -0.6, 0]}>
          <mesh material={materials.vestYellowMat} castShadow>
            <boxGeometry args={[0.42, 0.48, 0.28]} />
          </mesh>
          <mesh position={[0, 0.38, 0]} material={materials.helmetMat}>
            <sphereGeometry args={[0.15, 10, 10]} />
          </mesh>
          <mesh position={[0, -0.4, 0.2]} rotation={[0.4, 0, 0]} material={materials.passengerSkinMat}>
            <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

/* =========================================================================
 * 5. FLAGSHIP 25.90M LUXURY EXPEDITION CATAMARAN
 * ========================================================================= */

interface CatamaranProps {
  radarRef?: React.RefObject<THREE.Group | null>;
}

const ExpeditionCatamaran25M: React.FC<CatamaranProps> = ({ radarRef }) => {
  const materials = useMemo(() => {
    return {
      compositeMat: new THREE.MeshStandardMaterial({ color: '#F8F9FA', roughness: 0.25, metalness: 0.12 }),
      bootTopMat: new THREE.MeshStandardMaterial({ color: '#212529', roughness: 0.35, metalness: 0.7 }),
      antiFoulingMat: new THREE.MeshStandardMaterial({ color: '#6E3D29', roughness: 0.65, metalness: 0.3 }),
      teakDeckMat: new THREE.MeshStandardMaterial({ color: '#7A5233', roughness: 0.75, metalness: 0.03 }),
      glassMat: new THREE.MeshStandardMaterial({ color: '#071A2B', roughness: 0.08, metalness: 0.95, transparent: true, opacity: 0.88 }),
      stainlessMat: new THREE.MeshStandardMaterial({ color: '#E9ECEF', roughness: 0.18, metalness: 0.92 }),
      goldTrimMat: new THREE.MeshStandardMaterial({ color: '#D4AF37', roughness: 0.3, metalness: 0.85 }),
      trampolineMat: new THREE.MeshStandardMaterial({ color: '#2B303A', roughness: 0.95, side: THREE.DoubleSide }),
      cushionMat: new THREE.MeshStandardMaterial({ color: '#ECE5DB', roughness: 0.9 })
    };
  }, []);

  return (
    <group scale={[1.35, 1.35, 1.35]}>
      {/* 1. TWIN DEMI-HULLS */}
      <group name="Catamaran_Hulls">
        <group position={[-4.8, 0, 0]}>
          <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.9, 23.5]} />
          </mesh>
          <mesh position={[0, 0.95, 0]} material={materials.bootTopMat}>
            <boxGeometry args={[2.25, 0.18, 23.8]} />
          </mesh>
          <mesh position={[0, 1.8, 0]} material={materials.compositeMat} castShadow receiveShadow>
            <boxGeometry args={[2.3, 1.55, 24.2]} />
          </mesh>
        </group>

        <group position={[4.8, 0, 0]}>
          <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.9, 23.5]} />
          </mesh>
          <mesh position={[0, 0.95, 0]} material={materials.bootTopMat}>
            <boxGeometry args={[2.25, 0.18, 23.8]} />
          </mesh>
          <mesh position={[0, 1.8, 0]} material={materials.compositeMat} castShadow receiveShadow>
            <boxGeometry args={[2.3, 1.55, 24.2]} />
          </mesh>
        </group>
      </group>

      {/* 2. BRIDGEDECK */}
      <group name="Catamaran_Bridgedeck">
        <mesh position={[0, 2.58, 0.8]} material={materials.teakDeckMat} receiveShadow>
          <boxGeometry args={[11.8, 0.22, 21.2]} />
        </mesh>
        <group position={[0, 4.25, -0.6]}>
          <mesh material={materials.compositeMat} castShadow>
            <boxGeometry args={[9.4, 2.65, 13.6]} />
          </mesh>
        </group>
        <group name="Deck_Guardrails">
          <mesh position={[-5.8, 3.2, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
          <mesh position={[5.8, 3.2, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
        </group>
      </group>

      {/* 3. FLYBRIDGE DECK */}
      <group name="Catamaran_Flybridge" position={[0, 5.75, -0.6]}>
        <mesh material={materials.teakDeckMat} receiveShadow>
          <boxGeometry args={[7.8, 0.18, 10.4]} />
        </mesh>
        <group position={[0, 2.6, 1.8]}>
          <mesh material={materials.compositeMat} castShadow>
            <boxGeometry args={[7.6, 0.22, 6.2]} />
          </mesh>
          <group position={[0, 0.9, -0.4]} ref={radarRef}>
            <mesh material={materials.compositeMat} castShadow>
              <boxGeometry args={[2.2, 0.18, 0.22]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
