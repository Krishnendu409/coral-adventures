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

      if (scrollY < 40) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isTransparent
          ? "bg-[#FAF7F0]/80 backdrop-blur-xs py-4 sm:py-5 text-[#0A2540] border-b border-[#0A2540]/10"
          : isDark
            ? "bg-[#0A2540]/94 backdrop-blur-lg border-b border-white/15 py-3 sm:py-3.5 shadow-xl text-[#FAF6EE]"
            : "bg-[#FAF6EE]/94 backdrop-blur-lg border-b border-[#E8DFD0] py-3 sm:py-3.5 shadow-md text-[#0A2540]"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Official Logo & Location */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 sm:gap-3.5 focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:outline-hidden rounded-xs"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures Emblem"
              fill
              sizes="(max-width: 640px) 32px, 40px"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-base sm:text-lg md:text-xl font-normal tracking-wide transition-colors",
              isDark ? "text-[#FAF6EE]" : "text-[#0A2540] group-hover:text-[#E05A36]"
            )}>
              CORAL ADVENTURES
            </span>
            <span className={cn(
              "text-[8px] sm:text-[9px] font-mono tracking-[0.22em] uppercase transition-colors",
              isDark ? "text-[#FAF6EE]/75" : "text-[#E05A36] font-semibold"
            )}>
              MALPE · ARABIAN SEA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[10.5px] font-mono tracking-[0.2em] font-medium" aria-label="Main Navigation">
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

        {/* Uniform, Subtly-Highlighted Editorial Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Storyboard Dossier Button */}
          <Link
            href="/storyboard"
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 px-3.5 h-8 rounded-[2px] font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] font-medium border transition-all duration-200 active:scale-95",
              isDark
                ? "border-white/25 bg-white/5 text-[#FAF6EE]/90 hover:border-[#F87171] hover:text-[#F87171] hover:bg-white/10"
                : "border-[#0A2540]/25 bg-[#0A2540]/[0.03] text-[#0A2540]/85 hover:border-[#E05A36] hover:text-[#E05A36] hover:bg-[#E05A36]/5"
            )}
          >
            <span>STORYBOARD</span>
            <span className="text-[10px] opacity-70">↗</span>
          </Link>

          {/* 3D World Digital Twin Button */}
          <Link
            href="/journey"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3.5 h-8 rounded-[2px] font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] font-medium border transition-all duration-200 active:scale-95",
              isDark
                ? "border-white/25 bg-white/5 text-[#FAF6EE]/90 hover:border-[#FBBF24] hover:text-[#FBBF24] hover:bg-white/10"
                : "border-[#0A2540]/25 bg-[#0A2540]/[0.03] text-[#0A2540]/85 hover:border-[#0A2540] hover:text-[#0A2540] hover:bg-[#0A2540]/5"
            )}
          >
            <span>3D WORLD</span>
            <span className="text-[10px] opacity-70">→</span>
          </Link>

          {/* Reserve / Booking Button */}
          <Link
            href="#book"
            className={cn(
              "hidden lg:inline-flex items-center gap-1.5 px-3.5 h-8 rounded-[2px] font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] font-medium border transition-all duration-200 active:scale-95",
              isDark
                ? "border-white/25 bg-white/5 text-[#FAF6EE]/90 hover:border-white hover:bg-white hover:text-[#0A2540]"
                : "border-[#0A2540]/25 bg-[#0A2540]/[0.03] text-[#0A2540]/85 hover:border-[#0A2540] hover:bg-[#0A2540] hover:text-[#FAF6EE]"
            )}
          >
            <span>RESERVE</span>
            <span className="text-[10px] opacity-70">↗</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "xl:hidden p-2 h-8 w-8 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:outline-hidden rounded-[2px] transition-colors border cursor-pointer",
              isDark 
                ? "text-[#FAF6EE] border-white/25 hover:bg-white/10" 
                : "text-[#0A2540] border-[#0A2540]/25 hover:bg-[#0A2540]/5"
            )}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu & Overlay Attached Directly to Header */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div 
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="xl:hidden absolute top-full left-0 right-0 bg-[#0A2540]/98 backdrop-blur-2xl border-b border-white/20 text-[#FAF6EE] p-6 sm:p-8 flex flex-col gap-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300 max-h-[85vh] overflow-y-auto"
          >
            {/* Direct Feature Navigation Cards for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href="/journey"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 border border-white/25 bg-white/5 text-[#FAF6EE] font-mono text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] shadow-sm hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors"
              >
                <span>3D WORLD DIGITAL TWIN</span>
                <span className="text-sm">→</span>
              </Link>

              <Link
                href="/storyboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 border border-white/25 bg-white/5 text-[#FAF6EE] font-mono text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] shadow-sm hover:border-[#F87171] hover:text-[#F87171] transition-colors"
              >
                <span>EXPEDITION STORYBOARD</span>
                <span className="text-sm">↗</span>
              </Link>
            </div>

            {/* Editorial Nav Links */}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-xl sm:text-2xl text-[#FAF6EE] hover:text-[#FBBF24] transition-colors border-b border-white/10 pb-2.5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-xs text-[#FAF6EE]/40">#</span>
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 border border-white/40 bg-white/10 text-[#FAF6EE] font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-[#0A2540] transition-colors rounded-[2px]"
              >
                RESERVE EXPEDITION ↗
              </Link>
              <div className="text-[9.5px] font-mono text-[#FAF6EE]/60 text-center tracking-[0.2em]">
                MALPE · {WAYPOINTS.malpeHarbor.coords} · ARABIAN SEA
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
