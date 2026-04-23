"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CtaBlock } from "@/components/cta-block";
import { PortfolioStrip } from "@/components/portfolio-strip";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { StatsCounter } from "@/components/stats-counter";
import { ContactConfig, PortfolioItem, ServiceItem, StatItem } from "@/lib/cms-types";

type HomePageClientProps = {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: StatItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  whyUs: string[];
  contact: ContactConfig;
};

export function HomePageClient({ hero, stats, services, portfolio, whyUs, contact }: HomePageClientProps) {
  return (
    <div className="pb-20">
      <section className="relative grid min-h-[86vh] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          aria-hidden
          animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-accent to-accentSoft blur-3xl md:h-[480px] md:w-[480px]"
        />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-accentSoft">
              {hero.badge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              {hero.heading}
              <span className="mt-2 block bg-gradient-to-r from-white via-white to-accentSoft bg-clip-text text-transparent">
                Sizning osishingizga fokus bilan.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted md:text-xl md:leading-9">{hero.subtitle}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold transition hover:shadow-glow">
              {hero.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold transition hover:border-white"
            >
              {hero.secondaryCta}
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="surface rounded-[30px] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.18em] text-accentSoft">Growth Snapshot</p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">
              Har bir loyiha uchun
              <span className="block text-accentSoft">aniq KPI va ijro rejasi</span>
            </h3>
            <div className="mt-8 grid gap-3">
              {stats.slice(0, 3).map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <StatsCounter key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24">
        <SectionTitle
          kicker="Xizmatlar"
          title="Faqat dizayn emas, boshidan oxirigacha natija."
          subtitle="Har bir xizmat bloki chiroy uchun emas, ochovli osish uchun qurilgan."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <SectionTitle
          kicker="Portfolio"
          title="Tanlangan loyihalar va natijalar"
          subtitle="Muhim keyslarni tez korish va real biznes natijalarini korsatish uchun."
        />
        <PortfolioStrip items={portfolio} />
      </section>

      <section className="py-16 md:py-20">
        <SectionTitle kicker="Nega biz" title="Tezlik, sifat va real biznes natijasi uchun qurilgan." />
        <div className="grid gap-4 md:grid-cols-4">
          {whyUs.map((item) => (
            <Reveal key={item}>
              <div className="surface surface-hover rounded-3xl p-6 text-center">
                <h3 className="text-xl font-semibold">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <CtaBlock contact={contact} />
      </section>
    </div>
  );
}
