"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

type ScrambleTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: boolean;
};

export function ScrambleText({ text, className, delay = 0, duration = 1200, trigger = true }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    const el = ref.current;
    if (!el) return;

    hasRun.current = true;
    const chars = text.split("");
    let frame = 0;
    const totalFrames = Math.floor(duration / 16);
    let raf: number;

    const timeout = setTimeout(() => {
      const animate = () => {
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * chars.length);

        el.textContent = chars
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealedCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        frame++;
        if (frame <= totalFrames + 8) {
          raf = requestAnimationFrame(animate);
        } else {
          el.textContent = text;
        }
      };
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration, trigger]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
