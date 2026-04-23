export type Role = "editor" | "reviewer" | "admin";

export type NavItem = {
  href: string;
  label: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type PortfolioItem = {
  name: string;
  category: string;
  result: string;
  tools: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export type ContactConfig = {
  telegram: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  updatedBy: string;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: StatItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  whyUs: string[];
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    mission: string;
    approach: string;
    promise: string;
  };
  testimonials: TestimonialItem[];
  contact: ContactConfig;
  seo: SeoConfig;
  nav: NavItem[];
};

export type AuditAction =
  | "login_success"
  | "login_failed"
  | "draft_updated"
  | "publish_approved"
  | "logout";

export type AuditEntry = {
  id: string;
  at: string;
  actorEmail: string;
  actorRole: Role | "system";
  action: AuditAction;
  details: string;
};
