"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

interface CatamaranCanvasHeroProps {
  scrollProgressRef: React.RefObject<number | null>;
}

// Global In-Memory Singleton Cache for the parsed GLTF scene
let cachedGltfScene: THREE.Group | null = null;
let gltfLoadPromise: Promise<THREE.Group> | null = null;

function getOrLoadCatamaranGltf(): Promise<THREE.Group> {
  if (cachedGltfScene) {
    return Promise.resolve(cachedGltfScene.clone(true));
  }
  if (!gltfLoadPromise) {
    gltfLoadPromise = new Promise<THREE.Group>((resolve, reject) => {
      const loader = new GLTFLoader();
      const modelUrl = "/models/catamaran.glb";

      loader.load(
        modelUrl,
        (gltf) => {
          const loadedMesh = gltf.scene;

          // Configure materials and vertex normals once
          loadedMesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              m.castShadow = true;
              m.receiveShadow = true;

              if (m.geometry) {
                m.geometry.computeVertexNormals();
                m.geometry.center();
              }

              if (m.material) {
                const mat = (Array.isArray(m.material) ? m.material[0] : m.material) as THREE.MeshStandardMaterial;
                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                  mat.map.generateMipmaps = true;
                  mat.map.minFilter = THREE.LinearMipmapLinearFilter;
                  mat.map.magFilter = THREE.LinearFilter;
                }
                mat.roughness = 0.38;
                mat.metalness = 0.12;
                mat.envMapIntensity = 1.1;
              }
            }
          });

          cachedGltfScene = loadedMesh;
          resolve(loadedMesh.clone(true));
        },
        undefined,
        (err) => {
          console.warn("Fallback to /models/catamaran.glb:", err);
          loader.load(
            "/models/catamaran.glb",
            (fbGltf) => {
              const fbMesh = fbGltf.scene;
              fbMesh.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const m = child as THREE.Mesh;
                  m.castShadow = true;
                  m.receiveShadow = true;
                  if (m.geometry) {
                    m.geometry.computeVertexNormals();
                    m.geometry.center();
                  }
                  if (m.material) {
                    const mat = (Array.isArray(m.material) ? m.material[0] : m.material) as THREE.MeshStandardMaterial;
                    if (mat.map) {
                      mat.map.colorSpace = THREE.SRGBColorSpace;
                    }
                  }
                }
              });
              cachedGltfScene = fbMesh;
              resolve(fbMesh.clone(true));
            },
            undefined,
            reject
          );
        }
      );
    });
  }
  return gltfLoadPromise.then((scene) => scene.clone(true));
}

// Background idle trigger to preload the GLB before the user arrives
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
      getOrLoadCatamaranGltf().catch(() => {});
    });
  } else {
    setTimeout(() => {
      getOrLoadCatamaranGltf().catch(() => {});
    }, 300);
  }
}

