"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NightComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nightPhotoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (nightPhotoRef.current) {
      gsap.to(nightPhotoRef.current, {
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
      id="night"
      className="relative w-full bg-[#071A2B] text-[#FAF6EE] py-28 sm:py-36 overflow-hidden border-b border-white/10"
    >
      {/* Ambient Starlight & Cyan Reflections */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C2410C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="font-bold text-[#0D9488]">09 / MIDNIGHT · DEEP SAPPHIRE SEA UNDER STARS</span>
          </div>
          <div className="flex items-center gap-4 text-white/70 font-semibold">
            <span>21:00 — LATE</span>
            <span className="text-[#F59E0B]">STAR NAVIGATION</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Typography */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none overflow-visible mb-6">
        <h2 className="font-serif text-[17vw] sm:text-[13vw] lg:text-[10.5vw] text-[#FAF6EE] leading-[0.78] tracking-[-0.03em] uppercase">
          NIGHT BELONGS TO THE SEA.
        </h2>
      </div>

      {/* 3. Deep Midnight Photographic Composition */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-4 sm:-mt-8 lg:-mt-12 z-20">
        <div className="editorial-grid items-start relative">
          
          <div className="col-span-12 lg:col-span-12 relative">
            <div
              ref={nightPhotoRef}
              className="relative w-full h-[55vh] sm:h-[68vh] lg:h-[78vh] overflow-hidden shadow-2xl border border-white/20 will-change-transform bg-[#051320]"
            >
              <Image
                src="/images/night_sapphire.jpg"
                alt="Deep sapphire midnight sea reflecting stars and moonlight with catamaran silhouettes"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 bg-[#071A2B]/90 text-[#FAF6EE] px-4 py-2 text-[9.5px] font-mono tracking-[0.2em] uppercase border border-white/20">
                MIDNIGHT SAPPHIRE · CELESTIAL SOUNDSCAPES
              </div>
            </div>
          </div>

          {/* Starlight Reflection Narrative */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative mt-8 z-30">
            <div className="p-6 bg-[#071A2B]/90 backdrop-blur-md border border-white/15 shadow-xl">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#0D9488] font-bold block mb-2">
                NIGHTFALL OBSERVATION
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#FAF6EE] leading-snug tracking-tight">
                "When the world on land falls quiet, the ocean begins its second act."
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/75 mt-3 leading-relaxed font-light">
                Under a canopy of coastal stars, curated ambient soundscapes drift across the teak deck. The sea glows in deep sapphire, and the city lights of Malpe flicker in the distance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
