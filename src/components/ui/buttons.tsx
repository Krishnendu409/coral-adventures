import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group inline-flex items-center justify-center gap-3 rounded-none border border-marine-espresso/30 bg-alabaster/80 text-marine-espresso px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-marine-espresso hover:bg-marine-espresso hover:text-alabaster active:scale-[0.98]",
          className
        )}
        {...props}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
      </button>
    );
  }
);
Button.displayName = "Button";

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a 
      href={href}
      className={cn("group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-marine-espresso/70 hover:text-marine-espresso transition-colors", className)}
    >
      <span>{children}</span>
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
    </a>
  );
}

export function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center gap-6 rounded-none border border-marine-espresso/30 bg-alabaster text-marine-espresso pl-8 pr-4 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-champagne hover:bg-marine-espresso hover:text-alabaster", 
        className
      )}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      <div className="w-8 h-8 rounded-full border border-sand flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
        <ArrowUpRight className="w-3.5 h-3.5 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
      </div>
    </motion.button>
  );
}
