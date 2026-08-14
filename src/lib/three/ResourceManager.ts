import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

export interface PBRChannelAllocation {
  diffuse?: string | THREE.Texture;
  normal?: string | THREE.Texture;
  roughnessMap?: string | THREE.Texture;
  displacement?: string | THREE.Texture;
  aoMap?: string | THREE.Texture;
  metalnessMap?: string | THREE.Texture;
  color?: string;
  darkColor?: string;
  roughness?: number;
  metalness?: number;
  normalScale?: number;
  displacementScale?: number;
}

export interface PBRTextureBundle {
  map?: THREE.Texture;
  normalMap?: THREE.Texture;
  roughnessMap?: THREE.Texture;
  displacementMap?: THREE.Texture;
  aoMap?: THREE.Texture;
  metalnessMap?: THREE.Texture;
}

export interface LoadingProgress {
  loaded: number;
  total: number;
  ratio: number;
  isLoading: boolean;
}

export type ProgressCallback = (progress: LoadingProgress) => void;

function createFallbackCanvasTexture(colorHex: string = '#808080'): THREE.Texture {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return new THREE.Texture();
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = colorHex;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  } catch {
    return new THREE.Texture();
  }
}

export class ResourceManager {
  private modelCache: Map<string, THREE.Group | THREE.Object3D> = new Map();
  private textureCache: Map<string, THREE.Texture> = new Map();
  private materialCache: Map<string, THREE.Material> = new Map();
  private hdriCache: Map<string, THREE.Texture> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();

