import { PortfolioPageClient } from "@/components/portfolio-page-client";
import { getPublishedContent } from "@/lib/cms-store";

export const revalidate = 0;

export default async function PortfolioPage() {
  const content = await getPublishedContent();
  return <PortfolioPageClient items={content.portfolio} contact={content.contact} />;
}
