"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function WaterScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Water Surface Media */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/shoreline_foam.jpg"
          alt="Crystal Clear Turquoise Water Level Shallows"
          fill
          priority
          quality={92}
          className="object-cover scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Shimmering Aqua & Sunlit Caustic Lighting Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep via-coral-water/20 to-marine-deep/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-coral-water/30 via-transparent to-marine-deep/80 pointer-events-none" />
      </div>

      {/* Narrative Progression Content */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-water" />
            <span>ACT 03 · WATER LEVEL</span>
          </div>
          <span className="text-coral-water font-semibold">ARABIAN SEA SHALLOWS</span>
        </div>

        {/* Center Typography & Environmental Beat */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-water/20 border border-coral-water/40 text-coral-water text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            IMMERSION IN PROGRESS
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            ENTER<br />
            <span className="text-coral-water font-normal">
              THE WATER.
            </span>
          </h2>

          {/* Stepped Water Progression Breadcrumbs */}
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em]">
            <span className="text-alabaster/50">DRY SAND</span>
            <span className="text-coral-sun">→</span>
            <span className="text-alabaster/70">WET SAND</span>
            <span className="text-coral-sun">→</span>
            <span className="text-coral-water">ORGANIC FOAM</span>
            <span className="text-coral-sun">→</span>
            <span className="text-coral-sun font-bold underline decoration-2 underline-offset-4">TURQUOISE SHALLOWS</span>
          </div>

          <p className="mt-6 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Cool, crystal turquoise water surrounds your feet. Sunbeams refract across the ripple caustics, and the open sea stretches infinitely to the horizon.
          </p>
        </div>

        {/* Bottom Progression Indicator */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-water uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-water animate-ping" />
            ENTERING ACTIVE MARINE REALM
          </span>
          <span>SCROLL TO DISCOVER ACTIVITIES</span>
        </div>

      </div>
    </section>
  );
}