  private loadedCount: number = 0;
  private totalCount: number = 0;
  private isLoadingState: boolean = false;
  private progressCallbacks: Set<ProgressCallback> = new Set();

  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;
  private textureLoader: THREE.TextureLoader;
  private hdrLoader: HDRLoader | RGBELoader;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.hdrLoader = typeof HDRLoader !== 'undefined' ? new HDRLoader() : new RGBELoader();
    this.gltfLoader = new GLTFLoader();

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    try {
      this.dracoLoader.preload();
    } catch {
      // Ignore in non-browser envs
    }
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    if (MeshoptDecoder) {
      this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    }
  }

  private isTestEnvironment(): boolean {
    return (
      typeof window !== 'undefined' &&
      (window.navigator?.userAgent?.includes('jsdom') ||
        process?.env?.NODE_ENV === 'test' ||
        Boolean((process?.env as any)?.VITEST))
    );
  }

  private resolveUrl(url: string): string {
    if (!url) return 'http://localhost/';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }
    if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
      try {
        return new URL(url, window.location.origin).href;
      } catch {
        return `http://localhost${url.startsWith('/') ? '' : '/'}${url}`;
      }
    }
    return `http://localhost${url.startsWith('/') ? '' : '/'}${url}`;
  }

  public onProgress(callback: ProgressCallback): () => void {
    this.progressCallbacks.add(callback);
    callback(this.getProgress());
    return () => {
      this.progressCallbacks.delete(callback);
    };
  }

  public getProgress(): LoadingProgress {
    const ratio = this.totalCount > 0 ? Math.min(1.0, this.loadedCount / this.totalCount) : 1.0;
    return {
      loaded: this.loadedCount,
      total: this.totalCount,
      ratio,
      isLoading: this.isLoadingState,
    };
  }

  private notifyProgress(): void {
    const progress = this.getProgress();
    this.progressCallbacks.forEach((cb) => cb(progress));
  }

  private startTask(): void {
    this.totalCount++;
    this.isLoadingState = true;
    this.notifyProgress();
  }

  private completeTask(): void {
    this.loadedCount++;
    if (this.loadedCount >= this.totalCount) {
      this.isLoadingState = false;
    }
    this.notifyProgress();
  }

  public async loadModel(url: string): Promise<THREE.Group | THREE.Object3D> {
    if (this.modelCache.has(url)) {
      return this.modelCache.get(url)!.clone(true);
    }

    if (this.loadingPromises.has(url)) {
      const model = await this.loadingPromises.get(url);
      return model.clone(true);
    }

    this.startTask();

    const promise = new Promise<THREE.Group | THREE.Object3D>((resolve) => {
      const createFallback = () => {
        const fallbackGroup = new THREE.Group();
        const fallbackMesh = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          this.getFallbackMaterial('#C5A059')
        );
        fallbackMesh.name = `fallback_${url.split('/').pop()}`;
        fallbackGroup.add(fallbackMesh);
        this.modelCache.set(url, fallbackGroup);
        this.completeTask();
        resolve(fallbackGroup.clone(true));
      };

      if (this.isTestEnvironment()) {
        createFallback();
        return;
      }

      try {
        const resolvedUrl = this.resolveUrl(url);
        this.gltfLoader.load(
          resolvedUrl,
          (gltf) => {
            const scene = gltf.scene || gltf.scenes[0];
            this.modelCache.set(url, scene);
            this.completeTask();
            resolve(scene.clone(true));
          },
          undefined,
          () => {
            createFallback();
          }
        );
      } catch {
        createFallback();
      }
    });

    this.loadingPromises.set(url, promise);
    const result = await promise;
    this.loadingPromises.delete(url);
    return result;
  }

  public async loadTexture(url: string): Promise<THREE.Texture> {
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url)!;
    }

    if (this.loadingPromises.has(url)) {
      return await this.loadingPromises.get(url);
    }

    this.startTask();

    const promise = new Promise<THREE.Texture>((resolve) => {
      const createFallback = () => {
        const fallback = createFallbackCanvasTexture('#9E5A44');
        fallback.name = url;
        this.textureCache.set(url, fallback);
        this.completeTask();
        resolve(fallback);
      };

      if (this.isTestEnvironment()) {
        createFallback();
        return;
      }

      try {
        const resolvedUrl = this.resolveUrl(url);
        this.textureLoader.load(
          resolvedUrl,
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            this.textureCache.set(url, texture);
            this.completeTask();
            resolve(texture);
          },
          undefined,
          () => {
            createFallback();
          }
        );
      } catch {
        createFallback();
      }
    });

    this.loadingPromises.set(url, promise);
    const result = await promise;
    this.loadingPromises.delete(url);
    return result;
  }

  public async loadHDRI(url: string): Promise<THREE.Texture> {
    if (this.hdriCache.has(url)) {
      return this.hdriCache.get(url)!;
    }

    if (this.loadingPromises.has(url)) {
      return await this.loadingPromises.get(url);
    }

    this.startTask();

    const promise = new Promise<THREE.Texture>((resolve) => {
      const createFallback = () => {
        const fallback = createFallbackCanvasTexture('#C9DDE8');
        fallback.mapping = THREE.EquirectangularReflectionMapping;
        fallback.name = url;
        this.hdriCache.set(url, fallback);
        this.completeTask();
        resolve(fallback);
      };

      if (this.isTestEnvironment()) {
        createFallback();
        return;
      }

      try {
        const resolvedUrl = this.resolveUrl(url);
        this.hdrLoader.load(
          resolvedUrl,
          (hdrTexture) => {
            hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
            this.hdriCache.set(url, hdrTexture);
            this.completeTask();
            resolve(hdrTexture);
          },
          undefined,
          () => {
            createFallback();
          }
        );
      } catch {
        createFallback();
      }
    });

    this.loadingPromises.set(url, promise);
    const result = await promise;
    this.loadingPromises.delete(url);
    return result;
  }

  public async loadPBRTextureSet(channels: PBRChannelAllocation): Promise<PBRTextureBundle> {
    const bundle: PBRTextureBundle = {};

    const loadChannel = async (channelVal: string | THREE.Texture | undefined) => {
      if (!channelVal) return undefined;
      if (typeof channelVal === 'string') {
        return await this.loadTexture(channelVal);
      }
      return channelVal;
    };

    const [map, normalMap, roughnessMap, displacementMap, aoMap, metalnessMap] = await Promise.all([
      loadChannel(channels.diffuse),
      loadChannel(channels.normal),
      loadChannel(channels.roughnessMap),
      loadChannel(channels.displacement),
      loadChannel(channels.aoMap),
      loadChannel(channels.metalnessMap),
    ]);

    if (map) bundle.map = map;
    if (normalMap) bundle.normalMap = normalMap;
    if (roughnessMap) bundle.roughnessMap = roughnessMap;
    if (displacementMap) bundle.displacementMap = displacementMap;
    if (aoMap) bundle.aoMap = aoMap;
    if (metalnessMap) bundle.metalnessMap = metalnessMap;

    return bundle;
  }

  public createPBRMaterial(key: string, channels: PBRChannelAllocation): THREE.MeshStandardMaterial {
    if (this.materialCache.has(key)) {
      return this.materialCache.get(key) as THREE.MeshStandardMaterial;
    }

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(channels.color || '#FFFFFF'),
      roughness: channels.roughness ?? 0.8,
      metalness: channels.metalness ?? 0.0,
    });

    if (typeof channels.diffuse === 'object' && channels.diffuse instanceof THREE.Texture) {
      material.map = channels.diffuse;
    }
    if (typeof channels.normal === 'object' && channels.normal instanceof THREE.Texture) {
      material.normalMap = channels.normal;
      if (channels.normalScale !== undefined) {
        material.normalScale.set(channels.normalScale, channels.normalScale);
      }
    }
    if (typeof channels.roughnessMap === 'object' && channels.roughnessMap instanceof THREE.Texture) {
      material.roughnessMap = channels.roughnessMap;
    }
    if (typeof channels.displacement === 'object' && channels.displacement instanceof THREE.Texture) {
      material.displacementMap = channels.displacement;
      if (channels.displacementScale !== undefined) {
        material.displacementScale = channels.displacementScale;
      }
    }
    if (typeof channels.aoMap === 'object' && channels.aoMap instanceof THREE.Texture) {
      material.aoMap = channels.aoMap;
    }
    if (typeof channels.metalnessMap === 'object' && channels.metalnessMap instanceof THREE.Texture) {
      material.metalnessMap = channels.metalnessMap;
    }

    this.materialCache.set(key, material);
    return material;
  }

  public getFallbackMaterial(colorHex: string = '#777777'): THREE.MeshStandardMaterial {
    const key = `fallback_${colorHex}`;
    if (this.materialCache.has(key)) {
      return this.materialCache.get(key) as THREE.MeshStandardMaterial;
    }

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.85,
      metalness: 0.05,
    });

    this.materialCache.set(key, mat);
    return mat;
  }

  public async preloadAssets(urls: string[]): Promise<void> {
    const promises = urls.map((url) => {
      if (url.endsWith('.glb') || url.endsWith('.gltf')) {
        return this.loadModel(url);
      }
      if (url.endsWith('.hdr') || url.endsWith('.exr')) {
        return this.loadHDRI(url);
      }
      return this.loadTexture(url);
    });

    await Promise.all(promises);
  }

  public clearCache(): void {
    this.modelCache.forEach((model) => {
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
    });
    this.modelCache.clear();

    this.textureCache.forEach((tex) => tex.dispose());
    this.textureCache.clear();

    this.materialCache.forEach((mat) => mat.dispose());
    this.materialCache.clear();

    this.hdriCache.forEach((tex) => tex.dispose());
    this.hdriCache.clear();

    this.loadingPromises.clear();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.isLoadingState = false;
    this.notifyProgress();
  }
}

export const resourceManager = new ResourceManager();
export default resourceManager;
