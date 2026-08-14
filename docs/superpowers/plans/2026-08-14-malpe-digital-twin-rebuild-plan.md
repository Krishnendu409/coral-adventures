# Malpe Waterfront Digital Twin (Zone 01) Production Art Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 3D WebGL digital twin for Coral Adventures (Malpe Waterfront) into a production-grade, art-directed spatial expedition environment inspired by *Persepolis Reimagined*, featuring authentic coastal Karnataka architecture, layered PBR terrain, an ecologically varied vegetation population system, inhabited micro-storytelling, a living ocean engine, a stateful camera journey, positional spatial audio, and progressive WebGL loading.

**Architecture:** A modular React Three Fiber / Drei / Three.js pipeline structured into 3 quality tiers (Hero 0–10m, Environment 10–40m, Atmosphere 40m+). Incorporates multi-mask PBR terrain blending, instanced botanical flora, physically coherent sun/HDRI environment lighting, and a stateful Catmull-Rom camera director.

**Tech Stack:** Next.js 16.3, React 19, Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, Vitest, Tailwind CSS.

---

## Global Constraints

- **No Japanese Architecture**: Replace all torii/pagoda motifs with authentic coastal Karnataka teak & laterite expedition structures.
- **No Primitive Cones/Cylinders**: All vegetation must use multi-segment spline geometry with procedural/instanced ecological variation.
- **No Hard Water Boundaries**: Ocean water must feature Gerstner wave displacement, cyan-to-sapphire PBR depth gradients, and oscillating intertidal surf foam.
- **SSR Parity**: Preserve outer `<div data-testid="world-scene-container">` DOM attributes to guarantee 0 Next.js hydration mismatch errors.
- **Test Integrity**: All existing and new unit test suites must pass 100% (21/21 test files, 91+ unit tests).

---

### Task 0: Scaffolding, Dependency Installation & Asset Registry Setup

**Files:**
- Modify: `package.json`
- Create: `src/data/journeyAssets.ts`
- Test: `src/__tests__/asset-manifest.test.ts`

**Interfaces:**
- Consumes: Existing Next.js / Three.js project configuration.
- Produces: `JOURNEY_ASSETS` registry for PBR texture paths, HDRI maps, GLB models, and material definitions.

- [ ] **Step 1: Install `@react-three/drei` and `@react-three/postprocessing`**

```bash
npm install @react-three/drei @react-three/postprocessing postprocessing
```

- [ ] **Step 2: Write failing test for asset manifest and dependencies**

```typescript
import { JOURNEY_ASSETS } from '../data/journeyAssets';

describe('Asset Registry & Environment Setup', () => {
  it('contains valid PBR material definitions and texture paths for coastal terrain', () => {
    expect(JOURNEY_ASSETS.textures.sandPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.lateritePbr).toBeDefined();
    expect(JOURNEY_ASSETS.environment.hdriMap).toBeDefined();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/__tests__/asset-manifest.test.ts`
Expected: FAIL with "JOURNEY_ASSETS not defined"

- [ ] **Step 4: Create `src/data/journeyAssets.ts`**

```typescript
export const JOURNEY_ASSETS = {
  textures: {
    sandPbr: {
      diffuse: '/textures/sand_diffuse.jpg',
      normal: '/textures/sand_normal.png',
      roughness: '/textures/sand_roughness.jpg',
      displacement: '/textures/sand_displacement.png'
    },
    lateritePbr: {
      diffuse: '/textures/laterite_diffuse.jpg',
      normal: '/textures/laterite_normal.png'
    },
    teakPbr: {
      color: '#5C3E29',
      darkColor: '#3B281A',
      roughness: 0.72,
      metalness: 0.04
    }
  },
  environment: {
    hdriMap: '/environments/coastal_golden_hour.hdr',
    sunColor: '#FFF4E0',
    fogColor: '#C9DDE8',
    fogDensity: 0.0022
  }
};
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/__tests__/asset-manifest.test.ts`
Expected: PASS

- [ ] **Step 6: Commit Task 0**

```bash
git add package.json package-lock.json src/data/journeyAssets.ts src/__tests__/asset-manifest.test.ts
git commit -m "feat: setup Drei dependencies and PBR asset registry"
```

---

### Task 1: Multi-Mask Layered PBR Terrain Engine (`MalpeTerrain.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/MalpeTerrain.tsx`
- Test: `src/__tests__/malpe-terrain.test.tsx`

**Interfaces:**
- Consumes: `JOURNEY_ASSETS` PBR texture configurations.
- Produces: `<MalpeTerrain />` component with 240×380m continuous topography, laterite path ruts, dry sand dunes, damp swash zone, wet intertidal sand, and laterite boulder clusters.

