"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EXPEDITION_ZONES, WaypointZone, HotspotData } from "@/lib/three/worldData";

export interface ProjectedHotspot {
  hotspot: HotspotData;
  screenX: number;
  screenY: number;
  visible: boolean;
  distance: number;
}

interface ThreeWorldProps {
  currentZoneIndex: number;
  focusedHotspot: HotspotData | null;
  onProjectedHotspotsUpdate: (projected: ProjectedHotspot[]) => void;
  onHotspotClick: (hotspot: HotspotData) => void;
  isMapOpen: boolean;
}

export function ThreeWorld({
  currentZoneIndex,
  focusedHotspot,
  onProjectedHotspotsUpdate,
  onHotspotClick,
  isMapOpen,
}: ThreeWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const orbitEulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const cameraTargetRef = useRef(new THREE.Vector3(0, 2, 0));
  const cameraDesiredPosRef = useRef(new THREE.Vector3(0, 8, 35));
  const cameraCurrentPosRef = useRef(new THREE.Vector3(0, 8, 35));

  // Keep references to scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Update target positions when zone or hotspot changes
  useEffect(() => {
    const zone = EXPEDITION_ZONES[currentZoneIndex] || EXPEDITION_ZONES[0];

    if (isMapOpen) {
      // Pull back to strategic aerial map viewpoint
      cameraDesiredPosRef.current.set(0, 95, -180);
      cameraTargetRef.current.set(0, 0, -180);
    } else if (focusedHotspot) {
      // Zoom close to focused hotspot object
      const [hx, hy, hz] = focusedHotspot.position;
      cameraDesiredPosRef.current.set(hx + 3, hy + 2, hz + 6);
      cameraTargetRef.current.set(hx, hy, hz);
    } else {
      // Normal Zone Viewpoint
      const [cx, cy, cz] = zone.cameraPosition;
      const [tx, ty, tz] = zone.cameraTarget;
      cameraDesiredPosRef.current.set(cx, cy, cz);
      cameraTargetRef.current.set(tx, ty, tz);
    }

    // Update Atmospheric Fog & Sky Colors
    if (sceneRef.current) {
      const fogCol = new THREE.Color(zone.fogColor);
      sceneRef.current.fog = new THREE.FogExp2(fogCol, isMapOpen ? 0.002 : zone.fogDensity);
      sceneRef.current.background = new THREE.Color(zone.skyColor);
    }

    if (sunLightRef.current && hemiLightRef.current) {
      sunLightRef.current.intensity = isMapOpen ? 1.5 : zone.sunIntensity;
    }
  }, [currentZoneIndex, focusedHotspot, isMapOpen]);

  // Main Three.js Initialization & Render Loop
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#e6f4f8");
    scene.fog = new THREE.FogExp2("#d9eff5", 0.012);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.2, 800);
    camera.position.set(0, 8, 35);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xe6f4f8, 0x00a8b5, 0.8);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xfff3db, 1.6);
    sunLight.position.set(40, 80, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 300;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // =========================================================================
    // 5. WORLD RECONSTRUCTION GEOMETRY & ASSETS
    // =========================================================================

    // A. Ocean Water Surface Plane
    const waterGeo = new THREE.PlaneGeometry(1200, 1200, 64, 64);
    const waterMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#00a8b5"),
      roughness: 0.12,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0;
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // B. Malpe Beach Sand Terrain (Zone 01-02)
    const sandGeo = new THREE.PlaneGeometry(180, 80, 32, 32);
    const sandMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#efe9df"),
      roughness: 0.9,
      metalness: 0.05,
    });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.rotation.x = -Math.PI / 2;
    sandMesh.position.set(0, 0.15, 25);
    sandMesh.receiveShadow = true;
    scene.add(sandMesh);

    // C. Architectural Welcome Pavilion (Zone 01)
    const pavilionGroup = new THREE.Group();
    pavilionGroup.position.set(0, 0, 5);

    // Teak floor deck
    const deckGeo = new THREE.BoxGeometry(18, 0.4, 14);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 0.2;
    deck.receiveShadow = true;
    pavilionGroup.add(deck);

    // Pavilion Timber Pillars
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.6 });
    for (let x of [-7.5, 7.5]) {
      for (let z of [-5.5, 5.5]) {
        const pillarGeo = new THREE.CylinderGeometry(0.2, 0.25, 5, 8);
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(x, 2.5, z);
        pillar.castShadow = true;
        pavilionGroup.add(pillar);
      }
    }

    // Pavilion Canvas Roof Canopy
    const roofGeo = new THREE.ConeGeometry(12, 2.5, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xfdfcf7, roughness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 5.8;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    pavilionGroup.add(roof);

    // Signage Plaque
    const signGeo = new THREE.BoxGeometry(4, 1.2, 0.2);
    const signMat = new THREE.MeshStandardMaterial({ color: 0xfdb827, roughness: 0.4 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, 3.5, 5.5);
    pavilionGroup.add(sign);

    scene.add(pavilionGroup);

    // D. Tropical Palm Trees
    const createPalmTree = (px: number, pz: number, scale = 1) => {
      const palm = new THREE.Group();
      palm.position.set(px, 0, pz);
      palm.scale.set(scale, scale, scale);

      // Curved Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 7, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6e5036, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(0, 3.5, 0);
      trunk.rotation.z = (Math.random() - 0.5) * 0.15;
      trunk.castShadow = true;
      palm.add(trunk);

      // Frond Leaves
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.6, side: THREE.DoubleSide });
      for (let i = 0; i < 7; i++) {
        const leafGeo = new THREE.PlaneGeometry(1.2, 4.5);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        const angle = (i / 7) * Math.PI * 2;
        leaf.position.set(Math.cos(angle) * 1.5, 7, Math.sin(angle) * 1.5);
        leaf.rotation.y = -angle;
        leaf.rotation.x = Math.PI / 3.5;
        leaf.castShadow = true;
        palm.add(leaf);
      }
      return palm;
    };

    scene.add(createPalmTree(-14, 15, 1.1));
    scene.add(createPalmTree(-18, 5, 0.9));
    scene.add(createPalmTree(15, 18, 1.2));
    scene.add(createPalmTree(20, 8, 1.0));
    scene.add(createPalmTree(12, -2, 0.85));

    // E. Marina Jetty (Zone 04)
    const jettyGroup = new THREE.Group();
    jettyGroup.position.set(0, 0, -25);

    const jettyDeckGeo = new THREE.BoxGeometry(4.5, 0.5, 30);
    const jettyDeckMat = new THREE.MeshStandardMaterial({ color: 0x7a5230, roughness: 0.8 });
    const jettyDeck = new THREE.Mesh(jettyDeckGeo, jettyDeckMat);
    jettyDeck.position.y = 0.6;
    jettyDeck.receiveShadow = true;
    jettyGroup.add(jettyDeck);

    // Jetty Pilings
    const pilingMat = new THREE.MeshStandardMaterial({ color: 0x3d2919, roughness: 0.9 });
    for (let z = -12; z <= 12; z += 6) {
      for (let x of [-2, 2]) {
        const piling = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3, 8), pilingMat);
        piling.position.set(x, 0, z);
        piling.castShadow = true;
        jettyGroup.add(piling);
      }
    }
    scene.add(jettyGroup);

    // F. The 25.90M Catamaran Model (Zone 05)
    const catamaranGroup = new THREE.Group();
    catamaranGroup.position.set(0, 0.4, -55);

    const hullMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.2, metalness: 0.1 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xeb6841, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x092b45, roughness: 0.1, metalness: 0.9 });
    const teakMat = new THREE.MeshStandardMaterial({ color: 0xa66a38, roughness: 0.7 });

    // Port & Starboard Twin Hulls (25.90M scaled)
    const hullLength = 16;
    const hullWidth = 1.4;
    const hullHeight = 2.2;

    for (let xOffset of [-3.5, 3.5]) {
      const hullGeo = new THREE.BoxGeometry(hullWidth, hullHeight, hullLength);
      const hull = new THREE.Mesh(hullGeo, hullMat);
      hull.position.set(xOffset, 0.6, 0);
      hull.castShadow = true;
      catamaranGroup.add(hull);

      // Hull Orange Accent Stripe
      const stripeGeo = new THREE.BoxGeometry(hullWidth + 0.05, 0.3, hullLength);
      const stripe = new THREE.Mesh(stripeGeo, accentMat);
      stripe.position.set(xOffset, 0.3, 0);
      catamaranGroup.add(stripe);
    }

    // Main Bridged Saloon Deck
    const bridgedDeck = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, hullLength - 2), teakMat);
    bridgedDeck.position.set(0, 1.6, 0);
    bridgedDeck.receiveShadow = true;
    catamaranGroup.add(bridgedDeck);

    // Enclosed Saloon Cabin with Panoramic Glass
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(6.5, 2.2, 8), hullMat);
    cabin.position.set(0, 2.8, -1);
    cabin.castShadow = true;
    catamaranGroup.add(cabin);

    const cabinGlass = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.2, 7), glassMat);
    cabinGlass.position.set(0, 3.1, -1);
    catamaranGroup.add(cabinGlass);

    // Upper Open Sky Viewing Deck
    const flybridge = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.3, 5.5), teakMat);
    flybridge.position.set(0, 4.0, -1);
    catamaranGroup.add(flybridge);

    // Navigation Radar Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 3.5, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    mast.position.set(0, 5.6, -1);
    catamaranGroup.add(mast);

    scene.add(catamaranGroup);

    // G. St. Mary's Volcanic Hexagonal Basalt Columns (Zone 07)
    const basaltGroup = new THREE.Group();
    basaltGroup.position.set(0, 0, -165);

    const basaltMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2e,
      roughness: 0.95,
      metalness: 0.1,
    });

    // Generate cluster of hexagonal monolith columns
    for (let i = 0; i < 45; i++) {
      const radius = Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      const height = 3 + Math.random() * 9;

      const columnGeo = new THREE.CylinderGeometry(0.9, 0.9, height, 6);
      const column = new THREE.Mesh(columnGeo, basaltMat);
      column.position.set(
        Math.cos(angle) * radius,
        height / 2 - 0.5,
        Math.sin(angle) * (radius * 0.7)
      );
      column.rotation.y = (Math.random() - 0.5) * 0.4;
      column.castShadow = true;
      column.receiveShadow = true;
      basaltGroup.add(column);
    }
    scene.add(basaltGroup);

    // H. Sub-Surface Underwater Reef (Zone 08)
    const reefGroup = new THREE.Group();
    reefGroup.position.set(0, -6, -205);

    const coralMat1 = new THREE.MeshStandardMaterial({ color: 0xeb6841, roughness: 0.7 });
    const coralMat2 = new THREE.MeshStandardMaterial({ color: 0xfdb827, roughness: 0.8 });
    const coralMat3 = new THREE.MeshStandardMaterial({ color: 0x00a8b5, roughness: 0.6 });

    for (let i = 0; i < 30; i++) {
      const rx = (Math.random() - 0.5) * 40;
      const rz = (Math.random() - 0.5) * 30;
      const rScale = 1 + Math.random() * 2.5;

      const coralM = new THREE.Mesh(
        new THREE.DodecahedronGeometry(rScale, 1),
        i % 3 === 0 ? coralMat1 : i % 3 === 1 ? coralMat2 : coralMat3
      );
      coralM.position.set(rx, 1, rz);
      reefGroup.add(coralM);
    }
    scene.add(reefGroup);

    // I. Floating Ambient Sea & Caustic Particles (Zone 08-11)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 300;
      positions[i + 1] = Math.random() * 30 - 10;
      positions[i + 2] = -Math.random() * 420;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // =========================================================================
    // 6. ANIMATION & RENDER LOOP
    // =========================================================================
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle ocean water ripple movement
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
      }

      // Floating Catamaran gentle swell pitch & roll
      if (catamaranGroup) {
        catamaranGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02;
        catamaranGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.015;
        catamaranGroup.position.y = 0.4 + Math.sin(elapsedTime * 1.2) * 0.1;
      }

      // Smooth Camera Flight Lerping
      cameraCurrentPosRef.current.lerp(cameraDesiredPosRef.current, 0.045);
      camera.position.copy(cameraCurrentPosRef.current);

      // Calculate Look-At with Orbit Drag Offset
      const lookAtTarget = cameraTargetRef.current.clone();
      lookAtTarget.x += Math.sin(orbitEulerRef.current.y) * 12;
      lookAtTarget.y += Math.sin(orbitEulerRef.current.x) * 8;
      camera.lookAt(lookAtTarget);

      // Render Scene
      renderer.render(scene, camera);

      // =======================================================================
      // 7. PROJECT 3D HOTSPOTS TO 2D SCREEN PIXELS
      // =======================================================================
      const activeZone = EXPEDITION_ZONES[currentZoneIndex] || EXPEDITION_ZONES[0];
      const projected: ProjectedHotspot[] = [];

      for (const hs of activeZone.hotspots) {
        const v = new THREE.Vector3(...hs.position);
        const distance = camera.position.distanceTo(v);

        // Project 3D coordinate to Normalized Device Coordinates (-1 to +1)
        v.project(camera);

        // Only show if in front of camera
        const isVisible = v.z < 1.0 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1 && !isMapOpen;

        const screenX = ((v.x + 1) * width) / 2;
        const screenY = ((-v.y + 1) * height) / 2;

        projected.push({
          hotspot: hs,
          screenX,
          screenY,
          visible: isVisible,
          distance,
        });
      }

      onProjectedHotspotsUpdate(projected);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Free Drag-to-Look Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    orbitEulerRef.current.y -= deltaX * 0.003;
    orbitEulerRef.current.x = Math.max(-0.4, Math.min(0.4, orbitEulerRef.current.x - deltaY * 0.003));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile free look
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    orbitEulerRef.current.y -= deltaX * 0.004;
    orbitEulerRef.current.x = Math.max(-0.4, Math.min(0.4, orbitEulerRef.current.x - deltaY * 0.004));

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
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
  );
}
