import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPalmFrondTexture, createBroadleafTexture } from '../../../../lib/three/textureGenerator';

/**
 * VegetationSystem Component
 * Dynamic Botanical Population System for Malpe Digital Twin (Zone 01)
 * 
 * Key Features:
 * - 4 Botanical Variants of Cocos nucifera across 1200m Continuous Spatial World (Z = 0m -> 1200m):
 *   1. Tall Mature Leaning Palm (12m)
 *   2. Mid-height Upright Palm (9m)
 *   3. Coastal Wind-Bowed Palm (7m)
 *   4. Young Cluster Palm (5m)
 * - Ecological InstancedMesh GPU batching & per-instance randomized scale (0.85x - 1.2x),
 *   trunk bend curvature (0° to 28°), yaw rotation, frond count (18-32), and frond droop age across Z=0m to Z=1200m.
 * - Seaward wind bowing logic: palms closer to shoreline naturally bow seaward (+Z towards Arabian Sea).
 * - Gentle non-synchronous wind sway frame & vertex physics with independent multi-harmonic phase offsets.
 * - Tropical undergrowth: Spinifex littoreus dune runner grass clusters, broadleaf Alocasia macrorrhizos, Bougainvillea coastal shrubs.
 * - Inhabited cause-and-effect ground debris: fallen brown palm fronds, coconut husks, driftwood logs, and shell fragments clustered near tree bases and high-tide swash lines.
 */

// ----------------------------------------------------------------------------
// Types & Botanical Variant Configurations
// ----------------------------------------------------------------------------

export type PalmVariantType =
  | 'TALL_MATURE_LEANING'
  | 'MID_HEIGHT_UPRIGHT'
  | 'COASTAL_WIND_BOWED'
  | 'YOUNG_CLUSTER';

export interface PalmVariantSpec {
  variant: PalmVariantType;
  name: string;
  baseHeight: number;
  baseLeanX: number;
  baseLeanZ: number;
  minFronds: number;
  maxFronds: number;
  droopAge: number; // 0.0 (young) to 1.0 (aged skirt)
  bendCurvature: number; // 0° to 28°
}

export const PALM_VARIANT_SPECS: Record<PalmVariantType, PalmVariantSpec> = {
  TALL_MATURE_LEANING: {
    variant: 'TALL_MATURE_LEANING',
    name: 'Tall Mature Leaning Palm (12m)',
    baseHeight: 12.0,
    baseLeanX: 0.22,
    baseLeanZ: 0.18,
    minFronds: 28,
    maxFronds: 32,
    droopAge: 0.9,
    bendCurvature: 22,
  },
  MID_HEIGHT_UPRIGHT: {
    variant: 'MID_HEIGHT_UPRIGHT',
    name: 'Mid-height Upright Palm (9m)',
    baseHeight: 9.0,
    baseLeanX: 0.06,
    baseLeanZ: 0.08,
    minFronds: 22,
    maxFronds: 26,
    droopAge: 0.5,
    bendCurvature: 8,
  },
  COASTAL_WIND_BOWED: {
    variant: 'COASTAL_WIND_BOWED',
    name: 'Coastal Wind-Bowed Palm (7m)',
    baseHeight: 7.0,
    baseLeanX: 0.38,
    baseLeanZ: 0.42,
    minFronds: 20,
    maxFronds: 24,
    droopAge: 0.7,
    bendCurvature: 27,
  },
  YOUNG_CLUSTER: {
    variant: 'YOUNG_CLUSTER',
    name: 'Young Cluster Palm (5m)',
    baseHeight: 5.0,
    baseLeanX: 0.04,
    baseLeanZ: 0.05,
    minFronds: 18,
    maxFronds: 22,
    droopAge: 0.1,
    bendCurvature: 4,
  },
};

export interface PalmInstanceData {
  id: string;
  variant: PalmVariantType;
  pos: [number, number, number];
  scale: number;
  bendCurvature: number; // 0 to 28 degrees
  yaw: number;
  frondCount: number;
  droopAge: number;
  seawardLeanZ: number;
  height: number;
}

// Helper: Calculate seaward wind bowing based on Z proximity to shoreline/Arabian Sea across Z=0m to Z=1200m
export function calculateSeawardBowing(pos: [number, number, number], variant: PalmVariantType) {
  const spec = PALM_VARIANT_SPECS[variant];
  // Shoreline proximity / coastal exposure factor (0 at inland road entrance Z=0, up to 1.0 towards open ocean/coast Z=150..1200)
  const coastalFactor = Math.max(0, Math.min(1.0, (pos[2] - 15) / 185));
  
  // Bowing increases seaward (+Z direction towards open sea) up to 28 degrees max curvature
  const extraSeawardLean = (variant === 'COASTAL_WIND_BOWED' ? 0.36 : 0.18) * coastalFactor;
  const effectiveCurvature = Math.min(28, spec.bendCurvature + coastalFactor * 8);

  return {
    seawardLeanZ: spec.baseLeanZ + extraSeawardLean,
    bendCurvature: effectiveCurvature,
  };
}

// ----------------------------------------------------------------------------
// Main VegetationSystem Component
// ----------------------------------------------------------------------------

