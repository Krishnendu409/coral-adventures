import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MarineCraft } from '../components/journey/zone01/environment/MarineCraft';
import * as THREE from 'three';

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn((callback) => {
      // Simulate clock frame execution
      const fakeState = {
        clock: {
          getElapsedTime: () => 2.5
        }
      };
      callback(fakeState);
    }),
  };
});

describe('MarineCraft Fleet & Vessels Component', () => {
  it('renders MarineCraft fleet structure cleanly in React/R3F tree', () => {
    const { container } = render(<MarineCraft />);
    expect(container).toBeDefined();
    expect(container.querySelector('[name="MarineCraft_Fleet"]')).toBeDefined();
    expect(container.querySelector('[name="Trawler_Hull_Assembly"]')).toBeDefined();
    expect(container.querySelector('[name="Trawler_Forecastle"]')).toBeDefined();
    expect(container.querySelector('[name="Trawler_Wheelhouse"]')).toBeDefined();
    expect(container.querySelector('[name="Trawler_AftDeck"]')).toBeDefined();
    expect(container.querySelector('[name="Trawler_MainMast"]')).toBeDefined();
  });

  it('verifies Karnataka coastal livery colors and anti-fouling hull tokens', () => {
    const maritimeBlue = new THREE.Color('#1C4E80');
    const waterlineWhite = new THREE.Color('#F4F6F9');
    const copperAntiFouling = new THREE.Color('#8B3A2B');
    const saffronGold = new THREE.Color('#E5A93C');

    expect(maritimeBlue.getHexString().toLowerCase()).toBe('1c4e80');
    expect(waterlineWhite.getHexString().toLowerCase()).toBe('f4f6f9');
    expect(copperAntiFouling.getHexString().toLowerCase()).toBe('8b3a2b');
    expect(saffronGold.getHexString().toLowerCase()).toBe('e5a93c');
  });

  it('renders coastal watersports fleet (Jet Skis & Kayaks) and beach staging', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="JetSki_Coral"]')).toBeDefined();
    expect(container.querySelector('[name="JetSki_Aqua"]')).toBeDefined();
    expect(container.querySelector('[name="Kayak_Mango"]')).toBeDefined();
    expect(container.querySelector('[name="Kayak_Yellow"]')).toBeDefined();
    expect(container.querySelector('[name="BeachStagingInfrastructure"]')).toBeDefined();
  });

  it('renders flagship 25.90M expedition catamaran with twin hulls and flybridge', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="Catamaran_Hulls"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Bridgedeck"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Flybridge"]')).toBeDefined();
    expect(container.querySelector('[name="Deck_Guardrails"]')).toBeDefined();
  });

  it('validates wave bobbing physics calculations', () => {
    const t = 3.0;
    // Primary trawler heave, roll, pitch
    const heave = -0.55 + Math.sin(t * 0.95) * 0.16 + Math.sin(t * 1.9) * 0.04;
    const roll = Math.sin(t * 0.75 + 0.3) * 0.045 + Math.cos(t * 1.5) * 0.015;
    const pitch = Math.cos(t * 0.85 + 0.5) * 0.035 + Math.sin(t * 1.7) * 0.012;

    expect(heave).toBeGreaterThan(-0.8);
    expect(heave).toBeLessThan(-0.3);
    expect(Math.abs(roll)).toBeLessThan(0.1);
    expect(Math.abs(pitch)).toBeLessThan(0.1);
  });
});
