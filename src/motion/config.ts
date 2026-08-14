export const ease = {
  fluid: [0.32, 0.72, 0, 1] as const,      // custom cubic-bezier physics
  cinematic: [0.65, 0, 0.35, 1] as const,  // heavy, slow cinematic transitions
  outExpo: [0.16, 1, 0.3, 1] as const,     // snappy microinteractions
  linear: [0, 0, 1, 1] as const,
};

export const duration = {
  micro: 0.3,       // 300ms: microinteractions (hover states, buttons)
  reveal: 0.8,      // 800ms: standard text reveals, images entering viewport
  cinematic: 1.5,   // 1500ms: scene transitions, major environmental shifts
};

export const viewport = {
  once: true,
  margin: "-10% 0px -10% 0px", // Trigger when elements enter the main view
};

export const variants = {
  fadeUp: {
    initial: { y: 64, filter: "blur(8px)", opacity: 0 },
    animate: {
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: duration.reveal, ease: ease.fluid },
    },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { duration: duration.reveal, ease: ease.fluid } 
    },
  },
};

export const getFallbackMode = (prefersReducedMotion: boolean) => {
  return prefersReducedMotion ? "STATIC" : "FULL";
};
