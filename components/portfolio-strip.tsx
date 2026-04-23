"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/data/site";

export function PortfolioStrip() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-5">
        {portfolioItems.map((item) => (
          <motion.article
            key={item.name}
            whileHover={{ y: -6 }}
            className="w-[320px] rounded-2xl border border-borderSubtle bg-card p-5 md:w-[360px]"
          >
            <div className="h-40 rounded-xl bg-gradient-to-br from-accent/50 to-accentSoft/20" />
            <p className="mt-4 text-xs uppercase tracking-widest text-accentSoft">{item.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-muted">{item.result}</p>
            <p className="mt-3 text-xs text-muted/90">{item.tools}</p>
            <button className="mt-5 rounded-full border border-borderSubtle px-4 py-2 text-xs uppercase tracking-wider transition hover:border-accent hover:text-white">
              Keysni korish
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
