import Link from "next/link";
import { ContactConfig } from "@/lib/cms-types";

type CtaBlockProps = {
  contact: ContactConfig;
};

export function CtaBlock({ contact }: CtaBlockProps) {
  return (
    <section className="surface relative overflow-hidden rounded-[28px] px-6 py-12 text-center md:px-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-accentSoft/25 blur-2xl" />
      <h3 className="relative text-3xl font-semibold leading-tight md:text-5xl">Biznesingizni osishga tayyormisiz?</h3>
      <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
        Birinchi uchrashuvda strategik yol xaritani beramiz va aniq qadamlarni kelishib olamiz.
      </p>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={contact.telegram}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:shadow-glow"
        >
          Telegram
        </Link>
        <Link
          href={`tel:${contact.phone}`}
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white"
        >
          Qongiroq
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white"
        >
          Taklif sorash
        </Link>
      </div>
    </section>
  );
}
