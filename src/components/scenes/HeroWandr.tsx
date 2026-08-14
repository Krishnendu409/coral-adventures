"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WAYPOINTS } from "@/lib/expeditionData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroWandrProps {
  onOpenJourney?: () => void;
}

export function HeroWandr({ onOpenJourney }: HeroWandrProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroActionsRef = useRef<HTMLDivElement>(null);
  const waveMaskContainerRef = useRef<HTMLDivElement>(null);
  const discoveryCardRef = useRef<HTMLDivElement>(null);
  const coastPhotoRef = useRef<HTMLDivElement>(null);
  const contourTraceRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".hero-meta-top, .hero-main-title, .hero-subtext, .hero-actions, .discovery-card", { opacity: 1, y: 0 });
      return;
    }

    // 1. Initial Page Load Reveal
    gsap.fromTo(".hero-meta-top", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(heroSubtextRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: "power2.out" });
    gsap.fromTo(heroActionsRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: "power2.out" });

    // 2. Master Wandr Shoreline Wave Sweep Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.7,
      }
    });

    // A. 0.0 -> 0.35: Camera pushes into ocean, typography water-distorts into highlights
    tl.to(heroMediaRef.current, { scale: 1.15, duration: 0.35, ease: "none" }, 0)
      .to(heroTitleRef.current, {
        scaleX: 1.25,
        skewX: -5,
        filter: "blur(4px)",
        opacity: 0,
        y: -35,
        duration: 0.25,
        ease: "power2.in"
      }, 0.05)
      .to([heroSubtextRef.current, heroActionsRef.current, ".hero-meta-top", ".hero-meta-bottom"], {
        opacity: 0,
        y: 15,
        duration: 0.18,
        ease: "power1.in"
      }, 0.05);

    // B. 0.25 -> 0.75: The organic wave sweeps up across the full viewport, wiping Hero away cleanly
    tl.fromTo(waveMaskContainerRef.current,
      { yPercent: 0 },
      { yPercent: -100, duration: 0.55, ease: "power1.inOut" },
      0.25
    );

    // C. 0.35 -> 0.80: Coastline settles into place under the wave
    tl.fromTo(coastPhotoRef.current,
      { scale: 1.08 },
      { scale: 1.0, duration: 0.45, ease: "none" },
      0.35
    )
    .fromTo(contourTraceRef.current,
      { opacity: 0, strokeDashoffset: 1000 },
      { opacity: 0.85, strokeDashoffset: 0, duration: 0.3, ease: "power2.out" },
      0.65
    )
    // D. 0.70 -> 0.90: Discovery editorial plaque arrives smoothly
    .fromTo(discoveryCardRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
      0.68
    )
    .to({}, { duration: 0.25 });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-marine-espresso text-alabaster select-none"
    >
      {/* ========================================================================= */}
      {/* LAYER 0 (BASE): DISCOVERY — ST. MARY'S VOLCANIC BASALT ARCHIPELAGO       */}
      {/* ========================================================================= */}
      <div id="discover" className="absolute inset-0 w-full h-full flex items-center z-0">
        
        {/* Full-Bleed Basalt Coast Photo */}
        <div ref={coastPhotoRef} className="absolute inset-0 w-full h-full origin-center z-0 overflow-hidden">
          <Image
            src="/images/malpe_basalt_yacht.jpg"
            alt="St. Mary's Volcanic Basalt Formations & Malpe Coast"
            fill
            priority
            quality={92}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/85 via-transparent to-marine-espresso/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/60 via-transparent to-transparent w-full md:w-1/2 pointer-events-none" />
        </div>

        {/* Glowing Gold Basalt Contour Lines */}
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
              <stop offset="0%" stopColor="#EB6841" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FDB827" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EB6841" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path d="M 200 450 Q 380 320 520 480 T 850 420 T 1150 560 T 1380 490" />
          <path d="M 180 500 Q 390 380 540 520 T 870 470 T 1170 600 T 1400 530" />
          <path d="M 320 620 Q 500 510 680 640 T 1020 590 T 1320 700" />
        </svg>

        {/* Floating Luxury Editorial Plaque for Malpe Discovery */}
        <div className="relative z-10 editorial-grid w-full pointer-events-auto">
          <div 
            ref={discoveryCardRef}
            className="discovery-card col-span-12 md:col-span-8 lg:col-span-7 bg-alabaster/95 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-sand/80 shadow-[0_16px_40px_rgba(18,24,31,0.12)] text-marine-espresso max-w-2xl opacity-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-coral-orange" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-marine-espresso/70 uppercase font-semibold">
                01 / EXPEDITION VOYAGE · MALPE COAST
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-marine-espresso leading-[0.92] tracking-tight">
              BEYOND<br />
              THE SHORE.
            </h2>

            <div className="w-12 h-[2px] bg-coral-sun my-4" />

            <p className="font-sans text-xs sm:text-sm md:text-base text-marine-espresso/85 leading-relaxed font-light">
              Where the Karnataka coastline breaks into volcanic columnar basalt pillars, pristine island coves, and open sapphire water. Discover ancient geology and sheltered anchorages accessible exclusively by private expedition vessel.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-5 pt-3 border-t border-sand text-[9px] sm:text-[10px] md:text-[11px] font-mono text-marine-espresso/70 uppercase tracking-[0.18em]">
              <span>MALPE / {WAYPOINTS.malpeHarbor.coords}</span>
              <span className="w-1 h-1 rounded-full bg-coral-sun" />
              <span>COCONUT ISLE / {WAYPOINTS.coconutIsland.coords}</span>
              <span className="w-1 h-1 rounded-full bg-coral-sun" />
              <span>ARABIAN SEA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1 (TOP WIPER): HERO OCEAN & PROMINENT BRAND STATEMENTS              */}
      {/* ========================================================================= */}
      <div 
        ref={waveMaskContainerRef}
        className="absolute inset-0 w-full h-full z-10 overflow-hidden"
      >
        {/* Hero Content Stage */}
        <div 
          ref={heroLayerRef}
          className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between pt-24 pb-12"
        >
          {/* Hero Ocean Photo */}
          <div 
            ref={heroMediaRef} 
            className="absolute inset-0 w-full h-full origin-center z-0 overflow-hidden"
          >
            <Image
              src="/images/hero_ocean.jpg"
              alt="Sunlit Arabian Sea Ocean Horizon"
              fill
              priority
              quality={92}
              className="object-cover animate-[subtleDrift_20s_ease-in-out_infinite_alternate]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/75 via-transparent to-marine-espresso/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/70 via-transparent to-transparent w-full md:w-3/5 pointer-events-none" />
          </div>

          {/* Top Metadata Strip */}
          <div className="hero-meta-top relative z-10 editorial-grid items-center pt-4">
            <div className="col-span-12 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-alabaster/90 uppercase">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-ping" />
                MALPE HARBOR · {WAYPOINTS.malpeHarbor.coords}
              </span>
              <span className="hidden sm:inline text-coral-sun font-semibold">OCTOBER – MAY · CALM SEA EXPEDITION</span>
              <span>PRIVATE MARINE CHARTER</span>
            </div>
          </div>

          {/* Center Editorial Hero Typography */}
          <div className="hero-content-stack relative z-10 editorial-grid items-end my-auto">
            <div className="col-span-12 md:col-span-10 lg:col-span-9">
              
              <h1 
                ref={heroTitleRef}
                className="hero-main-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] tracking-tight text-alabaster drop-shadow-md will-change-transform"
              >
                CORAL<br />
                ADVENTURES
              </h1>

              {/* HIGHLY VISIBLE PROMINENT HERO STATEMENT */}
              <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
                <span className="w-8 sm:w-12 h-[2.5px] bg-gradient-to-r from-coral-sun to-coral-orange rounded-full shrink-0" />
                <p 
                  ref={heroSubtextRef}
                  className="hero-subtext font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-alabaster font-normal tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
                >
                  THE COAST IS ONLY THE BEGINNING.
                </p>
              </div>

              {/* CTAs */}
              <div 
                ref={heroActionsRef}
                className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6 mt-7 sm:mt-9"
              >
                {/* EXPLORE THE JOURNEY - Launches 5-Star Interactive Virtual Journey Route */}
                <Link
                  href="/journey"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-coral-sun to-coral-orange text-marine-espresso font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(253,184,39,0.35)] focus-visible:ring-2 focus-visible:ring-coral-sun focus-visible:outline-none rounded-xs"
                >
                  <span>EXPLORE THE JOURNEY</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
                
                <Link
                  href="#experiences"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-alabaster/50 bg-marine-espresso/40 backdrop-blur-md text-alabaster font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-coral-sun hover:bg-alabaster hover:text-marine-espresso active:scale-95 focus-visible:ring-2 focus-visible:ring-coral-sun focus-visible:outline-none rounded-xs"
                >
                  <span>VIEW EXPERIENCES</span>
                </Link>
              </div>

            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="hero-meta-bottom relative z-10 editorial-grid items-end">
            <div className="col-span-12 flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-alabaster/80 uppercase">
              <span>00 / DEPARTURE</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-sun animate-pulse" />
                <span>SCROLL TO ADVANCE</span>
              </div>
              <span>MALPE PORT</span>
            </div>
          </div>

          {/* Organic Wave Foam Crest at the bottom leading edge of the Hero layer */}
          <div className="absolute -bottom-1 left-0 right-0 h-24 sm:h-32 pointer-events-none z-20 overflow-hidden">
            <svg 
              className="w-full h-full drop-shadow-[0_-8px_16px_rgba(13,43,69,0.3)]"
              viewBox="0 0 1440 120" 
              fill="none" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,40 C280,110 520,10 800,70 C1080,120 1260,20 1440,50 L1440,120 L0,120 Z" 
                fill="#0D2B45" 
                fillOpacity="0.4"
              />
              <path 
                d="M0,60 C320,120 600,30 900,90 C1200,130 1340,40 1440,75 L1440,120 L0,120 Z" 
                fill="#FBFBF9" 
                fillOpacity="0.25"
              />
              <path 
                d="M0,80 C360,130 680,50 960,100 C1240,140 1380,60 1440,90 L1440,120 L0,120 Z" 
                fill="#FBFBF9" 
                fillOpacity="0.7"
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
