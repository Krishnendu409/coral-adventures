"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function JettyScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sceneRef} 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-marine-deep text-alabaster select-none"
    >
      {/* Background Jetty & Pier Photograph */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/coral_jetty_pier.png"
          alt="Coral Adventures Marina Jetty & Expedition Pier"
          fill
          priority
          quality={92}
          className="object-cover scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Warm Wooden Marina Lighting Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/95 via-marine-deep/30 to-marine-deep/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/40 to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* Main Boarding Content Stage */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 py-24 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Top Metadata */}
        <div className="pt-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-alabaster/90 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral-sun" />
            <span>ACT 05 · THE EXPEDITION JETTY</span>
          </div>
          <span className="text-coral-sun font-semibold">MALPE MARINA DOCK · BERTH 01</span>
        </div>

        {/* Center Display Typography */}
        <div className="my-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-sun/20 border border-coral-sun/40 text-coral-sun text-[10px] font-mono tracking-[0.2em] uppercase font-bold mb-6">
            EMBARKATION SEQUENCE
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-alabaster drop-shadow-xl">
            STEP<br />
            <span className="text-coral-sun font-normal">
              ABOARD.
            </span>
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-coral-sun shrink-0" />
            <p className="font-serif text-lg sm:text-xl text-alabaster/90 italic font-light">
              The water spray settles. The catamaran is secured at the pier.
            </p>
          </div>

          <p className="mt-4 font-sans text-xs sm:text-sm md:text-base text-alabaster/85 font-light leading-relaxed max-w-xl">
            Cross the teak gangway onto the main deck. Uniformed expedition crew provide chilled towels, welcome refreshments, and your navigation orientation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] font-mono text-alabaster/70 uppercase tracking-[0.2em]">
            <span>BERTH 01</span>
            <span>·</span>
            <span>VESSEL READY</span>
            <span>·</span>
            <span>CREW AT STATIONS</span>
          </div>
        </div>

        {/* Bottom Progression Indicator */}
        <div className="pb-8 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-coral-sun uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-ping" />
            CROSSING THE GANGWAY
          </span>
          <span>SCROLL TO EXPLORE THE VESSEL</span>
        </div>

      </div>
    </section>
  );
}
