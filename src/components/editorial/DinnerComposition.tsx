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
      id="dinner"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] pt-24 sm:pt-32 pb-24 sm:pb-36 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-[#0A2540]/12 pb-3">
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

      {/* 2. Layered Stage: Giant Editorial Heading + Breathing Space (8-12vh) + Hero Photograph */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-2">
        
        {/* Giant Editorial Title: Fully visible and commanding */}
        <div className="relative w-full z-10 pointer-events-none select-none">
          <h2
            ref={wordmarkRef}
            className="font-serif text-[12.5vw] sm:text-[12vw] lg:text-[11vw] text-[#0A2540] leading-[0.82] tracking-[-0.04em] uppercase"
          >
            DINNER, WITH NO WALLS.
          </h2>
        </div>

        {/* Main Dining Photo Plate Overlapping in Front (z-20) with deliberate 8-12vh breathing gap */}
        <div className="relative w-full lg:w-[86%] lg:ml-auto z-20 mt-[8vh] sm:mt-[10vh] lg:mt-[12vh]">
          <div
            ref={dinnerPhotoRef}
            className="relative w-full h-[52vh] sm:h-[64vh] lg:h-[72vh] overflow-hidden bg-[#F2ECE1] border border-[#E2D9C8] will-change-transform shadow-2xl rounded-xs"
          >
            <Image
              src="/images/dining_deck.jpg"
              alt="Candlelit teak dining table on catamaran deck with coastal seafood and twilight ocean view"
              fill
              sizes="(max-width: 1024px) 100vw, 88vw"
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

      {/* 3. Narrative Floor Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-20 sm:mt-28 z-20">
        <div className="editorial-grid items-start border-t border-[#0A2540]/12 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif text-2xl sm:text-4xl text-[#0A2540] tracking-tight leading-snug">
              &ldquo;Dining at sea changes the flavor of everything: the breeze carries salt, the flame flickers against ocean black, and every dish is freshly prepared.&rdquo;
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-1">
            <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light">
              Our culinary team partners exclusively with Malpe fishing families and traditional coastal spice houses to create an authentic multi-course Karavali experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
