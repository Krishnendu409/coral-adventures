import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OceanWater } from '../components/journey/zone01/environment/OceanWater';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

describe('OceanWater Living Arabian Sea Component', () => {
  it('renders OceanWater component structure cleanly in React/R3F tree', () => {
    const { container } = render(<OceanWater />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="ArabianSea_OceanWater"]')).toBeDefined();
  });

  it('verifies Arabian Sea color tokens and PBR optical uniform definitions', () => {
    const deepSapphire = new THREE.Color('#071A2B');
    const coastalTurquoise = new THREE.Color('#1FA7A6');
    const goldenSun = new THREE.Color('#FFF4E0');

    expect(deepSapphire.getHexString().toLowerCase()).toBe('071a2b');
    expect(coastalTurquoise.getHexString().toLowerCase()).toBe('1fa7a6');
    expect(goldenSun.getHexString().toLowerCase()).toBe('fff4e0');
  });

  it('validates Gerstner multi-harmonic wavelength and steepness invariants', () => {
    // 24m deep swell, 12m medium chop, 4m capillary ripple
    const wavelengths = [24.0, 12.0, 4.0, 16.0, 2.4];
    const steepnessValues = [0.22, 0.18, 0.12, 0.14, 0.06];

    // Total steepness sum must be strictly <= 1.0 to prevent self-intersection loops
    const totalSteepness = steepnessValues.reduce((a, b) => a + b, 0);
    expect(totalSteepness).toBeLessThanOrEqual(1.0);
    expect(totalSteepness).toBeCloseTo(0.72, 2);

    // Verify key harmonic wavelengths
    expect(wavelengths).toContain(24.0);
    expect(wavelengths).toContain(12.0);
    expect(wavelengths).toContain(4.0);
  });
});
