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
  outcome: string;
  deliverables: string[];
};

export type PortfolioItem = {
  name: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  tools: string;
};

export type CaseStudyItem = {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  timeline: string;
};

export type ProcessStepItem = {
  title: string;
  detail: string;
};

export type FaqItem = {
  question: string;
  answer: string;
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
  home: {
    trustLogos: string[];
    processSteps: ProcessStepItem[];
    faq: FaqItem[];
  };
  stats: StatItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  caseStudies: CaseStudyItem[];
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