export function CatamaranCanvasHero({ scrollProgressRef }: CatamaranCanvasHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mutable animation state references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0.2, 0.4, 6.0);
    cameraRef.current = camera;

    // 3. Performance-Tuned WebGL Renderer
    const maxDpr = isMobile ? 1.25 : 1.75;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Maritime 3-Point Lighting
    const ambientLight = new THREE.AmbientLight(0x182c44, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.7);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0x0ea5e9, 1.3);
    fillLight.position.set(-7, -1, -3);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0x2dd4bf, 1.6);
    rimLight.position.set(-4, 6, -6);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Model Hierarchy Group (Right-biased anchor)
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const initialScale = isMobile ? 1.55 : 2.05;
    modelGroup.position.set(isMobile ? 0.0 : 1.5, -0.12, -0.2);
    modelGroup.scale.setScalar(initialScale);
    modelGroup.rotation.set(0.05, 0.45, -0.02);

    // 6. Fast Async GLTF Ingestion & Early Shader Warmup
    let isDisposed = false;

    getOrLoadCatamaranGltf()
      .then((loadedMesh) => {
        if (isDisposed) return;
        modelGroup.add(loadedMesh);

        if (renderer && scene && camera) {
          try {
            renderer.compile(scene, camera);
          } catch {
            // Ignore non-WebGL test environment errors
          }
        }

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load catamaran mesh:", err);
      });

    // 7. IntersectionObserver for GPU Saving
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "300px" }
    );
    observer.observe(container);

    // 8. Resize Handler with Debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container || !renderer || !camera) return;
        const newW = container.clientWidth || window.innerWidth;
        const newH = container.clientHeight || window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }, 60);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 9. Continuous Ultra-Smooth Damped Render Loop (Smooth Sine/Hermite Turn)
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let smoothedProgress = scrollProgressRef.current ?? 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Exponential smooth damping for silky smooth scroll interpolation
      const targetP = Math.min(1, Math.max(0, scrollProgressRef.current ?? 0));
      smoothedProgress += (targetP - smoothedProgress) * (1.0 - Math.exp(-9.0 * delta));
      const p = smoothedProgress;

      if (modelGroupRef.current) {
        // Subtle organic sea buoyancy
        const heave = Math.sin(elapsedTime * 0.7) * 0.018 + Math.sin(elapsedTime * 1.3) * 0.005;
        const roll = Math.sin(elapsedTime * 0.5 + 0.3) * 0.005;
        const pitch = Math.cos(elapsedTime * 0.6) * 0.004;

        // 1. POSITION (Glides smoothly across viewport without jerky snapping)
        const currentMobile = window.innerWidth < 768;
        const startX = currentMobile ? 0.0 : 1.5;
        const endX = currentMobile ? 0.0 : 0.85;

        // Smooth cubic ease for position & scale
        const smoothP = p * p * (3 - 2 * p); // Smoothstep curve

        const targetX = THREE.MathUtils.lerp(startX, endX, smoothP);
        const targetY = THREE.MathUtils.lerp(-0.12, -0.20, smoothP) + heave;
        const targetZ = THREE.MathUtils.lerp(-0.2, 1.25, smoothP);

        modelGroupRef.current.position.set(targetX, targetY, targetZ);

        // 2. CONTINUOUS SMOOTH YAW ROTATION (Turns seamlessly without piecewise angle kinks)
        const startYaw = 0.45; // 3/4 bow angle (looks fast and sleek)
        const endYaw = 1.95;   // Full broadside profile
        const targetYaw = THREE.MathUtils.lerp(startYaw, endYaw, smoothP);

        const targetPitch = THREE.MathUtils.lerp(0.05, 0.08, smoothP) + pitch;
        const targetRoll = THREE.MathUtils.lerp(-0.02, 0.01, smoothP) + roll;

        modelGroupRef.current.rotation.set(targetPitch, targetYaw, targetRoll);

        // 3. SCALE
        const scaleMin = currentMobile ? 1.55 : 2.05;
        const scaleMax = currentMobile ? 2.35 : 3.15;
        const targetScale = THREE.MathUtils.lerp(scaleMin, scaleMax, smoothP);
        modelGroupRef.current.scale.setScalar(targetScale);
      }

      // 4. CAMERA ORBIT & DOLLY
      if (cameraRef.current) {
        const smoothP = p * p * (3 - 2 * p);
        const camX = THREE.MathUtils.lerp(0.2, -0.1, smoothP);
        const camY = THREE.MathUtils.lerp(0.4, 0.75, smoothP);
        const camZ = THREE.MathUtils.lerp(6.0, 4.4, smoothP);
        cameraRef.current.position.set(camX, camY, camZ);
        cameraRef.current.lookAt(0.3, 0.05, 0.1);
      }

      // 5. LIGHTING DYNAMICS
      if (rimLightRef.current) {
        rimLightRef.current.intensity = THREE.MathUtils.lerp(1.6, 3.2, p);
      }
      if (keyLightRef.current) {
        keyLightRef.current.intensity = THREE.MathUtils.lerp(2.7, 3.5, p);
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 10. Clean Disposal
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
