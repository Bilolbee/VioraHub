"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CaseStudyItem } from "@/lib/cms-types";

type CaseStudyFeaturedProps = {
  items: CaseStudyItem[];
};

function CaseCard({ item, index }: { item: CaseStudyItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Parallax for the right-side meta block */
  const metaY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/portfolio"
        data-cursor="view"
        data-cursor-label="Ko'rish"
        className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-7 transition-all duration-300 hover:border-white/[0.14] md:p-9"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, transparent, rgba(190,242,100,0.6), transparent)" }}
        />

        <motion.div style={{ y: metaY }} className="flex flex-wrap items-center justify-between gap-2">
          <span className="tag-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {item.industry}
          </span>
          <span className="stat-pill">{item.timeline}</span>
        </motion.div>

        <h3 className="mt-5 text-[28px] font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-accent md:text-[32px]">
          {item.client}
        </h3>

        <div className="mt-7 space-y-5">
          <div>
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-white/30">Muammo</p>
            <p className="text-[15px] leading-[1.7] text-white/55">{item.challenge}</p>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-white/30">Yechim</p>
            <p className="text-[15px] leading-[1.7] text-white/55">{item.solution}</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.05] p-4">
            <span className="mt-[7px] block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            <p className="text-[15px] font-medium leading-[1.55] text-white/90">{item.result}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CaseStudyFeatured({ items }: CaseStudyFeaturedProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => (
        <CaseCard key={`${item.client}-${item.industry}`} item={item} index={index} />
      ))}
    </div>
  );
}
