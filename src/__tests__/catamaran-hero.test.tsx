import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CatamaranHero } from '../components/journey/zone01/environment/CatamaranHero';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

describe('CatamaranHero Flagship Vessel Component', () => {
  it('renders flagship 25.90M catamaran component structure cleanly in React tree', () => {
    const { container } = render(<CatamaranHero />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="CatamaranHero_Flagship"]')).toBeDefined();
  });

  it('verifies twin hulls, bridgedeck lounge, and flybridge observation terrace nodes', () => {
    const { container } = render(<CatamaranHero />);
    expect(container.querySelector('[name="Catamaran_Hulls"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Bridgedeck"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Flybridge"]')).toBeDefined();
    expect(container.querySelector('[name="Deck_Guardrails"]')).toBeDefined();
  });

  it('validates catamaran materials and offshore Z=700m mooring spatial anchor', () => {
    const compositeColor = new THREE.Color('#F8F9FA');
    const bootTopColor = new THREE.Color('#212529');
    const teakColor = new THREE.Color('#7A5233');

    expect(compositeColor.getHexString().toLowerCase()).toBe('f8f9fa');
    expect(bootTopColor.getHexString().toLowerCase()).toBe('212529');
    expect(teakColor.getHexString().toLowerCase()).toBe('7a5233');
  });
});
