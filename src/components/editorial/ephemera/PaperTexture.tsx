"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PaperTextureProps {
  className?: string;
  opacity?: number;
}

export function PaperTexture({ className, opacity = 0.04 }: PaperTextureProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none z-10 mix-blend-multiply", className)}
      style={{
        opacity,
        backgroundImage: `radial-gradient(#0A2540 0.75px, transparent 0.75px)`,
        backgroundSize: "16px 16px",
      }}
    />
  );
}
