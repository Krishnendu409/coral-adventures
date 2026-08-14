import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PavilionArchitecture } from '../components/journey/zone01/environment/PavilionArchitecture';
import { 
  createTeakWoodTexture, 
  createWoodTexture, 
  createLinenCanopyTexture, 
  createCanvasTexture, 
  createExpeditionMapTexture 
} from '../lib/three/textureGenerator';

describe('PavilionArchitecture Component', () => {
  it('instantiates all architectural procedural textures correctly with aliases', () => {
    const teak = createTeakWoodTexture();
    expect(teak.map).toBeDefined();
    expect(teak.normalMap).toBeDefined();
    expect(teak.roughnessMap).toBeDefined();

    const woodAlias = createWoodTexture();
    expect(woodAlias.map).toBeDefined();

    const linen = createLinenCanopyTexture();
    expect(linen).toBeDefined();

    const canvasAlias = createCanvasTexture();
    expect(canvasAlias).toBeDefined();

    const map = createExpeditionMapTexture();
    expect(map).toBeDefined();
  });

  it('renders PavilionArchitecture structure cleanly in R3F/React tree', () => {
    const { container } = render(<PavilionArchitecture />);
    expect(container).toBeDefined();
  });
});
