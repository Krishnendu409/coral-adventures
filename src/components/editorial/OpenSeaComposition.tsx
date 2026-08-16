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
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="opensea"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-24 sm:pt-32 pb-24 sm:pb-36 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
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

      {/* 2. Layered Stage: Colossal Display Heading BEHIND Photo Plate with subtle ~20% overlap */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-4">
        <div className="relative w-full">

          {/* Colossal Display Heading BEHIND Image (z-0) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-0 pointer-events-none select-none">
            <h2
              ref={wordmarkRef}
              className="font-serif text-[15vw] sm:text-[14.5vw] lg:text-[13.5vw] text-[#0A2540] leading-[0.78] tracking-[-0.04em] uppercase"
            >
              OPEN SEA
            </h2>
          </div>

          {/* Main Photo Plate Overlapping only slightly (z-10) */}
          <div className="relative w-full lg:w-[86%] lg:ml-auto pt-[5vw] sm:pt-[6.5vw] lg:pt-[7.5vw] z-10">
            <div
              ref={openSeaImgRef}
              className="relative w-full h-[52vh] sm:h-[64vh] lg:h-[72vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-2xl rounded-xs"
            >
              <Image
                src="/images/nightfall_ocean.jpg"
                alt="Vast open Arabian Sea horizon under expansive morning sky"
                fill
                sizes="(max-width: 1024px) 100vw, 88vw"
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
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-16 sm:mt-24 z-20">
        <div className="editorial-grid items-start border-t border-[#0A2540]/12 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif text-2xl sm:text-4xl text-[#0A2540] tracking-tight leading-snug">
              &ldquo;Once you pass the thirty-fathom line, there are no landmarks. The sea becomes time itself.&rdquo;
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-1">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light">
              Here on the open water, 25.90M catamaran dynamics provide unmatched directional steadiness, keeping the vessel level while guests unwind on the teak sky lounge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
