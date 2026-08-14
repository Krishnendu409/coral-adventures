"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { WAYPOINTS } from "@/lib/expeditionData";

export function ArrivalScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Wide Environmental Layer: Welcome Pavilion & Arrival Plaza */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_arrival_pavilion.png"
          alt="Coral Adventures Arrival Pavilion & Welcome Plaza"
          fill
          priority
          quality={92}
          className="object-cover scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Cinematic Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/90 via-marine-deep/30 to-marine-deep/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-marine-deep/20 to-marine-deep/80 pointer-events-none" />
      </div>

      {/* Midground Environmental Brand Signage Landmark */}
      <div className="absolute top-28 sm:top-32 left-6 sm:left-12 z-10 pointer-events-none">
        <div className="flex items-center gap-3.5 bg-marine-espresso/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-coral-sun/30 shadow-2xl">
          <div className="relative w-9 h-9">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-serif text-base tracking-wide text-alabaster font-light">
              CORAL WATERFRONT
            </div>
            <div className="text-[8.5px] font-mono tracking-[0.25em] text-coral-sun uppercase font-bold">
              EXPEDITION TERMINAL · PIER 01
            </div>
          </div>
        </div>
      </div>

      {/* Main Narrative Emotional Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-end min-h-[100dvh]">
        <div className="max-w-3xl mb-12 sm:mb-16">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-coral-sun animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-coral-sun uppercase font-bold">
              ACT 01 · YOU HAVE ARRIVED
            </span>
            <span className="text-alabaster/40 font-mono">/</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-alabaster/70 uppercase">
              {WAYPOINTS.malpeHarbor.coords}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-lg">
            WELCOME TO<br />
            <span className="text-coral-sun font-normal">
              CORAL ADVENTURES.
            </span>
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-alabaster/90 italic font-light">
              Come with us.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/80 font-light leading-relaxed max-w-xl">
            Step through the palm canopy into the coastal welcome pavilion. The morning sea breeze is rising over Malpe Harbor, and the expedition crew awaits.
          </p>

          <div className="mt-8 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-coral-sun uppercase">
            <span>SCROLL FORWARD TO WALK TO THE BEACH</span>
            <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>

        </div>
      </div>

      {/* Foreground Tropical Palm Parallax Fronds (Left & Right Framing) */}
      <div className="absolute -bottom-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none z-30 opacity-40 mix-blend-screen">
        <div className="w-full h-full bg-gradient-to-tr from-coral-palm/40 to-transparent blur-xl" />
      </div>
    </section>
  );
}
