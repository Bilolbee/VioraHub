import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";

const sections = [
  {
    title: "Veb-sayt ishlab chiqish",
    items: ["Landing", "Korporativ", "Ecommerce"]
  },
  {
    title: "Botlar",
    items: ["Telegram commerce", "CRM integratsiya", "Avto javoblar"]
  },
  {
    title: "Marketing",
    items: ["Lid generatsiya", "Reklama", "Funnel"]
  },
  {
    title: "Video production",
    items: ["Reels", "Promo", "Reklama kreativi"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pb-16 pt-10">
      <SectionTitle
        kicker="Xizmatlar"
        title="Jalb qiladigan, sotuvga olib kiradigan va ushlab qoladigan tizimlar."
        subtitle="Har bir xizmat alohida ish emas, natija beradigan bajaruv tizimi sifatida qurilgan."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Reveal key={section.title}>
            <article className="rounded-2xl border border-borderSubtle bg-card p-6">
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span key={item} className="rounded-full border border-borderSubtle px-3 py-1 text-sm text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-16">
        <CtaBlock />
      </div>
    </div>
  );
}
