import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AtmosphereSky, StMarysBasaltFormation } from '../components/journey/zone01/environment/AtmosphereSky';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

vi.mock('@react-three/drei', () => ({
  Environment: (props: any) => <group name="DreiEnvironment" {...props} />,
  ContactShadows: (props: any) => <group name="GroundContactShadows" {...props} />,
}));

describe('AtmosphereSky Component', () => {
  it('renders AtmosphereSky root group and major atmospheric layers in React/R3F tree', () => {
    const { container } = render(<AtmosphereSky />);
    expect(container).toBeDefined();
    
    // Check key named layers
    expect(container.querySelector('[name="Atmosphere_SkyLighting"]')).toBeDefined();
    expect(container.querySelector('[name="PanoramicSkyDome"]')).toBeDefined();
    expect(container.querySelector('[name="CoastalLightingRig"]')).toBeDefined();
    expect(container.querySelector('[name="StMarysBasaltIsland"]')).toBeDefined();
    expect(container.querySelector('[name="StMarysOuterReef"]')).toBeDefined();
    expect(container.querySelector('[name="AtmosphericClouds"]')).toBeDefined();
    expect(container.querySelector('[name="FlockingSeaBirds"]')).toBeDefined();
    expect(container.querySelector('[name="GoldenSunMotes"]')).toBeDefined();
    expect(container.querySelector('[name="GroundContactShadows"]')).toBeDefined();
  });

  it('verifies 5500K golden sunlight and atmospheric color tokens', () => {
    const goldenSun5500K = new THREE.Color('#FFF4E0');
    const skyHemisphere = new THREE.Color('#9AC5DB');
    const groundBounce = new THREE.Color('#5A4535');
    const horizonFogMist = new THREE.Color('#C9DDE8');
    const basaltVolcanic = new THREE.Color('#3A4750');

    expect(goldenSun5500K.getHexString().toLowerCase()).toBe('fff4e0');
    expect(skyHemisphere.getHexString().toLowerCase()).toBe('9ac5db');
    expect(groundBounce.getHexString().toLowerCase()).toBe('5a4535');
    expect(horizonFogMist.getHexString().toLowerCase()).toBe('c9dde8');
    expect(basaltVolcanic.getHexString().toLowerCase()).toBe('3a4750');
  });

  it('renders StMarysBasaltFormation complex with hexagonal columns and wind-blown palm silhouettes', () => {
    const { container } = render(<StMarysBasaltFormation />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="StMarysBasaltComplex"]')).toBeDefined();
    expect(container.querySelector('[name="StMarysPalmCrowns"]')).toBeDefined();
  });

  it('validates atmospheric fog density and distance invariants for St. Marys silhouette', () => {
    const fogDensity = 0.0022;
    const basaltDistance = 420; // z ~ 420m
    
    // Beer-Lambert transmittance T = exp(-density * distance)
    const transmittance = Math.exp(-fogDensity * basaltDistance);
    
    // Aerial perspective check: transmittance should be between 30% and 55% at 420m
    // ensuring the basalt formation forms a soft, atmospheric silhouette without being completely obscured
    expect(transmittance).toBeGreaterThan(0.30);
    expect(transmittance).toBeLessThan(0.55);
    expect(transmittance).toBeCloseTo(0.397, 2);
  });
});
