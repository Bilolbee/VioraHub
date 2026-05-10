import { HomePageClient } from "@/components/home-page-client";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function HomePage() {
  const content = await getPublishedContent();

  return (
    <HomePageClient
      hero={content.hero}
      home={content.home}
      stats={content.stats}
      services={content.services}
      portfolio={content.portfolio}
      caseStudies={content.caseStudies}
      whyUs={content.whyUs}
      contact={content.contact}
      testimonials={content.testimonials}
    />
  );
}
