"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArchivalStationeryBackground } from "./ArchivalStationeryBackground";
import { WaxedCrimsonCord } from "./WaxedCrimsonCord";
import {
  Spread01Arrival,
  Spread02Watersports,
  Spread03Catamaran,
  Spread04Onboard,
  Spread05Basalt,
  Spread06Sunset,
  Spread07Night,
  Spread08DroneFinale,
} from "./ScrapbookSpreadsRebuild";
import { AmbientSoundToggle } from "./AmbientSoundToggle";

export function BeachVisionBoardMaster() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastProgress = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
            if (Math.abs(currentProgress - lastProgress) > 0.004 || currentProgress === 0 || currentProgress === 1) {
              lastProgress = currentProgress;
              setScrollProgress(currentProgress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen selection:bg-[#0284C7] selection:text-white overflow-x-hidden font-sans bg-[#FAF6EE]">
      {/* 1. Archival Stationery Background with Bathymetric Depth Contours */}
      <ArchivalStationeryBackground scrollProgress={scrollProgress} />

      {/* 2. Refined Waxed Cord */}
      <WaxedCrimsonCord scrollProgress={scrollProgress} />

      {/* 3. Synthesized Ambient Arabian Sea Surf Sound Controller */}
      <AmbientSoundToggle />

      {/* 4. Floating Luxury Responsive Header with Perfect Padding */}
      <header className="fixed top-4 sm:top-6 left-4 right-4 sm:left-6 sm:right-6 z-50 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
        {/* Home Route Button */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-[#FAF6EE]/95 hover:bg-[#FAF6EE] text-[#0A2540] backdrop-blur-md rounded-full shadow-[0_6px_20px_rgba(10,37,64,0.12)] border border-[#0A2540]/15 text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase transition-all active:scale-95 hover:border-[#0284C7] font-semibold"
        >
          <span>←</span>
          <span className="hidden xs:inline">EDITORIAL HOME</span>
          <span className="xs:hidden">HOME</span>
        </Link>

        {/* Middle Archive Badge (Desktop / Tablet) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-6 py-2 bg-[#FAF6EE]/95 backdrop-blur-md rounded-full border border-[#0A2540]/15 shadow-[0_6px_20px_rgba(10,37,64,0.12)] font-sans text-[10.5px] text-[#0A2540]">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          <span className="font-bold tracking-[0.22em] text-[#0284C7]">EXPEDITION STORYBOARD</span>
          <span className="opacity-30">|</span>
          <span className="opacity-75 tracking-[0.16em] font-mono">MALPE · 13°21′02″ N</span>
        </div>

        {/* 3D World Journey Button */}
        <Link
          href="/journey"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-[#0A2540] hover:bg-[#071A2B] text-[#FAF6EE] rounded-full shadow-[0_6px_20px_rgba(10,37,64,0.25)] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase transition-all border border-white/20 active:scale-95 font-semibold hover:border-[#C5A059]"
        >
          <span>3D WORLD</span>
          <span>→</span>
        </Link>
      </header>

      {/* 5. Master Assembled Scrapbook Spreads with Generous Padding */}
      <main className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 z-20 pb-36 space-y-24 sm:space-y-36">
        {/* CHAPTER 01: BEACHHEAD ARRIVAL */}
        <Spread01Arrival />

        {/* CHAPTER 02: INSHORE WATERSPORTS */}
        <Spread02Watersports />

        {/* CHAPTER 03: CATAMARAN REVEAL */}
        <Spread03Catamaran />

        {/* CHAPTER 04: ONBOARD LIFE & GASTRONOMY */}
        <Spread04Onboard />

        {/* CHAPTER 05: BASALT ISLAND SANCTUARY */}
        <Spread05Basalt />

        {/* CHAPTER 06: SUNSET PAUSE */}
        <Spread06Sunset />

        {/* CHAPTER 07: NIGHT EXPLORATION */}
        <Spread07Night />

        {/* CHAPTER 08: DRONE CONSTELLATION FINALE */}
        <Spread08DroneFinale />
      </main>
    </div>
  );
}
