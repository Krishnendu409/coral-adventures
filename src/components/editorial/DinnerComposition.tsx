"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FieldNoteBadge } from "./ephemera/FieldNoteBadge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DinnerComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dinnerPhotoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (dinnerPhotoRef.current) {
      gsap.to(dinnerPhotoRef.current, {
        scale: 1.04,
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
      id="dinner"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C]" />
            <span className="font-bold text-[#C2410C]">08 / GASTRONOMY · OPEN TEAK TWILIGHT DINING</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>19:30 — 22:00</span>
            <span className="text-[#1E5E48]">COASTAL SEAFOOD & LOCAL FLAVORS</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Typography */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none overflow-visible mb-6">
        <h2 className="font-serif text-[17vw] sm:text-[13vw] lg:text-[11vw] text-[#0A2540] leading-[0.78] tracking-[-0.03em] uppercase">
          DINNER, WITH NO WALLS.
        </h2>
      </div>

      {/* 3. Photographic Composition & Ephemera */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-6 sm:-mt-12 lg:-mt-16 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Dining Photography (Columns 2-11) */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 relative">
            <div
              ref={dinnerPhotoRef}
              className="relative w-full h-[52vh] sm:h-[65vh] lg:h-[76vh] overflow-hidden postcard-shadow border border-[#E2D9C8] will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/dining_deck.jpg"
                alt="Candlelit teak dining table on catamaran deck with coastal seafood and twilight ocean view"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 right-6 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-4 py-2 text-[9.5px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                OPEN SKY OBSERVATION DECK · CANDLELIT GASTRONOMY
              </div>
            </div>
          </div>

          {/* Ephemera: Chef's Twilight Tasting Field Note (Columns 1-5) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative mt-6 lg:-mt-28 z-30">
            <FieldNoteBadge
              noteNumber="FIELD NOTE 08"
              headline="COASTAL HARVEST"
              body="Fresh coastal seafood, slow-roasted spices, and chilled wine served on open teak tables as the Arabian Sea turns to twilight. Stay out a little longer."
              author="EXECUTIVE CHEF · MALPE COASTAL KITCHEN"
              color="coral"
            />
          </div>

          {/* Gastronomy Note Card (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-4 lg:-mt-20 z-30">
            <div className="p-6 bg-[#F7F3E9] border border-[#E2D9C8] postcard-shadow">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#1E5E48] font-bold block mb-2">
                GASTRONOMIC SELECTION
              </span>
              <p className="font-serif text-2xl text-[#0A2540] tracking-tight leading-snug mb-2">
                Stay out a little longer.
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light">
                An intimate open-air dining experience tailored to small groups. Table reservations are strictly limited to preserve tranquility on the water.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
