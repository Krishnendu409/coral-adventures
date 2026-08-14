"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { WAYPOINTS } from "@/lib/expeditionData";

export function BeachScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Beach Promenade Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_beach_promenade.png"
          alt="Malpe Beach Promenade, Coconut Palms and Golden Shore"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Sunlit Coastal Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-marine-deep/20 to-marine-deep/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/80 via-transparent to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Center Stage: The Landmark Statement */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Waypoint Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun" />
            <span>ACT 02 · THE LIVING BEACH</span>
          </div>
          <span className="text-coral-sun font-semibold">MALPE · KARNATAKA</span>
        </div>

        {/* Hero Display Typography */}
        <div className="my-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            SHORELINE TRANSITION
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            THE COAST<br />
            IS ONLY THE<br />
            <span className="text-coral-sun font-normal">
              BEGINNING.
            </span>
          </h2>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 max-w-2xl">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-sans text-xs sm:text-sm md:text-base text-alabaster/90 font-light leading-relaxed">
              Pale sands, rustling tropical palms, and warm ocean breeze. The shoreline marks where ordinary travel ends, and true marine expedition starts.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>MALPE PROMENADE</span>
            <span>·</span>
            <span>WATER TEMPERATURE 28°C</span>
            <span>·</span>
            <span>{WAYPOINTS.malpeHarbor.coords}</span>
          </div>
        </div>

        {/* Bottom Forward Progression Prompt */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
            WALKING TOWARDS WATERLINE
          </span>
          <span>SCROLL TO ENTER THE WATER</span>
        </div>

      </div>
    </section>
  );
}
