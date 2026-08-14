"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { WAYPOINTS } from "@/lib/expeditionData";

export function DepartureScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Vast Open Ocean Horizon Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/hero_ocean.jpg"
          alt="Vast Open Arabian Sea Horizon and Catamaran Wake"
          fill
          priority
          quality={92}
          className="object-cover scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Open Ocean Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-transparent to-marine-deep/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/30 to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Waypoint */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-water animate-ping" />
            <span>ACT 07 · LEAVING THE SHORE</span>
          </div>
          <span className="text-coral-water font-semibold">MALPE COASTLINE RECEDING</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-water/20 border border-coral-water/40 text-coral-water text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            TRANSIT TO DEEP WATER
          </div>

          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.88] tracking-tight text-alabaster drop-shadow-xl">
            OPEN<br />
            <span className="text-coral-water font-normal">
              SEA.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              The harbor disappears behind twin white wake lines.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Civilization softens into a distant emerald ribbon. You are surrounded by the boundless expanse of the Arabian Sea, cruising at 18 knots toward the volcanic islands.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>SPEED: 18.4 KNOTS</span>
            <span>·</span>
            <span>BEARING: 284° WNW</span>
            <span>·</span>
            <span>DEPTH: 24 FATHOMS</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-water uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-water animate-pulse" />
            APPROACHING BASALT ARCHIPELAGO
          </span>
          <span>SCROLL TO VIEW NAUTICAL ROUTE</span>
        </div>

      </div>
    </section>
  );
}
