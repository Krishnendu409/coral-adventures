/**
 * Malpe Waterfront Digital Twin - Asset Manifest
 * 
 * Visual Guidelines & Reference Board:
 * - Geography: Coastal Karnataka (Malpe Beach, fishing port, Sea Walk walkway, Arabian Sea horizon).
 * - Materials: Laterite stone, weathered teak wood, brass hardware, coconut palms, native coastal vegetation.
 * - Golden Rule: NO POLISHING BAD PLACEHOLDER GEOMETRY. Ban on primitive low-poly placeholders 
 *   (triangular cone palms, cylinder trunks, flat plane water, untextured boxes).
 * - Coordinates Reference: 13°21′02″ N · 74°42′08″ E
 */

export type AssetCategory = 'architecture' | 'vegetation' | 'terrain' | 'prop' | 'craft' | 'lighting';
export type AssetSource = 'Poly Haven' | 'ambientCG' | 'Khronos glTF' | 'custom';

export interface TextureMaps {
  albedo: string;
  normal: string;
  roughness: string;
  ao: string;
}

export interface PBRMaterials {
  diffuseColor: string; // hex
  roughness: number;
  metalness: number;
  normalScale: number;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Asset {
  id: string;
  landmark: string;
  name: string;
  category: AssetCategory;
  source: AssetSource;
  dimensions: Dimensions; // physical meters
  scale: Vector3;
  polygonBudget: number;
  textureMaps: TextureMaps;
  worldAnchor: Vector3; // relative to Malpe coordinates
  pbr: PBRMaterials;
}

export const assetManifest: Asset[] = [
  // Landmark 1: Arrival Road
  {
    id: 'asset-arrival-road-01',
    landmark: 'Arrival Road',
    name: 'Laterite Stone Paving',
    category: 'terrain',
    source: 'custom',
    dimensions: { width: 10, height: 0.1, depth: 50 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 5000,
    textureMaps: {
      albedo: '/textures/laterite_albedo.png',
      normal: '/textures/laterite_normal.png',
      roughness: '/textures/laterite_rough.png',
      ao: '/textures/laterite_ao.png'
    },
    worldAnchor: { x: 0, y: 0, z: 0 },
    pbr: { diffuseColor: '#a65b45', roughness: 0.9, metalness: 0.0, normalScale: 1.0 }
  },
  // Landmark 2: Coral Portal
  {
    id: 'asset-coral-portal-01',
    landmark: 'Coral Portal',
    name: 'Weathered Teak Archway',
    category: 'architecture',
    source: 'custom',
    dimensions: { width: 4, height: 6, depth: 1.5 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 12000,
    textureMaps: {
      albedo: '/textures/teak_albedo.png',
      normal: '/textures/teak_normal.png',
      roughness: '/textures/teak_rough.png',
      ao: '/textures/teak_ao.png'
    },
    worldAnchor: { x: 0, y: 0, z: 50 },
    pbr: { diffuseColor: '#5c4033', roughness: 0.7, metalness: 0.0, normalScale: 1.2 }
  },
  // Landmark 3: Gardens
  {
    id: 'asset-gardens-01',
    landmark: 'Gardens',
    name: 'High-Res Coconut Palm',
    category: 'vegetation',
    source: 'custom',
    dimensions: { width: 5, height: 12, depth: 5 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 25000,
    textureMaps: {
      albedo: '/textures/palm_albedo.png',
      normal: '/textures/palm_normal.png',
      roughness: '/textures/palm_rough.png',
      ao: '/textures/palm_ao.png'
    },
    worldAnchor: { x: -10, y: 0, z: 70 },
    pbr: { diffuseColor: '#4f7942', roughness: 0.6, metalness: 0.0, normalScale: 0.8 }
  },
  // Landmark 4: Arrival Pavilion
  {
    id: 'asset-arrival-pavilion-01',
    landmark: 'Arrival Pavilion',
    name: 'Brass Lantern',
    category: 'lighting',
    source: 'custom',
    dimensions: { width: 0.4, height: 0.8, depth: 0.4 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 8000,
    textureMaps: {
      albedo: '/textures/brass_albedo.png',
      normal: '/textures/brass_normal.png',
      roughness: '/textures/brass_rough.png',
      ao: '/textures/brass_ao.png'
    },
    worldAnchor: { x: 5, y: 3, z: 90 },
    pbr: { diffuseColor: '#b5a642', roughness: 0.2, metalness: 0.9, normalScale: 1.0 }
  },
  // Landmark 5: Exploration Deck
  {
    id: 'asset-exploration-deck-01',
    landmark: 'Exploration Deck',
    name: 'Sea Walk Walkway',
    category: 'architecture',
    source: 'custom',
    dimensions: { width: 8, height: 0.5, depth: 100 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 15000,
    textureMaps: {
      albedo: '/textures/concrete_albedo.png',
      normal: '/textures/concrete_normal.png',
      roughness: '/textures/concrete_rough.png',
      ao: '/textures/concrete_ao.png'
    },
    worldAnchor: { x: 0, y: 2, z: 150 },
    pbr: { diffuseColor: '#808080', roughness: 0.8, metalness: 0.0, normalScale: 0.5 }
  },
  // Landmark 6: Living Beach
  {
    id: 'asset-living-beach-01',
    landmark: 'Living Beach',
    name: 'Malpe Fishing Boat',
    category: 'craft',
    source: 'custom',
    dimensions: { width: 4, height: 3, depth: 12 },
    scale: { x: 1, y: 1, z: 1 },
    polygonBudget: 45000,
    textureMaps: {
      albedo: '/textures/boat_albedo.png',
      normal: '/textures/boat_normal.png',
      roughness: '/textures/boat_rough.png',
      ao: '/textures/boat_ao.png'
    },
    worldAnchor: { x: -20, y: -1, z: 200 },
    pbr: { diffuseColor: '#1a5276', roughness: 0.5, metalness: 0.1, normalScale: 1.0 }
  }
];
