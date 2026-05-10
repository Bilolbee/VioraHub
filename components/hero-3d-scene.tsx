"use client";

import { motion, useReducedMotion } from "framer-motion";

type Hero3DSceneProps = {
  className?: string;
};

export function Hero3DScene({ className = "" }: Hero3DSceneProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`hero-fallback-scene ${className}`} aria-label="Brand visualization">
      <motion.div
        aria-hidden
        className="hero-fallback-orb hero-fallback-orb-a"
        animate={reduceMotion ? undefined : { x: [0, 12, 0], y: [0, -10, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="hero-fallback-orb hero-fallback-orb-b"
        animate={reduceMotion ? undefined : { x: [0, -10, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="hero-fallback-glass hero-fallback-glass-a"
        animate={reduceMotion ? undefined : { rotate: [-8, -3, -8], y: [0, -8, 0] }}
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="hero-fallback-glass hero-fallback-glass-b"
        animate={reduceMotion ? undefined : { rotate: [12, 6, 12], y: [0, 9, 0] }}
        transition={{ duration: 9.5, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="hero-fallback-grid" />
      <div className="hero-3d-vignette" aria-hidden />
    </div>
  );
}
