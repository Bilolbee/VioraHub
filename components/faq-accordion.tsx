"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqItem } from "@/lib/cms-types";

type FAQAccordionProps = {
  items: FaqItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-[820px]">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.div
            key={`${item.question}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-white/[0.06]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex((curr) => (curr === index ? -1 : index))}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-white"
            >
              <span
                className={`text-[16px] font-medium tracking-[-0.01em] transition-colors duration-200 md:text-[18px] ${
                  open ? "text-white" : "text-white/70 group-hover:text-white"
                }`}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-[14px] font-medium transition-colors ${
                  open
                    ? "border-accent/45 bg-accent/10 text-accent"
                    : "border-white/15 text-white/55 group-hover:border-white/30 group-hover:text-white/85"
                }`}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-[15px] leading-[1.75] text-white/45">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
