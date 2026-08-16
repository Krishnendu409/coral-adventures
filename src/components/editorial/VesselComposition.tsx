"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VESSEL_SPECS } from "@/lib/expeditionData";
import { CatamaranCanvasHero } from "./CatamaranCanvasHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VesselComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const specCardsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  useGSAP(() => {
    if (!sectionRef.current || !pinWrapperRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop: Pinned 3D Hero Scroll Sequence
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinWrapperRef.current,
        start: "top top",
        end: "+=180%",
        scrub: 1.0,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 1,
          },
        });
      }

      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 0.85,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top+=45% top",
              end: "top+=75% top",
              scrub: 1,
            },
          }
        );
      }
    });

    // Mobile & Tablet: Unpinned Fluid Scroll
    mm.add("(max-width: 1023px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="vessel"
      className="relative w-full bg-[#0A2540] text-[#FAF6EE] overflow-visible"
    >
      {/* Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#0A2540] py-6 sm:py-8 px-6 sm:px-10 lg:px-14 select-none"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/3 right-10 lg:right-28 w-[30rem] lg:w-[42rem] h-[30rem] lg:h-[42rem] bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Telemetry Bar */}
        <div className="relative w-full z-20 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/15 pb-2.5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E06C69]" />
              <span className="font-semibold text-white/90">
                05 / THE VESSEL · 25.90M EXPEDITION CATAMARAN
              </span>
            </div>
            <div className="flex items-center gap-4 text-white/70 font-medium">
              <span className="hidden sm:inline">TWIN HULL OCEAN STABILITY</span>
              <span>MALPE PORT OF REGISTRY</span>
            </div>
          </div>
        </div>

        {/* 2. Background Watermark: 25.90 M */}
        <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-10 lg:px-14 z-0 pointer-events-none select-none overflow-hidden">
          <h2
            ref={watermarkRef}
            className="font-serif text-[20vw] sm:text-[18vw] lg:text-[16vw] text-white/5 leading-[0.75] tracking-[-0.03em] uppercase will-change-transform opacity-80"
          >
            25.90 M
          </h2>
        </div>

        {/* 3. 3D WebGL Catamaran Hero Canvas */}
        <div className="absolute inset-0 z-10">
          <CatamaranCanvasHero scrollProgressRef={scrollProgressRef} />
        </div>

        {/* 4. Left Editorial Narrative Column */}
        <div className="relative z-20 w-full my-auto flex items-center pointer-events-none">
          <div
            ref={textColRef}
            className="max-w-md sm:max-w-lg lg:max-w-xl pointer-events-auto"
          >
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF6EE] leading-[0.92] tracking-tight uppercase">
              Built to go
              <br />
              <span className="italic font-light text-[#E06C69]">further.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#FAF6EE]/80 font-light leading-relaxed max-w-md mt-4">
              An architecturally engineered 25.90M twin-hull catamaran built for open-sea stability, silent passage, and complete panoramic immersion across the Arabian Sea.
            </p>
          </div>
        </div>

        {/* 5. Editorial Caption Near Vessel */}
        <div
          ref={captionRef}
          className="absolute bottom-24 right-6 sm:right-10 lg:right-14 z-20 hidden sm:flex items-center gap-2.5 text-[9px] font-sans tracking-[0.22em] text-[#FAF6EE]/75 uppercase pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E06C69]" />
          <span>25.90M EXPEDITION CATAMARAN · TWIN HULL HYDRODYNAMICS</span>
        </div>

        {/* 6. Bottom Technical Telemetry */}
        <div
          ref={specCardsRef}
          className="relative z-20 shrink-0 w-full pt-4 border-t border-white/15 pointer-events-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <div className="p-3 bg-[#0A2540]/80 border border-white/10 backdrop-blur-xs">
              <div className="text-[8.5px] font-sans text-[#E06C69] uppercase tracking-[0.2em] font-semibold mb-0.5">
                DIMENSION OVERALL
              </div>
              <div className="font-serif text-lg sm:text-xl text-[#FAF6EE] tracking-tight">
                25.90 METERS
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                BEAM {VESSEL_SPECS.beam} · CRUISE {VESSEL_SPECS.cruisingSpeed}
              </div>
            </div>

            <div className="p-3 bg-[#0A2540]/80 border border-white/10 backdrop-blur-xs">
              <div className="text-[8.5px] font-sans text-[#0D9488] uppercase tracking-[0.2em] font-semibold mb-0.5">
                DECK ARCHITECTURE
              </div>
              <div className="font-serif text-lg sm:text-xl text-[#FAF6EE] tracking-tight">
                360° SKY LOUNGE
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                WEATHERED TEAK · {VESSEL_SPECS.capacity} GUESTS
              </div>
            </div>

            <div className="p-3 bg-[#0A2540]/80 border border-white/10 backdrop-blur-xs">
              <div className="text-[8.5px] font-sans text-white/80 uppercase tracking-[0.2em] font-semibold mb-0.5">
                PROPULSION
              </div>
              <div className="font-serif text-lg sm:text-xl text-[#FAF6EE] tracking-tight">
                ARABIAN HORIZON
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                TWIN DIESEL · 14 KNOTS
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
