"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WAYPOINTS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ActTwoDiscovery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coastPhotoRef = useRef<HTMLDivElement>(null);
  const discoveryCardRef = useRef<HTMLDivElement>(null);
  const contourTraceRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".discovery-card", { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.7,
      }
    });

    // 1. Gentle camera drift on basalt coastline
    tl.fromTo(coastPhotoRef.current,
      { scale: 1.08 },
      { scale: 1.0, duration: 1, ease: "none" },
      0
    );

    // 2. Basalt rock edge contours draw in glowing champagne gold
    tl.fromTo(contourTraceRef.current,
      { opacity: 0, strokeDashoffset: 1000 },
      { opacity: 0.85, strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
      0.2
    );

    // 3. Editorial plaque subtle parallax
    tl.fromTo(discoveryCardRef.current,
      { y: 30, opacity: 0.85 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      0.1
    );

  }, { scope: containerRef });

  return (
    <section 
      id="discover"
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full overflow-hidden bg-marine-espresso text-alabaster select-none flex items-center py-24"
    >
      {/* 1. Full-Bleed St. Mary's Volcanic Basalt Coastline Photograph */}
      <div ref={coastPhotoRef} className="absolute inset-0 w-full h-full origin-center z-0">
        <Image
          src="/images/malpe_basalt_yacht.jpg"
          alt="St. Mary's Volcanic Basalt Formations & Malpe Coast"
          fill
          priority
          quality={92}
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle cinematic edge vignette only — Zero white haze! */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/85 via-transparent to-marine-espresso/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/60 via-transparent to-transparent w-full md:w-1/2 pointer-events-none" />
      </div>

      {/* 2. SVG Basalt Edge Contours (Pre-map transformation) */}
      <svg 
        ref={contourTraceRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-5 opacity-0"
        viewBox="0 0 1440 900" 
        fill="none" 
        stroke="url(#basaltContourGrad)"
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      >
        <defs>
          <linearGradient id="basaltContourGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C5A880" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E07A5F" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d="M 200 450 Q 380 320 520 480 T 850 420 T 1150 560 T 1380 490" />
        <path d="M 180 500 Q 390 380 540 520 T 870 470 T 1170 600 T 1400 530" />
        <path d="M 320 620 Q 500 510 680 640 T 1020 590 T 1320 700" />
      </svg>

      {/* 3. Floating Luxury Editorial Plaque for Malpe Discovery */}
      <div className="relative z-10 editorial-grid pb-12 sm:pb-16 md:pb-20 pt-24 pointer-events-auto">
        <div 
          ref={discoveryCardRef}
          className="discovery-card col-span-12 md:col-span-8 lg:col-span-7 bg-alabaster/95 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-sand/80 shadow-[0_16px_40px_rgba(18,24,31,0.12)] text-marine-espresso max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-coral-accent" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-marine-espresso/70 uppercase font-semibold">
              01 / EXPEDITION VOYAGE · MALPE COAST
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-marine-espresso leading-[0.92] tracking-tight">
            BEYOND<br />
            THE SHORE.
          </h2>

          <div className="w-12 h-[1.5px] bg-champagne my-4" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-marine-espresso/85 leading-relaxed font-light">
            Where the Karnataka coastline breaks into volcanic columnar basalt pillars, pristine island coves, and open sapphire water. Discover ancient geology and sheltered anchorages accessible exclusively by private expedition vessel.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-5 pt-3 border-t border-sand text-[9px] sm:text-[10px] md:text-[11px] font-mono text-marine-espresso/70 uppercase tracking-[0.18em]">
            <span>MALPE / {WAYPOINTS.malpeHarbor.coords}</span>
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>COCONUT ISLE / {WAYPOINTS.coconutIsland.coords}</span>
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>ARABIAN SEA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
