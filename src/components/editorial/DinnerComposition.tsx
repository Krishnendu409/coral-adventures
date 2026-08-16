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
      id="dinner"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-20 sm:py-28 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-[#0A2540]/12 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span className="font-semibold text-[#0A2540]">08 / GASTRONOMY · OPEN TEAK TWILIGHT DINING</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-medium">
            <span>19:30 — 22:00</span>
            <span>KARAVALI COASTAL SEAFOOD</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0A2540] leading-[0.95] tracking-tight uppercase">
              Dinner, with
              <br />
              <span className="italic font-light text-[#0284C7]">no walls.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-2">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light max-w-lg">
              Fresh daily catch from local coastal harbors, aromatic Kundapura ghee roast spices, and coconut kokum infusions served on candlelit teak decks under the Arabian Sea twilight.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Photographic Composition & Ephemera */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Dining Photography (Columns 2-11) */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 relative">
            <div
              ref={dinnerPhotoRef}
              className="relative w-full h-[46vh] sm:h-[56vh] lg:h-[64vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-xl"
            >
              <Image
                src="/images/dining_deck.jpg"
                alt="Candlelit teak dining table on catamaran deck with coastal seafood and twilight ocean view"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-[#E2D9C8]">
                OPEN SKY OBSERVATION DECK · CANDLELIT GASTRONOMY
              </div>
            </div>
          </div>

          {/* Ephemera: Chef's Twilight Tasting Field Note (Columns 1-5) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative mt-6 lg:-mt-20 z-30">
            <FieldNoteBadge
              noteNumber="FIELD NOTE 08"
              headline="KARAVALI HARVEST"
              body="Fresh catch of Kane and Surmai in crisp rava crust, Kundapura spice blends, and coconut kokum pairings served on open teak tables as the Arabian Sea turns to twilight."
              author="EXECUTIVE CHEF · MALPE COASTAL KITCHEN"
              color="azure"
            />
          </div>

          {/* Gastronomy Note Card (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-4 lg:-mt-16 z-30">
            <div className="p-5 bg-[#F7F3E9] border border-[#E2D9C8] shadow-lg">
              <span className="text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#1E5E48] font-bold block mb-1.5">
                INTIMATE PRIVATE DINING
              </span>
              <p className="font-serif text-xl text-[#0A2540] tracking-tight leading-snug mb-2">
                Stay out a little longer.
              </p>
              <p className="font-sans text-xs text-[#0A2540]/80 leading-relaxed font-light">
                An intimate open-air dining experience tailored exclusively for small private groups. Table reservations are limited to preserve tranquility on open waters.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
