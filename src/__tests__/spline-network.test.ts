import * as THREE from 'three';
import { describe, it, expect } from 'vitest';
import { LANDMARK_NODES, createCameraSpline, getInterpolatedCameraState } from '../lib/three/splineNetwork';
import { WORLD_ANCHORS } from '../lib/three/worldCoordinates';

describe('Stateful 12-Beat Camera Expedition Route & Spline Network', () => {
  it('defines 12 stateful landmark nodes in strict spline progress order spanning z=0m to z=1150m', () => {
    expect(LANDMARK_NODES).toHaveLength(12);
    expect(LANDMARK_NODES[0].id).toBe('road-entrance');
    expect(LANDMARK_NODES[11].id).toBe('st-marys-basalt');
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

    // 06. Watersports Zone
    expect(LANDMARK_NODES[6].id).toBe('watersports-zone');
    expect(LANDMARK_NODES[6].position.z).toBe(WORLD_ANCHORS.WATERSPORTS_ZONE.z);
    expect(LANDMARK_NODES[6].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[6].fov).toBe(54);
    expect(LANDMARK_NODES[6].lookAt.z).toBe(350);

    // 07. Sea Walkway
    expect(LANDMARK_NODES[7].id).toBe('sea-walkway');
    expect(LANDMARK_NODES[7].position.z).toBe(WORLD_ANCHORS.SEA_WALKWAY.z);
    expect(LANDMARK_NODES[7].cameraHeight).toBe(1.8);
    expect(LANDMARK_NODES[7].fov).toBe(55);
    expect(LANDMARK_NODES[7].lookAt.z).toBe(450);

    // 08. Boarding Jetty
    expect(LANDMARK_NODES[8].id).toBe('boarding-jetty');
    expect(LANDMARK_NODES[8].position.z).toBe(WORLD_ANCHORS.BOARDING_JETTY.z);
    expect(LANDMARK_NODES[8].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[8].fov).toBe(54);
    expect(LANDMARK_NODES[8].lookAt.z).toBe(550);

    // 09. Catamaran Expedition
    expect(LANDMARK_NODES[9].id).toBe('catamaran-expedition');
    expect(LANDMARK_NODES[9].position.z).toBe(WORLD_ANCHORS.CATAMARAN_EXPEDITION.z);
    expect(LANDMARK_NODES[9].cameraHeight).toBe(2.2);
    expect(LANDMARK_NODES[9].fov).toBe(58);
    expect(LANDMARK_NODES[9].lookAt.z).toBe(950);

    // 10. Open Arabian Sea
    expect(LANDMARK_NODES[10].id).toBe('open-sea');
    expect(LANDMARK_NODES[10].position.z).toBe(WORLD_ANCHORS.OPEN_SEA.z);
    expect(LANDMARK_NODES[10].cameraHeight).toBe(2.0);
    expect(LANDMARK_NODES[10].fov).toBe(56);
    expect(LANDMARK_NODES[10].lookAt.z).toBe(1150);

    // 11. St. Mary's Basalt
    expect(LANDMARK_NODES[11].id).toBe('st-marys-basalt');
    expect(LANDMARK_NODES[11].position.z).toBe(WORLD_ANCHORS.ST_MARYS_BASALT.z);
    expect(LANDMARK_NODES[11].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[11].fov).toBe(52);
    expect(LANDMARK_NODES[11].lookAt.z).toBe(1180);
  });

  it('generates spline and interpolates smooth camera state, FOV, and eye height transitions', () => {
    const spline = createCameraSpline(LANDMARK_NODES);
    expect(spline).toBeInstanceOf(THREE.CatmullRomCurve3);

    // Node 0: Approach Road
    const state0 = getInterpolatedCameraState(spline, 0.0, LANDMARK_NODES);
    expect(state0.position).toBeInstanceOf(THREE.Vector3);
    expect(state0.currentLandmark?.id).toBe('road-entrance');
    expect(state0.fov).toBe(50);
    expect(state0.cameraHeight).toBe(1.7);

    // Node 9: Catamaran Expedition (progress 700/1150, cameraHeight 2.2, FOV 58)
    const progressCat = 700 / 1150;
    const stateCat = getInterpolatedCameraState(spline, progressCat, LANDMARK_NODES);
    expect(stateCat.currentLandmark?.id).toBe('catamaran-expedition');
    expect(stateCat.fov).toBe(58);
    expect(stateCat.cameraHeight).toBe(2.2);

    // Final Node 11: St. Mary's Basalt
    const state11 = getInterpolatedCameraState(spline, 1.0, LANDMARK_NODES);
    expect(state11.position).toBeInstanceOf(THREE.Vector3);
    expect(state11.currentLandmark?.id).toBe('st-marys-basalt');
    expect(state11.nextLandmark).toBeNull();
    expect(state11.fov).toBe(52);
    expect(state11.cameraHeight).toBe(1.7);
  });

  it('defines valid allowable look ranges and discovery hotspots for all 12 landmark nodes', () => {
    LANDMARK_NODES.forEach((landmark) => {
      expect(landmark.allowableLookRange).toBeDefined();
      expect(landmark.allowableLookRange.minYaw).toBeLessThan(landmark.allowableLookRange.maxYaw);
      expect(landmark.allowableLookRange.minPitch).toBeLessThan(landmark.allowableLookRange.maxPitch);
      expect(landmark.discoveries.length).toBeGreaterThan(0);
    });
  });
});
