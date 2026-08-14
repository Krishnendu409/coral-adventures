# Master Design Spec — Coral Adventures: The Cinematic Chain Reaction

## 1. Executive Vision & Core Law

> **"EVERY SCENE MUST TRANSFORM INTO THE NEXT. NOTHING SIMPLY DISAPPEARS."**

Coral Adventures is an unhurried, sun-drenched luxury marine expedition brand combining:
$$\text{Riviera Luxury} \times \text{Indian Coastal Exploration (Malpe / St. Mary's)} \times \text{Private Yacht Expedition}$$

The emotional journey balances:
$$\mathbf{60\%\text{ Exploration}} \quad\vert\quad \mathbf{25\%\text{ Luxury}} \quad\vert\quad \mathbf{15\%\text{ Hospitality}}$$

The website behaves as **one continuous camera traveling through a single 24-hour cycle on the Arabian Sea**, progressing emotionally from wonder to curiosity, discovery, momentum, adventure, immersion, awe, intimacy, tranquility, and desire.

---

## 2. Color System & Photographic Art Direction

### Palette Derived from the Coral Logo
* **Coral Brand Accent (`#E07A5F` / `rgb(224, 122, 95)`):** Live route lines, active waypoint markers, button highlights, section numbers, radiogroup states.
* **Champagne Gold (`#C5A880` / `rgb(197, 168, 128)`):** Hairline dividers, bathymetric contours, coordinates, subtle metadata accents.
* **Sunlit Alabaster (`#FBFBF9` / `rgb(251, 251, 249)`):** Dominant warm off-white background and floating editorial plaques.
* **Warm Natural Linen (`#F4EFE6` / `rgb(244, 239, 230)`):** Concierge desk, nautical chart paper underlay.
* **Fine Sand Border (`#E5DFD5` / `rgb(229, 223, 213)`):** Structural hairline borders.
* **Marine Espresso (`#12181F` / `rgb(18, 24, 31)`):** High-contrast editorial display typography and dark accents.
* **Deep Marine Ocean (`#0D2B45` / `rgb(13, 43, 69)`):** Open sea depths and underwater ambient gradient.
* **Midnight Sapphire (`#071422` / `rgb(7, 20, 34)`):** Midnight sky and nocturnal ocean waters.

### Photographic Grading Standard
* **Rule:** Natural photographic color with preserved dynamic range, rich but restrained saturation, no milky white haze, no crushed blacks, and no artificial HDR processing.
* **Asset Continuity:** Every scene features a distinct, dedicated visual subject sharing a coherent lens language, natural Arabian Sea sunlight, and a single consistent expedition vessel.

---

## 3. Verified Geographic Coordinates

To prevent generic metadata clutter, all navigation coordinates correspond to verified, specific geographic features:

| Feature / Waypoint | Verified Coordinates | Geological / Maritime Identity |
| :--- | :--- | :--- |
| **Malpe Harbor Departure** | `13°21′02″ N · 74°42′08″ E` | Active fishing port, departure pier & sheltered estuary |
| **Coconut Island (St. Mary's)** | `13°22′45″ N · 74°40′28″ E` | National Geological Monument, hexagonal columnar basalt |
| **Daria-Bahadurgad Isle** | `13°20′18″ N · 74°41′32″ E` | Ancient coastal fort isle & southern reef breakwater |
| **Arabian Sea Horizon Waypoint** | `13°22′00″ N · 74°35′00″ E` | Open water cruising grounds, 30-fathom expedition route |

---

## 4. The 10-Link Chain Reaction Storyboard & Compositional Rhythm

| Link | From $\rightarrow$ To | Physical Transformation Object | Compositional Style | Cinematic Pacing |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Open Ocean $\rightarrow$ Wave | Water $\rightarrow$ Organic Wave Mask | Environmental full-screen | **Medium** |
| **02** | Wave $\rightarrow$ Discovery | Wave Foam $\rightarrow$ Basalt Shore Foam | Editorial photo + asymmetrical plaque | **Slow** |
| **03** | Discovery $\rightarrow$ Map | Basalt Rock Edges $\rightarrow$ Contour Lines | Graphic / cartographic chart | **Slow** |
| **04** | Map $\rightarrow$ Vessel | Route Line $\rightarrow$ Accelerating Foam Wake | Trajectory zoom into wake | **Fast** |
| **05** | Vessel $\rightarrow$ Underwater | Catamaran Bow $\rightarrow$ Waterline Submersion | Architectural product presentation | **Dramatic** |
| **06** | Underwater $\rightarrow$ Sunset | Sunlit Reef $\rightarrow$ Surface Breakthrough | Immersive marine realm | **Medium** |
| **07** | Sunset $\rightarrow$ Dinner | Setting Sun Orb $\rightarrow$ Table Candle Flame | Minimal cinematic landscape | **Very Slow** |
| **08** | Dinner $\rightarrow$ Night | Candle Flame $\rightarrow$ Celestial Star | Intimate human-scale dining | **Extremely Slow** |
| **09** | Night $\rightarrow$ Concierge | Moonlight Reflection $\rightarrow$ Gold Hairline | Atmospheric midnight sapphire | **Slow** |
| **10** | Concierge Desk | Gold Hairline $\rightarrow$ Warm Linen Paper | Architectural editorial form | **Normal Scroll** |

---

## 5. Scene-by-Scene Architectural Specifications

### Scene 00: Hero — Open Arabian Sea
* **Visuals:** Full-bleed moving ocean video (`/videos/hero_ocean.mp4`) with fallback image (`/images/hero_ocean.jpg`). Warm natural sunlight on moving water.
* **Choreography:** As scroll begins, camera pushes into the water (`scale: 1.12`). The typography `CORAL ADVENTURES` distorts horizontally through water ripples into the sea highlights.

### Scene 01: The Wandr Wave $\rightarrow$ Discovery
* **Visuals:** Organic SVG shoreline wave crest (`/images/wave_foam_crest.jpg`) sweeps across the screen.
* **Match Cut:** The wave's foam matches the natural foam around the volcanic columnar basalt formations of St. Mary's Island (`/images/malpe_basalt_yacht.jpg`).
* **Composition:** Asymmetrical editorial plaque `"01 / EXPEDITION VOYAGE · BEYOND THE SHORE."` with narrative copy and Coconut Island coordinates (`13°22′45″ N · 74°40′28″ E`).

### Scene 02: Discovery $\rightarrow$ Nautical Chart
* **Transformation:** Basalt rock silhouettes are traced by golden SVG lines (`strokeDashoffset`) as the camera pulls into bird's-eye view, turning into depth contours on a warm parchment nautical chart (`#F4EFE6`).
* **Interactive Element:** Route draws from Malpe Pier (`13°21′02″ N`) through St. Mary's to the 30-fathom mark (`13°22′00″ N`).

### Scene 03: Route $\rightarrow$ Catamaran Wake $\rightarrow$ The Vessel
* **Transformation:** The route line hits the horizon, accelerates, stretches, turns stark white, and expands into frothing aerated wake.
* **Arrival:** The camera tracks along the wake to reveal the twin-hull 25.90M catamaran slicing through open sapphire water (`/images/vessel_catamaran.jpg`).
* **Specs:** `25.90 M LENGTH`, `8.00 M BEAM`, `170 GUEST CAPACITY`, `OPEN SKY DECK`.

### Scene 04: Vessel $\rightarrow$ Underwater Submersion
* **Descent:** Camera reaches the bow; waterline rises over the viewport; hull shadow passes overhead.
* **Realm:** Crystal turquoise water, sunbeams piercing the depth, volcanic reef shelves, and marine life (`/images/underwater_marine.jpg`). Navigation shifts to marine translucent.

### Scene 05: Underwater $\rightarrow$ Surface Break $\rightarrow$ Golden Hour Sunset
* **Ascent:** Camera ascends; water brightens; camera physically breaks the water surface to reveal the catamaran sailing westward toward the glowing sun orb (`/images/sunset_catamaran.jpg` — `"CHASE THE LIGHT."`).

### Scene 06: Sunset $\rightarrow$ Candlelight Match Cut $\rightarrow$ Dinner at Sea
* **Match Cut 1:** The setting sun orb sinks to the horizon and contracts into a pinpoint ember that becomes a candle flame on a teak yacht dining table (`/images/dining_deck.jpg` — `"DINNER, WITH NO WALLS."`).
* **Atmosphere:** Warm candlelight, fine glassware, linen, and local cuisine under amber twilight.

### Scene 07: Candle Flame $\rightarrow$ Star Match Cut $\rightarrow$ Midnight Sapphire
* **Match Cut 2:** Camera pushes into the candle flame until it fills the screen, then contracts into a celestial star. Pulling back reveals the deep sapphire night sky (`#071422`) and constellations (`/images/night_sapphire.jpg` — `"NIGHT BELONGS TO THE SEA. JUST HORIZON."`).

### Scene 08: Moonlight Reflection $\rightarrow$ Linen Concierge Desk
* **Arrival:** The moon's horizontal reflection across the sea stretches into a razor-thin gold hairline (`#C5A880`). The ocean dissolves into warm tactile linen and alabaster (`#F4EFE6` / `#FBFBF9`), anchoring the private concierge desk (`"WHERE WILL YOU GO?"`).
* **Form:** Accessible voyage selectors, custom guest details, and direct harbor concierge consultation.

---

## 6. Navigation Environmental States

The fixed header dynamically transitions to match each environment:
* **Hero:** Transparent / environmental.
* **Discovery & Vessel:** Sunlit Alabaster with fine sand border (`#FBFBF9`).
* **Nautical Chart:** Warm parchment linen (`#F4EFE6`).
* **Underwater:** Marine translucent (`#0D2B45/80`).
* **Night:** Deep sapphire (`#071422/85`).
* **Concierge:** Warm natural linen (`#F4EFE6`).

---

## 7. Verification Protocol

1. **Vitest Unit Test Suite:** Run `npm test` verifying journey coordinates, booking form validation, and adaptive navigation.
2. **Next.js Production Build:** Run `npm run build` ensuring 0 TypeScript/ESLint warnings and optimized static prerendering.
3. **Chrome DevTools Live Verification:** Incremental scroll audit across desktop (1440px, 1280px), tablet (1024px), and mobile (390px) verifying that every transformation link is visually continuous and buttery smooth.
