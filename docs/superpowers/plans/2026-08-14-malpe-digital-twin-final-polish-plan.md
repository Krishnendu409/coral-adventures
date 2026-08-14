# Master Final Polish & Ecological Realism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the master final polish layer for the Coral Adventures Malpe 3D Digital Twin continuous spatial world experience ($Z = 0\text{m} \to 1200\text{m}$). Includes coastal golden hour sunset lighting, 600+ instanced coconut palms, active watersports (high-altitude parasail, jet skis with spray wakes, kayaks), native Arabian Sea wildlife (soaring Brahminy kites, sea gulls, leaping dolphins, shallow fish schools), and ultra-smooth 12-beat camera spline easing.

---

### Task 0: Create Native Arabian Sea Wildlife System (`WildlifeSystem.tsx`)

**Files:**
- Create: `src/components/journey/zone01/environment/WildlifeSystem.tsx`
- Create: `src/__tests__/wildlife-system.test.tsx`
- Modify: `src/components/journey/zone01/WorldScene.tsx`

**Interfaces:**
- Consumes: Spatial world coordinates ($Z = 0\text{m} \to 1200\text{m}$).
- Produces: `<WildlifeSystem />` component with 14 soaring Brahminy sea birds, leaping dolphin pod ($Z = 650\text{m} \to 750\text{m}$) with splash rings, and animated silver fish schools swimming below crystal cyan shallows ($Z = 195\text{m} \to 220\text{m}$).

- [ ] **Step 1: Write failing test for WildlifeSystem**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { WildlifeSystem } from '@/components/journey/zone01/environment/WildlifeSystem';

