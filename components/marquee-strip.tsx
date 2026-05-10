"use client";

type MarqueeStripProps = {
  items: string[];
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
};

export function MarqueeStrip({ items, reverse = false, speed = "normal" }: MarqueeStripProps) {
  if (items.length === 0) return null;

  const duration = speed === "slow" ? "48s" : speed === "fast" ? "24s" : "36s";
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-white/[0.05] py-5">
      {/* Edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
        style={{ background: "linear-gradient(90deg, #0a0a0a 0%, transparent 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
        style={{ background: "linear-gradient(-90deg, #0a0a0a 0%, transparent 100%)" }}
      />

      <div
        className={`flex min-w-max items-center gap-12 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="tag-mono whitespace-nowrap text-[13px] font-medium text-white/30 transition-colors duration-200 hover:text-white/70">
              {item}
            </span>
            <span className="text-accent/40 text-[10px]">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
