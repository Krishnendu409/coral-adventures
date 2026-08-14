import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const BRAHMINY_BIRD_COUNT = 14;
export const DOLPHIN_COUNT = 3;

export interface BirdThermalConfig {
  center: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  direction: 1 | -1;
  baseAltitude: number;
}

export const BIRD_CONFIGS: BirdThermalConfig[] = [
  // Arrival Road & Expedition Portal soaring cluster (4 birds)
  { center: [-15, 24, 25], radius: 22, speed: 0.28, phase: 0.0, direction: 1, baseAltitude: 24 },
  { center: [12, 28, 45], radius: 18, speed: 0.34, phase: 1.2, direction: -1, baseAltitude: 28 },
  { center: [-5, 32, 60], radius: 26, speed: 0.25, phase: 2.5, direction: 1, baseAltitude: 32 },
  { center: [20, 22, 15], radius: 15, speed: 0.38, phase: 4.1, direction: -1, baseAltitude: 22 },

  // Welcome Pavilion & Exploration Deck soaring cluster (5 birds)
  { center: [0, 30, 110], radius: 30, speed: 0.22, phase: 0.5, direction: 1, baseAltitude: 30 },
  { center: [-25, 35, 135], radius: 24, speed: 0.30, phase: 1.8, direction: -1, baseAltitude: 35 },
  { center: [28, 26, 150], radius: 20, speed: 0.32, phase: 3.2, direction: 1, baseAltitude: 26 },
  { center: [-10, 38, 165], radius: 35, speed: 0.20, phase: 4.7, direction: -1, baseAltitude: 38 },
  { center: [15, 34, 180], radius: 28, speed: 0.26, phase: 5.5, direction: 1, baseAltitude: 34 },

  // Malpe Sea Walkway Breakwater soaring cluster (5 birds)
  { center: [-20, 25, 320], radius: 32, speed: 0.24, phase: 0.8, direction: -1, baseAltitude: 25 },
  { center: [18, 30, 360], radius: 25, speed: 0.31, phase: 2.1, direction: 1, baseAltitude: 30 },
  { center: [-12, 36, 400], radius: 38, speed: 0.19, phase: 3.6, direction: -1, baseAltitude: 36 },
  { center: [25, 28, 430], radius: 22, speed: 0.35, phase: 4.9, direction: 1, baseAltitude: 28 },
  { center: [0, 40, 460], radius: 40, speed: 0.18, phase: 6.0, direction: -1, baseAltitude: 40 },
];

export interface DolphinLeapConfig {
  center: [number, number, number]; // [X, Y_water, Z]
  maxLeapHeight: number;
  cycleDuration: number;
  phaseOffset: number;
  leapDuration: number;
}

export const DOLPHIN_CONFIGS: DolphinLeapConfig[] = [
  { center: [-18, 0, 675], maxLeapHeight: 3.8, cycleDuration: 6.0, phaseOffset: 0.0, leapDuration: 2.2 },
  { center: [25, 0, 715], maxLeapHeight: 4.2, cycleDuration: 6.0, phaseOffset: 1.9, leapDuration: 2.2 },
  { center: [8, 0, 742], maxLeapHeight: 3.5, cycleDuration: 6.0, phaseOffset: 3.8, leapDuration: 2.2 },
];

export interface FishSchoolConfig {
  center: [number, number, number];
  count: number;
  spread: [number, number]; // [radiusX, radiusZ]
}

export const FISH_SCHOOL_CONFIGS: FishSchoolConfig[] = [
  { center: [-35, -0.8, 202], count: 22, spread: [6, 4] },
  { center: [12, -1.1, 212], count: 26, spread: [8, 5] },
  { center: [45, -0.7, 206], count: 20, spread: [7, 4] },
];

/**
 * Pure calculation helper for bird thermal orbit position & rotation
 */
