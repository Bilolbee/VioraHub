"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionTitle({ kicker, title, subtitle, align = "left" }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const titleEl = titleRef.current;
    if (!el || !titleEl) return;

    const split = new SplitType(titleEl, { types: "lines,words", lineClass: "split-line" });
    const words = split.words || [];

    /* Wrap each line so we can clip overflow */
    titleEl.querySelectorAll(".split-line").forEach((line) => {
      const html = line as HTMLElement;
      html.style.overflow = "hidden";
      html.style.display = "block";
      html.style.paddingBottom = "0.08em";
    });

    /* Set initial state */
    gsap.set(words, { y: "115%", opacity: 0 });
    if (kickerRef.current) gsap.set(kickerRef.current, { y: 12, opacity: 0 });
    if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 16, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    if (kickerRef.current) {
      tl.to(kickerRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
    }

    tl.to(words, {
      y: "0%",
      opacity: 1,
      duration: 0.85,
      stagger: 0.045,
      ease: "power3.out",
    }, 0.05);

    if (subtitleRef.current) {
      tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      split.revert();
    };
  }, []);

  const centered = align === "center";

  return (
    <div ref={ref} className={`mb-14 md:mb-20 ${centered ? "text-center" : ""}`}>
      {kicker && (
        <div ref={kickerRef} className={`mb-5 ${centered ? "flex justify-center" : ""}`}>
          <span className="badge-pill">
            <span className="accent-dot" />
            {kicker}
          </span>
        </div>
      )}

      <h2
        ref={titleRef}
        className={`max-w-[840px] text-[34px] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[44px] md:text-[56px] lg:text-[64px] ${
          centered ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          ref={subtitleRef}
          className={`mt-5 max-w-[640px] text-[16px] leading-[1.65] text-white/45 md:text-[17px] ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
