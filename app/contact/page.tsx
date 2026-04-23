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
        title="Osish tizimingizni birga chizamiz."
        subtitle="Qulay kanalni tanlang yoki toliq sorov qoldiring, biz aniq action plan bilan javob beramiz."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <a href={content.contact.telegram} className="surface surface-hover rounded-3xl p-6">
          Telegram
        </a>
        <a href={content.contact.whatsapp} className="surface surface-hover rounded-3xl p-6">
          WhatsApp
        </a>
        <a href={`tel:${content.contact.phone}`} className="surface surface-hover rounded-3xl p-6">
          Hozir qongiroq qilish
        </a>
      </div>

      <ContactFormClient />
    </div>
  );
}
