import React, { useMemo } from 'react';
import * as THREE from 'three';
import { 
  createTeakWoodTexture, 
  createLinenCanopyTexture, 
  createExpeditionMapTexture 
} from '../../../../lib/three/textureGenerator';

/**
 * PavilionArchitecture Component
 * 
 * Luxury Open-Air Weathered Teak Timber Pavilion & Reception Lounge
 * Single Photorealistic Vertical Slice Architecture for Malpe Waterfront Digital Twin
 * 
 * Structural Systems:
 * 1. Weathered Teak Foundation Deck (Y = 0.7m) with sub-deck pier pilings & 3-tier boundary steps.
 * 2. 8 Load-Bearing Teak Timber Pillars with multi-tier bronze/laterite plinths, brass collar bands,
 *    and architectural corbel saddle capitals with 45° knee braces (strict anti-primitive post-and-beam).
 * 3. Heavy Timber Header Beams, Transverse Tie Beams, King Post Trusses, Diagonal Rafters & Purlins.
 * 4. Double-Pitched Natural Linen Tensile Canvas Canopy with ridge cap, stitched seams, realistic slope,
 *    and corner rigging turnbuckles.
 * 5. Interior Concierge Reception Lounge:
 *    - Curved teak batten tambour reception desk with brass inlay countertop and under-counter warm glow.
 *    - Authentic Maritime Brass Captain's Lantern with incandescent filament and warm point lighting.
 *    - Diegetic Expedition Route Navigational Chart (St. Mary's archipelago, Malpe coast, waypoints).
 *    - Dual ergonomic teak slatted visitor seating benches with natural linen cushions.
 *    - Tropical coastal planter boxes flanking the entry.
 */
