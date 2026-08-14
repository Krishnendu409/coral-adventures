# Cinematic Chain Reaction Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 10-link continuous physical chain-reaction transition system for Coral Adventures where every scene transforms into the next (Ocean $\rightarrow$ Wave $\rightarrow$ Coast $\rightarrow$ Map $\rightarrow$ Wake $\rightarrow$ Vessel $\rightarrow$ Underwater $\rightarrow$ Sunset $\rightarrow$ Dinner $\rightarrow$ Night $\rightarrow$ Concierge) with authentic verified coordinates, zero visual repetition, natural photographic dynamic range, and Coral logo palette.

**Architecture:** Independent scene ownership pattern where each scene component manages its entrance, physical transformation, and exit transition using Lenis-synchronized GSAP ScrollTriggers and GPU-accelerated transforms, linked seamlessly within `src/app/page.tsx`.

**Tech Stack:** Next.js 16 (Turbopack, App Router), React 19, GSAP 3.15 + ScrollTrigger, Lenis 1.3, Tailwind CSS v4, Vitest 4.

## Global Constraints

- **Palette Source of Truth:** Coral Accent `#E07A5F`, Champagne Gold `#C5A880`, Warm Alabaster `#FBFBF9`, Linen `#F4EFE6`, Sand `#E5DFD5`, Marine Espresso `#12181F`, Deep Marine `#0D2B45`, Midnight Sapphire `#071422`.
- **Photographic Standard:** Natural photographic color with preserved dynamic range, rich but restrained saturation, no milky white haze, no crushed blacks, and no artificial HDR processing.
- **Visual Ratio:** 60% Exploration, 25% Luxury, 15% Hospitality.
- **Verified Coordinates:** Malpe Harbor (`13°21′02″ N · 74°42′08″ E`), Coconut Island (`13°22′45″ N · 74°40′28″ E`), Daria-Bahadurgad (`13°20′18″ N · 74°41′32″ E`), Open Arabian Sea Waypoint (`13°22′00″ N · 74°35′00″ E`).
- **No Full-Page Pin:** Only cinematic scenes pin individually; Concierge and Footer use normal document scroll.

---

### Task 1: Verified Coordinates & Marine Expedition Data Model

**Files:**
- Create: `src/lib/expeditionData.ts`
- Modify: `src/__tests__/journey.test.ts`

**Interfaces:**
- Produces: `WAYPOINTS`, `VESSEL_SPECS`, `HORIZONS`, `getNavThemeForSection(sectionId: string)`

- [ ] **Step 1: Write the failing unit tests for verified coordinates and data**

```typescript
// in src/__tests__/journey.test.ts
import { describe, it, expect } from "vitest";
import { WAYPOINTS, VESSEL_SPECS, HORIZONS, getNavThemeForSection } from "@/lib/expeditionData";

describe("Expedition Verified Data & Telemetry", () => {
  it("contains verified exact coordinates for Malpe and St Marys", () => {
    expect(WAYPOINTS.malpeHarbor.coords).toBe("13°21′02″ N · 74°42′08″ E");
    expect(WAYPOINTS.coconutIsland.coords).toBe("13°22′45″ N · 74°40′28″ E");
    expect(WAYPOINTS.dariaBahadurgad.coords).toBe("13°20′18″ N · 74°41′32″ E");
  });

  it("contains authentic vessel specifications", () => {
    expect(VESSEL_SPECS.length).toBe("25.90 M");
    expect(VESSEL_SPECS.beam).toBe("8.00 M");
    expect(VESSEL_SPECS.capacity).toBe("170");
  });

  it("maps section IDs to correct environment-aware navigation themes", () => {
    expect(getNavThemeForSection("hero")).toBe("transparent");
    expect(getNavThemeForSection("discover")).toBe("alabaster");
    expect(getNavThemeForSection("chart")).toBe("paper");
    expect(getNavThemeForSection("underwater")).toBe("marine");
    expect(getNavThemeForSection("night")).toBe("sapphire");
    expect(getNavThemeForSection("book")).toBe("linen");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL ("Cannot find module '@/lib/expeditionData'")

- [ ] **Step 3: Implement `src/lib/expeditionData.ts`**

```typescript
export const WAYPOINTS = {
  malpeHarbor: {
    name: "Malpe Harbor Departure Pier",
    coords: "13°21′02″ N · 74°42′08″ E",
    description: "Active maritime port & sheltered estuary departure point",
  },
  coconutIsland: {
    name: "Coconut Island (St. Mary's)",
    coords: "13°22′45″ N · 74°40′28″ E",
    description: "National Geological Monument · Columnar basalt formations",
  },
  dariaBahadurgad: {
    name: "Daria-Bahadurgad Isle",
    coords: "13°20′18″ N · 74°41′32″ E",
    description: "Ancient fort isle & southern natural breakwater",
  },
  openArabianSea: {
    name: "Arabian Sea Expedition Horizon",
    coords: "13°22′00″ N · 74°35′00″ E",
    description: "Open water cruising grounds · 30-fathom expedition route",
  },
};

