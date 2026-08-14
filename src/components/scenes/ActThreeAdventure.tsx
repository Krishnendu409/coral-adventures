"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ActThreeAdventure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marinePhotoRef = useRef<HTMLDivElement>(null);
  const underwaterTextRef = useRef<HTMLDivElement>(null);
  const surfaceBreakRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !marinePhotoRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([underwaterTextRef.current], { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: 0.7,
      }
    });

    // 1. Link 06: Underwater immersion camera drift & typography entrance (0.0 -> 0.5)
    tl.fromTo(marinePhotoRef.current, 
      { scale: 1.12, yPercent: 5 }, 
      { scale: 1.0, yPercent: 0, duration: 0.5, ease: "none" }, 
      0
    )
    .fromTo(underwaterTextRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.15
    );

    // 2. Link 07: Camera rises through the water and breaks the surface (0.6 -> 1.0)
    tl.to(underwaterTextRef.current, { y: -30, opacity: 0, duration: 0.25, ease: "power2.in" }, 0.6)
      .to(marinePhotoRef.current, { scale: 1.15, yPercent: -10, duration: 0.4, ease: "none" }, 0.6)
      .fromTo(surfaceBreakRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1.1, duration: 0.35, ease: "power2.inOut" },
        0.7
      );

  }, { scope: containerRef });

  return (
    <section 
      id="underwater"
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-[#071E28] text-alabaster select-none flex flex-col justify-center"
    >
      {/* 1. Media Layer with Contained Overflow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div ref={marinePhotoRef} className="absolute inset-0 w-full h-full origin-center">
          <Image
            src="/images/underwater_marine.jpg"
            alt="Crystal Clear Arabian Sea Underwater Coral Reef with Sunbeams"
            fill
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E28]/85 via-[#071E28]/40 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E28]/80 via-transparent to-[#071E28]/35" />
        </div>
      </div>

      {/* 2. Editorial Content Layer (Safe Area with Navigation Clearance) */}
      <div className="relative z-10 editorial-grid w-full pt-24 sm:pt-28 pb-12 sm:pb-16 items-center pointer-events-none">
        <div 
          ref={underwaterTextRef}
          className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-center pointer-events-auto opacity-0"
        >
          
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral-accent animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-champagne-light uppercase font-semibold">
              04 / MARINE EXPEDITION · UNDERWATER REALM
            </span>
          </div>

          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-alabaster leading-[0.92] tracking-tight drop-shadow-sm">
              ANOTHER<br />
              WORLD<br />
              BENEATH.
            </h2>
          </div>

          <div className="w-14 sm:w-16 h-[1.5px] bg-champagne-light my-4 sm:my-5" />

          <div>
            <p className="font-sans text-xs sm:text-sm md:text-base text-alabaster/90 max-w-lg leading-relaxed font-light drop-shadow-xs">
              Sunlight piercing crystal shallows. Explore the rich underwater marine biodiversity, vibrant coral formations, and hidden aquatic ecosystems along the St. Mary’s volcanic shelf.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-5 text-[9px] sm:text-[10px] md:text-[11px] font-mono text-alabaster/75 uppercase tracking-[0.18em]">
            <span>SNORKELING & GUIDED DIVES</span>
            <span className="w-1 h-1 rounded-full bg-champagne-light" />
            <span>PRISTINE VOLCANIC REEF</span>
            <span className="w-1 h-1 rounded-full bg-champagne-light" />
            <span>ARABIAN SEA</span>
          </div>

        </div>
      </div>

      {/* 3. Link 07: Surface Breakthrough Transition Ripple Layer */}
      <div 
        ref={surfaceBreakRef}
        className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-transparent via-[#E07A5F]/20 to-alabaster/90 opacity-0 flex flex-col justify-center items-center text-center"
      >
        <span className="text-xs font-mono uppercase tracking-[0.35em] text-marine-espresso font-semibold bg-alabaster/95 px-6 py-2 border border-sand shadow-md">
          BREAKING THE SURFACE · INTO THE LIGHT
        </span>
      </div>
    </section>
  );
}
