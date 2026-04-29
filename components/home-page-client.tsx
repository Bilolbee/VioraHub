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

const trustTags = ["Fintech", "MedTech", "Edu", "Retail", "B2B", "Startup"];

const processRows = [
  { title: "Strategik discovery", desc: "Biznes bottleneck va maqsadlar aniq xaritaga tushiriladi." },
  { title: "Design va message", desc: "Premium vizual yo nalish va conversion copy birga quriladi." },
  { title: "Build va integratsiya", desc: "Sayt, bot va lead oqimi bitta ishchi tizimga ulanadi." },
  { title: "Launch va optimizatsiya", desc: "Deploy, kuzatuv va doimiy osish uchun iteratsiya boshlanadi." }
];

export function HomePageClient({ hero, stats, services, portfolio, whyUs, contact }: HomePageClientProps) {
  return (
    <div className="pb-20">
      <section className="relative grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          aria-hidden
          animate={{ y: [0, -24, 0], x: [0, 18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-accent to-accentSoft blur-3xl md:h-[460px] md:w-[460px]"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 bottom-10 h-52 w-52 rounded-full bg-accent/35 blur-3xl"
        />

        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <p className="badge-pill mb-6">{hero.badge}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              <span>{hero.heading}</span>
              <span className="mt-3 block text-gradient">Serious execution. Measurable growth.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted md:text-xl md:leading-9">{hero.subtitle}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn-primary">
              {hero.primaryCta}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {hero.secondaryCta}
            </Link>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-2">
            {trustTags.map((tag) => (
              <span key={tag} className="stat-pill">
                {tag}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.36} className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.slice(0, 3).map((item) => (
              <div key={item.label} className="premium-panel-soft rounded-2xl px-4 py-4">
                <p className="text-lg font-semibold text-white">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.13em] text-muted">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="section-shell rounded-[30px] p-5 md:p-7">
            <p className="text-xs uppercase tracking-[0.18em] text-accentSoft">Live delivery board</p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">
              Har loyiha uchun
              <span className="block text-gradient">aniq sprint va KPI nazorati</span>
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="premium-panel-soft rounded-2xl p-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Cycle</p>
                <p className="mt-1 text-base font-semibold text-white">7-14 kun</p>
              </div>
              <div className="premium-panel-soft rounded-2xl p-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Checkpoints</p>
                <p className="mt-1 text-base font-semibold text-white">Haftalik</p>
              </div>
              <div className="premium-panel-soft rounded-2xl p-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Reporting</p>
                <p className="mt-1 text-base font-semibold text-white">Realtime</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {processRows.map((row, index) => (
                <div key={row.title} className="premium-panel-soft rounded-2xl px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.17em] text-accentSoft">Bosqich {index + 1}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{row.title}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{row.desc}</p>
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
          title="Kreativ emas, commercial impact beradigan xizmatlar"
          subtitle="Har bir xizmat alohida task emas. Biz barchasini bitta growth engine sifatida loyihalaymiz."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => (
            <ServiceCard key={item.title} title={item.title} description={item.description} index={index} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <SectionTitle
          kicker="Portfolio"
          title="Tanlangan case lar va biznes natijalari"
          subtitle="Frontend, automation va marketing yechimlari real natija bilan birga ko rsatiladi."
        />
        <PortfolioStrip items={portfolio} />
      </section>

      <section className="py-16 md:py-20">
        <SectionTitle
          kicker="Nega Viora Hub"
          title="Sizga chiroyli fayl emas, ishlaydigan tizim kerak"
          subtitle="Hamkorlik jarayonida tezlik, aniqlik va masuliyat birinchi o rinda turadi."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {whyUs.map((item, index) => (
            <Reveal key={item}>
              <div className="section-shell premium-hover rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-accentSoft">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item}</h3>
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
