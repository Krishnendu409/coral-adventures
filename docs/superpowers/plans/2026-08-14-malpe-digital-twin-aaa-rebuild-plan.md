# Malpe Digital Twin AAA WebGL Complete Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute a complete AAA WebGL architecture rebuild for the Coral Adventures Malpe continuous 3D world ($Z = 0\text{m} \to 1200\text{m}$). Replaces procedural primitive geometry with an authentic game-engine resource architecture (`ResourceManager`, `AssetRegistry`, `ZoneLoader`, `LODManager`, `CameraDirector`, `PlayerController`), multi-layer PBR terrain mesh, 4 hero GLB botanical palm variants (*Cocos nucifera*), authored teak/laterite expedition architecture, active watersports, native Arabian Sea wildlife, and a navigable player controller.

---

### Task 0: Centralized Resource Manager & GLB Asset Pipeline (`ResourceManager.ts` & `journeyAssets.ts`)

**Files:**
- Create: `src/lib/three/ResourceManager.ts`
- Modify: `src/data/journeyAssets.ts`
- Create: `src/__tests__/resource-manager.test.ts`

**Interfaces:**
- Consumes: GLB model URIs, PBR texture maps, HDRI sky maps.
- Produces: `ResourceManager` singleton providing async loading, caching, glTF Draco/KTX2 decompression, texture map allocation, and fallback management.

- [ ] **Step 1: Write failing unit test for ResourceManager**

```typescript
import { resourceManager } from '@/lib/three/ResourceManager';
import { JOURNEY_ASSETS } from '@/data/journeyAssets';

describe('ResourceManager Singleton', () => {
  it('initializes asset cache and loads PBR textures and GLB models', async () => {
    expect(resourceManager).toBeDefined();
    expect(JOURNEY_ASSETS.models).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/resource-manager.test.ts`
Expected: FAIL (file missing).

- [ ] **Step 3: Create `ResourceManager.ts` and update `journeyAssets.ts`**

Implement `ResourceManager.ts`:
- Centralized model and texture caching singleton.
- Decompression support for glTF Draco/Meshopt.
- Texture map allocation (diffuse, normal, roughness, displacement, ambient occlusion).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/resource-manager.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit Task 0**

```bash
git add src/lib/three/ResourceManager.ts src/data/journeyAssets.ts src/__tests__/resource-manager.test.ts
git commit -m "feat(task-0): implement centralized game-engine ResourceManager and GLB asset pipeline"
```

---

### Task 1: Multi-Layer Blended PBR Terrain Mesh (`MalpeTerrain.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/MalpeTerrain.tsx`
- Test: `src/__tests__/malpe-terrain.test.tsx`

**Interfaces:**
- Consumes: `ResourceManager` terrain textures and heightmap displacement parameters.
- Produces: Continuous $240 \times 1200\text{m}$ topography mesh with natural slopes, dune micro-variations, irregular shoreline, cart ruts, and multi-layer PBR material blending (sand, laterite, damp swash, wet intertidal, Sea Walkway paver pier, granite rock armour).

- [ ] **Step 1: Write failing test for Multi-Layer Terrain Mesh**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { MalpeTerrain } from '@/components/journey/zone01/environment/MalpeTerrain';

