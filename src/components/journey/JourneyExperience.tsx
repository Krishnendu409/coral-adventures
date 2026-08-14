"use client";

import React, { useState, useEffect, useRef } from "react";
import { JourneyNavigation } from "./JourneyNavigation";
import { ArrivalScene } from "./ArrivalScene";
import { BeachScene } from "./BeachScene";
import { WaterScene } from "./WaterScene";
import { ActivityScene } from "./ActivityScene";
import { JettyScene } from "./JettyScene";
import { VesselScene } from "./VesselScene";
import { DepartureScene } from "./DepartureScene";
import { ChartScene } from "./ChartScene";
import { UnderwaterScene } from "./UnderwaterScene";
import { SunsetScene } from "./SunsetScene";
import { DinnerScene } from "./DinnerScene";
import { NightScene } from "./NightScene";
import { ConciergeScene } from "./ConciergeScene";

const SCENES = [
  { id: "arrival", title: "ARRIVAL AT MALPE" },
  { id: "beach", title: "THE LIVING BEACH" },
  { id: "water", title: "WATER LEVEL" },
  { id: "activity", title: "ACTIVE WATERSPORTS" },
  { id: "jetty", title: "BOARDING JETTY" },
  { id: "vessel", title: "THE CATAMARAN" },
  { id: "departure", title: "OPEN SEA TRANSIT" },
  { id: "chart", title: "ST. MARY'S EXPEDITION" },
  { id: "underwater", title: "SUB-SURFACE DIVE" },
  { id: "sunset", title: "GOLDEN HOUR SPRINT" },
  { id: "dinner", title: "COASTAL DINING" },
  { id: "night", title: "MIDNIGHT STARGAZING" },
  { id: "concierge", title: "PRIVATE CONCIERGE" },
];

export function JourneyExperience() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sceneEls = SCENES.map((s) => document.getElementById(`scene-${s.id}`));
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = sceneEls.length - 1; i >= 0; i--) {
        const el = sceneEls[i];
        if (el) {
          const rectTop = el.offsetTop;
          if (scrollPos >= rectTop) {
            setCurrentChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJumpToChapter = (index: number) => {
    const sceneId = SCENES[index]?.id;
    if (sceneId) {
      const el = document.getElementById(`scene-${sceneId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-marine-deep min-h-screen selection:bg-coral-sun selection:text-marine-espresso">
      
      {/* Minimal Cinematic Journey HUD */}
      <JourneyNavigation
        currentChapter={currentChapter}
        totalChapters={SCENES.length}
        chapterTitle={SCENES[currentChapter]?.title || "EXPEDITION"}
        onJumpToChapter={handleJumpToChapter}
      />

      {/* ========================================================================= */}
      {/* 13 CONTINUOUS PHYSICAL SCENES OF THE CORAL ADVENTURES VIRTUAL JOURNEY     */}
      {/* ========================================================================= */}

      {/* ACT 01: ARRIVAL AT MALPE WATERFRONT PAVILION & PLAZA */}
      <div id="scene-arrival">
        <ArrivalScene />
      </div>

      {/* ACT 02: THE LIVING BEACH & PROMENADE */}
      <div id="scene-beach">
        <BeachScene />
      </div>

      {/* ACT 03: SHORELINE TO WATER LEVEL SHALLOWS */}
      <div id="scene-water">
        <WaterScene />
      </div>

      {/* ACT 04: ACTIVE MARINE WATERSPORTS REALM */}
      <div id="scene-activity">
        <ActivityScene />
      </div>

      {/* ACT 05: THE MARINA BOARDING JETTY */}
      <div id="scene-jetty">
        <JettyScene />
      </div>

      {/* ACT 06: THE 25.90M FLAGSHIP CATAMARAN */}
      <div id="scene-vessel">
        <VesselScene />
      </div>

      {/* ACT 07: LEAVING THE SHORE & OPEN SEA */}
      <div id="scene-departure">
        <DepartureScene />
      </div>

      {/* ACT 08: NAUTICAL EXPEDITION & ST. MARY'S BASALT */}
      <div id="scene-chart">
        <ChartScene />
      </div>

      {/* ACT 09: SUB-SURFACE IMMERSION & CORAL DIVE */}
      <div id="scene-underwater">
        <UnderwaterScene />
      </div>

      {/* ACT 10: GOLDEN HOUR SUNSET SPRINT */}
      <div id="scene-sunset">
        <SunsetScene />
      </div>

      {/* ACT 11: THEATER OF COASTAL DINING */}
      <div id="scene-dinner">
        <DinnerScene />
      </div>

      {/* ACT 12: MIDNIGHT SAPPHIRE & STARGAZING */}
      <div id="scene-night">
        <NightScene />
      </div>

      {/* ACT 13: THE PRIVATE CONCIERGE DESK */}
      <div id="scene-concierge">
        <ConciergeScene />
      </div>

    </div>
  );
}
