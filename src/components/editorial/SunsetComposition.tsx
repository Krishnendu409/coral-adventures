"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PostcardPlate } from "./ephemera/PostcardPlate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SunsetComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sunsetPhotoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (sunsetPhotoRef.current) {
      gsap.to(sunsetPhotoRef.current, {
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
      id="sunset"
      className="relative w-full bg-gradient-to-b from-[#A14408] via-[#9A3412] to-[#141B26] text-[#FAF6EE] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden border-b border-white/15"
    >
      {/* 1. Subtle Golden Hour Twilight Glow Layer */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-b border-white/25 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FDE68A] animate-pulse" />
            <span className="font-bold text-white tracking-[0.26em]">07 / GOLDEN HOUR · WESTBOUND HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-white/85 font-mono font-medium">
            <span>BEARING: 284° WNW</span>
            <span className="text-[#FDE68A]">17:30 — 19:30</span>
          </div>
        </div>
      </div>

      {/* 3. Layered Stage: Colossal Display Heading BEHIND Sunset Photo Plate */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-4">
        <div className="relative w-full">

          {/* Colossal Display Heading BEHIND Image (z-0) */}
          <div className="relative lg:absolute top-0 left-0 w-full z-0 pointer-events-none select-none">
            <h2
              ref={wordmarkRef}
              className="font-serif text-[13.5vw] sm:text-[12.5vw] lg:text-[11.5vw] text-white leading-[0.8] tracking-[-0.035em] uppercase"
            >
              CHASE THE LIGHT
            </h2>
          </div>

          {/* Main Sunset Catamaran Frame Overlapping in Front (z-10) */}
          <div className="relative w-full lg:w-[84%] lg:ml-auto pt-[4vw] lg:pt-[5vw] z-10">
            <div
              ref={sunsetPhotoRef}
              className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden bg-[#0A2540] border border-white/30 will-change-transform shadow-2xl rounded-xs"
            >
              <Image
                src="/images/sunset_catamaran.jpg"
                alt="25.90M catamaran sailing westward into a golden sunset on the Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE] text-[#0A2540] px-4 py-2 text-[9.5px] font-sans tracking-[0.22em] uppercase font-bold border border-[#E2D9C8] shadow-md">
                WESTBOUND HORIZON · GOLDEN HOUR PASSAGE
              </div>
            </div>

            {/* Colliding Sunset Postcard Plate (Bottom Left, z-40) */}
            <div className="absolute -bottom-16 -left-3 lg:-left-20 w-[88%] sm:w-[52%] lg:w-[380px] z-40 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-[-2deg] cursor-pointer">
              <PostcardPlate
                imageSrc="/images/hero_ocean.jpg"
                imageAlt="Golden sunlight glistening on ocean waters"
                title="Liquid Amber Horizon"
                caption="Where the sky shifts from pale cyan to molten gold."
                coords="284° WNW · 18:15"
                stampLocation="SUNSET"
                stampColor="sun"
                rotationDeg={2.5}
                aspectRatio="landscape"
              />
            </div>

          </div>

        </div>
      </div>

      {/* 4. Narrative Footer Floor */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-24 sm:mt-28 z-20">
        <div className="editorial-grid items-start border-t border-white/20 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif italic text-2xl sm:text-3xl text-white leading-snug tracking-tight mb-3">
              &ldquo;The ocean takes fire, then turns to sapphire.&rdquo;
            </p>
            <p className="font-sans text-sm sm:text-base text-white/85 font-light leading-relaxed max-w-xl">
              As the tropical sun sinks toward the Arabian Sea, the catamaran turns westward. Guests gather on the open teak sky deck with chilled refreshments as the day gently dissolves over open water.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-start lg:items-end mt-4 lg:mt-0">
            <div className="p-5 bg-[#FAF6EE] text-[#0A2540] border border-[#E2D9C8] shadow-xl rounded-xs max-w-sm">
              <span className="text-[9px] font-sans uppercase tracking-[0.24em] text-[#B45309] font-bold block mb-1">
                SOLAR EPHEMERIS
              </span>
              <p className="font-serif text-lg text-[#0A2540] tracking-tight">
                Twilight Horizon Descent
              </p>
              <p className="font-sans text-xs text-[#0A2540]/80 mt-1 leading-relaxed font-light">
                Optimal sunset color refraction between 18:10 and 18:45 IST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
