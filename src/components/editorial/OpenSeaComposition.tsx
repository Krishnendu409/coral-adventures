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

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (openSeaImgRef.current) {
      gsap.to(openSeaImgRef.current, {
        scale: 1.03,
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
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-[#0A2540]/12 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
            <span className="font-semibold text-[#1E40AF]">06 / OPEN SEA · ARABIAN SEA HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-medium">
            <span>{WAYPOINTS.openArabianSea.coords}</span>
            <span>DEPTH: 30 FATHOMS</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0A2540] leading-[0.95] tracking-tight uppercase">
              Open sea.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-2">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-lg">
              Beyond the coastal archipelago, land falls away entirely. The catamaran glides at 14 knots across deep blue water under an unrestricted 360° Arabian horizon.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Photographic Immersion & Field Note */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start relative">
          
          <div className="col-span-12 relative">
            <div
              ref={openSeaImgRef}
              className="relative w-full h-[46vh] sm:h-[58vh] lg:h-[66vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-xl"
            >
              <Image
                src="/images/nightfall_ocean.jpg"
                alt="Endless open Arabian Sea horizon under vast expansive sky"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/35 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-[#E2D9C8]">
                30 FATHOM WAYPOINT · UNRESTRICTED HORIZON
              </div>
            </div>
          </div>

          {/* Minimalist Note */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative mt-6 z-30">
            <div className="p-5 bg-[#F7F3E9] border border-[#E2D9C8] shadow-md">
              <span className="text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#1E40AF] font-bold block mb-1.5">
                FIELD NOTE 06 · HORIZON
              </span>
              <p className="font-serif italic text-xl sm:text-2xl text-[#0A2540] leading-snug tracking-tight">
                "No roads. Just horizon and open water."
              </p>
              <p className="font-sans text-xs text-[#0A2540]/75 mt-2 leading-relaxed font-light">
                Out here, silence returns. The twin hulls carve a clean white wake through deep water with only the ocean breeze and seabirds following our passage.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
