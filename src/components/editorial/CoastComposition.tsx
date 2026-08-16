"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAYPOINTS } from "@/lib/expeditionData";
import { FieldNoteBadge } from "./ephemera/FieldNoteBadge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CoastComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const basaltImageRef = useRef<HTMLDivElement>(null);
  const waveImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (basaltImageRef.current) {
      gsap.to(basaltImageRef.current, {
        y: 25,
        ease: "power1.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }

    if (waveImageRef.current) {
      gsap.to(waveImageRef.current, {
        y: -20,
        ease: "power1.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="coast"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Line */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5E48]" />
            <span className="font-bold text-[#1E5E48]">02 / THE COAST · COLUMNAR BASALT ARCHIPELAGO</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/75 font-medium">
            <span>ST. MARY'S ISLES</span>
            <span className="font-mono">{WAYPOINTS.coconutIsland.coords}</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20 mb-14">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2
              ref={headlineRef}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#0A2540] leading-[0.92] tracking-tight uppercase"
            >
              Where the coast
              <br />
              meets the wild.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-2">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-lg">
              Transitioning beyond the Malpe Harbor breakwater toward the 88-million-year-old hexagonal basalt spires of St. Mary's Island—forged during the prehistoric separation of Madagascar from India.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Photographic Composition + Geological Field Note */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Volcanic Basalt Photo (Columns 3-12) */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-10 relative">
            <div
              ref={basaltImageRef}
              className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform"
            >
              <Image
                src="/images/malpe_basalt_yacht.jpg"
                alt="Volcanic hexagonal columnar basalt cliffs at St. Mary's Island with anchored yacht in calm turquoise sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/35 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-[#E2D9C8]">
                NATIONAL GEOLOGICAL MONUMENT · COLUMNAR FORMATIONS
              </div>
            </div>
          </div>

          {/* Colliding Aerial Wave Foam Photo (Columns 1-5) */}
          <div
            ref={waveImageRef}
            className="col-span-10 sm:col-span-6 lg:col-span-5 relative -mt-20 sm:-mt-28 lg:-mt-44 z-30 pointer-events-auto"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FAF6EE] p-2.5 sm:p-3 border border-[#E2D9C8] shadow-lg">
              <div className="relative w-full h-full overflow-hidden bg-[#F2ECE1]">
                <Image
                  src="/images/aerial_wave_foam.jpg"
                  alt="Aerial drone perspective of turquoise waves crashing over St Marys Island rocks"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono tracking-[0.16em] text-[#0A2540]/70 uppercase">
                <span>FIG 02.1 · SURF COLLISION</span>
                <span>DEPTH: 6–12 FATHOMS</span>
              </div>
            </div>
          </div>

          {/* Geological Field Note Badge (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-6 lg:-mt-20 z-30">
            <FieldNoteBadge
              noteNumber="FIELD NOTE 02"
              headline="THE BASALT FORMATIONS"
              body="Hexagonal volcanic columns forged 88 million years ago when Madagascar separated from the Indian subcontinent. Rising vertically from turquoise water, they form a natural breakwater against the open Arabian Sea swell."
              author="DR. K. RAO · GEOLOGICAL SURVEY ARCHIVE"
              coords={WAYPOINTS.coconutIsland.coords}
              color="palm"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