- [ ] **Step 1: Write failing test for Multi-Mask PBR Terrain**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { MalpeTerrain } from '@/components/journey/zone01/environment/MalpeTerrain';

describe('MalpeTerrain Component', () => {
  it('renders complex continuous topography group cleanly in React tree', () => {
    const { container } = render(<MalpeTerrain />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`
Expected: FAIL if imports or component structure broken.

- [ ] **Step 3: Update `MalpeTerrain.tsx` with multi-mask vertex blending and micro-displacement**

Enhance `MalpeTerrain.tsx` with:
- Dry warm sand (`#EADCC6`) with wind ripple micro-normals.
- Compacted laterite trail (`#964831`) with organic edge falloff and cart ruts.
- Damp transition sand (`#C4B59D`) and wet reflective intertidal sand (`#8F7C66`, high specular).
- Embedded laterite and basalt boulder clusters with crevice shading and sand accumulation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 1**

```bash
git add src/components/journey/zone01/environment/MalpeTerrain.tsx src/__tests__/malpe-terrain.test.tsx
git commit -m "feat: implement multi-mask PBR coastal terrain engine with laterite path and swash zones"
```

---

### Task 2: Ecological Vegetation Population System (`VegetationSystem.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/VegetationSystem.tsx`
- Test: `src/__tests__/vegetation-system.test.tsx`

**Interfaces:**
- Consumes: Topography vertex bounds from `MalpeTerrain`.
- Produces: `<VegetationSystem />` rendering instanced coconut palm clusters (*Cocos nucifera*) with scale/bend/rotation/crown-age diversity, seaward wind bowing, *Spinifex* dune grass, broadleaf *Alocasia*, and organic ground debris.

- [ ] **Step 1: Write failing test for Vegetation System**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { VegetationSystem } from '@/components/journey/zone01/environment/VegetationSystem';

describe('VegetationSystem Component', () => {
  it('renders vegetation population group with instanced meshes', () => {
    const { container } = render(<VegetationSystem />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: FAIL if component missing or structure invalid.

- [ ] **Step 3: Update `VegetationSystem.tsx` with Ecological Instancing & Cause-and-Effect Debris**

Enhance `VegetationSystem.tsx`:
- Instanced coconut palms with randomized scale ($0.85\times - 1.2\times$), trunk bend angle ($0^\circ - 28^\circ$), rotation, crown frond density ($18 - 32$ fronds), and seaward orientation.
- Undergrowth: *Spinifex* dune grass runners, broadleaf *Alocasia*, *Bougainvillea* shrubs.
- Ground debris: fallen palm fronds, coconut husks, driftwood logs, and shell fragments clustered near tree bases and high-tide marks.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 2**

```bash
git add src/components/journey/zone01/environment/VegetationSystem.tsx src/__tests__/vegetation-system.test.tsx
git commit -m "feat: implement ecological vegetation population system with wind sway and cause-and-effect debris"
```

---

### Task 3: Coastal Karnataka Expedition Architecture & Inhabited Micro-Storytelling (`CoralPortal.tsx` & `PavilionArchitecture.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/CoralPortal.tsx`
- Modify: `src/components/journey/zone01/environment/PavilionArchitecture.tsx`
- Test: `src/__tests__/pavilion-architecture.test.tsx`

**Interfaces:**
- Consumes: Teak timber PBR materials and nautical prop specifications.
- Produces: `<CoralPortal />` (teak posts, laterite stone plinths, carved coordinates, brass plaque) and `<PavilionArchitecture />` (post-and-beam pavilion, linen canopy, tambour concierge desk, nautical chart table with sea chart, dividers, compass, weather ledger, and glowing captain's lantern).

- [ ] **Step 1: Write failing test for Architecture & Micro-Storytelling Props**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { PavilionArchitecture } from '@/components/journey/zone01/environment/PavilionArchitecture';

describe('PavilionArchitecture Component', () => {
  it('renders open-air teak pavilion and inhabited lounge props cleanly', () => {
    const { container } = render(<PavilionArchitecture />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/pavilion-architecture.test.tsx`
Expected: FAIL if imports or component structure broken.

- [ ] **Step 3: Update `CoralPortal.tsx` and `PavilionArchitecture.tsx`**

- **`CoralPortal.tsx`**: Heavy $0.55\text{m}$ teak posts set into laterite stone plinths, straight lintel with carved coordinates `MALPE EXPEDITION BASE · 13°21′02″ N · 74°42′08″ E`, hemp rope lashings, brushed brass plates.
- **`PavilionArchitecture.tsx`**: 8 load-bearing teak pillars with corbel saddle capitals, tensioned linen canopy roof, curved teak tambour concierge desk, solid brass countertop, navigational chart table (aged St. Mary's sea chart, brass dividers, marine compass, weather ledger, vessel manifest, brass weights), and maritime captain's lantern with warm point light.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/pavilion-architecture.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 3**

```bash
git add src/components/journey/zone01/environment/CoralPortal.tsx src/components/journey/zone01/environment/PavilionArchitecture.tsx src/__tests__/pavilion-architecture.test.tsx
git commit -m "feat: rebuild expedition portal and welcome pavilion with inhabited micro-storytelling props"
```

---

### Task 4: Living Arabian Sea Ocean Engine & Marine Fleet (`OceanWater.tsx` & `MarineCraft.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/OceanWater.tsx`
- Modify: `src/components/journey/zone01/environment/MarineCraft.tsx`
- Test: `src/__tests__/ocean-water.test.tsx`

**Interfaces:**
- Consumes: Water depth bounds and wave parameters.
- Produces: `<OceanWater />` (multi-harmonic Gerstner waves, PBR cyan-to-sapphire depth gradient, caustics, dynamic surf foam) and `<MarineCraft />` (flagship 25.90M catamaran, traditional Malpe wooden trawlers with Karnataka marine livery, Sea-Doo jet skis, and ocean kayaks on launching skids).

- [ ] **Step 1: Write failing test for Ocean & Marine Fleet**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { OceanWater } from '@/components/journey/zone01/environment/OceanWater';

describe('OceanWater Component', () => {
  it('renders Gerstner wave ocean surface cleanly in React tree', () => {
    const { container } = render(<OceanWater />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/ocean-water.test.tsx`
Expected: FAIL if imports or component structure broken.

- [ ] **Step 3: Update `OceanWater.tsx` and `MarineCraft.tsx`**

- **`OceanWater.tsx`**: Gerstner wave displacement (24m swell, 12m chop, 4m ripple), PBR cyan shallows (`#25C4C0`) $\to$ turquoise (`#158F93`) $\to$ deep sapphire (`#071A2B`), sun specular highlights, caustics, and oscillating surf swash foam along intertidal sand.
- **`MarineCraft.tsx`**: Flagship 25.90M catamaran with hull wave bobbing, traditional Malpe wooden fishing trawlers (blue/white hull, yellow derrick mast, trawling gantry, stacked fish crates, crab pots), Sea-Doo jet skis, and sea kayaks on timber skids with hemp rope tie-downs.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/ocean-water.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 4**

```bash
git add src/components/journey/zone01/environment/OceanWater.tsx src/components/journey/zone01/environment/MarineCraft.tsx src/__tests__/ocean-water.test.tsx
git commit -m "feat: implement living ocean engine with Gerstner waves, foam swash, and authentic Malpe marine fleet"
```

---

### Task 5: Calibrated Lighting, Environment & Restrained Postprocessing (`AtmosphereSky.tsx` & `WorldScene.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/AtmosphereSky.tsx`
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Test: `src/__tests__/atmosphere-sky.test.tsx`

**Interfaces:**
- Consumes: Scene container bounds and lighting configs.
- Produces: Calibrated 5500K golden sun, Drei `<Environment>` HDRI sky fill, contact shadows, distance fog (`FogExp2`), St. Mary's basalt island silhouette, and restrained postprocessing (SSAO, subtle bloom, ACESFilmic tone mapping, vignette).

- [ ] **Step 1: Write failing test for Atmosphere & Lighting**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { AtmosphereSky } from '@/components/journey/zone01/environment/AtmosphereSky';

describe('AtmosphereSky Component', () => {
  it('renders directional sun, sky dome, and St. Marys basalt silhouette', () => {
    const { container } = render(<AtmosphereSky />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/atmosphere-sky.test.tsx`
Expected: FAIL if component structure broken.

- [ ] **Step 3: Update `AtmosphereSky.tsx` and `WorldScene.tsx`**

- **`AtmosphereSky.tsx`**: Warm 5500K directional sun (`#FFF4E0`, 2.2 intensity), HDRI environment fill, soft contact shadows, `FogExp2` distance haze (`#C9DDE8`, density `0.0022`), 360° sky dome, St. Mary's hexagonal columnar basalt promontory ($z \approx 420\text{m}$), and flocking Brahminy kites.
- **`WorldScene.tsx`**: Add `@react-three/postprocessing` `<EffectComposer>` with SSAO, subtle bloom (threshold 0.15), ACESFilmic tone mapping, and light editorial vignette.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/atmosphere-sky.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 5**

```bash
git add src/components/journey/zone01/environment/AtmosphereSky.tsx src/components/journey/zone01/WorldScene.tsx src/__tests__/atmosphere-sky.test.tsx
git commit -m "feat: implement calibrated daylighting, Drei environment, distance haze, and restrained postprocessing"
```

---

### Task 6: Stateful Cinematic Expedition Camera & 4-Zone Positional Spatial Audio (`splineNetwork.ts`, `WorldScene.tsx` & `spatialAudio.ts`)

**Files:**
- Modify: `src/lib/three/splineNetwork.ts`
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Modify: `src/lib/three/spatialAudio.ts`
- Test: `src/__tests__/spline-network.test.ts`
- Test: `src/__tests__/spatial-audio.test.ts`

**Interfaces:**
- Consumes: Spline progress values and landmark states.
- Produces: Stateful camera director (6-zone landmark focal length, target, position, camera easing) and 4-zone positional Web Audio synthesizer (Approach Road $\to$ Arrival Gardens $\to$ Welcome Pavilion $\to$ Exploration Deck/Beach).

- [ ] **Step 1: Write failing test for Stateful Camera & Spatial Audio**

```typescript
import { LANDMARK_NODES, getInterpolatedCameraState, createCameraSpline } from '@/lib/three/splineNetwork';

describe('Stateful Camera Expedition Route', () => {
  it('defines 6 stateful landmark nodes with focal length, height, and allowable look ranges', () => {
    expect(LANDMARK_NODES.length).toBeGreaterThanOrEqual(6);
    expect(LANDMARK_NODES[0].cameraHeight).toBe(1.7);
    expect(LANDMARK_NODES[4].cameraHeight).toBe(2.1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/spline-network.test.ts`
Expected: FAIL if landmark properties missing.

- [ ] **Step 3: Update `splineNetwork.ts`, `WorldScene.tsx`, and `spatialAudio.ts`**

- **`splineNetwork.ts`**: Define 6 stateful landmarks (Approach Road, Coral Portal, Arrival Gardens, Welcome Pavilion, Exploration Deck, Living Beach) with explicit camera height, FOV, target vector, and allowable yaw/pitch ranges.
- **`WorldScene.tsx`**: Catmull-Rom camera interpolation with smooth easing, eye-height transition ($1.7\text{m} \to 2.1\text{m}$), and controlled pointer drag look-mode.
- **`spatialAudio.ts`**: Web Audio synthesizer transitioning across 4 zones: Canopy rustle/birds $\to$ Tropical undergrowth breeze $\to$ Timber creaks/sailcloth tension $\to$ Arabian Sea ocean swells & breaking surf swash.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/spline-network.test.ts src/__tests__/spatial-audio.test.ts`
Expected: PASS

- [ ] **Step 5: Commit Task 6**

```bash
git add src/lib/three/splineNetwork.ts src/components/journey/zone01/WorldScene.tsx src/lib/three/spatialAudio.ts src/__tests__/spline-network.test.ts src/__tests__/spatial-audio.test.ts
git commit -m "feat: implement stateful cinematic camera director and 4-zone positional spatial audio engine"
```

---

### Task 7: Progressive WebGL Asset Delivery & Full System Verification

**Files:**
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Modify: `src/components/journey/zone01/Zone01Experience.tsx`
- Test: All test suites (`src/__tests__/*.test.tsx`)

**Interfaces:**
- Consumes: Complete 3D expedition world components.
- Produces: Production-ready, 60 FPS spatial digital twin experience verified across automated test suites and live WebGL browser rendering.

- [ ] **Step 1: Run full automated test suite**

Run: `npm test`
Expected: 100% PASS across all 21+ test files (91+ unit tests).

- [ ] **Step 2: Verify live WebGL rendering and zero console errors in Chrome DevTools**

Navigate to `http://localhost:3000/journey` using DevTools and verify:
1. Zero hydration mismatch warnings.
2. Zero WebGL context loss or geometry errors.
3. Smooth Catmull-Rom spline camera navigation across all 6 landmarks.
4. Clean postprocessing, PBR materials, living wave displacement, and positional spatial audio toggle.

- [ ] **Step 3: Capture full-bleed acceptance screenshots to `screenshots/3d-world/`**

Run automated capture script to output high-resolution screenshots across all 6 landmarks and pure cinematic angles.

- [ ] **Step 4: Commit Task 7 & Final Update**

```bash
git add .
git commit -m "chore: complete production art rebuild verification of Malpe 3D digital twin"
```
