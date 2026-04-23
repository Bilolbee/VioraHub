"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  value: number;
  suffix: string;
  label: string;
};

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest))
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-borderSubtle bg-card p-6">
      <p className="text-4xl font-semibold">
        <span>{count}</span>
        <span>{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </div>
  );
}
