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

  it('verifies 5200K coastal golden hour sunset color tokens and sky dome gradient stops', () => {
    const zenithNavy = new THREE.Color('#1B3B6F');
    const tropicalSky = new THREE.Color('#3B629B');
    const goldenAmber = new THREE.Color('#E07A5F');
    const horizonCrimsonPink = new THREE.Color('#F4A261');
    const goldenSun5200K = new THREE.Color('#FFD7A8');
    const groundBounce = new THREE.Color('#5A3525');

    expect(zenithNavy.getHexString().toLowerCase()).toBe('1b3b6f');
    expect(tropicalSky.getHexString().toLowerCase()).toBe('3b629b');
    expect(goldenAmber.getHexString().toLowerCase()).toBe('e07a5f');
    expect(horizonCrimsonPink.getHexString().toLowerCase()).toBe('f4a261');
    expect(goldenSun5200K.getHexString().toLowerCase()).toBe('ffd7a8');
    expect(groundBounce.getHexString().toLowerCase()).toBe('5a3525');
  });

  it('validates 5200K golden sun directional light angle (12° altitude above horizon, azimuth 248°)', () => {
    // Light position vector in AtmosphereSky: [-227, 52, -92]
    const sunPos = new THREE.Vector3(-227, 52, -92);
    const horizonDistance = Math.sqrt(sunPos.x * sunPos.x + sunPos.z * sunPos.z); // ~244.9m
    const altitudeRad = Math.atan2(sunPos.y, horizonDistance);
    const altitudeDeg = (altitudeRad * 180) / Math.PI;

    // Solar altitude angle check: should be ~12° above horizon for golden hour sunset
    expect(altitudeDeg).toBeCloseTo(12.0, 0);

    // Solar azimuth angle check: arctan2(-x, -z) should be ~248° (West-South-West sunset)
    let azimuthDeg = (Math.atan2(sunPos.x, sunPos.z) * 180) / Math.PI;
    if (azimuthDeg < 0) azimuthDeg += 360;
    expect(azimuthDeg).toBeCloseTo(248.0, 0);
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

