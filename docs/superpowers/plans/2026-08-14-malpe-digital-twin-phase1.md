# Malpe Waterfront Digital Twin (Phase 1: Six-Landmark Vertical Slice) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a museum-grade WebGL digital twin of the first six connected landmarks of Coral Adventures at Malpe Waterfront (*Arrival Road → Coral Portal → Arrival Gardens → Welcome Pavilion → Exploration Deck → Living Beach*), following the spatial storytelling architecture of Getty's *Persepolis Reimagined*.

**Architecture:** One continuous 3D world with a three-layer environmental hierarchy (Geography, Infrastructure, Living World), an eye-level human camera moving on an authored Catmull-Rom spline network with natural occlusion/reveals, physical Coral branding, true 4-zone location-attenuated spatial audio, and invisible discovery markers opening editorial expedition field notes.

**Tech Stack:** Next.js 16 (Turbopack), React 19, Three.js (`three`), Web Audio API, Vitest + React Testing Library.

---

## CRITICAL GOLDEN RULE

> **NO POLISHING BAD PLACEHOLDER GEOMETRY.**
> If an asset looks like a primitive, low-poly placeholder (box buildings, cone roofs, cylinder trunks, flat planes), replace it with a high-quality GLTF/GLB or authentic PBR scan. Do NOT compensate with lighting, post-processing, bloom, blur, shaders, or UI.

---

## Global Constraints

- All 6 landmarks exist inside ONE continuous 3D coordinate space `(x, y, z)` derived from the physical Malpe coastal geography.
- Camera moves on a continuous Catmull-Rom spline at human eye height (~1.7m) with physics damping and controlled look bounds.
- UI is strictly minimal and disappearing: top-left emblem + location, top-right Sound / Map / Exit controls. Zero persistent slide cards or progress bars.
- Discovery annotations use warm alabaster/linen surfaces (`#FDFCF7`), fine champagne-gold rules (`#C5A059`), serif headlines, and coordinates metadata. No glassmorphism.
- The 6 Production Quality Tests must pass before expanding to the Jetty & Catamaran.

---

## File Structure & Responsibilities

- `src/data/assetManifest.ts`: Authoritative asset inventory for every visible object with verified license, dimensions, polygon cost, and placement.
- `src/lib/three/worldCoordinates.ts`: Authored physical world layout, elevation contours, and landmark anchor coordinates.
- `src/lib/three/splineNetwork.ts`: Authored 3D Catmull-Rom camera spline, look-at targets, velocity curves, allowable look ranges, and audio zones derived from the world coordinates.
- `src/lib/three/spatialAudio.ts`: Web Audio API 4-zone positional sound engine (Road rumble, Garden birds/leaves, Pavilion resonance, Beach surf).
- `src/components/journey/zone01/WorldScene.tsx`: Core Three.js WebGL scene engine with terrain, lighting, water shader, animated vegetation, and living atmospheric layer.
- `src/components/journey/zone01/SplineCameraController.tsx`: Handles guided spline traversal, look clamping, and discovery deceleration.
- `src/components/journey/zone01/EditorialAnnotations.tsx`: Museum-grade expedition field notes and invisible discovery triggers.
- `src/components/journey/zone01/DiegeticNauticalMap.tsx`: 3D camera elevation into an aerial cartographic chart.
- `src/components/journey/zone01/MinimalHUD.tsx`: Disappearing luxury emblem and action controls.
- `src/components/journey/zone01/Zone01Experience.tsx`: Master orchestrator integrating all systems.
- `src/__tests__/digital-twin-slice.test.tsx`: Comprehensive unit test suite.

---

## Tasks

### Task 1: Authored World Coordinate System & Spline Network

**Files:**
- Create: `src/lib/three/worldCoordinates.ts`
- Create: `src/lib/three/splineNetwork.ts`
- Test: `src/__tests__/spline-network.test.ts`

**Core Principle:**
> The spline coordinates must be derived from the authored world layout, not invented independently of the environment. Establish the world coordinate system and landmark positions first; then generate the camera spline through those spatial landmarks.

