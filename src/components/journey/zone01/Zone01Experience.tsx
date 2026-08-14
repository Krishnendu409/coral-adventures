"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { WorldScene } from "./WorldScene";
import { MinimalHUD } from "./MinimalHUD";
import { EditorialAnnotations, ProjectedDiscovery } from "./EditorialAnnotations";
import { DiegeticNauticalMap } from "./DiegeticNauticalMap";
import { createSpatialAudioEngine } from "../../../lib/three/spatialAudio";
import { LANDMARK_NODES, SplineLandmark, LandmarkDiscovery } from "../../../lib/three/splineNetwork";

export function Zone01Experience() {
  const [splineProgress, setSplineProgress] = useState(0);
  const [activeDiscovery, setActiveDiscovery] = useState<LandmarkDiscovery | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [projectedDiscoveries, setProjectedDiscoveries] = useState<ProjectedDiscovery[]>([]);

  const audioEngine = useMemo(() => createSpatialAudioEngine(), []);

  // Determine current and next landmark
  const currentLandmark = useMemo(() => {
    let current = LANDMARK_NODES[0];
    for (let i = 0; i < LANDMARK_NODES.length; i++) {
      if (LANDMARK_NODES[i].splineProgress <= splineProgress + 0.01) {
        current = LANDMARK_NODES[i];
      } else {
        break;
      }
    }
    return current;
  }, [splineProgress]);

  const prevLandmark = useMemo(() => {
    const currentIndex = LANDMARK_NODES.findIndex(l => l.id === currentLandmark.id);
    return currentIndex > 0 ? LANDMARK_NODES[currentIndex - 1] : null;
  }, [currentLandmark]);

  const nextLandmark = useMemo(() => {
    const currentIndex = LANDMARK_NODES.findIndex(l => l.id === currentLandmark.id);
    return currentIndex < LANDMARK_NODES.length - 1 ? LANDMARK_NODES[currentIndex + 1] : null;
  }, [currentLandmark]);

  // Sync audio zone
  useEffect(() => {
    audioEngine.setAudioZone(currentLandmark.audioZone);
  }, [currentLandmark.audioZone, audioEngine]);

  // Tie spatial audio to the HUD button
  useEffect(() => {
    let hasStarted = false;
    const handleToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[aria-label="Toggle Ambient Audio"]')) {
        if (!hasStarted) {
          audioEngine.start();
          hasStarted = true;
        } else {
          audioEngine.toggleMute();
        }
      }
    };
    document.addEventListener('click', handleToggle);
    return () => document.removeEventListener('click', handleToggle);
  }, [audioEngine]);

  const handleSelectLandmark = useCallback((landmark: SplineLandmark) => {
    setSplineProgress(landmark.splineProgress);
    setIsMapOpen(false);
  }, []);

  const handleStepForward = () => {
    if (nextLandmark) setSplineProgress(nextLandmark.splineProgress);
  };

  const handleStepBackward = () => {
    if (prevLandmark) setSplineProgress(prevLandmark.splineProgress);
  };

  const getPromptForLandmark = (id: string) => {
    switch (id) {
      case 'coral-portal': return "ENTER THROUGH CORAL PORTAL →";
      case 'garden-path': return "STEP INTO ARRIVAL GARDENS →";
      case 'pavilion-center': return "ENTER WELCOME PAVILION →";
      case 'exploration-deck': return "STEP ONTO EXPLORATION DECK →";
      case 'beach-shoreline': return "PROCEED TO MALPE BEACH →";
      default: return `PROCEED TO ${id.replace('-', ' ').toUpperCase()} →`;
    }
  };

  return (
    <main className="relative w-full h-screen h-[100dvh] overflow-hidden bg-marine-deep select-none">
      
      <WorldScene 
        splineProgress={splineProgress}
        onProjectDiscoveries={(list) => {
          const fullList = list.map(item => {
             const discovery = currentLandmark.discoveries.find(d => d.id === item.id) || LANDMARK_NODES.flatMap(l => l.discoveries).find(d => d.id === item.id);
             return {
               discovery: discovery!,
               screenX: item.x,
               screenY: item.y,
               visible: true
             };
          }).filter(item => item.discovery);
          setProjectedDiscoveries(fullList);
        }}
      />

      <EditorialAnnotations
        projectedDiscoveries={projectedDiscoveries}
        activeDiscovery={activeDiscovery}
        onSelectDiscovery={setActiveDiscovery}
        onCloseDiscovery={() => setActiveDiscovery(null)}
        onStepToDiscovery={(discovery) => {
          setActiveDiscovery(null);
        }}
      />

      {/* Navigation Prompts */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8">
         <div className="flex justify-between items-center w-full max-w-4xl">
            {prevLandmark ? (
              <button 
                onClick={handleStepBackward}
                className="pointer-events-auto text-[#C5A059] font-mono text-xs tracking-widest hover:text-white transition-colors"
                data-testid="step-backward"
              >
                ← RETURN TO {prevLandmark.name.toUpperCase()}
              </button>
            ) : <div />}
            
            {nextLandmark ? (
              <button 
                onClick={handleStepForward}
                className="pointer-events-auto text-[#C5A059] font-mono text-xs tracking-widest hover:text-white transition-colors"
                data-testid="step-forward"
              >
                {getPromptForLandmark(nextLandmark.id)}
              </button>
            ) : <div />}
         </div>
      </div>

      <MinimalHUD
        onToggleMap={() => setIsMapOpen(!isMapOpen)}
        locationLabel={currentLandmark.name.toUpperCase()}
      />

      <DiegeticNauticalMap
        isOpen={isMapOpen}
        currentProgress={splineProgress}
        onSelectLandmark={handleSelectLandmark}
        onClose={() => setIsMapOpen(false)}
      />

    </main>
  );
}
