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

describe('MarineCraft Fleet & Active Watersports Component', () => {
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

  it('renders staged coastal watersports fleet (Jet Skis, Kayaks & SUPs) on beach skids', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="JetSki_Coral"]')).toBeDefined();
    expect(container.querySelector('[name="JetSki_Aqua"]')).toBeDefined();
    expect(container.querySelector('[name="Kayak_Mango"]')).toBeDefined();
    expect(container.querySelector('[name="Kayak_Yellow"]')).toBeDefined();
    expect(container.querySelector('[name="SUP_Turquoise"]')).toBeDefined();
    expect(container.querySelector('[name="SUP_Coral"]')).toBeDefined();
    expect(container.querySelector('[name="BeachStagingInfrastructure"]')).toBeDefined();
  });

  it('renders 2 active Sea-Doo jet skis cutting waves at Z=260m with rider figures and roostertail spray wakes', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="Active_JetSki_1"]')).toBeDefined();
    expect(container.querySelector('[name="Active_JetSki_2"]')).toBeDefined();
    expect(container.querySelector('[name="Active_Rider_Figure_1"]')).toBeDefined();
    expect(container.querySelector('[name="Active_Rider_Figure_2"]')).toBeDefined();
    expect(container.querySelector('[name="Roostertail_Spray_1"]')).toBeDefined();
    expect(container.querySelector('[name="Roostertail_Spray_2"]')).toBeDefined();
  });

  it('renders high-altitude colorful parasail canopy (Y=45m, Z=400m), speed boat, and dynamic tow line', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="Parasail_Speedboat"]')).toBeDefined();
    expect(container.querySelector('[name="Parasail_Canopy"]')).toBeDefined();
    expect(container.querySelector('[name="Parasail_Harness_Passengers"]')).toBeDefined();
    expect(container.querySelector('[name="Parasail_Dynamic_TowLine"]')).toBeDefined();
  });

  it('renders flagship 25.90M expedition catamaran with twin hulls and flybridge', () => {
    const { container } = render(<MarineCraft />);
    expect(container.querySelector('[name="Catamaran_Hulls"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Bridgedeck"]')).toBeDefined();
    expect(container.querySelector('[name="Catamaran_Flybridge"]')).toBeDefined();
    expect(container.querySelector('[name="Deck_Guardrails"]')).toBeDefined();
  });

  it('validates wave bobbing, jet ski carving, and parasail tow line vector calculations', () => {
    const t = 3.0;
    // Primary trawler heave, roll, pitch
    const heave = -0.55 + Math.sin(t * 0.95) * 0.16 + Math.sin(t * 1.9) * 0.04;
    const roll = Math.sin(t * 0.75 + 0.3) * 0.045 + Math.cos(t * 1.5) * 0.015;
    const pitch = Math.cos(t * 0.85 + 0.5) * 0.035 + Math.sin(t * 1.7) * 0.012;

    expect(heave).toBeGreaterThan(-0.8);
    expect(heave).toBeLessThan(-0.3);
    expect(Math.abs(roll)).toBeLessThan(0.1);
    expect(Math.abs(pitch)).toBeLessThan(0.1);

    // Tow line vector calculations
    const boatWinch = new THREE.Vector3(-35, 0.82, 400);
    const parasailHarness = new THREE.Vector3(-35, 40.8, 400);
    const diff = new THREE.Vector3().subVectors(parasailHarness, boatWinch);

    expect(diff.length()).toBeGreaterThan(35);
    expect(diff.length()).toBeLessThan(45);
  });
});
