"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RegistrationMarkProps {
  className?: string;
  label?: string;
}

export function RegistrationMark({ className, label }: RegistrationMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 text-[8.5px] font-mono tracking-widest text-[#0A2540]/40 uppercase select-none", className)}>
      <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="8" cy="8" r="6" />
        <line x1="8" y1="0" x2="8" y2="16" />
        <line x1="0" y1="8" x2="16" y2="8" />
      </svg>
      {label && <span>{label}</span>}
    </div>
  );
}
