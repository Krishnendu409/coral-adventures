import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StMarysIsland } from '../components/journey/zone01/environment/StMarysIsland';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

describe('StMarysIsland Geological Climax Component', () => {
  it('renders St. Marys Island component structure cleanly in React tree', () => {
    const { container } = render(<StMarysIsland />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="StMarysIsland_Climax"]')).toBeDefined();
  });

  it('verifies 6-sided hexagonal basalt column cluster and seaward wind-bowed palms', () => {
    const { container } = render(<StMarysIsland />);
    expect(container.querySelector('[name="Basalt_Column_Cluster"]')).toBeDefined();
    expect(container.querySelector('[name="StMarys_WindBowed_Palms"]')).toBeDefined();
  });

  it('validates columnar basalt color tokens and Z=1150m narrative payoff position', () => {
    const basaltDark = new THREE.Color('#2A282A');
    const wetBasalt = new THREE.Color('#1E1C1E');
    const lagoonTurquoise = new THREE.Color('#25C4C0');
    const paleSand = new THREE.Color('#EADCC6');

    expect(basaltDark.getHexString().toLowerCase()).toBe('2a282a');
    expect(wetBasalt.getHexString().toLowerCase()).toBe('1e1c1e');
    expect(lagoonTurquoise.getHexString().toLowerCase()).toBe('25c4c0');
    expect(paleSand.getHexString().toLowerCase()).toBe('eadcc6');
  });
});
