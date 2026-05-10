import { CtaBlock } from "@/components/cta-block";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

const deliveryBlocks = [
  { num: "01", text: "Brief va texnik aniqlash" },
  { num: "02", text: "Arxitektura va sxema" },
  { num: "03", text: "Sprint development" },
  { num: "04", text: "Deploy va support" },
];

export default async function ServicesPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-16 md:pt-24">
      <SectionTitle
        kicker="Xizmatlar"
        title="Har bir xizmat aniq biznes natijaga bog'langan."
        subtitle="Biz alohida vazifalar emas, sotuv va operatsion samaradorlikka xizmat qiladigan tizim quramiz."
      />

      {/* Delivery process row */}
      <div className="mb-14 grid gap-3 md:grid-cols-4">
        {deliveryBlocks.map((block) => (
          <div key={block.num} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-4">
            <span className="tag-mono text-[11px] text-accent">{block.num}</span>
            <span className="text-[14px] font-medium text-white/75">{block.text}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {content.services.map((section, index) => (
          <ServiceCard
            key={section.title}
            title={section.title}
            description={section.description}
            outcome={section.outcome}
            deliverables={section.deliverables}
            index={index}
          />
        ))}
      </div>

      <div className="mt-20">
        <CtaBlock contact={content.contact} />
      </div>
    </div>
  );
}
