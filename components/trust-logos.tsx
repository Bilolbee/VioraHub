"use client";

import { motion } from "framer-motion";

type TrustLogosProps = {
  logos: string[];
};

export function TrustLogos({ logos }: TrustLogosProps) {
  if (logos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10"
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Ishongan hamkorlar</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {logos.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/55 transition-all duration-200 hover:border-violet-500/35 hover:text-white/80"
          >
            {logo}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
