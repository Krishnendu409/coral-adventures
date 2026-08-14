import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { LANDMARK_NODES, SplineLandmark, createCameraSpline, getInterpolatedCameraState } from '../../../lib/three/splineNetwork';
import { MalpeTerrain } from './environment/MalpeTerrain';
import { OceanWater } from './environment/OceanWater';
import { VegetationSystem } from './environment/VegetationSystem';
import { PavilionArchitecture } from './environment/PavilionArchitecture';
import { CoralPortal } from './environment/CoralPortal';
import { MarineCraft } from './environment/MarineCraft';
import { AtmosphereSky } from './environment/AtmosphereSky';
import { EffectComposer, SSAO, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface CameraControllerProps {
  splineProgress: number;
  onProjectDiscoveries?: (projectedList: { id: string; x: number; y: number }[]) => void;
  lookOffsetRef: React.MutableRefObject<{ yaw: number; pitch: number }>;
  isDraggingRef: React.MutableRefObject<boolean>;
}

const CameraController: React.FC<CameraControllerProps> = ({
  splineProgress,
  onProjectDiscoveries,
  lookOffsetRef,
  isDraggingRef
}) => {
  const { camera } = useThree();
  const spline = useMemo(() => createCameraSpline(LANDMARK_NODES), []);
  const currentLookTarget = useRef(new THREE.Vector3(0, 1.7, 25));
  const isFirstFrame = useRef(true);

  useFrame(() => {
    const { position, lookAt, fov, currentLandmark } = getInterpolatedCameraState(
      spline,
      splineProgress,
      LANDMARK_NODES
    );

    const targetPos = position.clone();

    // Dynamically update camera FOV smoothly
    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - fov) > 0.001) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
        camera.updateProjectionMatrix();
      }
    }

    // Controlled Look-Mode: apply allowable yaw/pitch limits from current landmark
    const targetLookAt = lookAt.clone();
    if (currentLandmark) {
      const range = currentLandmark.allowableLookRange;
      const minYawRad = range.minYaw * (Math.PI / 180);
      const maxYawRad = range.maxYaw * (Math.PI / 180);
      const minPitchRad = range.minPitch * (Math.PI / 180);
      const maxPitchRad = range.maxPitch * (Math.PI / 180);

      const clampedYaw = Math.max(minYawRad, Math.min(maxYawRad, lookOffsetRef.current.yaw));
      const clampedPitch = Math.max(minPitchRad, Math.min(maxPitchRad, lookOffsetRef.current.pitch));

      targetLookAt.x += Math.sin(clampedYaw) * 15;
      targetLookAt.y += Math.tan(clampedPitch) * 15;
    }

    // Dampen look offset back toward center when not actively dragging
    if (!isDraggingRef.current) {
      lookOffsetRef.current.yaw *= 0.95;
      lookOffsetRef.current.pitch *= 0.95;
    }

    if (isFirstFrame.current) {
      camera.position.copy(targetPos);
      currentLookTarget.current.copy(targetLookAt);
      camera.lookAt(currentLookTarget.current);
      isFirstFrame.current = false;
    } else {
      camera.position.lerp(targetPos, 0.08);
      currentLookTarget.current.lerp(targetLookAt, 0.1);
      camera.lookAt(currentLookTarget.current);
    }

    // Hotspot Screen-Space Projection for Discovery Annotations & Field Notes
    if (onProjectDiscoveries && currentLandmark?.discoveries?.length) {
      const projectedList = currentLandmark.discoveries
        .filter((d: SplineLandmark['discoveries'][number]) => d.worldPosition)
        .map((d: SplineLandmark['discoveries'][number]) => {
          const worldPos = d.worldPosition!.clone();
          worldPos.project(camera);
          const isInFront = worldPos.z < 1.0;
          return {
            id: d.id,
            x: (worldPos.x * 0.5 + 0.5) * 100,
            y: (-(worldPos.y * 0.5) + 0.5) * 100,
            isInFront
          };
        })
        .filter(item => item.isInFront)
        .map(({ id, x, y }) => ({ id, x, y }));

      onProjectDiscoveries(projectedList);
    }
  });

  return null;
};

