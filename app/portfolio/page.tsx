"use client";

import { useMemo, useState } from "react";
import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { portfolioItems } from "@/data/site";

const filters = ["Barchasi", "Veb-saytlar", "Botlar", "Reklama", "Brending", "Video"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  const filtered = useMemo(() => {
    if (activeFilter === "Barchasi") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="pb-16 pt-10">
      <SectionTitle
        kicker="Portfolio"
        title="Faqat chiroyli emas, natija beradigan ishlar."
        subtitle="Kategoriya boyicha filtrlab, har bir loyiha biznesga qanday tasir qilganini koring."
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? "border-accent bg-accent/20 text-white"
                : "border-borderSubtle text-muted hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Reveal key={item.name}>
            <article className="rounded-2xl border border-borderSubtle bg-card p-5">
              <div className="h-40 rounded-xl bg-gradient-to-br from-accent/40 to-accentSoft/10" />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.result}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-accentSoft">{item.tools}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-16">
        <CtaBlock />
      </div>
    </div>
  );
}