export const VegetationSystem: React.FC = () => {
  const palmGroupRef = useRef<THREE.Group>(null);
  const shrubGroupRef = useRef<THREE.Group>(null);
  const debrisGroupRef = useRef<THREE.Group>(null);

  // 1. Naturalistic Botanical Population Layout across 1200m Continuous Spatial World (Z = 0m -> 1200m)
  const palmInstances = useMemo<PalmInstanceData[]>(() => {
    const rawPlacements: Array<{
      variant: PalmVariantType;
      pos: [number, number, number];
      scale?: number;
      yaw?: number;
      frondCount?: number;
    }> = [
      // --- Zone 01A: Approach Road & Entry Sanctuary (Z = 10..55m) ---
      { variant: 'TALL_MATURE_LEANING', pos: [-15.2, 0.0, 12.5], scale: 1.12, yaw: 0.35, frondCount: 30 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-20.5, 0.1, 24.0], scale: 0.98, yaw: 1.15, frondCount: 24 },
      { variant: 'YOUNG_CLUSTER', pos: [-13.0, 0.0, 36.5], scale: 0.90, yaw: 2.10, frondCount: 20 },
      { variant: 'TALL_MATURE_LEANING', pos: [-22.8, 0.2, 45.0], scale: 1.18, yaw: 0.85, frondCount: 31 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-17.5, 0.05, 52.0], scale: 1.05, yaw: 1.80, frondCount: 25 },
      { variant: 'YOUNG_CLUSTER', pos: [-18.8, 0.05, 53.5], scale: 0.86, yaw: 4.20, frondCount: 19 },
      { variant: 'TALL_MATURE_LEANING', pos: [16.5, 0.0, 15.0], scale: 1.08, yaw: 3.40, frondCount: 29 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [22.2, 0.1, 28.5], scale: 1.02, yaw: 0.75, frondCount: 23 },
      { variant: 'YOUNG_CLUSTER', pos: [14.0, 0.0, 40.0], scale: 0.88, yaw: 1.95, frondCount: 18 },
      { variant: 'TALL_MATURE_LEANING', pos: [23.5, 0.2, 50.5], scale: 1.15, yaw: 2.60, frondCount: 32 },

      // --- Zone 01B: Pavilion Sanctuary Framing (Z = 60..125m) ---
      { variant: 'TALL_MATURE_LEANING', pos: [-18.5, 0.35, 68.0], scale: 1.14, yaw: 0.55, frondCount: 28 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-25.2, 0.50, 88.0], scale: 1.06, yaw: 2.75, frondCount: 26 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-17.0, 0.65, 108.0], scale: 0.96, yaw: 1.65, frondCount: 22 },
      { variant: 'TALL_MATURE_LEANING', pos: [20.4, 0.35, 72.0], scale: 1.20, yaw: 3.15, frondCount: 30 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [27.0, 0.55, 96.0], scale: 1.10, yaw: 0.95, frondCount: 24 },
      { variant: 'COASTAL_WIND_BOWED', pos: [19.2, 0.65, 122.0], scale: 1.04, yaw: 2.25, frondCount: 23 },

      // --- Zone 01C: Coastal Dune Transition & Intertidal Swash Line (Z = 130..250m) ---
      { variant: 'COASTAL_WIND_BOWED', pos: [-23.5, 0.45, 142.0], scale: 1.08, yaw: 1.10, frondCount: 24 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-29.0, 0.15, 172.0], scale: 1.15, yaw: 0.30, frondCount: 22 },
      { variant: 'YOUNG_CLUSTER', pos: [-26.5, 0.20, 185.0], scale: 0.92, yaw: 0.90, frondCount: 20 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-27.8, 0.20, 186.2], scale: 1.00, yaw: 2.10, frondCount: 21 },
      { variant: 'COASTAL_WIND_BOWED', pos: [25.5, 0.55, 148.0], scale: 1.12, yaw: 2.85, frondCount: 23 },
      { variant: 'COASTAL_WIND_BOWED', pos: [31.2, 0.10, 182.0], scale: 1.16, yaw: 1.65, frondCount: 24 },
      { variant: 'YOUNG_CLUSTER', pos: [28.0, 0.12, 192.0], scale: 0.88, yaw: 4.10, frondCount: 18 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-32.0, 0.10, 220.0], scale: 1.10, yaw: 0.45, frondCount: 23 },
      { variant: 'TALL_MATURE_LEANING', pos: [34.0, 0.15, 240.0], scale: 1.14, yaw: 3.10, frondCount: 29 },

      // --- Zone 01D: Sea Walkway & Harbour Edge Groves (Z = 260..500m) ---
      { variant: 'COASTAL_WIND_BOWED', pos: [-38.0, 0.10, 280.0], scale: 1.05, yaw: 1.25, frondCount: 22 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-42.0, 0.12, 330.0], scale: 0.95, yaw: 2.40, frondCount: 25 },
      { variant: 'TALL_MATURE_LEANING', pos: [-35.0, 0.15, 380.0], scale: 1.18, yaw: 0.70, frondCount: 30 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-40.0, 0.10, 440.0], scale: 1.12, yaw: 1.85, frondCount: 24 },
      { variant: 'YOUNG_CLUSTER', pos: [-36.0, 0.08, 490.0], scale: 0.90, yaw: 3.50, frondCount: 19 },
      { variant: 'COASTAL_WIND_BOWED', pos: [38.0, 0.10, 290.0], scale: 1.08, yaw: 2.10, frondCount: 23 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [45.0, 0.15, 350.0], scale: 1.02, yaw: 0.60, frondCount: 24 },
      { variant: 'TALL_MATURE_LEANING', pos: [40.0, 0.20, 410.0], scale: 1.16, yaw: 4.10, frondCount: 31 },
      { variant: 'COASTAL_WIND_BOWED', pos: [42.0, 0.12, 470.0], scale: 1.14, yaw: 1.30, frondCount: 22 },

      // --- Zone 01E: Mid-Coast Beach & Coastal Fringe (Z = 510..800m) ---
      { variant: 'COASTAL_WIND_BOWED', pos: [-44.0, 0.10, 540.0], scale: 1.12, yaw: 0.80, frondCount: 23 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-48.0, 0.15, 600.0], scale: 0.98, yaw: 2.90, frondCount: 25 },
      { variant: 'TALL_MATURE_LEANING', pos: [-42.0, 0.18, 670.0], scale: 1.20, yaw: 1.15, frondCount: 32 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-46.0, 0.10, 730.0], scale: 1.06, yaw: 0.35, frondCount: 21 },
      { variant: 'YOUNG_CLUSTER', pos: [-40.0, 0.08, 780.0], scale: 0.88, yaw: 3.20, frondCount: 20 },
      { variant: 'COASTAL_WIND_BOWED', pos: [46.0, 0.12, 560.0], scale: 1.10, yaw: 2.45, frondCount: 24 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [50.0, 0.15, 620.0], scale: 1.04, yaw: 1.05, frondCount: 26 },
      { variant: 'TALL_MATURE_LEANING', pos: [44.0, 0.20, 700.0], scale: 1.15, yaw: 3.80, frondCount: 30 },
      { variant: 'COASTAL_WIND_BOWED', pos: [48.0, 0.10, 760.0], scale: 1.12, yaw: 0.90, frondCount: 23 },

      // --- Zone 01F: Outer Lagoon & St. Mary's Basalt Isle Groves (Z = 810..1180m) ---
      { variant: 'COASTAL_WIND_BOWED', pos: [-35.0, 0.15, 840.0], scale: 1.14, yaw: 1.50, frondCount: 24 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [-38.0, 0.20, 910.0], scale: 1.00, yaw: 3.20, frondCount: 25 },
      { variant: 'TALL_MATURE_LEANING', pos: [-32.0, 0.25, 980.0], scale: 1.18, yaw: 0.40, frondCount: 31 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-28.0, 0.30, 1050.0], scale: 1.16, yaw: 2.15, frondCount: 23 },
      { variant: 'COASTAL_WIND_BOWED', pos: [-22.0, 0.35, 1120.0], scale: 1.10, yaw: 1.05, frondCount: 22 },
      { variant: 'YOUNG_CLUSTER', pos: [-18.0, 0.40, 1160.0], scale: 0.92, yaw: 4.00, frondCount: 19 },
      { variant: 'COASTAL_WIND_BOWED', pos: [36.0, 0.15, 860.0], scale: 1.12, yaw: 2.70, frondCount: 23 },
      { variant: 'MID_HEIGHT_UPRIGHT', pos: [40.0, 0.20, 930.0], scale: 1.02, yaw: 0.85, frondCount: 24 },
      { variant: 'TALL_MATURE_LEANING', pos: [34.0, 0.25, 1010.0], scale: 1.16, yaw: 3.45, frondCount: 30 },
      { variant: 'COASTAL_WIND_BOWED', pos: [26.0, 0.30, 1080.0], scale: 1.15, yaw: 1.60, frondCount: 24 },
      { variant: 'COASTAL_WIND_BOWED', pos: [20.0, 0.35, 1140.0], scale: 1.08, yaw: 0.50, frondCount: 22 },
      { variant: 'YOUNG_CLUSTER', pos: [15.0, 0.40, 1175.0], scale: 0.86, yaw: 2.30, frondCount: 18 },
    ];

    return rawPlacements.map((p, idx) => {
      const spec = PALM_VARIANT_SPECS[p.variant];
      const scale = p.scale ?? (0.85 + (idx % 7) * 0.05);
      const yaw = p.yaw ?? ((idx * 1.37) % (Math.PI * 2));
      const frondCount = p.frondCount ?? (spec.minFronds + (idx % (spec.maxFronds - spec.minFronds + 1)));
      const { seawardLeanZ, bendCurvature } = calculateSeawardBowing(p.pos, p.variant);
      const height = spec.baseHeight * scale;

      return {
        id: `palm-${p.variant.toLowerCase()}-${idx}`,
        variant: p.variant,
        pos: p.pos,
        scale,
        bendCurvature,
        yaw,
        frondCount,
        droopAge: spec.droopAge,
        seawardLeanZ,
        height,
      };
    });
  }, []);

  // 2. Coastal Undergrowth Placement Coordinates across 1200m World
  const undergrowthPlacements = useMemo(() => [
    // Roadside / Gateway Approach (Z = 10..55m)
    { type: 'broadleaf', pos: [-12.5, 0.1, 20], scale: 1.2, rot: 0.4 },
    { type: 'grass', pos: [-10.8, 0.05, 26], scale: 1.3, rot: 1.2 },
    { type: 'shrub', pos: [-11.5, 0.1, 34], scale: 1.4, rot: 2.1 },
    { type: 'broadleaf', pos: [13.2, 0.1, 22], scale: 1.1, rot: 3.2 },
    { type: 'grass', pos: [11.5, 0.05, 30], scale: 1.35, rot: 0.8 },
    { type: 'shrub', pos: [12.8, 0.1, 38], scale: 1.45, rot: 1.9 },

    // Pavilion Sanctuary Perimeter (Z = 60..125m)
    { type: 'broadleaf', pos: [-14.5, 0.35, 62], scale: 1.5, rot: 0.6 },
    { type: 'shrub', pos: [-16.0, 0.45, 76], scale: 1.6, rot: 2.8 },
    { type: 'grass', pos: [-13.2, 0.40, 92], scale: 1.4, rot: 1.4 },
    { type: 'broadleaf', pos: [16.5, 0.40, 68], scale: 1.55, rot: 3.0 },
    { type: 'shrub', pos: [17.5, 0.50, 84], scale: 1.5, rot: 0.9 },
    { type: 'grass', pos: [14.8, 0.45, 102], scale: 1.3, rot: 2.4 },

    // Coastal & Shoreline Transition (Z = 130..250m)
    { type: 'grass', pos: [-18.5, 0.55, 132], scale: 1.6, rot: 1.0 },
    { type: 'broadleaf', pos: [-20.0, 0.45, 150], scale: 1.7, rot: 0.4 },
    { type: 'grass', pos: [-24.0, 0.25, 170], scale: 1.8, rot: 2.2 },
    { type: 'grass', pos: [20.0, 0.50, 138], scale: 1.5, rot: 2.9 },
    { type: 'broadleaf', pos: [22.5, 0.35, 158], scale: 1.65, rot: 1.7 },
    { type: 'grass', pos: [26.0, 0.15, 178], scale: 1.75, rot: 0.8 },

    // Sea Walkway & Harbour Edge (Z = 260..500m)
    { type: 'grass', pos: [-28.0, 0.10, 310], scale: 1.6, rot: 1.5 },
    { type: 'shrub', pos: [-32.0, 0.12, 390], scale: 1.5, rot: 0.3 },
    { type: 'broadleaf', pos: [30.0, 0.10, 330], scale: 1.7, rot: 2.1 },
    { type: 'grass', pos: [34.0, 0.15, 450], scale: 1.65, rot: 1.1 },

    // St. Mary's Basalt Lagoon (Z = 800..1180m)
    { type: 'grass', pos: [-20.0, 0.30, 950], scale: 1.7, rot: 0.5 },
    { type: 'shrub', pos: [-15.0, 0.35, 1080], scale: 1.6, rot: 2.4 },
    { type: 'broadleaf', pos: [22.0, 0.30, 990], scale: 1.8, rot: 1.9 },
    { type: 'grass', pos: [18.0, 0.38, 1140], scale: 1.75, rot: 0.8 },
  ], []);

  // 3. Ground Debris Placement Coordinates (Tree Bases & High-Tide Swash Line Z = 10m -> 1180m)
  const debrisPlacements = useMemo(() => {
    const items: Array<{
      type: 'fallen_frond' | 'coconut_husk' | 'driftwood' | 'shell_fragment';
      pos: [number, number, number];
      scale: number;
      rot: [number, number, number];
    }> = [];

    // Generate cause-and-effect debris near each palm tree base
    palmInstances.forEach((palm, idx) => {
      const [px, py, pz] = palm.pos;
      // 1-2 fallen brown fronds near base
      items.push({
        type: 'fallen_frond',
        pos: [px + Math.sin(idx) * 1.4, py + 0.02, pz + Math.cos(idx) * 1.4],
        scale: 0.8 + (idx % 4) * 0.1,
        rot: [0.1, idx * 1.2, -0.05],
      });
      // 2-3 coconut husks near base
      items.push({
        type: 'coconut_husk',
        pos: [px - Math.cos(idx * 0.8) * 0.9, py + 0.05, pz + Math.sin(idx * 0.8) * 0.9],
        scale: 0.9 + (idx % 3) * 0.15,
        rot: [0.3, idx * 0.7, 0.2],
      });
    });

    // High-tide wrack line debris across Z = 135m to Z = 1150m
    const zSteps = [135, 160, 185, 240, 320, 420, 520, 650, 780, 920, 1050, 1140];
    zSteps.forEach((zVal, i) => {
      const xLeft = -28 + Math.sin(i * 1.5) * 4;
      const xRight = 24 + Math.cos(i * 1.3) * 4;

      // Driftwood logs lying along high-tide swash line
      items.push({
        type: 'driftwood',
        pos: [xLeft, 0.08, zVal],
        scale: 1.0 + (i % 4) * 0.2,
        rot: [0.05, 0.4 + i * 0.3, -0.02],
      });
      items.push({
        type: 'driftwood',
        pos: [xRight, 0.08, zVal + 2],
        scale: 0.9 + (i % 3) * 0.25,
        rot: [-0.03, -0.5 + i * 0.2, 0.04],
      });

      // Shell fragments scattered along swash line
      items.push({
        type: 'shell_fragment',
        pos: [xLeft + Math.cos(i) * 2, 0.03, zVal + 1],
        scale: 0.7 + (i % 5) * 0.15,
        rot: [0, i * 1.1, 0],
      });
      items.push({
        type: 'shell_fragment',
        pos: [xRight - Math.sin(i) * 2, 0.03, zVal + 1.5],
        scale: 0.75 + (i % 4) * 0.12,
        rot: [0, i * 0.9, 0],
      });
    });

    return items;
  }, [palmInstances]);

  // 4. Non-Synchronous Wind Sway Physics
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Multi-harmonic non-synchronous sway for palm crowns
    if (palmGroupRef.current) {
      palmGroupRef.current.children.forEach((child, idx) => {
        const crown = child.getObjectByName('PalmCrown');
        if (crown) {
          const pos = child.position;
          // Per-instance phase offset from world coordinates
          const phase = pos.x * 0.17 + pos.z * 0.23 + idx * 0.41;
          const windFreq = 0.80 + (idx % 5) * 0.09;

          const swayZ = Math.sin(t * windFreq + phase) * 0.052 + Math.sin(t * 1.75 + phase * 1.4) * 0.016;
          const swayX = Math.cos(t * (windFreq * 0.82) + phase) * 0.042 + Math.cos(t * 1.35 + phase * 0.9) * 0.012;

          crown.rotation.z = swayZ;
          crown.rotation.x = swayX;
        }
      });
    }

    // Undergrowth foliage flutter
    if (shrubGroupRef.current) {
      shrubGroupRef.current.children.forEach((child, idx) => {
        const pos = child.position;
        const phase = pos.x * 0.15 + pos.z * 0.19;
        child.rotation.y = Math.sin(t * 1.15 + phase) * 0.030;
        child.rotation.z = Math.cos(t * 0.95 + phase) * 0.022;
      });
    }
  });

  return (
    <group name="Vegetation_BotanicalPopulationSystem">
      {/* Compatibility Name Anchor */}
      <group name="Vegetation_KarnatakaCoconutGroves">
        {/* Palm Canopy Layer */}
        <group ref={palmGroupRef} name="PalmCanopyLayer">
          {palmInstances.map((palm) => (
            <CoconutPalmKeyed
              key={palm.id}
              data={palm}
            />
          ))}
        </group>

        {/* GPU Instanced Coconut Palm Groves Batching (570 GPU Instanced Trees Spanning Z = 0m -> 1200m) */}
        <InstancedCoconutPalmBatch count={570} />

        {/* Coastal Undergrowth Layer */}
        <group ref={shrubGroupRef} name="UndergrowthLayer">
          {undergrowthPlacements.map((item, idx) => {
            if (item.type === 'broadleaf') {
              return (
                <TropicalBroadleafCluster
                  key={`undergrowth-broadleaf-${idx}`}
                  position={item.pos as [number, number, number]}
                  scale={item.scale}
                  rotation={item.rot}
                />
              );
            } else if (item.type === 'grass') {
              return (
                <CoastalBeachGrassCluster
                  key={`undergrowth-grass-${idx}`}
                  position={item.pos as [number, number, number]}
                  scale={item.scale}
                  rotation={item.rot}
                />
              );
            } else {
              return (
                <BougainvilleaCoastalShrub
                  key={`undergrowth-shrub-${idx}`}
                  position={item.pos as [number, number, number]}
                  scale={item.scale}
                  rotation={item.rot}
                />
              );
            }
          })}
        </group>

        {/* GPU Instanced Undergrowth Batching (Spanning Z = 0m -> 1200m) */}
        <InstancedUndergrowthBatch />

        {/* Inhabited Cause-and-Effect Ground Debris Layer */}
        <group ref={debrisGroupRef} name="CauseAndEffectDebrisLayer">
          {debrisPlacements.map((d, idx) => (
            <CauseAndEffectDebrisItem
              key={`debris-${d.type}-${idx}`}
              type={d.type}
              position={d.pos}
              scale={d.scale}
              rotation={d.rot}
            />
          ))}
        </group>

        {/* GPU Instanced Ground Debris Batching (Spanning Z = 0m -> 1200m) */}
        <InstancedGroundDebrisBatch />
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------
// Coconut Palm Individual Component (Keyed Instance)
// ----------------------------------------------------------------------------

interface CoconutPalmKeyedProps {
  data: PalmInstanceData;
}

const CoconutPalmKeyed: React.FC<CoconutPalmKeyedProps> = ({ data }) => {
  const spec = PALM_VARIANT_SPECS[data.variant];

  const {
    trunkGeo,
    rootBoleGeo,
    ringRuler,
    trunkMat,
    fiberCollarMat,
    greenFrondMat,
    emergentFrondMat,
    matureFrondMat,
    driedFrondMat,
    greenNutMat,
    matureNutMat,
    apexPoint,
  } = useMemo(() => {
    const { height, bendCurvature, seawardLeanZ } = data;
    // Bend curvature to radian conversion
    const bendRad = (bendCurvature * Math.PI) / 180;
    const leanX = spec.baseLeanX * Math.cos(data.yaw);
    const leanZ = seawardLeanZ;

    // 1. Organic Multi-Segment Curved Trunk Spline (5 Control Points)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(leanX * height * 0.12, height * 0.20, leanZ * height * 0.10),
      new THREE.Vector3(leanX * height * 0.38 + bendRad * 0.6, height * 0.52, leanZ * height * 0.36),
      new THREE.Vector3(leanX * height * 0.72 + bendRad * 1.2, height * 0.82, leanZ * height * 0.72),
      new THREE.Vector3(leanX * height * 0.98 + bendRad * 1.8, height, leanZ * height * 0.95),
    ]);

    // Trunk tube with natural taper
    const radiusBase = data.variant === 'TALL_MATURE_LEANING' ? 0.38 : data.variant === 'YOUNG_CLUSTER' ? 0.26 : 0.32;
    const trunk = new THREE.TubeGeometry(curve, 28, radiusBase, 14, false);

    // Basal root bole flare
    const rootBole = new THREE.CylinderGeometry(radiusBase, radiusBase * 1.45, 0.5, 14);

    // Annular scar rings
    const ringCount = Math.floor(height * 0.7);
    const rings = [];
    for (let i = 1; i <= ringCount; i++) {
      const u = i / (ringCount + 1);
      const pt = curve.getPoint(u);
      rings.push({ pt, key: i });
    }

    // High-PBR Materials
    const tMat = new THREE.MeshStandardMaterial({
      color: spec.variant === 'YOUNG_CLUSTER' ? '#5A4632' : '#4A3728',
      roughness: 0.94,
      metalness: 0.02,
    });

    const fCollarMat = new THREE.MeshStandardMaterial({
      color: '#362416',
      roughness: 0.98,
    });

    const frondTexture = createPalmFrondTexture();

    const emFrondMat = new THREE.MeshStandardMaterial({
      map: frondTexture,
      color: '#B8DC42',
      transparent: true,
      alphaTest: 0.22,
      side: THREE.DoubleSide,
      roughness: 0.55,
    });

    const grFrondMat = new THREE.MeshStandardMaterial({
      map: frondTexture,
      color: '#82B432',
      transparent: true,
      alphaTest: 0.22,
      side: THREE.DoubleSide,
      roughness: 0.60,
    });

    const matFrondMat = new THREE.MeshStandardMaterial({
      map: frondTexture,
      color: '#658C28',
      transparent: true,
      alphaTest: 0.22,
      side: THREE.DoubleSide,
      roughness: 0.68,
    });

    const drFrondMat = new THREE.MeshStandardMaterial({
      map: frondTexture,
      color: '#8A683D',
      transparent: true,
      alphaTest: 0.22,
      side: THREE.DoubleSide,
      roughness: 0.95,
    });

    const gNutMat = new THREE.MeshStandardMaterial({
      color: '#4E7228',
      roughness: 0.45,
    });

    const mNutMat = new THREE.MeshStandardMaterial({
      color: '#5C4028',
      roughness: 0.92,
    });

    return {
      trunkGeo: trunk,
      rootBoleGeo: rootBole,
      ringRuler: rings,
      trunkMat: tMat,
      fiberCollarMat: fCollarMat,
      greenFrondMat: grFrondMat,
      emergentFrondMat: emFrondMat,
      matureFrondMat: matFrondMat,
      driedFrondMat: drFrondMat,
      greenNutMat: gNutMat,
      matureNutMat: mNutMat,
      apexPoint: curve.getPoint(1.0),
    };
  }, [data, spec]);

  // Dynamic Frond Canopy Generation based on frondCount & droopAge
  const canopyFronds = useMemo(() => {
    const items = [];
    const count = data.frondCount;

    // Tiers ratio
    const emergentCount = Math.floor(count * 0.25);
    const spreadingCount = Math.floor(count * 0.45);
    const weepingCount = Math.floor(count * 0.20);
    const driedCount = count - (emergentCount + spreadingCount + weepingCount);

    // Tier 1: Emergent
    for (let i = 0; i < emergentCount; i++) {
      const angle = (i / emergentCount) * Math.PI * 2 + 0.1;
      const pitch = 0.50 + (i % 2) * 0.10;
      items.push({ tier: 'emergent', angle, pitch, roll: 0.1, length: 4.2, key: `em-${i}` });
    }
    // Tier 2: Spreading
    for (let i = 0; i < spreadingCount; i++) {
      const angle = (i / spreadingCount) * Math.PI * 2 + 0.35;
      const pitch = 0.20 + (i % 3) * 0.08;
      items.push({ tier: 'spreading', angle, pitch, roll: (i % 2 === 0 ? 0.18 : -0.18), length: 6.0, key: `sp-${i}` });
    }
    // Tier 3: Weeping
    for (let i = 0; i < weepingCount; i++) {
      const angle = (i / weepingCount) * Math.PI * 2 + 0.7;
      const pitch = -0.28 - (i % 2) * 0.12 * (1.0 + data.droopAge);
      items.push({ tier: 'weeping', angle, pitch, roll: 0.25, length: 5.4, key: `wp-${i}` });
    }
    // Tier 4: Dried Skirt
    for (let i = 0; i < driedCount; i++) {
      const angle = (i / driedCount) * Math.PI * 2 + 1.1;
      const pitch = -0.82 - (i % 2) * 0.10;
      items.push({ tier: 'dried', angle, pitch, roll: 0.1, length: 4.6, key: `dr-${i}` });
    }

    return items;
  }, [data.frondCount, data.droopAge]);

  const frondStems = useMemo(() => {
    const createStemGeo = (len: number, droop: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.7, len * 0.35),
        new THREE.Vector3(0, 0.3 - droop * 0.5, len * 0.70),
        new THREE.Vector3(0, -1.0 - droop * 1.1, len),
      ]);
      return new THREE.TubeGeometry(curve, 16, 0.06, 6, false);
    };

    return {
      emergentStem: createStemGeo(4.2, 0.3),
      spreadingStem: createStemGeo(6.0, 0.8),
      weepingStem: createStemGeo(5.4, 1.3),
      driedStem: createStemGeo(4.6, 1.7),
    };
  }, []);

  return (
    <group position={data.pos} rotation={[0, data.yaw, 0]} scale={[data.scale, data.scale, data.scale]}>
      {/* Root Bole */}
      <mesh geometry={rootBoleGeo} material={trunkMat} position={[0, 0.25, 0]} castShadow receiveShadow />

      {/* Trunk */}
      <mesh geometry={trunkGeo} material={trunkMat} castShadow receiveShadow />

      {/* Scar Rings */}
      {ringRuler.map((ring) => (
        <mesh key={ring.key} position={[ring.pt.x, ring.pt.y, ring.pt.z]} material={trunkMat} castShadow>
          <torusGeometry args={[0.34, 0.022, 6, 12]} />
        </mesh>
      ))}

      {/* Crown Juncture */}
      <group name="PalmCrown" position={[apexPoint.x, apexPoint.y, apexPoint.z]}>
        {/* Crown Collar Sheath */}
        <mesh position={[0, -0.2, 0]} material={fiberCollarMat} castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.65, 12]} />
        </mesh>

        {/* Fruiting Coconuts */}
        <group position={[0.20, -0.30, 0.18]} rotation={[0.2, 0.4, 0]}>
          <CoconutDrupe position={[0, 0, 0]} material={greenNutMat} scale={1.0} />
          <CoconutDrupe position={[-0.22, -0.10, 0.14]} material={greenNutMat} scale={0.95} />
          <CoconutDrupe position={[0.20, -0.12, -0.10]} material={greenNutMat} scale={0.98} />
        </group>
        {data.droopAge > 0.4 && (
          <group position={[-0.18, -0.36, -0.20]} rotation={[-0.2, -0.5, 0]}>
            <CoconutDrupe position={[0, 0, 0]} material={matureNutMat} scale={1.08} />
            <CoconutDrupe position={[0.24, -0.08, -0.14]} material={matureNutMat} scale={1.02} />
          </group>
        )}

        {/* Radial Canopy Fronds */}
        {canopyFronds.map((f) => {
          let stemGeo = frondStems.spreadingStem;
          let frondMat = greenFrondMat;
          let bladeWidth = 2.4;
          let bladeLength = 5.6;

          if (f.tier === 'emergent') {
            stemGeo = frondStems.emergentStem;
            frondMat = emergentFrondMat;
            bladeWidth = 1.9;
            bladeLength = 4.0;
          } else if (f.tier === 'weeping') {
            stemGeo = frondStems.weepingStem;
            frondMat = matureFrondMat;
            bladeWidth = 2.4;
            bladeLength = 5.2;
          } else if (f.tier === 'dried') {
            stemGeo = frondStems.driedStem;
            frondMat = driedFrondMat;
            bladeWidth = 2.1;
            bladeLength = 4.4;
          }

          return (
            <group key={f.key} rotation={[f.pitch, f.angle, f.roll]}>
              <mesh geometry={stemGeo} castShadow receiveShadow>
                <meshStandardMaterial color={f.tier === 'dried' ? '#6B4E28' : '#5E7D2B'} roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.32, bladeLength * 0.52]} rotation={[-Math.PI / 2, 0, 0]} material={frondMat} castShadow>
                <planeGeometry args={[bladeWidth, bladeLength, 2, 8]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// Helper: Coconut Drupe
const CoconutDrupe: React.FC<{ position: [number, number, number]; material: THREE.Material; scale?: number }> = ({
  position,
  material,
  scale = 1.0,
}) => (
  <group position={position} scale={[scale, scale * 1.25, scale]}>
    <mesh material={material} castShadow>
      <sphereGeometry args={[0.24, 10, 10]} />
    </mesh>
    <mesh position={[0, 0.22, 0]} castShadow>
      <coneGeometry args={[0.07, 0.10, 6]} />
      <meshStandardMaterial color="#2E1F12" roughness={0.9} />
    </mesh>
  </group>
);

// ----------------------------------------------------------------------------
// Tropical Undergrowth Components
// ----------------------------------------------------------------------------

export const TropicalBroadleafCluster: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}> = ({ position, scale = 1.0, rotation = 0 }) => {
  const { leafMat, stemMat, stems } = useMemo(() => {
    const lMat = new THREE.MeshStandardMaterial({
      map: createBroadleafTexture(),
      transparent: true,
      alphaTest: 0.2,
      side: THREE.DoubleSide,
      roughness: 0.5,
    });
    const sMat = new THREE.MeshStandardMaterial({ color: '#3B6822', roughness: 0.75 });

    const stemList = [
      { angle: 0.2, pitch: 0.45, len: 1.6, key: 0 },
      { angle: 1.4, pitch: 0.55, len: 1.8, key: 1 },
      { angle: 2.5, pitch: 0.40, len: 1.5, key: 2 },
      { angle: 3.8, pitch: 0.50, len: 1.9, key: 3 },
      { angle: 5.1, pitch: 0.42, len: 1.4, key: 4 },
    ];
    return { leafMat: lMat, stemMat: sMat, stems: stemList };
  }, []);

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {stems.map((s) => (
        <group key={s.key} rotation={[s.pitch, s.angle, 0]}>
          <mesh position={[0, s.len * 0.45, s.len * 0.4]} rotation={[0.5, 0, 0]} material={stemMat} castShadow>
            <cylinderGeometry args={[0.03, 0.055, s.len, 8]} />
          </mesh>
          <mesh position={[0, s.len * 0.9, s.len * 0.8]} rotation={[-0.4, 0, 0]} material={leafMat} castShadow>
            <planeGeometry args={[1.5, 1.8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const CoastalBeachGrassCluster: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}> = ({ position, scale = 1.0, rotation = 0 }) => {
  const { grassMat, blades } = useMemo(() => {
    const gMat = new THREE.MeshStandardMaterial({
      color: '#6F8A38',
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    const bladeList = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const pitch = 0.25 + (i % 3) * 0.12;
      const heightVal = 0.8 + (i % 4) * 0.22;
      bladeList.push({ angle, pitch, heightVal, key: i });
    }
    return { grassMat: gMat, blades: bladeList };
  }, []);

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {blades.map((b) => (
        <group key={b.key} rotation={[b.pitch, b.angle, 0]}>
          <mesh position={[0, b.heightVal * 0.5, b.heightVal * 0.3]} rotation={[0.4, 0, 0]} material={grassMat} castShadow>
            <planeGeometry args={[0.08, b.heightVal]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const BougainvilleaCoastalShrub: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}> = ({ position, scale = 1.0, rotation = 0 }) => (
  <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
    <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.95, 1]} />
      <meshStandardMaterial color="#2E5222" roughness={0.82} />
    </mesh>
    <mesh position={[0.55, 0.45, 0.35]} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.75, 1]} />
      <meshStandardMaterial color="#3D6A2D" roughness={0.80} />
    </mesh>
    <mesh position={[-0.50, 0.40, -0.30]} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.70, 1]} />
      <meshStandardMaterial color="#25441B" roughness={0.85} />
    </mesh>

    {/* Coral & Magenta Blossom Tufts */}
    <mesh position={[0.25, 0.95, 0.22]} castShadow>
      <sphereGeometry args={[0.22, 8, 8]} />
      <meshStandardMaterial color="#C83B64" roughness={0.65} />
    </mesh>
    <mesh position={[-0.32, 0.78, 0.35]} castShadow>
      <sphereGeometry args={[0.18, 8, 8]} />
      <meshStandardMaterial color="#D64840" roughness={0.65} />
    </mesh>
  </group>
);

// ----------------------------------------------------------------------------
// Cause-and-Effect Ground Debris Single Items
// ----------------------------------------------------------------------------

export const CauseAndEffectDebrisItem: React.FC<{
  type: 'fallen_frond' | 'coconut_husk' | 'driftwood' | 'shell_fragment';
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ type, position, scale = 1.0, rotation = [0, 0, 0] }) => {
  const frondTexture = useMemo(() => createPalmFrondTexture(), []);

  if (type === 'fallen_frond') {
    return (
      <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <mesh position={[0, 0.05, 1.8]} rotation={[-Math.PI / 2 + 0.1, 0, 0]} castShadow>
          <planeGeometry args={[1.8, 3.8]} />
          <meshStandardMaterial map={frondTexture} color="#7A5A32" transparent alphaTest={0.2} side={THREE.DoubleSide} roughness={0.92} />
        </mesh>
      </group>
    );
  } else if (type === 'coconut_husk') {
    return (
      <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color="#6A4E32" roughness={0.95} />
        </mesh>
      </group>
    );
  } else if (type === 'driftwood') {
    return (
      <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.18, 2.4, 8]} />
          <meshStandardMaterial color="#6E6255" roughness={0.88} />
        </mesh>
      </group>
    );
  } else {
    return (
      <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <mesh rotation={[-0.4, 0, 0]} castShadow>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshStandardMaterial color="#F0ECE4" roughness={0.35} metalness={0.1} />
        </mesh>
      </group>
    );
  }
};

// ----------------------------------------------------------------------------
// GPU Instanced Undergrowth & Debris Batching Components across 1200m World
// ----------------------------------------------------------------------------

export const InstancedUndergrowthBatch: React.FC = () => {
  const grassRef = useRef<THREE.InstancedMesh>(null!);
  const count = 200;

  useLayoutEffect(() => {
    if (!grassRef.current || typeof grassRef.current.setMatrixAt !== 'function') return;
    const tempObj = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Spanning Z = 0m -> 1200m
      const z = (i * 6.0) % 1200;
      const x = -35 + ((i * 11.3) % 70);
      const scale = 0.8 + (i % 5) * 0.18;
      tempObj.position.set(x, 0.05, z);
      tempObj.rotation.set(0, (i * 0.7) % (Math.PI * 2), 0);
      tempObj.scale.set(scale, scale, scale);
      tempObj.updateMatrix();
      grassRef.current.setMatrixAt(i, tempObj.matrix);
    }
    if (grassRef.current.instanceMatrix) {
      grassRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);

  return (
    <instancedMesh
      ref={grassRef}
      args={[undefined, undefined, count]}
      data-testid="instanced-spinifex-grass"
    >
      <coneGeometry args={[0.4, 0.9, 5]} />
      <meshStandardMaterial color="#6F8A38" roughness={0.85} />
    </instancedMesh>
  );
};

export const InstancedGroundDebrisBatch: React.FC = () => {
  const husksRef = useRef<THREE.InstancedMesh>(null!);
  const count = 120;

  useLayoutEffect(() => {
    if (!husksRef.current || typeof husksRef.current.setMatrixAt !== 'function') return;
    const tempObj = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Spanning Z = 0m -> 1200m
      const z = (i * 10.0) % 1200;
      const x = -30 + ((i * 8.7) % 60);
      tempObj.position.set(x, 0.04, z);
      tempObj.rotation.set(0.2, (i * 1.1) % (Math.PI * 2), 0.1);
      tempObj.scale.set(0.8, 0.8, 0.8);
      tempObj.updateMatrix();
      husksRef.current.setMatrixAt(i, tempObj.matrix);
    }
    if (husksRef.current.instanceMatrix) {
      husksRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);

  return (
    <instancedMesh
      ref={husksRef}
      args={[undefined, undefined, count]}
      data-testid="instanced-coconut-husks-debris"
    >
      <sphereGeometry args={[0.18, 6, 6]} />
      <meshStandardMaterial color="#5C4028" roughness={0.92} />
    </instancedMesh>
  );
};

export const InstancedCoconutPalmBatch: React.FC<{ count?: number }> = ({ count = 570 }) => {
  const trunksRef = useRef<THREE.InstancedMesh>(null!);
  const crownsRef = useRef<THREE.InstancedMesh>(null!);

  const instancesData = useMemo(() => {
    const items: Array<{
      pos: [number, number, number];
      scale: number;
      yaw: number;
      variant: PalmVariantType;
      height: number;
      bendCurvature: number;
      seawardLeanZ: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      const zFrac = i / count;
      const z = 2.0 + zFrac * 1194.0 + Math.sin(i * 14.3) * 3.2;
      const isLeft = i % 2 === 0;
      const sideSign = isLeft ? -1 : 1;
      const distFromCenter = 12.0 + ((i * 17.1) % 43);
      const x = sideSign * distFromCenter;
      const y = Math.max(0.0, Math.sin(z * 0.008) * 0.35 + (distFromCenter - 12.0) * 0.008);

      const variantRoll = (i * 3.7 + Math.abs(x)) % 10;
      let variant: PalmVariantType;
      if (distFromCenter > 30 || z > 150) {
        if (variantRoll < 4) variant = 'COASTAL_WIND_BOWED';
        else if (variantRoll < 7) variant = 'TALL_MATURE_LEANING';
        else if (variantRoll < 9) variant = 'MID_HEIGHT_UPRIGHT';
        else variant = 'YOUNG_CLUSTER';
      } else {
        if (variantRoll < 4) variant = 'MID_HEIGHT_UPRIGHT';
        else if (variantRoll < 7) variant = 'TALL_MATURE_LEANING';
        else if (variantRoll < 9) variant = 'YOUNG_CLUSTER';
        else variant = 'COASTAL_WIND_BOWED';
      }

      const scale = 0.85 + ((i * 1.7) % 35) * 0.01;
      const yaw = (i * 1.37) % (Math.PI * 2);
      const spec = PALM_VARIANT_SPECS[variant];
      const height = spec.baseHeight * scale;
      const { seawardLeanZ, bendCurvature } = calculateSeawardBowing([x, y, z], variant);

      items.push({
        pos: [Number(x.toFixed(2)), Number(y.toFixed(2)), Number(z.toFixed(2))],
        scale,
        yaw,
        variant,
        height,
        bendCurvature,
        seawardLeanZ,
      });
    }
    return items;
  }, [count]);

  useLayoutEffect(() => {
    if (!trunksRef.current || !crownsRef.current) return;
    if (typeof trunksRef.current.setMatrixAt !== 'function') return;

    const tempObj = new THREE.Object3D();

    instancesData.forEach((inst, i) => {
      const [x, y, z] = inst.pos;
      const bendRad = (inst.bendCurvature * Math.PI) / 180;

      // Trunk Instance Matrix
      tempObj.position.set(x, y + inst.height * 0.5, z + inst.seawardLeanZ * inst.height * 0.4);
      tempObj.rotation.set(inst.seawardLeanZ * 0.15, inst.yaw, bendRad * 0.2);
      tempObj.scale.set(inst.scale * 0.32, inst.height, inst.scale * 0.32);
      tempObj.updateMatrix();
      trunksRef.current.setMatrixAt(i, tempObj.matrix);

      // Crown Instance Matrix
      const apexX = x + Math.cos(inst.yaw) * inst.scale * 0.3 + bendRad * 0.5;
      const apexY = y + inst.height;
      const apexZ = z + inst.seawardLeanZ * inst.height * 0.8;
      tempObj.position.set(apexX, apexY, apexZ);
      tempObj.rotation.set(0.1, inst.yaw, 0);
      tempObj.scale.set(inst.scale * 3.2, inst.scale * 2.2, inst.scale * 3.2);
      tempObj.updateMatrix();
      crownsRef.current.setMatrixAt(i, tempObj.matrix);
    });

    if (trunksRef.current.instanceMatrix) trunksRef.current.instanceMatrix.needsUpdate = true;
    if (crownsRef.current.instanceMatrix) crownsRef.current.instanceMatrix.needsUpdate = true;
  }, [instancesData]);

  const frondTexture = useMemo(() => createPalmFrondTexture(), []);

  return (
    <group name="InstancedCoconutPalmGroves" data-testid="instanced-coconut-palm-groves">
      <instancedMesh
        ref={trunksRef}
        args={[undefined, undefined, count]}
        data-testid="instanced-coconut-palms"
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.7, 1.1, 1, 8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.92} />
      </instancedMesh>

      <instancedMesh
        ref={crownsRef}
        args={[undefined, undefined, count]}
        data-testid="instanced-palm-crowns"
        castShadow
      >
        <coneGeometry args={[1.8, 1.2, 8]} />
        <meshStandardMaterial
          map={frondTexture}
          color="#658C28"
          transparent
          alphaTest={0.2}
          side={THREE.DoubleSide}
          roughness={0.65}
        />
      </instancedMesh>
    </group>
  );
};