export const PavilionArchitecture: React.FC = () => {
  const materials = useMemo(() => {
    const { map: teakMap, normalMap: teakNormal, roughnessMap: teakRough } = createTeakWoodTexture();
    const linenMap = createLinenCanopyTexture();
    const expeditionMap = createExpeditionMapTexture();

    // Primary Aged Coastal Teak
    const teakMat = new THREE.MeshStandardMaterial({
      color: '#7A5233',
      map: teakMap,
      normalMap: teakNormal,
      roughnessMap: teakRough,
      roughness: 0.68,
      metalness: 0.04
    });

    // Dark Heavy Structural Timber (Header Beams, Trusses, Rafters)
    const darkTeakMat = new THREE.MeshStandardMaterial({
      color: '#462D1A',
      map: teakMap,
      normalMap: teakNormal,
      roughnessMap: teakRough,
      roughness: 0.76,
      metalness: 0.04
    });

    // Deck Flooring Planks & Step Treads
    const deckMat = new THREE.MeshStandardMaterial({
      color: '#6E492D',
      map: teakMap,
      normalMap: teakNormal,
      roughnessMap: teakRough,
      roughness: 0.82,
      metalness: 0.02
    });

    // Natural Linen Tensile Canvas Canopy
    const canvasMat = new THREE.MeshStandardMaterial({
      color: '#FAF4EB',
      map: linenMap,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    // Canopy Seam Reinforcement Tape
    const canvasTrimMat = new THREE.MeshStandardMaterial({
      color: '#D8CEBE',
      roughness: 0.92,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    // Marine Brass (Lantern, Hardware, Desk Inlay)
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      roughness: 0.28,
      metalness: 0.88
    });

    // Antique Bronze / Structural Iron (Plinth Base Plates, Rafter Brackets, Turnbuckles)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: '#6B533E',
      roughness: 0.48,
      metalness: 0.72
    });

    // Visitor Lounge Linen Bolster Cushion
    const cushionMat = new THREE.MeshStandardMaterial({
      color: '#E8E1D5',
      map: linenMap,
      roughness: 0.94,
      metalness: 0.0
    });

    // Diegetic Navigational Chart Parchment
    const mapMat = new THREE.MeshStandardMaterial({
      map: expeditionMap,
      roughness: 0.85,
      metalness: 0.02
    });

    // Captain's Lantern Amber Glass
    const lanternGlassMat = new THREE.MeshStandardMaterial({
      color: '#FFE2B8',
      roughness: 0.12,
      metalness: 0.08,
      transparent: true,
      opacity: 0.48
    });

    // Glowing Incandescent Lantern Core
    const filamentMat = new THREE.MeshStandardMaterial({
      color: '#FFA54A',
      emissive: '#FF9533',
      emissiveIntensity: 3.5,
      roughness: 0.2
    });

    // Tropical Foliage Plant Material
    const plantLeafMat = new THREE.MeshStandardMaterial({
      color: '#2D5A27',
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    return {
      teakMat,
      darkTeakMat,
      deckMat,
      canvasMat,
      canvasTrimMat,
      brassMat,
      bronzeMat,
      cushionMat,
      mapMat,
      lanternGlassMat,
      filamentMat,
      plantLeafMat
    };
  }, []);

  return (
    <group position={[0, 0.7, 96]} name="Coral_WelcomePavilion">
      {/* ========================================================================= */}
      {/* 1. FOUNDATION DECK, SUB-PILINGS & STEPPED SURROUNDS                       */}
      {/* ========================================================================= */}
      
      {/* Sub-Deck Cylindrical Pier Pilings (12 Stilt Supports) */}
      {[-6.0, -2.0, 2.0, 6.0].map((px) =>
        [-5.0, 0.0, 5.0].map((pz) => (
          <mesh 
            key={`piling-${px}-${pz}`} 
            position={[px, -0.4, pz]} 
            material={materials.bronzeMat} 
            receiveShadow
          >
            <cylinderGeometry args={[0.24, 0.28, 0.8, 12]} />
          </mesh>
        ))
      )}

      {/* Main Teak Deck Flooring Platform (14.6m x 12.6m x 0.28m) */}
      <group position={[0, 0.14, 0]}>
        {/* Main Deck Board Slab */}
        <mesh material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[14.6, 0.28, 12.6]} />
        </mesh>
        {/* Perimeter Bullnose Fascia Board */}
        <mesh position={[0, 0, 0]} material={materials.darkTeakMat} receiveShadow>
          <boxGeometry args={[14.76, 0.32, 12.76]} />
        </mesh>
        {/* Subtle Deck Planking Expansion Reveals (Transverse Grooves) */}
        {[-4.0, -2.0, 0, 2.0, 4.0].map((gx) => (
          <mesh key={`deck-groove-${gx}`} position={[gx, 0.165, 0]} material={materials.darkTeakMat}>
            <boxGeometry args={[0.04, 0.015, 12.5]} />
          </mesh>
        ))}
      </group>

      {/* North Entrance Cascading Steps (Z = -6.3m to -7.9m) */}
      <group position={[0, 0, -6.3]}>
        {/* Tier 1 (Upper Step) */}
        <mesh position={[0, 0.05, -0.4]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[9.4, 0.18, 0.8]} />
        </mesh>
        <mesh position={[0, 0.05, -0.4]} material={materials.darkTeakMat}>
          <boxGeometry args={[9.52, 0.20, 0.84]} />
        </mesh>
        {/* Tier 2 (Middle Step) */}
        <mesh position={[0, -0.10, -1.0]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[10.2, 0.18, 0.8]} />
        </mesh>
        <mesh position={[0, -0.10, -1.0]} material={materials.darkTeakMat}>
          <boxGeometry args={[10.32, 0.20, 0.84]} />
        </mesh>
        {/* Tier 3 (Lower Step / Apron) */}
        <mesh position={[0, -0.25, -1.6]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[11.0, 0.18, 0.8]} />
        </mesh>
        <mesh position={[0, -0.25, -1.6]} material={materials.darkTeakMat}>
          <boxGeometry args={[11.12, 0.20, 0.84]} />
        </mesh>
      </group>

      {/* South Beach-Facing Cascading Steps (Z = +6.3m to +7.9m) */}
      <group position={[0, 0, 6.3]}>
        {/* Tier 1 (Upper Step) */}
        <mesh position={[0, 0.05, 0.4]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[9.4, 0.18, 0.8]} />
        </mesh>
        {/* Tier 2 (Middle Step) */}
        <mesh position={[0, -0.10, 1.0]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[10.2, 0.18, 0.8]} />
        </mesh>
        {/* Tier 3 (Lower Step / Apron) */}
        <mesh position={[0, -0.25, 1.6]} material={materials.deckMat} receiveShadow castShadow>
          <boxGeometry args={[11.0, 0.18, 0.8]} />
        </mesh>
      </group>

      {/* Flanking Side Curb Steps */}
      <mesh position={[-7.5, -0.05, 0]} material={materials.darkTeakMat} receiveShadow>
        <boxGeometry args={[0.5, 0.22, 10.0]} />
      </mesh>
      <mesh position={[7.5, -0.05, 0]} material={materials.darkTeakMat} receiveShadow>
        <boxGeometry args={[0.5, 0.22, 10.0]} />
      </mesh>

      {/* ========================================================================= */}
      {/* 2. 8 LOAD-BEARING TEAK TIMBER PILLARS WITH CAPITALS & BASE TRIMS           */}
      {/* ========================================================================= */}
      
      {/* Front Row (Z = -5.0m) */}
      <PillarAssembly position={[-6.2, 2.45, -5.0]} materials={materials} />
      <PillarAssembly position={[-2.1, 2.45, -5.0]} materials={materials} />
      <PillarAssembly position={[2.1, 2.45, -5.0]} materials={materials} />
      <PillarAssembly position={[6.2, 2.45, -5.0]} materials={materials} />

      {/* Rear Row (Z = +5.0m) */}
      <PillarAssembly position={[-6.2, 2.45, 5.0]} materials={materials} />
      <PillarAssembly position={[-2.1, 2.45, 5.0]} materials={materials} />
      <PillarAssembly position={[2.1, 2.45, 5.0]} materials={materials} />
      <PillarAssembly position={[6.2, 2.45, 5.0]} materials={materials} />

      {/* ========================================================================= */}
      {/* 3. ROOF CROSSBEAMS, TIE BEAMS, TRUSSES & RAFTERS                          */}
      {/* ========================================================================= */}
      
      {/* Primary Longitudinal Header Beams (North & South Eaves) */}
      <group position={[0, 4.65, 0]}>
        {/* North Header Beam (Z = -5.0m) */}
        <mesh position={[0, 0, -5.0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[16.0, 0.36, 0.34]} />
        </mesh>
        {/* South Header Beam (Z = +5.0m) */}
        <mesh position={[0, 0, 5.0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[16.0, 0.36, 0.34]} />
        </mesh>

        {/* Outer Perimeter End Beams (East & West) */}
        <mesh position={[-6.2, 0, 0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[0.34, 0.36, 11.4]} />
        </mesh>
        <mesh position={[6.2, 0, 0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[0.34, 0.36, 11.4]} />
        </mesh>

        {/* Intermediate Transverse Tie Beams over Middle Columns */}
        <mesh position={[-2.1, 0, 0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[0.30, 0.32, 10.3]} />
        </mesh>
        <mesh position={[2.1, 0, 0]} material={materials.darkTeakMat} castShadow>
          <boxGeometry args={[0.30, 0.32, 10.3]} />
        </mesh>
      </group>

      {/* 4 King Post Roof Trusses over Pillar Bays */}
      {[-6.2, -2.1, 2.1, 6.2].map((tx) => (
        <group key={`truss-${tx}`} position={[tx, 4.85, 0]}>
          {/* Vertical King Post to Ridge */}
          <mesh position={[0, 0.95, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.22, 1.9, 0.22]} />
          </mesh>
          {/* Diagonal Web Struts */}
          <mesh position={[0, 0.65, -1.8]} rotation={[0.42, 0, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.18, 1.6, 0.18]} />
          </mesh>
          <mesh position={[0, 0.65, 1.8]} rotation={[-0.42, 0, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.18, 1.6, 0.18]} />
          </mesh>
          {/* Bronze Gusset Tie Plate */}
          <mesh position={[0, 0.1, 0]} material={materials.bronzeMat}>
            <boxGeometry args={[0.26, 0.18, 0.26]} />
          </mesh>
        </group>
      ))}

      {/* Apex Ridge Beam running full length (Y = 6.85m) */}
      <mesh position={[0, 6.85, 0]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[16.6, 0.30, 0.32]} />
      </mesh>

      {/* 9 Pairs of Pitched Diagonal Rafters */}
      {[-6.4, -4.8, -3.2, -1.6, 0, 1.6, 3.2, 4.8, 6.4].map((rx) => (
        <group key={`rafters-${rx}`} position={[rx, 5.75, 0]}>
          {/* North Facing Rafter (Ridge to North Eave) */}
          <mesh position={[0, 0, -2.7]} rotation={[0.41, 0, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.16, 0.22, 6.6]} />
          </mesh>
          {/* South Facing Rafter (Ridge to South Eave) */}
          <mesh position={[0, 0, 2.7]} rotation={[-0.41, 0, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.16, 0.22, 6.6]} />
          </mesh>
        </group>
      ))}

      {/* Longitudinal Timber Purlin Battens across Rafters */}
      {[-4.2, -2.2, 2.2, 4.2].map((pz, idx) => {
        const py = 6.85 - Math.abs(pz) * 0.42;
        return (
          <mesh key={`purlin-${idx}`} position={[0, py, pz]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[16.2, 0.10, 0.12]} />
          </mesh>
        );
      })}

      {/* ========================================================================= */}
      {/* 4. NATURAL LINEN TENSILE CANVAS CANOPY ROOF                               */}
      {/* ========================================================================= */}
      
      <group position={[0, 5.85, 0]}>
        {/* North Pitch Tensile Canopy Slope (16.2m wide x 6.8m slope length) */}
        <mesh position={[0, 0, -2.75]} rotation={[0.41, 0, 0]} material={materials.canvasMat} castShadow receiveShadow>
          <planeGeometry args={[16.4, 6.8, 16, 8]} />
        </mesh>
        {/* North Seam Trim Ribs */}
        {[-6.0, -3.0, 0, 3.0, 6.0].map((sx) => (
          <mesh key={`seam-n-${sx}`} position={[sx, 0.02, -2.75]} rotation={[0.41, 0, 0]} material={materials.canvasTrimMat}>
            <planeGeometry args={[0.12, 6.8]} />
          </mesh>
        ))}

        {/* South Pitch Tensile Canopy Slope */}
        <mesh position={[0, 0, 2.75]} rotation={[-0.41, 0, 0]} material={materials.canvasMat} castShadow receiveShadow>
          <planeGeometry args={[16.4, 6.8, 16, 8]} />
        </mesh>
        {/* South Seam Trim Ribs */}
        {[-6.0, -3.0, 0, 3.0, 6.0].map((sx) => (
          <mesh key={`seam-s-${sx}`} position={[sx, 0.02, 2.75]} rotation={[-0.41, 0, 0]} material={materials.canvasTrimMat}>
            <planeGeometry args={[0.12, 6.8]} />
          </mesh>
        ))}

        {/* Apex Ridge Cap Membrane */}
        <mesh position={[0, 1.05, 0]} material={materials.canvasTrimMat} castShadow>
          <boxGeometry args={[16.6, 0.08, 0.7]} />
        </mesh>

        {/* Eave Tension Rigging Cables & Turnbuckles at 4 Roof Corners */}
        {[
          { x: -7.6, z: -5.6, angleY: 0.7 },
          { x: 7.6, z: -5.6, angleY: -0.7 },
          { x: -7.6, z: 5.6, angleY: 2.4 },
          { x: 7.6, z: 5.6, angleY: -2.4 }
        ].map((guy, i) => (
          <group key={`corner-rigging-${i}`} position={[guy.x, -1.0, guy.z]}>
            {/* Diagonal Stay Cable */}
            <mesh position={[0, 0.5, 0]} rotation={[0.4, guy.angleY, 0]} material={materials.bronzeMat}>
              <cylinderGeometry args={[0.015, 0.015, 1.4, 6]} />
            </mesh>
            {/* Brass Turnbuckle Fitting */}
            <mesh position={[0, 0.15, 0]} material={materials.brassMat}>
              <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================================= */}
      {/* 5. INTERIOR RECEPTION LOUNGE & CONCIERGE EXPERIENCE                       */}
      {/* ========================================================================= */}
      
      {/* Left Interior Zone: Curved Teak Concierge Reception Desk & Briefing Station */}
      <group position={[-2.8, 0.28, 0]} name="Expedition_ConciergeDesk">
        {/* Recessed Brass Toe-Kick Plinth */}
        <mesh position={[0, 0.06, 0]} material={materials.brassMat} receiveShadow>
          <boxGeometry args={[3.2, 0.12, 1.2]} />
        </mesh>

        {/* Curved Slatted Front Facade (Constructed from vertical teak tambour battens) */}
        <mesh position={[0, 0.60, 0]} material={materials.teakMat} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.96, 1.3]} />
        </mesh>

        {/* Vertical Decorative Teak Slat Reliefs on Front Counter */}
        {[-1.5, -1.2, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2, 1.5].map((bx) => (
          <mesh key={`batten-${bx}`} position={[bx, 0.60, -0.66]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.08, 0.92, 0.04]} />
          </mesh>
        ))}

        {/* Live-Edge Honed Teak Countertop with Perimeter Inlay */}
        <mesh position={[0, 1.12, 0]} material={materials.darkTeakMat} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.09, 1.44]} />
        </mesh>
        {/* Embedded Marine Brass Countertop Inlay Rail */}
        <mesh position={[0, 1.17, 0]} material={materials.brassMat}>
          <boxGeometry args={[3.64, 0.015, 1.48]} />
        </mesh>

        {/* Warm Recessed Under-Counter LED Accent Glow */}
        <pointLight position={[0, 0.4, -0.75]} color="#FFE2B8" intensity={1.2} distance={3.5} decay={2} />

        {/* ----------------------------------------------------------------------- */}
        {/* Maritime Brass Captain's Lantern with Warm Point Lighting               */}
        {/* ----------------------------------------------------------------------- */}
        <group position={[1.2, 1.18, -0.1]} name="Captains_Lantern">
          {/* Brass Stepped Base */}
          <mesh position={[0, 0.04, 0]} material={materials.brassMat} castShadow>
            <cylinderGeometry args={[0.16, 0.19, 0.08, 12]} />
          </mesh>
          {/* Glass Cylinder Enclosure */}
          <mesh position={[0, 0.28, 0]} material={materials.lanternGlassMat}>
            <cylinderGeometry args={[0.13, 0.13, 0.40, 12]} />
          </mesh>
          {/* Brass Octagonal Cage Framing Posts */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh 
                key={`cage-post-${deg}`} 
                position={[Math.sin(rad) * 0.14, 0.28, Math.cos(rad) * 0.14]} 
                material={materials.brassMat}
              >
                <cylinderGeometry args={[0.012, 0.012, 0.42, 6]} />
              </mesh>
            );
          })}
          {/* Incandescent Glowing Core Filament */}
          <mesh position={[0, 0.28, 0]} material={materials.filamentMat}>
            <cylinderGeometry args={[0.03, 0.03, 0.18, 8]} />
          </mesh>
          {/* Brass Domed Chimney & Top Cap */}
          <mesh position={[0, 0.52, 0]} material={materials.brassMat} castShadow>
            <cylinderGeometry args={[0.08, 0.16, 0.12, 12]} />
          </mesh>
          {/* Top Hanging Brass Ring Shackle */}
          <mesh position={[0, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.brassMat}>
            <torusGeometry args={[0.05, 0.012, 8, 16]} />
          </mesh>

          {/* Warm Incandescent Point Light (#FFB85C) Illuminating Desk & Chart */}
          <pointLight 
            position={[0, 0.32, 0]} 
            color="#FFB85C" 
            intensity={2.8} 
            distance={12} 
            decay={2} 
            castShadow
          />
        </group>

        {/* ----------------------------------------------------------------------- */}
        {/* Diegetic Inhabited Navigational Chart Table & Storytelling Props        */}
        {/* ----------------------------------------------------------------------- */}
        <group position={[-0.45, 1.18, -0.05]} name="Navigational_ChartTable">
          {/* Weathered Nautical Parchment Chart of St. Mary's Archipelago & Malpe Continental Shelf */}
          <group position={[0, 0.005, 0]} rotation={[-Math.PI / 2 + 0.12, 0, 0.08]}>
            <mesh material={materials.mapMat} receiveShadow>
              <planeGeometry args={[1.38, 0.88]} />
            </mesh>
            {/* Brass Corner Scrollweights */}
            <mesh position={[-0.64, -0.39, 0.02]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.035, 10]} />
            </mesh>
            <mesh position={[0.64, -0.39, 0.02]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.035, 10]} />
            </mesh>
            <mesh position={[-0.64, 0.39, 0.02]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.035, 10]} />
            </mesh>
            <mesh position={[0.64, 0.39, 0.02]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.035, 10]} />
            </mesh>
          </group>

          {/* Brass Navigation Dividers (Calipers resting on sea chart) */}
          <group position={[-0.2, 0.02, 0.1]} rotation={[0, 0.45, 0]} name="Navigation_Dividers">
            <mesh position={[-0.04, 0, 0]} rotation={[0, 0, 0.15]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.006, 0.003, 0.22, 6]} />
            </mesh>
            <mesh position={[0.04, 0, 0]} rotation={[0, 0, -0.15]} material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.006, 0.003, 0.22, 6]} />
            </mesh>
            <mesh position={[0, 0.10, 0]} material={materials.brassMat}>
              <sphereGeometry args={[0.012, 8, 8]} />
            </mesh>
          </group>

          {/* Brass & Teak Parallel Ruler */}
          <group position={[0.25, 0.02, -0.15]} rotation={[0, -0.22, 0]} name="Parallel_Ruler">
            <mesh position={[0, 0, -0.025]} material={materials.darkTeakMat} castShadow>
              <boxGeometry args={[0.32, 0.01, 0.035]} />
            </mesh>
            <mesh position={[0, 0, 0.025]} material={materials.darkTeakMat} castShadow>
              <boxGeometry args={[0.32, 0.01, 0.035]} />
            </mesh>
            {/* Brass Hinge Linkage Bars */}
            <mesh position={[-0.1, 0.008, 0]} rotation={[0, 0.6, 0]} material={materials.brassMat}>
              <boxGeometry args={[0.06, 0.006, 0.012]} />
            </mesh>
            <mesh position={[0.1, 0.008, 0]} rotation={[0, 0.6, 0]} material={materials.brassMat}>
              <boxGeometry args={[0.06, 0.006, 0.012]} />
            </mesh>
          </group>

          {/* Gimballed Marine Brass Pocket Compass */}
          <group position={[0.42, 0.025, 0.22]} name="Marine_Compass">
            <mesh material={materials.brassMat} castShadow>
              <cylinderGeometry args={[0.07, 0.075, 0.035, 16]} />
            </mesh>
            <mesh position={[0, 0.018, 0]} material={materials.lanternGlassMat}>
              <cylinderGeometry args={[0.065, 0.065, 0.005, 16]} />
            </mesh>
            {/* Compass Needle */}
            <mesh position={[0, 0.015, 0]} rotation={[0, 0.78, 0]} material={materials.filamentMat}>
              <boxGeometry args={[0.09, 0.004, 0.01]} />
            </mesh>
          </group>

          {/* Weather Ledger & Logbook (Open leather binder) */}
          <group position={[-0.75, 0.02, 0.32]} rotation={[0, -0.18, 0]} name="Weather_Ledger">
            <mesh material={materials.darkTeakMat} castShadow>
              <boxGeometry args={[0.38, 0.03, 0.28]} />
            </mesh>
            {/* Open Parchment Pages */}
            <mesh position={[0, 0.018, 0]} material={materials.cushionMat}>
              <boxGeometry args={[0.36, 0.01, 0.26]} />
            </mesh>
            {/* Brass Bookmark Ribbon Accent */}
            <mesh position={[0.02, 0.024, 0.05]} material={materials.brassMat}>
              <boxGeometry args={[0.015, 0.003, 0.18]} />
            </mesh>
          </group>

          {/* Folded Parchment Coastal Tide Table */}
          <group position={[-0.78, 0.015, -0.22]} rotation={[0, 0.35, 0]} name="Tide_Table">
            <mesh material={materials.cushionMat} castShadow>
              <boxGeometry args={[0.26, 0.012, 0.18]} />
            </mesh>
            {/* Grid Line Accents */}
            <mesh position={[0, 0.008, 0]} material={materials.darkTeakMat}>
              <boxGeometry args={[0.24, 0.002, 0.16]} />
            </mesh>
          </group>

          {/* Rolled Vessel Manifest with Brass Clip */}
          <group position={[0.72, 0.03, -0.28]} rotation={[0.1, -0.5, 0]} name="Vessel_Manifest">
            <mesh material={materials.cushionMat} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.42, 10]} />
            </mesh>
            {/* Brass Binding Clip Band */}
            <mesh position={[0, 0.05, 0]} material={materials.brassMat}>
              <cylinderGeometry args={[0.038, 0.038, 0.04, 10]} />
            </mesh>
          </group>
        </group>

        {/* Rolled Nautical Parchment Map Scrolls in Brass Stand Holder */}
        <group position={[-1.45, 1.18, 0.42]} name="Map_ScrollHolder">
          <mesh position={[0, 0.15, 0]} material={materials.brassMat} castShadow>
            <cylinderGeometry args={[0.12, 0.10, 0.30, 12]} />
          </mesh>
          {/* Rolled Scroll Tubes */}
          <mesh position={[-0.03, 0.26, 0.02]} rotation={[0.1, 0, 0.15]} material={materials.cushionMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
          </mesh>
          <mesh position={[0.03, 0.28, -0.02]} rotation={[-0.1, 0, -0.1]} material={materials.cushionMat}>
            <cylinderGeometry args={[0.035, 0.035, 0.50, 8]} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------------------- */}
      {/* 6. VISITOR SEATING LOUNGE BENCHES                                         */}
      {/* ------------------------------------------------------------------------- */}
      
      {/* North Visitor Bench (Z = -3.2m, X = +3.2m) */}
      <VisitorBenchAssembly position={[3.2, 0.28, -3.2]} rotationY={0} materials={materials} />

      {/* South Visitor Bench (Z = +3.2m, X = +3.2m) */}
      <VisitorBenchAssembly position={[3.2, 0.28, 3.2]} rotationY={Math.PI} materials={materials} />

      {/* ------------------------------------------------------------------------- */}
      {/* 7. TROPICAL COASTAL PLANTERS & ARCHITECTURAL ACCENTS                     */}
      {/* ------------------------------------------------------------------------- */}
      
      {/* Planter Box 1 (Near Entrance) */}
      <group position={[-5.8, 0.28, -4.6]}>
        <mesh position={[0, 0.36, 0]} material={materials.darkTeakMat} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.72, 0.85]} />
        </mesh>
        <mesh position={[0, 0.73, 0]} material={materials.bronzeMat}>
          <boxGeometry args={[0.89, 0.04, 0.89]} />
        </mesh>
        {/* Tropical Leaves */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh 
              key={`leaf-1-${deg}`} 
              position={[Math.sin(rad) * 0.25, 0.95, Math.cos(rad) * 0.25]} 
              rotation={[0.5, rad, 0]} 
              material={materials.plantLeafMat}
            >
              <planeGeometry args={[0.45, 0.7]} />
            </mesh>
          );
        })}
      </group>

      {/* Planter Box 2 (Near Rear Exit) */}
      <group position={[5.8, 0.28, 4.6]}>
        <mesh position={[0, 0.36, 0]} material={materials.darkTeakMat} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.72, 0.85]} />
        </mesh>
        <mesh position={[0, 0.73, 0]} material={materials.bronzeMat}>
          <boxGeometry args={[0.89, 0.04, 0.89]} />
        </mesh>
        {/* Tropical Leaves */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh 
              key={`leaf-2-${deg}`} 
              position={[Math.sin(rad) * 0.25, 0.95, Math.cos(rad) * 0.25]} 
              rotation={[0.5, rad, 0]} 
              material={materials.plantLeafMat}
            >
              <planeGeometry args={[0.45, 0.7]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// ===============================================================================
// ARCHITECTURAL SUB-COMPONENTS
// ===============================================================================

interface PillarMaterials {
  teakMat: THREE.Material;
  darkTeakMat: THREE.Material;
  brassMat: THREE.Material;
  bronzeMat: THREE.Material;
}

interface PillarAssemblyProps {
  position: [number, number, number];
  materials: PillarMaterials;
}

/**
 * PillarAssembly
 * Anti-Primitive Post-and-Beam Load-Bearing Teak Timber Pillar
 * Features:
 * - Tiered Bronze & Teak Footing Plinth
 * - Brass Column Base Collar Band
 * - 12-Sided Faceted Tapered Timber Shaft
 * - Mid-Height Brass Joint Ring
 * - Stepped Necking Collar & Saddle Bolster Capital
 * - 45° Diagonal Timber Corbel Knee Braces
 */
const PillarAssembly: React.FC<PillarAssemblyProps> = ({ position, materials }) => {
  return (
    <group position={position}>
      {/* 1. Footing Plinth Base Assembly (Y = -2.35m to -2.0m) */}
      {/* Bronze Anchor Sole Plate */}
      <mesh position={[0, -2.38, 0]} material={materials.bronzeMat} receiveShadow>
        <boxGeometry args={[0.66, 0.08, 0.66]} />
      </mesh>
      {/* Stepped Chamfered Teak Plinth Collar */}
      <mesh position={[0, -2.26, 0]} material={materials.darkTeakMat} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.16, 0.56]} />
      </mesh>
      {/* Antique Brass Base Ring */}
      <mesh position={[0, -2.14, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.22, 0.24, 0.08, 12]} />
      </mesh>

      {/* 2. 12-Sided Faceted Tapered Timber Column Shaft (Height = 4.1m) */}
      <mesh position={[0, -0.05, 0]} material={materials.teakMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.21, 4.1, 12]} />
      </mesh>

      {/* Mid-Height Decorative Brass Banding Ring */}
      <mesh position={[0, -0.2, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.198, 0.202, 0.06, 12]} />
      </mesh>

      {/* 3. Architectural Capital & Bolster Assembly (Y = +2.0m to +2.4m) */}
      {/* Stepped Necking Ring */}
      <mesh position={[0, 2.02, 0]} material={materials.brassMat}>
        <cylinderGeometry args={[0.23, 0.20, 0.08, 12]} />
      </mesh>
      {/* Teak Capital Collar */}
      <mesh position={[0, 2.12, 0]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[0.54, 0.12, 0.54]} />
      </mesh>
      {/* Heavy Carved Saddle Bolster Block */}
      <mesh position={[0, 2.24, 0]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[0.88, 0.16, 0.44]} />
      </mesh>

      {/* 45° Diagonal Timber Knee Corbel Braces (Supporting Crossbeams) */}
      <mesh position={[0.32, 1.75, 0]} rotation={[0, 0, -0.78]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[0.14, 0.65, 0.14]} />
      </mesh>
      <mesh position={[-0.32, 1.75, 0]} rotation={[0, 0, 0.78]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[0.14, 0.65, 0.14]} />
      </mesh>
    </group>
  );
};

