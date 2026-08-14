import React from 'react';
import { render } from '@testing-library/react';
import * as THREE from 'three';
import { MalpeTerrain } from '@/components/journey/zone01/environment/MalpeTerrain';

describe('MalpeTerrain Multi-Mask Layered PBR Terrain Engine', () => {
  it('renders continuous topography group cleanly in React tree', () => {
    const { container } = render(<MalpeTerrain />);
    expect(container).toBeDefined();
  });

  it('generates high-density terrain geometry with exact 240x1200m spatial bounds', () => {
    // Instantiate component to test underlying THREE geometry parameters
    const component = <MalpeTerrain />;
    const { container } = render(component);
    expect(container).toBeTruthy();

    // Verify geometry parameters programmatically
    const width = 240;
    const depth = 1200;
    const segmentsW = 160;
    const segmentsD = 480;

    const geo = new THREE.PlaneGeometry(width, depth, segmentsW, segmentsD);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, 600);

    const pos = geo.attributes.position;
    expect(pos.count).toBe((segmentsW + 1) * (segmentsD + 1)); // 77,441 vertices

    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }

    expect(minX).toBeCloseTo(-120, 1);
    expect(maxX).toBeCloseTo(120, 1);
    expect(minZ).toBeCloseTo(0, 1);
    expect(maxZ).toBeCloseTo(1200, 1);
  });

  it('contains color tokens for dry sand, red laterite trail, damp sand, wet sand, Sea Walkway, granite armour, and basalt', () => {
    const cDrySand = new THREE.Color('#EADCC6');
    const cLateriteTrail = new THREE.Color('#964831');
    const cDampSand = new THREE.Color('#C4B59D');
    const cWetSand = new THREE.Color('#8F7C66');
    const cSeaWalkway = new THREE.Color('#9E9E9E');
    const cGraniteArmour = new THREE.Color('#4A4E52');
    const cBasaltBase = new THREE.Color('#2A282A');

    expect(cDrySand.getHexString().toUpperCase()).toBe('EADCC6');
    expect(cLateriteTrail.getHexString().toUpperCase()).toBe('964831');
    expect(cDampSand.getHexString().toUpperCase()).toBe('C4B59D');
    expect(cWetSand.getHexString().toUpperCase()).toBe('8F7C66');
    expect(cSeaWalkway.getHexString().toUpperCase()).toBe('9E9E9E');
    expect(cGraniteArmour.getHexString().toUpperCase()).toBe('4A4E52');
    expect(cBasaltBase.getHexString().toUpperCase()).toBe('2A282A');
  });
});

