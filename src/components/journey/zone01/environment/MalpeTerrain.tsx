import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createSandTexture, createLateriteRockTexture } from '../../../../lib/three/textureGenerator';

/**
 * MalpeTerrain Component
 * Photorealistic Coastal Karnataka Topography & Multi-Mask PBR Surface Splatting
 * 
 * Topographical Zones:
 * 1. Approach Road & Trail (Z < 40m, Y = 0.0m..0.3m, Crushed red laterite iron-earth #964831 with wagon cart ruts)
 * 2. Garden Walkway & Portal (Z: 40m..85m, Y: 0.4m..0.8m, Laterite trail #964831 curving to portal, organic edge falloff)
 * 3. Pavilion Platform (Z: 85m..125m, Y = 0.7m level platform & landscaped surrounds)
 * 4. Exploration Deck Dune Ridge (Z: 125m..165m, Y = 2.1m elevated dune promontory, dry pale sand #EADCC6 with micro-ripples)
 * 5. Sloping Sand Beach & Damp Transition (Z: 165m..210m, Y: 0.5m -> 0.0m -> -0.3m, transition from dry #EADCC6 to damp #C4B59D to wet #8F7C66)
 * 6. Intertidal Wet Sand & Submerged Sandbars (Z >= 210m, Y = -0.3m -> -2.2m, wave wash ripples, reflective wet sand #8F7C66, submerged sandbars)
 */