export function calculateBirdThermalOrbit(index: number, time: number) {
  const cfg = BIRD_CONFIGS[index % BIRD_CONFIGS.length];
  const theta = (cfg.phase + time * cfg.speed * cfg.direction) % (Math.PI * 2);

  const x = cfg.center[0] + Math.cos(theta) * cfg.radius + Math.sin(time * 0.3 + index) * 2.5;
  const z = cfg.center[2] + Math.sin(theta) * cfg.radius + Math.cos(time * 0.25 + index) * 2.5;
  const y = cfg.baseAltitude + Math.sin(time * 0.5 + theta) * 2.2;

  // Tangent heading angle
  const heading = Math.atan2(-Math.sin(theta) * cfg.direction, Math.cos(theta) * cfg.direction);
  // Bank angle into turn
  const bank = cfg.direction * 0.22 * (1.0 + Math.sin(time * 0.4) * 0.2);
  // Wing pitch oscillation
  const pitch = Math.sin(time * 0.8 + index) * 0.08;

  return {
    position: [x, y, z] as [number, number, number],
    rotation: [pitch, heading, bank] as [number, number, number],
    wingFlap: Math.sin(time * 2.4 + index) * 0.15,
  };
}

/**
 * Pure calculation helper for dolphin parabolic leap trajectory
 */
export function calculateDolphinLeapPosition(index: number, time: number) {
  const cfg = DOLPHIN_CONFIGS[index % DOLPHIN_CONFIGS.length];
  const localTime = (time + cfg.phaseOffset) % cfg.cycleDuration;
  const isLeaping = localTime <= cfg.leapDuration;

  if (!isLeaping) {
    // Submerged resting state
    return {
      position: [cfg.center[0], -2.2, cfg.center[2]] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      isLeaping: false,
      splashOpacity: 0.0,
      splashRadius: 0.5,
    };
  }

  // Normalized progress in leap arc [0..1]
  const progress = localTime / cfg.leapDuration;
  const arcY = Math.sin(progress * Math.PI);

  const x = cfg.center[0] + (progress - 0.5) * 2.2;
  const y = cfg.center[1] - 0.5 + arcY * cfg.maxLeapHeight;
  const z = cfg.center[2] + (progress - 0.5) * 8.5;

  // Pitch angle following derivative of parabolic arc: dY/dProgress = pi * cos(progress * pi)
  const dY = Math.cos(progress * Math.PI) * cfg.maxLeapHeight * 0.6;
  const dZ = 8.5 / cfg.leapDuration;
  const pitch = Math.atan2(dY, dZ);

  // Splash parameters for entry/exit
  const isAtWaterSurface = progress < 0.18 || progress > 0.82;
  const splashOpacity = isAtWaterSurface ? Math.sin((progress < 0.18 ? progress / 0.18 : (1 - progress) / 0.18) * Math.PI) : 0;
  const splashRadius = progress < 0.18 ? 0.8 + progress * 15.0 : 0.8 + (1.0 - progress) * 15.0;

  return {
    position: [x, y, z] as [number, number, number],
    rotation: [-pitch, 0, 0] as [number, number, number],
    isLeaping: true,
    splashOpacity,
    splashRadius,
  };
}

/**
 * Pure calculation helper for fish school swimming offset
 */
export function calculateFishSchoolPosition(schoolIndex: number, fishIndex: number, time: number) {
  const cfg = FISH_SCHOOL_CONFIGS[schoolIndex % FISH_SCHOOL_CONFIGS.length];
  const angle = (fishIndex / cfg.count) * Math.PI * 2;

  const schoolSwimX = Math.sin(time * 1.2 + schoolIndex) * 2.5;
  const schoolSwimZ = Math.cos(time * 0.9 + schoolIndex) * 1.8;

  const offsetX = Math.cos(angle + time * 0.4) * (cfg.spread[0] * 0.5) + Math.sin(time * 2.0 + fishIndex) * 0.4;
  const offsetZ = Math.sin(angle + time * 0.4) * (cfg.spread[1] * 0.5) + Math.cos(time * 1.8 + fishIndex) * 0.4;
  const offsetY = Math.sin(time * 1.5 + fishIndex * 0.5) * 0.15;

  return [
    cfg.center[0] + schoolSwimX + offsetX,
    cfg.center[1] + offsetY,
    cfg.center[2] + schoolSwimZ + offsetZ,
  ] as [number, number, number];
}

/**
 * Individual Brahminy Sea Bird Mesh (Haliastur indus)
 * Features signature chestnut body/wings, pristine white head/chest, and dark wingtips.
 */
