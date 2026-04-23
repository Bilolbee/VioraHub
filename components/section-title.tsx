type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10">
      {kicker ? (
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accentSoft">{kicker}</p>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 max-w-2xl text-muted">{subtitle}</p> : null}
    </div>
  );
}
