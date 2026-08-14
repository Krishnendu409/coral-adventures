"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CALLOUTS = [
  {
    number: "01",
    title: "Everything in one place",
    description: "Itinerary, custom provisions, marine permissions, and safety briefing organized seamlessly before boarding.",
    pos: "top-8 left-4 lg:left-12",
  },
  {
    number: "02",
    title: "Time management is our priority",
    description: "We optimize each voyage for smooth tidal passage, calm water anchorages, and perfect sunset timing.",
    pos: "top-12 right-4 lg:right-12",
  },
  {
    number: "03",
    title: "Your personal harbor concierge",
    description: "One dedicated contact in Malpe who coordinates transfers, bespoke dining preferences, and water activities.",
    pos: "bottom-44 left-4 lg:left-16",
  },
  {
    number: "04",
    title: "Certified marine safety",
    description: "Licensed ocean-certified captains, real-time weather radar, high-seas safety gear, and licensed tenders.",
    pos: "bottom-40 right-4 lg:right-16",
  },
  {
    number: "05",
    title: "Service that exceeds expectations",
    description: "We anticipate your needs before you voice them — from chilled deck refreshments to private island landings.",
    pos: "bottom-6 left-1/2 -translate-x-1/2 max-w-md text-center",
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
      { y: 50, scale: 0.95 },
      {
        y: -40,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="turnkey"
      className="relative w-full min-h-[900px] bg-[#0A2540] text-[#FAF6EE] py-28 sm:py-36 overflow-hidden border-b border-white/15"
    >
      {/* 1. Rich Ocean Photography & Liquid Turquoise Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Image
          src="/images/wave_foam_crest.jpg"
          alt="Turquoise ocean waves surface"
          fill
          className="object-cover object-center"
        />
      </div>
      
      {/* Turquoise to Deep Ocean Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0D9488]/85 via-[#0A2540]/90 to-[#0A2540] pointer-events-none" />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#FAF6EE_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 2. Header Telemetry */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-10 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-white/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-bold text-[#F59E0B]">TURNKEY EXPEDITION STANDARD</span>
          </div>
          <div className="flex items-center gap-4 text-white/80 font-semibold">
            <span>FULL CONCIERGE MARITIME MANAGEMENT</span>
            <span className="text-[#38BDF8]">MALPE HARBOR</span>
          </div>
        </div>
      </div>

      {/* 3. Main Centered Editorial Headline */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 text-center z-20 mb-14">
        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
          <span className="italic font-light text-white block mb-1">You just travel.</span>
          <span className="text-[#F59E0B]">We'll handle the rest.</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-white/85 max-w-lg mx-auto mt-4 leading-relaxed font-light">
          From private transfer coordination at Malpe pier to custom dietary curations and certified navigation across the Arabian Sea.
        </p>
      </div>

      {/* 4. Oceanic Arena with Center Catamaran Vessel & Orbiting Dotted Callouts */}
      <div className="relative w-full max-w-6xl mx-auto min-h-[750px] sm:min-h-[850px] px-4 flex items-center justify-center z-10">
        
        {/* Centered Top-Down Vessel Frame */}
        <div
          ref={vesselRef}
          className="relative z-10 w-64 sm:w-80 lg:w-96 aspect-[1/2] flex items-center justify-center will-change-transform"
        >
          {/* Hydrodynamic Wake Halo */}
          <div className="absolute inset-0 bg-[#38BDF8]/25 rounded-full blur-3xl pointer-events-none scale-125 animate-pulse" />
          
          <div className="relative w-full h-full overflow-hidden postcard-shadow border border-white/30 rounded-full p-2.5 bg-[#0A2540]/70 backdrop-blur-md">
            <Image
              src="/images/vessel_catamaran.jpg"
              alt="Architectural catamaran cutting through turquoise waters"
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              className="object-cover object-center rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-4 bg-[#FAF6EE] text-[#0A2540] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] font-bold shadow-xl whitespace-nowrap border border-[#E2D9C8]">
            CORAL EXPLORER · 25.90M CATAMARAN
          </div>
        </div>

        {/* Orbiting Dashed Annotation Callout Cards */}
        {CALLOUTS.map((callout, idx) => (
          <div
            key={idx}
            className={`absolute ${callout.pos} z-20 p-4 sm:p-5 bg-[#0A2540]/80 border border-dashed border-white/30 backdrop-blur-md max-w-xs shadow-2xl transition-transform duration-300 hover:scale-105 hover:border-[#F59E0B]`}
          >
            <span className="text-[10px] font-mono font-bold text-[#F59E0B] tracking-widest block mb-1">
              ({callout.number})
            </span>
            <h4 className="font-serif text-lg sm:text-xl text-white tracking-tight leading-snug mb-1.5">
              {callout.title}
            </h4>
            <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
              {callout.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
