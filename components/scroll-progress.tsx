"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-[2px] w-full">
      <div
        ref={barRef}
        className="h-full w-0"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #8b5cf6, #22d3ee)",
          boxShadow: "0 0 8px rgba(139,92,246,0.6)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
