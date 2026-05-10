type BrandLogoProps = {
  variant?: "lockup" | "mark";
  className?: string;
  priority?: boolean;
  size?: "sm" | "md";
};

export function BrandLogo({ variant = "lockup", className = "", size = "md" }: BrandLogoProps) {
  const titleSize = size === "sm" ? "text-[18px]" : "text-[19px]";

  if (variant === "mark") {
    return (
      <span
        className={`group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] ${className}`}
      >
        <span className="text-sm font-bold tracking-tight text-white">
          C<span className="text-accent">.</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/5"
      >
        <span className="text-[15px] font-bold tracking-tight leading-none text-white">
          C<span className="text-accent">.</span>
        </span>
      </span>
      <span className="leading-none">
        <span className={`block font-semibold tracking-[-0.02em] text-white ${titleSize}`}>
          ctrllab
        </span>
      </span>
    </span>
  );
}
