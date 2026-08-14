import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { variants } from "@/motion";

export function HorizonLine({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("w-full h-px bg-sand my-8", className)} 
      {...props}
      role="separator"
    />
  );
}

export function EditorialHeader({ 
  children, 
  className,
  as: Component = "h2",
  animate = true
}: { 
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType<any>;
  animate?: boolean;
}) {
  const styles = cn("font-serif text-5xl sm:text-6xl md:text-8xl tracking-tight leading-[0.9] text-marine-espresso", className);

  const ComponentAny = Component as any;
  if (!animate) {
    return <ComponentAny className={styles}>{children}</ComponentAny>;
  }

  const MotionComponent = motion.create(Component as any);
  
  return (
    <MotionComponent
      variants={variants.fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
      className={styles}
    >
      {children}
    </MotionComponent>
  );
}

export function Label({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("text-[10px] font-mono uppercase tracking-[0.25em] font-medium text-marine-espresso/60", className)}>
      {children}
    </p>
  );
}
