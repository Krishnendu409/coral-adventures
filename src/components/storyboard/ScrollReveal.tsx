"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// 1. Lightweight useScrollReveal Hook (Always visible by default to prevent invisible content)
interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal({
  threshold = 0.05,
  rootMargin = "120px",
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Default to visible so images never stay hidden if intersection observer delays
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && observer) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// 2. ScrollRevealWrapper Component
export type AnimationType =
  | "fadeUp"
  | "fadeIn"
  | "scaleUp"
  | "rotateIn"
  | "slideLeft"
  | "slideRight"
  | "flipIn"
  | "dropIn";

interface ScrollRevealWrapperProps {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export const ScrollRevealWrapper = React.forwardRef<HTMLDivElement, ScrollRevealWrapperProps>(
  (
    {
      animation = "fadeUp",
      delay = 0,
      duration = 450,
      className,
      style,
      children,
    },
    forwardedRef
  ) => {
    const { ref: localRef, isVisible } = useScrollReveal();

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div
        ref={setRefs}
        className={cn(
          "transition-all ease-out transform-gpu opacity-100",
          className
        )}
        style={{
          ...style,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          opacity: isVisible ? 1 : 0.9,
          transform: isVisible ? "translate(0) scale(1) rotate(0)" : "translate(0) scale(0.98)",
        }}
      >
        {children}
      </div>
    );
  }
);
ScrollRevealWrapper.displayName = "ScrollRevealWrapper";

// 3. ParallaxLayer Component
interface ParallaxLayerProps {
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  children: ReactNode;
}

export function ParallaxLayer({
  speed = 0.15,
  direction = "up",
  className,
  children,
}: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const scrollCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distance = scrollCenter - elementCenter;
            const directionMultiplier = direction === "up" ? -1 : 1;
            setOffset(Math.round(distance * speed * directionMultiplier));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
