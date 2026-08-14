# Design Specification: Coral Adventures Malpe 3D Digital Twin — Production Art Rebuild

**Date:** 2026-08-14  
**Project:** Coral Adventures (Malpe, Karnataka)  
**Document:** `docs/superpowers/specs/2026-08-14-malpe-digital-twin-rebuild-design.md`  
**Guiding Production Principle:**  
> *"Photoreal where the eye touches. Art-directed where the eye travels. Atmospheric where the eye cannot resolve detail."*  
**Reference Philosophy:** Getty's *Persepolis Reimagined* — Spatial Storytelling, Architectural Authenticity, Selective Fidelity, Inhabited Micro-Storytelling & Progressive WebGL Loading.

---

## 1. Vision & Art Direction Philosophy

The Coral Adventures 3D digital twin is an interactive, cinematic spatial expedition across the private coastal base in Malpe, Karnataka. It is **not** a generic Three.js demo, a cartoon resort, or a collection of disconnected 3D objects. It is authored as a continuous, lived-in expedition environment where the visitor steps into the physical journey of a modern marine exploration company.

### 1.1 Aesthetic & Material Vocabulary
- **Primary Palette**: Deep Arabian Sea sapphire (`#071A2B`), vibrant coastal turquoise (`#1FA7A6`), warm golden daylight (`#FFF4E0`), pale sun-bleached sand (`#EADCC6`), iron-rich laterite red (`#964831`), weathered coastal teak (`#5C3E29`), aged marine brass (`#C5A059`), and unbleached off-white sailcloth linen (`#FAF6EE`).
- **Architectural Spirit**: **Contemporary Expedition Architecture Rooted in Coastal Karnataka**. Heavy weathered teak timbers, rough-hewn laterite plinths, tensioned sailcloth canopies, natural hemp rope lashings, brushed marine brass joinery, and dark volcanic basalt.
- **Strict Anti-Defaults**:
  - Zero Japanese torii/pagoda roof lines or Asian shrine motifs.
  - Zero primitive cones/cylinders for vegetation.
  - Zero flat single-texture ground planes.
  - Zero hard geometrical water boundaries.
  - Zero decorative CGI tropes or oversaturated fantasy assets.

---

## 2. Three-Tier Quality & Progressive Loading Hierarchy (The Getty Strategy)

Getty explicitly noted that the full model could not be loaded into memory indiscriminately. We apply selective fidelity: **spend polygons where the visitor's gaze rests, cheat aggressively everywhere else**.

