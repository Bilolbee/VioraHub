import { CtaBlock } from "@/components/cta-block";
import { SectionTitle } from "@/components/section-title";
import { TestimonialsStack } from "@/components/testimonials-stack";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function AboutPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-16 md:pt-24">
      <SectionTitle kicker={content.about.kicker} title={content.about.title} subtitle={content.about.subtitle} />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Missiya", body: content.about.mission },
          { label: "Yondashuv", body: content.about.approach },
          { label: "Va'da", body: content.about.promise },
        ].map((item) => (
          <article key={item.label} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-7 transition-colors duration-300 hover:border-white/[0.14]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{item.label}</p>
            <p className="mt-4 text-[15px] leading-[1.75] text-white/65">{item.body}</p>
          </article>
        ))}
      </div>

      {/* How we work */}
      <section className="mt-24">
        <SectionTitle kicker="Ish uslubi" title="Qanday ishlaymiz." />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Har sprint oldidan scope, muddat va KPI yozma kelishiladi.",
            "Oraliq natijalar haftalik demo va hisobotda ko'rsatiladi.",
            "Source code, hujjatlash va deploy guide — hammasi sizniki bo'ladi.",
            "Launchdan keyin 30 kun bepul support, keyin SLA bilan davomiy.",
          ].map((line, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-5">
              <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-semibold text-accent" style={{ background: "rgba(190,242,100,0.08)", border: "1px solid rgba(190,242,100,0.2)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-[1.7] text-white/65">{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="mt-24">
          <SectionTitle kicker="Mijozlar" title="Real fikrlar." align="center" />
          <TestimonialsStack items={content.testimonials} />
        </section>
      )}

      <div className="mt-20">
        <CtaBlock contact={content.contact} />
      </div>
    </div>
  );
}
