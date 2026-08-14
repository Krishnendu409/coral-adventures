# Master Design Specification: Coral Adventures Malpe 3D Digital Twin — Continuous Spatial World

**Date:** 2026-08-14  
**Project:** Coral Adventures (Malpe Waterfront, Udupi, Karnataka, India)  
**Document:** `docs/superpowers/specs/2026-08-14-malpe-digital-twin-rebuild-design.md`  
**Guiding Production Principle:**  
> *"Photoreal where the eye touches. Art-directed where the eye travels. Atmospheric where the eye cannot resolve detail."*  
**Benchmark Reference:**  
- **Getty *Persepolis Reimagined***: Guided spatial journey, selective web optimization, spatial storytelling.  
- **Bruno Simon Interactive 3D World**: Continuous world coordinate space, physics, spatial audio, and stateful camera navigation.

---

## 1. Vision & Single Continuous Geographic World Architecture

The Coral Adventures 3D digital twin is **one continuous physical geography** spanning a $1200\text{m}$ world coordinate system ($Z = 0\text{m} \to 1200\text{m}$) from the inland coastal road of Malpe, through the Coral Expedition Base, across Malpe Beach, along the 450m Sea Walkway, out into the open Arabian Sea aboard the flagship 25.90M catamaran, and arriving at the hexagonal columnar basalt formations of St. Mary's Island.

```
                    ONE CONTINUOUS PHYSICAL GEOGRAPHY
                                   │
00. COASTAL ROAD (z=0m) ───────────┼── Enclosed palm canopy & dappled sun
                                   │
01. CORAL PORTAL (z=50m) ──────────┼── Weathered teak & laterite expedition arch
                                   │
02. TROPICAL GARDENS (z=70m) ──────┼── Spinifex grass, Alocasia, laterite path
                                   │
03. WELCOME PAVILION (z=90m) ──────┼── Open-air teak pavilion & chart table
                                   │
04. EXPLORATION DECK (z=150m) ─────┼── Elevated terrace, panorama reveal
                                   │
05. MALPE BEACH (z=200m) ──────────┼── Broad golden sand, swash & surf foam
                                   │
06. WATERSPORTS ZONE (z=250m) ─────┼── Staged Sea-Doos & kayaks on timber skids
                                   │
07. MALPE SEA WALKWAY (z=350m) ────┼── 450m stone pavers, rock armour & lamp posts
                                   │
08. BOARDING JETTY (z=450m) ───────┼── Mooring hawsers, fenders & trawler fleet
                                   │
09. CATAMARAN EXPEDITION (z=700m) ─┼── 25.90M 3-deck catamaran, ocean departure
                                   │
10. OPEN ARABIAN SEA (z=950m) ─────┼── Deep sapphire swells & atmospheric haze
                                   │
11. ST. MARY'S ISLAND (z=1150m) ───┴── Hexagonal columnar basalt & turquoise lagoon
```

---

## 2. Dual Identity: Real Malpe + Coral Luxury Layer

The environment seamlessly combines two simultaneous identities:
1. **Real Working Malpe**: Broad open golden sand, coastal coconut belt, active fishing harbour with wooden trawlers in blue/white/copper Karnataka liveries, stacked HDPE fish crates, crab pots, 450m Sea Walkway with concrete pavers and granite rock armour, and local watersports staging.
2. **Coral Adventures Luxury Layer**: Contemporary Indian coastal expedition architecture inserted into the real landscape. Heavy weathered teak timbers, rough-hewn laterite plinths, unbleached sailcloth canopies, brushed marine brass, hemp rope lashings, and an inhabited chart table with St. Mary's 1894 sea chart, dividers, compass, weather ledger, and captain's lantern.

---

## 3. Four-Tier Selective Fidelity & Progressive Loading Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ TIER 1: HERO ASSETS (0–10m Focus Distance)                             │
│ • Malpe Expedition Arrival Portal with coordinates & brass plaque      │
│ • Weathered Teak Pavilion, concierge desk, navigational chart table    │
│ • Exploration Deck observation terrace with brass marine binoculars    │
│ • Flagship 25.90M 3-deck expedition catamaran & staging watercraft     │
│ • St. Mary's hexagonal 6-sided columnar basalt rock formations         │
│ • High-detail foreground botanical vegetation & micro-displaced sand   │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: ENVIRONMENT (10–40m Context Distance)                          │
│ • Instanced coconut palm population with varied bends & crown ages     │
│ • Weathered laterite & basalt rock clusters with crevice shading       │
│ • Coastal Spinifex grasses, broadleaf Alocasia, and flowering shrubs   │
│ • Traditional Malpe wooden fishing trawlers & moored dinghies          │
│ • Malpe Sea Walkway 450m pavers, lamp posts, and rock armour           │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: SIMPLIFIED / ATMOSPHERE (40–100m Distance)                      │
│ • Simplified trawler hulls, static palm canopies, and low-poly skids   │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 4: HORIZON SILHOUETTES (100m+ Distance)                           │
│ • St. Mary's Island basalt promontory silhouette                       │
│ • Distant Malpe fishing boat silhouettes on Arabian Sea horizon        │
│ • Flocking Brahminy kites soaring in aerodynamic thermals              │
│ • Exponential sea-mist distance fog & Rayleigh/Mie sky dome         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Multi-Mask Coastal Terrain Engine

