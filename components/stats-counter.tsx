"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  value: number;
  suffix: string;
  label: string;
};

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const c1 = animate(0, value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    const c2 = animate(0, 1, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
      onUpdate: (latest) => setProgress(latest),
    });

    return () => {
      c1.stop();
      c2.stop();
    };
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative pl-6"
    >
      {/* Vertical line that grows */}
      <span
        className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.06]"
        aria-hidden
      />
      <span
        className="absolute bottom-0 left-0 top-0 w-px origin-bottom bg-accent transition-colors"
        style={{ transform: `scaleY(${progress})` }}
        aria-hidden
      />

      <div className="flex items-baseline gap-1">
        <span
          className="text-[44px] font-semibold tracking-[-0.04em] text-white tabular-nums md:text-[56px]"
          style={{
            opacity: 0.5 + progress * 0.5,
          }}
        >
          {count}
        </span>
        <span className="text-[20px] font-medium tracking-tight text-accent md:text-[24px]">
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-[13px] text-white/45">{label}</p>
    </motion.div>
  );
}
