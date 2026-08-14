import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CatamaranHero Component
 * Flagship 25.90M Twin-Hull Luxury Expedition Catamaran for Malpe Waterfront Digital Twin:
 * 
 * Moored offshore at Z = 700m (X = 25m, Y = -0.45m), serving as the offshore expedition hero vessel.
 * 
 * Architectural & Engineering Specifications:
 * 1. 25.90M Twin Wave-Piercing Demi-Hulls:
 *    - Aerodynamic composite demi-hulls in alabaster white gelcoat (#F8F9FA)
 *    - Metallic charcoal boot-top stripe (#212529) and bronze anti-fouling keel (#6E3D29)
 *    - Reverse wave-piercing axe bows and transom swim platforms with teak step treads
 *    - Forward trampoline netting between bows with carbon spreader crossbeam
 * 
 * 2. Lower / Guest Level:
 *    - Guest staterooms with underwater LED illumination (#25C4C0)
 *    - Brass-framed portholes along port and starboard demi-hulls
 * 
 * 3. Main Deck & Bridgedeck Social Lounge:
 *    - Weathered marine teak deck planking (#7A5233)
 *    - Panoramic 360° privacy-tinted marine glazing (#071A2B)
 *    - Main saloon deckhouse, aft cockpit shaded dining lounge with teak table and Sunbrella cushions (#ECE5DB)
 *    - Forward Portuguese bridge sunpad lounge
 * 
 * 4. Upper Deck Observation Terrace / Flybridge:
 *    - Teak flooring, low-profile tinted wind deflector
 *    - Dual helm station console with MFD screens and captain's bucket seats
 *    - Swept aerodynamic composite radar arch with Starlink and Satcom domes
 *    - Rotating open-array marine radar bar (24 RPM)
 *    - FLIR thermal night-vision camera pod, LED floodlights, dual VHF antennas
 *    - Stainless Steel 316L perimeter guardrails (#E9ECEF)
 * 
 * 5. Dynamic Ocean Physics & Water Displacement Wake Trails:
 *    - Realistic heavy displacement wave bobbing physics (heave, pitch, roll, sway)
 *    - Dynamic water displacement wake trail mesh surrounding demi-hulls
 */

export const CatamaranHero: React.FC = () => {
  const catamaranGroupRef = useRef<THREE.Group>(null);
  const radarScannerRef = useRef<THREE.Group>(null);
  const wakeTrailRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      // Luxury Alabaster White Composite Gelcoat
      compositeMat: new THREE.MeshStandardMaterial({
        color: '#F8F9FA',
        roughness: 0.22,
        metalness: 0.12
      }),
      // Metallic Charcoal Boot-Top & Accent Stripe
      bootTopMat: new THREE.MeshStandardMaterial({
        color: '#212529',
        roughness: 0.35,
        metalness: 0.70
      }),
      // Bronze-Copper Anti-Fouling Underwater Hull
      antiFoulingMat: new THREE.MeshStandardMaterial({
        color: '#6E3D29',
        roughness: 0.65,
        metalness: 0.30
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
        roughness: 0.30,
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
        roughness: 0.90
      }),
      // Brass Porthole Bezels
      brassMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.30,
        metalness: 0.85
      }),
      // Underwater Hull LED Light Emissive
      underwaterLedMat: new THREE.MeshStandardMaterial({
        color: '#25C4C0',
        emissive: '#158F93',
        emissiveIntensity: 0.8,
        roughness: 0.2
      }),
      // Water Displacement Wake Trail Material
      wakeMat: new THREE.MeshStandardMaterial({
        color: '#F0F8FF',
        roughness: 0.4,
        metalness: 0.1,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Realistic Heavy Displacement Hull Wave Bobbing Physics
    if (catamaranGroupRef.current) {
      const heave = -0.45 + Math.sin(t * 0.6) * 0.08 + Math.sin(t * 1.25) * 0.025;
      const roll = Math.sin(t * 0.5 + 0.6) * 0.022 + Math.cos(t * 1.1) * 0.008;
      const pitch = Math.cos(t * 0.55 + 0.3) * 0.016 + Math.sin(t * 1.3) * 0.005;
      const yawDrift = -0.28 + Math.sin(t * 0.2) * 0.015;

      catamaranGroupRef.current.position.y = heave;
      catamaranGroupRef.current.rotation.z = roll;
      catamaranGroupRef.current.rotation.x = pitch;
      catamaranGroupRef.current.rotation.y = yawDrift;
    }

    // 2. Rotating Open-Array Marine Radar Scanner (24 RPM)
    if (radarScannerRef.current) {
      radarScannerRef.current.rotation.y = t * 2.513; // 24 RPM
    }

    // 3. Dynamic Water Displacement Wake Pulse
    if (wakeTrailRef.current) {
      wakeTrailRef.current.scale.x = 1.0 + Math.sin(t * 1.2) * 0.03;
      wakeTrailRef.current.scale.y = 1.0 + Math.cos(t * 0.9) * 0.02;
    }
  });

  return (
    <group name="CatamaranHero_Flagship" position={[25, -0.45, 700]} rotation={[0, -0.28, 0]}>
      <group ref={catamaranGroupRef} scale={[1.4, 1.4, 1.4]}>
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
            {/* Reverse Wave-Piercing Bow Stem */}
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

            {/* Lower Level Guest Cabin Portholes */}
            {[-6.0, -2.0, 2.0, 6.0].map((zPos, idx) => (
              <group key={`port-porthole-${idx}`} position={[-1.16, 1.6, zPos]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh material={materials.brassMat}>
                  <torusGeometry args={[0.2, 0.03, 8, 16]} />
                </mesh>
                <mesh material={materials.glassMat}>
                  <cylinderGeometry args={[0.18, 0.18, 0.02, 12]} />
                </mesh>
              </group>
            ))}

            {/* Underwater LED Lights */}
            <mesh position={[0, 0.3, 11.8]} material={materials.underwaterLedMat}>
              <boxGeometry args={[1.8, 0.12, 0.08]} />
            </mesh>
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
            {/* Reverse Wave-Piercing Bow Stem */}
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

            {/* Lower Level Guest Cabin Portholes */}
            {[-6.0, -2.0, 2.0, 6.0].map((zPos, idx) => (
              <group key={`starboard-porthole-${idx}`} position={[1.16, 1.6, zPos]} rotation={[0, Math.PI / 2, 0]}>
                <mesh material={materials.brassMat}>
                  <torusGeometry args={[0.2, 0.03, 8, 16]} />
                </mesh>
                <mesh material={materials.glassMat}>
                  <cylinderGeometry args={[0.18, 0.18, 0.02, 12]} />
                </mesh>
              </group>
            ))}

            {/* Underwater LED Lights */}
            <mesh position={[0, 0.3, 11.8]} material={materials.underwaterLedMat}>
              <boxGeometry args={[1.8, 0.12, 0.08]} />
            </mesh>
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
            <group position={[0, 0.9, -0.4]} ref={radarScannerRef}>
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

        {/* ------------------------------------------------------------- */}
        {/* 4. WATER DISPLACEMENT WAKE TRAILS                            */}
        {/* ------------------------------------------------------------- */}
        <mesh
          ref={wakeTrailRef}
          position={[0, 0.05, 3.0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.wakeMat}
        >
          <planeGeometry args={[16.8, 32.0]} />
        </mesh>
      </group>
    </group>
  );
};
