"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WAYPOINTS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ArrivalComposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const copyLeftRef = useRef<HTMLDivElement>(null);
  const copyRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Parallax motion for background image
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        yPercent: 18,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    // Upward drift and soft fade for colossal typography
    if (wordmarkRef.current) {
      gsap.to(wordmarkRef.current, {
        y: -40,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Subtle physical float for the Coral Orange ticket
    if (ticketRef.current) {
      gsap.to(ticketRef.current, {
        y: -25,
        rotate: -4,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative w-full h-screen min-h-[680px] lg:min-h-[780px] flex flex-col justify-between overflow-hidden bg-[#0A2540] text-[#FAF6EE] select-none"
    >
      {/* 1. Full-Viewport Photographic Background (Edge-to-Edge Cinematic World) */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 -top-8 -bottom-8 w-full h-[115%] z-0 will-change-transform"
      >
        <Image
          src="/images/hero_ocean.jpg"
          alt="Panoramic coastal Arabian Sea waves and golden hour horizon at Malpe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        {/* Art-Directed Warm Coastal Atmospheric Gradients (Enhancing typography legibility while keeping natural vibrancy) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-[#0A2540]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/30 via-transparent to-[#0A2540]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0A2540]/50 pointer-events-none" />
      </div>

      {/* 2. Top Archival Telemetry Bar (Floats below main navigation) */}
      <div className="relative w-full z-20 pt-20 sm:pt-24 px-4 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#FAF6EE]/85 border-b border-white/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E05A36] animate-pulse" />
            <span className="font-bold text-[#FAF6EE]">
              MALPE EXPEDITION BASE · {WAYPOINTS.malpeHarbor.coords}
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70 font-medium">
            <span className="hidden sm:inline">OCTOBER — MAY CALM SEA SEASON</span>
            <span className="text-[#38BDF8]">ARABIAN SEA EXPEDITION</span>
          </div>
        </div>
      </div>

      {/* 3. Center Hero Composition: Colossal Wordmark + Physical Expedition Ticket */}
      <div className="relative w-full z-20 my-auto px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center">
        <div className="relative w-full text-center flex flex-col items-center">

          {/* Colossal Display Serif Wordmark (Magazine-Cover Scale, 85-95% Viewport Width) */}
          <h1
            ref={wordmarkRef}
            className="font-serif text-[13.5vw] sm:text-[12.8vw] lg:text-[12vw] text-[#FFFDF9] leading-[0.82] tracking-[-0.035em] uppercase drop-shadow-[0_4px_24px_rgba(10,37,64,0.65)] select-none whitespace-nowrap will-change-transform"
          >
            CORAL ADVENTURES
          </h1>

          {/* Overlapping Physical Coral Expedition Ticket (Angled, Serrated Ticket Notches) */}
          <div
            ref={ticketRef}
            className="relative -mt-[5vw] sm:-mt-[4.5vw] lg:-mt-[4vw] z-30 pointer-events-auto transform -rotate-6 hover:rotate-0 transition-transform duration-300 shadow-2xl"
          >
            {/* Very Subtle Red Expedition Thread Anchor */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#DC2626]/80" />
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#DC2626]" />

            {/* Ticket Card */}
            <div className="relative bg-[#E05A36] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-[2px] border border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
              {/* Notched perforated left and right ticket cutouts */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0A2540]/90" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0A2540]/90" />

              {/* Dashed Inner Border */}
              <div className="border border-dashed border-white/40 px-3 py-1 flex flex-col items-center text-center">
                <span className="text-[7.5px] sm:text-[8.5px] font-mono tracking-[0.28em] uppercase text-white/90 font-bold mb-0.5">
                  WELCOME TO
                </span>
                <span className="font-serif text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                  CORAL EXPEDITION
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.22em] uppercase text-white/80 mt-1 border-t border-white/25 pt-0.5">
                  MALPE · ARABIAN SEA · 2026
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Two Small Supporting Editorial Blocks (Left & Right) */}
      <div className="relative w-full z-20 px-4 sm:px-8 lg:px-14 mb-4">
        <div className="grid grid-cols-12 gap-6 items-end justify-between">
          
          {/* Left Block: Expedition Statement */}
          <div ref={copyLeftRef} className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-1 text-left">
            <span className="text-[9px] sm:text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#F59E0B] font-semibold">
              EXPEDITION ATELIER
            </span>
            <p className="font-sans text-xs sm:text-[13px] text-[#FAF6EE]/90 font-light leading-relaxed max-w-sm drop-shadow-sm">
              Website design for a high-end coastal expedition atelier redefining what it means to travel the Arabian Sea.
            </p>
          </div>

          {/* Right Block: Brand Proposition */}
          <div ref={copyRightRef} className="col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-col gap-1 text-left sm:text-right">
            <span className="text-[9px] sm:text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#38BDF8] font-semibold">
              CORAL ADVENTURES IS
            </span>
            <p className="font-sans text-xs sm:text-[13px] text-[#FAF6EE]/90 font-light leading-relaxed max-w-md ml-auto drop-shadow-sm">
              A private coastal expedition whose philosophy centers around personalization, silent twin-hull passage, and Karnataka&apos;s untouched volcanic basalt archipelago.
            </p>
          </div>

        </div>
      </div>

      {/* 5. Bottom Scroll Cue with Full-Width Horizontal Rule */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono tracking-[0.25em] text-[#FAF6EE]/80 uppercase border-t border-white/20 pt-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36] animate-ping" />
            <span className="font-bold text-[#FAF6EE]">SCROLL TO BEGIN THE EXPEDITION</span>
          </div>

          {/* Long Horizontal Rule with Arrow */}
          <div className="w-full h-px bg-white/20 relative mx-2 hidden sm:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/60 rotate-45" />
          </div>

          <div className="shrink-0 flex items-center gap-3 text-white/60 text-[9px] tracking-[0.2em]">
            <span className="hidden md:inline">MALPE PORT OF REGISTRY</span>
            <span>PORT 01</span>
          </div>
        </div>
      </div>

    </section>
  );
}
