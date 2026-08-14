"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VESSEL_SPECS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ActThreeVessel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vesselPhotoRef = useRef<HTMLDivElement>(null);
  const vesselCardRef = useRef<HTMLDivElement>(null);
  const waterlinePlungeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !vesselPhotoRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([vesselCardRef.current], { opacity: 1, y: 0 });
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

    // 1. Link 05: Camera tracks from wake into catamaran (0.0 -> 0.4)
    tl.fromTo(vesselPhotoRef.current, 
      { scale: 1.15, yPercent: 5 }, 
      { scale: 1.0, yPercent: 0, duration: 0.5, ease: "none" }, 
      0
    )
    .fromTo(vesselCardRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
      0.1
    );

    // 2. Link 06: Waterline ascent preparing for underwater descent (0.75 -> 1.0)
    tl.to(vesselCardRef.current, { y: -25, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.75)
      .to(vesselPhotoRef.current, { scale: 1.08, duration: 0.3, ease: "none" }, 0.75)
      .fromTo(waterlinePlungeRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.3, ease: "power2.inOut" },
        0.75
      );

  }, { scope: containerRef });

  return (
    <section 
      id="vessel" 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-marine-espresso text-marine-espresso select-none flex flex-col justify-center"
    >
      {/* 1. Media Layer with Contained Overflow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div 
          ref={vesselPhotoRef} 
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image
            src="/images/vessel_catamaran.jpg"
            alt="Coral Adventures Twin-Hull Luxury Catamaran Vessel"
            fill
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/70 via-transparent to-marine-espresso/25" />
        </div>
      </div>

      {/* 2. Editorial Content Layer in Safe Zone */}
      <div className="relative z-10 editorial-grid w-full pt-24 sm:pt-28 pb-12 sm:pb-16 items-center pointer-events-none">
        
        {/* Floating Luxury Vessel Editorial Card */}
        <div 
          ref={vesselCardRef}
          className="col-span-12 lg:col-span-10 lg:col-start-2 bg-alabaster/95 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-sand/80 shadow-[0_16px_40px_rgba(18,24,31,0.12)] pointer-events-auto opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Left: Headline & Description */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-coral-accent" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-marine-espresso/70 font-semibold">
                  03 / THE INSTRUMENT OF EXPLORATION
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-marine-espresso leading-[0.92] tracking-tight">
                BUILT<br />
                TO GO<br />
                FURTHER.
              </h2>
              
              <div className="w-12 sm:w-14 h-[1.5px] bg-champagne my-3 sm:my-3.5" />
              
              <p className="font-sans text-xs sm:text-sm md:text-base text-marine-espresso/85 max-w-md leading-relaxed font-light">
                An architecturally engineered twin-hull catamaran designed for open-sea stability, silent passage, and complete 360° panoramic immersion in the Arabian Sea.
              </p>

              <div className="mt-3.5 flex items-center gap-3 text-[9px] sm:text-[10px] font-mono text-marine-espresso/60 uppercase tracking-[0.18em]">
                <span>{VESSEL_SPECS.type}</span>
                <span className="w-1 h-1 rounded-full bg-sand" />
                <span>MALPE REGISTRY</span>
              </div>
            </div>

            {/* Right: Hairline Specifications */}
            <div className="md:col-span-6 flex flex-col gap-3.5 border-t md:border-t-0 md:border-l border-sand pt-5 md:pt-0 md:pl-7">
              
              {/* Spec 1: Length */}
              <div className="flex flex-col border-b border-sand pb-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-marine-espresso tracking-tight">{VESSEL_SPECS.length}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-coral-accent uppercase tracking-widest font-semibold">85 FEET</span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-marine-espresso/65 mt-0.5">
                  OVERALL LENGTH
                </span>
              </div>

              {/* Spec 2: Beam */}
              <div className="flex flex-col border-b border-sand pb-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-marine-espresso tracking-tight">{VESSEL_SPECS.beam}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-coral-accent uppercase tracking-widest font-semibold">TWIN HULL</span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-marine-espresso/65 mt-0.5">
                  BEAM (EXCEPTIONAL HIGH-SEAS STABILITY)
                </span>
              </div>

              {/* Spec 3: Capacity */}
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-marine-espresso tracking-tight">{VESSEL_SPECS.capacity}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-coral-accent uppercase tracking-widest font-semibold">GUESTS</span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-marine-espresso/65 mt-0.5">
                  EXPEDITION PASSENGER CAPACITY
                </span>
              </div>

              <div className="pt-1.5">
                <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.2em] text-marine-espresso/60 uppercase block">
                  {VESSEL_SPECS.decks.join(" · ")}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 3. Link 06: Waterline Descent Transition Overlay */}
      <div 
        ref={waterlinePlungeRef}
        className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#0D2B45] via-[#0D2B45]/90 to-transparent flex flex-col justify-end p-8 text-center"
        style={{ transform: "translateY(100%)" }}
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-alabaster/80 font-semibold mb-4">
          DESCENDING BENEATH THE SURFACE
        </span>
      </div>
    </section>
  );
}
