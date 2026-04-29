import { ContactFormClient } from "@/components/contact-form-client";
import { SectionTitle } from "@/components/section-title";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function ContactPage() {
  const content = await getPublishedContent();

  return (
    <div className="pb-20 pt-12">
      <SectionTitle
        kicker="Aloqa"
        title="Loyihani birga ishga tushiramiz"
        subtitle="Qulay kanalni tanlang yoki toliq sorov qoldiring. Biz sizga aniq action plan bilan qaytamiz."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="section-shell rounded-[28px] p-6 md:p-7">
          <p className="text-xs uppercase tracking-[0.18em] text-accentSoft">Direct channels</p>
          <div className="mt-4 grid gap-3">
            <a href={content.contact.telegram} className="premium-panel-soft premium-hover rounded-2xl p-4">
              <p className="text-sm font-semibold text-white">Telegram</p>
              <p className="mt-1 text-xs text-muted">Tezkor yozishma va brief</p>
            </a>
            <a href={content.contact.whatsapp} className="premium-panel-soft premium-hover rounded-2xl p-4">
              <p className="text-sm font-semibold text-white">WhatsApp</p>
              <p className="mt-1 text-xs text-muted">Qisqa savollar uchun</p>
            </a>
            <a href={`tel:${content.contact.phone}`} className="premium-panel-soft premium-hover rounded-2xl p-4">
              <p className="text-sm font-semibold text-white">Qongiroq</p>
              <p className="mt-1 text-xs text-muted">Strategik call bron qilish</p>
            </a>
          </div>
        </aside>

        <ContactFormClient />
      </div>
    </div>
  );
}
