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

    // Pinned ScrollTrigger for the 3-Act Catamaran Hero Reveal (Zero React DOM Rerenders on Scroll)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: pinWrapperRef.current,
      start: "top top",
      end: "+=220%",
      scrub: 1.0,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // Background watermark subtle parallax (moves slower than the ship to create spatial depth)
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: -50,
        opacity: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
        },
      });
    }

    // Single subtle editorial caption reveal during Act III (Hero Phase)
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
            start: "top+=55% top",
            end: "top+=85% top",
            scrub: 1,
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="vessel"
      className="relative w-full bg-[#0A2540] text-[#FAF6EE] overflow-visible"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#0A2540] py-6 sm:py-8 px-4 sm:px-8 lg:px-14 select-none"
      >
        {/* Soft Turquoise / Deep Teal Atmospheric Radial Glow Behind the Right-Biased Vessel */}
        <div className="absolute top-1/3 right-10 lg:right-28 w-[34rem] lg:w-[46rem] h-[34rem] lg:h-[46rem] bg-[#0D9488]/18 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0284C7]/08 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Telemetry Bar */}
        <div className="relative w-full z-20 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/15 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="font-bold text-[#F59E0B]">
                05 / THE VESSEL · 25.90M EXPEDITION CATAMARAN
              </span>
            </div>
            <div className="flex items-center gap-4 text-white/70 font-semibold">
              <span className="hidden sm:inline">TWIN HULL OCEAN STABILITY</span>
              <span className="text-[#38BDF8]">MALPE PORT OF REGISTRY</span>
            </div>
          </div>
        </div>

        {/* 2. Colossal Background Watermark: 25.90 M (Spatial Parallax Layer) */}
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 lg:px-14 z-0 pointer-events-none select-none overflow-hidden">
          <h2
            ref={watermarkRef}
            className="font-serif text-[22vw] sm:text-[19vw] lg:text-[17vw] text-white/10 leading-[0.75] tracking-[-0.03em] uppercase will-change-transform opacity-90 transition-opacity"
          >
            25.90 M
          </h2>
        </div>

        {/* 3. 3D WebGL Catamaran Hero Canvas (Pure Model, Right-Biased Anchor) */}
        <div className="absolute inset-0 z-10">
          <CatamaranCanvasHero scrollProgressRef={scrollProgressRef} />
        </div>

        {/* 4. Left Editorial Narrative Column (Protected Anchor) */}
        <div className="relative z-20 w-full my-auto flex items-center pointer-events-none">
          <div
            ref={textColRef}
            className="max-w-md sm:max-w-lg lg:max-w-xl pointer-events-auto p-4 sm:p-0 rounded-xs"
          >
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-[5.5vw] text-[#FAF6EE] leading-[0.88] tracking-tight drop-shadow-md">
              BUILT TO GO
              <br />
              FURTHER.
            </h2>
            <div className="w-16 sm:w-20 h-[3px] bg-[#F59E0B] my-4 sm:my-6" />
            <p className="font-sans text-xs sm:text-sm lg:text-base text-[#FAF6EE]/90 font-light leading-relaxed max-w-md drop-shadow-sm">
              An architecturally engineered 25.90M twin-hull catamaran built for open-sea stability, silent passage, and complete panoramic immersion across the Arabian Sea.
            </p>
          </div>
        </div>

        {/* 5. Single Subtle Editorial Caption Near Vessel (Revealed during Hero Angle) */}
        <div
          ref={captionRef}
          className="absolute bottom-28 right-6 sm:right-10 lg:right-14 z-20 hidden sm:flex items-center gap-2.5 text-[9.5px] font-mono tracking-[0.22em] text-[#FAF6EE]/80 uppercase pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span>25.90M EXPEDITION CATAMARAN · TWIN HULL HYDRODYNAMICS</span>
        </div>

        {/* 6. Bottom Technical Telemetry Badges */}
        <div
          ref={specCardsRef}
          className="relative z-20 shrink-0 w-full pt-4 border-t border-white/15 pointer-events-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <div className="p-3 bg-[#0A2540]/85 border border-[#F59E0B]/35 backdrop-blur-md rounded-[2px]">
              <div className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-semibold mb-0.5">
                DIMENSION OVERALL
              </div>
              <div className="font-serif text-xl sm:text-2xl text-[#FAF6EE] tracking-tight">
                25.90 METERS
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                BEAM {VESSEL_SPECS.beam} · CRUISE {VESSEL_SPECS.cruisingSpeed}
              </div>
            </div>

            <div className="p-3 bg-[#0A2540]/85 border border-[#0D9488]/35 backdrop-blur-md rounded-[2px]">
              <div className="text-[9px] font-mono text-[#0D9488] uppercase tracking-[0.2em] font-semibold mb-0.5">
                DECK ARCHITECTURE
              </div>
              <div className="font-serif text-xl sm:text-2xl text-[#FAF6EE] tracking-tight">
                360° SKY LOUNGE
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                WEATHERED TEAK · {VESSEL_SPECS.capacity} CAPACITY
              </div>
            </div>

            <div className="p-3 bg-[#0A2540]/85 border border-[#38BDF8]/35 backdrop-blur-md rounded-[2px]">
              <div className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-[0.2em] font-semibold mb-0.5">
                EXPEDITION PROPULSION
              </div>
              <div className="font-serif text-xl sm:text-2xl text-[#FAF6EE] tracking-tight">
                ARABIAN HORIZON
              </div>
              <div className="text-[8px] font-mono text-white/60 uppercase tracking-[0.15em] mt-0.5">
                TWIN LOW-EMISSION DIESEL · 14 KNOTS
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
