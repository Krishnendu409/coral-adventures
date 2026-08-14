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
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="opensea"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-28 sm:py-36 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
            <span className="font-bold text-[#1E40AF]">06 / OPEN SEA · ARABIAN SEA HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>{WAYPOINTS.openArabianSea.coords}</span>
            <span className="text-[#0D9488]">DEPTH: 30 FATHOMS</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Typography */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none overflow-visible mb-6">
        <h2 className="font-serif text-[17vw] sm:text-[15vw] lg:text-[14vw] text-[#0A2540] leading-[0.78] tracking-[-0.03em] uppercase">
          OPEN SEA.
        </h2>
      </div>

      {/* 3. Radical Negative Space & Open Ocean Photographic Frame */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-4 sm:-mt-8 lg:-mt-12 z-20">
        <div className="editorial-grid items-start relative">
          
          <div className="col-span-12 lg:col-span-12 relative">
            <div
              ref={openSeaImgRef}
              className="relative w-full h-[55vh] sm:h-[68vh] lg:h-[78vh] overflow-hidden postcard-shadow border border-[#E2D9C8] will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/nightfall_ocean.jpg"
                alt="Endless open Arabian Sea horizon under vast expansive sky"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 right-6 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-4 py-2 text-[9.5px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                30 FATHOM WAYPOINT · UNRESTRICTED HORIZON
              </div>
            </div>
          </div>

          {/* Minimalist Floating Italic Statement */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative mt-8 z-30">
            <div className="p-6 bg-[#F7F3E9] border border-[#E2D9C8] postcard-shadow">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#1E40AF] font-bold block mb-2">
                FIELD NOTE 06 · HORIZON
              </span>
              <p className="font-serif italic text-3xl sm:text-4xl text-[#0A2540] leading-tight tracking-tight">
                "No road ahead. Just horizon."
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#0A2540]/75 mt-3 leading-relaxed font-light">
                Out here, land falls away entirely. The catamaran glides at 14 knots across open blue waters with only the ocean breeze and seabirds following our wake.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
