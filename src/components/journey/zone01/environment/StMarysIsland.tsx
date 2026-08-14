import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * StMarysIsland Component
 * Geological Narrative Climax for Malpe Digital Twin (Z = 1150m):
 * 
 * 88-Million-Year-Old Sub-Volcanic Hexagonal Columnar Basalt Formations:
 * Formed during the sub-aerial breakup of Madagascar from the Indian plate in the Cretaceous period.
 * 
 * Architectural & Geological Features:
 * 1. Dark 6-Sided Hexagonal Columnar Basalt Formations (#2A282A):
 *    - True 6-sided polygonal prism geometries of varying heights (Y: 1.2m to 9.5m)
 *    - Tilted column jointing (0° to 14° angles), cross-joint fractures, and cliff step faces
 *    - Intertidal wet basalt patina (#1E1C1E, roughness 0.28) at sea level with dry weathered basalt above
 * 
 * 2. Pale Sun-Bleached Sand Beach (#EADCC6):
 *    - Crescent island beach dunes wrapping around the lagoon floor
 * 
 * 3. Crystal Turquoise Lagoon (#25C4C0 / #158F93):
 *    - Sheltered clear lagoon water surrounding the basalt column archipelago
 * 
 * 4. Seaward Wind-Bowed Coconut Palms (Cocos nucifera):
 *    - Island palm groves bowing seaward (+Z direction) under persistent Arabian Sea winds
 * 
 * 5. National Geological Monument Landmark Marker:
 *    - Official GSI (Geological Survey of India) brass plaque marker
 */

export const StMarysIsland: React.FC = () => {
  const materials = useMemo(() => {
    return {
      // Dark Weathered Columnar Basalt (#2A282A)
      basaltDryMat: new THREE.MeshStandardMaterial({
        color: '#2A282A',
        roughness: 0.86,
        metalness: 0.15,
        flatShading: true
      }),
      // Intertidal Wet Basalt Patina (#1E1C1E)
      basaltWetMat: new THREE.MeshStandardMaterial({
        color: '#1E1C1E',
        roughness: 0.28,
        metalness: 0.22,
        flatShading: true
      }),
      // Iron Rust / Oxidized Basalt Joint Fissure Fill
      basaltRustMat: new THREE.MeshStandardMaterial({
        color: '#42322A',
        roughness: 0.90,
        metalness: 0.10,
        flatShading: true
      }),
      // Pale Sun-Bleached Sand (#EADCC6)
      islandSandMat: new THREE.MeshStandardMaterial({
        color: '#EADCC6',
        roughness: 0.88,
        metalness: 0.04
      }),
      // Crystal Turquoise Lagoon Water Mesh (#25C4C0)
      lagoonWaterMat: new THREE.MeshStandardMaterial({
        color: '#25C4C0',
        roughness: 0.12,
        metalness: 0.85,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        side: THREE.DoubleSide
      }),
      // Seaward Palm Trunk Wood
      palmTrunkMat: new THREE.MeshStandardMaterial({
        color: '#5C4033',
        roughness: 0.85
      }),
      // Seaward Palm Fronds
      palmFrondMat: new THREE.MeshStandardMaterial({
        color: '#2F4F2F',
        roughness: 0.65,
        side: THREE.DoubleSide
      }),
      // Brass Geological Marker Plaque
      brassMarkerMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.35,
        metalness: 0.85
      })
    };
  }, []);

  // Pre-calculate 6-sided hexagonal basalt column positions and parameters
  const basaltColumns = useMemo(() => {
    const columns: Array<{
      position: [number, number, number];
      radius: number;
      height: number;
      rotation: [number, number, number];
      isWet: boolean;
    }> = [];

    // Main Central Columnar Cliff (Organ-pipe structure)
    const centerColsCount = 38;
    for (let i = 0; i < centerColsCount; i++) {
      const angle = (i / centerColsCount) * Math.PI * 2;
      const radiusDist = 4.0 + (i % 5) * 2.8 + (Math.sin(i * 1.7) * 2.2);
      const x = Math.cos(angle) * radiusDist;
      const z = Math.sin(angle) * radiusDist * 0.8;
      const height = 4.5 + Math.sin(i * 1.3) * 3.2 + (12 - radiusDist) * 0.4;
      const tiltX = (Math.sin(i * 2.1) * 0.08);
      const tiltZ = (Math.cos(i * 1.8) * 0.08);
      const radius = 0.75 + (i % 3) * 0.25;

      columns.push({
        position: [x, height / 2 - 1.2, z],
        radius,
        height,
        rotation: [tiltX, (i * Math.PI) / 3, tiltZ],
        isWet: height < 3.2
      });
    }

    // Western Cliff Outcrop (Tiered step columns)
    for (let i = 0; i < 22; i++) {
      const x = -14.0 - (i % 5) * 2.2 + Math.cos(i) * 1.5;
      const z = -4.0 + Math.sin(i * 1.4) * 6.0;
      const height = 2.8 + Math.cos(i * 0.9) * 2.5;
      columns.push({
        position: [x, height / 2 - 1.2, z],
        radius: 0.65 + (i % 2) * 0.2,
        height,
        rotation: [0.05 * Math.sin(i), (i * Math.PI) / 6, 0.05 * Math.cos(i)],
        isWet: height < 2.5
      });
    }

    // Eastern Coastal Breaker Columns (Sea-washed basalt stepping stones)
    for (let i = 0; i < 20; i++) {
      const x = 12.0 + (i % 4) * 2.4 + Math.sin(i) * 1.8;
      const z = 2.0 + Math.cos(i * 1.2) * 7.0;
      const height = 1.8 + Math.sin(i * 1.5) * 2.0;
      columns.push({
        position: [x, height / 2 - 1.2, z],
        radius: 0.7 + (i % 3) * 0.18,
        height,
        rotation: [0.08 * Math.cos(i), (i * Math.PI) / 3, 0.08 * Math.sin(i)],
        isWet: true
      });
    }

    return columns;
  }, []);

  return (
    <group name="StMarysIsland_Climax" position={[0, 0, 1150]}>
      {/* 1. Base Island Topography & Pale Sun-Bleached Sand Dunes */}
      <mesh position={[0, -0.6, 0]} material={materials.islandSandMat} receiveShadow>
        <cylinderGeometry args={[32, 42, 1.8, 32]} />
      </mesh>

      {/* 2. Crystal Turquoise Lagoon Water Ring */}
      <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.lagoonWaterMat}>
        <ringGeometry args={[18, 65, 32]} />
      </mesh>

      {/* 3. Dark 6-Sided Hexagonal Columnar Basalt Formations */}
      <group name="Basalt_Column_Cluster">
        {basaltColumns.map((col, idx) => (
          <mesh
            key={`basalt-col-${idx}`}
            position={col.position}
            rotation={col.rotation}
            material={col.isWet ? materials.basaltWetMat : materials.basaltDryMat}
            castShadow
            receiveShadow
          >
            {/* Radial Segments = 6 enforces true 6-sided hexagonal prisms */}
            <cylinderGeometry args={[col.radius, col.radius * 1.05, col.height, 6]} />
          </mesh>
        ))}
      </group>

      {/* 4. Seaward Wind-Bowed Coconut Palms (Cocos nucifera) */}
      <group name="StMarys_WindBowed_Palms">
        {/* Palm 1: Tall Seaward Bowing Palm */}
        <group position={[-6, 1.2, 4]} rotation={[0.25, 0.4, 0.1]}>
          {/* Curved Trunk */}
          <mesh position={[0, 4.0, 0]} material={materials.palmTrunkMat} castShadow>
            <cylinderGeometry args={[0.22, 0.35, 8.0, 8]} />
          </mesh>
          {/* Canopy Crown */}
          <group position={[0, 7.8, 0]}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, pi) => (
              <mesh
                key={`frond-1-${pi}`}
                rotation={[0.4, (deg * Math.PI) / 180, -0.3]}
                position={[0, 0, 0]}
                material={materials.palmFrondMat}
                castShadow
              >
                <boxGeometry args={[0.4, 0.04, 3.2]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Palm 2: Mid-Height Seaward Bowing Cluster */}
        <group position={[7, 1.0, -3]} rotation={[0.32, -0.5, 0.15]}>
          <mesh position={[0, 3.2, 0]} material={materials.palmTrunkMat} castShadow>
            <cylinderGeometry args={[0.2, 0.32, 6.4, 8]} />
          </mesh>
          <group position={[0, 6.2, 0]}>
            {[0, 60, 120, 180, 240, 300].map((deg, pi) => (
              <mesh
                key={`frond-2-${pi}`}
                rotation={[0.45, (deg * Math.PI) / 180, -0.25]}
                material={materials.palmFrondMat}
                castShadow
              >
                <boxGeometry args={[0.38, 0.04, 2.8]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Palm 3: Young Seaward Bowing Palm near Lagoon Shore */}
        <group position={[-2, 0.8, -8]} rotation={[0.28, 0.2, -0.1]}>
          <mesh position={[0, 2.5, 0]} material={materials.palmTrunkMat} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 5.0, 8]} />
          </mesh>
          <group position={[0, 4.8, 0]}>
            {[0, 72, 144, 216, 288].map((deg, pi) => (
              <mesh
                key={`frond-3-${pi}`}
                rotation={[0.5, (deg * Math.PI) / 180, -0.2]}
                material={materials.palmFrondMat}
                castShadow
              >
                <boxGeometry args={[0.35, 0.04, 2.4]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* 5. National Geological Monument Brass Marker Plaque */}
      <group position={[0, 1.8, 11]} rotation={[-0.2, 0, 0]}>
        <mesh material={materials.basaltDryMat} castShadow>
          <boxGeometry args={[1.2, 1.5, 0.4]} />
        </mesh>
        <mesh position={[0, 0.1, 0.22]} material={materials.brassMarkerMat}>
          <boxGeometry args={[0.95, 1.1, 0.04]} />
        </mesh>
      </group>
    </group>
  );
};
