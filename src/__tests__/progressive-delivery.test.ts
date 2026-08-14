import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  calculateProgressiveTier,
  getVectorProgressiveTier,
  getZDistanceProgressiveTier,
  getTierConfig,
  PROGRESSIVE_TIERS,
  ProgressiveTier
} from '../lib/three/progressiveDelivery';

describe('4-Tier Progressive Delivery Streaming System', () => {
  it('correctly maps distance thresholds to Tiers 1 through 4', () => {
    // Tier 1 (Hero 0-10m): Maximum fidelity
    expect(calculateProgressiveTier(0)).toBe(1);
    expect(calculateProgressiveTier(5)).toBe(1);
    expect(calculateProgressiveTier(9.9)).toBe(1);

    // Tier 2 (Environment 10-40m): Detailed environment
    expect(calculateProgressiveTier(10)).toBe(2);
    expect(calculateProgressiveTier(25)).toBe(2);
    expect(calculateProgressiveTier(39.9)).toBe(2);

    // Tier 3 (Simplified 40-100m): Low-poly/instanced
    expect(calculateProgressiveTier(40)).toBe(3);
    expect(calculateProgressiveTier(70)).toBe(3);
    expect(calculateProgressiveTier(99.9)).toBe(3);

    // Tier 4 (Horizon 100m+): Silhouettes + atmospheric haze
    expect(calculateProgressiveTier(100)).toBe(4);
    expect(calculateProgressiveTier(250)).toBe(4);
    expect(calculateProgressiveTier(1150)).toBe(4);
  });

  it('calculates vector distance tiers accurately between 3D points', () => {
    const camPos = new THREE.Vector3(0, 1.7, 50);
    
    // Close object (z = 54) -> distance ~ 4m -> Tier 1
    expect(getVectorProgressiveTier(new THREE.Vector3(0, 1.7, 54), camPos)).toBe(1);

    // Mid object (z = 75) -> distance ~ 25m -> Tier 2
    expect(getVectorProgressiveTier(new THREE.Vector3(0, 1.7, 75), camPos)).toBe(2);

    // Far object (z = 120) -> distance ~ 70m -> Tier 3
    expect(getVectorProgressiveTier(new THREE.Vector3(0, 1.7, 120), camPos)).toBe(3);

    // Horizon object (z = 450) -> distance ~ 400m -> Tier 4
    expect(getVectorProgressiveTier(new THREE.Vector3(0, 1.7, 450), camPos)).toBe(4);
  });

  it('calculates z-distance tiers accurately along spline traversal', () => {
    const cameraZ = 200; // Beach shoreline landmark

    expect(getZDistanceProgressiveTier(205, cameraZ)).toBe(1); // 5m diff -> Tier 1
    expect(getZDistanceProgressiveTier(230, cameraZ)).toBe(2); // 30m diff -> Tier 2
    expect(getZDistanceProgressiveTier(280, cameraZ)).toBe(3); // 80m diff -> Tier 3
    expect(getZDistanceProgressiveTier(700, cameraZ)).toBe(4); // 500m diff -> Tier 4
  });

  it('provides comprehensive configuration metrics for each Tier', () => {
    const tier1 = getTierConfig(1);
    expect(tier1.shadowsEnabled).toBe(true);
    expect(tier1.lodLevel).toBe(0);
    expect(tier1.label).toContain('Hero');

    const tier2 = getTierConfig(2);
    expect(tier2.shadowsEnabled).toBe(true);
    expect(tier2.lodLevel).toBe(1);
    expect(tier2.label).toContain('Environment');

    const tier3 = getTierConfig(3);
    expect(tier3.shadowsEnabled).toBe(false);
    expect(tier3.lodLevel).toBe(2);
    expect(tier3.label).toContain('Simplified');

    const tier4 = getTierConfig(4);
    expect(tier4.shadowsEnabled).toBe(false);
    expect(tier4.lodLevel).toBe(3);
    expect(tier4.fogBlending).toBe(true);
    expect(tier4.label).toContain('Horizon');
  });
});
