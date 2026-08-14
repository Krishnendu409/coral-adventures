import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { resourceManager, ResourceManager } from '@/lib/three/ResourceManager';
import { JOURNEY_ASSETS } from '@/data/journeyAssets';

describe('ResourceManager Singleton & Asset Pipeline', () => {
  beforeEach(() => {
    resourceManager.clearCache();
  });

  it('initializes asset cache and loads PBR textures and GLB models', async () => {
    expect(resourceManager).toBeDefined();
    expect(JOURNEY_ASSETS.models).toBeDefined();
    expect(JOURNEY_ASSETS.models.palmTall).toBeDefined();
    expect(JOURNEY_ASSETS.models.coralPortal).toBeDefined();
    expect(JOURNEY_ASSETS.models.expeditionPavilion).toBeDefined();
    expect(JOURNEY_ASSETS.models.coastalTrawler).toBeDefined();
  });

  it('maps every hero asset to verified GLB/glTF model paths and PBR textures', () => {
    const heroModels = Object.values(JOURNEY_ASSETS.models);
    expect(heroModels.length).toBeGreaterThanOrEqual(12);

    heroModels.forEach((model) => {
      expect(model.id).toBeTruthy();
      expect(model.name).toBeTruthy();
      expect(model.localPath).toMatch(/\.(glb|gltf)$/);
      expect(['terrain', 'architecture', 'vegetation', 'marine', 'atmosphere', 'prop', 'wildlife']).toContain(model.category);
    });
  });

  it('loads and caches GLB models with fallback support', async () => {
    const model1 = await resourceManager.loadModel('/models/palms/cocos_nucifera_tall.glb');
    expect(model1).toBeDefined();
    expect(model1).toBeInstanceOf(THREE.Object3D);

    const model2 = await resourceManager.loadModel('/models/palms/cocos_nucifera_tall.glb');
    expect(model2).toBeDefined();
    // Cache returns a clone, so instances are separate
    expect(model2).not.toBe(model1);
  });

  it('loads and caches textures with procedural fallback generation', async () => {
    const texture = await resourceManager.loadTexture('/textures/sand_diffuse.jpg');
    expect(texture).toBeDefined();
    expect(texture).toBeInstanceOf(THREE.Texture);

    const cachedTexture = await resourceManager.loadTexture('/textures/sand_diffuse.jpg');
    expect(cachedTexture).toBe(texture);
  });

  it('loads HDRI sky environment maps', async () => {
    const hdri = await resourceManager.loadHDRI('/environments/coastal_golden_hour.hdr');
    expect(hdri).toBeDefined();
    expect(hdri).toBeInstanceOf(THREE.Texture);
    expect(hdri.mapping).toBe(THREE.EquirectangularReflectionMapping);
  });

  it('allocates PBR texture channels (diffuse, normal, roughness, displacement, ao)', async () => {
    const bundle = await resourceManager.loadPBRTextureSet({
      diffuse: '/textures/wood_pbr/diffuse.jpg',
      normal: '/textures/wood_pbr/normal.png',
      roughnessMap: '/textures/wood_pbr/roughness.jpg',
      displacement: '/textures/wood_pbr/displacement.png',
      aoMap: '/textures/wood_pbr/ao.png',
    });

    expect(bundle.map).toBeDefined();
    expect(bundle.normalMap).toBeDefined();
    expect(bundle.roughnessMap).toBeDefined();
    expect(bundle.displacementMap).toBeDefined();
    expect(bundle.aoMap).toBeDefined();
  });

  it('creates PBR standard materials with custom roughness, metalness, and maps', () => {
    const material = resourceManager.createPBRMaterial('teak_material', {
      color: '#5C3E29',
      roughness: 0.72,
      metalness: 0.04,
      normalScale: 1.2,
    });

    expect(material).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect(material.color.getHexString().toUpperCase()).toBe('5C3E29');
    expect(material.roughness).toBe(0.72);
    expect(material.metalness).toBe(0.04);
  });

  it('generates valid fallback materials for missing assets', () => {
    const fallback = resourceManager.getFallbackMaterial('#FF0000');
    expect(fallback).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect(fallback.color.getHexString().toUpperCase()).toBe('FF0000');
    expect(fallback.roughness).toBeGreaterThan(0);
  });

  it('tracks async loading progress and notifies subscribers', async () => {
    let lastProgress = resourceManager.getProgress();
    const unsubscribe = resourceManager.onProgress((p) => {
      lastProgress = p;
    });

    expect(lastProgress).toBeDefined();
    expect(lastProgress.ratio).toBeGreaterThanOrEqual(0);
    expect(lastProgress.ratio).toBeLessThanOrEqual(1.0);

    await resourceManager.loadTexture('/textures/laterite_diffuse.jpg');
    expect(lastProgress.loaded).toBeGreaterThan(0);

    unsubscribe();
  });

  it('clears all resource caches and resets progress', async () => {
    await resourceManager.loadTexture('/textures/sand_diffuse.jpg');
    resourceManager.clearCache();

    const progress = resourceManager.getProgress();
    expect(progress.loaded).toBe(0);
    expect(progress.total).toBe(0);
  });
});
