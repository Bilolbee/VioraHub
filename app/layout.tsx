import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingTelegram } from "@/components/floating-telegram";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageTransition } from "@/components/page-transition";
import { getPublishedContent } from "@/lib/cms-store";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    metadataBase: new URL("https://ctrllab.com"),
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
    <html lang="uz" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={geist.className}>
        <ScrollProgress />
        <CustomCursor />

        <SmoothScroll>
          <Navbar navLinks={content.nav} />
          <main className="container-shell">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>

        <FloatingTelegram />
      </body>
    </html>
  );
}