```
┌────────────────────────────────────────────────────────────────────────┐
│ TIER 1: HERO ASSETS (0–10m Focus Distance)                             │
│ • Malpe Expedition Arrival Portal with coordinates & brass plaque      │
│ • Weathered Teak Pavilion, concierge desk, navigational chart table    │
│ • Exploration Deck observation terrace with brass marine binoculars    │
│ • Flagship 25.90M expedition catamaran & staging watercraft            │
│ • High-detail foreground botanical vegetation & micro-displaced sand   │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: ENVIRONMENT (10–40m Context Distance)                          │
│ • Instanced coconut palm population with varied bends & crown ages     │
│ • Weathered laterite & basalt rock clusters with crevice shading       │
│ • Coastal Spinifex grasses, broadleaf Alocasia, and flowering shrubs   │
│ • Traditional Malpe wooden fishing trawlers & moored dinghies          │
│ • Mid-ground shoreline sandbars, lounge seating, and timber skids      │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: ATMOSPHERE & HORIZON (40m+ Distance)                           │
│ • St. Mary's Island hexagonal columnar basalt silhouette               │
│ • Distant Malpe fishing boat silhouettes on Arabian Sea horizon        │
│ • Flocking Brahminy kites soaring in aerodynamic thermals              │
│ • Exponential atmospheric sea-mist fog & Rayleigh/Mie sky dome         │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Progressive Loading Engine
- **Initial Load**: Hero environment, immediate topography terrain, first 20–30m vegetation buffer, primary directional sun & HDRI environment.
- **Zone Proximity Activation**: As camera nears a zone, load zone-specific high-detail GLBs, increase local foliage density, activate zoned spatial audio layer, and enable higher LOD.
- **Zone Departure**: Downgrade distant zone assets to lightweight impostors/silhouettes, preserving GPU frame time and memory.
- **Horizon Optimization**: Distant objects (St. Mary's basalt columns, far fishing craft) use low-poly silhouette geometries bathed in atmospheric haze.

---

## 3. Environmental Micro-Storytelling & Spatial Logic (Cause and Effect)

The environment must communicate **evidence of human activity and natural cause-and-effect**. No random prop spam.

```
┌────────────────────────────────────────────────────────────────────────┐
│ CAUSE AND EFFECT SPATIAL LOGIC MATRIX                                  │
├─────────────────┬──────────────────────────────────────────────────────┤
│ SUBSYSTEM       │ INHABITED TRACES & SPATIAL RULES                     │
├─────────────────┼──────────────────────────────────────────────────────┤
│ Ground & Sand   │ • Disturbed sand, footprints, and cart tracks along  │
│                 │   the laterite path connecting arrival to pavilion.  │
│                 │ • Wind-swept sand accumulation banked at rock bases. │
│                 │ • Fallen palm fronds, coconut husks, and shell bits  │
│                 │   under tree clusters.                               │
│                 │ • Tide marks and damp sand along swash zone.         │
├─────────────────┼──────────────────────────────────────────────────────┤
│ Architecture    │ • Heavy timber joinery with visible fasteners.       │
│                 │ • Water staining and salt-weathered teak surfaces.   │
│                 │ • Rope lashings and brass collar plates.             │
│                 │ • Worn foot traffic patina at entrance thresholds.   │
├─────────────────┼──────────────────────────────────────────────────────┤
│ Pavilion Lounge │ • Navigational chart table with aged sea chart of    │
│                 │   St. Mary's archipelago & Malpe continental shelf.  │
│                 │ • Brass navigation dividers, parallel ruler, compass.│
│                 │ • Weather ledger, tide table, expedition manifest.   │
│                 │ • Glowing captain's lantern with warm point light.   │
├─────────────────┼──────────────────────────────────────────────────────┤
│ Marine & Shore  │ • Mooring posts, heavy hawser rope coils, cleats.    │
│                 │ • Fishing crates, crab pots, wet net piles.          │
│                 │ • Sea-Doo jet skis & kayaks staged on timber skids.  │
│                 │ • Traditional Malpe trawlers with Karnataka livery.  │
├─────────────────┼──────────────────────────────────────────────────────┤
│ Exploration Deck│ • Deck-mounted brass telescope / marine binoculars.  │
│                 │ • Route briefing board and tide level gauge.         │
│                 │ • Weathered teak handrails with salt sheen.          │
└─────────────────┴──────────────────────────────────────────────────────┘
```

---

## 4. Multi-Mask Layered PBR Terrain Engine

Continuous 240×380m topography with multi-mask vertex blending and micro-displacement:
1. **Dry Pale Sand**: Warm, wind-rippled coastal sand with micro-normal variation and diffuse scattering.
2. **Disturbed & Compacted Footpath**: Reddish laterite iron-earth trail with organic edge falloff, wagon cart ruts, and foot traffic marks.
3. **Damp Transition Sand**: Intermediate zone where receding tides keep sand moist and packed.
4. **Wet Intertidal Sand**: Dark, high-specular reflective surface bordering the water line with wave wash ripple ridges.
5. **Shoreline Swash & Sandbars**: Submerged sandbars ($y = -0.3\text{m} \to -2.2\text{m}$) visible through turquoise shallows.
6. **Embedded Formations**: Sand accumulation naturally banking against rock bases and pavilion pilings.

---

## 5. Botanical Vegetation Population System

Rather than repeating static prefab models, the vegetation system generates natural ecological diversity:
- **Coconut Palms (*Cocos nucifera*)**:
  - Instanced multi-segment curved spline trunks with annular leaf scar rings and basal root flares.
  - Procedural/instanced variation across trunk bend curvature ($0^\circ - 28^\circ$), height ($6.5\text{m} - 13.5\text{m}$), crown diameter, frond count ($18 - 32$ fronds across 4 radial tiers), and leaf droop age.
  - Palms closer to the beach naturally bow seaward in response to prevailing onshore winds.
  - Vertex shader wind physics providing gentle, non-synchronous frond sway.
- **Coastal Undergrowth**:
  - *Spinifex littoreus* (coastal dune runner grass clusters).
  - *Alocasia macrorrhizos* (broadleaf tropical foliage with translucent veins).
  - Magenta *Bougainvillea* coastal shrubs and beach morning glory vines.
  - Scattered organic debris: fallen brown palm fronds, coconut husks, driftwood logs, and shell fragments.

---

## 6. Living Arabian Sea Ocean Engine

- Dynamic multi-harmonic Gerstner wave displacement (long-period ocean swell, chop, and micro-ripples).
- Physically coherent PBR depth gradient: crystal cyan shallows (`#25C4C0`) $\to$ rich coastal turquoise (`#158F93`) $\to$ deep offshore sapphire (`#071A2B`).
- Shallow water sun caustics and wave crest specular highlights.
- Dynamic oscillating surf foam along the intertidal boundary with sand wetness modulation rather than a hard geometric cut.

