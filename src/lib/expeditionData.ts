/**
 * Coral Adventures — Verified Maritime & Expedition Telemetry Data
 * Derived from authoritative nautical coordinates and vessel design specifications.
 */

export interface Waypoint {
  id: string;
  name: string;
  coords: string;
  depthMeters?: number;
  description: string;
}

export const WAYPOINTS: Record<string, Waypoint> = {
  malpeHarbor: {
    id: "malpe-harbor",
    name: "Malpe Harbor Departure Pier",
    coords: "13°21′02″ N · 74°42′08″ E",
    description: "Active maritime port & sheltered estuary departure point",
  },
  coconutIsland: {
    id: "coconut-island",
    name: "Coconut Island (St. Mary's)",
    coords: "13°22′45″ N · 74°40′28″ E",
    description: "National Geological Monument · Hexagonal columnar basalt",
  },
  dariaBahadurgad: {
    id: "daria-bahadurgad",
    name: "Daria-Bahadurgad Isle",
    coords: "13°20′18″ N · 74°41′32″ E",
    description: "Ancient coastal fort isle & southern reef breakwater",
  },
  openArabianSea: {
    id: "arabian-sea-horizon",
    name: "Arabian Sea Expedition Horizon",
    coords: "13°22′00″ N · 74°35′00″ E",
    description: "Open water cruising grounds · 30-fathom expedition waypoint",
  },
};

export interface VesselSpecifications {
  name: string;
  type: string;
  length: string;
  beam: string;
  capacity: string;
  propulsion: string;
  cruisingSpeed: string;
  decks: string[];
}

export const VESSEL_SPECS: VesselSpecifications = {
  name: "Coral Explorer",
  type: "Twin-Hull Architectural Catamaran",
  length: "25.90 M",
  beam: "8.00 M",
  capacity: "170",
  propulsion: "Twin Marine Diesel with Low-Emission Wet Exhaust",
  cruisingSpeed: "14 Knots",
  decks: [
    "Open Teak Sky Deck",
    "Panoramic Shaded Lounge",
    "Dual Observation Salons",
  ],
};

export interface HorizonExperience {
  id: string;
  label: string;
  time: string;
  subhead: string;
  vibe: string;
}

export const EXPEDITION_HORIZONS: HorizonExperience[] = [
  {
    id: "sunset",
    label: "SUNSET CRUISE",
    time: "17:30 - 19:30",
    subhead: "CHASE THE LIGHT",
    vibe: "Golden hour sailing toward the Arabian Sea horizon as the light dissolves into warm amber.",
  },
  {
    id: "dinner",
    label: "DINNER CRUISE",
    time: "19:30 - 22:00",
    subhead: "DINNER, WITH NO WALLS",
    vibe: "Candlelit teak dining on open water featuring coastal cuisine under twilight.",
  },
  {
    id: "dj",
    label: "DJ CRUISE",
    time: "21:00 - LATE",
    subhead: "SOUNDS ACROSS THE WATER",
    vibe: "Curated soundscapes and open sky deck dancing beneath the stars.",
  },
  {
    id: "private",
    label: "PRIVATE CHARTER",
    time: "CUSTOM TIMING",
    subhead: "YOUR EXPEDITION, YOUR ROUTE",
    vibe: "Tailored private voyage around St. Mary's archipelago with bespoke concierge service.",
  },
  {
    id: "celebration",
    label: "CELEBRATION EXPEDITION",
    time: "HALF / FULL DAY",
    subhead: "MILESTONES AT SEA",
    vibe: "Exclusive gatherings and landmark events across the Arabian coastline.",
  },
];

export type NavTheme = "transparent" | "alabaster" | "paper" | "marine" | "sapphire" | "linen";

export function getNavThemeForSection(sectionId: string): NavTheme {
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

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
