"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function DinnerScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Dining Theater & Teak Deck Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_dining_theatre.png"
          alt="Coral Waterfront Teak Dining Theater by Candlelight"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Intimate Candlelit Twilight Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-marine-deep/30 to-marine-deep/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/90 via-marine-deep/40 to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
            <span>ACT 11 · THEATER OF DINING</span>
          </div>
          <span className="text-coral-sun font-semibold">19:30 HRS · TEAK SALOON DECK</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            MATCH CUT: SUN ORB → CANDLE FLAME
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            DINNER, WITH<br />
            <span className="text-coral-sun font-normal">
              NO WALLS.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              Fresh coastal catch, chilled vintage wine, and warm teak underfoot.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            The gentle rhythm of ocean swell beneath the twin hulls. Fine linen, flickering candlelight, and artisanal coastal flavors prepared fresh by your private onboard culinary team.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>19:30 TWILIGHT</span>
            <span>·</span>
            <span>PRIVATE CHEF TASTING</span>
            <span>·</span>
            <span>OPEN OCEAN VIEW</span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
            CANDLE FLAME CONTRACTS INTO CELESTIAL STAR
          </span>
          <span>SCROLL FOR MIDNIGHT STARGAZING</span>
        </div>

      </div>
    </section>
  );
}
