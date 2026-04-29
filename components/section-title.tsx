type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 md:mb-14">
      {kicker ? (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/12 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-accentSoft">
          <span className="accent-dot" />
          <span>{kicker}</span>
        </div>
      ) : null}
      <h2 className="max-w-4xl text-3xl font-semibold leading-[1.05] md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle ? <p className="mt-5 max-w-2xl text-base leading-8 text-muted">{subtitle}</p> : null}
      <div className="mt-7 h-px w-full max-w-[320px] bg-gradient-to-r from-accentSoft/70 to-transparent" />
    </div>
  );
}
