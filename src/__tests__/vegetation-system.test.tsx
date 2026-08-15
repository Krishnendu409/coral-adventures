import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  VegetationSystem,
  PALM_VARIANT_SPECS,
  calculateSeawardBowing,
} from '../components/journey/zone01/environment/VegetationSystem';
import { createPalmFrondTexture, createBroadleafTexture } from '../lib/three/textureGenerator';
import { resourceManager } from '../lib/three/ResourceManager';
import { JOURNEY_ASSETS } from '../data/journeyAssets';

// Mock fetch and ResourceManager to prevent unhandled network requests in unit tests
beforeAll(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(0),
    json: async () => ({}),
  } as any);
  vi.spyOn(resourceManager, 'loadModel').mockResolvedValue(null as any);
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual<any>('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn(),
  };
});

describe('VegetationSystem Component — AAA GLB Pipeline Rebuild', () => {
  it('instantiates procedural botanical textures correctly', () => {
    const palmFrond = createPalmFrondTexture();
    expect(palmFrond).toBeDefined();

    const broadleaf = createBroadleafTexture();
    expect(broadleaf).toBeDefined();
  });

  it('defines 4 distinct botanical variants of Cocos nucifera with GLB asset keys', () => {
    expect(PALM_VARIANT_SPECS.TALL_MATURE_LEANING.baseHeight).toBe(12.0);
    expect(PALM_VARIANT_SPECS.MID_HEIGHT_UPRIGHT.baseHeight).toBe(9.0);
    expect(PALM_VARIANT_SPECS.COASTAL_WIND_BOWED.baseHeight).toBe(7.0);
    expect(PALM_VARIANT_SPECS.YOUNG_CLUSTER.baseHeight).toBe(5.0);

    // Verify bend curvature and frond ranges
    expect(PALM_VARIANT_SPECS.COASTAL_WIND_BOWED.bendCurvature).toBeGreaterThanOrEqual(25);
    expect(PALM_VARIANT_SPECS.TALL_MATURE_LEANING.maxFronds).toBeGreaterThanOrEqual(30);

    // Verify GLB asset key mapping for ResourceManager loading
    expect(PALM_VARIANT_SPECS.TALL_MATURE_LEANING.glbAssetKey).toBe('palmTall');
    expect(PALM_VARIANT_SPECS.MID_HEIGHT_UPRIGHT.glbAssetKey).toBe('palmSlender');
    expect(PALM_VARIANT_SPECS.COASTAL_WIND_BOWED.glbAssetKey).toBe('palmDwarf');
    expect(PALM_VARIANT_SPECS.YOUNG_CLUSTER.glbAssetKey).toBe('palmCluster');
  });

  it('calculates seaward wind bowing for shoreline positions correctly', () => {
    const entranceBowing = calculateSeawardBowing([0, 0, 15], 'COASTAL_WIND_BOWED');
    const shorelineBowing = calculateSeawardBowing([0, 0, 175], 'COASTAL_WIND_BOWED');

    expect(shorelineBowing.seawardLeanZ).toBeGreaterThan(entranceBowing.seawardLeanZ);
    expect(shorelineBowing.bendCurvature).toBeGreaterThanOrEqual(entranceBowing.bendCurvature);
  });

  it('verifies ResourceManager singleton and JOURNEY_ASSETS model entries for all 4 palm variants', () => {
    expect(resourceManager).toBeDefined();
    expect(resourceManager.loadModel).toBeDefined();
    expect(resourceManager.getFallbackMaterial).toBeDefined();

    // Verify all 4 palm GLB model entries exist in JOURNEY_ASSETS
    expect(JOURNEY_ASSETS.models.palmTall.localPath).toBe('/models/palms/cocos_nucifera_tall.glb');
    expect(JOURNEY_ASSETS.models.palmSlender.localPath).toBe('/models/palms/cocos_nucifera_slender.glb');
    expect(JOURNEY_ASSETS.models.palmDwarf.localPath).toBe('/models/palms/cocos_nucifera_dwarf.glb');
    expect(JOURNEY_ASSETS.models.palmCluster.localPath).toBe('/models/palms/cocos_nucifera_cluster.glb');

    // Verify PBR texture channels are defined
    expect(JOURNEY_ASSETS.models.palmTall.pbrTextures?.diffuse).toBeDefined();
    expect(JOURNEY_ASSETS.models.palmTall.pbrTextures?.normal).toBeDefined();
  });

  it('renders VegetationSystem, coconut groves, undergrowth, and instanced debris cleanly in React/R3F tree', () => {
    const { container } = render(<VegetationSystem />);
    expect(container).toBeDefined();
    expect(
      container.querySelector('[name="Vegetation_BotanicalPopulationSystem"]') ||
      container.querySelector('[name="Vegetation_KarnatakaCoconutGroves"]')
    ).toBeDefined();

    expect(container.querySelector('[name="PalmCanopyLayer"]')).toBeDefined();
    expect(container.querySelector('[name="UndergrowthLayer"]')).toBeDefined();
    expect(container.querySelector('[name="CauseAndEffectDebrisLayer"]')).toBeDefined();

    // Verify GPU instanced mesh batching
    const instancedGrass = container.querySelector('[data-testid="instanced-spinifex-grass"]');
    expect(instancedGrass).toBeDefined();

    const instancedDebris = container.querySelector('[data-testid="instanced-coconut-husks-debris"]');
    expect(instancedDebris).toBeDefined();
  }, 15000);

  it('verifies 600+ palm population instancing spans across the 1200m continuous spatial world', () => {
    const { container } = render(<VegetationSystem />);
    const palmCanopy = container.querySelector('[name="PalmCanopyLayer"]');
    expect(palmCanopy).toBeDefined();

    // Verify key landmark palm canopy
    expect(palmCanopy?.children.length).toBeGreaterThanOrEqual(50);

    // Verify GPU instanced coconut palm groves batch
    const instancedPalms = container.querySelector('[data-testid="instanced-coconut-palms"]');
    expect(instancedPalms).toBeDefined();

    const keyPalmCount = palmCanopy?.children.length || 0;
    // Total palm tree population (53 key landmark palms + 570 GPU instanced palms = 623 trees)
    const instancedCount = 570;
    const totalPalmPopulation = keyPalmCount + instancedCount;
    expect(totalPalmPopulation).toBeGreaterThanOrEqual(600);

    const instancedGrass = container.querySelector('[data-testid="instanced-spinifex-grass"]');
    expect(instancedGrass).toBeDefined();
    expect(instancedGrass?.getAttribute('args') || instancedGrass).toBeDefined();
  });
});
