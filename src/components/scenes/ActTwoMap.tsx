"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WAYPOINTS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ActTwoMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const foamWakeRef = useRef<SVGPathElement>(null);
  const chartUIRef = useRef<HTMLDivElement>(null);
  const destinationPulseRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !routeRef.current || !foamWakeRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([routeRef.current, foamWakeRef.current], { strokeDashoffset: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=190%",
        pin: true,
        scrub: 0.7,
      }
    });

    // 1. Route draws itself smoothly across the parchment chart (0.0 -> 0.6)
    const routeLength = routeRef.current.getTotalLength();
    gsap.set(routeRef.current, { strokeDasharray: routeLength, strokeDashoffset: routeLength });
    
    tl.to(routeRef.current, { strokeDashoffset: 0, duration: 0.6, ease: "none" }, 0.05);

    // 2. Pulse destination marker upon arrival (0.55 -> 0.7)
    tl.fromTo(destinationPulseRef.current, 
      { scale: 1, opacity: 0.4 }, 
      { scale: 2.2, opacity: 1, duration: 0.2, repeat: 1, yoyo: true, transformOrigin: "center" }, 
      0.55
    );

    // 3. Link 04: Route -> Accelerating Wake Transformation (0.65 -> 1.0)
    // The route stretches, chart UI dims, route line turns to stark white foaming wake
    const wakeLength = foamWakeRef.current.getTotalLength();
    gsap.set(foamWakeRef.current, { strokeDasharray: wakeLength, strokeDashoffset: wakeLength });

    tl.to(chartUIRef.current, { opacity: 0.15, scale: 0.98, duration: 0.35, ease: "power2.inOut" }, 0.65)
      .to(routeRef.current, { stroke: "#FFFFFF", strokeWidth: 4.5, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.9))", duration: 0.2 }, 0.68)
      .to(foamWakeRef.current, { strokeDashoffset: 0, duration: 0.35, ease: "power3.out" }, 0.72)
      .to(".wake-transition-badge", { opacity: 1, y: 0, duration: 0.25 }, 0.75);

  }, { scope: containerRef });

  return (
    <section 
      id="chart"
      ref={containerRef} 
      className="relative h-[100dvh] w-full overflow-hidden bg-linen text-marine-espresso select-none"
    >
      <div className="w-full h-full relative origin-center flex flex-col justify-between p-6 sm:p-10 md:p-16">
        
        {/* Tactile Parchment Texture & Bathymetric Grid */}
        <div className="absolute inset-0 bg-[#F4EFE6] z-0">
          {/* Subtle cartographic grid */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #E5DFD5 1px, transparent 1px), linear-gradient(to bottom, #E5DFD5 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        {/* The Luxury Nautical Chart UI */}
        <div ref={chartUIRef} className="relative z-10 flex flex-col justify-between h-full pointer-events-none transition-all duration-300">
          
          {/* Top Header & Verified Telemetry */}
          <div className="editorial-grid items-start pt-12 md:pt-14 pointer-events-auto">
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-coral-accent" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-marine-espresso/70 font-semibold">
                  02 / NAUTICAL EXPEDITION CHART
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-marine-espresso leading-[0.95] tracking-tight">
                WHERE THE COAST<br />MEETS THE WILD.
              </h2>
            </div>
            
            <div className="hidden md:flex md:col-span-5 justify-end">
              <div className="border border-sand bg-alabaster/95 backdrop-blur-sm p-4 flex flex-col gap-1.5 text-[10px] font-mono text-marine-espresso/75 shadow-xs">
                <span className="font-semibold text-marine-espresso">DEPARTURE: MALPE PIER · {WAYPOINTS.malpeHarbor.coords}</span>
                <span>DESTINATION: ARABIAN HORIZON · {WAYPOINTS.openArabianSea.coords}</span>
                <span>ARCHIPELAGO: ST. MARY'S COLUMNAR BASALT</span>
              </div>
            </div>
          </div>

          {/* Cartographic SVG Trajectory with Real Geography */}
          <div className="w-full flex flex-col items-center justify-center my-auto pointer-events-auto">
            <svg className="w-full max-w-5xl h-56 sm:h-72 md:h-96" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              
              {/* Depth Contours & Bathymetric Lines */}
              <path d="M40,360 Q280,330 480,250 T960,130" stroke="#DDD5C7" strokeWidth="1.2" strokeDasharray="3 5" />
              <path d="M40,310 Q300,280 500,200 T960,80" stroke="#DDD5C7" strokeWidth="1" strokeDasharray="2 4" />
              <path d="M40,260 Q320,230 520,150 T960,30" stroke="#DDD5C7" strokeWidth="0.8" strokeDasharray="2 6" />
              
              {/* Reference Grid Latitude / Longitude lines */}
              <line x1="120" y1="40" x2="120" y2="360" stroke="#DDD5C7" strokeWidth="0.6" strokeDasharray="1 3" />
              <line x1="520" y1="40" x2="520" y2="360" stroke="#DDD5C7" strokeWidth="0.6" strokeDasharray="1 3" />
              <line x1="880" y1="40" x2="880" y2="360" stroke="#DDD5C7" strokeWidth="0.6" strokeDasharray="1 3" />
              
              {/* St. Mary's Basalt Islands Graphic Outlines */}
              <path d="M490,190 L515,175 L535,185 L540,210 L520,225 L495,215 Z" fill="#DDD5C7" fillOpacity="0.4" stroke="#C5A880" strokeWidth="1.2" />
              <path d="M545,170 L560,160 L572,168 L568,182 L552,185 Z" fill="#DDD5C7" fillOpacity="0.4" stroke="#C5A880" strokeWidth="1" />
              
              {/* The Active Trajectory Line (Coral Brand Accent -> White Foam) */}
              <path 
                ref={routeRef}
                d="M120,330 Q360,280 520,195 T880,95" 
                stroke="#E07A5F" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="drop-shadow-xs"
              />
              
              {/* Waypoint Markers */}
              {/* 1. Malpe Harbor Pier */}
              <circle cx="120" cy="330" r="5" fill="#12181F" />
              <circle cx="120" cy="330" r="9" stroke="#E07A5F" strokeWidth="1.2" />
              <text x="138" y="335" fill="#12181F" fontSize="11" letterSpacing="0.15em" fontFamily="monospace" fontWeight="600" className="hidden sm:inline">
                MALPE HARBOR PIER (13°21′N)
              </text>
              
              {/* 2. St. Mary's Archipelago */}
              <circle cx="520" cy="195" r="4" fill="#C5A880" />
              <text x="535" y="190" fill="#12181F" fontSize="10" letterSpacing="0.15em" fontFamily="monospace" opacity="0.9" className="hidden sm:inline">
                ST. MARY'S ISLES · BASALT PILLARS
              </text>
              
              {/* 3. Open Arabian Sea Destination Marker */}
              <circle ref={destinationPulseRef} cx="880" cy="95" r="5.5" fill="#E07A5F" />
              <circle cx="880" cy="95" r="11" stroke="#E07A5F" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="690" y="85" fill="#12181F" fontSize="11" letterSpacing="0.15em" fontFamily="monospace" fontWeight="600" className="hidden sm:inline">
                EXPEDITION HORIZON (13°22′N 74°35′E)
              </text>
            </svg>

            {/* Mobile Waypoint Bar */}
            <div className="sm:hidden flex flex-col gap-2 w-full mt-4 bg-alabaster/95 p-3.5 border border-sand text-[10px] font-mono text-marine-espresso">
              <div className="flex justify-between items-center border-b border-sand pb-1.5">
                <span className="font-semibold">01 · MALPE PIER</span>
                <span className="text-marine-espresso/70">{WAYPOINTS.malpeHarbor.coords}</span>
              </div>
              <div className="flex justify-between items-center border-b border-sand pb-1.5 text-champagne-dark font-medium">
                <span>02 · ST. MARY'S ISLES</span>
                <span>BASALT COLUMNS</span>
              </div>
              <div className="flex justify-between items-center text-coral-accent font-semibold">
                <span>03 · ARABIAN HORIZON</span>
                <span>{WAYPOINTS.openArabianSea.coords}</span>
              </div>
            </div>
          </div>

          {/* Bottom Chart Legend */}
          <div className="editorial-grid items-end pb-4 sm:pb-6 pointer-events-auto">
            <div className="col-span-12 md:col-span-6 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] font-mono text-marine-espresso/75 uppercase tracking-[0.18em]">
              <span>EXPEDITION TRAJECTORY: 14.8 NAUTICAL MILES</span>
              <span className="w-1 h-1 rounded-full bg-coral-accent" />
              <span>HEADING: 284° WESTBOUND</span>
            </div>
          </div>
        </div>

        {/* Expanding Catamaran Twin Wake Layer (Link 04 -> 05) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full max-w-5xl" viewBox="0 0 1000 400" fill="none" aria-hidden="true">
            {/* Twin Foaming Catamaran Wake Lines */}
            <path 
              ref={foamWakeRef}
              d="M0,200 Q450,190 1000,160" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 12px rgba(255,255,255,0.85))"
              opacity="0.95"
            />
            <path 
              d="M0,215 Q450,210 1000,240" 
              stroke="#FFFFFF" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="8 6"
              filter="drop-shadow(0 0 10px rgba(255,255,255,0.75))"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Wake Transition Badge */}
        <div className="wake-transition-badge absolute bottom-16 left-0 right-0 text-center opacity-0 translate-y-4 z-30 pointer-events-none transition-all duration-300">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-marine-espresso font-semibold bg-alabaster/95 px-5 py-2 border border-sand shadow-sm">
            THE ROUTE BECOMES THE WAKE · 25.90M CATAMARAN
          </span>
        </div>
      </div>
    </section>
  );
}
