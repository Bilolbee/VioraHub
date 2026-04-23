import Link from "next/link";
import { getPublishedContent } from "@/lib/cms-store";

export async function FloatingTelegram() {
  const content = await getPublishedContent();

  return (
    <Link
      href={content.contact.telegram}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-accent/50 bg-[#11081f]/90 px-5 py-3 text-sm font-semibold text-white shadow-glow backdrop-blur-md transition hover:scale-105 hover:bg-accent/35"
    >
      Telegram
    </Link>
  );
}
