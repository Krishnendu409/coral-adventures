"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function VesselScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Flagship Catamaran Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/vessel_catamaran.jpg"
          alt="Coral Adventures 25.90M Twin-Hull Expedition Catamaran"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Deep Marine Contrast Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-marine-deep/20 to-marine-deep/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/30 to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Spatial 3D Annotations Anchored in the Environment */}
      <div className="hidden lg:block absolute top-1/4 right-16 z-20 pointer-events-none">
        <div className="flex flex-col gap-4 max-w-xs">
          
          <div className="flex items-center gap-3 bg-marine-espresso/80 backdrop-blur-md p-3.5 rounded-lg border border-coral-sun/30 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-coral-sun animate-ping" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-coral-sun uppercase font-bold">25.90M / 8.00M</div>
              <div className="font-serif text-sm text-alabaster">Twin-Hull Hydrodynamic Beam</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-marine-espresso/80 backdrop-blur-md p-3.5 rounded-lg border border-coral-sun/30 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-coral-orange" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-coral-orange uppercase font-bold">170 PASSENGERS</div>
              <div className="font-serif text-sm text-alabaster">Open Sky Deck & Teak Lounge</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-marine-espresso/80 backdrop-blur-md p-3.5 rounded-lg border border-coral-sun/30 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-coral-water" />
            <div>
              <div className="text-[10px] font-mono tracking-widest text-coral-water uppercase font-bold">STABILITY MATRIX</div>
              <div className="font-serif text-sm text-alabaster">Zero-Roll Shallow Draft Hull</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Narrative Display Typography */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun" />
            <span>ACT 06 · THE FLAGSHIP CATAMARAN</span>
          </div>
          <span className="text-coral-sun font-semibold">CUSTOM MARINE ARCHITECTURE</span>
        </div>

        {/* Center Stage Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            ENGINEERED FOR THE ARABIAN SEA
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            BUILT TO GO<br />
            <span className="text-coral-sun font-normal">
              FURTHER.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              Wide-stance twin hulls engineered for ultra-smooth gliding across deep offshore swells.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Explore 360-degree panoramic viewing from the upper sun deck, relax in the shaded saloon lounge, or take in the bow spray as twin diesel power plants engage.
          </p>

          {/* Mobile Spatial Specifications Pill List */}
          <div className="lg:hidden mt-6 flex flex-wrap gap-2 text-[10px] font-mono text-alabaster/80 uppercase">
            <span className="px-3 py-1.5 rounded-full bg-marine-espresso/70 border border-coral-sun/30 text-coral-sun">
              25.90M LENGTH
            </span>
            <span className="px-3 py-1.5 rounded-full bg-marine-espresso/70 border border-coral-sun/30 text-coral-orange">
              8.00M BEAM
            </span>
            <span className="px-3 py-1.5 rounded-full bg-marine-espresso/70 border border-coral-sun/30 text-coral-water">
              170 GUEST CAPACITY
            </span>
          </div>
        </div>

        {/* Bottom Progression */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-ping" />
            ENGAGING TWIN ENGINES
          </span>
          <span>SCROLL TO DEPART THE HARBOR</span>
        </div>

      </div>
    </section>
  );
}
