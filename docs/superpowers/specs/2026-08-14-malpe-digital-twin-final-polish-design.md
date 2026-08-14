# Design Specification: Malpe Digital Twin Master Final Polish & Ecological Realism

**Date:** 2026-08-14  
**Project:** Coral Adventures (Malpe Waterfront, Udupi, Karnataka, India)  
**Document:** `docs/superpowers/specs/2026-08-14-malpe-digital-twin-final-polish-design.md`  

---

## 1. Objectives & Scope

This specification defines the master final polish layer for the Coral Adventures Malpe 3D Digital Twin continuous spatial world experience ($Z = 0\text{m} \to 1200\text{m}$):

1. **Coastal Golden Hour Sunset System**:
   - 5200K golden solar angle ($12^\circ$ solar altitude above horizon, azimuth $248^\circ$).
   - Rich Rayleigh/Mie sky dome gradient: deep zenith navy (`#1B3B6F`) $\to$ tropical upper sky (`#3B629B`) $\to$ golden amber (`#E07A5F`) $\to$ rich horizon crimson-pink (`#F4A261`) matching `FogExp2` distance haze.
   - Long golden shadows grounding palm trunks, laterite plinths, and granite rock armour breakwater.

2. **Dense Ecological Botanical Belt (600+ Palms)**:
   - Double palm population density (600+ instanced palms across $Z = 0\text{m} \to 1200\text{m}$).
   - 4 botanical variants (*Cocos nucifera*) with instanced seaward wind bowing, randomized frond droop age, and lush undergrowth (*Spinifex* grass, broadleaf *Alocasia*, flowering *Bougainvillea*).

3. **Active Coastal Watersports Ecosystem**:
   - **Soaring Parasail Canopy**: High-altitude colorful parasail canopy ($Y = 45\text{m}$, $Z = 400\text{m}$) towed by a speed boat with a dynamic tow rope.
   - **Active Jet Skis with Spray Wakes**: 2 dynamic Sea-Doo jet skis cutting through waves at $Z = 260\text{m}$ with particle water spray wakes and riding figures.
   - **Shoreline Kayaks & Paddleboards**: Staged kayaks and paddleboards near the intertidal tide line ($Z = 200\text{m} \to 230\text{m}$).

4. **Native Coastal Arabian Sea Wildlife System (`WildlifeSystem.tsx`)**:
   - **Flocking Brahminy Kites & Sea Gulls**: 14 soaring sea birds flying in aerodynamic thermal spirals above the arrival road, pavilion, and Sea Walkway.
   - **Leaping Arabian Sea Dolphins**: Pod of 3 humpback dolphins leaping near the catamaran ($Z = 650\text{m} \to 750\text{m}$) with water splash particle rings.
   - **Shallow Water Fish Schools**: Animated silver fish schools swimming below the shallow crystal cyan water near the intertidal swash ($Z = 195\text{m} \to 220\text{m}$).

5. **Ultra-Smooth 12-Beat Camera Trajectory**:
   - Dual-cubic Catmull-Rom spline smoothing with tension control (`0.4`), eliminating micro-stutters.
   - Micro-breathing camera motion ($0.015\text{m}$) simulating a handheld steadicam on the Malpe shore.

---

## 2. Component Architecture

```
WorldScene.tsx (Continuous 1200m WebGL Spatial Canvas)
├── AtmosphereSky.tsx (Sunset Sky Dome, 5200K Sun, FogExp2)
├── MalpeTerrain.tsx (1200m Multi-Mask Sand/Laterite Topography & Sea Walkway)
├── OceanWater.tsx (5-Harmonic Gerstner Ocean & Intertidal Surf Swash)
├── VegetationSystem.tsx (600+ Instanced Palms & Dune Undergrowth)
├── CoralPortal.tsx (Teak & Laterite Expedition Arch)
├── PavilionArchitecture.tsx (Post-and-Beam Pavilion & Inhabited Chart Table)
├── SeaWalkway.tsx (450m Concrete Promenade & Granite Rock Armour)
├── MarineCraft.tsx (Karnataka Fishing Trawlers, Active Jet Skis & Parasail)
├── CatamaranHero.tsx (Flagship 25.90M Expedition Catamaran)
├── StMarysIsland.tsx (Hexagonal Columnar Basalt & Turquoise Lagoon)
└── WildlifeSystem.tsx (NEW: Soaring Kites, Leaping Dolphins, Fish Schools)
```

---

## 3. Implementation Tasks Plan

- **Task 0: Create Native Arabian Sea Wildlife System (`WildlifeSystem.tsx`)**
  - Implement flocking Brahminy sea birds, leaping dolphin pod with water splash rings, and shallow water fish schools.
- **Task 1: Transform Atmosphere to Breathtaking Coastal Sunset (`AtmosphereSky.tsx`)**
  - Update sky dome gradient, 5200K sun direction, long golden shadows, and volumetric distance fog.
- **Task 2: Expand Coconut Palm Population to 600+ Trees (`VegetationSystem.tsx`)**
  - Double palm density across $Z = 0\text{m} \to 1200\text{m}$ with seaward wind bowing and organic debris.
- **Task 3: Enrich Active Watersports & Towing Parasail (`MarineCraft.tsx`)**
  - Add high-altitude parasail canopy towed by speed boat, active jet skis with particle spray wakes.
- **Task 4: Final Camera Trajectory Easing & System Integration (`WorldScene.tsx`)**
  - Ultra-smooth 12-beat spline interpolation, full test suite pass (100%), and 6-point visual QA.
