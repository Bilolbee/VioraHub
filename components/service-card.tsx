"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  outcome: string;
  deliverables: string[];
  index?: number;
};

const ICONS = ["bot", "globe", "database", "smartphone"];

function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "bot":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <circle cx="8.5" cy="13" r="1" fill="currentColor" />
          <circle cx="15.5" cy="13" r="1" fill="currentColor" />
          <path d="M9 17h6" />
          <path d="M12 3v3" />
          <circle cx="12" cy="3" r="1" fill="currentColor" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case "smartphone":
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export function ServiceCard({ title, description, outcome, deliverables, index = 0 }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, "0");
  const iconName = ICONS[index % ICONS.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-7 transition-all duration-300 hover:border-white/[0.14]"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(190,242,100,0.7), transparent)" }}
      />

      {/* Subtle bg pattern that moves with hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(190,242,100,0.04) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-[2]">
        <div className="mb-7 flex items-center justify-between">
          <span className="tag-mono text-white/35">{num}</span>
          <motion.span
            className="text-white/40 transition-colors duration-300 group-hover:text-accent"
            whileHover={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Icon name={iconName} />
          </motion.span>
        </div>

        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-white">{title}</h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-white/45">{description}</p>

        <div className="mt-7 flex items-start gap-3 border-t border-white/[0.05] pt-5">
          <span className="mt-[5px] block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
          <p className="text-[13px] leading-relaxed text-white/50">
            <span className="text-white/30">Natija — </span>
            {outcome}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {deliverables.map((item) => (
            <span key={item} className="stat-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
