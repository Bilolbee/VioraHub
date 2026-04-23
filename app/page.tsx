"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CtaBlock } from "@/components/cta-block";
import { PortfolioStrip } from "@/components/portfolio-strip";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { StatsCounter } from "@/components/stats-counter";
import { services, stats } from "@/data/site";

const differentiators = [
  "Toliq jamoa",
  "Tez ishga tushirish",
  "Zamonaviy texnologiya",
  "Biznesga yonaltirilgan"
];

export default function HomePage() {
  return (
    <div className="pb-16">
      <section className="relative flex min-h-[88vh] items-center py-16">
        <motion.div
          aria-hidden
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[-20%] top-16 h-72 w-72 rounded-full bg-gradient-to-br from-accent to-accentSoft blur-3xl md:h-[420px] md:w-[420px]"
        />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accentSoft">Premium agentlik</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">Biz raqamli kuchni quramiz.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
              Veb-sayt, Telegram bot, marketing va osish tizimlari.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="rounded-full bg-accent px-7 py-3 text-sm font-medium transition hover:shadow-glow">
              Portfolio korish
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-borderSubtle px-7 py-3 text-sm font-medium transition hover:border-white"
            >
              Boshlash
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <StatsCounter key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
          ))}
        </div>
      </section>

      <section className="py-20">
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

      <section className="py-16">
        <SectionTitle
          kicker="Portfolio"
          title="Tanlangan loyihalar va natijalar"
          subtitle="Muhim keyslarni tez korish va real biznes natijalarini korsatish uchun."
        />
        <PortfolioStrip />
      </section>

      <section className="py-16">
        <SectionTitle kicker="Nega biz" title="Tezlik, sifat va real biznes natijasi uchun qurilgan." />
        <div className="grid gap-4 md:grid-cols-4">
          {differentiators.map((item) => (
            <Reveal key={item}>
              <div className="rounded-2xl border border-borderSubtle bg-card p-6 text-center">
                <h3 className="text-xl font-semibold">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <CtaBlock />
      </section>
    </div>
  );
}
