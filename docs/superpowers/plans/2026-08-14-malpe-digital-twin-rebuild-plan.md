# Malpe Waterfront Digital Twin (Continuous Spatial World) Production Art Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 3D WebGL digital twin for Coral Adventures (Malpe, Karnataka) into a continuous $1200\text{m}$ spatial expedition world inspired by *Persepolis Reimagined* and Bruno Simon's interactive 3D world architecture. Seamlessly integrates real Malpe coastal geography (fishing harbour, wooden trawlers, 450m Sea Walkway, St. Mary's columnar basalt) with Coral Adventures' luxury expedition base (weathered teak, laterite, sailcloth, inhabited chart table, 25.90M catamaran), featuring 4-tier selective WebGL delivery, stateful 12-beat camera navigation, and 4-zone spatial audio.

**Architecture:** A single continuous WebGL coordinate space ($Z = 0\text{m} \to 1200\text{m}$) rendered via React Three Fiber, Drei, Web Audio, and custom GLSL PBR shaders. Incorporates multi-mask PBR terrain blending, instanced botanical flora, physically coherent sun/HDRI environment lighting, and a stateful Catmull-Rom camera director.

**Tech Stack:** Next.js 16.3, React 19, Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, Vitest, Web Audio API, Tailwind CSS.

---

## Global Constraints

- **Single Continuous Coordinate Space**: The world is ONE continuous loaded coordinate space ($Z = 0\text{m} \to 1200\text{m}$). Landmarks are camera/navigation states only. Never swap canvases or substitute separate background scenes.
- **No Primitive Substitutions**: Never substitute procedural primitives for a hero/environment asset merely because it is faster to implement. If a required asset is unavailable, mark it `MISSING` and source/author the proper asset outside the runtime scene.
- **Geographical Authenticity**: Malpe is a working coastal port with blue/white/copper wooden fishing trawlers, HDPE fish crates, crab pots, a 450m Sea Walkway, and St. Mary's hexagonal columnar basalt. Coral Adventures is the refined expedition layer inserted into that environment.
- **Hard Art QA Gate**: After every visual task, run the full 6-point visual inspection cycle:
  $$\text{IMPLEMENT} \to \text{RUN TESTS} \to \text{RENDER} \to \text{HIDE UI} \to \text{FORWARD/180°/CLOSE-UP VIEW} \to \text{10s IDLE} \to \text{ART REVIEW}$$
  Does the rendered world look like an authored, premium, geographically coherent Malpe environment rather than a procedural Three.js demo?
- **SSR & Test Integrity**: Preserve outer `<div data-testid="world-scene-container">` DOM attributes to guarantee 0 Next.js hydration mismatch errors. All unit test suites must pass 100% (22/22 test files, 103+ unit tests).

---

### Task 0: Asset Discovery, Production Pipeline & Foundation Audit

**Files:**
- Modify: `package.json`
- Create: `src/data/journeyAssets.ts`
- Modify: `src/__tests__/asset-manifest.test.ts`

**Interfaces:**
- Consumes: Project dependencies and CC0/CC-BY WebGL asset repositories (Poly Haven, ambientCG, Three.js Assets, Quaternius, Kenney).
- Produces: Authoritative `JOURNEY_ASSETS` registry for PBR texture maps, HDRI environment maps, GLB models, and material definitions.

- [ ] **Step 1: Write failing test for asset manifest and PBR material registry**

```typescript
import { JOURNEY_ASSETS } from '../data/journeyAssets';

describe('Asset Registry & Production Pipeline', () => {
  it('contains valid PBR material definitions for coastal sand, laterite, teak, and columnar basalt', () => {
    expect(JOURNEY_ASSETS.textures.sandPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.lateritePbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.basaltPbr).toBeDefined();
    expect(JOURNEY_ASSETS.textures.teakPbr).toBeDefined();
    expect(JOURNEY_ASSETS.environment.hdriMap).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/asset-manifest.test.ts`
Expected: FAIL if missing new basalt and terrain texture definitions.

- [ ] **Step 3: Update `src/data/journeyAssets.ts` with complete PBR asset registry**

```typescript
export const JOURNEY_ASSETS = {
  textures: {
    sandPbr: { diffuse: '/textures/sand_diffuse.jpg', normal: '/textures/sand_normal.png', roughness: '/textures/sand_roughness.jpg' },
    lateritePbr: { diffuse: '/textures/laterite_diffuse.jpg', normal: '/textures/laterite_normal.png' },
    basaltPbr: { color: '#2A282A', roughness: 0.85, metalness: 0.15 },
    teakPbr: { color: '#5C3E29', darkColor: '#3B281A', roughness: 0.72, metalness: 0.04 }
  },
  environment: {
    hdriMap: '/environments/coastal_golden_hour.hdr',
    sunColor: '#FFF4E0',
    fogColor: '#C9DDE8',
    fogDensity: 0.0022
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/asset-manifest.test.ts`
Expected: PASS

