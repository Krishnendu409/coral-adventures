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
      id="sunset"
      className="relative w-full bg-gradient-to-b from-[#A14408] via-[#9A3412] to-[#141B26] text-[#FAF6EE] pt-24 sm:pt-32 pb-24 sm:pb-36 overflow-hidden border-b border-white/15"
    >
      {/* 1. Subtle Golden Hour Twilight Glow Layer */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-white/25 pb-3">
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

      {/* 2. Layered Stage: Giant Editorial Heading + Breathing Space (8-12vh) + Hero Photograph */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-2">
        
        {/* Giant Editorial Title: Fully visible and commanding */}
        <div className="relative w-full z-10 pointer-events-none select-none">
          <h2
            ref={wordmarkRef}
            className="font-serif text-[14.5vw] sm:text-[14vw] lg:text-[13vw] text-white leading-[0.8] tracking-[-0.04em] uppercase"
          >
            CHASE THE LIGHT
          </h2>
        </div>

        {/* Main Sunset Catamaran Frame Overlapping in Front (z-20) with deliberate 8-12vh breathing gap */}
        <div className="relative w-full lg:w-[86%] lg:ml-auto z-20 mt-[8vh] sm:mt-[10vh] lg:mt-[12vh]">
          <div
            ref={sunsetPhotoRef}
            className="relative w-full h-[52vh] sm:h-[64vh] lg:h-[72vh] overflow-hidden bg-[#0A2540] border border-white/30 will-change-transform shadow-2xl rounded-xs"
          >
            <Image
              src="/images/sunset_catamaran.jpg"
              alt="25.90M catamaran sailing westward into a golden sunset on the Arabian Sea"
              fill
              sizes="(max-width: 1024px) 100vw, 88vw"
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
              title="Golden Horizon"
              caption="The Arabian Sea dissolving into amber twilight."
              coords="13°22′00″ N · 74°35′00″ E"
              stampLocation="HORIZON"
              stampColor="sun"
              rotationDeg={-3}
            />
          </div>

        </div>

      </div>

      {/* 4. Narrative Floor Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-20 sm:mt-28 z-20">
        <div className="editorial-grid items-start border-t border-white/20 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif text-2xl sm:text-4xl text-white tracking-tight leading-snug">
              &ldquo;As the sun sinks below the waterline, the entire sea turns to molten copper.&rdquo;
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-1">
            <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed font-light">
              Our westward heading is calculated daily to keep the setting sun dead ahead off the bow, giving guests on the sky deck an uninterrupted golden hour view.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
