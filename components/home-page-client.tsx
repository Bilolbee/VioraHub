"use client";

import { HeroSection } from "@/components/hero-section";
import { MarqueeStrip } from "@/components/marquee-strip";
import { CtaBlock } from "@/components/cta-block";
import { FAQAccordion } from "@/components/faq-accordion";
import { MotionItem, MotionSection } from "@/components/motion-section";
import { ProcessTimeline } from "@/components/process-timeline";
import { PortfolioStrip } from "@/components/portfolio-strip";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { StatsCounter } from "@/components/stats-counter";
import { TestimonialsStack } from "@/components/testimonials-stack";
import { CaseStudyFeatured } from "@/components/case-study-featured";
import {
  CaseStudyItem,
  ContactConfig,
  FaqItem,
  PortfolioItem,
  ProcessStepItem,
  ServiceItem,
  StatItem,
} from "@/lib/cms-types";

type HomePageClientProps = {
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  home: {
    trustLogos: string[];
    processSteps: ProcessStepItem[];
    faq: FaqItem[];
  };
  stats: StatItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  caseStudies: CaseStudyItem[];
  whyUs: string[];
  contact: ContactConfig;
  testimonials?: { quote: string; name: string; role: string }[];
};

export function HomePageClient({
  hero,
  home,
  stats,
  services,
  portfolio,
  caseStudies,
  whyUs,
  contact,
  testimonials = [],
}: HomePageClientProps) {
  return (
    <div className="pb-24">
      {/* Hero */}
      <HeroSection
        badge={hero.badge}
        heading={hero.heading}
        subtitle={hero.subtitle}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />

      {/* Tech stack marquee */}
      {home.trustLogos.length > 0 && (
        <div className="-mx-5 md:-mx-8">
          <MarqueeStrip items={home.trustLogos} speed="slow" />
        </div>
      )}

      {/* Stats — minimal row */}
      <section className="py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">Raqamlarda</p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
        <MotionSection variant="stagger-children" className="grid gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item) => (
            <MotionItem key={item.label}>
              <StatsCounter value={item.value} suffix={item.suffix} label={item.label} />
            </MotionItem>
          ))}
        </MotionSection>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="Xizmatlar"
          title="Biznesingizni avtomatlashtiradigan to'rtta vosita."
          subtitle="Har biri 1–4 hafta ichida ishga tushadi va sizning ichki jarayonlaringiz bilan to'liq integratsiyalashadi."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((item, index) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
              outcome={item.outcome}
              deliverables={item.deliverables}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="Jarayon"
          title="Brieddan deploygacha — beshta aniq qadam."
          subtitle="Har bosqichda nima qilishimizni, qachon tayyor bo'lishini va kim mas'ul ekanini oldindan kelishamiz."
        />
        <ProcessTimeline steps={home.processSteps} />
      </section>

      {/* Case studies */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="Case studies"
          title="Real loyihalar, raqamli natijalar."
          subtitle="Muammo, yechim va o'lchangan natija ochiq ko'rsatiladi."
        />
        <CaseStudyFeatured items={caseStudies} />
      </section>

      {/* Portfolio */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="Portfolio"
          title="Ko'proq loyihalar."
          subtitle="Telegram botlar, CRM tizimlari, mobil ilova va sayt avtomatizatsiyasi misollari."
        />
        <PortfolioStrip items={portfolio} />
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28">
          <SectionTitle
            kicker="Mijozlar"
            title="Ishlagan jamoalar nima deydi."
            align="center"
          />
          <TestimonialsStack items={testimonials} />
        </section>
      )}

      {/* Why us */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="Nega Ctrllab"
          title="Tezlik, shaffoflik va to'liq kod ownership."
        />
        <MotionSection variant="stagger-children" className="grid gap-3 sm:grid-cols-2">
          {whyUs.map((item, index) => (
            <MotionItem key={item}>
              <div className="group flex items-start gap-4 rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-5 transition-colors duration-300 hover:border-white/[0.14]">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-semibold tabular-nums text-accent" style={{ background: "rgba(190,242,100,0.08)", border: "1px solid rgba(190,242,100,0.2)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] font-medium text-white/85">{item}</p>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <SectionTitle
          kicker="FAQ"
          title="Qisqa javoblar."
          subtitle="Eng ko'p so'raladigan savollar bo'yicha yozma javoblar."
          align="center"
        />
        <FAQAccordion items={home.faq} />
      </section>

      {/* CTA */}
      <section className="pt-12 md:pt-20">
        <CtaBlock contact={contact} />
      </section>
    </div>
  );
}
