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
  const titleChaseRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (sunsetPhotoRef.current) {
      gsap.to(sunsetPhotoRef.current, {
        y: 40,
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
      className="relative w-full bg-gradient-to-b from-[#D97706] via-[#9A3412] to-[#0A2540] text-[#FAF6EE] py-24 sm:py-32 overflow-hidden border-b border-white/20"
    >
      {/* Liquid Amber & Twilight Horizon Light Leaks */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#F59E0B]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1E3A8A]/30 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/25 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-white">07 / GOLDEN HOUR · WESTBOUND HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-white/85 font-semibold">
            <span>BEARING: 284° WNW</span>
            <span className="text-[#FBBF24]">17:30 — 19:30</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Typography */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none overflow-visible mb-6">
        <h2
          ref={titleChaseRef}
          className="font-serif text-[17vw] sm:text-[14vw] lg:text-[12vw] text-white leading-[0.78] tracking-[-0.03em] uppercase will-change-transform drop-shadow-sm"
        >
          CHASE THE LIGHT.
        </h2>
      </div>

      {/* 3. Sunset Photographic Frame + Postcard Collision */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-6 sm:-mt-12 lg:-mt-18 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Sunset Catamaran Frame (Columns 3-12) */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-10 relative">
            <div
              ref={sunsetPhotoRef}
              className="relative w-full h-[52vh] sm:h-[65vh] lg:h-[76vh] overflow-hidden postcard-shadow border-2 border-white/90 will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/sunset_catamaran.jpg"
                alt="25.90M catamaran sailing westward into a golden and amber sunset on the Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 bg-[#FAF6EE] text-[#0A2540] px-4 py-2 text-[9.5px] font-mono tracking-[0.2em] uppercase font-bold border border-[#E2D9C8] shadow-md">
                WESTBOUND HORIZON · GOLDEN HOUR PASSAGE
              </div>
            </div>
          </div>

          {/* Colliding Sunset Postcard (Columns 1-5) */}
          <div className="col-span-10 sm:col-span-6 lg:col-span-5 relative -mt-20 sm:-mt-32 lg:-mt-48 z-30 pointer-events-auto">
            <PostcardPlate
              imageSrc="/images/hero_ocean.jpg"
              imageAlt="Golden sunlight glistening on ocean waters"
              title="Liquid Amber Horizon"
              caption="Some journeys are measured in moments."
              coords="284° WNW · 18:15"
              stampLocation="SUNSET"
              stampColor="sun"
              rotationDeg={3}
            />
          </div>

          {/* Narrative Card on Dusk Canvas (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-6 lg:-mt-24 z-30">
            <div className="p-6 bg-[#FAF6EE] text-[#0A2540] border border-[#E2D9C8] postcard-shadow">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#C2410C] font-bold block mb-2">
                EXPEDITION HORIZON · SUNSET VOYAGE
              </span>
              <p className="font-serif text-2xl text-[#0A2540] tracking-tight leading-snug mb-3">
                As day dissolves into warm amber, the catamaran turns westward.
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#0A2540]/80 leading-relaxed font-light">
                The sky shifts from bright cyan into gold, amber, and deep twilight indigo. Guests gather on the open teak sky deck with chilled beverages as the sun meets the Arabian Sea horizon.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