describe('MalpeTerrain Component', () => {
  it('renders multi-layer blended PBR topography mesh across 1200m world', () => {
    const { container } = render(<MalpeTerrain />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if expectations change**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`

- [ ] **Step 3: Update `MalpeTerrain.tsx` with multi-layer PBR topography mesh**

Enhance `MalpeTerrain.tsx`:
- Replace flat plane with a continuous $240 \times 1200\text{m}$ displaced terrain mesh with heightmap elevation, dunes, cart ruts, and blended PBR materials.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 1**

```bash
git add src/components/journey/zone01/environment/MalpeTerrain.tsx src/__tests__/malpe-terrain.test.tsx
git commit -m "feat(task-1): implement multi-layer blended PBR topography mesh with dunes and cart ruts"
```

---

### Task 2: Botanical Palm GLB Instancing & Wind Shader (`VegetationSystem.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/VegetationSystem.tsx`
- Test: `src/__tests__/vegetation-system.test.tsx`

**Interfaces:**
- Consumes: Botanical palm GLB assets from `ResourceManager`.
- Produces: 600+ instanced palms (*Cocos nucifera*) featuring detailed bark, trunk ring scars, individual frond leaflet geometry, coconut clusters, seaward wind bowing, and per-instance phase offset wind sway vertex shaders.

- [ ] **Step 1: Write failing test for Botanical Palm Instancing**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { VegetationSystem } from '@/components/journey/zone01/environment/VegetationSystem';

describe('VegetationSystem Component', () => {
  it('renders 600+ botanical palm instances with seaward wind bowing logic', () => {
    const { container } = render(<VegetationSystem />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if expectations change**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`

- [ ] **Step 3: Update `VegetationSystem.tsx` with botanical GLB palms and per-instance wind sway**

Enhance `VegetationSystem.tsx`:
- 4 botanical palm variants (*Cocos nucifera*) with bark texture, trunk ring scars, frond leaflet geometry, coconut clusters, seaward wind bowing, and non-synchronous wind sway shaders.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 2**

```bash
git add src/components/journey/zone01/environment/VegetationSystem.tsx src/__tests__/vegetation-system.test.tsx
git commit -m "feat(task-2): implement botanical palm GLB instancing with per-instance wind sway shader"
```

---

### Task 3: Authored Karnataka Expedition Architecture GLB (`CoralPortal.tsx` & `PavilionArchitecture.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/CoralPortal.tsx`
- Modify: `src/components/journey/zone01/environment/PavilionArchitecture.tsx`
- Test: `src/__tests__/pavilion-architecture.test.tsx`

**Interfaces:**
- Consumes: Weathered teak PBR textures and nautical prop assets from `ResourceManager`.
- Produces: Authored Expedition Portal (teak vertical posts, laterite stone plinths, carved coordinates `13°21′02″ N · 74°42′08″ E`, brass plaque) and Open-Air Pavilion (post-and-beam joinery, tensioned sailcloth canopy, slatted teak tambour concierge desk, brass countertop, inhabited chart table with St. Mary's 1894 sea chart, dividers, compass, weather ledger, vessel manifest, and glowing captain's lantern).

- [ ] **Step 1: Write failing test for Authored Architecture & Inhabited Props**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { PavilionArchitecture } from '@/components/journey/zone01/environment/PavilionArchitecture';

describe('PavilionArchitecture Component', () => {
  it('renders authored teak post-and-beam pavilion and inhabited chart table props', () => {
    const { container } = render(<PavilionArchitecture />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if expectations change**

Run: `npx vitest run src/__tests__/pavilion-architecture.test.tsx`

- [ ] **Step 3: Update `CoralPortal.tsx` and `PavilionArchitecture.tsx`**

Enhance `CoralPortal.tsx` & `PavilionArchitecture.tsx`:
- Heavy $0.55\text{m}$ weathered teak posts, laterite stone plinths, carved coordinates `MALPE EXPEDITION BASE · 13°21′02″ N · 74°42′08″ E`, post-and-beam joinery, corbel saddle capitals, tensioned linen canopy roof, slatted teak tambour concierge desk, brass countertop, and inhabited chart table.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/pavilion-architecture.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 3**

```bash
git add src/components/journey/zone01/environment/CoralPortal.tsx src/components/journey/zone01/environment/PavilionArchitecture.tsx src/__tests__/pavilion-architecture.test.tsx
git commit -m "feat(task-3): implement authored Karnataka expedition architecture and inhabited chart table props"
```

---

### Task 4: Navigable WASD/Touch Player Controller & First Milestone QA (`PlayerController.ts` & `WorldScene.tsx`)

**Files:**
- Create: `src/lib/three/PlayerController.ts`
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Create: `src/__tests__/player-controller.test.ts`
- Test: All test suites (`src/__tests__/*.test.tsx`)

**Interfaces:**
- Consumes: Desktop WASD / Arrow keys, mouse look, and mobile touch input events.
- Produces: Navigable player movement controller with ground collision detection, acceleration/deceleration dampening, step height climbing, and seamless camera state blending across the First Milestone Vertical Slice ($Z = 0\text{m} \to 250\text{m}$).

- [ ] **Step 1: Write failing test for PlayerController**

```typescript
import { PlayerController } from '@/lib/three/PlayerController';

describe('PlayerController Class', () => {
  it('handles keyboard WASD input and updates player velocity and position', () => {
    const controller = new PlayerController();
    expect(controller).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/player-controller.test.ts`
Expected: FAIL (file missing).

- [ ] **Step 3: Create `PlayerController.ts` and integrate in `WorldScene.tsx`**

Implement `PlayerController.ts`:
- Desktop WASD / Arrow key movement, mouse look, ground height detection, smooth acceleration/deceleration, and seamless camera spline blending.

- [ ] **Step 4: Run Next.js production build (`npm run build`)**

Run: `npm run build`
Expected: 0 compilation errors.

- [ ] **Step 5: Run full Vitest test suite (`npm test`)**

Run: `npm test`
Expected: 100% PASS across all 28+ test files.

- [ ] **Step 6: Perform First Milestone 6-Point Hidden-UI Visual QA Gate**

Render the First Milestone Vertical Slice ($Z = 0\text{m} \to 250\text{m}$) with all UI hidden and confirm 100% compliance across Forward View, 180° Reverse View, Close-Up (1m), 10s Idle, Sunset Lighting Audit, and 60 FPS Performance Audit.

- [ ] **Step 7: Commit Task 4 & Master AAA Rebuild Milestone**

```bash
git add .
git commit -m "chore: complete AAA WebGL rebuild milestone with navigable player controller and full test suite verification"
```
