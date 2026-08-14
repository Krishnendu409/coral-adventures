/**
 * CORAL ADVENTURES — 3D WORLD PRODUCTION DOSSIER & STORYBOARD SPECIFICATION
 * 
 * Single source of truth for the 8-chapter cinematic expedition storyboard.
 * Contains narrative story beats, director's camera telemetry, environmental parameters,
 * guide bird tracking states, production asset registries, and transition logic.
 */

export interface CameraSpec {
  framing: string;
  height: string;
  lens: string;
  aperture: string;
  movement: string;
  focusTarget: string;
  fov: number;
}

export interface AssetRequirement {
  name: string;
  type: 'HERO ASSET' | 'SECONDARY ASSET' | 'ENVIRONMENT' | 'SPECIAL FX';
  status: 'CUSTOM MODEL' | 'SOURCED PBR' | 'PROCEDURAL SHADER' | 'PARTICLE SYSTEM';
  polyTarget: string;
  description: string;
}

export interface StoryboardFrameData {
  id: string;
  chapter: number;
  chapterCode: string;
  title: string;
  location: string;
  coordinates: string;
  timeOfDay: string;
  colorTemperature: string;
  mood: string;
  heroImage: string;
  heroImageAlt: string;
  supportingImages: {
    src: string;
    caption: string;
    tag: string;
  }[];
  camera: CameraSpec;
  story: string;
  environment: string;
  character: {
    state: string;
    position: string;
    action: string;
    meaning: string;
  };
  lighting: {
    description: string;
    skyCondition: string;
    shadowQuality: string;
    fogDensity: string;
  };
  palette: {
    name: string;
    hex: string;
  }[];
  density: 'low' | 'medium' | 'high' | 'very low';
  assets: AssetRequirement[];
  transitionIn?: string;
  transitionOut: {
    cameraAction: string;
    birdAction: string;
    environmentAction: string;
    summary: string;
  };
}

