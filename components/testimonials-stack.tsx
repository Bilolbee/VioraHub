"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialsStack({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-8 md:p-12"
          >
            <span
              aria-hidden
              className="absolute -left-2 top-2 select-none font-serif text-[140px] leading-none text-accent/10 md:text-[180px]"
            >
              &ldquo;
            </span>

            <p className="relative text-[18px] leading-[1.7] text-white/85 md:text-[22px] md:leading-[1.55]">
              {items[active].quote}
            </p>

            <div className="relative mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6">
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-[#0a0a0a]"
                style={{ background: "var(--accent)" }}
              >
                {items[active].name.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">{items[active].name}</p>
                <p className="text-[12px] text-white/40">{items[active].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === active ? "28px" : "6px",
              background: i === active ? "var(--accent)" : "rgba(255,255,255,0.16)",
            }}
            aria-label={`${i + 1}-fikr`}
          />
        ))}
      </div>
    </div>
  );
}