export interface WorldSceneProps {
  splineProgress: number;
  onProjectDiscoveries?: (projectedList: { id: string; x: number; y: number }[]) => void;
  isHeadless?: boolean;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * WorldScene Component
 * Master 3D Scene Orchestration for Malpe Waterfront Digital Twin
 * 
 * Environmental Layers:
 * 1. AtmosphereSky: 5500K golden hour lighting, FogExp2, St. Mary's basalt columns silhouette
 * 2. MalpeTerrain: Karnataka coastal topography, PBR sand, laterite boulders & pathways
 * 3. OceanWater: Living Arabian Sea Gerstner waves, Voronoi caustics, shoreline surf foam
 * 4. CoralPortal: Weathered teak timber portal framing arrival sanctuary (z = 52)
 * 5. PavilionArchitecture: Weathered teak post-and-beam pavilion, linen canopy, lounge, lantern
 * 6. VegetationSystem: Coconut palm groves with 4-tier frond canopies & undergrowth
 * 7. MarineCraft: Malpe fishing trawlers, Seadoo jet skis, ocean kayaks & 25.90M catamaran
 */
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

export const WorldScene: React.FC<WorldSceneProps> = ({
  splineProgress,
  onProjectDiscoveries,
  isHeadless = false
}) => {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const lookOffsetRef = useRef({ yaw: 0, pitch: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    } catch {
      // Ignored in virtual DOM environments
    }
  };

  const handlePointerUp = (e?: React.PointerEvent) => {
    isDraggingRef.current = false;
    if (e) {
      try {
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignored in virtual DOM environments
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    lookOffsetRef.current.yaw -= deltaX * 0.0025;
    lookOffsetRef.current.pitch -= deltaY * 0.0025;
  };

  return (
    <div
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
      data-testid="world-scene-container"
    >
      {mounted && hasWebGL && !isHeadless && process.env.NODE_ENV !== 'test' ? (
        <ErrorBoundary fallback={<div data-testid="world-scene-fallback" className="w-full h-full flex items-center justify-center bg-[#071A2B] text-[#FAF6EE]/60 font-mono text-xs uppercase tracking-widest">WebGL not supported</div>}>
          <Canvas
            shadows
            gl={{
              antialias: true,
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15
            }}
            camera={{ fov: 52, near: 0.1, far: 850 }}
          >
            <color attach="background" args={['#F5E8D8']} />

            {/* Spatial Catmull-Rom Spline Human-Scale Camera Controller */}
            <CameraController
              splineProgress={splineProgress}
              onProjectDiscoveries={onProjectDiscoveries}
              lookOffsetRef={lookOffsetRef}
              isDraggingRef={isDraggingRef}
            />

            {/* 1. Atmospheric Lighting, Sky & St. Mary's Basalt Silhouette */}
            <AtmosphereSky />

            {/* 2. Layer 1 (Geography): Malpe Topography, Shoreline, Laterite Rocks */}
            <MalpeTerrain />

            {/* 3. Layer 1 (Geography): Arabian Sea Ocean Surface with Gerstner Waves */}
            <OceanWater />

            {/* 4. Layer 2 (Infrastructure): Weathered Teak Coral Entrance Portal */}
            <CoralPortal />

            {/* 5. Layer 2 (Infrastructure): Open-Air Teak Pavilion & Reception Lounge */}
            <PavilionArchitecture />

            {/* 6. Layer 2 & 3 (Vegetation): Coastal Karnataka Coconut Palm Groves & Shrubs */}
            <VegetationSystem />

            {/* 7. Layer 2 & 3 (Living Craft): Malpe Fishing Trawlers, Jet Skis & 25.90M Catamaran */}
            <MarineCraft />

            {/* 8. Restrained Postprocessing Pipeline: Bloom & Editorial Vignette */}
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.15}
                luminanceSmoothing={0.85}
                intensity={0.4}
                mipmapBlur
              />
              <Vignette
                offset={0.3}
                darkness={0.45}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          </Canvas>
        </ErrorBoundary>
      ) : (
        <div data-testid="world-scene-fallback" className="w-full h-full flex items-center justify-center bg-[#071A2B] text-[#FAF6EE]/60 font-mono text-xs uppercase tracking-widest">
          {!hasWebGL ? "WebGL not supported" : isHeadless ? "WebGL not supported in headless mode" : "INITIALIZING 3D EXPEDITION SCENE..."}
        </div>
      )}
    </div>
  );
};

export default WorldScene;
