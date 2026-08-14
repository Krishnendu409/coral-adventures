"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function SunsetScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Radiant Golden Hour Sunset Deck Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_golden_hour_deck.png"
          alt="Golden Hour Sunset Sailing on the Arabian Sea"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Golden Amber Sunset Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-coral-orange/20 to-marine-deep/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/30 to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
            <span>ACT 10 · GOLDEN HOUR SPRINT</span>
          </div>
          <span className="text-coral-sun font-semibold">18:15 HRS · SUNSET AZIMUTH 262°</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            SURFACE BREAKTHROUGH
          </div>

          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.88] tracking-tight text-alabaster drop-shadow-xl">
            CHASE<br />
            <span className="text-coral-sun font-normal">
              THE LIGHT.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              Breaking the surface into liquid gold. The sun sinks over the Arabian horizon.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            The sky ignites in amber, vermilion, and rose. Handcrafted cocktails are served on the upper deck as the vessel turns gently into the sunset breeze.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>18:15 GOLDEN HOUR</span>
            <span>·</span>
            <span>BEARING 262° W</span>
            <span>·</span>
            <span>MATCH CUT TRANSITION IMMINENT</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-orange uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-orange animate-pulse" />
            SUN ORB CONTRACTS INTO CANDLE FLAME
          </span>
          <span>SCROLL TO DINE UNDER OPEN SKY</span>
        </div>

      </div>
    </section>
  );
}
