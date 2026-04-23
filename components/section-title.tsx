type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      {kicker ? (
        <p className="mb-4 inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-accentSoft">
          {kicker}
        </p>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{subtitle}</p> : null}
    </div>
  );
}
