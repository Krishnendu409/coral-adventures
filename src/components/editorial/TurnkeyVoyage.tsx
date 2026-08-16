"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INFO_BLOCKS = [
  {
    number: "01",
    title: "Everything in one place",
    description: "Itinerary, custom provisions, marine permissions, and safety briefing organized seamlessly before boarding.",
  },
  {
    number: "02",
    title: "Time management is our priority",
    description: "We optimize each voyage for smooth tidal passage, calm water anchorages, and perfect sunset timing.",
  },
  {
    number: "03",
    title: "Your personal harbor concierge",
    description: "One dedicated contact in Malpe who coordinates transfers, bespoke dining preferences, and water activities.",
  },
  {
    number: "04",
    title: "Certified marine safety",
    description: "Licensed ocean-certified captains, real-time weather radar, high-seas safety gear, and licensed tenders.",
  },
];

export function TurnkeyVoyage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !photoRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Restrained, premium photo drift & scale
    gsap.fromTo(
      photoRef.current,
      { scale: 0.95, y: 30 },
      {
        scale: 1.0,
        y: -20,
        ease: "power1.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    // Subtle supporting notes drift
    noteRefs.current.forEach((el, idx) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 15 * (idx % 2 === 0 ? 1 : -1) },
        {
          y: -15 * (idx % 2 === 0 ? 1 : -1),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="turnkey"
      className="relative w-full py-24 sm:py-32 lg:py-40 text-[#FAF6EE] overflow-hidden border-b border-white/15"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 70% 40%, #1E6655 0%, transparent 60%),
          radial-gradient(circle at 15% 30%, #164F45 0%, transparent 50%),
          linear-gradient(175deg, #164F45 0%, #1E6655 45%, #123D3A 100%)
        `,
      }}
    >
      {/* Subtle organic paper/marine atmospheric grain */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#FAF6EE 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 mb-12 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.26em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-[#FDE68A]">TURNKEY EXPEDITION STANDARD</span>
          </div>
          <div className="flex items-center gap-4 text-white/85 font-semibold">
            <span>FULL CONCIERGE MARITIME MANAGEMENT</span>
            <span className="text-[#38BDF8]">MALPE HARBOR</span>
          </div>
        </div>
      </div>

      {/* 2. Unified Editorial Spread: Oversized Left Headline + Overlapping Right Hero Photograph + 4 Asymmetric Notes */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14 min-h-[700px] lg:min-h-[880px]">
        
        {/* Giant Left-Aligned Editorial Statement (Layers BEHIND the central photo) */}
        <div className="relative lg:absolute top-0 left-6 sm:left-10 lg:left-14 z-10 max-w-4xl select-none pointer-events-none">
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-[90px] text-white tracking-tight leading-[0.92] uppercase">
            You just travel.
            <br />
            <span className="italic font-normal text-[#F59E0B]">We&apos;ll handle the rest.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/80 max-w-md mt-5 leading-relaxed font-light hidden lg:block">
            From private transfer coordination at Malpe pier to custom provisions and certified navigation across the Arabian Sea.
          </p>
        </div>

        {/* Large Central Catamaran Hero Photograph (Layers ON TOP of headline, shifted right) */}
        <div className="relative z-20 mt-8 lg:mt-0 lg:absolute lg:top-8 lg:left-[38%] xl:left-[42%] w-full lg:w-[40vw] max-w-2xl pointer-events-auto">
          <div
            ref={photoRef}
            className="relative w-full h-[48vh] sm:h-[60vh] lg:h-[72vh] overflow-hidden bg-[#0A2540] border border-white/25 shadow-2xl rounded-xs will-change-transform"
          >
            <Image
              src="/images/vessel_catamaran.jpg"
              alt="25.90M catamaran vessel sailing in crystal waters"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[8.5px] font-sans tracking-[0.2em] uppercase font-bold border border-[#E2D9C8] shadow-md">
              CORAL EXPLORER · 25.90M CATAMARAN · MALPE BERTH
            </div>
          </div>
        </div>

        {/* Four Supporting Expedition Notes (Asymmetrically arranged around the central photo) */}
        
        {/* Desktop Asymmetric Placement Layer */}
        <div className="hidden lg:block relative z-30 pointer-events-auto">
          
          {/* Note 01 (Upper Left, beneath the first line of headline) */}
          <div
            ref={(el) => { noteRefs.current[0] = el; }}
            className="absolute top-[280px] left-0 max-w-xs p-5 bg-[#0E352F]/75 border border-white/15 backdrop-blur-xs rounded-xs shadow-xl transition-all duration-300 hover:border-[#F59E0B] hover:scale-[1.02]"
          >
            <span className="text-xs font-mono font-bold text-[#F59E0B] tracking-widest block mb-1.5">
              {INFO_BLOCKS[0].number}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
              {INFO_BLOCKS[0].title}
            </h3>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              {INFO_BLOCKS[0].description}
            </p>
          </div>

          {/* Note 02 (Top Right, above/right of catamaran photograph) */}
          <div
            ref={(el) => { noteRefs.current[1] = el; }}
            className="absolute -top-4 right-0 max-w-xs p-5 bg-[#0E352F]/75 border border-white/15 backdrop-blur-xs rounded-xs shadow-xl transition-all duration-300 hover:border-[#F59E0B] hover:scale-[1.02]"
          >
            <span className="text-xs font-mono font-bold text-[#F59E0B] tracking-widest block mb-1.5">
              {INFO_BLOCKS[1].number}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
              {INFO_BLOCKS[1].title}
            </h3>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              {INFO_BLOCKS[1].description}
            </p>
          </div>

          {/* Note 03 (Lower Left, under Note 01) */}
          <div
            ref={(el) => { noteRefs.current[2] = el; }}
            className="absolute top-[520px] left-4 max-w-xs p-5 bg-[#0E352F]/75 border border-white/15 backdrop-blur-xs rounded-xs shadow-xl transition-all duration-300 hover:border-[#F59E0B] hover:scale-[1.02]"
          >
            <span className="text-xs font-mono font-bold text-[#F59E0B] tracking-widest block mb-1.5">
              {INFO_BLOCKS[2].number}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
              {INFO_BLOCKS[2].title}
            </h3>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              {INFO_BLOCKS[2].description}
            </p>
          </div>

          {/* Note 04 (Lower Right, floating below photo on right) */}
          <div
            ref={(el) => { noteRefs.current[3] = el; }}
            className="absolute top-[580px] right-2 max-w-xs p-5 bg-[#0E352F]/75 border border-white/15 backdrop-blur-xs rounded-xs shadow-xl transition-all duration-300 hover:border-[#F59E0B] hover:scale-[1.02]"
          >
            <span className="text-xs font-mono font-bold text-[#F59E0B] tracking-widest block mb-1.5">
              {INFO_BLOCKS[3].number}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2">
              {INFO_BLOCKS[3].title}
            </h3>
            <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
              {INFO_BLOCKS[3].description}
            </p>
          </div>

        </div>

        {/* Mobile & Tablet Flow (Clean responsive stack) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:hidden relative z-30">
          {INFO_BLOCKS.map((block) => (
            <div
              key={block.number}
              className="p-5 bg-[#0E352F]/80 border border-white/15 backdrop-blur-xs rounded-xs shadow-lg"
            >
              <span className="text-xs font-mono font-bold text-[#F59E0B] tracking-widest block mb-1.5">
                {block.number}
              </span>
              <h3 className="font-serif text-xl text-white tracking-tight leading-snug mb-2">
                {block.title}
              </h3>
              <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
