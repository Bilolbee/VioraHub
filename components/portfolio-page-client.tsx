"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CtaBlock } from "@/components/cta-block";
import { SectionTitle } from "@/components/section-title";
import { ContactConfig, PortfolioItem } from "@/lib/cms-types";

type PortfolioPageClientProps = {
  items: PortfolioItem[];
  contact: ContactConfig;
};

const filters = ["Barchasi", "Telegram bots", "Web automation", "CRM Systems", "Mobile Apps"];

export function PortfolioPageClient({ items, contact }: PortfolioPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  const filtered = useMemo(() => {
    if (activeFilter === "Barchasi") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <div className="pb-20 pt-16 md:pt-24">
      <SectionTitle
        kicker="Ishlar"
        title="Real loyihalar va o'lchangan natijalar."
        subtitle="Kategoriya bo'yicha filtrlab, qaysi yondashuv qanday natija berganini bir qarashda ko'ring."
      />

      <div className="mb-12 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "border-accent bg-accent text-[#0a0a0a]"
                : "border-white/[0.1] bg-transparent text-white/55 hover:border-white/25 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-white/[0.14]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(190,242,100,0.6), transparent)",
                }}
              />

              <div className="flex items-center justify-between gap-2">
                <span className="tag-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {item.category}
                </span>
                <span className="stat-pill">{item.tools}</span>
              </div>

              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-white">{item.name}</h3>

              <div className="mt-5 space-y-3.5">
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
        </motion.div>
      </AnimatePresence>

      <div className="mt-20">
        <CtaBlock contact={contact} />
      </div>
    </div>
  );
}
