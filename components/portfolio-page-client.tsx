"use client";

import { useMemo, useState } from "react";
import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { ContactConfig, PortfolioItem } from "@/lib/cms-types";

type PortfolioPageClientProps = {
  items: PortfolioItem[];
  contact: ContactConfig;
};

const filters = ["Barchasi", "Veb-saytlar", "Botlar", "Reklama", "Brending", "Video"];

export function PortfolioPageClient({ items, contact }: PortfolioPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  const filtered = useMemo(() => {
    if (activeFilter === "Barchasi") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <div className="pb-20 pt-12">
      <SectionTitle
        kicker="Portfolio"
        title="Korsatiladigan emas, isbotlanadigan natijalar"
        subtitle="Kategoriya bo yicha filtrlab har bir loyiha qaysi natijani berganini tez ko ring."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "border-accent bg-accent/20 text-white"
                : "border-white/15 bg-white/[0.02] text-muted hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <Reveal key={`${item.name}-${index}`}>
            <article className="section-shell premium-hover rounded-[28px] p-5">
              <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent/60 via-accentSoft/30 to-[#150d27]">
                <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75">
                  {item.category}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.result}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="stat-pill">{item.tools}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <CtaBlock contact={contact} />
      </div>
    </div>
  );
}
