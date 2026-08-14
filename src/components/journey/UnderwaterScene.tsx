"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function UnderwaterScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Deep Sea Marine Reef Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/underwater_marine.jpg"
          alt="Sunlit Volcanic Coral Reef and Marine Life"
          fill
          priority
          quality={92}
          className="object-cover scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Shimmering Underwater Caustic Rays & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-coral-water/20 to-marine-deep/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-coral-water/30 via-transparent to-marine-deep/90 pointer-events-none" />
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-water animate-ping" />
            <span>ACT 09 · SUB-SURFACE IMMERSION</span>
          </div>
          <span className="text-coral-water font-semibold">DEPTH: 8 METERS · CLARITY: 18M</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-water/20 border border-coral-water/40 text-coral-water text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            THE UNDERWATER REALM
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            BELOW THE<br />
            <span className="text-coral-water font-normal">
              SURFACE.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-water shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              Sunbeams penetrate the turquoise swell into ancient volcanic coral gardens.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Surrounded by schooling jacks, sea turtles, and kaleidoscopic reef fish. The world above becomes a shimmering canopy of light as you drift weightlessly.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>CORAL REEF DIVE</span>
            <span>·</span>
            <span>WATER VISIBILITY 18M</span>
            <span>·</span>
            <span>TEMPERATURE 28°C</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
            ASCENDING TO SURFACE BREAKTHROUGH
          </span>
          <span>SCROLL TO CHASE THE SUNSET</span>
        </div>

      </div>
    </section>
  );
}