export const VESSEL_SPECS = {
  name: "Coral Explorer I",
  type: "Twin-Hull Architectural Catamaran",
  length: "25.90 M",
  beam: "8.00 M",
  capacity: "170",
  features: ["Open Sky Deck", "Shaded Lounge", "Dual Observation Salons"],
};

export const HORIZONS = [
  { id: "sunset", label: "SUNSET CRUISE", time: "17:30 - 19:30 · CHASE THE LIGHT" },
  { id: "dinner", label: "DINNER CRUISE", time: "19:30 - 22:00 · COASTAL DINING" },
  { id: "dj", label: "DJ CRUISE", time: "21:00 - LATE · NIGHT VOYAGE" },
  { id: "private", label: "PRIVATE CHARTER", time: "BESPOKE ITINERARY · YOUR ROUTE" },
  { id: "celebration", label: "CELEBRATION EXPEDITION", time: "PRIVATE VOYAGE · OPEN DECK" },
];

export function getNavThemeForSection(sectionId: string): "transparent" | "alabaster" | "paper" | "marine" | "sapphire" | "linen" {
  switch (sectionId) {
    case "hero":
      return "transparent";
    case "discover":
    case "vessel":
      return "alabaster";
    case "destination":
    case "chart":
      return "paper";
    case "underwater":
      return "marine";
    case "night":
    case "experiences":
      return "sapphire";
    case "book":
      return "linen";
    default:
      return "alabaster";
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

---

### Task 2: Environment-Aware Dynamic Navigation Header

**Files:**
- Modify: `src/components/ui/navigation.tsx`
- Modify: `src/__tests__/navigation.test.tsx`

- [ ] **Step 1: Update navigation tests for environment-aware styling**
- [ ] **Step 2: Update `Navigation.tsx` with theme classes matching the active scene**
  - Transparent over Hero
  - Sunlit Alabaster over Discovery & Vessel
  - Parchment Paper over Chart
  - Marine Translucent over Underwater
  - Deep Sapphire over Night
  - Warm Linen over Concierge
- [ ] **Step 3: Run `npm test` and verify 100% pass**

---

### Task 3: Hero Scene — Ocean Video & Water-Distortion Text Dissolve (`Link 01`)

**Files:**
- Modify: `src/components/scenes/HeroWandr.tsx`

- [ ] **Step 1: Implement full-bleed moving ocean video with poster image fallback**
- [ ] **Step 2: Implement GSAP scroll camera push (`scale: 1.12`) and horizontal water-ripple distortion text dissolve (`scaleX: 1.15, skewX: -4deg, opacity: 0`)**
- [ ] **Step 3: Wire organic wave foam mask entering from bottom (`translateY: 100%` to `-120%`)**
- [ ] **Step 4: Verify in DevTools at 0px to 1000px**

---

### Task 4: The Wandr Wave $\rightarrow$ Malpe Basalt Discovery $\rightarrow$ Contour Trace (`Link 02 & 03`)

**Files:**
- Modify: `src/components/scenes/HeroWandr.tsx`
- Modify: `src/components/scenes/ActTwoDiscovery.tsx`

- [ ] **Step 1: Match wave foam with crashing foam on St. Mary's volcanic columnar basalt (`/images/malpe_basalt_yacht.jpg`)**
- [ ] **Step 2: Render asymmetrical editorial plaque for `"01 / EXPEDITION VOYAGE · BEYOND THE SHORE."` with Coconut Island coordinates (`13°22′45″ N · 74°40′28″ E`)**
- [ ] **Step 3: Implement golden SVG contour line edge-tracing of basalt formations as camera pulls into high-altitude view**
- [ ] **Step 4: Verify in DevTools at 1200px to 2200px**

---

### Task 5: Nautical Chart $\rightarrow$ Accelerated Route $\rightarrow$ Catamaran Wake $\rightarrow$ The Vessel (`Link 04 & 05`)

**Files:**
- Modify: `src/components/scenes/ActTwoMap.tsx`
- Modify: `src/components/scenes/ActThreeVessel.tsx`

- [ ] **Step 1: Render warm parchment nautical chart (`#F4EFE6`) with animated coral route line from Malpe Harbor (`13°21′02″ N`) to 30-fathom horizon**
- [ ] **Step 2: Route line accelerates into white foaming water and expands into the catamaran's twin wake lines**
- [ ] **Step 3: Camera tracks along wake to reveal the 25.90M catamaran on sapphire sea (`/images/vessel_catamaran.jpg`) with authentic architectural specifications**
- [ ] **Step 4: Verify in DevTools at 2600px to 4600px**

---

### Task 6: Vessel Bow $\rightarrow$ Waterline Submersion $\rightarrow$ Underwater Coral Realm $\rightarrow$ Surface Break (`Link 06 & 07`)

**Files:**
- Modify: `src/components/scenes/ActThreeAdventure.tsx`
- Modify: `src/components/scenes/ActFourTime.tsx`

- [ ] **Step 1: Waterline physically rises across the viewport (`translateY: -100%`), passing the vessel shadow overhead**
- [ ] **Step 2: Reveal sunlit turquoise coral reef with piercing sunbeams and marine biodiversity (`/images/underwater_marine.jpg`)**
- [ ] **Step 3: Camera ascends through water and breaks the surface into golden hour sunset catamaran (`/images/sunset_catamaran.jpg` — `"CHASE THE LIGHT."`)**
- [ ] **Step 4: Verify in DevTools at 5000px to 7400px**

---

### Task 7: Sunset Orb $\rightarrow$ Candlelight Match Cut $\rightarrow$ Dinner at Sea $\rightarrow$ Star $\rightarrow$ Midnight Sapphire (`Link 08 & 09`)

**Files:**
- Modify: `src/components/scenes/ActFourTime.tsx`

- [ ] **Step 1: Setting sun orb shrinks to a glowing ember on the horizon line and morphs into a candle flame on a teak yacht dining table (`/images/dining_deck.jpg` — `"DINNER, WITH NO WALLS."`)**
- [ ] **Step 2: Twilight transitions to deep sapphire; camera pushes into candle flame; flame contracts into a single star**
- [ ] **Step 3: Camera pulls back to reveal the deep sapphire night sky (`#071422`) with constellations over calm sea (`/images/night_sapphire.jpg` — `"NIGHT BELONGS TO THE SEA. JUST HORIZON."`)**
- [ ] **Step 4: Verify in DevTools at 7600px to 9600px**

---

### Task 8: Moonlight Reflection $\rightarrow$ Warm Linen Concierge Desk (`Link 10`)

**Files:**
- Modify: `src/components/scenes/ActFiveBooking.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Horizontal moonlight reflection flattens into a razor-thin gold hairline (`#C5A880`)**
- [ ] **Step 2: Ocean texture warms into tactile natural linen paper (`#F4EFE6`), anchoring the private concierge desk (`"WHERE WILL YOU GO?"`)**
- [ ] **Step 3: Accessible booking controls with WAI-ARIA radiogroups and validated submission**
- [ ] **Step 4: Verify in DevTools at 10000px to end**

---

### Task 9: Full Multi-Device & Performance Verification

**Files:**
- Run: `npm test`
- Run: `npm run build`
- Browser Audit: Chrome DevTools across viewports (1440px, 1280px, 1024px, 390px)

- [ ] **Step 1: Run all unit tests with `npm test`**
- [ ] **Step 2: Run production build with `npm run build`**
- [ ] **Step 3: Perform live scroll audit in Chrome DevTools checking every single transformation link and taking screenshots**
- [ ] **Step 4: Update `walkthrough.md` with complete evidence**
