import Link from "next/link";
import { getPublishedContent } from "@/lib/cms-store";

export async function Footer() {
  const content = await getPublishedContent();

  return (
    <footer className="mt-20 border-t border-white/10 pb-10">
      <div className="container-shell pt-10">
        <div className="premium-panel rounded-[30px] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accentSoft">Viora Hub</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-gradient">Premium digital growth partner</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                Biznesingiz uchun dizayn, development va marketingni bitta tizimga birlashtirib beramiz.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/75">Sahifalar</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
                {content.nav.slice(1).map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:translate-x-1 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted">
              <p>Telegram: {content.contact.telegram.replace("https://t.me/", "@")}</p>
              <p className="mt-2">Instagram: {content.contact.instagram}</p>
              <p className="mt-2">Telefon: {content.contact.phone}</p>
              <p className="mt-2">Email: {content.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
