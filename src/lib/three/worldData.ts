/**
 * Coral Adventures — Persepolis Reimagined 3D World Data & Waypoints
 * Spatial coordinates, camera trajectories, and contextual hotspots.
 */

export interface HotspotData {
  id: string;
  title: string;
  category: string;
  position: [number, number, number]; // 3D world coordinate
  specs?: { label: string; value: string }[];
  description: string;
  tagline: string;
  image?: string;
}

export interface WaypointZone {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  skyColor: string;
  waterColor: string;
  fogColor: string;
  fogDensity: number;
  sunIntensity: number;
  hotspots: HotspotData[];
}

export const EXPEDITION_ZONES: WaypointZone[] = [
  {
    id: "arrival",
    title: "MALPE WATERFRONT BASE",
    subtitle: "EXPEDITION ARRIVAL & PAVILION",
    category: "ZONE 01 · COASTAL GATEWAY",
    cameraPosition: [0, 8, 35],
    cameraTarget: [0, 2, 0],
    skyColor: "#e6f4f8",
    waterColor: "#00a8b5",
    fogColor: "#d9eff5",
    fogDensity: 0.012,
    sunIntensity: 1.6,
    hotspots: [
      {
        id: "pavilion",
        title: "WELCOME PAVILION",
        category: "ARCHITECTURE",
        position: [0, 3, 2],
        tagline: "Shaded Teak & Palm Kiosk",
        description:
          "The expedition begins under the open-air pavilion. Expedition hosts offer chilled towels, itinerary briefings, and marine sanctuary guidelines.",
        specs: [
          { label: "FACILITY", value: "Private Terminal" },
          { label: "COORDINATES", value: "13°21′02″ N · 74°42′08″ E" },
          { label: "SERVICES", value: "Concierge & Gear Prep" },
        ],
      },
      {
        id: "palm-promenade",
        title: "BEACH PROMENADE",
        category: "ENVIRONMENT",
        position: [-10, 1, 8],
        tagline: "Tropical Coastal Walkway",
        description:
          "A stone-and-sand path leading from the reception plaza directly to the active water sports zone and Malpe sands.",
        specs: [
          { label: "SURFACE", value: "Natural Sand & Teak" },
          { label: "DISTANCE TO WATER", value: "45 Meters" },
        ],
      },
    ],
  },
  {
    id: "beach",
    title: "THE LIVING BEACH",
    subtitle: "THE COAST IS ONLY THE BEGINNING",
    category: "ZONE 02 · SHORELINE",
    cameraPosition: [0, 4, 18],
    cameraTarget: [0, 0, -10],
    skyColor: "#def0f7",
    waterColor: "#00b4c5",
    fogColor: "#d0ebf3",
    fogDensity: 0.01,
    sunIntensity: 1.8,
    hotspots: [
      {
        id: "shoreline",
        title: "ORGANIC SHORELINE",
        category: "TIDAL ZONE",
        position: [0, 0.5, 4],
        tagline: "Golden Sands to Crystal Aqua",
        description:
          "Where the pale sands of Malpe meet the warm shallows of the Arabian Sea. Footsteps dissolve in the organic sea foam.",
        specs: [
          { label: "WATER TEMP", value: "28°C / 82°F" },
          { label: "TIDAL RANGE", value: "1.4 Meters" },
        ],
      },
    ],
  },
  {
    id: "watersports",
    title: "ACTIVE MARINE REALM",
    subtitle: "HIGH-VELOCITY WATERSPORTS",
    category: "ZONE 03 · SHALLOWS",
    cameraPosition: [-8, 3, 5],
    cameraTarget: [-4, 0.5, -15],
    skyColor: "#d2ecf5",
    waterColor: "#00c2d1",
    fogColor: "#c2e6f0",
    fogDensity: 0.008,
    sunIntensity: 2.0,
    hotspots: [
      {
        id: "jetski",
        title: "HIGH-VELOCITY JET SKI",
        category: "WATERSPORTS",
        position: [-6, 0.8, -10],
        tagline: "Arabian Sea Speed Circuit",
        description:
          "Unrestricted open-throttle runs across coastal swells with guided safety escorts and high-performance craft.",
        specs: [
          { label: "MAX SPEED", value: "45+ Knots" },
          { label: "ZONE", value: "Offshore Circuit" },
          { label: "DURATION", value: "20 / 40 Min" },
        ],
      },
      {
        id: "kayak",
        title: "SEA KAYAKING",
        category: "WATERSPORTS",
        position: [6, 0.6, -8],
        tagline: "Cove & Basalt Exploration",
        description:
          "Silent glide across crystal shallows and volcanic sea arches inaccessible to larger motor vessels.",
        specs: [
          { label: "CRAFT", value: "Tandem Ocean Kayak" },
          { label: "ROUTE", value: "Basalt Sanctuary" },
        ],
      },
      {
        id: "parasail",
        title: "HIGH-ALTITUDE PARASAIL",
        category: "AERIAL",
        position: [12, 12, -25],
        tagline: "300 Ft Coastal Panorama",
        description:
          "Take flight above the Malpe coastline for a 360-degree aerial panorama spanning St. Mary's to the Western Ghats.",
        specs: [
          { label: "ELEVATION", value: "300 Feet" },
          { label: "TOW VESSEL", value: "Custom Winch Boat" },
        ],
      },
    ],
  },
  {
    id: "jetty",
    title: "MARINA BOARDING JETTY",
    subtitle: "EXPEDITION EMBARKATION",
    category: "ZONE 04 · EMBARKATION",
    cameraPosition: [0, 4, -15],
    cameraTarget: [0, 2, -45],
    skyColor: "#cae8f2",
    waterColor: "#009bb0",
    fogColor: "#bfe0eb",
    fogDensity: 0.008,
    sunIntensity: 1.9,
    hotspots: [
      {
        id: "pier",
        title: "EXPEDITION PIER 01",
        category: "INFRASTRUCTURE",
        position: [0, 1.5, -28],
        tagline: "Heavy Teak Marina Dock",
        description:
          "The departure point where guests cross the gangway onto Coral Explorer. Ropes are singled up as engines warm to idle.",
        specs: [
          { label: "BERTH", value: "Deepwater Slip 01" },
          { label: "CREW", value: "Master & 6 Specialists" },
        ],
      },
    ],
  },
  {
    id: "vessel",
    title: "THE 25.90M CATAMARAN",
    subtitle: "FLAGSHIP VESSEL: CORAL EXPLORER",
    category: "ZONE 05 · FLAGSHIP VESSEL",
    cameraPosition: [8, 6, -42],
    cameraTarget: [0, 3, -55],
    skyColor: "#bde3ef",
    waterColor: "#097d99",
    fogColor: "#b0dbe7",
    fogDensity: 0.007,
    sunIntensity: 2.1,
    hotspots: [
      {
        id: "hull-specs",
        title: "TWIN-HULL ARCHITECTURE",
        category: "VESSEL DESIGN",
        position: [-4.2, 1, -55],
        tagline: "Zero-Roll Marine Engineering",
        description:
          "Wide-stance catamaran hulls deliver unmatched stability in open ocean swells, eliminating passenger roll and maximizing deck area.",
        specs: [
          { label: "LENGTH OVERALL", value: "25.90 Meters" },
          { label: "BEAM", value: "8.00 Meters" },
          { label: "CAPACITY", value: "170 Guests" },
          { label: "PROPULSION", value: "Twin Marine Diesel" },
        ],
      },
      {
        id: "sky-deck",
        title: "OPEN SKY VIEWING DECK",
        category: "VESSEL ZONE",
        position: [0, 5.5, -53],
        tagline: "360° Ocean Panorama",
        description:
          "Elevated teak sun deck providing unimpeded horizon views, sun loungers, and private cocktail service under open skies.",
        specs: [
          { label: "ELEVATION", value: "+4.5M Above Sea" },
          { label: "FEATURES", value: "Loungers & Canopy" },
        ],
      },
      {
        id: "bridge",
        title: "NAVIGATION BRIDGE",
        category: "OPERATIONS",
        position: [0, 4, -48],
        tagline: "State-of-the-Art Avionics",
        description:
          "Commercial marine radar, dual chartplotters, forward-looking sonar, and satellite weather telemetry.",
        specs: [
          { label: "CRUISING SPEED", value: "14-18 Knots" },
          { label: "NAVIGATION", value: "Dual Marine Radar" },
        ],
      },
    ],
  },
  {
    id: "opensea",
    title: "OPEN ARABIAN SEA",
    subtitle: "DEEP SEA TRANSIT & TWIN WAKE",
    category: "ZONE 06 · PASSAGE",
    cameraPosition: [0, 7, -80],
    cameraTarget: [0, 1, -140],
    skyColor: "#9ecce0",
    waterColor: "#055e78",
    fogColor: "#92c2d6",
    fogDensity: 0.005,
    sunIntensity: 2.2,
    hotspots: [
      {
        id: "wake",
        title: "TWIN FROTHING WAKE",
        category: "HYDRODYNAMICS",
        position: [0, 0.5, -70],
        tagline: "Hydrodynamic Efficiency",
        description:
          "Twin high-velocity wake streams trail kilometers into the sapphire distance as Malpe coast recedes into the haze.",
        specs: [
          { label: "SPEED", value: "18.4 Knots" },
          { label: "BEARING", value: "284° WNW" },
          { label: "DEPTH", value: "24 Fathoms" },
        ],
      },
    ],
  },
  {
    id: "stmarys",
    title: "ST. MARY'S ARCHIPELAGO",
    subtitle: "NATIONAL GEOLOGICAL MONUMENT",
    category: "ZONE 07 · DESTINATION",
    cameraPosition: [-12, 6, -145],
    cameraTarget: [0, 3, -165],
    skyColor: "#9ecce0",
    waterColor: "#00a2b8",
    fogColor: "#90c0d4",
    fogDensity: 0.006,
    sunIntensity: 2.0,
    hotspots: [
      {
        id: "basalt",
        title: "HEXAGONAL BASALT MONOLITHS",
        category: "GEOLOGY",
        position: [0, 4, -165],
        tagline: "88-Million-Year Volcanism",
        description:
          "Pristine columnar basalt formations created during the rifting of Madagascar from India during the Cretaceous epoch.",
        specs: [
          { label: "AGE", value: "88 Million Years" },
          { label: "DESIGNATION", value: "National Monument" },
          { label: "GEOLOGY", value: "Columnar Rhyolite" },
        ],
      },
      {
        id: "cove",
        title: "COCONUT ISLE COVE",
        category: "ANCHORAGE",
        position: [8, 1, -160],
        tagline: "Sheltered Crystal Anchorage",
        description:
          "Tranquil cove protected by the basalt breakwater, offering world-class snorkeling over sub-surface volcanic reefs.",
        specs: [
          { label: "ANCHORAGE", value: "Sheltered Basin" },
          { label: "SEABED", value: "Volcanic Shell Sand" },
        ],
      },
    ],
  },
  {
    id: "underwater",
    title: "SUB-SURFACE REEF REALM",
    subtitle: "VOLCANIC CORAL GARDENS",
    category: "ZONE 08 · SUB-SURFACE",
    cameraPosition: [0, -3, -190],
    cameraTarget: [0, -4, -210],
    skyColor: "#004d66",
    waterColor: "#003b4f",
    fogColor: "#003244",
    fogDensity: 0.035,
    sunIntensity: 0.9,
    hotspots: [
      {
        id: "coral",
        title: "VOLCANIC CORAL GARDENS",
        category: "MARINE ECOSYSTEM",
        position: [-3, -4, -205],
        tagline: "Sub-Surface Biodiversity",
        description:
          "Hard and soft corals encrusting submerged basalt pillars. Habitat for schooling snappers, angelfish, and spotted eagle rays.",
        specs: [
          { label: "DEPTH", value: "6-12 Meters" },
          { label: "WATER CLARITY", value: "18M Visibility" },
          { label: "SPECIES", value: "70+ Marine Species" },
        ],
      },
      {
        id: "caustics",
        title: "SUNLIGHT CAUSTICS",
        category: "OPTICS",
        position: [4, -2, -200],
        tagline: "Refracted Light Rays",
        description:
          "Dancing golden light beams filtering through the surface swells onto the sea floor.",
        specs: [
          { label: "OPTICAL PHENOMENON", value: "Wave Refraction" },
        ],
      },
    ],
  },
  {
    id: "sunset",
    title: "GOLDEN HOUR SPRINT",
    subtitle: "CHASE THE LIGHT",
    category: "ZONE 09 · TWILIGHT",
    cameraPosition: [0, 5, -240],
    cameraTarget: [0, 2, -290],
    skyColor: "#f39257",
    waterColor: "#a3451e",
    fogColor: "#e57840",
    fogDensity: 0.007,
    sunIntensity: 2.5,
    hotspots: [
      {
        id: "sunset-orb",
        title: "ARABIAN HORIZON SUNSET",
        category: "ATMOSPHERIC",
        position: [0, 6, -290],
        tagline: "262° Azimuth Golden Hour",
        description:
          "The sun dips below the horizon in an explosion of vermilion, amber, and gold. Cocktails served on the upper viewing deck.",
        specs: [
          { label: "TIME", value: "18:15 HRS" },
          { label: "BEARING", value: "262° West" },
        ],
      },
    ],
  },
  {
    id: "dining",
    title: "THEATER OF COASTAL DINING",
    subtitle: "DINNER, WITH NO WALLS",
    category: "ZONE 10 · SALOON",
    cameraPosition: [2, 3.5, -315],
    cameraTarget: [0, 2.5, -325],
    skyColor: "#1d233c",
    waterColor: "#0b1626",
    fogColor: "#161b2e",
    fogDensity: 0.01,
    sunIntensity: 0.8,
    hotspots: [
      {
        id: "candle-table",
        title: "TEAK CANDLELIT TABLE",
        category: "GASTRONOMY",
        position: [0, 2.2, -322],
        tagline: "Private Chef Tasting",
        description:
          "Fine linen, crystal glassware, and warm flickering candlelight. Artisanal seafood caught fresh and paired with vintage wines.",
        specs: [
          { label: "CUISINE", value: "Coastal Seafood Tasting" },
          { label: "SETTING", value: "Open-Air Ocean Saloon" },
          { label: "CHEF", value: "Private Culinary Team" },
        ],
      },
    ],
  },
  {
    id: "night",
    title: "MIDNIGHT STARGAZING",
    subtitle: "NIGHT BELONGS TO THE SEA",
    category: "ZONE 11 · CELESTIAL",
    cameraPosition: [0, 5, -350],
    cameraTarget: [0, 15, -370],
    skyColor: "#050a14",
    waterColor: "#03060c",
    fogColor: "#050912",
    fogDensity: 0.005,
    sunIntensity: 0.2,
    hotspots: [
      {
        id: "starlight",
        title: "CELESTIAL SPHERE",
        category: "ASTRONOMY",
        position: [0, 20, -360],
        tagline: "Zero Light Pollution",
        description:
          "Untouched starry sky stretching across the silent Arabian Sea. Bioluminescent plankton light up the vessel's gentle drift.",
        specs: [
          { label: "TIME", value: "22:00 Midnight" },
          { label: "VISIBILITY", value: "Milky Way Galaxy" },
        ],
      },
    ],
  },
  {
    id: "concierge",
    title: "EXPEDITION CONCIERGE",
    subtitle: "WHERE WILL YOU GO?",
    category: "ZONE 12 · RESERVATIONS",
    cameraPosition: [0, 3, -390],
    cameraTarget: [0, 2, -405],
    skyColor: "#eef2f5",
    waterColor: "#0a2b45",
    fogColor: "#e2e8ec",
    fogDensity: 0.012,
    sunIntensity: 1.5,
    hotspots: [
      {
        id: "booking-desk",
        title: "PRIVATE CHARTER DESK",
        category: "CONCIERGE",
        position: [0, 2, -402],
        tagline: "Bespoke Itinerary Planning",
        description:
          "Plan your custom voyage, celebration charter, or exclusive sunset cruise with our marine concierge team.",
        specs: [
          { label: "CONSULTATION", value: "Complimentary" },
          { label: "RESPONSE TIME", value: "Within 2 Hours" },
        ],
      },
    ],
  },
];
