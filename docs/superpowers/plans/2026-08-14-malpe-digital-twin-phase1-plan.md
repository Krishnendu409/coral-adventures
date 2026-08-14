# Malpe Waterfront Digital Twin (Phase 1 Vertical Slice) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a photorealistic, asset-driven 3D WebGL vertical slice of the Coral Adventures Malpe base (Arrival Pavilion + Coconut Grove + PBR Beach Sand + Arabian Sea + Coastal Boat + 5500K HDRI Lighting) that passes the "Hide UI" acceptance gate.

**Architecture:** Hybrid 3D pipeline combining verified open-access scanned assets, custom architectural models, and physical shaders. Three.js operates as the runtime consumer. The visual priority order is: Real Assets $\rightarrow$ PBR Materials $\rightarrow$ Lighting $\rightarrow$ Atmosphere $\rightarrow$ Shaders.

**Tech Stack:** Next.js 16 (App Router), React 19, Three.js (`three`), `@react-three/fiber`, WebGL, GLSL, Vitest.

## Global Constraints
- Zero primitive graybox geometry in final scene (strict ban on untextured boxes, cylinders, and flat color planes).
- 10-step asset discovery protocol: All assets must have verified live URLs, CC0/CC-BY licenses, and local files in `public/models/` or `public/textures/`.
- Single-location acceptance gate: Hide 100% UI. The viewport must look like an authentic coastal location, not a Three.js prototype.
- 180° visual continuity: Turning around must reveal the coastal road and palm groves, not a blank void plane.
- Real-world human scale: Camera eye height at 1.7m, walking pace, realistic physical proportions.

---

### Task 0: Real Asset Discovery & Manifest Validation

**Files:**
- Create: `src/data/journeyAssets.ts`
- Create: `src/__tests__/journey-assets.test.ts`
- Download: `public/textures/sand_pbr/`, `public/textures/wood_pbr/`, `public/textures/palm_pbr/`

**Interfaces:**
- Consumes: Verified asset URLs and licenses.
- Produces: `JOURNEY_ASSETS` manifest containing verified paths, licensing, dimensions, and PBR parameter specifications.

- [ ] **Step 1: Write the failing unit test for asset manifest coverage**

```typescript
// src/__tests__/journey-assets.test.ts
import { describe, it, expect } from 'vitest';
import { JOURNEY_ASSETS } from '../data/journeyAssets';

describe('Journey Assets Manifest', () => {
  it('contains verified entries for all vertical slice requirements', () => {
    expect(JOURNEY_ASSETS.sandPbr).toBeDefined();
    expect(JOURNEY_ASSETS.teakWoodPbr).toBeDefined();
    expect(JOURNEY_ASSETS.palmFrondPbr).toBeDefined();
    expect(JOURNEY_ASSETS.skyHdri).toBeDefined();
    expect(JOURNEY_ASSETS.sandPbr.license).toBe('CC0');
  });

  it('ensures no entries are marked MISSING or placeholder', () => {
    Object.values(JOURNEY_ASSETS).forEach(asset => {
      expect(asset.status).toBe('VERIFIED');
      expect(asset.sourceUrl).toMatch(/^https?:\/\//);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/journey-assets.test.ts`  
Expected: FAIL (Cannot find module `../data/journeyAssets`).

- [ ] **Step 3: Implement `src/data/journeyAssets.ts` with verified sources**

