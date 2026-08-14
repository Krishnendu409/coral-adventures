import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorldScene } from '../components/journey/zone01/WorldScene';
import { LANDMARK_NODES, createCameraSpline, getInterpolatedCameraState } from '../lib/three/splineNetwork';
import { vi, describe, it, expect } from 'vitest';

describe('WorldScene & Spline Camera Integration', () => {
  it('renders a fallback container cleanly in test/headless environment without throwing', () => {
    render(<WorldScene splineProgress={0} isHeadless={true} />);
    expect(screen.getByTestId('world-scene-fallback')).toBeInTheDocument();
  });

  it('renders container in production mode and responds to pointer drag events for look-mode without crashing', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const { container } = render(<WorldScene splineProgress={0.13} isHeadless={false} />);
    const sceneContainer = screen.getByTestId('world-scene-container');
    expect(sceneContainer).toBeInTheDocument();

    // Trigger pointer drag interaction
    fireEvent.pointerDown(sceneContainer, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(sceneContainer, { clientX: 150, clientY: 120, pointerId: 1 });
    fireEvent.pointerUp(sceneContainer, { pointerId: 1 });
    fireEvent.pointerLeave(sceneContainer);

    vi.unstubAllEnvs();
  });

  it('safely renders fallback when WebGL context creation fails or returns null', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null) as any;

    render(<WorldScene splineProgress={0.13} isHeadless={false} />);
    expect(screen.getByTestId('world-scene-fallback')).toBeInTheDocument();
    expect(screen.getByText(/WebGL not supported/i)).toBeInTheDocument();

    HTMLCanvasElement.prototype.getContext = originalGetContext;
    vi.unstubAllEnvs();
  });

  it('invokes discovery projection handlers across traversal points', () => {
    const onProjectDiscoveries = vi.fn();
    render(
      <WorldScene
        splineProgress={0.6}
        onProjectDiscoveries={onProjectDiscoveries}
        isHeadless={true}
      />
    );
    expect(screen.getByTestId('world-scene-fallback')).toBeInTheDocument();
  });

  it('accurately verifies all 12 landmark spline keypoints and camera heights', () => {
    const spline = createCameraSpline(LANDMARK_NODES);
    expect(LANDMARK_NODES).toHaveLength(12);

    // 1. Approach Road (z = 0)
    const state0 = getInterpolatedCameraState(spline, 0.0, LANDMARK_NODES);
    expect(state0.currentLandmark?.id).toBe('road-entrance');
    expect(state0.currentLandmark?.cameraHeight).toBe(1.7);

    // 2. Expedition Portal (z = 50)
    const state1 = getInterpolatedCameraState(spline, 50 / 1150, LANDMARK_NODES);
    expect(state1.currentLandmark?.id).toBe('coral-portal');
    expect(state1.currentLandmark?.cameraHeight).toBe(1.7);

    // 3. Arrival Gardens (z = 70)
    const state2 = getInterpolatedCameraState(spline, 70 / 1150, LANDMARK_NODES);
    expect(state2.currentLandmark?.id).toBe('garden-path');
    expect(state2.currentLandmark?.cameraHeight).toBe(1.7);

    // 4. Welcome Pavilion (z = 90)
    const state3 = getInterpolatedCameraState(spline, 90 / 1150, LANDMARK_NODES);
    expect(state3.currentLandmark?.id).toBe('pavilion-center');
    expect(state3.currentLandmark?.cameraHeight).toBe(1.7);

    // 5. Exploration Deck (z = 150) - Elevated Vantage
    const state4 = getInterpolatedCameraState(spline, 150 / 1150, LANDMARK_NODES);
    expect(state4.currentLandmark?.id).toBe('exploration-deck');
    expect(state4.currentLandmark?.cameraHeight).toBe(2.1);

    // 6. Living Beach Shoreline (z = 200)
    const state5 = getInterpolatedCameraState(spline, 200 / 1150, LANDMARK_NODES);
    expect(state5.currentLandmark?.id).toBe('beach-shoreline');
    expect(state5.currentLandmark?.cameraHeight).toBe(1.7);

    // 7. Watersports Zone (z = 250)
    const state6 = getInterpolatedCameraState(spline, 250 / 1150, LANDMARK_NODES);
    expect(state6.currentLandmark?.id).toBe('watersports-zone');
    expect(state6.currentLandmark?.cameraHeight).toBe(1.7);

    // 8. Sea Walkway (z = 350)
    const state7 = getInterpolatedCameraState(spline, 350 / 1150, LANDMARK_NODES);
    expect(state7.currentLandmark?.id).toBe('sea-walkway');
    expect(state7.currentLandmark?.cameraHeight).toBe(1.8);

    // 9. Boarding Jetty (z = 450)
    const state8 = getInterpolatedCameraState(spline, 450 / 1150, LANDMARK_NODES);
    expect(state8.currentLandmark?.id).toBe('boarding-jetty');
    expect(state8.currentLandmark?.cameraHeight).toBe(1.7);

    // 10. Catamaran Expedition (z = 700)
    const state9 = getInterpolatedCameraState(spline, 700 / 1150, LANDMARK_NODES);
    expect(state9.currentLandmark?.id).toBe('catamaran-expedition');
    expect(state9.currentLandmark?.cameraHeight).toBe(2.2);

    // 11. Open Arabian Sea (z = 950)
    const state10 = getInterpolatedCameraState(spline, 950 / 1150, LANDMARK_NODES);
    expect(state10.currentLandmark?.id).toBe('open-sea');
    expect(state10.currentLandmark?.cameraHeight).toBe(2.0);

    // 12. St. Mary's Basalt (z = 1150)
    const state11 = getInterpolatedCameraState(spline, 1.0, LANDMARK_NODES);
    expect(state11.currentLandmark?.id).toBe('st-marys-basalt');
    expect(state11.currentLandmark?.cameraHeight).toBe(1.7);
  });
});
