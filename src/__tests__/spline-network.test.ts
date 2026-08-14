import * as THREE from 'three';
import { describe, it, expect } from 'vitest';
import { LANDMARK_NODES, createCameraSpline, getInterpolatedCameraState } from '../lib/three/splineNetwork';
import { WORLD_ANCHORS } from '../lib/three/worldCoordinates';

describe('Spline Network', () => {
  it('should have 6 landmarks in order', () => {
    expect(LANDMARK_NODES).toHaveLength(6);
    for (let i = 0; i < LANDMARK_NODES.length - 1; i++) {
      expect(LANDMARK_NODES[i].splineProgress).toBeLessThan(LANDMARK_NODES[i+1].splineProgress);
    }
  });

  it('landmarks match WORLD_ANCHORS', () => {
    expect(LANDMARK_NODES[0].position.x).toBe(WORLD_ANCHORS.ROAD_ENTRANCE.x);
    expect(LANDMARK_NODES[0].position.z).toBe(WORLD_ANCHORS.ROAD_ENTRANCE.z);
    
    expect(LANDMARK_NODES[5].position.x).toBe(WORLD_ANCHORS.BEACH_SHORELINE.x);
    expect(LANDMARK_NODES[5].position.z).toBe(WORLD_ANCHORS.BEACH_SHORELINE.z);
  });

  it('generates spline and interpolates smooth camera state', () => {
    const spline = createCameraSpline(LANDMARK_NODES);
    expect(spline).toBeInstanceOf(THREE.CatmullRomCurve3);
    
    const state0 = getInterpolatedCameraState(spline, 0, LANDMARK_NODES);
    expect(state0.position).toBeInstanceOf(THREE.Vector3);
    expect(state0.currentLandmark?.id).toBe('road-entrance');
    
    const stateHalf = getInterpolatedCameraState(spline, 0.5, LANDMARK_NODES);
    expect(stateHalf.position).toBeInstanceOf(THREE.Vector3);
    expect(stateHalf.currentLandmark).toBeDefined();
    
    const state1 = getInterpolatedCameraState(spline, 1.0, LANDMARK_NODES);
    expect(state1.position).toBeInstanceOf(THREE.Vector3);
    expect(state1.currentLandmark?.id).toBe('beach-shoreline');
    expect(state1.nextLandmark).toBeNull();
  });
});
