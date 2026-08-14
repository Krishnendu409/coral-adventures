import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * SeaWalkway Component
 * 450m Malpe Sea Walkway & Coastal Breakwater Infrastructure:
 * 
 * 1. 450m Elevated Concrete & Granite Paver Walkway (Z: 300m..450m, Y = 1.8m)
 *    - Width: 6.0m (X: 22.0m..28.0m, Centerline X = 25.0m).
 *    - Structural reinforced concrete pier substructure with interlocking granite paver surface (#9E9E9E).
 *    - Beveled curbs and Expansion joint detailing.
 * 
 * 2. 316L Marine Stainless Steel Safety Handrails
 *    - Dual-line polished stainless guardrails along harbour & seaward edges (X: 22.0m & 28.0m).
 *    - Stanchions spaced at 5m intervals, top rail at Y = 2.9m (1.1m clearance above deck Y = 1.8m), mid-rails.
 * 
 * 3. Cast Iron Promenade Lamp Posts
 *    - Heavy vintage coastal cast iron lamp posts (#24292E) at 25m intervals.
 *    - Warm golden hour lanterns (#FFE082 emissive) with subtle point lighting.
 * 
 * 4. Weathered Teak Rest Benches
 *    - Marine-grade teak wood slat seats (#7A5233) with cast iron support frames facing seaward.
 * 
 * 5. Interlocking Granite Rock Armour Breakwater Boulders
 *    - Multi-tiered rough-cut granite armor stones (#4A4E52 / #3A3D40) sloping from Y = 1.8m down to Y = -0.5m
 *      into the intertidal Arabian Sea to protect the harbour approach.
 */

export const SeaWalkway: React.FC = () => {
  const materials = useMemo(() => {
    return {
      // Concrete & Granite Paver Deck
      paverDeckMat: new THREE.MeshStandardMaterial({
        color: '#9E9E9E',
        roughness: 0.75,
        metalness: 0.1
      }),
      // Beveled Curb Edge Trim
      curbMat: new THREE.MeshStandardMaterial({
        color: '#757575',
        roughness: 0.8,
        metalness: 0.05
      }),
      // 316L Marine Stainless Steel Guardrails
      stainlessMat: new THREE.MeshStandardMaterial({
        color: '#E9ECEF',
        roughness: 0.18,
        metalness: 0.92
      }),
      // Cast Iron Lamp Post Body
      castIronMat: new THREE.MeshStandardMaterial({
        color: '#24292E',
        roughness: 0.6,
        metalness: 0.75
      }),
      // Lamp Post Lantern Glass & Emissive Glow
      lanternMat: new THREE.MeshStandardMaterial({
        color: '#FFF8E7',
        emissive: '#FFE082',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9
      }),
      // Weathered Teak Bench Slats
      teakBenchMat: new THREE.MeshStandardMaterial({
        color: '#7A5233',
        roughness: 0.8,
        metalness: 0.04
      }),
      // Interlocking Granite Rock Armour Boulders
      graniteArmourMat: new THREE.MeshStandardMaterial({
        color: '#4A4E52',
        roughness: 0.92,
        metalness: 0.08
      }),
      // Dark Wet Granite near Waterline
      wetGraniteMat: new THREE.MeshStandardMaterial({
        color: '#3A3D40',
        roughness: 0.45,
        metalness: 0.15
      })
    };
  }, []);

  // Lamp Post Positions along Z: 300m..450m at 25m intervals
  const lampPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let z = 305; z <= 445; z += 25) {
      pos.push([27.5, 1.8, z]);
    }
    return pos;
  }, []);

  // Teak Bench Positions along Z: 300m..450m at 30m intervals facing seaward
  const benchPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let z = 315; z <= 435; z += 30) {
      pos.push([22.8, 1.8, z]);
    }
    return pos;
  }, []);

  // Granite Rock Armour Boulder Clusters along breakwater flanks
  const armourBoulders = useMemo(() => {
    const boulders: { pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number]; isWet: boolean }[] = [];
    // Generate deterministic boulder clusters along port & starboard flanks
    for (let z = 295; z <= 455; z += 4.5) {
      const zOffset = (Math.sin(z * 0.7) * 0.8);
      // Seaward Flank (X: 28.5m..36.0m)
      boulders.push({
        pos: [29.2 + Math.abs(Math.sin(z * 0.3)) * 1.5, 1.2 + Math.cos(z * 0.4) * 0.3, z + zOffset],
        scale: [1.8 + Math.sin(z) * 0.4, 1.4 + Math.cos(z * 0.5) * 0.3, 2.0 + Math.sin(z * 0.8) * 0.5],
        rot: [Math.sin(z) * 0.5, Math.cos(z * 0.3) * 0.8, Math.sin(z * 0.2) * 0.4],
        isWet: false
      });
      boulders.push({
        pos: [32.0 + Math.sin(z * 0.5) * 2.0, 0.4 + Math.sin(z * 0.3) * 0.3, z + zOffset + 1.2],
        scale: [2.2 + Math.cos(z) * 0.5, 1.6 + Math.sin(z * 0.4) * 0.4, 2.4 + Math.cos(z * 0.6) * 0.6],
        rot: [Math.cos(z) * 0.6, Math.sin(z * 0.2) * 0.9, Math.cos(z * 0.5) * 0.3],
        isWet: true
      });

      // Harbour Inner Flank (X: 15.0m..21.5m)
      boulders.push({
        pos: [20.8 - Math.abs(Math.cos(z * 0.4)) * 1.4, 1.1 + Math.sin(z * 0.5) * 0.3, z - zOffset],
        scale: [1.9 + Math.cos(z * 0.6) * 0.4, 1.3 + Math.sin(z * 0.7) * 0.3, 2.1 + Math.sin(z * 0.4) * 0.5],
        rot: [Math.sin(z * 0.4) * 0.6, Math.cos(z * 0.8) * 0.7, Math.sin(z * 0.3) * 0.5],
        isWet: false
      });
      boulders.push({
        pos: [18.2 - Math.sin(z * 0.6) * 1.8, 0.3 + Math.cos(z * 0.2) * 0.3, z - zOffset + 1.5],
        scale: [2.3 + Math.sin(z * 0.2) * 0.6, 1.5 + Math.cos(z * 0.8) * 0.4, 2.5 + Math.sin(z * 0.5) * 0.5],
        rot: [Math.cos(z * 0.3) * 0.7, Math.sin(z * 0.5) * 0.8, Math.cos(z * 0.4) * 0.4],
        isWet: true
      });
    }
    return boulders;
  }, []);

  return (
    <group name="SeaWalkway_Promenade">
      {/* ------------------------------------------------------------- */}
      {/* 1. 450M ELEVATED CONCRETE & GRANITE PAVER DECK                */}
      {/* ------------------------------------------------------------- */}
      <group name="Walkway_PaverDeck">
        {/* Main Promenade Deck Slab (Z: 300m..450m, Y = 1.8m, X = 25m, Width = 6.0m) */}
        <mesh position={[25.0, 1.72, 375.0]} material={materials.paverDeckMat} receiveShadow castShadow>
          <boxGeometry args={[6.0, 0.24, 150.0]} />
        </mesh>

        {/* Substructure Pier Foundation Slab */}
        <mesh position={[25.0, 0.9, 375.0]} material={materials.curbMat} receiveShadow>
          <boxGeometry args={[7.2, 1.4, 152.0]} />
        </mesh>

        {/* Beveled Curb Trim Rails (Port & Starboard) */}
        <mesh position={[22.1, 1.88, 375.0]} material={materials.curbMat} receiveShadow castShadow>
          <boxGeometry args={[0.25, 0.16, 150.0]} />
        </mesh>
        <mesh position={[27.9, 1.88, 375.0]} material={materials.curbMat} receiveShadow castShadow>
          <boxGeometry args={[0.25, 0.16, 150.0]} />
        </mesh>

        {/* Expansion Joint Inlay Lines every 15m */}
        {Array.from({ length: 11 }).map((_, idx) => {
          const zPos = 300 + idx * 15;
          return (
            <mesh key={`joint-${idx}`} position={[25.0, 1.845, zPos]} material={materials.curbMat}>
              <boxGeometry args={[5.8, 0.02, 0.12]} />
            </mesh>
          );
        })}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. 316L MARINE STAINLESS STEEL SAFETY HANDRAILS               */}
      {/* ------------------------------------------------------------- */}
      <group name="Walkway_Handrails">
        {/* Top Guardrails (Y = 2.9m / 1.1m clearance above Y = 1.8m) */}
        <mesh position={[22.1, 2.9, 375.0]} material={materials.stainlessMat} castShadow>
          <boxGeometry args={[0.06, 0.06, 150.0]} />
        </mesh>
        <mesh position={[27.9, 2.9, 375.0]} material={materials.stainlessMat} castShadow>
          <boxGeometry args={[0.06, 0.06, 150.0]} />
        </mesh>

        {/* Mid Guardrails (Y = 2.4m) */}
        <mesh position={[22.1, 2.4, 375.0]} material={materials.stainlessMat}>
          <boxGeometry args={[0.04, 0.04, 150.0]} />
        </mesh>
        <mesh position={[27.9, 2.4, 375.0]} material={materials.stainlessMat}>
          <boxGeometry args={[0.04, 0.04, 150.0]} />
        </mesh>

        {/* Vertical Guardrail Stanchion Posts at 5m Intervals */}
        {Array.from({ length: 31 }).map((_, sIdx) => {
          const stanchionZ = 300 + sIdx * 5;
          return (
            <React.Fragment key={`stanchion-${sIdx}`}>
              {/* Port Side Stanchion */}
              <mesh position={[22.1, 2.38, stanchionZ]} material={materials.stainlessMat} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 1.1, 8]} />
              </mesh>
              {/* Starboard Side Stanchion */}
              <mesh position={[27.9, 2.38, stanchionZ]} material={materials.stainlessMat} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 1.1, 8]} />
              </mesh>
            </React.Fragment>
          );
        })}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. CAST IRON PROMENADE LAMP POSTS                             */}
      {/* ------------------------------------------------------------- */}
      <group name="Walkway_LampPosts">
        {lampPositions.map((pos, lIdx) => (
          <group key={`lamppost-${lIdx}`} position={pos}>
            {/* Base Pedestal */}
            <mesh position={[0, 0.25, 0]} material={materials.castIronMat} castShadow>
              <cylinderGeometry args={[0.22, 0.28, 0.5, 8]} />
            </mesh>
            {/* Tapered Main Column */}
            <mesh position={[0, 1.8, 0]} material={materials.castIronMat} castShadow>
              <cylinderGeometry args={[0.08, 0.14, 2.6, 10]} />
            </mesh>
            {/* Decorative Flute Collar */}
            <mesh position={[0, 2.9, 0]} material={materials.castIronMat}>
              <cylinderGeometry args={[0.16, 0.1, 0.2, 8]} />
            </mesh>
            {/* Curved Goose-Neck Arm Extension */}
            <mesh position={[-0.25, 3.2, 0]} rotation={[0, 0, 0.3]} material={materials.castIronMat}>
              <boxGeometry args={[0.6, 0.08, 0.08]} />
            </mesh>
            {/* Glass Lantern Housing */}
            <mesh position={[-0.5, 3.05, 0]} material={materials.lanternMat} castShadow>
              <cylinderGeometry args={[0.18, 0.12, 0.4, 8]} />
            </mesh>
            {/* Lantern Cap Top */}
            <mesh position={[-0.5, 3.3, 0]} material={materials.castIronMat}>
              <coneGeometry args={[0.24, 0.15, 8]} />
            </mesh>

            {/* Warm Golden Hour Lantern Point Light */}
            <pointLight
              position={[-0.5, 3.0, 0]}
              color="#FFB74D"
              intensity={1.2}
              distance={16}
              decay={2}
            />
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. WEATHERED TEAK REST BENCHES                                */}
      {/* ------------------------------------------------------------- */}
      <group name="Walkway_TeakBenches">
        {benchPositions.map((pos, bIdx) => (
          <group key={`bench-${bIdx}`} position={pos} rotation={[0, -Math.PI / 2, 0]}>
            {/* Weathered Teak Seat Slats */}
            <mesh position={[0, 0.45, 0]} material={materials.teakBenchMat} castShadow>
              <boxGeometry args={[1.8, 0.06, 0.55]} />
            </mesh>
            {/* Angled Teak Backrest */}
            <mesh position={[0, 0.78, -0.24]} rotation={[-0.18, 0, 0]} material={materials.teakBenchMat} castShadow>
              <boxGeometry args={[1.8, 0.45, 0.05]} />
            </mesh>
            {/* Cast Iron Leg Frame Supports (Port & Starboard legs) */}
            <mesh position={[-0.75, 0.22, 0]} material={materials.castIronMat} castShadow>
              <boxGeometry args={[0.08, 0.44, 0.52]} />
            </mesh>
            <mesh position={[0.75, 0.22, 0]} material={materials.castIronMat} castShadow>
              <boxGeometry args={[0.08, 0.44, 0.52]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. INTERLOCKING GRANITE ROCK ARMOUR BREAKWATER BOULDERS        */}
      {/* ------------------------------------------------------------- */}
      <group name="Walkway_GraniteArmour">
        {armourBoulders.map((boulder, rIdx) => (
          <mesh
            key={`granite-${rIdx}`}
            position={boulder.pos}
            scale={boulder.scale}
            rotation={boulder.rot}
            material={boulder.isWet ? materials.wetGraniteMat : materials.graniteArmourMat}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1.0, 1]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default SeaWalkway;
