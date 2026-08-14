import { describe, it, expect } from 'vitest';
import { JOURNEY_ASSETS, type VerifiedAsset } from '../data/journeyAssets';

describe('Journey Assets Manifest', () => {
  it('contains verified entries for all vertical slice requirements', () => {
    expect(JOURNEY_ASSETS.sandPbr).toBeDefined();
    expect(JOURNEY_ASSETS.teakWoodPbr).toBeDefined();
    expect(JOURNEY_ASSETS.palmFrondPbr).toBeDefined();
    expect(JOURNEY_ASSETS.skyHdri).toBeDefined();
    expect(JOURNEY_ASSETS.coastalBoat).toBeDefined();
    expect(JOURNEY_ASSETS.sandPbr.license).toBe('CC0');
    expect(JOURNEY_ASSETS.teakWoodPbr.license).toBe('CC0');
    expect(JOURNEY_ASSETS.palmFrondPbr.license).toBe('CC0');
    expect(JOURNEY_ASSETS.skyHdri.license).toBe('CC0');
    expect(JOURNEY_ASSETS.coastalBoat.license).toBe('CC-BY');
  });

  it('ensures no entries are marked MISSING or placeholder', () => {
    const verifiedAssets = Object.values(JOURNEY_ASSETS).filter(
      (asset): asset is VerifiedAsset => typeof asset === 'object' && asset !== null && 'id' in asset && 'status' in asset
    );
    expect(verifiedAssets.length).toBeGreaterThanOrEqual(5);
    verifiedAssets.forEach((asset: VerifiedAsset) => {
      expect(asset.id).toBeTruthy();
      expect(asset.name).toBeTruthy();
      expect(asset.category).toMatch(/^(terrain|architecture|vegetation|marine|atmosphere)$/);
      expect(asset.repository).toBeTruthy();
      expect(asset.status).toBe('VERIFIED');
      expect(asset.sourceUrl).toMatch(/^https?:\/\//);
      expect(['CC0', 'CC-BY']).toContain(asset.license);
      expect(asset.localPath).toBeTruthy();
    });
  });

  it('validates structural dimensions and paths for models', () => {
    expect(JOURNEY_ASSETS.coastalBoat.dimensions).toBeDefined();
    expect(JOURNEY_ASSETS.coastalBoat.dimensions?.width).toBeGreaterThan(0);
    expect(JOURNEY_ASSETS.coastalBoat.dimensions?.height).toBeGreaterThan(0);
    expect(JOURNEY_ASSETS.coastalBoat.dimensions?.depth).toBeGreaterThan(0);
  });
});
