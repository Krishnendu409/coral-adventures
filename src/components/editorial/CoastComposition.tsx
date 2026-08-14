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
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (waveImageRef.current) {
      gsap.to(waveImageRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.3,
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
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5E48]" />
            <span className="font-bold text-[#1E5E48]">02 / THE COAST · COLUMNAR BASALT ARCHIPELAGO</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span className="text-[#1E40AF]">ST. MARY'S ISLES</span>
            <span>{WAYPOINTS.coconutIsland.coords}</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Asymmetrical Headline + Chapter Folio Panel */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-20 mb-8">
        <div className="editorial-grid items-end relative">
          
          <div className="col-span-12 lg:col-span-8 relative z-20">
            <h2
              ref={headlineRef}
              className="font-serif text-5xl sm:text-7xl lg:text-[7.2vw] text-[#0A2540] leading-[0.88] tracking-tight uppercase"
            >
              WHERE THE
              <br />
              COAST MEETS
              <br />
              THE WILD.
            </h2>
            <div className="w-20 h-[3px] bg-[#1E5E48] my-6" />
          </div>

          {/* Chapter Context & Continuity Plate (Replaces raw '02') */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end pb-2">
            <div className="p-5 bg-[#F2ECE1] border border-[#E2D9C8] text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#0A2540] postcard-shadow">
              <div className="flex items-center justify-between text-[#1E5E48] font-bold border-b border-[#0A2540]/10 pb-2 mb-2.5">
                <span>PASSAGE STAGE · 02</span>
                <span>VOLCANIC SEPARATION</span>
              </div>
              <p className="font-sans normal-case text-xs text-[#0A2540]/80 leading-relaxed font-light">
                Transitioning beyond Malpe Harbor breakwater toward the 88-million-year-old hexagonal basalt spires of St. Mary's Island.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Asymmetric Photographic Composition + Geological Field Note */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Volcanic Basalt Photo (Columns 3-12) */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-10 relative">
            <div
              ref={basaltImageRef}
              className="relative w-full h-[52vh] sm:h-[65vh] lg:h-[78vh] overflow-hidden postcard-shadow border border-[#E2D9C8] will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/malpe_basalt_yacht.jpg"
                alt="Volcanic hexagonal columnar basalt cliffs at St. Mary's Island with anchored yacht in calm turquoise sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[9px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                NATIONAL GEOLOGICAL MONUMENT · COLUMNAR FORMATIONS
              </div>
            </div>
          </div>

          {/* Colliding Aerial Wave Foam Photo (Columns 1-6) */}
          <div
            ref={waveImageRef}
            className="col-span-10 sm:col-span-6 lg:col-span-5 relative -mt-24 sm:-mt-36 lg:-mt-52 z-30 pointer-events-auto"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden postcard-shadow bg-[#FAF6EE] p-3 border border-[#E2D9C8]">
              <div className="relative w-full h-full overflow-hidden bg-[#F2ECE1]">
                <Image
                  src="/images/aerial_wave_foam.jpg"
                  alt="Aerial drone perspective of turquoise waves crashing over St Marys Island rocks"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[8.5px] font-mono tracking-[0.18em] text-[#0A2540]/70 uppercase">
                <span>FIG 02.1 · SURF COLLISION</span>
                <span>DEPTH: 6-12 FATHOMS</span>
              </div>
            </div>
          </div>

          {/* Geological Field Note Badge (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-6 lg:-mt-24 z-30">
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
