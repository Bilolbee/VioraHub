import { CtaBlock } from "@/components/cta-block";
import { SectionTitle } from "@/components/section-title";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function AboutPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-12">
      <SectionTitle kicker={content.about.kicker} title={content.about.title} subtitle={content.about.subtitle} />

      <div className="grid gap-4 md:grid-cols-3">
        <article className="section-shell premium-hover rounded-[28px] p-7">
          <h3 className="text-xl font-semibold">Missiya</h3>
          <p className="mt-4 text-sm leading-8 text-muted">{content.about.mission}</p>
        </article>
        <article className="section-shell premium-hover rounded-[28px] p-7">
          <h3 className="text-xl font-semibold">Yondashuv</h3>
          <p className="mt-4 text-sm leading-8 text-muted">{content.about.approach}</p>
        </article>
        <article className="section-shell premium-hover rounded-[28px] p-7">
          <h3 className="text-xl font-semibold">Vada</h3>
          <p className="mt-4 text-sm leading-8 text-muted">{content.about.promise}</p>
        </article>
      </div>

      <div className="mt-16 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <article className="section-shell rounded-[28px] p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-accentSoft">How we work</p>
          <ul className="info-list mt-4">
            <li>Har sprint oldidan scope aniq yoziladi.</li>
            <li>Oraliq natijalar haftalik demo orqali beriladi.</li>
            <li>Launchdan keyin ham optimizatsiya davom etadi.</li>
          </ul>
        </article>

        <div>
          <SectionTitle kicker="Ishonch" title="Mijozlar fikri" subtitle="Natijaga asoslangan hamkorlik haqida qisqa feedbacklar." />
          <div className="grid gap-4">
            {content.testimonials.map((item) => (
              <article key={item.name} className="section-shell premium-hover rounded-[28px] p-7">
                <p className="text-sm leading-8 text-muted">{item.quote}</p>
                <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CtaBlock contact={content.contact} />
      </div>
    </div>
  );
}
