"use client";

import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="surface surface-hover group rounded-3xl p-7"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="h-2 w-2 rounded-full bg-accentSoft" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Service</span>
      </div>
      <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-40 transition group-hover:opacity-100" />
    </motion.article>
  );
}
