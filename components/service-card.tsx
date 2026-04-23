"use client";

import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-borderSubtle bg-card p-6"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 transition group-hover:opacity-100" />
    </motion.article>
  );
}
