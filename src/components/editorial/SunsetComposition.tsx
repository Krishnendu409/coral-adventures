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
        y: 25,
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
      className="relative w-full bg-gradient-to-b from-[#A14408] via-[#9A3412] to-[#141B26] text-[#FAF6EE] py-20 sm:py-28 overflow-hidden border-b border-white/15"
    >
      {/* 1. Subtle Golden Hour Twilight Glow Layer */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/25 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FDE68A] animate-pulse" />
            <span className="font-semibold text-white/95">07 / GOLDEN HOUR · WESTBOUND HORIZON</span>
          </div>
          <div className="flex items-center gap-4 text-white/80 font-medium">
            <span>BEARING: 284° WNW</span>
            <span>17:30 — 19:30</span>
          </div>
        </div>
      </div>

      {/* 3. Colossal Display Title Matching Image 4 */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2
              ref={titleChaseRef}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight uppercase drop-shadow-md"
            >
              CHASE THE LIGHT.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3">
            <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed font-light max-w-lg drop-shadow-xs">
              As the tropical sun sinks toward the Arabian Sea, the catamaran turns westward. The open sky shifts from pale cyan to liquid amber and deep twilight indigo.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sunset Photographic Frame + Postcard */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary Sunset Catamaran Frame (Columns 3-12) */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-10 relative">
            <div
              ref={sunsetPhotoRef}
              className="relative w-full h-[46vh] sm:h-[56vh] lg:h-[66vh] overflow-hidden bg-[#0A2540] border border-white/30 will-change-transform shadow-2xl rounded-xs"
            >
              <Image
                src="/images/sunset_catamaran.jpg"
                alt="25.90M catamaran sailing westward into a golden sunset on the Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE] text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase font-semibold border border-[#E2D9C8] shadow-md">
                WESTBOUND HORIZON · GOLDEN HOUR PASSAGE
              </div>
            </div>
          </div>

          {/* Colliding Sunset Postcard (Columns 1-5) */}
          <div className="col-span-10 sm:col-span-6 lg:col-span-5 relative -mt-16 sm:-mt-24 lg:-mt-36 z-30 pointer-events-auto">
            <PostcardPlate
              imageSrc="/images/hero_ocean.jpg"
              imageAlt="Golden sunlight glistening on ocean waters"
              title="Liquid Amber Horizon"
              coords="284° WNW · 18:15"
              stampLocation="SUNSET"
              stampColor="sun"
              rotationDeg={2.5}
              aspectRatio="landscape"
            />
          </div>

          {/* Narrative Note (Columns 7-12) */}
          <div className="col-span-12 sm:col-span-6 lg:col-start-7 lg:col-span-5 relative mt-6 lg:-mt-20 z-30">
            <div className="p-6 bg-[#FAF6EE] text-[#0A2540] border border-[#E2D9C8] shadow-xl rounded-xs">
              <span className="text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#B45309] font-bold block mb-1.5">
                EXPEDITION HORIZON
              </span>
              <p className="font-serif text-xl text-[#0A2540] tracking-tight leading-snug mb-2">
                Sunset westbound on the Arabian Sea.
              </p>
              <p className="font-sans text-xs text-[#0A2540]/80 leading-relaxed font-light">
                Guests gather on the open teak sky deck with chilled refreshments as the day gently dissolves over open water.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