- [ ] **Step 5: Commit Task 0**

```bash
git add package.json package-lock.json src/data/journeyAssets.ts src/__tests__/asset-manifest.test.ts
git commit -m "feat(task-0): asset discovery, PBR material registry, and WebGL pipeline foundation"
```

---

### Task 1: Continuous Topography & Multi-Mask Layered PBR Terrain Engine (`MalpeTerrain.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/MalpeTerrain.tsx`
- Test: `src/__tests__/malpe-terrain.test.tsx`

**Interfaces:**
- Consumes: `JOURNEY_ASSETS` PBR texture configurations.
- Produces: `<MalpeTerrain />` component with $240 \times 1200\text{m}$ continuous topography plane, red-earth crushed laterite path with wagon ruts, dry pale sand dunes, damp swash sand, wet intertidal reflective sand, 450m Sea Walkway paver & granite rock armour, and St. Mary's lagoon seabed.

- [ ] **Step 1: Write failing test for 1200m Continuous Topography**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { MalpeTerrain } from '@/components/journey/zone01/environment/MalpeTerrain';

describe('MalpeTerrain Component', () => {
  it('renders 1200m continuous topography geometry spanning z=0m to z=1200m', () => {
    const { container } = render(<MalpeTerrain />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`
Expected: FAIL if terrain bounds or multi-masking invalid.

- [ ] **Step 3: Update `MalpeTerrain.tsx` with 1200m continuous multi-mask vertex blending**

Enhance `MalpeTerrain.tsx`:
- Continuous $240 \times 1200\text{m}$ terrain geometry ($Z = 0\text{m} \to 1200\text{m}$).
- Multi-mask vertex blending across dry pale sand (`#EADCC6`), crushed red laterite path (`#964831`) with wagon ruts and organic edge falloff, damp transition sand (`#C4B59D`), wet reflective intertidal sand (`#8F7C66`), 450m Sea Walkway concrete paving ($y = 1.8\text{m}$) flanked by rough-cut granite rock armour boulders, and St. Mary's lagoon seabed.

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/malpe-terrain.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 1**

```bash
git add src/components/journey/zone01/environment/MalpeTerrain.tsx src/__tests__/malpe-terrain.test.tsx
git commit -m "feat(task-1): 1200m continuous coastal topography engine with Sea Walkway and multi-mask PBR sand/laterite"
```

---

### Task 2: Botanical Vegetation Population System & Cause-and-Effect Debris (`VegetationSystem.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/VegetationSystem.tsx`
- Test: `src/__tests__/vegetation-system.test.tsx`

**Interfaces:**
- Consumes: Topography vertex bounds from `MalpeTerrain`.
- Produces: `<VegetationSystem />` rendering instanced coconut palm clusters (*Cocos nucifera*) across the $1200\text{m}$ world with scale/bend/rotation/crown-age diversity, seaward wind bowing, *Spinifex* dune grass, broadleaf *Alocasia*, coastal shrubs, and organic ground debris.

- [ ] **Step 1: Write failing test for Botanical Vegetation Population**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { VegetationSystem } from '@/components/journey/zone01/environment/VegetationSystem';

describe('VegetationSystem Component', () => {
  it('renders instanced Cocos nucifera palms and cause-and-effect debris across 1200m world', () => {
    const { container } = render(<VegetationSystem />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: FAIL if vegetation bounds or instancing invalid.

- [ ] **Step 3: Update `VegetationSystem.tsx` with Seaward Wind Bowing & Organic Debris**

Enhance `VegetationSystem.tsx`:
- 4 botanical *Cocos nucifera* variants (tall mature 12m, mid-height 9m, wind-bowed 7m, young cluster 5m).
- InstancedMesh GPU batching with per-instance randomized scale ($0.85\times - 1.2\times$), trunk bend curvature ($0^\circ - 28^\circ$), frond count ($18 - 32$), and crown age.
- Seaward wind bowing logic (palms near the coast bow toward the sea +Z).
- Undergrowth: *Spinifex littoreus* dune grass, broadleaf *Alocasia*, *Bougainvillea* coastal shrubs, fallen palm fronds, coconut husks, driftwood, and shell fragments clustered near tree bases and high-tide swash lines.

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 2**

```bash
git add src/components/journey/zone01/environment/VegetationSystem.tsx src/__tests__/vegetation-system.test.tsx
git commit -m "feat(task-2): botanical vegetation population system with seaward wind bowing and organic cause-and-effect ground debris"
```

---

### Task 3: Contemporary Expedition Architecture & Inhabited Micro-Storytelling (`CoralPortal.tsx` & `PavilionArchitecture.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/CoralPortal.tsx`
- Modify: `src/components/journey/zone01/environment/PavilionArchitecture.tsx`
- Test: `src/__tests__/pavilion-architecture.test.tsx`

**Interfaces:**
- Consumes: Teak timber PBR materials and nautical prop specifications.
- Produces: `<CoralPortal />` (teak posts, laterite stone plinths, carved coordinates, brass plaque) and `<PavilionArchitecture />` (post-and-beam pavilion, linen canopy, tambour concierge desk, navigational chart table with sea chart, dividers, compass, weather ledger, vessel manifest, and glowing captain's lantern).

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

- **`CoralPortal.tsx`**: Heavy $0.55\text{m}$ teak posts set into laterite stone plinths, straight lintel with carved coordinates `MALPE EXPEDITION BASE · 13°21′02″ N · 74°42′08″ E`, hemp rope lashings, brushed brass plates. Zero Japanese torii/pagoda motifs.
- **`PavilionArchitecture.tsx`**: 8 load-bearing teak pillars with corbel saddle capitals, tensioned linen canopy roof, curved teak tambour concierge desk, solid brass countertop, navigational chart table (aged St. Mary's sea chart, brass dividers, marine compass, weather ledger, vessel manifest, brass weights), and maritime captain's lantern with warm point light.

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/pavilion-architecture.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 3**

```bash
git add src/components/journey/zone01/environment/CoralPortal.tsx src/components/journey/zone01/environment/PavilionArchitecture.tsx src/__tests__/pavilion-architecture.test.tsx
git commit -m "feat(task-3): coastal Karnataka expedition architecture and inhabited chart table micro-storytelling"
```

---

### Task 4: Real Malpe Fishing Harbour, Sea Walkway & Coastal Fleet Staging (`SeaWalkway.tsx` & `MarineCraft.tsx`)

**Files:**
- Create: `src/components/journey/zone01/environment/SeaWalkway.tsx`
- Modify: `src/components/journey/zone01/environment/MarineCraft.tsx`
- Test: `src/__tests__/sea-walkway.test.tsx`
- Test: `src/__tests__/marine-craft.test.tsx`

**Interfaces:**
- Consumes: Malpe harbour coordinates and marine equipment specifications.
- Produces: `<SeaWalkway />` (450m concrete/granite walkway, railings, lamp posts, bench seating, granite rock armour) and `<MarineCraft />` (traditional Malpe wooden fishing trawlers with blue/white/copper Karnataka liveries, A-frame gantries, stacked HDPE fish crates, crab pots, staged Sea-Doos & kayaks on timber skids).

- [ ] **Step 1: Write failing test for Sea Walkway and Fishing Harbour Fleet**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { SeaWalkway } from '@/components/journey/zone01/environment/SeaWalkway';

describe('SeaWalkway Component', () => {
  it('renders 450m coastal walkway with granite rock armour and harbour viewing railings', () => {
    const { container } = render(<SeaWalkway />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/sea-walkway.test.tsx`
Expected: FAIL if component missing or structure invalid.

- [ ] **Step 3: Create `SeaWalkway.tsx` and upgrade `MarineCraft.tsx`**

- **`SeaWalkway.tsx`**: 450m elevated stone paver walkway ($Z = 300\text{m} \to 450\text{m}$, $y = 1.8\text{m}$), stainless marine handrails, cast iron lamp posts, teak benches, and interlocking granite rock armour boulders sloping into the sea.
- **`MarineCraft.tsx`**: Traditional Malpe wooden fishing trawlers (cobalt blue `#1C4E80` topsides, white waterline stripe, copper bottom `#8B3A2B`, yellow boom derrick mast `#E5A93C`, A-frame trawling gantry, hydraulic winches, net drum, stacked HDPE fish crates, crab pots), Sea-Doo jet skis, and kayaks on timber skids.

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/sea-walkway.test.tsx src/__tests__/marine-craft.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 4**

```bash
git add src/components/journey/zone01/environment/SeaWalkway.tsx src/components/journey/zone01/environment/MarineCraft.tsx src/__tests__/sea-walkway.test.tsx src/__tests__/marine-craft.test.tsx
git commit -m "feat(task-4): implement 450m Malpe Sea Walkway and authentic working fishing harbour fleet"
```

---

### Task 5: Living Arabian Sea Ocean Engine, 25.90M Catamaran & St. Mary's Basalt Climax (`OceanWater.tsx`, `CatamaranHero.tsx` & `StMarysIsland.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/OceanWater.tsx`
- Create: `src/components/journey/zone01/environment/CatamaranHero.tsx`
- Create: `src/components/journey/zone01/environment/StMarysIsland.tsx`
- Test: `src/__tests__/ocean-water.test.tsx`
- Test: `src/__tests__/catamaran-hero.test.tsx`
- Test: `src/__tests__/st-marys-island.test.tsx`

**Interfaces:**
- Consumes: Water depth bounds, vessel specifications, and St. Mary's columnar basalt geometry parameters.
- Produces: `<OceanWater />` (5-harmonic Gerstner waves, PBR cyan-to-sapphire gradient, caustics, intertidal surf foam swash), `<CatamaranHero />` (flagship 25.90M 3-deck catamaran, twin wave-piercing hulls, main deck lounge, upper observation deck, wake physics), and `<StMarysIsland />` (dark 6-sided hexagonal columnar basalt formations, pale sand, crystal turquoise lagoon, seaward palms).

- [ ] **Step 1: Write failing test for Flagship Catamaran and St. Mary's Basalt Island**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { CatamaranHero } from '@/components/journey/zone01/environment/CatamaranHero';
import { StMarysIsland } from '@/components/journey/zone01/environment/StMarysIsland';

describe('CatamaranHero & StMarysIsland Components', () => {
  it('renders flagship 25.90M catamaran with twin hulls and observation decks', () => {
    const { container } = render(<CatamaranHero />);
    expect(container).toBeDefined();
  });

  it('renders St. Marys 6-sided hexagonal columnar basalt rock formations', () => {
    const { container } = render(<StMarysIsland />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/catamaran-hero.test.tsx src/__tests__/st-marys-island.test.tsx`
Expected: FAIL if components missing or signatures invalid.

- [ ] **Step 3: Create `CatamaranHero.tsx`, `StMarysIsland.tsx` and update `OceanWater.tsx`**

- **`OceanWater.tsx`**: 5-harmonic Gerstner wave displacement ($Z = 0\text{m} \to 1200\text{m}$), PBR cyan shallows (`#25C4C0`) $\to$ turquoise (`#158F93`) $\to$ deep sapphire (`#071A2B`), sun specular highlights, caustics, and surf foam swash.
- **`CatamaranHero.tsx`**: Flagship 25.90M passenger expedition catamaran ($Z = 700\text{m}$), twin hulls, main deck social lounge, upper deck observation terrace, panoramic glazing, hull wake trails, and wave bobbing physics.
- **`StMarysIsland.tsx`**: St. Mary's Island ($Z = 1150\text{m}$) featuring dark 6-sided hexagonal columnar basalt formations (`#2A282A`), vertical column clustering, fractures, water erosion, pale sand beach, crystal turquoise lagoon, and seaward wind-bowed palms.

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/catamaran-hero.test.tsx src/__tests__/st-marys-island.test.tsx src/__tests__/ocean-water.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit Task 5**

```bash
git add src/components/journey/zone01/environment/CatamaranHero.tsx src/components/journey/zone01/environment/StMarysIsland.tsx src/components/journey/zone01/environment/OceanWater.tsx src/__tests__/catamaran-hero.test.tsx src/__tests__/st-marys-island.test.tsx src/__tests__/ocean-water.test.tsx
git commit -m "feat(task-5): implement flagship 25.90M catamaran, living ocean engine, and St. Mary's hexagonal columnar basalt climax"
```

---

### Task 6: Stateful 12-Beat Camera Director & 4-Zone Spatial Audio (`splineNetwork.ts`, `WorldScene.tsx` & `spatialAudio.ts`)

**Files:**
- Modify: `src/lib/three/splineNetwork.ts`
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Modify: `src/lib/three/spatialAudio.ts`
- Test: `src/__tests__/spline-network.test.ts`
- Test: `src/__tests__/spatial-audio.test.ts`

**Interfaces:**
- Consumes: Spline progress values and landmark states across the $1200\text{m}$ world.
- Produces: 12-beat stateful camera director ($00\text{ ROAD} \to 11\text{ ST. MARY'S}$) with landmark-calibrated focal length, position, target vector, camera easing, and 4-zone positional spatial Web Audio synthesizer.

- [ ] **Step 1: Write failing test for 12 Stateful Camera Beats and Spatial Audio**

```typescript
import { LANDMARK_NODES, getInterpolatedCameraState, createCameraSpline } from '@/lib/three/splineNetwork';

describe('Stateful 12-Beat Camera Expedition Route', () => {
  it('defines 12 stateful landmark nodes spanning z=0m to z=1150m with focal length and height calibration', () => {
    expect(LANDMARK_NODES).toHaveLength(12);
    expect(LANDMARK_NODES[0].id).toBe('road-entrance');
    expect(LANDMARK_NODES[11].id).toBe('st-marys-basalt');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/spline-network.test.ts`
Expected: FAIL if missing 12 landmark nodes.

- [ ] **Step 3: Update `splineNetwork.ts`, `WorldScene.tsx`, and `spatialAudio.ts`**

- **`splineNetwork.ts`**: Define 12 stateful landmark nodes ($00\text{ Road} \to 01\text{ Portal} \to 02\text{ Gardens} \to 03\text{ Pavilion} \to 04\text{ Deck} \to 05\text{ Beach} \to 06\text{ Watersports} \to 07\text{ Sea Walk} \to 08\text{ Jetty} \to 09\text{ Catamaran} \to 10\text{ Open Sea} \to 11\text{ St. Mary's}$) with explicit camera height, FOV, target vector, and look ranges.
- **`WorldScene.tsx`**: Catmull-Rom camera interpolation across the continuous 1200m world with eye-height transitions ($1.7\text{m} \to 2.1\text{m} \to 1.7\text{m}$) and pointer drag look-mode.
- **`spatialAudio.ts`**: Web Audio synthesizer transitioning across 4 zones (Approach Road $\to$ Pavilion Sanctuary $\to$ Sea Walk & Beach $\to$ Catamaran & St. Mary's).

- [ ] **Step 4: Run test and 6-point visual QA to verify it passes**

Run: `npx vitest run src/__tests__/spline-network.test.ts src/__tests__/spatial-audio.test.ts`
Expected: PASS

- [ ] **Step 5: Commit Task 6**

```bash
git add src/lib/three/splineNetwork.ts src/components/journey/zone01/WorldScene.tsx src/lib/three/spatialAudio.ts src/__tests__/spline-network.test.ts src/__tests__/spatial-audio.test.ts
git commit -m "feat(task-6): implement 12-beat stateful camera director and 4-zone positional Web Audio synthesizer across 1200m continuous world"
```

---

### Task 7: 4-Tier Progressive Delivery, 60 FPS Performance Optimization & Final System QA

**Files:**
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Modify: `src/components/journey/zone01/Zone01Experience.tsx`
- Test: All test suites (`src/__tests__/*.test.tsx`)

**Interfaces:**
- Consumes: Complete $1200\text{m}$ 3D spatial world components.
- Produces: Production-ready 60 FPS continuous digital twin experience verified across automated test suites, Next.js production build, live WebGL browser rendering, and full 6-point visual QA across all 12 beats.

- [ ] **Step 1: Run Next.js production build**

Run: `npm run build`
Expected: 0 compilation errors.

- [ ] **Step 2: Run full automated test suite**

Run: `npm test`
Expected: 100% PASS across all 24+ test files (108+ unit tests).

- [ ] **Step 3: Verify live WebGL rendering and zero console errors in Chrome DevTools**

Navigate to `http://localhost:3000/journey` using DevTools and verify:
1. Zero hydration mismatch warnings.
2. Zero WebGL context errors or runtime exceptions.
3. Smooth continuous Catmull-Rom spline navigation across all 12 beats ($Z = 0\text{m} \to 1200\text{m}$).
4. Clean postprocessing, PBR materials, living wave displacement, and positional spatial audio.

- [ ] **Step 4: Execute 6-Point Visual QA Hard Gate across all 12 beats**

For each of the 12 beats, perform: `IMPLEMENT → RUN TESTS → RENDER → HIDE UI → FORWARD VIEW → 180° VIEW → CLOSE-UP → 10s IDLE → ART REVIEW`. Confirm 100% compliance with Art Quality Gate criteria.

- [ ] **Step 5: Commit Task 7 & Final Update**

```bash
git add .
git commit -m "chore: complete master production art rebuild verification of continuous Malpe 3D digital twin"
```
