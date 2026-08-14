"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface SpatialNode {
  id: string;
  name: string;
  subtitle: string;
  imageSrc: string;
  cameraFov: number;
  initialYaw: number;
  initialPitch: number;
  hotspots: {
    id: string;
    title: string;
    category: string;
    tagline: string;
    description: string;
    yaw: number; // Horizontal angle in degrees (-180 to 180)
    pitch: number; // Vertical angle in degrees (-90 to 90)
    targetNodeId?: string;
    specs?: { label: string; value: string }[];
  }[];
}

export const MALPE_SPATIAL_NODES: SpatialNode[] = [
  {
    id: "gateway-entrance",
    name: "MALPE WATERFRONT · ARRIVAL GATEWAY",
    subtitle: "Coastal Gateway & Reception Plaza",
    imageSrc: "/images/coral_arrival_pavilion.png",
    cameraFov: 58,
    initialYaw: 0,
    initialPitch: 2,
    hotspots: [
      {
        id: "welcome-pavilion",
        title: "WELCOME PAVILION & RECEPTION",
        category: "ARCHITECTURE · BASE",
        tagline: "Shaded Teak & Palm Lounge",
        description:
          "The private arrival gateway to Coral Adventures. Step beneath the timber canopy where expedition hosts offer cold-pressed coconut refreshments, itinerary briefings, and marine sanctuary guidelines.",
        yaw: -4,
        pitch: 2,
        targetNodeId: "welcome-pavilion-interior",
        specs: [
          { label: "FACILITY", value: "Private Departure Lounge" },
          { label: "COORDINATES", value: "13°21′02″ N · 74°42′08″ E" },
          { label: "SERVICES", value: "Concierge & Expeditions" },
        ],
      },
      {
        id: "beach-access",
        title: "BEACH PROMENADE & WATERSPORTS",
        category: "WAYFINDING · SHORELINE",
        tagline: "Natural Sand & Stone Walkway",
        description:
          "The direct seaside promenade connecting the arrival reception to the pale sands of Malpe Beach and active watersports circuit.",
        yaw: 46,
        pitch: -6,
        targetNodeId: "beach-promenade",
        specs: [
          { label: "TERRAIN", value: "Fine Coastal Sand & Teak" },
          { label: "DISTANCE", value: "40m to Water's Edge" },
          { label: "ACTIVITIES", value: "Jet Skis, Kayaks, SUP" },
        ],
      },
      {
        id: "pier-access",
        title: "DEEPWATER JETTY & CATAMARAN",
        category: "MARITIME · BERTH 01",
        tagline: "Vessel Boarding Pier",
        description:
          "The deepwater marine pier where the 25.90M twin-hull catamaran Coral Explorer is moored and prepped for open-ocean departure.",
        yaw: -42,
        pitch: -4,
        targetNodeId: "deepwater-jetty",
        specs: [
          { label: "BERTH", value: "Deepwater Slip 01" },
          { label: "VESSEL", value: "25.90M Coral Explorer" },
        ],
      },
    ],
  },
  {
    id: "welcome-pavilion-interior",
    name: "MALPE WATERFRONT · PAVILION RECEPTION",
    subtitle: "Expedition Lounge & Concierge",
    imageSrc: "/images/coral_beach_club.png",
    cameraFov: 62,
    initialYaw: 0,
    initialPitch: 0,
    hotspots: [
      {
        id: "concierge-desk",
        title: "EXPEDITION CONCIERGE & BRIEFING",
        category: "SERVICES · RECEPTION",
        tagline: "Private Itinerary Management",
        description:
          "Meet your licensed expedition captain and marine naturalist. Receive personalized waterproof voyage itineraries, safety gear, and St. Mary's tidal charts.",
        yaw: 0,
        pitch: 0,
        specs: [
          { label: "HOURS", value: "06:00 – 21:00 Daily" },
          { label: "SAFETY", value: "Licensed Marine Instructors" },
        ],
      },
      {
        id: "return-gateway",
        title: "RETURN TO ARRIVAL GATEWAY",
        category: "WAYFINDING · ENTRANCE",
        tagline: "Outdoor Entrance Plaza",
        description: "Step back to the main arrival entrance and landscaped gardens.",
        yaw: 175,
        pitch: -4,
        targetNodeId: "gateway-entrance",
      },
      {
        id: "walk-to-pier",
        title: "PROCEED TO BOARDING PIER",
        category: "MARITIME · BOARDING",
        tagline: "To the 25.90M Catamaran",
        description: "Walk directly onto the deepwater pier to board Coral Explorer.",
        yaw: -60,
        pitch: -5,
        targetNodeId: "deepwater-jetty",
      },
    ],
  },
  {
    id: "beach-promenade",
    name: "MALPE WATERFRONT · BEACH & WATERSPORTS",
    subtitle: "Active Marine Shallows",
    imageSrc: "/images/coral_marine_activities.png",
    cameraFov: 60,
    initialYaw: 15,
    initialPitch: -2,
    hotspots: [
      {
        id: "jetski-circuit",
        title: "JET SKI SPEED CIRCUIT",
        category: "ACTIVITIES · HIGH-OCTANE",
        tagline: "Seadoo GTX 300 Sea Course",
        description:
          "High-performance marine jet skis ready for high-speed runs across Malpe's designated open-water adventure zone with licensed safety escorts.",
        yaw: 22,
        pitch: -8,
        specs: [
          { label: "CRAFT", value: "Seadoo GTX 300 Limited" },
          { label: "SPEED", value: "Up to 65 knots" },
        ],
      },
      {
        id: "kayak-staging",
        title: "SEA KAYAK & PADDLE STAGING",
        category: "ACTIVITIES · EXPLORATION",
        tagline: "Glass-Bottom & Touring Kayaks",
        description:
          "Glide along the Malpe coastal shallows and explore the mangrove estuary of the nearby Udyavara River.",
        yaw: -38,
        pitch: -10,
        specs: [
          { label: "EQUIPMENT", value: "Carbon Fiber Paddles & SUPs" },
          { label: "GUIDES", value: "Coastal Naturalists" },
        ],
      },
      {
        id: "return-pavilion",
        title: "RETURN TO WELCOME PAVILION",
        category: "WAYFINDING · RECEPTION",
        tagline: "Main Terminal Lounge",
        description: "Head back to the shaded arrival pavilion.",
        yaw: 160,
        pitch: 2,
        targetNodeId: "gateway-entrance",
      },
    ],
  },
  {
    id: "deepwater-jetty",
    name: "MALPE WATERFRONT · DEEPWATER PIER",
    subtitle: "Vessel Boarding & Arabian Sea",
    imageSrc: "/images/coral_jetty_pier.png",
    cameraFov: 60,
    initialYaw: -10,
    initialPitch: 0,
    hotspots: [
      {
        id: "coral-explorer-vessel",
        title: "THE 25.90M CATAMARAN (CORAL EXPLORER)",
        category: "FLAGSHIP · CATAMARAN",
        tagline: "Bespoke Marine Expedition Vessel",
        description:
          "Our twin-hull flagship featuring dual 1200HP marine diesels, wide panoramic bridged saloon, upper sun deck, and shallow 1.25m draft engineered for St. Mary's navigation.",
        yaw: -15,
        pitch: 2,
        specs: [
          { label: "LENGTH", value: "25.90 Meters (85 Ft)" },
          { label: "BEAM", value: "8.40 Meters" },
          { label: "CAPACITY", value: "Up to 45 Guests" },
          { label: "RANGE", value: "Arabian Sea Coastal" },
        ],
      },
      {
        id: "return-gateway-from-pier",
        title: "RETURN TO WATERFRONT TERMINAL",
        category: "WAYFINDING · LAND",
        tagline: "Reception & Shaded Lounge",
        description: "Walk back along the pier towards the main entrance pavilion.",
        yaw: 170,
        pitch: 0,
        targetNodeId: "gateway-entrance",
      },
    ],
  },
];