export const STORYBOARD_FRAMES: StoryboardFrameData[] = [
  {
    id: 'frame-01-arrival',
    chapter: 1,
    chapterCode: '01 / ARRIVAL',
    title: 'BEACH ARRIVAL & EXPEDITION HUB',
    location: 'MALPE HARBOR FORESHORE',
    coordinates: '13°21′02″ N · 74°42′08″ E',
    timeOfDay: '11:30 AM · High Sun',
    colorTemperature: '5500K Solar Daylight',
    mood: 'Curious · Sunlit · Welcoming · Energetic',
    heroImage: '/images/malpe_coast.jpg',
    heroImageAlt: 'Malpe coastal arrival beach with palm trees and ocean shore',
    supportingImages: [
      {
        src: '/images/coral_arrival_pavilion.png',
        caption: 'Weathered teak ticketing kiosk with printed departure manifests',
        tag: 'KIOSK DETAIL',
      },
      {
        src: '/images/coral_beach_promenade.png',
        caption: 'Crushed laterite trail leading through coastal coconut palms',
        tag: 'TRAIL TEXTURE',
      },
    ],
    camera: {
      framing: 'Wide establishing shot with low foreground sand dunes',
      height: '1.70m (Natural human standing eye-level)',
      lens: '35mm anamorphic prime',
      aperture: 'f/5.6 for deep environmental sharpness',
      movement: 'Slow steady forward push along laterite footpath toward water',
      focusTarget: 'Ticket kiosk in midground, distant catamaran anchor visible',
      fov: 52,
    },
    story: 'The visitor arrives on the sun-bleached sands of Malpe. The scent of salt air and roasting spices from local fish stalls mingles with the rustle of coastal coconut palms. Ahead, the Coral Adventures beach kiosk stands as a modest, welcoming gatehouse where travelers check in and collect expedition passes before heading seaward.',
    environment: 'Pale sun-bleached sand with fine wind ripples, clusters of Cocos nucifera palms leaning gently seaward, rustic timber benches, printed chalkboard weather ledges, woven shade canopies, and vibrant local beach life with snack counters and kayak racks.',
    character: {
      state: 'Perched on weathered timber post',
      position: 'Beside the Coral Adventures ticket kiosk roof corner',
      action: 'Watching the incoming tide, turning its head toward open water',
      meaning: 'The journey begins here: silent invitation to step onto the sand.',
    },
    lighting: {
      description: 'Crisp midday tropical daylight with subtle oceanic moisture haze',
      skyCondition: 'Clear cobalt sky with sparse high-altitude cirrus streamers',
      shadowQuality: 'Sharp, dark contact shadows directly beneath structures and palms',
      fogDensity: 'Subtle atmospheric perspective (FogExp2 0.0018)',
    },
    palette: [
      { name: 'Sun-Bleached Sand', hex: '#FAF6EE' },
      { name: 'Warm Ivory Parchment', hex: '#F2ECE1' },
      { name: 'Coastal Palm Leaf', hex: '#1E5E48' },
      { name: 'Crushed Laterite Earth', hex: '#964831' },
      { name: 'Deep Maritime Ink', hex: '#0A2540' },
    ],
    density: 'medium',
    assets: [
      {
        name: 'Coral Ticket Kiosk',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '45k tris',
        description: 'Weathered teak post-and-beam structure with slatted tambour counters, departure boards, and brass lanterns.',
      },
      {
        name: 'Guide Bird (Perched Variant)',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '18k tris',
        description: 'Believable coastal Brahminy/Kingfisher hybrid with natural iridescent turquoise-cobalt plumage.',
      },
      {
        name: 'Botanical Coconut Palms (4 Types)',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '12k tris/instance',
        description: 'Tall mature, wind-bowed coastal, dwarf cluster, and young sapling palm variations.',
      },
      {
        name: 'Local Food Stall Ephemera',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '8k tris',
        description: 'Clay pots, banana leaf plates, wooden menu boards, and cast iron tea kettles.',
      },
    ],
    transitionOut: {
      cameraAction: 'Camera tracks past the kiosk corner, dipping toward the wet sand waterline',
      birdAction: 'Bird spreads its wings, lifts off the post with a single flap, and glides seaward',
      environmentAction: 'Sand transitions from dry pale cream to glossy wet reflective tide wash',
      summary: 'BIRD TAKES FLIGHT · CAMERA LEAVES BEACH · WATER ENTERS FOREGROUND',
    },
  },
  {
    id: 'frame-02-watersports',
    chapter: 2,
    chapterCode: '02 / WATERSPORTS',
    title: 'HYDRO-DYNAMICS & ACTIVE SURF ZONE',
    location: 'MALPE SHALLOW INSHORE WATERS',
    coordinates: '13°21′05″ N · 74°41′55″ E',
    timeOfDay: '12:45 PM · High Energy Sun',
    colorTemperature: '5400K Brilliant Marine Light',
    mood: 'Energetic · Dynamic · Spray · Velocity',
    heroImage: '/images/coral_marine_activities.png',
    heroImageAlt: 'Active watersports with jet skis, kayaks, and parasailing canopy',
    supportingImages: [
      {
        src: '/images/wave_foam_crest.jpg',
        caption: 'High-speed jet ski bow wake carving through turquoise shallows',
        tag: 'WAKE DYNAMICS',
      },
      {
        src: '/images/aerial_wave_foam.jpg',
        caption: 'Aerial perspective of multi-layered surf swash and sandbars',
        tag: 'SURF SWASH',
      },
    ],
    camera: {
      framing: 'Low water-level tracking shot skimming 0.5m above wave surface',
      height: '0.50m (Water-level dynamic tracking perspective)',
      lens: '24mm wide-angle lens with water droplet lens refraction',
      aperture: 'f/4.0 with high shutter speed freezing water spray',
      movement: 'Rapid forward tracking following a jet ski wake into open water',
      focusTarget: 'Airborne guide bird slicing through parasail spray trails',
      fov: 65,
    },
    story: 'The sound of crashing surf and high-revving jet skis fills the air. The water transitions rapidly from shallow golden sandbars to crystal cyan and deep turquoise channels. Yellow kayaks glide through gentle swells while a coral-orange parasail canopy billows high against the cloudless Arabian sky.',
    environment: 'Multi-harmonic Gerstner wave swells (1.2m amplitude), turbulent white water foam swash along sandbars, dynamic jet ski wakes, orange mooring buoys, safety chase ribs, and swimmers in designated reef lanes.',
    character: {
      state: 'Airborne banking glide',
      position: '3 meters above the water surface, slicing across jet ski spray',
      action: 'Wings banked at 45 degrees, charting an arrow-straight line toward the offshore vessel',
      meaning: 'Follow me: leaving the shore behind and heading for deep water.',
    },
    lighting: {
      description: 'Blinding tropical sun creating intense caustics on shallow white sandbars',
      skyCondition: 'Deep cyan sky overhead with vibrant solar specular glints',
      shadowQuality: 'Rapidly undulating caustic wave shadow patterns on the sea floor',
      fogDensity: 'Light salt-spray sea mist near the water surface',
    },
    palette: [
      { name: 'Crystal Sandbar Cyan', hex: '#25C4C0' },
      { name: 'Coastal Turquoise', hex: '#158F93' },
      { name: 'Oceanic Blue', hex: '#1E40AF' },
      { name: 'Parasail Coral Orange', hex: '#E05A36' },
      { name: 'Sea Spray Foam White', hex: '#FAF6EE' },
    ],
    density: 'high',
    assets: [
      {
        name: 'Sea-Doo GTX Jet Ski Fleet',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '32k tris',
        description: 'Detailed maritime livery with Coral Adventures cobalt-cyan striping and driver physics rig.',
      },
      {
        name: 'Parasailing Winch Boat & Canopy',
        type: 'SECONDARY ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '28k tris',
        description: 'Tensioned nylon parasail canopy with harness, tow line, and rear hydraulic winch.',
      },
      {
        name: 'Ocean Swell & Wave Mesh Shaders',
        type: 'ENVIRONMENT',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom compute',
        description: '5-harmonic Gerstner wave displacement with peak foam generation and depth gradient blending.',
      },
      {
        name: 'Touring Sea Kayaks',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '14k tris',
        description: 'Rotomolded polyethylene kayaks with double-ended paddles and dry bags.',
      },
    ],
    transitionOut: {
      cameraAction: 'Camera rises from waterline to 5m altitude as spray clears to reveal open ocean',
      birdAction: 'Bird levels out its wings and descends toward a prominent aluminium mast ahead',
      environmentAction: 'Shoreline recedes into atmospheric sea haze; twin vessel hulls loom large',
      summary: 'BIRD CROSSES OPEN WATER · CATAMARAN EMERGES FROM HAZE',
    },
  },
  {
    id: 'frame-03-catamaran',
    chapter: 3,
    chapterCode: '03 / VESSEL REVEAL',
    title: 'THE 25.90M EXPEDITION CATAMARAN',
    location: 'OFFSHORE ARABIAN SEA MOORING',
    coordinates: '13°21′12″ N · 74°41′10″ E',
    timeOfDay: '02:15 PM · Warm Afternoon',
    colorTemperature: '5200K Marine Daylight',
    mood: 'Awestruck · Monumental · Commercial · Nautical',
    heroImage: '/images/vessel_catamaran.jpg',
    heroImageAlt: 'Luxury 25.90M expedition catamaran moored offshore',
    supportingImages: [
      {
        src: '/images/malpe_basalt_yacht.jpg',
        caption: 'Oblique angle showing twin wave-piercing demi-hulls and teak boarding platform',
        tag: 'HULL ARCHITECTURE',
      },
      {
        src: '/images/vessel_yacht.jpg',
        caption: 'Upper observation deck with navigation radar and shaded social canopy',
        tag: 'DECK STRUCTURE',
      },
    ],
    camera: {
      framing: 'Hero three-quarter low-angle reveal framing the entire 25.90m length',
      height: '2.40m rising on a gentle maritime crane sweep',
      lens: '50mm standard prime (true architectural scale without fisheye distortion)',
      aperture: 'f/8.0 deep focus showing both hull details and distant horizon',
      movement: 'Slow rotational arc around the starboard bow toward the aft boarding gate',
      focusTarget: 'Coral Adventures emblem on the carbon-composite superstructure',
      fov: 48,
    },
    story: 'Rising from the deep sapphire water 700 meters offshore sits the flagship of Coral Adventures: an authored 25.90-meter triple-deck expedition catamaran. Built specifically for coastal Karnataka conditions, it features twin wave-piercing aluminium hulls, an enclosed panoramic viewing salon, and a vast open-air teak social deck.',
    environment: 'Deep offshore sapphire water (20m depth), gentle rolling oceanic swell, subtle white bow spray, support tenders moored alongside, and the distant volcanic silhouette of St. Mary’s Island 4 kilometers west.',
    character: {
      state: 'Circling upper deck mast',
      position: 'Hovering 4 meters above the radar arch before landing',
      action: 'Tucking wings and settling onto the polished 316-stainless bow railing',
      meaning: 'You have arrived at the mothership: the gateway to the outer islands.',
    },
    lighting: {
      description: 'Bright coastal sunlight reflecting off white gelcoat and panoramic marine glass',
      skyCondition: 'Deep azure blue with soft sea-mist horizon line',
      shadowQuality: 'Clean geometrical shadows beneath the upper cantilever deck',
      fogDensity: 'Medium distance haze softening the mainland coast behind',
    },
    palette: [
      { name: 'Marine Gelcoat White', hex: '#FAF6EE' },
      { name: 'Deep Offshore Sapphire', hex: '#071A2B' },
      { name: 'Aged Burmese Teak', hex: '#6B4A2F' },
      { name: 'Anodized Marine Alloy', hex: '#8F99A3' },
      { name: 'Coral Hull Accent Line', hex: '#E05A36' },
    ],
    density: 'medium',
    assets: [
      {
        name: 'Flagship 25.90M Catamaran',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '120k tris (LOD0)',
        description: 'Complete 3-deck vessel with interior salon, radar masts, solar arrays, and teak decking.',
      },
      {
        name: 'Hydraulic Swim Platform & Tender',
        type: 'SECONDARY ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '22k tris',
        description: 'Aft submersible platform with boarding stairs, fenders, and rigid inflatable tender boat.',
      },
      {
        name: 'St. Mary’s Basalt Horizon Silhouette',
        type: 'ENVIRONMENT',
        status: 'SOURCED PBR',
        polyTarget: '35k tris',
        description: 'Low-poly geological silhouette anchored at Z=1150m with realistic distance atmospheric falloff.',
      },
      {
        name: 'Marine Hardware & Rigging',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '18k tris',
        description: 'Mooring cleats, stainless stanchions, life rings, searchlights, and VHF whip antennas.',
      },
    ],
    transitionOut: {
      cameraAction: 'Camera glides smoothly up the teak boarding ladder and crosses the main salon threshold',
      birdAction: 'Bird tilts head, observing passengers on the upper deck with calm curiosity',
      environmentAction: 'Sound shifts from rushing open sea to sheltered acoustic music and laughter',
      summary: 'CAMERA BOARDS VESSEL · SCALE TRANSITIONS TO HUMAN INTERACTION',
    },
  },
  {
    id: 'frame-04-onboard',
    chapter: 4,
    chapterCode: '04 / ONBOARD LIFE',
    title: 'TRIPLE-DECK GASTRONOMY & SOCIAL VOYAGE',
    location: 'CORAL CATAMARAN · MAIN & UPPER DECKS',
    coordinates: '13°21′15″ N · 74°40′50″ E',
    timeOfDay: '04:00 PM · Late Afternoon',
    colorTemperature: '4800K Warm Golden Interior/Exterior Blend',
    mood: 'Social · Lived-in · Gastronomic · Warm · Youthful',
    heroImage: '/images/dining_deck.jpg',
    heroImageAlt: 'Onboard dining deck with guests enjoying fresh coastal cuisine',
    supportingImages: [
      {
        src: '/images/curated_dining.jpg',
        caption: 'Authentic Karavali fresh catch grill with kokum marinades and coconut rotti',
        tag: 'LIVE CATERING',
      },
      {
        src: '/images/coral_dining_theatre.png',
        caption: 'Lower air-conditioned salon with nautical charts and brass compass table',
        tag: 'CHART TABLE',
      },
    ],
    camera: {
      framing: 'Intimate social tracking shot moving between sun loungers and dining tables',
      height: '1.45m (Seated/standing social eye-level perspective)',
      lens: '35mm wide prime with soft cinematic depth of field',
      aperture: 'f/2.2 creating buttery background blur on ocean horizon',
      movement: 'Gentle handheld drift across the upper deck bar toward the open bow',
      focusTarget: 'Aged parchment chart table with brass dividers and fresh coastal drinks',
      fov: 54,
    },
    story: 'Life onboard is relaxed, authentic, and social. On the upper deck, guests lounge on sunbeds listening to warm acoustic rhythms while the galley serves fresh coastal Karavali delicacies: butter-garlic tiger prawns, sear fish rava fry, tender coconut coolers, and spiced buttermilk. Below in the air-conditioned salon, navigators inspect vintage 1894 bathymetric charts of the archipelago.',
    environment: 'Slatted teak deck planking, cream linen upholstery, brass turnbuckles, frosted glass bar counters, acoustic speakers, sun canopies gently fluttering in the sea breeze, and panoramic 360-degree ocean views through frameless windows.',
    character: {
      state: 'Perched on upper deck aft teak railing',
      position: '1.2m above deck beside the chart table',
      action: 'Quietly observing the social gathering with feathers ruffled by the warm sea breeze',
      meaning: 'Rest and savor: this is the human heartbeat of the expedition.',
    },
    lighting: {
      description: 'Warm late-afternoon solar side-lighting mixed with soft glowing deck fixtures',
      skyCondition: 'Soft golden haze beginning to tint the western clouds with peach tones',
      shadowQuality: 'Long, soft-edged diagonal shadows across teak planking',
      fogDensity: 'Minimal interior fog, soft atmospheric falloff out the panoramic windows',
    },
    palette: [
      { name: 'Burmese Golden Teak', hex: '#6B4A2F' },
      { name: 'Warm Cream Linen', hex: '#FAF6EE' },
      { name: 'Coral Spice Orange', hex: '#E05A36' },
      { name: 'Antique Nautical Brass', hex: '#C5A059' },
      { name: 'Midnight Navy Trim', hex: '#0A2540' },
    ],
    density: 'high',
    assets: [
      {
        name: 'Inhabited Navigational Chart Table',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '28k tris',
        description: 'Weathered 1894 St. Mary’s archipelago chart, brass dividers, marine compass, and tide ledger.',
      },
      {
        name: 'Karavali Gastronomy Service Set',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '16k tris',
        description: 'Earthenware platters, copper spice bowls, coconut shell cups, and fresh grilled lobster props.',
      },
      {
        name: 'Upper Deck Modular Lounge Furniture',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '24k tris',
        description: 'Waterproof linen daybeds, slatted coffee tables, sun umbrellas, and acoustic speaker towers.',
      },
      {
        name: 'Nautical Lanterns & Warm LED Stringers',
        type: 'SECONDARY ASSET',
        status: 'PROCEDURAL SHADER',
        polyTarget: '6k tris',
        description: '2700K incandescent filament shaders with localized volumetric point light falloff.',
      },
    ],
    transitionOut: {
      cameraAction: 'Camera tracks forward over the catamaran bowsprit into open air toward basalt cliffs',
      birdAction: 'Bird launches from the rail, flying ahead toward the towering dark hexagonal rock pillars',
      environmentAction: 'The vessel hum fades behind as the ancient booming resonance of crashing basalt surf grows',
      summary: 'VESSEL RECEDES AFT · BASALT ISLAND MONOLITH GROWS FORWARD',
    },
  },
  {
    id: 'frame-05-island',
    chapter: 5,
    chapterCode: '05 / BASALT ISLAND',
    title: 'HEXAGONAL BASALT ISLAND GEOLOGICAL DISCOVERY',
    location: 'ST. MARY’S ARCHIPELAGO · COLUMNAR FORMATIONS',
    coordinates: '13°21′30″ N · 74°40′15″ E',
    timeOfDay: '05:15 PM · Late Golden Afternoon',
    colorTemperature: '4200K Amber Sun on Volcanic Rock',
    mood: 'Adventurous · Ancient · Tactile · Mysterious · Quiet',
    heroImage: '/images/malpe_basalt_yacht.jpg',
    heroImageAlt: 'Hexagonal columnar basalt formations of St. Mary Island with tidal pools',
    supportingImages: [
      {
        src: '/images/coral_jetty_pier.png',
        caption: 'Natural stone footpaths winding through hexagonal volcanic rock formations',
        tag: 'GEOLOGICAL PATH',
      },
      {
        src: '/images/shoreline_foam.jpg',
        caption: 'Tidal surge pool trapped within dark basalt fissures with vibrant marine life',
        tag: 'TIDAL POOL',
      },
    ],
    camera: {
      framing: 'Ground-level trail perspective moving between towering 8-meter hexagonal columns',
      height: '1.65m (Walking explorer viewpoint)',
      lens: '28mm wide prime capturing vertical rock column geometry',
      aperture: 'f/4.5 with rich micro-displacement textural detail on basalt faces',
      movement: 'Steady walking camera navigating along a narrow crushed-shell path through rock crevices',
      focusTarget: 'Guide bird perched atop a fractured basalt step ahead',
      fov: 56,
    },
    story: 'The journey reaches its geological climax at the ancient basalt columns of St. Mary’s Island, formed 88 million years ago by sub-volcanic rifting when Madagascar separated from India. Dark 6-sided columnar joints rise like natural cathedral pillars out of crystal turquoise lagoons, their geometric facets worn smooth by millennia of Arabian Sea tides.',
    environment: 'Vertical 6-sided hexagonal basalt columns (4m to 12m height), deep volcanic fissures filled with tidal seawater, orange sea anemones, hermit crabs, crushed seashell beaches, and wind-sheared coconut palms growing out of rock crevices.',
    character: {
      state: 'Hopping between basalt pillar caps',
      position: '4 meters ahead on a 6-sided rock outcrop overlooking the trail',
      action: 'Pausing, glancing back over its shoulder to ensure the explorer is following, then hopping higher',
      meaning: 'Continue forward: the grand panoramic viewpoint lies just beyond the rock ridge.',
    },
    lighting: {
      description: 'Dramatic low-angle amber sunlight raking across basalt column facets',
      skyCondition: 'Warm peach-gold western horizon with deep indigo shadows in rock crevices',
      shadowQuality: 'Extremely long, sharp geometrical shadows cast by vertical columns',
      fogDensity: 'Fine sea spray mist rising from wave crash points at the base of the cliffs',
    },
    palette: [
      { name: 'Dark Hexagonal Basalt', hex: '#1C1E24' },
      { name: 'Weathered Volcanic Ash', hex: '#4A4E5A' },
      { name: 'Lagoon Crystal Turquoise', hex: '#0D9488' },
      { name: 'Crushed Shell White', hex: '#FAF6EE' },
      { name: 'Raking Amber Sun', hex: '#F59E0B' },
    ],
    density: 'medium',
    assets: [
      {
        name: 'Hexagonal Columnar Basalt Formations',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '85k tris',
        description: 'Multi-tiered 6-sided vertical columns with authentic polygonal fracturing, lichen textures, and tide marks.',
      },
      {
        name: 'Tidal Rock Pool Ecosystem',
        type: 'SECONDARY ASSET',
        status: 'PROCEDURAL SHADER',
        polyTarget: '14k tris',
        description: 'Water-filled rock hollows with refraction caustics, starfish, sea urchins, and green algae.',
      },
      {
        name: 'Wind-Sheared Cliff Palms',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '18k tris',
        description: 'Hardy dwarf palms rooted in rock fissures with strong seaward aerodynamic trunk bends.',
      },
      {
        name: 'Natural Stone Exploration Trail',
        type: 'ENVIRONMENT',
        status: 'SOURCED PBR',
        polyTarget: '20k tris',
        description: 'Stepping-stone path of flat basalt slabs embedded in coarse crushed shell sand.',
      },
    ],
    transitionOut: {
      cameraAction: 'Camera crests the final basalt rock ridge to reveal the immense open western horizon',
      birdAction: 'Bird lands on the highest solitary basalt pinnacle and turns directly into the setting sun',
      environmentAction: 'The golden afternoon light rapidly warms into a blazing spectrum of amber, coral, and violet',
      summary: 'SUN DESCENDS TO HORIZON · SHADOWS LENGTHEN ACROSS BASALT',
    },
  },
  {
    id: 'frame-06-sunset',
    chapter: 6,
    chapterCode: '06 / SUNSET PAUSE',
    title: 'THE WESTBOUND ARABIAN SEA SUNSET',
    location: 'ST. MARY’S WESTERN CLIFF PANORAMA',
    coordinates: '13°21′32″ N · 74°39′55″ E',
    timeOfDay: '06:30 PM · Golden Hour to Sunset',
    colorTemperature: '2800K Molten Amber & Coral Glow',
    mood: 'Emotional · Contemplative · Spacious · Breathtaking · Calm',
    heroImage: '/images/sunset_catamaran.jpg',
    heroImageAlt: 'Cinematic sunset over the Arabian Sea with glowing orange water reflections',
    supportingImages: [
      {
        src: '/images/golden_hour.jpg',
        caption: 'Molten gold sunlight raking across ocean swells and basalt silhouettes',
        tag: 'LIQUID GOLD SWELLS',
      },
      {
        src: '/images/coral_golden_hour_deck.png',
        caption: 'Distant silhouette of the Coral catamaran anchored in the sunset path',
        tag: 'VESSEL SILHOUETTE',
      },
    ],
    camera: {
      framing: 'Vast horizontal panoramic anamorphic composition with extreme negative space',
      height: '3.20m (Elevated cliff viewpoint overlooking the ocean)',
      lens: '85mm cinematic anamorphic lens with horizontal lens flare',
      aperture: 'f/2.8 capturing molten sun reflection on ocean surface',
      movement: 'Extremely slow, almost imperceptible locked panoramic drift toward the sun disk',
      focusTarget: 'Guide bird silhouette perched on basalt in foreground against the solar reflection',
      fov: 42,
    },
    story: 'Time slows down as the sun descends toward the western rim of the Arabian Sea. The entire world transforms into a graduated chromatic symphony: from soft sky blue overhead down through golden cream, brilliant amber, fiery coral, and deep maritime indigo. Below the cliffs, the ocean turns to liquid molten gold, mirroring the celestial descent.',
    environment: 'Open endless sea stretching to the horizon, rolling swell crests catching burning specular highlights, dark silhouette of the anchored catamaran 2km offshore with its masthead lights just beginning to glow, and basalt rock pillars bathed in deep crimson warmth.',
    character: {
      state: 'Standing in crisp dark silhouette',
      position: 'Perched on the edge of the highest basalt column in the lower-left third of the frame',
      action: 'Completely motionless, chest puffed, watching the sun touch the horizon',
      meaning: 'Pause and reflect: the transition of time from day into night.',
    },
    lighting: {
      description: 'Blazing 2800K low-solar horizon light with intense atmospheric Rayleigh scattering',
      skyCondition: '8-layer horizontal color band: Blue → Cyan → Cream → Yellow → Gold → Amber → Coral → Marine',
      shadowQuality: 'Deep crimson-black silhouettes with long fiery rim lighting on upper edges',
      fogDensity: 'Luminous golden sunset haze occluding the extreme ocean horizon',
    },
    palette: [
      { name: 'Molten Solar Gold', hex: '#F59E0B' },
      { name: 'Fiery Coral Horizon', hex: '#E05A36' },
      { name: 'Deep Sunset Amber', hex: '#C2410C' },
      { name: 'Dusk Violet Gradient', hex: '#4C1D95' },
      { name: 'Midnight Marine Horizon', hex: '#071A2B' },
    ],
    density: 'low',
    assets: [
      {
        name: 'Atmospheric Sunset Sky Dome',
        type: 'ENVIRONMENT',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom sky shader',
        description: 'Multi-harmonic Rayleigh/Mie scattering shader with configurable solar altitude and azimuth.',
      },
      {
        name: 'Ocean Specular Sunset Pathway',
        type: 'ENVIRONMENT',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom PBR',
        description: 'Anisotropic specular wave highlight algorithm creating a continuous column of shimmering gold.',
      },
      {
        name: 'Distant Vessel Silhouette (LOD2)',
        type: 'SECONDARY ASSET',
        status: 'SOURCED PBR',
        polyTarget: '8k tris',
        description: 'Simplified catamaran silhouette with twin hull profiles, glowing navigation lanterns, and mast anchor light.',
      },
      {
        name: 'Guide Bird (Silhouette Variant)',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '14k tris',
        description: 'Refined silhouette mesh with precise feather edge geometry and subtle golden rim lighting.',
      },
    ],
    transitionOut: {
      cameraAction: 'The sun slips beneath the ocean; camera slowly tilts downward as the sky collapses into blue hour',
      birdAction: 'Bird shakes its plumage, hops down from the pinnacle, and leads into the darkening basalt ravine',
      environmentAction: 'The golden warmth dissolves into deep sapphire twilight; stars pierce the upper zenith',
      summary: 'LIGHT COLLAPSES INTO BLUE HOUR · MIDNIGHT SAPPHIRE EMERGES',
    },
  },
  {
    id: 'frame-07-night',
    chapter: 7,
    chapterCode: '07 / NIGHT TRAIL',
    title: 'BLUE HOUR & MIDNIGHT BASALT EXPLORATION',
    location: 'ST. MARY’S ARCHIPELAGO · NIGHT TRAIL',
    coordinates: '13°21′28″ N · 74°40′08″ E',
    timeOfDay: '08:45 PM · Blue Hour to Midnight',
    colorTemperature: '8500K Moonlit Silver & 2200K Lantern Amber',
    mood: 'Mysterious · Tranquil · Dark · Intimate · Celestial',
    heroImage: '/images/night_sapphire.jpg',
    heroImageAlt: 'Nighttime ocean and moonlit basalt rocks with starry sky',
    supportingImages: [
      {
        src: '/images/sapphire_night_ocean.jpg',
        caption: 'Deep sapphire ocean swells reflecting celestial starlight and crescent moon',
        tag: 'SAPPHIRE SEA',
      },
      {
        src: '/images/nightfall_ocean.jpg',
        caption: 'Low warm-amber trail bollards casting soft localized pools of light on basalt',
        tag: 'TRAIL BOLLARDS',
      },
    ],
    camera: {
      framing: 'Low shadow-level tracking shot moving through moonlit rock crevices',
      height: '1.20m (Low intimate ground perspective)',
      lens: '35mm high-speed prime (f/1.4)',
      aperture: 'f/1.4 gathering faint starlight with subtle chromatic aberration',
      movement: 'Quiet creeping push along the illuminated stone pathway',
      focusTarget: 'Guide bird gliding silently just above ground level with faint blue feather sheen',
      fov: 50,
    },
    story: 'Night envelops the archipelago in rich midnight navy and deep marine sapphire. The rugged basalt columns are illuminated by silver moonlight, with discreet warm amber solar bollards guiding the trail. In the tidal pools below, faint natural bioluminescence sparkles with each rolling wave swash, creating a magical terrestrial-marine harmony.',
    environment: 'Silver moonlit basalt columns, deep velvety black shadow canyons, soft amber ground lanterns (2200K, 1.5m radius), sparkling starry sky with Milky Way dust lane visible overhead, and rhythmic crashing surf glowing faintly along wet shorelines.',
    character: {
      state: 'Low silent glide through rock ravine',
      position: '1.5m above trail, banking between dark basalt pillars',
      action: 'Feathers catching subtle moonlit edge reflections, leading the explorer toward the open sky arena',
      meaning: 'Follow deeper into the night: the celestial finale is about to commence.',
    },
    lighting: {
      description: 'High-contrast nocturnal lighting: cool 8500K silver moonlight fill + warm 2200K amber ground accents',
      skyCondition: 'Deep ink-sapphire sky sprinkled with 5,000+ razor-sharp procedural stars',
      shadowQuality: 'Crisp, deep obsidian shadows with moonlight edge rim highlights',
      fogDensity: 'Subtle cool blue nocturnal sea mist along the tidal zone',
    },
    palette: [
      { name: 'Midnight Navy Ink', hex: '#071A2B' },
      { name: 'Deep Marine Sapphire', hex: '#0A2540' },
      { name: 'Silver Moonlight White', hex: '#FAF6EE' },
      { name: 'Warm Amber Bollard', hex: '#F59E0B' },
      { name: 'Bioluminescent Turquoise', hex: '#25C4C0' },
    ],
    density: 'very low',
    assets: [
      {
        name: 'Solar Ground Trail Bollards',
        type: 'SECONDARY ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '6k tris',
        description: 'Low-profile cast bronze fixtures with 2200K warm downlight cones and frosted lenses.',
      },
      {
        name: 'Bioluminescent Surf Shader',
        type: 'ENVIRONMENT',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom shader',
        description: 'Dynamic turbulence-activated cyan-turquoise luminescence along wave break edges.',
      },
      {
        name: 'Night Celestial Sky Dome & Starfield',
        type: 'ENVIRONMENT',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom compute',
        description: 'Physically accurate star constellation map, lunar phase lighting, and faint atmospheric glow.',
      },
      {
        name: 'Moonlit Basalt Shader Specularity',
        type: 'ENVIRONMENT',
        status: 'SOURCED PBR',
        polyTarget: 'Custom roughness',
        description: 'PBR material mapping wet basalt roughness for sharp lunar specular reflections.',
      },
    ],
    transitionOut: {
      cameraAction: 'The narrow basalt canyon opens onto an expansive cliff amphitheater; camera tilts upward into vast night sky',
      birdAction: 'Bird lands on a high flat basalt altar and turns upward to face the stars',
      environmentAction: 'A solitary luminous white drone rises into the sky, followed by hundreds of glowing synchronized aircraft',
      summary: 'PATH OPENS TO NIGHT SKY · FIRST LUMINOUS DRONES COMMENCE FORMATION',
    },
  },
  {
    id: 'frame-08-drone-finale',
    chapter: 8,
    chapterCode: '08 / SKY SYMPHONY',
    title: 'THE 300-DRONE AERIAL SHOW & REFLECTION FINALE',
    location: 'OPEN SKY OVER THE ARABIAN SEA',
    coordinates: '13°21′35″ N · 74°39′45″ E',
    timeOfDay: '09:30 PM · Midnight Climax',
    colorTemperature: '6500K Luminous Points & 2700K Warm Accents',
    mood: 'Spectacular · Transcendent · Celestial · Concluding · Calm',
    heroImage: '/images/hero_ocean.jpg',
    heroImageAlt: '300-drone aerial formation lighting up the night sky over the Arabian Sea',
    supportingImages: [
      {
        src: '/images/coral_event_spaces.png',
        caption: 'Coordinated drone swarm forming the iconic Coral Adventures nautical compass rose',
        tag: 'COMPASS FORMATION',
      },
      {
        src: '/images/underwater_marine.jpg',
        caption: 'Fragmented luminous drone reflections dancing across undulating ocean swells below',
        tag: 'OCEAN REFLECTION',
      },
    ],
    camera: {
      framing: 'Monumental vertical composition: dark basalt in bottom 20%, massive night sky filling top 80%',
      height: '1.80m (Foreground seated perspective gazing upward)',
      lens: '24mm ultra-wide prime capturing the full 120-meter drone formation span',
      aperture: 'f/2.0 with controlled anamorphic star-burst flares on drone lights',
      movement: 'Gentle upward camera tilt tracking the dynamic morphing geometry of the drone swarm',
      focusTarget: 'Luminous center of the kinetic drone constellation in the upper sky',
      fov: 68,
    },
    story: 'The expedition concludes with a breathtaking commercial drone show over the Arabian Sea. Three hundred precision-synchronized aerial drones ascend from offshore barges, weaving luminous geometric patterns across the dark canopy: first morphing into the Coral Adventures nautical compass rose, then into a giant soaring sea bird, a cresting ocean wave, and finally an intricate celestial constellation. Below, the dark rolling ocean acts as a liquid mirror, scattering thousands of shimmering light fragments across the waves.',
    environment: 'Vast obsidian night sky, 300 illuminated aerial aircraft (warm white, cyan, coral, amber), dark Arabian Sea with undulating wave reflections, distant illuminated catamaran anchored offshore, and the quiet silhouette of the guide bird resting on the basalt cliff.',
    character: {
      state: 'Perched on high basalt outcrop in foreground',
      position: 'Lower-right corner in dark silhouette against the ocean reflection',
      action: 'Quietly watching the soaring drone bird in the sky overhead',
      meaning: 'This is the destination: the journey is complete, yet the spirit of adventure continues.',
    },
    lighting: {
      description: 'Luminous point lights casting sharp multi-colored specular reflections across the water surface',
      skyCondition: 'Deep void navy with sharp starfield background',
      shadowQuality: 'Complete dark silhouettes for terrestrial geography',
      fogDensity: 'Clean night atmosphere with subtle sea mist capturing light beams',
    },
    palette: [
      { name: 'Drone Luminous White', hex: '#FAF6EE' },
      { name: 'Celestial Cyan Glow', hex: '#25C4C0' },
      { name: 'Coral Amber Drone Light', hex: '#E05A36' },
      { name: 'Golden Beacon', hex: '#F59E0B' },
      { name: 'Deep Midnight Void', hex: '#071A2B' },
    ],
    density: 'very low',
    assets: [
      {
        name: '300-Drone Swarm Formation Engine',
        type: 'SPECIAL FX',
        status: 'PARTICLE SYSTEM',
        polyTarget: 'GPU instanced points',
        description: 'Kinetic Bezier-path particle system simulating 4 morphing 3D aerial light formations.',
      },
      {
        name: 'Dynamic Ocean Light Reflection System',
        type: 'SPECIAL FX',
        status: 'PROCEDURAL SHADER',
        polyTarget: 'Custom shader',
        description: 'Fragmented wave-normal reflection algorithm mapping 300 aerial lights to Gerstner swells.',
      },
      {
        name: 'Basalt Altar Foreground Silhouette',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '30k tris',
        description: 'Crisply silhouetted foreground rock framing providing grounded spatial scale.',
      },
      {
        name: 'Guide Bird (Final Resting Pose)',
        type: 'HERO ASSET',
        status: 'CUSTOM MODEL',
        polyTarget: '14k tris',
        description: 'Final calm silhouette posture witnessing the conclusion of the expedition.',
      },
    ],
    transitionOut: {
      cameraAction: 'The drone lights gently dim to a soft starry twinkle; camera holds steady on the quiet ocean horizon',
      birdAction: 'Bird remains perched in peaceful stillness as the sea breeze rolls in',
      environmentAction: 'The world returns to the quiet, ancient rhythm of Arabian Sea waves crashing against St. Mary’s basalt',
      summary: 'THE JOURNEY CONTINUES · CORAL ADVENTURES · MALPE · ARABIAN SEA',
    },
  },
];

