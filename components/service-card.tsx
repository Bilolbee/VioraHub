"use client";

import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  index?: number;
};

export function ServiceCard({ title, description, index = 0 }: ServiceCardProps) {
  const label = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="section-shell premium-hover group rounded-[28px] p-7"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-accentSoft">
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">Service Unit</span>
      </div>
      <h3 className="text-2xl font-semibold leading-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-accentSoft to-transparent opacity-60 transition group-hover:opacity-100" />
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-accentSoft">Outcome focused execution</p>
    </motion.article>
  );
}
