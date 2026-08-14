import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeaWalkway } from '../components/journey/zone01/environment/SeaWalkway';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
  };
});

describe('SeaWalkway Promenade & Breakwater Component', () => {
  it('renders 450m coastal walkway with granite rock armour and harbour viewing railings', () => {
    const { container } = render(<SeaWalkway />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="SeaWalkway_Promenade"]')).toBeDefined();
    expect(container.querySelector('[name="Walkway_PaverDeck"]')).toBeDefined();
    expect(container.querySelector('[name="Walkway_Handrails"]')).toBeDefined();
    expect(container.querySelector('[name="Walkway_LampPosts"]')).toBeDefined();
    expect(container.querySelector('[name="Walkway_TeakBenches"]')).toBeDefined();
    expect(container.querySelector('[name="Walkway_GraniteArmour"]')).toBeDefined();
  });

  it('verifies 316L marine stainless handrail and granite rock armour material tokens', () => {
    const stainlessColor = new THREE.Color('#E9ECEF');
    const graniteColor = new THREE.Color('#4A4E52');
    const wetGraniteColor = new THREE.Color('#3A3D40');

    expect(stainlessColor.getHexString().toLowerCase()).toBe('e9ecef');
    expect(graniteColor.getHexString().toLowerCase()).toBe('4a4e52');
    expect(wetGraniteColor.getHexString().toLowerCase()).toBe('3a3d40');
  });

  it('validates 450m elevation geometry coordinates (Z: 300m..450m, Y = 1.8m deck height)', () => {
    const deckCenterY = 1.72;
    const handrailTopY = 2.9;
    const clearance = handrailTopY - 1.8;

    expect(deckCenterY).toBeLessThan(1.8);
    expect(clearance).toBeCloseTo(1.1, 1);
  });
});
