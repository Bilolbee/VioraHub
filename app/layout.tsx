import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingTelegram } from "@/components/floating-telegram";
import { getPublishedContent } from "@/lib/cms-store";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    metadataBase: new URL("https://viorahub.com"),
    openGraph: {
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      images: ["/og-image.svg"]
    }
  };
}

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getPublishedContent();

  return (
    <html lang="uz">
      <body className={spaceGrotesk.className}>
        <Navbar navLinks={content.nav} />
        <main className="container-shell">{children}</main>
        <Footer />
        <FloatingTelegram />
      </body>
    </html>
  );
}
