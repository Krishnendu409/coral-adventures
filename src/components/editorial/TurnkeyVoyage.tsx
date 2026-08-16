"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TurnkeyVoyage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vesselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !vesselRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.fromTo(
      vesselRef.current,
      { y: 20 },
      {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="turnkey"
      className="relative w-full min-h-[960px] bg-gradient-to-b from-[#093540] via-[#0B4A54] to-[#06202B] text-[#FAF6EE] pt-24 sm:pt-32 pb-24 sm:pb-36 overflow-hidden border-b border-white/15"
    >
      {/* 1. Rich Ocean Wave Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
        <Image
          src="/images/wave_foam_crest.jpg"
          alt="Ocean surface water flow"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 2. Cartographic Dot Matrix Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 3. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-sans tracking-[0.26em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-white tracking-[0.26em]">TURNKEY EXPEDITION STANDARD</span>
          </div>
          <div className="flex items-center gap-4 text-white/85 font-medium">
            <span>FULL CONCIERGE MARITIME MANAGEMENT</span>
            <span className="text-[#38BDF8] font-bold">MALPE HARBOR</span>
          </div>
        </div>
      </div>

      {/* 4. Main Centered Editorial Headline */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 text-center z-20 mb-14 sm:mb-20">
        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.94] max-w-4xl mx-auto">
          <span className="italic font-light block mb-1">You just travel.</span>
          <span className="font-normal text-[#EAB308] block">We'll handle the rest.</span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-xl mx-auto mt-4">
          From private transfer coordination at Malpe pier to custom dietary curations and certified navigation across the Arabian Sea.
        </p>
      </div>

      {/* 5. Oceanic Spatial Arena with Centered Vessel & 5 Positioned Boxes (Always Visible) */}
      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 z-10">
        
        {/* Desktop Layout: Spatial positioning exactly matching attached reference */}
        <div className="hidden lg:block relative min-h-[760px]">
          
          {/* Top-Left Box: (01) */}
          <div className="absolute top-6 left-4 xl:left-10 z-20 p-6 bg-[#071E2E]/90 backdrop-blur-md border border-dotted border-white/30 rounded-xs max-w-xs shadow-2xl transition-all duration-300 hover:border-white/60">
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1.5">
              (01)
            </span>
            <h4 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
              Everything in one place
            </h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
              Itinerary, custom provisions, marine permissions, and safety briefing organized seamlessly before boarding.
            </p>
          </div>

          {/* Top-Right Box: (02) */}
          <div className="absolute top-10 right-4 xl:right-10 z-20 p-6 bg-[#071E2E]/90 backdrop-blur-md border border-dotted border-white/30 rounded-xs max-w-xs shadow-2xl transition-all duration-300 hover:border-white/60">
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1.5">
              (02)
            </span>
            <h4 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
              Time management is our priority
            </h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
              We optimize each voyage for smooth tidal passage, calm water anchorages, and perfect sunset timing.
            </p>
          </div>

          {/* Center Cathedral Arch Vessel Window */}
          <div
            ref={vesselRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-80 xl:w-96 h-[540px] xl:h-[580px] flex items-center justify-center will-change-transform"
          >
            <div className="absolute inset-0 bg-[#38BDF8]/20 rounded-t-full rounded-b-xs blur-3xl pointer-events-none scale-110" />
            
            <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-xs border-4 border-white/40 ring-8 ring-white/10 shadow-2xl bg-[#0A2540] group">
              <Image
                src="/images/vessel_catamaran.jpg"
                alt="25.90M Catamaran flagship sailing on Arabian Sea"
                fill
                sizes="400px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061A24]/75 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#FAF6EE] text-[#0A2540] px-5 py-2 rounded-full font-sans text-[9px] uppercase tracking-[0.22em] font-bold shadow-2xl whitespace-nowrap border border-[#E2D9C8] z-20">
              CORAL EXPLORER · 25.90M CATAMARAN
            </div>
          </div>

          {/* Bottom-Left Box: (03) Matching Screenshot */}
          <div className="absolute bottom-16 left-4 xl:left-10 z-20 p-6 bg-[#071E2E]/90 backdrop-blur-md border border-dotted border-white/30 rounded-xs max-w-xs shadow-2xl transition-all duration-300 hover:border-white/60">
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1.5">
              (03)
            </span>
            <h4 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
              Your personal harbor concierge
            </h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
              One dedicated contact in Malpe who coordinates transfers, bespoke dining preferences, and water activities.
            </p>
          </div>

          {/* Bottom-Right Box: (04) Matching Screenshot */}
          <div className="absolute bottom-12 right-4 xl:right-10 z-20 p-6 bg-[#071E2E]/90 backdrop-blur-md border border-dotted border-white/30 rounded-xs max-w-xs shadow-2xl transition-all duration-300 hover:border-white/60">
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1.5">
              (04)
            </span>
            <h4 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
              Certified marine safety
            </h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
              Licensed ocean-certified Master Mariners, hydrographic charts, high-seas safety gear, and 24/7 shoreward tracking.
            </p>
          </div>

          {/* Center-Bottom Box: (05) Overlapping Bottom of Boat Window Matching Screenshot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 p-6 bg-[#071E2E]/95 backdrop-blur-md border border-white/25 rounded-xs w-full max-w-md shadow-2xl transition-all duration-300 hover:border-white/50">
            <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1.5">
              (05)
            </span>
            <h4 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
              Seven-foot meals experience
            </h4>
            <p className="font-sans text-xs text-white/85 leading-relaxed font-light">
              We orchestrate 25.90M master chef preparations — from ancient spice pairings to private sunset cocktail saloons.
            </p>
          </div>

        </div>

        {/* Mobile & Tablet Responsive Grid (All 5 boxes clearly visible at all times) */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Centered Window */}
          <div className="relative w-72 sm:w-80 h-[440px] sm:h-[500px] rounded-t-full rounded-b-xs overflow-hidden border-4 border-white/40 ring-8 ring-white/10 shadow-2xl bg-[#0A2540]">
            <Image
              src="/images/vessel_catamaran.jpg"
              alt="25.90M Catamaran flagship sailing on Arabian Sea"
              fill
              sizes="340px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061A24]/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FAF6EE] text-[#0A2540] px-4 py-1.5 rounded-full font-sans text-[8.5px] uppercase tracking-[0.2em] font-bold shadow-xl whitespace-nowrap border border-[#E2D9C8]">
              CORAL EXPLORER · 25.90M
            </div>
          </div>

          {/* 5 Boxes Stacked Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="p-5 bg-[#071E2E]/90 border border-dotted border-white/30 rounded-xs">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1">(01)</span>
              <h4 className="font-serif text-lg text-white mb-1.5">Everything in one place</h4>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">Itinerary, custom provisions, marine permissions, and safety briefing organized seamlessly.</p>
            </div>
            <div className="p-5 bg-[#071E2E]/90 border border-dotted border-white/30 rounded-xs">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1">(02)</span>
              <h4 className="font-serif text-lg text-white mb-1.5">Time management is our priority</h4>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">We optimize each voyage for smooth tidal passage, calm water anchorages, and sunset timing.</p>
            </div>
            <div className="p-5 bg-[#071E2E]/90 border border-dotted border-white/30 rounded-xs">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1">(03)</span>
              <h4 className="font-serif text-lg text-white mb-1.5">Your personal harbor concierge</h4>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">One dedicated contact in Malpe who coordinates transfers, dining, and activities.</p>
            </div>
            <div className="p-5 bg-[#071E2E]/90 border border-dotted border-white/30 rounded-xs">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1">(04)</span>
              <h4 className="font-serif text-lg text-white mb-1.5">Certified marine safety</h4>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light">Licensed Master Mariners, hydrographic charts, safety gear, and 24/7 tracking.</p>
            </div>
            <div className="p-5 bg-[#071E2E]/95 border border-white/25 rounded-xs sm:col-span-2">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-1">(05)</span>
              <h4 className="font-serif text-lg text-white mb-1.5">Seven-foot meals experience</h4>
              <p className="font-sans text-xs text-white/85 leading-relaxed font-light">We orchestrate 25.90M master chef preparations — from spice pairings to sunset saloons.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
