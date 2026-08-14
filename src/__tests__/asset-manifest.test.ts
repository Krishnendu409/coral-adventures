import { describe, it, expect } from 'vitest';
import { JOURNEY_ASSETS } from '../data/journeyAssets';
import { assetManifest } from '../data/assetManifest';

describe('Asset Registry & Environment Setup', () => {
  it('contains valid PBR material definitions and texture paths for coastal terrain', () => {
    expect(JOURNEY_ASSETS.textures).toBeDefined();
    
    // Sand PBR
    expect(JOURNEY_ASSETS.textures.sandPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.sandPbr.diffuse).toBeTruthy();
    expect(JOURNEY_ASSETS.textures.sandPbr.normal).toBeTruthy();
    expect(JOURNEY_ASSETS.textures.sandPbr.roughness).toBeTruthy();
    
    // Laterite PBR
    expect(JOURNEY_ASSETS.textures.lateritePbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.lateritePbr.diffuse).toBeTruthy();
    expect(JOURNEY_ASSETS.textures.lateritePbr.normal).toBeTruthy();
    expect(JOURNEY_ASSETS.textures.lateritePbr.roughness).toBeTruthy();
    
    // Teak PBR
    expect(JOURNEY_ASSETS.textures.teakPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.teakPbr.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(JOURNEY_ASSETS.textures.teakPbr.roughness).toBeGreaterThan(0);

    // Basalt PBR
    expect(JOURNEY_ASSETS.textures.basaltPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.basaltPbr.diffuse).toBeTruthy();
    expect(JOURNEY_ASSETS.textures.basaltPbr.normal).toBeTruthy();

    // Sailcloth, Brass, Hemp Rope PBR
    expect(JOURNEY_ASSETS.textures.sailclothPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.brassPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.hempRopePbr).toBeDefined();
  });

  it('defines 4 botanical Cocos nucifera palm variants and native undergrowth', () => {
    expect(JOURNEY_ASSETS.vegetation).toBeDefined();
    expect(JOURNEY_ASSETS.vegetation.palms).toHaveLength(4);
    
    JOURNEY_ASSETS.vegetation.palms.forEach(palm => {
      expect(palm.id).toMatch(/^cocos-nucifera-/);
      expect(palm.name).toBeTruthy();
      expect(palm.heightRange[0]).toBeGreaterThan(0);
      expect(palm.heightRange[1]).toBeGreaterThan(palm.heightRange[0]);
      expect(palm.bendMaxDeg).toBeGreaterThan(0);
    });

    expect(JOURNEY_ASSETS.vegetation.undergrowth.spinifex).toBeTruthy();
    expect(JOURNEY_ASSETS.vegetation.undergrowth.alocasia).toBeTruthy();
    expect(JOURNEY_ASSETS.vegetation.undergrowth.bougainvillea).toBeTruthy();
  });

  it('defines expedition architecture materials and nautical chart table props', () => {
    expect(JOURNEY_ASSETS.architectureProps).toBeDefined();
    expect(JOURNEY_ASSETS.architectureProps.portal.coordinatesText).toContain('13°21′02″ N · 74°42′08″ E');
    expect(JOURNEY_ASSETS.architectureProps.chartTableProps.seaChart).toContain('St. Marys');
    expect(JOURNEY_ASSETS.architectureProps.chartTableProps.dividers).toBeTruthy();
    expect(JOURNEY_ASSETS.architectureProps.chartTableProps.compass).toBeTruthy();
    expect(JOURNEY_ASSETS.architectureProps.chartTableProps.lanternColor).toBeTruthy();
  });

  it('defines Gerstner wave ocean displacement and depth gradient parameters', () => {
    expect(JOURNEY_ASSETS.ocean).toBeDefined();
    expect(JOURNEY_ASSETS.ocean.gerstnerWaves.swellWavelength).toBe(24.0);
    expect(JOURNEY_ASSETS.ocean.gerstnerWaves.chopWavelength).toBe(12.0);
    expect(JOURNEY_ASSETS.ocean.gerstnerWaves.rippleWavelength).toBe(4.0);
    
    expect(JOURNEY_ASSETS.ocean.colors.shallows).toBe('#25C4C0');
    expect(JOURNEY_ASSETS.ocean.colors.midDepth).toBe('#158F93');
    expect(JOURNEY_ASSETS.ocean.colors.deepSapphire).toBe('#071A2B');
    expect(JOURNEY_ASSETS.ocean.colors.foam).toBe('#FFFFFF');
  });

  it('configures 5500K golden sun and HDRI environment lighting map', () => {
    expect(JOURNEY_ASSETS.environment).toBeDefined();
    expect(JOURNEY_ASSETS.environment.hdriMap).toBe('/environments/coastal_golden_hour.hdr');
    expect(JOURNEY_ASSETS.environment.sunColor).toBe('#FFF4E0');
    expect(JOURNEY_ASSETS.environment.colorTemperatureK).toBe(5500);
    expect(JOURNEY_ASSETS.environment.sunIntensity).toBe(2.2);
    expect(JOURNEY_ASSETS.environment.fogColor).toBe('#C9DDE8');
    expect(JOURNEY_ASSETS.environment.fogDensity).toBe(0.0022);
  });

  it('passes ART GATE: strictly 0 torii/Japanese/fantasy references across asset manifest', () => {
    const assetString = JSON.stringify(JOURNEY_ASSETS).toLowerCase() + JSON.stringify(assetManifest).toLowerCase();
    expect(assetString).not.toContain('torii');
    expect(assetString).not.toContain('japanese');
    expect(assetString).not.toContain('pagoda');
    expect(assetString).not.toContain('shinto');
    expect(assetString).not.toContain('oriental');
  });
});
