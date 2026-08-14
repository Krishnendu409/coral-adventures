"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VESSEL_SPECS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VesselComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vesselPhotoRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLHeadingElement>(null);
  const specCard1Ref = useRef<HTMLDivElement>(null);
  const specCard2Ref = useRef<HTMLDivElement>(null);
  const specCard3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (vesselPhotoRef.current) {
      gsap.fromTo(
        vesselPhotoRef.current,
        { scale: 0.94, y: "12%" },
        {
          scale: 1.0,
          y: "0%",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center center",
            scrub: 1.5,
          },
        }
      );
    }

    if (specCard1Ref.current) {
      gsap.fromTo(
        specCard1Ref.current,
        { x: "-5%", y: "20%" },
        {
          x: "0%",
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );
    }

    if (specCard2Ref.current) {
      gsap.fromTo(
        specCard2Ref.current,
        { x: "5%", y: "30%" },
        {
          x: "0%",
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1.6,
          },
        }
      );
    }

    if (specCard3Ref.current) {
      gsap.fromTo(
        specCard3Ref.current,
        { x: "-8%", y: "15%" },
        {
          x: "0%",
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1.4,
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="vessel"
      className="relative w-full bg-[#0A2540] text-[#FAF6EE] py-24 sm:py-32 overflow-hidden border-b border-white/10"
    >
      {/* Ambient Turquoise/Vermilion Light Blooms */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C2410C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-[#F59E0B]">
              05 / THE VESSEL · 25.90M EXPEDITION CATAMARAN
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70 font-semibold">
            <span>TWIN HULL OCEAN STABILITY</span>
            <span className="text-[#38BDF8]">MALPE PORT OF REGISTRY</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Background Watermark: 25.90 M */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-0 pointer-events-none select-none overflow-visible">
        <h2
          ref={watermarkRef}
          className="font-serif text-[19vw] sm:text-[17vw] lg:text-[16vw] text-white/10 leading-[0.75] tracking-[-0.03em] uppercase will-change-transform"
        >
          25.90 M
        </h2>
      </div>

      {/* 3. Colossal Headline + Narrative */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-8 sm:-mt-16 lg:-mt-24 z-10">
        <div className="editorial-grid mb-8 relative z-20">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[7vw] text-[#FAF6EE] leading-[0.88] tracking-tight">
              BUILT TO GO
              <br />
              FURTHER.
            </h2>
            <div className="w-20 h-[3px] bg-[#F59E0B] my-6" />
            <p className="font-sans text-sm sm:text-base text-[#FAF6EE]/85 font-light leading-relaxed max-w-xl">
              An architecturally engineered 25.90M twin-hull catamaran built for open-sea stability, silent passage, and complete panoramic immersion across the Arabian Sea.
            </p>
          </div>
        </div>

        {/* 4. Commanding Center Catamaran Hero Frame */}
        <div className="editorial-grid items-center relative z-10 my-6">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 relative">
            <div
              ref={vesselPhotoRef}
              className="relative w-full h-[55vh] sm:h-[68vh] lg:h-[78vh] overflow-hidden shadow-2xl border border-white/20 will-change-transform bg-[#071A2B]"
            >
              <Image
                src="/images/vessel_catamaran.jpg"
                alt="25.90M twin-hull luxury catamaran sailing smoothly across the open Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 bg-[#0A2540]/90 text-[#FAF6EE] px-3.5 py-1.5 backdrop-blur-xs text-[9px] font-mono tracking-[0.2em] uppercase border border-white/20">
                CORAL EXPLORER · MALPE VESSEL IDENTIFICATION
              </div>
            </div>
          </div>
        </div>

        {/* 5. Orbiting Technical Telemetry Plates */}
        <div className="editorial-grid relative -mt-16 sm:-mt-24 lg:-mt-32 z-20 pointer-events-none">
          
          <div
            ref={specCard1Ref}
            className="col-span-12 sm:col-span-4 lg:col-span-4 p-5 bg-[#0A2540]/90 border border-[#F59E0B]/40 backdrop-blur-xs shadow-xl pointer-events-auto will-change-transform mb-4 sm:mb-0"
          >
            <div className="flex items-center gap-2 mb-2 text-[#F59E0B] text-[9.5px] font-mono tracking-[0.2em] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span>DIMENSION OVERALL</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight mb-1">
              25.90 METERS
            </div>
            <div className="text-[9px] font-mono text-white/70 uppercase tracking-[0.15em]">
              TWIN HULL HYDRODYNAMICS · BEAM {VESSEL_SPECS.beam}
            </div>
          </div>

          <div
            ref={specCard2Ref}
            className="col-span-12 sm:col-span-4 lg:col-span-4 lg:col-start-5 p-5 bg-[#0A2540]/90 border border-[#0D9488]/40 backdrop-blur-xs shadow-xl pointer-events-auto will-change-transform mb-4 sm:mb-0"
          >
            <div className="flex items-center gap-2 mb-2 text-[#0D9488] text-[9.5px] font-mono tracking-[0.2em] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
              <span>DECK ARCHITECTURE</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight mb-1">
              360° SKY LOUNGE
            </div>
            <div className="text-[9px] font-mono text-white/70 uppercase tracking-[0.15em]">
              OPEN TEAK OBSERVATION DECK · 170 CAPACITY
            </div>
          </div>

          <div
            ref={specCard3Ref}
            className="col-span-12 sm:col-span-4 lg:col-span-4 lg:col-start-9 p-5 bg-[#0A2540]/90 border border-[#C2410C]/40 backdrop-blur-xs shadow-xl pointer-events-auto will-change-transform"
          >
            <div className="flex items-center gap-2 mb-2 text-[#C2410C] text-[9.5px] font-mono tracking-[0.2em] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
              <span>EXPEDITION RANGE</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#FAF6EE] tracking-tight mb-1">
              ARABIAN HORIZON
            </div>
            <div className="text-[9px] font-mono text-white/70 uppercase tracking-[0.15em]">
              TWIN LOW-EMISSION DIESEL · 14 KNOTS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
