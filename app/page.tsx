import { HomePageClient } from "@/components/home-page-client";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function HomePage() {
  const content = await getPublishedContent();

  return (
    <HomePageClient
      hero={content.hero}
      stats={content.stats}
      services={content.services}
      portfolio={content.portfolio}
      whyUs={content.whyUs}
      contact={content.contact}
    />
  );
}
