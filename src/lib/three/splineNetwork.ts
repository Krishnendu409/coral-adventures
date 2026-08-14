import * as THREE from 'three';
import { WORLD_ANCHORS } from './worldCoordinates';

export interface LandmarkDiscovery {
  id: string;
  title: string;
  category?: string;
  tagline?: string;
  description: string;
  worldPosition?: THREE.Vector3;
  specs?: { label: string; value: string }[];
}

export interface SplineLandmark {
  id: string;
  name: string;
  subtitle: string;
  splineProgress: number; // 0.0 to 1.0
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  cameraHeight: number;
  fov: number; // Camera field of view in degrees
  arrivalVelocity: number;
  departureVelocity: number;
  allowableLookRange: {
    minYaw: number;
    maxYaw: number;
    minPitch: number;
    maxPitch: number;
  };
  audioZone: "road" | "gardens" | "pavilion" | "beach";
  discoveries: LandmarkDiscovery[];
}

export const LANDMARK_NODES: SplineLandmark[] = [
  {
    id: "road-entrance",
    name: "MALPE COASTAL ROAD",
    subtitle: "Approach Road: Dense Canopy & Coastal Anticipation",
    splineProgress: 0.0,
    position: new THREE.Vector3(WORLD_ANCHORS.ROAD_ENTRANCE.x, WORLD_ANCHORS.ROAD_ENTRANCE.y, WORLD_ANCHORS.ROAD_ENTRANCE.z),
    lookAt: new THREE.Vector3(0, 1.7, 25),
    cameraHeight: 1.7,
    fov: 50,
    arrivalVelocity: 0,
    departureVelocity: 1,
    allowableLookRange: { minYaw: -45, maxYaw: 45, minPitch: -20, maxPitch: 25 },
    audioZone: "road",
    discoveries: [
      {
        id: "road-entrance-plaque",
        title: "MALPE COASTAL APPROACH",
        category: "GEOGRAPHY · KARNATAKA",
        tagline: "Expedition Gateway Road",
        description: "Coastal access road flanked by native coconut palm groves and laterite stone walls leading to the private Coral Adventures base.",
        worldPosition: new THREE.Vector3(2.5, 1.5, 10),
        specs: [
          { label: "LOCATION", value: "Malpe, Udupi District" },
          { label: "SURFACE", value: "Laterite & Coastal Sand" }
        ]
      }
    ]
  },
  {
    id: "coral-portal",
    name: "CORAL GATEWAY & WAYFINDING",
    subtitle: "Expedition Portal: Architectural Threshold (13°21′02″ N · 74°42′08″ E)",
    splineProgress: 0.2,
    position: new THREE.Vector3(WORLD_ANCHORS.CORAL_PORTAL.x, WORLD_ANCHORS.CORAL_PORTAL.y, WORLD_ANCHORS.CORAL_PORTAL.z),
    lookAt: new THREE.Vector3(0, 1.7, 75),
    cameraHeight: 1.7,
    fov: 52,
    arrivalVelocity: 1,
    departureVelocity: 1,
    allowableLookRange: { minYaw: -55, maxYaw: 55, minPitch: -25, maxPitch: 30 },
    audioZone: "road",
    discoveries: [
      {
        id: "gateway-totem",
        title: "CORAL EXPEDITION TOTEM",
        category: "WAYFINDING · LATITUDE",
        tagline: "Carved Solid Teak & Brass",
        description: "Official expedition portal marking departure coordinates to St. Mary's Island and the Arabian Sea marine sanctuary.",
        worldPosition: new THREE.Vector3(3.8, 2.3, 49),
        specs: [
          { label: "COORDINATES", value: "13°21′02″ N · 74°42′08″ E" },
          { label: "BEARING", value: "284° Westward" }
        ]
      }
    ]
  },
  {
    id: "garden-path",
    name: "COASTAL ARRIVAL GARDENS",
    subtitle: "Arrival Gardens: Indigenous Flora & Laterite Walkway",
    splineProgress: 0.4,
    position: new THREE.Vector3(WORLD_ANCHORS.GARDEN_PATH.x, WORLD_ANCHORS.GARDEN_PATH.y, WORLD_ANCHORS.GARDEN_PATH.z),
    lookAt: new THREE.Vector3(0, 1.7, 90),
    cameraHeight: 1.7,
    fov: 52,
    arrivalVelocity: 1,
    departureVelocity: 1,
    allowableLookRange: { minYaw: -60, maxYaw: 60, minPitch: -25, maxPitch: 35 },
    audioZone: "gardens",
    discoveries: [
      {
        id: "flora-cluster",
        title: "INDIGENOUS COASTAL GROVE",
        category: "ECOLOGY · CANOPY",
        tagline: "Karnataka Coconut Palms",
        description: "Naturally curved coastal palms offering shade over the laterite stone path leading to the Welcome Pavilion.",
        worldPosition: new THREE.Vector3(-10, 3.5, 70),
        specs: [
          { label: "SPECIES", value: "Cocos nucifera" },
          { label: "ELEVATION", value: "+0.8m above waterline" }
        ]
      }
    ]
  },
  {
    id: "pavilion-center",
    name: "CORAL ARRIVAL PAVILION",
    subtitle: "Welcome Pavilion: Open-Air Shaded Teak Lounge & Reception",
    splineProgress: 0.6,
    position: new THREE.Vector3(WORLD_ANCHORS.PAVILION_CENTER.x, WORLD_ANCHORS.PAVILION_CENTER.y, WORLD_ANCHORS.PAVILION_CENTER.z),
    lookAt: new THREE.Vector3(0, 1.7, 115),
    cameraHeight: 1.7,
    fov: 54,
    arrivalVelocity: 1,
    departureVelocity: 1,
    allowableLookRange: { minYaw: -75, maxYaw: 75, minPitch: -30, maxPitch: 40 },
    audioZone: "pavilion",
    discoveries: [
      {
        id: "reception-desk",
        title: "EXPEDITION CONCIERGE & BRIEFING",
        category: "SERVICES · RECEPTION",
        tagline: "Orientation & Tidal Charts",
        description: "Expedition naturalists provide tidal chart briefings, cold-pressed refreshments, and safety orientations before boarding.",
        worldPosition: new THREE.Vector3(-2.8, 1.2, 90),
        specs: [
          { label: "HOURS", value: "06:00 – 22:00 Daily" },
          { label: "GUIDES", value: "Licensed Marine Naturalists" }
        ]
      }
    ]
  },
  {
    id: "exploration-deck",
    name: "CORAL EXPLORATION DECK",
    subtitle: "Exploration Deck: Elevated Panorama Reveal Framing Open Arabian Sea",
    splineProgress: 0.8,
    position: new THREE.Vector3(WORLD_ANCHORS.EXPLORATION_DECK.x, WORLD_ANCHORS.EXPLORATION_DECK.y, WORLD_ANCHORS.EXPLORATION_DECK.z),
    lookAt: new THREE.Vector3(0, 1.7, 260),
    cameraHeight: 2.1,
    fov: 56,
    arrivalVelocity: 1,
    departureVelocity: 1,
    allowableLookRange: { minYaw: -90, maxYaw: 90, minPitch: -35, maxPitch: 45 },
    audioZone: "beach",
    discoveries: [
      {
        id: "deck-viewpoint",
        title: "MALPE PANORAMA & HORIZON",
        category: "VISTA · OVERLOOK",
        tagline: "Arabian Sea Framing",
        description: "Panoramic vantage point overlooking the Malpe fishing harbour, watersports shallows, and the distant silhouette of St. Mary's Island.",
        worldPosition: new THREE.Vector3(0, 2.1, 150),
        specs: [
          { label: "VISTA", value: "280° Arabian Horizon" },
          { label: "TARGET", value: "St. Mary's Basalt Isle" }
        ]
      }
    ]
  },
  {
    id: "beach-shoreline",
    name: "MALPE BEACH PROMENADE & SHORELINE",
    subtitle: "Living Beach & Shoreline: Intertidal Edge, Surf Swash & Fleet",
    splineProgress: 1.0,
    position: new THREE.Vector3(WORLD_ANCHORS.BEACH_SHORELINE.x, WORLD_ANCHORS.BEACH_SHORELINE.y, WORLD_ANCHORS.BEACH_SHORELINE.z),
    lookAt: new THREE.Vector3(0, 1.5, 320),
    cameraHeight: 1.7,
    fov: 52,
    arrivalVelocity: 1,
    departureVelocity: 0,
    allowableLookRange: { minYaw: -110, maxYaw: 110, minPitch: -35, maxPitch: 45 },
    audioZone: "beach",
    discoveries: [
      {
        id: "marine-craft-fleet",
        title: "ACTIVE MARINE FLEET & CATAMARAN",
        category: "MARINE · EXPEDITIONS",
        tagline: "Seadoo Jet Skis & 25.90M Vessel",
        description: "High-octane marine craft staged along the beach shallows alongside the flagship 25.90M twin-hull luxury catamaran.",
        worldPosition: new THREE.Vector3(15, 1.5, 240),
        specs: [
          { label: "FLAGSHIP", value: "25.90M Twin-Hull Catamaran" },
          { label: "WATERSPORTS", value: "Seadoo GTX & Sea Kayaks" }
        ]
      }
    ]
  }
];

