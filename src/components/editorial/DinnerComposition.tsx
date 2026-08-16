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
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (dinnerPhotoRef.current) {
      gsap.to(dinnerPhotoRef.current, {
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
      id="dinner"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-bold text-[#0A2540]">08 / GASTRONOMY · OPEN TEAK TWILIGHT DINING</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/75 font-mono font-medium">
            <span>19:30 — 22:00</span>
            <span className="text-[#1E5E48] font-bold">COASTAL SEAFOOD & LOCAL FLAVORS</span>
          </div>
        </div>
      </div>

      {/* 2. Layered Stage: Colossal Display Heading BEHIND Dining Photo Plate */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-4">
        <div className="relative w-full">

          {/* Colossal Display Heading BEHIND Image (z-0) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-0 pointer-events-none select-none">
            <h2
              ref={wordmarkRef}
              className="font-serif text-[12vw] sm:text-[11vw] lg:text-[10vw] text-[#0A2540] leading-[0.82] tracking-[-0.035em] uppercase"
            >
              DINNER, WITH NO WALLS.
            </h2>
          </div>

          {/* Main Dining Photo Plate Overlapping in Front (z-10) */}
          <div className="relative w-full lg:w-[84%] lg:ml-auto pt-[4vw] lg:pt-[5vw] z-10">
            <div
              ref={dinnerPhotoRef}
              className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-2xl"
            >
              <Image
                src="/images/dining_deck.jpg"
                alt="Candlelit teak dining table on catamaran deck with coastal seafood and twilight ocean view"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-4 py-2 text-[9.5px] font-sans tracking-[0.22em] uppercase font-bold border border-[#E2D9C8] shadow-md">
                OPEN SKY OBSERVATION DECK · CANDLELIT GASTRONOMY
              </div>
            </div>

            {/* Colliding Field Note Badge (Bottom Left, z-40) */}
            <div className="absolute -bottom-16 -left-3 lg:-left-20 w-[90%] sm:w-[58%] lg:w-[420px] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[-1deg] cursor-pointer">
              <FieldNoteBadge
                noteNumber="FIELD NOTE 08"
                headline="KARAVALI HARVEST"
                body="Fresh catch of Kane and Surmai in crisp rava crust, Kundapura spice blends, and coconut kokum pairings served on open teak tables as the Arabian Sea turns to twilight."
                author="EXECUTIVE CHEF · MALPE COASTAL KITCHEN"
                color="azure"
              />
            </div>

          </div>

        </div>
      </div>

      {/* 3. Gastronomy Experience Narrative Floor */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-24 sm:mt-28 z-20">
        <div className="editorial-grid items-start border-t border-[#0A2540]/12 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#0A2540] leading-snug tracking-tight mb-3">
              &ldquo;Stay out a little longer.&rdquo;
            </p>
            <p className="font-sans text-sm sm:text-base text-[#0A2540]/80 font-light leading-relaxed max-w-xl">
              Fresh daily catch from local coastal harbors, aromatic Kundapura ghee roast spices, and coconut kokum infusions served on candlelit teak decks under the Arabian Sea twilight. Table reservations are strictly limited to preserve tranquility on open waters.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-start lg:items-end mt-4 lg:mt-0">
            <div className="p-5 bg-[#F7F3E9] border border-[#E2D9C8] shadow-md max-w-sm">
              <span className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#1E5E48] font-bold block mb-1">
                SEAFOOD PROVENANCE
              </span>
              <p className="font-serif text-lg text-[#0A2540] tracking-tight">
                Daily Malpe Fishery Catch
              </p>
              <p className="font-sans text-xs text-[#0A2540]/75 mt-1 leading-relaxed font-light">
                Locally sourced wild fish, stone-ground Coastal Karnataka masala, cold-pressed coconut oil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
