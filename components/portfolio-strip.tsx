"use client";

import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/cms-types";

type PortfolioStripProps = {
  items: PortfolioItem[];
};

export function PortfolioStrip({ items }: PortfolioStripProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-5">
        {items.map((item, index) => (
          <motion.article
            key={`${item.name}-${index}`}
            whileHover={{ y: -10 }}
            className="section-shell premium-hover w-[330px] rounded-[28px] p-5 md:w-[410px]"
          >
            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent/65 via-accentSoft/35 to-[#140d27]">
              <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full border border-white/25" />
              <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
                {item.category}
              </div>
            </div>
            <h3 className="mt-5 text-2xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{item.result}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="stat-pill">{item.tools}</span>
            </div>
            <button className="btn-secondary mt-6 px-4 py-2 text-xs uppercase tracking-[0.14em]">Case preview</button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