/**
 * MASTER ASSET INVENTORY & PRODUCTION BLUEPRINT
 */
export const ASSET_INVENTORY_SUMMARY = {
  heroAssets: [
    { name: 'Guide Bird (All 8 Positional Variants)', category: 'Character Rig', polyBudget: '18k tris', source: 'Custom authored Blender GLB' },
    { name: 'Flagship 25.90M Expedition Catamaran', category: 'Marine Architecture', polyBudget: '120k tris (LOD0-3)', source: 'Custom authored CAD/GLB' },
    { name: 'St. Mary’s Hexagonal Columnar Basalt Formations', category: 'Geological Environment', polyBudget: '85k tris', source: 'Custom photogrammetry/GLB' },
    { name: 'Coral Beach Kiosk & Arrival Hub', category: 'Architecture', polyBudget: '45k tris', source: 'Custom authored GLB' },
    { name: 'Inhabited Navigational Chart Table & Ephemera', category: 'Interactive Props', polyBudget: '28k tris', source: 'Custom authored GLB' },
    { name: 'Sea-Doo GTX Jet Ski Fleet & Kayaks', category: 'Vehicles', polyBudget: '32k tris', source: 'Custom authored GLB' },
  ],
  environmentSystems: [
    { name: '1200m Continuous Displaced PBR Terrain', type: 'Heightmap Mesh', specs: '240m × 1200m displaced grid with multi-texture blending' },
    { name: 'Living Arabian Sea Gerstner Wave Surface', type: 'Compute/Vertex Shader', specs: '5-harmonic Gerstner waves with depth gradient & foam swash' },
    { name: 'Botanical Coconut Palm Population System', type: 'GPU InstancedMesh', specs: '4 variants, 623 instances, height-dependent wind vertex shader' },
    { name: 'Atmospheric Rayleigh/Mie Sky Dome', type: 'Atmosphere Shader', specs: 'Dynamic time-of-day solar altitude, haze & starfield' },
    { name: '300-Drone Swarm Formation Simulator', type: 'Particle Engine', specs: '300 GPU point lights with 4 morphing Bezier choreography states' },
  ],
  chromaticProgression: [
    { chapter: 1, title: 'Arrival', kelvin: '5500K', baseHex: '#FAF6EE', accentHex: '#964831', vibe: 'Sun-bleached Ivory & Laterite' },
    { chapter: 2, title: 'Watersports', kelvin: '5400K', baseHex: '#25C4C0', accentHex: '#E05A36', vibe: 'Cyan Shallows & High Spray' },
    { chapter: 3, title: 'Catamaran', kelvin: '5200K', baseHex: '#071A2B', accentHex: '#8F99A3', vibe: 'Offshore Sapphire & Gelcoat' },
    { chapter: 4, title: 'Onboard Life', kelvin: '4800K', baseHex: '#6B4A2F', accentHex: '#C5A059', vibe: 'Burmese Teak & Nautical Brass' },
    { chapter: 5, title: 'Basalt Island', kelvin: '4200K', baseHex: '#1C1E24', accentHex: '#0D9488', vibe: 'Dark Volcanics & Turquoise' },
    { chapter: 6, title: 'Sunset Pause', kelvin: '2800K', baseHex: '#F59E0B', accentHex: '#E05A36', vibe: 'Molten Gold & Coral Horizon' },
    { chapter: 7, title: 'Night Trail', kelvin: '8500K / 2200K', baseHex: '#071A2B', accentHex: '#FAF6EE', vibe: 'Midnight Sapphire & Moonlit Silver' },
    { chapter: 8, title: 'Drone Finale', kelvin: '6500K / 2700K', baseHex: '#071A2B', accentHex: '#25C4C0', vibe: 'Obsidian Void & Luminous Constellations' },
  ],
};