export function createCameraSpline(landmarks: SplineLandmark[]): THREE.CatmullRomCurve3 {
  const points = landmarks.map(l => l.position);
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.25);
}

export function getInterpolatedCameraState(
  spline: THREE.CatmullRomCurve3,
  t: number,
  landmarks: SplineLandmark[]
): {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  cameraHeight: number;
  currentLandmark: SplineLandmark | null;
  nextLandmark: SplineLandmark | null;
} {
  const safeT = Math.max(0, Math.min(1, t));
  const position = spline.getPoint(safeT);
  
  let currentLandmark: SplineLandmark | null = null;
  let nextLandmark: SplineLandmark | null = null;

  for (let i = 0; i < landmarks.length; i++) {
    if (landmarks[i].splineProgress <= safeT) {
      currentLandmark = landmarks[i];
      nextLandmark = landmarks[i + 1] || null;
    } else {
      break;
    }
  }

  let lookAt = currentLandmark ? currentLandmark.lookAt.clone() : position.clone().add(new THREE.Vector3(0, 0, 10));
  let fov = currentLandmark ? currentLandmark.fov : 52;
  let cameraHeight = currentLandmark ? currentLandmark.cameraHeight : 1.7;

  if (currentLandmark && nextLandmark) {
    const span = nextLandmark.splineProgress - currentLandmark.splineProgress;
    const progressInSpan = span > 0 ? (safeT - currentLandmark.splineProgress) / span : 0;
    lookAt.lerp(nextLandmark.lookAt, progressInSpan);
    fov = THREE.MathUtils.lerp(currentLandmark.fov, nextLandmark.fov, progressInSpan);
    cameraHeight = THREE.MathUtils.lerp(currentLandmark.cameraHeight, nextLandmark.cameraHeight, progressInSpan);
  }

  return { position, lookAt, fov, cameraHeight, currentLandmark, nextLandmark };
}

