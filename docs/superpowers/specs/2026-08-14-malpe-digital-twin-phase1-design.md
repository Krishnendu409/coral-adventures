# Design Specification: Malpe Waterfront Digital Twin (Zone 01 Vertical Slice)

**Document:** `docs/superpowers/specs/2026-08-14-malpe-digital-twin-phase1-design.md`  
**Date:** 2026-08-14  
**Status:** Validated Design (Refined with Strict Asset Gates)  
**Standard:** Museum-Grade WebGL Digital Twin (Persepolis Reimagined Benchmark)

---

## 1. Executive Summary & Objective

The objective is to deliver a photorealistic, asset-driven 3D WebGL vertical slice of the **Coral Adventures Waterfront Base at Malpe Beach, Karnataka** ($13^\circ 21' 02''\text{ N} \cdot 74^\circ 42' 08''\text{ E}$). 

The previous implementation failed visually because it relied on procedural primitive geometries (cylinders, boxes, untextured planes) that produced a greybox prototype. This specification establishes an **Asset-Driven Hybrid Pipeline** combining verified open-access scanned assets, custom architectural models, and physical shaders.

---

## 2. Visual Quality Prohibitions (Definition of Failure)

The vertical slice fails the acceptance gate if ANY of the following are visible in the scene:

- ❌ Primitive cylinder palm trunks
- ❌ Flat polygonal or rectangular palm leaves
- ❌ Box-shaped boats or placeholder hulls
- ❌ Rectangular flat water planes
- ❌ Flat-color terrain or untextured ground
- ❌ Generic low-poly blob rocks
- ❌ Untextured architecture or flat-shaded beams
- ❌ Single-color ocean without depth transitions
- ❌ Procedural trees made from standard primitives
- ❌ Primitive furniture (box desks, cylinder lamps)
- ❌ Floating geometry or broken contact shadows
- ❌ Perfectly flat terrain or unnatural razor-sharp edges
- ❌ Perfectly clean surfaces lacking weathering/wear
- ❌ Excessive bloom used to hide poor materials
- ❌ Fog used to hide missing geometry
- ❌ Depth-of-field used to blur low-quality models
- ❌ UI used to make the scene appear more sophisticated
- ❌ Turning around 180° exposes empty void planes

---

## 3. Asset Pipeline & Discovery Protocol

Three.js is the **runtime engine and consumer**, not the authoring tool for raw architecture and boats.

### Asset Classifications:
1. **Scanned / Sourced Assets:** Palms, coastal shrubs, sand normal/AO maps, laterite gravel textures, teak wood textures, fishing boats, props, and 5500K HDRIs.
2. **Custom Architectural Assets:** Coral teak pavilion, reception desk, physical carved signage, and the flagship 25.90M catamaran (authored and optimized as GLB files).
3. **Procedural / Shader Systems:** Arabian Sea Gerstner wave displacement, depth absorption, shoreline foam caustics, wind oscillation, and atmospheric horizon haze.

### Asset Discovery & Verification Gate:
Before writing scene code, every external asset must have a verified `ASSET DISCOVERY REPORT`:
```text
ASSET DISCOVERY REPORT
├── Asset Name: [e.g. coconut_palm_curved_01]
├── Category: [Vegetation | Terrain | Architecture | Marine | Prop]
├── Repository: [Poly Haven | Sketchfab CC0 | ambientCG | Khronos]
├── Source URL: [Direct link to live asset page]
├── License: [CC0 | CC-BY with attribution verified]
├── Downloaded: [YES - stored in public/models/ or public/textures/]
├── Runtime Load Tested: [YES - loads in GLTFLoader without error]
├── PBR Maps: [Albedo, Normal, Roughness, AO confirmed]
└── Approved: [YES]
```
> **Hard Rule:** Never create a fictional asset filename or assume a model exists. If a desired asset cannot be found, mark it `MISSING` rather than fabricating a placeholder.

---

## 4. Visual Priority Hierarchy

Visual fidelity is governed by geometry and materials, not post-processing tricks:

