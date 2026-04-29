import Link from "next/link";
import { ContactConfig } from "@/lib/cms-types";

type CtaBlockProps = {
  contact: ContactConfig;
};

export function CtaBlock({ contact }: CtaBlockProps) {
  return (
    <section className="premium-panel relative overflow-hidden rounded-[30px] px-6 py-12 text-center md:px-10 md:py-14">
      <div className="pointer-events-none absolute -right-20 top-0 h-52 w-52 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-accentSoft/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_42%)]" />

      <h3 className="relative text-3xl font-semibold leading-tight md:text-5xl">
        <span className="text-gradient">Biznesingizni o&apos;sishga tayyormisiz?</span>
      </h3>
      <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-8 text-muted md:text-base">
        Birinchi uchrashuvda strategik yo&apos;l xaritani beramiz va aniq ishga tushirish bosqichlarini belgilaymiz.
      </p>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href={contact.telegram} className="btn-primary">
          Telegram
        </Link>
        <Link href={`tel:${contact.phone}`} className="btn-secondary">
          Qo&apos;ng&apos;iroq
        </Link>
        <Link href="/contact" className="btn-secondary">
          Taklif so&apos;rash
        </Link>
      </div>
    </section>
  );
}