interface ArrivalWorldProps {
  currentNodeIndex: number;
  onSelectNode: (index: number) => void;
  onSelectHotspot: (hotspot: SpatialNode["hotspots"][0]) => void;
  focusedHotspot: SpatialNode["hotspots"][0] | null;
}

export function ArrivalWorld({
  currentNodeIndex,
  onSelectNode,
  onSelectHotspot,
  focusedHotspot,
}: ArrivalWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [projectedHotspots, setProjectedHotspots] = useState<
    { hotspot: SpatialNode["hotspots"][0]; x: number; y: number; visible: boolean }[]
  >([]);

  const currentNode = MALPE_SPATIAL_NODES[currentNodeIndex] || MALPE_SPATIAL_NODES[0];

  // Camera & Orbit State
  const yawRef = useRef(currentNode.initialYaw);
  const pitchRef = useRef(currentNode.initialPitch);
  const targetYawRef = useRef(currentNode.initialYaw);
  const targetPitchRef = useRef(currentNode.initialPitch);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const textureCacheRef = useRef<Record<string, THREE.Texture>>({});

  // Transition to node camera angles
  useEffect(() => {
    targetYawRef.current = currentNode.initialYaw;
    targetPitchRef.current = currentNode.initialPitch;

    // Load node texture onto sphere
    if (sphereMeshRef.current) {
      const loader = new THREE.TextureLoader();
      const cached = textureCacheRef.current[currentNode.imageSrc];

      const applyTexture = (tex: THREE.Texture) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        if (sphereMeshRef.current) {
          (sphereMeshRef.current.material as THREE.MeshBasicMaterial).map = tex;
          (sphereMeshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
        }
      };

      if (cached) {
        applyTexture(cached);
      } else {
        loader.load(currentNode.imageSrc, (tex) => {
          textureCacheRef.current[currentNode.imageSrc] = tex;
          applyTexture(tex);
        });
      }
    }
  }, [currentNode]);

  // Main Three.js Setup
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#dff0f6");
    sceneRef.current = scene;

    // 2. Camera (Human Eye-Level 1.7m equivalent at origin)
    const camera = new THREE.PerspectiveCamera(currentNode.cameraFov, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      rendererRef.current = renderer;
      mount.appendChild(renderer.domElement);
    } catch {
      // Headless / jsdom test environment without WebGL context
      return;
    }

    // 4. High-Fidelity Photogrammetric Spatial Sphere (Inverted for 360° Immersion)
    const sphereGeo = new THREE.SphereGeometry(120, 60, 40);
    sphereGeo.scale(-1, 1, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMeshRef.current = sphereMesh;
    scene.add(sphereMesh);

    // Load initial texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(currentNode.imageSrc, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      textureCacheRef.current[currentNode.imageSrc] = tex;
      sphereMat.map = tex;
      sphereMat.needsUpdate = true;
    });

    // 5. Ambient Coastal Sea Mist & Sunbeam Particles
    const pCount = 240;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 50;
      pPos[i + 1] = (Math.random() - 0.5) * 20;
      pPos[i + 2] = (Math.random() - 0.5) * 50;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0xfffaed,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Particle drift
      particles.rotation.y = elapsed * 0.015;

      // Smooth Camera Damping (Inertia)
      yawRef.current += (targetYawRef.current - yawRef.current) * 0.08;
      pitchRef.current += (targetPitchRef.current - pitchRef.current) * 0.08;

      // Convert Yaw/Pitch to Spherical Look-At Vector
      const phi = THREE.MathUtils.degToRad(90 - pitchRef.current);
      const theta = THREE.MathUtils.degToRad(yawRef.current);

      const target = new THREE.Vector3(
        100 * Math.sin(phi) * Math.cos(theta),
        100 * Math.cos(phi),
        100 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(target);
      renderer.render(scene, camera);

      // Project 3D Hotspot Coordinates to 2D Screen Positions
      const w = mountRef.current?.clientWidth || window.innerWidth;
      const h = mountRef.current?.clientHeight || window.innerHeight;

      const projected = currentNode.hotspots.map((hs) => {
        const hsPhi = THREE.MathUtils.degToRad(90 - hs.pitch);
        const hsTheta = THREE.MathUtils.degToRad(hs.yaw);

        const worldPos = new THREE.Vector3(
          100 * Math.sin(hsPhi) * Math.cos(hsTheta),
          100 * Math.cos(hsPhi),
          100 * Math.sin(hsPhi) * Math.sin(hsTheta)
        );

        const screenPos = worldPos.clone().project(camera);
        const isVisible = screenPos.z < 1.0;

        const x = (screenPos.x * 0.5 + 0.5) * w;
        const y = (-(screenPos.y * 0.5) + 0.5) * h;

        return {
          hotspot: hs,
          x,
          y,
          visible: isVisible,
        };
      });

      setProjectedHotspots(projected);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const nw = mountRef.current.clientWidth || window.innerWidth;
      const nh = mountRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentNode]);

  // Drag-to-Look Orbit Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevMouseRef.current.x;
    const dy = e.clientY - prevMouseRef.current.y;

    targetYawRef.current -= dx * 0.18;
    targetPitchRef.current = Math.max(-55, Math.min(65, targetPitchRef.current + dy * 0.18));

    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMouseRef.current.x;
    const dy = e.touches[0].clientY - prevMouseRef.current.y;

    targetYawRef.current -= dx * 0.22;
    targetPitchRef.current = Math.max(-55, Math.min(65, targetPitchRef.current + dy * 0.22));

    prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full h-full">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Screen-Projected Environmental Hotspots (Museum-Grade Subtle Rings) */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {projectedHotspots.map(({ hotspot, x, y, visible }) => {
          if (!visible) return null;
          const isSelected = focusedHotspot?.id === hotspot.id;

          return (
            <div
              key={hotspot.id}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                transformOrigin: "center center",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <button
                onClick={() => {
                  if (hotspot.targetNodeId) {
                    const targetIdx = MALPE_SPATIAL_NODES.findIndex(
                      (n) => n.id === hotspot.targetNodeId
                    );
                    if (targetIdx !== -1) {
                      onSelectNode(targetIdx);
                      return;
                    }
                  }
                  onSelectHotspot(hotspot);
                }}
                className={cn(
                  "group relative flex items-center gap-2 p-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl",
                  isSelected
                    ? "bg-coral-sun text-marine-espresso scale-110 ring-4 ring-coral-sun/40"
                    : "bg-marine-espresso/75 text-alabaster border border-alabaster/25 hover:border-coral-sun hover:scale-105"
                )}
                aria-label={`Discover ${hotspot.title}`}
              >
                {/* Minimalist Pulsing Ring */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-sun opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-coral-sun" />
                </span>

                {/* Expanding Waypoint Label */}
                <span className="font-serif text-[11px] tracking-wider uppercase pr-2 font-medium whitespace-nowrap">
                  {hotspot.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Contextual Hotspot Plaque / Drawer (When Selected) */}
      {focusedHotspot && (
        <aside className="absolute bottom-8 right-6 sm:right-10 z-40 max-w-md w-full pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="bg-marine-deep/95 backdrop-blur-2xl border border-sand/30 rounded-2xl p-6 sm:p-7 text-alabaster shadow-2xl">
            {/* Header: Category Tag & Close */}
            <div className="flex items-center justify-between border-b border-alabaster/10 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-coral-sun" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-coral-sun uppercase font-bold">
                  {focusedHotspot.category}
                </span>
              </div>
              <button
                onClick={() => onSelectHotspot(null as unknown as SpatialNode["hotspots"][0])}
                className="p-1 text-alabaster/60 hover:text-alabaster transition-colors"
                aria-label="Close Information Plaque"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-serif text-2xl text-alabaster leading-tight">
              {focusedHotspot.title}
            </h3>
            <div className="text-xs font-serif italic text-coral-sun/90 mt-1">
              {focusedHotspot.tagline}
            </div>

            {/* Description */}
            <p className="mt-3 font-sans text-xs sm:text-sm text-alabaster/85 font-light leading-relaxed">
              {focusedHotspot.description}
            </p>

            {/* Specifications Grid (if present) */}
            {focusedHotspot.specs && focusedHotspot.specs.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-alabaster/10">
                {focusedHotspot.specs.map((spec, i) => (
                  <div key={i} className="bg-marine-espresso/70 p-2.5 rounded-lg border border-alabaster/10">
                    <div className="text-[9px] font-mono text-alabaster/50 uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="font-serif text-xs sm:text-sm text-coral-sun font-medium mt-0.5">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Direct Step Action (if target node exists) */}
            <div className="mt-5 pt-3 border-t border-alabaster/10 flex items-center justify-between">
              {focusedHotspot.targetNodeId ? (
                <button
                  onClick={() => {
                    const targetIdx = MALPE_SPATIAL_NODES.findIndex(
                      (n) => n.id === focusedHotspot.targetNodeId
                    );
                    if (targetIdx !== -1) {
                      onSelectNode(targetIdx);
                      onSelectHotspot(null as unknown as SpatialNode["hotspots"][0]);
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-coral-sun to-coral-orange text-marine-espresso font-mono text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:scale-105 transition-all shadow-md"
                >
                  STEP FORWARD HERE →
                </button>
              ) : (
                <span className="text-[9px] font-mono text-alabaster/50 uppercase tracking-widest">
                  LOCATION DETAILS
                </span>
              )}

              <button
                onClick={() => onSelectHotspot(null as unknown as SpatialNode["hotspots"][0])}
                className="text-[10px] font-mono uppercase tracking-[0.18em] text-alabaster/70 hover:text-coral-sun transition-colors underline decoration-1 underline-offset-4"
              >
                RESUME EXPLORATION
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Subtle Grounded Wayfinding Breadcrumbs (Unobtrusive & Minimal) */}
      <nav aria-label="Expedition Wayfinding" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 bg-marine-espresso/75 backdrop-blur-xl px-4 py-2 rounded-full border border-sand/25 shadow-2xl">
        <span className="text-[8.5px] font-mono tracking-[0.2em] text-coral-sun uppercase font-bold pr-2 border-r border-alabaster/15">
          LOCATION
        </span>

        {MALPE_SPATIAL_NODES.map((node, idx) => {
          const isActive = currentNodeIndex === idx;
          const shortName =
            node.id === "gateway-entrance"
              ? "GATEWAY"
              : node.id === "welcome-pavilion-interior"
              ? "PAVILION"
              : node.id === "beach-promenade"
              ? "BEACH & SPORTS"
              : "DEEPWATER PIER";

          return (
            <button
              key={node.id}
              onClick={() => onSelectNode(idx)}
              className={cn(
                "px-3 py-1 rounded-full text-[9.5px] font-mono uppercase tracking-[0.15em] transition-all font-semibold",
                isActive
                  ? "bg-coral-sun text-marine-espresso shadow-md"
                  : "bg-alabaster/10 text-alabaster/80 hover:text-coral-sun hover:bg-alabaster/20"
              )}
            >
              {shortName}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
