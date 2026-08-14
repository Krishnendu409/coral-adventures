import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * CoralPortal Component
 * Authentic Coastal Karnataka Malpe Expedition Base Gateway
 * 
 * Architectural Features:
 * - Heavy 0.55m weathered teak vertical timber posts socketed into rough-hewn laterite stone plinth blocks.
 * - Straight timber lintel with carved expedition coordinates: "MALPE EXPEDITION BASE · 13°21′02″ N · 74°42′08″ E".
 * - Double-turn natural hemp rope lashings around post-and-lintel structural joints.
 * - Brushed antique marine brass plates and structural rivet fasteners.
 * - Off-white tensioned sailcloth sunshade canopy with marine guy line rigging.
 * - Weathered teak wayfinding totem with directional signage and laterite stone bollard anchors.
 */
export const CoralPortal: React.FC = () => {
  const materials = useMemo(() => {
    // Weathered coastal teak timber
    const teakMat = new THREE.MeshStandardMaterial({
      color: '#5C3E29',
      roughness: 0.78,
      metalness: 0.04
    });

    // Dark carved structural timber
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: '#3B281A',
      roughness: 0.88,
      metalness: 0.02
    });

    // Rough-hewn Coastal Karnataka laterite stone
    const lateriteStoneMat = new THREE.MeshStandardMaterial({
      color: '#8B3A2B',
      roughness: 0.94,
      metalness: 0.0
    });

    // Brushed antique marine brass hardware & plates
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#C5A059',
      roughness: 0.32,
      metalness: 0.85
    });

    // Polished gold-brass navigation accents
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#E9B84A',
      roughness: 0.28,
      metalness: 0.90
    });

    // Natural hemp fiber rope lashings
    const hempRopeMat = new THREE.MeshStandardMaterial({
      color: '#BFA87E',
      roughness: 0.92,
      metalness: 0.0
    });

    // Tensioned off-white sailcloth canopy
    const sailclothMat = new THREE.MeshStandardMaterial({
      color: '#FAF4EB',
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    // Canopy seam reinforcement trim
    const sailclothTrimMat = new THREE.MeshStandardMaterial({
      color: '#D8CEBE',
      roughness: 0.90,
      metalness: 0.0,
      side: THREE.DoubleSide
    });

    return {
      teakMat,
      darkWoodMat,
      lateriteStoneMat,
      brassMat,
      goldMat,
      hempRopeMat,
      sailclothMat,
      sailclothTrimMat
    };
  }, []);

  return (
    <group position={[0, 0, 52]} name="Coral_ExpeditionPortal">
      {/* ========================================================================= */}
      {/* 1. HEAVY ROUGH-HEWN LATERITE STONE PLINTH BLOCKS (POST SOCKETS)           */}
      {/* ========================================================================= */}
      {/* Left Socket Plinth */}
      <group position={[-3.4, 0.45, 0]}>
        <mesh material={materials.lateriteStoneMat} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.90, 1.05]} />
        </mesh>
        {/* Recessed Plinth Socket Collar */}
        <mesh position={[0, 0.46, 0]} material={materials.darkWoodMat} receiveShadow>
          <boxGeometry args={[0.75, 0.08, 0.75]} />
        </mesh>
        {/* Brass Anchor Collar Band */}
        <mesh position={[0, 0.50, 0]} material={materials.brassMat}>
          <boxGeometr