Continuous $240 \times 1200\text{m}$ topography with multi-mask vertex blending and micro-displacement:
1. **Dry Pale Sand**: Fine golden sand (`#EADCC6`) with wind ripple micro-normals and roughness scattering.
2. **Crushed Laterite Path**: Compacted red iron-earth trail (`#964831`) with wagon cart ruts and soft Gaussian edge falloff.
3. **Damp Transition Sand**: Moisture gradient (`#C4B59D`) approaching the tide line.
4. **Wet Intertidal Sand**: Dark reflective sand (`#8F7C66`) with wave wash ripple ridges and high specular wetness.
5. **Malpe Sea Walkway**: 450m elevated concrete/granite paving ($y = 1.8\text{m}$) flanked by rough-cut granite rock armour boulders.
6. **St. Mary's Lagoon & Basalt Formations**: Pale sand beach meeting crystal cyan lagoon water (`#25C4C0`) and dark charcoal columnar basalt (`#2A282A`).

---

## 5. Ecological Vegetation Population System

- **Botanical Palms (*Cocos nucifera*)**:
  - 4 distinct variants (Tall mature leaning $12\text{m}$, mid-height upright $9\text{m}$, coastal wind-bowed $7\text{m}$, young cluster $5\text{m}$).
  - `InstancedMesh` GPU batching with per-instance randomized scale ($0.85\times - 1.2\times$), trunk bend curvature ($0^\circ - 28^\circ$), rotation, frond count ($18 - 32$), and crown age.
  - Seaward wind bowing logic: palms near the coast naturally bow toward the sea (+Z).
  - Gentle non-synchronous wind sway vertex shader movement.
- **Coastal Undergrowth**: *Spinifex littoreus* dune runner grass, broadleaf *Alocasia macrorrhizos*, *Bougainvillea* shrubs, fallen fronds, coconut husks, driftwood, and shell fragments.

---

## 6. Living Arabian Sea Ocean & Marine Fleet Engine

- **Gerstner Wave System**: 5-harmonic wave spectrum (24m swell, 12m chop, 4m micro-ripples) with PBR cyan shallows (`#25C4C0`) $\to$ coastal turquoise (`#158F93`) $\to$ deep sapphire (`#071A2B`).
- **Shoreline Swash**: Dynamic oscillating surf foam swash ribbon with wet sand modulation eliminating hard water boundaries.
- **Malpe Fishing Fleet**: Traditional wooden trawlers with Karnataka cobalt blue (`#1C4E80`), white waterline, copper bottom (`#8B3A2B`), yellow derrick mast (`#E5A93C`), stacked HDPE fish crates, and crab pots.
- **Hero 25.90M Expedition Catamaran**: Twin wave-piercing demi-hulls, main deck social lounge, upper observation deck, panoramic glazing, dynamic wave bobbing physics, and departure wake trail.

---

## 7. St. Mary's Island Visual Climax

St. Mary's Island serves as the ultimate visual and geological narrative payoff:
- **Geological Signature**: Dark 6-sided hexagonal columnar basalt (`#2A282A`) with vertical columns, fractures, water erosion, and sea-spray sheen.
- **Atmospheric Reveal Sequence**:
  $$\text{Open Ocean} \to \text{Distant Silhouette} \to \text{Turquoise Shallows} \to \text{Pale Sand} \to \text{Seaward Palms} \to \text{Hexagonal Basalt Columns}$$

---

## 8. Stateful 12-Beat Camera Director & 4-Zone Spatial Audio

- **Camera Director**: Continuous Catmull-Rom camera interpolation across the 12 spatial landmarks with FOV easing and eye-height transitions ($1.7\text{m} \to 2.1\text{m} \to 1.7\text{m}$).
- **4-Zone Spatial Audio Engine**:
  - *Zone 00 (Approach)*: High canopy frond rustle, Brahminy kites, distant surf.
  - *Zone 01 (Pavilion)*: Flapping sailcloth tension, teak timber creaks, ocean breeze, wind chimes.
  - *Zone 02 (Sea Walk & Beach)*: Waves, surf swash, fishing boat engines, watersports.
  - *Zone 03 (Catamaran & St. Mary's)*: Open ocean swells, hull wake, sea wind, basalt wave lap.

---

## 9. Implementation & QA Verification

- **Build & Hydration**: Next.js 16.3 static/dynamic compilation with 0 hydration mismatch warnings.
- **Test Integrity**: 100% pass rate across all unit test suites (22+ test files, 103+ unit tests).
- **Chrome DevTools WebGL Verification**: 0 WebGL context errors, 0 runtime exceptions, stable 60 FPS.
