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
    <div className="relative w-full min-h-screen selection:bg-[#BE123C] selection:text-white overflow-x-hidden font-sans bg-[#FAF7F0]">
      {/* 1. Archival Stationery Background with Bathymetric Depth Contours */}
      <ArchivalStationeryBackground scrollProgress={scrollProgress} />

      {/* 2. Refined Waxed Crimson Cord */}
      <WaxedCrimsonCord scrollProgress={scrollProgress} />

      {/* 3. Synthesized Ambient Arabian Sea Surf Sound Controller */}
      <AmbientSoundToggle />

      {/* 4. Floating Luxury Responsive Header */}
      <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-4 sm:right-4 z-50 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
        {/* Home Route Button */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#FAF7F0]/95 hover:bg-[#FAF7F0] text-[#1E293B] backdrop-blur-md rounded-full shadow-[0_6px_20px_rgba(20,10,5,0.12)] border border-[#1E293B]/20 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all active:scale-95"
        >
          <span>←</span>
          <span className="font-bold hidden xs:inline">EDITORIAL HOME</span>
          <span className="font-bold xs:hidden">HOME</span>
        </Link>

        {/* Middle Archive Badge (Desktop / Tablet) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-5 py-2 bg-[#FAF7F0]/95 backdrop-blur-md rounded-full border border-[#1E293B]/20 shadow-[0_6px_20px_rgba(20,10,5,0.12)] font-mono text-[11px] text-[#1E293B]">
          <span className="w-2 h-2 rounded-full bg-[#BE123C] animate-pulse" />
          <span className="font-bold tracking-[0.22em] text-[#9F1239]">EXPEDITION SCRAPBOOK</span>
          <span className="opacity-30">|</span>
          <span className="opacity-75 tracking-[0.16em]">MALPE · 13°21′02″ N</span>
        </div>

        {/* 3D World Journey Button */}
        <Link
          href="/journey"
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 bg-[#1E293B] hover:bg-[#0F172A] text-[#FAF7F0] rounded-full shadow-[0_6px_20px_rgba(15,23,42,0.25)] text-[10px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all border border-[#FAF7F0]/20 active:scale-95 font-bold"
        >
          <span>3D WORLD</span>
          <span>→</span>
        </Link>
      </header>

      {/* 5. Master Assembled Scrapbook Spreads */}
      <main className="relative w-full max-w-7xl mx-auto px-2.5 sm:px-6 pt-20 sm:pt-24 z-20 pb-36 space-y-24 sm:space-y-36">
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

        {/* CHAPTER 08: DRONE FINALE */}
        <Spread08DroneFinale />

        {/* Final Navigation & Return */}
        <div className="relative z-20 text-center pt-8 max-w-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 text-xs font-mono">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-[#FAF7F0] hover:bg-[#F5EBE1] border border-[#1E293B]/20 text-[#1E293B] rounded-full transition-all tracking-[0.18em] shadow-sm font-semibold active:scale-95"
            >
              ← RETURN TO EDITORIAL HOME
            </Link>
            <Link
              href="/journey"
              className="w-full sm:w-auto px-6 py-3 bg-[#BE123C] hover:bg-[#9F1239] text-white rounded-full transition-all tracking-[0.18em] shadow-[0_10px_25px_rgba(190,18,60,0.35)] font-bold active:scale-95"
            >
              EXPLORE 3D DIGITAL TWIN →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