export const MalpeTerrain: React.FC = () => {
  const { geometry, material } = useMemo(() => {
    // 240m wide x 380m deep high-resolution continuous terrain mesh
    const width = 240;
    const depth = 380;
    const segmentsW = 160;
    const segmentsD = 240;

    const geo = new THREE.PlaneGeometry(width, depth, segmentsW, segmentsD);
    // Rotate to horizontal XZ plane
    geo.rotateX(-Math.PI / 2);
    // Offset along Z so mesh covers Z: -60m (behind approach) to +320m (deep ocean floor)
    geo.translate(0, 0, 130);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    // Precise Production Color Palette Tokens
    const cDrySand = new THREE.Color('#EADCC6');       // Dry pale sun-bleached coastal sand
    const cLateriteTrail = new THREE.Color('#964831');  // Crushed red laterite iron-earth trail
    const cLateriteEdging = new THREE.Color('#B86C52'); // Organic laterite gravel edging
    const cGardenTurf = new THREE.Color('#425E35');     // Coastal vegetation & turf
    const cGardenDark = new THREE.Color('#2F4525');     // Dense undergrowth shade
    const cTerraceSand = new THREE.Color('#DFCCA8');    // Compacted terrace sand
    const cDampSand = new THREE.Color('#C4B59D');       // Damp transition sand approaching tide line
    const cWetSand = new THREE.Color('#8F7C66');        // Wet reflective intertidal sand
    const cSubmergedSand = new THREE.Color('#382D22');   // Deep submerged Arabian sea bed

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      let y = 0;
      let col = cDrySand.clone();

      // Micro-relief organic undulation across terrain
      const microNoise = Math.sin(x * 0.12) * Math.cos(z * 0.09) * 0.035 + Math.sin(x * 0.28 + z * 0.18) * 0.015;

      // Calculate path centerline and wagon cart ruts across approach, portal, and pavilion zones
      let pathCenterX = 0;
      if (z < 40) {
        pathCenterX = 0;
      } else if (z >= 40 && z < 85) {
        const tZ = (z - 40) / 45;
        const smoothZ = tZ * tZ * (3 - 2 * tZ);
        pathCenterX = -3.8 * Math.sin(smoothZ * Math.PI * 0.85);
      } else if (z >= 85 && z < 125) {
        const tZ = (z - 85) / 40;
        pathCenterX = -3.2 * (1 - tZ);
      } else {
        pathCenterX = 0;
      }

      const distFromPath = Math.abs(x - pathCenterX);

      // Wagon cart ruts: parallel wheel track depressions at +/- 1.25m from path centerline
      const rutLeft = Math.exp(-Math.pow((distFromPath - 1.25) / 0.38, 2)) * -0.065;
      const rutRight = Math.exp(-Math.pow((distFromPath + 1.25) / 0.38, 2)) * -0.065;
      const centerRidge = Math.exp(-Math.pow(distFromPath / 0.75, 2)) * 0.018;
      const cartRutHeight = (rutLeft + rutRight + centerRidge);

      // Organic edge falloff weight for red laterite trail (NO hard polygon edge)
      const trailWeight = Math.exp(-Math.pow(distFromPath / 2.2, 2.4));

      if (z < 40) {
        // ZONE 1: Approach Road & Red Laterite Trail (Z < 40m, y = 0.0m..0.3m)
        const roadHalfWidth = 4.2;
        const roadCamber = Math.max(0, 0.035 * (1 - Math.pow(distFromPath / roadHalfWidth, 2)));
        const roadSurface = 0.0 + roadCamber + cartRutHeight + microNoise * 0.4;

        const shoulderBlend = Math.min(1, Math.max(0, (distFromPath - 3.5) / 4.5));
        const shoulderHeight = 0.0 + shoulderBlend * (0.28 + 0.18 * Math.sin(x * 0.07) * Math.cos(z * 0.08));

        y = roadSurface * (1 - shoulderBlend) + shoulderHeight * shoulderBlend;

        // Multi-mask color blending with organic edge falloff
        const baseColor = cGardenTurf.clone().lerp(cGardenDark, Math.sin(x * 0.15 + z * 0.1) * 0.25 + 0.25);
        if (distFromPath < 5.5) {
          const edgeBlend = Math.min(1, Math.max(0, (distFromPath - 2.2) / 3.3));
          const trailColor = cLateriteTrail.clone().lerp(cLateriteEdging, edgeBlend * 0.5);
          col.copy(baseColor).lerp(trailColor, trailWeight);
        } else {
          col.copy(baseColor);
        }

      } else if (z >= 40 && z < 85) {
        // ZONE 2: Garden Walkway & Portal (Z: 40m..85m, y = 0.4m..0.8m)
        const tZ = (z - 40) / 45;
        const smoothZ = tZ * tZ * (3 - 2 * tZ);

        const pathElevation = 0.0 + 0.70 * smoothZ + cartRutHeight + microNoise * 0.4;
        const bermHeight = 0.15 + 0.55 * smoothZ + 0.24 * Math.sin(x * 0.08) * Math.cos(z * 0.06) + 0.12 * Math.cos(x * 0.14);

        const pathBlend = Math.min(1, Math.max(0, (distFromPath - 2.2) / 3.0));
        y = pathElevation * (1 - pathBlend) + bermHeight * pathBlend;

        const baseColor = cGardenTurf.clone().lerp(cGardenDark, 0.4 + Math.sin(z * 0.2) * 0.2);
        if (distFromPath < 5.0) {
          const edgeBlend = Math.min(1, Math.max(0, (distFromPath - 1.8) / 3.2));
          const trailColor = cLateriteTrail.clone().lerp(cLateriteEdging, edgeBlend * 0.6);
          col.copy(baseColor).lerp(trailColor, trailWeight);
        } else {
          col.copy(baseColor);
        }

      } else if (z >= 85 && z < 125) {
        // ZONE 3: Pavilion Foundation Platform (Z: 85m..125m, y = 0.7m level platform)
        const dx = Math.abs(x) / 12.0;
        const dz = Math.abs(z - 96) / 14.0;
        const padDist = Math.max(dx, dz);
        const padWeight = 1.0 - Math.min(1, Math.max(0, (padDist - 0.75) / 0.5));

        const padHeight = 0.70 + microNoise * 0.2;
        const surroundHeight = 0.70 + 0.22 * Math.sin(x * 0.06) * Math.cos((z - 96) * 0.08) + 0.12 * Math.cos(x * 0.15);

        y = padHeight * padWeight + surroundHeight * (1 - padWeight);

        if (padDist < 0.8) {
          const trailBlend = Math.exp(-Math.pow(distFromPath / 3.0, 2));
          col.copy(cTerraceSand).lerp(cLateriteTrail, trailBlend * 0.7);
        } else if (padDist < 1.3) {
          const t = (padDist - 0.8) / 0.5;
          col.copy(cTerraceSand).lerp(cGardenTurf, t);
        } else {
          col.copy(cGardenTurf).lerp(cLateriteEdging, 0.25);
        }

      } else if (z >= 125 && z < 165) {
        // ZONE 4: Exploration Deck Dune Ridge (Z: 125m..165m, y = 2.1m elevated lookout)
        const tZ = (z - 125) / 40;
        const ridgeProfile = 0.70 + 1.40 * Math.exp(-Math.pow((z - 150) / 14.0, 2));

        const ridgeWalkway = Math.abs(x) < 7.0;
        // Subtle wind-rippled micro-displacement
        const duneRipples = 0.045 * Math.sin(x * 0.45 + z * 0.22) + 0.02 * Math.cos(x * 0.85 - z * 0.42);
        const duneNoise = 0.32 * Math.sin(x * 0.05) * Math.cos((z - 150) * 0.06) + 0.14 * Math.cos(x * 0.11) + duneRipples;

        y = ridgeWalkway ? (ridgeProfile + microNoise * 0.3 + duneRipples) : (ridgeProfile + duneNoise);

        if (Math.abs(x) < 6.0) {
          col.copy(cDrySand).lerp(cTerraceSand, 0.25);
        } else if (Math.abs(x) < 14.0) {
          const t = (Math.abs(x) - 6.0) / 8.0;
          col.copy(cDrySand).lerp(cGardenTurf, t * 0.35);
        } else {
          col.copy(cDrySand).lerp(cGardenTurf, 0.30);
        }

      } else if (z >= 165 && z < 210) {
        // ZONE 5: Sloping Sand Beach & Damp Transition (Z: 165m..210m, y = 0.5m -> 0.0m -> -0.3m)
        const tZ = (z - 165) / 45;
        const slope = 0.72 * Math.pow(1 - tZ, 1.5) - 0.04 * tZ;
        const beachBerm = 0.05 * Math.sin(x * 0.04) * Math.cos(z * 0.08) + 0.025 * Math.sin(z * 0.35);
        const windRipples = 0.035 * Math.sin(x * 0.5 + z * 0.25);

        y = slope + beachBerm + windRipples + microNoise * 0.3;

        if (z < 190) {
          // Dry pale sun-bleached coastal sand #EADCC6 with wind ripples
          const rippleTone = Math.sin(x * 0.8 + z * 0.4) * 0.04;
          col.copy(cDrySand).lerp(cTerraceSand, 0.15 + rippleTone);
        } else if (z < 208) {
          // Damp transition sand #C4B59D approaching tide line
          const t = (z - 190) / 18;
          col.copy(cDrySand).lerp(cDampSand, t);
        } else {
          // Wet reflective intertidal sand #8F7C66
          const t = (z - 208) / 2;
          col.copy(cDampSand).lerp(cWetSand, t);
        }

      } else {
        // ZONE 6: Intertidal Wet Sand & Submerged Sandbars (Z >= 210m, y = -0.3m -> -2.2m)
        const tZ = Math.min(1.0, (z - 210) / 110);
        
        // Oscillating wave wash ripple ridges & submerged sandbars
        const washRipples = (z < 228) ? 0.038 * Math.sin(z * 1.35 + Math.sin(x * 0.3) * 0.8) : 0;
        const sandbar = 0.28 * Math.sin(x * 0.045 + z * 0.075) * Math.cos(x * 0.08 - z * 0.035);

        y = -0.30 - 1.90 * tZ + sandbar + washRipples + microNoise * 0.2;

        if (z < 228) {
          // Wet reflective intertidal sand #8F7C66
          col.copy(cWetSand);
        } else {
          // Submerged sea bed #382D22 visible through shallow turquoise water
          const t = Math.min(1.0, (z - 228) / 60);
          col.copy(cWetSand).lerp(cSubmergedSand, t);
        }
      }

      pos.setY(i, y);

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const { normalMap } = createSandTexture();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughness: 0.88,
      metalness: 0.04,
      flatShading: false,
    });

    // Custom GLSL shader hook to boost specular wetness & lower roughness on wet intertidal sand (#8F7C66)
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <roughnessmap_fragment>',
        `
        #include <roughnessmap_fragment>
        // High specular wetness for wet intertidal sand (vColor RGB near #8F7C66)
        float isWetSand = clamp((vColor.r < 0.60 && vColor.g < 0.52 && vColor.b < 0.44 && vColor.r > 0.45) ? 1.0 : 0.0, 0.0, 1.0);
        roughnessFactor = mix(roughnessFactor, 0.18, isWetSand);
        `
      );
    };

    return { geometry: geo, material: mat };
  }, []);

  return (
    <group name="MalpeTerrain_Complex">
      {/* 1. Main Continuous Topography Mesh */}
      <mesh geometry={geometry} material={material} receiveShadow />
      
      {/* 2. Geologically Accurate Karnataka Laterite & Basalt Boulder Formations */}
      {/* Roadside Approach Laterite Outcrops */}
      <LateriteRockCluster position={[-9.5, 0.1, 16]} scale={1.4} yaw={0.4} type="laterite" />
      <LateriteRockCluster position={[10.2, 0.12, 28]} scale={1.6} yaw={-0.6} type="laterite" />
      <LateriteRockCluster position={[-11.5, 0.2, 38]} scale={1.8} yaw={1.1} type="laterite" />

      {/* Gateway & Garden Walkway Border Boulders */}
      <LateriteRockCluster position={[12.0, 0.45, 56]} scale={2.1} yaw={0.8} type="laterite" />
      <LateriteRockCluster position={[-14.5, 0.58, 72]} scale={2.3} yaw={-1.2} type="laterite" />
      <LateriteRockCluster position={[15.0, 0.72, 86]} scale={2.5} yaw={1.7} type="laterite" />

      {/* Pavilion Terrace Anchoring Outcrops */}
      <LateriteRockCluster position={[-16.0, 0.75, 104]} scale={2.7} yaw={-0.5} type="laterite" />
      <LateriteRockCluster position={[17.5, 0.78, 118]} scale={2.9} yaw={2.3} type="laterite" />

      {/* Exploration Deck Cliff & Dune Lookout Boulders (Basalt + Laterite mix) */}
      <LateriteRockCluster position={[-16.5, 2.05, 146]} scale={3.3} yaw={0.9} type="basalt" />
      <LateriteRockCluster position={[18.0, 1.95, 152]} scale={3.6} yaw={-1.4} type="laterite" />
      <LateriteRockCluster position={[-23.0, 1.55, 162]} scale={3.9} yaw={2.1} type="basalt" />
      <LateriteRockCluster position={[25.0, 1.35, 168]} scale={3.7} yaw={-0.7} type="laterite" />

      {/* Beachhead & Surf Sea-Breaker Formations */}
      <LateriteRockCluster position={[-28.0, 0.12, 188]} scale={4.2} yaw={1.3} type="basalt" />
      <LateriteRockCluster position={[30.0, -0.05, 196]} scale={4.4} yaw={-1.8} type="laterite" />
      <LateriteRockCluster position={[-19.0, -0.35, 214]} scale={3.8} yaw={0.5} isWet={true} type="basalt" />
      <LateriteRockCluster position={[24.0, -0.45, 226]} scale={4.6} yaw={-2.0} isWet={true} type="basalt" />
    </group>
  );
};

