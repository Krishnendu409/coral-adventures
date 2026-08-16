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
      id="night"
      className="relative w-full bg-[#071A2B] text-[#FAF6EE] py-20 sm:py-28 overflow-hidden border-b border-white/10"
    >
      {/* Ambient Starlight Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            <span className="font-semibold text-white/90">09 / MIDNIGHT · DEEP SAPPHIRE SEA UNDER STARS</span>
          </div>
          <div className="flex items-center gap-4 text-white/70 font-medium">
            <span>21:00 — LATE</span>
            <span>CELESTIAL NAVIGATION</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-8">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-tight uppercase">
              Night belongs
              <br />
              <span className="italic font-light text-[#0D9488]">to the sea.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-2">
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-lg">
              When the mainland falls quiet, the Arabian Sea opens its nocturnal theater. Starlight reflects across volcanic basalt cliffs as the catamaran drifts in deep sapphire calm.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Deep Midnight Photographic Composition */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-start relative">
          
          <div className="col-span-12 relative">
            <div
              ref={nightPhotoRef}
              className="relative w-full h-[46vh] sm:h-[58vh] lg:h-[66vh] overflow-hidden shadow-2xl border border-white/20 will-change-transform bg-[#051320]"
            >
              <Image
                src="/images/night_sapphire.jpg"
                alt="Deep sapphire midnight sea reflecting stars and moonlight with catamaran silhouettes"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#071A2B]/90 text-[#FAF6EE] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase border border-white/20">
                MIDNIGHT SAPPHIRE · CELESTIAL SOUNDSCAPES
              </div>
            </div>
          </div>

          {/* Starlight Reflection Note */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative mt-6 z-30">
            <div className="p-6 bg-[#071A2B]/90 backdrop-blur-xs border border-white/15 shadow-xl">
              <span className="text-[8.5px] font-sans uppercase tracking-[0.22em] text-[#0D9488] font-bold block mb-1.5">
                NOCTURNAL OBSERVATION
              </span>
              <p className="font-serif italic text-xl sm:text-2xl text-[#FAF6EE] leading-snug tracking-tight">
                "When the world on land falls quiet, the ocean begins its second act."
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/75 mt-2.5 leading-relaxed font-light">
                Under a canopy of coastal constellations, ambient celestial soundscapes drift across the teak sky lounge while the harbor lights of Malpe glow quietly along the horizon.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