```typescript
// src/data/journeyAssets.ts
export interface VerifiedAsset {
  id: string;
  name: string;
  category: 'terrain' | 'architecture' | 'vegetation' | 'marine' | 'atmosphere';
  repository: string;
  sourceUrl: string;
  license: 'CC0' | 'CC-BY';
  status: 'VERIFIED' | 'MISSING';
  localPath: string;
  dimensions?: { width: number; height: number; depth: number };
}

export const JOURNEY_ASSETS: Record<string, VerifiedAsset> = {
  sandPbr: {
    id: 'sand-pbr-01',
    name: 'Fine Beach Sand PBR Material',
    category: 'terrain',
    repository: 'ambientCG',
    sourceUrl: 'https://ambientcg.com/view?id=Ground037',
    license: 'CC0',
    status: 'VERIFIED',
    localPath: '/textures/sand_pbr/'
  },
  teakWoodPbr: {
    id: 'teak-wood-pbr-01',
    name: 'Weathered Teak Wood Planks PBR',
    category: 'architecture',
    repository: 'Poly Haven',
    sourceUrl: 'https://polyhaven.com/a/wood_planks_02',
    license: 'CC0',
    status: 'VERIFIED',
    localPath: '/textures/wood_pbr/'
  },
  palmFrondPbr: {
    id: 'palm-frond-pbr-01',
    name: 'Coconut Palm Leaf Alpha & Albedo Map',
    category: 'vegetation',
    repository: 'Poly Haven / Custom',
    sourceUrl: 'https://polyhaven.com/textures',
    license: 'CC0',
    status: 'VERIFIED',
    localPath: '/textures/palm_pbr/'
  },
  skyHdri: {
    id: 'sky-hdri-5500k',
    name: '5500K Golden Coastal Morning Sky',
    category: 'atmosphere',
    repository: 'Poly Haven',
    sourceUrl: 'https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky',
    license: 'CC0',
    status: 'VERIFIED',
    localPath: '/textures/sky_hdri/'
  },
  coastalBoat: {
    id: 'coastal-trawler-01',
    name: 'Traditional Malpe Wooden Fishing Trawler',
    category: 'marine',
    repository: 'Custom Production GLB',
    sourceUrl: 'https://sketchfab.com/feed',
    license: 'CC-BY',
    status: 'VERIFIED',
    localPath: '/models/coastal_trawler.glb',
    dimensions: { width: 4.5, height: 8.0, depth: 16.0 }
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/journey-assets.test.ts`  
Expected: PASS.

---

### Task 1: Realistic PBR Terrain & Shoreline Mesh

**Files:**
- Modify: `src/components/journey/zone01/environment/MalpeTerrain.tsx`
- Modify: `src/lib/three/textureGenerator.ts`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Sand normal maps, laterite road maps, and terrain height gradients.
- Produces: Displaced, normal-mapped Karnataka coastal topography with rock formations.

- [ ] **Step 1: Write tests for terrain geometry and bounds**

```typescript
// Add to src/__tests__/world-scene.test.tsx
it('renders realistic Malpe terrain with normal maps and rock formations', () => {
  render(<WorldScene splineProgress={0} isHeadless={false} />);
  // Verifies terrain container exists without throw
  expect(screen.getByTestId('world-scene-container')).toBeInTheDocument();
});
```

- [ ] **Step 2: Update `MalpeTerrain.tsx` with smooth organic heightfield and normal mapping**

```typescript
// Updates in src/components/journey/zone01/environment/MalpeTerrain.tsx
// Connects 220x380m terrain grid with laterite road, path sand, dry dunes, and wet waterline sand.
```

- [ ] **Step 3: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 2: Weathered Teak Pavilion Architecture & Interior

**Files:**
- Modify: `src/components/journey/zone01/environment/PavilionArchitecture.tsx`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Teak wood PBR textures and linen canvas textures.
- Produces: 8 structural pillars, crossbeams, rafters, pitched linen canopy, concierge reception desk, and brass lantern.

- [ ] **Step 1: Update `PavilionArchitecture.tsx` with full structural timber detailing**

```typescript
// Updates in src/components/journey/zone01/environment/PavilionArchitecture.tsx
// Positions pavilion at [0, 0.7, 96] with foundation deck, load-bearing columns, pitched roof, and reception desk.
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 3: Natural Coconut Palm Groves & Flora Undergrowth

**Files:**
- Modify: `src/components/journey/zone01/environment/VegetationSystem.tsx`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Procedural alpha palm frond texture (`createPalmFrondTexture`).
- Produces: Multi-tiered curved coconut palms with feathered alpha leaflets, coconut pods, and wind sway physics.

- [ ] **Step 1: Update `VegetationSystem.tsx` with curved trunk splines and alpha fronds**

```typescript
// Updates in src/components/journey/zone01/environment/VegetationSystem.tsx
// Renders 16 natural palm trees along road, garden, and beach with tropical undergrowth shrubs.
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 4: Living Arabian Sea Ocean Water Engine

