import { ContactConfidence } from "@/components/contact-confidence";
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
        title="Loyihani 30 daqiqalik strategik call bilan boshlaymiz"
        subtitle="So'rovni qoldiring: 24 soat ichida vazifangizga mos aniq ijro modeli va keyingi qadamlarni yuboramiz."
      />

      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <ContactConfidence contact={content.contact} />
        <ContactFormClient />
      </div>
    </div>
  );
}
