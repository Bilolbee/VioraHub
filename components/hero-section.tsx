"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

type HeroSectionProps = {
  badge: string;
  heading: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export function HeroSection({ badge, heading, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  /* Word-by-word entrance + character delay */
  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: "115%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.15,
      }
    );
  }, []);

  /* Mouse-react glow follow */
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    let raf: number;
    let targetX = 50;
    let targetY = 30;
    let curX = 50;
    let curY = 30;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const loop = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      glow.style.background = `radial-gradient(circle 600px at ${curX}% ${curY}%, rgba(190,242,100,0.13) 0%, transparent 50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    section.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden pb-20 pt-16 md:pt-24"
    >
      {/* Mouse-react glow */}
      <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />

      {/* Static accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(190,242,100,0.16) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(190,242,100,0.08) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="badge-pill">
            <span className="accent-dot pulse-soft" />
            {badge}
          </div>
        </motion.div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="max-w-[1100px] text-[44px] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[56px] md:text-[80px] lg:text-[112px]"
        >
          {words.map((word, i) => {
            const isLast = i === words.length - 1;
            return (
              <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.18em]">
                <span
                  className="word inline-block"
                  style={{
                    color: isLast ? "var(--accent)" : "inherit",
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-[560px] text-pretty text-[17px] leading-[1.65] text-white/55 md:text-[19px] md:leading-[1.6]"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link href="/contact" className="btn-primary" data-magnetic>
            {primaryCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link href="/portfolio" className="btn-secondary" data-magnetic>
            {secondaryCta}
          </Link>
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-white/[0.06] pt-8 md:mt-24"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { value: "14", label: "kun ishga tushirish" },
              { value: "64+", label: "yakunlangan loyihalar" },
              { value: "96%", label: "mijoz qaytishi" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.07 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {item.value}
                </span>
                <span className="text-[12px] text-white/40">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-7 w-4 items-start justify-center rounded-full border border-white/15 p-[3px]">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-1 w-[2px] rounded-full bg-white/60"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
