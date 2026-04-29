import Link from "next/link";
import { getPublishedContent } from "@/lib/cms-store";

export async function FloatingTelegram() {
  const content = await getPublishedContent();

  return (
    <Link
      href={content.contact.telegram}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-accent/45 bg-[#150f27]/90 px-5 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-md transition hover:-translate-y-1 hover:bg-accent/30"
    >
      <span className="h-2 w-2 rounded-full bg-accentSoft" />
      Telegram
    </Link>
  );
}
