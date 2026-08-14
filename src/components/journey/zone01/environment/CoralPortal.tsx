import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * CoralPortal Component
 * Authentic Coastal Karnataka Malpe Expedition Base Gateway
 * 
 * Architectural Features:
 * - Heavy 0.55m weathered teak vertical timber posts socketed into rough-hewn laterite stone plinth blocks.
 * - Straight timber lintel with carved expedition coordinates: "MALPE EXPEDITION BASE · 13°21′02″ N · 74°42′08″ E".
 * - Double-turn natural hemp rope lashings around post-and-lintel structural joints.
 * - Brushed antique marine brass plates and structural rivet fasteners.
 * - Off-white tensioned sailcloth sunshade canopy with marine guy line rigging.
 * - Weathered teak wayfinding totem with directional signage and laterite stone bollard anchors.
 */
export const CoralPortal: React.FC = () => {
  const materials = useMemo(() => {
    // Weathered coastal teak timber
    const teakMat = new THREE.MeshStandardMaterial({
      color: '#5C3E29',
      roughness: 0.78,
      metalness: 0.04
    });

    // Dark carved structural timber
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: '#3B281A',
      roughness: 0.88,
      metalness: 0.02
    });

    // Rough-hewn Coastal Karnataka laterite stone
    const lateriteStoneMat = new THREE.MeshStandardMaterial({
      color: '#8B3A2B',
      roughness: 0.94,
      metalness: 0.0
    });

    // Brushed antique marine brass hardware & plates
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#C5A059',
      roughness: 0.32,
      metalness: 0.85
    });

    // Polished gold-brass navigation accents
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#E9B84A',
      roughness: 0.28,
      metalness: 0.90
    });

    // Natural hemp fiber rope lashings
    const hempRopeMat = new THREE.MeshStandardMaterial({
      color: '#BFA87E',
      roughness: 0.92,
      metalness: 0.0
    });

    // Tensioned off-white sailcloth canopy
    const sailclothMat = new THREE.MeshStandardMaterial({
      color: '#FAF4EB',
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    // Canopy seam reinforcement trim
    const sailclothTrimMat = new THREE.MeshStandardMaterial({
      color: '#D8CEBE',
      roughness: 0.90,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    return {
      teakMat,
      darkWoodMat,
      lateriteStoneMat,
      brassMat,
      goldMat,
      hempRopeMat,
      sailclothMat,
      sailclothTrimMat
    };
  }, []);

  return (
    <group position={[0, 0, 52]} name="Coral_ExpeditionPortal">
      {/* ========================================================================= */}
      {/* 1. HEAVY ROUGH-HEWN LATERITE STONE PLINTH BLOCKS (POST SOCKETS)           */}
      {/* ========================================================================= */}
      {/* Left Socket Plinth */}
      <group position={[-3.4, 0.45, 0]}>
        <mesh material={materials.lateriteStoneMat} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.90, 1.05]} />
        </mesh>
        {/* Recessed Plinth Socket Collar */}
        <mesh position={[0, 0.46, 0]} material={materials.darkWoodMat} receiveShadow>
          <boxGeometry args={[0.75, 0.08, 0.75]} />
        </mesh>
        {/* Brass Anchor Collar Band */}
        <mesh position={[0, 0.50, 0]} material={materials.brassMat}>
          <boxGeometry args={[0.77, 0.06, 0.77]} />
        </mesh>
      </group>

      {/* Right Socket Plinth */}
      <group position={[3.4, 0.45, 0]}>
        <mesh material={materials.lateriteStoneMat} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.90, 1.05]} />
        </mesh>
        {/* Recessed Plinth Socket Collar */}
        <mesh position={[0, 0.46, 0]} material={materials.darkWoodMat} receiveShadow>
          <boxGeometry args={[0.75, 0.08, 0.75]} />
        </mesh>
        {/* Brass Anchor Collar Band */}
        <mesh position={[0, 0.50, 0]} material={materials.brassMat}>
          <boxGeometry args={[0.77, 0.06, 0.77]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 2. 0.55m WEATHERED TEAK TIMBER POSTS & STRAIGHT LINTEL                   */}
      {/* ========================================================================= */}
      {/* Left 0.55m Vertical Post (Socketed from Y=0.9m to Y=6.2m) */}
      <mesh position={[-3.4, 3.55, 0]} material={materials.teakMat} castShadow receiveShadow>
        <boxGeometry args={[0.55, 5.3, 0.55]} />
      </mesh>
      {/* Right 0.55m Vertical Post */}
      <mesh position={[3.4, 3.55, 0]} material={materials.teakMat} castShadow receiveShadow>
        <boxGeometry args={[0.55, 5.3, 0.55]} />
      </mesh>

      {/* Heavy Straight Timber Lintel Header Beam */}
      <mesh position={[0, 5.95, 0]} material={materials.teakMat} castShadow receiveShadow>
        <boxGeometry args={[8.2, 0.55, 0.65]} />
      </mesh>

      {/* Secondary Lower Transverse Tie Beam */}
      <mesh position={[0, 4.85, 0]} material={materials.darkWoodMat} castShadow>
        <boxGeometry args={[7.4, 0.28, 0.42]} />
      </mesh>

      {/* 45° Knee Braces supporting Lintel */}
      <mesh position={[-2.85, 5.4, 0]} rotation={[0, 0, -0.78]} material={materials.darkWoodMat} castShadow>
        <boxGeometry args={[0.18, 0.75, 0.18]} />
      </mesh>
      <mesh position={[2.85, 5.4, 0]} rotation={[0, 0, 0.78]} material={materials.darkWoodMat} castShadow>
        <boxGeometry args={[0.18, 0.75, 0.18]} />
      </mesh>

      {/* ========================================================================= */}
      {/* 3. BRUSHED ANTIQUE BRASS PLATES & NATURAL HEMP ROPE LASHINGS              */}
      {/* ========================================================================= */}
      {/* Left Joint: Antique Brass Corner Bracing Plate */}
      <mesh position={[-3.4, 5.95, 0.34]} material={materials.brassMat}>
        <boxGeometry args={[0.75, 0.75, 0.03]} />
      </mesh>
      {/* Right Joint: Antique Brass Corner Bracing Plate */}
      <mesh position={[3.4, 5.95, 0.34]} material={materials.brassMat}>
        <boxGeometry args={[0.75, 0.75, 0.03]} />
      </mesh>

      {/* Hemp Rope Lashings (Double-Turn Wraps at Left & Right Post-and-Beam Joints) */}
      <group position={[-3.4, 5.95, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.hempRopeMat}>
          <torusGeometry args={[0.42, 0.05, 8, 16]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.hempRopeMat}>
          <torusGeometry args={[0.42, 0.05, 8, 16]} />
        </mesh>
      </group>

      <group position={[3.4, 5.95, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.hempRopeMat}>
          <torusGeometry args={[0.42, 0.05, 8, 16]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.hempRopeMat}>
          <torusGeometry args={[0.42, 0.05, 8, 16]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 4. CARVED EXPEDITION COORDINATES PANEL & BRASS HEADLINE PLAQUE            */}
      {/* ========================================================================= */}
      <group position={[0, 5.35, 0]} name="Expedition_CoordinatesSign">
        {/* Dark Weathered Teak Backing Board */}
        <mesh material={materials.darkWoodMat} castShadow receiveShadow>
          <boxGeometry args={[6.2, 0.95, 0.22]} />
        </mesh>
        {/* Brushed Marine Brass Plaque Surface */}
        <mesh position={[0, 0, 0.12]} material={materials.brassMat} receiveShadow>
          <planeGeometry args={[5.9, 0.82]} />
        </mesh>
        {/* Engraved Plaque Raised Bezel Border */}
        <mesh position={[0, 0, 0.13]} material={materials.goldMat}>
          <boxGeometry args={[5.96, 0.88, 0.015]} />
        </mesh>

        {/* Diegetic Brass Rivet Details at Plaque Corners */}
        {[-2.8, 2.8].map((rx) =>
          [-0.32, 0.32].map((ry) => (
            <mesh key={`rivet-${rx}-${ry}`} position={[rx, ry, 0.14]} material={materials.goldMat}>
              <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
            </mesh>
          ))
        )}
      </group>

      {/* ========================================================================= */}
      {/* 5. TENSIONED OFF-WHITE SAILCLOTH SUNSHADE CANOPY                          */}
      {/* ========================================================================= */}
      <group position={[0, 6.4, -0.2]} name="Expedition_SailclothCanopy">
        {/* Slanted Off-White Sailcloth Canopy Membrane (8.6m wide x 2.4m depth) */}
        <mesh rotation={[0.22, 0, 0]} material={materials.sailclothMat} castShadow receiveShadow>
          <planeGeometry args={[8.6, 2.4, 12, 6]} />
        </mesh>
        {/* Seam Reinforcement Ribbon Trims */}
        {[-3.8, -1.9, 0, 1.9, 3.8].map((cx) => (
          <mesh key={`canopy-rib-${cx}`} position={[cx, 0.01, 0]} rotation={[0.22, 0, 0]} material={materials.sailclothTrimMat}>
            <planeGeometry args={[0.10, 2.4]} />
          </mesh>
        ))}

        {/* Marine Brass Grommet Rings & Tension Rigging Guys */}
        {[-4.1, 4.1].map((gx) => (
          <group key={`grommet-${gx}`} position={[gx, 0.1, -1.0]}>
            <mesh material={materials.brassMat}>
              <torusGeometry args={[0.04, 0.012, 8, 12]} />
            </mesh>
            {/* Rigging Guy Line down to Laterite Anchor */}
            <mesh position={[0, -0.8, -0.4]} rotation={[0.6, gx > 0 ? -0.3 : 0.3, 0]} material={materials.hempRopeMat}>
              <cylinderGeometry args={[0.012, 0.012, 1.8, 6]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================================= */}
      {/* 6. EXPEDITION WAYFINDING TOTEM & LATERITE STONE BOLLARDS                   */}
      {/* ========================================================================= */}
      <group position={[4.2, 0, -1.2]} name="Wayfinding_Totem">
        {/* Laterite Socket Base for Totem */}
        <mesh position={[0, 0.35, 0]} material={materials.lateriteStoneMat} castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.70, 0.65]} />
        </mesh>
        {/* Weathered Teak Totem Post */}
        <mesh position={[0, 1.8, 0]} material={materials.teakMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.14, 0.17, 2.9, 10]} />
        </mesh>
        {/* Brass Collar Band */}
        <mesh position={[0, 2.4, 0]} material={materials.brassMat}>
          <cylinderGeometry args={[0.155, 0.155, 0.06, 10]} />
        </mesh>

        {/* Brass Expedition Coordinates Plaque on Totem */}
        <mesh position={[0, 2.65, 0.12]} material={materials.goldMat} castShadow>
          <boxGeometry args={[0.85, 0.45, 0.05]} />
        </mesh>

        {/* Directional Wooden Pointer Boards */}
        {/* Pointer 1: WELCOME PAVILION */}
        <mesh position={[0.25, 2.1, 0]} rotation={[0, 0.28, 0]} material={materials.darkWoodMat} castShadow>
          <boxGeometry args={[1.35, 0.22, 0.05]} />
        </mesh>
        {/* Pointer 2: ST. MARY'S DOCK */}
        <mesh position={[-0.25, 1.68, 0]} rotation={[0, -0.42, 0]} material={materials.darkWoodMat} castShadow>
          <boxGeometry args={[1.4, 0.22, 0.05]} />
        </mesh>
        {/* Pointer 3: EXPLORATION DECK */}
        <mesh position={[0.2, 1.26, 0]} rotation={[0, 0.15, 0]} material={materials.darkWoodMat} castShadow>
          <boxGeometry args={[1.3, 0.22, 0.05]} />
        </mesh>
      </group>

      {/* Flanking Rough-Hewn Laterite Stone Bollards */}
      <mesh position={[-4.5, 0.45, -0.6]} castShadow receiveShadow material={materials.lateriteStoneMat}>
        <dodecahedronGeometry args={[0.55, 1]} />
      </mesh>
      <mesh position={[5.2, 0.40, 0.6]} castShadow receiveShadow material={materials.lateriteStoneMat}>
        <dodecahedronGeometry args={[0.50, 1]} />
      </mesh>
    </group>
  );
};

