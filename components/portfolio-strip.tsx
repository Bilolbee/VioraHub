"use client";

import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/cms-types";

type PortfolioStripProps = {
  items: PortfolioItem[];
};

export function PortfolioStrip({ items }: PortfolioStripProps) {
  return (
    <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
      <div className="flex min-w-max gap-4">
        {items.map((item, index) => (
          <motion.article
            key={`${item.name}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative w-[320px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-white/[0.14] md:w-[380px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(190,242,100,0.7), transparent)",
              }}
            />

            <div className="flex items-center justify-between">
              <span className="tag-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                {item.category}
              </span>
              <span className="stat-pill">{item.tools}</span>
            </div>

            <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-white">{item.name}</h3>

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/30">Muammo</p>
                <p className="text-[14px] leading-[1.7] text-white/50">{item.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-white/30">Yechim</p>
                <p className="text-[14px] leading-[1.7] text-white/50">{item.solution}</p>
              </div>
              <div className="rounded-xl border border-accent/15 bg-accent/[0.04] p-3">
                <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-accent/80">Natija</p>
                <p className="text-[14px] font-medium leading-[1.5] text-white/85">{item.result}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