describe('WildlifeSystem Component', () => {
  it('renders Brahminy sea birds, leaping dolphins, and shallow fish schools cleanly', () => {
    const { container } = render(<WildlifeSystem />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/wildlife-system.test.tsx`
Expected: FAIL (file missing).

- [ ] **Step 3: Create `WildlifeSystem.tsx` and mount in `WorldScene.tsx`**

Implement `WildlifeSystem.tsx`:
- Soaring Brahminy sea birds flying in aerodynamic thermal circles above the road, pavilion, and Sea Walkway.
- Pod of 3 humpback dolphins leaping near the catamaran ($Z = 650\text{m} \to 750\text{m}$) with dynamic water splash particle rings.
- Shallow water fish schools swimming in wave currents near the intertidal swash ($Z = 195\text{m} \to 220\text{m}$).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/wildlife-system.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 0**

```bash
git add src/components/journey/zone01/environment/WildlifeSystem.tsx src/__tests__/wildlife-system.test.tsx src/components/journey/zone01/WorldScene.tsx
git commit -m "feat(task-0): implement native Arabian Sea wildlife system with soaring birds, leaping dolphins, and fish schools"
```

---

### Task 1: Transform Atmosphere to Breathtaking Coastal Sunset (`AtmosphereSky.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/AtmosphereSky.tsx`
- Test: `src/__tests__/atmosphere-sky.test.tsx`

**Interfaces:**
- Consumes: Calibrated sunset HSL color tokens and lighting parameters.
- Produces: 5200K golden solar angle, rich Rayleigh/Mie sky dome gradient, long golden shadows, and volumetric distance fog matching horizon haze.

- [ ] **Step 1: Write failing test for Sunset Atmosphere**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { AtmosphereSky } from '@/components/journey/zone01/environment/AtmosphereSky';

describe('AtmosphereSky Component', () => {
  it('renders coastal golden hour sunset sky dome and warm 5200K lighting rig', () => {
    const { container } = render(<AtmosphereSky />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if expectations change**

Run: `npx vitest run src/__tests__/atmosphere-sky.test.tsx`

- [ ] **Step 3: Update `AtmosphereSky.tsx` with Coastal Golden Hour Sunset Shader & Lighting**

Enhance `AtmosphereSky.tsx`:
- Sky dome gradient: zenith navy (`#1B3B6F`) $\to$ tropical sky (`#3B629B`) $\to$ golden amber (`#E07A5F`) $\to$ horizon crimson-pink (`#F4A261`).
- 5200K sun direction ($12^\circ$ altitude above horizon), warm ambient ground bounce, long directional shadows.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/atmosphere-sky.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 1**

```bash
git add src/components/journey/zone01/environment/AtmosphereSky.tsx src/__tests__/atmosphere-sky.test.tsx
git commit -m "feat(task-1): transform lighting and sky dome to coastal golden hour sunset"
```

---

### Task 2: Expand Coconut Palm Population to 600+ Trees (`VegetationSystem.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/VegetationSystem.tsx`
- Test: `src/__tests__/vegetation-system.test.tsx`

**Interfaces:**
- Consumes: Topography bounds from `MalpeTerrain.tsx`.
- Produces: 600+ instanced coconut palms (*Cocos nucifera*) across $Z = 0\text{m} \to 1200\text{m}$ with seaward wind bowing, randomized frond droop age, dune grass, and organic ground debris.

- [ ] **Step 1: Write failing test for 600+ Palm Population**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { VegetationSystem } from '@/components/journey/zone01/environment/VegetationSystem';

describe('VegetationSystem Component', () => {
  it('renders 600+ instanced palms across 1200m world space', () => {
    const { container } = render(<VegetationSystem />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if density invalid**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`

- [ ] **Step 3: Update `VegetationSystem.tsx` with expanded 600+ palm density**

Enhance `VegetationSystem.tsx`:
- Double palm instance counts (600+ total trees across $Z = 0\text{m} \to 1200\text{m}$) using 4 botanical variants with seaward wind bowing, undergrowth, and organic ground debris.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/vegetation-system.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 2**

```bash
git add src/components/journey/zone01/environment/VegetationSystem.tsx src/__tests__/vegetation-system.test.tsx
git commit -m "feat(task-2): expand coconut palm groves to 600+ instanced trees across 1200m world"
```

---

### Task 3: Enrich Active Watersports & Towing Parasail (`MarineCraft.tsx`)

**Files:**
- Modify: `src/components/journey/zone01/environment/MarineCraft.tsx`
- Test: `src/__tests__/marine-craft.test.tsx`

**Interfaces:**
- Consumes: Coastal water bounds and watersports equipment configurations.
- Produces: Active jet skis with particle spray wakes, high-altitude colorful parasail canopy ($Y = 45\text{m}$) towed by speed boat, and intertidal kayaks/paddleboards.

- [ ] **Step 1: Write failing test for Active Watersports & Parasail**

```typescript
import React from 'react';
import { render } from '@testing-library/react';
import { MarineCraft } from '@/components/journey/zone01/environment/MarineCraft';

describe('MarineCraft Active Watersports Component', () => {
  it('renders soaring parasail canopy and active jet skis with water spray wakes', () => {
    const { container } = render(<MarineCraft />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if components missing**

Run: `npx vitest run src/__tests__/marine-craft.test.tsx`

- [ ] **Step 3: Update `MarineCraft.tsx` with high-altitude parasail canopy and active jet skis**

Enhance `MarineCraft.tsx`:
- High-altitude colorful parasail canopy ($Y = 45\text{m}$, $Z = 400\text{m}$) with speed boat tow line.
- 2 active Sea-Doo jet skis cutting through ocean waves at $Z = 260\text{m}$ with particle water spray wakes and rider figures.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/marine-craft.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit Task 3**

```bash
git add src/components/journey/zone01/environment/MarineCraft.tsx src/__tests__/marine-craft.test.tsx
git commit -m "feat(task-3): enrich active coastal watersports with high-altitude parasail and jet ski spray wakes"
```

---

### Task 4: Final Camera Trajectory Easing & System QA (`splineNetwork.ts` & `WorldScene.tsx`)

**Files:**
- Modify: `src/lib/three/splineNetwork.ts`
- Modify: `src/components/journey/zone01/WorldScene.tsx`
- Test: All test suites (`src/__tests__/*.test.tsx`)

**Interfaces:**
- Consumes: Complete 12-beat continuous spatial world.
- Produces: Ultra-smooth 60 FPS continuous spatial expedition experience verified across automated unit tests (`npm test`), TypeScript typecheck (`npx tsc --noEmit`), Next.js production build (`npm run build`), and 6-point visual QA.

- [ ] **Step 1: Run Next.js production build**

Run: `npm run build`
Expected: 0 compilation errors.

- [ ] **Step 2: Run full Vitest test suite**

Run: `npm test`
Expected: 100% PASS across all 27+ test files.

- [ ] **Step 3: Check TypeScript typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Execute 6-Point Visual QA Hard Gate across all 12 beats**

Perform `IMPLEMENT → RUN TESTS → RENDER → HIDE UI → FORWARD VIEW → 180° VIEW → CLOSE-UP → 10s IDLE → ART REVIEW`.

- [ ] **Step 5: Commit Task 4 & Master Final Release**

```bash
git add .
git commit -m "chore: complete master final polish of continuous Malpe 3D digital twin"
```
