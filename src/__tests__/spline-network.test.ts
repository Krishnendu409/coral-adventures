import * as THREE from 'three';
import { describe, it, expect } from 'vitest';
import { LANDMARK_NODES, createCameraSpline, getInterpolatedCameraState } from '../lib/three/splineNetwork';
import { WORLD_ANCHORS } from '../lib/three/worldCoordinates';

describe('Spline Network', () => {
  it('defines 6 stateful landmark nodes in strict spline progress order', () => {
    expect(LANDMARK_NODES).toHaveLength(6);
    for (let i = 0; i < LANDMARK_NODES.length - 1; i++) {
      expect(LANDMARK_NODES[i].splineProgress).toBeLessThan(LANDMARK_NODES[i + 1].splineProgress);
    }
  });

  it('landmarks match WORLD_ANCHORS positions and define explicit camera FOV and target vectors', () => {
    // 00. Approach Road
    expect(LANDMARK_NODES[0].id).toBe('road-entrance');
    expect(LANDMARK_NODES[0].position.z).toBe(WORLD_ANCHORS.ROAD_ENTRANCE.z);
    expect(LANDMARK_NODES[0].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[0].fov).toBe(50);
    expect(LANDMARK_NODES[0].lookAt.z).toBe(25);
    expect(LANDMARK_NODES[0].audioZone).toBe('road');

    // 01. Expedition Portal
    expect(LANDMARK_NODES[1].id).toBe('coral-portal');
    expect(LANDMARK_NODES[1].position.z).toBe(WORLD_ANCHORS.CORAL_PORTAL.z);
    expect(LANDMARK_NODES[1].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[1].fov).toBe(52);
    expect(LANDMARK_NODES[1].lookAt.z).toBe(75);

    // 02. Arrival Gardens
    expect(LANDMARK_NODES[2].id).toBe('garden-path');
    expect(LANDMARK_NODES[2].position.z).toBe(WORLD_ANCHORS.GARDEN_PATH.z);
    expect(LANDMARK_NODES[2].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[2].fov).toBe(52);
    expect(LANDMARK_NODES[2].lookAt.z).toBe(90);

    // 03. Welcome Pavilion
    expect(LANDMARK_NODES[3].id).toBe('pavilion-center');
    expect(LANDMARK_NODES[3].position.z).toBe(WORLD_ANCHORS.PAVILION_CENTER.z);
    expect(LANDMARK_NODES[3].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[3].fov).toBe(54);
    expect(LANDMARK_NODES[3].lookAt.z).toBe(115);

    // 04. Exploration Deck
    expect(LANDMARK_NODES[4].id).toBe('exploration-deck');
    expect(LANDMARK_NODES[4].position.z).toBe(WORLD_ANCHORS.EXPLORATION_DECK.z);
    expect(LANDMARK_NODES[4].cameraHeight).toBe(2.1);
    expect(LANDMARK_NODES[4].fov).toBe(56);
    expect(LANDMARK_NODES[4].lookAt.z).toBe(260);

    // 05. Living Beach & Shoreline
    expect(LANDMARK_NODES[5].id).toBe('beach-shoreline');
    expect(LANDMARK_NODES[5].position.z).toBe(WORLD_ANCHORS.BEACH_SHORELINE.z);
    expect(LANDMARK_NODES[5].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[5].fov).toBe(52);
    expect(LANDMARK_NODES[5].lookAt.z).toBe(320);
  });

  it('generates spline and interpolates smooth camera state, FOV, and eye height', () => {
    const spline = createCameraSpline(LANDMARK_NODES);
    expect(spline).toBeInstanceOf(THREE.CatmullRomCurve3);

    // Node 0: Approach Road
    const state0 = getInterpolatedCameraState(spline, 0.0, LANDMARK_NODES);
    expect(state0.position).toBeInstanceOf(THREE.Vector3);
    expect(state0.currentLandmark?.id).toBe('road-entrance');
    expect(state0.fov).toBe(50);
    expect(state0.cameraHeight).toBe(1.7);

    // Midpoint between Welcome Pavilion (0.6, FOV 54, height 1.7) and Exploration Deck (0.8, FOV 56, height 2.1)
    const stateMid = getInterpolatedCameraState(spline, 0.7, LANDMARK_NODES);
    expect(stateMid.fov).toBeCloseTo(55, 1);
    expect(stateMid.cameraHeight).toBeCloseTo(1.9, 1);

    // Node 5: Beach Shoreline
    const state1 = getInterpolatedCameraState(spline, 1.0, LANDMARK_NODES);
    expect(state1.position).toBeInstanceOf(THREE.Vector3);
    expect(state1.currentLandmark?.id).toBe('beach-shoreline');
    expect(state1.nextLandmark).toBeNull();
    expect(state1.fov).toBe(52);
    expect(state1.cameraHeight).toBe(1.7);
  });

  it('defines valid allowable look ranges and discovery hotspots for all landmark nodes', () => {
    LANDMARK_NODES.forEach((landmark) => {
      expect(landmark.allowableLookRange).toBeDefined();
      expect(landmark.allowableLookRange.minYaw).toBeLessThan(landmark.allowableLookRange.maxYaw);
      expect(landmark.allowableLookRange.minPitch).toBeLessThan(landmark.allowableLookRange.maxPitch);
      expect(landmark.discoveries.length).toBeGreaterThan(0);
    });
  });
});