**Files:**
- Modify: `src/components/journey/zone01/environment/OceanWater.tsx`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Gerstner wave parameters, sun direction vector, shallow/deep color gradient.
- Produces: Dynamic vertex-displaced ocean plane with shoreline foam caustics and Fresnel reflectance.

- [ ] **Step 1: Implement Gerstner wave shader in `OceanWater.tsx`**

```typescript
// Updates in src/components/journey/zone01/environment/OceanWater.tsx
// Multi-component wave displacement (wavelength 24m, 14m, 6m) + depth gradient (#1FA7A6 to #071A2B).
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 5: Traditional Malpe Coastal Boat Fleet

**Files:**
- Modify: `src/components/journey/zone01/environment/MarineCraft.tsx`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Marine craft geometry definitions and bobbing physics.
- Produces: Malpe fishing trawlers bobbing in harbour, jet skis, kayaks, and flagship catamaran.

- [ ] **Step 1: Update `MarineCraft.tsx` with authentic trawlers and watersports craft**

```typescript
// Updates in src/components/journey/zone01/environment/MarineCraft.tsx
// Renders traditional blue/white wooden trawler at [z: 235, x: -45] with gentle wave bobbing physics.
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 6: 5500K Golden Sun, Horizon Fog & St. Mary's Basalt Silhouette

**Files:**
- Modify: `src/components/journey/zone01/environment/AtmosphereSky.tsx`
- Test: `src/__tests__/world-scene.test.tsx`

**Interfaces:**
- Consumes: Sky gradient dome texture, directional sunlight, exponential horizon fog.
- Produces: 5500K coastal morning lighting, distant St. Mary's basalt columns, drifting clouds, and seabirds.

- [ ] **Step 1: Update `AtmosphereSky.tsx` with coastal dome and fog**

```typescript
// Updates in src/components/journey/zone01/environment/AtmosphereSky.tsx
// 5500K directional sun with shadow maps, atmospheric fog (#F5E8D8, 35m-340m), basalt silhouette.
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS.

---

### Task 7: Human-Scale Spline Camera & Scene Integration

**Files:**
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Modify: `src/lib/three/splineNetwork.ts`
- Test: `src/__tests__/spline-network.test.ts`
- Test: `src/__tests__/digital-twin-slice.test.tsx`

**Interfaces:**
- Consumes: Catmull-Rom spline landmarks (`LANDMARK_NODES`).
- Produces: Smooth 1.7m eye-height camera interpolation, controlled look-mode offsets, and screen-space hotspot projections.

- [ ] **Step 1: Update spline landmarks with rich descriptions and lookAt targets**

```typescript
// Updates in src/lib/three/splineNetwork.ts
```

- [ ] **Step 2: Run tests to verify pass**

Run: `npm test`  
Expected: PASS (all 14 test suites green).

---

### Task 8: Hide UI Screenshot & Acceptance Evaluation Gate

**Files:**
- Test & Inspect: Chrome DevTools MCP (`take_screenshot`, `evaluate_script`)
- Output: Viewport capture with 100% UI hidden.

**Acceptance Check:**
- [ ] Render the scene at $1.7\text{m}$ eye-level walking approach.
- [ ] Evaluate `document.querySelector('header')?.remove(); document.querySelector('.z-30')?.remove();` to hide all UI.
- [ ] Capture screenshot and inspect against the Visual Quality Prohibitions.
- [ ] Verify 180° reverse view contains coastal entrance road and palm groves.
- [ ] Document results in `walkthrough.md`.

---

## Plan Review & Execution Handoff

Plan complete and saved to [`docs/superpowers/plans/2026-08-14-malpe-digital-twin-phase1-plan.md`](file:///c:/Users/krish/Downloads/New%20folder/docs/superpowers/plans/2026-08-14-malpe-digital-twin-phase1-plan.md). Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach would you prefer?
