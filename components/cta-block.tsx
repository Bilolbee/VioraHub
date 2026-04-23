import Link from "next/link";

export function CtaBlock() {
  return (
    <section className="rounded-3xl border border-borderSubtle bg-card px-6 py-10 text-center md:px-10">
      <h3 className="text-3xl font-semibold md:text-4xl">Biznesingizni osishga tayyormisiz?</h3>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://t.me/viorahub"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium transition hover:shadow-glow"
        >
          Telegram
        </Link>
        <Link
          href="tel:+998900000000"
          className="rounded-full border border-borderSubtle px-6 py-3 text-sm font-medium transition hover:border-white"
        >
          Qongiroq
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-borderSubtle px-6 py-3 text-sm font-medium transition hover:border-white"
        >
          Taklif sorash
        </Link>
      </div>
    </section>
  );
}