```text
                 VISUAL FIDELITY
                       ▲
                       │
                ┌──────┴──────┐
                │ REAL ASSETS │  (Verified GLB models)
                └──────┬──────┘
                       │
                ┌──────┴──────┐
                │ PBR MATERIAL│  (Albedo, Normal, Roughness, AO)
                └──────┬──────┘
                       │
                ┌──────┴──────┐
                │   LIGHTING  │  (5500K Sun + HDRI Environment)
                └──────┬──────┘
                       │
                ┌──────┴──────┐
                │  ATMOSPHERE │  (Exponential Coastal Haze)
                └──────┬──────┘
                       │
                ┌──────┴──────┐
                │   SHADERS   │  (Ocean Gerstner waves & foam)
                └─────────────┘
```

---

## 5. First Milestone: Single-Location Acceptance Gate ("Hide UI Test")

Execution will NOT expand to multiple landmarks, soundscapes, or complex UI until a **single camera viewpoint** achieves museum-grade realism.

### Target Viewport Composition:
```text
                         SKY DOME / 5500K HDRI
──────────────────────────────────────────────────────────────────────────

          🌴                                              🌴
     scanned coconut palm                            scanned coconut palm
     (curved trunk, alpha fronds)                    (curved trunk, alpha fronds)

                           CORAL ARRIVAL PAVILION
                      ╭──────────────────────────────╮
                      │  weathered teak columns      │
                      │  concierge reception desk    │
                      │  natural linen canopy roof   │
                      ╰──────────────────────────────╯
                           weathered teak deck

──────────────────────────────────────────────────────────────────────────
                         PBR BEACH SAND (DRY -> WET)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                       ARABIAN SEA (TURQUOISE TO SAPPHIRE)

                                      🚤
                          traditional coastal trawler

                       distant St. Mary's basalt silhouette
                       atmospheric coastal horizon haze
```

### Camera & Environment Parameters:
- **Height:** $1.7\text{m}$ (human eye level).
- **FOV:** $55^\circ \dots 62^\circ$.
- **Position:** Walking approach to the Welcome Pavilion.
- **Look Target:** Slight diagonal framing the pavilion entrance, beach, and open sea.
- **Lighting:** Warm 5500K coastal morning sun + soft ambient sky light.
- **360° Continuity:** Turning $180^\circ$ reveals the entrance coastal road and palm groves (no blank void planes).
- **UI State:** **100% OFF** (zero buttons, zero text overlays, zero hud).

---

## 6. Phased Implementation Pipeline

Execution proceeds strictly through these 12 linear phases:

- **Phase 0:** Asset Discovery & Verification (Poly Haven, ambientCG, Sketchfab CC0).
- **Phase 1:** Direct Download & Validation into `public/models/` and `public/textures/`.
- **Phase 2:** Pavilion Architectural GLB Integration.
- **Phase 3:** Topographic Terrain Mesh & Height Gradient ($y: 0.0\text{m} \rightarrow +0.7\text{m} \rightarrow -0.3\text{m}$).
- **Phase 4:** PBR Material Mapping (Sand, Laterite, Teak, Linen, Normal Maps).
- **Phase 5:** 5500K Sunlight & HDRI Environment Reflections.
- **Phase 6:** Arabian Sea Living Water (Gerstner waves, depth absorption, shoreline foam).
- **Phase 7:** Natural Coconut Palm Groves & Tropical Coastal Undergrowth.
- **Phase 8:** Marine Vessels (Malpe Fishing Trawler & Coastal Craft).
- **Phase 9:** Atmospheric Horizon Haze & St. Mary's Basalt Silhouette.
- **Phase 10:** Human-Scale Spline Camera Framing ($1.7\text{m}$ eye level).
- **Phase 11:** Hide UI Screenshot & Acceptance Evaluation Gate.

---

## 7. Verification Plan

1. **Automated Tests:** Run `npm test` verifying that all 14 test suites and 63 unit tests pass without regression.
2. **TypeScript Compilation:** Run `npx tsc --noEmit` confirming 0 errors.
3. **Visual Acceptance:** Capture full-viewport Chrome DevTools screenshots with 100% UI hidden. Verify against the Visual Quality Prohibitions before expanding to additional landmarks.
