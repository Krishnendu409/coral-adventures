"use client";

import React, { useState, useEffect } from "react";
import { STORYBOARD_FRAMES } from "@/data/storyboardData";
import { StoryboardHeader } from "@/components/storyboard/StoryboardHeader";
import { GuideBirdContinuityArc } from "@/components/storyboard/GuideBirdContinuityArc";
import { EnvironmentalColorSpectrum } from "@/components/storyboard/EnvironmentalColorSpectrum";
import { StoryFrame } from "@/components/storyboard/StoryFrame";
import { ProductionAssetMatrix } from "@/components/storyboard/ProductionAssetMatrix";
import { DirectorEpilogue } from "@/components/storyboard/DirectorEpilogue";

export default function StoryboardPage() {
  const [activeChapter, setActiveChapter] = useState(1);

  // Monitor which storyboard frame is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;

      for (let i = STORYBOARD_FRAMES.length - 1; i >= 0; i--) {
        const frame = STORYBOARD_FRAMES[i];
        const el = document.getElementById(frame.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            setActiveChapter(frame.chapter);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectChapter = (chapterNumber: number) => {
    const targetFrame = STORYBOARD_FRAMES.find((f) => f.chapter === chapterNumber);
    if (targetFrame) {
      const el = document.getElementById(targetFrame.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FAF7F0] text-[#0A2540] selection:bg-[#E05A36] selection:text-white">
      {/* 1. Master Expedition Director Header & Planning Table Dossier */}
      <StoryboardHeader
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      {/* 2. Visual Guide Bird Continuity Arc Tracker */}
      <GuideBirdContinuityArc />

      {/* 3. Diurnal Lighting & Environmental Color Spectrum */}
      <EnvironmentalColorSpectrum />

      {/* 4. The 8 Primary Cinematic Storyboard Frames */}
      <div className="relative w-full">
        {STORYBOARD_FRAMES.map((frame, index) => (
          <StoryFrame
            key={frame.id}
            frame={frame}
            isLast={index === STORYBOARD_FRAMES.length - 1}
          />
        ))}
      </div>

      {/* 5. Master Production Asset Matrix & Sourcing Blueprint */}
      <ProductionAssetMatrix />

      {/* 6. Director's Epilogue & Final Cinematic Sign-Off */}
      <DirectorEpilogue />
    </main>
  );
}
