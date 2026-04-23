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
        title="Faqat chiroyli emas, natija beradigan ishlar."
        subtitle="Kategoriya boyicha filtrlab, har bir loyiha biznesga qanday tasir qilganini koring."
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
        {filtered.map((item) => (
          <Reveal key={item.name}>
            <article className="surface surface-hover rounded-3xl p-5">
              <div className="h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-accent/40 to-accentSoft/10" />
              <h3 className="mt-5 text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.result}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-accentSoft">{item.tools}</p>
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
