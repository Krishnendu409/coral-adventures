# Master Design Specification: Coral Adventures 3D World — Complete AAA WebGL Rebuild

**Date:** 2026-08-14  
**Project:** Coral Adventures (Malpe Waterfront, Udupi, Karnataka, India)  
**Document:** `docs/superpowers/specs/2026-08-14-malpe-digital-twin-aaa-rebuild-design.md`  

---

## 1. Architectural Philosophy & Reset Mandate

> **Core Mandate:**  
> *"Stop patching procedural primitives. Three.js is the runtime, not the modeling software. The world is built as a real game-engine environment using authored GLB/glTF models, multi-layer PBR material blending, centralized resource management, and progressive zone streaming."*

### Reference Benchmarks:
1. **Bruno Simon Interactive 3D World**: Centralized `ResourceManager`, `AssetRegistry`, `ZoneLoader`, `LODManager`, `CameraDirector`, `PlayerController` (WASD/touch navigation), physics, and spatial audio.
2. **Getty *Persepolis Reimagined***: Architecturally accurate base environment, multi-layered PBR materials, distance-based LOD, frustum culling, and guided spatial storytelling.

---

## 2. Game Engine Subsystem Architecture

```
                    CORAL ADVENTURES GAME ENGINE RUNTIME
                                     │
    ┌────────────────────────────────┼────────────────────────────────┐
    ▼                                ▼                                ▼
RESOURCE MANAGER              ZONE & LOD ENGINE             CAMERA & PLAYER ENGINE
• AssetRegistry.ts            • ZoneLoader.ts               • CameraDirector.ts (12 Beats)
• PBR Texture Cache           • LODManager.ts               • PlayerController.ts (WASD/Touch)
• GLB Model Loader            • Frustum & Distance Culling   • Spatial Audio Synthesizer
```

### Core Engine Subsystems:
1. **`ResourceManager.ts` & `AssetRegistry.ts`**: Centralized async loading and caching of real GLB/glTF models, PBR textures, and HDRI environment maps with proper loading states. No fictional assets.
2. **`ZoneLoader.ts` & `LODManager.ts`**:
   - Tier 1 (Hero 0–10m): High-detail GLB models, micro-displacement, full shadow maps, interactive hotspots.
   - Tier 2 (Environment 10–40m): Standard PBR materials, instanced palm groves, 450m Sea Walkway pavers, granite rock armour.
   - Tier 3 (Simplified 40–100m): Low-poly GLB / instanced geometry, culling disabled shadow passes.
   - Tier 4 (Horizon 100m+): Silhouettes, background ocean plane, exponential atmospheric fog (`FogExp2`).
3. **`EnvironmentManager.ts`**: 5200K coastal golden hour sunset lighting, Rayleigh/Mie sky dome scattering, soft contact shadows, and distance mist.
4. **`CameraDirector.ts` & `PlayerController.ts`**: Stateful 12-beat camera spline navigation seamlessly blended with desktop WASD / mobile touch player movement controls.

---

## 3. First Milestone Vertical Slice ($Z = 0\text{m} \to 250\text{m}$)

To guarantee visual excellence without spreading effort thinly, the rebuild begins with a strict **First Milestone Vertical Slice**:

$$\text{MALPE ARRIVAL} \to \text{PALM GROVE} \to \text{CORAL PAVILION} \to \text{BEACH} \to \text{OCEAN} \to \text{HERO VESSEL}$$

### 6-Point Hidden-UI Art Acceptance Gate:
Before expanding to all 12 zones, the vertical slice must be rendered with all UI hidden and evaluated across:
1. **Forward View**: Believable photorealistic coastal environment, zero primitive shapes.
2. **180° Reverse View**: Continuous environment depth, zero background clipping or missing geometry.
3. **Close-Up (1m)**: High-detail PBR texture response on teak timber, laterite plinths, and palm fronds.
4. **10s Idle**: Natural non-synchronous wind sway in foliage, water wave movement, and atmospheric sky light.
5. **Lighting Audit**: 5200K golden solar glare, long directional shadows, volumetric horizon fog.
6. **Performance Audit**: Stable 60 FPS rendering on desktop and mobile WebGL.

---

## 4. Multi-Layer PBR Terrain Engine (`MalpeTerrain.tsx`)

- Continuous $240 \times 1200\text{m}$ topography mesh with natural elevation slopes, dune micro-variations, irregular shoreline, and cart ruts.
- Blended multi-layer PBR materials:
  1. Dry Pale Sand (`#EADCC6`) with micro-normal displacement.
  2. Crushed Red Laterite Path (`#964831`) with organic Gaussian edge falloff.
  3. Damp Transition Sand (`#C4B59D`).
  4. Wet Reflective Intertidal Sand (`#8F7C66`) with specular wave wash.
  5. 450m Sea Walkway Paver Pier ($y = 1.8\text{m}$) flanked by granite rock armour breakwater boulders.
  6. St. Mary's Lagoon & Basalt Foundation Base (`#2A282A`).

---

## 5. Botanical Palms & Environmental Life (`VegetationSystem.tsx` & `WildlifeSystem.tsx`)

- **4 Hero Botanical Palms (*Cocos nucifera*)**: Real GLB models featuring bark texture, trunk ring scars, individual frond leaflet geometry, and coconut clusters.
- **Seaward Wind Bowing & Sway Physics**: InstancedMesh GPU batching across 600+ trees with seaward trunk lean logic and per-instance phase offset wind sway vertex shaders.
- **Native Arabian Sea Wildlife**: Soaring Brahminy kites, sea gulls, leaping dolphin pod near catamaran ($Z = 700\text{m}$), and shallow water silver fish schools.

---

## 6. Authored Karnataka Expedition Architecture & Hero Vessels

- **Expedition Portal (`CoralPortal.tsx`)**: Heavy $0.55\text{m}$ weathered teak posts socketed into laterite stone plinths, carved coordinates `13°21′02″ N · 74°42′08″ E`, hemp rope lashings, antique brass plaque. Zero Japanese torii/pagoda motifs.
- **Welcome Pavilion (`PavilionArchitecture.tsx`)**: Open-air teak post-and-beam construction, tensioned sailcloth canopy roof, slatted teak tambour concierge desk, navigational chart table (aged St. Mary's sea chart, brass dividers, marine compass, weather ledger, vessel manifest, brass weights), and glowing captain's lantern.
- **Hero 25.90M Catamaran (`CatamaranHero.tsx`)**: Flagship 3-deck expedition catamaran GLB model with twin wave-piercing hulls, main deck social lounge, upper deck observation terrace, panoramic glazing, dynamic wave bobbing physics, and wake displacement.
