import { CtaBlock } from "@/components/cta-block";
import { SectionTitle } from "@/components/section-title";

export default function AboutPage() {
  return (
    <div className="pb-16 pt-10">
      <SectionTitle
        kicker="Biz haqimizda"
        title="Natijaga obses qilingan fokusli jamoa."
        subtitle="Dizayn, development va growth strategiyani birlashtirib premium mahsulotni tez chiqaramiz."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-borderSubtle bg-card p-6">
          <h3 className="text-xl font-semibold">Missiya</h3>
          <p className="mt-3 text-sm text-muted">
            Biznesga faqat korinish emas, real leverage beradigan raqamli infratuzilma qurish.
          </p>
        </article>
        <article className="rounded-2xl border border-borderSubtle bg-card p-6">
          <h3 className="text-xl font-semibold">Yondashuv</h3>
          <p className="mt-3 text-sm text-muted">
            Avval bottleneckni topamiz, keyin arxitekturani chizamiz va ochovli sprintlarda bajarib beramiz.
          </p>
        </article>
        <article className="rounded-2xl border border-borderSubtle bg-card p-6">
          <h3 className="text-xl font-semibold">Vada</h3>
          <p className="mt-3 text-sm text-muted">
            Birinchi qongiroqdan launchgacha aniq aloqa, tez iteratsiya va qatiy sifat nazorati.
          </p>
        </article>
      </div>
      <div className="mt-16">
        <CtaBlock />
      </div>
    </div>
  );
}
