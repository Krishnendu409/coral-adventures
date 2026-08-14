"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ParchmentOverlay } from "./ephemera/ScrapbookEphemera";

interface ScrollColorContextType {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ScrollColorContext = createContext<ScrollColorContextType>({
  activeColor: "#FAF6EE",
  setActiveColor: () => {},
});

export function useScrollColor() {
  return useContext(ScrollColorContext);
}

export function ScrollColorTransition({ children }: { children: React.ReactNode }) {
  const [activeColor, setActiveColor] = useState<string>("#FAF6EE");

  return (
    <ScrollColorContext.Provider value={{ activeColor, setActiveColor }}>
      {/* Global Background Layer with Smooth Color Interpolation */}
      <div
        className="fixed inset-0 z-[-1] transition-colors duration-1000 ease-out"
        style={{ backgroundColor: activeColor }}
      />
      {/* Tactile Parchment Paper Grain Overlay */}
      <ParchmentOverlay />
      {children}
    </ScrollColorContext.Provider>
  );
}

// Section Color Trigger Component that updates active background color on scroll into view
interface ColorSectionProps {
  color: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ColorSection({ color, children, className, id }: ColorSectionProps) {
  const { setActiveColor } = useScrollColor();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveColor(color);
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [color, setActiveColor]);

  return (
    <div ref={sectionRef} id={id} className={className}>
      {children}
    </div>
  );
}