const BrahminySeaBirdMesh: React.FC<{ index: number }> = ({ index }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const data = calculateBirdThermalOrbit(index, t);

    if (groupRef.current) {
      groupRef.current.position.set(...data.position);
      groupRef.current.rotation.set(...data.rotation);
    }
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = 0.08 + data.wingFlap;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = -0.08 - data.wingFlap;
    }
  });

  const initialData = useMemo(() => calculateBirdThermalOrbit(index, 0), [index]);

  return (
    <group
      ref={groupRef}
      position={initialData.position}
      rotation={initialData.rotation}
      data-testid={`brahminy-bird-${index}`}
    >
      {/* Fuselage & Body (Chestnut Brown #8B4513) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.22, 1.1, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>

      {/* Head & Neck (Pristine White #F8F8F8) */}
      <mesh position={[0, 0.08, 0.42]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.4} />
      </mesh>

      {/* Curved Hooked Beak (Yellow #FFC107) */}
      <mesh position={[0, 0.05, 0.56]} rotation={[0.2, 0, 0]}>
        <coneGeometry args={[0.05, 0.14, 6]} />
        <meshStandardMaterial color="#FFC107" roughness={0.3} />
      </mesh>

      {/* Tail Feathers (Chestnut & White Fan) */}
      <mesh position={[0, 0.02, -0.6]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.45, 0.4]} />
        <meshStandardMaterial color="#8B4513" side={THREE.DoubleSide} roughness={0.7} />
      </mesh>

      {/* Left Wing (Swept Dihedral with Dark Wingtips) */}
      <group ref={leftWingRef} position={[-0.15, 0.05, 0.1]} rotation={[0, 0, 0.08]}>
        <mesh position={[-0.7, 0, -0.08]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[1.25, 0.04, 0.35]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>

        {/* Black Wingtip Feathers */}
        <mesh position={[-1.4, 0, -0.12]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.45, 0.03, 0.28]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Wing (Swept Dihedral with Dark Wingtips) */}
      <group ref={rightWingRef} position={[0.15, 0.05, 0.1]} rotation={[0, 0, -0.08]}>
        <mesh position={[0.7, 0, -0.08]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[1.25, 0.04, 0.35]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>

        {/* Black Wingtip Feathers */}
        <mesh position={[1.4, 0, -0.12]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.45, 0.03, 0.28]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Individual Humpback Dolphin Mesh & Dynamic Splash Ring
 * Features bi-tone streamlined body (slate blue back #3A4F63, pale belly #E8D5D5), dorsal hump, flukes.
 */
const DolphinAndSplash: React.FC<{ index: number }> = ({ index }) => {
  const dolphinGroupRef = useRef<THREE.Group>(null);
  const splashRingRef = useRef<THREE.Mesh>(null);
  const cfg = DOLPHIN_CONFIGS[index];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const data = calculateDolphinLeapPosition(index, t);

    if (dolphinGroupRef.current) {
      dolphinGroupRef.current.position.set(...data.position);
      dolphinGroupRef.current.rotation.set(...data.rotation);
      dolphinGroupRef.current.visible = data.isLeaping;
    }

    if (splashRingRef.current) {
      if (data.splashOpacity > 0.02) {
        splashRingRef.current.visible = true;
        splashRingRef.current.scale.set(data.splashRadius, data.splashRadius, 1);
        (splashRingRef.current.material as THREE.MeshBasicMaterial).opacity = data.splashOpacity * 0.75;
      } else {
        splashRingRef.current.visible = false;
      }
    }
  });

  return (
    <group data-testid={`dolphin-entity-${index}`}>
      {/* Dynamic Water Splash Particle Ring at Sea Level */}
      <mesh
        ref={splashRingRef}
        position={[cfg.center[0], 0.02, cfg.center[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        data-testid="dolphin-splash-rings"
      >
        <ringGeometry args={[0.4, 0.85, 32]} />
        <meshBasicMaterial color="#A5F2F3" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Leaping Dolphin Body */}
      <group ref={dolphinGroupRef} position={[cfg.center[0], -2.2, cfg.center[2]]}>
        {/* Main Torso (Slate Blue #3A4F63) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.18, 2.6, 12]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.25} metalness={0.2} />
        </mesh>

        {/* Pale Underbelly (#E8D5D5) */}
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.14, 2.5, 12]} />
          <meshStandardMaterial color="#E8D5D5" roughness={0.3} />
        </mesh>

        {/* Snout & Head (Beak tapering) */}
        <mesh position={[0, 0.05, 1.5]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
          <coneGeometry args={[0.26, 0.8, 10]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.2} />
        </mesh>

        {/* Dorsal Hump & Curved Fin */}
        <mesh position={[0, 0.45, -0.1]} rotation={[-0.3, 0, 0]}>
          <coneGeometry args={[0.12, 0.65, 6]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.3} />
        </mesh>

        {/* Left Pectoral Flipper */}
        <mesh position={[-0.45, -0.1, 0.4]} rotation={[0.2, 0.3, -0.6]}>
          <boxGeometry args={[0.5, 0.04, 0.22]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.3} />
        </mesh>

        {/* Right Pectoral Flipper */}
        <mesh position={[0.45, -0.1, 0.4]} rotation={[0.2, -0.3, 0.6]}>
          <boxGeometry args={[0.5, 0.04, 0.22]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.3} />
        </mesh>

        {/* Tail Fluke (Horizontal Propulsive Fins) */}
        <mesh position={[0, 0.02, -1.4]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.03, 0.35]} />
          <meshStandardMaterial color="#3A4F63" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Shallow Water Fish School Component
 * Renders silver-cyan coastal fish swimming in synchronized wave currents below shallow waters.
 */
const ShallowWaterFishSchools: React.FC = () => {
  const schoolsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!schoolsRef.current) return;

    let childIndex = 0;
    FISH_SCHOOL_CONFIGS.forEach((schoolCfg, schoolIdx) => {
      for (let i = 0; i < schoolCfg.count; i++) {
        const fishMesh = schoolsRef.current?.children[childIndex] as THREE.Mesh;
        if (fishMesh) {
          const pos = calculateFishSchoolPosition(schoolIdx, i, t);
          fishMesh.position.set(...pos);
          fishMesh.rotation.y = Math.sin(t * 1.8 + i * 0.3) * 0.25 + Math.atan2(Math.sin(t * 1.2), Math.cos(t * 0.9));
        }
        childIndex++;
      }
    });
  });

  // Calculate total fish instances
  const totalFishCount = useMemo(() => {
    return FISH_SCHOOL_CONFIGS.reduce((acc, cfg) => acc + cfg.count, 0);
  }, []);

  const fishGeometry = useMemo(() => new THREE.ConeGeometry(0.08, 0.45, 5), []);
  const fishMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B0E0E6',
      emissive: '#25C4C0',
      emissiveIntensity: 0.15,
      roughness: 0.2,
      metalness: 0.8,
    });
  }, []);

  return (
    <group
      ref={schoolsRef}
      name="ShallowWaterFishSchools"
      data-testid="shallow-fish-schools"
    >
      {Array.from({ length: totalFishCount }).map((_, idx) => (
        <mesh
          key={idx}
          geometry={fishGeometry}
          material={fishMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
};

/**
 * WildlifeSystem Master Component
 * Native Arabian Sea Wildlife System for Malpe Digital Twin:
 * 
 * 1. 14 soaring Brahminy Sea Birds (Haliastur indus) flying thermal spirals over Road, Pavilion, and Walkway.
 * 2. Pod of 3 Leaping Humpback Dolphins (Z=650m to Z=750m) with dynamic water splash particle rings.
 * 3. 60+ Shallow Water Fish Schools swimming in intertidal swash currents (Z=195m to Z=220m).
 */
export const WildlifeSystem: React.FC = () => {
  return (
    <group name="ArabianSea_WildlifeSystem" data-testid="wildlife-system-root">
      {/* 1. 14 Soaring Brahminy Sea Birds Thermal Layer */}
      <group
        name="BrahminySeaBirdsLayer"
        data-testid="brahminy-birds-group"
      >
        {Array.from({ length: BRAHMINY_BIRD_COUNT }).map((_, idx) => (
          <BrahminySeaBirdMesh key={idx} index={idx} />
        ))}
      </group>

      {/* 2. Pod of 3 Leaping Humpback Dolphins Layer */}
      <group
        name="LeapingDolphinsPod"
        data-testid="leaping-dolphins-pod"
      >
        {Array.from({ length: DOLPHIN_COUNT }).map((_, idx) => (
          <DolphinAndSplash key={idx} index={idx} />
        ))}
      </group>

      {/* 3. Shallow Water Fish Schools Layer (Z=195m to Z=220m) */}
      <ShallowWaterFishSchools />
    </group>
  );
};

export default WildlifeSystem;
