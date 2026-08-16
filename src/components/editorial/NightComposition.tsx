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
      id="night"
      className="relative w-full bg-[#071A2B] text-[#FAF6EE] py-24 sm:py-32 overflow-hidden border-b border-white/10"
    >
      {/* Ambient Starlight Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.26em] uppercase border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
            <span className="font-bold text-white/95">09 / MIDNIGHT · DEEP SAPPHIRE SEA UNDER STARS</span>
          </div>
          <div className="flex items-center gap-4 text-white/75 font-mono font-medium">
            <span>21:00 — LATE</span>
            <span className="text-[#38BDF8]">CELESTIAL NAVIGATION</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Headline & Introduction */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-10 mb-12">
        <div className="editorial-grid items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.92] tracking-tight uppercase">
              Night belongs
              <br />
              <span className="italic font-light text-[#0D9488]">to the sea.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-2">
            <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed font-light max-w-lg">
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
              className="relative w-full h-[50vh] sm:h-[62vh] lg:h-[70vh] overflow-hidden shadow-2xl border border-white/20 will-change-transform bg-[#051320]"
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

        </div>
      </div>

      {/* 4. Midnight Field Note Narrative Floor */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mt-16 sm:mt-20 z-20">
        <div className="editorial-grid items-start border-t border-white/15 pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif text-2xl sm:text-4xl text-white tracking-tight leading-snug">
              &ldquo;Under the new moon, the only illumination is the phosphorescent wake of the twin hulls and the billion stars above.&rdquo;
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-3 lg:pt-1">
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Equipped with low-frequency acoustic engineering and dimmed amber chart lights, the Coral Explorer creates an intimate nocturnal voyage away from all coastal light pollution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
