import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { getPublishedContent } from "@/lib/cms-store";

export async function Footer() {
  const content = await getPublishedContent();

  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="container-shell pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <BrandLogo variant="lockup" />
            <p className="mt-5 max-w-[280px] text-[14px] leading-[1.7] text-white/45">
              Telegram bot, CRM, mobil ilova va sayt avtomatizatsiyasi uchun mustaqil IT studio.
            </p>
            <p className="mt-4 text-[12px] text-white/30">© {new Date().getFullYear()} Ctrllab</p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Sayt
            </p>
            <div className="flex flex-col gap-2.5">
              {content.nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Xizmatlar
            </p>
            <div className="flex flex-col gap-2.5">
              {["Telegram bots", "Web automation", "CRM systems", "Mobile apps"].map((s) => (
                <Link
                  key={s}
                  href="/services"
                  className="text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Aloqa
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={content.contact.telegram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-accent transition-transform group-hover:scale-150" />
                {content.contact.telegram.replace("https://t.me/", "@")}
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="group flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-accent transition-transform group-hover:scale-150" />
                {content.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.05] pt-6">
          <p className="text-[12px] text-white/30">
            Tashkent · O&apos;zbekiston
          </p>
          <p className="text-[12px] text-white/30">
            Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