interface BenchMaterials {
  teakMat: THREE.Material;
  darkTeakMat: THREE.Material;
  cushionMat: THREE.Material;
  bronzeMat: THREE.Material;
}

interface VisitorBenchAssemblyProps {
  position: [number, number, number];
  rotationY: number;
  materials: BenchMaterials;
}

/**
 * VisitorBenchAssembly
 * Bespoke Weathered Teak Timber Lounge Bench
 * Features:
 * - Multi-slat contoured teak seat with rounded bullnose rails
 * - Ergonomic angled slatted backrest with timber support stanchions
 * - Heavy trestle leg joinery with diagonal cross-stretcher
 * - Tailored natural linen bolster cushion
 */
const VisitorBenchAssembly: React.FC<VisitorBenchAssemblyProps> = ({ position, rotationY, materials }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Trestle End Legs with Mortise-and-Tenon Feet */}
      {[-1.8, 1.8].map((lx) => (
        <group key={`bench-leg-${lx}`} position={[lx, 0.22, 0]}>
          {/* Vertical Leg Post */}
          <mesh material={materials.darkTeakMat} castShadow receiveShadow>
            <boxGeometry args={[0.12, 0.44, 0.75]} />
          </mesh>
          {/* Base Foot Shoe */}
          <mesh position={[0, -0.20, 0]} material={materials.bronzeMat}>
            <boxGeometry args={[0.16, 0.06, 0.82]} />
          </mesh>
          {/* Angled Backrest Stanchion Upright */}
          <mesh position={[0, 0.42, 0.32]} rotation={[-0.18, 0, 0]} material={materials.darkTeakMat} castShadow>
            <boxGeometry args={[0.10, 0.52, 0.10]} />
          </mesh>
        </group>
      ))}

      {/* Longitudinal Lower Cross-Stretcher Tie */}
      <mesh position={[0, 0.12, 0]} material={materials.darkTeakMat} castShadow>
        <boxGeometry args={[3.8, 0.08, 0.08]} />
      </mesh>

      {/* Multi-Slat Contoured Teak Seat Deck (4 Individual Slats) */}
      {[-0.28, -0.09, 0.09, 0.28].map((sz, i) => (
        <mesh key={`seat-slat-${i}`} position={[0, 0.44, sz]} material={materials.teakMat} castShadow receiveShadow>
          <boxGeometry args={[3.95, 0.05, 0.16]} />
        </mesh>
      ))}

      {/* Slanted Backrest Rails (3 Horizontal Timber Slats) */}
      {[0.52, 0.66, 0.80].map((by, i) => {
        const bz = 0.32 + (by - 0.52) * 0.18;
        return (
          <mesh key={`back-slat-${i}`} position={[0, by, bz]} rotation={[-0.18, 0, 0]} material={materials.teakMat} castShadow>
            <boxGeometry args={[3.95, 0.09, 0.04]} />
          </mesh>
        );
      })}

      {/* Natural Linen Upholstered Bolster Seat Cushion */}
      <mesh position={[0, 0.49, 0.02]} material={materials.cushionMat} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.06, 0.72]} />
      </mesh>
    </group>
  );
};