---

## 7. Stateful Cinematic Camera & Spatial Storytelling

The camera system operates as a stateful expedition director guiding the visitor through 6 intentional visual beats:

| State / Landmark | Spline $z$ | Eye Height ($y$) | Target & Focal Length | Visual Intention & Emotional Beat |
| :--- | :--- | :--- | :--- | :--- |
| **00. Approach** | $0\text{m}$ | $1.7\text{m}$ | $z = 25\text{m}$, FOV $50^\circ$ | **Enclosure & Anticipation**: Walking under dense coconut palms, dappled sun on red earth, ocean heard but unseen. |
| **01. Portal** | $50\text{m}$ | $1.7\text{m}$ | $z = 75\text{m}$, FOV $52^\circ$ | **Threshold & Identity**: Architectural framing, carved coordinates, transition into expedition grounds. |
| **02. Gardens** | $70\text{m}$ | $1.7\text{m}$ | $z = 90\text{m}$, FOV $52^\circ$ | **Discovery & Texture**: Broadleaf foliage, laterite boulder clusters, human footpaths leading toward sanctuary. |
| **03. Pavilion** | $90\text{m}$ | $1.7\text{m}$ | $z = 115\text{m}$, FOV $54^\circ$ | **Hospitality & Sanctuary**: Shaded pavilion interior, glowing lantern, navigational chart table, ocean framed through pillars. |
| **04. Deck** | $150\text{m}$ | $2.1\text{m}$ | $z = 260\text{m}$, FOV $56^\circ$ | **The Grand Ocean Reveal**: Elevated terrace panorama, open sea, expedition catamaran, Malpe fishing fleet, St. Mary's Island. |
| **05. Shoreline** | $200\text{m}$ | $1.7\text{m}$ | $z = 320\text{m}$, FOV $52^\circ$ | **Immersion & Action**: Water's edge, breaking surf, wet sand reflections, staged kayaks and jet skis ready for launch. |

---

## 8. 4-Zone Positional Spatial Audio Engine

The Web Audio API synthesizer transitions dynamically across the camera's location:
1. **Zone 00 / Approach Road**: Rustling coconut palm fronds in high canopy, coastal birds (Brahminy kites), distant muffled surf.
2. **Zone 01 / Arrival Gardens**: Wind through tropical undergrowth, insects, soft breeze on bamboo/foliage.
3. **Zone 02 / Pavilion Sanctuary**: Flapping linen canvas tension, creaking weathered teak joinery, soft ocean breeze, wind resonance.
4. **Zone 03 / Exploration Deck & Beach**: Open Arabian Sea wave swells, rhythmic surf swash and foaming shoreline, halyard clatter against masts, water lap against catamaran hulls.

---

## 9. Outcome-Driven Lighting, Atmosphere & Postprocessing

- **Calibrated Warm Daylight**: Physically coherent sun/sky balance with warm directional sunlight (`#FFF4E0`) and Drei `<Environment>` HDRI sky fill.
- **Contact Shadows**: Soft contact shadows grounding furniture, boulders, and trunks.
- **Atmospheric Sea-Mist Fog**: Exponential distance haze (`FogExp2`, `#C9DDE8`, density `0.0022`) creating natural atmospheric depth falloff.
- **Restrained Postprocessing**: SSAO for contact crevices, subtle specular bloom on water/brass/lanterns, ACESFilmic tone mapping, and light editorial vignette.

---

## 10. Performance & Web Delivery Invariants

1. **Draw Call Optimization**: Extensive use of `InstancedMesh` for repeated vegetation, rock clusters, and micro-details.
2. **Selective Geometry**: Low-poly silhouette geometry with atmospheric fog for distant background assets ($z > 40\text{m}$).
3. **Pristine SSR Hydration**: Client mount gating and dynamic imports ensuring 0 hydration mismatch errors.
4. **Automated Verification**: 100% test pass rate across all unit and integration test suites.
