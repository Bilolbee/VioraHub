"use client";

import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/cms-types";

type PortfolioStripProps = {
  items: PortfolioItem[];
};

export function PortfolioStrip({ items }: PortfolioStripProps) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex min-w-max gap-6">
        {items.map((item) => (
          <motion.article
            key={item.name}
            whileHover={{ y: -10 }}
            className="surface surface-hover w-[320px] rounded-3xl p-5 md:w-[390px]"
          >
            <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent/50 via-accentSoft/25 to-transparent">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-white/20" />
              <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
                {item.category}
              </div>
            </div>
            <h3 className="mt-5 text-2xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-muted">{item.result}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted/90">{item.tools}</p>
            <button className="mt-6 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.14em] transition hover:border-accent hover:bg-accent/20 hover:text-white">
              Keysni korish
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
