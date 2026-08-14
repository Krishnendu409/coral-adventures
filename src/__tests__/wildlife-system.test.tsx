import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  WildlifeSystem,
  BRAHMINY_BIRD_COUNT,
  DOLPHIN_COUNT,
  calculateBirdThermalOrbit,
  calculateDolphinLeapPosition,
  calculateFishSchoolPosition,
} from '../components/journey/zone01/environment/WildlifeSystem';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

describe('WildlifeSystem Component', () => {
  it('defines correct population counts for Arabian Sea wildlife', () => {
    expect(BRAHMINY_BIRD_COUNT).toBe(14);
    expect(DOLPHIN_COUNT).toBe(3);
  });

  it('calculates soaring Brahminy sea bird thermal spiral orbits correctly', () => {
    const orbit1 = calculateBirdThermalOrbit(0, 0); // index 0 at t=0
    expect(orbit1.position[1]).toBeGreaterThanOrEqual(18); // Altitude Y >= 18m
    expect(orbit1.position[1]).toBeLessThanOrEqual(42);   // Altitude Y <= 42m
    expect(orbit1.rotation).toBeDefined();

    // Check position changes over time
    const orbit2 = calculateBirdThermalOrbit(0, 10);
    expect(orbit2.position[0]).not.toBe(orbit1.position[0]);
  });

  it('calculates dolphin parabolic leap position near catamaran zone (Z: 650m..750m)', () => {
    const leapAtSeaLevel = calculateDolphinLeapPosition(0, 0); // start of leap
    const leapAtApex = calculateDolphinLeapPosition(0, 1.5);   // apex of leap arc
    const leapReEntry = calculateDolphinLeapPosition(0, 3.0);  // end of leap cycle

    // Z position must be within Z=650m to Z=750m
    expect(leapAtSeaLevel.position[2]).toBeGreaterThanOrEqual(640);
    expect(leapAtSeaLevel.position[2]).toBeLessThanOrEqual(760);

    // Height Y at apex should be well above water level (Y > 1.5m)
    expect(leapAtApex.position[1]).toBeGreaterThan(leapAtSeaLevel.position[1]);
    expect(leapAtApex.position[1]).toBeGreaterThan(1.5);

    // Re-entry position returning down towards water
    expect(leapReEntry.position[1]).toBeLessThan(leapAtApex.position[1]);
  });

  it('calculates shallow fish school positions near intertidal swash (Z: 195m..220m)', () => {
    const fishPos = calculateFishSchoolPosition(0, 0, 0);
    // Submerged Y between -0.4m and -2.0m
    expect(fishPos[1]).toBeLessThan(0);
    expect(fishPos[1]).toBeGreaterThanOrEqual(-2.5);
    // Z within intertidal swash zone Z: 195m to 220m
    expect(fishPos[2]).toBeGreaterThanOrEqual(190);
    expect(fishPos[2]).toBeLessThanOrEqual(225);
  });

  it('renders WildlifeSystem, Brahminy sea birds, leaping dolphins, and fish schools cleanly in React/R3F tree', () => {
    const { container } = render(<WildlifeSystem />);
    expect(container).toBeDefined();

    // Verify root wildlife system group
    const rootGroup = container.querySelector('[name="ArabianSea_WildlifeSystem"]');
    expect(rootGroup).toBeDefined();

    // Verify 14 soaring Brahminy sea birds layer
    const birdsLayer = container.querySelector('[name="BrahminySeaBirdsLayer"]') ||
                       container.querySelector('[data-testid="brahminy-birds-group"]');
    expect(birdsLayer).toBeDefined();

    // Verify 3 leaping dolphins pod layer
    const dolphinsPod = container.querySelector('[name="LeapingDolphinsPod"]') ||
                        container.querySelector('[data-testid="leaping-dolphins-pod"]');
    expect(dolphinsPod).toBeDefined();

    // Verify splash particle rings
    const splashRings = container.querySelector('[data-testid="dolphin-splash-rings"]');
    expect(splashRings).toBeDefined();

    // Verify shallow water fish schools
    const fishSchools = container.querySelector('[name="ShallowWaterFishSchools"]') ||
                        container.querySelector('[data-testid="shallow-fish-schools"]');
    expect(fishSchools).toBeDefined();
  });
});
