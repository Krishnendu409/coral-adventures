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

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const heroActionsRef = useRef<HTMLDivElement>(null);
  const waveCurtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".hero-meta-top, .hero-main-title, .hero-subtext, .hero-actions, .hero-meta-bottom", { opacity: 1, y: 0 });
      return;
    }

    // 1. Initial Page Load Reveal
    gsap.fromTo(".hero-meta-top", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(heroSubtextRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: "power2.out" });
    gsap.fromTo(heroActionsRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: "power2.out" });

    // 2. Bounded Hero Transition Timeline (Hero Active -> Camera Push & Water Dissolve -> Wave Curtain)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.7,
      }
    });

    // A. Camera push into water and typography water-refraction dissolve
    tl.to(heroMediaRef.current, { scale: 1.15, duration: 0.45, ease: "none" }, 0)
      .to(heroTitleRef.current, {
        scaleX: 1.25,
        skewX: -5,
        filter: "blur(4px)",
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: "power2.in"
      }, 0.05)
      .to([heroSubtextRef.current, heroActionsRef.current, ".hero-meta-top", ".hero-meta-bottom"], {
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: "power1.in"
      }, 0.05);

    // B. Physical wave curtain rises from bottom to physically transition into Discovery
    tl.fromTo(waveCurtainRef.current,
      { yPercent: 100 },
      { yPercent: -15, duration: 0.65, ease: "power1.inOut" },
      0.35
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100dvh] w-full overflow-hidden bg-marine-espresso text-alabaster select-none"
    >
      {/* 1. Full-Bleed Arabian Sea Ocean Photo with Subtle Ken Burns Movement */}
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
        {/* Subtle cinematic edge vignette only — Zero white haze! */}
        <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/70 via-transparent to-marine-espresso/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-espresso/60 via-transparent to-transparent w-full md:w-3/5 pointer-events-none" />
      </div>

      {/* 2. Top Metadata Strip */}
      <div className="hero-meta-top relative z-10 editorial-grid items-center pt-24">
        <div className="col-span-12 flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-alabaster/90 uppercase">
          <span>MALPE HARBOR · {WAYPOINTS.malpeHarbor.coords}</span>
          <span className="hidden sm:inline">OCTOBER – MAY · CALM SEA SEASON</span>
          <span>PRIVATE MARINE EXPEDITION</span>
        </div>
      </div>

      {/* 3. Center Editorial Hero Typography */}
      <div className="hero-content-stack relative z-10 editorial-grid items-end my-auto pb-12">
        <div className="col-span-12 md:col-span-10 lg:col-span-9">
          
          <h1 
            ref={heroTitleRef}
            className="hero-main-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] tracking-tight text-alabaster drop-shadow-sm will-change-transform"
          >
            CORAL<br />
            ADVENTURES
          </h1>

          <p 
            ref={heroSubtextRef}
            className="hero-subtext font-serif text-2xl sm:text-3xl md:text-4xl text-champagne-light italic mt-4 sm:mt-6 font-normal drop-shadow-sm"
          >
            THE COAST IS ONLY THE BEGINNING.
          </p>

          {/* CTAs */}
          <div 
            ref={heroActionsRef}
            className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10"
          >
            <Link
              href="#discover"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-alabaster text-marine-espresso font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-champagne hover:text-marine-espresso active:scale-95 shadow-md focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
            >
              <span>EXPLORE THE JOURNEY</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
            
            <Link
              href="#experiences"
              className="inline-flex items-center gap-3 px-6 py-3.5 border border-alabaster/40 bg-marine-espresso/30 backdrop-blur-sm text-alabaster font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-alabaster hover:bg-alabaster hover:text-marine-espresso active:scale-95 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
            >
              <span>VIEW EXPERIENCES</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="hero-meta-bottom relative z-10 editorial-grid items-end pb-8">
        <div className="col-span-12 flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-alabaster/80 uppercase">
          <span>00 / DEPARTURE</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-accent animate-pulse" />
            <span>SCROLL TO DISCOVER</span>
          </div>
          <span>MALPE PORT</span>
        </div>
      </div>

      {/* 5. Physical Wave Transition Curtain */}
      <div 
        ref={waveCurtainRef} 
        className="absolute inset-0 h-full w-full pointer-events-none z-20"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="relative w-full h-[120%] -top-[10%]">
          <Image
            src="/images/wave_foam_crest.jpg"
            alt="Wandr Shoreline Wave Sweep"
            fill
            quality={92}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-espresso/80 via-transparent to-marine-espresso/50" />
        </div>
      </div>
    </section>
  );
}
