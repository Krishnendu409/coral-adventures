"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    id: "sunset",
    time: "17:30 · GOLDEN HOUR",
    tag: "05 / CHASE THE LIGHT",
    headline: "CHASE THE LIGHT.",
    subline: "SOME JOURNEYS ARE MEASURED IN HOURS. OTHERS IN MOMENTS.",
    desc: "As the sun dips below the Arabian Sea, the catamaran powers toward the glowing western horizon. A radiant transition where sky and water dissolve into liquid gold.",
  },
  {
    id: "dinner",
    time: "19:30 · COASTAL GASTRONOMY",
    tag: "06 / DINNER WITH NO WALLS",
    headline: "STAY OUT A LITTLE LONGER.",
    subline: "DINNER, WITH NO WALLS.",
    desc: "A bespoke culinary voyage celebrating coastal Karnataka delicacies, served on open teak decks under twilight skies. Private hospitality in the middle of the Arabian Sea.",
  },
  {
    id: "night",
    time: "21:30 · OPEN SEA UNDER STARS",
    tag: "07 / THE DEEP HORIZON",
    headline: "NIGHT BELONGS TO THE SEA.",
    subline: "NO ROAD AHEAD. JUST HORIZON.",
    desc: "The tempo shifts. Deep sapphire waters reflect moonlight and distant constellations. Ambient ocean acoustics, curated spirits, and the calm expanse of an untamed coastline.",
  }
];

export function ActFourTime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const candleFlameRef = useRef<HTMLDivElement>(null);
  const starPointRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !stagesRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".time-stage", { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.8,
      }
    });

    // 1. Link 08: Sun Orb -> Candle Match Cut (0.0 -> 0.45)
    tl.to(".layer-sunset", { scale: 1.08, duration: 0.45, ease: "none" }, 0)
      .fromTo(candleFlameRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }, 
        0.35
      )
      .to(".layer-sunset", { opacity: 0, duration: 0.35, ease: "power1.inOut" }, 0.4)
      .fromTo(".layer-dinner", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1.0, duration: 0.4, ease: "none" }, 0.4);

    // 2. Link 09: Candle Flame -> Star Match Cut -> Midnight Sapphire (0.5 -> 0.9)
    tl.to(candleFlameRef.current, { scale: 2.5, opacity: 0, duration: 0.25, ease: "power2.in" }, 0.65)
      .fromTo(starPointRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.7
      )
      .to(".layer-dinner", { opacity: 0, duration: 0.35, ease: "power1.inOut" }, 0.72)
      .fromTo(".layer-night", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1.0, duration: 0.4, ease: "none" }, 0.72)
      .to(starPointRef.current, { scale: 0.6, opacity: 0.8, duration: 0.2 }, 0.85);

    // 3. Editorial Text Stage Transitions
    const stageElements = gsap.utils.toArray<HTMLElement>(".time-stage");
    stageElements.forEach((el, index) => {
      if (index === 0) {
        tl.to(el, { opacity: 0, y: -25, duration: 0.3 }, 0.35);
      } else if (index === 1) {
        tl.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.45)
          .to(el, { opacity: 0, y: -25, duration: 0.3, ease: "power2.in" }, 0.7);
      } else if (index === 2) {
        tl.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.78);
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      id="experiences" 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-marine-deep text-alabaster select-none"
    >
      {/* 1. Dedicated Environmental Photographic Layers (Overflow contained in media layer) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        
        {/* Layer 3: Deep Sapphire Nightfall under stars */}
        <div className="layer-night absolute inset-0 w-full h-full bg-marine-deep">
          <Image
            src="/images/night_sapphire.jpg"
            alt="Deep Sapphire Midnight Arabian Sea Under Stars"
            fill
            quality={90}
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/40 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/80 via-transparent to-marine-deep/50" />
        </div>
        
        {/* Layer 2: Candlelit Dining on Yacht Teak Deck */}
        <div className="layer-dinner absolute inset-0 w-full h-full bg-[#1A140F]">
          <Image
            src="/images/dining_deck.jpg"
            alt="Candlelit Dining Table Set on Yacht Teak Deck"
            fill
            quality={90}
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A140F]/90 via-[#1A140F]/45 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A140F]/75 via-transparent to-[#1A140F]/40" />
        </div>
        
        {/* Layer 1: Sunlit Golden Hour / Sunset Sailing */}
        <div className="layer-sunset absolute inset-0 w-full h-full bg-marine-espresso">
          <Image
            src="/images/sunset_catamaran.jpg"
            alt="Catamaran Yacht Cruising Toward Golden Sunset Horizon"
            fill
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/80 via-marine-espresso/35 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/70 via-transparent to-marine-espresso/30" />
        </div>

      </div>

      {/* Match Cut 1: Candle Flame Glow Dot */}
      <div 
        ref={candleFlameRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none opacity-0"
      >
        <div className="w-6 h-6 rounded-full bg-[#FFAA44] blur-[4px] shadow-[0_0_24px_#FF8800]" />
      </div>

      {/* Match Cut 2: Celestial Star Point */}
      <div 
        ref={starPointRef} 
        className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none opacity-0"
      >
        <div className="w-3 h-3 rounded-full bg-[#FFFFFF] blur-[1px] shadow-[0_0_16px_#C5A880]" />
      </div>

      {/* 2. Editorial Content Stages (Safe Content Area with Navigation Clearance) */}
      <div 
        ref={stagesRef} 
        className="relative z-10 w-full min-h-[100dvh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-center pointer-events-none"
      >
        <div className="editorial-grid items-center w-full">
          {STAGES.map((stage, index) => {
            return (
              <div 
                key={stage.id} 
                className={cn(
                  "time-stage col-span-12 pointer-events-auto transition-opacity duration-300",
                  index === 0 ? "relative opacity-100" : "absolute inset-x-0 opacity-0 pointer-events-none"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                  
                  {/* Left Column: Timestamp & Telemetry (Columns 1-4) */}
                  <div className="md:col-span-4 flex flex-col justify-center border-l-2 border-champagne/60 pl-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-coral-accent" />
                      <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-alabaster">
                        {stage.time}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-alabaster/70">
                      {stage.tag}
                    </span>
                  </div>

                  {/* Right Column: Editorial Headline, Subtitle & Prose (Columns 5-12) */}
                  <div className="md:col-span-8 flex flex-col justify-center">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.92] tracking-tight text-alabaster drop-shadow-sm">
                      {stage.headline}
                    </h2>
                    
                    {stage.subline && (
                      <p className="font-serif text-lg sm:text-xl md:text-2xl italic mt-2.5 sm:mt-3 font-normal text-champagne-light drop-shadow-sm">
                        {stage.subline}
                      </p>
                    )}

                    <div className="w-14 sm:w-16 h-[1.5px] bg-champagne my-3.5 sm:my-4" />
                    
                    <p className="font-sans text-xs sm:text-sm md:text-base font-light max-w-xl leading-relaxed text-alabaster/90 drop-shadow-xs">
                      {stage.desc}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
