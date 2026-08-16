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
  const archRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !archRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.fromTo(
      archRef.current,
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
      className="relative w-full bg-gradient-to-br from-[#0B514B] via-[#0E6C6E] to-[#0A3840] text-[#FAF6EE] pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-white/15"
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

      {/* 2. Cartographic Dot Matrix Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* 3. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-12 z-20">
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

      {/* 4. Centered Romantic Display Headline */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20 mb-16 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.94] mb-4">
            <span className="italic font-light block">You just travel.</span>
            <span className="font-normal text-[#EAB308] block">We'll handle the rest.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-xl mt-3">
            From private transfer coordination at Malpe pier to custom dietary curations and certified navigation across the Arabian Sea.
          </p>
        </div>
      </div>

      {/* 5. Asymmetric Trio: Left Card, Center Arch Window, Right Card */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Left Card: (01) Everything in one place */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-8">
            <div className="p-7 sm:p-8 bg-[#0A2540]/30 backdrop-blur-md border border-dashed border-white/25 rounded-xs hover:border-white/50 transition-all shadow-xl">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-2">
                (01)
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3">
                Everything in one place
              </h4>
              <p className="font-sans text-sm sm:text-[15px] text-white/85 leading-relaxed font-light">
                Itinerary, custom provisions, marine permissions, and safety briefing organized seamlessly before boarding.
              </p>
            </div>
          </div>

          {/* Center Arched Window Porthole */}
          <div
            ref={archRef}
            className="lg:col-span-4 relative flex flex-col items-center justify-center will-change-transform"
          >
            <div className="relative w-72 sm:w-80 h-[420px] sm:h-[480px] rounded-t-full rounded-b-xs overflow-hidden bg-[#0A2540] border-4 border-white/40 ring-8 ring-white/10 shadow-2xl group transition-transform duration-500 hover:scale-103">
              <Image
                src="/images/vessel_catamaran.jpg"
                alt="25.90M Catamaran flagship on Arabian Sea"
                fill
                sizes="(max-width: 1024px) 100vw, 340px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Centered Bottom Curved Capsule Badge */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FAF6EE] text-[#0A2540] px-4 py-1.5 rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold border border-[#E2D9C8] shadow-xl z-20">
                CORAL EXPLORER · 25.90M FLAGSHIP
              </div>
            </div>
          </div>

          {/* Right Card: (02) Time management is our priority */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-8">
            <div className="p-7 sm:p-8 bg-[#0A2540]/30 backdrop-blur-md border border-dashed border-white/25 rounded-xs hover:border-white/50 transition-all shadow-xl">
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-[0.2em] block mb-2">
                (02)
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3">
                Time management is our priority
              </h4>
              <p className="font-sans text-sm sm:text-[15px] text-white/85 leading-relaxed font-light">
                We optimize each voyage for smooth tidal passage, calm water anchorages, and perfect sunset timing.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
