import Link from "next/link";
import { getPublishedContent } from "@/lib/cms-store";

export async function Footer() {
  const content = await getPublishedContent();

  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container-shell grid gap-8 py-14 md:grid-cols-3">
        <div className="surface rounded-3xl p-6">
          <p className="text-lg font-semibold tracking-[0.2em] text-white">VIORA HUB</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            Ambitsiyali bizneslar uchun premium sayt, bot va osish tizimlari.
          </p>
        </div>
        <div className="surface rounded-3xl p-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-white/90">Tezkor havolalar</p>
          <div className="flex flex-col gap-2 text-sm text-muted">
            {content.nav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:translate-x-1 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="surface rounded-3xl p-6 text-sm text-muted">
          <p>Telegram: {content.contact.telegram.replace("https://t.me/", "@")}</p>
          <p className="mt-3">Instagram: {content.contact.instagram}</p>
          <p className="mt-3">Telefon: {content.contact.phone}</p>
          <p className="mt-3">Email: {content.contact.email}</p>
        </div>
      </div>
    </footer>
  );
}