interface LateriteRockClusterProps {
  position: [number, number, number];
  scale?: number;
  yaw?: number;
  isWet?: boolean;
  type?: 'laterite' | 'basalt';
}

/**
 * LateriteRockCluster
 * Multi-scale weathered laterite and St. Mary's basalt boulder cluster featuring stratified fractures,
 * crevice shading, and top-surface sand accumulation (Strict Anti-Primitive geometry).
 */
const LateriteRockCluster: React.FC<LateriteRockClusterProps> = ({ 
  position, 
  scale = 1, 
  yaw = 0,
  isWet = false,
  type = 'laterite'
}) => {
  const { rockMaterials, mainGeo, subGeo1, subGeo2, screeGeo } = useMemo(() => {
    const { map: rockMap, normalMap: rockNormal } = createLateriteRockTexture();

    const isBasalt = type === 'basalt';

    // Primary Stone Material
    const matPrimary = new THREE.MeshStandardMaterial({
      color: isWet 
        ? (isBasalt ? '#1A1C1E' : '#3D261C') 
        : (isBasalt ? '#2B2D2F' : '#6A4532'),
      map: rockMap,
      normalMap: rockNormal,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: isWet ? 0.38 : 0.92,
      metalness: isBasalt ? 0.08 : 0.05,
      flatShading: false,
    });

    // Dark Crevice & Fissure Material (Crevice Shading)
    const matDark = new THREE.MeshStandardMaterial({
      color: isWet 
        ? (isBasalt ? '#121314' : '#2A1C16') 
        : (isBasalt ? '#1F2022' : '#453026'),
      map: rockMap,
      normalMap: rockNormal,
      normalScale: new THREE.Vector2(0.95, 0.95),
      roughness: isWet ? 0.30 : 0.96,
      metalness: isBasalt ? 0.12 : 0.08,
      flatShading: false,
    });

    // Rust / Mineral Weathered Patina Material
    const matRust = new THREE.MeshStandardMaterial({
      color: isWet 
        ? (isBasalt ? '#282A2C' : '#4E3022') 
        : (isBasalt ? '#3A3C3E' : '#85513A'),
      map: rockMap,
      normalMap: rockNormal,
      normalScale: new THREE.Vector2(0.75, 0.75),
      roughness: isWet ? 0.42 : 0.90,
      metalness: 0.06,
      flatShading: false,
    });

    // Helper to generate natural stratified displaced boulder geometry with sand accumulation
    const createDeformedBoulder = (baseRadius: number, detail: number, seed: number) => {
      const geo = new THREE.DodecahedronGeometry(baseRadius, detail);
      const pos = geo.attributes.position;
      geo.computeVertexNormals();
      const norm = geo.attributes.normal;

      const colors = new Float32Array(pos.count * 3);
      const baseRockColor = new THREE.Color(isBasalt ? '#2B2D2F' : '#6A4532');
      const sandAccumColor = new THREE.Color(isWet ? '#8F7C66' : '#EADCC6');

      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const vz = pos.getZ(i);
        const ny = norm.getY(i);

        // Stratified horizontal shearing and angular fracture displacement
        const strata = Math.sin(vy * 3.5 + seed) * 0.14 * baseRadius;
        const fracture = Math.cos(vx * 4.2 + vz * 3.8 + seed * 2.0) * 0.12 * baseRadius;
        
        // Flatten base to anchor naturally into terrain
        const baseFlatten = vy < -baseRadius * 0.3 ? (vy + baseRadius * 0.3) * 0.4 : 0;

        pos.setXYZ(
          i,
          vx + (vx > 0 ? fracture : -fracture) * 0.5,
          vy + strata + baseFlatten,
          vz + fracture * 0.6
        );

        // Top surface sand accumulation (ny > 0.55)
        const sandWeight = Math.min(1.0, Math.max(0.0, (ny - 0.50) / 0.35));
        const vCol = baseRockColor.clone().lerp(sandAccumColor, sandWeight * 0.65);
        colors[i * 3] = vCol.r;
        colors[i * 3 + 1] = vCol.g;
        colors[i * 3 + 2] = vCol.b;
      }

      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      return geo;
    };

    return {
      rockMaterials: { matPrimary, matDark, matRust },
      mainGeo: createDeformedBoulder(0.95, 2, 1.3),
      subGeo1: createDeformedBoulder(0.68, 2, 2.7),
      subGeo2: createDeformedBoulder(0.52, 2, 4.1),
      screeGeo: createDeformedBoulder(0.28, 1, 5.8),
    };
  }, [isWet, type]);

  return (
    <group position={position} rotation={[0, yaw, 0]} scale={[scale, scale * 0.75, scale]}>
      {/* 1. Main Anchor Boulder */}
      <mesh 
        position={[0, 0.45, 0]} 
        rotation={[0.15, 0.3, -0.1]} 
        geometry={mainGeo} 
        material={rockMaterials.matPrimary} 
        castShadow 
        receiveShadow 
      />

      {/* 2. Secondary Angular Flanking Boulder */}
      <mesh 
        position={[0.85, 0.32, 0.45]} 
        rotation={[0.42, 0.85, 0.25]} 
        geometry={subGeo1} 
        material={rockMaterials.matDark} 
        castShadow 
        receiveShadow 
      />

      {/* 3. Shelving Outcrop Boulder */}
      <mesh 
        position={[-0.75, 0.25, -0.35]} 
        rotation={[-0.3, 0.65, 0.4]} 
        geometry={subGeo2} 
        material={rockMaterials.matRust} 
        castShadow 
        receiveShadow 
      />

      {/* 4. Base Scree & Eroded Pebble Groupings */}
      <mesh 
        position={[0.45, 0.1, -0.65]} 
        rotation={[0.5, 1.2, 0]} 
        geometry={screeGeo} 
        material={rockMaterials.matPrimary} 
        castShadow 
        receiveShadow 
      />
      <mesh 
        position={[-0.95, 0.08, 0.55]} 
        rotation={[0.2, 2.1, 0.4]} 
        scale={[0.8, 0.6, 0.9]} 
        geometry={screeGeo} 
        material={rockMaterials.matDark} 
        castShadow 
        receiveShadow 
      />
    </group>
  );
};
