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
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    // Update live Malpe local time (IST = UTC+5:30)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Strategic Dark Chapters (White text / blur backdrop)
    const darkSections = ["typology", "turnkey", "vessel", "sunset", "night"];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 40) {
        setThemeState("transparent");
        return;
      }

      // Check which section is in view around the header line (y=90px)
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
          ? "bg-[#FAF6EE]/90 backdrop-blur-md py-3 sm:py-3.5 text-[#0A2540] border-b border-[#0A2540]/10"
          : isDark
            ? "bg-[#0A2540]/96 backdrop-blur-lg border-b border-white/15 py-3 sm:py-3.5 shadow-xl text-[#FAF6EE]"
            : "bg-[#FAF6EE]/96 backdrop-blur-lg border-b border-[#E2D9C8] py-3 sm:py-3.5 shadow-md text-[#0A2540]"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
        
        {/* Brand Official Logo & Live Malpe Telemetry */}
        <Link 
          href="/" 
          className="group flex items-center gap-2.5 sm:gap-3 shrink-0 focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:outline-hidden rounded-xs"
        >
          <div className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/coral_logo_mark.png"
              alt="Coral Adventures Emblem"
              fill
              sizes="(max-width: 640px) 32px, 34px"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col whitespace-nowrap">
            <span className={cn(
              "font-serif text-base sm:text-lg lg:text-xl font-normal tracking-wide transition-colors",
              isDark ? "text-[#FAF6EE]" : "text-[#0A2540] group-hover:text-[#0284C7]"
            )}>
              CORAL ADVENTURES
            </span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[7.5px] sm:text-[8px] font-sans tracking-[0.2em] uppercase transition-colors font-bold",
                isDark ? "text-[#0284C7]" : "text-[#0284C7]"
              )}>
                MALPE · ARABIAN SEA
              </span>
              {localTime && (
                <span className={cn(
                  "hidden xl:inline-block text-[7.5px] font-mono tracking-wider opacity-60 transition-colors",
                  isDark ? "text-white/60" : "text-[#0A2540]/60"
                )}>
                  · {localTime} IST
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (Centered, with strict whitespace-nowrap) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-[9.5px] 2xl:text-[10px] font-sans tracking-[0.2em] font-medium shrink-0" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative py-1 whitespace-nowrap transition-colors duration-200 uppercase focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:outline-hidden",
                isDark 
                  ? "text-[#FAF6EE]/80 hover:text-[#C5A059]" 
                  : "text-[#0A2540]/80 hover:text-[#0284C7]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Capsule Buttons (Guaranteed whitespace-nowrap, zero wrapping) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Storyboard Dossier Button */}
          <Link
            href="/storyboard"
            className={cn(
              "hidden md:inline-flex items-center justify-center gap-1 px-3 h-8 rounded-xs font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.16em] font-medium border transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0",
              isDark
                ? "border-white/20 bg-white/5 text-[#FAF6EE]/90 hover:border-[#0284C7] hover:text-[#0284C7] hover:bg-white/10"
                : "border-[#0A2540]/20 bg-[#0A2540]/[0.03] text-[#0A2540]/85 hover:border-[#0284C7] hover:text-[#0284C7] hover:bg-[#0284C7]/5"
            )}
          >
            <span>STORYBOARD</span>
            <span className="text-[9px] opacity-70">↗</span>
          </Link>

          {/* 3D World Digital Twin Button */}
          <Link
            href="/journey"
            className={cn(
              "hidden sm:inline-flex items-center justify-center gap-1 px-3 h-8 rounded-xs font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.16em] font-medium border transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0",
              isDark
                ? "border-white/20 bg-white/5 text-[#FAF6EE]/90 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-white/10"
                : "border-[#0A2540]/20 bg-[#0A2540]/[0.03] text-[#0A2540]/85 hover:border-[#0A2540] hover:text-[#0A2540] hover:bg-[#0A2540]/5"
            )}
          >
            <span>3D WORLD</span>
            <span className="text-[9px] opacity-70">→</span>
          </Link>

          {/* Reserve / Booking Button */}
          <Link
            href="#book"
            className={cn(
              "hidden lg:inline-flex items-center justify-center gap-1 px-3.5 h-8 rounded-xs font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.16em] font-semibold border transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0",
              isDark
                ? "border-[#0284C7] bg-[#0284C7] text-white hover:bg-[#0369A1] shadow-sm"
                : "border-[#0A2540] bg-[#0A2540] text-[#FAF6EE] hover:bg-[#0284C7] hover:border-[#0284C7] shadow-sm"
            )}
          >
            <span>RESERVE</span>
            <span className="text-[9px] opacity-80">↗</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "xl:hidden p-1.5 h-8 w-8 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:outline-hidden rounded-xs transition-colors border cursor-pointer shrink-0",
              isDark 
                ? "text-[#FAF6EE] border-white/25 hover:bg-white/10" 
                : "text-[#0A2540] border-[#0A2540]/25 hover:bg-[#0A2540]/5"
            )}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu & Overlay */}
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
                className="flex items-center justify-between p-3.5 border border-white/25 bg-white/5 text-[#FAF6EE] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-xs shadow-xs hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                <span>3D WORLD DIGITAL TWIN</span>
                <span className="text-sm">→</span>
              </Link>

              <Link
                href="/storyboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 border border-white/25 bg-white/5 text-[#FAF6EE] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-xs shadow-xs hover:border-[#0284C7] hover:text-[#0284C7] transition-colors"
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
                  className="font-serif text-xl sm:text-2xl text-[#FAF6EE] hover:text-[#C5A059] transition-colors border-b border-white/10 pb-2.5 flex items-center justify-between"
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
                className="w-full text-center py-3.5 border border-[#0284C7] bg-[#0284C7] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0369A1] transition-colors rounded-xs shadow-xs"
              >
                RESERVE EXPEDITION ↗
              </Link>
              <div className="text-[9px] font-mono text-[#FAF6EE]/60 text-center tracking-[0.2em]">
                MALPE · {WAYPOINTS.malpeHarbor.coords} · ARABIAN SEA
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