- [ ] **Step 1: Write the failing test for world coordinates and spline network**

```typescript
import { describe, it, expect } from "vitest";
import { WORLD_ANCHORS, MALPE_BOUNDS } from "@/lib/three/worldCoordinates";
import { LANDMARK_NODES, createCameraSpline, getInterpolatedCameraState } from "@/lib/three/splineNetwork";

describe("World Coordinate System & Spline Network", () => {
  it("defines physical world anchors matching Malpe geography", () => {
    expect(WORLD_ANCHORS.ROAD_ENTRANCE).toBeDefined();
    expect(WORLD_ANCHORS.CORAL_PORTAL).toBeDefined();
    expect(WORLD_ANCHORS.GARDEN_PATH).toBeDefined();
    expect(WORLD_ANCHORS.PAVILION_CENTER).toBeDefined();
    expect(WORLD_ANCHORS.EXPLORATION_DECK).toBeDefined();
    expect(WORLD_ANCHORS.BEACH_SHORELINE).toBeDefined();
    expect(MALPE_BOUNDS.COORDINATES).toBe("13°21′02″ N · 74°42′08″ E");
  });

  it("derives the 6 vertical slice landmarks directly from physical world anchors", () => {
    expect(LANDMARK_NODES).toHaveLength(6);
    expect(LANDMARK_NODES[0].position.equals(WORLD_ANCHORS.ROAD_ENTRANCE)).toBe(true);
    expect(LANDMARK_NODES[3].position.equals(WORLD_ANCHORS.PAVILION_CENTER)).toBe(true);
  });

  it("creates a continuous Catmull-Rom 3D spline and interpolates camera states smoothly", () => {
    const spline = createCameraSpline(LANDMARK_NODES);
    const stateAtStart = getInterpolatedCameraState(spline, 0, LANDMARK_NODES);
    expect(stateAtStart.position.y).toBeCloseTo(1.7, 1);
    expect(stateAtStart.currentLandmark.id).toBe("arrival-road");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `src/lib/three/worldCoordinates.ts` and `src/lib/three/splineNetwork.ts`**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 2: Four-Zone Positional Web Audio Engine

**Files:**
- Create: `src/lib/three/spatialAudio.ts`
- Test: `src/__tests__/spatial-audio.test.ts`

**Core Principle:**
> True positional soundscapes: Four distinct acoustic sound generators/filters in Web Audio API:
> 1. `road`: Low-frequency traffic/harbour rumble + coastal wind filter.
> 2. `gardens`: Rustling palm fronds (bandpass noise) + coastal morning bird chirps (FM oscillators).
> 3. `pavilion`: Shaded timber acoustic resonance + soft sea breeze.
> 4. `beach`: Dynamic wave surge, breaking surf, and water foam hiss (swept lowpass filter + pink noise).

- [ ] **Step 1: Write test for 4 distinct audio zones**

```typescript
import { describe, it, expect } from "vitest";
import { createSpatialAudioEngine } from "@/lib/three/spatialAudio";

