import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function ServicesPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-12">
      <SectionTitle
        kicker="Xizmatlar"
        title="Jalb qiladigan, sotuvga olib kiradigan va ushlab qoladigan tizimlar."
        subtitle="Har bir xizmat alohida ish emas, natija beradigan bajaruv tizimi sifatida qurilgan."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {content.services.map((section) => (
          <Reveal key={section.title}>
            <article className="surface surface-hover rounded-3xl p-7">
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{section.description}</p>
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
