import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

const deliveryBlocks = [
  "Maqsad va KPI mapping",
  "Konversiya UX va copy",
  "Integratsiya va avtomatlashtirish",
  "Analytics va iteratsiya"
];

export default async function ServicesPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-12">
      <SectionTitle
        kicker="Xizmatlar"
        title="Biz xizmat emas, growth architecture quramiz"
        subtitle="Har bir blok lead oqimini oshirish va sotuvni tezlashtirish uchun dizayn qilingan."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {deliveryBlocks.map((block) => (
          <div key={block} className="section-shell rounded-2xl p-4 text-sm text-white">
            {block}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {content.services.map((section, index) => (
          <Reveal key={section.title}>
            <article className="section-shell premium-hover rounded-[28px] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-accentSoft">Unit 0{index + 1}</p>
              <h3 className="mt-2 text-2xl font-semibold">{section.title}</h3>
              <p className="mt-4 text-sm leading-8 text-muted">{section.description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <CtaBlock contact={content.contact} />
      </div>
    </div>
  );
}
