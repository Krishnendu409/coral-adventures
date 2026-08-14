"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoardingPassStub } from "./ephemera/BoardingPassStub";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WatersportsComposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const waveCrestRef = useRef<HTMLDivElement>(null);
  const underwaterRef = useRef<HTMLDivElement>(null);
  const titleWaterRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (waveCrestRef.current) {
      gsap.to(waveCrestRef.current, {
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (underwaterRef.current) {
      gsap.to(underwaterRef.current, {
        y: -40,
        rotate: 2,
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
      id="watersports"
      className="relative w-full bg-[#FAF6EE] text-[#0A2540] py-24 sm:py-32 overflow-hidden border-b border-[#E2D9C8]"
    >
      {/* Subtle Cyan Shallows Gradient Flow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE] via-[#0D9488]/10 to-[#FAF6EE] pointer-events-none" />

      {/* 1. Header Telemetry Bar */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 mb-8 z-20">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase border-b border-[#0A2540]/15 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
            <span className="font-bold text-[#0D9488]">03 / THE WATER · ACTIVE EXPEDITION DYNAMICS</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A2540]/70 font-semibold">
            <span>VELOCITY: 24 KNOTS</span>
            <span className="text-[#0D9488]">TURQUOISE SHALLOWS</span>
          </div>
        </div>
      </div>

      {/* 2. Colossal Display Typography: WATER MOVES */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 z-10 select-none overflow-visible mb-6">
        <h2
          ref={titleWaterRef}
          className="font-serif text-[17vw] sm:text-[14vw] lg:text-[13vw] text-[#0A2540] leading-[0.78] tracking-[-0.03em] uppercase will-change-transform"
        >
          WATER MOVES.
        </h2>
      </div>

      {/* 3. Photographic Plate Collision + Watersports Ticket Stub */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 -mt-6 sm:-mt-12 lg:-mt-18 z-20">
        <div className="editorial-grid items-start relative">
          
          {/* Primary High-Velocity Wave Crest Image (Columns 2-11) */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 relative">
            <div
              ref={waveCrestRef}
              className="relative w-full h-[50vh] sm:h-[62vh] lg:h-[72vh] overflow-hidden postcard-shadow border border-[#E2D9C8] will-change-transform bg-[#F2ECE1]"
            >
              <Image
                src="/images/wave_foam_crest.jpg"
                alt="Turquoise ocean waves with dynamic sea foam cresting under tropical sunlight"
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#FAF6EE]/95 backdrop-blur-xs text-[#0A2540] px-3.5 py-1.5 text-[9px] font-mono tracking-[0.2em] uppercase border border-[#E2D9C8]">
                HYDRODYNAMIC SPRAY · MALPE SPEED HORIZON
              </div>
            </div>
          </div>

          {/* Colliding Underwater Crystalline Marine Frame (Columns 6-12) */}
          <div
            ref={underwaterRef}
            className="col-span-11 sm:col-span-7 lg:col-start-6 lg:col-span-6 relative -mt-20 sm:-mt-32 lg:-mt-44 z-30 pointer-events-auto"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden postcard-shadow bg-[#FAF6EE] p-3 border border-[#E2D9C8]">
              <div className="relative w-full h-full overflow-hidden bg-[#F2ECE1]">
                <Image
                  src="/images/underwater_marine.jpg"
                  alt="Clear turquoise underwater view with sunlight rays piercing through crystalline tropical Arabian Sea water"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[8.5px] font-mono tracking-[0.18em] text-[#0A2540]/70 uppercase">
                <span>PLATE 03.B · CRYSTALLINE REEF CLARITY</span>
                <span>VISIBILITY: 18 METERS</span>
              </div>
            </div>
          </div>

          {/* Ephemera: Watersports Activity Ticket Stub (Columns 1-5) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative mt-6 lg:-mt-28 z-30">
            <BoardingPassStub
              passNumber="ACT-03-TURQUOISE"
              routeFrom="TENDER LAUNCH"
              routeTo="OPEN REEF SHALLOWS"
              departureTime="ON-DEMAND WATERSPORTS"
              vesselName="PARASAIL · SEA TENDER · KAYAK"
              season="ST. MARY'S ARCHIPELAGO"
              colorTheme="cyan"
            />
            <p className="font-serif italic text-sm text-[#0A2540]/80 mt-4 leading-relaxed max-w-sm">
              "The water is waiting. Jet skis cutting through white foam, parasails rising into the sky, and crystalline shallows inviting you in."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
