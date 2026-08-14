# Design Specification: Coral Adventures — Malpe Waterfront Digital Twin (Zone 01)
**Date:** 2026-08-14  
**Topic:** Museum-Grade WebGL Digital Twin & Spatial Expedition Environment  
**Reference Model:** Getty's *Persepolis Reimagined* (Spatial Architecture) + Authentic Coastal Karnataka Geography (Malpe / Udupi)

---

## 1. Executive Vision & Core Philosophy

> **"The environment is the product. The user is not browsing a 3D website or watching slides; they are physically standing inside an authentic Coral Adventures expedition base on the Malpe coastline in Udupi, Karnataka."**

### Foundational Tenets:
1. **One Continuous 3D Coordinate Space:** All 14 spatial landmarks exist inside a single physical coordinate system. There are no scene swaps, no slide transitions, no giant background cross-fades, and no fake 2D backdrops. Turning 180° at any point reveals the world behind you.
2. **Authentic Karnataka Geography + Coral Operation:** Grounded in real Malpe topography (Malpe Beach, Udyavara/Papanashini water system, Malpe Sea Walk / Harbour Edge walkway, active fishing harbour with working trawlers, Arabian Sea horizon, and distant silhouette of St. Mary's Island). Coral Adventures is the refined, high-end expedition operator built authentically within this working coastal context.
3. **Controlled Imperfection:** The world is not a sanitized luxury resort. It features weathered timber, marine ropes, brass and iron hardware, irregular laterite stone paving, coconut palms of varying heights, natural sand gradients, and subtle fishing activity. Coral Adventures provides the refined, tailored expedition touchpoints within this living maritime setting.
4. **Three-Layer Environmental Model:**
   - **Layer 1 — Geography (Permanent):** Sand terrain, shoreline, ocean basin, coastal estuary, distant island silhouette, sky, natural vegetation.
   - **Layer 2 — Infrastructure (Permanent):** Coast road, laterite paths, Sea Walk, boarding jetty, pavilion architecture, reception desk, watersports staging, boat moorings.
   - **Layer 3 — Living World (Dynamic):** Swaying palm fronds, rolling ocean swells with shoreline foam and caustics, flags moving in sea breeze, boats gently bobbing with wave physics, distant sea birds crossing the horizon, moving clouds, shifting sunlight.
5. **Three Camera Movement States (Human-Scale ~1.7m Eye Level):**
   - **GUIDED:** Smooth, physics-eased camera travel along an authorial spline at natural walking pace with subtle vertical cadence.
   - **LOOK:** Controlled pan and tilt within natural visual bounds to preserve cinematic composition and avoid looking into empty seams.
   - **DISCOVERY:** Camera slows or pauses near key objects; approaching reveals subtle interactive discovery markers.
6. **Editorial Expedition Annotations (No Glassmorphism):** Information appears as physical field notes on warm alabaster/linen surfaces with fine champagne-gold hairline rules (`#C5A059`), serif typography, and coordinates metadata. No rounded blur soup or SaaS cards.
7. **Diegetic 3D Nautical Chart (Map Mode):** Pressing MAP pulls the camera up into an aerial perspective of Malpe Harbour. Buildings simplify to silhouettes, the sea shifts to deep cartographic blue, and bathymetric route lines appear. Clicking any waypoint launches a cinematic camera dive directly down to that landmark.
8. **The Explorable 25.90M Catamaran:** A major explorable landmark where the visitor approaches the hull, climbs the gangway, inspects the aft cockpit, saloon, and upper flybridge, and views Malpe from the water before casting off.

---

## 2. Spatial Landmark Architecture (Zone 01: 14 Connected Moments)

```
[ MALPE COASTAL ROAD ]
       │
       ▼
 00. ARRIVAL ROAD
     - Coast road fringed with Karnataka coconut palms, laterite stone walls, and sea breeze.
       │
       ▼
 01. CORAL PORTAL & WAYFINDING
     - Weathered teak gateway totem with carved coordinates (13°21′02″ N · 74°42′08″ E) and expedition compass.
       │
       ▼
 02. ARRIVAL GARDENS
     - Landscaped coastal courtyard, indigenous shrubs, laterite walkway, soft morning shadows.
       │
       ▼
 03. ARRIVAL PAVILION
     - Open-air post-and-beam timber pavilion with tensile canvas roof framing views of the sea.
       │
       ▼
 04. RECEPTION & EXPEDITION CONCIERGE
     - Linen-and-teak orientation counter, embossed Coral emblem, printed waterproof voyage itineraries.
       │
       ▼
 05. CORAL EXPLORATION DECK
     - Elevated panoramic terrace overlooking Malpe Beach, the watersports shallows, and the open sea.
       │
       ▼
 06. BEACH PROMENADE
     - Sunlit stone-and-sand path shaded by coconut palms leading down to the water's edge.
       │
       ▼
 07. WATERSPORTS BASE
     - High-performance Seadoo Jet Skis, touring kayaks, paddleboards, safety escorts, and equipment racks.
       │
       ▼
 08. LIVING SHORELINE
     - Natural sand gradient (dry dune to wet compact sand) meeting crystal turquoise water with dynamic foam caustics.
       │
       ▼
 09. MALPE SEA WALK / HARBOUR EDGE
     - Raised coastal walkway skirting the harbour entrance with views of local fishing trawlers.
       │
       ▼
 10. BOARDING JETTY
     - Heavy marine timber pier with mooring bollards, coiled ropes, fenders, and water lapping against piles.
       │
       ▼
 11. HARBOUR & ISLAND VIEW
     - Looking northwest across the Arabian Sea toward the distant silhouette of St. Mary's Island.
       │
       ▼
 12. 25.90M CATAMARAN (ONBOARDING)
     - Twin-hull hydrodynamic inspection, gangway boarding, aft cockpit, teak saloon, and upper flybridge deck.
       │
       ▼
 13. VOYAGE DEPARTURE
     - Mooring lines cast off, twin diesels engage, catamaran pivots into open water; transition into Chapter 02.
```

---

## 3. Asset & Material Pipeline (`src/data/assets.ts`)

| Category | Description | Asset Source / License | Materials & Technical Details |
|---|---|---|---|
| **Architecture** | Arrival Pavilion, Reception Desk, Exploration Deck, Benches | Custom GLTF + Poly Haven PBR | Teak wood grain (PBR Albedo/Roughness/Normal), Tensile Canvas, Laterite Stone |
| **Vegetation** | Coastal Karnataka Coconut Palms (4 height/curve variations), shrubs, grasses | Poly Haven / CC0 GLB | PBR alpha-cutout fronds, vertex shader wind oscillation |
| **Terrain & Shore** | Malpe Beach sand gradient, dry/wet transitions, rock formations | Poly Haven PBR Scans | Albedo, Roughness, Normal, displacement depth |
| **Harbour & Marine** | Timber jetty, mooring bollards, ropes, fenders, fishing trawlers | Poly Haven / CC0 GLTF | Weathered wood, rusted cast iron, coiled marine rope |
| **Watercraft** | Seadoo Jet Skis, touring kayaks, paddleboards | Licensed CC0 GLTF | PBR fiberglass/metal gloss, physical wave bobbing |
| **Hero Catamaran** | 25.90M Twin-Hull Luxury Expedition Vessel | Custom GLTF Model | Hydrodynamic twin hulls, bridged saloon, flybridge, radar mast, Coral brand badge |
| **Ocean Water** | Arabian Sea coastal water system | Custom GLSL Shader | Fresnel reflections, depth color gradient (turquoise to sapphire), dynamic wave displacement, foam crests |
| **Skybox & Sun** | Sunlit coastal morning lighting | Equirectangular Sky + Directional Sun | 5500K golden sunlight, PCF soft shadows, ACES Filmic tone mapping |

---

## 4. Physical Brand Integration

Rather than generic browser overlays, the **Coral Adventures brand exists physically inside the 3D world**:
- **Arrival Portal:** Carved wooden Coral Adventures sign above entrance.
- **Reception:** Embossed Coral emblem on teak timber counter.
- **Wayfinding:** Coastal timber totem with carved compass bearings and distance to St. Mary's (`13°21′02″ N · 74°42′08″ E`).
- **Watersports Base:** Branded life vests, flags, and equipment staging.
- **Boarding Jetty:** Cast brass identification plaque on pier bollard.
- **Catamaran:** Physical hull logo badge and observation flags.

---

## 5. UI & Editorial Expedition Annotations

### Disappearing Minimal Interface:
- **Top-Left:** Small, refined Coral Adventures emblem (`/images/coral_logo_mark.png`) + active location tag (`MALPE WATERFRONT · EXPEDITION TERMINAL`).
- **Top-Right:** Minimal `SOUND`, `MAP`, and `EXIT` buttons.
- **In-World Wayfinding:** Subtle directional prompts on the path (`WALK TOWARD THE PAVILION →`, `PROCEED TO THE WATERSPORTS BASE →`, `CONTINUE TO THE JETTY →`).
- **Subtle Environmental Hotspots:** Completely invisible until the visitor approaches or hovers. A delicate gold/coral pin appears, opening an **editorial expedition annotation**:
  - Alabaster/linen texture card (`#FDFCF7` with `#EFE9DF` border).
  - Fine champagne-gold hairline rules (`#C5A059`).
  - Serif typography for headlines, monospace tracking for technical metadata (`08° / WATERLINE`, `25.90M TWIN-HULL`).
  - `STEP FORWARD HERE →` direct spatial camera movement.

---

## 6. Multi-Zone Positional Sound System (Web Audio API)

Soundscapes attenuate based on camera location:
1. **Moments 00–02 (Arrival & Gardens):** Rustling palm fronds, coastal morning birds, distant road/harbour rumble.
2. **Moments 03–05 (Pavilion & Deck):** Shaded timber acoustic resonance, gentle wind chime, soft voices.
3. **Moments 06–08 (Beach & Watersports):** Rhythmic ocean wave breaks on sand, jet ski engine hum, water splashes.
4. **Moments 09–11 (Sea Walk & Jetty):** Deep water slapping timber pilings, rope creaks, sea gulls.
5. **Moments 12–13 (25.90M Catamaran):** Marine diesel engine idle, wind through mast rig, twin hull wake.

---

## 7. Diegetic 3D Nautical Map System

- When the visitor clicks **`MAP`**, the camera elevates into an aerial high-angle view over Malpe Harbour and the coast.
- The 3D world smoothly cross-fades with a captain's nautical chart overlay displaying navigation waypoints (`WATERFRONT` $\rightarrow$ `BEACH` $\rightarrow$ `JETTY` $\rightarrow$ `OPEN SEA` $\rightarrow$ `ST. MARY'S`).
- Clicking any waypoint initiates a cinematic camera dive directly down to that position.

---

## 8. Quality Gate & Production Verification Tests

- **Test A (UI Deletion):** Hide all UI. Does the world still look like an authentic, believable place?
- **Test B (180° Reverse Look):** Turn the camera around 180°. Does the environment still make spatial sense?
- **Test C (10-Second Observation):** Stop moving for 10 seconds. Does the environment feel alive with natural motion (palms, water, clouds, birds)?
- **Test D (Landmark Continuity):** Walk continuously from Pavilion $\rightarrow$ Beach $\rightarrow$ Jetty without teleporting. Does the geography physically connect?
- **Test E (Natural Discovery):** Approach an object. Does discovery feel organic rather than game-like?
- **Test F (3D Map Elevation):** Open MAP. Does the map feel like a spatial representation of the world rather than a webpage overlay?
