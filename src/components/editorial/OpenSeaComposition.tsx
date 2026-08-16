"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAYPOINTS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OpenSeaComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const openSeaImgRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (openSeaImgRef.current) {
      gsap.to(openSeaImgRef.current, {
        scale: 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="opensea"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF] animate-pulse" />
            <span className="font-bold text-[#1E40AF]">06 / OPEN SEA · ARABIAN SEA HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/75 font-semibold font-mono">
            <span>{WAYPOINTS.openArabianSea.coords}</span>
            <span className="text-[#0284C7]">DEPTH: 30 FATHOMS</span>
          </div>
        </div>
      </div>

      {/* 2. Layered Stage: Colossal Display Heading BEHIND Photo Plate */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-4">
        <div className="relative w-full">

          {/* Colossal Display Heading BEHIND Image (z-0) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-0 pointer-events-none select-none">
            <h2
              ref={wordmarkRef}
              className="font-serif text-[15vw] sm:text-[14vw] lg:text-[13vw] text-[#0A2540] leading-[0.8] tracking-[-0.035em] uppercase"
            >
              OPEN SEA
            </h2>
          </div>

          {/* Main Photo Plate Overlapping in Front (z-10) */}
          <div className="relative w-full lg:w-[84%] lg:ml-auto pt-[4vw] lg:pt-[5vw] z-10">
            <div
              ref={openSeaImgRef}
              className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-2xl"
            >
              <Image
                src="/images/nightfall_ocean.jpg"
                alt="Vast open Arabian Sea horizon under expansive morning sky"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-4 py-2 text-[9.5px] font-sans tracking-[0.22em] uppercase font-bold border border-[#E2D9C8] shadow-md">
                30 FATHOM WAYPOINT · UNRESTRICTED HORIZON
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Field Note & Narrative Floor */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-16 sm:mt-20 z-20">
        <div className="editorial-grid items-start border-t border-[#0A2540]/12 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#0A2540] leading-snug tracking-tight mb-3">
              &ldquo;No roads. Just horizon and open water.&rdquo;
            </p>
            <p className="font-sans text-sm sm:text-base text-[#0A2540]/80 font-light leading-relaxed max-w-xl">
              Beyond the coastal archipelago, land falls away entirely. Out here, silence returns. The twin hulls carve a clean white wake through deep water with only the ocean breeze and seabirds following our passage.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-start lg:items-end mt-4 lg:mt-0">
            <div className="p-5 bg-[#F7F3E9] border border-[#E2D9C8] shadow-md max-w-sm">
              <span className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#1E40AF] font-bold block mb-1">
                HYDROGRAPHIC SOUNDING
              </span>
              <p className="font-mono text-xs text-[#0A2540]/80">
                LAT 13°22&apos;00&quot; N · LON 74°35&apos;00&quot; E
              </p>
              <p className="font-sans text-xs text-[#0A2540]/70 mt-1 font-light">
                Calm Arabian swell, 1.2 knot surface drift, 100% visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
