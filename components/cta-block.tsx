"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContactConfig } from "@/lib/cms-types";

type CtaBlockProps = {
  contact: ContactConfig;
};

export function CtaBlock({ contact }: CtaBlockProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d0d] px-8 py-16 md:px-16 md:py-24"
    >
      {/* Accent glow top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(190,242,100,0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-[300px] w-[300px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(190,242,100,0.08) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(190,242,100,0.6), transparent)" }}
      />

      <div className="relative max-w-[820px]">
        <div className="badge-pill mb-6">
          <span className="accent-dot" />
          Yangi loyiha
        </div>

        <h3 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] text-white md:text-[56px] lg:text-[64px]">
          Loyihangiz haqida{" "}
          <span className="text-accent">gaplashaylik</span>.
        </h3>

        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/50 md:text-[18px]">
          30 daqiqalik chaqiruvda muammo, maqsad va texnik yechimni aniq ko&apos;rib chiqamiz.
          24 soat ichida javob beramiz.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href={contact.telegram} target="_blank" rel="noreferrer" className="btn-primary" data-magnetic>
            Telegram orqali yozish
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-secondary" data-magnetic>
            Brief yuborish
          </Link>
        </div>

        {/* Contact tags */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-8">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className="hover-underline text-[14px] text-white/50 transition-colors hover:text-white"
          >
            {contact.telegram.replace("https://t.me/", "@")}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hover-underline text-[14px] text-white/50 transition-colors hover:text-white"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
