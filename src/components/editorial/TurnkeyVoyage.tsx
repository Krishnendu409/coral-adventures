"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONCIERGE_PILLARS = [
  {
    number: "01",
    tag: "PORT CONCIERGE",
    title: "Malpe Port Berth #2",
    description: "Direct pier escort and private tender boarding with zero tourist congestion.",
  },
  {
    number: "02",
    tag: "NAVIGATION",
    title: "Swell & Tidal Calibration",
    description: "Departures synchronized with real-time Arabian Sea hydrodynamic charts for calm cruising.",
  },
  {
    number: "03",
    tag: "GASTRONOMY",
    title: "Karavali Coastal Provisions",
    description: "Fresh seafood, local spice pairings, and bespoke refreshments prepared for your voyage.",
  },
  {
    number: "04",
    tag: "SEAMANSHIP",
    title: "SOLAS Safety Standard",
    description: "Dual-certified Master Mariners, hydrographic radar, and high-seas life-saving equipment.",
  },
];

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
      { y: 25 },
      {
        y: -25,
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
      className="relative w-full bg-gradient-to-br from-[#0F4C47] via-[#0D6E6E] to-[#0A3B43] text-[#FAF6EE] py-20 sm:py-28 overflow-hidden border-b border-white/15"
    >
      {/* 1. Subtle Ocean Wave Surface Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
        <Image
          src="/images/wave_foam_crest.jpg"
          alt="Ocean surface water flow"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 2. Cartographic Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 3. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] sm:text-[10px] font-sans tracking-[0.24em] uppercase border-b border-white/20 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-semibold text-white/95 tracking-[0.24em]">TURNKEY EXPEDITION STANDARD</span>
          </div>
          <div className="flex items-center gap-4 text-white/80 font-medium">
            <span>FULL CONCIERGE MARITIME MANAGEMENT</span>
            <span className="text-[#38BDF8] font-bold">MALPE HARBOR</span>
          </div>
        </div>
      </div>

      {/* 4. Centered Romantic Display Headline */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20 mb-14 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95] mb-3">
            <span className="italic font-light block">You just travel.</span>
            <span className="font-normal text-[#C5A059] block">We'll handle the rest.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed font-light max-w-xl mt-3">
            From private transfer coordination at Malpe pier to custom dietary curations and certified navigation across the Arabian Sea.
          </p>
        </div>
      </div>

      {/* 5. Asymmetric Concierge Pillars Grid with Centered Circular Vessel Porthole */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="editorial-grid items-center gap-6 lg:gap-8">
          
          {/* Left 2 Pillars */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            {CONCIERGE_PILLARS.slice(0, 2).map((item) => (
              <div
                key={item.number}
                className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#38BDF8]/60 transition-all rounded-xs shadow-lg"
              >
                <div className="flex items-center justify-between text-[8.5px] font-sans tracking-[0.2em] uppercase text-[#38BDF8] font-bold mb-2">
                  <span>{item.number} / {item.tag}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Circular Vessel Porthole */}
          <div
            ref={vesselRef}
            className="col-span-12 lg:col-span-4 relative flex flex-col items-center justify-center will-change-transform py-4"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-[#0A2540] border-4 border-white/40 ring-8 ring-white/10 shadow-2xl group transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/vessel_catamaran.jpg"
                alt="25.90M Catamaran flagship on Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Centered Bottom Curved Capsule Badge */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FAF6EE] text-[#0A2540] px-4 py-1.5 rounded-full font-sans text-[8.5px] uppercase tracking-[0.2em] font-semibold border border-[#E2D9C8] shadow-xl z-20">
                CORAL EXPLORER · 25.90M
              </div>
            </div>
          </div>

          {/* Right 2 Pillars */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            {CONCIERGE_PILLARS.slice(2, 4).map((item) => (
              <div
                key={item.number}
                className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#38BDF8]/60 transition-all rounded-xs shadow-lg"
              >
                <div className="flex items-center justify-between text-[8.5px] font-sans tracking-[0.2em] uppercase text-[#38BDF8] font-bold mb-2">
                  <span>{item.number} / {item.tag}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