describe("Four-Zone Spatial Audio Engine", () => {
  it("initializes without throwing in test environment", () => {
    const engine = createSpatialAudioEngine();
    expect(engine).toBeDefined();
    expect(typeof engine.setAudioZone).toBe("function");
    expect(typeof engine.toggleMute).toBe("function");
  });

  it("supports transitions across all 4 spatial acoustic zones", () => {
    const engine = createSpatialAudioEngine();
    engine.setAudioZone("road");
    engine.setAudioZone("gardens");
    engine.setAudioZone("pavilion");
    engine.setAudioZone("beach");
    expect(engine.isMuted()).toBe(true);
  });
});
```

- [ ] **Step 2: Implement `src/lib/three/spatialAudio.ts` with 4 distinct acoustic synthesizers and smooth cross-fades**
- [ ] **Step 3: Run test to verify it passes**

---

### ASSET-FIRST BLOCKER (Mandatory Gate Before Task 3)

> **ASSET-FIRST BLOCKER:** Before implementing `WorldScene.tsx`, create `src/data/assetManifest.ts` for every visible environmental object in the six-landmark slice. Each asset must have a verified source/license, preview image, approximate dimensions, polygon/texture cost, and intended placement. Reject primitive/low-quality assets. Do not create procedural substitutes for recognizable objects merely to make the test pass. The world engine may only proceed once the required hero assets for Road, Portal, Gardens, Pavilion, Deck, Beach, palms, shoreline, watercraft, and environmental props have been identified or explicitly marked for custom modelling.

---

### Task 3: Asset Manifest Verification & Core Three-Layer 3D World Engine

**Files:**
- Create: `src/data/assetManifest.ts`
- Create: `src/components/journey/zone01/WorldScene.tsx`
- Test: `src/__tests__/asset-manifest.test.ts`
- Test: `src/__tests__/world-scene.test.tsx`

- [ ] **Step 1: Implement `src/data/assetManifest.ts` with verified assets**
- [ ] **Step 2: Write test verifying asset manifest completeness and quality specs**
- [ ] **Step 3: Implement `src/components/journey/zone01/WorldScene.tsx` rendering the 3-layer world (Geography, Infrastructure, Dynamic Atmosphere), handling mouse/touch look within clamped limits, and projecting discovery markers**
- [ ] **Step 4: Run tests to verify they pass**

---

### Task 4: Editorial Expedition Field Notes (No Glassmorphism)

**Files:**
- Create: `src/components/journey/zone01/EditorialAnnotations.tsx`
- Test: `src/__tests__/editorial-annotations.test.tsx`

- [ ] **Step 1: Write test for EditorialAnnotations**
- [ ] **Step 2: Implement `src/components/journey/zone01/EditorialAnnotations.tsx` with warm alabaster/linen cards, champagne-gold rules (`#C5A059`), serif headlines, and coordinates metadata**
- [ ] **Step 3: Run test to verify it passes**

---

### Task 5: Diegetic 3D Nautical Chart Elevation (Map Mode)

**Files:**
- Create: `src/components/journey/zone01/DiegeticNauticalMap.tsx`
- Test: `src/__tests__/diegetic-map.test.tsx`

- [ ] **Step 1: Write test for DiegeticNauticalMap**
- [ ] **Step 2: Implement `src/components/journey/zone01/DiegeticNauticalMap.tsx` with high-angle camera elevation, bathymetry lines, and dive-down waypoint navigation**
- [ ] **Step 3: Run test to verify it passes**

---

### Task 6: Master Orchestrator & Six-Moment Vertical Slice Integration

**Files:**
- Modify: `src/components/journey/zone01/Zone01Experience.tsx`
- Modify: `src/components/journey/PersepolisExpedition.tsx`
- Test: `src/__tests__/persepolis-expedition.test.tsx`

- [ ] **Step 1: Update `Zone01Experience.tsx` and orchestrate all systems**
- [ ] **Step 2: Run all test suites: `npm test`**
- [ ] **Step 3: Run production build: `npm run build`**
- [ ] **Step 4: Execute the 6 Quality Gate Tests in Chrome DevTools with screenshots**

---

## The 6 Production Quality Tests

1. **Test A (UI Deletion):** Hide all HUD elements. Does the world look like an authentic coastal destination in Karnataka?
2. **Test B (180° Reverse Look):** Turn the camera around 180°. Does the environment still make continuous spatial sense?
3. **Test C (10-Second Observation):** Stop moving for 10 seconds. Does the environment feel alive with dynamic water, clouds, and palm sway?
4. **Test D (Landmark Continuity):** Walk continuously from Road $\rightarrow$ Portal $\rightarrow$ Gardens $\rightarrow$ Pavilion $\rightarrow$ Deck $\rightarrow$ Beach. Does the geography physically connect without teleportation?
5. **Test E (Natural Discovery):** Approach an object. Does discovery feel organic rather than game-like?
6. **Test F (3D Map Elevation):** Open MAP. Does the camera pull up into a spatial representation of the world?
