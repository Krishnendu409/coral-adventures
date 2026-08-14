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
 * 2. Coastal Watersports & Touring Fleet (Staged on beach shallows Z: 200m..215m)
 *    - High-detail Sea-Doo GTX style jet skis with stepped deep-V hull, side sponsons, rear boarding platform,
 *      two-tone sport livery (Coral Sunburst & Aquamarine), tiered touring saddle, handlebar console & mirrors.
 *    - Expedition touring sea kayaks with rocker bow/stern, cockpit coaming, padded seat, perimeter safety lines,
 *      criss-cross bungee rigging with dry bags, and dual-bladed asymmetric carbon paddle.
 *    - Beach staging skids, timber launching rollers, and sand mooring stakes.
 * 
 * 3. Flagship 25.90M Twin-Hull Luxury Expedition Catamaran (Moored at jetty Z: 258m, X: 16m)
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Primary Traditional Malpe Trawler (Dynamic ocean swell bobbing in harbour approach)
    if (primaryTrawlerRef.current) {
      // Multi-harmonic ocean wave swell response
      const heave = -0.55 + Math.sin(t * 0.95) * 0.16 + Math.sin(t * 1.9) * 0.04;
      const roll = Math.sin(t * 0.75 + 0.3) * 0.045 + Math.cos(t * 1.5) * 0.015;
      const pitch = Math.cos(t * 0.85 + 0.5) * 0.035 + Math.sin(t * 1.7) * 0.012;
      const yawDrift = 0.42 + Math.sin(t * 0.25) * 0.02;

      primaryTrawlerRef.current.position.y = heave;
      primaryTrawlerRef.current.rotation.z = roll;
      primaryTrawlerRef.current.rotation.x = pitch;
      primaryTrawlerRef.current.rotation.y = yawDrift;
    }

    // 2. Secondary Trawler (Outer bay harbour entrance - phase offset)
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
      radarScannerRef.current.rotation.y = t * 2.4; // 24 RPM rotation
    }
    if (trawlerRadarRef.current) {
      trawlerRadarRef.current.rotation.y = t * 2.0;
    }

    // 5. Subtle Tidal Surf Wash on Beach Watersports Staging
    if (surfCraftRef.current) {
      surfCraftRef.current.position.y = -0.12 + Math.sin(t * 1.1) * 0.025;
      surfCraftRef.current.rotation.z = Math.sin(t * 0.8) * 0.008;
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

      {/* 3. Coastal Watersports & Touring Fleet (Staged on beach shallows: X: 24..30, Z: 202..214) */}
      <group ref={surfCraftRef} position={[26, -0.15, 206]}>
        {/* Sea-Doo GTX Jet Ski 1 (Coral Sunburst Sport Livery) */}
        <JetSkiCraft position={[0, 0, 0]} yaw={0.28} color="#F36B2B" secondaryColor="#1E2228" name="JetSki_Coral" />

        {/* Sea-Doo GTX Jet Ski 2 (Riviera Aquamarine Livery) */}
        <JetSkiCraft position={[4.2, 0, -2.8]} yaw={0.12} color="#00B4D8" secondaryColor="#D8DEE9" name="JetSki_Aqua" />

        {/* Expedition Touring Sea Kayak 1 (Sunset Mango) */}
        <TouringKayak position={[-4.2, 0, 1.8]} yaw={-0.35} color="#FF7A00" name="Kayak_Mango" />

        {/* Expedition Touring Sea Kayak 2 (High-Vis Coastal Yellow) */}
        <TouringKayak position={[-7.5, 0, 3.2]} yaw={-0.48} color="#FFD166" name="Kayak_Yellow" />

        {/* Beach Staging Infrastructure (Launch rollers, mooring anchor stakes) */}
        <BeachStagingEquipment />
      </group>

      {/* 4. Flagship 25.90M Twin-Hull Expedition Catamaran (Moored at deepwater jetty: X: 16, Z: 258) */}
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
    // Authentic Coastal Karnataka Vessel Color Palette
    const primaryBlue = isSecondary ? '#163E65' : '#1C4E80'; // Maritime deep ocean blue
    const gunwaleGold = isSecondary ? '#C89326' : '#E5A93C'; // Saffron gold gunwale rub rails

    return {
      // Topsides Hull & Bulwarks (Vibrant coastal blue)
      topsidesMat: new THREE.MeshStandardMaterial({
        color: primaryBlue,
        roughness: 0.55,
        metalness: 0.08
      }),
      // Waterline Boot-Topping Stripe (Crisp marine white)
      waterlineMat: new THREE.MeshStandardMaterial({
        color: '#F4F6F9',
        roughness: 0.5,
        metalness: 0.05
      }),
      // Under-water Keel & Hull Anti-Fouling (Rust-red copper)
      antiFoulingMat: new THREE.MeshStandardMaterial({
        color: '#8B3A2B',
        roughness: 0.7,
        metalness: 0.12
      }),
      // Gunwales & Sheer Rub Strakes (Saffron-gold timber)
      gunwaleMat: new THREE.MeshStandardMaterial({
        color: gunwaleGold,
        roughness: 0.6,
        metalness: 0.15
      }),
      // Yellow Boom Derrick Mast (Karnataka Marine Yellow)
      derrickYellowMat: new THREE.MeshStandardMaterial({
        color: '#E5A93C',
        roughness: 0.5,
        metalness: 0.25
      }),
      // Weathered Sal / Teak Timber Working Deck
      timberDeckMat: new THREE.MeshStandardMaterial({
        color: '#6E4F38',
        roughness: 0.85,
        metalness: 0.02
      }),
      // Wheelhouse Deck Cabin (Sea-salt painted ivory)
      cabinMat: new THREE.MeshStandardMaterial({
        color: '#F5EFEB',
        roughness: 0.45,
        metalness: 0.05
      }),
      // Cabin Trim & Accents (Navy blue wood)
      cabinTrimMat: new THREE.MeshStandardMaterial({
        color: '#0F2C4C',
        roughness: 0.5,
        metalness: 0.1
      }),
      // Marine Brass Hardware & Porthole Bezels
      brassMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.3,
        metalness: 0.88
      }),
      // Structural Iron & Trawling Winches / Gantry Steel
      steelMat: new THREE.MeshStandardMaterial({
        color: '#343A40',
        roughness: 0.45,
        metalness: 0.75
      }),
      // Galvanized Anchor & Rigging Chain
      galvanizedMat: new THREE.MeshStandardMaterial({
        color: '#868E96',
        roughness: 0.5,
        metalness: 0.65
      }),
      // Reflective Marine Cabin Windows
      glassMat: new THREE.MeshStandardMaterial({
        color: '#0A1C2A',
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.92
      }),
      // Manila / Sisal Marine Hemp Rigging Ropes
      ropeMat: new THREE.MeshStandardMaterial({
        color: '#C4A47C',
        roughness: 0.9,
        metalness: 0.0
      }),
      // Rubber Tire Fenders (Weathered vulcanized black)
      tireMat: new THREE.MeshStandardMaterial({
        color: '#1E2022',
        roughness: 0.92,
        metalness: 0.05
      }),
      // Safety Lifebuoy Orange
      lifebuoyMat: new THREE.MeshStandardMaterial({
        color: '#FF5722',
        roughness: 0.4,
        metalness: 0.1
      }),
      // Trawler Net Mesh (Deep ocean green nylon)
      netMat: new THREE.MeshStandardMaterial({
        color: '#1B4D3E',
        roughness: 0.95,
        metalness: 0.0
      }),
      // Net Floats (Bright orange HDPE)
      floatMat: new THREE.MeshStandardMaterial({
        color: '#FF7043',
        roughness: 0.35,
        metalness: 0.1
      }),
      // Fish Crate Colors
      crateBlueMat: new THREE.MeshStandardMaterial({ color: '#1976D2', roughness: 0.5 }),
      crateOrangeMat: new THREE.MeshStandardMaterial({ color: '#F57C00', roughness: 0.5 }),
      crateYellowMat: new THREE.MeshStandardMaterial({ color: '#FBC02D', roughness: 0.5 }),
      // Crab Pot Woven Timber
      crabPotMat: new THREE.MeshStandardMaterial({ color: '#5D4037', roughness: 0.92 })
    };
  }, [isSecondary]);

  return (
    <group scale={[1.15, 1.15, 1.15]}>
      {/* ------------------------------------------------------------- */}
      {/* 1. HULL STRUCTURE & KEEL (Deep-draft curved wooden vessel)     */}
      {/* ------------------------------------------------------------- */}
      <group name="Trawler_Hull_Assembly">
        {/* Lower Hull: Rust-Red Copper Anti-Fouling Keel */}
        <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.9, 16.4]} />
        </mesh>
        {/* Deep Central Skeg Keel */}
        <mesh position={[0, -0.2, 0]} material={materials.antiFoulingMat} castShadow>
          <boxGeometry args={[0.35, 0.6, 15.8]} />
        </mesh>
        {/* Aft Rudder & Bronze Pintle Mounts */}
        <group position={[0, 0.2, 8.2]}>
          <mesh material={materials.antiFoulingMat} castShadow>
            <boxGeometry args={[0.18, 1.2, 1.2]} />
          </mesh>
          <mesh position={[0, 0.3, -0.6]} material={materials.brassMat}>
            <cylinderGeometry args={[0.06, 0.06, 1.3, 8]} />
          </mesh>
        </group>

        {/* Mid Hull: Waterline Boot-Topping Band (White) */}
        <mesh position={[0, 1.0, 0]} material={materials.waterlineMat} castShadow>
          <boxGeometry args={[4.55, 0.3, 16.6]} />
        </mesh>

        {/* Upper Hull Topsides: Vibrant Coastal Maritime Blue */}
        <mesh position={[0, 1.8, 0]} material={materials.topsidesMat} castShadow receiveShadow>
          <boxGeometry args={[4.65, 1.35, 16.8]} />
        </mesh>

        {/* Raked Flared Bow Stem (Front Cutwater) */}
        <group position={[0, 1.6, -8.6]}>
          {/* Main Bow Stem Wedge */}
          <mesh rotation={[0.42, 0, 0]} material={materials.topsidesMat} castShadow>
            <cylinderGeometry args={[0.4, 2.2, 3.4, 4]} />
          </mesh>
          {/* Bow Waterline Stripe */}
          <mesh position={[0, -0.6, 0.3]} rotation={[0.42, 0, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[2.4, 0.25, 2.8]} />
          </mesh>
          {/* Bow Keel Extension */}
          <mesh position={[0, -1.2, 0.5]} rotation={[0.42, 0, 0]} material={materials.antiFoulingMat}>
            <boxGeometry args={[0.35, 0.8, 3.2]} />
          </mesh>
          {/* Heavy Timber Stempost Cap */}
          <mesh position={[0, 0.6, -0.8]} rotation={[0.38, 0, 0]} material={materials.gunwaleMat}>
            <boxGeometry args={[0.35, 2.8, 0.4]} />
          </mesh>
        </group>

        {/* Transom Stern / Counter Stern */}
        <group position={[0, 1.6, 8.4]}>
          <mesh rotation={[-0.25, 0, 0]} material={materials.topsidesMat} castShadow>
            <boxGeometry args={[4.5, 1.6, 0.6]} />
          </mesh>
          <mesh position={[0, 0.8, 0.1]} material={materials.gunwaleMat}>
            <boxGeometry args={[4.6, 0.2, 0.7]} />
          </mesh>
        </group>

        {/* Gunwale Cap Rails & Sheer Rub Strakes (Saffron-Gold Trim) */}
        <mesh position={[2.35, 2.45, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.22, 0.22, 17.2]} />
        </mesh>
        <mesh position={[-2.35, 2.45, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.22, 0.22, 17.2]} />
        </mesh>
        <mesh position={[2.36, 1.7, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.12, 0.15, 16.6]} />
        </mesh>
        <mesh position={[-2.36, 1.7, 0]} material={materials.gunwaleMat}>
          <boxGeometry args={[0.12, 0.15, 16.6]} />
        </mesh>

        {/* Rubber Tire Fenders with Rope Ties (Port & Starboard) */}
        {[-4.5, -1.5, 1.5, 4.5].map((zPos, idx) => (
          <React.Fragment key={`fenders-${idx}`}>
            {/* Starboard Tire Fender */}
            <group position={[2.42, 1.5, zPos]} rotation={[0, Math.PI / 2, 0]}>
              <mesh material={materials.tireMat} castShadow>
                <torusGeometry args={[0.32, 0.12, 8, 16]} />
              </mesh>
              {/* Rope loop to gunwale */}
              <mesh position={[0, 0.6, 0]} material={materials.ropeMat}>
                <cylinderGeometry args={[0.02, 0.02, 1.0, 6]} />
              </mesh>
            </group>

            {/* Port Tire Fender */}
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

        {/* Main Weathered Sal/Teak Timber Deck */}
        <mesh position={[0, 2.4, 0]} material={materials.timberDeckMat} receiveShadow>
          <boxGeometry args={[4.4, 0.15, 16.2]} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. RAISED TIMBER FORECASTLE & FOREDECK GEAR                    */}
      {/* ------------------------------------------------------------- */}
      <group name="Trawler_Forecastle">
        {/* Raised Forecastle Deck (Forward stepped platform) */}
        <mesh position={[0, 2.75, -6.2]} material={materials.timberDeckMat} receiveShadow>
          <boxGeometry args={[3.8, 0.15, 4.2]} />
        </mesh>
        {/* Forecastle Timber Bulwarks */}
        <mesh position={[1.92, 3.0, -6.2]} material={materials.topsidesMat}>
          <boxGeometry args={[0.12, 0.5, 4.2]} />
        </mesh>
        <mesh position={[-1.92, 3.0, -6.2]} material={materials.topsidesMat}>
          <boxGeometry args={[0.12, 0.5, 4.2]} />
        </mesh>

        {/* Heavy Mooring Bitts (Foredeck Double H-Bitts) */}
        <group position={[0.9, 3.1, -7.5]}>
          <mesh material={materials.steelMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          </mesh>
          <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.steelMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          </mesh>
        </group>
        <group position={[-0.9, 3.1, -7.5]}>
          <mesh material={materials.steelMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          </mesh>
          <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.steelMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          </mesh>
        </group>

        {/* Heavy Anchor Windlass & Capstan Gear */}
        <group position={[0, 3.15, -6.0]}>
          {/* Windlass Central Gearbox */}
          <mesh material={materials.steelMat} castShadow>
            <boxGeometry args={[1.1, 0.55, 0.6]} />
          </mesh>
          {/* Dual Chain Gypsies / Warping Drums */}
          <mesh position={[0.7, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.steelMat}>
            <cylinderGeometry args={[0.22, 0.22, 0.35, 12]} />
          </mesh>
          <mesh position={[-0.7, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.steelMat}>
            <cylinderGeometry args={[0.22, 0.22, 0.35, 12]} />
          </mesh>
          {/* Brake Handwheel (Brass) */}
          <mesh position={[0, 0.38, 0]} material={materials.brassMat}>
            <torusGeometry args={[0.16, 0.02, 6, 12]} />
          </mesh>
          {/* Anchor Hawse Pipe & Galvanized Chain */}
          <mesh position={[-0.6, -0.2, -1.2]} rotation={[0.6, 0, 0]} material={materials.galvanizedMat}>
            <cylinderGeometry args={[0.08, 0.08, 1.4, 8]} />
          </mesh>
        </group>

        {/* Stowed Danforth Anchor (Port Bow) */}
        <group position={[-2.1, 2.8, -7.2]} rotation={[0.3, 0.2, -0.4]}>
          {/* Anchor Shank */}
          <mesh material={materials.galvanizedMat} castShadow>
            <boxGeometry args={[0.08, 1.4, 0.08]} />
          </mesh>
          {/* Anchor Flukes */}
          <mesh position={[0, -0.6, 0.15]} material={materials.galvanizedMat} castShadow>
            <boxGeometry args={[0.6, 0.5, 0.06]} />
          </mesh>
          {/* Anchor Stock Crossbar */}
          <mesh position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.galvanizedMat}>
            <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
          </mesh>
        </group>

        {/* Coiled Manila Ropes on Foredeck */}
        <group position={[0.8, 2.9, -5.2]}>
          <mesh material={materials.ropeMat}>
            <torusGeometry args={[0.32, 0.08, 8, 16]} />
          </mesh>
          <mesh position={[0, 0.06, 0]} material={materials.ropeMat}>
            <torusGeometry args={[0.22, 0.07, 8, 16]} />
          </mesh>
        </group>

        {/* Forward Jackstaff with Maritime Pennant */}
        <group position={[0, 3.5, -8.2]}>
          <mesh material={materials.steelMat}>
            <cylinderGeometry args={[0.03, 0.04, 1.8, 8]} />
          </mesh>
          {/* Red/Gold Indian Coastal Prayer Pennant */}
          <mesh position={[0.25, 0.55, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.5, 0.3, 0.02]} />
            <meshStandardMaterial color="#E63946" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. CENTRAL TIMBER WHEELHOUSE DECK CABIN                        */}
      {/* ------------------------------------------------------------- */}
      <group name="Trawler_Wheelhouse" position={[0, 3.9, -1.8]}>
        {/* Main Wheelhouse Body (Sea-salt painted timber) */}
        <mesh material={materials.cabinMat} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.8, 4.6]} />
        </mesh>
        {/* Cabin Roof Overhang / Cap */}
        <mesh position={[0, 1.48, 0]} material={materials.cabinTrimMat} castShadow>
          <boxGeometry args={[3.6, 0.16, 4.8]} />
        </mesh>

        {/* Forward Navigation Bridge Windows (Angled Forward Glazing) */}
        <group position={[0, 0.5, -2.32]}>
          {/* Center Window */}
          <mesh position={[0, 0, 0]} material={materials.glassMat}>
            <boxGeometry args={[1.1, 0.95, 0.05]} />
          </mesh>
          {/* Port Window */}
          <mesh position={[-1.15, 0, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.85, 0.95, 0.05]} />
          </mesh>
          {/* Starboard Window */}
          <mesh position={[1.15, 0, 0]} material={materials.glassMat}>
            <boxGeometry args={[0.85, 0.95, 0.05]} />
          </mesh>
          {/* Teak Window Frames */}
          <mesh position={[0, 0.52, 0.02]} material={materials.cabinTrimMat}>
            <boxGeometry args={[3.3, 0.08, 0.06]} />
          </mesh>
        </group>

        {/* Side Portholes (Brass Bezel Rings + Glass) */}
        {[-1.0, 0.6].map((zOffset, i) => (
          <React.Fragment key={`portholes-${i}`}>
            {/* Starboard Porthole */}
            <group position={[1.72, 0.35, zOffset]} rotation={[0, Math.PI / 2, 0]}>
              <mesh material={materials.brassMat}>
                <torusGeometry args={[0.22, 0.035, 8, 16]} />
              </mesh>
              <mesh material={materials.glassMat}>
                <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
              </mesh>
            </group>
            {/* Port Porthole */}
            <group position={[-1.72, 0.35, zOffset]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh material={materials.brassMat}>
                <torusGeometry args={[0.22, 0.035, 8, 16]} />
              </mesh>
              <mesh material={materials.glassMat}>
                <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
              </mesh>
            </group>
          </React.Fragment>
        ))}

        {/* Cabin Side Entry Door with Brass Handle */}
        <group position={[1.71, -0.2, 1.2]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={materials.cabinTrimMat}>
            <boxGeometry args={[0.9, 1.9, 0.04]} />
          </mesh>
          <mesh position={[0.3, 0, 0.04]} material={materials.brassMat}>
            <sphereGeometry args={[0.04, 8, 8]} />
          </mesh>
        </group>

        {/* Safety Lifebuoys (Port & Starboard) */}
        <group position={[1.74, 0.4, -0.2]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={materials.lifebuoyMat}>
            <torusGeometry args={[0.32, 0.09, 8, 16]} />
          </mesh>
          {/* White retroreflective tape bands */}
          <mesh position={[0, 0.3, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
          </mesh>
          <mesh position={[0, -0.3, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
          </mesh>
        </group>
        <group position={[-1.74, 0.4, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh material={materials.lifebuoyMat}>
            <torusGeometry args={[0.32, 0.09, 8, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
          </mesh>
          <mesh position={[0, -0.3, 0]} material={materials.waterlineMat}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
          </mesh>
        </group>

        {/* Wheelhouse Rooftop Equipment */}
        <group position={[0, 1.55, 0]}>
          {/* Brass Searchlight */}
          <group position={[-0.8, 0.35, -1.8]}>
            <mesh material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.18, 0.12, 0.32, 12]} />
            </mesh>
            <mesh position={[0, 0.17, 0]} material={materials.glassMat}>
              <circleGeometry args={[0.17, 12]} />
            </mesh>
            <mesh position={[0, -0.22, 0]} material={materials.steelMat}>
              <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
            </mesh>
          </group>

          {/* Navigation Lights (Port Red, Starboard Green) */}
          <mesh position={[1.7, 0.1, -1.2]} castShadow>
            <boxGeometry args={[0.15, 0.2, 0.2]} />
            <meshStandardMaterial color="#2A9D8F" roughness={0.2} emissive="#104E46" />
          </mesh>
          <mesh position={[-1.7, 0.1, -1.2]} castShadow>
            <boxGeometry args={[0.15, 0.2, 0.2]} />
            <meshStandardMaterial color="#E63946" roughness={0.2} emissive="#7A121A" />
          </mesh>

          {/* Loudhailer Horn Speaker */}
          <group position={[0.7, 0.25, -1.8]} rotation={[-0.2, 0, 0]}>
            <mesh material={materials.steelMat}>
              <coneGeometry args={[0.14, 0.3, 10]} />
            </mesh>
          </group>

          {/* Life-Raft Canister in Deck Cradle */}
          <group position={[0, 0.3, 1.4]}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={materials.waterlineMat} castShadow>
              <capsuleGeometry args={[0.26, 0.8, 8, 12]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={materials.steelMat}>
              <boxGeometry args={[1.0, 0.15, 0.45]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. AFT WORKING DECK, TRAWLING GANTRY & WINCHES                */}
      {/* ------------------------------------------------------------- */}
      <group name="Trawler_AftDeck">
        {/* Heavy Engine Dry Exhaust Funnel (Aft of Wheelhouse) */}
        <group position={[0.8, 5.2, 0.8]}>
          <mesh material={materials.steelMat} castShadow>
            <cylinderGeometry args={[0.12, 0.14, 3.2, 10]} />
          </mesh>
          {/* Thermal Insulation Wrap */}
          <mesh position={[0, -0.4, 0]} material={materials.ropeMat}>
            <cylinderGeometry args={[0.16, 0.16, 1.8, 10]} />
          </mesh>
          {/* Slash-cut Exhaust Cap with Rain Flap */}
          <mesh position={[0, 1.65, 0]} rotation={[0.4, 0, 0]} material={materials.steelMat}>
            <cylinderGeometry args={[0.13, 0.13, 0.2, 10]} />
          </mesh>
        </group>

        {/* Dual-Drum Hydraulic Trawling Winch */}
        <group position={[0, 2.9, 1.5]}>
          {/* Heavy Cast Winch Bed */}
          <mesh material={materials.steelMat} castShadow>
            <boxGeometry args={[2.4, 0.5, 1.1]} />
          </mesh>
          {/* Port Wire Drum */}
          <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.galvanizedMat} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.7, 12]} />
          </mesh>
          {/* Starboard Wire Drum */}
          <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.galvanizedMat} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.7, 12]} />
          </mesh>
          {/* Hydraulic Drive Motor */}
          <mesh position={[0, 0.25, 0]} material={materials.steelMat}>
            <cylinderGeometry args={[0.2, 0.2, 0.45, 8]} />
          </mesh>
        </group>

        {/* Structural Heavy Timber / Steel A-Frame Trawler Gantry */}
        <group position={[0, 4.8, 6.2]}>
          {/* Port Upright Leg */}
          <mesh position={[-1.9, 0, 0]} rotation={[0, 0, -0.16]} material={materials.steelMat} castShadow>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
          </mesh>
          {/* Starboard Upright Leg */}
          <mesh position={[1.9, 0, 0]} rotation={[0, 0, 0.16]} material={materials.steelMat} castShadow>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
          </mesh>
          {/* Crossbeam Header */}
          <mesh position={[0, 2.1, 0]} material={materials.steelMat} castShadow>
            <boxGeometry args={[3.8, 0.25, 0.25]} />
          </mesh>
          {/* Diagonal Knee Braces */}
          <mesh position={[-1.2, 1.5, 0]} rotation={[0, 0, 0.7]} material={materials.steelMat}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
          </mesh>
          <mesh position={[1.2, 1.5, 0]} rotation={[0, 0, -0.7]} material={materials.steelMat}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
          </mesh>

          {/* Yellow Boom Derrick Mast & Lifting Tackle Pulleys */}
          <mesh position={[0, 2.4, 0.4]} rotation={[0.35, 0, 0]} material={materials.derrickYellowMat} castShadow>
            <boxGeometry args={[0.18, 2.6, 0.18]} />
          </mesh>
          <mesh position={[0, 3.4, 1.2]} material={materials.brassMat}>
            <torusGeometry args={[0.12, 0.03, 6, 12]} />
          </mesh>
        </group>

        {/* Trawl Net Drum with Heavy Green Mesh & Orange Floats */}
        <group position={[0, 3.2, 6.0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.netMat} castShadow>
            <cylinderGeometry args={[0.55, 0.55, 3.0, 12]} />
          </mesh>
          {/* Orange Seine Net Floats */}
          {[-1.2, -0.6, 0, 0.6, 1.2].map((fPos, fi) => (
            <mesh key={`float-${fi}`} position={[fPos, 0.45, 0]} material={materials.floatMat}>
              <sphereGeometry args={[0.09, 8, 8]} />
            </mesh>
          ))}
        </group>

        {/* Stacked Seafood / Fish Crates (Port Working Area) */}
        <group position={[-1.4, 2.7, 3.8]}>
          {/* Tier 1 Crates */}
          <mesh position={[0, 0.15, 0]} material={materials.crateBlueMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
          <mesh position={[0, 0.15, 0.7]} material={materials.crateOrangeMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
          {/* Tier 2 Stacked Crates */}
          <mesh position={[0.05, 0.5, 0.1]} material={materials.crateYellowMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
          <mesh position={[0.02, 0.5, 0.75]} material={materials.crateBlueMat} castShadow>
            <boxGeometry args={[0.8, 0.35, 0.6]} />
          </mesh>
        </group>

        {/* Stacked Woven Bamboo Crab Pots (Starboard Working Area) */}
        <group position={[1.4, 2.7, 3.8]}>
          <mesh position={[0, 0.2, 0]} material={materials.crabPotMat} castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.4, 10]} />
          </mesh>
          <mesh position={[0, 0.2, 0.85]} material={materials.crabPotMat} castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.4, 10]} />
          </mesh>
          <mesh position={[0.05, 0.6, 0.35]} material={materials.crabPotMat} castShadow>
            <cylinderGeometry args={[0.36, 0.4, 0.4, 10]} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. NAVIGATION MAST & RIGGING                                  */}
      {/* ------------------------------------------------------------- */}
      <group name="Trawler_MainMast" position={[0, 5.5, -0.6]}>
        {/* Heavy Steel Mainmast Pole */}
        <mesh position={[0, 2.5, 0]} material={materials.steelMat} castShadow>
          <cylinderGeometry args={[0.1, 0.14, 5.8, 10]} />
        </mesh>
        {/* Cross-Trees / Spreader Bar */}
        <mesh position={[0, 4.2, 0]} material={materials.steelMat}>
          <boxGeometry args={[2.8, 0.08, 0.08]} />
        </mesh>

        {/* Rotating Open-Array Marine Radar Scanner */}
        <group position={[0, 3.6, 0.3]} ref={radarRef}>
          <mesh material={materials.waterlineMat} castShadow>
            <boxGeometry args={[1.2, 0.14, 0.16]} />
          </mesh>
          <mesh position={[0, -0.15, 0]} material={materials.steelMat}>
            <cylinderGeometry args={[0.1, 0.12, 0.25, 8]} />
          </mesh>
        </group>

        {/* Masthead All-Round White Light */}
        <mesh position={[0, 5.4, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.18, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFEBB3" roughness={0.1} />
        </mesh>

        {/* Dual VHF Radio Aerial Whips */}
        <mesh position={[-1.3, 5.2, 0]} rotation={[0, 0, -0.08]} material={materials.galvanizedMat}>
          <cylinderGeometry args={[0.015, 0.02, 2.4, 6]} />
        </mesh>
        <mesh position={[1.3, 5.2, 0]} rotation={[0, 0, 0.08]} material={materials.galvanizedMat}>
          <cylinderGeometry args={[0.015, 0.02, 2.4, 6]} />
        </mesh>

        {/* Rigging Stay Cables (Fine Steel Wires) */}
        <mesh position={[-1.1, 2.2, 0]} rotation={[0, 0, -0.38]} material={materials.galvanizedMat}>
          <cylinderGeometry args={[0.01, 0.01, 4.8, 4]} />
        </mesh>
        <mesh position={[1.1, 2.2, 0]} rotation={[0, 0, 0.38]} material={materials.galvanizedMat}>
          <cylinderGeometry args={[0.01, 0.01, 4.8, 4]} />
        </mesh>
        <mesh position={[0, 2.2, 2.2]} rotation={[0.42, 0, 0]} material={materials.galvanizedMat}>
          <cylinderGeometry args={[0.01, 0.01, 5.0, 4]} />
        </mesh>
      </group>
    </group>
  );
};

/* =========================================================================
 * 2. HIGH-OCTANE COASTAL WATERSPORTS FLEET
 * High-detail Sea-Doo GTX style jet skis & expedition touring sea kayaks
 * staged in the beach shallows (Z: 200m..215m).
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
      hullMat: new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.45
      }),
      accentMat: new THREE.MeshStandardMaterial({
        color: secondaryColor,
        roughness: 0.3,
        metalness: 0.6
      }),
      seatMat: new THREE.MeshStandardMaterial({
        color: '#1A1D20', // Grippy marine vinyl saddle
        roughness: 0.88,
        metalness: 0.05
      }),
      tractionMat: new THREE.MeshStandardMaterial({
        color: '#2B303A', // Non-slip EVA foam footwell mat
        roughness: 0.95
      }),
      hardwareMat: new THREE.MeshStandardMaterial({
        color: '#22252A',
        roughness: 0.4,
        metalness: 0.8
      }),
      glassMat: new THREE.MeshStandardMaterial({
        color: '#0A192F',
        roughness: 0.1,
        metalness: 0.9
      })
    };
  }, [color, secondaryColor]);

  return (
    <group name={name} position={position} rotation={[0, yaw, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Lower Deep-V Sculpted Hull with Spray Chines */}
      <mesh position={[0, 0.25, 0]} material={materials.accentMat} castShadow receiveShadow>
        <boxGeometry args={[1.24, 0.42, 3.4]} />
      </mesh>
      {/* Reverse Bow V-Stem */}
      <mesh position={[0, 0.35, -1.65]} rotation={[0.45, 0, 0]} material={materials.accentMat} castShadow>
        <boxGeometry args={[1.05, 0.4, 0.9]} />
      </mesh>

      {/* Upper Molded Gelcoat Deck (High-Gloss Vibrant Sport Livery) */}
      <mesh position={[0, 0.55, -0.1]} material={materials.hullMat} castShadow>
        <boxGeometry args={[1.32, 0.32, 3.1]} />
      </mesh>
      {/* Front Hood Flare & Air Intake Cowling */}
      <mesh position={[0, 0.72, -1.1]} rotation={[-0.2, 0, 0]} material={materials.hullMat} castShadow>
        <boxGeometry args={[0.95, 0.25, 1.4]} />
      </mesh>
      {/* Side Sponsons for High-Speed Stability */}
      <mesh position={[0.64, 0.25, 0.4]} material={materials.hullMat}>
        <boxGeometry args={[0.1, 0.18, 1.8]} />
      </mesh>
      <mesh position={[-0.64, 0.25, 0.4]} material={materials.hullMat}>
        <boxGeometry args={[0.1, 0.18, 1.8]} />
      </mesh>

      {/* Rear Boarding Platform & EVA Foam Footwells */}
      <mesh position={[0, 0.42, 1.2]} material={materials.tractionMat}>
        <boxGeometry args={[1.1, 0.08, 0.9]} />
      </mesh>

      {/* Tiered Ergonomic Touring Saddle */}
      <group position={[0, 0.78, 0.1]}>
        {/* Main Rider Seat */}
        <mesh position={[0, 0, -0.3]} material={materials.seatMat} castShadow>
          <boxGeometry args={[0.52, 0.28, 1.1]} />
        </mesh>
        {/* Elevated Passenger Lumbar Bolster */}
        <mesh position={[0, 0.12, 0.45]} material={materials.seatMat} castShadow>
          <boxGeometry args={[0.48, 0.36, 0.8]} />
        </mesh>
      </group>

      {/* Steering Handlebars, Digital Display Console & Mirrors */}
      <group position={[0, 1.05, -0.65]}>
        {/* Console Cowling */}
        <mesh material={materials.hardwareMat} castShadow>
          <boxGeometry args={[0.45, 0.25, 0.35]} />
        </mesh>
        {/* Digital LCD Instrument Display */}
        <mesh position={[0, 0.13, 0.02]} rotation={[-0.6, 0, 0]} material={materials.glassMat}>
          <planeGeometry args={[0.26, 0.14]} />
        </mesh>
        {/* Ergonomic Handlebars */}
        <mesh position={[0, 0.05, 0.1]} rotation={[0, 0, Math.PI / 2]} material={materials.hardwareMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.88, 8]} />
        </mesh>
        {/* Rubber Handgrips */}
        <mesh position={[0.4, 0.05, 0.1]} rotation={[0, 0, Math.PI / 2]} material={materials.seatMat}>
          <cylinderGeometry args={[0.045, 0.045, 0.2, 8]} />
        </mesh>
        <mesh position={[-0.4, 0.05, 0.1]} rotation={[0, 0, Math.PI / 2]} material={materials.seatMat}>
          <cylinderGeometry args={[0.045, 0.045, 0.2, 8]} />
        </mesh>
        {/* Aerodynamic Side Mirrors */}
        <mesh position={[0.38, 0.15, -0.05]} material={materials.hullMat}>
          <boxGeometry args={[0.18, 0.1, 0.12]} />
        </mesh>
        <mesh position={[-0.38, 0.15, -0.05]} material={materials.hullMat}>
          <boxGeometry args={[0.18, 0.1, 0.12]} />
        </mesh>
      </group>

      {/* Jet Pump Steering Nozzle & Reverse Bucket (Stern) */}
      <group position={[0, 0.25, 1.75]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.hardwareMat}>
          <cylinderGeometry args={[0.12, 0.14, 0.35, 10]} />
        </mesh>
        <mesh position={[0, -0.08, 0.12]} material={materials.hardwareMat}>
          <boxGeometry args={[0.3, 0.16, 0.18]} />
        </mesh>
      </group>
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
      hullMat: new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.2
      }),
      trimMat: new THREE.MeshStandardMaterial({
        color: '#1F2421',
        roughness: 0.8
      }),
      paddleCarbonMat: new THREE.MeshStandardMaterial({
        color: '#151515',
        roughness: 0.2,
        metalness: 0.85
      }),
      paddleBladeMat: new THREE.MeshStandardMaterial({
        color: '#E63946',
        roughness: 0.4
      }),
      ropeMat: new THREE.MeshStandardMaterial({
        color: '#F1FAEE',
        roughness: 0.7
      })
    };
  }, [color]);

  return (
    <group name={name} position={position} rotation={[0, yaw, 0]} scale={[1.05, 1.05, 1.05]}>
      {/* Sleek 5.2m Expedition Sea Kayak Hull with Rocker Bow/Stern */}
      <mesh position={[0, 0.18, 0]} material={materials.hullMat} castShadow receiveShadow>
        <boxGeometry args={[0.68, 0.34, 4.2]} />
      </mesh>
      {/* Upswept Bow Rocker */}
      <mesh position={[0, 0.28, -2.4]} rotation={[0.3, 0, 0]} material={materials.hullMat} castShadow>
        <boxGeometry args={[0.45, 0.28, 1.2]} />
      </mesh>
      {/* Upswept Stern Rocker */}
      <mesh position={[0, 0.26, 2.3]} rotation={[-0.22, 0, 0]} material={materials.hullMat} castShadow>
        <boxGeometry args={[0.48, 0.28, 1.1]} />
      </mesh>

      {/* Recessed Cockpit Coaming Rim & Padded Seat */}
      <group position={[0, 0.36, 0]}>
        <mesh material={materials.trimMat}>
          <torusGeometry args={[0.34, 0.04, 6, 16]} />
        </mesh>
        <mesh position={[0, -0.06, 0.05]} material={materials.trimMat}>
          <boxGeometry args={[0.42, 0.12, 0.48]} />
        </mesh>
      </group>

      {/* Criss-Cross Bungee Deck Rigging with Stowed Dry Bag (Foredeck) */}
      <group position={[0, 0.36, -1.2]}>
        <mesh rotation={[0, 0, 0.5]} material={materials.ropeMat}>
          <boxGeometry args={[0.5, 0.02, 0.02]} />
        </mesh>
        <mesh rotation={[0, 0, -0.5]} material={materials.ropeMat}>
          <boxGeometry args={[0.5, 0.02, 0.02]} />
        </mesh>
        {/* Waterproof Stowed Dry Bag */}
        <mesh position={[0, 0.08, 0]} material={materials.trimMat} castShadow>
          <capsuleGeometry args={[0.12, 0.35, 6, 8]} />
        </mesh>
      </group>

      {/* Dual-Bladed Carbon-Shaft Kayak Paddle resting across deck */}
      <group position={[0.15, 0.45, -0.2]} rotation={[0.1, 0.4, 0.15]}>
        {/* Carbon Fiber Shaft */}
        <mesh material={materials.paddleCarbonMat}>
          <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
        </mesh>
        {/* Left Asymmetric Blade */}
        <mesh position={[0, 1.1, 0]} material={materials.paddleBladeMat}>
          <boxGeometry args={[0.18, 0.45, 0.02]} />
        </mesh>
        {/* Right Asymmetric Blade */}
        <mesh position={[0, -1.1, 0]} rotation={[0, Math.PI / 3, 0]} material={materials.paddleBladeMat}>
          <boxGeometry args={[0.18, 0.45, 0.02]} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Beach Staging Equipment
 * Sand skids, launch rollers, and mooring stake tethers for the watersports base
 */
const BeachStagingEquipment: React.FC = () => {
  const materials = useMemo(() => {
    return {
      timberMat: new THREE.MeshStandardMaterial({ color: '#5C3D28', roughness: 0.85 }),
      ropeMat: new THREE.MeshStandardMaterial({ color: '#D4B996', roughness: 0.9 })
    };
  }, []);

  return (
    <group name="BeachStagingInfrastructure">
      {/* Launch Rollers / Sand Skids under craft */}
      {[-4, 0, 4].map((xOff, i) => (
        <group key={`skid-${i}`} position={[xOff, 0.05, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.timberMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
          </mesh>
          <mesh position={[0, 0, 1.5]} rotation={[0, 0, Math.PI / 2]} material={materials.timberMat} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 8]} />
          </mesh>
          {/* Hemp Rope Tie-Down Lines on Weathered Timber Launching Skids */}
          <mesh position={[0, 0.12, 0.75]} rotation={[Math.PI / 2, 0, 0]} material={materials.ropeMat}>
            <torusGeometry args={[0.42, 0.025, 6, 12]} />
          </mesh>
        </group>
      ))}

      {/* Timber Mooring Stake driven into sand with tie line */}
      <group position={[-1.5, 0.25, -2.5]}>
        <mesh rotation={[0.15, 0, 0.1]} material={materials.timberMat} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
        </mesh>
        <mesh position={[0.4, -0.05, 0.8]} rotation={[0.4, 0.3, 0]} material={materials.ropeMat}>
          <cylinderGeometry args={[0.015, 0.015, 1.8, 4]} />
        </mesh>
      </group>
    </group>
  );
};

/* =========================================================================
 * 3. FLAGSHIP 25.90M LUXURY EXPEDITION CATAMARAN
 * Twin wave-piercing demi-hulls, composite bridgedeck, 360° tinted glazing,
 * teak cockpit, upper flybridge, and expedition navigation radar arch.
 * ========================================================================= */

interface CatamaranProps {
  radarRef?: React.RefObject<THREE.Group | null>;
}

const ExpeditionCatamaran25M: React.FC<CatamaranProps> = ({ radarRef }) => {
  const materials = useMemo(() => {
    return {
      // Luxury Alabaster White Composite Gelcoat
      compositeMat: new THREE.MeshStandardMaterial({
        color: '#F8F9FA',
        roughness: 0.25,
        metalness: 0.12
      }),
      // Metallic Charcoal Boot-Top & Accent Stripe
      bootTopMat: new THREE.MeshStandardMaterial({
        color: '#212529',
        roughness: 0.35,
        metalness: 0.7
      }),
      // Bronze-Copper Anti-Fouling Underwater Hull
      antiFoulingMat: new THREE.MeshStandardMaterial({
        color: '#6E3D29',
        roughness: 0.65,
        metalness: 0.3
      }),
      // Weathered Marine Teak Deck Planking
      teakDeckMat: new THREE.MeshStandardMaterial({
        color: '#7A5233',
        roughness: 0.75,
        metalness: 0.03
      }),
      // Privacy-Tinted Panoramic Wraparound Marine Glazing
      glassMat: new THREE.MeshStandardMaterial({
        color: '#071A2B',
        roughness: 0.08,
        metalness: 0.95,
        transparent: true,
        opacity: 0.88
      }),
      // Polished Marine Stainless Steel 316L (Stanchions, Arch, Ladders)
      stainlessMat: new THREE.MeshStandardMaterial({
        color: '#E9ECEF',
        roughness: 0.18,
        metalness: 0.92
      }),
      // Gold-Trimmed Expedition Accent
      goldTrimMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.3,
        metalness: 0.85
      }),
      // Forward Trampoline Mesh Netting
      trampolineMat: new THREE.MeshStandardMaterial({
        color: '#2B303A',
        roughness: 0.95,
        metalness: 0.0,
        side: THREE.DoubleSide
      }),
      // Cushions / Sunpads (Alabaster Outdoor Sunbrella Fabric)
      cushionMat: new THREE.MeshStandardMaterial({
        color: '#ECE5DB',
        roughness: 0.9
      })
    };
  }, []);

  return (
    <group scale={[1.35, 1.35, 1.35]}>
      {/* ------------------------------------------------------------- */}
      {/* 1. TWIN WAVE-PIERCING DEMI-HULLS                              */}
      {/* ------------------------------------------------------------- */}
      <group name="Catamaran_Hulls">
        {/* Port Demi-Hull (Beam spacing X: -4.8m) */}
        <group position={[-4.8, 0, 0]}>
          {/* Lower Hull Anti-Fouling */}
          <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.9, 23.5]} />
          </mesh>
          {/* Boot-Top Stripe */}
          <mesh position={[0, 0.95, 0]} material={materials.bootTopMat}>
            <boxGeometry args={[2.25, 0.18, 23.8]} />
          </mesh>
          {/* Upper Freeboard / Topsides (Alabaster Composite) */}
          <mesh position={[0, 1.8, 0]} material={materials.compositeMat} castShadow receiveShadow>
            <boxGeometry args={[2.3, 1.55, 24.2]} />
          </mesh>
          {/* Reverse Wave-Piercing Bow */}
          <mesh position={[0, 1.5, -12.4]} rotation={[-0.32, 0, 0]} material={materials.compositeMat} castShadow>
            <boxGeometry args={[2.1, 1.9, 2.8]} />
          </mesh>
          {/* Transom Swim Platform with Teak Step Treads */}
          <group position={[0, 0.8, 12.2]}>
            <mesh material={materials.compositeMat}>
              <boxGeometry args={[2.2, 0.4, 1.4]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={materials.teakDeckMat}>
              <boxGeometry args={[2.0, 0.05, 1.2]} />
            </mesh>
            {/* Stainless Steel Swim Ladder */}
            <mesh position={[0.7, -0.2, 0.6]} material={materials.stainlessMat}>
              <boxGeometry args={[0.4, 0.8, 0.04]} />
            </mesh>
          </group>
        </group>

        {/* Starboard Demi-Hull (Beam spacing X: +4.8m) */}
        <group position={[4.8, 0, 0]}>
          {/* Lower Hull Anti-Fouling */}
          <mesh position={[0, 0.45, 0]} material={materials.antiFoulingMat} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.9, 23.5]} />
          </mesh>
          {/* Boot-Top Stripe */}
          <mesh position={[0, 0.95, 0]} material={materials.bootTopMat}>
            <boxGeometry args={[2.25, 0.18, 23.8]} />
          </mesh>
          {/* Upper Freeboard / Topsides */}
          <mesh position={[0, 1.8, 0]} material={materials.compositeMat} castShadow receiveShadow>
            <boxGeometry args={[2.3, 1.55, 24.2]} />
          </mesh>
          {/* Reverse Wave-Piercing Bow */}
          <mesh position={[0, 1.5, -12.4]} rotation={[-0.32, 0, 0]} material={materials.compositeMat} castShadow>
            <boxGeometry args={[2.1, 1.9, 2.8]} />
          </mesh>
          {/* Transom Swim Platform */}
          <group position={[0, 0.8, 12.2]}>
            <mesh material={materials.compositeMat}>
              <boxGeometry args={[2.2, 0.4, 1.4]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={materials.teakDeckMat}>
              <boxGeometry args={[2.0, 0.05, 1.2]} />
            </mesh>
            <mesh position={[-0.7, -0.2, 0.6]} material={materials.stainlessMat}>
              <boxGeometry args={[0.4, 0.8, 0.04]} />
            </mesh>
          </group>
        </group>

        {/* Forward Trampoline Netting Between Bows */}
        <group position={[0, 2.4, -9.8]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.trampolineMat} receiveShadow>
            <planeGeometry args={[7.2, 4.4]} />
          </mesh>
          {/* Carbon Fiber Spreader Crossbeam */}
          <mesh position={[0, 0.05, -2.2]} material={materials.bootTopMat}>
            <boxGeometry args={[8.4, 0.2, 0.35]} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. BRIDGEDECK MAIN SALOON & COCKPIT DECK                      */}
      {/* ------------------------------------------------------------- */}
      <group name="Catamaran_Bridgedeck">
        {/* Main Bridgedeck Teak Floor Platform */}
        <mesh position={[0, 2.58, 0.8]} material={materials.teakDeckMat} receiveShadow>
          <boxGeometry args={[11.8, 0.22, 21.2]} />
        </mesh>

        {/* Main Saloon Superstructure Deckhouse */}
        <group position={[0, 4.25, -0.6]}>
          {/* Composite Cabin Shell */}
          <mesh material={materials.compositeMat} castShadow>
            <boxGeometry args={[9.4, 2.65, 13.6]} />
          </mesh>
          {/* Cantilevered Overhang Sun Brow */}
          <mesh position={[0, 1.38, -0.5]} material={materials.compositeMat} castShadow>
            <boxGeometry args={[9.8, 0.18, 14.6]} />
          </mesh>

          {/* Panoramic 360° Wraparound Marine Glazing */}
          {/* Forward Windscreens */}
          <mesh position={[0, 0.25, -6.82]} rotation={[-0.15, 0, 0]} material={materials.glassMat}>
            <planeGeometry args={[8.8, 1.6]} />
          </mesh>
          {/* Port Side Panoramic Glazing */}
          <mesh position={[-4.72, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} material={materials.glassMat}>
            <planeGeometry args={[12.4, 1.55]} />
          </mesh>
          {/* Starboard Side Panoramic Glazing */}
          <mesh position={[4.72, 0.25, 0]} rotation={[0, Math.PI / 2, 0]} material={materials.glassMat}>
            <planeGeometry args={[12.4, 1.55]} />
          </mesh>
          {/* Aft Sliding Saloon Glass Doors */}
          <mesh position={[0, 0.25, 6.82]} material={materials.glassMat}>
            <planeGeometry args={[7.2, 1.6]} />
          </mesh>
        </group>

        {/* Aft Cockpit Shaded Dining Lounge */}
        <group position={[0, 2.8, 8.5]}>
          {/* Teak Cockpit Table */}
          <mesh position={[0, 0.42, 0]} material={materials.teakDeckMat} castShadow>
            <boxGeometry args={[2.8, 0.08, 1.6]} />
          </mesh>
          <mesh position={[0, 0.2, 0]} material={materials.stainlessMat}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          </mesh>
          {/* U-Shaped Cockpit Settee with Sunbrella Cushions */}
          <mesh position={[0, 0.3, 1.6]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[4.8, 0.35, 0.9]} />
          </mesh>
          <mesh position={[-2.2, 0.3, 0.6]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[0.9, 0.35, 1.8]} />
          </mesh>
          <mesh position={[2.2, 0.3, 0.6]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[0.9, 0.35, 1.8]} />
          </mesh>
        </group>

        {/* Forward Portuguese Bridge / Foredeck Sunpad Lounge */}
        <group position={[0, 2.8, -8.2]}>
          <mesh position={[-2.2, 0.12, 0]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[2.6, 0.18, 2.2]} />
          </mesh>
          <mesh position={[2.2, 0.12, 0]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[2.6, 0.18, 2.2]} />
          </mesh>
        </group>

        {/* Stainless Steel Perimeter Guardrails & Stanchions */}
        <group name="Deck_Guardrails">
          {/* Port Railings */}
          <mesh position={[-5.8, 3.2, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
          <mesh position={[-5.8, 3.6, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
          {/* Starboard Railings */}
          <mesh position={[5.8, 3.2, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
          <mesh position={[5.8, 3.6, 0]} material={materials.stainlessMat}>
            <boxGeometry args={[0.04, 0.04, 23.0]} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. UPPER FLYBRIDGE DECK & EXPEDITION RADAR ARCH               */}
      {/* ------------------------------------------------------------- */}
      <group name="Catamaran_Flybridge" position={[0, 5.75, -0.6]}>
        {/* Flybridge Teak Deck Floor */}
        <mesh material={materials.teakDeckMat} receiveShadow>
          <boxGeometry args={[7.8, 0.18, 10.4]} />
        </mesh>
        {/* Low-Profile Tinted Glass Wind Deflector */}
        <mesh position={[0, 0.55, -5.18]} material={materials.glassMat}>
          <planeGeometry args={[7.4, 0.8]} />
        </mesh>

        {/* Flybridge Helm Station Console */}
        <group position={[0, 0.65, -3.8]}>
          <mesh material={materials.compositeMat} castShadow>
            <boxGeometry args={[3.2, 0.7, 0.9]} />
          </mesh>
          {/* Dual Multi-Function Navigation Displays (MFD) */}
          <mesh position={[-0.7, 0.38, -0.1]} rotation={[-0.5, 0, 0]} material={materials.glassMat}>
            <planeGeometry args={[0.65, 0.38]} />
          </mesh>
          <mesh position={[0.7, 0.38, -0.1]} rotation={[-0.5, 0, 0]} material={materials.glassMat}>
            <planeGeometry args={[0.65, 0.38]} />
          </mesh>
          {/* Stainless Sport Helm Wheel */}
          <mesh position={[-0.7, 0.45, 0.3]} rotation={[0.8, 0, 0]} material={materials.stainlessMat}>
            <torusGeometry args={[0.18, 0.02, 6, 16]} />
          </mesh>
          {/* Captain & Navigator Bucket Seats */}
          <mesh position={[-0.7, 0.3, 0.8]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[0.65, 0.6, 0.6]} />
          </mesh>
          <mesh position={[0.7, 0.3, 0.8]} material={materials.cushionMat} castShadow>
            <boxGeometry args={[0.65, 0.6, 0.6]} />
          </mesh>
        </group>

        {/* Swept Aerodynamic Composite Radar Arch & Hardtop Canopy */}
        <group position={[0, 2.6, 1.8]}>
          {/* Hardtop Canopy */}
          <mesh material={materials.compositeMat} castShadow>
            <boxGeometry args={[7.6, 0.22, 6.2]} />
          </mesh>
          {/* Swept Support Arch Pillars (Port & Starboard) */}
          <mesh position={[-3.6, -1.2, 0]} rotation={[0, 0, -0.12]} material={materials.compositeMat} castShadow>
            <boxGeometry args={[0.3, 2.4, 0.9]} />
          </mesh>
          <mesh position={[3.6, -1.2, 0]} rotation={[0, 0, 0.12]} material={materials.compositeMat} castShadow>
            <boxGeometry args={[0.3, 2.4, 0.9]} />
          </mesh>

          {/* Expedition Communication Equipment & Domes */}
          {/* Port Satellite Dome (Starlink Maritime) */}
          <group position={[-2.2, 0.55, 0.8]}>
            <mesh material={materials.compositeMat} castShadow>
              <sphereGeometry args={[0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            <mesh position={[0, -0.05, 0]} material={materials.bootTopMat}>
              <cylinderGeometry args={[0.42, 0.42, 0.1, 16]} />
            </mesh>
          </group>

          {/* Starboard Satellite Dome (Inmarsat FleetBroadband) */}
          <group position={[2.2, 0.55, 0.8]}>
            <mesh material={materials.compositeMat} castShadow>
              <sphereGeometry args={[0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            <mesh position={[0, -0.05, 0]} material={materials.bootTopMat}>
              <cylinderGeometry args={[0.42, 0.42, 0.1, 16]} />
            </mesh>
          </group>

          {/* Central Rotating Open-Array Marine Radar Scanner */}
          <group position={[0, 0.9, -0.4]} ref={radarRef}>
            <mesh material={materials.compositeMat} castShadow>
              <boxGeometry args={[2.2, 0.18, 0.22]} />
            </mesh>
            <mesh position={[0, -0.22, 0]} material={materials.stainlessMat}>
              <cylinderGeometry args={[0.15, 0.18, 0.35, 12]} />
            </mesh>
          </group>

          {/* FLIR Thermal Night-Vision Camera Pod */}
          <mesh position={[0, 0.4, -2.8]} material={materials.compositeMat} castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
          </mesh>

          {/* Stainless VHF Whip Antennas */}
          <mesh position={[-3.2, 1.4, 1.8]} rotation={[0, 0, -0.06]} material={materials.stainlessMat}>
            <cylinderGeometry args={[0.015, 0.02, 2.6, 6]} />
          </mesh>
          <mesh position={[3.2, 1.4, 1.8]} rotation={[0, 0, 0.06]} material={materials.stainlessMat}>
            <cylinderGeometry args={[0.015, 0.02, 2.6, 6]} />
          </mesh>

          {/* High-Intensity LED Deck Floodlights */}
          <mesh position={[-1.6, -0.15, 2.8]} material={materials.goldTrimMat}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
          </mesh>
          <mesh position={[1.6, -0.15, 2.8]} material={materials.goldTrimMat}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
