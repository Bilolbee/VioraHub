import Link from "next/link";

export function FloatingTelegram() {
  return (
    <Link
      href="https://t.me/viorahub"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-accent px-5 py-3 text-sm font-semibold shadow-glow transition hover:scale-105"
    >
      Telegram
    </Link>
  );
}
