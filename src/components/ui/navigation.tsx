"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { WAYPOINTS } from "@/lib/expeditionData";

interface NavigationProps {
  onOpenJourney?: () => void;
}

export function Navigation({ onOpenJourney }: NavigationProps) {
  const [themeState, setThemeState] = useState<"transparent" | "light" | "dark">("transparent");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Strategic Colored and Dark Chapters (White text / blur backdrop)
    const darkSections = ["typology", "turnkey", "vessel", "sunset", "night"];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 60) {
        setThemeState("transparent");
        return;
      }

      // Check which section is in view around the header line (y=80px)
      let currentTheme: "light" | "dark" = "light";
      const probeY = 90;

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom >= probeY) {
            currentTheme = "dark";
            break;
          }
        }
      }

      setThemeState(currentTheme);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "ARRIVAL", href: "#arrival" },
    { name: "THE COAST", href: "#coast" },
    { name: "WATERSPORTS", href: "#watersports" },
    { name: "CHART", href: "#chart" },
    { name: "THE VESSEL", href: "#vessel" },
    { name: "HORIZONS", href: "#sunset" },
    { name: "CONCIERGE", href: "#book" },
  ];

  const isDark = themeState === "dark";
  const isTransparent = themeState === "transparent";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out",
        isTransparent
          ? "bg-transparent py-5 text-[#0A2540]"
          : isDark
            ? "bg-[#0A2540]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg text-[#FAF6EE]"
            : "bg-[#FAF6EE]/90 backdrop-blur-md border-b border-[#E8DFD0] py-3.5 shadow-xs text-[#0A2540]"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Official Logo & Location */}
        <Link 
          href="/" 
          className="group flex items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:outline-hidden rounded-xs"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures Emblem"
              fill
              sizes="(max-width: 640px) 36px, 40px"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-lg sm:text-xl font-normal tracking-wide transition-colors",
              isDark ? "text-[#FAF6EE]" : "text-[#0A2540] group-hover:text-[#E05A36]"
            )}>
              CORAL ADVENTURES
            </span>
            <span className={cn(
              "text-[8.5px] sm:text-[9px] font-mono tracking-[0.25em] uppercase transition-colors",
              isDark ? "text-[#FAF6EE]/70" : "text-[#E05A36] font-semibold"
            )}>
              MALPE · ARABIAN SEA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[10.5px] font-mono tracking-[0.2em] font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative py-1 transition-colors duration-200 uppercase focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:outline-hidden",
                isDark 
                  ? "text-[#FAF6EE]/80 hover:text-[#FBBF24]" 
                  : "text-[#0A2540]/80 hover:text-[#E05A36]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Printed Editorial Instruction Links (No SaaS Pills) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Explore Journey Route Link */}
          <Link
            href="/journey"
            className={cn(
              "hidden md:inline-flex items-center gap-2.5 pb-0.5 border-b font-mono text-[9.5px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 group",
              isDark
                ? "border-[#FBBF24]/70 text-[#FBBF24] hover:border-white hover:text-white"
                : "border-[#0A2540]/50 text-[#0A2540] hover:border-[#E05A36] hover:text-[#E05A36]"
            )}
          >
            <span>EXPLORE JOURNEY</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <Link
            href="#book"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 px-4 py-2 border font-mono text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 active:scale-95",
              isDark
                ? "border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#0A2540]"
                : "border-[#0A2540] bg-transparent text-[#0A2540] hover:bg-[#0A2540] hover:text-[#FAF6EE]"
            )}
          >
            <span>RESERVE</span>
            <span className="text-xs">↗</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:outline-hidden rounded-xs transition-colors",
              isDark ? "text-[#FAF6EE]" : "text-[#0A2540]"
            )}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-full bg-[#0A2540]/98 backdrop-blur-xl border-b border-white/15 text-[#FAF6EE] p-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {onOpenJourney && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJourney();
              }}
              className="w-full text-center py-3 bg-[#FBBF24] text-[#0A2540] font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-xs shadow-md"
            >
              LAUNCH 5-STAR VIRTUAL JOURNEY →
            </button>
          )}

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#FAF6EE] hover:text-[#FBBF24] transition-colors border-b border-white/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <Link
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 border border-white text-[#FAF6EE] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-[#0A2540] transition-colors"
            >
              RESERVE EXPEDITION ↗
            </Link>
            <div className="text-[10px] font-mono text-[#FAF6EE]/60 text-center tracking-[0.2em]">
              MALPE · {WAYPOINTS.malpeHarbor.coords}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
