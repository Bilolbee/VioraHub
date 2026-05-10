"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStepItem } from "@/lib/cms-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProcessTimelineProps = {
  steps: ProcessStepItem[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top" });
    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1.2,
      },
    });

    const cards = container.querySelectorAll<HTMLElement>(".step-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef} className="relative pl-12 md:pl-16">
      {/* Vertical line */}
      <div className="absolute bottom-0 left-4 top-0 w-px bg-white/[0.08] md:left-6">
        <div ref={lineRef} className="h-full w-full origin-top bg-accent/60" />
      </div>

      <div className="space-y-10 md:space-y-14">
        {steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className="step-card relative">
            {/* Dot */}
            <div className="absolute -left-12 top-1.5 md:-left-16">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-semibold tabular-nums"
                style={{
                  borderColor: "var(--accent)",
                  background: "#0a0a0a",
                  color: "var(--accent)",
                }}
              >
                {index + 1}
              </div>
            </div>

            <div>
              <h3 className="text-[20px] font-semibold tracking-tight text-white md:text-[22px]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[560px] text-[15px] leading-[1.7] text-white/45">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
