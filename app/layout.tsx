import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingTelegram } from "@/components/floating-telegram";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viora Hub | Premium veb va raqamli agentlik",
  description:
    "Zamonaviy bizneslar uchun veb-sayt, Telegram bot, marketing va osish tizimlari.",
  metadataBase: new URL("https://viorahub.com"),
  openGraph: {
    title: "Viora Hub | Premium veb va raqamli agentlik",
    description:
      "Zamonaviy bizneslar uchun veb-sayt, Telegram bot, marketing va osish tizimlari.",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={manrope.className}>
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-5">{children}</main>
        <Footer />
        <FloatingTelegram />
      </body>
    </html>
  );
}
