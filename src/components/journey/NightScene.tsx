"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function NightScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-espresso text-alabaster select-none"
    >
      {/* Background Midnight Sapphire Ocean Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/night_sapphire.jpg"
          alt="Midnight Sapphire Sky and Starlight over the Arabian Sea"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Deep Midnight Blue Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/98 via-marine-deep/40 to-marine-espresso/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-marine-deep/30 to-marine-espresso/90 pointer-events-none" />
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
            <span>ACT 12 · MIDNIGHT CELESTIAL</span>
          </div>
          <span className="text-coral-sun font-semibold">22:00 HRS · CELESTIAL STARGAZING</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            MATCH CUT: CANDLE FLAME → CELESTIAL STAR
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            NIGHT BELONGS<br />
            <span className="text-coral-water font-normal">
              TO THE SEA.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-alabaster/90 italic font-light">
              Just horizon.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Zero light pollution. The Arabian Sea mirrors a million distant galaxies while bioluminescent plankton glow in the catamaran's gentle wake.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>22:00 MIDNIGHT</span>
            <span>·</span>
            <span>ST. MARY'S 4 NM ASTERN</span>
            <span>·</span>
            <span>SILENCE & STARS</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
            MOONLIGHT REFLECTION STRETCHES TO CONCIERGE
          </span>
          <span>SCROLL TO RESERVE YOUR PRIVATE CHARTER</span>
        </div>

      </div>
    </section>
  );
}
