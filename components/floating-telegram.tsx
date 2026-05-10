import Link from "next/link";
import { getPublishedContent } from "@/lib/cms-store";

export async function FloatingTelegram() {
  const content = await getPublishedContent();

  return (
    <Link
      href={content.contact.telegram}
      target="_blank"
      rel="noreferrer"
      data-magnetic
      className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0d0d]/85 px-5 py-3 text-[13px] font-medium text-white/85 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-[#0d0d0d] hover:text-white"
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}
    >
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/55" />
        <span className="relative h-2 w-2 rounded-full bg-accent" />
      </span>
      Telegram
    </Link>
  );
}
