import * as THREE from 'three';

export type ProgressiveTier = 1 | 2 | 3 | 4;

export interface TierConfig {
  tier: ProgressiveTier;
  maxDistance: number;
  label: string;
  description: string;
  shadowsEnabled: boolean;
  textureScale: number;
  lodLevel: number;
  fogBlending: boolean;
}

export const PROGRESSIVE_TIERS: Record<ProgressiveTier, TierConfig> = {
  1: {
    tier: 1,
    maxDistance: 10,
    label: 'Hero (0-10m)',
    description: 'Maximum fidelity: full PBR, high-detail geometry, interactive hotspots, max shadows',
    shadowsEnabled: true,
    textureScale: 1.0,
    lodLevel: 0,
    fogBlending: false,
  },
  2: {
    tier: 2,
    maxDistance: 40,
    label: 'Environment (10-40m)',
    description: 'Detailed environment: standard PBR, full geometry, instanced flora/craft',
    shadowsEnabled: true,
    textureScale: 0.75,
    lodLevel: 1,
    fogBlending: false,
  },
  3: {
    tier: 3,
    maxDistance: 100,
    label: 'Simplified (40-100m)',
    description: 'Low-poly/instanced: simplified geometry, GPU instancing, disabled shadow casting',
    shadowsEnabled: false,
    textureScale: 0.5,
    lodLevel: 2,
    fogBlending: true,
  },
  4: {
    tier: 4,
    maxDistance: Infinity,
    label: 'Horizon (100m+)',
    description: 'Silhouettes + atmospheric haze: low-poly silhouettes, fog blending, sub-pixel culling',
    shadowsEnabled: false,
    textureScale: 0.25,
    lodLevel: 3,
    fogBlending: true,
  },
};

/**
 * Calculates the 4-tier progressive delivery streaming level based on distance from camera
 * @param distance Distance in meters from the camera
 * @returns ProgressiveTier (1, 2, 3, or 4)
 */
export function calculateProgressiveTier(distance: number): ProgressiveTier {
  if (distance < 10) return 1;
  if (distance < 40) return 2;
  if (distance < 100) return 3;
  return 4;
}

/**
 * Calculates progressive delivery tier given object position and camera position vectors
 */
export function getVectorProgressiveTier(
  objectPos: THREE.Vector3 | [number, number, number],
  cameraPos: THREE.Vector3 | [number, number, number]
): ProgressiveTier {
  const objVec = objectPos instanceof THREE.Vector3 
    ? objectPos 
    : new THREE.Vector3(objectPos[0], objectPos[1], objectPos[2]);
  const camVec = cameraPos instanceof THREE.Vector3 
    ? cameraPos 
    : new THREE.Vector3(cameraPos[0], cameraPos[1], cameraPos[2]);
  
  const dist = objVec.distanceTo(camVec);
  return calculateProgressiveTier(dist);
}

/**
 * Calculates progressive delivery tier for landmark nodes based on spline z-position and camera z-position
 */
export function getZDistanceProgressiveTier(objectZ: number, cameraZ: number): ProgressiveTier {
  const dist = Math.abs(objectZ - cameraZ);
  return calculateProgressiveTier(dist);
}

/**
 * Evaluates streaming settings for a given tier
 */
export function getTierConfig(tier: ProgressiveTier): TierConfig {
  return PROGRESSIVE_TIERS[tier];
}
